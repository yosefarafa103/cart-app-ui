import axios from "axios";
import { localHost } from "../../functions";
export async function deleteProduct(productId) {
  try {
    
    const deleted = await axios.delete(
      `${localHost}/products/${productId}`
    );
    return deleted.data;
  } catch (err) {
    console.log(err);
  }
}
