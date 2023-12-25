/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Review } from '../Review/review.model';
import TCourse from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (queryField: Record<string, unknown>) => {
  try {
    const {
      page = 1,
      limit = 0,
      sortBy,
      sortOrder = 'asc',
      minPrice,
      maxPrice,
      tags,
      startDate,
      endDate,
      language,
      provider,
      durationInWeeks,
      level,
    } = queryField;

    // Empty query object
    const query: any = {};

    // Pagination
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    // minPrice & maxPrice filtering
    if (minPrice && maxPrice) {
      query.price = {
        $gte: parseFloat(minPrice as string),
        $lte: parseFloat(maxPrice as string),
      };
    }

    // tags arrayOfObject filtering
    if (tags) {
      query.tags = {
        $elemMatch: {
          name: tags,
          isDeleted: false,
        },
      };
    }

    // startDate & endDate filtering
    if (startDate && endDate) {
      query.startDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    if (language) {
      query.language = language;
    }

    if (provider) {
      query.provider = provider;
    }

    if (durationInWeeks) {
      query.durationInWeeks = durationInWeeks;
    }

    if (level) {
      query[`details.level`] = level;
    }

    // Build the sort option
    const sortOption: any = {};
    if (
      sortBy &&
      [
        'title',
        'price',
        'startDate',
        'endDate',
        'language',
        'durationInWeeks',
      ].includes(sortBy as string)
    ) {
      sortOption[sortBy as string] = sortOrder === 'asc' ? 1 : -1;
    }

    const result = await Course.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit as string, 10));

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
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

  return result[0];
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCourseInfo) {
      throw new Error('Failed to update course!');
    }

    // check if there is any ---Tags--- to update

    if (tags && tags.length > 0) {
      // filter out the deleted tags
      const deletedTagsFromPayload = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);

      const deletedTagsFromDb = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: {
              name: { $in: deletedTagsFromPayload },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedTagsFromDb) {
        throw new Error('Failed to update course!');
      }

      // filter out the new tags
      const newTagsFromPayload = tags.filter((el) => el.name && !el.isDeleted);

      const newTagsFromDb = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            tags: {
              $each: newTagsFromPayload,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newTagsFromDb) {
        throw new Error('Failed to update course!');
      }
    }

    // check if there is any ---Details--- to update

    // empty object
    const newDetailsFromPayload: Record<string, unknown> = {
      ...courseRemainingData,
    };

    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        newDetailsFromPayload[`details.${key}`] = value;
      }

      const newDetailsFromDb = await Course.findByIdAndUpdate(
        id,
        newDetailsFromPayload,
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newDetailsFromDb) {
        throw new Error('Failed to update course!');
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id);

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseWithReviewFromDB,
  getBestCourseWithAverageReviewFromDB,
  updateCourseIntoDB,
};
