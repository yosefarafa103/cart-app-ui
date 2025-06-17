import { Navigate } from "react-router-dom"
import { isLoggedIn } from "../../functions"

export default function AuthPage({ children }) {
    if (!isLoggedIn) {
        return <Navigate to={`/login`} />
    }
    return (
        <>
            {children}
        </>
    )
}
