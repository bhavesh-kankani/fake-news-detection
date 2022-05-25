import React from "react";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Aggregator from "./components/Aggregator";
import FactChecker from "./components/FactChecker";
import { HashRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  // conditionally render <Navbar />
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Route exact path="/" component={Aggregator} />
          <Route exact path="/fakenewscheck" component={FactChecker} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
