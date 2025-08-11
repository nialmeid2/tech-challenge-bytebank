"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { User } from "../model/User"
import { Transaction } from "../model/Transaction";
import { redirect, RedirectType, usePathname } from "next/navigation";

interface Props {
    user: User | undefined;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    loginCreatedUser: (user: User) => void;
    statement: Transaction[];
    refreshPage: () => void;
    logout: () => void;
}

export const UserContext = createContext({} as Props)

export function UserProvider({ children, getLoggedUser, cookieUser, clearLoggedUser, loadPageInfo }: {
    children: ReactNode,
    getLoggedUser: () => Promise<User | undefined>,
    cookieUser: User | undefined,
    clearLoggedUser: () => void,
    loadPageInfo: () => Promise<{statement: Transaction[], loggedUser: User}>
}) {

    const pathName = usePathname();
    const [user, setUser] = useState<User | undefined>(cookieUser);
    const [isLoading, setIsLoading] = useState(true);
    const [statement, setStatement] = useState<Transaction[]>([])


    function logout() {
        clearLoggedUser();
        setUser(undefined);
    }

    function loginCreatedUser(user: User) {
        setUser(user);
    }

    function refreshPage() {
        setIsLoading(true);
        
        loadPageInfo()
            .then((info) => {
                setIsLoading(false);
                setStatement(info.statement);
                setUser({...info.loggedUser});
            })
    }

    useEffect(() => {
        if (user) {
            if (pathName == '/')
                redirect('/dashboard', RedirectType.replace)
            return;
        }

        getLoggedUser().
            then(usr => { 
                setIsLoading(false);
                console.log(usr)
                if (usr) { 
                    setUser(usr); // user logged in
                    
                }
            })
            .catch((err: Error) => { setIsLoading(false); console.log(err) })
    }, [user]);

    return <UserContext.Provider value={{ user, isLoading, logout, setIsLoading, loginCreatedUser, statement, refreshPage }}>
        {children}
    </UserContext.Provider>
}