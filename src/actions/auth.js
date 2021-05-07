import { auth, firestore } from "../firebase/config";
import { authConstants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    const db = firestore;

    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });

    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const currentUser = auth.currentUser;
        currentUser
          .updateProfile({
            displayName: user.name,
          })
          .then(() => {
            db.collection("users")
              .doc(data.user.uid)
              .set({
                name: user.name,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                const loggedIn = {
                  name: user.name,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem("user", JSON.stringify(loggedIn));
                console.log("user logged in");
                dispatch({
                  type: `${authConstants.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedIn },
                });
              })
              .catch((error) => {
                console.error(error);
                dispatch({
                  type: `${authConstants.USER_LOGIN}_FAILURE`,
                  payload: { error },
                });
              });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstants.USER_LOGIN}_REQUEST`,
    });
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);

        const db = firestore;
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName;

            const loggedIn = {
              name,
              uid: data.user.uid,
              email: data.user.email,
            };

            localStorage.setItem("user", JSON.stringify(loggedIn));

            dispatch({
              type: `${authConstants.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedIn },
            });
          })
          .catch((error) => {
            console.error(error);
            dispatch({
              type: `${authConstants.USER_LOGIN}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const isLoggedIn = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user) {
      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: { user: user },
      });
    } else {
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: { error: "Login again please" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstants.USER_LOGOUT}_REQUEST`,
    });

    const db = firestore;
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth
          .signOut()
          .then(() => {
            localStorage.clear();
            dispatch({
              type: `${authConstants.USER_LOGOUT}_SUCCESS`,
            });
          })
          .catch((error) => {
            console.error(error);
            dispatch({
              type: `${authConstants.USER_LOGOUT}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
