/* [01.10] VIDEO SCRIPT */

$(document).ready(function(){ $('.video iframe').each(function(){ var scale = $(this).parents('.video').width() / 500; $(this).attr({ width: Math.floor($(this).attr('width') * scale), height: Math.floor($(this).attr('height') * scale) });});});

/* [01.11] NAVTAB SCRIPT */

function isTabCloseControl(node) { if (!node || node.nodeType !== 1) return false; if (node.tagName === "BUTTON") return true; if (node.tagName === "SPAN" && !node.className) { var icon = node.querySelector(".iconify"); if (!icon) return false; var iconName = (icon.getAttribute("data-icon") || "").toLowerCase(); return iconName.indexOf("close") !== -1 || iconName.indexOf("cross") !== -1; } return false; }

function wrapFadeInners(selector, innerClass) { document.querySelectorAll(selector).forEach(function(panel) { if (panel.querySelector("." + innerClass)) return; var inner = document.createElement("div"); inner.className = innerClass; Array.from(panel.childNodes).forEach(function(node) { if (isTabCloseControl(node)) return; inner.appendChild(node); }); panel.appendChild(inner); }); }

function replayFade(panel, innerClass) { if (!panel) return; var inner = panel.querySelector("." + innerClass); if (!inner) return; inner.style.animation = "none"; void inner.offsetWidth; inner.style.animation = ""; inner.style.display = ""; inner.style.opacity = ""; }

function openTabs(evt, tabsName) { var i, tcontent, tlinks, panel; updateBar(tabsName); if (window.closeAllPages) closeAllPages(); tcontent = document.getElementsByClassName("tcontent"); for (i = 0; i < tcontent.length; i++) { if (tcontent[i].id !== tabsName) tcontent[i].style.display = "none"; } panel = document.getElementById(tabsName); if (panel) { panel.style.display = "block"; replayFade(panel, "tcontent-inner"); } tlinks = document.getElementsByClassName("tlinks"); for (i = 0; i < tlinks.length; i++) { tlinks[i].className = tlinks[i].className.replace(" active", ""); } if (evt && evt.currentTarget) evt.currentTarget.className += " active"; }

$(document).ready(function(){ wrapFadeInners(".tcontent", "tcontent-inner"); $(document).on("click", ".tcontent > button", function(){ var $panel = $(this).closest(".tcontent"); var $inner = $panel.children(".tcontent-inner"); $panel.stop(true, true).fadeOut(400, function(){ $panel.css("display", "none"); if ($inner.length) { $inner.css({ display: "", opacity: "", animation: "" }); } }); }); });

/* [01.12] SIDEBAR + HEADER SCRIPT */

var BAR_NAMES = { home: "Home", ask: "ask", rules: "rules.txt", navi: "navigation", muses: "all muses", verses: "all verses" };

function updateBar(id) { var trail = document.getElementById("navbar-trail"); if (!trail) return; var el = (id === "home") ? null : document.getElementById(id); var bar = el ? el.getAttribute("data-bar") : null; var path = bar ? bar.split("/").map(function(x) { return x.replace(/^\s+|\s+$/g, ""); }) : [BAR_NAMES[id] || id]; var page = path[path.length - 1]; var crumbs = (id === "home") ? ["Home"] : [trail.getAttribute("data-root") || "home"].concat(path); trail.innerHTML = ""; for (var i = 0; i < crumbs.length; i++) { var c = document.createElement("div"); c.className = "navbar-crumb"; c.textContent = crumbs[i]; trail.appendChild(c); } document.getElementById("titlebar-page-name").textContent = page; document.getElementById("navbar-search-text").textContent = "Search " + page; }

function jumpTo(evt, name) { if (evt) evt.preventDefault(); var links = document.querySelectorAll(".tab-contain .tlinks"); for (var i = 0; i < links.length; i++) { var oc = links[i].getAttribute("onclick") || ""; if (oc.indexOf("'" + name + "'") !== -1) { links[i].click(); break; } } return false; }

