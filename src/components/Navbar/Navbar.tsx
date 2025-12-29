import { IconBrightnessFilled, IconMenu2, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import useVersion from "../../hooks/useVersion";

import { theme } from "../../styles/theme";

import icon from "../../assets/notiflow-icon.svg";

import { routes } from "../../navigation/routes";

import LanguageSelector from "../LanguageSelector/LanguageSelector";
import VersionSelector from "../VersionSelector/VersionSelector";

import MenuItems from "../../data/menu";

import type { MenuItemType } from "../../types/menu";

import { MenuItem, NavbarWrapper, MenuOverlay } from "./Navbar.style";

const Navbar = ({
  currentMode,
  onToggleTheme,
}: {
  currentMode: "light" | "dark";
  onToggleTheme: () => void;
}) => {
  const location = useLocation();
  const { menuItems } = MenuItems();
  const { navigateWithVersion } = useVersion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavbarWrapper>
      <div className="row">
        <img
          src={icon}
          alt="notiflow icon"
          onClick={() => navigateWithVersion(routes.main)}
        />
        <div className="right">
          <div className="desktop-actions">
            <LanguageSelector />
            <VersionSelector />
            <button
              onClick={onToggleTheme}
              className={`button ${currentMode === "dark" ? "dark" : "light"}`}
            >
              <IconBrightnessFilled color={theme[currentMode].fg} width={20} />
            </button>
          </div>
          <button
            type="button"
            className="burger"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <IconX color={theme[currentMode].fg} width={24} />
            ) : (
              <IconMenu2 color={theme[currentMode].fg} width={24} />
            )}
          </button>
        </div>
      </div>
      <div className="column">
        {menuItems.map((item: MenuItemType) => (
          <MenuItem
            $isActive={location.pathname.includes(item.key)}
            key={item.id}
            onClick={() => navigateWithVersion(routes[item.key])}
          >
            {item.label}
          </MenuItem>
        ))}
      </div>
      {menuOpen && (
        <MenuOverlay className="open">
          <div className="overlay-header">
            <button
              type="button"
              className="close"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            >
              <IconX color={theme[currentMode].fg} width={32} />
            </button>
          </div>
          <div className="overlay-menu">
            {menuItems.map((item: MenuItemType) => (
              <MenuItem
                $isActive={location.pathname.includes(item.key)}
                key={`mobile-${item.id}`}
                onClick={() => {
                  setMenuOpen(false);
                  navigateWithVersion(routes[item.key]);
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </div>
          <div className="overlay-footer">
            <LanguageSelector />
            <VersionSelector />
            <button
              onClick={onToggleTheme}
              className={`button ${currentMode === "dark" ? "dark" : "light"}`}
            >
              <IconBrightnessFilled color={theme[currentMode].fg} width={20} />
            </button>
          </div>
        </MenuOverlay>
      )}
    </NavbarWrapper>
  );
};

export default Navbar;
