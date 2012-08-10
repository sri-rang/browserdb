new BrowserDb({
  db:"removeDb",
  collections:["books"]
}, function (error, browserDb) {

  module("Remove");

  browserDb.books.save({
    _id:1,
    topic:["javascript"],
    title:"The Good Parts",
    cost:50
  });

  browserDb.books.save({
    _id:2,
    topic:"android",
    title:"Android in action",
    cost:100
  });

  browserDb.books.save({
    _id:3,
    topic:["android", "java"],
    title:"Apache Maven 3 Cookbook",
    author:"Srirangan",
    cost:150
  });

  asyncTest("Find all books", 1, function () {
    browserDb.books.remove(function () {
      browserDb.books.find(function (error, books) {
        deepEqual(books.length, 0, "Zero books");
        start();
      });
    });
  });

  QUnit.done(function () {
    browserDb.delete();
  });

});