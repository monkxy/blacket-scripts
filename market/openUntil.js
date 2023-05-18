(async () => {
    if (!blacket.packs) {
        return alert('You must be on the Market to run this script.')
    }
    let blooksInPacks = {}
    Object.keys(blacket.packs).forEach((pack) => {
        blacket.packs[pack].blooks.forEach((blook) => {
            blooksInPacks[blook] = pack
        })
    });
    let targetBlook = prompt('Which Blook would you like to target?\n\nAll Blooks:\n' + Object.keys(blacket.blooks).join('\n'))
    if (!blacket.blooks[targetBlook]) {
        return alert("That Blook doesn't exist.")
    }
    let targetPack = blooksInPacks[targetBlook],
        limit = prompt('How many packs do you want to open before stopping?\n\nYou can also use * to open as many as you can purchase.')
    if (limit.toString() === '*') {
        limit = Math.floor(blacket.user.tokens / blacket.packs[targetPack].price)
    }
    if (isNaN(limit) || limit < 0) {
        return alert('That is not a valid limit.')
    }
    if (limit < 1 || limit * blacket.packs[targetPack].price > blacket.user.tokens) {
        return alert('You cannot afford that many packs.')
    }
    let speed = Number.parseInt(prompt('What speed would you like to open packs at? This is in milliseconds.\n\nThe lowest you can go is 125ms.'))
    if (isNaN(speed)) {
        return alert('That is not a valid speed.')
    }
    if (speed < 125) {
        return alert('If you run the speed any lower, you will be instantly blacklisted.')
    }
    window.blooks = [];
    let opened = 0,
        found = false;

    function openPack(pack) {
        const data = {
            pack: pack
        };
        blacket.requests.post('/worker/open', data, (res) => {
            if (res.error) {
                return;
            }
            opened++;
            if (res.blook === targetBlook) {
                found = true;
            }
            blooks.push(res.blook);
        });
    }
    let interval = setInterval(() => {
        if (!found && opened <= limit) {
            openPack(targetPack);
        } else {
            clearInterval(interval);
            let results = {};
            blooks.forEach((blook) => {
                results[blook] = (results[blook] || 0) + 1;
            });
            if (found) {
                alert('Unlocked ' + targetBlook + ' in ' + opened + ' packs.\n\nOther Blooks Obtained:\n' + Object.entries(results).map((entry) => '    ' + entry[1] + ' ' + entry[0]).join('\n'))
            } else {
                alert('I could not unlock ' + targetBlook + ' in ' + opened + ' packs.\nObtained:\n' + Object.entries(results).map((entry) => '    ' + entry[1] + ' ' + entry[0]).join('\n'))
            }
        }
    }, speed)
})();
