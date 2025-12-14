import { Link, NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";

export function TopNav() {
    return (
        <Navbar maxWidth="xl">
            <NavbarBrand>
                <Link to="/" className="font-semibold">
                    AutoUI Proxy Console
                </Link>
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem>
                    <NavLink to="/tokens" className="hover:opacity-80">
                        Tokens
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to="/quickstart" className="hover:opacity-80">
                        Quick Start
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
