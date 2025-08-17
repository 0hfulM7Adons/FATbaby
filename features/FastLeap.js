import config from "../config"
import leapHelper from "../utils/leapUtils"
import { getLeap } from "../utils/leapTarget"
import { isPlayerInBox, MouseEvent, getHeldItemID, getNameByClass, getClass, getPhase, regions } from "../utils/utils"


register(MouseEvent, (event) => {
    
    const button = event.button
    const state = event.buttonstate

    if (!state) return
    if (button !== 1) return

    if (getHeldItemID() !== "INFINITE_SPIRIT_LEAP") return

    leapHelper.setTarget(null)

})

register(MouseEvent, (event) => {

    if (!config.fastLeap) return

    const button = event.button
    const state = event.buttonstate

    if (!state) return
    if (button !== 0) return

    if (getHeldItemID() !== "INFINITE_SPIRIT_LEAP") return

    let leapTo = getLeap()
    if (!leapTo || !leapTo.length) return

    cancel(event)
    leapHelper.leap(leapTo)

})