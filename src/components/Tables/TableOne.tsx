import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableOne = () => {
  const [visits, setVisits] = useState([]);
  const [employees, setEmployees] = useState({});
  const [visitors, setVisitors] = useState({});
  const [badges, setBadges] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [badgeUpdated, setBadgeUpdated] = useState(false);
  const [userData, setUserData] = useState(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    return storedUserData;
  });

  useEffect(() => {
    const fetchUserData = async () => { 
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/userToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData(); 
  }, []);

  useEffect(() => { 
    if (userData.batiment) {
      let url = '';
      switch (userData.batiment) {
        case 'zenith1':
          url = "http://localhost:5000/visit/getAllVisitsDailyzenith1";
          break;
        case 'zenith2':
          url = "http://localhost:5000/visit/getAllVisitsDailyzenith2";
          break;
        case 'charguiadt':
          url = "http://localhost:5000/visit/getAllVisitsDailycharguiadt";
          break;
          case 'charguiadsc':
            url = "http://localhost:5000/visit/getAllVisitsDailycharguiadsc";
            break;
        case 'sfax':
          url = "http://localhost:5000/visit/getAllVisitsDailysfax";
          break;
        default:
          console.error("Unknown building");
          return;
      }

      const fetchData = async () => {
        try {
          const visitResponse = await fetch(url);
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
    }
  }, [userData.batiment, badgeUpdated]);

  const handleBadgeUpdate = async (badgeId, VisitId) => {
    try {
      const response = await fetch(`http://localhost:5000/badge/updateBadgeDispo/${badgeId}/${VisitId}`, {
        method: 'PUT'
      });

      if (response.ok) {
        console.log('Badge updated successfully');
      } else {
        console.error('Error updating badge');
      }
    } catch (error) {
      console.error('Error updating badge:', error);
    }
    window.location.reload();
  };

  const sortedVisits = [...visits].sort((a, b) => {
    if (a.vtype === 'active' && b.vtype !== 'active') return -1;
    if (a.vtype !== 'active' && b.vtype === 'active') return 1;
    return 0;
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedVisits.map((visit) => (
              <tr key={visit._id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {visitors[visit.visitor]?.Visitor?.nom || '-----------'} {visitors[visit.visitor]?.Visitor?.prenom}
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
                  <div className="flex items-center space-x-3.5">
                    <button 
                      style={{ backgroundColor: '#FF0000', width: 60, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" 
                      onClick={() => handleBadgeUpdate(visit.badge, visit._id)} 
                    >
                      Termine
                    </button>
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

export default TableOne;
