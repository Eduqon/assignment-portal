"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2517],{3409:function(e,r,n){n.r(r),n.d(r,{default:function(){return R}});var t=n(8520),i=n.n(t),s=n(5893),c=n(9736),o=n(5193),a=n(9042),d=n(8790),l=n(7375),u=n(2028),x=n(9762),h=n(4612),p=n(4090),f=n(9669),g=n.n(f),j=n(7294),m=n(8754),b=n(1163);function w(e,r,n,t,i,s,c){try{var o=e[s](c),a=o.value}catch(d){return void n(d)}o.done?r(a):Promise.resolve(a).then(t,i)}var v,k=localStorage.getItem("userToken"),S={headers:{Authorization:"Bearer ".concat(k)}},C=(v=i().mark((function e(r){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=JSON.parse(r),e.next=3,g().post("".concat(m.JW,"/assignment/update"),r,S).then((function(e){return e.data}),(function(e){return e.response.data})).catch((function(e){}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})),function(){var e=this,r=arguments;return new Promise((function(n,t){var i=v.apply(e,r);function s(e){w(i,n,t,s,c,"next",e)}function c(e){w(i,n,t,s,c,"throw",e)}s(void 0)}))});n(8765);function y(e,r,n,t,i,s,c){try{var o=e[s](c),a=o.value}catch(d){return void n(d)}o.done?r(a):Promise.resolve(a).then(t,i)}function O(e){return function(){var r=this,n=arguments;return new Promise((function(t,i){var s=e.apply(r,n);function c(e){y(s,t,i,c,o,"next",e)}function o(e){y(s,t,i,c,o,"throw",e)}c(void 0)}))}}var R=function(e){var r=e.incrementCounter,n=e.decrementCounter,t=(0,l.qY)(),f=t.isOpen,w=t.onOpen,v=t.onClose,k=(0,j.useState)([]),S=k[0],y=k[1],R=(0,j.useState)(""),T=R[0],z=R[1],P=(0,j.useState)(""),D=P[0],A=P[1],W=[],E=(0,b.useRouter)();function F(){return _.apply(this,arguments)}function _(){return(_=O(i().mark((function e(){var r,n,t,s,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(r=localStorage.getItem("userToken"))&&E.replace("/admin/login"),n={headers:{Authorization:"Bearer ".concat(r)}},e.next=6,g().get(m.JW+"/assignment/fetch?status=CP1%20Pending",n);case 6:if(t=e.sent,s=t.data.assignmentData,W=[],0!==s.length)for(c=0;c<s.length;c++)W.push({id:s[c]._id,client_id:s[c].client_id,subject:s[c].subject,status:s[c].status,quotation:s[c].quotation,currencyOfQuote:s[c].currencyOfQuote,level:s[c].level,reference:s[c].reference,description:s[c].description,descriptionFile:s[c].descriptionFile,numOfPages:s[c].numOfPages,paid:s[c].paid,deadline:new Date(s[c].deadline).toLocaleTimeString()+", "+new Date(s[c].deadline).toDateString(),expertDeadline:new Date(s[c].expertDeadline).toLocaleTimeString()+", "+new Date(s[c].expertDeadline).toDateString()});else console.log("No CP1 Pending Orders");y(W),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}(0,j.useEffect)((function(){F()}),[]);var I=O(i().mark((function e(){var n,t,s,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=localStorage.getItem("userToken"),!(D.trim().length>0)){e.next=14;break}return t={_id:T,status:"CP1 Done",paid:D},e.next=5,C(JSON.stringify(t));case 5:return s=e.sent,c={headers:{Authorization:"Bearer ".concat(n)}},e.next=9,g().post(m.JW+"/notifications",{assignmentId:T,status:"CP1 Done",read:!1},c);case 9:e.sent,r("CP1 Done"),s.success&&(F(),v()),e.next=15;break;case 14:alert("Please Fill the Amount Paid Field");case 15:case"end":return e.stop()}}),e)})));return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(u.u_,{isOpen:f,onClose:v,children:[(0,s.jsx)(u.ZA,{}),(0,s.jsxs)(u.hz,{children:[(0,s.jsx)(u.xB,{children:"Add To CP1 Done"}),(0,s.jsx)(u.ol,{}),(0,s.jsx)(u.fe,{children:(0,s.jsxs)(x.NI,{children:[(0,s.jsx)(x.lX,{children:"Amount Paid by Client"}),(0,s.jsx)(h.II,{type:"number",value:D,onChange:function(e){A(e.target.value)},placeholder:"Amount Paid By Client"})]})}),(0,s.jsxs)(u.mz,{children:[(0,s.jsx)(o.zx,{colorScheme:"gray",mr:3,onClick:v,children:"Close"}),(0,s.jsx)(o.zx,{colorScheme:"blue",onClick:function(){I()},children:"Submit"})]})]})]}),(0,s.jsxs)(a.iA,{variant:"simple",size:"md",display:{base:"none",sm:"block",md:"block"},children:[(0,s.jsx)(a.hr,{bgColor:"gray.200",children:(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Th,{children:"Id"}),(0,s.jsx)(a.Th,{children:"Student Email"}),(0,s.jsx)(a.Th,{children:"Subject"}),(0,s.jsx)(a.Th,{children:"Order Quote"}),(0,s.jsx)(a.Th,{children:"Amount Paid"}),(0,s.jsx)(a.Th,{children:"Expert Deadline "}),(0,s.jsx)(a.Th,{children:"Deadline"}),(0,s.jsx)(a.Th,{children:"Status"}),(0,s.jsx)(a.Th,{children:(0,s.jsx)(o.zx,{leftIcon:(0,s.jsx)(c.ny,{}),onClick:O(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F();case 2:case"end":return e.stop()}}),e)}))),children:"Refresh"})})]})}),(0,s.jsx)(a.p3,{children:S.map((function(e,r){return(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Td,{fontWeight:"semibold",children:(0,s.jsx)(d.rU,{href:"/admin/assignment_details/"+e.id,children:e.id})}),(0,s.jsx)(a.Td,{children:"Super Admin"===localStorage.getItem("userRole")||"Admin"===localStorage.getItem("userRole")?e.client_id:e.client_id.substring(0,2)+"****@****.com"}),(0,s.jsx)(a.Td,{color:"green.600",fontWeight:"semibold",children:e.subject}),(0,s.jsx)(a.Td,{children:e.quotation}),(0,s.jsx)(a.Td,{children:e.paid}),(0,s.jsx)(a.Td,{color:"red.600",fontWeight:"semibold",children:e.expertDeadline}),(0,s.jsx)(a.Td,{color:"red.600",fontWeight:"semibold",children:e.deadline}),(0,s.jsx)(a.Td,{fontWeight:"semibold",color:"Fresh Order"===e.status?"green":"Doability Asked"===e.status?"orange":"red",children:e.status}),(0,s.jsx)(a.Td,{children:(0,s.jsx)(o.zx,{onClick:function(){w(),z(e.id),n("CP1 Pending")},children:"Add to CP1 Done"})})]},e.id)}))})]}),(0,s.jsx)("div",{className:"ShowSideClick",children:S.map((function(e){return(0,s.jsx)(p.UQ,{defaultIndex:[0],allowMultiple:!0,display:{base:"block",sm:"none",md:"none"},children:(0,s.jsxs)(p.Qd,{children:[(0,s.jsx)("h2",{children:(0,s.jsxs)(p.KF,{children:[(0,s.jsx)(d.xu,{flex:"1",textAlign:"left",children:(0,s.jsx)(a.iA,{children:(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Th,{children:"Id"}),(0,s.jsx)(a.Td,{fontWeight:"semibold",children:(0,s.jsx)(d.rU,{href:"/admin/assignment_details/"+e.id,children:e.id})})]})})}),(0,s.jsx)(p.XE,{})]})}),(0,s.jsx)(p.Hk,{pb:0,children:(0,s.jsx)(a.Tr,{children:(0,s.jsxs)(a.iA,{bgColor:"gray.200",variant:"simple",size:"md",children:[(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Th,{children:"Student Email"}),(0,s.jsx)(a.Td,{children:"Super Admin"===localStorage.getItem("userRole")||"Admin"===localStorage.getItem("userRole")?e.client_id:e.client_id.substring(0,2)+"****@****.com"})]}),(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Th,{children:"Subject"}),(0,s.jsx)(a.Td,{color:"green.600",fontWeight:"semibold",children:e.subject})]}),(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Th,{children:"Order Quote"}),(0,s.jsx)(a.Td,{children:e.quotation})]}),(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Th,{children:"Amount Paid"}),(0,s.jsx)(a.Td,{children:e.paid})]}),(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Th,{children:"Expert Deadline"}),(0,s.jsx)(a.Td,{color:"red.600",fontWeight:"semibold",children:e.expertDeadline})]}),(0,s.jsxs)(a.Tr,{children:[(0,s.jsx)(a.Th,{children:"Deadline"}),(0,s.jsx)(a.Td,{color:"red.600",fontWeight:"semibold",children:e.deadline})]}),(0,s.jsx)(a.Tr,{children:(0,s.jsx)(a.Th,{children:(0,s.jsx)(o.zx,{leftIcon:(0,s.jsx)(c.ny,{}),onClick:O(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F();case 2:case"end":return e.stop()}}),e)}))),children:"Refresh"})})})]})},e.id)})]})})}))})]})}},2517:function(e,r,n){n.r(r);var t=n(8520),i=n.n(t),s=n(5893),c=n(2028),o=n(9042),a=n(5193),d=n(7375),l=n(8790),u=n(9839),x=n(1163),h=n(1889),p=n(231),f=n(3409),g=n(2445),j=n(8925),m=n(2294),b=n(6746),w=n(1346),v=n(7294),k=n(4983),S=n(6148),C=n(740),y=n(9669),O=n.n(y),R=n(8754),T=n(6257),z=n(7388);function P(e,r,n,t,i,s,c){try{var o=e[s](c),a=o.value}catch(d){return void n(d)}o.done?r(a):Promise.resolve(a).then(t,i)}function D(e){return function(){var r=this,n=arguments;return new Promise((function(t,i){var s=e.apply(r,n);function c(e){P(s,t,i,c,o,"next",e)}function o(e){P(s,t,i,c,o,"throw",e)}c(void 0)}))}}function A(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function W(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){A(e,r,n[r])}))}return e}function E(e){return function(e){if(Array.isArray(e)){for(var r=0,n=new Array(e.length);r<e.length;r++)n[r]=e[r];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}r.default=function(){var e,r,n,t,y=function(e){return(0,s.jsxs)(c.u_,{size:"sm",onClose:ae.onClose,isOpen:ae.isOpen,onOpen:ae.onOpen,isCentered:!0,children:[(0,s.jsx)(c.ZA,{}),(0,s.jsxs)(c.hz,{maxH:"500px",overflowY:"scroll",children:[(0,s.jsx)(c.xB,{children:"New Notification"}),(0,s.jsx)(c.ol,{}),(0,s.jsx)(c.fe,{children:(0,s.jsxs)(o.iA,{marginTop:2,variant:"simple",size:"sm",children:[(0,s.jsx)(o.hr,{bgColor:"gray.200",children:(0,s.jsxs)(o.Tr,{children:[(0,s.jsx)(o.Th,{children:"ID"}),(0,s.jsx)(o.Th,{})]})}),(0,s.jsx)(o.p3,{children:ne&&0===ne.length?(0,s.jsx)(s.Fragment,{}):ne&&ne.map((function(e,r){return(0,s.jsxs)(o.Tr,{children:[(0,s.jsx)(o.Td,{fontWeight:"semibold",children:(0,s.jsx)("a",{href:R.Ll+"/admin/assignment_details/"+e._id,target:"_blank",onClick:function(){return we(e)},children:e._id})}),(0,s.jsx)(o.Td,{className:"d-flex justify-content-end",children:(0,s.jsx)(a.zx,{onClick:function(){return we(e)},children:(0,s.jsx)("span",{children:"\u2705"})})})]},e._id)}))})]})})]})]})},P=(0,v.useState)([]),F=P[0],_=P[1],I=(0,v.useState)({}),N=I[0],X=I[1],K=(0,v.useState)({}),J=K[0],Q=K[1],B=(0,v.useState)([]),U=B[0],q=B[1],L=(0,v.useState)([]),M=L[0],Y=L[1],H=(0,v.useState)([]),V=H[0],Z=H[1],$=(0,v.useState)(""),G=$[0],ee=$[1],re=(0,v.useState)([]),ne=re[0],te=re[1],ie=(0,v.useState)({}),se=ie[0],ce=ie[1],oe=(0,x.useRouter)(),ae=(0,d.qY)();function de(){return(de=D(i().mark((function e(){var r,n,t,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(r=localStorage.getItem("userToken"))&&oe.replace("/admin/login"),n={headers:{Authorization:"Bearer ".concat(r)}},e.next=6,O().post(R.JW+"/assignment/fetch",{status:{$in:["Expert Assigned","Raw Submission","Proof Read","CP2 Done"]}},n);case 6:return t=e.sent,e.next=9,t.data.assignmentData;case 9:(s=e.sent)&&0!==s.length?Y(s):console.log("Assignment Not Found"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}function le(){return(le=D(i().mark((function e(){var r,n,t,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(r=localStorage.getItem("userToken"))&&oe.replace("/admin/login"),n={headers:{Authorization:"Bearer ".concat(r)}},e.next=6,O().post(R.JW+"/assignment/fetch",{status:{$in:["Expert Asked"]}},n);case 6:return t=e.sent,e.next=9,t.data.assignmentData;case 9:(s=e.sent)&&0!==s.length?Z(s):console.log("Assignment Not Found"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}function ue(){return(ue=D(i().mark((function e(){var r,n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O().get(R.JW+"/messages");case 3:return r=e.sent,e.next=6,r.data;case 6:(n=e.sent).success&&_(n.result),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function xe(e,r){return he.apply(this,arguments)}function he(){return(he=D(i().mark((function e(r,n){var t,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("userEmail"),e.prev=1,s=r+"_"+t+"_"+n,e.next=5,(0,T.QT)((0,T.JU)(z.db,"chat",s));case 5:if(e.sent.exists()){e.next=9;break}return e.next=9,(0,T.pl)((0,T.JU)(z.db,"chat",s),{conversation:[]});case 9:(0,T.cf)((0,T.JU)(z.db,"chat",s),(function(e){X((function(r){return W({},r,A({},n,e.data().conversation))}))})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})))).apply(this,arguments)}function pe(e,r){return fe.apply(this,arguments)}function fe(){return(fe=D(i().mark((function e(r,n){var t,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("userEmail"),e.prev=1,s=r+"_"+t+"_"+n,e.next=5,(0,T.QT)((0,T.JU)(z.db,"chat",s));case 5:if(e.sent.exists()){e.next=9;break}return e.next=9,(0,T.pl)((0,T.JU)(z.db,"chat",s),{conversation:[]});case 9:(0,T.cf)((0,T.JU)(z.db,"chat",s),(function(e){Q((function(t){return W({},t,A({},"".concat(n,"_").concat(r),e.data().conversation))}))})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})))).apply(this,arguments)}function ge(){return je.apply(this,arguments)}function je(){return(je=D(i().mark((function e(){var n,t,s,c,o,a;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r&&0!==r.length){for(n={},t=[],s=E(new Set(r.map((function(e){return e.id.split("_")[0]})))),c=0;c<r.length;c++)n.id=r[c].id.split("_")[0],n.date=r[c].date,n.expertEmail=r[c].id.split("_")[1],n.expertChat=r[c].chat.filter((function(e){return e.user===r[c].id.split("_")[1]})),t.push(W({},n));o=t.reduce((function(e,r){var n=r.id,t=r.date,i=r.expertChat,s=r.expertEmail;return e.hasOwnProperty(n)||(e[n]={id:n,experts:[]}),e[n].experts=E(e[n].experts).concat([{date:t,expertEmail:s,expertChat:i}]),e}),{}),0!==(a=Object.entries(o).flat().filter((function(e){return!s.some((function(r){return r==e}))})).filter((function(e){return e.experts.some((function(e){return 0!==e.expertChat.length}))}))).length&&q(a)}case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(0,v.useEffect)(D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ee(localStorage.getItem("userRole"));case 1:case"end":return e.stop()}}),e)})))),(0,v.useEffect)((function(){!function(){ue.apply(this,arguments)}(),function(){de.apply(this,arguments)}(),function(){le.apply(this,arguments)}(),D(i().mark((function e(){var r,n,t,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O().get(R.JW+"/notifications/countByStatus");case 2:r=e.sent,n=r.data,(t=n.result)&&(s=Object.fromEntries(t.map((function(e){return[e._id,e.count]}))),ce(s));case 6:case"end":return e.stop()}}),e)})))()}),[]),(0,v.useEffect)((function(){D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n&&0!==n.length&&n.map(D(i().mark((function e(r){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,xe(r.expertEmail,r._id);case 2:case"end":return e.stop()}}),e)})))),t&&0!==t.length&&t.map(D(i().mark((function e(r){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.allExperts||[r.expertEmail],e.next=3,Promise.all(n.map((function(e){return pe(e,r._id)})));case 3:case"end":return e.stop()}}),e)}))));case 2:case"end":return e.stop()}}),e)})))()}),[F]),(0,v.useEffect)((function(){D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ge();case 2:case"end":return e.stop()}}),e)})))()}),[J]),0!==M.length&&0!==V.length&&0!==F.length&&(n=F.filter((function(e){return M.some((function(r){return r._id===e._id}))})),t=F.filter((function(e){return V.some((function(r){return r._id===e._id}))}))),0!==Object.keys(J).length&&(r=Object.keys(J).map((function(e){var r=J[e];return{id:e,chat:r,date:0!==r.length&&new Date(r[r.length-1].time).toLocaleDateString("en-US")}})));var me=function(e){ce((function(r){return W({},r,A({},e,r[e]+1||1))}))},be=function(e){ce((function(r){return W({},r,A({},e,r[e]&&r[e]-1))}))};function we(e){return ve.apply(this,arguments)}function ve(){return(ve=D(i().mark((function e(r){var n,t,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(n=localStorage.getItem("userToken"))&&oe.replace("/admin/login"),t={headers:{Authorization:"Bearer ".concat(n)}},e.next=6,O().put(R.JW+"/notifications/read",{assignmentId:r._id},t);case 6:if(s=e.sent,s.data.result,!s.data.success){e.next=12;break}return e.next=11,ae.onClose();case 11:be(r.status);case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}function ke(e){return Se.apply(this,arguments)}function Se(){return(Se=D(i().mark((function e(r){var n,t,s,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(n=localStorage.getItem("userToken"))&&oe.replace("/admin/login"),t={headers:{Authorization:"Bearer ".concat(n)}},e.next=6,O().get(R.JW+"/notifications?status=".concat(r),t);case 6:s=e.sent,c=s.data.result,te(c),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:ae.onOpen();case 15:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}return 0!==Object.keys(N).length&&(e=Object.keys(N).map((function(e){var r=N[e].filter((function(e){return n.some((function(r){return r.expertEmail===e.user}))}));return{id:e,chat:r,date:0!==r.length&&new Date(r[r.length-1].time).toLocaleDateString("en-US")}}))),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(y,{}),(0,s.jsx)(l.xu,{padding:0,children:(0,s.jsx)(u.mQ,{isLazy:!0,variant:"soft-rounded",children:"Super Admin"===G||"Admin"===G?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(u.td,{children:[(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Fresh"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP1 Pending"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP1 Done"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Confirmation Asked"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Assigned Expert"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Raw Submission"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Internal Rework"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Proof Read"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP2 Done"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Client Rework"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Client Rework"));case 1:case"end":return e.stop()}}),e)}))),children:se["Client Rework"]})]}),(0,s.jsxs)(u.nP,{children:[(0,s.jsx)(u.x4,{children:(0,s.jsx)(j.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(f.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(p.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(g.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(h.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(w.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(m.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(b.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(S.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(C.default,{incrementCounter:me})})]})]}):"Operator"===G?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(u.td,{children:[(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Fresh"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Fresh Order"));case 1:case"end":return e.stop()}}),e)}))),children:se["Fresh Order"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP1 Pending"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("CP1 Pending"));case 1:case"end":return e.stop()}}),e)}))),children:se["CP1 Pending"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP1 Done"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("CP1 Done"));case 1:case"end":return e.stop()}}),e)}))),children:se["CP1 Done"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Confirmation Asked"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Expert Asked"));case 1:case"end":return e.stop()}}),e)}))),children:se["Expert Asked"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Assigned Expert"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Expert Assigned"));case 1:case"end":return e.stop()}}),e)}))),children:se["Expert Assigned"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Raw Submission"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Raw Submission"));case 1:case"end":return e.stop()}}),e)}))),children:se["Raw Submission"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Proof Read"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Proof Read"));case 1:case"end":return e.stop()}}),e)}))),children:se["Proof Read"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP2 Done"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("CP2 Done"));case 1:case"end":return e.stop()}}),e)}))),children:se["CP2 Done"]})]}),(0,s.jsxs)(u.nP,{children:[(0,s.jsx)(u.x4,{children:(0,s.jsx)(j.default,{incrementCounter:me,decrementCounter:be})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(f.default,{incrementCounter:me,decrementCounter:be})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(p.default,{incrementCounter:me,decrementCounter:be})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(g.default,{incrementCounter:me,decrementCounter:be,inProcessOrderAssignedExpertMessages:r,operatorExpertChat:J,inProcessOrderData:U})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(h.default,{confirmOrderAssignedExpertMessages:e,operatorExpertChat:N})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(w.default,{incrementCounter:me,decrementCounter:be,confirmOrderAssignedExpertMessages:e,operatorExpertChat:N})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(b.default,{incrementCounter:me,decrementCounter:be,confirmOrderAssignedExpertMessages:e,operatorExpertChat:N})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(S.default,{incrementCounter:me,decrementCounter:be,confirmOrderAssignedExpertMessages:e,operatorExpertChat:N})})]})]}):"QC"===G?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(u.td,{children:[(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Raw Submission"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Raw Submission"));case 1:case"end":return e.stop()}}),e)}))),children:se["Raw Submission"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Internal Rework"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Internal Rework"));case 1:case"end":return e.stop()}}),e)}))),children:se["Internal Rework"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Proof Read"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Proof Read"));case 1:case"end":return e.stop()}}),e)}))),children:se["Proof Read"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP2 Done"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("CP2 Done"));case 1:case"end":return e.stop()}}),e)}))),children:se["CP2 Done"]}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Client Rework"})}),(0,s.jsx)("div",{className:"text-center",style:{width:"30px",height:"30px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontSize:"20px",fontWeight:"bold"},onClick:D(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ke("Client Rework"));case 1:case"end":return e.stop()}}),e)}))),children:se["Client Rework"]})]}),(0,s.jsxs)(u.nP,{children:[(0,s.jsx)(u.x4,{children:(0,s.jsx)(w.default,{incrementCounter:me,decrementCounter:be})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(m.default,{incrementCounter:me,decrementCounter:be})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(b.default,{incrementCounter:me,decrementCounter:be})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(S.default,{incrementCounter:me,decrementCounter:be})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(C.default,{incrementCounter:me,decrementCounter:be})})]})]}):"Sales"===G?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(u.td,{children:[(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Fresh"})}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP1 Pending"})}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP1 Done"})}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Proof Read"})}),(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"CP2 Done"})})]}),(0,s.jsxs)(u.nP,{children:[(0,s.jsx)(u.x4,{children:(0,s.jsx)(j.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(f.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(p.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(b.default,{})}),(0,s.jsx)(u.x4,{children:(0,s.jsx)(S.default,{})})]})]}):"Vendor"===G?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(u.td,{children:(0,s.jsx)(u.OK,{style:{borderRadius:"5px"},children:(0,s.jsx)(l.X6,{fontSize:"lg",children:"Vendor Orders"})})}),(0,s.jsx)(u.nP,{children:(0,s.jsx)(u.x4,{children:(0,s.jsx)(k.default,{})})})]}):(0,s.jsx)(s.Fragment,{})})}),(0,s.jsxs)(l.xu,{display:{base:"block",sm:"none",md:"none "},id:"parent_tabOrder",children:[(0,s.jsx)(j.default,{}),(0,s.jsx)(f.default,{}),(0,s.jsx)(p.default,{}),(0,s.jsx)(g.default,{}),(0,s.jsx)(h.default,{}),(0,s.jsx)(w.default,{}),(0,s.jsx)(m.default,{}),(0,s.jsx)(b.default,{}),(0,s.jsx)(S.default,{}),(0,s.jsx)(C.default,{})]})]})}},4983:function(e,r,n){n.r(r);var t=n(8520),i=n.n(t),s=n(5893),c=n(9736),o=n(9042),a=n(5193),d=n(9669),l=n.n(d),u=n(7294),x=n(8754),h=n(1163);function p(e,r,n,t,i,s,c){try{var o=e[s](c),a=o.value}catch(d){return void n(d)}o.done?r(a):Promise.resolve(a).then(t,i)}function f(e){return function(){var r=this,n=arguments;return new Promise((function(t,i){var s=e.apply(r,n);function c(e){p(s,t,i,c,o,"next",e)}function o(e){p(s,t,i,c,o,"throw",e)}c(void 0)}))}}r.default=function(){var e=(0,u.useState)([]),r=e[0],n=e[1],t=[],d=(0,h.useRouter)();function p(){return g.apply(this,arguments)}function g(){return(g=f(i().mark((function e(){var r,s,c,o,a,u;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=localStorage.getItem("userToken"),s=localStorage.getItem("userEmail"),null==r&&d.replace("/admin/login"),c={headers:{Authorization:"Bearer ".concat(r)}},e.next=7,l().get(x.JW+"/assignment/fetch?vendorId="+s,c);case 7:if(o=e.sent,a=o.data.assignmentData,t=[],0!==a.length)for(u=0;u<a.length;u++)t.push({id:a[u]._id,client_id:a[u].client_id,assignedQC:a[u].assignedQC,subject:a[u].subject,status:a[u].status,quotation:a[u].quotation,currencyOfQuote:a[u].currencyOfQuote,level:a[u].level,reference:a[u].reference,description:a[u].description,descriptionFile:a[u].descriptionFile,numOfPages:a[u].numOfPages,paid:a[u].paid,deadline:new Date(a[u].deadline).toLocaleTimeString()+", "+new Date(a[u].deadline).toDateString(),expertDeadline:new Date(a[u].expertDeadline).toLocaleTimeString()+", "+new Date(a[u].expertDeadline).toDateString()});else window.alert("No Orders");n(t),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}return(0,u.useEffect)((function(){p()}),[]),(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(o.iA,{variant:"simple",size:"md",children:[(0,s.jsx)(o.hr,{bgColor:"gray.200",children:(0,s.jsxs)(o.Tr,{children:[(0,s.jsx)(o.Th,{children:"Id"}),(0,s.jsx)(o.Th,{children:"Student Email"}),(0,s.jsx)(o.Th,{children:"Subject"}),(0,s.jsx)(o.Th,{children:"Order Quote"}),(0,s.jsx)(o.Th,{children:"Commission"}),(0,s.jsx)(o.Th,{children:"Deadline"}),(0,s.jsx)(o.Th,{children:(0,s.jsx)(a.zx,{leftIcon:(0,s.jsx)(c.ny,{}),onClick:f(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p();case 2:case"end":return e.stop()}}),e)}))),children:"Refresh"})})]})}),(0,s.jsx)(o.p3,{children:r.map((function(e){return(0,s.jsxs)(o.Tr,{children:[(0,s.jsx)(o.Td,{fontWeight:"semibold",children:e.id}),(0,s.jsx)(o.Td,{children:e.client_id}),(0,s.jsx)(o.Td,{color:"green.600",fontWeight:"semibold",children:e.subject}),(0,s.jsx)(o.Td,{children:e.quotation}),(0,s.jsx)(o.Td,{children:parseInt(e.quotation)*localStorage.getItem("userCommission")/100}),(0,s.jsx)(o.Td,{color:"red.600",fontWeight:"semibold",children:e.deadline})]},e.id)}))})]})})}}}]);