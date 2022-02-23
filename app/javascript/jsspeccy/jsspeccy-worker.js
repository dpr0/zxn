(() => {
    "use strict";

    class e {
        constructor(e) {
            let t = 0;
            this.blocks = [];
            for (var s = new DataView(e); t + 1 < e.byteLength;) {
                const a = s.getUint16(t, !0);
                t += 2, this.blocks.push(new Uint8Array(e, t, a)), t += a
            }
            this.nextBlockIndex = 0
        }

        getNextLoadableBlock() {
            if (0 === this.blocks.length) return null;
            const e = this.blocks[this.nextBlockIndex];
            return this.nextBlockIndex = (this.nextBlockIndex + 1) % this.blocks.length, e
        }

        static isValid(e) {
            let t = 0;
            const s = new DataView(e);
            for (; t < e.byteLength;) {
                if (t + 1 >= e.byteLength) return !1;
                t += s.getUint16(t, !0) + 2
            }
            return t == e.byteLength
        }
    }

    class t {
        static isValid(e) {
            const t = new DataView(e), s = "ZXTape!";
            for (let e = 0; e < s.length; e++) if (s.charCodeAt(e) != t.getUint8(e)) return !1;
            return !0
        }

        constructor(e) {
            this.blocks = [];
            const t = new DataView(e);
            let s = 10;
            for (; s < e.byteLength;) {
                const a = t.getUint8(s);
                switch (s++, a) {
                    case 16:
                        (() => {
                            const a = t.getUint16(s, !0);
                            s += 2;
                            const n = t.getUint16(s, !0);
                            s += 2, this.blocks.push({
                                type: "StandardSpeedData",
                                pause: a,
                                data: new Uint8Array(e, s, n)
                            }), s += n
                        })();
                        break;
                    case 17:
                        (() => {
                            const a = t.getUint16(s, !0);
                            s += 2;
                            const n = t.getUint16(s, !0);
                            s += 2;
                            const o = t.getUint16(s, !0);
                            s += 2;
                            const r = t.getUint16(s, !0);
                            s += 2;
                            const i = t.getUint16(s, !0);
                            s += 2;
                            const c = t.getUint16(s, !0);
                            s += 2;
                            const l = t.getUint8(s);
                            s += 1;
                            const u = t.getUint16(s, !0);
                            s += 2;
                            const h = t.getUint16(s, !0) | t.getUint8(s + 2) << 16;
                            s += 3, this.blocks.push({
                                type: "TurboSpeedData",
                                pilotPulseLength: a,
                                syncPulse1Length: n,
                                syncPulse2Length: o,
                                zeroBitLength: r,
                                oneBitLength: i,
                                pilotPulseCount: c,
                                lastByteMask: l,
                                pause: u,
                                data: new Uint8Array(e, s, h)
                            }), s += h
                        })();
                        break;
                    case 18:
                        (() => {
                            const e = t.getUint16(s, !0);
                            s += 2;
                            const a = t.getUint16(s, !0);
                            s += 2, this.blocks.push({type: "PureTone", pulseLength: e, pulseCount: a})
                        })();
                        break;
                    case 19:
                        (() => {
                            const a = t.getUint8(s);
                            s += 1, this.blocks.push({
                                type: "PulseSequence",
                                pulseLengths: new Uint16Array(e, s, a)
                            }), s += 2 * a
                        })();
                        break;
                    case 20:
                        (() => {
                            const a = t.getUint16(s, !0);
                            s += 2;
                            const n = t.getUint16(s, !0);
                            s += 2;
                            const o = t.getUint8(s);
                            s += 1;
                            const r = t.getUint16(s, !0);
                            s += 2;
                            const i = t.getUint16(s, !0) | t.getUint8(s + 2) << 16;
                            s += 3, this.blocks.push({
                                type: "PureData",
                                zeroBitLength: a,
                                oneBitLength: n,
                                lastByteMask: o,
                                pause: r,
                                data: new Uint8Array(e, s, i)
                            }), s += i
                        })();
                        break;
                    case 21:
                        (() => {
                            const a = t.getUint16(s, !0);
                            s += 2;
                            const n = t.getUint16(s, !0);
                            s += 2;
                            const o = t.getUint8(s);
                            s += 1;
                            const r = t.getUint16(s, !0) | t.getUint8(s + 2) << 16;
                            s += 3, this.blocks.push({
                                type: "DirectRecording",
                                tstatesPerSample: a,
                                lastByteMask: o,
                                pause: n,
                                data: new Uint8Array(e, s, r)
                            }), s += r
                        })();
                        break;
                    case 32:
                        (() => {
                            const e = t.getUint16(s, !0);
                            s += 2, this.blocks.push({type: "Pause", pause: e})
                        })();
                        break;
                    case 33:
                        (() => {
                            const a = t.getUint8(s);
                            s += 1;
                            const n = new Uint8Array(e, s, a);
                            s += a;
                            const o = String.fromCharCode.apply(null, n);
                            this.blocks.push({type: "GroupStart", name: o})
                        })();
                        break;
                    case 34:
                        (() => {
                            this.blocks.push({type: "GroupEnd"})
                        })();
                        break;
                    case 35:
                        (() => {
                            const e = t.getUint16(s, !0);
                            s += 2, this.blocks.push({type: "JumpToBlock", offset: e})
                        })();
                        break;
                    case 36:
                        (() => {
                            const e = t.getUint16(s, !0);
                            s += 2, this.blocks.push({type: "LoopStart", repeatCount: e})
                        })();
                        break;
                    case 37:
                        (() => {
                            this.blocks.push({type: "LoopEnd"})
                        })();
                        break;
                    case 38:
                        (() => {
                            const a = t.getUint16(s, !0);
                            s += 2, this.blocks.push({
                                type: "CallSequence",
                                offsets: new Uint16Array(e, s, a)
                            }), s += 2 * a
                        })();
                        break;
                    case 39:
                        (() => {
                            this.blocks.push({type: "ReturnFromSequence"})
                        })();
                        break;
                    case 40:
                        (() => {
                            const a = t.getUint16(s, !0);
                            s += 2, this.blocks.push({type: "Select", data: new Uint8Array(e, s, a)}), s += a
                        })();
                        break;
                    case 48:
                        (() => {
                            const a = t.getUint8(s);
                            s += 1;
                            const n = new Uint8Array(e, s, a);
                            s += a;
                            const o = String.fromCharCode.apply(null, n);
                            this.blocks.push({type: "TextDescription", text: o})
                        })();
                        break;
                    case 49:
                        (() => {
                            const a = t.getUint8(s);
                            s += 1;
                            const n = t.getUint8(s);
                            s += 1;
                            const o = new Uint8Array(e, s, n);
                            s += n;
                            const r = String.fromCharCode.apply(null, o);
                            this.blocks.push({type: "MessageBlock", displayTime: a, text: r})
                        })();
                        break;
                    case 50:
                        (() => {
                            const a = t.getUint16(s, !0);
                            s += 2, this.blocks.push({type: "ArchiveInfo", data: new Uint8Array(e, s, a)}), s += a
                        })();
                        break;
                    case 51:
                        (() => {
                            const a = 3 * t.getUint8(s);
                            s += 1, this.blocks.push({type: "HardwareType", data: new Uint8Array(e, s, a)}), s += a
                        })();
                        break;
                    case 53:
                        (() => {
                            const a = new Uint8Array(e, s, 10);
                            s += 10;
                            const n = String.fromCharCode.apply(null, a), o = t.getUint32(s, !0);
                            this.blocks.push({type: "CustomInfo", identifier: n, data: new Uint8Array(e, s, o)}), s += o
                        })();
                        break;
                    case 90:
                        (() => {
                            s += 9, this.blocks.push({type: "Glue"})
                        })();
                        break;
                    default:
                        (() => {
                            const a = t.getUint32(s, !0);
                            s += 4, this.blocks.push({type: "unknown", data: new Uint8Array(e, s, a)}), s += a
                        })()
                }
            }
            this.nextBlockIndex = 0, this.loopToBlockIndex, this.repeatCount, this.callStack = []
        }

        getNextMeaningfulBlock() {
            let e = 0 === this.nextBlockIndex;
            for (; ;) {
                if (this.nextBlockIndex >= this.blocks.length) {
                    if (e) return null;
                    this.nextBlockIndex = 0, e = !0
                }
                var t = this.blocks[this.nextBlockIndex];
                switch (t.type) {
                    case"StandardSpeedData":
                    case"TurboSpeedData":
                    case"PureTone":
                    case"PulseSequence":
                    case"PureData":
                    case"DirectRecording":
                    case"Pause":
                        return this.nextBlockIndex++, t;
                    case"JumpToBlock":
                        this.nextBlockIndex += t.offset;
                        break;
                    case"LoopStart":
                        this.loopToBlockIndex = this.nextBlockIndex + 1, this.repeatCount = t.repeatCount, this.nextBlockIndex++;
                        break;
                    case"LoopEnd":
                        this.repeatCount--, this.repeatCount > 0 ? this.nextBlockIndex = this.loopToBlockIndex : this.nextBlockIndex++;
                        break;
                    case"CallSequence":
                        this.callStack.unshift(this.nextBlockIndex + 1);
                        for (var s = t.offsets.length - 1; s >= 0; s--) this.callStack.unshift(this.nextBlockIndex + t.offsets[s]);
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
                var e = this.getNextMeaningfulBlock();
                if (!e) return null;
                if ("StandardSpeedData" == e.type || "TurboSpeedData" == e.type) return e.data
            }
        }
    }

    let s = null, a = null, n = null, o = null, r = null, i = !1, c = null;
    const l = (e, t) => {
        n.set(t, s.MACHINE_MEMORY + 16384 * e)
    }, u = () => {
        if (!c) return;
        const e = c.getNextLoadableBlock();
        if (!e) return;
        const t = r[4], a = t >> 8, n = 1 & t;
        let o = r[8];
        const i = r[2], l = e[0];
        let u = !0;
        if (a != l) u = !1; else if (n) {
            let t = 1, a = 0, n = l;
            for (; a < i;) {
                if (t >= e.length) {
                    u = !1;
                    break
                }
                const r = e[t++];
                a++, s.poke(o, r), o = o + 1 & 65535, n ^= r
            }
            u &= t < e.length, u && (u = n === e[t])
        } else u = !0;
        u ? r[0] |= 1 : r[0] &= 65534, s.setPC(1506)
    };
    onmessage = h => {
        switch (h.data.message) {
            case"loadCore":
                p = h.data.baseUrl, WebAssembly.instantiateStreaming(fetch(new URL("jsspeccy-core.wasm", p), {})).then((e => {
                    s = e.instance.exports, a = s.memory, n = new Uint8Array(a.buffer), o = n.subarray(s.FRAME_BUFFER, 26112), r = new Uint16Array(s.memory.buffer, s.REGISTERS, 12), postMessage({message: "ready"})
                }));
                break;
            case"runFrame":
                if (i) return;
                const d = h.data.frameBuffer, k = new Uint8Array(d);
                let g = null, f = null, b = 0;
                "audioBufferLeft" in h.data ? (g = h.data.audioBufferLeft, f = h.data.audioBufferRight, b = g.byteLength / 4, s.setAudioSamplesPerFrame(b)) : s.setAudioSamplesPerFrame(0);
                let y = s.runFrame();
                for (; y;) {
                    switch (y) {
                        case 1:
                            throw i = !0, "Unrecognised opcode!";
                        case 2:
                            u();
                            break;
                        default:
                            throw i = !0, "runFrame returned unexpected result: " + y
                    }
                    y = s.resumeFrame()
                }
                if (k.set(o), b) {
                    const e = new Float32Array(s.memory.buffer, s.AUDIO_BUFFER_LEFT, b),
                        t = new Float32Array(s.memory.buffer, s.AUDIO_BUFFER_RIGHT, b), a = new Float32Array(g),
                        n = new Float32Array(f);
                    a.set(e), n.set(t), postMessage({
                        message: "frameCompleted",
                        frameBuffer: d,
                        audioBufferLeft: g,
                        audioBufferRight: f
                    }, [d, g, f])
                } else postMessage({message: "frameCompleted", frameBuffer: d}, [d]);
                break;
            case"keyDown":
                s.keyDown(h.data.row, h.data.mask);
                break;
            case"keyUp":
                s.keyUp(h.data.row, h.data.mask);
                break;
            case"setMachineType":
                s.setMachineType(h.data.type);
                break;
            case"reset":
                s.reset();
                break;
            case"loadMemory":
                l(h.data.page, h.data.data);
                break;
            case"loadSnapshot":
                (e => {
                    s.setMachineType(e.model);
                    for (let t in e.memoryPages) l(t, e.memoryPages[t]);
                    ["AF", "BC", "DE", "HL", "AF_", "BC_", "DE_", "HL_", "IX", "IY", "SP", "IR"].forEach(((t, s) => {
                        r[s] = e.registers[t]
                    })), s.setPC(e.registers.PC), s.setIFF1(e.registers.iff1), s.setIFF2(e.registers.iff2), s.setIM(e.registers.im), s.setHalted(!!e.halted), s.writePort(254, e.ulaState.borderColour), 48 != e.model && s.writePort(32765, e.ulaState.pagingFlags), s.setTStates(e.tstates)
                })(h.data.snapshot), postMessage({message: "fileOpened", id: h.data.id, mediaType: "snapshot"});
                break;
            case"openTAPFile":
                c = new e(h.data.data), postMessage({message: "fileOpened", id: h.data.id, mediaType: "tape"});
                break;
            case"openTZXFile":
                c = new t(h.data.data), postMessage({message: "fileOpened", id: h.data.id, mediaType: "tape"});
                break;
            default:
                console.log("message received by worker:", h.data)
        }
        var p
    }
})();