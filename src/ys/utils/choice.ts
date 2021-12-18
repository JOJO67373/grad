
export function swap(arr: any[], i: number, j: number) {
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
}

function choice(m: number): number
function choice<Type>(arr: Type[]): Type
function choice<Type>(arr: Type[], n: number, p: number[]): Type[]
function choice<Type>(mOrArr: number | Type[], n?: number, p?: number[]): number | Type | Type[] {
    if (typeof mOrArr === 'number') {
        return Math.floor(Math.random() * mOrArr)
    } else if (n !== undefined && p !== undefined) {
        let a = [...mOrArr]
        let d = [...p]
        let sum = 0
        for (let w of d) {
            sum += w
        }
        for (let i = 0; i < n; ++i) {
            let r = Math.random() * sum
            let acc = 0
            for (let j = i; j < a.length; ++j) {
                acc += d[j]
                if (r <= acc) {
                    sum -= d[j]
                    swap(a, i, j)
                    swap(d, i, j)
                    break
                }
            }
        }
        return a.slice(0, n)
    } else {
        let i = Math.floor(Math.random() * mOrArr.length)
        return mOrArr[i]
    }
}

export default choice