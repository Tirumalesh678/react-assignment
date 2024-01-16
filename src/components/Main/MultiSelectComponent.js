// MultiSelectComponent.js
import React, { useState } from 'react';

const MultiSelectComponent = ({ options }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  return (
    <div className="mb-4 mx-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="multiSelect">
        Multi-Select
      </label>
      <div className="relative flex flex-wrap">
        {options.map((item, index) => (
          <div
            key={index}
            className={`flex items-center border border-gray-300 rounded-full px-3 py-1 mr-2 mb-2 cursor-pointer ${
              selectedItems.includes(item) ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => toggleItem(item)}
          >
            <span className="mr-2">{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <strong>Selected Items:</strong>
        {selectedItems.length > 0 ? (
          <ul className="list-disc list-inside">
            {selectedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <span>No items selected</span>
        )}
      </div>
    </div>
  );
};

export default MultiSelectComponent;
