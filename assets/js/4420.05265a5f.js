/*! For license information please see 4420.05265a5f.js.LICENSE.txt */
"use strict";(self.webpackChunkeclipse_tractusx_github_io=self.webpackChunkeclipse_tractusx_github_io||[]).push([[4420],{70917:(e,t,n)=>{n.d(t,{F4:()=>c,xB:()=>u});var r=n(67294),o=(n(8417),n(52443)),i=(n(8679),n(70444)),s=n(48137),l=n(27278),u=(0,o.w)((function(e,t){var n=e.styles,u=(0,s.O)([n],void 0,(0,r.useContext)(o.T)),a=(0,r.useRef)();return(0,l.j)((function(){var e=t.key+"-global",n=new t.sheet.constructor({key:e,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),r=!1,o=document.querySelector('style[data-emotion="'+e+" "+u.name+'"]');return t.sheet.tags.length&&(n.before=t.sheet.tags[0]),null!==o&&(r=!0,o.setAttribute("data-emotion",e),n.hydrate([o])),a.current=[n,r],function(){n.flush()}}),[t]),(0,l.j)((function(){var e=a.current,n=e[0];if(e[1])e[1]=!1;else{if(void 0!==u.next&&(0,i.My)(t,u.next,!0),n.tags.length){var r=n.tags[n.tags.length-1].nextElementSibling;n.before=r,n.flush()}t.insert("",u,n,!1)}}),[t,u.name]),null}));function a(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,s.O)(t)}var c=function(){var e=a.apply(void 0,arguments),t="animation-"+e.name;return{name:t,styles:"@keyframes "+t+"{"+e.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}}},47739:(e,t,n)=>{n.d(t,{Z:()=>A});var r=n(87462),o=n(63366),i=n(67294),s=n(86010),l=n(94780),u=n(11496),a=n(33616),c=n(51705),p=n(2068),d=n(18791);var f=n(75068),h=n(220);function m(e,t){var n=Object.create(null);return e&&i.Children.map(e,(function(e){return e})).forEach((function(e){n[e.key]=function(e){return t&&(0,i.isValidElement)(e)?t(e):e}(e)})),n}function b(e,t,n){return null!=n[t]?n[t]:e.props[t]}function y(e,t,n){var r=m(e.children),o=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,o=Object.create(null),i=[];for(var s in e)s in t?i.length&&(o[s]=i,i=[]):i.push(s);var l={};for(var u in t){if(o[u])for(r=0;r<o[u].length;r++){var a=o[u][r];l[o[u][r]]=n(a)}l[u]=n(u)}for(r=0;r<i.length;r++)l[i[r]]=n(i[r]);return l}(t,r);return Object.keys(o).forEach((function(s){var l=o[s];if((0,i.isValidElement)(l)){var u=s in t,a=s in r,c=t[s],p=(0,i.isValidElement)(c)&&!c.props.in;!a||u&&!p?a||!u||p?a&&u&&(0,i.isValidElement)(c)&&(o[s]=(0,i.cloneElement)(l,{onExited:n.bind(null,l),in:c.props.in,exit:b(l,"exit",e),enter:b(l,"enter",e)})):o[s]=(0,i.cloneElement)(l,{in:!1}):o[s]=(0,i.cloneElement)(l,{onExited:n.bind(null,l),in:!0,exit:b(l,"exit",e),enter:b(l,"enter",e)})}})),o}var v=Object.values||function(e){return Object.keys(e).map((function(t){return e[t]}))},g=function(e){function t(t,n){var r,o=(r=e.call(this,t,n)||this).handleExited.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(r));return r.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},r}(0,f.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,r,o=t.children,s=t.handleExited;return{children:t.firstRender?(n=e,r=s,m(n.children,(function(e){return(0,i.cloneElement)(e,{onExited:r.bind(null,e),in:!0,appear:b(e,"appear",n),enter:b(e,"enter",n),exit:b(e,"exit",n)})}))):y(e,o,s),firstRender:!1}},n.handleExited=function(e,t){var n=m(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState((function(t){var n=(0,r.Z)({},t.children);return delete n[e.key],{children:n}})))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=(0,o.Z)(e,["component","childFactory"]),s=this.state.contextValue,l=v(this.state.children).map(n);return delete r.appear,delete r.enter,delete r.exit,null===t?i.createElement(h.Z.Provider,{value:s},l):i.createElement(h.Z.Provider,{value:s},i.createElement(t,r,l))},t}(i.Component);g.propTypes={},g.defaultProps={component:"div",childFactory:function(e){return e}};const x=g;var R=n(70917),M=n(85893);const S=function(e){const{className:t,classes:n,pulsate:r=!1,rippleX:o,rippleY:l,rippleSize:u,in:a,onExited:c,timeout:p}=e,[d,f]=i.useState(!1),h=(0,s.Z)(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),m={width:u,height:u,top:-u/2+l,left:-u/2+o},b=(0,s.Z)(n.child,d&&n.childLeaving,r&&n.childPulsate);return a||d||f(!0),i.useEffect((()=>{if(!a&&null!=c){const e=setTimeout(c,p);return()=>{clearTimeout(e)}}}),[c,a,p]),(0,M.jsx)("span",{className:h,style:m,children:(0,M.jsx)("span",{className:b})})};var E=n(1588);const Z=(0,E.Z)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),$=["center","classes","className"];let k,T,C,w,P=e=>e;const V=(0,R.F4)(k||(k=P`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),j=(0,R.F4)(T||(T=P`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),F=(0,R.F4)(C||(C=P`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),L=(0,u.ZP)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),D=(0,u.ZP)(S,{name:"MuiTouchRipple",slot:"Ripple"})(w||(w=P`
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
`),Z.rippleVisible,V,550,(({theme:e})=>e.transitions.easing.easeInOut),Z.ripplePulsate,(({theme:e})=>e.transitions.duration.shorter),Z.child,Z.childLeaving,j,550,(({theme:e})=>e.transitions.easing.easeInOut),Z.childPulsate,F,(({theme:e})=>e.transitions.easing.easeInOut)),_=i.forwardRef((function(e,t){const n=(0,a.Z)({props:e,name:"MuiTouchRipple"}),{center:l=!1,classes:u={},className:c}=n,p=(0,o.Z)(n,$),[d,f]=i.useState([]),h=i.useRef(0),m=i.useRef(null);i.useEffect((()=>{m.current&&(m.current(),m.current=null)}),[d]);const b=i.useRef(!1),y=i.useRef(null),v=i.useRef(null),g=i.useRef(null);i.useEffect((()=>()=>{clearTimeout(y.current)}),[]);const R=i.useCallback((e=>{const{pulsate:t,rippleX:n,rippleY:r,rippleSize:o,cb:i}=e;f((e=>[...e,(0,M.jsx)(D,{classes:{ripple:(0,s.Z)(u.ripple,Z.ripple),rippleVisible:(0,s.Z)(u.rippleVisible,Z.rippleVisible),ripplePulsate:(0,s.Z)(u.ripplePulsate,Z.ripplePulsate),child:(0,s.Z)(u.child,Z.child),childLeaving:(0,s.Z)(u.childLeaving,Z.childLeaving),childPulsate:(0,s.Z)(u.childPulsate,Z.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:o},h.current)])),h.current+=1,m.current=i}),[u]),S=i.useCallback(((e={},t={},n=(()=>{}))=>{const{pulsate:r=!1,center:o=l||t.pulsate,fakeElement:i=!1}=t;if("mousedown"===(null==e?void 0:e.type)&&b.current)return void(b.current=!1);"touchstart"===(null==e?void 0:e.type)&&(b.current=!0);const s=i?null:g.current,u=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0};let a,c,p;if(o||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)a=Math.round(u.width/2),c=Math.round(u.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;a=Math.round(t-u.left),c=Math.round(n-u.top)}if(o)p=Math.sqrt((2*u.width**2+u.height**2)/3),p%2==0&&(p+=1);else{const e=2*Math.max(Math.abs((s?s.clientWidth:0)-a),a)+2,t=2*Math.max(Math.abs((s?s.clientHeight:0)-c),c)+2;p=Math.sqrt(e**2+t**2)}null!=e&&e.touches?null===v.current&&(v.current=()=>{R({pulsate:r,rippleX:a,rippleY:c,rippleSize:p,cb:n})},y.current=setTimeout((()=>{v.current&&(v.current(),v.current=null)}),80)):R({pulsate:r,rippleX:a,rippleY:c,rippleSize:p,cb:n})}),[l,R]),E=i.useCallback((()=>{S({},{pulsate:!0})}),[S]),k=i.useCallback(((e,t)=>{if(clearTimeout(y.current),"touchend"===(null==e?void 0:e.type)&&v.current)return v.current(),v.current=null,void(y.current=setTimeout((()=>{k(e,t)})));v.current=null,f((e=>e.length>0?e.slice(1):e)),m.current=t}),[]);return i.useImperativeHandle(t,(()=>({pulsate:E,start:S,stop:k})),[E,S,k]),(0,M.jsx)(L,(0,r.Z)({className:(0,s.Z)(Z.root,u.root,c),ref:g},p,{children:(0,M.jsx)(x,{component:null,exit:!0,children:d})}))}));var B=n(34867);function O(e){return(0,B.Z)("MuiButtonBase",e)}const z=(0,E.Z)("MuiButtonBase",["root","disabled","focusVisible"]),I=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],N=(0,u.ZP)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${z.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),A=i.forwardRef((function(e,t){const n=(0,a.Z)({props:e,name:"MuiButtonBase"}),{action:u,centerRipple:f=!1,children:h,className:m,component:b="button",disabled:y=!1,disableRipple:v=!1,disableTouchRipple:g=!1,focusRipple:x=!1,LinkComponent:R="a",onBlur:S,onClick:E,onContextMenu:Z,onDragLeave:$,onFocus:k,onFocusVisible:T,onKeyDown:C,onKeyUp:w,onMouseDown:P,onMouseLeave:V,onMouseUp:j,onTouchEnd:F,onTouchMove:L,onTouchStart:D,tabIndex:B=0,TouchRippleProps:z,touchRippleRef:A,type:X}=n,U=(0,o.Z)(n,I),Y=i.useRef(null),K=i.useRef(null),H=(0,c.Z)(K,A),{isFocusVisibleRef:W,onFocus:q,onBlur:G,ref:J}=(0,d.Z)(),[Q,ee]=i.useState(!1);y&&Q&&ee(!1),i.useImperativeHandle(u,(()=>({focusVisible:()=>{ee(!0),Y.current.focus()}})),[]);const[te,ne]=i.useState(!1);i.useEffect((()=>{ne(!0)}),[]);const re=te&&!v&&!y;function oe(e,t,n=g){return(0,p.Z)((r=>{t&&t(r);return!n&&K.current&&K.current[e](r),!0}))}i.useEffect((()=>{Q&&x&&!v&&te&&K.current.pulsate()}),[v,x,Q,te]);const ie=oe("start",P),se=oe("stop",Z),le=oe("stop",$),ue=oe("stop",j),ae=oe("stop",(e=>{Q&&e.preventDefault(),V&&V(e)})),ce=oe("start",D),pe=oe("stop",F),de=oe("stop",L),fe=oe("stop",(e=>{G(e),!1===W.current&&ee(!1),S&&S(e)}),!1),he=(0,p.Z)((e=>{Y.current||(Y.current=e.currentTarget),q(e),!0===W.current&&(ee(!0),T&&T(e)),k&&k(e)})),me=()=>{const e=Y.current;return b&&"button"!==b&&!("A"===e.tagName&&e.href)},be=i.useRef(!1),ye=(0,p.Z)((e=>{x&&!be.current&&Q&&K.current&&" "===e.key&&(be.current=!0,K.current.stop(e,(()=>{K.current.start(e)}))),e.target===e.currentTarget&&me()&&" "===e.key&&e.preventDefault(),C&&C(e),e.target===e.currentTarget&&me()&&"Enter"===e.key&&!y&&(e.preventDefault(),E&&E(e))})),ve=(0,p.Z)((e=>{x&&" "===e.key&&K.current&&Q&&!e.defaultPrevented&&(be.current=!1,K.current.stop(e,(()=>{K.current.pulsate(e)}))),w&&w(e),E&&e.target===e.currentTarget&&me()&&" "===e.key&&!e.defaultPrevented&&E(e)}));let ge=b;"button"===ge&&(U.href||U.to)&&(ge=R);const xe={};"button"===ge?(xe.type=void 0===X?"button":X,xe.disabled=y):(U.href||U.to||(xe.role="button"),y&&(xe["aria-disabled"]=y));const Re=(0,c.Z)(t,J,Y);const Me=(0,r.Z)({},n,{centerRipple:f,component:b,disabled:y,disableRipple:v,disableTouchRipple:g,focusRipple:x,tabIndex:B,focusVisible:Q}),Se=(e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:o}=e,i={root:["root",t&&"disabled",n&&"focusVisible"]},s=(0,l.Z)(i,O,o);return n&&r&&(s.root+=` ${r}`),s})(Me);return(0,M.jsxs)(N,(0,r.Z)({as:ge,className:(0,s.Z)(Se.root,m),ownerState:Me,onBlur:fe,onClick:E,onContextMenu:se,onFocus:he,onKeyDown:ye,onKeyUp:ve,onMouseDown:ie,onMouseLeave:ae,onMouseUp:ue,onDragLeave:le,onTouchEnd:pe,onTouchMove:de,onTouchStart:ce,ref:Re,tabIndex:y?-1:B,type:X},xe,U,{children:[h,re?(0,M.jsx)(_,(0,r.Z)({ref:H,center:f},z)):null]}))}))},69921:(e,t)=>{var n,r=Symbol.for("react.element"),o=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),a=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen");function y(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case i:case l:case s:case d:case f:return e;default:switch(e=e&&e.$$typeof){case c:case a:case p:case m:case h:case u:return e;default:return t}}case o:return t}}}n=Symbol.for("react.module.reference"),t.ContextConsumer=a,t.ContextProvider=u,t.Element=r,t.ForwardRef=p,t.Fragment=i,t.Lazy=m,t.Memo=h,t.Portal=o,t.Profiler=l,t.StrictMode=s,t.Suspense=d,t.SuspenseList=f,t.isAsyncMode=function(){return!1},t.isConcurrentMode=function(){return!1},t.isContextConsumer=function(e){return y(e)===a},t.isContextProvider=function(e){return y(e)===u},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r},t.isForwardRef=function(e){return y(e)===p},t.isFragment=function(e){return y(e)===i},t.isLazy=function(e){return y(e)===m},t.isMemo=function(e){return y(e)===h},t.isPortal=function(e){return y(e)===o},t.isProfiler=function(e){return y(e)===l},t.isStrictMode=function(e){return y(e)===s},t.isSuspense=function(e){return y(e)===d},t.isSuspenseList=function(e){return y(e)===f},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===l||e===s||e===d||e===f||e===b||"object"==typeof e&&null!==e&&(e.$$typeof===m||e.$$typeof===h||e.$$typeof===u||e.$$typeof===a||e.$$typeof===p||e.$$typeof===n||void 0!==e.getModuleId)},t.typeOf=y},59864:(e,t,n)=>{e.exports=n(69921)}}]);