/**
 * Add (boolean) isMobile to Nuxt render context.
 *
 * This will help us serve potentially different Layout depending on User-Agent.
 *
 * https://github.com/nuxt/nuxt.js/blob/2.x/examples/dynamic-layouts/middleware/mobile.js
 */
export default async ctx => {
  const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
  ctx.isMobile = /mobile/i.test(userAgent)
}
