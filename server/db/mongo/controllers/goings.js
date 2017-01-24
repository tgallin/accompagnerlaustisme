import _ from 'lodash';
import Going from '../models/goings';

/**
 * return the number of people going to a list of bars
 */
export function howManyAreGoing(req, res) {
  var ids = req.query.ids.split(",");
  var query = [
    {$group: {
      _id: "$barId",
      going: {$sum: 1}
    }},
    { $match: { barId: { $in: ids } } }
  ];
  
  Going.aggregate(query, function(err, results) {
    if (err) {
      console.log('Error in trying to get the number of people going to bars');
      return res.status(500).send('Something went wrong trying to get the number of people going to bars');
    }

    return res.status(200).send(results);
  });
}

/**
 * Add user to a bar
 */
function addUserToBar(req, res) {

  var newGoing = new Going();
  newGoing.userId = req.user.id;
  newGoing.barId = req.params.id;

  newGoing.save(function(err, going) {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('added');
  });
}

/**
 * remove user from a bar
 */
function removeUserFromBar(req, res) {
  const query = { barId: req.params.id, userId: req.user.id };
  
  Going.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on removing user from bar');
      return res.status(500).send('We failed to remove the user for the bar');
    }

    return res.status(200).send('removed');
  });
}

/**
 * update going of a user to a bar : if one is already going, we remove them from the bar and if one is not going, we add it to the bar
 */
export function updateGoing(req, res) {
  const query = { barId: req.params.id, userId: req.user.id };
  
  Going.count(query, function(err, result) {
    if (err) {
      console.log('Error in trying to get the number of people going to a bar');
      return res.status(500).send('Something went wrong trying to get the number of people going to a bar');
    }
    if (result===0) {
      addUserToBar(req, res);
    } else {
      removeUserFromBar(req, res);
    }
  });
}

export default {
  howManyAreGoing,
  updateGoing
};
