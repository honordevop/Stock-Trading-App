import { createContext, useState } from "react";

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {
    // const [watchList, setWatchList] = useState(getWatchList() || ['GOOGL', 'MSFT', 'AMZN']);

    //function to get watchlist content from localstorage if it exist
    const getWatchList = ()=> {
        let watchList = localStorage.getItem('watchlist')
        if (watchList) {
            watchList = JSON.parse(localStorage.getItem('watchlist'))
            return watchList
        }
    }
    const [watchList, setWatchList] = useState(getWatchList() || ['GOOGL', 'MSFT', 'AMZN']);

    localStorage.setItem('watchlist', JSON.stringify(watchList))

    const addStock = (stock)=> {
        if (watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el) => {
            return el !== stock
        }))
    }

    return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
        {props.children}
    </WatchListContext.Provider>
}