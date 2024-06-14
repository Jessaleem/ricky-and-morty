import { IconAdjustments, IconSearch } from "@tabler/icons-react";
import { useUiStore } from "../store/ui-store";
import { Filter } from "../pages/filter";
import { useRef } from "react";
import { useCharacter } from "../hooks/useCharacter";

export function SearchBar() {
  const { openMenu, isMenuOpen, closeMenu } = useUiStore();
  const { handleName } = useCharacter();

  const searchRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchRef.current) {
      const search = searchRef.current.value;
      handleName(search);
    }
  };

  return (
    <div className="relative">
      {isMenuOpen && <Filter />}
      <form onSubmit={onSubmit}>
        <div className="flex rounded-lg bg-gray-200 border px-4 py-2 items-center gap-2">
          <button type="submit">
            <IconSearch size={24} />
          </button>
          <input
            placeholder="Search or filter results"
            name="search"
            ref={searchRef}
            className="w-full border-none bg-gray-200 indent-2  focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              isMenuOpen ? closeMenu() : openMenu();
            }}
            className={`${isMenuOpen ? "bg-primary100" : ""} p-1 rounded-lg`}
          >
            <IconAdjustments size={24} color="#5A3696" />
          </button>
        </div>
      </form>
    </div>
  );
}
