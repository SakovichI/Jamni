"use strict";(self.webpackChunkjamni=self.webpackChunkjamni||[]).push([[774],{7774:(v,l,o)=>{o.r(l),o.d(l,{CutDeliveryModule:()=>g});var s=o(459),e=o(1223),d=o(6300),_=o(9808);function m(r,i){if(1&r){const u=e.EpF();e.TgZ(0,"div",36)(1,"div",37)(2,"picture"),e._UZ(3,"source",38)(4,"img",39),e.qZA(),e.TgZ(5,"div",40)(6,"h3",41),e._uU(7),e.qZA(),e.TgZ(8,"span",42),e._uU(9),e.qZA(),e.TgZ(10,"div",43)(11,"button",44),e.NdJ("click",function(){const n=e.CHM(u).$implicit;return e.oxw().generalService.deleteProduct(n)}),e._uU(12,"-"),e.qZA(),e.TgZ(13,"span",45),e._uU(14),e.qZA(),e.TgZ(15,"button",46),e.NdJ("click",function(){const n=e.CHM(u).$implicit;return e.oxw().generalService.addProduct(n)}),e._uU(16,"+"),e.qZA()()(),e.TgZ(17,"button",47),e.NdJ("click",function(){const n=e.CHM(u).$implicit;return e.oxw().generalService.deleteProduct(n)}),e._UZ(18,"img",48),e.qZA()()()}if(2&r){const u=i.$implicit,t=e.oxw();e.xp6(3),e.Q6J("srcset",u.product.coverImage||"assets/img/no-img-placeholder.svg",e.LSH),e.xp6(1),e.Q6J("src",u.product.coverImage||"assets/img/no-img-placeholder.svg",e.LSH),e.xp6(3),e.Oqu(u.product.name),e.xp6(2),e.hij("",t.generalService.getProductAmount(u)*u.product.price," \u0440\u0443\u0431"),e.xp6(5),e.Oqu(t.generalService.getProductAmount(u))}}const p=[{path:"",component:(()=>{class r{constructor(u){this.generalService=u,this.deliveryMethod="courier"}ngOnInit(){if(setTimeout(()=>{const u=document.querySelector('script[src="assets/main.js"]');u&&document.body.removeChild(u);const t=document.createElement("script");t.src="assets/main.js",document.body.appendChild(t)},500),localStorage.getItem("form")){const u=JSON.parse(localStorage.getItem("form"));this.email=u.email,this.address=[u.street+" "+u.house,u.index,u.city,"\u0420\u043e\u0441\u0441\u0438\u044f"].join(", ")}localStorage.getItem("delivery")?this.deliveryMethod=localStorage.getItem("delivery"):localStorage.setItem("delivery",this.deliveryMethod)}ngOnDestroy(){localStorage.setItem("delivery",this.deliveryMethod)}changeDelivery(u){this.deliveryMethod=u,localStorage.setItem("delivery",this.deliveryMethod)}}return r.\u0275fac=function(u){return new(u||r)(e.Y36(d.m))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],decls:63,vars:10,consts:[[1,"cut-delivery"],[1,"small-container"],[1,"cut-info__wrap"],[1,"breadcrumbs","cut-info__breadcrumbs"],[1,"breadcrumbs__link"],[1,"breadcrumbs__link","breadcrumbs__link--active"],["action","#",1,"cut-delivery__form","form","form-delivery"],[1,"form-delivery__inner","form-delivery__inner--border"],[1,"form__label","form-delivery__label"],[1,"form-delivery__title"],["name","contacts","type","text","disabled","",1,"form__textarea","form-delivery__textarea","input-reset"],[1,"form-delivery__btn","btn-reset",3,"routerLink"],["name","adres","type","text","disabled","",1,"form__textarea","form-delivery__textarea","input-reset"],[1,"form-delivery__inner"],[1,"custom-checkbox","form-delivery__checkbox"],["type","radio","name","delivery","value","courier",1,"custom-checkbox__field",3,"checked","change"],[1,"custom-checkbox__content","form-delivery__checkbox-content","form-info__text--light"],["type","radio","name","delivery","value","pickup",1,"custom-checkbox__field",3,"checked","change"],["type","button",1,"form-delivery__button","btn-reset","form__btn","btn-anim",3,"routerLink"],[1,"form__btn-text","form-delivery__btn-text","btn-anim__text"],[1,"form-delivery__link-back",3,"routerLink"],[1,"cut-info__result","result-cut","accordion"],[1,"result-cut__accordion-title","accordion__title"],[1,"accordion__icon"],[1,"accordion__icon-line","accordion__icon-line--horizontal"],[1,"accordion__icon-line","accordion__icon-line--vertical"],[1,"accordion__content"],[1,"result-cut__title"],["data-simplebar","",1,"result-cut__items"],["class","result-cut__item item-cut",4,"ngFor","ngForOf"],[1,"result-cut__sum","sum-cut"],[1,"sum-cut__wrap"],[1,"sum-cut__inner-text"],[1,"sum-cut__row"],[1,"sum-cut__title","sum-cut__title--lg"],[1,"sum-cut__txt","sum-cut__txt--lg"],[1,"result-cut__item","item-cut"],[1,"item-cut__wrap"],["type","image/webp",3,"srcset"],["loading","lazy","width","130","height","130","alt","prod-image",1,"image",3,"src"],["data-prod","result-cut",1,"item-cut__content"],[1,"item-cut__title"],[1,"item-cut__price"],[1,"item-cut__count","count-prod"],[1,"btn-reset","count-prod__minus",3,"click"],[1,"count-prod__count"],[1,"btn-reset","count-prod__plus",3,"click"],[1,"btn-reset","item-cut__delete",3,"click"],["src","assets/img/cut-img/delete-prod.png","width","20","height","20","alt","delete-icon",1,"item-cut__icon-delete"]],template:function(u,t){1&u&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"span",4),e._uU(5,"\u041a\u043e\u0440\u0437\u0438\u043d\u0430"),e.qZA(),e.TgZ(6,"span",4),e._uU(7,"\u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f"),e.qZA(),e.TgZ(8,"span",5),e._uU(9,"\u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430"),e.qZA(),e.TgZ(10,"span",4),e._uU(11,"\u043e\u043f\u043b\u0430\u0442\u0430"),e.qZA()(),e.TgZ(12,"form",6)(13,"div",7)(14,"label",8)(15,"span",9),e._uU(16,"\u041a\u043e\u043d\u0442\u0430\u043a\u0442"),e.qZA(),e.TgZ(17,"textarea",10),e._uU(18),e.qZA(),e.TgZ(19,"button",11),e._uU(20,"\u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c"),e.qZA()(),e.TgZ(21,"label",8)(22,"span",9),e._uU(23,"\u0430\u0434\u0440\u0435\u0441"),e.qZA(),e.TgZ(24,"textarea",12),e._uU(25),e.qZA(),e.TgZ(26,"button",11),e._uU(27,"\u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c"),e.qZA()()(),e.TgZ(28,"div",13)(29,"span",9),e._uU(30,"\u0441\u043f\u043e\u0441\u043e\u0431 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438 "),e.qZA(),e.TgZ(31,"label",14)(32,"input",15),e.NdJ("change",function(){return t.changeDelivery("courier")}),e.qZA(),e.TgZ(33,"span",16),e._uU(34,"\u041a\u0443\u0440\u044c\u0435\u0440"),e.qZA()(),e.TgZ(35,"label",14)(36,"input",17),e.NdJ("change",function(){return t.changeDelivery("self")}),e.qZA(),e.TgZ(37,"span",16),e._uU(38,"\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437 (\u041c\u043e\u0441\u043a\u0432\u0430, \u043c\u0435\u0442\u0440\u043e \u0412\u043e\u0434\u043d\u044b\u0439 \u0421\u0442\u0430\u0434\u0438\u043e\u043d, \u0421\u043e\u043b\u043d\u0435\u0447\u043d\u043e\u0433\u043e\u0440\u0441\u043a\u0430\u044f \u0443\u043b\u0438\u0446\u0430 4\u044130)"),e.qZA()()(),e.TgZ(39,"button",18)(40,"span",19),e._uU(41,"\u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a\xa0\u043e\u043f\u043b\u0430\u0442\u0435"),e.qZA()(),e.TgZ(42,"span",20),e._uU(43,"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a\xa0\u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438"),e.qZA()(),e.TgZ(44,"div",21)(45,"div",22),e._uU(46," \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0430\u043a\u0430\u0437 "),e.TgZ(47,"div",23),e._UZ(48,"span",24)(49,"span",25),e.qZA()(),e.TgZ(50,"div",26)(51,"h1",27),e._uU(52," \u0438\u0442\u043e\u0433\u043e\u0432\u0430\u044f \u0441\u0443\u043c\u043c\u0430 "),e.qZA(),e.TgZ(53,"div",28),e.YNc(54,m,19,5,"div",29),e.qZA(),e.TgZ(55,"div",30)(56,"div",31)(57,"div",32)(58,"div",33)(59,"span",34),e._uU(60,"\u0438\u0442\u043e\u0433"),e.qZA(),e.TgZ(61,"span",35),e._uU(62),e.qZA()()()()()()()()()()),2&u&&(e.xp6(18),e.Oqu(t.email),e.xp6(1),e.Q6J("routerLink","/cut-info"),e.xp6(6),e.Oqu(t.address),e.xp6(1),e.Q6J("routerLink","/cut-info"),e.xp6(6),e.Q6J("checked","courier"==t.deliveryMethod),e.xp6(4),e.Q6J("checked","self"==t.deliveryMethod),e.xp6(3),e.Q6J("routerLink","/cut-pay"),e.xp6(3),e.Q6J("routerLink","/cut-info"),e.xp6(12),e.Q6J("ngForOf",t.generalService.selectedItems),e.xp6(8),e.hij("",t.generalService.getTotalCartPrice()," \u0440\u0443\u0431"))},directives:[s.rH,_.sg],styles:[""],changeDetection:0}),r})()}];let g=(()=>{class r{}return r.\u0275fac=function(u){return new(u||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[s.Bz.forChild(p),_.ez]]}),r})()}}]);