import request from "request";
import { config } from "dotenv";

config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const api_url = "https://openapi.naver.com/v1/datalab/shopping/categories";
const request_body = {
  startDate: "2021-08-01",
  endDate: "2021-09-30",
  timeUnit: "month",
  category: [
    { name: "패션의류", param: ["50000000"] },
    { name: "화장품/미용", param: ["50000002"] },
  ],
  device: "pc",
  ages: ["20", "30"],
  gender: "f",
};

request.post(
  {
    url: api_url,
    body: JSON.stringify(request_body),
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
      "Content-Type": "application/json",
    },
  },
  function (error, response, body) {
    console.log(response.statusCode);
    console.log(body);
  }
);
