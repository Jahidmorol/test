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
    durationInWeeks: z.number().positive().optional(),
  }),
});

//-------------------------------------------

const updateTagsValidationSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateDetailsValidationSchema = z.object({
  level: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(1000).optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    instructor: z.string().min(1).max(255).optional(),
    categoryId: z.string().optional(),
    price: z.number().positive().optional(),
    tags: z.array(updateTagsValidationSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().min(1).max(255).optional(),
    provider: z.string().min(1).max(255).optional(),
    details: updateDetailsValidationSchema.optional(),
    durationInWeeks: z.number().positive().optional(),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
