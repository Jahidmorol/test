import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ReviewServices } from './review.service';
import sendResponse from '../../utils/sendResponse';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReview,
};
