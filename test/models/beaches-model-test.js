import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { assertSubset } from "../test-utils.js";
import { tramore, testBeaches } from "../fixtures.js";


  suite("Beach Model tests", () => {

  setup(async () => {
    db.init("json");
    await db.beachStore.deleteAll();
    for (let i = 0; i < testBeaches.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testBeaches[i] = await db.beachStore.addBeach("96e4f36f-3cd3-4945-983f-f66420e71731",testBeaches[i]);
    }
  });


  test("create a beach", async () => {
    const newBeach = await db.beachStore.addBeach("96e4f36f-3cd3-4945-983f-f66420e71731", tramore);
   // assert.equal(newBeach, tramore);
   assertSubset(tramore, newBeach);
  });

  test("delete all beachApi", async () => {
    let returnedBeaches = await db.beachStore.getAllBeaches();
    assert.equal(returnedBeaches.length, 3);
    await db.beachStore.deleteAll();
    returnedBeaches = await db.beachStore.getAllBeaches();
    assert.equal(returnedBeaches.length, 0);
  });

  test("get a beach - success", async () => {
    const beach = await db.beachStore.addBeach("96e4f36f-3cd3-4945-983f-f66420e71731", tramore);
    const returnedBeach = await db.beachStore.getBeachById(beach._id);
    assert.deepEqual(beach, returnedBeach);
  });


  test("delete One Beach - success", async () => {
    await db.beachStore.deleteBeachById(testBeaches[0]._id);
    const returnedBeaches = await db.beachStore.getAllBeaches();
    assert.equal(returnedBeaches.length, testBeaches.length - 1);
    const deletedBeach = await db.beachStore.getBeachById(testBeaches[0]._id);
    assert.isNull(deletedBeach);
  });
  

   test("get a beach - failures", async () => {
    const noBeachWithId = await db.beachStore.getBeachById("123");
    assert.isNull(noBeachWithId);
  });


  test("get a beach - bad params", async () => {
    let nullBeach;
    nullBeach = await db.beachStore.getBeachById("");
    assert.isNull(nullBeach);
    nullBeach = await db.beachStore.getBeachById();
    assert.isNull(nullBeach);
  });

  test("delete One Beach - fail", async () => {
    await db.beachStore.deleteBeachById("bad-id");
    const allBeaches = await db.beachStore.getAllBeaches();
    console.log(testBeaches, allBeaches);
    assert.equal(testBeaches.length, allBeaches.length);
  });
});