import { defineConfig } from "umi";
// import router from "config/router";
// const { routes } = router;

export default defineConfig({
  routes: [
    { path: "/", component: "pure-text/pure-text", name: "富文本" },
    {
      path: "/markdown",
      component: "markdown/markdown",
      name: "Markdown",
    },
  ],
  npmClient: "pnpm",
  base: "/Typeseter/",
  publicPath: "/Typeseter/",
});
