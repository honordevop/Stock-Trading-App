import { useState, useEffect, useContext } from "react"
import finnhub from "../apis/finnhub";
import { WatchListContext } from "../context/watchListContext";


export const AutoComplete = ()=> {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const {addStock} = useContext(WatchListContext)

    const renderDropDown = () => {
        const dropDownClass = search ? "show" : null
        return (
            <ul className={`dropdown-menu scroll-ctl ${dropDownClass}`}>
                {results.map((result)=> {
                    return (
                        <li onClick={() => {
                            addStock(result.symbol)
                            setSearch("")
                        }} className="dropdown-item" key={result.symbol}> {result.description} ({result.symbol}) </li>
                    )
                })}
            </ul>
        )
    }

    useEffect(()=>{
        let isMounted = true
        const fetchSearch = async () => {
            try {
                const response = await finnhub.get("/search", {
                    params: {
                        q: search
                    }
                })
                // console.log(response)
                if (isMounted) {
                    setResults(response.data.result)
                }
            } catch (err) {

            }
        }
        if (search.length > 0){
            fetchSearch()
        } else {
            setResults([])
        }
        return () => (isMounted = false)
    }, [search])




    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input style={{backgroundColor: "rgba(145,158,171,0.04)"}} id="search" placeholder="Search" autoComplete="off" type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <label htmlFor="search">Search</label>
                {renderDropDown()}
            </div>
        </div>
    )
}