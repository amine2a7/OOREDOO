import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/logo3.png';
import phone from '../../images/logo/phone.png';
import perso from '../../images/logo/perso.png';

const Reset: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

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

  const validate = () => {
    const newErrors = {};
    if (!values.password) newErrors.password = 'Password is required';
    if (!values.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/createResetSession');
      if (response.status === 201) {
        await axios.put('http://localhost:5000/api/resetPassword', {
          username,
          password: values.password,
        });

        alert('Password reset successful!');
        navigate('/auth/signin');
      } else {
        alert('Session expired. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Error resetting password. Please try again.');
    }
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
                Reset Password for {username}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
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
                      value={values.confirmPassword}
                      onChange={handleChange}
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
