"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[979],{2166:function(e,t,n){n.r(t);var r=n(8520),s=n.n(r),a=n(5893),o=n(7375),c=n(2028),i=n(8790),l=n(4612),u=n(5193),p=n(9609),d=n(6257),h=n(1163),f=n(7294),x=n(9669),g=n.n(x),m=n(7388),b=n(8754),v=n(9736);function w(e,t,n,r,s,a,o){try{var c=e[a](o),i=c.value}catch(l){return void n(l)}c.done?t(i):Promise.resolve(i).then(r,s)}function y(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function o(e){w(a,r,s,o,c,"next",e)}function c(e){w(a,r,s,o,c,"throw",e)}o(void 0)}))}}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){j(e,t,n[t])}))}return e}function C(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.default=function(e){var t=e.assignedExpertMessages,n=e.operatorExpertChat,r=e.loading,x=function(e){var t=e.assignment,r=e.assignmentID,p=e.openModalId,h=(0,o.qY)();return(0,f.useEffect)((function(){r===p?h.onOpen():h.onClose()}),[r,p]),(0,a.jsxs)(c.u_,{size:"lg",onClose:h.onClose,isOpen:h.isOpen,onOpen:h.onOpen,isCentered:!0,children:[(0,a.jsx)(c.ZA,{}),(0,a.jsxs)(c.hz,{maxH:"500px",children:[(0,a.jsx)(c.ol,{}),(0,a.jsx)(c.fe,{children:(0,a.jsxs)(i.xu,{display:"block",borderWidth:"1px",borderRadius:"md",width:"md",children:[(0,a.jsx)(i.xu,{p:4,bgColor:"gray.200",children:(0,a.jsx)(i.Ug,{children:(0,a.jsx)(i.X6,{fontSize:"xl",children:"Operator Chat with Expert"})})}),(0,a.jsxs)(i.gC,{alignItems:"start",justifyContent:"space-between",margin:3,minH:"sm",maxH:"sm",children:[(0,a.jsx)(i.gC,{overflowY:"scroll",alignItems:"start",width:"100%",children:n[r]&&n[r].map((function(e,t){return(0,a.jsx)(i.xu,{display:"TEXT"===e.type||"MEDIA"===e.type?"flex":"none",alignSelf:e.user===E?"flex-end":"flex-start",flexWrap:!0,padding:2,borderRadius:"md",maxWidth:"70%",bgColor:e.user===E?"blue.100":"green.100",children:(0,a.jsxs)(i.gC,{maxWidth:"100%",overflowWrap:"break-word",children:[(0,a.jsx)(i.xv,{display:"TEXT"===e.type?"flex":"none",maxWidth:"100%",children:e.msg}),(0,a.jsx)(i.rU,{color:"blue",fontWeight:"bold",display:"MEDIA"===e.type?"flex":"none",maxWidth:"100%",href:e.msg,children:e.msg&&e.msg.substring(62)})]})},t)}))}),(0,a.jsxs)(l.BZ,{children:[(0,a.jsx)(l.II,{type:"text",id:"addChatOperatorExpert"}),(0,a.jsx)(l.II,{type:"file",id:"addFileOperatorExpert",onChange:y(s().mark((function e(){var n,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="",S){D();try{r={method:"put",url:"https://assignmentsanta.blob.core.windows.net/assignment-dscp/"+encodeURIComponent(S.current.files[0].name)+"?"+_,headers:{"x-ms-blob-type":"BlockBlob"},data:S.current.files[0]},g()(r).then(function(e){var r=y(s().mark((function e(r){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://assignmentsanta.blob.core.windows.net/assignment-dscp/"+encodeURIComponent(S.current.files[0].name),e.next=3,(0,d.r7)((0,d.JU)(m.db,"chat",t.chat[t.chat.length-1].user+"_"+E+"_"+t.id),{conversation:(0,d.vr)({msg:n,time:Date.now(),type:"MEDIA",user:E})});case 3:e.sent;case 4:case"end":return e.stop()}}),e)})));return function(){return r.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}catch(a){console.log(a)}M()}case 2:case"end":return e.stop()}}),e)}))),ref:S,style:{display:"none"}}),(0,a.jsx)(l.Z8,{h:"full",children:(0,a.jsx)(u.zx,{id:"attachButton",onClick:y(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S.current.click();case 1:case"end":return e.stop()}}),e)}))),children:(0,a.jsx)(v.Uj,{})})}),(0,a.jsx)(l.xH,{h:"full",children:(0,a.jsx)(u.zx,{id:"sendButton",onClick:y(s().mark((function e(){var n,a,o,c,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=localStorage.getItem("userToken"),a=/\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m,""===(o=document.getElementById("addChatOperatorExpert")).value||void 0===o.value){e.next=23;break}if(!a.test(o.value)){e.next=8;break}window.alert("Sharing Phone Numbers through Chat is not allowed"),e.next=23;break;case 8:return e.next=10,(0,d.r7)((0,d.JU)(m.db,"chat",t.chat[t.chat.length-1].user+"_"+E+"_"+r),{conversation:(0,d.vr)({msg:o.value,time:Date.now(),type:"TEXT",user:E})});case 10:return e.sent,c={headers:{Authorization:"Bearer ".concat(n)}},e.prev=12,e.next=15,g().post(b.JW+"/messages",{id:r,expertEmail:t.assignedExpert},c);case 15:i=e.sent,i.data.success&&(o.value=""),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(12),console.log(e.t0);case 23:case"end":return e.stop()}}),e,null,[[12,20]])}))),children:(0,a.jsx)(v.mr,{})})})]})]})]})})]})]})},w=(0,h.useRouter)(),j=(0,f.useState)(""),E=j[0],O=j[1],S=(0,f.useRef)(null),I=(0,f.useState)(""),_=I[0],A=I[1],P=(0,f.useState)(null),T=P[0],U=P[1],W=(0,o.qY)(),D=W.onOpen,M=W.onClose;function z(){return R.apply(this,arguments)}function R(){return(R=y(s().mark((function e(){var t,n,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("userEmail"),O(t),e.prev=2,e.next=5,g().get(b.JW+"/util/sas-token?container_name=assignment-dscp");case 5:n=e.sent,(r=n.data).success&&A(r.SASToken),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})))).apply(this,arguments)}function B(e){return J.apply(this,arguments)}function J(){return(J=y(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{null==localStorage.getItem("userToken")&&w.replace("/admin/login")}catch(n){console.log(n)}U(t.id);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function X(e){return H.apply(this,arguments)}function H(){return(H=y(s().mark((function e(t){var r,a,o,c;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,null==(r=localStorage.getItem("userToken"))&&w.replace("/admin/login"),{headers:{Authorization:"Bearer ".concat(r)}},!n[t]){e.next=11;break}return a=n[t].slice(),o=a.pop(),c=localStorage.getItem("userEmail"),e.next=10,(0,d.r7)((0,d.JU)(m.db,"chat",o.user+"_"+c+"_"+t),{conversation:C(a).concat([k({},o,{newMessageCount:0})])});case 10:e.sent;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}return(0,f.useEffect)((function(){y(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z();case 2:case"end":return e.stop()}}),e)})))()}),[]),(0,a.jsxs)(a.Fragment,{children:[t&&t.filter((function(e){return 0!==e.chat.length})).map((function(e){return(0,a.jsx)(x,{assignment:e,assignmentID:e.id,openModalId:T})})),(0,a.jsxs)(i.xu,{display:"block",borderWidth:"1px",borderRadius:"md",width:"lg",height:"3xl",marginTop:"20px",overflow:"hidden",children:[(0,a.jsxs)(i.xu,{p:4,bgColor:"gray.200",children:[(0,a.jsxs)(i.Ug,{children:[(0,a.jsx)(i.X6,{fontSize:"xl",children:" Confirmed Orders "})," "]})," "]})," ",(0,a.jsx)(i.gC,{alignItems:"start",justifyContent:"space-between",margin:3,minH:"2xl",maxH:"2xl",overflowY:"scroll",children:(0,a.jsx)(i.gC,{alignItems:"start",width:"100%",children:r?(0,a.jsx)(p.$,{}):t&&t.filter((function(e){return 0!==e.chat.length})).map((function(e){return(0,a.jsxs)(i.xu,{bgColor:"blackAlpha.100",width:"100%",p:2,children:[(0,a.jsxs)(i.xu,{display:"flex",justifyContent:"space-between",children:[(0,a.jsxs)(i.xu,{display:"flex",children:[(0,a.jsx)("a",{href:"/admin/assignment_details/"+e.id,target:"_blank",children:e.id}),"\xa0",0!==e.chat.length&&0!==e.chat[e.chat.length-1].newMessageCount&&(0,a.jsx)("div",{className:"text-center",style:{width:"25px",height:"25px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontWeight:"bold"},children:0!==e.chat[e.chat.length-1].newMessageCount&&e.chat[e.chat.length-1].newMessageCount})]}),(0,a.jsx)(i.xu,{children:(0,a.jsx)("span",{children:e.date})})]}),(0,a.jsxs)(i.xu,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[(0,a.jsxs)("strong",{children:["Message:"," ",0!==e.chat.length&&e.chat[e.chat.length-1].msg]}),(0,a.jsx)(u.zx,{onClick:y(s().mark((function t(){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,B(e);case 2:X(e.id.split("_")[0]);case 3:case"end":return t.stop()}}),t)}))),children:"Reply"})]})]})}))})})]})," "]})}},6372:function(e,t,n){n.r(t);var r=n(8520),s=n.n(r),a=n(5893),o=n(7375),c=n(2028),i=n(8790),l=n(4612),u=n(5193),p=n(9609),d=n(6257),h=n(1163),f=n(7294),x=n(9669),g=n.n(x),m=n(7388),b=n(8754),v=n(9736);function w(e,t,n,r,s,a,o){try{var c=e[a](o),i=c.value}catch(l){return void n(l)}c.done?t(i):Promise.resolve(i).then(r,s)}function y(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function o(e){w(a,r,s,o,c,"next",e)}function c(e){w(a,r,s,o,c,"throw",e)}o(void 0)}))}}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){j(e,t,n[t])}))}return e}function C(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.default=function(e){var t=e.assignedExpertMessages,n=e.operatorExpertChat,r=e.loading,x=e.inProcessOrderData,w=function(e){var t=e.assignment,r=e.assignmentID,p=e.openModalId,h=(0,o.qY)();return(0,f.useEffect)((function(){r===p?h.onOpen():h.onClose()}),[r,p]),(0,a.jsxs)(c.u_,{size:"lg",onClose:h.onClose,isOpen:h.isOpen,onOpen:h.onOpen,isCentered:!0,children:[(0,a.jsx)(c.ZA,{}),(0,a.jsxs)(c.hz,{maxH:"500px",children:[(0,a.jsx)(c.ol,{}),(0,a.jsx)(c.fe,{children:(0,a.jsxs)(i.xu,{display:"block",borderWidth:"1px",borderRadius:"md",width:"md",children:[(0,a.jsx)(i.xu,{p:4,bgColor:"gray.200",children:(0,a.jsx)(i.Ug,{children:(0,a.jsx)(i.X6,{fontSize:"xl",children:"Operator Chat with Expert"})})}),(0,a.jsxs)(i.gC,{alignItems:"start",justifyContent:"space-between",margin:3,minH:"sm",maxH:"sm",children:[(0,a.jsx)(i.gC,{overflowY:"scroll",alignItems:"start",width:"100%",children:n[r]&&n[r].map((function(e,t){return(0,a.jsx)(i.xu,{display:"TEXT"===e.type||"MEDIA"===e.type?"flex":"none",alignSelf:e.user===O?"flex-end":"flex-start",flexWrap:!0,padding:2,borderRadius:"md",maxWidth:"70%",bgColor:e.user===O?"blue.100":"green.100",children:(0,a.jsxs)(i.gC,{maxWidth:"100%",overflowWrap:"break-word",children:[(0,a.jsx)(i.xv,{display:"TEXT"===e.type?"flex":"none",maxWidth:"100%",children:e.msg}),(0,a.jsx)(i.rU,{color:"blue",fontWeight:"bold",display:"MEDIA"===e.type?"flex":"none",maxWidth:"100%",href:e.msg,children:e.msg&&e.msg.substring(62)})]})},t)}))}),(0,a.jsxs)(l.BZ,{children:[(0,a.jsx)(l.II,{type:"text",id:"addChatOperatorExpert"}),(0,a.jsx)(l.II,{type:"file",id:"addFileOperatorExpert",onChange:y(s().mark((function e(){var n,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="",I){M();try{r={method:"put",url:"https://assignmentsanta.blob.core.windows.net/assignment-dscp/"+encodeURIComponent(I.current.files[0].name)+"?"+A,headers:{"x-ms-blob-type":"BlockBlob"},data:I.current.files[0]},g()(r).then(function(e){var r=y(s().mark((function e(r){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://assignmentsanta.blob.core.windows.net/assignment-dscp/"+encodeURIComponent(I.current.files[0].name),e.next=3,(0,d.r7)((0,d.JU)(m.db,"chat",t.chat[t.chat.length-1].user+"_"+O+"_"+t.id),{conversation:(0,d.vr)({msg:n,time:Date.now(),type:"MEDIA",user:O})});case 3:e.sent;case 4:case"end":return e.stop()}}),e)})));return function(){return r.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}catch(a){console.log(a)}z()}case 2:case"end":return e.stop()}}),e)}))),ref:I,style:{display:"none"}}),(0,a.jsx)(l.Z8,{h:"full",children:(0,a.jsx)(u.zx,{id:"attachButton",onClick:y(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I.current.click();case 1:case"end":return e.stop()}}),e)}))),children:(0,a.jsx)(v.Uj,{})})}),(0,a.jsx)(l.xH,{h:"full",children:(0,a.jsx)(u.zx,{id:"sendButton",onClick:y(s().mark((function e(){var n,a,o,c,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=localStorage.getItem("userToken"),a=/\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m,""===(o=document.getElementById("addChatOperatorExpert")).value||void 0===o.value){e.next=23;break}if(!a.test(o.value)){e.next=8;break}window.alert("Sharing Phone Numbers through Chat is not allowed"),e.next=23;break;case 8:return e.next=10,(0,d.r7)((0,d.JU)(m.db,"chat",t.chat[t.chat.length-1].user+"_"+O+"_"+r.split("_")[0]),{conversation:(0,d.vr)({msg:o.value,time:Date.now(),type:"TEXT",user:O})});case 10:return e.sent,c={headers:{Authorization:"Bearer ".concat(n)}},e.prev=12,e.next=15,g().post(b.JW+"/messages",{id:r,expertEmail:t.assignedExpert},c);case 15:i=e.sent,i.data.success&&(o.value=""),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(12),console.log(e.t0);case 23:case"end":return e.stop()}}),e,null,[[12,20]])}))),children:(0,a.jsx)(v.mr,{})})})]})]})]})})]})]})},j=(0,h.useRouter)(),E=(0,f.useState)(""),O=E[0],S=E[1],I=(0,f.useRef)(null),_=(0,f.useState)(""),A=_[0],P=_[1],T=(0,f.useState)(null),U=T[0],W=T[1],D=(0,o.qY)(),M=D.onOpen,z=D.onClose;function R(){return B.apply(this,arguments)}function B(){return(B=y(s().mark((function e(){var t,n,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("userEmail"),S(t),e.prev=2,e.next=5,g().get(b.JW+"/util/sas-token?container_name=assignment-dscp");case 5:n=e.sent,(r=n.data).success&&P(r.SASToken),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})))).apply(this,arguments)}function J(e,t){return X.apply(this,arguments)}function X(){return(X=y(s().mark((function e(t,n){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.id+"_"+n.expertEmail;try{null==localStorage.getItem("userToken")&&j.replace("/admin/login")}catch(s){console.log(s)}W(r);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(e,t){return F.apply(this,arguments)}function F(){return(F=y(s().mark((function e(t,r){var a,o,c,i,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=t+"_"+r.expertEmail,e.prev=1,null==(o=localStorage.getItem("userToken"))&&j.replace("/admin/login"),{headers:{Authorization:"Bearer ".concat(o)}},!n[a]){e.next=12;break}return c=n[a].slice(),i=c.pop(),l=localStorage.getItem("userEmail"),e.next=11,(0,d.r7)((0,d.JU)(m.db,"chat",i.user+"_"+l+"_"+a.split("_")[0]),{conversation:C(c).concat([k({},i,{newMessageCount:0})])});case 11:e.sent;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})))).apply(this,arguments)}return(0,f.useEffect)((function(){y(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R();case 2:case"end":return e.stop()}}),e)})))()}),[]),(0,a.jsxs)(a.Fragment,{children:[t&&t.map((function(e){return(0,a.jsx)(w,{assignment:e,assignmentID:e.id,openModalId:U})})),(0,a.jsxs)(i.xu,{display:"block",borderWidth:"1px",borderRadius:"md",width:"lg",height:"3xl",marginTop:"20px",overflow:"hidden",children:[(0,a.jsxs)(i.xu,{p:4,bgColor:"gray.200",children:[(0,a.jsxs)(i.Ug,{children:[(0,a.jsx)(i.X6,{fontSize:"xl",children:" In-Process Orders "})," "]})," "]})," ",(0,a.jsx)(i.gC,{alignItems:"start",justifyContent:"space-between",margin:3,minH:"2xl",maxH:"2xl",overflowY:"scroll",children:(0,a.jsx)(i.gC,{alignItems:"start",width:"100%",children:r?(0,a.jsx)(p.$,{}):x&&x.map((function(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(i.xu,{children:[(0,a.jsxs)(i.Ug,{children:[(0,a.jsxs)(i.X6,{fontSize:"xl",children:[" ",(0,a.jsx)("a",{href:"/admin/assignment_details/"+e.id,target:"_blank",children:e.id})," "]})," "]})," "]}),e.experts&&e.experts.map((function(t){return(0,a.jsxs)(i.xu,{bgColor:"blackAlpha.100",width:"100%",p:2,children:[(0,a.jsxs)(i.xu,{display:"flex",justifyContent:"space-between",children:[(0,a.jsxs)(i.xu,{display:"flex",children:[(0,a.jsxs)("strong",{children:["By: ",t.expertEmail]}),"\xa0",0!==t.expertChat.length&&0!==t.expertChat[t.expertChat.length-1].newMessageCount&&(0,a.jsx)("div",{className:"text-center",style:{width:"25px",height:"25px",borderRadius:"5px",background:"#c96969",cursor:"pointer",margin:"2px 5px",color:"#fff",fontWeight:"bold"},children:0!==t.expertChat[t.expertChat.length-1].newMessageCount&&t.expertChat[t.expertChat.length-1].newMessageCount})]}),(0,a.jsx)(i.xu,{children:(0,a.jsx)("span",{children:t.date})})]}),(0,a.jsxs)(i.xu,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[(0,a.jsxs)("strong",{children:["Message:"," ",0!==t.expertChat.length&&t.expertChat[t.expertChat.length-1].msg]}),(0,a.jsx)(u.zx,{onClick:y(s().mark((function n(){return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,J(e,t);case 2:H(e.id,t);case 3:case"end":return n.stop()}}),n)}))),children:"Reply"})]})]})}))]})}))})})]})," "]})}},979:function(e,t,n){n.r(t);var r=n(8520),s=n.n(r),a=n(5893),o=n(8790),c=n(9839),i=n(7294),l=n(6257),u=n(9669),p=n.n(u),d=n(8754),h=n(7388),f=n(2166),x=n(6372),g=n(1163);function m(e,t,n,r,s,a,o){try{var c=e[a](o),i=c.value}catch(l){return void n(l)}c.done?t(i):Promise.resolve(i).then(r,s)}function b(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function o(e){m(a,r,s,o,c,"next",e)}function c(e){m(a,r,s,o,c,"throw",e)}o(void 0)}))}}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){v(e,t,n[t])}))}return e}function y(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.default=function(e){var t,n,r,u,m=e.setMessageCount,j=e.setSpinnerLoading,k=(0,i.useState)([]),C=k[0],E=k[1],O=(0,i.useState)({}),S=O[0],I=O[1],_=(0,i.useState)({}),A=_[0],P=_[1],T=(0,i.useState)([]),U=T[0],W=T[1],D=(0,i.useState)([]),M=D[0],z=D[1],R=(0,i.useState)([]),B=R[0],J=R[1],X=(0,i.useState)(!1),H=X[0],F=X[1],N=(0,g.useRouter)();function Y(){return(Y=b(s().mark((function e(){var t,n,r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(t=localStorage.getItem("userToken"))&&N.replace("/admin/login"),n={headers:{Authorization:"Bearer ".concat(t)}},e.next=6,p().post(d.JW+"/assignment/fetch",{status:{$in:["Expert Assigned","Raw Submission","Proof Read","CP2 Done"]}},n);case 6:return r=e.sent,e.next=9,r.data.assignmentData;case 9:(a=e.sent)&&0!==a.length?z(a):console.log("Assignment Not Found"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}function Z(){return(Z=b(s().mark((function e(){var t,n,r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(t=localStorage.getItem("userToken"))&&N.replace("/admin/login"),n={headers:{Authorization:"Bearer ".concat(t)}},e.next=6,p().post(d.JW+"/assignment/fetch",{status:{$in:["Expert Asked"]}},n);case 6:return r=e.sent,e.next=9,r.data.assignmentData;case 9:(a=e.sent)&&0!==a.length?J(a):console.log("Assignment Not Found"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}function q(){return(q=b(s().mark((function e(){var t,n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p().get(d.JW+"/messages");case 3:return t=e.sent,e.next=6,t.data;case 6:(n=e.sent).success&&E(n.result),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function L(e,t){return $.apply(this,arguments)}function $(){return($=b(s().mark((function e(t,n){var r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=localStorage.getItem("userEmail"),e.prev=1,a=t+"_"+r+"_"+n,e.next=5,(0,l.QT)((0,l.JU)(h.db,"chat",a));case 5:if(e.sent.exists()){e.next=9;break}return e.next=9,(0,l.pl)((0,l.JU)(h.db,"chat",a),{conversation:[]});case 9:(0,l.cf)((0,l.JU)(h.db,"chat",a),(function(e){I((function(t){return w({},t,v({},n,e.data().conversation))})),F(!1)})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})))).apply(this,arguments)}function Q(e,t){return K.apply(this,arguments)}function K(){return(K=b(s().mark((function e(t,n){var r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=localStorage.getItem("userEmail"),e.prev=1,a=t+"_"+r+"_"+n,e.next=5,(0,l.QT)((0,l.JU)(h.db,"chat",a));case 5:if(e.sent.exists()){e.next=9;break}return e.next=9,(0,l.pl)((0,l.JU)(h.db,"chat",a),{conversation:[]});case 9:(0,l.cf)((0,l.JU)(h.db,"chat",a),(function(e){P((function(r){return w({},r,v({},"".concat(n,"_").concat(t),e.data().conversation))})),F(!1)})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})))).apply(this,arguments)}function G(){return V.apply(this,arguments)}function V(){return(V=b(s().mark((function e(){var t,r,a,o,c,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n&&0!==n.length){for(t={},r=[],a=y(new Set(n.map((function(e){return e.id.split("_")[0]})))),o=0;o<n.length;o++)t.id=n[o].id.split("_")[0],t.date=n[o].date,t.expertEmail=n[o].id.split("_")[1],t.expertChat=n[o].chat.filter((function(e){return e.user===n[o].id.split("_")[1]})),r.push(w({},t));c=r.reduce((function(e,t){var n=t.id,r=t.date,s=t.expertChat,a=t.expertEmail;return e.hasOwnProperty(n)||(e[n]={id:n,experts:[]}),e[n].experts=y(e[n].experts).concat([{date:r,expertEmail:a,expertChat:s}]),e}),{}),0!==(i=Object.entries(c).flat().filter((function(e){return!a.some((function(t){return t==e}))})).filter((function(e){return e.experts.some((function(e){return 0!==e.expertChat.length}))}))).length&&W(i)}case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}if((0,i.useEffect)((function(){F(!0),function(){q.apply(this,arguments)}(),function(){Y.apply(this,arguments)}(),function(){Z.apply(this,arguments)}()}),[]),(0,i.useEffect)((function(){b(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r&&0!==r.length&&r.map(b(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L(t.expertEmail,t._id);case 2:case"end":return e.stop()}}),e)})))),u&&0!==u.length&&u.map(b(s().mark((function e(t){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.allExperts||[t.expertEmail],e.next=3,Promise.all(n.map((function(e){return Q(e,t._id)})));case 3:case"end":return e.stop()}}),e)}))));case 2:case"end":return e.stop()}}),e)})))()}),[C]),(0,i.useEffect)((function(){b(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G();case 2:case"end":return e.stop()}}),e)})))()}),[A]),0!==M.length&&0!==B.length&&0!==C.length&&(r=C.filter((function(e){return M.some((function(t){return t._id===e._id}))})),u=C.filter((function(e){return B.some((function(t){return t._id===e._id}))}))),0!==Object.keys(S).length&&(t=Object.keys(S).map((function(e){var t=S[e].filter((function(e){return r.some((function(t){return t.expertEmail===e.user}))}));return{id:e,chat:t,date:0!==t.length&&new Date(t[t.length-1].time).toLocaleDateString("en-US")}}))),0!==Object.keys(A).length&&(n=Object.keys(A).map((function(e){var t=A[e];return{id:e,chat:t,date:0!==t.length&&new Date(t[t.length-1].time).toLocaleDateString("en-US")}}))),0!==Object.keys(S).length&&0!==Object.keys(A).length){var ee=t.filter((function(e){return 0!==e.chat.length})),te=n.filter((function(e){return 0!==e.chat.length}));m(ee.concat(te).reduce((function(e,t){return t&&0!==t.chat.length?e+t.chat[t.chat.length-1].newMessageCount:e}),0)),j(!1)}return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(o.xu,{padding:0,children:(0,a.jsxs)(c.mQ,{isLazy:!0,variant:"soft-rounded",children:[(0,a.jsxs)(c.td,{children:[(0,a.jsx)(o.xu,{id:"confirmed_orders",children:(0,a.jsx)(c.OK,{style:{borderRadius:"5px"},children:(0,a.jsx)(o.X6,{fontSize:"lg",children:"Confirmed Orders"})})}),(0,a.jsx)(o.xu,{id:"process_orders",children:(0,a.jsx)(c.OK,{style:{borderRadius:"5px"},children:(0,a.jsx)(o.X6,{fontSize:"lg",children:"In-Process Orders"})})})]}),(0,a.jsxs)(c.nP,{children:[(0,a.jsx)(c.x4,{children:(0,a.jsx)(f.default,{assignedExpertMessages:t,operatorExpertChat:S,loading:H})}),(0,a.jsx)(c.x4,{children:(0,a.jsx)(x.default,{assignedExpertMessages:n,operatorExpertChat:A,loading:H,inProcessOrderData:U})})]})]})})})}}}]);