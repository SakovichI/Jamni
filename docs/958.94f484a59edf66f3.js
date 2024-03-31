"use strict";(self.webpackChunkjamni=self.webpackChunkjamni||[]).push([[958],{5297:(Z,x,n)=>{n.d(x,{f:()=>a});var t=n(1135),f=n(8505),r=n(3900),m=n(2340),p=n(7587),e=n(520);let a=(()=>{class d{constructor(c){this.http=c,this.url=m.N.apiUrl,this.address$=new t.X([])}getAddress(){return this.http.get(`${this.url}/users/addresses`).pipe((0,f.b)(c=>this.address$.next(c)))}addAddress(c){return this.http.post(`${this.url}/users/addresses`,c).pipe((0,r.w)(()=>this.getAddress()))}editAddress(c,l){return this.http.put(`${this.url}/users/addresses/${l}`,c)}deleteAddress(c){return this.http.delete(`${this.url}/users/addresses/${c}`)}}return d.\u0275fac=function(c){return new(c||d)(p.LFG(e.eN))},d.\u0275prov=p.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()},14:(Z,x,n)=>{n.d(x,{C:()=>s});var t=n(3075),f=n(7579),r=n(2722),m=n(4004),p=n(8505),e=n(7587),a=n(5297),d=n(7545),i=n(9808),c=n(2537);function l(g,C){if(1&g){const u=e.EpF();e.TgZ(0,"button",27),e.NdJ("click",function(){e.CHM(u);const h=e.oxw();return h.deleteAddress(h.id)}),e._uU(1," \u0423\u0434\u0430\u043b\u0438\u0442\u044c "),e.qZA()}}const _=function(g){return{error:g}};let s=(()=>{class g{constructor(u,o,h){this.addressApi=u,this.activeRoute=o,this.route=h,this.id=0,this.destroy$=new f.x,this.form=new t.cw({firstname:new t.NI("",t.kI.required),surname:new t.NI("",t.kI.required),country:new t.NI("",t.kI.required),city:new t.NI("",t.kI.required),postcode:new t.NI("",t.kI.required),street:new t.NI("",t.kI.required),house:new t.NI("",t.kI.required),phone:new t.NI("",t.kI.required)}),setTimeout(()=>{const A=document.querySelector('script[src="assets/main.js"]');A&&document.body.removeChild(A);const b=document.createElement("script");b.src="assets/main.js",document.body.appendChild(b)},500)}ngOnInit(){this.activeRoute.params.pipe((0,r.R)(this.destroy$)).subscribe(u=>this.id=Number(u.id)),0!==this.id&&this.addressApi.getAddress().pipe((0,m.U)(u=>{let o;o=u.filter(h=>h.id===this.id),this.updateFom(o[0])}),(0,r.R)(this.destroy$)).subscribe()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}submit(u){0===this.id?(console.log(u.value),this.addressApi.addAddress(u.value).pipe((0,r.R)(this.destroy$)).subscribe(o=>{this.route.navigate(["../"],{relativeTo:this.activeRoute})})):this.addressApi.editAddress(u.value,this.id).pipe((0,p.b)(o=>{this.updateFom(u.value),this.route.navigate(["../"],{relativeTo:this.activeRoute})}),(0,r.R)(this.destroy$)).subscribe()}updateFom(u){this.form=new t.cw({firstname:new t.NI(u.firstname,t.kI.required),surname:new t.NI(u.surname,t.kI.required),country:new t.NI(u.country,t.kI.required),city:new t.NI(u.city,t.kI.required),postcode:new t.NI(u.postcode,t.kI.required),street:new t.NI(u.street,t.kI.required),house:new t.NI(u.house,t.kI.required),phone:new t.NI(u.phone,t.kI.required)})}deleteAddress(u){this.addressApi.deleteAddress(u).pipe((0,p.b)(()=>{this.route.navigate(["../"],{relativeTo:this.activeRoute})}),(0,r.R)(this.destroy$)).subscribe()}}return g.\u0275fac=function(u){return new(u||g)(e.Y36(a.f),e.Y36(d.gz),e.Y36(d.F0))},g.\u0275cmp=e.Xpm({type:g,selectors:[["app-address-form"]],decls:42,vars:27,consts:[["action","#",1,"cut-info__form","form","form-info",3,"formGroup","ngSubmit"],[1,"form-info__wrap","form__wrap"],[1,"form-info__inner"],[1,"form-info__title"],[1,"form__row"],[1,"form-group","form-info__select","form__select"],[1,"dropdown","form-info__dropdown","form__dropdown"],["type","button",1,"dropdown__button"],[1,"dropdown__icon"],[0,"xlink","href","assets/img/sprite.svg#arrow-down"],[1,"dropdown__list"],["data-value","\u0420\u043e\u0441\u0441\u0438\u044f",1,"dropdown__list-item",3,"click"],["data-value","\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c",1,"dropdown__list-item",3,"click"],["data-value","\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d",1,"dropdown__list-item",3,"click"],["type","text","name","select-category","formControlName","country",1,"dropdown__input-hidden"],[1,"form-info__row","form__row"],[1,"form__label","form-info__label"],["name","name","type","text","placeholder","\u0418\u043c\u044f","formControlName","firstname",1,"form__input","form-info__input","input-reset",3,"ngClass"],["name","surname","type","text","placeholder","\u0424\u0430\u043c\u0438\u043b\u0438\u044f","formControlName","surname",1,"form__input","form-info__input","input-reset",3,"ngClass"],["name","city","type","text","placeholder","\u0413\u043e\u0440\u043e\u0434","formControlName","city",1,"form__input","form-info__input","input-reset",3,"ngClass"],["name","index","type","text","placeholder","\u0418\u043d\u0434\u0435\u043a\u0441","formControlName","postcode",1,"form__input","form-info__input","input-reset",3,"ngClass"],["name","street","type","text","placeholder","\u0423\u043b\u0438\u0446\u0430","formControlName","street",1,"form__input","form-info__input","input-reset",3,"ngClass"],["name","house-num","type","text","placeholder","\u041d\u043e\u043c\u0435\u0440 \u0434\u043e\u043c\u0430","formControlName","house",1,"form__input","form-info__input","input-reset",3,"ngClass"],["mask","+7(999) 999-99-99","placeholder","\u0422\u0435\u043b\u0435\u0444\u043e\u043d","formControlName","phone",1,"form-reg__input","form__input",3,"ngClass"],["type","button","class","btn-reset form-info__btn form-info__btn--delete",3,"click",4,"ngIf"],[1,"form-info__btn","btn-reset","form__btn","btn-anim",3,"disabled"],[1,"form__btn-text","form-info__btn-text","btn-anim__text"],["type","button",1,"btn-reset","form-info__btn","form-info__btn--delete",3,"click"]],template:function(u,o){1&u&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return o.submit(o.form)}),e.TgZ(1,"div",1)(2,"div",2)(3,"h2",3),e._uU(4),e.qZA(),e.TgZ(5,"div",4)(6,"div",5)(7,"div",6)(8,"button",7),e._uU(9),e.qZA(),e.O4$(),e.TgZ(10,"svg",8),e._UZ(11,"use",9),e.qZA(),e.kcU(),e.TgZ(12,"ul",10)(13,"li",11),e.NdJ("click",function(){return o.form.controls.country.patchValue("\u0420\u043e\u0441\u0441\u0438\u044f")}),e._uU(14," \u0420\u043e\u0441\u0441\u0438\u044f "),e.qZA(),e.TgZ(15,"li",12),e.NdJ("click",function(){return o.form.controls.country.patchValue("\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c")}),e._uU(16," \u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c "),e.qZA(),e.TgZ(17,"li",13),e.NdJ("click",function(){return o.form.controls.country.patchValue("\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d")}),e._uU(18," \u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d "),e.qZA()(),e._UZ(19,"input",14),e.qZA()()()(),e.TgZ(20,"div",15)(21,"label",16),e._UZ(22,"input",17),e.qZA(),e.TgZ(23,"label",16),e._UZ(24,"input",18),e.qZA()(),e.TgZ(25,"div",15)(26,"label",16),e._UZ(27,"input",19),e.qZA(),e.TgZ(28,"label",16),e._UZ(29,"input",20),e.qZA()(),e.TgZ(30,"div",15)(31,"label",16),e._UZ(32,"input",21),e.qZA(),e.TgZ(33,"label",16),e._UZ(34,"input",22),e.qZA()(),e.TgZ(35,"div",15)(36,"label",16),e._UZ(37,"p-inputMask",23),e.qZA()(),e.YNc(38,l,2,0,"button",24),e.qZA(),e.TgZ(39,"button",25)(40,"span",26),e._uU(41),e.qZA()()()),2&u&&(e.Q6J("formGroup",o.form),e.xp6(4),e.hij(" ",0===o.id?"\u0434\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438":"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u0430\u0434\u0440\u0435\u0441\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"," "),e.xp6(5),e.hij(" ",o.form.controls.country.value," "),e.xp6(13),e.Q6J("ngClass",e.VKq(13,_,o.form.controls.firstname.invalid&&(o.form.controls.firstname.touched||o.form.controls.firstname.dirty))),e.xp6(2),e.Q6J("ngClass",e.VKq(15,_,o.form.controls.surname.invalid&&(o.form.controls.surname.touched||o.form.controls.surname.dirty))),e.xp6(3),e.Q6J("ngClass",e.VKq(17,_,o.form.controls.city.invalid&&(o.form.controls.city.touched||o.form.controls.city.dirty))),e.xp6(2),e.Q6J("ngClass",e.VKq(19,_,o.form.controls.postcode.invalid&&(o.form.controls.postcode.touched||o.form.controls.postcode.dirty))),e.xp6(3),e.Q6J("ngClass",e.VKq(21,_,o.form.controls.street.invalid&&(o.form.controls.street.touched||o.form.controls.street.dirty))),e.xp6(2),e.Q6J("ngClass",e.VKq(23,_,o.form.controls.house.invalid&&(o.form.controls.house.touched||o.form.controls.house.dirty))),e.xp6(3),e.Q6J("ngClass",e.VKq(25,_,o.form.controls.phone.invalid&&(o.form.controls.phone.touched||o.form.controls.phone.dirty))),e.xp6(1),e.Q6J("ngIf",0!==o.id),e.xp6(1),e.Q6J("disabled",o.form.invalid),e.xp6(2),e.Oqu(0===o.id?"\u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c":"\u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"))},directives:[t._Y,t.JL,t.sg,t.Fj,t.JJ,t.u,i.mk,c.vy,i.O5],styles:[".form-info__inner[_ngcontent-%COMP%]{margin-top:0}.form-info__label[_ngcontent-%COMP%]{&:last-child{margin-bottom:0}}.form-info__btn--delete[_ngcontent-%COMP%]{width:auto;height:auto;display:block;padding-bottom:2px;margin-top:10px;margin-left:auto;color:#000;font-family:ProximaNova,sans-serif;font-size:14px;font-style:normal;font-weight:300;line-height:normal;border-bottom:1px solid transparent;transition:.2s ease-in;&:hover{border-bottom:1px solid #000000;transition:.2s ease-in}}@media all and (max-width: 1100px){.form-info__row[_ngcontent-%COMP%]{flex-direction:row;gap:20px}}@media all and (max-width: 650px){.form-info__row[_ngcontent-%COMP%]{flex-direction:column;gap:10px}}"]}),g})()},4638:(Z,x,n)=>{n.d(x,{o:()=>c});var t=n(7579),f=n(2722),r=n(7587),m=n(5297),p=n(9808),e=n(7545);function a(l,_){if(1&l&&(r.TgZ(0,"li",10)(1,"div",11)(2,"span",12),r._uU(3),r.qZA(),r.TgZ(4,"span",13),r._uU(5),r.qZA(),r.TgZ(6,"button",14),r._uU(7," \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c "),r.qZA()()()),2&l){const s=_.$implicit;r.xp6(3),r.hij("\u0410\u0434\u0440\u0435\u0441 ",s.id,""),r.xp6(2),r.Oqu(s.street+", "+s.house+", "+s.postcode+", "+s.city+", "+s.country),r.xp6(1),r.Q6J("routerLink","../address/"+s.id)}}function d(l,_){if(1&l&&(r.TgZ(0,"ul",8),r.YNc(1,a,8,3,"li",9),r.qZA()),2&l){const s=r.oxw();r.xp6(1),r.Q6J("ngForOf",s.addressArray)}}function i(l,_){1&l&&(r.TgZ(0,"p",15),r._uU(1," \u0414\u043b\u044f \u0431\u043e\u043b\u0435\u0435 \u0443\u0434\u043e\u0431\u043d\u043e\u0433\u043e \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u043e\u0432, \u0434\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0441\u0432\u043e\u0439 \u0430\u0434\u0440\u0435\u0441 "),r.qZA())}let c=(()=>{class l{constructor(s){this.addressApi=s,this.addressArray=[],this.destroy$=new t.x}ngOnInit(){this.addressApi.getAddress().pipe((0,f.R)(this.destroy$)).subscribe(s=>{this.addressArray=s})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}}return l.\u0275fac=function(s){return new(s||l)(r.Y36(m.f))},l.\u0275cmp=r.Xpm({type:l,selectors:[["app-delivery-adres"]],decls:10,vars:2,consts:[[1,"address"],[1,"address__wrap"],[1,"address__title"],[1,"address__content"],["class","address__list",4,"ngIf"],["class","address__empty",4,"ngIf"],["routerLink","../address/0",1,"btn-reset","address__btn-add","btn-anim"],[1,"btn-anim__text"],[1,"address__list"],["class","address__item address-elem",4,"ngFor","ngForOf"],[1,"address__item","address-elem"],[1,"address-elem__wrap"],[1,"address-elem__id"],[1,"address__info"],[1,"address__btn-edit","btn-reset",3,"routerLink"],[1,"address__empty"]],template:function(s,g){1&s&&(r.TgZ(0,"div",0)(1,"div",1)(2,"h2",2),r._uU(3,"\u0430\u0434\u0440\u0435\u0441\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"),r.qZA(),r.TgZ(4,"div",3),r.YNc(5,d,2,1,"ul",4),r.YNc(6,i,2,0,"p",5),r.qZA(),r.TgZ(7,"button",6)(8,"span",7),r._uU(9," \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0439 \u0430\u0434\u0440\u0435\u0441 "),r.qZA()()()()),2&s&&(r.xp6(5),r.Q6J("ngIf",g.addressArray.length>0),r.xp6(1),r.Q6J("ngIf",0===g.addressArray.length))},directives:[p.O5,p.sg,e.rH],styles:[".address__wrap[_ngcontent-%COMP%]{max-width:800px}.address__content[_ngcontent-%COMP%]{padding-bottom:45px;margin-bottom:45px;border-bottom:1px solid #d3d3d3}.address__title[_ngcontent-%COMP%]{margin-bottom:20px;font-weight:300;font-size:16px;line-height:normal;text-transform:uppercase;color:#23221e}.address__empty[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px;color:#23221e;font-family:Romile,sans-serif;font-size:22px;font-style:normal;font-weight:400}.address__list[_ngcontent-%COMP%]{list-style:none;padding:16px 24px 20px;border:1px solid #d3d3d3;border-radius:20px}.address__item[_ngcontent-%COMP%]{&:not(:first-child){padding-top:16px;margin-top:16px;border-top:1px solid #d3d3d3}}.address-elem__wrap[_ngcontent-%COMP%]{display:flex;gap:20px;align-items:center;justify-content:space-between}.address-elem__id[_ngcontent-%COMP%]{font-weight:400;font-size:14px;line-height:normal;text-transform:uppercase;color:#23221e;white-space:nowrap}.address__info[_ngcontent-%COMP%]{font-weight:300;font-size:16px;line-height:normal;color:#000}.address__btn-edit[_ngcontent-%COMP%]{font-family:ProximaNova,sans-serif;font-weight:300;font-size:14px;line-height:normal;text-decoration:underline;text-align:right;color:#a7a7a7;transition:.2s ease-in;&:hover{transition:.2s ease-in;color:#000}}.address__btn-add[_ngcontent-%COMP%]{width:100%;height:48px}@media all and (max-width: 650px){.address-elem__wrap[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between}.address__info[_ngcontent-%COMP%]{flex:1 1 100%;order:3}.address__content[_ngcontent-%COMP%]{padding-bottom:28px;margin-bottom:28px;border-bottom:1px solid #d3d3d3}}"]}),l})()},8042:(Z,x,n)=>{n.d(x,{l:()=>e});var t=n(7587),f=n(3495),r=n(9783);function m(a,d){1&a&&(t.TgZ(0,"tr")(1,"th"),t._uU(2,"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"),t.qZA(),t.TgZ(3,"th"),t._uU(4,"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"),t.qZA(),t.TgZ(5,"th",3),t._uU(6," \u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043c\u044f "),t._UZ(7,"p-sortIcon",4),t.qZA(),t.TgZ(8,"th",5),t._uU(9," \u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0437\u0430 \u0435\u0434. "),t._UZ(10,"p-sortIcon",6),t.qZA(),t.TgZ(11,"th",7),t._uU(12," \u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e "),t._UZ(13,"p-sortIcon",8),t.qZA(),t.TgZ(14,"th",9),t._uU(15," \u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043a\u0430\u0437\u0430 "),t._UZ(16,"p-sortIcon",10),t.qZA(),t.TgZ(17,"th",11),t._uU(18," \u041e\u0431\u0449\u0430\u044f \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c "),t._UZ(19,"p-sortIcon",12),t.qZA()())}function p(a,d){if(1&a&&(t.TgZ(0,"tr",13)(1,"td",14),t._UZ(2,"img",15),t.qZA(),t.TgZ(3,"td",16)(4,"div",17)(5,"h3",18),t._uU(6),t.qZA(),t.TgZ(7,"div",19)(8,"span",20),t._uU(9,"\u0426\u0432\u0435\u0442:"),t.qZA(),t.TgZ(10,"div",21),t._UZ(11,"span",22),t.TgZ(12,"span",23),t._uU(13),t.qZA()()()()(),t.TgZ(14,"td")(15,"span",24),t._uU(16),t.qZA(),t.TgZ(17,"span",25),t._uU(18),t.qZA()(),t.TgZ(19,"td"),t._uU(20),t.qZA(),t.TgZ(21,"td"),t._uU(22),t.qZA(),t.TgZ(23,"td"),t._uU(24),t.qZA(),t.TgZ(25,"td"),t._uU(26),t.qZA()()),2&a){const i=d.$implicit;t.xp6(6),t.Oqu(i.title),t.xp6(5),t.Udp("background-color",i.color),t.xp6(2),t.Oqu(i.color),t.xp6(3),t.Oqu(i.date),t.xp6(2),t.Oqu(i.time),t.xp6(2),t.Oqu(i.currency+" \u0440\u0443\u0431."),t.xp6(2),t.Oqu(i.amount+" \u0448\u0442."),t.xp6(2),t.Oqu(i.state),t.xp6(2),t.Oqu(i.price+" \u0440\u0443\u0431.")}}let e=(()=>{class a{constructor(){this.customers=[{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:1,state:"\u0414\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d",price:1e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:5e3,amount:4,state:"\u041d\u043e\u0432\u044b\u0439",price:2e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"12.05.24",time:"10:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4},{img:"",title:"\u0414\u0438\u0432\u0430\u043d Foster",color:"black",date:"15.01.24",time:"18:00",currency:1e4,amount:3,state:"\u041e\u043f\u043b\u0430\u0447\u0435\u043d",price:3e4}]}ngOnInit(){}}return a.\u0275fac=function(i){return new(i||a)},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-order"]],decls:3,vars:4,consts:[["responsiveLayout","stack","currentPageReportTemplate","\u041f\u043e\u043a\u0430\u0437\u0430\u043d\u043e {first} \u0438\u0437 {last} \u0432\u0441\u0435\u0433\u043e {totalRecords}",1,"orders",3,"value","paginator","rows","showCurrentPageReport"],["pTemplate","header"],["pTemplate","body"],["pSortableColumn","date"],["field","date"],["pSortableColumn","currency"],["field","currency"],["pSortableColumn","amount"],["field","amount"],["pSortableColumn","status"],["field","status"],["pSortableColumn","price"],["field","price"],[1,"order-item"],[1,"order-item__img-wrap"],["src","assets/img/categories-sofas/categories-slide1.jpg","alt","product-img",1,"order-item__img"],[1,"order-item__desc"],[1,"desc-order"],[1,"desc-order__title"],[1,"desc-order__colors"],[1,"desc-order__colors-text"],[1,"desc-order__colors-value"],[1,"desc-order__colors-color"],[1,"desc-order__colors-name"],[1,"order-date"],[1,"order-time"]],template:function(i,c){1&i&&(t.TgZ(0,"p-table",0),t.YNc(1,m,20,0,"ng-template",1),t.YNc(2,p,27,10,"ng-template",2),t.qZA()),2&i&&t.Q6J("value",c.customers)("paginator",!0)("rows",10)("showCurrentPageReport",!0)},directives:[f.iA,r.jx,f.lQ,f.fz],styles:[".order-item__img-wrap[_ngcontent-%COMP%]{margin-right:24px;width:155px;height:155px;background:#f8f8f8}.order-item__img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain}.desc-order[_ngcontent-%COMP%]{max-width:150px}.desc-order__title[_ngcontent-%COMP%]{margin-bottom:20px;font-weight:400;font-size:16px;text-transform:uppercase;color:#000}.desc-order__colors-text[_ngcontent-%COMP%]{display:block;margin-bottom:4px;font-weight:400;font-size:14px;line-height:normal;color:#a7a7a7}.desc-order__colors-value[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:5px;align-items:center}.desc-order__colors-color[_ngcontent-%COMP%]{width:19px;height:19px;border-radius:50%}.desc-order__colors-name[_ngcontent-%COMP%]{font-weight:400;font-size:14px;line-height:normal;color:#000}.order-date[_ngcontent-%COMP%]{display:block;margin-bottom:5px;font-family:ProximaNova,sans-serif;font-weight:400;font-size:14px;line-height:normal;color:#000}.order-time[_ngcontent-%COMP%]{font-family:ProximaNova,sans-serif;font-weight:400;font-size:14px;line-height:normal;color:#a7a7a7}@media all and (max-width: 960px){.desc-order__title[_ngcontent-%COMP%]{padding:0 12px;margin-bottom:12px}.desc-order[_ngcontent-%COMP%]{width:100%;max-width:100%}.desc-order__colors[_ngcontent-%COMP%]{padding:12px;margin-bottom:12px;background:#fcfcfc}.order-date[_ngcontent-%COMP%]{padding:0 12px}.order-time[_ngcontent-%COMP%]{padding:0 12px;margin-bottom:12px}}"]}),a})()},7449:(Z,x,n)=>{n.d(x,{b:()=>r});var t=n(7587),f=n(7545);let r=(()=>{class m{constructor(){}ngOnInit(){}}return m.\u0275fac=function(e){return new(e||m)},m.\u0275cmp=t.Xpm({type:m,selectors:[["app-orders"]],decls:89,vars:1,consts:[[1,"orders"],[1,"orders__list"],[1,"orders__item","order"],[1,"order__wrap"],[1,"order__images"],[1,"order__img-wrap"],["src","assets/img/categories/furniture1.jpg","alt","product-img","width","75","height","75",1,"order__img"],[1,"order__else"],[1,"order__else-text"],[1,"order__info"],[1,"order__id"],[1,"order__info-wrap"],[1,"order__info-text"],[1,"btn-reset","btn-anim","order__btn",3,"routerLink"],[1,"btn-anim__text"],[1,"btn-reset","btn-anim","order__btn"]],template:function(e,a){1&e&&(t.TgZ(0,"div",0)(1,"ul",1)(2,"li",2)(3,"div",3)(4,"div",4)(5,"div",5),t._UZ(6,"img",6),t.qZA(),t.TgZ(7,"div",5),t._UZ(8,"img",6),t.qZA(),t.TgZ(9,"div",5),t._UZ(10,"img",6),t.qZA(),t.TgZ(11,"div",7)(12,"p",8),t._uU(13,"+ 8 "),t._UZ(14,"br"),t._uU(15,"\u0442\u043e\u0432\u0430\u0440\u043e\u0432"),t.qZA()()(),t.TgZ(16,"div",9)(17,"h3",10),t._uU(18,"\u2116 359245260"),t.qZA(),t.TgZ(19,"div",11)(20,"span",12),t._uU(21,"\u041d\u043e\u0432\u044b\u0439"),t.qZA(),t.TgZ(22,"span",12),t._uU(23,"12.05.24"),t.qZA(),t.TgZ(24,"span",12),t._uU(25,"1 200 000 \u0440\u0443\u0431."),t.qZA()()(),t.TgZ(26,"button",13)(27,"span",14),t._uU(28,"\u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0442\u044c \u0437\u0430\u043a\u0430\u0437"),t.qZA()()()(),t.TgZ(29,"li",2)(30,"div",3)(31,"div",4)(32,"div",5),t._UZ(33,"img",6),t.qZA(),t.TgZ(34,"div",5),t._UZ(35,"img",6),t.qZA()(),t.TgZ(36,"div",9)(37,"h3",10),t._uU(38,"\u2116 359245260"),t.qZA(),t.TgZ(39,"div",11)(40,"span",12),t._uU(41,"\u041d\u043e\u0432\u044b\u0439"),t.qZA(),t.TgZ(42,"span",12),t._uU(43,"12.05.24"),t.qZA(),t.TgZ(44,"span",12),t._uU(45,"1 200 000 \u0440\u0443\u0431."),t.qZA()()(),t.TgZ(46,"button",15)(47,"span",14),t._uU(48,"\u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0442\u044c \u0437\u0430\u043a\u0430\u0437"),t.qZA()()()(),t.TgZ(49,"li",2)(50,"div",3)(51,"div",4)(52,"div",5),t._UZ(53,"img",6),t.qZA(),t.TgZ(54,"div",5),t._UZ(55,"img",6),t.qZA(),t.TgZ(56,"div",5),t._UZ(57,"img",6),t.qZA()(),t.TgZ(58,"div",9)(59,"h3",10),t._uU(60,"\u2116 359245260"),t.qZA(),t.TgZ(61,"div",11)(62,"span",12),t._uU(63,"\u041d\u043e\u0432\u044b\u0439"),t.qZA(),t.TgZ(64,"span",12),t._uU(65,"12.05.24"),t.qZA(),t.TgZ(66,"span",12),t._uU(67,"1 200 000 \u0440\u0443\u0431."),t.qZA()()(),t.TgZ(68,"button",15)(69,"span",14),t._uU(70,"\u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0442\u044c \u0437\u0430\u043a\u0430\u0437"),t.qZA()()()(),t.TgZ(71,"li",2)(72,"div",3)(73,"div",4)(74,"div",5),t._UZ(75,"img",6),t.qZA()(),t.TgZ(76,"div",9)(77,"h3",10),t._uU(78,"\u2116 359245260"),t.qZA(),t.TgZ(79,"div",11)(80,"span",12),t._uU(81,"\u041d\u043e\u0432\u044b\u0439"),t.qZA(),t.TgZ(82,"span",12),t._uU(83,"12.05.24"),t.qZA(),t.TgZ(84,"span",12),t._uU(85,"1 200 000 \u0440\u0443\u0431."),t.qZA()()(),t.TgZ(86,"button",15)(87,"span",14),t._uU(88,"\u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0442\u044c \u0437\u0430\u043a\u0430\u0437"),t.qZA()()()()()()),2&e&&(t.xp6(26),t.Q6J("routerLink","1"))},directives:[f.rH],styles:[".orders__list[_ngcontent-%COMP%]{list-style:none;display:flex;flex-direction:column;gap:10px}.order__wrap[_ngcontent-%COMP%]{overflow:hidden;height:155px;display:flex;align-items:center;background:#fcfcfc}.order__images[_ngcontent-%COMP%]{max-width:160px;height:100%;display:flex;flex-wrap:wrap;gap:5px}.order__img-wrap[_ngcontent-%COMP%]{flex:1 1 48%;display:flex;align-items:center;justify-content:center;background:#f8f8f8}.order__img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain}.order__else[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:75px;background:#f8f8f8}.order__else-text[_ngcontent-%COMP%]{text-align:center;font-weight:300;font-size:14px;color:#000}.order__id[_ngcontent-%COMP%]{margin-bottom:22px;font-weight:600;font-size:16px;text-transform:uppercase;color:#000}.order__info[_ngcontent-%COMP%]{padding:20px;flex:1 1 auto}.order__info-text[_ngcontent-%COMP%]{font-weight:400;font-size:14px;line-height:100%;color:#000;&:not(:last-child){padding-right:16px;margin-right:16px;border-right:1px solid #000}}.order__btn[_ngcontent-%COMP%]{height:35px;margin-right:50px;width:220px}@media all and (max-width: 790px){.order__wrap[_ngcontent-%COMP%]{overflow:hidden;height:auto;display:flex;flex-wrap:wrap;align-items:center;background:#fcfcfc}.order__btn[_ngcontent-%COMP%]{margin:20px auto;height:35px;width:100%;max-width:220px}}@media all and (max-width: 520px){.order__info-text[_ngcontent-%COMP%]{display:block;width:max-content;&:not(:last-child){margin-bottom:10px;padding-bottom:10px;padding-right:0;margin-right:0;border-right:none;border-bottom:1px solid #000}}.order__images[_ngcontent-%COMP%]{max-width:160px;height:160px;display:flex;flex-wrap:wrap;gap:5px}}"]}),m})()}}]);