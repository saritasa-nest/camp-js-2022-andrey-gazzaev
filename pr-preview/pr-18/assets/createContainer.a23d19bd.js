import{ag as W,_ as c,ah as k,b as m,ai as v,r as y,e as G,j as R,h as S,k as $,a as T}from"./index.e832e50d.js";const j=W();var L=j;const M=["className","component","disableGutters","fixed","maxWidth","classes"],N=k(),P=L("div",{name:"MuiContainer",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:i}=a;return[e.root,e[`maxWidth${m(String(i.maxWidth))}`],i.fixed&&e.fixed,i.disableGutters&&e.disableGutters]}}),_=a=>v({props:a,name:"MuiContainer",defaultTheme:N}),U=(a,e)=>{const i=o=>T(e,o),{classes:p,fixed:l,disableGutters:u,maxWidth:t}=a,s={root:["root",t&&`maxWidth${m(String(t))}`,l&&"fixed",u&&"disableGutters"]};return $(s,i,p)};function w(a={}){const{createStyledComponent:e=P,useThemeProps:i=_,componentName:p="MuiContainer"}=a,l=e(({theme:t,ownerState:s})=>c({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!s.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}}),({theme:t,ownerState:s})=>s.fixed&&Object.keys(t.breakpoints.values).reduce((o,n)=>{const d=n,r=t.breakpoints.values[d];return r!==0&&(o[t.breakpoints.up(d)]={maxWidth:`${r}${t.breakpoints.unit}`}),o},{}),({theme:t,ownerState:s})=>c({},s.maxWidth==="xs"&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},s.maxWidth&&s.maxWidth!=="xs"&&{[t.breakpoints.up(s.maxWidth)]:{maxWidth:`${t.breakpoints.values[s.maxWidth]}${t.breakpoints.unit}`}}));return y.exports.forwardRef(function(s,o){const n=i(s),{className:d,component:r="div",disableGutters:b=!1,fixed:f=!1,maxWidth:g="lg"}=n,h=G(n,M),x=c({},n,{component:r,disableGutters:b,fixed:f,maxWidth:g}),C=U(x,p);return R(l,c({as:r,ownerState:x,className:S(C.root,d),ref:o},h))})}export{w as c};
