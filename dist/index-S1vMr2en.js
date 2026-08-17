var W = (r) => {
  throw TypeError(r);
};
var H = (r, i, e) => i.has(r) || W("Cannot " + e);
var m = (r, i, e) => (H(r, i, "read from private field"), e ? e.call(r) : i.get(r)), J = (r, i, e) => i.has(r) ? W("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(r) : i.set(r, e), q = (r, i, e, t) => (H(r, i, "write to private field"), t ? t.call(r, e) : i.set(r, e), e);
import * as a from "react";
import { c as X } from "./index-b757E0P6.js";
import { u as b, c as k } from "./index-DFmzheZp.js";
import { jsx as g } from "react/jsx-runtime";
var ne = Object.defineProperty, d = (r, i) => ne(r, "name", { value: i, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function oe(r) {
  const i = r + "CollectionProvider", [e, t] = X(i), [o, n] = e(
    i,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = /* @__PURE__ */ d((h) => {
    const { scope: p, children: E } = h, P = a.useRef(null), c = a.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ g(o, { scope: p, itemMap: c, collectionRef: P, children: E });
  }, "CollectionProvider");
  s.displayName = i;
  const l = r + "CollectionSlot", C = k(l), R = a.forwardRef(
    (h, p) => {
      const { scope: E, children: P } = h, c = n(l, E), u = b(p, c.collectionRef);
      return /* @__PURE__ */ g(C, { ref: u, children: P });
    }
  );
  R.displayName = l;
  const T = r + "CollectionItemSlot", v = "data-radix-collection-item", M = k(T), w = a.forwardRef(
    (h, p) => {
      const { scope: E, children: P, ...c } = h, u = a.useRef(null), N = b(p, u), O = n(T, E);
      return a.useEffect(() => (O.itemMap.set(u, { ref: u, ...c }), () => {
        O.itemMap.delete(u);
      })), /* @__PURE__ */ g(M, { [v]: "", ref: N, children: P });
    }
  );
  w.displayName = T;
  function x(h) {
    const p = n(r + "CollectionConsumer", h);
    return a.useCallback(() => {
      const P = p.collectionRef.current;
      if (!P) return [];
      const c = Array.from(P.querySelectorAll(`[${v}]`));
      return Array.from(p.itemMap.values()).sort(
        (O, S) => c.indexOf(O.ref.current) - c.indexOf(S.ref.current)
      );
    }, [p.collectionRef, p.itemMap]);
  }
  return d(x, "useCollection"), [
    { Provider: s, Slot: R, ItemSlot: w },
    x,
    t
  ];
}
d(oe, "createCollection");
var Q = /* @__PURE__ */ new WeakMap(), f, y, $ = (y = class extends Map {
  constructor(e) {
    super(e);
    J(this, f);
    q(this, f, [...super.keys()]), Q.set(this, !0);
  }
  set(e, t) {
    return Q.get(this) && (this.has(e) ? m(this, f)[m(this, f).indexOf(e)] = e : m(this, f).push(e)), super.set(e, t), this;
  }
  insert(e, t, o) {
    const n = this.has(t), s = m(this, f).length, l = F(e);
    let C = l >= 0 ? l : s + l;
    const R = C < 0 || C >= s ? -1 : C;
    if (R === this.size || n && R === this.size - 1 || R === -1)
      return this.set(t, o), this;
    const T = this.size + (n ? 0 : 1);
    l < 0 && C++;
    const v = [...m(this, f)];
    let M, w = !1;
    for (let x = C; x < T; x++)
      if (C === x) {
        let h = v[x];
        v[x] === t && (h = v[x + 1]), n && this.delete(t), M = this.get(h), this.set(t, o);
      } else {
        !w && v[x - 1] === t && (w = !0);
        const h = v[w ? x : x - 1], p = M;
        M = this.get(h), this.delete(h), this.set(h, p);
      }
    return this;
  }
  with(e, t, o) {
    const n = new y(this);
    return n.insert(e, t, o), n;
  }
  before(e) {
    const t = m(this, f).indexOf(e) - 1;
    if (!(t < 0))
      return this.entryAt(t);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(e, t, o) {
    const n = m(this, f).indexOf(e);
    return n === -1 ? this : this.insert(n, t, o);
  }
  after(e) {
    let t = m(this, f).indexOf(e);
    if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1)
      return this.entryAt(t);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(e, t, o) {
    const n = m(this, f).indexOf(e);
    return n === -1 ? this : this.insert(n + 1, t, o);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return q(this, f, []), super.clear();
  }
  delete(e) {
    const t = super.delete(e);
    return t && m(this, f).splice(m(this, f).indexOf(e), 1), t;
  }
  deleteAt(e) {
    const t = this.keyAt(e);
    return t !== void 0 ? this.delete(t) : !1;
  }
  at(e) {
    const t = z(m(this, f), e);
    if (t !== void 0)
      return this.get(t);
  }
  entryAt(e) {
    const t = z(m(this, f), e);
    if (t !== void 0)
      return [t, this.get(t)];
  }
  indexOf(e) {
    return m(this, f).indexOf(e);
  }
  keyAt(e) {
    return z(m(this, f), e);
  }
  from(e, t) {
    const o = this.indexOf(e);
    if (o === -1)
      return;
    let n = o + t;
    return n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.at(n);
  }
  keyFrom(e, t) {
    const o = this.indexOf(e);
    if (o === -1)
      return;
    let n = o + t;
    return n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.keyAt(n);
  }
  find(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return n;
      o++;
    }
  }
  findIndex(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return o;
      o++;
    }
    return -1;
  }
  filter(e, t) {
    const o = [];
    let n = 0;
    for (const s of this)
      Reflect.apply(e, t, [s, n, this]) && o.push(s), n++;
    return new y(o);
  }
  map(e, t) {
    const o = [];
    let n = 0;
    for (const s of this)
      o.push([s[0], Reflect.apply(e, t, [s, n, this])]), n++;
    return new y(o);
  }
  reduce(...e) {
    const [t, o] = e;
    let n = 0, s = o ?? this.at(0);
    for (const l of this)
      n === 0 && e.length === 1 ? s = l : s = Reflect.apply(t, this, [s, l, n, this]), n++;
    return s;
  }
  reduceRight(...e) {
    const [t, o] = e;
    let n = o ?? this.at(-1);
    for (let s = this.size - 1; s >= 0; s--) {
      const l = this.at(s);
      s === this.size - 1 && e.length === 1 ? n = l : n = Reflect.apply(t, this, [n, l, s, this]);
    }
    return n;
  }
  toSorted(e) {
    const t = [...this.entries()].sort(e);
    return new y(t);
  }
  toReversed() {
    const e = new y();
    for (let t = this.size - 1; t >= 0; t--) {
      const o = this.keyAt(t), n = this.get(o);
      e.set(o, n);
    }
    return e;
  }
  toSpliced(...e) {
    const t = [...this.entries()];
    return t.splice(...e), new y(t);
  }
  slice(e, t) {
    const o = new y();
    let n = this.size - 1;
    if (e === void 0)
      return o;
    e < 0 && (e = e + this.size), t !== void 0 && t > 0 && (n = t - 1);
    for (let s = e; s <= n; s++) {
      const l = this.keyAt(s), C = this.get(l);
      o.set(l, C);
    }
    return o;
  }
  every(e, t) {
    let o = 0;
    for (const n of this) {
      if (!Reflect.apply(e, t, [n, o, this]))
        return !1;
      o++;
    }
    return !0;
  }
  some(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return !0;
      o++;
    }
    return !1;
  }
}, f = new WeakMap(), d(y, "OrderedDict"), y);
function z(r, i) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(r, i);
  const e = Y(r, i);
  return e === -1 ? void 0 : r[e];
}
d(z, "at");
function Y(r, i) {
  const e = r.length, t = F(i), o = t >= 0 ? t : e + t;
  return o < 0 || o >= e ? -1 : o;
}
d(Y, "toSafeIndex");
function F(r) {
  return r !== r || r === 0 ? 0 : Math.trunc(r);
}
d(F, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function re(r) {
  const i = r + "CollectionProvider", [e, t] = X(i), [o, n] = e(
    i,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new $(),
      setItemMap: /* @__PURE__ */ d(() => {
      }, "setItemMap")
    }
  ), s = /* @__PURE__ */ d(({ state: c, ...u }) => c ? /* @__PURE__ */ g(C, { ...u, state: c }) : /* @__PURE__ */ g(l, { ...u }), "CollectionProvider");
  s.displayName = i;
  const l = /* @__PURE__ */ d((c) => {
    const u = p();
    return /* @__PURE__ */ g(C, { ...c, state: u });
  }, "CollectionInit");
  l.displayName = i + "Init";
  const C = /* @__PURE__ */ d((c) => {
    const { scope: u, children: N, state: O } = c, S = a.useRef(null), [D, I] = a.useState(
      null
    ), L = b(S, I), [j, V] = O;
    return a.useEffect(() => {
      if (!D) return;
      const _ = te(() => {
      });
      return _.observe(D, {
        childList: !0,
        subtree: !0
      }), () => {
        _.disconnect();
      };
    }, [D]), /* @__PURE__ */ g(
      o,
      {
        scope: u,
        itemMap: j,
        setItemMap: V,
        collectionRef: L,
        collectionRefObject: S,
        collectionElement: D,
        children: N
      }
    );
  }, "CollectionProviderImpl");
  C.displayName = i + "Impl";
  const R = r + "CollectionSlot", T = k(R), v = a.forwardRef(
    (c, u) => {
      const { scope: N, children: O } = c, S = n(R, N), D = b(u, S.collectionRef);
      return /* @__PURE__ */ g(T, { ref: D, children: O });
    }
  );
  v.displayName = R;
  const M = r + "CollectionItemSlot", w = "data-radix-collection-item", x = k(M), h = a.forwardRef(
    (c, u) => {
      const { scope: N, children: O, ...S } = c, D = a.useRef(null), [I, L] = a.useState(null), j = b(u, D, L), V = n(M, N), { setItemMap: _ } = V, B = a.useRef(S);
      Z(B.current, S) || (B.current = S);
      const G = B.current;
      return a.useEffect(() => {
        const U = G;
        return _((A) => I ? A.has(I) ? A.set(I, { ...U, element: I }).toSorted(K) : (A.set(I, { ...U, element: I }), A.toSorted(K)) : A), () => {
          _((A) => !I || !A.has(I) ? A : (A.delete(I), new $(A)));
        };
      }, [I, G, _]), /* @__PURE__ */ g(x, { [w]: "", ref: j, children: O });
    }
  );
  h.displayName = M;
  function p() {
    return a.useState(new $());
  }
  d(p, "useInitCollection");
  function E(c) {
    const { itemMap: u } = n(r + "CollectionConsumer", c);
    return u;
  }
  return d(E, "useCollection"), [
    { Provider: s, Slot: v, ItemSlot: h },
    {
      createCollectionScope: t,
      useCollection: E,
      useInitCollection: p
    }
  ];
}
d(re, "createCollection");
function Z(r, i) {
  if (r === i) return !0;
  if (typeof r != "object" || typeof i != "object" || r == null || i == null) return !1;
  const e = Object.keys(r), t = Object.keys(i);
  if (e.length !== t.length) return !1;
  for (const o of e)
    if (!Object.prototype.hasOwnProperty.call(i, o) || r[o] !== i[o]) return !1;
  return !0;
}
d(Z, "shallowEqual");
function ee(r, i) {
  return !!(i.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_PRECEDING);
}
d(ee, "isElementPreceding");
function K(r, i) {
  return !r[1].element || !i[1].element ? 0 : ee(r[1].element, i[1].element) ? -1 : 1;
}
d(K, "sortByDocumentPosition");
function te(r) {
  return new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList") {
        r();
        return;
      }
  });
}
d(te, "getChildListObserver");
var ie = Object.defineProperty, se = (r, i) => ie(r, "name", { value: i, configurable: !0 }), ce = a.createContext(void 0);
function le(r) {
  const i = a.useContext(ce);
  return r || i || "ltr";
}
se(le, "useDirection");
export {
  oe as c,
  le as u
};
//# sourceMappingURL=index-S1vMr2en.js.map
