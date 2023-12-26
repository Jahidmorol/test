"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(review_validation_1.reviewValidations.createReviewValidationSchema), review_controller_1.ReviewControllers.createReview);
router.get('/', review_controller_1.ReviewControllers.getAllReview);
exports.ReviewRoutes = router;
