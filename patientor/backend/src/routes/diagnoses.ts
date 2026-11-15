import express, { type Response } from "express";
import type { Diagnosis } from "../types.ts";
import diagnoseService from "../services/diagnoseService.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoseService.getEntries());
});

export default router;
