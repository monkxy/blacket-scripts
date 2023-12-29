(async () => {
    if (!blacket.packs) {
        return alert("You must be on the Market to run this script.");
    }
    let selection = "";
    while (!blacket.packs[selection]) {
        selection = prompt(
            "Which pack would you like to open?\n\nOpenable Packs:\n" +
            Object.keys(blacket.packs).join("\n")
        );
        selection = Object.keys(blacket.packs).find(
            (pack) => pack.toLowerCase() === selection.toLowerCase()
        );
        if (!selection) {
            alert("That pack was not found.");
        }
    }
    let amount = "";
    while (isNaN(amount) || amount < 0 || amount < 1 || amount * blacket.packs[selection].price > blacket.user.tokens) {
        amount = prompt(
            "How many packs do you want to open?\n\nYou can also use * to open as many as you can purchase."
        );
        amount = Math.floor(blacket.user.tokens / blacket.packs[selection].price);
    }
    if (isNaN(amount) || amount < 0) {
        alert("That is not a valid amount");
    } else if (amount < 1 || amount * blacket.packs[selection].price > blacket.user.tokens) {
        alert("You cannot afford that many packs");
    }

    let speed = "";
    while (isNaN(speed) || speed < 125) {
        speed = Number.parseInt(
            prompt(
                "What speed would you like to open packs at? This is in milliseconds.\n\nThe lowest you can go is 125ms."
            )
        );
        if (isNaN(speed)) {
            alert("That is not a valid speed");
        } else if (speed < 125) {
            alert("If you run the speed any lower, you will be instantly blacklisted.");
        }
    }
    window.blooks = [];
    let opened = 0;
    async function openPack(pack) {
        const data = {
            pack: pack
        };
        await blacket.requests.post("/worker2/open", data, (res) => {
            if (res.error) {
                return;
            }
            opened++;
            console.log("%c" + res.blook + " (" + opened + "/" + amount + ")", "font-size: 20px; color: white; text-shadow: 0px 0px 15px " + blacket.rarities[blacket.blooks[res.blook].rarity].color + "; font-family: monospace;");
            blooks.push(res.blook);
        });
    }
    let interval = setInterval(() => {
        if (opened < amount) {
            openPack(selection);
        } else {
            clearInterval(interval);
            let results = {};
            blooks.forEach((blook) => {
                results[blook] = (results[blook] || 0) + 1;
            });
            alert("Blooks Obtained:\n" + Object.entries(results).map((entry) => "    " + entry[1] + " " + entry[0]).join("\n"))
        }
    }, speed);
})();
