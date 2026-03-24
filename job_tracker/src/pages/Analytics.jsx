import useApplications from "../hooks/useApplications";
import { generateInsights } from "../utils/insights";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

function Analytics() {
  const { applications } = useApplications();
  const insights = generateInsights(applications);

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
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Analytics & Insights
      </h1>

      {/* 🧠 INSIGHT CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
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
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/60 hover:shadow-lg transition-all relative overflow-hidden group border-l-4 border-blue-500"
          >
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">
              {item.label}
            </p>
            <h2 className="text-3xl font-black text-gray-900 mt-2">
              {item.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* 📊 MAIN CHARTS */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Status Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/60"
        >
          <h3 className="font-bold text-gray-800 mb-6 text-xl">
            Status Distribution
          </h3>

          <div className="flex justify-center">
            <PieChart width={300} height={250}>
              <Pie
                data={statusData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                stroke="none"
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            </PieChart>
          </div>
        </motion.div>

        {/* Platform Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/60"
        >
          <h3 className="font-bold text-gray-800 mb-6 text-xl">
            Applications by Platform
          </h3>

          <BarChart width={380} height={250} data={platformData}>
            <defs>
              <linearGradient id="platformGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={1} />
                <stop offset="100%" stopColor="#4ade80" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            <Bar dataKey="count" fill="url(#platformGradient)" radius={[6, 6, 0, 0]} barSize={35} />
          </BarChart>
        </motion.div>
      </div>

      {/* 📅 MONTHLY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/60 mt-8"
      >
        <h3 className="font-bold text-gray-800 mb-6 text-xl">Monthly Trends</h3>

        <div className="overflow-x-auto">
          <BarChart width={700} height={300} data={monthData}>
            <defs>
              <linearGradient id="monthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            <Bar dataKey="count" fill="url(#monthGradient)" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </div>
      </motion.div>

      {/* 🧠 AI INSIGHTS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/60 mt-8"
      >
        <h3 className="font-bold text-gray-800 mb-6 text-xl">AI Insights</h3>

        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li
              key={index}
              className="p-4 bg-white/50 backdrop-blur-sm rounded-xl text-gray-800 font-medium shadow-sm border border-white/50 flex items-start gap-3"
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
