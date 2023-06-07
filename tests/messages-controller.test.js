const server = require('../bin/www').server
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('API', function(){
  describe('#Messages', function(){
    it('create message', async function(){
      const msg = {
        id: '1234',
        text: "I'm here in the chat room",
        name: 'testuser',
        email: 'test@email.com',
        room: 'room-1'
      }
        const res = await chai.request(server)
        .post('/chat')
        .set('content-type', 'application/json')
        .send(msg)
         res.statusCode.should.equal(201)
         res.body.should.be.a('object')
         res.body['data'].should.have.property('message')
    })

    it('get messages', function(done){
        const msg = {
            id: '1234',
            text: "I'm here in the chat room",
            name: 'testuser',
            email: 'test@email.com',
            room: 'room-1'
          }
        chai.request(server)
        .get(`/chat/room-1`)
        .end((err, res) => {
         res.statusCode.should.equal(200)
         res.body.should.be.a('object')
         res.body.should.have.property('data')
         done()
        })
    })

    it('returns a 404 when required parameters are missing', function(done){
        const msg = {
            id: '1234',
            text: "I'm here in the chat room",
            name: 'testuser',
            email: 'test@email.com',
            room: 'room-1'
          }
        chai.request(server)
        .get(`/chat/`)
        .end((err, res) => {
         res.statusCode.should.equal(404)
         done()
        })
    })

  })
})