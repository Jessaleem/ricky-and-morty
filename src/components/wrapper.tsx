import { Outlet } from "react-router-dom";
import { CharacterContextProvider } from "../context/character-context";

export function Wrapper() {
  return (
    <CharacterContextProvider>
      <Outlet />
    </CharacterContextProvider>
  );
}
