(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4963],{6238:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/QC",function(){return r(5264)}])},5264:function(e,n,r){"use strict";r.r(n);var s=r(8520),t=r.n(s),c=r(5893),i=r(2028),l=r(8790),o=r(5193),d=r(7375),a=r(9042),h=r(4090),u=r(9669),x=r.n(u),j=r(7294),f=r(8754),p=r(1163),m=r(9736);function T(e,n,r,s,t,c,i){try{var l=e[c](i),o=l.value}catch(d){return void r(d)}l.done?n(o):Promise.resolve(o).then(s,t)}function v(e){return function(){var n=this,r=arguments;return new Promise((function(s,t){var c=e.apply(n,r);function i(e){T(c,s,t,i,l,"next",e)}function l(e){T(c,s,t,i,l,"throw",e)}i(void 0)}))}}n.default=function(){var e=function(){return(0,c.jsxs)(i.u_,{onClose:z,isOpen:A,isCentered:!0,children:[(0,c.jsx)(i.ZA,{}),(0,c.jsxs)(i.hz,{children:[(0,c.jsx)(i.xB,{children:g}),(0,c.jsx)(i.ol,{}),(0,c.jsx)(i.fe,{children:(0,c.jsx)(l.xv,{children:"Are you sure you want to delete?"})}),(0,c.jsx)(i.mz,{children:(0,c.jsx)(o.zx,{bgColor:"red",color:"white",onClick:v(t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",b(g));case 1:case"end":return e.stop()}}),e)}))),children:"Delete"})})]})]})},n=(0,j.useState)([]),r=n[0],s=n[1],u=[],T=(0,p.useRouter)();function k(){return _.apply(this,arguments)}function _(){return(_=v(t().mark((function e(){var n,r,c,i,l;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null==(n=localStorage.getItem("userToken"))&&T.replace("/admin/login"),r={headers:{Authorization:"Bearer ".concat(n)}},e.next=6,x().post(f.JW+"/user/fetch",{role:"QC"},r);case 6:if(c=e.sent,i=c.data.res,u=[],0!==i.length)for(l=0;l<i.length;l++)u.push({id:i[l]._id,name:i[l].name,contact_no:i[l].contact_no});else console.log("No QC");s(u),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}function b(e){return w.apply(this,arguments)}function w(){return(w=v(t().mark((function e(n){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x().get(f.JW+"/user/delete?_id="+n);case 3:if(!e.sent.data.success){e.next=9;break}return e.next=7,k();case 7:z(),y("");case 9:e.next=13;break;case 11:e.prev=11,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}(0,j.useEffect)((function(){k()}),[]);var C=(0,j.useState)(""),g=C[0],y=C[1],N=(0,d.qY)(),A=N.isOpen,E=N.onOpen,z=N.onClose;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e,{}),(0,c.jsxs)(a.iA,{variant:"simple",size:"md",display:{base:"none",sm:"block",md:"block"},children:[(0,c.jsx)(a.hr,{bgColor:"gray.200",children:(0,c.jsxs)(a.Tr,{children:[(0,c.jsx)(a.Th,{children:"ID"}),(0,c.jsx)(a.Th,{children:"Name"}),(0,c.jsx)(a.Th,{children:"Contact Number"}),(0,c.jsx)(a.Th,{})]})}),(0,c.jsx)(a.p3,{children:r.map((function(e){return(0,c.jsxs)(a.Tr,{children:[(0,c.jsx)(a.Td,{fontWeight:"bold",children:e.id}),(0,c.jsx)(a.Td,{children:e.name}),(0,c.jsx)(a.Td,{children:e.contact_no}),(0,c.jsx)(a.Td,{children:(0,c.jsx)(o.hU,{icon:(0,c.jsx)(m.pJ,{}),onClick:function(){y(e.id),E()}})})]},e.id)}))})]}),(0,c.jsx)("div",{className:"ShowSideClick",children:r.map((function(e){return(0,c.jsx)(h.UQ,{defaultIndex:[0],allowMultiple:!0,display:{base:"block",sm:"none",md:"none"},children:(0,c.jsxs)(h.Qd,{children:[(0,c.jsx)("h2",{children:(0,c.jsxs)(h.KF,{children:[(0,c.jsx)(l.xu,{flex:"1",textAlign:"left",children:(0,c.jsx)(a.iA,{children:(0,c.jsxs)(a.Tr,{children:[(0,c.jsx)(a.Th,{children:"ID"}),(0,c.jsx)(a.Td,{fontWeight:"bold",children:e.id})]})})}),(0,c.jsx)(h.XE,{})]})}),(0,c.jsx)(h.Hk,{pb:4,children:(0,c.jsx)(a.xJ,{children:(0,c.jsx)(a.iA,{children:(0,c.jsx)(a.p3,{children:(0,c.jsx)(a.Tr,{children:(0,c.jsxs)(a.iA,{children:[(0,c.jsxs)(a.Tr,{children:[(0,c.jsx)(a.Th,{children:"Name"}),(0,c.jsx)(a.Td,{children:e.name})]}),(0,c.jsxs)(a.Tr,{children:[(0,c.jsx)(a.Th,{children:"Contact Number"}),(0,c.jsx)(a.Td,{children:e.contact_no})]}),(0,c.jsxs)(a.Tr,{children:[(0,c.jsx)(a.Th,{children:"Delete"}),(0,c.jsx)(a.Td,{children:(0,c.jsx)(o.hU,{icon:(0,c.jsx)(m.pJ,{}),onClick:function(){y(e.id),E()}})})]})]})},e.id)})})})})]})})}))})]})}}},function(e){e.O(0,[9669,8527,7496,1716,3673,5738,9774,2888,179],(function(){return n=6238,e(e.s=n);var n}));var n=e.O();_N_E=n}]);