class YSError extends Error {
    constructor(msg: string) {
        super()
        this.name = 'YSError'
        this.message = msg
    }
}

class YSAssertionError extends YSError {
    constructor(msg: string) {
        super(msg)
        this.name = 'YSAssertionError'
    }
}

class YSTypeError extends YSError {
    constructor(msg: string) {
        super(msg)
        this.name = 'YSTypeError'
    }
}

function assert(p: any, msg?: string) {
    if (!p) {
        throw new YSAssertionError(msg || '')
    }
}

export { YSError, YSAssertionError, YSTypeError }
export { assert }
