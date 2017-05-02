import Toy from '../models/toy';
import ToyCategory from '../models/toyCategory';
import ToyTag from '../models/toyTag';

/**
 * GET /toys
 */
export function allToys(req, res) {
    Toy.find({}, function (err, toys) {
      if (err) {
        return res.status(500).json({ message: 'Problème lors de la récupération des jouets' });
      }
      return res.status(200).json( { toys: toys} );
    });
}

/**
 * GET /toys/categories
 */
export function allCategories(req, res) {
    ToyCategory.find({}, function (err, toyCategories) {
      if (err) {
        return res.status(500).json({ message: 'Problème lors de la récupération des catégories de jouets' });
      }
      return res.status(200).json( { categories: toyCategories} );
    });
}

/**
 * GET /toys/tags
 */
export function allTags(req, res) {
    ToyTag.find({}, function (err, toyTags) {
      if (err) {
        return res.status(500).json({ message: 'Problème lors de la récupération des mots clés' });
      }
      return res.status(200).json( { tags: toyTags} );
    });
}

/**
 * POST /toys/tag creates or updates a category with provided data
 */
export function saveCategory(req, res) {
  if (req.body.toyCatId !== '') {
    
    if (req.body.toyCatId == 0) {
      var newCat = new ToyCategory();
      newCat.name = req.body.name;
      newCat.suggestedTags = req.body.suggestedTags;

      newCat.save(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la création' });
        }
        return res.status(200).json({ category: newCat, message:  'Catégorie créée avec succès' });
      });
    } else {
      const query = {
        _id: req.body.toyCatId
      };

      ToyCategory.findOne(query, (err, existingCat) => {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la recherche du mot clé' });
        }

        existingCat.name = req.body.name;
        existingCat.suggestedTags = req.body.suggestedTags;
        existingCat.save(function(err) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
          }
          return res.status(200).json({ category: existingCat, message: 'Catégorie mise à jour avec succès' });
        });
        
      });
    }
  
  }
}

/**
 * POST /toys/tag creates or updates a tag with provided data
 */
export function saveTag(req, res) {
  if (req.body.toyTagId !== '') {
    
    if (req.body.toyTagId == 0) {
      var newTag = new ToyTag();
      newTag.name = req.body.name;

      newTag.save(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la création' });
        }
        return res.status(200).json({ tag: newTag, message:  'Mot clé créé avec succès' });
      });
    } else {
      const query = {
        _id: req.body.toyTagId
      };

      ToyTag.findOne(query, (err, existingTag) => {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la recherche du mot clé' });
        }

        existingTag.name = req.body.name;
        existingTag.save(function(err) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
          }
          return res.status(200).json({ tag: existingTag, message: 'Mot clé mis à jour avec succès' });
        });
        
      });
    }
  }
}

/**
 * remove a category
 */
function removeCategory(req, res) {
  const catId = req.params.id;
  const query = { _id : catId };
  
  ToyCategory.findOneAndRemove(query, (err) => {
    if (err) {
      return res.status(500).send('Problème technique lors de la suppression');
    }
    
    Toy.update(
      { },
      { $pull: { categories: catId } }
    );

    return res.status(200).send({ id: catId, message: 'Catégorie supprimée avec succès' });
  });
}

/**
 * remove a tag
 */
function removeTag(req, res) {
  const tagId = req.params.id;
  const query = { _id : tagId };
  
  ToyTag.findOneAndRemove(query, (err) => {
    if (err) {
      return res.status(500).send('Problème technique lors de la suppression');
    }
    
    ToyCategory.update(
      { },
      { $pull: { suggestedTags: tagId } }
    );
    return res.status(200).send({ id: tagId, message: 'Mot clé supprimé avec succès' });
  });
}



export default {
  allToys,
  allCategories,
  saveCategory,
  removeCategory,
  allTags,
  saveTag,
  removeTag
};
