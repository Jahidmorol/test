import { Schema, model } from 'mongoose';
import TCourse, { TDetails, TTags } from './course.interface';

const tagsSchema = new Schema<TTags>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

const detailsSchema = new Schema<TDetails>({
  level: { type: String, required: true },
  description: { type: String, required: true },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    //   categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    categoryId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [tagsSchema],
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    details: {
      type: detailsSchema,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Create a virtual property for durationInWeeks
courseSchema.virtual('durationInWeeks').get(function () {
  const start: Date = new Date(this.startDate);
  const end: Date = new Date(this.endDate);

  const durationInMilliseconds: number = end.getTime() - start.getTime();

  //   Convert milliseconds to weeks and round up to the nearest integer
  const durationInWeeks: number = Math.ceil(
    durationInMilliseconds / (7 * 24 * 60 * 60 * 1000),
  );

  return durationInWeeks;
});

export const Course = model<TCourse>('Course', courseSchema);
