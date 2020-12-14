
function createConnection() {

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

    let Connection = require('tedious').Connection;
    let connection = new Connection(config);

    return connection;
}

function createRequest(query, connection) {
    var Request = require('tedious').Request;
    var req =
        new Request(query, 
                function (err, rowCount) {
                        if (err) {
                            console.trace(err);
                            throw err;
                        }
                        connection && connection.close();
                        console.log('Connection closed');
                });
    return req;
}



function executeRequest (request, connection) { 
    connection.on('connect', function (err) {
        if (err) {
            console.trace(err);
            throw err;
        }
        connection.execSql(request);
    });
}



function executeRequest2(requestParam, connection) {

    let Request = require('tedious').Request;

    request = new Request(requestParam, function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
    });
    connection.execSql(request);
}


module.exports.createConnection = createConnection;
module.exports.executeRequest = executeRequest;
module.exports.executeRequest2 = executeRequest2;