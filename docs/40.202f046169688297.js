"use strict";(self.webpackChunkjamni=self.webpackChunkjamni||[]).push([[40],{3040:(O,r,o)=>{o.r(r),o.d(r,{CatalogModule:()=>y});var g=o(7545),t=o(7587),u=o(8752),d=o(6300),p=o(4487),h=o(9808);function f(e,i){if(1&e&&(t.TgZ(0,"li",10)(1,"a",11),t._UZ(2,"img",12),t.TgZ(3,"p",13),t._uU(4),t.qZA()()()),2&e){const n=i.$implicit;t.xp6(1),t.Q6J("routerLink","/category/"+n.id),t.xp6(1),t.Q6J("src",n.image,t.LSH),t.xp6(2),t.Oqu(n.name)}}let C=(()=>{class e{constructor(n,s,c,l){this.cdr=n,this.apiCategory=s,this.generalService=c,this.loader=l,this.categories=[],setTimeout(()=>{const a=document.querySelector('script[src="assets/main.js"]');a&&document.body.removeChild(a);const m=document.createElement("script");m.src="assets/main.js",document.body.appendChild(m)},1e3)}ngOnInit(){this.loader.setLoader(!0),this.apiCategory.listCategories().subscribe(n=>{let s,c;this.categories=n.filter(l=>382!==l.id),this.categories.forEach((l,a)=>{0===a&&(s=this.categories[0],c=this.categories[1]),"\u043a\u0440\u043e\u0432\u0430\u0442\u0438"===l.name.toLowerCase()&&(this.categories[0]=this.categories[a],this.categories[a]=s),"\u0434\u0438\u0432\u0430\u043d\u044b"===l.name.toLowerCase()&&(this.categories[1]=this.categories[a],this.categories[a]=c)}),this.loader.setLoader(!1),this.cdr.detectChanges(),this.loader.imgLoader()})}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(t.sBO),t.Y36(u.nN),t.Y36(d.m),t.Y36(p.D))},e.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],decls:13,vars:3,consts:[[1,"all-news"],[1,"all-news__header"],[1,"all-news__title"],[1,"all-news__subtitle"],[1,"small-container"],[1,"breadcrumbs","all-news__breadcrumbs"],[1,"breadcrumbs__link",3,"routerLink"],[1,"breadcrumbs__link","breadcrumbs__link--active",3,"routerLink"],[1,"catalog"],["class","catalog__item",4,"ngFor","ngForOf"],[1,"catalog__item"],[3,"routerLink"],["alt","image",3,"src"],[1,"catalog__title"]],template:function(n,s){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h1",2),t._uU(3,"\u041a\u0430\u0442\u0430\u043b\u043e\u0433"),t.qZA(),t._UZ(4,"p",3),t.qZA(),t.TgZ(5,"div",4)(6,"div",5)(7,"a",6),t._uU(8,"\u0433\u043b\u0430\u0432\u043d\u0430\u044f"),t.qZA(),t.TgZ(9,"a",7),t._uU(10,"\u041a\u0430\u0442\u0430\u043b\u043e\u0433"),t.qZA()(),t.TgZ(11,"ul",8),t.YNc(12,f,5,3,"li",9),t.qZA()()()),2&n&&(t.xp6(7),t.Q6J("routerLink","/"),t.xp6(2),t.Q6J("routerLink","/catalog"),t.xp6(3),t.Q6J("ngForOf",s.categories))},directives:[g.yS,h.sg],styles:[".catalog[_ngcontent-%COMP%]{margin-bottom:60px;display:flex;justify-content:center;list-style:none;flex-wrap:wrap;gap:20px}.catalog__item[_ngcontent-%COMP%]{flex:0 1 32%;opacity:1;transition:.2s ease-in;cursor:pointer}.catalog__item[_ngcontent-%COMP%]:hover{transition:.2s ease-in;opacity:.9}.catalog__item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:250px;object-fit:contain}.catalog__title[_ngcontent-%COMP%]{text-align:center;margin-top:14px;display:block;color:#000;font-family:Romile,sans-serif;font-size:28px;font-style:normal;font-weight:400;transition:.1s ease-in}@media all and (max-width: 1000px){.catalog[_ngcontent-%COMP%]{margin-bottom:60px;justify-content:space-between;flex-wrap:wrap}.catalog__item[_ngcontent-%COMP%]{flex:0 1 45%}}@media all and (max-width: 650px){.catalog[_ngcontent-%COMP%]{margin-bottom:60px;justify-content:space-between;flex-wrap:wrap}.catalog__item[_ngcontent-%COMP%]{flex:0 1 45%}.catalog__item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;object-fit:cover}.catalog__title[_ngcontent-%COMP%]{text-align:center;margin-top:14px;display:block;color:#000;font-family:Romile,sans-serif;font-size:24px;font-style:normal;font-weight:400;transition:.1s ease-in}}@media all and (max-width: 400px){.catalog[_ngcontent-%COMP%]{margin-bottom:40px;flex-direction:column;justify-content:start}.catalog__item[_ngcontent-%COMP%]{flex:0 1 100%}}"],changeDetection:0}),e})();var x=o(4466);const _=[{path:"",component:C}];let y=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[g.Bz.forChild(_),x.m]]}),e})()}}]);