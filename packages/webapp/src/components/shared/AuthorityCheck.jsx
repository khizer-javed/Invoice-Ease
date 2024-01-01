import React from "react";
import PropTypes from "prop-types";
import useAuthority from "@/utils/hooks/useAuthority";
import { useSelector } from "react-redux";
import _ from "lodash";

const AuthorityCheck = (props) => {
  const { authority = [], children, superAdmin = false } = props;
  const { auth } = useSelector((state) => state);
  const { loggedInUser } = auth;

  if (_.isEmpty(authority)) {
    if (loggedInUser.isSuperAdmin) {
      return children;
    }

    return <></>;
  }

  const roleMatched = useAuthority(authority, superAdmin);
  return roleMatched ? children : <></>;
};

AuthorityCheck.propTypes = {
  userAuthority: PropTypes.array,
  authority: PropTypes.array,
};

export default AuthorityCheck;
