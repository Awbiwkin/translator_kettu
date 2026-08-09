(function () {
  function dump() {
    var g = typeof globalThis !== "undefined" ? globalThis : this;
    var names = [
      "vendetta", "bunny", "kettu", "revenge", "nexxus",
      "__vendetta_loader", "__bunny_loader", "__kettu_loader"
    ];
    var lines = [];
    for (var i = 0; i < names.length; i++) {
      var o = g[names[i]];
      if (!o) continue;
      var keys = [];
      try { keys = Object.keys(o).slice(0, 30); } catch (e) { keys = ["<нет доступа>"]; }
      lines.push(names[i] + ":\n  " + keys.join(", "));
      // если есть вложенный api — покажем и его
      try {
        if (o.api && typeof o.api === "object") {
          lines.push(names[i] + ".api:\n  " + Object.keys(o.api).slice(0, 30).join(", "));
        }
      } catch (e) {}
    }
    return lines.length ? lines.join("\n\n") : "ни одного глобала мода не найдено";
  }

  var plugin = {
    onLoad: function () {
      var msg = "DIAG OK. Плагин загрузился.\n\n" + dump();
      try { alert(msg); return; } catch (e) {}
      try { console.log("[DIAG] " + msg); } catch (e) {}
    },
    onUnload: function () {}
  };

  plugin.default = plugin;
  try { if (typeof module !== "undefined" && module) module.exports = plugin; } catch (e) {}
  try { if (typeof exports !== "undefined" && exports) exports.default = plugin; } catch (e) {}
  try { globalThis.vendetta_plugin = plugin; } catch (e) {}
  return plugin;
})()
