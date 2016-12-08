const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');


//returns all docs in collection
function getAll(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('users')
      .find()
      .toArray((retrieveError, data) => {
        if (retrieveError) return next(retrieveError);

        // return the data
        res.users = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

//adds a user to the collection
 function add(req, res, next) {
  getDB().then((db, err) => {
   if (err) return next(err);
    db.collection('users')
      .insert(req.body.users, (insertErr, result) =>{
        if (insertErr) return next(insertErr);

        res.saved = result;
        db.close();
        return next();
      });
    return false;
  });
  return false;
 }

//deletes a user from the collection
 function deleteUser(req, res, next) {
  getDB().then((err, db) => {
    if (err) return next(err);

    db.collection('users')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
        if (removeErr) return next(removeErr);

        res.removed = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}



module.exports = {
  getAll,
  add,
  deleteUser
};
