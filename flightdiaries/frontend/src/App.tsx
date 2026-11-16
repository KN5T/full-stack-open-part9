import { useEffect, useState } from "react";
import Diaries from "./components/Diaries";
import type { NonSensitiveDiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  return (
    <div>
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;

