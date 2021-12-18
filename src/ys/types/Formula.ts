import { EnumParam } from "./Param"
import Stat from "./Stat"

export default interface Formula {
    id: string
    params: string[]
}

export interface FormulaResult {
    value: number,
    steps: Array<{
        key: string,
        value: number
    }>
}

export interface FormulaImplementation {
    params: EnumParam[]
    calc: (s: Stat, p: string[]) => FormulaResult
}