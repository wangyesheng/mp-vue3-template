let t = function () {
  return (
    (t =
      Object.assign ||
      function (t) {
        for (var e, i = 1, n = arguments.length; i < n; i++)
          for (const r in (e = arguments[i]))
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
        return t
      }),
    t.apply(this, arguments)
  )
}
function e(t, e, i, n) {
  return new (i || (i = Promise))(function (r, o) {
    function s(t) {
      try {
        a(n.next(t))
      } catch (t) {
        o(t)
      }
    }
    function h(t) {
      try {
        a(n.throw(t))
      } catch (t) {
        o(t)
      }
    }
    function a(t) {
      let e
      t.done
        ? r(t.value)
        : ((e = t.value),
          e instanceof i
            ? e
            : new i(function (t) {
                t(e)
              })).then(s, h)
    }
    a((n = n.apply(t, e || [])).next())
  })
}
function i(t, e) {
  let i
  let n
  let r
  let o
  let s = {
    label: 0,
    sent: function () {
      if (1 & r[0]) throw r[1]
      return r[1]
    },
    trys: [],
    ops: []
  }
  return (
    (o = { next: h(0), throw: h(1), return: h(2) }),
    typeof Symbol == 'function' &&
      (o[Symbol.iterator] = function () {
        return this
      }),
    o
  )
  function h(o) {
    return function (h) {
      return (function (o) {
        if (i) throw new TypeError('Generator is already executing.')
        for (; s; )
          try {
            if (
              ((i = 1),
              n &&
                (r =
                  2 & o[0]
                    ? n.return
                    : o[0]
                      ? n.throw || ((r = n.return) && r.call(n), 0)
                      : n.next) &&
                !(r = r.call(n, o[1])).done)
            )
              return r
            switch (((n = 0), r && (o = [2 & o[0], r.value]), o[0])) {
              case 0:
              case 1:
                r = o
                break
              case 4:
                return s.label++, { value: o[1], done: !1 }
              case 5:
                s.label++, (n = o[1]), (o = [0])
                continue
              case 7:
                (o = s.ops.pop()), s.trys.pop()
                continue
              default:
                if (
                  !((r = s.trys),
                  (r = r.length > 0 && r[r.length - 1]) ||
                    (o[0] !== 6 && o[0] !== 2))
                ) {
                  s = 0
                  continue
                }
                if (o[0] === 3 && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                  s.label = o[1]
                  break
                }
                if (o[0] === 6 && s.label < r[1]) {
                  (s.label = r[1]), (r = o)
                  break
                }
                if (r && s.label < r[2]) {
                  (s.label = r[2]), s.ops.push(o)
                  break
                }
                r[2] && s.ops.pop(), s.trys.pop()
                continue
            }
            o = e.call(t, s)
          } catch (t) {
            (o = [6, t]), (n = 0)
          } finally {
            i = r = 0
          }
        if (5 & o[0]) throw o[1]
        return { value: o[0] ? o[1] : void 0, done: !0 }
      })([o, h])
    }
  }
}
const n = {
  MP_WEIXIN: 'mp-weixin',
  MP_QQ: 'mp-qq',
  MP_ALIPAY: 'mp-alipay',
  MP_BAIDU: 'mp-baidu',
  MP_TOUTIAO: 'mp-toutiao',
  MP_DINGDING: 'mp-dingding',
  H5: 'h5',
  WEB: 'web',
  PLUS: 'plus'
}
const r = ['Top', 'Right', 'Bottom', 'Left']
const o = 'right'
const s = 'bottom'
const h = ['contentSize', 'clientSize', 'borderSize', 'offsetSize']
const a = 'row'
const l = 'column'
const d = { TOP: 'top', MIDDLE: 'middle', BOTTOM: s }
const c = { LEFT: 'left', CENTER: 'center', RIGHT: o }
const f = 'view'
const u = 'text'
const p = 'image'
const g = 'qrcode'
const v = 'block'
const y = 'inline-block'
const x = 'none'
const b = 'flex'
const w = 'absolute'
const m = 'fixed'
const S = {
  display: v,
  color: '#000000',
  lineHeight: '1.4em',
  fontSize: 14,
  fontWeight: 400,
  fontFamily: 'sans-serif',
  lineCap: 'butt',
  flexDirection: a,
  flexWrap: 'nowrap',
  textAlign: 'left',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  position: 'static',
  transformOrigin: ''.concat('center', ' ').concat('center')
}
const z = {
  upx2px: function (t) {
    return (window.innerWidth / 750) * t
  },
  getSystemInfoSync: function () {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    }
  },
  getImageInfo: function (t) {
    const e = t.src
    const i = t.success
    const n = t.fail
    const r = new Image()
    ;(r.onload = function () {
      i({
        width: r.naturalWidth,
        height: r.naturalHeight,
        path: r.src,
        src: e
      })
    }),
      (r.onerror = n),
      (r.src = e)
  }
}
const I =
  typeof window == 'object'
    ? typeof uni == 'undefined' ||
      (typeof uni != 'undefined' && !uni.addInterceptor)
      ? n.WEB
      : n.H5
    : typeof swan == 'object'
      ? n.MP_BAIDU
      : typeof tt == 'object'
        ? n.MP_TOUTIAO
        : typeof plus == 'object'
          ? n.PLUS
          : typeof wx == 'object'
            ? n.MP_WEIXIN
            : void 0
const M =
  I == n.MP_WEIXIN
    ? wx
    : typeof uni != 'undefined'
      ? uni.getImageInfo
        ? {
            upx2px: function (t) {
              return uni.upx2px(t)
            },
            getSystemInfoSync: function () {
              return uni.getSystemInfoSync()
            },
            getImageInfo: function (t) {
              return uni.getImageInfo(t)
            },
            downloadFile: function (t) {
              return uni.downloadFile(t)
            }
          }
        : Object.assign(uni, z)
      : typeof window != 'undefined'
        ? z
        : uni
