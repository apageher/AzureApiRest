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
    executeStatement1();  
});  

var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  

function executeStatement1() {  
    request = new Request("INSERT [dbo].[Employees] ([name],[surname],[DNI]) VALUES (@Name, @Surname, @DNI);", function(err) {  
     if (err) {  
        console.log(err);}  
    });  
    request.addParameter('Name', TYPES.NVarChar, 'José Luis');  
    request.addParameter('Surname', TYPES.NVarChar , 'Franco Arza');  
    request.addParameter('DNI', TYPES.NVarChar , '78526545T');   
    request.on('row', function(columns) {
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            console.log("Product id of inserted item is " + column.value);  
          }  
        });  
    }); 

    connection.execSql(request);  
}  