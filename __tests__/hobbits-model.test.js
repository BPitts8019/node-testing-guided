const db = require("../data/config");
const hobbits_db = db.bind(db, "hobbits");
const hobbitsModel = require("../hobbits/hobbits-model");

beforeEach(async () => {
   await db.seed.run();
});

describe("Hobbits Model", () => {
   test("findById", async () => {
      const res = await hobbitsModel.findById(1);
      expect(res.name).toBe("sam");
   });

   test("insert", async () => {
      await hobbitsModel.insert({name: "bilbo"});
      const hobbits = await hobbits_db().select();
      expect(hobbits).toHaveLength(5);
   });

   //list
   test("list", async () => {
      const hobbits = await hobbitsModel.list();
      expect(hobbits).toHaveLength(4);
   });

   //update
   test("update", async () => {
      const name = "William";
      const revHobbit = await hobbitsModel.update(1, {name});
      expect(revHobbit.name).toBe(name);
   });
   
   //remove
   test("remove", async () => {
      await hobbitsModel.remove(1);
      const res = await hobbitsModel.list();
      expect(res).toHaveLength(3);
   });
});