import{I as t,r as n,D as r,j as s,Z as i,Y as c,ac as p,V as m}from"./index.c0eb5cb6.js";import{H as l}from"./Header.abaea9aa.js";const h=t(e=>e.genres.genres,e=>e),g=t(e=>e.genres.isLoading,e=>e),G="_card_1rf1o_1";var f={card:G};const x=({genre:e})=>r("div",{className:f.card,children:[s("h2",{children:e.name}),r("span",{children:["Id - ",e.id]})]}),u=n.exports.memo(x),C=()=>{const e=i(),o=c(h),d=c(g);return n.exports.useEffect(()=>{e(p())},[e]),d?s("div",{children:"Loading"}):r(m,{children:[s(l,{}),s("h1",{children:"Genres"}),o.map(a=>s(u,{genre:a},a.id))]})},v=n.exports.memo(C);export{v as GenresPage};
