"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidations = void 0;
const zod_1 = require("zod");
const createTagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    isDeleted: zod_1.z.boolean().default(false),
});
const createDetailsValidationSchema = zod_1.z.object({
    level: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().min(1).max(1000),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).max(255),
        instructor: zod_1.z.string().min(1).max(255),
        categoryId: zod_1.z.string(),
        price: zod_1.z.number().positive(),
        tags: zod_1.z.array(createTagsValidationSchema),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        language: zod_1.z.string().min(1).max(255),
        provider: zod_1.z.string().min(1).max(255),
        details: createDetailsValidationSchema,
        durationInWeeks: zod_1.z.number().positive().optional(),
    }),
});
//-------------------------------------------
const updateTagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255).optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
const updateDetailsValidationSchema = zod_1.z.object({
    level: zod_1.z.string().min(1).max(255).optional(),
    description: zod_1.z.string().min(1).max(1000).optional(),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).max(255).optional(),
        instructor: zod_1.z.string().min(1).max(255).optional(),
        categoryId: zod_1.z.string().uuid().optional(),
        price: zod_1.z.number().positive().optional(),
        tags: zod_1.z.array(updateTagsValidationSchema).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        language: zod_1.z.string().min(1).max(255).optional(),
        provider: zod_1.z.string().min(1).max(255).optional(),
        details: updateDetailsValidationSchema.optional(),
        durationInWeeks: zod_1.z.number().positive().optional(),
    }),
});
exports.courseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};
