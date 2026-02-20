import API from "./axios";

// Get paginated customers
export const getCustomers = () => API.get("/api/customers");
