import{r as c,j as w,V as d,X as e,J as f,k as u,u as r,I as o,R as k,N as y,a0 as C,E as z,f as v,Z as I,Y as M}from"./index-BA-2DKBX.js";import{a as j}from"./api-DIfaIPD1.js";import"./index-CBdmBQGz.js";import{c as p}from"./createLucideIcon-DwS-EjJq.js";/**
 * @license lucide-vue-next v0.452.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=p("EyeIcon",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-vue-next v0.452.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=p("PlusIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-vue-next v0.452.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=p("UserRoundCheckIcon",[["path",{d:"M2 21a8 8 0 0 1 13.292-6",key:"bjp14o"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"m16 19 2 2 4-4",key:"1b14m6"}]]),R={key:0,class:"w-full lg:w-[480px] box-border"},V={class:"w-full h-full box-border bg-black/30"},B={class:"w-full flex items-center justify-between p-4"},N={class:"flex gap-x-2 items-center"},E={class:"bg-white rounded-full text-black text-xs px-2 py-1 flex items-center justify-center gap-x-1"},Z={class:"w-full box-border p-4 pb-6"},L={class:"text-xs font-light"},S={class:"font-bold text-lg"},H={class:"text-sm mb-3"},J={class:"text-sm"},P={class:"flex gap-x-4 mt-2"},T={class:"flex items-center gap-x-2"},U={class:"text-xs"},q={class:"flex items-center gap-x-3 mt-4"},A={class:"px-4 py-1 text-xs border border-white rounded"},K={class:"px-4 py-1 text-xs border border-white rounded"},X={class:"w-full box-border"},Y={class:"w-full"},G=["onClick"],O={class:"w-full flex items-center justify-between"},Q={class:"text-sm"},W={class:"font-bold"},ee={class:"flex items-center gap-x-1 text-xs"},te={class:"text-sm"},ne={__name:"DetailKomik",setup(se){const _=I(),x=M(),i=c(!1),l=c([]),h=async()=>{i.value=c(!0);try{const{data:s}=await j.get(`/komik/${x.params.slug}/detail`);l.value=s.data,i.value=!1}catch(s){console.log(s),i.value=!1}},b=(s,t)=>(s==null?void 0:s.length)>t?s.slice(0,t)+"...":s,m=s=>{if(!s)return;const t=s.reduce((a,n)=>a+parseInt(n.view),0);return t>=1e9?(t/1e9).toFixed(1).replace(/\.0$/,"")+" T":t>=1e6?(t/1e6).toFixed(1).replace(/\.0$/,"")+" JT":t>=1e3?(t/1e3).toFixed(1).replace(/\.0$/,"")+" Rb":t.toString()},g=s=>new Intl.NumberFormat("id-ID",{minimumFractionDigits:0}).format(s);return w(()=>{h()}),(s,t)=>i.value?z("",!0):(v(),d("div",R,[e("div",{class:"w-full h-[280px] relative overflow-hidden bg-no-repeat bg-cover bg-center",style:k(`background-image: url(${l.value.cover}?resize=450,200&quality=60)`)},[e("div",V,[e("div",B,[e("div",{class:"cursor-pointer",onClick:t[0]||(t[0]=f(a=>r(_).go(-1),["prevent"]))},t[1]||(t[1]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"size-6"},[e("path",{d:"M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"}),e("path",{d:"m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"})],-1)])),e("div",N,[e("button",E,[u(r(F),{class:"size-3"}),t[2]||(t[2]=e("div",null,"Favorit",-1))]),t[3]||(t[3]=e("button",{class:"bg-white rounded-full text-black text-xs p-1 flex items-center justify-center"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"size-4"},[e("path",{"fill-rule":"evenodd",d:"M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z","clip-rule":"evenodd"})])],-1))])]),e("div",Z,[e("div",L,o(l.value.info?l.value.info[5]:null),1),e("div",S,o(l.value.title),1),e("div",H,o(l.value.genre?l.value.genre.join(", "):null),1),e("div",J,o(b(l.value.desc,100)),1),e("div",P,[e("div",T,[u(r($),{class:"size-4"}),e("div",U,o(m(l.value.chapters)),1)])]),e("div",q,[e("button",A,o(l.value.rekapCh?l.value.rekapCh[0].ch:null),1),e("button",K,o(l.value.rekapCh?l.value.rekapCh[1].ch:null),1)])])])],4),e("div",X,[t[4]||(t[4]=e("div",{class:"w-full box-border p-4 border-y border-border"},[e("h1",{class:"text-sm font-bold"},"Daftar Chapter")],-1)),e("div",Y,[(v(!0),d(y,null,C(l.value.chapters,(a,n)=>(v(),d("div",{key:n,class:"w-full border-b border-border p-4 cursor-pointer",onClick:f(le=>r(_).push({name:"viewer",params:{slug:a.url}}),["prevent"])},[e("div",O,[e("div",Q,[e("div",W,o(a.title),1),e("div",ee,[u(r(D),{class:"size-4"}),e("div",null,o(a.view?g(a.view):0),1)])]),e("div",te,o(a.date),1)])],8,G))),128))])])]))}};export{ne as default};
