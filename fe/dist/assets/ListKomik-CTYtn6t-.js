import{r as a,j as B,V as o,X as t,N as h,a0 as y,J as x,k as i,u as l,I as d,f as r,Z as j}from"./index-vK6KX6hU.js";import{a as D}from"./api-CzpUAsBw.js";import{H as K}from"./carousel.es-aIoxN_wF.js";import{c as w}from"./createLucideIcon-BL_PWGva.js";/**
 * @license lucide-vue-next v0.452.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=w("ChevronsLeftIcon",[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]]);/**
 * @license lucide-vue-next v0.452.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=w("ChevronsRightIcon",[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]]),L={class:"w-full lg:w-[480px] box-border px-4 pb-10"},N={class:"w-full box-border grid grid-cols-3 gap-x-3 gap-y-5 py-4 border-b border-border"},$={class:"w-full"},I=["onClick"],M={class:"w-full box-border overflow-hidden flex items-center justify-center rounded-md"},R=["src"],T={class:"w-full box-border mt-2"},V={class:"flex items-center gap-x-3"},q={class:"text-xs font-light text-primary"},E={class:"text-sm font-semibold mb-2"},H={class:"w-full flex items-center justify-between"},S={class:"text-xs"},A={class:"text-xs text-primary flex items-center gap-x-1 justify-center"},F={class:"w-full box-border flex items-center justify-center gap-x-3 py-4"},J={key:1,class:"flex items-center rounded border border-muted text-muted px-2 py-1 text-sm gap-x-1 font-semibold cursor-not-allowed"},U={class:"bg-secondary text-primary px-2 py-1 text-sm rounded font-semibold border border-secondary"},X={key:1,class:"flex items-center rounded border border-muted text-muted px-2 py-1 text-sm gap-x-1 font-semibold cursor-not-allowed"},te={__name:"ListKomik",setup(Z){const C=j(),c=a(!1),v=a([]),u=a(1),m=a(null),p=a(null),f=async s=>{c.value=a(!0);try{const{data:e}=await D.get(`/komik?page=${s}`);v.value=e.data.komik,u.value=e.data.currentPage,m.value=e.data.prevPage,p.value=e.data.nextPage,c.value=!1}catch(e){console.log(e),c.value=!1}},P=()=>{document.title="Dartar Komik Terbaru";const s=document.querySelector('meta[name="description"]');if(s)s.setAttribute("content","Baca Komik terbaru Terbaru di Bacakomikindo.");else{const e=document.createElement("meta");e.name="description",e.content="Baca Komik terbaru Terbaru di Bacakomikindo.",document.head.appendChild(e)}},b=async s=>{s&&f(s)},z=(s,e)=>s.length>e?s.slice(0,e)+"...":s;return B(()=>{f(u.value),P()}),(s,e)=>(r(),o("div",L,[t("div",N,[(r(!0),o(h,null,y(v.value,(n,G)=>(r(),o("div",$,[t("div",{class:"w-full box-border rounded-md cursor-pointer",onClick:x(g=>l(C).push({name:"detailKomik",params:{slug:n.slug}}),["prevent"])},[t("div",M,[t("img",{src:`${n.imageUrl}?resize=260,300`,alt:""},null,8,R)]),t("div",T,[t("div",V,[(r(!0),o(h,null,y(n.genre,(g,O)=>(r(),o("div",q,d(g),1))),256))]),t("h1",E,d(z(n.title,16)),1),t("div",H,[t("div",S,"Ch. "+d(n.lastCh),1),t("div",A,[i(l(K),{class:"size-3"}),t("span",null,d(n.reader),1)])])])],8,I)]))),256))]),t("div",F,[t("div",null,[m.value?(r(),o("button",{key:0,onClick:e[0]||(e[0]=x(n=>b(m.value),["prevent"])),class:"flex items-center rounded border border-white px-2 py-1 text-sm gap-x-1"},[i(l(_),{class:"size-4"}),e[2]||(e[2]=t("div",null,"Prev",-1))])):(r(),o("button",J,[i(l(_),{class:"size-4"}),e[3]||(e[3]=t("div",null,"Prev",-1))]))]),t("div",U,"Page "+d(u.value),1),t("div",null,[p.value?(r(),o("button",{key:0,onClick:e[1]||(e[1]=x(n=>b(p.value),["prevent"])),class:"flex items-center rounded border border-white px-2 py-1 text-sm gap-x-1"},[e[4]||(e[4]=t("div",null,"Next",-1)),i(l(k),{class:"size-4"})])):(r(),o("button",X,[e[5]||(e[5]=t("div",null,"Next",-1)),i(l(k),{class:"size-4"})]))])])]))}};export{te as default};