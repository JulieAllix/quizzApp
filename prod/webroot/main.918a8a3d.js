(()=>{"use strict";var e={3371:(e,t,n)=>{var r=n(5466),a=n(2429),o=n(6116),l=n(7966),i=n(6387),c=n(445),u=function(e){return r.createElement("div",{className:"Component_ButtonCustom"},r.createElement("div",{className:"yellow"===e.color?"Component_ButtonCustom__buttonWrapperYellow":"Component_ButtonCustom__buttonWrapperOrange"},r.createElement(c.Z,{size:"large",shape:"round",onClick:e.onClick},e.children)))},s=n(7883),m=function(e){return r.createElement("div",{className:"Component-InputCustom"},r.createElement("div",{className:"Component-InputCustom__inputWrapper"},r.createElement("div",{className:"Component-InputCustom__label"},e.label),r.createElement(s.Z,{value:e.value,onChange:function(t){return e.setValue(t.target.value)},size:"large"})))},d=n(3511),p=function(e){return r.createElement("div",{className:"Component-ModalCustom"},r.createElement(d.Z,{visible:e.visible,title:e.title,onOk:function(){return e.setVisible(!1)},onCancel:function(){return e.setVisible(!1)},footer:[r.createElement(u,{color:"yellow",onClick:function(){return e.setVisible(!1)}},"Ok")]},r.createElement("div",{className:"Component-ModalCustom__modalContent"},e.children)))},f=n(213),v=(n(3488),n(5495),function(){return(v=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)}),g=function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function l(e){try{c(r.next(e))}catch(e){o(e)}}function i(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,i)}c((r=r.apply(e,t||[])).next())}))},_=function(e,t){var n,r,a,o,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,r=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!((a=(a=l.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){l.label=o[1];break}if(6===o[0]&&l.label<a[1]){l.label=a[1],a=o;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(o);break}a[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};f.Z.initializeApp({apiKey:"AIzaSyCpCJHA29oT95x77kPiGklBosw-5Ryneu4",authDomain:"quizzapp-cac19.firebaseapp.com",projectId:"quizzapp-cac19",storageBucket:"quizzapp-cac19.appspot.com",messagingSenderId:"730510455052",appId:"1:730510455052:web:91b378704b9db857bb9929",measurementId:"G-K1F3GC1TST"});var b,h=f.Z.auth(),E=f.Z.firestore(),y=E.collection("users"),C=E.collection("studyCards"),S=function(e){return y.doc(e.userUid).set(v({},e))},w=function(e){return g(void 0,void 0,void 0,(function(){return _(this,(function(t){switch(t.label){case 0:return[4,C.where("userUid","==",e).get()];case 1:return[2,t.sent().docs.map((function(e){return e.data()})).map((function(e){return{userUid:e.userUid,cardUid:e.cardUid,nativeLanguageValue:e.nativeLanguageValue,languageToLearnValue:e.languageToLearnValue}}))]}}))}))},N=function(e){var t=(0,i.k6)(),n=(0,r.useState)(""),a=n[0],o=n[1],l=(0,r.useState)(""),c=l[0],s=l[1],d=(0,r.useState)(""),f=d[0],v=d[1],g=(0,r.useState)(""),_=g[0],b=g[1],E=(0,r.useState)(!1),y=E[0],C=E[1],w=(0,r.useState)({title:"",body:""}),N=w[0],z=w[1];return r.createElement("div",{className:"Component_SignUp"},r.createElement("div",{className:"Component_SignUp__titleWrapper"},r.createElement("div",{className:"Component_SignUp__title"},"Quizz App")),r.createElement("div",{className:"Component_SignUp__contentWrapper"},r.createElement("div",{className:"Component_SignUp__subtitle"},"Sign up"),r.createElement("div",{className:"Component_SignUp__inputsWrapper"},r.createElement(m,{label:"E-mail address",value:a,setValue:o}),r.createElement(m,{label:"Password",value:c,setValue:s}),r.createElement(m,{label:"Native language",value:f,setValue:v}),r.createElement(m,{label:"Studied language",value:_,setValue:b})),r.createElement(u,{color:"yellow",onClick:function(){(function(e,t){return h.createUserWithEmailAndPassword(e,t)})(a,c).then((function(e){S({userUid:e.user.uid,email:a,nativeLanguage:f,languageToLearn:_}).then((function(){C(!0),z({title:"Success",body:"Your account successfully got created."})})).catch((function(e){console.log("error saveUser",e),C(!0),z({title:"Error",body:"Your account couldn't get created."})}))})).catch((function(e){console.log("error registerWithEmailAndPassword",e),C(!0),"auth/email-already-in-use"===e.code?z({title:"Error",body:"An account already exists for this e-mail address."}):"auth/weak-password"===e.code?z({title:"Error",body:"Your password should contain at least 6 characters."}):z({title:"Error",body:"Your account creation failed."})}))}},"Register"),r.createElement("div",{className:"Component_SignUp__linkWrapper"},r.createElement("div",{className:"Component_SignUp__link",onClick:function(){return t.push("/sign-in")}},"Sign in")),r.createElement(p,{visible:y,setVisible:C,title:N.title},N.body)))},z=n(2505),T=n(2769),k=n(4695),L=(0,T.Z)("setUser"),A=(0,k.Z)(((b={}).setUser=function(e,t){return t.payload},b),null),I=(0,z.UY)({user:A}),U=function(e){var t=(0,i.k6)(),n=(0,l.I0)(),a=(0,r.useState)(""),o=a[0],c=a[1],s=(0,r.useState)(""),d=s[0],p=s[1];return r.createElement("div",{className:"Component_SignIn"},r.createElement("div",{className:"Component_SignIn__titleWrapper"},r.createElement("div",{className:"Component_SignIn__title"},"Quizz App")),r.createElement("div",{className:"Component_SignIn__contentWrapper"},r.createElement("div",{className:"Component_SignIn__subtitle"},"Sign in"),r.createElement("div",{className:"Component_SignIn__inputsWrapper"},r.createElement(m,{label:"E-mail address",value:o,setValue:c}),r.createElement(m,{label:"Password",value:d,setValue:p})),r.createElement(u,{color:"yellow",onClick:function(){(function(e,t){return h.signInWithEmailAndPassword(e,t)})(o,d).then((function(e){console.log("response loginWithEmailAndPassword",e),null!==e.user&&function(e){var t;(t=e.user.uid,g(void 0,void 0,void 0,(function(){var e;return _(this,(function(n){switch(n.label){case 0:return[4,y.doc(t).get()];case 1:return[4,n.sent().data()];case 2:if(void 0!==(e=n.sent()))return[2,{userUid:e.userUid,email:e.email,nativeLanguage:e.nativeLanguage,languageToLearn:e.languageToLearn}];throw new Error}}))}))).then((function(e){void 0!==e&&n(L(e))})).catch((function(e){console.error("error getUserFirebaseData",e)}))}(e)})).catch((function(e){console.log("error loginWithEmailAndPassword",e)}))}},"Log in"),r.createElement("div",{className:"Component_SignIn__linkWrapper"},r.createElement("div",{className:"Component_SignIn__link",onClick:function(){return t.push("/sign-up")}},"Sign up"))))},x=n(4158);function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function V(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return W(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?W(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function P(){var e=V(function(){var e,t,n=(e=(0,r.useState)(null),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=n[0],o=n[1];return[a,(0,r.useCallback)((function(e){o(e)}),[])]}(),2),t=e[0],n=e[1],a=V((0,r.useState)({}),2),o=a[0],l=a[1];return(0,r.useLayoutEffect)((function(){var e=new x.Z((function(e){var t=V(e,1)[0];l({height:t.contentRect.height,width:t.contentRect.width})}));return t&&e.observe(t),function(){e.disconnect()}}),[t]),{bounds:o,ref:n}}var j=n(5311),Q=n(9846),M=function(e){var t=(0,l.v9)((function(e){return e.user})),n=(0,r.useState)(""),a=n[0],o=n[1],i=(0,r.useState)(""),c=i[0],s=i[1],d=(0,r.useState)(!1),f=d[0],b=d[1],h=(0,r.useState)({title:"",body:""}),E=h[0],y=h[1];return r.createElement(j.E.div,{className:"Component_Form"},r.createElement("div",{className:"Component_Form__contentWrapper"},r.createElement("div",{className:"Component_Form__instruction"},"New quizz card"),r.createElement(m,{label:t.nativeLanguage+" word",value:a,setValue:o}),r.createElement(m,{label:t.languageToLearn+" translation",value:c,setValue:s}),r.createElement(u,{color:"yellow",onClick:function(){if(""===a)b(!0),y({title:"Error",body:"Please enter the "+t.nativeLanguage+" word."});else if(""===c)b(!0),y({title:"Error",body:"Please enter the "+t.languageToLearn+" translation."});else{var e={userUid:t.userUid,cardUid:(0,Q.v4)(),nativeLanguageValue:a,languageToLearnValue:c};(n=e,g(void 0,void 0,void 0,(function(){return _(this,(function(e){return[2,C.doc(n.cardUid).set(v({},n))]}))}))).then((function(e){console.log("response createSpanishData",e),b(!0),y({title:"Success",body:"Your card has been successfully added to the database !"}),o(""),s("")})).catch((function(e){console.log("error createSpanishData",e),b(!0),y({title:"Error",body:"Your card couldn't get added to the database."})}))}var n}},"Save"),r.createElement(p,{visible:f,setVisible:b,title:E.title},E.body)))},Z=function(e){return r.createElement("div",{className:"Component_AppHeader"},r.createElement("span",{className:"Component_AppHeader__name"},"Quizz App"))},q=function(e){return r.createElement("div",{className:"Component_FormTab"},r.createElement(Z,null),r.createElement(i.rs,null,r.createElement(i.AW,{path:"/app-content",render:function(){return r.createElement(M,null)},exact:!0})))},F=function(e){return r.createElement(j.E.div,{className:"Component_TabsPager"},r.createElement(j.E.div,{className:"Component_TabsPager__pagerAnimatedContainer",transition:{tension:190,friction:70,mass:.4},initial:!1,animate:{x:-100*e.value+"%"}},r.Children.map(e.children,(function(t,n){return r.createElement("div",{className:"Component_TabsPager__page",key:n,"aria-hidden":e.value!==n,tabIndex:e.value===n?0:-1},t)}))))},Y=function(e){var t=(0,l.v9)((function(e){return e.user})),n=(0,r.useState)([]),a=n[0],o=n[1],i=(0,r.useState)("0"),c=i[0],s=i[1],d=(0,r.useState)(0),f=d[0],v=d[1],g=(0,r.useState)(!1),_=g[0],b=g[1],h=(0,r.useState)(!1),E=h[0],y=h[1],C=(0,r.useState)({title:"",body:""}),S=C[0],N=C[1];return r.createElement(j.E.div,{className:"Component_Quizz"},r.createElement("div",{className:"Component_Quizz__contentWrapper"},r.createElement("div",{className:"Component_Quizz__instruction"},"Quizz"),a.length>0&&r.createElement("div",{className:"Component_Quizz__card"},r.createElement("div",{className:_?"Component_Quizz__cardContent Component_Quizz__spanish":"Component_Quizz__cardContent"},!_&&a[f].nativeLanguageValue,_&&a[f].languageToLearnValue)),0===a.length?r.createElement("div",{className:"Component_Quizz__startingForm"},r.createElement(m,{label:"Number of questions",value:c,setValue:s}),r.createElement(u,{color:"yellow",onClick:function(){"0"===c?(y(!0),N({title:"Error",body:"Please define a number of questions higher than 0."})):w(t.userUid).then((function(e){if(Number(c)>e.length)y(!0),N({title:"Error",body:"Please choose a number of questions below or equal to "+e.length+" (the total number of cards you have created so far)."});else{var t=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var o=arguments[t],l=0,i=o.length;l<i;l++,a++)r[a]=o[l];return r}(e),n=[],r=[];do{var a=Math.floor(t.length*Math.random());r.includes(a)||(n.push(t[a]),r.push(a))}while(n.length<parseInt(c));o(n)}})).catch((function(e){console.log("error getAllCardsOfUser Quizz",e)}))}},"Start")):r.createElement("div",{className:"Component_Quizz__buttonsWrapper"},r.createElement("div",{className:"Component_Quizz__buttonWrapper"},r.createElement(u,{color:"orange",onClick:function(){return b(!_)}},_?"See question":"See answer")),r.createElement("div",{className:"Component_Quizz__buttonWrapper"},r.createElement(u,{color:"yellow",onClick:function(){b(!1),f+1===a.length?(v(0),o([])):v(f+1)}},"Next"))),r.createElement(p,{visible:E,setVisible:y,title:S.title},S.body)))},B=function(e){return r.createElement("div",null,r.createElement(Z,null),r.createElement(Y,null))},R=function(e){var t=(0,l.v9)((function(e){return e.user})),n=(0,l.I0)(),a=(0,r.useState)([]),o=a[0],i=a[1],c=(0,r.useState)(t.nativeLanguage),s=c[0],d=c[1],f=(0,r.useState)(t.languageToLearn),v=f[0],g=f[1],_=(0,r.useState)(!1),b=_[0],E=_[1],y=(0,r.useState)({title:"",body:""}),C=y[0],N=y[1];return(0,r.useEffect)((function(){w(t.userUid).then((function(e){i(e)})).catch((function(e){console.log("error getAllCardsOfUser Settings",e)}))}),[]),r.createElement(j.E.div,{className:"Component_Settings"},r.createElement("div",{className:"Component_Settings__contentWrapper"},r.createElement("div",{className:"Component_Settings__instruction"},"Settings"),r.createElement("div",{className:"Component_Settings__label"},"E-mail address"),r.createElement("div",{className:"Component_Settings__text"},t.email),r.createElement("div",{className:"Component_Settings__label"},"Number of cards created"),r.createElement("div",{className:"Component_Settings__text"},o.length),r.createElement(m,{label:"Native language",value:s,setValue:d}),r.createElement(m,{label:"Studied language",value:v,setValue:g}),r.createElement(u,{color:"yellow",onClick:function(){var e={userUid:t.userUid,email:t.email,nativeLanguage:s,languageToLearn:v};S(e).then((function(){n(L(e)),E(!0),N({title:"Success",body:"The user data got saved."})})).catch((function(e){console.error("error saveUser Settings",e),E(!0),N({title:"Error",body:"The user data couldn't get saved."})}))}},"Save"),r.createElement(u,{color:"orange",onClick:function(){n(L(null)),h.signOut().catch((function(e){return console.error("error signOut",e)}))}},"Sign out")),r.createElement(p,{visible:b,setVisible:E,title:C.title},C.body))},D=function(e){return r.createElement("div",null,r.createElement(Z,null),r.createElement(R,null))},H=function(e){var t=(0,r.useState)(0),n=t[0],a=t[1],o=(0,r.useRef)(new Map),l=(0,r.useRef)(null),i=P(),c=i.bounds,u=i.ref;return(0,r.useEffect)((function(){var e=o.current.get(n),t=l.current;!e||t.getBoundingClientRect().width}),[n,c]),r.createElement("div",{className:"Component_TabsList"},r.createElement("div",{className:"Component_TabsList__tabContainer",ref:u},r.createElement("div",{className:"Component_TabsList__backgroundLine"},0===n?r.createElement(j.E.div,{className:"Component_TabsList__line",initial:{x:"100%"},animate:{x:0},transition:{duration:.3}}):1===n?r.createElement(j.E.div,{className:"Component_TabsList__line",initial:{x:0},animate:{x:"100%"},transition:{duration:.3}}):r.createElement(j.E.div,{className:"Component_TabsList__line",initial:{x:0},animate:{x:"200%"},transition:{duration:.3}})),r.createElement("div",{className:"Component_TabsList__tabList",ref:l},r.createElement(j.E.div,{className:0===n?"Component_TabsList__tabItem Component_TabsList__tabItem__active":"Component_TabsList__tabItem",whileHover:{backgroundColor:"#f1f3f5"},transition:{duration:.1},whileTap:{backgroundColor:"#e9ecef"},ref:function(e){return o.current.set(0,e)},onClick:function(){return a(0)}},r.createElement("div",null,"Form")),r.createElement(j.E.div,{className:1===n?"Component_TabsList__tabItem Component_TabsList__tabItem__active":"Component_TabsList__tabItem",whileHover:{backgroundColor:"#f1f3f5"},transition:{duration:.1},whileTap:{backgroundColor:"#e9ecef"},ref:function(e){return o.current.set(1,e)},onClick:function(){return a(1)}},r.createElement("div",null,"Quizz")),r.createElement(j.E.div,{className:2===n?"Component_TabsList__tabItem Component_TabsList__tabItem__active":"Component_TabsList__tabItem",whileHover:{backgroundColor:"#f1f3f5"},transition:{duration:.1},whileTap:{backgroundColor:"#e9ecef"},ref:function(e){return o.current.set(2,e)},onClick:function(){return a(2)}},r.createElement("div",null,"Settings")))),r.createElement(F,{value:n},r.createElement(q,null),r.createElement(B,null),r.createElement(D,null)))};const G=n.p+"img/34e28534aea3ac37bb977cb32e984313.jpg";var K,$=function(){return($=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},J=n(2129),X=(K=function(e,t){return(K=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}K(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),ee=function(e){function t(t){var n=e.call(this,t)||this;return n.state={hasError:!1},n}return X(t,e),t.prototype.componentDidCatch=function(e,t){this.setState({hasError:!0})},t.prototype.render=function(){return this.state.hasError?r.createElement("div",{className:"error-page"},r.createElement(J.ZP,{status:"error",title:"Une erreur est survenue",subTitle:r.createElement("span",null,"Vous pouvez tenter d'actualiser la page ou de revenir à l'",r.createElement("a",{href:"/"},"Accueil"),".")})):this.props.children},t}(r.Component),te=n(3916),ne=n(5762),re=n(6668),ae={namespace:"quizzApp",states:["user"]},oe=[te.Z,(0,ne.a1)(ae)];n(4338),(0,o.render)(r.createElement(ee,null,r.createElement(a.VK,null,r.createElement(l.zt,{store:(0,z.MT)(I,(0,ne.zD)(ae),(0,re.Uo)(z.md.apply(void 0,oe)))},r.createElement((function(){var e=(0,l.v9)((function(e){return e.user}));console.log("user",e);var t,n=function(t){return function(n){return null!==e?r.createElement(i.l_,{to:"/app-content"}):r.createElement(t,$({},n))}};return r.createElement("div",{className:"Component_App",style:{backgroundImage:"url("+G+")"}},r.createElement(i.rs,null,r.createElement(i.AW,{path:"/sign-up",render:n(N),exact:!0}),r.createElement(i.AW,{path:"/sign-in",render:n(U),exact:!0}),r.createElement(i.AW,{path:"/app-content",render:(t=H,function(n){return null===e?r.createElement(i.l_,{to:"/sign-in"}):r.createElement(t,$({},n))}),exact:!0}),r.createElement(i.AW,{path:"/",exact:!0,render:function(t){return null===e?r.createElement(i.l_,{to:"/sign-in"}):r.createElement(i.l_,{to:"/app-content"})}})))}),null)))),document.getElementById("body"))}},t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.m=e,n.x=e=>{},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={179:0},t=[[3371,673]],r=e=>{},a=(a,o)=>{for(var l,i,[c,u,s,m]=o,d=0,p=[];d<c.length;d++)i=c[d],n.o(e,i)&&e[i]&&p.push(e[i][0]),e[i]=0;for(l in u)n.o(u,l)&&(n.m[l]=u[l]);for(s&&s(n),a&&a(o);p.length;)p.shift()();return m&&t.push.apply(t,m),r()},o=self.webpackChunkQuizzApp=self.webpackChunkQuizzApp||[];function l(){for(var r,a=0;a<t.length;a++){for(var o=t[a],l=!0,i=1;i<o.length;i++){var c=o[i];0!==e[c]&&(l=!1)}l&&(t.splice(a--,1),r=n(n.s=o[0]))}return 0===t.length&&(n.x(),n.x=e=>{}),r}o.forEach(a.bind(null,0)),o.push=a.bind(null,o.push.bind(o));var i=n.x;n.x=()=>(n.x=i||(e=>{}),(r=l)())})(),n.x()})();