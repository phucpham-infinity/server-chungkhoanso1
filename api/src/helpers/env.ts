import * as dotenv from 'dotenv'
dotenv.config()

export const ENV = (name:string)=> process.env?.[name] as string