var pr=Object.defineProperty;var ur=Object.getOwnPropertyDescriptor;var l=(t,e,r,o)=>{for(var s=o>1?void 0:o?ur(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&pr(e,r,s),s};var Se=globalThis,Ae=Se.ShadowRoot&&(Se.ShadyCSS===void 0||Se.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),St=new WeakMap,ne=class{constructor(e,r,o){if(this._$cssResult$=!0,o!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(Ae&&e===void 0){let o=r!==void 0&&r.length===1;o&&(e=St.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&St.set(r,e))}return e}toString(){return this.cssText}},At=t=>new ne(typeof t=="string"?t:t+"",void 0,Ze),C=(t,...e)=>{let r=t.length===1?t[0]:e.reduce(((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new ne(r,t,Ze)},Ct=(t,e)=>{if(Ae)t.adoptedStyleSheets=e.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of e){let o=document.createElement("style"),s=Se.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,t.appendChild(o)}},Xe=Ae?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let o of e.cssRules)r+=o.cssText;return At(r)})(t):t;var{is:hr,defineProperty:fr,getOwnPropertyDescriptor:mr,getOwnPropertyNames:gr,getOwnPropertySymbols:vr,getPrototypeOf:br}=Object,Ce=globalThis,kt=Ce.trustedTypes,xr=kt?kt.emptyScript:"",$r=Ce.reactiveElementPolyfillSupport,ae=(t,e)=>t,le={toAttribute(t,e){switch(e){case Boolean:t=t?xr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},ke=(t,e)=>!hr(t,e),Ot={attribute:!0,type:String,converter:le,reflect:!1,useDefault:!1,hasChanged:ke};Symbol.metadata??=Symbol("metadata"),Ce.litPropertyMetadata??=new WeakMap;var I=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Ot){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,r);s!==void 0&&fr(this.prototype,e,s)}}static getPropertyDescriptor(e,r,o){let{get:s,set:i}=mr(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:s,set(n){let u=s?.call(this);i?.call(this,n),this.requestUpdate(e,u,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ot}static _$Ei(){if(this.hasOwnProperty(ae("elementProperties")))return;let e=br(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ae("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ae("properties"))){let r=this.properties,o=[...gr(r),...vr(r)];for(let s of o)this.createProperty(s,r[s])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)r.unshift(Xe(s))}else e!==void 0&&r.push(Xe(e));return r}static _$Eu(e,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ct(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,r,o){this._$AK(e,o)}_$ET(e,r){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:le).toAttribute(r,o.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,r){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:le;this._$Em=s;let u=n.fromAttribute(r,i.type);this[s]=u??this._$Ej?.get(s)??u,this._$Em=null}}requestUpdate(e,r,o){if(e!==void 0){let s=this.constructor,i=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??ke)(i,r)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,u=this[s];n!==!0||this._$AL.has(s)||u===void 0||this.C(s,void 0,i,u)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[ae("elementProperties")]=new Map,I[ae("finalized")]=new Map,$r?.({ReactiveElement:I}),(Ce.reactiveElementVersions??=[]).push("2.1.1");var et=globalThis,Oe=et.trustedTypes,Tt=Oe?Oe.createPolicy("lit-html",{createHTML:t=>t}):void 0,tt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,rt="?"+L,yr=`<${rt}>`,F=document,de=()=>F.createComment(""),pe=t=>t===null||typeof t!="object"&&typeof t!="function",ot=Array.isArray,Mt=t=>ot(t)||typeof t?.[Symbol.iterator]=="function",Ye=`[ 	
\f\r]`,ce=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nt=/-->/g,Pt=/>/g,j=RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rt=/'/g,It=/"/g,Ut=/^(?:script|style|textarea|title)$/i,st=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=st(1),Dt=st(2),ho=st(3),M=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Lt=new WeakMap,B=F.createTreeWalker(F,129);function qt(t,e){if(!ot(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tt!==void 0?Tt.createHTML(e):e}var Wt=(t,e)=>{let r=t.length-1,o=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=ce;for(let u=0;u<r;u++){let a=t[u],p,h,c=-1,E=0;for(;E<a.length&&(n.lastIndex=E,h=n.exec(a),h!==null);)E=n.lastIndex,n===ce?h[1]==="!--"?n=Nt:h[1]!==void 0?n=Pt:h[2]!==void 0?(Ut.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=j):h[3]!==void 0&&(n=j):n===j?h[0]===">"?(n=s??ce,c=-1):h[1]===void 0?c=-2:(c=n.lastIndex-h[2].length,p=h[1],n=h[3]===void 0?j:h[3]==='"'?It:Rt):n===It||n===Rt?n=j:n===Nt||n===Pt?n=ce:(n=j,s=void 0);let f=n===j&&t[u+1].startsWith("/>")?" ":"";i+=n===ce?a+yr:c>=0?(o.push(p),a.slice(0,c)+tt+a.slice(c)+L+f):a+L+(c===-2?u:f)}return[qt(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ue=class t{constructor({strings:e,_$litType$:r},o){let s;this.parts=[];let i=0,n=0,u=e.length-1,a=this.parts,[p,h]=Wt(e,r);if(this.el=t.createElement(p,o),B.currentNode=this.el.content,r===2||r===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=B.nextNode())!==null&&a.length<u;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(tt)){let E=h[n++],f=s.getAttribute(c).split(L),w=/([.?@])?(.*)/.exec(E);a.push({type:1,index:i,name:w[2],strings:f,ctor:w[1]==="."?Ne:w[1]==="?"?Pe:w[1]==="@"?Re:K}),s.removeAttribute(c)}else c.startsWith(L)&&(a.push({type:6,index:i}),s.removeAttribute(c));if(Ut.test(s.tagName)){let c=s.textContent.split(L),E=c.length-1;if(E>0){s.textContent=Oe?Oe.emptyScript:"";for(let f=0;f<E;f++)s.append(c[f],de()),B.nextNode(),a.push({type:2,index:++i});s.append(c[E],de())}}}else if(s.nodeType===8)if(s.data===rt)a.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(L,c+1))!==-1;)a.push({type:7,index:i}),c+=L.length-1}i++}}static createElement(e,r){let o=F.createElement("template");return o.innerHTML=e,o}};function G(t,e,r=t,o){if(e===M)return e;let s=o!==void 0?r._$Co?.[o]:r._$Cl,i=pe(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(e=G(t,s._$AS(t,e.values),s,o)),e}var Te=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:o}=this._$AD,s=(e?.creationScope??F).importNode(r,!0);B.currentNode=s;let i=B.nextNode(),n=0,u=0,a=o[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new X(i,i.nextSibling,this,e):a.type===1?p=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(p=new Ie(i,this,e)),this._$AV.push(p),a=o[++u]}n!==a?.index&&(i=B.nextNode(),n++)}return B.currentNode=F,s}p(e){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,r),r+=o.strings.length-2):o._$AI(e[r])),r++}},X=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,s){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=G(this,e,r),pe(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Mt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&pe(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ue.createElement(qt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new Te(s,this),n=i.u(this.options);i.p(r),this.T(n),this._$AH=i}}_$AC(e){let r=Lt.get(e.strings);return r===void 0&&Lt.set(e.strings,r=new ue(e)),r}k(e){ot(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let i of e)s===r.length?r.push(o=new t(this.O(de()),this.O(de()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,o,s,i){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=_}_$AI(e,r=this,o,s){let i=this.strings,n=!1;if(i===void 0)e=G(this,e,r,0),n=!pe(e)||e!==this._$AH&&e!==M,n&&(this._$AH=e);else{let u=e,a,p;for(e=i[0],a=0;a<i.length-1;a++)p=G(this,u[o+a],r,a),p===M&&(p=this._$AH[a]),n||=!pe(p)||p!==this._$AH[a],p===_?e=_:e!==_&&(e+=(p??"")+i[a+1]),this._$AH[a]=p}n&&!s&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ne=class extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}},Pe=class extends K{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}},Re=class extends K{constructor(e,r,o,s,i){super(e,r,o,s,i),this.type=5}_$AI(e,r=this){if((e=G(this,e,r,0)??_)===M)return;let o=this._$AH,s=e===_&&o!==_||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==_&&(o===_||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ie=class{constructor(e,r,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}},Ht={M:tt,P:L,A:rt,C:1,L:Wt,R:Te,D:Mt,V:G,I:X,H:K,N:Pe,U:Re,B:Ne,F:Ie},_r=et.litHtmlPolyfillSupport;_r?.(ue,X),(et.litHtmlVersions??=[]).push("3.3.1");var zt=(t,e,r)=>{let o=r?.renderBefore??e,s=o._$litPart$;if(s===void 0){let i=r?.renderBefore??null;o._$litPart$=s=new X(e.insertBefore(de(),i),i,void 0,r??{})}return s._$AI(t),s};var it=globalThis,v=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=zt(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};v._$litElement$=!0,v.finalized=!0,it.litElementHydrateSupport?.({LitElement:v});var wr=it.litElementPolyfillSupport;wr?.({LitElement:v});(it.litElementVersions??=[]).push("4.2.1");var b=t=>(e,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var Er={attribute:!0,type:String,converter:le,reflect:!1,hasChanged:ke},Sr=(t=Er,e,r)=>{let{kind:o,metadata:s}=r,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){let{name:n}=r;return{set(u){let a=e.get.call(this);e.set.call(this,u),this.requestUpdate(n,a,t)},init(u){return u!==void 0&&this.C(n,void 0,t,u),u}}}if(o==="setter"){let{name:n}=r;return function(u){let a=this[n];e.call(this,u),this.requestUpdate(n,a,t)}}throw Error("Unsupported decorator location: "+o)};function m(t){return(e,r)=>typeof r=="object"?Sr(t,e,r):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}function O(t){return m({...t,state:!0,attribute:!1})}var Ar=Object.defineProperty,Cr=(t,e,r)=>e in t?Ar(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,nt=(t,e,r)=>(Cr(t,typeof e!="symbol"?e+"":e,r),r),kr=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},at=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},Me=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},jt=(t,e,r)=>(kr(t,e,"access private method"),r);function Bt(t,e){return Object.is(t,e)}var S=null,he=!1,Ue=1,De=Symbol("SIGNAL");function Y(t){let e=S;return S=t,e}function Or(){return S}function Tr(){return he}var ut={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function qe(t){if(he)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(S===null)return;S.consumerOnSignalRead(t);let e=S.nextProducerIndex++;if(ee(S),e<S.producerNode.length&&S.producerNode[e]!==t&&dt(S)){let r=S.producerNode[e];We(r,S.producerIndexOfThis[e])}S.producerNode[e]!==t&&(S.producerNode[e]=t,S.producerIndexOfThis[e]=dt(S)?Kt(t,S,e):0),S.producerLastReadVersion[e]=t.version}function Nr(){Ue++}function Ft(t){if(!(!t.dirty&&t.lastCleanEpoch===Ue)){if(!t.producerMustRecompute(t)&&!Mr(t)){t.dirty=!1,t.lastCleanEpoch=Ue;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=Ue}}function Gt(t){if(t.liveConsumerNode===void 0)return;let e=he;he=!0;try{for(let r of t.liveConsumerNode)r.dirty||Rr(r)}finally{he=e}}function Pr(){return S?.consumerAllowSignalWrites!==!1}function Rr(t){var e;t.dirty=!0,Gt(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function Ir(t){return t&&(t.nextProducerIndex=0),Y(t)}function Lr(t,e){if(Y(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(dt(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)We(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function Mr(t){ee(t);for(let e=0;e<t.producerNode.length;e++){let r=t.producerNode[e],o=t.producerLastReadVersion[e];if(o!==r.version||(Ft(r),o!==r.version))return!0}return!1}function Kt(t,e,r){var o;if(ht(t),ee(t),t.liveConsumerNode.length===0){(o=t.watched)==null||o.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)t.producerIndexOfThis[s]=Kt(t.producerNode[s],t,s)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(e)-1}function We(t,e){var r;if(ht(t),ee(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(r=t.unwatched)==null||r.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)We(t.producerNode[s],t.producerIndexOfThis[s])}let o=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[o],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[o],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let s=t.liveConsumerIndexOfThis[e],i=t.liveConsumerNode[e];ee(i),i.producerIndexOfThis[s]=e}}function dt(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function ee(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function ht(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function Vt(t){if(Ft(t),qe(t),t.value===pt)throw t.error;return t.value}function Ur(t){let e=Object.create(Dr);e.computation=t;let r=()=>Vt(e);return r[De]=e,r}var lt=Symbol("UNSET"),ct=Symbol("COMPUTING"),pt=Symbol("ERRORED"),Dr={...ut,value:lt,dirty:!0,error:null,equal:Bt,producerMustRecompute(t){return t.value===lt||t.value===ct},producerRecomputeValue(t){if(t.value===ct)throw new Error("Detected cycle in computations.");let e=t.value;t.value=ct;let r=Ir(t),o,s=!1;try{o=t.computation.call(t.wrapper),s=e!==lt&&e!==pt&&t.equal.call(t.wrapper,e,o)}catch(i){o=pt,t.error=i}finally{Lr(t,r)}if(s){t.value=e;return}t.value=o,t.version++}};function qr(){throw new Error}var Wr=qr;function Hr(){Wr()}function zr(t){let e=Object.create(Fr);e.value=t;let r=()=>(qe(e),e.value);return r[De]=e,r}function jr(){return qe(this),this.value}function Br(t,e){Pr()||Hr(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,Gr(t))}var Fr={...ut,equal:Bt,value:void 0};function Gr(t){t.version++,Nr(),Gt(t)}var A=Symbol("node"),$;(t=>{var e,r,o,s,i,n;class u{constructor(h,c={}){Me(this,r),nt(this,e);let f=zr(h)[De];if(this[A]=f,f.wrapper=this,c){let w=c.equals;w&&(f.equal=w),f.watched=c[t.subtle.watched],f.unwatched=c[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return jr.call(this[A])}set(h){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Tr())throw new Error("Writes to signals not permitted during Watcher callback");let c=this[A];Br(c,h)}}e=A,r=new WeakSet,o=function(){},t.isState=p=>typeof p=="object"&&at(r,p),t.State=u;class a{constructor(h,c){Me(this,i),nt(this,s);let f=Ur(h)[De];if(f.consumerAllowSignalWrites=!0,this[A]=f,f.wrapper=this,c){let w=c.equals;w&&(f.equal=w),f.watched=c[t.subtle.watched],f.unwatched=c[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Vt(this[A])}}s=A,i=new WeakSet,n=function(){},t.isComputed=p=>typeof p=="object"&&at(i,p),t.Computed=a,(p=>{var h,c,E,f,w;function Z(y){let x,g=null;try{g=Y(null),x=y()}finally{Y(g)}return x}p.untrack=Z;function W(y){var x;if(!(0,t.isComputed)(y)&&!(0,t.isWatcher)(y))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((x=y[A].producerNode)==null?void 0:x.map(g=>g.wrapper))??[]}p.introspectSources=W;function Je(y){var x;if(!(0,t.isComputed)(y)&&!(0,t.isState)(y))throw new TypeError("Called introspectSinks without a Signal argument");return((x=y[A].liveConsumerNode)==null?void 0:x.map(g=>g.wrapper))??[]}p.introspectSinks=Je;function nr(y){if(!(0,t.isComputed)(y)&&!(0,t.isState)(y))throw new TypeError("Called hasSinks without a Signal argument");let x=y[A].liveConsumerNode;return x?x.length>0:!1}p.hasSinks=nr;function ar(y){if(!(0,t.isComputed)(y)&&!(0,t.isWatcher)(y))throw new TypeError("Called hasSources without a Computed or Watcher argument");let x=y[A].producerNode;return x?x.length>0:!1}p.hasSources=ar;class lr{constructor(x){Me(this,c),Me(this,f),nt(this,h);let g=Object.create(ut);g.wrapper=this,g.consumerMarkedDirty=x,g.consumerIsAlwaysLive=!0,g.consumerAllowSignalWrites=!1,g.producerNode=[],this[A]=g}watch(...x){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");jt(this,f,w).call(this,x);let g=this[A];g.dirty=!1;let k=Y(g);for(let Ee of x)qe(Ee[A]);Y(k)}unwatch(...x){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");jt(this,f,w).call(this,x);let g=this[A];ee(g);for(let k=g.producerNode.length-1;k>=0;k--)if(x.includes(g.producerNode[k].wrapper)){We(g.producerNode[k],g.producerIndexOfThis[k]);let Ee=g.producerNode.length-1;if(g.producerNode[k]=g.producerNode[Ee],g.producerIndexOfThis[k]=g.producerIndexOfThis[Ee],g.producerNode.length--,g.producerIndexOfThis.length--,g.nextProducerIndex--,k<g.producerNode.length){let dr=g.producerIndexOfThis[k],Et=g.producerNode[k];ht(Et),Et.liveConsumerIndexOfThis[dr]=k}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[A].producerNode.filter(g=>g.dirty).map(g=>g.wrapper)}}h=A,c=new WeakSet,E=function(){},f=new WeakSet,w=function(y){for(let x of y)if(!(0,t.isComputed)(x)&&!(0,t.isState)(x))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=y=>at(c,y),p.Watcher=lr;function cr(){var y;return(y=Or())==null?void 0:y.wrapper}p.currentComputed=cr,p.watched=Symbol("watched"),p.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})($||($={}));var ft=!1,Qt=new $.subtle.Watcher(()=>{ft||(ft=!0,queueMicrotask(()=>{ft=!1;for(let t of Qt.getPending())t.get();Qt.watch()}))}),Kr=Symbol("SignalWatcherBrand"),Vr=new FinalizationRegistry(t=>{t.unwatch(...$.subtle.introspectSources(t))}),Jt=new WeakMap;function fe(t){return t[Kr]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new $.State(0),this._$Si=!1}_$Sl(){var e,r;let o=[],s=[];this._$St.forEach((n,u)=>{(n?.beforeUpdate?o:s).push(u)});let i=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));o.forEach(n=>n.get()),(r=this._$Su)===null||r===void 0||r.get(),i.forEach(n=>n.get()),s.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new $.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new $.subtle.Watcher(function(){let r=Jt.get(this);r!==void 0&&(r._$Si===!1&&(new Set(this.getPending()).has(r._$Su)?r.requestUpdate():r._$Sv()),this.watch())});Jt.set(e,this),Vr.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([r])=>r))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...$.subtle.introspectSources(this.h).filter(r=>{var o;let s=((o=this._$St.get(r))===null||o===void 0?void 0:o.manualDispose)!==!0;return s&&this._$St.delete(r),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,r){var o;this._$S_();let s=new $.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,r),(o=r?.beforeUpdate)!==null&&o!==void 0&&o?$.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>$.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var He={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},me=t=>(...e)=>({_$litDirective$:t,values:e}),te=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,o){this._$Ct=e,this._$AM=r,this._$Ci=o}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var{I:as}=Ht;var Zt=t=>t.strings===void 0;var ge=(t,e)=>{let r=t._$AN;if(r===void 0)return!1;for(let o of r)o._$AO?.(e,!1),ge(o,e);return!0},ze=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while(r?.size===0)},Xt=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),Zr(e)}};function Qr(t){this._$AN!==void 0?(ze(this),this._$AM=t,Xt(this)):this._$AM=t}function Jr(t,e=!1,r=0){let o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let i=r;i<o.length;i++)ge(o[i],!1),ze(o[i]);else o!=null&&(ge(o,!1),ze(o));else ge(this,t)}var Zr=t=>{t.type==He.CHILD&&(t._$AP??=Jr,t._$AQ??=Qr)},je=class extends te{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,o){super._$AT(e,r,o),Xt(this),this.isConnected=e._$AU}_$AO(e,r=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),r&&(ge(this,e),ze(this))}setValue(e){if(Zt(this._$Ct))this._$Ct._$AI(e,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};var mt=!1,gt=new $.subtle.Watcher(async()=>{mt||(mt=!0,queueMicrotask(()=>{mt=!1;for(let t of gt.getPending())t.get();gt.watch()}))}),Be=class extends je{_$S_(){var e,r;this._$Sm===void 0&&(this._$Sj=new $.Computed(()=>{var o;let s=(o=this._$SW)===null||o===void 0?void 0:o.get();return this.setValue(s),s}),this._$Sm=(r=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&r!==void 0?r:gt,this._$Sm.watch(this._$Sj),$.subtle.untrack(()=>{var o;return(o=this._$Sj)===null||o===void 0?void 0:o.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return $.subtle.untrack(()=>e.get())}update(e,[r]){var o,s;return(o=this._$Sk)!==null&&o!==void 0||(this._$Sk=(s=e.options)===null||s===void 0?void 0:s.host),r!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=r,this._$S_(),$.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},vt=me(Be);var bt=t=>(e,...r)=>t(e,...r.map(o=>o instanceof $.State||o instanceof $.Computed?vt(o):o)),Xr=bt(d),Yr=bt(Dt);var As=$.State,Cs=$.Computed,N=(t,e)=>new $.State(t,e),re=(t,e)=>new $.Computed(t,e);var eo=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function Yt(t,e=""){for(let{pattern:r,name:o}of eo){let s=r.exec(t);if(s)return{name:o,path:s[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var U=N(Yt(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{U.set(Yt(window.location.pathname,window.location.search))});var ve=me(class extends te{constructor(t){if(super(t),t.type!==He.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let r=t.element.classList;for(let o of this.st)o in e||(r.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return M}});var to=new Set(["file","-file","path","-path","repo","-repo","tags","-tags","case","lit","max_matches"]);function $t(t){let e={},r="",o="",s="",i=t.trim(),n=/\[|\(|(?:^([a-zA-Z0-9\-_]+):|\\.)| /,u=!0;for(;i.length>0;){let p=n.exec(i);if(p===null){s+=i;break}s+=i.slice(0,p.index);let h=p[0];if(i=i.slice(p.index+h.length),u=u&&p.index===0,h===" ")o===""?s+=" ":(xt(e,o,s),o="",s="");else if(h==="("||h==="["){let c=h==="("?")":"]",E=1,f=0,w=!1,Z="";for(;f<i.length&&E>0;){let W=i[f];f++,w?w=!1:W==="\\"?w=!0:W===h?E++:W===c&&E--,Z+=W}s+=h+Z,i=i.slice(f)}else if(h.startsWith("\\"))s+=h;else{let c=p[1];o===""&&c&&to.has(c)?(s.trim()!==""&&xt(e,o,s),s="",o=c):s+=h}u=h===" "}xt(e,o,s);let a=e[""]||[];return delete e[""],r=a.join(" ").trim(),{line:r,operators:e}}function xt(t,e,r){t[e]||(t[e]=[]),t[e].push(r)}function er(t,e={},r={}){let o=new URLSearchParams;t.trim()&&o.set("q",t.trim()),e.literal&&o.set("literal","true"),e.caseSensitive&&o.set("fold_case","false");for(let[s,i]of Object.entries(r))for(let n of i)o.append(s,n);return o}async function tr(t,e,r){let o="/api/search?"+t.toString(),s=await fetch(o,{signal:r});if(!s.ok){let i=await s.text();throw new Error(`search failed (${s.status}): ${i}`)}if(!s.body)throw new Error("response has no body");await ro(s.body,i=>{switch(i.type){case"result":e.onResult?.(i);break;case"file":e.onFile?.(i);break;case"facets":e.onFacets?.(i);break;case"done":e.onDone?.(i);break}})}async function ro(t,e){let r=t.getReader(),o=new TextDecoder,s="";try{for(;;){let{done:n,value:u}=await r.read();if(n)break;s+=o.decode(u,{stream:!0});let a;for(;(a=s.indexOf(`
`))!==-1;){let p=s.slice(0,a).trim();s=s.slice(a+1),p.length!==0&&e(JSON.parse(p))}}s+=o.decode();let i=s.trim();i.length>0&&e(JSON.parse(i))}finally{r.releaseLock()}}function rr(t){let e=t.indexOf("/+/");if(e===-1)return{repo:t,version:"",filePath:""};let r=t.slice(0,e),o=t.slice(e+3),s=r.indexOf("/");return s===-1?{repo:r,version:"",filePath:o}:{repo:r.slice(0,s),version:r.slice(s+1),filePath:o}}var se=re(()=>U.get().params.get("q")??""),Qs=re(()=>{let t=U.get().params;return{literal:t.get("literal")==="true",caseSensitive:t.get("fold_case")==="false"}}),or=re(()=>{let t=U.get().params.get("context");if(t!==null){let e=parseInt(t,10);if(!isNaN(e)&&e>=0)return e}return 3}),Js=re(()=>$t(se.get())),xe=N([]),Ge=N([]),$e=N(null),ye=N(null),V=N(!1),oe=N(null),_t=N(!1),sr=re(()=>{let t=Ge.get();return _t.get()||t.length<=10?t:t.slice(0,10)}),yt=null;async function ir(){yt&&yt.abort();let t=new AbortController;yt=t;let e=se.get();if(!e){xe.set([]),Ge.set([]),$e.set(null),ye.set(null),V.set(!1),oe.set(null),_t.set(!1);return}let r=U.get(),o=new URLSearchParams(r.params),s=$t(e);_t.set(s.line===""),V.set(!0),oe.set(null),xe.set([]),Ge.set([]),$e.set(null),ye.set(null);let i=[],n=[],u=null;try{await tr(o,{onResult(a){i.push(a)},onFile(a){n.push(a)},onFacets(a){u=a},onDone(a){xe.set(i),Ge.set(n),$e.set(u),ye.set(a),V.set(!1)},onError(a){t.signal.aborted||(oe.set(a.message),V.set(!1))}},t.signal)}catch(a){t.signal.aborted||(oe.set(a instanceof Error?a.message:String(a)),V.set(!1))}}var Fe=null,be="";function wt(t,e={},r={}){Fe&&clearTimeout(Fe);let o=er(t,e,r),s=t!==be,i=o.toString(),n="/search"+(i?"?"+i:"");s&&be!==""?(history.pushState(null,"",n),be=t):(history.replaceState(null,"",n),be===""&&(be=t)),U.set({name:"search",params:o}),Fe=setTimeout(()=>{Fe=null,ir()},100)}se.get()&&ir();var Q=class extends v{constructor(){super(...arguments);this.value="";this.debounce=100;this.error="";this.timer=null}createRenderRoot(){return this}render(){return d`
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
          ${this.error?d`<span id="errortext">${this.error}</span>`:_}
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
    `}onInput(){this.timer&&clearTimeout(this.timer);let r=this.querySelector("#searchbox");this.timer=setTimeout(()=>{this.timer=null,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:r.value},bubbles:!0,composed:!0}))},this.debounce)}onKeydown(r){if(r.key==="Enter"){this.timer&&clearTimeout(this.timer),this.timer=null;let o=this.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0}))}}focus(){this.querySelector("#searchbox")?.focus()}};l([m()],Q.prototype,"value",2),l([m({type:Number})],Q.prototype,"debounce",2),l([m()],Q.prototype,"error",2),Q=l([b("cs-search-input")],Q);function oo(){return window.__CS_INIT??{}}var _e=class extends v{constructor(){super(...arguments);this.options={}}createRenderRoot(){return this}render(){let r=this.options.caseSensitive?"false":"auto";return d`
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
    `}renderRepoOptions(){let r=oo();return r.repos?r.repos.map(o=>d`
      <optgroup label=${o.label}>
        ${o.repos.map(s=>{let i=s.split("/").pop()??s;return d`<option value=${s} data-tokens=${s}>${i}</option>`})}
      </optgroup>
    `):""}setCase(r){let o=r==="false";this.options={...this.options,caseSensitive:o},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};l([m({type:Object})],_e.prototype,"options",2),_e=l([b("cs-search-options")],_e);var H=class extends v{render(){return this.start!=null&&this.end!=null?d`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:d`${this.text}`}};H.styles=C`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,l([m()],H.prototype,"text",2),l([m({type:Number})],H.prototype,"start",2),l([m({type:Number})],H.prototype,"end",2),H=l([b("match-str")],H);var T=class extends v{render(){return d`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};T.styles=C`
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
    `,l([m()],T.prototype,"text",2),l([m()],T.prototype,"href",2),l([m({type:Number})],T.prototype,"start",2),l([m({type:Number})],T.prototype,"end",2),l([m()],T.prototype,"repo",2),l([m()],T.prototype,"version",2),T=l([b("filename-match")],T);var P=class extends v{render(){let e=this.start!=null&&this.end!=null;return d`<a class=${ve({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${ve({matchline:e})}
                >${e?d`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};P.styles=C`
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
    `,l([m({type:Number})],P.prototype,"lineNo",2),l([m()],P.prototype,"text",2),l([m()],P.prototype,"href",2),l([m({type:Number})],P.prototype,"start",2),l([m({type:Number})],P.prototype,"end",2),P=l([b("match-line")],P);function so(t){let e=t.lastIndexOf("/");return e<0?".":t.slice(0,e)}function io(t){let e=t.lastIndexOf("/");return e<0?t:t.slice(e+1)}var we=class extends v{createRenderRoot(){return this}render(){let{repo:e,version:r,filePath:o}=rr(this.result.path),s=`/view/${this.result.path}`,i=this.splitGroups(this.result.lines),n=r.length>6?r.slice(0,6):r,u=so(o),a=io(o);return d`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${s}>
              <span class="repo">${e}:</span><span class="version">${n}:</span>${u}/<span class="filename">${a}</span>
            </a>
          </span>
        </div>
        ${i.map(p=>d`
            <div class="match">
              <div class="contents">
                ${p.map(h=>{let c=h[0],E=h[1],f=h.length>2?h[2]:void 0,w=f!==void 0&&f.length>0,Z=`${s}#L${c}`,W=w&&f?f[0][0]:void 0,Je=w&&f?f[0][1]:void 0;return d`
                    <match-line
                      .lineNo=${c}
                      text=${E}
                      href=${Z}
                      .start=${W}
                      .end=${Je}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(e){let r=[],o=[];for(let s of e)s===null?o.length>0&&(r.push(o),o=[]):o.push(s);return o.length>0&&r.push(o),r}};l([m({type:Object})],we.prototype,"result",2),we=l([b("cs-result-group")],we);var z=class extends v{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}createRenderRoot(){return this}render(){if(this.loading)return d`<div id="countarea">Searching...</div>`;let r=this.truncated?`${this.total}+`:`${this.total}`;return d`
      <div id="countarea">
        <span id="numresults">${r}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};l([m({type:Number})],z.prototype,"total",2),l([m({type:Number})],z.prototype,"timeMs",2),l([m({type:Boolean})],z.prototype,"truncated",2),l([m({type:Boolean})],z.prototype,"loading",2),z=l([b("cs-result-stats")],z);var Ke=class extends v{createRenderRoot(){return this}render(){return d`
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
    `}};Ke=l([b("cs-search-help")],Ke);var Ve=class extends fe(v){constructor(){super(...arguments);this.currentOptions={};this.currentFacets={}}createRenderRoot(){return this}render(){let r=se.get(),o=xe.get(),s=sr.get(),i=ye.get(),n=V.get(),u=oe.get(),a=$e.get(),p=or.get(),h=i||n;return d`
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
              style="outline: none"
              class=${ve({"no-context":p<=0})}
            >
              <div id="file-extensions">
                ${a?.ext&&a.ext.length>0?d`
                  Narrow to:
                  ${a.ext.slice(0,5).map(c=>d`
                    <button type="button" @click=${()=>this.addExtFilter(c.v)}>
                      ${c.v}
                    </button>
                  `)}
                `:_}
              </div>
              <div id="path-results">
                ${s.map(c=>{let{repo:E,version:f,filePath:w}=no(c.path);return d`
                    <filename-match
                      text=${w}
                      start=${c.match[0]}
                      end=${c.match[1]}
                      repo=${E}
                      version=${f.slice(0,6)}
                      href="/view/${c.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${o.map(c=>d`
                  <cs-result-group .result=${c}></cs-result-group>
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
    `}addExtFilter(r){let o=document.getElementById("searchbox");o&&(o.value=`file:${r} ${o.value}`,this.onSearchInput(new CustomEvent("search-input",{detail:{value:o.value}})))}onSearchInput(r){wt(r.detail.value,this.currentOptions,this.currentFacets)}onOptionsChange(r){this.currentOptions=r.detail;let o=se.get();o&&wt(o,this.currentOptions,this.currentFacets)}};Ve=l([b("cs-search-view")],Ve);function no(t){let e=t.indexOf("/+/");if(e===-1)return{repo:t,version:"",filePath:""};let r=t.slice(0,e),o=t.slice(e+3),s=r.indexOf("/");return s===-1?{repo:r,version:"",filePath:o}:{repo:r.slice(0,s),version:r.slice(s+1),filePath:o}}var ie=class extends v{constructor(){super(...arguments);this.path=""}render(){let r=this.path.indexOf("/+/");if(r===-1)return d`<span>${this.path}</span>`;let o=this.path.slice(0,r),i=this.path.slice(r+3).split("/").filter(n=>n.length>0);return d`
      <nav class="breadcrumbs">
        <a href="/view/${o}/+/">${o}</a>
        ${i.map((n,u)=>{let a=i.slice(0,u+1).join("/"),p=`/view/${o}/+/${a}${u<i.length-1?"/":""}`;return d`<span class="sep">/</span><a href=${p}>${n}</a>`})}
      </nav>
    `}};ie.styles=C`
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
  `,l([m()],ie.prototype,"path",2),ie=l([b("cs-breadcrumbs")],ie);var J=class extends v{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let r=[...this.entries].sort((o,s)=>{let i=o.endsWith("/"),n=s.endsWith("/");return i!==n?i?-1:1:o.localeCompare(s)});return d`
      <div class="listing">
        ${r.map(o=>{let s=o.endsWith("/"),i=this.basePath+o;return d`
            <a class=${s?"dir":"file"} href=${i}>${o}</a>
          `})}
      </div>
    `}};J.styles=C`
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
  `,l([m({type:Array})],J.prototype,"entries",2),l([m()],J.prototype,"basePath",2),J=l([b("cs-dir-listing")],J);var D=class extends v{constructor(){super(...arguments);this.content="";this.basePath="";this.selectedStart=-1;this.selectedEnd=-1;this.onHashChange=()=>this.parseHash()}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange)}parseHash(){let o=window.location.hash.match(/^#L(\d+)(?:-L?(\d+))?$/);o?(this.selectedStart=parseInt(o[1],10),this.selectedEnd=o[2]?parseInt(o[2],10):this.selectedStart):(this.selectedStart=-1,this.selectedEnd=-1)}render(){let r=this.content.split(`
`);return r.length>0&&r[r.length-1]===""&&r.pop(),d`
      <div class="viewer">
        ${r.map((o,s)=>{let i=s+1,n=i>=this.selectedStart&&i<=this.selectedEnd;return d`
            <div class="line ${n?"selected":""}">
              <a class="lno" href="#L${i}" @click=${u=>this.onLineClick(u,i)}>${i}</a>
              <span class="code">${o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(r,o){if(r.shiftKey&&this.selectedStart>0){r.preventDefault();let s=Math.min(this.selectedStart,o),i=Math.max(this.selectedStart,o);this.selectedStart=s,this.selectedEnd=i,window.location.hash=`#L${s}-L${i}`}else this.selectedStart=o,this.selectedEnd=o}};D.styles=C`
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
  `,l([m()],D.prototype,"content",2),l([m()],D.prototype,"basePath",2),l([O()],D.prototype,"selectedStart",2),l([O()],D.prototype,"selectedEnd",2),D=l([b("cs-code-viewer")],D);var R=class extends v{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.loading=!0;this.error=null}willUpdate(r){r.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null;let r=this.path.endsWith("/")||this.path.endsWith("/+/")||!this.path.includes("/+/"),o=`/raw/${this.path}${r&&!this.path.endsWith("/")?"/":""}`;try{let s=await fetch(o);if(!s.ok){this.error=`Not found (${s.status})`,this.loading=!1;return}(s.headers.get("Content-Type")??"").includes("application/json")?this.dirEntries=await s.json():this.content=await s.text()}catch(s){this.error=s instanceof Error?s.message:String(s)}this.loading=!1}render(){return d`
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
    `}};R.styles=C`
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
  `,l([m()],R.prototype,"path",2),l([O()],R.prototype,"content",2),l([O()],R.prototype,"dirEntries",2),l([O()],R.prototype,"loading",2),l([O()],R.prototype,"error",2),R=l([b("cs-file-view")],R);var q=class extends v{constructor(){super(...arguments);this._open=!1;this._search="";this._options=[];this._select=null;this._onOutsideClick=r=>{this._open&&(this.contains(r.target)||(this._open=!1))};this._onFocusOut=r=>{this._open&&!this.contains(r.relatedTarget)&&(this._open=!1)}}connectedCallback(){super.connectedCallback(),this._select=this.querySelector("select"),this._select&&this._readOptions(),document.addEventListener("click",this._onOutsideClick),this.addEventListener("focusout",this._onFocusOut)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick),this.removeEventListener("focusout",this._onFocusOut)}_readOptions(){let r=[];for(let o of this._select.children)if(o instanceof HTMLOptGroupElement)for(let s of o.querySelectorAll("option"))r.push({value:s.value,label:s.textContent?.trim()||s.value,group:o.label,selected:s.selected});else o instanceof HTMLOptionElement&&r.push({value:o.value,label:o.textContent?.trim()||o.value,group:"",selected:o.selected});this._options=r}get _buttonText(){let r=this._options.filter(o=>o.selected);return r.length===0?"(all repositories)":r.length<=4?r.map(o=>o.label).join(", "):`(${r.length} repositories)`}get _filteredGroups(){let r=this._search.toLowerCase(),o=new Map;for(let s of this._options)r&&!s.value.toLowerCase().includes(r)&&!s.label.toLowerCase().includes(r)||(o.has(s.group)||o.set(s.group,[]),o.get(s.group).push(s));return[...o.entries()].map(([s,i])=>({label:s,options:i}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(r){this._options=this._options.map(o=>o.value===r?{...o,selected:!o.selected}:o),this._syncToSelect()}_selectAll(){this._options=this._options.map(r=>({...r,selected:!0})),this._syncToSelect()}_deselectAll(){this._options=this._options.map(r=>({...r,selected:!1})),this._syncToSelect()}_toggleGroup(r){let s=this._options.filter(i=>i.group===r).every(i=>i.selected);this._options=this._options.map(i=>i.group===r?{...i,selected:!s}:i),this._syncToSelect()}_syncToSelect(){if(this._select){for(let r of this._select.options){let o=this._options.find(s=>s.value===r.value);o&&(r.selected=o.selected)}this._select.dispatchEvent(new Event("change",{bubbles:!0}))}}_onSearchInput(r){this._search=r.target.value}_onSearchKeydown(r){r.key==="Enter"&&(r.preventDefault(),this._search=""),r.key==="Escape"&&(this._open=!1)}render(){return d`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():_}
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
        `}};q.styles=C`
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
    `,l([O()],q.prototype,"_open",2),l([O()],q.prototype,"_search",2),l([O()],q.prototype,"_options",2),q=l([b("repo-select")],q);var Qe=class extends fe(v){createRenderRoot(){return this}render(){let e=U.get();switch(e.name){case"search":return d`<cs-search-view></cs-search-view>`;case"view":return d`<cs-file-view .path=${e.path??""}></cs-file-view>`;case"about":return d`<div class="placeholder">About</div>`;default:return d`<div class="placeholder">Not found</div>`}}};Qe=l([b("cs-app")],Qe);export{Qe as CsApp,q as RepoSelect};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
