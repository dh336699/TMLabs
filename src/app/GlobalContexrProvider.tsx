'use client'
import { IReportItem } from "@/api/user-center";
import { createContext, useEffect, useState } from "react";

interface IGlobalData { accessmentCompleted?: boolean; reports?: IReportItem[]; token?: string }
interface GlobalContextType {
    data: IGlobalData
    setData: (data: IGlobalData) => void;
}

export const GlobalContext = createContext<GlobalContextType>({ data: { accessmentCompleted: false, reports: [], token: '' }, setData: () => { } });

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<IGlobalData>({})

    useEffect(() => {
        if (data.token) {
            localStorage.setItem('token', data.token)
        }
    }, [data])

    return (
        <GlobalContext.Provider value={{ data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
}