import {
  __commonJS,
  __toESM,
  require_jquery
} from "./chunk-2YGUWXKK.js";

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
      (function($) {
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
          if ($.inArray(attrName, allowedAttributeList) !== -1) {
            if ($.inArray(attrName, uriAttrs) !== -1) {
              return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
            }
            return true;
          }
          var regExp = $(allowedAttributeList).filter(function(index, value) {
            return value instanceof RegExp;
          });
          for (var i = 0, l = regExp.length; i < l; i++) {
            if (attrName.match(regExp[i])) {
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
          for (var i = 0, len = unsafeElements.length; i < len; i++) {
            var elements = unsafeElements[i].querySelectorAll("*");
            for (var j = 0, len2 = elements.length; j < len2; j++) {
              var el = elements[j];
              var elName = el.nodeName.toLowerCase();
              if (whitelistKeys.indexOf(elName) === -1) {
                el.parentNode.removeChild(el);
                continue;
              }
              var attributeList = [].slice.call(el.attributes);
              var whitelistedAttributes = [].concat(whiteList["*"] || [], whiteList[elName] || []);
              for (var k = 0, len3 = attributeList.length; k < len3; k++) {
                var attr = attributeList[k];
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
              var $elem = $(this);
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
          Object.keys = function(o, k, r) {
            r = [];
            for (k in o) {
              r.hasOwnProperty.call(o, k) && r.push(k);
            }
            return r;
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
            for (var i = 0, len = selectedOptions.length; i < len; i++) {
              opt = selectedOptions[i];
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
          for (var i = 0, len = options.length; i < len; i++) {
            opt = options[i];
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
          _set: $.valHooks.select.set
        };
        $.valHooks.select.set = function(elem, value) {
          if (value && !valHooks.useDefault) $(elem).data("selected", true);
          return valHooks._set.apply(this, arguments);
        };
        var changedArguments = null;
        var EventIsSupported = (function() {
          try {
            new Event("change");
            return true;
          } catch (e) {
            return false;
          }
        })();
        $.fn.triggerNative = function(eventName) {
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
          for (var i = 0; i < stringTypes.length; i++) {
            var stringType = stringTypes[i], string = li[stringType];
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
          version.full = ($.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".");
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
            var a = elementTemplates.a.cloneNode(true);
            if (text) {
              if (text.nodeType === 11) {
                a.appendChild(text);
              } else {
                a.insertAdjacentHTML("beforeend", text);
              }
            }
            if (typeof classes !== "undefined" && classes !== "") a.classList.add.apply(a.classList, classes.split(/\s+/));
            if (inline) a.setAttribute("style", inline);
            return a;
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
            $.valHooks.select.set = valHooks._set;
            valHooks.useDefault = true;
          }
          this.$element = $(element);
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
              "hide.bs.dropdown": function(e) {
                that.$element.trigger("hide" + EVENT_KEY, e);
              },
              "hidden.bs.dropdown": function(e) {
                that.$element.trigger("hidden" + EVENT_KEY, e);
              },
              "show.bs.dropdown": function(e) {
                that.$element.trigger("show" + EVENT_KEY, e);
              },
              "shown.bs.dropdown": function(e) {
                that.$element.trigger("shown" + EVENT_KEY, e);
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
            return $(drop);
          },
          setPositionData: function() {
            this.selectpicker.view.canHighlight = [];
            this.selectpicker.view.size = 0;
            this.selectpicker.view.firstHighlightIndex = false;
            for (var i = 0; i < this.selectpicker.current.data.length; i++) {
              var li = this.selectpicker.current.data[i], canHighlight = true;
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
                if (this.selectpicker.view.firstHighlightIndex === false) this.selectpicker.view.firstHighlightIndex = i;
              }
              li.position = (i === 0 ? 0 : this.selectpicker.current.data[i - 1].position) + li.height;
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
            this.$menuInner.off("scroll.createView").on("scroll.createView", function(e, updateValue) {
              if (!that.noScroll) scroll(this.scrollTop, updateValue);
              that.noScroll = false;
            });
            function scroll(scrollTop2, init3) {
              var size = that.selectpicker.current.elements.length, chunks = [], chunkSize, chunkCount, firstChunk, lastChunk, currentChunk, prevPositions, positionIsDifferent, previousElements, menuIsDifferent = true, isVirtual = that.isVirtual();
              that.selectpicker.view.scrollTop = scrollTop2;
              chunkSize = Math.ceil(that.sizeInfo.menuInnerHeight / that.sizeInfo.liHeight * 1.5);
              chunkCount = Math.round(size / chunkSize) || 1;
              for (var i = 0; i < chunkCount; i++) {
                var endOfChunk = (i + 1) * chunkSize;
                if (i === chunkCount - 1) {
                  endOfChunk = size;
                }
                chunks[i] = [
                  i * chunkSize + (!i ? 0 : 1),
                  endOfChunk
                ];
                if (!size) break;
                if (currentChunk === void 0 && scrollTop2 - 1 <= that.selectpicker.current.data[endOfChunk - 1].position - that.sizeInfo.menuInnerHeight) {
                  currentChunk = i;
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
                  for (var i = 0, visibleElementsLen = elements.length; i < visibleElementsLen; i++) {
                    var element2 = elements[i], elText, elementData;
                    if (that.options.sanitize) {
                      elText = element2.lastChild;
                      if (elText) {
                        elementData = that.selectpicker.current.data[i + that.selectpicker.view.position0];
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
            $(window).off("resize" + EVENT_KEY + "." + this.selectId + ".createView").on("resize" + EVENT_KEY + "." + this.selectId + ".createView", function() {
              var isActive = that.$newElement.hasClass(classNames.SHOW);
              if (isActive) scroll(that.$menuInner[0].scrollTop);
            });
          },
          focusItem: function(li, liData, noStyle) {
            if (li) {
              liData = liData || this.selectpicker.main.data[this.activeIndex];
              var a = li.firstChild;
              if (a) {
                a.setAttribute("aria-setsize", this.selectpicker.view.size);
                a.setAttribute("aria-posinset", liData.posinset);
                if (noStyle !== true) {
                  this.focusedParent.setAttribute("aria-activedescendant", a.id);
                  li.classList.add("active");
                  a.classList.add("active");
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
              for (var j = 0, len2 = options.length; j < len2; j++) {
                var option = options[j];
                if (j === 0) {
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
            for (var len = selectOptions.length, i = startIndex; i < len; i++) {
              var item = selectOptions[i];
              if (item.tagName !== "OPTGROUP") {
                addOption(item, {});
              } else {
                addOptgroup(i, selectOptions);
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
            for (var len = selectData.length, i = 0; i < len; i++) {
              var item = selectData[i];
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
            var newElement = elementTemplates.div.cloneNode(false), menu = elementTemplates.div.cloneNode(false), menuInner = elementTemplates.div.cloneNode(false), menuInnerInner = document.createElement("ul"), divider = elementTemplates.li.cloneNode(false), dropdownHeader = elementTemplates.li.cloneNode(false), li, a = elementTemplates.a.cloneNode(false), text = elementTemplates.span.cloneNode(false), header = this.options.header && this.$menu.find("." + classNames.POPOVERHEADER).length > 0 ? this.$menu.find("." + classNames.POPOVERHEADER)[0].cloneNode(true) : null, search = this.options.liveSearch ? elementTemplates.div.cloneNode(false) : null, actions = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(true) : null, doneButton = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(true) : null, firstOption = this.$element.find("option")[0];
            this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;
            text.className = "text";
            a.className = "dropdown-item " + (firstOption ? firstOption.className : "");
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
              for (var i = 0; i < this.selectpicker.current.data.length; i++) {
                var data = this.selectpicker.current.data[i];
                if (data.type === "option") {
                  li = data.element;
                  break;
                }
              }
            } else {
              li = elementTemplates.li.cloneNode(false);
              a.appendChild(text);
              li.appendChild(a);
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
            var liHeight = li.offsetHeight, dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0, headerHeight = header ? header.offsetHeight : 0, searchHeight = search ? search.offsetHeight : 0, actionsHeight = actions ? actions.offsetHeight : 0, doneButtonHeight = doneButton ? doneButton.offsetHeight : 0, dividerHeight = $(divider).outerHeight(true), menuStyle = window.getComputedStyle ? window.getComputedStyle(menu) : false, menuWidth = menu.offsetWidth, $menu = menuStyle ? null : $(menu), menuPadding = {
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
            var that = this, $window = $(window), pos = that.$newElement.offset(), $container = $(that.options.container), containerPos;
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
              for (var i = 0; i < this.options.size; i++) {
                if (this.selectpicker.current.data[i].type === "divider") divLength++;
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
              var that = this, $window = $(window);
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
            this.$bsContainer = $('<div class="bs-container" />');
            var that = this, $container = $(this.options.container), pos, containerPos, actualHeight, getPlacement = function($element) {
              var containerPosition = {}, display = that.options.display || // Bootstrap 3 doesn't have $.fn.dropdown.Constructor.Default
              ($.fn.dropdown.Constructor.Default ? $.fn.dropdown.Constructor.Default.display : false);
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
            $(window).off("resize" + EVENT_KEY + "." + this.selectId + " scroll" + EVENT_KEY + "." + this.selectId).on("resize" + EVENT_KEY + "." + this.selectId + " scroll" + EVENT_KEY + "." + this.selectId, function() {
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
              for (var i = 0; i < that.selectpicker.view.visibleElements.length; i++) {
                var liData = that.selectpicker.current.data[i + that.selectpicker.view.position0], option = liData.option;
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
            var li = this.selectpicker.main.elements[index], liData = this.selectpicker.main.data[index], activeIndexIsSet = this.activeIndex !== void 0, thisIsActive = this.activeIndex === index, prevActive, a, keepActive = thisIsActive || selected && !this.multiple && !activeIndexIsSet;
            liData.selected = selected;
            a = li.firstChild;
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
            if (a) {
              a.classList.toggle("selected", selected);
              if (selected) {
                a.setAttribute("aria-selected", true);
              } else {
                if (this.multiple) {
                  a.setAttribute("aria-selected", false);
                } else {
                  a.removeAttribute("aria-selected");
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
            var li = this.selectpicker.main.elements[index], a;
            this.selectpicker.main.data[index].disabled = disabled;
            a = li.firstChild;
            li.classList.toggle(classNames.DISABLED, disabled);
            if (a) {
              if (version.major === "4") a.classList.toggle(classNames.DISABLED, disabled);
              if (disabled) {
                a.setAttribute("aria-disabled", disabled);
                a.setAttribute("tabindex", -1);
              } else {
                a.removeAttribute("aria-disabled");
                a.setAttribute("tabindex", 0);
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
            var that = this, $document = $(document);
            $document.data("spaceSelect", false);
            this.$button.on("keyup", function(e) {
              if (/(32)/.test(e.keyCode.toString(10)) && $document.data("spaceSelect")) {
                e.preventDefault();
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
            this.$menuInner.on("mouseenter", "li a", function(e) {
              var hoverLi = this.parentElement, position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0, index = Array.prototype.indexOf.call(hoverLi.parentElement.children, hoverLi), hoverData = that.selectpicker.current.data[index + position0];
              that.focusItem(hoverLi, hoverData, true);
            });
            this.$menuInner.on("click", "li a", function(e, retainActive) {
              var $this = $(this), element = that.$element[0], position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0, clickedData = that.selectpicker.current.data[$this.parent().index() + position0], clickedIndex = clickedData.index, prevValue = getSelectValues(element), prevIndex = element.selectedIndex, prevOption = element.options[prevIndex], triggerChange = true;
              if (that.multiple && that.options.maxOptions !== 1) {
                e.stopPropagation();
              }
              e.preventDefault();
              if (!that.isDisabled() && !$this.parent().hasClass(classNames.DISABLED)) {
                var option = clickedData.option, $option = $(option), state = option.selected, $optgroup = $option.parent("optgroup"), $optgroupOptions = $optgroup.find("option"), maxOptions = that.options.maxOptions, maxOptionsGrp = $optgroup.data("maxOptions") || false;
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
                        for (var i = 0; i < $optgroupOptions.length; i++) {
                          var _option = $optgroupOptions[i];
                          _option.selected = false;
                          that.setSelected(_option.liIndex, false);
                        }
                        option.selected = true;
                        that.setSelected(clickedIndex, true);
                      } else {
                        var maxOptionsText = typeof that.options.maxOptionsText === "string" ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText, maxOptionsArr = typeof maxOptionsText === "function" ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText, maxTxt = maxOptionsArr[0].replace("{n}", maxOptions), maxTxtGrp = maxOptionsArr[1].replace("{n}", maxOptionsGrp), $notify = $('<div class="notify"></div>');
                        if (maxOptionsArr[2]) {
                          maxTxt = maxTxt.replace("{var}", maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                          maxTxtGrp = maxTxtGrp.replace("{var}", maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                        }
                        option.selected = false;
                        that.$menu.append($notify);
                        if (maxOptions && maxReached) {
                          $notify.append($("<div>" + maxTxt + "</div>"));
                          triggerChange = false;
                          that.$element.trigger("maxReached" + EVENT_KEY);
                        }
                        if (maxOptionsGrp && maxReachedGrp) {
                          $notify.append($("<div>" + maxTxtGrp + "</div>"));
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
            this.$menu.on("click", "li." + classNames.DISABLED + " a, ." + classNames.POPOVERHEADER + ", ." + classNames.POPOVERHEADER + " :not(.close)", function(e) {
              if (e.currentTarget == this) {
                e.preventDefault();
                e.stopPropagation();
                if (that.options.liveSearch && !$(e.target).hasClass("close")) {
                  that.$searchbox.trigger("focus");
                } else {
                  that.$button.trigger("focus");
                }
              }
            });
            this.$menuInner.on("click", ".divider, .dropdown-header", function(e) {
              e.preventDefault();
              e.stopPropagation();
              if (that.options.liveSearch) {
                that.$searchbox.trigger("focus");
              } else {
                that.$button.trigger("focus");
              }
            });
            this.$menu.on("click", "." + classNames.POPOVERHEADER + " .close", function() {
              that.$button.trigger("click");
            });
            this.$searchbox.on("click", function(e) {
              e.stopPropagation();
            });
            this.$menu.on("click", ".actions-btn", function(e) {
              if (that.options.liveSearch) {
                that.$searchbox.trigger("focus");
              } else {
                that.$button.trigger("focus");
              }
              e.preventDefault();
              e.stopPropagation();
              if ($(this).hasClass("bs-select-all")) {
                that.selectAll();
              } else {
                that.deselectAll();
              }
            });
            this.$button.on("focus" + EVENT_KEY, function(e) {
              var tabindex = that.$element[0].getAttribute("tabindex");
              if (tabindex !== void 0 && e.originalEvent && e.originalEvent.isTrusted) {
                this.setAttribute("tabindex", tabindex);
                that.$element[0].setAttribute("tabindex", -1);
                that.selectpicker.view.tabindex = tabindex;
              }
            }).on("blur" + EVENT_KEY, function(e) {
              if (that.selectpicker.view.tabindex !== void 0 && e.originalEvent && e.originalEvent.isTrusted) {
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
            this.$searchbox.on("click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api", function(e) {
              e.stopPropagation();
            });
            this.$searchbox.on("input propertychange", function() {
              var searchValue = that.$searchbox[0].value;
              that.selectpicker.search.elements = [];
              that.selectpicker.search.data = [];
              if (searchValue) {
                var i, searchMatch = [], q = searchValue.toUpperCase(), cache = {}, cacheArr = [], searchStyle = that._searchStyle(), normalizeSearch = that.options.liveSearchNormalize;
                if (normalizeSearch) q = normalizeToBase(q);
                for (var i = 0; i < that.selectpicker.main.data.length; i++) {
                  var li = that.selectpicker.main.data[i];
                  if (!cache[i]) {
                    cache[i] = stringSearch(li, q, searchStyle, normalizeSearch);
                  }
                  if (cache[i] && li.headerIndex !== void 0 && cacheArr.indexOf(li.headerIndex) === -1) {
                    if (li.headerIndex > 0) {
                      cache[li.headerIndex - 1] = true;
                      cacheArr.push(li.headerIndex - 1);
                    }
                    cache[li.headerIndex] = true;
                    cacheArr.push(li.headerIndex);
                    cache[li.lastIndex + 1] = true;
                  }
                  if (cache[i] && li.type !== "optgroup-label") cacheArr.push(i);
                }
                for (var i = 0, cacheLen = cacheArr.length; i < cacheLen; i++) {
                  var index = cacheArr[i], prevIndex = cacheArr[i - 1], li = that.selectpicker.main.data[index], liPrev = that.selectpicker.main.data[prevIndex];
                  if (li.type !== "divider" || li.type === "divider" && liPrev && liPrev.type !== "divider" && cacheLen - 1 !== i) {
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
            for (var i = 0, data = this.selectpicker.current.data, len = data.length; i < len; i++) {
              var liData = data[i], option = liData.option;
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
          toggle: function(e) {
            e = e || window.event;
            if (e) e.stopPropagation();
            this.$button.trigger("click.bs.dropdown.data-api");
          },
          keydown: function(e) {
            var $this = $(this), isToggle = $this.hasClass("dropdown-toggle"), $parent = isToggle ? $this.closest(".dropdown") : $this.closest(Selector.MENU), that = $parent.data("this"), $items = that.findLis(), index, isActive, liActive, activeLi, offset, updateScroll = false, downOnTab = e.which === keyCodes.TAB && !isToggle && !that.options.selectOnTab, isArrowKey = REGEXP_ARROW.test(e.which) || downOnTab, scrollTop = that.$menuInner[0].scrollTop, isVirtual = that.isVirtual(), position0 = isVirtual === true ? that.selectpicker.view.position0 : 0;
            if (e.which >= 112 && e.which <= 123) return;
            isActive = that.$newElement.hasClass(classNames.SHOW);
            if (!isActive && (isArrowKey || e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105 || e.which >= 65 && e.which <= 90)) {
              that.$button.trigger("click.bs.dropdown.data-api");
              if (that.options.liveSearch) {
                that.$searchbox.trigger("focus");
                return;
              }
            }
            if (e.which === keyCodes.ESCAPE && isActive) {
              e.preventDefault();
              that.$button.trigger("click.bs.dropdown.data-api").trigger("focus");
            }
            if (isArrowKey) {
              if (!$items.length) return;
              liActive = that.selectpicker.main.elements[that.activeIndex];
              index = liActive ? Array.prototype.indexOf.call(liActive.parentElement.children, liActive) : -1;
              if (index !== -1) {
                that.defocusItem(liActive);
              }
              if (e.which === keyCodes.ARROW_UP) {
                if (index !== -1) index--;
                if (index + position0 < 0) index += $items.length;
                if (!that.selectpicker.view.canHighlight[index + position0]) {
                  index = that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) - position0;
                  if (index === -1) index = $items.length - 1;
                }
              } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) {
                index++;
                if (index + position0 >= that.selectpicker.view.canHighlight.length) index = that.selectpicker.view.firstHighlightIndex;
                if (!that.selectpicker.view.canHighlight[index + position0]) {
                  index = index + 1 + that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
                }
              }
              e.preventDefault();
              var liActiveIndex = position0 + index;
              if (e.which === keyCodes.ARROW_UP) {
                if (position0 === 0 && index === $items.length - 1) {
                  that.$menuInner[0].scrollTop = that.$menuInner[0].scrollHeight;
                  liActiveIndex = that.selectpicker.current.elements.length - 1;
                } else {
                  activeLi = that.selectpicker.current.data[liActiveIndex];
                  offset = activeLi.position - activeLi.height;
                  updateScroll = offset < scrollTop;
                }
              } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) {
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
            } else if (!$this.is("input") && !REGEXP_TAB_OR_ESCAPE.test(e.which) || e.which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory) {
              var searchMatch, matches2 = [], keyHistory;
              e.preventDefault();
              that.selectpicker.keydown.keyHistory += keyCodeMap[e.which];
              if (that.selectpicker.keydown.resetKeyHistory.cancel) clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
              that.selectpicker.keydown.resetKeyHistory.cancel = that.selectpicker.keydown.resetKeyHistory.start();
              keyHistory = that.selectpicker.keydown.keyHistory;
              if (/^(.)\1+$/.test(keyHistory)) {
                keyHistory = keyHistory.charAt(0);
              }
              for (var i = 0; i < that.selectpicker.current.data.length; i++) {
                var li = that.selectpicker.current.data[i], hasMatch;
                hasMatch = stringSearch(li, keyHistory, "startsWith", true);
                if (hasMatch && that.selectpicker.view.canHighlight[i]) {
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
            if (isActive && (e.which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory || e.which === keyCodes.ENTER || e.which === keyCodes.TAB && that.options.selectOnTab)) {
              if (e.which !== keyCodes.SPACE) e.preventDefault();
              if (!that.options.liveSearch || e.which !== keyCodes.SPACE) {
                that.$menuInner.find(".active a").trigger("click", true);
                $this.trigger("focus");
                if (!that.options.liveSearch) {
                  e.preventDefault();
                  $(document).data("spaceSelect", true);
                }
              }
            }
          },
          mobile: function() {
            this.options.mobile = true;
            this.$element[0].classList.add("mobile-device");
          },
          refresh: function() {
            var config = $.extend({}, this.options, this.$element.data());
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
            $(window).off(EVENT_KEY + "." + this.selectId);
          }
        };
        function Plugin(option) {
          var args = arguments;
          var _option = option;
          [].shift.apply(args);
          if (!version.success) {
            try {
              version.full = ($.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".");
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
            for (var i = 0; i < toUpdate.length; i++) {
              var option = toUpdate[i];
              Selectpicker.DEFAULTS[option.name] = classNames[option.className];
            }
          }
          var value;
          var chain = this.each(function() {
            var $this = $(this);
            if ($this.is("select")) {
              var data = $this.data("selectpicker"), options = typeof _option == "object" && _option;
              if (!data) {
                var dataAttributes = $this.data();
                for (var dataAttr in dataAttributes) {
                  if (Object.prototype.hasOwnProperty.call(dataAttributes, dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
                    delete dataAttributes[dataAttr];
                  }
                }
                var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, dataAttributes, options);
                config.template = $.extend({}, Selectpicker.DEFAULTS.template, $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}, dataAttributes.template, options.template);
                $this.data("selectpicker", data = new Selectpicker(this, config));
              } else if (options) {
                for (var i2 in options) {
                  if (Object.prototype.hasOwnProperty.call(options, i2)) {
                    data.options[i2] = options[i2];
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
        var old = $.fn.selectpicker;
        $.fn.selectpicker = Plugin;
        $.fn.selectpicker.Constructor = Selectpicker;
        $.fn.selectpicker.noConflict = function() {
          $.fn.selectpicker = old;
          return this;
        };
        function keydownHandler() {
          if ($.fn.dropdown) {
            var bootstrapKeydown = $.fn.dropdown.Constructor._dataApiKeydownHandler || $.fn.dropdown.Constructor.prototype.keydown;
            return bootstrapKeydown.apply(this, arguments);
          }
        }
        $(document).off("keydown.bs.dropdown.data-api").on("keydown.bs.dropdown.data-api", ':not(.bootstrap-select) > [data-toggle="dropdown"]', keydownHandler).on("keydown.bs.dropdown.data-api", ":not(.bootstrap-select) > .dropdown-menu", keydownHandler).on("keydown" + EVENT_KEY, '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', Selectpicker.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', function(e) {
          e.stopPropagation();
        });
        $(window).on("load" + EVENT_KEY + ".data-api", function() {
          $(".selectpicker").each(function() {
            var $selectpicker = $(this);
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
+(function($) {
  "use strict";
  var version = $.fn.jquery.split(" ")[0].split(".");
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] > 3) {
    throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
  }
})(jQuery);
+(function($) {
  "use strict";
  var backdrop = ".dropdown-backdrop";
  var toggle = '[data-toggle="dropdown"]';
  var Dropdown = function(element) {
    $(element).on("click.bs.dropdown", this.toggle);
  };
  Dropdown.VERSION = "3.4.1";
  function getParent($this) {
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = selector !== "#" ? $(document).find(selector) : null;
    return $parent && $parent.length ? $parent : $this.parent();
  }
  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function() {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = { relatedTarget: this };
      if (!$parent.hasClass("open")) return;
      if (e && e.type == "click" && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
      $parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.attr("aria-expanded", "false");
      $parent.removeClass("open").trigger($.Event("hidden.bs.dropdown", relatedTarget));
    });
  }
  Dropdown.prototype.toggle = function(e) {
    var $this = $(this);
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    clearMenus();
    if (!isActive) {
      if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
        $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
      }
      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.trigger("focus").attr("aria-expanded", "true");
      $parent.toggleClass("open").trigger($.Event("shown.bs.dropdown", relatedTarget));
    }
    return false;
  };
  Dropdown.prototype.keydown = function(e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger("focus");
      return $this.trigger("click");
    }
    var desc = " li:not(.disabled):visible a";
    var $items = $parent.find(".dropdown-menu" + desc);
    if (!$items.length) return;
    var index = $items.index(e.target);
    if (e.which == 38 && index > 0) index--;
    if (e.which == 40 && index < $items.length - 1) index++;
    if (!~index) index = 0;
    $items.eq(index).trigger("focus");
  };
  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data("bs.dropdown");
      if (!data) $this.data("bs.dropdown", data = new Dropdown(this));
      if (typeof option == "string") data[option].call($this);
    });
  }
  var old = $.fn.dropdown;
  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown;
  $.fn.dropdown.noConflict = function() {
    $.fn.dropdown = old;
    return this;
  };
  $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
    e.stopPropagation();
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
       * Weather to report input validation errors to the end user and update focus to the first input that fails validation.
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
    version: "2.0.7"
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
    getClosestMatch(elt, function(e) {
      return !!(closestAttr = getAttributeValueWithDisinheritance(elt, asElement(e), attributeName));
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
          } catch (e) {
            logError(e);
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
  function isType(o, type) {
    return Object.prototype.toString.call(o) === "[object " + type + "]";
  }
  function isFunction(o) {
    return typeof o === "function";
  }
  function isRawObject(o) {
    return isType(o, "Object");
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
      for (let i = 0; i < arr.length; i++) {
        returnArr.push(arr[i]);
      }
    }
    return returnArr;
  }
  function forEach(arr, func) {
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
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
    } catch (e) {
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
      for (let i = 0; i < selector.length; i++) {
        const char = selector[i];
        if (char === "," && chevronsCount === 0) {
          parts.push(selector.substring(offset, i));
          offset = i + 1;
          continue;
        }
        if (char === "<") {
          chevronsCount++;
        } else if (char === "/" && i < selector.length - 1 && selector[i + 1] === ">") {
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
    for (let i = 0; i < results.length; i++) {
      const elt = results[i];
      if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_PRECEDING) {
        return elt;
      }
    }
  };
  var scanBackwardsQuery = function(start, match, global) {
    const results = asParentNode(getRootNode(start, global)).querySelectorAll(match);
    for (let i = results.length - 1; i >= 0; i--) {
      const elt = results[i];
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
    const b = isFunction(arg2);
    return b ? arg2 : arg3;
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
    for (let i = 0; i < extensions2.length; i++) {
      const extension = extensions2[i];
      try {
        if (extension.isInlineSwap(swapStyle)) {
          return true;
        }
      } catch (e) {
        logError(e);
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
    for (let i = 0; i < elt.attributes.length; i++) {
      const attribute = elt.attributes[i];
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
      for (let i = 0; i < internalData.onHandlers.length; i++) {
        const handlerInfo = internalData.onHandlers[i];
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
    settleInfo.elts = settleInfo.elts.filter(function(e) {
      return e !== target;
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
        for (let i = 0; i < extensions2.length; i++) {
          const ext = extensions2[i];
          try {
            const newElements = ext.handleSwap(swapStyle, target, fragment, settleInfo);
            if (newElements) {
              if (Array.isArray(newElements)) {
                for (let j = 0; j < newElements.length; j++) {
                  const child = newElements[j];
                  if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                    settleInfo.tasks.push(makeAjaxLoadTask(child));
                  }
                }
              }
              return;
            }
          } catch (e) {
            logError(e);
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
          for (let i = 0; i < oobSelectValues.length; i++) {
            const oobSelectValue = oobSelectValues[i].split(":", 2);
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
            } catch (e) {
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
    } catch (e) {
      triggerErrorEvent(elt, "htmx:swapError", swapOptions.eventInfo);
      maybeCall(settleReject);
      throw e;
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
      for (let i = 0; i < eventNames.length; i++) {
        triggerEvent(elt, eventNames[i].trim(), []);
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
            } catch (e) {
              triggerErrorEvent(getDocument().body, "htmx:syntax:error", { error: e, source: conditionalSource });
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
      } catch (e) {
        const source = eventFilter.source;
        triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", { error: e, source });
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
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
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
    for (let j = 0; j < attributes.length; j++) {
      const attrName = attributes[j].name;
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
      for (const e in extensions) {
        const extension = extensions[e];
        if (extension.getSelectors) {
          var selectors = extension.getSelectors();
          if (selectors) {
            extensionSelectors.push(selectors);
          }
        }
      }
      const results = elt.querySelectorAll(VERB_SELECTOR + boostedSelector + ", form, [type='submit'], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]" + extensionSelectors.flat().map((s) => ", " + s).join(""));
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
    const listener = function(e) {
      maybeEval(elt, function() {
        if (eltIsDisabled(elt)) {
          return;
        }
        if (!func) {
          func = new Function("event", code);
        }
        func.call(elt, e);
      });
    };
    elt.addEventListener(eventName, listener);
    nodeData.onHandlers.push({ event: eventName, listener });
  }
  function processHxOnWildcard(elt) {
    deInitOnHandlers(elt);
    for (let i = 0; i < elt.attributes.length; i++) {
      const name = elt.attributes[i].name;
      const value = elt.attributes[i].value;
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
      } catch (e) {
        logError(e);
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
  let currentPathForHistory = location.pathname + location.search;
  function setCurrentPathForHistory(path) {
    currentPathForHistory = path;
    if (canAccessLocalStorage()) {
      sessionStorage.setItem("htmx-current-path-for-history", path);
    }
  }
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
    for (let i = 0; i < historyCache.length; i++) {
      if (historyCache[i].url === url) {
        historyCache.splice(i, 1);
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
      } catch (e) {
        triggerErrorEvent(getDocument().body, "htmx:historyCacheError", { cause: e, cache: historyCache });
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
    for (let i = 0; i < historyCache.length; i++) {
      if (historyCache[i].url === url) {
        return historyCache[i];
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
    for (let i = 0; i < processed.length; i++) {
      const node = processed[i];
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
        value.forEach(function(v) {
          formData.append(name, v);
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
        values = values.filter((v) => value.indexOf(v) < 0);
      } else {
        values = values.filter((v) => v !== value);
      }
      formData.delete(name);
      forEach(values, (v) => formData.append(name, v));
    }
  }
  function getValueFromInput(elt) {
    if (elt instanceof HTMLSelectElement && elt.multiple) {
      return toArray(elt.querySelectorAll("option:checked")).map(function(e) {
        return (
          /** @type HTMLOptionElement */
          e.value
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
    const s = encodeURIComponent(realValue);
    returnStr += encodeURIComponent(name) + "=" + s;
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
        for (let i = 0; i < split.length; i++) {
          const value = split[i];
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
          } else if (i == 0) {
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
      } catch (e) {
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
      } catch (e) {
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
            returnPromise: true
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
          obj[key].forEach(function(v) {
            formData.append(key, v);
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
            target.forEach(function(v) {
              formData.append(name, v);
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
        target.forEach(function(v) {
          formData.append(name, v);
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
          value.forEach(function(v) {
            target.append(name, v);
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
      } catch (e) {
        triggerErrorEvent(elt, "htmx:onLoadError", mergeObjects({ error: e }, responseInfo));
        throw e;
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
    const pushUrl = getClosestAttributeValue(elt, "hx-push-url");
    const replaceUrl = getClosestAttributeValue(elt, "hx-replace-url");
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
    for (var i = 0; i < htmx.config.responseHandling.length; i++) {
      var responseHandlingElement = htmx.config.responseHandling[i];
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
      saveCurrentPageToHistory();
      let redirectPath = xhr.getResponseHeader("HX-Location");
      var redirectSwapSpec;
      if (redirectPath.indexOf("{") === 0) {
        redirectSwapSpec = parseJSON(redirectPath);
        redirectPath = redirectSwapSpec.path;
        delete redirectSwapSpec.path;
      }
      ajaxHelper("get", redirectPath, redirectSwapSpec).then(function() {
        pushUrlIntoHistory(redirectPath);
      });
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
      const selectOOB = getClosestAttributeValue(elt, "hx-select-oob");
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
      const target = evt.target;
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
  if (currentOptions.length == newOptions.length && currentOptions.every((v, i) => v == newOptions[i])) {
    return;
  }
  repos.empty();
  newOptions.sort();
  let groups = /* @__PURE__ */ new Map();
  groups.set("/", repos);
  for (let i = 0; i < newOptions.length; i++) {
    let path = newOptions[i].split("/");
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
    (0, import_jquery3.default)(".query-hint code").on("click", function(e) {
      let ext = e.target.textContent;
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
    for (let _ in parms) {
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
    let m = new RegExp("/search/([^/]+)/?").exec(window.location.pathname);
    if (m) backend = m[1];
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
    let e, a = /\+/g, r = /([^&=]+)=?([^&]*)/g, d = (s) => decodeURIComponent(s.replace(a, " ")), q = window.location.search.substring(1);
    while (e = r.exec(q)) {
      if (urlParams.get(d(e[1]))) {
        urlParams[d(e[1])].push(d(e[2]));
      } else {
        urlParams[d(e[1])] = [d(e[2])];
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
function limitToExtension(e) {
  let ext = e.target.textContent;
  let input = htmx_esm_default.find("#searchbox");
  var q = input.value;
  if ((0, import_jquery3.default)("#regex").is(":checked")) {
    q = "file:\\" + ext + "$ " + q;
  } else {
    q = "file:" + ext + " " + q;
  }
  input.value = q;
  htmx_esm_default.trigger("#searchbox", "search");
}
htmx_esm_default.onLoad((target) => {
  htmx_esm_default.findAll(target, ".file-extension").forEach((elt) => elt.onclick = limitToExtension);
});
(0, import_jquery3.default)(() => {
  init2(
    JSON.parse(
      document.getElementById("data").text
    )
  );
});
/*! For license information please see codesearch_ui-H6DYO3F6.js.LEGAL.txt */
//# sourceMappingURL=codesearch_ui-H6DYO3F6.js.map
