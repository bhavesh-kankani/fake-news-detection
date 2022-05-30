import React, { useContext } from "react";
import {
	AppBar,
	Box,
	Toolbar,
	Button,
	IconButton,
	MenuItem,
	Menu,
} from "@mui/material";
import AuthContext from "../context/AuthContext";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

export default function Navbar({ open, handleOpen, handleClose }) {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const pages = ["News", "Fake News Check"];
	const { user, logoutUser } = useContext(AuthContext);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePage = (page) => {
		page === "News" ? navigate("/") : navigate("fake-news-check");
	};

	const handleNavClose = () => {
		setAnchorEl(null);
	};

	const handleSignIn = () => {
		navigate("signin");
	};

	return (
		<>
			{user && <ProfileModal open={open} handleClose={handleClose} />}
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={() => {
										handlePage(page);
									}}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									{page}
								</Button>
							))}
						</Box>
						{user ? (
							<div>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleNavClose}
								>
									<MenuItem onClick={handleOpen}>Profile</MenuItem>
									<MenuItem
										onClick={(event) => {
											logoutUser(event);
											setAnchorEl(null);
										}}
									>
										Log Out
									</MenuItem>
								</Menu>
							</div>
						) : (
							<Button
								variant="text"
								sx={{ color: "white" }}
								onClick={handleSignIn}
							>
								Sign In
							</Button>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}
