import autoprefixer from "autoprefixer";
import doiuse from "doiuse";
import animation from "postcss-animation";

export default {
  plugins: [
    autoprefixer(),
    doiuse({
      ignore: ["rem"],
      onFeatureUsage: (usageInfo) => {
        console.warn(usageInfo.message);
      },
    }),
    animation(),
  ],
};
