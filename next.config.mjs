/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // If you also want to allow http protocol
      },
    ],
  },
};

export default nextConfig;
