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
    title: zod_1.z.string().min(1).max(255),
    instructor: zod_1.z.string().min(1).max(255),
    categoryId: zod_1.z.string().uuid(),
    price: zod_1.z.number().positive(),
    tags: zod_1.z.array(createTagsValidationSchema),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    language: zod_1.z.string().min(1).max(255),
    provider: zod_1.z.string().min(1).max(255),
    durationInWeeks: zod_1.z.number().positive().int(),
    details: createDetailsValidationSchema,
});
exports.courseValidations = {
    createCourseValidationSchema,
};
