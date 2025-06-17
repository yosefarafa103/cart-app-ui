import axios from "axios";
import { localHost } from "../../functions";

export async function updateBookingStatus(id, data) {
  try {
    return await axios.patch(`${localHost}/booking/${id}`, data);
  } catch (err) {
    console.log(err);
  }
}
