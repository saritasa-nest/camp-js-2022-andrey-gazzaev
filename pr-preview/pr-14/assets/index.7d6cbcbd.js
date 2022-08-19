import{g as C,i as m,s as A,P as R,b as g,_ as n,r as l,h,d as y,j as t,e as T,f as G,k as D,l as i,m as v,n as $,o as I,B as k,T as B,p as L,q as N,t as O,F as U}from"./index.920f1f92.js";function z(o){return C("MuiAppBar",o)}m("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent"]);const M=["className","color","enableColorOnDark","position"],_=o=>{const{color:r,position:a,classes:s}=o,e={root:["root",`color${g(r)}`,`position${g(a)}`]};return G(e,z,s)},u=(o,r)=>`${o?.replace(")","")}, ${r})`,P=A(R,{name:"MuiAppBar",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:a}=o;return[r.root,r[`position${g(a.position)}`],r[`color${g(a.color)}`]]}})(({theme:o,ownerState:r})=>{const a=o.palette.mode==="light"?o.palette.grey[100]:o.palette.grey[900];return n({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},r.position==="fixed"&&{position:"fixed",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},r.position==="absolute"&&{position:"absolute",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},r.position==="sticky"&&{position:"sticky",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},r.position==="static"&&{position:"static"},r.position==="relative"&&{position:"relative"},!o.vars&&n({},r.color==="default"&&{backgroundColor:a,color:o.palette.getContrastText(a)},r.color&&r.color!=="default"&&r.color!=="inherit"&&r.color!=="transparent"&&{backgroundColor:o.palette[r.color].main,color:o.palette[r.color].contrastText},r.color==="inherit"&&{color:"inherit"},o.palette.mode==="dark"&&!r.enableColorOnDark&&{backgroundColor:null,color:null},r.color==="transparent"&&n({backgroundColor:"transparent",color:"inherit"},o.palette.mode==="dark"&&{backgroundImage:"none"})),o.vars&&n({},r.color==="default"&&{"--AppBar-background":r.enableColorOnDark?o.vars.palette.AppBar.defaultBg:u(o.vars.palette.AppBar.darkBg,o.vars.palette.AppBar.defaultBg),"--AppBar-color":r.enableColorOnDark?o.vars.palette.text.primary:u(o.vars.palette.AppBar.darkColor,o.vars.palette.text.primary)},r.color&&!r.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":r.enableColorOnDark?o.vars.palette[r.color].main:u(o.vars.palette.AppBar.darkBg,o.vars.palette[r.color].main),"--AppBar-color":r.enableColorOnDark?o.vars.palette[r.color].contrastText:u(o.vars.palette.AppBar.darkColor,o.vars.palette[r.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:r.color==="inherit"?"inherit":"var(--AppBar-color)"},r.color==="transparent"&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),j=l.exports.forwardRef(function(r,a){const s=h({props:r,name:"MuiAppBar"}),{className:e,color:p="primary",enableColorOnDark:f=!1,position:d="fixed"}=s,b=y(s,M),c=n({},s,{color:p,position:d,enableColorOnDark:f}),x=_(c);return t(P,n({square:!0,component:"header",ownerState:c,elevation:4,className:T(x.root,e,d==="fixed"&&"mui-fixed"),ref:a},b))});var H=j;function F(o){return C("MuiToolbar",o)}m("MuiToolbar",["root","gutters","regular","dense"]);const q=["className","component","disableGutters","variant"],E=o=>{const{classes:r,disableGutters:a,variant:s}=o;return G({root:["root",!a&&"gutters",s]},F,r)},V=A("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:a}=o;return[r.root,!a.disableGutters&&r.gutters,r[a.variant]]}})(({theme:o,ownerState:r})=>n({position:"relative",display:"flex",alignItems:"center"},!r.disableGutters&&{paddingLeft:o.spacing(2),paddingRight:o.spacing(2),[o.breakpoints.up("sm")]:{paddingLeft:o.spacing(3),paddingRight:o.spacing(3)}},r.variant==="dense"&&{minHeight:48}),({theme:o,ownerState:r})=>r.variant==="regular"&&o.mixins.toolbar),W=l.exports.forwardRef(function(r,a){const s=h({props:r,name:"MuiToolbar"}),{className:e,component:p="div",disableGutters:f=!1,variant:d="regular"}=s,b=y(s,q),c=n({},s,{component:p,disableGutters:f,variant:d}),x=E(c);return t(V,n({as:p,className:T(x.root,e),ref:a,ownerState:c},b))});var J=W;const K=D(o=>o.genres.genres,o=>o),Q=D(o=>o.genres.isLoading,o=>o),X="_card_1rf1o_1";var Y={card:X};const Z=({genre:o})=>i("div",{className:Y.card,children:[t("h2",{children:o.name}),i("span",{children:["Id - ",o.id]})]}),w=l.exports.memo(Z),S=()=>{const o=v($),r=I(),a=()=>{r(N())};return o===null?t("p",{children:"Oops, something went wrong."}):t(k,{sx:{flexGrow:1},children:t(H,{position:"static",children:i(J,{children:[t(B,{variant:"h6",component:"h1",sx:{flexGrow:1},children:"Anime Catalog"}),i(k,{children:[i(B,{variant:"h6",component:"span",sx:{flexGrow:1},children:["Hello ",o.firstName," ",o.lastName]}),t(L,{type:"button",color:"inherit",onClick:a,children:"Log Out"})]})]})})})},oo=l.exports.memo(S),ro=()=>{const o=I(),r=v(K),a=v(Q);return l.exports.useEffect(()=>{o(O())},[o]),a?t("div",{children:"Loading"}):i(U,{children:[t(oo,{}),t("h1",{children:"Genres"}),r.map(s=>t(w,{genre:s},s.id))]})},so=l.exports.memo(ro);export{so as GenresPage};
