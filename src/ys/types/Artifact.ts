export interface MinorAffix {
    key: 'hp' | 'hpp' | 'atk' | 'atkp' | 'def' | 'defp' | 'em' | 'er' | 'cr' | 'cd'
    value: number
}

export interface MainAffixes {
    flower?: string
    plume?: string
    sands?: string
    goblet?: string
    circlet?: string
}

interface BaseArtifact {
    rarity?: 1 | 2 | 3 | 4 | 5
    level?: number
    set?: string
    minors: MinorAffix[]
}

interface FlowerArtifact extends BaseArtifact {
    type: 'flower'
    main: {
        key: 'hp'
        value: number
    }
}

interface PlumeArtifact extends BaseArtifact {
    type: 'plume'
    main: {
        key: 'atk'
        value: number
    }
}

interface SandsArtifact extends BaseArtifact {
    type: 'sands'
    main: {
        key: 'hpp' | 'atkp' | 'defp' | 'em' | 'er'
        value: number
    }
}

interface GobletArtifact extends BaseArtifact {
    type: 'goblet'
    main: {
        key: 'hpp' | 'atkp' | 'defp' | 'pyroDB' | 'hydroDB' | 'electroDB' | 'anemoDB' | 'cryoDB' | 'geoDB' | 'physicalDB' | 'em'
        value: number
    }
}

interface CircletArtifact extends BaseArtifact {
    type: 'circlet'
    main: {
        key: 'hpp' | 'atkp' | 'defp' | 'cr' | 'cd' | 'hb' | 'em'
        value: number
    }
}

type Artifact = FlowerArtifact | PlumeArtifact | SandsArtifact | GobletArtifact | CircletArtifact
export default Artifact