/* Экран «Сегодня». */
(function () {
  'use strict';
  var CL = window.CL, U = CL.ui, L = CL.logic, S = CL.store, h = U.h, t = U.t;

  function eventRow(e) {
    return h('button', { type: 'button', class: 'row', onclick: function () { CL.actions.editEvent(e.id); } }, [
      h('span', { class: 'row-time', text: e.time || t('cal.allDay') }),
      h('span', { class: 'row-main', text: e.title })
    ]);
  }

  CL.views.today = function (root) {
    var st = S.get(), now = new Date();
    var todayKey = S.dateKey(now), tomorrowKey = S.dateKey(S.addDays(now, 1));
    var hr = now.getHours();
    var g = hr < 5 ? 'night' : hr < 12 ? 'morning' : hr < 18 ? 'day' : 'evening';
    var name = st.profile.name;
    var evToday = L.eventsOn(todayKey), evTomorrow = L.eventsOn(tomorrowKey);
    var devOn = L.devices().filter(function (d) { return d.on; }).length;

    root.appendChild(h('header', { class: 'hello' }, [
      h('p', { class: 'eyebrow', text: U.cap(U.fmt(now, { weekday: 'long', day: 'numeric', month: 'long' })) }),
      h('h1', { text: t('greet.' + g) + (name ? ', ' + name : '') }),
      h('p', { class: 'lead', text: t('today.ev', { n: evToday.length }) + ' · ' + t('today.dev', { n: devOn }) })
    ]));

    var grid = h('div', { class: 'cards today-grid' });

    /* план */
    var agenda = h('section', { class: 'card c1' }, [
      h('div', { class: 'card-head' }, [h('h2', { text: t('nav.calendar') }), U.iconBtn('plus', t('today.addEvent'), function () { CL.actions.newEvent(todayKey); })])
    ]);
    if (!evToday.length && !evTomorrow.length) {
      agenda.appendChild(U.empty(t('today.noEvents'), U.btn(t('today.addEvent'), 'soft', function () { CL.actions.newEvent(todayKey); }, 'plus')));
    } else {
      var list = h('div', { class: 'rows' });
      evToday.forEach(function (e) { list.appendChild(eventRow(e)); });
      if (evTomorrow.length) {
        list.appendChild(h('p', { class: 'sub', text: t('today.tomorrow') }));
        evTomorrow.forEach(function (e) { list.appendChild(eventRow(e)); });
      }
      agenda.appendChild(list);
    }
    grid.appendChild(agenda);

    /* вода и шаги */
    var hd = L.readHealth(todayKey);
    var health = h('section', { class: 'card c2' }, [
      h('div', { class: 'card-head' }, [h('h2', { text: t('nav.health') }), h('a', { class: 'more-link', href: '#/health', 'aria-label': t('nav.health') }, U.icon('right'))]),
      h('div', { class: 'health-quick' }, [
        U.ring(hd.water / st.goals.water, String(hd.water), t('today.waterOf', { n: st.goals.water })),
        h('div', { class: 'health-quick-side' }, [
          h('div', { class: 'stat' }, [U.icon('water'), h('span', { text: t('health.water') })]),
          h('div', { class: 'stepper' }, [
            U.iconBtn('minus', t('health.minus'), function () { L.addWater(-1); }),
            U.iconBtn('plus', t('health.plus'), function () { L.addWater(1); }, 'primary')
          ]),
          h('p', { class: 'muted', text: t('health.steps') + ': ' + hd.steps.toLocaleString(CL.i18n.locale()) + ' · ' + t('health.sleep') + ': ' + (hd.sleep || 0) + ' ' + t('health.hours') })
        ])
      ])
    ]);
    grid.appendChild(health);

    /* сценарии */
    var scenes = L.scenes();
    var sc = h('section', { class: 'card c3' }, [h('div', { class: 'card-head' }, [h('h2', { text: t('today.scenes') }), h('a', { class: 'more-link', href: '#/home', 'aria-label': t('nav.home') }, U.icon('right'))])]);
    if (!scenes.length) sc.appendChild(U.empty(t('today.noScenes')));
    else {
      var pills = h('div', { class: 'pills' });
      scenes.forEach(function (s) {
        pills.appendChild(h('button', { type: 'button', class: 'pill', onclick: function () { L.runScene(s.id); U.toast(t('home.ran', { n: L.nameOf(s) })); } }, [U.icon('sparkle'), h('span', { text: L.nameOf(s) })]));
      });
      sc.appendChild(pills);
    }
    grid.appendChild(sc);

    /* спорт */
    var ws = L.weekStats();
    grid.appendChild(h('section', { class: 'card c4' }, [
      h('div', { class: 'card-head' }, [h('h2', { text: t('nav.sport') }), h('a', { class: 'more-link', href: '#/sport', 'aria-label': t('nav.sport') }, U.icon('right'))]),
      h('div', { class: 'sport-quick' }, [
        U.ring(ws.count / Math.max(1, st.goals.workouts), String(ws.count), t('today.waterOf', { n: st.goals.workouts })),
        h('p', { class: 'muted', text: t('today.weekGoal') + ' · ' + t('sport.minShort', { n: ws.minutes }) })
      ])
    ]));

    /* заметки */
    var notes = L.notes().slice(0, 3);
    var nc = h('section', { class: 'card c5' }, [
      h('div', { class: 'card-head' }, [h('h2', { text: t('nav.notes') }), U.iconBtn('plus', t('today.addNote'), function () { CL.actions.newNote(); })])
    ]);
    if (!notes.length) nc.appendChild(U.empty(t('today.noNotes'), U.btn(t('today.addNote'), 'soft', function () { CL.actions.newNote(); }, 'plus')));
    else {
      var rows = h('div', { class: 'rows' });
      notes.forEach(function (n) {
        rows.appendChild(h('button', { type: 'button', class: 'row', onclick: function () { CL.actions.editNote(n.id); } }, [
          n.pinned ? U.icon('pin') : null,
          h('span', { class: 'row-main', text: n.title || n.text.split('\n')[0] || t('notes.untitled') })
        ]));
      });
      nc.appendChild(rows);
    }
    grid.appendChild(nc);

    root.appendChild(grid);
  };
})();
