import React, { createContext, useState, useContext, FC } from 'react';

export const AuthContext = createContext<UserState|null>(null);

export type UserState = {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  };

type UserData = {
    username?: string;
    o_u?: string;
    password?: string;
    userToken?: string;
    sessionToken?: string;
  };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<UserData>({
        username: undefined,
        password: undefined,
        userToken: undefined,
        sessionToken: undefined
    });
  
    return (
      <AuthContext.Provider value={{userData, setUserData}}>
        {children}
      </AuthContext.Provider>
    );
  };
