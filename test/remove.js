new BrowserDb({
  db:"removeDb",
  collections:["books"]
}, function (error, browserDb) {

  browserDb.books.save({
    __id:1,
    topic:["javascript"],
    title:"The Good Parts",
    cost:50
  });

  browserDb.books.save({
    __id:2,
    topic:"android",
    title:"Android in action",
    cost:100
  });

  browserDb.books.save({
    __id:3,
    topic:["android", "java"],
    title:"Apache Maven 3 Cookbook",
    author:"Srirangan",
    cost:150
  });

  browserDb.books.remove(function () {
    browserDb.books.find(function (error, books) {
      test("Find all books", function () {
        deepEqual(books.length, 0, "Zero books");
      });
    });
  });

});