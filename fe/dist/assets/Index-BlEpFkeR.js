import{r as d,j as x,V as o,X as e,J as m,k as n,u as l,I as v,N as k,a0 as b,E as y,f as i,Z as w,Y as _}from"./index-BiT8iTy4.js";import{a as g}from"./api-DgShQ8FU.js";import{c}from"./createLucideIcon-DrtMeLMS.js";/**
 * @license lucide-vue-next v0.452.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=c("ListIcon",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-vue-next v0.452.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=c("SquareArrowLeftIcon",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"m12 8-4 4 4 4",key:"15vm53"}],["path",{d:"M16 12H8",key:"1fr5h0"}]]);/**
 * @license lucide-vue-next v0.452.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=c("SquareArrowRightIcon",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m12 16 4-4-4-4",key:"1i9zcv"}]]),j={class:"w-full flex flex-col items-center justify-center"},I={key:0,class:"w-full lg:w-[480px] box-border relative"},q={class:"fixed top-0 left-0 z-20 w-full bg-black/80 backdrop-blur-md px-4 py-3 box-border flex items-center justify-between"},N={class:"flex items-center gap-x-4"},S={class:"text-sm font-bold"},A={class:"fixed bottom-0 left-0 z-20 w-full bg-black/80 backdrop-blur-md px-4 py-3 box-border flex items-center justify-between"},C=["href"],R=["href"],V={class:"w-full box-border pt-6 pb-10"},$=["src"],H={__name:"Index",setup(B){const f=w(),h=_(),a=d(!1),t=d([]),p=async()=>{a.value=d(!0);try{const{data:r}=await g.get(`/read-komik/${h.params.slug}`);t.value=r.data,a.value=!1}catch(r){console.log(r),a.value=!1}};return x(()=>{p()}),(r,s)=>(i(),o("div",j,[a.value?y("",!0):(i(),o("div",I,[e("div",q,[e("div",null,[e("div",N,[e("a",{href:"#",onClick:s[0]||(s[0]=m(u=>l(f).push({name:"detailKomik",params:{slug:t.value.linkKomik}}),["prevent"]))},[n(l(z),{class:"size-4"})]),e("h1",S,v(t.value.title),1)])])]),e("div",A,[e("a",{href:`/viewer/${t.value.prevCh}`,class:"flex items-center gap-x-2 px-2 py-1 rounded border border-white text-xs"},[n(l(M),{class:"size-3"}),s[1]||(s[1]=e("div",{class:"font-semibold"},"Prev",-1))],8,C),e("a",{href:`/viewer/${t.value.nextCh}`,class:"flex items-center gap-x-2 px-2 py-1 rounded border border-white text-xs"},[s[2]||(s[2]=e("div",{class:"font-semibold"},"Next",-1)),n(l(L),{class:"size-3"})],8,R)]),e("div",V,[(i(!0),o(k,null,b(t.value.chapters,(u,D)=>(i(),o("img",{src:u.imgUrl,alt:"",class:"w-full"},null,8,$))),256))])]))]))}};export{H as default};
