"use client";

import { useState } from 'react';
import LinePlot from '@/components/LinePlot'; // Assuming you have this component

const Page = () => {
  // Initial data for both x-axis and y-axis
  const [data, setData] = useState([{ x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 9 }]);

  // Add new row with default values (incremented x and y)
  const handleAddRow = () => {
    const lastRow = data[data.length - 1];
    setData([...data, { x: lastRow.x + 1, y: lastRow.y + 1 }]); // Add a new row with incremented x and y values
  };

  // Handle changes in the table input fields
  const handleDataChange = (index, axis, event) => {
    const newData = [...data];
    newData[index][axis] = parseFloat(event.target.value); // Update x or y value at the specified index
    setData(newData);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Line plot */}
      <LinePlot 
        datax={data.map(d => d.x)} 
        datay={data.map(d => d.y)} 
      />

      {/* Input table for datax and datay */}
      <div className="w-full max-w-2xl">
        <h3 className="text-white mb-4 text-center">X and Y Axis Data</h3>
        <table className="table-auto bg-gray-800 text-white w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Index</th>
              <th className="px-4 py-2">X Value</th>
              <th className="px-4 py-2">Y Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center">{index}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.x}
                    onChange={(e) => handleDataChange(index, 'x', e)}
                    className="bg-gray-700 text-white w-full px-2 py-1 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.y}
                    onChange={(e) => handleDataChange(index, 'y', e)}
                    className="bg-gray-700 text-white w-full px-2 py-1 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Button to add more rows */}
        <div className="flex justify-center">
          <button
            onClick={handleAddRow}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            + Add Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
