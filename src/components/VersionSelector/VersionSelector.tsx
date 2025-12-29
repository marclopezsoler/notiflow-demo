import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

import useVersion, { versions } from "../../hooks/useVersion";

import { VersionSelectorWrapper } from "./VersionSelector.style";

type DropdownDirection = "down" | "up";

const VersionSelector = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { version, toggleVersion } = useVersion();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownDirection, setDropdownDirection] =
    useState<DropdownDirection>("down");

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const determineDirection = (): DropdownDirection => {
    if (typeof window === "undefined" || !dropdownRef.current) {
      return "down";
    }

    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const THRESHOLD = 180;

    if (spaceBelow < THRESHOLD && spaceAbove > THRESHOLD) {
      return "up";
    }

    return "down";
  };

  const handleToggle = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isOpen) {
      setDropdownDirection(determineDirection());
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <VersionSelectorWrapper
      ref={dropdownRef}
      data-direction={dropdownDirection}
    >
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
        className="version-selector"
      >
        v{version}
      </button>
      {isOpen && (
        <div role="listbox" className="dropdown">
          {versions.map((v: number, index: number) => (
            <button
              role="option"
              key={index}
              onClick={() => {
                if (version !== v) {
                  toggleVersion(v);
                }
                setIsOpen(false);
              }}
            >
              v{v}
            </button>
          ))}
        </div>
      )}
    </VersionSelectorWrapper>
  );
};

export default VersionSelector;
