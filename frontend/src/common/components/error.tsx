import React from "react";

interface ErrorProps {
	message?: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => (
	<div style={{ color: "#d32f2f", background: "#fff0f0", padding: 16, borderRadius: 8, textAlign: "center" }}>
		<strong>Error:</strong> {message || "Something went wrong."}
	</div>
);
