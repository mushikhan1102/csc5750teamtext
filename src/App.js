
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Signup from "./pages/signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" component={Signup} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
