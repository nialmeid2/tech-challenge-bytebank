"use client"

import { UserContext } from "@/src/context/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";


export default function MenuDashboard({isMenuOpen, setIsMenuOpen} : {
    isMenuOpen: boolean,
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}) {

    const pathName = usePathname();
    const { logout } = useContext(UserContext);
    
    const linkStyle = (active: boolean) => `py-[1em] w-[100%] text-center block ${active ? 
            'max-[550px]:text-red-bytebank-dark text-green-bytebank border-green-bytebank font-bold border-b-[.2em]' : 
            'border-black min-[1100px]:border-b-[.1em] max-[550px]:border-b-[.1em]'}`

    return <>
        <nav className={"min-[1100px]:bg-grey-bytebank-light max-[550px]:bg-grey-bytebank-light text-black min-[1100px]:w-[15%] rounded-[.5em] min-[1100px]:my-[2em] min-[1100px]:mr-[2ch] " +
            `max-[550px]:fixed max-[550px]:z-[100] max-[550px]:min-w-[15em] max-[550px]:w-[40%] max-[550px]:top-[0] max-[550px]:rounded-[0] max-[550px]:pb-[1em] ${
                isMenuOpen ? 'max-[550px]:left-[0]' : 'max-[550px]:left-[-100vw]'}`
        }>

            <button className="absolute cursor-pointer top-[1em] right-[1em] min-[550px]:hidden" onClick={() => { setIsMenuOpen(false) }}>
                <img src="/x.svg" alt="fechar" className="h-[1em]" />
            </button>

            <ul className="flex min-[1100px]:flex-col max-[550px]:flex-col max-[1100px]:justify-between p-[1em] px-[1.5em]">
                <li>
                    <Link href="/dashboard" className={linkStyle(pathName?.toLowerCase() == '/dashboard')}>Início</Link>
                </li>
                <li>
                    <Link href="/operations" className={linkStyle(pathName?.toLowerCase() == '/operations')}>Transações</Link>
                </li>
                <li>
                    <Link href="/investments" className={linkStyle(pathName?.toLowerCase() == '/investments')}>Investimentos</Link>
                </li>
                <li>
                    <Link href="/others" className={linkStyle(pathName?.toLowerCase() == '/others')}>Outros Serviços</Link>
                </li>
                <li className="min-[550px]:hidden min-[1100px]:block">
                    <Link href="/" onClick={() => logout()} className={linkStyle(false)}>Encerrar Sessão</Link>
                </li>
            </ul>
        </nav>
        <button className={`fixed left-[0] top-[0] w-[100vw] h-[100vh] bg-black/50 z-[98] ${isMenuOpen ? '' : 'hidden'}`}
            onClick={() => { setIsMenuOpen(false); }}>
        </button>
    </>
}