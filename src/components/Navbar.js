import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar1() {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const onclick = () => {
    setOpen(!open);
  };

  let location = useLocation();
  useEffect(() => {}, [location]);

  const handleClick = () => {
    localStorage.removeItem("token");
    navigation("/login");
  };
  return (
    <>
      <div>
        <nav className="md:flex items-center  py-2  md:px-1 justify-between bg-gray-800">
          <div className="logo flex ">
            <Link to="/Home">
              <h1 className="text-stone-300">iNotebook</h1>
            </Link>
          </div>

          <div
            onClick={onclick}
            className="cursor-pointer md:hidden right-1 top-2 absolute text-2xl"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <div
            className={
              "md:ml-5 flex  md:text-base text-gray-800 md:items-center md:justify-center "
            }
          >
            <ul
              className={`flex flex-col md:items-center md:flex-row md:space-x-3 absolute md:static ${
                open ? "top-10" : "top-[-480px]"
              } bg-stone-100 md:bg-inherit w-full md:w-auto transition-all ease-in duration-700`}
            >
              <li className="my-2 md:my-auto cursor-pointer text-xs text-stone-400 ">
                {/* Make Active Link */}
                {/*   this mini logic mean that if our path name is equal to our current component then active class text-white class */}
                <Link
                  className={`${
                    location.pathname === "/Home" ? "text-white" : ""
                  }`}
                  to="Home "
                >
                  Home
                </Link>
              </li>
              <li className="my-2 md:my-auto cursor-pointer text-xs text-stone-400">
                <Link
                  className={`${
                    location.pathname === "/About" ? "text-white" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {!localStorage.getItem("token") ? (
            <div className="">
              <Link
                to="/login"
                className="bg-slate-50 py-1 px-2 rounded-md outline-none border-none"
              >
                {" "}
                Login{" "}
              </Link>
              <Link
                to="/signup"
                className="bg-slate-50 py-1 px-2 rounded-md outline-none border-none mx-2"
              >
                {" "}
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={handleClick}
              className="bg-slate-50 py-1 px-2 rounded-md outline-none border-none mx-2"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </>
  );
}
