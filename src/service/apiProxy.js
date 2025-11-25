import axios from "axios";

const proxy = axios.create({
  baseURL: "https://yibshopping.vercel.app/api/proxy",
});

export async function getMontresHommes() {
  const res = await proxy.get("?path=montreshommes");
  return res.data;
}

export async function getMontresFemmes() {
  const res = await proxy.get("?path=montresfemmes");
  return res.data;
}
