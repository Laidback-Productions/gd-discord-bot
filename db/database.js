const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./db/database.json");
const db = low(adapter);

const init = async () => {
	db.defaults({
		scheduled_lessons: {
			hetfo: [],
			kedd: [],
			szerda: [],
			csütörtök: [],
			pentek: [],
		},
	}).write();
	console.log("Database initialized.");
};
init();

const handleGet = async (req) => {
	const query = db.get(req).value();
	return query;
};
const handleAdd = async (data, req) => {
	db.get(data).add({
		lesson: req.name,
	});
};
const handleDelete = async (data, req) => {
	db.get(data).set({
		lesson: req.name,
	}).value;
};
const handleUpdate = async (req) => {
	db.get(req).remove();
};

module.exports = {
	db,
	handleGet,
	handleAdd,
	handleUpdate,
	handleDelete,
};
