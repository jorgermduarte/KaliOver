module.exports = ({ req, res , view ,layout = "default", data = {} } ) => {
        res.render('pages/' + view ,{ layout : 'templates/' + layout,  data : data })
}