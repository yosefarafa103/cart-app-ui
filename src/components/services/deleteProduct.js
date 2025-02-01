import axios from "axios";
export async function deleteProduct(productId) {
  try {
    
    const deleted = await axios.delete(
      `http://localhost:5001/products/${productId}`
    );
    return deleted.data;
  } catch (err) {
    console.log(err);
  }
}
