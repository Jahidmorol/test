import express from 'express';
import { categoryValidations } from './category.validation';
import validateRequest from '../../middlewares/validationRequest';
import { CategoryControllers } from './category.controller';
const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategory);
// router.get('/:id', CourseControllers.getSingleCourse);

// router.patch(
//   '/:id',
//   validateRequest(CourseValidations.updateCourseValidationSchema),
//   CourseControllers.updateCourse,
// );

// router.delete('/:id', CourseControllers.deleteCourse);

export const CategoryRoutes = router;
