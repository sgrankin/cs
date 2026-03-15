var cr=Object.defineProperty;var dr=Object.getOwnPropertyDescriptor;var a=(t,e,r,o)=>{for(var s=o>1?void 0:o?dr(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&cr(e,r,s),s};var Ne=globalThis,Te=Ne.ShadowRoot&&(Ne.ShadyCSS===void 0||Ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),_t=new WeakMap,de=class{constructor(e,r,o){if(this._$cssResult$=!0,o!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(Te&&e===void 0){let o=r!==void 0&&r.length===1;o&&(e=_t.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&_t.set(r,e))}return e}toString(){return this.cssText}},St=t=>new de(typeof t=="string"?t:t+"",void 0,Ze),b=(t,...e)=>{let r=t.length===1?t[0]:e.reduce(((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new de(r,t,Ze)},Et=(t,e)=>{if(Te)t.adoptedStyleSheets=e.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of e){let o=document.createElement("style"),s=Ne.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,t.appendChild(o)}},Xe=Te?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let o of e.cssRules)r+=o.cssText;return St(r)})(t):t;var{is:ur,defineProperty:pr,getOwnPropertyDescriptor:hr,getOwnPropertyNames:fr,getOwnPropertySymbols:mr,getPrototypeOf:gr}=Object,Pe=globalThis,At=Pe.trustedTypes,vr=At?At.emptyScript:"",br=Pe.reactiveElementPolyfillSupport,ue=(t,e)=>t,pe={toAttribute(t,e){switch(e){case Boolean:t=t?vr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Oe=(t,e)=>!ur(t,e),Ct={attribute:!0,type:String,converter:pe,reflect:!1,useDefault:!1,hasChanged:Oe};Symbol.metadata??=Symbol("metadata"),Pe.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Ct){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,r);s!==void 0&&pr(this.prototype,e,s)}}static getPropertyDescriptor(e,r,o){let{get:s,set:i}=hr(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:s,set(n){let u=s?.call(this);i?.call(this,n),this.requestUpdate(e,u,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ct}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;let e=gr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){let r=this.properties,o=[...fr(r),...mr(r)];for(let s of o)this.createProperty(s,r[s])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)r.unshift(Xe(s))}else e!==void 0&&r.push(Xe(e));return r}static _$Eu(e,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Et(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,r,o){this._$AK(e,o)}_$ET(e,r){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:pe).toAttribute(r,o.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,r){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:pe;this._$Em=s;let u=n.fromAttribute(r,i.type);this[s]=u??this._$Ej?.get(s)??u,this._$Em=null}}requestUpdate(e,r,o){if(e!==void 0){let s=this.constructor,i=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??Oe)(i,r)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,u=this[s];n!==!0||this._$AL.has(s)||u===void 0||this.C(s,void 0,i,u)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[ue("elementProperties")]=new Map,R[ue("finalized")]=new Map,br?.({ReactiveElement:R}),(Pe.reactiveElementVersions??=[]).push("2.1.1");var et=globalThis,Re=et.trustedTypes,kt=Re?Re.createPolicy("lit-html",{createHTML:t=>t}):void 0,tt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,rt="?"+L,xr=`<${rt}>`,B=document,fe=()=>B.createComment(""),me=t=>t===null||typeof t!="object"&&typeof t!="function",ot=Array.isArray,Lt=t=>ot(t)||typeof t?.[Symbol.iterator]=="function",Ye=`[ 	
\f\r]`,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nt=/-->/g,Tt=/>/g,q=RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pt=/'/g,Ot=/"/g,Ut=/^(?:script|style|textarea|title)$/i,st=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),c=st(1),Mt=st(2),ao=st(3),U=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),Rt=new WeakMap,j=B.createTreeWalker(B,129);function It(t,e){if(!ot(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return kt!==void 0?kt.createHTML(e):e}var Dt=(t,e)=>{let r=t.length-1,o=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=he;for(let u=0;u<r;u++){let l=t[u],d,f,h=-1,A=0;for(;A<l.length&&(n.lastIndex=A,f=n.exec(l),f!==null);)A=n.lastIndex,n===he?f[1]==="!--"?n=Nt:f[1]!==void 0?n=Tt:f[2]!==void 0?(Ut.test(f[2])&&(s=RegExp("</"+f[2],"g")),n=q):f[3]!==void 0&&(n=q):n===q?f[0]===">"?(n=s??he,h=-1):f[1]===void 0?h=-2:(h=n.lastIndex-f[2].length,d=f[1],n=f[3]===void 0?q:f[3]==='"'?Ot:Pt):n===Ot||n===Pt?n=q:n===Nt||n===Tt?n=he:(n=q,s=void 0);let v=n===q&&t[u+1].startsWith("/>")?" ":"";i+=n===he?l+xr:h>=0?(o.push(d),l.slice(0,h)+tt+l.slice(h)+L+v):l+L+(h===-2?u:v)}return[It(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ge=class t{constructor({strings:e,_$litType$:r},o){let s;this.parts=[];let i=0,n=0,u=e.length-1,l=this.parts,[d,f]=Dt(e,r);if(this.el=t.createElement(d,o),j.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=j.nextNode())!==null&&l.length<u;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(tt)){let A=f[n++],v=s.getAttribute(h).split(L),S=/([.?@])?(.*)/.exec(A);l.push({type:1,index:i,name:S[2],strings:v,ctor:S[1]==="."?Ue:S[1]==="?"?Me:S[1]==="@"?Ie:V}),s.removeAttribute(h)}else h.startsWith(L)&&(l.push({type:6,index:i}),s.removeAttribute(h));if(Ut.test(s.tagName)){let h=s.textContent.split(L),A=h.length-1;if(A>0){s.textContent=Re?Re.emptyScript:"";for(let v=0;v<A;v++)s.append(h[v],fe()),j.nextNode(),l.push({type:2,index:++i});s.append(h[A],fe())}}}else if(s.nodeType===8)if(s.data===rt)l.push({type:2,index:i});else{let h=-1;for(;(h=s.data.indexOf(L,h+1))!==-1;)l.push({type:7,index:i}),h+=L.length-1}i++}}static createElement(e,r){let o=B.createElement("template");return o.innerHTML=e,o}};function F(t,e,r=t,o){if(e===U)return e;let s=o!==void 0?r._$Co?.[o]:r._$Cl,i=me(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(e=F(t,s._$AS(t,e.values),s,o)),e}var Le=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:o}=this._$AD,s=(e?.creationScope??B).importNode(r,!0);j.currentNode=s;let i=j.nextNode(),n=0,u=0,l=o[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new ee(i,i.nextSibling,this,e):l.type===1?d=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(d=new De(i,this,e)),this._$AV.push(d),l=o[++u]}n!==l?.index&&(i=j.nextNode(),n++)}return j.currentNode=B,s}p(e){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,r),r+=o.strings.length-2):o._$AI(e[r])),r++}},ee=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,s){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=F(this,e,r),me(e)?e===E||e==null||e===""?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Lt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&me(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ge.createElement(It(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new Le(s,this),n=i.u(this.options);i.p(r),this.T(n),this._$AH=i}}_$AC(e){let r=Rt.get(e.strings);return r===void 0&&Rt.set(e.strings,r=new ge(e)),r}k(e){ot(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let i of e)s===r.length?r.push(o=new t(this.O(fe()),this.O(fe()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},V=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,o,s,i){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=E}_$AI(e,r=this,o,s){let i=this.strings,n=!1;if(i===void 0)e=F(this,e,r,0),n=!me(e)||e!==this._$AH&&e!==U,n&&(this._$AH=e);else{let u=e,l,d;for(e=i[0],l=0;l<i.length-1;l++)d=F(this,u[o+l],r,l),d===U&&(d=this._$AH[l]),n||=!me(d)||d!==this._$AH[l],d===E?e=E:e!==E&&(e+=(d??"")+i[l+1]),this._$AH[l]=d}n&&!s&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ue=class extends V{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}},Me=class extends V{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}},Ie=class extends V{constructor(e,r,o,s,i){super(e,r,o,s,i),this.type=5}_$AI(e,r=this){if((e=F(this,e,r,0)??E)===U)return;let o=this._$AH,s=e===E&&o!==E||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==E&&(o===E||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},De=class{constructor(e,r,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}},Wt={M:tt,P:L,A:rt,C:1,L:Dt,R:Le,D:Lt,V:F,I:ee,H:V,N:Me,U:Ie,B:Ue,F:De},$r=et.litHtmlPolyfillSupport;$r?.(ge,ee),(et.litHtmlVersions??=[]).push("3.3.1");var zt=(t,e,r)=>{let o=r?.renderBefore??e,s=o._$litPart$;if(s===void 0){let i=r?.renderBefore??null;o._$litPart$=s=new ee(e.insertBefore(fe(),i),i,void 0,r??{})}return s._$AI(t),s};var it=globalThis,g=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=zt(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};g._$litElement$=!0,g.finalized=!0,it.litElementHydrateSupport?.({LitElement:g});var yr=it.litElementPolyfillSupport;yr?.({LitElement:g});(it.litElementVersions??=[]).push("4.2.1");var x=t=>(e,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var wr={attribute:!0,type:String,converter:pe,reflect:!1,hasChanged:Oe},_r=(t=wr,e,r)=>{let{kind:o,metadata:s}=r,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){let{name:n}=r;return{set(u){let l=e.get.call(this);e.set.call(this,u),this.requestUpdate(n,l,t)},init(u){return u!==void 0&&this.C(n,void 0,t,u),u}}}if(o==="setter"){let{name:n}=r;return function(u){let l=this[n];e.call(this,u),this.requestUpdate(n,l,t)}}throw Error("Unsupported decorator location: "+o)};function p(t){return(e,r)=>typeof r=="object"?_r(t,e,r):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}function W(t){return p({...t,state:!0,attribute:!1})}var K=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);function Ht(t,e){return(r,o,s)=>{let i=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:u}=typeof o=="object"?r:s??(()=>{let l=Symbol();return{get(){return this[l]},set(d){this[l]=d}}})();return K(r,o,{get(){let l=n.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&u.call(this,l)),l}})}return K(r,o,{get(){return i(this)}})}}var Sr=Object.defineProperty,Er=(t,e,r)=>e in t?Sr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,nt=(t,e,r)=>(Er(t,typeof e!="symbol"?e+"":e,r),r),Ar=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},at=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},We=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},qt=(t,e,r)=>(Ar(t,e,"access private method"),r);function jt(t,e){return Object.is(t,e)}var _=null,ve=!1,ze=1,He=Symbol("SIGNAL");function te(t){let e=_;return _=t,e}function Cr(){return _}function kr(){return ve}var pt={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function qe(t){if(ve)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(_===null)return;_.consumerOnSignalRead(t);let e=_.nextProducerIndex++;if(re(_),e<_.producerNode.length&&_.producerNode[e]!==t&&dt(_)){let r=_.producerNode[e];je(r,_.producerIndexOfThis[e])}_.producerNode[e]!==t&&(_.producerNode[e]=t,_.producerIndexOfThis[e]=dt(_)?Vt(t,_,e):0),_.producerLastReadVersion[e]=t.version}function Nr(){ze++}function Bt(t){if(!(!t.dirty&&t.lastCleanEpoch===ze)){if(!t.producerMustRecompute(t)&&!Lr(t)){t.dirty=!1,t.lastCleanEpoch=ze;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=ze}}function Ft(t){if(t.liveConsumerNode===void 0)return;let e=ve;ve=!0;try{for(let r of t.liveConsumerNode)r.dirty||Pr(r)}finally{ve=e}}function Tr(){return _?.consumerAllowSignalWrites!==!1}function Pr(t){var e;t.dirty=!0,Ft(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function Or(t){return t&&(t.nextProducerIndex=0),te(t)}function Rr(t,e){if(te(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(dt(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)je(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function Lr(t){re(t);for(let e=0;e<t.producerNode.length;e++){let r=t.producerNode[e],o=t.producerLastReadVersion[e];if(o!==r.version||(Bt(r),o!==r.version))return!0}return!1}function Vt(t,e,r){var o;if(ht(t),re(t),t.liveConsumerNode.length===0){(o=t.watched)==null||o.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)t.producerIndexOfThis[s]=Vt(t.producerNode[s],t,s)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(e)-1}function je(t,e){var r;if(ht(t),re(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(r=t.unwatched)==null||r.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)je(t.producerNode[s],t.producerIndexOfThis[s])}let o=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[o],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[o],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let s=t.liveConsumerIndexOfThis[e],i=t.liveConsumerNode[e];re(i),i.producerIndexOfThis[s]=e}}function dt(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function re(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function ht(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function Kt(t){if(Bt(t),qe(t),t.value===ut)throw t.error;return t.value}function Ur(t){let e=Object.create(Mr);e.computation=t;let r=()=>Kt(e);return r[He]=e,r}var lt=Symbol("UNSET"),ct=Symbol("COMPUTING"),ut=Symbol("ERRORED"),Mr={...pt,value:lt,dirty:!0,error:null,equal:jt,producerMustRecompute(t){return t.value===lt||t.value===ct},producerRecomputeValue(t){if(t.value===ct)throw new Error("Detected cycle in computations.");let e=t.value;t.value=ct;let r=Or(t),o,s=!1;try{o=t.computation.call(t.wrapper),s=e!==lt&&e!==ut&&t.equal.call(t.wrapper,e,o)}catch(i){o=ut,t.error=i}finally{Rr(t,r)}if(s){t.value=e;return}t.value=o,t.version++}};function Ir(){throw new Error}var Dr=Ir;function Wr(){Dr()}function zr(t){let e=Object.create(jr);e.value=t;let r=()=>(qe(e),e.value);return r[He]=e,r}function Hr(){return qe(this),this.value}function qr(t,e){Tr()||Wr(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,Br(t))}var jr={...pt,equal:jt,value:void 0};function Br(t){t.version++,Nr(),Ft(t)}var C=Symbol("node"),y;(t=>{var e,r,o,s,i,n;class u{constructor(f,h={}){We(this,r),nt(this,e);let v=zr(f)[He];if(this[C]=v,v.wrapper=this,h){let S=h.equals;S&&(v.equal=S),v.watched=h[t.subtle.watched],v.unwatched=h[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Hr.call(this[C])}set(f){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(kr())throw new Error("Writes to signals not permitted during Watcher callback");let h=this[C];qr(h,f)}}e=C,r=new WeakSet,o=function(){},t.isState=d=>typeof d=="object"&&at(r,d),t.State=u;class l{constructor(f,h){We(this,i),nt(this,s);let v=Ur(f)[He];if(v.consumerAllowSignalWrites=!0,this[C]=v,v.wrapper=this,h){let S=h.equals;S&&(v.equal=S),v.watched=h[t.subtle.watched],v.unwatched=h[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Kt(this[C])}}s=C,i=new WeakSet,n=function(){},t.isComputed=d=>typeof d=="object"&&at(i,d),t.Computed=l,(d=>{var f,h,A,v,S;function Ce(w){let $,m=null;try{m=te(null),$=w()}finally{te(m)}return $}d.untrack=Ce;function Y(w){var $;if(!(0,t.isComputed)(w)&&!(0,t.isWatcher)(w))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(($=w[C].producerNode)==null?void 0:$.map(m=>m.wrapper))??[]}d.introspectSources=Y;function or(w){var $;if(!(0,t.isComputed)(w)&&!(0,t.isState)(w))throw new TypeError("Called introspectSinks without a Signal argument");return(($=w[C].liveConsumerNode)==null?void 0:$.map(m=>m.wrapper))??[]}d.introspectSinks=or;function sr(w){if(!(0,t.isComputed)(w)&&!(0,t.isState)(w))throw new TypeError("Called hasSinks without a Signal argument");let $=w[C].liveConsumerNode;return $?$.length>0:!1}d.hasSinks=sr;function ir(w){if(!(0,t.isComputed)(w)&&!(0,t.isWatcher)(w))throw new TypeError("Called hasSources without a Computed or Watcher argument");let $=w[C].producerNode;return $?$.length>0:!1}d.hasSources=ir;class nr{constructor($){We(this,h),We(this,v),nt(this,f);let m=Object.create(pt);m.wrapper=this,m.consumerMarkedDirty=$,m.consumerIsAlwaysLive=!0,m.consumerAllowSignalWrites=!1,m.producerNode=[],this[C]=m}watch(...$){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");qt(this,v,S).call(this,$);let m=this[C];m.dirty=!1;let k=te(m);for(let ke of $)qe(ke[C]);te(k)}unwatch(...$){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");qt(this,v,S).call(this,$);let m=this[C];re(m);for(let k=m.producerNode.length-1;k>=0;k--)if($.includes(m.producerNode[k].wrapper)){je(m.producerNode[k],m.producerIndexOfThis[k]);let ke=m.producerNode.length-1;if(m.producerNode[k]=m.producerNode[ke],m.producerIndexOfThis[k]=m.producerIndexOfThis[ke],m.producerNode.length--,m.producerIndexOfThis.length--,m.nextProducerIndex--,k<m.producerNode.length){let lr=m.producerIndexOfThis[k],wt=m.producerNode[k];ht(wt),wt.liveConsumerIndexOfThis[lr]=k}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[C].producerNode.filter(m=>m.dirty).map(m=>m.wrapper)}}f=C,h=new WeakSet,A=function(){},v=new WeakSet,S=function(w){for(let $ of w)if(!(0,t.isComputed)($)&&!(0,t.isState)($))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=w=>at(h,w),d.Watcher=nr;function ar(){var w;return(w=Cr())==null?void 0:w.wrapper}d.currentComputed=ar,d.watched=Symbol("watched"),d.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(y||(y={}));var ft=!1,Qt=new y.subtle.Watcher(()=>{ft||(ft=!0,queueMicrotask(()=>{ft=!1;for(let t of Qt.getPending())t.get();Qt.watch()}))}),Fr=Symbol("SignalWatcherBrand"),Vr=new FinalizationRegistry(t=>{t.unwatch(...y.subtle.introspectSources(t))}),Gt=new WeakMap;function be(t){return t[Fr]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new y.State(0),this._$Si=!1}_$Sl(){var e,r;let o=[],s=[];this._$St.forEach((n,u)=>{(n?.beforeUpdate?o:s).push(u)});let i=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));o.forEach(n=>n.get()),(r=this._$Su)===null||r===void 0||r.get(),i.forEach(n=>n.get()),s.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new y.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new y.subtle.Watcher(function(){let r=Gt.get(this);r!==void 0&&(r._$Si===!1&&(new Set(this.getPending()).has(r._$Su)?r.requestUpdate():r._$Sv()),this.watch())});Gt.set(e,this),Vr.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([r])=>r))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...y.subtle.introspectSources(this.h).filter(r=>{var o;let s=((o=this._$St.get(r))===null||o===void 0?void 0:o.manualDispose)!==!0;return s&&this._$St.delete(r),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,r){var o;this._$S_();let s=new y.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,r),(o=r?.beforeUpdate)!==null&&o!==void 0&&o?y.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>y.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var Be={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},xe=t=>(...e)=>({_$litDirective$:t,values:e}),oe=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,o){this._$Ct=e,this._$AM=r,this._$Ci=o}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var{I:rs}=Wt;var Jt=t=>t.strings===void 0;var $e=(t,e)=>{let r=t._$AN;if(r===void 0)return!1;for(let o of r)o._$AO?.(e,!1),$e(o,e);return!0},Fe=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while(r?.size===0)},Zt=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),Gr(e)}};function Kr(t){this._$AN!==void 0?(Fe(this),this._$AM=t,Zt(this)):this._$AM=t}function Qr(t,e=!1,r=0){let o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let i=r;i<o.length;i++)$e(o[i],!1),Fe(o[i]);else o!=null&&($e(o,!1),Fe(o));else $e(this,t)}var Gr=t=>{t.type==Be.CHILD&&(t._$AP??=Qr,t._$AQ??=Kr)},Ve=class extends oe{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,o){super._$AT(e,r,o),Zt(this),this.isConnected=e._$AU}_$AO(e,r=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),r&&($e(this,e),Fe(this))}setValue(e){if(Jt(this._$Ct))this._$Ct._$AI(e,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};var mt=!1,gt=new y.subtle.Watcher(async()=>{mt||(mt=!0,queueMicrotask(()=>{mt=!1;for(let t of gt.getPending())t.get();gt.watch()}))}),Ke=class extends Ve{_$S_(){var e,r;this._$Sm===void 0&&(this._$Sj=new y.Computed(()=>{var o;let s=(o=this._$SW)===null||o===void 0?void 0:o.get();return this.setValue(s),s}),this._$Sm=(r=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&r!==void 0?r:gt,this._$Sm.watch(this._$Sj),y.subtle.untrack(()=>{var o;return(o=this._$Sj)===null||o===void 0?void 0:o.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return y.subtle.untrack(()=>e.get())}update(e,[r]){var o,s;return(o=this._$Sk)!==null&&o!==void 0||(this._$Sk=(s=e.options)===null||s===void 0?void 0:s.host),r!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=r,this._$S_(),y.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},vt=xe(Ke);var bt=t=>(e,...r)=>t(e,...r.map(o=>o instanceof y.State||o instanceof y.Computed?vt(o):o)),Jr=bt(c),Zr=bt(Mt);var ys=y.State,ws=y.Computed,M=(t,e)=>new y.State(t,e),Qe=(t,e)=>new y.Computed(t,e);var Xr=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function Xt(t,e=""){for(let{pattern:r,name:o}of Xr){let s=r.exec(t);if(s)return{name:o,path:s[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var z=M(Xt(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{z.set(Xt(window.location.pathname,window.location.search))});var Yr=new Set(["file","-file","path","-path","repo","-repo","tags","-tags","case","lit","max_matches"]);function Yt(t){let e={},r="",o="",s="",i=t.trim(),n=/\[|\(|(?:^([a-zA-Z0-9\-_]+):|\\.)| /,u=!0;for(;i.length>0;){let d=n.exec(i);if(d===null){s+=i;break}s+=i.slice(0,d.index);let f=d[0];if(i=i.slice(d.index+f.length),u=u&&d.index===0,f===" ")o===""?s+=" ":(xt(e,o,s),o="",s="");else if(f==="("||f==="["){let h=f==="("?")":"]",A=1,v=0,S=!1,Ce="";for(;v<i.length&&A>0;){let Y=i[v];v++,S?S=!1:Y==="\\"?S=!0:Y===f?A++:Y===h&&A--,Ce+=Y}s+=f+Ce,i=i.slice(v)}else if(f.startsWith("\\"))s+=f;else{let h=d[1];o===""&&h&&Yr.has(h)?(s.trim()!==""&&xt(e,o,s),s="",o=h):s+=f}u=f===" "}xt(e,o,s);let l=e[""]||[];return delete e[""],r=l.join(" ").trim(),{line:r,operators:e}}function xt(t,e,r){t[e]||(t[e]=[]),t[e].push(r)}function er(t,e={},r={}){let o=new URLSearchParams;t.trim()&&o.set("q",t.trim()),e.literal&&o.set("literal","true"),e.caseSensitive&&o.set("fold_case","false");for(let[s,i]of Object.entries(r))for(let n of i)o.append(s,n);return o}async function tr(t,e,r){let o="/api/search?"+t.toString(),s=await fetch(o,{signal:r});if(!s.ok){let i=await s.text();throw new Error(`search failed (${s.status}): ${i}`)}if(!s.body)throw new Error("response has no body");await eo(s.body,i=>{switch(i.type){case"result":e.onResult?.(i);break;case"file":e.onFile?.(i);break;case"facets":e.onFacets?.(i);break;case"done":e.onDone?.(i);break}})}async function eo(t,e){let r=t.getReader(),o=new TextDecoder,s="";try{for(;;){let{done:n,value:u}=await r.read();if(n)break;s+=o.decode(u,{stream:!0});let l;for(;(l=s.indexOf(`
`))!==-1;){let d=s.slice(0,l).trim();s=s.slice(l+1),d.length!==0&&e(JSON.parse(d))}}s+=o.decode();let i=s.trim();i.length>0&&e(JSON.parse(i))}finally{r.releaseLock()}}function rr(t){let e=t.indexOf("/+/");if(e===-1)return{repo:t,version:"",filePath:""};let r=t.slice(0,e),o=t.slice(e+3),s=r.indexOf("/");return s===-1?{repo:r,version:"",filePath:o}:{repo:r.slice(0,s),version:r.slice(s+1),filePath:o}}var ae=Qe(()=>z.get().params.get("q")??""),Ds=Qe(()=>{let t=z.get().params;return{literal:t.get("literal")==="true",caseSensitive:t.get("fold_case")==="false"}}),Ws=Qe(()=>Yt(ae.get())),se=M([]),ie=M([]),we=M(null),_e=M(null),Q=M(!1),ne=M(null),$t=null;async function to(){$t&&$t.abort();let t=new AbortController;if($t=t,!ae.get()){se.set([]),ie.set([]),we.set(null),_e.set(null),Q.set(!1),ne.set(null);return}let r=z.get(),o=new URLSearchParams(r.params);Q.set(!0),ne.set(null),se.set([]),ie.set([]),we.set(null),_e.set(null);try{await tr(o,{onResult(s){se.set([...se.get(),s])},onFile(s){ie.set([...ie.get(),s])},onFacets(s){we.set(s)},onDone(s){_e.set(s),Q.set(!1)},onError(s){t.signal.aborted||(ne.set(s.message),Q.set(!1))}},t.signal)}catch(s){t.signal.aborted||(ne.set(s instanceof Error?s.message:String(s)),Q.set(!1))}}var Ge=null,ye="";function Je(t,e={},r={}){Ge&&clearTimeout(Ge);let o=er(t,e,r),s=t!==ye,i=o.toString(),n="/search"+(i?"?"+i:"");s&&ye!==""?(history.pushState(null,"",n),ye=t):(history.replaceState(null,"",n),ye===""&&(ye=t)),z.set({name:"search",params:o}),Ge=setTimeout(()=>{Ge=null,to()},100)}var T=class extends g{constructor(){super(...arguments);this.value="";this.debounce=100;this.placeholder="Search code...";this.error="";this.timer=null}render(){return c`
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
        ${this.error?c`<div class="error">${this.error}</div>`:""}
      </div>
    `}onInput(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:this.input.value},bubbles:!0,composed:!0}))},this.debounce)}onKeydown(r){r.key==="Enter"&&(this.timer&&clearTimeout(this.timer),this.timer=null,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:this.input.value},bubbles:!0,composed:!0})))}focus(){this.input?.focus()}};T.styles=b`
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
  `,a([p()],T.prototype,"value",2),a([p({type:Number})],T.prototype,"debounce",2),a([p()],T.prototype,"placeholder",2),a([p()],T.prototype,"error",2),a([Ht("input")],T.prototype,"input",2),T=a([x("cs-search-input")],T);var G=class extends g{constructor(){super(...arguments);this.caseSensitive=!1;this.literal=!1}render(){return c`
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
    `}toggleCase(){this.caseSensitive=!this.caseSensitive,this.fireChange()}toggleLiteral(){this.literal=!this.literal,this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:{caseSensitive:this.caseSensitive,literal:this.literal},bubbles:!0,composed:!0}))}};G.styles=b`
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
  `,a([p({type:Boolean})],G.prototype,"caseSensitive",2),a([p({type:Boolean})],G.prototype,"literal",2),G=a([x("cs-search-options")],G);var J=class extends g{constructor(){super(...arguments);this.lines=[];this.baseHref=""}render(){return c`${this.lines.map(r=>this.renderLine(r))}`}renderLine(r){let o=r[0],s=r[1],i=r.length>2?r[2]:void 0,n=i!==void 0&&i.length>0,u=this.baseHref?`${this.baseHref}#L${o}`:`#L${o}`;return c`
      <div class="line ${n?"match":""}">
        <a class="lno" href=${u}>${o}</a>
        <span class="code">${n?this.highlightText(s,i):s}</span>
      </div>
    `}highlightText(r,o){let s=[],i=0;for(let[n,u]of o)n>i&&s.push(r.slice(i,n)),s.push(c`<span class="hl">${r.slice(n,u)}</span>`),i=u;return i<r.length&&s.push(r.slice(i)),s}};J.styles=b`
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
  `,a([p({type:Array})],J.prototype,"lines",2),a([p()],J.prototype,"baseHref",2),J=a([x("cs-match-range")],J);var le=class extends g{render(){let{repo:e,version:r,filePath:o}=rr(this.result.path),s=`/view/${this.result.path}`,i=this.splitGroups(this.result.lines);return c`
      <div class="result-group">
        <div class="header">
          <a class="path" href=${s}>
            <span class="repo">${e}:</span><span class="version">${r}:</span>${o}
          </a>
        </div>
        ${i.map((n,u)=>c`
          ${u>0?c`<div class="separator"></div>`:""}
          <cs-match-range .lines=${n} baseHref=${s}></cs-match-range>
        `)}
      </div>
    `}splitGroups(e){let r=[],o=[];for(let s of e)s===null?o.length>0&&(r.push(o),o=[]):o.push(s);return o.length>0&&r.push(o),r}};le.styles=b`
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
  `,a([p({type:Object})],le.prototype,"result",2),le=a([x("cs-result-group")],le);var I=class extends g{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return c`<div class="stats">Searching...</div>`;let r=this.truncated?`${this.total}+ results`:`${this.total} result${this.total!==1?"s":""}`;return c`<div class="stats">${r} in ${this.timeMs}ms</div>`}};I.styles=b`
    .stats {
      font-size: 12px;
      color: var(--color-foreground-muted);
      padding: 4px 0;
    }
  `,a([p({type:Number})],I.prototype,"total",2),a([p({type:Number})],I.prototype,"timeMs",2),a([p({type:Boolean})],I.prototype,"truncated",2),a([p({type:Boolean})],I.prototype,"loading",2),I=a([x("cs-result-stats")],I);var Z=class extends g{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){if(!this.facets)return"";let r=[{label:"Extension",key:"f.ext",buckets:this.facets.ext},{label:"Repository",key:"f.repo",buckets:this.facets.repo},{label:"Path",key:"f.path",buckets:this.facets.path}].filter(o=>o.buckets&&o.buckets.length>0);return r.length===0?"":c`
      <div class="facet-panel">
        ${r.map(o=>this.renderSection(o.label,o.key,o.buckets))}
      </div>
    `}renderSection(r,o,s){let i=new Set(this.selected[o]??[]);return c`
      <div class="section">
        <div class="section-label">${r}</div>
        ${s.slice(0,10).map(n=>c`
          <button
            class=${i.has(n.v)?"active":""}
            @click=${()=>this.onSelect(o,n.v)}
          >${n.v} <span class="count">${n.c}</span></button>
        `)}
      </div>
    `}onSelect(r,o){this.dispatchEvent(new CustomEvent("facet-select",{detail:{key:r,value:o},bubbles:!0,composed:!0}))}};Z.styles=b`
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
  `,a([p({type:Object})],Z.prototype,"facets",2),a([p({type:Object})],Z.prototype,"selected",2),Z=a([x("cs-facet-panel")],Z);var yt=xe(class extends oe{constructor(t){if(super(t),t.type!==Be.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let r=t.element.classList;for(let o of this.st)o in e||(r.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return U}});var H=class extends g{render(){return this.start!=null&&this.end!=null?c`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:c`${this.text}`}};H.styles=b`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,a([p()],H.prototype,"text",2),a([p({type:Number})],H.prototype,"start",2),a([p({type:Number})],H.prototype,"end",2),H=a([x("match-str")],H);var N=class extends g{render(){return c`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};N.styles=b`
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
    `,a([p()],N.prototype,"text",2),a([p()],N.prototype,"href",2),a([p({type:Number})],N.prototype,"start",2),a([p({type:Number})],N.prototype,"end",2),a([p()],N.prototype,"repo",2),a([p()],N.prototype,"version",2),N=a([x("filename-match")],N);var P=class extends g{render(){let e=this.start!=null&&this.end!=null;return c`<a class=${yt({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${yt({matchline:e})}
                >${e?c`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};P.styles=b`
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
    `,a([p({type:Number})],P.prototype,"lineNo",2),a([p()],P.prototype,"text",2),a([p()],P.prototype,"href",2),a([p({type:Number})],P.prototype,"start",2),a([p({type:Number})],P.prototype,"end",2),P=a([x("match-line")],P);var Se=class extends g{render(){return c`
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
    `}};Se.styles=b`
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
  `,Se=a([x("cs-search-help")],Se);var Ee=class extends be(g){constructor(){super(...arguments);this.currentOptions={};this.currentFacets={}}render(){let r=ae.get(),o=se.get(),s=ie.get(),i=_e.get(),n=Q.get(),u=ne.get(),l=we.get();return c`
      <div class="search-view">
        <div class="controls">
          <cs-search-input
            .value=${r}
            .error=${u??""}
            @search-input=${this.onSearchInput}
          ></cs-search-input>
          <cs-search-options
            .caseSensitive=${this.currentOptions.caseSensitive??!1}
            .literal=${this.currentOptions.literal??!1}
            @options-change=${this.onOptionsChange}
          ></cs-search-options>
        </div>

        ${r?"":c`<cs-search-help></cs-search-help>`}

        ${i||n?c`
          <cs-result-stats
            .total=${i?.total??0}
            .timeMs=${i?.time_ms??0}
            .truncated=${i?.truncated??!1}
            .loading=${n}
          ></cs-result-stats>
        `:""}

        ${l?c`
          <cs-facet-panel
            .facets=${l}
            .selected=${this.currentFacets}
            @facet-select=${this.onFacetSelect}
          ></cs-facet-panel>
        `:""}

        ${s.length>0?c`
          <div class="file-results">
            ${s.map(d=>c`
              <filename-match
                text=${d.path}
                href="/view/${d.path}"
                start=${d.match[0]}
                end=${d.match[1]}
              ></filename-match>
            `)}
          </div>
        `:""}

        ${o.length>0?c`
          <div class="code-results">
            ${o.map(d=>c`
              <cs-result-group .result=${d}></cs-result-group>
            `)}
          </div>
        `:""}
      </div>
    `}onSearchInput(r){Je(r.detail.value,this.currentOptions,this.currentFacets)}onOptionsChange(r){this.currentOptions=r.detail;let o=ae.get();o&&Je(o,this.currentOptions,this.currentFacets)}onFacetSelect(r){let{key:o,value:s}=r.detail,i=this.currentFacets[o]??[];i.indexOf(s)>=0?this.currentFacets={...this.currentFacets,[o]:i.filter(l=>l!==s)}:this.currentFacets={...this.currentFacets,[o]:[...i,s]};let u=ae.get();u&&Je(u,this.currentOptions,this.currentFacets)}};Ee.styles=b`
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
  `,Ee=a([x("cs-search-view")],Ee);var ce=class extends g{constructor(){super(...arguments);this.path=""}render(){let r=this.path.indexOf("/+/");if(r===-1)return c`<span>${this.path}</span>`;let o=this.path.slice(0,r),i=this.path.slice(r+3).split("/").filter(n=>n.length>0);return c`
      <nav class="breadcrumbs">
        <a href="/view/${o}/+/">${o}</a>
        ${i.map((n,u)=>{let l=i.slice(0,u+1).join("/"),d=`/view/${o}/+/${l}${u<i.length-1?"/":""}`;return c`<span class="sep">/</span><a href=${d}>${n}</a>`})}
      </nav>
    `}};ce.styles=b`
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
  `,a([p()],ce.prototype,"path",2),ce=a([x("cs-breadcrumbs")],ce);var X=class extends g{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let r=[...this.entries].sort((o,s)=>{let i=o.endsWith("/"),n=s.endsWith("/");return i!==n?i?-1:1:o.localeCompare(s)});return c`
      <div class="listing">
        ${r.map(o=>{let s=o.endsWith("/"),i=this.basePath+o;return c`
            <a class=${s?"dir":"file"} href=${i}>${o}</a>
          `})}
      </div>
    `}};X.styles=b`
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
  `,a([p({type:Array})],X.prototype,"entries",2),a([p()],X.prototype,"basePath",2),X=a([x("cs-dir-listing")],X);var D=class extends g{constructor(){super(...arguments);this.content="";this.basePath="";this.selectedStart=-1;this.selectedEnd=-1;this.onHashChange=()=>this.parseHash()}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange)}parseHash(){let o=window.location.hash.match(/^#L(\d+)(?:-L?(\d+))?$/);o?(this.selectedStart=parseInt(o[1],10),this.selectedEnd=o[2]?parseInt(o[2],10):this.selectedStart):(this.selectedStart=-1,this.selectedEnd=-1)}render(){let r=this.content.split(`
`);return r.length>0&&r[r.length-1]===""&&r.pop(),c`
      <div class="viewer">
        ${r.map((o,s)=>{let i=s+1,n=i>=this.selectedStart&&i<=this.selectedEnd;return c`
            <div class="line ${n?"selected":""}">
              <a class="lno" href="#L${i}" @click=${u=>this.onLineClick(u,i)}>${i}</a>
              <span class="code">${o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(r,o){if(r.shiftKey&&this.selectedStart>0){r.preventDefault();let s=Math.min(this.selectedStart,o),i=Math.max(this.selectedStart,o);this.selectedStart=s,this.selectedEnd=i,window.location.hash=`#L${s}-L${i}`}else this.selectedStart=o,this.selectedEnd=o}};D.styles=b`
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
  `,a([p()],D.prototype,"content",2),a([p()],D.prototype,"basePath",2),a([W()],D.prototype,"selectedStart",2),a([W()],D.prototype,"selectedEnd",2),D=a([x("cs-code-viewer")],D);var O=class extends g{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.loading=!0;this.error=null}willUpdate(r){r.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null;let r=this.path.endsWith("/")||this.path.endsWith("/+/")||!this.path.includes("/+/"),o=`/raw/${this.path}${r&&!this.path.endsWith("/")?"/":""}`;try{let s=await fetch(o);if(!s.ok){this.error=`Not found (${s.status})`,this.loading=!1;return}(s.headers.get("Content-Type")??"").includes("application/json")?this.dirEntries=await s.json():this.content=await s.text()}catch(s){this.error=s instanceof Error?s.message:String(s)}this.loading=!1}render(){return c`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading?c`<div class="status">Loading...</div>`:""}
        ${this.error?c`<div class="status error">${this.error}</div>`:""}

        ${this.dirEntries?c`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith("/")?"":"/"}"
          ></cs-dir-listing>
        `:""}

        ${this.content!==null?c`
          <cs-code-viewer .content=${this.content}></cs-code-viewer>
        `:""}
      </div>
    `}};O.styles=b`
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
  `,a([p()],O.prototype,"path",2),a([W()],O.prototype,"content",2),a([W()],O.prototype,"dirEntries",2),a([W()],O.prototype,"loading",2),a([W()],O.prototype,"error",2),O=a([x("cs-file-view")],O);var Ae=class extends be(g){render(){let e=z.get();switch(e.name){case"search":return c`<cs-search-view></cs-search-view>`;case"view":return c`<cs-file-view .path=${e.path??""}></cs-file-view>`;case"about":return c`<div class="placeholder">About (Phase 4)</div>`;default:return c`<div class="placeholder">Not found</div>`}}};Ae.styles=b`
    :host {
      display: block;
    }
  `,Ae=a([x("cs-app")],Ae);export{Ae as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
