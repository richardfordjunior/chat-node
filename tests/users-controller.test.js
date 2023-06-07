const server = require('../bin/www').server
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('API', function(){
  describe('#Users', function(){
    it('create user', async function(){
      const user = {
        id: '1234',
        name: 'testuser',
        email: 'test@email.com',
        room: 'room-1'
      }
        const res = await chai.request(server)
        .post('/user')
        .set('content-type', 'application/json')
        .send(user)
         res.statusCode.should.equal(201)
         res.body.should.be.a('object')
         res.body['data'].should.have.property('id')
    })

    it('get user', function(done){
      const user = {
        id: '1234',
        name: 'testuser',
        email: 'test@email.com',
        room: 'room-1'
      }
        chai.request(server)
        .get(`/user/${user.id}`)
        .end((err, res) => {
         res.statusCode.should.equal(200)
         res.body.should.be.a('object')
         res.body.should.have.property('data')
         done()
        })
    })
    it('returns a 404 when required parameters are missing', function(done){
      const user = {
        id: '1234',
        name: 'testuser',
        email: 'test@email.com',
        room: 'room-1'
      }
      chai.request(server)
      .get(`/user/`)
      .end((err, res) => {
       res.statusCode.should.equal(404)
       done()
      })
  })
  })
})