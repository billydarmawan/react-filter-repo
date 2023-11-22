import { createContext } from "react";

export const ReactFilterContext = createContext({
  state: {},
  setState: () => {},
  registery: {},
  setRegistery: () => {},
  appliedState: {},
  hasChanges: false,
  applyStateToSearchParams: () => {},
  resetFilter: () => {},
});
