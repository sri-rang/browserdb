# BrowserDB

*Experimental. Tested on latest version of Chromium.*

#### Inspiration

IndexedDB has a terribly confusing API.

Can we provide a simpler API? Can this API be similar to popular document based data stores?

MongoDB has a excellent API. It makes querying and working with the data store pleasurable.

BrowserDB hopes to deliver a similar experience to developers.

#### Mission

* Provide simple API for basic CRUD operations
* Provide simple querying mechanism similar but not identical to MongoDB
* Abstract underlying cruft such as schema change version-bumps, cursors, indexing

## Using BrowserDB

```javascript
<script src="https://raw.github.com/Srirangan/browserdb/master/browserdb.js"></script>

// Create a database

new BrowserDb({
  db:"myAppsDb",
  collections:["one", "two", "three"]
}, function (error, browserDb) {
  if( !error ) console.log("success");
});



// Change the collections / schema
// No versioning pain

new BrowserDb({
  db:"myAppsDb",
  collections:["users", "books"]
}, function (error, browserDb) {
  if( !error ) console.log("success");
});



// browserDb Instance

new BrowserDb({
  db:"myAppsDb",
  collections:["users", "books"]
}, function (error, browserDb) {

  // Second argument 'browserDb' exposes the API
  // Here's the methods browserDb provides:

  // browserDb: {
  // users: {
  //  save: function(object, callback) {..},
  //  remove: function(query, callback) {..},
  //  find: function(query, callback) {..},
  //  findOne: function(query, callback) {..},
  //  findById: function(id, callback) {..}
  // },
  // books: {
  //  save: function(object, callback) {..},
  //  remove: function(query, callback) {..},
  //  find: function(query, callback) {..},
  //  findOne: function(query, callback) {..},
  //  findById: function(id, callback) {..}
  // },
  // delete: function(callback) {...}
  // }

});



// Save some books

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

browserDb.books.save({ // _id not mandatory, gets auto generated
  topic:["android"],
  title:"Another android book",
});



// Find some books

browserDb.books.find(function (error, books) { // find all
  // books.length === 3
});

browserDb.books.findOne(function (error, book) {
  console.log(book);
});

browserDb.books.find({title:"The Good Parts"}, function (error, books) {
  // books[0]._id === 1
});

browserDb.books.find({topic:"java"}, function (error, books) {
  // books[0]._id === 3
});

browserDb.books.find({cost:{$gt:100}}, function (error, books) {
  // books[0]._id === 3
});

browserDb.books.find({cost:{$gte:100}}, function (error, books) {
  // books[0]._id === 2
  // books[1]._id === 3
});

browserDb.books.find({cost:{$lt:100}}, function (error, books) {
  // books[0]._id === 1
});

browserDb.books.find({cost:{$lte:100}}, function (error, books) {
  // books[0]._id === 1
  // books[1]._id === 2
});

browserDb.books.find({cost:{$ne:100}}, function (error, books) {
  // books[0]._id === 1
  // books[1]._id === 3
});

browserDb.books.find({cost:{$nin:[50, 75]}}, function (error, books) {
  // books[0]._id === 2
  // books[1]._id === 3
});

browserDb.books.find({cost:{$mod:[12, 2]}}, function (error, books) {
  // books[0]._id === 1
});

browserDb.books.find({topic:{$size:2}}, function (error, books) {
  // books[0]._id === 3
});

browserDb.books.find({author:{$exists:true}}, function (error, books) {
  // books[0]._id === 3
});

browserDb.books.find({author:{$typeof:"string"}}, function (error, books) {
  // books[0]._id === 3
});

browserDb.books.find({topic:{$nottypeof:"object"}}, function (error, books) {
  // books[0]._id === 2
});



// Remove books

browserDb.books.remove({title:"Android in action"}, function () {
  //..
});

browserDb.books.remove(function (error, result) { // remove all
  //..
});
```

## Unlicense

    This is free and unencumbered software released into the public domain.

    Anyone is free to copy, modify, publish, use, compile, sell, or
    distribute this software, either in source code form or as a compiled
    binary, for any purpose, commercial or non-commercial, and by any
    means.

    In jurisdictions that recognize copyright laws, the author or authors
    of this software dedicate any and all copyright interest in the
    software to the public domain. We make this dedication for the benefit
    of the public at large and to the detriment of our heirs and
    successors. We intend this dedication to be an overt act of
    relinquishment in perpetuity of all present and future rights to this
    software under copyright law.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
    ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.

    For more information, please refer to <http://unlicense.org/>
