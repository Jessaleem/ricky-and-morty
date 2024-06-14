import { IconArrowLeft } from "@tabler/icons-react";
import FilterDetail from "../components/filter-detail";
import { FilterButton } from "../components/filter-button";
import { useUiStore } from "../store/ui-store";
import { useCharacter } from "../hooks/useCharacter";
import { Divider } from "../components/ui/divider";
import { useSearchParams } from "react-router-dom";
import { extractExistingParams } from "../utils/extract-params";

export function Filter() {
  const { closeMenu, isMenuOpen } = useUiStore();
  const { handleSort, sortBy, setFilter } = useCharacter();
  const [searchParams, setSearchParams] = useSearchParams();

  const species = searchParams.get("species") ?? "";
  const status = searchParams.get("status") ?? "";
  const gender = searchParams.get("gender") ?? "";
  const fav = searchParams.get("fav") ?? "";

  const handleFilterSort = (type: string, value: string) => {
    if (type === "Sort by") {
      handleSort(value);
      closeMenu();
    }
  };

  const handleFilter = () => {
    setFilter({ species, status, gender });
    closeMenu();
  };

  return (
    <>
      <section className="px-6 py-8 fixed top-0 left-0 w-full h-screen bg-white z-10 md:hidden flex flex-col justify-between">
        <div>
          <div className="flex">
            <button className="md:hidden" onClick={() => closeMenu()}>
              <IconArrowLeft color="#8054C7" />
            </button>
            <h1 className="font-semibold flex-1 text-center">Filters</h1>
          </div>
          <FilterDetail title="Sort by">
            <FilterButton
              onClick={() => handleFilterSort("Sort by", "")}
              className={`${sortBy === "" ? "bg-primary100" : ""}`}
            >
              None
            </FilterButton>
            <FilterButton
              onClick={() => handleFilterSort("Sort by", "a-z")}
              className={`${sortBy === "a-z" ? "bg-primary100" : ""}`}
            >
              A-Z
            </FilterButton>
            <FilterButton
              onClick={() => handleFilterSort("Sort by", "z-a")}
              className={`${sortBy === "z-a" ? "bg-primary100" : ""}`}
            >
              Z-A
            </FilterButton>
          </FilterDetail>
          <Divider />
          <FilterDetail title="Characters">
            <FilterButton>All</FilterButton>
            <FilterButton>Stared</FilterButton>
            <FilterButton>Others</FilterButton>
          </FilterDetail>
          <FilterDetail title="Specie">
            <FilterButton>All</FilterButton>
            <FilterButton>Human</FilterButton>
            <FilterButton>Alien</FilterButton>
          </FilterDetail>
          <FilterDetail title="Gender">
            <FilterButton>All</FilterButton>
            <FilterButton>Female</FilterButton>
            <FilterButton>Male</FilterButton>
          </FilterDetail>
          <FilterDetail title="Status">
            <FilterButton>All</FilterButton>
            <FilterButton>Alive</FilterButton>
            <FilterButton>Dead</FilterButton>
          </FilterDetail>
        </div>
        <button className="text-center w-full mt-8 py-2 rounded-lg bg-gray-200 active:bg-[#5A3696] active:text-white">
          Filter
        </button>
      </section>
      <section
        className={`${
          isMenuOpen ? "-translate-y-full top-[715px]" : ""
        } px-6 py-8 absolute top-0 w-full rounded-xl shadow-2xl transform transition-all duration-300 bg-white z-10 hidden md:block`}
      >
        <FilterDetail title="Sort by">
          <FilterButton
            onClick={() => handleFilterSort("Sort by", "")}
            className={`${sortBy === "" ? "bg-primary100" : ""}`}
          >
            None
          </FilterButton>
          <FilterButton
            onClick={() => handleFilterSort("Sort by", "a-z")}
            className={`${sortBy === "a-z" ? "bg-primary100" : ""}`}
          >
            A-Z
          </FilterButton>
          <FilterButton
            onClick={() => handleFilterSort("Sort by", "z-a")}
            className={`${sortBy === "z-a" ? "bg-primary100" : ""}`}
          >
            Z-A
          </FilterButton>
        </FilterDetail>
        <Divider />
        <FilterDetail title="Characters">
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                fav: "",
              })
            }
            className={`${fav === "" ? "bg-primary100" : ""}`}
          >
            All
          </FilterButton>
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                fav: "Starred",
              })
            }
            className={`${fav === "Starred" ? "bg-primary100" : ""}`}
          >
            Starred
          </FilterButton>
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                fav: "Others",
              })
            }
            className={`${fav === "Others" ? "bg-primary100" : ""}`}
          >
            Others
          </FilterButton>
        </FilterDetail>
        <FilterDetail title="Specie">
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                species: "",
              })
            }
            className={`${species === "" ? "bg-primary100" : ""}`}
          >
            All
          </FilterButton>
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                species: "Human",
              })
            }
            className={`${species === "Human" ? "bg-primary100" : ""}`}
          >
            Human
          </FilterButton>
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                species: "Alien",
              })
            }
            className={`${species === "Alien" ? "bg-primary100" : ""}`}
          >
            Alien
          </FilterButton>
        </FilterDetail>
        <FilterDetail title="Gender">
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                gender: "",
              })
            }
            className={`${gender === "" ? "bg-primary100" : ""}`}
          >
            All
          </FilterButton>
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                gender: "Female",
              })
            }
            className={`${gender === "Female" ? "bg-primary100" : ""}`}
          >
            Female
          </FilterButton>
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                gender: "Male",
              })
            }
            className={`${gender === "Male" ? "bg-primary100" : ""}`}
          >
            Male
          </FilterButton>
        </FilterDetail>
        <FilterDetail title="Status">
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                status: "",
              })
            }
            className={`${status === "" ? "bg-primary100" : ""}`}
          >
            All
          </FilterButton>
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                status: "Alive",
              })
            }
            className={`${status === "Alive" ? "bg-primary100" : ""}`}
          >
            Alive
          </FilterButton>
          <FilterButton
            onClick={() =>
              setSearchParams({
                ...extractExistingParams(searchParams),
                status: "Dead",
              })
            }
            className={`${status === "Dead" ? "bg-primary100" : ""}`}
          >
            Dead
          </FilterButton>
        </FilterDetail>
        <button
          onClick={handleFilter}
          className="text-center w-full mt-8 py-2 rounded-lg bg-gray-200 hover:bg-[#5A3696] hover:text-white"
        >
          Filter
        </button>
      </section>
    </>
  );
}
