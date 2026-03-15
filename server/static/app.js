var sr=Object.defineProperty;var ir=Object.getOwnPropertyDescriptor;var c=(t,e,r,o)=>{for(var s=o>1?void 0:o?ir(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&sr(e,r,s),s};var Se=globalThis,Ee=Se.ShadowRoot&&(Se.ShadyCSS===void 0||Se.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ve=Symbol(),bt=new WeakMap,ie=class{constructor(e,r,o){if(this._$cssResult$=!0,o!==Ve)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(Ee&&e===void 0){let o=r!==void 0&&r.length===1;o&&(e=bt.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&bt.set(r,e))}return e}toString(){return this.cssText}},xt=t=>new ie(typeof t=="string"?t:t+"",void 0,Ve),$=(t,...e)=>{let r=t.length===1?t[0]:e.reduce(((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new ie(r,t,Ve)},yt=(t,e)=>{if(Ee)t.adoptedStyleSheets=e.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of e){let o=document.createElement("style"),s=Se.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,t.appendChild(o)}},Qe=Ee?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let o of e.cssRules)r+=o.cssText;return xt(r)})(t):t;var{is:nr,defineProperty:ar,getOwnPropertyDescriptor:lr,getOwnPropertyNames:cr,getOwnPropertySymbols:dr,getPrototypeOf:ur}=Object,Ae=globalThis,$t=Ae.trustedTypes,pr=$t?$t.emptyScript:"",hr=Ae.reactiveElementPolyfillSupport,ne=(t,e)=>t,ae={toAttribute(t,e){switch(e){case Boolean:t=t?pr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Ce=(t,e)=>!nr(t,e),wt={attribute:!0,type:String,converter:ae,reflect:!1,useDefault:!1,hasChanged:Ce};Symbol.metadata??=Symbol("metadata"),Ae.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=wt){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,r);s!==void 0&&ar(this.prototype,e,s)}}static getPropertyDescriptor(e,r,o){let{get:s,set:i}=lr(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:s,set(n){let d=s?.call(this);i?.call(this,n),this.requestUpdate(e,d,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??wt}static _$Ei(){if(this.hasOwnProperty(ne("elementProperties")))return;let e=ur(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ne("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ne("properties"))){let r=this.properties,o=[...cr(r),...dr(r)];for(let s of o)this.createProperty(s,r[s])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)r.unshift(Qe(s))}else e!==void 0&&r.push(Qe(e));return r}static _$Eu(e,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,r,o){this._$AK(e,o)}_$ET(e,r){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:ae).toAttribute(r,o.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,r){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ae;this._$Em=s;let d=n.fromAttribute(r,i.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(e,r,o){if(e!==void 0){let s=this.constructor,i=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??Ce)(i,r)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,d=this[s];n!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,i,d)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[ne("elementProperties")]=new Map,O[ne("finalized")]=new Map,hr?.({ReactiveElement:O}),(Ae.reactiveElementVersions??=[]).push("2.1.1");var Ge=globalThis,ke=Ge.trustedTypes,_t=ke?ke.createPolicy("lit-html",{createHTML:t=>t}):void 0,Je="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,Ze="?"+R,fr=`<${Ze}>`,q=document,ce=()=>q.createComment(""),de=t=>t===null||typeof t!="object"&&typeof t!="function",Xe=Array.isArray,Nt=t=>Xe(t)||typeof t?.[Symbol.iterator]=="function",Ke=`[ 	
\f\r]`,le=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Et=/>/g,W=RegExp(`>|${Ke}(?:([^\\s"'>=/]+)(${Ke}*=${Ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),At=/'/g,Ct=/"/g,Tt=/^(?:script|style|textarea|title)$/i,Ye=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Ye(1),Pt=Ye(2),ro=Ye(3),U=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),kt=new WeakMap,z=q.createTreeWalker(q,129);function Ot(t,e){if(!Xe(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return _t!==void 0?_t.createHTML(e):e}var Rt=(t,e)=>{let r=t.length-1,o=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=le;for(let d=0;d<r;d++){let a=t[d],l,h,u=-1,A=0;for(;A<a.length&&(n.lastIndex=A,h=n.exec(a),h!==null);)A=n.lastIndex,n===le?h[1]==="!--"?n=St:h[1]!==void 0?n=Et:h[2]!==void 0?(Tt.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=W):h[3]!==void 0&&(n=W):n===W?h[0]===">"?(n=s??le,u=-1):h[1]===void 0?u=-2:(u=n.lastIndex-h[2].length,l=h[1],n=h[3]===void 0?W:h[3]==='"'?Ct:At):n===Ct||n===At?n=W:n===St||n===Et?n=le:(n=W,s=void 0);let g=n===W&&t[d+1].startsWith("/>")?" ":"";i+=n===le?a+fr:u>=0?(o.push(l),a.slice(0,u)+Je+a.slice(u)+R+g):a+R+(u===-2?d:g)}return[Ot(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ue=class t{constructor({strings:e,_$litType$:r},o){let s;this.parts=[];let i=0,n=0,d=e.length-1,a=this.parts,[l,h]=Rt(e,r);if(this.el=t.createElement(l,o),z.currentNode=this.el.content,r===2||r===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=z.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(Je)){let A=h[n++],g=s.getAttribute(u).split(R),S=/([.?@])?(.*)/.exec(A);a.push({type:1,index:i,name:S[2],strings:g,ctor:S[1]==="."?Te:S[1]==="?"?Pe:S[1]==="@"?Oe:j}),s.removeAttribute(u)}else u.startsWith(R)&&(a.push({type:6,index:i}),s.removeAttribute(u));if(Tt.test(s.tagName)){let u=s.textContent.split(R),A=u.length-1;if(A>0){s.textContent=ke?ke.emptyScript:"";for(let g=0;g<A;g++)s.append(u[g],ce()),z.nextNode(),a.push({type:2,index:++i});s.append(u[A],ce())}}}else if(s.nodeType===8)if(s.data===Ze)a.push({type:2,index:i});else{let u=-1;for(;(u=s.data.indexOf(R,u+1))!==-1;)a.push({type:7,index:i}),u+=R.length-1}i++}}static createElement(e,r){let o=q.createElement("template");return o.innerHTML=e,o}};function H(t,e,r=t,o){if(e===U)return e;let s=o!==void 0?r._$Co?.[o]:r._$Cl,i=de(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(e=H(t,s._$AS(t,e.values),s,o)),e}var Ne=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:o}=this._$AD,s=(e?.creationScope??q).importNode(r,!0);z.currentNode=s;let i=z.nextNode(),n=0,d=0,a=o[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new J(i,i.nextSibling,this,e):a.type===1?l=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(l=new Re(i,this,e)),this._$AV.push(l),a=o[++d]}n!==a?.index&&(i=z.nextNode(),n++)}return z.currentNode=q,s}p(e){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,r),r+=o.strings.length-2):o._$AI(e[r])),r++}},J=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,s){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=H(this,e,r),de(e)?e===E||e==null||e===""?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Nt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&de(this._$AH)?this._$AA.nextSibling.data=e:this.T(q.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ue.createElement(Ot(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new Ne(s,this),n=i.u(this.options);i.p(r),this.T(n),this._$AH=i}}_$AC(e){let r=kt.get(e.strings);return r===void 0&&kt.set(e.strings,r=new ue(e)),r}k(e){Xe(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let i of e)s===r.length?r.push(o=new t(this.O(ce()),this.O(ce()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,o,s,i){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=E}_$AI(e,r=this,o,s){let i=this.strings,n=!1;if(i===void 0)e=H(this,e,r,0),n=!de(e)||e!==this._$AH&&e!==U,n&&(this._$AH=e);else{let d=e,a,l;for(e=i[0],a=0;a<i.length-1;a++)l=H(this,d[o+a],r,a),l===U&&(l=this._$AH[a]),n||=!de(l)||l!==this._$AH[a],l===E?e=E:e!==E&&(e+=(l??"")+i[a+1]),this._$AH[a]=l}n&&!s&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Te=class extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}},Pe=class extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}},Oe=class extends j{constructor(e,r,o,s,i){super(e,r,o,s,i),this.type=5}_$AI(e,r=this){if((e=H(this,e,r,0)??E)===U)return;let o=this._$AH,s=e===E&&o!==E||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==E&&(o===E||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Re=class{constructor(e,r,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){H(this,e)}},Ut={M:Je,P:R,A:Ze,C:1,L:Rt,R:Ne,D:Nt,V:H,I:J,H:j,N:Pe,U:Oe,B:Te,F:Re},mr=Ge.litHtmlPolyfillSupport;mr?.(ue,J),(Ge.litHtmlVersions??=[]).push("3.3.1");var Lt=(t,e,r)=>{let o=r?.renderBefore??e,s=o._$litPart$;if(s===void 0){let i=r?.renderBefore??null;o._$litPart$=s=new J(e.insertBefore(ce(),i),i,void 0,r??{})}return s._$AI(t),s};var et=globalThis,v=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Lt(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};v._$litElement$=!0,v.finalized=!0,et.litElementHydrateSupport?.({LitElement:v});var gr=et.litElementPolyfillSupport;gr?.({LitElement:v});(et.litElementVersions??=[]).push("4.2.1");var w=t=>(e,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var vr={attribute:!0,type:String,converter:ae,reflect:!1,hasChanged:Ce},br=(t=vr,e,r)=>{let{kind:o,metadata:s}=r,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){let{name:n}=r;return{set(d){let a=e.get.call(this);e.set.call(this,d),this.requestUpdate(n,a,t)},init(d){return d!==void 0&&this.C(n,void 0,t,d),d}}}if(o==="setter"){let{name:n}=r;return function(d){let a=this[n];e.call(this,d),this.requestUpdate(n,a,t)}}throw Error("Unsupported decorator location: "+o)};function m(t){return(e,r)=>typeof r=="object"?br(t,e,r):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}var B=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);function It(t,e){return(r,o,s)=>{let i=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:d}=typeof o=="object"?r:s??(()=>{let a=Symbol();return{get(){return this[a]},set(l){this[a]=l}}})();return B(r,o,{get(){let a=n.call(this);return a===void 0&&(a=i(this),(a!==null||this.hasUpdated)&&d.call(this,a)),a}})}return B(r,o,{get(){return i(this)}})}}var xr=Object.defineProperty,yr=(t,e,r)=>e in t?xr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,tt=(t,e,r)=>(yr(t,typeof e!="symbol"?e+"":e,r),r),$r=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},rt=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},Ue=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},Dt=(t,e,r)=>($r(t,e,"access private method"),r);function Mt(t,e){return Object.is(t,e)}var _=null,pe=!1,Le=1,Ie=Symbol("SIGNAL");function Z(t){let e=_;return _=t,e}function wr(){return _}function _r(){return pe}var at={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function De(t){if(pe)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(_===null)return;_.consumerOnSignalRead(t);let e=_.nextProducerIndex++;if(X(_),e<_.producerNode.length&&_.producerNode[e]!==t&&it(_)){let r=_.producerNode[e];Me(r,_.producerIndexOfThis[e])}_.producerNode[e]!==t&&(_.producerNode[e]=t,_.producerIndexOfThis[e]=it(_)?qt(t,_,e):0),_.producerLastReadVersion[e]=t.version}function Sr(){Le++}function Wt(t){if(!(!t.dirty&&t.lastCleanEpoch===Le)){if(!t.producerMustRecompute(t)&&!Nr(t)){t.dirty=!1,t.lastCleanEpoch=Le;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=Le}}function zt(t){if(t.liveConsumerNode===void 0)return;let e=pe;pe=!0;try{for(let r of t.liveConsumerNode)r.dirty||Ar(r)}finally{pe=e}}function Er(){return _?.consumerAllowSignalWrites!==!1}function Ar(t){var e;t.dirty=!0,zt(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function Cr(t){return t&&(t.nextProducerIndex=0),Z(t)}function kr(t,e){if(Z(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(it(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)Me(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function Nr(t){X(t);for(let e=0;e<t.producerNode.length;e++){let r=t.producerNode[e],o=t.producerLastReadVersion[e];if(o!==r.version||(Wt(r),o!==r.version))return!0}return!1}function qt(t,e,r){var o;if(lt(t),X(t),t.liveConsumerNode.length===0){(o=t.watched)==null||o.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)t.producerIndexOfThis[s]=qt(t.producerNode[s],t,s)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(e)-1}function Me(t,e){var r;if(lt(t),X(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(r=t.unwatched)==null||r.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)Me(t.producerNode[s],t.producerIndexOfThis[s])}let o=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[o],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[o],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let s=t.liveConsumerIndexOfThis[e],i=t.liveConsumerNode[e];X(i),i.producerIndexOfThis[s]=e}}function it(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function X(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function lt(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function Ht(t){if(Wt(t),De(t),t.value===nt)throw t.error;return t.value}function Tr(t){let e=Object.create(Pr);e.computation=t;let r=()=>Ht(e);return r[Ie]=e,r}var ot=Symbol("UNSET"),st=Symbol("COMPUTING"),nt=Symbol("ERRORED"),Pr={...at,value:ot,dirty:!0,error:null,equal:Mt,producerMustRecompute(t){return t.value===ot||t.value===st},producerRecomputeValue(t){if(t.value===st)throw new Error("Detected cycle in computations.");let e=t.value;t.value=st;let r=Cr(t),o,s=!1;try{o=t.computation.call(t.wrapper),s=e!==ot&&e!==nt&&t.equal.call(t.wrapper,e,o)}catch(i){o=nt,t.error=i}finally{kr(t,r)}if(s){t.value=e;return}t.value=o,t.version++}};function Or(){throw new Error}var Rr=Or;function Ur(){Rr()}function Lr(t){let e=Object.create(Mr);e.value=t;let r=()=>(De(e),e.value);return r[Ie]=e,r}function Ir(){return De(this),this.value}function Dr(t,e){Er()||Ur(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,Wr(t))}var Mr={...at,equal:Mt,value:void 0};function Wr(t){t.version++,Sr(),zt(t)}var C=Symbol("node"),x;(t=>{var e,r,o,s,i,n;class d{constructor(h,u={}){Ue(this,r),tt(this,e);let g=Lr(h)[Ie];if(this[C]=g,g.wrapper=this,u){let S=u.equals;S&&(g.equal=S),g.watched=u[t.subtle.watched],g.unwatched=u[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Ir.call(this[C])}set(h){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(_r())throw new Error("Writes to signals not permitted during Watcher callback");let u=this[C];Dr(u,h)}}e=C,r=new WeakSet,o=function(){},t.isState=l=>typeof l=="object"&&rt(r,l),t.State=d;class a{constructor(h,u){Ue(this,i),tt(this,s);let g=Tr(h)[Ie];if(g.consumerAllowSignalWrites=!0,this[C]=g,g.wrapper=this,u){let S=u.equals;S&&(g.equal=S),g.watched=u[t.subtle.watched],g.unwatched=u[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Ht(this[C])}}s=C,i=new WeakSet,n=function(){},t.isComputed=l=>typeof l=="object"&&rt(i,l),t.Computed=a,(l=>{var h,u,A,g,S;function we(y){let b,f=null;try{f=Z(null),b=y()}finally{Z(f)}return b}l.untrack=we;function G(y){var b;if(!(0,t.isComputed)(y)&&!(0,t.isWatcher)(y))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((b=y[C].producerNode)==null?void 0:b.map(f=>f.wrapper))??[]}l.introspectSources=G;function Xt(y){var b;if(!(0,t.isComputed)(y)&&!(0,t.isState)(y))throw new TypeError("Called introspectSinks without a Signal argument");return((b=y[C].liveConsumerNode)==null?void 0:b.map(f=>f.wrapper))??[]}l.introspectSinks=Xt;function Yt(y){if(!(0,t.isComputed)(y)&&!(0,t.isState)(y))throw new TypeError("Called hasSinks without a Signal argument");let b=y[C].liveConsumerNode;return b?b.length>0:!1}l.hasSinks=Yt;function er(y){if(!(0,t.isComputed)(y)&&!(0,t.isWatcher)(y))throw new TypeError("Called hasSources without a Computed or Watcher argument");let b=y[C].producerNode;return b?b.length>0:!1}l.hasSources=er;class tr{constructor(b){Ue(this,u),Ue(this,g),tt(this,h);let f=Object.create(at);f.wrapper=this,f.consumerMarkedDirty=b,f.consumerIsAlwaysLive=!0,f.consumerAllowSignalWrites=!1,f.producerNode=[],this[C]=f}watch(...b){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Dt(this,g,S).call(this,b);let f=this[C];f.dirty=!1;let k=Z(f);for(let _e of b)De(_e[C]);Z(k)}unwatch(...b){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Dt(this,g,S).call(this,b);let f=this[C];X(f);for(let k=f.producerNode.length-1;k>=0;k--)if(b.includes(f.producerNode[k].wrapper)){Me(f.producerNode[k],f.producerIndexOfThis[k]);let _e=f.producerNode.length-1;if(f.producerNode[k]=f.producerNode[_e],f.producerIndexOfThis[k]=f.producerIndexOfThis[_e],f.producerNode.length--,f.producerIndexOfThis.length--,f.nextProducerIndex--,k<f.producerNode.length){let or=f.producerIndexOfThis[k],vt=f.producerNode[k];lt(vt),vt.liveConsumerIndexOfThis[or]=k}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[C].producerNode.filter(f=>f.dirty).map(f=>f.wrapper)}}h=C,u=new WeakSet,A=function(){},g=new WeakSet,S=function(y){for(let b of y)if(!(0,t.isComputed)(b)&&!(0,t.isState)(b))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=y=>rt(u,y),l.Watcher=tr;function rr(){var y;return(y=wr())==null?void 0:y.wrapper}l.currentComputed=rr,l.watched=Symbol("watched"),l.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(x||(x={}));var ct=!1,jt=new x.subtle.Watcher(()=>{ct||(ct=!0,queueMicrotask(()=>{ct=!1;for(let t of jt.getPending())t.get();jt.watch()}))}),zr=Symbol("SignalWatcherBrand"),qr=new FinalizationRegistry(t=>{t.unwatch(...x.subtle.introspectSources(t))}),Bt=new WeakMap;function he(t){return t[zr]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new x.State(0),this._$Si=!1}_$Sl(){var e,r;let o=[],s=[];this._$St.forEach((n,d)=>{(n?.beforeUpdate?o:s).push(d)});let i=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));o.forEach(n=>n.get()),(r=this._$Su)===null||r===void 0||r.get(),i.forEach(n=>n.get()),s.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new x.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new x.subtle.Watcher(function(){let r=Bt.get(this);r!==void 0&&(r._$Si===!1&&(new Set(this.getPending()).has(r._$Su)?r.requestUpdate():r._$Sv()),this.watch())});Bt.set(e,this),qr.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([r])=>r))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...x.subtle.introspectSources(this.h).filter(r=>{var o;let s=((o=this._$St.get(r))===null||o===void 0?void 0:o.manualDispose)!==!0;return s&&this._$St.delete(r),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,r){var o;this._$S_();let s=new x.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,r),(o=r?.beforeUpdate)!==null&&o!==void 0&&o?x.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>x.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var We={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fe=t=>(...e)=>({_$litDirective$:t,values:e}),Y=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,o){this._$Ct=e,this._$AM=r,this._$Ci=o}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var{I:Zo}=Ut;var Ft=t=>t.strings===void 0;var me=(t,e)=>{let r=t._$AN;if(r===void 0)return!1;for(let o of r)o._$AO?.(e,!1),me(o,e);return!0},ze=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while(r?.size===0)},Vt=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),Br(e)}};function Hr(t){this._$AN!==void 0?(ze(this),this._$AM=t,Vt(this)):this._$AM=t}function jr(t,e=!1,r=0){let o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let i=r;i<o.length;i++)me(o[i],!1),ze(o[i]);else o!=null&&(me(o,!1),ze(o));else me(this,t)}var Br=t=>{t.type==We.CHILD&&(t._$AP??=jr,t._$AQ??=Hr)},qe=class extends Y{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,o){super._$AT(e,r,o),Vt(this),this.isConnected=e._$AU}_$AO(e,r=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),r&&(me(this,e),ze(this))}setValue(e){if(Ft(this._$Ct))this._$Ct._$AI(e,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};var dt=!1,ut=new x.subtle.Watcher(async()=>{dt||(dt=!0,queueMicrotask(()=>{dt=!1;for(let t of ut.getPending())t.get();ut.watch()}))}),He=class extends qe{_$S_(){var e,r;this._$Sm===void 0&&(this._$Sj=new x.Computed(()=>{var o;let s=(o=this._$SW)===null||o===void 0?void 0:o.get();return this.setValue(s),s}),this._$Sm=(r=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&r!==void 0?r:ut,this._$Sm.watch(this._$Sj),x.subtle.untrack(()=>{var o;return(o=this._$Sj)===null||o===void 0?void 0:o.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return x.subtle.untrack(()=>e.get())}update(e,[r]){var o,s;return(o=this._$Sk)!==null&&o!==void 0||(this._$Sk=(s=e.options)===null||s===void 0?void 0:s.host),r!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=r,this._$S_(),x.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},pt=fe(He);var ht=t=>(e,...r)=>t(e,...r.map(o=>o instanceof x.State||o instanceof x.Computed?pt(o):o)),Fr=ht(p),Vr=ht(Pt);var gs=x.State,vs=x.Computed,L=(t,e)=>new x.State(t,e),je=(t,e)=>new x.Computed(t,e);var Qr=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function Qt(t,e=""){for(let{pattern:r,name:o}of Qr){let s=r.exec(t);if(s)return{name:o,path:s[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var D=L(Qt(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{D.set(Qt(window.location.pathname,window.location.search))});var Kr=new Set(["file","-file","path","-path","repo","-repo","tags","-tags","case","lit","max_matches"]);function Kt(t){let e={},r="",o="",s="",i=t.trim(),n=/\[|\(|(?:^([a-zA-Z0-9\-_]+):|\\.)| /,d=!0;for(;i.length>0;){let l=n.exec(i);if(l===null){s+=i;break}s+=i.slice(0,l.index);let h=l[0];if(i=i.slice(l.index+h.length),d=d&&l.index===0,h===" ")o===""?s+=" ":(ft(e,o,s),o="",s="");else if(h==="("||h==="["){let u=h==="("?")":"]",A=1,g=0,S=!1,we="";for(;g<i.length&&A>0;){let G=i[g];g++,S?S=!1:G==="\\"?S=!0:G===h?A++:G===u&&A--,we+=G}s+=h+we,i=i.slice(g)}else if(h.startsWith("\\"))s+=h;else{let u=l[1];o===""&&u&&Kr.has(u)?(s.trim()!==""&&ft(e,o,s),s="",o=u):s+=h}d=h===" "}ft(e,o,s);let a=e[""]||[];return delete e[""],r=a.join(" ").trim(),{line:r,operators:e}}function ft(t,e,r){t[e]||(t[e]=[]),t[e].push(r)}function Gt(t,e={},r={}){let o=new URLSearchParams;t.trim()&&o.set("q",t.trim()),e.literal&&o.set("literal","true"),e.caseSensitive&&o.set("fold_case","false");for(let[s,i]of Object.entries(r))for(let n of i)o.append(s,n);return o}async function Jt(t,e,r){let o="/api/search?"+t.toString(),s=await fetch(o,{signal:r});if(!s.ok){let i=await s.text();throw new Error(`search failed (${s.status}): ${i}`)}if(!s.body)throw new Error("response has no body");await Gr(s.body,i=>{switch(i.type){case"result":e.onResult?.(i);break;case"file":e.onFile?.(i);break;case"facets":e.onFacets?.(i);break;case"done":e.onDone?.(i);break}})}async function Gr(t,e){let r=t.getReader(),o=new TextDecoder,s="";try{for(;;){let{done:n,value:d}=await r.read();if(n)break;s+=o.decode(d,{stream:!0});let a;for(;(a=s.indexOf(`
`))!==-1;){let l=s.slice(0,a).trim();s=s.slice(a+1),l.length!==0&&e(JSON.parse(l))}}s+=o.decode();let i=s.trim();i.length>0&&e(JSON.parse(i))}finally{r.releaseLock()}}function Zt(t){let e=t.indexOf("/+/");if(e===-1)return{repo:t,version:"",filePath:""};let r=t.slice(0,e),o=t.slice(e+3),s=r.indexOf("/");return s===-1?{repo:r,version:"",filePath:o}:{repo:r.slice(0,s),version:r.slice(s+1),filePath:o}}var oe=je(()=>D.get().params.get("q")??""),Rs=je(()=>{let t=D.get().params;return{literal:t.get("literal")==="true",caseSensitive:t.get("fold_case")==="false"}}),Us=je(()=>Kt(oe.get())),ee=L([]),te=L([]),ve=L(null),be=L(null),F=L(!1),re=L(null),mt=null;async function Jr(){mt&&mt.abort();let t=new AbortController;if(mt=t,!oe.get()){ee.set([]),te.set([]),ve.set(null),be.set(null),F.set(!1),re.set(null);return}let r=D.get(),o=new URLSearchParams(r.params);F.set(!0),re.set(null),ee.set([]),te.set([]),ve.set(null),be.set(null);try{await Jt(o,{onResult(s){ee.set([...ee.get(),s])},onFile(s){te.set([...te.get(),s])},onFacets(s){ve.set(s)},onDone(s){be.set(s),F.set(!1)},onError(s){t.signal.aborted||(re.set(s.message),F.set(!1))}},t.signal)}catch(s){t.signal.aborted||(re.set(s instanceof Error?s.message:String(s)),F.set(!1))}}var Be=null,ge="";function Fe(t,e={},r={}){Be&&clearTimeout(Be);let o=Gt(t,e,r),s=t!==ge,i=o.toString(),n="/search"+(i?"?"+i:"");s&&ge!==""?(history.pushState(null,"",n),ge=t):(history.replaceState(null,"",n),ge===""&&(ge=t)),D.set({name:"search",params:o}),Be=setTimeout(()=>{Be=null,Jr()},100)}var T=class extends v{constructor(){super(...arguments);this.value="";this.debounce=100;this.placeholder="Search code...";this.error="";this.timer=null}render(){return p`
      <div class="search-box">
        <input
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.onInput}
          @keydown=${this.onKeydown}
          autocomplete="off"
          spellcheck="false"
        />
        ${this.error?p`<div class="error">${this.error}</div>`:""}
      </div>
    `}onInput(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:this.input.value},bubbles:!0,composed:!0}))},this.debounce)}onKeydown(r){r.key==="Enter"&&(this.timer&&clearTimeout(this.timer),this.timer=null,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:this.input.value},bubbles:!0,composed:!0})))}focus(){this.input?.focus()}};T.styles=$`
    .search-box {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    input {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 14px;
      padding: 8px 12px;
      border: 1px solid var(--color-border-default);
      border-radius: 4px;
      background: var(--color-background);
      color: var(--color-foreground);
      width: 100%;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: var(--color-foreground-accent);
      box-shadow: 0 0 0 1px var(--color-foreground-accent);
    }
    .error {
      color: var(--color-foreground-error);
      font-size: 12px;
    }
  `,c([m()],T.prototype,"value",2),c([m({type:Number})],T.prototype,"debounce",2),c([m()],T.prototype,"placeholder",2),c([m()],T.prototype,"error",2),c([It("input")],T.prototype,"input",2),T=c([w("cs-search-input")],T);var V=class extends v{constructor(){super(...arguments);this.caseSensitive=!1;this.literal=!1}render(){return p`
      <div class="options">
        <button
          class=${this.caseSensitive?"active":""}
          @click=${this.toggleCase}
          title="Case sensitive search"
        >Aa</button>
        <button
          class=${this.literal?"active":""}
          @click=${this.toggleLiteral}
          title="Literal (non-regex) search"
        >.*</button>
      </div>
    `}toggleCase(){this.caseSensitive=!this.caseSensitive,this.fireChange()}toggleLiteral(){this.literal=!this.literal,this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:{caseSensitive:this.caseSensitive,literal:this.literal},bubbles:!0,composed:!0}))}};V.styles=$`
    .options {
      display: flex;
      gap: 4px;
    }
    button {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      padding: 4px 8px;
      border: 1px solid var(--color-border-default);
      border-radius: 4px;
      background: var(--color-background);
      color: var(--color-foreground-muted);
      cursor: pointer;
    }
    button:hover {
      background: var(--color-background-hover);
    }
    button.active {
      background: var(--color-foreground-accent);
      color: var(--color-background);
      border-color: var(--color-foreground-accent);
    }
  `,c([m({type:Boolean})],V.prototype,"caseSensitive",2),c([m({type:Boolean})],V.prototype,"literal",2),V=c([w("cs-search-options")],V);var Q=class extends v{constructor(){super(...arguments);this.lines=[];this.baseHref=""}render(){return p`${this.lines.map(r=>this.renderLine(r))}`}renderLine(r){let o=r[0],s=r[1],i=r.length>2?r[2]:void 0,n=i!==void 0&&i.length>0,d=this.baseHref?`${this.baseHref}#L${o}`:`#L${o}`;return p`
      <div class="line ${n?"match":""}">
        <a class="lno" href=${d}>${o}</a>
        <span class="code">${n?this.highlightText(s,i):s}</span>
      </div>
    `}highlightText(r,o){let s=[],i=0;for(let[n,d]of o)n>i&&s.push(r.slice(i,n)),s.push(p`<span class="hl">${r.slice(n,d)}</span>`),i=d;return i<r.length&&s.push(r.slice(i)),s}};Q.styles=$`
    :host {
      display: block;
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      line-height: 1.5;
    }
    .line {
      display: grid;
      grid-template-columns: 4em 1fr;
      white-space: pre;
    }
    .line.match {
      background: var(--color-background-subtle);
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
    .hl {
      background: var(--color-background-matchstr);
      color: var(--color-foreground-matchstr);
      font-weight: bold;
    }
  `,c([m({type:Array})],Q.prototype,"lines",2),c([m()],Q.prototype,"baseHref",2),Q=c([w("cs-match-range")],Q);var se=class extends v{render(){let{repo:e,version:r,filePath:o}=Zt(this.result.path),s=`/view/${this.result.path}`,i=this.splitGroups(this.result.lines);return p`
      <div class="result-group">
        <div class="header">
          <a class="path" href=${s}>
            <span class="repo">${e}:</span><span class="version">${r}:</span>${o}
          </a>
        </div>
        ${i.map((n,d)=>p`
          ${d>0?p`<div class="separator"></div>`:""}
          <cs-match-range .lines=${n} baseHref=${s}></cs-match-range>
        `)}
      </div>
    `}splitGroups(e){let r=[],o=[];for(let s of e)s===null?o.length>0&&(r.push(o),o=[]):o.push(s);return o.length>0&&r.push(o),r}};se.styles=$`
    .result-group {
      border: 1px solid var(--color-border-default);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .header {
      padding: 4px 8px;
      background: var(--color-background-subtle);
      border-bottom: 1px solid var(--color-border-default);
    }
    .path {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      text-decoration: none;
      color: var(--color-foreground-accent);
    }
    .path:hover {
      text-decoration: underline;
    }
    .repo, .version {
      color: var(--color-foreground-muted);
    }
    .separator {
      border-top: 1px dashed var(--color-border-default);
      margin: 0 8px;
    }
  `,c([m({type:Object})],se.prototype,"result",2),se=c([w("cs-result-group")],se);var I=class extends v{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return p`<div class="stats">Searching...</div>`;let r=this.truncated?`${this.total}+ results`:`${this.total} result${this.total!==1?"s":""}`;return p`<div class="stats">${r} in ${this.timeMs}ms</div>`}};I.styles=$`
    .stats {
      font-size: 12px;
      color: var(--color-foreground-muted);
      padding: 4px 0;
    }
  `,c([m({type:Number})],I.prototype,"total",2),c([m({type:Number})],I.prototype,"timeMs",2),c([m({type:Boolean})],I.prototype,"truncated",2),c([m({type:Boolean})],I.prototype,"loading",2),I=c([w("cs-result-stats")],I);var K=class extends v{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){if(!this.facets)return"";let r=[{label:"Extension",key:"f.ext",buckets:this.facets.ext},{label:"Repository",key:"f.repo",buckets:this.facets.repo},{label:"Path",key:"f.path",buckets:this.facets.path}].filter(o=>o.buckets&&o.buckets.length>0);return r.length===0?"":p`
      <div class="facet-panel">
        ${r.map(o=>this.renderSection(o.label,o.key,o.buckets))}
      </div>
    `}renderSection(r,o,s){let i=new Set(this.selected[o]??[]);return p`
      <div class="section">
        <div class="section-label">${r}</div>
        ${s.slice(0,10).map(n=>p`
          <button
            class=${i.has(n.v)?"active":""}
            @click=${()=>this.onSelect(o,n.v)}
          >${n.v} <span class="count">${n.c}</span></button>
        `)}
      </div>
    `}onSelect(r,o){this.dispatchEvent(new CustomEvent("facet-select",{detail:{key:r,value:o},bubbles:!0,composed:!0}))}};K.styles=$`
    .facet-panel {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 4px 0;
    }
    .section {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-items: center;
    }
    .section-label {
      font-size: 11px;
      color: var(--color-foreground-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    button {
      font-size: 12px;
      padding: 2px 8px;
      border: 1px solid var(--color-border-default);
      border-radius: 12px;
      background: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
    }
    button:hover {
      background: var(--color-background-hover);
    }
    button.active {
      background: var(--color-foreground-accent);
      color: var(--color-background);
      border-color: var(--color-foreground-accent);
    }
    .count {
      color: var(--color-foreground-muted);
      font-size: 10px;
    }
    button.active .count {
      color: inherit;
    }
  `,c([m({type:Object})],K.prototype,"facets",2),c([m({type:Object})],K.prototype,"selected",2),K=c([w("cs-facet-panel")],K);var gt=fe(class extends Y{constructor(t){if(super(t),t.type!==We.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let r=t.element.classList;for(let o of this.st)o in e||(r.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return U}});var M=class extends v{render(){return this.start!=null&&this.end!=null?p`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:p`${this.text}`}};M.styles=$`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,c([m()],M.prototype,"text",2),c([m({type:Number})],M.prototype,"start",2),c([m({type:Number})],M.prototype,"end",2),M=c([w("match-str")],M);var N=class extends v{render(){return p`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};N.styles=$`
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
    `,c([m()],N.prototype,"text",2),c([m()],N.prototype,"href",2),c([m({type:Number})],N.prototype,"start",2),c([m({type:Number})],N.prototype,"end",2),c([m()],N.prototype,"repo",2),c([m()],N.prototype,"version",2),N=c([w("filename-match")],N);var P=class extends v{render(){let e=this.start!=null&&this.end!=null;return p`<a class=${gt({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${gt({matchline:e})}
                >${e?p`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};P.styles=$`
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
    `,c([m({type:Number})],P.prototype,"lineNo",2),c([m()],P.prototype,"text",2),c([m()],P.prototype,"href",2),c([m({type:Number})],P.prototype,"start",2),c([m({type:Number})],P.prototype,"end",2),P=c([w("match-line")],P);var xe=class extends v{render(){return p`
      <div class="help">
        <h3>Search syntax</h3>
        <dl>
          <dt>Regular expression</dt>
          <dd>Type a regex to search code. Use <code>Aa</code> for case-sensitive, <code>.*</code> for literal.</dd>

          <dt><code>file:<em>path</em></code></dt>
          <dd>Filter by file path regex. Example: <code>file:_test\\.go$</code></dd>

          <dt><code>-file:<em>path</em></code></dt>
          <dd>Exclude files matching path regex.</dd>

          <dt><code>repo:<em>name</em></code></dt>
          <dd>Filter by repository name regex.</dd>

          <dt><code>lit:<em>text</em></code></dt>
          <dd>Search for literal text (no regex interpretation).</dd>

          <dt><code>case:<em>text</em></code></dt>
          <dd>Case-sensitive search.</dd>
        </dl>
      </div>
    `}};xe.styles=$`
    .help {
      max-width: 600px;
      color: var(--color-foreground-muted);
      font-size: 13px;
      line-height: 1.6;
    }
    h3 {
      margin: 0 0 12px;
      color: var(--color-foreground);
    }
    dl {
      margin: 0;
    }
    dt {
      font-weight: bold;
      margin-top: 8px;
    }
    dd {
      margin: 2px 0 0 16px;
    }
    code {
      font-family: 'Menlo', 'Consolas', monospace;
      background: var(--color-background-subtle);
      padding: 1px 4px;
      border-radius: 2px;
      font-size: 12px;
    }
    em {
      font-style: italic;
      color: var(--color-foreground-subtle);
    }
  `,xe=c([w("cs-search-help")],xe);var ye=class extends he(v){constructor(){super(...arguments);this.currentOptions={};this.currentFacets={}}render(){let r=oe.get(),o=ee.get(),s=te.get(),i=be.get(),n=F.get(),d=re.get(),a=ve.get();return p`
      <div class="search-view">
        <div class="controls">
          <cs-search-input
            .value=${r}
            .error=${d??""}
            @search-input=${this.onSearchInput}
          ></cs-search-input>
          <cs-search-options
            .caseSensitive=${this.currentOptions.caseSensitive??!1}
            .literal=${this.currentOptions.literal??!1}
            @options-change=${this.onOptionsChange}
          ></cs-search-options>
        </div>

        ${r?"":p`<cs-search-help></cs-search-help>`}

        ${i||n?p`
          <cs-result-stats
            .total=${i?.total??0}
            .timeMs=${i?.time_ms??0}
            .truncated=${i?.truncated??!1}
            .loading=${n}
          ></cs-result-stats>
        `:""}

        ${a?p`
          <cs-facet-panel
            .facets=${a}
            .selected=${this.currentFacets}
            @facet-select=${this.onFacetSelect}
          ></cs-facet-panel>
        `:""}

        ${s.length>0?p`
          <div class="file-results">
            ${s.map(l=>p`
              <filename-match
                text=${l.path}
                href="/view/${l.path}"
                start=${l.match[0]}
                end=${l.match[1]}
              ></filename-match>
            `)}
          </div>
        `:""}

        ${o.length>0?p`
          <div class="code-results">
            ${o.map(l=>p`
              <cs-result-group .result=${l}></cs-result-group>
            `)}
          </div>
        `:""}
      </div>
    `}onSearchInput(r){Fe(r.detail.value,this.currentOptions,this.currentFacets)}onOptionsChange(r){this.currentOptions=r.detail;let o=oe.get();o&&Fe(o,this.currentOptions,this.currentFacets)}onFacetSelect(r){let{key:o,value:s}=r.detail,i=this.currentFacets[o]??[];i.indexOf(s)>=0?this.currentFacets={...this.currentFacets,[o]:i.filter(a=>a!==s)}:this.currentFacets={...this.currentFacets,[o]:[...i,s]};let d=oe.get();d&&Fe(d,this.currentOptions,this.currentFacets)}};ye.styles=$`
    .search-view {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
    .controls {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    cs-search-input {
      flex: 1;
    }
    .file-results {
      margin-bottom: 12px;
    }
    .code-results {
      display: flex;
      flex-direction: column;
    }
  `,ye=c([w("cs-search-view")],ye);var $e=class extends he(v){render(){let e=D.get();switch(e.name){case"search":return p`<cs-search-view></cs-search-view>`;case"view":return p`<div class="placeholder">File view: ${e.path} (Phase 3)</div>`;case"about":return p`<div class="placeholder">About (Phase 4)</div>`;default:return p`<div class="placeholder">Not found</div>`}}};$e.styles=$`
    :host {
      display: block;
    }
  `,$e=c([w("cs-app")],$e);export{$e as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
