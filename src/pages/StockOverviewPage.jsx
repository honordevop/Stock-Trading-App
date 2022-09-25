import {AutoComplete} from "../components/AutoComplete"
import { StockList } from "../components/StockList"


export const StockOverviewPage = ()=>{
    return (
        <main>
            Stock Overview Page
            <AutoComplete/>
            <StockList/>
        </main>
    )
}
