// // Login.tsx
// import React, { useState } from 'react';
// // import { useAuth } from '../contexts/AuthContex';

// const Login: React.FC = () => {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Check if username and password are not empty
//     if (username.trim() === '' || password.trim() === '') {
//       console.error('Username and password cannot be empty');
//       return;
//     }

//     // Implement your login logic here (e.g., check credentials against a backend)

//     // Simulate a successful login for demonstration purposes
 
//     console.log(`User "${username}" logged in successfully`);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
//     <h2 className="text-2xl font-semibold mb-4">Login</h2>
//     <label className="block mb-2">
//       Username:
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="w-full border border-gray-300 p-2 rounded"
//       />
//     </label>
//     <label className="block mb-2">
//       Password:
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full border border-gray-300 p-2 rounded"
//       />
//     </label>
//     <button
//       onClick={handleLogin}
//       className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//     >
//       Login
//     </button>
//   </div>
//   );
// };

// export default Login;


import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate()

  const {handleChange,handleSubmit,values ,touched, errors,resetForm}:any = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: values  => {
        axios.get('http://localhost:8000/users')
        .then(result => {
            result.data.map((users: { userName: string; password: string; }) => {
                if(users.userName === values.userName) {
                   if(users.password === values.password){
                    alert("login successfuly")
                     navigate('/dashboard')
                   }
                }
            })
            resetForm()
        })
        .catch(err => console.log(err))
    },
  });
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
  <div className="mb-4">
    <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">
      User Name
    </label>
    <input
      id="userName"
      name="userName"
      type="text"
      onChange={handleChange}
      value={values.userName}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
      Password
    </label>
    <input
      id="password"
      name="password"
      type="password" 
      onChange={handleChange}
      value={values.password}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    Submit
  </button>
</form>

  );
};

export default Login