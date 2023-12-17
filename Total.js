async function nx() {
    const count = 50
    const res = await fetch(`https://www.nexon.com/api/wallet/v1/history?page=1&count=1000000&type=in`)
    const data = await res.json()
    let transactions = data.transactions.map(t => t.amount)

    const total_nx = transactions.reduce((p, c) => p + c, 0)
    console.log(`Total: $${parseFloat((total_nx/1000).toFixed(2)).toLocaleString()} USD (${total_nx.toLocaleString()} NX)`)
}
nx()