require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient({
  log: [{ emit: 'event', level: 'query' }],
});
p.$on('query', e => console.log('SQL:', e.query));
(async () => {
  try {
    console.log('--- Current DB info ---');
    const r1 = await p.$queryRaw`SELECT current_database(), current_user, current_schema()`;
    console.log('Result:', r1);
    console.log('--- Search path ---');
    const r2 = await p.$queryRaw`SHOW search_path`;
    console.log('Result:', r2);
    console.log('--- List tables in public ---');
    const r3 = await p.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`;
    console.log('Result:', r3);
    console.log('--- Try lowercase query ---');
    const r4 = await p.$queryRaw`SELECT count(*)::int as c FROM "public"."Usuario"`;
    console.log('Result:', r4);
  } catch (e) {
    console.error('ERR:', e.message);
  } finally {
    await p.$disconnect();
  }
})();
