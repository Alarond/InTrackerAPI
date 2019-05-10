const should = require('should');
const sinon = require('sinon');
const characterController = require('../controllers/characterController');
 
describe('Book Controller Tests:', () => {

    describe('post', () => {

        it('Should not Allow an empty Name on post', () => {
            const Character = function (character) { this.save = () => { } };

			//for test creat a dummer request with no Name
            const req = {
                body: {
                    Speed: '3',
					Dex: '12'
                }
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
				json: sinon.spy()
            };

            const controller = characterController(Character);
            controller.post(req, res);

            res.status.calledWith(400).should.equal(true, `Bad Status - ${res.status.args[0][0]}`);
            res.send.calledWith('Name is Required').should.equal(true);
        })

    });

});