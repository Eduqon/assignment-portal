(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9309],{5361:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/service/[slug]",function(){return s(8548)}])},8548:function(e,t,s){"use strict";s.r(t),s.d(t,{__N_SSG:function(){return q},default:function(){return z}});var n=s(8520),a=s.n(n),i=s(5893),r=s(7294),c=s(9008),l=s(697),o=s(949),d=s(8790),u=s(9762),x=s(4612),m=s(5193),p=s(9736),h=s(5518),g=s(8966),j=s.n(g),f=s(1087),b=s(2347),w=s(9669),v=s.n(w),y=s(8754),k=s(1163);function N(e,t,s,n,a,i,r){try{var c=e[i](r),l=c.value}catch(o){return void s(o)}c.done?t(l):Promise.resolve(l).then(n,a)}var _=function(e){var t=(0,r.useState)(null),s=t[0],n=t[1],i=(0,r.useState)(null),c=i[0],l=i[1],o=(0,r.useState)(!0),d=o[0],u=o[1];return(0,r.useEffect)((function(){var t;(t=a().mark((function t(){var s,i;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u(!0),t.prev=1,t.next=4,fetch(e);case 4:return s=t.sent,t.next=7,s.json();case 7:i=t.sent,n(i),u(!1),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(1),l(t.t0),u(!1);case 16:case"end":return t.stop()}}),t,null,[[1,12]])})),function(){var e=this,s=arguments;return new Promise((function(n,a){var i=t.apply(e,s);function r(e){N(i,n,a,r,c,"next",e)}function c(e){N(i,n,a,r,c,"throw",e)}r(void 0)}))})()}),[e]),{apiLoading:d,apiError:c,apiData:s}},S=s(1506),I=s(6223),E=s(3585);var P=function(e){var t=e.title,s=e.slug,n=e.faqschemas;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(d.xu,{id:"schema-section",style:{padding:"0rem 2rem",width:"100%"},children:(0,i.jsxs)(d.xu,{itemScope:!0,itemType:"https://schema.org/FAQPage",children:[t&&(0,i.jsx)(d.X6,{textAlign:"left",width:"100%",children:t}),(0,i.jsx)("br",{}),n&&n.data.map((function(e){return(0,i.jsx)(i.Fragment,{children:s===e.attributes.Slug&&(0,i.jsxs)("div",{itemScope:!0,itemProp:"mainEntity",itemType:"https://schema.org/Question",children:[(0,i.jsx)(d.X6,{size:"md",itemProp:"name",children:e.attributes.questionName}),(0,i.jsxs)("div",{itemScope:!0,itemProp:"acceptedAnswer",itemType:"https://schema.org/Answer",children:[(0,i.jsx)(d.xu,{className:"service-body",itemProp:"text",style:{"white-space":"pre-line"},children:(0,i.jsx)(l.D,{children:e&&e.attributes.questionAnswer.split("<br/>").join("\n")})}),(0,i.jsx)("br",{})]})]})})}))]})})})},T=s(1664),A=s(2090);function D(e,t,s,n,a,i,r){try{var c=e[i](r),l=c.value}catch(o){return void s(o)}c.done?t(l):Promise.resolve(l).then(n,a)}function X(e){return function(){var t=this,s=arguments;return new Promise((function(n,a){var i=e.apply(t,s);function r(e){D(i,n,a,r,c,"next",e)}function c(e){D(i,n,a,r,c,"throw",e)}r(void 0)}))}}var q=!0;function z(e){var t=e.servicesdata,s=e.services,n=e.faqschemas,g=(0,r.useState)(0),w=g[0],N=g[1],D=(0,f.o)((function(e){return e.setId})),q=(0,f.o)((function(e){return e.setExistingUser})),z=(0,b._)((function(e){return e.setSubject})),B=(0,b._)((function(e){return e.setDeadline})),C=(0,b._)((function(e){return e.setPages})),F=(0,k.useRouter)(),L=F.query.slug;(0,r.useEffect)((function(){var e=document.getElementById("date");e&&(e.min=(new Date).toLocaleDateString("en-ca"),e.value=(new Date).toLocaleDateString("en-ca"))}),[]);var H=s&&s.data.some((function(e){return e.attributes.slug===L})),O=t&&H&&t.data[0].attributes.Seotitle,W=t&&H&&t.data[0].attributes.Seodescription,K=t&&H&&t.data[0].attributes.Seokeyword,R=t&&H&&t.data[0].attributes.Seocntag,M=t&&H&&t.data[0].attributes.SchemaTitle;function Q(){return(Q=X(a().mark((function e(){var t,s,n,i,r,c,l,o,d,u,x,m,p,h,g,f,b,k,N,_;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=document.getElementById("email"),s=document.getElementById("subject"),n=document.getElementById("date"),i=document.getElementById("time"),r=localStorage.getItem("clientToken"),c=!1,l=!1,o=!1,d=!1,!j().isEmail(t.value)){e.next=15;break}return e.next=12,D(t.value);case 12:c=!0,e.next=16;break;case 15:window.alert("Enter Valid Email"),c=!1;case 16:if(""!=s.value){e.next=20;break}window.alert("Enter a Subject"),l=!1,e.next=23;break;case 20:return e.next=22,z(s.value);case 22:l=!0;case 23:if(0!=w){e.next=27;break}window.alert("Specify No. Of Pages"),o=!1,e.next=30;break;case 27:return e.next=29,C(w);case 29:o=!0;case 30:if(""!=i.value){e.next=34;break}window.alert("Select Deadline Time"),d=!1,e.next=49;break;case 34:return e.next=36,n.value.split("-");case 36:return u=e.sent,x=u[0],m=u[1],p=u[2],e.next=42,i.value.split(":");case 42:return h=e.sent,g=h[0],f=h[1],b=new Date(x,m-1,p,g,f,0),e.next=48,B(b.toISOString());case 48:d=!0;case 49:if(!0!==c||!0!==l||!0!==o||!0!==d){e.next=97;break}return e.prev=50,k={headers:{Authorization:"Bearer ".concat(r)}},e.next=54,v().post(y.JW+"/client/verify",{_id:t.value},k);case 54:if(!0!==(N=e.sent).data.success){e.next=62;break}return e.next=58,q(!0);case 58:localStorage.setItem("clientEmail",t.value),F.replace("/order_details"),e.next=86;break;case 62:if(203!=N.status){e.next=86;break}return localStorage.setItem("clientToken",N.data.token),r=N.data.token,e.prev=65,_={headers:{Authorization:"Bearer ".concat(r)}},e.next=69,v().post(y.JW+"/client/verify",{_id:t.value},_);case 69:if(!0!==e.sent.data.success){e.next=75;break}return e.next=73,q(!0);case 73:localStorage.setItem("clientEmail",t.value),F.replace("/order_details");case 75:e.next=86;break;case 77:if(e.prev=77,e.t0=e.catch(65),401!=e.t0.response.status){e.next=85;break}return e.next=82,q(!1);case 82:F.replace("/order_details"),e.next=86;break;case 85:window.alert(e.t0.response.message);case 86:e.next=97;break;case 88:if(e.prev=88,e.t1=e.catch(50),401!=e.t1.response.status){e.next=96;break}return e.next=93,q(!1);case 93:F.replace("/order_details"),e.next=97;break;case 96:window.alert(e.t1.response.message);case 97:case"end":return e.stop()}}),e,null,[[50,88],[65,77]])})))).apply(this,arguments)}var Y=(0,o.ff)("white","gray.700"),U=_(y.si+"/upload/files").apiData,V=U&&t&&H&&U.filter((function(e){return e.name===t.data[0].attributes.slug}));return(0,i.jsx)(i.Fragment,{children:H?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(c.default,{children:[O&&(0,i.jsx)("title",{children:O}),W&&(0,i.jsx)("meta",{name:"description",content:W}),K&&(0,i.jsx)("meta",{name:"keyword",content:K}),R&&(0,i.jsx)("link",{rel:"canonical",href:R})]}),(0,i.jsx)(T.default,{href:"/samples",children:(0,i.jsx)("img",{src:"/assets/foter/View.png",alt:"",className:"view"})}),(0,i.jsx)(S.o,{services:s}),(0,i.jsxs)("div",{className:"contain position-relative",children:[(0,i.jsx)("div",{className:"bg-image",style:{height:"70vh",filter:"blur(2px)"}}),(0,i.jsxs)("div",{className:"row w-100 h-100 set-pos-blur",children:[(0,i.jsx)("div",{id:"top-section",className:"col-md-6 col-12 d-flex align-items-center flex-column justify-content-center p-4",children:(0,i.jsxs)(d.xu,{id:"heading-section",color:"white",width:"500px",children:[(0,i.jsx)(d.X6,{size:"xl",children:t&&t.data[0].attributes.title}),(0,i.jsx)(d.X6,{size:"md",lineHeight:"1.5",children:t&&t.data[0].attributes.Sub_Title}),(0,i.jsx)("p",{children:t&&t.data[0].attributes.Sub_Title_2})]})}),(0,i.jsx)("div",{id:"form-section",className:"col-md-6 col-12 p-4",children:(0,i.jsxs)(d.Kq,{spacing:4,mx:"auto",maxW:"lg",px:6,className:"set-pp",children:[!h.tq&&(0,i.jsxs)(d.Kq,{align:"center",children:[(0,i.jsx)(d.X6,{className:"top_class",size:"xl",children:t&&t.data[0].attributes.Formheading}),(0,i.jsx)("p",{className:"top_class_sub text-capitalize",children:"Take help from best writing service !!"})]}),(0,i.jsx)(d.xu,{rounded:"lg",bg:Y,boxShadow:"lg",p:8,children:(0,i.jsxs)(d.Kq,{spacing:4,children:[(0,i.jsxs)("div",{className:"d-flex flex-column flex-md-row flex-sm-row flex-lg-row",children:[(0,i.jsx)(d.xu,{children:(0,i.jsxs)(u.NI,{id:"email",isRequired:!0,children:[(0,i.jsx)(u.lX,{children:"Email"}),(0,i.jsx)(x.II,{placeholder:"Enter Your Email",type:"email",onChange:X(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=document.getElementById("email"),D(t.value);case 2:case"end":return e.stop()}}),e)})))})]})}),(0,i.jsx)(d.xu,{display:{base:"none",sm:"block",md:"block"},children:"\xa0\xa0\xa0\xa0"}),(0,i.jsx)(d.xu,{children:(0,i.jsxs)(u.NI,{id:"subject",isRequired:!0,children:[(0,i.jsx)(u.lX,{children:"Subject"}),(0,i.jsx)(x.II,{placeholder:"Enter Subject",type:"text"})]})})]}),(0,i.jsxs)(u.NI,{id:"words",children:[(0,i.jsx)(u.lX,{children:"No. of Words/Pages"}),(0,i.jsxs)(x.BZ,{children:[(0,i.jsx)(x.Z8,{h:"full",children:(0,i.jsx)(m.zx,{variant:"outline",onClick:function(){w<=0?console.log("Already zero"):N(w-1)},children:(0,i.jsx)(p.V_,{})})}),(0,i.jsx)(x.II,{type:"text",value:"   "+w+" Pages/"+250*w+" Words",contentEditable:!1}),(0,i.jsx)(x.xH,{h:"full",children:(0,i.jsx)(m.zx,{variant:"outline",onClick:function(){N(w+1)},children:(0,i.jsx)(p.dt,{})})})]})]}),(0,i.jsxs)(u.NI,{id:"deadline",children:[(0,i.jsx)(u.lX,{children:"Deadline"}),(0,i.jsxs)(d.Ug,{children:[(0,i.jsx)(x.II,{type:"date",id:"date"}),(0,i.jsx)(x.II,{type:"time",id:"time"})]})]}),(0,i.jsx)(d.Kq,{spacing:10,pt:2,children:(0,i.jsx)("button",{className:"btn btn-Set",onClick:function(){!function(){Q.apply(this,arguments)}()},children:"Submit"})})]})})]})})]})]}),(0,i.jsxs)(d.xu,{className:"row w-100 h-100 d-flex",margin:"0",children:[(0,i.jsxs)("div",{id:"bottom-section",className:"col-md-8 col-12 d-flex align-items-center flex-column p-5",children:[(0,i.jsx)("div",{className:"headings d-flex justify-content-center align-items-center mb-4",children:(0,i.jsx)(d.X6,{size:"lg",children:t&&t.data[0].attributes.body_title})}),(0,i.jsx)(d.xu,{className:"service-body",style:{whiteSpace:"pre-line",padding:"0 2rem"},children:(0,i.jsx)(l.D,{children:t&&t.data[0].attributes.body_1.split("<br/>").join("\n")})}),(0,i.jsx)("br",{}),V&&0!==V.length&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(d.xu,{display:"flex",alignItems:"center",justifyContent:"space-around",width:"100%",height:"500px",marginTop:2,padding:"0px 2rem",children:(0,i.jsx)(d.xu,{width:"100%",height:"100%",backgroundImage:"url(https://assignmentsantastrapi.fly.dev".concat(V[0].url,")"),backgroundSize:"cover",backgroundPosition:"center"})}),(0,i.jsx)("br",{})]}),t&&t.data[0].attributes.body_2&&(0,i.jsx)(d.xu,{className:"service-body",style:{"white-space":"pre-line",padding:"0 2rem"},children:(0,i.jsx)(l.D,{children:t&&t.data[0].attributes.body_2.split("<br/>").join("\n")})}),(0,i.jsx)("br",{}),(0,i.jsx)(P,{title:M,slug:L,faqschemas:n})]}),(0,i.jsxs)(d.xu,{id:"right-section",className:"col-md-3 col-12 d-flex align-items-center flex-column justify-content-top p-4",children:[(0,i.jsx)(d.xu,{id:"assignment-section",className:"bg-white p-30 mt-20",marginTop:"20",borderRadius:"5px",border:"2px solid #eceeef",width:"100%",children:(0,i.jsxs)(d.xu,{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",padding:"5",children:[(0,i.jsx)("img",{alt:"Question Bank",src:"https://www.totalassignment.com/uploads/search-assignment03.png",width:"60px;"}),(0,i.jsx)(d.X6,{size:"md",className:"lspacing",paddingBottom:"5",paddingTop:"5",children:"Looking for Your Assignment?"}),(0,i.jsx)("a",{href:"#",className:"btn btn-md btn-primary",children:"Search Assignment"})]})}),(0,i.jsx)(d.xu,{children:(0,i.jsx)("img",{class:"",alt:"",style:{"padding-top":"20px","padding-bottom":"20px"},src:"https://www.totalassignment.com/assets/image/we_accept.png"})}),(0,i.jsx)(d.xu,{children:(0,i.jsx)("img",{className:"",style:{"padding-top":"10px","padding-bottom":"20px"},alt:"",src:"https://www.totalassignment.com/assets/image/MONEY_BACK.png"})}),(0,i.jsx)(d.xu,{children:(0,i.jsx)("img",{className:"",style:{"padding-top":"10px","padding-bottom":"20px"},alt:"",src:"https://www.totalassignment.com/assets/image/100p_QUALITY.png"})}),(0,i.jsx)(d.xu,{children:(0,i.jsx)("img",{className:"",style:{"padding-top":"10px","padding-bottom":"20px"},alt:"",src:"https://www.totalassignment.com/assets/image/Lowest_Price_Guarantee.png"})}),(0,i.jsx)(d.xu,{children:(0,i.jsx)("img",{className:"",style:{"padding-top":"10px","padding-bottom":"20px"},alt:"",src:"https://www.totalassignment.com/assets/image/Plagiarism_Free_Work.png"})}),(0,i.jsx)(d.xu,{width:"100%",backgroundColor:"#f0f5f8",children:(0,i.jsxs)("div",{className:"bg-grey p-20 mb-20",style:{"margin-top":"20px"},children:[(0,i.jsx)(d.X6,{marginTop:"10",marginLeft:"3",children:"Other Assignment Services"}),(0,i.jsxs)("ul",{className:"list-group list-group-flush",children:[(0,i.jsx)("li",{className:"list-group-item",style:{background:"#0000"},children:(0,i.jsx)("a",{href:"#",children:"My Assignment Help"})}),(0,i.jsx)("li",{className:"list-group-item",style:{background:"#0000"},children:(0,i.jsx)("a",{href:"#",children:"SCM Assignment Help"})}),(0,i.jsx)("li",{className:"list-group-item",style:{background:"#0000"},children:(0,i.jsx)("a",{href:"#",children:"HRM Assignment Help"})})]})]})})]})]}),(0,i.jsx)(E.Z,{}),(0,i.jsx)(I.f,{className:"w-100"})]}):(0,i.jsx)(A.default,{})})}}},function(e){e.O(0,[9774,9866,994,5937,4617,571,9669,8527,7496,1716,3673,4612,6637,9411,8030,9462,1506,2976,2090,2888,179],(function(){return t=5361,e(e.s=t);var t}));var t=e.O();_N_E=t}]);