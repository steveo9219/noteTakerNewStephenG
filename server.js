var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8070;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () =>
	console.log(`Server listening on http://localhost:${PORT}`)
);
