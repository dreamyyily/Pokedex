// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css:["element-plus/dist/index.css"],
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    "@nuxt/image",
    '@pinia/nuxt'
  ],
  app:{
    head:{
      title:"Pokedex",
      meta: [
        {
          name: "description",
          content: "poke-pokemon"
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      baseURL:" ",
    }
  }
})