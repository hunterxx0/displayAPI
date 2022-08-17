const username = encodeURIComponent("gym_usr");
const password = encodeURIComponent("gym_pwd");

const mongo = new MongoClient(`mongodb+srv://${username}:${password}@p0.ljhxj.mongodb.net/?retryWrites=true&w=majority`)

/*
const db = mongo.db("gym_db");
const users = db.collection("users");
const cursor = users.find();
cursor.forEach(doc => console.log(doc));

*/