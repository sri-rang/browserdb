(function () {

  window.BrowserDb = function (options, callback) {

    var verifyCollections = function (callback) {

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
            db.createObjectStore(collection, {keyPath:"__id", autoIncrement:true});
          }
        }
      };

      var removeCollections = function () {
        for (var i = 0; i < db.objectStoreNames.length; i++) {
          var collection = db.objectStoreNames[i];
          if (options.collections.indexOf(collection) === -1) {
            db.deleteObjectStore(collection);
          }
        }
      };

      if (shouldUpgradeCollections()) {
        var newVersion = Number(db.version) + 1;
        if (Boolean(db.setVersion)) {
          var setVersionRequest = db.setVersion(newVersion);
          setVersionRequest.onerror = function (event) {
          };
          setVersionRequest.onsuccess = function (event) {
            addCollections();
            removeCollections();
          };
        } else {
          addCollections();
          removeCollections();
        }
      }

      if (typeof callback === "function") setTimeout(callback, 100);
    };

    var prepareBrowserDbInstance = function () {

      var browserDbInstance;

      var getCollectionApiInstance = function (collection) {
        var transaction = db.transaction([collection], "readwrite");
        var store = transaction.objectStore(collection);
        return {
          save:function (object, callback) {
            var saveRequest = store.put(object);
            saveRequest.onerror = function (event) {
              if (typeof callback === "function") callback(event);
            };
            saveRequest.onsuccess = function (event) {
              var getRequest = store.get(event.target.result);
              getRequest.onerror = function (event) {
                if (typeof callback === "function") callback(event);
              };
              getRequest.onsuccess = function (event) {
                if (typeof callback === "function") callback(undefined, event.target.result, event);
              };
            };
          },
          remove:function (query, callback) {
          },
          find:function (query, callback) {
            var result = [];
            var openCursorRequest = store.openCursor();
            openCursorRequest.onerror = function (event) {
              if (typeof callback === "function") callback(event);
            };
            openCursorRequest.onsuccess = function (event) {
              var cursor = event.target.result;
              if (cursor && cursor.key) {
                var getRequest = store.get(cursor.key);
                getRequest.onerror = function (event) {
                  if (typeof callback === "function") callback(event);
                };
                getRequest.onsuccess = function (event) {
                  if (!query) {
                    result.push(event.target.result);
                  }
                  cursor.continue();
                };
              } else {
                if (typeof callback === "function") callback(undefined, result, event);
              }
            };
          },
          findOne:function (query, callback) {
          },
          findById:function (id, callback) {
            var getRequest = store.get(id);
            getRequest.onerror = function (event) {
              if (typeof callback === "function") callback(event);
            };
            getRequest.onsuccess = function (event) {
              if (typeof callback === "function") callback(undefined, event.target.result, event);
            };
          }
        };
      };

      browserDbInstance = {};

      options.collections.forEach(function (collection) {
        browserDbInstance[collection] = getCollectionApiInstance(collection);
      });

      browserDbInstance.delete = function (callback) {
        var deleteRequest = window.indexedDB.deleteDatabase(options.db);
        deleteRequest.onError = function () {
          if (typeof callback === "function") callback(undefined, event);
        };
        deleteRequest.onSuccess = function (event) {
          if (typeof callback === "function") callback(undefined, event);
        };
      };

      if (typeof callback === "function") callback(undefined, browserDbInstance);
    };

    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

    var db;
    var openDbRequest = window.indexedDB.open(options.db);

    openDbRequest.onerror = function (event) {
    };

    openDbRequest.onsuccess = function (event) {

      db = openDbRequest.result;

      verifyCollections(function () {
        prepareBrowserDbInstance();
      });
    };

    openDbRequest.onupgradeneeded = function (event) {
      verifyCollections(function () {
        prepareBrowserDbInstance();
      });
    };

  };

})();