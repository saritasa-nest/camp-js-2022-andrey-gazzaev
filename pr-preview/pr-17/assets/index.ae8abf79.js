import{r as a,i as r,j as s,a0 as d,Z as t,ak as i,X as p}from"./index.81fb41bf.js";import{s as m,b as h,H as l}from"./selectors.d3c5128b.js";const G="_card_1rf1o_1";var f={card:G};const x=({genre:e})=>r("div",{className:f.card,children:[s("h2",{children:e.name}),r("span",{children:["Id - ",e.id]})]}),g=a.exports.memo(x),u=()=>{const e=d(),c=t(m),o=t(h);return a.exports.useEffect(()=>{e(i())},[e]),o?s("div",{children:"Loading"}):r(p,{children:[s(l,{}),s("h1",{children:"Genres"}),c.map(n=>s(g,{genre:n},n.id))]})},v=a.exports.memo(u);export{v as GenresPage};
