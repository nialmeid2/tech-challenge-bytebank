"use client"

import { UserContext } from "@/src/context/UserContext";
import { AdditiveTransactions, InvestmentTransactions } from "@/src/model/enums/Transaction";
import { Transaction } from "@/src/model/Transaction";
import { initCapSentence, toMoney } from "@/src/model/utils/str";

import { useContext, useEffect, useState } from "react";

type InvestmentData = { qtty: number; total: number; };

export default function InvestmentsPage({ getInvestmentsReport }: {
    getInvestmentsReport: (userId: number) => Promise<Record<InvestmentTransactions, InvestmentData>>
}) {

    const { setIsLoading, user } = useContext(UserContext);
    const [investments, setInvestments] = useState<Map<InvestmentTransactions, InvestmentData>>();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!user) return;

        setIsLoading(true);
        getInvestmentsReport(user.id)
            .then((result) => {
                setIsLoading(false);
                const allInvestments = new Map<InvestmentTransactions, InvestmentData>();
                let theTotal = 0;

                for (let iType in result) {
                    theTotal += result[iType as InvestmentTransactions].total;
                    allInvestments.set(iType as InvestmentTransactions, result[iType as InvestmentTransactions]);
                }

                setInvestments(allInvestments);
                setTotal(theTotal);
            })
    }, [user])

    return <section className="flex flex-col w-[100%]">
        <h2 className="text-[1.5em] font-bold mb-[1em]">Investimentos</h2>
        <p className="text-blue-bytebank text-[1.25em] mb-[1em]">Total: {toMoney(total)}</p>
        <section className="grid grid-cols-2 max-[550px]:grid-cols-1 gap-[1em]">
            {Array.from(investments?.keys() || []).map((inv) => <section key={`type-${inv}`}
                className={`${AdditiveTransactions.includes(inv) ? 'bg-green-bytebank-dark' : 'bg-blue-bytebank'} text-white text-center flex flex-col rounded-[.5em] p-[1em]`}>
                <section>
                    { initCapSentence(inv.replace(/Investimento em\s+/gi, '')) }
                </section>
                <section className="mt-[.5em] text-[1.15em] font-bold">
                    {toMoney(investments?.get(inv)?.total ?? 0)}
                </section>
            </section>)}
        </section>
    </section>
}