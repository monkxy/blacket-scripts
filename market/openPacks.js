(async () => {
    if (!blacket.packs) {
        return alert('You must be on the Market to run this script.')
    }
    let selection = prompt('Which pack would you like to open?\n\nOpenable Packs:\n' + Object.keys(blacket.packs).join('\n'))
    if (!blacket.packs[selection]) {
        return alert("That pack was not found.")
    }
    let amount = prompt('How many packs do you want to open?\n\nYou can also use * to open as many as you can afford.')
    if (amount.toString() === '*') {
        amount = Math.floor(blacket.user.tokens / blacket.packs[selection].price)
    }
    if (isNaN(amount) || amount < 0) {
        return alert('That is not a valid amount')
    }
    if (amount < 1 || amount * blacket.packs[selection].price > blacket.user.tokens) {
        return alert('You cannot afford that many packs')
    }
    let speed = Number.parseInt(prompt('What speed would you like to open packs at? This is in milliseconds.\n\nThe lowest you can go is 125ms.'))
    if (isNaN(speed)) {
        return alert('That is not a valid speed')
    }
    if (speed < 125) {
        return alert('If you run the speed any lower, you will be instantly blacklisted.')
    }
    window.blooks = []
    let opened = 0
    async function openPack(pack) {
        const data = {
            pack: pack
        }
        await blacket.requests.post('/worker/open', data, (res) => {
            if (res.error) {
                return
            }
            opened++
            blooks.push(res.blook)
        })
    }
    let interval = setInterval(() => {
        if (opened < amount) {
            openPack(selection)
        } else {
            clearInterval(interval)
            let results = {}
            blooks.forEach((blook) => {
                results[blook] = (results[blook] || 0) + 1
            })
            alert('Blooks Obtained:\n' + Object.entries(results).map((entry) => '    ' + entry[1] + ' ' + entry[0]).join('\n'))
        }
    }, speed)
})();
