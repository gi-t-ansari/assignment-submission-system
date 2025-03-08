import React, { useState } from "react";
import { getShortName, MENU_ITEMS } from "../../config";
import { Link, useLocation } from "react-router-dom";
import { logoutUser, user } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [openLogoutMenu, setOpenLogoutMenu] = useState(false);

  const userDetails = useSelector(user);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("User Details -->", userDetails);

  const toggleMenu = () => {
    setOpenLogoutMenu((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    setOpenLogoutMenu(false);
  };

  return (
    <nav className="w-full h-fit flex justify-between items-center md:px-10 sm:px-6 py-3 shadow-xl">
      <h1 className="text-4xl font-bold">SASS</h1>
      <div className="flex items-center gap-x-6">
        <ul className="flex items-center gap-x-6 py-2">
          {MENU_ITEMS.map((ele) => (
            <li
              key={ele.url}
              className={`relative border-b-2  ${
                location.pathname === ele.url
                  ? "border-gray-800 font-semibold"
                  : "border-transparent"
              } transition-all duration-300 ease-linear`}
            >
              <Link to={ele.url} className="transition-all duration-300">
                {ele.name}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="cursor-pointer h-10 w-10 flex justify-center items-center rounded-full bg-gray-500 relative"
          onClick={toggleMenu}
        >
          <span className="text-white font-semibold">
            {getShortName(userDetails?.name)}
          </span>
          <button
            onClick={handleLogout}
            style={{
              backdropFilter: "blur(30px)",
              background: "#ff000020",
            }}
            className={`absolute text-[#ff0000] rounded px-3 py-1  w-fit h-fit cursor-pointer top-10 z-10 right-4 
                    transition-all duration-300 ease-linear transform ${
                      openLogoutMenu
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
