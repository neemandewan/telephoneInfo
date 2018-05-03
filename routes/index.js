var httpHelper = require('../util/httpHelper');
const sql = require('mssql');
var Excel = require('exceljs');

const dbconfig = {
    user: 'sa',
    password: 'admin123',
    server: 'localhost\\SQLEXPRESS',
    database: 'tcdb'
}

exports.main = function(req, res, next) {

    res.render('main', { title: 'Express' });
   
};