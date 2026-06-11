import { useState, useMemo } from "react";

const URL_VARIABLES = [
  { label: "Response ID", param: "RID" },
  { label: "Bid Incidence", param: "BidIncidence" },
  { label: "Panelist ID", param: "PID" },
  { label: "Supplier ID", param: "SupplierID" },
  { label: "Supplier Name", param: "SupplierName" },
  { label: "MID", param: "MID" },
  { label: "RSID", param: "RSID" },
];

export default function BuildSurvey({
  onApply,
}) {
  const [open, setOpen] =
    useState(false);

  const [baseUrl, setBaseUrl] =
    useState("");

  const [variables, setVariables] =
    useState([
      {
        label: "Response ID",
        param: "RID",
      },
    ]);

    const [surveyUrl, setSurveyUrl] = useState("");

  const addVariable = (item) => {
    const exists = variables.find(
      (v) => v.param === item.param
    );

    if (exists) return;

    setVariables((prev) => [
      ...prev,
      item,
    ]);
  };

  const removeVariable = (param) => {
    if (param === "RID") return;

    setVariables((prev) =>
      prev.filter(
        (v) => v.param !== param
      )
    );
  };

  const finalUrl = useMemo(() => {
    if (!baseUrl) return "";

    const separator =
      baseUrl.includes("?")
        ? "&"
        : "?";

    const params = variables
      .map(
        (v) =>
          `${v.param}=[%${v.param}%]`
      )
      .join("&");

    return `${baseUrl}${separator}${params}`;
  }, [baseUrl, variables]);

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        className="
          border
          px-4
          py-2
          rounded-lg
          bg-white
          hover:bg-gray-50
        "
      >
        Build URL
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">

          <div
            className="
              w-full
              max-w-2xl
              bg-white
              h-screen
              overflow-auto
              p-8
            "
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-semibold">
                Build URL
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-3xl"
              >
                ×
              </button>
            </div>

            <div>
              <label className="block text-lg mb-3">
                What is your URL?
              </label>

              <input
                value={baseUrl}
                onChange={(e) =>
                  setBaseUrl(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border-b
                  border-gray-400
                  pb-2
                  outline-none
                  text-xl
                "
                placeholder="https://tally.so/r/xxxxx"
              />
            </div>

            <div className="mt-10">
              <h3 className="text-2xl mb-2">
                Variables
              </h3>

              <p className="text-gray-600 mb-5">
                These URL parameters
                will be appended to
                your survey link.
              </p>

              <details className="mb-6">
                <summary
                  className="
                    cursor-pointer
                    border
                    px-4
                    py-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                  "
                >
                  Add Variable
                </summary>

                <div
                  className="
                    mt-3
                    border
                    rounded-lg
                    p-2
                    max-h-80
                    overflow-auto
                  "
                >
                  {URL_VARIABLES.map(
                    (item) => (
                      <button
                        key={item.param}
                        type="button"
                        onClick={() =>
                          addVariable(
                            item
                          )
                        }
                        className="
                          w-full
                          text-left
                          px-3
                          py-3
                          hover:bg-gray-100
                          rounded
                        "
                      >
                        <div className="font-medium">
                          {item.label}
                        </div>

                        <div className="text-sm text-gray-500">
                          {item.param}
                        </div>
                      </button>
                    )
                  )}
                </div>
              </details>

              <div className="space-y-3">
                {variables.map(
                  (item) => (
                    <div
                      key={item.param}
                      className="
                        grid
                        grid-cols-[1fr_1fr_auto]
                        gap-4
                        bg-gray-100
                        p-4
                        rounded
                      "
                    >
                      <div>
                        {item.label}
                      </div>

                      <input
                        value={
                          item.param
                        }
                        readOnly
                        className="
                          bg-transparent
                          outline-none
                        "
                      />

                      {item.param !==
                        "RID" && (
                        <button
                          onClick={() =>
                            removeVariable(
                              item.param
                            )
                          }
                          className="text-red-500"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="border-t mt-10 pt-8">
              <h3 className="text-2xl mb-4">
                Final URL
              </h3>

              <textarea
                value={finalUrl}
                readOnly
                rows={5}
                className="
                  w-full
                  border
                  p-4
                  rounded-lg
                "
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() =>
                  setOpen(false)
                }
                className="
                  border
                  px-6
                  py-3
                "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onApply?.(
                    finalUrl
                  );

                  setOpen(false);
                }}
                className="
                  bg-purple-700
                  text-white
                  px-6
                  py-3
                "
              >
                Apply URL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}