if (!M.upx2px) {
  const B =
    ((M.getSystemInfoSync && M.getSystemInfoSync()).screenWidth || 375) / 750
  M.upx2px = function (t) {
    return B * t
  }
}
function W(t) {
  return /^-?\d+(\.\d+)?$/.test(t)
}
function k(t, e, i) {
  if (W(t)) return 1 * t
  if (typeof t == 'string') {
    const n = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|vw|vh|px|%)$/g.exec(t)
    if (!t || !n) return 0
    const r = n[3]
    t = parseFloat(t)
    let o = 0
    if (r === 'rpx') o = M.upx2px(t)
    else if (r === 'px') o = 1 * t
    else if (r === '%' && e) o = (t * k(e)) / 100
    else if (r === 'em' && e) o = t * k(e || 14)
    else if (['vw', 'vh'].includes(r)) {
      const s = M.getSystemInfoSync()
      const h = s.screenWidth
      const a = s.screenHeight
      o = (t * (r == 'vw' ? h : a)) / 100
    }
    return 1 * o.toFixed(2)
  }
  return 0
}
function P(t) {
  return /%$/.test(t)
}
function O(t) {
  return /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(rpx|px)$/.test(t)
}
const T = function (t) {
  return !(!t || (!t.startsWith('linear') && !t.startsWith('radial')))
}
const L = function (t, e, i, n, r, o) {
  t.startsWith('linear')
    ? (function (t, e, i, n, r, o) {
        for (
          var s = (function (t, e, i, n, r) {
              void 0 === n && (n = 0)
              void 0 === r && (r = 0)
              const o = t.match(/([-]?\d{1,3})deg/)
              let s = o && o[1] ? parseFloat(o[1]) : 0
              s >= 360 && (s -= 360)
              s < 0 && (s += 360)
              if ((s = Math.round(s)) === 0)
                return {
                  x0: Math.round(e / 2) + n,
                  y0: i + r,
                  x1: Math.round(e / 2) + n,
                  y1: r
                }
              if (s === 180)
                return {
                  x0: Math.round(e / 2) + n,
                  y0: r,
                  x1: Math.round(e / 2) + n,
                  y1: i + r
                }
              if (s === 90)
                return {
                  x0: n,
                  y0: Math.round(i / 2) + r,
                  x1: e + n,
                  y1: Math.round(i / 2) + r
                }
              if (s === 270)
                return {
                  x0: e + n,
                  y0: Math.round(i / 2) + r,
                  x1: n,
                  y1: Math.round(i / 2) + r
                }
              const h = Math.round(
                (180 *
                  Math.asin(e / Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2)))) /
                  Math.PI
              )
              if (s === h) return { x0: n, y0: i + r, x1: e + n, y1: r }
              if (s === 180 - h) return { x0: n, y0: r, x1: e + n, y1: i + r }
              if (s === 180 + h) return { x0: e + n, y0: r, x1: n, y1: i + r }
              if (s === 360 - h) return { x0: e + n, y0: i + r, x1: n, y1: r }
              let a = 0
              let l = 0
              let d = 0
              let c = 0
              if (
                s < h ||
                (s > 180 - h && s < 180) ||
                (s > 180 && s < 180 + h) ||
                s > 360 - h
              ) {
                var f = (s * Math.PI) / 180
                var u = s < h || s > 360 - h ? i / 2 : -i / 2
                var p = Math.tan(f) * u
                var g =
                  s < h || (s > 180 - h && s < 180) ? e / 2 - p : -e / 2 - p
                ;(a = -(d = p + (v = Math.pow(Math.sin(f), 2) * g))),
                  (l = -(c = u + v / Math.tan(f)))
              }
              if (
                (s > h && s < 90) ||
                (s > 90 && s < 90 + h) ||
                (s > 180 + h && s < 270) ||
                (s > 270 && s < 360 - h)
              ) {
                var v
                ;(f = ((90 - s) * Math.PI) / 180),
                  (p =
                    (s > h && s < 90) || (s > 90 && s < 90 + h)
                      ? e / 2
                      : -e / 2),
                  (u = Math.tan(f) * p),
                  (g =
                    (s > h && s < 90) || (s > 270 && s < 360 - h)
                      ? i / 2 - u
                      : -i / 2 - u)
                ;(a = -(d =
                  p + (v = Math.pow(Math.sin(f), 2) * g) / Math.tan(f))),
                  (l = -(c = u + v))
              }
              return (
                (a = Math.round(a + e / 2) + n),
                (l = Math.round(i / 2 - l) + r),
                (d = Math.round(d + e / 2) + n),
                (c = Math.round(i / 2 - c) + r),
                { x0: a, y0: l, x1: d, y1: c }
              )
            })(r, t, e, i, n),
            h = s.x0,
            a = s.y0,
            l = s.x1,
            d = s.y1,
            c = o.createLinearGradient(h, a, l, d),
            f = r.match(/linear-gradient\((.+)\)/)[1],
            u = R(f.substring(f.indexOf(',') + 1)),
            p = 0;
          p < u.colors.length;
          p++
        )
          c.addColorStop(u.percents[p], u.colors[p])
        o.setFillStyle(c)
      })(e, i, n, r, t, o)
    : t.startsWith('radial') &&
      (function (t, e, i, n, r, o) {
        for (
          var s = R(r.match(/radial-gradient\((.+)\)/)[1]),
            h = Math.round(t / 2) + i,
            a = Math.round(e / 2) + n,
            l = o.createRadialGradient(h, a, 0, h, a, Math.max(t, e) / 2),
            d = 0;
          d < s.colors.length;
          d++
        )
          l.addColorStop(s.percents[d], s.colors[d])
        o.setFillStyle(l)
      })(e, i, n, r, t, o)
}
function R(t) {
  for (
    var e = [], i = [], n = 0, r = t.substring(0, t.length - 1).split('%,');
    n < r.length;
    n++
  ) {
    const o = r[n]
    e.push(o.substring(0, o.lastIndexOf(' ')).trim()),
      i.push(o.substring(o.lastIndexOf(' '), o.length) / 100)
  }
  return { colors: e, percents: i }
}
function F(t, e, i) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = i),
    t
  )
}
function A() {
  return (
    (A = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (let e = 1; e < arguments.length; e++) {
            const i = arguments[e]
            for (const n in i)
              Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
          }
          return t
        }),
    A.apply(this, arguments)
  )
}
function j(t, e) {
  return (
    (j = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t
        }),
    j(t, e)
  )
}
function E(t, e) {
  (e == null || e > t.length) && (e = t.length)
  for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i]
  return n
}
function H(t, e) {
  let i =
    (typeof Symbol != 'undefined' && t[Symbol.iterator]) || t['@@iterator']
  if (i) return (i = i.call(t)).next.bind(i)
  if (
    Array.isArray(t) ||
    (i = (function (t, e) {
      if (t) {
        if (typeof t == 'string') return E(t, e)
        let i = Object.prototype.toString.call(t).slice(8, -1)
        return (
          i === 'Object' && t.constructor && (i = t.constructor.name),
          i === 'Map' || i === 'Set'
            ? Array.from(t)
            : i === 'Arguments' ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
              ? E(t, e)
              : void 0
        )
      }
    })(t)) ||
    (e && t && typeof t.length == 'number')
  ) {
    i && (t = i)
    let n = 0
    return function () {
      return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] }
    }
  }
  throw new TypeError(
    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
function C(t) {
  return typeof t == 'number'
}
function D(t) {
  return t === 'auto' || t === null
}
function $(t) {
  return /%$/.test(t)
}
const Y = p
const U = u
const N = f
const X = g
const _ = y
const q = w
const G = m
function V(t) {
  return t.replace(/-([a-z])/g, function (t, e) {
    return e.toUpperCase()
  })
}
function J(t, e) {
  let i
  let n
  const o = (function (t) {
    const e = t.match(/([a-z]+)/)[1]
    return [e, V(t.split(e)[1])]
  })(t)
  const s = o[0]
  const h = o[1]
  const a = e.split(' ')
  if (h) return ((i = {})[s + h] = e), i
  if (a.length && !h) {
    const l = a[0]
    const d = a[1]
    const c = a[2]
    const f = a[3]
    return (
      ((n = {})[s + r[0]] = l),
      (n[s + r[1]] = d || l),
      (n[s + r[2]] = c || l),
      (n[s + r[3]] = f || d || l),
      n
    )
  }
}
function Q(t) {
  t = t.trim()
  for (var e = [], i = '+', n = '', r = t.length, o = 0; o < r; ++o) {
    if (t[o] === '.' || (!isNaN(Number(t[o])) && t[o] !== ' ')) n += t[o]
    else if (t[o] === '(') {
      for (var s = 1, h = o; s > 0; )
        t[(h += 1)] === '(' && (s += 1), t[h] === ')' && (s -= 1)
      ;(n = ''.concat(Q(t.slice(o + 1, h)))), (o = h)
    }
    if ((isNaN(Number(t[o])) && t[o] !== '.') || o === r - 1) {
      const a = parseFloat(n)
      switch (i) {
        case '+':
          e.push(a)
          break
        case '-':
          e.push(-a)
          break
        case '*':
          e.push(e.pop() * a)
          break
        case '/':
          e.push(e.pop() / a)
      }
      (i = t[o]), (n = '')
    }
  }
  for (var l = 0; e.length; ) l += e.pop()
  return l
}
let Z
let K = 0
const et = (function () {
  function t() {
    F(this, 'elements', []),
      F(this, 'afterElements', []),
      F(this, 'beforeElements', []),
      F(this, 'ids', []),
      F(this, 'width', 0),
      F(this, 'height', 0),
      F(this, 'top', 0),
      F(this, 'left', 0),
      F(this, 'pre', null),
      F(this, 'offsetX', 0),
      F(this, 'offsetY', 0),
      K++,
      (this.id = K)
  }
  const e = t.prototype
  return (
    (e.fixedBind = function (t, e) {
      void 0 === e && (e = 0),
        (this.container = e ? t.parent : t.root),
        (this.container.fixedLine = this),
        this.fixedAdd(t)
    }),
    (e.fixedAdd = function (t) {
      if (!this.ids.includes(t.id)) {
        this.ids.push(t.id), this.elements.push(t)
        const e = t.computedStyle.zIndex
        ;(void 0 === e ? 0 : e) >= 0
          ? this.afterElements.push(t)
          : this.beforeElements.push(t),
          this.refreshLayout()
      }
    }),
    (e.bind = function (t) {
      (this.container = t.parent),
        (this.container.line = null),
        this.container.lines
          ? (this.container.lines.push(this),
            (this.pre = this.getPreLine()),
            (this.top = this.pre.top + this.pre.height),
            (this.left = this.container.contentSize.left))
          : ((this.top = this.container.contentSize.top),
            (this.left = this.container.contentSize.left),
            (this.container.lines = [this])),
        (this.isInline = t.isInline()),
        (this.container.line = this),
        (this.outerWidth =
          t.parent && t.parent.contentSize.width
            ? t.parent.contentSize.width
            : 1 / 0),
        this.add(t)
    }),
    (e.getPreLine = function () {
      return this.container.lines[this.container.lines.length - 2]
    }),
    (e.canIEnter = function (t) {
      return (
        !(
          (100 * t.offsetSize.width + 100 * this.width) / 100 >
          this.outerWidth
        ) || (this.closeLine(), !1)
      )
    }),
    (e.closeLine = function () {
      delete this.container.line
    }),
    (e.add = function (t) {
      this.ids.includes(t.id) ||
        (this.ids.push(t.id), this.elements.push(t), this.refreshWidthHeight(t))
    }),
    (e.refreshWidthHeight = function (t) {
      t.offsetSize.height > this.height && (this.height = t.offsetSize.height),
        (this.width += t.offsetSize.width || 0),
        (this.container.lineMaxWidth || 0) < this.width &&
          (this.container.lineMaxWidth = this.width)
    }),
    (e.refreshXAlign = function () {
      if (this.isInline) {
        let t = this.container.contentSize.width - this.width
        const e = this.container.style.textAlign
        e === 'center' ? (t /= 2) : e === 'left' && (t = 0), (this.offsetX = t)
      }
    }),
    (e.getOffsetY = function (t) {
      if (!t || !t.style) return 0
      const e = (t.style || {}).verticalAlign
      return e === s
        ? this.height - t.contentSize.height
        : e === 'middle'
          ? (this.height - t.contentSize.height) / 2
          : 0
    }),
    (e.setIndent = function (t) {
      const e = t.style.textIndent
      if (e && /^calc/.test(e)) {
        const i = /^calc\((.+)\)$/.exec(e)
        if (i && i[1]) {
          const n = i[1].replace(
            /([^\s\(\+\-\*\/]+)\.(left|right|bottom|top|width|height)/g,
            function (e) {
              const i = e.split('.')
              const n = i[0]
              const r = i[1]
              const o = t.parent.querySelector(n)
              if (o && o.offsetSize) {
                const s = {
                  right: o.offsetSize.left + o.offsetSize.width,
                  bottom: o.offsetSize.top + o.offsetSize.height
                }
                return o.offsetSize[r] || s[r] || 0
              }
            }
          )
          const r = Q(
            n.replace(new RegExp(/-?[0-9]+(\.[0-9]+)?(rpx|px|%)/, 'g'), k)
          )
          t.style.textIndent = r
        }
      }
    }),
    (e.layout = function (t, e) {
      const i = this
      this.refreshXAlign(),
        this.pre
          ? ((this.top = this.pre.top + this.pre.height + this.offsetY),
            (this.left = e + this.offsetX))
          : ((this.top =
              Math.max(this.top, this.container.contentSize.top, t) +
              this.offsetY),
            (this.left =
              Math.max(this.left, this.container.contentSize.left, e) +
              this.offsetX)),
        this.elements.forEach(function (t, e) {
          i.setIndent(t)
          const n = i.elements[e - 1]
          const r = i.getOffsetY(t)
          ;(t.style.top = i.top + r),
            (t.style.left = n
              ? n.offsetSize.left + n.offsetSize.width
              : i.left),
            t.getBoxPosition()
        })
    }),
    (e.refreshLayout = function () {
      (this.afterElements = this.afterElements.sort(function (t, e) {
        return t.computedStyle.zIndex - e.computedStyle.zIndex
      })),
        (this.beforeElements = this.beforeElements.sort(function (t, e) {
          return t.computedStyle.zIndex - e.computedStyle.zIndex
        }))
    }),
    t
  )
})()
const it =
  (((Z = {})[a] = {
    width: 'width',
    contentWidth: 'width',
    lineMaxWidth: 'lineMaxWidth',
    left: 'left',
    top: 'top',
    height: 'height',
    lineMaxHeight: 'lineMaxHeight',
    marginLeft: 'marginLeft'
  }),
  (Z[l] = {
    width: 'height',
    contentWidth: 'height',
    lineMaxWidth: 'lineMaxWidth',
    left: 'top',
    top: 'left',
    height: 'width',
    lineMaxHeight: 'lineMaxHeight',
    marginLeft: 'marginTop'
  }),
  Z)
const nt = (function (t) {
  let e, i
  function n() {
    let e
    return (
      F(
        (function (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            )
          return t
        })((e = t.call(this) || this)),
        'outerWidth',
        0
      ),
      (e.exactValue = 0),
      (e.flexTotal = 0),
      (e.width = 0),
      (e.key = null),
      (e.flexDirection = 'row'),
      e
    )
  }
  ;(i = t),
    ((e = n).prototype = Object.create(i.prototype)),
    (e.prototype.constructor = e),
    j(e, i)
  const r = n.prototype
  return (
    (r.bind = function (t) {
      (this.container = t.parent),
        (this.container.line = this),
        this.container.lines
          ? (this.container.lines.push(this),
            (this.pre = this.getPreLine()),
            (this.top = this.pre.top + this.pre.height),
            (this.left = this.container.contentSize.left))
          : ((this.top = this.container.contentSize.top),
            (this.left = this.container.contentSize.left),
            (this.container.lines = [this])),
        t.parent &&
          ((this.flexDirection = t.parent.style.flexDirection),
          (this.key = it[this.flexDirection])),
        this.initHeight(t),
        (this.outerWidth =
          t.parent && t.parent.contentSize[this.key.contentWidth]
            ? t.parent.contentSize[this.key.contentWidth]
            : 1 / 0),
        this.add(t)
    }),
    (r.add = function (t) {
      this.ids.push(t.id)
      const e = t.style.flex
      C(e)
        ? (this.flexTotal += e)
        : C(this.getWidth(t.style)) &&
          (this.exactValue += this.getWidth(t.offsetSize)),
        this.elements.push(t),
        this.refreshWidthHeight(t),
        t.next || this.closeLine()
    }),
    (r.closeLine = function () {
      this.calcFlex()
    }),
    (r.initHeight = function (t) {
      this[this.key.height] = 0
    }),
    (r.getWidth = function (t) {
      return t[this.key.width] || 0
    }),
    (r.getHeight = function (t) {
      return t[this.key.height] || 0
    }),
    (r.setWidth = function (t, e) {
      t[this.key.width] = e
    }),
    (r.setHeight = function (t, e) {
      t[this.key.height] = e
    }),
    (r.calcFlex = function () {
      const t = this
      const e = this.container.contentSize[this.key.contentWidth]
      let i = 0
      this.elements.forEach(function (n) {
        const r = n.style
        const o = n.contentSize
        let s = t.getWidth(r) || t.getWidth(o)
        C(r.flex) && (s = (r.flex / t.flexTotal) * (e - t.exactValue)),
          t.setWidth(n.computedStyle, s),
          (n.isFlexCalc = !0),
          delete n.line,
          delete n.lines,
          delete n.lineMaxWidth,
          n.getBoxWidthHeight(),
          (i = Math.max(i, t.getHeight(n.offsetSize)))
      }),
        this.setHeight(this, i)
    }),
    (r.refreshWidthHeight = function (t) {
      const e = this.container.style.alignItems
      e && !t.style.alignSelf && (t.style.alignSelf = e)
      const i = this.getHeight(t.offsetSize)
      i > this[this.key.height] &&
        (this.container[this.key.lineMaxHeight] = this[this.key.height] = i),
        (this[this.key.width] += this.getWidth(t.offsetSize))
      const n = Math.min(
        this.getWidth(this),
        !this.getWidth(this.container.contentSize) && 1 / 0
      )
      ;(this.container[this.key.lineMaxWidth] || 0) < n &&
        (this.container[this.key.lineMaxWidth] = n)
    }),
    (r.refreshXAlign = function () {
      const t = this
      const e = this.elements.reduce(function (e, i) {
        return e + t.getWidth(i.offsetSize)
      }, 0)
      let i = (this.outerWidth == 1 / 0 ? 0 : this.outerWidth - e) || 0
      const n = this.container.style.justifyContent
      n === 'center'
        ? (i /= 2)
        : n === 'flex-start'
          ? (i = 0)
          : ['space-between', 'space-around'].includes(n) &&
            (!(function (e, i) {
              void 0 === i && (i = 0),
                (i /= t.elements.length + (e ? -1 : 1)),
                t.elements.forEach(function (n, r) {
                  let o
                  ;(e && !r) ||
                    (n.style.margin
                      ? (n.style.margin[t.key.marginLeft] += i)
                      : (n.style.margin =
                          (((o = {})[t.key.marginLeft] = i), o)),
                    n.getBoxPosition())
                }),
                (i = 0)
            })(n == 'space-between', i),
            (i = 0)),
        (this.offsetX = i || 0),
        this.refreshYAlign()
    }),
    (r.refreshYAlign = function () {
      const t = this
      if (this.container.lines.length == 1) return 0
      const e = this.container.lines.reduce(function (e, i) {
        return e + t.getHeight(i)
      }, 0)
      const i = this.container.style.alignItems
      const n = this.getHeight(this.container.contentSize)
      if (i === 'center') {
        const r = (n - e) / (this.container.lines.length + 1)
        this.container.lines.forEach(function (t) {
          t.offsetY = r
        })
      }
      if (i === 'flex-end') {
        const o = n - e
        this.container.lines[0].offsetY = o
      }
    }),
    (r.getOffsetY = function (t) {
      if (this.container.lines.length > 1) return 0
      const e = t.style.alignSelf
      const i = this.getHeight(this.container.contentSize)
      const n = i - this.getHeight(t.offsetSize)
      return e === 'flex-end'
        ? n
        : e === 'center'
          ? n / 2
          : e === 'stretch'
            ? (n &&
                t.name == f &&
                ((t.style[this.key.width] = this.getWidth(t.offsetSize)),
                (t.style[this.key.height] = i),
                delete t.line,
                delete t.lines,
                t.getBoxWidthHeight()),
              0)
            : 0
    }),
    (r.layout = function (t, e) {
      const i = this
      this.refreshXAlign(),
        this.pre
          ? ((this.top = this.pre.top + this.pre.height + this.offsetY),
            (this.left = e + this.offsetX))
          : ((this.top =
              Math.max(this.top, this.container.contentSize.top, t) +
              this.offsetY),
            (this.left =
              Math.max(this.left, this.container.contentSize.left, e) +
              this.offsetX)),
        this.elements.forEach(function (t, e) {
          i.setIndent(t)
          const n = i.elements[e - 1]
          const r = i.getOffsetY(t)
          ;(t.style[i.key.top] = i[i.key.top] + r),
            (t.style[i.key.left] = n
              ? n.offsetSize[i.key.left] + i.getWidth(n.offsetSize)
              : i[i.key.left]),
            t.getBoxPosition()
        })
    }),
    n
  )
})(et)
const rt = p
const ot = u
const st = f
const ht = v
const at = y
const lt = b
const dt = w
const ct = m
let ft = 0
const ut = { left: null, top: null, width: null, height: null }
const pt = new Map()
const gt = (function () {
  function t(t, e, i, n) {
    const o = this
    F(this, 'id', ft++),
      F(this, 'style', { left: null, top: null, width: null, height: null }),
      F(this, 'computedStyle', {}),
      F(this, 'originStyle', {}),
      F(this, 'children', {}),
      F(this, 'layoutBox', A({}, ut)),
      F(this, 'contentSize', A({}, ut)),
      F(this, 'clientSize', A({}, ut)),
      F(this, 'borderSize', A({}, ut)),
      F(this, 'offsetSize', A({}, ut)),
      (this.ctx = n),
      (this.root = i),
      e && (this.parent = e),
      (this.name = t.type || t.name),
      (this.attributes = this.getAttributes(t))
    const s = (function (t, e) {
      let i
      const n = [
        'color',
        'fontSize',
        'lineHeight',
        'verticalAlign',
        'fontWeight',
        'textAlign'
      ]
      const o = t.type
      const s = void 0 === o ? N : o
      const h = t.styles
      const a = void 0 === h ? {} : h
      const l = (e || {}).computedStyle
      const d = Object.assign({}, S)
      if (([U, Y, X].includes(s) && !a.display && (d.display = _), l))
        for (let c = 0; c < n.length; c++) {
          const f = n[c]
          ;(a[f] || l[f]) &&
            (a[f] =
              a[((i = f), i.replace(/([A-Z])/g, '-$1').toLowerCase())] ||
              a[f] ||
              l[f])
        }
      for (
        let u = function (t) {
            let e
            let i
            let n
            let o
            const h = a[t]
            if (
              (/-/.test(t) && ((t = V(t)), (d[t] = h)),
              /^(box|text)?shadow$/i.test(t))
            ) {
              let l = []
              return (
                h.replace(/((-?\d+(rpx|px|vw|vh)?\s+?){3})(.+)/, function () {
                  for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e]
                  l = t[1]
                    .match(/-?\d+(rpx|px|vw|vh)?/g)
                    .map(function (t) {
                      return k(t)
                    })
                    .concat(t[4])
                }),
                /^text/.test(t) ? (d.textShadow = l) : (d.boxShadow = l),
                'continue'
              )
            }
            if (/^border/i.test(t) && !/radius$/i.test(t)) {
              var c = t.match(/^border([BTRLa-z]+)?/)[0]
              const f = t.match(/[W|S|C][a-z]+/)
              var u = h
                .replace(/([\(,])\s+|\s+([\),])/g, '$1$2')
                .split(' ')
                .map(function (t) {
                  return /^\d/.test(t) ? k(t, '') : t
                })
              return (
                d[c] || (d[c] = {}),
                u.length == 1 && f
                  ? (d[c][c + f[0]] = u[0])
                  : (d[c] =
                      (((e = {})[c + 'Width'] = W(u[0]) ? u[0] : 0),
                      (e[c + 'Style'] = u[1] || 'solid'),
                      (e[c + 'Color'] = u[2] || 'black'),
                      e)),
                'continue'
              )
            }
            if (/^background(color)?$/i.test(t))
              return (d.backgroundColor = h), 'continue'
            if (/^objectPosition$/i.test(t))
              return (d[t] = h.split(' ')), 'continue'
            if (/^backgroundPosition$/i.test(t))
              return (d[t] = h.split(' ')), 'continue'
            if (/padding|margin|radius/i.test(t)) {
              const p = /radius$/i.test(t)
              const g = 'borderRadius'
              const v = p ? g : t.match(/[a-z]+/)[0]
              const y = function (t, e) {
                return 'border'.concat(t).concat(e, 'Radius')
              }
              const x = [0, 0, 0, 0].map(function (t, e) {
                return p
                  ? [
                      y(r[0], r[3]),
                      y(r[0], r[1]),
                      y(r[2], r[1]),
                      y(r[2], r[3])
                    ][e]
                  : v + r[e]
              })
              if (
                t === 'padding' ||
                t === 'margin' ||
                /^(border)?radius$/i.test(t)
              ) {
                u = ''
                  .concat(h)
                  .split(' ')
                  .map(function (e) {
                    return /^-?\d+(rpx|px|vh|vw)?$/.test(e)
                      ? k(e)
                      : t != 'margin' && /auto/.test(e)
                        ? 0
                        : e
                  }, []) || [0]
                const b = p ? g : t
                const w = u[0]
                const m = u[1]
                const S = u[2]
                const z = u[3]
                d[b] =
                  (((i = {})[x[0]] = D(w) ? 0 : w),
                  (i[x[1]] = W(m) || D(m) ? m : w),
                  (i[x[2]] = D(W(S) ? S : w) ? 0 : W(S) ? S : w),
                  (i[x[3]] = W(z) ? z : m != null ? m : w),
                  i)
              } else
                typeof d[v] == 'object' ||
                  (d[v] =
                    (((n = {})[x[0]] = d[v] || 0),
                    (n[x[1]] = d[v] || 0),
                    (n[x[2]] = d[v] || 0),
                    (n[x[3]] = d[v] || 0),
                    n)),
                  (d[v][t] = (v == 'margin' && D(h)) || $(h) ? h : k(h))
              return 'continue'
            }
            if (/^transform$/i.test(t))
              return (
                (d[t] = {}),
                h.replace(
                  /([a-zA-Z]+)\(([0-9,-\.%rpxdeg\s]+)\)/g,
                  function (e, i, n) {
                    const r = n.split(',').map(function (t) {
                      return t.replace(/(^\s*)|(\s*$)/g, '')
                    })
                    const o = function (t, e) {
                      return t.includes('deg')
                        ? 1 * t
                        : e && !$(e)
                          ? k(t, e)
                          : t
                    }
                    i.includes('matrix')
                      ? (d[t][i] = r.map(function (t) {
                          return 1 * t
                        }))
                      : i.includes('rotate')
                        ? (d[t][i] = 1 * n.match(/^-?\d+(\.\d+)?/)[0])
                        : /[X, Y]/.test(i)
                          ? (d[t][i] = /[X]/.test(i)
                              ? o(r[0], a.width)
                              : o(r[0], a.height))
                          : ((d[t][i + 'X'] = o(r[0], a.width)),
                            (d[t][i + 'Y'] = o(r[1] || r[0], a.height)))
                  }
                ),
                'continue'
              )
            if (
              (/^font$/i.test(t) && console.warn('font 不支持简写'),
              /^textindent/i.test(t) && (d[t] = /^calc/.test(h) ? h : k(h)),
              /^textstroke/i.test(t))
            ) {
              const I = t.match(/color|width|type$/i)
              const M =
                ((c = 'textStroke'),
                h.split(' ').map(function (t) {
                  return /^\d+(rpx|px|vh|vw)?$/.test(t) ? k(t) : t
                }))
              return (
                I
                  ? d[c]
                    ? (d[c][I[0]] = M[0])
                    : (d[c] = (((o = {})[I[0]] = M[0]), o))
                  : (d[c] = { width: M[0], color: M[1], type: M[2] }),
                'continue'
              )
            }
            /^left|top$/i.test(t) && ![q, G].includes(a.position)
              ? (d[t] = 0)
              : (d[t] = /^-?[\d\.]+(px|rpx|vw|vh)?$/.test(h)
                  ? k(h)
                  : /em$/.test(h) && s == U
                    ? k(h, a.fontSize)
                    : h)
          },
          p = 0,
          g = Object.keys(a);
        p < g.length;
        p++
      )
        u(g[p])
      return d
    })(t, e)
    ;(this.isAbsolute = s.position == dt),
      (this.isFixed = s.position == ct),
      (this.originStyle = s),
      (this.styles = t.styles),
      Object.keys(s).forEach(function (t) {
        Object.defineProperty(o.style, t, {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return s[t]
          },
          set: function (e) {
            s[t] = e
          }
        })
      })
    const h = {
      contentSize: A({}, this.contentSize),
      clientSize: A({}, this.clientSize),
      borderSize: A({}, this.borderSize),
      offsetSize: A({}, this.offsetSize)
    }
    Object.keys(h).forEach(function (t) {
      Object.keys(o[t]).forEach(function (e) {
        Object.defineProperty(o[t], e, {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return h[t][e]
          },
          set: function (i) {
            h[t][e] = i
          }
        })
      })
    }),
      (this.computedStyle = this.style)
  }
  const e = t.prototype
  return (
    (e.add = function (t) {
      (t.parent = this), (this.children[t.id] = t)
    }),
    (e.getChildren = function () {
      const t = this
      return Object.keys(this.children).map(function (e) {
        return t.children[e]
      })
    }),
    (e.prev = function (t) {
      void 0 === t && (t = this)
      const e = t.parent.getChildren()
      return e[
        e.findIndex(function (e) {
          return e.id == t.id
        }) - 1
      ]
    }),
    (e.querySelector = function (t) {
      const e = this.getChildren()
      if (typeof t != 'string') return null
      const i = e.find(function (e) {
        const i = e.id
        const n = e.attributes
        return i == t || (n && n.uid == t)
      })
      return (
        i ||
        (this.parent &&
          this.parent.querySelector &&
          this.parent.querySelector(t)) ||
        null
      )
    }),
    (e.getLineRect = function (t, e) {
      const i = { width: 0, height: 0 }
      const n = e ? e.lines : this.parent && this.parent.lines
      return (
        (n &&
          n.find(function (e) {
            return e.ids.includes(t)
          })) ||
        i
      )
    }),
    (e.setPosition = function (t, e) {
      const i = {
        left: 'width',
        top: 'height',
        right: 'width',
        bottom: 'height'
      }
      Object.keys(i).forEach(function (n) {
        const r = n == o ? 'left' : 'top'
        ;[o, s].includes(n) && void 0 !== t.style[n] && !W(t.originStyle[r])
          ? (t.style[r] = e[i[n]] - t.offsetSize[i[n]] - k(t.style[n], e[i[n]]))
          : (t.style[n] = k(t.style[n], e[i[n]]))
      })
    }),
    (e.getAttributes = function (t) {
      const e = t.attributes
      const i = void 0 === e ? {} : e
      const n = t.uid
      const r = t.url
      const o = t.src
      const s = t.replace
      const h = t.text
      return (
        n && (i.uid = n),
        (r || o) && (i.src = i.src || r || o),
        s && (i.replace = s),
        h && (i.text = h),
        i
      )
    }),
    (e.getOffsetSize = function (t, e, i) {
      void 0 === i && (i = h[3])
      const n = e || {}
      let r = n.margin
      const o = (r = void 0 === r ? {} : r).marginLeft
      const s = void 0 === o ? 0 : o
      const a = r.marginTop
      const l = void 0 === a ? 0 : a
      const d = r.marginRight
      const c = void 0 === d ? 0 : d
      const f = r.marginBottom
      const u = void 0 === f ? 0 : f
      let p = n.padding
      const g = (p = void 0 === p ? {} : p).paddingLeft
      const v = void 0 === g ? 0 : g
      const y = p.paddingTop
      const x = void 0 === y ? 0 : y
      const b = p.paddingRight
      const w = void 0 === b ? 0 : b
      const m = p.paddingBottom
      const S = void 0 === m ? 0 : m
      let z = n.border
      const I = (z = void 0 === z ? {} : z).borderWidth
      const M = void 0 === I ? 0 : I
      let B = n.borderTop
      const W = (B = void 0 === B ? {} : B).borderTopWidth
      const k = void 0 === W ? M : W
      let P = n.borderBottom
      const O = (P = void 0 === P ? {} : P).borderBottomWidth
      const T = void 0 === O ? M : O
      let L = n.borderRight
      const R = (L = void 0 === L ? {} : L).borderRightWidth
      const F = void 0 === R ? M : R
      let A = n.borderLeft
      const j = (A = void 0 === A ? {} : A).borderLeftWidth
      const E = void 0 === j ? M : j
      const H = s < 0 && c < 0 ? Math.abs(s + c) : 0
      const C = l < 0 && u < 0 ? Math.abs(l + u) : 0
      const D = s >= 0 && c < 0
      const $ = l >= 0 && u < 0
      return (
        i == h[0] &&
          ((this[i].left = t.left + s + v + E + (D ? 2 * -c : 0)),
          (this[i].top = t.top + l + x + k + ($ ? 2 * -u : 0)),
          (this[i].width = t.width + (this[i].widthAdd ? 0 : H)),
          (this[i].height = t.height + (this[i].heightAdd ? 0 : C)),
          (this[i].widthAdd = H),
          (this[i].heightAdd = C)),
        i == h[1] &&
          ((this[i].left = t.left + s + E + (D < 0 ? -c : 0)),
          (this[i].top = t.top + l + k + ($ ? -u : 0)),
          (this[i].width = t.width + v + w),
          (this[i].height = t.height + x + S)),
        i == h[2] &&
          ((this[i].left = t.left + s + E / 2 + (D < 0 ? -c : 0)),
          (this[i].top = t.top + l + k / 2 + ($ ? -u : 0)),
          (this[i].width = t.width + v + w + E / 2 + F / 2),
          (this[i].height = t.height + x + S + T / 2 + k / 2)),
        i == h[3] &&
          ((this[i].left = t.left + (D < 0 ? -c : 0)),
          (this[i].top = t.top + ($ ? -u : 0)),
          (this[i].width = t.width + v + w + E + F + s + c),
          (this[i].height = t.height + x + S + T + k + u + l)),
        this[i]
      )
    }),
    (e.layoutBoxUpdate = function (t, e, i, n) {
      const r = this
      if ((void 0 === i && (i = -1), e.boxSizing == 'border-box')) {
        const o = e || {}
        let s = o.border
        const a = (s = void 0 === s ? {} : s).borderWidth
        const l = void 0 === a ? 0 : a
        let d = o.borderTop
        const c = (d = void 0 === d ? {} : d).borderTopWidth
        const f = void 0 === c ? l : c
        let u = o.borderBottom
        const p = (u = void 0 === u ? {} : u).borderBottomWidth
        const g = void 0 === p ? l : p
        let v = o.borderRight
        const y = (v = void 0 === v ? {} : v).borderRightWidth
        const x = void 0 === y ? l : y
        let b = o.borderLeft
        const w = (b = void 0 === b ? {} : b).borderLeftWidth
        const m = void 0 === w ? l : w
        let S = o.padding
        const z = (S = void 0 === S ? {} : S).paddingTop
        const I = void 0 === z ? 0 : z
        const M = S.paddingRight
        const B = void 0 === M ? 0 : M
        const W = S.paddingBottom
        const k = void 0 === W ? 0 : W
        const P = S.paddingLeft
        const O = void 0 === P ? 0 : P
        i || (t.width -= O + B + x + m),
          i !== 1 || n || (t.height -= I + k + f + g)
      }
      this.layoutBox &&
        (h.forEach(function (i) {
          return (r.layoutBox[i] = r.getOffsetSize(t, e, i))
        }),
        (this.layoutBox = Object.assign(
          {},
          this.layoutBox,
          this.layoutBox.borderSize
        )))
    }),
    (e.getBoxPosition = function () {
      const t = this.computedStyle
      const e = this.fixedLine
      const i = this.lines
      const n = t.left
      const r = void 0 === n ? 0 : n
      const o = t.top
      const s = void 0 === o ? 0 : o
      const h = A({}, this.contentSize, { left: r, top: s })
      const a = this.contentSize.top - this.offsetSize.top
      const l = this.contentSize.left - this.offsetSize.left
      if (this.root.fixedLine && !this.root.isDone) {
        this.root.isDone = !0
        for (var d, c = H(this.root.fixedLine.elements); !(d = c()).done; ) {
          const f = d.value
          f.setPosition(f, this.root.offsetSize), f.getBoxPosition()
        }
      }
      if (e)
        for (var u, p = H(e.elements); !(u = p()).done; ) {
          const g = u.value
          const v = A({}, this.borderSize, { left: r, top: s })
          g.setPosition(g, v)
          const y = this.borderSize.top - this.offsetSize.top
          const x = this.borderSize.left - this.offsetSize.left
          ;(g.style.left += r + x), (g.style.top += s + y), g.getBoxPosition()
        }
      if (i)
        for (var b, w = H(i); !(b = w()).done; ) {
          b.value.layout(h.top + a, h.left + l)
        }
      return this.layoutBoxUpdate(h, t), this.layoutBox
    }),
    (e.getBoxState = function (t, e) {
      return this.isBlock(t) || this.isBlock(e)
    }),
    (e.isBlock = function (t) {
      return void 0 === t && (t = this), t && t.style.display == ht
    }),
    (e.isFlex = function (t) {
      return void 0 === t && (t = this), t && t.style.display == lt
    }),
    (e.isInFlow = function () {
      return !(this.isAbsolute || this.isFixed)
    }),
    (e.inFlexBox = function (t) {
      return (
        void 0 === t && (t = this),
        !!t.isInFlow() &&
          !!t.parent &&
          (!(!t.parent || t.parent.style.display !== lt) || void 0)
      )
    }),
    (e.isInline = function (t) {
      return void 0 === t && (t = this), t && t.style.display == at
    }),
    (e.contrastSize = function (t, e, i) {
      let n = t
      return i && (n = Math.min(n, i)), e && (n = Math.max(n, e)), n
    }),
    (e.measureText = function (t, e) {
      const i = this.ctx.measureText(t)
      const n = i.width
      const r = i.actualBoundingBoxAscent
      const o = i.actualBoundingBoxDescent
      return {
        ascent: r,
        descent: o,
        width: n,
        fontHeight: r + o || 0.7 * e + 1
      }
    }),
    (e.getParentSize = function (t, e) {
      if (
        (void 0 === t && (t = this), void 0 === e && (e = !1), t && t.parent)
      ) {
        if (t.parent.contentSize.width) return t.parent.contentSize
        if (e) return this.getParentSize(t.parent, e)
      }
      return null
    }),
    (e.getBoxWidthHeight = function () {
      const t = this
      const e = this.name
      const i = this.computedStyle
      const n = this.attributes
      const r = this.parent
      const o = void 0 === r ? {} : r
      const s = this.ctx
      const h = this.getChildren()
      const a = i.left
      const l = void 0 === a ? 0 : a
      const d = i.top
      const c = void 0 === d ? 0 : d
      const f = i.bottom
      const u = i.right
      const p = i.width
      let g = void 0 === p ? 0 : p
      let v = i.minWidth
      let y = i.maxWidth
      let x = i.minHeight
      let b = i.maxHeight
      const w = i.height
      let m = void 0 === w ? 0 : w
      const S = i.fontSize
      const z = i.fontWeight
      const I = i.fontFamily
      const M = i.fontStyle
      const B = i.position
      i.textIndent
      const W = i.lineClamp
      let P = i.lineHeight
      const O = i.padding
      const T = void 0 === O ? {} : O
      const L = i.margin
      const R = void 0 === L ? {} : L
      let F = i.border
      const A = (F = void 0 === F ? {} : F).borderWidth
      const j = void 0 === A ? 0 : A
      let E = i.borderRight
      const H = (E = void 0 === E ? {} : E).borderRightWidth
      const C = void 0 === H ? j : H
      let Y = i.borderLeft
      const U = (Y = void 0 === Y ? {} : Y).borderLeftWidth
      const N = void 0 === U ? j : U
      const X = o.contentSize && o.contentSize.width
      const _ = o.contentSize && o.contentSize.height
      if (
        ($(g) && X && (g = k(g, X)),
        $(g) && !X && (g = null),
        $(m) && _ && (m = k(m, _)),
        $(m) && !_ && (m = null),
        $(v) && X && (v = k(v, X)),
        $(y) && X && (y = k(y, X)),
        $(x) && _ && (x = k(x, _)),
        $(b) && _ && (b = k(b, _)),
        i.padding && X)
      )
        for (var q in i.padding)
          Object.hasOwnProperty.call(T, q) && (T[q] = k(T[q], X))
      const G = T.paddingRight
      const V = void 0 === G ? 0 : G
      const J = T.paddingLeft
      const Q = void 0 === J ? 0 : J
      if (i.margin && [R.marginLeft, R.marginRight].includes('auto'))
        if (g) {
          const Z = (X && X - g - V - Q - N - C) || 0
          R.marginLeft == R.marginRight
            ? (R.marginLeft = R.marginRight = Z / 2)
            : D(R.marginLeft)
              ? (R.marginLeft = Z)
              : (R.marginRight = Z)
        } else R.marginLeft = R.marginRight = 0
      const K = R.marginRight
      const tt = void 0 === K ? 0 : K
      const it = R.marginLeft
      const ht = { width: g, height: m, left: 0, top: 0 }
      const at = Q + V + N + C + (void 0 === it ? 0 : it) + tt
      if (((this.offsetWidth = at), e == ot && !this.attributes.widths)) {
        let lt = n.text || ''
        s.save(),
          s.setFonts({
            fontFamily: I,
            fontSize: S,
            fontWeight: z,
            fontStyle: M
          }),
          lt.length,
          lt == '\n' && ((lt = ''), (this.isBr = !0)),
          ('' + lt).split('\n').map(function (e) {
            const i = Array.from(e).map(function (e) {
              const i =
                '' + (/^[\u4e00-\u9fa5]+$/.test(e) ? 'cn' : e) + I + S + z + M
              const n = pt.get(i)
              if (n) return { width: n, text: e }
              const r = t.measureText(e, S).width
              return pt.set(i, r), { width: r, text: e }
            })
            const n = t.measureText(e, S)
            const r = n.fontHeight
            const o = n.ascent
            const s = n.descent
            ;(t.attributes.fontHeight = r),
              (t.attributes.ascent = o),
              (t.attributes.descent = s),
              t.attributes.widths || (t.attributes.widths = []),
              t.attributes.widths.push({
                widths: i,
                total: i.reduce(function (t, e) {
                  return t + e.width
                }, 0)
              })
          }),
          s.restore()
      }
      if (e == rt && g == null) {
        const ct = n.width
        const ft = n.height
        ;(ht.width = this.contrastSize(Math.round((ct * m) / ft) || 0, v, y)),
          this.layoutBoxUpdate(ht, i, 0)
      }
      if (e == ot && g == null) {
        const ut = this.attributes.widths
        let gt = Math.max.apply(
          Math,
          ut.map(function (t) {
            return t.total
          })
        )
        if (
          o &&
          X > 0 &&
          (gt > X || this.isBlock(this)) &&
          !this.isAbsolute &&
          !this.isFixed
        )
          gt = X
        ;(ht.width = this.contrastSize(gt, v, y)),
          this.layoutBoxUpdate(ht, i, 0)
      }
      if (e == ot && (o.style.flex || !this.attributes.lines)) {
        let vt = this.attributes.widths.length
        this.attributes.widths.forEach(function (t) {
          return t.widths.reduce(function (t, e, i) {
            return t + e.width > ht.width ? (vt++, e.width) : t + e.width
          }, 0)
        }),
          (vt = W && vt > W ? W : vt),
          (this.attributes.lines = vt)
      }
      if (e == rt && m == null) {
        const yt = n.width
        const xt = n.height
        n.text,
          (ht.height = this.contrastSize(k((ht.width * xt) / yt) || 0, x, b)),
          this.layoutBoxUpdate(ht, i, 1)
      }
      e == ot &&
        m == null &&
        ((P = k(P, S)),
        (ht.height = this.contrastSize(k(this.attributes.lines * P), x, b)),
        this.layoutBoxUpdate(ht, i, 1, !0)),
        !g &&
          o &&
          o.children &&
          X &&
          (!this.isFlex(o) || o.isFlexCalc) &&
          (([st, ot].includes(e) && this.isFlex()) ||
            (e == st && this.isBlock(this) && this.isInFlow())) &&
          ((ht.width = this.contrastSize(X - (o.isFlexCalc ? 0 : at), v, y)),
          this.layoutBoxUpdate(ht, i)),
        g &&
          !$(g) &&
          ((ht.width = this.contrastSize(g, v, y)),
          this.layoutBoxUpdate(ht, i, 0)),
        m &&
          !$(m) &&
          ((ht.height = this.contrastSize(ht.height, x, b)),
          this.layoutBoxUpdate(ht, i, 1))
      let bt = 0
      if (h.length) {
        let wt = null
        let mt = !1
        h.forEach(function (e, n) {
          e.getBoxWidthHeight()
          const r = h[n + 1]
          if (
            (r && r.isInFlow() && (e.next = r),
            !t.line || !t.line.ids.includes(e.id))
          )
            if (e.isInFlow() && !e.inFlexBox()) {
              const o = t.getBoxState(wt, e)
              if (e.isBr) return (mt = !0)
              t.line && t.line.canIEnter(e) && !o && !mt
                ? t.line.add(e)
                : ((mt = !1), new et().bind(e)),
                (wt = e)
            } else
              e.inFlexBox()
                ? t.line && (t.line.canIEnter(e) || i.flexWrap == 'nowrap')
                  ? t.line.add(e)
                  : new nt().bind(e)
                : e.isFixed
                  ? t.root.fixedLine
                    ? t.root.fixedLine.fixedAdd(e)
                    : new et().fixedBind(e)
                  : t.fixedLine
                    ? t.fixedLine.fixedAdd(e)
                    : new et().fixedBind(e, 1)
        }),
          this.lines &&
            (bt = this.lines.reduce(function (t, e) {
              return t + e.height
            }, 0))
      }
      let St = 0
      let zt = 0
      if (!g && (this.isAbsolute || this.isFixed) && X) {
        const It = B == dt ? X : this.root.width
        const Mt = It - ($(l) ? k(l, It) : l) - ($(u) ? k(u, It) : u)
        St = i.left ? Mt : this.lineMaxWidth
      }
      if (!m && (c != null ? c : this.isAbsolute || (this.isFixed && _))) {
        const Bt = B == dt ? _ : this.root.height
        const Wt = Bt - ($(c) ? k(c, Bt) : c) - ($(f) ? k(f, Bt) : f)
        zt = i.top ? Wt : 0
      }
      if (
        ((g && !$(g)) ||
          ht.width ||
          ((ht.width =
            St ||
            this.contrastSize(
              (this.isBlock(this) && !this.isInFlow()
                ? X || o.lineMaxWidth
                : this.lineMaxWidth) || this.lineMaxWidth,
              v,
              y
            )),
          this.layoutBoxUpdate(ht, i, 0)),
        m ||
          (!bt && !zt) ||
          ((ht.height = zt || this.contrastSize(bt, x, b)),
          this.layoutBoxUpdate(ht, i)),
        i.borderRadius && this.borderSize && this.borderSize.width)
      )
        for (var q in i.borderRadius)
          Object.hasOwnProperty.call(i.borderRadius, q) &&
            (i.borderRadius[q] = k(i.borderRadius[q], this.borderSize.width))
      return this.layoutBox
    }),
    (e.layout = function () {
      return (
        this.getBoxWidthHeight(),
        (this.root.offsetSize = this.offsetSize),
        (this.root.contentSize = this.contentSize),
        this.getBoxPosition(),
        this.offsetSize
      )
    }),
    t
  )
})()
const vt = p
const yt = u
const xt = g
const bt = f
const wt = d.TOP
const mt = d.MIDDLE
const St = d.BOTTOM
const zt = c.LEFT
const It = c.CENTER
const Mt = c.RIGHT
const Bt = (function () {
  function r(t) {
    let e
    let i
    const r = this
    ;(this.v = '1.9.5.1'),
      (this.id = null),
      (this.pixelRatio = 1),
      (this.width = 0),
      (this.height = 0),
      (this.sleep = 1e3 / 30),
      (this.count = 0),
      (this.isRate = !1),
      (this.isDraw = !0),
      (this.isCache = !0),
      (this.fixed = ''),
      (this.useCORS = !1),
      (this.performance = !1),
      (this.imageBus = []),
      (this.createImage = function (t, e) {
        return new Promise(function (i, n) {
          let o = null
          window || r.canvas.createImage
            ? ((o =
                r.canvas && r.canvas.createImage
                  ? r.canvas.createImage()
                  : new Image()),
              e && o.setAttribute('crossOrigin', 'Anonymous'),
              (o.src = t),
              (o.onload = function () {
                i({
                  width: o.naturalWidth || o.width,
                  height: o.naturalHeight || o.height,
                  path: o,
                  src: this.src
                })
              }),
              (o.onerror = function (t) {
                n(t)
              }))
            : n({ fail: 'getImageInfo fail', src: t })
        })
      }),
      (this.options = t),
      Object.assign(this, t),
      (this.ctx =
        ((e = t.context),
        (i = {
          get: function (t, i) {
            if (i === 'setFonts')
              return function (t) {
                const i = t.fontFamily
                const r = void 0 === i ? 'sans-serif' : i
                const o = t.fontSize
                const s = void 0 === o ? 14 : o
                const h = t.fontWeight
                let a = void 0 === h ? 'normal' : h
                const l = t.fontStyle
                let d = void 0 === l ? 'normal' : l
                I == n.MP_TOUTIAO &&
                  ((a = a == 'bold' ? 'bold' : ''),
                  (d = d == 'italic' ? 'italic' : '')),
                  (e.font = ''
                    .concat(d, ' ')
                    .concat(a, ' ')
                    .concat(Math.round(s), 'px ')
                    .concat(r))
              }
            if (!e.draw || !e.setFillStyle) {
              if (i === 'setFillStyle')
                return function (t) {
                  e.fillStyle = t
                }
              if (i === 'setStrokeStyle')
                return function (t) {
                  e.strokeStyle = t
                }
              if (i === 'setLineWidth')
                return function (t) {
                  e.lineWidth = t
                }
              if (i === 'setLineCap')
                return function (t) {
                  e.lineCap = t
                }
              if (i === 'setFontSize')
                return function (t) {
                  e.font = ''.concat(String(t), 'px sans-serif')
                }
              if (i === 'setGlobalAlpha')
                return function (t) {
                  e.globalAlpha = t
                }
              if (i === 'setLineJoin')
                return function (t) {
                  e.lineJoin = t
                }
              if (i === 'setTextAlign')
                return function (t) {
                  e.textAlign = t
                }
              if (i === 'setMiterLimit')
                return function (t) {
                  e.miterLimit = t
                }
              if (i === 'setShadow')
                return function (t, i, n, r) {
                  ;(e.shadowOffsetX = t),
                    (e.shadowOffsetY = i),
                    (e.shadowBlur = n),
                    (e.shadowColor = r)
                }
              if (i === 'setTextBaseline')
                return function (t) {
                  e.textBaseline = t
                }
              if (i === 'createCircularGradient') return function () {}
              if (i === 'draw') return function () {}
              if (typeof e[i] == 'function')
                return function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n]
                  return e[i].apply(e, t)
                }
            }
            return t[i]
          },
          set: function (t, i, n) {
            return (e[i] = n), !0
          }
        }),
        new Proxy(e, i))),
      (this.progress = 0),
      (this.root = {
        width: t.width,
        height: t.height,
        fontSizeRate: 1,
        fixedLine: null
      }),
      (this.size = this.root)
    let o = 0
    Object.defineProperty(this, 'progress', {
      configurable: !0,
      set: function (t) {
        ;(o = t), r.lifecycle('onProgress', t / r.count)
      },
      get: function () {
        return o || 0
      }
    })
  }
  return (
    (r.prototype.lifecycle = function (t, e) {
      this.options.listen && this.options.listen[t] && this.options.listen[t](e)
    }),
    (r.prototype.setContext = function (t) {
      t && (this.ctx = t)
    }),
    (r.prototype.init = function () {
      if (this.canvas.height || n.WEB == I) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        const t = this.size.height * this.pixelRatio
        const e = this.size.width * this.pixelRatio
        ;(this.canvas.height = t),
          (this.canvas.width = e),
          this.ctx.scale(this.pixelRatio, this.pixelRatio)
      }
    }),
    (r.prototype.clear = function () {
      this.ctx.clearRect(0, 0, this.size.width, this.size.height)
    }),
    (r.prototype.clipPath = function (t, e, i, n, r, o, s) {
      void 0 === o && (o = !1), void 0 === s && (s = !1)
      const h = this.ctx
      if (/polygon/.test(r)) {
        const a = r.match(/-?\d+(rpx|px|%)?\s+-?\d+(rpx|px|%)?/g) || []
        h.beginPath(),
          a
            .map(function (r) {
              const o = r.split(' ')
              const s = o[0]
              const h = o[1]
              return [k(s, i) + t, k(h, n) + e]
            })
            .forEach(function (t, e) {
              e == 0 ? h.moveTo(t[0], t[1]) : h.lineTo(t[0], t[1])
            }),
          h.closePath(),
          s && h.stroke(),
          o && h.fill()
      }
    }),
    (r.prototype.roundRect = function (t, e, i, n, r, o, s) {
      if ((void 0 === o && (o = !1), void 0 === s && (s = !1), !(r < 0))) {
        const h = this.ctx
        if ((h.beginPath(), r)) {
          const a = r || {}
          const l = a.borderTopLeftRadius
          const d = void 0 === l ? r || 0 : l
          const c = a.borderTopRightRadius
          const f = void 0 === c ? r || 0 : c
          const u = a.borderBottomRightRadius
          const p = void 0 === u ? r || 0 : u
          const g = a.borderBottomLeftRadius
          const v = void 0 === g ? r || 0 : g
          h.arc(t + i - p, e + n - p, p, 0, 0.5 * Math.PI),
            h.lineTo(t + v, e + n),
            h.arc(t + v, e + n - v, v, 0.5 * Math.PI, Math.PI),
            h.lineTo(t, e + d),
            h.arc(t + d, e + d, d, Math.PI, 1.5 * Math.PI),
            h.lineTo(t + i - f, e),
            h.arc(t + i - f, e + f, f, 1.5 * Math.PI, 2 * Math.PI),
            h.lineTo(t + i, e + n - p)
        } else h.rect(t, e, i, n)
        h.closePath(), s && h.stroke(), o && h.fill()
      }
    }),
    (r.prototype.setTransform = function (t, e) {
      const i = e.transform
      let n = e.transformOrigin
      const r = this.ctx
      const o = i || {}
      const s = o.scaleX
      const h = void 0 === s ? 1 : s
      const a = o.scaleY
      const l = void 0 === a ? 1 : a
      const d = o.translateX
      let c = void 0 === d ? 0 : d
      const f = o.translateY
      let u = void 0 === f ? 0 : f
      const p = o.rotate
      const g = void 0 === p ? 0 : p
      const v = o.skewX
      const y = void 0 === v ? 0 : v
      const x = o.skewY
      const b = void 0 === x ? 0 : x
      const w = t.left
      const m = t.top
      const S = t.width
      const z = t.height
      ;(c = k(c, S) || 0), (u = k(u, z) || 0)
      const I = k('0%', 1)
      const M = k('50%', 1)
      const B = k('100%', 1)
      const P = { top: I, center: M, bottom: B }
      const O = { left: I, center: M, right: B }
      if (
        ((n = n
          .split(' ')
          .filter(function (t, e) {
            return e < 2
          })
          .reduce(function (t, e) {
            if (/\d+/.test(e)) {
              const i = k(e, 1) / (/px|rpx$/.test(e) ? (W(t.x) ? z : S) : 1)
              return W(t.x)
                ? Object.assign(t, { y: i })
                : Object.assign(t, { x: i })
            }
            return W(O[e]) && !W(t.x)
              ? Object.assign(t, { x: O[e] })
              : Object.assign(t, { y: P[e] || 0.5 })
          }, {})),
        (c || u) && r.translate(c, u),
        (h || l) && r.scale(h, l),
        g)
      ) {
        const T = w + S * n.x
        const L = m + z * n.y
        r.translate(T, L), r.rotate((g * Math.PI) / 180), r.translate(-T, -L)
      }
      ;(y || b) &&
        r.transform(
          1,
          Math.tan((b * Math.PI) / 180),
          Math.tan((y * Math.PI) / 180),
          1,
          0,
          0
        )
    }),
    (r.prototype.setBackground = function (t, e, i, r, o) {
      const s = this.ctx
      t && t != 'transparent'
        ? T(t)
          ? L(t, e, i, r, o, s)
          : s.setFillStyle(t)
        : [n.MP_TOUTIAO, n.MP_BAIDU].includes(I)
          ? s.setFillStyle('rgba(0,0,0,0)')
          : s.setFillStyle('transparent')
    }),
    (r.prototype.setShadow = function (t) {
      const e = t.boxShadow
      const i = void 0 === e ? [] : e
      const n = this.ctx
      if (i.length) {
        const r = i[0]
        const o = i[1]
        const s = i[2]
        const h = i[3]
        n.setShadow(r, o, s, h)
      }
    }),
    (r.prototype.setBorder = function (t, e) {
      const i = this.ctx
      const n = t.width
      const r = t.height
      const o = t.left
      const s = t.top
      const h = e.border
      const a = e.borderBottom
      const l = e.borderTop
      const d = e.borderRight
      const c = e.borderLeft
      const f = e.borderRadius
      const u = e.lineCap
      const p = h || {}
      const g = p.borderWidth
      const v = void 0 === g ? 0 : g
      const y = p.borderStyle
      const x = p.borderColor
      const b = a || {}
      const w = b.borderBottomWidth
      const m = void 0 === w ? v : w
      const S = b.borderBottomStyle
      const z = void 0 === S ? y : S
      const M = b.borderBottomColor
      const B = void 0 === M ? x : M
      const W = l || {}
      const k = W.borderTopWidth
      const P = void 0 === k ? v : k
      const O = W.borderTopStyle
      const T = void 0 === O ? y : O
      const L = W.borderTopColor
      const R = void 0 === L ? x : L
      const F = d || {}
      const A = F.borderRightWidth
      const j = void 0 === A ? v : A
      const E = F.borderRightStyle
      const H = void 0 === E ? y : E
      const C = F.borderRightColor
      const D = void 0 === C ? x : C
      const $ = c || {}
      const Y = $.borderLeftWidth
      const U = void 0 === Y ? v : Y
      const N = $.borderLeftStyle
      const X = void 0 === N ? y : N
      const _ = $.borderLeftColor
      const q = void 0 === _ ? x : _
      const G = f || {}
      const V = G.borderTopLeftRadius
      const J = void 0 === V ? f || 0 : V
      const Q = G.borderTopRightRadius
      const Z = void 0 === Q ? f || 0 : Q
      const K = G.borderBottomRightRadius
      const tt = void 0 === K ? f || 0 : K
      const et = G.borderBottomLeftRadius
      const it = void 0 === et ? f || 0 : et
      if (a || c || l || d || h) {
        const nt = function (t, e, n) {
          e == 'dashed'
            ? /mp/.test(I)
              ? i.setLineDash([Math.ceil((4 * t) / 3), Math.ceil((4 * t) / 3)])
              : i.setLineDash([Math.ceil(6 * t), Math.ceil(6 * t)])
            : e == 'dotted' && i.setLineDash([t, t]),
            i.setStrokeStyle(n)
        }
        const rt = function (t, e, n, r, o, s, h, a, l, d, c, f, p, g, v) {
          i.save(),
            i.setLineCap(v ? 'square' : u),
            i.setLineWidth(f),
            nt(f, p, g),
            i.beginPath(),
            i.arc(t, e, h, Math.PI * l, Math.PI * d),
            i.lineTo(n, r),
            i.arc(o, s, a, Math.PI * d, Math.PI * c),
            i.stroke(),
            i.restore()
        }
        if ((i.save(), h && !a && !c && !l && !d))
          return (
            i.setLineWidth(v),
            nt(v, y, x),
            this.roundRect(o, s, n, r, f, !1, !!x),
            void i.restore()
          )
        m &&
          rt(
            o + n - tt,
            s + r - tt,
            o + it,
            s + r,
            o + it,
            s + r - it,
            tt,
            it,
            0.25,
            0.5,
            0.75,
            m,
            z,
            B,
            U && j
          ),
          U &&
            rt(
              o + it,
              s + r - it,
              o,
              s + J,
              o + J,
              s + J,
              it,
              J,
              0.75,
              1,
              1.25,
              U,
              X,
              q,
              P && m
            ),
          P &&
            rt(
              o + J,
              s + J,
              o + n - Z,
              s,
              o + n - Z,
              s + Z,
              J,
              Z,
              1.25,
              1.5,
              1.75,
              P,
              T,
              R,
              U && j
            ),
          j &&
            rt(
              o + n - Z,
              s + Z,
              o + n,
              s + r - tt,
              o + n - tt,
              s + r - tt,
              Z,
              tt,
              1.75,
              2,
              0.25,
              j,
              H,
              D,
              P && m
            )
      }
    }),
    (r.prototype.setOpacity = function (t) {
      const e = t.opacity
      const i = void 0 === e ? 1 : e
      this.ctx.setGlobalAlpha(i)
    }),
    (r.prototype.drawPattern = function (t, n, r) {
      return e(this, void 0, void 0, function () {
        const e = this
        return i(this, function (i) {
          return [
            2,
            new Promise(function (i, o) {
              e.drawView(n, r, !0, !1, !0)
              const s = e
              const h = s.ctx
              s.canvas
              const a = n.width
              const l = n.height
              const d = n.left
              const c = n.top
              const f = r || {}
              const u = f.borderRadius
              const p = void 0 === u ? 0 : u
              const g = f.backgroundImage
              const v = f.backgroundRepeat
              const y = void 0 === v ? 'repeat' : v
              g &&
                (function (t) {
                  const o = h.createPattern(t.src, y)
                  h.setFillStyle(o),
                    e.roundRect(d, c, a, l, p, !0, !1),
                    e.setBorder(n, r),
                    i()
                })(t)
            })
          ]
        })
      })
    }),
    (r.prototype.drawView = function (t, e, i, n, r) {
      void 0 === i && (i = !0),
        void 0 === n && (n = !0),
        void 0 === r && (r = !0)
      const o = this.ctx
      const s = t.width
      const h = t.height
      const a = t.left
      const l = t.top
      const d = e || {}
      const c = d.borderRadius
      const f = void 0 === c ? 0 : c
      const u = d.backgroundColor
      const p = void 0 === u ? 'transparent' : u
      const g = d.overflow
      e.opacity && this.setOpacity(e),
        this.setTransform(t, e),
        r && (o.save(), this.setShadow(e)),
        i && this.setBackground(p, s, h, a, l),
        e.clipPath
          ? this.clipPath(a, l, s, h, e.clipPath, i, !1)
          : this.roundRect(a, l, s, h, f, i, !1),
        r && o.restore(),
        n && this.setBorder(t, e),
        g == 'hidden' && o.clip()
    }),
    (r.prototype.drawImage = function (t, r, o, s) {
      return (
        void 0 === r && (r = {}),
        void 0 === o && (o = {}),
        void 0 === s && (s = !0),
        e(this, void 0, void 0, function () {
          const h = this
          return i(this, function (a) {
            switch (a.label) {
              case 0:
                return [
                  4,
                  new Promise(function (a, l) {
                    return e(h, void 0, void 0, function () {
                      let e
                      let h
                      let l
                      let d
                      let c
                      let f
                      let u
                      let p
                      let g
                      let v
                      let y
                      let x
                      let b
                      let w
                      let m
                      let S
                      let z
                      let M
                      let B
                      let W
                      let T
                      const L = this
                      return i(this, function (i) {
                        return (
                          (e = this.ctx),
                          (h = o.borderRadius),
                          (l = void 0 === h ? 0 : h),
                          (d = o.backgroundColor),
                          (c = void 0 === d ? 'transparent' : d),
                          (f = o.objectFit),
                          (u = void 0 === f ? 'fill' : f),
                          (p = o.backgroundSize),
                          (g = void 0 === p ? 'fill' : p),
                          (v = o.objectPosition),
                          (y = o.backgroundPosition),
                          (x = o.boxShadow),
                          o.backgroundImage && ((u = g), (v = y)),
                          x &&
                            this.drawView(
                              r,
                              Object.assign(o, {
                                backgroundColor: c || (x && (c || '#ffffff'))
                              }),
                              !0,
                              !1,
                              !0
                            ),
                          (b = r.width),
                          (w = r.height),
                          (m = r.left),
                          (S = r.top),
                          e.save(),
                          (z = r.contentSize.left - r.borderSize.left),
                          (M = r.contentSize.top - r.borderSize.top),
                          s ||
                            (this.setOpacity(o),
                            this.setTransform(r, o),
                            this.setBackground(c, b, w, m, S),
                            this.roundRect(
                              m,
                              S,
                              b,
                              w,
                              l,
                              !!(l || (!x && c)),
                              !1
                            )),
                          (m += z),
                          (S += M),
                          e.clip(),
                          (B = function (t) {
                            if (u !== 'fill') {
                              const i = (function (t, e, i) {
                                const n = t.objectFit
                                const r = t.objectPosition
                                const o = e.width / e.height
                                const s = i.width / i.height
                                let h = 1
                                const a = 'contain'
                                const l = 'cover'
                                ;(n == a && o >= s) || (n == l && o < s)
                                  ? (h = e.height / i.height)
                                  : ((n == a && o < s) || (n == l && o >= s)) &&
                                    (h = e.width / i.width)
                                const d = i.width * h
                                const c = i.height * h
                                const f = r || []
                                const u = f[0]
                                const p = f[1]
                                const g = O(u)
                                  ? k(u, e.width)
                                  : (e.width - d) *
                                    (P(u)
                                      ? k(u, 1)
                                      : {
                                          left: 0,
                                          center: 0.5,
                                          right: 1
                                        }[u || 'center'])
                                const v = O(p)
                                  ? k(p, e.height)
                                  : (e.height - c) *
                                    (P(p)
                                      ? k(p, 1)
                                      : {
                                          top: 0,
                                          center: 0.5,
                                          bottom: 1
                                        }[p || 'center'])
                                const y = function (t, e) {
                                  return [(t - g) / h, (e - v) / h]
                                }
                                const x = y(0, 0)
                                const b = x[0]
                                const w = x[1]
                                const m = y(e.width, e.height)
                                const S = m[0]
                                const z = m[1]
                                const I = Math.max
                                const M = Math.min
                                return {
                                  sx: I(b, 0),
                                  sy: I(w, 0),
                                  sw: M(S - b, i.width),
                                  sh: M(z - w, i.height),
                                  dx: I(g, 0),
                                  dy: I(v, 0),
                                  dw: M(d, e.width),
                                  dh: M(c, e.height)
                                }
                              })(
                                { objectFit: u, objectPosition: v },
                                r.contentSize,
                                t
                              )
                              const o = i.sx
                              const s = i.sy
                              const h = i.sh
                              const a = i.sw
                              const l = i.dx
                              const d = i.dy
                              const c = i.dh
                              const f = i.dw
                              I == n.MP_BAIDU
                                ? e.drawImage(
                                    t.src,
                                    l + m,
                                    d + S,
                                    f,
                                    c,
                                    o,
                                    s,
                                    a,
                                    h
                                  )
                                : e.drawImage(
                                    t.src,
                                    o,
                                    s,
                                    a,
                                    h,
                                    l + m,
                                    d + S,
                                    f,
                                    c
                                  )
                            } else e.drawImage(t.src, m, S, b, w)
                          }),
                          (W = function () {
                            e.restore(), L.drawView(r, o, !1, !0, !1), a(1)
                          }),
                          (T = function (t) {
                            B(t), W()
                          }),
                          T(t),
                          [2]
                        )
                      })
                    })
                  })
                ]
              case 1:
                return a.sent(), [2]
            }
          })
        })
      )
    }),
    (r.prototype.drawText = function (t, e, i, n) {
      const r = this
      const o = this.ctx
      const s = e.borderSize
      const h = e.contentSize
      let a = e.left
      let l = e.top
      const d = h.width
      const c = h.height
      const f = h.left - s.left || 0
      const u = h.top - s.top || 0
      const p = i.color
      let g = i.lineHeight
      const v = i.fontSize
      const y = i.fontWeight
      const x = i.fontFamily
      const b = i.fontStyle
      const w = i.textIndent
      let m = void 0 === w ? 0 : w
      const S = i.textAlign
      const z = i.textStroke
      const I = i.verticalAlign
      const M = void 0 === I ? mt : I
      const B = i.backgroundColor
      const P = i.lineClamp
      const O = i.backgroundClip
      const T = i.textShadow
      const L = i.textDecoration
      if (
        ((m = W(m) ? m : 0), this.drawView(e, i, O != yt), (g = k(g, v)), t)
      ) {
        o.save(), (a += f), (l += u)
        const R = n.fontHeight
        const F = n.descent
        const A = void 0 === F ? 0 : F
        const j = n.ascent
        const E = A + (void 0 === j ? 0 : j)
        switch (
          (o.setFonts({
            fontFamily: x,
            fontSize: v,
            fontWeight: y,
            fontStyle: b
          }),
          o.setTextBaseline(mt),
          o.setTextAlign(S),
          O ? this.setBackground(B, d, c, a, l) : o.setFillStyle(p),
          S)
        ) {
          case zt:
            break
          case It:
            a += 0.5 * d
            break
          case Mt:
            a += d
        }
        const H = n.lines * g
        let C = Math.ceil((c - H) / 2)
        switch ((C < 0 && (C = 0), M)) {
          case wt:
            break
          case mt:
            l += C
            break
          case St:
            l += 2 * C
        }
        const D = (g - R) / 2
        const $ = g / 2
        const Y = function (t) {
          const e = o.measureText(t)
          const i = e.actualBoundingBoxDescent
          const n = void 0 === i ? 0 : i
          const r = e.actualBoundingBoxAscent
          return M == wt
            ? {
                fix: E ? (void 0 === r ? 0 : r) : $ - D / 2,
                lineY: E ? 0 : D - D / 2
              }
            : M == mt
              ? { fix: E ? $ + n / 4 : $, lineY: E ? 0 : D }
              : M == St
                ? {
                    fix: E ? g - n : $ + D / 2,
                    lineY: E ? 2 * D : D + D / 2
                  }
                : { fix: 0, height: 0, lineY: 0 }
        }
        const U = function (t, e, i) {
          let r = t
          switch (S) {
            case zt:
              r += i
              break
            case It:
              r = (t -= i / 2) + i
              break
            case Mt:
              ;(r = t), (t -= i)
          }
          if (L) {
            o.setLineWidth(v / 13), o.beginPath()
            const s = 0.1 * n.fontHeight
            ;/\bunderline\b/.test(L) &&
              (o.moveTo(t, e + n.fontHeight + s),
              o.lineTo(r, e + n.fontHeight + s)),
              /\boverline\b/.test(L) &&
                (o.moveTo(t, e - s), o.lineTo(r, e - s)),
              /\bline-through\b/.test(L) &&
                (o.moveTo(t, e + 0.5 * n.fontHeight),
                o.lineTo(r, e + 0.5 * n.fontHeight)),
              o.closePath(),
              o.setStrokeStyle(p),
              o.stroke()
          }
        }
        const N = function (t, e, i) {
          const n = function () {
            o.setLineWidth(z.width),
              o.setStrokeStyle(z.color),
              o.strokeText(t, e, i)
          }
          const s = 'outset'
          z && z.type !== s
            ? (o.save(),
              r.setShadow({ boxShadow: T }),
              o.fillText(t, e, i),
              o.restore(),
              n())
            : z && z.type == s
              ? (o.save(),
                r.setShadow({ boxShadow: T }),
                n(),
                o.restore(),
                o.save(),
                o.fillText(t, e, i),
                o.restore())
              : (r.setShadow({ boxShadow: T }), o.fillText(t, e, i))
        }
        if (
          !n.widths ||
          (n.widths.length == 1 && n.widths[0].total + m <= h.width)
        ) {
          const X = Y(t)
          const _ = X.fix
          var q = void 0 === _ ? 0 : _
          var G = X.lineY
          return (
            N(t, a + m, l + q),
            U(a + m, l + G, (n && n.widths && n.widths[0].total) || n.text),
            (l += g),
            o.restore(),
            void this.setBorder(e, i)
          )
        }
        for (
          let V = l,
            J = a,
            Q = '',
            Z = 0,
            K = o.measureText('...').width,
            tt = n.widths,
            et = 0;
          et < tt.length;
          et++
        ) {
          const it = tt[et].widths
          let nt = 0
          ;(Q = ''),
            (l += (Z += 1) == 1 ? 0 : g),
            Z == 1 && m && ((nt = m), (J = a + m))
          for (let rt = 0; rt < it.length; rt++) {
            Z !== 1 && m && (J = a)
            const ot = it[rt]
            const st = ot.width
            const ht = ot.text
            const at = (it[rt + 1] || {}).width
            if (
              ((Q += ht),
              (nt += st) +
                (void 0 === at ? 0 : at) +
                (Z == 0 ? m : 0) +
                (Z == P ? K : 0) >
                h.width)
            ) {
              Z >= P && (Q += '…'), Z++, (nt = 0)
              const lt = Y(Q)
              ;(q = lt.fix), (G = lt.lineY)
              N(Q, J, l + q), U(J, l + G, nt), (l += g), (Q = '')
            } else if (rt == it.length - 1) {
              et != tt.length - 1 && Z == P && K + nt < h.width && (Q += '…')
              const dt = Y(Q)
              ;(q = dt.fix), (G = dt.lineY)
              N(Q, J, l + q), U(J, l + G, nt)
            }
            if (l > V + c || Z > P) break
          }
        }
        o.restore()
      }
    }),
    (r.prototype.source = function (t) {
      return e(this, void 0, void 0, function () {
        let e
        let n
        let r
        let o
        const s = this
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              if (
                ((this.node = null),
                (e = +new Date()),
                JSON.stringify(t) == '{}')
              )
                return [2]
              if (!t.type)
                for (n in ((t.type = bt),
                (t.styles = t.styles || t.css || {}),
                t))
                  ['views', 'children', 'type', 'css', 'styles'].includes(n) ||
                    ((t.styles[n] = t[n]), delete t[n])
              return (
                t.styles.boxSizing || (t.styles.boxSizing = 'border-box'),
                [4, this.create(t)]
              )
            case 1:
              return (r = i.sent())
                ? ((o = r.layout() || {}),
                  (this.size = o),
                  (this.node = r),
                  this.onEffectFinished()
                    .then(function (t) {
                      return s.lifecycle('onEffectSuccess', t)
                    })
                    .catch(function (t) {
                      return s.lifecycle('onEffectFail', t)
                    }),
                  this.performance &&
                    console.log('布局用时：' + (+new Date() - e) + 'ms'),
                  [2, this.size])
                : [2, console.warn('no node')]
          }
        })
      })
    }),
    (r.prototype.getImageInfo = function (t) {
      return (
        this.imageBus[t] ||
          (this.imageBus[t] = this.createImage(t, this.useCORS)),
        this.imageBus[t]
      )
    }),
    (r.prototype.create = function (n, r) {
      return e(this, void 0, void 0, function () {
        function e(i, n, r) {
          void 0 === n && (n = {}), void 0 === r && (r = !0)
          let o = []
          return (
            i.forEach(function (i) {
              const s = i.styles
              const h = void 0 === s ? {} : s
              const a = i.children
              const l = void 0 === a ? [] : a
              const d = i.text
              const c = void 0 === d ? '' : d
              const f = i.type
              const u = void 0 === f ? '' : f
              let p = {}
              p = t(r ? t({}, n) : {}, h)
              const g = {}
              const v = {}
              const y = {}
              Object.keys(p).map(function (t) {
                if (t.includes('padding') || t.includes('margin')) {
                  const e = J(t, p[t])
                  Object.keys(e).map(function (t) {
                    t.includes('Left')
                      ? (v[t] = e[t])
                      : t.includes('Right')
                        ? (y[t] = e[t])
                        : (g[t] = e[t])
                  })
                }
              })
              if (
                (p.textIndent &&
                  ((v.textIndent = p.textIndent), delete n.textIndent),
                c !== '')
              ) {
                const x = Array.from(c)
                x.forEach(function (t, e) {
                  const i = Object.assign({}, p, g)
                  e === 0
                    ? Object.assign(i, v)
                    : e == x.length - 1 && Object.assign(i, y),
                    delete i.padding,
                    delete i.margin,
                    o.push({ type: 'text', text: t, styles: i })
                })
              }
              if (u == vt || u == xt) o.push(i)
              else if (h.display === 'block' && l.length > 0) {
                var b = e(l, p, !1)
                ;(i.children = b), (i.flattened = !0), o.push(i)
              } else if (l.length > 0) {
                b = e(l, p, r)
                o = o.concat(b)
              }
            }),
            o
          )
        }
        let o, s, h, a, l, d, c, f, u, p, g, v, y, b, w, m, S, z, I, M, B
        return i(this, function (i) {
          switch (i.label) {
            case 0:
              if (!n) return [2]
              if (
                (n.styles || (n.styles = n.css || {}),
                (o = n.type),
                (s = o == vt),
                (h = [yt, xt].includes(o)),
                (a = o == 'textBox'),
                (l = n.styles || {}),
                (d = l.backgroundImage),
                (c = l.display),
                s && !n.src && !n.url)
              )
                return [2]
              if (c == x) return [2]
              if (h || a) {
                if (((f = n.children), !n.text && (!f || (f && !f.length))))
                  return [2]
                f &&
                  f.length &&
                  !n.flattened &&
                  ((u = e(n.children)), (n.type = 'view'), (n.children = u))
              }
              if (!(s || (n.type == bt && d))) return [3, 4]
              ;(p = s ? n.src : ''),
                (g = /url\(['"]?(.*?)['"]?\)/.exec(d)),
                d && g && g[1] && (p = g[1] || ''),
                (i.label = 1)
            case 1:
              return i.trys.push([1, 3, , 4]), [4, this.getImageInfo(p)]
            case 2:
              return (
                (v = i.sent()),
                (y = v.width),
                (b = v.height),
                !(w = v.path) && s
                  ? [2]
                  : (w &&
                      (n.attributes = Object.assign(n.attributes || {}, {
                        width: y,
                        height: b,
                        path: w,
                        src: w,
                        naturalSrc: p
                      })),
                    [3, 4])
              )
            case 3:
              return (
                (m = i.sent()),
                n.type != bt
                  ? [2]
                  : (this.lifecycle('onEffectFail', t(t({}, m), { src: p })),
                    [3, 4])
              )
            case 4:
              if (
                ((this.count += 1),
                (S = new gt(n, r, this.root, this.ctx)),
                !(z = n.views || n.children))
              )
                return [3, 8]
              ;(I = 0), (i.label = 5)
            case 5:
              return I < z.length
                ? ((M = z[I]), [4, this.create(M, S)])
                : [3, 8]
            case 6:
              ;(B = i.sent()) && S.add(B), (i.label = 7)
            case 7:
              return I++, [3, 5]
            case 8:
              return [2, S]
          }
        })
      })
    }),
    (r.prototype.drawNode = function (t, n) {
      return (
        void 0 === n && (n = !1),
        e(this, void 0, void 0, function () {
          let e,
            r,
            o,
            s,
            h,
            a,
            l,
            d,
            c,
            f,
            u,
            p,
            g,
            v,
            y,
            x,
            b,
            w,
            m,
            S,
            z,
            I,
            M
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (e = t.layoutBox),
                  (r = t.computedStyle),
                  (o = t.attributes),
                  (s = t.name),
                  (h = t.children),
                  (a = t.fixedLine),
                  (l = t.attributes),
                  (d = l.src),
                  (c = l.text),
                  (f = r.position),
                  (u = r.backgroundImage),
                  (p = r.backgroundRepeat),
                  ['fixed'].includes(f) && !n
                    ? [2]
                    : (this.ctx.save(),
                      s !== bt
                        ? [3, 7]
                        : d && u
                          ? p
                            ? [4, this.drawPattern(o, e, r)]
                            : [3, 2]
                          : [3, 5])
                )
              case 1:
                return i.sent(), [3, 4]
              case 2:
                return [4, this.drawImage(o, e, r, !1)]
              case 3:
                i.sent(), (i.label = 4)
              case 4:
                return [3, 6]
              case 5:
                this.drawView(e, r), (i.label = 6)
              case 6:
                return [3, 10]
              case 7:
                return s === vt && d ? [4, this.drawImage(o, e, r, !1)] : [3, 9]
              case 8:
                return i.sent(), [3, 10]
              case 9:
                s === yt
                  ? this.drawText(c, e, r, o)
                  : s === xt && QR.api && console.warn('single'),
                  (i.label = 10)
              case 10:
                if (
                  ((this.progress += 1),
                  (v = (g = a || {}).beforeElements),
                  (y = g.afterElements),
                  !v)
                )
                  return [3, 14]
                ;(x = 0), (b = v), (i.label = 11)
              case 11:
                return x < b.length
                  ? ((M = b[x]), [4, this.drawNode(M)])
                  : [3, 14]
              case 12:
                i.sent(), (i.label = 13)
              case 13:
                return x++, [3, 11]
              case 14:
                if (!h) return [3, 18]
                ;(w = Object.values
                  ? Object.values(h)
                  : Object.keys(h).map(function (t) {
                      return h[t]
                    })),
                  (m = 0),
                  (S = w),
                  (i.label = 15)
              case 15:
                return m < S.length
                  ? (M = S[m]).computedStyle.position === 'absolute'
                    ? [3, 17]
                    : [4, this.drawNode(M)]
                  : [3, 18]
              case 16:
                i.sent(), (i.label = 17)
              case 17:
                return m++, [3, 15]
              case 18:
                if (!y) return [3, 22]
                ;(z = 0), (I = y), (i.label = 19)
              case 19:
                return z < I.length
                  ? ((M = I[z]), [4, this.drawNode(M)])
                  : [3, 22]
              case 20:
                i.sent(), (i.label = 21)
              case 21:
                return z++, [3, 19]
              case 22:
                return this.ctx.restore(), [2]
            }
          })
        })
      )
    }),
    (r.prototype.render = function (t) {
      const n = this
      return (
        void 0 === t && (t = 30),
        new Promise(function (r, o) {
          return e(n, void 0, void 0, function () {
            let e, n, s, h, a, l, d, c, f, u
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  return (
                    (e = +new Date()),
                    this.init(),
                    [
                      4,
                      ((p = t),
                      void 0 === p && (p = 0),
                      new Promise(function (t) {
                        return setTimeout(t, p)
                      }))
                    ]
                  )
                case 1:
                  i.sent(), (i.label = 2)
                case 2:
                  if ((i.trys.push([2, 14, , 15]), !this.node)) return [3, 12]
                  if (
                    ((n = this.root.fixedLine || {}),
                    (s = n.beforeElements),
                    (h = n.afterElements),
                    !s)
                  )
                    return [3, 6]
                  ;(a = 0), (l = s), (i.label = 3)
                case 3:
                  return a < l.length
                    ? ((f = l[a]), [4, this.drawNode(f, !0)])
                    : [3, 6]
                case 4:
                  i.sent(), (i.label = 5)
                case 5:
                  return a++, [3, 3]
                case 6:
                  return [4, this.drawNode(this.node)]
                case 7:
                  if ((i.sent(), !h)) return [3, 11]
                  ;(d = 0), (c = h), (i.label = 8)
                case 8:
                  return d < c.length
                    ? ((f = c[d]), [4, this.drawNode(f, !0)])
                    : [3, 11]
                case 9:
                  i.sent(), (i.label = 10)
                case 10:
                  return d++, [3, 8]
                case 11:
                  return r(this.node), [3, 13]
                case 12:
                  this.lifecycle('onEffectFail', 'node is empty'),
                    (i.label = 13)
                case 13:
                  return [3, 15]
                case 14:
                  return (
                    (u = i.sent()),
                    this.lifecycle('onEffectFail', u),
                    o(u),
                    [3, 15]
                  )
                case 15:
                  return (
                    this.performance &&
                      console.log('渲染用时：' + (+new Date() - e - 30) + 'ms'),
                    [2]
                  )
              }
              let p
            })
          })
        })
      )
    }),
    (r.prototype.onEffectFinished = function () {
      const t = this
      const e = Object.keys(this.imageBus).map(function (e) {
        return t.imageBus[e]
      })
      return Promise.all(e)
    }),
    (r.prototype.destroy = function () {
      this.node = []
    }),
    (r.prototype.save = function (t) {
      try {
        const e = t || {}
        const i = e.fileType
        const n = void 0 === i ? 'png' : i
        const r = e.quality
        const o = void 0 === r ? 1 : r
        return this.canvas.toDataURL('image/'.concat(n), o)
      } catch (t) {
        return this.lifecycle('onEffectFail', 'image cross domain'), t
      }
    }),
    r
  )
})()
n.WEB == I && (window.Painter = Bt)
export { Bt as Painter, Bt as default }
