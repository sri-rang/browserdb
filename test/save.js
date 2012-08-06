new BrowserDb({
  db:"saveDb",
  collections:["one", "two", "three"]
}, function (error, browserDb) {


  browserDb.one.save({
    name:"Sri"
  }, function (error, savedObject) {
    test("Save an object", function () {
      ok(savedObject, "savedObject must be created");
      deepEqual(savedObject.name, "Sri", "savedObject.name === 'Sri'");
      ok(savedObject.__id, "savedObject.__id must be auto generated");
    });
  });

  browserDb.two.save({
    __id:"wtf",
    name:"Sri"
  }, function (error, savedObject) {
    test("Save an object with manual __id", function () {
      deepEqual(savedObject.__id, "wtf", "savedObject.__id === 'wtf'");
    });
  });

  browserDb.two.save({
    __id:"wtf",
    name:"Srirangan"
  }, function (error, savedObject) {
    test("Update an object", function () {
      deepEqual(savedObject.name, "Srirangan", "savedObject.name === 'Srirangan'");
    });
  });


});