import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const Header = ({ userData }) => {
/** functions **/
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
            Virtual currency wallet
        </div>

        <div className="flex items-center">
          <div className="flex items-center flex-col">
            <div className="mr-2">
              {userData.name ? userData.name : "Guest"}
            </div>
            <div className="flex items-center">
              {`Balance: ${userData.balance ? userData.balance : 0}€`}
            </div>
          </div>
          <FiLogOut className="cursor-pointer ml-4" onClick={logout} size={20}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
