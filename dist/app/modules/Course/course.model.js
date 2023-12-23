"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const tagsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});
const detailsSchema = new mongoose_1.Schema({
    level: { type: String, required: true },
    description: { type: String, required: true },
});
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Category' },
    price: { type: Number, required: true },
    tags: { type: [tagsSchema] },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number, required: true },
    details: { type: detailsSchema, required: true },
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
