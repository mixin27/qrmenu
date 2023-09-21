import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { signIn as signInApi } from "../apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // call this function when you want to authenticate the user
  const login = async (username, password) => {
    setLoading(true);
    const response = await signInApi(username, password);
    console.log(response);

    if (response && response.auth_token) {
      setToken(response.auth_token);
      navigate("/places");
    }

    setLoading(false);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      loading,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
