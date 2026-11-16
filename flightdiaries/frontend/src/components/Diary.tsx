import type { NonSensitiveDiaryEntry } from "../types";

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <p>
        <b>Diary {diary.id} </b> <br />
        <i>{diary.date}</i> <br />
        Weather: {diary.weather} <br />
        Visibility: {diary.visibility}
      </p>
    </div>
  );
};

export default Diary;
