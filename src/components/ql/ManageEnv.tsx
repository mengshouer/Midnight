// import { useQuery } from "react-query";

interface cookieProps {
  name: string;
  value: string;
  enable: boolean;
}

const localCookie = [
  {
    name: "cookie1",
    value: "value1",
    enable: true,
  },
  {
    name: "cookie2",
    value: "value2",
    enable: true,
  },
  {
    name: "cookie3",
    value: "value3",
    enable: true,
  },
];

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ManageEnv() {
  // const { data, error } = useQuery("/api/ql/getenv", () =>
  //   fetcher("/api/ql/getenv")
  // );

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {error && <div>{error as string}</div>} */}
          {localCookie.map((item: cookieProps) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>
                <button className="btn btn-ghost btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
