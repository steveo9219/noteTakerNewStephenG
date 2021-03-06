var notesData = require("../db/db.json");
const uuidv1 = require("uuid/v1");
const fs = require("fs");

module.exports = function (app) {
	//read new note
	app.get("/api/notes", (req, res) => {
		var list = [];
		for (var key in notesData) {
			list.push(notesData[key]);
		}

		console.log(list);
		res.json(list);
	});
	//create new note
	app.post("/api/notes", (req, res) => {
		//add id to note
		var tempId = uuidv1();
		newNote = {
			title: req.body.title,
			text: req.body.text,
			id: tempId,
		};

		notesData[tempId] = newNote;

		console.log(notesData);
		fs.writeFile("./db/db.json", JSON.stringify(notesData), (error) => {
			console.log("Couldn't update the file.");
		});

		res.json(newNote);
	});

	app.delete("/api/notes/:id", (req, res) => {
		const noteId = req.params.id;
		console.log(noteId);

		delete notesData[noteId];
		console.log(notesData);

		fs.writeFile("./db/db.json", JSON.stringify(notesData), (error) => {
			console.log("Couldn't update the file.");
		});

		var response = {
			status: 200,
			success: "Updated Successfully",
		};

		res.end(JSON.stringify(response));
	});
};
