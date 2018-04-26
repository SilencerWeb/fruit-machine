!function (n) {
  var e = {};

  function t(r) {
    if (e[r]) return e[r].exports;
    var o = e[r] = { i: r, l: !1, exports: {} };
    return n[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
  }

  t.m = n, t.c = e, t.d = function (n, e, r) {
    t.o(n, e) || Object.defineProperty(n, e, { configurable: !1, enumerable: !0, get: r });
  }, t.r = function (n) {
    Object.defineProperty(n, '__esModule', { value: !0 });
  }, t.n = function (n) {
    var e = n && n.__esModule ? function () {
      return n.default;
    } : function () {
      return n;
    };
    return t.d(e, 'a', e), e;
  }, t.o = function (n, e) {
    return Object.prototype.hasOwnProperty.call(n, e);
  }, t.p = '', t(t.s = 11);
}([function (n, e, t) {
  var r, o, i = {}, a = (r = function () {
    return window && document && document.all && !window.atob;
  }, function () {
    return void 0 === o && (o = r.apply(this, arguments)), o;
  }), u = function (n) {
    var e = {};
    return function (n) {
      if ('function' == typeof n) return n();
      if (void 0 === e[n]) {
        var t = function (n) {
          return document.querySelector(n);
        }.call(this, n);
        if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
          t = t.contentDocument.head;
        } catch (n) {
          t = null;
        }
        e[n] = t;
      }
      return e[n];
    };
  }(), s = null, c = 0, f = [], l = t(5);

  function d(n, e) {
    for (var t = 0; t < n.length; t++) {
      var r = n[t], o = i[r.id];
      if (o) {
        o.refs++;
        for (var a = 0; a < o.parts.length; a++) o.parts[a](r.parts[a]);
        for (; a < r.parts.length; a++) o.parts.push(g(r.parts[a], e))
      } else {
        var u = [];
        for (a = 0; a < r.parts.length; a++) u.push(g(r.parts[a], e));
        i[r.id] = { id: r.id, refs: 1, parts: u };
      }
    }
  }

  function p(n, e) {
    for (var t = [], r = {}, o = 0; o < n.length; o++) {
      var i = n[o], a = e.base ? i[0] + e.base : i[0], u = { css: i[1], media: i[2], sourceMap: i[3] };
      r[a] ? r[a].parts.push(u) : t.push(r[a] = { id: a, parts: [u] });
    }
    return t;
  }

  function h(n, e) {
    var t = u(n.insertInto);
    if (!t) throw new Error('Couldn\'t find a style target. This probably means that the value for the \'insertInto\' parameter is invalid.');
    var r = f[f.length - 1];
    if ('top' === n.insertAt) r ? r.nextSibling ? t.insertBefore(e, r.nextSibling) : t.appendChild(e) : t.insertBefore(e, t.firstChild), f.push(e); else if ('bottom' === n.insertAt) t.appendChild(e); else {
      if ('object' != typeof n.insertAt || !n.insertAt.before) throw new Error('[Style Loader]\n\n Invalid value for parameter \'insertAt\' (\'options.insertAt\') found.\n Must be \'top\', \'bottom\', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n');
      var o = u(n.insertInto + ' ' + n.insertAt.before);
      t.insertBefore(e, o);
    }
  }

  function b(n) {
    if (null === n.parentNode) return !1;
    n.parentNode.removeChild(n);
    var e = f.indexOf(n);
    e >= 0 && f.splice(e, 1);
  }

  function m(n) {
    var e = document.createElement('style');
    return void 0 === n.attrs.type && (n.attrs.type = 'text/css'), v(e, n.attrs), h(n, e), e;
  }

  function v(n, e) {
    Object.keys(e).forEach(function (t) {
      n.setAttribute(t, e[t]);
    });
  }

  function g(n, e) {
    var t, r, o, i;
    if (e.transform && n.css) {
      if (!(i = e.transform(n.css))) return function () {
      };
      n.css = i;
    }
    if (e.singleton) {
      var a = c++;
      t = s || (s = m(e)), r = x.bind(null, t, a, !1), o = x.bind(null, t, a, !0);
    } else n.sourceMap && 'function' == typeof URL && 'function' == typeof URL.createObjectURL && 'function' == typeof URL.revokeObjectURL && 'function' == typeof Blob && 'function' == typeof btoa ? (t = function (n) {
      var e = document.createElement('link');
      return void 0 === n.attrs.type && (n.attrs.type = 'text/css'), n.attrs.rel = 'stylesheet', v(e, n.attrs), h(n, e), e;
    }(e), r = function (n, e, t) {
      var r = t.css, o = t.sourceMap, i = void 0 === e.convertToAbsoluteUrls && o;
      (e.convertToAbsoluteUrls || i) && (r = l(r));
      o && (r += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + ' */');
      var a = new Blob([r], { type: 'text/css' }), u = n.href;
      n.href = URL.createObjectURL(a), u && URL.revokeObjectURL(u);
    }.bind(null, t, e), o = function () {
      b(t), t.href && URL.revokeObjectURL(t.href);
    }) : (t = m(e), r = function (n, e) {
      var t = e.css, r = e.media;
      r && n.setAttribute('media', r);
      if (n.styleSheet) n.styleSheet.cssText = t; else {
        for (; n.firstChild;) n.removeChild(n.firstChild);
        n.appendChild(document.createTextNode(t));
      }
    }.bind(null, t), o = function () {
      b(t);
    });
    return r(n), function (e) {
      if (e) {
        if (e.css === n.css && e.media === n.media && e.sourceMap === n.sourceMap) return;
        r(n = e);
      } else o();
    };
  }

  n.exports = function (n, e) {
    if ('undefined' != typeof DEBUG && DEBUG && 'object' != typeof document) throw new Error('The style-loader cannot be used in a non-browser environment');
    (e = e || {}).attrs = 'object' == typeof e.attrs ? e.attrs : {}, e.singleton || 'boolean' == typeof e.singleton || (e.singleton = a()), e.insertInto || (e.insertInto = 'head'), e.insertAt || (e.insertAt = 'bottom');
    var t = p(n, e);
    return d(t, e), function (n) {
      for (var r = [], o = 0; o < t.length; o++) {
        var a = t[o];
        (u = i[a.id]).refs--, r.push(u);
      }
      n && d(p(n, e), e);
      for (o = 0; o < r.length; o++) {
        var u;
        if (0 === (u = r[o]).refs) {
          for (var s = 0; s < u.parts.length; s++) u.parts[s]();
          delete i[u.id];
        }
      }
    };
  };
  var y, w = (y = [], function (n, e) {
    return y[n] = e, y.filter(Boolean).join('\n');
  });

  function x(n, e, t, r) {
    var o = t ? '' : r.css;
    if (n.styleSheet) n.styleSheet.cssText = w(e, o); else {
      var i = document.createTextNode(o), a = n.childNodes;
      a[e] && n.removeChild(a[e]), a.length ? n.insertBefore(i, a[e]) : n.appendChild(i);
    }
  }
}, function (n, e) {
  n.exports = function (n) {
    var e = [];
    return e.toString = function () {
      return this.map(function (e) {
        var t = function (n, e) {
          var t = n[1] || '', r = n[3];
          if (!r) return t;
          if (e && 'function' == typeof btoa) {
            var o = (a = r, '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + ' */'),
              i = r.sources.map(function (n) {
                return '/*# sourceURL=' + r.sourceRoot + n + ' */';
              });
            return [t].concat(i).concat([o]).join('\n');
          }
          var a;
          return [t].join('\n');
        }(e, n);
        return e[2] ? '@media ' + e[2] + '{' + t + '}' : t;
      }).join('');
    }, e.i = function (n, t) {
      'string' == typeof n && (n = [[null, n, '']]);
      for (var r = {}, o = 0; o < this.length; o++) {
        var i = this[o][0];
        'number' == typeof i && (r[i] = !0);
      }
      for (o = 0; o < n.length; o++) {
        var a = n[o];
        'number' == typeof a[0] && r[a[0]] || (t && !a[2] ? a[2] = t : t && (a[2] = '(' + a[2] + ') and (' + t + ')'), e.push(a));
      }
    }, e;
  };
}, function (n, e, t) {
  'use strict';
  Object.defineProperty(e, '__esModule', { value: !0 }), e.reelsScore = void 0;
  e.reelsScore = {
    wild: [100, 10, 100],
    star: [90, 9, 18],
    bell: [80, 8, 16],
    shell: [70, 7, 14],
    seven: [60, 6, 12],
    cherry: [50, 5, 10],
    bar: [40, 4, 8],
    king: [30, 3, 6],
    queen: [20, 2, 4],
    jack: [10, 1, 2],
  };
}, function (n, e, t) {
  (n.exports = t(1)(!1)).push([n.i, '', '']);
}, function (n, e, t) {
  var r = t(3);
  'string' == typeof r && (r = [[n.i, r, '']]);
  var o = { hmr: !0, transform: void 0, insertInto: void 0 };
  t(0)(r, o);
  r.locals && (n.exports = r.locals);
}, function (n, e) {
  n.exports = function (n) {
    var e = 'undefined' != typeof window && window.location;
    if (!e) throw new Error('fixUrls requires window.location');
    if (!n || 'string' != typeof n) return n;
    var t = e.protocol + '//' + e.host, r = t + e.pathname.replace(/\/[^\/]*$/, '/');
    return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (n, e) {
      var o, i = e.trim().replace(/^"(.*)"$/, function (n, e) {
        return e;
      }).replace(/^'(.*)'$/, function (n, e) {
        return e;
      });
      return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i) ? n : (o = 0 === i.indexOf('//') ? i : 0 === i.indexOf('/') ? t + i : r + i.replace(/^\.\//, ''), 'url(' + JSON.stringify(o) + ')');
    });
  };
}, function (n, e, t) {
  (n.exports = t(1)(!1)).push([n.i, '/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n', '']);
}, function (n, e, t) {
  var r = t(6);
  'string' == typeof r && (r = [[n.i, r, '']]);
  var o = { hmr: !0, transform: void 0, insertInto: void 0 };
  t(0)(r, o);
  r.locals && (n.exports = r.locals);
}, function (n, e) {
  var t;
  t = function () {
    return this;
  }();
  try {
    t = t || Function('return this')() || (0, eval)('this');
  } catch (n) {
    'object' == typeof window && (t = window);
  }
  n.exports = t;
}, function (n, e, t) {
  (function (e) {
    var t = 1 / 0, r = 9007199254740991, o = 1.7976931348623157e308, i = NaN, a = 4294967295, u = '[object Arguments]',
      s = '[object Function]', c = '[object GeneratorFunction]', f = '[object Map]', l = '[object Set]',
      d = '[object String]', p = '[object Symbol]', h = /^\s+|\s+$/g, b = /^[-+]0x[0-9a-f]+$/i, m = /^0b[01]+$/i,
      v = /^\[object .+?Constructor\]$/, g = /^0o[0-7]+$/i, y = /^(?:0|[1-9]\d*)$/, w = '[\\ud800-\\udfff]',
      x = '[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]', j = '\\ud83c[\\udffb-\\udfff]', S = '[^\\ud800-\\udfff]',
      O = '(?:\\ud83c[\\udde6-\\uddff]){2}', R = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      E = '(?:' + x + '|' + j + ')' + '?',
      C = '[\\ufe0e\\ufe0f]?' + E + ('(?:\\u200d(?:' + [S, O, R].join('|') + ')[\\ufe0e\\ufe0f]?' + E + ')*'),
      k = '(?:' + [S + x + '?', x, O, R, w].join('|') + ')', z = RegExp(j + '(?=' + j + ')|' + k + C, 'g'),
      A = RegExp('[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0\\ufe0e\\ufe0f]'), I = parseInt,
      M = 'object' == typeof e && e && e.Object === Object && e,
      L = 'object' == typeof self && self && self.Object === Object && self, U = M || L || Function('return this')();

    function F(n, e) {
      return function (n, e) {
        for (var t = -1, r = n ? n.length : 0, o = Array(r); ++t < r;) o[t] = e(n[t], t, n);
        return o;
      }(e, function (e) {
        return n[e];
      });
    }

    function _(n) {
      var e = -1, t = Array(n.size);
      return n.forEach(function (n, r) {
        t[++e] = [r, n];
      }), t;
    }

    function $(n) {
      var e = -1, t = Array(n.size);
      return n.forEach(function (n) {
        t[++e] = n;
      }), t;
    }

    function T(n) {
      return function (n) {
        return A.test(n);
      }(n) ? function (n) {
        return n.match(z) || [];
      }(n) : function (n) {
        return n.split('');
      }(n);
    }

    var N, P, B, D = Function.prototype, G = Object.prototype, q = U['__core-js_shared__'],
      J = (N = /[^.]+$/.exec(q && q.keys && q.keys.IE_PROTO || '')) ? 'Symbol(src)_1.' + N : '', V = D.toString,
      W = G.hasOwnProperty, H = G.toString,
      K = RegExp('^' + V.call(W).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'),
      Q = U.Symbol, X = Q ? Q.iterator : void 0, Y = G.propertyIsEnumerable, Z = Math.floor,
      nn = (P = Object.keys, B = Object, function (n) {
        return P(B(n));
      }), en = Math.random, tn = vn(U, 'DataView'), rn = vn(U, 'Map'), on = vn(U, 'Promise'), an = vn(U, 'Set'),
      un = vn(U, 'WeakMap'), sn = wn(tn), cn = wn(rn), fn = wn(on), ln = wn(an), dn = wn(un);

    function pn(n, e) {
      var t = jn(n) || function (n) {
        return function (n) {
          return En(n) && Sn(n);
        }(n) && W.call(n, 'callee') && (!Y.call(n, 'callee') || H.call(n) == u);
      }(n) ? function (n, e) {
        for (var t = -1, r = Array(n); ++t < n;) r[t] = e(t);
        return r;
      }(n.length, String) : [], r = t.length, o = !!r;
      for (var i in n) !e && !W.call(n, i) || o && ('length' == i || yn(i, r)) || t.push(i);
      return t;
    }

    function hn(n) {
      return !(!Rn(n) || J && J in n) && (On(n) || function (n) {
        var e = !1;
        if (null != n && 'function' != typeof n.toString) try {
          e = !!(n + '');
        } catch (n) {
        }
        return e;
      }(n) ? K : v).test(wn(n));
    }

    function bn(n) {
      if (t = (e = n) && e.constructor, r = 'function' == typeof t && t.prototype || G, e !== r) return nn(n);
      var e, t, r, o = [];
      for (var i in Object(n)) W.call(n, i) && 'constructor' != i && o.push(i);
      return o;
    }

    function mn(n, e) {
      return n + Z(en() * (e - n + 1));
    }

    function vn(n, e) {
      var t = function (n, e) {
        return null == n ? void 0 : n[e];
      }(n, e);
      return hn(t) ? t : void 0;
    }

    var gn = function (n) {
      return H.call(n);
    };

    function yn(n, e) {
      return !!(e = null == e ? r : e) && ('number' == typeof n || y.test(n)) && n > -1 && n % 1 == 0 && n < e;
    }

    function wn(n) {
      if (null != n) {
        try {
          return V.call(n);
        } catch (n) {
        }
        try {
          return n + '';
        } catch (n) {
        }
      }
      return '';
    }

    function xn(n, e, r) {
      var a, u, s, c = -1, v = function (n) {
        if (!n) return [];
        if (Sn(n)) return function (n) {
          return 'string' == typeof n || !jn(n) && En(n) && H.call(n) == d;
        }(n) ? T(n) : function (n, e) {
          var t = -1, r = n.length;
          for (e || (e = Array(r)); ++t < r;) e[t] = n[t];
          return e;
        }(n);
        if (X && n[X]) return function (n) {
          for (var e, t = []; !(e = n.next()).done;) t.push(e.value);
          return t;
        }(n[X]());
        var e = gn(n);
        return (e == f ? _ : e == l ? $ : Cn)(n);
      }(n), y = v.length, w = y - 1;
      for ((r ? function (n, e, t) {
        if (!Rn(t)) return !1;
        var r = typeof e;
        return !!('number' == r ? Sn(t) && yn(e, t.length) : 'string' == r && e in t) && function (n, e) {
          return n === e || n != n && e != e;
        }(t[e], n);
      }(n, e, r) : void 0 === e) ? e = 1 : (a = function (n) {
        var e = function (n) {
          if (!n) return 0 === n ? n : 0;
          if ((n = function (n) {
              if ('number' == typeof n) return n;
              if (function (n) {
                  return 'symbol' == typeof n || En(n) && H.call(n) == p;
                }(n)) return i;
              if (Rn(n)) {
                var e = 'function' == typeof n.valueOf ? n.valueOf() : n;
                n = Rn(e) ? e + '' : e;
              }
              if ('string' != typeof n) return 0 === n ? n : +n;
              n = n.replace(h, '');
              var t = m.test(n);
              return t || g.test(n) ? I(n.slice(2), t ? 2 : 8) : b.test(n) ? i : +n;
            }(n)) === t || n === -t) {
            var e = n < 0 ? -1 : 1;
            return e * o;
          }
          return n == n ? n : 0;
        }(n), r = e % 1;
        return e == e ? r ? e - r : e : 0;
      }(e), u = 0, s = y, a == a && (void 0 !== s && (a = a <= s ? a : s), void 0 !== u && (a = a >= u ? a : u)), e = a); ++c < e;) {
        var x = mn(c, w), j = v[x];
        v[x] = v[c], v[c] = j;
      }
      return v.length = e, v;
    }

    (tn && '[object DataView]' != gn(new tn(new ArrayBuffer(1))) || rn && gn(new rn) != f || on && '[object Promise]' != gn(on.resolve()) || an && gn(new an) != l || un && '[object WeakMap]' != gn(new un)) && (gn = function (n) {
      var e = H.call(n), t = '[object Object]' == e ? n.constructor : void 0, r = t ? wn(t) : void 0;
      if (r) switch (r) {
        case sn:
          return '[object DataView]';
        case cn:
          return f;
        case fn:
          return '[object Promise]';
        case ln:
          return l;
        case dn:
          return '[object WeakMap]';
      }
      return e;
    });
    var jn = Array.isArray;

    function Sn(n) {
      return null != n && function (n) {
        return 'number' == typeof n && n > -1 && n % 1 == 0 && n <= r;
      }(n.length) && !On(n);
    }

    function On(n) {
      var e = Rn(n) ? H.call(n) : '';
      return e == s || e == c;
    }

    function Rn(n) {
      var e = typeof n;
      return !!n && ('object' == e || 'function' == e);
    }

    function En(n) {
      return !!n && 'object' == typeof n;
    }

    function Cn(n) {
      return n ? F(n, function (n) {
        return Sn(n) ? pn(n) : bn(n);
      }(n)) : [];
    }

    n.exports = function (n) {
      return xn(n, a);
    };
  }).call(this, t(8));
}, function (n, e, t) {
  'use strict';
  Object.defineProperty(e, '__esModule', { value: !0 }), e.getShuffledReelsList = e.getShuffledReel = e.generateRandomNumber = void 0;
  var r, o = (r = t(9)) && r.__esModule ? r : { default: r }, i = t(2);
  e.generateRandomNumber = function () {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
      e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 9;
    return n = Math.ceil(n), e = Math.floor(e), Math.floor(Math.random() * (e - n)) + n;
  };
  var a = function () {
    var n = Object.keys(i.reelsScore);
    return (0, o.default)(n);
  };
  e.getShuffledReel = a;
  e.getShuffledReelsList = function () {
    for (var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3, e = [], t = 0; t < n; t++) e.push(a());
    return e;
  };
}, function (n, e, t) {
  'use strict';
  var r = t(10), o = t(2);
  t(7), t(4);
  var i = new function () {
    this.spin = function (n) {
      return n.map(function () {
        return (0, r.generateRandomNumber)(1, 10);
      });
    }, this.getSpinScore = function (n, e) {
      var t = 0, r = {};
      e.forEach(function (e, t) {
        var o = n[t][e].toLowerCase();
        r[o] = r[o] ? r[o] + 1 : 1;
      });
      var i = Object.keys(r);
      if (1 === i.length) {
        var a = i[0];
        t = o.reelsScore[a][0];
      } else if (2 === i.length) {
        var u = i[0], s = i[1], c = r[u] > r[s] ? u : s;
        t = 'wild' === (r[u] < r[s] ? u : s) ? o.reelsScore[c][2] : o.reelsScore[c][1];
      }
      return t;
    };
  }, a = (0, r.getShuffledReelsList)(), u = i.spin(a);
  console.log(a, u), console.log(i.getSpinScore(a, u));
}]);