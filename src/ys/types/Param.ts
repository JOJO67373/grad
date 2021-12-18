export interface BasicParam {
    type: 'basic'
    default: number
}
export interface PercentageParam {
    type: 'percentage'
    default: number
}
export interface EnumParam {
    type: 'enum'
    default: string
    from: string[]
}

type Param = BasicParam | PercentageParam | EnumParam
export default Param