/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com','c.saavncdn.com','static.saavncdn.com','www.jiosaavn.com','musicplus-web.vercel.app','i.ytimg.com'],
    },
}


const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
  });
  
  module.exports = withPWA({
    reactStrictMode: true,
  });

module.exports = nextConfig
