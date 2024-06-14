import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";


const TableTwo = () => {
  const [visits, setVisits] = useState([]);
  const [employees, setEmployees] = useState({});
  const [visitors, setVisitors] = useState({});
  const [badges, setBadges] = useState({});
  const [badges1, setBadges1] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [badgeUpdated, setBadgeUpdated] = useState(false); // État ponpm fundur suivre si le badge a été mis à jour
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitResponse = await fetch("http://localhost:5000/visit/getAllVisitsArchive");
        const visitResult = await visitResponse.json();
        setVisits(visitResult);

        const employeeIds = [...new Set(visitResult.map(item => item.employee))];
        const visitorIds = [...new Set(visitResult.map(item => item.visitor))];
        const badgeIds = [...new Set(visitResult.map(item => item.badge))];

        const employeeData = {};
        const visitorData = {};
        const badgeData = {};

        await Promise.all([
          ...employeeIds.map(async id => {
            const res = await fetch(`http://localhost:5000/employee/getEmployeeById/${id}`);
            const data = await res.json();
            employeeData[id] = data;
          }),
          ...visitorIds.map(async id => {
            const res = await fetch(`http://localhost:5000/visitor/getVisitorById/${id}`);
            const data = await res.json();
            visitorData[id] = data;
          }),
          ...badgeIds.map(async id => {
            const res = await fetch(`http://localhost:5000/badge/getBadgeById/${id}`);
            const data = await res.json();
            badgeData[id] = data;
          })
        ]);

        setEmployees(employeeData);
        setVisitors(visitorData);
        setBadges(badgeData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [badgeUpdated]);
  const handleBadgeUpdate = async (badgeId) => {
    try {
      const response = await fetch(`http://localhost:5000/badge/updateBadgeDispo/${badgeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ disponible: true }) // Body de la requête (à adapter selon les besoins)
      });

      if (response.ok) {
        console.log('Badge updated successfully');
        setBadgeUpdated(!badgeUpdated); // Inverser l'état pour forcer le rechargement des données
      } else {
        console.error('Error updating badge');
      }
    } catch (error) {
      console.error('Error updating badge:', error);
    }
  };
  const filteredVisits = visits.filter(visit => {
    const startDateMatch = startDate === '' || new Date(visit.checkin) >= new Date(startDate);
    const endDateMatch = endDate === '' || new Date(visit.checkin) <= new Date(endDate);
    const buildingMatch = searchTerm === '' || badges[visit.badge]?.Badge?.batiment.includes(searchTerm);
    return startDateMatch && endDateMatch && buildingMatch;
  });

  const csvData = filteredVisits.map(visit => {
    return {
      'Nom et Prenom': `${visitors[visit.visitor]?.Visitor?.nom || '-----------'} ${visitors[visit.visitor]?.Visitor?.prenom}`,
      'N° Badge': badges[visit.badge]?.Badge?.identifiant,
      'Numero Tel': visitors[visit.visitor]?.Visitor?.tel || employees[visit.employee]?.Employee?.tel,
      'Personnel': `${employees[visit.employee]?.Employee?.nom} ${employees[visit.employee]?.Employee?.prenom}`,
      'Check-in': new Date(visit.checkin).toLocaleString(),
      'Check-out': new Date(visit.checkout).toLocaleString(),
      'Status': visit.vtype === 'active' ? 'active' : 'Terminee',
      'Batiment': badges[visit.badge]?.Badge?.batiment,
    };
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <div>
        <CSVLink data={csvData} filename={"filtered_visits.csv"}>
          Export Filtered Data
        </CSVLink>
      </div>
      <input
          type="text"
          placeholder="Filter Batiment"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nom et Prenom
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                N° Badge
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Numero Tel
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Personnel
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Check-in
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Check-out
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              Batiment
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVisits.map((visit) => (
              <tr key={visit._id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {visitors[visit.visitor]?.Visitor?.nom|| '------'} {visitors[visit.visitor]?.Visitor?.prenom}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {badges[visit.badge]?.Badge?.identifiant}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {visitors[visit.visitor]?.Visitor?.tel || employees[visit.employee]?.Employee?.tel}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {employees[visit.employee]?.Employee?.nom} {employees[visit.employee]?.Employee?.prenom}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(visit.checkin).toLocaleString()}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(visit.checkout).toLocaleString()}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      visit.vtype === 'active' 
                        ? 'bg-success text-success'
                        : visit.vtype === 'desactive' 
                        ? ' bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                     {visit.vtype === 'active' ? 'active' : 'Terminee'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {badges[visit.badge]?.Badge?.batiment}
                  </p>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTwo;
