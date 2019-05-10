require('should');

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app.js');

const Character = mongoose.model('Character');
const agent = request.agent(app);

describe('Character CRUD Test', () => {

    it('should allow a character be posted and return _id', (done) => {
        const characterPost = { Name: 'Superguy', Speed: '3', Dex: '12' };
        agent.post('/api/character')
            .send(characterPost)
            .expect(200)
            .end((err, results) => {
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach((done) => {
        Character.deleteMany({}).exec();
        done();
    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    });

});
