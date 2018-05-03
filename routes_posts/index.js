var httpHelper = require('../util/httpHelper');
const sql = require('mssql');
var Excel = require('exceljs');

const dbconfig = {
    user: 'sa',
    password: 'admin123',
    server: 'localhost\\SQLEXPRESS',
    database: 'tcdb'
}

var conn = new sql.ConnectionPool(dbconfig);
var reqQ = new sql.Request(conn);

exports.updateCallingRates = function(req, res) {
    var data = req.body;

    var conn1 = new sql.ConnectionPool(dbconfig);
	var reqQ1 = new sql.Request(conn1);	

    conn1.connect(function(err) {
        if(err) {
            console.log(err);
            return;
        }

        var workbook = new Excel.Workbook();

        try {
        	var date = data.link.split("\\");
	        date = date[date.length-1].split(".")[0].split("_")[1];
	        
	        var dateFinal = date.slice(0,4) + '/' + date.slice(4, 6) + '/' + date.slice(6);
	        console.log("date -->> "  + dateFinal);
        }catch(e) {
        	 res.status(404).send("ERROR");
        }
        

        workbook.xlsx.readFile(data.link)
        .then(function() {
            workbook.eachSheet(function(worksheet, sheetId) {

                var query1 = "select * from Service";

                reqQ1.query(query1, function(err, recordset) {
                    if(err) {
                        console.log(err);
                        return;
                    } else {

                        var response = recordset.recordset;
                        var serviceId = "";
                        for(var i =0; i<response.length; i++) {
                        	if(response[i].serviceName == worksheet.name) {
                        		serviceId = response[i].serviceId;
                        	}
                        }

                        var query2 = "exec updaterate '" + data.link + "', '" + worksheet.name +"', '" + dateFinal+"', '" + serviceId +"'";
                        console.log(query2);
                        reqQ1.query(query2, function(err, recordset) {
		                    if(err) {
		                        //console.log(err);
		                        return;
		                    } else {
		                        console.log("inserted");
		                    }  

		                })

                    }  

                })

            })
        });

      	res.status(200).send(data);  
    })
};

exports.monthlyTraffic = function(req, res) {
    var data = req.body;

    conn.connect(function(err) {
        if(err) {
            console.log(err);
            return;
        }
        
        var yearMonth = data.year + "-" + ("0" + data.month).slice(-2);
        var query1 = "exec monthlyTrafficSummary '" + yearMonth +"'";
        console.log(query1);
        reqQ.query(query1, function(err, recordset) {
            if(err) {
                console.log(err);
                return;
            } else {
            	conn.close();
                res.status(200).send(recordset.recordset);
            }  

        })

      	
    })
};

exports.monthlybill = function(req, res) {
    var data = req.body;

    conn.connect(function(err) {
        if(err) {
            console.log(err);
            return;
        }

        var yearMonth = data.year + "-" + ("0" + data.month).slice(-2);
        var query1 = "select custName, street, city, state, zipcode, country from Customers  where telephone = '" + data.tel +"'";
        reqQ.query(query1, function(err, recordset) {
            if(err) {
                console.log(err);
                return;
            } else {
            	var cust = recordset.recordset;
            	console.log(cust);
            	var query2 = "exec dbo.createBill '" + data.tel +"', '" + yearMonth + "'";
		        console.log(query2);
		        reqQ.query(query2, function(err, recordset) {
		            if(err) {
		                console.log(err);
		                return;
		            } else {
		            	conn.close();
		            	var userData = {
		            		customer: cust,
		            		amt: recordset.recordset
		            	}
		                res.status(200).send(userData);
		            }  

		        })
            }  

        })
      	
    })
};

exports.commission = function(req, res) {
    var data = req.body;

    conn.connect(function(err) {
        if(err) {
            console.log(err);
            return;
        }
        
        var yearMonth = data.year + "-" + ("0" + data.month).slice(-2);
        var query1 = "exec calculateCommission '" + yearMonth +"'";
        console.log(query1);
        reqQ.query(query1, function(err, recordset) {
            if(err) {
                console.log(err);
                return;
            } else {
            	conn.close();
                res.status(200).send(recordset.recordset);
            }  

        })

      	
    })
};

exports.ratesheet = function(req, res) {
    var data = req.body;

    conn.connect(function(err) {
        if(err) {
            console.log(err);
            return;
        }
        
        var yearMonth = data.year + "-" + ("0" + data.month).slice(-2);
        var query1 = "exec genetateRatesSheet '" + data.serviceId +"', '" + yearMonth + "'";
        console.log(query1);
        reqQ.query(query1, function(err, recordset) {
            if(err) {
                console.log(err);
                return;
            } else {
            	conn.close();
                res.status(200).send(recordset.recordset);
            }  

        })

      	
    })
};

exports.getServices = function(req, res) {
    var data = req.body;

    conn.connect(function(err) {
        if(err) {
            console.log(err);
            return;
        }
        
        var query1 = "select * from Service";
        console.log(query1);
        reqQ.query(query1, function(err, recordset) {
            if(err) {
                console.log(err);
                return;
            } else {
            	conn.close();
                res.status(200).send(recordset.recordset);
            }  

        })

      	
    })
};