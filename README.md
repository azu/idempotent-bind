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

```js
import bind from "idempotent-bind"
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
	}
}
```


`bind` is not support `[, arg1 [, arg2, …]` like [`Function.prototype.bind (thisArg [, arg1 [, arg2, …]])`](http://ecma-international.org/ecma-262/5.1/#sec-15.3.4.5).

## Tests

- [ ] Write How to Tests

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT