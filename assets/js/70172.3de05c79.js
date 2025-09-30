"use strict";(self.webpackChunkeclipse_tractusx_github_io=self.webpackChunkeclipse_tractusx_github_io||[]).push([["70172"],{16535:function(e,t,n){n.d(t,{A:()=>v});var r=n(40160),i=n(854707),o=n(296540),l=n(371485),u=n(175659),a=n(311848),s=n(225669),c=n(896852),p=n(683034),d=n(268851),h=n(701177),f=n(989987),m=n(474848);let b=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],A=(0,a.Ay)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${f.A.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),v=o.forwardRef(function(e,t){let n=(0,s.b)({props:e,name:"MuiButtonBase"}),{action:a,centerRipple:v=!1,children:g,className:y,component:x="button",disabled:E=!1,disableRipple:M=!1,disableTouchRipple:R=!1,focusRipple:k=!1,LinkComponent:T="a",onBlur:w,onClick:C,onContextMenu:P,onDragLeave:V,onFocus:$,onFocusVisible:j,onKeyDown:S,onKeyUp:B,onMouseDown:D,onMouseLeave:L,onMouseUp:I,onTouchEnd:F,onTouchMove:N,onTouchStart:O,tabIndex:W=0,TouchRippleProps:_,touchRippleRef:z,type:U}=n,X=(0,i.A)(n,b),q=o.useRef(null),H=o.useRef(null),K=(0,c.A)(H,z),{isFocusVisibleRef:Y,onFocus:G,onBlur:J,ref:Q}=(0,d.A)(),[Z,ee]=o.useState(!1);E&&Z&&ee(!1),o.useImperativeHandle(a,()=>({focusVisible:()=>{ee(!0),q.current.focus()}}),[]);let[et,en]=o.useState(!1);o.useEffect(()=>{en(!0)},[]);let er=et&&!M&&!E;function ei(e,t,n=R){return(0,p.A)(r=>(t&&t(r),!n&&H.current&&H.current[e](r),!0))}o.useEffect(()=>{Z&&k&&!M&&et&&H.current.pulsate()},[M,k,Z,et]);let eo=ei("start",D),el=ei("stop",P),eu=ei("stop",V),ea=ei("stop",I),es=ei("stop",e=>{Z&&e.preventDefault(),L&&L(e)}),ec=ei("start",O),ep=ei("stop",F),ed=ei("stop",N),eh=ei("stop",e=>{J(e),!1===Y.current&&ee(!1),w&&w(e)},!1),ef=(0,p.A)(e=>{q.current||(q.current=e.currentTarget),G(e),!0===Y.current&&(ee(!0),j&&j(e)),$&&$(e)}),em=()=>{let e=q.current;return x&&"button"!==x&&!("A"===e.tagName&&e.href)},eb=o.useRef(!1),eA=(0,p.A)(e=>{k&&!eb.current&&Z&&H.current&&" "===e.key&&(eb.current=!0,H.current.stop(e,()=>{H.current.start(e)})),e.target===e.currentTarget&&em()&&" "===e.key&&e.preventDefault(),S&&S(e),e.target===e.currentTarget&&em()&&"Enter"===e.key&&!E&&(e.preventDefault(),C&&C(e))}),ev=(0,p.A)(e=>{k&&" "===e.key&&H.current&&Z&&!e.defaultPrevented&&(eb.current=!1,H.current.stop(e,()=>{H.current.pulsate(e)})),B&&B(e),C&&e.target===e.currentTarget&&em()&&" "===e.key&&!e.defaultPrevented&&C(e)}),eg=x;"button"===eg&&(X.href||X.to)&&(eg=T);let ey={};"button"===eg?(ey.type=void 0===U?"button":U,ey.disabled=E):(X.href||X.to||(ey.role="button"),E&&(ey["aria-disabled"]=E));let ex=(0,c.A)(t,Q,q),eE=(0,r.A)({},n,{centerRipple:v,component:x,disabled:E,disableRipple:M,disableTouchRipple:R,focusRipple:k,tabIndex:W,focusVisible:Z}),eM=(e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,o=(0,u.A)({root:["root",t&&"disabled",n&&"focusVisible"]},f.W,i);return n&&r&&(o.root+=` ${r}`),o})(eE);return(0,m.jsxs)(A,(0,r.A)({as:eg,className:(0,l.A)(eM.root,y),ownerState:eE,onBlur:eh,onClick:C,onContextMenu:el,onFocus:ef,onKeyDown:eA,onKeyUp:ev,onMouseDown:eo,onMouseLeave:es,onMouseUp:ea,onDragLeave:eu,onTouchEnd:ep,onTouchMove:ed,onTouchStart:ec,ref:ex,tabIndex:E?-1:W,type:U},ey,X,{children:[g,er?(0,m.jsx)(h.Ay,(0,r.A)({ref:K,center:v},_)):null]}))})},341448:function(e,t,n){n.d(t,{A:()=>l});var r=n(296540),i=n(371485),o=n(474848);let l=function(e){let{className:t,classes:n,pulsate:l=!1,rippleX:u,rippleY:a,rippleSize:s,in:c,onExited:p,timeout:d}=e,[h,f]=r.useState(!1),m=(0,i.A)(t,n.ripple,n.rippleVisible,l&&n.ripplePulsate),b=(0,i.A)(n.child,h&&n.childLeaving,l&&n.childPulsate);return c||h||f(!0),r.useEffect(()=>{if(!c&&null!=p){let e=setTimeout(p,d);return()=>{clearTimeout(e)}}},[p,c,d]),(0,o.jsx)("span",{className:m,style:{width:s,height:s,top:-(s/2)+a,left:-(s/2)+u},children:(0,o.jsx)("span",{className:b})})}},701177:function(e,t,n){n.d(t,{Ay:()=>T});var r=n(40160),i=n(854707),o=n(296540),l=n(280004),u=n(371485),a=n(17437),s=n(688535),c=n(311848),p=n(225669),d=n(341448),h=n(89161),f=n(474848);let m=["center","classes","className"],b=e=>e,A,v,g,y,x=(0,a.i7)(A||(A=b`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),E=(0,a.i7)(v||(v=b`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),M=(0,a.i7)(g||(g=b`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),R=(0,c.Ay)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),k=(0,c.Ay)(d.A,{name:"MuiTouchRipple",slot:"Ripple"})(y||(y=b`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),h.A.rippleVisible,x,550,({theme:e})=>e.transitions.easing.easeInOut,h.A.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,h.A.child,h.A.childLeaving,E,550,({theme:e})=>e.transitions.easing.easeInOut,h.A.childPulsate,M,({theme:e})=>e.transitions.easing.easeInOut),T=o.forwardRef(function(e,t){let n=(0,p.b)({props:e,name:"MuiTouchRipple"}),{center:a=!1,classes:c={},className:d}=n,b=(0,i.A)(n,m),[A,v]=o.useState([]),g=o.useRef(0),y=o.useRef(null);o.useEffect(()=>{y.current&&(y.current(),y.current=null)},[A]);let x=o.useRef(!1),E=(0,s.A)(),M=o.useRef(null),T=o.useRef(null),w=o.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:r,rippleSize:i,cb:o}=e;v(e=>[...e,(0,f.jsx)(k,{classes:{ripple:(0,u.A)(c.ripple,h.A.ripple),rippleVisible:(0,u.A)(c.rippleVisible,h.A.rippleVisible),ripplePulsate:(0,u.A)(c.ripplePulsate,h.A.ripplePulsate),child:(0,u.A)(c.child,h.A.child),childLeaving:(0,u.A)(c.childLeaving,h.A.childLeaving),childPulsate:(0,u.A)(c.childPulsate,h.A.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:i},g.current)]),g.current+=1,y.current=o},[c]),C=o.useCallback((e={},t={},n=()=>{})=>{let r,i,o,{pulsate:l=!1,center:u=a||t.pulsate,fakeElement:s=!1}=t;if((null==e?void 0:e.type)==="mousedown"&&x.current){x.current=!1;return}(null==e?void 0:e.type)==="touchstart"&&(x.current=!0);let c=s?null:T.current,p=c?c.getBoundingClientRect():{width:0,height:0,left:0,top:0};if(!u&&void 0!==e&&(0!==e.clientX||0!==e.clientY)&&(e.clientX||e.touches)){let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;r=Math.round(t-p.left),i=Math.round(n-p.top)}else r=Math.round(p.width/2),i=Math.round(p.height/2);u?(o=Math.sqrt((2*p.width**2+p.height**2)/3))%2==0&&(o+=1):o=Math.sqrt((2*Math.max(Math.abs((c?c.clientWidth:0)-r),r)+2)**2+(2*Math.max(Math.abs((c?c.clientHeight:0)-i),i)+2)**2),null!=e&&e.touches?null===M.current&&(M.current=()=>{w({pulsate:l,rippleX:r,rippleY:i,rippleSize:o,cb:n})},E.start(80,()=>{M.current&&(M.current(),M.current=null)})):w({pulsate:l,rippleX:r,rippleY:i,rippleSize:o,cb:n})},[a,w,E]),P=o.useCallback(()=>{C({},{pulsate:!0})},[C]),V=o.useCallback((e,t)=>{if(E.clear(),(null==e?void 0:e.type)==="touchend"&&M.current){M.current(),M.current=null,E.start(0,()=>{V(e,t)});return}M.current=null,v(e=>e.length>0?e.slice(1):e),y.current=t},[E]);return o.useImperativeHandle(t,()=>({pulsate:P,start:C,stop:V}),[P,C,V]),(0,f.jsx)(R,(0,r.A)({className:(0,u.A)(h.A.root,c.root,d),ref:T},b,{children:(0,f.jsx)(l.A,{component:null,exit:!0,children:A})}))})},989987:function(e,t,n){n.d(t,{A:()=>l,W:()=>o});var r=n(938413),i=n(931609);function o(e){return(0,i.Ay)("MuiButtonBase",e)}let l=(0,r.A)("MuiButtonBase",["root","disabled","focusVisible"])},89161:function(e,t,n){n.d(t,{A:()=>r});let r=(0,n(938413).A)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"])},280004:function(e,t,n){n.d(t,{A:()=>d});var r=n(854707),i=n(40160),o=n(340321),l=n(256003),u=n(296540),a=n(17241),s=n(454922),c=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},p=function(e){function t(t,n){var r=e.call(this,t,n)||this,i=r.handleExited.bind((0,o.A)(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}(0,l.A)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n=t.children,r=t.handleExited;return{children:t.firstRender?(0,s.dw)(e,r):(0,s.qX)(e,n,r),firstRender:!1}},n.handleExited=function(e,t){var n=(0,s.p7)(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=(0,i.A)({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,i=(0,r.A)(e,["component","childFactory"]),o=this.state.contextValue,l=c(this.state.children).map(n);return(delete i.appear,delete i.enter,delete i.exit,null===t)?u.createElement(a.A.Provider,{value:o},l):u.createElement(a.A.Provider,{value:o},u.createElement(t,i,l))},t}(u.Component);p.propTypes={},p.defaultProps={component:"div",childFactory:function(e){return e}};let d=p},454922:function(e,t,n){n.d(t,{dw:()=>l,p7:()=>i,qX:()=>u});var r=n(296540);function i(e,t){var n=Object.create(null);return e&&r.Children.map(e,function(e){return e}).forEach(function(e){n[e.key]=t&&(0,r.isValidElement)(e)?t(e):e}),n}function o(e,t,n){return null!=n[t]?n[t]:e.props[t]}function l(e,t){return i(e.children,function(n){return(0,r.cloneElement)(n,{onExited:t.bind(null,n),in:!0,appear:o(n,"appear",e),enter:o(n,"enter",e),exit:o(n,"exit",e)})})}function u(e,t,n){var l=i(e.children),u=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,i=Object.create(null),o=[];for(var l in e)l in t?o.length&&(i[l]=o,o=[]):o.push(l);var u={};for(var a in t){if(i[a])for(r=0;r<i[a].length;r++){var s=i[a][r];u[i[a][r]]=n(s)}u[a]=n(a)}for(r=0;r<o.length;r++)u[o[r]]=n(o[r]);return u}(t,l);return Object.keys(u).forEach(function(i){var a=u[i];if((0,r.isValidElement)(a)){var s=i in t,c=i in l,p=t[i],d=(0,r.isValidElement)(p)&&!p.props.in;c&&(!s||d)?u[i]=(0,r.cloneElement)(a,{onExited:n.bind(null,a),in:!0,exit:o(a,"exit",e),enter:o(a,"enter",e)}):c||!s||d?c&&s&&(0,r.isValidElement)(p)&&(u[i]=(0,r.cloneElement)(a,{onExited:n.bind(null,a),in:p.props.in,exit:o(a,"exit",e),enter:o(a,"enter",e)})):u[i]=(0,r.cloneElement)(a,{in:!1})}}),u}},340321:function(e,t,n){n.d(t,{A:()=>r});function r(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}}}]);