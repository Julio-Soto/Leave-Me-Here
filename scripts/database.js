/* -----------------
just an example of a DB config file
database code components would go here.
----------------- */

var mysql = require('mysql');

module.exports = {
    queries: {
                //// Some queries go in here.
                 },

    getConnection: function () {
        return mysql.createConnection({
        host     : debugEnabled ? 'pwsvr1.somethingapp.com' : 'localhost',
        user     : 'Admin',
        password : 'myB!gS3cR3t04',
        database : 'Clients'
    })},

}
