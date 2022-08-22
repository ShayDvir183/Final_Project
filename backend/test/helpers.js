
const mysql2 = require("mysql2/promise");
const moment = require("moment")
require("dotenv").config();
let connection
function getConnection() {
  return connection;
}
async function setDb(){
   connection = await mysql2.createConnection({
    host,
    port,
    user,
    password: dbpassword,
    database,
  });
}

const { 
  MYSQL_DB_HOST: host,
  MYSQL_DB_PORT: port,
  MYSQL_DB_USER: user,
  MYSQL_DB_PASS: dbpassword,
  MYSQL_DB_SCHEMA: database,
} = process.env;

setDb()
async function insertFakeUser({
    password, email, user_name, first_name, last_name
  }) {
    const result = await connection.execute(
      `INSERT INTO vacations_app.users (password, email, user_name, first_name, last_name) VALUES (?,?,?,?,?)`,
      [password, email, user_name, first_name, last_name]
    );
    return result[0];
  }

  async function insertFakePassword({password, email, user_name, first_name, last_name}) {
    const result = await connection.execute(
      `INSERT INTO vacations_app.users (password, email, user_name, first_name, last_name ) VALUES (?,?,?,?,?);`,
      [password,email, user_name, first_name, last_name]
    );
    
    return result[0];
  }
  function createTestVacation(){
    const num = Math.ceil(Math.random() * 99999).toString()
    const vacation = {
      destination: "test"+num,
      description: "test"+num,
      image: "test"+num,
      from_date: moment(new Date(2022,01,03)).format("YYYY-MM-DD"),
      to_date: moment(new Date(2022,01,13)).format("YYYY-MM-DD"),
      price: 12000,
      ammount_of_followers: 0,
    }
    return vacation
    
  }
  function getUser() {
    const generatedNumber = Math.ceil(Math.random() * 9999);
    return {
      password: `password_${generatedNumber}`,
      email: `user${generatedNumber}@gmail.com`,
      user_name: `user${generatedNumber}`,
      first_name: `shhhay`,
      last_name: `avivi`,
    };
  }
module.exports = {  insertFakeUser,createTestVacation, insertFakePassword,getUser,getConnection };
