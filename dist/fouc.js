function d(e = {}) {
  const t = e.storageKey ?? "uikit-theme", r = e.defaultTheme ?? "base", c = e.defaultMode ?? "light", a = e.detectSystem ?? !0;
  return [
    "(function(){try{",
    "var k=" + JSON.stringify(t) + ";",
    "var dt=" + JSON.stringify(r) + ";",
    "var dm=" + JSON.stringify(c) + ";",
    "var ds=" + (a ? "true" : "false") + ";",
    "var t=dt,m=dm;",
    "var s=null;try{s=localStorage.getItem(k);}catch(e){}",
    'if(s){try{var p=JSON.parse(s);if(p&&p.theme)t=p.theme;if(p&&(p.mode==="light"||p.mode==="dark"))m=p.mode;}catch(e){}}',
    'else if(ds&&window.matchMedia){m=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}',
    "var r=document.documentElement;",
    "var cl=r.classList;",
    'cl.remove("light","dark");',
    'for(var i=cl.length-1;i>=0;i--){var c=cl[i];if(c.indexOf("theme-")===0)cl.remove(c);}',
    'cl.add(m);cl.add("theme-"+t);',
    "}catch(e){}})();"
  ].join("");
}
function i(e = {}) {
  return "<script>" + d(e) + "<\/script>";
}
export {
  d as foucScript,
  i as foucScriptTag
};
//# sourceMappingURL=fouc.js.map
