"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_validation_1 = require("./category.validation");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(category_validation_1.categoryValidations.createCategoryValidationSchema), category_controller_1.CategoryControllers.createCategory);
router.get('/', category_controller_1.CategoryControllers.getAllCategory);
// router.get('/:id', CourseControllers.getSingleCourse);
// router.patch(
//   '/:id',
//   validateRequest(CourseValidations.updateCourseValidationSchema),
//   CourseControllers.updateCourse,
// );
// router.delete('/:id', CourseControllers.deleteCourse);
exports.CategoryRoutes = router;
