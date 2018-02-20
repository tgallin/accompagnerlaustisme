import Toy from '../models/toy';
import ToyCategory from '../models/toyCategory';
import ToyTag from '../models/toyTag';
import ToyLibrary from '../models/toyLibrary';
import User from '../models/user';
import ToyBooking from '../models/toyBooking';
import Counter from '../models/counter';
import fs from 'fs';
var Sync = require('sync');
import { uploadImage, destroyImage } from '../../../image/cloudinaryUploader';
import { indexToy, removeToyFromIndex, searchToysInIndex } from '../../../search/elasticsearch';
import { isToyLibraryCentralized } from '../../../../config/app';

/**
 * GET /toys
 */
export function allToys(req, res) {
  Toy.find({}).sort({name: 1}).populate('owner').exec(function (err, toys) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des jeux' });
    }
    return res.status(200).json( { toys: toys} );
  });
}

/**
 * GET /toys/nameOrRef/:nameOrRef
 */
export function getToysByNameOrRef(req, res) {
  const nameOrRef = req.params.nameOrRef;
  var queryParts = [];
  queryParts.push({"name": {$regex : nameOrRef, $options: 'i'}});
  queryParts.push({"copies.reference": {$regex : nameOrRef, $options: 'i'}});
  
  const query = { $or: queryParts };
  
  Toy.find(query).sort({name: 1}).exec(function (err, toys) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des jeux' });
    }
    return res.status(200).json( { toys : toys} );
  });
}

/**
 * GET /onlinetoys
 */
export function onlineToys(req, res) {
  Toy.find({approved: true, online: true}).sort({updated: -1}).populate('categories tags').exec(function (err, toys) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des jeux' });
    }
    return res.status(200).json( { onlinetoys: toys} );
  });
}

/**
 * GET /mytoys
 */
export function allMyToys(req, res) {
  if (req.user) {
    
    const queryUser = {
      email: req.user.email
    };
    
    User.findOne(queryUser, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la recherche de l\'utilisateur' });
      }

      const queryToys = { owner: user._id };
      
      Toy.find(queryToys).sort({name: 1}).exec(function (err, toys) {
        if (err) {
          return res.status(500).json({ message: 'Problème lors de la récupération des jeux' });
        }
        return res.status(200).json( { mytoys: toys} );
      });
    });
  }
}

/**
 * POST /toys/search
 */
export function searchToys(req, res) {
  if (req.body.text) {
    searchToysInIndex(req.body.text, function (err, response) {
      if (err) {
        return res.status(500).json({ message: 'Problème lors de la recherche des jeux' });
      }
      var toysFound = [];
      if (response && response.hits && response.hits.total > 0) {
        toysFound = response.hits.hits;
      }
      return res.status(200).json( { text: req.body.text, results: toysFound} );
    });
  } else {
    return res.status(500).json({ message: 'Veuillez renseigner au moins un mot' });
  }
  

}

/**
 * GET /toys/categories
 */
export function allCategories(req, res) {
  ToyCategory.find({}).sort({name: 1}).populate('suggestedTags').exec(function (err, toyCategories) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des catégories de jeux' });
    }
    return res.status(200).json( { categories: toyCategories} );
  });
}

/**
 * GET /toys/tags
 */
export function allTags(req, res) {
  ToyTag.find({}).sort({name: 1}).exec(function (err, toyTags) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des mots clés' });
    }
    return res.status(200).json( { tags: toyTags} );
  });
}

/**
 * GET /toys/toylibraries
 */
export function allToyLibraries(req, res) {
  ToyLibrary.find({}).exec(function (err, toyLibraries) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des ludothèques' });
    }
    return res.status(200).json( { toyLibraries: toyLibraries } );
  });
}

/**
 * GET /toys/bookings
 */
export function allToyBookings(req, res) {
  ToyBooking.find({}).sort({start: -1}).populate('borrower toy').exec(function (err, toyBookings) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des emprunts de jeux' });
    }
    return res.status(200).json( { toyBookings: toyBookings } );
  });
}

/**
 * GET /mytoybookings
 */
