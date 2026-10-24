// Seed data, copied verbatim from the prototype (spec section 19).

export type Person = { i: string; c: string };
export type Plan = {
  id: string; cat: string; tag: string; hood: string; title: string; host: string; hostAv: string;
  hostColor: string; role: string; hosted: string; when: string; time: string; short: string;
  place: string; transit: string; price: number; door: number; goal: number; down: number;
  friends: string[]; more: number; closes: string; newTo: number; x: string; y: string; label: string;
  ph: string; blurb: string; polls: { q: string; o: [string, number][] }[];
};

export const PEOPLE: Record<string, Person> = {
  You: { i: 'YO', c: '#15120F' }, Priya: { i: 'PS', c: '#C2410C' }, Jay: { i: 'JT', c: '#1F6F5C' },
  Dev: { i: 'DK', c: '#3B4BA8' }, Ama: { i: 'AO', c: '#9A3B6B' }, Luis: { i: 'LR', c: '#7A5C12' },
  Mei: { i: 'MC', c: '#2D6A8F' }, Kofi: { i: 'KB', c: '#6B4F3A' },
};

export const PLANS: Plan[] = [
  { id:'salsa', cat:'city', tag:'CITY & PUBLIC', hood:'Nubian Square', title:'Salsa under the lights', host:'Boston Parks & Rec', hostAv:'BP', hostColor:'#1F6F5C', role:'Public program', hosted:'40+ plans hosted', when:'Fri, Nov 6', time:'7:00 – 10:00 pm', short:'Fri 7pm', place:'Nubian Square Plaza', transit:'Silver Line · Nubian', price:0, door:0, goal:150, down:148, friends:['Ama'], more:6, closes:'5 days', newTo:51, x:'34%', y:'38%', label:'Salsa', ph:'Outdoor salsa at night, string lights, dancers',
    blurb:"Free beginner lesson at 7, live band at 8. The city covers the band if 150 people say they're down.",
    polls:[{q:'Lesson level?', o:[['Total beginner',58],['Some experience',38]]}] },
  { id:'fade', cat:'local', tag:'LOCAL HOST', hood:'Fields Corner', title:'After-hours fades & freestyle', host:'Marcus Bell', hostAv:'MB', hostColor:'#7A5C12', role:'Barber', hosted:'6 plans hosted', when:'Thu, Nov 5', time:'9:00 – 11:30 pm', short:'Thu 9pm', place:'Fresh Lines Barbershop', transit:'Red Line · Fields Corner', price:10, door:15, goal:60, down:41, friends:['Jay','Priya'], more:3, closes:'3 days', newTo:14, x:'62%', y:'50%', label:'Fades', ph:'Barbershop after dark, warm light, crowd hanging out',
    blurb:"Marcus keeps the chairs open after close. Cuts off a sign-up list, a DJ in the corner, and an open mic for anyone with 16 bars.",
    polls:[{q:'Which night?', o:[['Thu',22],['Fri',14],['Sat',5]]},{q:'Open mic theme?', o:[['90s Boston rap',17],['Afrobeats',13],['Anything goes',11]]}] },
  { id:'pho', cat:'local', tag:'HOME COOK', hood:'Fields Corner', title:"Bà Lan's Sunday phở supper", host:'Lan Nguyen', hostAv:'LN', hostColor:'#9A3B6B', role:'Home cook', hosted:'3 plans hosted', when:'Sun, Nov 8', time:'6:00 – 8:30 pm', short:'Sun 6pm', place:"Lan's kitchen table", transit:'Red Line · Fields Corner', price:18, door:0, goal:12, down:11, friends:['Dev'], more:1, closes:'2 days', newTo:7, x:'76%', y:'56%', label:'Phở', ph:'Long dinner table, bowls of phở, steam, family-style',
    blurb:"Twelve seats at one long table. Lan makes the broth Saturday night and tells you how her mom made it in Huế.",
    polls:[{q:'Which Sunday?', o:[['Nov 8',7],['Nov 15',4]]}] },
  { id:'run', cat:'local', tag:'RUN CLUB', hood:'Franklin Park', title:'Sunrise 5K + jollof breakfast', host:'Roxbury Run Crew', hostAv:'RR', hostColor:'#3B4BA8', role:'Run club', hosted:'22 plans hosted', when:'Sat, Nov 7', time:'7:30 – 9:30 am', short:'Sat 7:30am', place:'Franklin Park, Playstead', transit:'Orange Line · Green St', price:0, door:0, goal:40, down:28, friends:['Priya'], more:2, closes:'4 days', newTo:19, x:'22%', y:'47%', label:'5K', ph:'Group run at sunrise in a big park',
    blurb:"Easy pace, nobody gets dropped. Afterwards Kofi's aunt brings jollof and the crew walks you to the T.",
    polls:[{q:'Start time?', o:[['6:30 am',9],['7:30 am',19]]}] },
  { id:'sneaker', cat:'brand', tag:'BRAND', hood:'Chinatown', title:'Midnight sneaker swap', host:'Stride Lab', hostAv:'SL', hostColor:'#15120F', role:'Brand', hosted:'9 plans hosted', when:'Fri, Nov 13', time:'10:00 pm – 1:00 am', short:'Fri 10pm', place:'Garage rooftop, Kneeland St', transit:'Orange Line · Chinatown', price:5, door:10, goal:80, down:63, friends:['Jay'], more:4, closes:'6 days', newTo:22, x:'46%', y:'20%', label:'Swap', ph:'Sneakers laid out on a rooftop at night',
    blurb:"Bring a pair, leave with a pair. Stride Lab sets up the tables and a cleaning station, and the money goes to whoever hosts the next one.",
    polls:[{q:'Which venue?', o:[['Parking garage rooftop',33],['Gallery on Harrison',30]]}] },
  { id:'harbor', cat:'cause', tag:'CAUSE', hood:'East Boston', title:'Piers Park cleanup + oyster shuck', host:'Harbor Keepers', hostAv:'HK', hostColor:'#2D6A8F', role:'Nonprofit', hosted:'15 plans hosted', when:'Sun, Nov 15', time:'10:00 am – 1:00 pm', short:'Sun 10am', place:'Piers Park', transit:'Blue Line · Maverick', price:0, door:0, goal:50, down:22, friends:[], more:0, closes:'9 days', newTo:31, x:'78%', y:'13%', label:'Cleanup', ph:'Volunteers on a harbor pier with the skyline behind',
    blurb:"Two hours on the shoreline, then a local shucker shows everyone how to open an oyster without losing a thumb.",
    polls:[{q:'After-party spot?', o:[['Oysters on the pier',15],['Taquería on Meridian',7]]}] },
  { id:'zine', cat:'city', tag:'CITY & PUBLIC', hood:'Codman Square', title:'Zine night at the library', host:'Boston Public Library', hostAv:'BL', hostColor:'#6B4F3A', role:'Public program', hosted:'31 plans hosted', when:'Wed, Nov 11', time:'6:30 – 8:30 pm', short:'Wed 6:30pm', place:'Codman Square Branch', transit:'Fairmount Line · Four Corners', price:0, door:0, goal:30, down:17, friends:['Mei'], more:1, closes:'5 days', newTo:9, x:'46%', y:'56%', label:'Zines', ph:'Table covered in paper, scissors, collage',
    blurb:"Scissors, a risograph and a pile of old Globe archives. Make four pages about your block and swap them before you leave.",
    polls:[{q:'Theme?', o:[['Your block',9],['Food memories',8]]}] },
];

