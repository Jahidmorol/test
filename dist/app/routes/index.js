"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_route_1 = require("../modules/Course/course.route");
const category_route_1 = require("../modules/Category/category.route");
const review_route_1 = require("../modules/Review/review.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/course',
        route: course_route_1.CourseRoutes,
    },
    {
        path: '/courses',
        route: course_route_1.CourseRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
