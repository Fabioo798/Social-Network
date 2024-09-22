import { Routes, Route } from "react-router-dom";
import { MenuOption } from "../app/App";
import { Suspense } from "react";
import Register from "../../users/component/register/register";
import Login from "../../users/component/login/login";
import Profile from "../../users/component/users/users";
import { SignPage } from "../../signpage/signpage";

export type AppRouterProps = {
 menuOptions: MenuOption[];
 routesOptions: MenuOption[];
};

export function AppRouter({ menuOptions, routesOptions }: AppRouterProps) {
 return (
  <Suspense>
   <Routes>
    <Route path={"/"} element={<SignPage></SignPage>} />
    <Route path={menuOptions[0].path} element={<SignPage></SignPage>} />
    <Route path={menuOptions[1].path} element={<Register></Register>} />
    <Route path={menuOptions[2].path} element={<Login></Login>} />
    <Route path={menuOptions[3].path} element={<Profile></Profile>} />
   </Routes>
  </Suspense>
 );
}