function openHome(evt) { var i, tcontent, tlinks; updateBar("home"); if (window.closeAllPages) closeAllPages(); tcontent = document.getElementsByClassName("tcontent"); for (i = 0; i < tcontent.length; i++) { tcontent[i].style.display = "none"; } tlinks = document.getElementsByClassName("tlinks"); for (i = 0; i < tlinks.length; i++) { tlinks[i].className = tlinks[i].className.replace(" active", ""); } if (evt && evt.currentTarget) evt.currentTarget.className += " active"; }

$(document).ready(function(){ $(document).on("click", ".tcontent > button", function(){ var home = document.querySelector(".tab-contain .tlinks"); $(".tlinks").removeClass("active"); updateBar("home"); if (home) home.className += " active"; }); });

/* [01.13] MUSE TAB SCRIPT */

function openMuses(evt, tabsName) { var i, mcontent, mlinks; document.getElementById(tabsName).style.display = "block"; mcontent = document.getElementsByClassName("mcontent"); for (i = 0; i < mcontent.length; i++) { if (mcontent[i].id !== tabsName) mcontent[i].style.display = "none"; } mlinks = document.getElementsByClassName("mlinks"); for (i = 0; i < mlinks.length; i++) { mlinks[i].className = mlinks[i].className.replace(" active", ""); } evt.currentTarget.className += " active"; }

 $(document).ready(function(){ $(document).on("click", ".mcontent > button, .mcontent > span", function(){ $(".mcontent").fadeOut("slow"); }); });

/* [01.14] MUSES PANEL SCRIPT */

(function() { var w = document.getElementById("muses-wrapper"), row = document.getElementById("muses-primary-row"); if (!w || !row) return;
function slide(d) { row.scrollBy({ left: d * 250, behavior: "smooth" }); }
function press(el, fn) { el.addEventListener("click", fn); el.addEventListener("keydown", function(ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); fn(); } }); }
press(document.getElementById("muses-scroll-left"), function() { slide(-1); }); press(document.getElementById("muses-scroll-right"), function() { slide(1); });
var jumps = document.querySelectorAll("[data-scroll-to]");
for (var i = 0; i < jumps.length; i++) { (function(a) { a.addEventListener("click", function(ev) { ev.preventDefault(); var t = document.getElementById(a.getAttribute("data-scroll-to")); if (t) w.scrollTo({ top: t.getBoundingClientRect().top - w.getBoundingClientRect().top + w.scrollTop - 12, behavior: "smooth" }); }); })(jumps[i]); } })();

/* [01.15] RULES PANEL SCRIPT */

(function() { var rs = document.querySelectorAll(".rules-item"), t = document.getElementById("rules-selected-title"), b = document.getElementById("rules-selected-body"), m = document.getElementById("rules-selected-meta"), n = document.getElementById("rules-total"); if (!rs.length || !t) return; if (n) n.textContent = rs.length + (rs.length === 1 ? " item" : " items");
function pick(e) { for (var i = 0; i < rs.length; i++) { rs[i].classList.toggle("on", rs[i] === e); } t.textContent = e.getAttribute("data-t"); b.innerHTML = e.getAttribute("data-b"); m.textContent = e.getAttribute("data-g") + " \u00b7 text document"; }
for (var i = 0; i < rs.length; i++) { (function(e) { e.addEventListener("click", function() { pick(e); }); e.addEventListener("keydown", function(ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(e); } }); })(rs[i]); }
pick(rs[0]); })();

/* [01.16] NAVI PANEL SCRIPT */

(function() { var st = document.querySelectorAll("#rating-stars div"), lk = document.getElementById("like-button"), h = document.getElementById("like-heart"), c = document.getElementById("like-count"); if (!lk) return;
function rate(i) { for (var j = 0; j < st.length; j++) { st[j].classList.toggle("on", j <= i); } }
for (var i = 0; i < st.length; i++) { (function(k) { st[k].addEventListener("click", function() { rate(k); }); st[k].addEventListener("keydown", function(ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); rate(k); } }); })(i); }
var base = parseInt(c.textContent, 10) || 0, liked = false;
function toggle() { liked = !liked; lk.classList.toggle("on", liked); lk.setAttribute("aria-pressed", liked ? "true" : "false"); h.innerHTML = liked ? "&#9829;" : "&#9825;"; c.textContent = base + (liked ? 1 : 0); }
lk.addEventListener("click", toggle); lk.addEventListener("keydown", function(ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); toggle(); } }); })();

