import { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useCharacter } from "../hooks/useCharacter";
import { useWindowWidth } from "../hooks/useWindowWidth";

export function HomePage() {
  const { characters, favorites } = useCharacter();

  const { width } = useWindowWidth();

  useEffect(() => {
    if (!(characters.length > 0)) {
      return;
    }

    if (width > 768) {
      const favorite = favorites[0];

      if (favorite) {
        window.location.href = `http://localhost:5173/character/${favorite.id}`;
      } else {
        window.location.href = `http://localhost:5173/character/${characters[0].id}`;
      }
    }
  }, [width, favorites, characters]);

  return (
    <div className="md:hidden">
      <Sidebar />
    </div>
  );
}
