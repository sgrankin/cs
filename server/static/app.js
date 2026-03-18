import{c as a}from"./chunk-NVALI5VU.js";var Bt=globalThis,Vt=Bt.ShadowRoot&&(Bt.ShadyCSS===void 0||Bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ee=Symbol(),tr=new WeakMap,_t=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Vt&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=tr.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&tr.set(e,t))}return t}toString(){return this.cssText}},at=r=>new _t(typeof r=="string"?r:r+"",void 0,Ee),g=(r,...t)=>{let e=r.length===1?r[0]:t.reduce(((s,o,i)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[i+1]),r[0]);return new _t(e,r,Ee)},er=(r,t)=>{if(Vt)r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let s=document.createElement("style"),o=Bt.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,r.appendChild(s)}},Ce=Vt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return at(e)})(r):r;var{is:Jr,defineProperty:Qr,getOwnPropertyDescriptor:Zr,getOwnPropertyNames:Yr,getOwnPropertySymbols:Xr,getPrototypeOf:ts}=Object,Ft=globalThis,rr=Ft.trustedTypes,es=rr?rr.emptyScript:"",rs=Ft.reactiveElementPolyfillSupport,bt=(r,t)=>r,yt={toAttribute(r,t){switch(t){case Boolean:r=r?es:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Kt=(r,t)=>!Jr(r,t),sr={attribute:!0,type:String,converter:yt,reflect:!1,useDefault:!1,hasChanged:Kt};Symbol.metadata??=Symbol("metadata"),Ft.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=sr){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&Qr(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){let{get:o,set:i}=Zr(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){let h=o?.call(this);i?.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??sr}static _$Ei(){if(this.hasOwnProperty(bt("elementProperties")))return;let t=ts(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(bt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(bt("properties"))){let e=this.properties,s=[...Yr(e),...Xr(e)];for(let o of s)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let o of s)e.unshift(Ce(o))}else t!==void 0&&e.push(Ce(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return er(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:yt).toAttribute(e,s.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){let s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let i=s.getPropertyOptions(o),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:yt;this._$Em=o;let h=n.fromAttribute(e,i.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){let o=this.constructor,i=this[t];if(s??=o.getPropertyOptions(t),!((s.hasChanged??Kt)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:i},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[o,i]of s){let{wrapped:n}=i,h=this[o];n!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,i,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[bt("elementProperties")]=new Map,B[bt("finalized")]=new Map,rs?.({ReactiveElement:B}),(Ft.reactiveElementVersions??=[]).push("2.1.1");var Ae=globalThis,Gt=Ae.trustedTypes,or=Gt?Gt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Re="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+V,ss=`<${Te}>`,X=document,wt=()=>X.createComment(""),$t=r=>r===null||typeof r!="object"&&typeof r!="function",Le=Array.isArray,hr=r=>Le(r)||typeof r?.[Symbol.iterator]=="function",ke=`[ 	
\f\r]`,xt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ir=/-->/g,nr=/>/g,Z=RegExp(`>|${ke}(?:([^\\s"'>=/]+)(${ke}*=${ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lr=/'/g,ar=/"/g,dr=/^(?:script|style|textarea|title)$/i,Oe=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),d=Oe(1),ur=Oe(2),mo=Oe(3),T=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),cr=new WeakMap,Y=X.createTreeWalker(X,129);function pr(r,t){if(!Le(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return or!==void 0?or.createHTML(t):t}var fr=(r,t)=>{let e=r.length-1,s=[],o,i=t===2?"<svg>":t===3?"<math>":"",n=xt;for(let h=0;h<e;h++){let l=r[h],u,m,c=-1,b=0;for(;b<l.length&&(n.lastIndex=b,m=n.exec(l),m!==null);)b=n.lastIndex,n===xt?m[1]==="!--"?n=ir:m[1]!==void 0?n=nr:m[2]!==void 0?(dr.test(m[2])&&(o=RegExp("</"+m[2],"g")),n=Z):m[3]!==void 0&&(n=Z):n===Z?m[0]===">"?(n=o??xt,c=-1):m[1]===void 0?c=-2:(c=n.lastIndex-m[2].length,u=m[1],n=m[3]===void 0?Z:m[3]==='"'?ar:lr):n===ar||n===lr?n=Z:n===ir||n===nr?n=xt:(n=Z,o=void 0);let p=n===Z&&r[h+1].startsWith("/>")?" ":"";i+=n===xt?l+ss:c>=0?(s.push(u),l.slice(0,c)+Re+l.slice(c)+V+p):l+V+(c===-2?h:p)}return[pr(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},St=class r{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let i=0,n=0,h=t.length-1,l=this.parts,[u,m]=fr(t,e);if(this.el=r.createElement(u,s),Y.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=Y.nextNode())!==null&&l.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(let c of o.getAttributeNames())if(c.endsWith(Re)){let b=m[n++],p=o.getAttribute(c).split(V),_=/([.?@])?(.*)/.exec(b);l.push({type:1,index:i,name:_[2],strings:p,ctor:_[1]==="."?Qt:_[1]==="?"?Zt:_[1]==="@"?Yt:et}),o.removeAttribute(c)}else c.startsWith(V)&&(l.push({type:6,index:i}),o.removeAttribute(c));if(dr.test(o.tagName)){let c=o.textContent.split(V),b=c.length-1;if(b>0){o.textContent=Gt?Gt.emptyScript:"";for(let p=0;p<b;p++)o.append(c[p],wt()),Y.nextNode(),l.push({type:2,index:++i});o.append(c[b],wt())}}}else if(o.nodeType===8)if(o.data===Te)l.push({type:2,index:i});else{let c=-1;for(;(c=o.data.indexOf(V,c+1))!==-1;)l.push({type:7,index:i}),c+=V.length-1}i++}}static createElement(t,e){let s=X.createElement("template");return s.innerHTML=t,s}};function tt(r,t,e=r,s){if(t===T)return t;let o=s!==void 0?e._$Co?.[s]:e._$Cl,i=$t(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=o:e._$Cl=o),o!==void 0&&(t=tt(r,o._$AS(r,t.values),o,s)),t}var Jt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??X).importNode(e,!0);Y.currentNode=o;let i=Y.nextNode(),n=0,h=0,l=s[0];for(;l!==void 0;){if(n===l.index){let u;l.type===2?u=new ct(i,i.nextSibling,this,t):l.type===1?u=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(u=new Xt(i,this,t)),this._$AV.push(u),l=s[++h]}n!==l?.index&&(i=Y.nextNode(),n++)}return Y.currentNode=X,o}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},ct=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),$t(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):hr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==w&&$t(this._$AH)?this._$AA.nextSibling.data=t:this.T(X.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=St.createElement(pr(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{let i=new Jt(o,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=cr.get(t.strings);return e===void 0&&cr.set(t.strings,e=new St(t)),e}k(t){Le(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,o=0;for(let i of t)o===e.length?e.push(s=new r(this.O(wt()),this.O(wt()),this,this.options)):s=e[o],s._$AI(i),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,i){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w}_$AI(t,e=this,s,o){let i=this.strings,n=!1;if(i===void 0)t=tt(this,t,e,0),n=!$t(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else{let h=t,l,u;for(t=i[0],l=0;l<i.length-1;l++)u=tt(this,h[s+l],e,l),u===T&&(u=this._$AH[l]),n||=!$t(u)||u!==this._$AH[l],u===w?t=w:t!==w&&(t+=(u??"")+i[l+1]),this._$AH[l]=u}n&&!o&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Qt=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}},Zt=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}},Yt=class extends et{constructor(t,e,s,o,i){super(t,e,s,o,i),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??w)===T)return;let s=this._$AH,o=t===w&&s!==w||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==w&&(s===w||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Xt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}},mr={M:Re,P:V,A:Te,C:1,L:fr,R:Jt,D:hr,V:tt,I:ct,H:et,N:Zt,U:Yt,B:Qt,F:Xt},os=Ae.litHtmlPolyfillSupport;os?.(St,ct),(Ae.litHtmlVersions??=[]).push("3.3.1");var gr=(r,t,e)=>{let s=e?.renderBefore??t,o=s._$litPart$;if(o===void 0){let i=e?.renderBefore??null;s._$litPart$=o=new ct(t.insertBefore(wt(),i),i,void 0,e??{})}return o._$AI(r),o};var Pe=globalThis,v=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};v._$litElement$=!0,v.finalized=!0,Pe.litElementHydrateSupport?.({LitElement:v});var is=Pe.litElementPolyfillSupport;is?.({LitElement:v});(Pe.litElementVersions??=[]).push("4.2.1");var x=r=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(r,t)})):customElements.define(r,t)};var ns={attribute:!0,type:String,converter:yt,reflect:!1,hasChanged:Kt},ls=(r=ns,t,e)=>{let{kind:s,metadata:o}=e,i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(e.name,r),s==="accessor"){let{name:n}=e;return{set(h){let l=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,l,r)},init(h){return h!==void 0&&this.C(n,void 0,r,h),h}}}if(s==="setter"){let{name:n}=e;return function(h){let l=this[n];t.call(this,h),this.requestUpdate(n,l,r)}}throw Error("Unsupported decorator location: "+s)};function f(r){return(t,e)=>typeof e=="object"?ls(r,t,e):((s,o,i)=>{let n=o.hasOwnProperty(i);return o.constructor.createProperty(i,s),n?Object.getOwnPropertyDescriptor(o,i):void 0})(r,t,e)}function A(r){return f({...r,state:!0,attribute:!1})}var as=Object.defineProperty,cs=(r,t,e)=>t in r?as(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,Ne=(r,t,e)=>(cs(r,typeof t!="symbol"?t+"":t,e),e),hs=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)},Me=(r,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return r.has(t)},ee=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},vr=(r,t,e)=>(hs(r,t,"access private method"),e);function _r(r,t){return Object.is(r,t)}var C=null,Et=!1,re=1,se=Symbol("SIGNAL");function ht(r){let t=C;return C=r,t}function ds(){return C}function us(){return Et}var De={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function oe(r){if(Et)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(C===null)return;C.consumerOnSignalRead(r);let t=C.nextProducerIndex++;if(dt(C),t<C.producerNode.length&&C.producerNode[t]!==r&&Ue(C)){let e=C.producerNode[t];ie(e,C.producerIndexOfThis[t])}C.producerNode[t]!==r&&(C.producerNode[t]=r,C.producerIndexOfThis[t]=Ue(C)?xr(r,C,t):0),C.producerLastReadVersion[t]=r.version}function ps(){re++}function br(r){if(!(!r.dirty&&r.lastCleanEpoch===re)){if(!r.producerMustRecompute(r)&&!_s(r)){r.dirty=!1,r.lastCleanEpoch=re;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=re}}function yr(r){if(r.liveConsumerNode===void 0)return;let t=Et;Et=!0;try{for(let e of r.liveConsumerNode)e.dirty||ms(e)}finally{Et=t}}function fs(){return C?.consumerAllowSignalWrites!==!1}function ms(r){var t;r.dirty=!0,yr(r),(t=r.consumerMarkedDirty)==null||t.call(r.wrapper??r)}function gs(r){return r&&(r.nextProducerIndex=0),ht(r)}function vs(r,t){if(ht(t),!(!r||r.producerNode===void 0||r.producerIndexOfThis===void 0||r.producerLastReadVersion===void 0)){if(Ue(r))for(let e=r.nextProducerIndex;e<r.producerNode.length;e++)ie(r.producerNode[e],r.producerIndexOfThis[e]);for(;r.producerNode.length>r.nextProducerIndex;)r.producerNode.pop(),r.producerLastReadVersion.pop(),r.producerIndexOfThis.pop()}}function _s(r){dt(r);for(let t=0;t<r.producerNode.length;t++){let e=r.producerNode[t],s=r.producerLastReadVersion[t];if(s!==e.version||(br(e),s!==e.version))return!0}return!1}function xr(r,t,e){var s;if(He(r),dt(r),r.liveConsumerNode.length===0){(s=r.watched)==null||s.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)r.producerIndexOfThis[o]=xr(r.producerNode[o],r,o)}return r.liveConsumerIndexOfThis.push(e),r.liveConsumerNode.push(t)-1}function ie(r,t){var e;if(He(r),dt(r),typeof ngDevMode<"u"&&ngDevMode&&t>=r.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${r.liveConsumerNode.length} consumers)`);if(r.liveConsumerNode.length===1){(e=r.unwatched)==null||e.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)ie(r.producerNode[o],r.producerIndexOfThis[o])}let s=r.liveConsumerNode.length-1;if(r.liveConsumerNode[t]=r.liveConsumerNode[s],r.liveConsumerIndexOfThis[t]=r.liveConsumerIndexOfThis[s],r.liveConsumerNode.length--,r.liveConsumerIndexOfThis.length--,t<r.liveConsumerNode.length){let o=r.liveConsumerIndexOfThis[t],i=r.liveConsumerNode[t];dt(i),i.producerIndexOfThis[o]=t}}function Ue(r){var t;return r.consumerIsAlwaysLive||(((t=r?.liveConsumerNode)==null?void 0:t.length)??0)>0}function dt(r){r.producerNode??(r.producerNode=[]),r.producerIndexOfThis??(r.producerIndexOfThis=[]),r.producerLastReadVersion??(r.producerLastReadVersion=[])}function He(r){r.liveConsumerNode??(r.liveConsumerNode=[]),r.liveConsumerIndexOfThis??(r.liveConsumerIndexOfThis=[])}function wr(r){if(br(r),oe(r),r.value===ze)throw r.error;return r.value}function bs(r){let t=Object.create(ys);t.computation=r;let e=()=>wr(t);return e[se]=t,e}var je=Symbol("UNSET"),Ie=Symbol("COMPUTING"),ze=Symbol("ERRORED"),ys={...De,value:je,dirty:!0,error:null,equal:_r,producerMustRecompute(r){return r.value===je||r.value===Ie},producerRecomputeValue(r){if(r.value===Ie)throw new Error("Detected cycle in computations.");let t=r.value;r.value=Ie;let e=gs(r),s,o=!1;try{s=r.computation.call(r.wrapper),o=t!==je&&t!==ze&&r.equal.call(r.wrapper,t,s)}catch(i){s=ze,r.error=i}finally{vs(r,e)}if(o){r.value=t;return}r.value=s,r.version++}};function xs(){throw new Error}var ws=xs;function $s(){ws()}function Ss(r){let t=Object.create(ks);t.value=r;let e=()=>(oe(t),t.value);return e[se]=t,e}function Es(){return oe(this),this.value}function Cs(r,t){fs()||$s(),r.equal.call(r.wrapper,r.value,t)||(r.value=t,As(r))}var ks={...De,equal:_r,value:void 0};function As(r){r.version++,ps(),yr(r)}var R=Symbol("node"),S;(r=>{var t,e,s,o,i,n;class h{constructor(m,c={}){ee(this,e),Ne(this,t);let p=Ss(m)[se];if(this[R]=p,p.wrapper=this,c){let _=c.equals;_&&(p.equal=_),p.watched=c[r.subtle.watched],p.unwatched=c[r.subtle.unwatched]}}get(){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Es.call(this[R])}set(m){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(us())throw new Error("Writes to signals not permitted during Watcher callback");let c=this[R];Cs(c,m)}}t=R,e=new WeakSet,s=function(){},r.isState=u=>typeof u=="object"&&Me(e,u),r.State=h;class l{constructor(m,c){ee(this,i),Ne(this,o);let p=bs(m)[se];if(p.consumerAllowSignalWrites=!0,this[R]=p,p.wrapper=this,c){let _=c.equals;_&&(p.equal=_),p.watched=c[r.subtle.watched],p.unwatched=c[r.subtle.unwatched]}}get(){if(!(0,r.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return wr(this[R])}}o=R,i=new WeakSet,n=function(){},r.isComputed=u=>typeof u=="object"&&Me(i,u),r.Computed=l,(u=>{var m,c,b,p,_;function k(E){let $,y=null;try{y=ht(null),$=E()}finally{ht(y)}return $}u.untrack=k;function z(E){var $;if(!(0,r.isComputed)(E)&&!(0,r.isWatcher)(E))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(($=E[R].producerNode)==null?void 0:$.map(y=>y.wrapper))??[]}u.introspectSources=z;function P(E){var $;if(!(0,r.isComputed)(E)&&!(0,r.isState)(E))throw new TypeError("Called introspectSinks without a Signal argument");return(($=E[R].liveConsumerNode)==null?void 0:$.map(y=>y.wrapper))??[]}u.introspectSinks=P;function $e(E){if(!(0,r.isComputed)(E)&&!(0,r.isState)(E))throw new TypeError("Called hasSinks without a Signal argument");let $=E[R].liveConsumerNode;return $?$.length>0:!1}u.hasSinks=$e;function Se(E){if(!(0,r.isComputed)(E)&&!(0,r.isWatcher)(E))throw new TypeError("Called hasSources without a Computed or Watcher argument");let $=E[R].producerNode;return $?$.length>0:!1}u.hasSources=Se;class Fr{constructor($){ee(this,c),ee(this,p),Ne(this,m);let y=Object.create(De);y.wrapper=this,y.consumerMarkedDirty=$,y.consumerIsAlwaysLive=!0,y.consumerAllowSignalWrites=!1,y.producerNode=[],this[R]=y}watch(...$){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");vr(this,p,_).call(this,$);let y=this[R];y.dirty=!1;let M=ht(y);for(let qt of $)oe(qt[R]);ht(M)}unwatch(...$){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");vr(this,p,_).call(this,$);let y=this[R];dt(y);for(let M=y.producerNode.length-1;M>=0;M--)if($.includes(y.producerNode[M].wrapper)){ie(y.producerNode[M],y.producerIndexOfThis[M]);let qt=y.producerNode.length-1;if(y.producerNode[M]=y.producerNode[qt],y.producerIndexOfThis[M]=y.producerIndexOfThis[qt],y.producerNode.length--,y.producerIndexOfThis.length--,y.nextProducerIndex--,M<y.producerNode.length){let Gr=y.producerIndexOfThis[M],Xe=y.producerNode[M];He(Xe),Xe.liveConsumerIndexOfThis[Gr]=M}}}getPending(){if(!(0,r.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[R].producerNode.filter(y=>y.dirty).map(y=>y.wrapper)}}m=R,c=new WeakSet,b=function(){},p=new WeakSet,_=function(E){for(let $ of E)if(!(0,r.isComputed)($)&&!(0,r.isState)($))throw new TypeError("Called watch/unwatch without a Computed or State argument")},r.isWatcher=E=>Me(c,E),u.Watcher=Fr;function Kr(){var E;return(E=ds())==null?void 0:E.wrapper}u.currentComputed=Kr,u.watched=Symbol("watched"),u.unwatched=Symbol("unwatched")})(r.subtle||(r.subtle={}))})(S||(S={}));var We=!1,$r=new S.subtle.Watcher(()=>{We||(We=!0,queueMicrotask(()=>{We=!1;for(let r of $r.getPending())r.get();$r.watch()}))}),Rs=Symbol("SignalWatcherBrand"),Ts=new FinalizationRegistry(r=>{r.unwatch(...S.subtle.introspectSources(r))}),Sr=new WeakMap;function Ct(r){return r[Rs]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),r):class extends r{constructor(){super(...arguments),this._$St=new Map,this._$So=new S.State(0),this._$Si=!1}_$Sl(){var t,e;let s=[],o=[];this._$St.forEach((n,h)=>{(n?.beforeUpdate?s:o).push(h)});let i=(t=this.h)===null||t===void 0?void 0:t.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));s.forEach(n=>n.get()),(e=this._$Su)===null||e===void 0||e.get(),i.forEach(n=>n.get()),o.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new S.Computed(()=>{this._$So.get(),super.performUpdate()});let t=this.h=new S.subtle.Watcher(function(){let e=Sr.get(this);e!==void 0&&(e._$Si===!1&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});Sr.set(t,this),Ts.register(this,t),t.watch(this._$Su),t.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(this.h===void 0)return;let t=!1;this.h.unwatch(...S.subtle.introspectSources(this.h).filter(e=>{var s;let o=((s=this._$St.get(e))===null||s===void 0?void 0:s.manualDispose)!==!0;return o&&this._$St.delete(e),t||(t=!o),o})),t||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(t,e){var s;this._$S_();let o=new S.Computed(()=>{t()});return this.h.watch(o),this._$St.set(o,e),(s=e?.beforeUpdate)!==null&&s!==void 0&&s?S.subtle.untrack(()=>o.get()):this.updateComplete.then(()=>S.subtle.untrack(()=>o.get())),()=>{this._$St.delete(o),this.h.unwatch(o),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var H={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},j=r=>(...t)=>({_$litDirective$:r,values:t}),D=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Ls}=mr;var Cr=r=>r.strings===void 0,Er=()=>document.createComment(""),ut=(r,t,e)=>{let s=r._$AA.parentNode,o=t===void 0?r._$AB:t._$AA;if(e===void 0){let i=s.insertBefore(Er(),o),n=s.insertBefore(Er(),o);e=new Ls(i,n,r,r.options)}else{let i=e._$AB.nextSibling,n=e._$AM,h=n!==r;if(h){let l;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(l=r._$AU)!==n._$AU&&e._$AP(l)}if(i!==o||h){let l=e._$AA;for(;l!==i;){let u=l.nextSibling;s.insertBefore(l,o),l=u}}}return e},G=(r,t,e=r)=>(r._$AI(t,e),r),Os={},kr=(r,t=Os)=>r._$AH=t,Ar=r=>r._$AH,ne=r=>{r._$AR(),r._$AA.remove()};var kt=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let s of e)s._$AO?.(t,!1),kt(s,t);return!0},le=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},Rr=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),Ms(t)}};function Ps(r){this._$AN!==void 0?(le(this),this._$AM=r,Rr(this)):this._$AM=r}function Ns(r,t=!1,e=0){let s=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(s))for(let i=e;i<s.length;i++)kt(s[i],!1),le(s[i]);else s!=null&&(kt(s,!1),le(s));else kt(this,r)}var Ms=r=>{r.type==H.CHILD&&(r._$AP??=Ns,r._$AQ??=Ps)},pt=class extends D{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),Rr(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(kt(this,t),le(this))}setValue(t){if(Cr(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var qe=!1,Be=new S.subtle.Watcher(async()=>{qe||(qe=!0,queueMicrotask(()=>{qe=!1;for(let r of Be.getPending())r.get();Be.watch()}))}),ae=class extends pt{_$S_(){var t,e;this._$Sm===void 0&&(this._$Sj=new S.Computed(()=>{var s;let o=(s=this._$SW)===null||s===void 0?void 0:s.get();return this.setValue(o),o}),this._$Sm=(e=(t=this._$Sk)===null||t===void 0?void 0:t.h)!==null&&e!==void 0?e:Be,this._$Sm.watch(this._$Sj),S.subtle.untrack(()=>{var s;return(s=this._$Sj)===null||s===void 0?void 0:s.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return S.subtle.untrack(()=>t.get())}update(t,[e]){var s,o;return(s=this._$Sk)!==null&&s!==void 0||(this._$Sk=(o=t.options)===null||o===void 0?void 0:o.host),e!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=e,this._$S_(),S.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},Ve=j(ae);var Fe=r=>(t,...e)=>r(t,...e.map(s=>s instanceof S.State||s instanceof S.Computed?Ve(s):s)),js=Fe(d),Is=Fe(ur);var ki=S.State,Ai=S.Computed,F=(r,t)=>new S.State(r,t),ce=(r,t)=>new S.Computed(r,t);var Us=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function Tr(r,t=""){for(let{pattern:e,name:s}of Us){let o=e.exec(r);if(o)return{name:s,path:o[1],params:new URLSearchParams(t)}}return{name:"not-found",params:new URLSearchParams(t)}}var N=F(Tr(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{N.set(Tr(window.location.pathname,window.location.search))});var Ii=g`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,W=g`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Ui=g`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,Lr=g`
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
`,Or=g`
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
`,Pr=g`
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
`,zi=g`
  .hidden {
    display: none !important;
  }
`;var Nr=(r,t,e)=>{let s=new Map;for(let o=t;o<=e;o++)s.set(r[o],o);return s},Mr=j(class extends D{constructor(r){if(super(r),r.type!==H.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);let o=[],i=[],n=0;for(let h of r)o[n]=s?s(h,n):n,i[n]=e(h,n),n++;return{values:i,keys:o}}render(r,t,e){return this.dt(r,t,e).values}update(r,[t,e,s]){let o=Ar(r),{values:i,keys:n}=this.dt(t,e,s);if(!Array.isArray(o))return this.ut=n,i;let h=this.ut??=[],l=[],u,m,c=0,b=o.length-1,p=0,_=i.length-1;for(;c<=b&&p<=_;)if(o[c]===null)c++;else if(o[b]===null)b--;else if(h[c]===n[p])l[p]=G(o[c],i[p]),c++,p++;else if(h[b]===n[_])l[_]=G(o[b],i[_]),b--,_--;else if(h[c]===n[_])l[_]=G(o[c],i[_]),ut(r,l[_+1],o[c]),c++,_--;else if(h[b]===n[p])l[p]=G(o[b],i[p]),ut(r,o[c],o[b]),b--,p++;else if(u===void 0&&(u=Nr(n,p,_),m=Nr(h,c,b)),u.has(h[c]))if(u.has(h[b])){let k=m.get(n[p]),z=k!==void 0?o[k]:null;if(z===null){let P=ut(r,o[c]);G(P,i[p]),l[p]=P}else l[p]=G(z,i[p]),ut(r,o[c],z),o[k]=null;p++}else ne(o[b]),b--;else ne(o[c]),c++;for(;p<=_;){let k=ut(r,l[_+1]);G(k,i[p]),l[p++]=k}for(;c<=b;){let k=o[c++];k!==null&&ne(k)}return this.ut=n,kr(r,l),T}});var At=class r extends Event{constructor(t){super(r.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};At.eventName="rangeChanged";var Rt=class r extends Event{constructor(t){super(r.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};Rt.eventName="visibilityChanged";var Tt=class r extends Event{constructor(){super(r.eventName,{bubbles:!1})}};Tt.eventName="unpinned";var Ke=class{constructor(t){this._element=null;let e=t??window;this._node=e,t&&(this._element=t)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}},he=class extends Ke{constructor(t,e){super(e),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let s=this._node;this._originalScrollTo=s.scrollTo,this._originalScrollBy=s.scrollBy,this._originalScroll=s.scroll,this._attach(t)}get _destination(){return this.__destination}get scrolling(){return this._destination!==null}scrollTo(t,e){let s=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;this._scrollTo(s)}scrollBy(t,e){let s=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;s.top!==void 0&&(s.top+=this.scrollTop),s.left!==void 0&&(s.left+=this.scrollLeft),this._scrollTo(s)}_nativeScrollTo(t){this._originalScrollTo.bind(this._element||window)(t)}_scrollTo(t,e=null,s=null){this._end!==null&&this._end(),t.behavior==="smooth"?(this._setDestination(t),this._retarget=e,this._end=s):this._resetScrollState(),this._nativeScrollTo(t)}_setDestination(t){let{top:e,left:s}=t;return e=e===void 0?void 0:Math.max(0,Math.min(e,this.maxScrollTop)),s=s===void 0?void 0:Math.max(0,Math.min(s,this.maxScrollLeft)),this._destination!==null&&s===this._destination.left&&e===this._destination.top?!1:(this.__destination={top:e,left:s,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(t){this._destination&&this._setDestination(t)&&this._nativeScrollTo(this._destination)}managedScrollTo(t,e,s){return this._scrollTo(t,e,s),this._updateManagedScrollTo}correctScrollError(t){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(t),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(this._destination!==null){let{scrollTop:t,scrollLeft:e}=this,{top:s,left:o}=this._destination;s=Math.min(s||0,this.maxScrollTop),o=Math.min(o||0,this.maxScrollLeft);let i=Math.abs(s-t),n=Math.abs(o-e);i<1&&n<1&&(this._end&&this._end(),this._resetScrollState())}}detach(t){return this._clients.delete(t),this._clients.size===0&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(t){this._clients.add(t),this._clients.size===1&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};var jr=typeof window<"u"?window.ResizeObserver:void 0;var zr=Symbol("virtualizerRef"),de="virtualizer-sizer",Ir,pe=class{constructor(t){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!t)throw new Error("Virtualizer constructor requires a configuration object");if(t.hostElement)this._init(t);else throw new Error('Virtualizer configuration requires the "hostElement" property')}set items(t){Array.isArray(t)&&t!==this._items&&(this._itemsChanged=!0,this._items=t,this._schedule(this._updateLayout))}_init(t){this._isScroller=!!t.scroller,this._initHostElement(t);let e=t.layout||{};this._layoutInitialized=this._initLayout(e)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new jr(()=>this._hostElementSizeChanged()),this._childrenRO=new jr(this._childrenSizeChanged.bind(this))}_initHostElement(t){let e=this._hostElement=t.hostElement;this._applyVirtualizerStyles(),e[zr]=this}connected(){this._initObservers();let t=this._isScroller;this._clippingAncestors=Hs(this._hostElement,t),this._scrollerController=new he(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(t=>{t.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(t),this._hostElementRO.observe(t)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(t=>this._childrenRO.observe(t)),this._scrollEventListeners.forEach(t=>t.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(t=>t.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let t=this._hostElement;if(!this._sizer){let e=t.querySelector(`[${de}]`);e||(e=document.createElement("div"),e.setAttribute(de,""),t.appendChild(e)),Object.assign(e.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),e.textContent="&nbsp;",e.setAttribute(de,""),this._sizer=e}return this._sizer}async updateLayoutConfig(t){await this._layoutInitialized;let e=t.type||Ir;if(typeof e=="function"&&this._layout instanceof e){let s={...t};return delete s.type,this._layout.config=s,!0}return!1}async _initLayout(t){let e,s;if(typeof t.type=="function"){s=t.type;let o={...t};delete o.type,e=o}else e=t;s===void 0&&(Ir=s=(await import("./flow-EWBFT27W.js")).FlowLayout),this._layout=new s(o=>this._handleLayoutMessage(o),e),this._layout.measureChildren&&typeof this._layout.updateItemSizes=="function"&&(typeof this._layout.measureChildren=="function"&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){this._benchmarkStart===null&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(this._benchmarkStart!==null){let t=window.performance.now(),e=t-this._benchmarkStart,o=performance.getEntriesByName("uv-virtualizing","measure").filter(i=>i.startTime>=this._benchmarkStart&&i.startTime<t).reduce((i,n)=>i+n.duration,0);return this._benchmarkStart=null,{timeElapsed:e,virtualizationTime:o}}return null}_measureChildren(){let t={},e=this._children,s=this._measureChildOverride||this._measureChild;for(let o=0;o<e.length;o++){let i=e[o],n=this._first+o;(this._itemsChanged||this._toBeMeasured.has(i))&&(t[n]=s.call(this,i,this._items[n]))}this._childMeasurements=t,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(t){let{width:e,height:s}=t.getBoundingClientRect();return Object.assign({width:e,height:s},zs(t))}async _schedule(t){this._scheduled.has(t)||(this._scheduled.add(t),await Promise.resolve(),this._scheduled.delete(t),t.call(this))}async _updateDOM(t){this._scrollSize=t.scrollSize,this._adjustRange(t.range),this._childrenPos=t.childPositions,this._scrollError=t.scrollError||null;let{_rangeChanged:e,_itemsChanged:s}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(e||s)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(t=>this._childrenRO.observe(t)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),this._childMeasurements!==null&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(t){console.warn("Error measuring performance data: ",t)}window.performance.mark("uv-start")}this._scrollerController.correctingScrollError===!1&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(t){t.type==="scroll"?(t.currentTarget===window||this._clippingAncestors.includes(t.currentTarget))&&this._handleScrollEvent():console.warn("event not handled",t)}_handleLayoutMessage(t){t.type==="stateChanged"?this._updateDOM(t):t.type==="visibilityChanged"?(this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._notifyVisibility()):t.type==="unpinned"&&this._hostElement.dispatchEvent(new Tt)}get _children(){let t=[],e=this._hostElement.firstElementChild;for(;e;)e.hasAttribute(de)||t.push(e),e=e.nextElementSibling;return t}_updateView(){let t=this._hostElement,e=this._scrollerController?.element,s=this._layout;if(t&&e&&s){let o,i,n,h,l=t.getBoundingClientRect();o=0,i=0,n=window.innerHeight,h=window.innerWidth;let u=this._clippingAncestors.map(P=>P.getBoundingClientRect());u.unshift(l);for(let P of u)o=Math.max(o,P.top),i=Math.max(i,P.left),n=Math.min(n,P.bottom),h=Math.min(h,P.right);let m=e.getBoundingClientRect(),c={left:l.left-m.left,top:l.top-m.top},b={width:e.scrollWidth,height:e.scrollHeight},p=o-l.top+t.scrollTop,_=i-l.left+t.scrollLeft,k=Math.max(0,n-o),z=Math.max(0,h-i);s.viewportSize={width:z,height:k},s.viewportScroll={top:p,left:_},s.totalScrollSize=b,s.offsetWithinScroller=c}}_sizeHostElement(t){let s=t&&t.width!==null?Math.min(82e5,t.width):0,o=t&&t.height!==null?Math.min(82e5,t.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${s}px, ${o}px)`;else{let i=this._hostElement.style;i.minWidth=s?`${s}px`:"100%",i.minHeight=o?`${o}px`:"100%"}}_positionChildren(t){t&&t.forEach(({top:e,left:s,width:o,height:i,xOffset:n,yOffset:h},l)=>{let u=this._children[l-this._first];u&&(u.style.position="absolute",u.style.boxSizing="border-box",u.style.transform=`translate(${s}px, ${e}px)`,o!==void 0&&(u.style.width=o+"px"),i!==void 0&&(u.style.height=i+"px"),u.style.left=n===void 0?null:n+"px",u.style.top=h===void 0?null:h+"px")})}async _adjustRange(t){let{_first:e,_last:s,_firstVisible:o,_lastVisible:i}=this;this._first=t.first,this._last=t.last,this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==e||this._last!==s,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==o||this._lastVisible!==i}_correctScrollError(){if(this._scrollError){let{scrollTop:t,scrollLeft:e}=this._scrollerController,{top:s,left:o}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:t-s,left:e-o})}}element(t){return t===1/0&&(t=this._items.length-1),this._items?.[t]===void 0?void 0:{scrollIntoView:(e={})=>this._scrollElementIntoView({...e,index:t})}}_scrollElementIntoView(t){if(t.index>=this._first&&t.index<=this._last)this._children[t.index-this._first].scrollIntoView(t);else if(t.index=Math.min(t.index,this._items.length-1),t.behavior==="smooth"){let e=this._layout.getScrollIntoViewCoordinates(t),{behavior:s}=t;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(e,{behavior:s}),()=>this._layout.getScrollIntoViewCoordinates(t),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=t}else this._layout.pin=t}_checkScrollIntoViewTarget(t){let{index:e}=this._scrollIntoViewTarget||{};e&&t?.has(e)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new At({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new Rt({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((t,e)=>{this._layoutCompleteResolver=t,this._layoutCompleteRejecter=e})),this._layoutCompletePromise}_rejectLayoutCompletePromise(t){this._layoutCompleteRejecter!==null&&this._layoutCompleteRejecter(t),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&this._pendingLayoutComplete===null&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){this._layoutCompleteResolver!==null&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(t){if(this._layout?.measureChildren){for(let e of t)this._toBeMeasured.set(e.target,e.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function zs(r){let t=window.getComputedStyle(r);return{marginTop:ue(t.marginTop),marginRight:ue(t.marginRight),marginBottom:ue(t.marginBottom),marginLeft:ue(t.marginLeft)}}function ue(r){let t=r?parseFloat(r):NaN;return Number.isNaN(t)?0:t}function Ur(r){if(r.assignedSlot!==null)return r.assignedSlot;if(r.parentElement!==null)return r.parentElement;let t=r.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}function Ds(r,t=!1){let e=[],s=t?r:Ur(r);for(;s!==null;)e.push(s),s=Ur(s);return e}function Hs(r,t=!1){let e=!1;return Ds(r,t).filter(s=>{if(e)return!1;let o=getComputedStyle(s);return e=o.position==="fixed",o.overflow!=="visible"})}var Ws=r=>r,qs=(r,t)=>d`${t}: ${JSON.stringify(r,null,2)}`,Ge=class extends pt{constructor(t){if(super(t),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,s)=>qs(e,s+this._first),this._keyFunction=(e,s)=>Ws(e,s+this._first),this._items=[],t.type!==H.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(t){t&&this._setFunctions(t);let e=[];if(this._first>=0&&this._last>=this._first)for(let s=this._first;s<=this._last;s++)e.push(this._items[s]);return Mr(e,this._keyFunction,this._renderItem)}update(t,[e]){this._setFunctions(e);let s=this._items!==e.items;return this._items=e.items||[],this._virtualizer?this._updateVirtualizerConfig(t,e):this._initialize(t,e),s?T:this.render()}async _updateVirtualizerConfig(t,e){if(!await this._virtualizer.updateLayoutConfig(e.layout||{})){let o=t.parentNode;this._makeVirtualizer(o,e)}this._virtualizer.items=this._items}_setFunctions(t){let{renderItem:e,keyFunction:s}=t;e&&(this._renderItem=(o,i)=>e(o,i+this._first)),s&&(this._keyFunction=(o,i)=>s(o,i+this._first))}_makeVirtualizer(t,e){this._virtualizer&&this._virtualizer.disconnected();let{layout:s,scroller:o,items:i}=e;this._virtualizer=new pe({hostElement:t,layout:s,scroller:o}),this._virtualizer.items=i,this._virtualizer.connected()}_initialize(t,e){let s=t.parentNode;s&&s.nodeType===1&&(s.addEventListener("rangeChanged",o=>{this._first=o.first,this._last=o.last,this.setValue(this.render())}),this._makeVirtualizer(s,e))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}},Dr=j(Ge);async function Hr(r,t,e){let s="/api/search?"+r.toString(),o=await fetch(s,{signal:e});if(!o.ok){let i=await o.text();throw new Error(`search failed (${o.status}): ${i}`)}if(!o.body)throw new Error("response has no body");await Bs(o.body,i=>{switch(i.type){case"result":t.onResult?.(i);break;case"file":t.onFile?.(i);break;case"facets":t.onFacets?.(i);break;case"done":t.onDone?.(i);break}})}async function Bs(r,t){let e=r.getReader(),s=new TextDecoder,o="";try{for(;;){let{done:n,value:h}=await e.read();if(n)break;o+=s.decode(h,{stream:!0});let l;for(;(l=o.indexOf(`
`))!==-1;){let u=o.slice(0,l).trim();o=o.slice(l+1),u.length!==0&&t(JSON.parse(u))}}o+=s.decode();let i=o.trim();i.length>0&&t(JSON.parse(i))}finally{e.releaseLock()}}function rt(r){let t=r.indexOf("/+/");if(t===-1)return{repo:r,version:"",filePath:""};let e=r.slice(0,t),s=r.slice(t+3),o=e.lastIndexOf("/");return o===-1?{repo:e,version:"",filePath:s}:{repo:e.slice(0,o),version:e.slice(o+1),filePath:s}}function Wr(r,t={},e={}){let s=new URLSearchParams;if(r.trim()&&s.set("q",r.trim()),t.literal&&s.set("literal","true"),t.caseSensitive&&s.set("fold_case","false"),t.repos?.length)for(let o of t.repos)s.append("repo",o);for(let[o,i]of Object.entries(e))for(let n of i)s.append(o,n);return s}var me=class{constructor(){this.lastCommittedUrl=""}commit(t,e={},s={}){let o=Wr(t,e,s),i=t?`${t} \xB7 code search`:"code search",n=fe(o);if(!t)return this.lastCommittedUrl="",[{type:"replaceUrl",url:fe(new URLSearchParams),title:i},{type:"clearResults"}];let h=[];return n!==this.lastCommittedUrl&&this.lastCommittedUrl!==""?h.push({type:"pushUrl",url:n,title:i}):h.push({type:"replaceUrl",url:n,title:i}),h.push({type:"search",params:o}),this.lastCommittedUrl=n,h}popstate(t,e){this.lastCommittedUrl=fe(e);let s=t?`${t} \xB7 code search`:"code search",o=[{type:"replaceUrl",url:fe(e),title:s}];return t?o.push({type:"search",params:e}):o.push({type:"clearResults"}),o}};function fe(r){let t=r.toString();return"/search"+(t?"?"+t:"")}var ge=class{constructor(){this.results=[];this.files=[];this.dirty=!1;this.flushed=!1}start(){return this.results=[],this.files=[],this.dirty=!1,this.flushed=!1,{loading:!0,error:null,done:null}}onResult(t){this.results.push(t),this.dirty=!0}onFile(t){this.files.push(t),this.dirty=!0}flush(){if(!this.dirty)return null;this.dirty=!1;let t={results:[...this.results],files:[...this.files]};return this.flushed||(t.facets=null,this.flushed=!0),t}onFacets(t){return{facets:t}}onDone(t){return{results:this.results,files:this.files,done:t,loading:!1}}onError(t){return{error:t,loading:!1}}};var mt=ce(()=>N.get().params.get("q")??""),Vs=ce(()=>{let r=N.get().params;return{literal:r.get("literal")==="true",caseSensitive:r.get("fold_case")==="false"}}),qr=ce(()=>{let r=N.get().params.get("context");if(r!==null){let t=parseInt(r,10);if(!isNaN(t)&&t>=0)return t}return 3}),Ot=F([]),Pt=F([]),Nt=F(null),Mt=F(null),jt=F(!1),It=F(null),Je=null;async function Fs(){Je&&Je.abort();let r=new AbortController;if(Je=r,!mt.get()){Ot.set([]),Pt.set([]),Nt.set(null),Mt.set(null),jt.set(!1),It.set(null);return}let e=N.get(),s=new URLSearchParams(e.params),o=new ge;Lt(o.start());let i=setInterval(()=>{let n=o.flush();n&&Lt(n)},100);try{await Hr(s,{onResult(n){o.onResult(n)},onFile(n){o.onFile(n)},onFacets(n){Lt(o.onFacets(n))},onDone(n){clearInterval(i),Lt(o.onDone(n))}},r.signal)}catch(n){clearInterval(i),r.signal.aborted||Lt(o.onError(n instanceof Error?n.message:String(n)))}}function Lt(r){"results"in r&&Ot.set(r.results),"files"in r&&Pt.set(r.files),"facets"in r&&Nt.set(r.facets),"done"in r&&Mt.set(r.done),"loading"in r&&jt.set(r.loading),"error"in r&&It.set(r.error)}var ve=new me,st=null;function Br(r,t={},e={}){st&&clearTimeout(st),st=setTimeout(()=>{st=null,be(ve.commit(r,t,e))},200)}function _e(r,t={},e={}){st&&(clearTimeout(st),st=null),be(ve.commit(r,t,e))}function Ks(){let r=mt.get();if(r){let t=Vs.get(),e=N.get(),s={};for(let o of["f.ext","f.repo","f.path"]){let i=e.params.getAll(o);i.length>0&&(s[o]=i)}be(ve.commit(r,t,s))}}Ks();window.addEventListener("popstate",()=>{let r=N.get(),t=r.params.get("q")??"";be(ve.popstate(t,r.params))});function be(r){for(let t of r)switch(t.type){case"pushUrl":history.pushState(null,t.title,t.url),document.title=t.title,N.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"replaceUrl":history.replaceState(null,t.title,t.url),document.title=t.title,N.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"search":Fs();break;case"clearResults":Ot.set([]),Pt.set([]),Nt.set(null),Mt.set(null),jt.set(!1),It.set(null);break}}var ot=class extends v{constructor(){super(...arguments);this.value="";this.error=""}render(){return d`
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
          ${this.error?d`<span id="errortext">${this.error}</span>`:w}
        </div>
      </div>
    `}onInput(){let e=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:e.value},bubbles:!0,composed:!0}))}onKeydown(e){if(e.key==="Enter"){let s=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-submit",{detail:{value:s.value},bubbles:!0,composed:!0}))}}appendQuery(e){let s=this.renderRoot.querySelector("#searchbox");s&&(s.value+=e,this.value=s.value,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:s.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};ot.styles=[Pr,g`
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
    `],a([f()],ot.prototype,"value",2),a([f()],ot.prototype,"error",2),ot=a([x("cs-search-input")],ot);var q=class extends v{constructor(){super(...arguments);this.groups=[];this._open=!1;this._search="";this._selected=new Set;this._onOutsideClick=e=>{this._open&&(e.composedPath().includes(this)||(this._open=!1))}}get _options(){return this.groups.flatMap(e=>e.repos.map(s=>({value:s,label:s.split("/").pop()??s,group:e.label,selected:this._selected.has(s)})))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick)}get selectedRepos(){return[...this._selected]}get _buttonText(){let e=this._selected.size;return e===0?"(all repositories)":e<=4?this._options.filter(o=>o.selected).map(o=>o.label).join(", "):`(${e} repositories)`}get _filteredGroups(){let e=this._search.toLowerCase(),s=new Map;for(let o of this._options)e&&!o.value.toLowerCase().includes(e)&&!o.label.toLowerCase().includes(e)||(s.has(o.group)||s.set(o.group,[]),s.get(o.group).push(o));return[...s.entries()].map(([o,i])=>({label:o,options:i}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(e){let s=new Set(this._selected);s.has(e)?s.delete(e):s.add(e),this._selected=s,this._fireChange()}_selectAll(){this._selected=new Set(this._options.map(e=>e.value)),this._fireChange()}_deselectAll(){this._selected=new Set,this._fireChange()}_toggleGroup(e){let s=this._options.filter(n=>n.group===e).map(n=>n.value),o=s.every(n=>this._selected.has(n)),i=new Set(this._selected);for(let n of s)o?i.delete(n):i.add(n);this._selected=i,this._fireChange()}_fireChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}_onSearchInput(e){this._search=e.target.value}_onSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this._search=""),e.key==="Escape"&&(this._open=!1)}render(){return d`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():w}
        `}_renderDropdown(){let e=this._filteredGroups;return d`
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
        `}_renderGroup(e){return e.label?d`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(e.label)}>${e.label}</div>
                ${e.options.map(s=>this._renderOption(s))}
            </div>
        `:e.options.map(s=>this._renderOption(s))}_renderOption(e){return d`
            <label class="option ${e.selected?"selected":""}">
                <input type="checkbox" .checked=${e.selected} @change=${()=>this._toggleOption(e.value)} />
                ${e.label}
            </label>
        `}};q.styles=g`
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
    `,a([f({type:Array})],q.prototype,"groups",2),a([A()],q.prototype,"_open",2),a([A()],q.prototype,"_search",2),a([A()],q.prototype,"_selected",2),q=a([x("repo-select")],q);var it=class extends v{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let e=this.options.caseSensitive?"false":"auto";return d`
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
    `}setCase(e){let s=e==="false";this.options={...this.options,caseSensitive:s},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}onRepoChange(){let s=this.renderRoot.querySelector("repo-select")?.selectedRepos??[];this.options={...this.options,repos:s.length>0?s:void 0},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};it.styles=[Or,ft,g`
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
    `],a([f({type:Object})],it.prototype,"options",2),a([f({type:Array})],it.prototype,"repos",2),it=a([x("cs-search-options")],it);var Qe=null,Ze=null;async function Vr(){return Qe||(Ze||(Ze=import("./snippet-highlight-OALYTV3P.js").then(r=>(Qe=r,r))),Ze)}Vr();async function ye(r,t){return(await Vr()).highlightSnippet(r,t)}var Ye=j(class extends D{constructor(r){if(super(r),r.type!==H.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((t=>r[t])).join(" ")+" "}update(r,[t]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((s=>s!==""))));for(let s in t)t[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(t)}let e=r.element.classList;for(let s of this.st)s in t||(e.remove(s),this.st.delete(s));for(let s in t){let o=!!t[s];o===this.st.has(s)||this.nt?.has(s)||(o?(e.add(s),this.st.add(s)):(e.remove(s),this.st.delete(s)))}return T}});var Ut=class extends D{constructor(t){if(super(t),this.it=w,t.type!==H.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this._t=void 0,this.it=t;if(t===T)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Ut.directiveName="unsafeHTML",Ut.resultType=1;var xe=j(Ut);var we=`/* highlight.js GitHub light/dark theme for shadow DOM */

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
`;var J=class extends v{render(){return this.start!=null&&this.end!=null?d`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:d`${this.text}`}};J.styles=g`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,a([f()],J.prototype,"text",2),a([f({type:Number})],J.prototype,"start",2),a([f({type:Number})],J.prototype,"end",2),J=a([x("match-str")],J);var I=class extends v{render(){return d`<div class="filename-match">
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
    `,a([f()],I.prototype,"text",2),a([f()],I.prototype,"href",2),a([f({type:Number})],I.prototype,"start",2),a([f({type:Number})],I.prototype,"end",2),a([f()],I.prototype,"repo",2),a([f()],I.prototype,"version",2),I=a([x("filename-match")],I);var U=class extends v{render(){let t=this.start!=null&&this.end!=null;return d`<a class=${Ye({"lno-link":!0,matchlno:t})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Ye({matchline:t})}
                >${t?d`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.highlightedHTML?xe(this.highlightedHTML):this.text}</span
            >`}};U.styles=[at(we),g`
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
    `],a([f({type:Number})],U.prototype,"lineNo",2),a([f()],U.prototype,"text",2),a([f()],U.prototype,"href",2),a([f({type:Number})],U.prototype,"start",2),a([f({type:Number})],U.prototype,"end",2),a([f()],U.prototype,"highlightedHTML",2),U=a([x("match-line")],U);function Js(r){let t=r.lastIndexOf("/");return t<0?".":r.slice(0,t)}function Qs(r){let t=r.lastIndexOf("/");return t<0?r:r.slice(t+1)}var Q=class extends v{constructor(){super(...arguments);this.noContext=!1;this.hlMap=new Map}willUpdate(e){if(e.has("result")&&this.result){this.hlMap=new Map;let s=this.result.lines.filter(n=>n!==null),o=s.map(n=>n[1]).join(`
`),{filePath:i}=rt(this.result.path);ye(i,o).then(n=>{if(!n)return;let h=new Map;for(let l=0;l<s.length&&l<n.length;l++)h.set(s[l][0],n[l]);this.hlMap=h})}}render(){let{repo:e,version:s,filePath:o}=rt(this.result.path),i=`/view/${this.result.path}`,n=this.splitGroups(this.result.lines),h=s.length>6?s.slice(0,6):s,l=Js(o),u=Qs(o);return d`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${i}>
              <span class="repo">${e}:</span><span class="version">${h}:</span>${l}/<span class="filename">${u}</span>
            </a>
          </span>
        </div>
        ${n.map(m=>d`
            <div class="match">
              <div class="contents">
                ${m.map(c=>{let b=c[0],p=c[1],_=c.length>2?c[2]:void 0,k=_!==void 0&&_.length>0,z=`${i}#L${b}`,P=this.hlMap.get(b);if(!k&&P)return d`
                      <match-line
                        class="context"
                        .lineNo=${b}
                        href=${z}
                        text=${p}
                        .highlightedHTML=${P}
                      ></match-line>
                    `;let $e=k&&_?_[0][0]:void 0,Se=k&&_?_[0][1]:void 0;return d`
                    <match-line
                      class=${k?"match-hit":"context"}
                      .lineNo=${b}
                      text=${p}
                      href=${z}
                      .start=${$e}
                      .end=${Se}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(e){let s=[],o=[];for(let i of e)i===null?o.length>0&&(s.push(o),o=[]):o.push(i);return o.length>0&&s.push(o),s}};Q.styles=[Lr,W,g`
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
    `],a([f({type:Object})],Q.prototype,"result",2),a([f({type:Boolean,reflect:!0,attribute:"no-context"})],Q.prototype,"noContext",2),a([A()],Q.prototype,"hlMap",2),Q=a([x("cs-result-group")],Q);var K=class extends v{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return d`<div id="countarea">Searching...</div>`;let e=this.truncated?`${this.total}+`:`${this.total}`;return d`
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
    `],a([f({type:Number})],K.prototype,"total",2),a([f({type:Number})],K.prototype,"timeMs",2),a([f({type:Boolean})],K.prototype,"truncated",2),a([f({type:Boolean})],K.prototype,"loading",2),K=a([x("cs-result-stats")],K);var nt=class extends v{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){let e=this.facets&&(this.facets.ext?.length||this.facets.repo?.length||this.facets.path?.length),s=Object.values(this.selected).some(n=>n.size>0);if(!e&&!s)return w;let i=[{label:"Extension",key:"f.ext",buckets:this.facets?.ext??[]},{label:"Repository",key:"f.repo",buckets:this.facets?.repo??[]},{label:"Path",key:"f.path",buckets:this.facets?.path??[]}].filter(n=>n.buckets.length>0||(this.selected[n.key]?.size??0)>0);return i.length===0?w:d`
      <div class="panel">
        ${i.map(n=>this.renderSection(n.label,n.key,n.buckets))}
      </div>
    `}renderSection(e,s,o){let i=this.selected[s]??new Set,h=[...o].sort((m,c)=>c.c-m.c||m.v.localeCompare(c.v)).slice(0,10),l=new Set(h.map(m=>m.v)),u=[...i].filter(m=>!l.has(m));return d`
      <div class="section">
        <span class="section-label">${e}</span>
        ${u.map(m=>d`
          <button
            class="pill stale"
            @click=${()=>this.toggle(s,m)}
          >${m}</button>
        `)}
        ${h.map(m=>d`
          <button
            class=${i.has(m.v)?"pill active":"pill"}
            @click=${()=>this.toggle(s,m.v)}
          >${m.v} <span class="count">${m.c}</span></button>
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
  `,a([f({type:Object})],nt.prototype,"facets",2),a([f({type:Object})],nt.prototype,"selected",2),nt=a([x("cs-facet-panel")],nt);var zt=class extends v{render(){return d`
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
    `}};zt.styles=[W,g`
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
    `],zt=a([x("cs-search-help")],zt);function Zs(r,t,e){let s=r[t]??new Set,o;return t==="f.path"?o=s.has(e)?new Set:new Set([e]):(o=new Set(s),o.has(e)?o.delete(e):o.add(e)),{...r,[t]:o}}function Ys(r){let t={};for(let[e,s]of Object.entries(r))s.size>0&&(t[e]=[...s]);return t}function Xs(r){let t={};for(let e of["f.ext","f.repo","f.path"]){let s=r.getAll(e);s.length>0&&(t[e]=new Set(s))}return t}var Dt=class extends Ct(v){constructor(){super(...arguments);this.currentOptions={}}get activeFacets(){return Xs(N.get().params)}render(){let e=mt.get(),s=Ot.get(),o=Pt.get(),i=Mt.get(),n=jt.get(),h=It.get(),l=Nt.get(),u=qr.get(),m=i||n;return d`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${c=>c.preventDefault()}
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
        ${m?d`
          <div id="resultarea">
            <cs-result-stats
              .total=${i?.total??0}
              .timeMs=${i?.time_ms??0}
              .truncated=${i?.truncated??!1}
              .loading=${n}
            ></cs-result-stats>
            <cs-facet-panel
              .facets=${l}
              .selected=${this.activeFacets}
              @facet-toggle=${this.onFacetToggle}
            ></cs-facet-panel>
            <div
              id="results"
              tabindex="-1"
            >
              <div id="path-results">
                ${o.map(c=>{let{repo:b,version:p,filePath:_}=rt(c.path);return d`
                    <filename-match
                      text=${_}
                      start=${c.match[0]}
                      end=${c.match[1]}
                      repo=${b}
                      version=${p.slice(0,6)}
                      href="/view/${c.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${Dr({items:s,renderItem:c=>d`
                    <cs-result-group .result=${c} ?no-context=${u<=0}></cs-result-group>
                  `})}
              </div>
            </div>
          </div>
        `:d`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(e){let s=Zs(this.activeFacets,e.detail.key,e.detail.value),o=mt.get();o&&_e(o,this.currentOptions,this.facetParamsFrom(s))}onSearchInput(e){Br(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onSearchSubmit(e){_e(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onOptionsChange(e){this.currentOptions=e.detail,this.reSearch()}reSearch(){let e=mt.get();e&&_e(e,this.currentOptions,this.facetParamsFrom(this.activeFacets))}getRepos(){return window.__CS_INIT?.repos??[]}facetParamsFrom(e){return Ys(e)}};Dt.styles=[W,ft,g`
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

    `],Dt=a([x("cs-search-view")],Dt);var gt=class extends v{constructor(){super(...arguments);this.path=""}render(){let e=this.path.indexOf("/+/");if(e===-1)return d`<span>${this.path}</span>`;let s=this.path.slice(0,e),i=this.path.slice(e+3).split("/").filter(n=>n.length>0);return d`
      <nav class="breadcrumbs">
        <a href="/view/${s}/+/">${s}</a>
        ${i.map((n,h)=>{let l=i.slice(0,h+1).join("/"),u=`/view/${s}/+/${l}${h<i.length-1?"/":""}`;return d`<span class="sep">/</span><a href=${u}>${n}</a>`})}
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
  `,a([f()],gt.prototype,"path",2),gt=a([x("cs-breadcrumbs")],gt);var lt=class extends v{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let e=[...this.entries].sort((s,o)=>{let i=s.endsWith("/"),n=o.endsWith("/");return i!==n?i?-1:1:s.localeCompare(o)});return d`
      <div class="listing">
        ${e.map(s=>{let o=s.endsWith("/"),i=this.basePath+s;return d`
            <a class=${o?"dir":"file"} href=${i}>${s}</a>
          `})}
      </div>
    `}};lt.styles=g`
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
  `,a([f({type:Array})],lt.prototype,"entries",2),a([f()],lt.prototype,"basePath",2),lt=a([x("cs-dir-listing")],lt);var to={navigate(r){window.location.href=r}};function eo(r,t,e){switch(r){case"Enter":return t?{type:"open-tab",url:`/search?q=${encodeURIComponent(t)}`}:{type:"close-help"};case"/":return{type:"navigate",url:`/search${t?"?q="+encodeURIComponent(t):""}`};case"?":return{type:"toggle-help"};case"Escape":return{type:"close-help"};case"v":return e?{type:"navigate",url:e}:{type:"close-help"};case"n":return t?{type:"find",text:t,backwards:!1}:{type:"close-help"};case"p":return t?{type:"find",text:t,backwards:!0}:{type:"close-help"}}return null}function ro(r,t,e,s){return!t||e<=0?Math.floor(r/3):e<=r?.5*(r-e):s/2}function so(r,t){return r<0?"1":r===t?String(r):`${r}-L${t}`}function oo(r,t,e){return r?r.replace("{lno}",so(t,e)):""}function io(r){let t=r.match(/^#L(\d+)(?:-L?(\d+))?$/);if(!t)return[-1,-1];let e=parseInt(t[1],10),s=t[2]?parseInt(t[2],10):e;return[e,s]}var L=class extends v{constructor(){super(...arguments);this.content="";this.basePath="";this.filePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.hasSelection=!1;this.highlightedLines=null;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onSelectionChange=()=>{this.hasSelection=(window.getSelection()?.toString()||"").length>0};this.onKeyDown=e=>{e.target.matches("input,textarea")||e.altKey||e.ctrlKey||e.metaKey||this.processKey(e.key)&&e.preventDefault()}}willUpdate(e){(e.has("content")||e.has("filePath"))&&(this.highlightedLines=null,this.content&&this.filePath&&ye(this.filePath,this.content).then(s=>{s&&(this.highlightedLines=s)}))}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("selectionchange",this.onSelectionChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("selectionchange",this.onSelectionChange)}parseHash(){let[e,s]=io(window.location.hash);this.selectedStart=e,this.selectedEnd=s}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!e)return;let s=this.selectedStart!==this.selectedEnd,o=0;if(s){let h=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(h){let l=e.getBoundingClientRect(),u=h.getBoundingClientRect();o=u.top+u.height-l.top}}let i=ro(window.innerHeight,s,o,e.offsetHeight),n=e.getBoundingClientRect();window.scrollTo(0,n.top+window.scrollY-i)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){return oo(this.externalUrl,this.selectedStart,this.selectedEnd)}getSelectedText(){return window.getSelection()?.toString()||""}processKey(e){let s=eo(e,this.getSelectedText(),this.resolvedExternalUrl());if(!s)return!1;switch(s.type){case"navigate":to.navigate(s.url);break;case"open-tab":window.open(s.url);break;case"find":window.find(s.text,!1,s.backwards);break;case"toggle-help":this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0}));break;case"close-help":this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));break}return!0}render(){let e=this.content.split(`
`);e.length>0&&e[e.length-1]===""&&e.pop();let s=this.highlightedLines;return d`
      ${this.hasSelection?d`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      `:""}
      <div class="viewer">
        ${e.map((o,i)=>{let n=i+1,h=n>=this.selectedStart&&n<=this.selectedEnd;return d`
            <div class="line ${h?"selected":""}" id="L${n}">
              <a class="lno" href="#L${n}" @click=${l=>this.onLineClick(l,n)}>${n}</a>
              <span class="code">${s&&s[i]?xe(s[i]):o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(e,s){if(e.shiftKey&&this.selectedStart>0){e.preventDefault();let o=Math.min(this.selectedStart,s),i=Math.max(this.selectedStart,s);this.selectedStart=o,this.selectedEnd=i,history.replaceState(null,"",`#L${o}-L${i}`)}else this.selectedStart=s,this.selectedEnd=s}};L.styles=[at(we),g`
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
  `],a([f()],L.prototype,"content",2),a([f()],L.prototype,"basePath",2),a([f()],L.prototype,"filePath",2),a([f()],L.prototype,"repo",2),a([f()],L.prototype,"version",2),a([f()],L.prototype,"externalUrl",2),a([A()],L.prototype,"selectedStart",2),a([A()],L.prototype,"selectedEnd",2),a([A()],L.prototype,"hasSelection",2),a([A()],L.prototype,"highlightedLines",2),L=a([x("cs-code-viewer")],L);var vt=class extends v{constructor(){super(...arguments);this.open=!1}render(){return this.open?d`
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
    `:d``}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}))}};vt.styles=g`
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
  `,a([f({type:Boolean,reflect:!0})],vt.prototype,"open",2),vt=a([x("cs-help-modal")],vt);function no(r){let t=r.indexOf("/+/");if(t>=0){let e=r.slice(0,t),s=r.slice(t+3),o=e.lastIndexOf("@");if(o>=0)return{repo:e.slice(0,o),version:e.slice(o+1),filePath:s}}return rt(r)}function lo(r){return r.endsWith("/")||r.endsWith("/+/")||!r.includes("/+/")}function ao(r,t){return`/raw/${r}${t&&!r.endsWith("/")?"/":""}`}function co(r,t,e){let s="github.com/";return r.startsWith(s)?`https://github.com/${r.slice(s.length)}/blob/${t}/${e}#L{lno}`:""}var O=class extends v{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null;this.showHelp=!1}willUpdate(e){e.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let e=lo(this.path),s=ao(this.path,e);try{let o=await fetch(s);if(!o.ok){this.error=`Not found (${o.status})`,this.loading=!1;return}(o.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await o.json(),this.fetchReadme(s)):this.content=await o.text()}catch(o){this.error=o instanceof Error?o.message:String(o)}this.loading=!1}async fetchReadme(e){if(!this.dirEntries)return;let s=this.dirEntries.find(o=>O.README_RE.test(o));if(s)try{let o=e.endsWith("/")?e:e+"/",i=await fetch(o+s);i.ok&&(this.readmeContent=await i.text())}catch{}}render(){let e=no(this.path),s=e.repo,o=e.version,i=co(e.repo,e.version,e.filePath);return d`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading?d`<div class="status">Loading...</div>`:""}
        ${this.error?d`<div class="status error">${this.error}</div>`:""}

        ${this.dirEntries?d`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith("/")?"":"/"}"
          ></cs-dir-listing>
          ${this.readmeContent?d`
            <div class="readme">
              <pre>${this.readmeContent}</pre>
            </div>
          `:""}
        `:""}

        ${this.content!==null?d`
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
    `}};O.README_RE=/^readme\.(md|markdown|mdown|mkdn|txt|rst|org|adoc|asc)$/i,O.styles=g`
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
  `,a([f()],O.prototype,"path",2),a([A()],O.prototype,"content",2),a([A()],O.prototype,"dirEntries",2),a([A()],O.prototype,"readmeContent",2),a([A()],O.prototype,"loading",2),a([A()],O.prototype,"error",2),a([A()],O.prototype,"showHelp",2),O=a([x("cs-file-view")],O);var Ht=class extends v{render(){return d`
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
    `}};Ht.styles=[W,g`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Ht=a([x("cs-about-view")],Ht);var Wt=class extends Ct(v){render(){let t=N.get();return d`
      <main>${this.renderView(t)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(t){switch(t.name){case"search":return d`<cs-search-view></cs-search-view>`;case"view":return d`<cs-file-view .path=${t.path??""}></cs-file-view>`;case"about":return d`<cs-about-view></cs-about-view>`;default:return d`<div class="placeholder">Not found</div>`}}};Wt.styles=[W,g`
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
    `],Wt=a([x("cs-app")],Wt);export{Wt as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
