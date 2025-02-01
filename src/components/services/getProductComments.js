//http://localhost:5001/comments/product/67895d6456ec64096e775e65

import axios from "axios";

export const getProductComments = async (productId) => {
  try {
    const comments = await axios.get(
      `http://localhost:5001/comments/product/${productId}`
    );
    return comments.data
  } catch (err) {
    console.log(err);
  }
};
