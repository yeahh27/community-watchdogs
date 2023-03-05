# community-watchdogs

## node version
16.19.1

## typescript에서 json import
- tsconfig.json 추가
```
{
  "compilerOptions": {
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```
- tsc 실행시에 --esModuleInterop, --resolveJsonModule 옵션을 추가해 빌드

## Typescript에서 js npm 모듈 import시 오류를 해결하는 방법
원인 : 기존 js 파일에서만 import 하여 사용가능한 형태만 지원하고 npm모듈을 만든 개발자가 typescript사용할 수 있도록 처리를 하지 않았기 때문.
- /src/@types/모듈명/index.d.ts 파일 생성
```
declare module '모듈명'
```

- 위 작업으로도 동작하지 않을 경우, tsconfig.json 설정 추가
```
{
    "compilerOptions": {
        "typeRoots" : ["./@types", "./node_modules/@types"]
    },
}
```

## warning
- Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true. See: https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently

  - Symptom
    - When you are using Chrome 107(developer version) & 106 (official version) or any version above these, you could encounter a warning in console:

  - Cause
    - Based on Google developer guide, the setting for attribute willReadFrequently in getContext("2d") has to be true if you are using Chrome 107(developer version) & 106 (official version) or higher, otherwise it will show this warning message.

  - Solution
    - Step 1. Navigate to ‘../Resources/dynamsoft.webtwain.initiate.js’ replace all getContext("2d") to getContext("2d",{willReadFrequently:true})
    - Step 2. Navigate to ‘../Resources/src/dynamsoft.viewer.js’ replace all getContext("2d") to getContext("2d",{willReadFrequently:true})

출처 <https://www.dynamsoft.com/web-twain/docs/faq/chrome-106-107-warning.html>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
