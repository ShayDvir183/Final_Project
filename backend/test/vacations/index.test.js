const { expect } = require("chai");

const axios = require("axios");
const { signToken } = require("../../dist/auth/helpers/token.js");
const { createTestVacation } = require("../helpers");
const vacationsUrl = "http://localhost:3500/vacations"

const token = signToken({
    first_nameuser: "shay",
    last_name: "dvir",
    email_address: "shay@gmail.com",
    id: 1,
    role: "admin",
});
let vacation = {}

describe("/Post Vacations", () => {
  before(function(){
    vacation = createTestVacation()
  })
  it("create vacation", async () => {
    const result = await axios.post(`${vacationsUrl}`,vacation, {
      headers: {
        authorization: token,
      }
    });
    vacation = {...vacation,id:result.data.vacationId}

    expect(result.status).to.be.equal(200);
    expect(result.data.message).to.be.equal('Vacation Created');
  });
it("edit vacation", async () => {
  const result2 = await axios.post(`${vacationsUrl}/edit`,vacation,{    
    headers: {
      authorization: token,
    }
});
expect(result2.status).to.be.equal(200);
expect(result2.data.message).to.be.equal('Vacation Edited');
})
it("follow",async ()=>{
    const r = await axios.post(`${vacationsUrl}/follow`,vacation,{
      headers:{
          authorization:token
      }
    })
    expect(r.data.message).to.be.equal("Vacation Followed")
    expect(r.status).to.be.equal(200)
    it("unfollow",async ()=>{
   
        const r = await axios.post(`${vacationsUrl}/follow`,vacation,{
          headers:{
              authorization:token
          }
        })
        expect(r.data.message).to.be.equal("Vacation Followed")
        expect(r.status).to.be.equal(200)
  })
})
it("delete vacation", async () => {
  const result = await axios.delete(`${vacationsUrl}/${vacation.id}`, {
    headers: {
      authorization: token,
    }
  });
expect(result.status).to.be.equal(200);
expect(result.data.message).to.be.equal('Vacation Deleted');
});
  it("Fetch All vacations", async () => {
    try {
      const result = await axios.get(vacationsUrl, {
        headers: {
          authorization: token,
        },
      });
      expect(result.message).to.be.equal("All Vacations");
      expect(result.status).to.be.equal(200);
    } catch (ex) {
    }
  });
  it("Fetch All vacations - Unauthorized", async () => {
    try {
      const result = await axios.get(vacationsUrl, {
        headers: {
          authorization: token + "WrongToken",
        },
      });
    } catch (ex) {
      expect(ex.response.data.message).to.be.equal("Unauthorized");
      expect(ex.response.status).to.be.equal(401);
    }
  });
 
});

