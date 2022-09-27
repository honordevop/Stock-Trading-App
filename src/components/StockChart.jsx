import { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = ({ chartData, symbol }) => {
    const { day, week, year } = chartData

    //Declaring state to handle time buttons
    const [dateFormat, setDateFormat] = useState("24h")

    //Declaring the chart variables
    const options = {
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
    }
    const series = [{
        name: symbol,
        data: day
    }]

    return <div className="mt-5 p-4 shadow-sm bg-white">
        <Chart options={options} series={series} type="area" width="100%" />
        <button onClick={()=> {setDateFormat("24h")}}>24h</button>
        <button onClick={()=> {setDateFormat("7d")}}>7d</button>
        <button onClick={()=> {setDateFormat("1y")}}>1y</button>        
    </div>
}