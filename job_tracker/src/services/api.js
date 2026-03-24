import axios from "axios";

const roles = [
  "SDE 1",
  "SDE 2",
  "SDE 3",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Product Manager",
  "DevOps Engineer",
  "ML Engineer",
];

const realCompanies = [
  "google",
  "amazon",
  "microsoft",
  "apple",
  "meta",
  "netflix",
  "tesla",
  "adobe",
  "ibm",
  "oracle",
];

const platforms = ["LinkedIn", "Naukri", "Referral", "Company Site"];
const statuses = ["Applied", "Interviewing", "Rejected", "Offer"];

export const fetchJobs = async () => {
  const res = await axios.get("https://dummyjson.com/products");

  return res.data.products.map((item, index) => ({
    id: item.id,

    // ✅ USE REAL COMPANIES
    company: realCompanies[index % realCompanies.length],

    role: roles[index % roles.length],

    location: index % 2 === 0 ? "Remote" : "On-site",

    salary: Math.floor(item.price * 1000 + 30000),

    platform: platforms[index % platforms.length],

    status: statuses[index % statuses.length],

    appliedDate: new Date(Date.now() - index * 86400000)
      .toISOString()
      .split("T")[0],

    interviewDate: "",

    notes: item.description?.slice(0, 80),

    bookmarked: false,
  }));
};