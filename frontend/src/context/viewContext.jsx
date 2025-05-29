import { createContext, useState, useEffect } from "react";

export const ViewContext = createContext();

export default function ViewProvider({ children }) {
  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem("view");
    return savedView ? JSON.parse(savedView) : "card";
  });

  useEffect(() => {
    if (view) {
      localStorage.setItem("view", JSON.stringify(view));
    } else {
      localStorage.removeItem("view");
    }
  }, [view]);

  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>;
}
