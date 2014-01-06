var require, define;

(function(){
    var registry = {};

    function Dep(deps, fn) {
        var value, invoked = false;

        function resolve(deps) {
            var name, index, dep;
            var args = [];

            for (index = 0; index < deps.length; ++index) {
                name = deps[index];
                dep = registry[name];
                if (dep) {
                    args.push(dep.invoke());
                } else {
                    throw new ReferenceError('Missing dependency: ' + deps[index]);
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
