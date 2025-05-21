module.exports = {
  apps: [
    {
      name: "jsonlicious",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
}
