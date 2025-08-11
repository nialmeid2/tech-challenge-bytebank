"use client"


import ButtonTertiary from "@/src/components/ButtonTertiary";
import Input from "@/src/components/Input";
import Select from "@/src/components/Select";
import { UserContext } from "@/src/context/UserContext";
import { AdditiveTransactions, getTransactionOptions, SubstrativeTransactions, TransactionTypes } from "@/src/model/enums/Transaction";
import { Transaction } from "@/src/model/Transaction";
import { User } from "@/src/model/User";
import { FormEvent, useContext, useRef, useState } from "react"

export default function TransactionPage({ createAdditiveOperation, createSubstrativeOperation }: {
    createAdditiveOperation: (user: User, transaction: Omit<Transaction, "id">) => Promise<void>,
    createSubstrativeOperation: (user: User, transaction: Omit<Transaction, "id">) => Promise<void>,
    
}) {

    const valueRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const [errFields, setErrFields] = useState(defaultFields());

    const { user, refreshPage } = useContext(UserContext)

    function defaultFields() {
        return { transactionType: '', value: '' }
    }

    function submitOperation(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user)
            return;

        valueRef.current!.value = valueRef.current!.value.replaceAll(/[^\d]/g, '');
        const formattedValue = +valueRef.current!.value;
        const transactionType = typeRef.current?.value;
        let isValid = true;
        setErrFields(defaultFields());

        if (isNaN(formattedValue) || formattedValue <= 0) {
            setErrFields(ef => ({ ...ef, value: 'Valor inválido. Digite um número maior que 0' }));
            isValid = false;
        }
        if (!transactionType) {
            setErrFields(ef => ({ ...ef, transactionType: 'Selecione um tipo de transação' }))
            isValid = false;
        }

        if (!isValid)
            return;


        const transactionObject = {
            userId: user.id,
            type: transactionType as TransactionTypes,
            value: formattedValue,
            createdAt: new Date()
        } as Omit<Transaction, "id">

        if (AdditiveTransactions.includes(transactionType as TransactionTypes)) {
            createAdditiveOperation(user, transactionObject)
                .then(() => {
                    refreshPage();

                });

            valueRef.current!.value = "";
            typeRef.current!.value = "";
            return;
        }
        if (SubstrativeTransactions.includes(transactionType as TransactionTypes)) {
            if (user.balance < formattedValue) {
                setErrFields(ef => ({ ...ef, value: `Não há saldo o suficiente para concluir a operação de ${transactionType}` }))
                return;
            }

            createSubstrativeOperation(user, transactionObject)
                .then(() => {
                    refreshPage();
                })

            valueRef.current!.value = "";
            typeRef.current!.value = "";

            return;
        }
        else {
            setErrFields(ef => ({ ...ef, transactionType: "Transação inválida" }))
            return;
        }


    }

    return <form className="flex flex-col w-[100%]" onSubmit={(e) => submitOperation(e)}>

        <h2 className="text-[1.25em] font-bold mb-[1em]">Nova Transação</h2>

        <div className="flex flex-col">
            <Select ref={typeRef} hasError={!!errFields.transactionType}>
                {getTransactionOptions()}
            </Select>
            {errFields.transactionType && <span className="text-red-bytebank-dark font-bold">{errFields.transactionType}</span>}
        </div>

        <div className="my-[2em] flex flex-col">
            <label htmlFor={'value'}>Valor</label>
            <Input id="value" type="number" min={0} step={0.01} hasError={!!errFields.value}
                ref={valueRef} />
            {errFields.value && <span className="text-red-bytebank-dark font-bold">{errFields.value}</span>}
        </div>

        <ButtonTertiary type="submit" className="">
            Concluir Transação
        </ButtonTertiary>

    </form>
}