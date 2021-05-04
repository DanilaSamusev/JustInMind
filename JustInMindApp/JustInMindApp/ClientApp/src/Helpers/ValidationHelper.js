export default class ValidationHelper {

    static isStringValid(string) {
        return !string || /^\s*$/.test(string)
    }
}