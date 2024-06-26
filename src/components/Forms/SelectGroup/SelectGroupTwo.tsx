import React, { useState } from 'react';

interface SelectGroupTwoProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const SelectGroupTwo: React.FC<SelectGroupTwoProps> = ({ selectedOption, setSelectedOption }) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        Batiment
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
          {/* SVG icon */}
        </span>

        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Choisir Batiment
          </option>
          <option value="Zenith1" className="text-body dark:text-bodydark">
            Zénith 1
          </option>
          <option value="Zenith2" className="text-body dark:text-bodydark">
            Zénith 2
          </option>
          <option value="Charguia" className="text-body dark:text-bodydark">
            Charguia
          </option>
          <option value="Sfax" className="text-body dark:text-bodydark">
            Sfax
          </option>
        </select>

        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          {/* SVG icon */}
        </span>
      </div>
    </div>
  );
};

export default SelectGroupTwo;