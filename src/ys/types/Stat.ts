interface BaseStat {
    key: 'hp' | 'atk' | 'def'
    multiplier: number
    addend: number
}

interface CharacterBasicStat {
    lv: number // Level
    hp: number // HP
    baseHP: number // Base HP
    atk: number // ATK
    baseATK: number // Base ATK
    def: number // DEF
    baseDEF: number // Base DEF
    em: number // Elemental mastery
    stamina: number // Stamina
    cr: number // Crit rate
    cd: number // Crit DMG
    hb: number // Healing bonus
    ihb: number // Incoming healing bonus
    er: number // Energy recharge
    cdr: number // CD reduction
    ss: number // Shield strength
    pyroDB: number // Pyro DMG bonus
    pyroRES: number // Pyro RES
    hydroDB: number // Hydro DMG bonus
    hydroRES: number // Hydro RES
    dendroDB: number // Dendro DMG bonus
    dendroRES: number // Dendro RES
    electroDB: number // Electro DMG bonus
    electroRES: number // Electro RES
    anemoDB: number // Anemo DMG bonus
    anemoRES: number // Anemo RES
    cryoDB: number // Cryo DMG bonus
    cryoRES: number // Cryo RES
    geoDB: number // Geo DMG bonus
    geoRES: number // Geo RES
    physicalDB: number // Physical DMG bonus
    physicalRES: number // Physical RES
}

interface CharacterStat extends CharacterBasicStat {
    db: number // DMG bonus
    res: number // RES
    rr: number // RES reduction
    dr: number // DEF reduction
    bb: number // Base bonus
    rb: number // Reaction bonus
}

interface EnemyStat {
    lv: number // Level
    pyroRES: number // Pyro RES
    hydroRES: number // Hydro RES
    dendroRES: number // Dendro RES
    electroRES: number // Electro RES
    anemoRES: number // Anemo RES
    cryoRES: number // Cryo RES
    geoRES: number // Geo RES
    physicalRES: number // Physical RES
    res: number // RES
}

interface ArtifactBonusStat {
    hp: number // HP bonus
    atk: number // ATK bonus
    def: number // DEF bonus
    em: number // Elemental mastery bonus
    stamina: number // Stamina bonus
    cr: number // Crit rate bonus
    cd: number // Crit DMG bonus
    hb: number // Healing bonus bonus
    ihb: number // Incoming healing bonus bonus
    er: number // Energy recharge bonus
    cdr: number // CD reduction bonus
    ss: number // Shield strength bonus
    pyroDB: number // Pyro DMG bonus bonus
    pyroRES: number // Pyro RES bonus
    hydroDB: number // Hydro DMG bonus bonus
    hydroRES: number // Hydro RES bonus
    dendroDB: number // Dendro DMG bonus bonus
    dendroRES: number // Dendro RES bonus
    electroDB: number // Electro DMG bonus bonus
    electroRES: number // Electro RES bonus
    anemoDB: number // Anemo DMG bonus bonus
    anemoRES: number // Anemo RES bonus
    cryoDB: number // Cryo DMG bonus bonus
    cryoRES: number // Cryo RES bonus
    geoDB: number // Geo DMG bonus bonus
    geoRES: number // Geo RES bonus
    physicalDB: number // Physical DMG bonus bonus
    physicalRES: number // Physical RES bonus
}

interface ArtifactStat {
    hp: number // HP
    hpp: number // HP%
    atk: number // ATK
    atkp: number // ATK%
    def: number // DEF
    defp: number // DEF%
    em: number // Elemental mastery
    cr: number // Crit rate
    cd: number // Crit DMG
    hb: number // Healing bonus
    er: number // Energy recharge
    pyroDB: number // Pyro DMG bonus
    hydroDB: number // Hydro DMG bonus
    dendroDB: number // Dendro DMG bonus
    electroDB: number // Electro DMG bonus
    anemoDB: number // Anemo DMG bonus
    cryoDB: number // Cryo DMG bonus
    geoDB: number // Geo DMG bonus
    physicalDB: number // Physical DMG bonus
}

export default interface Stat {
    base: BaseStat
    character: CharacterStat
    enemy: EnemyStat
}
export { BaseStat, CharacterBasicStat, CharacterStat, EnemyStat }
export { ArtifactBonusStat, ArtifactStat }