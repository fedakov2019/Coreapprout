/** @type {import('next').NextConfig} */
const nextConfig = { env: {
    REACT_APP_HOST_URL: process.env.REACT_APP_HOST_URL,
    HOST_LOCAL: process.env.HOST_LOCAL
  },};

export default nextConfig;
