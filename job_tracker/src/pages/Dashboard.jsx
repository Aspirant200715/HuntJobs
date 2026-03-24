import useApplications from "../hooks/useApplications";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-sm shadow-lg backdrop-blur">
      {label ? <p className="font-bold text-slate-700">{label}</p> : null}
      <p className="font-semibold text-slate-900">
        {payload[0].name || "Value"}: {payload[0].value}
      </p>
    </div>
  );
};

function Dashboard({ userName }) {
  const { applications } = useApplications();
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [activeBarIndex, setActiveBarIndex] = useState(-1);

  const total = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "Interviewing",
  ).length;

  const offers = applications.filter((app) => app.status === "Offer").length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  const pieData = [
    { name: "Applied", value: total - interviews - offers - rejected },
    { name: "Interviewing", value: interviews },
    { name: "Offer", value: offers },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = ["#6366f1", "#22c55e", "#facc15", "#ef4444"];

  const monthlyData = {};

  applications.forEach((app) => {
    if (app.appliedDate) {
      const month = new Date(app.appliedDate).toLocaleString("default", {
        month: "short",
      });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    }
  });

  const barData = Object.keys(monthlyData).map((month) => ({
    month,
    count: monthlyData[month],
  }));

  return (
    <div>
      <h1 className="app-page-title">Dashboard</h1>
      <p className="app-page-subtitle mb-6">
        Welcome,{" "}
        <span className="font-semibold text-slate-900">{userName}</span>. You
        currently have {total} opportunities tracked.
      </p>

      {/* 🔢 STAT CARDS */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {[
          { label: "Total Applications", value: total },
          { label: "Interviews", value: interviews },
          { label: "Offers", value: offers },
          { label: "Rejected", value: rejected },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="app-card p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {item.label}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {item.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* 📊 CHARTS */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="app-card p-6"
        >
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Application Status
          </h3>

          <div className="h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={4}
                  stroke="none"
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      opacity={activePieIndex === index ? 1 : 0.72}
                    />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px", fontWeight: 700 }}
                />
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="app-card p-6"
        >
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Monthly Applications
          </h3>

          <div className="h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <defs>
                  <linearGradient
                    id="barDashGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="url(#barDashGradient)"
                  radius={[8, 8, 0, 0]}
                  barSize={34}
                  onMouseEnter={(_, index) => setActiveBarIndex(index)}
                  onMouseLeave={() => setActiveBarIndex(-1)}
                >
                  {barData.map((_, index) => (
                    <Cell
                      key={index}
                      opacity={
                        activeBarIndex === -1 || activeBarIndex === index
                          ? 1
                          : 0.65
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
