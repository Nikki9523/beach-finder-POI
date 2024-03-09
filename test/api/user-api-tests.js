import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { beachfinderService } from "./beachfinder-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

suite("User API tests", () => {
  setup(async () => {
    await beachfinderService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await beachfinderService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await beachfinderService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await beachfinderService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await beachfinderService.deleteAllUsers();
    returnedUsers = await beachfinderService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser = await beachfinderService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });
});