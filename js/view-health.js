/* Экран «Здоровье»: вода, сон, шаги, настроение. Личный дневник привычек. */
(function () {
  'use strict';
  var CL = window.CL, U = CL.ui, L = CL.logic, S = CL.store, h = U.h, t = U.t;

  function editor() {
    var today = S.dateKey(), cur = L.readHealth(today);
    var sleep = h('input', { type: 'number', min: 0, max: 24, step: 0.5, inputmode: 'decimal', value: cur.sleep || '', 'data-autofocus': true });
    var steps = h('input', { type: 'number', min: 0, max: 200000, step: 1, inputmode: 'numeric', value: cur.steps || '' });
    U.modal({
      title: t('health.edit'),
      body: [U.field(t('health.sleepField'), sleep), U.field(t('health.stepsField'), steps)],
      onSubmit: function () {
        L.setHealth(today, { sleep: L.clamp(sleep.value || 0, 0, 24), steps: Math.round(L.clamp(steps.value || 0, 0, 200000)) });
      }
    });
  }

  function meter(iconName, label, value, goal, text) {
    return h('div', { class: 'meter' }, [
      h('div', { class: 'meter-top' }, [h('span', { class: 'meter-l' }, [U.icon(iconName), h('span', { text: label })]), h('b', { text: text })]),
      h('div', { class: 'meter-bar', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(goal), 'aria-valuenow': String(Math.min(value, goal)), 'aria-label': label }, h('i', { style: 'width:' + Math.min(100, value / Math.max(1, goal) * 100).toFixed(1) + '%' }))
    ]);
  }

  CL.views.health = function (root) {
    var st = S.get(), today = S.dateKey(), hd = L.readHealth(today), loc = CL.i18n.locale();
    root.appendChild(U.head(t('health.title'), [U.btn(t('health.edit'), 'soft', editor, 'edit')]));

    /* вода */
    var drops = h('div', { class: 'drops', role: 'group', 'aria-label': t('health.water') });
    for (var i = 0; i < st.goals.water; i++) {
      (function (i) {
        var filled = i < hd.water;
        drops.appendChild(h('button', {
          type: 'button', class: 'drop' + (filled ? ' on' : ''), 'aria-pressed': filled ? 'true' : 'false',
          'aria-label': t('health.water') + ' ' + (i + 1),
          onclick: function () { L.setHealth(today, { water: (hd.water === i + 1 ? i : i + 1) }); }
        }, U.icon('water')));
      })(i);
    }
    var waterCard = h('section', { class: 'card c1' }, [
      h('div', { class: 'card-head' }, [h('h2', { text: t('health.water') }), h('b', { class: 'big-n', text: hd.water + ' ' + t('today.waterOf', { n: st.goals.water }) })]),
      drops,
      h('div', { class: 'stepper' }, [U.iconBtn('minus', t('health.minus'), function () { L.addWater(-1); }), U.iconBtn('plus', t('health.plus'), function () { L.addWater(1); }, 'primary')])
    ]);

    /* сон и шаги */
    var sleepSteps = h('section', { class: 'card c2' }, [
      h('div', { class: 'card-head' }, [h('h2', { text: t('health.sleep') + ' · ' + t('health.steps') })]),
      meter('moon', t('health.sleep'), hd.sleep, st.goals.sleep, (hd.sleep || 0) + ' ' + t('health.hours')),
      meter('steps', t('health.steps'), hd.steps, st.goals.steps, hd.steps.toLocaleString(loc))
    ]);

    /* настроение */
    var moods = h('div', { class: 'moods', role: 'group', 'aria-label': t('health.mood') });
    for (var m = 1; m <= 5; m++) {
      (function (m) {
        moods.appendChild(h('button', {
          type: 'button', class: 'mood m' + m + (hd.mood === m ? ' on' : ''), 'aria-pressed': hd.mood === m ? 'true' : 'false',
          onclick: function () { L.setHealth(today, { mood: hd.mood === m ? 0 : m }); }
        }, [U.icon('mood' + m, 30), h('span', { text: t('mood.' + m) })]));
      })(m);
    }
    var moodCard = h('section', { class: 'card c3' }, [h('div', { class: 'card-head' }, [h('h2', { text: t('health.mood') })]), moods]);

    root.appendChild(h('div', { class: 'cards two' }, [waterCard, sleepSteps]));
    root.appendChild(moodCard);

    /* динамика */
    var labels = L.lastDays(7).map(function (d) { return U.fmt(d, { weekday: 'short' }); });
    var charts = h('div', { class: 'cards three' }, [
      h('section', { class: 'card' }, [h('div', { class: 'card-head' }, [h('h2', { text: t('health.water') })]), U.bars({ values: L.healthSeries('water'), labels: labels, goal: st.goals.water, label: t('health.water') + ' — ' + t('health.chart') })]),
      h('section', { class: 'card' }, [h('div', { class: 'card-head' }, [h('h2', { text: t('health.sleep') })]), U.bars({ values: L.healthSeries('sleep'), labels: labels, goal: st.goals.sleep, label: t('health.sleep') + ' — ' + t('health.chart') })]),
      h('section', { class: 'card' }, [h('div', { class: 'card-head' }, [h('h2', { text: t('health.steps') })]), U.bars({ values: L.healthSeries('steps'), labels: labels, goal: st.goals.steps, label: t('health.steps') + ' — ' + t('health.chart'), fmt: function (v) { return v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(v); } })])
    ]);
    root.appendChild(h('h2', { class: 'section-title', text: t('health.chart') }));
    root.appendChild(charts);
    root.appendChild(h('p', { class: 'note', text: t('health.note') }));
  };
})();
