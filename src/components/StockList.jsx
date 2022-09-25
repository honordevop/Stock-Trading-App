import { useState, useEffect, useContext } from "react";
import finnhub from "../apis/finnhub";
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { WatchListContext } from "../context/watchListContext";


export const StockList = () => {

    const [stock, setStock] = useState();
    // const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']); to be imported from context as show below 
    const { watchList } = useContext(WatchListContext)

    //Function to set Chg% to red or green based on it value
    const changeColor = (change) => {
        return change > 0 ? "success" : "danger"
    }

    //Function to Icon direction to bullish or bearish
    const renderIcon = (change) => {
        return change > 0 ? <BsCaretUpFill/> : <BsCaretDownFill/>
    }

    useEffect(() => {
        
        let isMounted = true  //This is set to prevent accidental call on unmounted data
        const fetchData = async () => {
            // const responses = []
            try {
                /*
                const response = await finnhub.get("/quote", {
                    params: {
                        symbol: "MSFT"
                    }
                })*/

                // Function to ensure all provided stock is fecthed through a single api call
                const responses = (JSON.parse(localStorage.getItem('responses'))) || await Promise.all(watchList.map((list) => {
                    return finnhub.get("/quote", {
                        params: {
                            symbol: list
                        }
                    })
                }))

                localStorage.setItem('responses', JSON.stringify(responses))

                console.log(responses)
                // useState(JSON.parse(localStorage.getItem('selectedTeam')) || "TeamB");
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                console.log(data)
                // localStorage.setItem('data', JSON.stringify(data))
                if (isMounted) {
                    setStock(data)
                }
            } catch (err) {
                console.log(err)

            }
        }
        fetchData()
        return () => (isMounted = false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        // <div>helo</div>
        <div>
            <table className="table hover mt-5">
                <thead style={{ color: "rgb(79,89,102" }}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg%</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock?.map((stockData) => {
                        return (
                            <tr className="table-row" key={stockData.symbol}>
                                <th scope="row">{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td className={`text-${changeColor(stockData.data.d)}`}>
                                    {stockData.data.d}
                                    {renderIcon(stockData.data.d)}
                                </td>
                                <td className={`text-${changeColor(stockData.data.dp)}`}>
                                    {stockData.data.dp}
                                    {renderIcon(stockData.data.dp)}
                                </td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}