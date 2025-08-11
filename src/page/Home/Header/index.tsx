"use client"

import ButtonPrimary from "@/src/components/ButtonPrimary"
import ButtonPrimaryOutlined from "@/src/components/ButtonPrimaryOutlined"
import Container from "@/src/components/Container"
import Link from "next/link"


export default function HomeHeader({clickLogin, clickNewAccount} : {
    clickNewAccount: () => void,
    clickLogin: () => void
}) {
    return <header className="p-[1.25em] w-[100%] bg-black text-green-bytebank">
        <Container>
            <section className="gap-[3em] max-[850px]:gap-[2em] flex flex-row items-center justify-between max-[671px]:hidden">
                <h1 className="">
                    <img src="/brand.svg" alt="Byte bank" className="max-[850px]:hidden" />
                    <img src="/logo.svg" alt="Byte bank" className="min-[851px]:hidden h-[3em] max-[671px]:hidden" />
                </h1>
                <Link href="/sobre" className="ml-[2em] max-[850px]:ml-[0] hover:underline">Sobre</Link>
                <Link href="/servicos" className="hover:underline">Serviços</Link>
            </section>
            <section className="min-[672px]:hidden align-middle">
                <img src="/menu.svg" alt="Abrir Menu" className="h-[2em]" />
            </section>
            <section className="gap-[2ch] flex flex-row items-center max-[671px]:hidden">
                <ButtonPrimary onClick={() => clickNewAccount()}>Abrir minha conta</ButtonPrimary>
                <ButtonPrimaryOutlined onClick={() => clickLogin()}>Já tenho conta</ButtonPrimaryOutlined>
            </section>
            <section className="min-[672px]:hidden align-middle">
                <img src="/brand.svg" alt="Byte bank" className="h-[2em]" />
            </section>
        </Container>
    </header>
}