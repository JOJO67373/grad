import { MainAffixes, MinorAffix } from "./types/Artifact";
import data from "./data/artifact";
import choice from "./utils/choice";
import { ArtifactStat } from "./types/Stat";

function enhance(m: MinorAffix) {
    let r = choice(4) * 0.1 + 0.7
    m.value += r * data.minor.vals[m.key]
}

/**
 * Randomly generate minor affixes according to main affix
 * @param mainKey Main affix key
 * @returns Minor affixes of this full leveled random artifact
 */
export function randFullMinors(mainKey: string): MinorAffix[] {
    let ms = []
    let draw = choice(data.minor.keys, 5, data.minor.distr).filter(x => x !== mainKey).slice(0, 4)
    for (let key of draw) {
        let m = {
            key,
            value: 0
        } as MinorAffix
        enhance(m)
        ms.push(m)
    }
    // here I suppose there's 20% of chance to get a initial artifact with 3 minors
    let N = Math.random() < 0.2 ? 5 : 4
    for (let i = 0; i < N; ++i) {
        let j = choice(4)
        enhance(ms[j])
    }
    return ms
}

export function emptyArtifactStat(): ArtifactStat {
    return {
        hp: 0,
        hpp: 0,
        atk: 0,
        atkp: 0,
        def: 0,
        defp: 0,
        em: 0,
        er: 0,
        cr: 0,
        cd: 0,
        hb: 0,
        pyroDB: 0,
        hydroDB: 0,
        dendroDB: 0,
        electroDB: 0,
        anemoDB: 0,
        cryoDB: 0,
        geoDB: 0,
        physicalDB: 0
    }
}

/**
 * Get artifact stat
 * @param mains Main affixes
 * @param ms Minor affixes
 * @returns Artifact stat
 */
export function getArtifactStat(mains: MainAffixes, ms: MinorAffix[]): ArtifactStat {
    let s = emptyArtifactStat()
    for (let type in mains) {
        let key = mains[type as keyof MainAffixes] as keyof ArtifactStat
        s[key] += data.main[type][key].v
    }
    for (let m of ms) {
        s[m.key] += m.value
    }
    return s
}