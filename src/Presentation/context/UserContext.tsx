import React, { createContext, useState, useEffect } from "react";
import { User } from "../../Domain/entities/User";
import { SaveUserUseCase } from "../../Domain/useCases/UserLocal/SaveUserLocal";
import { GetUserUseCase } from "../../Domain/useCases/UserLocal/GetUserLocal";
import { RemoveUserUseCase } from "../../Domain/useCases/UserLocal/RemoveUserLocal";

export const userInitialState: User = {
    id:              '',
    name:            '',
    lastname:        '',
    phone:           '',
    email:           '',
    password:        '',
    confirmPassword: '',
    image:           '',
    session_token:   '',
    role_id:           [],
}

export interface UserContextProps {
    user: User;
    saveUserSession: (user: User) => Promise<void>;
    getUserSession: () => Promise<void>;
    removeUserSession: () => Promise<void>;
}

export const UserContext = createContext( {} as UserContextProps);

export const UserProvider = ( {children}: any ) => {

    const [user, setUser] = useState(userInitialState);

    useEffect(() => {
        getUserSession();
    }, [])

    const saveUserSession = async (user: User) => {
        await SaveUserUseCase(user);
        setUser(user);
    }

    const getUserSession = async() =>  {
        const user = await GetUserUseCase();
        setUser(user);
    }

    const removeUserSession = async () => {
        await RemoveUserUseCase();
        setUser(userInitialState);
    }

    return (
        <UserContext.Provider value={{
            user,
            saveUserSession,
            getUserSession,
            removeUserSession
        }}>
            { children }
        </UserContext.Provider>
    )
}