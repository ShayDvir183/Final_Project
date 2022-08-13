const { expect } = require("chai");
const {signToken} =require("../../dist/auth/helpers/token") 
const axios = require("axios");
const loginUrl = "http://localhost:3500/auth/login";
const { insertFakeUser, insertFakePassword, getConnection,getUser } = require("../helpers");
const md5 = require("md5")

let token1 = ""
describe("/POST Login", () => {
  before(function(){
  token1 =  signToken({
      first_name: "userText",
      last_name: "userText",
      email_address: "userText@gmail.com",
    });
  })
  after(async function(){
    await getConnection().query("Delete from vacations_app.users where first_name = 'shhhay' and last_name = 'avivi'")
    })
  it("User is not Exist", async () => {
    try {
      const response = await axios.post(`${loginUrl}`, {
        userName: "UserThatNotExist",
        password: "password",
      }, {
        headers: {
          authorization: token1,
        },
      });
      expect(response.status).to.be.equal(404);
    } catch (ex) {
      expect(ex.response.status).to.be.equal(404);
    }
  });
  it("User Unauthorized", async () => {
    const generatedUser = getUser();
    const { insertId } = await insertFakeUser(generatedUser);
    const { affectedRows } = await insertFakePassword(generatedUser);
    try {
      const response = await axios.post(`${loginUrl}`, {
        user_name: generatedUser.user_name,
        password: generatedUser.password+"wrong",
      });
      expect(response.status).to.be.equal(404);
    } catch (ex) {
      expect(ex.response.status).to.be.equal(401);
    }
  });
  it("Login Success", async () => {
    const generatedUser = getUser();
    const { insertId } = await insertFakeUser(generatedUser);
    const { affectedRows } = await insertFakePassword(generatedUser);
    const response = await axios.post(`${loginUrl}`, {
      user_name: generatedUser.user_name,
      password: generatedUser.password,
    });
    const { token, message } = response.data;
    expect(response.status).to.be.equal(200);
    // Login Success fail because i added md5 on the entry points Sorry For Keep It That Way :-)
    expect(message).to.be.equal("Login Success");
    const isString = typeof token === "string";
    expect(token).is.not.null;
    expect(isString).to.be.true;
  });
});


