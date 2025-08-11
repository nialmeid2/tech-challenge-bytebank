
import { getInvestmentsSummary } from "@/src/model/Investment";
import DashboardPage from "@/src/page/Dashboard";
import InvestmentsPage from "@/src/page/Investments";

export default function Investments() {

    async function getInvestmentsReport(userId: number) {
        "use server"

        return await getInvestmentsSummary(userId);        
    }

    

    return <DashboardPage>
        <InvestmentsPage getInvestmentsReport={getInvestmentsReport} />
    </DashboardPage>
    
}