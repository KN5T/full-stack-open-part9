import express, { type Response, type Request } from "express";
import type {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types.ts";
import patientService from "../services/patientSevice.ts";
import { errorMiddleware, newPatientParser } from "../middlewares.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getEntries());
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);

    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
