import type { NewPatientEntry } from "./types.ts";
import { Gender } from "./types.ts";

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return (Object.values(Gender) as string[]).includes(gender);
};

const parseStringField = (str: unknown, fieldName: string): string => {
  if (!isString(str)) {
    throw new Error("Incorrect or missing " + fieldName + ":" + str);
  }

  return str;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object != "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringField(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringField(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, "occupation"),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default parseNewPatientEntry;
