const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util'); 

const defaultPrivateKey = process.env.WAXKEY; // bob
console.log(defaultPrivateKey);
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://testnet.waxsweden.org', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

(async () => {
    res = await rpc.get_account('ohvanankaahu') //get alice's account info.  This assumes the account 'alice' has been created on the chain specified in the rpc object.
    console.dir(res);
    
    const result = await api.transact({
        actions: [{
          account: 'atomicassets',
          name: 'createcol',
          authorization: [{
            actor: 'ohvanankaahu',
            permission: 'owner',
          }],
          data: {
            author: 'ohvanankaahu',
            collection_name: 'testtesttest',
            allow_notify: false,
            authorized_accounts: 'ohvanankaahu',
            notify_accounts: 'ohvanankaahu',
            market_fee: 0.1,
            data: [{"key": "id", "value": ["uint64", 1024]}, {"key": "color", "value": ["string", "pink"]}]
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 1200,
      });

    console.dir(result);

})();