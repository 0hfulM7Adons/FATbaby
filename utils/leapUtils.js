import { Prefix, S2DPacketOpenWindow, S2FPacketSetSlot, C09PacketHeldItemChange, sendWindowClick, rightClick } from "../utils/utils"

export default new class leapHelper {
    constructor() {
        this.target = null;
        this.clickedLeap = false;
        this.menuOpened = false;
        this.autoLeaping = false;
        this.currentSlot = -1;

        register("packetReceived", (packet, event) => {
            if (!this.target || !this.menuOpened) return;

            const itemStack = packet.func_149174_e();
            const slot = packet.func_149173_d();
            const windowID = packet.func_149175_c();

            if (!windowID || !itemStack || !slot) return;
            if (slot > 35) {
                ChatLib.chat(`${Prefix} &7Could not find &b${this.target}`);
                this._reset();
                return;
            }; 
            cancel(event);

            const item = new Item(itemStack);
            const itemName = item?.getName()?.removeFormatting()?.toLowerCase();
            if (itemName != this.target?.toLowerCase()) return;

            sendWindowClick(windowID, slot, 0, 0);
            ChatLib.chat(`${Prefix} &7Leaping to &b${this.target}`);
            this._reset();
            Client.scheduleTask(1, () => {
                if (this.autoLeaping && this.currentSlot > -1 && this.currentSlot < 9) {
                    Player.setHeldItemIndex(this.currentSlot);

                    const leapID = Player.getInventory()?.getItems()?.find(a => a?.getName()?.removeFormatting() == "Infinileap")?.getID();
                    if (!leapID) return;
                    const leapSlot = parseInt(Player.getInventory().indexOf(leapID));
                    if (this.currentSlot == leapSlot) {
                        this.autoLeaping = false;
                        this.currentSlot = -1;
                    }
                }
            })
        }).setFilteredClass(S2FPacketSetSlot);

        register("packetReceived", (packet, event) => {
            const title = ChatLib.removeFormatting(packet.func_179840_c().func_150254_d());
            if (title != "Spirit Leap") return;

            this.clickedLeap = false;
            this.menuOpened = true;

            if (!this.target) return;
            cancel(event);
        }).setFilteredClass(S2DPacketOpenWindow);

        register("packetSent", (packet) => {
            const currSlot = packet.func_149614_c();
            const leapID = Player.getInventory()?.getItems()?.find(a => a?.getName()?.removeFormatting() == "Infinileap")?.getID();
            if (!leapID) return;
            const leapSlot = parseInt(Player.getInventory().indexOf(leapID));
            if (currSlot != leapSlot) {
                this.autoLeaping = false;
                this.currentSlot = -1;
            }
        }).setFilteredClass(C09PacketHeldItemChange)
        
        register("guiClosed", () => {
            this.menuOpened = false;
        })

        register("chat", () => {
            this._reset();
        }).setChatCriteria(/^This ability is on cooldown for (\d+)s\.$/);

        register("chat", () => {
            this._reset();
        }).setCriteria(/^You have teleported to .+!$/)
    }
    
    leap(name) {
        if (this.autoLeaping) return;
        this.setTarget(name);
        this._openLeap();
    }

    autoLeap(name) {
        this.currentSlot = Player.getHeldItemIndex();
        this.autoLeaping = true;
        this.setTarget(name);
        this._openLeap();
    }
    
    setTarget(name) {
        this.target = name;
    }

    _reset() {
        this.menuOpened = false;
        this.target = null;
        this.clickedLeap = false;
    }

    _openLeap() {
        if (this.menuOpened) return;
        if (this.clickedLeap) return;

        const leap = Player.getInventory()?.getItems()?.find(a => a?.getName()?.removeFormatting() == "Infinileap")
        if (!leap) return;
        const leapSlot = parseInt(Player.getInventory().indexOf(leap));
        if (leapSlot > 7 || leapSlot < 0) return;

        if (leapSlot != Player.getHeldItemIndex()) {
            Player.setHeldItemIndex(leapSlot);
        }

        this.clickedLeap = true;
        rightClick();
    }
}