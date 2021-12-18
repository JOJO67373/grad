import { BuffImplementation } from "./types/Buff";
import { CharacterStat } from "./types/Stat";

export default <{ [id: string]: BuffImplementation }>{
    'add': {
        params: [
            {
                type: 'enum',
                default: 'atk',
                from: ['hp', 'atk', 'def', 'em', 'bb']
            },
            {
                type: 'basic',
                default: 0,
            }
        ],
        apply: (s, p) => {
            let key = p[0] as keyof CharacterStat
            let val = p[1] as number
            s.character[key] += val
        }
    },
    'add_%': {
        params: [
            {
                type: 'enum',
                default: 'cr',
                from: ['cr', 'cd', 'hb', 'er', 'ss', 'pyroDB', 'hydroDB', 'dendroDB', 'electroDB', 'anemoDB', 'cryoDB', 'geoDB', 'physicalDB', 'db', 'rr', 'dr', 'rb']
            },
            {
                type: 'percentage',
                default: 0,
            }
        ],
        apply: (s, p) => {
            let key = p[0] as keyof CharacterStat
            let val = p[1] as number
            s.character[key] += val
        }
    },
    'add_base': {
        params: [
            {
                type: 'enum',
                default: 'atk',
                from: ['hp', 'atk', 'def']
            },
            {
                type: 'percentage',
                default: 0,
            }
        ],
        apply: (s, p) => {
            let key = p[0] as keyof CharacterStat
            let baseKEY = ('base' + (p[0] as string).toUpperCase()) as keyof CharacterStat
            let val = p[1] as number
            s.character[key] += val * s.character[baseKEY]
        }
    },
    'add_by': {
        params: [
            {
                type: 'enum',
                default: 'atk',
                from: ['hp', 'atk', 'def', 'em', 'bb']
            },
            {
                type: 'enum',
                default: 'baseATK',
                from: ['baseHP', 'baseATK', 'baseDEF', 'hp', 'atk', 'def', 'em']
            },
            {
                type: 'percentage',
                default: 0,
            },
        ],
        apply: (s, p) => {
            let key_1 = p[0] as keyof CharacterStat
            let key_2 = p[1] as keyof CharacterStat
            let val = p[2] as number
            s.character[key_1] += val * s.character[key_2]
        }
    },
    'add_by_%': {
        params: [
            {
                type: 'enum',
                default: 'db',
                from: ['cr', 'cd', 'hb', 'er', 'ss', 'pyroDB', 'hydroDB', 'dendroDB', 'electroDB', 'anemoDB', 'cryoDB', 'geoDB', 'physicalDB', 'db', 'rr', 'dr', 'rb']
            },
            {
                type: 'enum',
                default: 'er',
                from: ['cr', 'cd', 'hb', 'er', 'ss', 'pyroDB', 'hydroDB', 'dendroDB', 'electroDB', 'anemoDB', 'cryoDB', 'geoDB', 'physicalDB']
            },
            {
                type: 'percentage',
                default: 0,
            },
        ],
        apply: (s, p) => {
            let key_1 = p[0] as keyof CharacterStat
            let key_2 = p[1] as keyof CharacterStat
            let val = p[2] as number
            s.character[key_1] += val * s.character[key_2]
        }
    },
    'add_by_up': {
        params: [
            {
                type: 'enum',
                default: 'atk',
                from: ['hp', 'atk', 'def', 'em', 'bb']
            },
            {
                type: 'enum',
                default: 'baseATK',
                from: ['baseHP', 'baseATK', 'baseDEF', 'hp', 'atk', 'def', 'em']
            },
            {
                type: 'percentage',
                default: 0,
            },
            {
                type: 'basic',
                default: 0
            }
        ],
        apply: (s, p) => {
            let key_1 = p[0] as keyof CharacterStat
            let key_2 = p[1] as keyof CharacterStat
            let val_1 = p[2] as number
            let val_2 = p[3] as number
            s.character[key_1] += Math.min(val_1 * s.character[key_2], val_2)
        }
    },
    'add_by_up_%': {
        params: [
            {
                type: 'enum',
                default: 'db',
                from: ['cr', 'cd', 'hb', 'er', 'ss', 'pyroDB', 'hydroDB', 'dendroDB', 'electroDB', 'anemoDB', 'cryoDB', 'geoDB', 'physicalDB', 'db', 'rr', 'dr', 'rb']
            },
            {
                type: 'enum',
                default: 'er',
                from: ['cr', 'cd', 'hb', 'er', 'ss', 'pyroDB', 'hydroDB', 'dendroDB', 'electroDB', 'anemoDB', 'cryoDB', 'geoDB', 'physicalDB']
            },
            {
                type: 'percentage',
                default: 0,
            },
            {
                type: 'percentage',
                default: 0
            }
        ],
        apply: (s, p) => {
            let key_1 = p[0] as keyof CharacterStat
            let key_2 = p[1] as keyof CharacterStat
            let val_1 = p[2] as number
            let val_2 = p[3] as number
            s.character[key_1] += Math.min(val_1 * s.character[key_2], val_2)
        }
    },
    '': {
        params: [],
        apply: (s, p) => { }
    }
}