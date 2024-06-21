import React , { useState }from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/logo3.png';
import phone from '../../images/logo/phone.png';
import perso from '../../images/logo/perso.png';
import  toast,{ Toaster } from 'react-hot-toast';
import {verifyOTP } from './helper/helpers';
import useAuthStore  from './helper/storeUser';

import * as Yup from 'yup';

const Otp: React.FC = () => {
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
    }
  };
 //const email = "aminekhadraoui51@gmail.com";


  const { email } = useAuthStore(state => state.auth);
const [code, setOTP] = useState();
const { state } = useLocation();
  const user = state?.user || {};
const validationSchema = Yup.object().shape({
  
  otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 characters'),
});

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ email, code });
      if (status === 201) {
        toast.success('Verify Successfully!');
        navigate('/auth/lockscreen', { state: { user } });
        return Promise.resolve(); // Return a resolved promise
      } 
        return Promise.reject(new Error('Verification failed')); // Return a rejected promise
      
    } catch (error) {
      toast.error('Wrong OTP! Check email again!');
      return Promise.reject(error); // Return a rejected promise
    }
  }
  

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="dark:hidden" src={Logo} alt="Logo" width={400} height={400}/>
              </Link>
              <div style={styles.imageContainer}>
                <img src={phone} alt="phone"/>
                <img src={perso} alt="perso" style={styles.persoImg}/>
              </div>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to ooredoo
              </h2>

              <form onSubmit = {onSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Otp
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="otp" // Add name attribute
                      placeholder="Entrez votre code otp"
                      onChange={(e) => setOTP(e.target.value) }
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                
                <br></br>
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Valide"
                    className="w-full cursor-pointer rounded-lg border p-4 text-white transition hover:bg-opacity-90"
                    style={{ background: '#FF0000'}}
                    onClick={onSubmit}
                  />
                </div>

                
               
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default Otp;
