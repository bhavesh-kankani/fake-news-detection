import React from "react";
import { useNavigate } from "react-router-dom";

const Aggregator = () => {
	const navigate = useNavigate();
	return (
		<div>
			<h1>Aggregator</h1>
			<button
				onClick={() => {
					navigate("/signin");
				}}
			>
				Sign In
			</button>
			<button
				onClick={() => {
					navigate("/signup");
				}}
			>
				Sign Up
			</button>
		</div>
	);
};

export default Aggregator;
