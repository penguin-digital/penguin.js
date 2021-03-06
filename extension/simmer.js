var $jscomp = $jscomp || {}
;($jscomp.scope = {}),
  ($jscomp.owns = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
      ? Object.defineProperty
      : function(t, e, n) {
          t != Array.prototype && t != Object.prototype && (t[e] = n.value)
        }),
  ($jscomp.getGlobal = function(t) {
    return 'undefined' != typeof window && window === t
      ? t
      : 'undefined' != typeof global && null != global
        ? global
        : t
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.polyfill = function(t, e, n, r) {
    if (e) {
      for (n = $jscomp.global, t = t.split('.'), r = 0; r < t.length - 1; r++) {
        var o = t[r]
        o in n || (n[o] = {}), (n = n[o])
      }
      ;(t = t[t.length - 1]),
        (r = n[t]),
        (e = e(r)),
        e != r &&
          null != e &&
          $jscomp.defineProperty(n, t, {
            configurable: !0,
            writable: !0,
            value: e
          })
    }
  }),
  $jscomp.polyfill(
    'Object.assign',
    function(t) {
      return (
        t ||
        function(t, e) {
          for (var n = 1; n < arguments.length; n++) {
            var r = arguments[n]
            if (r) for (var o in r) $jscomp.owns(r, o) && (t[o] = r[o])
          }
          return t
        }
      )
    },
    'es6-impl',
    'es3'
  ),
  ($jscomp.SYMBOL_PREFIX = 'jscomp_symbol_'),
  ($jscomp.initSymbol = function() {
    ;($jscomp.initSymbol = function() {}),
      $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
  }),
  ($jscomp.symbolCounter_ = 0),
  ($jscomp.Symbol = function(t) {
    return $jscomp.SYMBOL_PREFIX + (t || '') + $jscomp.symbolCounter_++
  }),
  ($jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol()
    var t = $jscomp.global.Symbol.iterator
    t ||
      (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol('iterator')),
      'function' != typeof Array.prototype[t] &&
        $jscomp.defineProperty(Array.prototype, t, {
          configurable: !0,
          writable: !0,
          value: function() {
            return $jscomp.arrayIterator(this)
          }
        }),
      ($jscomp.initSymbolIterator = function() {})
  }),
  ($jscomp.arrayIterator = function(t) {
    var e = 0
    return $jscomp.iteratorPrototype(function() {
      return e < t.length ? { done: !1, value: t[e++] } : { done: !0 }
    })
  }),
  ($jscomp.iteratorPrototype = function(t) {
    return (
      $jscomp.initSymbolIterator(),
      (t = { next: t }),
      (t[$jscomp.global.Symbol.iterator] = function() {
        return this
      }),
      t
    )
  }),
  $jscomp.polyfill(
    'Array.from',
    function(t) {
      return (
        t ||
        function(t, e, n) {
          $jscomp.initSymbolIterator(),
            (e =
              null != e
                ? e
                : function(t) {
                    return t
                  })
          var r = [],
            o = t[Symbol.iterator]
          if ('function' == typeof o)
            for (t = o.call(t); !(o = t.next()).done; )
              r.push(e.call(n, o.value))
          else for (var o = t.length, i = 0; i < o; i++) r.push(e.call(n, t[i]))
          return r
        }
      )
    },
    'es6-impl',
    'es3'
  ),
  ($jscomp.iteratorFromArray = function(t, e) {
    $jscomp.initSymbolIterator(), t instanceof String && (t += '')
    var n = 0,
      r = {
        next: function() {
          if (n < t.length) {
            var o = n++
            return { value: e(o, t[o]), done: !1 }
          }
          return (
            (r.next = function() {
              return { done: !0, value: void 0 }
            }),
            r.next()
          )
        }
      }
    return (
      (r[Symbol.iterator] = function() {
        return r
      }),
      r
    )
  }),
  $jscomp.polyfill(
    'Array.prototype.keys',
    function(t) {
      return (
        t ||
        function() {
          return $jscomp.iteratorFromArray(this, function(t) {
            return t
          })
        }
      )
    },
    'es6-impl',
    'es3'
  ),
  $jscomp.polyfill(
    'Object.is',
    function(t) {
      return (
        t ||
        function(t, e) {
          return t === e ? 0 !== t || 1 / t == 1 / e : t !== t && e !== e
        }
      )
    },
    'es6-impl',
    'es3'
  ),
  $jscomp.polyfill(
    'Array.prototype.includes',
    function(t) {
      return (
        t ||
        function(t, e) {
          var n = this
          n instanceof String && (n = String(n))
          var r = n.length
          for (e = e || 0; e < r; e++)
            if (n[e] == t || Object.is(n[e], t)) return !0
          return !1
        }
      )
    },
    'es7',
    'es3'
  ),
  ($jscomp.checkStringArgs = function(t, e, n) {
    if (null == t)
      throw new TypeError(
        "The 'this' value for String.prototype." +
          n +
          ' must not be null or undefined'
      )
    if (e instanceof RegExp)
      throw new TypeError(
        'First argument to String.prototype.' +
          n +
          ' must not be a regular expression'
      )
    return t + ''
  }),
  $jscomp.polyfill(
    'String.prototype.includes',
    function(t) {
      return (
        t ||
        function(t, e) {
          return (
            -1 !==
            $jscomp.checkStringArgs(this, t, 'includes').indexOf(t, e || 0)
          )
        }
      )
    },
    'es6-impl',
    'es3'
  ),
  $jscomp.polyfill(
    'Array.prototype.fill',
    function(t) {
      return (
        t ||
        function(t, e, n) {
          var r = this.length || 0
          for (
            0 > e && (e = Math.max(0, r + e)),
              (null == n || n > r) && (n = r),
              n = Number(n),
              0 > n && (n = Math.max(0, r + n)),
              e = Number(e || 0);
            e < n;
            e++
          )
            this[e] = t
          return this
        }
      )
    },
    'es6-impl',
    'es3'
  ),
  (function() {
    function t(t, n) {
      var r = []
      for (t = t[n]; t && 9 !== t.nodeType; )
        1 === t.nodeType && r.push(e(t)), (t = t[n])
      return r
    }
    function e(n) {
      return {
        el: n,
        getClass: function() {
          return this.el.getAttribute('class') || ''
        },
        getClasses: function() {
          return this.getClass()
            .split(' ')
            .map(function(t) {
              return t.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
            })
            .filter(function(t) {
              return 0 < t.length
            })
        },
        prevAll: function() {
          return t(this.el, 'previousSibling')
        },
        nextAll: function() {
          return t(this.el, 'nextSibling')
        },
        parent: function() {
          return this.el.parentNode && 11 !== this.el.parentNode.nodeType
            ? e(this.el.parentNode)
            : null
        }
      }
    }
    function n(t) {
      return 'string' == typeof t && null !== t.match(/^[a-zA-Z0-9]+$/gi) && t
    }
    function r(t) {
      return (
        'string' == typeof t && null !== t.match(/^\.?[a-zA-Z_\-:0-9]*$/gi) && t
      )
    }
    function o(t) {
      var e = void 0 === t ? 'undefined' : T(t)
      return !!t && ('object' == e || 'function' == e)
    }
    function i(t) {
      if ('number' == typeof t) return t
      var e = t
      return 'symbol' == (void 0 === e ? 'undefined' : T(e)) ||
        (e &&
          'object' == (void 0 === e ? 'undefined' : T(e)) &&
          '[object Symbol]' == V.call(e))
        ? R
        : (o(t) &&
            ((t = 'function' == typeof t.valueOf ? t.valueOf() : t),
            (t = o(t) ? t + '' : t)),
          'string' != typeof t
            ? 0 === t
              ? t
              : +t
            : ((t = t.replace(U, '')),
              (e = L.test(t)) || q.test(t)
                ? B(t.slice(2), e ? 2 : 8)
                : z.test(t)
                  ? R
                  : +t))
    }
    function u(t, e, n) {
      switch (n.length) {
        case 0:
          return t.call(e)
        case 1:
          return t.call(e, n[0])
        case 2:
          return t.call(e, n[0], n[1])
        case 3:
          return t.call(e, n[0], n[1], n[2])
      }
      return t.apply(e, n)
    }
    function c(t, e) {
      var n
      if ((n = !(!t || !t.length))) {
        t: if (e !== e)
          e: {
            ;(e = a), (n = t.length)
            for (var r = -1; ++r < n; )
              if (e(t[r], r, t)) {
                t = r
                break e
              }
            t = -1
          }
        else {
          for (n = -1, r = t.length; ++n < r; )
            if (t[n] === e) {
              t = n
              break t
            }
          t = -1
        }
        n = -1 < t
      }
      return n
    }
    function a(t) {
      return t !== t
    }
    function f(t, e) {
      return t.has(e)
    }
    function l(t) {
      var e = !1
      if (null != t && 'function' != typeof t.toString)
        try {
          e = !!(t + '')
        } catch (t) {}
      return e
    }
    function s(t) {
      var e = -1,
        n = t ? t.length : 0
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function p(t) {
      var e = -1,
        n = t ? t.length : 0
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function h(t) {
      var e = -1,
        n = t ? t.length : 0
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function d(t) {
      var e = -1,
        n = t ? t.length : 0
      for (this.__data__ = new h(); ++e < n; ) this.add(t[e])
    }
    function y(t, e) {
      for (var n = t.length; n--; ) {
        var r = t[n][0]
        if (r === e || (r !== r && e !== e)) return n
      }
      return -1
    }
    function v(t, e, n, r, o) {
      var i = -1,
        u = t.length
      for (n || (n = g), o || (o = []); ++i < u; ) {
        var c = t[i]
        if (0 < e && n(c))
          if (1 < e) v(c, e - 1, n, r, o)
          else
            for (var a = o, f = -1, l = c.length, s = a.length; ++f < l; )
              a[s + f] = c[f]
        else r || (o[o.length] = c)
      }
      return o
    }
    function b(t, e) {
      t = t.__data__
      var n = void 0 === e ? 'undefined' : T(e)
      return ('string' == n || 'number' == n || 'symbol' == n || 'boolean' == n
      ? '__proto__' !== e
      : null === e)
        ? t['string' == typeof e ? 'string' : 'hash']
        : t.map
    }
    function _(t, e) {
      return (
        (t = null == t ? void 0 : t[e]),
        (e = !(!A(t) || (Q && Q in t)) && (S(t) || l(t) ? rt : W).test(m(t))),
        e ? t : void 0
      )
    }
    function g(t) {
      var e
      return (
        (e = lt(t)) ||
          (e =
            j(t) &&
            et.call(t, 'callee') &&
            (!ot.call(t, 'callee') || '[object Arguments]' == nt.call(t))),
        e || !!(ut && t && t[ut])
      )
    }
    function m(t) {
      if (null != t) {
        try {
          return tt.call(t)
        } catch (t) {}
        return t + ''
      }
      return ''
    }
    function j(t) {
      var e
      return (
        (e = !!t && 'object' == (void 0 === t ? 'undefined' : T(t))) &&
          ((e = null != t) &&
            ((e = t.length),
            (e =
              'number' == typeof e &&
              -1 < e &&
              0 == e % 1 &&
              9007199254740991 >= e)),
          (e = e && !S(t))),
        e
      )
    }
    function S(t) {
      return (
        '[object Function]' == (t = A(t) ? nt.call(t) : '') ||
        '[object GeneratorFunction]' == t
      )
    }
    function A(t) {
      var e = void 0 === t ? 'undefined' : T(t)
      return !!t && ('object' == e || 'function' == e)
    }
    function $(t, e) {
      return (
        0 <
          st(
            t.getClasses(),
            pt(e, function(t) {
              return t.getClasses()
            })
          ).length || !ht(e).includes(t.el.nodeName)
      )
    }
    function w(t) {
      var e = void 0 === t ? 'undefined' : T(t)
      return !!t && ('object' == e || 'function' == e)
    }
    function O(t) {
      if ('number' == typeof t) return t
      var e = t
      return 'symbol' == (void 0 === e ? 'undefined' : T(e)) ||
        (e &&
          'object' == (void 0 === e ? 'undefined' : T(e)) &&
          '[object Symbol]' == St.call(e))
        ? vt
        : (w(t) &&
            ((t = 'function' == typeof t.valueOf ? t.valueOf() : t),
            (t = w(t) ? t + '' : t)),
          'string' != typeof t
            ? 0 === t
              ? t
              : +t
            : ((t = t.replace(bt, '')),
              (e = gt.test(t)) || mt.test(t)
                ? jt(t.slice(2), e ? 2 : 8)
                : _t.test(t)
                  ? vt
                  : +t))
    }
    function k(t) {
      var e = t.getMethods()
      return {
        finished: function() {
          return 0 === e.length
        },
        next: function() {
          return !this.finished() && e.shift().apply(void 0, arguments)
        }
      }
    }
    function E(t, e) {
      if (0 >= e)
        throw Error('Simmer: An invalid depth of ' + e + ' has been specified')
      return Array(e - 1)
        .fill()
        .reduce(
          function(t, e) {
            return (
              t[t.length - 1].parent() &&
                ((e = t[t.length - 1].parent()), t.push(e)),
              t
            )
          },
          [t]
        )
    }
    function x() {
      return C(
        {},
        Ot,
        0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
      )
    }
    function M() {
      function t(t, e) {
        if (!0 === o.errorHandling) throw t
        'function' == typeof o.errorHandling && o.errorHandling(t, e)
      }
      var n =
          0 < arguments.length && void 0 !== arguments[0]
            ? arguments[0]
            : window,
        r = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        o = x(
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
        ),
        i = r || N(n, o.queryEngine),
        r = function n(r) {
          if (!r)
            return (
              t.call(
                n,
                Error('Simmer: No element was specified for parsing.'),
                r
              ),
              !1
            )
          for (
            var u = new k(yt),
              c = E(e(r), o.depth),
              a = {
                stack: Array(c.length)
                  .fill()
                  .map(function() {
                    return []
                  }),
                specificity: 0
              },
              f = wt(r, o, i, t);
            !u.finished() && !a.verified;

          )
            try {
              ;(a = u.next(c, a, f, o, i)),
                a.specificity >= o.specificityThreshold &&
                  !a.verified &&
                  (a.verified = f(a))
            } catch (e) {
              t.call(n, e, r)
            }
          return (
            (void 0 === a.verified || a.specificity < o.specificityThreshold) &&
              (a.verified = f(a)),
            !!a.verified &&
              (a.verificationDepth ? $t(a, a.verificationDepth) : $t(a))
          )
        }
      return (
        (r.configure = function() {
          var t =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : n,
            e = x(
              C(
                {},
                o,
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : {}
              )
            )
          return M(t, e, N(t, e.queryEngine))
        }),
        r
      )
    }
    var I = {
        querySelectorAll: function() {
          throw Error(
            'An invalid context has been provided to Simmer, it doesnt know how to query it'
          )
        }
      },
      P = function(t) {
        var e =
          'function' == typeof t.querySelectorAll
            ? t
            : t.document
              ? t.document
              : I
        return function(t, n) {
          try {
            return e.querySelectorAll(t)
          } catch (t) {
            n(t)
          }
        }
      },
      N = function(t, e) {
        var n = 'function' == typeof e ? e : P(t)
        return function(e, r) {
          return 'string' != typeof e ? [] : n(e, r, t)
        }
      },
      T =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            },
      C =
        Object.assign ||
        function(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n,
              r = arguments[e]
            for (n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
          }
          return t
        },
      F = (function() {
        return function(t, e) {
          if (Array.isArray(t)) return t
          if (Symbol.iterator in Object(t)) {
            var n = [],
              r = !0,
              o = !1,
              i = void 0
            try {
              for (
                var u, c = t[Symbol.iterator]();
                !(r = (u = c.next()).done) &&
                (n.push(u.value), !e || n.length !== e);
                r = !0
              );
            } catch (t) {
              ;(o = !0), (i = t)
            } finally {
              try {
                !r && c.return && c.return()
              } finally {
                if (o) throw i
              }
            }
            return n
          }
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance'
          )
        }
      })(),
      D = function(t) {
        if (Array.isArray(t)) {
          for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e]
          return n
        }
        return Array.from(t)
      },
      R = NaN,
      U = /^\s+|\s+$/g,
      z = /^[-+]0x[0-9a-f]+$/i,
      L = /^0b[01]+$/i,
      q = /^0o[0-7]+$/i,
      B = parseInt,
      V = Object.prototype.toString,
      G = function(t, e, n) {
        if (!t || !t.length) return []
        n || void 0 === e
          ? (n = 1)
          : ((n = e)
              ? ((n = i(n)),
                (n =
                  n === 1 / 0 || n === -1 / 0
                    ? 1.7976931348623157e308 * (0 > n ? -1 : 1)
                    : n === n
                      ? n
                      : 0))
              : (n = 0 === n ? n : 0),
            (e = n % 1),
            (n = n === n ? (e ? n - e : n) : 0)),
          (e = n),
          (n = 0)
        var r = 0 > e ? 0 : e
        e = -1
        var o = t.length
        for (
          0 > n && (n = -n > o ? 0 : o + n),
            r = r > o ? o : r,
            0 > r && (r += o),
            o = n > r ? 0 : (r - n) >>> 0,
            n >>>= 0,
            r = Array(o);
          ++e < o;

        )
          r[e] = t[e + n]
        return r
      },
      H =
        'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
              ? self
              : {},
      W = /^\[object .+?Constructor\]$/,
      Z = 'object' == T(H) && H && H.Object === Object && H,
      X =
        'object' == ('undefined' == typeof self ? 'undefined' : T(self)) &&
        self &&
        self.Object === Object &&
        self,
      Z = Z || X || Function('return this')(),
      X = Array.prototype,
      Y = Function.prototype,
      J = Object.prototype,
      K = Z['__core-js_shared__'],
      Q = (function() {
        var t = /[^.]+$/.exec((K && K.keys && K.keys.IE_PROTO) || '')
        return t ? 'Symbol(src)_1.' + t : ''
      })(),
      tt = Y.toString,
      et = J.hasOwnProperty,
      nt = J.toString,
      rt = RegExp(
        '^' +
          tt
            .call(et)
            .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      ),
      Y = Z.Symbol,
      ot = J.propertyIsEnumerable,
      it = X.splice,
      ut = Y ? Y.isConcatSpreadable : void 0,
      ct = Math.max,
      at = _(Z, 'Map'),
      ft = _(Object, 'create')
    ;(s.prototype.clear = function() {
      this.__data__ = ft ? ft(null) : {}
    }),
      (s.prototype.delete = function(t) {
        return this.has(t) && delete this.__data__[t]
      }),
      (s.prototype.get = function(t) {
        var e = this.__data__
        return ft
          ? ((t = e[t]), '__lodash_hash_undefined__' === t ? void 0 : t)
          : et.call(e, t)
            ? e[t]
            : void 0
      }),
      (s.prototype.has = function(t) {
        var e = this.__data__
        return ft ? void 0 !== e[t] : et.call(e, t)
      }),
      (s.prototype.set = function(t, e) {
        return (
          (this.__data__[t] =
            ft && void 0 === e ? '__lodash_hash_undefined__' : e),
          this
        )
      }),
      (p.prototype.clear = function() {
        this.__data__ = []
      }),
      (p.prototype.delete = function(t) {
        var e = this.__data__
        return (
          !(0 > (t = y(e, t))) &&
          (t == e.length - 1 ? e.pop() : it.call(e, t, 1), !0)
        )
      }),
      (p.prototype.get = function(t) {
        var e = this.__data__
        return (t = y(e, t)), 0 > t ? void 0 : e[t][1]
      }),
      (p.prototype.has = function(t) {
        return -1 < y(this.__data__, t)
      }),
      (p.prototype.set = function(t, e) {
        var n = this.__data__,
          r = y(n, t)
        return 0 > r ? n.push([t, e]) : (n[r][1] = e), this
      }),
      (h.prototype.clear = function() {
        this.__data__ = { hash: new s(), map: new (at || p)(), string: new s() }
      }),
      (h.prototype.delete = function(t) {
        return b(this, t).delete(t)
      }),
      (h.prototype.get = function(t) {
        return b(this, t).get(t)
      }),
      (h.prototype.has = function(t) {
        return b(this, t).has(t)
      }),
      (h.prototype.set = function(t, e) {
        return b(this, t).set(t, e), this
      }),
      (d.prototype.add = d.prototype.push = function(t) {
        return this.__data__.set(t, '__lodash_hash_undefined__'), this
      }),
      (d.prototype.has = function(t) {
        return this.__data__.has(t)
      })
    var Z = (function(t, e) {
        return (
          (e = ct(void 0 === e ? t.length - 1 : e, 0)),
          function() {
            for (
              var n = arguments, r = -1, o = ct(n.length - e, 0), i = Array(o);
              ++r < o;

            )
              i[r] = n[e + r]
            for (r = -1, o = Array(e + 1); ++r < e; ) o[r] = n[r]
            return (o[e] = i), u(t, this, o)
          }
        )
      })(function(t, e) {
        if (j(t)) {
          e = v(e, 1, j, !0)
          var n = -1,
            r = c,
            o = !0,
            i = t.length,
            u = [],
            a = e.length
          if (i)
            t: for (
              200 <= e.length && ((r = f), (o = !1), (e = new d(e)));
              ++n < i;

            ) {
              var l = t[n],
                s = l,
                l = 0 !== l ? l : 0
              if (o && s === s) {
                for (var p = a; p--; ) if (e[p] === s) continue t
                u.push(l)
              } else r(e, s, void 0) || u.push(l)
            }
          t = u
        } else t = []
        return t
      }),
      lt = Array.isArray,
      st = Z,
      pt = (function(t, e) {
        return (
          (e = { exports: {} }),
          (function(t, e) {
            function n(t, e) {
              for (var n = -1, r = t ? t.length : 0, o = Array(r); ++n < r; )
                o[n] = e(t[n], n, t)
              return o
            }
            function r(t, e) {
              for (var n = -1, r = t ? t.length : 0; ++n < r; )
                if (e(t[n], n, t)) return !0
              return !1
            }
            function o(t) {
              return function(e) {
                return null == e ? void 0 : e[t]
              }
            }
            function i(t) {
              var e = !1
              if (null != t && 'function' != typeof t.toString)
                try {
                  e = !!(t + '')
                } catch (t) {}
              return e
            }
            function u(t) {
              var e = -1,
                n = Array(t.size)
              return (
                t.forEach(function(t, r) {
                  n[++e] = [r, t]
                }),
                n
              )
            }
            function c(t) {
              var e = -1,
                n = Array(t.size)
              return (
                t.forEach(function(t) {
                  n[++e] = t
                }),
                n
              )
            }
            function a(t) {
              var e = -1,
                n = t ? t.length : 0
              for (this.clear(); ++e < n; ) {
                var r = t[e]
                this.set(r[0], r[1])
              }
            }
            function f(t) {
              var e = -1,
                n = t ? t.length : 0
              for (this.clear(); ++e < n; ) {
                var r = t[e]
                this.set(r[0], r[1])
              }
            }
            function l(t) {
              var e = -1,
                n = t ? t.length : 0
              for (this.clear(); ++e < n; ) {
                var r = t[e]
                this.set(r[0], r[1])
              }
            }
            function s(t) {
              var e = -1,
                n = t ? t.length : 0
              for (this.__data__ = new l(); ++e < n; ) this.add(t[e])
            }
            function p(t) {
              this.__data__ = new f(t)
            }
            function h(t, e) {
              for (var n = t.length; n--; ) if (R(t[n][0], e)) return n
              return -1
            }
            function d(t, e, n, r, o) {
              var i = -1,
                u = t.length
              for (n || (n = M), o || (o = []); ++i < u; ) {
                var c = t[i]
                if (0 < e && n(c))
                  if (1 < e) d(c, e - 1, n, r, o)
                  else
                    for (
                      var a = o, f = -1, l = c.length, s = a.length;
                      ++f < l;

                    )
                      a[s + f] = c[f]
                else r || (o[o.length] = c)
              }
              return o
            }
            function y(t, e) {
              e = P(e, t) ? [e] : $(e)
              for (var n = 0, r = e.length; null != t && n < r; )
                t = t[C(e[n++])]
              return n && n == r ? t : void 0
            }
            function v(t, e, n, r, o) {
              if (t === e) return !0
              if (null == t || null == e || (!B(t) && !V(e)))
                return t !== t && e !== e
              t: {
                var u = Gt(t),
                  c = Gt(e),
                  a = '[object Array]',
                  f = '[object Array]'
                u ||
                  ((a = Bt(t)),
                  (a = '[object Arguments]' == a ? '[object Object]' : a)),
                  c ||
                    ((f = Bt(e)),
                    (f = '[object Arguments]' == f ? '[object Object]' : f))
                var l = '[object Object]' == a && !i(t),
                  c = '[object Object]' == f && !i(e)
                if ((f = a == f) && !l)
                  o || (o = new p()),
                    (e =
                      u || Ht(t) ? w(t, e, v, n, r, o) : O(t, e, a, v, n, r, o))
                else {
                  if (
                    !(2 & r) &&
                    ((u = l && _t.call(t, '__wrapped__')),
                    (a = c && _t.call(e, '__wrapped__')),
                    u || a)
                  ) {
                    ;(t = u ? t.value() : t),
                      (e = a ? e.value() : e),
                      o || (o = new p()),
                      (e = v(t, e, n, r, o))
                    break t
                  }
                  if (f) {
                    o || (o = new p())
                    e: {
                      var s,
                        u = 2 & r,
                        a = W(t),
                        c = a.length,
                        f = W(e).length
                      if (c == f || u) {
                        for (l = c; l--; ) {
                          var h = a[l]
                          if (!(u ? h in e : _t.call(e, h))) {
                            e = !1
                            break e
                          }
                        }
                        if ((f = o.get(t)) && o.get(e)) e = f == e
                        else {
                          ;(f = !0), o.set(t, e), o.set(e, t)
                          for (var d = u; ++l < c; ) {
                            h = a[l]
                            var y = t[h],
                              b = e[h]
                            if (
                              (n &&
                                (s = u
                                  ? n(b, y, h, e, t, o)
                                  : n(y, b, h, t, e, o)),
                              void 0 === s ? y !== b && !v(y, b, n, r, o) : !s)
                            ) {
                              f = !1
                              break
                            }
                            d || (d = 'constructor' == h)
                          }
                          f &&
                            !d &&
                            ((n = t.constructor),
                            (r = e.constructor),
                            n != r &&
                              'constructor' in t &&
                              'constructor' in e &&
                              !(
                                'function' == typeof n &&
                                n instanceof n &&
                                'function' == typeof r &&
                                r instanceof r
                              ) &&
                              (f = !1)),
                            o.delete(t),
                            o.delete(e),
                            (e = f)
                        }
                      } else e = !1
                    }
                  } else e = !1
                }
              }
              return e
            }
            function b(t, e, n, r) {
              var o,
                i = n.length,
                u = i,
                c = !r
              if (null == t) return !u
              for (t = Object(t); i--; ) {
                var a = n[i]
                if (c && a[2] ? a[1] !== t[a[0]] : !(a[0] in t)) return !1
              }
              for (; ++i < u; ) {
                a = n[i]
                var f = a[0],
                  l = t[f],
                  s = a[1]
                if (c && a[2]) {
                  if (void 0 === l && !(f in t)) return !1
                } else if (
                  ((a = new p()),
                  r && (o = r(l, s, f, t, e, a)),
                  void 0 === o ? !v(s, l, r, 3, a) : !o)
                )
                  return !1
              }
              return !0
            }
            function _(t) {
              return V(t) && q(t.length) && !!rt[gt.call(t)]
            }
            function g(t, e) {
              var n = -1,
                r = z(t) ? Array(t.length) : []
              return (
                Lt(t, function(t, o, i) {
                  r[++n] = e(t, o, i)
                }),
                r
              )
            }
            function m(t) {
              var e = E(t)
              return 1 == e.length && e[0][2]
                ? N(e[0][0], e[0][1])
                : function(n) {
                    return n === t || b(n, t, e)
                  }
            }
            function j(t, e) {
              return P(t) && e === e && !B(e)
                ? N(C(t), e)
                : function(n) {
                    var r = null == n ? void 0 : y(n, t)
                    if (void 0 === (r = void 0 === r ? void 0 : r) && r === e) {
                      if ((r = null != n)) {
                        ;(r = t), (r = P(r, n) ? [r] : $(r))
                        for (var o, i = -1, u = r.length; ++i < u; ) {
                          var c = C(r[i])
                          if (!(o = null != n && null != n && c in Object(n)))
                            break
                          n = n[c]
                        }
                        o
                          ? (r = o)
                          : ((u = n ? n.length : 0),
                            (r = !!u && q(u) && I(c, u) && (Gt(n) || U(n))))
                      }
                      c = r
                    } else c = v(e, r, void 0, 3)
                    return c
                  }
            }
            function S(t) {
              return function(e) {
                return y(e, t)
              }
            }
            function A(t) {
              if ('string' == typeof t) return t
              if (G(t)) return zt ? zt.call(t) : ''
              var e = t + ''
              return '0' == e && 1 / t == -X ? '-0' : e
            }
            function $(t) {
              return Gt(t) ? t : Vt(t)
            }
            function w(t, e, n, o, i, u) {
              var c,
                a = 2 & i,
                f = t.length,
                l = e.length
              if (f != l && !(a && l > f)) return !1
              if ((l = u.get(t)) && u.get(e)) return l == e
              var l = -1,
                p = !0,
                h = 1 & i ? new s() : void 0
              for (u.set(t, e), u.set(e, t); ++l < f; ) {
                var d = t[l],
                  y = e[l]
                if (
                  (o && (c = a ? o(y, d, l, e, t, u) : o(d, y, l, t, e, u)),
                  void 0 !== c)
                ) {
                  if (c) continue
                  p = !1
                  break
                }
                if (h) {
                  if (
                    !r(e, function(t, e) {
                      if (!h.has(e) && (d === t || n(d, t, o, i, u)))
                        return h.add(e)
                    })
                  ) {
                    p = !1
                    break
                  }
                } else if (d !== y && !n(d, y, o, i, u)) {
                  p = !1
                  break
                }
              }
              return u.delete(t), u.delete(e), p
            }
            function O(t, e, n, r, o, i, a) {
              switch (n) {
                case '[object DataView]':
                  if (
                    t.byteLength != e.byteLength ||
                    t.byteOffset != e.byteOffset
                  )
                    break
                  ;(t = t.buffer), (e = e.buffer)
                case '[object ArrayBuffer]':
                  if (t.byteLength != e.byteLength || !r(new St(t), new St(e)))
                    break
                  return !0
                case '[object Boolean]':
                case '[object Date]':
                case '[object Number]':
                  return R(+t, +e)
                case '[object Error]':
                  return t.name == e.name && t.message == e.message
                case '[object RegExp]':
                case '[object String]':
                  return t == e + ''
                case '[object Map]':
                  var f = u
                case '[object Set]':
                  if ((f || (f = c), t.size != e.size && !(2 & i))) break
                  return (n = a.get(t))
                    ? n == e
                    : ((i |= 1),
                      a.set(t, e),
                      (e = w(f(t), f(e), r, o, i, a)),
                      a.delete(t),
                      e)
                case '[object Symbol]':
                  if (Ut) return Ut.call(t) == Ut.call(e)
              }
              return !1
            }
            function k(t, e) {
              t = t.__data__
              var n = void 0 === e ? 'undefined' : T(e)
              return ('string' == n ||
              'number' == n ||
              'symbol' == n ||
              'boolean' == n
              ? '__proto__' !== e
              : null === e)
                ? t['string' == typeof e ? 'string' : 'hash']
                : t.map
            }
            function E(t) {
              for (var e = W(t), n = e.length; n--; ) {
                var r = e[n],
                  o = t[r]
                e[n] = [r, o, o === o && !B(o)]
              }
              return e
            }
            function x(t, e) {
              return (
                (t = null == t ? void 0 : t[e]),
                (e =
                  !(!B(t) || (vt && vt in t)) &&
                  (L(t) || i(t) ? mt : et).test(F(t))),
                e ? t : void 0
              )
            }
            function M(t) {
              return Gt(t) || U(t) || !!(wt && t && t[wt])
            }
            function I(t, e) {
              return (
                !!(e = null == e ? 9007199254740991 : e) &&
                ('number' == typeof t || nt.test(t)) &&
                -1 < t &&
                0 == t % 1 &&
                t < e
              )
            }
            function P(t, e) {
              if (Gt(t)) return !1
              var n = void 0 === t ? 'undefined' : T(t)
              return (
                !(
                  'number' != n &&
                  'symbol' != n &&
                  'boolean' != n &&
                  null != t &&
                  !G(t)
                ) ||
                (J.test(t) || !Y.test(t) || (null != e && t in Object(e)))
              )
            }
            function N(t, e) {
              return function(n) {
                return (
                  null != n && (n[t] === e && (void 0 !== e || t in Object(n)))
                )
              }
            }
            function C(t) {
              if ('string' == typeof t || G(t)) return t
              var e = t + ''
              return '0' == e && 1 / t == -X ? '-0' : e
            }
            function F(t) {
              if (null != t) {
                try {
                  return bt.call(t)
                } catch (t) {}
                return t + ''
              }
              return ''
            }
            function D(t, e) {
              if ('function' != typeof t || (e && 'function' != typeof e))
                throw new TypeError('Expected a function')
              var n = function n() {
                var r = arguments,
                  o = e ? e.apply(this, r) : r[0],
                  i = n.cache
                return i.has(o)
                  ? i.get(o)
                  : ((r = t.apply(this, r)), (n.cache = i.set(o, r)), r)
              }
              return (n.cache = new (D.Cache || l)()), n
            }
            function R(t, e) {
              return t === e || (t !== t && e !== e)
            }
            function U(t) {
              return (
                V(t) &&
                z(t) &&
                _t.call(t, 'callee') &&
                (!At.call(t, 'callee') || '[object Arguments]' == gt.call(t))
              )
            }
            function z(t) {
              return null != t && q(t.length) && !L(t)
            }
            function L(t) {
              return (
                '[object Function]' == (t = B(t) ? gt.call(t) : '') ||
                '[object GeneratorFunction]' == t
              )
            }
            function q(t) {
              return (
                'number' == typeof t &&
                -1 < t &&
                0 == t % 1 &&
                9007199254740991 >= t
              )
            }
            function B(t) {
              var e = void 0 === t ? 'undefined' : T(t)
              return !!t && ('object' == e || 'function' == e)
            }
            function V(t) {
              return !!t && 'object' == (void 0 === t ? 'undefined' : T(t))
            }
            function G(t) {
              return (
                'symbol' == (void 0 === t ? 'undefined' : T(t)) ||
                (V(t) && '[object Symbol]' == gt.call(t))
              )
            }
            function W(t) {
              if (z(t)) {
                if (Gt(t) || U(t)) {
                  for (
                    var e = t.length, n = String, r = -1, o = Array(e);
                    ++r < e;

                  )
                    o[r] = n(r)
                  e = o
                } else e = []
                var n = e.length,
                  r = !!n
                for (i in t)
                  !_t.call(t, i) ||
                    (r && ('length' == i || I(i, n))) ||
                    e.push(i)
                t = e
              } else {
                var i = t && t.constructor
                if (t === (('function' == typeof i && i.prototype) || dt)) {
                  i = []
                  for (e in Object(t))
                    _t.call(t, e) && 'constructor' != e && i.push(e)
                  t = i
                } else t = Ot(t)
              }
              return t
            }
            function Z(t) {
              return t
            }
            var X = 1 / 0,
              Y = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
              J = /^\w*$/,
              K = /^\./,
              Q = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
              tt = /\\(\\)?/g,
              et = /^\[object .+?Constructor\]$/,
              nt = /^(?:0|[1-9]\d*)$/,
              rt = {}
            ;(rt['[object Float32Array]'] = rt['[object Float64Array]'] = rt[
              '[object Int8Array]'
            ] = rt['[object Int16Array]'] = rt['[object Int32Array]'] = rt[
              '[object Uint8Array]'
            ] = rt['[object Uint8ClampedArray]'] = rt[
              '[object Uint16Array]'
            ] = rt['[object Uint32Array]'] = !0),
              (rt['[object Arguments]'] = rt['[object Array]'] = rt[
                '[object ArrayBuffer]'
              ] = rt['[object Boolean]'] = rt['[object DataView]'] = rt[
                '[object Date]'
              ] = rt['[object Error]'] = rt['[object Function]'] = rt[
                '[object Map]'
              ] = rt['[object Number]'] = rt['[object Object]'] = rt[
                '[object RegExp]'
              ] = rt['[object Set]'] = rt['[object String]'] = rt[
                '[object WeakMap]'
              ] = !1)
            var ot = 'object' == T(H) && H && H.Object === Object && H,
              it =
                'object' ==
                  ('undefined' == typeof self ? 'undefined' : T(self)) &&
                self &&
                self.Object === Object &&
                self,
              ut = ot || it || Function('return this')(),
              ct = e && !e.nodeType && e,
              at = ct && !0 && t && !t.nodeType && t,
              ft = at && at.exports === ct && ot.process
            t: {
              try {
                var lt = ft && ft.binding('util')
                break t
              } catch (t) {}
              lt = void 0
            }
            var st = lt && lt.isTypedArray,
              pt = Array.prototype,
              ht = Function.prototype,
              dt = Object.prototype,
              yt = ut['__core-js_shared__'],
              vt = (function() {
                var t = /[^.]+$/.exec((yt && yt.keys && yt.keys.IE_PROTO) || '')
                return t ? 'Symbol(src)_1.' + t : ''
              })(),
              bt = ht.toString,
              _t = dt.hasOwnProperty,
              gt = dt.toString,
              mt = RegExp(
                '^' +
                  bt
                    .call(_t)
                    .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                    .replace(
                      /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                      '$1.*?'
                    ) +
                  '$'
              ),
              jt = ut.Symbol,
              St = ut.Uint8Array,
              At = dt.propertyIsEnumerable,
              $t = pt.splice,
              wt = jt ? jt.isConcatSpreadable : void 0,
              Ot = (function(t, e) {
                return function(n) {
                  return t(e(n))
                }
              })(Object.keys, Object),
              kt = x(ut, 'DataView'),
              Et = x(ut, 'Map'),
              xt = x(ut, 'Promise'),
              Mt = x(ut, 'Set'),
              It = x(ut, 'WeakMap'),
              Pt = x(Object, 'create'),
              Nt = F(kt),
              Tt = F(Et),
              Ct = F(xt),
              Ft = F(Mt),
              Dt = F(It),
              Rt = jt ? jt.prototype : void 0,
              Ut = Rt ? Rt.valueOf : void 0,
              zt = Rt ? Rt.toString : void 0
            ;(a.prototype.clear = function() {
              this.__data__ = Pt ? Pt(null) : {}
            }),
              (a.prototype.delete = function(t) {
                return this.has(t) && delete this.__data__[t]
              }),
              (a.prototype.get = function(t) {
                var e = this.__data__
                return Pt
                  ? ((t = e[t]), '__lodash_hash_undefined__' === t ? void 0 : t)
                  : _t.call(e, t)
                    ? e[t]
                    : void 0
              }),
              (a.prototype.has = function(t) {
                var e = this.__data__
                return Pt ? void 0 !== e[t] : _t.call(e, t)
              }),
              (a.prototype.set = function(t, e) {
                return (
                  (this.__data__[t] =
                    Pt && void 0 === e ? '__lodash_hash_undefined__' : e),
                  this
                )
              }),
              (f.prototype.clear = function() {
                this.__data__ = []
              }),
              (f.prototype.delete = function(t) {
                var e = this.__data__
                return (
                  !(0 > (t = h(e, t))) &&
                  (t == e.length - 1 ? e.pop() : $t.call(e, t, 1), !0)
                )
              }),
              (f.prototype.get = function(t) {
                var e = this.__data__
                return (t = h(e, t)), 0 > t ? void 0 : e[t][1]
              }),
              (f.prototype.has = function(t) {
                return -1 < h(this.__data__, t)
              }),
              (f.prototype.set = function(t, e) {
                var n = this.__data__,
                  r = h(n, t)
                return 0 > r ? n.push([t, e]) : (n[r][1] = e), this
              }),
              (l.prototype.clear = function() {
                this.__data__ = {
                  hash: new a(),
                  map: new (Et || f)(),
                  string: new a()
                }
              }),
              (l.prototype.delete = function(t) {
                return k(this, t).delete(t)
              }),
              (l.prototype.get = function(t) {
                return k(this, t).get(t)
              }),
              (l.prototype.has = function(t) {
                return k(this, t).has(t)
              }),
              (l.prototype.set = function(t, e) {
                return k(this, t).set(t, e), this
              }),
              (s.prototype.add = s.prototype.push = function(t) {
                return this.__data__.set(t, '__lodash_hash_undefined__'), this
              }),
              (s.prototype.has = function(t) {
                return this.__data__.has(t)
              }),
              (p.prototype.clear = function() {
                this.__data__ = new f()
              }),
              (p.prototype.delete = function(t) {
                return this.__data__.delete(t)
              }),
              (p.prototype.get = function(t) {
                return this.__data__.get(t)
              }),
              (p.prototype.has = function(t) {
                return this.__data__.has(t)
              }),
              (p.prototype.set = function(t, e) {
                var n = this.__data__
                if (n instanceof f) {
                  if (((n = n.__data__), !Et || 199 > n.length))
                    return n.push([t, e]), this
                  n = this.__data__ = new l(n)
                }
                return n.set(t, e), this
              })
            var Lt = (function(t, e) {
                return function(e, n) {
                  if (null == e) return e
                  if (!z(e)) return t(e, n)
                  for (
                    var r = e.length, o = -1, i = Object(e);
                    ++o < r && !1 !== n(i[o], o, i);

                  );
                  return e
                }
              })(function(t, e) {
                return t && qt(t, e, W)
              }),
              qt = (function(t) {
                return function(t, e, n) {
                  var r = -1,
                    o = Object(t)
                  n = n(t)
                  for (var i = n.length; i--; ) {
                    var u = n[++r]
                    if (!1 === e(o[u], u, o)) break
                  }
                  return t
                }
              })(),
              Bt = function(t) {
                return gt.call(t)
              }
            ;((kt && '[object DataView]' != Bt(new kt(new ArrayBuffer(1)))) ||
              (Et && '[object Map]' != Bt(new Et())) ||
              (xt && '[object Promise]' != Bt(xt.resolve())) ||
              (Mt && '[object Set]' != Bt(new Mt())) ||
              (It && '[object WeakMap]' != Bt(new It()))) &&
              (Bt = function(t) {
                var e = gt.call(t)
                if (
                  (t = (t = '[object Object]' == e ? t.constructor : void 0)
                    ? F(t)
                    : void 0)
                )
                  switch (t) {
                    case Nt:
                      return '[object DataView]'
                    case Tt:
                      return '[object Map]'
                    case Ct:
                      return '[object Promise]'
                    case Ft:
                      return '[object Set]'
                    case Dt:
                      return '[object WeakMap]'
                  }
                return e
              })
            var Vt = D(function(t) {
              t = null == t ? '' : A(t)
              var e = []
              return (
                K.test(t) && e.push(''),
                t.replace(Q, function(t, n, r, o) {
                  e.push(r ? o.replace(tt, '$1') : n || t)
                }),
                e
              )
            })
            D.Cache = l
            var Gt = Array.isArray,
              Ht = st
                ? (function(t) {
                    return function(e) {
                      return t(e)
                    }
                  })(st)
                : _
            t.exports = function(t, e) {
              var r = Gt(t) ? n : g
              return (
                (e =
                  'function' == typeof e
                    ? e
                    : null == e
                      ? Z
                      : 'object' == (void 0 === e ? 'undefined' : T(e))
                        ? Gt(e)
                          ? j(e[0], e[1])
                          : m(e)
                        : P(e)
                          ? o(C(e))
                          : S(e)),
                (t = r(t, e)),
                d(t, 1)
              )
            }
          })(e, e.exports),
          e.exports
        )
      })(),
      ht = function(t) {
        return t.map(function(t) {
          return t.el.nodeName
        })
      },
      dt = {
        A: function(t, e) {
          return (
            (e = e.el.getAttribute('href')) &&
              (t.stack[0].push('A[href="' + e + '"]'), (t.specificity += 10)),
            t
          )
        },
        IMG: function(t, e) {
          return (
            (e = e.el.getAttribute('src')) &&
              (t.stack[0].push('IMG[src="' + e + '"]'), (t.specificity += 10)),
            t
          )
        }
      },
      yt = {
        methods: [],
        getMethods: function() {
          return this.methods.slice(0)
        },
        addMethod: function(t) {
          this.methods.push(t)
        }
      }
    yt.addMethod(function(t, e, n, r, o) {
      return t.reduce(function(t, e, i) {
        return t.verified
          ? t
          : ((e = [e.el.getAttribute('id')]
              .filter(function(t) {
                return (t =
                  'string' == typeof t &&
                  null !== t.match(/^[0-9a-zA-Z][a-zA-Z_\-:0-9.]*$/gi) &&
                  t)
              })
              .filter(function(t) {
                return 1 === (o('[id="' + t + '"]') || []).length
              })
              .map(function(e) {
                return (
                  t.stack[i].push("[id='" + e + "']"),
                  (t.specificity += 100),
                  t.specificity >= r.specificityThreshold &&
                    n(t) &&
                    (t.verified = !0),
                  t.verified ||
                    0 !== i ||
                    (t.stack[i].pop(), (t.specificity -= 100)),
                  t
                )
              })),
            F(e, 1)[0] || t)
      }, e)
    }),
      yt.addMethod(function(t, e) {
        return t.reduce(function(t, e, r) {
          return (
            [e.el.nodeName].filter(n).forEach(function(e) {
              t.stack[r].splice(0, 0, e), (t.specificity += 10)
            }),
            t
          )
        }, e)
      }),
      yt.addMethod(function(t, e, n) {
        t = t[0]
        var r = t.el.nodeName
        return (
          dt[r] &&
            ((e = dt[r](e, t)), n(e) ? (e.verified = !0) : e.stack[0].pop()),
          e
        )
      }),
      yt.addMethod(function(t, e) {
        return t.reduce(function(t, e, n) {
          return (
            (e = G(e.getClasses(), 10)
              .filter(r)
              .map(function(t) {
                return '.' + t
              })),
            e.length &&
              (t.stack[n].push(e.join('')), (t.specificity += 10 * e.length)),
            t
          )
        }, e)
      }),
      yt.addMethod(function(t, e, n) {
        return t.reduce(function(t, e, r) {
          if (!t.verified) {
            var o = e.prevAll(),
              i = e.nextAll(),
              u = o.length + 1
            ;(!o.length && !i.length) ||
              $(e, [].concat(D(o), D(i))) ||
              (t.stack[r].push(':nth-child(' + u + ')'), (t.verified = n(t)))
          }
          return t
        }, e)
      })
    var vt = NaN,
      bt = /^\s+|\s+$/g,
      _t = /^[-+]0x[0-9a-f]+$/i,
      gt = /^0b[01]+$/i,
      mt = /^0o[0-7]+$/i,
      jt = parseInt,
      St = Object.prototype.toString,
      At = function(t, e, n) {
        var r = t ? t.length : 0
        if (!r) return []
        n || void 0 === e
          ? (e = 1)
          : (e
              ? ((e = O(e)),
                (e =
                  e === 1 / 0 || e === -1 / 0
                    ? 1.7976931348623157e308 * (0 > e ? -1 : 1)
                    : e === e
                      ? e
                      : 0))
              : (e = 0 === e ? e : 0),
            (n = e % 1),
            (e = e === e ? (n ? e - n : e) : 0)),
          (e = r - e),
          (e = 0 > e ? 0 : e)
        var o = r,
          r = -1
        for (
          n = t.length,
            0 > e && (e = -e > n ? 0 : n + e),
            o = o > n ? n : o,
            0 > o && (o += n),
            n = e > o ? 0 : (o - e) >>> 0,
            e >>>= 0,
            o = Array(n);
          ++r < n;

        )
          o[r] = t[r + e]
        return o
      },
      $t = function(t) {
        var e =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : t.stack.length
        return (
          At(
            t.stack.reduceRight(function(t, e) {
              return e.length ? t.push(e.join('')) : t.length && t.push('*'), t
            }, []),
            e
          ).join(' > ') || '*'
        )
      },
      wt = function(t, e, n, r) {
        var o = e.selectorMaxLength
        return function(e) {
          for (var i = !1, u = 1; u <= e.stack.length && !i; u += 1) {
            if (!(i = $t(e, u).trim()) || !i.length || (o && i.length > o))
              return !1
            ;(i = n(i, r)),
              (i =
                1 === i.length &&
                (void 0 !== t.el ? i[0] === t.el : i[0] === t)) &&
                (e.verificationDepth = u)
          }
          return i
        }
      },
      Ot = {
        queryEngine: null,
        specificityThreshold: 100,
        depth: 3,
        errorHandling: !1,
        selectorMaxLength: 512
      }
    !(function(t, e) {
      var n = t.Simmer
      ;(t.Simmer = e),
        (e.noConflict = function() {
          return (t.Simmer = n), e
        })
    })(window, M(window))
  })()
