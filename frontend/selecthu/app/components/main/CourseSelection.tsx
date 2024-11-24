// components/main/CourseSelection.tsx
import React, { useState } from 'react';
import { Course } from "@/app/types/course";
import CourseList from './CourseList';
import CourseTable from './CourseTable';

export default function CourseSelection() {
  // 初始的可用课程列表
  const initialAvailableCourses: Course[] = [
    // 将您的课程数据放在这里
  ];

  // 状态：备选清单和已选课程
  const [availableCourses, setAvailableCourses] = useState<Course[]>(initialAvailableCourses);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  // 添加课程到课表
  const addCourseToTable = (course: Course) => {
    if (!selectedCourses.find(c => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }

    // 从备选清单中删除该课程
    setAvailableCourses(prevAvailableCourses =>
      prevAvailableCourses.filter(c => c.id !== course.id)
    );
  };

  // 从备选清单中删除课程
  const removeCourseFromAvailable = (courseId: string) => {
    setAvailableCourses(prevAvailableCourses =>
      prevAvailableCourses.filter(c => c.id !== courseId)
    );
  };

  // 从课表中删除课程
  const moveCourseToAvailable = (course: Course) => {
    // 从已选课程中删除
    setSelectedCourses(prevSelectedCourses =>
      prevSelectedCourses.filter(c => c.id !== course.id)
    );

    // 添加回备选清单（如果尚未存在）
    setAvailableCourses(prevAvailableCourses => {
      if (!prevAvailableCourses.some((c) => c.id === course.id)) {
        return [...prevAvailableCourses, course];
      }
      return prevAvailableCourses;
    });
  };

  return (
    <>
      <CourseList
        availableCourses={availableCourses}
        addCourseToTable={addCourseToTable}
        deleteCourse={removeCourseFromAvailable}
        moveCourseToAvailable={moveCourseToAvailable} // 添加此行
      />
      <CourseTable
        selectedCourses={selectedCourses}
        addCourseToTable={addCourseToTable}
      />
    </>
  );
}