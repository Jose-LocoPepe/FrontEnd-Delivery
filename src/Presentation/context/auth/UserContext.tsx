import React, { createContext, useState, useEffect, useReducer } from "react";
import { User } from "../../../Domain/entities/User";
import { SaveUserUseCase } from "../../../Domain/useCases/UserLocal/SaveUserLocal";
import { GetUserUseCase } from "../../../Domain/useCases/UserLocal/GetUserLocal";
import { RemoveUserUseCase } from "../../../Domain/useCases/UserLocal/RemoveUserLocal";
import { AuthState, userReducer } from "./userReducer";
import { VerifyTokenUseCase } from "../../../Domain/useCases/UserLocal/VerifyTokenUserLocal";


export interface UserContextProps {
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    auth(user: User): void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const userInitialState: AuthState = {
    status: 'checking',
    user: null
}

export const UserContext = createContext( {} as UserContextProps);

export const UserProvider = ( {children}: any ) => {
    useEffect(() => {
        checkToken();
    }, [])
    const [state, dispatch] = useReducer(userReducer, userInitialState);

    const checkToken = async () => {
        const user = await GetUserUseCase();

        if (!user) return dispatch({ type: 'not-authenticated' });
        console.log(user);

        try {
            const response = await VerifyTokenUseCase(user.session_token);

            if (!response.success) return dispatch({ type: 'not-authenticated' });

            if (response.expired) await RemoveUserUseCase();

            return dispatch({ type: 'auth', payload: { user } })
        } catch (error) {
            dispatch({ type: 'not-authenticated' })
        }
    }
    const auth = async (user: User) => {
        dispatch({
            type: 'auth',
            payload: { user }
        })
        
    }

    const logout = () => {
        dispatch({
            type: 'logout'
        })
    }

    const updateUser = async (user: User) => {
        await SaveUserUseCase(user);
        dispatch({ type: 'update-user', payload: { user } })
    }
    return (
        <UserContext.Provider value={{
            ...state,
            auth,
            logout,
            updateUser
        }}>
            { children }
        </UserContext.Provider>
    )
}