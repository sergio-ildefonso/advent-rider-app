# Advent Rider App

Landing page estática (Vite) para transferência do APK da app Android **Advent Rider**.

## Desenvolvimento

```sh
npm install
npm run dev
```

Build de produção:

```sh
npm run build
npm run preview
```

O site resultante fica em `dist/` — é estático e pode ser servido por qualquer hosting.

## Ficheiro APK

O download aponta para `public/downloads/AdventRider.apk` (servido como `/downloads/AdventRider.apk`).
O ficheiro atual é o **release** compilado a partir do projeto Flutter `../advent-rider` com:

```sh
cd ../advent-rider
flutter build apk --release
cp build/app/outputs/flutter-apk/app-release.apk ../advent-rider-app/public/downloads/AdventRider.apk
```

Ao atualizar a versão da app, atualiza também o número em `index.html` (`Android · versão 1.0.1`) e o `version` em `package.json` se aplicável.

## Conteúdo

Copy em pt-PT. Cores e nome seguem a identidade da app Flutter (`lib/theme/app_colors.dart`):
asfalto `#121214`, superfície `#1E1E24`, laranja `#FF5722`, âmbar `#FFB300`.
