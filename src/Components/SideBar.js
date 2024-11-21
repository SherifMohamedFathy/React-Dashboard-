// import React from "react";
// import { NavLink } from "react-router-dom";

// export default function SideBar() {
//   return (
//     <div className="side-bar">
//       <NavLink to="/dashboard/users" activeClassName="active" className="item-link">
//         <i className="fa-solid fa-users "></i> Users
//       </NavLink>
//       <NavLink to="/dashboard/user/create" activeClassName="active" className="item-link">
//         <i className="fa-solid fa-user-plus "></i> New User
//       </NavLink>
//       <NavLink to="/dashboard/products/" activeClassName="active" className="item-link">
//         <i className="fa-solid fa-shop "></i> Products
//       </NavLink>
//       <NavLink to="/dashboard/products/create" activeClassName="active" className="item-link">
//         <i className="fa-solid fa-square-plus "></i> New Product
//       </NavLink>
//     </div>
//   );
// }
import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="side-bar">
      <NavLink to="/dashboard/users" className={({ isActive }) => (isActive ? "active item-link" : "item-link")}>
        <i className="fa-solid fa-users "></i> Users
      </NavLink>
      <NavLink to="/dashboard/user/create" className={({ isActive }) => (isActive ? "active item-link" : "item-link")}>
        <i className="fa-solid fa-user-plus "></i> New User
      </NavLink>
      <NavLink
        to="/dashboard/products"
        end // Ensures exact matching for this route
        className={({ isActive }) => (isActive ? "active item-link" : "item-link")}
      >
        <i className="fa-solid fa-shop "></i> Products
      </NavLink>
      <NavLink
        to="/dashboard/products/create"
        className={({ isActive }) => (isActive ? "active item-link" : "item-link")}
      >
        <i className="fa-solid fa-square-plus "></i> New Product
      </NavLink>
    </div>
  );
}
