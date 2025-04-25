"use strict";(self.webpackChunkeclipse_tractusx_github_io=self.webpackChunkeclipse_tractusx_github_io||[]).push([[52957],{52957:(e,t,n)=>{n.d(t,{A:()=>Y});var i=n(58168),r=n(98587),o=n(96540),l=n(54533),s=n(75659),a=n(11848),u=n(25669),c=n(96852),p=n(83034),d=n(60458);var h=n(42892),f=n(17241);function m(e,t){var n=Object.create(null);return e&&o.Children.map(e,(function(e){return e})).forEach((function(e){n[e.key]=function(e){return t&&(0,o.isValidElement)(e)?t(e):e}(e)})),n}function b(e,t,n){return null!=n[t]?n[t]:e.props[t]}function v(e,t,n){var i=m(e.children),r=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var i,r=Object.create(null),o=[];for(var l in e)l in t?o.length&&(r[l]=o,o=[]):o.push(l);var s={};for(var a in t){if(r[a])for(i=0;i<r[a].length;i++){var u=r[a][i];s[r[a][i]]=n(u)}s[a]=n(a)}for(i=0;i<o.length;i++)s[o[i]]=n(o[i]);return s}(t,i);return Object.keys(r).forEach((function(l){var s=r[l];if((0,o.isValidElement)(s)){var a=l in t,u=l in i,c=t[l],p=(0,o.isValidElement)(c)&&!c.props.in;!u||a&&!p?u||!a||p?u&&a&&(0,o.isValidElement)(c)&&(r[l]=(0,o.cloneElement)(s,{onExited:n.bind(null,s),in:c.props.in,exit:b(s,"exit",e),enter:b(s,"enter",e)})):r[l]=(0,o.cloneElement)(s,{in:!1}):r[l]=(0,o.cloneElement)(s,{onExited:n.bind(null,s),in:!0,exit:b(s,"exit",e),enter:b(s,"enter",e)})}})),r}var g=Object.values||function(e){return Object.keys(e).map((function(t){return e[t]}))},x=function(e){function t(t,n){var i,r=(i=e.call(this,t,n)||this).handleExited.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(i));return i.state={contextValue:{isMounting:!0},handleExited:r,firstRender:!0},i}(0,h.A)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,i,r=t.children,l=t.handleExited;return{children:t.firstRender?(n=e,i=l,m(n.children,(function(e){return(0,o.cloneElement)(e,{onExited:i.bind(null,e),in:!0,appear:b(e,"appear",n),enter:b(e,"enter",n),exit:b(e,"exit",n)})}))):v(e,r,l),firstRender:!1}},n.handleExited=function(e,t){var n=m(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState((function(t){var n=(0,i.A)({},t.children);return delete n[e.key],{children:n}})))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,i=(0,r.A)(e,["component","childFactory"]),l=this.state.contextValue,s=g(this.state.children).map(n);return delete i.appear,delete i.enter,delete i.exit,null===t?o.createElement(f.A.Provider,{value:l},s):o.createElement(f.A.Provider,{value:l},o.createElement(t,i,s))},t}(o.Component);x.propTypes={},x.defaultProps={component:"div",childFactory:function(e){return e}};const y=x;var R=n(17437),A=n(27598),M=n(74848);const E=function(e){const{className:t,classes:n,pulsate:i=!1,rippleX:r,rippleY:s,rippleSize:a,in:u,onExited:c,timeout:p}=e,[d,h]=o.useState(!1),f=(0,l.A)(t,n.ripple,n.rippleVisible,i&&n.ripplePulsate),m={width:a,height:a,top:-a/2+s,left:-a/2+r},b=(0,l.A)(n.child,d&&n.childLeaving,i&&n.childPulsate);return u||d||h(!0),o.useEffect((()=>{if(!u&&null!=c){const e=setTimeout(c,p);return()=>{clearTimeout(e)}}}),[c,u,p]),(0,M.jsx)("span",{className:f,style:m,children:(0,M.jsx)("span",{className:b})})};var k=n(38413);const T=(0,k.A)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),C=["center","classes","className"];let V,w,P,S,$=e=>e;const D=(0,R.i7)(V||(V=$`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),j=(0,R.i7)(w||(w=$`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),L=(0,R.i7)(P||(P=$`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),B=(0,a.Ay)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),N=(0,a.Ay)(E,{name:"MuiTouchRipple",slot:"Ripple"})(S||(S=$`
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
`),T.rippleVisible,D,550,(({theme:e})=>e.transitions.easing.easeInOut),T.ripplePulsate,(({theme:e})=>e.transitions.duration.shorter),T.child,T.childLeaving,j,550,(({theme:e})=>e.transitions.easing.easeInOut),T.childPulsate,L,(({theme:e})=>e.transitions.easing.easeInOut)),F=o.forwardRef((function(e,t){const n=(0,u.b)({props:e,name:"MuiTouchRipple"}),{center:s=!1,classes:a={},className:c}=n,p=(0,r.A)(n,C),[d,h]=o.useState([]),f=o.useRef(0),m=o.useRef(null);o.useEffect((()=>{m.current&&(m.current(),m.current=null)}),[d]);const b=o.useRef(!1),v=(0,A.A)(),g=o.useRef(null),x=o.useRef(null),R=o.useCallback((e=>{const{pulsate:t,rippleX:n,rippleY:i,rippleSize:r,cb:o}=e;h((e=>[...e,(0,M.jsx)(N,{classes:{ripple:(0,l.A)(a.ripple,T.ripple),rippleVisible:(0,l.A)(a.rippleVisible,T.rippleVisible),ripplePulsate:(0,l.A)(a.ripplePulsate,T.ripplePulsate),child:(0,l.A)(a.child,T.child),childLeaving:(0,l.A)(a.childLeaving,T.childLeaving),childPulsate:(0,l.A)(a.childPulsate,T.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:i,rippleSize:r},f.current)])),f.current+=1,m.current=o}),[a]),E=o.useCallback(((e={},t={},n=()=>{})=>{const{pulsate:i=!1,center:r=s||t.pulsate,fakeElement:o=!1}=t;if("mousedown"===(null==e?void 0:e.type)&&b.current)return void(b.current=!1);"touchstart"===(null==e?void 0:e.type)&&(b.current=!0);const l=o?null:x.current,a=l?l.getBoundingClientRect():{width:0,height:0,left:0,top:0};let u,c,p;if(r||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)u=Math.round(a.width/2),c=Math.round(a.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;u=Math.round(t-a.left),c=Math.round(n-a.top)}if(r)p=Math.sqrt((2*a.width**2+a.height**2)/3),p%2==0&&(p+=1);else{const e=2*Math.max(Math.abs((l?l.clientWidth:0)-u),u)+2,t=2*Math.max(Math.abs((l?l.clientHeight:0)-c),c)+2;p=Math.sqrt(e**2+t**2)}null!=e&&e.touches?null===g.current&&(g.current=()=>{R({pulsate:i,rippleX:u,rippleY:c,rippleSize:p,cb:n})},v.start(80,(()=>{g.current&&(g.current(),g.current=null)}))):R({pulsate:i,rippleX:u,rippleY:c,rippleSize:p,cb:n})}),[s,R,v]),k=o.useCallback((()=>{E({},{pulsate:!0})}),[E]),V=o.useCallback(((e,t)=>{if(v.clear(),"touchend"===(null==e?void 0:e.type)&&g.current)return g.current(),g.current=null,void v.start(0,(()=>{V(e,t)}));g.current=null,h((e=>e.length>0?e.slice(1):e)),m.current=t}),[v]);return o.useImperativeHandle(t,(()=>({pulsate:k,start:E,stop:V})),[k,E,V]),(0,M.jsx)(B,(0,i.A)({className:(0,l.A)(T.root,a.root,c),ref:x},p,{children:(0,M.jsx)(y,{component:null,exit:!0,children:d})}))}));var I=n(31609);function z(e){return(0,I.Ay)("MuiButtonBase",e)}const O=(0,k.A)("MuiButtonBase",["root","disabled","focusVisible"]),X=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],U=(0,a.Ay)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${O.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Y=o.forwardRef((function(e,t){const n=(0,u.b)({props:e,name:"MuiButtonBase"}),{action:a,centerRipple:h=!1,children:f,className:m,component:b="button",disabled:v=!1,disableRipple:g=!1,disableTouchRipple:x=!1,focusRipple:y=!1,LinkComponent:R="a",onBlur:A,onClick:E,onContextMenu:k,onDragLeave:T,onFocus:C,onFocusVisible:V,onKeyDown:w,onKeyUp:P,onMouseDown:S,onMouseLeave:$,onMouseUp:D,onTouchEnd:j,onTouchMove:L,onTouchStart:B,tabIndex:N=0,TouchRippleProps:I,touchRippleRef:O,type:Y}=n,K=(0,r.A)(n,X),_=o.useRef(null),H=o.useRef(null),W=(0,c.A)(H,O),{isFocusVisibleRef:q,onFocus:G,onBlur:J,ref:Q}=(0,d.A)(),[Z,ee]=o.useState(!1);v&&Z&&ee(!1),o.useImperativeHandle(a,(()=>({focusVisible:()=>{ee(!0),_.current.focus()}})),[]);const[te,ne]=o.useState(!1);o.useEffect((()=>{ne(!0)}),[]);const ie=te&&!g&&!v;function re(e,t,n=x){return(0,p.A)((i=>{t&&t(i);return!n&&H.current&&H.current[e](i),!0}))}o.useEffect((()=>{Z&&y&&!g&&te&&H.current.pulsate()}),[g,y,Z,te]);const oe=re("start",S),le=re("stop",k),se=re("stop",T),ae=re("stop",D),ue=re("stop",(e=>{Z&&e.preventDefault(),$&&$(e)})),ce=re("start",B),pe=re("stop",j),de=re("stop",L),he=re("stop",(e=>{J(e),!1===q.current&&ee(!1),A&&A(e)}),!1),fe=(0,p.A)((e=>{_.current||(_.current=e.currentTarget),G(e),!0===q.current&&(ee(!0),V&&V(e)),C&&C(e)})),me=()=>{const e=_.current;return b&&"button"!==b&&!("A"===e.tagName&&e.href)},be=o.useRef(!1),ve=(0,p.A)((e=>{y&&!be.current&&Z&&H.current&&" "===e.key&&(be.current=!0,H.current.stop(e,(()=>{H.current.start(e)}))),e.target===e.currentTarget&&me()&&" "===e.key&&e.preventDefault(),w&&w(e),e.target===e.currentTarget&&me()&&"Enter"===e.key&&!v&&(e.preventDefault(),E&&E(e))})),ge=(0,p.A)((e=>{y&&" "===e.key&&H.current&&Z&&!e.defaultPrevented&&(be.current=!1,H.current.stop(e,(()=>{H.current.pulsate(e)}))),P&&P(e),E&&e.target===e.currentTarget&&me()&&" "===e.key&&!e.defaultPrevented&&E(e)}));let xe=b;"button"===xe&&(K.href||K.to)&&(xe=R);const ye={};"button"===xe?(ye.type=void 0===Y?"button":Y,ye.disabled=v):(K.href||K.to||(ye.role="button"),v&&(ye["aria-disabled"]=v));const Re=(0,c.A)(t,Q,_);const Ae=(0,i.A)({},n,{centerRipple:h,component:b,disabled:v,disableRipple:g,disableTouchRipple:x,focusRipple:y,tabIndex:N,focusVisible:Z}),Me=(e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:i,classes:r}=e,o={root:["root",t&&"disabled",n&&"focusVisible"]},l=(0,s.A)(o,z,r);return n&&i&&(l.root+=` ${i}`),l})(Ae);return(0,M.jsxs)(U,(0,i.A)({as:xe,className:(0,l.A)(Me.root,m),ownerState:Ae,onBlur:he,onClick:E,onContextMenu:le,onFocus:fe,onKeyDown:ve,onKeyUp:ge,onMouseDown:oe,onMouseLeave:ue,onMouseUp:ae,onDragLeave:se,onTouchEnd:pe,onTouchMove:de,onTouchStart:ce,ref:Re,tabIndex:v?-1:N,type:Y},ye,K,{children:[f,ie?(0,M.jsx)(F,(0,i.A)({ref:W,center:h},I)):null]}))}))}}]);