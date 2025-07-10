import isDev from "./is-dev";

// This file defines TypeScript interfaces for the inventory API responses.
const baseUrl = isDev() ? "http://localhost:3000" : "https://elberyth.vercel.app";

export default baseUrl