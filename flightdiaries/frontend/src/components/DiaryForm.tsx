import { useState } from "react";
import diaryService from "../services/diaryService";
import axios from "axios";
import type { NonSensitiveDiaryEntry, Visibility, Weather } from "../types";

type DiaryFormProps = {
  diaries: NonSensitiveDiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
};

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [comment, setComment] = useState<string>("");

  const addNewDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(null);
    const diaryToAdd = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const res = await diaryService.create(diaryToAdd);

      const newDiary = {
        id: res.id,
        date: res.date,
        weather: res.weather,
        visibility: res.visibility,
      };
      setDiaries(diaries.concat(newDiary));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        if (Array.isArray(responseData?.error)) {
          const messages = responseData.error.map(
            (e: { path: string[]; message: string }) =>
              `Error: Incorrect ${e.path.join(".")}: ${e.message}`,
          );

          setError(messages.join("\n"));
        } else {
          setError("Unknown server error");
        }
      } else {
        console.error(error);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && (
        <div style={{ color: "red", whiteSpace: "pre-line" }}>{error}</div>
      )}

      <form onSubmit={addNewDiary}>
        <div>
          <label htmlFor="date">date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <label>visibility</label>

          {["great", "good", "ok", "poor"].map((value) => (
            <div key={value}>
              <label htmlFor={value}>{value}</label>
              <input
                type="radio"
                id={value}
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={(event) =>
                  setVisibility(event.target.value as Visibility)
                }
              />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <label>weather</label>

          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((value) => (
            <div key={value}>
              <label htmlFor={value}>{value}</label>
              <input
                type="radio"
                id={value}
                name="weather"
                value={value}
                checked={weather === value}
                onChange={(event) => setWeather(event.target.value as Weather)}
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="comment">comment</label>
          <input
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
