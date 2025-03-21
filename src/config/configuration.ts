import * as dotenv from 'dotenv'
dotenv.config()

export default () => ({
    jwt_secret_key: process.env.jwt_secret_key,
    jwt_expires_time: process.env.jwt_expires_time,
    db_url: process.env.db_url,
    
})