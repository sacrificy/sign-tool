import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { address } = req.body;
    const params = {
      module: "contract",
      action: "getabi",
      address: address,
      apikey: process.env.ETHERSCAN_KEY,
    };
    const response = await axios.get("https://api.etherscan.io/api", {
      params: params,
    });
    const { status, result } = response.data;
    res.status(200).json(response.data);
  } catch (error) {
    res.status(200).json({ status: "0", message: "error", result: "" });
  }
}
