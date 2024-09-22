import axios from "axios";

export const api = axios.create({
  baseURL: "https://kitsu.io/api/edge/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});
