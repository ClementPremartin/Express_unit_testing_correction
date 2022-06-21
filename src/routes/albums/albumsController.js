const connexion = require('../../../db-config');
const db = connexion.promise();

const getAll = (req, res) => {
  db.query('SELECT * FROM albums')
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const getOne = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM albums WHERE id= ?', [id])
    .then((result) => {
      if (result[0][0]) {
        res.status(200).json(result[0][0]);
      } else {
        res.status(404).send('Album Does not exist');
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const getTracksByAlbumId = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM track WHERE id_album= ?', [id])
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const postAlbums = (req, res) => {
  const { title, genre, picture, artist } = req.body;
  db.query(
    'INSERT INTO albums(title, genre, picture, artist) VALUES (?, ?, ?, ?)',
    [title, genre, picture, artist]
  )
    .then((result) => {
      res.status(201).json({ ...req.body, id: result[0].insertId });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const updateAlbums = (req, res) => {
  db.query('UPDATE albums SET ? WHERE id = ?', [req.body, req.params.id])
    .then((result) => {
      res.status(204).json(result[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteAlbums = (req, res) => {
  db.query('DELETE FROM albums WHERE id = ?', [req.params.id])
    .then((result) => {
      res.status(204).send(`album has been deleted`, result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
