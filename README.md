Установка на OS X:

0. Установить AndroidSDK (если не установлена):

    brew install android-sdk

1. brew instal npm

2. npm install -g react-native-cli

3. git clone https://github.com/artem-chemezov/cold-storage

4. cd cold-storage

5. touch android/local.properties

6. open android/local.properties

7. в файле local.properties прописать путь к AndroidSDK:

    sdk.dir = /Users/*username*/Library/Android/sdk

8. npm install

9. ./node_modules/.bin/rn-nodeify --hack --install