export function allMyToyBookings(req, res) {
  if (req.user) {
    
    const queryUser = {
      email: req.user.email
    };
    
    User.findOne(queryUser, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la recherche de l\'utilisateur' });
      }

      const queryToyBookings = { borrower: user._id };
      
      ToyBooking.find(queryToyBookings).sort({start: -1}).populate('borrower toy').exec(function (err, toyBookings) {
        if (err) {
          return res.status(500).json({ message: 'Problème lors de la récupération de vos emprunts de jeux' });
        }
        return res.status(200).json( { mytoybookings: toyBookings} );
      });
    });
  }
}

/**
 * POST /toys/category creates or updates a category with provided data
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
        if (!existingCat) {
          return res.status(500).json({ message: 'Cette catégorie n\'existe plus'});
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
        if (!existingTag) {
          return res.status(500).json({ message: 'Ce mot clé n\'existe plus'});
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
 * POST /toys/toylibrary creates or updates a toy library with provided data
 */
export function saveToyLibrary(req, res) {
  if (req.body.toyLibraryId !== '') {
    
    if (req.body.toyLibraryId == 0) {
      
      var newToyLibrary = new ToyLibrary();
      
      newToyLibrary.name = req.body.name;
      
      newToyLibrary.address = {
        street: req.body.street,
        postalCode: req.body.postalCode,
        city: req.body.city
      };
      
      newToyLibrary.openings = req.body.openings;
      newToyLibrary.active = req.body.active;

      newToyLibrary.save(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la création' });
        }
        return res.status(200).json({ toyLibrary: newToyLibrary, message:  'Lieu créé avec succès' });
      });
    } else {
      const query = {
        _id: req.body.toyLibraryId
      };

      ToyLibrary.findOne(query, (err, existingToyLibrary) => {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la recherche du lieu' });
        }
        if (!existingToyLibrary) {
          return res.status(500).json({ message: 'Ce lieu n\'existe plus'});
        }
        
        existingToyLibrary.name = req.body.name;
        
        existingToyLibrary.address = {
          street: req.body.street,
          postalCode: req.body.postalCode,
          city: req.body.city
        };
        
        existingToyLibrary.openings = req.body.openings;
        existingToyLibrary.active = req.body.active;
      
        existingToyLibrary.save(function(err) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
          }
          return res.status(200).json({ toyLibrary: existingToyLibrary, message: 'Lieu mis à jour avec succès' });
        });
        
      });
    }
  }
}

/**
 * POST /toys/toylibrary creates or updates a toy library with provided data
 */
export function saveToyBooking(req, res) {
  if (req.body.toyBookingId !== '') {
    
    if (req.body.toyBookingId == 0) {
      
      var newToyBooking = new ToyBooking();
      
      newToyBooking.borrower = req.body.borrowerId;
      newToyBooking.toy = req.body.toyId;
      newToyBooking.reference = req.body.reference;
      newToyBooking.start = req.body.start;
      newToyBooking.end = req.body.end;
      newToyBooking.returnedDate = req.body.returnedDate;

      newToyBooking.save(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la création' });
        }
        updateToyCurrentBooking(req.body.toyId, req.body.reference, function (errMessage, toy) {
          if (errMessage) {
            console.log(errMessage);
          }
          return res.status(200).json({ toyBooking: newToyBooking, toy: toy, message: 'Emprunt mis à jour avec succès' });
        });
      });
    } else {
      const query = {
        _id: req.body.toyBookingId
      };

      ToyBooking.findOne(query, (err, existingToyBooking) => {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la recherche de l\'emprunt' });
        }
        if (!existingToyBooking) {
          return res.status(500).json({ message: 'Cet emprunt n\'existe plus'});
        }
        
        existingToyBooking.borrower = req.body.borrowerId;
        existingToyBooking.toy = req.body.toyId;
        existingToyBooking.reference = req.body.reference;
        existingToyBooking.start = req.body.start;
        existingToyBooking.end = req.body.end;
        existingToyBooking.returnedDate = req.body.returnedDate;
      
        existingToyBooking.save(function(err) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
          }
          
          updateToyCurrentBooking(req.body.toyId, req.body.reference, function (errMessage, toy) {
            if (errMessage) {
              console.log(errMessage);
            }
            return res.status(200).json({ toyBooking: existingToyBooking, toy: toy, message: 'Emprunt mis à jour avec succès' });
          });
        });
        
      });
    }
  }
}

