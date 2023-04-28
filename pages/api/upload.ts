import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { param } = req.body;
    const headers = {
      "x-api-key": param["x-api-key"],
    };
    const params = {
      upcoming_phase_id: param.upcoming_phase_id,
    };
    const { data } = await axios.post(
      "https://sig.lancet.pro/api/external/upload",
      params,
      { headers: headers }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ code: "-1", data: {}, msg: "request error" });
  }
}
