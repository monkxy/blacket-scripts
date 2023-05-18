(async () => {
    if (blacket.config.path !== 'blooks') {
        return alert('You need to be on the Blooks page to run this script.');
    }
    $('.styles__blooksHolder___3qZR1-camelCase').children().replaceWith();
    $('.styles__rightButtonRow___3a0GF-camelCase').remove();
    blacket.requests.get('/worker/user/' + prompt('Enter username:'), (owned) => {
        blacket.user.blooks = owned.user.blooks;
        blacket.packBlooks = [];
        Object.keys(blacket.packs).reverse().forEach((pack) => {
            if (blacket.packs[pack].hidden) return;
            let packId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
            $('.styles__blooksHolder___3qZR1-camelCase').append(`<div class="styles__setHolder___rVq3Z-camelCase"><div class="styles__setTop___wIaVS-camelCase"><div class="styles__setTopBackground___342Wr-camelCase" style="background-image: url('/content/blookTile.png');"></div><div class="styles__setText___1PQLQ-camelCase">${pack} Pack</div><div class="styles__setDivider___3da0c-camelCase"></div></div><div id="${packId}" class="styles__setBlooks___3xamH-camelCase"></div></div>`);
            Object.entries(blacket.packs[pack].blooks).forEach((blook) => {
                blacket.packBlooks.push(blook[1]);
                let blookId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
                let blookData;
                if (!blacket.user.blooks[blook[1]]) {
                    blookData = {
                        class: 'styles__lockedBlook___3oGaX-camelCase',
                        i: '<i class="fas fa-lock styles__blookLock___3Kgua-camelCase" aria-hidden="true"></i>',
                        quantity: '',
                        cursor: 'auto'
                    };
                } else {
                    let blookText;
                    if (blacket.rarities[blacket.blooks[blook[1]].rarity].color == 'rainbow') {
                        blookText = `<div class="styles__blookText___3AMdK-camelCase" style="background-image: url('/content/rainbow.gif');">${blacket.user.blooks[blook[1]].toLocaleString()}</div></div>`;
                    } else {
                        blookText = `<div class="styles__blookText___3AMdK-camelCase" style="background-color: ${blacket.rarities[blacket.blooks[blook[1]].rarity].color};">${blacket.user.blooks[blook[1]].toLocaleString()}</div></div>`;
                    }
                    blookData = {
                        class: '',
                        i: '',
                        quantity: blookText,
                        cursor: 'pointer'
                    };
                }
                $(`#${packId}`).append(`<div id="${blookId}" class="styles__blookContainer___3JrKb-camelCase" style="cursor: ${blookData.cursor}" role="button" tabindex="0"><div class="styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase ${blookData.class}"><img loading="lazy" src="${blacket.blooks[blook[1]].image}" draggable="false" class="styles__blook___1R6So-camelCase" /></div>${blookData.i}${blookData.quantity}`);
                $(`#${blookId}`).click(function () {
                    if (this.children[0].classList.contains('styles__lockedBlook___3oGaX-camelCase')) return;
                    blacket.selectBlook(blook[1]);
                });
            });
        });
        let miscBlooks = [];
        Object.keys(blacket.user.blooks).forEach((blook) => {
            if (!blacket.packBlooks.includes(blook) && blacket.blooks[blook]) {
                miscBlooks.push(blook);
            }
        });
        if (miscBlooks.length > 0) {
            let miscId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
            $('.styles__blooksHolder___3qZR1-camelCase').append(`<div class="styles__setHolder___rVq3Z-camelCase"><div class="styles__setTop___wIaVS-camelCase"><div class="styles__setTopBackground___342Wr-camelCase" style="background-image: url('/content/blookTile.png');"></div><div class="styles__setText___1PQLQ-camelCase">Miscellaneous</div><div class="styles__setDivider___3da0c-camelCase"></div></div><div id="${miscId}" class="styles__setBlooks___3xamH-camelCase"></div></div>`);
            miscBlooks.forEach((blook) => {
                if (!blacket.blooks[blook]) return;
                let blookText;
                if (blacket.rarities[blacket.blooks[blook].rarity] && blacket.rarities[blacket.blooks[blook].rarity].color == 'rainbow') {
                    blookText = `<div class="styles__blookText___3AMdK-camelCase" style="background-image: url('/content/rainbow.gif');">${blacket.user.blooks[blook].toLocaleString()}</div></div>`;
                } else {
                    blookText = `<div class="styles__blookText___3AMdK-camelCase" style="background-color: ${blacket.rarities[blacket.blooks[blook].rarity].color};">${blacket.user.blooks[blook].toLocaleString()}</div></div>`;
                }
                $(`#${miscId}`).append(`<div id="${blook.replaceAll(' ', '-').replaceAll("'", '_')}" class="styles__blookContainer___3JrKb-camelCase" style="cursor: pointer" role="button" tabindex="0"><div class="styles__blookContainer___36LK2-camelCase styles__blook___bNr_t-camelCase"><img loading="lazy" src="${blacket.blooks[blook].image}" draggable="false" class="styles__blook___1R6So-camelCase" /></div>${blookText}`);
                $(`#${blook.replaceAll(' ', '-').replaceAll("'", '_')}`).click(function () {
                    blacket.selectBlook(blook);
                });
            });
        }
    });
})();
