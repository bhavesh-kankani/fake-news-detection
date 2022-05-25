import React from "react";

const Aggregator = ({ history }) => {
  return (
    <div>
      <h1>Aggregator</h1>
      <button
        onClick={() => {
          history.push("/signin");
          history.go();
        }}
      >
        Sign In
      </button>
      <button
        onClick={() => {
          history.push("/signup");
          history.go();
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Aggregator;
