import{g as B,a as C,s as A,P as D,q as d,_ as t,r as x,u as y,b as T,j as l,d as m,e as h,m as R,t as $,n as I,B as f,h as v,T as k,v as O,w as U}from"./index.a8d222ba.js";function z(o){return B("MuiAppBar",o)}C("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent"]);const M=["className","color","enableColorOnDark","position"],N=o=>{const{color:r,position:a,classes:s}=o,n={root:["root",`color${d(r)}`,`position${d(a)}`]};return h(n,z,s)},c=(o,r)=>`${o?.replace(")","")}, ${r})`,G=A(D,{name:"MuiAppBar",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:a}=o;return[r.root,r[`position${d(a.position)}`],r[`color${d(a.color)}`]]}})(({theme:o,ownerState:r})=>{const a=o.palette.mode==="light"?o.palette.grey[100]:o.palette.grey[900];return t({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},r.position==="fixed"&&{position:"fixed",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},r.position==="absolute"&&{position:"absolute",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},r.position==="sticky"&&{position:"sticky",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},r.position==="static"&&{position:"static"},r.position==="relative"&&{position:"relative"},!o.vars&&t({},r.color==="default"&&{backgroundColor:a,color:o.palette.getContrastText(a)},r.color&&r.color!=="default"&&r.color!=="inherit"&&r.color!=="transparent"&&{backgroundColor:o.palette[r.color].main,color:o.palette[r.color].contrastText},r.color==="inherit"&&{color:"inherit"},o.palette.mode==="dark"&&!r.enableColorOnDark&&{backgroundColor:null,color:null},r.color==="transparent"&&t({backgroundColor:"transparent",color:"inherit"},o.palette.mode==="dark"&&{backgroundImage:"none"})),o.vars&&t({},r.color==="default"&&{"--AppBar-background":r.enableColorOnDark?o.vars.palette.AppBar.defaultBg:c(o.vars.palette.AppBar.darkBg,o.vars.palette.AppBar.defaultBg),"--AppBar-color":r.enableColorOnDark?o.vars.palette.text.primary:c(o.vars.palette.AppBar.darkColor,o.vars.palette.text.primary)},r.color&&!r.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":r.enableColorOnDark?o.vars.palette[r.color].main:c(o.vars.palette.AppBar.darkBg,o.vars.palette[r.color].main),"--AppBar-color":r.enableColorOnDark?o.vars.palette[r.color].contrastText:c(o.vars.palette.AppBar.darkColor,o.vars.palette[r.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:r.color==="inherit"?"inherit":"var(--AppBar-color)"},r.color==="transparent"&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),j=x.exports.forwardRef(function(r,a){const s=y({props:r,name:"MuiAppBar"}),{className:n,color:e="primary",enableColorOnDark:u=!1,position:p="fixed"}=s,g=T(s,M),i=t({},s,{color:e,position:p,enableColorOnDark:u}),b=N(i);return l(G,t({square:!0,component:"header",ownerState:i,elevation:4,className:m(b.root,n,p==="fixed"&&"mui-fixed"),ref:a},g))});var H=j;function L(o){return B("MuiToolbar",o)}C("MuiToolbar",["root","gutters","regular","dense"]);const P=["className","component","disableGutters","variant"],_=o=>{const{classes:r,disableGutters:a,variant:s}=o;return h({root:["root",!a&&"gutters",s]},L,r)},q=A("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:a}=o;return[r.root,!a.disableGutters&&r.gutters,r[a.variant]]}})(({theme:o,ownerState:r})=>t({position:"relative",display:"flex",alignItems:"center"},!r.disableGutters&&{paddingLeft:o.spacing(2),paddingRight:o.spacing(2),[o.breakpoints.up("sm")]:{paddingLeft:o.spacing(3),paddingRight:o.spacing(3)}},r.variant==="dense"&&{minHeight:48}),({theme:o,ownerState:r})=>r.variant==="regular"&&o.mixins.toolbar),F=x.exports.forwardRef(function(r,a){const s=y({props:r,name:"MuiToolbar"}),{className:n,component:e="div",disableGutters:u=!1,variant:p="regular"}=s,g=T(s,P),i=t({},s,{component:e,disableGutters:u,variant:p}),b=_(i);return l(q,t({as:e,className:m(b.root,n),ref:a,ownerState:i},g))});var V=F;const W=()=>{const o=R($),r=I(),a=()=>{r(U())};return o===null?l("p",{children:"Oops, something went wrong."}):l(f,{sx:{flexGrow:1},children:l(H,{position:"static",children:v(V,{children:[l(k,{variant:"h6",component:"h1",sx:{flexGrow:1},children:"Anime Catalog"}),v(f,{children:[v(k,{variant:"h6",component:"span",children:["Hello ",o.firstName," ",o.lastName]}),l(O,{type:"button",color:"inherit",onClick:a,children:"Log Out"})]})]})})})},J=x.exports.memo(W);export{J as H};