"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post('/', 
// validateRequest(courseValidations.createCourseValidationSchema),
course_controller_1.CourseControllers.createCourse);
router.get('/', course_controller_1.CourseControllers.getAllCourses);
router.get('/:courseId/reviews', course_controller_1.CourseControllers.getSingleCourseWithReview);
router.get('/best', course_controller_1.CourseControllers.getBestCourseWithAverageReview);
router.put('/:courseId', (0, validationRequest_1.default)(course_validation_1.courseValidations.updateCourseValidationSchema), course_controller_1.CourseControllers.updateCourse);
exports.CourseRoutes = router;
