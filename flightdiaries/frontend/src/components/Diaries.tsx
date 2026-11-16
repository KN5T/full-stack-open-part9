import type { NonSensitiveDiaryEntry } from "../types";
import Diary from "./Diary";

const Diaries = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default Diaries;
