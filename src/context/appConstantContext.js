import React, { createContext } from "react";
import {
  GET_CONTACT_LIST_URL,
} from "../common/constant";

export const AppConstantContext = createContext();

const AppConstantProvider = ({ children }) => {
  return (
    <AppConstantContext.Provider value={{ GET_CONTACT_LIST_URL }}>
      {children}
    </AppConstantContext.Provider>
  );
};

export default AppConstantProvider;
