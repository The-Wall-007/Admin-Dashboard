"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import QuizIcon from "@mui/icons-material/Quiz";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import AdminLogo from "./Admin.jpg";

import NavigationListItem from "./DrawerMenuListItems/NavigationListItem";
import CollapsibleListItem from "./DrawerMenuListItems/CollapsibleListItem";

interface AppBarProps {
  open?: boolean;
}
interface LayoutProps {
  children: React.ReactNode;
}

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
  ...theme.mixins.toolbar,
}));

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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname().split("/").pop();
  const [open, setOpen] = React.useState(true);
  const [isUserCollapseOpen, setUserCollapseOpen] = React.useState(
    pathName === "Accounts" || pathName === "Contact"
  );
  const [isSchedulerCollapseOpen, setSchedulerCollapseOpen] = React.useState(
    pathName === "Rotations" || pathName === "Conferences"
  );

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
            {pathName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <Image
            src={AdminLogo}
            alt="Admin Logo"
            height={40}
            width={40}
            style={{ marginLeft: "8px" }}
          />
          Admin Panel
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
        <NavigationListItem
          key={"Dashboard"}
          disablePadding
          onClick={() => router.push("/Dashboard")}
          open={open}
          pathName={pathName ?? ""}
          targetPath="Dashboard"
          icon={<DashboardCustomizeIcon />}
          primaryText="Dashboard"
        />
        <Divider />
        {/* Users  */}
        <CollapsibleListItem
          open={open}
          isCollapseOpen={isUserCollapseOpen}
          handleCollapse={() => handleUserCollapse()}
          sectionTitle={"Users"}
          subItems={["Accounts", "Contact"]}
          icons={[<AccountCircleIcon />, <ManageAccountsIcon />, <MailIcon />]}
          active={pathName ?? ""}
          router={router}
        />
        {/* Schedulers  */}
        <CollapsibleListItem
          open={open}
          isCollapseOpen={isSchedulerCollapseOpen}
          handleCollapse={() => handleSchedulerCollapse()}
          sectionTitle={"Scheduler"}
          subItems={["Rotations", "Conferences"]}
          icons={[
            <ContentPasteSearchIcon />,
            <WorkHistoryIcon />,
            <VideoCallIcon />,
          ]}
          active={pathName ?? ""}
          router={router}
        />
        {/* Evaluations  */}
        <NavigationListItem
          key={"Evaluations"}
          disablePadding
          onClick={() => router.push("/Evaluations")}
          open={open}
          pathName={pathName ?? ""}
          targetPath="Evaluations"
          icon={<QuizIcon />}
          primaryText="Evaluations"
        />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
