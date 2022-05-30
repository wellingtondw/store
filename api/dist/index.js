"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
const port = process.env.PORT || 3000;
server_1.app.listen(port, () => {
    console.log(`[server]: Server is running on port: ${port}`);
});
