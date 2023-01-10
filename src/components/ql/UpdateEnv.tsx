import { useState } from "react";
import { useMutation } from "react-query";
import { validateJDCK } from "../../lib/ql";

export default function UpdateEnv() {
  const [env, setEnv] = useState("");
  const [remarks, setRemarks] = useState("");
  const [alert, setAlert] = useState("");
  const { mutateAsync: updateEnv } = useMutation(
    (data: { cookie: string; remarks: string }) =>
      fetch("/api/ql/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        setAlert(data.message);
        setTimeout(() => setAlert(""), 3000);
      },
    }
  );

  const handleUpdate = () => {
    if (!validateJDCK(env)) {
      setAlert("Cookie is invalid");
      setTimeout(() => setAlert(""), 3000);
      return;
    }
    updateEnv({ cookie: env, remarks });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex mb-2">
          <input
            onChange={(e) => setEnv(e.target.value)}
            type="text"
            placeholder="Type Cookie here"
            className="input input-bordered input-primary w-full max-w-md mr-2"
          />

          <div className="card-actions">
            <button onClick={handleUpdate} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>

        <input
          onChange={(e) => setRemarks(e.target.value)}
          type="text"
          maxLength={80}
          placeholder="Remarks (Optional) -> 备注 (选填)"
          className="input input-bordered hover:input-info w-full"
        />
      </div>
      {alert && (
        <div className="alert alert-info shadow-lg mt-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{alert}</span>
          </div>
        </div>
      )}
    </div>
  );
}
