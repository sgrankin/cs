var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// ../../node_modules/jquery/dist/jquery.js
var require_jquery = __commonJS({
  "../../node_modules/jquery/dist/jquery.js"(exports, module) {
    (function(global, factory) {
      "use strict";
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w2) {
          if (!w2.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w2);
        };
      } else {
        factory(global);
      }
    })(typeof window !== "undefined" ? window : exports, function(window2, noGlobal) {
      "use strict";
      var arr = [];
      var getProto = Object.getPrototypeOf;
      var slice = arr.slice;
      var flat = arr.flat ? function(array) {
        return arr.flat.call(array);
      } : function(array) {
        return arr.concat.apply([], array);
      };
      var push = arr.push;
      var indexOf = arr.indexOf;
      var class2type = {};
      var toString = class2type.toString;
      var hasOwn = class2type.hasOwnProperty;
      var fnToString = hasOwn.toString;
      var ObjectFunctionString = fnToString.call(Object);
      var support = {};
      var isFunction2 = function isFunction3(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
      };
      var isWindow = function isWindow2(obj) {
        return obj != null && obj === obj.window;
      };
      var document2 = window2.document;
      var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
      };
      function DOMEval(code, node, doc) {
        doc = doc || document2;
        var i5, val, script = doc.createElement("script");
        script.text = code;
        if (node) {
          for (i5 in preservedScriptAttributes) {
            val = node[i5] || node.getAttribute && node.getAttribute(i5);
            if (val) {
              script.setAttribute(i5, val);
            }
          }
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
      }
      function toType(obj) {
        if (obj == null) {
          return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
      }
      var version = "3.7.1", rhtmlSuffix = /HTML$/i, jQuery4 = function(selector, context) {
        return new jQuery4.fn.init(selector, context);
      };
      jQuery4.fn = jQuery4.prototype = {
        // The current version of jQuery being used
        jquery: version,
        constructor: jQuery4,
        // The default length of a jQuery object is 0
        length: 0,
        toArray: function() {
          return slice.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(num) {
          if (num == null) {
            return slice.call(this);
          }
          return num < 0 ? this[num + this.length] : this[num];
        },
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(elems) {
          var ret = jQuery4.merge(this.constructor(), elems);
          ret.prevObject = this;
          return ret;
        },
        // Execute a callback for every element in the matched set.
        each: function(callback) {
          return jQuery4.each(this, callback);
        },
        map: function(callback) {
          return this.pushStack(jQuery4.map(this, function(elem, i5) {
            return callback.call(elem, i5, elem);
          }));
        },
        slice: function() {
          return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
          return this.eq(0);
        },
        last: function() {
          return this.eq(-1);
        },
        even: function() {
          return this.pushStack(jQuery4.grep(this, function(_elem, i5) {
            return (i5 + 1) % 2;
          }));
        },
        odd: function() {
          return this.pushStack(jQuery4.grep(this, function(_elem, i5) {
            return i5 % 2;
          }));
        },
        eq: function(i5) {
          var len = this.length, j2 = +i5 + (i5 < 0 ? len : 0);
          return this.pushStack(j2 >= 0 && j2 < len ? [this[j2]] : []);
        },
        end: function() {
          return this.prevObject || this.constructor();
        },
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push,
        sort: arr.sort,
        splice: arr.splice
      };
      jQuery4.extend = jQuery4.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i5 = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[i5] || {};
          i5++;
        }
        if (typeof target !== "object" && !isFunction2(target)) {
          target = {};
        }
        if (i5 === length) {
          target = this;
          i5--;
        }
        for (; i5 < length; i5++) {
          if ((options = arguments[i5]) != null) {
            for (name in options) {
              copy = options[name];
              if (name === "__proto__" || target === copy) {
                continue;
              }
              if (deep && copy && (jQuery4.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                src = target[name];
                if (copyIsArray && !Array.isArray(src)) {
                  clone = [];
                } else if (!copyIsArray && !jQuery4.isPlainObject(src)) {
                  clone = {};
                } else {
                  clone = src;
                }
                copyIsArray = false;
                target[name] = jQuery4.extend(deep, clone, copy);
              } else if (copy !== void 0) {
                target[name] = copy;
              }
            }
          }
        }
        return target;
      };
      jQuery4.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        // Assume jQuery is ready without the ready module
        isReady: true,
        error: function(msg) {
          throw new Error(msg);
        },
        noop: function() {
        },
        isPlainObject: function(obj) {
          var proto, Ctor;
          if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
          }
          proto = getProto(obj);
          if (!proto) {
            return true;
          }
          Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
          return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        isEmptyObject: function(obj) {
          var name;
          for (name in obj) {
            return false;
          }
          return true;
        },
        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        globalEval: function(code, options, doc) {
          DOMEval(code, { nonce: options && options.nonce }, doc);
        },
        each: function(obj, callback) {
          var length, i5 = 0;
          if (isArrayLike(obj)) {
            length = obj.length;
            for (; i5 < length; i5++) {
              if (callback.call(obj[i5], i5, obj[i5]) === false) {
                break;
              }
            }
          } else {
            for (i5 in obj) {
              if (callback.call(obj[i5], i5, obj[i5]) === false) {
                break;
              }
            }
          }
          return obj;
        },
        // Retrieve the text value of an array of DOM nodes
        text: function(elem) {
          var node, ret = "", i5 = 0, nodeType = elem.nodeType;
          if (!nodeType) {
            while (node = elem[i5++]) {
              ret += jQuery4.text(node);
            }
          }
          if (nodeType === 1 || nodeType === 11) {
            return elem.textContent;
          }
          if (nodeType === 9) {
            return elem.documentElement.textContent;
          }
          if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
          }
          return ret;
        },
        // results is for internal usage only
        makeArray: function(arr2, results) {
          var ret = results || [];
          if (arr2 != null) {
            if (isArrayLike(Object(arr2))) {
              jQuery4.merge(
                ret,
                typeof arr2 === "string" ? [arr2] : arr2
              );
            } else {
              push.call(ret, arr2);
            }
          }
          return ret;
        },
        inArray: function(elem, arr2, i5) {
          return arr2 == null ? -1 : indexOf.call(arr2, elem, i5);
        },
        isXMLDoc: function(elem) {
          var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
          return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
        },
        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function(first, second) {
          var len = +second.length, j2 = 0, i5 = first.length;
          for (; j2 < len; j2++) {
            first[i5++] = second[j2];
          }
          first.length = i5;
          return first;
        },
        grep: function(elems, callback, invert) {
          var callbackInverse, matches2 = [], i5 = 0, length = elems.length, callbackExpect = !invert;
          for (; i5 < length; i5++) {
            callbackInverse = !callback(elems[i5], i5);
            if (callbackInverse !== callbackExpect) {
              matches2.push(elems[i5]);
            }
          }
          return matches2;
        },
        // arg is for internal usage only
        map: function(elems, callback, arg) {
          var length, value, i5 = 0, ret = [];
          if (isArrayLike(elems)) {
            length = elems.length;
            for (; i5 < length; i5++) {
              value = callback(elems[i5], i5, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          } else {
            for (i5 in elems) {
              value = callback(elems[i5], i5, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          }
          return flat(ret);
        },
        // A global GUID counter for objects
        guid: 1,
        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support
      });
      if (typeof Symbol === "function") {
        jQuery4.fn[Symbol.iterator] = arr[Symbol.iterator];
      }
      jQuery4.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function(_i, name) {
          class2type["[object " + name + "]"] = name.toLowerCase();
        }
      );
      function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length, type = toType(obj);
        if (isFunction2(obj) || isWindow(obj)) {
          return false;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
      }
      function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
      }
      var pop = arr.pop;
      var sort = arr.sort;
      var splice = arr.splice;
      var whitespace = "[\\x20\\t\\r\\n\\f]";
      var rtrimCSS = new RegExp(
        "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
        "g"
      );
      jQuery4.contains = function(a3, b3) {
        var bup = b3 && b3.parentNode;
        return a3 === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
        // IE doesn't have `contains` on SVG.
        (a3.contains ? a3.contains(bup) : a3.compareDocumentPosition && a3.compareDocumentPosition(bup) & 16));
      };
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      function fcssescape(ch, asCodePoint) {
        if (asCodePoint) {
          if (ch === "\0") {
            return "\uFFFD";
          }
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }
        return "\\" + ch;
      }
      jQuery4.escapeSelector = function(sel) {
        return (sel + "").replace(rcssescape, fcssescape);
      };
      var preferredDoc = document2, pushNative = push;
      (function() {
        var i5, Expr, outermostContext, sortInput, hasDuplicate, push2 = pushNative, document3, documentElement2, documentIsHTML, rbuggyQSA, matches2, expando = jQuery4.expando, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a3, b3) {
          if (a3 === b3) {
            hasDuplicate = true;
          }
          return 0;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
        "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
          ID: new RegExp("^#(" + identifier + ")"),
          CLASS: new RegExp("^\\.(" + identifier + ")"),
          TAG: new RegExp("^(" + identifier + "|[*])"),
          ATTR: new RegExp("^" + attributes),
          PSEUDO: new RegExp("^" + pseudos),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + booleans + ")$", "i"),
          // For use in libraries implementing .is()
          // We use this for POS matching in `select`
          needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
          var high = "0x" + escape.slice(1) - 65536;
          if (nonHex) {
            return nonHex;
          }
          return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
        }, unloadHandler = function() {
          setDocument();
        }, inDisabledFieldset = addCombinator(
          function(elem) {
            return elem.disabled === true && nodeName(elem, "fieldset");
          },
          { dir: "parentNode", next: "legend" }
        );
        function safeActiveElement() {
          try {
            return document3.activeElement;
          } catch (err) {
          }
        }
        try {
          push2.apply(
            arr = slice.call(preferredDoc.childNodes),
            preferredDoc.childNodes
          );
          arr[preferredDoc.childNodes.length].nodeType;
        } catch (e5) {
          push2 = {
            apply: function(target, els) {
              pushNative.apply(target, slice.call(els));
            },
            call: function(target) {
              pushNative.apply(target, slice.call(arguments, 1));
            }
          };
        }
        function find2(selector, context, results, seed) {
          var m2, i6, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
          results = results || [];
          if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
            return results;
          }
          if (!seed) {
            setDocument(context);
            context = context || document3;
            if (documentIsHTML) {
              if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                if (m2 = match[1]) {
                  if (nodeType === 9) {
                    if (elem = context.getElementById(m2)) {
                      if (elem.id === m2) {
                        push2.call(results, elem);
                        return results;
                      }
                    } else {
                      return results;
                    }
                  } else {
                    if (newContext && (elem = newContext.getElementById(m2)) && find2.contains(context, elem) && elem.id === m2) {
                      push2.call(results, elem);
                      return results;
                    }
                  }
                } else if (match[2]) {
                  push2.apply(results, context.getElementsByTagName(selector));
                  return results;
                } else if ((m2 = match[3]) && context.getElementsByClassName) {
                  push2.apply(results, context.getElementsByClassName(m2));
                  return results;
                }
              }
              if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                newSelector = selector;
                newContext = context;
                if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                  newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                  if (newContext != context || !support.scope) {
                    if (nid = context.getAttribute("id")) {
                      nid = jQuery4.escapeSelector(nid);
                    } else {
                      context.setAttribute("id", nid = expando);
                    }
                  }
                  groups = tokenize(selector);
                  i6 = groups.length;
                  while (i6--) {
                    groups[i6] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i6]);
                  }
                  newSelector = groups.join(",");
                }
                try {
                  push2.apply(
                    results,
                    newContext.querySelectorAll(newSelector)
                  );
                  return results;
                } catch (qsaError) {
                  nonnativeSelectorCache(selector, true);
                } finally {
                  if (nid === expando) {
                    context.removeAttribute("id");
                  }
                }
              }
            }
          }
          return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
        }
        function createCache() {
          var keys = [];
          function cache(key, value) {
            if (keys.push(key + " ") > Expr.cacheLength) {
              delete cache[keys.shift()];
            }
            return cache[key + " "] = value;
          }
          return cache;
        }
        function markFunction(fn) {
          fn[expando] = true;
          return fn;
        }
        function assert(fn) {
          var el = document3.createElement("fieldset");
          try {
            return !!fn(el);
          } catch (e5) {
            return false;
          } finally {
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }
            el = null;
          }
        }
        function createInputPseudo(type) {
          return function(elem) {
            return nodeName(elem, "input") && elem.type === type;
          };
        }
        function createButtonPseudo(type) {
          return function(elem) {
            return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
          };
        }
        function createDisabledPseudo(disabled) {
          return function(elem) {
            if ("form" in elem) {
              if (elem.parentNode && elem.disabled === false) {
                if ("label" in elem) {
                  if ("label" in elem.parentNode) {
                    return elem.parentNode.disabled === disabled;
                  } else {
                    return elem.disabled === disabled;
                  }
                }
                return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
                elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
              }
              return elem.disabled === disabled;
            } else if ("label" in elem) {
              return elem.disabled === disabled;
            }
            return false;
          };
        }
        function createPositionalPseudo(fn) {
          return markFunction(function(argument) {
            argument = +argument;
            return markFunction(function(seed, matches3) {
              var j2, matchIndexes = fn([], seed.length, argument), i6 = matchIndexes.length;
              while (i6--) {
                if (seed[j2 = matchIndexes[i6]]) {
                  seed[j2] = !(matches3[j2] = seed[j2]);
                }
              }
            });
          });
        }
        function testContext(context) {
          return context && typeof context.getElementsByTagName !== "undefined" && context;
        }
        function setDocument(node) {
          var subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
          if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
            return document3;
          }
          document3 = doc;
          documentElement2 = document3.documentElement;
          documentIsHTML = !jQuery4.isXMLDoc(document3);
          matches2 = documentElement2.matches || documentElement2.webkitMatchesSelector || documentElement2.msMatchesSelector;
          if (documentElement2.msMatchesSelector && // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
            subWindow.addEventListener("unload", unloadHandler);
          }
          support.getById = assert(function(el) {
            documentElement2.appendChild(el).id = jQuery4.expando;
            return !document3.getElementsByName || !document3.getElementsByName(jQuery4.expando).length;
          });
          support.disconnectedMatch = assert(function(el) {
            return matches2.call(el, "*");
          });
          support.scope = assert(function() {
            return document3.querySelectorAll(":scope");
          });
          support.cssHas = assert(function() {
            try {
              document3.querySelector(":has(*,:jqfake)");
              return false;
            } catch (e5) {
              return true;
            }
          });
          if (support.getById) {
            Expr.filter.ID = function(id) {
              var attrId = id.replace(runescape, funescape);
              return function(elem) {
                return elem.getAttribute("id") === attrId;
              };
            };
            Expr.find.ID = function(id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var elem = context.getElementById(id);
                return elem ? [elem] : [];
              }
            };
          } else {
            Expr.filter.ID = function(id) {
              var attrId = id.replace(runescape, funescape);
              return function(elem) {
                var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                return node2 && node2.value === attrId;
              };
            };
            Expr.find.ID = function(id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var node2, i6, elems, elem = context.getElementById(id);
                if (elem) {
                  node2 = elem.getAttributeNode("id");
                  if (node2 && node2.value === id) {
                    return [elem];
                  }
                  elems = context.getElementsByName(id);
                  i6 = 0;
                  while (elem = elems[i6++]) {
                    node2 = elem.getAttributeNode("id");
                    if (node2 && node2.value === id) {
                      return [elem];
                    }
                  }
                }
                return [];
              }
            };
          }
          Expr.find.TAG = function(tag, context) {
            if (typeof context.getElementsByTagName !== "undefined") {
              return context.getElementsByTagName(tag);
            } else {
              return context.querySelectorAll(tag);
            }
          };
          Expr.find.CLASS = function(className, context) {
            if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
              return context.getElementsByClassName(className);
            }
          };
          rbuggyQSA = [];
          assert(function(el) {
            var input;
            documentElement2.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a><select id='" + expando + "-\r\\' disabled='disabled'><option selected=''></option></select>";
            if (!el.querySelectorAll("[selected]").length) {
              rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
            }
            if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
              rbuggyQSA.push("~=");
            }
            if (!el.querySelectorAll("a#" + expando + "+*").length) {
              rbuggyQSA.push(".#.+[+~]");
            }
            if (!el.querySelectorAll(":checked").length) {
              rbuggyQSA.push(":checked");
            }
            input = document3.createElement("input");
            input.setAttribute("type", "hidden");
            el.appendChild(input).setAttribute("name", "D");
            documentElement2.appendChild(el).disabled = true;
            if (el.querySelectorAll(":disabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }
            input = document3.createElement("input");
            input.setAttribute("name", "");
            el.appendChild(input);
            if (!el.querySelectorAll("[name='']").length) {
              rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
            }
          });
          if (!support.cssHas) {
            rbuggyQSA.push(":has");
          }
          rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
          sortOrder = function(a3, b3) {
            if (a3 === b3) {
              hasDuplicate = true;
              return 0;
            }
            var compare = !a3.compareDocumentPosition - !b3.compareDocumentPosition;
            if (compare) {
              return compare;
            }
            compare = (a3.ownerDocument || a3) == (b3.ownerDocument || b3) ? a3.compareDocumentPosition(b3) : (
              // Otherwise we know they are disconnected
              1
            );
            if (compare & 1 || !support.sortDetached && b3.compareDocumentPosition(a3) === compare) {
              if (a3 === document3 || a3.ownerDocument == preferredDoc && find2.contains(preferredDoc, a3)) {
                return -1;
              }
              if (b3 === document3 || b3.ownerDocument == preferredDoc && find2.contains(preferredDoc, b3)) {
                return 1;
              }
              return sortInput ? indexOf.call(sortInput, a3) - indexOf.call(sortInput, b3) : 0;
            }
            return compare & 4 ? -1 : 1;
          };
          return document3;
        }
        find2.matches = function(expr, elements) {
          return find2(expr, null, null, elements);
        };
        find2.matchesSelector = function(elem, expr) {
          setDocument(elem);
          if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
            try {
              var ret = matches2.call(elem, expr);
              if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              elem.document && elem.document.nodeType !== 11) {
                return ret;
              }
            } catch (e5) {
              nonnativeSelectorCache(expr, true);
            }
          }
          return find2(expr, document3, null, [elem]).length > 0;
        };
        find2.contains = function(context, elem) {
          if ((context.ownerDocument || context) != document3) {
            setDocument(context);
          }
          return jQuery4.contains(context, elem);
        };
        find2.attr = function(elem, name) {
          if ((elem.ownerDocument || elem) != document3) {
            setDocument(elem);
          }
          var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
          if (val !== void 0) {
            return val;
          }
          return elem.getAttribute(name);
        };
        find2.error = function(msg) {
          throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        jQuery4.uniqueSort = function(results) {
          var elem, duplicates = [], j2 = 0, i6 = 0;
          hasDuplicate = !support.sortStable;
          sortInput = !support.sortStable && slice.call(results, 0);
          sort.call(results, sortOrder);
          if (hasDuplicate) {
            while (elem = results[i6++]) {
              if (elem === results[i6]) {
                j2 = duplicates.push(i6);
              }
            }
            while (j2--) {
              splice.call(results, duplicates[j2], 1);
            }
          }
          sortInput = null;
          return results;
        };
        jQuery4.fn.uniqueSort = function() {
          return this.pushStack(jQuery4.uniqueSort(slice.apply(this)));
        };
        Expr = jQuery4.expr = {
          // Can be adjusted by the user
          cacheLength: 50,
          createPseudo: markFunction,
          match: matchExpr,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: true },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: true },
            "~": { dir: "previousSibling" }
          },
          preFilter: {
            ATTR: function(match) {
              match[1] = match[1].replace(runescape, funescape);
              match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
              if (match[2] === "~=") {
                match[3] = " " + match[3] + " ";
              }
              return match.slice(0, 4);
            },
            CHILD: function(match) {
              match[1] = match[1].toLowerCase();
              if (match[1].slice(0, 3) === "nth") {
                if (!match[3]) {
                  find2.error(match[0]);
                }
                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                match[5] = +(match[7] + match[8] || match[3] === "odd");
              } else if (match[3]) {
                find2.error(match[0]);
              }
              return match;
            },
            PSEUDO: function(match) {
              var excess, unquoted = !match[6] && match[2];
              if (matchExpr.CHILD.test(match[0])) {
                return null;
              }
              if (match[3]) {
                match[2] = match[4] || match[5] || "";
              } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
              (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
              (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                match[0] = match[0].slice(0, excess);
                match[2] = unquoted.slice(0, excess);
              }
              return match.slice(0, 3);
            }
          },
          filter: {
            TAG: function(nodeNameSelector) {
              var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
              return nodeNameSelector === "*" ? function() {
                return true;
              } : function(elem) {
                return nodeName(elem, expectedNodeName);
              };
            },
            CLASS: function(className) {
              var pattern = classCache[className + " "];
              return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                return pattern.test(
                  typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
                );
              });
            },
            ATTR: function(name, operator, check) {
              return function(elem) {
                var result = find2.attr(elem, name);
                if (result == null) {
                  return operator === "!=";
                }
                if (!operator) {
                  return true;
                }
                result += "";
                if (operator === "=") {
                  return result === check;
                }
                if (operator === "!=") {
                  return result !== check;
                }
                if (operator === "^=") {
                  return check && result.indexOf(check) === 0;
                }
                if (operator === "*=") {
                  return check && result.indexOf(check) > -1;
                }
                if (operator === "$=") {
                  return check && result.slice(-check.length) === check;
                }
                if (operator === "~=") {
                  return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
                }
                if (operator === "|=") {
                  return result === check || result.slice(0, check.length + 1) === check + "-";
                }
                return false;
              };
            },
            CHILD: function(type, what, _argument, first, last) {
              var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
              return first === 1 && last === 0 ? (
                // Shortcut for :nth-*(n)
                function(elem) {
                  return !!elem.parentNode;
                }
              ) : function(elem, _context, xml) {
                var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                if (parent) {
                  if (simple) {
                    while (dir2) {
                      node = elem;
                      while (node = node[dir2]) {
                        if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                          return false;
                        }
                      }
                      start = dir2 = type === "only" && !start && "nextSibling";
                    }
                    return true;
                  }
                  start = [forward ? parent.firstChild : parent.lastChild];
                  if (forward && useCache) {
                    outerCache = parent[expando] || (parent[expando] = {});
                    cache = outerCache[type] || [];
                    nodeIndex = cache[0] === dirruns && cache[1];
                    diff = nodeIndex && cache[2];
                    node = nodeIndex && parent.childNodes[nodeIndex];
                    while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                    (diff = nodeIndex = 0) || start.pop()) {
                      if (node.nodeType === 1 && ++diff && node === elem) {
                        outerCache[type] = [dirruns, nodeIndex, diff];
                        break;
                      }
                    }
                  } else {
                    if (useCache) {
                      outerCache = elem[expando] || (elem[expando] = {});
                      cache = outerCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex;
                    }
                    if (diff === false) {
                      while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                        if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                          if (useCache) {
                            outerCache = node[expando] || (node[expando] = {});
                            outerCache[type] = [dirruns, diff];
                          }
                          if (node === elem) {
                            break;
                          }
                        }
                      }
                    }
                  }
                  diff -= last;
                  return diff === first || diff % first === 0 && diff / first >= 0;
                }
              };
            },
            PSEUDO: function(pseudo, argument) {
              var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find2.error("unsupported pseudo: " + pseudo);
              if (fn[expando]) {
                return fn(argument);
              }
              if (fn.length > 1) {
                args = [pseudo, pseudo, "", argument];
                return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches3) {
                  var idx, matched = fn(seed, argument), i6 = matched.length;
                  while (i6--) {
                    idx = indexOf.call(seed, matched[i6]);
                    seed[idx] = !(matches3[idx] = matched[i6]);
                  }
                }) : function(elem) {
                  return fn(elem, 0, args);
                };
              }
              return fn;
            }
          },
          pseudos: {
            // Potentially complex pseudos
            not: markFunction(function(selector) {
              var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
              return matcher[expando] ? markFunction(function(seed, matches3, _context, xml) {
                var elem, unmatched = matcher(seed, null, xml, []), i6 = seed.length;
                while (i6--) {
                  if (elem = unmatched[i6]) {
                    seed[i6] = !(matches3[i6] = elem);
                  }
                }
              }) : function(elem, _context, xml) {
                input[0] = elem;
                matcher(input, null, xml, results);
                input[0] = null;
                return !results.pop();
              };
            }),
            has: markFunction(function(selector) {
              return function(elem) {
                return find2(selector, elem).length > 0;
              };
            }),
            contains: markFunction(function(text) {
              text = text.replace(runescape, funescape);
              return function(elem) {
                return (elem.textContent || jQuery4.text(elem)).indexOf(text) > -1;
              };
            }),
            // "Whether an element is represented by a :lang() selector
            // is based solely on the element's language value
            // being equal to the identifier C,
            // or beginning with the identifier C immediately followed by "-".
            // The matching of C against the element's language value is performed case-insensitively.
            // The identifier C does not have to be a valid language name."
            // https://www.w3.org/TR/selectors/#lang-pseudo
            lang: markFunction(function(lang) {
              if (!ridentifier.test(lang || "")) {
                find2.error("unsupported lang: " + lang);
              }
              lang = lang.replace(runescape, funescape).toLowerCase();
              return function(elem) {
                var elemLang;
                do {
                  if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                    elemLang = elemLang.toLowerCase();
                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                  }
                } while ((elem = elem.parentNode) && elem.nodeType === 1);
                return false;
              };
            }),
            // Miscellaneous
            target: function(elem) {
              var hash = window2.location && window2.location.hash;
              return hash && hash.slice(1) === elem.id;
            },
            root: function(elem) {
              return elem === documentElement2;
            },
            focus: function(elem) {
              return elem === safeActiveElement() && document3.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
            },
            // Boolean properties
            enabled: createDisabledPseudo(false),
            disabled: createDisabledPseudo(true),
            checked: function(elem) {
              return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
            },
            selected: function(elem) {
              if (elem.parentNode) {
                elem.parentNode.selectedIndex;
              }
              return elem.selected === true;
            },
            // Contents
            empty: function(elem) {
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                if (elem.nodeType < 6) {
                  return false;
                }
              }
              return true;
            },
            parent: function(elem) {
              return !Expr.pseudos.empty(elem);
            },
            // Element/input types
            header: function(elem) {
              return rheader.test(elem.nodeName);
            },
            input: function(elem) {
              return rinputs.test(elem.nodeName);
            },
            button: function(elem) {
              return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
            },
            text: function(elem) {
              var attr;
              return nodeName(elem, "input") && elem.type === "text" && // Support: IE <10 only
              // New HTML5 attribute values (e.g., "search") appear
              // with elem.type === "text"
              ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
            },
            // Position-in-collection
            first: createPositionalPseudo(function() {
              return [0];
            }),
            last: createPositionalPseudo(function(_matchIndexes, length) {
              return [length - 1];
            }),
            eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
              return [argument < 0 ? argument + length : argument];
            }),
            even: createPositionalPseudo(function(matchIndexes, length) {
              var i6 = 0;
              for (; i6 < length; i6 += 2) {
                matchIndexes.push(i6);
              }
              return matchIndexes;
            }),
            odd: createPositionalPseudo(function(matchIndexes, length) {
              var i6 = 1;
              for (; i6 < length; i6 += 2) {
                matchIndexes.push(i6);
              }
              return matchIndexes;
            }),
            lt: createPositionalPseudo(function(matchIndexes, length, argument) {
              var i6;
              if (argument < 0) {
                i6 = argument + length;
              } else if (argument > length) {
                i6 = length;
              } else {
                i6 = argument;
              }
              for (; --i6 >= 0; ) {
                matchIndexes.push(i6);
              }
              return matchIndexes;
            }),
            gt: createPositionalPseudo(function(matchIndexes, length, argument) {
              var i6 = argument < 0 ? argument + length : argument;
              for (; ++i6 < length; ) {
                matchIndexes.push(i6);
              }
              return matchIndexes;
            })
          }
        };
        Expr.pseudos.nth = Expr.pseudos.eq;
        for (i5 in { radio: true, checkbox: true, file: true, password: true, image: true }) {
          Expr.pseudos[i5] = createInputPseudo(i5);
        }
        for (i5 in { submit: true, reset: true }) {
          Expr.pseudos[i5] = createButtonPseudo(i5);
        }
        function setFilters() {
        }
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        function tokenize(selector, parseOnly) {
          var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
          if (cached) {
            return parseOnly ? 0 : cached.slice(0);
          }
          soFar = selector;
          groups = [];
          preFilters = Expr.preFilter;
          while (soFar) {
            if (!matched || (match = rcomma.exec(soFar))) {
              if (match) {
                soFar = soFar.slice(match[0].length) || soFar;
              }
              groups.push(tokens = []);
            }
            matched = false;
            if (match = rleadingCombinator.exec(soFar)) {
              matched = match.shift();
              tokens.push({
                value: matched,
                // Cast descendant combinators to space
                type: match[0].replace(rtrimCSS, " ")
              });
              soFar = soFar.slice(matched.length);
            }
            for (type in Expr.filter) {
              if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  type,
                  matches: match
                });
                soFar = soFar.slice(matched.length);
              }
            }
            if (!matched) {
              break;
            }
          }
          if (parseOnly) {
            return soFar.length;
          }
          return soFar ? find2.error(selector) : (
            // Cache the tokens
            tokenCache(selector, groups).slice(0)
          );
        }
        function toSelector(tokens) {
          var i6 = 0, len = tokens.length, selector = "";
          for (; i6 < len; i6++) {
            selector += tokens[i6].value;
          }
          return selector;
        }
        function addCombinator(matcher, combinator, base) {
          var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
          return combinator.first ? (
            // Check against closest ancestor/preceding element
            function(elem, context, xml) {
              while (elem = elem[dir2]) {
                if (elem.nodeType === 1 || checkNonElements) {
                  return matcher(elem, context, xml);
                }
              }
              return false;
            }
          ) : (
            // Check against all ancestor/preceding elements
            function(elem, context, xml) {
              var oldCache, outerCache, newCache = [dirruns, doneName];
              if (xml) {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    if (matcher(elem, context, xml)) {
                      return true;
                    }
                  }
                }
              } else {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    outerCache = elem[expando] || (elem[expando] = {});
                    if (skip && nodeName(elem, skip)) {
                      elem = elem[dir2] || elem;
                    } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                      return newCache[2] = oldCache[2];
                    } else {
                      outerCache[key] = newCache;
                      if (newCache[2] = matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                }
              }
              return false;
            }
          );
        }
        function elementMatcher(matchers) {
          return matchers.length > 1 ? function(elem, context, xml) {
            var i6 = matchers.length;
            while (i6--) {
              if (!matchers[i6](elem, context, xml)) {
                return false;
              }
            }
            return true;
          } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
          var i6 = 0, len = contexts.length;
          for (; i6 < len; i6++) {
            find2(selector, contexts[i6], results);
          }
          return results;
        }
        function condense(unmatched, map, filter, context, xml) {
          var elem, newUnmatched = [], i6 = 0, len = unmatched.length, mapped = map != null;
          for (; i6 < len; i6++) {
            if (elem = unmatched[i6]) {
              if (!filter || filter(elem, context, xml)) {
                newUnmatched.push(elem);
                if (mapped) {
                  map.push(i6);
                }
              }
            }
          }
          return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
          if (postFilter && !postFilter[expando]) {
            postFilter = setMatcher(postFilter);
          }
          if (postFinder && !postFinder[expando]) {
            postFinder = setMatcher(postFinder, postSelector);
          }
          return markFunction(function(seed, results, context, xml) {
            var temp, i6, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
              selector || "*",
              context.nodeType ? [context] : context,
              []
            ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
            if (matcher) {
              matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ? (
                // ...intermediate processing is necessary
                []
              ) : (
                // ...otherwise use results directly
                results
              );
              matcher(matcherIn, matcherOut, context, xml);
            } else {
              matcherOut = matcherIn;
            }
            if (postFilter) {
              temp = condense(matcherOut, postMap);
              postFilter(temp, [], context, xml);
              i6 = temp.length;
              while (i6--) {
                if (elem = temp[i6]) {
                  matcherOut[postMap[i6]] = !(matcherIn[postMap[i6]] = elem);
                }
              }
            }
            if (seed) {
              if (postFinder || preFilter) {
                if (postFinder) {
                  temp = [];
                  i6 = matcherOut.length;
                  while (i6--) {
                    if (elem = matcherOut[i6]) {
                      temp.push(matcherIn[i6] = elem);
                    }
                  }
                  postFinder(null, matcherOut = [], temp, xml);
                }
                i6 = matcherOut.length;
                while (i6--) {
                  if ((elem = matcherOut[i6]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i6]) > -1) {
                    seed[temp] = !(results[temp] = elem);
                  }
                }
              }
            } else {
              matcherOut = condense(
                matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
              );
              if (postFinder) {
                postFinder(null, results, matcherOut, xml);
              } else {
                push2.apply(results, matcherOut);
              }
            }
          });
        }
        function matcherFromTokens(tokens) {
          var checkContext, matcher, j2, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i6 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
            return indexOf.call(checkContext, elem) > -1;
          }, implicitRelative, true), matchers = [function(elem, context, xml) {
            var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
          for (; i6 < len; i6++) {
            if (matcher = Expr.relative[tokens[i6].type]) {
              matchers = [addCombinator(elementMatcher(matchers), matcher)];
            } else {
              matcher = Expr.filter[tokens[i6].type].apply(null, tokens[i6].matches);
              if (matcher[expando]) {
                j2 = ++i6;
                for (; j2 < len; j2++) {
                  if (Expr.relative[tokens[j2].type]) {
                    break;
                  }
                }
                return setMatcher(
                  i6 > 1 && elementMatcher(matchers),
                  i6 > 1 && toSelector(
                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                    tokens.slice(0, i6 - 1).concat({ value: tokens[i6 - 2].type === " " ? "*" : "" })
                  ).replace(rtrimCSS, "$1"),
                  matcher,
                  i6 < j2 && matcherFromTokens(tokens.slice(i6, j2)),
                  j2 < len && matcherFromTokens(tokens = tokens.slice(j2)),
                  j2 < len && toSelector(tokens)
                );
              }
              matchers.push(matcher);
            }
          }
          return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
          var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
            var elem, j2, matcher, matchedCount = 0, i6 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
            if (outermost) {
              outermostContext = context == document3 || context || outermost;
            }
            for (; i6 !== len && (elem = elems[i6]) != null; i6++) {
              if (byElement && elem) {
                j2 = 0;
                if (!context && elem.ownerDocument != document3) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while (matcher = elementMatchers[j2++]) {
                  if (matcher(elem, context || document3, xml)) {
                    push2.call(results, elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if (elem = !matcher && elem) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i6;
            if (bySet && i6 !== matchedCount) {
              j2 = 0;
              while (matcher = setMatchers[j2++]) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i6--) {
                    if (!(unmatched[i6] || setMatched[i6])) {
                      setMatched[i6] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push2.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                jQuery4.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
          return bySet ? markFunction(superMatcher) : superMatcher;
        }
        function compile(selector, match) {
          var i6, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
          if (!cached) {
            if (!match) {
              match = tokenize(selector);
            }
            i6 = match.length;
            while (i6--) {
              cached = matcherFromTokens(match[i6]);
              if (cached[expando]) {
                setMatchers.push(cached);
              } else {
                elementMatchers.push(cached);
              }
            }
            cached = compilerCache(
              selector,
              matcherFromGroupMatchers(elementMatchers, setMatchers)
            );
            cached.selector = selector;
          }
          return cached;
        }
        function select(selector, context, results, seed) {
          var i6, tokens, token, type, find3, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
          results = results || [];
          if (match.length === 1) {
            tokens = match[0] = match[0].slice(0);
            if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
              context = (Expr.find.ID(
                token.matches[0].replace(runescape, funescape),
                context
              ) || [])[0];
              if (!context) {
                return results;
              } else if (compiled) {
                context = context.parentNode;
              }
              selector = selector.slice(tokens.shift().value.length);
            }
            i6 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
            while (i6--) {
              token = tokens[i6];
              if (Expr.relative[type = token.type]) {
                break;
              }
              if (find3 = Expr.find[type]) {
                if (seed = find3(
                  token.matches[0].replace(runescape, funescape),
                  rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                )) {
                  tokens.splice(i6, 1);
                  selector = seed.length && toSelector(tokens);
                  if (!selector) {
                    push2.apply(results, seed);
                    return results;
                  }
                  break;
                }
              }
            }
          }
          (compiled || compile(selector, match))(
            seed,
            context,
            !documentIsHTML,
            results,
            !context || rsibling.test(selector) && testContext(context.parentNode) || context
          );
          return results;
        }
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        setDocument();
        support.sortDetached = assert(function(el) {
          return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
        });
        jQuery4.find = find2;
        jQuery4.expr[":"] = jQuery4.expr.pseudos;
        jQuery4.unique = jQuery4.uniqueSort;
        find2.compile = compile;
        find2.select = select;
        find2.setDocument = setDocument;
        find2.tokenize = tokenize;
        find2.escape = jQuery4.escapeSelector;
        find2.getText = jQuery4.text;
        find2.isXML = jQuery4.isXMLDoc;
        find2.selectors = jQuery4.expr;
        find2.support = jQuery4.support;
        find2.uniqueSort = jQuery4.uniqueSort;
      })();
      var dir = function(elem, dir2, until) {
        var matched = [], truncate = until !== void 0;
        while ((elem = elem[dir2]) && elem.nodeType !== 9) {
          if (elem.nodeType === 1) {
            if (truncate && jQuery4(elem).is(until)) {
              break;
            }
            matched.push(elem);
          }
        }
        return matched;
      };
      var siblings = function(n5, elem) {
        var matched = [];
        for (; n5; n5 = n5.nextSibling) {
          if (n5.nodeType === 1 && n5 !== elem) {
            matched.push(n5);
          }
        }
        return matched;
      };
      var rneedsContext = jQuery4.expr.match.needsContext;
      var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
      function winnow(elements, qualifier, not) {
        if (isFunction2(qualifier)) {
          return jQuery4.grep(elements, function(elem, i5) {
            return !!qualifier.call(elem, i5, elem) !== not;
          });
        }
        if (qualifier.nodeType) {
          return jQuery4.grep(elements, function(elem) {
            return elem === qualifier !== not;
          });
        }
        if (typeof qualifier !== "string") {
          return jQuery4.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) > -1 !== not;
          });
        }
        return jQuery4.filter(qualifier, elements, not);
      }
      jQuery4.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
          expr = ":not(" + expr + ")";
        }
        if (elems.length === 1 && elem.nodeType === 1) {
          return jQuery4.find.matchesSelector(elem, expr) ? [elem] : [];
        }
        return jQuery4.find.matches(expr, jQuery4.grep(elems, function(elem2) {
          return elem2.nodeType === 1;
        }));
      };
      jQuery4.fn.extend({
        find: function(selector) {
          var i5, ret, len = this.length, self = this;
          if (typeof selector !== "string") {
            return this.pushStack(jQuery4(selector).filter(function() {
              for (i5 = 0; i5 < len; i5++) {
                if (jQuery4.contains(self[i5], this)) {
                  return true;
                }
              }
            }));
          }
          ret = this.pushStack([]);
          for (i5 = 0; i5 < len; i5++) {
            jQuery4.find(selector, self[i5], ret);
          }
          return len > 1 ? jQuery4.uniqueSort(ret) : ret;
        },
        filter: function(selector) {
          return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
          return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
          return !!winnow(
            this,
            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            typeof selector === "string" && rneedsContext.test(selector) ? jQuery4(selector) : selector || [],
            false
          ).length;
        }
      });
      var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init3 = jQuery4.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery4 ? context[0] : context;
              jQuery4.merge(this, jQuery4.parseHTML(
                match[1],
                context && context.nodeType ? context.ownerDocument || context : document2,
                true
              ));
              if (rsingleTag.test(match[1]) && jQuery4.isPlainObject(context)) {
                for (match in context) {
                  if (isFunction2(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document2.getElementById(match[2]);
              if (elem) {
                this[0] = elem;
                this.length = 1;
              }
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this[0] = selector;
          this.length = 1;
          return this;
        } else if (isFunction2(selector)) {
          return root.ready !== void 0 ? root.ready(selector) : (
            // Execute immediately if ready is not present
            selector(jQuery4)
          );
        }
        return jQuery4.makeArray(selector, this);
      };
      init3.prototype = jQuery4.fn;
      rootjQuery = jQuery4(document2);
      var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
      jQuery4.fn.extend({
        has: function(target) {
          var targets = jQuery4(target, this), l3 = targets.length;
          return this.filter(function() {
            var i5 = 0;
            for (; i5 < l3; i5++) {
              if (jQuery4.contains(this, targets[i5])) {
                return true;
              }
            }
          });
        },
        closest: function(selectors, context) {
          var cur, i5 = 0, l3 = this.length, matched = [], targets = typeof selectors !== "string" && jQuery4(selectors);
          if (!rneedsContext.test(selectors)) {
            for (; i5 < l3; i5++) {
              for (cur = this[i5]; cur && cur !== context; cur = cur.parentNode) {
                if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                  // Don't pass non-elements to jQuery#find
                  cur.nodeType === 1 && jQuery4.find.matchesSelector(cur, selectors)
                ))) {
                  matched.push(cur);
                  break;
                }
              }
            }
          }
          return this.pushStack(matched.length > 1 ? jQuery4.uniqueSort(matched) : matched);
        },
        // Determine the position of an element within the set
        index: function(elem) {
          if (!elem) {
            return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
          }
          if (typeof elem === "string") {
            return indexOf.call(jQuery4(elem), this[0]);
          }
          return indexOf.call(
            this,
            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[0] : elem
          );
        },
        add: function(selector, context) {
          return this.pushStack(
            jQuery4.uniqueSort(
              jQuery4.merge(this.get(), jQuery4(selector, context))
            )
          );
        },
        addBack: function(selector) {
          return this.add(
            selector == null ? this.prevObject : this.prevObject.filter(selector)
          );
        }
      });
      function sibling(cur, dir2) {
        while ((cur = cur[dir2]) && cur.nodeType !== 1) {
        }
        return cur;
      }
      jQuery4.each({
        parent: function(elem) {
          var parent = elem.parentNode;
          return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
          return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, _i, until) {
          return dir(elem, "parentNode", until);
        },
        next: function(elem) {
          return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
          return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
          return dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
          return dir(elem, "previousSibling");
        },
        nextUntil: function(elem, _i, until) {
          return dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, _i, until) {
          return dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
          return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
          return siblings(elem.firstChild);
        },
        contents: function(elem) {
          if (elem.contentDocument != null && // Support: IE 11+
          // <object> elements with no `data` attribute has an object
          // `contentDocument` with a `null` prototype.
          getProto(elem.contentDocument)) {
            return elem.contentDocument;
          }
          if (nodeName(elem, "template")) {
            elem = elem.content || elem;
          }
          return jQuery4.merge([], elem.childNodes);
        }
      }, function(name, fn) {
        jQuery4.fn[name] = function(until, selector) {
          var matched = jQuery4.map(this, fn, until);
          if (name.slice(-5) !== "Until") {
            selector = until;
          }
          if (selector && typeof selector === "string") {
            matched = jQuery4.filter(selector, matched);
          }
          if (this.length > 1) {
            if (!guaranteedUnique[name]) {
              jQuery4.uniqueSort(matched);
            }
            if (rparentsprev.test(name)) {
              matched.reverse();
            }
          }
          return this.pushStack(matched);
        };
      });
      var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
      function createOptions(options) {
        var object = {};
        jQuery4.each(options.match(rnothtmlwhite) || [], function(_2, flag) {
          object[flag] = true;
        });
        return object;
      }
      jQuery4.Callbacks = function(options) {
        options = typeof options === "string" ? createOptions(options) : jQuery4.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
          locked = locked || options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        }, self = {
          // Add a callback or a collection of callbacks to the list
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery4.each(args, function(_2, arg) {
                  if (isFunction2(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && toType(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function() {
            jQuery4.each(arguments, function(_2, arg) {
              var index;
              while ((index = jQuery4.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          // Check if a given callback is in the list.
          // If no argument is given, return whether or not list has callbacks attached.
          has: function(fn) {
            return fn ? jQuery4.inArray(fn, list) > -1 : list.length > 0;
          },
          // Remove all callbacks from the list
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          // Disable .fire and .add
          // Abort any current/pending executions
          // Clear all callbacks and values
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          // Disable .fire
          // Also disable .add unless we have memory (since it would have no effect)
          // Abort any pending executions
          lock: function() {
            locked = queue = [];
            if (!memory && !firing) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function() {
            return !!fired;
          }
        };
        return self;
      };
      function Identity(v2) {
        return v2;
      }
      function Thrower(ex) {
        throw ex;
      }
      function adoptValue(value, resolve, reject, noValue) {
        var method;
        try {
          if (value && isFunction2(method = value.promise)) {
            method.call(value).done(resolve).fail(reject);
          } else if (value && isFunction2(method = value.then)) {
            method.call(value, resolve, reject);
          } else {
            resolve.apply(void 0, [value].slice(noValue));
          }
        } catch (value2) {
          reject.apply(void 0, [value2]);
        }
      }
      jQuery4.extend({
        Deferred: function(func) {
          var tuples = [
            // action, add listener, callbacks,
            // ... .then handlers, argument index, [final state]
            [
              "notify",
              "progress",
              jQuery4.Callbacks("memory"),
              jQuery4.Callbacks("memory"),
              2
            ],
            [
              "resolve",
              "done",
              jQuery4.Callbacks("once memory"),
              jQuery4.Callbacks("once memory"),
              0,
              "resolved"
            ],
            [
              "reject",
              "fail",
              jQuery4.Callbacks("once memory"),
              jQuery4.Callbacks("once memory"),
              1,
              "rejected"
            ]
          ], state = "pending", promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            "catch": function(fn) {
              return promise.then(null, fn);
            },
            // Keep pipe for back-compat
            pipe: function() {
              var fns = arguments;
              return jQuery4.Deferred(function(newDefer) {
                jQuery4.each(tuples, function(_i, tuple) {
                  var fn = isFunction2(fns[tuple[4]]) && fns[tuple[4]];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && isFunction2(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](
                        this,
                        fn ? [returned] : arguments
                      );
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            then: function(onFulfilled, onRejected, onProgress) {
              var maxDepth = 0;
              function resolve(depth, deferred2, handler, special) {
                return function() {
                  var that = this, args = arguments, mightThrow = function() {
                    var returned, then;
                    if (depth < maxDepth) {
                      return;
                    }
                    returned = handler.apply(that, args);
                    if (returned === deferred2.promise()) {
                      throw new TypeError("Thenable self-resolution");
                    }
                    then = returned && // Support: Promises/A+ section 2.3.4
                    // https://promisesaplus.com/#point-64
                    // Only check objects and functions for thenability
                    (typeof returned === "object" || typeof returned === "function") && returned.then;
                    if (isFunction2(then)) {
                      if (special) {
                        then.call(
                          returned,
                          resolve(maxDepth, deferred2, Identity, special),
                          resolve(maxDepth, deferred2, Thrower, special)
                        );
                      } else {
                        maxDepth++;
                        then.call(
                          returned,
                          resolve(maxDepth, deferred2, Identity, special),
                          resolve(maxDepth, deferred2, Thrower, special),
                          resolve(
                            maxDepth,
                            deferred2,
                            Identity,
                            deferred2.notifyWith
                          )
                        );
                      }
                    } else {
                      if (handler !== Identity) {
                        that = void 0;
                        args = [returned];
                      }
                      (special || deferred2.resolveWith)(that, args);
                    }
                  }, process = special ? mightThrow : function() {
                    try {
                      mightThrow();
                    } catch (e5) {
                      if (jQuery4.Deferred.exceptionHook) {
                        jQuery4.Deferred.exceptionHook(
                          e5,
                          process.error
                        );
                      }
                      if (depth + 1 >= maxDepth) {
                        if (handler !== Thrower) {
                          that = void 0;
                          args = [e5];
                        }
                        deferred2.rejectWith(that, args);
                      }
                    }
                  };
                  if (depth) {
                    process();
                  } else {
                    if (jQuery4.Deferred.getErrorHook) {
                      process.error = jQuery4.Deferred.getErrorHook();
                    } else if (jQuery4.Deferred.getStackHook) {
                      process.error = jQuery4.Deferred.getStackHook();
                    }
                    window2.setTimeout(process);
                  }
                };
              }
              return jQuery4.Deferred(function(newDefer) {
                tuples[0][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction2(onProgress) ? onProgress : Identity,
                    newDefer.notifyWith
                  )
                );
                tuples[1][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction2(onFulfilled) ? onFulfilled : Identity
                  )
                );
                tuples[2][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction2(onRejected) ? onRejected : Thrower
                  )
                );
              }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function(obj) {
              return obj != null ? jQuery4.extend(obj, promise) : promise;
            }
          }, deferred = {};
          jQuery4.each(tuples, function(i5, tuple) {
            var list = tuple[2], stateString = tuple[5];
            promise[tuple[1]] = list.add;
            if (stateString) {
              list.add(
                function() {
                  state = stateString;
                },
                // rejected_callbacks.disable
                // fulfilled_callbacks.disable
                tuples[3 - i5][2].disable,
                // rejected_handlers.disable
                // fulfilled_handlers.disable
                tuples[3 - i5][3].disable,
                // progress_callbacks.lock
                tuples[0][2].lock,
                // progress_handlers.lock
                tuples[0][3].lock
              );
            }
            list.add(tuple[3].fire);
            deferred[tuple[0]] = function() {
              deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
              return this;
            };
            deferred[tuple[0] + "With"] = list.fireWith;
          });
          promise.promise(deferred);
          if (func) {
            func.call(deferred, deferred);
          }
          return deferred;
        },
        // Deferred helper
        when: function(singleValue) {
          var remaining = arguments.length, i5 = remaining, resolveContexts = Array(i5), resolveValues = slice.call(arguments), primary = jQuery4.Deferred(), updateFunc = function(i6) {
            return function(value) {
              resolveContexts[i6] = this;
              resolveValues[i6] = arguments.length > 1 ? slice.call(arguments) : value;
              if (!--remaining) {
                primary.resolveWith(resolveContexts, resolveValues);
              }
            };
          };
          if (remaining <= 1) {
            adoptValue(
              singleValue,
              primary.done(updateFunc(i5)).resolve,
              primary.reject,
              !remaining
            );
            if (primary.state() === "pending" || isFunction2(resolveValues[i5] && resolveValues[i5].then)) {
              return primary.then();
            }
          }
          while (i5--) {
            adoptValue(resolveValues[i5], updateFunc(i5), primary.reject);
          }
          return primary.promise();
        }
      });
      var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      jQuery4.Deferred.exceptionHook = function(error, asyncError) {
        if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
          window2.console.warn(
            "jQuery.Deferred exception: " + error.message,
            error.stack,
            asyncError
          );
        }
      };
      jQuery4.readyException = function(error) {
        window2.setTimeout(function() {
          throw error;
        });
      };
      var readyList = jQuery4.Deferred();
      jQuery4.fn.ready = function(fn) {
        readyList.then(fn).catch(function(error) {
          jQuery4.readyException(error);
        });
        return this;
      };
      jQuery4.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
        // A counter to track how many items to wait for before
        // the ready event fires. See trac-6781
        readyWait: 1,
        // Handle when the DOM is ready
        ready: function(wait) {
          if (wait === true ? --jQuery4.readyWait : jQuery4.isReady) {
            return;
          }
          jQuery4.isReady = true;
          if (wait !== true && --jQuery4.readyWait > 0) {
            return;
          }
          readyList.resolveWith(document2, [jQuery4]);
        }
      });
      jQuery4.ready.then = readyList.then;
      function completed() {
        document2.removeEventListener("DOMContentLoaded", completed);
        window2.removeEventListener("load", completed);
        jQuery4.ready();
      }
      if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
        window2.setTimeout(jQuery4.ready);
      } else {
        document2.addEventListener("DOMContentLoaded", completed);
        window2.addEventListener("load", completed);
      }
      var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i5 = 0, len = elems.length, bulk = key == null;
        if (toType(key) === "object") {
          chainable = true;
          for (i5 in key) {
            access(elems, fn, i5, key[i5], true, emptyGet, raw);
          }
        } else if (value !== void 0) {
          chainable = true;
          if (!isFunction2(value)) {
            raw = true;
          }
          if (bulk) {
            if (raw) {
              fn.call(elems, value);
              fn = null;
            } else {
              bulk = fn;
              fn = function(elem, _key, value2) {
                return bulk.call(jQuery4(elem), value2);
              };
            }
          }
          if (fn) {
            for (; i5 < len; i5++) {
              fn(
                elems[i5],
                key,
                raw ? value : value.call(elems[i5], i5, fn(elems[i5], key))
              );
            }
          }
        }
        if (chainable) {
          return elems;
        }
        if (bulk) {
          return fn.call(elems);
        }
        return len ? fn(elems[0], key) : emptyGet;
      };
      var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
      function fcamelCase(_all, letter) {
        return letter.toUpperCase();
      }
      function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
      }
      var acceptData = function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
      };
      function Data() {
        this.expando = jQuery4.expando + Data.uid++;
      }
      Data.uid = 1;
      Data.prototype = {
        cache: function(owner) {
          var value = owner[this.expando];
          if (!value) {
            value = {};
            if (acceptData(owner)) {
              if (owner.nodeType) {
                owner[this.expando] = value;
              } else {
                Object.defineProperty(owner, this.expando, {
                  value,
                  configurable: true
                });
              }
            }
          }
          return value;
        },
        set: function(owner, data, value) {
          var prop, cache = this.cache(owner);
          if (typeof data === "string") {
            cache[camelCase(data)] = value;
          } else {
            for (prop in data) {
              cache[camelCase(prop)] = data[prop];
            }
          }
          return cache;
        },
        get: function(owner, key) {
          return key === void 0 ? this.cache(owner) : (
            // Always use camelCase key (gh-2257)
            owner[this.expando] && owner[this.expando][camelCase(key)]
          );
        },
        access: function(owner, key, value) {
          if (key === void 0 || key && typeof key === "string" && value === void 0) {
            return this.get(owner, key);
          }
          this.set(owner, key, value);
          return value !== void 0 ? value : key;
        },
        remove: function(owner, key) {
          var i5, cache = owner[this.expando];
          if (cache === void 0) {
            return;
          }
          if (key !== void 0) {
            if (Array.isArray(key)) {
              key = key.map(camelCase);
            } else {
              key = camelCase(key);
              key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
            }
            i5 = key.length;
            while (i5--) {
              delete cache[key[i5]];
            }
          }
          if (key === void 0 || jQuery4.isEmptyObject(cache)) {
            if (owner.nodeType) {
              owner[this.expando] = void 0;
            } else {
              delete owner[this.expando];
            }
          }
        },
        hasData: function(owner) {
          var cache = owner[this.expando];
          return cache !== void 0 && !jQuery4.isEmptyObject(cache);
        }
      };
      var dataPriv = new Data();
      var dataUser = new Data();
      var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
      function getData(data) {
        if (data === "true") {
          return true;
        }
        if (data === "false") {
          return false;
        }
        if (data === "null") {
          return null;
        }
        if (data === +data + "") {
          return +data;
        }
        if (rbrace.test(data)) {
          return JSON.parse(data);
        }
        return data;
      }
      function dataAttr(elem, key, data) {
        var name;
        if (data === void 0 && elem.nodeType === 1) {
          name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
          data = elem.getAttribute(name);
          if (typeof data === "string") {
            try {
              data = getData(data);
            } catch (e5) {
            }
            dataUser.set(elem, key, data);
          } else {
            data = void 0;
          }
        }
        return data;
      }
      jQuery4.extend({
        hasData: function(elem) {
          return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },
        data: function(elem, name, data) {
          return dataUser.access(elem, name, data);
        },
        removeData: function(elem, name) {
          dataUser.remove(elem, name);
        },
        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function(elem, name, data) {
          return dataPriv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
          dataPriv.remove(elem, name);
        }
      });
      jQuery4.fn.extend({
        data: function(key, value) {
          var i5, name, data, elem = this[0], attrs = elem && elem.attributes;
          if (key === void 0) {
            if (this.length) {
              data = dataUser.get(elem);
              if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                i5 = attrs.length;
                while (i5--) {
                  if (attrs[i5]) {
                    name = attrs[i5].name;
                    if (name.indexOf("data-") === 0) {
                      name = camelCase(name.slice(5));
                      dataAttr(elem, name, data[name]);
                    }
                  }
                }
                dataPriv.set(elem, "hasDataAttrs", true);
              }
            }
            return data;
          }
          if (typeof key === "object") {
            return this.each(function() {
              dataUser.set(this, key);
            });
          }
          return access(this, function(value2) {
            var data2;
            if (elem && value2 === void 0) {
              data2 = dataUser.get(elem, key);
              if (data2 !== void 0) {
                return data2;
              }
              data2 = dataAttr(elem, key);
              if (data2 !== void 0) {
                return data2;
              }
              return;
            }
            this.each(function() {
              dataUser.set(this, key, value2);
            });
          }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
          return this.each(function() {
            dataUser.remove(this, key);
          });
        }
      });
      jQuery4.extend({
        queue: function(elem, type, data) {
          var queue;
          if (elem) {
            type = (type || "fx") + "queue";
            queue = dataPriv.get(elem, type);
            if (data) {
              if (!queue || Array.isArray(data)) {
                queue = dataPriv.access(elem, type, jQuery4.makeArray(data));
              } else {
                queue.push(data);
              }
            }
            return queue || [];
          }
        },
        dequeue: function(elem, type) {
          type = type || "fx";
          var queue = jQuery4.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery4._queueHooks(elem, type), next = function() {
            jQuery4.dequeue(elem, type);
          };
          if (fn === "inprogress") {
            fn = queue.shift();
            startLength--;
          }
          if (fn) {
            if (type === "fx") {
              queue.unshift("inprogress");
            }
            delete hooks.stop;
            fn.call(elem, next, hooks);
          }
          if (!startLength && hooks) {
            hooks.empty.fire();
          }
        },
        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function(elem, type) {
          var key = type + "queueHooks";
          return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
            empty: jQuery4.Callbacks("once memory").add(function() {
              dataPriv.remove(elem, [type + "queue", key]);
            })
          });
        }
      });
      jQuery4.fn.extend({
        queue: function(type, data) {
          var setter = 2;
          if (typeof type !== "string") {
            data = type;
            type = "fx";
            setter--;
          }
          if (arguments.length < setter) {
            return jQuery4.queue(this[0], type);
          }
          return data === void 0 ? this : this.each(function() {
            var queue = jQuery4.queue(this, type, data);
            jQuery4._queueHooks(this, type);
            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery4.dequeue(this, type);
            }
          });
        },
        dequeue: function(type) {
          return this.each(function() {
            jQuery4.dequeue(this, type);
          });
        },
        clearQueue: function(type) {
          return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(type, obj) {
          var tmp, count = 1, defer = jQuery4.Deferred(), elements = this, i5 = this.length, resolve = function() {
            if (!--count) {
              defer.resolveWith(elements, [elements]);
            }
          };
          if (typeof type !== "string") {
            obj = type;
            type = void 0;
          }
          type = type || "fx";
          while (i5--) {
            tmp = dataPriv.get(elements[i5], type + "queueHooks");
            if (tmp && tmp.empty) {
              count++;
              tmp.empty.add(resolve);
            }
          }
          resolve();
          return defer.promise(obj);
        }
      });
      var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
      var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
      var cssExpand = ["Top", "Right", "Bottom", "Left"];
      var documentElement = document2.documentElement;
      var isAttached = function(elem) {
        return jQuery4.contains(elem.ownerDocument, elem);
      }, composed = { composed: true };
      if (documentElement.getRootNode) {
        isAttached = function(elem) {
          return jQuery4.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
        };
      }
      var isHiddenWithinTree = function(elem, el) {
        elem = el || elem;
        return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
        // Support: Firefox <=43 - 45
        // Disconnected elements can have computed display: none, so first confirm that elem is
        // in the document.
        isAttached(elem) && jQuery4.css(elem, "display") === "none";
      };
      function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery4.css(elem, prop, "");
        }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery4.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery4.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery4.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
          initial = initial / 2;
          unit = unit || initialInUnit[3];
          initialInUnit = +initial || 1;
          while (maxIterations--) {
            jQuery4.style(elem, prop, initialInUnit + unit);
            if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
              maxIterations = 0;
            }
            initialInUnit = initialInUnit / scale;
          }
          initialInUnit = initialInUnit * 2;
          jQuery4.style(elem, prop, initialInUnit + unit);
          valueParts = valueParts || [];
        }
        if (valueParts) {
          initialInUnit = +initialInUnit || +initial || 0;
          adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
          if (tween) {
            tween.unit = unit;
            tween.start = initialInUnit;
            tween.end = adjusted;
          }
        }
        return adjusted;
      }
      var defaultDisplayMap = {};
      function getDefaultDisplay(elem) {
        var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
        if (display) {
          return display;
        }
        temp = doc.body.appendChild(doc.createElement(nodeName2));
        display = jQuery4.css(temp, "display");
        temp.parentNode.removeChild(temp);
        if (display === "none") {
          display = "block";
        }
        defaultDisplayMap[nodeName2] = display;
        return display;
      }
      function showHide(elements, show) {
        var display, elem, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
          elem = elements[index];
          if (!elem.style) {
            continue;
          }
          display = elem.style.display;
          if (show) {
            if (display === "none") {
              values[index] = dataPriv.get(elem, "display") || null;
              if (!values[index]) {
                elem.style.display = "";
              }
            }
            if (elem.style.display === "" && isHiddenWithinTree(elem)) {
              values[index] = getDefaultDisplay(elem);
            }
          } else {
            if (display !== "none") {
              values[index] = "none";
              dataPriv.set(elem, "display", display);
            }
          }
        }
        for (index = 0; index < length; index++) {
          if (values[index] != null) {
            elements[index].style.display = values[index];
          }
        }
        return elements;
      }
      jQuery4.fn.extend({
        show: function() {
          return showHide(this, true);
        },
        hide: function() {
          return showHide(this);
        },
        toggle: function(state) {
          if (typeof state === "boolean") {
            return state ? this.show() : this.hide();
          }
          return this.each(function() {
            if (isHiddenWithinTree(this)) {
              jQuery4(this).show();
            } else {
              jQuery4(this).hide();
            }
          });
        }
      });
      var rcheckableType = /^(?:checkbox|radio)$/i;
      var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
      var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
      (function() {
        var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        div.innerHTML = "<option></option>";
        support.option = !!div.lastChild;
      })();
      var wrapMap = {
        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
      wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
      wrapMap.th = wrapMap.td;
      if (!support.option) {
        wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
      }
      function getAll(context, tag) {
        var ret;
        if (typeof context.getElementsByTagName !== "undefined") {
          ret = context.getElementsByTagName(tag || "*");
        } else if (typeof context.querySelectorAll !== "undefined") {
          ret = context.querySelectorAll(tag || "*");
        } else {
          ret = [];
        }
        if (tag === void 0 || tag && nodeName(context, tag)) {
          return jQuery4.merge([context], ret);
        }
        return ret;
      }
      function setGlobalEval(elems, refElements) {
        var i5 = 0, l3 = elems.length;
        for (; i5 < l3; i5++) {
          dataPriv.set(
            elems[i5],
            "globalEval",
            !refElements || dataPriv.get(refElements[i5], "globalEval")
          );
        }
      }
      var rhtml = /<|&#?\w+;/;
      function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, attached, j2, fragment = context.createDocumentFragment(), nodes = [], i5 = 0, l3 = elems.length;
        for (; i5 < l3; i5++) {
          elem = elems[i5];
          if (elem || elem === 0) {
            if (toType(elem) === "object") {
              jQuery4.merge(nodes, elem.nodeType ? [elem] : elem);
            } else if (!rhtml.test(elem)) {
              nodes.push(context.createTextNode(elem));
            } else {
              tmp = tmp || fragment.appendChild(context.createElement("div"));
              tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + jQuery4.htmlPrefilter(elem) + wrap[2];
              j2 = wrap[0];
              while (j2--) {
                tmp = tmp.lastChild;
              }
              jQuery4.merge(nodes, tmp.childNodes);
              tmp = fragment.firstChild;
              tmp.textContent = "";
            }
          }
        }
        fragment.textContent = "";
        i5 = 0;
        while (elem = nodes[i5++]) {
          if (selection && jQuery4.inArray(elem, selection) > -1) {
            if (ignored) {
              ignored.push(elem);
            }
            continue;
          }
          attached = isAttached(elem);
          tmp = getAll(fragment.appendChild(elem), "script");
          if (attached) {
            setGlobalEval(tmp);
          }
          if (scripts) {
            j2 = 0;
            while (elem = tmp[j2++]) {
              if (rscriptType.test(elem.type || "")) {
                scripts.push(elem);
              }
            }
          }
        }
        return fragment;
      }
      var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
      function returnTrue() {
        return true;
      }
      function returnFalse() {
        return false;
      }
      function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if (typeof types === "object") {
          if (typeof selector !== "string") {
            data = data || selector;
            selector = void 0;
          }
          for (type in types) {
            on(elem, type, selector, data, types[type], one);
          }
          return elem;
        }
        if (data == null && fn == null) {
          fn = selector;
          data = selector = void 0;
        } else if (fn == null) {
          if (typeof selector === "string") {
            fn = data;
            data = void 0;
          } else {
            fn = data;
            data = selector;
            selector = void 0;
          }
        }
        if (fn === false) {
          fn = returnFalse;
        } else if (!fn) {
          return elem;
        }
        if (one === 1) {
          origFn = fn;
          fn = function(event) {
            jQuery4().off(event);
            return origFn.apply(this, arguments);
          };
          fn.guid = origFn.guid || (origFn.guid = jQuery4.guid++);
        }
        return elem.each(function() {
          jQuery4.event.add(this, types, fn, data, selector);
        });
      }
      jQuery4.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
          var handleObjIn, eventHandle, tmp, events, t4, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
          if (!acceptData(elem)) {
            return;
          }
          if (handler.handler) {
            handleObjIn = handler;
            handler = handleObjIn.handler;
            selector = handleObjIn.selector;
          }
          if (selector) {
            jQuery4.find.matchesSelector(documentElement, selector);
          }
          if (!handler.guid) {
            handler.guid = jQuery4.guid++;
          }
          if (!(events = elemData.events)) {
            events = elemData.events = /* @__PURE__ */ Object.create(null);
          }
          if (!(eventHandle = elemData.handle)) {
            eventHandle = elemData.handle = function(e5) {
              return typeof jQuery4 !== "undefined" && jQuery4.event.triggered !== e5.type ? jQuery4.event.dispatch.apply(elem, arguments) : void 0;
            };
          }
          types = (types || "").match(rnothtmlwhite) || [""];
          t4 = types.length;
          while (t4--) {
            tmp = rtypenamespace.exec(types[t4]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();
            if (!type) {
              continue;
            }
            special = jQuery4.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            special = jQuery4.event.special[type] || {};
            handleObj = jQuery4.extend({
              type,
              origType,
              data,
              handler,
              guid: handler.guid,
              selector,
              needsContext: selector && jQuery4.expr.match.needsContext.test(selector),
              namespace: namespaces.join(".")
            }, handleObjIn);
            if (!(handlers = events[type])) {
              handlers = events[type] = [];
              handlers.delegateCount = 0;
              if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                if (elem.addEventListener) {
                  elem.addEventListener(type, eventHandle);
                }
              }
            }
            if (special.add) {
              special.add.call(elem, handleObj);
              if (!handleObj.handler.guid) {
                handleObj.handler.guid = handler.guid;
              }
            }
            if (selector) {
              handlers.splice(handlers.delegateCount++, 0, handleObj);
            } else {
              handlers.push(handleObj);
            }
            jQuery4.event.global[type] = true;
          }
        },
        // Detach an event or set of events from an element
        remove: function(elem, types, handler, selector, mappedTypes) {
          var j2, origCount, tmp, events, t4, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
          if (!elemData || !(events = elemData.events)) {
            return;
          }
          types = (types || "").match(rnothtmlwhite) || [""];
          t4 = types.length;
          while (t4--) {
            tmp = rtypenamespace.exec(types[t4]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();
            if (!type) {
              for (type in events) {
                jQuery4.event.remove(elem, type + types[t4], handler, selector, true);
              }
              continue;
            }
            special = jQuery4.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
            origCount = j2 = handlers.length;
            while (j2--) {
              handleObj = handlers[j2];
              if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                handlers.splice(j2, 1);
                if (handleObj.selector) {
                  handlers.delegateCount--;
                }
                if (special.remove) {
                  special.remove.call(elem, handleObj);
                }
              }
            }
            if (origCount && !handlers.length) {
              if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                jQuery4.removeEvent(elem, type, elemData.handle);
              }
              delete events[type];
            }
          }
          if (jQuery4.isEmptyObject(events)) {
            dataPriv.remove(elem, "handle events");
          }
        },
        dispatch: function(nativeEvent) {
          var i5, j2, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery4.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery4.event.special[event.type] || {};
          args[0] = event;
          for (i5 = 1; i5 < arguments.length; i5++) {
            args[i5] = arguments[i5];
          }
          event.delegateTarget = this;
          if (special.preDispatch && special.preDispatch.call(this, event) === false) {
            return;
          }
          handlerQueue = jQuery4.event.handlers.call(this, event, handlers);
          i5 = 0;
          while ((matched = handlerQueue[i5++]) && !event.isPropagationStopped()) {
            event.currentTarget = matched.elem;
            j2 = 0;
            while ((handleObj = matched.handlers[j2++]) && !event.isImmediatePropagationStopped()) {
              if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                event.handleObj = handleObj;
                event.data = handleObj.data;
                ret = ((jQuery4.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                if (ret !== void 0) {
                  if ((event.result = ret) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }
              }
            }
          }
          if (special.postDispatch) {
            special.postDispatch.call(this, event);
          }
          return event.result;
        },
        handlers: function(event, handlers) {
          var i5, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
          if (delegateCount && // Support: IE <=9
          // Black-hole SVG <use> instance trees (trac-13180)
          cur.nodeType && // Support: Firefox <=42
          // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
          // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
          // Support: IE 11 only
          // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
          !(event.type === "click" && event.button >= 1)) {
            for (; cur !== this; cur = cur.parentNode || this) {
              if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                matchedHandlers = [];
                matchedSelectors = {};
                for (i5 = 0; i5 < delegateCount; i5++) {
                  handleObj = handlers[i5];
                  sel = handleObj.selector + " ";
                  if (matchedSelectors[sel] === void 0) {
                    matchedSelectors[sel] = handleObj.needsContext ? jQuery4(sel, this).index(cur) > -1 : jQuery4.find(sel, this, null, [cur]).length;
                  }
                  if (matchedSelectors[sel]) {
                    matchedHandlers.push(handleObj);
                  }
                }
                if (matchedHandlers.length) {
                  handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                }
              }
            }
          }
          cur = this;
          if (delegateCount < handlers.length) {
            handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
          }
          return handlerQueue;
        },
        addProp: function(name, hook) {
          Object.defineProperty(jQuery4.Event.prototype, name, {
            enumerable: true,
            configurable: true,
            get: isFunction2(hook) ? function() {
              if (this.originalEvent) {
                return hook(this.originalEvent);
              }
            } : function() {
              if (this.originalEvent) {
                return this.originalEvent[name];
              }
            },
            set: function(value) {
              Object.defineProperty(this, name, {
                enumerable: true,
                configurable: true,
                writable: true,
                value
              });
            }
          });
        },
        fix: function(originalEvent) {
          return originalEvent[jQuery4.expando] ? originalEvent : new jQuery4.Event(originalEvent);
        },
        special: {
          load: {
            // Prevent triggered image.load events from bubbling to window.load
            noBubble: true
          },
          click: {
            // Utilize native event to ensure correct state for checkable inputs
            setup: function(data) {
              var el = this || data;
              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click", true);
              }
              return false;
            },
            trigger: function(data) {
              var el = this || data;
              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click");
              }
              return true;
            },
            // For cross-browser consistency, suppress native .click() on links
            // Also prevent it if we're currently inside a leveraged native-event stack
            _default: function(event) {
              var target = event.target;
              return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
            }
          },
          beforeunload: {
            postDispatch: function(event) {
              if (event.result !== void 0 && event.originalEvent) {
                event.originalEvent.returnValue = event.result;
              }
            }
          }
        }
      };
      function leverageNative(el, type, isSetup) {
        if (!isSetup) {
          if (dataPriv.get(el, type) === void 0) {
            jQuery4.event.add(el, type, returnTrue);
          }
          return;
        }
        dataPriv.set(el, type, false);
        jQuery4.event.add(el, type, {
          namespace: false,
          handler: function(event) {
            var result, saved = dataPriv.get(this, type);
            if (event.isTrigger & 1 && this[type]) {
              if (!saved) {
                saved = slice.call(arguments);
                dataPriv.set(this, type, saved);
                this[type]();
                result = dataPriv.get(this, type);
                dataPriv.set(this, type, false);
                if (saved !== result) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                  return result;
                }
              } else if ((jQuery4.event.special[type] || {}).delegateType) {
                event.stopPropagation();
              }
            } else if (saved) {
              dataPriv.set(this, type, jQuery4.event.trigger(
                saved[0],
                saved.slice(1),
                this
              ));
              event.stopPropagation();
              event.isImmediatePropagationStopped = returnTrue;
            }
          }
        });
      }
      jQuery4.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
          elem.removeEventListener(type, handle);
        }
      };
      jQuery4.Event = function(src, props) {
        if (!(this instanceof jQuery4.Event)) {
          return new jQuery4.Event(src, props);
        }
        if (src && src.type) {
          this.originalEvent = src;
          this.type = src.type;
          this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
          src.returnValue === false ? returnTrue : returnFalse;
          this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
          this.currentTarget = src.currentTarget;
          this.relatedTarget = src.relatedTarget;
        } else {
          this.type = src;
        }
        if (props) {
          jQuery4.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || Date.now();
        this[jQuery4.expando] = true;
      };
      jQuery4.Event.prototype = {
        constructor: jQuery4.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
        preventDefault: function() {
          var e5 = this.originalEvent;
          this.isDefaultPrevented = returnTrue;
          if (e5 && !this.isSimulated) {
            e5.preventDefault();
          }
        },
        stopPropagation: function() {
          var e5 = this.originalEvent;
          this.isPropagationStopped = returnTrue;
          if (e5 && !this.isSimulated) {
            e5.stopPropagation();
          }
        },
        stopImmediatePropagation: function() {
          var e5 = this.originalEvent;
          this.isImmediatePropagationStopped = returnTrue;
          if (e5 && !this.isSimulated) {
            e5.stopImmediatePropagation();
          }
          this.stopPropagation();
        }
      };
      jQuery4.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: true
      }, jQuery4.event.addProp);
      jQuery4.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
        function focusMappedHandler(nativeEvent) {
          if (document2.documentMode) {
            var handle = dataPriv.get(this, "handle"), event = jQuery4.event.fix(nativeEvent);
            event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
            event.isSimulated = true;
            handle(nativeEvent);
            if (event.target === event.currentTarget) {
              handle(event);
            }
          } else {
            jQuery4.event.simulate(
              delegateType,
              nativeEvent.target,
              jQuery4.event.fix(nativeEvent)
            );
          }
        }
        jQuery4.event.special[type] = {
          // Utilize native event if possible so blur/focus sequence is correct
          setup: function() {
            var attaches;
            leverageNative(this, type, true);
            if (document2.documentMode) {
              attaches = dataPriv.get(this, delegateType);
              if (!attaches) {
                this.addEventListener(delegateType, focusMappedHandler);
              }
              dataPriv.set(this, delegateType, (attaches || 0) + 1);
            } else {
              return false;
            }
          },
          trigger: function() {
            leverageNative(this, type);
            return true;
          },
          teardown: function() {
            var attaches;
            if (document2.documentMode) {
              attaches = dataPriv.get(this, delegateType) - 1;
              if (!attaches) {
                this.removeEventListener(delegateType, focusMappedHandler);
                dataPriv.remove(this, delegateType);
              } else {
                dataPriv.set(this, delegateType, attaches);
              }
            } else {
              return false;
            }
          },
          // Suppress native focus or blur if we're currently inside
          // a leveraged native-event stack
          _default: function(event) {
            return dataPriv.get(event.target, type);
          },
          delegateType
        };
        jQuery4.event.special[delegateType] = {
          setup: function() {
            var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType);
            if (!attaches) {
              if (document2.documentMode) {
                this.addEventListener(delegateType, focusMappedHandler);
              } else {
                doc.addEventListener(type, focusMappedHandler, true);
              }
            }
            dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
          },
          teardown: function() {
            var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType) - 1;
            if (!attaches) {
              if (document2.documentMode) {
                this.removeEventListener(delegateType, focusMappedHandler);
              } else {
                doc.removeEventListener(type, focusMappedHandler, true);
              }
              dataPriv.remove(dataHolder, delegateType);
            } else {
              dataPriv.set(dataHolder, delegateType, attaches);
            }
          }
        };
      });
      jQuery4.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
      }, function(orig, fix) {
        jQuery4.event.special[orig] = {
          delegateType: fix,
          bindType: fix,
          handle: function(event) {
            var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
            if (!related || related !== target && !jQuery4.contains(target, related)) {
              event.type = handleObj.origType;
              ret = handleObj.handler.apply(this, arguments);
              event.type = fix;
            }
            return ret;
          }
        };
      });
      jQuery4.fn.extend({
        on: function(types, selector, data, fn) {
          return on(this, types, selector, data, fn);
        },
        one: function(types, selector, data, fn) {
          return on(this, types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
          var handleObj, type;
          if (types && types.preventDefault && types.handleObj) {
            handleObj = types.handleObj;
            jQuery4(types.delegateTarget).off(
              handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
              handleObj.selector,
              handleObj.handler
            );
            return this;
          }
          if (typeof types === "object") {
            for (type in types) {
              this.off(type, selector, types[type]);
            }
            return this;
          }
          if (selector === false || typeof selector === "function") {
            fn = selector;
            selector = void 0;
          }
          if (fn === false) {
            fn = returnFalse;
          }
          return this.each(function() {
            jQuery4.event.remove(this, types, fn, selector);
          });
        }
      });
      var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
      function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
          return jQuery4(elem).children("tbody")[0] || elem;
        }
        return elem;
      }
      function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
      }
      function restoreScript(elem) {
        if ((elem.type || "").slice(0, 5) === "true/") {
          elem.type = elem.type.slice(5);
        } else {
          elem.removeAttribute("type");
        }
        return elem;
      }
      function cloneCopyEvent(src, dest) {
        var i5, l3, type, pdataOld, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
          return;
        }
        if (dataPriv.hasData(src)) {
          pdataOld = dataPriv.get(src);
          events = pdataOld.events;
          if (events) {
            dataPriv.remove(dest, "handle events");
            for (type in events) {
              for (i5 = 0, l3 = events[type].length; i5 < l3; i5++) {
                jQuery4.event.add(dest, type, events[type][i5]);
              }
            }
          }
        }
        if (dataUser.hasData(src)) {
          udataOld = dataUser.access(src);
          udataCur = jQuery4.extend({}, udataOld);
          dataUser.set(dest, udataCur);
        }
      }
      function fixInput(src, dest) {
        var nodeName2 = dest.nodeName.toLowerCase();
        if (nodeName2 === "input" && rcheckableType.test(src.type)) {
          dest.checked = src.checked;
        } else if (nodeName2 === "input" || nodeName2 === "textarea") {
          dest.defaultValue = src.defaultValue;
        }
      }
      function domManip(collection, args, callback, ignored) {
        args = flat(args);
        var fragment, first, scripts, hasScripts, node, doc, i5 = 0, l3 = collection.length, iNoClone = l3 - 1, value = args[0], valueIsFunction = isFunction2(value);
        if (valueIsFunction || l3 > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
          return collection.each(function(index) {
            var self = collection.eq(index);
            if (valueIsFunction) {
              args[0] = value.call(this, index, self.html());
            }
            domManip(self, args, callback, ignored);
          });
        }
        if (l3) {
          fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
          first = fragment.firstChild;
          if (fragment.childNodes.length === 1) {
            fragment = first;
          }
          if (first || ignored) {
            scripts = jQuery4.map(getAll(fragment, "script"), disableScript);
            hasScripts = scripts.length;
            for (; i5 < l3; i5++) {
              node = fragment;
              if (i5 !== iNoClone) {
                node = jQuery4.clone(node, true, true);
                if (hasScripts) {
                  jQuery4.merge(scripts, getAll(node, "script"));
                }
              }
              callback.call(collection[i5], node, i5);
            }
            if (hasScripts) {
              doc = scripts[scripts.length - 1].ownerDocument;
              jQuery4.map(scripts, restoreScript);
              for (i5 = 0; i5 < hasScripts; i5++) {
                node = scripts[i5];
                if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery4.contains(doc, node)) {
                  if (node.src && (node.type || "").toLowerCase() !== "module") {
                    if (jQuery4._evalUrl && !node.noModule) {
                      jQuery4._evalUrl(node.src, {
                        nonce: node.nonce || node.getAttribute("nonce")
                      }, doc);
                    }
                  } else {
                    DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                  }
                }
              }
            }
          }
        }
        return collection;
      }
      function remove(elem, selector, keepData) {
        var node, nodes = selector ? jQuery4.filter(selector, elem) : elem, i5 = 0;
        for (; (node = nodes[i5]) != null; i5++) {
          if (!keepData && node.nodeType === 1) {
            jQuery4.cleanData(getAll(node));
          }
          if (node.parentNode) {
            if (keepData && isAttached(node)) {
              setGlobalEval(getAll(node, "script"));
            }
            node.parentNode.removeChild(node);
          }
        }
        return elem;
      }
      jQuery4.extend({
        htmlPrefilter: function(html) {
          return html;
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
          var i5, l3, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
          if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery4.isXMLDoc(elem)) {
            destElements = getAll(clone);
            srcElements = getAll(elem);
            for (i5 = 0, l3 = srcElements.length; i5 < l3; i5++) {
              fixInput(srcElements[i5], destElements[i5]);
            }
          }
          if (dataAndEvents) {
            if (deepDataAndEvents) {
              srcElements = srcElements || getAll(elem);
              destElements = destElements || getAll(clone);
              for (i5 = 0, l3 = srcElements.length; i5 < l3; i5++) {
                cloneCopyEvent(srcElements[i5], destElements[i5]);
              }
            } else {
              cloneCopyEvent(elem, clone);
            }
          }
          destElements = getAll(clone, "script");
          if (destElements.length > 0) {
            setGlobalEval(destElements, !inPage && getAll(elem, "script"));
          }
          return clone;
        },
        cleanData: function(elems) {
          var data, elem, type, special = jQuery4.event.special, i5 = 0;
          for (; (elem = elems[i5]) !== void 0; i5++) {
            if (acceptData(elem)) {
              if (data = elem[dataPriv.expando]) {
                if (data.events) {
                  for (type in data.events) {
                    if (special[type]) {
                      jQuery4.event.remove(elem, type);
                    } else {
                      jQuery4.removeEvent(elem, type, data.handle);
                    }
                  }
                }
                elem[dataPriv.expando] = void 0;
              }
              if (elem[dataUser.expando]) {
                elem[dataUser.expando] = void 0;
              }
            }
          }
        }
      });
      jQuery4.fn.extend({
        detach: function(selector) {
          return remove(this, selector, true);
        },
        remove: function(selector) {
          return remove(this, selector);
        },
        text: function(value) {
          return access(this, function(value2) {
            return value2 === void 0 ? jQuery4.text(this) : this.empty().each(function() {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = value2;
              }
            });
          }, null, value, arguments.length);
        },
        append: function() {
          return domManip(this, arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.appendChild(elem);
            }
          });
        },
        prepend: function() {
          return domManip(this, arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.insertBefore(elem, target.firstChild);
            }
          });
        },
        before: function() {
          return domManip(this, arguments, function(elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this);
            }
          });
        },
        after: function() {
          return domManip(this, arguments, function(elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this.nextSibling);
            }
          });
        },
        empty: function() {
          var elem, i5 = 0;
          for (; (elem = this[i5]) != null; i5++) {
            if (elem.nodeType === 1) {
              jQuery4.cleanData(getAll(elem, false));
              elem.textContent = "";
            }
          }
          return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
          dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
          deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
          return this.map(function() {
            return jQuery4.clone(this, dataAndEvents, deepDataAndEvents);
          });
        },
        html: function(value) {
          return access(this, function(value2) {
            var elem = this[0] || {}, i5 = 0, l3 = this.length;
            if (value2 === void 0 && elem.nodeType === 1) {
              return elem.innerHTML;
            }
            if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
              value2 = jQuery4.htmlPrefilter(value2);
              try {
                for (; i5 < l3; i5++) {
                  elem = this[i5] || {};
                  if (elem.nodeType === 1) {
                    jQuery4.cleanData(getAll(elem, false));
                    elem.innerHTML = value2;
                  }
                }
                elem = 0;
              } catch (e5) {
              }
            }
            if (elem) {
              this.empty().append(value2);
            }
          }, null, value, arguments.length);
        },
        replaceWith: function() {
          var ignored = [];
          return domManip(this, arguments, function(elem) {
            var parent = this.parentNode;
            if (jQuery4.inArray(this, ignored) < 0) {
              jQuery4.cleanData(getAll(this));
              if (parent) {
                parent.replaceChild(elem, this);
              }
            }
          }, ignored);
        }
      });
      jQuery4.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      }, function(name, original) {
        jQuery4.fn[name] = function(selector) {
          var elems, ret = [], insert = jQuery4(selector), last = insert.length - 1, i5 = 0;
          for (; i5 <= last; i5++) {
            elems = i5 === last ? this : this.clone(true);
            jQuery4(insert[i5])[original](elems);
            push.apply(ret, elems.get());
          }
          return this.pushStack(ret);
        };
      });
      var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
      var rcustomProp = /^--/;
      var getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
          view = window2;
        }
        return view.getComputedStyle(elem);
      };
      var swap2 = function(elem, options, callback) {
        var ret, name, old = {};
        for (name in options) {
          old[name] = elem.style[name];
          elem.style[name] = options[name];
        }
        ret = callback.call(elem);
        for (name in options) {
          elem.style[name] = old[name];
        }
        return ret;
      };
      var rboxStyle = new RegExp(cssExpand.join("|"), "i");
      (function() {
        function computeStyleTests() {
          if (!div) {
            return;
          }
          container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
          div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
          documentElement.appendChild(container).appendChild(div);
          var divStyle = window2.getComputedStyle(div);
          pixelPositionVal = divStyle.top !== "1%";
          reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
          div.style.right = "60%";
          pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
          boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
          div.style.position = "absolute";
          scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
          documentElement.removeChild(container);
          div = null;
        }
        function roundPixelMeasures(measure) {
          return Math.round(parseFloat(measure));
        }
        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
        if (!div.style) {
          return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        jQuery4.extend(support, {
          boxSizingReliable: function() {
            computeStyleTests();
            return boxSizingReliableVal;
          },
          pixelBoxStyles: function() {
            computeStyleTests();
            return pixelBoxStylesVal;
          },
          pixelPosition: function() {
            computeStyleTests();
            return pixelPositionVal;
          },
          reliableMarginLeft: function() {
            computeStyleTests();
            return reliableMarginLeftVal;
          },
          scrollboxSize: function() {
            computeStyleTests();
            return scrollboxSizeVal;
          },
          // Support: IE 9 - 11+, Edge 15 - 18+
          // IE/Edge misreport `getComputedStyle` of table rows with width/height
          // set in CSS while `offset*` properties report correct values.
          // Behavior in IE 9 is more subtle than in newer versions & it passes
          // some versions of this test; make sure not to make it pass there!
          //
          // Support: Firefox 70+
          // Only Firefox includes border widths
          // in computed dimensions. (gh-4529)
          reliableTrDimensions: function() {
            var table, tr, trChild, trStyle;
            if (reliableTrDimensionsVal == null) {
              table = document2.createElement("table");
              tr = document2.createElement("tr");
              trChild = document2.createElement("div");
              table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
              tr.style.cssText = "box-sizing:content-box;border:1px solid";
              tr.style.height = "1px";
              trChild.style.height = "9px";
              trChild.style.display = "block";
              documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
              trStyle = window2.getComputedStyle(tr);
              reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
              documentElement.removeChild(table);
            }
            return reliableTrDimensionsVal;
          }
        });
      })();
      function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
          ret = computed.getPropertyValue(name) || computed[name];
          if (isCustomProp && ret) {
            ret = ret.replace(rtrimCSS, "$1") || void 0;
          }
          if (ret === "" && !isAttached(elem)) {
            ret = jQuery4.style(elem, name);
          }
          if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
            width = style.width;
            minWidth = style.minWidth;
            maxWidth = style.maxWidth;
            style.minWidth = style.maxWidth = style.width = ret;
            ret = computed.width;
            style.width = width;
            style.minWidth = minWidth;
            style.maxWidth = maxWidth;
          }
        }
        return ret !== void 0 ? (
          // Support: IE <=9 - 11 only
          // IE returns zIndex value as an integer.
          ret + ""
        ) : ret;
      }
      function addGetHookIf(conditionFn, hookFn) {
        return {
          get: function() {
            if (conditionFn()) {
              delete this.get;
              return;
            }
            return (this.get = hookFn).apply(this, arguments);
          }
        };
      }
      var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
      function vendorPropName(name) {
        var capName = name[0].toUpperCase() + name.slice(1), i5 = cssPrefixes.length;
        while (i5--) {
          name = cssPrefixes[i5] + capName;
          if (name in emptyStyle) {
            return name;
          }
        }
      }
      function finalPropName(name) {
        var final = jQuery4.cssProps[name] || vendorProps[name];
        if (final) {
          return final;
        }
        if (name in emptyStyle) {
          return name;
        }
        return vendorProps[name] = vendorPropName(name) || name;
      }
      var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      };
      function setPositiveNumber(_elem, value, subtract) {
        var matches2 = rcssNum.exec(value);
        return matches2 ? (
          // Guard against undefined "subtract", e.g., when used as in cssHooks
          Math.max(0, matches2[2] - (subtract || 0)) + (matches2[3] || "px")
        ) : value;
      }
      function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
        var i5 = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
        if (box === (isBorderBox ? "border" : "content")) {
          return 0;
        }
        for (; i5 < 4; i5 += 2) {
          if (box === "margin") {
            marginDelta += jQuery4.css(elem, box + cssExpand[i5], true, styles);
          }
          if (!isBorderBox) {
            delta += jQuery4.css(elem, "padding" + cssExpand[i5], true, styles);
            if (box !== "padding") {
              delta += jQuery4.css(elem, "border" + cssExpand[i5] + "Width", true, styles);
            } else {
              extra += jQuery4.css(elem, "border" + cssExpand[i5] + "Width", true, styles);
            }
          } else {
            if (box === "content") {
              delta -= jQuery4.css(elem, "padding" + cssExpand[i5], true, styles);
            }
            if (box !== "margin") {
              delta -= jQuery4.css(elem, "border" + cssExpand[i5] + "Width", true, styles);
            }
          }
        }
        if (!isBorderBox && computedVal >= 0) {
          delta += Math.max(0, Math.ceil(
            elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
            // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
            // Use an explicit zero to avoid NaN (gh-3964)
          )) || 0;
        }
        return delta + marginDelta;
      }
      function getWidthOrHeight(elem, dimension, extra) {
        var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery4.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
        if (rnumnonpx.test(val)) {
          if (!extra) {
            return val;
          }
          val = "auto";
        }
        if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
        // IE/Edge misreport `getComputedStyle` of table rows with width/height
        // set in CSS while `offset*` properties report correct values.
        // Interestingly, in some cases IE 9 doesn't suffer from this issue.
        !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        val === "auto" || // Support: Android <=4.1 - 4.3 only
        // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
        !parseFloat(val) && jQuery4.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
        elem.getClientRects().length) {
          isBorderBox = jQuery4.css(elem, "boxSizing", false, styles) === "border-box";
          valueIsBorderBox = offsetProp in elem;
          if (valueIsBorderBox) {
            val = elem[offsetProp];
          }
        }
        val = parseFloat(val) || 0;
        return val + boxModelAdjustment(
          elem,
          dimension,
          extra || (isBorderBox ? "border" : "content"),
          valueIsBorderBox,
          styles,
          // Provide the current computed size to request scroll gutter calculation (gh-3589)
          val
        ) + "px";
      }
      jQuery4.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
          opacity: {
            get: function(elem, computed) {
              if (computed) {
                var ret = curCSS(elem, "opacity");
                return ret === "" ? "1" : ret;
              }
            }
          }
        },
        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
          animationIterationCount: true,
          aspectRatio: true,
          borderImageSlice: true,
          columnCount: true,
          flexGrow: true,
          flexShrink: true,
          fontWeight: true,
          gridArea: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnStart: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowStart: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          scale: true,
          widows: true,
          zIndex: true,
          zoom: true,
          // SVG-related
          fillOpacity: true,
          floodOpacity: true,
          stopOpacity: true,
          strokeMiterlimit: true,
          strokeOpacity: true
        },
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},
        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra) {
          if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
            return;
          }
          var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
          if (!isCustomProp) {
            name = finalPropName(origName);
          }
          hooks = jQuery4.cssHooks[name] || jQuery4.cssHooks[origName];
          if (value !== void 0) {
            type = typeof value;
            if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
              value = adjustCSS(elem, name, ret);
              type = "number";
            }
            if (value == null || value !== value) {
              return;
            }
            if (type === "number" && !isCustomProp) {
              value += ret && ret[3] || (jQuery4.cssNumber[origName] ? "" : "px");
            }
            if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
              style[name] = "inherit";
            }
            if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
              if (isCustomProp) {
                style.setProperty(name, value);
              } else {
                style[name] = value;
              }
            }
          } else {
            if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
              return ret;
            }
            return style[name];
          }
        },
        css: function(elem, name, extra, styles) {
          var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
          if (!isCustomProp) {
            name = finalPropName(origName);
          }
          hooks = jQuery4.cssHooks[name] || jQuery4.cssHooks[origName];
          if (hooks && "get" in hooks) {
            val = hooks.get(elem, true, extra);
          }
          if (val === void 0) {
            val = curCSS(elem, name, styles);
          }
          if (val === "normal" && name in cssNormalTransform) {
            val = cssNormalTransform[name];
          }
          if (extra === "" || extra) {
            num = parseFloat(val);
            return extra === true || isFinite(num) ? num || 0 : val;
          }
          return val;
        }
      });
      jQuery4.each(["height", "width"], function(_i, dimension) {
        jQuery4.cssHooks[dimension] = {
          get: function(elem, computed, extra) {
            if (computed) {
              return rdisplayswap.test(jQuery4.css(elem, "display")) && // Support: Safari 8+
              // Table columns in Safari have non-zero offsetWidth & zero
              // getBoundingClientRect().width unless display is changed.
              // Support: IE <=11 only
              // Running getBoundingClientRect on a disconnected node
              // in IE throws an error.
              (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap2(elem, cssShow, function() {
                return getWidthOrHeight(elem, dimension, extra);
              }) : getWidthOrHeight(elem, dimension, extra);
            }
          },
          set: function(elem, value, extra) {
            var matches2, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery4.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
              elem,
              dimension,
              extra,
              isBorderBox,
              styles
            ) : 0;
            if (isBorderBox && scrollboxSizeBuggy) {
              subtract -= Math.ceil(
                elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
              );
            }
            if (subtract && (matches2 = rcssNum.exec(value)) && (matches2[3] || "px") !== "px") {
              elem.style[dimension] = value;
              value = jQuery4.css(elem, dimension);
            }
            return setPositiveNumber(elem, value, subtract);
          }
        };
      });
      jQuery4.cssHooks.marginLeft = addGetHookIf(
        support.reliableMarginLeft,
        function(elem, computed) {
          if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap2(elem, { marginLeft: 0 }, function() {
              return elem.getBoundingClientRect().left;
            })) + "px";
          }
        }
      );
      jQuery4.each({
        margin: "",
        padding: "",
        border: "Width"
      }, function(prefix, suffix) {
        jQuery4.cssHooks[prefix + suffix] = {
          expand: function(value) {
            var i5 = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
            for (; i5 < 4; i5++) {
              expanded[prefix + cssExpand[i5] + suffix] = parts[i5] || parts[i5 - 2] || parts[0];
            }
            return expanded;
          }
        };
        if (prefix !== "margin") {
          jQuery4.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
      });
      jQuery4.fn.extend({
        css: function(name, value) {
          return access(this, function(elem, name2, value2) {
            var styles, len, map = {}, i5 = 0;
            if (Array.isArray(name2)) {
              styles = getStyles(elem);
              len = name2.length;
              for (; i5 < len; i5++) {
                map[name2[i5]] = jQuery4.css(elem, name2[i5], false, styles);
              }
              return map;
            }
            return value2 !== void 0 ? jQuery4.style(elem, name2, value2) : jQuery4.css(elem, name2);
          }, name, value, arguments.length > 1);
        }
      });
      function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
      }
      jQuery4.Tween = Tween;
      Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
          this.elem = elem;
          this.prop = prop;
          this.easing = easing || jQuery4.easing._default;
          this.options = options;
          this.start = this.now = this.cur();
          this.end = end;
          this.unit = unit || (jQuery4.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
          var hooks = Tween.propHooks[this.prop];
          return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
          var eased, hooks = Tween.propHooks[this.prop];
          if (this.options.duration) {
            this.pos = eased = jQuery4.easing[this.easing](
              percent,
              this.options.duration * percent,
              0,
              1,
              this.options.duration
            );
          } else {
            this.pos = eased = percent;
          }
          this.now = (this.end - this.start) * eased + this.start;
          if (this.options.step) {
            this.options.step.call(this.elem, this.now, this);
          }
          if (hooks && hooks.set) {
            hooks.set(this);
          } else {
            Tween.propHooks._default.set(this);
          }
          return this;
        }
      };
      Tween.prototype.init.prototype = Tween.prototype;
      Tween.propHooks = {
        _default: {
          get: function(tween) {
            var result;
            if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
              return tween.elem[tween.prop];
            }
            result = jQuery4.css(tween.elem, tween.prop, "");
            return !result || result === "auto" ? 0 : result;
          },
          set: function(tween) {
            if (jQuery4.fx.step[tween.prop]) {
              jQuery4.fx.step[tween.prop](tween);
            } else if (tween.elem.nodeType === 1 && (jQuery4.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
              jQuery4.style(tween.elem, tween.prop, tween.now + tween.unit);
            } else {
              tween.elem[tween.prop] = tween.now;
            }
          }
        }
      };
      Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
          if (tween.elem.nodeType && tween.elem.parentNode) {
            tween.elem[tween.prop] = tween.now;
          }
        }
      };
      jQuery4.easing = {
        linear: function(p3) {
          return p3;
        },
        swing: function(p3) {
          return 0.5 - Math.cos(p3 * Math.PI) / 2;
        },
        _default: "swing"
      };
      jQuery4.fx = Tween.prototype.init;
      jQuery4.fx.step = {};
      var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
      function schedule() {
        if (inProgress) {
          if (document2.hidden === false && window2.requestAnimationFrame) {
            window2.requestAnimationFrame(schedule);
          } else {
            window2.setTimeout(schedule, jQuery4.fx.interval);
          }
          jQuery4.fx.tick();
        }
      }
      function createFxNow() {
        window2.setTimeout(function() {
          fxNow = void 0;
        });
        return fxNow = Date.now();
      }
      function genFx(type, includeWidth) {
        var which, i5 = 0, attrs = { height: type };
        includeWidth = includeWidth ? 1 : 0;
        for (; i5 < 4; i5 += 2 - includeWidth) {
          which = cssExpand[i5];
          attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
          attrs.opacity = attrs.width = type;
        }
        return attrs;
      }
      function createTween(value, prop, animation) {
        var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
        for (; index < length; index++) {
          if (tween = collection[index].call(animation, prop, value)) {
            return tween;
          }
        }
      }
      function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
        if (!opts.queue) {
          hooks = jQuery4._queueHooks(elem, "fx");
          if (hooks.unqueued == null) {
            hooks.unqueued = 0;
            oldfire = hooks.empty.fire;
            hooks.empty.fire = function() {
              if (!hooks.unqueued) {
                oldfire();
              }
            };
          }
          hooks.unqueued++;
          anim.always(function() {
            anim.always(function() {
              hooks.unqueued--;
              if (!jQuery4.queue(elem, "fx").length) {
                hooks.empty.fire();
              }
            });
          });
        }
        for (prop in props) {
          value = props[prop];
          if (rfxtypes.test(value)) {
            delete props[prop];
            toggle = toggle || value === "toggle";
            if (value === (hidden ? "hide" : "show")) {
              if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                hidden = true;
              } else {
                continue;
              }
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery4.style(elem, prop);
          }
        }
        propTween = !jQuery4.isEmptyObject(props);
        if (!propTween && jQuery4.isEmptyObject(orig)) {
          return;
        }
        if (isBox && elem.nodeType === 1) {
          opts.overflow = [style.overflow, style.overflowX, style.overflowY];
          restoreDisplay = dataShow && dataShow.display;
          if (restoreDisplay == null) {
            restoreDisplay = dataPriv.get(elem, "display");
          }
          display = jQuery4.css(elem, "display");
          if (display === "none") {
            if (restoreDisplay) {
              display = restoreDisplay;
            } else {
              showHide([elem], true);
              restoreDisplay = elem.style.display || restoreDisplay;
              display = jQuery4.css(elem, "display");
              showHide([elem]);
            }
          }
          if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
            if (jQuery4.css(elem, "float") === "none") {
              if (!propTween) {
                anim.done(function() {
                  style.display = restoreDisplay;
                });
                if (restoreDisplay == null) {
                  display = style.display;
                  restoreDisplay = display === "none" ? "" : display;
                }
              }
              style.display = "inline-block";
            }
          }
        }
        if (opts.overflow) {
          style.overflow = "hidden";
          anim.always(function() {
            style.overflow = opts.overflow[0];
            style.overflowX = opts.overflow[1];
            style.overflowY = opts.overflow[2];
          });
        }
        propTween = false;
        for (prop in orig) {
          if (!propTween) {
            if (dataShow) {
              if ("hidden" in dataShow) {
                hidden = dataShow.hidden;
              }
            } else {
              dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
            }
            if (toggle) {
              dataShow.hidden = !hidden;
            }
            if (hidden) {
              showHide([elem], true);
            }
            anim.done(function() {
              if (!hidden) {
                showHide([elem]);
              }
              dataPriv.remove(elem, "fxshow");
              for (prop in orig) {
                jQuery4.style(elem, prop, orig[prop]);
              }
            });
          }
          propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
          if (!(prop in dataShow)) {
            dataShow[prop] = propTween.start;
            if (hidden) {
              propTween.end = propTween.start;
              propTween.start = 0;
            }
          }
        }
      }
      function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
          name = camelCase(index);
          easing = specialEasing[name];
          value = props[index];
          if (Array.isArray(value)) {
            easing = value[1];
            value = props[index] = value[0];
          }
          if (index !== name) {
            props[name] = value;
            delete props[index];
          }
          hooks = jQuery4.cssHooks[name];
          if (hooks && "expand" in hooks) {
            value = hooks.expand(value);
            delete props[name];
            for (index in value) {
              if (!(index in props)) {
                props[index] = value[index];
                specialEasing[index] = easing;
              }
            }
          } else {
            specialEasing[name] = easing;
          }
        }
      }
      function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery4.Deferred().always(function() {
          delete tick.elem;
        }), tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
          for (; index2 < length2; index2++) {
            animation.tweens[index2].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length2) {
            return remaining;
          }
          if (!length2) {
            deferred.notifyWith(elem, [animation, 1, 0]);
          }
          deferred.resolveWith(elem, [animation]);
          return false;
        }, animation = deferred.promise({
          elem,
          props: jQuery4.extend({}, properties),
          opts: jQuery4.extend(true, {
            specialEasing: {},
            easing: jQuery4.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery4.Tween(
              elem,
              animation.opts,
              prop,
              end,
              animation.opts.specialEasing[prop] || animation.opts.easing
            );
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index2 < length2; index2++) {
              animation.tweens[index2].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
          result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
          if (result) {
            if (isFunction2(result.stop)) {
              jQuery4._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
            }
            return result;
          }
        }
        jQuery4.map(props, createTween, animation);
        if (isFunction2(animation.opts.start)) {
          animation.opts.start.call(elem, animation);
        }
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        jQuery4.fx.timer(
          jQuery4.extend(tick, {
            elem,
            anim: animation,
            queue: animation.opts.queue
          })
        );
        return animation;
      }
      jQuery4.Animation = jQuery4.extend(Animation, {
        tweeners: {
          "*": [function(prop, value) {
            var tween = this.createTween(prop, value);
            adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
            return tween;
          }]
        },
        tweener: function(props, callback) {
          if (isFunction2(props)) {
            callback = props;
            props = ["*"];
          } else {
            props = props.match(rnothtmlwhite);
          }
          var prop, index = 0, length = props.length;
          for (; index < length; index++) {
            prop = props[index];
            Animation.tweeners[prop] = Animation.tweeners[prop] || [];
            Animation.tweeners[prop].unshift(callback);
          }
        },
        prefilters: [defaultPrefilter],
        prefilter: function(callback, prepend) {
          if (prepend) {
            Animation.prefilters.unshift(callback);
          } else {
            Animation.prefilters.push(callback);
          }
        }
      });
      jQuery4.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery4.extend({}, speed) : {
          complete: fn || !fn && easing || isFunction2(speed) && speed,
          duration: speed,
          easing: fn && easing || easing && !isFunction2(easing) && easing
        };
        if (jQuery4.fx.off) {
          opt.duration = 0;
        } else {
          if (typeof opt.duration !== "number") {
            if (opt.duration in jQuery4.fx.speeds) {
              opt.duration = jQuery4.fx.speeds[opt.duration];
            } else {
              opt.duration = jQuery4.fx.speeds._default;
            }
          }
        }
        if (opt.queue == null || opt.queue === true) {
          opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
          if (isFunction2(opt.old)) {
            opt.old.call(this);
          }
          if (opt.queue) {
            jQuery4.dequeue(this, opt.queue);
          }
        };
        return opt;
      };
      jQuery4.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
          return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
          var empty = jQuery4.isEmptyObject(prop), optall = jQuery4.speed(speed, easing, callback), doAnimation = function() {
            var anim = Animation(this, jQuery4.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
          doAnimation.finish = doAnimation;
          return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
          var stopQueue = function(hooks) {
            var stop = hooks.stop;
            delete hooks.stop;
            stop(gotoEnd);
          };
          if (typeof type !== "string") {
            gotoEnd = clearQueue;
            clearQueue = type;
            type = void 0;
          }
          if (clearQueue) {
            this.queue(type || "fx", []);
          }
          return this.each(function() {
            var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery4.timers, data = dataPriv.get(this);
            if (index) {
              if (data[index] && data[index].stop) {
                stopQueue(data[index]);
              }
            } else {
              for (index in data) {
                if (data[index] && data[index].stop && rrun.test(index)) {
                  stopQueue(data[index]);
                }
              }
            }
            for (index = timers.length; index--; ) {
              if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                timers[index].anim.stop(gotoEnd);
                dequeue = false;
                timers.splice(index, 1);
              }
            }
            if (dequeue || !gotoEnd) {
              jQuery4.dequeue(this, type);
            }
          });
        },
        finish: function(type) {
          if (type !== false) {
            type = type || "fx";
          }
          return this.each(function() {
            var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery4.timers, length = queue ? queue.length : 0;
            data.finish = true;
            jQuery4.queue(this, type, []);
            if (hooks && hooks.stop) {
              hooks.stop.call(this, true);
            }
            for (index = timers.length; index--; ) {
              if (timers[index].elem === this && timers[index].queue === type) {
                timers[index].anim.stop(true);
                timers.splice(index, 1);
              }
            }
            for (index = 0; index < length; index++) {
              if (queue[index] && queue[index].finish) {
                queue[index].finish.call(this);
              }
            }
            delete data.finish;
          });
        }
      });
      jQuery4.each(["toggle", "show", "hide"], function(_i, name) {
        var cssFn = jQuery4.fn[name];
        jQuery4.fn[name] = function(speed, easing, callback) {
          return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
      });
      jQuery4.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
      }, function(name, props) {
        jQuery4.fn[name] = function(speed, easing, callback) {
          return this.animate(props, speed, easing, callback);
        };
      });
      jQuery4.timers = [];
      jQuery4.fx.tick = function() {
        var timer, i5 = 0, timers = jQuery4.timers;
        fxNow = Date.now();
        for (; i5 < timers.length; i5++) {
          timer = timers[i5];
          if (!timer() && timers[i5] === timer) {
            timers.splice(i5--, 1);
          }
        }
        if (!timers.length) {
          jQuery4.fx.stop();
        }
        fxNow = void 0;
      };
      jQuery4.fx.timer = function(timer) {
        jQuery4.timers.push(timer);
        jQuery4.fx.start();
      };
      jQuery4.fx.interval = 13;
      jQuery4.fx.start = function() {
        if (inProgress) {
          return;
        }
        inProgress = true;
        schedule();
      };
      jQuery4.fx.stop = function() {
        inProgress = null;
      };
      jQuery4.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
      };
      jQuery4.fn.delay = function(time, type) {
        time = jQuery4.fx ? jQuery4.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
          var timeout = window2.setTimeout(next, time);
          hooks.stop = function() {
            window2.clearTimeout(timeout);
          };
        });
      };
      (function() {
        var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        input = document2.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
      })();
      var boolHook, attrHandle = jQuery4.expr.attrHandle;
      jQuery4.fn.extend({
        attr: function(name, value) {
          return access(this, jQuery4.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
          return this.each(function() {
            jQuery4.removeAttr(this, name);
          });
        }
      });
      jQuery4.extend({
        attr: function(elem, name, value) {
          var ret, hooks, nType = elem.nodeType;
          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (typeof elem.getAttribute === "undefined") {
            return jQuery4.prop(elem, name, value);
          }
          if (nType !== 1 || !jQuery4.isXMLDoc(elem)) {
            hooks = jQuery4.attrHooks[name.toLowerCase()] || (jQuery4.expr.match.bool.test(name) ? boolHook : void 0);
          }
          if (value !== void 0) {
            if (value === null) {
              jQuery4.removeAttr(elem, name);
              return;
            }
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
              return ret;
            }
            elem.setAttribute(name, value + "");
            return value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          ret = jQuery4.find.attr(elem, name);
          return ret == null ? void 0 : ret;
        },
        attrHooks: {
          type: {
            set: function(elem, value) {
              if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                var val = elem.value;
                elem.setAttribute("type", value);
                if (val) {
                  elem.value = val;
                }
                return value;
              }
            }
          }
        },
        removeAttr: function(elem, value) {
          var name, i5 = 0, attrNames = value && value.match(rnothtmlwhite);
          if (attrNames && elem.nodeType === 1) {
            while (name = attrNames[i5++]) {
              elem.removeAttribute(name);
            }
          }
        }
      });
      boolHook = {
        set: function(elem, value, name) {
          if (value === false) {
            jQuery4.removeAttr(elem, name);
          } else {
            elem.setAttribute(name, name);
          }
          return name;
        }
      };
      jQuery4.each(jQuery4.expr.match.bool.source.match(/\w+/g), function(_i, name) {
        var getter = attrHandle[name] || jQuery4.find.attr;
        attrHandle[name] = function(elem, name2, isXML) {
          var ret, handle, lowercaseName = name2.toLowerCase();
          if (!isXML) {
            handle = attrHandle[lowercaseName];
            attrHandle[lowercaseName] = ret;
            ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
            attrHandle[lowercaseName] = handle;
          }
          return ret;
        };
      });
      var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
      jQuery4.fn.extend({
        prop: function(name, value) {
          return access(this, jQuery4.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
          return this.each(function() {
            delete this[jQuery4.propFix[name] || name];
          });
        }
      });
      jQuery4.extend({
        prop: function(elem, name, value) {
          var ret, hooks, nType = elem.nodeType;
          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (nType !== 1 || !jQuery4.isXMLDoc(elem)) {
            name = jQuery4.propFix[name] || name;
            hooks = jQuery4.propHooks[name];
          }
          if (value !== void 0) {
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
              return ret;
            }
            return elem[name] = value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          return elem[name];
        },
        propHooks: {
          tabIndex: {
            get: function(elem) {
              var tabindex = jQuery4.find.attr(elem, "tabindex");
              if (tabindex) {
                return parseInt(tabindex, 10);
              }
              if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                return 0;
              }
              return -1;
            }
          }
        },
        propFix: {
          "for": "htmlFor",
          "class": "className"
        }
      });
      if (!support.optSelected) {
        jQuery4.propHooks.selected = {
          get: function(elem) {
            var parent = elem.parentNode;
            if (parent && parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
            return null;
          },
          set: function(elem) {
            var parent = elem.parentNode;
            if (parent) {
              parent.selectedIndex;
              if (parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
            }
          }
        };
      }
      jQuery4.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
      ], function() {
        jQuery4.propFix[this.toLowerCase()] = this;
      });
      function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
      }
      function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
      }
      function classesToArray(value) {
        if (Array.isArray(value)) {
          return value;
        }
        if (typeof value === "string") {
          return value.match(rnothtmlwhite) || [];
        }
        return [];
      }
      jQuery4.fn.extend({
        addClass: function(value) {
          var classNames, cur, curValue, className, i5, finalValue;
          if (isFunction2(value)) {
            return this.each(function(j2) {
              jQuery4(this).addClass(value.call(this, j2, getClass(this)));
            });
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function() {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i5 = 0; i5 < classNames.length; i5++) {
                  className = classNames[i5];
                  if (cur.indexOf(" " + className + " ") < 0) {
                    cur += className + " ";
                  }
                }
                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        removeClass: function(value) {
          var classNames, cur, curValue, className, i5, finalValue;
          if (isFunction2(value)) {
            return this.each(function(j2) {
              jQuery4(this).removeClass(value.call(this, j2, getClass(this)));
            });
          }
          if (!arguments.length) {
            return this.attr("class", "");
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function() {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i5 = 0; i5 < classNames.length; i5++) {
                  className = classNames[i5];
                  while (cur.indexOf(" " + className + " ") > -1) {
                    cur = cur.replace(" " + className + " ", " ");
                  }
                }
                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        toggleClass: function(value, stateVal) {
          var classNames, className, i5, self, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
          if (isFunction2(value)) {
            return this.each(function(i6) {
              jQuery4(this).toggleClass(
                value.call(this, i6, getClass(this), stateVal),
                stateVal
              );
            });
          }
          if (typeof stateVal === "boolean" && isValidValue) {
            return stateVal ? this.addClass(value) : this.removeClass(value);
          }
          classNames = classesToArray(value);
          return this.each(function() {
            if (isValidValue) {
              self = jQuery4(this);
              for (i5 = 0; i5 < classNames.length; i5++) {
                className = classNames[i5];
                if (self.hasClass(className)) {
                  self.removeClass(className);
                } else {
                  self.addClass(className);
                }
              }
            } else if (value === void 0 || type === "boolean") {
              className = getClass(this);
              if (className) {
                dataPriv.set(this, "__className__", className);
              }
              if (this.setAttribute) {
                this.setAttribute(
                  "class",
                  className || value === false ? "" : dataPriv.get(this, "__className__") || ""
                );
              }
            }
          });
        },
        hasClass: function(selector) {
          var className, elem, i5 = 0;
          className = " " + selector + " ";
          while (elem = this[i5++]) {
            if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
              return true;
            }
          }
          return false;
        }
      });
      var rreturn = /\r/g;
      jQuery4.fn.extend({
        val: function(value) {
          var hooks, ret, valueIsFunction, elem = this[0];
          if (!arguments.length) {
            if (elem) {
              hooks = jQuery4.valHooks[elem.type] || jQuery4.valHooks[elem.nodeName.toLowerCase()];
              if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                return ret;
              }
              ret = elem.value;
              if (typeof ret === "string") {
                return ret.replace(rreturn, "");
              }
              return ret == null ? "" : ret;
            }
            return;
          }
          valueIsFunction = isFunction2(value);
          return this.each(function(i5) {
            var val;
            if (this.nodeType !== 1) {
              return;
            }
            if (valueIsFunction) {
              val = value.call(this, i5, jQuery4(this).val());
            } else {
              val = value;
            }
            if (val == null) {
              val = "";
            } else if (typeof val === "number") {
              val += "";
            } else if (Array.isArray(val)) {
              val = jQuery4.map(val, function(value2) {
                return value2 == null ? "" : value2 + "";
              });
            }
            hooks = jQuery4.valHooks[this.type] || jQuery4.valHooks[this.nodeName.toLowerCase()];
            if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
              this.value = val;
            }
          });
        }
      });
      jQuery4.extend({
        valHooks: {
          option: {
            get: function(elem) {
              var val = jQuery4.find.attr(elem, "value");
              return val != null ? val : (
                // Support: IE <=10 - 11 only
                // option.text throws exceptions (trac-14686, trac-14858)
                // Strip and collapse whitespace
                // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                stripAndCollapse(jQuery4.text(elem))
              );
            }
          },
          select: {
            get: function(elem) {
              var value, option, i5, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
              if (index < 0) {
                i5 = max;
              } else {
                i5 = one ? index : 0;
              }
              for (; i5 < max; i5++) {
                option = options[i5];
                if ((option.selected || i5 === index) && // Don't return options that are disabled or in a disabled optgroup
                !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                  value = jQuery4(option).val();
                  if (one) {
                    return value;
                  }
                  values.push(value);
                }
              }
              return values;
            },
            set: function(elem, value) {
              var optionSet, option, options = elem.options, values = jQuery4.makeArray(value), i5 = options.length;
              while (i5--) {
                option = options[i5];
                if (option.selected = jQuery4.inArray(jQuery4.valHooks.option.get(option), values) > -1) {
                  optionSet = true;
                }
              }
              if (!optionSet) {
                elem.selectedIndex = -1;
              }
              return values;
            }
          }
        }
      });
      jQuery4.each(["radio", "checkbox"], function() {
        jQuery4.valHooks[this] = {
          set: function(elem, value) {
            if (Array.isArray(value)) {
              return elem.checked = jQuery4.inArray(jQuery4(elem).val(), value) > -1;
            }
          }
        };
        if (!support.checkOn) {
          jQuery4.valHooks[this].get = function(elem) {
            return elem.getAttribute("value") === null ? "on" : elem.value;
          };
        }
      });
      var location2 = window2.location;
      var nonce = { guid: Date.now() };
      var rquery = /\?/;
      jQuery4.parseXML = function(data) {
        var xml, parserErrorElem;
        if (!data || typeof data !== "string") {
          return null;
        }
        try {
          xml = new window2.DOMParser().parseFromString(data, "text/xml");
        } catch (e5) {
        }
        parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
        if (!xml || parserErrorElem) {
          jQuery4.error("Invalid XML: " + (parserErrorElem ? jQuery4.map(parserErrorElem.childNodes, function(el) {
            return el.textContent;
          }).join("\n") : data));
        }
        return xml;
      };
      var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e5) {
        e5.stopPropagation();
      };
      jQuery4.extend(jQuery4.event, {
        trigger: function(event, data, elem, onlyHandlers) {
          var i5, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
          cur = lastElement = tmp = elem = elem || document2;
          if (elem.nodeType === 3 || elem.nodeType === 8) {
            return;
          }
          if (rfocusMorph.test(type + jQuery4.event.triggered)) {
            return;
          }
          if (type.indexOf(".") > -1) {
            namespaces = type.split(".");
            type = namespaces.shift();
            namespaces.sort();
          }
          ontype = type.indexOf(":") < 0 && "on" + type;
          event = event[jQuery4.expando] ? event : new jQuery4.Event(type, typeof event === "object" && event);
          event.isTrigger = onlyHandlers ? 2 : 3;
          event.namespace = namespaces.join(".");
          event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
          event.result = void 0;
          if (!event.target) {
            event.target = elem;
          }
          data = data == null ? [event] : jQuery4.makeArray(data, [event]);
          special = jQuery4.event.special[type] || {};
          if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
            return;
          }
          if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
            bubbleType = special.delegateType || type;
            if (!rfocusMorph.test(bubbleType + type)) {
              cur = cur.parentNode;
            }
            for (; cur; cur = cur.parentNode) {
              eventPath.push(cur);
              tmp = cur;
            }
            if (tmp === (elem.ownerDocument || document2)) {
              eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
            }
          }
          i5 = 0;
          while ((cur = eventPath[i5++]) && !event.isPropagationStopped()) {
            lastElement = cur;
            event.type = i5 > 1 ? bubbleType : special.bindType || type;
            handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
            if (handle) {
              handle.apply(cur, data);
            }
            handle = ontype && cur[ontype];
            if (handle && handle.apply && acceptData(cur)) {
              event.result = handle.apply(cur, data);
              if (event.result === false) {
                event.preventDefault();
              }
            }
          }
          event.type = type;
          if (!onlyHandlers && !event.isDefaultPrevented()) {
            if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
              if (ontype && isFunction2(elem[type]) && !isWindow(elem)) {
                tmp = elem[ontype];
                if (tmp) {
                  elem[ontype] = null;
                }
                jQuery4.event.triggered = type;
                if (event.isPropagationStopped()) {
                  lastElement.addEventListener(type, stopPropagationCallback);
                }
                elem[type]();
                if (event.isPropagationStopped()) {
                  lastElement.removeEventListener(type, stopPropagationCallback);
                }
                jQuery4.event.triggered = void 0;
                if (tmp) {
                  elem[ontype] = tmp;
                }
              }
            }
          }
          return event.result;
        },
        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function(type, elem, event) {
          var e5 = jQuery4.extend(
            new jQuery4.Event(),
            event,
            {
              type,
              isSimulated: true
            }
          );
          jQuery4.event.trigger(e5, null, elem);
        }
      });
      jQuery4.fn.extend({
        trigger: function(type, data) {
          return this.each(function() {
            jQuery4.event.trigger(type, data, this);
          });
        },
        triggerHandler: function(type, data) {
          var elem = this[0];
          if (elem) {
            return jQuery4.event.trigger(type, data, elem, true);
          }
        }
      });
      var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
      function buildParams(prefix, obj, traditional, add) {
        var name;
        if (Array.isArray(obj)) {
          jQuery4.each(obj, function(i5, v2) {
            if (traditional || rbracket.test(prefix)) {
              add(prefix, v2);
            } else {
              buildParams(
                prefix + "[" + (typeof v2 === "object" && v2 != null ? i5 : "") + "]",
                v2,
                traditional,
                add
              );
            }
          });
        } else if (!traditional && toType(obj) === "object") {
          for (name in obj) {
            buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
          }
        } else {
          add(prefix, obj);
        }
      }
      jQuery4.param = function(a3, traditional) {
        var prefix, s4 = [], add = function(key, valueOrFunction) {
          var value = isFunction2(valueOrFunction) ? valueOrFunction() : valueOrFunction;
          s4[s4.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
        };
        if (a3 == null) {
          return "";
        }
        if (Array.isArray(a3) || a3.jquery && !jQuery4.isPlainObject(a3)) {
          jQuery4.each(a3, function() {
            add(this.name, this.value);
          });
        } else {
          for (prefix in a3) {
            buildParams(prefix, a3[prefix], traditional, add);
          }
        }
        return s4.join("&");
      };
      jQuery4.fn.extend({
        serialize: function() {
          return jQuery4.param(this.serializeArray());
        },
        serializeArray: function() {
          return this.map(function() {
            var elements = jQuery4.prop(this, "elements");
            return elements ? jQuery4.makeArray(elements) : this;
          }).filter(function() {
            var type = this.type;
            return this.name && !jQuery4(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
          }).map(function(_i, elem) {
            var val = jQuery4(this).val();
            if (val == null) {
              return null;
            }
            if (Array.isArray(val)) {
              return jQuery4.map(val, function(val2) {
                return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
              });
            }
            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
          }).get();
        }
      });
      var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
      originAnchor.href = location2.href;
      function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
          if (typeof dataTypeExpression !== "string") {
            func = dataTypeExpression;
            dataTypeExpression = "*";
          }
          var dataType, i5 = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
          if (isFunction2(func)) {
            while (dataType = dataTypes[i5++]) {
              if (dataType[0] === "+") {
                dataType = dataType.slice(1) || "*";
                (structure[dataType] = structure[dataType] || []).unshift(func);
              } else {
                (structure[dataType] = structure[dataType] || []).push(func);
              }
            }
          }
        };
      }
      function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
          var selected;
          inspected[dataType] = true;
          jQuery4.each(structure[dataType] || [], function(_2, prefilterOrFactory) {
            var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
            if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
              options.dataTypes.unshift(dataTypeOrTransport);
              inspect(dataTypeOrTransport);
              return false;
            } else if (seekingTransport) {
              return !(selected = dataTypeOrTransport);
            }
          });
          return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
      }
      function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery4.ajaxSettings.flatOptions || {};
        for (key in src) {
          if (src[key] !== void 0) {
            (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
          }
        }
        if (deep) {
          jQuery4.extend(true, target, deep);
        }
        return target;
      }
      function ajaxHandleResponses(s4, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s4.contents, dataTypes = s4.dataTypes;
        while (dataTypes[0] === "*") {
          dataTypes.shift();
          if (ct === void 0) {
            ct = s4.mimeType || jqXHR.getResponseHeader("Content-Type");
          }
        }
        if (ct) {
          for (type in contents) {
            if (contents[type] && contents[type].test(ct)) {
              dataTypes.unshift(type);
              break;
            }
          }
        }
        if (dataTypes[0] in responses) {
          finalDataType = dataTypes[0];
        } else {
          for (type in responses) {
            if (!dataTypes[0] || s4.converters[type + " " + dataTypes[0]]) {
              finalDataType = type;
              break;
            }
            if (!firstDataType) {
              firstDataType = type;
            }
          }
          finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
          if (finalDataType !== dataTypes[0]) {
            dataTypes.unshift(finalDataType);
          }
          return responses[finalDataType];
        }
      }
      function ajaxConvert(s4, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s4.dataTypes.slice();
        if (dataTypes[1]) {
          for (conv in s4.converters) {
            converters[conv.toLowerCase()] = s4.converters[conv];
          }
        }
        current = dataTypes.shift();
        while (current) {
          if (s4.responseFields[current]) {
            jqXHR[s4.responseFields[current]] = response;
          }
          if (!prev && isSuccess && s4.dataFilter) {
            response = s4.dataFilter(response, s4.dataType);
          }
          prev = current;
          current = dataTypes.shift();
          if (current) {
            if (current === "*") {
              current = prev;
            } else if (prev !== "*" && prev !== current) {
              conv = converters[prev + " " + current] || converters["* " + current];
              if (!conv) {
                for (conv2 in converters) {
                  tmp = conv2.split(" ");
                  if (tmp[1] === current) {
                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                    if (conv) {
                      if (conv === true) {
                        conv = converters[conv2];
                      } else if (converters[conv2] !== true) {
                        current = tmp[0];
                        dataTypes.unshift(tmp[1]);
                      }
                      break;
                    }
                  }
                }
              }
              if (conv !== true) {
                if (conv && s4.throws) {
                  response = conv(response);
                } else {
                  try {
                    response = conv(response);
                  } catch (e5) {
                    return {
                      state: "parsererror",
                      error: conv ? e5 : "No conversion from " + prev + " to " + current
                    };
                  }
                }
              }
            }
          }
        }
        return { state: "success", data: response };
      }
      jQuery4.extend({
        // Counter for holding the number of active queries
        active: 0,
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: location2.href,
          type: "GET",
          isLocal: rlocalProtocol.test(location2.protocol),
          global: true,
          processData: true,
          async: true,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          /*
          timeout: 0,
          data: null,
          dataType: null,
          username: null,
          password: null,
          cache: null,
          throws: false,
          traditional: false,
          headers: {},
          */
          accepts: {
            "*": allTypes,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
          },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
          },
          // Data converters
          // Keys separate source (or catchall "*") and destination types with a single space
          converters: {
            // Convert anything to text
            "* text": String,
            // Text to html (true = no transformation)
            "text html": true,
            // Evaluate text as a json expression
            "text json": JSON.parse,
            // Parse text as xml
            "text xml": jQuery4.parseXML
          },
          // For options that shouldn't be deep extended:
          // you can add your own custom options here if
          // and when you create one that shouldn't be
          // deep extended (see ajaxExtend)
          flatOptions: {
            url: true,
            context: true
          }
        },
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(target, settings) {
          return settings ? (
            // Building a settings object
            ajaxExtend(ajaxExtend(target, jQuery4.ajaxSettings), settings)
          ) : (
            // Extending ajaxSettings
            ajaxExtend(jQuery4.ajaxSettings, target)
          );
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        // Main method
        ajax: function(url, options) {
          if (typeof url === "object") {
            options = url;
            url = void 0;
          }
          options = options || {};
          var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i5, uncached, s4 = jQuery4.ajaxSetup({}, options), callbackContext = s4.context || s4, globalEventContext = s4.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery4(callbackContext) : jQuery4.event, deferred = jQuery4.Deferred(), completeDeferred = jQuery4.Callbacks("once memory"), statusCode = s4.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
            readyState: 0,
            // Builds headers hashtable if needed
            getResponseHeader: function(key) {
              var match;
              if (completed2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while (match = rheaders.exec(responseHeadersString)) {
                    responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                  }
                }
                match = responseHeaders[key.toLowerCase() + " "];
              }
              return match == null ? null : match.join(", ");
            },
            // Raw string
            getAllResponseHeaders: function() {
              return completed2 ? responseHeadersString : null;
            },
            // Caches the header
            setRequestHeader: function(name, value) {
              if (completed2 == null) {
                name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            // Overrides response content-type header
            overrideMimeType: function(type) {
              if (completed2 == null) {
                s4.mimeType = type;
              }
              return this;
            },
            // Status-dependent callbacks
            statusCode: function(map) {
              var code;
              if (map) {
                if (completed2) {
                  jqXHR.always(map[jqXHR.status]);
                } else {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                }
              }
              return this;
            },
            // Cancel the request
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
          deferred.promise(jqXHR);
          s4.url = ((url || s4.url || location2.href) + "").replace(rprotocol, location2.protocol + "//");
          s4.type = options.method || options.type || s4.method || s4.type;
          s4.dataTypes = (s4.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
          if (s4.crossDomain == null) {
            urlAnchor = document2.createElement("a");
            try {
              urlAnchor.href = s4.url;
              urlAnchor.href = urlAnchor.href;
              s4.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
            } catch (e5) {
              s4.crossDomain = true;
            }
          }
          if (s4.data && s4.processData && typeof s4.data !== "string") {
            s4.data = jQuery4.param(s4.data, s4.traditional);
          }
          inspectPrefiltersOrTransports(prefilters, s4, options, jqXHR);
          if (completed2) {
            return jqXHR;
          }
          fireGlobals = jQuery4.event && s4.global;
          if (fireGlobals && jQuery4.active++ === 0) {
            jQuery4.event.trigger("ajaxStart");
          }
          s4.type = s4.type.toUpperCase();
          s4.hasContent = !rnoContent.test(s4.type);
          cacheURL = s4.url.replace(rhash, "");
          if (!s4.hasContent) {
            uncached = s4.url.slice(cacheURL.length);
            if (s4.data && (s4.processData || typeof s4.data === "string")) {
              cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s4.data;
              delete s4.data;
            }
            if (s4.cache === false) {
              cacheURL = cacheURL.replace(rantiCache, "$1");
              uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
            }
            s4.url = cacheURL + uncached;
          } else if (s4.data && s4.processData && (s4.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
            s4.data = s4.data.replace(r20, "+");
          }
          if (s4.ifModified) {
            if (jQuery4.lastModified[cacheURL]) {
              jqXHR.setRequestHeader("If-Modified-Since", jQuery4.lastModified[cacheURL]);
            }
            if (jQuery4.etag[cacheURL]) {
              jqXHR.setRequestHeader("If-None-Match", jQuery4.etag[cacheURL]);
            }
          }
          if (s4.data && s4.hasContent && s4.contentType !== false || options.contentType) {
            jqXHR.setRequestHeader("Content-Type", s4.contentType);
          }
          jqXHR.setRequestHeader(
            "Accept",
            s4.dataTypes[0] && s4.accepts[s4.dataTypes[0]] ? s4.accepts[s4.dataTypes[0]] + (s4.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s4.accepts["*"]
          );
          for (i5 in s4.headers) {
            jqXHR.setRequestHeader(i5, s4.headers[i5]);
          }
          if (s4.beforeSend && (s4.beforeSend.call(callbackContext, jqXHR, s4) === false || completed2)) {
            return jqXHR.abort();
          }
          strAbort = "abort";
          completeDeferred.add(s4.complete);
          jqXHR.done(s4.success);
          jqXHR.fail(s4.error);
          transport = inspectPrefiltersOrTransports(transports, s4, options, jqXHR);
          if (!transport) {
            done(-1, "No Transport");
          } else {
            jqXHR.readyState = 1;
            if (fireGlobals) {
              globalEventContext.trigger("ajaxSend", [jqXHR, s4]);
            }
            if (completed2) {
              return jqXHR;
            }
            if (s4.async && s4.timeout > 0) {
              timeoutTimer = window2.setTimeout(function() {
                jqXHR.abort("timeout");
              }, s4.timeout);
            }
            try {
              completed2 = false;
              transport.send(requestHeaders, done);
            } catch (e5) {
              if (completed2) {
                throw e5;
              }
              done(-1, e5);
            }
          }
          function done(status, nativeStatusText, responses, headers) {
            var isSuccess, success, error, response, modified, statusText = nativeStatusText;
            if (completed2) {
              return;
            }
            completed2 = true;
            if (timeoutTimer) {
              window2.clearTimeout(timeoutTimer);
            }
            transport = void 0;
            responseHeadersString = headers || "";
            jqXHR.readyState = status > 0 ? 4 : 0;
            isSuccess = status >= 200 && status < 300 || status === 304;
            if (responses) {
              response = ajaxHandleResponses(s4, jqXHR, responses);
            }
            if (!isSuccess && jQuery4.inArray("script", s4.dataTypes) > -1 && jQuery4.inArray("json", s4.dataTypes) < 0) {
              s4.converters["text script"] = function() {
              };
            }
            response = ajaxConvert(s4, response, jqXHR, isSuccess);
            if (isSuccess) {
              if (s4.ifModified) {
                modified = jqXHR.getResponseHeader("Last-Modified");
                if (modified) {
                  jQuery4.lastModified[cacheURL] = modified;
                }
                modified = jqXHR.getResponseHeader("etag");
                if (modified) {
                  jQuery4.etag[cacheURL] = modified;
                }
              }
              if (status === 204 || s4.type === "HEAD") {
                statusText = "nocontent";
              } else if (status === 304) {
                statusText = "notmodified";
              } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                isSuccess = !error;
              }
            } else {
              error = statusText;
              if (status || !statusText) {
                statusText = "error";
                if (status < 0) {
                  status = 0;
                }
              }
            }
            jqXHR.status = status;
            jqXHR.statusText = (nativeStatusText || statusText) + "";
            if (isSuccess) {
              deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
            } else {
              deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
            }
            jqXHR.statusCode(statusCode);
            statusCode = void 0;
            if (fireGlobals) {
              globalEventContext.trigger(
                isSuccess ? "ajaxSuccess" : "ajaxError",
                [jqXHR, s4, isSuccess ? success : error]
              );
            }
            completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
            if (fireGlobals) {
              globalEventContext.trigger("ajaxComplete", [jqXHR, s4]);
              if (!--jQuery4.active) {
                jQuery4.event.trigger("ajaxStop");
              }
            }
          }
          return jqXHR;
        },
        getJSON: function(url, data, callback) {
          return jQuery4.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
          return jQuery4.get(url, void 0, callback, "script");
        }
      });
      jQuery4.each(["get", "post"], function(_i, method) {
        jQuery4[method] = function(url, data, callback, type) {
          if (isFunction2(data)) {
            type = type || callback;
            callback = data;
            data = void 0;
          }
          return jQuery4.ajax(jQuery4.extend({
            url,
            type: method,
            dataType: type,
            data,
            success: callback
          }, jQuery4.isPlainObject(url) && url));
        };
      });
      jQuery4.ajaxPrefilter(function(s4) {
        var i5;
        for (i5 in s4.headers) {
          if (i5.toLowerCase() === "content-type") {
            s4.contentType = s4.headers[i5] || "";
          }
        }
      });
      jQuery4._evalUrl = function(url, options, doc) {
        return jQuery4.ajax({
          url,
          // Make this explicit, since user can override this through ajaxSetup (trac-11264)
          type: "GET",
          dataType: "script",
          cache: true,
          async: false,
          global: false,
          // Only evaluate the response if it is successful (gh-4126)
          // dataFilter is not invoked for failure responses, so using it instead
          // of the default converter is kludgy but it works.
          converters: {
            "text script": function() {
            }
          },
          dataFilter: function(response) {
            jQuery4.globalEval(response, options, doc);
          }
        });
      };
      jQuery4.fn.extend({
        wrapAll: function(html) {
          var wrap;
          if (this[0]) {
            if (isFunction2(html)) {
              html = html.call(this[0]);
            }
            wrap = jQuery4(html, this[0].ownerDocument).eq(0).clone(true);
            if (this[0].parentNode) {
              wrap.insertBefore(this[0]);
            }
            wrap.map(function() {
              var elem = this;
              while (elem.firstElementChild) {
                elem = elem.firstElementChild;
              }
              return elem;
            }).append(this);
          }
          return this;
        },
        wrapInner: function(html) {
          if (isFunction2(html)) {
            return this.each(function(i5) {
              jQuery4(this).wrapInner(html.call(this, i5));
            });
          }
          return this.each(function() {
            var self = jQuery4(this), contents = self.contents();
            if (contents.length) {
              contents.wrapAll(html);
            } else {
              self.append(html);
            }
          });
        },
        wrap: function(html) {
          var htmlIsFunction = isFunction2(html);
          return this.each(function(i5) {
            jQuery4(this).wrapAll(htmlIsFunction ? html.call(this, i5) : html);
          });
        },
        unwrap: function(selector) {
          this.parent(selector).not("body").each(function() {
            jQuery4(this).replaceWith(this.childNodes);
          });
          return this;
        }
      });
      jQuery4.expr.pseudos.hidden = function(elem) {
        return !jQuery4.expr.pseudos.visible(elem);
      };
      jQuery4.expr.pseudos.visible = function(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
      };
      jQuery4.ajaxSettings.xhr = function() {
        try {
          return new window2.XMLHttpRequest();
        } catch (e5) {
        }
      };
      var xhrSuccessStatus = {
        // File protocol always yields status code 0, assume 200
        0: 200,
        // Support: IE <=9 only
        // trac-1450: sometimes IE returns 1223 when it should be 204
        1223: 204
      }, xhrSupported = jQuery4.ajaxSettings.xhr();
      support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
      support.ajax = xhrSupported = !!xhrSupported;
      jQuery4.ajaxTransport(function(options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) {
          return {
            send: function(headers, complete) {
              var i5, xhr = options.xhr();
              xhr.open(
                options.type,
                options.url,
                options.async,
                options.username,
                options.password
              );
              if (options.xhrFields) {
                for (i5 in options.xhrFields) {
                  xhr[i5] = options.xhrFields[i5];
                }
              }
              if (options.mimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(options.mimeType);
              }
              if (!options.crossDomain && !headers["X-Requested-With"]) {
                headers["X-Requested-With"] = "XMLHttpRequest";
              }
              for (i5 in headers) {
                xhr.setRequestHeader(i5, headers[i5]);
              }
              callback = function(type) {
                return function() {
                  if (callback) {
                    callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                    if (type === "abort") {
                      xhr.abort();
                    } else if (type === "error") {
                      if (typeof xhr.status !== "number") {
                        complete(0, "error");
                      } else {
                        complete(
                          // File: protocol always yields status 0; see trac-8605, trac-14207
                          xhr.status,
                          xhr.statusText
                        );
                      }
                    } else {
                      complete(
                        xhrSuccessStatus[xhr.status] || xhr.status,
                        xhr.statusText,
                        // Support: IE <=9 only
                        // IE9 has no XHR2 but throws on binary (trac-11426)
                        // For XHR2 non-text, let the caller handle it (gh-2498)
                        (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                        xhr.getAllResponseHeaders()
                      );
                    }
                  }
                };
              };
              xhr.onload = callback();
              errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
              if (xhr.onabort !== void 0) {
                xhr.onabort = errorCallback;
              } else {
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    window2.setTimeout(function() {
                      if (callback) {
                        errorCallback();
                      }
                    });
                  }
                };
              }
              callback = callback("abort");
              try {
                xhr.send(options.hasContent && options.data || null);
              } catch (e5) {
                if (callback) {
                  throw e5;
                }
              }
            },
            abort: function() {
              if (callback) {
                callback();
              }
            }
          };
        }
      });
      jQuery4.ajaxPrefilter(function(s4) {
        if (s4.crossDomain) {
          s4.contents.script = false;
        }
      });
      jQuery4.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
          script: /\b(?:java|ecma)script\b/
        },
        converters: {
          "text script": function(text) {
            jQuery4.globalEval(text);
            return text;
          }
        }
      });
      jQuery4.ajaxPrefilter("script", function(s4) {
        if (s4.cache === void 0) {
          s4.cache = false;
        }
        if (s4.crossDomain) {
          s4.type = "GET";
        }
      });
      jQuery4.ajaxTransport("script", function(s4) {
        if (s4.crossDomain || s4.scriptAttrs) {
          var script, callback;
          return {
            send: function(_2, complete) {
              script = jQuery4("<script>").attr(s4.scriptAttrs || {}).prop({ charset: s4.scriptCharset, src: s4.url }).on("load error", callback = function(evt) {
                script.remove();
                callback = null;
                if (evt) {
                  complete(evt.type === "error" ? 404 : 200, evt.type);
                }
              });
              document2.head.appendChild(script[0]);
            },
            abort: function() {
              if (callback) {
                callback();
              }
            }
          };
        }
      });
      var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
      jQuery4.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
          var callback = oldCallbacks.pop() || jQuery4.expando + "_" + nonce.guid++;
          this[callback] = true;
          return callback;
        }
      });
      jQuery4.ajaxPrefilter("json jsonp", function(s4, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s4.jsonp !== false && (rjsonp.test(s4.url) ? "url" : typeof s4.data === "string" && (s4.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s4.data) && "data");
        if (jsonProp || s4.dataTypes[0] === "jsonp") {
          callbackName = s4.jsonpCallback = isFunction2(s4.jsonpCallback) ? s4.jsonpCallback() : s4.jsonpCallback;
          if (jsonProp) {
            s4[jsonProp] = s4[jsonProp].replace(rjsonp, "$1" + callbackName);
          } else if (s4.jsonp !== false) {
            s4.url += (rquery.test(s4.url) ? "&" : "?") + s4.jsonp + "=" + callbackName;
          }
          s4.converters["script json"] = function() {
            if (!responseContainer) {
              jQuery4.error(callbackName + " was not called");
            }
            return responseContainer[0];
          };
          s4.dataTypes[0] = "json";
          overwritten = window2[callbackName];
          window2[callbackName] = function() {
            responseContainer = arguments;
          };
          jqXHR.always(function() {
            if (overwritten === void 0) {
              jQuery4(window2).removeProp(callbackName);
            } else {
              window2[callbackName] = overwritten;
            }
            if (s4[callbackName]) {
              s4.jsonpCallback = originalSettings.jsonpCallback;
              oldCallbacks.push(callbackName);
            }
            if (responseContainer && isFunction2(overwritten)) {
              overwritten(responseContainer[0]);
            }
            responseContainer = overwritten = void 0;
          });
          return "script";
        }
      });
      support.createHTMLDocument = (function() {
        var body = document2.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
      })();
      jQuery4.parseHTML = function(data, context, keepScripts) {
        if (typeof data !== "string") {
          return [];
        }
        if (typeof context === "boolean") {
          keepScripts = context;
          context = false;
        }
        var base, parsed, scripts;
        if (!context) {
          if (support.createHTMLDocument) {
            context = document2.implementation.createHTMLDocument("");
            base = context.createElement("base");
            base.href = document2.location.href;
            context.head.appendChild(base);
          } else {
            context = document2;
          }
        }
        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];
        if (parsed) {
          return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
          jQuery4(scripts).remove();
        }
        return jQuery4.merge([], parsed.childNodes);
      };
      jQuery4.fn.load = function(url, params, callback) {
        var selector, type, response, self = this, off = url.indexOf(" ");
        if (off > -1) {
          selector = stripAndCollapse(url.slice(off));
          url = url.slice(0, off);
        }
        if (isFunction2(params)) {
          callback = params;
          params = void 0;
        } else if (params && typeof params === "object") {
          type = "POST";
        }
        if (self.length > 0) {
          jQuery4.ajax({
            url,
            // If "type" variable is undefined, then "GET" method will be used.
            // Make value of this field explicit since
            // user can override it through ajaxSetup method
            type: type || "GET",
            dataType: "html",
            data: params
          }).done(function(responseText) {
            response = arguments;
            self.html(selector ? (
              // If a selector was specified, locate the right elements in a dummy div
              // Exclude scripts to avoid IE 'Permission Denied' errors
              jQuery4("<div>").append(jQuery4.parseHTML(responseText)).find(selector)
            ) : (
              // Otherwise use the full result
              responseText
            ));
          }).always(callback && function(jqXHR, status) {
            self.each(function() {
              callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
            });
          });
        }
        return this;
      };
      jQuery4.expr.pseudos.animated = function(elem) {
        return jQuery4.grep(jQuery4.timers, function(fn) {
          return elem === fn.elem;
        }).length;
      };
      jQuery4.offset = {
        setOffset: function(elem, options, i5) {
          var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery4.css(elem, "position"), curElem = jQuery4(elem), props = {};
          if (position === "static") {
            elem.style.position = "relative";
          }
          curOffset = curElem.offset();
          curCSSTop = jQuery4.css(elem, "top");
          curCSSLeft = jQuery4.css(elem, "left");
          calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
          if (calculatePosition) {
            curPosition = curElem.position();
            curTop = curPosition.top;
            curLeft = curPosition.left;
          } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
          }
          if (isFunction2(options)) {
            options = options.call(elem, i5, jQuery4.extend({}, curOffset));
          }
          if (options.top != null) {
            props.top = options.top - curOffset.top + curTop;
          }
          if (options.left != null) {
            props.left = options.left - curOffset.left + curLeft;
          }
          if ("using" in options) {
            options.using.call(elem, props);
          } else {
            curElem.css(props);
          }
        }
      };
      jQuery4.fn.extend({
        // offset() relates an element's border box to the document origin
        offset: function(options) {
          if (arguments.length) {
            return options === void 0 ? this : this.each(function(i5) {
              jQuery4.offset.setOffset(this, options, i5);
            });
          }
          var rect, win, elem = this[0];
          if (!elem) {
            return;
          }
          if (!elem.getClientRects().length) {
            return { top: 0, left: 0 };
          }
          rect = elem.getBoundingClientRect();
          win = elem.ownerDocument.defaultView;
          return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
          };
        },
        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function() {
          if (!this[0]) {
            return;
          }
          var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
          if (jQuery4.css(elem, "position") === "fixed") {
            offset = elem.getBoundingClientRect();
          } else {
            offset = this.offset();
            doc = elem.ownerDocument;
            offsetParent = elem.offsetParent || doc.documentElement;
            while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery4.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.parentNode;
            }
            if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
              parentOffset = jQuery4(offsetParent).offset();
              parentOffset.top += jQuery4.css(offsetParent, "borderTopWidth", true);
              parentOffset.left += jQuery4.css(offsetParent, "borderLeftWidth", true);
            }
          }
          return {
            top: offset.top - parentOffset.top - jQuery4.css(elem, "marginTop", true),
            left: offset.left - parentOffset.left - jQuery4.css(elem, "marginLeft", true)
          };
        },
        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
          return this.map(function() {
            var offsetParent = this.offsetParent;
            while (offsetParent && jQuery4.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || documentElement;
          });
        }
      });
      jQuery4.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery4.fn[method] = function(val) {
          return access(this, function(elem, method2, val2) {
            var win;
            if (isWindow(elem)) {
              win = elem;
            } else if (elem.nodeType === 9) {
              win = elem.defaultView;
            }
            if (val2 === void 0) {
              return win ? win[prop] : elem[method2];
            }
            if (win) {
              win.scrollTo(
                !top ? val2 : win.pageXOffset,
                top ? val2 : win.pageYOffset
              );
            } else {
              elem[method2] = val2;
            }
          }, method, val, arguments.length);
        };
      });
      jQuery4.each(["top", "left"], function(_i, prop) {
        jQuery4.cssHooks[prop] = addGetHookIf(
          support.pixelPosition,
          function(elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery4(elem).position()[prop] + "px" : computed;
            }
          }
        );
      });
      jQuery4.each({ Height: "height", Width: "width" }, function(name, type) {
        jQuery4.each({
          padding: "inner" + name,
          content: type,
          "": "outer" + name
        }, function(defaultExtra, funcName) {
          jQuery4.fn[funcName] = function(margin, value) {
            var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
            return access(this, function(elem, type2, value2) {
              var doc;
              if (isWindow(elem)) {
                return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
              }
              if (elem.nodeType === 9) {
                doc = elem.documentElement;
                return Math.max(
                  elem.body["scroll" + name],
                  doc["scroll" + name],
                  elem.body["offset" + name],
                  doc["offset" + name],
                  doc["client" + name]
                );
              }
              return value2 === void 0 ? (
                // Get width or height on the element, requesting but not forcing parseFloat
                jQuery4.css(elem, type2, extra)
              ) : (
                // Set width or height on the element
                jQuery4.style(elem, type2, value2, extra)
              );
            }, type, chainable ? margin : void 0, chainable);
          };
        });
      });
      jQuery4.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
      ], function(_i, type) {
        jQuery4.fn[type] = function(fn) {
          return this.on(type, fn);
        };
      });
      jQuery4.fn.extend({
        bind: function(types, data, fn) {
          return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
          return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
          return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
          return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        hover: function(fnOver, fnOut) {
          return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
        }
      });
      jQuery4.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
        function(_i, name) {
          jQuery4.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
          };
        }
      );
      var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
      jQuery4.proxy = function(fn, context) {
        var tmp, args, proxy;
        if (typeof context === "string") {
          tmp = fn[context];
          context = fn;
          fn = tmp;
        }
        if (!isFunction2(fn)) {
          return void 0;
        }
        args = slice.call(arguments, 2);
        proxy = function() {
          return fn.apply(context || this, args.concat(slice.call(arguments)));
        };
        proxy.guid = fn.guid = fn.guid || jQuery4.guid++;
        return proxy;
      };
      jQuery4.holdReady = function(hold) {
        if (hold) {
          jQuery4.readyWait++;
        } else {
          jQuery4.ready(true);
        }
      };
      jQuery4.isArray = Array.isArray;
      jQuery4.parseJSON = JSON.parse;
      jQuery4.nodeName = nodeName;
      jQuery4.isFunction = isFunction2;
      jQuery4.isWindow = isWindow;
      jQuery4.camelCase = camelCase;
      jQuery4.type = toType;
      jQuery4.now = Date.now;
      jQuery4.isNumeric = function(obj) {
        var type = jQuery4.type(obj);
        return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        !isNaN(obj - parseFloat(obj));
      };
      jQuery4.trim = function(text) {
        return text == null ? "" : (text + "").replace(rtrim, "$1");
      };
      if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
          return jQuery4;
        });
      }
      var _jQuery = window2.jQuery, _$ = window2.$;
      jQuery4.noConflict = function(deep) {
        if (window2.$ === jQuery4) {
          window2.$ = _$;
        }
        if (deep && window2.jQuery === jQuery4) {
          window2.jQuery = _jQuery;
        }
        return jQuery4;
      };
      if (typeof noGlobal === "undefined") {
        window2.jQuery = window2.$ = jQuery4;
      }
      return jQuery4;
    });
  }
});

// ../../node_modules/bootstrap-select/dist/js/bootstrap-select.js
var require_bootstrap_select = __commonJS({
  "../../node_modules/bootstrap-select/dist/js/bootstrap-select.js"(exports, module) {
    (function(root, factory) {
      if (root === void 0 && window !== void 0) root = window;
      if (typeof define === "function" && define.amd) {
        define(["jquery"], function(a0) {
          return factory(a0);
        });
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require_jquery());
      } else {
        factory(root["jQuery"]);
      }
    })(exports, function(jQuery4) {
      (function($2) {
        "use strict";
        var DISALLOWED_ATTRIBUTES = ["sanitize", "whiteList", "sanitizeFn"];
        var uriAttrs = [
          "background",
          "cite",
          "href",
          "itemtype",
          "longdesc",
          "poster",
          "src",
          "xlink:href"
        ];
        var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
        var DefaultWhitelist = {
          // Global attributes allowed on any supplied element below.
          "*": ["class", "dir", "id", "lang", "role", "tabindex", "style", ARIA_ATTRIBUTE_PATTERN],
          a: ["target", "href", "title", "rel"],
          area: [],
          b: [],
          br: [],
          col: [],
          code: [],
          div: [],
          em: [],
          hr: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          i: [],
          img: ["src", "alt", "title", "width", "height"],
          li: [],
          ol: [],
          p: [],
          pre: [],
          s: [],
          small: [],
          span: [],
          sub: [],
          sup: [],
          strong: [],
          u: [],
          ul: []
        };
        var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
        var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
        function allowedAttribute(attr, allowedAttributeList) {
          var attrName = attr.nodeName.toLowerCase();
          if ($2.inArray(attrName, allowedAttributeList) !== -1) {
            if ($2.inArray(attrName, uriAttrs) !== -1) {
              return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
            }
            return true;
          }
          var regExp = $2(allowedAttributeList).filter(function(index, value) {
            return value instanceof RegExp;
          });
          for (var i5 = 0, l3 = regExp.length; i5 < l3; i5++) {
            if (attrName.match(regExp[i5])) {
              return true;
            }
          }
          return false;
        }
        function sanitizeHtml(unsafeElements, whiteList, sanitizeFn) {
          if (sanitizeFn && typeof sanitizeFn === "function") {
            return sanitizeFn(unsafeElements);
          }
          var whitelistKeys = Object.keys(whiteList);
          for (var i5 = 0, len = unsafeElements.length; i5 < len; i5++) {
            var elements = unsafeElements[i5].querySelectorAll("*");
            for (var j2 = 0, len2 = elements.length; j2 < len2; j2++) {
              var el = elements[j2];
              var elName = el.nodeName.toLowerCase();
              if (whitelistKeys.indexOf(elName) === -1) {
                el.parentNode.removeChild(el);
                continue;
              }
              var attributeList = [].slice.call(el.attributes);
              var whitelistedAttributes = [].concat(whiteList["*"] || [], whiteList[elName] || []);
              for (var k2 = 0, len3 = attributeList.length; k2 < len3; k2++) {
                var attr = attributeList[k2];
                if (!allowedAttribute(attr, whitelistedAttributes)) {
                  el.removeAttribute(attr.nodeName);
                }
              }
            }
          }
        }
        if (!("classList" in document.createElement("_"))) {
          (function(view) {
            if (!("Element" in view)) return;
            var classListProp = "classList", protoProp = "prototype", elemCtrProto = view.Element[protoProp], objCtr = Object, classListGetter = function() {
              var $elem = $2(this);
              return {
                add: function(classes) {
                  classes = Array.prototype.slice.call(arguments).join(" ");
                  return $elem.addClass(classes);
                },
                remove: function(classes) {
                  classes = Array.prototype.slice.call(arguments).join(" ");
                  return $elem.removeClass(classes);
                },
                toggle: function(classes, force) {
                  return $elem.toggleClass(classes, force);
                },
                contains: function(classes) {
                  return $elem.hasClass(classes);
                }
              };
            };
            if (objCtr.defineProperty) {
              var classListPropDesc = {
                get: classListGetter,
                enumerable: true,
                configurable: true
              };
              try {
                objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
              } catch (ex) {
                if (ex.number === void 0 || ex.number === -2146823252) {
                  classListPropDesc.enumerable = false;
                  objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                }
              }
            } else if (objCtr[protoProp].__defineGetter__) {
              elemCtrProto.__defineGetter__(classListProp, classListGetter);
            }
          })(window);
        }
        var testElement = document.createElement("_");
        testElement.classList.add("c1", "c2");
        if (!testElement.classList.contains("c2")) {
          var _add = DOMTokenList.prototype.add, _remove = DOMTokenList.prototype.remove;
          DOMTokenList.prototype.add = function() {
            Array.prototype.forEach.call(arguments, _add.bind(this));
          };
          DOMTokenList.prototype.remove = function() {
            Array.prototype.forEach.call(arguments, _remove.bind(this));
          };
        }
        testElement.classList.toggle("c3", false);
        if (testElement.classList.contains("c3")) {
          var _toggle = DOMTokenList.prototype.toggle;
          DOMTokenList.prototype.toggle = function(token, force) {
            if (1 in arguments && !this.contains(token) === !force) {
              return force;
            } else {
              return _toggle.call(this, token);
            }
          };
        }
        testElement = null;
        function isEqual(array1, array2) {
          return array1.length === array2.length && array1.every(function(element, index) {
            return element === array2[index];
          });
        }
        ;
        if (!String.prototype.startsWith) {
          (function() {
            "use strict";
            var defineProperty = (function() {
              try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
              } catch (error) {
              }
              return result;
            })();
            var toString = {}.toString;
            var startsWith2 = function(search) {
              if (this == null) {
                throw new TypeError();
              }
              var string = String(this);
              if (search && toString.call(search) == "[object RegExp]") {
                throw new TypeError();
              }
              var stringLength = string.length;
              var searchString = String(search);
              var searchLength = searchString.length;
              var position = arguments.length > 1 ? arguments[1] : void 0;
              var pos = position ? Number(position) : 0;
              if (pos != pos) {
                pos = 0;
              }
              var start = Math.min(Math.max(pos, 0), stringLength);
              if (searchLength + start > stringLength) {
                return false;
              }
              var index = -1;
              while (++index < searchLength) {
                if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                  return false;
                }
              }
              return true;
            };
            if (defineProperty) {
              defineProperty(String.prototype, "startsWith", {
                "value": startsWith2,
                "configurable": true,
                "writable": true
              });
            } else {
              String.prototype.startsWith = startsWith2;
            }
          })();
        }
        if (!Object.keys) {
          Object.keys = function(o6, k2, r5) {
            r5 = [];
            for (k2 in o6) {
              r5.hasOwnProperty.call(o6, k2) && r5.push(k2);
            }
            return r5;
          };
        }
        if (HTMLSelectElement && !HTMLSelectElement.prototype.hasOwnProperty("selectedOptions")) {
          Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
            get: function() {
              return this.querySelectorAll(":checked");
            }
          });
        }
        function getSelectedOptions(select, ignoreDisabled) {
          var selectedOptions = select.selectedOptions, options = [], opt;
          if (ignoreDisabled) {
            for (var i5 = 0, len = selectedOptions.length; i5 < len; i5++) {
              opt = selectedOptions[i5];
              if (!(opt.disabled || opt.parentNode.tagName === "OPTGROUP" && opt.parentNode.disabled)) {
                options.push(opt);
              }
            }
            return options;
          }
          return selectedOptions;
        }
        function getSelectValues(select, selectedOptions) {
          var value = [], options = selectedOptions || select.selectedOptions, opt;
          for (var i5 = 0, len = options.length; i5 < len; i5++) {
            opt = options[i5];
            if (!(opt.disabled || opt.parentNode.tagName === "OPTGROUP" && opt.parentNode.disabled)) {
              value.push(opt.value);
            }
          }
          if (!select.multiple) {
            return !value.length ? null : value[0];
          }
          return value;
        }
        var valHooks = {
          useDefault: false,
          _set: $2.valHooks.select.set
        };
        $2.valHooks.select.set = function(elem, value) {
          if (value && !valHooks.useDefault) $2(elem).data("selected", true);
          return valHooks._set.apply(this, arguments);
        };
        var changedArguments = null;
        var EventIsSupported = (function() {
          try {
            new Event("change");
            return true;
          } catch (e5) {
            return false;
          }
        })();
        $2.fn.triggerNative = function(eventName) {
          var el = this[0], event;
          if (el.dispatchEvent) {
            if (EventIsSupported) {
              event = new Event(eventName, {
                bubbles: true
              });
            } else {
              event = document.createEvent("Event");
              event.initEvent(eventName, true, false);
            }
            el.dispatchEvent(event);
          } else if (el.fireEvent) {
            event = document.createEventObject();
            event.eventType = eventName;
            el.fireEvent("on" + eventName, event);
          } else {
            this.trigger(eventName);
          }
        };
        function stringSearch(li, searchString, method, normalize) {
          var stringTypes = [
            "display",
            "subtext",
            "tokens"
          ], searchSuccess = false;
          for (var i5 = 0; i5 < stringTypes.length; i5++) {
            var stringType = stringTypes[i5], string = li[stringType];
            if (string) {
              string = string.toString();
              if (stringType === "display") {
                string = string.replace(/<[^>]+>/g, "");
              }
              if (normalize) string = normalizeToBase(string);
              string = string.toUpperCase();
              if (method === "contains") {
                searchSuccess = string.indexOf(searchString) >= 0;
              } else {
                searchSuccess = string.startsWith(searchString);
              }
              if (searchSuccess) break;
            }
          }
          return searchSuccess;
        }
        function toInteger(value) {
          return parseInt(value, 10) || 0;
        }
        var deburredLetters = {
          // Latin-1 Supplement block.
          "\xC0": "A",
          "\xC1": "A",
          "\xC2": "A",
          "\xC3": "A",
          "\xC4": "A",
          "\xC5": "A",
          "\xE0": "a",
          "\xE1": "a",
          "\xE2": "a",
          "\xE3": "a",
          "\xE4": "a",
          "\xE5": "a",
          "\xC7": "C",
          "\xE7": "c",
          "\xD0": "D",
          "\xF0": "d",
          "\xC8": "E",
          "\xC9": "E",
          "\xCA": "E",
          "\xCB": "E",
          "\xE8": "e",
          "\xE9": "e",
          "\xEA": "e",
          "\xEB": "e",
          "\xCC": "I",
          "\xCD": "I",
          "\xCE": "I",
          "\xCF": "I",
          "\xEC": "i",
          "\xED": "i",
          "\xEE": "i",
          "\xEF": "i",
          "\xD1": "N",
          "\xF1": "n",
          "\xD2": "O",
          "\xD3": "O",
          "\xD4": "O",
          "\xD5": "O",
          "\xD6": "O",
          "\xD8": "O",
          "\xF2": "o",
          "\xF3": "o",
          "\xF4": "o",
          "\xF5": "o",
          "\xF6": "o",
          "\xF8": "o",
          "\xD9": "U",
          "\xDA": "U",
          "\xDB": "U",
          "\xDC": "U",
          "\xF9": "u",
          "\xFA": "u",
          "\xFB": "u",
          "\xFC": "u",
          "\xDD": "Y",
          "\xFD": "y",
          "\xFF": "y",
          "\xC6": "Ae",
          "\xE6": "ae",
          "\xDE": "Th",
          "\xFE": "th",
          "\xDF": "ss",
          // Latin Extended-A block.
          "\u0100": "A",
          "\u0102": "A",
          "\u0104": "A",
          "\u0101": "a",
          "\u0103": "a",
          "\u0105": "a",
          "\u0106": "C",
          "\u0108": "C",
          "\u010A": "C",
          "\u010C": "C",
          "\u0107": "c",
          "\u0109": "c",
          "\u010B": "c",
          "\u010D": "c",
          "\u010E": "D",
          "\u0110": "D",
          "\u010F": "d",
          "\u0111": "d",
          "\u0112": "E",
          "\u0114": "E",
          "\u0116": "E",
          "\u0118": "E",
          "\u011A": "E",
          "\u0113": "e",
          "\u0115": "e",
          "\u0117": "e",
          "\u0119": "e",
          "\u011B": "e",
          "\u011C": "G",
          "\u011E": "G",
          "\u0120": "G",
          "\u0122": "G",
          "\u011D": "g",
          "\u011F": "g",
          "\u0121": "g",
          "\u0123": "g",
          "\u0124": "H",
          "\u0126": "H",
          "\u0125": "h",
          "\u0127": "h",
          "\u0128": "I",
          "\u012A": "I",
          "\u012C": "I",
          "\u012E": "I",
          "\u0130": "I",
          "\u0129": "i",
          "\u012B": "i",
          "\u012D": "i",
          "\u012F": "i",
          "\u0131": "i",
          "\u0134": "J",
          "\u0135": "j",
          "\u0136": "K",
          "\u0137": "k",
          "\u0138": "k",
          "\u0139": "L",
          "\u013B": "L",
          "\u013D": "L",
          "\u013F": "L",
          "\u0141": "L",
          "\u013A": "l",
          "\u013C": "l",
          "\u013E": "l",
          "\u0140": "l",
          "\u0142": "l",
          "\u0143": "N",
          "\u0145": "N",
          "\u0147": "N",
          "\u014A": "N",
          "\u0144": "n",
          "\u0146": "n",
          "\u0148": "n",
          "\u014B": "n",
          "\u014C": "O",
          "\u014E": "O",
          "\u0150": "O",
          "\u014D": "o",
          "\u014F": "o",
          "\u0151": "o",
          "\u0154": "R",
          "\u0156": "R",
          "\u0158": "R",
          "\u0155": "r",
          "\u0157": "r",
          "\u0159": "r",
          "\u015A": "S",
          "\u015C": "S",
          "\u015E": "S",
          "\u0160": "S",
          "\u015B": "s",
          "\u015D": "s",
          "\u015F": "s",
          "\u0161": "s",
          "\u0162": "T",
          "\u0164": "T",
          "\u0166": "T",
          "\u0163": "t",
          "\u0165": "t",
          "\u0167": "t",
          "\u0168": "U",
          "\u016A": "U",
          "\u016C": "U",
          "\u016E": "U",
          "\u0170": "U",
          "\u0172": "U",
          "\u0169": "u",
          "\u016B": "u",
          "\u016D": "u",
          "\u016F": "u",
          "\u0171": "u",
          "\u0173": "u",
          "\u0174": "W",
          "\u0175": "w",
          "\u0176": "Y",
          "\u0177": "y",
          "\u0178": "Y",
          "\u0179": "Z",
          "\u017B": "Z",
          "\u017D": "Z",
          "\u017A": "z",
          "\u017C": "z",
          "\u017E": "z",
          "\u0132": "IJ",
          "\u0133": "ij",
          "\u0152": "Oe",
          "\u0153": "oe",
          "\u0149": "'n",
          "\u017F": "s"
        };
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboMarksExtendedRange = "\\u1ab0-\\u1aff", rsComboMarksSupplementRange = "\\u1dc0-\\u1dff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
        var rsCombo = "[" + rsComboRange + "]";
        var reComboMark = RegExp(rsCombo, "g");
        function deburrLetter(key) {
          return deburredLetters[key];
        }
        ;
        function normalizeToBase(string) {
          string = string.toString();
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        var escapeMap = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        };
        var createEscaper = function(map) {
          var escaper = function(match) {
            return map[match];
          };
          var source = "(?:" + Object.keys(map).join("|") + ")";
          var testRegexp = RegExp(source);
          var replaceRegexp = RegExp(source, "g");
          return function(string) {
            string = string == null ? "" : "" + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
          };
        };
        var htmlEscape = createEscaper(escapeMap);
        var keyCodeMap = {
          32: " ",
          48: "0",
          49: "1",
          50: "2",
          51: "3",
          52: "4",
          53: "5",
          54: "6",
          55: "7",
          56: "8",
          57: "9",
          59: ";",
          65: "A",
          66: "B",
          67: "C",
          68: "D",
          69: "E",
          70: "F",
          71: "G",
          72: "H",
          73: "I",
          74: "J",
          75: "K",
          76: "L",
          77: "M",
          78: "N",
          79: "O",
          80: "P",
          81: "Q",
          82: "R",
          83: "S",
          84: "T",
          85: "U",
          86: "V",
          87: "W",
          88: "X",
          89: "Y",
          90: "Z",
          96: "0",
          97: "1",
          98: "2",
          99: "3",
          100: "4",
          101: "5",
          102: "6",
          103: "7",
          104: "8",
          105: "9"
        };
        var keyCodes = {
          ESCAPE: 27,
          // KeyboardEvent.which value for Escape (Esc) key
          ENTER: 13,
          // KeyboardEvent.which value for Enter key
          SPACE: 32,
          // KeyboardEvent.which value for space key
          TAB: 9,
          // KeyboardEvent.which value for tab key
          ARROW_UP: 38,
          // KeyboardEvent.which value for up arrow key
          ARROW_DOWN: 40
          // KeyboardEvent.which value for down arrow key
        };
        var version = {
          success: false,
          major: "3"
        };
        try {
          version.full = ($2.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".");
          version.major = version.full[0];
          version.success = true;
        } catch (err) {
        }
        var selectId = 0;
        var EVENT_KEY = ".bs.select";
        var classNames = {
          DISABLED: "disabled",
          DIVIDER: "divider",
          SHOW: "open",
          DROPUP: "dropup",
          MENU: "dropdown-menu",
          MENURIGHT: "dropdown-menu-right",
          MENULEFT: "dropdown-menu-left",
          // to-do: replace with more advanced template/customization options
          BUTTONCLASS: "btn-default",
          POPOVERHEADER: "popover-title",
          ICONBASE: "glyphicon",
          TICKICON: "glyphicon-ok"
        };
        var Selector = {
          MENU: "." + classNames.MENU
        };
        var elementTemplates = {
          div: document.createElement("div"),
          span: document.createElement("span"),
          i: document.createElement("i"),
          subtext: document.createElement("small"),
          a: document.createElement("a"),
          li: document.createElement("li"),
          whitespace: document.createTextNode("\xA0"),
          fragment: document.createDocumentFragment()
        };
        elementTemplates.noResults = elementTemplates.li.cloneNode(false);
        elementTemplates.noResults.className = "no-results";
        elementTemplates.a.setAttribute("role", "option");
        elementTemplates.a.className = "dropdown-item";
        elementTemplates.subtext.className = "text-muted";
        elementTemplates.text = elementTemplates.span.cloneNode(false);
        elementTemplates.text.className = "text";
        elementTemplates.checkMark = elementTemplates.span.cloneNode(false);
        var REGEXP_ARROW = new RegExp(keyCodes.ARROW_UP + "|" + keyCodes.ARROW_DOWN);
        var REGEXP_TAB_OR_ESCAPE = new RegExp("^" + keyCodes.TAB + "$|" + keyCodes.ESCAPE);
        var generateOption = {
          li: function(content, classes, optgroup) {
            var li = elementTemplates.li.cloneNode(false);
            if (content) {
              if (content.nodeType === 1 || content.nodeType === 11) {
                li.appendChild(content);
              } else {
                li.innerHTML = content;
              }
            }
            if (typeof classes !== "undefined" && classes !== "") li.className = classes;
            if (typeof optgroup !== "undefined" && optgroup !== null) li.classList.add("optgroup-" + optgroup);
            return li;
          },
          a: function(text, classes, inline) {
            var a3 = elementTemplates.a.cloneNode(true);
            if (text) {
              if (text.nodeType === 11) {
                a3.appendChild(text);
              } else {
                a3.insertAdjacentHTML("beforeend", text);
              }
            }
            if (typeof classes !== "undefined" && classes !== "") a3.classList.add.apply(a3.classList, classes.split(/\s+/));
            if (inline) a3.setAttribute("style", inline);
            return a3;
          },
          text: function(options, useFragment) {
            var textElement = elementTemplates.text.cloneNode(false), subtextElement, iconElement;
            if (options.content) {
              textElement.innerHTML = options.content;
            } else {
              textElement.textContent = options.text;
              if (options.icon) {
                var whitespace = elementTemplates.whitespace.cloneNode(false);
                iconElement = (useFragment === true ? elementTemplates.i : elementTemplates.span).cloneNode(false);
                iconElement.className = this.options.iconBase + " " + options.icon;
                elementTemplates.fragment.appendChild(iconElement);
                elementTemplates.fragment.appendChild(whitespace);
              }
              if (options.subtext) {
                subtextElement = elementTemplates.subtext.cloneNode(false);
                subtextElement.textContent = options.subtext;
                textElement.appendChild(subtextElement);
              }
            }
            if (useFragment === true) {
              while (textElement.childNodes.length > 0) {
                elementTemplates.fragment.appendChild(textElement.childNodes[0]);
              }
            } else {
              elementTemplates.fragment.appendChild(textElement);
            }
            return elementTemplates.fragment;
          },
          label: function(options) {
            var textElement = elementTemplates.text.cloneNode(false), subtextElement, iconElement;
            textElement.innerHTML = options.display;
            if (options.icon) {
              var whitespace = elementTemplates.whitespace.cloneNode(false);
              iconElement = elementTemplates.span.cloneNode(false);
              iconElement.className = this.options.iconBase + " " + options.icon;
              elementTemplates.fragment.appendChild(iconElement);
              elementTemplates.fragment.appendChild(whitespace);
            }
            if (options.subtext) {
              subtextElement = elementTemplates.subtext.cloneNode(false);
              subtextElement.textContent = options.subtext;
              textElement.appendChild(subtextElement);
            }
            elementTemplates.fragment.appendChild(textElement);
            return elementTemplates.fragment;
          }
        };
        function showNoResults(searchMatch, searchValue) {
          if (!searchMatch.length) {
            elementTemplates.noResults.innerHTML = this.options.noneResultsText.replace("{0}", '"' + htmlEscape(searchValue) + '"');
            this.$menuInner[0].firstChild.appendChild(elementTemplates.noResults);
          }
        }
        var Selectpicker = function(element, options) {
          var that = this;
          if (!valHooks.useDefault) {
            $2.valHooks.select.set = valHooks._set;
            valHooks.useDefault = true;
          }
          this.$element = $2(element);
          this.$newElement = null;
          this.$button = null;
          this.$menu = null;
          this.options = options;
          this.selectpicker = {
            main: {},
            search: {},
            current: {},
            // current changes if a search is in progress
            view: {},
            isSearching: false,
            keydown: {
              keyHistory: "",
              resetKeyHistory: {
                start: function() {
                  return setTimeout(function() {
                    that.selectpicker.keydown.keyHistory = "";
                  }, 800);
                }
              }
            }
          };
          this.sizeInfo = {};
          if (this.options.title === null) {
            this.options.title = this.$element.attr("title");
          }
          var winPad = this.options.windowPadding;
          if (typeof winPad === "number") {
            this.options.windowPadding = [winPad, winPad, winPad, winPad];
          }
          this.val = Selectpicker.prototype.val;
          this.render = Selectpicker.prototype.render;
          this.refresh = Selectpicker.prototype.refresh;
          this.setStyle = Selectpicker.prototype.setStyle;
          this.selectAll = Selectpicker.prototype.selectAll;
          this.deselectAll = Selectpicker.prototype.deselectAll;
          this.destroy = Selectpicker.prototype.destroy;
          this.remove = Selectpicker.prototype.remove;
          this.show = Selectpicker.prototype.show;
          this.hide = Selectpicker.prototype.hide;
          this.init();
        };
        Selectpicker.VERSION = "1.13.18";
        Selectpicker.DEFAULTS = {
          noneSelectedText: "Nothing selected",
          noneResultsText: "No results matched {0}",
          countSelectedText: function(numSelected, numTotal) {
            return numSelected == 1 ? "{0} item selected" : "{0} items selected";
          },
          maxOptionsText: function(numAll, numGroup) {
            return [
              numAll == 1 ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)",
              numGroup == 1 ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"
            ];
          },
          selectAllText: "Select All",
          deselectAllText: "Deselect All",
          doneButton: false,
          doneButtonText: "Close",
          multipleSeparator: ", ",
          styleBase: "btn",
          style: classNames.BUTTONCLASS,
          size: "auto",
          title: null,
          selectedTextFormat: "values",
          width: false,
          container: false,
          hideDisabled: false,
          showSubtext: false,
          showIcon: true,
          showContent: true,
          dropupAuto: true,
          header: false,
          liveSearch: false,
          liveSearchPlaceholder: null,
          liveSearchNormalize: false,
          liveSearchStyle: "contains",
          actionsBox: false,
          iconBase: classNames.ICONBASE,
          tickIcon: classNames.TICKICON,
          showTick: false,
          template: {
            caret: '<span class="caret"></span>'
          },
          maxOptions: false,
          mobile: false,
          selectOnTab: false,
          dropdownAlignRight: false,
          windowPadding: 0,
          virtualScroll: 600,
          display: false,
          sanitize: true,
          sanitizeFn: null,
          whiteList: DefaultWhitelist
        };
        Selectpicker.prototype = {
          constructor: Selectpicker,
          init: function() {
            var that = this, id = this.$element.attr("id"), element = this.$element[0], form = element.form;
            selectId++;
            this.selectId = "bs-select-" + selectId;
            element.classList.add("bs-select-hidden");
            this.multiple = this.$element.prop("multiple");
            this.autofocus = this.$element.prop("autofocus");
            if (element.classList.contains("show-tick")) {
              this.options.showTick = true;
            }
            this.$newElement = this.createDropdown();
            this.buildData();
            this.$element.after(this.$newElement).prependTo(this.$newElement);
            if (form && element.form === null) {
              if (!form.id) form.id = "form-" + this.selectId;
              element.setAttribute("form", form.id);
            }
            this.$button = this.$newElement.children("button");
            this.$menu = this.$newElement.children(Selector.MENU);
            this.$menuInner = this.$menu.children(".inner");
            this.$searchbox = this.$menu.find("input");
            element.classList.remove("bs-select-hidden");
            if (this.options.dropdownAlignRight === true) this.$menu[0].classList.add(classNames.MENURIGHT);
            if (typeof id !== "undefined") {
              this.$button.attr("data-id", id);
            }
            this.checkDisabled();
            this.clickListener();
            if (this.options.liveSearch) {
              this.liveSearchListener();
              this.focusedParent = this.$searchbox[0];
            } else {
              this.focusedParent = this.$menuInner[0];
            }
            this.setStyle();
            this.render();
            this.setWidth();
            if (this.options.container) {
              this.selectPosition();
            } else {
              this.$element.on("hide" + EVENT_KEY, function() {
                if (that.isVirtual()) {
                  var menuInner = that.$menuInner[0], emptyMenu = menuInner.firstChild.cloneNode(false);
                  menuInner.replaceChild(emptyMenu, menuInner.firstChild);
                  menuInner.scrollTop = 0;
                }
              });
            }
            this.$menu.data("this", this);
            this.$newElement.data("this", this);
            if (this.options.mobile) this.mobile();
            this.$newElement.on({
              "hide.bs.dropdown": function(e5) {
                that.$element.trigger("hide" + EVENT_KEY, e5);
              },
              "hidden.bs.dropdown": function(e5) {
                that.$element.trigger("hidden" + EVENT_KEY, e5);
              },
              "show.bs.dropdown": function(e5) {
                that.$element.trigger("show" + EVENT_KEY, e5);
              },
              "shown.bs.dropdown": function(e5) {
                that.$element.trigger("shown" + EVENT_KEY, e5);
              }
            });
            if (element.hasAttribute("required")) {
              this.$element.on("invalid" + EVENT_KEY, function() {
                that.$button[0].classList.add("bs-invalid");
                that.$element.on("shown" + EVENT_KEY + ".invalid", function() {
                  that.$element.val(that.$element.val()).off("shown" + EVENT_KEY + ".invalid");
                }).on("rendered" + EVENT_KEY, function() {
                  if (this.validity.valid) that.$button[0].classList.remove("bs-invalid");
                  that.$element.off("rendered" + EVENT_KEY);
                });
                that.$button.on("blur" + EVENT_KEY, function() {
                  that.$element.trigger("focus").trigger("blur");
                  that.$button.off("blur" + EVENT_KEY);
                });
              });
            }
            setTimeout(function() {
              that.buildList();
              that.$element.trigger("loaded" + EVENT_KEY);
            });
          },
          createDropdown: function() {
            var showTick = this.multiple || this.options.showTick ? " show-tick" : "", multiselectable = this.multiple ? ' aria-multiselectable="true"' : "", inputGroup = "", autofocus = this.autofocus ? " autofocus" : "";
            if (version.major < 4 && this.$element.parent().hasClass("input-group")) {
              inputGroup = " input-group-btn";
            }
            var drop, header = "", searchbox = "", actionsbox = "", donebutton = "";
            if (this.options.header) {
              header = '<div class="' + classNames.POPOVERHEADER + '"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>";
            }
            if (this.options.liveSearch) {
              searchbox = '<div class="bs-searchbox"><input type="search" class="form-control" autocomplete="off"' + (this.options.liveSearchPlaceholder === null ? "" : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="combobox" aria-label="Search" aria-controls="' + this.selectId + '" aria-autocomplete="list"></div>';
            }
            if (this.multiple && this.options.actionsBox) {
              actionsbox = '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn ' + classNames.BUTTONCLASS + '">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn ' + classNames.BUTTONCLASS + '">' + this.options.deselectAllText + "</button></div></div>";
            }
            if (this.multiple && this.options.doneButton) {
              donebutton = '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm ' + classNames.BUTTONCLASS + '">' + this.options.doneButtonText + "</button></div></div>";
            }
            drop = '<div class="dropdown bootstrap-select' + showTick + inputGroup + '"><button type="button" tabindex="-1" class="' + this.options.styleBase + ' dropdown-toggle" ' + (this.options.display === "static" ? 'data-display="static"' : "") + 'data-toggle="dropdown"' + autofocus + ' role="combobox" aria-owns="' + this.selectId + '" aria-haspopup="listbox" aria-expanded="false"><div class="filter-option"><div class="filter-option-inner"><div class="filter-option-inner-inner"></div></div> </div>' + (version.major === "4" ? "" : '<span class="bs-caret">' + this.options.template.caret + "</span>") + '</button><div class="' + classNames.MENU + " " + (version.major === "4" ? "" : classNames.SHOW) + '">' + header + searchbox + actionsbox + '<div class="inner ' + classNames.SHOW + '" role="listbox" id="' + this.selectId + '" tabindex="-1" ' + multiselectable + '><ul class="' + classNames.MENU + " inner " + (version.major === "4" ? classNames.SHOW : "") + '" role="presentation"></ul></div>' + donebutton + "</div></div>";
            return $2(drop);
          },
          setPositionData: function() {
            this.selectpicker.view.canHighlight = [];
            this.selectpicker.view.size = 0;
            this.selectpicker.view.firstHighlightIndex = false;
            for (var i5 = 0; i5 < this.selectpicker.current.data.length; i5++) {
              var li = this.selectpicker.current.data[i5], canHighlight = true;
              if (li.type === "divider") {
                canHighlight = false;
                li.height = this.sizeInfo.dividerHeight;
              } else if (li.type === "optgroup-label") {
                canHighlight = false;
                li.height = this.sizeInfo.dropdownHeaderHeight;
              } else {
                li.height = this.sizeInfo.liHeight;
              }
              if (li.disabled) canHighlight = false;
              this.selectpicker.view.canHighlight.push(canHighlight);
              if (canHighlight) {
                this.selectpicker.view.size++;
                li.posinset = this.selectpicker.view.size;
                if (this.selectpicker.view.firstHighlightIndex === false) this.selectpicker.view.firstHighlightIndex = i5;
              }
              li.position = (i5 === 0 ? 0 : this.selectpicker.current.data[i5 - 1].position) + li.height;
            }
          },
          isVirtual: function() {
            return this.options.virtualScroll !== false && this.selectpicker.main.elements.length >= this.options.virtualScroll || this.options.virtualScroll === true;
          },
          createView: function(isSearching, setSize, refresh) {
            var that = this, scrollTop = 0, active = [], selected, prevActive;
            this.selectpicker.isSearching = isSearching;
            this.selectpicker.current = isSearching ? this.selectpicker.search : this.selectpicker.main;
            this.setPositionData();
            if (setSize) {
              if (refresh) {
                scrollTop = this.$menuInner[0].scrollTop;
              } else if (!that.multiple) {
                var element = that.$element[0], selectedIndex = (element.options[element.selectedIndex] || {}).liIndex;
                if (typeof selectedIndex === "number" && that.options.size !== false) {
                  var selectedData = that.selectpicker.main.data[selectedIndex], position = selectedData && selectedData.position;
                  if (position) {
                    scrollTop = position - (that.sizeInfo.menuInnerHeight + that.sizeInfo.liHeight) / 2;
                  }
                }
              }
            }
            scroll(scrollTop, true);
            this.$menuInner.off("scroll.createView").on("scroll.createView", function(e5, updateValue) {
              if (!that.noScroll) scroll(this.scrollTop, updateValue);
              that.noScroll = false;
            });
            function scroll(scrollTop2, init3) {
              var size = that.selectpicker.current.elements.length, chunks = [], chunkSize, chunkCount, firstChunk, lastChunk, currentChunk, prevPositions, positionIsDifferent, previousElements, menuIsDifferent = true, isVirtual = that.isVirtual();
              that.selectpicker.view.scrollTop = scrollTop2;
              chunkSize = Math.ceil(that.sizeInfo.menuInnerHeight / that.sizeInfo.liHeight * 1.5);
              chunkCount = Math.round(size / chunkSize) || 1;
              for (var i5 = 0; i5 < chunkCount; i5++) {
                var endOfChunk = (i5 + 1) * chunkSize;
                if (i5 === chunkCount - 1) {
                  endOfChunk = size;
                }
                chunks[i5] = [
                  i5 * chunkSize + (!i5 ? 0 : 1),
                  endOfChunk
                ];
                if (!size) break;
                if (currentChunk === void 0 && scrollTop2 - 1 <= that.selectpicker.current.data[endOfChunk - 1].position - that.sizeInfo.menuInnerHeight) {
                  currentChunk = i5;
                }
              }
              if (currentChunk === void 0) currentChunk = 0;
              prevPositions = [that.selectpicker.view.position0, that.selectpicker.view.position1];
              firstChunk = Math.max(0, currentChunk - 1);
              lastChunk = Math.min(chunkCount - 1, currentChunk + 1);
              that.selectpicker.view.position0 = isVirtual === false ? 0 : Math.max(0, chunks[firstChunk][0]) || 0;
              that.selectpicker.view.position1 = isVirtual === false ? size : Math.min(size, chunks[lastChunk][1]) || 0;
              positionIsDifferent = prevPositions[0] !== that.selectpicker.view.position0 || prevPositions[1] !== that.selectpicker.view.position1;
              if (that.activeIndex !== void 0) {
                prevActive = that.selectpicker.main.elements[that.prevActiveIndex];
                active = that.selectpicker.main.elements[that.activeIndex];
                selected = that.selectpicker.main.elements[that.selectedIndex];
                if (init3) {
                  if (that.activeIndex !== that.selectedIndex) {
                    that.defocusItem(active);
                  }
                  that.activeIndex = void 0;
                }
                if (that.activeIndex && that.activeIndex !== that.selectedIndex) {
                  that.defocusItem(selected);
                }
              }
              if (that.prevActiveIndex !== void 0 && that.prevActiveIndex !== that.activeIndex && that.prevActiveIndex !== that.selectedIndex) {
                that.defocusItem(prevActive);
              }
              if (init3 || positionIsDifferent) {
                previousElements = that.selectpicker.view.visibleElements ? that.selectpicker.view.visibleElements.slice() : [];
                if (isVirtual === false) {
                  that.selectpicker.view.visibleElements = that.selectpicker.current.elements;
                } else {
                  that.selectpicker.view.visibleElements = that.selectpicker.current.elements.slice(that.selectpicker.view.position0, that.selectpicker.view.position1);
                }
                that.setOptionStatus();
                if (isSearching || isVirtual === false && init3) menuIsDifferent = !isEqual(previousElements, that.selectpicker.view.visibleElements);
                if ((init3 || isVirtual === true) && menuIsDifferent) {
                  var menuInner = that.$menuInner[0], menuFragment = document.createDocumentFragment(), emptyMenu = menuInner.firstChild.cloneNode(false), marginTop, marginBottom, elements = that.selectpicker.view.visibleElements, toSanitize = [];
                  menuInner.replaceChild(emptyMenu, menuInner.firstChild);
                  for (var i5 = 0, visibleElementsLen = elements.length; i5 < visibleElementsLen; i5++) {
                    var element2 = elements[i5], elText, elementData;
                    if (that.options.sanitize) {
                      elText = element2.lastChild;
                      if (elText) {
                        elementData = that.selectpicker.current.data[i5 + that.selectpicker.view.position0];
                        if (elementData && elementData.content && !elementData.sanitized) {
                          toSanitize.push(elText);
                          elementData.sanitized = true;
                        }
                      }
                    }
                    menuFragment.appendChild(element2);
                  }
                  if (that.options.sanitize && toSanitize.length) {
                    sanitizeHtml(toSanitize, that.options.whiteList, that.options.sanitizeFn);
                  }
                  if (isVirtual === true) {
                    marginTop = that.selectpicker.view.position0 === 0 ? 0 : that.selectpicker.current.data[that.selectpicker.view.position0 - 1].position;
                    marginBottom = that.selectpicker.view.position1 > size - 1 ? 0 : that.selectpicker.current.data[size - 1].position - that.selectpicker.current.data[that.selectpicker.view.position1 - 1].position;
                    menuInner.firstChild.style.marginTop = marginTop + "px";
                    menuInner.firstChild.style.marginBottom = marginBottom + "px";
                  } else {
                    menuInner.firstChild.style.marginTop = 0;
                    menuInner.firstChild.style.marginBottom = 0;
                  }
                  menuInner.firstChild.appendChild(menuFragment);
                  if (isVirtual === true && that.sizeInfo.hasScrollBar) {
                    var menuInnerInnerWidth = menuInner.firstChild.offsetWidth;
                    if (init3 && menuInnerInnerWidth < that.sizeInfo.menuInnerInnerWidth && that.sizeInfo.totalMenuWidth > that.sizeInfo.selectWidth) {
                      menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + "px";
                    } else if (menuInnerInnerWidth > that.sizeInfo.menuInnerInnerWidth) {
                      that.$menu[0].style.minWidth = 0;
                      var actualMenuWidth = menuInner.firstChild.offsetWidth;
                      if (actualMenuWidth > that.sizeInfo.menuInnerInnerWidth) {
                        that.sizeInfo.menuInnerInnerWidth = actualMenuWidth;
                        menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + "px";
                      }
                      that.$menu[0].style.minWidth = "";
                    }
                  }
                }
              }
              that.prevActiveIndex = that.activeIndex;
              if (!that.options.liveSearch) {
                that.$menuInner.trigger("focus");
              } else if (isSearching && init3) {
                var index = 0, newActive;
                if (!that.selectpicker.view.canHighlight[index]) {
                  index = 1 + that.selectpicker.view.canHighlight.slice(1).indexOf(true);
                }
                newActive = that.selectpicker.view.visibleElements[index];
                that.defocusItem(that.selectpicker.view.currentActive);
                that.activeIndex = (that.selectpicker.current.data[index] || {}).index;
                that.focusItem(newActive);
              }
            }
            $2(window).off("resize" + EVENT_KEY + "." + this.selectId + ".createView").on("resize" + EVENT_KEY + "." + this.selectId + ".createView", function() {
              var isActive = that.$newElement.hasClass(classNames.SHOW);
              if (isActive) scroll(that.$menuInner[0].scrollTop);
            });
          },
          focusItem: function(li, liData, noStyle) {
            if (li) {
              liData = liData || this.selectpicker.main.data[this.activeIndex];
              var a3 = li.firstChild;
              if (a3) {
                a3.setAttribute("aria-setsize", this.selectpicker.view.size);
                a3.setAttribute("aria-posinset", liData.posinset);
                if (noStyle !== true) {
                  this.focusedParent.setAttribute("aria-activedescendant", a3.id);
                  li.classList.add("active");
                  a3.classList.add("active");
                }
              }
            }
          },
          defocusItem: function(li) {
            if (li) {
              li.classList.remove("active");
              if (li.firstChild) li.firstChild.classList.remove("active");
            }
          },
          setPlaceholder: function() {
            var that = this, updateIndex = false;
            if (this.options.title && !this.multiple) {
              if (!this.selectpicker.view.titleOption) this.selectpicker.view.titleOption = document.createElement("option");
              updateIndex = true;
              var element = this.$element[0], selectTitleOption = false, titleNotAppended = !this.selectpicker.view.titleOption.parentNode, selectedIndex = element.selectedIndex, selectedOption = element.options[selectedIndex], navigation = window.performance && window.performance.getEntriesByType("navigation"), isNotBackForward = navigation && navigation.length ? navigation[0].type !== "back_forward" : window.performance.navigation.type !== 2;
              if (titleNotAppended) {
                this.selectpicker.view.titleOption.className = "bs-title-option";
                this.selectpicker.view.titleOption.value = "";
                selectTitleOption = !selectedOption || selectedIndex === 0 && selectedOption.defaultSelected === false && this.$element.data("selected") === void 0;
              }
              if (titleNotAppended || this.selectpicker.view.titleOption.index !== 0) {
                element.insertBefore(this.selectpicker.view.titleOption, element.firstChild);
              }
              if (selectTitleOption && isNotBackForward) {
                element.selectedIndex = 0;
              } else if (document.readyState !== "complete") {
                window.addEventListener("pageshow", function() {
                  if (that.selectpicker.view.displayedValue !== element.value) that.render();
                });
              }
            }
            return updateIndex;
          },
          buildData: function() {
            var optionSelector = ':not([hidden]):not([data-hidden="true"])', mainData = [], optID = 0, startIndex = this.setPlaceholder() ? 1 : 0;
            if (this.options.hideDisabled) optionSelector += ":not(:disabled)";
            var selectOptions = this.$element[0].querySelectorAll("select > *" + optionSelector);
            function addDivider(config) {
              var previousData = mainData[mainData.length - 1];
              if (previousData && previousData.type === "divider" && (previousData.optID || config.optID)) {
                return;
              }
              config = config || {};
              config.type = "divider";
              mainData.push(config);
            }
            function addOption(option, config) {
              config = config || {};
              config.divider = option.getAttribute("data-divider") === "true";
              if (config.divider) {
                addDivider({
                  optID: config.optID
                });
              } else {
                var liIndex = mainData.length, cssText = option.style.cssText, inlineStyle = cssText ? htmlEscape(cssText) : "", optionClass = (option.className || "") + (config.optgroupClass || "");
                if (config.optID) optionClass = "opt " + optionClass;
                config.optionClass = optionClass.trim();
                config.inlineStyle = inlineStyle;
                config.text = option.textContent;
                config.content = option.getAttribute("data-content");
                config.tokens = option.getAttribute("data-tokens");
                config.subtext = option.getAttribute("data-subtext");
                config.icon = option.getAttribute("data-icon");
                option.liIndex = liIndex;
                config.display = config.content || config.text;
                config.type = "option";
                config.index = liIndex;
                config.option = option;
                config.selected = !!option.selected;
                config.disabled = config.disabled || !!option.disabled;
                mainData.push(config);
              }
            }
            function addOptgroup(index, selectOptions2) {
              var optgroup = selectOptions2[index], previous = index - 1 < startIndex ? false : selectOptions2[index - 1], next = selectOptions2[index + 1], options = optgroup.querySelectorAll("option" + optionSelector);
              if (!options.length) return;
              var config = {
                display: htmlEscape(optgroup.label),
                subtext: optgroup.getAttribute("data-subtext"),
                icon: optgroup.getAttribute("data-icon"),
                type: "optgroup-label",
                optgroupClass: " " + (optgroup.className || "")
              }, headerIndex, lastIndex;
              optID++;
              if (previous) {
                addDivider({ optID });
              }
              config.optID = optID;
              mainData.push(config);
              for (var j2 = 0, len2 = options.length; j2 < len2; j2++) {
                var option = options[j2];
                if (j2 === 0) {
                  headerIndex = mainData.length - 1;
                  lastIndex = headerIndex + len2;
                }
                addOption(option, {
                  headerIndex,
                  lastIndex,
                  optID: config.optID,
                  optgroupClass: config.optgroupClass,
                  disabled: optgroup.disabled
                });
              }
              if (next) {
                addDivider({ optID });
              }
            }
            for (var len = selectOptions.length, i5 = startIndex; i5 < len; i5++) {
              var item = selectOptions[i5];
              if (item.tagName !== "OPTGROUP") {
                addOption(item, {});
              } else {
                addOptgroup(i5, selectOptions);
              }
            }
            this.selectpicker.main.data = this.selectpicker.current.data = mainData;
          },
          buildList: function() {
            var that = this, selectData = this.selectpicker.main.data, mainElements = [], widestOptionLength = 0;
            if ((that.options.showTick || that.multiple) && !elementTemplates.checkMark.parentNode) {
              elementTemplates.checkMark.className = this.options.iconBase + " " + that.options.tickIcon + " check-mark";
              elementTemplates.a.appendChild(elementTemplates.checkMark);
            }
            function buildElement(item2) {
              var liElement, combinedLength = 0;
              switch (item2.type) {
                case "divider":
                  liElement = generateOption.li(
                    false,
                    classNames.DIVIDER,
                    item2.optID ? item2.optID + "div" : void 0
                  );
                  break;
                case "option":
                  liElement = generateOption.li(
                    generateOption.a(
                      generateOption.text.call(that, item2),
                      item2.optionClass,
                      item2.inlineStyle
                    ),
                    "",
                    item2.optID
                  );
                  if (liElement.firstChild) {
                    liElement.firstChild.id = that.selectId + "-" + item2.index;
                  }
                  break;
                case "optgroup-label":
                  liElement = generateOption.li(
                    generateOption.label.call(that, item2),
                    "dropdown-header" + item2.optgroupClass,
                    item2.optID
                  );
                  break;
              }
              item2.element = liElement;
              mainElements.push(liElement);
              if (item2.display) combinedLength += item2.display.length;
              if (item2.subtext) combinedLength += item2.subtext.length;
              if (item2.icon) combinedLength += 1;
              if (combinedLength > widestOptionLength) {
                widestOptionLength = combinedLength;
                that.selectpicker.view.widestOption = mainElements[mainElements.length - 1];
              }
            }
            for (var len = selectData.length, i5 = 0; i5 < len; i5++) {
              var item = selectData[i5];
              buildElement(item);
            }
            this.selectpicker.main.elements = this.selectpicker.current.elements = mainElements;
          },
          findLis: function() {
            return this.$menuInner.find(".inner > li");
          },
          render: function() {
            var that = this, element = this.$element[0], placeholderSelected = this.setPlaceholder() && element.selectedIndex === 0, selectedOptions = getSelectedOptions(element, this.options.hideDisabled), selectedCount = selectedOptions.length, button = this.$button[0], buttonInner = button.querySelector(".filter-option-inner-inner"), multipleSeparator = document.createTextNode(this.options.multipleSeparator), titleFragment = elementTemplates.fragment.cloneNode(false), showCount, countMax, hasContent = false;
            button.classList.toggle("bs-placeholder", that.multiple ? !selectedCount : !getSelectValues(element, selectedOptions));
            if (!that.multiple && selectedOptions.length === 1) {
              that.selectpicker.view.displayedValue = getSelectValues(element, selectedOptions);
            }
            if (this.options.selectedTextFormat === "static") {
              titleFragment = generateOption.text.call(this, { text: this.options.title }, true);
            } else {
              showCount = this.multiple && this.options.selectedTextFormat.indexOf("count") !== -1 && selectedCount > 1;
              if (showCount) {
                countMax = this.options.selectedTextFormat.split(">");
                showCount = countMax.length > 1 && selectedCount > countMax[1] || countMax.length === 1 && selectedCount >= 2;
              }
              if (showCount === false) {
                if (!placeholderSelected) {
                  for (var selectedIndex = 0; selectedIndex < selectedCount; selectedIndex++) {
                    if (selectedIndex < 50) {
                      var option = selectedOptions[selectedIndex], thisData = this.selectpicker.main.data[option.liIndex], titleOptions = {};
                      if (this.multiple && selectedIndex > 0) {
                        titleFragment.appendChild(multipleSeparator.cloneNode(false));
                      }
                      if (option.title) {
                        titleOptions.text = option.title;
                      } else if (thisData) {
                        if (thisData.content && that.options.showContent) {
                          titleOptions.content = thisData.content.toString();
                          hasContent = true;
                        } else {
                          if (that.options.showIcon) {
                            titleOptions.icon = thisData.icon;
                          }
                          if (that.options.showSubtext && !that.multiple && thisData.subtext) titleOptions.subtext = " " + thisData.subtext;
                          titleOptions.text = option.textContent.trim();
                        }
                      }
                      titleFragment.appendChild(generateOption.text.call(this, titleOptions, true));
                    } else {
                      break;
                    }
                  }
                  if (selectedCount > 49) {
                    titleFragment.appendChild(document.createTextNode("..."));
                  }
                }
              } else {
                var optionSelector = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';
                if (this.options.hideDisabled) optionSelector += ":not(:disabled)";
                var totalCount = this.$element[0].querySelectorAll("select > option" + optionSelector + ", optgroup" + optionSelector + " option" + optionSelector).length, tr8nText = typeof this.options.countSelectedText === "function" ? this.options.countSelectedText(selectedCount, totalCount) : this.options.countSelectedText;
                titleFragment = generateOption.text.call(this, {
                  text: tr8nText.replace("{0}", selectedCount.toString()).replace("{1}", totalCount.toString())
                }, true);
              }
            }
            if (this.options.title == void 0) {
              this.options.title = this.$element.attr("title");
            }
            if (!titleFragment.childNodes.length) {
              titleFragment = generateOption.text.call(this, {
                text: typeof this.options.title !== "undefined" ? this.options.title : this.options.noneSelectedText
              }, true);
            }
            button.title = titleFragment.textContent.replace(/<[^>]*>?/g, "").trim();
            if (this.options.sanitize && hasContent) {
              sanitizeHtml([titleFragment], that.options.whiteList, that.options.sanitizeFn);
            }
            buttonInner.innerHTML = "";
            buttonInner.appendChild(titleFragment);
            if (version.major < 4 && this.$newElement[0].classList.contains("bs3-has-addon")) {
              var filterExpand = button.querySelector(".filter-expand"), clone = buttonInner.cloneNode(true);
              clone.className = "filter-expand";
              if (filterExpand) {
                button.replaceChild(clone, filterExpand);
              } else {
                button.appendChild(clone);
              }
            }
            this.$element.trigger("rendered" + EVENT_KEY);
          },
          /**
           * @param [style]
           * @param [status]
           */
          setStyle: function(newStyle, status) {
            var button = this.$button[0], newElement = this.$newElement[0], style = this.options.style.trim(), buttonClass;
            if (this.$element.attr("class")) {
              this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
            }
            if (version.major < 4) {
              newElement.classList.add("bs3");
              if (newElement.parentNode.classList && newElement.parentNode.classList.contains("input-group") && (newElement.previousElementSibling || newElement.nextElementSibling) && (newElement.previousElementSibling || newElement.nextElementSibling).classList.contains("input-group-addon")) {
                newElement.classList.add("bs3-has-addon");
              }
            }
            if (newStyle) {
              buttonClass = newStyle.trim();
            } else {
              buttonClass = style;
            }
            if (status == "add") {
              if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(" "));
            } else if (status == "remove") {
              if (buttonClass) button.classList.remove.apply(button.classList, buttonClass.split(" "));
            } else {
              if (style) button.classList.remove.apply(button.classList, style.split(" "));
              if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(" "));
            }
          },
          liHeight: function(refresh) {
            if (!refresh && (this.options.size === false || Object.keys(this.sizeInfo).length)) return;
            var newElement = elementTemplates.div.cloneNode(false), menu = elementTemplates.div.cloneNode(false), menuInner = elementTemplates.div.cloneNode(false), menuInnerInner = document.createElement("ul"), divider = elementTemplates.li.cloneNode(false), dropdownHeader = elementTemplates.li.cloneNode(false), li, a3 = elementTemplates.a.cloneNode(false), text = elementTemplates.span.cloneNode(false), header = this.options.header && this.$menu.find("." + classNames.POPOVERHEADER).length > 0 ? this.$menu.find("." + classNames.POPOVERHEADER)[0].cloneNode(true) : null, search = this.options.liveSearch ? elementTemplates.div.cloneNode(false) : null, actions = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(true) : null, doneButton = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(true) : null, firstOption = this.$element.find("option")[0];
            this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;
            text.className = "text";
            a3.className = "dropdown-item " + (firstOption ? firstOption.className : "");
            newElement.className = this.$menu[0].parentNode.className + " " + classNames.SHOW;
            newElement.style.width = 0;
            if (this.options.width === "auto") menu.style.minWidth = 0;
            menu.className = classNames.MENU + " " + classNames.SHOW;
            menuInner.className = "inner " + classNames.SHOW;
            menuInnerInner.className = classNames.MENU + " inner " + (version.major === "4" ? classNames.SHOW : "");
            divider.className = classNames.DIVIDER;
            dropdownHeader.className = "dropdown-header";
            text.appendChild(document.createTextNode("\u200B"));
            if (this.selectpicker.current.data.length) {
              for (var i5 = 0; i5 < this.selectpicker.current.data.length; i5++) {
                var data = this.selectpicker.current.data[i5];
                if (data.type === "option") {
                  li = data.element;
                  break;
                }
              }
            } else {
              li = elementTemplates.li.cloneNode(false);
              a3.appendChild(text);
              li.appendChild(a3);
            }
            dropdownHeader.appendChild(text.cloneNode(true));
            if (this.selectpicker.view.widestOption) {
              menuInnerInner.appendChild(this.selectpicker.view.widestOption.cloneNode(true));
            }
            menuInnerInner.appendChild(li);
            menuInnerInner.appendChild(divider);
            menuInnerInner.appendChild(dropdownHeader);
            if (header) menu.appendChild(header);
            if (search) {
              var input = document.createElement("input");
              search.className = "bs-searchbox";
              input.className = "form-control";
              search.appendChild(input);
              menu.appendChild(search);
            }
            if (actions) menu.appendChild(actions);
            menuInner.appendChild(menuInnerInner);
            menu.appendChild(menuInner);
            if (doneButton) menu.appendChild(doneButton);
            newElement.appendChild(menu);
            document.body.appendChild(newElement);
            var liHeight = li.offsetHeight, dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0, headerHeight = header ? header.offsetHeight : 0, searchHeight = search ? search.offsetHeight : 0, actionsHeight = actions ? actions.offsetHeight : 0, doneButtonHeight = doneButton ? doneButton.offsetHeight : 0, dividerHeight = $2(divider).outerHeight(true), menuStyle = window.getComputedStyle ? window.getComputedStyle(menu) : false, menuWidth = menu.offsetWidth, $menu = menuStyle ? null : $2(menu), menuPadding = {
              vert: toInteger(menuStyle ? menuStyle.paddingTop : $menu.css("paddingTop")) + toInteger(menuStyle ? menuStyle.paddingBottom : $menu.css("paddingBottom")) + toInteger(menuStyle ? menuStyle.borderTopWidth : $menu.css("borderTopWidth")) + toInteger(menuStyle ? menuStyle.borderBottomWidth : $menu.css("borderBottomWidth")),
              horiz: toInteger(menuStyle ? menuStyle.paddingLeft : $menu.css("paddingLeft")) + toInteger(menuStyle ? menuStyle.paddingRight : $menu.css("paddingRight")) + toInteger(menuStyle ? menuStyle.borderLeftWidth : $menu.css("borderLeftWidth")) + toInteger(menuStyle ? menuStyle.borderRightWidth : $menu.css("borderRightWidth"))
            }, menuExtras = {
              vert: menuPadding.vert + toInteger(menuStyle ? menuStyle.marginTop : $menu.css("marginTop")) + toInteger(menuStyle ? menuStyle.marginBottom : $menu.css("marginBottom")) + 2,
              horiz: menuPadding.horiz + toInteger(menuStyle ? menuStyle.marginLeft : $menu.css("marginLeft")) + toInteger(menuStyle ? menuStyle.marginRight : $menu.css("marginRight")) + 2
            }, scrollBarWidth;
            menuInner.style.overflowY = "scroll";
            scrollBarWidth = menu.offsetWidth - menuWidth;
            document.body.removeChild(newElement);
            this.sizeInfo.liHeight = liHeight;
            this.sizeInfo.dropdownHeaderHeight = dropdownHeaderHeight;
            this.sizeInfo.headerHeight = headerHeight;
            this.sizeInfo.searchHeight = searchHeight;
            this.sizeInfo.actionsHeight = actionsHeight;
            this.sizeInfo.doneButtonHeight = doneButtonHeight;
            this.sizeInfo.dividerHeight = dividerHeight;
            this.sizeInfo.menuPadding = menuPadding;
            this.sizeInfo.menuExtras = menuExtras;
            this.sizeInfo.menuWidth = menuWidth;
            this.sizeInfo.menuInnerInnerWidth = menuWidth - menuPadding.horiz;
            this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
            this.sizeInfo.scrollBarWidth = scrollBarWidth;
            this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight;
            this.setPositionData();
          },
          getSelectPosition: function() {
            var that = this, $window = $2(window), pos = that.$newElement.offset(), $container = $2(that.options.container), containerPos;
            if (that.options.container && $container.length && !$container.is("body")) {
              containerPos = $container.offset();
              containerPos.top += parseInt($container.css("borderTopWidth"));
              containerPos.left += parseInt($container.css("borderLeftWidth"));
            } else {
              containerPos = { top: 0, left: 0 };
            }
            var winPad = that.options.windowPadding;
            this.sizeInfo.selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
            this.sizeInfo.selectOffsetBot = $window.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight - containerPos.top - winPad[2];
            this.sizeInfo.selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
            this.sizeInfo.selectOffsetRight = $window.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth - containerPos.left - winPad[1];
            this.sizeInfo.selectOffsetTop -= winPad[0];
            this.sizeInfo.selectOffsetLeft -= winPad[3];
          },
          setMenuSize: function(isAuto) {
            this.getSelectPosition();
            var selectWidth = this.sizeInfo.selectWidth, liHeight = this.sizeInfo.liHeight, headerHeight = this.sizeInfo.headerHeight, searchHeight = this.sizeInfo.searchHeight, actionsHeight = this.sizeInfo.actionsHeight, doneButtonHeight = this.sizeInfo.doneButtonHeight, divHeight = this.sizeInfo.dividerHeight, menuPadding = this.sizeInfo.menuPadding, menuInnerHeight, menuHeight, divLength = 0, minHeight, _minHeight, maxHeight, menuInnerMinHeight, estimate, isDropup;
            if (this.options.dropupAuto) {
              estimate = liHeight * this.selectpicker.current.elements.length + menuPadding.vert;
              isDropup = this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && estimate + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot;
              if (this.selectpicker.isSearching === true) {
                isDropup = this.selectpicker.dropup;
              }
              this.$newElement.toggleClass(classNames.DROPUP, isDropup);
              this.selectpicker.dropup = isDropup;
            }
            if (this.options.size === "auto") {
              _minHeight = this.selectpicker.current.elements.length > 3 ? this.sizeInfo.liHeight * 3 + this.sizeInfo.menuExtras.vert - 2 : 0;
              menuHeight = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert;
              minHeight = _minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
              menuInnerMinHeight = Math.max(_minHeight - menuPadding.vert, 0);
              if (this.$newElement.hasClass(classNames.DROPUP)) {
                menuHeight = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert;
              }
              maxHeight = menuHeight;
              menuInnerHeight = menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert;
            } else if (this.options.size && this.options.size != "auto" && this.selectpicker.current.elements.length > this.options.size) {
              for (var i5 = 0; i5 < this.options.size; i5++) {
                if (this.selectpicker.current.data[i5].type === "divider") divLength++;
              }
              menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;
              menuInnerHeight = menuHeight - menuPadding.vert;
              maxHeight = menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
              minHeight = menuInnerMinHeight = "";
            }
            this.$menu.css({
              "max-height": maxHeight + "px",
              "overflow": "hidden",
              "min-height": minHeight + "px"
            });
            this.$menuInner.css({
              "max-height": menuInnerHeight + "px",
              "overflow-y": "auto",
              "min-height": menuInnerMinHeight + "px"
            });
            this.sizeInfo.menuInnerHeight = Math.max(menuInnerHeight, 1);
            if (this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight) {
              this.sizeInfo.hasScrollBar = true;
              this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth;
            }
            if (this.options.dropdownAlignRight === "auto") {
              this.$menu.toggleClass(classNames.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < this.sizeInfo.totalMenuWidth - selectWidth);
            }
            if (this.dropdown && this.dropdown._popper) this.dropdown._popper.update();
          },
          setSize: function(refresh) {
            this.liHeight(refresh);
            if (this.options.header) this.$menu.css("padding-top", 0);
            if (this.options.size !== false) {
              var that = this, $window = $2(window);
              this.setMenuSize();
              if (this.options.liveSearch) {
                this.$searchbox.off("input.setMenuSize propertychange.setMenuSize").on("input.setMenuSize propertychange.setMenuSize", function() {
                  return that.setMenuSize();
                });
              }
              if (this.options.size === "auto") {
                $window.off("resize" + EVENT_KEY + "." + this.selectId + ".setMenuSize scroll" + EVENT_KEY + "." + this.selectId + ".setMenuSize").on("resize" + EVENT_KEY + "." + this.selectId + ".setMenuSize scroll" + EVENT_KEY + "." + this.selectId + ".setMenuSize", function() {
                  return that.setMenuSize();
                });
              } else if (this.options.size && this.options.size != "auto" && this.selectpicker.current.elements.length > this.options.size) {
                $window.off("resize" + EVENT_KEY + "." + this.selectId + ".setMenuSize scroll" + EVENT_KEY + "." + this.selectId + ".setMenuSize");
              }
            }
            this.createView(false, true, refresh);
          },
          setWidth: function() {
            var that = this;
            if (this.options.width === "auto") {
              requestAnimationFrame(function() {
                that.$menu.css("min-width", "0");
                that.$element.on("loaded" + EVENT_KEY, function() {
                  that.liHeight();
                  that.setMenuSize();
                  var $selectClone = that.$newElement.clone().appendTo("body"), btnWidth = $selectClone.css("width", "auto").children("button").outerWidth();
                  $selectClone.remove();
                  that.sizeInfo.selectWidth = Math.max(that.sizeInfo.totalMenuWidth, btnWidth);
                  that.$newElement.css("width", that.sizeInfo.selectWidth + "px");
                });
              });
            } else if (this.options.width === "fit") {
              this.$menu.css("min-width", "");
              this.$newElement.css("width", "").addClass("fit-width");
            } else if (this.options.width) {
              this.$menu.css("min-width", "");
              this.$newElement.css("width", this.options.width);
            } else {
              this.$menu.css("min-width", "");
              this.$newElement.css("width", "");
            }
            if (this.$newElement.hasClass("fit-width") && this.options.width !== "fit") {
              this.$newElement[0].classList.remove("fit-width");
            }
          },
          selectPosition: function() {
            this.$bsContainer = $2('<div class="bs-container" />');
            var that = this, $container = $2(this.options.container), pos, containerPos, actualHeight, getPlacement = function($element) {
              var containerPosition = {}, display = that.options.display || // Bootstrap 3 doesn't have $.fn.dropdown.Constructor.Default
              ($2.fn.dropdown.Constructor.Default ? $2.fn.dropdown.Constructor.Default.display : false);
              that.$bsContainer.addClass($element.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass(classNames.DROPUP, $element.hasClass(classNames.DROPUP));
              pos = $element.offset();
              if (!$container.is("body")) {
                containerPos = $container.offset();
                containerPos.top += parseInt($container.css("borderTopWidth")) - $container.scrollTop();
                containerPos.left += parseInt($container.css("borderLeftWidth")) - $container.scrollLeft();
              } else {
                containerPos = { top: 0, left: 0 };
              }
              actualHeight = $element.hasClass(classNames.DROPUP) ? 0 : $element[0].offsetHeight;
              if (version.major < 4 || display === "static") {
                containerPosition.top = pos.top - containerPos.top + actualHeight;
                containerPosition.left = pos.left - containerPos.left;
              }
              containerPosition.width = $element[0].offsetWidth;
              that.$bsContainer.css(containerPosition);
            };
            this.$button.on("click.bs.dropdown.data-api", function() {
              if (that.isDisabled()) {
                return;
              }
              getPlacement(that.$newElement);
              that.$bsContainer.appendTo(that.options.container).toggleClass(classNames.SHOW, !that.$button.hasClass(classNames.SHOW)).append(that.$menu);
            });
            $2(window).off("resize" + EVENT_KEY + "." + this.selectId + " scroll" + EVENT_KEY + "." + this.selectId).on("resize" + EVENT_KEY + "." + this.selectId + " scroll" + EVENT_KEY + "." + this.selectId, function() {
              var isActive = that.$newElement.hasClass(classNames.SHOW);
              if (isActive) getPlacement(that.$newElement);
            });
            this.$element.on("hide" + EVENT_KEY, function() {
              that.$menu.data("height", that.$menu.height());
              that.$bsContainer.detach();
            });
          },
          setOptionStatus: function(selectedOnly) {
            var that = this;
            that.noScroll = false;
            if (that.selectpicker.view.visibleElements && that.selectpicker.view.visibleElements.length) {
              for (var i5 = 0; i5 < that.selectpicker.view.visibleElements.length; i5++) {
                var liData = that.selectpicker.current.data[i5 + that.selectpicker.view.position0], option = liData.option;
                if (option) {
                  if (selectedOnly !== true) {
                    that.setDisabled(
                      liData.index,
                      liData.disabled
                    );
                  }
                  that.setSelected(
                    liData.index,
                    option.selected
                  );
                }
              }
            }
          },
          /**
           * @param {number} index - the index of the option that is being changed
           * @param {boolean} selected - true if the option is being selected, false if being deselected
           */
          setSelected: function(index, selected) {
            var li = this.selectpicker.main.elements[index], liData = this.selectpicker.main.data[index], activeIndexIsSet = this.activeIndex !== void 0, thisIsActive = this.activeIndex === index, prevActive, a3, keepActive = thisIsActive || selected && !this.multiple && !activeIndexIsSet;
            liData.selected = selected;
            a3 = li.firstChild;
            if (selected) {
              this.selectedIndex = index;
            }
            li.classList.toggle("selected", selected);
            if (keepActive) {
              this.focusItem(li, liData);
              this.selectpicker.view.currentActive = li;
              this.activeIndex = index;
            } else {
              this.defocusItem(li);
            }
            if (a3) {
              a3.classList.toggle("selected", selected);
              if (selected) {
                a3.setAttribute("aria-selected", true);
              } else {
                if (this.multiple) {
                  a3.setAttribute("aria-selected", false);
                } else {
                  a3.removeAttribute("aria-selected");
                }
              }
            }
            if (!keepActive && !activeIndexIsSet && selected && this.prevActiveIndex !== void 0) {
              prevActive = this.selectpicker.main.elements[this.prevActiveIndex];
              this.defocusItem(prevActive);
            }
          },
          /**
           * @param {number} index - the index of the option that is being disabled
           * @param {boolean} disabled - true if the option is being disabled, false if being enabled
           */
          setDisabled: function(index, disabled) {
            var li = this.selectpicker.main.elements[index], a3;
            this.selectpicker.main.data[index].disabled = disabled;
            a3 = li.firstChild;
            li.classList.toggle(classNames.DISABLED, disabled);
            if (a3) {
              if (version.major === "4") a3.classList.toggle(classNames.DISABLED, disabled);
              if (disabled) {
                a3.setAttribute("aria-disabled", disabled);
                a3.setAttribute("tabindex", -1);
              } else {
                a3.removeAttribute("aria-disabled");
                a3.setAttribute("tabindex", 0);
              }
            }
          },
          isDisabled: function() {
            return this.$element[0].disabled;
          },
          checkDisabled: function() {
            if (this.isDisabled()) {
              this.$newElement[0].classList.add(classNames.DISABLED);
              this.$button.addClass(classNames.DISABLED).attr("aria-disabled", true);
            } else {
              if (this.$button[0].classList.contains(classNames.DISABLED)) {
                this.$newElement[0].classList.remove(classNames.DISABLED);
                this.$button.removeClass(classNames.DISABLED).attr("aria-disabled", false);
              }
            }
          },
          clickListener: function() {
            var that = this, $document = $2(document);
            $document.data("spaceSelect", false);
            this.$button.on("keyup", function(e5) {
              if (/(32)/.test(e5.keyCode.toString(10)) && $document.data("spaceSelect")) {
                e5.preventDefault();
                $document.data("spaceSelect", false);
              }
            });
            this.$newElement.on("show.bs.dropdown", function() {
              if (version.major > 3 && !that.dropdown) {
                that.dropdown = that.$button.data("bs.dropdown");
                that.dropdown._menu = that.$menu[0];
              }
            });
            this.$button.on("click.bs.dropdown.data-api", function() {
              if (!that.$newElement.hasClass(classNames.SHOW)) {
                that.setSize();
              }
            });
            function setFocus() {
              if (that.options.liveSearch) {
                that.$searchbox.trigger("focus");
              } else {
                that.$menuInner.trigger("focus");
              }
            }
            function checkPopperExists() {
              if (that.dropdown && that.dropdown._popper && that.dropdown._popper.state.isCreated) {
                setFocus();
              } else {
                requestAnimationFrame(checkPopperExists);
              }
            }
            this.$element.on("shown" + EVENT_KEY, function() {
              if (that.$menuInner[0].scrollTop !== that.selectpicker.view.scrollTop) {
                that.$menuInner[0].scrollTop = that.selectpicker.view.scrollTop;
              }
              if (version.major > 3) {
                requestAnimationFrame(checkPopperExists);
              } else {
                setFocus();
              }
            });
            this.$menuInner.on("mouseenter", "li a", function(e5) {
              var hoverLi = this.parentElement, position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0, index = Array.prototype.indexOf.call(hoverLi.parentElement.children, hoverLi), hoverData = that.selectpicker.current.data[index + position0];
              that.focusItem(hoverLi, hoverData, true);
            });
            this.$menuInner.on("click", "li a", function(e5, retainActive) {
              var $this = $2(this), element = that.$element[0], position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0, clickedData = that.selectpicker.current.data[$this.parent().index() + position0], clickedIndex = clickedData.index, prevValue = getSelectValues(element), prevIndex = element.selectedIndex, prevOption = element.options[prevIndex], triggerChange = true;
              if (that.multiple && that.options.maxOptions !== 1) {
                e5.stopPropagation();
              }
              e5.preventDefault();
              if (!that.isDisabled() && !$this.parent().hasClass(classNames.DISABLED)) {
                var option = clickedData.option, $option = $2(option), state = option.selected, $optgroup = $option.parent("optgroup"), $optgroupOptions = $optgroup.find("option"), maxOptions = that.options.maxOptions, maxOptionsGrp = $optgroup.data("maxOptions") || false;
                if (clickedIndex === that.activeIndex) retainActive = true;
                if (!retainActive) {
                  that.prevActiveIndex = that.activeIndex;
                  that.activeIndex = void 0;
                }
                if (!that.multiple) {
                  if (prevOption) prevOption.selected = false;
                  option.selected = true;
                  that.setSelected(clickedIndex, true);
                } else {
                  option.selected = !state;
                  that.setSelected(clickedIndex, !state);
                  that.focusedParent.focus();
                  if (maxOptions !== false || maxOptionsGrp !== false) {
                    var maxReached = maxOptions < getSelectedOptions(element).length, maxReachedGrp = maxOptionsGrp < $optgroup.find("option:selected").length;
                    if (maxOptions && maxReached || maxOptionsGrp && maxReachedGrp) {
                      if (maxOptions && maxOptions == 1) {
                        element.selectedIndex = -1;
                        option.selected = true;
                        that.setOptionStatus(true);
                      } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                        for (var i5 = 0; i5 < $optgroupOptions.length; i5++) {
                          var _option = $optgroupOptions[i5];
                          _option.selected = false;
                          that.setSelected(_option.liIndex, false);
                        }
                        option.selected = true;
                        that.setSelected(clickedIndex, true);
                      } else {
                        var maxOptionsText = typeof that.options.maxOptionsText === "string" ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText, maxOptionsArr = typeof maxOptionsText === "function" ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText, maxTxt = maxOptionsArr[0].replace("{n}", maxOptions), maxTxtGrp = maxOptionsArr[1].replace("{n}", maxOptionsGrp), $notify = $2('<div class="notify"></div>');
                        if (maxOptionsArr[2]) {
                          maxTxt = maxTxt.replace("{var}", maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                          maxTxtGrp = maxTxtGrp.replace("{var}", maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                        }
                        option.selected = false;
                        that.$menu.append($notify);
                        if (maxOptions && maxReached) {
                          $notify.append($2("<div>" + maxTxt + "</div>"));
                          triggerChange = false;
                          that.$element.trigger("maxReached" + EVENT_KEY);
                        }
                        if (maxOptionsGrp && maxReachedGrp) {
                          $notify.append($2("<div>" + maxTxtGrp + "</div>"));
                          triggerChange = false;
                          that.$element.trigger("maxReachedGrp" + EVENT_KEY);
                        }
                        setTimeout(function() {
                          that.setSelected(clickedIndex, false);
                        }, 10);
                        $notify[0].classList.add("fadeOut");
                        setTimeout(function() {
                          $notify.remove();
                        }, 1050);
                      }
                    }
                  }
                }
                if (!that.multiple || that.multiple && that.options.maxOptions === 1) {
                  that.$button.trigger("focus");
                } else if (that.options.liveSearch) {
                  that.$searchbox.trigger("focus");
                }
                if (triggerChange) {
                  if (that.multiple || prevIndex !== element.selectedIndex) {
                    changedArguments = [option.index, $option.prop("selected"), prevValue];
                    that.$element.triggerNative("change");
                  }
                }
              }
            });
            this.$menu.on("click", "li." + classNames.DISABLED + " a, ." + classNames.POPOVERHEADER + ", ." + classNames.POPOVERHEADER + " :not(.close)", function(e5) {
              if (e5.currentTarget == this) {
                e5.preventDefault();
                e5.stopPropagation();
                if (that.options.liveSearch && !$2(e5.target).hasClass("close")) {
                  that.$searchbox.trigger("focus");
                } else {
                  that.$button.trigger("focus");
                }
              }
            });
            this.$menuInner.on("click", ".divider, .dropdown-header", function(e5) {
              e5.preventDefault();
              e5.stopPropagation();
              if (that.options.liveSearch) {
                that.$searchbox.trigger("focus");
              } else {
                that.$button.trigger("focus");
              }
            });
            this.$menu.on("click", "." + classNames.POPOVERHEADER + " .close", function() {
              that.$button.trigger("click");
            });
            this.$searchbox.on("click", function(e5) {
              e5.stopPropagation();
            });
            this.$menu.on("click", ".actions-btn", function(e5) {
              if (that.options.liveSearch) {
                that.$searchbox.trigger("focus");
              } else {
                that.$button.trigger("focus");
              }
              e5.preventDefault();
              e5.stopPropagation();
              if ($2(this).hasClass("bs-select-all")) {
                that.selectAll();
              } else {
                that.deselectAll();
              }
            });
            this.$button.on("focus" + EVENT_KEY, function(e5) {
              var tabindex = that.$element[0].getAttribute("tabindex");
              if (tabindex !== void 0 && e5.originalEvent && e5.originalEvent.isTrusted) {
                this.setAttribute("tabindex", tabindex);
                that.$element[0].setAttribute("tabindex", -1);
                that.selectpicker.view.tabindex = tabindex;
              }
            }).on("blur" + EVENT_KEY, function(e5) {
              if (that.selectpicker.view.tabindex !== void 0 && e5.originalEvent && e5.originalEvent.isTrusted) {
                that.$element[0].setAttribute("tabindex", that.selectpicker.view.tabindex);
                this.setAttribute("tabindex", -1);
                that.selectpicker.view.tabindex = void 0;
              }
            });
            this.$element.on("change" + EVENT_KEY, function() {
              that.render();
              that.$element.trigger("changed" + EVENT_KEY, changedArguments);
              changedArguments = null;
            }).on("focus" + EVENT_KEY, function() {
              if (!that.options.mobile) that.$button[0].focus();
            });
          },
          liveSearchListener: function() {
            var that = this;
            this.$button.on("click.bs.dropdown.data-api", function() {
              if (!!that.$searchbox.val()) {
                that.$searchbox.val("");
                that.selectpicker.search.previousValue = void 0;
              }
            });
            this.$searchbox.on("click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api", function(e5) {
              e5.stopPropagation();
            });
            this.$searchbox.on("input propertychange", function() {
              var searchValue = that.$searchbox[0].value;
              that.selectpicker.search.elements = [];
              that.selectpicker.search.data = [];
              if (searchValue) {
                var i5, searchMatch = [], q = searchValue.toUpperCase(), cache = {}, cacheArr = [], searchStyle = that._searchStyle(), normalizeSearch = that.options.liveSearchNormalize;
                if (normalizeSearch) q = normalizeToBase(q);
                for (var i5 = 0; i5 < that.selectpicker.main.data.length; i5++) {
                  var li = that.selectpicker.main.data[i5];
                  if (!cache[i5]) {
                    cache[i5] = stringSearch(li, q, searchStyle, normalizeSearch);
                  }
                  if (cache[i5] && li.headerIndex !== void 0 && cacheArr.indexOf(li.headerIndex) === -1) {
                    if (li.headerIndex > 0) {
                      cache[li.headerIndex - 1] = true;
                      cacheArr.push(li.headerIndex - 1);
                    }
                    cache[li.headerIndex] = true;
                    cacheArr.push(li.headerIndex);
                    cache[li.lastIndex + 1] = true;
                  }
                  if (cache[i5] && li.type !== "optgroup-label") cacheArr.push(i5);
                }
                for (var i5 = 0, cacheLen = cacheArr.length; i5 < cacheLen; i5++) {
                  var index = cacheArr[i5], prevIndex = cacheArr[i5 - 1], li = that.selectpicker.main.data[index], liPrev = that.selectpicker.main.data[prevIndex];
                  if (li.type !== "divider" || li.type === "divider" && liPrev && liPrev.type !== "divider" && cacheLen - 1 !== i5) {
                    that.selectpicker.search.data.push(li);
                    searchMatch.push(that.selectpicker.main.elements[index]);
                  }
                }
                that.activeIndex = void 0;
                that.noScroll = true;
                that.$menuInner.scrollTop(0);
                that.selectpicker.search.elements = searchMatch;
                that.createView(true);
                showNoResults.call(that, searchMatch, searchValue);
              } else if (that.selectpicker.search.previousValue) {
                that.$menuInner.scrollTop(0);
                that.createView(false);
              }
              that.selectpicker.search.previousValue = searchValue;
            });
          },
          _searchStyle: function() {
            return this.options.liveSearchStyle || "contains";
          },
          val: function(value) {
            var element = this.$element[0];
            if (typeof value !== "undefined") {
              var prevValue = getSelectValues(element);
              changedArguments = [null, null, prevValue];
              this.$element.val(value).trigger("changed" + EVENT_KEY, changedArguments);
              if (this.$newElement.hasClass(classNames.SHOW)) {
                if (this.multiple) {
                  this.setOptionStatus(true);
                } else {
                  var liSelectedIndex = (element.options[element.selectedIndex] || {}).liIndex;
                  if (typeof liSelectedIndex === "number") {
                    this.setSelected(this.selectedIndex, false);
                    this.setSelected(liSelectedIndex, true);
                  }
                }
              }
              this.render();
              changedArguments = null;
              return this.$element;
            } else {
              return this.$element.val();
            }
          },
          changeAll: function(status) {
            if (!this.multiple) return;
            if (typeof status === "undefined") status = true;
            var element = this.$element[0], previousSelected = 0, currentSelected = 0, prevValue = getSelectValues(element);
            element.classList.add("bs-select-hidden");
            for (var i5 = 0, data = this.selectpicker.current.data, len = data.length; i5 < len; i5++) {
              var liData = data[i5], option = liData.option;
              if (option && !liData.disabled && liData.type !== "divider") {
                if (liData.selected) previousSelected++;
                option.selected = status;
                if (status === true) currentSelected++;
              }
            }
            element.classList.remove("bs-select-hidden");
            if (previousSelected === currentSelected) return;
            this.setOptionStatus();
            changedArguments = [null, null, prevValue];
            this.$element.triggerNative("change");
          },
          selectAll: function() {
            return this.changeAll(true);
          },
          deselectAll: function() {
            return this.changeAll(false);
          },
          toggle: function(e5) {
            e5 = e5 || window.event;
            if (e5) e5.stopPropagation();
            this.$button.trigger("click.bs.dropdown.data-api");
          },
          keydown: function(e5) {
            var $this = $2(this), isToggle = $this.hasClass("dropdown-toggle"), $parent = isToggle ? $this.closest(".dropdown") : $this.closest(Selector.MENU), that = $parent.data("this"), $items = that.findLis(), index, isActive, liActive, activeLi, offset, updateScroll = false, downOnTab = e5.which === keyCodes.TAB && !isToggle && !that.options.selectOnTab, isArrowKey = REGEXP_ARROW.test(e5.which) || downOnTab, scrollTop = that.$menuInner[0].scrollTop, isVirtual = that.isVirtual(), position0 = isVirtual === true ? that.selectpicker.view.position0 : 0;
            if (e5.which >= 112 && e5.which <= 123) return;
            isActive = that.$newElement.hasClass(classNames.SHOW);
            if (!isActive && (isArrowKey || e5.which >= 48 && e5.which <= 57 || e5.which >= 96 && e5.which <= 105 || e5.which >= 65 && e5.which <= 90)) {
              that.$button.trigger("click.bs.dropdown.data-api");
              if (that.options.liveSearch) {
                that.$searchbox.trigger("focus");
                return;
              }
            }
            if (e5.which === keyCodes.ESCAPE && isActive) {
              e5.preventDefault();
              that.$button.trigger("click.bs.dropdown.data-api").trigger("focus");
            }
            if (isArrowKey) {
              if (!$items.length) return;
              liActive = that.selectpicker.main.elements[that.activeIndex];
              index = liActive ? Array.prototype.indexOf.call(liActive.parentElement.children, liActive) : -1;
              if (index !== -1) {
                that.defocusItem(liActive);
              }
              if (e5.which === keyCodes.ARROW_UP) {
                if (index !== -1) index--;
                if (index + position0 < 0) index += $items.length;
                if (!that.selectpicker.view.canHighlight[index + position0]) {
                  index = that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) - position0;
                  if (index === -1) index = $items.length - 1;
                }
              } else if (e5.which === keyCodes.ARROW_DOWN || downOnTab) {
                index++;
                if (index + position0 >= that.selectpicker.view.canHighlight.length) index = that.selectpicker.view.firstHighlightIndex;
                if (!that.selectpicker.view.canHighlight[index + position0]) {
                  index = index + 1 + that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
                }
              }
              e5.preventDefault();
              var liActiveIndex = position0 + index;
              if (e5.which === keyCodes.ARROW_UP) {
                if (position0 === 0 && index === $items.length - 1) {
                  that.$menuInner[0].scrollTop = that.$menuInner[0].scrollHeight;
                  liActiveIndex = that.selectpicker.current.elements.length - 1;
                } else {
                  activeLi = that.selectpicker.current.data[liActiveIndex];
                  offset = activeLi.position - activeLi.height;
                  updateScroll = offset < scrollTop;
                }
              } else if (e5.which === keyCodes.ARROW_DOWN || downOnTab) {
                if (index === that.selectpicker.view.firstHighlightIndex) {
                  that.$menuInner[0].scrollTop = 0;
                  liActiveIndex = that.selectpicker.view.firstHighlightIndex;
                } else {
                  activeLi = that.selectpicker.current.data[liActiveIndex];
                  offset = activeLi.position - that.sizeInfo.menuInnerHeight;
                  updateScroll = offset > scrollTop;
                }
              }
              liActive = that.selectpicker.current.elements[liActiveIndex];
              that.activeIndex = that.selectpicker.current.data[liActiveIndex].index;
              that.focusItem(liActive);
              that.selectpicker.view.currentActive = liActive;
              if (updateScroll) that.$menuInner[0].scrollTop = offset;
              if (that.options.liveSearch) {
                that.$searchbox.trigger("focus");
              } else {
                $this.trigger("focus");
              }
            } else if (!$this.is("input") && !REGEXP_TAB_OR_ESCAPE.test(e5.which) || e5.which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory) {
              var searchMatch, matches2 = [], keyHistory;
              e5.preventDefault();
              that.selectpicker.keydown.keyHistory += keyCodeMap[e5.which];
              if (that.selectpicker.keydown.resetKeyHistory.cancel) clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
              that.selectpicker.keydown.resetKeyHistory.cancel = that.selectpicker.keydown.resetKeyHistory.start();
              keyHistory = that.selectpicker.keydown.keyHistory;
              if (/^(.)\1+$/.test(keyHistory)) {
                keyHistory = keyHistory.charAt(0);
              }
              for (var i5 = 0; i5 < that.selectpicker.current.data.length; i5++) {
                var li = that.selectpicker.current.data[i5], hasMatch;
                hasMatch = stringSearch(li, keyHistory, "startsWith", true);
                if (hasMatch && that.selectpicker.view.canHighlight[i5]) {
                  matches2.push(li.index);
                }
              }
              if (matches2.length) {
                var matchIndex = 0;
                $items.removeClass("active").find("a").removeClass("active");
                if (keyHistory.length === 1) {
                  matchIndex = matches2.indexOf(that.activeIndex);
                  if (matchIndex === -1 || matchIndex === matches2.length - 1) {
                    matchIndex = 0;
                  } else {
                    matchIndex++;
                  }
                }
                searchMatch = matches2[matchIndex];
                activeLi = that.selectpicker.main.data[searchMatch];
                if (scrollTop - activeLi.position > 0) {
                  offset = activeLi.position - activeLi.height;
                  updateScroll = true;
                } else {
                  offset = activeLi.position - that.sizeInfo.menuInnerHeight;
                  updateScroll = activeLi.position > scrollTop + that.sizeInfo.menuInnerHeight;
                }
                liActive = that.selectpicker.main.elements[searchMatch];
                that.activeIndex = matches2[matchIndex];
                that.focusItem(liActive);
                if (liActive) liActive.firstChild.focus();
                if (updateScroll) that.$menuInner[0].scrollTop = offset;
                $this.trigger("focus");
              }
            }
            if (isActive && (e5.which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory || e5.which === keyCodes.ENTER || e5.which === keyCodes.TAB && that.options.selectOnTab)) {
              if (e5.which !== keyCodes.SPACE) e5.preventDefault();
              if (!that.options.liveSearch || e5.which !== keyCodes.SPACE) {
                that.$menuInner.find(".active a").trigger("click", true);
                $this.trigger("focus");
                if (!that.options.liveSearch) {
                  e5.preventDefault();
                  $2(document).data("spaceSelect", true);
                }
              }
            }
          },
          mobile: function() {
            this.options.mobile = true;
            this.$element[0].classList.add("mobile-device");
          },
          refresh: function() {
            var config = $2.extend({}, this.options, this.$element.data());
            this.options = config;
            this.checkDisabled();
            this.buildData();
            this.setStyle();
            this.render();
            this.buildList();
            this.setWidth();
            this.setSize(true);
            this.$element.trigger("refreshed" + EVENT_KEY);
          },
          hide: function() {
            this.$newElement.hide();
          },
          show: function() {
            this.$newElement.show();
          },
          remove: function() {
            this.$newElement.remove();
            this.$element.remove();
          },
          destroy: function() {
            this.$newElement.before(this.$element).remove();
            if (this.$bsContainer) {
              this.$bsContainer.remove();
            } else {
              this.$menu.remove();
            }
            if (this.selectpicker.view.titleOption && this.selectpicker.view.titleOption.parentNode) {
              this.selectpicker.view.titleOption.parentNode.removeChild(this.selectpicker.view.titleOption);
            }
            this.$element.off(EVENT_KEY).removeData("selectpicker").removeClass("bs-select-hidden selectpicker");
            $2(window).off(EVENT_KEY + "." + this.selectId);
          }
        };
        function Plugin(option) {
          var args = arguments;
          var _option = option;
          [].shift.apply(args);
          if (!version.success) {
            try {
              version.full = ($2.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".");
            } catch (err) {
              if (Selectpicker.BootstrapVersion) {
                version.full = Selectpicker.BootstrapVersion.split(" ")[0].split(".");
              } else {
                version.full = [version.major, "0", "0"];
                console.warn(
                  "There was an issue retrieving Bootstrap's version. Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.",
                  err
                );
              }
            }
            version.major = version.full[0];
            version.success = true;
          }
          if (version.major === "4") {
            var toUpdate = [];
            if (Selectpicker.DEFAULTS.style === classNames.BUTTONCLASS) toUpdate.push({ name: "style", className: "BUTTONCLASS" });
            if (Selectpicker.DEFAULTS.iconBase === classNames.ICONBASE) toUpdate.push({ name: "iconBase", className: "ICONBASE" });
            if (Selectpicker.DEFAULTS.tickIcon === classNames.TICKICON) toUpdate.push({ name: "tickIcon", className: "TICKICON" });
            classNames.DIVIDER = "dropdown-divider";
            classNames.SHOW = "show";
            classNames.BUTTONCLASS = "btn-light";
            classNames.POPOVERHEADER = "popover-header";
            classNames.ICONBASE = "";
            classNames.TICKICON = "bs-ok-default";
            for (var i5 = 0; i5 < toUpdate.length; i5++) {
              var option = toUpdate[i5];
              Selectpicker.DEFAULTS[option.name] = classNames[option.className];
            }
          }
          var value;
          var chain = this.each(function() {
            var $this = $2(this);
            if ($this.is("select")) {
              var data = $this.data("selectpicker"), options = typeof _option == "object" && _option;
              if (!data) {
                var dataAttributes = $this.data();
                for (var dataAttr in dataAttributes) {
                  if (Object.prototype.hasOwnProperty.call(dataAttributes, dataAttr) && $2.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
                    delete dataAttributes[dataAttr];
                  }
                }
                var config = $2.extend({}, Selectpicker.DEFAULTS, $2.fn.selectpicker.defaults || {}, dataAttributes, options);
                config.template = $2.extend({}, Selectpicker.DEFAULTS.template, $2.fn.selectpicker.defaults ? $2.fn.selectpicker.defaults.template : {}, dataAttributes.template, options.template);
                $this.data("selectpicker", data = new Selectpicker(this, config));
              } else if (options) {
                for (var i6 in options) {
                  if (Object.prototype.hasOwnProperty.call(options, i6)) {
                    data.options[i6] = options[i6];
                  }
                }
              }
              if (typeof _option == "string") {
                if (data[_option] instanceof Function) {
                  value = data[_option].apply(data, args);
                } else {
                  value = data.options[_option];
                }
              }
            }
          });
          if (typeof value !== "undefined") {
            return value;
          } else {
            return chain;
          }
        }
        var old = $2.fn.selectpicker;
        $2.fn.selectpicker = Plugin;
        $2.fn.selectpicker.Constructor = Selectpicker;
        $2.fn.selectpicker.noConflict = function() {
          $2.fn.selectpicker = old;
          return this;
        };
        function keydownHandler() {
          if ($2.fn.dropdown) {
            var bootstrapKeydown = $2.fn.dropdown.Constructor._dataApiKeydownHandler || $2.fn.dropdown.Constructor.prototype.keydown;
            return bootstrapKeydown.apply(this, arguments);
          }
        }
        $2(document).off("keydown.bs.dropdown.data-api").on("keydown.bs.dropdown.data-api", ':not(.bootstrap-select) > [data-toggle="dropdown"]', keydownHandler).on("keydown.bs.dropdown.data-api", ":not(.bootstrap-select) > .dropdown-menu", keydownHandler).on("keydown" + EVENT_KEY, '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', Selectpicker.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', function(e5) {
          e5.stopPropagation();
        });
        $2(window).on("load" + EVENT_KEY + ".data-api", function() {
          $2(".selectpicker").each(function() {
            var $selectpicker = $2(this);
            Plugin.call($selectpicker, $selectpicker.data());
          });
        });
      })(jQuery4);
    });
  }
});

// web/globals.ts
var import_jquery = __toESM(require_jquery());
window.jQuery = import_jquery.default;

// web/codesearch_ui.tsx
var import_bootstrap_select = __toESM(require_bootstrap_select());

// web/bootstrap/js/bootstrap.js
if (typeof jQuery === "undefined") {
  throw new Error("Bootstrap's JavaScript requires jQuery");
}
+(function($2) {
  "use strict";
  var version = $2.fn.jquery.split(" ")[0].split(".");
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] > 3) {
    throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
  }
})(jQuery);
+(function($2) {
  "use strict";
  var backdrop = ".dropdown-backdrop";
  var toggle = '[data-toggle="dropdown"]';
  var Dropdown = function(element) {
    $2(element).on("click.bs.dropdown", this.toggle);
  };
  Dropdown.VERSION = "3.4.1";
  function getParent($this) {
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = selector !== "#" ? $2(document).find(selector) : null;
    return $parent && $parent.length ? $parent : $this.parent();
  }
  function clearMenus(e5) {
    if (e5 && e5.which === 3) return;
    $2(backdrop).remove();
    $2(toggle).each(function() {
      var $this = $2(this);
      var $parent = getParent($this);
      var relatedTarget = { relatedTarget: this };
      if (!$parent.hasClass("open")) return;
      if (e5 && e5.type == "click" && /input|textarea/i.test(e5.target.tagName) && $2.contains($parent[0], e5.target)) return;
      $parent.trigger(e5 = $2.Event("hide.bs.dropdown", relatedTarget));
      if (e5.isDefaultPrevented()) return;
      $this.attr("aria-expanded", "false");
      $parent.removeClass("open").trigger($2.Event("hidden.bs.dropdown", relatedTarget));
    });
  }
  Dropdown.prototype.toggle = function(e5) {
    var $this = $2(this);
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    clearMenus();
    if (!isActive) {
      if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
        $2(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($2(this)).on("click", clearMenus);
      }
      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e5 = $2.Event("show.bs.dropdown", relatedTarget));
      if (e5.isDefaultPrevented()) return;
      $this.trigger("focus").attr("aria-expanded", "true");
      $parent.toggleClass("open").trigger($2.Event("shown.bs.dropdown", relatedTarget));
    }
    return false;
  };
  Dropdown.prototype.keydown = function(e5) {
    if (!/(38|40|27|32)/.test(e5.which) || /input|textarea/i.test(e5.target.tagName)) return;
    var $this = $2(this);
    e5.preventDefault();
    e5.stopPropagation();
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    if (!isActive && e5.which != 27 || isActive && e5.which == 27) {
      if (e5.which == 27) $parent.find(toggle).trigger("focus");
      return $this.trigger("click");
    }
    var desc = " li:not(.disabled):visible a";
    var $items = $parent.find(".dropdown-menu" + desc);
    if (!$items.length) return;
    var index = $items.index(e5.target);
    if (e5.which == 38 && index > 0) index--;
    if (e5.which == 40 && index < $items.length - 1) index++;
    if (!~index) index = 0;
    $items.eq(index).trigger("focus");
  };
  function Plugin(option) {
    return this.each(function() {
      var $this = $2(this);
      var data = $this.data("bs.dropdown");
      if (!data) $this.data("bs.dropdown", data = new Dropdown(this));
      if (typeof option == "string") data[option].call($this);
    });
  }
  var old = $2.fn.dropdown;
  $2.fn.dropdown = Plugin;
  $2.fn.dropdown.Constructor = Dropdown;
  $2.fn.dropdown.noConflict = function() {
    $2.fn.dropdown = old;
    return this;
  };
  $2(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e5) {
    e5.stopPropagation();
  }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
})(jQuery);

// ../../node_modules/htmx.org/dist/htmx.esm.js
var htmx2 = (function() {
  "use strict";
  const htmx = {
    // Tsc madness here, assigning the functions directly results in an invalid TypeScript output, but reassigning is fine
    /* Event processing */
    /** @type {typeof onLoadHelper} */
    onLoad: null,
    /** @type {typeof processNode} */
    process: null,
    /** @type {typeof addEventListenerImpl} */
    on: null,
    /** @type {typeof removeEventListenerImpl} */
    off: null,
    /** @type {typeof triggerEvent} */
    trigger: null,
    /** @type {typeof ajaxHelper} */
    ajax: null,
    /* DOM querying helpers */
    /** @type {typeof find} */
    find: null,
    /** @type {typeof findAll} */
    findAll: null,
    /** @type {typeof closest} */
    closest: null,
    /**
     * Returns the input values that would resolve for a given element via the htmx value resolution mechanism
     *
     * @see https://htmx.org/api/#values
     *
     * @param {Element} elt the element to resolve values on
     * @param {HttpVerb} type the request type (e.g. **get** or **post**) non-GET's will include the enclosing form of the element. Defaults to **post**
     * @returns {Object}
     */
    values: function(elt, type) {
      const inputValues = getInputValues(elt, type || "post");
      return inputValues.values;
    },
    /* DOM manipulation helpers */
    /** @type {typeof removeElement} */
    remove: null,
    /** @type {typeof addClassToElement} */
    addClass: null,
    /** @type {typeof removeClassFromElement} */
    removeClass: null,
    /** @type {typeof toggleClassOnElement} */
    toggleClass: null,
    /** @type {typeof takeClassForElement} */
    takeClass: null,
    /** @type {typeof swap} */
    swap: null,
    /* Extension entrypoints */
    /** @type {typeof defineExtension} */
    defineExtension: null,
    /** @type {typeof removeExtension} */
    removeExtension: null,
    /* Debugging */
    /** @type {typeof logAll} */
    logAll: null,
    /** @type {typeof logNone} */
    logNone: null,
    /* Debugging */
    /**
     * The logger htmx uses to log with
     *
     * @see https://htmx.org/api/#logger
     */
    logger: null,
    /**
     * A property holding the configuration htmx uses at runtime.
     *
     * Note that using a [meta tag](https://htmx.org/docs/#config) is the preferred mechanism for setting these properties.
     *
     * @see https://htmx.org/api/#config
     */
    config: {
      /**
       * Whether to use history.
       * @type boolean
       * @default true
       */
      historyEnabled: true,
      /**
       * The number of pages to keep in **sessionStorage** for history support.
       * @type number
       * @default 10
       */
      historyCacheSize: 10,
      /**
       * @type boolean
       * @default false
       */
      refreshOnHistoryMiss: false,
      /**
       * The default swap style to use if **[hx-swap](https://htmx.org/attributes/hx-swap)** is omitted.
       * @type HtmxSwapStyle
       * @default 'innerHTML'
       */
      defaultSwapStyle: "innerHTML",
      /**
       * The default delay between receiving a response from the server and doing the swap.
       * @type number
       * @default 0
       */
      defaultSwapDelay: 0,
      /**
       * The default delay between completing the content swap and settling attributes.
       * @type number
       * @default 20
       */
      defaultSettleDelay: 20,
      /**
       * If true, htmx will inject a small amount of CSS into the page to make indicators invisible unless the **htmx-indicator** class is present.
       * @type boolean
       * @default true
       */
      includeIndicatorStyles: true,
      /**
       * The class to place on indicators when a request is in flight.
       * @type string
       * @default 'htmx-indicator'
       */
      indicatorClass: "htmx-indicator",
      /**
       * The class to place on triggering elements when a request is in flight.
       * @type string
       * @default 'htmx-request'
       */
      requestClass: "htmx-request",
      /**
       * The class to temporarily place on elements that htmx has added to the DOM.
       * @type string
       * @default 'htmx-added'
       */
      addedClass: "htmx-added",
      /**
       * The class to place on target elements when htmx is in the settling phase.
       * @type string
       * @default 'htmx-settling'
       */
      settlingClass: "htmx-settling",
      /**
       * The class to place on target elements when htmx is in the swapping phase.
       * @type string
       * @default 'htmx-swapping'
       */
      swappingClass: "htmx-swapping",
      /**
       * Allows the use of eval-like functionality in htmx, to enable **hx-vars**, trigger conditions & script tag evaluation. Can be set to **false** for CSP compatibility.
       * @type boolean
       * @default true
       */
      allowEval: true,
      /**
       * If set to false, disables the interpretation of script tags.
       * @type boolean
       * @default true
       */
      allowScriptTags: true,
      /**
       * If set, the nonce will be added to inline scripts.
       * @type string
       * @default ''
       */
      inlineScriptNonce: "",
      /**
       * If set, the nonce will be added to inline styles.
       * @type string
       * @default ''
       */
      inlineStyleNonce: "",
      /**
       * The attributes to settle during the settling phase.
       * @type string[]
       * @default ['class', 'style', 'width', 'height']
       */
      attributesToSettle: ["class", "style", "width", "height"],
      /**
       * Allow cross-site Access-Control requests using credentials such as cookies, authorization headers or TLS client certificates.
       * @type boolean
       * @default false
       */
      withCredentials: false,
      /**
       * @type number
       * @default 0
       */
      timeout: 0,
      /**
       * The default implementation of **getWebSocketReconnectDelay** for reconnecting after unexpected connection loss by the event code **Abnormal Closure**, **Service Restart** or **Try Again Later**.
       * @type {'full-jitter' | ((retryCount:number) => number)}
       * @default "full-jitter"
       */
      wsReconnectDelay: "full-jitter",
      /**
       * The type of binary data being received over the WebSocket connection
       * @type BinaryType
       * @default 'blob'
       */
      wsBinaryType: "blob",
      /**
       * @type string
       * @default '[hx-disable], [data-hx-disable]'
       */
      disableSelector: "[hx-disable], [data-hx-disable]",
      /**
       * @type {'auto' | 'instant' | 'smooth'}
       * @default 'instant'
       */
      scrollBehavior: "instant",
      /**
       * If the focused element should be scrolled into view.
       * @type boolean
       * @default false
       */
      defaultFocusScroll: false,
      /**
       * If set to true htmx will include a cache-busting parameter in GET requests to avoid caching partial responses by the browser
       * @type boolean
       * @default false
       */
      getCacheBusterParam: false,
      /**
       * If set to true, htmx will use the View Transition API when swapping in new content.
       * @type boolean
       * @default false
       */
      globalViewTransitions: false,
      /**
       * htmx will format requests with these methods by encoding their parameters in the URL, not the request body
       * @type {(HttpVerb)[]}
       * @default ['get', 'delete']
       */
      methodsThatUseUrlParams: ["get", "delete"],
      /**
       * If set to true, disables htmx-based requests to non-origin hosts.
       * @type boolean
       * @default false
       */
      selfRequestsOnly: true,
      /**
       * If set to true htmx will not update the title of the document when a title tag is found in new content
       * @type boolean
       * @default false
       */
      ignoreTitle: false,
      /**
       * Whether the target of a boosted element is scrolled into the viewport.
       * @type boolean
       * @default true
       */
      scrollIntoViewOnBoost: true,
      /**
       * The cache to store evaluated trigger specifications into.
       * You may define a simple object to use a never-clearing cache, or implement your own system using a [proxy object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
       * @type {Object|null}
       * @default null
       */
      triggerSpecsCache: null,
      /** @type boolean */
      disableInheritance: false,
      /** @type HtmxResponseHandlingConfig[] */
      responseHandling: [
        { code: "204", swap: false },
        { code: "[23]..", swap: true },
        { code: "[45]..", swap: false, error: true }
      ],
      /**
       * Whether to process OOB swaps on elements that are nested within the main response element.
       * @type boolean
       * @default true
       */
      allowNestedOobSwaps: true,
      /**
       * Whether to treat history cache miss full page reload requests as a "HX-Request" by returning this response header
       * This should always be disabled when using HX-Request header to optionally return partial responses
       * @type boolean
       * @default true
       */
      historyRestoreAsHxRequest: true,
      /**
       * Whether to report input validation errors to the end user and update focus to the first input that fails validation.
       * This should always be enabled as this matches default browser form submit behaviour
       * @type boolean
       * @default false
       */
      reportValidityOfForms: false
    },
    /** @type {typeof parseInterval} */
    parseInterval: null,
    /**
     * proxy of window.location used for page reload functions
     * @type location
     */
    location,
    /** @type {typeof internalEval} */
    _: null,
    version: "2.0.8"
  };
  htmx.onLoad = onLoadHelper;
  htmx.process = processNode;
  htmx.on = addEventListenerImpl;
  htmx.off = removeEventListenerImpl;
  htmx.trigger = triggerEvent;
  htmx.ajax = ajaxHelper;
  htmx.find = find;
  htmx.findAll = findAll;
  htmx.closest = closest;
  htmx.remove = removeElement;
  htmx.addClass = addClassToElement;
  htmx.removeClass = removeClassFromElement;
  htmx.toggleClass = toggleClassOnElement;
  htmx.takeClass = takeClassForElement;
  htmx.swap = swap;
  htmx.defineExtension = defineExtension;
  htmx.removeExtension = removeExtension;
  htmx.logAll = logAll;
  htmx.logNone = logNone;
  htmx.parseInterval = parseInterval;
  htmx._ = internalEval;
  const internalAPI = {
    addTriggerHandler,
    bodyContains,
    canAccessLocalStorage,
    findThisElement,
    filterValues,
    swap,
    hasAttribute,
    getAttributeValue,
    getClosestAttributeValue,
    getClosestMatch,
    getExpressionVars,
    getHeaders,
    getInputValues,
    getInternalData,
    getSwapSpecification,
    getTriggerSpecs,
    getTarget,
    makeFragment,
    mergeObjects,
    makeSettleInfo,
    oobSwap,
    querySelectorExt,
    settleImmediately,
    shouldCancel,
    triggerEvent,
    triggerErrorEvent,
    withExtensions
  };
  const VERBS = ["get", "post", "put", "delete", "patch"];
  const VERB_SELECTOR = VERBS.map(function(verb) {
    return "[hx-" + verb + "], [data-hx-" + verb + "]";
  }).join(", ");
  function parseInterval(str2) {
    if (str2 == void 0) {
      return void 0;
    }
    let interval = NaN;
    if (str2.slice(-2) == "ms") {
      interval = parseFloat(str2.slice(0, -2));
    } else if (str2.slice(-1) == "s") {
      interval = parseFloat(str2.slice(0, -1)) * 1e3;
    } else if (str2.slice(-1) == "m") {
      interval = parseFloat(str2.slice(0, -1)) * 1e3 * 60;
    } else {
      interval = parseFloat(str2);
    }
    return isNaN(interval) ? void 0 : interval;
  }
  function getRawAttribute(elt, name) {
    return elt instanceof Element && elt.getAttribute(name);
  }
  function hasAttribute(elt, qualifiedName) {
    return !!elt.hasAttribute && (elt.hasAttribute(qualifiedName) || elt.hasAttribute("data-" + qualifiedName));
  }
  function getAttributeValue(elt, qualifiedName) {
    return getRawAttribute(elt, qualifiedName) || getRawAttribute(elt, "data-" + qualifiedName);
  }
  function parentElt(elt) {
    const parent = elt.parentElement;
    if (!parent && elt.parentNode instanceof ShadowRoot) return elt.parentNode;
    return parent;
  }
  function getDocument() {
    return document;
  }
  function getRootNode(elt, global) {
    return elt.getRootNode ? elt.getRootNode({ composed: global }) : getDocument();
  }
  function getClosestMatch(elt, condition) {
    while (elt && !condition(elt)) {
      elt = parentElt(elt);
    }
    return elt || null;
  }
  function getAttributeValueWithDisinheritance(initialElement, ancestor, attributeName) {
    const attributeValue = getAttributeValue(ancestor, attributeName);
    const disinherit = getAttributeValue(ancestor, "hx-disinherit");
    var inherit = getAttributeValue(ancestor, "hx-inherit");
    if (initialElement !== ancestor) {
      if (htmx.config.disableInheritance) {
        if (inherit && (inherit === "*" || inherit.split(" ").indexOf(attributeName) >= 0)) {
          return attributeValue;
        } else {
          return null;
        }
      }
      if (disinherit && (disinherit === "*" || disinherit.split(" ").indexOf(attributeName) >= 0)) {
        return "unset";
      }
    }
    return attributeValue;
  }
  function getClosestAttributeValue(elt, attributeName) {
    let closestAttr = null;
    getClosestMatch(elt, function(e5) {
      return !!(closestAttr = getAttributeValueWithDisinheritance(elt, asElement(e5), attributeName));
    });
    if (closestAttr !== "unset") {
      return closestAttr;
    }
  }
  function matches(elt, selector) {
    return elt instanceof Element && elt.matches(selector);
  }
  function getStartTag(str2) {
    const tagMatcher = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
    const match = tagMatcher.exec(str2);
    if (match) {
      return match[1].toLowerCase();
    } else {
      return "";
    }
  }
  function parseHTML(resp) {
    if ("parseHTMLUnsafe" in Document) {
      return Document.parseHTMLUnsafe(resp);
    }
    const parser = new DOMParser();
    return parser.parseFromString(resp, "text/html");
  }
  function takeChildrenFor(fragment, elt) {
    while (elt.childNodes.length > 0) {
      fragment.append(elt.childNodes[0]);
    }
  }
  function duplicateScript(script) {
    const newScript = getDocument().createElement("script");
    forEach(script.attributes, function(attr) {
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.textContent = script.textContent;
    newScript.async = false;
    if (htmx.config.inlineScriptNonce) {
      newScript.nonce = htmx.config.inlineScriptNonce;
    }
    return newScript;
  }
  function isJavaScriptScriptNode(script) {
    return script.matches("script") && (script.type === "text/javascript" || script.type === "module" || script.type === "");
  }
  function normalizeScriptTags(fragment) {
    Array.from(fragment.querySelectorAll("script")).forEach(
      /** @param {HTMLScriptElement} script */
      (script) => {
        if (isJavaScriptScriptNode(script)) {
          const newScript = duplicateScript(script);
          const parent = script.parentNode;
          try {
            parent.insertBefore(newScript, script);
          } catch (e5) {
            logError(e5);
          } finally {
            script.remove();
          }
        }
      }
    );
  }
  function makeFragment(response) {
    const responseWithNoHead = response.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i, "");
    const startTag = getStartTag(responseWithNoHead);
    let fragment;
    if (startTag === "html") {
      fragment = /** @type DocumentFragmentWithTitle */
      new DocumentFragment();
      const doc = parseHTML(response);
      takeChildrenFor(fragment, doc.body);
      fragment.title = doc.title;
    } else if (startTag === "body") {
      fragment = /** @type DocumentFragmentWithTitle */
      new DocumentFragment();
      const doc = parseHTML(responseWithNoHead);
      takeChildrenFor(fragment, doc.body);
      fragment.title = doc.title;
    } else {
      const doc = parseHTML('<body><template class="internal-htmx-wrapper">' + responseWithNoHead + "</template></body>");
      fragment = /** @type DocumentFragmentWithTitle */
      doc.querySelector("template").content;
      fragment.title = doc.title;
      var titleElement = fragment.querySelector("title");
      if (titleElement && titleElement.parentNode === fragment) {
        titleElement.remove();
        fragment.title = titleElement.innerText;
      }
    }
    if (fragment) {
      if (htmx.config.allowScriptTags) {
        normalizeScriptTags(fragment);
      } else {
        fragment.querySelectorAll("script").forEach((script) => script.remove());
      }
    }
    return fragment;
  }
  function maybeCall(func) {
    if (func) {
      func();
    }
  }
  function isType(o6, type) {
    return Object.prototype.toString.call(o6) === "[object " + type + "]";
  }
  function isFunction(o6) {
    return typeof o6 === "function";
  }
  function isRawObject(o6) {
    return isType(o6, "Object");
  }
  function getInternalData(elt) {
    const dataProp = "htmx-internal-data";
    let data = elt[dataProp];
    if (!data) {
      data = elt[dataProp] = {};
    }
    return data;
  }
  function toArray(arr) {
    const returnArr = [];
    if (arr) {
      for (let i5 = 0; i5 < arr.length; i5++) {
        returnArr.push(arr[i5]);
      }
    }
    return returnArr;
  }
  function forEach(arr, func) {
    if (arr) {
      for (let i5 = 0; i5 < arr.length; i5++) {
        func(arr[i5]);
      }
    }
  }
  function isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
  }
  function bodyContains(elt) {
    return elt.getRootNode({ composed: true }) === document;
  }
  function splitOnWhitespace(trigger) {
    return trigger.trim().split(/\s+/);
  }
  function mergeObjects(obj1, obj2) {
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        obj1[key] = obj2[key];
      }
    }
    return obj1;
  }
  function parseJSON(jString) {
    try {
      return JSON.parse(jString);
    } catch (error) {
      logError(error);
      return null;
    }
  }
  function canAccessLocalStorage() {
    const test = "htmx:sessionStorageTest";
    try {
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e5) {
      return false;
    }
  }
  function normalizePath(path) {
    const url = new URL(path, "http://x");
    if (url) {
      path = url.pathname + url.search;
    }
    if (path != "/") {
      path = path.replace(/\/+$/, "");
    }
    return path;
  }
  function internalEval(str) {
    return maybeEval(getDocument().body, function() {
      return eval(str);
    });
  }
  function onLoadHelper(callback) {
    const value = htmx.on(
      "htmx:load",
      /** @param {CustomEvent} evt */
      function(evt) {
        callback(evt.detail.elt);
      }
    );
    return value;
  }
  function logAll() {
    htmx.logger = function(elt, event, data) {
      if (console) {
        console.log(event, elt, data);
      }
    };
  }
  function logNone() {
    htmx.logger = null;
  }
  function find(eltOrSelector, selector) {
    if (typeof eltOrSelector !== "string") {
      return eltOrSelector.querySelector(selector);
    } else {
      return find(getDocument(), eltOrSelector);
    }
  }
  function findAll(eltOrSelector, selector) {
    if (typeof eltOrSelector !== "string") {
      return eltOrSelector.querySelectorAll(selector);
    } else {
      return findAll(getDocument(), eltOrSelector);
    }
  }
  function getWindow() {
    return window;
  }
  function removeElement(elt, delay) {
    elt = resolveTarget(elt);
    if (delay) {
      getWindow().setTimeout(function() {
        removeElement(elt);
        elt = null;
      }, delay);
    } else {
      parentElt(elt).removeChild(elt);
    }
  }
  function asElement(elt) {
    return elt instanceof Element ? elt : null;
  }
  function asHtmlElement(elt) {
    return elt instanceof HTMLElement ? elt : null;
  }
  function asString(value) {
    return typeof value === "string" ? value : null;
  }
  function asParentNode(elt) {
    return elt instanceof Element || elt instanceof Document || elt instanceof DocumentFragment ? elt : null;
  }
  function addClassToElement(elt, clazz, delay) {
    elt = asElement(resolveTarget(elt));
    if (!elt) {
      return;
    }
    if (delay) {
      getWindow().setTimeout(function() {
        addClassToElement(elt, clazz);
        elt = null;
      }, delay);
    } else {
      elt.classList && elt.classList.add(clazz);
    }
  }
  function removeClassFromElement(node, clazz, delay) {
    let elt = asElement(resolveTarget(node));
    if (!elt) {
      return;
    }
    if (delay) {
      getWindow().setTimeout(function() {
        removeClassFromElement(elt, clazz);
        elt = null;
      }, delay);
    } else {
      if (elt.classList) {
        elt.classList.remove(clazz);
        if (elt.classList.length === 0) {
          elt.removeAttribute("class");
        }
      }
    }
  }
  function toggleClassOnElement(elt, clazz) {
    elt = resolveTarget(elt);
    elt.classList.toggle(clazz);
  }
  function takeClassForElement(elt, clazz) {
    elt = resolveTarget(elt);
    forEach(elt.parentElement.children, function(child) {
      removeClassFromElement(child, clazz);
    });
    addClassToElement(asElement(elt), clazz);
  }
  function closest(elt, selector) {
    elt = asElement(resolveTarget(elt));
    if (elt) {
      return elt.closest(selector);
    }
    return null;
  }
  function startsWith(str2, prefix) {
    return str2.substring(0, prefix.length) === prefix;
  }
  function endsWith(str2, suffix) {
    return str2.substring(str2.length - suffix.length) === suffix;
  }
  function normalizeSelector(selector) {
    const trimmedSelector = selector.trim();
    if (startsWith(trimmedSelector, "<") && endsWith(trimmedSelector, "/>")) {
      return trimmedSelector.substring(1, trimmedSelector.length - 2);
    } else {
      return trimmedSelector;
    }
  }
  function querySelectorAllExt(elt, selector, global) {
    if (selector.indexOf("global ") === 0) {
      return querySelectorAllExt(elt, selector.slice(7), true);
    }
    elt = resolveTarget(elt);
    const parts = [];
    {
      let chevronsCount = 0;
      let offset = 0;
      for (let i5 = 0; i5 < selector.length; i5++) {
        const char = selector[i5];
        if (char === "," && chevronsCount === 0) {
          parts.push(selector.substring(offset, i5));
          offset = i5 + 1;
          continue;
        }
        if (char === "<") {
          chevronsCount++;
        } else if (char === "/" && i5 < selector.length - 1 && selector[i5 + 1] === ">") {
          chevronsCount--;
        }
      }
      if (offset < selector.length) {
        parts.push(selector.substring(offset));
      }
    }
    const result = [];
    const unprocessedParts = [];
    while (parts.length > 0) {
      const selector2 = normalizeSelector(parts.shift());
      let item;
      if (selector2.indexOf("closest ") === 0) {
        item = closest(asElement(elt), normalizeSelector(selector2.slice(8)));
      } else if (selector2.indexOf("find ") === 0) {
        item = find(asParentNode(elt), normalizeSelector(selector2.slice(5)));
      } else if (selector2 === "next" || selector2 === "nextElementSibling") {
        item = asElement(elt).nextElementSibling;
      } else if (selector2.indexOf("next ") === 0) {
        item = scanForwardQuery(elt, normalizeSelector(selector2.slice(5)), !!global);
      } else if (selector2 === "previous" || selector2 === "previousElementSibling") {
        item = asElement(elt).previousElementSibling;
      } else if (selector2.indexOf("previous ") === 0) {
        item = scanBackwardsQuery(elt, normalizeSelector(selector2.slice(9)), !!global);
      } else if (selector2 === "document") {
        item = document;
      } else if (selector2 === "window") {
        item = window;
      } else if (selector2 === "body") {
        item = document.body;
      } else if (selector2 === "root") {
        item = getRootNode(elt, !!global);
      } else if (selector2 === "host") {
        item = /** @type ShadowRoot */
        elt.getRootNode().host;
      } else {
        unprocessedParts.push(selector2);
      }
      if (item) {
        result.push(item);
      }
    }
    if (unprocessedParts.length > 0) {
      const standardSelector = unprocessedParts.join(",");
      const rootNode = asParentNode(getRootNode(elt, !!global));
      result.push(...toArray(rootNode.querySelectorAll(standardSelector)));
    }
    return result;
  }
  var scanForwardQuery = function(start, match, global) {
    const results = asParentNode(getRootNode(start, global)).querySelectorAll(match);
    for (let i5 = 0; i5 < results.length; i5++) {
      const elt = results[i5];
      if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_PRECEDING) {
        return elt;
      }
    }
  };
  var scanBackwardsQuery = function(start, match, global) {
    const results = asParentNode(getRootNode(start, global)).querySelectorAll(match);
    for (let i5 = results.length - 1; i5 >= 0; i5--) {
      const elt = results[i5];
      if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_FOLLOWING) {
        return elt;
      }
    }
  };
  function querySelectorExt(eltOrSelector, selector) {
    if (typeof eltOrSelector !== "string") {
      return querySelectorAllExt(eltOrSelector, selector)[0];
    } else {
      return querySelectorAllExt(getDocument().body, eltOrSelector)[0];
    }
  }
  function resolveTarget(eltOrSelector, context) {
    if (typeof eltOrSelector === "string") {
      return find(asParentNode(context) || document, eltOrSelector);
    } else {
      return eltOrSelector;
    }
  }
  function processEventArgs(arg1, arg2, arg3, arg4) {
    if (isFunction(arg2)) {
      return {
        target: getDocument().body,
        event: asString(arg1),
        listener: arg2,
        options: arg3
      };
    } else {
      return {
        target: resolveTarget(arg1),
        event: asString(arg2),
        listener: arg3,
        options: arg4
      };
    }
  }
  function addEventListenerImpl(arg1, arg2, arg3, arg4) {
    ready(function() {
      const eventArgs = processEventArgs(arg1, arg2, arg3, arg4);
      eventArgs.target.addEventListener(eventArgs.event, eventArgs.listener, eventArgs.options);
    });
    const b3 = isFunction(arg2);
    return b3 ? arg2 : arg3;
  }
  function removeEventListenerImpl(arg1, arg2, arg3) {
    ready(function() {
      const eventArgs = processEventArgs(arg1, arg2, arg3);
      eventArgs.target.removeEventListener(eventArgs.event, eventArgs.listener);
    });
    return isFunction(arg2) ? arg2 : arg3;
  }
  const DUMMY_ELT = getDocument().createElement("output");
  function findAttributeTargets(elt, attrName) {
    const attrTarget = getClosestAttributeValue(elt, attrName);
    if (attrTarget) {
      if (attrTarget === "this") {
        return [findThisElement(elt, attrName)];
      } else {
        const result = querySelectorAllExt(elt, attrTarget);
        const shouldInherit = /(^|,)(\s*)inherit(\s*)($|,)/.test(attrTarget);
        if (shouldInherit) {
          const eltToInheritFrom = asElement(getClosestMatch(elt, function(parent) {
            return parent !== elt && hasAttribute(asElement(parent), attrName);
          }));
          if (eltToInheritFrom) {
            result.push(...findAttributeTargets(eltToInheritFrom, attrName));
          }
        }
        if (result.length === 0) {
          logError('The selector "' + attrTarget + '" on ' + attrName + " returned no matches!");
          return [DUMMY_ELT];
        } else {
          return result;
        }
      }
    }
  }
  function findThisElement(elt, attribute) {
    return asElement(getClosestMatch(elt, function(elt2) {
      return getAttributeValue(asElement(elt2), attribute) != null;
    }));
  }
  function getTarget(elt) {
    const targetStr = getClosestAttributeValue(elt, "hx-target");
    if (targetStr) {
      if (targetStr === "this") {
        return findThisElement(elt, "hx-target");
      } else {
        return querySelectorExt(elt, targetStr);
      }
    } else {
      const data = getInternalData(elt);
      if (data.boosted) {
        return getDocument().body;
      } else {
        return elt;
      }
    }
  }
  function shouldSettleAttribute(name) {
    return htmx.config.attributesToSettle.includes(name);
  }
  function cloneAttributes(mergeTo, mergeFrom) {
    forEach(Array.from(mergeTo.attributes), function(attr) {
      if (!mergeFrom.hasAttribute(attr.name) && shouldSettleAttribute(attr.name)) {
        mergeTo.removeAttribute(attr.name);
      }
    });
    forEach(mergeFrom.attributes, function(attr) {
      if (shouldSettleAttribute(attr.name)) {
        mergeTo.setAttribute(attr.name, attr.value);
      }
    });
  }
  function isInlineSwap(swapStyle, target) {
    const extensions2 = getExtensions(target);
    for (let i5 = 0; i5 < extensions2.length; i5++) {
      const extension = extensions2[i5];
      try {
        if (extension.isInlineSwap(swapStyle)) {
          return true;
        }
      } catch (e5) {
        logError(e5);
      }
    }
    return swapStyle === "outerHTML";
  }
  function oobSwap(oobValue, oobElement, settleInfo, rootNode) {
    rootNode = rootNode || getDocument();
    let selector = "#" + CSS.escape(getRawAttribute(oobElement, "id"));
    let swapStyle = "outerHTML";
    if (oobValue === "true") {
    } else if (oobValue.indexOf(":") > 0) {
      swapStyle = oobValue.substring(0, oobValue.indexOf(":"));
      selector = oobValue.substring(oobValue.indexOf(":") + 1);
    } else {
      swapStyle = oobValue;
    }
    oobElement.removeAttribute("hx-swap-oob");
    oobElement.removeAttribute("data-hx-swap-oob");
    const targets = querySelectorAllExt(rootNode, selector, false);
    if (targets.length) {
      forEach(
        targets,
        function(target) {
          let fragment;
          const oobElementClone = oobElement.cloneNode(true);
          fragment = getDocument().createDocumentFragment();
          fragment.appendChild(oobElementClone);
          if (!isInlineSwap(swapStyle, target)) {
            fragment = asParentNode(oobElementClone);
          }
          const beforeSwapDetails = { shouldSwap: true, target, fragment };
          if (!triggerEvent(target, "htmx:oobBeforeSwap", beforeSwapDetails)) return;
          target = beforeSwapDetails.target;
          if (beforeSwapDetails.shouldSwap) {
            handlePreservedElements(fragment);
            swapWithStyle(swapStyle, target, target, fragment, settleInfo);
            restorePreservedElements();
          }
          forEach(settleInfo.elts, function(elt) {
            triggerEvent(elt, "htmx:oobAfterSwap", beforeSwapDetails);
          });
        }
      );
      oobElement.parentNode.removeChild(oobElement);
    } else {
      oobElement.parentNode.removeChild(oobElement);
      triggerErrorEvent(getDocument().body, "htmx:oobErrorNoTarget", { content: oobElement });
    }
    return oobValue;
  }
  function restorePreservedElements() {
    const pantry = find("#--htmx-preserve-pantry--");
    if (pantry) {
      for (const preservedElt of [...pantry.children]) {
        const existingElement = find("#" + preservedElt.id);
        existingElement.parentNode.moveBefore(preservedElt, existingElement);
        existingElement.remove();
      }
      pantry.remove();
    }
  }
  function handlePreservedElements(fragment) {
    forEach(findAll(fragment, "[hx-preserve], [data-hx-preserve]"), function(preservedElt) {
      const id = getAttributeValue(preservedElt, "id");
      const existingElement = getDocument().getElementById(id);
      if (existingElement != null) {
        if (preservedElt.moveBefore) {
          let pantry = find("#--htmx-preserve-pantry--");
          if (pantry == null) {
            getDocument().body.insertAdjacentHTML("afterend", "<div id='--htmx-preserve-pantry--'></div>");
            pantry = find("#--htmx-preserve-pantry--");
          }
          pantry.moveBefore(existingElement, null);
        } else {
          preservedElt.parentNode.replaceChild(existingElement, preservedElt);
        }
      }
    });
  }
  function handleAttributes(parentNode, fragment, settleInfo) {
    forEach(fragment.querySelectorAll("[id]"), function(newNode) {
      const id = getRawAttribute(newNode, "id");
      if (id && id.length > 0) {
        const normalizedId = id.replace("'", "\\'");
        const normalizedTag = newNode.tagName.replace(":", "\\:");
        const parentElt2 = asParentNode(parentNode);
        const oldNode = parentElt2 && parentElt2.querySelector(normalizedTag + "[id='" + normalizedId + "']");
        if (oldNode && oldNode !== parentElt2) {
          const newAttributes = newNode.cloneNode();
          cloneAttributes(newNode, oldNode);
          settleInfo.tasks.push(function() {
            cloneAttributes(newNode, newAttributes);
          });
        }
      }
    });
  }
  function makeAjaxLoadTask(child) {
    return function() {
      removeClassFromElement(child, htmx.config.addedClass);
      processNode(asElement(child));
      processFocus(asParentNode(child));
      triggerEvent(child, "htmx:load");
    };
  }
  function processFocus(child) {
    const autofocus = "[autofocus]";
    const autoFocusedElt = asHtmlElement(matches(child, autofocus) ? child : child.querySelector(autofocus));
    if (autoFocusedElt != null) {
      autoFocusedElt.focus();
    }
  }
  function insertNodesBefore(parentNode, insertBefore, fragment, settleInfo) {
    handleAttributes(parentNode, fragment, settleInfo);
    while (fragment.childNodes.length > 0) {
      const child = fragment.firstChild;
      addClassToElement(asElement(child), htmx.config.addedClass);
      parentNode.insertBefore(child, insertBefore);
      if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
        settleInfo.tasks.push(makeAjaxLoadTask(child));
      }
    }
  }
  function stringHash(string, hash) {
    let char = 0;
    while (char < string.length) {
      hash = (hash << 5) - hash + string.charCodeAt(char++) | 0;
    }
    return hash;
  }
  function attributeHash(elt) {
    let hash = 0;
    for (let i5 = 0; i5 < elt.attributes.length; i5++) {
      const attribute = elt.attributes[i5];
      if (attribute.value) {
        hash = stringHash(attribute.name, hash);
        hash = stringHash(attribute.value, hash);
      }
    }
    return hash;
  }
  function deInitOnHandlers(elt) {
    const internalData = getInternalData(elt);
    if (internalData.onHandlers) {
      for (let i5 = 0; i5 < internalData.onHandlers.length; i5++) {
        const handlerInfo = internalData.onHandlers[i5];
        removeEventListenerImpl(elt, handlerInfo.event, handlerInfo.listener);
      }
      delete internalData.onHandlers;
    }
  }
  function deInitNode(element) {
    const internalData = getInternalData(element);
    if (internalData.timeout) {
      clearTimeout(internalData.timeout);
    }
    if (internalData.listenerInfos) {
      forEach(internalData.listenerInfos, function(info) {
        if (info.on) {
          removeEventListenerImpl(info.on, info.trigger, info.listener);
        }
      });
    }
    deInitOnHandlers(element);
    forEach(Object.keys(internalData), function(key) {
      if (key !== "firstInitCompleted") delete internalData[key];
    });
  }
  function cleanUpElement(element) {
    triggerEvent(element, "htmx:beforeCleanupElement");
    deInitNode(element);
    forEach(element.children, function(child) {
      cleanUpElement(child);
    });
  }
  function swapOuterHTML(target, fragment, settleInfo) {
    if (target.tagName === "BODY") {
      return swapInnerHTML(target, fragment, settleInfo);
    }
    let newElt;
    const eltBeforeNewContent = target.previousSibling;
    const parentNode = parentElt(target);
    if (!parentNode) {
      return;
    }
    insertNodesBefore(parentNode, target, fragment, settleInfo);
    if (eltBeforeNewContent == null) {
      newElt = parentNode.firstChild;
    } else {
      newElt = eltBeforeNewContent.nextSibling;
    }
    settleInfo.elts = settleInfo.elts.filter(function(e5) {
      return e5 !== target;
    });
    while (newElt && newElt !== target) {
      if (newElt instanceof Element) {
        settleInfo.elts.push(newElt);
      }
      newElt = newElt.nextSibling;
    }
    cleanUpElement(target);
    target.remove();
  }
  function swapAfterBegin(target, fragment, settleInfo) {
    return insertNodesBefore(target, target.firstChild, fragment, settleInfo);
  }
  function swapBeforeBegin(target, fragment, settleInfo) {
    return insertNodesBefore(parentElt(target), target, fragment, settleInfo);
  }
  function swapBeforeEnd(target, fragment, settleInfo) {
    return insertNodesBefore(target, null, fragment, settleInfo);
  }
  function swapAfterEnd(target, fragment, settleInfo) {
    return insertNodesBefore(parentElt(target), target.nextSibling, fragment, settleInfo);
  }
  function swapDelete(target) {
    cleanUpElement(target);
    const parent = parentElt(target);
    if (parent) {
      return parent.removeChild(target);
    }
  }
  function swapInnerHTML(target, fragment, settleInfo) {
    const firstChild = target.firstChild;
    insertNodesBefore(target, firstChild, fragment, settleInfo);
    if (firstChild) {
      while (firstChild.nextSibling) {
        cleanUpElement(firstChild.nextSibling);
        target.removeChild(firstChild.nextSibling);
      }
      cleanUpElement(firstChild);
      target.removeChild(firstChild);
    }
  }
  function swapWithStyle(swapStyle, elt, target, fragment, settleInfo) {
    switch (swapStyle) {
      case "none":
        return;
      case "outerHTML":
        swapOuterHTML(target, fragment, settleInfo);
        return;
      case "afterbegin":
        swapAfterBegin(target, fragment, settleInfo);
        return;
      case "beforebegin":
        swapBeforeBegin(target, fragment, settleInfo);
        return;
      case "beforeend":
        swapBeforeEnd(target, fragment, settleInfo);
        return;
      case "afterend":
        swapAfterEnd(target, fragment, settleInfo);
        return;
      case "delete":
        swapDelete(target);
        return;
      default:
        var extensions2 = getExtensions(elt);
        for (let i5 = 0; i5 < extensions2.length; i5++) {
          const ext = extensions2[i5];
          try {
            const newElements = ext.handleSwap(swapStyle, target, fragment, settleInfo);
            if (newElements) {
              if (Array.isArray(newElements)) {
                for (let j2 = 0; j2 < newElements.length; j2++) {
                  const child = newElements[j2];
                  if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                    settleInfo.tasks.push(makeAjaxLoadTask(child));
                  }
                }
              }
              return;
            }
          } catch (e5) {
            logError(e5);
          }
        }
        if (swapStyle === "innerHTML") {
          swapInnerHTML(target, fragment, settleInfo);
        } else {
          swapWithStyle(htmx.config.defaultSwapStyle, elt, target, fragment, settleInfo);
        }
    }
  }
  function findAndSwapOobElements(fragment, settleInfo, rootNode) {
    var oobElts = findAll(fragment, "[hx-swap-oob], [data-hx-swap-oob]");
    forEach(oobElts, function(oobElement) {
      if (htmx.config.allowNestedOobSwaps || oobElement.parentElement === null) {
        const oobValue = getAttributeValue(oobElement, "hx-swap-oob");
        if (oobValue != null) {
          oobSwap(oobValue, oobElement, settleInfo, rootNode);
        }
      } else {
        oobElement.removeAttribute("hx-swap-oob");
        oobElement.removeAttribute("data-hx-swap-oob");
      }
    });
    return oobElts.length > 0;
  }
  function swap(target, content, swapSpec, swapOptions) {
    if (!swapOptions) {
      swapOptions = {};
    }
    let settleResolve = null;
    let settleReject = null;
    let doSwap = function() {
      maybeCall(swapOptions.beforeSwapCallback);
      target = resolveTarget(target);
      const rootNode = swapOptions.contextElement ? getRootNode(swapOptions.contextElement, false) : getDocument();
      const activeElt = document.activeElement;
      let selectionInfo = {};
      selectionInfo = {
        elt: activeElt,
        // @ts-ignore
        start: activeElt ? activeElt.selectionStart : null,
        // @ts-ignore
        end: activeElt ? activeElt.selectionEnd : null
      };
      const settleInfo = makeSettleInfo(target);
      if (swapSpec.swapStyle === "textContent") {
        target.textContent = content;
      } else {
        let fragment = makeFragment(content);
        settleInfo.title = swapOptions.title || fragment.title;
        if (swapOptions.historyRequest) {
          fragment = fragment.querySelector("[hx-history-elt],[data-hx-history-elt]") || fragment;
        }
        if (swapOptions.selectOOB) {
          const oobSelectValues = swapOptions.selectOOB.split(",");
          for (let i5 = 0; i5 < oobSelectValues.length; i5++) {
            const oobSelectValue = oobSelectValues[i5].split(":", 2);
            let id = oobSelectValue[0].trim();
            if (id.indexOf("#") === 0) {
              id = id.substring(1);
            }
            const oobValue = oobSelectValue[1] || "true";
            const oobElement = fragment.querySelector("#" + id);
            if (oobElement) {
              oobSwap(oobValue, oobElement, settleInfo, rootNode);
            }
          }
        }
        findAndSwapOobElements(fragment, settleInfo, rootNode);
        forEach(
          findAll(fragment, "template"),
          /** @param {HTMLTemplateElement} template */
          function(template) {
            if (template.content && findAndSwapOobElements(template.content, settleInfo, rootNode)) {
              template.remove();
            }
          }
        );
        if (swapOptions.select) {
          const newFragment = getDocument().createDocumentFragment();
          forEach(fragment.querySelectorAll(swapOptions.select), function(node) {
            newFragment.appendChild(node);
          });
          fragment = newFragment;
        }
        handlePreservedElements(fragment);
        swapWithStyle(swapSpec.swapStyle, swapOptions.contextElement, target, fragment, settleInfo);
        restorePreservedElements();
      }
      if (selectionInfo.elt && !bodyContains(selectionInfo.elt) && getRawAttribute(selectionInfo.elt, "id")) {
        const newActiveElt = document.getElementById(getRawAttribute(selectionInfo.elt, "id"));
        const focusOptions = { preventScroll: swapSpec.focusScroll !== void 0 ? !swapSpec.focusScroll : !htmx.config.defaultFocusScroll };
        if (newActiveElt) {
          if (selectionInfo.start && newActiveElt.setSelectionRange) {
            try {
              newActiveElt.setSelectionRange(selectionInfo.start, selectionInfo.end);
            } catch (e5) {
            }
          }
          newActiveElt.focus(focusOptions);
        }
      }
      target.classList.remove(htmx.config.swappingClass);
      forEach(settleInfo.elts, function(elt2) {
        if (elt2.classList) {
          elt2.classList.add(htmx.config.settlingClass);
        }
        triggerEvent(elt2, "htmx:afterSwap", swapOptions.eventInfo);
      });
      maybeCall(swapOptions.afterSwapCallback);
      if (!swapSpec.ignoreTitle) {
        handleTitle(settleInfo.title);
      }
      const doSettle = function() {
        forEach(settleInfo.tasks, function(task) {
          task.call();
        });
        forEach(settleInfo.elts, function(elt2) {
          if (elt2.classList) {
            elt2.classList.remove(htmx.config.settlingClass);
          }
          triggerEvent(elt2, "htmx:afterSettle", swapOptions.eventInfo);
        });
        if (swapOptions.anchor) {
          const anchorTarget = asElement(resolveTarget("#" + swapOptions.anchor));
          if (anchorTarget) {
            anchorTarget.scrollIntoView({ block: "start", behavior: "auto" });
          }
        }
        updateScrollState(settleInfo.elts, swapSpec);
        maybeCall(swapOptions.afterSettleCallback);
        maybeCall(settleResolve);
      };
      if (swapSpec.settleDelay > 0) {
        getWindow().setTimeout(doSettle, swapSpec.settleDelay);
      } else {
        doSettle();
      }
    };
    let shouldTransition = htmx.config.globalViewTransitions;
    if (swapSpec.hasOwnProperty("transition")) {
      shouldTransition = swapSpec.transition;
    }
    const elt = swapOptions.contextElement || getDocument();
    if (shouldTransition && triggerEvent(elt, "htmx:beforeTransition", swapOptions.eventInfo) && typeof Promise !== "undefined" && // @ts-ignore experimental feature atm
    document.startViewTransition) {
      const settlePromise = new Promise(function(_resolve, _reject) {
        settleResolve = _resolve;
        settleReject = _reject;
      });
      const innerDoSwap = doSwap;
      doSwap = function() {
        document.startViewTransition(function() {
          innerDoSwap();
          return settlePromise;
        });
      };
    }
    try {
      if (swapSpec?.swapDelay && swapSpec.swapDelay > 0) {
        getWindow().setTimeout(doSwap, swapSpec.swapDelay);
      } else {
        doSwap();
      }
    } catch (e5) {
      triggerErrorEvent(elt, "htmx:swapError", swapOptions.eventInfo);
      maybeCall(settleReject);
      throw e5;
    }
  }
  function handleTriggerHeader(xhr, header, elt) {
    const triggerBody = xhr.getResponseHeader(header);
    if (triggerBody.indexOf("{") === 0) {
      const triggers = parseJSON(triggerBody);
      for (const eventName in triggers) {
        if (triggers.hasOwnProperty(eventName)) {
          let detail = triggers[eventName];
          if (isRawObject(detail)) {
            elt = detail.target !== void 0 ? detail.target : elt;
          } else {
            detail = { value: detail };
          }
          triggerEvent(elt, eventName, detail);
        }
      }
    } else {
      const eventNames = triggerBody.split(",");
      for (let i5 = 0; i5 < eventNames.length; i5++) {
        triggerEvent(elt, eventNames[i5].trim(), []);
      }
    }
  }
  const WHITESPACE = /\s/;
  const WHITESPACE_OR_COMMA = /[\s,]/;
  const SYMBOL_START = /[_$a-zA-Z]/;
  const SYMBOL_CONT = /[_$a-zA-Z0-9]/;
  const STRINGISH_START = ['"', "'", "/"];
  const NOT_WHITESPACE = /[^\s]/;
  const COMBINED_SELECTOR_START = /[{(]/;
  const COMBINED_SELECTOR_END = /[})]/;
  function tokenizeString(str2) {
    const tokens = [];
    let position = 0;
    while (position < str2.length) {
      if (SYMBOL_START.exec(str2.charAt(position))) {
        var startPosition = position;
        while (SYMBOL_CONT.exec(str2.charAt(position + 1))) {
          position++;
        }
        tokens.push(str2.substring(startPosition, position + 1));
      } else if (STRINGISH_START.indexOf(str2.charAt(position)) !== -1) {
        const startChar = str2.charAt(position);
        var startPosition = position;
        position++;
        while (position < str2.length && str2.charAt(position) !== startChar) {
          if (str2.charAt(position) === "\\") {
            position++;
          }
          position++;
        }
        tokens.push(str2.substring(startPosition, position + 1));
      } else {
        const symbol = str2.charAt(position);
        tokens.push(symbol);
      }
      position++;
    }
    return tokens;
  }
  function isPossibleRelativeReference(token, last, paramName) {
    return SYMBOL_START.exec(token.charAt(0)) && token !== "true" && token !== "false" && token !== "this" && token !== paramName && last !== ".";
  }
  function maybeGenerateConditional(elt, tokens, paramName) {
    if (tokens[0] === "[") {
      tokens.shift();
      let bracketCount = 1;
      let conditionalSource = " return (function(" + paramName + "){ return (";
      let last = null;
      while (tokens.length > 0) {
        const token = tokens[0];
        if (token === "]") {
          bracketCount--;
          if (bracketCount === 0) {
            if (last === null) {
              conditionalSource = conditionalSource + "true";
            }
            tokens.shift();
            conditionalSource += ")})";
            try {
              const conditionFunction = maybeEval(
                elt,
                function() {
                  return Function(conditionalSource)();
                },
                function() {
                  return true;
                }
              );
              conditionFunction.source = conditionalSource;
              return conditionFunction;
            } catch (e5) {
              triggerErrorEvent(getDocument().body, "htmx:syntax:error", { error: e5, source: conditionalSource });
              return null;
            }
          }
        } else if (token === "[") {
          bracketCount++;
        }
        if (isPossibleRelativeReference(token, last, paramName)) {
          conditionalSource += "((" + paramName + "." + token + ") ? (" + paramName + "." + token + ") : (window." + token + "))";
        } else {
          conditionalSource = conditionalSource + token;
        }
        last = tokens.shift();
      }
    }
  }
  function consumeUntil(tokens, match) {
    let result = "";
    while (tokens.length > 0 && !match.test(tokens[0])) {
      result += tokens.shift();
    }
    return result;
  }
  function consumeCSSSelector(tokens) {
    let result;
    if (tokens.length > 0 && COMBINED_SELECTOR_START.test(tokens[0])) {
      tokens.shift();
      result = consumeUntil(tokens, COMBINED_SELECTOR_END).trim();
      tokens.shift();
    } else {
      result = consumeUntil(tokens, WHITESPACE_OR_COMMA);
    }
    return result;
  }
  const INPUT_SELECTOR = "input, textarea, select";
  function parseAndCacheTrigger(elt, explicitTrigger, cache) {
    const triggerSpecs = [];
    const tokens = tokenizeString(explicitTrigger);
    do {
      consumeUntil(tokens, NOT_WHITESPACE);
      const initialLength = tokens.length;
      const trigger = consumeUntil(tokens, /[,\[\s]/);
      if (trigger !== "") {
        if (trigger === "every") {
          const every = { trigger: "every" };
          consumeUntil(tokens, NOT_WHITESPACE);
          every.pollInterval = parseInterval(consumeUntil(tokens, /[,\[\s]/));
          consumeUntil(tokens, NOT_WHITESPACE);
          var eventFilter = maybeGenerateConditional(elt, tokens, "event");
          if (eventFilter) {
            every.eventFilter = eventFilter;
          }
          triggerSpecs.push(every);
        } else {
          const triggerSpec = { trigger };
          var eventFilter = maybeGenerateConditional(elt, tokens, "event");
          if (eventFilter) {
            triggerSpec.eventFilter = eventFilter;
          }
          consumeUntil(tokens, NOT_WHITESPACE);
          while (tokens.length > 0 && tokens[0] !== ",") {
            const token = tokens.shift();
            if (token === "changed") {
              triggerSpec.changed = true;
            } else if (token === "once") {
              triggerSpec.once = true;
            } else if (token === "consume") {
              triggerSpec.consume = true;
            } else if (token === "delay" && tokens[0] === ":") {
              tokens.shift();
              triggerSpec.delay = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
            } else if (token === "from" && tokens[0] === ":") {
              tokens.shift();
              if (COMBINED_SELECTOR_START.test(tokens[0])) {
                var from_arg = consumeCSSSelector(tokens);
              } else {
                var from_arg = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                if (from_arg === "closest" || from_arg === "find" || from_arg === "next" || from_arg === "previous") {
                  tokens.shift();
                  const selector = consumeCSSSelector(tokens);
                  if (selector.length > 0) {
                    from_arg += " " + selector;
                  }
                }
              }
              triggerSpec.from = from_arg;
            } else if (token === "target" && tokens[0] === ":") {
              tokens.shift();
              triggerSpec.target = consumeCSSSelector(tokens);
            } else if (token === "throttle" && tokens[0] === ":") {
              tokens.shift();
              triggerSpec.throttle = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
            } else if (token === "queue" && tokens[0] === ":") {
              tokens.shift();
              triggerSpec.queue = consumeUntil(tokens, WHITESPACE_OR_COMMA);
            } else if (token === "root" && tokens[0] === ":") {
              tokens.shift();
              triggerSpec[token] = consumeCSSSelector(tokens);
            } else if (token === "threshold" && tokens[0] === ":") {
              tokens.shift();
              triggerSpec[token] = consumeUntil(tokens, WHITESPACE_OR_COMMA);
            } else {
              triggerErrorEvent(elt, "htmx:syntax:error", { token: tokens.shift() });
            }
            consumeUntil(tokens, NOT_WHITESPACE);
          }
          triggerSpecs.push(triggerSpec);
        }
      }
      if (tokens.length === initialLength) {
        triggerErrorEvent(elt, "htmx:syntax:error", { token: tokens.shift() });
      }
      consumeUntil(tokens, NOT_WHITESPACE);
    } while (tokens[0] === "," && tokens.shift());
    if (cache) {
      cache[explicitTrigger] = triggerSpecs;
    }
    return triggerSpecs;
  }
  function getTriggerSpecs(elt) {
    const explicitTrigger = getAttributeValue(elt, "hx-trigger");
    let triggerSpecs = [];
    if (explicitTrigger) {
      const cache = htmx.config.triggerSpecsCache;
      triggerSpecs = cache && cache[explicitTrigger] || parseAndCacheTrigger(elt, explicitTrigger, cache);
    }
    if (triggerSpecs.length > 0) {
      return triggerSpecs;
    } else if (matches(elt, "form")) {
      return [{ trigger: "submit" }];
    } else if (matches(elt, 'input[type="button"], input[type="submit"]')) {
      return [{ trigger: "click" }];
    } else if (matches(elt, INPUT_SELECTOR)) {
      return [{ trigger: "change" }];
    } else {
      return [{ trigger: "click" }];
    }
  }
  function cancelPolling(elt) {
    getInternalData(elt).cancelled = true;
  }
  function processPolling(elt, handler, spec) {
    const nodeData = getInternalData(elt);
    nodeData.timeout = getWindow().setTimeout(function() {
      if (bodyContains(elt) && nodeData.cancelled !== true) {
        if (!maybeFilterEvent(spec, elt, makeEvent("hx:poll:trigger", {
          triggerSpec: spec,
          target: elt
        }))) {
          handler(elt);
        }
        processPolling(elt, handler, spec);
      }
    }, spec.pollInterval);
  }
  function isLocalLink(elt) {
    return location.hostname === elt.hostname && getRawAttribute(elt, "href") && getRawAttribute(elt, "href").indexOf("#") !== 0;
  }
  function eltIsDisabled(elt) {
    return closest(elt, htmx.config.disableSelector);
  }
  function boostElement(elt, nodeData, triggerSpecs) {
    if (elt instanceof HTMLAnchorElement && isLocalLink(elt) && (elt.target === "" || elt.target === "_self") || elt.tagName === "FORM" && String(getRawAttribute(elt, "method")).toLowerCase() !== "dialog") {
      nodeData.boosted = true;
      let verb, path;
      if (elt.tagName === "A") {
        verb = /** @type HttpVerb */
        "get";
        path = getRawAttribute(elt, "href");
      } else {
        const rawAttribute = getRawAttribute(elt, "method");
        verb = /** @type HttpVerb */
        rawAttribute ? rawAttribute.toLowerCase() : "get";
        path = getRawAttribute(elt, "action");
        if (path == null || path === "") {
          path = location.href;
        }
        if (verb === "get" && path.includes("?")) {
          path = path.replace(/\?[^#]+/, "");
        }
      }
      triggerSpecs.forEach(function(triggerSpec) {
        addEventListener(elt, function(node, evt) {
          const elt2 = asElement(node);
          if (eltIsDisabled(elt2)) {
            cleanUpElement(elt2);
            return;
          }
          issueAjaxRequest(verb, path, elt2, evt);
        }, nodeData, triggerSpec, true);
      });
    }
  }
  function shouldCancel(evt, elt) {
    if (evt.type === "submit" && elt.tagName === "FORM") {
      return true;
    } else if (evt.type === "click") {
      const btn = (
        /** @type {HTMLButtonElement|HTMLInputElement|null} */
        elt.closest('input[type="submit"], button')
      );
      if (btn && btn.form && btn.type === "submit") {
        return true;
      }
      const link = elt.closest("a");
      const samePageAnchor = /^#.+/;
      if (link && link.href && !samePageAnchor.test(link.getAttribute("href"))) {
        return true;
      }
    }
    return false;
  }
  function ignoreBoostedAnchorCtrlClick(elt, evt) {
    return getInternalData(elt).boosted && elt instanceof HTMLAnchorElement && evt.type === "click" && // @ts-ignore this will resolve to undefined for events that don't define those properties, which is fine
    (evt.ctrlKey || evt.metaKey);
  }
  function maybeFilterEvent(triggerSpec, elt, evt) {
    const eventFilter = triggerSpec.eventFilter;
    if (eventFilter) {
      try {
        return eventFilter.call(elt, evt) !== true;
      } catch (e5) {
        const source = eventFilter.source;
        triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", { error: e5, source });
        return true;
      }
    }
    return false;
  }
  function addEventListener(elt, handler, nodeData, triggerSpec, explicitCancel) {
    const elementData = getInternalData(elt);
    let eltsToListenOn;
    if (triggerSpec.from) {
      eltsToListenOn = querySelectorAllExt(elt, triggerSpec.from);
    } else {
      eltsToListenOn = [elt];
    }
    if (triggerSpec.changed) {
      if (!("lastValue" in elementData)) {
        elementData.lastValue = /* @__PURE__ */ new WeakMap();
      }
      eltsToListenOn.forEach(function(eltToListenOn) {
        if (!elementData.lastValue.has(triggerSpec)) {
          elementData.lastValue.set(triggerSpec, /* @__PURE__ */ new WeakMap());
        }
        elementData.lastValue.get(triggerSpec).set(eltToListenOn, eltToListenOn.value);
      });
    }
    forEach(eltsToListenOn, function(eltToListenOn) {
      const eventListener = function(evt) {
        if (!bodyContains(elt)) {
          eltToListenOn.removeEventListener(triggerSpec.trigger, eventListener);
          return;
        }
        if (ignoreBoostedAnchorCtrlClick(elt, evt)) {
          return;
        }
        if (explicitCancel || shouldCancel(evt, eltToListenOn)) {
          evt.preventDefault();
        }
        if (maybeFilterEvent(triggerSpec, elt, evt)) {
          return;
        }
        const eventData = getInternalData(evt);
        eventData.triggerSpec = triggerSpec;
        if (eventData.handledFor == null) {
          eventData.handledFor = [];
        }
        if (eventData.handledFor.indexOf(elt) < 0) {
          eventData.handledFor.push(elt);
          if (triggerSpec.consume) {
            evt.stopPropagation();
          }
          if (triggerSpec.target && evt.target) {
            if (!matches(asElement(evt.target), triggerSpec.target)) {
              return;
            }
          }
          if (triggerSpec.once) {
            if (elementData.triggeredOnce) {
              return;
            } else {
              elementData.triggeredOnce = true;
            }
          }
          if (triggerSpec.changed) {
            const node = evt.target;
            const value = node.value;
            const lastValue = elementData.lastValue.get(triggerSpec);
            if (lastValue.has(node) && lastValue.get(node) === value) {
              return;
            }
            lastValue.set(node, value);
          }
          if (elementData.delayed) {
            clearTimeout(elementData.delayed);
          }
          if (elementData.throttle) {
            return;
          }
          if (triggerSpec.throttle > 0) {
            if (!elementData.throttle) {
              triggerEvent(elt, "htmx:trigger");
              handler(elt, evt);
              elementData.throttle = getWindow().setTimeout(function() {
                elementData.throttle = null;
              }, triggerSpec.throttle);
            }
          } else if (triggerSpec.delay > 0) {
            elementData.delayed = getWindow().setTimeout(function() {
              triggerEvent(elt, "htmx:trigger");
              handler(elt, evt);
            }, triggerSpec.delay);
          } else {
            triggerEvent(elt, "htmx:trigger");
            handler(elt, evt);
          }
        }
      };
      if (nodeData.listenerInfos == null) {
        nodeData.listenerInfos = [];
      }
      nodeData.listenerInfos.push({
        trigger: triggerSpec.trigger,
        listener: eventListener,
        on: eltToListenOn
      });
      eltToListenOn.addEventListener(triggerSpec.trigger, eventListener);
    });
  }
  let windowIsScrolling = false;
  let scrollHandler = null;
  function initScrollHandler() {
    if (!scrollHandler) {
      scrollHandler = function() {
        windowIsScrolling = true;
      };
      window.addEventListener("scroll", scrollHandler);
      window.addEventListener("resize", scrollHandler);
      setInterval(function() {
        if (windowIsScrolling) {
          windowIsScrolling = false;
          forEach(getDocument().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"), function(elt) {
            maybeReveal(elt);
          });
        }
      }, 200);
    }
  }
  function maybeReveal(elt) {
    if (!hasAttribute(elt, "data-hx-revealed") && isScrolledIntoView(elt)) {
      elt.setAttribute("data-hx-revealed", "true");
      const nodeData = getInternalData(elt);
      if (nodeData.initHash) {
        triggerEvent(elt, "revealed");
      } else {
        elt.addEventListener("htmx:afterProcessNode", function() {
          triggerEvent(elt, "revealed");
        }, { once: true });
      }
    }
  }
  function loadImmediately(elt, handler, nodeData, delay) {
    const load = function() {
      if (!nodeData.loaded) {
        nodeData.loaded = true;
        triggerEvent(elt, "htmx:trigger");
        handler(elt);
      }
    };
    if (delay > 0) {
      getWindow().setTimeout(load, delay);
    } else {
      load();
    }
  }
  function processVerbs(elt, nodeData, triggerSpecs) {
    let explicitAction = false;
    forEach(VERBS, function(verb) {
      if (hasAttribute(elt, "hx-" + verb)) {
        const path = getAttributeValue(elt, "hx-" + verb);
        explicitAction = true;
        nodeData.path = path;
        nodeData.verb = verb;
        triggerSpecs.forEach(function(triggerSpec) {
          addTriggerHandler(elt, triggerSpec, nodeData, function(node, evt) {
            const elt2 = asElement(node);
            if (eltIsDisabled(elt2)) {
              cleanUpElement(elt2);
              return;
            }
            issueAjaxRequest(verb, path, elt2, evt);
          });
        });
      }
    });
    return explicitAction;
  }
  function addTriggerHandler(elt, triggerSpec, nodeData, handler) {
    if (triggerSpec.trigger === "revealed") {
      initScrollHandler();
      addEventListener(elt, handler, nodeData, triggerSpec);
      maybeReveal(asElement(elt));
    } else if (triggerSpec.trigger === "intersect") {
      const observerOptions = {};
      if (triggerSpec.root) {
        observerOptions.root = querySelectorExt(elt, triggerSpec.root);
      }
      if (triggerSpec.threshold) {
        observerOptions.threshold = parseFloat(triggerSpec.threshold);
      }
      const observer = new IntersectionObserver(function(entries) {
        for (let i5 = 0; i5 < entries.length; i5++) {
          const entry = entries[i5];
          if (entry.isIntersecting) {
            triggerEvent(elt, "intersect");
            break;
          }
        }
      }, observerOptions);
      observer.observe(asElement(elt));
      addEventListener(asElement(elt), handler, nodeData, triggerSpec);
    } else if (!nodeData.firstInitCompleted && triggerSpec.trigger === "load") {
      if (!maybeFilterEvent(triggerSpec, elt, makeEvent("load", { elt }))) {
        loadImmediately(asElement(elt), handler, nodeData, triggerSpec.delay);
      }
    } else if (triggerSpec.pollInterval > 0) {
      nodeData.polling = true;
      processPolling(asElement(elt), handler, triggerSpec);
    } else {
      addEventListener(elt, handler, nodeData, triggerSpec);
    }
  }
  function shouldProcessHxOn(node) {
    const elt = asElement(node);
    if (!elt) {
      return false;
    }
    const attributes = elt.attributes;
    for (let j2 = 0; j2 < attributes.length; j2++) {
      const attrName = attributes[j2].name;
      if (startsWith(attrName, "hx-on:") || startsWith(attrName, "data-hx-on:") || startsWith(attrName, "hx-on-") || startsWith(attrName, "data-hx-on-")) {
        return true;
      }
    }
    return false;
  }
  const HX_ON_QUERY = new XPathEvaluator().createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]');
  function processHXOnRoot(elt, elements) {
    if (shouldProcessHxOn(elt)) {
      elements.push(asElement(elt));
    }
    const iter = HX_ON_QUERY.evaluate(elt);
    let node = null;
    while (node = iter.iterateNext()) elements.push(asElement(node));
  }
  function findHxOnWildcardElements(elt) {
    const elements = [];
    if (elt instanceof DocumentFragment) {
      for (const child of elt.childNodes) {
        processHXOnRoot(child, elements);
      }
    } else {
      processHXOnRoot(elt, elements);
    }
    return elements;
  }
  function findElementsToProcess(elt) {
    if (elt.querySelectorAll) {
      const boostedSelector = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";
      const extensionSelectors = [];
      for (const e5 in extensions) {
        const extension = extensions[e5];
        if (extension.getSelectors) {
          var selectors = extension.getSelectors();
          if (selectors) {
            extensionSelectors.push(selectors);
          }
        }
      }
      const results = elt.querySelectorAll(VERB_SELECTOR + boostedSelector + ", form, [type='submit'], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]" + extensionSelectors.flat().map((s4) => ", " + s4).join(""));
      return results;
    } else {
      return [];
    }
  }
  function maybeSetLastButtonClicked(evt) {
    const elt = getTargetButton(evt.target);
    const internalData = getRelatedFormData(evt);
    if (internalData) {
      internalData.lastButtonClicked = elt;
    }
  }
  function maybeUnsetLastButtonClicked(evt) {
    const internalData = getRelatedFormData(evt);
    if (internalData) {
      internalData.lastButtonClicked = null;
    }
  }
  function getTargetButton(target) {
    return (
      /** @type {HTMLButtonElement|HTMLInputElement|null} */
      closest(asElement(target), "button, input[type='submit']")
    );
  }
  function getRelatedForm(elt) {
    return elt.form || closest(elt, "form");
  }
  function getRelatedFormData(evt) {
    const elt = getTargetButton(evt.target);
    if (!elt) {
      return;
    }
    const form = getRelatedForm(elt);
    if (!form) {
      return;
    }
    return getInternalData(form);
  }
  function initButtonTracking(elt) {
    elt.addEventListener("click", maybeSetLastButtonClicked);
    elt.addEventListener("focusin", maybeSetLastButtonClicked);
    elt.addEventListener("focusout", maybeUnsetLastButtonClicked);
  }
  function addHxOnEventHandler(elt, eventName, code) {
    const nodeData = getInternalData(elt);
    if (!Array.isArray(nodeData.onHandlers)) {
      nodeData.onHandlers = [];
    }
    let func;
    const listener = function(e5) {
      maybeEval(elt, function() {
        if (eltIsDisabled(elt)) {
          return;
        }
        if (!func) {
          func = new Function("event", code);
        }
        func.call(elt, e5);
      });
    };
    elt.addEventListener(eventName, listener);
    nodeData.onHandlers.push({ event: eventName, listener });
  }
  function processHxOnWildcard(elt) {
    deInitOnHandlers(elt);
    for (let i5 = 0; i5 < elt.attributes.length; i5++) {
      const name = elt.attributes[i5].name;
      const value = elt.attributes[i5].value;
      if (startsWith(name, "hx-on") || startsWith(name, "data-hx-on")) {
        const afterOnPosition = name.indexOf("-on") + 3;
        const nextChar = name.slice(afterOnPosition, afterOnPosition + 1);
        if (nextChar === "-" || nextChar === ":") {
          let eventName = name.slice(afterOnPosition + 1);
          if (startsWith(eventName, ":")) {
            eventName = "htmx" + eventName;
          } else if (startsWith(eventName, "-")) {
            eventName = "htmx:" + eventName.slice(1);
          } else if (startsWith(eventName, "htmx-")) {
            eventName = "htmx:" + eventName.slice(5);
          }
          addHxOnEventHandler(elt, eventName, value);
        }
      }
    }
  }
  function initNode(elt) {
    triggerEvent(elt, "htmx:beforeProcessNode");
    const nodeData = getInternalData(elt);
    const triggerSpecs = getTriggerSpecs(elt);
    const hasExplicitHttpAction = processVerbs(elt, nodeData, triggerSpecs);
    if (!hasExplicitHttpAction) {
      if (getClosestAttributeValue(elt, "hx-boost") === "true") {
        boostElement(elt, nodeData, triggerSpecs);
      } else if (hasAttribute(elt, "hx-trigger")) {
        triggerSpecs.forEach(function(triggerSpec) {
          addTriggerHandler(elt, triggerSpec, nodeData, function() {
          });
        });
      }
    }
    if (elt.tagName === "FORM" || getRawAttribute(elt, "type") === "submit" && hasAttribute(elt, "form")) {
      initButtonTracking(elt);
    }
    nodeData.firstInitCompleted = true;
    triggerEvent(elt, "htmx:afterProcessNode");
  }
  function maybeDeInitAndHash(elt) {
    if (!(elt instanceof Element)) {
      return false;
    }
    const nodeData = getInternalData(elt);
    const hash = attributeHash(elt);
    if (nodeData.initHash !== hash) {
      deInitNode(elt);
      nodeData.initHash = hash;
      return true;
    }
    return false;
  }
  function processNode(elt) {
    elt = resolveTarget(elt);
    if (eltIsDisabled(elt)) {
      cleanUpElement(elt);
      return;
    }
    const elementsToInit = [];
    if (maybeDeInitAndHash(elt)) {
      elementsToInit.push(elt);
    }
    forEach(findElementsToProcess(elt), function(child) {
      if (eltIsDisabled(child)) {
        cleanUpElement(child);
        return;
      }
      if (maybeDeInitAndHash(child)) {
        elementsToInit.push(child);
      }
    });
    forEach(findHxOnWildcardElements(elt), processHxOnWildcard);
    forEach(elementsToInit, initNode);
  }
  function kebabEventName(str2) {
    return str2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function makeEvent(eventName, detail) {
    return new CustomEvent(eventName, { bubbles: true, cancelable: true, composed: true, detail });
  }
  function triggerErrorEvent(elt, eventName, detail) {
    triggerEvent(elt, eventName, mergeObjects({ error: eventName }, detail));
  }
  function ignoreEventForLogging(eventName) {
    return eventName === "htmx:afterProcessNode";
  }
  function withExtensions(elt, toDo, extensionsToIgnore) {
    forEach(getExtensions(elt, [], extensionsToIgnore), function(extension) {
      try {
        toDo(extension);
      } catch (e5) {
        logError(e5);
      }
    });
  }
  function logError(msg) {
    console.error(msg);
  }
  function triggerEvent(elt, eventName, detail) {
    elt = resolveTarget(elt);
    if (detail == null) {
      detail = {};
    }
    detail.elt = elt;
    const event = makeEvent(eventName, detail);
    if (htmx.logger && !ignoreEventForLogging(eventName)) {
      htmx.logger(elt, eventName, detail);
    }
    if (detail.error) {
      logError(detail.error);
      triggerEvent(elt, "htmx:error", { errorInfo: detail });
    }
    let eventResult = elt.dispatchEvent(event);
    const kebabName = kebabEventName(eventName);
    if (eventResult && kebabName !== eventName) {
      const kebabedEvent = makeEvent(kebabName, event.detail);
      eventResult = eventResult && elt.dispatchEvent(kebabedEvent);
    }
    withExtensions(asElement(elt), function(extension) {
      eventResult = eventResult && (extension.onEvent(eventName, event) !== false && !event.defaultPrevented);
    });
    return eventResult;
  }
  let currentPathForHistory;
  function setCurrentPathForHistory(path) {
    currentPathForHistory = path;
    if (canAccessLocalStorage()) {
      sessionStorage.setItem("htmx-current-path-for-history", path);
    }
  }
  setCurrentPathForHistory(location.pathname + location.search);
  function getHistoryElement() {
    const historyElt = getDocument().querySelector("[hx-history-elt],[data-hx-history-elt]");
    return historyElt || getDocument().body;
  }
  function saveToHistoryCache(url, rootElt) {
    if (!canAccessLocalStorage()) {
      return;
    }
    const innerHTML = cleanInnerHtmlForHistory(rootElt);
    const title = getDocument().title;
    const scroll = window.scrollY;
    if (htmx.config.historyCacheSize <= 0) {
      sessionStorage.removeItem("htmx-history-cache");
      return;
    }
    url = normalizePath(url);
    const historyCache = parseJSON(sessionStorage.getItem("htmx-history-cache")) || [];
    for (let i5 = 0; i5 < historyCache.length; i5++) {
      if (historyCache[i5].url === url) {
        historyCache.splice(i5, 1);
        break;
      }
    }
    const newHistoryItem = { url, content: innerHTML, title, scroll };
    triggerEvent(getDocument().body, "htmx:historyItemCreated", { item: newHistoryItem, cache: historyCache });
    historyCache.push(newHistoryItem);
    while (historyCache.length > htmx.config.historyCacheSize) {
      historyCache.shift();
    }
    while (historyCache.length > 0) {
      try {
        sessionStorage.setItem("htmx-history-cache", JSON.stringify(historyCache));
        break;
      } catch (e5) {
        triggerErrorEvent(getDocument().body, "htmx:historyCacheError", { cause: e5, cache: historyCache });
        historyCache.shift();
      }
    }
  }
  function getCachedHistory(url) {
    if (!canAccessLocalStorage()) {
      return null;
    }
    url = normalizePath(url);
    const historyCache = parseJSON(sessionStorage.getItem("htmx-history-cache")) || [];
    for (let i5 = 0; i5 < historyCache.length; i5++) {
      if (historyCache[i5].url === url) {
        return historyCache[i5];
      }
    }
    return null;
  }
  function cleanInnerHtmlForHistory(elt) {
    const className = htmx.config.requestClass;
    const clone = (
      /** @type Element */
      elt.cloneNode(true)
    );
    forEach(findAll(clone, "." + className), function(child) {
      removeClassFromElement(child, className);
    });
    forEach(findAll(clone, "[data-disabled-by-htmx]"), function(child) {
      child.removeAttribute("disabled");
    });
    return clone.innerHTML;
  }
  function saveCurrentPageToHistory() {
    const elt = getHistoryElement();
    let path = currentPathForHistory;
    if (canAccessLocalStorage()) {
      path = sessionStorage.getItem("htmx-current-path-for-history");
    }
    path = path || location.pathname + location.search;
    const disableHistoryCache = getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
    if (!disableHistoryCache) {
      triggerEvent(getDocument().body, "htmx:beforeHistorySave", { path, historyElt: elt });
      saveToHistoryCache(path, elt);
    }
    if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, getDocument().title, location.href);
  }
  function pushUrlIntoHistory(path) {
    if (htmx.config.getCacheBusterParam) {
      path = path.replace(/org\.htmx\.cache-buster=[^&]*&?/, "");
      if (endsWith(path, "&") || endsWith(path, "?")) {
        path = path.slice(0, -1);
      }
    }
    if (htmx.config.historyEnabled) {
      history.pushState({ htmx: true }, "", path);
    }
    setCurrentPathForHistory(path);
  }
  function replaceUrlInHistory(path) {
    if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, "", path);
    setCurrentPathForHistory(path);
  }
  function settleImmediately(tasks) {
    forEach(tasks, function(task) {
      task.call(void 0);
    });
  }
  function loadHistoryFromServer(path) {
    const request = new XMLHttpRequest();
    const swapSpec = { swapStyle: "innerHTML", swapDelay: 0, settleDelay: 0 };
    const details = { path, xhr: request, historyElt: getHistoryElement(), swapSpec };
    request.open("GET", path, true);
    if (htmx.config.historyRestoreAsHxRequest) {
      request.setRequestHeader("HX-Request", "true");
    }
    request.setRequestHeader("HX-History-Restore-Request", "true");
    request.setRequestHeader("HX-Current-URL", location.href);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        details.response = this.response;
        triggerEvent(getDocument().body, "htmx:historyCacheMissLoad", details);
        swap(details.historyElt, details.response, swapSpec, {
          contextElement: details.historyElt,
          historyRequest: true
        });
        setCurrentPathForHistory(details.path);
        triggerEvent(getDocument().body, "htmx:historyRestore", { path, cacheMiss: true, serverResponse: details.response });
      } else {
        triggerErrorEvent(getDocument().body, "htmx:historyCacheMissLoadError", details);
      }
    };
    if (triggerEvent(getDocument().body, "htmx:historyCacheMiss", details)) {
      request.send();
    }
  }
  function restoreHistory(path) {
    saveCurrentPageToHistory();
    path = path || location.pathname + location.search;
    const cached = getCachedHistory(path);
    if (cached) {
      const swapSpec = { swapStyle: "innerHTML", swapDelay: 0, settleDelay: 0, scroll: cached.scroll };
      const details = { path, item: cached, historyElt: getHistoryElement(), swapSpec };
      if (triggerEvent(getDocument().body, "htmx:historyCacheHit", details)) {
        swap(details.historyElt, cached.content, swapSpec, {
          contextElement: details.historyElt,
          title: cached.title
        });
        setCurrentPathForHistory(details.path);
        triggerEvent(getDocument().body, "htmx:historyRestore", details);
      }
    } else {
      if (htmx.config.refreshOnHistoryMiss) {
        htmx.location.reload(true);
      } else {
        loadHistoryFromServer(path);
      }
    }
  }
  function addRequestIndicatorClasses(elt) {
    let indicators = (
      /** @type Element[] */
      findAttributeTargets(elt, "hx-indicator")
    );
    if (indicators == null) {
      indicators = [elt];
    }
    forEach(indicators, function(ic) {
      const internalData = getInternalData(ic);
      internalData.requestCount = (internalData.requestCount || 0) + 1;
      ic.classList.add.call(ic.classList, htmx.config.requestClass);
    });
    return indicators;
  }
  function disableElements(elt) {
    let disabledElts = (
      /** @type Element[] */
      findAttributeTargets(elt, "hx-disabled-elt")
    );
    if (disabledElts == null) {
      disabledElts = [];
    }
    forEach(disabledElts, function(disabledElement) {
      const internalData = getInternalData(disabledElement);
      internalData.requestCount = (internalData.requestCount || 0) + 1;
      disabledElement.setAttribute("disabled", "");
      disabledElement.setAttribute("data-disabled-by-htmx", "");
    });
    return disabledElts;
  }
  function removeRequestIndicators(indicators, disabled) {
    forEach(indicators.concat(disabled), function(ele) {
      const internalData = getInternalData(ele);
      internalData.requestCount = (internalData.requestCount || 1) - 1;
    });
    forEach(indicators, function(ic) {
      const internalData = getInternalData(ic);
      if (internalData.requestCount === 0) {
        ic.classList.remove.call(ic.classList, htmx.config.requestClass);
      }
    });
    forEach(disabled, function(disabledElement) {
      const internalData = getInternalData(disabledElement);
      if (internalData.requestCount === 0) {
        disabledElement.removeAttribute("disabled");
        disabledElement.removeAttribute("data-disabled-by-htmx");
      }
    });
  }
  function haveSeenNode(processed, elt) {
    for (let i5 = 0; i5 < processed.length; i5++) {
      const node = processed[i5];
      if (node.isSameNode(elt)) {
        return true;
      }
    }
    return false;
  }
  function shouldInclude(element) {
    const elt = (
      /** @type {HTMLInputElement} */
      element
    );
    if (elt.name === "" || elt.name == null || elt.disabled || closest(elt, "fieldset[disabled]")) {
      return false;
    }
    if (elt.type === "button" || elt.type === "submit" || elt.tagName === "image" || elt.tagName === "reset" || elt.tagName === "file") {
      return false;
    }
    if (elt.type === "checkbox" || elt.type === "radio") {
      return elt.checked;
    }
    return true;
  }
  function addValueToFormData(name, value, formData) {
    if (name != null && value != null) {
      if (Array.isArray(value)) {
        value.forEach(function(v2) {
          formData.append(name, v2);
        });
      } else {
        formData.append(name, value);
      }
    }
  }
  function removeValueFromFormData(name, value, formData) {
    if (name != null && value != null) {
      let values = formData.getAll(name);
      if (Array.isArray(value)) {
        values = values.filter((v2) => value.indexOf(v2) < 0);
      } else {
        values = values.filter((v2) => v2 !== value);
      }
      formData.delete(name);
      forEach(values, (v2) => formData.append(name, v2));
    }
  }
  function getValueFromInput(elt) {
    if (elt instanceof HTMLSelectElement && elt.multiple) {
      return toArray(elt.querySelectorAll("option:checked")).map(function(e5) {
        return (
          /** @type HTMLOptionElement */
          e5.value
        );
      });
    }
    if (elt instanceof HTMLInputElement && elt.files) {
      return toArray(elt.files);
    }
    return elt.value;
  }
  function processInputValue(processed, formData, errors, elt, validate) {
    if (elt == null || haveSeenNode(processed, elt)) {
      return;
    } else {
      processed.push(elt);
    }
    if (shouldInclude(elt)) {
      const name = getRawAttribute(elt, "name");
      addValueToFormData(name, getValueFromInput(elt), formData);
      if (validate) {
        validateElement(elt, errors);
      }
    }
    if (elt instanceof HTMLFormElement) {
      forEach(elt.elements, function(input) {
        if (processed.indexOf(input) >= 0) {
          removeValueFromFormData(input.name, getValueFromInput(input), formData);
        } else {
          processed.push(input);
        }
        if (validate) {
          validateElement(input, errors);
        }
      });
      new FormData(elt).forEach(function(value, name) {
        if (value instanceof File && value.name === "") {
          return;
        }
        addValueToFormData(name, value, formData);
      });
    }
  }
  function validateElement(elt, errors) {
    const element = (
      /** @type {HTMLElement & ElementInternals} */
      elt
    );
    if (element.willValidate) {
      triggerEvent(element, "htmx:validation:validate");
      if (!element.checkValidity()) {
        if (triggerEvent(element, "htmx:validation:failed", {
          message: element.validationMessage,
          validity: element.validity
        }) && !errors.length && htmx.config.reportValidityOfForms) {
          element.reportValidity();
        }
        errors.push({ elt: element, message: element.validationMessage, validity: element.validity });
      }
    }
  }
  function overrideFormData(receiver, donor) {
    for (const key of donor.keys()) {
      receiver.delete(key);
    }
    donor.forEach(function(value, key) {
      receiver.append(key, value);
    });
    return receiver;
  }
  function getInputValues(elt, verb) {
    const processed = [];
    const formData = new FormData();
    const priorityFormData = new FormData();
    const errors = [];
    const internalData = getInternalData(elt);
    if (internalData.lastButtonClicked && !bodyContains(internalData.lastButtonClicked)) {
      internalData.lastButtonClicked = null;
    }
    let validate = elt instanceof HTMLFormElement && elt.noValidate !== true || getAttributeValue(elt, "hx-validate") === "true";
    if (internalData.lastButtonClicked) {
      validate = validate && internalData.lastButtonClicked.formNoValidate !== true;
    }
    if (verb !== "get") {
      processInputValue(processed, priorityFormData, errors, getRelatedForm(elt), validate);
    }
    processInputValue(processed, formData, errors, elt, validate);
    if (internalData.lastButtonClicked || elt.tagName === "BUTTON" || elt.tagName === "INPUT" && getRawAttribute(elt, "type") === "submit") {
      const button = internalData.lastButtonClicked || /** @type HTMLInputElement|HTMLButtonElement */
      elt;
      const name = getRawAttribute(button, "name");
      addValueToFormData(name, button.value, priorityFormData);
    }
    const includes = findAttributeTargets(elt, "hx-include");
    forEach(includes, function(node) {
      processInputValue(processed, formData, errors, asElement(node), validate);
      if (!matches(node, "form")) {
        forEach(asParentNode(node).querySelectorAll(INPUT_SELECTOR), function(descendant) {
          processInputValue(processed, formData, errors, descendant, validate);
        });
      }
    });
    overrideFormData(formData, priorityFormData);
    return { errors, formData, values: formDataProxy(formData) };
  }
  function appendParam(returnStr, name, realValue) {
    if (returnStr !== "") {
      returnStr += "&";
    }
    if (String(realValue) === "[object Object]") {
      realValue = JSON.stringify(realValue);
    }
    const s4 = encodeURIComponent(realValue);
    returnStr += encodeURIComponent(name) + "=" + s4;
    return returnStr;
  }
  function urlEncode(values) {
    values = formDataFromObject(values);
    let returnStr = "";
    values.forEach(function(value, key) {
      returnStr = appendParam(returnStr, key, value);
    });
    return returnStr;
  }
  function getHeaders(elt, target, prompt2) {
    const headers = {
      "HX-Request": "true",
      "HX-Trigger": getRawAttribute(elt, "id"),
      "HX-Trigger-Name": getRawAttribute(elt, "name"),
      "HX-Target": getAttributeValue(target, "id"),
      "HX-Current-URL": location.href
    };
    getValuesForElement(elt, "hx-headers", false, headers);
    if (prompt2 !== void 0) {
      headers["HX-Prompt"] = prompt2;
    }
    if (getInternalData(elt).boosted) {
      headers["HX-Boosted"] = "true";
    }
    return headers;
  }
  function filterValues(inputValues, elt) {
    const paramsValue = getClosestAttributeValue(elt, "hx-params");
    if (paramsValue) {
      if (paramsValue === "none") {
        return new FormData();
      } else if (paramsValue === "*") {
        return inputValues;
      } else if (paramsValue.indexOf("not ") === 0) {
        forEach(paramsValue.slice(4).split(","), function(name) {
          name = name.trim();
          inputValues.delete(name);
        });
        return inputValues;
      } else {
        const newValues = new FormData();
        forEach(paramsValue.split(","), function(name) {
          name = name.trim();
          if (inputValues.has(name)) {
            inputValues.getAll(name).forEach(function(value) {
              newValues.append(name, value);
            });
          }
        });
        return newValues;
      }
    } else {
      return inputValues;
    }
  }
  function isAnchorLink(elt) {
    return !!getRawAttribute(elt, "href") && getRawAttribute(elt, "href").indexOf("#") >= 0;
  }
  function getSwapSpecification(elt, swapInfoOverride) {
    const swapInfo = swapInfoOverride || getClosestAttributeValue(elt, "hx-swap");
    const swapSpec = {
      swapStyle: getInternalData(elt).boosted ? "innerHTML" : htmx.config.defaultSwapStyle,
      swapDelay: htmx.config.defaultSwapDelay,
      settleDelay: htmx.config.defaultSettleDelay
    };
    if (htmx.config.scrollIntoViewOnBoost && getInternalData(elt).boosted && !isAnchorLink(elt)) {
      swapSpec.show = "top";
    }
    if (swapInfo) {
      const split = splitOnWhitespace(swapInfo);
      if (split.length > 0) {
        for (let i5 = 0; i5 < split.length; i5++) {
          const value = split[i5];
          if (value.indexOf("swap:") === 0) {
            swapSpec.swapDelay = parseInterval(value.slice(5));
          } else if (value.indexOf("settle:") === 0) {
            swapSpec.settleDelay = parseInterval(value.slice(7));
          } else if (value.indexOf("transition:") === 0) {
            swapSpec.transition = value.slice(11) === "true";
          } else if (value.indexOf("ignoreTitle:") === 0) {
            swapSpec.ignoreTitle = value.slice(12) === "true";
          } else if (value.indexOf("scroll:") === 0) {
            const scrollSpec = value.slice(7);
            var splitSpec = scrollSpec.split(":");
            const scrollVal = splitSpec.pop();
            var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
            swapSpec.scroll = scrollVal;
            swapSpec.scrollTarget = selectorVal;
          } else if (value.indexOf("show:") === 0) {
            const showSpec = value.slice(5);
            var splitSpec = showSpec.split(":");
            const showVal = splitSpec.pop();
            var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
            swapSpec.show = showVal;
            swapSpec.showTarget = selectorVal;
          } else if (value.indexOf("focus-scroll:") === 0) {
            const focusScrollVal = value.slice("focus-scroll:".length);
            swapSpec.focusScroll = focusScrollVal == "true";
          } else if (i5 == 0) {
            swapSpec.swapStyle = value;
          } else {
            logError("Unknown modifier in hx-swap: " + value);
          }
        }
      }
    }
    return swapSpec;
  }
  function usesFormData(elt) {
    return getClosestAttributeValue(elt, "hx-encoding") === "multipart/form-data" || matches(elt, "form") && getRawAttribute(elt, "enctype") === "multipart/form-data";
  }
  function encodeParamsForBody(xhr, elt, filteredParameters) {
    let encodedParameters = null;
    withExtensions(elt, function(extension) {
      if (encodedParameters == null) {
        encodedParameters = extension.encodeParameters(xhr, filteredParameters, elt);
      }
    });
    if (encodedParameters != null) {
      return encodedParameters;
    } else {
      if (usesFormData(elt)) {
        return overrideFormData(new FormData(), formDataFromObject(filteredParameters));
      } else {
        return urlEncode(filteredParameters);
      }
    }
  }
  function makeSettleInfo(target) {
    return { tasks: [], elts: [target] };
  }
  function updateScrollState(content, swapSpec) {
    const first = content[0];
    const last = content[content.length - 1];
    if (swapSpec.scroll) {
      var target = null;
      if (swapSpec.scrollTarget) {
        target = asElement(querySelectorExt(first, swapSpec.scrollTarget));
      }
      if (swapSpec.scroll === "top" && (first || target)) {
        target = target || first;
        target.scrollTop = 0;
      }
      if (swapSpec.scroll === "bottom" && (last || target)) {
        target = target || last;
        target.scrollTop = target.scrollHeight;
      }
      if (typeof swapSpec.scroll === "number") {
        getWindow().setTimeout(function() {
          window.scrollTo(
            0,
            /** @type number */
            swapSpec.scroll
          );
        }, 0);
      }
    }
    if (swapSpec.show) {
      var target = null;
      if (swapSpec.showTarget) {
        let targetStr = swapSpec.showTarget;
        if (swapSpec.showTarget === "window") {
          targetStr = "body";
        }
        target = asElement(querySelectorExt(first, targetStr));
      }
      if (swapSpec.show === "top" && (first || target)) {
        target = target || first;
        target.scrollIntoView({ block: "start", behavior: htmx.config.scrollBehavior });
      }
      if (swapSpec.show === "bottom" && (last || target)) {
        target = target || last;
        target.scrollIntoView({ block: "end", behavior: htmx.config.scrollBehavior });
      }
    }
  }
  function getValuesForElement(elt, attr, evalAsDefault, values, event) {
    if (values == null) {
      values = {};
    }
    if (elt == null) {
      return values;
    }
    const attributeValue = getAttributeValue(elt, attr);
    if (attributeValue) {
      let str2 = attributeValue.trim();
      let evaluateValue = evalAsDefault;
      if (str2 === "unset") {
        return null;
      }
      if (str2.indexOf("javascript:") === 0) {
        str2 = str2.slice(11);
        evaluateValue = true;
      } else if (str2.indexOf("js:") === 0) {
        str2 = str2.slice(3);
        evaluateValue = true;
      }
      if (str2.indexOf("{") !== 0) {
        str2 = "{" + str2 + "}";
      }
      let varsValues;
      if (evaluateValue) {
        varsValues = maybeEval(elt, function() {
          if (event) {
            return Function("event", "return (" + str2 + ")").call(elt, event);
          } else {
            return Function("return (" + str2 + ")").call(elt);
          }
        }, {});
      } else {
        varsValues = parseJSON(str2);
      }
      for (const key in varsValues) {
        if (varsValues.hasOwnProperty(key)) {
          if (values[key] == null) {
            values[key] = varsValues[key];
          }
        }
      }
    }
    return getValuesForElement(asElement(parentElt(elt)), attr, evalAsDefault, values, event);
  }
  function maybeEval(elt, toEval, defaultVal) {
    if (htmx.config.allowEval) {
      return toEval();
    } else {
      triggerErrorEvent(elt, "htmx:evalDisallowedError");
      return defaultVal;
    }
  }
  function getHXVarsForElement(elt, event, expressionVars) {
    return getValuesForElement(elt, "hx-vars", true, expressionVars, event);
  }
  function getHXValsForElement(elt, event, expressionVars) {
    return getValuesForElement(elt, "hx-vals", false, expressionVars, event);
  }
  function getExpressionVars(elt, event) {
    return mergeObjects(getHXVarsForElement(elt, event), getHXValsForElement(elt, event));
  }
  function safelySetHeaderValue(xhr, header, headerValue) {
    if (headerValue !== null) {
      try {
        xhr.setRequestHeader(header, headerValue);
      } catch (e5) {
        xhr.setRequestHeader(header, encodeURIComponent(headerValue));
        xhr.setRequestHeader(header + "-URI-AutoEncoded", "true");
      }
    }
  }
  function getPathFromResponse(xhr) {
    if (xhr.responseURL) {
      try {
        const url = new URL(xhr.responseURL);
        return url.pathname + url.search;
      } catch (e5) {
        triggerErrorEvent(getDocument().body, "htmx:badResponseUrl", { url: xhr.responseURL });
      }
    }
  }
  function hasHeader(xhr, regexp) {
    return regexp.test(xhr.getAllResponseHeaders());
  }
  function ajaxHelper(verb, path, context) {
    verb = /** @type HttpVerb */
    verb.toLowerCase();
    if (context) {
      if (context instanceof Element || typeof context === "string") {
        return issueAjaxRequest(verb, path, null, null, {
          targetOverride: resolveTarget(context) || DUMMY_ELT,
          returnPromise: true
        });
      } else {
        let resolvedTarget = resolveTarget(context.target);
        if (context.target && !resolvedTarget || context.source && !resolvedTarget && !resolveTarget(context.source)) {
          resolvedTarget = DUMMY_ELT;
        }
        return issueAjaxRequest(
          verb,
          path,
          resolveTarget(context.source),
          context.event,
          {
            handler: context.handler,
            headers: context.headers,
            values: context.values,
            targetOverride: resolvedTarget,
            swapOverride: context.swap,
            select: context.select,
            returnPromise: true,
            push: context.push,
            replace: context.replace,
            selectOOB: context.selectOOB
          }
        );
      }
    } else {
      return issueAjaxRequest(verb, path, null, null, {
        returnPromise: true
      });
    }
  }
  function hierarchyForElt(elt) {
    const arr = [];
    while (elt) {
      arr.push(elt);
      elt = elt.parentElement;
    }
    return arr;
  }
  function verifyPath(elt, path, requestConfig) {
    const url = new URL(path, location.protocol !== "about:" ? location.href : window.origin);
    const origin = location.protocol !== "about:" ? location.origin : window.origin;
    const sameHost = origin === url.origin;
    if (htmx.config.selfRequestsOnly) {
      if (!sameHost) {
        return false;
      }
    }
    return triggerEvent(elt, "htmx:validateUrl", mergeObjects({ url, sameHost }, requestConfig));
  }
  function formDataFromObject(obj) {
    if (obj instanceof FormData) return obj;
    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key].forEach === "function") {
          obj[key].forEach(function(v2) {
            formData.append(key, v2);
          });
        } else if (typeof obj[key] === "object" && !(obj[key] instanceof Blob)) {
          formData.append(key, JSON.stringify(obj[key]));
        } else {
          formData.append(key, obj[key]);
        }
      }
    }
    return formData;
  }
  function formDataArrayProxy(formData, name, array) {
    return new Proxy(array, {
      get: function(target, key) {
        if (typeof key === "number") return target[key];
        if (key === "length") return target.length;
        if (key === "push") {
          return function(value) {
            target.push(value);
            formData.append(name, value);
          };
        }
        if (typeof target[key] === "function") {
          return function() {
            target[key].apply(target, arguments);
            formData.delete(name);
            target.forEach(function(v2) {
              formData.append(name, v2);
            });
          };
        }
        if (target[key] && target[key].length === 1) {
          return target[key][0];
        } else {
          return target[key];
        }
      },
      set: function(target, index, value) {
        target[index] = value;
        formData.delete(name);
        target.forEach(function(v2) {
          formData.append(name, v2);
        });
        return true;
      }
    });
  }
  function formDataProxy(formData) {
    return new Proxy(formData, {
      get: function(target, name) {
        if (typeof name === "symbol") {
          const result = Reflect.get(target, name);
          if (typeof result === "function") {
            return function() {
              return result.apply(formData, arguments);
            };
          } else {
            return result;
          }
        }
        if (name === "toJSON") {
          return () => Object.fromEntries(formData);
        }
        if (name in target) {
          if (typeof target[name] === "function") {
            return function() {
              return formData[name].apply(formData, arguments);
            };
          }
        }
        const array = formData.getAll(name);
        if (array.length === 0) {
          return void 0;
        } else if (array.length === 1) {
          return array[0];
        } else {
          return formDataArrayProxy(target, name, array);
        }
      },
      set: function(target, name, value) {
        if (typeof name !== "string") {
          return false;
        }
        target.delete(name);
        if (value && typeof value.forEach === "function") {
          value.forEach(function(v2) {
            target.append(name, v2);
          });
        } else if (typeof value === "object" && !(value instanceof Blob)) {
          target.append(name, JSON.stringify(value));
        } else {
          target.append(name, value);
        }
        return true;
      },
      deleteProperty: function(target, name) {
        if (typeof name === "string") {
          target.delete(name);
        }
        return true;
      },
      // Support Object.assign call from proxy
      ownKeys: function(target) {
        return Reflect.ownKeys(Object.fromEntries(target));
      },
      getOwnPropertyDescriptor: function(target, prop) {
        return Reflect.getOwnPropertyDescriptor(Object.fromEntries(target), prop);
      }
    });
  }
  function issueAjaxRequest(verb, path, elt, event, etc, confirmed) {
    let resolve = null;
    let reject = null;
    etc = etc != null ? etc : {};
    if (etc.returnPromise && typeof Promise !== "undefined") {
      var promise = new Promise(function(_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
      });
    }
    if (elt == null) {
      elt = getDocument().body;
    }
    const responseHandler = etc.handler || handleAjaxResponse;
    const select = etc.select || null;
    if (!bodyContains(elt)) {
      maybeCall(resolve);
      return promise;
    }
    const target = etc.targetOverride || asElement(getTarget(elt));
    if (target == null || target == DUMMY_ELT) {
      triggerErrorEvent(elt, "htmx:targetError", { target: getClosestAttributeValue(elt, "hx-target") });
      maybeCall(reject);
      return promise;
    }
    let eltData = getInternalData(elt);
    const submitter = eltData.lastButtonClicked;
    if (submitter) {
      const buttonPath = getRawAttribute(submitter, "formaction");
      if (buttonPath != null) {
        path = buttonPath;
      }
      const buttonVerb = getRawAttribute(submitter, "formmethod");
      if (buttonVerb != null) {
        if (VERBS.includes(buttonVerb.toLowerCase())) {
          verb = /** @type HttpVerb */
          buttonVerb;
        } else {
          maybeCall(resolve);
          return promise;
        }
      }
    }
    const confirmQuestion = getClosestAttributeValue(elt, "hx-confirm");
    if (confirmed === void 0) {
      const issueRequest = function(skipConfirmation) {
        return issueAjaxRequest(verb, path, elt, event, etc, !!skipConfirmation);
      };
      const confirmDetails = { target, elt, path, verb, triggeringEvent: event, etc, issueRequest, question: confirmQuestion };
      if (triggerEvent(elt, "htmx:confirm", confirmDetails) === false) {
        maybeCall(resolve);
        return promise;
      }
    }
    let syncElt = elt;
    let syncStrategy = getClosestAttributeValue(elt, "hx-sync");
    let queueStrategy = null;
    let abortable = false;
    if (syncStrategy) {
      const syncStrings = syncStrategy.split(":");
      const selector = syncStrings[0].trim();
      if (selector === "this") {
        syncElt = findThisElement(elt, "hx-sync");
      } else {
        syncElt = asElement(querySelectorExt(elt, selector));
      }
      syncStrategy = (syncStrings[1] || "drop").trim();
      eltData = getInternalData(syncElt);
      if (syncStrategy === "drop" && eltData.xhr && eltData.abortable !== true) {
        maybeCall(resolve);
        return promise;
      } else if (syncStrategy === "abort") {
        if (eltData.xhr) {
          maybeCall(resolve);
          return promise;
        } else {
          abortable = true;
        }
      } else if (syncStrategy === "replace") {
        triggerEvent(syncElt, "htmx:abort");
      } else if (syncStrategy.indexOf("queue") === 0) {
        const queueStrArray = syncStrategy.split(" ");
        queueStrategy = (queueStrArray[1] || "last").trim();
      }
    }
    if (eltData.xhr) {
      if (eltData.abortable) {
        triggerEvent(syncElt, "htmx:abort");
      } else {
        if (queueStrategy == null) {
          if (event) {
            const eventData = getInternalData(event);
            if (eventData && eventData.triggerSpec && eventData.triggerSpec.queue) {
              queueStrategy = eventData.triggerSpec.queue;
            }
          }
          if (queueStrategy == null) {
            queueStrategy = "last";
          }
        }
        if (eltData.queuedRequests == null) {
          eltData.queuedRequests = [];
        }
        if (queueStrategy === "first" && eltData.queuedRequests.length === 0) {
          eltData.queuedRequests.push(function() {
            issueAjaxRequest(verb, path, elt, event, etc);
          });
        } else if (queueStrategy === "all") {
          eltData.queuedRequests.push(function() {
            issueAjaxRequest(verb, path, elt, event, etc);
          });
        } else if (queueStrategy === "last") {
          eltData.queuedRequests = [];
          eltData.queuedRequests.push(function() {
            issueAjaxRequest(verb, path, elt, event, etc);
          });
        }
        maybeCall(resolve);
        return promise;
      }
    }
    const xhr = new XMLHttpRequest();
    eltData.xhr = xhr;
    eltData.abortable = abortable;
    const endRequestLock = function() {
      eltData.xhr = null;
      eltData.abortable = false;
      if (eltData.queuedRequests != null && eltData.queuedRequests.length > 0) {
        const queuedRequest = eltData.queuedRequests.shift();
        queuedRequest();
      }
    };
    const promptQuestion = getClosestAttributeValue(elt, "hx-prompt");
    if (promptQuestion) {
      var promptResponse = prompt(promptQuestion);
      if (promptResponse === null || !triggerEvent(elt, "htmx:prompt", { prompt: promptResponse, target })) {
        maybeCall(resolve);
        endRequestLock();
        return promise;
      }
    }
    if (confirmQuestion && !confirmed) {
      if (!confirm(confirmQuestion)) {
        maybeCall(resolve);
        endRequestLock();
        return promise;
      }
    }
    let headers = getHeaders(elt, target, promptResponse);
    if (verb !== "get" && !usesFormData(elt)) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (etc.headers) {
      headers = mergeObjects(headers, etc.headers);
    }
    const results = getInputValues(elt, verb);
    let errors = results.errors;
    const rawFormData = results.formData;
    if (etc.values) {
      overrideFormData(rawFormData, formDataFromObject(etc.values));
    }
    const expressionVars = formDataFromObject(getExpressionVars(elt, event));
    const allFormData = overrideFormData(rawFormData, expressionVars);
    let filteredFormData = filterValues(allFormData, elt);
    if (htmx.config.getCacheBusterParam && verb === "get") {
      filteredFormData.set("org.htmx.cache-buster", getRawAttribute(target, "id") || "true");
    }
    if (path == null || path === "") {
      path = location.href;
    }
    const requestAttrValues = getValuesForElement(elt, "hx-request");
    const eltIsBoosted = getInternalData(elt).boosted;
    let useUrlParams = htmx.config.methodsThatUseUrlParams.indexOf(verb) >= 0;
    const requestConfig = {
      boosted: eltIsBoosted,
      useUrlParams,
      formData: filteredFormData,
      parameters: formDataProxy(filteredFormData),
      unfilteredFormData: allFormData,
      unfilteredParameters: formDataProxy(allFormData),
      headers,
      elt,
      target,
      verb,
      errors,
      withCredentials: etc.credentials || requestAttrValues.credentials || htmx.config.withCredentials,
      timeout: etc.timeout || requestAttrValues.timeout || htmx.config.timeout,
      path,
      triggeringEvent: event
    };
    if (!triggerEvent(elt, "htmx:configRequest", requestConfig)) {
      maybeCall(resolve);
      endRequestLock();
      return promise;
    }
    path = requestConfig.path;
    verb = requestConfig.verb;
    headers = requestConfig.headers;
    filteredFormData = formDataFromObject(requestConfig.parameters);
    errors = requestConfig.errors;
    useUrlParams = requestConfig.useUrlParams;
    if (errors && errors.length > 0) {
      triggerEvent(elt, "htmx:validation:halted", requestConfig);
      maybeCall(resolve);
      endRequestLock();
      return promise;
    }
    const splitPath = path.split("#");
    const pathNoAnchor = splitPath[0];
    const anchor = splitPath[1];
    let finalPath = path;
    if (useUrlParams) {
      finalPath = pathNoAnchor;
      const hasValues = !filteredFormData.keys().next().done;
      if (hasValues) {
        if (finalPath.indexOf("?") < 0) {
          finalPath += "?";
        } else {
          finalPath += "&";
        }
        finalPath += urlEncode(filteredFormData);
        if (anchor) {
          finalPath += "#" + anchor;
        }
      }
    }
    if (!verifyPath(elt, finalPath, requestConfig)) {
      triggerErrorEvent(elt, "htmx:invalidPath", requestConfig);
      maybeCall(reject);
      endRequestLock();
      return promise;
    }
    xhr.open(verb.toUpperCase(), finalPath, true);
    xhr.overrideMimeType("text/html");
    xhr.withCredentials = requestConfig.withCredentials;
    xhr.timeout = requestConfig.timeout;
    if (requestAttrValues.noHeaders) {
    } else {
      for (const header in headers) {
        if (headers.hasOwnProperty(header)) {
          const headerValue = headers[header];
          safelySetHeaderValue(xhr, header, headerValue);
        }
      }
    }
    const responseInfo = {
      xhr,
      target,
      requestConfig,
      etc,
      boosted: eltIsBoosted,
      select,
      pathInfo: {
        requestPath: path,
        finalRequestPath: finalPath,
        responsePath: null,
        anchor
      }
    };
    xhr.onload = function() {
      try {
        const hierarchy = hierarchyForElt(elt);
        responseInfo.pathInfo.responsePath = getPathFromResponse(xhr);
        responseHandler(elt, responseInfo);
        if (responseInfo.keepIndicators !== true) {
          removeRequestIndicators(indicators, disableElts);
        }
        triggerEvent(elt, "htmx:afterRequest", responseInfo);
        triggerEvent(elt, "htmx:afterOnLoad", responseInfo);
        if (!bodyContains(elt)) {
          let secondaryTriggerElt = null;
          while (hierarchy.length > 0 && secondaryTriggerElt == null) {
            const parentEltInHierarchy = hierarchy.shift();
            if (bodyContains(parentEltInHierarchy)) {
              secondaryTriggerElt = parentEltInHierarchy;
            }
          }
          if (secondaryTriggerElt) {
            triggerEvent(secondaryTriggerElt, "htmx:afterRequest", responseInfo);
            triggerEvent(secondaryTriggerElt, "htmx:afterOnLoad", responseInfo);
          }
        }
        maybeCall(resolve);
      } catch (e5) {
        triggerErrorEvent(elt, "htmx:onLoadError", mergeObjects({ error: e5 }, responseInfo));
        throw e5;
      } finally {
        endRequestLock();
      }
    };
    xhr.onerror = function() {
      removeRequestIndicators(indicators, disableElts);
      triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
      triggerErrorEvent(elt, "htmx:sendError", responseInfo);
      maybeCall(reject);
      endRequestLock();
    };
    xhr.onabort = function() {
      removeRequestIndicators(indicators, disableElts);
      triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
      triggerErrorEvent(elt, "htmx:sendAbort", responseInfo);
      maybeCall(reject);
      endRequestLock();
    };
    xhr.ontimeout = function() {
      removeRequestIndicators(indicators, disableElts);
      triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
      triggerErrorEvent(elt, "htmx:timeout", responseInfo);
      maybeCall(reject);
      endRequestLock();
    };
    if (!triggerEvent(elt, "htmx:beforeRequest", responseInfo)) {
      maybeCall(resolve);
      endRequestLock();
      return promise;
    }
    var indicators = addRequestIndicatorClasses(elt);
    var disableElts = disableElements(elt);
    forEach(["loadstart", "loadend", "progress", "abort"], function(eventName) {
      forEach([xhr, xhr.upload], function(target2) {
        target2.addEventListener(eventName, function(event2) {
          triggerEvent(elt, "htmx:xhr:" + eventName, {
            lengthComputable: event2.lengthComputable,
            loaded: event2.loaded,
            total: event2.total
          });
        });
      });
    });
    triggerEvent(elt, "htmx:beforeSend", responseInfo);
    const params = useUrlParams ? null : encodeParamsForBody(xhr, elt, filteredFormData);
    xhr.send(params);
    return promise;
  }
  function determineHistoryUpdates(elt, responseInfo) {
    const xhr = responseInfo.xhr;
    let pathFromHeaders = null;
    let typeFromHeaders = null;
    if (hasHeader(xhr, /HX-Push:/i)) {
      pathFromHeaders = xhr.getResponseHeader("HX-Push");
      typeFromHeaders = "push";
    } else if (hasHeader(xhr, /HX-Push-Url:/i)) {
      pathFromHeaders = xhr.getResponseHeader("HX-Push-Url");
      typeFromHeaders = "push";
    } else if (hasHeader(xhr, /HX-Replace-Url:/i)) {
      pathFromHeaders = xhr.getResponseHeader("HX-Replace-Url");
      typeFromHeaders = "replace";
    }
    if (pathFromHeaders) {
      if (pathFromHeaders === "false") {
        return {};
      } else {
        return {
          type: typeFromHeaders,
          path: pathFromHeaders
        };
      }
    }
    const requestPath = responseInfo.pathInfo.finalRequestPath;
    const responsePath = responseInfo.pathInfo.responsePath;
    const pushUrl = responseInfo.etc.push || getClosestAttributeValue(elt, "hx-push-url");
    const replaceUrl = responseInfo.etc.replace || getClosestAttributeValue(elt, "hx-replace-url");
    const elementIsBoosted = getInternalData(elt).boosted;
    let saveType = null;
    let path = null;
    if (pushUrl) {
      saveType = "push";
      path = pushUrl;
    } else if (replaceUrl) {
      saveType = "replace";
      path = replaceUrl;
    } else if (elementIsBoosted) {
      saveType = "push";
      path = responsePath || requestPath;
    }
    if (path) {
      if (path === "false") {
        return {};
      }
      if (path === "true") {
        path = responsePath || requestPath;
      }
      if (responseInfo.pathInfo.anchor && path.indexOf("#") === -1) {
        path = path + "#" + responseInfo.pathInfo.anchor;
      }
      return {
        type: saveType,
        path
      };
    } else {
      return {};
    }
  }
  function codeMatches(responseHandlingConfig, status) {
    var regExp = new RegExp(responseHandlingConfig.code);
    return regExp.test(status.toString(10));
  }
  function resolveResponseHandling(xhr) {
    for (var i5 = 0; i5 < htmx.config.responseHandling.length; i5++) {
      var responseHandlingElement = htmx.config.responseHandling[i5];
      if (codeMatches(responseHandlingElement, xhr.status)) {
        return responseHandlingElement;
      }
    }
    return {
      swap: false
    };
  }
  function handleTitle(title) {
    if (title) {
      const titleElt = find("title");
      if (titleElt) {
        titleElt.textContent = title;
      } else {
        window.document.title = title;
      }
    }
  }
  function resolveRetarget(elt, target) {
    if (target === "this") {
      return elt;
    }
    const resolvedTarget = asElement(querySelectorExt(elt, target));
    if (resolvedTarget == null) {
      triggerErrorEvent(elt, "htmx:targetError", { target });
      throw new Error(`Invalid re-target ${target}`);
    }
    return resolvedTarget;
  }
  function handleAjaxResponse(elt, responseInfo) {
    const xhr = responseInfo.xhr;
    let target = responseInfo.target;
    const etc = responseInfo.etc;
    const responseInfoSelect = responseInfo.select;
    if (!triggerEvent(elt, "htmx:beforeOnLoad", responseInfo)) return;
    if (hasHeader(xhr, /HX-Trigger:/i)) {
      handleTriggerHeader(xhr, "HX-Trigger", elt);
    }
    if (hasHeader(xhr, /HX-Location:/i)) {
      let redirectPath = xhr.getResponseHeader("HX-Location");
      var redirectSwapSpec = {};
      if (redirectPath.indexOf("{") === 0) {
        redirectSwapSpec = parseJSON(redirectPath);
        redirectPath = redirectSwapSpec.path;
        delete redirectSwapSpec.path;
      }
      redirectSwapSpec.push = redirectSwapSpec.push || "true";
      ajaxHelper("get", redirectPath, redirectSwapSpec);
      return;
    }
    const shouldRefresh = hasHeader(xhr, /HX-Refresh:/i) && xhr.getResponseHeader("HX-Refresh") === "true";
    if (hasHeader(xhr, /HX-Redirect:/i)) {
      responseInfo.keepIndicators = true;
      htmx.location.href = xhr.getResponseHeader("HX-Redirect");
      shouldRefresh && htmx.location.reload();
      return;
    }
    if (shouldRefresh) {
      responseInfo.keepIndicators = true;
      htmx.location.reload();
      return;
    }
    const historyUpdate = determineHistoryUpdates(elt, responseInfo);
    const responseHandling = resolveResponseHandling(xhr);
    const shouldSwap = responseHandling.swap;
    let isError = !!responseHandling.error;
    let ignoreTitle = htmx.config.ignoreTitle || responseHandling.ignoreTitle;
    let selectOverride = responseHandling.select;
    if (responseHandling.target) {
      responseInfo.target = resolveRetarget(elt, responseHandling.target);
    }
    var swapOverride = etc.swapOverride;
    if (swapOverride == null && responseHandling.swapOverride) {
      swapOverride = responseHandling.swapOverride;
    }
    if (hasHeader(xhr, /HX-Retarget:/i)) {
      responseInfo.target = resolveRetarget(elt, xhr.getResponseHeader("HX-Retarget"));
    }
    if (hasHeader(xhr, /HX-Reswap:/i)) {
      swapOverride = xhr.getResponseHeader("HX-Reswap");
    }
    var serverResponse = xhr.response;
    var beforeSwapDetails = mergeObjects({
      shouldSwap,
      serverResponse,
      isError,
      ignoreTitle,
      selectOverride,
      swapOverride
    }, responseInfo);
    if (responseHandling.event && !triggerEvent(target, responseHandling.event, beforeSwapDetails)) return;
    if (!triggerEvent(target, "htmx:beforeSwap", beforeSwapDetails)) return;
    target = beforeSwapDetails.target;
    serverResponse = beforeSwapDetails.serverResponse;
    isError = beforeSwapDetails.isError;
    ignoreTitle = beforeSwapDetails.ignoreTitle;
    selectOverride = beforeSwapDetails.selectOverride;
    swapOverride = beforeSwapDetails.swapOverride;
    responseInfo.target = target;
    responseInfo.failed = isError;
    responseInfo.successful = !isError;
    if (beforeSwapDetails.shouldSwap) {
      if (xhr.status === 286) {
        cancelPolling(elt);
      }
      withExtensions(elt, function(extension) {
        serverResponse = extension.transformResponse(serverResponse, xhr, elt);
      });
      if (historyUpdate.type) {
        saveCurrentPageToHistory();
      }
      var swapSpec = getSwapSpecification(elt, swapOverride);
      if (!swapSpec.hasOwnProperty("ignoreTitle")) {
        swapSpec.ignoreTitle = ignoreTitle;
      }
      target.classList.add(htmx.config.swappingClass);
      if (responseInfoSelect) {
        selectOverride = responseInfoSelect;
      }
      if (hasHeader(xhr, /HX-Reselect:/i)) {
        selectOverride = xhr.getResponseHeader("HX-Reselect");
      }
      const selectOOB = etc.selectOOB || getClosestAttributeValue(elt, "hx-select-oob");
      const select = getClosestAttributeValue(elt, "hx-select");
      swap(target, serverResponse, swapSpec, {
        select: selectOverride === "unset" ? null : selectOverride || select,
        selectOOB,
        eventInfo: responseInfo,
        anchor: responseInfo.pathInfo.anchor,
        contextElement: elt,
        afterSwapCallback: function() {
          if (hasHeader(xhr, /HX-Trigger-After-Swap:/i)) {
            let finalElt = elt;
            if (!bodyContains(elt)) {
              finalElt = getDocument().body;
            }
            handleTriggerHeader(xhr, "HX-Trigger-After-Swap", finalElt);
          }
        },
        afterSettleCallback: function() {
          if (hasHeader(xhr, /HX-Trigger-After-Settle:/i)) {
            let finalElt = elt;
            if (!bodyContains(elt)) {
              finalElt = getDocument().body;
            }
            handleTriggerHeader(xhr, "HX-Trigger-After-Settle", finalElt);
          }
        },
        beforeSwapCallback: function() {
          if (historyUpdate.type) {
            triggerEvent(getDocument().body, "htmx:beforeHistoryUpdate", mergeObjects({ history: historyUpdate }, responseInfo));
            if (historyUpdate.type === "push") {
              pushUrlIntoHistory(historyUpdate.path);
              triggerEvent(getDocument().body, "htmx:pushedIntoHistory", { path: historyUpdate.path });
            } else {
              replaceUrlInHistory(historyUpdate.path);
              triggerEvent(getDocument().body, "htmx:replacedInHistory", { path: historyUpdate.path });
            }
          }
        }
      });
    }
    if (isError) {
      triggerErrorEvent(elt, "htmx:responseError", mergeObjects({ error: "Response Status Error Code " + xhr.status + " from " + responseInfo.pathInfo.requestPath }, responseInfo));
    }
  }
  const extensions = {};
  function extensionBase() {
    return {
      init: function(api) {
        return null;
      },
      getSelectors: function() {
        return null;
      },
      onEvent: function(name, evt) {
        return true;
      },
      transformResponse: function(text, xhr, elt) {
        return text;
      },
      isInlineSwap: function(swapStyle) {
        return false;
      },
      handleSwap: function(swapStyle, target, fragment, settleInfo) {
        return false;
      },
      encodeParameters: function(xhr, parameters, elt) {
        return null;
      }
    };
  }
  function defineExtension(name, extension) {
    if (extension.init) {
      extension.init(internalAPI);
    }
    extensions[name] = mergeObjects(extensionBase(), extension);
  }
  function removeExtension(name) {
    delete extensions[name];
  }
  function getExtensions(elt, extensionsToReturn, extensionsToIgnore) {
    if (extensionsToReturn == void 0) {
      extensionsToReturn = [];
    }
    if (elt == void 0) {
      return extensionsToReturn;
    }
    if (extensionsToIgnore == void 0) {
      extensionsToIgnore = [];
    }
    const extensionsForElement = getAttributeValue(elt, "hx-ext");
    if (extensionsForElement) {
      forEach(extensionsForElement.split(","), function(extensionName) {
        extensionName = extensionName.replace(/ /g, "");
        if (extensionName.slice(0, 7) == "ignore:") {
          extensionsToIgnore.push(extensionName.slice(7));
          return;
        }
        if (extensionsToIgnore.indexOf(extensionName) < 0) {
          const extension = extensions[extensionName];
          if (extension && extensionsToReturn.indexOf(extension) < 0) {
            extensionsToReturn.push(extension);
          }
        }
      });
    }
    return getExtensions(asElement(parentElt(elt)), extensionsToReturn, extensionsToIgnore);
  }
  var isReady = false;
  getDocument().addEventListener("DOMContentLoaded", function() {
    isReady = true;
  });
  function ready(fn) {
    if (isReady || getDocument().readyState === "complete") {
      fn();
    } else {
      getDocument().addEventListener("DOMContentLoaded", fn);
    }
  }
  function insertIndicatorStyles() {
    if (htmx.config.includeIndicatorStyles !== false) {
      const nonceAttribute = htmx.config.inlineStyleNonce ? ` nonce="${htmx.config.inlineStyleNonce}"` : "";
      const indicator = htmx.config.indicatorClass;
      const request = htmx.config.requestClass;
      getDocument().head.insertAdjacentHTML(
        "beforeend",
        `<style${nonceAttribute}>.${indicator}{opacity:0;visibility: hidden} .${request} .${indicator}, .${request}.${indicator}{opacity:1;visibility: visible;transition: opacity 200ms ease-in}</style>`
      );
    }
  }
  function getMetaConfig() {
    const element = getDocument().querySelector('meta[name="htmx-config"]');
    if (element) {
      return parseJSON(element.content);
    } else {
      return null;
    }
  }
  function mergeMetaConfig() {
    const metaConfig = getMetaConfig();
    if (metaConfig) {
      htmx.config = mergeObjects(htmx.config, metaConfig);
    }
  }
  ready(function() {
    mergeMetaConfig();
    insertIndicatorStyles();
    let body = getDocument().body;
    processNode(body);
    const restoredElts = getDocument().querySelectorAll(
      "[hx-trigger='restored'],[data-hx-trigger='restored']"
    );
    body.addEventListener("htmx:abort", function(evt) {
      const target = (
        /** @type {CustomEvent} */
        evt.detail.elt || evt.target
      );
      const internalData = getInternalData(target);
      if (internalData && internalData.xhr) {
        internalData.xhr.abort();
      }
    });
    const originalPopstate = window.onpopstate ? window.onpopstate.bind(window) : null;
    window.onpopstate = function(event) {
      if (event.state && event.state.htmx) {
        restoreHistory();
        forEach(restoredElts, function(elt) {
          triggerEvent(elt, "htmx:restored", {
            document: getDocument(),
            triggerEvent
          });
        });
      } else {
        if (originalPopstate) {
          originalPopstate(event);
        }
      }
    };
    getWindow().setTimeout(function() {
      triggerEvent(body, "htmx:load", {});
      body = null;
    }, 0);
  });
  return htmx;
})();
var htmx_esm_default = htmx2;

// web/codesearch_ui.tsx
var import_jquery3 = __toESM(require_jquery());

// ../../node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e5, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e5;
  }
  get styleSheet() {
    let t4 = this.o;
    const s4 = this.t;
    if (e && void 0 === t4) {
      const e5 = void 0 !== s4 && 1 === s4.length;
      e5 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s4, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var S = (s4, o6) => {
  if (e) s4.adoptedStyleSheets = o6.map(((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet));
  else for (const e5 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e5.cssText, s4.appendChild(o7);
  }
};
var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e5 = "";
  for (const s4 of t5.cssRules) e5 += s4.cssText;
  return r(e5);
})(t4) : t4;

// ../../node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t4, s4) => t4;
var u = { toAttribute(t4, s4) {
  switch (s4) {
    case Boolean:
      t4 = t4 ? l : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, s4) {
  let i5 = t4;
  switch (s4) {
    case Boolean:
      i5 = null !== t4;
      break;
    case Number:
      i5 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t4);
      } catch (t5) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t4, s4) => !i2(t4, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t4) {
    this._$Ei(), (this.l ??= []).push(t4);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t4, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
      const i5 = Symbol(), h3 = this.getPropertyDescriptor(t4, i5, s4);
      void 0 !== h3 && e2(this.prototype, t4, h3);
    }
  }
  static getPropertyDescriptor(t4, s4, i5) {
    const { get: e5, set: r5 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e5, set(s5) {
      const h3 = e5?.call(this);
      r5?.call(this, s5), this.requestUpdate(t4, h3, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t4 = n2(this);
    t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
      for (const i5 of s4) this.createProperty(i5, t5[i5]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4) for (const [t5, i5] of s4) this.elementProperties.set(t5, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i5 = this._$Eu(t5, s4);
      void 0 !== i5 && this._$Eh.set(i5, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i5 = [];
    if (Array.isArray(s4)) {
      const e5 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e5) i5.unshift(c(s5));
    } else void 0 !== s4 && i5.push(c(s4));
    return i5;
  }
  static _$Eu(t4, s4) {
    const i5 = s4.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t4) => this.enableUpdating = t4)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t4) => t4(this)));
  }
  addController(t4) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
  }
  removeController(t4) {
    this._$EO?.delete(t4);
  }
  _$E_() {
    const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t4.set(i5, this[i5]), delete this[i5]);
    t4.size > 0 && (this._$Ep = t4);
  }
  createRenderRoot() {
    const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t4, this.constructor.elementStyles), t4;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach(((t4) => t4.hostConnected?.()));
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t4) => t4.hostDisconnected?.()));
  }
  attributeChangedCallback(t4, s4, i5) {
    this._$AK(t4, i5);
  }
  _$ET(t4, s4) {
    const i5 = this.constructor.elementProperties.get(t4), e5 = this.constructor._$Eu(t4, i5);
    if (void 0 !== e5 && true === i5.reflect) {
      const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e5) : this.setAttribute(e5, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i5 = this.constructor, e5 = i5._$Eh.get(t4);
    if (void 0 !== e5 && this._$Em !== e5) {
      const t5 = i5.getPropertyOptions(e5), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e5;
      const r5 = h3.fromAttribute(s4, t5.type);
      this[e5] = r5 ?? this._$Ej?.get(e5) ?? r5, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i5) {
    if (void 0 !== t4) {
      const e5 = this.constructor, h3 = this[t4];
      if (i5 ??= e5.getPropertyOptions(t4), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(e5._$Eu(t4, i5)))) return;
      this.C(t4, s4, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i5, reflect: e5, wrapped: h3 }, r5) {
    i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t4) && (this._$Ej.set(t4, r5 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r5) || (this._$AL.has(t4) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t4, s4)), true === e5 && this._$Em !== t4 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t4));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t6, s5] of this._$Ep) this[t6] = s5;
        this._$Ep = void 0;
      }
      const t5 = this.constructor.elementProperties;
      if (t5.size > 0) for (const [s5, i5] of t5) {
        const { wrapped: t6 } = i5, e5 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e5 || this.C(s5, void 0, i5, e5);
      }
    }
    let t4 = false;
    const s4 = this._$AL;
    try {
      t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach(((t5) => t5.hostUpdate?.())), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t4 = false, this._$EM(), s5;
    }
    t4 && this._$AE(s4);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    this._$EO?.forEach(((t5) => t5.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$Eq &&= this._$Eq.forEach(((t5) => this._$ET(t5, this[t5]))), this._$EM();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.1");

// ../../node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = t2.trustedTypes;
var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var e3 = "$lit$";
var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = document;
var l2 = () => r3.createComment("");
var c3 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var a2 = Array.isArray;
var u2 = (t4) => a2(t4) || "function" == typeof t4?.[Symbol.iterator];
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t4) => (i5, ...s4) => ({ _$litType$: t4, strings: i5, values: s4 });
var x = y2(1);
var b2 = y2(2);
var w = y2(3);
var T = Symbol.for("lit-noChange");
var E = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129);
function P(t4, i5) {
  if (!a2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i5) : i5;
}
var V = (t4, i5) => {
  const s4 = t4.length - 1, o6 = [];
  let r5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = f2;
  for (let i6 = 0; i6 < s4; i6++) {
    const s5 = t4[i6];
    let a3, u3, d3 = -1, y3 = 0;
    for (; y3 < s5.length && (c4.lastIndex = y3, u3 = c4.exec(s5), null !== u3); ) y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r5 = RegExp("</" + u3[2], "g")), c4 = m) : void 0 !== u3[3] && (c4 = m) : c4 === m ? ">" === u3[0] ? (c4 = r5 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r5 = void 0);
    const x2 = c4 === m && t4[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === f2 ? s5 + n3 : d3 >= 0 ? (o6.push(a3), s5.slice(0, d3) + e3 + s5.slice(d3) + h2 + x2) : s5 + h2 + (-2 === d3 ? i6 : x2);
  }
  return [P(t4, l3 + (t4[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), o6];
};
var N = class _N {
  constructor({ strings: t4, _$litType$: s4 }, n5) {
    let r5;
    this.parts = [];
    let c4 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = V(t4, s4);
    if (this.el = _N.createElement(f3, n5), C.currentNode = this.el.content, 2 === s4 || 3 === s4) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r5 = C.nextNode()) && d3.length < u3; ) {
      if (1 === r5.nodeType) {
        if (r5.hasAttributes()) for (const t5 of r5.getAttributeNames()) if (t5.endsWith(e3)) {
          const i5 = v2[a3++], s5 = r5.getAttribute(t5).split(h2), e5 = /([.?@])?(.*)/.exec(i5);
          d3.push({ type: 1, index: c4, name: e5[2], strings: s5, ctor: "." === e5[1] ? H : "?" === e5[1] ? I : "@" === e5[1] ? L : k }), r5.removeAttribute(t5);
        } else t5.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r5.removeAttribute(t5));
        if ($.test(r5.tagName)) {
          const t5 = r5.textContent.split(h2), s5 = t5.length - 1;
          if (s5 > 0) {
            r5.textContent = i3 ? i3.emptyScript : "";
            for (let i5 = 0; i5 < s5; i5++) r5.append(t5[i5], l2()), C.nextNode(), d3.push({ type: 2, index: ++c4 });
            r5.append(t5[s5], l2());
          }
        }
      } else if (8 === r5.nodeType) if (r5.data === o3) d3.push({ type: 2, index: c4 });
      else {
        let t5 = -1;
        for (; -1 !== (t5 = r5.data.indexOf(h2, t5 + 1)); ) d3.push({ type: 7, index: c4 }), t5 += h2.length - 1;
      }
      c4++;
    }
  }
  static createElement(t4, i5) {
    const s4 = r3.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function S2(t4, i5, s4 = t4, e5) {
  if (i5 === T) return i5;
  let h3 = void 0 !== e5 ? s4._$Co?.[e5] : s4._$Cl;
  const o6 = c3(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e5)), void 0 !== e5 ? (s4._$Co ??= [])[e5] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = S2(t4, h3._$AS(t4, i5.values), h3, e5)), i5;
}
var M = class {
  constructor(t4, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i5 }, parts: s4 } = this._$AD, e5 = (t4?.creationScope ?? r3).importNode(i5, true);
    C.currentNode = e5;
    let h3 = C.nextNode(), o6 = 0, n5 = 0, l3 = s4[0];
    for (; void 0 !== l3; ) {
      if (o6 === l3.index) {
        let i6;
        2 === l3.type ? i6 = new R(h3, h3.nextSibling, this, t4) : 1 === l3.type ? i6 = new l3.ctor(h3, l3.name, l3.strings, this, t4) : 6 === l3.type && (i6 = new z(h3, this, t4)), this._$AV.push(i6), l3 = s4[++n5];
      }
      o6 !== l3?.index && (h3 = C.nextNode(), o6++);
    }
    return C.currentNode = r3, e5;
  }
  p(t4) {
    let i5 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t4[i5])), i5++;
  }
};
var R = class _R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i5, s4, e5) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s4, this.options = e5, this._$Cv = e5?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t4?.nodeType && (t4 = i5.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i5 = this) {
    t4 = S2(this, t4, i5), c3(t4) ? t4 === E || null == t4 || "" === t4 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t4 !== this._$AH && t4 !== T && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : u2(t4) ? this.k(t4) : this._(t4);
  }
  O(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  T(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
  }
  _(t4) {
    this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(r3.createTextNode(t4)), this._$AH = t4;
  }
  $(t4) {
    const { values: i5, _$litType$: s4 } = t4, e5 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = N.createElement(P(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e5) this._$AH.p(i5);
    else {
      const t5 = new M(e5, this), s5 = t5.u(this.options);
      t5.p(i5), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i5 = A.get(t4.strings);
    return void 0 === i5 && A.set(t4.strings, i5 = new N(t4)), i5;
  }
  k(t4) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s4, e5 = 0;
    for (const h3 of t4) e5 === i5.length ? i5.push(s4 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s4 = i5[e5], s4._$AI(h3), e5++;
    e5 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e5), i5.length = e5);
  }
  _$AR(t4 = this._$AA.nextSibling, i5) {
    for (this._$AP?.(false, true, i5); t4 !== this._$AB; ) {
      const i6 = t4.nextSibling;
      t4.remove(), t4 = i6;
    }
  }
  setConnected(t4) {
    void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t4, i5, s4, e5, h3) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e5, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = E;
  }
  _$AI(t4, i5 = this, s4, e5) {
    const h3 = this.strings;
    let o6 = false;
    if (void 0 === h3) t4 = S2(this, t4, i5, 0), o6 = !c3(t4) || t4 !== this._$AH && t4 !== T, o6 && (this._$AH = t4);
    else {
      const e6 = t4;
      let n5, r5;
      for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r5 = S2(this, e6[s4 + n5], i5, n5), r5 === T && (r5 = this._$AH[n5]), o6 ||= !c3(r5) || r5 !== this._$AH[n5], r5 === E ? t4 = E : t4 !== E && (t4 += (r5 ?? "") + h3[n5 + 1]), this._$AH[n5] = r5;
    }
    o6 && !e5 && this.j(t4);
  }
  j(t4) {
    t4 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === E ? void 0 : t4;
  }
};
var I = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    this.element.toggleAttribute(this.name, !!t4 && t4 !== E);
  }
};
var L = class extends k {
  constructor(t4, i5, s4, e5, h3) {
    super(t4, i5, s4, e5, h3), this.type = 5;
  }
  _$AI(t4, i5 = this) {
    if ((t4 = S2(this, t4, i5, 0) ?? E) === T) return;
    const s4 = this._$AH, e5 = t4 === E && s4 !== E || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== E && (s4 === E || e5);
    e5 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var z = class {
  constructor(t4, i5, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    S2(this, t4);
  }
};
var j = t2.litHtmlPolyfillSupport;
j?.(N, R), (t2.litHtmlVersions ??= []).push("3.3.1");
var B = (t4, i5, s4) => {
  const e5 = s4?.renderBefore ?? i5;
  let h3 = e5._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e5._$litPart$ = h3 = new R(i5.insertBefore(l2(), t5), t5, void 0, s4 ?? {});
  }
  return h3._$AI(t4), h3;
};

// ../../node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t4 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t4.firstChild, t4;
  }
  update(t4) {
    const r5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = B(r5, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.1");

// ../../node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t4) => (e5, o6) => {
  void 0 !== o6 ? o6.addInitializer((() => {
    customElements.define(t4, e5);
  })) : customElements.define(t4, e5);
};

// ../../node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t4 = o5, e5, r5) => {
  const { kind: n5, metadata: i5 } = r5;
  let s4 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r5.name, t4), "accessor" === n5) {
    const { name: o6 } = r5;
    return { set(r6) {
      const n6 = e5.get.call(this);
      e5.set.call(this, r6), this.requestUpdate(o6, n6, t4);
    }, init(e6) {
      return void 0 !== e6 && this.C(o6, void 0, t4, e6), e6;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r5;
    return function(r6) {
      const n6 = this[o6];
      e5.call(this, r6), this.requestUpdate(o6, n6, t4);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t4) {
  return (e5, o6) => "object" == typeof o6 ? r4(t4, e5, o6) : ((t5, e6, o7) => {
    const r5 = e6.hasOwnProperty(o7);
    return e6.constructor.createProperty(o7, t5), r5 ? Object.getOwnPropertyDescriptor(e6, o7) : void 0;
  })(t4, e5, o6);
}

// web/repo_selector.ts
var import_jquery2 = __toESM(require_jquery());
function repoSelector() {
  return (0, import_jquery2.default)("#repos");
}
function init() {
  let repos = repoSelector();
  repos.selectpicker({
    actionsBox: true,
    selectedTextFormat: "count > 4",
    countSelectedText: "({0} repositories)",
    noneSelectedText: "(all repositories)",
    liveSearch: true,
    width: "20em"
  });
  repos.on("refreshed.bs.select", () => {
    let headers = (0, import_jquery2.default)(this).parent().find(".dropdown-header");
    headers.css("cursor", "pointer");
    headers.on("click", (event) => {
      event.stopPropagation();
      let optgroup = (0, import_jquery2.default)('#repos optgroup[label="' + (0, import_jquery2.default)(this).text() + '"]');
      let allSelected = !optgroup.children("option:not(:selected)").length;
      optgroup.children().prop("selected", !allSelected);
      repos.selectpicker("refresh").trigger("change");
    });
  });
  (0, import_jquery2.default)(window).on("keyup", ".bootstrap-select .bs-searchbox input", (event) => {
    if (event.key == "Enter") {
      (0, import_jquery2.default)(this).val("");
      repos.selectpicker("refresh");
    }
  });
  (0, import_jquery2.default)(window).on("keyup", (keyevent) => {
    if (keyevent.key == "Tab" && (0, import_jquery2.default)(".bootstrap-select button:focus").length) {
      repos.selectpicker("toggle");
      (0, import_jquery2.default)(".bootstrap-select .bs-searchbox input").trigger("focus");
    }
  });
}
function updateOptions(newOptions) {
  let currentOptions = [];
  let repos = repoSelector();
  repos.find("option").each(() => {
    currentOptions.push((0, import_jquery2.default)(this).attr("value"));
  });
  if (currentOptions.length == newOptions.length && currentOptions.every((v2, i5) => v2 == newOptions[i5])) {
    return;
  }
  repos.empty();
  newOptions.sort();
  let groups = /* @__PURE__ */ new Map();
  groups.set("/", repos);
  for (let i5 = 0; i5 < newOptions.length; i5++) {
    let path = newOptions[i5].split("/");
    let group = path.slice(0, path.length - 1).join("/") + "/";
    let option = path[path.length - 1];
    if (!groups.has(group)) {
      let groupDOM = (0, import_jquery2.default)("<optgroup>").attr("label", group);
      repos.append(groupDOM);
      groups.set(group, groupDOM);
    }
    groups.get(group).append(
      (0, import_jquery2.default)("<option>").attr("value", group + option).attr("data-tokens", group + option).text(option)
    );
  }
  groups.clear();
  repos.selectpicker("refresh");
}
function updateSelected(newSelected) {
  repoSelector().selectpicker("val", newSelected);
}

// web/codesearch_ui.tsx
var CodesearchUI;
((CodesearchUI2) => {
  let input_repos;
  let inputs_case;
  let input_context;
  function onload() {
    if (CodesearchUI2.input) return;
    CodesearchUI2.input = (0, import_jquery3.default)("#searchbox");
    input_repos = (0, import_jquery3.default)("#repos");
    CodesearchUI2.input_backend = (0, import_jquery3.default)("#backend");
    if (CodesearchUI2.input_backend.length == 0) CodesearchUI2.input_backend = null;
    inputs_case = (0, import_jquery3.default)("input[name=fold_case]");
    CodesearchUI2.input_regex = (0, import_jquery3.default)("input[name=regex]");
    input_context = (0, import_jquery3.default)("input[name=context]");
    if (inputs_case.filter(":checked").length == 0) {
      inputs_case.filter("[value=auto]").attr("checked", "true");
    }
    init();
    initQuery();
    updateRepoOptions();
    CodesearchUI2.input.trigger("focus");
    if (CodesearchUI2.input_backend) CodesearchUI2.input_backend.on("change", selectBackend);
    CodesearchUI2.input_regex.on("change", () => setPref("regex", CodesearchUI2.input_regex.prop("checked")));
    input_repos.on("change", () => setPref("repos", input_repos.val()));
    input_context.on("change", () => setPref("context", input_context.prop("checked")));
    (0, import_jquery3.default)(".query-hint code").on("click", function(e5) {
      let ext = e5.target.textContent;
      if (!ext) return;
      let q = CodesearchUI2.input.val();
      if (!q.includes(ext) && (ext.indexOf("-") == 0 && !q.includes(ext.substring(1)) || ext.indexOf("-") != 0 && !q.includes("-" + ext.substring))) {
        q = q + " " + ext;
      }
      CodesearchUI2.input.val(q);
      CodesearchUI2.input.trigger("focus");
    });
    window.onpopstate = (_event) => {
      let parms = parseQueryParams();
      initQueryFromParams(parms);
    };
  }
  CodesearchUI2.onload = onload;
  function initQuery() {
    let parms = parseQueryParams();
    let hasParms = false;
    for (let _2 in parms) {
      hasParms = true;
      break;
    }
    if (hasParms) {
      initQueryFromParams(parms);
    } else {
      initControlsFromPrefs();
    }
  }
  function initQueryFromParams(parms) {
    let q = [];
    if (parms["q"]) q.push(parms["q"][0]);
    if (parms["file"]) q.push("file:" + parms["file"][0]);
    CodesearchUI2.input.val(q.join(" "));
    if (parms["fold_case"]) {
      inputs_case.filter("[value=" + parms["fold_case"][0] + "]").attr("checked", "true");
    }
    if (parms["regex"]) {
      CodesearchUI2.input_regex.prop("checked", parms["regex"][0] === "true");
    }
    if (parms["context"]) {
      input_context.prop("checked", parms["context"][0] === "true");
    }
    let backend = null;
    if (parms["backend"]) backend = parms["backend"];
    let m2 = new RegExp("/search/([^/]+)/?").exec(window.location.pathname);
    if (m2) backend = m2[1];
    if (backend && CodesearchUI2.input_backend) {
      let old_backend = CodesearchUI2.input_backend.val();
      CodesearchUI2.input_backend.val(backend);
      if (CodesearchUI2.input_backend.val() === null) {
        CodesearchUI2.input_backend.val(old_backend);
      }
    }
    let repos = [];
    if (parms["repo"]) repos = repos.concat(parms["repo"]);
    if (parms["repo[]"]) repos = repos.concat(parms["repo[]"]);
    updateSelected(repos);
  }
  function initControlsFromPrefs() {
    let prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
    if (!prefs) {
      prefs = {};
    }
    if (prefs["regex"] !== void 0) {
      CodesearchUI2.input_regex.prop("checked", prefs["regex"]);
    }
    if (prefs["repos"] !== void 0) {
      updateSelected(prefs["repos"]);
    }
    if (prefs["context"] !== void 0) {
      input_context.prop("checked", prefs["context"]);
    }
    if (prefs["backend"] !== void 0 && CodesearchUI2.input_backend) {
      CodesearchUI2.input_backend.val(prefs["backend"]);
    }
  }
  function setPref(key, value) {
    let prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
    if (!prefs) {
      prefs = {};
    }
    prefs[key] = value;
    localStorage.setItem("prefs", JSON.stringify(prefs));
  }
  function parseQueryParams() {
    let urlParams = /* @__PURE__ */ new Map();
    let e5, a3 = /\+/g, r5 = /([^&=]+)=?([^&]*)/g, d3 = (s4) => decodeURIComponent(s4.replace(a3, " ")), q = window.location.search.substring(1);
    while (e5 = r5.exec(q)) {
      if (urlParams.get(d3(e5[1]))) {
        urlParams[d3(e5[1])].push(d3(e5[2]));
      } else {
        urlParams[d3(e5[1])] = [d3(e5[2])];
      }
    }
    return urlParams;
  }
  function selectBackend() {
    if (!CodesearchUI2.input_backend) return;
    updateRepoOptions();
  }
  function updateRepoOptions() {
    if (!CodesearchUI2.input_backend) return;
    let backend = CodesearchUI2.input_backend.val();
    setPref("backend", backend);
    updateOptions(CodesearchUI2.backend_repos[backend]);
  }
})(CodesearchUI || (CodesearchUI = {}));
function init2(initData) {
  CodesearchUI.backend_repos = initData.backend_repos;
  CodesearchUI.linkConfigs = (initData.link_configs || []).map(function(link_config) {
    return link_config;
  });
  CodesearchUI.onload();
}
var SearchFilterButton = class extends i4 {
  render() {
    return x`
            <button type="button" class="file-extension" @click="${this._apply}">
                ${this.text}
            </button>
        `;
  }
  _apply(e5) {
    let input = htmx_esm_default.find("#searchbox");
    input.value = ((0, import_jquery3.default)("#regex").is(":checked") ? this.regexFilter : this.rawFilter) + " " + input.value;
    htmx_esm_default.trigger("#searchbox", "search");
  }
};
__decorateClass([
  n4()
], SearchFilterButton.prototype, "text", 2);
__decorateClass([
  n4()
], SearchFilterButton.prototype, "rawFilter", 2);
__decorateClass([
  n4()
], SearchFilterButton.prototype, "regexFilter", 2);
SearchFilterButton = __decorateClass([
  t3("filter-button")
], SearchFilterButton);
document.addEventListener("DOMContentLoaded", () => {
  let text = htmx_esm_default.find("#data").text;
  let data = JSON.parse(text);
  init2(data);
});
export {
  SearchFilterButton
};
/*! For license information please see codesearch_ui.js.LEGAL.txt */
//# sourceMappingURL=codesearch_ui.js.map
