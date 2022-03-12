const {
  addBuku,
  getSemuaBuku,
  getBuku,
  editBuku,
  deleteBuku,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/buku',
    handler: addBuku,
  },
  {
    method: 'GET',
    path: '/buku',
    handler: getSemuaBuku,
  },
  {
    method: 'GET',
    path: '/buku/{bookId}',
    handler: getBuku,
  },
  {
    method: 'PUT',
    path: '/buku/{bookId}',
    handler: editBuku,
  },
  {
    method: 'DELETE',
    path: '/buku/{bookId}',
    handler: deleteBuku,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: () => 'Oops! Halaman kosong',
  },
];

module.exports = routes;
