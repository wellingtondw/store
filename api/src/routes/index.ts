import { Router, Request, Response } from "express";
import api from "./api/v1";

const router = Router();

router.use("v1/api", api);

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use((err: any, req: Request, res: Response) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors: any, key: any) => {
        errors[key] = err.errors[key.message];

        return errors;
      }, {}),
    });
  }
});

export default router;
