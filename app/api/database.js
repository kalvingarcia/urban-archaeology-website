import postgres from 'postgres';

const Database = postgres({
    database: process.env.DBNAME,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    ssl: process.env.DBMODE
}); 
export default Database;