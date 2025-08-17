import config from "../config"

import { MouseEvent, getPhase, getHeldItemID, Prefix } from "../utils/utils"

let confirm = false

register(MouseEvent, (event) => {

    const button = event.button
    const state = event.buttonstate

    if (!config.leapConfirmation) return

    if (!state) return
    if (button != 1) return

    if (getHeldItemID() !== "INFINITE_SPIRIT_LEAP") return
    if (getPhase() != 0) return

    if (!confirm) {
        cancel(event)
        ChatLib.chat(`${Prefix} &bClick again&7 to open leap menu`)
        confirm = true
        setTimeout(() => {
            confirm = false
        }, 1000)
    } else {
        confirm = false
    }

})