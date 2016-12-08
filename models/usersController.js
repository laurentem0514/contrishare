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
  getDB().then((db, err) => {
    if (err) return next(err);

    db.collection('users')
      .remove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
        if (removeErr) return next(removeErr);

        res.removed = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

//todo SEARCH

 function update(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    console.log('Trying to update user: ', req.params.id);

    db.collection('users')
      .update({ _id: ObjectID(req.params.id) }, { $set : req.body.user });
    db.close();
    //return next();
  });
}



module.exports = {
  getAll,
  add,
  deleteUser,
  update
};
