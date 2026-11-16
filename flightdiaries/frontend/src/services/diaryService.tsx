import axios from "axios";
import type {
  NewDiaryEntry,
  DiaryEntry,
  NonSensitiveDiaryEntry,
} from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then((res) => res.data);
};

const create = (object: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, object).then((res) => res.data);
};

export default { getAll, create };
