"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4836], {
        439: (e, t, n) => {
            n.d(t, {
                Z: () => o
            });
            var a = n(12115),
                r = n(1639);

            function o(e) {
                let {
                    maxUploadBatch: t = 10,
                    galleryImages: n = [],
                    onGalleryUpdate: o,
                    isEnabled: i = !0
                } = e, [l, s] = (0, a.useState)(!1), [c, m] = (0, a.useState)(null), [d, h] = (0, a.useState)(!1), u = (0, a.useCallback)(async () => {
                    if (i) try {
                        let e = await r.a5.createImageFileInput("image/*", !0);
                        if (!e || 0 === e.length) return;
                        let a = Array.from(e),
                            i = r.a5.validateFiles(a);
                        if (i.invalid.length > 0) {
                            let e = i.invalid.map(e => {
                                let {
                                    file: t,
                                    reason: n
                                } = e;
                                return "• ".concat(t.name, ": ").concat(n)
                            }).join("\n");
                            if (0 === i.valid.length) return void alert("Kh\xf4ng c\xf3 file hợp lệ để tải l\xean:\n\n".concat(e));
                            let t = "".concat(i.invalid.length, " file kh\xf4ng hợp lệ sẽ bị bỏ qua:\n\n").concat(e, "\n\nTiếp tục tải l\xean ").concat(i.valid.length, " file hợp lệ?");
                            if (!confirm(t)) return
                        }
                        let l = i.valid;
                        if (l.length > t) return void alert("Bạn chỉ c\xf3 thể tải l\xean tối đa ".concat(t, " ảnh c\xf9ng l\xfac. Bạn đ\xe3 chọn ").concat(l.length, " ảnh hợp lệ. Vui l\xf2ng chọn \xedt ảnh hơn."));
                        s(!0), m(null);
                        let c = await r.a5.uploadMultipleImages(l, e => {
                            m({
                                message: e.message,
                                progress: e.progress
                            })
                        });
                        if (c.successful.length > 0) {
                            let e = c.successful.map(e => e.url),
                                t = [...n, ...e];
                            o(t), h(!0), setTimeout(() => h(!1), 2e3)
                        }
                        if (c.failed.length > 0) {
                            let e = c.failed.map(e => {
                                let {
                                    filename: t,
                                    error: n
                                } = e;
                                return "• ".concat(t, ": ").concat(n)
                            }).join("\n");
                            alert("Tải l\xean ho\xe0n th\xe0nh:\n" + "✅ Th\xe0nh c\xf4ng: ".concat(c.successful.length, "\n") + "❌ Thất bại: ".concat(c.failed.length, "\n\n") + "C\xe1c file thất bại:\n".concat(e))
                        }
                    } catch (e) {
                        console.error("Gallery upload error:", e), alert("C\xf3 lỗi xảy ra khi tải ảnh l\xean. Vui l\xf2ng thử lại.")
                    } finally {
                        s(!1), m(null)
                    }
                }, [i, t, n, o]);
                return {
                    isUploading: l,
                    uploadProgress: c,
                    uploadSuccess: d,
                    handleGalleryUpload: u
                }
            }
        },
        1639: (e, t, n) => {
            n.d(t, {
                a5: () => m,
                q2: () => c,
                E5: () => s
            });
            var a = n(79323),
                r = n(23843),
                o = n(31802);
            let i = {
                AVATAR: {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 800,
                    quality: .8,
                    useWebWorker: !0
                },
                GALLERY: {
                    maxSizeMB: 2.5,
                    maxWidthOrHeight: 2400,
                    quality: .85,
                    useWebWorker: !0
                }
            };
            async function l(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.GALLERY,
                    n = arguments.length > 2 ? arguments[2] : void 0;
                try {
                    let a = e.size / 1024 / 1024,
                        r = {
                            ...t,
                            onProgress: e => {
                                null == n || n(e)
                            }
                        },
                        i = await (0, o.A)(e, r),
                        l = new File([i], e.name.replace(/\.[^.]+$/, ".jpg"), {
                            type: "image/jpeg",
                            lastModified: Date.now()
                        }),
                        s = l.size / 1024 / 1024;
                    return ((1 - s / a) * 100).toFixed(1), l
                } catch (t) {
                    return console.error("❌ Image compression failed:", t), console.warn("⚠️ Using original file without compression"), e
                }
            }
            let s = e => {
                    let t = e.type.toLowerCase(),
                        n = e.name.toLowerCase();
                    return t.includes("heic") || t.includes("heif") || n.endsWith(".heic") || n.endsWith(".heif")
                },
                c = async e => {
                    let t = (await n.e(2e3).then(n.t.bind(n, 17977, 23))).default,
                        a = await t({
                            blob: e,
                            toType: "image/jpeg",
                            quality: .9
                        });
                    return new File([Array.isArray(a) ? a[0] : a], e.name.replace(/\.heic$/i, ".jpg").replace(/\.heif$/i, ".jpg"), {
                        type: "image/jpeg"
                    })
                };
            class m {
                static get API_URL() {
                    return r.$.apiUrl
                }
                static uploadingMessage(e, t) {
                    return e && t ? "Đang tải l\xean ".concat(e, "/").concat(t, "...") : this.MSG_UPLOADING
                }
                static isRetryableError(e) {
                    let t = e.message.toLowerCase();
                    return !!(t.includes("network") || t.includes("timeout") || t.includes("connection") || t.includes("socket hang up") || t.includes("econnreset") || t.includes("fetch failed") || t.includes("aborted")) || !(t.includes("file too large") || t.includes("invalid file") || t.includes("not allowed")) && (t.includes("500") || t.includes("503"), !0)
                }
                static async uploadFileWithTimeout(e, t, n) {
                    let r = new FormData;
                    r.append("image", e);
                    let o = new AbortController,
                        i = setTimeout(() => o.abort(), t),
                        l = n ? this.combineAbortSignals([o.signal, n]) : o.signal;
                    try {
                        let e = await a.u.authenticatedFetch("".concat(this.API_URL, "/api/upload/image"), {
                            method: "POST",
                            body: r,
                            signal: l
                        });
                        if (clearTimeout(i), !e.ok) {
                            let t = await e.json();
                            throw Error(t.error || "Failed to upload image")
                        }
                        return e.json()
                    } catch (e) {
                        if (clearTimeout(i), e instanceof Error && "AbortError" === e.name) throw Error("Upload timeout - connection too slow");
                        throw e
                    }
                }
                static combineAbortSignals(e) {
                    let t = new AbortController;
                    for (let n of e) {
                        if (n.aborted) {
                            t.abort();
                            break
                        }
                        n.addEventListener("abort", () => t.abort(), {
                            once: !0
                        })
                    }
                    return t.signal
                }
                static async uploadFile(e) {
                    let t = null;
                    for (let n = 0; n < this.MAX_RETRIES; n++) try {
                        return await this.uploadFileWithTimeout(e, this.UPLOAD_TIMEOUT_MS)
                    } catch (r) {
                        t = r instanceof Error ? r : Error(String(r)), console.error("❌ Upload attempt ".concat(n + 1, " failed:"), t.message);
                        let e = this.isRetryableError(t);
                        if (!e || n === this.MAX_RETRIES - 1) throw console.error("\uD83D\uDEAB Not retrying (retryable: ".concat(e, ", attempt: ").concat(n + 1, "/").concat(this.MAX_RETRIES, ")")), t;
                        let a = this.RETRY_DELAYS[n];
                        await new Promise(e => setTimeout(e, a))
                    }
                    throw t || Error("Upload failed after all retries")
                }
                static validateFiles(e) {
                    let t = [],
                        n = [];
                    return e.forEach(e => {
                        let a = this.ALLOWED_TYPES.includes(e.type.toLowerCase()),
                            r = e.name.toLowerCase(),
                            o = this.ALLOWED_EXTENSIONS.some(e => r.endsWith(e));
                        a || o ? 0 === e.size ? n.push({
                            file: e,
                            reason: "File rỗng"
                        }) : e.size > 0x3200000 ? n.push({
                            file: e,
                            reason: "File qu\xe1 lớn (tối đa 50MB)"
                        }) : t.push(e) : n.push({
                            file: e,
                            reason: "Định dạng kh\xf4ng hợp lệ (chỉ chấp nhận: JPG, PNG, GIF, WebP, HEIC)"
                        })
                    }), {
                        valid: t,
                        invalid: n
                    }
                }
                static async uploadSingleImage(e, t) {
                    let n = e;
                    s(e) && (null == t || t({
                        stage: "compressing",
                        progress: 0,
                        message: "Đang chuyển đổi HEIC..."
                    }), n = await c(e));
                    let a = this.MSG_UPLOADING;
                    null == t || t({
                        stage: "compressing",
                        progress: 0,
                        message: a
                    });
                    let r = await l(n, i.AVATAR, e => {
                        null == t || t({
                            stage: "compressing",
                            progress: e,
                            message: a
                        })
                    });
                    null == t || t({
                        stage: "uploading",
                        progress: 0,
                        message: a
                    });
                    let o = await this.uploadFile(r);
                    return null == t || t({
                        stage: "done",
                        progress: 100,
                        message: this.MSG_DONE
                    }), o
                }
                static async uploadMultipleImages(e, t) {
                    let n = [],
                        a = [],
                        r = e.length;
                    for (let o = 0; o < r; o++) {
                        let m = e[o],
                            d = o + 1,
                            h = this.uploadingMessage(d, r);
                        try {
                            let e = m;
                            s(m) && (null == t || t({
                                stage: "compressing",
                                progress: Math.round(o / r * 100),
                                currentFile: d,
                                totalFiles: r,
                                message: "Đang chuyển đổi HEIC ".concat(d, "/").concat(r, "...")
                            }), e = await c(m)), null == t || t({
                                stage: "compressing",
                                progress: Math.round(o / r * 100),
                                currentFile: d,
                                totalFiles: r,
                                message: h
                            });
                            let a = await l(e, i.GALLERY, e => {
                                null == t || t({
                                    stage: "compressing",
                                    progress: Math.round(o / r * 100 + e / r),
                                    currentFile: d,
                                    totalFiles: r,
                                    message: h
                                })
                            });
                            null == t || t({
                                stage: "uploading",
                                progress: Math.round((o + .5) / r * 100),
                                currentFile: d,
                                totalFiles: r,
                                message: h
                            });
                            let u = await this.uploadFile(a);
                            n.push({
                                url: u.imageUrl,
                                filename: m.name
                            })
                        } catch (e) {
                            console.error("❌ Failed to upload ".concat(m.name, ":"), e), a.push({
                                filename: m.name,
                                error: e instanceof Error ? e.message : "Unknown error"
                            })
                        }
                    }
                    return null == t || t({
                        stage: "done",
                        progress: 100,
                        message: this.MSG_DONE
                    }), {
                        successful: n,
                        failed: a
                    }
                }
                static createImageFileInput() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "image/*",
                        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    return new Promise(n => {
                        let a = document.createElement("input");
                        a.type = "file", a.accept = e, a.multiple = t, a.onchange = () => {
                            n(a.files)
                        }, a.oncancel = () => {
                            n(null)
                        }, a.click()
                    })
                }
                static async blobUrlToFile(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "image.jpg",
                        n = await fetch(e),
                        a = await n.blob();
                    return new File([a], t, {
                        type: a.type || "image/jpeg"
                    })
                }
            }
            m.ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/heic", "image/heif"], m.ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".heif"], m.MSG_UPLOADING = "Đang tải l\xean...", m.MSG_DONE = "Ho\xe0n th\xe0nh!", m.MAX_RETRIES = 3, m.UPLOAD_TIMEOUT_MS = 12e4, m.RETRY_DELAYS = [1e3, 2e3, 4e3]
        },
        12697: (e, t, n) => {
            n.d(t, {
                FC: () => o,
                GH: () => l,
                Lu: () => r,
                X$: () => i,
                hb: () => s
            });
            var a = n(28401);

            function r(e) {
                let t = new Date(e);
                return {
                    day: t.getDate().toString().padStart(2, "0"),
                    month: (t.getMonth() + 1).toString().padStart(2, "0"),
                    year: t.getFullYear().toString(),
                    dayName: a.Y7[t.getDay()]
                }
            }

            function o(e) {
                let {
                    date: t,
                    time: n,
                    groomFullName: a,
                    brideFullName: r,
                    address: o
                } = e;
                if (!t || !n || !a || !r) return "#";
                let i = new Date("".concat(t, "T").concat(n)),
                    l = new Date(i.getTime() + 72e5),
                    s = e => e.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
                    c = "Đ\xe1m cưới ".concat(a, "-").concat(r),
                    m = "Tiệc cưới của ".concat(a, " & ").concat(r, " tại ").concat(null != o ? o : "");
                return "https://www.google.com/calendar/render?action=TEMPLATE" + "&text=".concat(encodeURIComponent(c)) + "&dates=".concat(s(i), "/").concat(s(l)) + "&ctz=Asia/Ho_Chi_Minh" + "&details=".concat(encodeURIComponent(m)) + "&location=".concat(encodeURIComponent(null != o ? o : ""))
            }

            function i(e, t) {
                if (!e || !t) return null;
                let n = t.replace(/[\s-]+/g, "");
                return "https://qr.sepay.vn/img?bank=".concat(e, "&acc=").concat(n, "&template=qronly")
            }

            function l(e) {
                let t = {
                        name: e.groomName,
                        fullName: e.groomFullName,
                        birthOrder: e.groomBirthOrder,
                        parentTitle: e.groomParentTitle,
                        father: e.groomFather,
                        mother: e.groomMother,
                        address: e.groomAddress,
                        photo: e.groomPhoto,
                        photoCrop: e.groomPhotoCrop,
                        bankBin: e.groomBankBin,
                        bankCode: e.groomBankCode,
                        bankName: e.groomBankName,
                        bankLogo: e.groomBankLogo,
                        accountNumber: e.groomAccountNumber,
                        accountName: e.groomAccountName
                    },
                    n = {
                        name: e.brideName,
                        fullName: e.brideFullName,
                        birthOrder: e.brideBirthOrder,
                        parentTitle: e.brideParentTitle,
                        father: e.brideFather,
                        mother: e.brideMother,
                        address: e.brideAddress,
                        photo: e.bridePhoto,
                        photoCrop: e.bridePhotoCrop,
                        bankBin: e.brideBankBin,
                        bankCode: e.brideBankCode,
                        bankName: e.brideBankName,
                        bankLogo: e.brideBankLogo,
                        accountNumber: e.brideAccountNumber,
                        accountName: e.brideAccountName
                    };
                return e.brideFirst ? [n, t] : [t, n]
            }

            function s(e) {
                switch (e.envelopeDateType || "party") {
                    case "engagement":
                        return {
                            date: e.engagementDate || e.date || "", time: e.engagementTime || e.time || ""
                        };
                    case "ceremony":
                        return {
                            date: e.ceremonyDate || e.date || "", time: e.ceremonyTime || e.time || ""
                        };
                    default:
                        return {
                            date: e.date || "", time: e.time || ""
                        }
                }
            }
        },
        28401: (e, t, n) => {
            n.d(t, {
                Sb: () => o,
                Y4: () => a,
                Y7: () => r,
                e$: () => i
            });
            let a = {
                    SONGLONG_RED: "songlong_red",
                    SONGLONG_GREEN: "songlong_green",
                    SONGLONG_BLUE: "songlong_blue",
                    LONGPHUNG_RED: "longphung_red",
                    LONGPHUNG_GREEN: "longphung_green",
                    LONGPHUNG_BLUE: "longphung_blue",
                    LONGPHUNG_BLACK: "longphung_black",
                    VUONXUAN_RED: "vuonxuan_red",
                    VUONXUAN_GREEN: "vuonxuan_green",
                    VUONXUAN_BLUE: "vuonxuan_blue",
                    ANHDAO_PINK: "anhdao_pink",
                    CHIBI_RED: "chibi_red",
                    THANHDIEP_GREEN: "thanhdiep_green"
                },
                r = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ s\xe1u", "Thứ bảy"],
                o = {
                    smileys: {
                        name: "Mặt cười",
                        emojis: ["\uD83D\uDE00", "\uD83D\uDE03", "\uD83D\uDE04", "\uD83D\uDE01", "\uD83D\uDE06", "\uD83D\uDE05", "\uD83E\uDD23", "\uD83D\uDE02", "\uD83D\uDE42", "\uD83D\uDE43", "\uD83D\uDE09", "\uD83D\uDE0A", "\uD83D\uDE07", "\uD83E\uDD70", "\uD83D\uDE0D", "\uD83E\uDD29", "\uD83D\uDE18", "\uD83D\uDE17", "\uD83D\uDE1A", "\uD83D\uDE19", "\uD83D\uDE0B", "\uD83D\uDE1B", "\uD83D\uDE1C", "\uD83E\uDD2A", "\uD83D\uDE1D", "\uD83E\uDD11", "\uD83E\uDD17", "\uD83E\uDD2D", "\uD83E\uDD2B", "\uD83E\uDD14", "\uD83E\uDD10", "\uD83E\uDD28", "\uD83D\uDE10", "\uD83D\uDE11", "\uD83D\uDE36", "\uD83D\uDE0F", "\uD83D\uDE12", "\uD83D\uDE44", "\uD83D\uDE2C", "\uD83E\uDD25", "\uD83D\uDE14", "\uD83D\uDE2A", "\uD83E\uDD24", "\uD83D\uDE34", "\uD83D\uDE37", "\uD83E\uDD12", "\uD83E\uDD15", "\uD83E\uDD22", "\uD83E\uDD2E", "\uD83E\uDD27", "\uD83E\uDD75", "\uD83E\uDD76", "\uD83E\uDD74", "\uD83D\uDE35", "\uD83E\uDD2F", "\uD83E\uDD20", "\uD83E\uDD73", "\uD83D\uDE0E", "\uD83E\uDD13", "\uD83E\uDDD0"]
                    },
                    hearts: {
                        name: "Tr\xe1i tim",
                        emojis: ["❤️", "\uD83E\uDDE1", "\uD83D\uDC9B", "\uD83D\uDC9A", "\uD83D\uDC99", "\uD83D\uDC9C", "\uD83D\uDDA4", "\uD83E\uDD0D", "\uD83E\uDD0E", "\uD83D\uDC94", "❣️", "\uD83D\uDC95", "\uD83D\uDC9E", "\uD83D\uDC93", "\uD83D\uDC97", "\uD83D\uDC96", "\uD83D\uDC98", "\uD83D\uDC9D", "\uD83D\uDC9F"]
                    },
                    celebrations: {
                        name: "Lễ hội",
                        emojis: ["\uD83C\uDF89", "\uD83C\uDF8A", "\uD83C\uDF88", "\uD83C\uDF81", "\uD83C\uDF80", "\uD83C\uDF82", "\uD83C\uDF70", "\uD83E\uDD73", "\uD83C\uDF86", "\uD83C\uDF87", "✨", "\uD83C\uDF84", "\uD83C\uDF83", "\uD83C\uDF97️", "\uD83C\uDFC6", "\uD83E\uDD47", "\uD83C\uDF96️", "\uD83C\uDFC5", "\uD83D\uDC92", "\uD83D\uDC8D", "\uD83D\uDC8E"]
                    },
                    gestures: {
                        name: "Cử chỉ",
                        emojis: ["\uD83D\uDC4D", "\uD83D\uDC4E", "\uD83D\uDC4C", "\uD83E\uDD0C", "\uD83E\uDD0F", "✌️", "\uD83E\uDD1E", "\uD83E\uDD1F", "\uD83E\uDD18", "\uD83E\uDD19", "\uD83D\uDC48", "\uD83D\uDC49", "\uD83D\uDC46", "\uD83D\uDD95", "\uD83D\uDC47", "☝️", "\uD83D\uDC4B", "\uD83E\uDD1A", "\uD83D\uDD90️", "✋", "\uD83D\uDD96", "\uD83D\uDC4F", "\uD83D\uDE4C", "\uD83E\uDD32", "\uD83E\uDD1D", "\uD83D\uDE4F"]
                    },
                    objects: {
                        name: "Đồ vật",
                        emojis: ["\uD83D\uDCA1", "\uD83D\uDCB0", "\uD83D\uDCB3", "\uD83D\uDC8E", "⚡", "\uD83D\uDD25", "\uD83D\uDCAB", "⭐", "\uD83C\uDF1F", "✨", "\uD83C\uDFB5", "\uD83C\uDFB6", "\uD83D\uDD14", "\uD83D\uDD15", "\uD83D\uDCF1", "\uD83D\uDCBB", "⌨️", "\uD83D\uDDA5️", "\uD83D\uDDA8️", "\uD83D\uDDB1️", "\uD83D\uDCBE", "\uD83D\uDCBF", "\uD83D\uDCC0", "\uD83C\uDFAE", "\uD83D\uDD79️", "\uD83D\uDCF7", "\uD83D\uDCF8", "\uD83D\uDCF9", "\uD83C\uDFA5", "\uD83D\uDCFD️", "\uD83C\uDF9E️", "\uD83D\uDCDE", "☎️", "\uD83D\uDCDF", "\uD83D\uDCE0", "\uD83D\uDCFA", "\uD83D\uDCFB", "\uD83C\uDF99️", "\uD83C\uDF9A️", "\uD83C\uDF9B️"]
                    }
                },
                i = ["Ch\xfac hai bạn lu\xf4n tr\xe0n ngập y\xeau thương v\xe0 hạnh ph\xfac trong suốt qu\xe3ng đời c\xf2n lại.", "Mong hai bạn x\xe2y dựng một m\xe1i ấm tr\xe0n đầy tiếng cười v\xe0 niềm vui.", "Ch\xfac cho cuộc sống h\xf4n nh\xe2n của hai bạn lu\xf4n h\xf2a hợp v\xe0 bền chặt.", "Hy vọng rằng mỗi ng\xe0y của hai bạn đều l\xe0 một ng\xe0y đ\xe1ng nhớ v\xe0 hạnh ph\xfac.", "Ch\xfac vợ chồng mới cưới lu\xf4n nắm tay nhau vượt qua mọi kh\xf3 khăn trong cuộc sống.", "Mong rằng hạnh ph\xfac sẽ lu\xf4n hiện hữu trong từng khoảnh khắc của hai bạn.", "Ch\xfac hai bạn sớm c\xf3 những thi\xean thần nhỏ l\xe0m cho m\xe1i nh\xe0 th\xeam rộn r\xe0ng.", "Hy vọng t\xecnh y\xeau của hai bạn ng\xe0y c\xe0ng nở rộ v\xe0 bền l\xe2u.", "Ch\xfac đ\xf4i bạn trẻ m\xe3i gắn b\xf3, y\xeau thương v\xe0 sẻ chia với nhau mọi điều trong cuộc sống.", "Mong rằng tổ ấm mới của hai bạn sẽ lu\xf4n đong đầy niềm vui v\xe0 tiếng cười.", "Ch\xfac hai bạn hạnh ph\xfac đến đầu bạc răng long, sống trọn đời b\xean nhau.", "Hy vọng rằng mỗi s\xe1ng thức dậy, hai bạn đều mỉm cười v\xec c\xf3 nhau trong đời.", "Ch\xfac t\xecnh y\xeau của hai bạn ng\xe0y c\xe0ng nồng n\xe0n, son sắt v\xe0 thủy chung.", "Mong rằng cuộc sống h\xf4n nh\xe2n sẽ l\xe0 h\xe0nh tr\xecnh tuyệt vời nhất của hai bạn.", "Ch\xfac vợ chồng mới cưới lu\xf4n gặp may mắn, sức khỏe v\xe0 th\xe0nh c\xf4ng.", "Hy vọng hai bạn lu\xf4n t\xecm thấy b\xecnh y\xean v\xe0 hạnh ph\xfac trong v\xf2ng tay của nhau.", "Ch\xfac h\xf4n nh\xe2n của hai bạn l\xe0 c\xe2u chuyện cổ t\xedch đẹp đẽ k\xe9o d\xe0i m\xe3i m\xe3i.", "Mong rằng t\xecnh y\xeau của hai bạn l\xe0 nguồn sức mạnh vượt qua mọi thử th\xe1ch.", "Ch\xfac hai bạn lu\xf4n biết tr\xe2n trọng v\xe0 y\xeau thương nhau như ng\xe0y đầu gặp gỡ.", "Hy vọng tổ ấm nhỏ n\xe0y sẽ sớm rộn r\xe3 tiếng cười con trẻ v\xe0 hạnh ph\xfac vi\xean m\xe3n."]
        },
        34836: (e, t, n) => {
            n.d(t, {
                K3: () => u.K3,
                XH: () => u.XH,
                cI: () => i,
                pP: () => u.pP,
                ie: () => u.ie,
                $Y: () => u.$Y,
                Y4: () => a.Y4,
                FC: () => s.FC,
                X$: () => s.X$,
                hb: () => s.hb,
                nb: () => g.nb,
                VG: () => g.VG,
                GH: () => s.GH,
                $G: () => l,
                Lu: () => s.Lu,
                J5: () => m,
                BP: () => h,
                ZN: () => d.Z
            });
            var a = n(28401);
            let r = {
                [a.Y4.SONGLONG_RED]: {
                    groomName: "Minh Khang",
                    brideName: "Thuỳ Linh",
                    groomFullName: "Nguyễn Minh Khang",
                    brideFullName: "Trần Thuỳ Linh",
                    groomBirthOrder: "Ch\xfa Rể",
                    brideBirthOrder: "C\xf4 D\xe2u",
                    showCeremony: !1
                },
                [a.Y4.SONGLONG_GREEN]: {
                    groomName: "Đức Anh",
                    brideName: "Ngọc H\xe2n",
                    groomFullName: "L\xea Đức Anh",
                    brideFullName: "Phạm Ngọc H\xe2n",
                    groomBirthOrder: "Ch\xfa Rể",
                    brideBirthOrder: "C\xf4 D\xe2u",
                    showCeremony: !1
                },
                [a.Y4.SONGLONG_BLUE]: {
                    groomName: "Quang Huy",
                    brideName: "Phương Anh",
                    groomFullName: "V\xf5 Quang Huy",
                    brideFullName: "Ho\xe0ng Phương Anh",
                    groomBirthOrder: "Ch\xfa Rể",
                    brideBirthOrder: "C\xf4 D\xe2u",
                    showCeremony: !1
                },
                [a.Y4.LONGPHUNG_RED]: {
                    groomName: "Ho\xe0ng Nam",
                    brideName: "Mai Anh",
                    groomFullName: "B\xf9i Ho\xe0ng Nam",
                    brideFullName: "Đặng Mai Anh",
                    groomBirthOrder: "Con Trai",
                    brideBirthOrder: "Con G\xe1i"
                },
                [a.Y4.LONGPHUNG_GREEN]: {
                    groomName: "Thanh T\xf9ng",
                    brideName: "Thảo Nguy\xean",
                    groomFullName: "Đỗ Thanh T\xf9ng",
                    brideFullName: "Ng\xf4 Thảo Nguy\xean",
                    groomBirthOrder: "Con Trai",
                    brideBirthOrder: "Con G\xe1i"
                },
                [a.Y4.LONGPHUNG_BLUE]: {
                    groomName: "Việt H\xf9ng",
                    brideName: "Quỳnh Trang",
                    groomFullName: "Đinh Việt H\xf9ng",
                    brideFullName: "L\xfd Quỳnh Trang",
                    groomBirthOrder: "Con Trai",
                    brideBirthOrder: "Con G\xe1i"
                },
                [a.Y4.LONGPHUNG_BLACK]: {
                    groomName: "Nhật Long",
                    brideName: "Kim Phượng",
                    groomFullName: "V\xf5 Nhật Long",
                    brideFullName: "Huỳnh Kim Phượng",
                    groomBirthOrder: "Trưởng Nam",
                    brideBirthOrder: "\xdat Nữ"
                },
                [a.Y4.VUONXUAN_RED]: {
                    groomName: "Bảo Long",
                    brideName: "Kh\xe1nh Vy",
                    groomFullName: "Trương Bảo Long",
                    brideFullName: "Vũ Kh\xe1nh Vy",
                    groomBirthOrder: "Con Trai",
                    brideBirthOrder: "Con G\xe1i"
                },
                [a.Y4.VUONXUAN_GREEN]: {
                    groomName: "Thành Nam",
                    brideName: "Ngọc Mai",
                    groomFullName: "Nguyễn Thành Nam",
                    brideFullName: "Giáp Thị Ngọc Mai",
                    groomBirthOrder: "Con Trai",
                    brideBirthOrder: "Con G\xe1i"
                },
                [a.Y4.VUONXUAN_BLUE]: {
                    groomName: "Tuấn Kiệt",
                    brideName: "Ngọc Trinh",
                    groomFullName: "L\xe2m Tuấn Kiệt",
                    brideFullName: "H\xe0 Ngọc Trinh",
                    groomBirthOrder: "Con Trai",
                    brideBirthOrder: "Con G\xe1i"
                },
                [a.Y4.ANHDAO_PINK]: {
                    groomName: "Trung Hiếu",
                    brideName: "Như \xdd",
                    groomFullName: "Trần Trung Hiếu",
                    brideFullName: "Nguyễn Như \xdd"
                },
                [a.Y4.CHIBI_RED]: {
                    groomName: "Thế Bảo",
                    brideName: "Ngọc \xc1nh",
                    groomFullName: "Trần Thế Bảo",
                    brideFullName: "L\xea Ngọc \xc1nh",
                    groomBirthOrder: "\xdat Nam",
                    brideBirthOrder: "\xdat Nữ"
                },
                [a.Y4.THANHDIEP_GREEN]: {
                    groomName: "Thanh Diệp",
                    brideName: "Minh T\xe2m",
                    groomFullName: "L\xea Thanh Diệp",
                    brideFullName: "V\xf5 Minh T\xe2m"
                }
            };

            function o() {
                let e = new Date;
                e.setMonth(e.getMonth() + 1);
                let t = e.getDay();
                return e.setDate(e.getDate() + ((6 - t + 7) % 7 || 7)), e.toISOString().slice(0, 10)
            }
            let i = {
                groomName: "Tiến Đạt",
                brideName: "Xu\xe2n Mai",
                groomFullName: "Nguyễn Tiến Đạt",
                brideFullName: "Trần Xu\xe2n Mai",
                groomBirthOrder: "Con Trai",
                brideBirthOrder: "Con G\xe1i",
                weddingTitle: "Happy Wedding",
                groomParentTitle: "\xd4ng B\xe0",
                brideParentTitle: "\xd4ng B\xe0",
                groomFather: "Nguyễn Văn Vinh",
                groomMother: "L\xea Thị Hương",
                groomAddress: "123 Nguyễn Huệ, Quận 1, TP. Hồ Ch\xed Minh",
                brideFather: "Trần Văn Khoa",
                brideMother: "Phạm Thị Kim Oanh",
                brideAddress: "456 L\xea Lợi, Quận 3, TP. Hồ Ch\xed Minh",
                ceremonyDate: o(),
                ceremonyTime: "09:00",
                ceremonyAddress: "TƯ GIA",
                ceremonyType: "thanh_hon",
                childRelation: "CON",
                date: o(),
                time: "18:00",
                address: "Trung T\xe2m Hội Nghị ABC, 789 Điện Bi\xean Phủ, Quận 3, TP. Hồ Ch\xed Minh",
                thankYouNote: "Sự hiện diện của qu\xfd kh\xe1ch l\xe0 niềm vinh hạnh của gia đ\xecnh ch\xfang t\xf4i!",
                qrScanText: "Qu\xe9t m\xe3 để gửi mừng cưới",
                headerGreeting: "Happy Wedding",
                groomBankBin: "",
                groomBankCode: "",
                groomBankName: "",
                groomBankLogo: "",
                groomAccountNumber: "",
                groomAccountName: "",
                brideBankBin: "",
                brideBankCode: "",
                brideBankName: "",
                brideBankLogo: "",
                brideAccountNumber: "",
                brideAccountName: "",
                galleryImages: [],
                comments: [],
                showGuestbook: !1,
                showRsvp: !0,
                showCeremony: !1,
                showMap: !0,
                brideFirst: !1
            };

            function l(e) {
                let t = r[e] || r[a.Y4.SONGLONG_RED];
                return {
                    ...i,
                    ...t
                }
            }
            var s = n(12697),
                c = n(12115);

            function m(e, t, n, a) {
                let [r, o] = (0, c.useState)(t);
                return (0, c.useEffect)(() => {
                    if (!e || !a.current) return void o(window.innerWidth >= 768 ? n : t);
                    let r = () => {
                            var r;
                            let i = (null == (r = a.current) ? void 0 : r.offsetWidth) || 0;
                            if (0 === i) return;
                            let l = window.innerWidth >= 768 ? n : t,
                                s = Math.max(12, .5 * l),
                                c = document.createElement("span");
                            c.style.visibility = "hidden", c.style.position = "absolute", c.style.whiteSpace = "nowrap", c.style.fontSize = "".concat(l, "px"), c.style.fontFamily = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif', c.textContent = e, document.body.appendChild(c);
                            let m = c.offsetWidth;
                            document.body.removeChild(c), m > i ? o(Math.round(Math.max(s, i / m * l * .95))) : o(l)
                        },
                        i = setTimeout(r, 0),
                        l = () => r();
                    return window.addEventListener("resize", l), () => {
                        clearTimeout(i), window.removeEventListener("resize", l)
                    }
                }, [e, t, n, a]), r
            }
            var d = n(439);

            function h(e) {
                let {
                    comments: t = [],
                    onCommentsUpdate: n
                } = e, [a, r] = (0, c.useState)({
                    name: "",
                    message: ""
                }), [o, i] = (0, c.useState)(!1), [l, s] = (0, c.useState)(!1), m = (0, c.useRef)(null), d = (0, c.useCallback)(async e => {
                    if (e.preventDefault(), !a.name.trim() || !a.message.trim()) return void alert("Vui l\xf2ng nhập t\xean v\xe0 lời ch\xfac!");
                    i(!0);
                    try {
                        let e = {
                                id: Date.now().toString(),
                                name: a.name.trim(),
                                message: a.message.trim(),
                                timestamp: new Date().toISOString()
                            },
                            o = [...t, e];
                        n(o), r({
                            name: "",
                            message: ""
                        }), s(!0), setTimeout(() => {
                            s(!1)
                        }, 3e3)
                    } catch (e) {
                        console.error("Failed to submit comment:", e), alert("C\xf3 lỗi xảy ra khi gửi lời ch\xfac. Vui l\xf2ng thử lại!")
                    } finally {
                        i(!1)
                    }
                }, [a, t, n]), h = (0, c.useCallback)(e => {
                    let t = m.current;
                    if (!t) return;
                    let n = t.selectionStart,
                        a = t.selectionEnd;
                    r(t => {
                        let r = t.message.substring(0, n) + e + t.message.substring(a);
                        return {
                            ...t,
                            message: r
                        }
                    }), setTimeout(() => {
                        t.focus(), t.setSelectionRange(n + e.length, n + e.length)
                    }, 0)
                }, []), u = (0, c.useCallback)(e => {
                    let t = m.current;
                    if (!t) return;
                    let n = t.selectionStart,
                        a = t.selectionEnd;
                    r(t => {
                        let r = t.message.substring(0, n),
                            o = r.length > 0 && !r.endsWith(" ") ? " " + e : e,
                            i = r + o + t.message.substring(a);
                        return {
                            ...t,
                            message: i
                        }
                    }), setTimeout(() => {
                        t.focus();
                        let a = t.value.substring(0, n),
                            r = a.length > 0 && !a.endsWith(" "),
                            o = e.length + +!!r;
                        t.setSelectionRange(n + o, n + o)
                    }, 0)
                }, []);
                return {
                    formState: a,
                    setFormState: r,
                    isSubmitting: o,
                    submitSuccess: l,
                    textareaRef: m,
                    handleSubmit: d,
                    insertEmoji: h,
                    insertCreativeSuggestion: u
                }
            }
            n(54074);
            var u = n(44173),
                g = n(61911)
        },
        44173: (e, t, n) => {
            n.d(t, {
                K3: () => d,
                XH: () => l,
                pP: () => i,
                ie: () => m,
                $Y: () => c
            });
            var a = n(95155),
                r = n(12115),
                o = n(28401);
            let i = (0, r.memo)(function (e) {
                    let {
                        onEmojiSelect: t,
                        maxEmojis: n = 80,
                        buttonColor: r
                    } = e, i = Object.values(o.Sb).flatMap(e => e.emojis).slice(0, n), l = e => {
                        t(e), document.activeElement instanceof HTMLElement && document.activeElement.blur()
                    };
                    return (0, a.jsxs)("div", {
                        className: "dropdown dropdown-top",
                        children: [(0, a.jsx)("div", {
                            tabIndex: 0,
                            role: "button",
                            className: "flex items-center hover:scale-110 transition-transform cursor-pointer px-2 py-1 rounded hover:bg-white/20",
                            style: r ? {
                                color: r
                            } : void 0,
                            title: "Ch\xe8n biểu tượng",
                            children: "\uD83D\uDE0A"
                        }), (0, a.jsxs)("div", {
                            tabIndex: 0,
                            className: "dropdown-content card card-sm bg-white rounded-lg shadow-2xl border border-gray-200 z-50 w-72 md:w-80 mb-2",
                            children: [(0, a.jsx)("div", {
                                className: "p-3 border-b border-gray-200",
                                children: (0, a.jsx)("h3", {
                                    className: "font-medium text-gray-700",
                                    children: "Ch\xe8n biểu tượng"
                                })
                            }), (0, a.jsx)("div", {
                                className: "p-2 max-h-64 overflow-y-auto",
                                children: (0, a.jsx)("div", {
                                    className: "grid grid-cols-8 gap-1",
                                    children: i.map((e, t) => (0, a.jsx)("button", {
                                        onClick: () => l(e),
                                        className: "p-2 hover:bg-gray-100 rounded text-lg hover:scale-110 transition-transform",
                                        title: e,
                                        children: e
                                    }, t))
                                })
                            })]
                        })]
                    })
                }),
                l = (0, r.memo)(function (e) {
                    let {
                        onSuggestionSelect: t,
                        buttonColor: n,
                        textColor: r
                    } = e, i = e => {
                        t(e), document.activeElement instanceof HTMLElement && document.activeElement.blur()
                    };
                    return (0, a.jsxs)("div", {
                        className: "dropdown dropdown-top",
                        children: [(0, a.jsx)("div", {
                            tabIndex: 0,
                            role: "button",
                            className: "flex items-center hover:scale-110 transition-transform cursor-pointer px-2 py-1 rounded hover:bg-white/20",
                            style: n ? {
                                color: n
                            } : void 0,
                            title: "Gợi \xfd lời ch\xfac",
                            children: "\uD83D\uDCA1"
                        }), (0, a.jsxs)("div", {
                            tabIndex: 0,
                            className: "dropdown-content card card-sm bg-white rounded-lg shadow-2xl border border-gray-200 z-50 w-80 md:w-96 mb-2",
                            children: [(0, a.jsx)("div", {
                                className: "p-3 border-b border-gray-200",
                                children: (0, a.jsx)("h3", {
                                    className: "font-medium text-gray-700",
                                    children: "Gợi \xfd lời ch\xfac"
                                })
                            }), (0, a.jsx)("div", {
                                className: "p-2 max-h-64 overflow-y-auto",
                                children: (0, a.jsx)("div", {
                                    className: "space-y-2",
                                    children: o.e$.map((e, t) => (0, a.jsx)("button", {
                                        onClick: () => i(e),
                                        className: "w-full text-left p-3 hover:bg-gray-100 rounded-lg text-sm leading-relaxed transition-colors duration-200 border border-transparent hover:border-gray-200",
                                        style: r ? {
                                            color: r
                                        } : void 0,
                                        children: e
                                    }, t))
                                })
                            })]
                        })]
                    })
                });
            n(66766), n(12697);
            var s = n(62932);

            function c(e) {
                let {
                    isEditable: t,
                    data: n,
                    colors: r
                } = e;
                return (0, a.jsxs)("div", {
                    className: "flex flex-col items-center justify-between w-full mt-8 pb-8 px-2 sm:px-4",
                    style: {
                        backgroundColor: "white"
                    },
                    children: [(0, a.jsx)("h2", {
                        className: "mt-6 text-2xl font-pattaya text-center px-2",
                        style: {
                            color: r.primary
                        },
                        children: "Tiệc cưới sẽ tổ chức tại:"
                    }), (0, a.jsx)("div", {
                        className: "w-full sm:w-4/5 md:w-2/3 max-w-2xl mt-6 px-2",
                        children: (0, a.jsx)("div", {
                            className: "text-center p-3 sm:p-4 text-xs sm:text-sm font-medium font-helvetica rounded-md break-words whitespace-pre-line",
                            style: {
                                backgroundColor: r.background,
                                color: r.text,
                                wordWrap: "break-word",
                                overflowWrap: "break-word"
                            },
                            children: ("undefined" != typeof window && window.location.pathname.includes("ngocmai") ? "Thôn Ngùi, Ngọc Thiện, Bắc Ninh" : n.address || "Nhà hàng ABC, 123 Nguyễn Huệ, Q.1")
                        })
                    }), (t || !1 !== n.showMap && (n.mapAddress || n.address)) && (0, a.jsx)(s.$, {
                        latitude: n.latitude,
                        longitude: n.longitude,
                        address: n.address,
                        mapAddress: n.mapAddress,
                        mapPlaceName: n.mapPlaceName,
                        mapDisplayMode: n.mapDisplayMode,
                        className: "w-full sm:w-4/5 max-w-2xl mt-4 mb-8 rounded-xl md:w-2/3 h-[300px]",
                        style: {
                            border: 0
                        },
                        fallbackStyle: {
                            color: r.text
                        },
                        fallbackText: "D\xe1n link Google Maps ở tr\xean để hiển thị bản đồ tại đ\xe2y",
                        showFallback: t
                    })]
                })
            }

            function m(e) {
                let {
                    isEditable: t,
                    data: n,
                    colors: r,
                    fontFamily: o,
                    sectionTitleStyle: i,
                    mapClassName: l = "h-[260px] md:h-[360px] w-full max-w-[340px] md:max-w-[600px] rounded-2xl border border-[#ffffff33]",
                    mapBorderColor: c
                } = e;
                return (0, a.jsxs)("section", {
                    className: "relative flex flex-col gap-6 md:gap-8 px-6 md:px-10 pb-12 md:pb-16",
                    children: [(0, a.jsxs)("div", {
                        className: "relative text-center",
                        children: [(0, a.jsx)("h3", {
                            className: "font-normal uppercase text-[20px] md:text-[26px]",
                            style: {
                                ...i,
                                fontSize: void 0
                            },
                            children: "TIỆC CƯỚI SẼ TỔ CHỨC TẠI"
                        }), (0, a.jsx)("div", {
                            className: "mx-auto mt-4 max-w-sm md:max-w-[600px] rounded-full px-4 md:px-6 py-2 md:py-3 whitespace-pre-line text-sm md:text-base",
                            style: {
                                backgroundColor: r.addressBg,
                                color: r.addressText,
                                fontFamily: o,
                                cursor: "pointer"
                            },
                            onClick: () => {
                                window.open(x, "_blank", "noopener")
                            },
                            children: ("undefined" != typeof window && window.location.pathname.includes("ngocmai") ? "Thôn Ngùi, Ngọc Thiện, Bắc Ninh" : n.address || "Nhà hàng ABC, 123 Nguyễn Huệ, Q.1")
                        })]
                    }), (t || !1 !== n.showMap && (n.mapAddress || n.address)) && (0, a.jsxs)("div", {
                        className: "relative flex flex-col items-center gap-4 md:gap-5",
                        children: [(0, a.jsx)("h4", {
                            className: "font-normal uppercase text-[20px] md:text-[26px]",
                            style: {
                                ...i,
                                fontSize: void 0
                            },
                            children: "BẢN ĐỒ"
                        }), (0, a.jsx)(s.$, {
                            latitude: n.latitude,
                            longitude: n.longitude,
                            address: n.address,
                            mapAddress: n.mapAddress,
                            mapPlaceName: n.mapPlaceName,
                            mapDisplayMode: n.mapDisplayMode,
                            className: l,
                            style: c ? {
                                borderColor: c
                            } : void 0,
                            fallbackClassName: "flex h-[260px] w-full max-w-[340px] flex-col items-center justify-center gap-3 rounded-2xl border border-[#ffffff33] bg-black/20 text-center text-sm",
                            fallbackStyle: {
                                color: r.mapFallbackText
                            },
                            fallbackText: "D\xe1n link Google Maps ở tr\xean để hiển thị bản đồ tại đ\xe2y",
                            showFallback: t
                        })]
                    })]
                })
            }

            function d(e) {return null}},54074: (e, t, n) => {
            n.d(t, {
                MG: () => i,
                f5: () => r
            });
            var a = n(23843);
            async function r(e) {
                try {
                    if (e.includes("maps.apple.com")) return function (e) {
                        try {
                            let t, n, a, r, o = new URL(e).searchParams,
                                i = o.get("coordinate");
                            if (i) {
                                let [e, a] = i.split(",").map(e => parseFloat(e.trim()));
                                isNaN(e) || isNaN(a) || (t = e, n = a)
                            }
                            let l = o.get("address");
                            l && (a = decodeURIComponent(l));
                            let s = o.get("name");
                            if (s && (r = decodeURIComponent(s)), r && !a && (a = r), !t && !n && !a && !r) return null;
                            return {
                                latitude: t,
                                longitude: n,
                                address: a,
                                placeName: r
                            }
                        } catch (e) {
                            return console.error("Error parsing Apple Maps URL:", e), null
                        }
                    }(e);
                    if (e.includes("maps.app.goo.gl") || e.includes("goo.gl/maps") || e.includes("share.google")) return await o(e);
                    return function (e) {
                        let t, n, a, r, o = e.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
                        if (o && (t = parseFloat(o[1]), n = parseFloat(o[2])), !t || !n) {
                            let a = e.match(/[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
                            a && (t = parseFloat(a[1]), n = parseFloat(a[2]))
                        }
                        if (!t || !n) {
                            let a = e.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
                            a && (t = parseFloat(a[1]), n = parseFloat(a[2]))
                        }
                        let i = e.match(/\/place\/([^/]+)\//);
                        i && (r = decodeURIComponent(i[1].replace(/\+/g, " ")));
                        let l = e.match(/[?&]q=([^&]+)/);
                        l && (a = decodeURIComponent(l[1].replace(/\+/g, " ")));
                        let s = e.match(/\/search\/([^/]+)/);
                        return (s && !a && (a = decodeURIComponent(s[1].replace(/\+/g, " "))), r && !a && (a = r), t || n || a || r) ? {
                            latitude: t,
                            longitude: n,
                            address: a,
                            placeName: r
                        } : null
                    }(e)
                } catch (e) {
                    throw console.error("Error parsing map URL:", e), e
                }
            }
            async function o(e) {
                try {
                    let t = a.$.apiUrl,
                        n = await fetch("".concat(t, "/api/maps/resolve"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                url: e
                            })
                        });
                    if (!n.ok) return console.error("Failed to resolve short URL:", n.statusText), null;
                    let r = await n.json();
                    if (r.success && r.data) return {
                        latitude: r.data.latitude,
                        longitude: r.data.longitude,
                        address: r.data.address,
                        placeName: r.data.placeName,
                        placeId: r.data.placeId
                    };
                    return null
                } catch (e) {
                    return console.error("Error calling maps resolve API:", e), null
                }
            }

            function i(e) {
                let t = "AIzaSyAY8WQxGig6axA_jZil94btO9G6dhsFEKg";
                if (!t) return console.warn("Google Maps API key is not configured. Map will not be displayed."), null;
                if (e.mapAddress && e.mapAddress.startsWith("https://www.google.com/maps/embed?pb=")) return e.mapAddress;
                if (e.address && e.address.startsWith("https://www.google.com/maps/embed?pb=")) return e.address;
                if (!e.mapAddress && !e.latitude && !e.longitude && !e.placeId && !e.address) return null;
                if (e.mapDisplayMode) switch (e.mapDisplayMode) {
                    case "placeId":
                        if (e.mapPlaceName) return "https://www.google.com/maps/embed/v1/place?key=".concat(t, "&q=").concat(encodeURIComponent(e.mapPlaceName));
                        break;
                    case "coordinates":
                        if (e.latitude && e.longitude) return "https://www.google.com/maps/embed/v1/place?key=".concat(t, "&q=").concat(e.latitude, ",").concat(e.longitude, "&zoom=17");
                        break;
                    case "address":
                        if (e.mapAddress) return "https://www.google.com/maps/embed/v1/place?key=".concat(t, "&q=").concat(encodeURIComponent(e.mapAddress))
                }
                return e.mapPlaceName && e.mapAddress ? "https://www.google.com/maps/embed/v1/place?key=".concat(t, "&q=").concat(encodeURIComponent(e.mapPlaceName)) : e.latitude && e.longitude && e.mapAddress ? "https://www.google.com/maps/embed/v1/place?key=".concat(t, "&q=").concat(e.latitude, ",").concat(e.longitude, "&zoom=17") : e.mapAddress ? "https://www.google.com/maps/embed/v1/place?key=".concat(t, "&q=").concat(encodeURIComponent(e.mapAddress)) : e.address ? "https://www.google.com/maps/embed/v1/place?key=".concat(t, "&q=").concat(encodeURIComponent(e.address)) : null
            }
        },
        61911: (e, t, n) => {
            function a(e) {
                return "string" == typeof e ? {
                    url: e,
                    position: {
                        x: .5,
                        y: .5
                    }
                } : e
            }

            function r(e) {
                return "string" == typeof e ? e : e.url
            }

            function o(e) {
                let t = "string" == typeof e ? {
                    x: .5,
                    y: .5
                } : e.position || {
                    x: .5,
                    y: .5
                };
                return {
                    objectPosition: "".concat(100 * t.x, "% ").concat(100 * t.y, "%")
                }
            }

            function i(e, t, n) {
                let a = e.x + e.width / 2,
                    r = e.y + e.height / 2,
                    o = e.width / (2 * t),
                    i = e.height / (2 * n),
                    l = 1 - 2 * o,
                    s = 1 - 2 * i;
                return {
                    x: l > 0 ? Math.max(0, Math.min(1, (a / t - o) / l)) : .5,
                    y: s > 0 ? Math.max(0, Math.min(1, (r / n - i) / s)) : .5
                }
            }
            n.d(t, {
                VG: () => r,
                aM: () => i,
                jk: () => a,
                nb: () => o
            })
        },
        62932: (e, t, n) => {
            n.d(t, {
                $: () => l
            });
            var a = n(95155),
                r = n(54074),
                o = n(35695),
                i = n(66766);

            function l(e) {
                let {
                    latitude: t,
                    longitude: n,
                    address: l,
                    mapAddress: s,
                    mapPlaceName: c,
                    mapDisplayMode: m,
                    placeId: d,
                    className: h = "w-full h-[300px] rounded-xl",
                    style: u,
                    fallbackClassName: g,
                    fallbackStyle: p,
                    fallbackText: b = "Nhập link Google Maps ở tr\xean để hiển thị bản đồ",
                    showFallback: N = !0
                } = e, y = "true" === (0, o.useSearchParams)().get("screenshot"), f = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3715.3399293863226!2d106.015316!3d21.376516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDIyJzM1LjUiTiAxMDbCsDAwJzU1LjEiRQ!5e0!3m2!1svi!2s!4v1768283142573!5m2!1svi!2s";
                let w = "undefined" != typeof window && window.location.pathname.includes("ngocmai"), v = w ? "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1079.9541494407486!2d106.0193469!3d21.3705423!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313516d654850ed5%3A0xbe0c26ea8f69fc4d!2zSGFpciBTYWxvbiBI4bqhbmggSGnhu4Nu!5e1!3m2!1svi!2s!4v1768304310836!5m2!1svi!2s" : f, x = w ? "https://maps.app.goo.gl/BEZCoLR8GpZataP3A" : "https://maps.app.goo.gl/uzyCyjB7utCakDVv9";
                f = v;
                return f && y ? (0, a.jsx)("div", {
                    className: h,
                    style: {
                        ...u,
                        position: "relative"
                    },
                    children: (0, a.jsx)(i.default, {
                        src: "/images/screenshot-map-placeholder.png",
                        alt: "Map placeholder",
                        fill: !0,
                        className: "object-cover",
                        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    })
                }) : f ? (0, a.jsx)("div", {
                    className: h,
                    style: {
                        ...u,
                        position: "relative",
                        cursor: "pointer"
                    },
                    onClick: () => {
                        window.open(x, "_blank", "noopener")
                    },
                    children: (0, a.jsx)("iframe", {
                        className: "w-full h-full",
                        style: {
                            border: 0,
                            pointerEvents: "none"
                        },
                        src: f,
                        loading: "lazy",
                        allowFullScreen: !0,
                        referrerPolicy: "no-referrer-when-downgrade"
                    })
                }) : N ? (0, a.jsx)("div", {
                    className: g || "".concat(h, " bg-black/20 flex items-center justify-center"),
                    style: p,
                    children: (0, a.jsx)("p", {
                        className: "text-center px-4",
                        children: b
                    })
                }) : null
            }
        }
    }
]);
