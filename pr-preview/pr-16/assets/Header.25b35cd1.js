import{g as f,a as g,s as I,a3 as E,f as y,_ as s,r as n,u as $,b as B,j as i,d as M,e as T,B as W,E as q,F as x,L as D,n as Y,v as J,$ as K,Y as Q,a6 as X,a7 as Z,D as m,M as z,N as w,a8 as S,G as V}from"./index.fc9578e7.js";function oo(o){return f("MuiAppBar",o)}g("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent"]);const ao=["className","color","enableColorOnDark","position"],to=o=>{const{color:a,position:t,classes:e}=o,r={root:["root",`color${y(a)}`,`position${y(t)}`]};return T(r,oo,e)},C=(o,a)=>`${o?.replace(")","")}, ${a})`,eo=I(E,{name:"MuiAppBar",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:t}=o;return[a.root,a[`position${y(t.position)}`],a[`color${y(t.color)}`]]}})(({theme:o,ownerState:a})=>{const t=o.palette.mode==="light"?o.palette.grey[100]:o.palette.grey[900];return s({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},a.position==="fixed"&&{position:"fixed",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},a.position==="absolute"&&{position:"absolute",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},a.position==="sticky"&&{position:"sticky",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},a.position==="static"&&{position:"static"},a.position==="relative"&&{position:"relative"},!o.vars&&s({},a.color==="default"&&{backgroundColor:t,color:o.palette.getContrastText(t)},a.color&&a.color!=="default"&&a.color!=="inherit"&&a.color!=="transparent"&&{backgroundColor:o.palette[a.color].main,color:o.palette[a.color].contrastText},a.color==="inherit"&&{color:"inherit"},o.palette.mode==="dark"&&!a.enableColorOnDark&&{backgroundColor:null,color:null},a.color==="transparent"&&s({backgroundColor:"transparent",color:"inherit"},o.palette.mode==="dark"&&{backgroundImage:"none"})),o.vars&&s({},a.color==="default"&&{"--AppBar-background":a.enableColorOnDark?o.vars.palette.AppBar.defaultBg:C(o.vars.palette.AppBar.darkBg,o.vars.palette.AppBar.defaultBg),"--AppBar-color":a.enableColorOnDark?o.vars.palette.text.primary:C(o.vars.palette.AppBar.darkColor,o.vars.palette.text.primary)},a.color&&!a.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":a.enableColorOnDark?o.vars.palette[a.color].main:C(o.vars.palette.AppBar.darkBg,o.vars.palette[a.color].main),"--AppBar-color":a.enableColorOnDark?o.vars.palette[a.color].contrastText:C(o.vars.palette.AppBar.darkColor,o.vars.palette[a.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:a.color==="inherit"?"inherit":"var(--AppBar-color)"},a.color==="transparent"&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),ro=n.exports.forwardRef(function(a,t){const e=$({props:a,name:"MuiAppBar"}),{className:r,color:l="primary",enableColorOnDark:c=!1,position:d="fixed"}=e,p=B(e,ao),u=s({},e,{color:l,position:d,enableColorOnDark:c}),b=to(u);return i(eo,s({square:!0,component:"header",ownerState:u,elevation:4,className:M(b.root,r,d==="fixed"&&"mui-fixed"),ref:t},p))});var so=ro;function Oo(o){return f("MuiDivider",o)}const io=g("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);var L=io;const no=g("MuiListItemIcon",["root","alignItemsFlexStart"]);var N=no;function Ro(o){return f("MuiListItemText",o)}const lo=g("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);var U=lo;function co(o){return f("MuiMenuItem",o)}const po=g("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var v=po;const uo=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],go=(o,a)=>{const{ownerState:t}=o;return[a.root,t.dense&&a.dense,t.divider&&a.divider,!t.disableGutters&&a.gutters]},bo=o=>{const{disabled:a,dense:t,divider:e,disableGutters:r,selected:l,classes:c}=o,p=T({root:["root",t&&"dense",a&&"disabled",!r&&"gutters",e&&"divider",l&&"selected"]},co,c);return s({},c,p)},vo=I(W,{shouldForwardProp:o=>q(o)||o==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:go})(({theme:o,ownerState:a})=>s({},o.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:`1px solid ${(o.vars||o).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(o.vars||o).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${v.selected}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:x(o.palette.primary.main,o.palette.action.selectedOpacity),[`&.${v.focusVisible}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.focusOpacity}))`:x(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.focusOpacity)}},[`&.${v.selected}:hover`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.hoverOpacity}))`:x(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:x(o.palette.primary.main,o.palette.action.selectedOpacity)}},[`&.${v.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},[`&.${v.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity},[`& + .${L.root}`]:{marginTop:o.spacing(1),marginBottom:o.spacing(1)},[`& + .${L.inset}`]:{marginLeft:52},[`& .${U.root}`]:{marginTop:0,marginBottom:0},[`& .${U.inset}`]:{paddingLeft:36},[`& .${N.root}`]:{minWidth:36}},!a.dense&&{[o.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&s({minHeight:32,paddingTop:4,paddingBottom:4},o.typography.body2,{[`& .${N.root} svg`]:{fontSize:"1.25rem"}}))),fo=n.exports.forwardRef(function(a,t){const e=$({props:a,name:"MuiMenuItem"}),{autoFocus:r=!1,component:l="li",dense:c=!1,divider:d=!1,disableGutters:p=!1,focusVisibleClassName:u,role:b="menuitem",tabIndex:h}=e,P=B(e,uo),F=n.exports.useContext(D),A={dense:c||F.dense||!1,disableGutters:p},k=n.exports.useRef(null);Y(()=>{r&&k.current&&k.current.focus()},[r]);const H=s({},e,{dense:A.dense,divider:d,disableGutters:p}),O=bo(e),j=J(k,t);let R;return e.disabled||(R=h!==void 0?h:-1),i(D.Provider,{value:A,children:i(vo,s({ref:j,role:b,tabIndex:R,component:l,focusVisibleClassName:M(O.focusVisible,u)},P,{ownerState:H,classes:O}))})});var _=fo;function xo(o){return f("MuiToolbar",o)}g("MuiToolbar",["root","gutters","regular","dense"]);const Co=["className","component","disableGutters","variant"],mo=o=>{const{classes:a,disableGutters:t,variant:e}=o;return T({root:["root",!t&&"gutters",e]},xo,a)},yo=I("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:t}=o;return[a.root,!t.disableGutters&&a.gutters,a[t.variant]]}})(({theme:o,ownerState:a})=>s({position:"relative",display:"flex",alignItems:"center"},!a.disableGutters&&{paddingLeft:o.spacing(2),paddingRight:o.spacing(2),[o.breakpoints.up("sm")]:{paddingLeft:o.spacing(3),paddingRight:o.spacing(3)}},a.variant==="dense"&&{minHeight:48}),({theme:o,ownerState:a})=>a.variant==="regular"&&o.mixins.toolbar),ko=n.exports.forwardRef(function(a,t){const e=$({props:a,name:"MuiToolbar"}),{className:r,component:l="div",disableGutters:c=!1,variant:d="regular"}=e,p=B(e,Co),u=s({},e,{component:l,disableGutters:c,variant:d}),b=mo(u);return i(yo,s({as:l,className:M(b.root,r),ref:t,ownerState:u},p))});var Io=ko;const $o=()=>{const o=K(),a=Q(X),[t,e]=n.exports.useState(null),r=Boolean(t),l=n.exports.useCallback(()=>{o(Z()),e(null)},[]),c=n.exports.useCallback(p=>{e(p.currentTarget)},[]),d=n.exports.useCallback(()=>{e(null)},[]);return a===null?i("p",{children:"Oops, something went wrong."}):m(z,{children:[i(w,{id:"basic-button",color:"inherit",variant:"text","aria-controls":r?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":r?"true":void 0,onClick:c,children:"Dashboard"}),m(S,{id:"basic-menu",anchorEl:t,open:r,onClose:d,MenuListProps:{"aria-labelledby":"basic-button"},children:[i(_,{children:m(V,{variant:"h6",component:"span",children:[a.firstName," ",a.lastName]})}),i(_,{onClick:l,children:"Logout"})]})]})},Bo=n.exports.memo($o),Mo="_header_1yhix_1",To="_headerLogoText_1yhix_5";var G={header:Mo,headerLogoText:To};const ho=()=>i(z,{className:G.header,children:i(so,{position:"static",children:m(Io,{children:[i(V,{variant:"h6",component:"h1",className:G.headerLogoText,children:"Anime Catalog"}),i(Bo,{})]})})}),Do=n.exports.memo(ho);export{Do as H,_ as M,Ro as a,Oo as g,U as l};
