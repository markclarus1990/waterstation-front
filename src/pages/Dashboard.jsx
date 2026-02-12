export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Page title */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of today’s operations
        </p>
      </div>

      {/* KPI CARDS */}
      <section className="grid grid-cols-4 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <Stat title="Today Sales" value="₱0.00" accent="text-emerald-600" />
        <Stat title="Gallons Sold" value="0" accent="text-sky-600" />
        <Stat title="Customers Today" value="0" accent="text-indigo-600" />
        <Stat title="Low Stock Items" value="0" accent="text-rose-600" />
      </section>

      {/* LOWER PANELS */}
      <section className="grid grid-cols-2 gap-8 md:grid-cols-1 lg:grid-cols-2">
        <Panel title="Recent Sales">
          <EmptyState text="No sales recorded yet." />
        </Panel>

        <Panel title="Inventory Alerts">
          <EmptyState text="All inventory levels are normal." />
        </Panel>
      </section>
    </div>
  );
}

/* ---------- Components ---------- */

function Stat({ title, value, accent }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="min-h-[180px] rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function EmptyState({ text }) {
  return <div className="text-sm text-slate-500">{text}</div>;
}
