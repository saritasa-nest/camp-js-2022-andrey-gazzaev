"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[806],{9806:(Or,w,s)=>{s.r(w),s.d(w,{AuthModule:()=>Ar});var r=s(4537),m=s(8692),A=s(4581),M=s(8023),g=s(9018),O=s(1860),X=s(818),W=s(408);const P=new X.y(W.Z);var d=s(8168),S=s(6466),rr=s(2147),b=s(1927),I=s(1528),D=s(116),R=s(3528),i=s(92);function tr(o,n){if(1&o&&(r.TgZ(0,"label",2),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.ekj("hide-control",t.hideError),r.xp6(1),r.Oqu(t.errorText)}}function or(o,n){}function nr(o,n){1&o&&r.YNc(0,or,0,0,"ng-template")}let N=(()=>{class o{constructor(t,e){this.cdr=t,this.host=e,this.errorText=null,this.hideError=!0}createTemplate(t,e,a){this.errorTemplate=t,this.errorContext={$implicit:e,text:a},this.cdr.markForCheck()}set customClass(t){const e=Array.isArray(t)?t:t.split(/\s/);this.host.nativeElement.classList.add(...e)}set text(t){t!==this.errorText&&(this.errorText=t,this.hideError=!t,this.cdr.markForCheck())}}return o.\u0275fac=function(t){return new(t||o)(r.Y36(r.sBO),r.Y36(r.SBq))},o.\u0275cmp=r.Xpm({type:o,selectors:[["control-error"]],decls:2,vars:3,consts:[["class","control-error",3,"hide-control",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"control-error"]],template:function(t,e){1&t&&(r.YNc(0,tr,2,3,"label",0),r.YNc(1,nr,1,0,null,1)),2&t&&(r.Q6J("ngIf",!e.errorTemplate),r.xp6(1),r.Q6J("ngTemplateOutlet",e.errorTemplate)("ngTemplateOutletContext",e.errorContext))},dependencies:[m.O5,m.tP],styles:[".hide-control[_ngcontent-%COMP%]{display:none!important}[_nghost-%COMP%]{display:block}"],changeDetection:0}),o})();const U=new r.OlP("FORM_ERRORS",{providedIn:"root",factory:()=>({})}),Y=new r.OlP("ErrorTailorConfigProvider");let J=(()=>{class o{constructor(t){this.vcr=t}}return o.\u0275fac=function(t){return new(t||o)(r.Y36(r.s_b))},o.\u0275dir=r.lG2({type:o,selectors:[["","controlErrorAnchor",""]],exportAs:["controlErrorAnchor"]}),o})(),_=(()=>{class o{constructor(t){this.host=t,this.submit$=(0,A.R)(this.element,"submit").pipe((0,d.b)(()=>{!1===this.element.classList.contains("form-submitted")&&this.element.classList.add("form-submitted")}),(0,S.d)({refCount:!0,bufferSize:1})),this.reset$=(0,A.R)(this.element,"reset").pipe((0,d.b)(()=>{this.element.classList.remove("form-submitted")}),(0,S.d)({refCount:!0,bufferSize:1}))}get element(){return this.host.nativeElement}}return o.\u0275fac=function(t){return new(t||o)(r.Y36(r.SBq))},o.\u0275dir=r.lG2({type:o,selectors:[["form","errorTailor",""]]}),o})(),C=(()=>{class o{constructor(t,e,a,l,T,y,x,V,F){this.vcr=t,this.resolver=e,this.host=a,this.config=l,this.globalErrors=T,this.controlErrorAnchorParent=y,this.form=x,this.ngControl=V,this.controlContainer=F,this.customErrors={},this.destroy=new M.x,this.showError$=new M.x,this.mergedConfig={},this.submit$=this.form?this.form.submit$:g.E,this.reset$=this.form?this.form.reset$:g.E}ngOnInit(){this.mergedConfig=this.buildConfig(),this.anchor=this.resolveAnchor(),this.control=(this.controlContainer||this.ngControl).control;const t=!!this.control.asyncValidator,e=this.control.statusChanges.pipe((0,rr.x)()),a=this.control.valueChanges,l=(0,O.T)(e,a);let T=g.E,y=g.E,x=g.E;this.mergedConfig.controlErrorsOn.async&&t&&(T=e.pipe((0,b.O)(!0))),this.isInput&&this.mergedConfig.controlErrorsOn.change&&(x=a),this.isInput&&this.mergedConfig.controlErrorsOn.blur&&(y=(0,A.R)(this.host.nativeElement,"focusout").pipe((0,I.w)(()=>a.pipe((0,b.O)(!0)))));const F=(0,O.T)(this.submit$.pipe((0,D.h)(!0)),this.reset$.pipe((0,D.h)(!1))).pipe((0,I.w)(K=>K?l.pipe((0,b.O)(!0)):P));this.reset$.pipe((0,R.R)(this.destroy)).subscribe(()=>this.clearRefs()),(0,O.T)(T,y,x,F,this.showError$).pipe((0,R.R)(this.destroy)).subscribe(()=>this.valueChanges())}setError(t,e){if(!this.ref){const l=this.resolver.resolveComponentFactory(this.mergedConfig.controlErrorComponent);this.ref=this.anchor.createComponent(l)}const a=this.ref.instance;this.controlErrorsTpl?a.createTemplate(this.controlErrorsTpl,e,t):a.text=t,this.controlErrorsClass&&(a.customClass=this.controlErrorsClass),!this.controlErrorAnchor&&this.mergedConfig.controlErrorComponentAnchorFn&&(this.customAnchorDestroyFn=this.mergedConfig.controlErrorComponentAnchorFn(this.host.nativeElement,this.ref.hostView.rootNodes[0]))}showError(){this.showError$.next()}hideError(){this.setError(null)}ngOnDestroy(){this.destroy.next(),this.clearRefs()}get isInput(){return this.mergedConfig.blurPredicate(this.host.nativeElement)}clearRefs(){this.customAnchorDestroyFn&&(this.customAnchorDestroyFn(),this.customAnchorDestroyFn=null),this.ref&&this.ref.destroy(),this.ref=null}valueChanges(){const t=this.control.errors;if(t){const[e]=Object.keys(t),a=this.customErrors[e]||this.globalErrors[e];if(!a)return;const l="function"==typeof a?a(t[e]):a;this.isInput&&this.host.nativeElement.parentElement.classList.add("error-tailor-has-error"),this.setError(l,t)}else this.ref&&(this.isInput&&this.host.nativeElement.parentElement.classList.remove("error-tailor-has-error"),this.setError(null))}resolveAnchor(){return this.controlErrorAnchor?this.controlErrorAnchor.vcr:this.controlErrorAnchorParent?this.controlErrorAnchorParent.vcr:this.vcr}buildConfig(){return{blurPredicate:t=>"INPUT"===t.tagName||"SELECT"===t.tagName,controlErrorComponent:N,...this.config,controlErrorsOn:{async:this.controlErrorsOnAsync??this.config.controlErrorsOn?.async??!0,blur:this.controlErrorsOnBlur??this.config.controlErrorsOn?.blur??!0,change:this.controlErrorsOnChange??this.config.controlErrorsOn?.change??!1}}}}return o.\u0275fac=function(t){return new(t||o)(r.Y36(r.s_b),r.Y36(r._Vd),r.Y36(r.SBq),r.Y36(Y),r.Y36(U),r.Y36(J,8),r.Y36(_,8),r.Y36(i.a5,10),r.Y36(i.gN,10))},o.\u0275dir=r.lG2({type:o,selectors:[["","formControlName","",3,"controlErrorsIgnore",""],["","formControl","",3,"controlErrorsIgnore",""],["","formGroup","",3,"controlErrorsIgnore",""],["","formGroupName","",3,"controlErrorsIgnore",""],["","formArrayName","",3,"controlErrorsIgnore",""],["","ngModel","",3,"controlErrorsIgnore",""]],inputs:{customErrors:["controlErrors","customErrors"],controlErrorsClass:"controlErrorsClass",controlErrorsTpl:"controlErrorsTpl",controlErrorsOnAsync:"controlErrorsOnAsync",controlErrorsOnBlur:"controlErrorsOnBlur",controlErrorsOnChange:"controlErrorsOnChange",controlErrorAnchor:"controlErrorAnchor"},exportAs:["errorTailor"]}),o})(),er=(()=>{class o{static forRoot(t={}){return{ngModule:o,providers:[{provide:Y,useValue:t},{provide:U,...t.errors}]}}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[[m.ez]]}),o})();var sr=s(1219),h=s(1312),f=s(9638);let ir=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-auth"]],decls:3,vars:0,consts:[["mat-button","","title","Go to home page","routerLink","/catalog/",1,"link"]],template:function(t,e){1&t&&(r.TgZ(0,"a",0),r._uU(1," Home\n"),r.qZA(),r._UZ(2,"router-outlet"))},dependencies:[f.zs,h.lC,h.yS],styles:["[_nghost-%COMP%]{--error-color: #dc3545;--error-font-size: 12px}.auth-form[_ngcontent-%COMP%]{max-width:320px;margin-top:90px;margin-inline:auto}.form-header__heading[_ngcontent-%COMP%]{padding-top:10px;text-align:center}.form-hint[_ngcontent-%COMP%]{position:relative}.form-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center}.password-input__description[_ngcontent-%COMP%]{position:absolute}.control-error[_ngcontent-%COMP%]{width:100%;margin-top:5px;font-size:var(--error-font-size);color:var(--error-color)}"]}),o})();var B=s(4762),$=s(3568),L=s(4945),z=s(3787),v=s(3804),j=s(5887),ar=s(4041);function q(o,n){o.data&&Object.entries(o.data).forEach(([t,e])=>{(0,ar.EI)(t,n.controls)&&n.controls[t].setErrors({[`${t}Serve`]:e})})}var k=s(5134),Q=s(369),lr=s(7666);let H=(()=>{class o{constructor(t){this.snackBar=t}showError(t){this.snackBar.open(t??"","ok",{duration:2e3})}}return o.\u0275fac=function(t){return new(t||o)(r.LFG(lr.ux))},o.\u0275prov=r.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var E=s(8096),c=s(8659),Z=s(9665),cr=s(3331);function mr(o,n){if(1&o&&(r.TgZ(0,"span",6),r._uU(1),r.qZA()),2&o){const t=n.text;r.xp6(1),r.Oqu(t)}}function ur(o,n){if(1&o&&(r.TgZ(0,"li"),r._uU(1),r.qZA()),2&o){const t=n.$implicit;r.xp6(1),r.hij(" ",t," ")}}function pr(o,n){if(1&o&&(r.TgZ(0,"mat-error")(1,"ul"),r.YNc(2,ur,2,1,"li",7),r.qZA()()),2&o){const t=r.oxw();r.xp6(2),r.Q6J("ngForOf",t.control.getError("passwordServe"))}}function hr(o,n){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.control.getError("match")," ")}}const fr=["*"];let G=(()=>{class o{constructor(){this.label="",this.control=new i.NI(""),this.isPasswordHidden=!0}onPasswordToggle(){this.isPasswordHidden=!this.isPasswordHidden}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-password-input"]],inputs:{label:"label",control:"control"},ngContentSelectors:fr,decls:13,vars:9,consts:[["tpl",""],["appearance","fill",1,"form-field"],["matInput","","autocomplete","current-password",3,"type","formControl","controlErrorsTpl"],["mat-icon-button","","matSuffix","","type","button",3,"click"],[4,"ngIf"],[1,"form-hint"],[1,"control-error"],[4,"ngFor","ngForOf"]],template:function(t,e){if(1&t&&(r.F$t(),r.YNc(0,mr,2,1,"ng-template",null,0,r.W1O),r.TgZ(2,"mat-form-field",1)(3,"mat-label"),r._uU(4),r.qZA(),r._UZ(5,"input",2),r.TgZ(6,"button",3),r.NdJ("click",function(){return e.onPasswordToggle()}),r.TgZ(7,"mat-icon"),r._uU(8),r.qZA()(),r.YNc(9,pr,3,1,"mat-error",4),r.YNc(10,hr,2,1,"mat-error",4),r.TgZ(11,"mat-hint",5),r.Hsn(12),r.qZA()()),2&t){const a=r.MAs(1);r.xp6(4),r.Oqu(e.label),r.xp6(1),r.Q6J("type",e.isPasswordHidden?"password":"text")("formControl",e.control)("controlErrorsTpl",a),r.xp6(1),r.uIk("aria-label","Hide password")("aria-pressed",e.isPasswordHidden),r.xp6(2),r.hij(" ",e.isPasswordHidden?"visibility_off":"visibility"," "),r.xp6(1),r.Q6J("ngIf",e.control.hasError("passwordServe")),r.xp6(1),r.Q6J("ngIf",e.control.hasError("match"))}},dependencies:[i.Fj,i.JJ,m.sg,m.O5,cr.Hw,c.TO,c.KE,c.bx,c.hX,c.R9,Z.Nt,f.lW,i.oH,C],styles:["[_nghost-%COMP%]{--error-color: #dc3545;--error-font-size: 12px}.auth-form[_ngcontent-%COMP%]{max-width:320px;margin-top:90px;margin-inline:auto}.form-header__heading[_ngcontent-%COMP%]{padding-top:10px;text-align:center}.form-hint[_ngcontent-%COMP%]{position:relative}.form-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center}.password-input__description[_ngcontent-%COMP%]{position:absolute}.control-error[_ngcontent-%COMP%]{width:100%;margin-top:5px;font-size:var(--error-font-size);color:var(--error-color)}"],changeDetection:0}),o})();function gr(o,n){if(1&o&&(r.TgZ(0,"span",13),r._uU(1),r.qZA()),2&o){const t=n.text;r.xp6(1),r.Oqu(t)}}function dr(o,n){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.loginForm.controls.email.getError("emailServe")," ")}}function Cr(o,n){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.loginForm.controls.password.getError("passwordServe")," ")}}let u=class{constructor(n,t,e,a,l){this.urlService=n,this.formBuilder=t,this.userService=e,this.snackBarService=a,this.changeDetectorRef=l,this.loginForm=this.initLoginForm()}onFormSubmit(){if(this.loginForm.invalid)return;const{password:n,email:t}=this.loginForm.getRawValue();this.userService.login({email:t,password:n}).pipe((0,d.b)(()=>this.urlService.navigateToHome()),(0,v.t)(this),(0,$.K)(e=>e instanceof j.g?(0,L.of)(this.setErrors(e)):(0,z._)(()=>e))).subscribe()}setErrors(n){this.snackBarService.showError(n.detail),q(n,this.loginForm),this.changeDetectorRef.markForCheck()}initLoginForm(){return this.formBuilder.nonNullable.group({email:["",[i.kI.required,i.kI.email]],password:["",[i.kI.required]]})}};function vr(o,n){if(1&o&&(r.TgZ(0,"span",15),r._uU(1),r.qZA()),2&o){const t=n.text;r.xp6(1),r.Oqu(t)}}function Er(o,n){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.registrationForm.controls.email.getError("emailServe")," ")}}u.\u0275fac=function(n){return new(n||u)(r.Y36(k.i),r.Y36(i.qu),r.Y36(Q.K),r.Y36(H),r.Y36(r.sBO))},u.\u0275cmp=r.Xpm({type:u,selectors:[["app-login"]],decls:23,vars:5,consts:[["tpl",""],[1,"auth-form","mat-elevation-z8",3,"formGroup","ngSubmit"],[1,"form-header"],[1,"form-header__heading","mat-headline"],["appearance","fill",1,"form-field"],["matInput","","placeholder","pat@example.com","formControlName","email","type","email","autocomplete","email",3,"controlErrorsTpl"],[4,"ngIf"],["label","Enter your password",3,"control"],[1,"form-buttons"],["mat-stroked-button","","type","submit",1,"form-buttons__button"],[1,"form-list"],["mat-button","","href","#",1,"link"],["mat-button","","routerLink","/auth/registration/",1,"link"],[1,"control-error"]],template:function(n,t){if(1&n&&(r.YNc(0,gr,2,1,"ng-template",null,0,r.W1O),r.TgZ(2,"form",1),r.NdJ("ngSubmit",function(){return t.onFormSubmit()}),r.TgZ(3,"header",2)(4,"h1",3),r._uU(5,"Log In"),r.qZA()(),r.TgZ(6,"mat-form-field",4)(7,"mat-label"),r._uU(8,"Enter your email"),r.qZA(),r._UZ(9,"input",5),r.YNc(10,dr,2,1,"mat-error",6),r.qZA(),r.TgZ(11,"app-password-input",7),r.YNc(12,Cr,2,1,"mat-error",6),r.qZA(),r.TgZ(13,"div",8)(14,"button",9),r._uU(15," Login "),r.qZA()(),r.TgZ(16,"mat-list",10)(17,"mat-list-item")(18,"a",11),r._uU(19,"Forgot your password?"),r.qZA()(),r.TgZ(20,"mat-list-item")(21,"a",12),r._uU(22," Don't have an account? "),r.qZA()()()()),2&n){const e=r.MAs(1);r.xp6(2),r.Q6J("formGroup",t.loginForm),r.xp6(7),r.Q6J("controlErrorsTpl",e),r.xp6(1),r.Q6J("ngIf",t.loginForm.controls.email.hasError("emailServe")),r.xp6(1),r.Q6J("control",t.loginForm.controls.password),r.xp6(1),r.Q6J("ngIf",t.loginForm.controls.password.hasError("passwordServe"))}},dependencies:[i._Y,i.Fj,i.JJ,i.JL,m.O5,E.i$,E.Tg,c.TO,c.KE,c.hX,Z.Nt,f.lW,f.zs,i.sg,i.u,h.yS,C,G],styles:["[_nghost-%COMP%]{--error-color: #dc3545;--error-font-size: 12px}.auth-form[_ngcontent-%COMP%]{max-width:320px;margin-top:90px;margin-inline:auto}.form-header__heading[_ngcontent-%COMP%]{padding-top:10px;text-align:center}.form-hint[_ngcontent-%COMP%]{position:relative}.form-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center}.password-input__description[_ngcontent-%COMP%]{position:absolute}.control-error[_ngcontent-%COMP%]{width:100%;margin-top:5px;font-size:var(--error-font-size);color:var(--error-color)}"],changeDetection:0}),u=(0,B.gn)([(0,v.c)()],u);let p=class{constructor(n,t,e,a,l){this.urlService=n,this.formBuilder=t,this.userService=e,this.snackBarService=a,this.changeDetectorRef=l,this.registrationForm=this.initRegistrationForm()}onFormSubmit(){if(this.registrationForm.markAllAsTouched(),this.registrationForm.invalid)return;const{password:n,email:t,firstName:e,lastName:a}=this.registrationForm.getRawValue();this.userService.register({password:n,email:t,firstName:e,lastName:a}).pipe((0,d.b)(()=>this.urlService.navigateToHome()),(0,v.t)(this),(0,$.K)(l=>l instanceof j.g?(0,L.of)(this.setErrors(l)):(0,z._)(()=>l))).subscribe()}setErrors(n){this.snackBarService.showError(n.detail),q(n,this.registrationForm),this.changeDetectorRef.markForCheck()}initRegistrationForm(){return this.formBuilder.nonNullable.group({email:["",[i.kI.required,i.kI.email]],firstName:["",[i.kI.required]],lastName:["",[i.kI.required]],password:["",[i.kI.required,i.kI.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/i)]],passwordConfirm:["",[i.kI.required,this.matchControl()]]})}matchControl(){return n=>this.registrationForm&&this.registrationForm.get("password")?.value!==n.value?{match:"Passwords did not match"}:null}};p.\u0275fac=function(n){return new(n||p)(r.Y36(k.i),r.Y36(i.qu),r.Y36(Q.K),r.Y36(H),r.Y36(r.sBO))},p.\u0275cmp=r.Xpm({type:p,selectors:[["app-registration"]],decls:39,vars:7,consts:[["tpl",""],[1,"auth-form","mat-elevation-z8",3,"formGroup","ngSubmit"],[1,"form-header"],[1,"form-header__heading","mat-headline"],["appearance","fill",1,"form-field"],["matInput","","type","email","placeholder","thomas.anderson@rabbit.com","formControlName","email","autocomplete","email",3,"controlErrorsTpl"],[4,"ngIf"],["matInput","","type","text","placeholder","Thomas","formControlName","firstName","autocomplete","given-name",3,"controlErrorsTpl"],["matInput","","type","text","placeholder","Anderson","formControlName","lastName","autocomplete","family-name",3,"controlErrorsTpl"],["label","Enter your password",3,"control"],["label","Confirm your password",3,"control"],[1,"form-buttons"],["mat-stroked-button","","type","submit",1,"form-buttons__button"],[1,"form-list"],["mat-button","","routerLink","/auth/login/",1,"link"],[1,"control-error"]],template:function(n,t){if(1&n&&(r.YNc(0,vr,2,1,"ng-template",null,0,r.W1O),r.TgZ(2,"form",1),r.NdJ("ngSubmit",function(){return t.onFormSubmit()}),r.TgZ(3,"header",2)(4,"h1",3),r._uU(5,"Registration"),r.qZA()(),r.TgZ(6,"mat-form-field",4)(7,"mat-label"),r._uU(8,"Enter your email"),r.qZA(),r._UZ(9,"input",5),r.YNc(10,Er,2,1,"mat-error",6),r.qZA(),r.TgZ(11,"mat-form-field",4)(12,"mat-label"),r._uU(13,"Enter your first name"),r.qZA(),r._UZ(14,"input",7),r.qZA(),r.TgZ(15,"mat-form-field",4)(16,"mat-label"),r._uU(17,"Enter your last name"),r.qZA(),r._UZ(18,"input",8),r.qZA(),r.TgZ(19,"app-password-input",9)(20,"span"),r._uU(21,"Password must be: "),r.qZA(),r.TgZ(22,"ul")(23,"li"),r._uU(24,"Min 8 character"),r.qZA(),r.TgZ(25,"li"),r._uU(26,"Min 1 lowercase character"),r.qZA(),r.TgZ(27,"li"),r._uU(28,"Min 1 uppercase character"),r.qZA(),r.TgZ(29,"li"),r._uU(30,"Min 1 number"),r.qZA()()(),r._UZ(31,"app-password-input",10),r.TgZ(32,"div",11)(33,"button",12),r._uU(34," Register "),r.qZA()(),r.TgZ(35,"mat-list",13)(36,"mat-list-item")(37,"a",14),r._uU(38," Do you have an account? "),r.qZA()()()()),2&n){const e=r.MAs(1);r.xp6(2),r.Q6J("formGroup",t.registrationForm),r.xp6(7),r.Q6J("controlErrorsTpl",e),r.xp6(1),r.Q6J("ngIf",t.registrationForm.controls.email.hasError("emailServe")),r.xp6(4),r.Q6J("controlErrorsTpl",e),r.xp6(4),r.Q6J("controlErrorsTpl",e),r.xp6(1),r.Q6J("control",t.registrationForm.controls.password),r.xp6(12),r.Q6J("control",t.registrationForm.controls.passwordConfirm)}},dependencies:[i._Y,i.Fj,i.JJ,i.JL,m.O5,E.i$,E.Tg,c.TO,c.KE,c.hX,Z.Nt,f.lW,f.zs,i.sg,i.u,h.yS,C,G],styles:["[_nghost-%COMP%]{--error-color: #dc3545;--error-font-size: 12px}.auth-form[_ngcontent-%COMP%]{max-width:320px;margin-top:90px;margin-inline:auto}.form-header__heading[_ngcontent-%COMP%]{padding-top:10px;text-align:center}.form-hint[_ngcontent-%COMP%]{position:relative}.form-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center}.password-input__description[_ngcontent-%COMP%]{position:absolute}.control-error[_ngcontent-%COMP%]{width:100%;margin-top:5px;font-size:var(--error-font-size);color:var(--error-color)}"],changeDetection:0}),p=(0,B.gn)([(0,v.c)()],p);const Tr=[{path:"",component:ir,children:[{path:"login",component:u},{path:"registration",component:p}]}];let yr=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[h.Bz.forChild(Tr),h.Bz]}),o})();const xr={errors:{useValue:{required:"This field is required",email:"This email is not valid"}}};let Ar=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[sr.m,yr,er.forRoot(xr)]}),o})()}}]);