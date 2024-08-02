import React, { useContext } from "react";
import customerService from "../api/customerApi";
import {
  CREATE_CONTACT_URL,
} from "../common/constant";

export const APISerices = React.createContext({});

export default function APIServiceProvider({ children }) {
  const customerservices = new customerService(CREATE_CONTACT_URL);

  return (
    <APISerices.Provider
      value={{
        customerservices: customerservices,
      }}
    >
      {children}
    </APISerices.Provider>
  );
}
