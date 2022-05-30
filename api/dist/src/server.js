"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const mbCalculation_1 = require("./utils/constants/mbCalculation");
const routes_1 = __importDefault(require("./routes"));
// import "./models";
const app = (0, express_1.default)();
exports.app = app;
const isProduction = process.env.NODE_ENV === "production";
//static files
app.use("/public", express_1.default.static(__dirname + "/public"));
app.use("/public/images", express_1.default.static(__dirname + "/public/images"));
//setup mongodb
const dbURI = isProduction ? database_1.dbProduction : database_1.dbTest;
mongoose_1.default
    .connect(dbURI)
    .then(() => console.log("mongodb is connected"))
    .catch((err) => console.log(err));
//global configs
if (!isProduction)
    app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.disable("x-powered-by");
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: mbCalculation_1.oneAndHalfMb }));
app.use("/", routes_1.default);
//404 route
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// 422, 401, 500, etc. route
app.use((err, req, res) => {
    const { message, status } = err;
    res.status(status || 500);
    if (status !== 404) {
        console.warn("Error:", message, new Date());
    }
    res.json({ errors: { message, status } });
});
