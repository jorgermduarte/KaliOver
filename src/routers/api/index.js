let Controller = require('./../../controllers/api/index.controller')
let Validators = require('./../../validators/index')

module.exports = (router) => {

    router
    .route('/helloworld')
    .get(Controller.get)

    router
    .route('/savecmd')
    .post(Controller.savecmd)

}