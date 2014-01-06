anabolic-js
===========

Very, VERY lightweight JS dependency injection library (loosely based on AMD).

## Installing

Include build/anabolic.min.js in your project; it declares both 'require' and 'define' methods in whichever scope the code is included (if including via html script tags, these will be global).

## Usage

You *define* dependencies to be *requir*ed in your code. 

Dependencies are only resolved when required.

Your best bet is you look at the tests, but here is an example:

```javascript
define('bar', function() {
    return 'abc';
});
define('another', function() {
    return {
        a:'b',
        c:'d'
    };
});
define('baz', ['bar'], function(bar) {
    return bar + 'def';
});
require(['baz', 'another'], function(baz, another){
    console.log(baz, another);
});
```

## Testing

    npm install -g grunt-cli && npm install

Then

    grunt

This builds a minified version in 'build' directory and runs jasmine tests.
