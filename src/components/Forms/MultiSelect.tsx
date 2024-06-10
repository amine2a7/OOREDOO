import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface Option {
  value: string;
  text: string;
}

interface DropdownProps {
  id: string;
  onChange: (selectedValue: string) => void; // Ajoutez cette prop onChange

}

const MultiSelect: React.FC<DropdownProps> = ({ id, onChange }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option | null>(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/employee/getAllEmployees")
      .then((res) => res.json())
      .then((result) => {
        const employeeOptions = result.map((employee: any) => ({
          value: employee._id,
          text: `${employee.matricule} - ${employee.nom} ${employee.prenom}`
        }));
        
        setOptions(employeeOptions);
        
      });
  }, []);

  const handleChange = (event: any, value: Option | null) => {
    setSelected(value);
    console.log("em id",value);
    if (value) {
      onChange(value.value); // Appel de la fonction de rappel avec la valeur sélectionnée
    }
  };

  return (
    <div className="relative z-50">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Personel
      </label>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.text}
        value={selected}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} label="Personel" />}
        sx={{ width: 300 }}
      />
      <input type="hidden" name="values" value={selected ? selected.value : ''} />
    </div>
  );
};

export default MultiSelect;
