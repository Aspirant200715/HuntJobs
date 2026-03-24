export const getCompanyDomain = (company) => {
  if (!company) return "";

  return company
    .toLowerCase()
    .replace(/\s+/g, "") + ".com";
};