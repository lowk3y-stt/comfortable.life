/* Comfortable life — локализация. Язык берётся из языка устройства, можно переключить вручную. */
(function () {
  'use strict';
  var CL = (window.CL = window.CL || {});

  var D = {
    ru: {
      'common.save': 'Сохранить', 'common.cancel': 'Отмена', 'common.close': 'Закрыть', 'common.delete': 'Удалить',
      'common.add': 'Добавить', 'common.edit': 'Изменить', 'common.done': 'Готово', 'common.hide': 'Скрыть',
      'common.deleteAsk': 'Удалить без возможности восстановления?', 'common.confirm': 'Подтвердите',
      'lock.forgot': 'Забыли PIN? Стереть данные', 'as.noteNoText': 'Что записать в заметку?', 'as.close': 'Закрыть ассистента',
      'set.exported': 'Копия скачана',

      'nav.today': 'Сегодня', 'nav.home': 'Дом', 'nav.notes': 'Заметки', 'nav.calendar': 'Календарь',
      'nav.more': 'Ещё', 'nav.sport': 'Спорт', 'nav.health': 'Здоровье', 'nav.family': 'Семья', 'nav.settings': 'Настройки',
      'nav.main': 'Основная навигация',

      'more.sport': 'Тренировки, цель на неделю', 'more.health': 'Вода, сон, шаги, настроение',
      'more.family': 'Участники и общее пространство', 'more.settings': 'Язык, защита, данные',

      'space.personal': 'Личное', 'space.family': 'Семья', 'space.label': 'Пространство',
      'lock.now': 'Заблокировать', 'lang.switch': 'Сменить язык',

      'greet.night': 'Доброй ночи', 'greet.morning': 'Доброе утро', 'greet.day': 'Добрый день', 'greet.evening': 'Добрый вечер',
      'today.ev': 'Событий сегодня: {n}', 'today.dev': 'Включено устройств: {n}',
      'today.noEvents': 'На сегодня и завтра ничего не запланировано.',
      'today.addEvent': 'Добавить событие', 'today.tomorrow': 'Завтра', 'today.noNotes': 'Заметок пока нет.',
      'today.addNote': 'Создать заметку', 'today.scenes': 'Сценарии', 'today.noScenes': 'Сценариев пока нет.',
      'today.waterOf': 'из {n}', 'today.weekGoal': 'тренировок на неделе',

      'home.title': 'Дом', 'home.scenes': 'Сценарии', 'home.addScene': 'Новый сценарий', 'home.addDevice': 'Добавить устройство',
      'home.empty': 'Устройств пока нет. Добавьте первое — например, лампу или розетку.',
      'home.demo': 'Устройства на экране — примеры для демонстрации. Подключение к реальным экосистемам (Яндекс, Tuya, Xiaomi и др.) появится на следующем этапе.',
      'home.on': 'включено', 'home.off': 'выключено', 'home.locked': 'закрыто', 'home.unlocked': 'открыто',
      'home.ran': 'Сценарий «{n}» запущен', 'home.level': 'Уровень', 'home.editScene': 'Изменить сценарий',
      'home.deviceName': 'Название', 'home.room': 'Комната', 'home.type': 'Тип', 'home.eco': 'Экосистема',
      'home.sceneName': 'Название сценария', 'home.sceneHint': 'Что сделать с каждым устройством, когда сценарий запускается.',
      'home.skip': 'Не менять',
      'dev.livingLight': 'Свет в гостиной', 'dev.kitchenLight': 'Свет на кухне', 'dev.bedLight': 'Свет в спальне',
      'dev.heat': 'Климат в гостиной', 'dev.speaker': 'Колонка', 'dev.kettle': 'Чайник в розетке', 'dev.door': 'Входная дверь',
      'room.living': 'Гостиная', 'room.kitchen': 'Кухня', 'room.bedroom': 'Спальня', 'room.hall': 'Прихожая', 'room.other': 'Без комнаты',
      'type.light': 'Свет', 'type.climate': 'Климат', 'type.speaker': 'Колонка', 'type.plug': 'Розетка', 'type.lock': 'Замок',
      'eco.yandex': 'Яндекс', 'eco.tuya': 'Tuya', 'eco.xiaomi': 'Xiaomi', 'eco.apple': 'Apple Home', 'eco.google': 'Google Home', 'eco.other': 'Другая',
      'scene.morning': 'Доброе утро', 'scene.leave': 'Ухожу из дома', 'scene.evening': 'Вечер',

      'notes.title': 'Заметки', 'notes.search': 'Поиск по заметкам', 'notes.new': 'Новая заметка',
      'notes.empty': 'Здесь будут ваши заметки. Запишите первую мысль.', 'notes.noMatch': 'Ничего не найдено.',
      'notes.noteTitle': 'Заголовок', 'notes.text': 'Текст', 'notes.pin': 'Закрепить', 'notes.unpin': 'Открепить',
      'notes.edit': 'Заметка', 'notes.untitled': 'Без заголовка',

      'cal.title': 'Календарь', 'cal.prev': 'Предыдущий месяц', 'cal.next': 'Следующий месяц', 'cal.allDay': 'Весь день',
      'cal.newEvent': 'Новое событие', 'cal.editEvent': 'Событие', 'cal.evTitle': 'Название', 'cal.date': 'Дата', 'cal.time': 'Время',
      'cal.noEvents': 'На этот день событий нет.', 'cal.dayEvents': 'События дня', 'cal.hasEvents': 'есть события',

      'sport.title': 'Спорт', 'sport.week': 'Неделя', 'sport.of': '{n} из {m}', 'sport.workouts': 'тренировок',
      'sport.minutes': 'минут на неделе', 'sport.kcal': 'ккал на неделе', 'sport.add': 'Записать тренировку',
      'sport.recent': 'Последние тренировки', 'sport.empty': 'Тренировок пока нет. Запишите первую, чтобы видеть прогресс.',
      'sport.type': 'Вид', 'sport.min': 'Минуты', 'sport.kcalField': 'Ккал (необязательно)', 'sport.date': 'Дата',
      'sport.run': 'Бег', 'sport.walk': 'Ходьба', 'sport.gym': 'Силовая', 'sport.yoga': 'Йога', 'sport.bike': 'Велосипед', 'sport.swim': 'Плавание', 'sport.other': 'Другое',
      'sport.chart': 'Минуты за 7 дней', 'sport.minShort': '{n} мин',

      'health.title': 'Здоровье', 'health.water': 'Вода', 'health.sleep': 'Сон', 'health.steps': 'Шаги', 'health.mood': 'Настроение',
      'health.glass': 'стаканов', 'health.hours': 'ч', 'health.edit': 'Сон и шаги за сегодня', 'health.sleepField': 'Сон, часов', 'health.stepsField': 'Шаги',
      'health.chart': 'За 7 дней', 'health.plus': 'Добавить стакан', 'health.minus': 'Убрать стакан',
      'health.note': 'Личный дневник привычек. Это не медицинская рекомендация.',
      'mood.1': 'Очень плохо', 'mood.2': 'Плохо', 'mood.3': 'Нормально', 'mood.4': 'Хорошо', 'mood.5': 'Отлично',

      'family.title': 'Семья', 'family.members': 'Участники', 'family.you': 'вы', 'family.add': 'Добавить участника',
      'family.how': 'Как это работает',
      'family.howText': 'Переключатель «Личное / Семья» вверху меняет пространство. В «Семье» заметки и календарь общие, устройства дома — тоже. В «Личном» видно только своё.',
      'family.sync': 'Синхронизация между телефонами появится вместе с серверной частью. Сейчас всё хранится на этом устройстве.',
      'family.name': 'Имя', 'family.color': 'Цвет', 'family.edit': 'Участник', 'family.new': 'Новый участник',

      'set.title': 'Настройки', 'set.language': 'Язык', 'set.auto': 'Как на устройстве',
      'set.protection': 'Защита', 'set.pinOff': 'Данные хранятся на устройстве без пароля. Включите PIN — данные будут зашифрованы.',
      'set.pinOn': 'PIN включён. Данные на устройстве зашифрованы.', 'set.pinEnable': 'Включить PIN', 'set.pinChange': 'Сменить PIN',
      'set.pinDisable': 'Выключить PIN', 'set.autolock': 'Блокировать после ухода из приложения', 'set.minutes': '{n} мин',
      'set.pinNew': 'Новый PIN или пароль', 'set.pinRepeat': 'Повторите', 'set.pinCurrent': 'Текущий PIN или пароль',
      'set.pinWarn': 'Если забудете PIN, данные восстановить не получится. Чем длиннее пароль, тем надёжнее защита.',
      'set.pinShort': 'Не короче 4 символов.', 'set.pinMismatch': 'Значения не совпадают.', 'set.pinWrong': 'Неверный PIN.',
      'set.pinSaved': 'PIN включён', 'set.pinRemoved': 'PIN выключен', 'set.pinChanged': 'PIN изменён',
      'set.noCrypto': 'Шифрование недоступно в этом браузере или на этом адресе (нужен https).',
      'set.goals': 'Цели', 'set.goalWorkouts': 'Тренировок в неделю', 'set.goalWater': 'Стаканов воды в день', 'set.goalSleep': 'Часов сна', 'set.goalSteps': 'Шагов в день',
      'set.data': 'Данные', 'set.export': 'Скачать копию', 'set.import': 'Загрузить копию', 'set.reset': 'Стереть всё',
      'set.dataNote': 'Всё хранится только на этом устройстве. В скачанной копии данные не зашифрованы.',
      'set.importOk': 'Данные загружены', 'set.importBad': 'Не удалось прочитать файл', 'set.importAsk': 'Заменить текущие данные данными из файла?',
      'set.resetAsk': 'Стереть все данные на этом устройстве? Это нельзя отменить.', 'set.about': 'О приложении',
      'set.version': 'Версия {v}. Рабочая основа приложения: данные хранятся локально, подключение к устройствам и ИИ-серверу — следующие этапы.',

      'lock.title': 'Введите PIN', 'lock.placeholder': 'PIN или пароль', 'lock.open': 'Открыть', 'lock.wrong': 'Неверный PIN.',
      'lock.wait': 'Слишком много попыток. Подождите {n} с.', 'lock.hint': 'Данные зашифрованы на этом устройстве.',

      'onb.title': 'Давайте знакомиться', 'onb.name': 'Как вас зовут?', 'onb.start': 'Начать', 'onb.text': 'Имя нужно только для приветствия и хранится на этом устройстве.',

      'as.title': 'Ассистент', 'as.open': 'Открыть ассистента', 'as.placeholder': 'Напишите команду', 'as.send': 'Отправить',
      'as.hello': 'Я помогу с домом, заметками, календарём, спортом и здоровьем. Пока понимаю простые команды; полноценный ИИ подключим на сервере.',
      'as.chips': 'Подсказки', 'as.c1': 'Включи свет в гостиной', 'as.c2': 'Запусти сцену Вечер', 'as.c3': 'Добавь заметку: купить хлеб', 'as.c4': 'Что у меня сегодня?',
      'as.help': 'Не понял команду. Попробуйте: «выключи свет на кухне», «запусти сцену Вечер», «добавь заметку: …», «событие завтра в 18:00 ужин», «выпил стакан воды», «тренировка 30 мин бег».',
      'as.noteAdded': 'Заметка добавлена.', 'as.eventAdded': 'Событие «{t}» добавлено на {d}{tm}.', 'as.eventNoTitle': 'Напишите, как назвать событие.',
      'as.devOn': 'Включено: {n}.', 'as.devOff': 'Выключено: {n}.', 'as.devNone': 'Не нашёл устройство «{n}».',
      'as.sceneRan': 'Запустил сценарий «{n}».', 'as.sceneNone': 'Не нашёл сценарий «{n}».',
      'as.water': 'Записал. Воды сегодня: {n} из {m}.', 'as.sleep': 'Записал сон: {n} ч.', 'as.steps': 'Записал шаги: {n}.',
      'as.workout': 'Записал тренировку: {t}, {n} мин.', 'as.workoutNoMin': 'Сколько минут длилась тренировка?',
      'as.agendaEmpty': 'На {d} событий нет.', 'as.agenda': 'На {d}:', 'as.dayToday': 'сегодня', 'as.dayTomorrow': 'завтра',
      'as.waterQ': 'Воды сегодня: {n} из {m}.'
    },

    en: {
      'common.save': 'Save', 'common.cancel': 'Cancel', 'common.close': 'Close', 'common.delete': 'Delete',
      'common.add': 'Add', 'common.edit': 'Edit', 'common.done': 'Done', 'common.hide': 'Hide',
      'common.deleteAsk': 'Delete permanently?', 'common.confirm': 'Please confirm',
      'lock.forgot': 'Forgot the PIN? Erase data', 'as.noteNoText': 'What should the note say?', 'as.close': 'Close assistant',
      'set.exported': 'Copy downloaded',

      'nav.today': 'Today', 'nav.home': 'Home', 'nav.notes': 'Notes', 'nav.calendar': 'Calendar',
      'nav.more': 'More', 'nav.sport': 'Sport', 'nav.health': 'Health', 'nav.family': 'Family', 'nav.settings': 'Settings',
      'nav.main': 'Main navigation',

      'more.sport': 'Workouts and weekly goal', 'more.health': 'Water, sleep, steps, mood',
      'more.family': 'Members and shared space', 'more.settings': 'Language, protection, data',

      'space.personal': 'Personal', 'space.family': 'Family', 'space.label': 'Space',
      'lock.now': 'Lock', 'lang.switch': 'Change language',

      'greet.night': 'Good night', 'greet.morning': 'Good morning', 'greet.day': 'Good afternoon', 'greet.evening': 'Good evening',
      'today.ev': 'Events today: {n}', 'today.dev': 'Devices on: {n}',
      'today.noEvents': 'Nothing planned for today or tomorrow.',
      'today.addEvent': 'Add event', 'today.tomorrow': 'Tomorrow', 'today.noNotes': 'No notes yet.',
      'today.addNote': 'Create a note', 'today.scenes': 'Scenes', 'today.noScenes': 'No scenes yet.',
      'today.waterOf': 'of {n}', 'today.weekGoal': 'workouts this week',

      'home.title': 'Home', 'home.scenes': 'Scenes', 'home.addScene': 'New scene', 'home.addDevice': 'Add device',
      'home.empty': 'No devices yet. Add the first one, such as a lamp or a plug.',
      'home.demo': 'The devices shown are demo examples. Connecting real ecosystems (Yandex, Tuya, Xiaomi and others) comes in the next stage.',
      'home.on': 'on', 'home.off': 'off', 'home.locked': 'locked', 'home.unlocked': 'unlocked',
      'home.ran': 'Scene “{n}” started', 'home.level': 'Level', 'home.editScene': 'Edit scene',
      'home.deviceName': 'Name', 'home.room': 'Room', 'home.type': 'Type', 'home.eco': 'Ecosystem',
      'home.sceneName': 'Scene name', 'home.sceneHint': 'What to do with each device when the scene runs.',
      'home.skip': 'Leave as is',
      'dev.livingLight': 'Living room light', 'dev.kitchenLight': 'Kitchen light', 'dev.bedLight': 'Bedroom light',
      'dev.heat': 'Living room climate', 'dev.speaker': 'Speaker', 'dev.kettle': 'Kettle plug', 'dev.door': 'Front door',
      'room.living': 'Living room', 'room.kitchen': 'Kitchen', 'room.bedroom': 'Bedroom', 'room.hall': 'Hallway', 'room.other': 'No room',
      'type.light': 'Light', 'type.climate': 'Climate', 'type.speaker': 'Speaker', 'type.plug': 'Plug', 'type.lock': 'Lock',
      'eco.yandex': 'Yandex', 'eco.tuya': 'Tuya', 'eco.xiaomi': 'Xiaomi', 'eco.apple': 'Apple Home', 'eco.google': 'Google Home', 'eco.other': 'Other',
      'scene.morning': 'Good morning', 'scene.leave': 'Leaving home', 'scene.evening': 'Evening',

      'notes.title': 'Notes', 'notes.search': 'Search notes', 'notes.new': 'New note',
      'notes.empty': 'Your notes will live here. Write down the first thought.', 'notes.noMatch': 'Nothing found.',
      'notes.noteTitle': 'Title', 'notes.text': 'Text', 'notes.pin': 'Pin', 'notes.unpin': 'Unpin',
      'notes.edit': 'Note', 'notes.untitled': 'Untitled',

      'cal.title': 'Calendar', 'cal.prev': 'Previous month', 'cal.next': 'Next month', 'cal.allDay': 'All day',
      'cal.newEvent': 'New event', 'cal.editEvent': 'Event', 'cal.evTitle': 'Title', 'cal.date': 'Date', 'cal.time': 'Time',
      'cal.noEvents': 'No events on this day.', 'cal.dayEvents': 'Events', 'cal.hasEvents': 'has events',

      'sport.title': 'Sport', 'sport.week': 'This week', 'sport.of': '{n} of {m}', 'sport.workouts': 'workouts',
      'sport.minutes': 'minutes this week', 'sport.kcal': 'kcal this week', 'sport.add': 'Log a workout',
      'sport.recent': 'Recent workouts', 'sport.empty': 'No workouts yet. Log the first one to see your progress.',
      'sport.type': 'Type', 'sport.min': 'Minutes', 'sport.kcalField': 'Kcal (optional)', 'sport.date': 'Date',
      'sport.run': 'Run', 'sport.walk': 'Walk', 'sport.gym': 'Strength', 'sport.yoga': 'Yoga', 'sport.bike': 'Cycling', 'sport.swim': 'Swimming', 'sport.other': 'Other',
      'sport.chart': 'Minutes over 7 days', 'sport.minShort': '{n} min',

      'health.title': 'Health', 'health.water': 'Water', 'health.sleep': 'Sleep', 'health.steps': 'Steps', 'health.mood': 'Mood',
      'health.glass': 'glasses', 'health.hours': 'h', 'health.edit': 'Sleep and steps for today', 'health.sleepField': 'Sleep, hours', 'health.stepsField': 'Steps',
      'health.chart': 'Last 7 days', 'health.plus': 'Add a glass', 'health.minus': 'Remove a glass',
      'health.note': 'A personal habit journal. Not medical advice.',
      'mood.1': 'Very bad', 'mood.2': 'Bad', 'mood.3': 'Okay', 'mood.4': 'Good', 'mood.5': 'Great',

      'family.title': 'Family', 'family.members': 'Members', 'family.you': 'you', 'family.add': 'Add member',
      'family.how': 'How it works',
      'family.howText': 'The Personal / Family switch at the top changes the space. In Family, notes, calendar and home devices are shared. In Personal, you see only your own.',
      'family.sync': 'Syncing between phones arrives with the server part. For now everything is stored on this device.',
      'family.name': 'Name', 'family.color': 'Color', 'family.edit': 'Member', 'family.new': 'New member',

      'set.title': 'Settings', 'set.language': 'Language', 'set.auto': 'Same as device',
      'set.protection': 'Protection', 'set.pinOff': 'Data is stored on this device without a password. Turn on a PIN to encrypt it.',
      'set.pinOn': 'PIN is on. Data on this device is encrypted.', 'set.pinEnable': 'Turn on PIN', 'set.pinChange': 'Change PIN',
      'set.pinDisable': 'Turn off PIN', 'set.autolock': 'Lock after leaving the app', 'set.minutes': '{n} min',
      'set.pinNew': 'New PIN or password', 'set.pinRepeat': 'Repeat', 'set.pinCurrent': 'Current PIN or password',
      'set.pinWarn': 'If you forget the PIN, the data cannot be recovered. A longer password protects better.',
      'set.pinShort': 'At least 4 characters.', 'set.pinMismatch': 'Values do not match.', 'set.pinWrong': 'Wrong PIN.',
      'set.pinSaved': 'PIN is on', 'set.pinRemoved': 'PIN is off', 'set.pinChanged': 'PIN changed',
      'set.noCrypto': 'Encryption is not available in this browser or at this address (https is required).',
      'set.goals': 'Goals', 'set.goalWorkouts': 'Workouts per week', 'set.goalWater': 'Glasses of water per day', 'set.goalSleep': 'Hours of sleep', 'set.goalSteps': 'Steps per day',
      'set.data': 'Data', 'set.export': 'Download a copy', 'set.import': 'Load a copy', 'set.reset': 'Erase everything',
      'set.dataNote': 'Everything is stored only on this device. The downloaded copy is not encrypted.',
      'set.importOk': 'Data loaded', 'set.importBad': 'Could not read the file', 'set.importAsk': 'Replace current data with the data from the file?',
      'set.resetAsk': 'Erase all data on this device? This cannot be undone.', 'set.about': 'About',
      'set.version': 'Version {v}. Working base of the app: data is stored locally; connecting devices and the AI server are next stages.',

      'lock.title': 'Enter your PIN', 'lock.placeholder': 'PIN or password', 'lock.open': 'Unlock', 'lock.wrong': 'Wrong PIN.',
      'lock.wait': 'Too many attempts. Wait {n} s.', 'lock.hint': 'Your data is encrypted on this device.',

      'onb.title': 'Nice to meet you', 'onb.name': 'What is your name?', 'onb.start': 'Start', 'onb.text': 'The name is used only for the greeting and stays on this device.',

      'as.title': 'Assistant', 'as.open': 'Open assistant', 'as.placeholder': 'Type a command', 'as.send': 'Send',
      'as.hello': 'I can help with home, notes, calendar, sport and health. For now I understand simple commands; a full AI comes with the server.',
      'as.chips': 'Suggestions', 'as.c1': 'Turn on the living room light', 'as.c2': 'Run scene Evening', 'as.c3': 'Add note: buy bread', 'as.c4': 'What do I have today?',
      'as.help': 'I did not get that. Try: “turn off the kitchen light”, “run scene Evening”, “add note: …”, “event tomorrow at 18:00 dinner”, “drank a glass of water”, “workout 30 min run”.',
      'as.noteAdded': 'Note added.', 'as.eventAdded': 'Event “{t}” added for {d}{tm}.', 'as.eventNoTitle': 'Tell me what to call the event.',
      'as.devOn': 'Turned on: {n}.', 'as.devOff': 'Turned off: {n}.', 'as.devNone': 'I could not find a device “{n}”.',
      'as.sceneRan': 'Started scene “{n}”.', 'as.sceneNone': 'I could not find a scene “{n}”.',
      'as.water': 'Logged. Water today: {n} of {m}.', 'as.sleep': 'Logged sleep: {n} h.', 'as.steps': 'Logged steps: {n}.',
      'as.workout': 'Logged workout: {t}, {n} min.', 'as.workoutNoMin': 'How many minutes was the workout?',
      'as.agendaEmpty': 'Nothing planned for {d}.', 'as.agenda': 'Plans for {d}:', 'as.dayToday': 'today', 'as.dayTomorrow': 'tomorrow',
      'as.waterQ': 'Water today: {n} of {m}.'
    }
  };

  var lang = 'ru';

  function detect() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return /^ru/i.test(l) ? 'ru' : 'en';
  }
  function t(k, v) {
    var s = (D[lang] && D[lang][k]) || D.en[k] || k;
    if (v) for (var x in v) s = s.split('{' + x + '}').join(v[x]);
    return s;
  }
  function all(k) {
    return Object.keys(D).map(function (l) { return D[l][k]; }).filter(Boolean);
  }
  function setLang(l) { lang = D[l] ? l : 'en'; document.documentElement.lang = lang; }

  CL.i18n = {
    t: t, all: all, detect: detect, setLang: setLang, dict: D,
    getLang: function () { return lang; },
    locale: function () { return lang === 'ru' ? 'ru-RU' : 'en-US'; }
  };
})();
