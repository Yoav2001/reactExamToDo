import pg from "pg";


const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'toDoApp',
    password: '123',
    port: 5432,
})  

// module.exports = () => { return pool; }

export default pool;
