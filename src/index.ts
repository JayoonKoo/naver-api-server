import express from "express";
import cookieParser from "cookie-parser";
import { SearchService } from "./openApiService";
import productRouter from "./router/product";
import { db, sequelize } from "./db/database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/product", productRouter);

app.get("/api/compelete/:search?", (req, res) => {
  const { search } = req.params;
  if (search) {
    SearchService.getAssociate(search)
      .then((data) => {
        res.json({
          ...data,
          result: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.json({
      result: false,
    });
  }
});

app.post("/api/search/:search", async (req, res) => {
  const { search } = req.params;

  const data = await SearchService.getResult(search);
  res.json(data);
});

sequelize.sync().then((client) => {
  app.listen(8080, () => {
    console.log("localhost:8080 opend...");
  });
});
