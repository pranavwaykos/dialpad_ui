import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIServiceProvider from "./context/apiserviceContext";
import AppConstantProvider from "./context/appConstantContext";

function App() {
  return (
    <AppConstantProvider>
      <APIServiceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </APIServiceProvider>
    </AppConstantProvider>
  );
}

export default App;
