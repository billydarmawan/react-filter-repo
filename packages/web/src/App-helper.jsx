import { useEffect, useState } from "react";

export const Field = ({ label, children }) => (
  <div className="field">
    <div className="field-label">{label}</div>
    <div>{children}</div>
  </div>
);

export function useDropdown() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setItems([
        {
          label: "Order ID",
          id: "order_id",
        },
        {
          label: "Reference ID",
          id: "reference_id",
        },
      ]);
    }, 2000);
  }, []);

  return items;
}

export function useStatusList() {
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStatusList([
        { id: "active", label: "Active" },
        { id: "inactive", label: "Inactive" },
        { id: "draft", label: "Draft" },
      ]);
    }, 1500);
  }, []);

  return statusList;
}
