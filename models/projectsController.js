const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');


//returns all projects in collection
function getAll(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('projects')
      .find()
      .toArray((retrieveError, data) => {
        if (retrieveError) return next(retrieveError);

        res.projects = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

//adds a project to the collection
 function add(req, res, next) {
  console.log(req.body);
  getDB().then((db, err) => {
   if (err) return next(err);
    db.collection('projects')
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

//deletes a project from the collection
 function deleteProject(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);

    db.collection('projects')
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
  const nameRegex = new RegExp('^' + req.query.name , 'i');

  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('projects')
      .find({ name: nameRegex })
      .toArray((retrieveError, data) => {
        if (retrieveError) return next(retrieveError);

        res.project = data;
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
    const projectObject = req.body;
    db.collection('projects')
      .update({ _id: ObjectID(req.params.id) }, { $set : projectObject });
    db.close();
    return next();
  });
}



module.exports = {
  getAll,
  add,
  deleteProject,
  update,
  search
};
