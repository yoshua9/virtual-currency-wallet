import React, { useState } from 'react';

const LoginCard = ({ setUserData, setIsLogged }) => {
  /** var **/
  const [userName, setUsername] = useState("");
  const [balance, setBalance] = useState(0);

  /** functions **/
  const initSession = async () => {
    setUserData({ name: userName, balance });
    setIsLogged(true);
    localStorage.setItem('userData', JSON.stringify({ name: userName, balance }));
    localStorage.setItem('isLogged', true);
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="
        bg-white
        max-w-lg
        w-full
        max-h-[400px]
        h-full
        overflow-hidden
        rounded-lg
      ">
        <div className="bg-gray-800 px-6 py-4">
          <div className="font-bold text-xl text-white mb-2">Virtual currency wallet</div>
        </div>
        <div className="px-6 pt-10 pb-10">

          <div className="mb-10">
            <label className="block text-gray-700 text-sm font-bold text-start mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Introduce tu nombre de usuario"
              className="border rounded py-2 px-3 text-gray-700 w-full"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-sm font-bold text-start mb-2" htmlFor="saldo">
              Saldo (en Euros)
            </label>
            <input
              id="saldo"
              type="number"
              placeholder="Introduce tu saldo"
              className="border rounded py-2 px-3 text-gray-700 w-full"
              min={0}
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              onBlur={
                (e) => {
                  e.target
                    .value > 0 ? setBalance(parseFloat(e.target.value)) : setBalance(0)
                }
              }
            />
          </div>

          <button className="
            bg-gray-800
            hover:bg-white
            hover:border
            hover:border-gray-800
            hover:text-gray-800
            text-white
            font-bold
            py-2
            px-4
            rounded
            disabled:opacity-50
          "
          onClick={initSession}
          disabled={!userName || balance <= 0}
          >
            Acceder
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
