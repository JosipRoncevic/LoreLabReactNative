# LoreLab React Native

This is mobile app for creating fictional worlds, characters and stories using React-Native.

## Preduvjeti

- Node.js (verzija 18 ili novija)
- JDK 17
- Android Studio (za emulator: Pixel 3 sa API-jem 36)
- Android SDK (Potrebno je postaviti i ANDROID HOME korisničku varijablu okruženja s putanjom, npr. C:\Users\josip\AppData\Local\Android\Sdk)
- VS Code

## Instalacija

1. Klonirati repozitorij
   git clone https://github.com/JosipRoncevic/LoreLabReactNative.git

2. Instalirati ovisnosti
   npm install
   - Potrebno je pričekati nekoliko minuta dook se maknu sve greške
   - Moguć je problem s "@react-native/typescript-config", ali quick fix i restart cijelog VS Code-a bi trebali rješiti situaciju

3. U novom terminalu pokreni aplikaciju
   npx react-native run-android
