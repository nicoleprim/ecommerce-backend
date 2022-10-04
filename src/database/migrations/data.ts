const csv = require('csvtojson')

export class ConvertFile {
    public static async convertFileCsvToJson(file: string) {
        try {
            return await csv().fromFile(file)
        } catch {

        }
    }
}