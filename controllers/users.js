let db = require("./db");


exports.findAllUsers = (req, res) => {
    console.log('POST /users');
    let myConnection = db.createConnection();
    let myRequest = db.createRequest("SELECT TOP (50) [id],[name],[surname],[DNI] FROM [dbo].[Employees]", myConnection);
    db.executeRequest(myRequest, connection);
}




exports.findByID = (req, res) => {
    console.log('GET /user/' + req.params.id);
    let myConnection = db.createConnection();
    let myRequest = db.createRequest("SELECT TOP (1) [id],[name],[surname],[DNI] FROM [dbo].[Employees] WHERE id = @id", myConnection); 
    request.addParameter('id', TYPES.Int, req.params.id);
    db.executeRequest(myRequest, myConnection);
}


exports.addUser = (req, res) => {
    console.log('POST');
    console.log(req.body);

    // var tvshow = new TVShow({
    //     title: req.body.title,
    //     year: req.body.year,
    //     country: req.body.country,
    //     poster: req.body.poster,
    //     seasons: req.body.seasons,
    //     genre: req.body.genre,
    //     summary: req.body.summary
    // });

    // tvshow.save(function (err, tvshow) {
    //     if (err) return res.status(500).send(err.message);
    //     res.status(200).jsonp(tvshow);
    // });
};

exports.updateUser = (req, res) => {
    // TVShow.findById(req.params.id, function (err, tvshow) {
    //     tvshow.title = req.body.petId;
    //     tvshow.year = req.body.year;
    //     tvshow.country = req.body.country;
    //     tvshow.poster = req.body.poster;
    //     tvshow.seasons = req.body.seasons;
    //     tvshow.genre = req.body.genre;
    //     tvshow.summary = req.body.summary;

    //     tvshow.save(function (err) {
    //         if (err) return res.status(500).send(err.message);
    //         res.status(200).jsonp(tvshow);
    //     });
    // });
};

exports.deleteUser = function (req, res) {
    // TVShow.findById(req.params.id, function(err, tvshow) {
    //     tvshow.remove(function(err) {
    //         if(err) return res.status(500).send(err.message);
    //   res.status(200).send();
    //     })
    // });
};