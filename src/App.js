// import Header from "./Components/Header";
// import { Routes, Route } from "react-router-dom";
// import Login from "./Login";
// import Home from "./Home";
// import About from "./About";
// import SignUp from "./SignUp";
// export default function App() {
//   return (
//     <div>
//       <Header />
//       <Routes>
//         <Route path="/register" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Website/Auth/SignUp";
import Login from "./Pages/Website/Auth/Login";
import Home from "./Pages/Website/Home";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PersistLogin";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";
import NewProduct from "./Pages/Dashboard/Products/NewProduct";
import Products from "./Pages/Dashboard/Products/Products";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
