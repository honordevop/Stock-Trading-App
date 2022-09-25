
//How to use promise function
const response = Promise.all(
    finnhub.get("/quote", {
        params: {
            symbol: "MSFT"
        }
    }),
    finnhub.get("/quote", {
        params: {
            symbol: "GOOGL"
        }
    }),
    finnhub.get("/quote", {
        params: {
            symbol: "AMZN"
        }
    })
)

//How to use map function
let stocks = ["MSFT", "GOOGL", "AMZN"]

let modifiedStock = stocks.map((stock) => {
    // return stock + !
    return `${stock}!`;
});

console.log(modifiedStock)
