const isProduction = process.env.NODE_ENV === "production";
const secret = isProduction
  ? process.env.SECRET
  : "AHSD761HD781YDJ1DJ91UYD381YDHNJBAVD156AYD78QY71%";
const api = isProduction ? "https://" : "http://localhost:3000";
const store = isProduction ? "https://" : "http://localhost:8000";

export default {
  secret,
  api,
  store,
};
