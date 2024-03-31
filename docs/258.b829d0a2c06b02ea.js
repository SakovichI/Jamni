"use strict";(self.webpackChunkjamni=self.webpackChunkjamni||[]).push([[258],{5297:(Z,m,r)=>{r.d(m,{f:()=>v});var u=r(1135),p=r(8505),h=r(3900),g=r(2340),f=r(7587),t=r(520);let v=(()=>{class d{constructor(s){this.http=s,this.url=g.N.apiUrl,this.address$=new u.X([])}getAddress(){return this.http.get(`${this.url}/users/addresses`).pipe((0,p.b)(s=>this.address$.next(s)))}addAddress(s){return this.http.post(`${this.url}/users/addresses`,s).pipe((0,h.w)(()=>this.getAddress()))}editAddress(s,a){return this.http.put(`${this.url}/users/addresses/${a}`,s)}deleteAddress(s){return this.http.delete(`${this.url}/users/addresses/${s}`)}}return d.\u0275fac=function(s){return new(s||d)(f.LFG(t.eN))},d.\u0275prov=f.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()},7258:(Z,m,r)=>{r.r(m),r.d(m,{CutInfoModule:()=>T});var u=r(3075),p=r(7545),h=r(4466),g=r(7579),f=r(2722),t=r(7587),v=r(6300),d=r(5297),C=r(263),s=r(2598),a=r(9808);function x(n,l){if(1&n){const e=t.EpF();t.TgZ(0,"div",55)(1,"div",56)(2,"picture"),t._UZ(3,"source",57)(4,"img",58),t.qZA(),t.TgZ(5,"div",59)(6,"h3",60),t._uU(7),t.qZA(),t.TgZ(8,"span",61),t._uU(9),t.qZA(),t.TgZ(10,"div",62)(11,"button",63),t.NdJ("click",function(){const c=t.CHM(e).$implicit;return t.oxw().generalService.deleteProduct(c)}),t._uU(12," - "),t.qZA(),t.TgZ(13,"span",64),t._uU(14),t.qZA(),t.TgZ(15,"button",65),t.NdJ("click",function(){const c=t.CHM(e).$implicit;return t.oxw().generalService.addProduct(c)}),t._uU(16," + "),t.qZA()()(),t.TgZ(17,"button",66),t.NdJ("click",function(){const c=t.CHM(e).$implicit;return t.oxw().generalService.deleteProduct(c)}),t._UZ(18,"img",67),t.qZA()()()}if(2&n){const e=l.$implicit,o=t.oxw();t.xp6(3),t.Q6J("srcset",e.product.coverImage||"assets/img/no-img-placeholder.svg",t.LSH),t.xp6(1),t.Q6J("src",e.product.coverImage||"assets/img/no-img-placeholder.svg",t.LSH),t.xp6(3),t.Oqu(e.product.name),t.xp6(2),t.hij("",o.generalService.getProductAmount(e)*e.product.price," \u0440\u0443\u0431"),t.xp6(5),t.Oqu(o.generalService.getProductAmount(e))}}function A(n,l){if(1&n){const e=t.EpF();t.TgZ(0,"li",79),t.NdJ("click",function(){const c=t.CHM(e).$implicit;return t.oxw(2).updateForm(c)}),t.TgZ(1,"div",80)(2,"span",81),t._uU(3),t.qZA(),t.TgZ(4,"span",82),t._uU(5),t.qZA()()()}if(2&n){const e=l.$implicit;t.xp6(3),t.hij("\u0410\u0434\u0440\u0435\u0441 ",e.id,""),t.xp6(2),t.Oqu(e.street+", "+e.house+", "+e.postcode+", "+e.city+", "+e.country)}}const y=function(n){return{open:n}};function b(n,l){if(1&n){const e=t.EpF();t.TgZ(0,"div",68)(1,"div",69),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return i.showModal=!i.showModal}),t.qZA(),t.TgZ(2,"div",70)(3,"button",71),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return i.showModal=!i.showModal}),t.O4$(),t.TgZ(4,"svg",72),t._UZ(5,"line",73)(6,"line",74),t.qZA()(),t.kcU(),t.TgZ(7,"span",75),t._uU(8,"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441:"),t.qZA(),t.TgZ(9,"div",76)(10,"ul",77),t.YNc(11,A,6,2,"li",78),t.qZA()()()()}if(2&n){const e=t.oxw();t.Q6J("ngClass",t.VKq(2,y,e.showModal)),t.xp6(11),t.Q6J("ngForOf",e.addressArray)}}const w=[{path:"",component:(()=>{class n{constructor(e,o,i,c,_){this.generalService=e,this.addressApi=o,this.auth=i,this.userApi=c,this.cdr=_,this.destroy$=new g.x,this.email="",this.form=new u.cw({email:new u.NI("",[u.kI.required,u.kI.email]),name:new u.NI("",[u.kI.required]),surname:new u.NI("",[u.kI.required]),country:new u.NI("\u0420\u043e\u0441\u0441\u0438\u044f",[u.kI.required]),city:new u.NI("",[u.kI.required]),index:new u.NI("",[u.kI.required]),street:new u.NI("",[u.kI.required]),house:new u.NI("",[u.kI.required]),phone:new u.NI("",[u.kI.required,u.kI.pattern(/^\+\d{1}\(\d{3}\) \d{3}-\d{2}-\d{2}$/)])}),this.showModal=!1,this.addressArray=[]}ngOnInit(){if(setTimeout(()=>{const e=document.querySelector('script[src="assets/main.js"]');e&&document.body.removeChild(e);const o=document.createElement("script");o.src="assets/main.js",document.body.appendChild(o)},500),localStorage.getItem("form")){const e=JSON.parse(localStorage.getItem("form"));this.form.controls.email.setValue(e.email),this.form.controls.name.setValue(e.name),this.form.controls.surname.setValue(e.surname),this.form.controls.city.setValue(e.city),this.form.controls.index.setValue(e.index),this.form.controls.street.setValue(e.street),this.form.controls.house.setValue(e.house),this.form.controls.phone.setValue(e.phone)}this.auth.getToken()&&(this.showModal=!this.showModal,this.userApi.userS.subscribe(e=>{this.email=e.email,this.form.controls.email.setValue(e.email)}),this.addressApi.getAddress().pipe((0,f.R)(this.destroy$)).subscribe(e=>{this.addressArray=e,this.cdr.detectChanges()}))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),localStorage.setItem("form",JSON.stringify(this.form.value))}onSaveFormToStorageClick(){localStorage.getItem("form")?localStorage.removeItem("form"):localStorage.setItem("form",JSON.stringify(this.form.value))}updateForm(e){this.form.controls.name.setValue(e.firstname),this.form.controls.surname.setValue(e.surname),this.form.controls.country.setValue(e.country),this.form.controls.city.setValue(e.city),this.form.controls.index.setValue(e.postcode),this.form.controls.street.setValue(e.street),this.form.controls.house.setValue(e.house),this.form.controls.phone.setValue(e.phone),this.showModal=!this.showModal}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(v.m),t.Y36(d.f),t.Y36(C.e),t.Y36(s._),t.Y36(t.sBO))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ng-component"]],decls:89,vars:32,consts:[[1,"cut-info"],[1,"small-container"],[1,"cut-info__wrap"],[1,"breadcrumbs","cut-info__breadcrumbs"],[1,"breadcrumbs__link"],[1,"breadcrumbs__link","breadcrumbs__link--active"],["action","#",1,"cut-info__form","form","form-info"],[1,"form-info__wrap","form__wrap"],[1,"form-info__row","form__row"],[1,"form__label","form-info__label"],[1,"form-info__text-wrap"],[1,"form-info__title"],["type","text","placeholder","\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u0430\u044f \u043f\u043e\u0447\u0442\u0430",1,"form__input","form-info__input","input-reset",3,"formControl"],[1,"form-info__inner"],[1,"form__row"],[1,"form-group","form-info__select","form__select"],[1,"dropdown","form-info__dropdown","form__dropdown"],["type","button",1,"dropdown__button"],[1,"dropdown__icon"],[0,"xlink","href","assets/img/sprite.svg#arrow-down"],[1,"dropdown__list"],["data-value","\u0420\u043e\u0441\u0441\u0438\u044f",1,"dropdown__list-item",3,"click"],["data-value","\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c",1,"dropdown__list-item",3,"click"],["data-value","\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d",1,"dropdown__list-item",3,"click"],["type","text","name","select-category",1,"dropdown__input-hidden",3,"formControl"],["name","name","type","text","placeholder","\u0418\u043c\u044f",1,"form__input","form-info__input","input-reset",3,"formControl"],["name","surname","type","text","placeholder","\u0424\u0430\u043c\u0438\u043b\u0438\u044f",1,"form__input","form-info__input","input-reset",3,"formControl"],["name","city","type","text","placeholder","\u0413\u043e\u0440\u043e\u0434",1,"form__input","form-info__input","input-reset",3,"formControl"],["name","index","type","text","placeholder","\u0418\u043d\u0434\u0435\u043a\u0441",1,"form__input","form-info__input","input-reset",3,"formControl"],["name","street","type","text","placeholder","\u0423\u043b\u0438\u0446\u0430",1,"form__input","form-info__input","input-reset",3,"formControl"],["name","house-num","type","text","placeholder","\u041d\u043e\u043c\u0435\u0440 \u0434\u043e\u043c\u0430",1,"form__input","form-info__input","input-reset",3,"formControl"],["name","phone","type","text","placeholder","\u0422\u0435\u043b\u0435\u0444\u043e\u043d",1,"form__input","form-info__input","input-reset",3,"formControl"],[1,"custom-checkbox","form-info__checkbox",3,"change"],["type","checkbox","name","save",1,"custom-checkbox__field"],[1,"custom-checkbox__content","form-info__checkbox-content","form-info__text--light"],["type","button",1,"form-info__btn","btn-reset","form__btn","btn-anim",3,"routerLink"],[1,"form__btn-text","form-info__btn-text","btn-anim__text"],[1,"cut-info__result","result-cut","accordion"],[1,"result-cut__accordion-title","accordion__title"],[1,"accordion__icon"],[1,"accordion__icon-line","accordion__icon-line--horizontal"],[1,"accordion__icon-line","accordion__icon-line--vertical"],[1,"accordion__content"],[1,"result-cut__title"],["data-simplebar","",1,"result-cut__items"],["class","result-cut__item item-cut",4,"ngFor","ngForOf"],[1,"result-cut__sum","sum-cut"],[1,"sum-cut__wrap"],[1,"sum-cut__inner-text"],[1,"sum-cut__row"],[1,"sum-cut__title"],[1,"sum-cut__txt","sum-cut__txt--light"],[1,"sum-cut__title","sum-cut__title--lg"],[1,"sum-cut__txt","sum-cut__txt--lg"],["class","popup",3,"ngClass",4,"ngIf"],[1,"result-cut__item","item-cut"],[1,"item-cut__wrap"],["type","image/webp",3,"srcset"],["loading","lazy","width","130","height","130","alt","prod-image",1,"image",3,"src"],["data-prod","result-cut",1,"item-cut__content"],[1,"item-cut__title"],[1,"item-cut__price"],[1,"item-cut__count","count-prod"],[1,"btn-reset","count-prod__minus",3,"click"],[1,"count-prod__count"],[1,"btn-reset","count-prod__plus",3,"click"],[1,"btn-reset","item-cut__delete",3,"click"],["src","assets/img/cut-img/delete-prod.png","width","20","height","20","alt","delete-icon",1,"item-cut__icon-delete"],[1,"popup",3,"ngClass"],[1,"popup__overlay",3,"click"],[1,"popup__content"],[1,"btn-reset","popup__btn-close",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 30 30","fill","none"],["x1","1.98995","y1","1","x2","29.2843","y2","28.2943","stroke","black","stroke-width","1.4","stroke-linecap","round"],["x1","0.7","y1","-0.7","x2","39.3","y2","-0.7","transform","matrix(-0.707107 0.707107 0.707107 0.707107 29.2852 1)","stroke","black","stroke-width","1.4","stroke-linecap","round"],[1,"popup__title"],[1,"adress"],[1,"address__list"],["class","address__item address-elem",3,"click",4,"ngFor","ngForOf"],[1,"address__item","address-elem",3,"click"],[1,"address-elem__wrap"],[1,"address-elem__id"],[1,"address__info"]],template:function(e,o){1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"span",4),t._uU(5,"\u041a\u043e\u0440\u0437\u0438\u043d\u0430"),t.qZA(),t.TgZ(6,"span",5),t._uU(7,"\u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f"),t.qZA(),t.TgZ(8,"span",4),t._uU(9,"\u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430"),t.qZA(),t.TgZ(10,"span",4),t._uU(11,"\u043e\u043f\u043b\u0430\u0442\u0430"),t.qZA()(),t.TgZ(12,"form",6)(13,"div",7)(14,"div",8)(15,"label",9)(16,"span",10)(17,"span",11),t._uU(18,"\u041a\u043e\u043d\u0442\u0430\u043a\u0442"),t.qZA()(),t._UZ(19,"input",12),t.qZA()(),t.TgZ(20,"div",13)(21,"span",11),t._uU(22,"\u0430\u0434\u0440\u0435\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438 "),t.qZA(),t.TgZ(23,"div",14)(24,"div",15)(25,"div",16)(26,"button",17),t._uU(27),t.qZA(),t.O4$(),t.TgZ(28,"svg",18),t._UZ(29,"use",19),t.qZA(),t.kcU(),t.TgZ(30,"ul",20)(31,"li",21),t.NdJ("click",function(){return o.form.controls.country.setValue("\u0420\u043e\u0441\u0441\u0438\u044f")}),t._uU(32," \u0420\u043e\u0441\u0441\u0438\u044f "),t.qZA(),t.TgZ(33,"li",22),t.NdJ("click",function(){return o.form.controls.country.setValue("\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c")}),t._uU(34," \u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c "),t.qZA(),t.TgZ(35,"li",23),t.NdJ("click",function(){return o.form.controls.country.setValue("\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d")}),t._uU(36," \u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d "),t.qZA()(),t._UZ(37,"input",24),t.qZA()()()(),t.TgZ(38,"div",8)(39,"label",9),t._UZ(40,"input",25),t.qZA(),t.TgZ(41,"label",9),t._UZ(42,"input",26),t.qZA()(),t.TgZ(43,"div",8)(44,"label",9),t._UZ(45,"input",27),t.qZA(),t.TgZ(46,"label",9),t._UZ(47,"input",28),t.qZA()(),t.TgZ(48,"div",8)(49,"label",9),t._UZ(50,"input",29),t.qZA(),t.TgZ(51,"label",9),t._UZ(52,"input",30),t.qZA()(),t.TgZ(53,"div",8)(54,"label",9),t._UZ(55,"input",31),t.qZA()(),t.TgZ(56,"div",8)(57,"label",32),t.NdJ("change",function(){return o.onSaveFormToStorageClick()}),t._UZ(58,"input",33),t.TgZ(59,"span",34),t._uU(60,"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u0435 \u044d\u0442\u0443 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u0434\u043b\u044f \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044f \u0432\xa0\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0440\u0430\u0437"),t.qZA()()()(),t.TgZ(61,"button",35)(62,"span",36),t._uU(63,"\u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c"),t.qZA()()(),t.TgZ(64,"div",37)(65,"div",38),t._uU(66," \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0430\u043a\u0430\u0437 "),t.TgZ(67,"div",39),t._UZ(68,"span",40)(69,"span",41),t.qZA()(),t.TgZ(70,"div",42)(71,"h1",43),t._uU(72,"\u0438\u0442\u043e\u0433\u043e\u0432\u0430\u044f \u0441\u0443\u043c\u043c\u0430"),t.qZA(),t.TgZ(73,"div",44),t.YNc(74,x,19,5,"div",45),t.qZA(),t.TgZ(75,"div",46)(76,"div",47)(77,"div",48)(78,"div",49)(79,"span",50),t._uU(80,"\u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430"),t.qZA(),t.TgZ(81,"span",51),t._uU(82,"\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u043d\u0430\xa0\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u043c \u0448\u0430\u0433\u0435"),t.qZA()(),t.TgZ(83,"div",49)(84,"span",52),t._uU(85,"\u0438\u0442\u043e\u0433"),t.qZA(),t.TgZ(86,"span",53),t._uU(87),t.qZA()()()()()()()()()(),t.YNc(88,b,12,4,"div",54)),2&e&&(t.xp6(19),t.ekj("error",o.form.controls.email.invalid&&o.form.controls.email.touched),t.Q6J("formControl",o.form.controls.email),t.xp6(8),t.hij(" ",o.form.controls.country.value," "),t.xp6(10),t.Q6J("formControl",o.form.controls.country),t.xp6(3),t.ekj("error",o.form.controls.name.invalid&&o.form.controls.name.touched),t.Q6J("formControl",o.form.controls.name),t.xp6(2),t.ekj("error",o.form.controls.surname.invalid&&o.form.controls.surname.touched),t.Q6J("formControl",o.form.controls.surname),t.xp6(3),t.ekj("error",o.form.controls.city.invalid&&o.form.controls.city.touched),t.Q6J("formControl",o.form.controls.city),t.xp6(2),t.ekj("error",o.form.controls.index.invalid&&o.form.controls.index.touched),t.Q6J("formControl",o.form.controls.index),t.xp6(3),t.ekj("error",o.form.controls.street.invalid&&o.form.controls.street.touched),t.Q6J("formControl",o.form.controls.street),t.xp6(2),t.ekj("error",o.form.controls.house.invalid&&o.form.controls.house.touched),t.Q6J("formControl",o.form.controls.house),t.xp6(3),t.ekj("error",o.form.controls.phone.invalid&&o.form.controls.phone.touched),t.Q6J("formControl",o.form.controls.phone),t.xp6(6),t.ekj("disabled",o.form.invalid),t.Q6J("routerLink","/cut-delivery"),t.xp6(13),t.Q6J("ngForOf",o.generalService.selectedItems),t.xp6(13),t.hij("",o.generalService.getTotalCartPrice()," \u0440\u0443\u0431"),t.xp6(1),t.Q6J("ngIf",o.showModal&&o.addressArray.length>0))},directives:[u._Y,u.JL,u.Fj,u.JJ,u.oH,p.rH,a.sg,a.O5,a.mk],styles:[".popup[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;z-index:100;opacity:0;visibility:hidden;transition:.3s ease-in;display:flex;align-items:center;justify-content:center;&.open{opacity:1;visibility:visible;transition:.3s ease-in}}.popup__overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#00000026}.popup__content[_ngcontent-%COMP%]{padding:40px;position:relative;z-index:101;background-color:#fff}.popup__btn-close[_ngcontent-%COMP%]{position:absolute;top:12px;right:12px}.popup__title[_ngcontent-%COMP%]{display:block;margin-bottom:15px;color:#000;text-align:left;font-family:Romile,sans-serif;font-size:16px;font-style:normal;font-weight:400;line-height:normal}.popup__text[_ngcontent-%COMP%]{color:#000;text-align:center;font-size:20px;font-style:normal;font-weight:300;line-height:16px}.address__list[_ngcontent-%COMP%]{list-style:none;padding:16px 24px 20px;border:1px solid #d3d3d3;border-radius:20px}.address__item[_ngcontent-%COMP%]{&:not(:first-child){padding-top:16px;margin-top:16px;border-top:1px solid #d3d3d3}}.address-elem__wrap[_ngcontent-%COMP%]{display:flex;gap:20px;align-items:center;justify-content:space-between}.address-elem__id[_ngcontent-%COMP%]{font-weight:400;font-size:14px;line-height:normal;text-transform:uppercase;color:#23221e;white-space:nowrap}.address__info[_ngcontent-%COMP%]{font-weight:300;font-size:16px;line-height:normal;color:#000}@media all and (max-width: 650px){.address-elem__wrap[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between}.address__info[_ngcontent-%COMP%]{flex:1 1 100%;order:3}.address__content[_ngcontent-%COMP%]{padding-bottom:28px;margin-bottom:28px;border-bottom:1px solid #d3d3d3}}"],changeDetection:0}),n})()}];let T=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[h.m,p.Bz.forChild(w),u.UX]]}),n})()}}]);