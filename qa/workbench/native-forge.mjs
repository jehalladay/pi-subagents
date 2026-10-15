import { ServerConnection } from '@forge/sdk';
const workspace = process.argv[2];
if (!workspace) throw Error('Pass workspace path to this native Forge SDK probe.');
const connection=ServerConnection.spawn('forge');
try {
  const verdict=await connection.initialize();
  if (verdict!=='compatible') throw Error(`Forge protocol ${verdict}`);
  if (!connection.capabilities) throw Error('Forge SDK capabilities absent');
  const reply=await connection.request('gate.status',{root:workspace});
  console.log(JSON.stringify({contract:'forge.gate.status/v1',protocolMethod:'gate.status',source:reply}));
} finally {await connection.close();}
