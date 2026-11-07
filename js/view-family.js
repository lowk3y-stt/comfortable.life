/* Экран «Семья» и экран «Ещё». */
(function () {
  'use strict';
  var CL = window.CL, U = CL.ui, L = CL.logic, S = CL.store, h = U.h, t = U.t;
  var COLORS = ['#6E8F5E', '#3F6B4A', '#9BB3C1', '#3C5C70', '#C9A66B', '#B87C5A', '#8C6F9C', '#D08A8A'];

  function initial(name) { return (name || '?').trim().charAt(0).toUpperCase() || '?'; }

  function editor(m) {
    var isNew = !m;
    var st = S.get();
    var name = h('input', { type: 'text', maxlength: 40, required: !(m && m.me), value: m ? m.name : '', 'data-autofocus': true });
    var color = m ? m.color : COLORS[st.members.length % COLORS.length];
    var swatches = h('div', { class: 'swatches', role: 'radiogroup', 'aria-label': t('family.color') });
    function paint() {
      Array.prototype.forEach.call(swatches.children, function (b) { b.setAttribute('aria-checked', b.dataset.c === color ? 'true' : 'false'); });
    }
    COLORS.forEach(function (c) {
      swatches.appendChild(h('button', { type: 'button', class: 'swatch', role: 'radio', 'data-c': c, style: 'background:' + c, 'aria-label': c, onclick: function () { color = c; paint(); } }));
    });
    paint();
    U.modal({
      title: isNew ? t('family.new') : t('family.edit'),
      body: [U.field(t('family.name'), name), h('div', { class: 'field' }, [h('span', { class: 'field-l', text: t('family.color') }), swatches])],
      extra: (isNew || m.me) ? [] : [{ label: t('common.delete'), kind: 'danger', onClick: function (close) {
        U.confirm(t('common.deleteAsk'), t('common.delete'), true).then(function (ok) { if (ok) { L.remove(st.members, m.id); S.save(); close(); } });
      } }],
      onSubmit: function () {
        var v = name.value.trim();
        if (isNew) { if (!v) return false; st.members.push({ id: S.uid(), name: v, color: color }); S.save(); return; }
        m.color = color;
        if (m.me) L.setMyName(v); else if (v) m.name = v;
        S.save();
      }
    });
  }

  CL.views.family = function (root) {
    var st = S.get();
    root.appendChild(U.head(t('family.title'), [U.btn(t('family.add'), 'primary', function () { editor(); }, 'plus')]));
    var list = h('div', { class: 'members' });
    st.members.forEach(function (m) {
      list.appendChild(h('button', { type: 'button', class: 'member', onclick: function () { editor(m); } }, [
        h('span', { class: 'avatar', style: 'background:' + m.color, 'aria-hidden': 'true', text: initial(m.name) }),
        h('span', { class: 'member-name', text: m.name || t('family.you') }),
        m.me ? h('span', { class: 'badge', text: t('family.you') }) : null
      ]));
    });
    root.appendChild(h('section', { class: 'block' }, [h('h2', { text: t('family.members') }), list]));
    root.appendChild(h('div', { class: 'cards two' }, [
      h('section', { class: 'card c1' }, [h('h2', { text: t('family.how') }), h('p', { text: t('family.howText') })]),
      h('section', { class: 'card c2' }, [h('h2', { text: t('nav.settings') }), h('p', { text: t('family.sync') })])
    ]));
  };

  /* «Ещё» для телефона: остальные разделы списком */
  CL.views.more = function (root) {
    root.appendChild(U.head(t('nav.more')));
    var items = [['sport', 'more.sport'], ['health', 'more.health'], ['family', 'more.family'], ['settings', 'more.settings']];
    var list = h('nav', { class: 'more-list', 'aria-label': t('nav.more') });
    items.forEach(function (it) {
      list.appendChild(h('a', { class: 'more-item', href: '#/' + it[0] }, [
        h('span', { class: 'more-ic' }, U.icon(it[0])),
        h('span', { class: 'more-t' }, [h('b', { text: t('nav.' + it[0]) }), h('small', { text: t(it[1]) })]),
        U.icon('right')
      ]));
    });
    root.appendChild(list);
  };
})();
