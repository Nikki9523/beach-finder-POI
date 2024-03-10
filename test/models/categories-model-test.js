import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { assertSubset } from "../test-utils.js";
import { Category, testCategories } from "../fixtures.js";


  suite("Category Model tests", () => {

  setup(async () => {
    db.init("json");
    await db.categoryStore.deleteAll();
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCategories[i] = await db.categoryStore.addCategory(testCategories[i]);
    }
  });


  test("create a category", async () => {
    const newCategory = await db.categoryStore.addCategory(Category);
   // assert.equal(newCategory, waterford);
   assertSubset(Category, newCategory);
   assert.isDefined(newCategory._id);
  });

  test("delete all categories", async () => {
    let returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 3);
    await db.categoryStore.deleteAll();
    returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

  test("get a category - success", async () => {
    const category = await db.categoryStore.addCategory(Category);
    const returnedCategory = await db.categoryStore.getCategoryById(category._id);
    assertSubset(Category, category);
});


  test("delete One Category - success", async () => {
    const id = testCategories[0]._id;
    console.log(await db.categoryStore.getAllCategories());
    await db.categoryStore.deleteCategoryById(id);
    const returnedCategories = await db.categoryStore.getAllCategories();
    console.log(returnedCategories);
    assert.equal(returnedCategories.length, testCategories.length - 1);
    const deletedCategory = await db.categoryStore.getCategoryById(id);
    assert.isNull(deletedCategory);
  });

  test("get a category - bad params", async () => {
    assert.isNull(await db.categoryStore.getCategoryById(""));
    assert.isNull(await db.categoryStore.getCategoryById());
  });

  test("delete One Category - fail", async () => {
    await db.categoryStore.deleteCategoryById("bad-id");
    const allCategories = await db.categoryStore.getAllCategories();
    assert.equal(testCategories.length, allCategories.length);
  });
});