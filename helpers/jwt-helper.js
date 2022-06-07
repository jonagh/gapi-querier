// https://www.codegrepper.com/code-examples/javascript/how+to+decode+jwt+token+in+javascript+without+using+a+library

let b64DecodeUnicode = str =>
    decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''))

export default {
    parseJwt: (token) =>
        JSON.parse(
            b64DecodeUnicode(
                token.split('.')[1].replace('-', '+').replace('_', '/')
            )
        )
}
