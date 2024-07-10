import React, { useState } from "react";
import axios from "axios";
import ValidationSchema from "../../Schemas/validationSchema";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
function Signup() {
  //const [name, setName] = useState();
  //const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const navigate = useNavigate();
  const initialvalues = {
    name: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        values
      );
      if (response.data._id) {
        navigate("/login");
      }
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      <Formik
        initialValues={initialvalues}
        onSubmit={handleSubmit}
        validationSchema={ValidationSchema}
      >
        <Form className="w-full max-w-sm bg-white p-8 rounded shadow-md">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              //value={name}
              // onChange={(e) => {  setName(e.target.value);  }}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your username"
              required
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              // value={email}
              // onChange={(e) => {
              //  setEmail(e.target.value);
              // }}

              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="email"
              className="text-red-600"
              component="div"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              // value={password}
              // onChange={(e) => {
              //   setPassword(e.target.value);
              // }}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              className="text-red-600"
              component="div"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Signup
            </button>
          </div>
          <button className="mt-2">
            {" "}
            Already have an account
            <a className="underline ml-2 text-blue-600 " href="/login">
              Login
            </a>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Signup;
