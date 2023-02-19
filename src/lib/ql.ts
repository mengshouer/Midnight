// Global variable
let ql_address = process.env.QL_ADDRESS || "http://127.0.0.1:5700";
if (ql_address.endsWith("/")) {
  ql_address = ql_address.slice(0, -1);
}
const ql_client_id = process.env.QL_CLIENT_ID || "";
const ql_client_secret = process.env.QL_CLIENT_SECRET || "";

let ql_auth: string;
let ql_auth_expiration: number;
// ----------------

export type QLEnv = {
  _id: string;
  name: string;
  value: string;
  timestamp: string;
  created: number;
  status: number;
  position: number;
  remarks?: string;
};

export interface JDInfoProps {
  [name: string]: {
    cookie: string;
    remarks: string;
    enable: boolean;
  };
}

interface IUpdateEnv {
  name: string;
  value: string;
  _id?: string;
  remarks?: string;
}

export function validateJDCK(ck: string) {
  const pin_rex = /pt_pin=(.*?);/;
  const pt_pin = pin_rex.exec(ck);
  if (!pt_pin) return false;
  const key_rex = /pt_key=(.*?);/;
  const pt_key = key_rex.exec(ck);
  if (!pt_key) return false;
  return { pt_key: pt_key[1], pt_pin: pt_pin[1] };
}

function filterSingleEnv(value_name: string, all_env: QLEnv[]) {
  for (const env of all_env) {
    if (env.value.match(value_name)) {
      return env;
    }
  }
}

async function getToken() {
  const response = await fetch(
    `${ql_address}/open/auth/token?client_id=${ql_client_id}&client_secret=${ql_client_secret}`,
    {
      headers: { Authorization: "" },
    }
  )
    .then(async (res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  return response;
}

async function getAuth() {
  if (
    !ql_auth_expiration ||
    !(ql_auth_expiration > ~~(new Date().getTime() / 1000))
  ) {
    const { data } = await getToken();
    ql_auth = `${data.token_type} ${data.token}`;
    ql_auth_expiration = data.expiration;
  }
  return ql_auth;
}

async function getEnv(): Promise<{ code: number; data: QLEnv[] }> {
  const response = await fetch(`${ql_address}/open/envs`, {
    headers: { Authorization: await getAuth() },
  })
    .then((res) => res.json())
    .catch(() => {
      return { code: 500, data: "QL server error(Env)" };
    });
  return response;
}

export async function filterAllEnv(env_name: string): Promise<QLEnv[]> {
  return await getEnv().then((res) => {
    return res.data.filter((item: QLEnv) => item.name === env_name);
  });
}

export async function enableEnv(_id: string) {
  return await fetch(`${ql_address}/open/envs/enable`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuth(),
    },
    body: JSON.stringify([_id]),
  });
}

export async function updateEnv(
  env_name: string,
  value: string,
  value_name: string,
  remarks = ""
) {
  const all_env = await filterAllEnv(env_name);
  const env = filterSingleEnv(value_name, all_env);
  const envRemarks = env?.remarks && remarks !== "remove" ? env?.remarks : "";
  const data: IUpdateEnv[] = [
    {
      name: env_name,
      value,
      remarks: remarks && remarks !== "remove" ? remarks : envRemarks,
    },
  ];
  let response;
  if (env?._id) {
    // ID 已经存在，更新变量
    data[0]["_id"] = env._id;
    response = await fetch(`${ql_address}/open/envs`, {
      method: "PUT",
      headers: {
        Authorization: await getAuth(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data[0]),
    })
      .then(async (res) => await enableEnv(env._id).then(() => res.json()))
      .catch(() => {
        return { code: 500, data: "QL server error(Update)" };
      });
  } else {
    // ID 不存在，新增变量
    response = await fetch(`${ql_address}/open/envs`, {
      method: "POST",
      headers: {
        Authorization: await getAuth(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => await res.json());
  }

  return response;
}
