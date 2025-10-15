// Quick MongoDB connection test
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');

    // List databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('📚 Available databases:');
    dbs.databases.forEach(db => console.log(`   - ${db.name}`));

    await client.close();
    console.log('\n🎉 MongoDB is ready for SmartLink!');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();

