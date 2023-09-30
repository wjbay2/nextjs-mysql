/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: 'localhost',
            port: 3306,
            user: 'user',
            password: 'password', 
            database: 'db'
        }
    },
    images: {
        dangerouslyAllowSVG: true,
        // List of trusted remote domains, see https://nextjs.org/docs/basic-features/image-optimization#domains
        domains: ['cdn.filestackcontent.com'],
        deviceSizes: [375, 480, 640, 768, 1080, 1200, 1400, 1920, 2048, 3840],
      },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

module.exports = nextConfig