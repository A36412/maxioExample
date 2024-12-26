"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const maxio_router_1 = __importDefault(require("./maxio.router"));
const registerRoutes = (app) => {
    app.use('/api/maxio', maxio_router_1.default);
};
exports.registerRoutes = registerRoutes;
