// Composant SelectB
import React, { useState, useEffect } from 'react';

interface Badge {
  _id: string;
  identifiant: string;
}

interface SelectBProps {
  onChange: (selectedValue: string) => void; // Ajoutez cette prop onChange
}

const SelectB: React.FC<SelectBProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [badges, setBadges] = useState<Badge[]>([]);
  const token = "c";

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    let url = '';

    if (token === 'b') {
      url = "http://localhost:5000/badge/unavailable-visitorsZ1";
    } else if (token === 'a') {
      url = "http://localhost:5000/badge/unavailable-visitorsZ2";
    } else if (token === 'd') {
      url = "http://localhost:5000/badge/unavailable-visitorscharguia";
    } else if (token === 'c') {
      url = "http://localhost:5000/badge/unavailable-visitorssfax";
    } else {
      url = "http://localhost:5000/badge/getAllBadges";
    }

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setBadges(result);
      });
  }, [token]); // Ajoutez token comme dépendance pour effectuer le fetch en cas de changement de token

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

export default SelectB;
