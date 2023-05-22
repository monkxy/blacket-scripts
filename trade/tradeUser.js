(async () => {
    let id = prompt("Who would you like to trade (Enter the ID not username):")
    let interval = setInterval(() => {
        blacket.socket.emit("request", id);
        $("#errorModal").remove();
        blacket.socket.on("request", (data) => {
            if (!data.error) {
                clearInterval(interval);
                $("body").append(`<div id="successModal" class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase"><div>Success<br><br>Trade request was successfully sent!</div></div><div class="styles__holder___3CEfN-camelCase"><div class="styles__buttonContainer___2EaVD-camelCase"><div id="closeButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Okay</div></div></div></div><input type="submit" style="opacity: 0; display: none;"></form></div>`);
                setTimeout(() => {
                    $("#successModal").remove();
                }, 5000);
            };
        });
    }, 1000);
})();
