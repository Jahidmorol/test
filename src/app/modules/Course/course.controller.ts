import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Course retrieve successfully',
    data: result,
  });
});

const getSingleCourseWithReview = catchAsync(async (req, res) => {
  const result = await CourseServices.getSingleCourseWithReviewFromDB(
    req.params.courseId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const getBestCourseWithAverageReview = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseWithAverageReviewFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Course is updated successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourseWithReview,
  getBestCourseWithAverageReview,
  updateCourse,
};
