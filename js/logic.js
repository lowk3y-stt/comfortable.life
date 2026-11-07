/* Comfortable life — действия над данными. Ими пользуются и экраны, и ассистент. */
(function () {
  'use strict';
  var CL = (window.CL = window.CL || {});

  function st() { return CL.store.get(); }
  function save() { CL.store.save(); }
  function t(k, v) { return CL.i18n.t(k, v); }
  function uid() { return CL.store.uid(); }
  function find(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function remove(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) { list.splice(i, 1); return true; } return false; }
  function clamp(n, a, b) { n = Number(n); if (!isFinite(n)) n = a; return Math.max(a, Math.min(b, n)); }
  function nameOf(o) { return (o && (o.name || (o.nameKey ? t(o.nameKey) : ''))) || ''; }

  /* Пространство: «Личное» или «Семья».
     Заметки и события видны только в том пространстве, где созданы.
     Устройства и сценарии без пометки видны в обоих (примеры), созданные вручную — в своём. */
  function inSpace(item, shared) {
    var sp = st().space;
    if (shared) return !item.space || item.space === sp;
    return (item.space || 'personal') === sp;
  }

  /* ---------- дом ---------- */
  var LEVEL = {
    light: { min: 0, max: 100, step: 5, unit: '%', def: 70 },
    speaker: { min: 0, max: 100, step: 5, unit: '%', def: 30 },
    climate: { min: 16, max: 30, step: 1, unit: '°', def: 22 }
  };
  function devices() { return st().devices.filter(function (d) { return inSpace(d, true); }); }
  function scenes() { return st().scenes.filter(function (s) { return inSpace(s, true); }); }
  function setDevice(id, on) { var d = find(st().devices, id); if (!d) return null; d.on = !!on; save(); return d; }
  function setLevel(id, v) {
    var d = find(st().devices, id), r = d && LEVEL[d.type];
    if (!d || !r) return null;
    d.level = clamp(v, r.min, r.max); save(); return d;
  }
  function addDevice(o) {
    var d = { id: uid(), name: o.name, room: o.room, type: o.type, eco: o.eco, on: false, space: st().space };
    if (LEVEL[o.type]) d.level = LEVEL[o.type].def;
    st().devices.push(d); save(); return d;
  }
  function updateDevice(id, o) {
    var d = find(st().devices, id); if (!d) return;
    if (o.name !== nameOf(d)) { d.name = o.name; delete d.nameKey; }
    d.room = o.room; d.eco = o.eco;
    if (d.type !== o.type) { d.type = o.type; if (LEVEL[o.type]) d.level = LEVEL[o.type].def; else delete d.level; }
    save();
  }
  function deleteDevice(id) {
    remove(st().devices, id);
    st().scenes.forEach(function (s) { delete s.actions[id]; });
    save();
  }
  function runScene(id) {
    var s = find(st().scenes, id); if (!s) return null;
    Object.keys(s.actions).forEach(function (did) {
      var d = find(st().devices, did);
      if (d) d.on = s.actions[did] === 'on';
    });
    save(); return s;
  }
  function saveScene(id, name, actions) {
    var s = id && find(st().scenes, id);
    if (s) { if (name !== nameOf(s)) { s.name = name; delete s.nameKey; } s.actions = actions; }
    else st().scenes.push({ id: uid(), name: name, actions: actions, space: st().space });
    save();
  }
  function deleteScene(id) { remove(st().scenes, id); save(); }

  /* ---------- заметки ---------- */
  function notes() {
    return st().notes.filter(function (n) { return inSpace(n, false); }).sort(function (a, b) {
      return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (b.ts || 0) - (a.ts || 0);
    });
  }
  function addNote(o) {
    var n = { id: uid(), title: o.title || '', text: o.text || '', pinned: !!o.pinned, space: st().space, ts: Date.now() };
    st().notes.push(n); save(); return n;
  }
  function updateNote(id, o) {
    var n = find(st().notes, id); if (!n) return;
    n.title = o.title; n.text = o.text; n.pinned = !!o.pinned; n.ts = Date.now(); save();
  }
  function deleteNote(id) { remove(st().notes, id); save(); }

  /* ---------- календарь ---------- */
  function events() { return st().events.filter(function (e) { return inSpace(e, false); }); }
  function eventsOn(key) {
    return events().filter(function (e) { return e.date === key; }).sort(function (a, b) {
      return (a.time || '').localeCompare(b.time || '');
    });
  }
  function addEvent(o) {
    var e = { id: uid(), title: o.title, date: o.date, time: o.time || '', space: st().space };
    st().events.push(e); save(); return e;
  }
  function updateEvent(id, o) {
    var e = find(st().events, id); if (!e) return;
    e.title = o.title; e.date = o.date; e.time = o.time || ''; save();
  }
  function deleteEvent(id) { remove(st().events, id); save(); }

  /* ---------- спорт ---------- */
  function addWorkout(o) {
    var w = { id: uid(), type: o.type, min: Math.round(clamp(o.min, 1, 1440)), kcal: o.kcal ? Math.round(clamp(o.kcal, 0, 20000)) : 0, date: o.date || CL.store.dateKey(), ts: Date.now() };
    st().workouts.push(w); save(); return w;
  }
  function deleteWorkout(id) { remove(st().workouts, id); save(); }
  function lastDays(n) {
    var out = [], today = new Date();
    for (var i = n - 1; i >= 0; i--) out.push(CL.store.addDays(today, -i));
    return out;
  }
  function weekStats() {
    var S = CL.store, start = S.weekStart(new Date()), keys = [];
    for (var i = 0; i < 7; i++) keys.push(S.dateKey(S.addDays(start, i)));
    var r = { count: 0, minutes: 0, kcal: 0 };
    st().workouts.forEach(function (w) {
      if (keys.indexOf(w.date) > -1) { r.count++; r.minutes += w.min || 0; r.kcal += w.kcal || 0; }
    });
    return r;
  }
  function minutesPerDay() {
    return lastDays(7).map(function (d) {
      var key = CL.store.dateKey(d), m = 0;
      st().workouts.forEach(function (w) { if (w.date === key) m += w.min || 0; });
      return m;
    });
  }

  /* ---------- здоровье ---------- */
  function readHealth(key) {
    var h = st().health[key || CL.store.dateKey()] || {};
    return { water: h.water || 0, sleep: h.sleep || 0, steps: h.steps || 0, mood: h.mood || 0 };
  }
  function setHealth(key, patch) {
    var h = CL.store.dayHealth(key);
    Object.keys(patch).forEach(function (k) { h[k] = patch[k]; });
    save();
  }
  function addWater(delta, key) {
    key = key || CL.store.dateKey();
    var h = CL.store.dayHealth(key);
    h.water = clamp((h.water || 0) + delta, 0, 30); save();
    return h.water;
  }
  function healthSeries(field) {
    return lastDays(7).map(function (d) { return readHealth(CL.store.dateKey(d))[field]; });
  }

  /* ---------- семья ---------- */
  function me() { var m = st().members; for (var i = 0; i < m.length; i++) if (m[i].me) return m[i]; return m[0]; }
  function setMyName(name) { st().profile.name = name; me().name = name; }

  CL.logic = {
    find: find, remove: remove, clamp: clamp, nameOf: nameOf, inSpace: inSpace, LEVEL: LEVEL,
    devices: devices, scenes: scenes, setDevice: setDevice, setLevel: setLevel, addDevice: addDevice, updateDevice: updateDevice, deleteDevice: deleteDevice,
    runScene: runScene, saveScene: saveScene, deleteScene: deleteScene,
    notes: notes, addNote: addNote, updateNote: updateNote, deleteNote: deleteNote,
    events: events, eventsOn: eventsOn, addEvent: addEvent, updateEvent: updateEvent, deleteEvent: deleteEvent,
    addWorkout: addWorkout, deleteWorkout: deleteWorkout, weekStats: weekStats, minutesPerDay: minutesPerDay, lastDays: lastDays,
    readHealth: readHealth, setHealth: setHealth, addWater: addWater, healthSeries: healthSeries,
    me: me, setMyName: setMyName
  };
})();
