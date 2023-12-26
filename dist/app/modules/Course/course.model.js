"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
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
    title: {
        type: String,
        required: true,
        unique: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
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
    durationInWeeks: {
        type: Number,
    },
});
//calculate and set durationInWeeks before saving
courseSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = this;
        const start = new Date(course.startDate);
        const end = new Date(course.endDate);
        const durationInMilliseconds = end.getTime() - start.getTime();
        //   Convert milliseconds to weeks and round up to the nearest integer
        const durationInWeeks = Math.ceil(durationInMilliseconds / (7 * 24 * 60 * 60 * 1000));
        course.durationInWeeks = durationInWeeks;
        next();
    });
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
