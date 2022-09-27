import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finnhub from "../apis/finnhub";


export const StockDetailPage = () => {
    const { symbol } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime() / 1000)  //Get current time
            let oneDayAgo
            if (date.getDay() === 6) {
                oneDayAgo = currentTime - 2 * 24 * 60 * 60;
            } else if (date.getDay() === 0) {
                oneDayAgo = currentTime - 3 * 24 * 60 * 60;
            } else {
                oneDayAgo = currentTime - 24 * 60 * 60;
            }

            // Function for  data response
            // Weekly data response
            const oneWeek = currentTime - 7 * 24 * 60 * 60;

            //Yearly data response
            const oneYear = currentTime - 365 * 24 * 60 * 60;

            // Set up promise to get response for day, week and year data
            try {
                const responses = await Promise.all([
                    finnhub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneDayAgo,
                            to: currentTime,
                            resolution: 30
                        }
                    }),
                    finnhub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneWeek,
                            to: currentTime,
                            resolution: 60
                        }
                    }),
                    finnhub.get("/stock/candle", {
                        params: {
                            symbol,
                            from: oneYear,
                            to: currentTime,
                            resolution: "W"
                        }
                    })

                ])

                const data = responses.map((response) => {
                    return [{
                        data: response.data,
                        // symbol: response.config.params.symbol
                    }]
                })

                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <main>Stock Details Page {symbol}</main>
    )
}

