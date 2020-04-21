(function (global, undefined) {
  "use strict";

  var document = global.document
  var UnityLoader;

  UnityLoader = function () {
    var _unityLoader = {};
    _unityLoader = {
      createUnityInstance: function (canvasElement, t, n) {
        function r(e, t, n) {
          if (u.startupErrorHandler) return void u.startupErrorHandler(e, t, n);
          if (!(u.errorHandler && u.errorHandler(e, t, n) || (console.log("Invoking error handler due to\n" + e), "function" == typeof dump && dump("Invoking error handler due to\n" + e), e.indexOf("UnknownError") != -1 || e.indexOf("Program terminated with exit(0)") != -1 || r.didShowErrorMessage))) {
            var e = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + e;
            e.indexOf("DISABLE_EXCEPTION_CATCHING") != -1 ? e = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace." : e.indexOf("Cannot enlarge memory arrays") != -1 ? e = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings." : e.indexOf("Invalid array buffer length") == -1 && e.indexOf("Invalid typed array length") == -1 && e.indexOf("out of memory") == -1 && e.indexOf("could not allocate memory") == -1 || (e = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."), alert(e), r.didShowErrorMessage = !0
          }
        }

        function o(e) {
          var t = "unhandledrejection" == e.type && "object" == typeof e.reason ? e.reason : "object" == typeof e.error ? e.error : null,
            n = t ? t.toString() : "string" == typeof e.message ? e.message : "string" == typeof e.reason ? e.reason : "";
          if (t && "string" == typeof t.stack && (n += "\n" + t.stack.substring(t.stack.lastIndexOf(n, 0) ? 0 : n.length).replace(/(^\n*|\n*$)/g, "")), n && u.stackTraceRegExp && u.stackTraceRegExp.test(n)) {
            var o = e instanceof ErrorEvent ? e.filename : t && "string" == typeof t.fileName ? t.fileName : t && "string" == typeof t.sourceURL ? t.sourceURL : "",
              s = e instanceof ErrorEvent ? e.lineno : t && "number" == typeof t.lineNumber ? t.lineNumber : t && "number" == typeof t.line ? t.line : 0;
            r(n, o, s)
          }
        }

        function s(e, t) {
          if ("symbolsUrl" != e) {
            var r = u.downloadProgress[e];
            r || (r = u.downloadProgress[e] = {
              started: !1,
              finished: !1,
              lengthComputable: !1,
              total: 0,
              loaded: 0
            }), "object" != typeof t || "progress" != t.type && "load" != t.type || (r.started || (r.started = !0, r.lengthComputable = t.lengthComputable, r.total = t.total), r.loaded = t.loaded, "load" == t.type && (r.finished = !0));
            var o = 0,
              s = 0,
              a = 0,
              i = 0,
              d = 0;
            for (var e in u.downloadProgress) {
              var r = u.downloadProgress[e];
              if (!r.started) return 0;
              a++, r.lengthComputable ? (o += r.loaded, s += r.total, i++) : r.finished || d++
            }
            var c = a ? (a - d - (s ? i * (s - o) / s : 0)) / a : 0;
            n(.9 * c)
          }
        }

        function a(e) {
          return new Promise(function (t, n) {
            s(e);
            var r = u.companyName && u.productName ? new u.XMLHttpRequest({
              companyName: u.companyName,
              productName: u.productName,
              cacheControl: u.cacheControl(u[e])
            }) : new XMLHttpRequest;
            r.open("GET", u[e]), r.responseType = "arraybuffer", r.addEventListener("progress", function (t) {
              s(e, t)
            }), r.addEventListener("load", function (n) {
              s(e, n), t(new Uint8Array(r.response))
            }), r.send()
          })
        }

        function i() {
          return new Promise(function (e, t) {
            var n = document.createElement("script");
            n.src = u.frameworkUrl, n.onload = function () {
              delete n.onload, e(unityFramework)
            }, document.body.appendChild(n), u.deinitializers.push(function () {
              document.body.removeChild(n)
            })
          })
        }

        function d() {
          i().then(function (e) {
            e(u)
          });
          var e = a("dataUrl");
          u.preRun.push(function () {
            u.addRunDependency("dataUrl"), e.then(function (e) {
              var t = new DataView(e.buffer, e.byteOffset, e.byteLength),
                n = 0,
                r = "UnityWebData1.0\0";
              if (!String.fromCharCode.apply(null, e.subarray(n, n + r.length)) == r) throw "unknown data format";
              n += r.length;
              var o = t.getUint32(n, !0);
              for (n += 4; n < o;) {
                var s = t.getUint32(n, !0);
                n += 4;
                var a = t.getUint32(n, !0);
                n += 4;
                var i = t.getUint32(n, !0);
                n += 4;
                var d = String.fromCharCode.apply(null, e.subarray(n, n + i));
                n += i;
                for (var c = 0, l = d.indexOf("/", c) + 1; l > 0; c = l, l = d.indexOf("/", c) + 1) u.FS_createPath(d.substring(0, c), d.substring(c, l - 1), !0, !0);
                u.FS_createDataFile(d, null, e.subarray(s, s + a), !0, !0, !0)
              }
              u.removeRunDependency("dataUrl")
            })
          })
        }

        n = n || function () { };

        var u = {
          canvas: canvasElement,
          webglContextAttributes: {
            preserveDrawingBuffer: !1
          },
          cacheControl: function (e) {
            return e == u.dataUrl ? "must-revalidate" : "no-store"
          },
          streamingAssetsUrl: "StreamingAssets",
          downloadProgress: {},
          deinitializers: [],
          intervals: {},
          setInterval: function (e, t) {
            var n = window.setInterval(e, t);
            return this.intervals[n] = !0, n
          },
          clearInterval: function (e) {
            delete this.intervals[e], window.clearInterval(e)
          },
          preRun: [],
          postRun: [],
          print: function (e) {
            console.log(e)
          },
          printErr: function (e) {
            console.error(e)
          },
          locateFile: function (e) {
            return "build.wasm" == e ? this.codeUrl : e
          },
          disabledCanvasEvents: ["contextmenu", "dragstart"]
        };

        for (var c in t) u[c] = t[c];

        u.streamingAssetsUrl = new URL(u.streamingAssetsUrl, document.URL).href, u.disabledCanvasEvents.forEach(function (t) {
          canvasElement.addEventListener(t, function (e) {
            e.preventDefault()
          })
        });

        var l = {
          Module: u,
          SetFullscreen: function () {
            return u.SetFullscreen ? u.SetFullscreen.apply(u, arguments) : void u.print("Failed to set Fullscreen mode: Player not loaded yet.")
          },
          SendMessage: function () {
            return u.SendMessage ? u.SendMessage.apply(u, arguments) : void u.print("Failed to execute SendMessage: Player not loaded yet.")
          },
          Quit: function () {
            return new Promise(function (e, t) {
              u.shouldQuit = !0, u.onQuit = e
            })
          }
        };

        return u.SystemInfo = function () {
          var e, t, n, r = "-",
            o = navigator.appVersion,
            s = navigator.userAgent,
            a = navigator.appName,
            i = navigator.appVersion,
            d = parseInt(navigator.appVersion, 10);
          (t = s.indexOf("Opera")) != -1 ? (a = "Opera", i = s.substring(t + 6), (t = s.indexOf("Version")) != -1 && (i = s.substring(t + 8))) : (t = s.indexOf("MSIE")) != -1 ? (a = "Microsoft Internet Explorer", i = s.substring(t + 5)) : (t = s.indexOf("Edge")) != -1 ? (a = "Edge", i = s.substring(t + 5)) : (t = s.indexOf("Chrome")) != -1 ? (a = "Chrome", i = s.substring(t + 7)) : (t = s.indexOf("Safari")) != -1 ? (a = "Safari", i = s.substring(t + 7), (t = s.indexOf("Version")) != -1 && (i = s.substring(t + 8))) : (t = s.indexOf("Firefox")) != -1 ? (a = "Firefox", i = s.substring(t + 8)) : s.indexOf("Trident/") != -1 ? (a = "Microsoft Internet Explorer", i = s.substring(s.indexOf("rv:") + 3)) : (e = s.lastIndexOf(" ") + 1) < (t = s.lastIndexOf("/")) && (a = s.substring(e, t), i = s.substring(t + 1), a.toLowerCase() == a.toUpperCase() && (a = navigator.appName)), (n = i.indexOf(";")) != -1 && (i = i.substring(0, n)), (n = i.indexOf(" ")) != -1 && (i = i.substring(0, n)), (n = i.indexOf(")")) != -1 && (i = i.substring(0, n)), d = parseInt("" + i, 10), isNaN(d) ? (i = "" + parseFloat(navigator.appVersion), d = parseInt(navigator.appVersion, 10)) : i = "" + parseFloat(i);
          var u = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(o),
            c = r,
            l = [{
              s: "Windows 3.11",
              r: /Win16/
            }, {
              s: "Windows 95",
              r: /(Windows 95|Win95|Windows_95)/
            }, {
              s: "Windows ME",
              r: /(Win 9x 4.90|Windows ME)/
            }, {
              s: "Windows 98",
              r: /(Windows 98|Win98)/
            }, {
              s: "Windows CE",
              r: /Windows CE/
            }, {
              s: "Windows 2000",
              r: /(Windows NT 5.0|Windows 2000)/
            }, {
              s: "Windows XP",
              r: /(Windows NT 5.1|Windows XP)/
            }, {
              s: "Windows Server 2003",
              r: /Windows NT 5.2/
            }, {
              s: "Windows Vista",
              r: /Windows NT 6.0/
            }, {
              s: "Windows 7",
              r: /(Windows 7|Windows NT 6.1)/
            }, {
              s: "Windows 8.1",
              r: /(Windows 8.1|Windows NT 6.3)/
            }, {
              s: "Windows 8",
              r: /(Windows 8|Windows NT 6.2)/
            }, {
              s: "Windows 10",
              r: /(Windows 10|Windows NT 10.0)/
            }, {
              s: "Windows NT 4.0",
              r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
            }, {
              s: "Windows ME",
              r: /Windows ME/
            }, {
              s: "Android",
              r: /Android/
            }, {
              s: "Open BSD",
              r: /OpenBSD/
            }, {
              s: "Sun OS",
              r: /SunOS/
            }, {
              s: "Linux",
              r: /(Linux|X11)/
            }, {
              s: "iOS",
              r: /(iPhone|iPad|iPod)/
            }, {
              s: "Mac OS X",
              r: /Mac OS X/
            }, {
              s: "Mac OS",
              r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
            }, {
              s: "QNX",
              r: /QNX/
            }, {
              s: "UNIX",
              r: /UNIX/
            }, {
              s: "BeOS",
              r: /BeOS/
            }, {
              s: "OS/2",
              r: /OS\/2/
            }, {
              s: "Search Bot",
              r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }];
          for (var f in l) {
            var p = l[f];
            if (p.r.test(s)) {
              c = p.s;
              break
            }
          }
          var h = r;
          switch (/Windows/.test(c) && (h = /Windows (.*)/.exec(c)[1], c = "Windows"), c) {
            case "Mac OS X":
              h = /Mac OS X (10[\.\_\d]+)/.exec(s)[1];
              break;
            case "Android":
              h = /Android ([\.\_\d]+)/.exec(s)[1];
              break;
            case "iOS":
              h = /OS (\d+)_(\d+)_?(\d+)?/.exec(o), h = h[1] + "." + h[2] + "." + (0 | h[3])
          }
          return {
            width: screen.width ? screen.width : 0,
            height: screen.height ? screen.height : 0,
            browser: a,
            browserVersion: i,
            mobile: u,
            os: c,
            osVersion: h,
            gpu: function () {
              var e = document.createElement("canvas"),
                t = e.getContext("experimental-webgl");
              if (t) {
                var n = t.getExtension("WEBGL_debug_renderer_info");
                if (n) return t.getParameter(n.UNMASKED_RENDERER_WEBGL)
              }
              return r
            }(),
            language: window.navigator.userLanguage || window.navigator.language,
            hasWebGL: function () {
              if (!window.WebGLRenderingContext) return 0;
              var e = document.createElement("canvas"),
                t = e.getContext("webgl2");
              return t ? 2 : (t = e.getContext("experimental-webgl2"), t ? 2 : (t = e.getContext("webgl"), t || (t = e.getContext("experimental-webgl")) ? 1 : 0))
            }(),
            hasCursorLock: function () {
              var e = document.createElement("canvas");
              return e.requestPointerLock || e.mozRequestPointerLock || e.webkitRequestPointerLock || e.msRequestPointerLock ? 1 : 0
            }(),
            hasFullscreen: function () {
              var e = document.createElement("canvas");
              return (e.requestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen || e.webkitRequestFullScreen) && (a.indexOf("Safari") == -1 || i >= 10.1) ? 1 : 0
            }(),
            hasThreads: "undefined" != typeof SharedArrayBuffer,
            hasWasm: "object" == typeof WebAssembly && "function" == typeof WebAssembly.validate && "function" == typeof WebAssembly.compile,
            hasWasmThreads: function () {
              if ("object" != typeof WebAssembly) return !1;
              if ("undefined" == typeof SharedArrayBuffer) return !1;
              var e = new WebAssembly.Memory({
                initial: 1,
                maximum: 1,
                shared: !0
              }),
                t = e.buffer instanceof SharedArrayBuffer;
              //return delete e, t
              e = null;
              t = null;
              return;
            }()
          }
        }(), u.abortHandler = function (e) {
          return r(e, "", 0), !0
        }, window.addEventListener("error", o), window.addEventListener("unhandledrejection", o), Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50), u.XMLHttpRequest = function () {
          function e(e) {
            console.log("[UnityCache] " + e)
          }

          function t(e) {
            return t.link = t.link || document.createElement("a"), t.link.href = e, t.link.href
          }

          function n(e) {
            var t = window.location.href.match(/^[a-z]+:\/\/[^\/]+/);
            return !t || e.lastIndexOf(t[0], 0)
          }

          function r() {
            function t(t) {
              if ("undefined" == typeof r.database)
                for (r.database = t, r.database || e("indexedDB database could not be opened"); r.queue.length;) {
                  var n = r.queue.shift();
                  r.database ? r.execute.apply(r, n) : "function" == typeof n.onerror && n.onerror(new Error("operation cancelled"))
                }
            }

            function n() {
              var e = o.open(a.name, a.version);
              e.onupgradeneeded = function (e) {
                var t = e.target.result;
                t.objectStoreNames.contains(d.name) || t.createObjectStore(d.name)
              }, e.onsuccess = function (e) {
                t(e.target.result)
              }, e.onerror = function () {
                t(null)
              }
            }
            var r = this;
            r.queue = [];
            try {
              var o = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
                s = o.open(a.name);
              s.onupgradeneeded = function (e) {
                var t = e.target.result.createObjectStore(i.name, {
                  keyPath: "url"
                });
                ["version", "company", "product", "updated", "revalidated", "accessed"].forEach(function (e) {
                  t.createIndex(e, e)
                })
              }, s.onsuccess = function (e) {
                var r = e.target.result;
                r.version < a.version ? (r.close(), n()) : t(r)
              }, s.onerror = function () {
                t(null)
              }
            } catch (e) {
              t(null)
            }
          }

          function o(e, t, n, r, o) {
            var s = {
              url: e,
              version: i.version,
              company: t,
              product: n,
              updated: r,
              revalidated: r,
              accessed: r,
              responseHeaders: {},
              xhr: {}
            };
            return o && (["Last-Modified", "ETag"].forEach(function (e) {
              s.responseHeaders[e] = o.getResponseHeader(e)
            }), ["responseURL", "status", "statusText", "response"].forEach(function (e) {
              s.xhr[e] = o[e]
            })), s
          }

          function s(t) {
            this.cache = {
              enabled: !1
            }, t && (this.cache.control = t.cacheControl, this.cache.company = t.companyName, this.cache.product = t.productName), this.xhr = new XMLHttpRequest(t), this.xhr.addEventListener("load", function () {
              var t = this.xhr,
                n = this.cache;
              n.enabled && !n.revalidated && (304 == t.status ? (n.result.revalidated = n.result.accessed, n.revalidated = !0, u.execute(i.name, "put", [n.result]), e("'" + n.result.url + "' successfully revalidated and served from the indexedDB cache")) : 200 == t.status ? (n.result = o(n.result.url, n.company, n.product, n.result.accessed, t), n.revalidated = !0, u.execute(i.name, "put", [n.result], function (t) {
                e("'" + n.result.url + "' successfully downloaded and stored in the indexedDB cache")
              }, function (t) {
                e("'" + n.result.url + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + t)
              })) : e("'" + n.result.url + "' request failed with status: " + t.status + " " + t.statusText))
            }.bind(this))
          }
          var a = {
            name: "UnityCache",
            version: 2
          },
            i = {
              name: "XMLHttpRequest",
              version: 1
            },
            d = {
              name: "WebAssembly",
              version: 1
            };
          r.prototype.execute = function (e, t, n, r, o) {
            if (this.database) try {
              var s = this.database.transaction([e], ["put", "delete", "clear"].indexOf(t) != -1 ? "readwrite" : "readonly").objectStore(e);
              "openKeyCursor" == t && (s = s.index(n[0]), n = n.slice(1));
              var a = s[t].apply(s, n);
              "function" == typeof r && (a.onsuccess = function (e) {
                r(e.target.result)
              }), a.onerror = o
            } catch (e) {
              "function" == typeof o && o(e)
            } else "undefined" == typeof this.database ? this.queue.push(arguments) : "function" == typeof o && o(new Error("indexedDB access denied"))
          };
          var u = new r;
          s.prototype.send = function (t) {
            var r = this.xhr,
              o = this.cache,
              s = arguments;
            return o.enabled = o.enabled && "arraybuffer" == r.responseType && !t, o.enabled ? void u.execute(i.name, "get", [o.result.url], function (t) {
              if (!t || t.version != i.version) return void r.send.apply(r, s);
              if (o.result = t, o.result.accessed = Date.now(), "immutable" == o.control) o.revalidated = !0, u.execute(i.name, "put", [o.result]), r.dispatchEvent(new Event("load")), e("'" + o.result.url + "' served from the indexedDB cache without revalidation");
              else if (n(o.result.url) && (o.result.responseHeaders["Last-Modified"] || o.result.responseHeaders.ETag)) {
                var a = new XMLHttpRequest;
                a.open("HEAD", o.result.url), a.onload = function () {
                  o.revalidated = ["Last-Modified", "ETag"].every(function (e) {
                    return !o.result.responseHeaders[e] || o.result.responseHeaders[e] == a.getResponseHeader(e)
                  }), o.revalidated ? (o.result.revalidated = o.result.accessed, u.execute(i.name, "put", [o.result]), r.dispatchEvent(new Event("load")), e("'" + o.result.url + "' successfully revalidated and served from the indexedDB cache")) : r.send.apply(r, s)
                }, a.send()
              } else o.result.responseHeaders["Last-Modified"] ? (r.setRequestHeader("If-Modified-Since", o.result.responseHeaders["Last-Modified"]), r.setRequestHeader("Cache-Control", "no-cache")) : o.result.responseHeaders.ETag && (r.setRequestHeader("If-None-Match", o.result.responseHeaders.ETag), r.setRequestHeader("Cache-Control", "no-cache")), r.send.apply(r, s)
            }, function (e) {
              r.send.apply(r, s)
            }) : r.send.apply(r, s)
          }, s.prototype.open = function (e, n, r, s, a) {
            return this.cache.result = o(t(n), this.cache.company, this.cache.product, Date.now()), this.cache.enabled = ["must-revalidate", "immutable"].indexOf(this.cache.control) != -1 && "GET" == e && this.cache.result.url.match("^https?://") && ("undefined" == typeof r || r) && "undefined" == typeof s && "undefined" == typeof a, this.cache.revalidated = !1, this.xhr.open.apply(this.xhr, arguments)
          }, s.prototype.setRequestHeader = function (e, t) {
            return this.cache.enabled = !1, this.xhr.setRequestHeader.apply(this.xhr, arguments)
          };
          var c = new XMLHttpRequest;
          for (var l in c) s.prototype.hasOwnProperty(l) || ! function (e) {
            Object.defineProperty(s.prototype, e, "function" == typeof c[e] ? {
              value: function () {
                return this.xhr[e].apply(this.xhr, arguments)
              }
            } : {
                get: function () {
                  return this.cache.revalidated && this.cache.result.xhr.hasOwnProperty(e) ? this.cache.result.xhr[e] : this.xhr[e]
                },
                set: function (t) {
                  this.xhr[e] = t
                }
              })
          }(l);
          return s
        }(), new Promise(function (e, t) {
          u.SystemInfo.hasWebGL ? u.SystemInfo.hasWasm ? (1 == u.SystemInfo.hasWebGL && u.print('Warning: Your browser does not support "WebGL 2.0" Graphics API, switching to "WebGL 1.0"'), u.startupErrorHandler = t, n(0), u.postRun.push(function () {
            n(1), delete u.startupErrorHandler, e(l)
          }), d()) : t("Your browser does not support WebAssembly.") : t("Your browser does not support WebGL.")
        })
      }
    };

    return {
      createUnityInstance: function (e, t, n) { return _unityLoader.createUnityInstance(e, t, n); },
      init: _unityLoader.init,
    };
  };

  // AMD and window support
  if (typeof define === "function") {
    define([], function () { return new UnityLoader(); });
  } else if (typeof global.UnityLoader === "undefined") {
    global.unityLoader = new UnityLoader();
  }

}(window));
