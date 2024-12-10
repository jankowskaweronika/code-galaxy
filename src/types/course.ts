export type Course = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
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