"use strict";(self.webpackChunkjamni=self.webpackChunkjamni||[]).push([[976],{976:(F,_,n)=>{n.r(_),n.d(_,{LandingModule:()=>U});var g=n(7545),a=n(3075),u=n(7587),d=n(8752),b=n(9119),m=n(9808);const Z=["firstSliderNext"];function A(i,o){if(1&i&&(u.TgZ(0,"a",116)(1,"picture"),u._UZ(2,"source",117)(3,"img",118),u.qZA()()),2&i){const e=o.$implicit;u.Q6J("href","product/"+e.id,u.LSH),u.xp6(2),u.Q6J("srcset",e.coverImage||"assets/img/no-img-placeholder.svg",u.LSH),u.xp6(1),u.Q6J("src",e.coverImage||"assets/img/no-img-placeholder.svg",u.LSH)}}function E(i,o){if(1&i&&(u.TgZ(0,"a",119)(1,"picture"),u._UZ(2,"source",117)(3,"img",120),u.qZA()()),2&i){const e=o.$implicit;u.Q6J("href","product/"+e.id,u.LSH),u.xp6(2),u.Q6J("srcset",e.coverImage||"assets/img/no-img-placeholder.svg",u.LSH),u.xp6(1),u.Q6J("src",e.coverImage||"assets/img/no-img-placeholder.svg",u.LSH)}}function h(i,o){if(1&i&&(u.TgZ(0,"div",121)(1,"a",122),u._UZ(2,"div",123),u.TgZ(3,"span",124),u._uU(4),u.qZA()()()),2&i){const e=o.$implicit;u.xp6(1),u.Q6J("href","product/"+e.id,u.LSH)("routerLink","product/"+e.id),u.xp6(1),u.Udp("background-image","url("+e.coverImage||0),u.xp6(2),u.Oqu(e.name)}}function C(i,o){if(1&i){const e=u.EpF();u.TgZ(0,"li",125)(1,"a",126),u.NdJ("mouseenter",function(){const r=u.CHM(e).$implicit;return u.oxw().hover(r.name)}),u.TgZ(2,"span",127),u._uU(3),u.qZA(),u._uU(4),u.qZA()()}if(2&i){const e=o.$implicit,t=o.index;u.xp6(1),u.Q6J("href","category/"+e.id,u.LSH)("routerLink","category/"+e.id),u.xp6(2),u.Oqu("("+(t+1)+")"),u.xp6(1),u.hij(" ",e.name," ")}}const v=function(i,o,e,t,s,r,l){return{"categories__bg--product":i,"categories__bg--pufs":o,"categories__bg--sofas":e,"categories__bg--furniture":t,"categories__bg--chairs":s,"categories__bg--bed":r,"categories__bg--armchair":l}};let f=(()=>{class i{constructor(e,t,s,r,l){this.cdr=e,this.apiCategoryService=t,this.makeOrder=s,this.makeFeedback=r,this.route=l,this.sliderItems=[],this.bestsellers=[],this.categories=[],this.categoriesName="\u041a\u0430\u0442\u0430\u043b\u043e\u0433 \u0442\u043e\u0432\u0430\u0440\u043e\u0432",this.form=new a.cw({email:new a.NI(null,[a.kI.required,a.kI.email])}),setTimeout(()=>{const c=document.querySelector('script[src="assets/main.js"]');c&&document.body.removeChild(c);const p=document.createElement("script");p.src="assets/main.js",document.body.appendChild(p)},1e3)}ngOnInit(){this.apiCategoryService.listCategories().subscribe(e=>{this.categories=e;for(let t=0;t<e[0].childCategoryIds.length;++t)this.apiCategoryService.getCategory(e[0].childCategoryIds[t]).subscribe(s=>{for(let r=0;r<s.items.filter(l=>!0===l.enabled).length;r++)1086!==s.items[r].id&&this.sliderItems.push(s.items.filter(l=>!0===l.enabled)[r]);this.cdr.detectChanges()});this.apiCategoryService.getCategory(e[1].id).subscribe(t=>{for(let s=0;s<t.items.filter(r=>!0===r.enabled).length;s++)this.bestsellers.push(t.items.filter(r=>!0===r.enabled)[s]);this.cdr.detectChanges()})},e=>{"Invalid authorization token: Unexpected content JWS."===e.error.description&&(this.route.navigate(["/"]),localStorage.clear())})}ngOnDestroy(){clearInterval(this.firstInterval)}submitForm(e){const t=new FormData(e),s=new FormData,r={request:{type:"SUBSCRIBE",body:{email:t.get("email")}}},l=new Blob([JSON.stringify(r.request)],{type:"application/json"});s.append("request",l,"request"),this.makeFeedback.makeFeedback(s).subscribe(c=>{this.form.reset()})}hover(e){this.categoriesName=e}}return i.\u0275fac=function(e){return new(e||i)(u.Y36(u.sBO),u.Y36(d.nN),u.Y36(d.oy),u.Y36(b.Q),u.Y36(g.F0))},i.\u0275cmp=u.Xpm({type:i,selectors:[["ng-component"]],viewQuery:function(e,t){if(1&e&&u.Gf(Z,5),2&e){let s;u.iGM(s=u.CRH())&&(t.firstSliderNext=s.first)}},decls:231,vars:21,consts:[[1,"hero"],[1,"container"],[1,"hero__wrap"],[1,"hero__slider","slider"],[1,"slider-wrapper"],["class","slider-slide slide",3,"href",4,"ngFor","ngForOf"],[1,"btn-reset","slider__btn","slider__btn-prev"],["xmlns","http://www.w3.org/2000/svg","width","39","height","39","viewBox","0 0 39 39","fill","none"],["cx","19.5","cy","19.5","r","19","stroke","#E8E8E8"],["d","M22 25L15.9999 18.9999L22 12.9998","stroke","black","stroke-linecap","round"],[1,"btn-reset","slider__btn","slider__btn-next"],["firstSliderNext",""],[1,"hero__slider-thumbs","slider-thumbs"],[1,"slider-thumbs__wrapper"],["class","slider-thumbs__slide slide-thumbs",3,"href",4,"ngFor","ngForOf"],[1,"hero__content"],[1,"hero__date"],["xmlns","http://www.w3.org/2000/svg","width","22","height","1","viewBox","0 0 22 1","fill","none"],["d","M1 0.5H21","stroke","black","stroke-width","0.5","stroke-linecap","round"],[1,"hero__title"],[1,"bestsellers"],[1,"container","bestsellers__container"],[1,"bestsellers__title"],[1,"bestsellers__slider","slider-bestseller"],[1,"bestsellers__link",3,"href","routerLink"],["xmlns","http://www.w3.org/2000/svg","width","26","height","4","viewBox","0 0 26 4","fill","none"],["d","M25.1768 2.17678C25.2744 2.07915 25.2744 1.92085 25.1768 1.82322L23.5858 0.232233C23.4882 0.134602 23.3299 0.134602 23.2322 0.232233C23.1346 0.329864 23.1346 0.488155 23.2322 0.585786L24.6464 2L23.2322 3.41421C23.1346 3.51184 23.1346 3.67014 23.2322 3.76777C23.3299 3.8654 23.4882 3.8654 23.5858 3.76777L25.1768 2.17678ZM0 2.25H25V1.75H0V2.25Z","fill","black"],[1,"slider-bestseller__wrap"],["class","slider-bestseller__slide",4,"ngFor","ngForOf"],[1,"slider-bestseller__control"],[1,"btn-reset","slider-bestseller__btn","slider-bestseller__btn-prev"],[1,"slider-bestseller__scrollbar"],[1,"btn-reset","slider-bestseller__btn","slider-bestseller__btn-next"],[1,"categories"],[1,"categories__list","categories__list--product"],[1,"categories__bg","categories__bg--product",3,"ngClass"],["class","categories__item",4,"ngFor","ngForOf"],[1,"about-brand"],[1,"container","about-brand__container"],[1,"about-brand__title"],[1,"about-brand__subtitle"],[1,"about-brand__content","content-brand"],[1,"content-brand__text"],["src","assets/img/logo-text.png","loading","lazy","alt","logo",1,"content-brand__logo"],[1,"content-brand__images"],["srcset","assets/img/about-brand/brand1.webp","type","image/webp"],["loading","lazy","src","assets/img/about-brand/brand1.jpg","width","470px","height","430px","alt","brand_img",1,"image","content-brand__image"],["srcset","assets/img/about-brand/brand2.webp","type","image/webp"],["loading","lazy","src","assets/img/about-brand/brand2.jpg","width","300","height","300","alt","brand_img",1,"image","content-brand__image"],[1,"about-brand__services","services-brand"],[1,"services-brand__line"],[1,"services-brand__column"],[1,"services-brand__title"],[1,"services-brand__content"],["src","assets/img/about-brand/3d.svg","alt","icon",1,"services-brand__img"],[1,"services-brand__txt"],["src","assets/img/about-brand/medal.svg","alt","icon",1,"services-brand__img"],["src","assets/img/about-brand/crown.svg","alt","icon",1,"services-brand__img"],["src","assets/img/about-brand/delivery.svg","alt","icon",1,"services-brand__img"],[1,"projects"],[1,"projects__title"],[1,"projects__subtitle"],[1,"projects__slider","slider-project"],[1,"slider-project__wrap"],[1,"slider-project__slide"],["srcset","assets/img/project-slide/slide2.webp","type","image/webp"],["loading","lazy","src","assets/img/project-slide/slide2.png","alt","our_projects",1,"image","slider-project__image"],[1,"slider-project__title"],[1,"slider-project__decription"],["srcset","assets/img/project-slide/slide3.webp","type","image/webp"],["loading","lazy","src","assets/img/project-slide/slide3.png","alt","our_projects",1,"image","slider-project__image"],["srcset","assets/img/project-slide/slide1.webp","type","image/webp"],["loading","lazy","src","assets/img/project-slide/slide1.jpg","alt","our_projects",1,"image","slider-project__image"],["srcset","assets/img/project-slide/slide4.webp","type","image/webp"],["loading","lazy","src","assets/img/project-slide/slide4.jpg","alt","our_projects",1,"image","slider-project__image"],["srcset","assets/img/project-slide/slide5.webp","type","image/webp"],["loading","lazy","src","assets/img/project-slide/slide5.jpg","alt","our_projects",1,"image","slider-project__image"],[1,"slider-project__control"],[1,"slider-project__btn","slider-project__btn--prev","btn-reset"],[1,"slider-project__scrollbar"],[1,"slider-project__btn","slider-project__btn--next","btn-reset"],[1,"video"],["src","#","poster","assets/img/video-prev/video1.jpg","width","1920","height","530"],["xmlns","http://www.w3.org/2000/svg","width","67","height","67","viewBox","0 0 67 67","fill","none",1,"video__btn"],["cx","33.5","cy","33.5","rx","33.5","ry","33.5","transform","rotate(-180 33.5 33.5)","fill","white"],["d","M42.0284 31.7728C43.3239 32.5256 43.3239 34.4744 42.0284 35.2272L30.8063 41.7485C29.5473 42.4802 28 41.5279 28 40.0213L28 26.9787C28 25.4721 29.5473 24.5198 30.8063 25.2515L42.0284 31.7728Z","fill","black"],[1,"offer"],[1,"offer__inner"],["srcset","assets/img/offer-block/offer1.webp","type","image/webp"],["loading","lazy","src","assets/img/offer-block/offer1.png","width","540","height","516","alt","offer_img",1,"image","offer__image"],[1,"offer__content"],[1,"offer__title"],[1,"offer__text"],["href","load-project",1,"offer__link",3,"routerLink"],[1,"offer__btn"],[1,"callback"],[1,"callback__inner"],[1,"callback__text"],["href","/load-project",1,"callback__link",3,"routerLink"],["src","assets/img/logo_black.png","alt","logo","width","128px","height","47px",1,"callback__img"],[1,"mailing"],[1,"small-container"],[1,"mailing__inner"],[1,"mailing__content"],[1,"mailing__title"],[1,"mailing__subtitle"],[1,"mailing__subtitle--bold"],["action","#","enctype","multipart/form-data",1,"mailing__form","form-mailing",3,"formGroup","ngSubmit"],[1,"form-mailing__label"],["name","email","type","text","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0432\u043e\u0439 \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b","formControlName","email",1,"form-mailing__input"],["type","submit",1,"btn-reset","form-mailing__btn","btn-anim",3,"disabled"],[1,"btn-anim__text"],[1,"form-mailing__icon"],[0,"xlink","href","assets/img/sprite.svg#mail"],["srcset","assets/img/offer-block/offer-mobile.webp","type","image/webp"],["loading","lazy","src","assets/img/offer-block/offer-mobile.png","width","256","height","536","alt","mailing-image",1,"image","mailing__image"],[1,"slider-slide","slide",3,"href"],["type","image/webp",3,"srcset"],["loading","lazy","width","651","height","726","alt","slide1",1,"image",3,"src"],[1,"slider-thumbs__slide","slide-thumbs",3,"href"],["loading","lazy","width","187","height","187","alt","slide",1,"image","slide-thumbs__image",3,"src"],[1,"slider-bestseller__slide"],[1,"slider-bestseller__link",3,"href","routerLink"],[1,"bestseller-image-container"],[1,"slider-bestseller__text"],[1,"categories__item"],[1,"categories__link",3,"href","routerLink","mouseenter"],[1,"categories__count"]],template:function(e,t){1&e&&(u.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),u.YNc(5,A,4,3,"a",5),u.qZA(),u.TgZ(6,"button",6),u.O4$(),u.TgZ(7,"svg",7),u._UZ(8,"circle",8)(9,"path",9),u.qZA()(),u.kcU(),u.TgZ(10,"button",10,11),u.O4$(),u.TgZ(12,"svg",7),u._UZ(13,"circle",8)(14,"path",9),u.qZA()()(),u.kcU(),u.TgZ(15,"div",12)(16,"div",13),u.YNc(17,E,4,3,"a",14),u.qZA()(),u.TgZ(18,"div",15)(19,"span",16),u._uU(20," 2015 "),u.O4$(),u.TgZ(21,"svg",17),u._UZ(22,"path",18),u.qZA(),u._uU(23," 2023 "),u.qZA(),u.kcU(),u.TgZ(24,"h1",19),u._uU(25," \u0418\u0437\u044b\u0441\u043a\u0430\u043d\u043d\u0430\u044f "),u._UZ(26,"br"),u._uU(27,"\u043c\u0435\u0431\u0435\u043b\u044c\xa0\u2014 \u043e\u0436\u0438\u0432\u043b\u044f\u044e\u0449\u0430\u044f"),u._UZ(28,"br"),u._uU(29,"\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u043e "),u.qZA()()()()(),u.TgZ(30,"section",20)(31,"div",21)(32,"h2",22),u._uU(33,"\u0431\u0435\u0441\u0442\u0441\u0435\u043b\u043b\u0435\u0440\u044b"),u.qZA(),u.TgZ(34,"div",23)(35,"a",24),u._uU(36,"\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 "),u.O4$(),u.TgZ(37,"svg",25),u._UZ(38,"path",26),u.qZA()(),u.kcU(),u.TgZ(39,"div",27),u.YNc(40,h,5,5,"div",28),u.qZA(),u.TgZ(41,"div",29)(42,"button",30),u.O4$(),u.TgZ(43,"svg",7),u._UZ(44,"circle",8)(45,"path",9),u.qZA()(),u.kcU(),u._UZ(46,"div",31),u.TgZ(47,"button",32),u.O4$(),u.TgZ(48,"svg",7),u._UZ(49,"circle",8)(50,"path",9),u.qZA()()()()()(),u.kcU(),u.TgZ(51,"section",33)(52,"div",1)(53,"ul",34),u._UZ(54,"li",35),u.YNc(55,C,5,4,"li",36),u.qZA()()(),u.TgZ(56,"section",37)(57,"div",38)(58,"h2",39),u._uU(59,"\u043e\xa0\u0431\u0440\u0435\u043d\u0434\u0435"),u.qZA(),u.TgZ(60,"span",40),u._uU(61,"\u041f\u043e\u0437\u043d\u0430\u043a\u043e\u043c\u0438\u043c\u0441\u044f"),u.qZA(),u.TgZ(62,"div",41)(63,"p",42),u._UZ(64,"img",43),u._uU(65," \u044d\u0442\u043e \u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442\u043d\u043e\u0435 \u0430\u0442\u0435\u043b\u044c\u0435 \u0441 \u0434\u0440\u0443\u0436\u043d\u043e\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u043e\u0439 \u0435\u0434\u0438\u043d\u043e\u043c\u044b\u0448\u043b\u0435\u043d\u043d\u0438\u043a\u043e\u0432, \u0438\u0441\u043a\u0440\u0435\u043d\u043d\u0435 \u043b\u044e\u0431\u044f\u0449\u0438\u0445 \u0441\u0432\u043e\u0435 \u0434\u0435\u043b\u043e. \u0414\u043b\u044f \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u0438\u0437\xa0\u043d\u0430\u0441 \u044d\u0442\u043e \u043d\u0435\xa0\u043f\u0440\u043e\u0441\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u0430, \u044d\u0442\u043e \u043e\u0434\u043d\u0430 \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0430\u044f \u0436\u0438\u0437\u043d\u044c, \u0433\u0434\u0435 \u043c\u044b\xa0\u0441\u043e\u0437\u0434\u0430\u0451\u043c \u043b\u0451\u0433\u043a\u0438\u0435, \u044f\u0440\u043a\u0438\u0435 \u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u0432\u0435\u0449\u0438 \u0434\u043b\u044f \u0434\u043e\u043c\u0430 \u0438\xa0\u0441\u0430\u0434\u0430."),u._UZ(66,"br")(67,"br"),u._uU(68," \u0412\u043f\u0435\u0440\u0435\u0434\u0438 \u0435\u0449\u0451 \u043c\u043d\u043e\u0433\u043e \u043e\u0442\u043a\u0440\u044b\u0442\u0438\u0439, \u0437\u043d\u0430\u043a\u043e\u043c\u0441\u0442\u0432\u043e \u0441\xa0\u043a\u043e\u0442\u043e\u0440\u044b\u043c\u0438 \u0432\u0430\u043c \u043f\u0440\u0435\u0434\u0441\u0442\u043e\u0438\u0442 \u043d\u0430\xa0\u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430\u0445 \u043d\u0430\u0448\u0435\u0433\u043e \u0441\u0430\u0439\u0442\u0430. "),u.qZA(),u.TgZ(69,"div",44)(70,"picture"),u._UZ(71,"source",45)(72,"img",46),u.qZA(),u.TgZ(73,"picture"),u._UZ(74,"source",47)(75,"img",48),u.qZA()()(),u.TgZ(76,"div",49)(77,"div",50)(78,"div",51)(79,"span",52),u._uU(80,"01"),u.qZA(),u.TgZ(81,"div",53),u._UZ(82,"img",54),u.TgZ(83,"span",55),u._uU(84,"3D-\u043c\u043e\u0434\u0435\u043b\u044c "),u._UZ(85,"br"),u._uU(86," \u043c\u0435\u0431\u0435\u043b\u0438"),u.qZA()()()(),u.TgZ(87,"div",50)(88,"div",51)(89,"span",52),u._uU(90,"02"),u.qZA(),u.TgZ(91,"div",53),u._UZ(92,"img",56),u.TgZ(93,"span",55),u._uU(94,"\u0433\u0430\u0440\u0430\u043d\u0442\u0438\u044f \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430"),u._UZ(95,"br"),u._uU(96,"\u0438\xa0\u0441\u0440\u043e\u043a\u043e\u0432"),u.qZA()()()(),u.TgZ(97,"div",50)(98,"div",51)(99,"span",52),u._uU(100,"03"),u.qZA(),u.TgZ(101,"div",53),u._UZ(102,"img",57),u.TgZ(103,"span",55),u._uU(104,"\u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u044b\u0439"),u._UZ(105,"br"),u._uU(106,"\u0437\u0430\u043a\u0430\u0437"),u.qZA()()()(),u.TgZ(107,"div",50)(108,"div",51)(109,"span",52),u._uU(110,"04"),u.qZA(),u.TgZ(111,"div",53),u._UZ(112,"img",58),u.TgZ(113,"span",55),u._uU(114,"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 "),u._UZ(115,"br"),u._uU(116,"\u0438\xa0\u043c\u043e\u043d\u0442\u0430\u0436"),u.qZA()()()()()()(),u.TgZ(117,"section",59)(118,"div",1)(119,"h2",60),u._uU(120,"\u043d\u0430\u0448\u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u044b"),u.qZA(),u.TgZ(121,"span",61),u._uU(122," \u0441\xa0\u0434\u0443\u0448\u043e\u0439 \u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0438\u0434\u0435\u0438 "),u.qZA(),u.TgZ(123,"div",62)(124,"div",63)(125,"div",64)(126,"picture"),u._UZ(127,"source",65)(128,"img",66),u.qZA(),u.TgZ(129,"h3",67),u._uU(130,"\u0414\u0418\u0412\u0410\u041d\u042b \u0418\xa0\u041a\u0420\u0415\u0421\u041b\u0410 \u0427\u0415\u0421\u0422\u0415\u0420\u0424\u0418\u041b\u0414"),u.qZA(),u.TgZ(131,"p",68),u._uU(132," \u041a\u0430\u043a \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0442\u0440\u0430\u0434\u0438\u0446\u0438\u043e\u043d\u043d\u0443\u044e \u043c\u044f\u0433\u043a\u0443\u044e \u043c\u0435\u0431\u0435\u043b\u044c \u043f\u0440\u0438 \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u0438 \u0438\u043d\u0442\u0435\u0440\u044c\u0435\u0440\u043e\u0432 \u0432 \u0440\u0430\u0437\u043d\u044b\u0445 \u0441\u0442\u0438\u043b\u044f\u0445. "),u.qZA()(),u.TgZ(133,"div",64)(134,"picture"),u._UZ(135,"source",69)(136,"img",70),u.qZA(),u.TgZ(137,"h3",67),u._uU(138,"Jamni \u043d\u0430\xa0HELPER\u2019S BAZAR"),u.qZA(),u.TgZ(139,"p",68),u._uU(140," \u041f\u043e\u0433\u0440\u0443\u0437\u0438\u0442\u0435\u0441\u044c \u0432\xa0\u044d\u0442\u043e\u0442 \u0434\u0435\u043d\u044c \u0432\u043c\u0435\u0441\u0442\u0435 \u0441\xa0\u043d\u0430\u043c\u0438 \u0438\xa0\u043d\u0430\u0448\u0435\u0439 \u043c\u0435\u0431\u0435\u043b\u044c\u044e. "),u.qZA()(),u.TgZ(141,"div",64)(142,"picture"),u._UZ(143,"source",71)(144,"img",72),u.qZA(),u.TgZ(145,"h3",67),u._uU(146," \u042d\u0444\u0438\u0440\u044b \u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0438 \xab\u0414\u0430\u0447\u043d\u044b\u0439 \u043e\u0442\u0432\u0435\u0442\xbb \u0441\xa0\u043d\u0430\u0448\u0435\u0439 \u043c\u0435\u0431\u0435\u043b\u044c\u044e "),u.qZA(),u.TgZ(147,"p",68),u._uU(148," \u0418\u043d\u043e\u0433\u0434\u0430 \u0433\u0435\u0440\u043e\u044f\u043c\u0438 \u043f\u0435\u0440\u0435\u0434\u0430\u0447 \u0441\u0442\u0430\u043d\u043e\u0432\u044f\u0442\u0441\u044f \u0438\u0437\u0434\u0435\u043b\u0438\u044f \u0438\u0437\xa0\u043d\u0430\u0448\u0435\u0439 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u043e\u0439 \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438, \u0430\xa0\u0438\u043d\u043e\u0433\u0434\u0430 \u043d\u0430\u043c \u0432\u044b\u043f\u0430\u0434\u0430\u0435\u0442 \u0431\u043e\u043b\u044c\u0448\u0430\u044f \u0447\u0435\u0441\u0442\u044c\xa0\u2014 \u0438\u0437\u0433\u043e\u0442\u0430\u0432\u043b\u0438\u0432\u0430\u0442\u044c \u043c\u0435\u0431\u0435\u043b\u044c \u043f\u043e\xa0\u044d\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u043d\u044b\u043c \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c \u0430\u0432\u0442\u043e\u0440\u043e\u0432! "),u.qZA()(),u.TgZ(149,"div",64)(150,"picture"),u._UZ(151,"source",73)(152,"img",74),u.qZA(),u.TgZ(153,"h3",67),u._uU(154," \u0444\u043e\u0442\u043e \u0441\xa0\u043d\u0430\u0448\u0435\u0439 \u043c\u0435\u0431\u0435\u043b\u044c\u044e \u0432\xa0\u0438\u043d\u0442\u0435\u0440\u044c\u0435\u0440\u0430\u0445 \u043f\u043e\u043a\u0443\u043f\u0430\u0442\u0435\u043b\u0435\u0439 "),u.qZA(),u.TgZ(155,"p",68),u._uU(156," \u041f\u043e\u0434\u0431\u043e\u0440\u043a\u0430 \u0444\u043e\u0442\u043e \u043e\u0442\xa0\u043d\u0430\u0448\u0438\u0445 \u043f\u043e\u043a\u0443\u043f\u0430\u0442\u0435\u043b\u0435\u0439 "),u.qZA()(),u.TgZ(157,"div",64)(158,"picture"),u._UZ(159,"source",75)(160,"img",76),u.qZA(),u.TgZ(161,"h3",67),u._uU(162,"\u041a\u0430\u043a \u0443\u0441\u0442\u0440\u043e\u0435\u043d\u044b \u043d\u0430\u0448\u0438 \u043a\u0440\u043e\u0432\u0430\u0442\u0438"),u.qZA(),u.TgZ(163,"p",68),u._uU(164," \u041e\u0442\u0432\u0435\u0447\u0430\u0435\u043c \u043d\u0430\xa0\u0432\u0430\u0448\u0438 \u0432\u043e\u043f\u0440\u043e\u0441\u044b \u043e\xa0\u043d\u0430\u0448\u0438\u0445 \u043a\u0440\u043e\u0432\u0430\u0442\u044f\u0445. "),u.qZA()()(),u.TgZ(165,"div",77)(166,"button",78),u.O4$(),u.TgZ(167,"svg",7),u._UZ(168,"circle",8)(169,"path",9),u.qZA()(),u.kcU(),u._UZ(170,"div",79),u.TgZ(171,"button",80),u.O4$(),u.TgZ(172,"svg",7),u._UZ(173,"circle",8)(174,"path",9),u.qZA()()()()()(),u.kcU(),u.TgZ(175,"section",81),u._UZ(176,"video",82),u.O4$(),u.TgZ(177,"svg",83),u._UZ(178,"ellipse",84)(179,"path",85),u.qZA()(),u.kcU(),u.TgZ(180,"section",86)(181,"div",1)(182,"div",87)(183,"picture"),u._UZ(184,"source",88)(185,"img",89),u.qZA(),u.TgZ(186,"div",90)(187,"h2",91),u._uU(188," \u0412\u043e\u043f\u043b\u043e\u0442\u0438\u043c \u0432\u0430\u0448 \u043f\u0440\u043e\u0435\u043a\u0442 "),u._UZ(189,"br"),u._uU(190,"\u0432\xa0\u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u0443\u044e \u043c\u0435\u0431\u0435\u043b\u044c "),u.qZA(),u.TgZ(191,"p",92),u._uU(192," \u041a\u043e\u043c\u0430\u043d\u0434\u0430 Jamni \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0435\u0442 \u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c \u0441\xa0\u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u0430\u043c\u0438! \u0420\u0430\u0431\u043e\u0442\u0430\u0442\u044c \u0441\xa0\u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u043e\u0440\u0430\u043c\u0438, \u0434\u0438\u0437\u0430\u0439\u043d\u0435\u0440\u0430\u043c\u0438 \u0438\xa0\u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c\u0438\xa0\u2014 \u043d\u0430\u0448\u0430 \u0441\u0442\u0440\u0430\u0441\u0442\u044c, \u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0434\u0435\u043b\u0430\u0442\u044c \u044d\u0442\u043e \u0432\u043c\u0435\u0441\u0442\u0435! \u041c\u044b\xa0\u0432\u0441\u0435\u0433\u0434\u0430 \u0433\u043e\u0442\u043e\u0432\u044b \u0432\u0441\u0442\u0440\u0435\u0442\u0438\u0442\u044c\u0441\u044f \u0441\xa0\u0432\u0430\u043c\u0438 \u0432\xa0\u0428\u043e\u0443 \u0420\u0443\u043c\u0435, \u043f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c \u0438\xa0\u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b, \u0434\u0430\u0442\u044c \u0434\u043e\u0441\u0442\u0443\u043f \u043a\xa0\u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438 \u043e\u0446\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u043c\u043e\u0434\u0435\u043b\u0435\u0439. "),u._UZ(193,"br")(194,"br"),u._uU(195," \u0415\u0441\u043b\u0438 \u0443\xa0\u0432\u0430\u0441 \u0435\u0441\u0442\u044c \u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u044b\u0439 \u0437\u0430\u043f\u0440\u043e\u0441, \u043f\u0440\u043e\u0435\u043a\u0442 \u0438\u043b\u0438 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u043d\u0430\u0439\u0442\u0438 \u0438\xa0\u0440\u0435\u0430\u043b\u0438\u0437\u043e\u0432\u0430\u0442\u044c \u043d\u0435\u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u043e\u0435 \u0440\u0435\u0448\u0435\u043d\u0438\u0435 "),u.qZA(),u.TgZ(196,"a",93),u._uU(197,"\u0434\u043b\u044f \u0432\u0430\u0448\u0435\u0433\u043e \u0434\u043e\u043c\u0430 \u0438\u043b\u0438 \u0441\u0430\u0434\u0430\xa0\u2014 "),u.TgZ(198,"span",94),u._uU(199,"\u0432\u0430\u043c \u0441\u044e\u0434\u0430"),u.qZA()()()()()(),u.TgZ(200,"section",95)(201,"div",1)(202,"div",96)(203,"p",97),u._uU(204," \u0415\u0441\u043b\u0438 \u0443\xa0\u0432\u0430\u0441, \u043a\u0430\u043a \u0443\xa0\u0434\u0438\u0437\u0430\u0439\u043d\u0435\u0440\u0430, \u0443\u0436\u0435 \u0435\u0441\u0442\u044c \u0433\u043e\u0442\u043e\u0432\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442 \u0438\xa0\u0432\u044b\xa0\u0438\u0449\u0435\u0442\u0435 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0435\u0433\u043e \u0440\u0435\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a\xa0\u043d\u0430\u043c "),u.qZA(),u.TgZ(205,"a",98),u._UZ(206,"img",99),u.qZA(),u.TgZ(207,"p",97),u._uU(208," \u0415\u0441\u043b\u0438 \u0432\u044b\xa0\u0445\u043e\u0442\u0438\u0442\u0435 \u0437\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0434\u0438\u0437\u0430\u0439\u043d-\u043f\u0440\u043e\u0435\u043a\u0442, \u043c\u044b\xa0\u0441\xa0\u0443\u0434\u043e\u0432\u043e\u043b\u044c\u0441\u0442\u0432\u0438\u0435\u043c \u043f\u043e\u043c\u043e\u0436\u0435\u043c \u0432\u0430\u043c \u0441\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f \u0441 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u043c \u0434\u0438\u0437\u0430\u0439\u043d\u0435\u0440\u043e\u043c \u0434\u043b\u044f \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u0447\u0435\u0441\u0442\u0432\u0430 "),u.qZA()()()(),u.TgZ(209,"section",100)(210,"div",101)(211,"div",102)(212,"div",103)(213,"h2",104),u._uU(214,"\u043f\u043e\u0434\u043f\u0438\u0448\u0438\u0442\u0435\u0441\u044c \u043d\u0430\xa0\u043d\u0430\u0448\u0443 \u0440\u0430\u0441\u0441\u044b\u043b\u043a\u0443"),u.qZA(),u.TgZ(215,"span",105),u._uU(216,"\u043f\u043e\u043b\u0443\u0447\u0430\u0439\u0442\u0435 "),u.TgZ(217,"span",106),u._uU(218,"\u0441\u043a\u0438\u0434\u043a\u0438"),u.qZA(),u._uU(219," \u0438\xa0\u0441\u0443\u043f\u0435\u0440 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f"),u.qZA(),u.TgZ(220,"form",107),u.NdJ("ngSubmit",function(r){return t.submitForm(r.target)}),u.TgZ(221,"label",108),u._UZ(222,"input",109),u.qZA(),u.TgZ(223,"button",110)(224,"span",111),u.O4$(),u.TgZ(225,"svg",112),u._UZ(226,"use",113),u.qZA(),u._uU(227,"\u041f\u041e\u0414\u041f\u0418\u0421\u0410\u0422\u042c\u0421\u042f"),u.qZA()()()(),u.kcU(),u.TgZ(228,"picture"),u._UZ(229,"source",114)(230,"img",115),u.qZA()()()()),2&e&&(u.xp6(5),u.Q6J("ngForOf",t.sliderItems),u.xp6(12),u.Q6J("ngForOf",t.sliderItems),u.xp6(18),u.Q6J("href","category/"+(null==t.categories[1]?null:t.categories[1].id),u.LSH)("routerLink","category/"+(null==t.categories[1]?null:t.categories[1].id)),u.xp6(5),u.Q6J("ngForOf",t.bestsellers),u.xp6(14),u.Q6J("ngClass",u.Hh0(13,v,"\u041a\u0430\u0442\u0430\u043b\u043e\u0433 \u0442\u043e\u0432\u0430\u0440\u043e\u0432"===t.categoriesName,"\u041f\u0443\u0444\u044b \u0438 \u0431\u0430\u043d\u043a\u0435\u0442\u043a\u0438"===t.categoriesName,"\u0414\u0438\u0432\u0430\u043d\u044b"===t.categoriesName,"\u0411\u0435\u0441\u043a\u0430\u0440\u043a\u0430\u0441\u043d\u0430\u044f \u043c\u0435\u0431\u0435\u043b\u044c"===t.categoriesName,"\u0421\u0442\u0443\u043b\u044c\u044f"===t.categoriesName,"\u041a\u0440\u043e\u0432\u0430\u0442\u0438"===t.categoriesName,"\u041a\u0440\u0435\u0441\u043b\u0430"===t.categoriesName)),u.xp6(1),u.Q6J("ngForOf",t.categories),u.xp6(141),u.Q6J("routerLink","load-project"),u.xp6(9),u.Q6J("routerLink","load-project"),u.xp6(15),u.Q6J("formGroup",t.form),u.xp6(2),u.ekj("error",t.form.controls.email.invalid&&t.form.controls.email.touched),u.xp6(1),u.Q6J("disabled",t.form.invalid))},directives:[m.sg,g.yS,m.mk,a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u],styles:[".bestseller-image-container[_ngcontent-%COMP%]{background-repeat:no-repeat;background-size:cover;width:360px;height:550px;background-position:center center}"]}),i})();var B=n(4466);const D=[{path:"",component:f}];let U=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=u.oAB({type:i}),i.\u0275inj=u.cJS({imports:[[B.m,g.Bz.forChild(D),a.u5]]}),i})()}}]);