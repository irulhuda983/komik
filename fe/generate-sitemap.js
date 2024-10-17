// generate-sitemap.js
import { createSitemap } from 'sitemap';
import * as fs from 'fs';

const sitemap = createSitemap({
    hostname: 'https://bacakomikindo.my.id', // Replace with your domain
    cacheTime: 600000, // 600 sec - cache purge period
    urls: [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/komik/komik-one-piece-indo', changefreq: 'monthly', priority: 0.8 },
        // Add other routes here
    ]
});

// Write the sitemap to a file
fs.writeFileSync('./dist/sitemap.xml', sitemap.toString());
console.log('Sitemap generated at ./dist/sitemap.xml');