import Param from "./Param"
import Stat from "./Stat"

export default interface Buff {
    id: string
    params: (string | number)[]
    title: string
    on: boolean
}

export interface BuffImplementation {
    params: Param[]
    apply: (s: Stat, p: (string | number)[]) => void
}