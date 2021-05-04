export interface Member {
    username: string,
    password: string
}
export interface Team {
    name: string,
    type: string,
    pic: string,
    content: string
}
export interface Place {
    name: string,
    style: string,
    content: string
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