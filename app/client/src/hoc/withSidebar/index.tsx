import {
	Button,
	Drawer as DrawerMui,
	FormControl,
	Hidden,
	InputLabel,
	List,
	ListItem,
	ListItemIcon,
	MenuItem,
	Select,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import Menu from "@material-ui/icons/MenuTwoTone";
import ContributeIcon from "@material-ui/icons/ReceiptTwoTone";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../redux/actions";
import * as VersionActions from "../../redux/actions/versions";
import { history } from "../../redux/configureStore";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";

interface ListItemProps {
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	children: JSX.Element;
	label: string;
}

const CustomisedListItem = (props: ListItemProps) => {
	const classes = useStyles();
	const { children, handleClick, label } = props;
	return (
		<ListItem
			button
			onClick={handleClick}
			alignItems="center"
			className={classes.drawerListItem}
		>
			<ListItemIcon>{children}</ListItemIcon>
			<div className={classes.listLabel}>{label}</div>
			{/* <ListItemText style={{ fontWeight: "bold" }} primary={label} /> */}
		</ListItem>
	);
};

function Drawer() {
	const classes = useStyles();
	const { versionData } = useSelector((state: RootState) => state);
	const versionActions = useActions(VersionActions);
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		versionActions.toggleVersion(event.target.value as string);
	};
	useEffect(() => {
		const script = document.createElement("script");
		script.async = true;
		script.src = "https://buttons.github.io/buttons.js";
		//For head
		document.head.appendChild(script);
	}, []);
	return (
		<>
			<FormControl className={classes.formControl}>
				<InputLabel
					classes={{ root: classes.label, focused: classes.focused }}
				>
					Version
				</InputLabel>
				<Select
					labelId="change-cocs-version"
					value={versionData.currentVersion}
					onChange={handleChange}
				>
					{versionData.versions.map((d: string) => (
						<MenuItem value={d}>{d}</MenuItem>
					))}
				</Select>
			</FormControl>

			<img
				src="/icons/litmus.svg"
				alt="litmus logo"
				className={classes.logo}
				onClick={() => history.push("/")}
			/>
			<div className={classes.stars}>
				<a
					className="github-button"
					href="https://github.com/litmuschaos/litmus"
					data-color-scheme="no-preference: dark; light: dark; dark: dark;"
					data-icon="octicon-star"
					aria-label="Star litmuschaos/litmus on GitHub"
					data-size="large"
				>
					Star
				</a>
			</div>

			<List className={classes.drawerList}>
				<CustomisedListItem
					key="home"
					handleClick={() => history.push("/")}
					label="Home"
				>
					<HomeIcon className={classes.button} />
				</CustomisedListItem>
				<CustomisedListItem
					key="contribute"
					handleClick={() =>
						window.open(
							"https://github.com/litmuschaos/chaos-charts/blob/master/CONTRIBUTING.md"
						)
					}
					label="Contribute"
				>
					<ContributeIcon className={classes.button} />
				</CustomisedListItem>
			</List>
		</>
	);
}

function AppDrawer() {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	return (
		<>
			<Hidden mdUp>
				<Button
					className={classes.drawerToggle}
					variant="contained"
					color="secondary"
					onClick={handleDrawerToggle}
				>
					<Menu />
				</Button>
				<DrawerMui
					variant="temporary"
					anchor={"left"}
					open={mobileOpen}
					classes={{
						paper: classes.drawerPaper,
					}}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Drawer />
				</DrawerMui>
			</Hidden>
			<Hidden smDown>
				<DrawerMui
					variant="permanent"
					open
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<Drawer />
				</DrawerMui>
			</Hidden>
		</>
	);
}

export default function withSidebar(Component: any) {
	function WithSidebar(props: object) {
		const classes = useStyles();
		return (
			<div className={classes.root}>
				<AppDrawer />
				<div className={classes.route}>
					<Component />
				</div>
			</div>
		);
	}

	return WithSidebar;
}
