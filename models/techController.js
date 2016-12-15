const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');

//getAll, create, update, suggestions

//returns all docs in collection
function getAll(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('technologies')
      .find()
      .toArray((retrieveError, data) => {
        if (retrieveError) return next(retrieveError);

        // return the data
        res.techs = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

//adds a technology to the collection
 function add(req, res, next) {
  getDB().then((db, err) => {
   if (err) return next(err);
    db.collection('technologies')
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


//returns all names of techs from collection that match first letter

function getSuggestions(req, res, next) {
  const nameRegex = new RegExp('^' + req.query.text , 'i');
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('technologies')
      .find({'name' : nameRegex }, {'name' : 1, '_id' : 1})
      .sort({'name' : 1})
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);

        // return the data
        res.suggestions = data.map(function(tech){
          return { name: tech.name, id: tech._id };
        });
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
  getSuggestions
};
