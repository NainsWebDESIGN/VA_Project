export interface Member {
    username: string,
    password: string
}
export interface Team {
    page: string,
    name: string,
    type: string,
    pic: string,
    content: string,
    original: string
}
export interface Place {
    page: string,
    name: string,
    style: string,
    content: string,
    original: string
}
export interface AboutForm {
    Team: Team,
    Place: Place
}
export interface ServiceForm {
    Do: Array<boolean>,
    Skill: Array<boolean>,
    Labor: Array<boolean>,
    Portofio: Array<boolean>,
    month: Array<boolean>,
    year: Array<boolean>
}
export interface Suggest {
    "entry.2002706790": string,
    "entry.1995154974": string,
    "entry.2137997242": string
}
export interface MessItem {
    type: string,
    date: string,
    big_p: string,
    small_p: string,
    main_p: string,
    text: string,
    readStyle: string,
    title: string,
    content: string
}