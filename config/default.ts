import 'dotenv/config'

const key = process.env.DB_KEY;
const user = process.env.DB_USER;


export default {
    port: 1337,
    dbUri: `mongodb+srv://${user}:${key}@izabela.41hbr.mongodb.net/?retryWrites=true&w=majority`,
    saltWorkFactor: 10,
}