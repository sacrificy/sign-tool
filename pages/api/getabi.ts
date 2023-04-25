import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(req.body);
  console.log(process.env.ETHERSCAN_KEY)

  const params = {
    module: "contract",
    action: "getabi",
    address: "0x00005ea00ac477b1030ce78506496e8c2de24bf5",
    apikey: process.env.ETHERSCAN_KEY,
  };
  const response = await axios.get("https://api.etherscan.io/api", {
    params: params,
  });
  const { status, result } = response.data;
  console.log(response.data);
  res.status(200).json(response.data);
}
