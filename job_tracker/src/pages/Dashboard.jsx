import useApplications from "../hooks/useApplications";
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

function Dashboard({ userName }) {
  const { applications } = useApplications();

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
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome, <span className="font-semibold text-gray-900">{userName}</span>
        . You currently have {total} opportunities tracked.
      </p>

      {/* 🔢 STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
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
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-gray-500">{item.label}</p>
            <h2 className="text-xl font-bold">{item.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* 📊 CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="font-semibold mb-4">Application Status</h3>

          <div className="flex justify-center">
            <PieChart width={300} height={250}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            </PieChart>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="font-semibold mb-4">Monthly Applications</h3>

          <BarChart width={350} height={250} data={barData}>
            <defs>
              <linearGradient id="barDashGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            <Bar dataKey="count" fill="url(#barDashGradient)" radius={[6, 6, 0, 0]} barSize={35} />
          </BarChart>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
