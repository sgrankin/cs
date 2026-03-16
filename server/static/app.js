var gr=Object.defineProperty;var vr=Object.getOwnPropertyDescriptor;var l=(t,e,r,o)=>{for(var s=o>1?void 0:o?vr(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&gr(e,r,s),s};var Oe=globalThis,Te=Oe.ShadowRoot&&(Oe.ShadyCSS===void 0||Oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ye=Symbol(),Ct=new WeakMap,de=class{constructor(e,r,o){if(this._$cssResult$=!0,o!==Ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(Te&&e===void 0){let o=r!==void 0&&r.length===1;o&&(e=Ct.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Ct.set(r,e))}return e}toString(){return this.cssText}},Ot=t=>new de(typeof t=="string"?t:t+"",void 0,Ye),m=(t,...e)=>{let r=t.length===1?t[0]:e.reduce(((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new de(r,t,Ye)},Tt=(t,e)=>{if(Te)t.adoptedStyleSheets=e.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of e){let o=document.createElement("style"),s=Oe.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,t.appendChild(o)}},et=Te?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let o of e.cssRules)r+=o.cssText;return Ot(r)})(t):t;var{is:br,defineProperty:xr,getOwnPropertyDescriptor:yr,getOwnPropertyNames:$r,getOwnPropertySymbols:_r,getPrototypeOf:wr}=Object,Ne=globalThis,Nt=Ne.trustedTypes,Sr=Nt?Nt.emptyScript:"",Er=Ne.reactiveElementPolyfillSupport,pe=(t,e)=>t,ue={toAttribute(t,e){switch(e){case Boolean:t=t?Sr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Pe=(t,e)=>!br(t,e),Pt={attribute:!0,type:String,converter:ue,reflect:!1,useDefault:!1,hasChanged:Pe};Symbol.metadata??=Symbol("metadata"),Ne.litPropertyMetadata??=new WeakMap;var I=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Pt){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,r);s!==void 0&&xr(this.prototype,e,s)}}static getPropertyDescriptor(e,r,o){let{get:s,set:i}=yr(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:s,set(n){let u=s?.call(this);i?.call(this,n),this.requestUpdate(e,u,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Pt}static _$Ei(){if(this.hasOwnProperty(pe("elementProperties")))return;let e=wr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(pe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pe("properties"))){let r=this.properties,o=[...$r(r),..._r(r)];for(let s of o)this.createProperty(s,r[s])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)r.unshift(et(s))}else e!==void 0&&r.push(et(e));return r}static _$Eu(e,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Tt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,r,o){this._$AK(e,o)}_$ET(e,r){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:ue).toAttribute(r,o.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,r){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ue;this._$Em=s;let u=n.fromAttribute(r,i.type);this[s]=u??this._$Ej?.get(s)??u,this._$Em=null}}requestUpdate(e,r,o){if(e!==void 0){let s=this.constructor,i=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??Pe)(i,r)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,u=this[s];n!==!0||this._$AL.has(s)||u===void 0||this.C(s,void 0,i,u)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[pe("elementProperties")]=new Map,I[pe("finalized")]=new Map,Er?.({ReactiveElement:I}),(Ne.reactiveElementVersions??=[]).push("2.1.1");var rt=globalThis,Re=rt.trustedTypes,Rt=Re?Re.createPolicy("lit-html",{createHTML:t=>t}):void 0,ot="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+L,Ar=`<${st}>`,Q=document,fe=()=>Q.createComment(""),me=t=>t===null||typeof t!="object"&&typeof t!="function",it=Array.isArray,qt=t=>it(t)||typeof t?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,It=/-->/g,Lt=/>/g,G=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mt=/'/g,Ut=/"/g,Wt=/^(?:script|style|textarea|title)$/i,nt=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=nt(1),zt=nt(2),bo=nt(3),M=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Dt=new WeakMap,K=Q.createTreeWalker(Q,129);function Ht(t,e){if(!it(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Rt!==void 0?Rt.createHTML(e):e}var jt=(t,e)=>{let r=t.length-1,o=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=he;for(let u=0;u<r;u++){let a=t[u],p,h,c=-1,E=0;for(;E<a.length&&(n.lastIndex=E,h=n.exec(a),h!==null);)E=n.lastIndex,n===he?h[1]==="!--"?n=It:h[1]!==void 0?n=Lt:h[2]!==void 0?(Wt.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=G):h[3]!==void 0&&(n=G):n===G?h[0]===">"?(n=s??he,c=-1):h[1]===void 0?c=-2:(c=n.lastIndex-h[2].length,p=h[1],n=h[3]===void 0?G:h[3]==='"'?Ut:Mt):n===Ut||n===Mt?n=G:n===It||n===Lt?n=he:(n=G,s=void 0);let v=n===G&&t[u+1].startsWith("/>")?" ":"";i+=n===he?a+Ar:c>=0?(o.push(p),a.slice(0,c)+ot+a.slice(c)+L+v):a+L+(c===-2?u:v)}return[Ht(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ge=class t{constructor({strings:e,_$litType$:r},o){let s;this.parts=[];let i=0,n=0,u=e.length-1,a=this.parts,[p,h]=jt(e,r);if(this.el=t.createElement(p,o),K.currentNode=this.el.content,r===2||r===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=K.nextNode())!==null&&a.length<u;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(ot)){let E=h[n++],v=s.getAttribute(c).split(L),y=/([.?@])?(.*)/.exec(E);a.push({type:1,index:i,name:y[2],strings:v,ctor:y[1]==="."?Le:y[1]==="?"?Me:y[1]==="@"?Ue:J}),s.removeAttribute(c)}else c.startsWith(L)&&(a.push({type:6,index:i}),s.removeAttribute(c));if(Wt.test(s.tagName)){let c=s.textContent.split(L),E=c.length-1;if(E>0){s.textContent=Re?Re.emptyScript:"";for(let v=0;v<E;v++)s.append(c[v],fe()),K.nextNode(),a.push({type:2,index:++i});s.append(c[E],fe())}}}else if(s.nodeType===8)if(s.data===st)a.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(L,c+1))!==-1;)a.push({type:7,index:i}),c+=L.length-1}i++}}static createElement(e,r){let o=Q.createElement("template");return o.innerHTML=e,o}};function V(t,e,r=t,o){if(e===M)return e;let s=o!==void 0?r._$Co?.[o]:r._$Cl,i=me(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(e=V(t,s._$AS(t,e.values),s,o)),e}var Ie=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:o}=this._$AD,s=(e?.creationScope??Q).importNode(r,!0);K.currentNode=s;let i=K.nextNode(),n=0,u=0,a=o[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new ee(i,i.nextSibling,this,e):a.type===1?p=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(p=new De(i,this,e)),this._$AV.push(p),a=o[++u]}n!==a?.index&&(i=K.nextNode(),n++)}return K.currentNode=Q,s}p(e){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,r),r+=o.strings.length-2):o._$AI(e[r])),r++}},ee=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,s){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=V(this,e,r),me(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&me(this._$AH)?this._$AA.nextSibling.data=e:this.T(Q.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ge.createElement(Ht(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new Ie(s,this),n=i.u(this.options);i.p(r),this.T(n),this._$AH=i}}_$AC(e){let r=Dt.get(e.strings);return r===void 0&&Dt.set(e.strings,r=new ge(e)),r}k(e){it(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let i of e)s===r.length?r.push(o=new t(this.O(fe()),this.O(fe()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,o,s,i){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=S}_$AI(e,r=this,o,s){let i=this.strings,n=!1;if(i===void 0)e=V(this,e,r,0),n=!me(e)||e!==this._$AH&&e!==M,n&&(this._$AH=e);else{let u=e,a,p;for(e=i[0],a=0;a<i.length-1;a++)p=V(this,u[o+a],r,a),p===M&&(p=this._$AH[a]),n||=!me(p)||p!==this._$AH[a],p===S?e=S:e!==S&&(e+=(p??"")+i[a+1]),this._$AH[a]=p}n&&!s&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Le=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}},Me=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}},Ue=class extends J{constructor(e,r,o,s,i){super(e,r,o,s,i),this.type=5}_$AI(e,r=this){if((e=V(this,e,r,0)??S)===M)return;let o=this._$AH,s=e===S&&o!==S||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==S&&(o===S||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},De=class{constructor(e,r,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}},Ft={M:ot,P:L,A:st,C:1,L:jt,R:Ie,D:qt,V,I:ee,H:J,N:Me,U:Ue,B:Le,F:De},kr=rt.litHtmlPolyfillSupport;kr?.(ge,ee),(rt.litHtmlVersions??=[]).push("3.3.1");var Bt=(t,e,r)=>{let o=r?.renderBefore??e,s=o._$litPart$;if(s===void 0){let i=r?.renderBefore??null;o._$litPart$=s=new ee(e.insertBefore(fe(),i),i,void 0,r??{})}return s._$AI(t),s};var at=globalThis,b=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Bt(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};b._$litElement$=!0,b.finalized=!0,at.litElementHydrateSupport?.({LitElement:b});var Cr=at.litElementPolyfillSupport;Cr?.({LitElement:b});(at.litElementVersions??=[]).push("4.2.1");var x=t=>(e,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var Or={attribute:!0,type:String,converter:ue,reflect:!1,hasChanged:Pe},Tr=(t=Or,e,r)=>{let{kind:o,metadata:s}=r,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){let{name:n}=r;return{set(u){let a=e.get.call(this);e.set.call(this,u),this.requestUpdate(n,a,t)},init(u){return u!==void 0&&this.C(n,void 0,t,u),u}}}if(o==="setter"){let{name:n}=r;return function(u){let a=this[n];e.call(this,u),this.requestUpdate(n,a,t)}}throw Error("Unsupported decorator location: "+o)};function f(t){return(e,r)=>typeof r=="object"?Tr(t,e,r):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}function O(t){return f({...t,state:!0,attribute:!1})}var Nr=Object.defineProperty,Pr=(t,e,r)=>e in t?Nr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,lt=(t,e,r)=>(Pr(t,typeof e!="symbol"?e+"":e,r),r),Rr=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},ct=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},We=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},Gt=(t,e,r)=>(Rr(t,e,"access private method"),r);function Kt(t,e){return Object.is(t,e)}var A=null,ve=!1,ze=1,He=Symbol("SIGNAL");function te(t){let e=A;return A=t,e}function Ir(){return A}function Lr(){return ve}var ft={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function je(t){if(ve)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(A===null)return;A.consumerOnSignalRead(t);let e=A.nextProducerIndex++;if(re(A),e<A.producerNode.length&&A.producerNode[e]!==t&&ut(A)){let r=A.producerNode[e];Fe(r,A.producerIndexOfThis[e])}A.producerNode[e]!==t&&(A.producerNode[e]=t,A.producerIndexOfThis[e]=ut(A)?Jt(t,A,e):0),A.producerLastReadVersion[e]=t.version}function Mr(){ze++}function Qt(t){if(!(!t.dirty&&t.lastCleanEpoch===ze)){if(!t.producerMustRecompute(t)&&!zr(t)){t.dirty=!1,t.lastCleanEpoch=ze;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=ze}}function Vt(t){if(t.liveConsumerNode===void 0)return;let e=ve;ve=!0;try{for(let r of t.liveConsumerNode)r.dirty||Dr(r)}finally{ve=e}}function Ur(){return A?.consumerAllowSignalWrites!==!1}function Dr(t){var e;t.dirty=!0,Vt(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function qr(t){return t&&(t.nextProducerIndex=0),te(t)}function Wr(t,e){if(te(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(ut(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)Fe(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function zr(t){re(t);for(let e=0;e<t.producerNode.length;e++){let r=t.producerNode[e],o=t.producerLastReadVersion[e];if(o!==r.version||(Qt(r),o!==r.version))return!0}return!1}function Jt(t,e,r){var o;if(mt(t),re(t),t.liveConsumerNode.length===0){(o=t.watched)==null||o.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)t.producerIndexOfThis[s]=Jt(t.producerNode[s],t,s)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(e)-1}function Fe(t,e){var r;if(mt(t),re(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(r=t.unwatched)==null||r.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)Fe(t.producerNode[s],t.producerIndexOfThis[s])}let o=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[o],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[o],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let s=t.liveConsumerIndexOfThis[e],i=t.liveConsumerNode[e];re(i),i.producerIndexOfThis[s]=e}}function ut(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function re(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function mt(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function Zt(t){if(Qt(t),je(t),t.value===ht)throw t.error;return t.value}function Hr(t){let e=Object.create(jr);e.computation=t;let r=()=>Zt(e);return r[He]=e,r}var dt=Symbol("UNSET"),pt=Symbol("COMPUTING"),ht=Symbol("ERRORED"),jr={...ft,value:dt,dirty:!0,error:null,equal:Kt,producerMustRecompute(t){return t.value===dt||t.value===pt},producerRecomputeValue(t){if(t.value===pt)throw new Error("Detected cycle in computations.");let e=t.value;t.value=pt;let r=qr(t),o,s=!1;try{o=t.computation.call(t.wrapper),s=e!==dt&&e!==ht&&t.equal.call(t.wrapper,e,o)}catch(i){o=ht,t.error=i}finally{Wr(t,r)}if(s){t.value=e;return}t.value=o,t.version++}};function Fr(){throw new Error}var Br=Fr;function Gr(){Br()}function Kr(t){let e=Object.create(Jr);e.value=t;let r=()=>(je(e),e.value);return r[He]=e,r}function Qr(){return je(this),this.value}function Vr(t,e){Ur()||Gr(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,Zr(t))}var Jr={...ft,equal:Kt,value:void 0};function Zr(t){t.version++,Mr(),Vt(t)}var k=Symbol("node"),_;(t=>{var e,r,o,s,i,n;class u{constructor(h,c={}){We(this,r),lt(this,e);let v=Kr(h)[He];if(this[k]=v,v.wrapper=this,c){let y=c.equals;y&&(v.equal=y),v.watched=c[t.subtle.watched],v.unwatched=c[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Qr.call(this[k])}set(h){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Lr())throw new Error("Writes to signals not permitted during Watcher callback");let c=this[k];Vr(c,h)}}e=k,r=new WeakSet,o=function(){},t.isState=p=>typeof p=="object"&&ct(r,p),t.State=u;class a{constructor(h,c){We(this,i),lt(this,s);let v=Hr(h)[He];if(v.consumerAllowSignalWrites=!0,this[k]=v,v.wrapper=this,c){let y=c.equals;y&&(v.equal=y),v.watched=c[t.subtle.watched],v.unwatched=c[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Zt(this[k])}}s=k,i=new WeakSet,n=function(){},t.isComputed=p=>typeof p=="object"&&ct(i,p),t.Computed=a,(p=>{var h,c,E,v,y;function B(w){let $,g=null;try{g=te(null),$=w()}finally{te(g)}return $}p.untrack=B;function z(w){var $;if(!(0,t.isComputed)(w)&&!(0,t.isWatcher)(w))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(($=w[k].producerNode)==null?void 0:$.map(g=>g.wrapper))??[]}p.introspectSources=z;function Ze(w){var $;if(!(0,t.isComputed)(w)&&!(0,t.isState)(w))throw new TypeError("Called introspectSinks without a Signal argument");return(($=w[k].liveConsumerNode)==null?void 0:$.map(g=>g.wrapper))??[]}p.introspectSinks=Ze;function Xe(w){if(!(0,t.isComputed)(w)&&!(0,t.isState)(w))throw new TypeError("Called hasSinks without a Signal argument");let $=w[k].liveConsumerNode;return $?$.length>0:!1}p.hasSinks=Xe;function ur(w){if(!(0,t.isComputed)(w)&&!(0,t.isWatcher)(w))throw new TypeError("Called hasSources without a Computed or Watcher argument");let $=w[k].producerNode;return $?$.length>0:!1}p.hasSources=ur;class hr{constructor($){We(this,c),We(this,v),lt(this,h);let g=Object.create(ft);g.wrapper=this,g.consumerMarkedDirty=$,g.consumerIsAlwaysLive=!0,g.consumerAllowSignalWrites=!1,g.producerNode=[],this[k]=g}watch(...$){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Gt(this,v,y).call(this,$);let g=this[k];g.dirty=!1;let C=te(g);for(let Ce of $)je(Ce[k]);te(C)}unwatch(...$){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Gt(this,v,y).call(this,$);let g=this[k];re(g);for(let C=g.producerNode.length-1;C>=0;C--)if($.includes(g.producerNode[C].wrapper)){Fe(g.producerNode[C],g.producerIndexOfThis[C]);let Ce=g.producerNode.length-1;if(g.producerNode[C]=g.producerNode[Ce],g.producerIndexOfThis[C]=g.producerIndexOfThis[Ce],g.producerNode.length--,g.producerIndexOfThis.length--,g.nextProducerIndex--,C<g.producerNode.length){let mr=g.producerIndexOfThis[C],kt=g.producerNode[C];mt(kt),kt.liveConsumerIndexOfThis[mr]=C}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[k].producerNode.filter(g=>g.dirty).map(g=>g.wrapper)}}h=k,c=new WeakSet,E=function(){},v=new WeakSet,y=function(w){for(let $ of w)if(!(0,t.isComputed)($)&&!(0,t.isState)($))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=w=>ct(c,w),p.Watcher=hr;function fr(){var w;return(w=Ir())==null?void 0:w.wrapper}p.currentComputed=fr,p.watched=Symbol("watched"),p.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(_||(_={}));var gt=!1,Xt=new _.subtle.Watcher(()=>{gt||(gt=!0,queueMicrotask(()=>{gt=!1;for(let t of Xt.getPending())t.get();Xt.watch()}))}),Xr=Symbol("SignalWatcherBrand"),Yr=new FinalizationRegistry(t=>{t.unwatch(..._.subtle.introspectSources(t))}),Yt=new WeakMap;function be(t){return t[Xr]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new _.State(0),this._$Si=!1}_$Sl(){var e,r;let o=[],s=[];this._$St.forEach((n,u)=>{(n?.beforeUpdate?o:s).push(u)});let i=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));o.forEach(n=>n.get()),(r=this._$Su)===null||r===void 0||r.get(),i.forEach(n=>n.get()),s.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new _.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new _.subtle.Watcher(function(){let r=Yt.get(this);r!==void 0&&(r._$Si===!1&&(new Set(this.getPending()).has(r._$Su)?r.requestUpdate():r._$Sv()),this.watch())});Yt.set(e,this),Yr.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([r])=>r))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(..._.subtle.introspectSources(this.h).filter(r=>{var o;let s=((o=this._$St.get(r))===null||o===void 0?void 0:o.manualDispose)!==!0;return s&&this._$St.delete(r),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,r){var o;this._$S_();let s=new _.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,r),(o=r?.beforeUpdate)!==null&&o!==void 0&&o?_.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>_.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var Be={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},xe=t=>(...e)=>({_$litDirective$:t,values:e}),oe=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,o){this._$Ct=e,this._$AM=r,this._$Ci=o}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var{I:us}=Ft;var er=t=>t.strings===void 0;var ye=(t,e)=>{let r=t._$AN;if(r===void 0)return!1;for(let o of r)o._$AO?.(e,!1),ye(o,e);return!0},Ge=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while(r?.size===0)},tr=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),ro(e)}};function eo(t){this._$AN!==void 0?(Ge(this),this._$AM=t,tr(this)):this._$AM=t}function to(t,e=!1,r=0){let o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let i=r;i<o.length;i++)ye(o[i],!1),Ge(o[i]);else o!=null&&(ye(o,!1),Ge(o));else ye(this,t)}var ro=t=>{t.type==Be.CHILD&&(t._$AP??=to,t._$AQ??=eo)},Ke=class extends oe{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,o){super._$AT(e,r,o),tr(this),this.isConnected=e._$AU}_$AO(e,r=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),r&&(ye(this,e),Ge(this))}setValue(e){if(er(this._$Ct))this._$Ct._$AI(e,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};var vt=!1,bt=new _.subtle.Watcher(async()=>{vt||(vt=!0,queueMicrotask(()=>{vt=!1;for(let t of bt.getPending())t.get();bt.watch()}))}),Qe=class extends Ke{_$S_(){var e,r;this._$Sm===void 0&&(this._$Sj=new _.Computed(()=>{var o;let s=(o=this._$SW)===null||o===void 0?void 0:o.get();return this.setValue(s),s}),this._$Sm=(r=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&r!==void 0?r:bt,this._$Sm.watch(this._$Sj),_.subtle.untrack(()=>{var o;return(o=this._$Sj)===null||o===void 0?void 0:o.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return _.subtle.untrack(()=>e.get())}update(e,[r]){var o,s;return(o=this._$Sk)!==null&&o!==void 0||(this._$Sk=(s=e.options)===null||s===void 0?void 0:s.host),r!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=r,this._$S_(),_.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},xt=xe(Qe);var yt=t=>(e,...r)=>t(e,...r.map(o=>o instanceof _.State||o instanceof _.Computed?xt(o):o)),oo=yt(d),so=yt(zt);var Ns=_.State,Ps=_.Computed,N=(t,e)=>new _.State(t,e),se=(t,e)=>new _.Computed(t,e);var io=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function rr(t,e=""){for(let{pattern:r,name:o}of io){let s=r.exec(t);if(s)return{name:o,path:s[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var U=N(rr(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{U.set(rr(window.location.pathname,window.location.search))});var zs=m`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,H=m`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Hs=m`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,or=m`
  .result-path {
    color: var(--color-foreground-muted);
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    font-weight: normal;
  }
  .result-path .repo,
  .result-path .version {
    color: var(--color-foreground-muted);
  }
  .result-path .filename {
    font-weight: bold;
  }
`,ie=m`
  .label {
    font-weight: bold;
  }
`,sr=m`
  .tooltip-target {
    border-bottom: 1px dotted var(--color-foreground-emphasis);
    position: relative;
    cursor: help;
  }
  .tooltip {
    display: none;
    position: absolute;
    top: 20px;
    border: 1px solid var(--color-foreground-emphasis);
    border-radius: 3px;
    padding: 0px 4px;
    background-color: var(--color-background);
  }
  .tooltip-target:hover .tooltip {
    display: block;
  }
`,ir=m`
  .prefixed-input {
    width: calc(100% - 20px);
    position: relative;
  }
  .prefixed-input .prefix-label {
    position: absolute;
    top: 12px;
    color: var(--color-foreground);
    font-size: 12px;
    font-weight: bold;
  }
  .prefixed-input.filter-code .prefix-label {
    top: 14px;
  }
  .prefixed-input input[type="search"] {
    vertical-align: bottom;
    border: none;
    border-bottom: solid 2px var(--color-prefixed-input-border);
    padding: 10px 0 5px 0;
    transition: border 150ms;
    width: 100%;
    text-indent: 50px;
    background-color: transparent;
    color: inherit;
    font: inherit;
  }
  .prefixed-input input[type="search"]:hover {
    outline: none;
    border-color: var(--color-prefixed-input-border-hover);
  }
  .prefixed-input input[type="search"]:focus {
    outline: none;
    border-color: var(--color-prefixed-input-border-focus);
  }
  .prefixed-input input[type="search"]:valid {
    border-color: var(--color-prefixed-input-border-valid);
  }
  .prefixed-input input[type="search"]:valid:hover {
    border-color: var(--color-prefixed-input-border-valid-hover);
  }
  .prefixed-input input[type="search"]:valid:focus {
    border-color: var(--color-prefixed-input-border-valid-focus);
  }
`,js=m`
  .hidden {
    display: none !important;
  }
`;var no=new Set(["file","-file","path","-path","repo","-repo","tags","-tags","case","lit","max_matches"]);function _t(t){let e={},r="",o="",s="",i=t.trim(),n=/\[|\(|(?:^([a-zA-Z0-9\-_]+):|\\.)| /,u=!0;for(;i.length>0;){let p=n.exec(i);if(p===null){s+=i;break}s+=i.slice(0,p.index);let h=p[0];if(i=i.slice(p.index+h.length),u=u&&p.index===0,h===" ")o===""?s+=" ":($t(e,o,s),o="",s="");else if(h==="("||h==="["){let c=h==="("?")":"]",E=1,v=0,y=!1,B="";for(;v<i.length&&E>0;){let z=i[v];v++,y?y=!1:z==="\\"?y=!0:z===h?E++:z===c&&E--,B+=z}s+=h+B,i=i.slice(v)}else if(h.startsWith("\\"))s+=h;else{let c=p[1];o===""&&c&&no.has(c)?(s.trim()!==""&&$t(e,o,s),s="",o=c):s+=h}u=h===" "}$t(e,o,s);let a=e[""]||[];return delete e[""],r=a.join(" ").trim(),{line:r,operators:e}}function $t(t,e,r){t[e]||(t[e]=[]),t[e].push(r)}function nr(t,e={},r={}){let o=new URLSearchParams;t.trim()&&o.set("q",t.trim()),e.literal&&o.set("literal","true"),e.caseSensitive&&o.set("fold_case","false");for(let[s,i]of Object.entries(r))for(let n of i)o.append(s,n);return o}async function ar(t,e,r){let o="/api/search?"+t.toString(),s=await fetch(o,{signal:r});if(!s.ok){let i=await s.text();throw new Error(`search failed (${s.status}): ${i}`)}if(!s.body)throw new Error("response has no body");await ao(s.body,i=>{switch(i.type){case"result":e.onResult?.(i);break;case"file":e.onFile?.(i);break;case"facets":e.onFacets?.(i);break;case"done":e.onDone?.(i);break}})}async function ao(t,e){let r=t.getReader(),o=new TextDecoder,s="";try{for(;;){let{done:n,value:u}=await r.read();if(n)break;s+=o.decode(u,{stream:!0});let a;for(;(a=s.indexOf(`
`))!==-1;){let p=s.slice(0,a).trim();s=s.slice(a+1),p.length!==0&&e(JSON.parse(p))}}s+=o.decode();let i=s.trim();i.length>0&&e(JSON.parse(i))}finally{r.releaseLock()}}function lr(t){let e=t.indexOf("/+/");if(e===-1)return{repo:t,version:"",filePath:""};let r=t.slice(0,e),o=t.slice(e+3),s=r.indexOf("/");return s===-1?{repo:r,version:"",filePath:o}:{repo:r.slice(0,s),version:r.slice(s+1),filePath:o}}var ae=se(()=>U.get().params.get("q")??""),Ys=se(()=>{let t=U.get().params;return{literal:t.get("literal")==="true",caseSensitive:t.get("fold_case")==="false"}}),cr=se(()=>{let t=U.get().params.get("context");if(t!==null){let e=parseInt(t,10);if(!isNaN(e)&&e>=0)return e}return 3}),ei=se(()=>_t(ae.get())),_e=N([]),Je=N([]),we=N(null),Se=N(null),Z=N(!1),ne=N(null),St=N(!1),dr=se(()=>{let t=Je.get();return St.get()||t.length<=10?t:t.slice(0,10)}),wt=null;async function pr(){wt&&wt.abort();let t=new AbortController;wt=t;let e=ae.get();if(!e){_e.set([]),Je.set([]),we.set(null),Se.set(null),Z.set(!1),ne.set(null),St.set(!1);return}let r=U.get(),o=new URLSearchParams(r.params),s=_t(e);St.set(s.line===""),Z.set(!0),ne.set(null),_e.set([]),Je.set([]),we.set(null),Se.set(null);let i=[],n=[],u=null;try{await ar(o,{onResult(a){i.push(a)},onFile(a){n.push(a)},onFacets(a){u=a},onDone(a){_e.set(i),Je.set(n),we.set(u),Se.set(a),Z.set(!1)},onError(a){t.signal.aborted||(ne.set(a.message),Z.set(!1))}},t.signal)}catch(a){t.signal.aborted||(ne.set(a instanceof Error?a.message:String(a)),Z.set(!1))}}var Ve=null,$e="";function Et(t,e={},r={}){Ve&&clearTimeout(Ve);let o=nr(t,e,r),s=t!==$e,i=o.toString(),n="/search"+(i?"?"+i:"");s&&$e!==""?(history.pushState(null,"",n),$e=t):(history.replaceState(null,"",n),$e===""&&($e=t)),U.set({name:"search",params:o}),Ve=setTimeout(()=>{Ve=null,pr()},100)}ae.get()&&pr();var j=class extends b{constructor(){super(...arguments);this.value="";this.debounce=100;this.error="";this.timer=null}render(){return d`
      <div class="search-inputs">
        <div class="prefixed-input filter-code">
          <label class="prefix-label" for="searchbox">Query:</label>
          <input
            name="q"
            type="search"
            incremental
            id="searchbox"
            tabindex="1"
            autofocus
            .value=${this.value}
            @input=${this.onInput}
            @keydown=${this.onKeydown}
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </div>
        <div id="regex-error">
          ${this.error?d`<span id="errortext">${this.error}</span>`:S}
        </div>
        <div class="query-hint">
          Special terms:
          <code>path:</code>
          <code>-path:</code>
          <code>repo:</code>
          <code>-repo:</code>
          <code>max_matches:</code>
        </div>
      </div>
    `}onInput(){this.timer&&clearTimeout(this.timer);let r=this.renderRoot.querySelector("#searchbox");this.timer=setTimeout(()=>{this.timer=null,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:r.value},bubbles:!0,composed:!0}))},this.debounce)}onKeydown(r){if(r.key==="Enter"){this.timer&&clearTimeout(this.timer),this.timer=null;let o=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0}))}}appendQuery(r){let o=this.renderRoot.querySelector("#searchbox");o&&(o.value+=r,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};j.styles=[ir,m`
      :host {
        display: block;
      }

      #searchbox {
        font-size: 16px;
      }

      .query-hint {
        padding-top: 5px;
        font-size: 11px;
        font-style: italic;
        color: var(--color-foreground-subtle);
      }

      .query-hint code {
        border: 1px solid var(--color-border-subtle);
        border-radius: 3px;
        background: var(--color-background-subtle);
        font-style: normal;
        margin: 0px 1px;
        padding: 1px 3px;
      }

      #regex-error {
        padding-top: 3px;
      }

      #errortext {
        color: var(--color-foreground-error);
        font-size: 14px;
      }
    `],l([f()],j.prototype,"value",2),l([f({type:Number})],j.prototype,"debounce",2),l([f()],j.prototype,"error",2),j=l([x("cs-search-input")],j);function lo(){return window.__CS_INIT??{}}var le=class extends b{constructor(){super(...arguments);this.options={}}render(){let r=this.options.caseSensitive?"false":"auto";return d`
      <div class="search-options">
        <div class="search-option">
          <span class="label">Case:</span>
          <input
            type="radio"
            name="fold_case"
            value="false"
            id="case-match"
            tabindex="3"
            .checked=${r==="false"}
            @change=${()=>this.setCase("false")}
          />
          <label for="case-match">match</label>
          <input
            type="radio"
            name="fold_case"
            value="auto"
            id="case-auto"
            tabindex="4"
            .checked=${r==="auto"}
            @change=${()=>this.setCase("auto")}
          />
          <label for="case-auto">auto</label>
          [<span class="tooltip-target">?<div class="tooltip">Case-sensitive if the query contains capital letters</div></span>]
          <input
            type="radio"
            name="fold_case"
            value="true"
            id="case-ignore"
            tabindex="5"
            .checked=${r==="true"}
            @change=${()=>this.setCase("true")}
          />
          <label for="case-ignore">ignore</label>
        </div>
        <div class="search-option">
          <span class="label">Literal:</span>
          <input
            type="checkbox"
            name="literal"
            id="literal"
            tabindex="6"
            .checked=${this.options.literal??!1}
            @change=${this.toggleLiteral}
          />
        </div>
        <div class="search-option">
          <span class="label">Repo:</span>
          <repo-select>
            <select name="repo" id="repos" multiple>
              ${this.renderRepoOptions()}
            </select>
          </repo-select>
        </div>
      </div>
    `}renderRepoOptions(){let r=lo();return r.repos?r.repos.map(o=>d`
      <optgroup label=${o.label}>
        ${o.repos.map(s=>{let i=s.split("/").pop()??s;return d`<option value=${s} data-tokens=${s}>${i}</option>`})}
      </optgroup>
    `):""}setCase(r){let o=r==="false";this.options={...this.options,caseSensitive:o},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};le.styles=[sr,ie,m`
      :host {
        display: block;
      }

      .search-options {
        margin: 0;
        font-size: 12px;
        line-height: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
        align-items: center;
        gap: 10pt;
      }

      .search-option {
        white-space: nowrap;
      }
    `],l([f({type:Object})],le.prototype,"options",2),le=l([x("cs-search-options")],le);var At=xe(class extends oe{constructor(t){if(super(t),t.type!==Be.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let r=t.element.classList;for(let o of this.st)o in e||(r.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return M}});var F=class extends b{render(){return this.start!=null&&this.end!=null?d`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:d`${this.text}`}};F.styles=m`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,l([f()],F.prototype,"text",2),l([f({type:Number})],F.prototype,"start",2),l([f({type:Number})],F.prototype,"end",2),F=l([x("match-str")],F);var T=class extends b{render(){return d`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};T.styles=m`
        .label {
            font-weight: bold;
        }
        .result-path .repo,
        .result-path .version {
            color: var(--color-foreground-muted);
        }
        .result-path {
            color: var(--color-foreground-muted);
            font-family: "Menlo", "Consolas", "Monaco", monospace;
            font-size: 12px;
            font-weight: normal;
        }

        .result-path .filename {
            font-weight: bold;
        }
        a {
            text-decoration: none;
            color: var(--color-foreground-accent);
        }

        a:hover {
            text-decoration: underline;
            color: var(--color-foreground-accent);
        }
    `,l([f()],T.prototype,"text",2),l([f()],T.prototype,"href",2),l([f({type:Number})],T.prototype,"start",2),l([f({type:Number})],T.prototype,"end",2),l([f()],T.prototype,"repo",2),l([f()],T.prototype,"version",2),T=l([x("filename-match")],T);var P=class extends b{render(){let e=this.start!=null&&this.end!=null;return d`<a class=${At({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${At({matchline:e})}
                >${e?d`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};P.styles=m`
        :host {
            display: grid;
            grid-template-columns: 4em auto;
        }
        .lno-link {
            color: var(--color-foreground-subtle);
            padding-right: 1em;
            text-align: right;
            text-decoration: none;
        }
        .lno-link:hover {
            text-decoration: underline;
        }
        .matchlno {
            font-weight: bold;
            display: inline;
        }
        .matchline {
            display: inline;
        }
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,l([f({type:Number})],P.prototype,"lineNo",2),l([f()],P.prototype,"text",2),l([f()],P.prototype,"href",2),l([f({type:Number})],P.prototype,"start",2),l([f({type:Number})],P.prototype,"end",2),P=l([x("match-line")],P);function co(t){let e=t.lastIndexOf("/");return e<0?".":t.slice(0,e)}function po(t){let e=t.lastIndexOf("/");return e<0?t:t.slice(e+1)}var X=class extends b{constructor(){super(...arguments);this.noContext=!1}render(){let{repo:r,version:o,filePath:s}=lr(this.result.path),i=`/view/${this.result.path}`,n=this.splitGroups(this.result.lines),u=o.length>6?o.slice(0,6):o,a=co(s),p=po(s);return d`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${i}>
              <span class="repo">${r}:</span><span class="version">${u}:</span>${a}/<span class="filename">${p}</span>
            </a>
          </span>
        </div>
        ${n.map(h=>d`
            <div class="match">
              <div class="contents">
                ${h.map(c=>{let E=c[0],v=c[1],y=c.length>2?c[2]:void 0,B=y!==void 0&&y.length>0,z=`${i}#L${E}`,Ze=B&&y?y[0][0]:void 0,Xe=B&&y?y[0][1]:void 0;return d`
                    <match-line
                      .lineNo=${E}
                      text=${v}
                      href=${z}
                      .start=${Ze}
                      .end=${Xe}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(r){let o=[],s=[];for(let i of r)i===null?s.length>0&&(o.push(s),s=[]):s.push(i);return s.length>0&&o.push(s),o}};X.styles=[or,H,m`
      :host {
        display: block;
      }

      .file-group {
        background: var(--color-file-group-background);
        margin-bottom: 15px;
        border: solid 1px var(--color-border-default);
        border-left: solid 3px var(--color-file-group-accent);
      }

      .file-group .header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 3px 5px;
      }

      .header-path {
        flex-grow: 1;
      }

      .match {
        display: block;
        background-color: var(--color-background);
      }

      .match + .match {
        margin-top: 5px;
      }

      .match .contents {
        display: grid;
        grid-template-columns: subgrid;
        white-space: pre-wrap;
        font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
        font-size: 12px;
        padding: 10px 5px;
        color: var(--color-foreground);
        margin: 0;
      }

      .match:hover {
        background-color: var(--color-background-subtle);
      }

      /* No-context mode: collapse match groups into compact form. */
      :host([no-context]) .match .contents > * {
        display: none;
      }

      :host([no-context]) .match {
        border-top: none;
        margin-top: 0;
      }

      :host([no-context]) .match .contents {
        padding-top: 0;
        padding-bottom: 0;
      }

      :host([no-context]) .match:first-of-type .contents {
        padding-top: 10px;
      }

      :host([no-context]) .match:last-of-type .contents {
        padding-bottom: 10px;
      }
    `],l([f({type:Object})],X.prototype,"result",2),l([f({type:Boolean,reflect:!0,attribute:"no-context"})],X.prototype,"noContext",2),X=l([x("cs-result-group")],X);var D=class extends b{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return d`<div id="countarea">Searching...</div>`;let r=this.truncated?`${this.total}+`:`${this.total}`;return d`
      <div id="countarea">
        <span id="numresults">${r}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};D.styles=[ie,m`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],l([f({type:Number})],D.prototype,"total",2),l([f({type:Number})],D.prototype,"timeMs",2),l([f({type:Boolean})],D.prototype,"truncated",2),l([f({type:Boolean})],D.prototype,"loading",2),D=l([x("cs-result-stats")],D);var Ee=class extends b{render(){return d`
      <div id="helparea">
        <div class="helpsection"><h5>Special query terms</h5></div>
        <table>
          <tr>
            <td><code>path:</code></td>
            <td>Only include results from matching files.</td>
            <td><a href="/search?q=hello+path:test">example</a></td>
          </tr>
          <tr>
            <td><code>-path:</code></td>
            <td>Exclude results from matching files.</td>
            <td><a href="/search?q=hello+-path:test">example</a></td>
          </tr>
          <tr>
            <td><code>repo:</code></td>
            <td>Only include results from matching repositories.</td>
            <td><a href="/search?q=hello+repo:example">example</a></td>
          </tr>
          <tr>
            <td><code>-repo:</code></td>
            <td>Exclude results from matching repositories.</td>
            <td><a href="/search?q=hello+-repo:example">example</a></td>
          </tr>
          <tr>
            <td><code>max_matches:</code></td>
            <td>Adjust the limit on number of matching lines returned.</td>
            <td><a href="/search?q=hello+max_matches:5">example</a></td>
          </tr>
          <tr>
            <td><code>(<em>special-term</em>:)</code></td>
            <td>Escape one of the above terms by wrapping it in parentheses (with regex enabled).</td>
            <td><a href="/search?q=(file:)&regex=true">example</a></td>
          </tr>
        </table>
        <div class="helpsection"><h5>Regular Expressions</h5></div>
        <p>
          See the complete supported regex syntax in <a href="https://github.com/google/re2/wiki/Syntax">the RE2 documentation</a>.
        </p>
      </div>
    `}};Ee.styles=[H,m`
      #helparea {
        width: 60em;
        margin: auto;
        color: #999;
        padding-bottom: 100px;
      }

      .helpsection {
        margin: auto;
        text-align: center;
      }

      #helparea table {
        width: 100%;
      }
    `],Ee=l([x("cs-search-help")],Ee);var Ae=class extends be(b){constructor(){super(...arguments);this.currentOptions={};this.currentFacets={}}render(){let r=ae.get(),o=_e.get(),s=dr.get(),i=Se.get(),n=Z.get(),u=ne.get(),a=we.get(),p=cr.get(),h=i||n;return d`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${c=>c.preventDefault()}
        >
          <cs-search-input
            .value=${r}
            .error=${u??""}
            @search-input=${this.onSearchInput}
          ></cs-search-input>
          <cs-search-options
            .options=${this.currentOptions}
            @options-change=${this.onOptionsChange}
          ></cs-search-options>
        </form>
      </div>
      <div id="resultbox">
        ${h?d`
          <div id="resultarea">
            <cs-result-stats
              .total=${i?.total??0}
              .timeMs=${i?.time_ms??0}
              .truncated=${i?.truncated??!1}
              .loading=${n}
            ></cs-result-stats>
            <div
              id="results"
              tabindex="-1"
            >
              <div id="file-extensions">
                ${a?.ext&&a.ext.length>0?d`
                  Narrow to:
                  ${a.ext.slice(0,5).map(c=>d`
                    <button type="button" @click=${()=>this.addExtFilter(c.v)}>
                      ${c.v}
                    </button>
                  `)}
                `:S}
              </div>
              <div id="path-results">
                ${s.map(c=>{let{repo:E,version:v,filePath:y}=uo(c.path);return d`
                    <filename-match
                      text=${y}
                      start=${c.match[0]}
                      end=${c.match[1]}
                      repo=${E}
                      version=${v.slice(0,6)}
                      href="/view/${c.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${o.map(c=>d`
                  <cs-result-group .result=${c} ?no-context=${p<=0}></cs-result-group>
                `)}
              </div>
            </div>
          </div>
        `:d`
          <cs-search-help></cs-search-help>
        `}
      </div>
      <footer id="header">
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}addExtFilter(r){let o=this.renderRoot.querySelector("cs-search-input");o&&o.appendQuery(`file:${r} `)}onSearchInput(r){Et(r.detail.value,this.currentOptions,this.currentFacets)}onOptionsChange(r){this.currentOptions=r.detail;let o=ae.get();o&&Et(o,this.currentOptions,this.currentFacets)}};Ae.styles=[H,ie,m`
      :host {
        display: block;
        line-height: normal;
        font-size: 13px;
      }

      #searcharea {
        width: 100%;
        max-width: 1200px;
        margin-top: 30px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        padding: 20px;
        background: var(--color-background);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        box-sizing: border-box;
      }

      #searcharea > div {
        flex: 1 1 auto;
      }

      #resultbox {
        padding: 1em 3em;
        width: 100%;
        box-sizing: border-box;
      }

      #results {
        margin-top: 10px;
        outline: none;
        /* despite 'tabindex' that lets it receive keystrokes */
      }

      #file-extensions,
      #path-results {
        margin-bottom: 15px;
      }

      #file-extensions button {
        margin-left: 4px;
      }

      /* Footer */
      #header {
        font-size: 12px;
        color: var(--color-foreground-subtle);
        margin: 1em auto;
        width: 40em;
        text-align: center;
      }

      #header ul {
        padding: 0;
      }

      #header li {
        display: inline;
      }

      #header li:before {
        content: "\u2219";
        color: var(--color-foreground-subtle);
        text-decoration: none;
        margin: 5px;
      }

      #header li:first-child:before {
        content: "";
      }
    `],Ae=l([x("cs-search-view")],Ae);function uo(t){let e=t.indexOf("/+/");if(e===-1)return{repo:t,version:"",filePath:""};let r=t.slice(0,e),o=t.slice(e+3),s=r.indexOf("/");return s===-1?{repo:r,version:"",filePath:o}:{repo:r.slice(0,s),version:r.slice(s+1),filePath:o}}var ce=class extends b{constructor(){super(...arguments);this.path=""}render(){let r=this.path.indexOf("/+/");if(r===-1)return d`<span>${this.path}</span>`;let o=this.path.slice(0,r),i=this.path.slice(r+3).split("/").filter(n=>n.length>0);return d`
      <nav class="breadcrumbs">
        <a href="/view/${o}/+/">${o}</a>
        ${i.map((n,u)=>{let a=i.slice(0,u+1).join("/"),p=`/view/${o}/+/${a}${u<i.length-1?"/":""}`;return d`<span class="sep">/</span><a href=${p}>${n}</a>`})}
      </nav>
    `}};ce.styles=m`
    .breadcrumbs {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 13px;
    }
    a {
      color: var(--color-foreground-accent);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .sep {
      color: var(--color-foreground-muted);
      margin: 0 2px;
    }
  `,l([f()],ce.prototype,"path",2),ce=l([x("cs-breadcrumbs")],ce);var Y=class extends b{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let r=[...this.entries].sort((o,s)=>{let i=o.endsWith("/"),n=s.endsWith("/");return i!==n?i?-1:1:o.localeCompare(s)});return d`
      <div class="listing">
        ${r.map(o=>{let s=o.endsWith("/"),i=this.basePath+o;return d`
            <a class=${s?"dir":"file"} href=${i}>${o}</a>
          `})}
      </div>
    `}};Y.styles=m`
    .listing {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 13px;
    }
    a {
      color: var(--color-foreground-accent);
      text-decoration: none;
      padding: 2px 4px;
    }
    a:hover {
      background: var(--color-background-hover);
      text-decoration: underline;
    }
    .dir {
      font-weight: bold;
    }
  `,l([f({type:Array})],Y.prototype,"entries",2),l([f()],Y.prototype,"basePath",2),Y=l([x("cs-dir-listing")],Y);var q=class extends b{constructor(){super(...arguments);this.content="";this.basePath="";this.selectedStart=-1;this.selectedEnd=-1;this.onHashChange=()=>this.parseHash()}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange)}parseHash(){let o=window.location.hash.match(/^#L(\d+)(?:-L?(\d+))?$/);o?(this.selectedStart=parseInt(o[1],10),this.selectedEnd=o[2]?parseInt(o[2],10):this.selectedStart):(this.selectedStart=-1,this.selectedEnd=-1)}render(){let r=this.content.split(`
`);return r.length>0&&r[r.length-1]===""&&r.pop(),d`
      <div class="viewer">
        ${r.map((o,s)=>{let i=s+1,n=i>=this.selectedStart&&i<=this.selectedEnd;return d`
            <div class="line ${n?"selected":""}">
              <a class="lno" href="#L${i}" @click=${u=>this.onLineClick(u,i)}>${i}</a>
              <span class="code">${o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(r,o){if(r.shiftKey&&this.selectedStart>0){r.preventDefault();let s=Math.min(this.selectedStart,o),i=Math.max(this.selectedStart,o);this.selectedStart=s,this.selectedEnd=i,window.location.hash=`#L${s}-L${i}`}else this.selectedStart=o,this.selectedEnd=o}};q.styles=m`
    .viewer {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      line-height: 1.5;
      overflow-x: auto;
    }
    .line {
      display: grid;
      grid-template-columns: 4em 1fr;
      white-space: pre;
    }
    .line.selected {
      background: var(--color-background-matchstr);
    }
    .lno {
      color: var(--color-foreground-subtle);
      text-align: right;
      padding-right: 1em;
      text-decoration: none;
      user-select: none;
    }
    .lno:hover {
      text-decoration: underline;
    }
  `,l([f()],q.prototype,"content",2),l([f()],q.prototype,"basePath",2),l([O()],q.prototype,"selectedStart",2),l([O()],q.prototype,"selectedEnd",2),q=l([x("cs-code-viewer")],q);var R=class extends b{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.loading=!0;this.error=null}willUpdate(r){r.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null;let r=this.path.endsWith("/")||this.path.endsWith("/+/")||!this.path.includes("/+/"),o=`/raw/${this.path}${r&&!this.path.endsWith("/")?"/":""}`;try{let s=await fetch(o);if(!s.ok){this.error=`Not found (${s.status})`,this.loading=!1;return}(s.headers.get("Content-Type")??"").includes("application/json")?this.dirEntries=await s.json():this.content=await s.text()}catch(s){this.error=s instanceof Error?s.message:String(s)}this.loading=!1}render(){return d`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading?d`<div class="status">Loading...</div>`:""}
        ${this.error?d`<div class="status error">${this.error}</div>`:""}

        ${this.dirEntries?d`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith("/")?"":"/"}"
          ></cs-dir-listing>
        `:""}

        ${this.content!==null?d`
          <cs-code-viewer .content=${this.content}></cs-code-viewer>
        `:""}
      </div>
    `}};R.styles=m`
    .file-view {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
    cs-breadcrumbs {
      display: block;
      margin-bottom: 12px;
    }
    .status {
      color: var(--color-foreground-muted);
      font-size: 13px;
      padding: 8px 0;
    }
    .error {
      color: var(--color-foreground-error);
    }
  `,l([f()],R.prototype,"path",2),l([O()],R.prototype,"content",2),l([O()],R.prototype,"dirEntries",2),l([O()],R.prototype,"loading",2),l([O()],R.prototype,"error",2),R=l([x("cs-file-view")],R);var W=class extends b{constructor(){super(...arguments);this._open=!1;this._search="";this._options=[];this._select=null;this._onOutsideClick=r=>{this._open&&(this.contains(r.target)||(this._open=!1))};this._onFocusOut=r=>{this._open&&!this.contains(r.relatedTarget)&&(this._open=!1)}}connectedCallback(){super.connectedCallback(),this._select=this.querySelector("select"),this._select&&this._readOptions(),document.addEventListener("click",this._onOutsideClick),this.addEventListener("focusout",this._onFocusOut)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick),this.removeEventListener("focusout",this._onFocusOut)}_readOptions(){let r=[];for(let o of this._select.children)if(o instanceof HTMLOptGroupElement)for(let s of o.querySelectorAll("option"))r.push({value:s.value,label:s.textContent?.trim()||s.value,group:o.label,selected:s.selected});else o instanceof HTMLOptionElement&&r.push({value:o.value,label:o.textContent?.trim()||o.value,group:"",selected:o.selected});this._options=r}get _buttonText(){let r=this._options.filter(o=>o.selected);return r.length===0?"(all repositories)":r.length<=4?r.map(o=>o.label).join(", "):`(${r.length} repositories)`}get _filteredGroups(){let r=this._search.toLowerCase(),o=new Map;for(let s of this._options)r&&!s.value.toLowerCase().includes(r)&&!s.label.toLowerCase().includes(r)||(o.has(s.group)||o.set(s.group,[]),o.get(s.group).push(s));return[...o.entries()].map(([s,i])=>({label:s,options:i}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(r){this._options=this._options.map(o=>o.value===r?{...o,selected:!o.selected}:o),this._syncToSelect()}_selectAll(){this._options=this._options.map(r=>({...r,selected:!0})),this._syncToSelect()}_deselectAll(){this._options=this._options.map(r=>({...r,selected:!1})),this._syncToSelect()}_toggleGroup(r){let s=this._options.filter(i=>i.group===r).every(i=>i.selected);this._options=this._options.map(i=>i.group===r?{...i,selected:!s}:i),this._syncToSelect()}_syncToSelect(){if(this._select){for(let r of this._select.options){let o=this._options.find(s=>s.value===r.value);o&&(r.selected=o.selected)}this._select.dispatchEvent(new Event("change",{bubbles:!0}))}}_onSearchInput(r){this._search=r.target.value}_onSearchKeydown(r){r.key==="Enter"&&(r.preventDefault(),this._search=""),r.key==="Escape"&&(this._open=!1)}render(){return d`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():S}
            <slot></slot>
        `}_renderDropdown(){let r=this._filteredGroups;return d`
            <div class="dropdown">
                <div class="search-box">
                    <input
                        type="search"
                        class="search-input"
                        placeholder="Search..."
                        .value=${this._search}
                        @input=${this._onSearchInput}
                        @keydown=${this._onSearchKeydown}
                    />
                </div>
                <div class="actions">
                    <button type="button" @click=${this._selectAll}>Select All</button>
                    <button type="button" @click=${this._deselectAll}>Deselect All</button>
                </div>
                <div class="options">${r.map(o=>this._renderGroup(o))}</div>
            </div>
        `}_renderGroup(r){return r.label?d`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(r.label)}>${r.label}</div>
                ${r.options.map(o=>this._renderOption(o))}
            </div>
        `:r.options.map(o=>this._renderOption(o))}_renderOption(r){return d`
            <label class="option ${r.selected?"selected":""}">
                <input type="checkbox" .checked=${r.selected} @change=${()=>this._toggleOption(r.value)} />
                ${r.label}
            </label>
        `}};W.styles=m`
        :host {
            display: inline-block;
            position: relative;
            font-size: 12px;
        }

        .trigger {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            background: var(--color-background-subtle);
            border: 1px solid var(--color-border-default);
            color: var(--color-foreground-muted);
            cursor: pointer;
            font-size: inherit;
            white-space: nowrap;
        }

        .trigger:hover {
            background: var(--color-background-hover);
            color: var(--color-foreground);
        }

        .caret {
            font-size: 10px;
        }

        .dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000;
            min-width: 240px;
            max-height: 420px;
            background: var(--color-background-subtle);
            border: 1px solid var(--color-border-default);
            box-shadow: 0 2px 8px var(--color-shadow);
            display: flex;
            flex-direction: column;
        }

        .search-box {
            padding: 4px;
        }

        .search-input {
            width: 100%;
            box-sizing: border-box;
            padding: 4px 6px;
            border: 1px solid var(--color-border-default);
            background: var(--color-background);
            color: var(--color-foreground);
            font-size: inherit;
        }

        .search-input:focus {
            outline: 1px solid var(--color-foreground-accent);
        }

        .actions {
            display: flex;
            gap: 4px;
            padding: 2px 4px;
            border-bottom: 1px solid var(--color-border-default);
        }

        .actions button {
            flex: 1;
            padding: 2px 4px;
            background: var(--color-background);
            border: 1px solid var(--color-border-default);
            color: var(--color-foreground-muted);
            cursor: pointer;
            font-size: inherit;
        }

        .actions button:hover {
            background: var(--color-background-hover);
            color: var(--color-foreground);
        }

        .options {
            overflow-y: auto;
            flex: 1;
        }

        .group-header {
            padding: 4px 8px;
            font-weight: bold;
            color: var(--color-foreground-muted);
            cursor: pointer;
            user-select: none;
        }

        .group-header:hover {
            background: var(--color-background-hover);
        }

        .option {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px 2px 16px;
            cursor: pointer;
            user-select: none;
            color: var(--color-foreground);
        }

        .option:hover {
            background: var(--color-background-hover);
        }

        .option.selected {
            background: var(--color-background-hover);
        }

        .option input[type="checkbox"] {
            margin: 0;
        }

        ::slotted(select) {
            display: none !important;
        }
    `,l([O()],W.prototype,"_open",2),l([O()],W.prototype,"_search",2),l([O()],W.prototype,"_options",2),W=l([x("repo-select")],W);var ke=class extends be(b){render(){let e=U.get();switch(e.name){case"search":return d`<cs-search-view></cs-search-view>`;case"view":return d`<cs-file-view .path=${e.path??""}></cs-file-view>`;case"about":return d`<div class="placeholder">About</div>`;default:return d`<div class="placeholder">Not found</div>`}}};ke.styles=[H,m`
      :host {
        display: block;
      }
    `],ke=l([x("cs-app")],ke);export{ke as CsApp,W as RepoSelect};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
