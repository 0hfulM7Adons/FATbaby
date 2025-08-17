import config from "./config"

import "./features/AutoLeap"
import "./features/FastLeap"
import "./features/LeapConfirmation"

register("command", () => {
    return config.openGUI()
}).setName("fatbaby").setAliases(["fb", "fastleap"])