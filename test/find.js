new BrowserDb({
  db:"findDb",
  collections:["users", "books"]
}, function (error, browserDb) {

  browserDb.books.save({
    __id: 1,
    topic:"javascript",
    title:"The Good Parts"
  });

  browserDb.books.save({
    __id: 2,
    topic:"android",
    title:"Android in action"
  });

  browserDb.books.save({
    __id: 3,
    topic:"java",
    title:"Apache Maven 3 Cookbook"
  });

  browserDb.books.find(function(error, books) {
    test("Three books", function() {
      deepEqual(books.length, 3, "Three books")
    });
  });

});