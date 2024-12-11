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

export type Topic = {
    id: string;
    title: string;
    content: string;
    duration: number | string;
    order: number;
}

export type CourseListPageProps = {
    initialCourses?: Course[];
    initialSearchTerm?: string;
}

export type CourseCardProps = {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    purchased?: boolean;
    progress?: number | undefined;
}

export interface UserCourse extends Course {
    purchased: boolean;
    progress?: number | undefined;
}