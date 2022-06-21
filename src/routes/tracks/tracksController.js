const connexion = require('../../../db-config');
const db = connexion.promise();

const getOne = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM track WHERE id = ?', [id])
    .then((result) => {
      if (result[0][0]) {
        res.status(200).json(result[0][0]);
      } else {
        res.status(404).send('track Does not exist');
      }
    })
    .catch((err) => res.status(404).send(err));
};

const getAll = (req, res) => {
  db.query('SELECT * FROM track')
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const postTracks = (req, res) => {
  const { title, youtube_url, id_album } = req.body;
  db.query('INSERT INTO track(title, youtube_url, id_album) VALUES (?, ?, ?)', [
    title,
    youtube_url,
    id_album,
  ])
    .then((result) => {
      res.status(201).json({ ...req.body, id: result[0].insertId });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const updateTracks = (req, res) => {
  db.query('UPDATE track SET ? WHERE id = ?', [req.body, req.params.id])
    .then((result) => {
      res.status(204).json(result[0]);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const deleteTracks = (req, res) => {
  db.query('DELETE FROM track WHERE id = ?', [req.params.id])
    .then((result) => {
      res.status(204).send('track has been deleted', result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
