new BrowserDb({
  db:"findDb",
  collections:["users", "books"]
}, function (error, browserDb) {

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

  browserDb.books.find(function (error, books) {
    test("Find all books", function () {
      deepEqual(books.length, 3, "Three books");
    });
  });

  browserDb.books.findOne(function (error, book) {
    test("Find one book", function () {
      ok(book, "Book must exist");
      ok(book._id, "Book must have _id");
    });
  });

  browserDb.books.find({title:"The Good Parts"}, function (error, books) {
    test("Find by title", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0].title, "The Good Parts", "Book title must be 'The Good Parts'");
      deepEqual(books[0]._id, 1, "Book _id must be 1");
    });
  });

  browserDb.books.find({topic:"java"}, function (error, books) {
    test("Find by topic", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0].title, "Apache Maven 3 Cookbook", "Book title must be 'Apache Maven 3 Cookbook'");
      deepEqual(books[0]._id, 3, "Book _id must be 3");
    });
  });

  browserDb.books.find({cost:{$gt:100}}, function (error, books) {
    test("Find by cost greater than", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 3, "Book _id must be 3");
    });
  });

  browserDb.books.find({cost:{$gte:100}}, function (error, books) {
    test("Find by cost greater than or equal to", function () {
      deepEqual(books.length, 2, "Two books");
      deepEqual(books[0]._id, 2, "book _id must be 2");
      deepEqual(books[1]._id, 3, "book _id must be 3");
    });
  });

  browserDb.books.find({cost:{$lt:100}}, function (error, books) {
    test("Find by cost less than", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 1, "Book _id must be 1");
    });
  });

  browserDb.books.find({cost:{$lte:100}}, function (error, books) {
    test("Find by cost less than or equal to", function () {
      deepEqual(books.length, 2, "Two books");
      deepEqual(books[0]._id, 1, "book _id must be 1");
      deepEqual(books[1]._id, 2, "book _id must be 2");
    });
  });

  browserDb.books.find({cost:{$ne:100}}, function (error, books) {
    test("Find by cost not equal to", function () {
      deepEqual(books.length, 2, "Two books");
      deepEqual(books[0]._id, 1, "book _id must be 1");
      deepEqual(books[1]._id, 3, "book _id must be 3");
    });
  });

  browserDb.books.find({cost:{$nin:[50, 75]}}, function (error, books) {
    test("Find by cost not in", function () {
      deepEqual(books.length, 2, "Two books");
      deepEqual(books[0]._id, 2, "book _id must be 2");
      deepEqual(books[1]._id, 3, "book _id must be 3");
    });
  });

  browserDb.books.find({cost:{$mod:[12, 2]}}, function (error, books) {
    test("Find by cost mod 12 is 2", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 1, "book _id must be 1");
    });
  });

  browserDb.books.find({topic:{$size:2}}, function (error, books) {
    test("Find with at least two topics", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 3, "book _id must be 3");
    });
  });

  browserDb.books.find({author:{$exists:true}}, function (error, books) {
    test("Find which have authors", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 3, "book _id must be 3");
    });
  });

  browserDb.books.find({author:{$typeof:"string"}}, function (error, books) {
    test("Find where authors are typeof string", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 3, "book _id must be 3");
    });
  });

  browserDb.books.find({topic:{$nottypeof:"object"}}, function (error, books) {
    test("Find where topic is not an array", function () {
      deepEqual(books.length, 1, "One book");
      deepEqual(books[0]._id, 2, "book _id must be 2");
    });
  });

  setTimeout(browserDb.delete, 500);

});