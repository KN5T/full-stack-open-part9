interface TrainingResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface RatingInfo {
  rating: number;
  ratingDescription: string;
}

interface ExerciseInputs {
  target: number;
  dailyHours: number[];
}

export const isNotNumber = (argument: string): boolean =>
  isNaN(Number(argument));

const parseArgs = (args: string[]): ExerciseInputs => {
  if (args.length < 2) throw new Error("Not enough arguments");

  if (args.some((arg) => isNotNumber(arg))) {
    throw new Error("Provided values were not numbers");
  }

  const target = Number(args[0]);
  const dailyHours = args.slice(1).map((dh) => Number(dh));

  if (target <= 0) {
    throw new Error("Target must be greater than zero");
  }

  if (dailyHours.some((dh) => dh < 0)) {
    throw new Error("Exercise hours cannot be negative");
  }

  return {
    target,
    dailyHours,
  };
};

const getRating = (average: number, target: number): RatingInfo => {
  const num = average / target;
  let rating: number;
  let ratingDescription: string;

  if (num < 0.5) {
    rating = 1;
    ratingDescription = "not good enough";
  } else if (num < 1) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "excellent";
  }

  return {
    rating,
    ratingDescription,
  };
};

export const calculateExercises = (
  dailyHours: number[],
  target: number,
): TrainingResults => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((dh) => dh !== 0).length;
  const sum = dailyHours.reduce((acc, curr) => acc + curr, 0);
  const average = sum / periodLength;
  const success = average >= target;

  const ratingInfo = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating: ratingInfo.rating,
    ratingDescription: ratingInfo.ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyHours } = parseArgs(process.argv.slice(2));
  const result = calculateExercises(dailyHours, target);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "Error: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
