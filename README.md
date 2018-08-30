# @renoirb/experiments-nuxtjs-i18n-element-scss-20180

Make Nuxt (hopefully) work with;

- Nuxt v2
- Element UI
- Theming Element UI with SCSS
- Vue I18n, with **vue-i18n-extensions**
- Use of [@kazupon/vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader), so we can use `<i18n>...</i18n>` in vue file translations

Also with:

- Context Root not at the top level (e.g. `/portal/`, instead of `/`, edit `BASE_NUXT` in [nuxt.config.js](./nuxt.config.js))
- Load vue-i18n messages dynamically from external source, loaded once
- Project fonts managed via NPM/Yarn, and properly loaded
- Can use CSS Variables (e.g. `var(--foo);`)
- SASS works and do extend Element UI
- Different layout if on Mobile device
- Sample static API example usage
- Proxy to GitHub and ReqRes.in APIs for prototyping
- ...

## Project setup

```
make
make fonts
```

### Compiles and hot-reloads for development

```
yarn run dev
```

Go to http://localhost:3000/

### Compiles and minifies for production

```
yarn run build
yarn run start
```

Go to http://localhost:3000/

### Lints and fixes files

```
make lint
```

# Reference

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
