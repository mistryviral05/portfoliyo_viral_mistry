"use client"
export default function Table({ data, columns }) {
    return (
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border border-gray-300 p-2 bg-yellow-100">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((value, j) => (
                <td key={j} className="border border-gray-300 p-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  