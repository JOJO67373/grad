import { randFullMinors } from "./rand_artifact";
import data from "./data/artifact"
import choice from "./utils/choice";
import { MainAffixes, MinorAffix } from "./types/Artifact";
import { format } from "./utils/float";
import copy from "./utils/copy";

interface Base {
    baseHP: number
    baseATK: number
    baseDEF: number
}

interface Weights {
    hpp: number
    atkp: number
    defp: number
    cr: number
    cd: number
    em: number
    er: number
}

function score(ms: MinorAffix[], base: Base, weights: Weights): number {
    let s = 0
    for (let m of ms) {
        if (m.key == 'hp') {
            s += weights.hpp * m.value / base.baseHP / data.minor.vals.hpp
        } else if (m.key == 'atk') {
            s += weights.atkp * m.value / base.baseATK / data.minor.vals.atkp
        } else if (m.key == 'def') {
            s += weights.defp * m.value / base.baseDEF / data.minor.vals.defp
        } else {
            s += weights[m.key] * m.value / data.minor.vals[m.key]
        }
    }
    return s / 0.85
}

function simulateOne(base: Base, mains: MainAffixes, weights: Weights, N: number): number[] {
    let bag = { flower: 0, plume: 0, sands: 0, goblet: 0, circlet: 0 }
    let sum = 0
    let vs = [sum]
    for (let i = 0; i < N; ++i) {
        let type = choice(data.types) as keyof MainAffixes
        let mainKey = mains[type]
        let pr = data.main[type][mainKey].p
        if (Math.random() > pr) {
            vs.push(sum)
            continue
        }
        let ms = randFullMinors(mainKey)
        let s = score(ms, base, weights)
        if (s > bag[type]) {
            sum += s - bag[type]
            bag[type] = s
        }
        vs.push(sum)
    }
    return vs
}

function sq(n: number): number {
    return n * n
}

interface SimulationResult {
    [key: string]: any[]
}

export default function simulate(base: Base, mains: MainAffixes, weights: Weights, N: number, T: number): SimulationResult {
    let sims = []
    for (let i = 0; i < T; ++i) {
        let vs = simulateOne(base, mains, weights, N)
        sims.push(vs)
    }
    let clb = [], avg = [], cub = []
    for (let i = 0; i < N; ++i) {
        let s1 = 0, s2 = 0
        for (let j = 0; j < T; ++j) {
            s1 += sims[j][i]
            s2 += sq(sims[j][i])
        }
        let mu = s1 / T
        let d = Math.sqrt((s2 - sq(s1) / T) / (T - 1))
        clb.push(mu - d)
        avg.push(mu)
        cub.push(mu + d)
    }
    return { clb, avg, cub }
}

const NART_PER_RUN = 1.065

export function simulationChart(base: Base, mains: MainAffixes, weights: Weights, resin: number, T: number, v: number) {
    let N = Math.floor(resin / 20 * NART_PER_RUN)
    let { clb, avg, cub } = simulate(base, mains, weights, N, T)
    let labels = [], cur = [], first = null
    for (let i = 0; i < avg.length; ++i) {
        labels.push(((i * 20) / NART_PER_RUN).toFixed(0));
        cur.push(v);
        if (avg[i] >= v && first === null) {
            first = i
        }
    }
    let comment = '', level = ''
    if (first === null) {
        comment = '当前练度相当于 > ' + Math.ceil(resin / 180) + '天的自回体'
        level = '毕业'
    } else if (first + 1 >= avg.length) {
        comment = '当前练度 ≈ ' + Math.ceil(first / (9 * NART_PER_RUN)) + '天的自回体'
        level = '毕业'
    } else {
        let ndays = Math.ceil(first / (9 * NART_PER_RUN))
        comment = '当前练度 ≈ ' + ndays + '天的自回体'
        comment += '，距离毕业还差' + format(avg[avg.length - 1] - v, 1) + '词条'
        comment += '，短期提升率约为' + format((avg[first + 1] - avg[first]) / NART_PER_RUN, 3) + '词条/20体'
        level = ndays >= 18 ? '小毕业' : '主词条毕业也算毕业'
    }
    return {
        config: {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        data: clb,
                        borderWidth: 1,
                        fill: false,
                        borderColor: "transparent"
                    },
                    {
                        label: "成长期望",
                        data: avg,
                        borderWidth: 1,
                        borderColor: "#00768a",
                        fill: false,
                    },
                    {
                        label: "标准差",
                        data: cub,
                        borderWidth: 1,
                        fill: "-2",
                        backgroundColor: '#00800020',
                        borderColor: "transparent"
                    },
                    {
                        label: "当前词条数",
                        data: cur,
                        borderColor: "red",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            filter: function (label) {
                                return !!label.text
                            }
                        }
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "体力",
                        },
                    },
                },
                maintainAspectRatio: false,
            },
        },
        comment,
        level
    }
}