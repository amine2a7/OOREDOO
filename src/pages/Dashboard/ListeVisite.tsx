import React from 'react';

import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { Package } from '../../types/package';
import TableThree from '../../components/Tables/TableThree';

const packageData: Package[] = [
  {
    name: 'Yassine',
    price: 'ferchichi',
    invoiceDate: `Jan 13,2023`,
    status: 'activé',
  },
  {
    name: 'Amine',
    price: 'Khadhraoui',
    invoiceDate: `Jan 13,2023`,
    status: 'désactivé',
  },
  {
    name: 'Business Package',
    price: 'ferchichi',
    invoiceDate: `Jan 13,2023`,
    status: 'activé',
  },
  {
    name: 'Amine',
    price: 'Khadhraoui',
    invoiceDate: `Jan 13,2023`,
    status: 'désactivé',
  },
];
const ListeVisite: React.FC = () => {
  return (
    <DefaultLayout>
        <br></br>
                <button style={{ backgroundColor: '#FE5551' }} className="flex w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90" >
                 
                  Liste Des Visites
                </button>
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

export default ListeVisite;
