/*! For license information please see jsspeccy.js.LICENSE.txt */
(() => {
    var t = {
        187: t => {
            "use strict";
            var e, r = "object" == typeof Reflect ? Reflect : null,
                i = r && "function" == typeof r.apply ? r.apply : function (t, e, r) {
                    return Function.prototype.apply.call(t, e, r)
                };
            e = r && "function" == typeof r.ownKeys ? r.ownKeys : Object.getOwnPropertySymbols ? function (t) {
                return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
            } : function (t) {
                return Object.getOwnPropertyNames(t)
            };
            var n = Number.isNaN || function (t) {
                return t != t
            };

            function s() {
                s.init.call(this)
            }

            t.exports = s, t.exports.once = function (t, e) {
                return new Promise((function (r, i) {
                    function n(r) {
                        t.removeListener(e, s), i(r)
                    }

                    function s() {
                        "function" == typeof t.removeListener && t.removeListener("error", n), r([].slice.call(arguments))
                    }

                    m(t, e, s, {once: !0}), "error" !== e && function (t, e, r) {
                        "function" == typeof t.on && m(t, "error", e, {once: !0})
                    }(t, n)
                }))
            }, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
            var a = 10;

            function o(t) {
                if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
            }

            function l(t) {
                return void 0 === t._maxListeners ? s.defaultMaxListeners : t._maxListeners
            }

            function h(t, e, r, i) {
                var n, s, a, h;
                if (o(r), void 0 === (s = t._events) ? (s = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== s.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), s = t._events), a = s[e]), void 0 === a) a = s[e] = r, ++t._eventsCount; else if ("function" == typeof a ? a = s[e] = i ? [r, a] : [a, r] : i ? a.unshift(r) : a.push(r), (n = l(t)) > 0 && a.length > n && !a.warned) {
                    a.warned = !0;
                    var u = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    u.name = "MaxListenersExceededWarning", u.emitter = t, u.type = e, u.count = a.length, h = u, console && console.warn && console.warn(h)
                }
                return t
            }

            function u() {
                if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }

            function d(t, e, r) {
                var i = {fired: !1, wrapFn: void 0, target: t, type: e, listener: r}, n = u.bind(i);
                return n.listener = r, i.wrapFn = n, n
            }

            function c(t, e, r) {
                var i = t._events;
                if (void 0 === i) return [];
                var n = i[e];
                return void 0 === n ? [] : "function" == typeof n ? r ? [n.listener || n] : [n] : r ? function (t) {
                    for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
                    return e
                }(n) : p(n, n.length)
            }

            function f(t) {
                var e = this._events;
                if (void 0 !== e) {
                    var r = e[t];
                    if ("function" == typeof r) return 1;
                    if (void 0 !== r) return r.length
                }
                return 0
            }

            function p(t, e) {
                for (var r = new Array(e), i = 0; i < e; ++i) r[i] = t[i];
                return r
            }

            function m(t, e, r, i) {
                if ("function" == typeof t.on) i.once ? t.once(e, r) : t.on(e, r); else {
                    if ("function" != typeof t.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
                    t.addEventListener(e, (function n(s) {
                        i.once && t.removeEventListener(e, n), r(s)
                    }))
                }
            }

            Object.defineProperty(s, "defaultMaxListeners", {
                enumerable: !0, get: function () {
                    return a
                }, set: function (t) {
                    if ("number" != typeof t || t < 0 || n(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
                    a = t
                }
            }), s.init = function () {
                void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
            }, s.prototype.setMaxListeners = function (t) {
                if ("number" != typeof t || t < 0 || n(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
                return this._maxListeners = t, this
            }, s.prototype.getMaxListeners = function () {
                return l(this)
            }, s.prototype.emit = function (t) {
                for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
                var n = "error" === t, s = this._events;
                if (void 0 !== s) n = n && void 0 === s.error; else if (!n) return !1;
                if (n) {
                    var a;
                    if (e.length > 0 && (a = e[0]), a instanceof Error) throw a;
                    var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
                    throw o.context = a, o
                }
                var l = s[t];
                if (void 0 === l) return !1;
                if ("function" == typeof l) i(l, this, e); else {
                    var h = l.length, u = p(l, h);
                    for (r = 0; r < h; ++r) i(u[r], this, e)
                }
                return !0
            }, s.prototype.addListener = function (t, e) {
                return h(this, t, e, !1)
            }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function (t, e) {
                return h(this, t, e, !0)
            }, s.prototype.once = function (t, e) {
                return o(e), this.on(t, d(this, t, e)), this
            }, s.prototype.prependOnceListener = function (t, e) {
                return o(e), this.prependListener(t, d(this, t, e)), this
            }, s.prototype.removeListener = function (t, e) {
                var r, i, n, s, a;
                if (o(e), void 0 === (i = this._events)) return this;
                if (void 0 === (r = i[t])) return this;
                if (r === e || r.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || e)); else if ("function" != typeof r) {
                    for (n = -1, s = r.length - 1; s >= 0; s--) if (r[s] === e || r[s].listener === e) {
                        a = r[s].listener, n = s;
                        break
                    }
                    if (n < 0) return this;
                    0 === n ? r.shift() : function (t, e) {
                        for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                        t.pop()
                    }(r, n), 1 === r.length && (i[t] = r[0]), void 0 !== i.removeListener && this.emit("removeListener", t, a || e)
                }
                return this
            }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function (t) {
                var e, r, i;
                if (void 0 === (r = this._events)) return this;
                if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[t]), this;
                if (0 === arguments.length) {
                    var n, s = Object.keys(r);
                    for (i = 0; i < s.length; ++i) "removeListener" !== (n = s[i]) && this.removeAllListeners(n);
                    return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
                }
                if ("function" == typeof (e = r[t])) this.removeListener(t, e); else if (void 0 !== e) for (i = e.length - 1; i >= 0; i--) this.removeListener(t, e[i]);
                return this
            }, s.prototype.listeners = function (t) {
                return c(this, t, !0)
            }, s.prototype.rawListeners = function (t) {
                return c(this, t, !1)
            }, s.listenerCount = function (t, e) {
                return "function" == typeof t.listenerCount ? t.listenerCount(e) : f.call(t, e)
            }, s.prototype.listenerCount = f, s.prototype.eventNames = function () {
                return this._eventsCount > 0 ? e(this._events) : []
            }
        }, 171: (t, e, r) => {
            "use strict";
            var i, n, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            };
            n = function () {
                for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                var i = document.createElement("input");
                return "object" === s(e[0]) && (!0 === e[0].multiple && i.setAttribute("multiple", ""), void 0 !== e[0].accept && i.setAttribute("accept", e[0].accept)), i.setAttribute("type", "file"), i.style.display = "none", i.setAttribute("id", "hidden-file"), document.body.appendChild(i), new Promise((function (t) {
                    i.addEventListener("change", (function () {
                        t(i.files);
                        var r = e[e.length - 1];
                        "function" == typeof r && r(i.files), document.body.removeChild(i)
                    }));
                    var r = document.createEvent("MouseEvents");
                    r.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), i.dispatchEvent(r)
                }))
            }, void 0 === (i = function () {
                return n
            }.call(e, r, e, t)) || (t.exports = i)
        }, 733: (t, e, r) => {
            t.exports = function t(e, r, i) {
                function n(a, o) {
                    if (!r[a]) {
                        if (!e[a]) {
                            if (s) return s(a, !0);
                            var l = new Error("Cannot find module '" + a + "'");
                            throw l.code = "MODULE_NOT_FOUND", l
                        }
                        var h = r[a] = {exports: {}};
                        e[a][0].call(h.exports, (function (t) {
                            return n(e[a][1][t] || t)
                        }), h, h.exports, t, e, r, i)
                    }
                    return r[a].exports
                }

                for (var s = void 0, a = 0; a < i.length; a++) n(i[a]);
                return n
            }({
                1: [function (t, e, r) {
                    "use strict";
                    var i = t("./utils"), n = t("./support"),
                        s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    r.encode = function (t) {
                        for (var e, r, n, a, o, l, h, u = [], d = 0, c = t.length, f = c, p = "string" !== i.getTypeOf(t); d < t.length;) f = c - d, n = p ? (e = t[d++], r = d < c ? t[d++] : 0, d < c ? t[d++] : 0) : (e = t.charCodeAt(d++), r = d < c ? t.charCodeAt(d++) : 0, d < c ? t.charCodeAt(d++) : 0), a = e >> 2, o = (3 & e) << 4 | r >> 4, l = 1 < f ? (15 & r) << 2 | n >> 6 : 64, h = 2 < f ? 63 & n : 64, u.push(s.charAt(a) + s.charAt(o) + s.charAt(l) + s.charAt(h));
                        return u.join("")
                    }, r.decode = function (t) {
                        var e, r, i, a, o, l, h = 0, u = 0, d = "data:";
                        if (t.substr(0, d.length) === d) throw new Error("Invalid base64 input, it looks like a data url.");
                        var c, f = 3 * (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
                        if (t.charAt(t.length - 1) === s.charAt(64) && f--, t.charAt(t.length - 2) === s.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
                        for (c = n.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); h < t.length;) e = s.indexOf(t.charAt(h++)) << 2 | (a = s.indexOf(t.charAt(h++))) >> 4, r = (15 & a) << 4 | (o = s.indexOf(t.charAt(h++))) >> 2, i = (3 & o) << 6 | (l = s.indexOf(t.charAt(h++))), c[u++] = e, 64 !== o && (c[u++] = r), 64 !== l && (c[u++] = i);
                        return c
                    }
                }, {"./support": 30, "./utils": 32}],
                2: [function (t, e, r) {
                    "use strict";
                    var i = t("./external"), n = t("./stream/DataWorker"), s = t("./stream/Crc32Probe"),
                        a = t("./stream/DataLengthProbe");

                    function o(t, e, r, i, n) {
                        this.compressedSize = t, this.uncompressedSize = e, this.crc32 = r, this.compression = i, this.compressedContent = n
                    }

                    o.prototype = {
                        getContentWorker: function () {
                            var t = new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
                                e = this;
                            return t.on("end", (function () {
                                if (this.streamInfo.data_length !== e.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch")
                            })), t
                        }, getCompressedWorker: function () {
                            return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
                        }
                    }, o.createWorkerFrom = function (t, e, r) {
                        return t.pipe(new s).pipe(new a("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression", e)
                    }, e.exports = o
                }, {
                    "./external": 6,
                    "./stream/Crc32Probe": 25,
                    "./stream/DataLengthProbe": 26,
                    "./stream/DataWorker": 27
                }],
                3: [function (t, e, r) {
                    "use strict";
                    var i = t("./stream/GenericWorker");
                    r.STORE = {
                        magic: "\0\0", compressWorker: function (t) {
                            return new i("STORE compression")
                        }, uncompressWorker: function () {
                            return new i("STORE decompression")
                        }
                    }, r.DEFLATE = t("./flate")
                }, {"./flate": 7, "./stream/GenericWorker": 28}],
                4: [function (t, e, r) {
                    "use strict";
                    var i = t("./utils"), n = function () {
                        for (var t, e = [], r = 0; r < 256; r++) {
                            t = r;
                            for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                            e[r] = t
                        }
                        return e
                    }();
                    e.exports = function (t, e) {
                        return void 0 !== t && t.length ? "string" !== i.getTypeOf(t) ? function (t, e, r, i) {
                            var s = n, a = 0 + r;
                            t ^= -1;
                            for (var o = 0; o < a; o++) t = t >>> 8 ^ s[255 & (t ^ e[o])];
                            return -1 ^ t
                        }(0 | e, t, t.length) : function (t, e, r, i) {
                            var s = n, a = 0 + r;
                            t ^= -1;
                            for (var o = 0; o < a; o++) t = t >>> 8 ^ s[255 & (t ^ e.charCodeAt(o))];
                            return -1 ^ t
                        }(0 | e, t, t.length) : 0
                    }
                }, {"./utils": 32}],
                5: [function (t, e, r) {
                    "use strict";
                    r.base64 = !1, r.binary = !1, r.dir = !1, r.createFolders = !0, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null
                }, {}],
                6: [function (t, e, r) {
                    "use strict";
                    var i;
                    i = "undefined" != typeof Promise ? Promise : t("lie"), e.exports = {Promise: i}
                }, {lie: 37}],
                7: [function (t, e, r) {
                    "use strict";
                    var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                        n = t("pako"), s = t("./utils"), a = t("./stream/GenericWorker"),
                        o = i ? "uint8array" : "array";

                    function l(t, e) {
                        a.call(this, "FlateWorker/" + t), this._pako = null, this._pakoAction = t, this._pakoOptions = e, this.meta = {}
                    }

                    r.magic = "\b\0", s.inherits(l, a), l.prototype.processChunk = function (t) {
                        this.meta = t.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, t.data), !1)
                    }, l.prototype.flush = function () {
                        a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0)
                    }, l.prototype.cleanUp = function () {
                        a.prototype.cleanUp.call(this), this._pako = null
                    }, l.prototype._createPako = function () {
                        this._pako = new n[this._pakoAction]({raw: !0, level: this._pakoOptions.level || -1});
                        var t = this;
                        this._pako.onData = function (e) {
                            t.push({data: e, meta: t.meta})
                        }
                    }, r.compressWorker = function (t) {
                        return new l("Deflate", t)
                    }, r.uncompressWorker = function () {
                        return new l("Inflate", {})
                    }
                }, {"./stream/GenericWorker": 28, "./utils": 32, pako: 38}],
                8: [function (t, e, r) {
                    "use strict";

                    function i(t, e) {
                        var r, i = "";
                        for (r = 0; r < e; r++) i += String.fromCharCode(255 & t), t >>>= 8;
                        return i
                    }

                    function n(t, e, r, n, a, u) {
                        var d, c, f = t.file, p = t.compression, m = u !== o.utf8encode,
                            _ = s.transformTo("string", u(f.name)), g = s.transformTo("string", o.utf8encode(f.name)),
                            w = f.comment, b = s.transformTo("string", u(w)),
                            v = s.transformTo("string", o.utf8encode(w)), y = g.length !== f.name.length,
                            k = v.length !== w.length, x = "", A = "", z = "", E = f.dir, S = f.date,
                            C = {crc32: 0, compressedSize: 0, uncompressedSize: 0};
                        e && !r || (C.crc32 = t.crc32, C.compressedSize = t.compressedSize, C.uncompressedSize = t.uncompressedSize);
                        var B = 0;
                        e && (B |= 8), m || !y && !k || (B |= 2048);
                        var U = 0, I = 0;
                        E && (U |= 16), "UNIX" === a ? (I = 798, U |= function (t, e) {
                            var r = t;
                            return t || (r = e ? 16893 : 33204), (65535 & r) << 16
                        }(f.unixPermissions, E)) : (I = 20, U |= function (t) {
                            return 63 & (t || 0)
                        }(f.dosPermissions)), d = S.getUTCHours(), d <<= 6, d |= S.getUTCMinutes(), d <<= 5, d |= S.getUTCSeconds() / 2, c = S.getUTCFullYear() - 1980, c <<= 4, c |= S.getUTCMonth() + 1, c <<= 5, c |= S.getUTCDate(), y && (A = i(1, 1) + i(l(_), 4) + g, x += "up" + i(A.length, 2) + A), k && (z = i(1, 1) + i(l(b), 4) + v, x += "uc" + i(z.length, 2) + z);
                        var T = "";
                        return T += "\n\0", T += i(B, 2), T += p.magic, T += i(d, 2), T += i(c, 2), T += i(C.crc32, 4), T += i(C.compressedSize, 4), T += i(C.uncompressedSize, 4), T += i(_.length, 2), T += i(x.length, 2), {
                            fileRecord: h.LOCAL_FILE_HEADER + T + _ + x,
                            dirRecord: h.CENTRAL_FILE_HEADER + i(I, 2) + T + i(b.length, 2) + "\0\0\0\0" + i(U, 4) + i(n, 4) + _ + x + b
                        }
                    }

                    var s = t("../utils"), a = t("../stream/GenericWorker"), o = t("../utf8"), l = t("../crc32"),
                        h = t("../signature");

                    function u(t, e, r, i) {
                        a.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = e, this.zipPlatform = r, this.encodeFileName = i, this.streamFiles = t, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = []
                    }

                    s.inherits(u, a), u.prototype.push = function (t) {
                        var e = t.meta.percent || 0, r = this.entriesCount, i = this._sources.length;
                        this.accumulate ? this.contentBuffer.push(t) : (this.bytesWritten += t.data.length, a.prototype.push.call(this, {
                            data: t.data,
                            meta: {currentFile: this.currentFile, percent: r ? (e + 100 * (r - i - 1)) / r : 100}
                        }))
                    }, u.prototype.openedSource = function (t) {
                        this.currentSourceOffset = this.bytesWritten, this.currentFile = t.file.name;
                        var e = this.streamFiles && !t.file.dir;
                        if (e) {
                            var r = n(t, e, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                            this.push({data: r.fileRecord, meta: {percent: 0}})
                        } else this.accumulate = !0
                    }, u.prototype.closedSource = function (t) {
                        this.accumulate = !1;
                        var e = this.streamFiles && !t.file.dir,
                            r = n(t, e, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                        if (this.dirRecords.push(r.dirRecord), e) this.push({
                            data: function (t) {
                                return h.DATA_DESCRIPTOR + i(t.crc32, 4) + i(t.compressedSize, 4) + i(t.uncompressedSize, 4)
                            }(t), meta: {percent: 100}
                        }); else for (this.push({
                            data: r.fileRecord,
                            meta: {percent: 0}
                        }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
                        this.currentFile = null
                    }, u.prototype.flush = function () {
                        for (var t = this.bytesWritten, e = 0; e < this.dirRecords.length; e++) this.push({
                            data: this.dirRecords[e],
                            meta: {percent: 100}
                        });
                        var r = this.bytesWritten - t, n = function (t, e, r, n, a) {
                            var o = s.transformTo("string", a(n));
                            return h.CENTRAL_DIRECTORY_END + "\0\0\0\0" + i(t, 2) + i(t, 2) + i(e, 4) + i(r, 4) + i(o.length, 2) + o
                        }(this.dirRecords.length, r, t, this.zipComment, this.encodeFileName);
                        this.push({data: n, meta: {percent: 100}})
                    }, u.prototype.prepareNextSource = function () {
                        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume()
                    }, u.prototype.registerPrevious = function (t) {
                        this._sources.push(t);
                        var e = this;
                        return t.on("data", (function (t) {
                            e.processChunk(t)
                        })), t.on("end", (function () {
                            e.closedSource(e.previous.streamInfo), e._sources.length ? e.prepareNextSource() : e.end()
                        })), t.on("error", (function (t) {
                            e.error(t)
                        })), this
                    }, u.prototype.resume = function () {
                        return !!a.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0))
                    }, u.prototype.error = function (t) {
                        var e = this._sources;
                        if (!a.prototype.error.call(this, t)) return !1;
                        for (var r = 0; r < e.length; r++) try {
                            e[r].error(t)
                        } catch (t) {
                        }
                        return !0
                    }, u.prototype.lock = function () {
                        a.prototype.lock.call(this);
                        for (var t = this._sources, e = 0; e < t.length; e++) t[e].lock()
                    }, e.exports = u
                }, {"../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32}],
                9: [function (t, e, r) {
                    "use strict";
                    var i = t("../compressions"), n = t("./ZipFileWorker");
                    r.generateWorker = function (t, e, r) {
                        var s = new n(e.streamFiles, r, e.platform, e.encodeFileName), a = 0;
                        try {
                            t.forEach((function (t, r) {
                                a++;
                                var n = function (t, e) {
                                        var r = t || e, n = i[r];
                                        if (!n) throw new Error(r + " is not a valid compression method !");
                                        return n
                                    }(r.options.compression, e.compression),
                                    o = r.options.compressionOptions || e.compressionOptions || {}, l = r.dir,
                                    h = r.date;
                                r._compressWorker(n, o).withStreamInfo("file", {
                                    name: t,
                                    dir: l,
                                    date: h,
                                    comment: r.comment || "",
                                    unixPermissions: r.unixPermissions,
                                    dosPermissions: r.dosPermissions
                                }).pipe(s)
                            })), s.entriesCount = a
                        } catch (t) {
                            s.error(t)
                        }
                        return s
                    }
                }, {"../compressions": 3, "./ZipFileWorker": 8}],
                10: [function (t, e, r) {
                    "use strict";

                    function i() {
                        if (!(this instanceof i)) return new i;
                        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                        this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function () {
                            var t = new i;
                            for (var e in this) "function" != typeof this[e] && (t[e] = this[e]);
                            return t
                        }
                    }

                    (i.prototype = t("./object")).loadAsync = t("./load"), i.support = t("./support"), i.defaults = t("./defaults"), i.version = "3.7.1", i.loadAsync = function (t, e) {
                        return (new i).loadAsync(t, e)
                    }, i.external = t("./external"), e.exports = i
                }, {"./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30}],
                11: [function (t, e, r) {
                    "use strict";
                    var i = t("./utils"), n = t("./external"), s = t("./utf8"), a = t("./zipEntries"),
                        o = t("./stream/Crc32Probe"), l = t("./nodejsUtils");

                    function h(t) {
                        return new n.Promise((function (e, r) {
                            var i = t.decompressed.getContentWorker().pipe(new o);
                            i.on("error", (function (t) {
                                r(t)
                            })).on("end", (function () {
                                i.streamInfo.crc32 !== t.decompressed.crc32 ? r(new Error("Corrupted zip : CRC32 mismatch")) : e()
                            })).resume()
                        }))
                    }

                    e.exports = function (t, e) {
                        var r = this;
                        return e = i.extend(e || {}, {
                            base64: !1,
                            checkCRC32: !1,
                            optimizedBinaryString: !1,
                            createFolders: !1,
                            decodeFileName: s.utf8decode
                        }), l.isNode && l.isStream(t) ? n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", t, !0, e.optimizedBinaryString, e.base64).then((function (t) {
                            var r = new a(e);
                            return r.load(t), r
                        })).then((function (t) {
                            var r = [n.Promise.resolve(t)], i = t.files;
                            if (e.checkCRC32) for (var s = 0; s < i.length; s++) r.push(h(i[s]));
                            return n.Promise.all(r)
                        })).then((function (t) {
                            for (var i = t.shift(), n = i.files, s = 0; s < n.length; s++) {
                                var a = n[s];
                                r.file(a.fileNameStr, a.decompressed, {
                                    binary: !0,
                                    optimizedBinaryString: !0,
                                    date: a.date,
                                    dir: a.dir,
                                    comment: a.fileCommentStr.length ? a.fileCommentStr : null,
                                    unixPermissions: a.unixPermissions,
                                    dosPermissions: a.dosPermissions,
                                    createFolders: e.createFolders
                                })
                            }
                            return i.zipComment.length && (r.comment = i.zipComment), r
                        }))
                    }
                }, {
                    "./external": 6,
                    "./nodejsUtils": 14,
                    "./stream/Crc32Probe": 25,
                    "./utf8": 31,
                    "./utils": 32,
                    "./zipEntries": 33
                }],
                12: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils"), n = t("../stream/GenericWorker");

                    function s(t, e) {
                        n.call(this, "Nodejs stream input adapter for " + t), this._upstreamEnded = !1, this._bindStream(e)
                    }

                    i.inherits(s, n), s.prototype._bindStream = function (t) {
                        var e = this;
                        (this._stream = t).pause(), t.on("data", (function (t) {
                            e.push({data: t, meta: {percent: 0}})
                        })).on("error", (function (t) {
                            e.isPaused ? this.generatedError = t : e.error(t)
                        })).on("end", (function () {
                            e.isPaused ? e._upstreamEnded = !0 : e.end()
                        }))
                    }, s.prototype.pause = function () {
                        return !!n.prototype.pause.call(this) && (this._stream.pause(), !0)
                    }, s.prototype.resume = function () {
                        return !!n.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                    }, e.exports = s
                }, {"../stream/GenericWorker": 28, "../utils": 32}],
                13: [function (t, e, r) {
                    "use strict";
                    var i = t("readable-stream").Readable;

                    function n(t, e, r) {
                        i.call(this, e), this._helper = t;
                        var n = this;
                        t.on("data", (function (t, e) {
                            n.push(t) || n._helper.pause(), r && r(e)
                        })).on("error", (function (t) {
                            n.emit("error", t)
                        })).on("end", (function () {
                            n.push(null)
                        }))
                    }

                    t("../utils").inherits(n, i), n.prototype._read = function () {
                        this._helper.resume()
                    }, e.exports = n
                }, {"../utils": 32, "readable-stream": 16}],
                14: [function (t, e, r) {
                    "use strict";
                    e.exports = {
                        isNode: "undefined" != typeof Buffer, newBufferFrom: function (t, e) {
                            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(t, e);
                            if ("number" == typeof t) throw new Error('The "data" argument must not be a number');
                            return new Buffer(t, e)
                        }, allocBuffer: function (t) {
                            if (Buffer.alloc) return Buffer.alloc(t);
                            var e = new Buffer(t);
                            return e.fill(0), e
                        }, isBuffer: function (t) {
                            return Buffer.isBuffer(t)
                        }, isStream: function (t) {
                            return t && "function" == typeof t.on && "function" == typeof t.pause && "function" == typeof t.resume
                        }
                    }
                }, {}],
                15: [function (t, e, r) {
                    "use strict";

                    function i(t, e, r) {
                        var i, n = s.getTypeOf(e), o = s.extend(r || {}, l);
                        o.date = o.date || new Date, null !== o.compression && (o.compression = o.compression.toUpperCase()), "string" == typeof o.unixPermissions && (o.unixPermissions = parseInt(o.unixPermissions, 8)), o.unixPermissions && 16384 & o.unixPermissions && (o.dir = !0), o.dosPermissions && 16 & o.dosPermissions && (o.dir = !0), o.dir && (t = m(t)), o.createFolders && (i = p(t)) && _.call(this, i, !0);
                        var d = "string" === n && !1 === o.binary && !1 === o.base64;
                        r && void 0 !== r.binary || (o.binary = !d), (e instanceof h && 0 === e.uncompressedSize || o.dir || !e || 0 === e.length) && (o.base64 = !1, o.binary = !0, e = "", o.compression = "STORE", n = "string");
                        var g;
                        g = e instanceof h || e instanceof a ? e : c.isNode && c.isStream(e) ? new f(t, e) : s.prepareContent(t, e, o.binary, o.optimizedBinaryString, o.base64);
                        var w = new u(t, g, o);
                        this.files[t] = w
                    }

                    var n = t("./utf8"), s = t("./utils"), a = t("./stream/GenericWorker"),
                        o = t("./stream/StreamHelper"), l = t("./defaults"), h = t("./compressedObject"),
                        u = t("./zipObject"), d = t("./generate"), c = t("./nodejsUtils"),
                        f = t("./nodejs/NodejsStreamInputAdapter"), p = function (t) {
                            "/" === t.slice(-1) && (t = t.substring(0, t.length - 1));
                            var e = t.lastIndexOf("/");
                            return 0 < e ? t.substring(0, e) : ""
                        }, m = function (t) {
                            return "/" !== t.slice(-1) && (t += "/"), t
                        }, _ = function (t, e) {
                            return e = void 0 !== e ? e : l.createFolders, t = m(t), this.files[t] || i.call(this, t, null, {
                                dir: !0,
                                createFolders: e
                            }), this.files[t]
                        };

                    function g(t) {
                        return "[object RegExp]" === Object.prototype.toString.call(t)
                    }

                    var w = {
                        load: function () {
                            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                        }, forEach: function (t) {
                            var e, r, i;
                            for (e in this.files) i = this.files[e], (r = e.slice(this.root.length, e.length)) && e.slice(0, this.root.length) === this.root && t(r, i)
                        }, filter: function (t) {
                            var e = [];
                            return this.forEach((function (r, i) {
                                t(r, i) && e.push(i)
                            })), e
                        }, file: function (t, e, r) {
                            if (1 !== arguments.length) return t = this.root + t, i.call(this, t, e, r), this;
                            if (g(t)) {
                                var n = t;
                                return this.filter((function (t, e) {
                                    return !e.dir && n.test(t)
                                }))
                            }
                            var s = this.files[this.root + t];
                            return s && !s.dir ? s : null
                        }, folder: function (t) {
                            if (!t) return this;
                            if (g(t)) return this.filter((function (e, r) {
                                return r.dir && t.test(e)
                            }));
                            var e = this.root + t, r = _.call(this, e), i = this.clone();
                            return i.root = r.name, i
                        }, remove: function (t) {
                            t = this.root + t;
                            var e = this.files[t];
                            if (e || ("/" !== t.slice(-1) && (t += "/"), e = this.files[t]), e && !e.dir) delete this.files[t]; else for (var r = this.filter((function (e, r) {
                                return r.name.slice(0, t.length) === t
                            })), i = 0; i < r.length; i++) delete this.files[r[i].name];
                            return this
                        }, generate: function (t) {
                            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                        }, generateInternalStream: function (t) {
                            var e, r = {};
                            try {
                                if ((r = s.extend(t || {}, {
                                    streamFiles: !1,
                                    compression: "STORE",
                                    compressionOptions: null,
                                    type: "",
                                    platform: "DOS",
                                    comment: null,
                                    mimeType: "application/zip",
                                    encodeFileName: n.utf8encode
                                })).type = r.type.toLowerCase(), r.compression = r.compression.toUpperCase(), "binarystring" === r.type && (r.type = "string"), !r.type) throw new Error("No output type specified.");
                                s.checkSupport(r.type), "darwin" !== r.platform && "freebsd" !== r.platform && "linux" !== r.platform && "sunos" !== r.platform || (r.platform = "UNIX"), "win32" === r.platform && (r.platform = "DOS");
                                var i = r.comment || this.comment || "";
                                e = d.generateWorker(this, r, i)
                            } catch (t) {
                                (e = new a("error")).error(t)
                            }
                            return new o(e, r.type || "string", r.mimeType)
                        }, generateAsync: function (t, e) {
                            return this.generateInternalStream(t).accumulate(e)
                        }, generateNodeStream: function (t, e) {
                            return (t = t || {}).type || (t.type = "nodebuffer"), this.generateInternalStream(t).toNodejsStream(e)
                        }
                    };
                    e.exports = w
                }, {
                    "./compressedObject": 2,
                    "./defaults": 5,
                    "./generate": 9,
                    "./nodejs/NodejsStreamInputAdapter": 12,
                    "./nodejsUtils": 14,
                    "./stream/GenericWorker": 28,
                    "./stream/StreamHelper": 29,
                    "./utf8": 31,
                    "./utils": 32,
                    "./zipObject": 35
                }],
                16: [function (t, e, r) {
                    e.exports = t("stream")
                }, {stream: void 0}],
                17: [function (t, e, r) {
                    "use strict";
                    var i = t("./DataReader");

                    function n(t) {
                        i.call(this, t);
                        for (var e = 0; e < this.data.length; e++) t[e] = 255 & t[e]
                    }

                    t("../utils").inherits(n, i), n.prototype.byteAt = function (t) {
                        return this.data[this.zero + t]
                    }, n.prototype.lastIndexOfSignature = function (t) {
                        for (var e = t.charCodeAt(0), r = t.charCodeAt(1), i = t.charCodeAt(2), n = t.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === e && this.data[s + 1] === r && this.data[s + 2] === i && this.data[s + 3] === n) return s - this.zero;
                        return -1
                    }, n.prototype.readAndCheckSignature = function (t) {
                        var e = t.charCodeAt(0), r = t.charCodeAt(1), i = t.charCodeAt(2), n = t.charCodeAt(3),
                            s = this.readData(4);
                        return e === s[0] && r === s[1] && i === s[2] && n === s[3]
                    }, n.prototype.readData = function (t) {
                        if (this.checkOffset(t), 0 === t) return [];
                        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                        return this.index += t, e
                    }, e.exports = n
                }, {"../utils": 32, "./DataReader": 18}],
                18: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils");

                    function n(t) {
                        this.data = t, this.length = t.length, this.index = 0, this.zero = 0
                    }

                    n.prototype = {
                        checkOffset: function (t) {
                            this.checkIndex(this.index + t)
                        }, checkIndex: function (t) {
                            if (this.length < this.zero + t || t < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t + "). Corrupted zip ?")
                        }, setIndex: function (t) {
                            this.checkIndex(t), this.index = t
                        }, skip: function (t) {
                            this.setIndex(this.index + t)
                        }, byteAt: function (t) {
                        }, readInt: function (t) {
                            var e, r = 0;
                            for (this.checkOffset(t), e = this.index + t - 1; e >= this.index; e--) r = (r << 8) + this.byteAt(e);
                            return this.index += t, r
                        }, readString: function (t) {
                            return i.transformTo("string", this.readData(t))
                        }, readData: function (t) {
                        }, lastIndexOfSignature: function (t) {
                        }, readAndCheckSignature: function (t) {
                        }, readDate: function () {
                            var t = this.readInt(4);
                            return new Date(Date.UTC(1980 + (t >> 25 & 127), (t >> 21 & 15) - 1, t >> 16 & 31, t >> 11 & 31, t >> 5 & 63, (31 & t) << 1))
                        }
                    }, e.exports = n
                }, {"../utils": 32}],
                19: [function (t, e, r) {
                    "use strict";
                    var i = t("./Uint8ArrayReader");

                    function n(t) {
                        i.call(this, t)
                    }

                    t("../utils").inherits(n, i), n.prototype.readData = function (t) {
                        this.checkOffset(t);
                        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                        return this.index += t, e
                    }, e.exports = n
                }, {"../utils": 32, "./Uint8ArrayReader": 21}],
                20: [function (t, e, r) {
                    "use strict";
                    var i = t("./DataReader");

                    function n(t) {
                        i.call(this, t)
                    }

                    t("../utils").inherits(n, i), n.prototype.byteAt = function (t) {
                        return this.data.charCodeAt(this.zero + t)
                    }, n.prototype.lastIndexOfSignature = function (t) {
                        return this.data.lastIndexOf(t) - this.zero
                    }, n.prototype.readAndCheckSignature = function (t) {
                        return t === this.readData(4)
                    }, n.prototype.readData = function (t) {
                        this.checkOffset(t);
                        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                        return this.index += t, e
                    }, e.exports = n
                }, {"../utils": 32, "./DataReader": 18}],
                21: [function (t, e, r) {
                    "use strict";
                    var i = t("./ArrayReader");

                    function n(t) {
                        i.call(this, t)
                    }

                    t("../utils").inherits(n, i), n.prototype.readData = function (t) {
                        if (this.checkOffset(t), 0 === t) return new Uint8Array(0);
                        var e = this.data.subarray(this.zero + this.index, this.zero + this.index + t);
                        return this.index += t, e
                    }, e.exports = n
                }, {"../utils": 32, "./ArrayReader": 17}],
                22: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils"), n = t("../support"), s = t("./ArrayReader"), a = t("./StringReader"),
                        o = t("./NodeBufferReader"), l = t("./Uint8ArrayReader");
                    e.exports = function (t) {
                        var e = i.getTypeOf(t);
                        return i.checkSupport(e), "string" !== e || n.uint8array ? "nodebuffer" === e ? new o(t) : n.uint8array ? new l(i.transformTo("uint8array", t)) : new s(i.transformTo("array", t)) : new a(t)
                    }
                }, {
                    "../support": 30,
                    "../utils": 32,
                    "./ArrayReader": 17,
                    "./NodeBufferReader": 19,
                    "./StringReader": 20,
                    "./Uint8ArrayReader": 21
                }],
                23: [function (t, e, r) {
                    "use strict";
                    r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\b"
                }, {}],
                24: [function (t, e, r) {
                    "use strict";
                    var i = t("./GenericWorker"), n = t("../utils");

                    function s(t) {
                        i.call(this, "ConvertWorker to " + t), this.destType = t
                    }

                    n.inherits(s, i), s.prototype.processChunk = function (t) {
                        this.push({data: n.transformTo(this.destType, t.data), meta: t.meta})
                    }, e.exports = s
                }, {"../utils": 32, "./GenericWorker": 28}],
                25: [function (t, e, r) {
                    "use strict";
                    var i = t("./GenericWorker"), n = t("../crc32");

                    function s() {
                        i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0)
                    }

                    t("../utils").inherits(s, i), s.prototype.processChunk = function (t) {
                        this.streamInfo.crc32 = n(t.data, this.streamInfo.crc32 || 0), this.push(t)
                    }, e.exports = s
                }, {"../crc32": 4, "../utils": 32, "./GenericWorker": 28}],
                26: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils"), n = t("./GenericWorker");

                    function s(t) {
                        n.call(this, "DataLengthProbe for " + t), this.propName = t, this.withStreamInfo(t, 0)
                    }

                    i.inherits(s, n), s.prototype.processChunk = function (t) {
                        if (t) {
                            var e = this.streamInfo[this.propName] || 0;
                            this.streamInfo[this.propName] = e + t.data.length
                        }
                        n.prototype.processChunk.call(this, t)
                    }, e.exports = s
                }, {"../utils": 32, "./GenericWorker": 28}],
                27: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils"), n = t("./GenericWorker");

                    function s(t) {
                        n.call(this, "DataWorker");
                        var e = this;
                        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, t.then((function (t) {
                            e.dataIsReady = !0, e.data = t, e.max = t && t.length || 0, e.type = i.getTypeOf(t), e.isPaused || e._tickAndRepeat()
                        }), (function (t) {
                            e.error(t)
                        }))
                    }

                    i.inherits(s, n), s.prototype.cleanUp = function () {
                        n.prototype.cleanUp.call(this), this.data = null
                    }, s.prototype.resume = function () {
                        return !!n.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0)
                    }, s.prototype._tickAndRepeat = function () {
                        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0))
                    }, s.prototype._tick = function () {
                        if (this.isPaused || this.isFinished) return !1;
                        var t = null, e = Math.min(this.max, this.index + 16384);
                        if (this.index >= this.max) return this.end();
                        switch (this.type) {
                            case"string":
                                t = this.data.substring(this.index, e);
                                break;
                            case"uint8array":
                                t = this.data.subarray(this.index, e);
                                break;
                            case"array":
                            case"nodebuffer":
                                t = this.data.slice(this.index, e)
                        }
                        return this.index = e, this.push({
                            data: t,
                            meta: {percent: this.max ? this.index / this.max * 100 : 0}
                        })
                    }, e.exports = s
                }, {"../utils": 32, "./GenericWorker": 28}],
                28: [function (t, e, r) {
                    "use strict";

                    function i(t) {
                        this.name = t || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
                            data: [],
                            end: [],
                            error: []
                        }, this.previous = null
                    }

                    i.prototype = {
                        push: function (t) {
                            this.emit("data", t)
                        }, end: function () {
                            if (this.isFinished) return !1;
                            this.flush();
                            try {
                                this.emit("end"), this.cleanUp(), this.isFinished = !0
                            } catch (t) {
                                this.emit("error", t)
                            }
                            return !0
                        }, error: function (t) {
                            return !this.isFinished && (this.isPaused ? this.generatedError = t : (this.isFinished = !0, this.emit("error", t), this.previous && this.previous.error(t), this.cleanUp()), !0)
                        }, on: function (t, e) {
                            return this._listeners[t].push(e), this
                        }, cleanUp: function () {
                            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = []
                        }, emit: function (t, e) {
                            if (this._listeners[t]) for (var r = 0; r < this._listeners[t].length; r++) this._listeners[t][r].call(this, e)
                        }, pipe: function (t) {
                            return t.registerPrevious(this)
                        }, registerPrevious: function (t) {
                            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                            this.streamInfo = t.streamInfo, this.mergeStreamInfo(), this.previous = t;
                            var e = this;
                            return t.on("data", (function (t) {
                                e.processChunk(t)
                            })), t.on("end", (function () {
                                e.end()
                            })), t.on("error", (function (t) {
                                e.error(t)
                            })), this
                        }, pause: function () {
                            return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0)
                        }, resume: function () {
                            if (!this.isPaused || this.isFinished) return !1;
                            var t = this.isPaused = !1;
                            return this.generatedError && (this.error(this.generatedError), t = !0), this.previous && this.previous.resume(), !t
                        }, flush: function () {
                        }, processChunk: function (t) {
                            this.push(t)
                        }, withStreamInfo: function (t, e) {
                            return this.extraStreamInfo[t] = e, this.mergeStreamInfo(), this
                        }, mergeStreamInfo: function () {
                            for (var t in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(t) && (this.streamInfo[t] = this.extraStreamInfo[t])
                        }, lock: function () {
                            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                            this.isLocked = !0, this.previous && this.previous.lock()
                        }, toString: function () {
                            var t = "Worker " + this.name;
                            return this.previous ? this.previous + " -> " + t : t
                        }
                    }, e.exports = i
                }, {}],
                29: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils"), n = t("./ConvertWorker"), s = t("./GenericWorker"), a = t("../base64"),
                        o = t("../support"), l = t("../external"), h = null;
                    if (o.nodestream) try {
                        h = t("../nodejs/NodejsStreamOutputAdapter")
                    } catch (t) {
                    }

                    function u(t, e, r) {
                        var a = e;
                        switch (e) {
                            case"blob":
                            case"arraybuffer":
                                a = "uint8array";
                                break;
                            case"base64":
                                a = "string"
                        }
                        try {
                            this._internalType = a, this._outputType = e, this._mimeType = r, i.checkSupport(a), this._worker = t.pipe(new n(a)), t.lock()
                        } catch (t) {
                            this._worker = new s("error"), this._worker.error(t)
                        }
                    }

                    u.prototype = {
                        accumulate: function (t) {
                            return function (t, e) {
                                return new l.Promise((function (r, n) {
                                    var s = [], o = t._internalType, l = t._outputType, h = t._mimeType;
                                    t.on("data", (function (t, r) {
                                        s.push(t), e && e(r)
                                    })).on("error", (function (t) {
                                        s = [], n(t)
                                    })).on("end", (function () {
                                        try {
                                            var t = function (t, e, r) {
                                                switch (t) {
                                                    case"blob":
                                                        return i.newBlob(i.transformTo("arraybuffer", e), r);
                                                    case"base64":
                                                        return a.encode(e);
                                                    default:
                                                        return i.transformTo(t, e)
                                                }
                                            }(l, function (t, e) {
                                                var r, i = 0, n = null, s = 0;
                                                for (r = 0; r < e.length; r++) s += e[r].length;
                                                switch (t) {
                                                    case"string":
                                                        return e.join("");
                                                    case"array":
                                                        return Array.prototype.concat.apply([], e);
                                                    case"uint8array":
                                                        for (n = new Uint8Array(s), r = 0; r < e.length; r++) n.set(e[r], i), i += e[r].length;
                                                        return n;
                                                    case"nodebuffer":
                                                        return Buffer.concat(e);
                                                    default:
                                                        throw new Error("concat : unsupported type '" + t + "'")
                                                }
                                            }(o, s), h);
                                            r(t)
                                        } catch (t) {
                                            n(t)
                                        }
                                        s = []
                                    })).resume()
                                }))
                            }(this, t)
                        }, on: function (t, e) {
                            var r = this;
                            return "data" === t ? this._worker.on(t, (function (t) {
                                e.call(r, t.data, t.meta)
                            })) : this._worker.on(t, (function () {
                                i.delay(e, arguments, r)
                            })), this
                        }, resume: function () {
                            return i.delay(this._worker.resume, [], this._worker), this
                        }, pause: function () {
                            return this._worker.pause(), this
                        }, toNodejsStream: function (t) {
                            if (i.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
                            return new h(this, {objectMode: "nodebuffer" !== this._outputType}, t)
                        }
                    }, e.exports = u
                }, {
                    "../base64": 1,
                    "../external": 6,
                    "../nodejs/NodejsStreamOutputAdapter": 13,
                    "../support": 30,
                    "../utils": 32,
                    "./ConvertWorker": 24,
                    "./GenericWorker": 28
                }],
                30: [function (t, e, r) {
                    "use strict";
                    if (r.base64 = !0, r.array = !0, r.string = !0, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = !1; else {
                        var i = new ArrayBuffer(0);
                        try {
                            r.blob = 0 === new Blob([i], {type: "application/zip"}).size
                        } catch (t) {
                            try {
                                var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                                n.append(i), r.blob = 0 === n.getBlob("application/zip").size
                            } catch (t) {
                                r.blob = !1
                            }
                        }
                    }
                    try {
                        r.nodestream = !!t("readable-stream").Readable
                    } catch (t) {
                        r.nodestream = !1
                    }
                }, {"readable-stream": 16}],
                31: [function (t, e, r) {
                    "use strict";
                    for (var i = t("./utils"), n = t("./support"), s = t("./nodejsUtils"), a = t("./stream/GenericWorker"), o = new Array(256), l = 0; l < 256; l++) o[l] = 252 <= l ? 6 : 248 <= l ? 5 : 240 <= l ? 4 : 224 <= l ? 3 : 192 <= l ? 2 : 1;

                    function h() {
                        a.call(this, "utf-8 decode"), this.leftOver = null
                    }

                    function u() {
                        a.call(this, "utf-8 encode")
                    }

                    o[254] = o[254] = 1, r.utf8encode = function (t) {
                        return n.nodebuffer ? s.newBufferFrom(t, "utf-8") : function (t) {
                            var e, r, i, s, a, o = t.length, l = 0;
                            for (s = 0; s < o; s++) 55296 == (64512 & (r = t.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (i = t.charCodeAt(s + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), s++), l += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                            for (e = n.uint8array ? new Uint8Array(l) : new Array(l), s = a = 0; a < l; s++) 55296 == (64512 & (r = t.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (i = t.charCodeAt(s + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), s++), r < 128 ? e[a++] = r : (r < 2048 ? e[a++] = 192 | r >>> 6 : (r < 65536 ? e[a++] = 224 | r >>> 12 : (e[a++] = 240 | r >>> 18, e[a++] = 128 | r >>> 12 & 63), e[a++] = 128 | r >>> 6 & 63), e[a++] = 128 | 63 & r);
                            return e
                        }(t)
                    }, r.utf8decode = function (t) {
                        return n.nodebuffer ? i.transformTo("nodebuffer", t).toString("utf-8") : function (t) {
                            var e, r, n, s, a = t.length, l = new Array(2 * a);
                            for (e = r = 0; e < a;) if ((n = t[e++]) < 128) l[r++] = n; else if (4 < (s = o[n])) l[r++] = 65533, e += s - 1; else {
                                for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && e < a;) n = n << 6 | 63 & t[e++], s--;
                                1 < s ? l[r++] = 65533 : n < 65536 ? l[r++] = n : (n -= 65536, l[r++] = 55296 | n >> 10 & 1023, l[r++] = 56320 | 1023 & n)
                            }
                            return l.length !== r && (l.subarray ? l = l.subarray(0, r) : l.length = r), i.applyFromCharCode(l)
                        }(t = i.transformTo(n.uint8array ? "uint8array" : "array", t))
                    }, i.inherits(h, a), h.prototype.processChunk = function (t) {
                        var e = i.transformTo(n.uint8array ? "uint8array" : "array", t.data);
                        if (this.leftOver && this.leftOver.length) {
                            if (n.uint8array) {
                                var s = e;
                                (e = new Uint8Array(s.length + this.leftOver.length)).set(this.leftOver, 0), e.set(s, this.leftOver.length)
                            } else e = this.leftOver.concat(e);
                            this.leftOver = null
                        }
                        var a = function (t, e) {
                            var r;
                            for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]);) r--;
                            return r < 0 || 0 === r ? e : r + o[t[r]] > e ? r : e
                        }(e), l = e;
                        a !== e.length && (n.uint8array ? (l = e.subarray(0, a), this.leftOver = e.subarray(a, e.length)) : (l = e.slice(0, a), this.leftOver = e.slice(a, e.length))), this.push({
                            data: r.utf8decode(l),
                            meta: t.meta
                        })
                    }, h.prototype.flush = function () {
                        this.leftOver && this.leftOver.length && (this.push({
                            data: r.utf8decode(this.leftOver),
                            meta: {}
                        }), this.leftOver = null)
                    }, r.Utf8DecodeWorker = h, i.inherits(u, a), u.prototype.processChunk = function (t) {
                        this.push({data: r.utf8encode(t.data), meta: t.meta})
                    }, r.Utf8EncodeWorker = u
                }, {"./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32}],
                32: [function (t, e, r) {
                    "use strict";
                    var i = t("./support"), n = t("./base64"), s = t("./nodejsUtils"), a = t("set-immediate-shim"),
                        o = t("./external");

                    function l(t) {
                        return t
                    }

                    function h(t, e) {
                        for (var r = 0; r < t.length; ++r) e[r] = 255 & t.charCodeAt(r);
                        return e
                    }

                    r.newBlob = function (t, e) {
                        r.checkSupport("blob");
                        try {
                            return new Blob([t], {type: e})
                        } catch (r) {
                            try {
                                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                                return i.append(t), i.getBlob(e)
                            } catch (t) {
                                throw new Error("Bug : can't construct the Blob.")
                            }
                        }
                    };
                    var u = {
                        stringifyByChunk: function (t, e, r) {
                            var i = [], n = 0, s = t.length;
                            if (s <= r) return String.fromCharCode.apply(null, t);
                            for (; n < s;) "array" === e || "nodebuffer" === e ? i.push(String.fromCharCode.apply(null, t.slice(n, Math.min(n + r, s)))) : i.push(String.fromCharCode.apply(null, t.subarray(n, Math.min(n + r, s)))), n += r;
                            return i.join("")
                        }, stringifyByChar: function (t) {
                            for (var e = "", r = 0; r < t.length; r++) e += String.fromCharCode(t[r]);
                            return e
                        }, applyCanBeUsed: {
                            uint8array: function () {
                                try {
                                    return i.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length
                                } catch (t) {
                                    return !1
                                }
                            }(), nodebuffer: function () {
                                try {
                                    return i.nodebuffer && 1 === String.fromCharCode.apply(null, s.allocBuffer(1)).length
                                } catch (t) {
                                    return !1
                                }
                            }()
                        }
                    };

                    function d(t) {
                        var e = 65536, i = r.getTypeOf(t), n = !0;
                        if ("uint8array" === i ? n = u.applyCanBeUsed.uint8array : "nodebuffer" === i && (n = u.applyCanBeUsed.nodebuffer), n) for (; 1 < e;) try {
                            return u.stringifyByChunk(t, i, e)
                        } catch (t) {
                            e = Math.floor(e / 2)
                        }
                        return u.stringifyByChar(t)
                    }

                    function c(t, e) {
                        for (var r = 0; r < t.length; r++) e[r] = t[r];
                        return e
                    }

                    r.applyFromCharCode = d;
                    var f = {};
                    f.string = {
                        string: l, array: function (t) {
                            return h(t, new Array(t.length))
                        }, arraybuffer: function (t) {
                            return f.string.uint8array(t).buffer
                        }, uint8array: function (t) {
                            return h(t, new Uint8Array(t.length))
                        }, nodebuffer: function (t) {
                            return h(t, s.allocBuffer(t.length))
                        }
                    }, f.array = {
                        string: d, array: l, arraybuffer: function (t) {
                            return new Uint8Array(t).buffer
                        }, uint8array: function (t) {
                            return new Uint8Array(t)
                        }, nodebuffer: function (t) {
                            return s.newBufferFrom(t)
                        }
                    }, f.arraybuffer = {
                        string: function (t) {
                            return d(new Uint8Array(t))
                        }, array: function (t) {
                            return c(new Uint8Array(t), new Array(t.byteLength))
                        }, arraybuffer: l, uint8array: function (t) {
                            return new Uint8Array(t)
                        }, nodebuffer: function (t) {
                            return s.newBufferFrom(new Uint8Array(t))
                        }
                    }, f.uint8array = {
                        string: d, array: function (t) {
                            return c(t, new Array(t.length))
                        }, arraybuffer: function (t) {
                            return t.buffer
                        }, uint8array: l, nodebuffer: function (t) {
                            return s.newBufferFrom(t)
                        }
                    }, f.nodebuffer = {
                        string: d, array: function (t) {
                            return c(t, new Array(t.length))
                        }, arraybuffer: function (t) {
                            return f.nodebuffer.uint8array(t).buffer
                        }, uint8array: function (t) {
                            return c(t, new Uint8Array(t.length))
                        }, nodebuffer: l
                    }, r.transformTo = function (t, e) {
                        if (e = e || "", !t) return e;
                        r.checkSupport(t);
                        var i = r.getTypeOf(e);
                        return f[i][t](e)
                    }, r.getTypeOf = function (t) {
                        return "string" == typeof t ? "string" : "[object Array]" === Object.prototype.toString.call(t) ? "array" : i.nodebuffer && s.isBuffer(t) ? "nodebuffer" : i.uint8array && t instanceof Uint8Array ? "uint8array" : i.arraybuffer && t instanceof ArrayBuffer ? "arraybuffer" : void 0
                    }, r.checkSupport = function (t) {
                        if (!i[t.toLowerCase()]) throw new Error(t + " is not supported by this platform")
                    }, r.MAX_VALUE_16BITS = 65535, r.MAX_VALUE_32BITS = -1, r.pretty = function (t) {
                        var e, r, i = "";
                        for (r = 0; r < (t || "").length; r++) i += "\\x" + ((e = t.charCodeAt(r)) < 16 ? "0" : "") + e.toString(16).toUpperCase();
                        return i
                    }, r.delay = function (t, e, r) {
                        a((function () {
                            t.apply(r || null, e || [])
                        }))
                    }, r.inherits = function (t, e) {
                        function r() {
                        }

                        r.prototype = e.prototype, t.prototype = new r
                    }, r.extend = function () {
                        var t, e, r = {};
                        for (t = 0; t < arguments.length; t++) for (e in arguments[t]) arguments[t].hasOwnProperty(e) && void 0 === r[e] && (r[e] = arguments[t][e]);
                        return r
                    }, r.prepareContent = function (t, e, s, a, l) {
                        return o.Promise.resolve(e).then((function (t) {
                            return i.blob && (t instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(t))) && "undefined" != typeof FileReader ? new o.Promise((function (e, r) {
                                var i = new FileReader;
                                i.onload = function (t) {
                                    e(t.target.result)
                                }, i.onerror = function (t) {
                                    r(t.target.error)
                                }, i.readAsArrayBuffer(t)
                            })) : t
                        })).then((function (e) {
                            var u = r.getTypeOf(e);
                            return u ? ("arraybuffer" === u ? e = r.transformTo("uint8array", e) : "string" === u && (l ? e = n.decode(e) : s && !0 !== a && (e = function (t) {
                                return h(t, i.uint8array ? new Uint8Array(t.length) : new Array(t.length))
                            }(e))), e) : o.Promise.reject(new Error("Can't read the data of '" + t + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
                        }))
                    }
                }, {"./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, "set-immediate-shim": 54}],
                33: [function (t, e, r) {
                    "use strict";
                    var i = t("./reader/readerFor"), n = t("./utils"), s = t("./signature"), a = t("./zipEntry"),
                        o = (t("./utf8"), t("./support"));

                    function l(t) {
                        this.files = [], this.loadOptions = t
                    }

                    l.prototype = {
                        checkSignature: function (t) {
                            if (!this.reader.readAndCheckSignature(t)) {
                                this.reader.index -= 4;
                                var e = this.reader.readString(4);
                                throw new Error("Corrupted zip or bug: unexpected signature (" + n.pretty(e) + ", expected " + n.pretty(t) + ")")
                            }
                        }, isSignature: function (t, e) {
                            var r = this.reader.index;
                            this.reader.setIndex(t);
                            var i = this.reader.readString(4) === e;
                            return this.reader.setIndex(r), i
                        }, readBlockEndOfCentral: function () {
                            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
                            var t = this.reader.readData(this.zipCommentLength),
                                e = o.uint8array ? "uint8array" : "array", r = n.transformTo(e, t);
                            this.zipComment = this.loadOptions.decodeFileName(r)
                        }, readBlockZip64EndOfCentral: function () {
                            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
                            for (var t, e, r, i = this.zip64EndOfCentralSize - 44; 0 < i;) t = this.reader.readInt(2), e = this.reader.readInt(4), r = this.reader.readData(e), this.zip64ExtensibleData[t] = {
                                id: t,
                                length: e,
                                value: r
                            }
                        }, readBlockZip64EndOfCentralLocator: function () {
                            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported")
                        }, readLocalFiles: function () {
                            var t, e;
                            for (t = 0; t < this.files.length; t++) e = this.files[t], this.reader.setIndex(e.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), e.readLocalPart(this.reader), e.handleUTF8(), e.processAttributes()
                        }, readCentralDir: function () {
                            var t;
                            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);) (t = new a({zip64: this.zip64}, this.loadOptions)).readCentralPart(this.reader), this.files.push(t);
                            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
                        }, readEndOfCentral: function () {
                            var t = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
                            if (t < 0) throw this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                            this.reader.setIndex(t);
                            var e = t;
                            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === n.MAX_VALUE_16BITS || this.diskWithCentralDirStart === n.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === n.MAX_VALUE_16BITS || this.centralDirRecords === n.MAX_VALUE_16BITS || this.centralDirSize === n.MAX_VALUE_32BITS || this.centralDirOffset === n.MAX_VALUE_32BITS) {
                                if (this.zip64 = !0, (t = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                                if (this.reader.setIndex(t), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                                this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
                            }
                            var r = this.centralDirOffset + this.centralDirSize;
                            this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
                            var i = e - r;
                            if (0 < i) this.isSignature(e, s.CENTRAL_FILE_HEADER) || (this.reader.zero = i); else if (i < 0) throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.")
                        }, prepareReader: function (t) {
                            this.reader = i(t)
                        }, load: function (t) {
                            this.prepareReader(t), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
                        }
                    }, e.exports = l
                }, {
                    "./reader/readerFor": 22,
                    "./signature": 23,
                    "./support": 30,
                    "./utf8": 31,
                    "./utils": 32,
                    "./zipEntry": 34
                }],
                34: [function (t, e, r) {
                    "use strict";
                    var i = t("./reader/readerFor"), n = t("./utils"), s = t("./compressedObject"), a = t("./crc32"),
                        o = t("./utf8"), l = t("./compressions"), h = t("./support");

                    function u(t, e) {
                        this.options = t, this.loadOptions = e
                    }

                    u.prototype = {
                        isEncrypted: function () {
                            return 1 == (1 & this.bitFlag)
                        }, useUTF8: function () {
                            return 2048 == (2048 & this.bitFlag)
                        }, readLocalPart: function (t) {
                            var e, r;
                            if (t.skip(22), this.fileNameLength = t.readInt(2), r = t.readInt(2), this.fileName = t.readData(this.fileNameLength), t.skip(r), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                            if (null === (e = function (t) {
                                for (var e in l) if (l.hasOwnProperty(e) && l[e].magic === t) return l[e];
                                return null
                            }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + n.pretty(this.compressionMethod) + " unknown (inner file : " + n.transformTo("string", this.fileName) + ")");
                            this.decompressed = new s(this.compressedSize, this.uncompressedSize, this.crc32, e, t.readData(this.compressedSize))
                        }, readCentralPart: function (t) {
                            this.versionMadeBy = t.readInt(2), t.skip(2), this.bitFlag = t.readInt(2), this.compressionMethod = t.readString(2), this.date = t.readDate(), this.crc32 = t.readInt(4), this.compressedSize = t.readInt(4), this.uncompressedSize = t.readInt(4);
                            var e = t.readInt(2);
                            if (this.extraFieldsLength = t.readInt(2), this.fileCommentLength = t.readInt(2), this.diskNumberStart = t.readInt(2), this.internalFileAttributes = t.readInt(2), this.externalFileAttributes = t.readInt(4), this.localHeaderOffset = t.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                            t.skip(e), this.readExtraFields(t), this.parseZIP64ExtraField(t), this.fileComment = t.readData(this.fileCommentLength)
                        }, processAttributes: function () {
                            this.unixPermissions = null, this.dosPermissions = null;
                            var t = this.versionMadeBy >> 8;
                            this.dir = !!(16 & this.externalFileAttributes), 0 == t && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == t && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0)
                        }, parseZIP64ExtraField: function (t) {
                            if (this.extraFields[1]) {
                                var e = i(this.extraFields[1].value);
                                this.uncompressedSize === n.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === n.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === n.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === n.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4))
                            }
                        }, readExtraFields: function (t) {
                            var e, r, i, n = t.index + this.extraFieldsLength;
                            for (this.extraFields || (this.extraFields = {}); t.index + 4 < n;) e = t.readInt(2), r = t.readInt(2), i = t.readData(r), this.extraFields[e] = {
                                id: e,
                                length: r,
                                value: i
                            };
                            t.setIndex(n)
                        }, handleUTF8: function () {
                            var t = h.uint8array ? "uint8array" : "array";
                            if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment); else {
                                var e = this.findExtraFieldUnicodePath();
                                if (null !== e) this.fileNameStr = e; else {
                                    var r = n.transformTo(t, this.fileName);
                                    this.fileNameStr = this.loadOptions.decodeFileName(r)
                                }
                                var i = this.findExtraFieldUnicodeComment();
                                if (null !== i) this.fileCommentStr = i; else {
                                    var s = n.transformTo(t, this.fileComment);
                                    this.fileCommentStr = this.loadOptions.decodeFileName(s)
                                }
                            }
                        }, findExtraFieldUnicodePath: function () {
                            var t = this.extraFields[28789];
                            if (t) {
                                var e = i(t.value);
                                return 1 !== e.readInt(1) || a(this.fileName) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5))
                            }
                            return null
                        }, findExtraFieldUnicodeComment: function () {
                            var t = this.extraFields[25461];
                            if (t) {
                                var e = i(t.value);
                                return 1 !== e.readInt(1) || a(this.fileComment) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5))
                            }
                            return null
                        }
                    }, e.exports = u
                }, {
                    "./compressedObject": 2,
                    "./compressions": 3,
                    "./crc32": 4,
                    "./reader/readerFor": 22,
                    "./support": 30,
                    "./utf8": 31,
                    "./utils": 32
                }],
                35: [function (t, e, r) {
                    "use strict";

                    function i(t, e, r) {
                        this.name = t, this.dir = r.dir, this.date = r.date, this.comment = r.comment, this.unixPermissions = r.unixPermissions, this.dosPermissions = r.dosPermissions, this._data = e, this._dataBinary = r.binary, this.options = {
                            compression: r.compression,
                            compressionOptions: r.compressionOptions
                        }
                    }

                    var n = t("./stream/StreamHelper"), s = t("./stream/DataWorker"), a = t("./utf8"),
                        o = t("./compressedObject"), l = t("./stream/GenericWorker");
                    i.prototype = {
                        internalStream: function (t) {
                            var e = null, r = "string";
                            try {
                                if (!t) throw new Error("No output type specified.");
                                var i = "string" === (r = t.toLowerCase()) || "text" === r;
                                "binarystring" !== r && "text" !== r || (r = "string"), e = this._decompressWorker();
                                var s = !this._dataBinary;
                                s && !i && (e = e.pipe(new a.Utf8EncodeWorker)), !s && i && (e = e.pipe(new a.Utf8DecodeWorker))
                            } catch (t) {
                                (e = new l("error")).error(t)
                            }
                            return new n(e, r, "")
                        }, async: function (t, e) {
                            return this.internalStream(t).accumulate(e)
                        }, nodeStream: function (t, e) {
                            return this.internalStream(t || "nodebuffer").toNodejsStream(e)
                        }, _compressWorker: function (t, e) {
                            if (this._data instanceof o && this._data.compression.magic === t.magic) return this._data.getCompressedWorker();
                            var r = this._decompressWorker();
                            return this._dataBinary || (r = r.pipe(new a.Utf8EncodeWorker)), o.createWorkerFrom(r, t, e)
                        }, _decompressWorker: function () {
                            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof l ? this._data : new s(this._data)
                        }
                    };
                    for (var h = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], u = function () {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    }, d = 0; d < h.length; d++) i.prototype[h[d]] = u;
                    e.exports = i
                }, {
                    "./compressedObject": 2,
                    "./stream/DataWorker": 27,
                    "./stream/GenericWorker": 28,
                    "./stream/StreamHelper": 29,
                    "./utf8": 31
                }],
                36: [function (t, e, i) {
                    (function (t) {
                        "use strict";
                        var r, i, n = t.MutationObserver || t.WebKitMutationObserver;
                        if (n) {
                            var s = 0, a = new n(u), o = t.document.createTextNode("");
                            a.observe(o, {characterData: !0}), r = function () {
                                o.data = s = ++s % 2
                            }
                        } else if (t.setImmediate || void 0 === t.MessageChannel) r = "document" in t && "onreadystatechange" in t.document.createElement("script") ? function () {
                            var e = t.document.createElement("script");
                            e.onreadystatechange = function () {
                                u(), e.onreadystatechange = null, e.parentNode.removeChild(e), e = null
                            }, t.document.documentElement.appendChild(e)
                        } : function () {
                            setTimeout(u, 0)
                        }; else {
                            var l = new t.MessageChannel;
                            l.port1.onmessage = u, r = function () {
                                l.port2.postMessage(0)
                            }
                        }
                        var h = [];

                        function u() {
                            var t, e;
                            i = !0;
                            for (var r = h.length; r;) {
                                for (e = h, h = [], t = -1; ++t < r;) e[t]();
                                r = h.length
                            }
                            i = !1
                        }

                        e.exports = function (t) {
                            1 !== h.push(t) || i || r()
                        }
                    }).call(this, void 0 !== r.g ? r.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {}],
                37: [function (t, e, r) {
                    "use strict";
                    var i = t("immediate");

                    function n() {
                    }

                    var s = {}, a = ["REJECTED"], o = ["FULFILLED"], l = ["PENDING"];

                    function h(t) {
                        if ("function" != typeof t) throw new TypeError("resolver must be a function");
                        this.state = l, this.queue = [], this.outcome = void 0, t !== n && f(this, t)
                    }

                    function u(t, e, r) {
                        this.promise = t, "function" == typeof e && (this.onFulfilled = e, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected)
                    }

                    function d(t, e, r) {
                        i((function () {
                            var i;
                            try {
                                i = e(r)
                            } catch (i) {
                                return s.reject(t, i)
                            }
                            i === t ? s.reject(t, new TypeError("Cannot resolve promise with itself")) : s.resolve(t, i)
                        }))
                    }

                    function c(t) {
                        var e = t && t.then;
                        if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof e) return function () {
                            e.apply(t, arguments)
                        }
                    }

                    function f(t, e) {
                        var r = !1;

                        function i(e) {
                            r || (r = !0, s.reject(t, e))
                        }

                        function n(e) {
                            r || (r = !0, s.resolve(t, e))
                        }

                        var a = p((function () {
                            e(n, i)
                        }));
                        "error" === a.status && i(a.value)
                    }

                    function p(t, e) {
                        var r = {};
                        try {
                            r.value = t(e), r.status = "success"
                        } catch (t) {
                            r.status = "error", r.value = t
                        }
                        return r
                    }

                    (e.exports = h).prototype.finally = function (t) {
                        if ("function" != typeof t) return this;
                        var e = this.constructor;
                        return this.then((function (r) {
                            return e.resolve(t()).then((function () {
                                return r
                            }))
                        }), (function (r) {
                            return e.resolve(t()).then((function () {
                                throw r
                            }))
                        }))
                    }, h.prototype.catch = function (t) {
                        return this.then(null, t)
                    }, h.prototype.then = function (t, e) {
                        if ("function" != typeof t && this.state === o || "function" != typeof e && this.state === a) return this;
                        var r = new this.constructor(n);
                        return this.state !== l ? d(r, this.state === o ? t : e, this.outcome) : this.queue.push(new u(r, t, e)), r
                    }, u.prototype.callFulfilled = function (t) {
                        s.resolve(this.promise, t)
                    }, u.prototype.otherCallFulfilled = function (t) {
                        d(this.promise, this.onFulfilled, t)
                    }, u.prototype.callRejected = function (t) {
                        s.reject(this.promise, t)
                    }, u.prototype.otherCallRejected = function (t) {
                        d(this.promise, this.onRejected, t)
                    }, s.resolve = function (t, e) {
                        var r = p(c, e);
                        if ("error" === r.status) return s.reject(t, r.value);
                        var i = r.value;
                        if (i) f(t, i); else {
                            t.state = o, t.outcome = e;
                            for (var n = -1, a = t.queue.length; ++n < a;) t.queue[n].callFulfilled(e)
                        }
                        return t
                    }, s.reject = function (t, e) {
                        t.state = a, t.outcome = e;
                        for (var r = -1, i = t.queue.length; ++r < i;) t.queue[r].callRejected(e);
                        return t
                    }, h.resolve = function (t) {
                        return t instanceof this ? t : s.resolve(new this(n), t)
                    }, h.reject = function (t) {
                        var e = new this(n);
                        return s.reject(e, t)
                    }, h.all = function (t) {
                        var e = this;
                        if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
                        var r = t.length, i = !1;
                        if (!r) return this.resolve([]);
                        for (var a = new Array(r), o = 0, l = -1, h = new this(n); ++l < r;) u(t[l], l);
                        return h;

                        function u(t, n) {
                            e.resolve(t).then((function (t) {
                                a[n] = t, ++o !== r || i || (i = !0, s.resolve(h, a))
                            }), (function (t) {
                                i || (i = !0, s.reject(h, t))
                            }))
                        }
                    }, h.race = function (t) {
                        if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
                        var e = t.length, r = !1;
                        if (!e) return this.resolve([]);
                        for (var i, a = -1, o = new this(n); ++a < e;) i = t[a], this.resolve(i).then((function (t) {
                            r || (r = !0, s.resolve(o, t))
                        }), (function (t) {
                            r || (r = !0, s.reject(o, t))
                        }));
                        return o
                    }
                }, {immediate: 36}],
                38: [function (t, e, r) {
                    "use strict";
                    var i = {};
                    (0, t("./lib/utils/common").assign)(i, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), e.exports = i
                }, {"./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44}],
                39: [function (t, e, r) {
                    "use strict";
                    var i = t("./zlib/deflate"), n = t("./utils/common"), s = t("./utils/strings"),
                        a = t("./zlib/messages"), o = t("./zlib/zstream"), l = Object.prototype.toString;

                    function h(t) {
                        if (!(this instanceof h)) return new h(t);
                        this.options = n.assign({
                            level: -1,
                            method: 8,
                            chunkSize: 16384,
                            windowBits: 15,
                            memLevel: 8,
                            strategy: 0,
                            to: ""
                        }, t || {});
                        var e = this.options;
                        e.raw && 0 < e.windowBits ? e.windowBits = -e.windowBits : e.gzip && 0 < e.windowBits && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new o, this.strm.avail_out = 0;
                        var r = i.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
                        if (0 !== r) throw new Error(a[r]);
                        if (e.header && i.deflateSetHeader(this.strm, e.header), e.dictionary) {
                            var u;
                            if (u = "string" == typeof e.dictionary ? s.string2buf(e.dictionary) : "[object ArrayBuffer]" === l.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, 0 !== (r = i.deflateSetDictionary(this.strm, u))) throw new Error(a[r]);
                            this._dict_set = !0
                        }
                    }

                    function u(t, e) {
                        var r = new h(e);
                        if (r.push(t, !0), r.err) throw r.msg || a[r.err];
                        return r.result
                    }

                    h.prototype.push = function (t, e) {
                        var r, a, o = this.strm, h = this.options.chunkSize;
                        if (this.ended) return !1;
                        a = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? o.input = s.string2buf(t) : "[object ArrayBuffer]" === l.call(t) ? o.input = new Uint8Array(t) : o.input = t, o.next_in = 0, o.avail_in = o.input.length;
                        do {
                            if (0 === o.avail_out && (o.output = new n.Buf8(h), o.next_out = 0, o.avail_out = h), 1 !== (r = i.deflate(o, a)) && 0 !== r) return this.onEnd(r), !(this.ended = !0);
                            0 !== o.avail_out && (0 !== o.avail_in || 4 !== a && 2 !== a) || ("string" === this.options.to ? this.onData(s.buf2binstring(n.shrinkBuf(o.output, o.next_out))) : this.onData(n.shrinkBuf(o.output, o.next_out)))
                        } while ((0 < o.avail_in || 0 === o.avail_out) && 1 !== r);
                        return 4 === a ? (r = i.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, 0 === r) : 2 !== a || (this.onEnd(0), !(o.avail_out = 0))
                    }, h.prototype.onData = function (t) {
                        this.chunks.push(t)
                    }, h.prototype.onEnd = function (t) {
                        0 === t && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
                    }, r.Deflate = h, r.deflate = u, r.deflateRaw = function (t, e) {
                        return (e = e || {}).raw = !0, u(t, e)
                    }, r.gzip = function (t, e) {
                        return (e = e || {}).gzip = !0, u(t, e)
                    }
                }, {
                    "./utils/common": 41,
                    "./utils/strings": 42,
                    "./zlib/deflate": 46,
                    "./zlib/messages": 51,
                    "./zlib/zstream": 53
                }],
                40: [function (t, e, r) {
                    "use strict";
                    var i = t("./zlib/inflate"), n = t("./utils/common"), s = t("./utils/strings"),
                        a = t("./zlib/constants"), o = t("./zlib/messages"), l = t("./zlib/zstream"),
                        h = t("./zlib/gzheader"), u = Object.prototype.toString;

                    function d(t) {
                        if (!(this instanceof d)) return new d(t);
                        this.options = n.assign({chunkSize: 16384, windowBits: 0, to: ""}, t || {});
                        var e = this.options;
                        e.raw && 0 <= e.windowBits && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(0 <= e.windowBits && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), 15 < e.windowBits && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new l, this.strm.avail_out = 0;
                        var r = i.inflateInit2(this.strm, e.windowBits);
                        if (r !== a.Z_OK) throw new Error(o[r]);
                        this.header = new h, i.inflateGetHeader(this.strm, this.header)
                    }

                    function c(t, e) {
                        var r = new d(e);
                        if (r.push(t, !0), r.err) throw r.msg || o[r.err];
                        return r.result
                    }

                    d.prototype.push = function (t, e) {
                        var r, o, l, h, d, c, f = this.strm, p = this.options.chunkSize, m = this.options.dictionary,
                            _ = !1;
                        if (this.ended) return !1;
                        o = e === ~~e ? e : !0 === e ? a.Z_FINISH : a.Z_NO_FLUSH, "string" == typeof t ? f.input = s.binstring2buf(t) : "[object ArrayBuffer]" === u.call(t) ? f.input = new Uint8Array(t) : f.input = t, f.next_in = 0, f.avail_in = f.input.length;
                        do {
                            if (0 === f.avail_out && (f.output = new n.Buf8(p), f.next_out = 0, f.avail_out = p), (r = i.inflate(f, a.Z_NO_FLUSH)) === a.Z_NEED_DICT && m && (c = "string" == typeof m ? s.string2buf(m) : "[object ArrayBuffer]" === u.call(m) ? new Uint8Array(m) : m, r = i.inflateSetDictionary(this.strm, c)), r === a.Z_BUF_ERROR && !0 === _ && (r = a.Z_OK, _ = !1), r !== a.Z_STREAM_END && r !== a.Z_OK) return this.onEnd(r), !(this.ended = !0);
                            f.next_out && (0 !== f.avail_out && r !== a.Z_STREAM_END && (0 !== f.avail_in || o !== a.Z_FINISH && o !== a.Z_SYNC_FLUSH) || ("string" === this.options.to ? (l = s.utf8border(f.output, f.next_out), h = f.next_out - l, d = s.buf2string(f.output, l), f.next_out = h, f.avail_out = p - h, h && n.arraySet(f.output, f.output, l, h, 0), this.onData(d)) : this.onData(n.shrinkBuf(f.output, f.next_out)))), 0 === f.avail_in && 0 === f.avail_out && (_ = !0)
                        } while ((0 < f.avail_in || 0 === f.avail_out) && r !== a.Z_STREAM_END);
                        return r === a.Z_STREAM_END && (o = a.Z_FINISH), o === a.Z_FINISH ? (r = i.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === a.Z_OK) : o !== a.Z_SYNC_FLUSH || (this.onEnd(a.Z_OK), !(f.avail_out = 0))
                    }, d.prototype.onData = function (t) {
                        this.chunks.push(t)
                    }, d.prototype.onEnd = function (t) {
                        t === a.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
                    }, r.Inflate = d, r.inflate = c, r.inflateRaw = function (t, e) {
                        return (e = e || {}).raw = !0, c(t, e)
                    }, r.ungzip = c
                }, {
                    "./utils/common": 41,
                    "./utils/strings": 42,
                    "./zlib/constants": 44,
                    "./zlib/gzheader": 47,
                    "./zlib/inflate": 49,
                    "./zlib/messages": 51,
                    "./zlib/zstream": 53
                }],
                41: [function (t, e, r) {
                    "use strict";
                    var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                    r.assign = function (t) {
                        for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
                            var r = e.shift();
                            if (r) {
                                if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                                for (var i in r) r.hasOwnProperty(i) && (t[i] = r[i])
                            }
                        }
                        return t
                    }, r.shrinkBuf = function (t, e) {
                        return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t)
                    };
                    var n = {
                        arraySet: function (t, e, r, i, n) {
                            if (e.subarray && t.subarray) t.set(e.subarray(r, r + i), n); else for (var s = 0; s < i; s++) t[n + s] = e[r + s]
                        }, flattenChunks: function (t) {
                            var e, r, i, n, s, a;
                            for (e = i = 0, r = t.length; e < r; e++) i += t[e].length;
                            for (a = new Uint8Array(i), e = n = 0, r = t.length; e < r; e++) s = t[e], a.set(s, n), n += s.length;
                            return a
                        }
                    }, s = {
                        arraySet: function (t, e, r, i, n) {
                            for (var s = 0; s < i; s++) t[n + s] = e[r + s]
                        }, flattenChunks: function (t) {
                            return [].concat.apply([], t)
                        }
                    };
                    r.setTyped = function (t) {
                        t ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, n)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s))
                    }, r.setTyped(i)
                }, {}],
                42: [function (t, e, r) {
                    "use strict";
                    var i = t("./common"), n = !0, s = !0;
                    try {
                        String.fromCharCode.apply(null, [0])
                    } catch (t) {
                        n = !1
                    }
                    try {
                        String.fromCharCode.apply(null, new Uint8Array(1))
                    } catch (t) {
                        s = !1
                    }
                    for (var a = new i.Buf8(256), o = 0; o < 256; o++) a[o] = 252 <= o ? 6 : 248 <= o ? 5 : 240 <= o ? 4 : 224 <= o ? 3 : 192 <= o ? 2 : 1;

                    function l(t, e) {
                        if (e < 65537 && (t.subarray && s || !t.subarray && n)) return String.fromCharCode.apply(null, i.shrinkBuf(t, e));
                        for (var r = "", a = 0; a < e; a++) r += String.fromCharCode(t[a]);
                        return r
                    }

                    a[254] = a[254] = 1, r.string2buf = function (t) {
                        var e, r, n, s, a, o = t.length, l = 0;
                        for (s = 0; s < o; s++) 55296 == (64512 & (r = t.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (n = t.charCodeAt(s + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), s++), l += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                        for (e = new i.Buf8(l), s = a = 0; a < l; s++) 55296 == (64512 & (r = t.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (n = t.charCodeAt(s + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), s++), r < 128 ? e[a++] = r : (r < 2048 ? e[a++] = 192 | r >>> 6 : (r < 65536 ? e[a++] = 224 | r >>> 12 : (e[a++] = 240 | r >>> 18, e[a++] = 128 | r >>> 12 & 63), e[a++] = 128 | r >>> 6 & 63), e[a++] = 128 | 63 & r);
                        return e
                    }, r.buf2binstring = function (t) {
                        return l(t, t.length)
                    }, r.binstring2buf = function (t) {
                        for (var e = new i.Buf8(t.length), r = 0, n = e.length; r < n; r++) e[r] = t.charCodeAt(r);
                        return e
                    }, r.buf2string = function (t, e) {
                        var r, i, n, s, o = e || t.length, h = new Array(2 * o);
                        for (r = i = 0; r < o;) if ((n = t[r++]) < 128) h[i++] = n; else if (4 < (s = a[n])) h[i++] = 65533, r += s - 1; else {
                            for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < o;) n = n << 6 | 63 & t[r++], s--;
                            1 < s ? h[i++] = 65533 : n < 65536 ? h[i++] = n : (n -= 65536, h[i++] = 55296 | n >> 10 & 1023, h[i++] = 56320 | 1023 & n)
                        }
                        return l(h, i)
                    }, r.utf8border = function (t, e) {
                        var r;
                        for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]);) r--;
                        return r < 0 || 0 === r ? e : r + a[t[r]] > e ? r : e
                    }
                }, {"./common": 41}],
                43: [function (t, e, r) {
                    "use strict";
                    e.exports = function (t, e, r, i) {
                        for (var n = 65535 & t | 0, s = t >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
                            for (r -= a = 2e3 < r ? 2e3 : r; s = s + (n = n + e[i++] | 0) | 0, --a;) ;
                            n %= 65521, s %= 65521
                        }
                        return n | s << 16 | 0
                    }
                }, {}],
                44: [function (t, e, r) {
                    "use strict";
                    e.exports = {
                        Z_NO_FLUSH: 0,
                        Z_PARTIAL_FLUSH: 1,
                        Z_SYNC_FLUSH: 2,
                        Z_FULL_FLUSH: 3,
                        Z_FINISH: 4,
                        Z_BLOCK: 5,
                        Z_TREES: 6,
                        Z_OK: 0,
                        Z_STREAM_END: 1,
                        Z_NEED_DICT: 2,
                        Z_ERRNO: -1,
                        Z_STREAM_ERROR: -2,
                        Z_DATA_ERROR: -3,
                        Z_BUF_ERROR: -5,
                        Z_NO_COMPRESSION: 0,
                        Z_BEST_SPEED: 1,
                        Z_BEST_COMPRESSION: 9,
                        Z_DEFAULT_COMPRESSION: -1,
                        Z_FILTERED: 1,
                        Z_HUFFMAN_ONLY: 2,
                        Z_RLE: 3,
                        Z_FIXED: 4,
                        Z_DEFAULT_STRATEGY: 0,
                        Z_BINARY: 0,
                        Z_TEXT: 1,
                        Z_UNKNOWN: 2,
                        Z_DEFLATED: 8
                    }
                }, {}],
                45: [function (t, e, r) {
                    "use strict";
                    var i = function () {
                        for (var t, e = [], r = 0; r < 256; r++) {
                            t = r;
                            for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                            e[r] = t
                        }
                        return e
                    }();
                    e.exports = function (t, e, r, n) {
                        var s = i, a = n + r;
                        t ^= -1;
                        for (var o = n; o < a; o++) t = t >>> 8 ^ s[255 & (t ^ e[o])];
                        return -1 ^ t
                    }
                }, {}],
                46: [function (t, e, r) {
                    "use strict";
                    var i, n = t("../utils/common"), s = t("./trees"), a = t("./adler32"), o = t("./crc32"),
                        l = t("./messages"), h = -2, u = 258, d = 262, c = 113;

                    function f(t, e) {
                        return t.msg = l[e], e
                    }

                    function p(t) {
                        return (t << 1) - (4 < t ? 9 : 0)
                    }

                    function m(t) {
                        for (var e = t.length; 0 <= --e;) t[e] = 0
                    }

                    function _(t) {
                        var e = t.state, r = e.pending;
                        r > t.avail_out && (r = t.avail_out), 0 !== r && (n.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out), t.next_out += r, e.pending_out += r, t.total_out += r, t.avail_out -= r, e.pending -= r, 0 === e.pending && (e.pending_out = 0))
                    }

                    function g(t, e) {
                        s._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, _(t.strm)
                    }

                    function w(t, e) {
                        t.pending_buf[t.pending++] = e
                    }

                    function b(t, e) {
                        t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e
                    }

                    function v(t, e) {
                        var r, i, n = t.max_chain_length, s = t.strstart, a = t.prev_length, o = t.nice_match,
                            l = t.strstart > t.w_size - d ? t.strstart - (t.w_size - d) : 0, h = t.window, c = t.w_mask,
                            f = t.prev, p = t.strstart + u, m = h[s + a - 1], _ = h[s + a];
                        t.prev_length >= t.good_match && (n >>= 2), o > t.lookahead && (o = t.lookahead);
                        do {
                            if (h[(r = e) + a] === _ && h[r + a - 1] === m && h[r] === h[s] && h[++r] === h[s + 1]) {
                                s += 2, r++;
                                do {
                                } while (h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && s < p);
                                if (i = u - (p - s), s = p - u, a < i) {
                                    if (t.match_start = e, o <= (a = i)) break;
                                    m = h[s + a - 1], _ = h[s + a]
                                }
                            }
                        } while ((e = f[e & c]) > l && 0 != --n);
                        return a <= t.lookahead ? a : t.lookahead
                    }

                    function y(t) {
                        var e, r, i, s, l, h, u, c, f, p, m = t.w_size;
                        do {
                            if (s = t.window_size - t.lookahead - t.strstart, t.strstart >= m + (m - d)) {
                                for (n.arraySet(t.window, t.window, m, m, 0), t.match_start -= m, t.strstart -= m, t.block_start -= m, e = r = t.hash_size; i = t.head[--e], t.head[e] = m <= i ? i - m : 0, --r;) ;
                                for (e = r = m; i = t.prev[--e], t.prev[e] = m <= i ? i - m : 0, --r;) ;
                                s += m
                            }
                            if (0 === t.strm.avail_in) break;
                            if (h = t.strm, u = t.window, c = t.strstart + t.lookahead, p = void 0, (f = s) < (p = h.avail_in) && (p = f), r = 0 === p ? 0 : (h.avail_in -= p, n.arraySet(u, h.input, h.next_in, p, c), 1 === h.state.wrap ? h.adler = a(h.adler, u, p, c) : 2 === h.state.wrap && (h.adler = o(h.adler, u, p, c)), h.next_in += p, h.total_in += p, p), t.lookahead += r, t.lookahead + t.insert >= 3) for (l = t.strstart - t.insert, t.ins_h = t.window[l], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[l + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[l + 3 - 1]) & t.hash_mask, t.prev[l & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = l, l++, t.insert--, !(t.lookahead + t.insert < 3));) ;
                        } while (t.lookahead < d && 0 !== t.strm.avail_in)
                    }

                    function k(t, e) {
                        for (var r, i; ;) {
                            if (t.lookahead < d) {
                                if (y(t), t.lookahead < d && 0 === e) return 1;
                                if (0 === t.lookahead) break
                            }
                            if (r = 0, t.lookahead >= 3 && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== r && t.strstart - r <= t.w_size - d && (t.match_length = v(t, r)), t.match_length >= 3) if (i = s._tr_tally(t, t.strstart - t.match_start, t.match_length - 3), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= 3) {
                                for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, 0 != --t.match_length;) ;
                                t.strstart++
                            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask; else i = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
                            if (i && (g(t, !1), 0 === t.strm.avail_out)) return 1
                        }
                        return t.insert = t.strstart < 2 ? t.strstart : 2, 4 === e ? (g(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (g(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                    }

                    function x(t, e) {
                        for (var r, i, n; ;) {
                            if (t.lookahead < d) {
                                if (y(t), t.lookahead < d && 0 === e) return 1;
                                if (0 === t.lookahead) break
                            }
                            if (r = 0, t.lookahead >= 3 && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = 2, 0 !== r && t.prev_length < t.max_lazy_match && t.strstart - r <= t.w_size - d && (t.match_length = v(t, r), t.match_length <= 5 && (1 === t.strategy || 3 === t.match_length && 4096 < t.strstart - t.match_start) && (t.match_length = 2)), t.prev_length >= 3 && t.match_length <= t.prev_length) {
                                for (n = t.strstart + t.lookahead - 3, i = s._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - 3), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= n && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 != --t.prev_length;) ;
                                if (t.match_available = 0, t.match_length = 2, t.strstart++, i && (g(t, !1), 0 === t.strm.avail_out)) return 1
                            } else if (t.match_available) {
                                if ((i = s._tr_tally(t, 0, t.window[t.strstart - 1])) && g(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return 1
                            } else t.match_available = 1, t.strstart++, t.lookahead--
                        }
                        return t.match_available && (i = s._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < 2 ? t.strstart : 2, 4 === e ? (g(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (g(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                    }

                    function A(t, e, r, i, n) {
                        this.good_length = t, this.max_lazy = e, this.nice_length = r, this.max_chain = i, this.func = n
                    }

                    function z() {
                        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = 8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new n.Buf16(1146), this.dyn_dtree = new n.Buf16(122), this.bl_tree = new n.Buf16(78), m(this.dyn_ltree), m(this.dyn_dtree), m(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new n.Buf16(16), this.heap = new n.Buf16(573), m(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new n.Buf16(573), m(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
                    }

                    function E(t) {
                        var e;
                        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = 2, (e = t.state).pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? 42 : c, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = 0, s._tr_init(e), 0) : f(t, h)
                    }

                    function S(t) {
                        var e = E(t);
                        return 0 === e && function (t) {
                            t.window_size = 2 * t.w_size, m(t.head), t.max_lazy_match = i[t.level].max_lazy, t.good_match = i[t.level].good_length, t.nice_match = i[t.level].nice_length, t.max_chain_length = i[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = 2, t.match_available = 0, t.ins_h = 0
                        }(t.state), e
                    }

                    function C(t, e, r, i, s, a) {
                        if (!t) return h;
                        var o = 1;
                        if (-1 === e && (e = 6), i < 0 ? (o = 0, i = -i) : 15 < i && (o = 2, i -= 16), s < 1 || 9 < s || 8 !== r || i < 8 || 15 < i || e < 0 || 9 < e || a < 0 || 4 < a) return f(t, h);
                        8 === i && (i = 9);
                        var l = new z;
                        return (t.state = l).strm = t, l.wrap = o, l.gzhead = null, l.w_bits = i, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = s + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3), l.window = new n.Buf8(2 * l.w_size), l.head = new n.Buf16(l.hash_size), l.prev = new n.Buf16(l.w_size), l.lit_bufsize = 1 << s + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new n.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = e, l.strategy = a, l.method = r, S(t)
                    }

                    i = [new A(0, 0, 0, 0, (function (t, e) {
                        var r = 65535;
                        for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5); ;) {
                            if (t.lookahead <= 1) {
                                if (y(t), 0 === t.lookahead && 0 === e) return 1;
                                if (0 === t.lookahead) break
                            }
                            t.strstart += t.lookahead, t.lookahead = 0;
                            var i = t.block_start + r;
                            if ((0 === t.strstart || t.strstart >= i) && (t.lookahead = t.strstart - i, t.strstart = i, g(t, !1), 0 === t.strm.avail_out)) return 1;
                            if (t.strstart - t.block_start >= t.w_size - d && (g(t, !1), 0 === t.strm.avail_out)) return 1
                        }
                        return t.insert = 0, 4 === e ? (g(t, !0), 0 === t.strm.avail_out ? 3 : 4) : (t.strstart > t.block_start && (g(t, !1), t.strm.avail_out), 1)
                    })), new A(4, 4, 8, 4, k), new A(4, 5, 16, 8, k), new A(4, 6, 32, 32, k), new A(4, 4, 16, 16, x), new A(8, 16, 32, 32, x), new A(8, 16, 128, 128, x), new A(8, 32, 128, 256, x), new A(32, 128, 258, 1024, x), new A(32, 258, 258, 4096, x)], r.deflateInit = function (t, e) {
                        return C(t, e, 8, 15, 8, 0)
                    }, r.deflateInit2 = C, r.deflateReset = S, r.deflateResetKeep = E, r.deflateSetHeader = function (t, e) {
                        return t && t.state ? 2 !== t.state.wrap ? h : (t.state.gzhead = e, 0) : h
                    }, r.deflate = function (t, e) {
                        var r, n, a, l;
                        if (!t || !t.state || 5 < e || e < 0) return t ? f(t, h) : h;
                        if (n = t.state, !t.output || !t.input && 0 !== t.avail_in || 666 === n.status && 4 !== e) return f(t, 0 === t.avail_out ? -5 : h);
                        if (n.strm = t, r = n.last_flush, n.last_flush = e, 42 === n.status) if (2 === n.wrap) t.adler = 0, w(n, 31), w(n, 139), w(n, 8), n.gzhead ? (w(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), w(n, 255 & n.gzhead.time), w(n, n.gzhead.time >> 8 & 255), w(n, n.gzhead.time >> 16 & 255), w(n, n.gzhead.time >> 24 & 255), w(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), w(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (w(n, 255 & n.gzhead.extra.length), w(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = o(t.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (w(n, 0), w(n, 0), w(n, 0), w(n, 0), w(n, 0), w(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), w(n, 3), n.status = c); else {
                            var d = 8 + (n.w_bits - 8 << 4) << 8;
                            d |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6, 0 !== n.strstart && (d |= 32), d += 31 - d % 31, n.status = c, b(n, d), 0 !== n.strstart && (b(n, t.adler >>> 16), b(n, 65535 & t.adler)), t.adler = 1
                        }
                        if (69 === n.status) if (n.gzhead.extra) {
                            for (a = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), _(t), a = n.pending, n.pending !== n.pending_buf_size));) w(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
                            n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73)
                        } else n.status = 73;
                        if (73 === n.status) if (n.gzhead.name) {
                            a = n.pending;
                            do {
                                if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), _(t), a = n.pending, n.pending === n.pending_buf_size)) {
                                    l = 1;
                                    break
                                }
                                l = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, w(n, l)
                            } while (0 !== l);
                            n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), 0 === l && (n.gzindex = 0, n.status = 91)
                        } else n.status = 91;
                        if (91 === n.status) if (n.gzhead.comment) {
                            a = n.pending;
                            do {
                                if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), _(t), a = n.pending, n.pending === n.pending_buf_size)) {
                                    l = 1;
                                    break
                                }
                                l = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, w(n, l)
                            } while (0 !== l);
                            n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), 0 === l && (n.status = 103)
                        } else n.status = 103;
                        if (103 === n.status && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && _(t), n.pending + 2 <= n.pending_buf_size && (w(n, 255 & t.adler), w(n, t.adler >> 8 & 255), t.adler = 0, n.status = c)) : n.status = c), 0 !== n.pending) {
                            if (_(t), 0 === t.avail_out) return n.last_flush = -1, 0
                        } else if (0 === t.avail_in && p(e) <= p(r) && 4 !== e) return f(t, -5);
                        if (666 === n.status && 0 !== t.avail_in) return f(t, -5);
                        if (0 !== t.avail_in || 0 !== n.lookahead || 0 !== e && 666 !== n.status) {
                            var v = 2 === n.strategy ? function (t, e) {
                                for (var r; ;) {
                                    if (0 === t.lookahead && (y(t), 0 === t.lookahead)) {
                                        if (0 === e) return 1;
                                        break
                                    }
                                    if (t.match_length = 0, r = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, r && (g(t, !1), 0 === t.strm.avail_out)) return 1
                                }
                                return t.insert = 0, 4 === e ? (g(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (g(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                            }(n, e) : 3 === n.strategy ? function (t, e) {
                                for (var r, i, n, a, o = t.window; ;) {
                                    if (t.lookahead <= u) {
                                        if (y(t), t.lookahead <= u && 0 === e) return 1;
                                        if (0 === t.lookahead) break
                                    }
                                    if (t.match_length = 0, t.lookahead >= 3 && 0 < t.strstart && (i = o[n = t.strstart - 1]) === o[++n] && i === o[++n] && i === o[++n]) {
                                        a = t.strstart + u;
                                        do {
                                        } while (i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && n < a);
                                        t.match_length = u - (a - n), t.match_length > t.lookahead && (t.match_length = t.lookahead)
                                    }
                                    if (t.match_length >= 3 ? (r = s._tr_tally(t, 1, t.match_length - 3), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (r = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), r && (g(t, !1), 0 === t.strm.avail_out)) return 1
                                }
                                return t.insert = 0, 4 === e ? (g(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (g(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                            }(n, e) : i[n.level].func(n, e);
                            if (3 !== v && 4 !== v || (n.status = 666), 1 === v || 3 === v) return 0 === t.avail_out && (n.last_flush = -1), 0;
                            if (2 === v && (1 === e ? s._tr_align(n) : 5 !== e && (s._tr_stored_block(n, 0, 0, !1), 3 === e && (m(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, n.insert = 0))), _(t), 0 === t.avail_out)) return n.last_flush = -1, 0
                        }
                        return 4 !== e ? 0 : n.wrap <= 0 ? 1 : (2 === n.wrap ? (w(n, 255 & t.adler), w(n, t.adler >> 8 & 255), w(n, t.adler >> 16 & 255), w(n, t.adler >> 24 & 255), w(n, 255 & t.total_in), w(n, t.total_in >> 8 & 255), w(n, t.total_in >> 16 & 255), w(n, t.total_in >> 24 & 255)) : (b(n, t.adler >>> 16), b(n, 65535 & t.adler)), _(t), 0 < n.wrap && (n.wrap = -n.wrap), 0 !== n.pending ? 0 : 1)
                    }, r.deflateEnd = function (t) {
                        var e;
                        return t && t.state ? 42 !== (e = t.state.status) && 69 !== e && 73 !== e && 91 !== e && 103 !== e && e !== c && 666 !== e ? f(t, h) : (t.state = null, e === c ? f(t, -3) : 0) : h
                    }, r.deflateSetDictionary = function (t, e) {
                        var r, i, s, o, l, u, d, c, f = e.length;
                        if (!t || !t.state) return h;
                        if (2 === (o = (r = t.state).wrap) || 1 === o && 42 !== r.status || r.lookahead) return h;
                        for (1 === o && (t.adler = a(t.adler, e, f, 0)), r.wrap = 0, f >= r.w_size && (0 === o && (m(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), c = new n.Buf8(r.w_size), n.arraySet(c, e, f - r.w_size, r.w_size, 0), e = c, f = r.w_size), l = t.avail_in, u = t.next_in, d = t.input, t.avail_in = f, t.next_in = 0, t.input = e, y(r); r.lookahead >= 3;) {
                            for (i = r.strstart, s = r.lookahead - 2; r.ins_h = (r.ins_h << r.hash_shift ^ r.window[i + 3 - 1]) & r.hash_mask, r.prev[i & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = i, i++, --s;) ;
                            r.strstart = i, r.lookahead = 2, y(r)
                        }
                        return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = 2, r.match_available = 0, t.next_in = u, t.input = d, t.avail_in = l, r.wrap = o, 0
                    }, r.deflateInfo = "pako deflate (from Nodeca project)"
                }, {"../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52}],
                47: [function (t, e, r) {
                    "use strict";
                    e.exports = function () {
                        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
                    }
                }, {}],
                48: [function (t, e, r) {
                    "use strict";
                    e.exports = function (t, e) {
                        var r, i, n, s, a, o, l, h, u, d, c, f, p, m, _, g, w, b, v, y, k, x, A, z, E;
                        r = t.state, i = t.next_in, z = t.input, n = i + (t.avail_in - 5), s = t.next_out, E = t.output, a = s - (e - t.avail_out), o = s + (t.avail_out - 257), l = r.dmax, h = r.wsize, u = r.whave, d = r.wnext, c = r.window, f = r.hold, p = r.bits, m = r.lencode, _ = r.distcode, g = (1 << r.lenbits) - 1, w = (1 << r.distbits) - 1;
                        t:do {
                            p < 15 && (f += z[i++] << p, p += 8, f += z[i++] << p, p += 8), b = m[f & g];
                            e:for (; ;) {
                                if (f >>>= v = b >>> 24, p -= v, 0 == (v = b >>> 16 & 255)) E[s++] = 65535 & b; else {
                                    if (!(16 & v)) {
                                        if (0 == (64 & v)) {
                                            b = m[(65535 & b) + (f & (1 << v) - 1)];
                                            continue e
                                        }
                                        if (32 & v) {
                                            r.mode = 12;
                                            break t
                                        }
                                        t.msg = "invalid literal/length code", r.mode = 30;
                                        break t
                                    }
                                    y = 65535 & b, (v &= 15) && (p < v && (f += z[i++] << p, p += 8), y += f & (1 << v) - 1, f >>>= v, p -= v), p < 15 && (f += z[i++] << p, p += 8, f += z[i++] << p, p += 8), b = _[f & w];
                                    r:for (; ;) {
                                        if (f >>>= v = b >>> 24, p -= v, !(16 & (v = b >>> 16 & 255))) {
                                            if (0 == (64 & v)) {
                                                b = _[(65535 & b) + (f & (1 << v) - 1)];
                                                continue r
                                            }
                                            t.msg = "invalid distance code", r.mode = 30;
                                            break t
                                        }
                                        if (k = 65535 & b, p < (v &= 15) && (f += z[i++] << p, (p += 8) < v && (f += z[i++] << p, p += 8)), l < (k += f & (1 << v) - 1)) {
                                            t.msg = "invalid distance too far back", r.mode = 30;
                                            break t
                                        }
                                        if (f >>>= v, p -= v, (v = s - a) < k) {
                                            if (u < (v = k - v) && r.sane) {
                                                t.msg = "invalid distance too far back", r.mode = 30;
                                                break t
                                            }
                                            if (A = c, (x = 0) === d) {
                                                if (x += h - v, v < y) {
                                                    for (y -= v; E[s++] = c[x++], --v;) ;
                                                    x = s - k, A = E
                                                }
                                            } else if (d < v) {
                                                if (x += h + d - v, (v -= d) < y) {
                                                    for (y -= v; E[s++] = c[x++], --v;) ;
                                                    if (x = 0, d < y) {
                                                        for (y -= v = d; E[s++] = c[x++], --v;) ;
                                                        x = s - k, A = E
                                                    }
                                                }
                                            } else if (x += d - v, v < y) {
                                                for (y -= v; E[s++] = c[x++], --v;) ;
                                                x = s - k, A = E
                                            }
                                            for (; 2 < y;) E[s++] = A[x++], E[s++] = A[x++], E[s++] = A[x++], y -= 3;
                                            y && (E[s++] = A[x++], 1 < y && (E[s++] = A[x++]))
                                        } else {
                                            for (x = s - k; E[s++] = E[x++], E[s++] = E[x++], E[s++] = E[x++], 2 < (y -= 3);) ;
                                            y && (E[s++] = E[x++], 1 < y && (E[s++] = E[x++]))
                                        }
                                        break
                                    }
                                }
                                break
                            }
                        } while (i < n && s < o);
                        i -= y = p >> 3, f &= (1 << (p -= y << 3)) - 1, t.next_in = i, t.next_out = s, t.avail_in = i < n ? n - i + 5 : 5 - (i - n), t.avail_out = s < o ? o - s + 257 : 257 - (s - o), r.hold = f, r.bits = p
                    }
                }, {}],
                49: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils/common"), n = t("./adler32"), s = t("./crc32"), a = t("./inffast"),
                        o = t("./inftrees"), l = -2;

                    function h(t) {
                        return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
                    }

                    function u() {
                        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i.Buf16(320), this.work = new i.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
                    }

                    function d(t) {
                        var e;
                        return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = 1, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new i.Buf32(852), e.distcode = e.distdyn = new i.Buf32(592), e.sane = 1, e.back = -1, 0) : l
                    }

                    function c(t) {
                        var e;
                        return t && t.state ? ((e = t.state).wsize = 0, e.whave = 0, e.wnext = 0, d(t)) : l
                    }

                    function f(t, e) {
                        var r, i;
                        return t && t.state ? (i = t.state, e < 0 ? (r = 0, e = -e) : (r = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || 15 < e) ? l : (null !== i.window && i.wbits !== e && (i.window = null), i.wrap = r, i.wbits = e, c(t))) : l
                    }

                    function p(t, e) {
                        var r, i;
                        return t ? (i = new u, (t.state = i).window = null, 0 !== (r = f(t, e)) && (t.state = null), r) : l
                    }

                    var m, _, g = !0;

                    function w(t) {
                        if (g) {
                            var e;
                            for (m = new i.Buf32(512), _ = new i.Buf32(32), e = 0; e < 144;) t.lens[e++] = 8;
                            for (; e < 256;) t.lens[e++] = 9;
                            for (; e < 280;) t.lens[e++] = 7;
                            for (; e < 288;) t.lens[e++] = 8;
                            for (o(1, t.lens, 0, 288, m, 0, t.work, {bits: 9}), e = 0; e < 32;) t.lens[e++] = 5;
                            o(2, t.lens, 0, 32, _, 0, t.work, {bits: 5}), g = !1
                        }
                        t.lencode = m, t.lenbits = 9, t.distcode = _, t.distbits = 5
                    }

                    function b(t, e, r, n) {
                        var s, a = t.state;
                        return null === a.window && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new i.Buf8(a.wsize)), n >= a.wsize ? (i.arraySet(a.window, e, r - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : (n < (s = a.wsize - a.wnext) && (s = n), i.arraySet(a.window, e, r - n, s, a.wnext), (n -= s) ? (i.arraySet(a.window, e, r - n, n, 0), a.wnext = n, a.whave = a.wsize) : (a.wnext += s, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += s))), 0
                    }

                    r.inflateReset = c, r.inflateReset2 = f, r.inflateResetKeep = d, r.inflateInit = function (t) {
                        return p(t, 15)
                    }, r.inflateInit2 = p, r.inflate = function (t, e) {
                        var r, u, d, c, f, p, m, _, g, v, y, k, x, A, z, E, S, C, B, U, I, T, F, L, R = 0,
                            O = new i.Buf8(4), D = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                        if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return l;
                        12 === (r = t.state).mode && (r.mode = 13), f = t.next_out, d = t.output, m = t.avail_out, c = t.next_in, u = t.input, p = t.avail_in, _ = r.hold, g = r.bits, v = p, y = m, T = 0;
                        t:for (; ;) switch (r.mode) {
                            case 1:
                                if (0 === r.wrap) {
                                    r.mode = 13;
                                    break
                                }
                                for (; g < 16;) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                if (2 & r.wrap && 35615 === _) {
                                    O[r.check = 0] = 255 & _, O[1] = _ >>> 8 & 255, r.check = s(r.check, O, 2, 0), g = _ = 0, r.mode = 2;
                                    break
                                }
                                if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & _) << 8) + (_ >> 8)) % 31) {
                                    t.msg = "incorrect header check", r.mode = 30;
                                    break
                                }
                                if (8 != (15 & _)) {
                                    t.msg = "unknown compression method", r.mode = 30;
                                    break
                                }
                                if (g -= 4, I = 8 + (15 & (_ >>>= 4)), 0 === r.wbits) r.wbits = I; else if (I > r.wbits) {
                                    t.msg = "invalid window size", r.mode = 30;
                                    break
                                }
                                r.dmax = 1 << I, t.adler = r.check = 1, r.mode = 512 & _ ? 10 : 12, g = _ = 0;
                                break;
                            case 2:
                                for (; g < 16;) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                if (r.flags = _, 8 != (255 & r.flags)) {
                                    t.msg = "unknown compression method", r.mode = 30;
                                    break
                                }
                                if (57344 & r.flags) {
                                    t.msg = "unknown header flags set", r.mode = 30;
                                    break
                                }
                                r.head && (r.head.text = _ >> 8 & 1), 512 & r.flags && (O[0] = 255 & _, O[1] = _ >>> 8 & 255, r.check = s(r.check, O, 2, 0)), g = _ = 0, r.mode = 3;
                            case 3:
                                for (; g < 32;) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                r.head && (r.head.time = _), 512 & r.flags && (O[0] = 255 & _, O[1] = _ >>> 8 & 255, O[2] = _ >>> 16 & 255, O[3] = _ >>> 24 & 255, r.check = s(r.check, O, 4, 0)), g = _ = 0, r.mode = 4;
                            case 4:
                                for (; g < 16;) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                r.head && (r.head.xflags = 255 & _, r.head.os = _ >> 8), 512 & r.flags && (O[0] = 255 & _, O[1] = _ >>> 8 & 255, r.check = s(r.check, O, 2, 0)), g = _ = 0, r.mode = 5;
                            case 5:
                                if (1024 & r.flags) {
                                    for (; g < 16;) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    r.length = _, r.head && (r.head.extra_len = _), 512 & r.flags && (O[0] = 255 & _, O[1] = _ >>> 8 & 255, r.check = s(r.check, O, 2, 0)), g = _ = 0
                                } else r.head && (r.head.extra = null);
                                r.mode = 6;
                            case 6:
                                if (1024 & r.flags && (p < (k = r.length) && (k = p), k && (r.head && (I = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), i.arraySet(r.head.extra, u, c, k, I)), 512 & r.flags && (r.check = s(r.check, u, k, c)), p -= k, c += k, r.length -= k), r.length)) break t;
                                r.length = 0, r.mode = 7;
                            case 7:
                                if (2048 & r.flags) {
                                    if (0 === p) break t;
                                    for (k = 0; I = u[c + k++], r.head && I && r.length < 65536 && (r.head.name += String.fromCharCode(I)), I && k < p;) ;
                                    if (512 & r.flags && (r.check = s(r.check, u, k, c)), p -= k, c += k, I) break t
                                } else r.head && (r.head.name = null);
                                r.length = 0, r.mode = 8;
                            case 8:
                                if (4096 & r.flags) {
                                    if (0 === p) break t;
                                    for (k = 0; I = u[c + k++], r.head && I && r.length < 65536 && (r.head.comment += String.fromCharCode(I)), I && k < p;) ;
                                    if (512 & r.flags && (r.check = s(r.check, u, k, c)), p -= k, c += k, I) break t
                                } else r.head && (r.head.comment = null);
                                r.mode = 9;
                            case 9:
                                if (512 & r.flags) {
                                    for (; g < 16;) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    if (_ !== (65535 & r.check)) {
                                        t.msg = "header crc mismatch", r.mode = 30;
                                        break
                                    }
                                    g = _ = 0
                                }
                                r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), t.adler = r.check = 0, r.mode = 12;
                                break;
                            case 10:
                                for (; g < 32;) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                t.adler = r.check = h(_), g = _ = 0, r.mode = 11;
                            case 11:
                                if (0 === r.havedict) return t.next_out = f, t.avail_out = m, t.next_in = c, t.avail_in = p, r.hold = _, r.bits = g, 2;
                                t.adler = r.check = 1, r.mode = 12;
                            case 12:
                                if (5 === e || 6 === e) break t;
                            case 13:
                                if (r.last) {
                                    _ >>>= 7 & g, g -= 7 & g, r.mode = 27;
                                    break
                                }
                                for (; g < 3;) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                switch (r.last = 1 & _, g -= 1, 3 & (_ >>>= 1)) {
                                    case 0:
                                        r.mode = 14;
                                        break;
                                    case 1:
                                        if (w(r), r.mode = 20, 6 !== e) break;
                                        _ >>>= 2, g -= 2;
                                        break t;
                                    case 2:
                                        r.mode = 17;
                                        break;
                                    case 3:
                                        t.msg = "invalid block type", r.mode = 30
                                }
                                _ >>>= 2, g -= 2;
                                break;
                            case 14:
                                for (_ >>>= 7 & g, g -= 7 & g; g < 32;) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                if ((65535 & _) != (_ >>> 16 ^ 65535)) {
                                    t.msg = "invalid stored block lengths", r.mode = 30;
                                    break
                                }
                                if (r.length = 65535 & _, g = _ = 0, r.mode = 15, 6 === e) break t;
                            case 15:
                                r.mode = 16;
                            case 16:
                                if (k = r.length) {
                                    if (p < k && (k = p), m < k && (k = m), 0 === k) break t;
                                    i.arraySet(d, u, c, k, f), p -= k, c += k, m -= k, f += k, r.length -= k;
                                    break
                                }
                                r.mode = 12;
                                break;
                            case 17:
                                for (; g < 14;) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                if (r.nlen = 257 + (31 & _), _ >>>= 5, g -= 5, r.ndist = 1 + (31 & _), _ >>>= 5, g -= 5, r.ncode = 4 + (15 & _), _ >>>= 4, g -= 4, 286 < r.nlen || 30 < r.ndist) {
                                    t.msg = "too many length or distance symbols", r.mode = 30;
                                    break
                                }
                                r.have = 0, r.mode = 18;
                            case 18:
                                for (; r.have < r.ncode;) {
                                    for (; g < 3;) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    r.lens[D[r.have++]] = 7 & _, _ >>>= 3, g -= 3
                                }
                                for (; r.have < 19;) r.lens[D[r.have++]] = 0;
                                if (r.lencode = r.lendyn, r.lenbits = 7, F = {bits: r.lenbits}, T = o(0, r.lens, 0, 19, r.lencode, 0, r.work, F), r.lenbits = F.bits, T) {
                                    t.msg = "invalid code lengths set", r.mode = 30;
                                    break
                                }
                                r.have = 0, r.mode = 19;
                            case 19:
                                for (; r.have < r.nlen + r.ndist;) {
                                    for (; E = (R = r.lencode[_ & (1 << r.lenbits) - 1]) >>> 16 & 255, S = 65535 & R, !((z = R >>> 24) <= g);) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    if (S < 16) _ >>>= z, g -= z, r.lens[r.have++] = S; else {
                                        if (16 === S) {
                                            for (L = z + 2; g < L;) {
                                                if (0 === p) break t;
                                                p--, _ += u[c++] << g, g += 8
                                            }
                                            if (_ >>>= z, g -= z, 0 === r.have) {
                                                t.msg = "invalid bit length repeat", r.mode = 30;
                                                break
                                            }
                                            I = r.lens[r.have - 1], k = 3 + (3 & _), _ >>>= 2, g -= 2
                                        } else if (17 === S) {
                                            for (L = z + 3; g < L;) {
                                                if (0 === p) break t;
                                                p--, _ += u[c++] << g, g += 8
                                            }
                                            g -= z, I = 0, k = 3 + (7 & (_ >>>= z)), _ >>>= 3, g -= 3
                                        } else {
                                            for (L = z + 7; g < L;) {
                                                if (0 === p) break t;
                                                p--, _ += u[c++] << g, g += 8
                                            }
                                            g -= z, I = 0, k = 11 + (127 & (_ >>>= z)), _ >>>= 7, g -= 7
                                        }
                                        if (r.have + k > r.nlen + r.ndist) {
                                            t.msg = "invalid bit length repeat", r.mode = 30;
                                            break
                                        }
                                        for (; k--;) r.lens[r.have++] = I
                                    }
                                }
                                if (30 === r.mode) break;
                                if (0 === r.lens[256]) {
                                    t.msg = "invalid code -- missing end-of-block", r.mode = 30;
                                    break
                                }
                                if (r.lenbits = 9, F = {bits: r.lenbits}, T = o(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, F), r.lenbits = F.bits, T) {
                                    t.msg = "invalid literal/lengths set", r.mode = 30;
                                    break
                                }
                                if (r.distbits = 6, r.distcode = r.distdyn, F = {bits: r.distbits}, T = o(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, F), r.distbits = F.bits, T) {
                                    t.msg = "invalid distances set", r.mode = 30;
                                    break
                                }
                                if (r.mode = 20, 6 === e) break t;
                            case 20:
                                r.mode = 21;
                            case 21:
                                if (6 <= p && 258 <= m) {
                                    t.next_out = f, t.avail_out = m, t.next_in = c, t.avail_in = p, r.hold = _, r.bits = g, a(t, y), f = t.next_out, d = t.output, m = t.avail_out, c = t.next_in, u = t.input, p = t.avail_in, _ = r.hold, g = r.bits, 12 === r.mode && (r.back = -1);
                                    break
                                }
                                for (r.back = 0; E = (R = r.lencode[_ & (1 << r.lenbits) - 1]) >>> 16 & 255, S = 65535 & R, !((z = R >>> 24) <= g);) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                if (E && 0 == (240 & E)) {
                                    for (C = z, B = E, U = S; E = (R = r.lencode[U + ((_ & (1 << C + B) - 1) >> C)]) >>> 16 & 255, S = 65535 & R, !(C + (z = R >>> 24) <= g);) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    _ >>>= C, g -= C, r.back += C
                                }
                                if (_ >>>= z, g -= z, r.back += z, r.length = S, 0 === E) {
                                    r.mode = 26;
                                    break
                                }
                                if (32 & E) {
                                    r.back = -1, r.mode = 12;
                                    break
                                }
                                if (64 & E) {
                                    t.msg = "invalid literal/length code", r.mode = 30;
                                    break
                                }
                                r.extra = 15 & E, r.mode = 22;
                            case 22:
                                if (r.extra) {
                                    for (L = r.extra; g < L;) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    r.length += _ & (1 << r.extra) - 1, _ >>>= r.extra, g -= r.extra, r.back += r.extra
                                }
                                r.was = r.length, r.mode = 23;
                            case 23:
                                for (; E = (R = r.distcode[_ & (1 << r.distbits) - 1]) >>> 16 & 255, S = 65535 & R, !((z = R >>> 24) <= g);) {
                                    if (0 === p) break t;
                                    p--, _ += u[c++] << g, g += 8
                                }
                                if (0 == (240 & E)) {
                                    for (C = z, B = E, U = S; E = (R = r.distcode[U + ((_ & (1 << C + B) - 1) >> C)]) >>> 16 & 255, S = 65535 & R, !(C + (z = R >>> 24) <= g);) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    _ >>>= C, g -= C, r.back += C
                                }
                                if (_ >>>= z, g -= z, r.back += z, 64 & E) {
                                    t.msg = "invalid distance code", r.mode = 30;
                                    break
                                }
                                r.offset = S, r.extra = 15 & E, r.mode = 24;
                            case 24:
                                if (r.extra) {
                                    for (L = r.extra; g < L;) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    r.offset += _ & (1 << r.extra) - 1, _ >>>= r.extra, g -= r.extra, r.back += r.extra
                                }
                                if (r.offset > r.dmax) {
                                    t.msg = "invalid distance too far back", r.mode = 30;
                                    break
                                }
                                r.mode = 25;
                            case 25:
                                if (0 === m) break t;
                                if (k = y - m, r.offset > k) {
                                    if ((k = r.offset - k) > r.whave && r.sane) {
                                        t.msg = "invalid distance too far back", r.mode = 30;
                                        break
                                    }
                                    x = k > r.wnext ? (k -= r.wnext, r.wsize - k) : r.wnext - k, k > r.length && (k = r.length), A = r.window
                                } else A = d, x = f - r.offset, k = r.length;
                                for (m < k && (k = m), m -= k, r.length -= k; d[f++] = A[x++], --k;) ;
                                0 === r.length && (r.mode = 21);
                                break;
                            case 26:
                                if (0 === m) break t;
                                d[f++] = r.length, m--, r.mode = 21;
                                break;
                            case 27:
                                if (r.wrap) {
                                    for (; g < 32;) {
                                        if (0 === p) break t;
                                        p--, _ |= u[c++] << g, g += 8
                                    }
                                    if (y -= m, t.total_out += y, r.total += y, y && (t.adler = r.check = r.flags ? s(r.check, d, y, f - y) : n(r.check, d, y, f - y)), y = m, (r.flags ? _ : h(_)) !== r.check) {
                                        t.msg = "incorrect data check", r.mode = 30;
                                        break
                                    }
                                    g = _ = 0
                                }
                                r.mode = 28;
                            case 28:
                                if (r.wrap && r.flags) {
                                    for (; g < 32;) {
                                        if (0 === p) break t;
                                        p--, _ += u[c++] << g, g += 8
                                    }
                                    if (_ !== (4294967295 & r.total)) {
                                        t.msg = "incorrect length check", r.mode = 30;
                                        break
                                    }
                                    g = _ = 0
                                }
                                r.mode = 29;
                            case 29:
                                T = 1;
                                break t;
                            case 30:
                                T = -3;
                                break t;
                            case 31:
                                return -4;
                            case 32:
                            default:
                                return l
                        }
                        return t.next_out = f, t.avail_out = m, t.next_in = c, t.avail_in = p, r.hold = _, r.bits = g, (r.wsize || y !== t.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== e)) && b(t, t.output, t.next_out, y - t.avail_out) ? (r.mode = 31, -4) : (v -= t.avail_in, y -= t.avail_out, t.total_in += v, t.total_out += y, r.total += y, r.wrap && y && (t.adler = r.check = r.flags ? s(r.check, d, y, t.next_out - y) : n(r.check, d, y, t.next_out - y)), t.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 == v && 0 === y || 4 === e) && 0 === T && (T = -5), T)
                    }, r.inflateEnd = function (t) {
                        if (!t || !t.state) return l;
                        var e = t.state;
                        return e.window && (e.window = null), t.state = null, 0
                    }, r.inflateGetHeader = function (t, e) {
                        var r;
                        return t && t.state ? 0 == (2 & (r = t.state).wrap) ? l : ((r.head = e).done = !1, 0) : l
                    }, r.inflateSetDictionary = function (t, e) {
                        var r, i = e.length;
                        return t && t.state ? 0 !== (r = t.state).wrap && 11 !== r.mode ? l : 11 === r.mode && n(1, e, i, 0) !== r.check ? -3 : b(t, e, i, i) ? (r.mode = 31, -4) : (r.havedict = 1, 0) : l
                    }, r.inflateInfo = "pako inflate (from Nodeca project)"
                }, {"../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50}],
                50: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils/common"),
                        n = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                        s = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                        a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                        o = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                    e.exports = function (t, e, r, l, h, u, d, c) {
                        var f, p, m, _, g, w, b, v, y, k = c.bits, x = 0, A = 0, z = 0, E = 0, S = 0, C = 0, B = 0,
                            U = 0, I = 0, T = 0, F = null, L = 0, R = new i.Buf16(16), O = new i.Buf16(16), D = null,
                            P = 0;
                        for (x = 0; x <= 15; x++) R[x] = 0;
                        for (A = 0; A < l; A++) R[e[r + A]]++;
                        for (S = k, E = 15; 1 <= E && 0 === R[E]; E--) ;
                        if (E < S && (S = E), 0 === E) return h[u++] = 20971520, h[u++] = 20971520, c.bits = 1, 0;
                        for (z = 1; z < E && 0 === R[z]; z++) ;
                        for (S < z && (S = z), x = U = 1; x <= 15; x++) if (U <<= 1, (U -= R[x]) < 0) return -1;
                        if (0 < U && (0 === t || 1 !== E)) return -1;
                        for (O[1] = 0, x = 1; x < 15; x++) O[x + 1] = O[x] + R[x];
                        for (A = 0; A < l; A++) 0 !== e[r + A] && (d[O[e[r + A]]++] = A);
                        if (w = 0 === t ? (F = D = d, 19) : 1 === t ? (F = n, L -= 257, D = s, P -= 257, 256) : (F = a, D = o, -1), x = z, g = u, B = A = T = 0, m = -1, _ = (I = 1 << (C = S)) - 1, 1 === t && 852 < I || 2 === t && 592 < I) return 1;
                        for (; ;) {
                            for (b = x - B, y = d[A] < w ? (v = 0, d[A]) : d[A] > w ? (v = D[P + d[A]], F[L + d[A]]) : (v = 96, 0), f = 1 << x - B, z = p = 1 << C; h[g + (T >> B) + (p -= f)] = b << 24 | v << 16 | y | 0, 0 !== p;) ;
                            for (f = 1 << x - 1; T & f;) f >>= 1;
                            if (0 !== f ? (T &= f - 1, T += f) : T = 0, A++, 0 == --R[x]) {
                                if (x === E) break;
                                x = e[r + d[A]]
                            }
                            if (S < x && (T & _) !== m) {
                                for (0 === B && (B = S), g += z, U = 1 << (C = x - B); C + B < E && !((U -= R[C + B]) <= 0);) C++, U <<= 1;
                                if (I += 1 << C, 1 === t && 852 < I || 2 === t && 592 < I) return 1;
                                h[m = T & _] = S << 24 | C << 16 | g - u | 0
                            }
                        }
                        return 0 !== T && (h[g + T] = x - B << 24 | 64 << 16 | 0), c.bits = S, 0
                    }
                }, {"../utils/common": 41}],
                51: [function (t, e, r) {
                    "use strict";
                    e.exports = {
                        2: "need dictionary",
                        1: "stream end",
                        0: "",
                        "-1": "file error",
                        "-2": "stream error",
                        "-3": "data error",
                        "-4": "insufficient memory",
                        "-5": "buffer error",
                        "-6": "incompatible version"
                    }
                }, {}],
                52: [function (t, e, r) {
                    "use strict";
                    var i = t("../utils/common");

                    function n(t) {
                        for (var e = t.length; 0 <= --e;) t[e] = 0
                    }

                    var s = 256, a = 286, o = 30, l = 15,
                        h = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                        u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                        d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                        c = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], f = new Array(576);
                    n(f);
                    var p = new Array(60);
                    n(p);
                    var m = new Array(512);
                    n(m);
                    var _ = new Array(256);
                    n(_);
                    var g = new Array(29);
                    n(g);
                    var w, b, v, y = new Array(o);

                    function k(t, e, r, i, n) {
                        this.static_tree = t, this.extra_bits = e, this.extra_base = r, this.elems = i, this.max_length = n, this.has_stree = t && t.length
                    }

                    function x(t, e) {
                        this.dyn_tree = t, this.max_code = 0, this.stat_desc = e
                    }

                    function A(t) {
                        return t < 256 ? m[t] : m[256 + (t >>> 7)]
                    }

                    function z(t, e) {
                        t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255
                    }

                    function E(t, e, r) {
                        t.bi_valid > 16 - r ? (t.bi_buf |= e << t.bi_valid & 65535, z(t, t.bi_buf), t.bi_buf = e >> 16 - t.bi_valid, t.bi_valid += r - 16) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += r)
                    }

                    function S(t, e, r) {
                        E(t, r[2 * e], r[2 * e + 1])
                    }

                    function C(t, e) {
                        for (var r = 0; r |= 1 & t, t >>>= 1, r <<= 1, 0 < --e;) ;
                        return r >>> 1
                    }

                    function B(t, e, r) {
                        var i, n, s = new Array(16), a = 0;
                        for (i = 1; i <= l; i++) s[i] = a = a + r[i - 1] << 1;
                        for (n = 0; n <= e; n++) {
                            var o = t[2 * n + 1];
                            0 !== o && (t[2 * n] = C(s[o]++, o))
                        }
                    }

                    function U(t) {
                        var e;
                        for (e = 0; e < a; e++) t.dyn_ltree[2 * e] = 0;
                        for (e = 0; e < o; e++) t.dyn_dtree[2 * e] = 0;
                        for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
                        t.dyn_ltree[512] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
                    }

                    function I(t) {
                        8 < t.bi_valid ? z(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0
                    }

                    function T(t, e, r, i) {
                        var n = 2 * e, s = 2 * r;
                        return t[n] < t[s] || t[n] === t[s] && i[e] <= i[r]
                    }

                    function F(t, e, r) {
                        for (var i = t.heap[r], n = r << 1; n <= t.heap_len && (n < t.heap_len && T(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !T(e, i, t.heap[n], t.depth));) t.heap[r] = t.heap[n], r = n, n <<= 1;
                        t.heap[r] = i
                    }

                    function L(t, e, r) {
                        var i, n, a, o, l = 0;
                        if (0 !== t.last_lit) for (; i = t.pending_buf[t.d_buf + 2 * l] << 8 | t.pending_buf[t.d_buf + 2 * l + 1], n = t.pending_buf[t.l_buf + l], l++, 0 === i ? S(t, n, e) : (S(t, (a = _[n]) + s + 1, e), 0 !== (o = h[a]) && E(t, n -= g[a], o), S(t, a = A(--i), r), 0 !== (o = u[a]) && E(t, i -= y[a], o)), l < t.last_lit;) ;
                        S(t, 256, e)
                    }

                    function R(t, e) {
                        var r, i, n, s = e.dyn_tree, a = e.stat_desc.static_tree, o = e.stat_desc.has_stree,
                            h = e.stat_desc.elems, u = -1;
                        for (t.heap_len = 0, t.heap_max = 573, r = 0; r < h; r++) 0 !== s[2 * r] ? (t.heap[++t.heap_len] = u = r, t.depth[r] = 0) : s[2 * r + 1] = 0;
                        for (; t.heap_len < 2;) s[2 * (n = t.heap[++t.heap_len] = u < 2 ? ++u : 0)] = 1, t.depth[n] = 0, t.opt_len--, o && (t.static_len -= a[2 * n + 1]);
                        for (e.max_code = u, r = t.heap_len >> 1; 1 <= r; r--) F(t, s, r);
                        for (n = h; r = t.heap[1], t.heap[1] = t.heap[t.heap_len--], F(t, s, 1), i = t.heap[1], t.heap[--t.heap_max] = r, t.heap[--t.heap_max] = i, s[2 * n] = s[2 * r] + s[2 * i], t.depth[n] = (t.depth[r] >= t.depth[i] ? t.depth[r] : t.depth[i]) + 1, s[2 * r + 1] = s[2 * i + 1] = n, t.heap[1] = n++, F(t, s, 1), 2 <= t.heap_len;) ;
                        t.heap[--t.heap_max] = t.heap[1], function (t, e) {
                            var r, i, n, s, a, o, h = e.dyn_tree, u = e.max_code, d = e.stat_desc.static_tree,
                                c = e.stat_desc.has_stree, f = e.stat_desc.extra_bits, p = e.stat_desc.extra_base,
                                m = e.stat_desc.max_length, _ = 0;
                            for (s = 0; s <= l; s++) t.bl_count[s] = 0;
                            for (h[2 * t.heap[t.heap_max] + 1] = 0, r = t.heap_max + 1; r < 573; r++) m < (s = h[2 * h[2 * (i = t.heap[r]) + 1] + 1] + 1) && (s = m, _++), h[2 * i + 1] = s, u < i || (t.bl_count[s]++, a = 0, p <= i && (a = f[i - p]), o = h[2 * i], t.opt_len += o * (s + a), c && (t.static_len += o * (d[2 * i + 1] + a)));
                            if (0 !== _) {
                                do {
                                    for (s = m - 1; 0 === t.bl_count[s];) s--;
                                    t.bl_count[s]--, t.bl_count[s + 1] += 2, t.bl_count[m]--, _ -= 2
                                } while (0 < _);
                                for (s = m; 0 !== s; s--) for (i = t.bl_count[s]; 0 !== i;) u < (n = t.heap[--r]) || (h[2 * n + 1] !== s && (t.opt_len += (s - h[2 * n + 1]) * h[2 * n], h[2 * n + 1] = s), i--)
                            }
                        }(t, e), B(s, u, t.bl_count)
                    }

                    function O(t, e, r) {
                        var i, n, s = -1, a = e[1], o = 0, l = 7, h = 4;
                        for (0 === a && (l = 138, h = 3), e[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++) n = a, a = e[2 * (i + 1) + 1], ++o < l && n === a || (o < h ? t.bl_tree[2 * n] += o : 0 !== n ? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[32]++) : o <= 10 ? t.bl_tree[34]++ : t.bl_tree[36]++, s = n, h = (o = 0) === a ? (l = 138, 3) : n === a ? (l = 6, 3) : (l = 7, 4))
                    }

                    function D(t, e, r) {
                        var i, n, s = -1, a = e[1], o = 0, l = 7, h = 4;
                        for (0 === a && (l = 138, h = 3), i = 0; i <= r; i++) if (n = a, a = e[2 * (i + 1) + 1], !(++o < l && n === a)) {
                            if (o < h) for (; S(t, n, t.bl_tree), 0 != --o;) ; else 0 !== n ? (n !== s && (S(t, n, t.bl_tree), o--), S(t, 16, t.bl_tree), E(t, o - 3, 2)) : o <= 10 ? (S(t, 17, t.bl_tree), E(t, o - 3, 3)) : (S(t, 18, t.bl_tree), E(t, o - 11, 7));
                            s = n, h = (o = 0) === a ? (l = 138, 3) : n === a ? (l = 6, 3) : (l = 7, 4)
                        }
                    }

                    n(y);
                    var P = !1;

                    function N(t, e, r, n) {
                        E(t, 0 + (n ? 1 : 0), 3), function (t, e, r, n) {
                            I(t), z(t, r), z(t, ~r), i.arraySet(t.pending_buf, t.window, e, r, t.pending), t.pending += r
                        }(t, e, r)
                    }

                    r._tr_init = function (t) {
                        P || (function () {
                            var t, e, r, i, n, s = new Array(16);
                            for (i = r = 0; i < 28; i++) for (g[i] = r, t = 0; t < 1 << h[i]; t++) _[r++] = i;
                            for (_[r - 1] = i, i = n = 0; i < 16; i++) for (y[i] = n, t = 0; t < 1 << u[i]; t++) m[n++] = i;
                            for (n >>= 7; i < o; i++) for (y[i] = n << 7, t = 0; t < 1 << u[i] - 7; t++) m[256 + n++] = i;
                            for (e = 0; e <= l; e++) s[e] = 0;
                            for (t = 0; t <= 143;) f[2 * t + 1] = 8, t++, s[8]++;
                            for (; t <= 255;) f[2 * t + 1] = 9, t++, s[9]++;
                            for (; t <= 279;) f[2 * t + 1] = 7, t++, s[7]++;
                            for (; t <= 287;) f[2 * t + 1] = 8, t++, s[8]++;
                            for (B(f, 287, s), t = 0; t < o; t++) p[2 * t + 1] = 5, p[2 * t] = C(t, 5);
                            w = new k(f, h, 257, a, l), b = new k(p, u, 0, o, l), v = new k(new Array(0), d, 0, 19, 7)
                        }(), P = !0), t.l_desc = new x(t.dyn_ltree, w), t.d_desc = new x(t.dyn_dtree, b), t.bl_desc = new x(t.bl_tree, v), t.bi_buf = 0, t.bi_valid = 0, U(t)
                    }, r._tr_stored_block = N, r._tr_flush_block = function (t, e, r, i) {
                        var n, a, o = 0;
                        0 < t.level ? (2 === t.strm.data_type && (t.strm.data_type = function (t) {
                            var e, r = 4093624447;
                            for (e = 0; e <= 31; e++, r >>>= 1) if (1 & r && 0 !== t.dyn_ltree[2 * e]) return 0;
                            if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1;
                            for (e = 32; e < s; e++) if (0 !== t.dyn_ltree[2 * e]) return 1;
                            return 0
                        }(t)), R(t, t.l_desc), R(t, t.d_desc), o = function (t) {
                            var e;
                            for (O(t, t.dyn_ltree, t.l_desc.max_code), O(t, t.dyn_dtree, t.d_desc.max_code), R(t, t.bl_desc), e = 18; 3 <= e && 0 === t.bl_tree[2 * c[e] + 1]; e--) ;
                            return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
                        }(t), n = t.opt_len + 3 + 7 >>> 3, (a = t.static_len + 3 + 7 >>> 3) <= n && (n = a)) : n = a = r + 5, r + 4 <= n && -1 !== e ? N(t, e, r, i) : 4 === t.strategy || a === n ? (E(t, 2 + (i ? 1 : 0), 3), L(t, f, p)) : (E(t, 4 + (i ? 1 : 0), 3), function (t, e, r, i) {
                            var n;
                            for (E(t, e - 257, 5), E(t, r - 1, 5), E(t, i - 4, 4), n = 0; n < i; n++) E(t, t.bl_tree[2 * c[n] + 1], 3);
                            D(t, t.dyn_ltree, e - 1), D(t, t.dyn_dtree, r - 1)
                        }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, o + 1), L(t, t.dyn_ltree, t.dyn_dtree)), U(t), i && I(t)
                    }, r._tr_tally = function (t, e, r) {
                        return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & r, t.last_lit++, 0 === e ? t.dyn_ltree[2 * r]++ : (t.matches++, e--, t.dyn_ltree[2 * (_[r] + s + 1)]++, t.dyn_dtree[2 * A(e)]++), t.last_lit === t.lit_bufsize - 1
                    }, r._tr_align = function (t) {
                        E(t, 2, 3), S(t, 256, f), function (t) {
                            16 === t.bi_valid ? (z(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : 8 <= t.bi_valid && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
                        }(t)
                    }
                }, {"../utils/common": 41}],
                53: [function (t, e, r) {
                    "use strict";
                    e.exports = function () {
                        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                    }
                }, {}],
                54: [function (t, e, r) {
                    "use strict";
                    e.exports = "function" == typeof setImmediate ? setImmediate : function () {
                        var t = [].slice.apply(arguments);
                        t.splice(1, 0, 0), setTimeout.apply(null, t)
                    }
                }, {}]
            }, {}, [10])(10)
        }, 88: t => {
            t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>'
        }, 27: t => {
            t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></svg>'
        }, 763: t => {
            t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></svg>'
        }, 535: t => {
            t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></svg>'
        }, 830: t => {
            t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>'
        }, 917: t => {
            t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M8 5v14l11-7z"></path></svg>'
        }, 921: t => {
            t.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></svg>'
        }
    }, e = {};

    function r(i) {
        var n = e[i];
        if (void 0 !== n) return n.exports;
        var s = e[i] = {exports: {}};
        return t[i](s, s.exports, r), s.exports
    }

    r.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (t) {
            if ("object" == typeof window) return window
        }
    }(), (() => {
        "use strict";
        var t = r(187), e = r(171), i = r(733);
        const n = 26112;

        class s {
            constructor(t) {
                if (this.canvas = t, this.ctx = this.canvas.getContext("2d"), this.imageData = this.ctx.getImageData(0, 0, 320, 240), this.pixels = new Uint32Array(this.imageData.data.buffer), this.flashPhase = 0, this.palette = new Uint32Array([255, 540066047, 3225424127, 3225469183, 1085280511, 1354805503, 3770683647, 3233857791, 255, 809566207, 4282396927, 4285591807, 1356861695, 1356922879, 4293415167, 4294967295]), 0 === new Uint8Array(new Uint16Array([32768]).buffer)[0]) for (let t = 0; t < 16; t++) {
                    const e = this.palette[t];
                    this.palette[t] = e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255
                }
            }

            showFrame(t) {
                const e = new Uint8Array(t);
                let r = 0, i = 0;
                for (let t = 0; t < 24; t++) for (let t = 0; t < 160; t++) {
                    let t = this.palette[e[i++]];
                    this.pixels[r++] = t, this.pixels[r++] = t
                }
                for (let t = 0; t < 192; t++) {
                    for (let t = 0; t < 16; t++) {
                        let t = this.palette[e[i++]];
                        this.pixels[r++] = t, this.pixels[r++] = t
                    }
                    for (let t = 0; t < 32; t++) {
                        let t = e[i++];
                        const n = e[i++];
                        let s, a;
                        128 & n && 16 & this.flashPhase ? (a = this.palette[(64 & n) >> 3 | 7 & n], s = this.palette[(120 & n) >> 3]) : (s = this.palette[(64 & n) >> 3 | 7 & n], a = this.palette[(120 & n) >> 3]);
                        for (let e = 0; e < 8; e++) this.pixels[r++] = 128 & t ? s : a, t <<= 1
                    }
                    for (let t = 0; t < 16; t++) {
                        let t = this.palette[e[i++]];
                        this.pixels[r++] = t, this.pixels[r++] = t
                    }
                }
                for (let t = 0; t < 24; t++) for (let t = 0; t < 160; t++) {
                    let t = this.palette[e[i++]];
                    this.pixels[r++] = t, this.pixels[r++] = t
                }
                this.ctx.putImageData(this.imageData, 0, 0), this.flashPhase = this.flashPhase + 1 & 31
            }
        }

        class a {
            constructor(t) {
                this.renderer = new s(t), this.frameBuffers = [new ArrayBuffer(n), new ArrayBuffer(n), new ArrayBuffer(n)], this.bufferBeingShown = null, this.bufferAwaitingShow = null, this.lockedBuffer = null
            }

            frameCompleted(t) {
                this.frameBuffers[this.lockedBuffer] = t, this.bufferAwaitingShow = this.lockedBuffer, this.lockedBuffer = null
            }

            getNextFrameBufferIndex() {
                for (let t = 0; t < 3; t++) if (t !== this.bufferBeingShown && t !== this.bufferAwaitingShow) return t
            }

            getNextFrameBuffer() {
                return this.lockedBuffer = this.getNextFrameBufferIndex(), this.frameBuffers[this.lockedBuffer]
            }

            readyToShow() {
                return null !== this.bufferAwaitingShow
            }

            show() {
                this.bufferBeingShown = this.bufferAwaitingShow, this.bufferAwaitingShow = null, this.renderer.showFrame(this.frameBuffers[this.bufferBeingShown]), this.bufferBeingShown = null
            }
        }

        var o = r(917), l = r(88);

        class h {
            constructor(t) {
                this.elem = document.createElement("div"), this.elem.style.display = "flow-root", this.elem.style.backgroundColor = "#eee", this.elem.style.fontFamily = "Arial, Helvetica, sans-serif", this.elem.style.top = "0", this.elem.style.width = "100%", t.appendChild(this.elem), this.currentMouseenterEvent = null, this.currentMouseoutEvent = null
            }

            addMenu(t) {
                return new u(this.elem, t)
            }

            enterFullscreen() {
                this.elem.style.position = "absolute"
            }

            exitFullscreen() {
                this.elem.style.position = "static"
            }

            show() {
                this.elem.style.visibility = "visible"
            }

            hide() {
                this.elem.style.visibility = "hidden"
            }

            onmouseenter(t) {
                this.currentMouseenterEvent && this.elem.removeEventListener("mouseenter", this.currentMouseenterEvent), t && this.elem.addEventListener("mouseenter", t), this.currentMouseenterEvent = t
            }

            onmouseout(t) {
                this.currentMouseoutEvent && this.elem.removeEventListener("mouseleave", this.currentMouseoutEvent), t && this.elem.addEventListener("mouseleave", t), this.currentMouseoutEvent = t
            }
        }

        class u {
            constructor(t, e) {
                const r = document.createElement("div");
                r.style.float = "left", r.style.position = "relative", t.appendChild(r);
                const i = document.createElement("button");
                i.style.margin = "2px", i.innerText = e, r.appendChild(i), this.list = document.createElement("ul"), this.list.style.position = "absolute", this.list.style.width = "150px", this.list.style.backgroundColor = "#eee", this.list.style.listStyleType = "none", this.list.style.margin = "0", this.list.style.padding = "0", this.list.style.border = "1px solid #888", this.list.style.display = "none", r.appendChild(this.list), i.addEventListener("click", (() => {
                    this.isOpen() ? this.close() : this.open()
                })), document.addEventListener("click", (t => {
                    t.target != i && this.isOpen() && this.close()
                }))
            }

            isOpen() {
                return "block" == this.list.style.display
            }

            open() {
                this.list.style.display = "block"
            }

            close() {
                this.list.style.display = "none"
            }

            addItem(t, e) {
                const r = document.createElement("li");
                this.list.appendChild(r);
                const i = document.createElement("button");
                return i.innerText = t, i.style.width = "100%", i.style.textAlign = "left", i.style.borderWidth = "0", i.style.paddingTop = "4px", i.style.paddingBottom = "4px", i.addEventListener("mouseenter", (() => {
                    i.style.backgroundColor = "#ddd"
                })), i.addEventListener("mouseout", (() => {
                    i.style.backgroundColor = "inherit"
                })), e && i.addEventListener("click", e), r.appendChild(i), {
                    setBullet: () => {
                        i.innerText = String.fromCharCode(8226) + " " + t
                    }, unsetBullet: () => {
                        i.innerText = t
                    }, setCheckbox: () => {
                        i.innerText = String.fromCharCode(10003) + " " + t
                    }, unsetCheckbox: () => {
                        i.innerText = t
                    }
                }
            }
        }

        class d {
            constructor(t) {
                this.elem = document.createElement("div"), this.elem.style.backgroundColor = "#ccc", this.elem.style.bottom = "0", this.elem.style.width = "100%", t.appendChild(this.elem), this.currentMouseenterEvent = null, this.currentMouseoutEvent = null
            }

            addButton(t, e, r) {
                const i = new c(t, e = e || {}, r);
                return "right" == e.align && (i.elem.style.float = "right"), this.elem.appendChild(i.elem), i
            }

            enterFullscreen() {
                this.elem.style.position = "absolute"
            }

            exitFullscreen() {
                this.elem.style.position = "static"
            }

            show() {
                this.elem.style.visibility = "visible"
            }

            hide() {
                this.elem.style.visibility = "hidden"
            }

            onmouseenter(t) {
                this.currentMouseenterEvent && this.elem.removeEventListener("mouseenter", this.currentMouseenterEvent), t && this.elem.addEventListener("mouseenter", t), this.currentMouseenterEvent = t
            }

            onmouseout(t) {
                this.currentMouseoutEvent && this.elem.removeEventListener("mouseleave", this.currentMouseoutEvent), t && this.elem.addEventListener("mouseleave", t), this.currentMouseoutEvent = t
            }
        }

        class c {
            constructor(t, e, r) {
                this.elem = document.createElement("button"), this.elem.style.margin = "2px", this.setIcon(t), e.label && this.setLabel(e.label), this.elem.addEventListener("click", r)
            }

            setIcon(t) {
                this.elem.innerHTML = t, this.elem.firstChild.style.height = "20px", this.elem.firstChild.style.verticalAlign = "middle"
            }

            setLabel(t) {
                this.elem.title = t
            }
        }

        class f extends t {
            constructor(t, e, r) {
                super(), this.canvas = e.canvas, this.dialog = document.createElement("div"), this.dialog.style.display = "none", t.appendChild(this.dialog);
                const i = document.createElement("button");
                i.innerHTML = l, i.style.float = "right", i.style.border = "none", i.firstChild.style.height = "20px", i.firstChild.style.verticalAlign = "middle", this.dialog.appendChild(i), i.addEventListener("click", (() => {
                    this.hideDialog()
                })), this.dialogBody = document.createElement("div"), this.dialogBody.style.clear = "both", this.dialog.appendChild(this.dialogBody), this.appContainer = document.createElement("div"), t.appendChild(this.appContainer), this.appContainer.style.position = "relative", this.menuBar = new h(this.appContainer), this.appContainer.appendChild(this.canvas), this.canvas.style.objectFit = "contain", this.canvas.style.display = "block", this.toolbar = new d(this.appContainer), this.startButton = document.createElement("button"), this.startButton.innerHTML = o, this.appContainer.appendChild(this.startButton), this.startButton.style.position = "absolute", this.startButton.style.top = "50%", this.startButton.style.left = "50%", this.startButton.style.width = "96px", this.startButton.style.height = "64px", this.startButton.style.marginLeft = "-48px", this.startButton.style.marginTop = "-32px", this.startButton.style.backgroundColor = "rgba(160, 160, 160, 0.7)", this.startButton.style.border = "none", this.startButton.style.borderRadius = "4px", this.startButton.firstChild.style.height = "56px", this.startButton.firstChild.style.verticalAlign = "middle", this.startButton.addEventListener("mouseenter", (() => {
                    this.startButton.style.backgroundColor = "rgba(128, 128, 128, 0.7)"
                })), this.startButton.addEventListener("mouseleave", (() => {
                    this.startButton.style.backgroundColor = "rgba(160, 160, 160, 0.7)"
                })), this.startButton.addEventListener("click", (t => {
                    e.start()
                })), e.on("start", (() => {
                    this.startButton.style.display = "none"
                })), e.on("pause", (() => {
                    this.startButton.style.display = "block"
                })), this.zoom = null, this.isFullscreen = !1, this.uiIsHidden = !1, this.allowUIHiding = !0, this.hideUITimeout = null, this.ignoreNextMouseMove = !1;
                const n = () => {
                    this.ignoreNextMouseMove ? this.ignoreNextMouseMove = !1 : (this.showUI(), this.hideUITimeout && clearTimeout(this.hideUITimeout), this.hideUITimeout = setTimeout((() => {
                        this.hideUI()
                    }), 3e3))
                };
                this.appContainer.addEventListener("fullscreenchange", (() => {
                    document.fullscreenElement ? (this.isFullscreen = !0, this.canvas.style.width = "100%", this.canvas.style.height = "100%", document.addEventListener("mousemove", n), this.ignoreNextMouseMove = !0, this.menuBar.enterFullscreen(), this.menuBar.onmouseenter((() => {
                        this.allowUIHiding = !1
                    })), this.menuBar.onmouseout((() => {
                        this.allowUIHiding = !0
                    })), this.toolbar.enterFullscreen(), this.toolbar.onmouseenter((() => {
                        this.allowUIHiding = !1
                    })), this.toolbar.onmouseout((() => {
                        this.allowUIHiding = !0
                    })), this.hideUI(), this.emit("setZoom", "fullscreen")) : (this.isFullscreen = !1, this.hideUITimeout && clearTimeout(this.hideUITimeout), this.showUI(), this.menuBar.exitFullscreen(), this.menuBar.onmouseenter(null), this.menuBar.onmouseout(null), this.toolbar.exitFullscreen(), this.toolbar.onmouseenter(null), this.toolbar.onmouseout(null), document.removeEventListener("mousemove", n), this.setZoom(this.zoom))
                })), this.setZoom(r.zoom || 1), r.sandbox || (this.appContainer.addEventListener("drop", (t => {
                    t.preventDefault();
                    let r = Promise.resolve();
                    if (t.dataTransfer.items) {
                        for (const i of t.dataTransfer.items) if ("file" === i.kind) {
                            const t = i.getAsFile();
                            r = r.then((() => {
                                e.openFile(t)
                            }))
                        }
                    } else for (const i of t.dataTransfer.files) r = r.then((() => {
                        e.openFile(i)
                    }));
                    r.then((() => {
                        e.isInitiallyPaused && e.start()
                    }))
                })), this.appContainer.addEventListener("dragover", (t => {
                    t.preventDefault()
                })))
            }

            setZoom(t) {
                if (this.zoom = t, this.isFullscreen) return void document.exitFullscreen();
                const e = 320 * this.zoom, r = 240 * this.zoom;
                this.canvas.style.width = e + "px", this.canvas.style.height = r + "px", this.appContainer.style.width = e + "px", this.emit("setZoom", t)
            }

            enterFullscreen() {
                this.appContainer.requestFullscreen()
            }

            exitFullscreen() {
                this.isFullscreen && document.exitFullscreen()
            }

            toggleFullscreen() {
                this.isFullscreen ? this.exitFullscreen() : this.enterFullscreen()
            }

            hideUI() {
                this.allowUIHiding && !this.uiIsHidden && (this.uiIsHidden = !0, this.appContainer.style.cursor = "none", this.menuBar.hide(), this.toolbar.hide())
            }

            showUI() {
                this.uiIsHidden && (this.uiIsHidden = !1, this.appContainer.style.cursor = "default", this.menuBar.show(), this.toolbar.show())
            }

            showDialog() {
                return this.dialog.style.display = "block", this.dialog.style.position = "absolute", this.dialog.style.backgroundColor = "#eee", this.dialog.style.zIndex = "100", this.dialog.style.width = "75%", this.dialog.style.height = "80%", this.dialog.style.left = "12%", this.dialog.style.top = "10%", this.dialog.style.overflow = "scroll", this.dialogBody.style.paddingLeft = "8px", this.dialogBody.style.paddingRight = "8px", this.dialogBody.style.paddingBottom = "8px", this.dialogBody
            }

            hideDialog() {
                this.dialog.style.display = "none", this.dialogBody.innerHTML = ""
            }

            unload() {
                this.dialog.remove(), this.appContainer.remove()
            }
        }

        function p(t) {
            let e = t.length;
            for (; --e >= 0;) t[e] = 0
        }

        const m = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
            _ = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]),
            g = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
            w = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), b = new Array(576);
        p(b);
        const v = new Array(60);
        p(v);
        const y = new Array(512);
        p(y);
        const k = new Array(256);
        p(k);
        const x = new Array(29);
        p(x);
        const A = new Array(30);

        function z(t, e, r, i, n) {
            this.static_tree = t, this.extra_bits = e, this.extra_base = r, this.elems = i, this.max_length = n, this.has_stree = t && t.length
        }

        let E, S, C;

        function B(t, e) {
            this.dyn_tree = t, this.max_code = 0, this.stat_desc = e
        }

        p(A);
        const U = t => t < 256 ? y[t] : y[256 + (t >>> 7)], I = (t, e) => {
            t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255
        }, T = (t, e, r) => {
            t.bi_valid > 16 - r ? (t.bi_buf |= e << t.bi_valid & 65535, I(t, t.bi_buf), t.bi_buf = e >> 16 - t.bi_valid, t.bi_valid += r - 16) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += r)
        }, F = (t, e, r) => {
            T(t, r[2 * e], r[2 * e + 1])
        }, L = (t, e) => {
            let r = 0;
            do {
                r |= 1 & t, t >>>= 1, r <<= 1
            } while (--e > 0);
            return r >>> 1
        }, R = (t, e, r) => {
            const i = new Array(16);
            let n, s, a = 0;
            for (n = 1; n <= 15; n++) i[n] = a = a + r[n - 1] << 1;
            for (s = 0; s <= e; s++) {
                let e = t[2 * s + 1];
                0 !== e && (t[2 * s] = L(i[e]++, e))
            }
        }, O = t => {
            let e;
            for (e = 0; e < 286; e++) t.dyn_ltree[2 * e] = 0;
            for (e = 0; e < 30; e++) t.dyn_dtree[2 * e] = 0;
            for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
            t.dyn_ltree[512] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
        }, D = t => {
            t.bi_valid > 8 ? I(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0
        }, P = (t, e, r, i) => {
            const n = 2 * e, s = 2 * r;
            return t[n] < t[s] || t[n] === t[s] && i[e] <= i[r]
        }, N = (t, e, r) => {
            const i = t.heap[r];
            let n = r << 1;
            for (; n <= t.heap_len && (n < t.heap_len && P(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !P(e, i, t.heap[n], t.depth));) t.heap[r] = t.heap[n], r = n, n <<= 1;
            t.heap[r] = i
        }, Z = (t, e, r) => {
            let i, n, s, a, o = 0;
            if (0 !== t.last_lit) do {
                i = t.pending_buf[t.d_buf + 2 * o] << 8 | t.pending_buf[t.d_buf + 2 * o + 1], n = t.pending_buf[t.l_buf + o], o++, 0 === i ? F(t, n, e) : (s = k[n], F(t, s + 256 + 1, e), a = m[s], 0 !== a && (n -= x[s], T(t, n, a)), i--, s = U(i), F(t, s, r), a = _[s], 0 !== a && (i -= A[s], T(t, i, a)))
            } while (o < t.last_lit);
            F(t, 256, e)
        }, M = (t, e) => {
            const r = e.dyn_tree, i = e.stat_desc.static_tree, n = e.stat_desc.has_stree, s = e.stat_desc.elems;
            let a, o, l, h = -1;
            for (t.heap_len = 0, t.heap_max = 573, a = 0; a < s; a++) 0 !== r[2 * a] ? (t.heap[++t.heap_len] = h = a, t.depth[a] = 0) : r[2 * a + 1] = 0;
            for (; t.heap_len < 2;) l = t.heap[++t.heap_len] = h < 2 ? ++h : 0, r[2 * l] = 1, t.depth[l] = 0, t.opt_len--, n && (t.static_len -= i[2 * l + 1]);
            for (e.max_code = h, a = t.heap_len >> 1; a >= 1; a--) N(t, r, a);
            l = s;
            do {
                a = t.heap[1], t.heap[1] = t.heap[t.heap_len--], N(t, r, 1), o = t.heap[1], t.heap[--t.heap_max] = a, t.heap[--t.heap_max] = o, r[2 * l] = r[2 * a] + r[2 * o], t.depth[l] = (t.depth[a] >= t.depth[o] ? t.depth[a] : t.depth[o]) + 1, r[2 * a + 1] = r[2 * o + 1] = l, t.heap[1] = l++, N(t, r, 1)
            } while (t.heap_len >= 2);
            t.heap[--t.heap_max] = t.heap[1], ((t, e) => {
                const r = e.dyn_tree, i = e.max_code, n = e.stat_desc.static_tree, s = e.stat_desc.has_stree,
                    a = e.stat_desc.extra_bits, o = e.stat_desc.extra_base, l = e.stat_desc.max_length;
                let h, u, d, c, f, p, m = 0;
                for (c = 0; c <= 15; c++) t.bl_count[c] = 0;
                for (r[2 * t.heap[t.heap_max] + 1] = 0, h = t.heap_max + 1; h < 573; h++) u = t.heap[h], c = r[2 * r[2 * u + 1] + 1] + 1, c > l && (c = l, m++), r[2 * u + 1] = c, u > i || (t.bl_count[c]++, f = 0, u >= o && (f = a[u - o]), p = r[2 * u], t.opt_len += p * (c + f), s && (t.static_len += p * (n[2 * u + 1] + f)));
                if (0 !== m) {
                    do {
                        for (c = l - 1; 0 === t.bl_count[c];) c--;
                        t.bl_count[c]--, t.bl_count[c + 1] += 2, t.bl_count[l]--, m -= 2
                    } while (m > 0);
                    for (c = l; 0 !== c; c--) for (u = t.bl_count[c]; 0 !== u;) d = t.heap[--h], d > i || (r[2 * d + 1] !== c && (t.opt_len += (c - r[2 * d + 1]) * r[2 * d], r[2 * d + 1] = c), u--)
                }
            })(t, e), R(r, h, t.bl_count)
        }, H = (t, e, r) => {
            let i, n, s = -1, a = e[1], o = 0, l = 7, h = 4;
            for (0 === a && (l = 138, h = 3), e[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++) n = a, a = e[2 * (i + 1) + 1], ++o < l && n === a || (o < h ? t.bl_tree[2 * n] += o : 0 !== n ? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[32]++) : o <= 10 ? t.bl_tree[34]++ : t.bl_tree[36]++, o = 0, s = n, 0 === a ? (l = 138, h = 3) : n === a ? (l = 6, h = 3) : (l = 7, h = 4))
        }, j = (t, e, r) => {
            let i, n, s = -1, a = e[1], o = 0, l = 7, h = 4;
            for (0 === a && (l = 138, h = 3), i = 0; i <= r; i++) if (n = a, a = e[2 * (i + 1) + 1], !(++o < l && n === a)) {
                if (o < h) do {
                    F(t, n, t.bl_tree)
                } while (0 != --o); else 0 !== n ? (n !== s && (F(t, n, t.bl_tree), o--), F(t, 16, t.bl_tree), T(t, o - 3, 2)) : o <= 10 ? (F(t, 17, t.bl_tree), T(t, o - 3, 3)) : (F(t, 18, t.bl_tree), T(t, o - 11, 7));
                o = 0, s = n, 0 === a ? (l = 138, h = 3) : n === a ? (l = 6, h = 3) : (l = 7, h = 4)
            }
        };
        let W = !1;
        const V = (t, e, r, i) => {
            T(t, 0 + (i ? 1 : 0), 3), ((t, e, r, i) => {
                D(t), I(t, r), I(t, ~r), t.pending_buf.set(t.window.subarray(e, e + r), t.pending), t.pending += r
            })(t, e, r)
        };
        var K = {
            _tr_init: t => {
                W || ((() => {
                    let t, e, r, i, n;
                    const s = new Array(16);
                    for (r = 0, i = 0; i < 28; i++) for (x[i] = r, t = 0; t < 1 << m[i]; t++) k[r++] = i;
                    for (k[r - 1] = i, n = 0, i = 0; i < 16; i++) for (A[i] = n, t = 0; t < 1 << _[i]; t++) y[n++] = i;
                    for (n >>= 7; i < 30; i++) for (A[i] = n << 7, t = 0; t < 1 << _[i] - 7; t++) y[256 + n++] = i;
                    for (e = 0; e <= 15; e++) s[e] = 0;
                    for (t = 0; t <= 143;) b[2 * t + 1] = 8, t++, s[8]++;
                    for (; t <= 255;) b[2 * t + 1] = 9, t++, s[9]++;
                    for (; t <= 279;) b[2 * t + 1] = 7, t++, s[7]++;
                    for (; t <= 287;) b[2 * t + 1] = 8, t++, s[8]++;
                    for (R(b, 287, s), t = 0; t < 30; t++) v[2 * t + 1] = 5, v[2 * t] = L(t, 5);
                    E = new z(b, m, 257, 286, 15), S = new z(v, _, 0, 30, 15), C = new z(new Array(0), g, 0, 19, 7)
                })(), W = !0), t.l_desc = new B(t.dyn_ltree, E), t.d_desc = new B(t.dyn_dtree, S), t.bl_desc = new B(t.bl_tree, C), t.bi_buf = 0, t.bi_valid = 0, O(t)
            },
            _tr_stored_block: V,
            _tr_flush_block: (t, e, r, i) => {
                let n, s, a = 0;
                t.level > 0 ? (2 === t.strm.data_type && (t.strm.data_type = (t => {
                    let e, r = 4093624447;
                    for (e = 0; e <= 31; e++, r >>>= 1) if (1 & r && 0 !== t.dyn_ltree[2 * e]) return 0;
                    if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1;
                    for (e = 32; e < 256; e++) if (0 !== t.dyn_ltree[2 * e]) return 1;
                    return 0
                })(t)), M(t, t.l_desc), M(t, t.d_desc), a = (t => {
                    let e;
                    for (H(t, t.dyn_ltree, t.l_desc.max_code), H(t, t.dyn_dtree, t.d_desc.max_code), M(t, t.bl_desc), e = 18; e >= 3 && 0 === t.bl_tree[2 * w[e] + 1]; e--) ;
                    return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
                })(t), n = t.opt_len + 3 + 7 >>> 3, s = t.static_len + 3 + 7 >>> 3, s <= n && (n = s)) : n = s = r + 5, r + 4 <= n && -1 !== e ? V(t, e, r, i) : 4 === t.strategy || s === n ? (T(t, 2 + (i ? 1 : 0), 3), Z(t, b, v)) : (T(t, 4 + (i ? 1 : 0), 3), ((t, e, r, i) => {
                    let n;
                    for (T(t, e - 257, 5), T(t, r - 1, 5), T(t, i - 4, 4), n = 0; n < i; n++) T(t, t.bl_tree[2 * w[n] + 1], 3);
                    j(t, t.dyn_ltree, e - 1), j(t, t.dyn_dtree, r - 1)
                })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1), Z(t, t.dyn_ltree, t.dyn_dtree)), O(t), i && D(t)
            },
            _tr_tally: (t, e, r) => (t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & r, t.last_lit++, 0 === e ? t.dyn_ltree[2 * r]++ : (t.matches++, e--, t.dyn_ltree[2 * (k[r] + 256 + 1)]++, t.dyn_dtree[2 * U(e)]++), t.last_lit === t.lit_bufsize - 1),
            _tr_align: t => {
                T(t, 2, 3), F(t, 256, b), (t => {
                    16 === t.bi_valid ? (I(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
                })(t)
            }
        }, G = (t, e, r, i) => {
            let n = 65535 & t | 0, s = t >>> 16 & 65535 | 0, a = 0;
            for (; 0 !== r;) {
                a = r > 2e3 ? 2e3 : r, r -= a;
                do {
                    n = n + e[i++] | 0, s = s + n | 0
                } while (--a);
                n %= 65521, s %= 65521
            }
            return n | s << 16 | 0
        };
        const X = new Uint32Array((() => {
            let t, e = [];
            for (var r = 0; r < 256; r++) {
                t = r;
                for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                e[r] = t
            }
            return e
        })());
        var Y = (t, e, r, i) => {
            const n = X, s = i + r;
            t ^= -1;
            for (let r = i; r < s; r++) t = t >>> 8 ^ n[255 & (t ^ e[r])];
            return -1 ^ t
        }, q = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
        }, J = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_MEM_ERROR: -4,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8
        };
        const {_tr_init: Q, _tr_stored_block: $, _tr_flush_block: tt, _tr_tally: et, _tr_align: rt} = K, {Z_NO_FLUSH: it, Z_PARTIAL_FLUSH: nt, Z_FULL_FLUSH: st, Z_FINISH: at, Z_BLOCK: ot, Z_OK: lt, Z_STREAM_END: ht, Z_STREAM_ERROR: ut, Z_DATA_ERROR: dt, Z_BUF_ERROR: ct, Z_DEFAULT_COMPRESSION: ft, Z_FILTERED: pt, Z_HUFFMAN_ONLY: mt, Z_RLE: _t, Z_FIXED: gt, Z_DEFAULT_STRATEGY: wt, Z_UNKNOWN: bt, Z_DEFLATED: vt} = J,
            yt = 258, kt = 262, xt = 103, At = 113, zt = 666, Et = (t, e) => (t.msg = q[e], e),
            St = t => (t << 1) - (t > 4 ? 9 : 0), Ct = t => {
                let e = t.length;
                for (; --e >= 0;) t[e] = 0
            };
        let Bt = (t, e, r) => (e << t.hash_shift ^ r) & t.hash_mask;
        const Ut = t => {
            const e = t.state;
            let r = e.pending;
            r > t.avail_out && (r = t.avail_out), 0 !== r && (t.output.set(e.pending_buf.subarray(e.pending_out, e.pending_out + r), t.next_out), t.next_out += r, e.pending_out += r, t.total_out += r, t.avail_out -= r, e.pending -= r, 0 === e.pending && (e.pending_out = 0))
        }, It = (t, e) => {
            tt(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, Ut(t.strm)
        }, Tt = (t, e) => {
            t.pending_buf[t.pending++] = e
        }, Ft = (t, e) => {
            t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e
        }, Lt = (t, e, r, i) => {
            let n = t.avail_in;
            return n > i && (n = i), 0 === n ? 0 : (t.avail_in -= n, e.set(t.input.subarray(t.next_in, t.next_in + n), r), 1 === t.state.wrap ? t.adler = G(t.adler, e, n, r) : 2 === t.state.wrap && (t.adler = Y(t.adler, e, n, r)), t.next_in += n, t.total_in += n, n)
        }, Rt = (t, e) => {
            let r, i, n = t.max_chain_length, s = t.strstart, a = t.prev_length, o = t.nice_match;
            const l = t.strstart > t.w_size - kt ? t.strstart - (t.w_size - kt) : 0, h = t.window, u = t.w_mask,
                d = t.prev, c = t.strstart + yt;
            let f = h[s + a - 1], p = h[s + a];
            t.prev_length >= t.good_match && (n >>= 2), o > t.lookahead && (o = t.lookahead);
            do {
                if (r = e, h[r + a] === p && h[r + a - 1] === f && h[r] === h[s] && h[++r] === h[s + 1]) {
                    s += 2, r++;
                    do {
                    } while (h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && h[++s] === h[++r] && s < c);
                    if (i = yt - (c - s), s = c - yt, i > a) {
                        if (t.match_start = e, a = i, i >= o) break;
                        f = h[s + a - 1], p = h[s + a]
                    }
                }
            } while ((e = d[e & u]) > l && 0 != --n);
            return a <= t.lookahead ? a : t.lookahead
        }, Ot = t => {
            const e = t.w_size;
            let r, i, n, s, a;
            do {
                if (s = t.window_size - t.lookahead - t.strstart, t.strstart >= e + (e - kt)) {
                    t.window.set(t.window.subarray(e, e + e), 0), t.match_start -= e, t.strstart -= e, t.block_start -= e, i = t.hash_size, r = i;
                    do {
                        n = t.head[--r], t.head[r] = n >= e ? n - e : 0
                    } while (--i);
                    i = e, r = i;
                    do {
                        n = t.prev[--r], t.prev[r] = n >= e ? n - e : 0
                    } while (--i);
                    s += e
                }
                if (0 === t.strm.avail_in) break;
                if (i = Lt(t.strm, t.window, t.strstart + t.lookahead, s), t.lookahead += i, t.lookahead + t.insert >= 3) for (a = t.strstart - t.insert, t.ins_h = t.window[a], t.ins_h = Bt(t, t.ins_h, t.window[a + 1]); t.insert && (t.ins_h = Bt(t, t.ins_h, t.window[a + 3 - 1]), t.prev[a & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = a, a++, t.insert--, !(t.lookahead + t.insert < 3));) ;
            } while (t.lookahead < kt && 0 !== t.strm.avail_in)
        }, Dt = (t, e) => {
            let r, i;
            for (; ;) {
                if (t.lookahead < kt) {
                    if (Ot(t), t.lookahead < kt && e === it) return 1;
                    if (0 === t.lookahead) break
                }
                if (r = 0, t.lookahead >= 3 && (t.ins_h = Bt(t, t.ins_h, t.window[t.strstart + 3 - 1]), r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== r && t.strstart - r <= t.w_size - kt && (t.match_length = Rt(t, r)), t.match_length >= 3) if (i = et(t, t.strstart - t.match_start, t.match_length - 3), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= 3) {
                    t.match_length--;
                    do {
                        t.strstart++, t.ins_h = Bt(t, t.ins_h, t.window[t.strstart + 3 - 1]), r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart
                    } while (0 != --t.match_length);
                    t.strstart++
                } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = Bt(t, t.ins_h, t.window[t.strstart + 1]); else i = et(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
                if (i && (It(t, !1), 0 === t.strm.avail_out)) return 1
            }
            return t.insert = t.strstart < 2 ? t.strstart : 2, e === at ? (It(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (It(t, !1), 0 === t.strm.avail_out) ? 1 : 2
        }, Pt = (t, e) => {
            let r, i, n;
            for (; ;) {
                if (t.lookahead < kt) {
                    if (Ot(t), t.lookahead < kt && e === it) return 1;
                    if (0 === t.lookahead) break
                }
                if (r = 0, t.lookahead >= 3 && (t.ins_h = Bt(t, t.ins_h, t.window[t.strstart + 3 - 1]), r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = 2, 0 !== r && t.prev_length < t.max_lazy_match && t.strstart - r <= t.w_size - kt && (t.match_length = Rt(t, r), t.match_length <= 5 && (t.strategy === pt || 3 === t.match_length && t.strstart - t.match_start > 4096) && (t.match_length = 2)), t.prev_length >= 3 && t.match_length <= t.prev_length) {
                    n = t.strstart + t.lookahead - 3, i = et(t, t.strstart - 1 - t.prev_match, t.prev_length - 3), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                    do {
                        ++t.strstart <= n && (t.ins_h = Bt(t, t.ins_h, t.window[t.strstart + 3 - 1]), r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart)
                    } while (0 != --t.prev_length);
                    if (t.match_available = 0, t.match_length = 2, t.strstart++, i && (It(t, !1), 0 === t.strm.avail_out)) return 1
                } else if (t.match_available) {
                    if (i = et(t, 0, t.window[t.strstart - 1]), i && It(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return 1
                } else t.match_available = 1, t.strstart++, t.lookahead--
            }
            return t.match_available && (i = et(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < 2 ? t.strstart : 2, e === at ? (It(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (It(t, !1), 0 === t.strm.avail_out) ? 1 : 2
        };

        function Nt(t, e, r, i, n) {
            this.good_length = t, this.max_lazy = e, this.nice_length = r, this.max_chain = i, this.func = n
        }

        const Zt = [new Nt(0, 0, 0, 0, ((t, e) => {
            let r = 65535;
            for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5); ;) {
                if (t.lookahead <= 1) {
                    if (Ot(t), 0 === t.lookahead && e === it) return 1;
                    if (0 === t.lookahead) break
                }
                t.strstart += t.lookahead, t.lookahead = 0;
                const i = t.block_start + r;
                if ((0 === t.strstart || t.strstart >= i) && (t.lookahead = t.strstart - i, t.strstart = i, It(t, !1), 0 === t.strm.avail_out)) return 1;
                if (t.strstart - t.block_start >= t.w_size - kt && (It(t, !1), 0 === t.strm.avail_out)) return 1
            }
            return t.insert = 0, e === at ? (It(t, !0), 0 === t.strm.avail_out ? 3 : 4) : (t.strstart > t.block_start && (It(t, !1), t.strm.avail_out), 1)
        })), new Nt(4, 4, 8, 4, Dt), new Nt(4, 5, 16, 8, Dt), new Nt(4, 6, 32, 32, Dt), new Nt(4, 4, 16, 16, Pt), new Nt(8, 16, 32, 32, Pt), new Nt(8, 16, 128, 128, Pt), new Nt(8, 32, 128, 256, Pt), new Nt(32, 128, 258, 1024, Pt), new Nt(32, 258, 258, 4096, Pt)];

        function Mt() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = vt, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(1146), this.dyn_dtree = new Uint16Array(122), this.bl_tree = new Uint16Array(78), Ct(this.dyn_ltree), Ct(this.dyn_dtree), Ct(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(16), this.heap = new Uint16Array(573), Ct(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(573), Ct(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
        }

        const Ht = t => {
            if (!t || !t.state) return Et(t, ut);
            t.total_in = t.total_out = 0, t.data_type = bt;
            const e = t.state;
            return e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? 42 : At, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = it, Q(e), lt
        }, jt = t => {
            const e = Ht(t);
            var r;
            return e === lt && ((r = t.state).window_size = 2 * r.w_size, Ct(r.head), r.max_lazy_match = Zt[r.level].max_lazy, r.good_match = Zt[r.level].good_length, r.nice_match = Zt[r.level].nice_length, r.max_chain_length = Zt[r.level].max_chain, r.strstart = 0, r.block_start = 0, r.lookahead = 0, r.insert = 0, r.match_length = r.prev_length = 2, r.match_available = 0, r.ins_h = 0), e
        }, Wt = (t, e, r, i, n, s) => {
            if (!t) return ut;
            let a = 1;
            if (e === ft && (e = 6), i < 0 ? (a = 0, i = -i) : i > 15 && (a = 2, i -= 16), n < 1 || n > 9 || r !== vt || i < 8 || i > 15 || e < 0 || e > 9 || s < 0 || s > gt) return Et(t, ut);
            8 === i && (i = 9);
            const o = new Mt;
            return t.state = o, o.strm = t, o.wrap = a, o.gzhead = null, o.w_bits = i, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = n + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + 3 - 1) / 3), o.window = new Uint8Array(2 * o.w_size), o.head = new Uint16Array(o.hash_size), o.prev = new Uint16Array(o.w_size), o.lit_bufsize = 1 << n + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new Uint8Array(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = e, o.strategy = s, o.method = r, jt(t)
        };
        var Vt = Wt, Kt = (t, e) => t && t.state ? 2 !== t.state.wrap ? ut : (t.state.gzhead = e, lt) : ut,
            Gt = (t, e) => {
                let r, i;
                if (!t || !t.state || e > ot || e < 0) return t ? Et(t, ut) : ut;
                const n = t.state;
                if (!t.output || !t.input && 0 !== t.avail_in || n.status === zt && e !== at) return Et(t, 0 === t.avail_out ? ct : ut);
                n.strm = t;
                const s = n.last_flush;
                if (n.last_flush = e, 42 === n.status) if (2 === n.wrap) t.adler = 0, Tt(n, 31), Tt(n, 139), Tt(n, 8), n.gzhead ? (Tt(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), Tt(n, 255 & n.gzhead.time), Tt(n, n.gzhead.time >> 8 & 255), Tt(n, n.gzhead.time >> 16 & 255), Tt(n, n.gzhead.time >> 24 & 255), Tt(n, 9 === n.level ? 2 : n.strategy >= mt || n.level < 2 ? 4 : 0), Tt(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (Tt(n, 255 & n.gzhead.extra.length), Tt(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = Y(t.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (Tt(n, 0), Tt(n, 0), Tt(n, 0), Tt(n, 0), Tt(n, 0), Tt(n, 9 === n.level ? 2 : n.strategy >= mt || n.level < 2 ? 4 : 0), Tt(n, 3), n.status = At); else {
                    let e = vt + (n.w_bits - 8 << 4) << 8, r = -1;
                    r = n.strategy >= mt || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3, e |= r << 6, 0 !== n.strstart && (e |= 32), e += 31 - e % 31, n.status = At, Ft(n, e), 0 !== n.strstart && (Ft(n, t.adler >>> 16), Ft(n, 65535 & t.adler)), t.adler = 1
                }
                if (69 === n.status) if (n.gzhead.extra) {
                    for (r = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > r && (t.adler = Y(t.adler, n.pending_buf, n.pending - r, r)), Ut(t), r = n.pending, n.pending !== n.pending_buf_size));) Tt(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
                    n.gzhead.hcrc && n.pending > r && (t.adler = Y(t.adler, n.pending_buf, n.pending - r, r)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73)
                } else n.status = 73;
                if (73 === n.status) if (n.gzhead.name) {
                    r = n.pending;
                    do {
                        if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > r && (t.adler = Y(t.adler, n.pending_buf, n.pending - r, r)), Ut(t), r = n.pending, n.pending === n.pending_buf_size)) {
                            i = 1;
                            break
                        }
                        i = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, Tt(n, i)
                    } while (0 !== i);
                    n.gzhead.hcrc && n.pending > r && (t.adler = Y(t.adler, n.pending_buf, n.pending - r, r)), 0 === i && (n.gzindex = 0, n.status = 91)
                } else n.status = 91;
                if (91 === n.status) if (n.gzhead.comment) {
                    r = n.pending;
                    do {
                        if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > r && (t.adler = Y(t.adler, n.pending_buf, n.pending - r, r)), Ut(t), r = n.pending, n.pending === n.pending_buf_size)) {
                            i = 1;
                            break
                        }
                        i = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, Tt(n, i)
                    } while (0 !== i);
                    n.gzhead.hcrc && n.pending > r && (t.adler = Y(t.adler, n.pending_buf, n.pending - r, r)), 0 === i && (n.status = xt)
                } else n.status = xt;
                if (n.status === xt && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && Ut(t), n.pending + 2 <= n.pending_buf_size && (Tt(n, 255 & t.adler), Tt(n, t.adler >> 8 & 255), t.adler = 0, n.status = At)) : n.status = At), 0 !== n.pending) {
                    if (Ut(t), 0 === t.avail_out) return n.last_flush = -1, lt
                } else if (0 === t.avail_in && St(e) <= St(s) && e !== at) return Et(t, ct);
                if (n.status === zt && 0 !== t.avail_in) return Et(t, ct);
                if (0 !== t.avail_in || 0 !== n.lookahead || e !== it && n.status !== zt) {
                    let r = n.strategy === mt ? ((t, e) => {
                        let r;
                        for (; ;) {
                            if (0 === t.lookahead && (Ot(t), 0 === t.lookahead)) {
                                if (e === it) return 1;
                                break
                            }
                            if (t.match_length = 0, r = et(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, r && (It(t, !1), 0 === t.strm.avail_out)) return 1
                        }
                        return t.insert = 0, e === at ? (It(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (It(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                    })(n, e) : n.strategy === _t ? ((t, e) => {
                        let r, i, n, s;
                        const a = t.window;
                        for (; ;) {
                            if (t.lookahead <= yt) {
                                if (Ot(t), t.lookahead <= yt && e === it) return 1;
                                if (0 === t.lookahead) break
                            }
                            if (t.match_length = 0, t.lookahead >= 3 && t.strstart > 0 && (n = t.strstart - 1, i = a[n], i === a[++n] && i === a[++n] && i === a[++n])) {
                                s = t.strstart + yt;
                                do {
                                } while (i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && n < s);
                                t.match_length = yt - (s - n), t.match_length > t.lookahead && (t.match_length = t.lookahead)
                            }
                            if (t.match_length >= 3 ? (r = et(t, 1, t.match_length - 3), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (r = et(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), r && (It(t, !1), 0 === t.strm.avail_out)) return 1
                        }
                        return t.insert = 0, e === at ? (It(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (It(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                    })(n, e) : Zt[n.level].func(n, e);
                    if (3 !== r && 4 !== r || (n.status = zt), 1 === r || 3 === r) return 0 === t.avail_out && (n.last_flush = -1), lt;
                    if (2 === r && (e === nt ? rt(n) : e !== ot && ($(n, 0, 0, !1), e === st && (Ct(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, n.insert = 0))), Ut(t), 0 === t.avail_out)) return n.last_flush = -1, lt
                }
                return e !== at ? lt : n.wrap <= 0 ? ht : (2 === n.wrap ? (Tt(n, 255 & t.adler), Tt(n, t.adler >> 8 & 255), Tt(n, t.adler >> 16 & 255), Tt(n, t.adler >> 24 & 255), Tt(n, 255 & t.total_in), Tt(n, t.total_in >> 8 & 255), Tt(n, t.total_in >> 16 & 255), Tt(n, t.total_in >> 24 & 255)) : (Ft(n, t.adler >>> 16), Ft(n, 65535 & t.adler)), Ut(t), n.wrap > 0 && (n.wrap = -n.wrap), 0 !== n.pending ? lt : ht)
            }, Xt = t => {
                if (!t || !t.state) return ut;
                const e = t.state.status;
                return 42 !== e && 69 !== e && 73 !== e && 91 !== e && e !== xt && e !== At && e !== zt ? Et(t, ut) : (t.state = null, e === At ? Et(t, dt) : lt)
            }, Yt = (t, e) => {
                let r = e.length;
                if (!t || !t.state) return ut;
                const i = t.state, n = i.wrap;
                if (2 === n || 1 === n && 42 !== i.status || i.lookahead) return ut;
                if (1 === n && (t.adler = G(t.adler, e, r, 0)), i.wrap = 0, r >= i.w_size) {
                    0 === n && (Ct(i.head), i.strstart = 0, i.block_start = 0, i.insert = 0);
                    let t = new Uint8Array(i.w_size);
                    t.set(e.subarray(r - i.w_size, r), 0), e = t, r = i.w_size
                }
                const s = t.avail_in, a = t.next_in, o = t.input;
                for (t.avail_in = r, t.next_in = 0, t.input = e, Ot(i); i.lookahead >= 3;) {
                    let t = i.strstart, e = i.lookahead - 2;
                    do {
                        i.ins_h = Bt(i, i.ins_h, i.window[t + 3 - 1]), i.prev[t & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = t, t++
                    } while (--e);
                    i.strstart = t, i.lookahead = 2, Ot(i)
                }
                return i.strstart += i.lookahead, i.block_start = i.strstart, i.insert = i.lookahead, i.lookahead = 0, i.match_length = i.prev_length = 2, i.match_available = 0, t.next_in = a, t.input = o, t.avail_in = s, i.wrap = n, lt
            };
        const qt = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
        var Jt = function (t) {
            const e = Array.prototype.slice.call(arguments, 1);
            for (; e.length;) {
                const r = e.shift();
                if (r) {
                    if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                    for (const e in r) qt(r, e) && (t[e] = r[e])
                }
            }
            return t
        }, Qt = t => {
            let e = 0;
            for (let r = 0, i = t.length; r < i; r++) e += t[r].length;
            const r = new Uint8Array(e);
            for (let e = 0, i = 0, n = t.length; e < n; e++) {
                let n = t[e];
                r.set(n, i), i += n.length
            }
            return r
        };
        let $t = !0;
        try {
            String.fromCharCode.apply(null, new Uint8Array(1))
        } catch (t) {
            $t = !1
        }
        const te = new Uint8Array(256);
        for (let t = 0; t < 256; t++) te[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
        te[254] = te[254] = 1;
        var ee = t => {
            if ("function" == typeof TextEncoder && TextEncoder.prototype.encode) return (new TextEncoder).encode(t);
            let e, r, i, n, s, a = t.length, o = 0;
            for (n = 0; n < a; n++) r = t.charCodeAt(n), 55296 == (64512 & r) && n + 1 < a && (i = t.charCodeAt(n + 1), 56320 == (64512 & i) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++)), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
            for (e = new Uint8Array(o), s = 0, n = 0; s < o; n++) r = t.charCodeAt(n), 55296 == (64512 & r) && n + 1 < a && (i = t.charCodeAt(n + 1), 56320 == (64512 & i) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++)), r < 128 ? e[s++] = r : r < 2048 ? (e[s++] = 192 | r >>> 6, e[s++] = 128 | 63 & r) : r < 65536 ? (e[s++] = 224 | r >>> 12, e[s++] = 128 | r >>> 6 & 63, e[s++] = 128 | 63 & r) : (e[s++] = 240 | r >>> 18, e[s++] = 128 | r >>> 12 & 63, e[s++] = 128 | r >>> 6 & 63, e[s++] = 128 | 63 & r);
            return e
        }, re = (t, e) => {
            const r = e || t.length;
            if ("function" == typeof TextDecoder && TextDecoder.prototype.decode) return (new TextDecoder).decode(t.subarray(0, e));
            let i, n;
            const s = new Array(2 * r);
            for (n = 0, i = 0; i < r;) {
                let e = t[i++];
                if (e < 128) {
                    s[n++] = e;
                    continue
                }
                let a = te[e];
                if (a > 4) s[n++] = 65533, i += a - 1; else {
                    for (e &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && i < r;) e = e << 6 | 63 & t[i++], a--;
                    a > 1 ? s[n++] = 65533 : e < 65536 ? s[n++] = e : (e -= 65536, s[n++] = 55296 | e >> 10 & 1023, s[n++] = 56320 | 1023 & e)
                }
            }
            return ((t, e) => {
                if (e < 65534 && t.subarray && $t) return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
                let r = "";
                for (let i = 0; i < e; i++) r += String.fromCharCode(t[i]);
                return r
            })(s, n)
        }, ie = (t, e) => {
            (e = e || t.length) > t.length && (e = t.length);
            let r = e - 1;
            for (; r >= 0 && 128 == (192 & t[r]);) r--;
            return r < 0 || 0 === r ? e : r + te[t[r]] > e ? r : e
        }, ne = function () {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
        };
        const se = Object.prototype.toString, {Z_NO_FLUSH: ae, Z_SYNC_FLUSH: oe, Z_FULL_FLUSH: le, Z_FINISH: he, Z_OK: ue, Z_STREAM_END: de, Z_DEFAULT_COMPRESSION: ce, Z_DEFAULT_STRATEGY: fe, Z_DEFLATED: pe} = J;

        function me(t) {
            this.options = Jt({
                level: ce,
                method: pe,
                chunkSize: 16384,
                windowBits: 15,
                memLevel: 8,
                strategy: fe
            }, t || {});
            let e = this.options;
            e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new ne, this.strm.avail_out = 0;
            let r = Vt(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
            if (r !== ue) throw new Error(q[r]);
            if (e.header && Kt(this.strm, e.header), e.dictionary) {
                let t;
                if (t = "string" == typeof e.dictionary ? ee(e.dictionary) : "[object ArrayBuffer]" === se.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, r = Yt(this.strm, t), r !== ue) throw new Error(q[r]);
                this._dict_set = !0
            }
        }

        function _e(t, e) {
            const r = new me(e);
            if (r.push(t, !0), r.err) throw r.msg || q[r.err];
            return r.result
        }

        me.prototype.push = function (t, e) {
            const r = this.strm, i = this.options.chunkSize;
            let n, s;
            if (this.ended) return !1;
            for (s = e === ~~e ? e : !0 === e ? he : ae, "string" == typeof t ? r.input = ee(t) : "[object ArrayBuffer]" === se.call(t) ? r.input = new Uint8Array(t) : r.input = t, r.next_in = 0, r.avail_in = r.input.length; ;) if (0 === r.avail_out && (r.output = new Uint8Array(i), r.next_out = 0, r.avail_out = i), (s === oe || s === le) && r.avail_out <= 6) this.onData(r.output.subarray(0, r.next_out)), r.avail_out = 0; else {
                if (n = Gt(r, s), n === de) return r.next_out > 0 && this.onData(r.output.subarray(0, r.next_out)), n = Xt(this.strm), this.onEnd(n), this.ended = !0, n === ue;
                if (0 !== r.avail_out) {
                    if (s > 0 && r.next_out > 0) this.onData(r.output.subarray(0, r.next_out)), r.avail_out = 0; else if (0 === r.avail_in) break
                } else this.onData(r.output)
            }
            return !0
        }, me.prototype.onData = function (t) {
            this.chunks.push(t)
        }, me.prototype.onEnd = function (t) {
            t === ue && (this.result = Qt(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
        };
        var ge = {
            Deflate: me, deflate: _e, deflateRaw: function (t, e) {
                return (e = e || {}).raw = !0, _e(t, e)
            }, gzip: function (t, e) {
                return (e = e || {}).gzip = !0, _e(t, e)
            }, constants: J
        }, we = function (t, e) {
            let r, i, n, s, a, o, l, h, u, d, c, f, p, m, _, g, w, b, v, y, k, x, A, z;
            const E = t.state;
            r = t.next_in, A = t.input, i = r + (t.avail_in - 5), n = t.next_out, z = t.output, s = n - (e - t.avail_out), a = n + (t.avail_out - 257), o = E.dmax, l = E.wsize, h = E.whave, u = E.wnext, d = E.window, c = E.hold, f = E.bits, p = E.lencode, m = E.distcode, _ = (1 << E.lenbits) - 1, g = (1 << E.distbits) - 1;
            t:do {
                f < 15 && (c += A[r++] << f, f += 8, c += A[r++] << f, f += 8), w = p[c & _];
                e:for (; ;) {
                    if (b = w >>> 24, c >>>= b, f -= b, b = w >>> 16 & 255, 0 === b) z[n++] = 65535 & w; else {
                        if (!(16 & b)) {
                            if (0 == (64 & b)) {
                                w = p[(65535 & w) + (c & (1 << b) - 1)];
                                continue e
                            }
                            if (32 & b) {
                                E.mode = 12;
                                break t
                            }
                            t.msg = "invalid literal/length code", E.mode = 30;
                            break t
                        }
                        v = 65535 & w, b &= 15, b && (f < b && (c += A[r++] << f, f += 8), v += c & (1 << b) - 1, c >>>= b, f -= b), f < 15 && (c += A[r++] << f, f += 8, c += A[r++] << f, f += 8), w = m[c & g];
                        r:for (; ;) {
                            if (b = w >>> 24, c >>>= b, f -= b, b = w >>> 16 & 255, !(16 & b)) {
                                if (0 == (64 & b)) {
                                    w = m[(65535 & w) + (c & (1 << b) - 1)];
                                    continue r
                                }
                                t.msg = "invalid distance code", E.mode = 30;
                                break t
                            }
                            if (y = 65535 & w, b &= 15, f < b && (c += A[r++] << f, f += 8, f < b && (c += A[r++] << f, f += 8)), y += c & (1 << b) - 1, y > o) {
                                t.msg = "invalid distance too far back", E.mode = 30;
                                break t
                            }
                            if (c >>>= b, f -= b, b = n - s, y > b) {
                                if (b = y - b, b > h && E.sane) {
                                    t.msg = "invalid distance too far back", E.mode = 30;
                                    break t
                                }
                                if (k = 0, x = d, 0 === u) {
                                    if (k += l - b, b < v) {
                                        v -= b;
                                        do {
                                            z[n++] = d[k++]
                                        } while (--b);
                                        k = n - y, x = z
                                    }
                                } else if (u < b) {
                                    if (k += l + u - b, b -= u, b < v) {
                                        v -= b;
                                        do {
                                            z[n++] = d[k++]
                                        } while (--b);
                                        if (k = 0, u < v) {
                                            b = u, v -= b;
                                            do {
                                                z[n++] = d[k++]
                                            } while (--b);
                                            k = n - y, x = z
                                        }
                                    }
                                } else if (k += u - b, b < v) {
                                    v -= b;
                                    do {
                                        z[n++] = d[k++]
                                    } while (--b);
                                    k = n - y, x = z
                                }
                                for (; v > 2;) z[n++] = x[k++], z[n++] = x[k++], z[n++] = x[k++], v -= 3;
                                v && (z[n++] = x[k++], v > 1 && (z[n++] = x[k++]))
                            } else {
                                k = n - y;
                                do {
                                    z[n++] = z[k++], z[n++] = z[k++], z[n++] = z[k++], v -= 3
                                } while (v > 2);
                                v && (z[n++] = z[k++], v > 1 && (z[n++] = z[k++]))
                            }
                            break
                        }
                    }
                    break
                }
            } while (r < i && n < a);
            v = f >> 3, r -= v, f -= v << 3, c &= (1 << f) - 1, t.next_in = r, t.next_out = n, t.avail_in = r < i ? i - r + 5 : 5 - (r - i), t.avail_out = n < a ? a - n + 257 : 257 - (n - a), E.hold = c, E.bits = f
        };
        const be = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),
            ve = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
            ye = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]),
            ke = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
        var xe = (t, e, r, i, n, s, a, o) => {
            const l = o.bits;
            let h, u, d, c, f, p, m = 0, _ = 0, g = 0, w = 0, b = 0, v = 0, y = 0, k = 0, x = 0, A = 0, z = null, E = 0;
            const S = new Uint16Array(16), C = new Uint16Array(16);
            let B, U, I, T = null, F = 0;
            for (m = 0; m <= 15; m++) S[m] = 0;
            for (_ = 0; _ < i; _++) S[e[r + _]]++;
            for (b = l, w = 15; w >= 1 && 0 === S[w]; w--) ;
            if (b > w && (b = w), 0 === w) return n[s++] = 20971520, n[s++] = 20971520, o.bits = 1, 0;
            for (g = 1; g < w && 0 === S[g]; g++) ;
            for (b < g && (b = g), k = 1, m = 1; m <= 15; m++) if (k <<= 1, k -= S[m], k < 0) return -1;
            if (k > 0 && (0 === t || 1 !== w)) return -1;
            for (C[1] = 0, m = 1; m < 15; m++) C[m + 1] = C[m] + S[m];
            for (_ = 0; _ < i; _++) 0 !== e[r + _] && (a[C[e[r + _]]++] = _);
            if (0 === t ? (z = T = a, p = 19) : 1 === t ? (z = be, E -= 257, T = ve, F -= 257, p = 256) : (z = ye, T = ke, p = -1), A = 0, _ = 0, m = g, f = s, v = b, y = 0, d = -1, x = 1 << b, c = x - 1, 1 === t && x > 852 || 2 === t && x > 592) return 1;
            for (; ;) {
                B = m - y, a[_] < p ? (U = 0, I = a[_]) : a[_] > p ? (U = T[F + a[_]], I = z[E + a[_]]) : (U = 96, I = 0), h = 1 << m - y, u = 1 << v, g = u;
                do {
                    u -= h, n[f + (A >> y) + u] = B << 24 | U << 16 | I | 0
                } while (0 !== u);
                for (h = 1 << m - 1; A & h;) h >>= 1;
                if (0 !== h ? (A &= h - 1, A += h) : A = 0, _++, 0 == --S[m]) {
                    if (m === w) break;
                    m = e[r + a[_]]
                }
                if (m > b && (A & c) !== d) {
                    for (0 === y && (y = b), f += g, v = m - y, k = 1 << v; v + y < w && (k -= S[v + y], !(k <= 0));) v++, k <<= 1;
                    if (x += 1 << v, 1 === t && x > 852 || 2 === t && x > 592) return 1;
                    d = A & c, n[d] = b << 24 | v << 16 | f - s | 0
                }
            }
            return 0 !== A && (n[f + A] = m - y << 24 | 64 << 16 | 0), o.bits = b, 0
        };
        const {Z_FINISH: Ae, Z_BLOCK: ze, Z_TREES: Ee, Z_OK: Se, Z_STREAM_END: Ce, Z_NEED_DICT: Be, Z_STREAM_ERROR: Ue, Z_DATA_ERROR: Ie, Z_MEM_ERROR: Te, Z_BUF_ERROR: Fe, Z_DEFLATED: Le} = J,
            Re = 12, Oe = 30, De = t => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24);

        function Pe() {
            this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
        }

        const Ne = t => {
            if (!t || !t.state) return Ue;
            const e = t.state;
            return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = 1, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(852), e.distcode = e.distdyn = new Int32Array(592), e.sane = 1, e.back = -1, Se
        }, Ze = t => {
            if (!t || !t.state) return Ue;
            const e = t.state;
            return e.wsize = 0, e.whave = 0, e.wnext = 0, Ne(t)
        }, Me = (t, e) => {
            let r;
            if (!t || !t.state) return Ue;
            const i = t.state;
            return e < 0 ? (r = 0, e = -e) : (r = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Ue : (null !== i.window && i.wbits !== e && (i.window = null), i.wrap = r, i.wbits = e, Ze(t))
        }, He = (t, e) => {
            if (!t) return Ue;
            const r = new Pe;
            t.state = r, r.window = null;
            const i = Me(t, e);
            return i !== Se && (t.state = null), i
        };
        let je, We, Ve = !0;
        const Ke = t => {
            if (Ve) {
                je = new Int32Array(512), We = new Int32Array(32);
                let e = 0;
                for (; e < 144;) t.lens[e++] = 8;
                for (; e < 256;) t.lens[e++] = 9;
                for (; e < 280;) t.lens[e++] = 7;
                for (; e < 288;) t.lens[e++] = 8;
                for (xe(1, t.lens, 0, 288, je, 0, t.work, {bits: 9}), e = 0; e < 32;) t.lens[e++] = 5;
                xe(2, t.lens, 0, 32, We, 0, t.work, {bits: 5}), Ve = !1
            }
            t.lencode = je, t.lenbits = 9, t.distcode = We, t.distbits = 5
        }, Ge = (t, e, r, i) => {
            let n;
            const s = t.state;
            return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new Uint8Array(s.wsize)), i >= s.wsize ? (s.window.set(e.subarray(r - s.wsize, r), 0), s.wnext = 0, s.whave = s.wsize) : (n = s.wsize - s.wnext, n > i && (n = i), s.window.set(e.subarray(r - i, r - i + n), s.wnext), (i -= n) ? (s.window.set(e.subarray(r - i, r), 0), s.wnext = i, s.whave = s.wsize) : (s.wnext += n, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += n))), 0
        };
        var Xe = Ze, Ye = He, qe = (t, e) => {
            let r, i, n, s, a, o, l, h, u, d, c, f, p, m, _, g, w, b, v, y, k, x, A = 0;
            const z = new Uint8Array(4);
            let E, S;
            const C = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
            if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return Ue;
            r = t.state, r.mode === Re && (r.mode = 13), a = t.next_out, n = t.output, l = t.avail_out, s = t.next_in, i = t.input, o = t.avail_in, h = r.hold, u = r.bits, d = o, c = l, x = Se;
            t:for (; ;) switch (r.mode) {
                case 1:
                    if (0 === r.wrap) {
                        r.mode = 13;
                        break
                    }
                    for (; u < 16;) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    if (2 & r.wrap && 35615 === h) {
                        r.check = 0, z[0] = 255 & h, z[1] = h >>> 8 & 255, r.check = Y(r.check, z, 2, 0), h = 0, u = 0, r.mode = 2;
                        break
                    }
                    if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {
                        t.msg = "incorrect header check", r.mode = Oe;
                        break
                    }
                    if ((15 & h) !== Le) {
                        t.msg = "unknown compression method", r.mode = Oe;
                        break
                    }
                    if (h >>>= 4, u -= 4, k = 8 + (15 & h), 0 === r.wbits) r.wbits = k; else if (k > r.wbits) {
                        t.msg = "invalid window size", r.mode = Oe;
                        break
                    }
                    r.dmax = 1 << r.wbits, t.adler = r.check = 1, r.mode = 512 & h ? 10 : Re, h = 0, u = 0;
                    break;
                case 2:
                    for (; u < 16;) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    if (r.flags = h, (255 & r.flags) !== Le) {
                        t.msg = "unknown compression method", r.mode = Oe;
                        break
                    }
                    if (57344 & r.flags) {
                        t.msg = "unknown header flags set", r.mode = Oe;
                        break
                    }
                    r.head && (r.head.text = h >> 8 & 1), 512 & r.flags && (z[0] = 255 & h, z[1] = h >>> 8 & 255, r.check = Y(r.check, z, 2, 0)), h = 0, u = 0, r.mode = 3;
                case 3:
                    for (; u < 32;) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    r.head && (r.head.time = h), 512 & r.flags && (z[0] = 255 & h, z[1] = h >>> 8 & 255, z[2] = h >>> 16 & 255, z[3] = h >>> 24 & 255, r.check = Y(r.check, z, 4, 0)), h = 0, u = 0, r.mode = 4;
                case 4:
                    for (; u < 16;) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    r.head && (r.head.xflags = 255 & h, r.head.os = h >> 8), 512 & r.flags && (z[0] = 255 & h, z[1] = h >>> 8 & 255, r.check = Y(r.check, z, 2, 0)), h = 0, u = 0, r.mode = 5;
                case 5:
                    if (1024 & r.flags) {
                        for (; u < 16;) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        r.length = h, r.head && (r.head.extra_len = h), 512 & r.flags && (z[0] = 255 & h, z[1] = h >>> 8 & 255, r.check = Y(r.check, z, 2, 0)), h = 0, u = 0
                    } else r.head && (r.head.extra = null);
                    r.mode = 6;
                case 6:
                    if (1024 & r.flags && (f = r.length, f > o && (f = o), f && (r.head && (k = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Uint8Array(r.head.extra_len)), r.head.extra.set(i.subarray(s, s + f), k)), 512 & r.flags && (r.check = Y(r.check, i, f, s)), o -= f, s += f, r.length -= f), r.length)) break t;
                    r.length = 0, r.mode = 7;
                case 7:
                    if (2048 & r.flags) {
                        if (0 === o) break t;
                        f = 0;
                        do {
                            k = i[s + f++], r.head && k && r.length < 65536 && (r.head.name += String.fromCharCode(k))
                        } while (k && f < o);
                        if (512 & r.flags && (r.check = Y(r.check, i, f, s)), o -= f, s += f, k) break t
                    } else r.head && (r.head.name = null);
                    r.length = 0, r.mode = 8;
                case 8:
                    if (4096 & r.flags) {
                        if (0 === o) break t;
                        f = 0;
                        do {
                            k = i[s + f++], r.head && k && r.length < 65536 && (r.head.comment += String.fromCharCode(k))
                        } while (k && f < o);
                        if (512 & r.flags && (r.check = Y(r.check, i, f, s)), o -= f, s += f, k) break t
                    } else r.head && (r.head.comment = null);
                    r.mode = 9;
                case 9:
                    if (512 & r.flags) {
                        for (; u < 16;) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        if (h !== (65535 & r.check)) {
                            t.msg = "header crc mismatch", r.mode = Oe;
                            break
                        }
                        h = 0, u = 0
                    }
                    r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), t.adler = r.check = 0, r.mode = Re;
                    break;
                case 10:
                    for (; u < 32;) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    t.adler = r.check = De(h), h = 0, u = 0, r.mode = 11;
                case 11:
                    if (0 === r.havedict) return t.next_out = a, t.avail_out = l, t.next_in = s, t.avail_in = o, r.hold = h, r.bits = u, Be;
                    t.adler = r.check = 1, r.mode = Re;
                case Re:
                    if (e === ze || e === Ee) break t;
                case 13:
                    if (r.last) {
                        h >>>= 7 & u, u -= 7 & u, r.mode = 27;
                        break
                    }
                    for (; u < 3;) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    switch (r.last = 1 & h, h >>>= 1, u -= 1, 3 & h) {
                        case 0:
                            r.mode = 14;
                            break;
                        case 1:
                            if (Ke(r), r.mode = 20, e === Ee) {
                                h >>>= 2, u -= 2;
                                break t
                            }
                            break;
                        case 2:
                            r.mode = 17;
                            break;
                        case 3:
                            t.msg = "invalid block type", r.mode = Oe
                    }
                    h >>>= 2, u -= 2;
                    break;
                case 14:
                    for (h >>>= 7 & u, u -= 7 & u; u < 32;) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    if ((65535 & h) != (h >>> 16 ^ 65535)) {
                        t.msg = "invalid stored block lengths", r.mode = Oe;
                        break
                    }
                    if (r.length = 65535 & h, h = 0, u = 0, r.mode = 15, e === Ee) break t;
                case 15:
                    r.mode = 16;
                case 16:
                    if (f = r.length, f) {
                        if (f > o && (f = o), f > l && (f = l), 0 === f) break t;
                        n.set(i.subarray(s, s + f), a), o -= f, s += f, l -= f, a += f, r.length -= f;
                        break
                    }
                    r.mode = Re;
                    break;
                case 17:
                    for (; u < 14;) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    if (r.nlen = 257 + (31 & h), h >>>= 5, u -= 5, r.ndist = 1 + (31 & h), h >>>= 5, u -= 5, r.ncode = 4 + (15 & h), h >>>= 4, u -= 4, r.nlen > 286 || r.ndist > 30) {
                        t.msg = "too many length or distance symbols", r.mode = Oe;
                        break
                    }
                    r.have = 0, r.mode = 18;
                case 18:
                    for (; r.have < r.ncode;) {
                        for (; u < 3;) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        r.lens[C[r.have++]] = 7 & h, h >>>= 3, u -= 3
                    }
                    for (; r.have < 19;) r.lens[C[r.have++]] = 0;
                    if (r.lencode = r.lendyn, r.lenbits = 7, E = {bits: r.lenbits}, x = xe(0, r.lens, 0, 19, r.lencode, 0, r.work, E), r.lenbits = E.bits, x) {
                        t.msg = "invalid code lengths set", r.mode = Oe;
                        break
                    }
                    r.have = 0, r.mode = 19;
                case 19:
                    for (; r.have < r.nlen + r.ndist;) {
                        for (; A = r.lencode[h & (1 << r.lenbits) - 1], _ = A >>> 24, g = A >>> 16 & 255, w = 65535 & A, !(_ <= u);) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        if (w < 16) h >>>= _, u -= _, r.lens[r.have++] = w; else {
                            if (16 === w) {
                                for (S = _ + 2; u < S;) {
                                    if (0 === o) break t;
                                    o--, h += i[s++] << u, u += 8
                                }
                                if (h >>>= _, u -= _, 0 === r.have) {
                                    t.msg = "invalid bit length repeat", r.mode = Oe;
                                    break
                                }
                                k = r.lens[r.have - 1], f = 3 + (3 & h), h >>>= 2, u -= 2
                            } else if (17 === w) {
                                for (S = _ + 3; u < S;) {
                                    if (0 === o) break t;
                                    o--, h += i[s++] << u, u += 8
                                }
                                h >>>= _, u -= _, k = 0, f = 3 + (7 & h), h >>>= 3, u -= 3
                            } else {
                                for (S = _ + 7; u < S;) {
                                    if (0 === o) break t;
                                    o--, h += i[s++] << u, u += 8
                                }
                                h >>>= _, u -= _, k = 0, f = 11 + (127 & h), h >>>= 7, u -= 7
                            }
                            if (r.have + f > r.nlen + r.ndist) {
                                t.msg = "invalid bit length repeat", r.mode = Oe;
                                break
                            }
                            for (; f--;) r.lens[r.have++] = k
                        }
                    }
                    if (r.mode === Oe) break;
                    if (0 === r.lens[256]) {
                        t.msg = "invalid code -- missing end-of-block", r.mode = Oe;
                        break
                    }
                    if (r.lenbits = 9, E = {bits: r.lenbits}, x = xe(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, E), r.lenbits = E.bits, x) {
                        t.msg = "invalid literal/lengths set", r.mode = Oe;
                        break
                    }
                    if (r.distbits = 6, r.distcode = r.distdyn, E = {bits: r.distbits}, x = xe(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, E), r.distbits = E.bits, x) {
                        t.msg = "invalid distances set", r.mode = Oe;
                        break
                    }
                    if (r.mode = 20, e === Ee) break t;
                case 20:
                    r.mode = 21;
                case 21:
                    if (o >= 6 && l >= 258) {
                        t.next_out = a, t.avail_out = l, t.next_in = s, t.avail_in = o, r.hold = h, r.bits = u, we(t, c), a = t.next_out, n = t.output, l = t.avail_out, s = t.next_in, i = t.input, o = t.avail_in, h = r.hold, u = r.bits, r.mode === Re && (r.back = -1);
                        break
                    }
                    for (r.back = 0; A = r.lencode[h & (1 << r.lenbits) - 1], _ = A >>> 24, g = A >>> 16 & 255, w = 65535 & A, !(_ <= u);) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    if (g && 0 == (240 & g)) {
                        for (b = _, v = g, y = w; A = r.lencode[y + ((h & (1 << b + v) - 1) >> b)], _ = A >>> 24, g = A >>> 16 & 255, w = 65535 & A, !(b + _ <= u);) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        h >>>= b, u -= b, r.back += b
                    }
                    if (h >>>= _, u -= _, r.back += _, r.length = w, 0 === g) {
                        r.mode = 26;
                        break
                    }
                    if (32 & g) {
                        r.back = -1, r.mode = Re;
                        break
                    }
                    if (64 & g) {
                        t.msg = "invalid literal/length code", r.mode = Oe;
                        break
                    }
                    r.extra = 15 & g, r.mode = 22;
                case 22:
                    if (r.extra) {
                        for (S = r.extra; u < S;) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        r.length += h & (1 << r.extra) - 1, h >>>= r.extra, u -= r.extra, r.back += r.extra
                    }
                    r.was = r.length, r.mode = 23;
                case 23:
                    for (; A = r.distcode[h & (1 << r.distbits) - 1], _ = A >>> 24, g = A >>> 16 & 255, w = 65535 & A, !(_ <= u);) {
                        if (0 === o) break t;
                        o--, h += i[s++] << u, u += 8
                    }
                    if (0 == (240 & g)) {
                        for (b = _, v = g, y = w; A = r.distcode[y + ((h & (1 << b + v) - 1) >> b)], _ = A >>> 24, g = A >>> 16 & 255, w = 65535 & A, !(b + _ <= u);) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        h >>>= b, u -= b, r.back += b
                    }
                    if (h >>>= _, u -= _, r.back += _, 64 & g) {
                        t.msg = "invalid distance code", r.mode = Oe;
                        break
                    }
                    r.offset = w, r.extra = 15 & g, r.mode = 24;
                case 24:
                    if (r.extra) {
                        for (S = r.extra; u < S;) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        r.offset += h & (1 << r.extra) - 1, h >>>= r.extra, u -= r.extra, r.back += r.extra
                    }
                    if (r.offset > r.dmax) {
                        t.msg = "invalid distance too far back", r.mode = Oe;
                        break
                    }
                    r.mode = 25;
                case 25:
                    if (0 === l) break t;
                    if (f = c - l, r.offset > f) {
                        if (f = r.offset - f, f > r.whave && r.sane) {
                            t.msg = "invalid distance too far back", r.mode = Oe;
                            break
                        }
                        f > r.wnext ? (f -= r.wnext, p = r.wsize - f) : p = r.wnext - f, f > r.length && (f = r.length), m = r.window
                    } else m = n, p = a - r.offset, f = r.length;
                    f > l && (f = l), l -= f, r.length -= f;
                    do {
                        n[a++] = m[p++]
                    } while (--f);
                    0 === r.length && (r.mode = 21);
                    break;
                case 26:
                    if (0 === l) break t;
                    n[a++] = r.length, l--, r.mode = 21;
                    break;
                case 27:
                    if (r.wrap) {
                        for (; u < 32;) {
                            if (0 === o) break t;
                            o--, h |= i[s++] << u, u += 8
                        }
                        if (c -= l, t.total_out += c, r.total += c, c && (t.adler = r.check = r.flags ? Y(r.check, n, c, a - c) : G(r.check, n, c, a - c)), c = l, (r.flags ? h : De(h)) !== r.check) {
                            t.msg = "incorrect data check", r.mode = Oe;
                            break
                        }
                        h = 0, u = 0
                    }
                    r.mode = 28;
                case 28:
                    if (r.wrap && r.flags) {
                        for (; u < 32;) {
                            if (0 === o) break t;
                            o--, h += i[s++] << u, u += 8
                        }
                        if (h !== (4294967295 & r.total)) {
                            t.msg = "incorrect length check", r.mode = Oe;
                            break
                        }
                        h = 0, u = 0
                    }
                    r.mode = 29;
                case 29:
                    x = Ce;
                    break t;
                case Oe:
                    x = Ie;
                    break t;
                case 31:
                    return Te;
                case 32:
                default:
                    return Ue
            }
            return t.next_out = a, t.avail_out = l, t.next_in = s, t.avail_in = o, r.hold = h, r.bits = u, (r.wsize || c !== t.avail_out && r.mode < Oe && (r.mode < 27 || e !== Ae)) && Ge(t, t.output, t.next_out, c - t.avail_out), d -= t.avail_in, c -= t.avail_out, t.total_in += d, t.total_out += c, r.total += c, r.wrap && c && (t.adler = r.check = r.flags ? Y(r.check, n, c, t.next_out - c) : G(r.check, n, c, t.next_out - c)), t.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === Re ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 === d && 0 === c || e === Ae) && x === Se && (x = Fe), x
        }, Je = t => {
            if (!t || !t.state) return Ue;
            let e = t.state;
            return e.window && (e.window = null), t.state = null, Se
        }, Qe = (t, e) => {
            if (!t || !t.state) return Ue;
            const r = t.state;
            return 0 == (2 & r.wrap) ? Ue : (r.head = e, e.done = !1, Se)
        }, $e = (t, e) => {
            const r = e.length;
            let i, n, s;
            return t && t.state ? (i = t.state, 0 !== i.wrap && 11 !== i.mode ? Ue : 11 === i.mode && (n = 1, n = G(n, e, r, 0), n !== i.check) ? Ie : (s = Ge(t, e, r, r), s ? (i.mode = 31, Te) : (i.havedict = 1, Se))) : Ue
        }, tr = function () {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
        };
        const er = Object.prototype.toString, {Z_NO_FLUSH: rr, Z_FINISH: ir, Z_OK: nr, Z_STREAM_END: sr, Z_NEED_DICT: ar, Z_STREAM_ERROR: or, Z_DATA_ERROR: lr, Z_MEM_ERROR: hr} = J;

        function ur(t) {
            this.options = Jt({chunkSize: 65536, windowBits: 15, to: ""}, t || {});
            const e = this.options;
            e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(e.windowBits >= 0 && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new ne, this.strm.avail_out = 0;
            let r = Ye(this.strm, e.windowBits);
            if (r !== nr) throw new Error(q[r]);
            if (this.header = new tr, Qe(this.strm, this.header), e.dictionary && ("string" == typeof e.dictionary ? e.dictionary = ee(e.dictionary) : "[object ArrayBuffer]" === er.call(e.dictionary) && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (r = $e(this.strm, e.dictionary), r !== nr))) throw new Error(q[r])
        }

        function dr(t, e) {
            const r = new ur(e);
            if (r.push(t), r.err) throw r.msg || q[r.err];
            return r.result
        }

        ur.prototype.push = function (t, e) {
            const r = this.strm, i = this.options.chunkSize, n = this.options.dictionary;
            let s, a, o;
            if (this.ended) return !1;
            for (a = e === ~~e ? e : !0 === e ? ir : rr, "[object ArrayBuffer]" === er.call(t) ? r.input = new Uint8Array(t) : r.input = t, r.next_in = 0, r.avail_in = r.input.length; ;) {
                for (0 === r.avail_out && (r.output = new Uint8Array(i), r.next_out = 0, r.avail_out = i), s = qe(r, a), s === ar && n && (s = $e(r, n), s === nr ? s = qe(r, a) : s === lr && (s = ar)); r.avail_in > 0 && s === sr && r.state.wrap > 0 && 0 !== t[r.next_in];) Xe(r), s = qe(r, a);
                switch (s) {
                    case or:
                    case lr:
                    case ar:
                    case hr:
                        return this.onEnd(s), this.ended = !0, !1
                }
                if (o = r.avail_out, r.next_out && (0 === r.avail_out || s === sr)) if ("string" === this.options.to) {
                    let t = ie(r.output, r.next_out), e = r.next_out - t, n = re(r.output, t);
                    r.next_out = e, r.avail_out = i - e, e && r.output.set(r.output.subarray(t, t + e), 0), this.onData(n)
                } else this.onData(r.output.length === r.next_out ? r.output : r.output.subarray(0, r.next_out));
                if (s !== nr || 0 !== o) {
                    if (s === sr) return s = Je(this.strm), this.onEnd(s), this.ended = !0, !0;
                    if (0 === r.avail_in) break
                }
            }
            return !0
        }, ur.prototype.onData = function (t) {
            this.chunks.push(t)
        }, ur.prototype.onEnd = function (t) {
            t === nr && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = Qt(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
        };
        var cr = {
            Inflate: ur, inflate: dr, inflateRaw: function (t, e) {
                return (e = e || {}).raw = !0, dr(t, e)
            }, ungzip: dr, constants: J
        };
        const {Deflate: fr, deflate: pr, deflateRaw: mr, gzip: _r} = ge, {Inflate: gr, inflate: wr, inflateRaw: br, ungzip: vr} = cr;
        var yr = {
            Deflate: fr,
            deflate: pr,
            deflateRaw: mr,
            gzip: _r,
            Inflate: gr,
            inflate: wr,
            inflateRaw: br,
            ungzip: vr,
            constants: J
        };

        function kr(t, e, r, i) {
            if (r) {
                const r = new Uint8Array(t, e), n = new Uint8Array(i);
                let s = 0, a = 0;
                for (; a < i;) if (i - a >= 2 && 237 == r[s] && 237 == r[s + 1]) {
                    const t = r[s + 2], e = r[s + 3];
                    for (let r = 0; r < t; r++) n[a++] = e;
                    s += 4
                } else n[a++] = r[s++];
                return n
            }
            return new Uint8Array(t, e, i)
        }

        function xr(t, e) {
            const r = t.getUint32(e, !0);
            return String.fromCharCode(255 & r) + String.fromCharCode((65280 & r) >> 8) + String.fromCharCode((16711680 & r) >> 16) + String.fromCharCode(r >> 24)
        }

        const Ar = {
            49: {row: 3, mask: 1},
            50: {row: 3, mask: 2},
            51: {row: 3, mask: 4},
            52: {row: 3, mask: 8},
            53: {row: 3, mask: 16},
            54: {row: 4, mask: 16},
            55: {row: 4, mask: 8},
            56: {row: 4, mask: 4},
            57: {row: 4, mask: 2},
            48: {row: 4, mask: 1},
            81: {row: 2, mask: 1},
            87: {row: 2, mask: 2},
            69: {row: 2, mask: 4},
            82: {row: 2, mask: 8},
            84: {row: 2, mask: 16},
            89: {row: 5, mask: 16},
            85: {row: 5, mask: 8},
            73: {row: 5, mask: 4},
            79: {row: 5, mask: 2},
            80: {row: 5, mask: 1},
            65: {row: 1, mask: 1},
            83: {row: 1, mask: 2},
            68: {row: 1, mask: 4},
            70: {row: 1, mask: 8},
            71: {row: 1, mask: 16},
            72: {row: 6, mask: 16},
            74: {row: 6, mask: 8},
            75: {row: 6, mask: 4},
            76: {row: 6, mask: 2},
            13: {row: 6, mask: 1},
            16: {row: 0, mask: 1},
            192: {row: 0, mask: 1},
            90: {row: 0, mask: 2},
            88: {row: 0, mask: 4},
            67: {row: 0, mask: 8},
            86: {row: 0, mask: 16},
            66: {row: 7, mask: 16},
            78: {row: 7, mask: 8},
            77: {row: 7, mask: 4},
            17: {row: 7, mask: 2},
            32: {row: 7, mask: 1},
            8: {row: 4, mask: 1, caps: !0},
            37: {row: 3, mask: 16, caps: !0},
            38: {row: 4, mask: 8, caps: !0},
            39: {row: 4, mask: 4, caps: !0},
            40: {row: 4, mask: 16, caps: !0}
        };

        class zr {
            constructor(t) {
                this.worker = t, this.keydownHandler = t => {
                    const e = Ar[t.keyCode];
                    e && (this.worker.postMessage({
                        message: "keyDown",
                        row: e.row,
                        mask: e.mask
                    }), e.caps && this.worker.postMessage({
                        message: "keyDown",
                        row: 0,
                        mask: 1
                    })), t.metaKey || t.preventDefault()
                }, this.keyupHandler = t => {
                    const e = Ar[t.keyCode];
                    e && (this.worker.postMessage({
                        message: "keyUp",
                        row: e.row,
                        mask: e.mask
                    }), e.caps && this.worker.postMessage({
                        message: "keyUp",
                        row: 0,
                        mask: 1
                    })), t.metaKey || t.preventDefault()
                }, this.keypressHandler = t => {
                    t.metaKey || t.preventDefault()
                }
            }

            start() {
                document.addEventListener("keydown", this.keydownHandler), document.addEventListener("keyup", this.keyupHandler), document.addEventListener("keypress", this.keypressHandler)
            }

            stop() {
                document.removeEventListener("keydown", this.keydownHandler), document.removeEventListener("keyup", this.keyupHandler), document.removeEventListener("keypress", this.keypressHandler)
            }
        }

        const Er = 65536;

        class Sr {
            constructor() {
                this.isActive = !1
            }

            start() {
                const t = window.AudioContext || window.webkitAudioContext;
                this.audioContext = new t({latencyHint: "interactive"}), this.samplesPerFrame = this.audioContext.sampleRate / 50, this.frameBuffers = [new ArrayBuffer(4 * this.samplesPerFrame), new ArrayBuffer(4 * this.samplesPerFrame)], this.leftBuffer = new Float32Array(Er), this.rightBuffer = new Float32Array(Er), this.readPtr = 0, this.writePtr = 0, this.scriptNode = this.audioContext.createScriptProcessor(0, 0, 2), this.scriptNode.onaudioprocess = t => {
                    const e = t.outputBuffer, r = e.getChannelData(0), i = e.getChannelData(1);
                    let n = this.writePtr - this.readPtr;
                    if (n < 0 && (n += Er), n >= r.length) if (this.readPtr + r.length <= Er) r.set(this.leftBuffer.slice(this.readPtr, this.readPtr + r.length)), i.set(this.rightBuffer.slice(this.readPtr, this.readPtr + i.length)), this.readPtr = (this.readPtr + r.length) % Er; else {
                        const t = Er - this.readPtr, e = r.length - t;
                        r.set(this.leftBuffer.slice(this.readPtr, this.readPtr + t)), i.set(this.rightBuffer.slice(this.readPtr, this.readPtr + t)), r.set(this.leftBuffer.slice(0, e), t), i.set(this.rightBuffer.slice(0, e), t), this.readPtr = e
                    }
                }, this.scriptNode.connect(this.audioContext.destination), this.isActive = !0
            }

            stop() {
                this.scriptNode.disconnect(this.audioContext.destination), this.audioContext.close()
            }

            frameCompleted(t, e) {
                if (this.frameBuffers[0] = t, this.frameBuffers[1] = e, !this.isActive) return;
                const r = t.byteLength / 4;
                if (this.writePtr + r <= Er) {
                    const i = new Float32Array(t), n = new Float32Array(e);
                    this.leftBuffer.set(i, this.writePtr), this.rightBuffer.set(n, this.writePtr), this.writePtr = (this.writePtr + r) % Er
                } else {
                    const i = Er - this.writePtr, n = r - i, s = new Float32Array(t, 0, i),
                        a = new Float32Array(e, 0, i);
                    this.leftBuffer.set(s, this.writePtr), this.rightBuffer.set(a, this.writePtr);
                    const o = new Float32Array(t, 4 * i, n), l = new Float32Array(e, 4 * i, n);
                    this.leftBuffer.set(o, 0), this.rightBuffer.set(l, 0), this.writePtr = n
                }
            }

            drawOscilloscope(t, e) {
                this.canvasCtx.fillStyle = "#000", this.canvasCtx.strokeStyle = "#0f0", this.canvasCtx.fillRect(0, 0, this.samplesPerFrame, 64);
                const r = new Float32Array(t);
                this.canvasCtx.beginPath(), this.canvasCtx.moveTo(0, 16);
                for (let t = 0; t < this.samplesPerFrame; t++) this.canvasCtx.lineTo(t, 16 - 16 * r[t]);
                this.canvasCtx.stroke();
                const i = new Float32Array(e);
                this.canvasCtx.beginPath(), this.canvasCtx.moveTo(0, 48);
                for (let t = 0; t < this.samplesPerFrame; t++) this.canvasCtx.lineTo(t, 48 - 16 * i[t]);
                this.canvasCtx.stroke()
            }
        }

        var Cr = r(535), Br = r(921), Ur = r(830), Ir = r(763), Tr = r(27);
        const Fr = document.currentScript.src;

        class Lr extends t {
            constructor(t, e) {
                super(), this.canvas = t, this.worker = new Worker(new URL("jsspeccy-worker.js", Fr)), this.keyboardHandler = new zr(this.worker), this.displayHandler = new a(this.canvas), this.audioHandler = new Sr, this.isRunning = !1, this.isInitiallyPaused = !e.autoStart, this.autoLoadTapes = e.autoLoadTapes || !1, this.tapeAutoLoadMode = e.tapeAutoLoadMode || "default", this.msPerFrame = 20, this.isExecutingFrame = !1, this.nextFrameTime = null, this.machineType = null, this.nextFileOpenID = 0, this.fileOpenPromiseResolutions = {}, this.worker.onmessage = t => {
                    switch (t.data.message) {
                        case"ready":
                            this.loadRoms().then((() => {
                                this.setMachine(e.machine || 128), e.openUrl ? this.openUrlList(e.openUrl).catch((t => {
                                    alert(t)
                                })).then((() => {
                                    e.autoStart && this.start()
                                })) : e.autoStart && this.start()
                            }));
                            break;
                        case"frameCompleted":
                            if ("audioBufferLeft" in t.data && this.audioHandler.frameCompleted(t.data.audioBufferLeft, t.data.audioBufferRight), this.displayHandler.frameCompleted(t.data.frameBuffer), this.isRunning) {
                                const t = performance.now();
                                t > this.nextFrameTime ? (this.runFrame(), this.nextFrameTime = t + this.msPerFrame) : this.isExecutingFrame = !1
                            } else this.isExecutingFrame = !1;
                            break;
                        case"fileOpened":
                            if ("tape" == t.data.mediaType && this.autoLoadTapes) {
                                const t = {
                                    48: {default: "tapeloaders/tape_48.szx", usr0: "tapeloaders/tape_48.szx"},
                                    128: {default: "tapeloaders/tape_128.szx", usr0: "tapeloaders/tape_128_usr0.szx"},
                                    5: {
                                        default: "tapeloaders/tape_pentagon.szx",
                                        usr0: "tapeloaders/tape_pentagon_usr0.szx"
                                    }
                                };
                                this.openUrl(new URL(t[this.machineType][this.tapeAutoLoadMode], Fr))
                            }
                            this.fileOpenPromiseResolutions[t.data.id]({mediaType: t.data.mediaType});
                            break;
                        default:
                            console.log("message received by host:", t.data)
                    }
                }, this.worker.postMessage({message: "loadCore", baseUrl: Fr})
            }

            start() {
                this.isRunning || (this.isRunning = !0, this.isInitiallyPaused = !1, this.nextFrameTime = performance.now(), this.keyboardHandler.start(), this.audioHandler.start(), this.emit("start"), window.requestAnimationFrame((t => {
                    this.runAnimationFrame(t)
                })))
            }

            pause() {
                this.isRunning && (this.isRunning = !1, this.keyboardHandler.stop(), this.audioHandler.stop(), this.emit("pause"))
            }

            async loadRom(t, e) {
                const r = await fetch(new URL(t, Fr)), i = new Uint8Array(await r.arrayBuffer());
                this.worker.postMessage({message: "loadMemory", data: i, page: e})
            }

            async loadRoms() {
                await this.loadRom("roms/128-0.rom", 8), await this.loadRom("roms/128-1.rom", 9), await this.loadRom("roms/48.rom", 10), await this.loadRom("roms/pentagon-0.rom", 12), await this.loadRom("roms/trdos.rom", 13)
            }

            runFrame() {
                this.isExecutingFrame = !0;
                const t = this.displayHandler.getNextFrameBuffer();
                if (this.audioHandler.isActive) {
                    const [e, r] = this.audioHandler.frameBuffers;
                    this.worker.postMessage({
                        message: "runFrame",
                        frameBuffer: t,
                        audioBufferLeft: e,
                        audioBufferRight: r
                    }, [t, e, r])
                } else this.worker.postMessage({message: "runFrame", frameBuffer: t}, [t])
            }

            runAnimationFrame(t) {
                this.displayHandler.readyToShow() && this.displayHandler.show(), this.isRunning && (t > this.nextFrameTime && !this.isExecutingFrame && (this.runFrame(), this.nextFrameTime += this.msPerFrame), window.requestAnimationFrame((t => {
                    this.runAnimationFrame(t)
                })))
            }

            setMachine(t) {
                128 != t && 5 != t && (t = 48), this.worker.postMessage({
                    message: "setMachineType",
                    type: t
                }), this.machineType = t, this.emit("setMachine", t)
            }

            reset() {
                this.worker.postMessage({message: "reset"})
            }

            loadSnapshot(t) {
                const e = this.nextFileOpenID++;
                return this.worker.postMessage({
                    message: "loadSnapshot",
                    id: e,
                    snapshot: t
                }), this.emit("setMachine", t.model), new Promise(((t, r) => {
                    this.fileOpenPromiseResolutions[e] = t
                }))
            }

            openTAPFile(t) {
                const e = this.nextFileOpenID++;
                return this.worker.postMessage({message: "openTAPFile", id: e, data: t}), new Promise(((t, r) => {
                    this.fileOpenPromiseResolutions[e] = t
                }))
            }

            openTZXFile(t) {
                const e = this.nextFileOpenID++;
                return this.worker.postMessage({message: "openTZXFile", id: e, data: t}), new Promise(((t, r) => {
                    this.fileOpenPromiseResolutions[e] = t
                }))
            }

            getFileOpener(t) {
                const e = t.toLowerCase();
                return e.endsWith(".z80") ? t => {
                    const e = function (t) {
                        const e = new DataView(t), r = e.getUint8(10), i = e.getUint8(12),
                            n = 127 & e.getUint8(11) | (1 & i) << 7, s = e.getUint8(29), a = {
                                registers: {
                                    AF: e.getUint16(0, !1),
                                    BC: e.getUint16(2, !0),
                                    HL: e.getUint16(4, !0),
                                    PC: e.getUint16(6, !0),
                                    SP: e.getUint16(8, !0),
                                    IR: r << 8 | n,
                                    DE: e.getUint16(13, !0),
                                    BC_: e.getUint16(15, !0),
                                    DE_: e.getUint16(17, !0),
                                    HL_: e.getUint16(19, !0),
                                    AF_: e.getUint16(21, !1),
                                    IY: e.getUint16(23, !0),
                                    IX: e.getUint16(25, !0),
                                    iff1: !!e.getUint8(27),
                                    iff2: !!e.getUint8(28),
                                    im: 3 & s
                                }, ulaState: {borderColour: (14 & i) >> 1}, memoryPages: {}
                            };
                        if (0 !== a.registers.PC) {
                            a.model = 48;
                            const e = kr(t, 30, 32 & i, 49152);
                            a.memoryPages[5] = new Uint8Array(e.buffer, 0, 16384), a.memoryPages[2] = new Uint8Array(e.buffer, 16384, 16384), a.memoryPages[0] = new Uint8Array(e.buffer, 32768, 16384), a.tstates = 0
                        } else {
                            const r = e.getUint16(30, !0), i = 23 == r;
                            a.registers.PC = e.getUint16(32, !0);
                            const n = e.getUint8(34), s = i ? n < 3 : n < 4;
                            a.model = s ? 48 : 128, s || (a.ulaState.pagingFlags = e.getUint8(35));
                            const o = (s ? 69888 : 70908) / 4;
                            a.tstates = ((e.getUint8(57) + 1) % 4 + 1) * o - (e.getUint16(55, !0) + 1), a.tstates >= 4 * o && (a.tstates = 0);
                            let l, h = 32 + r;
                            for (l = s ? {4: 2, 5: 0, 8: 5} : {
                                3: 0,
                                4: 1,
                                5: 2,
                                6: 3,
                                7: 4,
                                8: 5,
                                9: 6,
                                10: 7
                            }; h < t.byteLength;) {
                                let r = e.getUint16(h, !0), i = !0;
                                65535 == r && (r = 16384, i = !1);
                                const n = e.getUint8(h + 2);
                                if (n in l) {
                                    const e = l[n], r = kr(t, h + 3, i, 16384);
                                    a.memoryPages[e] = r
                                }
                                h += r + 3
                            }
                        }
                        return a
                    }(t);
                    return this.loadSnapshot(e)
                } : e.endsWith(".szx") ? t => {
                    const e = function (t) {
                        const e = new DataView(t), r = t.byteLength, i = {memoryPages: {}};
                        if ("ZXST" != xr(e, 0)) throw"Not a valid SZX file";
                        const n = e.getUint8(6);
                        switch (n) {
                            case 1:
                                i.model = 48;
                                break;
                            case 2:
                            case 3:
                                i.model = 128;
                                break;
                            case 7:
                                i.model = 5;
                                break;
                            default:
                                throw"Unsupported machine type: " + n
                        }
                        let s = 8;
                        for (; s < r;) {
                            const r = xr(e, s), n = e.getUint32(s + 4, !0);
                            switch (s += 8, r) {
                                case"Z80R":
                                    i.registers = {
                                        AF: e.getUint16(s + 0, !0),
                                        BC: e.getUint16(s + 2, !0),
                                        DE: e.getUint16(s + 4, !0),
                                        HL: e.getUint16(s + 6, !0),
                                        AF_: e.getUint16(s + 8, !0),
                                        BC_: e.getUint16(s + 10, !0),
                                        DE_: e.getUint16(s + 12, !0),
                                        HL_: e.getUint16(s + 14, !0),
                                        IX: e.getUint16(s + 16, !0),
                                        IY: e.getUint16(s + 18, !0),
                                        SP: e.getUint16(s + 20, !0),
                                        PC: e.getUint16(s + 22, !0),
                                        IR: e.getUint16(s + 24, !1),
                                        iff1: !!e.getUint8(s + 26),
                                        iff2: !!e.getUint8(s + 27),
                                        im: e.getUint8(s + 28)
                                    }, i.tstates = e.getUint32(s + 29, !0), i.halted = !!(2 & e.getUint8(s + 37));
                                    break;
                                case"SPCR":
                                    i.ulaState = {borderColour: e.getUint8(s + 0), pagingFlags: e.getUint8(s + 1)};
                                    break;
                                case"RAMP":
                                    const r = 1 & e.getUint16(s + 0, !0), a = e.getUint8(s + 2);
                                    if (r) {
                                        const e = new Uint8Array(t, s + 3, n - 3), r = yr.inflate(e);
                                        i.memoryPages[a] = r
                                    } else {
                                        const e = new Uint8Array(t, s + 3, 16384);
                                        i.memoryPages[a] = e
                                    }
                            }
                            s += n
                        }
                        return i
                    }(t);
                    return this.loadSnapshot(e)
                } : e.endsWith(".sna") ? t => {
                    const e = function (t) {
                        let e = !1, r = null;
                        const i = t.byteLength;
                        let n;
                        switch (i) {
                            case 131103:
                            case 147487:
                                e = !0;
                            case 49179:
                                if (n = new DataView(t, 0, e ? 49182 : i), r = {
                                    model: e ? 128 : 48,
                                    registers: {},
                                    ulaState: {},
                                    memoryPages: {5: new Uint8Array(t, 27, 16384), 2: new Uint8Array(t, 16411, 16384)},
                                    tstates: 0
                                }, e) {
                                    const e = 7 & n.getUint8(49181);
                                    r.memoryPages[e] = new Uint8Array(t, 32795, 16384);
                                    for (let e = 0, i = 49183; e < 8; e++) void 0 === r.memoryPages[e] && (r.memoryPages[e] = new Uint8Array(t, i, 16384), i += 16384)
                                } else r.memoryPages[0] = new Uint8Array(t, 32795, 16384);
                                if (r.registers.IR = n.getUint8(0) << 8 | n.getUint8(20), r.registers.HL_ = n.getUint16(1, !0), r.registers.DE_ = n.getUint16(3, !0), r.registers.BC_ = n.getUint16(5, !0), r.registers.AF_ = n.getUint16(7, !0), r.registers.HL = n.getUint16(9, !0), r.registers.DE = n.getUint16(11, !0), r.registers.BC = n.getUint16(13, !0), r.registers.IY = n.getUint16(15, !0), r.registers.IX = n.getUint16(17, !0), r.registers.iff1 = r.registers.iff2 = (4 & n.getUint8(19)) >> 2, r.registers.AF = n.getUint16(21, !0), e) r.registers.SP = n.getUint16(23, !0), r.registers.PC = n.getUint16(49179, !0), r.ulaState.pagingFlags = n.getUint8(49181); else {
                                    let t = n.getUint16(23, !0);
                                    const e = n.getUint8(t - 16384 + 27);
                                    t = t + 1 & 65535;
                                    const i = n.getUint8(t - 16384 + 27);
                                    t = t + 1 & 65535, r.registers.PC = i << 8 | e, r.registers.SP = t
                                }
                                r.registers.im = n.getUint8(25), r.ulaState.borderColour = n.getUint8(26);
                                break;
                            default:
                                throw"Cannot handle SNA snapshots of length " + i
                        }
                        return r
                    }(t);
                    return this.loadSnapshot(e)
                } : e.endsWith(".tap") ? t => {
                    if (class {
                        constructor(t) {
                            let e = 0;
                            this.blocks = [];
                            for (var r = new DataView(t); e + 1 < t.byteLength;) {
                                const i = r.getUint16(e, !0);
                                e += 2, this.blocks.push(new Uint8Array(t, e, i)), e += i
                            }
                            this.nextBlockIndex = 0
                        }

                        getNextLoadableBlock() {
                            if (0 === this.blocks.length) return null;
                            const t = this.blocks[this.nextBlockIndex];
                            return this.nextBlockIndex = (this.nextBlockIndex + 1) % this.blocks.length, t
                        }

                        static isValid(t) {
                            let e = 0;
                            const r = new DataView(t);
                            for (; e < t.byteLength;) {
                                if (e + 1 >= t.byteLength) return !1;
                                e += r.getUint16(e, !0) + 2
                            }
                            return e == t.byteLength
                        }
                    }.isValid(t)) return this.openTAPFile(t);
                    alert("Invalid TAP file")
                } : e.endsWith(".tzx") ? t => {
                    if (class {
                        static isValid(t) {
                            const e = new DataView(t), r = "ZXTape!";
                            for (let t = 0; t < r.length; t++) if (r.charCodeAt(t) != e.getUint8(t)) return !1;
                            return !0
                        }

                        constructor(t) {
                            this.blocks = [];
                            const e = new DataView(t);
                            let r = 10;
                            for (; r < t.byteLength;) {
                                const i = e.getUint8(r);
                                switch (r++, i) {
                                    case 16:
                                        (() => {
                                            const i = e.getUint16(r, !0);
                                            r += 2;
                                            const n = e.getUint16(r, !0);
                                            r += 2, this.blocks.push({
                                                type: "StandardSpeedData",
                                                pause: i,
                                                data: new Uint8Array(t, r, n)
                                            }), r += n
                                        })();
                                        break;
                                    case 17:
                                        (() => {
                                            const i = e.getUint16(r, !0);
                                            r += 2;
                                            const n = e.getUint16(r, !0);
                                            r += 2;
                                            const s = e.getUint16(r, !0);
                                            r += 2;
                                            const a = e.getUint16(r, !0);
                                            r += 2;
                                            const o = e.getUint16(r, !0);
                                            r += 2;
                                            const l = e.getUint16(r, !0);
                                            r += 2;
                                            const h = e.getUint8(r);
                                            r += 1;
                                            const u = e.getUint16(r, !0);
                                            r += 2;
                                            const d = e.getUint16(r, !0) | e.getUint8(r + 2) << 16;
                                            r += 3, this.blocks.push({
                                                type: "TurboSpeedData",
                                                pilotPulseLength: i,
                                                syncPulse1Length: n,
                                                syncPulse2Length: s,
                                                zeroBitLength: a,
                                                oneBitLength: o,
                                                pilotPulseCount: l,
                                                lastByteMask: h,
                                                pause: u,
                                                data: new Uint8Array(t, r, d)
                                            }), r += d
                                        })();
                                        break;
                                    case 18:
                                        (() => {
                                            const t = e.getUint16(r, !0);
                                            r += 2;
                                            const i = e.getUint16(r, !0);
                                            r += 2, this.blocks.push({type: "PureTone", pulseLength: t, pulseCount: i})
                                        })();
                                        break;
                                    case 19:
                                        (() => {
                                            const i = e.getUint8(r);
                                            r += 1, this.blocks.push({
                                                type: "PulseSequence",
                                                pulseLengths: new Uint16Array(t, r, i)
                                            }), r += 2 * i
                                        })();
                                        break;
                                    case 20:
                                        (() => {
                                            const i = e.getUint16(r, !0);
                                            r += 2;
                                            const n = e.getUint16(r, !0);
                                            r += 2;
                                            const s = e.getUint8(r);
                                            r += 1;
                                            const a = e.getUint16(r, !0);
                                            r += 2;
                                            const o = e.getUint16(r, !0) | e.getUint8(r + 2) << 16;
                                            r += 3, this.blocks.push({
                                                type: "PureData",
                                                zeroBitLength: i,
                                                oneBitLength: n,
                                                lastByteMask: s,
                                                pause: a,
                                                data: new Uint8Array(t, r, o)
                                            }), r += o
                                        })();
                                        break;
                                    case 21:
                                        (() => {
                                            const i = e.getUint16(r, !0);
                                            r += 2;
                                            const n = e.getUint16(r, !0);
                                            r += 2;
                                            const s = e.getUint8(r);
                                            r += 1;
                                            const a = e.getUint16(r, !0) | e.getUint8(r + 2) << 16;
                                            r += 3, this.blocks.push({
                                                type: "DirectRecording",
                                                tstatesPerSample: i,
                                                lastByteMask: s,
                                                pause: n,
                                                data: new Uint8Array(t, r, a)
                                            }), r += a
                                        })();
                                        break;
                                    case 32:
                                        (() => {
                                            const t = e.getUint16(r, !0);
                                            r += 2, this.blocks.push({type: "Pause", pause: t})
                                        })();
                                        break;
                                    case 33:
                                        (() => {
                                            const i = e.getUint8(r);
                                            r += 1;
                                            const n = new Uint8Array(t, r, i);
                                            r += i;
                                            const s = String.fromCharCode.apply(null, n);
                                            this.blocks.push({type: "GroupStart", name: s})
                                        })();
                                        break;
                                    case 34:
                                        (() => {
                                            this.blocks.push({type: "GroupEnd"})
                                        })();
                                        break;
                                    case 35:
                                        (() => {
                                            const t = e.getUint16(r, !0);
                                            r += 2, this.blocks.push({type: "JumpToBlock", offset: t})
                                        })();
                                        break;
                                    case 36:
                                        (() => {
                                            const t = e.getUint16(r, !0);
                                            r += 2, this.blocks.push({type: "LoopStart", repeatCount: t})
                                        })();
                                        break;
                                    case 37:
                                        (() => {
                                            this.blocks.push({type: "LoopEnd"})
                                        })();
                                        break;
                                    case 38:
                                        (() => {
                                            const i = e.getUint16(r, !0);
                                            r += 2, this.blocks.push({
                                                type: "CallSequence",
                                                offsets: new Uint16Array(t, r, i)
                                            }), r += 2 * i
                                        })();
                                        break;
                                    case 39:
                                        (() => {
                                            this.blocks.push({type: "ReturnFromSequence"})
                                        })();
                                        break;
                                    case 40:
                                        (() => {
                                            const i = e.getUint16(r, !0);
                                            r += 2, this.blocks.push({
                                                type: "Select",
                                                data: new Uint8Array(t, r, i)
                                            }), r += i
                                        })();
                                        break;
                                    case 48:
                                        (() => {
                                            const i = e.getUint8(r);
                                            r += 1;
                                            const n = new Uint8Array(t, r, i);
                                            r += i;
                                            const s = String.fromCharCode.apply(null, n);
                                            this.blocks.push({type: "TextDescription", text: s})
                                        })();
                                        break;
                                    case 49:
                                        (() => {
                                            const i = e.getUint8(r);
                                            r += 1;
                                            const n = e.getUint8(r);
                                            r += 1;
                                            const s = new Uint8Array(t, r, n);
                                            r += n;
                                            const a = String.fromCharCode.apply(null, s);
                                            this.blocks.push({type: "MessageBlock", displayTime: i, text: a})
                                        })();
                                        break;
                                    case 50:
                                        (() => {
                                            const i = e.getUint16(r, !0);
                                            r += 2, this.blocks.push({
                                                type: "ArchiveInfo",
                                                data: new Uint8Array(t, r, i)
                                            }), r += i
                                        })();
                                        break;
                                    case 51:
                                        (() => {
                                            const i = 3 * e.getUint8(r);
                                            r += 1, this.blocks.push({
                                                type: "HardwareType",
                                                data: new Uint8Array(t, r, i)
                                            }), r += i
                                        })();
                                        break;
                                    case 53:
                                        (() => {
                                            const i = new Uint8Array(t, r, 10);
                                            r += 10;
                                            const n = String.fromCharCode.apply(null, i), s = e.getUint32(r, !0);
                                            this.blocks.push({
                                                type: "CustomInfo",
                                                identifier: n,
                                                data: new Uint8Array(t, r, s)
                                            }), r += s
                                        })();
                                        break;
                                    case 90:
                                        (() => {
                                            r += 9, this.blocks.push({type: "Glue"})
                                        })();
                                        break;
                                    default:
                                        (() => {
                                            const i = e.getUint32(r, !0);
                                            r += 4, this.blocks.push({
                                                type: "unknown",
                                                data: new Uint8Array(t, r, i)
                                            }), r += i
                                        })()
                                }
                            }
                            this.nextBlockIndex = 0, this.loopToBlockIndex, this.repeatCount, this.callStack = []
                        }

                        getNextMeaningfulBlock() {
                            let t = 0 === this.nextBlockIndex;
                            for (; ;) {
                                if (this.nextBlockIndex >= this.blocks.length) {
                                    if (t) return null;
                                    this.nextBlockIndex = 0, t = !0
                                }
                                var e = this.blocks[this.nextBlockIndex];
                                switch (e.type) {
                                    case"StandardSpeedData":
                                    case"TurboSpeedData":
                                    case"PureTone":
                                    case"PulseSequence":
                                    case"PureData":
                                    case"DirectRecording":
                                    case"Pause":
                                        return this.nextBlockIndex++, e;
                                    case"JumpToBlock":
                                        this.nextBlockIndex += e.offset;
                                        break;
                                    case"LoopStart":
                                        this.loopToBlockIndex = this.nextBlockIndex + 1, this.repeatCount = e.repeatCount, this.nextBlockIndex++;
                                        break;
                                    case"LoopEnd":
                                        this.repeatCount--, this.repeatCount > 0 ? this.nextBlockIndex = this.loopToBlockIndex : this.nextBlockIndex++;
                                        break;
                                    case"CallSequence":
                                        this.callStack.unshift(this.nextBlockIndex + 1);
                                        for (var r = e.offsets.length - 1; r >= 0; r--) this.callStack.unshift(this.nextBlockIndex + e.offsets[r]);
                                        this.nextBlockIndex = this.callStack.shift();
                                        break;
                                    case"ReturnFromSequence":
                                        this.nextBlockIndex = this.callStack.shift();
                                        break;
                                    default:
                                        this.nextBlockIndex++
                                }
                            }
                        }

                        getNextLoadableBlock() {
                            for (; ;) {
                                var t = this.getNextMeaningfulBlock();
                                if (!t) return null;
                                if ("StandardSpeedData" == t.type || "TurboSpeedData" == t.type) return t.data
                            }
                        }
                    }.isValid(t)) return this.openTZXFile(t);
                    alert("Invalid TZX file")
                } : e.endsWith(".zip") ? async e => {
                    const r = await i.loadAsync(e), n = [];
                    if (r.forEach(((t, e) => {
                        if (t.startsWith("__MACOSX/")) return;
                        const r = this.getFileOpener(t);
                        if (r) {
                            const t = async () => {
                                const t = await e.async("arraybuffer");
                                return r(t)
                            };
                            n.push(t)
                        }
                    })), 1 == n.length) return n[0]();
                    throw 0 == n.length ? "No loadable files found inside ZIP file: " + t : "Multiple loadable files found inside ZIP file: " + t
                } : void 0
            }

            async openFile(t) {
                const e = this.getFileOpener(t.name);
                if (e) return e(await t.arrayBuffer()).catch((t => {
                    alert(t)
                }));
                throw"Unrecognised file type: " + t.name
            }

            async openUrl(t) {
                const e = this.getFileOpener(t.toString());
                if (e) {
                    const r = await fetch(t);
                    return e(await r.arrayBuffer())
                }
                throw"Unrecognised file type: " + t.split("/").pop()
            }

            async openUrlList(t) {
                if ("string" == typeof t) return await this.openUrl(t);
                for (const e of t) await this.openUrl(e)
            }

            setAutoLoadTapes(t) {
                this.autoLoadTapes = t, this.emit("setAutoLoadTapes", t)
            }

            exit() {
                this.pause(), this.worker.terminate()
            }
        }

        window.JSSpeccy = (t, r) => {
            r = r || {};
            const i = document.createElement("canvas");
            i.width = 320, i.height = 240;
            const n = new Lr(i, {
                machine: r.machine || 128,
                autoStart: r.autoStart || !1,
                autoLoadTapes: r.autoLoadTapes || !1,
                tapeAutoLoadMode: r.tapeAutoLoadMode || "default",
                openUrl: r.openUrl
            }), s = new f(t, n, {zoom: r.zoom || 1, sandbox: r.sandbox});
            if (!r.sandbox) {
                const t = s.menuBar.addMenu("File");
                t.addItem("Open...", (() => {
                    w()
                }));
                const e = t.addItem("Auto-load tapes", (() => {
                    n.setAutoLoadTapes(!n.autoLoadTapes)
                })), r = () => {
                    n.autoLoadTapes ? e.setCheckbox() : e.unsetCheckbox()
                };
                n.on("setAutoLoadTapes", r), r(), t.addItem("Find games...", (() => {
                    b()
                }))
            }
            const a = s.menuBar.addMenu("Machine"), l = a.addItem("Spectrum 48K", (() => {
                n.setMachine(48)
            })), h = a.addItem("Spectrum 128K", (() => {
                n.setMachine(128)
            })), u = a.addItem("Pentagon 128", (() => {
                n.setMachine(5)
            })), d = s.menuBar.addMenu("Display"), c = {
                1: d.addItem("100%", (() => s.setZoom(1))),
                2: d.addItem("200%", (() => s.setZoom(2))),
                3: d.addItem("300%", (() => s.setZoom(3)))
            }, p = d.addItem("Fullscreen", (() => {
                s.enterFullscreen()
            })), m = t => {
                if ("fullscreen" == t) {
                    p.setBullet();
                    for (let t in c) c[t].unsetBullet()
                } else {
                    p.unsetBullet();
                    for (let e in c) parseInt(e) == t ? c[e].setBullet() : c[e].unsetBullet()
                }
            };
            s.on("setZoom", m), m(s.zoom), n.on("setMachine", (t => {
                48 == t ? (l.setBullet(), h.unsetBullet(), u.unsetBullet()) : 128 == t ? (l.unsetBullet(), h.setBullet(), u.unsetBullet()) : (l.unsetBullet(), h.unsetBullet(), u.setBullet())
            })), r.sandbox || s.toolbar.addButton(Cr, {label: "Open file"}, (() => {
                w()
            })), s.toolbar.addButton(Br, {label: "Reset"}, (() => {
                n.reset()
            }));
            const _ = s.toolbar.addButton(o, {label: "Unpause"}, (() => {
                n.isRunning ? n.pause() : n.start()
            }));
            n.on("pause", (() => {
                _.setIcon(o), _.setLabel("Unpause")
            })), n.on("start", (() => {
                _.setIcon(Ur), _.setLabel("Pause")
            }));
            const g = s.toolbar.addButton(Ir, {label: "Enter full screen mode", align: "right"}, (() => {
                s.toggleFullscreen()
            }));
            s.on("setZoom", (t => {
                "fullscreen" == t ? (g.setIcon(Tr), g.setLabel("Exit full screen mode")) : (g.setIcon(Ir), g.setLabel("Enter full screen mode"))
            }));
            const w = () => {
                e().then((t => {
                    const e = t[0];
                    n.openFile(e).then((() => {
                        n.isInitiallyPaused && n.start()
                    })).catch((t => {
                        alert(t)
                    }))
                }))
            }, b = () => {
                n.pause();
                const t = s.showDialog();
                t.innerHTML = '\n            <label>Find games</label>\n            <form>\n                <input type="search">\n                <button type="submit">Search</button>\n            </form>\n            <div class="results">\n            </div>\n        ';
                const e = t.querySelector("input"), r = t.querySelector("button"), i = t.querySelector("form"),
                    a = t.querySelector(".results");
                i.addEventListener("submit", (t => {
                    t.preventDefault(), r.innerText = "Searching...";
                    const i = (t, e) => encodeURIComponent(t) + "=" + encodeURIComponent(e),
                        o = "https://archive.org/advancedsearch.php?" + i("q", 'collection:softwarelibrary_zx_spectrum title:"' + e.value.replace(/[^\w\s\-\']/, "") + '"') + "&" + i("fl[]", "creator") + "&" + i("fl[]", "identifier") + "&" + i("fl[]", "title") + "&" + i("rows", "50") + "&" + i("page", "1") + "&" + i("output", "json");
                    fetch(o).then((t => (r.innerText = "Search", t.json()))).then((t => {
                        a.innerHTML = '<ul></ul><p>- powered by <a href="https://archive.org/">Internet Archive</a></p>';
                        const e = a.querySelector("ul");
                        t.response.docs.forEach((t => {
                            const r = document.createElement("li");
                            e.appendChild(r);
                            const i = document.createElement("a");
                            i.href = "#", i.innerText = t.title;
                            const a = document.createTextNode(" - " + t.creator);
                            r.appendChild(i), r.appendChild(a), i.addEventListener("click", (e => {
                                e.preventDefault(), fetch("https://archive.org/metadata/" + t.identifier).then((t => t.json())).then((e => {
                                    let r = null;
                                    if (e.files.forEach((t => {
                                        const e = t.name.split(".").pop().toLowerCase();
                                        "z80" != e && "sna" != e && "tap" != e && "tzx" != e && "szx" != e || (r = t.name)
                                    })), r) {
                                        const e = "https://cors.archive.org/cors/" + t.identifier + "/" + r;
                                        n.openUrl(e).catch((t => {
                                            alert(t)
                                        })).then((() => {
                                            s.hideDialog(), n.start()
                                        }))
                                    } else alert("No loadable file found")
                                }))
                            }))
                        }))
                    }))
                })), e.focus()
            };
            return {
                setZoom: t => {
                    s.setZoom(t)
                }, toggleFullscreen: () => {
                    s.toggleFullscreen()
                }, enterFullscreen: () => {
                    s.enterFullscreen()
                }, exitFullscreen: () => {
                    s.exitFullscreen()
                }, setMachine: t => {
                    n.setMachine(t)
                }, openFileDialog: () => {
                    w()
                }, openUrl: t => {
                    n.openUrl(t).catch((t => {
                        alert(t)
                    }))
                }, exit: () => {
                    n.exit(), s.unload()
                }
            }
        }
    })()
})();