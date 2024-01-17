import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactElement } from "react";

interface NavigationListItemProps {
  key: string;
  disablePadding: boolean;
  onClick: () => void;
  open: boolean;
  pathName: string;
  targetPath: string;
  icon: ReactElement;
  primaryText: string;
}

const NavigationListItem: React.FC<NavigationListItemProps> = ({
  key,
  disablePadding,
  onClick,
  open,
  pathName,
  targetPath,
  icon,
  primaryText,
}) => (
  <ListItem key={key} disablePadding={disablePadding} onClick={onClick}>
    <ListItemButton sx={getListItemButtonStyles(open, pathName, targetPath)}>
      <ListItemIcon sx={getListItemIconStyles(open, pathName, targetPath)}>
        {icon &&
          React.cloneElement(icon, { sx: getIconStyles(pathName, targetPath) })}
      </ListItemIcon>
      <ListItemText
        primary={primaryText}
        sx={getListItemTextStyles(open, pathName, targetPath)}
      />
    </ListItemButton>
  </ListItem>
);

const getListItemButtonStyles = (
  open: boolean,
  pathName: string,
  targetPath: string
) => ({
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
  px: 2.5,
  bgcolor: pathName === targetPath ? "#EAF2F8" : "primary.secondary",
});

const getListItemIconStyles = (
  open: boolean,
  pathName: string,
  targetPath: string
) => ({
  minWidth: 0,
  mr: open ? 3 : "auto",
  justifyContent: "center",
});

const getIconStyles = (pathName: string, targetPath: string) => ({
  color: pathName === targetPath ? "primary.main" : "#757575",
});

const getListItemTextStyles = (
  open: boolean,
  pathName: string,
  targetPath: string
) => ({
  opacity: open ? 1 : 0,
  color: pathName === targetPath ? "primary.main" : "#757575",
});

export default NavigationListItem;
