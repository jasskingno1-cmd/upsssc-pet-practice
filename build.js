import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true}); await mkdir('dist',{recursive:true});
for(const p of ['index.html','styles.css','app.js','sw.js','manifest.webmanifest','data']) await cp(p,`dist/${p}`,{recursive:true});
console.log('Static production build created in dist/');
