new BrowserDb({
  db:"findDb",
  collections:["users", "books"]
}, function (error, browserDb) {

  module("Find");

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
    browserDb.books.find(function (error, books) {
      deepEqual(books.length, 3, "Three books");
      start();
    });
  });

  asyncTest("Find one book", 2, function () {
    browserDb.books.findOne(function (error, book) {
      ok(book, "Book must exist");
      ok(book._id, "Book must have _id");
      start();
    });
  });

  asyncTest("Find by title", 3, function () {
    browserDb.books.find({title:"The Good Parts"}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0].title, "The Good Parts", "Book title must be 'The Good Parts'");
      deepEqual(books[0]._id, 1, "Book _id must be 1");
      start();
    });
  });

  asyncTest("Find by topic", 3, function () {
    browserDb.books.find({topic:"java"}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0].title, "Apache Maven 3 Cookbook", "Book title must be 'Apache Maven 3 Cookbook'");
      deepEqual(books[0]._id, 3, "Book _id must be 3");
      start();
    });
  });

  asyncTest("Find by cost greater than", 2, function () {
    browserDb.books.find({cost:{$gt:100}}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 3, "Book _id must be 3");
      start();
    });
  });

  asyncTest("Find by cost greater than or equal to", 3, function () {
    browserDb.books.find({cost:{$gte:100}}, function (error, books) {
      deepEqual(books.length, 2, "Two books");
      deepEqual(books[0]._id, 2, "book _id must be 2");
      deepEqual(books[1]._id, 3, "book _id must be 3");
      start();
    });
  });

  asyncTest("Find by cost less than", 2, function () {
    browserDb.books.find({cost:{$lt:100}}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 1, "Book _id must be 1");
      start();
    });
  });

  asyncTest("Find by cost less than or equal to", 3, function () {
    browserDb.books.find({cost:{$lte:100}}, function (error, books) {
      deepEqual(books.length, 2, "Two books");
      deepEqual(books[0]._id, 1, "book _id must be 1");
      deepEqual(books[1]._id, 2, "book _id must be 2");
      start();
    });
  });

  asyncTest("Find by cost not equal to", 3, function () {
    browserDb.books.find({cost:{$ne:100}}, function (error, books) {
      deepEqual(books.length, 2, "Two books");
      deepEqual(books[0]._id, 1, "book _id must be 1");
      deepEqual(books[1]._id, 3, "book _id must be 3");
      start();
    });
  });

  asyncTest("Find by cost not in", 3, function () {
    browserDb.books.find({cost:{$nin:[50, 75]}}, function (error, books) {
      deepEqual(books.length, 2, "Two books");
      deepEqual(books[0]._id, 2, "book _id must be 2");
      deepEqual(books[1]._id, 3, "book _id must be 3");
      start();
    });
  });

  asyncTest("Find by cost mod 12 is 2", 2, function () {
    browserDb.books.find({cost:{$mod:[12, 2]}}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 1, "book _id must be 1");
      start();
    });
  });

  asyncTest("Find with at least two topics", 2, function () {
    browserDb.books.find({topic:{$size:2}}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 3, "book _id must be 3");
      start();
    });
  });

  asyncTest("Find which have authors", 2, function () {
    browserDb.books.find({author:{$exists:true}}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 3, "book _id must be 3");
      start();
    });
  });

  asyncTest("Find where authors are typeof string", 2, function () {
    browserDb.books.find({author:{$typeof:"string"}}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 3, "book _id must be 3");
      start();
    });
  });

  asyncTest("Find where topic is not an array", 2, function () {
    browserDb.books.find({topic:{$nottypeof:"object"}}, function (error, books) {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 2, "book _id must be 2");
      start();
    });
  });

  QUnit.done(function () {
    browserDb.delete();
  });

});