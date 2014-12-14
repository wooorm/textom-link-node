# textom-link-node [![Build Status](https://img.shields.io/travis/wooorm/textom-link-node.svg?style=flat)](https://travis-ci.org/wooorm/textom-link-node) [![Coverage Status](https://img.shields.io/coveralls/wooorm/textom-link-node.svg?style=flat)](https://coveralls.io/r/wooorm/textom-link-node?branch=master)

`LinkNode`s for [TextOM](https://github.com/wooorm/textom).

Implemented by [retext-link](https://github.com/wooorm/retext-link), but separated for use by other plugins.

## Installation

npm:
```sh
$ npm install textom-link-node
```

Component.js:
```sh
$ component install wooorm/textom-link-node
```

## Usage

```js
var attach = require('textom-link-node');
var TextOMConstructor = require('textom');
var TextOM = new TextOMConstructor();

/* Attach the modifier. */
attach(TextOM);

var link = new TextOM.LinkNode('http://example.com');

console.log(link.isAbsolute()); // true
console.log(link.isRelative()); // false

console.log(link.data);
/**
 * {
 *   href: 'http://example.com/',
 *   pathname: '/',
 *   protocol: 'http:',
 *   hostname: 'example.com',
 *   host: 'example.com',
 *   port: 80,
 *   search: '',
 *   query: '',
 *   hash: ''
 * }
 */
```

## API

### TextOM.LinkNode

LinkNode subclasses [`Text`](https://github.com/wooorm/textom#textomtextvalue-nlcsttext).

#### [LinkNode](https://github.com/wooorm/textom-link-node#textomlinknode)#isAbsolute()

Returns whether the operated on node represents an absolute URL.

#### [LinkNode](https://github.com/wooorm/textom-link-node#textomlinknode)#isRelative()

Returns whether the operated on node represents a relative URL.

#### [LinkNode](https://github.com/wooorm/textom-link-node#textomlinknode).data

Every `LinkNode`s data object contains information on the parser URL, such as a `protocol`, `pathname`, &c.

These properties are parsed with native Node.js or browser functions, thus pretty fast. See **[parse-link](https://github.com/wooorm/parse-link)** for how the parsing works.

## Related

- [nlcst-link-modifier](https://github.com/wooorm/nlcst-link-modifier)
- [textom](https://github.com/wooorm/textom)
- [retext](https://github.com/wooorm/retext)
- [retext-link](https://github.com/wooorm/retext-link)

## License

MIT © [Titus Wormer](http://wooorm.com)
