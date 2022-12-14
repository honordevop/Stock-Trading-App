import { useState, useEffect, useContext } from "react";
import finnhub from "../apis/finnhub";
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { WatchListContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";


export const StockList = () => {

    const [stock, setStock] = useState();
    // const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']); to be imported from context as show below 
    const { watchList, deleteStock } = useContext(WatchListContext)
    const navigate = useNavigate()

    //Function to set Chg% to red or green based on it value
    const changeColor = (change) => {
        return change > 0 ? "success" : "danger"
    }

    //Function to Icon direction to bullish or bearish
    const renderIcon = (change) => {
        return change > 0 ? <BsCaretUpFill/> : <BsCaretDownFill/>
    }

    //Funtion fo redirecting to selected stock detail page
    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
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
                // const responses = (JSON.parse(localStorage.getItem('responses'))) || await Promise.all(watchList.map((list) => {
                    const responses = await Promise.all(watchList.map((list) => {
                    return finnhub.get("/quote", {
                        params: {
                            symbol: list
                        }
                    })
                }))

                localStorage.setItem('responses', JSON.stringify(responses))

                // console.log(responses)
                // useState(JSON.parse(localStorage.getItem('selectedTeam')) || "TeamB");
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                // console.log(data)
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

        
    }, [watchList])
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
                            <tr style={{ cursor: "pointer" }} onClick={() => {handleStockSelect(stockData.symbol)}} className="table-row" key={stockData.symbol}>
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
                                <td>{stockData.data.pc} <button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e)=>{
                                    e.stopPropagation()
                                    deleteStock(stockData.symbol)
                                }}>Remove</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}