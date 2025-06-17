import axios from "axios";
export const getBookings = async () => {
  try {
    const bookings = await axios.get(
      `${localHost}/booking`
    );
    return bookings?.data
  } catch (err) {
    console.log(err);
  }
};
