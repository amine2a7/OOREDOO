import React from 'react';


import DefaultLayout from '../../layout/DefaultLayout';

import TableThree from '../../components/Tables/TableThree';

 
const UserListe: React.FC = () => {
  return (
    
    <DefaultLayout>
     
        <br></br>
        
                <br></br>
                <button  style={{ backgroundColor: '#FF0000' ,width:600 ,height:40,alignItems:'center' }} className="flex w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90" >
                 
                  Liste Des des utilisateurs
                </button>
              
                  <br></br>
                  
      <TableThree />



      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8"> 
        </div>

      </div>
    </DefaultLayout>

  );
};

export default UserListe;
