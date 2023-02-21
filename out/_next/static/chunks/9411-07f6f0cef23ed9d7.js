"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9411],{8133:function(e,n,a){a.d(n,{XZ:function(){return _}});var t=a(4592),i=a(6450),r=a(7294),o=a(8698),c=a(7375),s=a(5993),l=a(2748),d=a(4332),u=a(1358);function h(){return(h=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e}).apply(this,arguments)}var v=(0,i.kr)({name:"CheckboxGroupContext",strict:!1}),f=(v[0],v[1]);function k(e,n){if(null==e)return{};var a,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}t.Ts;var b=["isIndeterminate","isChecked"],p="custom"in l.E?l.E.custom(s.m$.svg):(0,l.E)(s.m$.svg),m=function(e){return r.createElement(p,h({width:"1.2em",viewBox:"0 0 12 10",variants:{unchecked:{opacity:0,strokeDashoffset:16},checked:{opacity:1,strokeDashoffset:0,transition:{duration:.2}}},style:{fill:"none",strokeWidth:2,stroke:"currentColor",strokeDasharray:16}},e),r.createElement("polyline",{points:"1.5 6 4.5 9 10.5 1"}))},C=function(e){return r.createElement(p,h({width:"1.2em",viewBox:"0 0 24 24",variants:{unchecked:{scaleX:.65,opacity:0},checked:{scaleX:1,opacity:1,transition:{scaleX:{duration:0},opacity:{duration:.02}}}},style:{stroke:"currentColor",strokeWidth:4}},e),r.createElement("line",{x1:"21",x2:"3",y1:"12",y2:"12"}))},y=function(e){var n=e.open,a=e.children;return r.createElement(d.M,{initial:!1},n&&r.createElement(l.E.div,{variants:{unchecked:{scale:.5},checked:{scale:1}},initial:"unchecked",animate:"checked",exit:"unchecked",style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}},a))},g=function(e){var n=e.isIndeterminate,a=e.isChecked,t=k(e,b),i=n?C:m;return r.createElement(y,{open:a||n},r.createElement(i,t))},x=["defaultIsChecked","defaultChecked","isChecked","isFocusable","isDisabled","isReadOnly","isRequired","onChange","isIndeterminate","isInvalid","name","value","id","onBlur","onFocus","tabIndex","aria-label","aria-labelledby","aria-invalid","aria-describedby"];function P(e){e.preventDefault(),e.stopPropagation()}var E=["spacing","className","children","iconColor","iconSize","icon","isChecked","isDisabled","onChange"],I=(0,s.m$)("span",{baseStyle:{display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"top",userSelect:"none",flexShrink:0}}),B=(0,s.m$)("label",{baseStyle:{cursor:"pointer",display:"inline-flex",alignItems:"center",verticalAlign:"top",position:"relative",_disabled:{cursor:"not-allowed"}}}),_=(0,s.Gp)((function(e,n){var a=f(),l=h({},a,e),d=(0,s.jC)("Checkbox",l),v=(0,s.Lr)(e),b=v.spacing,p=void 0===b?"0.5rem":b,m=v.className,C=v.children,y=v.iconColor,_=v.iconSize,w=v.icon,D=void 0===w?r.createElement(g,null):w,N=v.isChecked,O=v.isDisabled,M=void 0===O?null==a?void 0:a.isDisabled:O,S=v.onChange,R=k(v,E),T=N;null!=a&&a.value&&v.value&&(T=a.value.includes(v.value));var j=S;null!=a&&a.onChange&&v.value&&(j=(0,t.PP)(a.onChange,S));var L=function(e){void 0===e&&(e={});var n=e,a=n.defaultIsChecked,s=n.defaultChecked,l=void 0===s?a:s,d=n.isChecked,v=n.isFocusable,f=n.isDisabled,b=n.isReadOnly,p=n.isRequired,m=n.onChange,C=n.isIndeterminate,y=n.isInvalid,g=n.name,E=n.value,I=n.id,B=n.onBlur,_=n.onFocus,w=n.tabIndex,D=void 0===w?void 0:w,N=n["aria-label"],O=n["aria-labelledby"],M=n["aria-invalid"],S=n["aria-describedby"],R=k(n,x),T=(0,o.u)(m),j=(0,o.u)(B),L=(0,o.u)(_),q=(0,c.kt)(),F=q[0],$=q[1],K=(0,c.kt)(),A=K[0],U=K[1],X=(0,c.kt)(),z=X[0],G=X[1],H=(0,r.useRef)(null),W=(0,r.useState)(!0),Y=W[0],Z=W[1],J=(0,r.useState)(!!l),Q=J[0],V=J[1],ee=(0,c.pY)(d,Q),ne=ee[0],ae=ee[1];(0,t.ZK)({condition:!!a,message:'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.'});var te=(0,r.useCallback)((function(e){b||f?e.preventDefault():(ne||V(ae?e.target.checked:!!C||e.target.checked),null==T||T(e))}),[b,f,ae,ne,C,T]);(0,o.a)((function(){H.current&&(H.current.indeterminate=Boolean(C))}),[C]),(0,c.rf)((function(){f&&$.off()}),[f,$]);var ie=f&&!v,re=(0,r.useCallback)((function(e){" "===e.key&&G.on()}),[G]),oe=(0,r.useCallback)((function(e){" "===e.key&&G.off()}),[G]);(0,o.a)((function(){H.current&&H.current.checked!==ae&&V(H.current.checked)}),[H.current]);var ce=(0,r.useCallback)((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),h({},e,{ref:n,"data-active":(0,t.PB)(z),"data-hover":(0,t.PB)(A),"data-checked":(0,t.PB)(ae),"data-focus":(0,t.PB)(F),"data-indeterminate":(0,t.PB)(C),"data-disabled":(0,t.PB)(f),"data-invalid":(0,t.PB)(y),"data-readonly":(0,t.PB)(b),"aria-hidden":!0,onMouseDown:(0,t.v0)(e.onMouseDown,(function(e){e.preventDefault(),G.on()})),onMouseUp:(0,t.v0)(e.onMouseUp,G.off),onMouseEnter:(0,t.v0)(e.onMouseEnter,U.on),onMouseLeave:(0,t.v0)(e.onMouseLeave,U.off)})}),[z,ae,f,F,A,C,y,b,G,U.off,U.on]),se=(0,r.useCallback)((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),h({},R,e,{ref:(0,i.lq)(n,(function(e){e&&Z("LABEL"===e.tagName)})),onClick:(0,t.v0)(e.onClick,(function(){var e;Y||(null==(e=H.current)||e.click(),(0,t.T_)(H.current,{nextTick:!0}))})),"data-disabled":(0,t.PB)(f),"data-checked":(0,t.PB)(ae),"data-invalid":(0,t.PB)(y)})}),[R,f,ae,y,Y]),le=(0,r.useCallback)((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),h({},e,{ref:(0,i.lq)(H,n),type:"checkbox",name:g,value:E,id:I,tabIndex:D,onChange:(0,t.v0)(e.onChange,te),onBlur:(0,t.v0)(e.onBlur,j,$.off),onFocus:(0,t.v0)(e.onFocus,L,$.on),onKeyDown:(0,t.v0)(e.onKeyDown,re),onKeyUp:(0,t.v0)(e.onKeyUp,oe),required:p,checked:ae,disabled:ie,readOnly:b,"aria-label":N,"aria-labelledby":O,"aria-invalid":M?Boolean(M):y,"aria-describedby":S,"aria-disabled":f,style:u.NL})}),[g,E,I,te,$.off,$.on,j,L,re,oe,p,ae,ie,b,N,O,M,y,S,f,D]),de=(0,r.useCallback)((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),h({},e,{ref:n,onMouseDown:(0,t.v0)(e.onMouseDown,P),onTouchStart:(0,t.v0)(e.onTouchStart,P),"data-disabled":(0,t.PB)(f),"data-checked":(0,t.PB)(ae),"data-invalid":(0,t.PB)(y)})}),[ae,f,y]);return{state:{isInvalid:y,isFocused:F,isChecked:ae,isActive:z,isHovered:A,isIndeterminate:C,isDisabled:f,isReadOnly:b,isRequired:p},getRootProps:se,getCheckboxProps:ce,getInputProps:le,getLabelProps:de,htmlProps:R}}(h({},R,{isDisabled:M,isChecked:T,onChange:j})),q=L.state,F=L.getInputProps,$=L.getCheckboxProps,K=L.getLabelProps,A=L.getRootProps,U=r.useMemo((function(){return h({opacity:q.isChecked||q.isIndeterminate?1:0,transform:q.isChecked||q.isIndeterminate?"scale(1)":"scale(0.95)",fontSize:_,color:y},d.icon)}),[y,_,q.isChecked,q.isIndeterminate,d.icon]),X=r.cloneElement(D,{__css:U,isIndeterminate:q.isIndeterminate,isChecked:q.isChecked});return r.createElement(B,h({__css:d.container,className:(0,t.cx)("chakra-checkbox",m)},A()),r.createElement("input",h({className:"chakra-checkbox__input"},F({},n))),r.createElement(I,h({__css:d.control,className:"chakra-checkbox__control"},$()),X),C&&r.createElement(s.m$.span,h({className:"chakra-checkbox__label"},K(),{__css:h({marginStart:p},d.label)}),C))}));t.Ts&&(_.displayName="Checkbox")},3441:function(e,n,a){a.d(n,{g:function(){return l}});var t=a(9762),i=a(5993),r=a(4592),o=a(7294);function c(){return(c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e}).apply(this,arguments)}var s=["className","rows"],l=(0,i.Gp)((function(e,n){var a=(0,i.mq)("Textarea",e),l=(0,i.Lr)(e),d=l.className,u=l.rows,h=function(e,n){if(null==e)return{};var a,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(l,s),v=(0,t.Yp)(h),f=u?(0,r.CE)(a,["h","minH","height","minHeight"]):a;return o.createElement(i.m$.textarea,c({ref:n,rows:u},v,{className:(0,r.cx)("chakra-textarea",d),__css:f}))}));r.Ts&&(l.displayName="Textarea")}}]);