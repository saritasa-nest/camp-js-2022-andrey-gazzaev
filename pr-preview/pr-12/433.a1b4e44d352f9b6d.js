"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[433],{433:(Jt,$,r)=>{r.r($),r.d($,{EditorModule:()=>$t});var j=r(2355),x=r(5472),K=r(3347),t=r(4537),T=r(9638);let k=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-editor"]],decls:4,vars:0,consts:[["mat-button","","title","Go to home page","routerLink","/catalog/",1,"link"],[1,"content"]],template:function(e,i){1&e&&(t.TgZ(0,"a",0),t._uU(1," Home\n"),t.qZA(),t.TgZ(2,"main",1),t._UZ(3,"router-outlet"),t.qZA())},dependencies:[T.zs,x.lC,x.yS],encapsulation:2}),o})();var A=r(4762),C=r(5557),I=r(4970),v=r(1528),F=r(1860),U=r(8168),m=r(7969),G=r(3151),S=r(3072),z=r(3568),V=r(4945),X=r(3787),W=r(5696),tt=r(818),u=r(3804),a=r(92),et=r(5410),nt=r(789),ot=r(4041),it=r(2246),rt=r(5134),st=r(6263),w=r(4121),M=r(7479),P=r(9676),N=r(6892),J=r(4002),O=r(5893),Y=r(5732);let g=class{constructor(n,e){this.http=e,this.nextGenresUrl$=new C.t(1),this.nextGenres$=new C.t(1),this.isSearch$=new w.X(!1),this.genresUrl=new URL("anime/genres/",n.apiCampBaseUrl);const i=this.fetchGenres(this.genresUrl.toString(),""),s=this.nextGenres$.asObservable(),c=(0,F.T)(i,s).pipe((0,M.R)((l,_)=>[...l,..._]));this.currentGenres$=this.isSearch$.pipe((0,v.w)(l=>l?s:c))}fetchGenres(n,e){return this.http.get(n,{params:{search:e}}).pipe((0,m.U)(i=>J.e.fromDto(i,s=>N.U.fromDto(s))),(0,m.U)(i=>(this.nextGenresUrl$.next(i.next),i.results)))}getMoreGenres(){this.nextGenresUrl$.pipe((0,P.P)(),(0,I.h)(n=>null!==n),(0,v.w)(n=>this.fetchGenres(n,"")),(0,m.U)(n=>this.nextGenres$.next(n)),(0,u.t)(this)).subscribe()}findGenresByName(n){null!==n&&0!==n.length?this.fetchGenres(this.genresUrl.toString(),n).pipe((0,U.b)(()=>this.isSearch$.next(!0)),(0,m.U)(e=>this.nextGenres$.next(e)),(0,u.t)(this)).subscribe():this.isSearch$.next(!1)}createGenre(n){if(null===n)return;const e=N.U.toDto(n);this.http.post(this.genresUrl.toString(),e).pipe((0,m.U)(i=>N.U.fromDto(i)),(0,m.U)(i=>this.nextGenres$.next([i])),(0,u.t)(this)).subscribe()}deleteGenre(n){this.http.delete(`${this.genresUrl.toString()}${n}/`).pipe((0,u.t)(this)).subscribe()}addGenres(n){this.nextGenres$.next(n)}};g.\u0275fac=function(n){return new(n||g)(t.LFG(O._),t.LFG(Y.eN))},g.\u0275prov=t.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g=(0,A.gn)([(0,u.c)()],g);var b=r(5256);let f=class{constructor(n,e){this.http=e,this.nextStudiosUrl$=new C.t(1),this.nextStudios$=new C.t(1),this.isSearch$=new w.X(!1),this.studiosUrl=new URL("anime/studios/",n.apiCampBaseUrl);const i=this.fetchStudios(this.studiosUrl.toString(),""),s=this.nextStudios$.asObservable(),c=(0,F.T)(i,s).pipe((0,M.R)((l,_)=>[...l,..._]));this.currentStudios$=this.isSearch$.pipe((0,v.w)(l=>l?s:c))}fetchStudios(n,e){return this.http.get(n,{params:{search:e}}).pipe((0,m.U)(i=>J.e.fromDto(i,s=>b.B.fromDto(s))),(0,m.U)(i=>(this.nextStudiosUrl$.next(i.next),i.results)))}getMoreStudios(){this.nextStudiosUrl$.pipe((0,P.P)(),(0,I.h)(n=>null!==n),(0,v.w)(n=>this.fetchStudios(n,"")),(0,m.U)(n=>this.nextStudios$.next(n)),(0,u.t)(this)).subscribe()}findStudiosByName(n){null!==n&&0!==n.length?this.fetchStudios(this.studiosUrl.toString(),n).pipe((0,U.b)(()=>this.isSearch$.next(!0)),(0,m.U)(e=>this.nextStudios$.next(e)),(0,u.t)(this)).subscribe():this.isSearch$.next(!1)}createStudio(n){if(null===n)return;const e=b.B.toDto(n);this.http.post(this.studiosUrl.toString(),e).pipe((0,m.U)(i=>b.B.fromDto(i)),(0,m.U)(i=>this.nextStudios$.next([i])),(0,u.t)(this)).subscribe()}deleteStudio(n){this.http.delete(`${this.studiosUrl.toString()}${n}/`).pipe((0,u.t)(this)).subscribe()}addStudios(n){this.nextStudios$.next(n)}};f.\u0275fac=function(n){return new(n||f)(t.LFG(O._),t.LFG(Y.eN))},f.\u0275prov=t.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),f=(0,A.gn)([(0,u.c)()],f);var E=r(8692),at=r(6438),Q=r(3331),y=r(1997),d=r(8659),lt=r(9665),Z=r(3704),ct=r(4639),B=r(8377),mt=r(8697),D=r(8033),R=r(1379);function ut(o,n){if(1&o&&(t.TgZ(0,"mat-option",3),t._uU(1),t.qZA()),2&o){const e=n.$implicit;t.Q6J("value",e),t.xp6(1),t.hij(" ",e," ")}}let pt=(()=>{class o{constructor(){this.label="",this.formControlSelect=new a.NI(""),this.collection=[],this.trackItemItem=function(e,i){return i}}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-simple-select"]],inputs:{label:"label",formControlSelect:"formControlSelect",collection:"collection"},decls:5,vars:4,consts:[["appearance","fill"],[3,"formControl"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"],[3,"value"]],template:function(e,i){1&e&&(t.TgZ(0,"mat-form-field",0)(1,"mat-label"),t._uU(2),t.qZA(),t.TgZ(3,"mat-select",1),t.YNc(4,ut,2,2,"mat-option",2),t.qZA()()),2&e&&(t.xp6(2),t.Oqu(i.label),t.xp6(1),t.Q6J("formControl",i.formControlSelect),t.xp6(1),t.Q6J("ngForOf",i.collection)("ngForTrackBy",i.trackItemItem))},dependencies:[a.JJ,E.sg,d.KE,d.hX,D.gD,R.ey,a.oH],encapsulation:2,changeDetection:0}),o})();var dt=r(4325);let gt=(()=>{class o{onClick(e){e.stopPropagation()}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275dir=t.lG2({type:o,selectors:[["","click-stop-propagation",""]],hostBindings:function(e,i){1&e&&t.NdJ("click",function(c){return i.onClick(c)})}}),o})();function ft(o,n){if(1&o){const e=t.EpF();t.ynx(0),t.TgZ(1,"button",5),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.onCreateEntity())}),t._uU(2),t.qZA(),t.BQk()}if(2&o){const e=t.oxw();t.xp6(2),t.hij(" Create ",e.entitiesName," ")}}function ht(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div",6)(1,"mat-option",7)(2,"span"),t._uU(3),t.qZA()(),t.TgZ(4,"button",8),t.NdJ("click",function(){const c=t.CHM(e).$implicit,l=t.oxw();return t.KtG(l.onRemoveEntity(c.id))}),t.TgZ(5,"mat-icon"),t._uU(6,"delete"),t.qZA()()()}if(2&o){const e=n.$implicit;t.xp6(1),t.Q6J("value",e.id),t.xp6(2),t.Oqu(e.name)}}function _t(o,n){if(1&o){const e=t.EpF();t.ynx(0),t.TgZ(1,"button",5),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.onMoreEntities())}),t._uU(2),t.qZA(),t.BQk()}if(2&o){const e=t.oxw();t.xp6(2),t.hij(" Add more ",e.entitiesName," ")}}let vt=(()=>{class o{constructor(){this.entities=[],this.selectorLabel="",this.entitiesName="",this.formControlEntities=new a.NI([]),this.formControlSearchEntity=new a.NI(""),this.createEntity=new t.vpe,this.removeEntity=new t.vpe,this.moreEntities=new t.vpe,this.trackItemEntity=function(e,i){return i.id}}onCreateEntity(){this.createEntity.emit()}onRemoveEntity(e){this.removeEntity.emit(e)}onMoreEntities(){this.moreEntities.emit()}isStringEmpty(e){return null===e||0===e.length}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-entity-select"]],inputs:{entities:"entities",selectorLabel:"selectorLabel",entitiesName:"entitiesName",formControlEntities:"formControlEntities",formControlSearchEntity:"formControlSearchEntity"},outputs:{createEntity:"createEntity",removeEntity:"removeEntity",moreEntities:"moreEntities"},decls:9,vars:8,consts:[["appearance","fill"],["multiple","",3,"formControl"],[3,"placeholderLabel","formControl"],[4,"ngIf"],["class","option",4,"ngFor","ngForOf","ngForTrackBy"],["mat-stroked-button","","type","button",3,"click"],[1,"option"],[3,"value"],["mat-button","","type","button","click-stop-propagation","",3,"click"]],template:function(e,i){1&e&&(t.TgZ(0,"mat-form-field",0)(1,"mat-label"),t._uU(2),t.qZA(),t.TgZ(3,"mat-select",1)(4,"mat-option"),t._UZ(5,"ngx-mat-select-search",2),t.qZA(),t.YNc(6,ft,3,1,"ng-container",3),t.YNc(7,ht,7,2,"div",4),t.YNc(8,_t,3,1,"ng-container",3),t.qZA()()),2&e&&(t.xp6(2),t.Oqu(i.selectorLabel),t.xp6(1),t.Q6J("formControl",i.formControlEntities),t.xp6(2),t.Q6J("placeholderLabel","Find "+i.entitiesName+"...")("formControl",i.formControlSearchEntity),t.xp6(1),t.Q6J("ngIf",0===i.entities.length),t.xp6(1),t.Q6J("ngForOf",i.entities)("ngForTrackBy",i.trackItemEntity),t.xp6(1),t.Q6J("ngIf",i.isStringEmpty(i.formControlSearchEntity.value)))},dependencies:[a.JJ,E.sg,E.O5,Q.Hw,d.KE,d.hX,D.gD,R.ey,T.lW,a.oH,dt.nu,gt],styles:[".option[_ngcontent-%COMP%]{display:flex;justify-content:space-between}"]}),o})();function St(o,n){if(1&o&&(t.TgZ(0,"span",5),t._uU(1),t.qZA()),2&o){const e=n.text;t.xp6(1),t.Oqu(e)}}function xt(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div",42),t._UZ(1,"img",43),t.TgZ(2,"button",44),t.NdJ("click",function(){t.CHM(e);const s=t.oxw(4);return t.KtG(s.onRemoveCurrentPoster())}),t.TgZ(3,"mat-icon"),t._uU(4,"delete"),t.qZA()()()}if(2&o){const e=n.ngIf;t.xp6(1),t.Q6J("src",e,t.LSH)}}function Ct(o,n){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const e=t.oxw(4);t.xp6(1),t.hij(" ",e.animeForm.controls.image.getError("imageServe")," ")}}function Et(o,n){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const e=t.oxw(4);t.xp6(1),t.hij(" ",e.animeForm.controls.trailerYoutubeId.getError("trailerYoutubeIdServe")," ")}}function yt(o,n){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const e=t.oxw(4);t.xp6(1),t.hij(" ",e.animeForm.controls.titleEnglish.getError("titleEnglishServe")," ")}}function Zt(o,n){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const e=t.oxw(4);t.xp6(1),t.hij(" ",e.animeForm.controls.titleJapanese.getError("titleJapaneseServe")," ")}}function Ft(o,n){if(1&o){const e=t.EpF();t.ynx(0),t.TgZ(1,"form",6),t.NdJ("ngSubmit",function(){t.CHM(e);const s=t.oxw(3);return t.KtG(s.onFormSubmit())}),t.TgZ(2,"mat-card-title")(3,"h1",7),t._uU(4,"Anime editor"),t.qZA()(),t._UZ(5,"mat-divider",8),t.TgZ(6,"mat-card-subtitle")(7,"h2",9),t._uU(8,"Base information"),t.qZA()(),t.TgZ(9,"mat-card-content",10),t.YNc(10,xt,5,1,"div",11),t.ALo(11,"async"),t.TgZ(12,"mat-form-field",12)(13,"ngx-mat-file-input",13)(14,"mat-icon",14),t._uU(15,"folder"),t.qZA()(),t.YNc(16,Ct,2,1,"mat-error",15),t.qZA(),t.TgZ(17,"div",16)(18,"mat-form-field",17)(19,"mat-label"),t._uU(20,"Enter trailer youtube id"),t.qZA(),t._UZ(21,"input",18),t.YNc(22,Et,2,1,"mat-error",15),t.qZA(),t.TgZ(23,"mat-form-field",17)(24,"mat-label"),t._uU(25,"Title in English"),t.qZA(),t._UZ(26,"input",19),t.YNc(27,yt,2,1,"mat-error",15),t.qZA(),t.TgZ(28,"mat-form-field",17)(29,"mat-label"),t._uU(30,"Title in Japanese"),t.qZA(),t._UZ(31,"input",20),t.YNc(32,Zt,2,1,"mat-error",15),t.qZA()(),t.TgZ(33,"mat-form-field",17)(34,"mat-label"),t._uU(35,"Synopsis"),t.qZA(),t._UZ(36,"textarea",21),t.qZA()(),t._UZ(37,"mat-divider",8),t.TgZ(38,"mat-card-subtitle")(39,"h2",9),t._uU(40,"Status information"),t.qZA()(),t.TgZ(41,"mat-card-content",22)(42,"div",23),t._UZ(43,"app-simple-select",24)(44,"app-simple-select",25)(45,"app-simple-select",26)(46,"app-simple-select",27)(47,"app-simple-select",28),t.qZA(),t.TgZ(48,"div",29)(49,"mat-form-field",30)(50,"mat-label"),t._uU(51,"Anime airing"),t.qZA(),t.TgZ(52,"mat-date-range-input",31),t._UZ(53,"input",32)(54,"input",33),t.qZA(),t.TgZ(55,"mat-hint"),t._uU(56,"MM/DD/YYYY \u2013 MM/DD/YYYY"),t.qZA(),t._UZ(57,"mat-datepicker-toggle",34)(58,"mat-date-range-picker",null,35),t.qZA(),t.TgZ(60,"mat-slide-toggle",36),t._uU(61," Airing "),t.qZA()()(),t._UZ(62,"mat-divider",8),t.TgZ(63,"mat-card-subtitle")(64,"h2",9),t._uU(65,"More information"),t.qZA()(),t.TgZ(66,"mat-card-content",37)(67,"app-entity-select",38),t.NdJ("createEntity",function(){t.CHM(e);const s=t.oxw(3);return t.KtG(s.onCreateGenre())})("moreEntities",function(){t.CHM(e);const s=t.oxw(3);return t.KtG(s.onMoreGenres())})("removeEntity",function(s){t.CHM(e);const c=t.oxw(3);return t.KtG(c.onRemoveGenre(s))}),t.qZA(),t.TgZ(68,"app-entity-select",39),t.NdJ("createEntity",function(){t.CHM(e);const s=t.oxw(3);return t.KtG(s.onCreateStudio())})("moreEntities",function(){t.CHM(e);const s=t.oxw(3);return t.KtG(s.onMoreStudios())})("removeEntity",function(s){t.CHM(e);const c=t.oxw(3);return t.KtG(c.onRemoveStudio(s))}),t.qZA()(),t._UZ(69,"mat-divider"),t.TgZ(70,"mat-card-actions",40)(71,"button",41),t._uU(72),t.qZA()()(),t.BQk()}if(2&o){const e=n.ngIf,i=t.MAs(59),s=t.oxw().ngIf,c=t.oxw().ngIf,l=t.oxw();t.xp6(1),t.Q6J("formGroup",l.animeForm),t.xp6(9),t.Q6J("ngIf",t.lcZ(11,27,l.currentPosterPreview$)),t.xp6(3),t.Q6J("accept","image/png, image/jpeg"),t.xp6(3),t.Q6J("ngIf",l.animeForm.controls.image.hasError("imageServe")),t.xp6(6),t.Q6J("ngIf",l.animeForm.controls.trailerYoutubeId.hasError("trailerYoutubeIdServe")),t.xp6(5),t.Q6J("ngIf",l.animeForm.controls.titleEnglish.hasError("titleEnglishServe")),t.xp6(5),t.Q6J("ngIf",l.animeForm.controls.titleJapanese.hasError("titleJapaneseServe")),t.xp6(11),t.Q6J("formControlSelect",l.animeForm.controls.type)("collection",e.types),t.xp6(1),t.Q6J("formControlSelect",l.animeForm.controls.status)("collection",e.statuses),t.xp6(1),t.Q6J("formControlSelect",l.animeForm.controls.source)("collection",e.sources),t.xp6(1),t.Q6J("formControlSelect",l.animeForm.controls.season)("collection",e.seasons),t.xp6(1),t.Q6J("formControlSelect",l.animeForm.controls.rating)("collection",e.ratings),t.xp6(5),t.Q6J("rangePicker",i)("formGroup",l.animeForm.controls.aired),t.xp6(5),t.Q6J("for",i),t.xp6(10),t.Q6J("entities",c)("formControlEntities",l.animeForm.controls.genres)("formControlSearchEntity",l.animeForm.controls.genresSearch),t.xp6(1),t.Q6J("entities",s)("formControlEntities",l.animeForm.controls.studios)("formControlSearchEntity",l.animeForm.controls.studiosSearch),t.xp6(4),t.hij(" ",l.isEditAnime?"Save anime":"Create a new anime entry"," ")}}function Tt(o,n){if(1&o&&(t.ynx(0),t.YNc(1,Ft,73,29,"ng-container",2),t.ALo(2,"async"),t.BQk()),2&o){const e=t.oxw(2),i=t.MAs(6);t.xp6(1),t.Q6J("ngIf",t.lcZ(2,2,e.statusInformation$))("ngIfElse",i)}}function At(o,n){if(1&o&&(t.ynx(0),t.YNc(1,Tt,3,4,"ng-container",2),t.ALo(2,"async"),t.BQk()),2&o){const e=t.oxw(),i=t.MAs(6);t.xp6(1),t.Q6J("ngIf",t.lcZ(2,2,e.studios$))("ngIfElse",i)}}function It(o,n){1&o&&(t.TgZ(0,"div",45),t._UZ(1,"mat-spinner",46),t.qZA())}function Ut(o,n){1&o&&t._UZ(0,"span")}let h=class{constructor(n,e,i,s,c,l){this.route=n,this.urlService=e,this.animeService=i,this.genreService=s,this.studioService=c,this.changeDetectorRef=l,this.genres$=this.genreService.currentGenres$,this.studios$=this.studioService.currentStudios$,this.isEditAnime=!1,this.posterPreview$=new C.t(1),this.animeForm=this.initAnimeForm();const _=this.animeForm.controls.image.valueChanges.pipe((0,I.h)(p=>null!==p),(0,v.w)(p=>this.previewPoster(p)));this.currentPosterPreview$=(0,F.T)(this.posterPreview$,_),this.statusInformation$=this.getStatusInformation()}ngOnInit(){const n=this.route.snapshot.params.id;void 0!==n?this.animeService.fetchAnimeEditor(n).pipe((0,U.b)(c=>{this.isEditAnime=!0,this.setInitValuesToAnimeForm(c),this.genreService.addGenres(c.genresData),this.studioService.addStudios(c.studiosData)})).pipe((0,m.U)(c=>c.image),(0,m.U)(c=>this.posterPreview$.next(c)),(0,u.t)(this)).subscribe():this.posterPreview$.next(null);const e=this.animeForm.controls.genresSearch.valueChanges.pipe((0,G.b)(500),(0,m.U)(s=>this.genreService.findGenresByName(s)),(0,u.t)(this)),i=this.animeForm.controls.studiosSearch.valueChanges.pipe((0,G.b)(500),(0,m.U)(s=>this.studioService.findStudiosByName(s)),(0,u.t)(this));(0,F.T)(e,i).subscribe()}onFormSubmit(){if(this.animeForm.markAllAsTouched(),this.animeForm.invalid)return;const n=this.getAnimeInformation();if(null===n)return;const{image:e,aired:i}=this.animeForm.getRawValue(),s={id:this.route.snapshot.params.id,information:n,aired:new nt.C({...i})};(function q(o,n,e){return(0,S.P)(()=>o()?n:e)})(()=>null!==e,this.animeService.savePoster(e).pipe((0,v.w)(p=>this.animeService.saveAnime({...s,posterUrl:p}))),this.currentPosterPreview$.pipe((0,v.w)(p=>this.animeService.saveAnime({...s,posterUrl:p})))).pipe((0,m.U)(p=>this.urlService.navigateToDetails(p)),(0,u.t)(this),(0,z.K)(p=>p instanceof et.g?(0,V.of)(this.setErrors(p)):(0,X._)(()=>p))).subscribe()}onMoreGenres(){this.genreService.getMoreGenres()}onCreateGenre(){this.genreService.createGenre(this.animeForm.controls.genresSearch.value)}onRemoveGenre(n){this.genreService.deleteGenre(n);const e=this.animeForm.controls.genres.value;null!==e&&this.animeForm.controls.genres.setValue(e.filter(i=>i!==n)),this.animeForm.controls.genresSearch.setValue("")}onMoreStudios(){this.studioService.getMoreStudios()}onCreateStudio(){this.studioService.createStudio(this.animeForm.controls.studiosSearch.value)}onRemoveStudio(n){this.studioService.deleteStudio(n);const e=this.animeForm.controls.studios.value;null!==e&&this.animeForm.controls.studios.setValue(e.filter(i=>i!==n)),this.animeForm.controls.studiosSearch.setValue("")}onRemoveCurrentPoster(){this.posterPreview$.next(null),this.animeForm.controls.image.setValue(null)}getAnimeInformation(){const{genres:n,isAiring:e,rating:i,season:s,source:c,status:l,studios:_,synopsis:p,titleEnglish:Gt,titleJapanese:wt,trailerYoutubeId:Mt,type:Pt}=this.animeForm.getRawValue(),H={rating:i,season:s,source:c,status:l,type:Pt};return(0,ot.jP)(H)?{...H,trailerYoutubeId:Mt,studios:_,synopsis:p,titleEnglish:Gt,titleJapanese:wt,genres:n,isAiring:e}:null}setErrors(n){(0,it.Z)(n,this.animeForm),this.changeDetectorRef.markForCheck()}setInitValuesToAnimeForm(n){this.animeForm.patchValue({...n,image:null,genresSearch:"",studiosSearch:""})}initAnimeForm(){return new a.cw({image:new a.NI(null),trailerYoutubeId:new a.NI(null),titleEnglish:new a.NI("",{nonNullable:!0}),titleJapanese:new a.NI("",{nonNullable:!0}),synopsis:new a.NI("",{validators:a.kI.required,nonNullable:!0}),type:new a.NI(null,{validators:a.kI.required}),status:new a.NI(null,{validators:a.kI.required}),source:new a.NI(null,{validators:a.kI.required}),rating:new a.NI(null,{validators:a.kI.required}),season:new a.NI(null,{validators:a.kI.required}),isAiring:new a.NI(!1,{nonNullable:!0}),genres:new a.NI([],{validators:a.kI.required,nonNullable:!0}),studios:new a.NI([],{validators:a.kI.required,nonNullable:!0}),genresSearch:new a.NI("",{validators:a.kI.required,nonNullable:!0}),studiosSearch:new a.NI("",{validators:a.kI.required,nonNullable:!0}),aired:new a.cw({start:new a.NI(null),end:new a.NI(null)})})}getStatusInformation(){return(0,W.a)([(0,S.P)(()=>this.animeService.getAnimeTypes()),(0,S.P)(()=>this.animeService.getAnimeStatus()),(0,S.P)(()=>this.animeService.getSeason()),(0,S.P)(()=>this.animeService.getRating()),(0,S.P)(()=>this.animeService.getSource())]).pipe((0,m.U)(([n,e,i,s,c])=>({types:n,statuses:e,seasons:i,ratings:s,sources:c})))}previewPoster(n){const e=new FileReader;return e.readAsDataURL(n),new tt.y(i=>{e.onload=()=>{const s=e.result instanceof ArrayBuffer?null:e.result;i.next(s),i.complete()}})}};h.\u0275fac=function(n){return new(n||h)(t.Y36(x.gz),t.Y36(rt.i),t.Y36(st.o),t.Y36(g),t.Y36(f),t.Y36(t.sBO))},h.\u0275cmp=t.Xpm({type:h,selectors:[["app-editor-form"]],decls:9,vars:4,consts:[[1,"editor__container"],["tpl",""],[4,"ngIf","ngIfElse"],["loading",""],["notEdit",""],[1,"control-error"],[1,"editor",3,"formGroup","ngSubmit"],[1,"mat-headline","editor__container"],[1,"editor__divider"],[1,"mat-title"],[1,"base-information"],["class","image-action",4,"ngIf"],["appearance","fill"],["formControlName","image","color","primary",3,"accept"],["ngxMatFileInputIcon",""],[4,"ngIf"],[1,"base-information__input-fields"],["appearance","fill",1,"base-information__field"],["matInput","","placeholder","1dy2zPPrKD0","formControlName","trailerYoutubeId"],["matInput","","placeholder","Naruto Shippuden","formControlName","titleEnglish"],["matInput","","placeholder","\u30ca\u30eb\u30c8- \u75be\u98a8\u4f1d","formControlName","titleJapanese"],["matInput","","placeholder","Anime about ...","formControlName","synopsis",1,"synopsis"],[1,"status-information"],[1,"status-information__select-fields"],["label","Type",1,"status-information__field",3,"formControlSelect","collection"],["label","Status",1,"status-information__field",3,"formControlSelect","collection"],["label","Source",1,"status-information__field",3,"formControlSelect","collection"],["label","Season",1,"status-information__field",3,"formControlSelect","collection"],["label","Rating",1,"status-information__field",3,"formControlSelect","collection"],[1,"status-information__aired-fields"],["appearance","fill",1,"status-information__field"],[3,"rangePicker","formGroup"],["matStartDate","","placeholder","Start date","formControlName","start"],["matEndDate","","placeholder","End date","formControlName","end"],["matSuffix","",3,"for"],["airedPicker",""],["formControlName","isAiring",1,"status-information__field"],[1,"more-information"],["selectorLabel","Genres","entitiesName","genres",1,"more-information__field",3,"entities","formControlEntities","formControlSearchEntity","createEntity","moreEntities","removeEntity"],["selectorLabel","Studios","entitiesName","studios",1,"more-information__field",3,"entities","formControlEntities","formControlSearchEntity","createEntity","moreEntities","removeEntity"],[1,"editor__container","buttons"],["mat-stroked-button","","type","submit"],[1,"image-action"],["alt","Poster preview",1,"base-information__image",3,"src"],["mat-button","","type","button",3,"click"],[1,"loading"],[1,"loading__spinner"]],template:function(n,e){if(1&n&&(t.TgZ(0,"mat-card",0),t.YNc(1,St,2,1,"ng-template",null,1,t.W1O),t.YNc(3,At,3,4,"ng-container",2),t.ALo(4,"async"),t.qZA(),t.YNc(5,It,2,0,"ng-template",null,3,t.W1O),t.YNc(7,Ut,1,0,"ng-template",null,4,t.W1O)),2&n){const i=t.MAs(6);t.xp6(3),t.Q6J("ngIf",t.lcZ(4,2,e.genres$))("ngIfElse",i)}},dependencies:[a._Y,a.Fj,a.JJ,a.JL,E.O5,at.d,Q.Hw,y.a8,y.dn,y.n5,y.$j,y.hq,d.TO,d.KE,d.bx,d.hX,d.R9,lt.Nt,T.lW,Z.nW,Z.wx,Z.zY,Z.By,Z._g,a.sg,a.u,ct.Rr,B.v6,B.qb,mt.Ou,pt,vt,E.Ov],styles:[".editor__container[_ngcontent-%COMP%]{margin:20px auto;max-width:var(--default-max-width-container)}.base-information[_ngcontent-%COMP%]{display:flex;flex-direction:column}.base-information__image[_ngcontent-%COMP%]{max-width:300px}.base-information__input-fields[_ngcontent-%COMP%] > .base-information__field[_ngcontent-%COMP%], .status-information__aired-fields[_ngcontent-%COMP%] > .status-information__field[_ngcontent-%COMP%], .more-information__field[_ngcontent-%COMP%]{margin-right:20px}.synopsis[_ngcontent-%COMP%]{min-height:150px;resize:none}.status-information[_ngcontent-%COMP%]{display:flex;flex-direction:column}.status-information__select-fields[_ngcontent-%COMP%]{display:flex;flex-flow:row wrap;align-content:flex-start}.status-information__select-fields[_ngcontent-%COMP%] > .status-information__field[_ngcontent-%COMP%]{margin-right:50px}.status-information__aired-fields[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap}.buttons[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.editor__divider[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:10px}.loading__spinner[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto}.image-action[_ngcontent-%COMP%]{display:flex}"],changeDetection:0}),h=(0,A.gn)([(0,u.c)()],h);const Nt=[{path:"",component:k,canActivate:[K.T],children:[{path:"",component:h},{path:":id",component:h}]}];let bt=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[x.Bz.forChild(Nt),x.Bz]}),o})(),$t=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[j.m,bt]}),o})()}}]);