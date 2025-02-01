import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Wrapper({ children }) {
    (async () => {
        try {
            // const req = new Request("http://localhost:5001/products")
            (await axios.get('http://localhost:5001/products'))
        } catch (err) {
            console.log(err);
        }
    })()

    return (
        <div>{children}</div>
    )
}
