
var Controller = require('../../controllers/application/index.controller')


module.exports = (router) => {

    router
    .route('/')
    .get(Controller.get)
    
    router
    .route('/groups')
    .get(Controller.groups)

    router
    .route('/groups/new')
    .get(Controller.command)

    router
    .route('/groups/:id')
    .get(Controller.command)

}