'use client'
import { createContext, useState } from "react";
interface GlobalContextType {
    data: { accessmentCompleted?: boolean }
    setData: (data: any) => void;
}

export const GlobalContext = createContext<GlobalContextType>({ data: { accessmentCompleted: false }, setData: () => { } });

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState({})

    return (
        <GlobalContext.Provider value={{ data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
}