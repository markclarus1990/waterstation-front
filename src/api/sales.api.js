import axios from "./axios";

// GET all sales
export const getSales = () => axios.get("/api/sales");

// CREATE sale
export const createSale = (data) => axios.post("/api/sales/create-sale", data);
