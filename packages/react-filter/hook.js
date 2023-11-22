import { useContext } from "react";

import { ReactFilterContext } from "./context";

export function useFilter() {
  return useContext(ReactFilterContext);
}

export function useFilterField(name) {
  const { state, setState, registery } = useContext(ReactFilterContext);

  if (!(name in registery)) {
    throw new Error(`unable to find ${name} in registery`);
  }

  return [
    state?.[name],
    (value) =>
      setState((state) => ({
        ...state,
        [name]: typeof value === "function" ? value(state[name]) : value,
      })),
    registery[name],
  ];
}

const removeArrayAt = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

export function useFilterFieldArray(name) {
  const [array, setArray, { adapter }] = useFilterField(name);

  const setAt = (index, value) =>
    setArray((arr) => {
      const newArr = [...arr];
      arr[index] = typeof value === "function" ? value(arr[index]) : value;
      return newArr;
    });

  const removeAt = (index) => setArray((arr) => removeArrayAt(arr, index));

  const append = (value) => setArray((arr) => [...arr, value]);

  const toggle = (value, isAppend) => {
    setArray((arr) => {
      const index = arr.findIndex((v) => adapter.equal(value, v));
      const exist = index >= 0;
      if (typeof isAppend === "undefined") {
        isAppend = !exist;
      }
      if (isAppend) {
        if (!exist) {
          return [...arr, value];
        }
      } else {
        if (exist) {
          return removeArrayAt(arr, index);
        }
      }
      return arr;
    });
  };

  return { array, toggle, setAt, removeAt, append };
}
