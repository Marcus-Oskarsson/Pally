// https://dev.to/eswaraprakash/react-usecontext-and-usereducer-hooks-2pkm
import { createContext, useMemo, useReducer } from 'react';

export const Context = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {
    name: '',
    email: '',
    accesstoken: '',
    id: '',
  },
};

const actions = {
  SET_USER: 'SET_USER',
  UPDATE_ACCESSTOKEN: 'UPDATE_ACCESSTOKEN',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actions.UPDATE_ACCESSTOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          accesstoken: action.payload,
        },
      };
    default:
      return state;
  }
};

function Provider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(
    () => ({
      user: state.user,
      setUser: (user) => {
        dispatch({ type: actions.SET_USER, payload: user });
        localStorage.setItem('user', JSON.stringify(user));
      },
      updateAccestoken: (token) => {
        dispatch({ type: actions.UPDATE_ACCESSTOKEN, payload: token });
      },
    }),
    [state]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;

// EXAMPLE USAGE IN COMPONENT
// import { useContext, useEffect } from 'react';
// import { Context } from '../contexts/UserContext';

// const Component = () => {
//   const { user, setUser } = useContext(Context);

//   useEffect(() => {

//     const options = {
//       method: 'POST',
//       body: JSON.stringify({
//         email: 'John.Doe@mail.com',
//         password: 'password123',
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     fetch('/api/login', options).then((res) => {
//       res.json().then((data) => {
//         setUser(data);
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <h1>{user.name}</h1>
//     </div>
//   );
// };
