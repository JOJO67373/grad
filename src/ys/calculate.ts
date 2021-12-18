import Preset from "./types/Preset";
import Stat from "./types/Stat";
import { ArtifactBonusStat, ArtifactStat } from "./types/Stat";
import formulas from "./formulas";
import buffs from "./buffs";
import { FormulaResult } from "./types/Formula";

export default function (p: Preset, ab?: ArtifactBonusStat, a?: ArtifactStat): FormulaResult {
    let s: Stat = {
        base: p.stat.base,
        character: {
            ...p.stat.character,
            db: 0,
            res: 0,
            rr: 0,
            dr: 0,
            bb: 0,
            rb: 0
        },
        enemy: p.stat.enemy
    }
    if (ab && a) {
        s.character.hp += -ab.hp + a.hpp * s.character.baseHP + a.hp
        s.character.atk += -ab.atk + a.atkp * s.character.baseATK + a.atk
        s.character.def += -ab.def + a.defp * s.character.baseDEF + a.def
        s.character.em += -ab.em + a.em
        s.character.stamina += -ab.stamina
        s.character.cr += -ab.cr + a.cr
        s.character.cd += -ab.cd + a.cd
        s.character.hb += -ab.hb + a.hb
        s.character.ihb += -ab.ihb
        s.character.er += -ab.er + a.er
        s.character.cdr += -ab.cdr
        s.character.ss += -ab.ss
        s.character.pyroDB += -ab.pyroDB + a.pyroDB
        s.character.pyroRES += -ab.pyroRES
        s.character.hydroDB += -ab.hydroDB + a.hydroDB
        s.character.hydroRES += -ab.hydroRES
        s.character.dendroDB += -ab.dendroDB + a.dendroDB
        s.character.dendroRES += -ab.dendroRES
        s.character.electroDB += -ab.electroDB + a.electroDB
        s.character.electroRES += -ab.electroRES
        s.character.anemoDB += -ab.anemoDB + a.anemoDB
        s.character.anemoRES += -ab.anemoRES
        s.character.cryoDB += -ab.cryoDB + a.cryoDB
        s.character.cryoRES += -ab.cryoRES
        s.character.geoDB += -ab.geoDB + a.geoDB
        s.character.geoRES += -ab.geoRES
        s.character.physicalDB += -ab.physicalDB + a.physicalDB
        s.character.physicalRES += -ab.physicalRES
    }
    for (let b of p.buffs) {
        if (b.on) {
            buffs[b.id].apply(s, b.params)
        }
    }
    return formulas[p.formula.id].calc(s, p.formula.params)
}