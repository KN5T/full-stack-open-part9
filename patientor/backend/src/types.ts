import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const PatientSchema = z.object({
  id: z.uuid({ version: "v1" }),
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.stringFormat("ssn", /^\d{6}-\d{2,3}[0-9A-Z]$/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type Patient = z.infer<typeof PatientSchema>;

export type NonSensitivePatient = Omit<Patient, "ssn">;

export const NewPatientEntry = PatientSchema.omit({
  id: true,
});

export type NewPatientEntry = z.infer<typeof NewPatientEntry>;
