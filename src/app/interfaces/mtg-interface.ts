export interface Card {
    name: string;
    names?: string[];
    manaCost: string;
    cmc: number;
    colors: string[];
    colorIdentity: string[];
    type: string;
    supertypes?: string[];
    types: string[];
    subtypes?: string[];
    rarity: string;
    set: string;
    text: string;
    artist: string;
    number: string;
    power: string;
    toughness: string;
    layout: string;
    multiverseid: number;
    imageUrl:   
   string;
    rulings?: { date: string; text: string }[];
    foreignNames?: { name: string; language: string; multiverseid: number }[];
    printings: string[];
    originalText: string;
    originalType: string;
    id:   
   string;
  }

  export interface Cards {
    cards: Card[];
  }