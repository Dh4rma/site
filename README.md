### About

- esbuild + hyperapp for low cost SPA.
- hyperapp ecosystem: [hyperway](https://github.com/alpacone/hyperway) + [hyperapp-fx](https://github.com/okwolf/hyperapp-fx/tree/master/src)
- css modules with [esbuild-css-modules-plugin](https://github.com/indooorsman/esbuild-css-modules-plugin)
- dev serveer with proxy, builder see ./process
- deploy and publish application with github actions
- deplloy to s3 + cloudfront with terraform

### Process

```bash
yarn ### install npm modules
yarn serve ### serve dist
yarn serve:prod ### serve dist with minify
yarn build ### build
yarn build:prod ### build with minify
```

- [process](./process)

### Deploy

- Edit [backend.tf](./infrastructure/terraform/backend.tf)
- Set secrets
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - AWS_REGION
  - S3_BUCKET_NAME
  - DISTRIBUTION (option)
- Show details [publish.yml](./.github/workflows/publish.yml), [terraform.yml](./.github/workflows/terraform.yml)

### Extends

- [npm](https://github.com/kis9a/esbuild-hyperapp/tree/npm) branch, use npm module for core modules(hyperapp, hyperway, hyperapp-fx)
- [next](https://github.com/kis9a/esbuild-hyperapp/tree/next) branch, for extend main branch.

### Other

<details>
  <summary>tree -L 2 -I node_modules -F</summary>

<!--{{{-->

```
├── components/
├── infrastructure/
│   └── terraform/
├── modules/
│   ├── fx/
│   ├── hyperapp-fx-utils.js
│   ├── hyperapp-fx.js
│   ├── hyperapp-utils.js
│   ├── hyperapp.js
│   ├── hyperway.js
│   └── subs/
├── pages/
│   ├── about/
│   ├── clock/
│   ├── counter/
│   ├── home/
│   ├── index.css
│   ├── index.js
│   ├── state.js
│   ├── subscriptions.js
│   └── timer/
├── process/
│   ├── build.mjs
│   ├── cwd.mjs
│   ├── serve.mjs
│   └── syncDir.mjs
├── public/
│   ├── assets/
│   ├── favicon.ico
│   └── index.html
├── router/
│   └── index.js
├── jsconfig.json
├── package.json
└── yarn.lock
```

<!--}}}-->

</details>
