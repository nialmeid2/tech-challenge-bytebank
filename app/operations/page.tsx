import { TransactionTypes } from "@/src/model/enums/Transaction";
import { getFilteredTransactions, removeATransaction, Transaction } from "@/src/model/Transaction";
import DashboardPage from "@/src/page/Dashboard";
import OperationsPage from "@/src/page/Operations";


export default function Operations() {

    async function filterTransactions(date: Date | undefined, transactionType: TransactionTypes | undefined, page = 1) { 
        "use server"
        return await getFilteredTransactions(date, transactionType, page) as Transaction[]
    }

    async function removeTransaction(transactionId: number) {
        "use server"
        return await removeATransaction(transactionId) as string;
    }

    return <DashboardPage>
            <OperationsPage filterTransactions={filterTransactions} removeTransaction={removeTransaction}/>
        </DashboardPage>
}