import config from "../config"
import leapHelper from "../utils/leapUtils"
import { isPlayerInBox, getNameByClass, getClass, getDist, regions, renderBossHealthOverlay, BossStatus } from "../utils/utils"

const witherhp = register(renderBossHealthOverlay, (event) => {

    if (event.type.toString() != "BOSSHEALTH") return

    let hp = BossStatus.field_82828_a
    if (hp > 0.003334) return

    if (isPlayerInBox(...regions.p1)) {
        let leapClass = getNameByClass(config.p1Target)
        let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.p1Target : leapClass
        witherhp.unregister()
        leapHelper.autoLeap(leapString)
    }

    if (isPlayerInBox(...regions.mid)) {
        let leapClass = getNameByClass(config.midTarget)
        let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.midTarget : leapClass
        witherhp.unregister()
        leapHelper.autoLeap(leapString)
    }

}).unregister()

register("worldLoad", () => {
    progress = [0, 7]
    gateBlown = false
    witherhp.unregister()
    section = 1
})

// Br

register("chat", (name) => {

    if (!config.brLeap || !config.brAuto) return

    if (name != Player.getName()) {

        let myClass = getClass()
        let player = World.getPlayerByName(name)

        if (player) {
            let [x1, y1, z1] = [Player.getX(), Player.getY(), Player.getZ()]
            let [x2, y2, z2] = [player.getX(), player.getY(), player.getZ()]
            if (getDist(x1, x2, y1, y2, z1, z2) < 8) return
        }
        
        if (myClass == "Mage") {
            let leapString = getNameByClass("archer")
            if (leapString === -1 || leapString == "EMPTY") return
            leapHelper.autoLeap(leapString)
        } else if (myClass == "Archer") {
            let leapString = getNameByClass("mage")
            if (leapString === -1 || leapString == "EMPTY") return
            leapHelper.autoLeap(leapString)
        }

    }

}).setCriteria(/(.+) opened a WITHER door!/)

// Maxor

register("chat", (message) => {

    if (!config.p1Leap || !config.p1Auto) return

    if (message == "[BOSS] Maxor: YOU TRICKED ME!" || message == "[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!") witherhp.register()

    if (message == "[BOSS] Storm: Pathetic Maxor, just like expected.") witherhp.unregister()

}).setCriteria("${message}")

// Storm

register("chat", (message) => {

    if (!config.p2Leap || !config.p2Auto) return

    if (message == "⚠ Storm is enraged! ⚠") {
        // if (isPlayerInBox(...regions.pillars) && getClass() == "Mage") {
        //     let leapClass = getNameByClass(config.pillarTarget)
        //     let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.pillarTarget : leapClass
        //     leapHelper.autoLeap(leapString)
        // } else 
        if (isPlayerInBox(...regions.ppillar)) {
            let leapClass = getNameByClass(config.ppillarTarget)
            let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.ppillarTarget : leapClass
            leapHelper.autoLeap(leapString)
        }
    } 

    if (message == "[BOSS] Storm: Oof" || message == "[BOSS] Storm: Ouch, that hurt!") {
        // if (isPlayerInBox(...regions.ypad) && getClass() == "Mage") {
        //     let leapClass = getNameByClass(config.ypadTarget)
        //     let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.ypadTarget : leapClass
        //     leapHelper.autoLeap(leapString)
        // } else 
        if (isPlayerInBox(...regions.ppad)) {
            let leapClass = getNameByClass(config.ppadTarget)
            let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.ppadTarget : leapClass
            leapHelper.autoLeap(leapString)
        }
    }

}).setCriteria("${message}")

// P3

let progress = [0, 7]
let gateBlown = false
let section = 1

function newSection() {

    progress = [0, 7]
    gateBlown = false
    section++
    if (section > 4) section = 1

    let leapString = ""
    ChatLib.chat(section)

    if (isPlayerInBox(...regions.s1)) {
        if (section != 2) return
        let leapClass = getNameByClass(config.s1Target)
        leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.s1Target : leapClass
    } else if (isPlayerInBox(...regions.s2)) {
        if (section != 3) return
        let leapClass = getNameByClass(config.s2Target)
        leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.s2Target : leapClass
    } else if (isPlayerInBox(...regions.s3)) {
        if (section != 4) return
        let leapClass = getNameByClass(config.s3Target)
        leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.s3Target : leapClass
    } else if (isPlayerInBox(...regions.s4)) {
        if (section != 1) return
        let leapClass = getNameByClass(config.s4Target)
        leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.s4Target : leapClass
    }

    leapHelper.autoLeap(leapString)

}

register("chat", (message) => {

    if (!config.p3Leap || !config.p3Auto) return

    const regex = /(\w+) (activated|completed) (a terminal|a device|a lever)! \((\d)\/(\d)\)/

    let match = message.match(regex)

    if (match) {
        let [_, __, name, action, completed, total] = match
        completed = parseInt(completed)
        total = parseInt(total)

        if (completed < progress[0] || (completed == total && gateBlown)) newSection()
        progress = [completed, total]
    }

    if (message == "The gate has been destroyed!") {
        if (progress[0] == progress[1]) newSection()
        else {
            gateBlown = true
        }
    }

    if (message == "[BOSS] Storm: I should have known that I stood no chance.") {
        if (isPlayerInBox(...regions.p2)) {
            let leapClass = getNameByClass(config.p2Target)
            let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.p2Target : leapClass
            leapHelper.autoLeap(leapString)
        }
    }

}).setCriteria("${message}")

// Necron

register("chat", (message) => {

    if (!config.p4Leap || !config.p4Auto) return

    if (message == "[BOSS] Necron: Goodbye.") {
        if (isPlayerInBox(...regions.drop)) {
            let leapClass = getNameByClass(config.dropTarget)
            let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.dropTarget : leapClass
            setTimeout(() => {
                leapHelper.autoLeap(leapString)
            }, 1600)
        }
    }

    if (message == "[BOSS] Necron: ARGH!") witherhp.register()

    if (message == "[BOSS] Necron: All this, for nothing...") witherhp.unregister()

}).setCriteria("${message}")

// P5

register("chat", (name) => {

    if (!config.p5Leap || !config.p5Auto) return

    if (name != Player.getName()) return

    let leapClass = getNameByClass(config.p5Target);
    let leapString = (leapClass === -1 || leapClass === "EMPTY") ? config.p5Target : leapClass
    setTimeout(() => {
        leapHelper.autoLeap(leapString)
    }, config.p5AutoDelay)

}).setCriteria(/(\w+) picked the Corrupted \w+ Relic!/)