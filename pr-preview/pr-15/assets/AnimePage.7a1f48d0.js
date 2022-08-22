import{c as j,j as o,g as W,a as z,s as y,_ as n,r as d,u as T,b as R,d as w,e as N,f as E,L as B,T as v,h as u,i as V,k,F as _,l as H,m as S,n as q,o as J,B as M,p as X}from"./index.f29c25a7.js";import{g as Y,l as F,a as G,H as K}from"./Header.1cf719af.js";import{c as O}from"./createContainer.ef46c8a2.js";const Q=O();var Z=Q,tt=j(o("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function et(t){return W("MuiAvatar",t)}z("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const at=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],rt=t=>{const{classes:e,variant:a,colorDefault:r}=t;return N({root:["root",a,r&&"colorDefault"],img:["img"],fallback:["fallback"]},et,e)},ot=y("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.colorDefault&&e.colorDefault]}})(({theme:t,ownerState:e})=>n({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.variant==="square"&&{borderRadius:0},e.colorDefault&&n({color:(t.vars||t).palette.background.default},t.vars?{backgroundColor:t.vars.palette.Avatar.defaultBg}:{backgroundColor:t.palette.mode==="light"?t.palette.grey[400]:t.palette.grey[600]}))),it=y("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(t,e)=>e.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),nt=y(tt,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(t,e)=>e.fallback})({width:"75%",height:"75%"});function st({crossOrigin:t,referrerPolicy:e,src:a,srcSet:r}){const[c,l]=d.exports.useState(!1);return d.exports.useEffect(()=>{if(!a&&!r)return;l(!1);let s=!0;const i=new Image;return i.onload=()=>{!s||l("loaded")},i.onerror=()=>{!s||l("error")},i.crossOrigin=t,i.referrerPolicy=e,i.src=a,r&&(i.srcset=r),()=>{s=!1}},[t,e,a,r]),c}const lt=d.exports.forwardRef(function(e,a){const r=T({props:e,name:"MuiAvatar"}),{alt:c,children:l,className:s,component:i="div",imgProps:g,sizes:b,src:x,srcSet:h,variant:C="circular"}=r,A=R(r,at);let p=null;const m=st(n({},g,{src:x,srcSet:h})),f=x||h,I=f&&m!=="error",$=n({},r,{colorDefault:!I,component:i,variant:C}),P=rt($);return I?p=o(it,n({alt:c,src:x,srcSet:h,sizes:b,ownerState:$,className:P.img},g)):l!=null?p=l:f&&c?p=c[0]:p=o(nt,{className:P.fallback}),o(ot,n({as:i,ownerState:$,className:w(P.root,s),ref:a},A,{children:p}))});var ct=lt;const dt=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],pt=t=>{const{absolute:e,children:a,classes:r,flexItem:c,light:l,orientation:s,textAlign:i,variant:g}=t;return N({root:["root",e&&"absolute",g,l&&"light",s==="vertical"&&"vertical",c&&"flexItem",a&&"withChildren",a&&s==="vertical"&&"withChildrenVertical",i==="right"&&s!=="vertical"&&"textAlignRight",i==="left"&&s!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",s==="vertical"&&"wrapperVertical"]},Y,r)},mt=y("div",{name:"MuiDivider",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,a.absolute&&e.absolute,e[a.variant],a.light&&e.light,a.orientation==="vertical"&&e.vertical,a.flexItem&&e.flexItem,a.children&&e.withChildren,a.children&&a.orientation==="vertical"&&e.withChildrenVertical,a.textAlign==="right"&&a.orientation!=="vertical"&&e.textAlignRight,a.textAlign==="left"&&a.orientation!=="vertical"&&e.textAlignLeft]}})(({theme:t,ownerState:e})=>n({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},e.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},e.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:E(t.palette.divider,.08)},e.variant==="inset"&&{marginLeft:72},e.variant==="middle"&&e.orientation==="horizontal"&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},e.variant==="middle"&&e.orientation==="vertical"&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},e.orientation==="vertical"&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},e.flexItem&&{alignSelf:"stretch",height:"auto"}),({theme:t,ownerState:e})=>n({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`,top:"50%",content:'""',transform:"translateY(50%)"}}),({theme:t,ownerState:e})=>n({},e.children&&e.orientation==="vertical"&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:`thin solid ${(t.vars||t).palette.divider}`,transform:"translateX(0%)"}}),({ownerState:t})=>n({},t.textAlign==="right"&&t.orientation!=="vertical"&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},t.textAlign==="left"&&t.orientation!=="vertical"&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),gt=y("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.wrapper,a.orientation==="vertical"&&e.wrapperVertical]}})(({theme:t,ownerState:e})=>n({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},e.orientation==="vertical"&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`})),vt=d.exports.forwardRef(function(e,a){const r=T({props:e,name:"MuiDivider"}),{absolute:c=!1,children:l,className:s,component:i=l?"div":"hr",flexItem:g=!1,light:b=!1,orientation:x="horizontal",role:h=i!=="hr"?"separator":void 0,textAlign:C="center",variant:A="fullWidth"}=r,p=R(r,dt),m=n({},r,{absolute:c,component:i,flexItem:g,light:b,orientation:x,role:h,textAlign:C,variant:A}),f=pt(m);return o(mt,n({as:i,className:w(f.root,s),role:h,ref:a,ownerState:m},p,{children:l?o(gt,{className:f.wrapper,ownerState:m,children:l}):null}))});var ut=vt;function ht(t){return W("MuiListItemAvatar",t)}z("MuiListItemAvatar",["root","alignItemsFlexStart"]);const ft=["className"],xt=t=>{const{alignItems:e,classes:a}=t;return N({root:["root",e==="flex-start"&&"alignItemsFlexStart"]},ht,a)},yt=y("div",{name:"MuiListItemAvatar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,a.alignItems==="flex-start"&&e.alignItemsFlexStart]}})(({ownerState:t})=>n({minWidth:56,flexShrink:0},t.alignItems==="flex-start"&&{marginTop:8})),bt=d.exports.forwardRef(function(e,a){const r=T({props:e,name:"MuiListItemAvatar"}),{className:c}=r,l=R(r,ft),s=d.exports.useContext(B),i=n({},r,{alignItems:s.alignItems}),g=xt(i);return o(yt,n({className:w(g.root,c),ownerState:i,ref:a},l))});var At=bt;const It=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],Ct=t=>{const{classes:e,inset:a,primary:r,secondary:c,dense:l}=t;return N({root:["root",a&&"inset",l&&"dense",r&&c&&"multiline"],primary:["primary"],secondary:["secondary"]},G,e)},Lt=y("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[{[`& .${F.primary}`]:e.primary},{[`& .${F.secondary}`]:e.secondary},e.root,a.inset&&e.inset,a.primary&&a.secondary&&e.multiline,a.dense&&e.dense]}})(({ownerState:t})=>n({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},t.primary&&t.secondary&&{marginTop:6,marginBottom:6},t.inset&&{paddingLeft:56})),Tt=d.exports.forwardRef(function(e,a){const r=T({props:e,name:"MuiListItemText"}),{children:c,className:l,disableTypography:s=!1,inset:i=!1,primary:g,primaryTypographyProps:b,secondary:x,secondaryTypographyProps:h}=r,C=R(r,It),{dense:A}=d.exports.useContext(B);let p=g??c,m=x;const f=n({},r,{disableTypography:s,inset:i,primary:!!p,secondary:!!m,dense:A}),I=Ct(f);return p!=null&&p.type!==v&&!s&&(p=o(v,n({variant:A?"body2":"body1",className:I.primary,component:"span",display:"block"},b,{children:p}))),m!=null&&m.type!==v&&!s&&(m=o(v,n({variant:"body2",className:I.secondary,color:"text.secondary",display:"block"},h,{children:m}))),u(Lt,n({className:w(I.root,l),ownerState:f,ref:a},C,{children:[p,m]}))});var Rt=Tt;const{selectAll:wt}=V.getSelectors(),Nt=k(t=>wt(t.anime),t=>t),_t=k(t=>t.anime.isLoading,t=>t);k(t=>t.anime.isAll,t=>t);const $t="_itemPoster_1l9wg_1",Pt="_poster_1l9wg_9";var U={itemPoster:$t,poster:Pt};function L(t,e="-"){return t!==null&&t!==""?t:e}const Dt=({titleEnglish:t,titleJapanese:e})=>u(_,{children:[o(v,{component:"p",variant:"subtitle1",color:"text.primary",children:L(t)}),o(v,{component:"p",variant:"subtitle2",color:"text.primary",children:L(e)})]}),kt=d.exports.memo(Dt),Mt=({status:t,type:e})=>u(_,{children:[u(v,{component:"p",variant:"body2",color:"text.primary",children:["Type: ",L(e)]}),u(v,{component:"p",variant:"body2",color:"text.primary",children:["Status: ",L(t)]})]}),St=d.exports.memo(Mt),Ft=({anime:t})=>u(H,{disablePadding:!0,children:[o(At,{className:U.itemPoster,children:o(ct,{alt:`Anime poster - ${t.imageTitle}`,src:t.image,className:U.poster})}),o(Rt,{primary:o(kt,{titleEnglish:t.titleEnglish,titleJapanese:t.titleJapanese}),secondary:o(St,{status:t.status,type:t.type})})]}),Ut=d.exports.memo(Ft),Wt="_animeList_yhxi1_1",zt="_animeCatalogTitle_yhxi1_5",Bt="_animeCatalog_yhxi1_5";var D={animeList:Wt,animeCatalogTitle:zt,animeCatalog:Bt};const jt=()=>{const t=S(Nt),e=S(_t),a=q();return d.exports.useEffect(()=>{t.length===0&&a(J())},[a,t]),e?o("span",{children:"Anime loading"}):u(M,{className:D.animeCatalog,children:[o(v,{id:"anime-list-catalog",component:"h2",variant:"body1",className:D.animeCatalogTitle,children:"Catalog"}),o(X,{"aria-labelledby":"anime-list-catalog",className:D.animeList,children:t.map(r=>u(_,{children:[o(Ut,{anime:r},r.id),o(ut,{variant:"inset",component:"li"})]}))})]})},Et=d.exports.memo(jt),Vt=()=>o(Z,{children:o(M,{children:o(v,{component:"h2",variant:"h4",children:"Please select an anime"})})}),Ht=d.exports.memo(Vt),qt="_content_1f1zh_1";var Jt={content:qt};const Xt=()=>u(_,{children:[o(K,{}),u(M,{className:Jt.content,children:[o(Et,{}),o(Ht,{})]})]}),Ot=d.exports.memo(Xt);export{Ot as AnimePage};