export function updateToyCurrentBooking(toyId, reference, returnToyCallback) {
  
  const toyBookingQuery = {
    reference: reference,
    returnedDate: null
  };

  ToyBooking.findOne(toyBookingQuery, (err, currentToyBooking) => {
    
    if (err) {
      returnToyCallback('Problème technique lors de la recherche de l\'emprunt courant', null);
    }
    
    var toyQuery ={
      _id: toyId
    };
    
    if (!currentToyBooking) {
      Toy.findOne(toyQuery, (err, toy) => {
        
        if (err) {
          returnToyCallback('Problème technique lors de la recherche du jeu', null);
        }
        if (toy) {

          toy.copies.forEach((copy) => {
            if (copy.reference === reference) {
              copy.currentBooking = undefined;
            }
          });
          toy.save(function(err) {
            if (err) {
              returnToyCallback('Problème technique lors de la mise à jour de l\'emprunt courant du jeu', null);
            }
            indexationToy(toy._id);
            returnToyCallback(null, toy);
          });
        }

      });
      
    } else {

      Toy.findOne(toyQuery, (err, toy) => {
        if (err) {
          returnToyCallback('Problème technique lors de la recherche du jeu', null);
        }
        if (toy) {
          toy.copies.forEach((copy) => {
            if (copy.reference === reference) {
              copy.currentBooking = currentToyBooking._id;
            }
          });
          toy.save(function(err) {
            if (err) {
              returnToyCallback('Problème technique lors de la mise à jour de l\'emprunt courant du jeu', null);
            }
            indexationToy(toy._id);
            returnToyCallback(null, toy);
          });
        }
      });
    }
  });
}

/**
 * remove a category
 */
