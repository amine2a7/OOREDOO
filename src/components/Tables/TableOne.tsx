import React, { useEffect, useState } from 'react';
// import CheckCircleIcon from 'CheckCircle';

const TableOne = () => {
  const [visits, setVisits] = useState([]);
  const [employees, setEmployees] = useState({});
  const [visitors, setVisitors] = useState({});
  const [badges, setBadges] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitResponse = await fetch("http://localhost:5000/visit/getAllVisitsDaily");
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
  }, []);

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
            {visits.map((visit) => (
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
                    {visitors[visit.visitor]?.Visitor?.tel|| employees[visit.employee]?.Employee?.tel}
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
                        ? 'bg-success text-success ' 
                        : visit.vtype === 'desactive'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {visit.vtype}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                  {/* <CheckCircleIcon style={{ backgroundColor: '#FF0000' }}/> */}
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
