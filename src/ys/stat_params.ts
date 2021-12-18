import Param from "./types/Param"

export default <{ [key: string]: Param }>{
    key: {
        type: 'enum',
        default: 'atk',
        from: ['hp', 'atk', 'def']
    },
    multiplier: {
        type: 'percentage',
        default: 0
    },
    addend: {
        type: 'basic',
        default: 0
    },
    lv: {
        type: 'basic',
        default: 0
    },
    hp: {
        type: 'basic',
        default: 0
    },
    baseHP: {
        type: 'basic',
        default: 0
    },
    atk: {
        type: 'basic',
        default: 0
    },
    baseATK: {
        type: 'basic',
        default: 0
    },
    def: {
        type: 'basic',
        default: 0
    },
    baseDEF: {
        type: 'basic',
        default: 0
    },
    em: {
        type: 'basic',
        default: 0
    },
    stamina: {
        type: 'basic',
        default: 0
    },
    cr: {
        type: 'percentage',
        default: 0
    },
    cd: {
        type: 'percentage',
        default: 0
    },
    hb: {
        type: 'percentage',
        default: 0
    },
    ihb: {
        type: 'percentage',
        default: 0
    },
    er: {
        type: 'percentage',
        default: 0
    },
    cdr: {
        type: 'percentage',
        default: 0
    },
    ss: {
        type: 'percentage',
        default: 0
    },
    pyroDB: {
        type: 'percentage',
        default: 0
    },
    pyroRES: {
        type: 'percentage',
        default: 0
    },
    hydroDB: {
        type: 'percentage',
        default: 0
    },
    hydroRES: {
        type: 'percentage',
        default: 0
    },
    dendroDB: {
        type: 'percentage',
        default: 0
    },
    dendroRES: {
        type: 'percentage',
        default: 0
    },
    electroDB: {
        type: 'percentage',
        default: 0
    },
    electroRES: {
        type: 'percentage',
        default: 0
    },
    anemoDB: {
        type: 'percentage',
        default: 0
    },
    anemoRES: {
        type: 'percentage',
        default: 0
    },
    cryoDB: {
        type: 'percentage',
        default: 0
    },
    cryoRES: {
        type: 'percentage',
        default: 0
    },
    geoDB: {
        type: 'percentage',
        default: 0
    },
    geoRES: {
        type: 'percentage',
        default: 0
    },
    physicalDB: {
        type: 'percentage',
        default: 0
    },
    physicalRES: {
        type: 'percentage',
        default: 0
    },
    db: {
        type: 'percentage',
        default: 0
    },
    res: {
        type: 'percentage',
        default: 0
    },
    rr: {
        type: 'percentage',
        default: 0
    },
    bb: {
        type: 'basic',
        default: 0
    },
    rb: {
        type: 'percentage',
        default: 0
    },
}