import React, { createContext, useState} from 'react';

export const AuthContext = createContext<UserState|null>(null);

//User state setter and getter
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

//Provider object that sets the user authentication data provider
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
