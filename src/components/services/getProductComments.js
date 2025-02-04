import axios from "axios";
import { localHost } from "../../functions";

export const getProductComments = async (productId) => {
  try {
    const comments = await axios.get(
      `${localHost}/comments/product/${productId}`
    );
    return comments.data;
  } catch (err) {
    console.log(err);
  }
};
