import {useRoutes} from "react-router-dom";
import {Suspense} from "react";
import Home from "./Home";

const specialRoutes = [
    {path: "/", element: <Home/>},
    {path: "/*", element: <Home/>}
];

export default function AppRoutes() {
    const routes = useRoutes([...specialRoutes]);
    return <Suspense>{routes}</Suspense>;
}
