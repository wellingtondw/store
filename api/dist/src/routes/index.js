"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_1 = __importDefault(require("./api/v1"));
const router = (0, express_1.Router)();
router.use("v1/api", v1_1.default);
router.get("/", (req, res) => {
    res.send("Hello World");
});
router.use((err, req, res) => {
    if (err.name === "ValidationError") {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce((errors, key) => {
                errors[key] = err.errors[key.message];
                return errors;
            }, {}),
        });
    }
});
exports.default = router;
