import config from "../config"
import { getClass, getNameByClass, isPlayerInBox, regions, getPhase } from "../utils/utils"

function phaseZeroLeap() {
    if (config.brLeap) {
        if (getClass() == "Mage") {
            return getNameByClass("arch")
        } else if (getClass() == "Archer") {
            return getNameByClass("mage")
        }
    }
}

function phaseOneLeap() {
    if (config.p1Leap) {
        if (isPlayerInBox(...regions.p1)) {
            let leapClass = getNameByClass(config.p1Target)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.p1Target : leapClass
        }
    }
}

function phaseTwoLeap() {
    if (config.p2Leap) {
        if (isPlayerInBox(...regions.pillars)) {
            let leapClass = getNameByClass(config.pillarTarget)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.pillarTarget : leapClass
        } else if (isPlayerInBox(...regions.ypad)) {
            let leapClass = getNameByClass(config.ypadTarget)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.ypadTarget : leapClass
        } else if (isPlayerInBox(...regions.s3)) {
            let leapClass = getNameByClass(config.pdTarget)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.pdTarget : leapClass
        } else if (isPlayerInBox(...regions.gpad)) {
            let leapClass = getNameByClass(config.gpadTarget)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.gpadTarget : leapClass
        } else if (isPlayerInBox(...regions.ppillar)) {
            let leapClass = getNameByClass(config.ppillarTarget)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.ppillarTarget : leapClass
        } else if (isPlayerInBox(...regions.ppad)) {
            let leapClass = getNameByClass(config.ppadTarget)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.ppadTarget : leapClass
        }
    }
}

function phaseThreeLeap() {
    if (config.p3Leap) {
        if (isPlayerInBox(...regions.p2)) {
            let leapClass = getNameByClass(config.p2Target)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.p2Target : leapClass
        } else if (isPlayerInBox(...regions.s1)) {
            let leapClass = getNameByClass(config.s1Target)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.s1Target : leapClass
        } else if (isPlayerInBox(...regions.s2)) {
            let leapClass = getNameByClass(config.s2Target)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.s2Target : leapClass
        } else if (isPlayerInBox(...regions.s3)) {
            let leapClass = getNameByClass(config.s3Target)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.s3Target : leapClass
        } else if (isPlayerInBox(...regions.s4)) {
            let leapClass = getNameByClass(config.s4Target)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.s4Target : leapClass
        }
    }
}

function phaseFourLeap() {
    if (config.p4Leap) {
        if (isPlayerInBox(...regions.drop)) {
            let leapClass = getNameByClass(config.dropTarget)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.dropTarget : leapClass
        } else if (isPlayerInBox(...regions.mid)) {
            let leapClass = getNameByClass(config.midTarget)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.midTarget : leapClass
        }
    }
}

function phaseFiveLeap() {
    if (config.p5Leap) {
        if (isPlayerInBox(...regions.p5)) {
            let leapClass = getNameByClass(config.p5Target)
            return (leapClass === -1 || leapClass === "EMPTY") ? config.p5Target : leapClass
        }
    }
}

export function getLeap() {

    if (getPhase() == 0) {
        const target = phaseZeroLeap()
        if (target != null) return target
    }

    if (getPhase() == 1) {
        const target = phaseOneLeap()
        if (target != null) return target
    }

    if (getPhase() == 2) {
        const target = phaseTwoLeap()
        if (target != null) return target
    }

    if (getPhase() == 3) {
        const target = phaseThreeLeap()
        if (target != null) return target
    }

    if (getPhase() == 4) {
        const target = phaseFourLeap()
        if (target != null) return target
    }

    if (getPhase() == 5) {
        const target = phaseFiveLeap()
        if (target != null) return target
    }

}

export function getSmartLeap() {

    

}