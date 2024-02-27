const dgit = require('download-git-repo');

dgit('toimc/create-vue-template#main', './tmp', function (err) {
  console.log(err);
  console.log(err ? 'Error' : 'Success');
});
