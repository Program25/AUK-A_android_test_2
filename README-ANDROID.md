# AUK-A para Android

Mesmo app de configuração BLE (foguete + estação em solo), empacotado como
app Android com **Capacitor**. O Android WebView não tem Web Bluetooth, então
`native/native.js` coloca um `navigator.bluetooth` compatível em cima do plugin
BLE do Capacitor — o `src/app.js` quase não mudou.

## O que mudou em relação à versão Windows

- **Tela de celular**: sem barra lateral. Status da conexão no topo, chips de
  seção fixos (LoRa, Recuperação, ...), campos em coluna única, barra de ações
  (Recarregar / Padrões / Salvar / Pronto para voar) fixa no rodapé, cartão SD
  no final. Botões, sliders e chaves maiores para o dedo; respeita a barra de
  status e a barra de gestos do Android.
- **Seletor de dispositivo**: o plugin mostra a própria janela nativa.
- **Baixar data.txt**: grava no cache do app e abre a folha "Compartilhar" do
  Android (salvar em Arquivos/Drive, enviar por WhatsApp/e-mail).
- Permissões: Bluetooth ("Dispositivos por perto"), sem localização.

## Gerar o APK — opção A: sem instalar nada (GitHub Actions)

1. Crie um repositório no GitHub e envie o conteúdo desta pasta.
2. Aba **Actions → Gerar APK → Run workflow** (roda sozinho a cada push).
3. Ao terminar (uns 5–10 min), baixe o artefato **AUK-A-apk** (`AUK-A-v1.2.0.apk`).

## Gerar o APK — opção B: no seu PC

Precisa de: **Node 22+**, **JDK 21** e o **Android SDK** (o jeito mais fácil é
instalar o Android Studio; ele traz o SDK). Depois:

```
npm install
npm run apk
```

O APK sai em `dist/AUK-A-v1.2.0.apk`. Para abrir o projeto no Android Studio
(depois da primeira vez): `npm run open`.

## Instalar no celular

1. Passe o `.apk` para o celular (cabo, Drive, WhatsApp...) e toque nele.
2. O Android pede para permitir "instalar apps desconhecidos" para o app que
   abriu o arquivo — autorize.
3. Abra o AUK-A, toque em **Conectar ao foguete** e aceite a permissão de
   "Dispositivos por perto". Bluetooth precisa estar ligado.

O APK é assinado com a chave de debug — serve para uso pessoal. Publicar na
Play Store exigiria uma chave de release.

## Estrutura

```
src/        interface (HTML/CSS/JS) — fields.js e groundFields.js como antes
native/     ponte BLE + salvar arquivo (só roda dentro do app Android)
assets/     ícone (o build gera todos os tamanhos)
scripts/    build-web, patch-android, build-apk
```
Para adicionar um campo de configuração, edite só `src/fields.js` (ou
`src/groundFields.js`), como antes.

## Não testado em hardware

Este projeto foi montado sem acesso à internet nem a um celular/placa, então o
APK **não foi compilado nem testado** aqui. O layout foi conferido num
navegador headless em 390×844; a parte Bluetooth precisa de um teste real com
a placa. Se algo falhar no build ou na conexão, mande a mensagem de erro.
