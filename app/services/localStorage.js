var LOCAL_STORAGE_NC = "_tgallin_nightlife_coordinator";

function localStorageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return false;
  }
}

const service = {
  retrieve: () => {
    var storedData;
    if (localStorageAvailable('localStorage') && localStorage.getItem(LOCAL_STORAGE_NC)) {
      storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NC));
      localStorage.removeItem(LOCAL_STORAGE_NC);
    }
    return storedData;
  },
  persist: (data) => {
    if (localStorageAvailable('localStorage')) {
      localStorage.setItem(LOCAL_STORAGE_NC, JSON.stringify(data));
    }
  }

};

export default service;
