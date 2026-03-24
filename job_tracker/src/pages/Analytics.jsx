import useApplications from "../hooks/useApplications";
import { generateInsights } from "../utils/insights";
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

function Analytics() {
  const { applications } = useApplications();
  const insights = generateInsights(applications);
  const [activeStatusPieIndex, setActiveStatusPieIndex] = useState(0);
  const [activePlatformIndex, setActivePlatformIndex] = useState(-1);
  const [activeMonthIndex, setActiveMonthIndex] = useState(-1);

  // Status count
  const statusCount = {};
  applications.forEach((app) => {
    statusCount[app.status] = (statusCount[app.status] || 0) + 1;
  });

  const statusData = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  const COLORS = ["#6366f1", "#22c55e", "#facc15", "#ef4444"];

  // Platform count
  const platformCount = {};
  applications.forEach((app) => {
    platformCount[app.platform] = (platformCount[app.platform] || 0) + 1;
  });

  const platformData = Object.keys(platformCount).map((key) => ({
    platform: key,
    count: platformCount[key],
  }));

  // Monthly
  const monthlyData = {};
  applications.forEach((app) => {
    if (app.appliedDate) {
      const month = new Date(app.appliedDate).toLocaleString("default", {
        month: "short",
      });

      monthlyData[month] = (monthlyData[month] || 0) + 1;
    }
  });

  const monthData = Object.keys(monthlyData).map((month) => ({
    month,
    count: monthlyData[month],
  }));

  // Insights
  const topPlatform = Object.entries(platformCount).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];

  const successRate = ((statusCount["Offer"] || 0) / applications.length) * 100;

  return (
    <div>
      <h1 className="app-page-title">Analytics & Insights</h1>
      <p className="app-page-subtitle mb-8">
        Review performance trends and improve your application strategy.
      </p>

      {/* 🧠 INSIGHT CARDS */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {[
          { label: "Top Platform", value: topPlatform || "N/A" },
          {
            label: "Success Rate",
            value: applications.length ? `${successRate.toFixed(1)}%` : "0%",
          },
          { label: "Total Applications", value: applications.length },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="app-card border-l-4 border-l-indigo-500 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {item.label}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {item.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* 📊 MAIN CHARTS */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Status Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="app-card p-8"
        >
          <h3 className="mb-6 text-xl font-semibold text-slate-800">
            Status Distribution
          </h3>

          <div className="h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={4}
                  stroke="none"
                  onMouseEnter={(_, index) => setActiveStatusPieIndex(index)}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      opacity={activeStatusPieIndex === index ? 1 : 0.72}
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

        {/* Platform Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="app-card p-8"
        >
          <h3 className="mb-6 text-xl font-semibold text-slate-800">
            Applications by Platform
          </h3>

          <div className="h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <defs>
                  <linearGradient
                    id="platformGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={1} />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="platform"
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
                  fill="url(#platformGradient)"
                  radius={[8, 8, 0, 0]}
                  barSize={34}
                  onMouseEnter={(_, index) => setActivePlatformIndex(index)}
                  onMouseLeave={() => setActivePlatformIndex(-1)}
                >
                  {platformData.map((_, index) => (
                    <Cell
                      key={index}
                      opacity={
                        activePlatformIndex === -1 ||
                        activePlatformIndex === index
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

      {/* 📅 MONTHLY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="app-card mt-8 p-8"
      >
        <h3 className="mb-6 text-xl font-semibold text-slate-800">
          Monthly Trends
        </h3>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthData}>
              <defs>
                <linearGradient id="monthGradient" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#monthGradient)"
                radius={[8, 8, 0, 0]}
                barSize={38}
                onMouseEnter={(_, index) => setActiveMonthIndex(index)}
                onMouseLeave={() => setActiveMonthIndex(-1)}
              >
                {monthData.map((_, index) => (
                  <Cell
                    key={index}
                    opacity={
                      activeMonthIndex === -1 || activeMonthIndex === index
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

      {/* 🧠 AI INSIGHTS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="app-card mt-8 p-8"
      >
        <h3 className="mb-6 text-xl font-semibold text-slate-800">
          AI Insights
        </h3>

        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
            >
              <span className="text-xl">💡</span> <span>{insight}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default Analytics;
