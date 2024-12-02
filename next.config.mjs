/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER,
        EMAIL_PASSWORD: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
      // 確保環境變數在客戶端也可用
      publicRuntimeConfig: {
        EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER,
      },
};

export default nextConfig;
