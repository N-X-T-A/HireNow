import 'dotenv/config'
export const customProperty = (model) => {
    return {
        model: model,
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    }
}