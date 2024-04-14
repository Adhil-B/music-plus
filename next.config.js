/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['c.saavncdn.com','static.saavncdn.com','www.jiosaavn.com','musicplus-web.vercel.app','i.ytimg.com'],
    },
}


module.exports = {
  externalsType: "script",
  externals: { "https://esm.sh/libmuse@0.0.97": "https://esm.sh/libmuse@0.0.97" } // or exportname@https://site.org/1.js exportname will be kind of default export
};

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
  });
  
  module.exports = withPWA({
    reactStrictMode: true,
  });

module.exports = nextConfig
