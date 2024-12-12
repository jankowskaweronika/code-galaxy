export type Topic = {
    title: string;
    content: string;
    duration: number;
    order: number;
    isCompleted?: boolean;
}

export type Course = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    totalDuration: number;
    topics: Topic[];
}

export interface UserCourse extends Course {
    purchased: boolean;
    progress: number | undefined;
}

export type CourseCardProps = {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    purchased?: boolean | undefined;
    progress?: number | undefined;
    onPurchase?: ((courseId: number) => Promise<void> | undefined) | undefined;
}

export type CoursesGridLayoutProps = {
    title: string;
    subtitle: string;
    courses: (Course | UserCourse)[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    showProgress?: boolean;
    onPurchase?: (courseId: number) => Promise<void>;
}