import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/compelete/:search", (req, res) => {
  const params = req.params.search;
  console.log(params);
  res.send(params);
});

app.post("/api/search", (req, res) => {
  console.log(req.body);
  res.send("완료");
});

app.listen(8080, () => {
  console.log("localhost:8080 opend...");
});
