import { adminUsersService } from '../services';

export const fetchUsers = () => {
  return adminUsersService.getUsers()
    .then(res => res.data)
    // Returning [] as a placeholder now so it does not error out when this service
    // fails. We should be handling this in our DISPATCH_REQUEST_FAILURE
    .catch(() => []);
};

export function fetchUsersByName(value, callback) {
  adminUsersService.getUsersByName(value)
    .then(res => { callback(res.data.users); })
    .catch((e) => { callback([]); });
}
