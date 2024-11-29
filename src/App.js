import './App.css';
import { useState } from 'react';
import Header from './layout/Header';
import LoginCard from './components/LoginCard';
import ConverterSelector from "./components/ConverterSelector";

function App() {

  /** vars **/
  const [userData, setUserData] =
    useState({
      name: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).name : "",
      balance: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).balance : 0
    });
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged') ?? false);

  return (
    <div className="App bg-gray-400">
      {isLogged && <Header userData={userData}/>}
      {!isLogged ?
        <LoginCard setUserData={setUserData} setIsLogged={setIsLogged}/>
        :
        <ConverterSelector/>
      }
    </div>
  );
}

export default App;
