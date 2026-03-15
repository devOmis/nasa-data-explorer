import React from "react";

export const Loader: React.FC = () => (
	<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
		<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Loading">
			<circle cx="20" cy="20" r="18" stroke="#888" strokeWidth="4" opacity="0.2" />
			<circle cx="20" cy="20" r="18" stroke="#1976d2" strokeWidth="4" strokeDasharray="90 60" strokeLinecap="round">
				<animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite" />
			</circle>
		</svg>
	</div>
);
