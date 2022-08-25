import{a as f,g,s as I,P as W,b as y,_ as r,r as i,u as $,e as B,j as n,h as T,k as h,B as q,D as K,d as x,L as R,t as Z,f as J,a0 as Q,Z as X,ac as Y,ad as w,i as m,K as z,W as S,ae as oo,T as P,af as ao,H as V}from"./index.4a531880.js";function to(o){return f("MuiAppBar",o)}g("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent"]);const eo=["className","color","enableColorOnDark","position"],so=o=>{const{color:a,position:t,classes:e}=o,s={root:["root",`color${y(a)}`,`position${y(t)}`]};return h(s,to,e)},C=(o,a)=>`${o?.replace(")","")}, ${a})`,ro=I(W,{name:"MuiAppBar",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:t}=o;return[a.root,a[`position${y(t.position)}`],a[`color${y(t.color)}`]]}})(({theme:o,ownerState:a})=>{const t=o.palette.mode==="light"?o.palette.grey[100]:o.palette.grey[900];return r({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},a.position==="fixed"&&{position:"fixed",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},a.position==="absolute"&&{position:"absolute",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},a.position==="sticky"&&{position:"sticky",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},a.position==="static"&&{position:"static"},a.position==="relative"&&{position:"relative"},!o.vars&&r({},a.color==="default"&&{backgroundColor:t,color:o.palette.getContrastText(t)},a.color&&a.color!=="default"&&a.color!=="inherit"&&a.color!=="transparent"&&{backgroundColor:o.palette[a.color].main,color:o.palette[a.color].contrastText},a.color==="inherit"&&{color:"inherit"},o.palette.mode==="dark"&&!a.enableColorOnDark&&{backgroundColor:null,color:null},a.color==="transparent"&&r({backgroundColor:"transparent",color:"inherit"},o.palette.mode==="dark"&&{backgroundImage:"none"})),o.vars&&r({},a.color==="default"&&{"--AppBar-background":a.enableColorOnDark?o.vars.palette.AppBar.defaultBg:C(o.vars.palette.AppBar.darkBg,o.vars.palette.AppBar.defaultBg),"--AppBar-color":a.enableColorOnDark?o.vars.palette.text.primary:C(o.vars.palette.AppBar.darkColor,o.vars.palette.text.primary)},a.color&&!a.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":a.enableColorOnDark?o.vars.palette[a.color].main:C(o.vars.palette.AppBar.darkBg,o.vars.palette[a.color].main),"--AppBar-color":a.enableColorOnDark?o.vars.palette[a.color].contrastText:C(o.vars.palette.AppBar.darkColor,o.vars.palette[a.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:a.color==="inherit"?"inherit":"var(--AppBar-color)"},a.color==="transparent"&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),no=i.exports.forwardRef(function(a,t){const e=$({props:a,name:"MuiAppBar"}),{className:s,color:l="primary",enableColorOnDark:c=!1,position:d="fixed"}=e,p=B(e,eo),u=r({},e,{color:l,position:d,enableColorOnDark:c}),b=so(u);return n(ro,r({square:!0,component:"header",ownerState:u,elevation:4,className:T(b.root,s,d==="fixed"&&"mui-fixed"),ref:t},p))});var io=no;function Do(o){return f("MuiDivider",o)}const lo=g("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);var D=lo;const co=g("MuiListItemIcon",["root","alignItemsFlexStart"]);var N=co;function No(o){return f("MuiListItemText",o)}const po=g("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);var U=po;function uo(o){return f("MuiMenuItem",o)}const go=g("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var v=go;const bo=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],vo=(o,a)=>{const{ownerState:t}=o;return[a.root,t.dense&&a.dense,t.divider&&a.divider,!t.disableGutters&&a.gutters]},fo=o=>{const{disabled:a,dense:t,divider:e,disableGutters:s,selected:l,classes:c}=o,p=h({root:["root",t&&"dense",a&&"disabled",!s&&"gutters",e&&"divider",l&&"selected"]},uo,c);return r({},c,p)},xo=I(q,{shouldForwardProp:o=>K(o)||o==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:vo})(({theme:o,ownerState:a})=>r({},o.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:`1px solid ${(o.vars||o).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(o.vars||o).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${v.selected}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:x(o.palette.primary.main,o.palette.action.selectedOpacity),[`&.${v.focusVisible}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.focusOpacity}))`:x(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.focusOpacity)}},[`&.${v.selected}:hover`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.hoverOpacity}))`:x(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:x(o.palette.primary.main,o.palette.action.selectedOpacity)}},[`&.${v.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},[`&.${v.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity},[`& + .${D.root}`]:{marginTop:o.spacing(1),marginBottom:o.spacing(1)},[`& + .${D.inset}`]:{marginLeft:52},[`& .${U.root}`]:{marginTop:0,marginBottom:0},[`& .${U.inset}`]:{paddingLeft:36},[`& .${N.root}`]:{minWidth:36}},!a.dense&&{[o.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&r({minHeight:32,paddingTop:4,paddingBottom:4},o.typography.body2,{[`& .${N.root} svg`]:{fontSize:"1.25rem"}}))),Co=i.exports.forwardRef(function(a,t){const e=$({props:a,name:"MuiMenuItem"}),{autoFocus:s=!1,component:l="li",dense:c=!1,divider:d=!1,disableGutters:p=!1,focusVisibleClassName:u,role:b="menuitem",tabIndex:A}=e,H=B(e,bo),F=i.exports.useContext(R),M={dense:c||F.dense||!1,disableGutters:p},k=i.exports.useRef(null);Z(()=>{s&&k.current&&k.current.focus()},[s]);const j=r({},e,{dense:M.dense,divider:d,disableGutters:p}),L=fo(e),E=J(k,t);let O;return e.disabled||(O=A!==void 0?A:-1),n(R.Provider,{value:M,children:n(xo,r({ref:E,role:b,tabIndex:O,component:l,focusVisibleClassName:T(L.focusVisible,u)},H,{ownerState:j,classes:L}))})});var G=Co;function mo(o){return f("MuiToolbar",o)}g("MuiToolbar",["root","gutters","regular","dense"]);const yo=["className","component","disableGutters","variant"],ko=o=>{const{classes:a,disableGutters:t,variant:e}=o;return h({root:["root",!t&&"gutters",e]},mo,a)},Io=I("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:t}=o;return[a.root,!t.disableGutters&&a.gutters,a[t.variant]]}})(({theme:o,ownerState:a})=>r({position:"relative",display:"flex",alignItems:"center"},!a.disableGutters&&{paddingLeft:o.spacing(2),paddingRight:o.spacing(2),[o.breakpoints.up("sm")]:{paddingLeft:o.spacing(3),paddingRight:o.spacing(3)}},a.variant==="dense"&&{minHeight:48}),({theme:o,ownerState:a})=>a.variant==="regular"&&o.mixins.toolbar),$o=i.exports.forwardRef(function(a,t){const e=$({props:a,name:"MuiToolbar"}),{className:s,component:l="div",disableGutters:c=!1,variant:d="regular"}=e,p=B(e,yo),u=r({},e,{component:l,disableGutters:c,variant:d}),b=ko(u);return n(Io,r({as:l,className:T(b.root,s),ref:t,ownerState:u},p))});var Bo=$o;const To=()=>{const o=Q(),a=X(Y),[t,e]=i.exports.useState(null),s=Boolean(t),l=i.exports.useCallback(()=>{o(w()),e(null)},[]),c=i.exports.useCallback(p=>{e(p.currentTarget)},[]),d=i.exports.useCallback(()=>{e(null)},[]);return a===null?n("p",{children:"Oops, something went wrong."}):m(z,{children:[n(S,{id:"basic-button",color:"inherit",variant:"text","aria-controls":s?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":s?"true":void 0,onClick:c,children:"Dashboard"}),m(oo,{id:"basic-menu",anchorEl:t,open:s,onClose:d,MenuListProps:{"aria-labelledby":"basic-button"},children:[n(G,{children:m(P,{variant:"h6",component:"span",children:[a.firstName," ",a.lastName]})}),n(G,{onClick:l,children:"Logout"})]})]})},ho=i.exports.memo(To),Ao="_header_1yhix_1",Mo="_headerLogoText_1yhix_5";var _={header:Ao,headerLogoText:Mo};const Lo=()=>n(z,{className:_.header,children:n(io,{position:"static",children:m(Bo,{children:[n(P,{variant:"h6",component:"h1",className:_.headerLogoText,children:"Anime Catalog"}),n(ho,{})]})})}),Uo=i.exports.memo(Lo),{selectAll:Oo}=ao.getSelectors(),Go=V(o=>Oo(o.genres),o=>o),_o=V(o=>o.genres.isLoading,o=>o);export{Uo as H,G as M,No as a,_o as b,Do as g,U as l,Go as s};