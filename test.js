'use strict';

/**
 * Dependencies.
 */

var attach,
    TextOMConstructor,
    assert;

attach = require('./');
TextOMConstructor = require('textom');
assert = require('assert');

/**
 * `TextOM`.
 */

var TextOM,
    LinkNode;

TextOM = new TextOMConstructor();

attach(TextOM);

LinkNode = TextOM.LinkNode;

/**
 * Tests.
 */

describe('link-node()', function () {
    it('should be a `function`', function () {
        assert(typeof attach === 'function');
    });

    it('should throw if no `TextOM` is given', function () {
        assert.throws(function () {
            attach();
        }, /not a valid object model/);
    });

    it('should attach a `LinkNode` to `TextOM`', function () {
        attach(TextOM);

        assert(typeof TextOM.LinkNode === 'function');
    });

    it('should NOT re-attach a `LinkNode` to `TextOM`', function () {
        var CurrentLinkNode;

        CurrentLinkNode = TextOM.LinkNode;

        attach(TextOM);

        assert(TextOM.LinkNode === CurrentLinkNode);
    });
});

describe('LinkNode', function () {
    it('should have a `type` property equal to `"LinkNode"`', function () {
        assert(LinkNode.prototype.type === 'LinkNode');
    });

    it('should inherit from `Text`', function () {
        assert(LinkNode.prototype.type === 'LinkNode');
    });

    it('should have a `nodeName` property equal to `Node#TEXT`', function () {
        assert(LinkNode.prototype.nodeName === TextOM.Node.prototype.TEXT);
    });

    it('should have a `data.href` property', function () {
        assert(
            new LinkNode('http://google.com/foo/bar').data.href ===
            'http://google.com/foo/bar'
        );
    });

    it('should have a `data.pathname` property', function () {
        assert(
            new LinkNode('http://google.com/foo/bar').data.pathname ===
            '/foo/bar'
        );
    });

    it('should have a `data.protocol` property', function () {
        assert(
            new LinkNode('mailto:test+1@gmail.com').data.protocol ===
            'mailto:'
        );
    });

    it('should have a `data.hostname` property', function () {
        assert(
            new LinkNode('http://google.com:3000/foo/bar').data.hostname ===
            'google.com'
        );
    });

    it('should have a `data.host` property', function () {
        assert(
            new LinkNode('http://google.com:3000/foo/bar').data.host ===
            'google.com:3000'
        );
    });

    it('should have a `data.port` property', function () {
        assert(
            new LinkNode('https://google.com/foo/bar').data.port ===
            443
        );
    });

    it('should have a `data.search` property', function () {
        assert(
            new LinkNode('google.com/foo/bar?name=tobi').data.search ===
            '?name=tobi'
        );
    });

    it('should have a `data.query` property', function () {
        assert(
            new LinkNode('google.com/foo/bar?name=tobi').data.query ===
            'name=tobi'
        );
    });

    it('should have a `data.hash` property', function () {
        assert(
            new LinkNode('google.com/foo/bar#something').data.hash ===
            '#something'
        );
    });
});

describe('LinkNode#valueOf()', function () {
    it('should return an object', function () {
        assert(
            typeof new LinkNode('google.com').valueOf() === 'object'
        );
    });

    it('should have a `type` property equal to TextOM.Node#LINK_NODE',
        function () {
            assert(
                new LinkNode().valueOf().type ===
                TextOM.Node.prototype.LINK_NODE
            );
        }
    );

    it('should have a `value` property equal to the given value',
        function () {
            assert(
                new LinkNode('Alfred').valueOf().value === 'Alfred'
            );
        }
    );
});

describe('LinkNode#isAbsolute()', function () {
    it('should support shemes and empty schemes', function () {
        assert(new LinkNode('http://example.com').isAbsolute());
        assert(new LinkNode('https://example.com').isAbsolute());
        assert(new LinkNode('ftp://example.com').isAbsolute());
        assert(new LinkNode('//foo.com').isAbsolute());
    });

    it('should return `false` when a link is relaive', function () {
        assert(new LinkNode('foo').isAbsolute() === false);
        assert(new LinkNode('foo/bar/baz').isAbsolute() === false);
        assert(new LinkNode('/foo/bar/baz').isAbsolute() === false);
        assert(new LinkNode('foo.com/something').isAbsolute() === false);
    });
});

describe('LinkNode#isAbsolute()', function () {
    it('should support shemes and empty schemes', function () {
        assert(new LinkNode('http://example.com').isRelative() === false);
        assert(new LinkNode('https://example.com').isRelative() === false);
        assert(new LinkNode('ftp://example.com').isRelative() === false);
        assert(new LinkNode('//foo.com').isRelative() === false);
    });

    it('should return `false` when a link is relaive', function () {
        assert(new LinkNode('foo').isRelative());
        assert(new LinkNode('foo/bar/baz').isRelative());
        assert(new LinkNode('/foo/bar/baz').isRelative());
        assert(new LinkNode('foo.com/something').isRelative());
    });
});

describe('TextOM', function () {
    it('should have a `LINK_NODE` property equal to the `type` ' +
        'property on an instance of `LinkNode`',
        function () {
            assert(TextOM.LINK_NODE === new LinkNode().type);
        }
    );
});

describe('TextOM.Node#', function () {
    it('should have a `LINK_NODE` property equal to the `type` ' +
        'property on an instance of `LinkNode`',
        function () {
            assert(
                TextOM.Node.prototype.LINK_NODE === new LinkNode().type
            );
        }
    );
});

describe('Hierarchy', function () {
    it('should throw when appending a `LinkNode` to a `RootNode`',
        function () {
            assert.throws(function () {
                new TextOM.RootNode().append(new LinkNode());
            }, /HierarchyError/);
        }
    );

    it('should throw when appending a `LinkNode` to a ' +
        '`ParagraphNode`',
        function () {
            assert.throws(function () {
                new TextOM.ParagraphNode().append(new LinkNode());
            }, /HierarchyError/);
        }
    );

    it('should NOT throw when appending a `LinkNode` to a ' +
        '`SentenceNode`',
        function () {
            assert.doesNotThrow(function () {
                new TextOM.SentenceNode().append(new LinkNode());
            }, /HierarchyError/);
        }
    );

    it('should throw when appending a `LinkNode` to a `WordNode`',
        function () {
            assert.throws(function () {
                new TextOM.WordNode().append(new LinkNode());
            }, /HierarchyError/);
        }
    );
});
