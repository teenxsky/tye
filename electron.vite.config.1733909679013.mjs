// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      },
      extensions: [
        "",
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".json",
        ".mjs",
        ".wasm",
        ".vue"
      ]
    },
    plugins: [vue()],
    assetsInclude: ["**/*.gltf", "**/*.glb"]
  }
});
export {
  electron_vite_config_default as default
};
