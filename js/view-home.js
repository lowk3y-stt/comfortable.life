/* Экран «Дом»: устройства и сценарии. */
(function () {
  'use strict';
  var CL = window.CL, U = CL.ui, L = CL.logic, h = U.h, t = U.t;

  var ROOMS = ['room.living', 'room.kitchen', 'room.bedroom', 'room.hall', 'room.other'];
  var TYPES = ['light', 'climate', 'speaker', 'plug', 'lock'];
  var ECOS = ['eco.yandex', 'eco.tuya', 'eco.xiaomi', 'eco.apple', 'eco.google', 'eco.other'];

  function stateText(d) {
    if (d.type === 'lock') return t(d.on ? 'home.locked' : 'home.unlocked');
    return t(d.on ? 'home.on' : 'home.off');
  }

  function deviceEditor(d) {
    var isNew = !d;
    var name = h('input', { type: 'text', maxlength: 60, required: true, value: d ? L.nameOf(d) : '', 'data-autofocus': true });
    var room = U.select(ROOMS.map(function (k) { return { v: k, l: t(k) }; }), d ? d.room : 'room.living');
    var type = U.select(TYPES.map(function (k) { return { v: k, l: t('type.' + k) }; }), d ? d.type : 'light');
    var eco = U.select(ECOS.map(function (k) { return { v: k, l: t(k) }; }), d ? d.eco : 'eco.other');
    U.modal({
      title: isNew ? t('home.addDevice') : L.nameOf(d),
      body: [U.field(t('home.deviceName'), name), U.field(t('home.room'), room), U.field(t('home.type'), type), U.field(t('home.eco'), eco)],
      extra: isNew ? [] : [{ label: t('common.delete'), kind: 'danger', onClick: function (close) {
        U.confirm(t('common.deleteAsk'), t('common.delete'), true).then(function (ok) { if (ok) { L.deleteDevice(d.id); close(); } });
      } }],
      onSubmit: function () {
        var v = name.value.trim(); if (!v) return false;
        var o = { name: v, room: room.value, type: type.value, eco: eco.value };
        if (isNew) L.addDevice(o); else L.updateDevice(d.id, o);
      }
    });
  }

  function sceneEditor(s) {
    var isNew = !s;
    var name = h('input', { type: 'text', maxlength: 60, required: true, value: s ? L.nameOf(s) : '', 'data-autofocus': true });
    var devs = L.devices();
    var selects = {};
    var list = h('div', { class: 'scene-list' });
    devs.forEach(function (d) {
      var sel = U.select([
        { v: '', l: t('home.skip') },
        { v: 'on', l: U.cap(t(d.type === 'lock' ? 'home.locked' : 'home.on')) },
        { v: 'off', l: U.cap(t(d.type === 'lock' ? 'home.unlocked' : 'home.off')) }
      ], (s && s.actions[d.id]) || '');
      selects[d.id] = sel;
      list.appendChild(h('label', { class: 'scene-row' }, [h('span', { text: L.nameOf(d) }), sel]));
    });
    U.modal({
      title: isNew ? t('home.addScene') : t('home.editScene'),
      body: [U.field(t('home.sceneName'), name), h('p', { class: 'muted', text: t('home.sceneHint') }), list],
      extra: isNew ? [] : [{ label: t('common.delete'), kind: 'danger', onClick: function (close) {
        U.confirm(t('common.deleteAsk'), t('common.delete'), true).then(function (ok) { if (ok) { L.deleteScene(s.id); close(); } });
      } }],
      onSubmit: function () {
        var v = name.value.trim(); if (!v) return false;
        var actions = {};
        Object.keys(selects).forEach(function (id) { if (selects[id].value) actions[id] = selects[id].value; });
        /* устройства, которых нет в текущем пространстве, остаются как были */
        if (s) Object.keys(s.actions).forEach(function (id) { if (!selects[id] && L.find(CL.store.get().devices, id)) actions[id] = s.actions[id]; });
        L.saveScene(s && s.id, v, actions);
      }
    });
  }

  function deviceCard(d) {
    var lv = L.LEVEL[d.type];
    var toggle = h('button', { type: 'button', class: 'switch', role: 'switch', 'aria-checked': d.on ? 'true' : 'false', 'aria-label': L.nameOf(d) + ': ' + stateText(d), onclick: function () { L.setDevice(d.id, !d.on); } }, h('span', { class: 'knob' }));
    var card = h('article', { class: 'device' + (d.on ? ' on' : '') }, [
      h('div', { class: 'device-top' }, [
        h('span', { class: 'device-ic' }, U.icon(d.type)),
        h('div', { class: 'device-name' }, [h('b', { text: L.nameOf(d) }), h('small', { text: t(d.eco) + ' · ' + stateText(d) })]),
        U.iconBtn('edit', t('common.edit') + ': ' + L.nameOf(d), function () { deviceEditor(d); }, 'quiet'),
        toggle
      ])
    ]);
    if (lv && d.on) {
      var val = h('output', { text: d.level + lv.unit });
      var range = h('input', { type: 'range', min: lv.min, max: lv.max, step: lv.step, value: d.level, 'aria-label': L.nameOf(d) + ': ' + t('home.level') });
      range.addEventListener('input', function () { val.textContent = range.value + lv.unit; });
      range.addEventListener('change', function () { L.setLevel(d.id, range.value); });
      card.appendChild(h('div', { class: 'level' }, [range, val]));
    }
    return card;
  }

  CL.views.home = function (root) {
    root.appendChild(U.head(t('home.title'), [U.btn(t('home.addDevice'), 'primary', function () { deviceEditor(); }, 'plus')]));

    /* сценарии */
    var scenes = L.scenes();
    var sc = h('section', { class: 'block' }, [h('div', { class: 'block-head' }, [h('h2', { text: t('home.scenes') }), U.btn(t('home.addScene'), 'soft', function () { sceneEditor(); }, 'plus')])]);
    if (scenes.length) {
      var pills = h('div', { class: 'pills' });
      scenes.forEach(function (s) {
        pills.appendChild(h('div', { class: 'pill-group' }, [
          h('button', { type: 'button', class: 'pill', onclick: function () { L.runScene(s.id); U.toast(t('home.ran', { n: L.nameOf(s) })); } }, [U.icon('sparkle'), h('span', { text: L.nameOf(s) })]),
          U.iconBtn('edit', t('home.editScene') + ': ' + L.nameOf(s), function () { sceneEditor(s); }, 'quiet')
        ]));
      });
      sc.appendChild(pills);
    } else sc.appendChild(U.empty(t('today.noScenes')));
    root.appendChild(sc);

    /* устройства по комнатам */
    var devs = L.devices();
    if (!devs.length) { root.appendChild(U.empty(t('home.empty'), U.btn(t('home.addDevice'), 'primary', function () { deviceEditor(); }, 'plus'))); return; }
    var order = ROOMS.slice();
    devs.forEach(function (d) { if (order.indexOf(d.room) < 0) order.push(d.room); });
    order.forEach(function (room) {
      var group = devs.filter(function (d) { return d.room === room; });
      if (!group.length) return;
      var grid = h('div', { class: 'devices' });
      group.forEach(function (d) { grid.appendChild(deviceCard(d)); });
      root.appendChild(h('section', { class: 'block' }, [h('h2', { class: 'room', text: t(room) }), grid]));
    });
    if (devs.some(function (d) { return d.nameKey; })) root.appendChild(h('p', { class: 'note', text: t('home.demo') }));
  };
})();
