"use client"

import ButtonSecondary from "@/src/components/ButtonSecondary";

import Input from "@/src/components/Input";
import { UserContext } from "@/src/context/UserContext";
import { isPassSecure } from "@/src/model/utils/str";
import { FormEvent, useContext, useRef, useState } from "react";


export default function AccountPage({updateUserInfo} : {
    updateUserInfo: (id: number, name: string, pass: string) => Promise<void>
}) {

    const { user, refreshPage } = useContext(UserContext);

    const nameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [errFields, setErrFields] = useState(defaultErrFields());
    const [successMsg, setSuccessMsg] = useState('')

    function defaultErrFields() {
        return { name: '', pass: '' }
    }

    function formSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user)
            return;

        let isValid = true;
        const newName = nameRef.current?.value;
        const newPass = passRef.current?.value;

        console.log(newName, newPass)

        setErrFields(defaultErrFields());
        setSuccessMsg('');

        if (!newName) {
            setErrFields(ef => ({ ...ef, name: 'O nome do Usuário é obrigatório' }));
            isValid = false;
        }

        if (newPass && !isPassSecure(newPass)) {
            setErrFields(ef => ({ ...ef, pass: 'A senha deve conter 8 ou mais caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial' }));
            isValid = false;
        }

        if (!isValid)
            return;

        if (newName == user.name && !newPass)
            return; // no need to call the database

        updateUserInfo(user.id, newName!, newPass ?? '')
            .then(() => {
                passRef.current!.value = '';

                if (!newName)
                    setSuccessMsg('Senha modificada com sucesso')
                if (!newPass)
                    setSuccessMsg('Nome modificado com sucesso')
                else 
                    setSuccessMsg('Nome e Senha modificados com sucesso')

                refreshPage()
            })

    }

    return <section className="flex max-[850px]:flex-col w-[100%]">
        <section className="flex-1">
            <h2 className="text-[1.25em] font-bold mb-[1em]">Minha conta</h2>
            <img src="/Adjustments.svg" alt="Ajustes" className="w-[100%] max-[850px]:hidden" />
        </section>
        <form className="flex-1" onSubmit={(e) => formSubmission(e)}>

            <section className="mb-[1em]">
                <label htmlFor="name">Nome</label>
                <Input ref={nameRef} id="name" type="text" hasError={!!errFields.name} className="w-[100%]" defaultValue={user?.name} />
                {errFields.name && <span className="text-red-bytebank">{errFields.name}</span>}
            </section>

            <section className="mb-[1em]">
                <label htmlFor="email">E-mail</label>
                <Input id="email" type="text" className="w-[100%]" value={user?.email} readOnly />
            </section>

            <section className="mb-[1em]">
                <label htmlFor="pass">Senha</label>
                <Input ref={passRef} id="pass" type="password" className="w-[100%]" />                
            </section>

            {successMsg && <div className="text-green-bytebank-dark font-bold my-[1em]">{successMsg}</div>}

            <ButtonSecondary className="mt-[1em]" type="submit">
                Salvar Alterações
            </ButtonSecondary>

            <img src="/Adjustments.svg" alt="Ajustes" className="w-[100%] mt-[1em] min-[851px]:hidden" />
        </form>
    </section>
}