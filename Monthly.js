async function nx() {
    let totalNX = 0
    const res = await fetch(`https://www.nexon.com/api/wallet/v1/history?page=1&count=1000000&type=in`)
    const data = await res.json()

    let amountsData = data.transactions.map(t => [new Date(t.date).getFullYear(),
                                                    new Date(t.date).toLocaleString('default', { month: 'long' }),
                                                    t.amount])

    let currentYear = -1;
    let currentMonth = "";
    let yearlyNX = 0;
    let monthlyNX = 0; 
    let monthlyLogs = ""

    //0: year
    //1: month
    //2: amount
    amountsData.forEach(amountData => {
        if (currentMonth != amountData[1]){
            if (currentMonth != ""){
                monthlyLogs += `\t ${currentMonth}: ${monthlyNX.toLocaleString()} NX\n`
            }

            currentMonth = amountData[1]
            monthlyNX = 0;
        }


        if (currentYear != amountData[0]) {
            if (currentYear != -1){
                console.log("%i: %s NX",currentYear, yearlyNX.toLocaleString())
                console.log(monthlyLogs)
                monthlyLogs = ""
            }
            currentYear = amountData[0]
            
            totalNX += yearlyNX
            yearlyNX = 0
        }

        monthlyNX += amountData[2]
        yearlyNX += amountData[2]
    })

    console.log("Total: %s NX", totalNX.toLocaleString())
}
nx()