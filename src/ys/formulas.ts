import { FormulaImplementation, FormulaResult } from "./types/Formula"
import Stat from "./types/Stat"
import { CharacterStat, EnemyStat } from "./types/Stat"

class SecondaryStat {
    stat: Stat
    constructor(s: Stat) {
        this.stat = s
    }
    get BASE(): number {
        let b = this.stat.character[this.stat.base.key]
        return this.stat.base.multiplier * b + this.stat.base.addend + this.stat.character.bb
    }
    get DEF(): number {
        return (this.stat.character.lv + 100) / (this.stat.character.lv + 100 + (this.stat.enemy.lv + 100) * (1 - this.stat.character.dr))
    }
    DB(type: string): number {
        let typeDB = type + 'DB' as keyof CharacterStat
        return 1 + this.stat.character[typeDB] + this.stat.character.db
    }
    RES(type: string): number {
        let typeRES = type + 'RES' as keyof EnemyStat
        let r = this.stat.enemy[typeRES] - this.stat.character.rr
        if (r < 0) {
            return 1 - r / 2
        } else if (r < 0.75) {
            return 1 - r
        } else {
            return 1 / (1 + 4 * r)
        }
    }
    CRIT(type: string): number {
        switch (type) {
            case 'min': return 1
            case 'avg': return 1 + Math.min(this.stat.character.cr, 1) * this.stat.character.cd
            case 'max': return 1 + this.stat.character.cd
            default: return NaN
        }
    }
    VM(type: string): number {
        switch (type) {
            case 'pyro_vapo':
            case 'cryo_melt': return 1.5
            case 'pyro_melt':
            case 'hydro_vapo': return 2
            default: return NaN
        }
    }
    get VMDB(): number {
        return 1 + 2.78 * this.stat.character.em / (this.stat.character.em + 1400) + this.stat.character.rb
    }
}

function getValue(result: FormulaResult) {
    result.value = 1
    for (let s of result.steps) {
        result.value *= s.value
    }
}

export default <{ [id: string]: FormulaImplementation }>{
    'sim_dmg': {
        params: [
            {
                type: 'enum',
                default: 'pyro',
                from: ['pyro', 'hydro', 'dendro', 'electro', 'anemo', 'cryo', 'geo', 'physical']
            },
            {
                type: 'enum',
                default: 'avg',
                from: ['min', 'avg', 'max']
            }
        ],
        calc: (s, p) => {
            let ss = new SecondaryStat(s)
            let ret = {
                value: 1,
                steps: [
                    { key: 'BASE', value: ss.BASE },
                    { key: 'CRIT', value: ss.CRIT(p[1]) },
                    { key: 'DB', value: ss.DB(p[0]) },
                    { key: 'DEF', value: ss.DEF },
                    { key: 'RES', value: ss.RES(p[0]) }
                ]
            }
            getValue(ret)
            return ret
        }
    },
    'amp_dmg': {
        params: [
            {
                type: 'enum',
                default: 'pyro_melt',
                from: ['pyro_melt', 'pyro_vapo', 'hydro_vapo', 'cryo_melt']
            },
            {
                type: 'enum',
                default: 'avg',
                from: ['min', 'avg', 'max']
            }
        ],
        calc: (s, p) => {
            let ss = new SecondaryStat(s)
            let type = (p[0] as string).split('_')[0]
            let ret = {
                value: 1,
                steps: [
                    { key: 'BASE', value: ss.BASE },
                    { key: 'CRIT', value: ss.CRIT(p[1]) },
                    { key: 'DB', value: ss.DB(type) },
                    { key: 'DEF', value: ss.DEF },
                    { key: 'RES', value: ss.RES(type) },
                    { key: 'VM', value: ss.VM(p[0]) },
                    { key: 'VMDB', value: ss.VMDB }
                ]
            }
            getValue(ret)
            return ret
        }
    },
    'trf_dmg': {
        params: [],
        calc: (s, p) => ({ value: 0, steps: [] })
    },
    'sheild': {
        params: [],
        calc: (s, p) => ({ value: 0, steps: [] })
    },
    'heal': {
        params: [],
        calc: (s, p) => ({ value: 0, steps: [] })
    },
    '': {
        params: [],
        calc: (s, p) => ({ value: 0, steps: [] })
    },
}