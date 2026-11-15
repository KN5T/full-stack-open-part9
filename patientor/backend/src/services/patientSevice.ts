import patients from "../../data/patientEntries.ts";
import type {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
};
