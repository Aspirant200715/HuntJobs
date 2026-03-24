import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

const useApplications = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error("useApplications must be used within ApplicationProvider");
  }

  return context;
};

export default useApplications;