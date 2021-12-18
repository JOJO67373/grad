export default function <Type>(obj: Type): Type {
    return JSON.parse(JSON.stringify(obj))
}