\\ @senrymori

# Установка и запуск

Для установки всех зависимостей проекта:

1. yarn install

- в случае ошибки The engine "node" is incompatible with this module использовать команду: рекомендуется обновить версию
  NodeJS
- p.s: не рекомендую использовать: yarn install --ignore-engines

2. cd ios
3. pod install

Запуск на андроид: npx react-native run-android

- убедитесь, что у вас установлен android studio и создан эмулятор
- если вы используете физическое устройство проверьте его подключение: adb devices

Запуск на ios:

- если запускаете на m1, то убедитесь, что у вас установлен arm64 в pods и project
- в случае если установлен xCode 14, то надо изучать проблему в частном порядке

* на физ.устройстве запуск без подписки разработчика AppStore - не получится

# Первоначальная настройка (для нового проекта)

--- Переименование шаблона ---

- v0.70+ - react-native-rename-config: https://github.com/grzmot22/react-native-rename-config#readme
- до v0.70 - react-native-rename: https://github.com/junedomingo/react-native-rename#readme

После выполнения , также выполните следующие команды:

1. watchman watch-del-all
2. yarn start --reset-cache

- Возможные ошибки при pod install: CocoaPods requires your terminal to be using UTF-8 encoding - after latest flutter
  upgrade

решение:

1. Открыть Terminal
2. Прописать: open ~/.zshrc (или open ~/.profile если не используете zsh)
3. В файле прописываем: export LANG=en_US.UTF-8 export LANGUAGE=en_US.UTF-8 export LC_ALL=en_US.UTF-8
4. Сохраняем файл
5. Удалить Podfile.lock
6. Перезагрузить mac

\\ если ошибка возникает после запуска приложения на устройстве, то сделать поиск по слову labsentemp и заменить на ваше
новое название

------ Загрузочный экран -------

1. Логотип расположить в пупку assets
2. Переименовать в logo.png
3. Выполнить команду: yarn react-native generate-bootsplash assets/logo.png --background-color=FFFFFF --logo-width=120
4. Для настройки в ios: https://github.com/zoontek/react-native-bootsplash#ios-1

----- Иконка приложения -----

- Все размеры генерируются на сайте: https://www.appicon.co/
- p.s: для android стоит сгенерировать как is_launer, так и ic_launcher_round

----- Подготовка к сборке (релиз версии) -----

В android > gradle.properties есть настройки для release.keystore:

- MYAPP_RELEASE_STORE_FILE=release.keystore
- MYAPP_RELEASE_KEY_ALIAS=template
- MYAPP_RELEASE_STORE_PASSWORD=template
- MYAPP_RELEASE_KEY_PASSWORD=template

чтоб изменить под новый проект:

- перейдите в android > app
- выполните keytool -genkey -v -keystore release.keystore -alias template -keyalg RSA -keysize 2048 -validity 10000

более подробно:
https://stackoverflow.com/questions/35935060/how-can-i-generate-an-apk-that-can-run-without-server-with-react-native

# Android (нюансы)

В файле AndroidManifest.xml установил true для android:usesCleartextTraffic, причина:

- разрешить приложению отправлять сетевой трафик в открытом текстовом виде (например, HTTP).

p.s: по умолчанию, начиная с Android 9 (API 28), этот атрибут установлен в значение false для повышения безопасности
пользовательских данных и защиты от атак перехвата.

Если в проекте api отправляются на https и вам точно не надо отправлять запросы на http, то эту строку лучше удалить
