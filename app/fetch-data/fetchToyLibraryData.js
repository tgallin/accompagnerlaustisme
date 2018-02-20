import { adminToyLibraryService, toyLibraryService } from '../services';

export const fetchToysAndCategoriesAndTagsAndToyLibraries = () => {
  return adminToyLibraryService.getToys()
    .then(response => {
      var results = response.data;

      return adminToyLibraryService.getCategories()
        .then(res => {
          results.categories = res.data.categories;
          
          return adminToyLibraryService.getTags()
            .then(res => {
              results.tags = res.data.tags;
              
              return adminToyLibraryService.getToyLibraries()
                .then(res => {
                  results.toyLibraries = res.data.toyLibraries;
                  return results;
                })
                .catch(() => {
                  return results;
                });
            })
            .catch(() => {
              return results;
            });
          
        })
        .catch(() => {
          return results;
        });
    })
    .catch(() => {
      return [];
    });
};

export const fetchOnlineToys = () => {
  return toyLibraryService.getOnlineToys()
    .then(response => {
      var results = response.data;

      return toyLibraryService.getCategories()
        .then(res => {
          results.categories = res.data.categories;
          
          return toyLibraryService.getTags()
            .then(res => {
              results.tags = res.data.tags;
              
              return toyLibraryService.getToyLibraries()
                .then(res => {
                  results.toyLibraries = res.data.toyLibraries;
                  return results;
                })
                .catch(() => {
                  return results;
                });
            })
            .catch(() => {
              return results;
            });
          
        })
        .catch(() => {
          return results;
        });
    })
    .catch(() => {
      return [];
    });
};

export const fetchMyToysAndCategoriesAndTags = () => {
  return adminToyLibraryService.getMyToys()
    .then(response => {
      var results = response.data;

      return adminToyLibraryService.getCategories()
        .then(res => {
          results.categories = res.data.categories;
          
          return adminToyLibraryService.getTags()
            .then(res => {
              results.tags = res.data.tags;
              return results;
            })
            .catch(() => {
              return results;
            });
          
        })
        .catch(() => {
          return results;
        });
    })
    .catch(() => {
      return [];
    });
};

export const fetchToyCategoriesAndTags = () => {
  return adminToyLibraryService.getCategories()
    .then(response => {
      var results = response.data;

      return adminToyLibraryService.getTags()
        .then(res => {
          results.tags = res.data.tags;
          return results;
        })
        .catch(() => {
          return results;
        });
    })
    .catch(() => {
      return [];
    });
};

export const fetchToyTags = () => {
  return adminToyLibraryService.getTags()
  .then(res => res.data)
  .catch(() => []);
};

export const fetchToyLibraries = () => {
  return adminToyLibraryService.getToyLibraries()
  .then(res => res.data)
  .catch(() => []);
};

export const fetchToysAndBookings = () => {
  return adminToyLibraryService.getToys()
    .then(response => {
      var results = response.data;

      return adminToyLibraryService.getToyBookings()
        .then(res => {
          results.toyBookings = res.data.toyBookings;
          return results;
        })
        .catch(() => {
          return results;
        });
    })
    .catch(() => {
      return [];
    });
};

export function fetchToysByNameOrRef(value, callback) {
  adminToyLibraryService.getToysByNameOrRef(value)
    .then(res => { callback(res.data.toys); })
    .catch((e) => { callback([]); });
}
