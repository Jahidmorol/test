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

const getBestCourseWithAverageReviewFromDB = async () => {
  const result = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
      },
    },
    {
      $sort: { averageRating: -1, reviewCount: -1 },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        'course._id': '$_id',
        'course.title': '$title',
        'course.instructor': '$instructor',
        'course.categoryId': '$categoryId',
        'course.price': '$price',
        'course.tags': '$tags',
        'course.startDate': '$startDate',
        'course.endDate': '$endDate',
        'course.language': '$language',
        'course.provider': '$provider',
        'course.durationInWeeks': '$durationInWeeks',
        'course.details': '$details',
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]);

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseWithReviewFromDB,
  getBestCourseWithAverageReviewFromDB,
  // getSingleCourseFromDB,
  // updateCourseIntoDB,
};
