import axios from "./axios";

export const getSales = () => axios.get("/sales");
export const createSale = (data) => axios.post("/sales", data);
