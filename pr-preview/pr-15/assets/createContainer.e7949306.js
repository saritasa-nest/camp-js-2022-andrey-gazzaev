import{x as W,_ as c,y as k,q as m,z as v,r as y,b as G,j as R,d as S,e as $,g as T}from"./index.4006e121.js";const j=W();var L=j;const M=["className","component","disableGutters","fixed","maxWidth","classes"],N=k(),P=L("div",{name:"MuiContainer",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:o}=a;return[e.root,e[`maxWidth${m(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),_=a=>v({props:a,name:"MuiContainer",defaultTheme:N}),z=(a,e)=>{const o=i=>T(e,i),{classes:p,fixed:l,disableGutters:u,maxWidth:t}=a,s={root:["root",t&&`maxWidth${m(String(t))}`,l&&"fixed",u&&"disableGutters"]};return $(s,o,p)};function q(a={}){const{createStyledComponent:e=P,useThemeProps:o=_,componentName:p="MuiContainer"}=a,l=e(({theme:t,ownerState:s})=>c({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!s.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}}),({theme:t,ownerState:s})=>s.fixed&&Object.keys(t.breakpoints.values).reduce((i,n)=>{const d=n,r=t.breakpoints.values[d];return r!==0&&(i[t.breakpoints.up(d)]={maxWidth:`${r}${t.breakpoints.unit}`}),i},{}),({theme:t,ownerState:s})=>c({},s.maxWidth==="xs"&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},s.maxWidth&&s.maxWidth!=="xs"&&{[t.breakpoints.up(s.maxWidth)]:{maxWidth:`${t.breakpoints.values[s.maxWidth]}${t.breakpoints.unit}`}}));return y.exports.forwardRef(function(s,i){const n=o(s),{className:d,component:r="div",disableGutters:b=!1,fixed:f=!1,maxWidth:g="lg"}=n,C=G(n,M),x=c({},n,{component:r,disableGutters:b,fixed:f,maxWidth:g}),h=z(x,p);return R(l,c({as:r,ownerState:x,className:S(h.root,d),ref:i},C))})}export{q as c};
