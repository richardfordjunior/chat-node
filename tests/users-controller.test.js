const server = require('../bin/www').server
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('API', function(){
  describe('#Users', function(){
    it('create user', function(done){
      const user = {
        id: '1234',
        name: 'testuser',
        email: 'test@email.com',
        romm: 'room-1'
      }
        chai.request(server)
        .post('/create')
        .send(user)
        .end((err, response) => {
          if(err) return done(err);
          console.log(response)
          done(); 
        })
    })
  })
})