import "./App.css";
import { AppRouter } from "../app.router/app.router";

export type MenuOption = {
 label: string;
 path: string;
};

export const routesOptions: MenuOption[] = [
 { label: "Details", path: "/details" },
];

export const menuOptions: MenuOption[] = [
 { label: "Home", path: "/about" },
 { label: "Register", path: "/register" },
 { label: "Login", path: "/login" },
 { label: "Profile", path: "/profile" },
];

function App() {
 return (
  <div className="App">
   <AppRouter menuOptions={menuOptions} routesOptions={[]}></AppRouter>
  </div>
 );
}

export default App;
