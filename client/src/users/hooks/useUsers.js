import { useState, useCallback, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import {
  editUser,
  getUsers,
  deleteUser,
  getUserProfile,
  login,
  signup,
} from "./../services/userApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSearchParams } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilter] = useState(null);
  const [searchParams] = useSearchParams();
  const snack = useSnack();

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (users) {
      setFilter(
        Array.isArray(users)
          ? users.filter(
              (registeredUser) =>
                registeredUser.name.first.includes(query) ||
                registeredUser.name.last.includes(query) ||
                registeredUser.email.includes(query) ||
                registeredUser.phone.includes(query)
            )
          : []
      );
    }
  }, [users, query]);

  useAxios();
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();

  const requestStatus = useCallback(
    (loading, errorMessage, users, user = null) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
      setUsers(users);
    },
    [setUser]
  );

  const handleLogin = useCallback(
    async (user) => {
      try {
        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, null, userFromLocalStorage);
        navigate(ROUTES.CARDS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [navigate, requestStatus, setToken]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async (user) => {
      try {
        const normalizedUser = normalizeUser(user);
        setLoading(true);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );

  const handleEditUser = useCallback(
    async (userFromAdmin) => {
      try {
        setLoading(true);
        const updatedUser = await editUser(userFromAdmin);
        requestStatus(false, null, updatedUser, user);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus, user]
  );

  const handleGetUser = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        const userProfile = await getUserProfile(userId);
        requestStatus(false, null, userProfile, user);
        return userProfile;
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus, user]
  );

  const handleGetUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      requestStatus(false, null, users, user);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [requestStatus, user]);

  const handleDeleteUser = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        const registeredUser = await deleteUser(userId);
        requestStatus(false, null, registeredUser, user);
        snack("success", "The User has been successfully deleted");
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [snack, user, requestStatus]
  );

  return {
    isLoading,
    error,
    user,
    users,
    filteredUsers,
    handleLogin,
    handleLogout,
    handleSignup,
    handleEditUser,
    handleGetUsers,
    handleGetUser,
    handleDeleteUser,
  };
};

export default useUsers;
