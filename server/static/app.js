import{c}from"./chunk-NVALI5VU.js";var Bt=globalThis,Vt=Bt.ShadowRoot&&(Bt.ShadyCSS===void 0||Bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$e=Symbol(),Ye=new WeakMap,_t=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==$e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Vt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Ye.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ye.set(e,t))}return t}toString(){return this.cssText}},lt=r=>new _t(typeof r=="string"?r:r+"",void 0,$e),g=(r,...t)=>{let e=r.length===1?r[0]:t.reduce(((s,o,i)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[i+1]),r[0]);return new _t(e,r,$e)},Xe=(r,t)=>{if(Vt)r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let s=document.createElement("style"),o=Bt.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,r.appendChild(s)}},Se=Vt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return lt(e)})(r):r;var{is:Qr,defineProperty:Zr,getOwnPropertyDescriptor:Yr,getOwnPropertyNames:Xr,getOwnPropertySymbols:ts,getPrototypeOf:es}=Object,Ft=globalThis,tr=Ft.trustedTypes,rs=tr?tr.emptyScript:"",ss=Ft.reactiveElementPolyfillSupport,bt=(r,t)=>r,yt={toAttribute(r,t){switch(t){case Boolean:r=r?rs:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Kt=(r,t)=>!Qr(r,t),er={attribute:!0,type:String,converter:yt,reflect:!1,useDefault:!1,hasChanged:Kt};Symbol.metadata??=Symbol("metadata"),Ft.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=er){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&Zr(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){let{get:o,set:i}=Yr(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){let h=o?.call(this);i?.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??er}static _$Ei(){if(this.hasOwnProperty(bt("elementProperties")))return;let t=es(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(bt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(bt("properties"))){let e=this.properties,s=[...Xr(e),...ts(e)];for(let o of s)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let o of s)e.unshift(Se(o))}else t!==void 0&&e.push(Se(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Xe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:yt).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){let s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let i=s.getPropertyOptions(o),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:yt;this._$Em=o;let h=n.fromAttribute(e,i.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){let o=this.constructor,i=this[t];if(s??=o.getPropertyOptions(t),!((s.hasChanged??Kt)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:i},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[o,i]of s){let{wrapped:n}=i,h=this[o];n!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,i,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[bt("elementProperties")]=new Map,B[bt("finalized")]=new Map,ss?.({ReactiveElement:B}),(Ft.reactiveElementVersions??=[]).push("2.1.1");var Ce=globalThis,Gt=Ce.trustedTypes,rr=Gt?Gt.createPolicy("lit-html",{createHTML:r=>r}):void 0,ke="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+V,os=`<${Ae}>`,X=document,wt=()=>X.createComment(""),$t=r=>r===null||typeof r!="object"&&typeof r!="function",Te=Array.isArray,lr=r=>Te(r)||typeof r?.[Symbol.iterator]=="function",Ee=`[ 	
\f\r]`,xt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,sr=/-->/g,or=/>/g,Z=RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ir=/'/g,nr=/"/g,cr=/^(?:script|style|textarea|title)$/i,Re=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),u=Re(1),hr=Re(2),go=Re(3),L=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),ar=new WeakMap,Y=X.createTreeWalker(X,129);function dr(r,t){if(!Te(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return rr!==void 0?rr.createHTML(t):t}var ur=(r,t)=>{let e=r.length-1,s=[],o,i=t===2?"<svg>":t===3?"<math>":"",n=xt;for(let h=0;h<e;h++){let a=r[h],d,p,l=-1,b=0;for(;b<a.length&&(n.lastIndex=b,p=n.exec(a),p!==null);)b=n.lastIndex,n===xt?p[1]==="!--"?n=sr:p[1]!==void 0?n=or:p[2]!==void 0?(cr.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=Z):p[3]!==void 0&&(n=Z):n===Z?p[0]===">"?(n=o??xt,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?Z:p[3]==='"'?nr:ir):n===nr||n===ir?n=Z:n===sr||n===or?n=xt:(n=Z,o=void 0);let m=n===Z&&r[h+1].startsWith("/>")?" ":"";i+=n===xt?a+os:l>=0?(s.push(d),a.slice(0,l)+ke+a.slice(l)+V+m):a+V+(l===-2?h:m)}return[dr(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},St=class r{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let i=0,n=0,h=t.length-1,a=this.parts,[d,p]=ur(t,e);if(this.el=r.createElement(d,s),Y.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=Y.nextNode())!==null&&a.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(let l of o.getAttributeNames())if(l.endsWith(ke)){let b=p[n++],m=o.getAttribute(l).split(V),v=/([.?@])?(.*)/.exec(b);a.push({type:1,index:i,name:v[2],strings:m,ctor:v[1]==="."?Qt:v[1]==="?"?Zt:v[1]==="@"?Yt:et}),o.removeAttribute(l)}else l.startsWith(V)&&(a.push({type:6,index:i}),o.removeAttribute(l));if(cr.test(o.tagName)){let l=o.textContent.split(V),b=l.length-1;if(b>0){o.textContent=Gt?Gt.emptyScript:"";for(let m=0;m<b;m++)o.append(l[m],wt()),Y.nextNode(),a.push({type:2,index:++i});o.append(l[b],wt())}}}else if(o.nodeType===8)if(o.data===Ae)a.push({type:2,index:i});else{let l=-1;for(;(l=o.data.indexOf(V,l+1))!==-1;)a.push({type:7,index:i}),l+=V.length-1}i++}}static createElement(t,e){let s=X.createElement("template");return s.innerHTML=t,s}};function tt(r,t,e=r,s){if(t===L)return t;let o=s!==void 0?e._$Co?.[s]:e._$Cl,i=$t(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=o:e._$Cl=o),o!==void 0&&(t=tt(r,o._$AS(r,t.values),o,s)),t}var Jt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??X).importNode(e,!0);Y.currentNode=o;let i=Y.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new ct(i,i.nextSibling,this,t):a.type===1?d=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(d=new Xt(i,this,t)),this._$AV.push(d),a=s[++h]}n!==a?.index&&(i=Y.nextNode(),n++)}return Y.currentNode=X,o}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},ct=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),$t(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):lr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==w&&$t(this._$AH)?this._$AA.nextSibling.data=t:this.T(X.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=St.createElement(dr(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{let i=new Jt(o,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=ar.get(t.strings);return e===void 0&&ar.set(t.strings,e=new St(t)),e}k(t){Te(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,o=0;for(let i of t)o===e.length?e.push(s=new r(this.O(wt()),this.O(wt()),this,this.options)):s=e[o],s._$AI(i),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,i){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w}_$AI(t,e=this,s,o){let i=this.strings,n=!1;if(i===void 0)t=tt(this,t,e,0),n=!$t(t)||t!==this._$AH&&t!==L,n&&(this._$AH=t);else{let h=t,a,d;for(t=i[0],a=0;a<i.length-1;a++)d=tt(this,h[s+a],e,a),d===L&&(d=this._$AH[a]),n||=!$t(d)||d!==this._$AH[a],d===w?t=w:t!==w&&(t+=(d??"")+i[a+1]),this._$AH[a]=d}n&&!o&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Qt=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}},Zt=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}},Yt=class extends et{constructor(t,e,s,o,i){super(t,e,s,o,i),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??w)===L)return;let s=this._$AH,o=t===w&&s!==w||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==w&&(s===w||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Xt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}},pr={M:ke,P:V,A:Ae,C:1,L:ur,R:Jt,D:lr,V:tt,I:ct,H:et,N:Zt,U:Yt,B:Qt,F:Xt},is=Ce.litHtmlPolyfillSupport;is?.(St,ct),(Ce.litHtmlVersions??=[]).push("3.3.1");var fr=(r,t,e)=>{let s=e?.renderBefore??t,o=s._$litPart$;if(o===void 0){let i=e?.renderBefore??null;s._$litPart$=o=new ct(t.insertBefore(wt(),i),i,void 0,e??{})}return o._$AI(r),o};var Le=globalThis,_=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=fr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};_._$litElement$=!0,_.finalized=!0,Le.litElementHydrateSupport?.({LitElement:_});var ns=Le.litElementPolyfillSupport;ns?.({LitElement:_});(Le.litElementVersions??=[]).push("4.2.1");var x=r=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(r,t)})):customElements.define(r,t)};var as={attribute:!0,type:String,converter:yt,reflect:!1,hasChanged:Kt},ls=(r=as,t,e)=>{let{kind:s,metadata:o}=e,i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(e.name,r),s==="accessor"){let{name:n}=e;return{set(h){let a=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,a,r)},init(h){return h!==void 0&&this.C(n,void 0,r,h),h}}}if(s==="setter"){let{name:n}=e;return function(h){let a=this[n];t.call(this,h),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+s)};function f(r){return(t,e)=>typeof e=="object"?ls(r,t,e):((s,o,i)=>{let n=o.hasOwnProperty(i);return o.constructor.createProperty(i,s),n?Object.getOwnPropertyDescriptor(o,i):void 0})(r,t,e)}function T(r){return f({...r,state:!0,attribute:!1})}var cs=Object.defineProperty,hs=(r,t,e)=>t in r?cs(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,Oe=(r,t,e)=>(hs(r,typeof t!="symbol"?t+"":t,e),e),ds=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)},Pe=(r,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return r.has(t)},ee=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},mr=(r,t,e)=>(ds(r,t,"access private method"),e);function gr(r,t){return Object.is(r,t)}var C=null,Et=!1,re=1,se=Symbol("SIGNAL");function ht(r){let t=C;return C=r,t}function us(){return C}function ps(){return Et}var Ue={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function oe(r){if(Et)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(C===null)return;C.consumerOnSignalRead(r);let t=C.nextProducerIndex++;if(dt(C),t<C.producerNode.length&&C.producerNode[t]!==r&&je(C)){let e=C.producerNode[t];ie(e,C.producerIndexOfThis[t])}C.producerNode[t]!==r&&(C.producerNode[t]=r,C.producerIndexOfThis[t]=je(C)?br(r,C,t):0),C.producerLastReadVersion[t]=r.version}function fs(){re++}function vr(r){if(!(!r.dirty&&r.lastCleanEpoch===re)){if(!r.producerMustRecompute(r)&&!bs(r)){r.dirty=!1,r.lastCleanEpoch=re;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=re}}function _r(r){if(r.liveConsumerNode===void 0)return;let t=Et;Et=!0;try{for(let e of r.liveConsumerNode)e.dirty||gs(e)}finally{Et=t}}function ms(){return C?.consumerAllowSignalWrites!==!1}function gs(r){var t;r.dirty=!0,_r(r),(t=r.consumerMarkedDirty)==null||t.call(r.wrapper??r)}function vs(r){return r&&(r.nextProducerIndex=0),ht(r)}function _s(r,t){if(ht(t),!(!r||r.producerNode===void 0||r.producerIndexOfThis===void 0||r.producerLastReadVersion===void 0)){if(je(r))for(let e=r.nextProducerIndex;e<r.producerNode.length;e++)ie(r.producerNode[e],r.producerIndexOfThis[e]);for(;r.producerNode.length>r.nextProducerIndex;)r.producerNode.pop(),r.producerLastReadVersion.pop(),r.producerIndexOfThis.pop()}}function bs(r){dt(r);for(let t=0;t<r.producerNode.length;t++){let e=r.producerNode[t],s=r.producerLastReadVersion[t];if(s!==e.version||(vr(e),s!==e.version))return!0}return!1}function br(r,t,e){var s;if(ze(r),dt(r),r.liveConsumerNode.length===0){(s=r.watched)==null||s.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)r.producerIndexOfThis[o]=br(r.producerNode[o],r,o)}return r.liveConsumerIndexOfThis.push(e),r.liveConsumerNode.push(t)-1}function ie(r,t){var e;if(ze(r),dt(r),typeof ngDevMode<"u"&&ngDevMode&&t>=r.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${r.liveConsumerNode.length} consumers)`);if(r.liveConsumerNode.length===1){(e=r.unwatched)==null||e.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)ie(r.producerNode[o],r.producerIndexOfThis[o])}let s=r.liveConsumerNode.length-1;if(r.liveConsumerNode[t]=r.liveConsumerNode[s],r.liveConsumerIndexOfThis[t]=r.liveConsumerIndexOfThis[s],r.liveConsumerNode.length--,r.liveConsumerIndexOfThis.length--,t<r.liveConsumerNode.length){let o=r.liveConsumerIndexOfThis[t],i=r.liveConsumerNode[t];dt(i),i.producerIndexOfThis[o]=t}}function je(r){var t;return r.consumerIsAlwaysLive||(((t=r?.liveConsumerNode)==null?void 0:t.length)??0)>0}function dt(r){r.producerNode??(r.producerNode=[]),r.producerIndexOfThis??(r.producerIndexOfThis=[]),r.producerLastReadVersion??(r.producerLastReadVersion=[])}function ze(r){r.liveConsumerNode??(r.liveConsumerNode=[]),r.liveConsumerIndexOfThis??(r.liveConsumerIndexOfThis=[])}function yr(r){if(vr(r),oe(r),r.value===Ie)throw r.error;return r.value}function ys(r){let t=Object.create(xs);t.computation=r;let e=()=>yr(t);return e[se]=t,e}var Ne=Symbol("UNSET"),Me=Symbol("COMPUTING"),Ie=Symbol("ERRORED"),xs={...Ue,value:Ne,dirty:!0,error:null,equal:gr,producerMustRecompute(r){return r.value===Ne||r.value===Me},producerRecomputeValue(r){if(r.value===Me)throw new Error("Detected cycle in computations.");let t=r.value;r.value=Me;let e=vs(r),s,o=!1;try{s=r.computation.call(r.wrapper),o=t!==Ne&&t!==Ie&&r.equal.call(r.wrapper,t,s)}catch(i){s=Ie,r.error=i}finally{_s(r,e)}if(o){r.value=t;return}r.value=s,r.version++}};function ws(){throw new Error}var $s=ws;function Ss(){$s()}function Es(r){let t=Object.create(As);t.value=r;let e=()=>(oe(t),t.value);return e[se]=t,e}function Cs(){return oe(this),this.value}function ks(r,t){ms()||Ss(),r.equal.call(r.wrapper,r.value,t)||(r.value=t,Ts(r))}var As={...Ue,equal:gr,value:void 0};function Ts(r){r.version++,fs(),_r(r)}var R=Symbol("node"),S;(r=>{var t,e,s,o,i,n;class h{constructor(p,l={}){ee(this,e),Oe(this,t);let m=Es(p)[se];if(this[R]=m,m.wrapper=this,l){let v=l.equals;v&&(m.equal=v),m.watched=l[r.subtle.watched],m.unwatched=l[r.subtle.unwatched]}}get(){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Cs.call(this[R])}set(p){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(ps())throw new Error("Writes to signals not permitted during Watcher callback");let l=this[R];ks(l,p)}}t=R,e=new WeakSet,s=function(){},r.isState=d=>typeof d=="object"&&Pe(e,d),r.State=h;class a{constructor(p,l){ee(this,i),Oe(this,o);let m=ys(p)[se];if(m.consumerAllowSignalWrites=!0,this[R]=m,m.wrapper=this,l){let v=l.equals;v&&(m.equal=v),m.watched=l[r.subtle.watched],m.unwatched=l[r.subtle.unwatched]}}get(){if(!(0,r.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return yr(this[R])}}o=R,i=new WeakSet,n=function(){},r.isComputed=d=>typeof d=="object"&&Pe(i,d),r.Computed=a,(d=>{var p,l,b,m,v;function k(E){let $,y=null;try{y=ht(null),$=E()}finally{ht(y)}return $}d.untrack=k;function q(E){var $;if(!(0,r.isComputed)(E)&&!(0,r.isWatcher)(E))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(($=E[R].producerNode)==null?void 0:$.map(y=>y.wrapper))??[]}d.introspectSources=q;function A(E){var $;if(!(0,r.isComputed)(E)&&!(0,r.isState)(E))throw new TypeError("Called introspectSinks without a Signal argument");return(($=E[R].liveConsumerNode)==null?void 0:$.map(y=>y.wrapper))??[]}d.introspectSinks=A;function Vr(E){if(!(0,r.isComputed)(E)&&!(0,r.isState)(E))throw new TypeError("Called hasSinks without a Signal argument");let $=E[R].liveConsumerNode;return $?$.length>0:!1}d.hasSinks=Vr;function Fr(E){if(!(0,r.isComputed)(E)&&!(0,r.isWatcher)(E))throw new TypeError("Called hasSources without a Computed or Watcher argument");let $=E[R].producerNode;return $?$.length>0:!1}d.hasSources=Fr;class Kr{constructor($){ee(this,l),ee(this,m),Oe(this,p);let y=Object.create(Ue);y.wrapper=this,y.consumerMarkedDirty=$,y.consumerIsAlwaysLive=!0,y.consumerAllowSignalWrites=!1,y.producerNode=[],this[R]=y}watch(...$){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");mr(this,m,v).call(this,$);let y=this[R];y.dirty=!1;let M=ht(y);for(let qt of $)oe(qt[R]);ht(M)}unwatch(...$){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");mr(this,m,v).call(this,$);let y=this[R];dt(y);for(let M=y.producerNode.length-1;M>=0;M--)if($.includes(y.producerNode[M].wrapper)){ie(y.producerNode[M],y.producerIndexOfThis[M]);let qt=y.producerNode.length-1;if(y.producerNode[M]=y.producerNode[qt],y.producerIndexOfThis[M]=y.producerIndexOfThis[qt],y.producerNode.length--,y.producerIndexOfThis.length--,y.nextProducerIndex--,M<y.producerNode.length){let Jr=y.producerIndexOfThis[M],Ze=y.producerNode[M];ze(Ze),Ze.liveConsumerIndexOfThis[Jr]=M}}}getPending(){if(!(0,r.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[R].producerNode.filter(y=>y.dirty).map(y=>y.wrapper)}}p=R,l=new WeakSet,b=function(){},m=new WeakSet,v=function(E){for(let $ of E)if(!(0,r.isComputed)($)&&!(0,r.isState)($))throw new TypeError("Called watch/unwatch without a Computed or State argument")},r.isWatcher=E=>Pe(l,E),d.Watcher=Kr;function Gr(){var E;return(E=us())==null?void 0:E.wrapper}d.currentComputed=Gr,d.watched=Symbol("watched"),d.unwatched=Symbol("unwatched")})(r.subtle||(r.subtle={}))})(S||(S={}));var De=!1,xr=new S.subtle.Watcher(()=>{De||(De=!0,queueMicrotask(()=>{De=!1;for(let r of xr.getPending())r.get();xr.watch()}))}),Rs=Symbol("SignalWatcherBrand"),Ls=new FinalizationRegistry(r=>{r.unwatch(...S.subtle.introspectSources(r))}),wr=new WeakMap;function Ct(r){return r[Rs]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),r):class extends r{constructor(){super(...arguments),this._$St=new Map,this._$So=new S.State(0),this._$Si=!1}_$Sl(){var t,e;let s=[],o=[];this._$St.forEach((n,h)=>{(n?.beforeUpdate?s:o).push(h)});let i=(t=this.h)===null||t===void 0?void 0:t.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));s.forEach(n=>n.get()),(e=this._$Su)===null||e===void 0||e.get(),i.forEach(n=>n.get()),o.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new S.Computed(()=>{this._$So.get(),super.performUpdate()});let t=this.h=new S.subtle.Watcher(function(){let e=wr.get(this);e!==void 0&&(e._$Si===!1&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});wr.set(t,this),Ls.register(this,t),t.watch(this._$Su),t.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(this.h===void 0)return;let t=!1;this.h.unwatch(...S.subtle.introspectSources(this.h).filter(e=>{var s;let o=((s=this._$St.get(e))===null||s===void 0?void 0:s.manualDispose)!==!0;return o&&this._$St.delete(e),t||(t=!o),o})),t||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(t,e){var s;this._$S_();let o=new S.Computed(()=>{t()});return this.h.watch(o),this._$St.set(o,e),(s=e?.beforeUpdate)!==null&&s!==void 0&&s?S.subtle.untrack(()=>o.get()):this.updateComplete.then(()=>S.subtle.untrack(()=>o.get())),()=>{this._$St.delete(o),this.h.unwatch(o),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var D={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},j=r=>(...t)=>({_$litDirective$:r,values:t}),z=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Os}=pr;var Sr=r=>r.strings===void 0,$r=()=>document.createComment(""),ut=(r,t,e)=>{let s=r._$AA.parentNode,o=t===void 0?r._$AB:t._$AA;if(e===void 0){let i=s.insertBefore($r(),o),n=s.insertBefore($r(),o);e=new Os(i,n,r,r.options)}else{let i=e._$AB.nextSibling,n=e._$AM,h=n!==r;if(h){let a;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(a=r._$AU)!==n._$AU&&e._$AP(a)}if(i!==o||h){let a=e._$AA;for(;a!==i;){let d=a.nextSibling;s.insertBefore(a,o),a=d}}}return e},G=(r,t,e=r)=>(r._$AI(t,e),r),Ps={},Er=(r,t=Ps)=>r._$AH=t,Cr=r=>r._$AH,ne=r=>{r._$AR(),r._$AA.remove()};var kt=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),kt(s,t);return!0},ae=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},kr=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),js(t)}};function Ns(r){this._$AN!==void 0?(ae(this),this._$AM=r,kr(this)):this._$AM=r}function Ms(r,t=!1,e=0){let s=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(s))for(let i=e;i<s.length;i++)kt(s[i],!1),ae(s[i]);else s!=null&&(kt(s,!1),ae(s));else kt(this,r)}var js=r=>{r.type==D.CHILD&&(r._$AP??=Ms,r._$AQ??=Ns)},pt=class extends z{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),kr(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(kt(this,t),ae(this))}setValue(t){if(Sr(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var He=!1,We=new S.subtle.Watcher(async()=>{He||(He=!0,queueMicrotask(()=>{He=!1;for(let r of We.getPending())r.get();We.watch()}))}),le=class extends pt{_$S_(){var t,e;this._$Sm===void 0&&(this._$Sj=new S.Computed(()=>{var s;let o=(s=this._$SW)===null||s===void 0?void 0:s.get();return this.setValue(o),o}),this._$Sm=(e=(t=this._$Sk)===null||t===void 0?void 0:t.h)!==null&&e!==void 0?e:We,this._$Sm.watch(this._$Sj),S.subtle.untrack(()=>{var s;return(s=this._$Sj)===null||s===void 0?void 0:s.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return S.subtle.untrack(()=>t.get())}update(t,[e]){var s,o;return(s=this._$Sk)!==null&&s!==void 0||(this._$Sk=(o=t.options)===null||o===void 0?void 0:o.host),e!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=e,this._$S_(),S.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},qe=j(le);var Be=r=>(t,...e)=>r(t,...e.map(s=>s instanceof S.State||s instanceof S.Computed?qe(s):s)),Is=Be(u),Us=Be(hr);var Ai=S.State,Ti=S.Computed,F=(r,t)=>new S.State(r,t),ce=(r,t)=>new S.Computed(r,t);var zs=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function Ar(r,t=""){for(let{pattern:e,name:s}of zs){let o=e.exec(r);if(o)return{name:s,path:o[1],params:new URLSearchParams(t)}}return{name:"not-found",params:new URLSearchParams(t)}}var N=F(Ar(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{N.set(Ar(window.location.pathname,window.location.search))});var Ui=g`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,H=g`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,zi=g`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,Tr=g`
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
`,ft=g`
  .label {
    font-weight: bold;
  }
`,Rr=g`
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
`,Lr=g`
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
`,Di=g`
  .hidden {
    display: none !important;
  }
`;var Or=(r,t,e)=>{let s=new Map;for(let o=t;o<=e;o++)s.set(r[o],o);return s},Pr=j(class extends z{constructor(r){if(super(r),r.type!==D.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let o=[],i=[],n=0;for(let h of r)o[n]=s?s(h,n):n,i[n]=e(h,n),n++;return{values:i,keys:o}}render(r,t,e){return this.dt(r,t,e).values}update(r,[t,e,s]){let o=Cr(r),{values:i,keys:n}=this.dt(t,e,s);if(!Array.isArray(o))return this.ut=n,i;let h=this.ut??=[],a=[],d,p,l=0,b=o.length-1,m=0,v=i.length-1;for(;l<=b&&m<=v;)if(o[l]===null)l++;else if(o[b]===null)b--;else if(h[l]===n[m])a[m]=G(o[l],i[m]),l++,m++;else if(h[b]===n[v])a[v]=G(o[b],i[v]),b--,v--;else if(h[l]===n[v])a[v]=G(o[l],i[v]),ut(r,a[v+1],o[l]),l++,v--;else if(h[b]===n[m])a[m]=G(o[b],i[m]),ut(r,o[l],o[b]),b--,m++;else if(d===void 0&&(d=Or(n,m,v),p=Or(h,l,b)),d.has(h[l]))if(d.has(h[b])){let k=p.get(n[m]),q=k!==void 0?o[k]:null;if(q===null){let A=ut(r,o[l]);G(A,i[m]),a[m]=A}else a[m]=G(q,i[m]),ut(r,o[l],q),o[k]=null;m++}else ne(o[b]),b--;else ne(o[l]),l++;for(;m<=v;){let k=ut(r,a[v+1]);G(k,i[m]),a[m++]=k}for(;l<=b;){let k=o[l++];k!==null&&ne(k)}return this.ut=n,Er(r,a),L}});var At=class r extends Event{constructor(t){super(r.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};At.eventName="rangeChanged";var Tt=class r extends Event{constructor(t){super(r.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};Tt.eventName="visibilityChanged";var Rt=class r extends Event{constructor(){super(r.eventName,{bubbles:!1})}};Rt.eventName="unpinned";var Ve=class{constructor(t){this._element=null;let e=t??window;this._node=e,t&&(this._element=t)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}},he=class extends Ve{constructor(t,e){super(e),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let s=this._node;this._originalScrollTo=s.scrollTo,this._originalScrollBy=s.scrollBy,this._originalScroll=s.scroll,this._attach(t)}get _destination(){return this.__destination}get scrolling(){return this._destination!==null}scrollTo(t,e){let s=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;this._scrollTo(s)}scrollBy(t,e){let s=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;s.top!==void 0&&(s.top+=this.scrollTop),s.left!==void 0&&(s.left+=this.scrollLeft),this._scrollTo(s)}_nativeScrollTo(t){this._originalScrollTo.bind(this._element||window)(t)}_scrollTo(t,e=null,s=null){this._end!==null&&this._end(),t.behavior==="smooth"?(this._setDestination(t),this._retarget=e,this._end=s):this._resetScrollState(),this._nativeScrollTo(t)}_setDestination(t){let{top:e,left:s}=t;return e=e===void 0?void 0:Math.max(0,Math.min(e,this.maxScrollTop)),s=s===void 0?void 0:Math.max(0,Math.min(s,this.maxScrollLeft)),this._destination!==null&&s===this._destination.left&&e===this._destination.top?!1:(this.__destination={top:e,left:s,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(t){this._destination&&this._setDestination(t)&&this._nativeScrollTo(this._destination)}managedScrollTo(t,e,s){return this._scrollTo(t,e,s),this._updateManagedScrollTo}correctScrollError(t){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(t),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(this._destination!==null){let{scrollTop:t,scrollLeft:e}=this,{top:s,left:o}=this._destination;s=Math.min(s||0,this.maxScrollTop),o=Math.min(o||0,this.maxScrollLeft);let i=Math.abs(s-t),n=Math.abs(o-e);i<1&&n<1&&(this._end&&this._end(),this._resetScrollState())}}detach(t){return this._clients.delete(t),this._clients.size===0&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(t){this._clients.add(t),this._clients.size===1&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};var Nr=typeof window<"u"?window.ResizeObserver:void 0;var Ir=Symbol("virtualizerRef"),de="virtualizer-sizer",Mr,pe=class{constructor(t){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!t)throw new Error("Virtualizer constructor requires a configuration object");if(t.hostElement)this._init(t);else throw new Error('Virtualizer configuration requires the "hostElement" property')}set items(t){Array.isArray(t)&&t!==this._items&&(this._itemsChanged=!0,this._items=t,this._schedule(this._updateLayout))}_init(t){this._isScroller=!!t.scroller,this._initHostElement(t);let e=t.layout||{};this._layoutInitialized=this._initLayout(e)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new Nr(()=>this._hostElementSizeChanged()),this._childrenRO=new Nr(this._childrenSizeChanged.bind(this))}_initHostElement(t){let e=this._hostElement=t.hostElement;this._applyVirtualizerStyles(),e[Ir]=this}connected(){this._initObservers();let t=this._isScroller;this._clippingAncestors=Ws(this._hostElement,t),this._scrollerController=new he(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(t=>{t.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(t),this._hostElementRO.observe(t)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(t=>this._childrenRO.observe(t)),this._scrollEventListeners.forEach(t=>t.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(t=>t.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let t=this._hostElement;if(!this._sizer){let e=t.querySelector(`[${de}]`);e||(e=document.createElement("div"),e.setAttribute(de,""),t.appendChild(e)),Object.assign(e.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),e.textContent="&nbsp;",e.setAttribute(de,""),this._sizer=e}return this._sizer}async updateLayoutConfig(t){await this._layoutInitialized;let e=t.type||Mr;if(typeof e=="function"&&this._layout instanceof e){let s={...t};return delete s.type,this._layout.config=s,!0}return!1}async _initLayout(t){let e,s;if(typeof t.type=="function"){s=t.type;let o={...t};delete o.type,e=o}else e=t;s===void 0&&(Mr=s=(await import("./flow-EWBFT27W.js")).FlowLayout),this._layout=new s(o=>this._handleLayoutMessage(o),e),this._layout.measureChildren&&typeof this._layout.updateItemSizes=="function"&&(typeof this._layout.measureChildren=="function"&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){this._benchmarkStart===null&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(this._benchmarkStart!==null){let t=window.performance.now(),e=t-this._benchmarkStart,o=performance.getEntriesByName("uv-virtualizing","measure").filter(i=>i.startTime>=this._benchmarkStart&&i.startTime<t).reduce((i,n)=>i+n.duration,0);return this._benchmarkStart=null,{timeElapsed:e,virtualizationTime:o}}return null}_measureChildren(){let t={},e=this._children,s=this._measureChildOverride||this._measureChild;for(let o=0;o<e.length;o++){let i=e[o],n=this._first+o;(this._itemsChanged||this._toBeMeasured.has(i))&&(t[n]=s.call(this,i,this._items[n]))}this._childMeasurements=t,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(t){let{width:e,height:s}=t.getBoundingClientRect();return Object.assign({width:e,height:s},Ds(t))}async _schedule(t){this._scheduled.has(t)||(this._scheduled.add(t),await Promise.resolve(),this._scheduled.delete(t),t.call(this))}async _updateDOM(t){this._scrollSize=t.scrollSize,this._adjustRange(t.range),this._childrenPos=t.childPositions,this._scrollError=t.scrollError||null;let{_rangeChanged:e,_itemsChanged:s}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(e||s)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(t=>this._childrenRO.observe(t)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),this._childMeasurements!==null&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(t){console.warn("Error measuring performance data: ",t)}window.performance.mark("uv-start")}this._scrollerController.correctingScrollError===!1&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(t){t.type==="scroll"?(t.currentTarget===window||this._clippingAncestors.includes(t.currentTarget))&&this._handleScrollEvent():console.warn("event not handled",t)}_handleLayoutMessage(t){t.type==="stateChanged"?this._updateDOM(t):t.type==="visibilityChanged"?(this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._notifyVisibility()):t.type==="unpinned"&&this._hostElement.dispatchEvent(new Rt)}get _children(){let t=[],e=this._hostElement.firstElementChild;for(;e;)e.hasAttribute(de)||t.push(e),e=e.nextElementSibling;return t}_updateView(){let t=this._hostElement,e=this._scrollerController?.element,s=this._layout;if(t&&e&&s){let o,i,n,h,a=t.getBoundingClientRect();o=0,i=0,n=window.innerHeight,h=window.innerWidth;let d=this._clippingAncestors.map(A=>A.getBoundingClientRect());d.unshift(a);for(let A of d)o=Math.max(o,A.top),i=Math.max(i,A.left),n=Math.min(n,A.bottom),h=Math.min(h,A.right);let p=e.getBoundingClientRect(),l={left:a.left-p.left,top:a.top-p.top},b={width:e.scrollWidth,height:e.scrollHeight},m=o-a.top+t.scrollTop,v=i-a.left+t.scrollLeft,k=Math.max(0,n-o),q=Math.max(0,h-i);s.viewportSize={width:q,height:k},s.viewportScroll={top:m,left:v},s.totalScrollSize=b,s.offsetWithinScroller=l}}_sizeHostElement(t){let s=t&&t.width!==null?Math.min(82e5,t.width):0,o=t&&t.height!==null?Math.min(82e5,t.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${s}px, ${o}px)`;else{let i=this._hostElement.style;i.minWidth=s?`${s}px`:"100%",i.minHeight=o?`${o}px`:"100%"}}_positionChildren(t){t&&t.forEach(({top:e,left:s,width:o,height:i,xOffset:n,yOffset:h},a)=>{let d=this._children[a-this._first];d&&(d.style.position="absolute",d.style.boxSizing="border-box",d.style.transform=`translate(${s}px, ${e}px)`,o!==void 0&&(d.style.width=o+"px"),i!==void 0&&(d.style.height=i+"px"),d.style.left=n===void 0?null:n+"px",d.style.top=h===void 0?null:h+"px")})}async _adjustRange(t){let{_first:e,_last:s,_firstVisible:o,_lastVisible:i}=this;this._first=t.first,this._last=t.last,this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==e||this._last!==s,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==o||this._lastVisible!==i}_correctScrollError(){if(this._scrollError){let{scrollTop:t,scrollLeft:e}=this._scrollerController,{top:s,left:o}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:t-s,left:e-o})}}element(t){return t===1/0&&(t=this._items.length-1),this._items?.[t]===void 0?void 0:{scrollIntoView:(e={})=>this._scrollElementIntoView({...e,index:t})}}_scrollElementIntoView(t){if(t.index>=this._first&&t.index<=this._last)this._children[t.index-this._first].scrollIntoView(t);else if(t.index=Math.min(t.index,this._items.length-1),t.behavior==="smooth"){let e=this._layout.getScrollIntoViewCoordinates(t),{behavior:s}=t;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(e,{behavior:s}),()=>this._layout.getScrollIntoViewCoordinates(t),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=t}else this._layout.pin=t}_checkScrollIntoViewTarget(t){let{index:e}=this._scrollIntoViewTarget||{};e&&t?.has(e)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new At({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new Tt({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((t,e)=>{this._layoutCompleteResolver=t,this._layoutCompleteRejecter=e})),this._layoutCompletePromise}_rejectLayoutCompletePromise(t){this._layoutCompleteRejecter!==null&&this._layoutCompleteRejecter(t),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&this._pendingLayoutComplete===null&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){this._layoutCompleteResolver!==null&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(t){if(this._layout?.measureChildren){for(let e of t)this._toBeMeasured.set(e.target,e.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function Ds(r){let t=window.getComputedStyle(r);return{marginTop:ue(t.marginTop),marginRight:ue(t.marginRight),marginBottom:ue(t.marginBottom),marginLeft:ue(t.marginLeft)}}function ue(r){let t=r?parseFloat(r):NaN;return Number.isNaN(t)?0:t}function jr(r){if(r.assignedSlot!==null)return r.assignedSlot;if(r.parentElement!==null)return r.parentElement;let t=r.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}function Hs(r,t=!1){let e=[],s=t?r:jr(r);for(;s!==null;)e.push(s),s=jr(s);return e}function Ws(r,t=!1){let e=!1;return Hs(r,t).filter(s=>{if(e)return!1;let o=getComputedStyle(s);return e=o.position==="fixed",o.overflow!=="visible"})}var qs=r=>r,Bs=(r,t)=>u`${t}: ${JSON.stringify(r,null,2)}`,Fe=class extends pt{constructor(t){if(super(t),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,s)=>Bs(e,s+this._first),this._keyFunction=(e,s)=>qs(e,s+this._first),this._items=[],t.type!==D.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(t){t&&this._setFunctions(t);let e=[];if(this._first>=0&&this._last>=this._first)for(let s=this._first;s<=this._last;s++)e.push(this._items[s]);return Pr(e,this._keyFunction,this._renderItem)}update(t,[e]){this._setFunctions(e);let s=this._items!==e.items;return this._items=e.items||[],this._virtualizer?this._updateVirtualizerConfig(t,e):this._initialize(t,e),s?L:this.render()}async _updateVirtualizerConfig(t,e){if(!await this._virtualizer.updateLayoutConfig(e.layout||{})){let o=t.parentNode;this._makeVirtualizer(o,e)}this._virtualizer.items=this._items}_setFunctions(t){let{renderItem:e,keyFunction:s}=t;e&&(this._renderItem=(o,i)=>e(o,i+this._first)),s&&(this._keyFunction=(o,i)=>s(o,i+this._first))}_makeVirtualizer(t,e){this._virtualizer&&this._virtualizer.disconnected();let{layout:s,scroller:o,items:i}=e;this._virtualizer=new pe({hostElement:t,layout:s,scroller:o}),this._virtualizer.items=i,this._virtualizer.connected()}_initialize(t,e){let s=t.parentNode;s&&s.nodeType===1&&(s.addEventListener("rangeChanged",o=>{this._first=o.first,this._last=o.last,this.setValue(this.render())}),this._makeVirtualizer(s,e))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}},Ur=j(Fe);async function zr(r,t,e){let s="/api/search?"+r.toString(),o=await fetch(s,{signal:e});if(!o.ok){let i=await o.text();throw new Error(`search failed (${o.status}): ${i}`)}if(!o.body)throw new Error("response has no body");await Vs(o.body,i=>{switch(i.type){case"result":t.onResult?.(i);break;case"file":t.onFile?.(i);break;case"facets":t.onFacets?.(i);break;case"done":t.onDone?.(i);break}})}async function Vs(r,t){let e=r.getReader(),s=new TextDecoder,o="";try{for(;;){let{done:n,value:h}=await e.read();if(n)break;o+=s.decode(h,{stream:!0});let a;for(;(a=o.indexOf(`
`))!==-1;){let d=o.slice(0,a).trim();o=o.slice(a+1),d.length!==0&&t(JSON.parse(d))}}o+=s.decode();let i=o.trim();i.length>0&&t(JSON.parse(i))}finally{e.releaseLock()}}function rt(r){let t=r.indexOf("/+/");if(t===-1)return{repo:r,version:"",filePath:""};let e=r.slice(0,t),s=r.slice(t+3),o=e.lastIndexOf("/");return o===-1?{repo:e,version:"",filePath:s}:{repo:e.slice(0,o),version:e.slice(o+1),filePath:s}}function Dr(r,t={},e={}){let s=new URLSearchParams;if(r.trim()&&s.set("q",r.trim()),t.literal&&s.set("literal","true"),t.caseSensitive&&s.set("fold_case","false"),t.repos?.length)for(let o of t.repos)s.append("repo",o);for(let[o,i]of Object.entries(e))for(let n of i)s.append(o,n);return s}var me=class{constructor(){this.lastCommittedUrl=""}commit(t,e={},s={}){let o=Dr(t,e,s),i=t?`${t} \xB7 code search`:"code search",n=fe(o);if(!t)return this.lastCommittedUrl="",[{type:"replaceUrl",url:fe(new URLSearchParams),title:i},{type:"clearResults"}];let h=[];return n!==this.lastCommittedUrl&&this.lastCommittedUrl!==""?h.push({type:"pushUrl",url:n,title:i}):h.push({type:"replaceUrl",url:n,title:i}),h.push({type:"search",params:o}),this.lastCommittedUrl=n,h}popstate(t,e){this.lastCommittedUrl=fe(e);let s=t?`${t} \xB7 code search`:"code search",o=[{type:"replaceUrl",url:fe(e),title:s}];return t?o.push({type:"search",params:e}):o.push({type:"clearResults"}),o}};function fe(r){let t=r.toString();return"/search"+(t?"?"+t:"")}var ge=class{constructor(){this.results=[];this.files=[];this.dirty=!1;this.flushed=!1}start(){return this.results=[],this.files=[],this.dirty=!1,this.flushed=!1,{loading:!0,error:null,done:null}}onResult(t){this.results.push(t),this.dirty=!0}onFile(t){this.files.push(t),this.dirty=!0}flush(){if(!this.dirty)return null;this.dirty=!1;let t={results:[...this.results],files:[...this.files]};return this.flushed||(t.facets=null,this.flushed=!0),t}onFacets(t){return{facets:t}}onDone(t){return{results:this.results,files:this.files,done:t,loading:!1}}onError(t){return{error:t,loading:!1}}};var mt=ce(()=>N.get().params.get("q")??""),Fs=ce(()=>{let r=N.get().params;return{literal:r.get("literal")==="true",caseSensitive:r.get("fold_case")==="false"}}),Hr=ce(()=>{let r=N.get().params.get("context");if(r!==null){let t=parseInt(r,10);if(!isNaN(t)&&t>=0)return t}return 3}),Ot=F([]),Pt=F([]),Nt=F(null),Mt=F(null),jt=F(!1),It=F(null),Ke=null;async function Ks(){Ke&&Ke.abort();let r=new AbortController;if(Ke=r,!mt.get()){Ot.set([]),Pt.set([]),Nt.set(null),Mt.set(null),jt.set(!1),It.set(null);return}let e=N.get(),s=new URLSearchParams(e.params),o=new ge;Lt(o.start());let i=setInterval(()=>{let n=o.flush();n&&Lt(n)},100);try{await zr(s,{onResult(n){o.onResult(n)},onFile(n){o.onFile(n)},onFacets(n){Lt(o.onFacets(n))},onDone(n){clearInterval(i),Lt(o.onDone(n))}},r.signal)}catch(n){clearInterval(i),r.signal.aborted||Lt(o.onError(n instanceof Error?n.message:String(n)))}}function Lt(r){"results"in r&&Ot.set(r.results),"files"in r&&Pt.set(r.files),"facets"in r&&Nt.set(r.facets),"done"in r&&Mt.set(r.done),"loading"in r&&jt.set(r.loading),"error"in r&&It.set(r.error)}var ve=new me,st=null;function Wr(r,t={},e={}){st&&clearTimeout(st),st=setTimeout(()=>{st=null,be(ve.commit(r,t,e))},200)}function _e(r,t={},e={}){st&&(clearTimeout(st),st=null),be(ve.commit(r,t,e))}function Gs(){let r=mt.get();if(r){let t=Fs.get(),e=N.get(),s={};for(let o of["f.ext","f.repo","f.path"]){let i=e.params.getAll(o);i.length>0&&(s[o]=i)}be(ve.commit(r,t,s))}}Gs();window.addEventListener("popstate",()=>{let r=N.get(),t=r.params.get("q")??"";be(ve.popstate(t,r.params))});function be(r){for(let t of r)switch(t.type){case"pushUrl":history.pushState(null,t.title,t.url),document.title=t.title,N.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"replaceUrl":history.replaceState(null,t.title,t.url),document.title=t.title,N.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"search":Ks();break;case"clearResults":Ot.set([]),Pt.set([]),Nt.set(null),Mt.set(null),jt.set(!1),It.set(null);break}}var ot=class extends _{constructor(){super(...arguments);this.value="";this.error=""}render(){return u`
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
          ${this.error?u`<span id="errortext">${this.error}</span>`:w}
        </div>
      </div>
    `}onInput(){let e=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:e.value},bubbles:!0,composed:!0}))}onKeydown(e){if(e.key==="Enter"){let s=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-submit",{detail:{value:s.value},bubbles:!0,composed:!0}))}}appendQuery(e){let s=this.renderRoot.querySelector("#searchbox");s&&(s.value+=e,this.value=s.value,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:s.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};ot.styles=[Lr,g`
      :host {
        display: block;
      }

      #searchbox {
        font-size: 16px;
      }

      #regex-error {
        padding-top: 3px;
      }

      #errortext {
        color: var(--color-foreground-error);
        font-size: 14px;
      }
    `],c([f()],ot.prototype,"value",2),c([f()],ot.prototype,"error",2),ot=c([x("cs-search-input")],ot);var W=class extends _{constructor(){super(...arguments);this.groups=[];this._open=!1;this._search="";this._selected=new Set;this._onOutsideClick=e=>{this._open&&(e.composedPath().includes(this)||(this._open=!1))}}get _options(){return this.groups.flatMap(e=>e.repos.map(s=>({value:s,label:s.split("/").pop()??s,group:e.label,selected:this._selected.has(s)})))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick)}get selectedRepos(){return[...this._selected]}get _buttonText(){let e=this._selected.size;return e===0?"(all repositories)":e<=4?this._options.filter(o=>o.selected).map(o=>o.label).join(", "):`(${e} repositories)`}get _filteredGroups(){let e=this._search.toLowerCase(),s=new Map;for(let o of this._options)e&&!o.value.toLowerCase().includes(e)&&!o.label.toLowerCase().includes(e)||(s.has(o.group)||s.set(o.group,[]),s.get(o.group).push(o));return[...s.entries()].map(([o,i])=>({label:o,options:i}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(e){let s=new Set(this._selected);s.has(e)?s.delete(e):s.add(e),this._selected=s,this._fireChange()}_selectAll(){this._selected=new Set(this._options.map(e=>e.value)),this._fireChange()}_deselectAll(){this._selected=new Set,this._fireChange()}_toggleGroup(e){let s=this._options.filter(n=>n.group===e).map(n=>n.value),o=s.every(n=>this._selected.has(n)),i=new Set(this._selected);for(let n of s)o?i.delete(n):i.add(n);this._selected=i,this._fireChange()}_fireChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}_onSearchInput(e){this._search=e.target.value}_onSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this._search=""),e.key==="Escape"&&(this._open=!1)}render(){return u`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():w}
        `}_renderDropdown(){let e=this._filteredGroups;return u`
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
                <div class="options">${e.map(s=>this._renderGroup(s))}</div>
            </div>
        `}_renderGroup(e){return e.label?u`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(e.label)}>${e.label}</div>
                ${e.options.map(s=>this._renderOption(s))}
            </div>
        `:e.options.map(s=>this._renderOption(s))}_renderOption(e){return u`
            <label class="option ${e.selected?"selected":""}">
                <input type="checkbox" .checked=${e.selected} @change=${()=>this._toggleOption(e.value)} />
                ${e.label}
            </label>
        `}};W.styles=g`
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
    `,c([f({type:Array})],W.prototype,"groups",2),c([T()],W.prototype,"_open",2),c([T()],W.prototype,"_search",2),c([T()],W.prototype,"_selected",2),W=c([x("repo-select")],W);var it=class extends _{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let e=this.options.caseSensitive?"false":"auto";return u`
      <div class="search-options">
        <div class="search-option">
          <span class="label">Case:</span>
          <input
            type="radio"
            name="fold_case"
            value="false"
            id="case-match"
            tabindex="3"
            .checked=${e==="false"}
            @change=${()=>this.setCase("false")}
          />
          <label for="case-match">match</label>
          <input
            type="radio"
            name="fold_case"
            value="auto"
            id="case-auto"
            tabindex="4"
            .checked=${e==="auto"}
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
            .checked=${e==="true"}
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
          <repo-select .groups=${this.repos} @change=${this.onRepoChange}></repo-select>
        </div>
      </div>
    `}setCase(e){let s=e==="false";this.options={...this.options,caseSensitive:s},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}onRepoChange(){let s=this.renderRoot.querySelector("repo-select")?.selectedRepos??[];this.options={...this.options,repos:s.length>0?s:void 0},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};it.styles=[Rr,ft,g`
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
    `],c([f({type:Object})],it.prototype,"options",2),c([f({type:Array})],it.prototype,"repos",2),it=c([x("cs-search-options")],it);var Ge=null,Je=null;async function qr(){return Ge||(Je||(Je=import("./snippet-highlight-OALYTV3P.js").then(r=>(Ge=r,r))),Je)}qr();async function ye(r,t){return(await qr()).highlightSnippet(r,t)}function Br(r,t,e,s="matchstr"){if(t>=e)return r;let o=0,i="",n=!1,h=!1;for(let a=0;a<r.length;a++){let d=r[a];if(d==="<"){n=!0,i+=d;continue}if(d===">"){n=!1,i+=d;continue}if(n){i+=d;continue}let p="";if(d==="&"){let l=a;for(;l<r.length&&r[l]!==";"&&l-a<10;)l++;l<r.length&&r[l]===";"&&(p=r.slice(a,l+1),a=l)}o===t&&!h&&(i+=`<mark class="${s}">`,h=!0),i+=p||d,o++,o===e&&h&&(i+="</mark>",h=!1)}return h&&(i+="</mark>"),i}var Qe=j(class extends z{constructor(r){if(super(r),r.type!==D.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((t=>r[t])).join(" ")+" "}update(r,[t]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((s=>s!==""))));for(let s in t)t[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(t)}let e=r.element.classList;for(let s of this.st)s in t||(e.remove(s),this.st.delete(s));for(let s in t){let o=!!t[s];o===this.st.has(s)||this.nt?.has(s)||(o?(e.add(s),this.st.add(s)):(e.remove(s),this.st.delete(s)))}return L}});var Ut=class extends z{constructor(t){if(super(t),this.it=w,t.type!==D.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this._t=void 0,this.it=t;if(t===L)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Ut.directiveName="unsafeHTML",Ut.resultType=1;var xe=j(Ut);var we=`/* highlight.js GitHub light/dark theme for shadow DOM */

/* Light mode */
.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}
.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}
.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}
.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}
.hljs-built_in,.hljs-symbol{color:#e36209}
.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}
.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}
.hljs-section{color:#005cc5;font-weight:700}
.hljs-emphasis{font-style:italic}
.hljs-strong{font-weight:700}
.hljs-addition{color:#22863a;background-color:#f0fff4}
.hljs-deletion{color:#b31d28;background-color:#ffeef0}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}
  .hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}
  .hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}
  .hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}
  .hljs-built_in,.hljs-symbol{color:#ffa657}
  .hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}
  .hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}
  .hljs-section{color:#79c0ff;font-weight:700}
  .hljs-addition{color:#aff5b4;background-color:#033a16}
  .hljs-deletion{color:#ffdcd7;background-color:#67060c}
}
`;var J=class extends _{render(){return this.start!=null&&this.end!=null?u`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:u`${this.text}`}};J.styles=g`
        .matchstr {
            background: var(--color-background-mark);
            color: inherit;
            box-shadow: 0 0 0 1px var(--color-border-mark);
            border-radius: 2px;
            font-weight: bold;
        }
    `,c([f()],J.prototype,"text",2),c([f({type:Number})],J.prototype,"start",2),c([f({type:Number})],J.prototype,"end",2),J=c([x("match-str")],J);var I=class extends _{render(){return u`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};I.styles=g`
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
    `,c([f()],I.prototype,"text",2),c([f()],I.prototype,"href",2),c([f({type:Number})],I.prototype,"start",2),c([f({type:Number})],I.prototype,"end",2),c([f()],I.prototype,"repo",2),c([f()],I.prototype,"version",2),I=c([x("filename-match")],I);var U=class extends _{render(){let t=this.start!=null&&this.end!=null;return u`<a class=${Qe({"lno-link":!0,matchlno:t})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Qe({matchline:t})}
                >${t?u`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.highlightedHTML?xe(this.highlightedHTML):this.text}</span
            >`}};U.styles=[lt(we),g`
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
        mark.matchstr {
            background: var(--color-background-mark);
            color: inherit;
            box-shadow: 0 0 0 1px var(--color-border-mark);
            border-radius: 2px;
            font-weight: bold;
        }
    `],c([f({type:Number})],U.prototype,"lineNo",2),c([f()],U.prototype,"text",2),c([f()],U.prototype,"href",2),c([f({type:Number})],U.prototype,"start",2),c([f({type:Number})],U.prototype,"end",2),c([f()],U.prototype,"highlightedHTML",2),U=c([x("match-line")],U);function Qs(r){let t=r.lastIndexOf("/");return t<0?".":r.slice(0,t)}function Zs(r){let t=r.lastIndexOf("/");return t<0?r:r.slice(t+1)}var Q=class extends _{constructor(){super(...arguments);this.noContext=!1;this.hlMap=new Map}willUpdate(e){if(e.has("result")&&this.result){this.hlMap=new Map;let s=this.result.lines.filter(n=>n!==null),o=s.map(n=>n[1]).join(`
`),{filePath:i}=rt(this.result.path);ye(i,o).then(n=>{if(!n)return;let h=new Map;for(let a=0;a<s.length&&a<n.length;a++)h.set(s[a][0],n[a]);this.hlMap=h})}}render(){let{repo:e,version:s,filePath:o}=rt(this.result.path),i=`/view/${this.result.path}`,n=this.splitGroups(this.result.lines),h=s.length>6?s.slice(0,6):s,a=Qs(o),d=Zs(o);return u`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${i}>
              <span class="repo">${e}:</span><span class="version">${h}:</span>${a}/<span class="filename">${d}</span>
            </a>
          </span>
        </div>
        ${n.map(p=>u`
            <div class="match">
              <div class="contents">
                ${p.map(l=>{let b=l[0],m=l[1],v=l.length>2?l[2]:void 0,k=v!==void 0&&v.length>0,q=`${i}#L${b}`,A=this.hlMap.get(b);return k&&A&&v&&(A=Br(A,v[0][0],v[0][1])),u`
                    <match-line
                      class=${k?"match-hit":"context"}
                      .lineNo=${b}
                      text=${m}
                      href=${q}
                      .highlightedHTML=${A}
                      .start=${!A&&k&&v?v[0][0]:void 0}
                      .end=${!A&&k&&v?v[0][1]:void 0}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(e){let s=[],o=[];for(let i of e)i===null?o.length>0&&(s.push(o),o=[]):o.push(i);return o.length>0&&s.push(o),s}};Q.styles=[Tr,H,g`
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

      /* No-context mode: hide context lines, show only match lines. */
      :host([no-context]) .match .contents > .context {
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
    `],c([f({type:Object})],Q.prototype,"result",2),c([f({type:Boolean,reflect:!0,attribute:"no-context"})],Q.prototype,"noContext",2),c([T()],Q.prototype,"hlMap",2),Q=c([x("cs-result-group")],Q);var K=class extends _{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return u`<div id="countarea">Searching...</div>`;let e=this.truncated?`${this.total}+`:`${this.total}`;return u`
      <div id="countarea">
        <span id="numresults">${e}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};K.styles=[ft,g`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],c([f({type:Number})],K.prototype,"total",2),c([f({type:Number})],K.prototype,"timeMs",2),c([f({type:Boolean})],K.prototype,"truncated",2),c([f({type:Boolean})],K.prototype,"loading",2),K=c([x("cs-result-stats")],K);var nt=class extends _{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){let e=this.facets&&(this.facets.ext?.length||this.facets.repo?.length||this.facets.path?.length),s=Object.values(this.selected).some(n=>n.size>0);if(!e&&!s)return w;let i=[{label:"Extension",key:"f.ext",buckets:this.facets?.ext??[]},{label:"Repository",key:"f.repo",buckets:this.facets?.repo??[]},{label:"Path",key:"f.path",buckets:this.facets?.path??[]}].filter(n=>n.buckets.length>0||(this.selected[n.key]?.size??0)>0);return i.length===0?w:u`
      <div class="panel">
        ${i.map(n=>this.renderSection(n.label,n.key,n.buckets))}
      </div>
    `}renderSection(e,s,o){let i=this.selected[s]??new Set,h=[...o].sort((p,l)=>l.c-p.c||p.v.localeCompare(l.v)).slice(0,10),a=new Set(h.map(p=>p.v)),d=[...i].filter(p=>!a.has(p));return u`
      <div class="section">
        <span class="section-label">${e}</span>
        ${d.map(p=>u`
          <button
            class="pill stale"
            @click=${()=>this.toggle(s,p)}
          >${p}</button>
        `)}
        ${h.map(p=>u`
          <button
            class=${i.has(p.v)?"pill active":"pill"}
            @click=${()=>this.toggle(s,p.v)}
          >${p.v} <span class="count">${p.c}</span></button>
        `)}
      </div>
    `}toggle(e,s){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:e,value:s},bubbles:!0,composed:!0}))}};nt.styles=g`
    :host {
      display: block;
    }

    .panel {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 16px;
      padding: 4px 0;
    }

    /* Each section is a nowrap group — wraps as a unit, not per-pill. */
    .section {
      display: flex;
      flex-wrap: nowrap;
      gap: 4px;
      align-items: center;
    }

    .section-label {
      font-size: 11px;
      color: var(--color-foreground-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .pill {
      font-size: 12px;
      padding: 1px 8px;
      border: 1px solid var(--color-border-default);
      border-radius: 12px;
      background: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
      white-space: nowrap;
      line-height: 1.5;
    }

    .pill:hover {
      background: var(--color-background-hover);
    }

    .pill.active {
      background: var(--color-foreground-accent);
      color: var(--color-background);
      border-color: var(--color-foreground-accent);
    }

    .pill.stale {
      opacity: 0.5;
      border-style: dashed;
    }

    .count {
      color: var(--color-foreground-muted);
      font-size: 10px;
    }

    .pill.active .count {
      color: inherit;
    }
  `,c([f({type:Object})],nt.prototype,"facets",2),c([f({type:Object})],nt.prototype,"selected",2),nt=c([x("cs-facet-panel")],nt);var zt=class extends _{render(){return u`
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
    `}};zt.styles=[H,g`
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
    `],zt=c([x("cs-search-help")],zt);function Ys(r,t,e){let s=r[t]??new Set,o;return t==="f.path"?o=s.has(e)?new Set:new Set([e]):(o=new Set(s),o.has(e)?o.delete(e):o.add(e)),{...r,[t]:o}}function Xs(r){let t={};for(let[e,s]of Object.entries(r))s.size>0&&(t[e]=[...s]);return t}function to(r){let t={};for(let e of["f.ext","f.repo","f.path"]){let s=r.getAll(e);s.length>0&&(t[e]=new Set(s))}return t}var Dt=class extends Ct(_){constructor(){super(...arguments);this.currentOptions={}}get activeFacets(){return to(N.get().params)}render(){let e=mt.get(),s=Ot.get(),o=Pt.get(),i=Mt.get(),n=jt.get(),h=It.get(),a=Nt.get(),d=Hr.get(),p=i||n;return u`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${l=>l.preventDefault()}
        >
          <cs-search-input
            .value=${e}
            .error=${h??""}
            @search-input=${this.onSearchInput}
            @search-submit=${this.onSearchSubmit}
          ></cs-search-input>
          <div class="query-hint">
            Special terms:
            <code>path:</code>
            <code>-path:</code>
            <code>repo:</code>
            <code>-repo:</code>
            <code>max_matches:</code>
          </div>
          <cs-search-options
            .options=${this.currentOptions}
            .repos=${this.getRepos()}
            @options-change=${this.onOptionsChange}
          ></cs-search-options>
        </form>
      </div>
      <div id="resultbox">
        ${p?u`
          <div id="resultarea">
            <cs-result-stats
              .total=${i?.total??0}
              .timeMs=${i?.time_ms??0}
              .truncated=${i?.truncated??!1}
              .loading=${n}
            ></cs-result-stats>
            <cs-facet-panel
              .facets=${a}
              .selected=${this.activeFacets}
              @facet-toggle=${this.onFacetToggle}
            ></cs-facet-panel>
            <div
              id="results"
              tabindex="-1"
            >
              <div id="path-results">
                ${o.map(l=>{let{repo:b,version:m,filePath:v}=rt(l.path);return u`
                    <filename-match
                      text=${v}
                      start=${l.match[0]}
                      end=${l.match[1]}
                      repo=${b}
                      version=${m.slice(0,6)}
                      href="/view/${l.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${Ur({items:s,renderItem:l=>u`
                    <cs-result-group .result=${l} ?no-context=${d<=0}></cs-result-group>
                  `})}
              </div>
            </div>
          </div>
        `:u`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(e){let s=Ys(this.activeFacets,e.detail.key,e.detail.value),o=mt.get();o&&_e(o,this.currentOptions,this.facetParamsFrom(s))}onSearchInput(e){Wr(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onSearchSubmit(e){_e(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onOptionsChange(e){this.currentOptions=e.detail,this.reSearch()}reSearch(){let e=mt.get();e&&_e(e,this.currentOptions,this.facetParamsFrom(this.activeFacets))}getRepos(){return window.__CS_INIT?.repos??[]}facetParamsFrom(e){return Xs(e)}};Dt.styles=[H,ft,g`
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

      /* Virtualizer positions children absolutely; they need explicit width. */
      #code-results > cs-result-group {
        width: 100%;
        box-sizing: border-box;
      }

      #path-results {
        margin-bottom: 15px;
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

    `],Dt=c([x("cs-search-view")],Dt);var gt=class extends _{constructor(){super(...arguments);this.path=""}render(){let e=this.path.indexOf("/+/");if(e===-1)return u`<span>${this.path}</span>`;let s=this.path.slice(0,e),i=this.path.slice(e+3).split("/").filter(n=>n.length>0);return u`
      <nav class="breadcrumbs">
        <a href="/view/${s}/+/">${s}</a>
        ${i.map((n,h)=>{let a=i.slice(0,h+1).join("/"),d=`/view/${s}/+/${a}${h<i.length-1?"/":""}`;return u`<span class="sep">/</span><a href=${d}>${n}</a>`})}
      </nav>
    `}};gt.styles=g`
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
  `,c([f()],gt.prototype,"path",2),gt=c([x("cs-breadcrumbs")],gt);var at=class extends _{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let e=[...this.entries].sort((s,o)=>{let i=s.endsWith("/"),n=o.endsWith("/");return i!==n?i?-1:1:s.localeCompare(o)});return u`
      <div class="listing">
        ${e.map(s=>{let o=s.endsWith("/"),i=this.basePath+s;return u`
            <a class=${o?"dir":"file"} href=${i}>${s}</a>
          `})}
      </div>
    `}};at.styles=g`
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
  `,c([f({type:Array})],at.prototype,"entries",2),c([f()],at.prototype,"basePath",2),at=c([x("cs-dir-listing")],at);var eo={navigate(r){window.location.href=r}};function ro(r,t,e){switch(r){case"Enter":return t?{type:"open-tab",url:`/search?q=${encodeURIComponent(t)}`}:{type:"close-help"};case"/":return{type:"navigate",url:`/search${t?"?q="+encodeURIComponent(t):""}`};case"?":return{type:"toggle-help"};case"Escape":return{type:"close-help"};case"v":return e?{type:"navigate",url:e}:{type:"close-help"};case"n":return t?{type:"find",text:t,backwards:!1}:{type:"close-help"};case"p":return t?{type:"find",text:t,backwards:!0}:{type:"close-help"}}return null}function so(r,t,e,s){return!t||e<=0?Math.floor(r/3):e<=r?.5*(r-e):s/2}function oo(r,t){return r<0?"1":r===t?String(r):`${r}-L${t}`}function io(r,t,e){return r?r.replace("{lno}",oo(t,e)):""}function no(r){let t=r.match(/^#L(\d+)(?:-L?(\d+))?$/);if(!t)return[-1,-1];let e=parseInt(t[1],10),s=t[2]?parseInt(t[2],10):e;return[e,s]}var O=class extends _{constructor(){super(...arguments);this.content="";this.basePath="";this.filePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.hasSelection=!1;this.highlightedLines=null;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onSelectionChange=()=>{this.hasSelection=(window.getSelection()?.toString()||"").length>0};this.onKeyDown=e=>{e.target.matches("input,textarea")||e.altKey||e.ctrlKey||e.metaKey||this.processKey(e.key)&&e.preventDefault()}}willUpdate(e){(e.has("content")||e.has("filePath"))&&(this.highlightedLines=null,this.content&&this.filePath&&ye(this.filePath,this.content).then(s=>{s&&(this.highlightedLines=s)}))}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("selectionchange",this.onSelectionChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("selectionchange",this.onSelectionChange)}parseHash(){let[e,s]=no(window.location.hash);this.selectedStart=e,this.selectedEnd=s}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!e)return;let s=this.selectedStart!==this.selectedEnd,o=0;if(s){let h=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(h){let a=e.getBoundingClientRect(),d=h.getBoundingClientRect();o=d.top+d.height-a.top}}let i=so(window.innerHeight,s,o,e.offsetHeight),n=e.getBoundingClientRect();window.scrollTo(0,n.top+window.scrollY-i)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){return io(this.externalUrl,this.selectedStart,this.selectedEnd)}getSelectedText(){return window.getSelection()?.toString()||""}processKey(e){let s=ro(e,this.getSelectedText(),this.resolvedExternalUrl());if(!s)return!1;switch(s.type){case"navigate":eo.navigate(s.url);break;case"open-tab":window.open(s.url);break;case"find":window.find(s.text,!1,s.backwards);break;case"toggle-help":this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0}));break;case"close-help":this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));break}return!0}render(){let e=this.content.split(`
`);e.length>0&&e[e.length-1]===""&&e.pop();let s=this.highlightedLines;return u`
      ${this.hasSelection?u`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      `:""}
      <div class="viewer">
        ${e.map((o,i)=>{let n=i+1,h=n>=this.selectedStart&&n<=this.selectedEnd;return u`
            <div class="line ${h?"selected":""}" id="L${n}">
              <a class="lno" href="#L${n}" @click=${a=>this.onLineClick(a,n)}>${n}</a>
              <span class="code">${s&&s[i]?xe(s[i]):o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(e,s){if(e.shiftKey&&this.selectedStart>0){e.preventDefault();let o=Math.min(this.selectedStart,s),i=Math.max(this.selectedStart,s);this.selectedStart=o,this.selectedEnd=i,history.replaceState(null,"",`#L${o}-L${i}`)}else this.selectedStart=s,this.selectedEnd=s}};O.styles=[lt(we),g`
    .selection-hint {
      font-size: 11px;
      color: var(--color-foreground-subtle);
      padding: 4px 8px;
      border-bottom: 1px solid var(--color-border);
    }
    .selection-hint kbd {
      font-family: inherit;
      font-size: 10px;
      padding: 1px 4px;
      border: 1px solid var(--color-border);
      border-radius: 3px;
      background: var(--color-background-secondary, rgba(128, 128, 128, 0.1));
    }
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
  `],c([f()],O.prototype,"content",2),c([f()],O.prototype,"basePath",2),c([f()],O.prototype,"filePath",2),c([f()],O.prototype,"repo",2),c([f()],O.prototype,"version",2),c([f()],O.prototype,"externalUrl",2),c([T()],O.prototype,"selectedStart",2),c([T()],O.prototype,"selectedEnd",2),c([T()],O.prototype,"hasSelection",2),c([T()],O.prototype,"highlightedLines",2),O=c([x("cs-code-viewer")],O);var vt=class extends _{constructor(){super(...arguments);this.open=!1}render(){return this.open?u`
      <div class="overlay" @click=${this.close}>
        <div class="modal" @click=${e=>e.stopPropagation()}>
          <h3>Keyboard shortcuts</h3>
          <table>
            <tr><td><kbd>/</kbd></td><td>New search (or search selected text)</td></tr>
            <tr><td><kbd>?</kbd></td><td>Toggle this help</td></tr>
            <tr><td><kbd>v</kbd></td><td>View at external source (GitHub)</td></tr>
            <tr><td><kbd>n</kbd></td><td>Next match (with text selected)</td></tr>
            <tr><td><kbd>p</kbd></td><td>Previous match (with text selected)</td></tr>
            <tr><td><kbd>Enter</kbd></td><td>Search selected text in new tab</td></tr>
            <tr><td><kbd>Esc</kbd></td><td>Close this help</td></tr>
          </table>
          <p>Click a line number to highlight. Shift+click to select a range.</p>
        </div>
      </div>
    `:u``}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}))}};vt.styles=g`
    .overlay {
      position: fixed;
      inset: 0;
      background: var(--color-background-modal-overlay);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .modal {
      background: var(--color-background);
      border: 1px solid var(--color-border-default);
      border-radius: 8px;
      padding: 20px 28px;
      max-width: 500px;
      box-shadow: 0 4px 12px var(--color-shadow);
    }
    h3 {
      margin: 0 0 12px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    td {
      padding: 4px 8px;
      vertical-align: top;
    }
    td:first-child {
      white-space: nowrap;
      text-align: right;
      padding-right: 16px;
    }
    kbd {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      padding: 2px 6px;
      border: 1px solid var(--color-border-default);
      border-radius: 3px;
      background: var(--color-background-subtle);
    }
    p {
      margin: 12px 0 0;
      font-size: 13px;
      color: var(--color-foreground-muted);
    }
  `,c([f({type:Boolean,reflect:!0})],vt.prototype,"open",2),vt=c([x("cs-help-modal")],vt);function ao(r){let t=r.indexOf("/+/");if(t>=0){let e=r.slice(0,t),s=r.slice(t+3),o=e.lastIndexOf("@");if(o>=0)return{repo:e.slice(0,o),version:e.slice(o+1),filePath:s}}return rt(r)}function lo(r){return r.endsWith("/")||r.endsWith("/+/")||!r.includes("/+/")}function co(r,t){return`/raw/${r}${t&&!r.endsWith("/")?"/":""}`}function ho(r,t,e){let s="github.com/";return r.startsWith(s)?`https://github.com/${r.slice(s.length)}/blob/${t}/${e}#L{lno}`:""}var P=class extends _{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null;this.showHelp=!1}willUpdate(e){e.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let e=lo(this.path),s=co(this.path,e);try{let o=await fetch(s);if(!o.ok){this.error=`Not found (${o.status})`,this.loading=!1;return}(o.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await o.json(),this.fetchReadme(s)):this.content=await o.text()}catch(o){this.error=o instanceof Error?o.message:String(o)}this.loading=!1}async fetchReadme(e){if(!this.dirEntries)return;let s=this.dirEntries.find(o=>P.README_RE.test(o));if(s)try{let o=e.endsWith("/")?e:e+"/",i=await fetch(o+s);i.ok&&(this.readmeContent=await i.text())}catch{}}render(){let e=ao(this.path),s=e.repo,o=e.version,i=ho(e.repo,e.version,e.filePath);return u`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading?u`<div class="status">Loading...</div>`:""}
        ${this.error?u`<div class="status error">${this.error}</div>`:""}

        ${this.dirEntries?u`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith("/")?"":"/"}"
          ></cs-dir-listing>
          ${this.readmeContent?u`
            <div class="readme">
              <pre>${this.readmeContent}</pre>
            </div>
          `:""}
        `:""}

        ${this.content!==null?u`
          <cs-code-viewer
            .content=${this.content}
            .filePath=${e.filePath}
            .repo=${s}
            .version=${o}
            .externalUrl=${i}
            @toggle-help=${()=>{this.showHelp=!this.showHelp}}
            @close-help=${()=>{this.showHelp=!1}}
          ></cs-code-viewer>
        `:""}
        <cs-help-modal ?open=${this.showHelp} @close-help=${()=>{this.showHelp=!1}}></cs-help-modal>
      </div>
    `}};P.README_RE=/^readme\.(md|markdown|mdown|mkdn|txt|rst|org|adoc|asc)$/i,P.styles=g`
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
    .readme {
      margin-top: 16px;
      padding: 12px;
      border-top: 1px solid var(--color-border-default);
    }
    .readme pre {
      white-space: pre-wrap;
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
    }
  `,c([f()],P.prototype,"path",2),c([T()],P.prototype,"content",2),c([T()],P.prototype,"dirEntries",2),c([T()],P.prototype,"readmeContent",2),c([T()],P.prototype,"loading",2),c([T()],P.prototype,"error",2),c([T()],P.prototype,"showHelp",2),P=c([x("cs-file-view")],P);var Ht=class extends _{render(){return u`
      <div class="about">
        <p>
          cs is a port of the <a href="https://github.com/livegrep/livegrep">livegrep</a> web UI onto a
          backend powered by Russ Cox's <a href="https://github.com/google/codesearch">codesearch</a> code.
        </p>
        <p>
          The livegrep project was an experiment in scaling real-time regex search, inspired in part by the
          death of <a href="http://google.com/codesearch">Google Codesearch</a>. Livegrep is written and
          run by <a href="https://nelhage.com/">Nelson Elhage</a> and is
          <a href="https://github.com/livegrep/livegrep">open source</a>.
        </p>
      </div>
    `}};Ht.styles=[H,g`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Ht=c([x("cs-about-view")],Ht);var Wt=class extends Ct(_){render(){let t=N.get();return u`
      <main>${this.renderView(t)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(t){switch(t.name){case"search":return u`<cs-search-view></cs-search-view>`;case"view":return u`<cs-file-view .path=${t.path??""}></cs-file-view>`;case"about":return u`<cs-about-view></cs-about-view>`;default:return u`<div class="placeholder">Not found</div>`}}};Wt.styles=[H,g`
      :host {
        display: block;
      }

      footer {
        font-size: 12px;
        color: var(--color-foreground-subtle);
        margin: 1em auto;
        width: 40em;
        text-align: center;
      }

      footer ul {
        padding: 0;
      }

      footer li {
        display: inline;
      }

      footer li::before {
        content: "\\2219";
        color: var(--color-foreground-subtle);
        text-decoration: none;
        margin: 5px;
      }

      footer li:first-child::before {
        content: "";
      }
    `],Wt=c([x("cs-app")],Wt);export{Wt as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
