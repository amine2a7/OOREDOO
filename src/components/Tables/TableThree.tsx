import { Package } from '../../types/package';
import React from 'react';




const TableThree = () => {
  const [User, setUser] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:5000/api/getall")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
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
              {/* <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
          {User.map((users) => (
              <tr key={users.key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {users.identifiant}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {users.firstName}
                  </h5>
                  <p className="text-sm">{users.lastName}</p>
                </td>
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {users.username} 
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {users.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {users.role}
                  </p>
                  
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {users.batiment}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    
                  {/* <button style={{ backgroundColor: '#0FAC71' ,width:400 ,height:40}} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={() => handleBadgeUpdate(badges[visit.badge]?.Badge?.identifiant)}>
                      
                    
                      </button> */}
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
