"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[725],{9725:(Q,v,a)=>{a.r(v),a.d(v,{AuthModule:()=>H});var O=a(1219),p=a(1312),t=a(4537),d=a(9638);let E=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-auth"]],decls:3,vars:0,consts:[["mat-button","","title","Go to home page","routerLink","/catalog/",1,"link"]],template:function(n,i){1&n&&(t.TgZ(0,"a",0),t._uU(1,"Home"),t.qZA(),t._UZ(2,"router-outlet"))},dependencies:[d.zs,p.lC,p.yS],styles:[".auth-form[_ngcontent-%COMP%]{max-width:320px;margin-top:90px;margin-inline:auto}.auth-form__heading[_ngcontent-%COMP%]{padding-top:10px;text-align:center}.form-hint[_ngcontent-%COMP%]{position:relative}.form-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center}.password-input__description[_ngcontent-%COMP%]{position:absolute}"]}),o})();var C=a(4762),w=a(8168),T=a(3568),b=a(4945),A=a(3787),g=a(3804),e=a(92),F=a(5887),M=a(4041);function x(o,r){o.data&&Object.entries(o.data).forEach(([n,i])=>{(0,M.EI)(n,r.controls)&&r.controls[n].setErrors({[n]:i})})}var y=a(5134),P=a(369),U=a(7666);let _=(()=>{class o{constructor(n){this.snackBar=n}showError(n){this.snackBar.open(n??"","ok",{duration:2e3})}}return o.\u0275fac=function(n){return new(n||o)(t.LFG(U.ux))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var f=a(8692),h=a(8096),s=a(8659),Z=a(9665),S=a(3331);function J(o,r){if(1&o&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&o){const n=r.$implicit;t.xp6(1),t.hij(" ",n," ")}}function N(o,r){if(1&o&&(t.TgZ(0,"mat-error")(1,"ul"),t.YNc(2,J,2,1,"li",5),t.qZA()()),2&o){const n=t.oxw();t.xp6(2),t.Q6J("ngForOf",n.control.getError("password"))}}function k(o,r){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.hij(" ",n.control.getError("match")," ")}}const B=["*"];let I=(()=>{class o{constructor(){this.label="",this.control=new e.NI(""),this.isHiddenPassword=!0}handlePasswordToggle(){this.isHiddenPassword=!this.isHiddenPassword}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-password-input"]],inputs:{label:"label",control:"control"},ngContentSelectors:B,decls:11,vars:8,consts:[["appearance","fill",1,"form-field"],["matInput","","autocomplete","current-password",3,"type","formControl"],["mat-icon-button","","matSuffix","","type","button",3,"click"],[4,"ngIf"],[1,"form-hint"],[4,"ngFor","ngForOf"]],template:function(n,i){1&n&&(t.F$t(),t.TgZ(0,"mat-form-field",0)(1,"mat-label"),t._uU(2),t.qZA(),t._UZ(3,"input",1),t.TgZ(4,"button",2),t.NdJ("click",function(){return i.handlePasswordToggle()}),t.TgZ(5,"mat-icon"),t._uU(6),t.qZA()(),t.YNc(7,N,3,1,"mat-error",3),t.YNc(8,k,2,1,"mat-error",3),t.TgZ(9,"mat-hint",4),t.Hsn(10),t.qZA()()),2&n&&(t.xp6(2),t.Oqu(i.label),t.xp6(1),t.Q6J("type",i.isHiddenPassword?"password":"text")("formControl",i.control),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",i.isHiddenPassword),t.xp6(2),t.Oqu(i.isHiddenPassword?"visibility_off":"visibility"),t.xp6(1),t.Q6J("ngIf",i.control.hasError("password")),t.xp6(1),t.Q6J("ngIf",i.control.hasError("match")))},dependencies:[e.Fj,e.JJ,f.sg,f.O5,S.Hw,s.TO,s.KE,s.bx,s.hX,s.R9,Z.Nt,d.lW,e.oH],styles:[".auth-form[_ngcontent-%COMP%]{max-width:320px;margin-top:90px;margin-inline:auto}.auth-form__heading[_ngcontent-%COMP%]{padding-top:10px;text-align:center}.form-hint[_ngcontent-%COMP%]{position:relative}.form-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center}.password-input__description[_ngcontent-%COMP%]{position:absolute}"]}),o})();function q(o,r){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.hij(" ",n.loginForm.controls.email.getError("email")," ")}}function R(o,r){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.hij(" ",n.loginForm.controls.password.getError("password")," ")}}let u=class{constructor(r,n,i,m,l){this.urlService=r,this.formBuilder=n,this.userService=i,this.snackBarService=m,this.changeDetectorRef=l,this.loginForm=this.initLoginForm()}handleFormSubmit(){if(this.loginForm.markAllAsTouched(),this.loginForm.invalid)return;const{password:r,email:n}=this.loginForm.getRawValue();this.userService.login({email:n,password:r}).pipe((0,w.b)(()=>this.urlService.navigateToHome()),(0,g.t)(this),(0,T.K)(i=>i instanceof F.g?(0,b.of)(this.setErrors(i)):(0,A._)(()=>i))).subscribe()}setErrors(r){this.snackBarService.showError(r.detail),x(r,this.loginForm),this.changeDetectorRef.markForCheck()}initLoginForm(){return this.formBuilder.nonNullable.group({email:["",[e.kI.required,e.kI.email]],password:["",[e.kI.required]]},{updateOn:"blur"})}};function Y(o,r){if(1&o&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.hij(" ",n.registrationForm.controls.email.getError("email")," ")}}u.\u0275fac=function(r){return new(r||u)(t.Y36(y.i),t.Y36(e.qu),t.Y36(P.K),t.Y36(_),t.Y36(t.sBO))},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-login"]],decls:21,vars:4,consts:[[1,"auth-form","mat-elevation-z8",3,"formGroup","submit"],[1,"form-header"],[1,"auth-form__heading","mat-headline"],["appearance","fill",1,"form-field"],["matInput","","placeholder","pat@example.com","formControlName","email","type","email","autocomplete","email"],[4,"ngIf"],["label","Enter your password",3,"control"],[1,"form-buttons"],["mat-stroked-button","","type","submit",1,"form-buttons__button"],["role","list",1,"form-list"],["role","listitem"],["mat-button","","href","#",1,"link"],["mat-button","","routerLink","/auth/registration/",1,"link"]],template:function(r,n){1&r&&(t.TgZ(0,"form",0),t.NdJ("submit",function(){return n.handleFormSubmit()}),t.TgZ(1,"header",1)(2,"h1",2),t._uU(3,"Log In"),t.qZA()(),t.TgZ(4,"mat-form-field",3)(5,"mat-label"),t._uU(6,"Enter your email"),t.qZA(),t._UZ(7,"input",4),t.YNc(8,q,2,1,"mat-error",5),t.qZA(),t.TgZ(9,"app-password-input",6),t.YNc(10,R,2,1,"mat-error",5),t.qZA(),t.TgZ(11,"div",7)(12,"button",8),t._uU(13," Login "),t.qZA()(),t.TgZ(14,"mat-list",9)(15,"mat-list-item",10)(16,"a",11),t._uU(17,"Forgot your password?"),t.qZA()(),t.TgZ(18,"mat-list-item",10)(19,"a",12),t._uU(20,"Don't have an account?"),t.qZA()()()()),2&r&&(t.Q6J("formGroup",n.loginForm),t.xp6(8),t.Q6J("ngIf",n.loginForm.controls.email.hasError("email")),t.xp6(1),t.Q6J("control",n.loginForm.controls.password),t.xp6(1),t.Q6J("ngIf",n.loginForm.controls.password.hasError("password")))},dependencies:[e._Y,e.Fj,e.JJ,e.JL,f.O5,h.i$,h.Tg,s.TO,s.KE,s.hX,Z.Nt,d.lW,d.zs,e.sg,e.u,p.yS,I],styles:[".auth-form[_ngcontent-%COMP%]{max-width:320px;margin-top:90px;margin-inline:auto}.auth-form__heading[_ngcontent-%COMP%]{padding-top:10px;text-align:center}.form-hint[_ngcontent-%COMP%]{position:relative}.form-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center}.password-input__description[_ngcontent-%COMP%]{position:absolute}"],changeDetection:0}),u=(0,C.gn)([(0,g.c)()],u);let c=class{constructor(r,n,i,m,l){this.urlService=r,this.formBuilder=n,this.userService=i,this.snackBarService=m,this.changeDetectorRef=l,this.registrationForm=this.initRegistrationForm()}onFormSubmit(){if(this.registrationForm.markAllAsTouched(),this.registrationForm.invalid)return;const{password:r,email:n,firstName:i,lastName:m}=this.registrationForm.getRawValue();this.userService.register({password:r,email:n,firstName:i,lastName:m}).pipe((0,w.b)(()=>this.urlService.navigateToHome()),(0,g.t)(this),(0,T.K)(l=>l instanceof F.g?(0,b.of)(this.setErrors(l)):(0,A._)(()=>l))).subscribe()}setErrors(r){this.snackBarService.showError(r.detail),x(r,this.registrationForm),this.changeDetectorRef.markForCheck()}initRegistrationForm(){return this.formBuilder.nonNullable.group({email:["",[e.kI.required,e.kI.email]],firstName:["",[e.kI.required]],lastName:["",[e.kI.required]],password:["",[e.kI.required,e.kI.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/i)]],passwordConfirm:["",[e.kI.required,this.matchControl()]]},{updateOn:"blur"})}matchControl(){return r=>this.registrationForm&&this.registrationForm.get("password")?.value!==r.value?{match:"Passwords did not match"}:null}};c.\u0275fac=function(r){return new(r||c)(t.Y36(y.i),t.Y36(e.qu),t.Y36(P.K),t.Y36(_),t.Y36(t.sBO))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-registration"]],decls:37,vars:4,consts:[[1,"auth-form","mat-elevation-z8",3,"formGroup","submit"],[1,"form-header"],[1,"auth-form__heading","mat-headline"],["appearance","fill",1,"form-field"],["matInput","","type","email","placeholder","thomas.anderson@rabbit.com","formControlName","email","autocomplete","email"],[4,"ngIf"],["matInput","","type","text","placeholder","Thomas","formControlName","firstName","autocomplete","given-name"],["matInput","","type","text","placeholder","Anderson","formControlName","lastName","autocomplete","family-name"],["label","Enter your password",3,"control"],["label","Confirm your password",3,"control"],[1,"form-buttons"],["mat-stroked-button","","type","submit",1,"form-buttons__button"],["role","list",1,"form-list"],["role","listitem"],["mat-button","","routerLink","/auth/login/",1,"link"]],template:function(r,n){1&r&&(t.TgZ(0,"form",0),t.NdJ("submit",function(){return n.onFormSubmit()}),t.TgZ(1,"header",1)(2,"h1",2),t._uU(3,"Registration"),t.qZA()(),t.TgZ(4,"mat-form-field",3)(5,"mat-label"),t._uU(6,"Enter your email"),t.qZA(),t._UZ(7,"input",4),t.YNc(8,Y,2,1,"mat-error",5),t.qZA(),t.TgZ(9,"mat-form-field",3)(10,"mat-label"),t._uU(11,"Enter your first name"),t.qZA(),t._UZ(12,"input",6),t.qZA(),t.TgZ(13,"mat-form-field",3)(14,"mat-label"),t._uU(15,"Enter your last name"),t.qZA(),t._UZ(16,"input",7),t.qZA(),t.TgZ(17,"app-password-input",8)(18,"span"),t._uU(19,"Password must be: "),t.qZA(),t.TgZ(20,"ul")(21,"li"),t._uU(22,"Min 8 character"),t.qZA(),t.TgZ(23,"li"),t._uU(24,"Min 1 lowercase character"),t.qZA(),t.TgZ(25,"li"),t._uU(26,"Min 1 uppercase character"),t.qZA(),t.TgZ(27,"li"),t._uU(28,"Min 1 number"),t.qZA()()(),t._UZ(29,"app-password-input",9),t.TgZ(30,"div",10)(31,"button",11),t._uU(32," Register "),t.qZA()(),t.TgZ(33,"mat-list",12)(34,"mat-list-item",13)(35,"a",14),t._uU(36,"Do you have an account?"),t.qZA()()()()),2&r&&(t.Q6J("formGroup",n.registrationForm),t.xp6(8),t.Q6J("ngIf",n.registrationForm.controls.email.hasError("email")),t.xp6(9),t.Q6J("control",n.registrationForm.controls.password),t.xp6(12),t.Q6J("control",n.registrationForm.controls.passwordConfirm))},dependencies:[e._Y,e.Fj,e.JJ,e.JL,f.O5,h.i$,h.Tg,s.TO,s.KE,s.hX,Z.Nt,d.lW,d.zs,e.sg,e.u,p.yS,I],styles:[".auth-form[_ngcontent-%COMP%]{max-width:320px;margin-top:90px;margin-inline:auto}.auth-form__heading[_ngcontent-%COMP%]{padding-top:10px;text-align:center}.form-hint[_ngcontent-%COMP%]{position:relative}.form-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center}.password-input__description[_ngcontent-%COMP%]{position:absolute}"],changeDetection:0}),c=(0,C.gn)([(0,g.c)()],c);const L=[{path:"",component:E,children:[{path:"login",component:u},{path:"registration",component:c}]}];let j=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[p.Bz.forChild(L),p.Bz]}),o})(),H=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[O.m,j]}),o})()}}]);