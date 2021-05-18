export interface Member {
    username: string,
    password: string
}
export interface SignUp {
    signname: string;
    signpass: string;
    signpass_2: string;
    email: string;
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
export interface ContactForm {
    page: string,
    original: string,
    media: string,
    href: string,
    style: string
}
export interface MessForm {
    page: string,
    original: string,
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
export interface ServiceDo {
    page: string,
    original: string,
    title: string,
    style: string,
    content: string
}
export interface ServiceSkill {
    page: string,
    original: string,
    title: string,
    percentage: number
}
export interface ServicePortofio {
    page: string,
    original: string,
    title: string,
    type: string,
    image: string,
    content: string
}
export interface ServiceDiscount {
    page: string,
    original: string,
    type: string,
    title: string,
    price: string,
    content: Array<string>
}
export interface ServiceForm {
    Do: ServiceDo,
    Left: ServiceSkill,
    Right: ServiceSkill,
    Portofio: ServicePortofio,
    Month: ServiceDiscount,
    Year: ServiceDiscount
}
export interface ServiceData {
    Do: Array<boolean>,
    Left: Array<boolean>,
    Right: Array<boolean>,
    Portofio: Array<boolean>,
    Month: Array<boolean>,
    Year: Array<boolean>
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