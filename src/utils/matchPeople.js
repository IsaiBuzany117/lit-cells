export const matchPeople = (people) => {
    let matches = [];
    let pairs = new Array((people.length * (people.length - 1)) / 2),
        pos = 0;

    for (let i = 0; i < people.length; i++) {
        for (let j = 0; j < people.length; j++) {
            if (people[i] !== people[j]) {
                pairs[pos++] = { p1: people[i], p2: people[j] };
            }
        }
    }
    while (matches.length !== people.length / 2) {
        const m = pairs[Math.floor(Math.random() * pairs.length)];
        console.log(m);
        let f = false;
        for (const e of matches) {
            if (
                m.p1 === e.p1 ||
                m.p1 === e.p2 ||
                m.p2 === e.p1 ||
                m.p2 === e.p2
            ) {
                f = true;
                break;
            }
        }
        if (!f) {
            matches.push(m);
        }
    }
    console.log(matches);

    return matches;
}