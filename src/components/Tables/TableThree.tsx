import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const TableThree = () => {
  const [users, setUsers] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  // Récupération des utilisateurs depuis l'API
  useEffect(() => {
  const [User, setUser] = useState([]);
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/getall")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  }, []);

  // Récupération des utilisateurs connectés depuis l'API dédiée
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/connected-users")
      .then((res) => res.json())
      .then((result) => {
        setConnectedUsers(result.connectedUsers); // Accès à connectedUsers dans la réponse
      });
  }, []);

  // Vérifier si un utilisateur est connecté
  const isConnected = (username) => {
    if (!Array.isArray(connectedUsers)) {
      return false; // Retourne false si connectedUsers n'est pas un tableau
    }
    return connectedUsers.some(user => user.username === username);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please upload a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/employee/regenere-employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCsvData(response.data.newEmployees);
      alert('Employees regenerated successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <div>
      <input type="file" onChange={handleFileChange} />
      <button style={{ backgroundColor: 'red', color: 'white', margin: 10 }} onClick={handleUpload}>
        Upload and Process
      </button>

      
    </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Matricule
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nom et Prenom
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Username
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Batiment
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.identifiant}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.firstName}
                  </h5>
                  <p className="text-sm">{user.lastName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.username}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.role}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.batiment}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        isConnected(user.username) ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-xs">
                      {isConnected(user.username) ? 'Connecté' : 'Non connecté'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
