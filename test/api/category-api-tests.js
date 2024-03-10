import { EventEmitter } from "events";
import { assert } from "chai";
import { beachfinderService } from "./beachfinder-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, Category, testCategories } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {
  let user = null;

  setup(async () => {
    await beachfinderService.deleteAllCategories();
    await beachfinderService.deleteAllUsers();
    user = await beachfinderService.createUser(maggie);
    maggie.userid = user._id;
  });

  teardown(async () => {});

  test("create category", async () => {
    const returnedCategory = await beachfinderService.createCategory();
    assert.isNotNull(returnedCategory);
    assertSubset(Category, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await beachfinderService.createCategory(Category);
    const response = await beachfinderService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await beachfinderService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      testCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await beachfinderService.createCategory(testCategories[i]);
    }
    let returnedLists = await beachfinderService.getAllCategories();
    assert.equal(returnedLists.length, testCategories.length);
    await beachfinderService.deleteAllCategories();
    returnedLists = await beachfinderService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await beachfinderService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});