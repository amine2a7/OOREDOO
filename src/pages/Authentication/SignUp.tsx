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
  const [selectedOption, setSelectedOption] = useState<string>('');


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
        const { firstName, lastName, userName, email, password } = fields;
  
        // Enregistrer l'utilisateur
        const registrationResponse = await axios.post('http://localhost:5000/api/register', {
          username: userName,
          password,
          firstName,
          lastName,
          profilpicture: uploadedFile,
          email,
          batiment: selectedOption, // Add the selected building value
          role: 'hotesse',
        });
  
       
          
  
          // Afficher un message de succès
          alert('Registration successful!');
          navigate('/auth/signin');
        
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
                <SelectGroupTwo selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                <br />
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border p-4 text-white transition hover:bg-opacity-90"
                    style={{ background: '#FF0000' }}
                   
                  />
                </div>
               
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
