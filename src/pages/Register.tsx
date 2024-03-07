
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
  const {handleChange,handleSubmit,values ,touched, errors,resetForm}:any = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    onSubmit: values => {
      axios.post('http://localhost:8000/users' , values)
      .then(result => console.log(result))
      .catch(err => console.log(err))
      resetForm()
      navigate('/')
    },
  });
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
    <div className="mb-4">
      <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">
        User Name
      </label>
      <input
        id="userName"
        name="userName"
        type="text"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={handleChange}
        value={values.userName}
      />
    </div>
  
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={handleChange}
        value={values.email}
      />
    </div>
  
    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={handleChange}
        value={values.password}
      />
    </div>
  
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
    >
      Submit
    </button>
  </form>
  
  );
};

export default Register