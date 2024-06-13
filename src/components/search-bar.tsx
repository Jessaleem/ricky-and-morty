import { IconAdjustments, IconSearch } from "@tabler/icons-react";

export function SearchBar() {
  return (
    <form>
      <div className="flex rounded-lg bg-gray-200 border px-4 py-2 items-center gap-2">
        <IconSearch size={24} />
        <input
          placeholder="Search or filter results"
          className="w-full border-none bg-gray-200 indent-2"
        />
        <IconAdjustments size={24} color="#5A3696" />
      </div>
    </form>
  );
}
