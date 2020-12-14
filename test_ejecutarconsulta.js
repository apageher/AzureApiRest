var Connection = require('tedious').Connection;  
const config = {
    authentication: {
        options: {
            userName: "adminpeich", // update me
            password: "AlvPag2019?4" // update me
        },
        type: "default"
    },
    server: "peichserver.database.windows.net", // update me
    options: {
        database: "MyDataBase", //update me
        encrypt: true
    }
};

var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    console.log("Connected");  
    executeStatement();  
});  

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
    request = new Request("SELECT TOP (1000) [id],[name],[surname],[DNI] FROM [dbo].[Employees]", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    connection.execSql(request);  
}  