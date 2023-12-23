import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB();

  sendResponse(res, {
    message: 'Course retrieve successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  // getSingleCourse,
  // updateCourse,
  // deleteCourse,
  // assignFacultiesWithCourse,
  // removeFacultiesFromCourse,
};
