"use client"

import ButtonSecondary from "@/src/components/ButtonSecondary";
import ButtonTertiary from "@/src/components/ButtonTertiary";
import Input from "@/src/components/Input";
import Select from "@/src/components/Select";
import { UserContext } from "@/src/context/UserContext";

import { getTransactionOptions, transactionsPerPage, SubstrativeTransactions, TransactionTypes } from "@/src/model/enums/Transaction";
import { Transaction } from "@/src/model/Transaction";
import { toMoney } from "@/src/model/utils/str";
import { FormEvent, useContext, useRef, useState } from "react";



export default function OperationsPage({ filterTransactions, removeTransaction }: {
    filterTransactions: (date: Date | undefined, transactionType: TransactionTypes | undefined, page: number) => Promise<Transaction[]>,
    removeTransaction: (transactionId: number) => Promise<string>
}) {

    const dateRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);

    const { setIsLoading, refreshPage } = useContext(UserContext);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [lastFilters, setLastFilters] = useState<{ date: Date | undefined, type: TransactionTypes | undefined }>({ date: undefined, type: undefined })
    const [currPage, setCurPage] = useState(1);
    const [alreadyEnded, setAlreadyEnded] = useState(false);
    const [errList, setErrList] = useState<Record<number, string>>({})

    function submitFilter(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const theDate = dateRef.current?.value ? new Date(dateRef.current.value) : undefined;
        const theType = typeRef.current?.value ?? undefined;

        setLastFilters({ date: undefined, type: undefined })
        setAlreadyEnded(false);


        if (!theDate && !theType) return;

        setIsLoading(true);
        filterTransactions(theDate, theType as TransactionTypes | undefined, 1)
            .then((filtered) => {
                setIsLoading(false);
                setCurPage(1);
                setLastFilters({ date: theDate, type: theType as TransactionTypes | undefined })

                if (filtered.length % transactionsPerPage != 0)
                    setAlreadyEnded(true);

                setTransactions(filtered);
            })
    }

    function getNextPage() {
        filterTransactions(lastFilters.date, lastFilters.type, currPage + 1)
            .then((newTransactions) => {
                if (newTransactions.length == 0 || newTransactions.length % transactionsPerPage != 0)
                    setAlreadyEnded(true);
                setTransactions([...transactions, ...newTransactions])
                setCurPage(curr => curr + 1);
            })
    }

    function removeTheTransaction(removeId: number) {

        setIsLoading(true)
        removeTransaction(removeId)
            .then((stmt) => {

                if (stmt) {
                    const newErrList = {} as Record<number, string>;
                    newErrList[removeId] = stmt;
                    setErrList(el => newErrList);
                    return;
                }


                setErrList(el => ({}));

                setTransactions(t => t.filter((tobj) => tobj.id != removeId));
                refreshPage();
            })


    }

    return <section className="flex flex-col">
        <form onSubmit={(e) => submitFilter(e)}>
            <section className="flex justify-between gap-[2ch] max-[635px]:flex-col">
                <div className="gap-[1em] flex items-center">
                    <label htmlFor="date">Início</label>
                    <Input ref={dateRef} id="date" type="date"></Input>
                </div>
                <div className="gap-[1em] flex items-center">
                    <label htmlFor="type">Tipo</label>
                    <Select ref={typeRef} id="type">{getTransactionOptions()}</Select>
                </div>
                <div className="flex items-center">
                    <ButtonSecondary type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-[1em]" viewBox="0 0 16 16" aria-label="Filtrar">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                        </svg>
                    </ButtonSecondary>
                </div>
            </section>
        </form>
        <section className="flex flex-col my-[1em]">
            {transactions.map((t) => <section key={`transaction-${t.id}`} className="my-[1em] flex items-center gap-[1ch]">
                <section className="flex-1">
                    <div className="text-green-bytebank-dark">{t.type}</div>
                    <div className="font-bold">{SubstrativeTransactions.includes(t.type as TransactionTypes) ? '-' : ''}{toMoney(t.value)}</div>
                    <div>{t.createdAt.toLocaleString(['pt-br', 'en-us'], { dateStyle: 'short', timeStyle: 'medium' })}</div>
                    {errList[t.id] ? <div className="text-red-bytebank-dark font-bold">{errList[t.id]}</div> : <></>}
                </section>
                <section>
                    <ButtonSecondary onClick={() => removeTheTransaction(t.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-[1em]" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                    </ButtonSecondary>
                </section>
            </section>)}
            {transactions.length > 0 && !alreadyEnded ? <ButtonTertiary className="mt-[1em]" onClick={() => getNextPage()}>Mostrar Mais</ButtonTertiary> : <></>}
        </section>
    </section>
}