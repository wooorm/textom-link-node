'use strict';

/**
 * Dependencies.
 */

var parseLink;

parseLink = require('parse-link');

/**
 * Cached methods.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * Constants: node types.
 */

var LINK_NODE;

LINK_NODE = 'LinkNode';

/**
 * On change handler: fired when a `LinkNode`s internal
 * value changes.
 *
 * @this {LinkNode}
 */

function onchange() {
    var link,
        data,
        part;

    link = parseLink(this.toString());

    data = this.data;

    for (part in link) {
        if (has.call(link, part)) {
            data[part] = link[part];
        }
    }
}

/**
 * Check if a `LinkNode` is absolute.
 *
 * @this {LinkNode}
 * @return {boolean}
 */

function isAbsolute() {
    var link;

    link = this.toString();

    return link.indexOf('//') === 0 || link.indexOf('://') !== -1;
}

/**
 * Check if a `LinkNode` is relative.
 *
 * @this {LinkNode}
 * @return {boolean}
 */

function isRelative() {
    return !isAbsolute.call(this);
}

/**
 * Attach a `LinkNode` constructor to `TextOM`.
 *
 * @param {TextOMConstructor} TextOM
 */

function attach(TextOM) {
    var Text,
        linkNodePrototype;

    if (!TextOM) {
        throw new Error(
            '`TextOM` is not a valid object model for ' +
            '`attach(TextOM)`.'
        );
    }

    /**
     * Make sure to not re-attach the node.
     */

    if ('LinkNode' in TextOM) {
        return;
    }

    /**
     * Construct a `LinkNode`.
     */

    Text = TextOM.Text;

    /**
     * Define `LinkNode`.
     *
     * @constructor
     */

    function LinkNode() {
        Text.apply(this, arguments);
    }

    /**
     * Cached acces to `LinkNode`s prototype.
     */

    linkNodePrototype = LinkNode.prototype;

    /**
     * Check if a link is absolute.
     *
     * @see isAbsolute
     */

    linkNodePrototype.isAbsolute = isAbsolute;

    /**
     * Check if a link is relative.
     *
     * @see isRelative
     */

    linkNodePrototype.isRelative = isRelative;

    /**
     * The type of an instance of `LinkNode`.
     *
     * @readonly
     * @static
     */

    LinkNode.prototype.type = LINK_NODE;

    /**
     * Inherit from `Text.prototype`.
     */

    Text.isImplementedBy(LinkNode);

    /**
     * Expose `LinkNode` on `TextOM`.
     */

    TextOM.LinkNode = LinkNode;

    /**
     * Expose `LinkNode`s type on `TextOM`
     * and `Node.prototype`.
     */

    TextOM.LINK_NODE = LINK_NODE;
    TextOM.Node.prototype.LINK_NODE = LINK_NODE;

    /**
     * Enable `SentenceNode` to accept `LinkNode`s.
     */

    TextOM.SentenceNode.prototype.allowedChildTypes.push(LINK_NODE);

    /**
     * Listen to changes.
     */

    LinkNode.on('changetext', onchange);
}

/**
 * Expose `attach`.
 */

module.exports = attach;
