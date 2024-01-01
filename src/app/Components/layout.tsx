"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import QuizIcon from "@mui/icons-material/Quiz";
import { useRouter, usePathname } from "next/navigation";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface CollapsibleSectionProps {
  open: boolean;
  isCollapseOpen: boolean;
  handleCollapse: () => void;
  sectionTitle: string;
  subItems: string[];
  icons: React.ReactNode[];
  active: boolean;
  onClick: () => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  open,
  isCollapseOpen,
  handleCollapse,
  sectionTitle,
  subItems,
  icons,
  active,
  onClick,
}) => (
  <>
    <ListItem disablePadding onClick={handleCollapse}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          bgcolor: active ? "primary.main" : "primary.secondary",
        }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
          style={{ color: active ? "white" : "black" }}
        >
          {icons[0]} {/* Use the icon for the section */}
        </ListItemIcon>
        <ListItemText
          primary={sectionTitle}
          sx={{ opacity: open ? 1 : 0, color: active ? "white" : "black" }}
        />
        {open &&
          (isCollapseOpen ? (
            <ExpandLessIcon style={{ color: active ? "white" : "black" }} />
          ) : (
            <ExpandMoreIcon style={{ color: active ? "white" : "black" }} />
          ))}
      </ListItemButton>
    </ListItem>
    <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
      <List sx={{ pl: 2 }}>
        {subItems.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {icons[index + 1]} {/* Use the icon for the subitem */}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Collapse>
    <Divider />
  </>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname().split("/").pop();
  const [open, setOpen] = React.useState(false);
  const [isUserCollapseOpen, setUserCollapseOpen] = React.useState(false);
  const [isSchedulerCollapseOpen, setSchedulerCollapseOpen] =
    React.useState(false);
  const [isEvaluationCollapseOpen, setEvaluationCollapseOpen] =
    React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserCollapse = () => {
    setUserCollapseOpen(!isUserCollapseOpen);
  };
  const handleSchedulerCollapse = () => {
    setSchedulerCollapseOpen(!isSchedulerCollapseOpen);
  };
  const handleEvaluationCollapse = () => {
    setEvaluationCollapseOpen(!isEvaluationCollapseOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Dashboard  */}
        <ListItem
          key={"Dashboard"}
          disablePadding
          onClick={() => router.push("/Dashboard")}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <DashboardCustomizeIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Dashboard"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />

        {/* Users  */}
        <CollapsibleSection
          open={open}
          isCollapseOpen={isUserCollapseOpen}
          handleCollapse={handleUserCollapse}
          sectionTitle={"Users"}
          subItems={["Accounts", "Contact"]}
          icons={[<AccountCircleIcon />, <ManageAccountsIcon />, <MailIcon />]}
          active={pathName === "Users"}
          onClick={() => router.push("/Users")}
        />

        {/* Schedulers  */}
        <CollapsibleSection
          open={open}
          isCollapseOpen={isSchedulerCollapseOpen}
          handleCollapse={handleSchedulerCollapse}
          sectionTitle={"Scheduler"}
          subItems={["Rotations", "Conferences"]}
          icons={[
            <ContentPasteSearchIcon />,
            <WorkHistoryIcon />,
            <VideoCallIcon />,
          ]}
          active={pathName === "Rotations" || pathName === "Conferences"}
          onClick={() => router.push("/Scheduler")}
        />

        {/* Evaluations  */}
        <ListItem
          key={"Evaluations"}
          disablePadding
          onClick={() => router.push("/Evaluations")}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <QuizIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Evaluations"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
