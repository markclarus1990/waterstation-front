import { useEffect, useState, useMemo } from "react";
import { createSale, getSales } from "../api/sales.api";
import { toast } from "react-toastify";
import { getCustomers } from "../api/customers.api";
import { getInventory } from "../api/inventory.api";
export default function Sales() {
  // STATES=============
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [inventoryItemId, setInventoryItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [customers, setCustomers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  // STATES=============

  // EFFECTS=========
  useEffect(() => {
    fetchSales();
    fetchCustomers();
    fetchInventory();
  }, []);
  // EFFECTS=========

  // FUNCTIONS=========
  const fetchSales = async () => {
    try {
      const response = await getSales();
      setSales(response.data.content || []);
    } catch (error) {
      toast.error("Failed to load sales");
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data.content || res.data);
    } catch {
      toast.error("Failed to load customers");
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await getInventory();
      setInventoryItems(res.data.content || res.data);
    } catch {
      toast.error("Failed to load inventory");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const username = localStorage.getItem("username");
      // Make sure you store username during login
      const itemData = inventoryItems.find(
        (item) => item.id === Number(selectedItem)
      );
      console.log("data", localStorage.getItem("username"));
      const payload = {
        username: localStorage.getItem("username"),
        paymentMethod,
        status: "COMPLETED", // or whatever your enum requires
        totalAmount: 0, // backend recalculates anyway
        customer: selectedCustomer,

        items: [
          {
            inventoryItemId: Number(selectedItem),
            quantity: Number(quantity),
            unitPrice: itemData.price,
          },
        ],
      };

      const response = await createSale(payload);

      toast.success("Sale created successfully");

      setSales((prev) => [response.data, ...prev]);

      setCustomerId("");
      setInventoryItemId("");
      setQuantity(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create sale");
    } finally {
      setLoading(false);
    }
  };
  // EFFECTS=========

  // ------------------------
  // KPIs (SaaS style metrics)
  // ------------------------

  const totalRevenue = useMemo(
    () => sales.reduce((acc, sale) => acc + Number(sale.total || 0), 0),
    [sales]
  );

  const totalTransactions = sales.length;

  const todayTransactions = sales.filter((sale) =>
    sale.saleDate?.startsWith(new Date().toISOString().slice(0, 10))
  ).length;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  // JSX
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Sales
        </h1>
        <p className="text-sm text-gray-500">
          Manage and track all sales transactions
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {formatCurrency(totalRevenue)}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {totalTransactions}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">Today's Transactions</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {todayTransactions}
          </p>
        </div>
      </div>

      {/* Create Sale Card */}
      {/* Create Sale Card */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">
          Create New Sale
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
          {/* Customer Dropdown */}
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.fullName}>
                {c.fullName}
              </option>
            ))}
          </select>

          {/* Inventory Dropdown */}
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            required
          >
            <option value="">Select Item</option>
            {inventoryItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} (Stock: {item.currentStock})
              </option>
            ))}
          </select>

          {/* Quantity */}
          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            required
          />

          {/* Payment */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            <option value="CASH">CASH</option>
            <option value="GCASH">GCASH</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="col-span-4 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Processing..." : "Create Sale"}
          </button>
        </form>
      </div>

      {/* Sales Table */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">Sales List</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Staff</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Payment</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <td className="py-3">{sale.id}</td>
                  <td>{sale.customerName}</td>
                  <td>{sale.staffName}</td>
                  <td className="font-semibold text-gray-800">
                    {formatCurrency(sale.total)}
                  </td>
                  <td>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="text-gray-500">
                    {new Date(sale.saleDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sales.length === 0 && (
            <div className="py-10 text-center text-gray-400">
              No sales recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
