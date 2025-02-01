import axios from "axios";
export const getBookings = async () => {
  try {
    const bookings = await axios.get(
      `http://localhost:5001/booking`
    );
    return bookings?.data
  } catch (err) {
    console.log(err);
  }
};
