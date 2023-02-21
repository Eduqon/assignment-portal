"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2024],{4651:function(e,n,i){i.d(n,{Ee:function(){return x},d9:function(){return a}});var r=i(5993),s=i(4592),c=i(7294),l=i(8698);function t(){return(t=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}function o(e,n){if(null==e)return{};var i,r,s={},c=Object.keys(e);for(r=0;r<c.length;r++)i=c[r],n.indexOf(i)>=0||(s[i]=e[i]);return s}function a(e){var n=e.loading,i=e.src,r=e.srcSet,s=e.onLoad,t=e.onError,o=e.crossOrigin,a=e.sizes,d=e.ignoreFallback,u=(0,c.useState)("pending"),h=u[0],x=u[1];(0,c.useEffect)((function(){x(i?"loading":"pending")}),[i]);var f=(0,c.useRef)(),m=(0,c.useCallback)((function(){if(i){j();var e=new Image;e.src=i,o&&(e.crossOrigin=o),r&&(e.srcset=r),a&&(e.sizes=a),n&&(e.loading=n),e.onload=function(e){j(),x("loaded"),null==s||s(e)},e.onerror=function(e){j(),x("failed"),null==t||t(e)},f.current=e}}),[i,o,r,a,s,t,n]),j=function(){f.current&&(f.current.onload=null,f.current.onerror=null,f.current=null)};return(0,l.a)((function(){if(!d)return"loading"===h&&m(),function(){j()}}),[h,m,d]),d?"loaded":h}var d=["htmlWidth","htmlHeight","alt"],u=["fallbackSrc","fallback","src","srcSet","align","fit","loading","ignoreFallback","crossOrigin"],h=c.forwardRef((function(e,n){var i=e.htmlWidth,r=e.htmlHeight,s=e.alt,l=o(e,d);return c.createElement("img",t({width:i,height:r,ref:n,alt:s},l))})),x=(0,r.Gp)((function(e,n){var i=e.fallbackSrc,l=e.fallback,d=e.src,x=e.srcSet,f=e.align,m=e.fit,j=e.loading,p=e.ignoreFallback,C=e.crossOrigin,k=o(e,u),g=null!=j||p||void 0===i&&void 0===l,y=a(t({},e,{ignoreFallback:g})),v=t({ref:n,objectFit:m,objectPosition:f},g?k:(0,s.CE)(k,["onError","onLoad"]));return"loaded"!==y?l||c.createElement(r.m$.img,t({as:h,className:"chakra-image__placeholder",src:i},v)):c.createElement(r.m$.img,t({as:h,src:d,srcSet:x,crossOrigin:C,loading:j,className:"chakra-image"},v))}));s.Ts&&(x.displayName="Image")},439:function(e,n,i){i.d(n,{Z:function(){return h}});var r=i(5893),s=i(7294),c=(0,i(4671).Z)((function(e){return{acitveId:"hh4",setActiveId:function(n){return e({acitveId:n})}}})),l=i(9736),t=(i(1172),i(2848),i(6412),i(1489),i(7375)),o=i(5193),a=i(2028),d=i(8790),u=function(e){var n=document.getElementById("parent_tab");e.target.style.backgroundColor="#00FBBD",e.target.classList.add("active");for(var i=parseInt(e.target.getAttribute("name")),r=0;r<n.querySelectorAll(".ShowSideClick").length;r++)r==i?n.querySelectorAll(".ShowSideClick")[r].classList.add("active"):n.querySelectorAll(".ShowSideClick")[r].classList.remove("active")};var h=function(){var e=(0,t.qY)(),n=e.isOpen,i=e.onOpen,h=e.onClose,x=s.useRef(),f=function(){var e=document.getElementsByClassName("dropSupport")[0].style.display;document.getElementsByClassName("dropSupport")[0].style.display="block"===e?"none":"block"},m=function(){var e=document.getElementsByClassName("dropOrder")[0].style.display;document.getElementsByClassName("dropOrder")[0].style.display="block"===e?"none":"block"},j=(0,s.useState)(""),p=j[0],C=j[1];(0,s.useEffect)((function(){C(localStorage.getItem("userRole"))}));var k=(0,s.useState)(c((function(e){return e.acitveId})));return k[0],k[1],(0,s.useEffect)((function(){})),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"sideBarNone",children:[(0,r.jsx)(o.zx,{ref:x,colorScheme:"yellow",onClick:i,children:(0,r.jsx)(l.Uq,{})}),(0,r.jsxs)(a.dy,{isOpen:n,placement:"left",onClose:h,finalFocusRef:x,children:[(0,r.jsx)(a.P1,{}),(0,r.jsxs)(a.sc,{children:[(0,r.jsx)(a.cC,{}),(0,r.jsx)(a.OX,{children:"EduQon"}),(0,r.jsx)(a.Ng,{display:{lg:"none"},children:"Sales"===p?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(d.xu,{fontSize:"xl",onClick:f,children:["Support",(0,r.jsx)(l.v4,{}),(0,r.jsx)(d.xu,{fontSize:"md",children:(0,r.jsxs)("ul",{className:"dropSupport",children:[(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"9",className:"hyi",children:"Home Chat Queue"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"10",className:"hyi",children:"Sales Chat Queue"})]})})]}),(0,r.jsxs)(d.xu,{fontSize:"xl",onClick:m,children:["Orders",(0,r.jsx)(l.v4,{}),(0,r.jsx)(d.xu,{fontSize:"md",children:(0,r.jsxs)("ul",{className:"dropOrder",children:[(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"12",id:"hh1",children:"Fresh"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"13",id:"hh2",children:"CP1 Pending"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"14",id:"hh3",children:"CP1 Done"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"15",id:"hh4",children:"Confirmation Asked"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"16",className:"hyi",children:"Assigned Expert"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"17",className:"hyi",children:"Raw Submission"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"18",className:"hyi",children:"Internal Rework"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"19",className:"hyi",children:"Proof Read"}),(0,r.jsxs)("li",{onClick:function(e){u(e),h()},name:"20",className:"hyi",children:["CP2 Done"," "]}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"21",className:"hyi",children:"Client Rework"})]})})]})]}):"Operator"===p?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.xu,{onClick:u,name:"11",fontSize:"xl",className:"hyi",children:"Calendar"}),(0,r.jsxs)(d.xu,{fontSize:"xl",onClick:m,children:["Orders",(0,r.jsx)(l.v4,{}),(0,r.jsx)(d.xu,{fontSize:"md",children:(0,r.jsxs)("ul",{className:"dropOrder",children:[(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"12",id:"hh1",children:"Fresh"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"13",id:"hh2",children:"CP1 Pending"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"14",id:"hh3",children:"CP1 Done"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"15",id:"hh4",children:"Confirmation Asked"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"16",className:"hyi",children:"Assigned Expert"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"17",className:"hyi",children:"Raw Submission"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"18",className:"hyi",children:"Internal Rework"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"19",className:"hyi",children:"Proof Read"}),(0,r.jsxs)("li",{onClick:function(e){u(e),h()},name:"20",className:"hyi",children:["CP2 Done"," "]}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"21",className:"hyi",children:"Client Rework"})]})})]})]}):"Super Admin"===p||"Admin"===p?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(d.xu,{fontSize:"xl",onClick:function(){var e=document.getElementsByClassName("drop")[0].style.display;document.getElementsByClassName("drop")[0].style.display="block"===e?"none":"block"},children:["Admin",(0,r.jsx)(l.v4,{}),(0,r.jsx)(d.xu,{fontSize:"md",children:(0,r.jsxs)("ul",{className:"drop",children:[(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"0",className:"hyi",children:"Assignments"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"1",className:"hyi",children:"Subjects"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"2",className:"hyi",children:"New User"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"3",className:"hyi",children:"Vendors"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"4",className:"hyi",children:"Admin"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"5",className:"hyi",children:"Operator"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"6",className:"hyi",children:"QC"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"7",className:"hyi",children:"Sales"}),(0,r.jsxs)("li",{onClick:function(e){u(e),h()},name:"8",className:"hyi",children:["Experts"," "]})]})})]}),(0,r.jsxs)(d.xu,{fontSize:"xl",onClick:f,children:["Support",(0,r.jsx)(l.v4,{}),(0,r.jsx)(d.xu,{fontSize:"md",children:(0,r.jsxs)("ul",{className:"dropSupport",children:[(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"9",className:"hyi",children:"Home Chat Queue"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"10",className:"hyi",children:"Sales Chat Queue"})]})})]}),(0,r.jsx)(d.xu,{onClick:function(e){u(e),h()},name:"11",fontSize:"xl",children:"Calendar"}),(0,r.jsxs)(d.xu,{fontSize:"xl",onClick:m,children:["Orders",(0,r.jsx)(l.v4,{}),(0,r.jsx)(d.xu,{fontSize:"md",children:(0,r.jsxs)("ul",{className:"dropOrder",children:[(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"12",className:"hyi",children:"Fresh"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"13",className:"hyi",children:"CP1 Pending"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"14",className:"hyi",children:"CP1 Done"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"15",className:"hyi",id:"hh4",children:"Confirmation Asked"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"16",className:"hyi",children:"Assigned Expert"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"17",className:"hyi",children:"Raw Submission"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"18",className:"hyi",children:"Internal Rework"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"19",className:"hyi",children:"Proof Read"}),(0,r.jsxs)("li",{onClick:function(e){u(e),h()},name:"20",className:"hyi",children:["CP2 Done"," "]}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"21",className:"hyi",children:"Client Rework"})]})})]})]}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(d.xu,{fontSize:"xl",onClick:m,children:["Orders",(0,r.jsx)(l.v4,{}),(0,r.jsxs)("ul",{className:"dropOrder",children:[(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"12",className:"hyi",children:"Fresh"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"13",className:"hyi",children:"CP1 Pending"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"14",className:"hyi",children:"CP1 Done"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"15",className:"hyi",id:"hh4",children:"Confirmation Asked"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"16",className:"hyi",children:"Assigned Expert"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"17",className:"hyi",children:"Raw Submission"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"18",className:"hyi",children:"Internal Rework"}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"19",className:"hyi",children:"Proof Read"}),(0,r.jsxs)("li",{onClick:function(e){u(e),h()},name:"20",className:"hyi",children:["CP2 Done"," "]}),(0,r.jsx)("li",{onClick:function(e){u(e),h()},name:"21",className:"hyi",children:"Client Rework"})]})]})})})]})]})]})})}},2848:function(e,n,i){i.r(n),i.d(n,{SubjectShow:function(){return y}});var r=i(8520),s=i.n(r),c=i(5893),l=i(2028),t=i(8790),o=i(5193),a=i(7375),d=i(9762),u=i(4612),h=i(9042),x=i(9669),f=i.n(x),m=i(7294),j=i(8754),p=i(1163),C=i(9736);function k(e,n,i,r,s,c,l){try{var t=e[c](l),o=t.value}catch(a){return void i(a)}t.done?n(o):Promise.resolve(o).then(r,s)}function g(e){return function(){var n=this,i=arguments;return new Promise((function(r,s){var c=e.apply(n,i);function l(e){k(c,r,s,l,t,"next",e)}function t(e){k(c,r,s,l,t,"throw",e)}l(void 0)}))}}var y=function(){};n.default=function(){var e=function(){return(0,c.jsxs)(l.u_,{onClose:P,isOpen:R,isCentered:!0,children:[(0,c.jsx)(l.ZA,{}),(0,c.jsxs)(l.hz,{children:[(0,c.jsx)(l.xB,{children:T}),(0,c.jsx)(l.ol,{}),(0,c.jsx)(l.fe,{children:(0,c.jsx)(t.xv,{children:"Are you sure you want to delete?"})}),(0,c.jsx)(l.mz,{children:(0,c.jsx)(o.zx,{bgColor:"red",color:"white",onClick:g(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",S(T));case 1:case"end":return e.stop()}}),e)}))),children:"Delete"})})]})]})},n=(0,m.useState)([]),i=n[0],r=n[1],x=[],k=(0,p.useRouter)();function y(){return v.apply(this,arguments)}function v(){return(v=g(s().mark((function e(){var n,i,c;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==localStorage.getItem("userToken")&&k.replace("/admin/login"),e.next=5,f().get(j.JW+"/util/subject/fetch");case 5:if(n=e.sent,i=n.data.res,x=[],0!==i.length)for(c=0;c<i.length;c++)x.push({_id:i[c]._id});else console.log("No Subjects");r(x),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function N(){return(N=g(s().mark((function e(){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==(n=document.getElementById("subject")).value){e.next=5;break}window.alert("Enter a subject name"),e.next=17;break;case 5:return e.prev=5,e.next=8,f().post(j.JW+"/util/subject/new",{_id:n.value});case 8:if(!e.sent.data.success){e.next=13;break}return e.next=12,y();case 12:n.value="";case 13:e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})))).apply(this,arguments)}function S(e){return b.apply(this,arguments)}function b(){return(b=g(s().mark((function e(n){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f().get(j.JW+"/util/subject/delete?_id="+n);case 3:if(!e.sent.data.success){e.next=9;break}return e.next=7,y();case 7:P(),E("");case 9:e.next=13;break;case 11:e.prev=11,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}(0,m.useEffect)((function(){y()}),[]);var w=(0,m.useState)(""),T=w[0],E=w[1],O=(0,a.qY)(),R=O.isOpen,A=O.onOpen,P=O.onClose;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e,{}),(0,c.jsx)("div",{className:"SubjectShow ShowSideClick",children:(0,c.jsxs)(t.gC,{children:[(0,c.jsx)(t.xu,{width:"100%",children:(0,c.jsxs)(d.NI,{id:"subject",children:[(0,c.jsx)(d.lX,{children:"Add New Subject"}),(0,c.jsxs)(u.BZ,{children:[(0,c.jsx)(u.II,{type:"text"}),(0,c.jsx)(u.xH,{padding:"5px",children:(0,c.jsx)(o.hU,{icon:(0,c.jsx)(C.dt,{}),onClick:function(){return function(){return N.apply(this,arguments)}()}})})]})]})}),(0,c.jsxs)(h.iA,{variant:"simple",size:"md",children:[(0,c.jsx)(h.hr,{bgColor:"gray.200",children:(0,c.jsxs)(h.Tr,{children:[(0,c.jsx)(h.Th,{children:"Name"}),(0,c.jsx)(h.Th,{})]})}),(0,c.jsx)(h.p3,{children:i.map((function(e){return(0,c.jsxs)(h.Tr,{children:[(0,c.jsx)(h.Td,{fontWeight:"bold",children:e._id}),(0,c.jsx)(h.Td,{children:(0,c.jsx)(o.hU,{icon:(0,c.jsx)(C.pJ,{}),onClick:function(){E(e._id),A()}})})]},e._id)}))})]})]})})]})}},1489:function(e,n,i){i.r(n),i.d(n,{VendorShow:function(){return g}});var r=i(8520),s=i.n(r),c=i(5893),l=i(2028),t=i(8790),o=i(5193),a=i(7375),d=i(9042),u=i(4090),h=i(9669),x=i.n(h),f=i(7294),m=i(8754),j=i(1163),p=i(9736);function C(e,n,i,r,s,c,l){try{var t=e[c](l),o=t.value}catch(a){return void i(a)}t.done?n(o):Promise.resolve(o).then(r,s)}function k(e){return function(){var n=this,i=arguments;return new Promise((function(r,s){var c=e.apply(n,i);function l(e){C(c,r,s,l,t,"next",e)}function t(e){C(c,r,s,l,t,"throw",e)}l(void 0)}))}}var g=function(){document.write("VENDRO")};n.default=function(){var e=function(){return(0,c.jsxs)(l.u_,{onClose:R,isOpen:E,isCentered:!0,children:[(0,c.jsx)(l.ZA,{}),(0,c.jsxs)(l.hz,{children:[(0,c.jsx)(l.xB,{children:b}),(0,c.jsx)(l.ol,{}),(0,c.jsx)(l.fe,{children:(0,c.jsx)(t.xv,{children:"Are you sure you want to delete?"})}),(0,c.jsx)(l.mz,{children:(0,c.jsx)(o.zx,{bgColor:"red",color:"white",onClick:k(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",v(b));case 1:case"end":return e.stop()}}),e)}))),children:"Delete"})})]})]})},n=(0,f.useState)([]),i=n[0],r=n[1],h=[],C=(0,j.useRouter)();function g(){return y.apply(this,arguments)}function y(){return(y=k(s().mark((function e(){var n,i,c,l,t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(n=localStorage.getItem("userToken"))&&C.replace("/admin/login"),i={headers:{Authorization:"Bearer ".concat(n)}},e.next=6,x().post(m.JW+"/user/fetch",{role:"Vendor"},i);case 6:if(c=e.sent,l=c.data.res,h=[],0!==l.length)for(t=0;t<l.length;t++)h.push({id:l[t]._id,name:l[t].name,contact_no:l[t].contact_no,referralCode:l[t].referralCode});else console.log("No Vendors");r(h),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}function v(e){return N.apply(this,arguments)}function N(){return(N=k(s().mark((function e(n){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x().get(m.JW+"/user/delete?_id="+n);case 3:if(!e.sent.data.success){e.next=9;break}return e.next=7,g();case 7:R(),w("");case 9:e.next=13;break;case 11:e.prev=11,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}(0,f.useEffect)((function(){g()}),[]);var S=(0,f.useState)(""),b=S[0],w=S[1],T=(0,a.qY)(),E=T.isOpen,O=T.onOpen,R=T.onClose;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e,{}),(0,c.jsxs)(d.iA,{variant:"simple",size:"md",className:"Vendors",display:{base:"none",sm:"block",md:"block"},children:[(0,c.jsx)(d.hr,{bgColor:"gray.200",children:(0,c.jsxs)(d.Tr,{children:[(0,c.jsx)(d.Th,{children:"ID"}),(0,c.jsx)(d.Th,{children:"Name"}),(0,c.jsx)(d.Th,{children:"Contact Number"}),(0,c.jsx)(d.Th,{children:"Referral Code"}),(0,c.jsx)(d.Th,{})]})}),(0,c.jsx)(d.p3,{children:i.map((function(e){return(0,c.jsxs)(d.Tr,{children:[(0,c.jsx)(d.Td,{fontWeight:"bold",children:e.id}),(0,c.jsx)(d.Td,{children:e.name}),(0,c.jsx)(d.Td,{children:e.contact_no}),(0,c.jsx)(d.Td,{children:e.referralCode}),(0,c.jsx)(d.Td,{children:(0,c.jsx)(o.hU,{icon:(0,c.jsx)(p.pJ,{}),onClick:function(){w(e.id),O()}})})]},e.id)}))})]}),(0,c.jsx)("div",{class:"ShowSideClick",children:(0,c.jsx)(u.UQ,{defaultIndex:[0],allowMultiple:!0,display:{base:"block",sm:"none",md:"none"},children:(0,c.jsxs)(u.Qd,{children:[(0,c.jsx)("h2",{children:(0,c.jsxs)(u.KF,{children:[(0,c.jsx)(t.xu,{flex:"1",textAlign:"left",children:"vendor ID :-"}),(0,c.jsx)(u.XE,{})]})}),(0,c.jsx)(u.Hk,{pb:4,children:(0,c.jsx)(d.xJ,{children:(0,c.jsxs)(d.iA,{children:[(0,c.jsx)(d.Rn,{children:"Imperial to metric conversion factors"}),(0,c.jsx)(d.p3,{children:i.map((function(e){return(0,c.jsx)(d.Tr,{children:(0,c.jsxs)(d.iA,{children:[(0,c.jsxs)(d.Tr,{children:[(0,c.jsx)(d.Th,{children:"Name"}),(0,c.jsx)(d.Td,{children:e.name})]}),(0,c.jsxs)(d.Tr,{children:[(0,c.jsx)(d.Th,{children:"Contact Number"}),(0,c.jsx)(d.Td,{children:e.contact_no})]}),(0,c.jsxs)(d.Tr,{children:[(0,c.jsx)(d.Th,{children:"Referral Code"}),(0,c.jsx)(d.Td,{children:e.referralCode})]}),(0,c.jsxs)(d.Tr,{children:[(0,c.jsx)(d.Th,{children:"Delete"}),(0,c.jsx)(d.Td,{children:(0,c.jsx)(o.hU,{icon:(0,c.jsx)(p.pJ,{}),onClick:function(){w(e.id),O()}})})]})]})},e.id)}))})]})})})]})})})]})}},2024:function(e,n,i){i.r(n);var r=i(8520),s=i.n(r),c=i(5893),l=i(7294),t=i(8790),o=i(949),a=i(4651),d=i(5193),u=i(1163),h=i(439);function x(e,n,i,r,s,c,l){try{var t=e[c](l),o=t.value}catch(a){return void i(a)}t.done?n(o):Promise.resolve(o).then(r,s)}n.default=function(){var e,n=(0,l.useState)(""),i=n[0],r=n[1];(0,l.useEffect)((e=s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r(localStorage.getItem("userRole"));case 1:case"end":return e.stop()}}),e)})),function(){var n=this,i=arguments;return new Promise((function(r,s){var c=e.apply(n,i);function l(e){x(c,r,s,l,t,"next",e)}function t(e){x(c,r,s,l,t,"throw",e)}l(void 0)}))}));var f=(0,u.useRouter)();return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(t.xu,{children:(0,c.jsxs)(t.kC,{bg:(0,o.ff)("white","gray.800"),color:(0,o.ff)("gray.600","white"),minH:"60px",py:{base:2},px:{base:4,md:10},borderBottom:1,borderStyle:"solid",borderColor:(0,o.ff)("gray.200","gray.900"),align:"center",children:[null!==i?(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(h.Z,{})}):null,(0,c.jsx)(t.kC,{flex:{base:1},justify:{base:"center",md:"start"},children:(0,c.jsx)(a.Ee,{src:"/assets/Logo.png",w:20})}),(0,c.jsx)(d.zx,{display:"/admin/login"===window.location.pathname?"none":"flex",onClick:function(){localStorage.removeItem("userEmail"),localStorage.removeItem("userRole"),localStorage.removeItem("userName"),localStorage.removeItem("userToken"),f.replace("/admin/login")},children:"Log Out"})]})})})}}}]);