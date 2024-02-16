/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from "react";
import { getItem } from "../core/localstorage/storage";

interface Iuser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  national_id_number: string;
  student_number: string;
  major_name: string;
  password: string;
  confirmPassword: string;
}

interface Istate {
  user: Iuser;
}
interface contextOutProps {
  user: Iuser;
  dispatch: (key: string, value: any) => void;
  isAuth: () => boolean;
}
export const context = createContext<contextOutProps>({} as contextOutProps);

const MainContext = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<Istate>({ user: {} as Iuser });
  useEffect(() => {
    const user = getItem("user1");

    if (user) {
      setState({ ...state, user: JSON.parse(user) });
    }
  }, []);
  const dispatch = (key: string, value: any) => {
    setState({ ...state, [key]: value });
  };
  const isAuth = () => {
    return !!state.user.email;
  };
  return (
    <>
      <context.Provider value={{ ...state, dispatch, isAuth }}>
        {children}
      </context.Provider>
    </>
  );
};

export default MainContext;
