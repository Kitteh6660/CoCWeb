define(["require", "exports", "../../../Monster", "../../../../../includes/appearanceDefs", "../../../Appearance", "../../../GlobalFlags/kFLAGS", "../../../StatusAffects", "../../../../console"], function (require, exports, Monster_1, appearanceDefs_1, Appearance_1, kFLAGS_1, StatusAffects_1, console_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Izumi extends Monster_1.Monster {
        constructor() {
            super();
            // Set trace outout for this classes' content.
            this.combatDebug = true;
            this.a = "";
            this.short = "Izumi";
            this.imageName = "izumi";
            this.long = "You're fighting the immense Oni, Izumi.  Standing around 9 feet tall and wielding little more than her fists, she is the picture of strength and power.  She is clad in a scandalous blue and white Kimono, the garment drawing your eyes to her humongous breasts, and her perfectly sculpted thighs.  A curious horn juts from her head, the texture of it almost lost amongst the rock lining the inside of the cave.\n\nA distinctly cocky grin is painted across her face, her undivided attention focused upon you.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLICK, appearanceDefs_1.VAGINA_LOOSENESS_NORMAL);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("FF")); // The doc mentions her breasts would be around D/DD on a "normal human" so err, winging this shit
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.tallness = 9 * 12 + 0;
            this.hipRating = appearanceDefs_1.HIP_RATING_AVERAGE;
            this.buttRating = appearanceDefs_1.BUTT_RATING_TIGHT;
            this.skinTone = "creamy-white";
            this.hairColor = "golden";
            this.hairLength = 25;
            this.initStrTouSpeInte(90, 90, 90, 80);
            this.initLibSensCor(30, 25, 15);
            this.weaponName = "fist";
            this.weaponVerb = "punch";
            this.armorName = "silken kimono";
            this.bonusHP = 660;
            this.lust = 10;
            this.lustVuln = 0.33;
            this.temperment = Izumi.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 22;
            this.gems = 25 + Izumi.rand(25);
            this.additionalXP = 75;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
        // Override won/lost calls
        defeated(hpVictory) {
            this.cleanup();
            this.game.highMountains.izumiScenes.touchThatFluffyHorn();
        }
        // Monster won, not player, gg for descriptive method names
        won(hpVictory, pcCameWorms) {
            this.flags[kFLAGS_1.kFLAGS.IZUMI_TIMES_LOST_FIGHT]++;
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Titsmother) >= 0) {
                this.cleanup();
                this.game.highMountains.izumiScenes.deathBySnuSnuIMeanGiantOniTits();
                return;
            }
            else {
                this.cleanup();
                this.game.highMountains.izumiScenes.fuckedUpByAFuckhugeOni();
                return;
            }
        }
        // Override combat AI
        performCombatAction() {
            // Handle chokeslam mechanics
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Chokeslam) >= 0) {
                if (this.combatDebug)
                    console_1.trace("ChokeSlam Rounds to Damage: " + this.player.statusAffectv1(StatusAffects_1.StatusAffects.Chokeslam));
                this.player.addStatusValue(StatusAffects_1.StatusAffects.Chokeslam, 1, -1);
                if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.Chokeslam) <= 0) {
                    this.chokeSlamDamage();
                    this.cleanupChokeslam();
                }
                this.combatRoundOver();
                return;
            }
            // Handle groundpound
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Groundpound) >= 0) {
                this.player.addStatusValue(StatusAffects_1.StatusAffects.Groundpound, 1, -1);
                if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.Groundpound) <= 0) {
                    this.cleanupGroundpound();
                }
            }
            // Handle titsmother
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Titsmother) >= 0) {
                this.combatRoundOver();
                return;
            }
            // Titsmother toggle; gonna need to play with this, it should only be used once per fight
            if (this.HPRatio() <= 0.25) {
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.UsedTitsmother) <= -1) {
                    console_1.trace("Could use titsmother...");
                }
            }
            if ((this.HPRatio() <= 0.25) && (this.findStatusAffect(StatusAffects_1.StatusAffects.UsedTitsmother) <= -1)) {
                if (this.combatDebug)
                    console_1.trace("Using Titsmother!");
                this.titSmother();
                this.createStatusAffect(StatusAffects_1.StatusAffects.UsedTitsmother, 0, 0, 0, 0);
                return;
            }
            else {
                var actions = [this.straightJab, this.straightJab, this.straightJab, this.roundhouseKick, this.roundhouseKick, this.roundhouseKick, this.chokeSlam];
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Groundpound) <= -1) {
                    actions.push(this.groundPound);
                    actions.push(this.groundPound);
                }
                actions[Izumi.rand(actions.length)]();
            }
        }
        // Remove any lingering effects from the player once combat is over
        cleanup() {
            if (this.combatDebug)
                console_1.trace("Cleaning up lingering effects...");
            this.cleanupChokeslam();
            this.cleanupGroundpound();
            this.cleanupTitsmother();
        }
        // Quick punch at the player
        // Light damage
        straightJab() {
            this.outputText("Quick as a flash, Izumi lashes out with her free hand, aiming for your head.");
            var damage = Math.floor((this.str + 175) - Izumi.rand(this.player.tou) - this.player.armorDef);
            if (this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect()) {
                this.outputText("  You deftly dodge under the lightning-quick punch.");
            }
            else if (damage <= 0) {
                this.outputText("  You lash out and manage to deflect the blow before it can connect.");
            }
            else {
                this.outputText("  Her fist connects with your chin with a mighty crack, sending you sailing across the cave.  Izumi smirks at you as you");
                if (this.player.isNaga())
                    this.outputText(" raise back up onto your [legs]");
                else
                    this.outputText(" stand");
                this.outputText(" and dust yourself off.");
                damage = this.player.takeDamage(damage);
                this.outputText(" (" + damage + ")");
            }
            this.combatRoundOver();
        }
        // Roundhouse Kick
        // Milkd lust increase
        roundhouseKick() {
            this.outputText("Izumi leaps backwards onto one foot, spinning around and unleashing a thundering roundhouse kick.  Luckily, you manage to duck just in time, avoiding what surely would have been a monstrously powerful blow.  Unfortunately, as Izumi’s leg scythes through the air over your head, you find your gaze naturally following the line of her thigh muscles until you’re staring directly up the fluttering folds of Izumi’s increasingly impractical kimono.\n\n");
            if (this.player.cor >= 50 || this.player.lib >= 50 || this.player.sens >= 50) {
                this.outputText("You fall backwards and stagger away, already feeling a flush of warmth colouring your cheeks, trying to drag your mind back to the fight and away from... other things.");
                this.game.dynStats("lus", 10 + this.player.lib / 10);
            }
            else {
                this.outputText("You furrow a brow at the Oni's ineffectual attack, not entirely sure if she was intending to hurt you or turn you on.  Her thighs did look rather tantalizing though...");
                this.game.dynStats("lus", 5 + this.player.lib / 20);
            }
            this.combatRoundOver();
        }
        // Bind player for 3 turns. If the player doesn't break out in time, they take huge damage.
        // On escape, Izumi takes some damage
        chokeSlam() {
            if (this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect()) {
                this.outputText("Izumi surges towards you, closing the distance between you within the blink of an eye. You narrowly avoid her crushing grip, twisting away from her grasp at the last moment.  The enormous Oni lets loose a deep, satisfied laugh.");
            }
            else {
                this.outputText("Izumi surges towards you, smashing aside your guard and seizing you by the throat in the blink of an eye.  Lifting you above her head, you can only struggle to breathe as the enormous Oni grins at you like some sort of prize.");
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Chokeslam, 3, 0, 0, 0);
                if (this.combatDebug)
                    console_1.trace("Applied Chokeslam effect");
            }
            this.combatRoundOver();
        }
        // Struggle against izumi's chokeslam
        chokeSlamStruggle() {
            this.clearOutput();
            var brokeFree = false;
            if (Izumi.rand(this.player.str) > this.str / 2) {
                brokeFree = true;
            }
            if (brokeFree) {
                if (this.combatDebug)
                    console_1.trace("Escaped from Chokeslam grapple");
                this.chokeSlamEscape();
                this.combatRoundOver();
            }
            else {
                this.outputText("Izumi's grip around your throat continues to strangle the breath from your lungs as she holds you aloft.  Your fingers tighten in turn around the Oni's wrist, fighting against her");
                if (this.player.str < 90)
                    this.outputText(" immense");
                else
                    this.outputText(" impressive");
                this.outputText(" strength, in an attempt to free yourself from her crushing embrace, without success.");
                this.player.takeDamage(75 + Izumi.rand(15));
                this.doAI();
            }
        }
        // OH HEY ITS A THING
        chokeSlamWait() {
            this.clearOutput();
            this.outputText("Your feet dangle uselessly in the air as Izumi holds you aloft.  Why bother resisting?  She's just so <i>strong</i>, her fingers wrapped so completely around your neck...");
            this.player.takeDamage(75 + Izumi.rand(15));
            if (this.flags[kFLAGS_1.kFLAGS.PC_FETISH] >= 2) {
                this.outputText(" and to be honest, the grip isn't an entirely unplesent experience, either.  If only Izumi would stop playing around and just <i>take you</i> already.");
                this.game.dynStats("lus", 5);
            }
            else {
                this.outputText(".");
            }
            this.doAI();
        }
        // Player fails to escape from the chokeslam, and after 3 rounds gets nailed to the fuckin floor
        chokeSlamDamage() {
            this.outputText("With a grunt of effort, Izumi hauls you through the air, her iron-like grip around your throat providing the perfect anchor to propel you towards the ground.  Before you have a chance to react, the Oni drives you into the unforgiving stone lining the floor of the cave.\n\n");
            this.outputText("The hit is extreme enough to leave you dazed for a moment, splayed out across the floor.  When you rouse yourself back to full consciousness a few seconds later, the cave is still echoing with the sound of the impact, a testament to the strength of the Oni - and your resilience.");
            var damage = Math.floor((this.str + 225) - Izumi.rand(this.player.tou) - this.player.armorDef);
            this.player.takeDamage(damage);
            this.outputText("(" + damage + ")");
            this.combatRoundOver();
        }
        // Player escapes from the chokeslam attack
        chokeSlamEscape() {
            if (this.combatDebug)
                console_1.trace("Escaping from Chokeslam!");
            this.outputText("Scrabbling desperately against her wrist, you narrow your eyes at the Oni woman’s superior expression,");
            if (this.player.isBiped())
                this.outputText(" raise a [leg] and kick her roundly");
            else if (this.player.isNaga())
                this.outputText(" raise your tail and slap her solidly");
            else
                this.outputText(" and slap her square");
            this.outputText(" in the face.  Izumi drops you, staggering back in surprise.  “Ow!”  She actually yelps, covering her face with her hands.\n\n");
            this.outputText("You drop to the ground and roll away, expecting some form of retribution.  Izumi glares at you from behind her hand for a moment, then snickers.  Slowly, she drops back into her fighting stance and gestures for your bout to continue.");
            this.cleanupChokeslam();
            this.HP -= 50 + Izumi.rand(this.player.str);
            this.combatRoundOver();
        }
        // Remove the effect post-combat
        cleanupChokeslam() {
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Chokeslam) >= 0) {
                console_1.trace("Removing chokeslam");
                this.player.removeStatusAffect(StatusAffects_1.StatusAffects.Chokeslam);
            }
        }
        // Groundslam, does damage and slows the player if they don't dodge the hit
        groundPound() {
            this.outputText("Izumi raises one mighty foot and slams it to the ground with a victorious yell.  The ground itself actually shakes below your feet, threatening to knock you off balance.\n\n");
            if (this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect()) // TODO: ensure this is correct
             {
                this.outputText("Leaping to the side, you manage to steady yourself against the wall, keeping your footing.");
            }
            else {
                this.outputText("The rumbling actually knocks you off your feet, sprawling on the ground and banging your head.  As the shaking subsides, you pull yourself upright, but you feel a little unsteady on your [feet] after the disorienting impact.");
                var spdReducedBy = Math.floor(this.player.spe * 0.25);
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Groundpound, 3, spdReducedBy, 0, 0);
                this.game.dynStats("spe-", spdReducedBy);
                if (this.combatDebug)
                    console_1.trace("Applying Groundslam slow");
            }
            this.combatRoundOver();
        }
        // Remove the effect post-combat, fixup stats
        cleanupGroundpound() {
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Groundpound) >= 0) {
                // Can't use dynStats to achieve this, as it can give back more speed than we originally took away due to perks
                this.player.spe += this.player.statusAffectv2(StatusAffects_1.StatusAffects.Groundpound);
                if (this.player.spe > 100)
                    this.player.spe = 100;
                this.player.removeStatusAffect(StatusAffects_1.StatusAffects.Groundpound);
                console_1.trace("Removing Groundpound slow effect");
            }
        }
        // Binding attack, mild lust increase per turn until the player breaks out. Not TOO hard to break out, though.
        // Attack will be used ONCE, when Izumi reaches ~25% hp.
        titSmother() {
            if (this.combatDebug)
                console_1.trace("Titsmother attack!");
            // Attack will ALWAYS hit, but be relatively easy to break out of
            this.outputText("With a sudden burst of speed, the Oni woman bullrushes you, slapping aside your hasty defence.  You brace yourself for a powerful impact, but rather than strike you she instead thrusts her arm straight past your head.  Bemused, you turn your head to follow her fist, just in time to see her crook her elbow and yank you back towards her - hard.  Pulled right off your [feet] by the sudden strike, you slam");
            if (this.player.hasMuzzle())
                this.outputText(" muzzle-");
            else
                this.outputText(" face-");
            this.outputText("first into Izumi - specifically, into her chest.  Shocked by suddenly having your face rammed into the pillowy soft expanse of Izumi’s bust, you rear back only to be slammed straight back into the mountainous expanse by Izumi’s arm.");
            this.player.createStatusAffect(StatusAffects_1.StatusAffects.Titsmother, 0, 0, 0, 0);
            this.game.dynStats("lus", (this.player.lib / 15) + 5 + Izumi.rand(5));
            this.combatRoundOver();
        }
        // Remove the effect post-combat
        cleanupTitsmother() {
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Titsmother) >= 0) {
                this.player.removeStatusAffect(StatusAffects_1.StatusAffects.Titsmother);
                if (this.combatDebug)
                    console_1.trace("Removing Titsmother");
            }
        }
        // Struggle handler for titsmother attack
        titSmotherStruggle() {
            if (this.combatDebug)
                console_1.trace("Titsmother Struggle");
            var brokeFree = false;
            if (Izumi.rand(this.player.str) > this.str / 4) {
                brokeFree = true;
            }
            if (brokeFree) {
                if (this.combatDebug)
                    console_1.trace("Broke free of Titsmother!");
                this.titSmotherEscape();
                this.combatRoundOver();
            }
            else {
                if (Izumi.rand(2) == 0) {
                    this.clearOutput();
                    this.outputText("“Hah!  Say goodnight, ‘cause I’m going to choke the fight right out of you!”  She cries exuberantly, forcibly mashing your face into her bosom.  It would appear that she is trying to throttle you, but only having one hand is making the task difficult.  You can breathe just fine, but having your face forced into the constantly jostling mass of tit-flesh before you is distracting to say the least.\n\n");
                    this.outputText("You scrabble desperately against Izumi’s grip, trying not to think about where you’re placing your hands, or how soft and pliant the flesh beneath you is, or any number of other upsetting little details - but to no avail.  Izumi’s grip is incredibly strong.  You hang there for a moment, trying to get your breath back for another attempt as Izumi jostles and presses against you from all sides.");
                }
                else {
                    this.clearOutput();
                    if (this.player.hasCock()) {
                        this.outputText("Assaulted by the sensation of being pressed against such warm flesh, you can already feel [eachCock] starting to stiffen against your will.  Your hardening erection");
                        if (this.player.totalCocks() > 1)
                            this.outputText("s");
                        this.outputText(" just makes things even more unbearable, as the harder");
                        if (this.player.totalCocks() > 1)
                            this.outputText(" they get");
                        else
                            this.outputText(" it gets");
                        this.outputText(", the more insistently your");
                        if (this.player.totalCocks() > 1)
                            this.outputText(" erections throb");
                        else
                            this.outputText(" erection throbs");
                        this.outputText(", pressed up against Izumi’s stomach muscles.  Her muscles ripple and undulate as she struggles to keep you in her grip, abs flexing, bumping, encircling your insistent erection");
                        if (this.player.totalCocks() > 1)
                            this.outputText("s");
                        this.outputText(", stimulating you even further.  You realize in a flash of panic that if you don’t get out of this soon, you may actually... ");
                    }
                    else {
                        this.outputText("Izumi’s bust encloses you on all sides, leaving you feeling like you’re trapped in some kind of breast sarcophagus.  The heat radiating from the soft flesh combines with the scent of whatever strange drug Izumi had been smoking, now hanging around her like some heady perfume.");
                    }
                }
                this.game.dynStats("lus", this.player.lib / 15 + 5 + Izumi.rand(5));
                this.doAI();
            }
        }
        // Player breaks free of tiSmother and applies damage to Izumi
        titSmotherEscape() {
            if (this.combatDebug)
                console_1.trace("Escaping TitSmother!");
            this.clearOutput();
            if (this.player.str < 90) {
                this.outputText("Straining with all your might, you still can’t quite manage to break Izumi’s grip, but you do manage to somehow slide upwards through the valley of her bust.  Izumi’s face looms into view, the enormous woman gritting her teeth as she attempts to crush the fight out of you.  In an act of desperation, you rear back and then knife forwards in a brutal headbutt.\n\n");
                this.outputText("“Ack!”  Your forehead connects with her chin in a collision that probably hurts you as much as her, judging by the searing pain that lances through your forehead as she drops you to the floor. Meanwhile, Izumi staggers back, rubbing at her chin.  “Ow.  That hurt, kid!”  She says reproachfully.  The two of you take a moment to shake the cobwebs from your heads before dropping back into your combat stances, a little more wary this time around.\n\n");
            }
            else {
                this.outputText("Locking your arms against Izumi’s shoulders, you heave with all your might against the musclebound Oni girl’s choke hold.  You can feel her arm straining to hold you, struggling to resist, giving ground....");
                if (this.player.isBiped()) {
                    this.outputText("  As soon as you can, you hike up your legs and place your feet firmly on Izumi’s stomach, adding your leg muscles to the effort.");
                }
                this.outputText("  Izumi grits her teeth and growls as she pulls with all her might, trying to force your limbs to give way, but to no avail - with a final thrust, Izumi lets out a yelp as you knock her arm aside and leap away.  Izumi rolls her arm around a little, massaging her shoulder as she regards you, thoughtfully.  Then she reaches up and fans at her face with one hand, grinning that suggestive grin.\n\n");
            }
            this.outputText("“Oh my,” she purrs, lasciviously. “Aren’t you the impressive one?  Keep surprising me like that and I might just forget about this handicap...”");
            this.cleanupTitsmother();
            this.HP -= (15 + Izumi.rand(this.player.str));
            this.combatRoundOver();
        }
        // Wait handler for titsmother attack
        titSmotherWait() {
            this.clearOutput();
            if (this.combatDebug)
                console_1.trace("Waiting during TitSmother");
            this.outputText("With your face crushed into the Oni's cleavage, you can't help but wonder; why bother resisting?  She's just so <i>strong</i>, and her breasts feel so lushious against your [face]...");
            this.game.dynStats("lus", this.player.lib / 10 + 5 + Izumi.rand(5));
            if (this.flags[kFLAGS_1.kFLAGS.PC_FETISH] >= 2) {
                this.outputText(" and to be honest, her grip isn't an entirely unplesent experience, either.  If only Izumi would stop playing around and just <i>take you</i> already.");
                this.game.dynStats("lus", 5);
            }
            else {
                this.outputText(".");
            }
            this.doAI();
        }
    }
    exports.Izumi = Izumi;
});
//# sourceMappingURL=Izumi.js.map