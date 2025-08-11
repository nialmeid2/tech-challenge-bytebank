

import { addAdditiveOperation, addSubstrativeOperation, Transaction } from "@/src/model/Transaction";
import { getUserCookie, User } from "@/src/model/User";
import DashboardPage from "@/src/page/Dashboard";
import TransactionPage from "@/src/page/Transaction";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function Dashboard() {

    async function createAdditiveOperation(user: User, transaction: Omit<Transaction, "id">) {
        "use server"

        await addAdditiveOperation(user, transaction);
        return;
    }

    async function createSubstrativeOperation(user: User, transaction: Omit<Transaction, "id">) {
        "use server"

        await addSubstrativeOperation(user, transaction);
        return;
    }

    async function getLoggedUser() {
        "use server";

        const theCookies = await cookies();
        return getUserCookie(theCookies);
    }

    const cachedUser = await getLoggedUser();

    if (!cachedUser)
        redirect('/', RedirectType.push)

    return <DashboardPage>
        <TransactionPage createAdditiveOperation={createAdditiveOperation} createSubstrativeOperation={createSubstrativeOperation} />
    </DashboardPage>

}