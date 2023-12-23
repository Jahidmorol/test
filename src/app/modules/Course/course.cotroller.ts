const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    message: 'Course is created successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  // getSingleCourse,
  // getAllCourses,
  // updateCourse,
  // deleteCourse,
  // assignFacultiesWithCourse,
  // removeFacultiesFromCourse,
};
