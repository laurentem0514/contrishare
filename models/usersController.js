const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');


//returns all users in collection
function getAll(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('users')
      .find()
      .toArray((retrieveError, data) => {
        if (retrieveError) return next(retrieveError);

        res.users = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

function getOne(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('users')
      .findOne({ _id: ObjectID(req.params.id) })
      .then((data) => {
        //if (retrieveError) return next(retrieveError);
        res.user = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


//adds a user to the collection
 function add(req, res, next) {
  console.log(req.body);
  getDB().then((db, err) => {
   if (err) return next(err);
    db.collection('users')
      .insert(req.body, (insertErr, result) =>{
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


function searchUsers(req, res, next) {
  const query = {};
  if (req.query.name.length){
    query.name = new RegExp('^' + req.query.name , 'i');
  }
  if (req.query.techId.length){
    query.technologies = {$elemMatch: {id: req.query.techId}};
  }

  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('users')
      .find(query)
      .toArray((retrieveError, data) => {
        if (retrieveError) return next(retrieveError);

        res.data = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


 function update(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    const userObject = req.body;
    userObject.technology = ObjectID(userObject.technology);

    db.collection('users')
      .update({ _id: ObjectID(req.params.id) }, { $set : userObject });
    db.close();
    return next();
  });
}



module.exports = {
  getAll,
  add,
  getOne,
  deleteUser,
  update,
  searchUsers
};
