(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5824], {
        4994: (e, r, t) => {
            "use strict";
            t.r(r), t.d(r, {
                default: () => a
            });
            var s = t(95155),
                i = t(12115),
                n = t(6874),
                l = t.n(n);

            function a(e) {
                let {
                    error: r,
                    reset: t
                } = e;
                return (0, i.useEffect)(() => {
                    console.error("Invite page error:", r)
                }, [r]), (0, s.jsx)("div", {
                    className: "min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-4",
                    children: (0, s.jsxs)("div", {
                        className: "text-center max-w-md",
                        children: [(0, s.jsx)("div", {
                            className: "mx-auto h-16 w-16 text-rose-300 mb-5",
                            children: (0, s.jsx)("svg", {
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: (0, s.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                })
                            })
                        }), (0, s.jsx)("h3", {
                            className: "text-xl font-medium text-gray-800 mb-3",
                            children: "\xd4i! C\xf3 lỗi xảy ra"
                        }), (0, s.jsx)("p", {
                            className: "text-gray-500 mb-6 leading-relaxed",
                            children: "Kh\xf4ng thể tải thiệp cưới. Vui l\xf2ng thử lại sau \xedt ph\xfat."
                        }), (0, s.jsxs)("div", {
                            className: "flex flex-col gap-3",
                            children: [(0, s.jsx)("button", {
                                onClick: t,
                                className: "px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors",
                                children: "Thử lại"
                            }), (0, s.jsx)(l(), {
                                href: "/",
                                className: "px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors",
                                children: "Về trang chủ"
                            })]
                        }), !1]
                    })
                })
            }
        },
        31304: (e, r, t) => {
            Promise.resolve().then(t.bind(t, 4994))
        }
    },
    e => {
        var r = r => e(e.s = r);
        e.O(0, [6874, 8441, 1684, 7358], () => r(31304)), _N_E = e.O()
    }
]);