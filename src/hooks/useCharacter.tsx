import { useContext } from "react";
import {
  CharacterContext,
  CharacterContextType,
} from "../context/character-context";

export function useCharacter() {
  return useContext(CharacterContext) as CharacterContextType;
}