export const CAL_EVENTS = [
  { d:'2026-10-24', t:'2:00 pm', title:'Free cuts for the block', status:'Happened', amt:'$150', kind:'done' },
  { d:'2026-10-31', t:'8:00 pm', title:'Saturday line-up & dominoes', status:'Happened', amt:'$612', kind:'done' },
  { d:'2026-11-02', t:'9:00 am', title:'Payout to bank ••4421', status:'Payout', amt:'+$612', kind:'pay' },
  { d:'2026-11-03', t:'11:59 pm', title:'Poll closes: which night?', status:'Poll', amt:'41 votes', kind:'poll' },
  { d:'2026-11-04', t:'11:59 pm', title:'Goal deadline: After-hours fades', status:'Deadline', amt:'60 needed', kind:'poll' },
  { d:'2026-11-05', t:'9:00 pm', title:'After-hours fades & freestyle', status:'Heating up', amt:'$410 held', kind:'live' },
  { d:'2026-11-09', t:'9:00 am', title:'Payout: After-hours fades', status:'Payout', amt:'est. $600', kind:'pay' },
  { d:'2026-11-14', t:'8:00 pm', title:'Saturday line-up #2', status:'Pitched', amt:'12 of 40', kind:'pitch' },
  { d:'2026-11-21', t:'10:00 am', title:"Kids' cuts before Thanksgiving", status:'Pitched', amt:'City stipend', kind:'pitch' },
  { d:'2026-11-28', t:'8:00 pm', title:'Small Business Saturday late night', status:'Pitched', amt:'4 of 50', kind:'pitch' },
];

export const CHIP_DEFS: [string, string][] = [['all','For you'],['city','City & public'],['local','Local hosts'],['brand','Brands'],['cause','Causes']];
