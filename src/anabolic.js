var require, define;

(function(){
  var registry = {};

  function Dep(deps, fn) {
    var value, invoked = false;

    if (typeof fn !== 'function') {
      fn = (function(fn) {
        return function() {
          return fn;
        };
      })(fn);
    }

    (function(){
      for (var index = 0; index < deps.length; ++index) {
        var dep = deps[index];
        if (!dep || typeof dep !== 'string') {
          throw new Error('Invalid dependency \'' + dep + '\' for: ' + fn);
        }
      }
    })();

    function resolve(deps) {
      var name, index, dep, resolved;
      var args = [];

      for (index = 0; index < deps.length; ++index) {
        name = deps[index];
        dep = registry[name];
        if (dep) {
          try {
            resolved = dep.invoke();
          } catch(err) {
            throw new Error('Invoking dependency for \'' + name + '\'' + ' failed: ' + err.toString());
          }
          args.push(resolved);
        } else {
          throw new ReferenceError('Missing dependency: ' + name);
        }
      }

      return args;
    }

    return {
      invoke:function() {
        if (!invoked) {
          invoked = true;
          value = fn.apply(
            this,
            resolve(deps)
          );
        }
        return value;
      },
      invoked:function(){
        return invoked;
      }
    };
  }

  function def(name, deps, fn) {
    //allow deps to not be defined
    if (deps && !fn) {
      fn = deps;
      deps = [];
    }
    registry[name] = new Dep(deps, fn);
    return this;
  }

  function req(deps, fn) {
    return (new Dep(deps, fn)).invoke();
  }

  if (!require) {
    require = req;
  }

  if (!define) {
    define = def;
  }
})();
