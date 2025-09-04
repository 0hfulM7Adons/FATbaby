import { Prefix, S2DPacketOpenWindow, S2FPacketSetSlot, S2EPacketCloseWindow, C0DPacketCloseWindow, C09PacketHeldItemChange, sendWindowClick, rightClick } from "../utils/utils"

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

                    const leapSlot = this._findLeap();
                    if (this.currentSlot == leapSlot) {
                        this.autoLeaping = false;
                        this.currentSlot = -1;
                    }
                }
            })
        }).setFilteredClass(S2FPacketSetSlot);

        register("packetReceived", (packet, event) => {
            const title = ChatLib.removeFormatting(packet.func_179840_c().func_150254_d());
            if (title != "Spirit Leap") {
                this.menuOpened = false;
                return;
            }

            this.clickedLeap = false;
            this.menuOpened = true;

            if (!this.target) return;
            Client.getMinecraft().field_71462_r = null;
            cancel(event);
        }).setFilteredClass(S2DPacketOpenWindow);

        register("packetSent", (packet) => {
            const currSlot = packet.func_149614_c();
            const leapSlot = this._findLeap();
            if (currSlot != leapSlot) {
                this.autoLeaping = false;
                this.currentSlot = -1;
            }
        }).setFilteredClass(C09PacketHeldItemChange)
        
        register("guiClosed", () => {
            this.menuOpened = false;
        })

        register("packetSent", () => {
            if (this.menuOpened) this.menuOpened = false
        }).setFilteredClass(C0DPacketCloseWindow)
                
        register("packetReceived", () => {
            if (this.menuOpened) this.menuOpened = false
        }).setFilteredClass(S2EPacketCloseWindow)

        register("chat", () => {
            this._reset();
        }).setChatCriteria(/^This ability is on cooldown for (\d+)s\.$/);

        register("chat", () => {
            this._reset();
        }).setCriteria(/^You have teleported to .+!$/)

        register("chat", () => {
            this._reset();
        }).setCriteria(/^You can only use this item inside dungeons!$/)
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

    _findLeap() {
        for (let i = 0; i < 8; ++i) {
            if (Player.getInventory()?.getStackInSlot(i)?.getName()?.removeFormatting() == "Infinileap") return i;
        }
        return -1;
    }

    _openLeap() {
        if (this.menuOpened) return;
        if (this.clickedLeap) return;

        const leapSlot = this._findLeap();
        if (leapSlot < 0) return;

        if (leapSlot != Player.getHeldItemIndex()) {
            Player.setHeldItemIndex(leapSlot);
        }

        this.clickedLeap = true;
        rightClick();
    }
}