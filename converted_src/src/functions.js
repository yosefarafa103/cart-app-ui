import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export const isLoggedIn = !!Cookies.get("jwt");
export const localHost = "http://localhost:5001";
export const getData = async (dataItems) => {
  try {
    const res = await axios.get(`${localHost}/${dataItems}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const productsInCart = JSON.parse(localStorage.getItem("productsCart"));
export const getItemById = async (dataItems, id) => {
  const res = await axios.get(`${localHost}/${dataItems}/${id}`);
  return res.data;
};
export const createBooking = async (data) => {
  const loggedUser = await loggedInUser();
  const res = await axios.post(`${localHost}/booking`, {
    ...data,
    bookedProduct: loggedUser,
  });
  return res.data;
};
export function setLocalStorage(id) {
  // const data = productsInCart.splice(productsInCart.indexOf(id));
  const data = productsInCart.filter((el) => el !== id);
  localStorage.setItem("productsCart", JSON.stringify(data));
  productsInCart.splice(productsInCart.indexOf(id));
  return productsInCart;
}

export async function tryFetchQuery(url) {
  try {
    const items = await axios.get(url);
    // console.log(items)
    return items;
  } catch (err) {
    console.log(err);
  }
}

export const login = async (data) => {
  try {
    const logUser = await axios.post(`${localHost}/users/login`, data);
    // return { status: "success", data: logUser };
    return logUser;
  } catch (err) {
    console.log(err);

    throw new Error(err?.response?.data?.err);
  }
};
export const isTokenExperied = (decoded) =>
  decoded.exp < Math.floor(Date.now() / 1000) === true;
export const loggedInUser = async () =>
  jwtDecode(Cookies.get("jwt")) ? jwtDecode(Cookies.get("jwt"))?.id : null;
export const getUserFromToken = async (id) => {
  try {
    const res = await axios.get(`${localHost}/users/${id}`);
    return res.data;
  } catch (err) {
    return new Error(err);
  }
};
export async function getBookedItems(id) {
  const { _id } = await getItemById("users", jwtDecode(Cookies.get("jwt"))?.id);
  const items = await axios.get(`${localHost}/booking/user/${_id}`);
  if (!items) {
    return new Error("err ..");
  }
  return items?.data;
}
