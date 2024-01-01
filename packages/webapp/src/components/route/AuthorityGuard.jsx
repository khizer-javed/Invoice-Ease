import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthority from "@/utils/hooks/useAuthority";
import { useSelector } from "react-redux";
const AuthorityGuard = (props) => {
  const { authority = [], children, superAdmin = false } = props;
  const { meta, auth } = useSelector((state) => state);
  const { loggedInUser } = auth;

  if (loggedInUser.isSuperAdmin) {
    return children;
  }

  const to = "/access-denied";
  const roleMatched = useAuthority(authority, superAdmin);

  return roleMatched ? children : <Navigate to={to} />;
};

export default AuthorityGuard;
