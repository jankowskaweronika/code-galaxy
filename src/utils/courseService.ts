import { db } from '../config/firebase.config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { Course, UserCourse } from '../types/course';

const courseService = {
    async getAllCourses(): Promise<Course[]> {
        const coursesRef = collection(db, 'courses');
        const snapshot = await getDocs(coursesRef);
        return snapshot.docs.map(doc => {
            const data = doc.data();

            return {
                ...data,
                id: data.id 
            } as Course;
        });
    },

    async getUserCourses(userId: string): Promise<UserCourse[]> {
        const courses = await this.getAllCourses();
        const purchasedCoursesRef = collection(db, 'users', userId, 'purchasedCourses');
        const purchasedSnapshot = await getDocs(purchasedCoursesRef);
        
        const purchasedCoursesData = new Map(
            purchasedSnapshot.docs.map(doc => [
                parseInt(doc.id),
                doc.data() as { progress: number }
            ])
        );

        return courses.map(course => ({
            ...course,
            purchased: purchasedCoursesData.has(course.id),
            progress: purchasedCoursesData.get(course.id)?.progress ?? undefined
        }));
    },

    async purchaseCourse(userId: string, courseId: number): Promise<void> {
        const purchasedCourseRef = doc(
            db, 
            'users', 
            userId, 
            'purchasedCourses', 
            courseId.toString()
        );

        await setDoc(purchasedCourseRef, {
            progress: 0
        });
    },

    async getUserPurchasedCourses(userId: string): Promise<UserCourse[]> {
        const allCourses = await this.getAllCourses();
        const purchasedCoursesRef = collection(db, 'users', userId, 'purchasedCourses');
        const purchasedSnapshot = await getDocs(purchasedCoursesRef);
        
        const purchasedCoursesData = new Map(
            purchasedSnapshot.docs.map(doc => [
                parseInt(doc.id),
                doc.data() as { progress: number }
            ])
        );

        return allCourses
            .filter(course => purchasedCoursesData.has(course.id))
            .map(course => ({
                ...course,
                purchased: true,
                progress: purchasedCoursesData.get(course.id)!.progress
            }));
    }
};

export default courseService;