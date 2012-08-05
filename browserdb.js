(function () {


  window.BrowserDb = function (options, callback) {

    console.log("options", options);

    var verifyCollections = function (callback) {
      console.log("  verifyCollections");

      var shouldUpgradeCollections = function () {
        if (db.version === "" || Number(db.version) === 0) return true;
        else if (db.objectStoreNames.length !== options.collections.length) return true;
        else {
          for (var i = 0; i < options.collections.length; i++) {
            if (!db.objectStoreNames.contains(options.collections[i])) return true;
          }
          return false;
        }
      };

      var addCollections = function () {
        for (var i = 0; i < options.collections.length; i++) {
          var collection = options.collections[i];
          if (!db.objectStoreNames.contains(collection)) {
            console.log("      creating collection " + collection);
            db.createObjectStore(collection, {keyPath:"__id", autoIncrement:true});
          }
        }
      };

      var removeCollections = function () {
        for (var i = 0; i < db.objectStoreNames.length; i++) {
          var collection = db.objectStoreNames[i];
          if (options.collections.indexOf(collection) === -1) {
            console.log("      deleting collection " + collection);
            db.deleteObjectStore(collection);
          }
        }
      };

      if (shouldUpgradeCollections()) {
        var newVersion = Number(db.version) + 1;
        console.log("    shouldUpgradeCollections, newVersion ", newVersion);
        if (Boolean(db.setVersion)) {
          console.log("      deprecated setVersion supported");
          var setVersionRequest = db.setVersion(newVersion);
          setVersionRequest.onerror = function (event) {
            console.log("setVersionRequest.onerror", event);
          };
          setVersionRequest.onsuccess = function (event) {
            console.log("setVersionRequest.onsuccess", event);
            addCollections();
            removeCollections();
          };
        } else {
          addCollections();
          removeCollections();
        }
      }

      setTimeout(callback, 100);
    };

    var browserDbInstance;

    var prepareBrowserDbInstance = function () {
      console.log("  prepareBrowserDbInstance");

      var getCollectionApiInstance = function (collection) {
        var transaction = db.transaction([collection], "readwrite");
        var store = transaction.objectStore(collection);
        return {
          save:function (object, callback) {
            var saveRequest = store.put(object);
            saveRequest.onerror = function (event) {
              callback(event);
            };
            saveRequest.onsuccess = function (event) {
              var getRequest = store.get(event.target.result);
              getRequest.onerror = function (event) {
                callback(event);
              };
              getRequest.onsuccess = function (event) {
                callback(undefined, event.target.result, event);
              };
            };
          },
          remove:function (query, callback) {
          },
          find:function (query, callback) {
          },
          findOne:function (query, callback) {
          },
          findById:function (key, callback) {
            var getRequest = store.get(key);
            getRequest.onerror = function (event) {
              callback(event);
            };
            getRequest.onsuccess = function (event) {
              callback(undefined, event.target.result, event);
            };
          }
        };
      };

      browserDbInstance = {};
      options.collections.forEach(function (collection) {
        browserDbInstance[collection] = getCollectionApiInstance(collection);
      });

      callback(undefined, browserDbInstance);
    };

    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

    var db;
    var openDbRequest = window.indexedDB.open(options.db);

    openDbRequest.onerror = function (event) {
      console.log("openDbRequest.onerror", event);
    };

    openDbRequest.onsuccess = function (event) {
      console.log("openDbRequest.onsuccess", event);

      db = openDbRequest.result;

      verifyCollections(function () {
        prepareBrowserDbInstance();
      });
    };

    openDbRequest.onupgradeneeded = function (event) {
      console.log("openDbRequest.onupgradeneeded", event);
      verifyCollections(function () {
        prepareBrowserDbInstance();
      });
    };

    return browserDbInstance;
  };

})();