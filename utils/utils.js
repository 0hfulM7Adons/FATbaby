export const Prefix = `&1[&9FATbaby&1]`

export const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent")
export const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")
export const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")
export const S2EPacketCloseWindow = Java.type("net.minecraft.network.play.server.S2EPacketCloseWindow")
export const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow")
export const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange")
export const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow")
export const renderBossHealthOverlay = Java.type("net.minecraftforge.client.event.RenderGameOverlayEvent$Pre")
export const BossStatus = Java.type("net.minecraft.entity.boss.BossStatus")

export const regions = {
    p1: [42, 105, 220, 230, 12, 84],
    p2: [20, 85, 163, 213, 0, 107],
    gpad: [20, 42, 170, 172, 0, 22],
    pillars: [33, 60, 165, 195, 31, 76],
    ppillar: [87, 114, 163, 172, 31, 76],
    ppad: [87, 127, 163, 172, 85, 107],
    ypad: [21, 52, 165, 177, 85, 107],
    s1: [89, 113, 106, 146, 30, 122],
    s2: [19, 111, 106, 146, 121, 145],
    s3: [-6, 20, 106, 146, 50, 143],
    s4: [-2, 89, 106, 152, 30, 51],
    drop: [36, 73, 58, 96, 95, 122],
    mid: [46, 63, 58, 96, 68, 85],
    p5: [14, 99, 5, 8, 52, 134]
}

export const sendWindowClick = (windowId, slot, clickType, actionNumber=0) => Client.sendPacket(new C0EPacketClickWindow(windowId ?? Player.getContainer().getWindowId(), slot, clickType ?? 0, 0, null, actionNumber))

export const removeUnicode = (string) => typeof(string) !== "string" ? "" : string.replace(/[^\u0000-\u007F]/g, "")

export function isPlayerInBox(x1, x2, y1, y2, z1, z2) {
    const x = Player.getX();
    const y = Player.getY();
    const z = Player.getZ();

    return (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) &&
            y >= Math.min(y1, y2) && y <= Math.max(y1, y2) &&
            z >= Math.min(z1, z2) && z <= Math.max(z1, z2));
}

export function getDist(x1, x2, y1, y2, z1, z2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2)
}

export function rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
    rightClickMethod.setAccessible(true);
    rightClickMethod.invoke(Client.getMinecraft(), null);
}

export function getHeldItemID() {
    const item = Player.getHeldItem();
    const itemId = item?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id");
    return itemId;
}

export function getNameByClass(playerClass) {
    let index = TabList?.getNames()?.findIndex(line => line?.toLowerCase()?.includes(playerClass?.toLowerCase()));
    if (index == -1) return;
    
    let match = TabList?.getNames()[index]?.removeFormatting().match(/(?:\[\d+\]\s*)?(.+?) \((.+?)\)/);
    if (!match) return "EMPTY";
    
    return removeUnicode(match[1]).trim(); 
}

export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
}

let witherPhase

export function getPhase() {
    return witherPhase
}

register("chat", (message) => {
    if (message == "[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!") {
        witherPhase = 1
    }
    if (message == "[BOSS] Storm: Pathetic Maxor, just like expected.") {
        witherPhase = 2
    }
    if (message == "[BOSS] Storm: I should have known that I stood no chance.") {
        witherPhase = 3
    }
    if (message == "[BOSS] Necron: You went further than any human before, congratulations.") {
        witherPhase = 4
    }
    if (message == "[BOSS] Necron: All this, for nothing...") {
        witherPhase = 5
    }
}).setCriteria("${message}")

register("worldLoad", () => {
    witherPhase = 0
})

export function getRegions() {
    let msg = ""
    Object.keys(regions).forEach(key => {
        let [x1, x2, y1, y2, z1, z2] = [regions[key][0], regions[key][1], regions[key][2], regions[key][3], regions[key][4], regions[key][5]]
        if (isPlayerInBox(x1, x2, y1, y2, z1, z2)) {
            msg += key
        }
    })
    return msg
}