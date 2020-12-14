const { Connection, Request, TYPES } = require("tedious");

// Create connection to database
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

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        queryDatabase();
    }
});

function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
        `SELECT TOP (1000) [id]
      ,[name]
      ,[surname]
      ,[DNI]
    FROM [dbo].[Employees]`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    request.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    // request.on('requestCompleted', function () {
    //     newUser();
    // });


    // function newUser() {

    //     request = new Request("UPDATE Statistic SET BestTime=@best, AverageTime=@average;", function(err) {
    //      if (err) {
    //         context.log(err);}
    //     });
    //     request.addParameter('best', TYPES.Int, _currentData.Best);
    //     request.addParameter('average', TYPES.Int, _currentData.Average);
    //     request.on('row', function(columns) {
    //         columns.forEach(function(column) {
    //           if (column.value === null) {
    //             context.log('NULL');
    //           } else {
    //             context.log("Statistic Updated.");
    //           }
    //         });
    //     });

    //     connection.execSql(request);
    // }


    connection.execSql(request);
}