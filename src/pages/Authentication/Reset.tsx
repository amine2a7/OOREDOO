import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo/logo3.png';
import phone from '../../images/logo/phone.png';
import perso from '../../images/logo/perso.png';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';

const Reset: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState('');
  const [errors, setErrors] = useState({});

  const styles = {
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '15px',
      marginLeft: '150px',
    },
    persoImg: {
      width: '300px',
      height: '300px',
      marginLeft: '1px',
    },
  };

  const initialValues = {
    
    password: '',
    confirmPassword: '',
   
  };

  const validate = (fields) => {
    
    if (!fields.password) errors.password = 'Password is required';
    if (!fields.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (fields.confirmPassword !== fields.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };


 
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="dark:hidden" src={Logo} alt="Logo" width={400} height={400} />
              </Link>
              <div style={styles.imageContainer}>
                <img src={phone} alt="phone" />
                <img src={perso} alt="perso" style={styles.persoImg} />
              </div>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to ooredoo
              </h2>
              <form>
               
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      />
                      {errors.password && <p className="text-red-500">{errors.password}</p>}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      className={`w-full rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      />
                      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                  </div>
                </div>
                
                <br />
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Reset Password"
                    className="w-full cursor-pointer rounded-lg border p-4 text-white transition hover:bg-opacity-90"
                    style={{ background: '#FF0000' }}
                  />
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
