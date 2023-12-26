import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { courseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
const router = express.Router();

router.post(
  '/',
  // validateRequest(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId/reviews', CourseControllers.getSingleCourseWithReview);
router.get('/best', CourseControllers.getBestCourseWithAverageReview);

router.put(
  '/:courseId',
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const CourseRoutes = router;
