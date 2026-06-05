const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/<h1 className="(?:[^"]*)"/g, (match) => {
  if (match.includes('font-caveat')) return match;
  return '<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-wide leading-tight font-caveat"';
});

content = content.replace(/<h2 className="(?:[^"]*)"/g, (match) => {
  if (match.includes('font-caveat')) return match;
  return '<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight font-caveat"';
});

fs.writeFileSync('src/App.tsx', content);
console.log('Done!');
