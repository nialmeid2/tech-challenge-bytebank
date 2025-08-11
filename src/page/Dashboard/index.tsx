"use client"

import Container from "@/src/components/Container";
import HeaderDashboard from "./Header";
import Summary from "./Summary";
import MenuDashboard from "./MenuDashboard";
import Statement from "./Statement";
import { Transaction } from "@/src/model/Transaction";
import { ReactNode, useContext, useEffect, useState } from "react";
import LoadingScreen from "@/src/components/LoadingScreen";
import { User } from "@/src/model/User";
import { UserContext } from "@/src/context/UserContext";


export default function DashboardPage({ children }: {    
    children: ReactNode
}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { refreshPage, statement } = useContext(UserContext);

    useEffect(() => {
        refreshPage()
    }, [])

    return <div className="flex-1 flex flex-col">
        <HeaderDashboard setIsMenuOpen={setIsMenuOpen} />

        <main className="flex-1 bg-green-bytebank-light">
            <Container className="flex max-[1100px]:flex-col">
                <MenuDashboard isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Summary>
                    {children}
                </Summary>
                <Statement statement={statement} />
            </Container>
        </main>

        <LoadingScreen />

    </div>
}