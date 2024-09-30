import { useState } from "react";

import "./App.css";
import Game from "./pages/Game";
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from "./components/ToastComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Game />
      <ToastComponent />
    </>
  );
}

export default App;
