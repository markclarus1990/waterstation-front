export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Page title */}
      <div>
       <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
  Dashboard
</h1>
<p className="text-slate-500 mt-1 text-sm">
  Overview of today’s operations
</p>

      </div>
  

      {/* KPI CARDS */}
      <section className="grid grid-cols-4 gap-8
                          xl:grid-cols-4
                          lg:grid-cols-4
                          md:grid-cols-2
                          sm:grid-cols-1">
        <Stat
          title="Today Sales"
          value="₱0.00"
          accent="text-emerald-600"
        />
        <Stat
          title="Gallons Sold"
          value="0"
          accent="text-sky-600"
        />
        <Stat
          title="Customers Today"
          value="0"
          accent="text-indigo-600"
        />
        <Stat
          title="Low Stock Items"
          value="0"
          accent="text-rose-600"
        />
      </section>

      {/* LOWER PANELS */}
      <section className="grid grid-cols-2 gap-8
                          lg:grid-cols-2
                          md:grid-cols-1">
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`text-3xl font-bold mt-3 ${accent}`}>
        {value}
      </p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[180px]">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="text-sm text-slate-500">
      {text}
    </div>
  );
}
