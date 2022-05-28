import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Aggregator from "./components/Aggregator";
import FactChecker from "./components/FactChecker";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
          <Routes>
            <Route exact path="/" element={<Aggregator />} />
            <Route exact path="/fake-news-check" element={<FactChecker />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
