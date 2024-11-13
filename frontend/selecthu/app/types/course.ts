// 在 "@/app/types/course" 中添加或更新类型定义

export interface Course {
  id: string;
  name: string;
  teacher: string;
  classroom: string;
  type: string;
  credits: number;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  day: number;      // 星期几，1代表周一，依此类推
  start: number;    // 开始节次
  duration: number; // 持续节次数
}