interface BodyMeasurements {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BodyMeasurements => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight / (height / 100) ** 2;

  if (BMI <= 18.5) {
    return "Underweight";
  } else if (BMI <= 25) {
    return "Normal range";
  } else if (BMI <= 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    const result = calculateBmi(height, weight);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = "Error: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
