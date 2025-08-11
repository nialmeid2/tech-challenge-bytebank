import { updateUser } from "@/src/model/User";
import AccountPage from "@/src/page/Account";
import DashboardPage from "@/src/page/Dashboard";



export default function Others() {
    
    async function updateUserInfo(id: number, name: string, pass: string) {
        "use server"

        updateUser(id, name, pass)

    }

    return <DashboardPage>
        <AccountPage updateUserInfo={updateUserInfo} />
    </DashboardPage>
}