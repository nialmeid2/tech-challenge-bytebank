import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/src/context/UserContext";
import { cookies } from "next/headers";
import { getRefreshedData, getUserCookie } from "@/src/model/User";

import { redirect, RedirectType } from "next/navigation";
import { getStatement } from "@/src/model/Transaction";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Byte Bank",
    description: "Experimente mais liberdade no controle da sua vida financeira",
    icons: '/logo.svg'
};


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    async function getLoggedUser() {
        "use server";

        const theCookies = await cookies();
        return getUserCookie(theCookies);
    }

    async function clearLoggedUser() {
        "use server"

        const theCookies = await cookies();
        theCookies.delete('user');
    }

    
    const cachedUser = await getLoggedUser();


    async function loadPageInfo() {
        "use server"

        const loggedUser = await getUserCookie(await cookies());

        if (!loggedUser) {
            redirect('/', RedirectType.replace)
        }

        const refreshedData = await getRefreshedData(loggedUser.id) ?? loggedUser;

        const refreshedUser = {...refreshedData, password: '', id: loggedUser.id}

        const statement = await getStatement(loggedUser.id, 5,)

        return { statement, loggedUser: refreshedUser }
    }

    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased min-w-screen min-h-screen overflow-x-hidden flex`}
            >
                <UserProvider getLoggedUser={getLoggedUser} cookieUser={cachedUser} clearLoggedUser={clearLoggedUser} loadPageInfo={loadPageInfo}>
                    {children}
                </UserProvider>
            </body>
        </html>
    );
}
