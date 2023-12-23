"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_route_1 = require("../modules/Course/course.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/courses',
        route: course_route_1.CourseRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;