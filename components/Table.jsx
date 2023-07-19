const Table = ({ headers, data, actionButtons }) => {
  return (
    <>
      {/* Desktop view */}
      <div className="md:block hidden overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                SR
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
              {actionButtons && actionButtons.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => {
              const { _id, ...rest } = row;

              return (
                <tr key={rowIndex}>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {rowIndex + 1}
                  </td>
                  {Object.values(rest).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-2 py-4 text-sm text-gray-500 whitespace-nowrap mt-2"
                    >
                      {cell}
                    </td>
                  ))}
                  {actionButtons && actionButtons.length > 0 && (
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap mt-2">
                      {actionButtons.map((button, buttonIndex) => (
                        <button
                          key={buttonIndex}
                          onClick={() => button.onClick(row)}
                          className="mr-2"
                        >
                          {button.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile view */}
      <div className="md:hidden block overflow-x-auto w-full">
        <div className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => {
            const { _id, ...rest } = row;
            return (
              <div key={rowIndex} className="py-4 px-2">
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  <div className="font-bold">SR</div>
                  <div>{rowIndex + 1}</div>
                </div>
                {Object.entries(rest).map(([key, value]) => (
                  <div
                    key={key}
                    className="text-sm text-gray-500 whitespace-nowrap mb-2"
                  >
                    <div className="font-bold">{key}</div>
                    <div>{value}</div>
                  </div>
                ))}
                {actionButtons && actionButtons.length > 0 && (
                  <div className="text-sm text-gray-500 whitespace-nowrap mb-2">
                    {actionButtons.map((button, buttonIndex) => (
                      <button
                        key={buttonIndex}
                        onClick={() => button.onClick(row)}
                        className="mr-2"
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Table;
