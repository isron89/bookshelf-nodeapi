const { nanoid } = require('nanoid');
// files
const books = require('./buku');

const addBuku = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    
    const response = h
      .response({
        status: 'fail',
        message: 'Proses gagal. Masukkan nama buku',
      })
      .code(400);
    return response;
  }

  if (readPage > pageCount) {
    
    const response = h
      .response({
        status: 'fail',
        message:
          'Proses gagal. readPage harus lebih kecil dari pageCount',
      })
      .code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    
    const response = h
      .response({
        status: 'success',
        message: 'Berhasil menambahkan buku',
        data: {
          bookId: id,
        },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Gagal menambahkan buku',
    })
    .code(500);
  return response;
};

const getSemuaBuku = (request, h) => {
  const { name, reading, finished } = request.query;

  if (!name && !reading && !finished) {
    
    const response = h
      .response({
        status: 'success',
        data: {
          books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return response;
  }

  if (name) {
    const filteredBooksName = books.filter((book) => {
      
      const nameRegex = new RegExp(name, 'gi');
      return nameRegex.test(book.name);
    });

    const response = h
      .response({
        status: 'success',
        data: {
          books: filteredBooksName.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return response;
  }

  if (reading) {
    
    const filteredBooksReading = books.filter(
      (book) => Number(book.reading) === Number(reading),
    );

    const response = h
      .response({
        status: 'success',
        data: {
          books: filteredBooksReading.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return response;
  }

  const filteredBooksFinished = books.filter(
    (book) => Number(book.finished) === Number(finished),
  );

  const response = h
    .response({
      status: 'success',
      data: {
        books: filteredBooksFinished.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);

  return response;
};

const getBuku = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book) {
    
    const response = h
      .response({
        status: 'success',
        data: {
          book,
        },
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Maaf buku tidak ada',
    })
    .code(404);
  return response;
};

const editBuku = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    
    const response = h
      .response({
        status: 'fail',
        message: 'Proses gagal. Masukkan nama buku',
      })
      .code(400);
    return response;
  }

  if (readPage > pageCount) {
    
    const response = h
      .response({
        status: 'fail',
        message:
          'Proses gagal. readPage harus lebih kecil dari pageCount',
      })
      .code(400);
    return response;
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((note) => note.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h
      .response({
        status: 'success',
        message: 'Update buku berhasil',
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Gagal mengupdate buku. Id buku tidak ada',
    })
    .code(404);
  return response;
};

const deleteBuku = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((note) => note.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h
      .response({
        status: 'success',
        message: 'Berhasil menghapus buku',
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Gagal menghapus buku. Id buku tidak ada',
    })
    .code(404);
  return response;
};

module.exports = {
  addBuku,
  getSemuaBuku,
  getBuku,
  editBuku,
  deleteBuku,
};
