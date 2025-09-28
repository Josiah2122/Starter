import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, Outlet, useLocation } from "react-router-dom";

// Icons import
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SettingsIcon from "@mui/icons-material/Settings";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentIcon from "@mui/icons-material/Payment";
import AssessmentIcon from "@mui/icons-material/Assessment";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    borderRadius: "0 0 4px 4px", // Rounded corners for the AppBar
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const menuItems = [
  {
    text: "Dashboard",
    icon: <InboxIcon sx={{ color: "white" }} />,
    route: "/",
  },
  {
    text: "Payment",
    icon: <PaymentIcon />,
    subItems: [
      {
        text: "Bank Accounts",
        route: "/bankAccount",
      },
      {
        text: "Payments",
        subItems: [
          {
            text: "Sale Payment List",
            route: "/sale_payment_list",
          },
          {
            text: "Purchase Payment List",
            route: "/purchase_payment_list",
          },
        ],
      },
      {
        text: "Payment Settings",
        subItems: [
          {
            text: "VAT/TOT/Withholding",
            route: "/paymentSettings",
          },
          {
            text: "Credit Settings",
            route: "/creditSettings",
          },
        ],
      },
    ],
  },
  {
    text: "Stock Mgmt.",
    icon: <InventoryIcon />,
    subItems: [
      {
        text: "Receive Item",
        subItems: [
          {
            text: "Receive",
            route: "/receive",
          },
        ],
      },
    ],
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    subItems: [
      {
        text: "General",
        subItems: [
          {
            text: "Company Settings",
            route: "/settings/general/company",
          },
          {
            text: "Banks",
            route: "/bank",
          },
        ],
      },
      {
        text: "Payment Setting",
        subItems: [
          {
            text: "Payment Setting ",
            route: "/paymentSettingList",
          },
        ],
      },
      {
        text: "Stock",
        subItems: [
          {
            text: "Company Stock",
            route: "/settings/stock/company",
          },
          {
            text: "Unit Settings",
            route: "/settings/stock/units",
          },
          {
            text: "Store",
            route: "/store",
          },
          {
            text: "Item",
            subItems: [
              {
                text: "Add Item",
                route: "/item",
              },
              {
                text: "Items List",
                route: "/item_list",
              },
            ],
          },
          {
            text: "Item Settings",
            route: "/itemSettings",
          },
        ],
      },
      {
        text: "Employee & User",
        subItems: [
          {
            text: "Employee",
            subItems: [
              {
                text: "Add Employee",
                route: "/settings/employee/add",
              },
              {
                text: "List Employees",
                route: "/settings/employee",
              },
            ],
          },
          {
            text: "Role",
            subItems: [
              {
                text: "Add New Role",
                route: "/settings/role/add",
              },
              {
                text: "List Roles",
                route: "/settings/role",
              },
            ],
          },
        ],
      },
      {
        text: "Order Settings",
        route: "/settings/order",
      },
    ],
  },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
    subItems: [
      {
        text: "Inventory Report",
        route: "/report/inventory",
      },
      {
        text: "Suppliers Report",
        route: "/report/supplier",
      },
    ],
  },
];

export default function Layout() {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [openMenus, setOpenMenus] = React.useState({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (text) => {
    setOpenMenus((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => {
      const isActive = location.pathname === item.route;
      return (
        <React.Fragment key={item.text}>
          <ListItem disablePadding>
            {item.subItems ? (
              <ListItemButton
                onClick={() => handleMenuClick(item.text)}
                sx={{ pl: 2 + level * 2 }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ style: { color: "#e2e8f0" } }}
                />
                {openMenus[item.text] ? (
                  <ExpandLess sx={{ color: "white" }} />
                ) : (
                  <ExpandMore sx={{ color: "white" }} />
                )}
              </ListItemButton>
            ) : (
              <ListItemButton
                component={Link}
                to={item.route}
                state={{ label: item.text }}
                sx={{ pl: 2 + level * 2 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    style: { color: isActive ? "#fff" : "#e2e8f0" },
                  }}
                />
              </ListItemButton>
            )}
          </ListItem>
          {item.subItems && (
            <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.subItems, level + 1)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ background: "#1e293b", color: "#fff", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#e2e8f0", fontWeight: 700 }}
          >
            {location?.pathname === "/"
              ? "Small Stock"
              : location?.state?.label || "Back"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: open ? "#1E293B" : "transparent",
            border: "none",
            boxShadow: "none",
            transition: "background 0.2s",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider variant="middle" />
        <List>{renderMenuItems(menuItems)}</List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
