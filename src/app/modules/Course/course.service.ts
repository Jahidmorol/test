import { Review } from '../Review/review.model';
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

const getSingleCourseWithReviewFromDB = async (id: string) => {
  const singleCourse = await Course.findById(id);

  const singleCourseReviews = await Review.find({ courseId: id });

  const result = {
    course: { ...singleCourse?.toObject() },
    reviews: singleCourseReviews,
  };

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseWithReviewFromDB,
  // getSingleCourseFromDB,
  // updateCourseIntoDB,
  // deleteCourseFromDB,
  // assignFacultiesWithCourseIntoDB,
  // removeFacultiesFromCourseFromDB,
};
