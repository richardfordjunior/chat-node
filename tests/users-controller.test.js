const server = require('../bin/www').server
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('API', function () {
  describe('#Users', function () {
    it('create user', async function () {
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

    it('get user by id', function (done) {
      const user = {
        id: '1234',
        name: 'testuser',
        email: 'test@email.com',
        room: 'room-1'
      }
      chai.request(server)
        .get(`/users/${user.id}`)
        .end((err, res) => {
          res.statusCode.should.equal(200)
          res.body.should.be.a('object')
          res.body.should.have.property('data')
          done()
        })
    })

    it('get user by room', function (done) {
      const user = {
        id: '1234',
        name: 'testuser',
        email: 'test@email.com',
        room: 'room-1'
      }
      chai.request(server)
        .get('/users')
        .query({ room: user.room })
        .end((err, res) => {
          res.statusCode.should.equal(200)
          res.body.should.be.a('object')
          res.body.should.have.property('data')
          done()
        })
    })

    it('returns an error when querystring parameter value is missing', function (done) {
      chai.request(server)
        .get('/users')
        .query({ ro: user.room })
        .end((err, res) => {
          res.statusCode.should.equal(500)
          done()
        })
    })

    it('returns an error when parameters are missing', async function () {
      const res = await chai.request(server)
        .post('/user')
        .set('content-type', 'application/json')
        .send(user)
      res.statusCode.should.equal(500)
      res.body.error.should.equal('email and name are required')
    })


    it('returns users in assigned rooms', function (done) {
      const users = [{
        id: '1234',
        name: 'testuser1',
        email: 'test@email.com',
        room: 'room-1'
      },
      {
        id: '12345',
        name: 'testuser2',
        email: 'test@email.com',
        room: 'room-2'
      }]
      chai.request(server)
        .post('/user')
        .set('content-type', 'application/json')
        .send(users[0])
        .then((res) => {
          res.statusCode.should.equal(201)
          chai.request(server)
            .post('/user')
            .set('content-type', 'application/json')
            .send(users[1])
            .then((res) => {
              res.statusCode.should.equal(201)
              chai.request(server)
                .get('/users')
                .query({ room: users[0].room })
                .end((err, res) => {
                  res.body.data.length.should.equal(0)
                  chai.request(server)
                    .get('/users')
                    .query({ room: users[1].room })
                    .end((err, res) => {
                      res.body.data.length.should.equal(3)
                    })
                })
            })
          done()
        })
    })
  })
})
