// types/course.ts
export interface Course {
    id: string;
    name: string;
    teacher?: string;
    type: string;
    credits: number;
    classroom?: string;  // 添加教室字段
  }
  
  export interface TimeSlot {
    day: number;         // 周几（1-7）
    start: number;       // 开始节次（1-10）
    duration: number;    // 持续节数
    course: Course;
  }