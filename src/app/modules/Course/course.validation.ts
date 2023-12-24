import { z } from 'zod';

const createTagsValidationSchema = z.object({
  name: z.string().min(1).max(255),
  isDeleted: z.boolean().default(false),
});

const createDetailsValidationSchema = z.object({
  level: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    instructor: z.string().min(1).max(255),
    categoryId: z.string(),
    price: z.number().positive(),
    tags: z.array(createTagsValidationSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string().min(1).max(255),
    provider: z.string().min(1).max(255),
    details: createDetailsValidationSchema,
    durationInWeeks: z.number().int().optional(),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
};
