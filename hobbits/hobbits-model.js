const db = require("../data/config")
const hobbits_db = db.bind(db, "hobbits");

function list() {
   return db("hobbits")
}

function findById(id) {
   return hobbits_db()
      .where({id})
      .first();
}

async function insert(hobbit) {
   const [id] = await hobbits_db().insert(hobbit);
   return findById(id);
}

async function update(id, changes) {
   const numFiles = await hobbits_db()
      .update(changes)
      .where({id});
   return findById(id);
}

function remove(id) {
   return hobbits_db()
      .del()
      .where({id});
}

module.exports = {
   list,
   findById,
   insert,
   update,
   remove,
}