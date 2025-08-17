import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty,
    @NumberProperty,
} from '../Vigilance/index';

@Vigilant("FATbaby", "§bFATbaby",  {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Targets', 'Auto'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {

    @SwitchProperty({
        name: "Fast Leap",
        description: "Main toggle",
        category: "General",
        subcategory: "Fast Leap"
    })
    fastLeap = false;

    @SwitchProperty({
        name: "Leap Confirmation",
        description: "Requires you to right click twice within 1 second to open leap menu in clear",
        category: "General",
        subcategory: "Leap Confirmation"
    })
    leapConfirmation = false;

    @SwitchProperty({
        name: "Br Leap",
        category: "General",
        subcategory: "Leap Types"
    })
    brLeap = false;

    @SwitchProperty({
        name: "Maxor Leap",
        category: "General",
        subcategory: "Leap Types"
    })
    p1Leap = false;

    @SwitchProperty({
        name: "Storm Leap",
        category: "General",
        subcategory: "Leap Types"
    })
    p2Leap = false;

    @SwitchProperty({
        name: "P3 Leap",
        category: "General",
        subcategory: "Leap Types"
    })
    p3Leap = false;

    @SwitchProperty({
        name: "Necron Leap",
        category: "General",
        subcategory: "Leap Types"
    })
    p4Leap = false;

    @SwitchProperty({
        name: "P5 Leap",
        category: "General",
        subcategory: "Leap Types"
    })
    p5Leap = false;



    @TextProperty({
        name: "Maxor Leap",
        category: "Targets",
        subcategory: "P1",
        placeholder: "bers"
    })
    p1Target = "bers";

    @TextProperty({
        name: "Pillar Leap",
        description: "Leap target when you're in the middle of p2",
        category: "Targets",
        subcategory: "P2",
        placeholder: "tank"
    })
    pillarTarget = "tank";

    @TextProperty({
        name: "Yellow Leap",
        description: "Leap target when you're on yellow pad",
        category: "Targets",
        subcategory: "P2",
        placeholder: "arch"
    })
    ypadTarget = "arch";

    @TextProperty({
        name: "Purple Pad Leap",
        description: "Leap target when you're on purple pad",
        category: "Targets",
        subcategory: "P2",
        placeholder: "arch"
    })
    ppadTarget = "arch";

    @TextProperty({
        name: "Purple Pillar Leap",
        description: "Leap target when you're on purple pillar",
        category: "Targets",
        subcategory: "P2",
        placeholder: "heal"
    })
    ppillarTarget = "heal";

    @TextProperty({
        name: "Predev Leap",
        description: "Leap target back to P2 after predev",
        category: "Targets",
        subcategory: "P2",
        placeholder: "arch"
    })
    pdTarget = "arch";

    @TextProperty({
        name: "P3 Leap (healer)",
        description: "Leap target down to P3 after pad",
        category: "Targets",
        subcategory: "P2",
        placeholder: "bers"
    })
    gpadTarget = "bers";

    @TextProperty({
        name: "P3 Leap",
        description: "Leap target down to SS in P3",
        category: "Targets",
        subcategory: "P3",
        placeholder: "heal"
    })
    p2Target = "heal";

    @TextProperty({
        name: "S1 Leap",
        category: "Targets",
        subcategory: "P3",
        placeholder: "mage"
    })
    s1Target = "mage";

    @TextProperty({
        name: "S2 Leap",
        category: "Targets",
        subcategory: "P3",
        placeholder: "heal"
    })
    s2Target = "heal";

    @TextProperty({
        name: "S3 Leap",
        category: "Targets",
        subcategory: "P3",
        placeholder: "mage"
    })
    s3Target = "mage";

    @TextProperty({
        name: "S4 Leap",
        category: "Targets",
        subcategory: "P3",
        placeholder: "mage"
    })
    s4Target = "mage";

    @TextProperty({
        name: "Instamid Leap",
        category: "Targets",
        subcategory: "P4",
        placeholder: "mage"
    })
    dropTarget = "heal";

    @TextProperty({
        name: "P5 Leap",
        description: "Leap target down to P5",
        category: "Targets",
        subcategory: "P4",
        placeholder: "heal"
    })
    midTarget = "heal";

    @TextProperty({
        name: "Relic Leap",
        category: "Targets",
        subcategory: "P5",
        placeholder: "heal"
    })
    p5Target = "heal";



    @SwitchProperty({
        name: "Br Auto Leap",
        category: "Auto",
        subcategory: "Auto Leap"
    })
    brAuto = false;

    @SwitchProperty({
        name: "Maxor Auto Leap",
        category: "Auto",
        subcategory: "Auto Leap"
    })
    p1Auto = false;

    @SwitchProperty({
        name: "Storm Auto Leap",
        description: "Auto leap for both GY and PY",
        category: "Auto",
        subcategory: "Auto Leap"
    })
    p2Auto = false;

    @SwitchProperty({
        name: "P3 Auto Leap",
        category: "Auto",
        subcategory: "Auto Leap"
    })
    p3Auto = false;

    @SwitchProperty({
        name: "Necron Auto Leap",
        category: "Auto",
        subcategory: "Auto Leap"
    })
    p4Auto = false;

    @SwitchProperty({
        name: "P5 Auto Leap",
        category: "Auto",
        subcategory: "Auto Leap"
    })
    p5Auto = false;

    @SliderProperty({
        name: "P5 Auto Leap Delay",
        description: "Time to wait after picking up relic to leap (since different relics will have different timings",
        category: "Auto",
        subcategory: "Auto Leap",
        min: 0,
        max: 500
    })
    p5AutoDelay = 0;



    constructor() {
        this.initialize(this)

        const generalDesc = "Cyan's fast leap with more customizability"
        const targetsDesc = "You can either put class or IGN to leap to (don't know why you would put ign though)"
        const autoDesc = ""

        this.setCategoryDescription("General", generalDesc)
        this.setCategoryDescription("Targets", targetsDesc)
        this.setCategoryDescription("Auto", autoDesc)
    }

}

export default new Settings()