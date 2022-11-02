import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Singup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert(" Account Created Successfully", "Succes")
    navigate("/");
    
    }
    else{
      props.showAlert(" Invalid Detail", "Error")
    }
   
    
  };

  //On change
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src="https://images.unsplash.com/photo-1658242106760-7a5c8f177180?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="my zomato"
          />
        </div>
        <div className="w-full xl:w-1/2 p-8">
          <form onSubmit={handleSubmit}>
            <h1 className=" text-2xl font-bold">Create an account</h1>
            <div>
              <span className="text-gray-600 text-sm">
                Already have account?{" "}
              </span>
              <span className="text-gray-700 text-sm font-semibold">
                <Link to="/Login">Login</Link>
              </span>
            </div>
            <div className="mb-4 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Name
              </label>
              <input
                onChange={onchange}
                name="name"
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                type="text"
                placeholder="Your Nice Name"
                required
                
              />
            </div>
            <div className="mb-4 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={onchange}
                name="email"
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                id="email"
                type="text"
                placeholder="Your email address"
                required
                
              />
            </div>
            <div className="mb-6 mt-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
               name="password"
                onChange={onchange}
                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                id="password"
                type="password"
                placeholder="Your password"
                required
                minLength={5}
              />
              
              {/* <a
                className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                href="/forgot"
              >
                Forgot Password?
              </a> */}
            </div>
            <div className="flex w-full mt-8">
              <button
                onSubmit={handleSubmit}
                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Singup;
