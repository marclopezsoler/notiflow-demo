import { useEffect, useRef, useState } from "react";

import useLanguage from "../../hooks/useLanguage";

import languages, { type Lang } from "../../localization/languages";

import { LanguageSelectorWrapper } from "./LanguageSelector.style";

type DropdownDirection = "down" | "up";

const LanguageSelector = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentLang, handleLangChange } = useLanguage();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownDirection, setDropdownDirection] =
    useState<DropdownDirection>("down");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isOpen) {
      setDropdownDirection(determineDirection());
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <LanguageSelectorWrapper
      ref={dropdownRef}
      data-direction={dropdownDirection}
    >
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
        className="language-selector"
      >
        {currentLang.label}
      </button>
      {isOpen && (
        <div role="listbox" className="dropdown">
          {languages.map((lang: Lang) => (
            <button
              role="option"
              key={lang.code}
              onClick={() => {
                if (lang !== currentLang) {
                  handleLangChange(lang.code);
                }
                setIsOpen(false);
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </LanguageSelectorWrapper>
  );
};

export default LanguageSelector;
