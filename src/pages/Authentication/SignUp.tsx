import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo/logo3.png';
import phone from '../../images/logo/phone.png';
import perso from '../../images/logo/perso.png';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';




const SignUp: React.FC = () => {
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
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'hotesse',
    batiment: '',
  };

  const validate = (fields) => {
    let errors = {};
    if (!fields.firstName) errors.firstName = 'First name is required';
    if (!fields.lastName) errors.lastName = 'Last name is required';
    if (!fields.userName) errors.userName = 'Username is required';
    if (!fields.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!fields.password) errors.password = 'Password is required';
    if (!fields.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (fields.confirmPassword !== fields.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData.entries());
    const validationErrors = validate(fields);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const { firstName, lastName, userName, email, password, batiment } = fields;
  
        // Enregistrer l'utilisateur
        const registrationResponse = await axios.post('http://localhost:5000/api/register', {
          username: userName,
          password,
          firstName,
          lastName,
          profilpicture: uploadedFile,
          email,
          batiment,
          role: 'hotesse',
        });
  
        // Handle the registration response
        if (registrationResponse.status === 201) {
          const userId = registrationResponse.data.id;
          console.log('User registered successfully:', userId);
  
          // Générez l'OTP - Modifier la méthode de POST à GET
          const otpResponse = await axios.get('http://localhost:5000/api/generateOTP', {
            params: { email }, // Passer les paramètres dans la requête GET
          });
          const code = otpResponse.data.code; // Récupérer le code OTP
  
          // Envoyez l'OTP par email
          await axios.post('http://localhost:5000/api/sendOTP', {
            userEmail: email,
            username: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
            otp: code,
          });
  
          // Afficher un message de succès
          alert('Registration successful! An OTP has been sent to your email.');
          navigate('/auth/signin');
        } else {
          throw new Error('Registration failed');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    }
  };
  
  

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setUploadedFile(base64);
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
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      className={`w-full rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      className={`w-full rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      />
                      {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    User Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="userName"
                      placeholder="Enter your username"
                      className={`w-full rounded-lg border ${errors.userName ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      />
                      {errors.userName && <p className="text-red-500">{errors.userName}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      
                      className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      />
                      {errors.email && <p className="text-red-500">{errors.email}</p>}
                  </div>
                </div>
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
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Profile Picture
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="profilpicture"
                      onChange={onUpload}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <SelectGroupTwo />
                <br />
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border p-4 text-white transition hover:bg-opacity-90"
                    style={{ background: '#FF0000' }}
                   
                  />
                </div>
                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C7.52349 16.0928 5.23371 14.397 4.39265 11.9424L4.2729 11.9515L1.11394 14.3417L1.06934 14.455C2.75193 17.692 6.25605 19.9999 10.2055 19.9999Z"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39454 11.9427C3.69196 10.1718 3.69196 8.21483 4.39454 6.44385L4.38479 6.31106L1.18567 3.87207L1.06963 3.92082C-0.354986 6.84206 -0.354986 11.5446 1.06963 14.4659L4.39454 11.9427Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2055 3.86841C11.8471 3.84389 13.4205 4.44967 14.5981 5.56678L17.0241 3.14079C15.1947 1.4136 12.7432 0.45231 10.2055 0.533149C6.25605 0.533149 2.75193 2.84108 1.06934 6.0777L4.39445 8.6009C5.23362 6.14632 7.5234 4.45055 10.2055 3.86841Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign up with Google
                </button>
                <div className="mt-6 text-center">
                  <p className="text-base font-medium text-body-color">
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-primary hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
