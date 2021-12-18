export interface ArtifactData {
    types: string[],
    minor: {
        keys: string[],
        distr: number[],
        vals: {
            [key: string]: number
        }
    },
    main: {
        [type: string]: {
            [key: string]: {
                p: number,
                v: number
            }
        }
    }
}

export default <ArtifactData>{
    types: ['flower', 'plume', 'sands', 'goblet', 'circlet'],
    minor: {
        keys: ['hp', 'atk', 'def', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd'],
        distr: [6, 6, 6, 4, 4, 4, 4, 4, 3, 3],
        vals: {
            'hp': 298.75,
            'atk': 19.45,
            'def': 23.15,
            'hpp': 0.0583,
            'atkp': 0.0583,
            'defp': 0.0729,
            'em': 23.31,
            'er': 0.0648,
            'cr': 0.0389,
            'cd': 0.0777
        }
    },
    main: {
        flower: { hp: { p: 1, v: 4780 } },
        plume: { atk: { p: 1, v: 311 } },
        sands: {
            hpp: { p: 8 / 30, v: 0.466 },
            atkp: { p: 8 / 30, v: 0.466 },
            defp: { p: 8 / 30, v: 0.583 },
            em: { p: 3 / 30, v: 186.5 },
            er: { p: 3 / 30, v: 0.518 }
        },
        goblet: {
            hpp: { p: 17 / 80, v: 0.466 },
            atkp: { p: 17 / 80, v: 0.466 },
            defp: { p: 16 / 80, v: 0.583 },
            pyroDB: { p: 4 / 80, v: 0.466 },
            hydroDB: { p: 4 / 80, v: 0.466 },
            electroDB: { p: 4 / 80, v: 0.466 },
            anemoDB: { p: 4 / 80, v: 0.466 },
            cryoDB: { p: 4 / 80, v: 0.466 },
            geoDB: { p: 4 / 80, v: 0.466 },
            physicalDB: { p: 4 / 80, v: 0.583 },
            em: { p: 2 / 80, v: 186.5 }
        },
        circlet: {
            hpp: { p: 11 / 50, v: 0.466 },
            atkp: { p: 11 / 50, v: 0.466 },
            defp: { p: 11 / 50, v: 0.583 },
            cr: { p: 5 / 50, v: 0.311 },
            cd: { p: 5 / 50, v: 0.622 },
            hb: { p: 5 / 50, v: 0.359 },
            em: { p: 2 / 50, v: 186.5 }
        }
    }
}