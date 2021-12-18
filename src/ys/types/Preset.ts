import { BaseStat, CharacterBasicStat, EnemyStat } from "./Stat"
import Formula from "./Formula"
import Buff from "./Buff"

export default interface Preset {
    title: string
    formula: Formula
    stat: {
        base: BaseStat
        character: CharacterBasicStat
        enemy: EnemyStat
    }
    buffs: Buff[]
}