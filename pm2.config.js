module.exports = {
    apps: [
      {
        name: "health-check-server",
        script: "./src/main.js",
        cwd: "./",
        node_args: "--env-file .env"
      },
    ],
}