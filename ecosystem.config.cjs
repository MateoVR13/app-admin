/**
 * PM2 process config — app-admin.yedatech.com.co
 *
 * Uso en el VPS:
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 save                              # persiste para que reviva en reboot
 *   pm2 reload app-admin-yedatech         # tras un git pull + npm ci
 *
 * Notas:
 * - node:sqlite necesita --experimental-sqlite en Node 22.x (estable en Node 24+).
 *   Si subes a Node 24+, puedes quitar node_args.
 * - PORT=3010: cambia si ya lo usa otra app del VPS.
 * - El proceso se reinicia automáticamente si pasa de 400MB de RAM.
 */
module.exports = {
  apps: [
    {
      name: "app-admin-yedatech",
      script: "./server/index.js",
      cwd: __dirname,
      node_args: "--experimental-sqlite",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
      },
    },
  ],
};