export function removeCategory(req, res) {
  const catId = req.params.id;
  const query = { _id: catId };
  
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
export function removeTag(req, res) {
  const tagId = req.params.id;
  const query = { _id: tagId };
  
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

/**
 * remove a toy library
 */
export function removeToyLibrary(req, res) {
  const toyLibraryId = req.params.id;
  const query = { _id: toyLibraryId };
  
  ToyLibrary.findOneAndRemove(query, (err) => {
    if (err) {
      return res.status(500).send('Problème technique lors de la suppression');
    }
    
    // 1st parameter is the query : we search the toys whose toy library is the id provided
    // 2nd parameter is what we update : we clear the toy library field
    Toy.update(
      { toyLibrary: toyLibraryId },
      { toyLibrary: undefined }
    );

    return res.status(200).send({ id: toyLibraryId, message: 'Lieu supprimé avec succès' });
  });
}

/**
 * remove a toy booking
 */
export function removeToyBooking(req, res) {
  const toyBookingId = req.params.id;
  const query = { _id: toyBookingId };
  
  ToyBooking.findOne(query, (err, toyBooking) => {
    if (err) {
      return res.status(500).send('Problème technique lors de la recherche de l\'emprunt');
    }
    toyBooking.remove(function (err, toyBooking) {
      if (err) {
        return res.status(500).send('Problème technique lors de la suppression');
      }
      updateToyCurrentBooking(toyBooking.toy, toyBooking.reference, function (errMessage, toy) {
        if (errMessage) {
          console.log(errMessage);
        }
        return res.status(200).send({ id: toyBookingId, toy: toy, message: 'Emprunt supprimé avec succès' });
      });
    });
  });
}

function addPicture(pictures, req, i, userId, toyId) {
  var file = req.files['pictures['+ i +']'];
  var picture = {
    path: ''
  };
  if (file) {
    picture = {
      path: file[0].path,
      folder: userId + '/' + toyId + '/'
    };
  }
  pictures.push(picture);
}

function removeFile(file) {
  if (file.path !== '') {
    fs.stat(file.path, function (err, stats) {
     if (err) {
        console.log(err);
     }
  
     fs.unlink(file.path, function(err){
        if (err) {
          console.log(err);
        }
     });
    });
  }
}

function indexationToy(toyId) {
  Toy.findOne({_id: toyId}).populate('categories tags owner toyLibrary').exec(function (err, toy) {
    if (!err && toy) {
      indexToy(toy);
    }
  });
}

function getNextSequence(counter, callback) {
  Counter.increment('toy', function (err, result) {
    if (err) {
      console.log(err);
    }
    callback(null, result.seq);
  });
}

function getCategoryName(catId, callback) {
  if (catId) {
    ToyCategory.findOne({_id: catId}, (err, existingCat) => {
      callback(null, existingCat.name);
    });
  } else {
    callback(null, '');
  }
}

/**
 * POST /toys creates or updates a toy with provided data
 */
export function saveToy(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };
    
    // file in request :
/*          { fieldname: 'pictures[0]',
  originalname: 'IMG_5649.JPG',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: 'be7f7d60a3ed0170630c482f98b32d64',
  path: 'uploads/be7f7d60a3ed0170630c482f98b32d64',
  size: 2447372 }*/
  
  // result after upload :
  
/*  { public_id: 'bhtoqh2wfljr9dkzkn6e',
  version: 1495318268,
  signature: '66759e1d169802c9feef939c39b3955ff97ccc88',
  width: 2448,
  height: 3264,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2017-05-20T22:11:08Z',
  tags: [],
  bytes: 2909854,
  type: 'upload',
  etag: '35cef7fc74b08fd906c789f3e39bf93c',
  url: 'http://res.cloudinary.com/dzona3plq/image/upload/v1495318268/bhtoqh2wfljr9dkzkn6e.jpg',
  secure_url: 'https://res.cloudinary.com/dzona3plq/image/upload/v1495318268/bhtoqh2wfljr9dkzkn6e.jpg',
  original_filename: 'f39ff7d897e38a707605d49ace1be4e5' }*/

    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la recherche de votre compte' });
      }

      if (req.body.toyId !== '') {
        
        var categoriesArr = req.body.categories && req.body.categories !== '' ? req.body.categories.split(',') : [];
        var firstCatId = categoriesArr.length > 0 ? categoriesArr[0] : null;
        
        if (req.body.toyId == 0) {
          
          // Run in a fiber 
          Sync(function() {
              
            var categoryName = getCategoryName.sync(null, firstCatId);
            var referencePrefix = categoryName.toUpperCase().substring(0,4) + req.body.name.toUpperCase().substring(0,4);
            var copies = [];
            if (req.body.copies) {
              var formDataCopies = JSON.parse(req.body.copies);
              if (formDataCopies && formDataCopies.length > 0) {
                formDataCopies.forEach(copy => {
                  copies.push(
                    {
                     reference:  referencePrefix + getNextSequence.sync(null, 'toy'),
                     toyLibrary: copy.toyLibraryId && copy.toyLibraryId !== '' ? copy.toyLibraryId : null
                    }
                  );
                });
              }
            }
            return copies;
            
          }, function(err, copies) {
            
            var newToy = new Toy();
            newToy.copies = copies;
          
            newToy.name = req.body.name;
            if (req.body.content) {
              newToy.content = req.body.content;
            }
            if (req.body.description) {
              newToy.description = req.body.description;
            }
            
            newToy.categories = categoriesArr;
            newToy.tags = req.body.tags && req.body.tags !== '' ? req.body.tags.split(',') : [];
          
            newToy.owner = req.body.ownerId ? req.body.ownerId : user._id;
          
            if (req.body.approved !== null) {
              newToy.approved = req.body.approved;
            } else {
              newToy.approved = false;
            }
            if (!newToy.approved) {
              newToy.online = false;
            } else {
              if (req.body.online !== null) {
                newToy.online = req.body.online;
              } else {
                newToy.online = false;
              }
            }
            
            if (req.body.productCode) {
              newToy.productCode = req.body.productCode;
            }
            
            if (req.body.comments) {
              newToy.comments = JSON.parse(req.body.comments);
            }
  
            newToy.save(function(err) {
              if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Problème technique lors de la création' });
              }
              
              var pictures = [];
              for (var i = 0; i < 4; i++) {
                addPicture(pictures, req, i, user._id, newToy._id);
              }
              
              // By default, Cloudinary's upload API works synchronously: 
              // uploaded images are processed and eager transformations 
              // are generated synchronously during the upload API call,
              
              var results = [];
              uploadImage(pictures[0], function (err, pic1) {
                if (err) {
                  console.log('problème d\'upload de l\'image ');
                }
                if (pic1 && pic1.public_id) {
                  results.push(pic1);
                }
                uploadImage(pictures[1], function (err, pic2) {
                  if (err) {
                    console.log('problème d\'upload de l\'image ');
                  }
                  if (pic2 && pic2.public_id) {
                    results.push(pic2);
                  }
                  uploadImage(pictures[2], function (err, pic3) {
                    if (err) {
                      console.log('problème d\'upload de l\'image ');
                    }
                    if (pic3 && pic3.public_id) {
                      results.push(pic3);
                    }
                    uploadImage(pictures[3], function (err, pic4) {
                      if (err) {
                        console.log('problème d\'upload de l\'image ');
                      }
                      if (pic4 && pic4.public_id) {
                        results.push(pic4);
                      }
                      newToy.pictures = results;
                      newToy.save(function(err) {
                        if (err) {
                          console.log('problème lors de la sauvegarde des images du jeu');
                        }
                      });
                      
                      // delete uploaded images
                      pictures.forEach((p) => {
                        removeFile(p);
                      });
                      
                      user.toys.push(newToy._id);
                      user.save(function(err) {
                        if (err) {
                          return res.status(500).json({ message: 'Problème technique lors de l\'ajout du jeu' });
                        }
                        indexationToy(newToy._id);
                        return res.status(200).json({ toy: newToy, message:  'Jeu créé avec succès' });
                      });
                    });
                  });
                });
              });
            });
          });
        } else {
          const query = {
            _id: req.body.toyId
          };
    
          Toy.findOne(query, (err, existingToy) => {
            if (err) {
              return res.status(500).json({ message: 'Problème technique lors de la recherche du jeu' });
            }
            if (!existingToy) {
              return res.status(500).json({ message: 'Ce jeu n\'existe plus' });
            }
            
            // Run in a fiber 
          Sync(function() {
              
            var categoryName = getCategoryName.sync(null, firstCatId);
            var referencePrefix = categoryName.toUpperCase().substring(0,4) + req.body.name.toUpperCase().substring(0,4);
            var copies = [];
            if (req.body.copies) {
              var formDataCopies = JSON.parse(req.body.copies);
              if (formDataCopies && formDataCopies.length > 0) {
                formDataCopies.forEach(copy => {
                  copies.push(
                    {
                     reference:  (!copy.reference || copy.reference === '') ? referencePrefix + getNextSequence.sync(null, 'toy') : copy.reference,
                     toyLibrary: copy.toyLibraryId && copy.toyLibraryId !== '' ? copy.toyLibraryId : null,
                     currentBooking: copy.currentBookingId && copy.currentBookingId !== '' ? copy.currentBookingId : null
                    }
                  );
                });
              }
            }
            return copies;
            
          }, function(err, copies) {
            
            existingToy.name = req.body.name;
            
            existingToy.copies = copies;
             
            if (req.body.content && req.body.content !== '') {
              existingToy.content = req.body.content;
            } else {
              existingToy.content = null;
            }
            
            if (req.body.description && req.body.description !== '') {
              existingToy.description = req.body.description;
            } else {
              existingToy.description = null;
            }
            
            existingToy.categories = req.body.categories && req.body.categories !== '' ? req.body.categories.split(',') : [];
            existingToy.tags = req.body.tags && req.body.tags !== '' ? req.body.tags.split(',') : [];
            
            if (req.body.ownerId) {
              existingToy.owner = req.body.ownerId;
            }
            
            if (req.body.approved !== null) {
              existingToy.approved = req.body.approved;
            } else {
              existingToy.approved = false;
            }
            if (!existingToy.approved) {
              existingToy.online = false;
            } else {
              if (req.body.online !== null) {
                existingToy.online = req.body.online;
              } else {
                existingToy.online = false;
              }
            }
            
            if (req.body.toyLibraryId) {
              existingToy.toyLibrary = req.body.toyLibraryId;
            } else if (existingToy.toyLibrary) {
              existingToy.toyLibrary = null;
            }
            
            if (req.body.productCode) {
              existingToy.productCode = req.body.productCode;
            }
            
            if (req.body.comments) {
              existingToy.comments = JSON.parse(req.body.comments);
            } else {
              existingToy.comments = null;
            }
            
            existingToy.updated = Date.now();
            
            var pictures = [];
            for (var i = 0; i < 4; i++) {
              addPicture(pictures, req, i, user._id, existingToy._id);
            }
            
            var removedPictures = req.body.removedPictures && req.body.removedPictures !== '' ? req.body.removedPictures.split(',') : [];
            
            // By default, Cloudinary's upload API works synchronously: 
            // uploaded images are processed and eager transformations 
            // are generated synchronously during the upload API call,
            
            var results = [];
            uploadImage(pictures[0], function (err, pic1) {
              if (err) {
                console.log('problème d\'upload de l\'image ');
              }
              if (pic1 && pic1.public_id) {
                results.push(pic1);
              }
              uploadImage(pictures[1], function (err, pic2) {
                if (err) {
                  console.log('problème d\'upload de l\'image ');
                }
                if (pic2 && pic2.public_id) {
                  results.push(pic2);
                }
                uploadImage(pictures[2], function (err, pic3) {
                  if (err) {
                    console.log('problème d\'upload de l\'image ');
                  }
                  if (pic3 && pic3.public_id) {
                    results.push(pic3);
                  }
                  uploadImage(pictures[3], function (err, pic4) {
                    if (err) {
                      console.log('problème d\'upload de l\'image ');
                    }
                    if (pic4 && pic4.public_id) {
                      results.push(pic4);
                    }
                    
                    
                    existingToy.pictures.forEach((p) => {
                      if (removedPictures.includes(p.public_id)) {
                        destroyImage(p.public_id);
                      } else {
                        results.push(p);
                      }
                    });
                    
                    existingToy.pictures = results;

                    // delete uploaded images
                    pictures.forEach((p) => {
                      removeFile(p);
                    });

                    existingToy.save(function(err) {
                      if (err) {
                        console.log(err);
                        return res.status(500).json({ message: 'Problème technique lors de la mise à jour du jeu' });
                      }
                      indexationToy(existingToy._id);
                      return res.status(200).json({ toy: existingToy, message: 'Jeu mis à jour avec succès' });
                    });
                  });
                });
              });
            });
            
          });
    
            
          });
        }
      }
    });
  }
}

