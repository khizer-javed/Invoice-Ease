import React from "react";
import { Dropdown } from "@/components/ui";
import HorizontalMenuNavLink from "./HorizontalMenuNavLink";
import { useTranslation } from "react-i18next";
import navFunctions from "@/configs/navFunctions";

const HorizontalMenuDropdownItem = ({ nav }) => {
  const { title, translateKey, path, key, onClick } = nav;
  const navFunc = navFunctions();
  const { t } = useTranslation();

  const itemTitle = t(translateKey, title);

  return (
    <Dropdown.Item eventKey={key}>
      {path ? (
        <HorizontalMenuNavLink path={path}>{itemTitle}</HorizontalMenuNavLink>
      ) : (
        <span
          onClick={() => {
            if (onClick) navFunc[onClick]();
          }}
        >
          {itemTitle}
        </span>
      )}
    </Dropdown.Item>
  );
};

export default HorizontalMenuDropdownItem;
