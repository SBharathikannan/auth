import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import ValidationSchema from "../../Schemas/validationSchema.js";
function Login() {
  // const [email, setEmail] = useState("");
  //  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const initialvalue = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    console.log("Hi");

    try {
      console.log("Hi");
      const res = await axios.post("http://localhost:3000/login", values);
      console.log(res);
      if (!res.data.user || !res.data.user._id) {
        console.log("Invalid credentials");
        alert("Invalid Credentials");
        return;
      }
      if (res.data.user._id) {
        const user = JSON.stringify(res.data.user);
        localStorage.setItem("User", user);
        localStorage.setItem("Token", res.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialvalue}
        validationSchema={ValidationSchema}
      >
        <Form className="w-full max-w-sm bg-white p-8 rounded shadow-md">
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
              //onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
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
              //onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
          <div className="mt-2">
            <span>I don't have an account</span>
            <a className="underline ml-2 text-blue-600" href="/register">
              Signup
            </a>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
