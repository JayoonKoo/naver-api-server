import { config } from "dotenv";
import axios from "axios";

config();

const client_id = process.env.CLIENT_ID! as string;
const client_secret = process.env.CLIENT_SECRET! as string;
const headers = {
  "X-Naver-Client-Id": client_id,
  "X-Naver-Client-Secret": client_secret,
  "Content-Type": "application/json",
};

export class SearchService {
  public static getAssociate = async (search: string) => {
    const url = `https://mac.search.naver.com/mobile/ac?_q_enc=UTF-8&st=1&r_format=json&q=${search}`;
    const encodUrl = encodeURI(url);
    const { data } = await axios({
      url: encodUrl,
      method: "GET",
      headers,
    });

    return data;
  };

  public static getResult = async (search: string) => {
    const url = `https://openapi.naver.com/v1/search/shop.json?query=${search}`;
    const encodUrl = encodeURI(url);
    const { data } = await axios({
      url: encodUrl,
      method: "GET",
      headers,
    });
    return data;
  };
}
