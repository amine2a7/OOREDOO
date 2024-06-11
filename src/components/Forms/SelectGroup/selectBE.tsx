import React, { useState } from 'react';

interface Badge {
  _id: string;
  identifiant: string;
}

interface SelectBProps {
  onChange: (selectedValue: string) => void; // Ajoutez cette prop onChange
}

const selectBE: React.FC<SelectBProps>  = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [badges, setBadges] = useState<Badge[]>([]);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  React.useEffect(() => {
    fetch("http://localhost:5000/badge/unavailable-employeeZ1")
      .then((res) => res.json())
      .then((result) => {
        setBadges(result);
      });
  }, []);
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {' '}
        Badge{' '}
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
            onChange(e.target.value); // Appel de la fonction de rappel avec la valeur sélectionnée
            console.log(e.target.value);
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Choisir Badge
          </option>
          
          {badges.map((badge) => (
            <option key={badge._id} value={badge._id} className="text-body dark:text-bodydark">
              {badge.identifiant}
            </option>
          ))}
        </select>
        
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          {/* SVG pour la flèche */}
        </span>
      </div>
    </div>
  );
};

export default selectBE;
