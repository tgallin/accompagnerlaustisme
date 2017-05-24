import { adminToyLibraryService } from '../services';

export const fetchToys = () => {
  return adminToyLibraryService.getToys()
  .then(res => res.data)
  // Returning [] as a placeholder now so it does not error out when this service
  // fails. We should be handling this in our DISPATCH_REQUEST_FAILURE
  .catch(() => []);
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

      //results.tags = fetchToyTags;
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

