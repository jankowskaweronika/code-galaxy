import { db } from '../config/firebase.config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { Course, UserCourse } from '../types/course';

const courseService = {
    async getAllCourses(): Promise<Course[]> {
        const coursesRef = collection(db, 'courses');
        const snapshot = await getDocs(coursesRef);
        return snapshot.docs.map(doc => doc.data() as Course);
    },

    async getUserCourses(userId: string): Promise<UserCourse[]> {
        const courses = await this.getAllCourses();
        const purchasedCoursesRef = collection(db, 'users', userId, 'purchasedCourses');
        const purchasedSnapshot = await getDocs(purchasedCoursesRef);
        const purchasedCourseIds = new Set(
            purchasedSnapshot.docs.map(doc => parseInt(doc.id))
        );

        return courses.map(course => ({
            ...course,
            purchased: purchasedCourseIds.has(course.id),
            progress: purchasedCourseIds.has(course.id) ? 0 : undefined
        }));
    },

    async purchaseCourse(userId: string, courseId: number): Promise<void> {
        const purchasedCourseRef = doc(db, 'users', userId, 'purchasedCourses', courseId.toString());
        await setDoc(purchasedCourseRef, {
            purchasedAt: new Date().toISOString(),
            progress: 0
        });
    }
};

export default courseService