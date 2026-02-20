import API from "./axios";

// Get paginated inventory items
export const getInventory = () => API.get("/api/inventory");
