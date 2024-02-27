const pacote = require('pacote');

pacote
  .extract('create-vue-template', './tmp')
  .then(({ from, resolved, integrity }) => {
    console.log('extracted!', from, resolved, integrity);
  });
