import{k as c,r as n,h as r,j as s,n as i,m as t,A as p,F as m}from"./index.a8d222ba.js";import{H as h}from"./Header.2d73cbd0.js";const l=c(e=>e.genres.genres,e=>e),g=c(e=>e.genres.isLoading,e=>e),G="_card_1rf1o_1";var f={card:G};const x=({genre:e})=>r("div",{className:f.card,children:[s("h2",{children:e.name}),r("span",{children:["Id - ",e.id]})]}),u=n.exports.memo(x),A=()=>{const e=i(),o=t(l),d=t(g);return n.exports.useEffect(()=>{e(p())},[e]),d?s("div",{children:"Loading"}):r(m,{children:[s(h,{}),s("h1",{children:"Genres"}),o.map(a=>s(u,{genre:a},a.id))]})},j=n.exports.memo(A);export{j as GenresPage};