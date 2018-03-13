(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }

  //To Add orders for new users
  RemoteDataStore.prototype.add = function(key, val) {
    this.remove(key);
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  // To get all orders
  RemoteDataStore.prototype.getAll = function() {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  // To get order of specific user
  RemoteDataStore.prototype.get = function(key) {
    $.get(this.serverUrl + '?emailAddress=' + key, function(serverResponse) {
      console.log(serverResponse);

    });
  };

  // To delete orders
  RemoteDataStore.prototype.remove = function(key) {
    var collectionUrl = this.serverUrl;
    var response = $.ajax(this.serverUrl, {
      type: 'GET',
      contentType: 'application/json',
      data: JSON.stringify({
        emailCustomer: key
      }),
      success: function() {
        if (response.responseJSON.length > 0) {
          var getid = response.responseJSON[0].id;
          $.ajax({
            type: 'POST',
            url: collectionUrl + '/' + getid,
            data: {
              _method: 'DELETE'
            }
          });
        }
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
