"use client"

import ButtonSecondary from "@/src/components/ButtonSecondary";
import Container from "@/src/components/Container";
import HomeFooter from "@/src/page/Home/Footer";
import HomeHeader from "@/src/page/Home/Header";
import { redirect, RedirectType } from "next/navigation";

export default function NotFound() {
    return <div className="flex-1 flex flex-col">
        <HomeHeader clickLogin={() => { redirect('/', RedirectType.replace) }} clickNewAccount={() => { redirect('/', RedirectType.replace) }} />

        <main className="flex-1 bg-linear-to-b w-[100%] from-blue-bytebank to-white pb-[2em]">
            <Container className="flex flex-col max-[850px]:w-[90%] items-center justify-center">
                <h2 className="font-bold text-[2em] mt-[1em] text-center">Ops, não encontramos a página</h2>
                <p className="mt-[2em] text-center">E olha que exploramos o universo procurando por ela!</p>
                <p className="mb-[2em] text-center">Que tal voltar e tentar novamente?</p>
                <ButtonSecondary onClick={() => { redirect('/', RedirectType.replace) }}>Voltar ao início</ButtonSecondary>
                <img src="/not-found.svg" alt="Página não encontrada" className="h-[30em]"></img>
            </Container>
        </main>

        <HomeFooter />
    </div>
}