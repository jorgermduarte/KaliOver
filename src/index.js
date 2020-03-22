let MongoConnection = require('./framework/mongoose')
let ExpressManager = require('./framework/ExpressManager')

//connect to database
// MongoConnection.Connect()
ExpressManager.CreateRouter('application')  
ExpressManager.CreateRouter('api')
ExpressManager.Initialize()