/* [01.17] MEDIA PLAYER SCRIPT */

(function() { var b = document.getElementById("player-play-pause"); if (!b) return; var f = document.getElementById("progress-fill"), n = document.getElementById("player-now"), a = document.getElementById("player-audio"), real = !!(a && a.getAttribute("src")), t = 0, id = null;
function secs(x) { var p = String(x || "").split(":"); return (parseInt(p[0], 10) || 0) * 60 + (parseInt(p[1], 10) || 0); }
var L = secs(document.getElementById("player-length").textContent) || 214;
function fmt(x) { return Math.floor(x / 60) + ":" + ("0" + Math.floor(x % 60)).slice(-2); }
function draw() { f.style.width = (t / L * 100) + "%"; n.textContent = fmt(t); }
function stop() { if (id) { clearInterval(id); id = null; } b.classList.remove("on"); }
b.addEventListener("click", function() { if (b.classList.contains("on")) { if (real) a.pause(); stop(); } else { b.classList.add("on"); if (real) { a.play(); } else { id = setInterval(function() { t = (t + 1) % L; draw(); }, 1000); } } });
if (real) { a.addEventListener("timeupdate", function() { if (a.duration) { f.style.width = (a.currentTime / a.duration * 100) + "%"; n.textContent = fmt(a.currentTime); } }); a.addEventListener("ended", function() { stop(); }); }
document.getElementById("player-previous").addEventListener("click", function() { t = 0; if (real) a.currentTime = 0; draw(); }); })();

/* [01.18] MUSE + VERSE PAGES SCRIPT */

function openPage(evt, id) { if (evt) evt.preventDefault(); var p = document.getElementById(id); if (!p) return false; $(".mcontent").not(p).stop(true, true).hide(); $(p).stop(true, true).fadeIn(300); updateBar(id); return false; }
function closeAllPages() { $(".mcontent").stop(true, true).hide(); }
function closePage(evt) { if (evt) evt.preventDefault(); var p = $(".mcontent:visible").first(); if (!p.length) return false; var back = p.attr("data-parent"); p.stop(true, true).fadeOut(250); if (back) updateBar(back); return false; }
document.addEventListener("click", function(ev) { var t = ev.target; if (!t.closest) return; var st = t.closest("[data-star-rating] > div"); if (st) { var row = st.parentNode.children, k = Array.prototype.indexOf.call(row, st); for (var i = 0; i < row.length; i++) row[i].classList.toggle("on", i <= k); return; }
var lk = t.closest("[data-like-count]"); if (lk) { var on = lk.classList.toggle("on"); lk.setAttribute("aria-pressed", on); lk.children[0].textContent = on ? "\u2665" : "\u2661"; lk.children[1].textContent = (parseInt(lk.getAttribute("data-like-count"), 10) || 0) + (on ? 1 : 0); return; }
var ca = t.closest("[data-category-toggle]"); if (ca) { var ds = ca.closest(".test-muses-scroll").querySelectorAll("details"); for (var j = 0; j < ds.length; j++) ds[j].open = ca.getAttribute("data-category-toggle") === "open"; return; }
var f = t.closest("[data-filter]"); if (f) { var sc = f.closest("[data-filter-group]"), v = f.getAttribute("data-filter"), ps = sc.querySelectorAll("[data-filter]"), its = sc.querySelectorAll("[data-filter-tags]"), m; for (m = 0; m < ps.length; m++) ps[m].classList.toggle("on", ps[m] === f); for (m = 0; m < its.length; m++) its[m].style.display = (v === "all" || (" " + its[m].getAttribute("data-filter-tags") + " ").indexOf(" " + v + " ") > -1) ? "" : "none"; } });
document.addEventListener("keydown", function(ev) { var t = ev.target; if ((ev.key === "Enter" || ev.key === " ") && t.getAttribute && t.getAttribute("role") === "button" && t.closest && (t.closest(".mcontent") || t.closest(".verses-wrapper"))) { ev.preventDefault(); t.click(); } });

