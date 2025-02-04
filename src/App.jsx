import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { createContext, useState } from "react";
import { productsInCart } from "./functions";
import AccountPage from "./components/AccountPage";
import AuthPage from "./components/auth/AuthContext";
import MyBookings from "./components/MyBookings";
import ProductPage from "./components/ProductPage";
import SignIn from "./components/SignIn";
import ChangePasswordForm from "./components/ChangePasswordForm";
import Wrapper from "./components/Wrapper";
import Cart from "./components/Cart";
export const ProductsContext = createContext(null);

function App() {
  const [items, setItems] = useState(() => productsInCart?.length || []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <AuthPage>
            <Header />
            <Home />
          </AuthPage>
        </>
      ),
    },
    {
      path: "/account",
      element: (
        <AuthPage>
          <Header />
          <AccountPage />
        </AuthPage>
      ),
      children: [{ path: "change-password", element: <ChangePasswordForm /> }],
    },
    {
      path: "/my-bookings",
      element: (
        <>
          <Header />
          <MyBookings />
        </>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/product/:productId",
      element: (
        <AuthPage>
          <Header />
          <ProductPage />
        </AuthPage>
      ),
    },

    { path: "signin", element: <SignIn /> },
    { path: "cart", element: <Cart /> },
  ]);
  const querClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <div>
      <ProductsContext.Provider value={{ setItems, items }}>
        <Toaster />
        <QueryClientProvider client={querClient}>
          <ReactQueryDevtools />
          <main className="px-[3.5vw]">
            <Wrapper>
              <RouterProvider router={router} />
            </Wrapper>
          </main>
        </QueryClientProvider>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
/* 
    <Routes>
                  <Route
                    index
                    element={
                      <AuthPage>
                        <Header />
                        <Home />
                      </AuthPage>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/my-bookings"
                    element={
                      <>
                        <Header />
                        <MyBookings />
                      </>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <>
                        <Header />
                        <Cart />
                      </>
                    }
                  />
                  <Route
                    path="/product/:productId"
                    element={
                      <AuthPage>
                        <Header />
                        <ProductPage />
                      </AuthPage>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <AuthPage>
                        <Header />
                        <AccountPage />
                      </AuthPage>
                    }
                  >
                    <Route
                      path="change-password"
                      element={<ChangePasswordForm />}
                    />
                  </Route>
                   {/* </Route> 
                  <Route path="signin" element={<SignIn />} />
                </Routes>
*/
