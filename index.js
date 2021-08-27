const { error } = require('console');
const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util'); 

const defaultPrivateKey = process.env.WAXKEY; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://testnet.waxsweden.org', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

(async () => {
    await rpc.get_account('ohvanankaahu')
      .then(res => {
        console.log("Account information:");
        console.dir(res);
      }).catch(err => {
        console.log("Failed to get account information");
        console.dir(err.message);
      });
    
    await api.transact({
        actions: [{
          account: 'atomicassets',
          name: 'createcol',
          authorization: [{
            actor: 'ohvanankaahu',
            permission: 'owner',
          }],
          data: {
            author: 'ohvanankaahu',
            collection_name: 'dhtestdhtest',
            allow_notify: false,
            authorized_accounts: [],
            notify_accounts: [],
            market_fee: 0.1,
            data: []
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 1200,
      }).then(res => {
        console.dir(res);
      }).catch(err => {
        console.log("failed to create collection - see next line");
        console.dir(err.message);
        //console.dir(err);
      });

      await api.transact({
        actions: [{
          account: 'atomicassets',
          name: 'addcolauth',
          authorization: [{
            actor: 'ohvanankaahu',
            permission: 'owner',
          }],
          data: {
            account_to_add: 'ohvanankaahu',
            collection_name: 'dhtestdhtest'
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 1200,
      }).then(res => {
        console.dir(res);
      }).catch(err => {
        console.log("failed to add authorised account to collection - see next line");
        console.dir(err.message);
        //console.dir(err);
      });

      await api.transact({
        actions: [{
          account: 'atomicassets',
          name: 'createschema',
          authorization: [{
            actor: 'ohvanankaahu',
            permission: 'owner',
          }],
          data: {
            authorized_creator: 'ohvanankaahu',
            collection_name: 'dhtestdhtest',
            schema_name: "dhschema",
            schema_format: [{"name": "name", "type": "string"}, {"name": "tree_type", "type": "string"}]
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 1200,
      }).then(res => {
        console.dir(res);
      }).catch(err => {
        console.log("failed to create schema - see next line");
        console.dir(err.message);
        //console.dir(err);
      });

      await api.transact({
        actions: [{
          account: 'atomicassets',
          name: 'extendschema',
          authorization: [{
            actor: 'ohvanankaahu',
            permission: 'owner',
          }],
          data: {
            authorized_editor: 'ohvanankaahu',
            collection_name: 'dhtestdhtest',
            schema_name: "dhschema",
            schema_format_extension: [{"name": "tree_image", "type": "image"}]
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 1200,
      }).then(res => {
        console.dir(res);
      }).catch(err => {
        console.log("failed to extend schema - see next line");
        console.dir(err.message);
        //console.dir(err);
      });

      //a82f7114d5906a9b13cdcef7514fca3977bf8abafbdf258c1ea2a62d19ca637f
      //160836 (template id)
      //above are the transaction Id and associated template Id - to create more templates run the below commented out section

      // await api.transact({
      //   actions: [{
      //     account: 'atomicassets',
      //     name: 'createtempl',
      //     authorization: [{
      //       actor: 'ohvanankaahu',
      //       permission: 'owner',
      //     }],
      //     data: {
      //       authorized_creator: 'ohvanankaahu',
      //       collection_name: 'dhtestdhtest',
      //       schema_name: "dhschema",
      //       transferable: true,
      //       burnable: true,
      //       max_supply: 0,
      //       immutable_data: [{"key": "name", "value": ["string", "Test Token"]}]
      //     },
      //   }]
      // }, {
      //   blocksBehind: 3,
      //   expireSeconds: 1200,
      // }).then(res => {
      //   console.dir(res);
      // }).catch(err => {
      //   console.log("failed to create template - see next line");
      //   console.dir(err.message);
      //   //console.dir(err);
      // });

      await api.transact({
        actions: [{
          account: 'atomicassets',
          name: 'mintasset',
          authorization: [{
            actor: 'ohvanankaahu',
            permission: 'owner',
          }],
          data: {
            authorized_minter: 'ohvanankaahu',
            collection_name: 'dhtestdhtest',
            schema_name: "dhschema",
            template_id: 160836,
            new_asset_owner: 'ohvanankaahu',
            immutable_data: [{"key": "tree_type", "value": ["string", "Silver Birch"]}, {"key": "tree_image", "value": ["string", "QmZ6gBzTEUNor2G1qC5cBh1WNXKfWVa7wAz6ei9otFowsC"]}],
            mutable_data: [],
            tokens_to_back: []
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 1200,
      }).then(res => {
        console.dir(res);
      }).catch(err => {
        console.log("failed to mint asset - see next line");
        console.dir(err.message);
        //console.dir(err);
      });

    //TRANSER ASSET

    // await api.transact({
    //   actions: [{
    //     account: 'atomicassets',
    //     name: 'transfer',
    //     authorization: [{
    //       actor: 'ohvanankaahu',
    //       permission: 'owner',
    //     }],
    //     data: {
    //       from: 'ohvanankaahu',
    //       to: 'test1111test',
    //       asset_ids: [1099517092989],
    //       memo: "testing 123"
    //     },
    //   }]
    // }, {
    //   blocksBehind: 3,
    //   expireSeconds: 1200,
    // }).then(res => {
    //   console.dir(res);
    // }).catch(err => {
    //   console.log("failed to transer asset - see next line");
    //   console.dir(err.message);
    //   //console.dir(err);
    // });

    // await rpc.get_table_rows({
    //   json: true,               // Get the response as json
    //   code: 'atomicassets',      // Contract that we target
    //   scope: 'afrasvwertca',         // Account that owns the data
    //   table: 'assets',        // Table name
    //   limit: 10,                // Maximum number of rows that we want to get
    //   reverse: false,           // Optional: Get reversed data
    //   show_payer: false,          // Optional: Show ram payer
    //   owner: "afrasvwertca"
    // }).then(res => {
    //   console.dir(res);
    // }).catch(err => {
    //   console.dir(err);
    // });

    // console.dir(result);

})();