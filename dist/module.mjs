import { createJiti } from "file:///home/runner/work/nuxt-ui/nuxt-ui/node_modules/.pnpm/jiti@2.7.0/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@querry-kit/nuxt-ui": "/home/runner/work/nuxt-ui/nuxt-ui"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/home/runner/work/nuxt-ui/nuxt-ui/src/module.js")} */
const _module = await jiti.import("/home/runner/work/nuxt-ui/nuxt-ui/src/module.ts");

export default _module?.default ?? _module;