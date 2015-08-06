module.exports = function createTodoBackend() {

  var todos = [];

  function query(query, params, callback) {
    callback(null, []);
  }

  function getById(id) {
    var matches = todos.filter(function(t) { return t.id == id });
    return matches.length && matches[0];
  }

  var i = 1;
  function nextId() {
    return i++;
  }

  return {
    all: function(callback) {
      callback(null, todos);
    },

    get: function(id, callback) {
      callback(null, getById(id));
    },

    create: function(title, order, callback) {
      var id = nextId();
      var todo = { id: id, title: title, order: order };
      todos.push(todo);
      callback(null, todo);
    },

    update: function(id, properties, callback) {
      var todo = getById(id);

      if ('title' in properties) {
        todo.title = properties.title;
      }
      if ('order' in properties) {
        todo.order = properties.order;
      }
      if ('completed' in properties) {
        todo.completed = properties.completed;
      }

      callback(null, todo);
    },

    delete: function(id, callback) {
      todos = todos.filter(function(t) { return t.id != id; });
      callback(null, todos);
    },

    clear: function(callback) {
      todos = [];
      callback(null, todos);
    }
  };
};
