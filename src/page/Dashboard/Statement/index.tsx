import { Transaction } from "@/src/generated/prisma"
import { SubstrativeTransactions, TransactionTypes } from "@/src/model/enums/Transaction"
import { initCapSentence, toMoney } from "@/src/model/utils/str"


export default function Statement({statement} : {
    statement: Transaction[]
}) {
    return <section className="min-[1100px]:w-[25%] bg-grey-bytebank-light mb-[2em] min-[1100px]:my-[2em] min-[1100px]:ml-[2ch] p-[1em] rounded-[.5em]">
        <section className="max-[1100px]:max-w-[25em] mx-auto">
            <h2 className="font-bold text-[1.25em]">Extrato</h2>
        </section>
        <ul className="mx-auto max-[1100px]:max-w-[25em]">
            {statement?.map((stmt) => (<section key={`stmt-${stmt.id}`} className="my-[1em]">
                <p className="text-green-bytebank-dark font-bold">{initCapSentence(new Date().toLocaleDateString(['pt-br', 'en-us'], { month: 'long' }))}</p>
                <p className="flex justify-between items-center gap-[1ch]">
                    <span>{stmt.type}</span>
                    <span className="text-grey-bytebank-dark text-[.8em]">{stmt.createdAt.toLocaleDateString(['pt-br', 'en-us'], {dateStyle: 'short'})}</span>
                </p>
                <p className="font-bold">{SubstrativeTransactions.includes(stmt.type as TransactionTypes) ? '-' : ''}{toMoney(stmt.value)}</p>
            </section>                
            ))}
        </ul>
    </section>
}