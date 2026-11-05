import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (
    isNaN(Number(height)) ||
    isNaN(Number(weight)) ||
    height <= 0 ||
    weight <= 0
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    daily_exercises.some((de: unknown) => isNaN(Number(de)))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const exerciseResult = calculateExercises(
    daily_exercises.map((de: number) => Number(de)),
    Number(target),
  );

  return res.json(exerciseResult);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
