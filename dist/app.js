"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const handleGlobalErrorhandler_1 = __importDefault(require("./app/middlewares/handleGlobalErrorhandler"));
const notFoundHandler_1 = __importDefault(require("./app/middlewares/notFoundHandler"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/', routes_1.default);
app.get('/', (req, res) => {
    res.send('Assignment-3___ server is running');
});
//global error
app.use(handleGlobalErrorhandler_1.default);
//Not Found
app.use(notFoundHandler_1.default);
exports.default = app;
