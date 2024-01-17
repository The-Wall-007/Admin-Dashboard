import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Collapse,
  Divider,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface CollapsibleListItemProps {
  open: boolean;
  isCollapseOpen: boolean;
  handleCollapse: () => void;
  sectionTitle: string;
  subItems: string[];
  icons: React.ReactNode[];
  active: string;
  router: AppRouterInstance;
}

const CollapsibleListItem: React.FC<CollapsibleListItemProps> = ({
  open,
  isCollapseOpen,
  handleCollapse,
  sectionTitle,
  subItems,
  icons,
  active,
  router,
}) => {
  const renderSubItem = (itemText: string, index: number) => (
    <ListItem
      key={itemText}
      disablePadding
      onClick={() => router.push(`/${sectionTitle}/${itemText}`)}
    >
      <ListItemButton sx={getListItemButtonStyles(open, active, itemText)}>
        <ListItemIcon sx={getListItemIconStyles(open, active, itemText)}>
          {icons[index + 1]} {/* Use the icon for the subitem */}
        </ListItemIcon>
        <ListItemText
          primary={itemText}
          sx={getListItemTextStyles(open, active, itemText)}
        />
      </ListItemButton>
    </ListItem>
  );

  return (
    <>
      <ListItem disablePadding onClick={handleCollapse}>
        <ListItemButton
          sx={getListItemButtonStyles(open, active, sectionTitle)}
        >
          <ListItemIcon sx={getListItemIconStyles(open, active, sectionTitle)}>
            {icons[0]} {/* Use the icon for the section */}
          </ListItemIcon>
          <ListItemText
            primary={sectionTitle}
            sx={getListItemTextStyles(open, active, sectionTitle)}
          />
          {open &&
            (isCollapseOpen ? (
              <ExpandLessIcon
                sx={getExpandIconStyles(open, active, sectionTitle)}
              />
            ) : (
              <ExpandMoreIcon
                sx={getExpandIconStyles(open, active, sectionTitle)}
              />
            ))}
        </ListItemButton>
      </ListItem>
      <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
        <List sx={{ pl: 2 }}>{subItems.map(renderSubItem)}</List>
      </Collapse>
      <Divider />
    </>
  );
};

const getListItemButtonStyles = (
  open: boolean,
  active: string,
  target: string
) => ({
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
  px: 2.5,
  bgcolor: active === target ? "#EAF2F8" : "primary.secondary",
});

const getListItemIconStyles = (
  open: boolean,
  active: string,
  target: string
) => ({
  minWidth: 0,
  mr: open ? 3 : "auto",
  justifyContent: "center",
  color: active === target ? "primary.main" : "#757575",
});

const getListItemTextStyles = (
  open: boolean,
  active: string,
  target: string
) => ({
  opacity: open ? 1 : 0,
  color: active === target ? "primary.main" : "#757575",
});

const getExpandIconStyles = (
  open: boolean,
  active: string,
  target: string
) => ({
  color: active === target ? "primary.main" : "#757575",
});

export default CollapsibleListItem;
