export type Course = {
    id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topics: Topic[];
    totalDuration: number; 
  }
  
export type Topic = {
    id: string;
    title: string;
    content: string; 
    isCompleted: boolean;
    duration: number; 
    order: number;
  }
  

export type UserProgress = {
    userId: string;
    courseId: string;
    completedTopics: string[]; 
    lastAccessTime: Date;
    progress: number; 
  }