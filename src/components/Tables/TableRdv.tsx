import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableRdv = () => {
  const [rdvs, setrdvs] = useState([]);
  const [filteredRdvs, setFilteredRdvs] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedstatut, setSelectedstatut] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/rdv/getAllRdvs")
      .then((res) => res.json())
      .then((result) => {
        setrdvs(result);
        setFilteredRdvs(result);
      });
  }, []);
  const fetchRdvs = () => {
    fetch("http://localhost:5000/rdv/getAllRdvs")
      .then((res) => res.json())
      .then((result) => {
        setrdvs(result);
        setFilteredRdvs(result);
      });
  };
  useEffect(() => {
    
    filterRdvs();
  }, [selectedService, selectedstatut]);

  const filterRdvs = () => {
    let filtered = rdvs;

    if (selectedService) {
      filtered = filtered.filter(rdv => rdv.service === selectedService);
    }

    if (selectedstatut) {
      filtered = filtered.filter(rdv => rdv.statut === selectedstatut);
    }

    setFilteredRdvs(filtered.sort((a, b) => {
      const statutOrder = { 'en attente': 1, 'accepte': 2, 'refuse': 3 };
      return statutOrder[a.statut] - statutOrder[b.statut];
    }));
  };

  const getstatutStyle = (statut) => {
    switch (statut) {
      case 'accepte':
        return 'bg-green-100 text-green-700 shadow-md rounded px-2 py-1';
      case 'refuse':
        return 'bg-red-100 text-red-700 shadow-md rounded px-2 py-1';
      case 'en attente':
        return 'bg-gray-100 text-gray-700 shadow-md rounded px-2 py-1';
      default:
        return 'shadow-md rounded px-2 py-1';
    }
  };

  const handlestatutChange = (id, statut) => {
    axios.put(`http://localhost:5000/rdv/updateRdv/${id}`, { statut })
      .then(response => {
        setrdvs(prevRdvs => prevRdvs.map(rdv => rdv._id === id ? { ...rdv, statut: response.data.statut } : rdv));
        fetchRdvs();
        filterRdvs();
      })
      .catch(error => {
        console.error('Error updating statut:', error);
      });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex mb-4">
        <div className="mr-4">
          <label htmlFor="serviceFilter" className="block mb-2 text-sm font-medium text-gray-700">Filtrer par Service</label>
          <select 
            id="serviceFilter" 
            value={selectedService} 
            onChange={(e) => setSelectedService(e.target.value)} 
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="">Tous les Services</option>
            {[...new Set(rdvs.map(rdv => rdv.service))].map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="statutFilter" className="block mb-2 text-sm font-medium text-gray-700">Filtrer par Statut</label>
          <select 
            id="statutFilter" 
            value={selectedstatut} 
            onChange={(e) => setSelectedstatut(e.target.value)} 
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="">Tous les Statuts</option>
            <option value="en attente">En attente</option>
            <option value="accepte">accepte</option>
            <option value="refuse">refuse</option>
          </select>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nom et Prenom
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Tel
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Entreprise
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Service
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Temps
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Note
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Statut
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRdvs.map((rdv) => (
              <tr key={rdv.key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {rdv.nom}
                  </h5>
                  <p className="text-sm">{rdv.prenom}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {rdv.tel}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {rdv.entreprise}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {rdv.service}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {rdv.dater}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {rdv.timer}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {rdv.note}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className={getstatutStyle(rdv.statut)}>
                    {rdv.statut}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {rdv.statut === 'en attente' && (
                  <>
                  <button 
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2" 
                    onClick={() => handlestatutChange(rdv._id, 'accepte')}
                  >
                    Accepter
                  </button>
                  <button 
                    className="bg-red-500 text-white px-2 py-1 rounded" 
                    onClick={() => handlestatutChange(rdv._id, 'refuse')}
                  >
                    Refuser
                  </button>
                  </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRdv;
