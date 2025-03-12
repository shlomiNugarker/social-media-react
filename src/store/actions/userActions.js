import { userService } from "../../services/user/userService";
import { socketService } from "../../services/socket.service";

export function getUsers() {
  return async (dispatch, getState) => {
    try {
      const loggedInUser = getState().userModule.loggedInUser;

      if (!loggedInUser) return;
      const { filterByUsers } = getState().userModule;
      const users = await userService.getUsers(filterByUsers);

      // const ids = users.map((user) => user._id);
      // console.log(ids);

      const usersWithoutLoggedInUser = users.filter(
        (user) => user._id !== loggedInUser._id
      );

      dispatch({
        type: "SET_USERS",
        users: usersWithoutLoggedInUser,
      });
    } catch (err) {
      console.log("cannot get users:", err);
    }
  };
}

export function setUsers(users) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "SET_USERS", users });
    } catch (err) {
      console.log("cannot get users:", err);
    }
  };
}

export function setFilterByUsers(filterByUsers) {
  return async (dispatch) => {
    dispatch({ type: "SET_FILTER_BY_USERS", filterByUsers });
  };
}

export function login(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.login(userCred);
      dispatch({ type: "LOGIN", user });

      socketService.emit("setUserSocket", user._id);

      return user;
    } catch (err) {
      console.log("can't do login:", err);
      throw new Error(err);
    }
  };
}
export function getLoggedinUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getLoggedinUser();
      dispatch({ type: "GET_LOGGEDIN_USER", user });
      return user;
    } catch (err) {
      console.log("cannot getLoggedinUser:", err);
    }
  };
}
export function signup(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(userCred);
      dispatch({ type: "SIGNUP", user });
      return user;
    } catch (err) {
      console.log("cannot signup:", err);
    }
  };
}
export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      dispatch({ type: "LOGOUT" });
      return true;
    } catch (err) {
      console.log("cannot logout:", err);
    }
  };
}

export function updateUser(user) {
  return async (dispatch, getState) => {
    const savedUser = await userService.update(user);
    const { loggedInUser } = getState().userModule;

    if (savedUser._id === loggedInUser._id) {
      dispatch({ type: "UPDATE_LOGGED_IN_USER", user: savedUser });
    } else {
      // dispatch({ type: 'UPDATE_USER', user: savedUser })
    }
    return savedUser;
  };
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId);
      dispatch({ type: "REMOVE_USER", userId });
    } catch (err) {
      console.log("cannot remove user", err);
    }
  };
}

export function getUserById(userId) {
  return async (dispatch, getState) => {
    try {
      const { users } = getState().userModule;
      if (users[userId]) return users[userId];

      const user = await userService.getById(userId);
      dispatch({ type: "SAVE_USER", user: user });
      return user;
    } catch (err) {
      console.log("cannot getUserById:", err);
    }
  };
}
export function setLogingLoading(bool) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "SET_IS_LOADING_LOGING", bool });
    } catch (err) {
      console.log("cannot getUserById:", err);
    }
  };
}

export function addConnectedUsersForSocket(connectedUsers) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "SET_CONNECTED_USERS", connectedUsers });
      return connectedUsers;
    } catch (err) {
      console.log("cannot ADD_CONNECTED_USERS:", err);
    }
  };
}

export function addConnectedUserForSocket(connectedUser) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "ADD_CONNECTED_USER", connectedUser });
      return connectedUser;
    } catch (err) {
      console.log("cannot ADD_CONNECTED_USER:", err);
    }
  };
}
