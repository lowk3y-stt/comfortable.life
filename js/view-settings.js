/* Экран «Настройки»: язык, защита, цели, данные. */
(function () {
  'use strict';
  var CL = window.CL, U = CL.ui, L = CL.logic, S = CL.store, h = U.h, t = U.t;

  function pinError(code) {
    if (code && code.code === 'nocrypto') return t('set.noCrypto');
    return t('set.pinWrong');
  }

  /* окна для PIN: включить, сменить, выключить */
  function pinDialog(mode) {
    var cur = h('input', { type: 'password', autocomplete: 'current-password', required: true, 'data-autofocus': true });
    var nw = h('input', { type: 'password', autocomplete: 'new-password', required: true, minlength: 4 });
    var rep = h('input', { type: 'password', autocomplete: 'new-password', required: true, minlength: 4 });
    var err = h('p', { class: 'err', role: 'alert' });
    var body = [];
    if (mode !== 'enable') body.push(U.field(t('set.pinCurrent'), cur));
    if (mode !== 'disable') {
      body.push(U.field(t('set.pinNew'), nw), U.field(t('set.pinRepeat'), rep));
      body.push(h('p', { class: 'muted', text: t('set.pinWarn') }));
    }
    body.push(err);
    if (mode === 'enable') nw.setAttribute('data-autofocus', 'true');
    var m = U.modal({
      title: mode === 'enable' ? t('set.pinEnable') : mode === 'change' ? t('set.pinChange') : t('set.pinDisable'),
      body: body,
      submitLabel: mode === 'enable' ? t('set.pinEnable') : mode === 'change' ? t('set.pinChange') : t('set.pinDisable'),
      onSubmit: function () {
        err.textContent = '';
        if (mode !== 'disable') {
          if (nw.value.length < 4) { err.textContent = t('set.pinShort'); return false; }
          if (nw.value !== rep.value) { err.textContent = t('set.pinMismatch'); return false; }
        }
        var job = mode === 'enable' ? S.setPin(nw.value) : mode === 'change' ? S.changePin(cur.value, nw.value) : S.removePin(cur.value);
        job.then(function () {
          U.toast(t(mode === 'enable' ? 'set.pinSaved' : mode === 'change' ? 'set.pinChanged' : 'set.pinRemoved'));
          m.close(); CL.app.render();
        }, function (e) { err.textContent = pinError(e); });
        return false; /* окно закроется само после успеха */
      }
    });
  }

  function download(name, text) {
    var url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    var a = h('a', { href: url, download: name });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function goalField(st, key, label, min, max) {
    var inp = h('input', { type: 'number', min: min, max: max, step: 1, inputmode: 'numeric', value: String(st.goals[key]) });
    inp.addEventListener('change', function () { st.goals[key] = Math.round(L.clamp(inp.value, min, max)); S.save(); });
    return U.field(label, inp);
  }

  CL.views.settings = function (root) {
    var st = S.get(), meta = S.meta();
    root.appendChild(U.head(t('set.title')));

    /* язык */
    var lang = U.select([{ v: 'auto', l: t('set.auto') }, { v: 'ru', l: 'Русский' }, { v: 'en', l: 'English' }], meta.lang || 'auto');
    lang.addEventListener('change', function () { meta.lang = lang.value; S.saveMeta(); CL.app.applyLang(); CL.app.render(); });
    var langCard = h('section', { class: 'card c1' }, [h('h2', { text: t('set.language') }), U.field(t('set.language'), lang)]);

    /* защита */
    var prot = h('section', { class: 'card c2' }, [h('h2', { text: t('set.protection') })]);
    if (S.hasPin()) {
      var al = U.select([1, 5, 15, 30].map(function (n) { return { v: String(n), l: t('set.minutes', { n: n }) }; }), String(meta.autolock || 1));
      al.addEventListener('change', function () { meta.autolock = Number(al.value); S.saveMeta(); });
      prot.appendChild(h('p', { text: t('set.pinOn') }));
      prot.appendChild(U.field(t('set.autolock'), al));
      prot.appendChild(h('div', { class: 'btn-row' }, [U.btn(t('set.pinChange'), 'soft', function () { pinDialog('change'); }), U.btn(t('set.pinDisable'), 'ghost', function () { pinDialog('disable'); })]));
    } else {
      prot.appendChild(h('p', { text: t('set.pinOff') }));
      if (!S.cryptoOk()) prot.appendChild(h('p', { class: 'err', text: t('set.noCrypto') }));
      prot.appendChild(h('div', { class: 'btn-row' }, [U.btn(t('set.pinEnable'), 'primary', function () { pinDialog('enable'); }, 'lock')]));
    }

    /* цели */
    var goals = h('section', { class: 'card c3' }, [h('h2', { text: t('set.goals') }), h('div', { class: 'fields-2' }, [
      goalField(st, 'workouts', t('set.goalWorkouts'), 1, 14),
      goalField(st, 'water', t('set.goalWater'), 1, 20),
      goalField(st, 'sleep', t('set.goalSleep'), 1, 14),
      goalField(st, 'steps', t('set.goalSteps'), 500, 100000)
    ])]);

    /* данные */
    var file = h('input', { type: 'file', accept: 'application/json,.json', hidden: true });
    file.addEventListener('change', function () {
      var f = file.files && file.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        U.confirm(t('set.importAsk'), t('set.import')).then(function (ok) {
          if (!ok) return;
          try { S.importJson(String(r.result)).then(function () { U.toast(t('set.importOk')); }); }
          catch (e) { U.toast(t('set.importBad')); }
        });
      };
      r.onerror = function () { U.toast(t('set.importBad')); };
      r.readAsText(f);
      file.value = '';
    });
    var data = h('section', { class: 'card c4' }, [
      h('h2', { text: t('set.data') }),
      h('p', { class: 'muted', text: t('set.dataNote') }),
      h('div', { class: 'btn-row' }, [
        U.btn(t('set.export'), 'soft', function () { download('comfortable-life-' + S.dateKey() + '.json', S.exportJson()); U.toast(t('set.exported')); }),
        U.btn(t('set.import'), 'soft', function () { file.click(); }),
        U.btn(t('set.reset'), 'danger', function () {
          U.confirm(t('set.resetAsk'), t('set.reset'), true).then(function (ok) {
            if (!ok) return;
            S.reset().then(function () { CL.app.applyLang(); CL.app.afterReset(); });
          });
        })
      ]),
      file
    ]);

    var about = h('section', { class: 'card c5' }, [h('h2', { text: t('set.about') }), h('p', { class: 'muted', text: t('set.version', { v: CL.version }) })]);

    root.appendChild(h('div', { class: 'cards two' }, [langCard, prot]));
    root.appendChild(goals);
    root.appendChild(data);
    root.appendChild(about);
  };
})();
