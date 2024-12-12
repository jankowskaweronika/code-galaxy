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
        const progressRef = collection(db, 'users', userId, 'coursesProgress');
        const progressSnapshot = await getDocs(progressRef);
        
        const progressData = new Map(
            progressSnapshot.docs.map(doc => [
                doc.id,
                doc.data()
            ])
        );

        return courses.map(course => ({
            ...course,
            purchased: progressData.has(course.id.toString()),
            progress: progressData.get(course.id.toString())?.progress ?? 0
        }));
    },

    async getUserPurchasedCourses(userId: string): Promise<UserCourse[]> {
        const allCourses = await this.getAllCourses();
        const progressRef = collection(db, 'users', userId, 'coursesProgress');
        const progressSnapshot = await getDocs(progressRef);
        
        const progressData = new Map(
            progressSnapshot.docs.map(doc => [
                doc.id,
                doc.data()
            ])
        );

        return allCourses
            .filter(course => progressData.has(course.id.toString()))
            .map(course => {
                const progress = progressData.get(course.id.toString());
                return {
                    ...course,
                    purchased: true,
                    progress: progress?.progress ?? 0
                };
            });
    },

    async purchaseCourse(userId: string, courseId: number): Promise<void> {
        const courseProgressRef = doc(
            db, 
            'users', 
            userId, 
            'coursesProgress', 
            courseId.toString()
        );

        await setDoc(courseProgressRef, {
            completedTopics: {},
            progress: 0
        });
    },

    async updateCourseProgress(
        userId: string, 
        courseId: string, 
        completedTopics: Record<string, boolean>,
        totalTopics: number
    ): Promise<void> {
        const completedCount = Object.values(completedTopics).filter(Boolean).length;
        const progress = Math.round((completedCount / totalTopics) * 100);

        const courseProgressRef = doc(
            db, 
            'users', 
            userId, 
            'coursesProgress', 
            courseId
        );

        await setDoc(courseProgressRef, {
            completedTopics,
            progress
        });
    }
};

export default courseService;