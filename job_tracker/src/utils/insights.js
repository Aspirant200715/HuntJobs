export const generateInsights = (applications) => {
  if (!applications.length) return [];

  const insights = [];


  const statusCount = {};
  const platformCount = {};

  applications.forEach((app) => {
    statusCount[app.status] = (statusCount[app.status] || 0) + 1;
    platformCount[app.platform] =
      (platformCount[app.platform] || 0) + 1;
  });

  const total = applications.length;
  const offers = statusCount["Offer"] || 0;
  const rejected = statusCount["Rejected"] || 0;

  const successRate = (offers / total) * 100;

 
  if (successRate < 20) {
    insights.push("Your success rate is low. Consider improving your resume or targeting better roles.");
  } else {
    insights.push("Great! Your success rate is strong. Keep applying strategically.");
  }


  const topPlatform = Object.entries(platformCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];

  if (topPlatform) {
    insights.push(`You are most active on ${topPlatform}. Consider doubling down there.`);
  }


  if (rejected > offers) {
    insights.push("You are getting more rejections than offers. Try refining your applications.");
  }


  if (total < 10) {
    insights.push("You should apply more consistently to increase chances.");
  }

  return insights;
};