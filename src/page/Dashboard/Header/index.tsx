"use client"

import Container from "@/src/components/Container"
import { UserContext } from "@/src/context/UserContext"
import Link from "next/link"
import { Dispatch, SetStateAction, useContext } from "react"

export default function HeaderDashboard({ setIsMenuOpen }: {
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}) {

    const { user, logout } = useContext(UserContext)

    return <header className="bg-blue-bytebank py-[1em]">
        <Container className="flex justify-between items-center">
            <button className="min-[550px]:hidden text-red-bytebank-light mr-[2ch]" onClick={() => setIsMenuOpen(imo => !imo)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-[2em]" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </button>
            <section className="max-[550px]:hidden min-[550px]:block min-[1100px]:hidden">
                <Link href="/" onClick={() => logout()} className={'p-[.5em] text-white'}>Encerrar Sessão</Link>
            </section>
            <section className="ml-auto flex gap-[2ch] max-[600px]:gap-[1ch] items-center text-white">
                <span className="max-[400px]:hidden">{user?.name}</span>
                <img src="/person.svg" alt="Foto do perfil" className="h-[3em]" />
            </section>
        </Container>
    </header>
}