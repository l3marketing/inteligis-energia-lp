import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function injectScript(src: string): void {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function injectInline(code: string): void {
  const s = document.createElement("script");
  s.text = code;
  document.head.appendChild(s);
}

let gtm = "";
let ga4 = "";
let metaPixel = "";
let tiktokPixel = "";
let statuses: Record<string, boolean> = {};
try {
  const raw = localStorage.getItem("inteligis:integrations");
  if (raw) {
    const cfg = JSON.parse(raw);
    gtm = cfg.gtmCode || "";
    ga4 = cfg.ga4Id || "";
    metaPixel = cfg.metaPixelId || "";
    tiktokPixel = cfg.tiktokPixel || "";
    statuses = cfg.statuses || {};
  }
} catch {}

if (gtm && statuses.gtm) {
  injectInline(`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`);
}

if (ga4 && statuses.ga) {
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${ga4}`);
  injectInline(`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${ga4}');`);
}

if (metaPixel && statuses.metaPixel) {
  injectInline(`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`);
}

if (tiktokPixel && statuses.tiktok) {
  injectInline(`(function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++){ttq.setAndDefer(ttq,ttq.methods[i])}ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++){ttq.setAndDefer(e,ttq.methods[n])}return e};ttq.load=function(e,n){var i='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=Date.now();ttq._o=ttq._o||{};ttq._o[e]=n||{};var a=d.createElement('script');a.type='text/javascript';a.async=true;a.src=i+'?sdkid='+e+'&lib='+t;var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(a,s)};ttq.load('${tiktokPixel}');ttq.page();})(window,document,'ttq');`);
}

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");
if (redirect) {
  history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")!).render(<App />);
