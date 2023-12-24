import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { courseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
const router = express.Router();

router.post(
  '/',
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId/reviews', CourseControllers.getSingleCourseWithReview);

// router.get('/:id', CourseControllers.getSingleCourse);

// router.patch(
//   '/:id',
//   validateRequest(CourseValidations.updateCourseValidationSchema),
//   CourseControllers.updateCourse,
// );

// router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
