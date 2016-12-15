const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');


//returns all contribs in collection
function getAll(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('contributions')
      .find()
      .toArray((retrieveError, data) => {
        if (retrieveError) return next(retrieveError);

        res.contribs = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

//adds a contrib to the collection
 function add(req, res, next) {
  console.log(req.body);
  getDB().then((db, err) => {
   if (err) return next(err);
    db.collection('contributions')
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

//deletes a contrib from the collection
 function deleteContrib(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);

    db.collection('contributions')
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


function search(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('contributions')
      .find({ userId: req.query.userId})
      .toArray((retrieveError, data) => {
        if (retrieveError) return next(retrieveError);

        res.contrib = data;
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
    const contribObject = req.body;
    //contribObject.technology = ObjectID(userObject.technology);

    db.collection('contributions')
      .update({ _id: ObjectID(req.params.id) }, { $set : contribObject });
    db.close();
    return next();
  });
}



module.exports = {
  getAll,
  add,
  deleteContrib,
  update,
  search
};
