import type { NextConfig } from "next";
import fs from "fs";

// Читаем версию из файла VERSION в корне
const version = fs.readFileSync('./VERSION', 'utf8').trim();

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    APP_VERSION: version,
  },
  /* config options here */
};

export default nextConfig;
