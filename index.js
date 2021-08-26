const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util'); 

const defaultPrivateKey = process.env.WAXKEY; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://testnet.waxsweden.org', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

(async () => {
    // res = await rpc.get_account('ohvanankaahu') //get alice's account info.  This assumes the account 'alice' has been created on the chain specified in the rpc object.
    // console.dir(res);
    
    // let result = await api.transact({
    //     actions: [{
    //       account: 'atomicassets',
    //       name: 'createcol',
    //       authorization: [{
    //         actor: 'ohvanankaahu',
    //         permission: 'owner',
    //       }],
    //       data: {
    //         author: 'ohvanankaahu',
    //         collection_name: 'dhtestdhtest',
    //         allow_notify: false,
    //         authorized_accounts: [],
    //         notify_accounts: [],
    //         market_fee: 0.1,
    //         data: []
    //       },
    //     }]
    //   }, {
    //     blocksBehind: 3,
    //     expireSeconds: 1200,
    //   });

    // console.dir(result);

    result = await rpc.get_table_rows({
      json: true,               // Get the response as json
      code: 'atomicassets',      // Contract that we target
      scope: 'ohvanankaahu',         // Account that owns the data
      table: 'collections',        // Table name
      limit: 10,                // Maximum number of rows that we want to get
      reverse: false,           // Optional: Get reversed data
      show_payer: false,          // Optional: Show ram payer
      collection_name: "dhtestdhtest"
    });

    console.dir(result);

})();