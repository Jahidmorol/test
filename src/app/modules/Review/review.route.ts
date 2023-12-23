import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { reviewValidations } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(reviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);

router.get('/', ReviewControllers.getAllReview);

export const ReviewRoutes = router;
