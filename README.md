# idempotent-bind 

idempotent `bind` function library.

- [Idempotence - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Idempotence "Idempotence - Wikipedia, the free encyclopedia")

## Abstract

A  `bind` function is idempotent if, whenever it is applied twice to any value, it gives the same result as if it were applied once:

```js
bind(bind(x, this), this) === bind(x, this)
```

ECMAScript' [`Function.prototype.bind (thisArg [, arg1 [, arg2, …]])`](http://ecma-international.org/ecma-262/5.1/#sec-15.3.4.5) is not idempotent.

```js
x.bind(this).bind(this) !== x.bind(this)
```

## Installation

- [ ] Describe the installation process

## Usage

### bind(target, thisArg)

The bind method takes two arguments, `target`, `thisArg`, and returns a bound function.

- `target`: the target function
- `thisArg`: The value to be passed as the this parameter to the target function when the bound function is called.

```js
import { bind, unbind } from "idempotent-bind"
import {EventEmitter} from "events"
const emitter = new EventEmitter();

class Component {
	didAppear(){
		emitter.on("change", bind(this.onChange, this));
	}
	onChange(){
		// do something
	}
	didDisappear(){
		emitter.removeListener("change", bind(this.onChange, this));
		unbind(this.onChange, this);// manually unbind. not need if WeakMap is work on the UA...
	}
}
```


`bind` is not support `[, arg1 [, arg2, …]` like [`Function.prototype.bind (thisArg [, arg1 [, arg2, …]])`](http://ecma-international.org/ecma-262/5.1/#sec-15.3.4.5).


### unbind(target, thisArg)

Unbind the binding `target` and `thisArg`.
manually unbind function.

- `target`: the target function
- `thisArg`: The value to be passed as the this parameter to the target function when the bound function is called.

```js
import { bind, unbind } from "idempotent-bind"
import assert from "assert"
var f = function () {};
var g = bind(f, this);
unbind(f, this);
assert(g !== bind(f, this));
```


## Tests

	npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT