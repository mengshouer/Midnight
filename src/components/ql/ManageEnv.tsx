import { useQuery, useMutation, useQueryClient } from "react-query";
import type { JDInfoProps } from "../../lib/ql";

export default function ManageEnv() {
  const QueryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    "/api/user/info",
    (): Promise<JDInfoProps> =>
      fetch("/api/user/info").then((res) => res.json())
  );

  const { mutate } = useMutation(
    (key: string) =>
      fetch("/api/user/info", {
        method: "DELETE",
        body: key,
      }),
    {
      onSuccess: () => {
        QueryClient.invalidateQueries("/api/user/info");
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-compact w-full">
        <thead>
          <tr className="text-center">
            <th>Enable</th>
            <th>Action</th>
            <th>Remarks</th>
            <th>Cookie</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data || {}).map(([key, value]) => (
            <tr key={key} className="hover text-center">
              <td>
                <label>
                  <input
                    readOnly
                    type="checkbox"
                    className="checkbox hover:cursor-default"
                    checked={value.enable || false}
                  />
                </label>
              </td>
              <td>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => mutate(key)}
                >
                  Delete
                </button>
              </td>
              <td className="text-left">{value.remarks}</td>
              <td className="text-left">{value.cookie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
