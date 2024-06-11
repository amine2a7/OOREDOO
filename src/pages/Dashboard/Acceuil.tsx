import React, { useState, useEffect } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

import SelectBE from '../../components/Forms/SelectGroup/selectBE';
import SelectB from '../../components/Forms/SelectGroup/selectB';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MultiSelect from '../../components/Forms/MultiSelect';
const ECommerce: React.FC = () => {

  const [Employee, setEmployee] = React.useState([]);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    tel: '',
    cin: '',
    employee: '',
    badge: ''
  });

  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedBadge, setSelectedBadge] = useState<string>('');

  // Définir les fonctions de rappel pour mettre à jour le state formData avec les valeurs sélectionnées
const handleEmployeeSelection = (selectedValue: string) => {
  setSelectedEmployee(selectedValue);
  setFormData((prevData) => ({
    ...prevData,
    employee: selectedValue // Mettre à jour le state formData avec l'ID de l'employé sélectionné
  }));
};

const handleBadgeSelection = (selectedValue: string) => {
  setSelectedBadge(selectedValue);
  setFormData((prevData) => ({
    ...prevData,
    badge: selectedValue // Mettre à jour le state formData avec l'ID du badge sélectionné
  }));
};
    React.useEffect(() => {
      fetch("http://localhost:5000/employee/getAllEmployees")
        .then((res) => res.json())
        .then((result) => {
          setEmployee(result);
        });
    }, []);
    

    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:5000/visit/addVisit", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          console.log('Visit added successfully');
        } else {
          console.error('Error adding visit');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    const handleSubmitE = async () => {
      try {
        const response = await fetch("http://localhost:5000/visit/addBadgeE", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          console.log('Visit added successfully');
        } else {
          console.error('Error adding visit');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
       
        <Link
              to="#"
              style={{ backgroundColor: '#FF0000' ,width:200 ,height:20}}
              className="inline-flex items-center  rounded-md bg-primary  justify-center gap-2.5 bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
             
              Nouvelle Visite
            </Link>
            <br></br>
            
            <br></br>
            <Link
            style={{ backgroundColor: '#FF0000' ,width:250 ,height:20}}
              to="#"
              className="inline-flex items-center  rounded-md bg-primary  justify-center gap-2.5 bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              
                
              Badge Employee
            </Link>

       
      </div>
   
     <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Visite
              </h3>
            </div> */}
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      placeholder="Enter le nom"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Prenom
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      placeholder="Enter le prenom"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Cin <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="cin"
                    value={formData.cin}
                    onChange={handleInputChange}
                    placeholder="Enter le numero cin"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tel
                  </label>
                  <input
                    type="text"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    placeholder="Entre le tel"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                
               <MultiSelect id="multiSelect" onChange={handleEmployeeSelection}/> 
                
  
          
                
             <SelectB onChange={handleBadgeSelection}/>
             
                

               
<br></br>
                <button style={{ backgroundColor: '#FE5551',width:400 ,height:40 }} className="flex w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90" >
                 
                  Anuller
                </button>
                <br></br>
                <button onClick={handleSubmit} style={{ backgroundColor: '#0FAC71' ,width:400 ,height:40}} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Valide
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          
          

          {/* <!-- Sign Up Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Badge
              </h3>
            </div> */}
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">

             

                  <label className="mb-2.5 block text-black dark:text-white">
                    Matricule
                  </label>
                  <MultiSelect id="multiSelect" onChange={handleEmployeeSelection}/> 
                </div>

                

                

                {/* <div className="mb-5.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Badge disponible
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div> */}

                
            <SelectBE onChange={handleBadgeSelection}/>
                <br></br>
                <button style={{ backgroundColor: '#FE5551' ,width:400 ,height:40}} className="flex w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90" >
                 
                  Anuller
                </button>
                <br></br>
                <button onClick={handleSubmitE} style={{ backgroundColor: '#0FAC71' ,width:400 ,height:40}} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Valide
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        
        
     

      
    </DefaultLayout>
  );
};

export default ECommerce;



