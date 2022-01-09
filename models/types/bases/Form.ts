export interface CardsDataBase {
    dataBaseUid: string,
    dataBaseArray: CardData[];
}

export interface CardData {
    cardUid: string,
    nativeLanguageValue: string,
    languageToLearnValue: string,
}

export interface Card {
    uid: string,
    frenchValue: string;
    spanishValue: string;
}
