define(["require", "exports", "../../Monsters/Goblin", "../../../../../includes/appearanceDefs", "../../../StatusAffects", "../../../Appearance", "../../../internals/WeightedDrop"], function (require, exports, Goblin_1, appearanceDefs_1, StatusAffects_1, Appearance_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 18.01.14.
     */
    class GoblinBroodmother extends Goblin_1.Goblin {
        defeated(hpVictory) {
            this.game.clearOutput();
            this.outputText("The goblin broodmother is defeated!  You find a bottle of succubi milk on her.  That stuff is banned in Tel'Adre - and for good reason, but it might come in handy.  You pocket the foul fluid for now.");
            this.outputText("  You could use her for a quick, willing fuck to sate your lusts before continuing on.  Do you?");
            this.game.menu();
            this.game.addButton(0, "Fuck", this.game.urtaQuest.winFuckAGoblinBroodmotherAsUrta);
            this.game.addButton(4, "Leave", this.game.urtaQuest.nagaPleaseNagaStoleMyDick);
        }
        won(hpVictory, pcCameWorms) {
            this.game.urtaQuest.urtaLosesToGoblin();
        }
        constructor() {
            super(true);
            this.a = "the ";
            this.short = "goblin broodmother";
            this.imageName = "goblin";
            this.long = "Thanks to their corruption, it's almost impossible to discern a goblin's age by their appearance, but it's quite obvious that this one is no horny young slut looking for her first dozen or so studs.  Standing before you is an obvious veteran breeder, a proud motherwhore who doubtlessly has a sizable tribe of slutty daughters somewhere not too far away.  Maybe three and a half feet tall, she has vibrant yellow skin - a rare shade, for goblins - and a wild mane of flamboyant neon pink and neon blue striped hair that falls down her back, her long, pointed ears barely visible amongst it.  Her many pregnancies have rendered her absurdly voluptuous. I-cup tits wobble absurdly in the air before her, their jiggling expanse so big that it's a wonder she can reach out to her blatant, teat-like purple nipples. Broodmother hips flare out from her waist, making her sashay from side to side with every step. A gloriously round and luscious bubble-butt, big enough to be DD-cup tits if it were on somebody's chest, jiggles enticingly with every motion.  Lewd leather straps fight to contain her exaggerated boobs and ass, serving more to house clinking pouches and bottles than to provide any protection of her modesty.  Piercings stud her lips, nose, eyebrows, ears, nipples and clit, and her fiery red eyes smoulder as she seductively licks her lips at you.\n\nYour treacherous horse-cock aches to bury itself into this ripe, ready slut, but you have to be strong - you rather doubt she'll let you go with a single fuck, even if you are incapable of giving her the babies she craves...";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_DROOLING, appearanceDefs_1.VAGINA_LOOSENESS_NORMAL);
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, 40, 0, 0, 0);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("E"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 30, 0, 0, 0);
            this.tallness = 35 + GoblinBroodmother.rand(4);
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.skinTone = "dark green";
            this.hairColor = "purple";
            this.hairLength = 4;
            this.initStrTouSpeInte(50, 30, 35, 100);
            this.initLibSensCor(70, 20, 70);
            this.weaponName = "fists";
            this.weaponVerb = "tiny punch";
            this.weaponAttack = 20;
            this.armorName = "leather straps";
            this.bonusHP = 300;
            this.lust = 50;
            this.lustVuln = 0.5;
            this.temperment = GoblinBroodmother.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 10;
            this.gems = GoblinBroodmother.rand(5) + 5;
            this.drop = new WeightedDrop_1.WeightedDrop().
                add(this.consumables.GOB_ALE, 5).
                addMany(1, this.consumables.L_DRAFT, this.consumables.PINKDYE, this.consumables.BLUEDYE, this.consumables.ORANGDY, this.consumables.PURPDYE);
            this.special1 = this.goblinDrugAttack;
            this.special2 = this.goblinTeaseAttack;
            this.checkMonster();
        }
    }
    exports.GoblinBroodmother = GoblinBroodmother;
});
//# sourceMappingURL=GoblinBroodmother.js.map