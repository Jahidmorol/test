import TCourse from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find();
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  // getSingleCourseFromDB,
  // updateCourseIntoDB,
  // deleteCourseFromDB,
  // assignFacultiesWithCourseIntoDB,
  // removeFacultiesFromCourseFromDB,
};
