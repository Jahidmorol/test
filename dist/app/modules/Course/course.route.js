"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const course_validation_1 = require("./course.validation");
const course_cotroller_1 = require("./course.cotroller");
const router = express_1.default.Router();
router.post('/create-course', (0, validationRequest_1.default)(course_validation_1.courseValidations.createCourseValidationSchema), course_cotroller_1.CourseControllers.createCourse);
// router.get('/', CourseControllers.getAllCourses);
// router.get('/:id', CourseControllers.getSingleCourse);
// router.patch(
//   '/:id',
//   validateRequest(CourseValidations.updateCourseValidationSchema),
//   CourseControllers.updateCourse,
// );
// router.delete('/:id', CourseControllers.deleteCourse);
exports.CourseRoutes = router;
