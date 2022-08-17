import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProtectedRoute from "./common/ProtectedRoute";
import AboutScreen from "./screens/AboutScreen";
import TeamScreen from "./screens/TeamScreen";
import NotFound from "./screens/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div className="Shop d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-fill py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/teams/:team" element={<TeamScreen />} />
              <Route path="/search/:keyword" element={<HomeScreen />} />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<HomeScreen />}
              />
              <Route path="/teams/:team/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <ShippingScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/placeorder"
                element={
                  <ProtectedRoute>
                    <PlaceOrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/userlist"
                element={
                  <ProtectedRoute adminOnly>
                    <UserListScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/user/:id/edit"
                element={
                  <ProtectedRoute adminOnly>
                    <UserEditScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/productlist"
                element={
                  <ProtectedRoute adminOnly>
                    <ProductListScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/productlist/:pageNumber"
                element={
                  <ProtectedRoute adminOnly>
                    <ProductListScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/product/:id/edit"
                element={
                  <ProtectedRoute adminOnly>
                    <ProductEditScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orderlist"
                element={
                  <ProtectedRoute adminOnly>
                    <OrderListScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
