(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5063], {
        24231: (e, t, n) => {
            Promise.resolve().then(n.bind(n, 63879))
        },
        63879: (e, t, n) => {
            "use strict";
            n.d(t, {
                default: () => L
            });
            var i = n(95155),
                a = n(12115),
                r = n(6874),
                l = n.n(r),
                s = n(60800),
                o = n(14960),
                d = n(85395),
                c = n(25895),
                u = n(10507),
                m = n(25278),
                h = n(39625),
                g = n(60541),
                x = n(54032),
                f = n(75341),
                p = n(50707),
                v = n(20400),
                b = n(51300),
                y = n(49129),
                j = n(77935),
                _ = n(80246),
                k = n(23490),
                N = n(31335),
                C = n(23843);
            let w = "chungdoi_visitor_id";

            function T() {
                var e, t, n;
                let i = localStorage.getItem(w);
                return i || (i = function (e) {
                    if ("undefined" == typeof document) return null;
                    for (let t of document.cookie.split(";")) {
                        let [n, i] = t.trim().split("=");
                        if (n === e) return decodeURIComponent(i)
                    }
                    return null
                }(w)), i || (i = crypto.randomUUID()), localStorage.setItem(w, i), e = w, t = i, n = 31536e3, "undefined" != typeof document && (document.cookie = "".concat(e, "=").concat(encodeURIComponent(t), "; max-age=").concat(31536e3, "; path=/; SameSite=Lax")), i
            }
            var E = n(10810),
                D = n(34836);
            let I = {
                    songlong_red: s.v,
                    songlong_green: o.r,
                    songlong_blue: d.W,
                    vuonxuan_green: c.o,
                    vuonxuan_red: u.g,
                    vuonxuan_blue: m.X,
                    longphung_red: h.o,
                    longphung_green: g.o,
                    longphung_blue: x.V,
                    longphung_black: f.Y,
                    anhdao_pink: p.k,
                    chibi_red: v.B,
                    thanhdiep_green: b.z,
                    classic: s.v,
                    elegant: o.r,
                    romantic: d.W,
                    nature: c.o,
                    redV1: h.o
                },
                F = {
                    classic: "songlong_red",
                    elegant: "songlong_green",
                    romantic: "songlong_blue",
                    nature: "vuonxuan_green",
                    redV1: "longphung_red"
                };

            function L(e) {
                var t, n, r, o, d, c, u, m;
                let {
                    slug: h,
                    initialData: g,
                    initialError: x,
                    initialViewLimitExceeded: f,
                    initialTrialExpired: p
                } = e, [v, b] = (0, a.useState)(g || null), [w, L] = (0, a.useState)(!g && !x), [S, O] = (0, a.useState)(x || null), [B, U] = (0, a.useState)(!1), [M, R] = (0, a.useState)(f || !1), [V, z] = (0, a.useState)(p || !1), P = (0, a.useRef)(null), {
                    envelopeOpened: W,
                    handleEnvelopeOpen: A,
                    handleInvitationClick: $
                } = (0, E.j)({
                    enabled: !w && !S && !!v
                }), [J, K] = (0, a.useMemo)(() => (0, D.GH)((null == v ? void 0 : v.data) || {}), [null == v ? void 0 : v.data]), H = e => {
                    if (!e) return "";
                    let t = e.trim().split(/\s+/);
                    return t[t.length - 1] || e
                }, X = H(J.name) || ((null == v || null == (t = v.data) ? void 0 : t.brideFirst) ? "Ngọc Mai" : "Thành Nam"), q = H(K.name) || ((null == v || null == (n = v.data) ? void 0 : n.brideFirst) ? "Thành Nam" : "Ngọc Mai");
                (0, a.useEffect)(() => {
                    var e;
                    let t = null == v || null == (e = v.data) ? void 0 : e.musicTrackId;
                    if (!t || !P.current) return;
                    let n = (0, k.OL)(t);
                    if (!n) return;
                    let i = P.current;
                    i.src = n.url, i.volume = .5, i.loop = !0, i.preload = "metadata"
                }, [null == v || null == (r = v.data) ? void 0 : r.musicTrackId]), (0, a.useEffect)(() => {
                    if (W) return;
                    let e = setTimeout(() => {
                        U(!0)
                    }, 500);
                    return () => clearTimeout(e)
                }, [W]), (0, a.useEffect)(() => {
                    if (g) {
                        var e;
                        let t = T();
                        fetch("".concat(C.$.apiUrl, "/api/invite/").concat(h, "/view"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                visitorId: t
                            })
                        }).catch(e => console.log("Error tracking view:", e)), (0, N.f0)("invitation_viewed", {
                            invitation_id: g.id,
                            slug: h,
                            referrer: "undefined" != typeof document && document.referrer || "direct",
                            template_id: (null == (e = g.data) ? void 0 : e.templateId) || "unknown"
                        });
                        return
                    }
                    x || (async () => {
                        try {
                            var e;
                            let t = await fetch("".concat(C.$.apiUrl, "/api/invite/").concat(h));
                            if (!t.ok) {
                                let e = await t.json().catch(() => ({})),
                                    n = e.error || "unknown";
                                if (410 === t.status && "trial_expired" === n) {
                                    O({
                                        type: "trial_expired",
                                        message: e.message || "Thiệp cưới đ\xe3 hết thời gian d\xf9ng thử"
                                    }), L(!1);
                                    return
                                }
                                if (404 === t.status) {
                                    O({
                                        type: n,
                                        message: e.message || "Kh\xf4ng t\xecm thấy thiệp cưới"
                                    }), L(!1);
                                    return
                                }
                                O({
                                    type: "unknown",
                                    message: "Kh\xf4ng thể tải thiệp cưới"
                                }), L(!1);
                                return
                            }
                            let n = await t.json();
                            b({
                                ...n.invitation,
                                data: {
                                    ...n.invitation.data,
                                    comments: []
                                }
                            });

                            n.viewLimitExceeded && R(!0);
                            n.trialExpired && z(!0);

                            (async () => {
                                try {
                                    const {
                                        data,
                                        error
                                    } = await window.supabase
                                        .from("guestbook_messages")
                                        .select("name, message, created_at")
                                        .eq("invitation_slug", h)
                                        .order("created_at", {
                                            ascending: true
                                        });

                                    if (error) {
                                        console.error("Load guestbook error:", error);
                                        return;
                                    }

                                    const comments = (data || []).map(item => ({
                                        name: item.name,
                                        message: item.message,
                                        timestamp: item.created_at
                                    }));

                                    b(t =>
                                        t ?
                                        {
                                            ...t,
                                            data: {
                                                ...t.data,
                                                comments
                                            }
                                        } :
                                        t
                                    );

                                } catch (err) {
                                    console.error("Load guestbook failed:", err);
                                }
                            })();
                            let i = T();
                            fetch("".concat(C.$.apiUrl, "/api/invite/").concat(h, "/view"), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    visitorId: i
                                })
                            }).catch(e => console.log("Error tracking view:", e)), (0, N.f0)("invitation_viewed", {
                                invitation_id: n.invitation.id,
                                slug: h,
                                referrer: "undefined" != typeof document && document.referrer || "direct",
                                template_id: (null == (e = n.invitation.data) ? void 0 : e.templateId) || "unknown"
                            })
                        } catch (e) {
                            O({
                                type: "unknown",
                                message: e instanceof Error ? e.message : "Loi khong xac dinh"
                            })
                        } finally {
                            L(!1)
                        }
                    })()
                }, [h, g, x]);
                (0, a.useEffect)(() => {
                    if ("undefined" == typeof window || !window.supabase || !h) return;
                    (async () => {
                        try {
                            const {
                                data,
                                error
                            } = await window.supabase
                                .from("guestbook_messages")
                                .select("name, message, created_at")
                                .eq("invitation_slug", h)
                                .order("created_at", {
                                    ascending: true
                                });

                            if (error) {
                                console.error("Load guestbook error:", error);
                                return;
                            }

                            const comments = (data || []).map(item => ({
                                name: item.name,
                                message: item.message,
                                timestamp: item.created_at
                            }));

                            b(t =>
                                t ? {
                                    ...t,
                                    data: {
                                        ...t.data,
                                        comments
                                    }
                                } : t
                            );
                        } catch (e) {
                            console.error("Load guestbook error:", e);
                        }
                    })();
                }, [h]);
                let G = async e => {
                    if (!v || !e || !e.comments) return;

                    try {
                        b(t =>
                            t ? {
                                ...t,
                                data: e
                            } :
                            null
                        );

                        const latestComment =
                            e.comments[e.comments.length - 1];

                        if (!latestComment) return;

                        const {
                            error
                        } = await window.supabase
                            .from("guestbook_messages")
                            .insert({
                                invitation_slug: h,
                                name: latestComment.name || "Ẩn danh",
                                message: latestComment.message || ""
                            });

                        if (error) {
                            console.error("Supabase insert error:", error);
                        }

                    } catch (err) {
                        console.error("Error saving guestbook:", err);
                    }
                };

                if (w) return (0, i.jsx)("div", {
                    className: "min-h-screen bg-gray-50 flex items-center justify-center",
                    children: (0, i.jsxs)("div", {
                        className: "text-center",
                        children: [(0, i.jsx)("div", {
                            className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
                        }), (0, i.jsx)("p", {
                            className: "mt-4 text-gray-600",
                            children: "Loading invitation..."
                        })]
                    })
                });
                if (S && !v) return "trial_expired" === S.type ? (0, i.jsx)("div", {
                    className: "min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-4",
                    children: (0, i.jsxs)("div", {
                        className: "text-center max-w-md",
                        children: [(0, i.jsx)("div", {
                            className: "mx-auto h-16 w-16 text-rose-300 mb-5",
                            children: (0, i.jsx)("svg", {
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: (0, i.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                })
                            })
                        }), (0, i.jsx)("h3", {
                            className: "text-xl font-medium text-gray-800 mb-3",
                            children: "Thiệp cưới hiện chưa sẵn s\xe0ng"
                        }), (0, i.jsx)("p", {
                            className: "text-gray-500 mb-6 leading-relaxed",
                            children: "Thiệp cưới n\xe0y đang được cập nhật. Vui l\xf2ng li\xean hệ c\xf4 d\xe2u ch\xfa rể để biết th\xeam th\xf4ng tin."
                        }), (0, i.jsx)("div", {
                            className: "pt-2",
                            children: (0, i.jsxs)("p", {
                                className: "text-sm text-gray-400",
                                children: ["Bạn muốn tạo thiệp cưới?", " ", (0, i.jsx)(l(), {
                                    href: "/?utm_source=trial_expired&utm_medium=referral&utm_campaign=guest_conversion",
                                    className: "text-rose-400 hover:text-rose-500 hover:underline",
                                    children: "Bắt đầu ngay"
                                })]
                            })
                        })]
                    })
                }) : "not_published" === S.type ? (0, i.jsx)("div", {
                    className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
                    children: (0, i.jsxs)("div", {
                        className: "text-center max-w-md",
                        children: [(0, i.jsx)("div", {
                            className: "mx-auto h-20 w-20 text-gray-400 mb-6",
                            children: (0, i.jsx)("svg", {
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: (0, i.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                })
                            })
                        }), (0, i.jsx)("h3", {
                            className: "text-xl font-semibold text-gray-900 mb-3",
                            children: "Thiệp Cưới Chưa Được Xuất Bản"
                        }), (0, i.jsx)("p", {
                            className: "text-gray-600",
                            children: "Thiệp cưới n\xe0y đang trong qu\xe1 tr\xecnh chỉnh sửa v\xe0 chưa sẵn s\xe0ng để chia sẻ."
                        })]
                    })
                }) : (0, i.jsx)("div", {
                    className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
                    children: (0, i.jsxs)("div", {
                        className: "text-center max-w-md",
                        children: [(0, i.jsx)("div", {
                            className: "mx-auto h-20 w-20 text-gray-400 mb-6",
                            children: (0, i.jsx)("svg", {
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: (0, i.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                })
                            })
                        }), (0, i.jsx)("h3", {
                            className: "text-xl font-semibold text-gray-900 mb-3",
                            children: "Kh\xf4ng T\xecm Thấy Thiệp Cưới"
                        }), (0, i.jsx)("p", {
                            className: "text-gray-600 mb-6",
                            children: "Thiệp cưới n\xe0y c\xf3 thể kh\xf4ng tồn tại hoặc đường dẫn kh\xf4ng ch\xednh x\xe1c."
                        }), (0, i.jsx)(l(), {
                            href: "/",
                            className: "inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors",
                            children: "Về Trang Chủ"
                        })]
                    })
                });
                let Y = (null == v || null == (o = v.data) ? void 0 : o.templateId) || "songlong_red",
                    Q = I[Y] || s.v,
                    Z = F[Y] || Y,
                    ee = ({
                        songlong_red: {
                            text: "#CD5C5C",
                            bg: "#ECDFD6"
                        },
                        songlong_green: {
                            text: "#1F3A25",
                            bg: "#ECE8D6"
                        },
                        songlong_blue: {
                            text: "#253F78",
                            bg: "#E8ECD6"
                        },
                        vuonxuan_green: {
                            text: "#5d6a57",
                            bg: "#ffffff"
                        },
                        vuonxuan_red: {
                            text: "#D25F65",
                            bg: "#ffffff"
                        },
                        vuonxuan_blue: {
                            text: "#486C7D",
                            bg: "#ffffff"
                        },
                        longphung_red: {
                            text: "#e9ce9e",
                            bg: "#680e0e"
                        },
                        longphung_green: {
                            text: "#e9ce9e",
                            bg: "#162614"
                        },
                        longphung_blue: {
                            text: "#e9ce9e",
                            bg: "#0A202F"
                        },
                        longphung_black: {
                            text: "#FFC662",
                            bg: "#0a0a0a"
                        },
                        thanhdiep_green: {
                            text: "#4E6439",
                            bg: "#ffffff"
                        },
                        anhdao_pink: {
                            text: "#ba4a59",
                            bg: "#f5f5f5"
                        },
                        chibi_red: {
                            text: "#4c2d1f",
                            bg: "#fef0e0"
                        },
                        classic: {
                            text: "#CD5C5C",
                            bg: "#ECDFD6"
                        },
                        elegant: {
                            text: "#1F3A25",
                            bg: "#ECE8D6"
                        },
                        romantic: {
                            text: "#253F78",
                            bg: "#E8ECD6"
                        },
                        nature: {
                            text: "#5d6a57",
                            bg: "#ffffff"
                        },
                        redV1: {
                            text: "#e9ce9e",
                            bg: "#680e0e"
                        }
                    } [Y] || {
                        text: "#CD5C5C",
                        bg: "#ECDFD6"
                    }).text,
                    et = function () {
                        var e;
                        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        return (0, i.jsxs)(i.Fragment, {
                            children: [(0, i.jsx)(j.A, {
                                children: (0, i.jsx)(Q, {
                                    data: {
                                        ...null == v ? void 0 : v.data,
                                        musicTrackId: void 0,
                                        invitationId: null == v ? void 0 : v.id
                                    },
                                    isEditable: !1,
                                    themeId: Z,
                                    onDataChange: G
                                })
                            }), !t && (null == v || null == (e = v.data) ? void 0 : e.musicTrackId) && (0, i.jsx)(_.T, {
                                trackId: v.data.musicTrackId,
                                audioRef: P,
                                autoPlay: !0,
                                volume: .5,
                                themeColor: ee
                            })]
                        })
                    };
                return W ? (0, i.jsxs)(i.Fragment, {
                    children: [(0, i.jsx)("audio", {
                        ref: P,
                        style: {
                            display: "none"
                        }
                    }), (0, i.jsx)("div", {
                        onClick: $,
                        className: "cursor-pointer",
                        children: et()
                    }), (M || V) && (0, i.jsxs)("div", {
                        className: "fixed inset-0 z-50 flex items-center justify-center",
                        children: [(0, i.jsx)("div", {
                            className: "absolute inset-0 backdrop-blur-md bg-white/30"
                        }), (0, i.jsxs)("div", {
                            className: "relative bg-white rounded-2xl shadow-xl p-8 max-w-sm mx-4 text-center",
                            children: [(0, i.jsx)("div", {
                                className: "text-4xl mb-4",
                                children: "❤️"
                            }), (0, i.jsxs)("h3", {
                                className: "text-lg font-medium text-gray-800 mb-2",
                                children: ["Thiệp cưới của ", (null == v || null == (u = v.data) ? void 0 : u.groomName) || "Ch\xfa rể", " & ", (null == v || null == (m = v.data) ? void 0 : m.brideName) || "C\xf4 d\xe2u"]
                            }), (0, i.jsx)("p", {
                                className: "text-gray-500 text-sm",
                                children: "Thiệp cưới hiện chưa sẵn s\xe0ng. Li\xean hệ c\xf4 d\xe2u ch\xfa rể để biết th\xeam th\xf4ng tin."
                            }), (0, i.jsx)("div", {
                                className: "mt-6 pt-4 border-t border-gray-100",
                                children: (0, i.jsxs)("p", {
                                    className: "text-sm text-gray-500",
                                    children: ["Bạn muốn tạo thiệp cưới?", " ", (0, i.jsx)(l(), {
                                        href: "/?utm_source=view_limit&utm_medium=referral&utm_campaign=guest_conversion",
                                        className: "text-rose-400 hover:text-rose-500 hover:underline",
                                        children: "Bắt đầu ngay"
                                    })]
                                })
                            })]
                        })]
                    })]
                }) : (0, i.jsxs)(i.Fragment, {
                    children: [(0, i.jsx)("audio", {
                        ref: P,
                        style: {
                            display: "none"
                        }
                    }), B && (0, i.jsx)("div", {
                        style: {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            visibility: "hidden",
                            pointerEvents: "none"
                        },
                        "aria-hidden": "true",
                        children: et(!0)
                    }), (0, i.jsx)(y.m, {
                        groomName: X,
                        brideName: q,
                        weddingDate: (null == v ? void 0 : v.data) ? (0, D.hb)(v.data).date : null == v || null == (d = v.data) ? void 0 : d.date,
                        templateId: Y,
                        onOpen: () => {
                            A(), (0, N.f0)("envelope_opened", {
                                slug: h,
                                invitation_id: null == v ? void 0 : v.id,
                                is_anonymous: !0
                            })
                        },
                        audioRef: (null == v || null == (c = v.data) ? void 0 : c.musicTrackId) ? P : void 0
                    })]
                })
            }
        }
    },
    e => {
        var t = t => e(e.s = t);
        e.O(0, [8229, 2498, 6874, 3063, 6503, 8035, 4836, 5519, 1270, 8441, 1684, 7358], () => t(24231)), _N_E = e.O()
    }
]);