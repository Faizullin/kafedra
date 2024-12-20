import Layout from "@/shared/layouts/Layout";
import RootLayout from "@/shared/layouts/RootLayout";
import {lazy} from "react";
import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import {ConstUrls} from "@/core/constants/urls";
import ProtectedRoute from "@/router/ProtectedRoute";

// eslint-disable-next-line react-refresh/only-export-components
const ProductDetail = lazy(() => import( "@/features/product-detail/ProductDetail.tsx"));
// eslint-disable-next-line react-refresh/only-export-components
const Home = lazy(() => import("@/features/home/Home"));
// eslint-disable-next-line react-refresh/only-export-components
const Shop = lazy(() => import("@/features/shop/Shop"));
// eslint-disable-next-line react-refresh/only-export-components
const Cart = lazy(() => import("@/features/cart/Cart"));
// eslint-disable-next-line react-refresh/only-export-components
const Wishlist = lazy(() => import("@/features/wishlist/Wishlist"));
// eslint-disable-next-line react-refresh/only-export-components
const Checkout = lazy(() => import("@/features/checkout/Checkout"));
// eslint-disable-next-line react-refresh/only-export-components
const Login = lazy(() => import("@/features/auth/Login"));
// eslint-disable-next-line react-refresh/only-export-components
const Register = lazy(() => import("@/features/auth/Register"));
// eslint-disable-next-line react-refresh/only-export-components
const ForgotPassword = lazy(() => import("@/features/auth/ForgotPassword"));
// eslint-disable-next-line react-refresh/only-export-components
const ForgotPasswordConfirm = lazy(() => import("@/features/auth/ForgotPasswordConfirm"));
// eslint-disable-next-line react-refresh/only-export-components
const EmailVerification = lazy(() => import("@/features/auth/EmailVerification"));
// eslint-disable-next-line react-refresh/only-export-components
const NotFoundExceptionPage = lazy(() => import("@/features/exceptions/not-found-exception-page/NotFoundExceptionPage"));
// eslint-disable-next-line react-refresh/only-export-components
const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
// eslint-disable-next-line react-refresh/only-export-components
const Search = lazy(() => import("@/features/search/Search"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/products/:slug" element={<ProductDetail/>}/>
                <Route path="/s/products/:slug" element={<ProductDetail/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path={ConstUrls.login} element={<Login/>}/>
                <Route path={"/auth/register"} element={<Register/>}/>
                <Route path={"/auth/password/reset"} element={<ForgotPassword/>}/>
                <Route path={"/auth/password/reset/confirm/:user_id/:token/"} element={<ForgotPasswordConfirm/>}/>
                <Route path={"/auth/verify-email/:token/"} element={<EmailVerification/>}/>
                <Route path={"/dashboard"} element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>

                <Route path="*" element={<NotFoundExceptionPage/>}/>
            </Route>
            {/*<Route path="/" element={<AuthLayout />}>*/}
            {/*  <Route path="auth/login" element={<Login />} />*/}
            {/*  <Route path="auth/register" element={<Register />} />*/}
            {/*  <Route path="auth/forgot-password" element={<ForgotPassword />} />*/}
            {/*  <Route*/}
            {/*    path="auth/password-reset/confirm"*/}
            {/*    element={<ForgotPasswordConfirm />}*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="auth/email/verify/"*/}
            {/*    element={<EmailVerification />} />*/}
            {/*  <Route*/}
            {/*    path="book"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <BookFormPage />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="bookings"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <BookingList />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="bookings/:id"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <BookingDetail />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route path="blogs/:id" element={<BlogDetail />} />*/}
            {/*  <Route*/}
            {/*    path="/reviews/edit"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <ReviewFormPage />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="/reviews/edit/:id"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <ReviewFormPage />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="/reviews/my"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <ReviewList />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route path="/contact" element={<ContactFormPage />} />*/}
            {/*  <Route path={ConstUrls.exception_404} element={<NotFoundExceptionPage />} />*/}
            {/*  <Route path={ConstUrls.exception_connection} element={<ConnectionErrorExceptionPage />} />*/}
            {/*  <Route path="*" element={<Navigate to={ConstUrls.exception_404} />} />*/}
            {/*</Route>*/}
        </Route>
    )
);

export default router;
