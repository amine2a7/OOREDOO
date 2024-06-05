import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import SwitcherFour from '../../components/Switchers/SwitcherFour';
import SwitcherOne from '../../components/Switchers/SwitcherOne';
import SwitcherThree from '../../components/Switchers/SwitcherThree';
import SwitcherTwo from '../../components/Switchers/SwitcherTwo';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import MultiSelect from '../../components/Forms/MultiSelect';
const ECommerce: React.FC = () => {
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
                    type="texte"
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
                    placeholder="Entre le tel"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                
                <MultiSelect id="multiSelect" />
              <SelectGroupTwo />
             
                

               
<br></br>
                <button style={{ backgroundColor: '#FE5551',width:400 ,height:40 }} className="flex w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90" >
                 
                  Anuller
                </button>
                <br></br>
                <button style={{ backgroundColor: '#0FAC71' ,width:400 ,height:40}} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                

                

                <div className="mb-5.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Badge disponible
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <br></br>
                <button style={{ backgroundColor: '#FE5551' ,width:400 ,height:40}} className="flex w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90" >
                 
                  Anuller
                </button>
                <br></br>
                <button style={{ backgroundColor: '#0FAC71' ,width:400 ,height:40}} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
