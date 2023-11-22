import { useCallback, useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { ReactFilterContext } from "./context";

export function ReactFilterProvider({
  children,
  registery: initialRegistery = {},
}) {
  const [params, setSearchParams] = useSearchParams();
  const [registery, setRegistery] = useState(initialRegistery);

  const appliedStateKey = useMemo(() => {
    let hashKey = "";
    for (const [k] of Object.entries(registery)) {
      hashKey += `${k}-${params.get(k) ?? ""}`;
    }
    return hashKey;
  }, [params, registery]);

  const appliedState = useMemo(() => {
    const nextState = {};
    for (const [k, { adapter }] of Object.entries(registery)) {
      nextState[k] = adapter.toValue(params.get(k));
    }
    return nextState;
  }, [appliedStateKey]);

  const [state, setState] = useState(appliedState);

  useEffect(() => {
    const nextState = {};
    for (const [k, { adapter }] of Object.entries(registery)) {
      if (!adapter.equal(state[k], appliedState[k])) {
        nextState[k] = appliedState[k];
      }
    }
    if (Object.keys(nextState).length > 0) {
      setState((state) => ({ ...state, ...nextState }));
    }
  }, [appliedState, registery]);

  const hasChanges = useMemo(() => {
    for (const [k, { adapter }] of Object.entries(registery)) {
      if (!adapter.equal(state[k], appliedState[k])) {
        return true;
      }
    }
    return false;
  }, [registery, state, appliedState]);

  const applyStateToSearchParams = useCallback(() => {
    const nextParams = new URLSearchParams(params);
    for (const [key, { adapter }] of Object.entries(registery)) {
      if (!adapter.equal(state[key], adapter.defaultValue)) {
        const value = adapter.toString(state[key]);
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }
    }
    setSearchParams(nextParams);
  }, [params, state, registery]);

  const resetFilter = useCallback(
    (includedKeys = []) => {
      const nextState = { ...state };
      const nextParams = new URLSearchParams(params);
      for (const [k, { adapter }] of Object.entries(registery)) {
        if (!includedKeys.length || includedKeys.includes(k)) {
          nextState[k] = adapter.defaultValue;
          nextParams.delete(k);
        }
      }
      setState(nextState);
      setSearchParams(nextParams);
    },
    [params, state, registery]
  );

  return (
    <ReactFilterContext.Provider
      value={{
        state,
        setState,
        appliedState,
        registery,
        setRegistery,
        hasChanges,
        applyStateToSearchParams,
        resetFilter,
      }}
    >
      {children}
    </ReactFilterContext.Provider>
  );
}
