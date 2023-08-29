require("esbuild")
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "./build/app.js",
    bundle: true,
    platform: "node",
    target: "node16",
    external:['knex']
  })
  .catch(() => process.exit(1));
