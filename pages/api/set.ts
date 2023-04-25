// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(req.body);
  const { type, param = {} } = req.body;
  const params = {
    contract_address: param.contract_address,
    abi_string: param.abi_string,
    method: param.method,
    drop_parameters: param.drop_parameters,
    request_url: param.request_url,
    // request_headers: param.request_headers,
    upcoming_phase_id: param.upcoming_phase_id,
    contract_mint_able: param.contract_mint_able,
    use_proxy: param.use_proxy,
    use_tls: param.use_tls,
  };
  const headers = {
    "x-api-key": param["x-api-key"],
  };
  console.log(params);
  console.log(headers);
  const data = {
    status: "success",
  };
  // const { data } = await axios.post(
  //   "https://sig.lancet.pro/api/external/setGetRequest",params,
  //   { headers: headers }
  // );
  console.log(data);
  res.status(200).json(data);
}
