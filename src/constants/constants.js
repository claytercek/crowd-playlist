var apiUrl;

if (process.env.NODE_ENV === "development") {
	apiUrl = "http://localhost:3001";
} else {
	apiUrl = "";
}

console.log(apiUrl);

export { apiUrl };
