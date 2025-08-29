import { RaceResult } from "./main";

export function part2(race: RaceResult) : number {
    const a = 1;
    const b = race.duration;
    const c = race.record;
    const n1 = ((-1*b) + Math.sqrt((b*b) - (4*a*c))) / (2*a);
    const n2 = ((-1*b) - Math.sqrt((b*b) - (4*a*c))) / (2*a);

    const num_solutions = Math.abs(Math.ceil(n2) - Math.floor(n1)) + 1;
    console.log(`Race: duration=${race.duration}, record=${race.record}`);
    console.log(`Possible solutions for the equation are: n1 = ${n1}, n2 = ${n2}, solutions=${num_solutions}`);
    return num_solutions;
}