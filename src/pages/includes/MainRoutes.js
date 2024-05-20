import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
// const Products = lazy(() => import("./pages/Products"));

import ArrayObjectTest from "../../components/ArrayObjectTest.js";
import SearchParams from "../../components/SearchParams.js";
import Customers from "../Customers.js";
import Home from "../Home.js";
import Products from "../Products.js";
import CallbackComponent from "../../components/CallbackComponent.js";
import ReduceComponent from "../../components/ReducerComponent.js";
import Post from "../Post.js";
import ReactHooks from "../ReactHooks.js";
import NotFoundPage from "../NotFoundPage.js";
import ImagePage from "../ImagePage.js";
import VersionPage from "../VersionPage.js";
import VersionAddPage from "../VersionAddPage.js";

const MainRoutes = () => {
    return (
        <>
            <div>
            <Routes>
                <Route element={ <Home /> } path="" />
                <Route element={ <Customers /> } path="/redux" />
                <Route element={ <Products /> } path="/products" />
                <Route element={ <ArrayObjectTest /> } path="/array_test" />
                <Route element={ <ReactHooks /> } path="hooks" />
                <Route element={ <Post /> } path="/post" />
                <Route element={ <SearchParams /> } path="/params" />
                <Route element={ <CallbackComponent /> } path="/callback" />
                <Route element={ <ReduceComponent /> } path="/reducer" />
                <Route element={ <ImagePage /> } path="/image" />
                <Route element={ <NotFoundPage /> } path="*" />
                <Route element={ <VersionPage /> } path="/version" />
                <Route element={ <VersionAddPage /> } path="/version/add" />

                {/* <Route element={ <Suspense fallback={<></>} > <Products /> </Suspense> } path="/products" /> */}
            </Routes>
            </div>
        </>
    )
}

export default MainRoutes;