/**
 * POST /toys/toggleOnline toogle online value of the toy
 */
export function toggleOnline(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };
    
    // if toy library managment is centralized
    // then only an admin can change the online status
    if (isToyLibraryCentralized) {
      query.admin = true;
    }
    
    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la recherche de l\'utilisateur' });
      }

      if (req.body.toyId !== '') {
        
        const query = {
          _id: req.body.toyId
        };
  
        Toy.findOne(query).populate('owner').exec(function (err, existingToy) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la recherche du jeu' });
          }
          if (!existingToy) {
            return res.status(500).json({ message: 'Ce jeu n\'existe plus' });
          }
          // toggle the value
          existingToy.online = !existingToy.online;
          
          existingToy.save(function(err) {
            if (err) {
              return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
            }
            indexationToy(existingToy._id);
            return res.status(200).json({ toy: existingToy, message: 'Jeu mis à jour avec succès' });
          });
        
        });
      }
    });
  }
}

/**
 * remove a toy
 */
export function removeToy(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };
    
    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la recherche de l\'utilisateur' });
      }

      const toyId = req.params.id;
      const query = { _id: toyId };
      
      Toy.findOne(query, (err, toy) => {
        if (err) {
          return res.status(500).send('Problème technique lors de la suppression');
        }
        if (!toy) {
          return res.status(500).json({ message: 'Ce jeu n\'existe plus' });
        }
        
        // only the toy's owner or an admin can remove the toy
        if (toy.owner === user._id || user.admin) {
          toy.remove();
          user.toys.pull(toyId);
          user.save(function(err) {
            if (err) {
              return res.status(500).json({ message: 'Problème technique lors de la suppression du jeu' });
            }
            removeToyFromIndex(toyId);
            return res.status(200).send({ id: toyId, message: 'Jeu supprimé avec succès' });
          });
        } else {
          return res.status(500).json({ message: 'Vous n\'avez pas l\'habilitation pour supprimer ce jeu' });
        }
        

      });
    });
  }
}

export default {
  allToys,
  getToysByNameOrRef,
  onlineToys,
  allMyToys,
  searchToys,
  saveToy,
  toggleOnline,
  removeToy,
  allCategories,
  saveCategory,
  removeCategory,
  allTags,
  saveTag,
  removeTag,
  allToyLibraries,
  saveToyLibrary,
  removeToyLibrary,
  allToyBookings,
  saveToyBooking,
  removeToyBooking,
  allMyToyBookings
};
