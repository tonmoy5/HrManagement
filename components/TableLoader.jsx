const TableLoader = ({ headers, rows, actionButtons }) => {
  return (
    <>
      <div className="md:block hidden overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider animate-pulse">
                SR
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider animate-pulse"
                >
                  {header}
                </th>
              ))}
              {actionButtons && actionButtons.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider animate-pulse">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array(rows)
              .fill()
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-6 py-3 text-sm whitespace-nowrap animate-pulse">
                    <div className="bg-gray-200 py-2 w-1/2 rounded"></div>
                  </td>
                  {headers.map((_, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-3 text-sm whitespace-nowrap animate-pulse"
                    >
                      <div className="bg-gray-200 py-2 w-1/2 rounded"></div>
                    </td>
                  ))}
                  {actionButtons && actionButtons.length > 0 && (
                    <td className="px-6 py-3 text-sm text-gray-500 whitespace-nowrap animate-pulse">
                      {actionButtons.map((button, buttonIndex) => (
                        <div
                          key={buttonIndex}
                          className="bg-gray-200 py-2 w-4 rounded inline-block mr-2"
                        ></div>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Mobile view */}
      <div className="md:hidden block overflow-x-auto w-full">
        <div className="bg-white divide-y divide-gray-200">
          {/* Loop through rows */}
          {Array(rows)
            .fill()
            .map((_, rowIndex) => (
              <div key={rowIndex} className="py-4 px-2">
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  <div className="font-bold">SR</div>
                  <div>
                    <div className="bg-gray-200 py-2 w-1/2 rounded"></div>
                  </div>
                </div>
                {/* Loop through headers */}
                {headers.map((_, cellIndex) => (
                  <div
                    key={cellIndex}
                    className="text-sm text-gray-500 whitespace-nowrap mb-2"
                  >
                    <div className="font-bold">{headers[cellIndex]}</div>
                    <div>
                      <div className="bg-gray-200 py-2 w-1/2 rounded"></div>
                    </div>
                  </div>
                ))}
                {actionButtons && actionButtons.length > 0 && (
                  <div className="text-sm text-gray-500 whitespace-nowrap mb-2">
                    {/* Loop through action buttons */}
                    {actionButtons.map((_, buttonIndex) => (
                      <div
                        key={buttonIndex}
                        className="bg-gray-200 py-2 w-4 rounded inline-block mr-2"
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default TableLoader;
