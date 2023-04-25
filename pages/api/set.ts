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
  try {
    const { type, param = {} } = req.body;
    let params: any = {};
    if (type === "get") {
      params = {
        contract_address: param.contract_address,
        abi_string: param.abi_string,
        method: param.method,
        drop_parameters: JSON.parse(param.drop_parameters),
        request_url: param.request_url,
        request_headers: param.request_headers,
        upcoming_phase_id: param.upcoming_phase_id,
        contract_mint_able: param.contract_mint_able,
        use_proxy: param.use_proxy,
        use_tls: param.use_tls,
      };
    }
    if (type === "post") {
      params = {
        contract_address: param.contract_address,
        abi_string: param.abi_string,
        method: param.method,
        drop_parameters: JSON.parse(param.drop_parameters),
        request_url: param.request_url,
        request_body: param.request_body,
        request_headers: param.request_headers,
        upcoming_phase_id: param.upcoming_phase_id,
        contract_mint_able: param.contract_mint_able,
        use_proxy: param.use_proxy,
        use_tls: param.use_tls,
      };
    }
    if (type === "addresslist") {
      params = {
        contract_address: param.contract_address,
        abi_string: param.abi_string,
        method: param.method,
        drop_parameters: JSON.parse(param.drop_parameters),
        address_list: param.address_list,
        upcoming_phase_id: param.upcoming_phase_id,
        contract_mint_able: param.contract_mint_able,
        sort_pairs: param.sort_pairs,
        sort_leaves: param.sort_leaves,
      };
    }
    if (type === "public") {
      params = {
        contract_address: param.contract_address,
        abi_string: param.abi_string,
        method: param.method,
        drop_parameters: JSON.parse(param.drop_parameters),
        upcoming_phase_id: param.upcoming_phase_id,
        contract_mint_able: param.contract_mint_able,
      };
    }
    const headers = {
      "x-api-key": param["x-api-key"],
    };
    const { data } = await axios.post(
      "https://sig.lancet.pro/api/external/setGetRequest",
      params,
      { headers: headers }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ code: "-1", data: {}, msg: "request error" });
  }
}
