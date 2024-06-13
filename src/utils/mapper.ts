import { Character } from "../interfaces/character";

export function characterMapper(characters: Character[]){
    return characters.map(character => (
        {...character, isFavorite: false}
    ))
}