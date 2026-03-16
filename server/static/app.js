var br=Object.defineProperty;var xr=Object.getOwnPropertyDescriptor;var a=(t,e,r,o)=>{for(var s=o>1?void 0:o?xr(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&br(e,r,s),s};var Ne=globalThis,Pe=Ne.ShadowRoot&&(Ne.ShadyCSS===void 0||Ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),Nt=new WeakMap,de=class{constructor(e,r,o){if(this._$cssResult$=!0,o!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(Pe&&e===void 0){let o=r!==void 0&&r.length===1;o&&(e=Nt.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Nt.set(r,e))}return e}toString(){return this.cssText}},Pt=t=>new de(typeof t=="string"?t:t+"",void 0,rt),f=(t,...e)=>{let r=t.length===1?t[0]:e.reduce(((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new de(r,t,rt)},Rt=(t,e)=>{if(Pe)t.adoptedStyleSheets=e.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of e){let o=document.createElement("style"),s=Ne.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,t.appendChild(o)}},ot=Pe?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let o of e.cssRules)r+=o.cssText;return Pt(r)})(t):t;var{is:yr,defineProperty:$r,getOwnPropertyDescriptor:_r,getOwnPropertyNames:wr,getOwnPropertySymbols:Sr,getPrototypeOf:Er}=Object,Re=globalThis,Lt=Re.trustedTypes,kr=Lt?Lt.emptyScript:"",Ar=Re.reactiveElementPolyfillSupport,ue=(t,e)=>t,he={toAttribute(t,e){switch(e){case Boolean:t=t?kr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Le=(t,e)=>!yr(t,e),It={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:Le};Symbol.metadata??=Symbol("metadata"),Re.litPropertyMetadata??=new WeakMap;var I=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=It){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,r);s!==void 0&&$r(this.prototype,e,s)}}static getPropertyDescriptor(e,r,o){let{get:s,set:i}=_r(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:s,set(n){let p=s?.call(this);i?.call(this,n),this.requestUpdate(e,p,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??It}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;let e=Er(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){let r=this.properties,o=[...wr(r),...Sr(r)];for(let s of o)this.createProperty(s,r[s])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)r.unshift(ot(s))}else e!==void 0&&r.push(ot(e));return r}static _$Eu(e,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Rt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,r,o){this._$AK(e,o)}_$ET(e,r){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:he).toAttribute(r,o.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,r){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:he;this._$Em=s;let p=n.fromAttribute(r,i.type);this[s]=p??this._$Ej?.get(s)??p,this._$Em=null}}requestUpdate(e,r,o){if(e!==void 0){let s=this.constructor,i=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??Le)(i,r)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,p=this[s];n!==!0||this._$AL.has(s)||p===void 0||this.C(s,void 0,i,p)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[ue("elementProperties")]=new Map,I[ue("finalized")]=new Map,Ar?.({ReactiveElement:I}),(Re.reactiveElementVersions??=[]).push("2.1.1");var it=globalThis,Ie=it.trustedTypes,Mt=Ie?Ie.createPolicy("lit-html",{createHTML:t=>t}):void 0,nt="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,at="?"+M,Cr=`<${at}>`,Q=document,me=()=>Q.createComment(""),ge=t=>t===null||typeof t!="object"&&typeof t!="function",lt=Array.isArray,Ht=t=>lt(t)||typeof t?.[Symbol.iterator]=="function",st=`[ 	
\f\r]`,fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ut=/-->/g,Dt=/>/g,G=RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qt=/'/g,zt=/"/g,jt=/^(?:script|style|textarea|title)$/i,ct=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),c=ct(1),Bt=ct(2),bo=ct(3),U=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Wt=new WeakMap,K=Q.createTreeWalker(Q,129);function Ft(t,e){if(!lt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(e):e}var Gt=(t,e)=>{let r=t.length-1,o=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=fe;for(let p=0;p<r;p++){let l=t[p],u,m,d=-1,E=0;for(;E<l.length&&(n.lastIndex=E,m=n.exec(l),m!==null);)E=n.lastIndex,n===fe?m[1]==="!--"?n=Ut:m[1]!==void 0?n=Dt:m[2]!==void 0?(jt.test(m[2])&&(s=RegExp("</"+m[2],"g")),n=G):m[3]!==void 0&&(n=G):n===G?m[0]===">"?(n=s??fe,d=-1):m[1]===void 0?d=-2:(d=n.lastIndex-m[2].length,u=m[1],n=m[3]===void 0?G:m[3]==='"'?zt:qt):n===zt||n===qt?n=G:n===Ut||n===Dt?n=fe:(n=G,s=void 0);let b=n===G&&t[p+1].startsWith("/>")?" ":"";i+=n===fe?l+Cr:d>=0?(o.push(u),l.slice(0,d)+nt+l.slice(d)+M+b):l+M+(d===-2?p:b)}return[Ft(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ve=class t{constructor({strings:e,_$litType$:r},o){let s;this.parts=[];let i=0,n=0,p=e.length-1,l=this.parts,[u,m]=Gt(e,r);if(this.el=t.createElement(u,o),K.currentNode=this.el.content,r===2||r===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=K.nextNode())!==null&&l.length<p;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(nt)){let E=m[n++],b=s.getAttribute(d).split(M),y=/([.?@])?(.*)/.exec(E);l.push({type:1,index:i,name:y[2],strings:b,ctor:y[1]==="."?Ue:y[1]==="?"?De:y[1]==="@"?qe:J}),s.removeAttribute(d)}else d.startsWith(M)&&(l.push({type:6,index:i}),s.removeAttribute(d));if(jt.test(s.tagName)){let d=s.textContent.split(M),E=d.length-1;if(E>0){s.textContent=Ie?Ie.emptyScript:"";for(let b=0;b<E;b++)s.append(d[b],me()),K.nextNode(),l.push({type:2,index:++i});s.append(d[E],me())}}}else if(s.nodeType===8)if(s.data===at)l.push({type:2,index:i});else{let d=-1;for(;(d=s.data.indexOf(M,d+1))!==-1;)l.push({type:7,index:i}),d+=M.length-1}i++}}static createElement(e,r){let o=Q.createElement("template");return o.innerHTML=e,o}};function V(t,e,r=t,o){if(e===U)return e;let s=o!==void 0?r._$Co?.[o]:r._$Cl,i=ge(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(e=V(t,s._$AS(t,e.values),s,o)),e}var Me=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:o}=this._$AD,s=(e?.creationScope??Q).importNode(r,!0);K.currentNode=s;let i=K.nextNode(),n=0,p=0,l=o[0];for(;l!==void 0;){if(n===l.index){let u;l.type===2?u=new re(i,i.nextSibling,this,e):l.type===1?u=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(u=new ze(i,this,e)),this._$AV.push(u),l=o[++p]}n!==l?.index&&(i=K.nextNode(),n++)}return K.currentNode=Q,s}p(e){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,r),r+=o.strings.length-2):o._$AI(e[r])),r++}},re=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,s){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=V(this,e,r),ge(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ht(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(Q.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ve.createElement(Ft(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new Me(s,this),n=i.u(this.options);i.p(r),this.T(n),this._$AH=i}}_$AC(e){let r=Wt.get(e.strings);return r===void 0&&Wt.set(e.strings,r=new ve(e)),r}k(e){lt(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let i of e)s===r.length?r.push(o=new t(this.O(me()),this.O(me()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,o,s,i){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=S}_$AI(e,r=this,o,s){let i=this.strings,n=!1;if(i===void 0)e=V(this,e,r,0),n=!ge(e)||e!==this._$AH&&e!==U,n&&(this._$AH=e);else{let p=e,l,u;for(e=i[0],l=0;l<i.length-1;l++)u=V(this,p[o+l],r,l),u===U&&(u=this._$AH[l]),n||=!ge(u)||u!==this._$AH[l],u===S?e=S:e!==S&&(e+=(u??"")+i[l+1]),this._$AH[l]=u}n&&!s&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ue=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}},De=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}},qe=class extends J{constructor(e,r,o,s,i){super(e,r,o,s,i),this.type=5}_$AI(e,r=this){if((e=V(this,e,r,0)??S)===U)return;let o=this._$AH,s=e===S&&o!==S||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==S&&(o===S||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ze=class{constructor(e,r,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}},Kt={M:nt,P:M,A:at,C:1,L:Gt,R:Me,D:Ht,V,I:re,H:J,N:De,U:qe,B:Ue,F:ze},Or=it.litHtmlPolyfillSupport;Or?.(ve,re),(it.litHtmlVersions??=[]).push("3.3.1");var Qt=(t,e,r)=>{let o=r?.renderBefore??e,s=o._$litPart$;if(s===void 0){let i=r?.renderBefore??null;o._$litPart$=s=new re(e.insertBefore(me(),i),i,void 0,r??{})}return s._$AI(t),s};var pt=globalThis,g=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Qt(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};g._$litElement$=!0,g.finalized=!0,pt.litElementHydrateSupport?.({LitElement:g});var Tr=pt.litElementPolyfillSupport;Tr?.({LitElement:g});(pt.litElementVersions??=[]).push("4.2.1");var x=t=>(e,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var Nr={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:Le},Pr=(t=Nr,e,r)=>{let{kind:o,metadata:s}=r,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){let{name:n}=r;return{set(p){let l=e.get.call(this);e.set.call(this,p),this.requestUpdate(n,l,t)},init(p){return p!==void 0&&this.C(n,void 0,t,p),p}}}if(o==="setter"){let{name:n}=r;return function(p){let l=this[n];e.call(this,p),this.requestUpdate(n,l,t)}}throw Error("Unsupported decorator location: "+o)};function h(t){return(e,r)=>typeof r=="object"?Pr(t,e,r):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}function O(t){return h({...t,state:!0,attribute:!1})}var Rr=Object.defineProperty,Lr=(t,e,r)=>e in t?Rr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,dt=(t,e,r)=>(Lr(t,typeof e!="symbol"?e+"":e,r),r),Ir=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},ut=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},He=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},Vt=(t,e,r)=>(Ir(t,e,"access private method"),r);function Jt(t,e){return Object.is(t,e)}var k=null,be=!1,je=1,Be=Symbol("SIGNAL");function oe(t){let e=k;return k=t,e}function Mr(){return k}function Ur(){return be}var vt={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Fe(t){if(be)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(k===null)return;k.consumerOnSignalRead(t);let e=k.nextProducerIndex++;if(se(k),e<k.producerNode.length&&k.producerNode[e]!==t&&mt(k)){let r=k.producerNode[e];Ge(r,k.producerIndexOfThis[e])}k.producerNode[e]!==t&&(k.producerNode[e]=t,k.producerIndexOfThis[e]=mt(k)?Yt(t,k,e):0),k.producerLastReadVersion[e]=t.version}function Dr(){je++}function Zt(t){if(!(!t.dirty&&t.lastCleanEpoch===je)){if(!t.producerMustRecompute(t)&&!jr(t)){t.dirty=!1,t.lastCleanEpoch=je;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=je}}function Xt(t){if(t.liveConsumerNode===void 0)return;let e=be;be=!0;try{for(let r of t.liveConsumerNode)r.dirty||zr(r)}finally{be=e}}function qr(){return k?.consumerAllowSignalWrites!==!1}function zr(t){var e;t.dirty=!0,Xt(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function Wr(t){return t&&(t.nextProducerIndex=0),oe(t)}function Hr(t,e){if(oe(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(mt(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)Ge(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function jr(t){se(t);for(let e=0;e<t.producerNode.length;e++){let r=t.producerNode[e],o=t.producerLastReadVersion[e];if(o!==r.version||(Zt(r),o!==r.version))return!0}return!1}function Yt(t,e,r){var o;if(bt(t),se(t),t.liveConsumerNode.length===0){(o=t.watched)==null||o.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)t.producerIndexOfThis[s]=Yt(t.producerNode[s],t,s)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(e)-1}function Ge(t,e){var r;if(bt(t),se(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(r=t.unwatched)==null||r.call(t.wrapper);for(let s=0;s<t.producerNode.length;s++)Ge(t.producerNode[s],t.producerIndexOfThis[s])}let o=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[o],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[o],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let s=t.liveConsumerIndexOfThis[e],i=t.liveConsumerNode[e];se(i),i.producerIndexOfThis[s]=e}}function mt(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function se(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function bt(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function er(t){if(Zt(t),Fe(t),t.value===gt)throw t.error;return t.value}function Br(t){let e=Object.create(Fr);e.computation=t;let r=()=>er(e);return r[Be]=e,r}var ht=Symbol("UNSET"),ft=Symbol("COMPUTING"),gt=Symbol("ERRORED"),Fr={...vt,value:ht,dirty:!0,error:null,equal:Jt,producerMustRecompute(t){return t.value===ht||t.value===ft},producerRecomputeValue(t){if(t.value===ft)throw new Error("Detected cycle in computations.");let e=t.value;t.value=ft;let r=Wr(t),o,s=!1;try{o=t.computation.call(t.wrapper),s=e!==ht&&e!==gt&&t.equal.call(t.wrapper,e,o)}catch(i){o=gt,t.error=i}finally{Hr(t,r)}if(s){t.value=e;return}t.value=o,t.version++}};function Gr(){throw new Error}var Kr=Gr;function Qr(){Kr()}function Vr(t){let e=Object.create(Xr);e.value=t;let r=()=>(Fe(e),e.value);return r[Be]=e,r}function Jr(){return Fe(this),this.value}function Zr(t,e){qr()||Qr(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,Yr(t))}var Xr={...vt,equal:Jt,value:void 0};function Yr(t){t.version++,Dr(),Xt(t)}var A=Symbol("node"),_;(t=>{var e,r,o,s,i,n;class p{constructor(m,d={}){He(this,r),dt(this,e);let b=Vr(m)[Be];if(this[A]=b,b.wrapper=this,d){let y=d.equals;y&&(b.equal=y),b.watched=d[t.subtle.watched],b.unwatched=d[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Jr.call(this[A])}set(m){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Ur())throw new Error("Writes to signals not permitted during Watcher callback");let d=this[A];Zr(d,m)}}e=A,r=new WeakSet,o=function(){},t.isState=u=>typeof u=="object"&&ut(r,u),t.State=p;class l{constructor(m,d){He(this,i),dt(this,s);let b=Br(m)[Be];if(b.consumerAllowSignalWrites=!0,this[A]=b,b.wrapper=this,d){let y=d.equals;y&&(b.equal=y),b.watched=d[t.subtle.watched],b.unwatched=d[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return er(this[A])}}s=A,i=new WeakSet,n=function(){},t.isComputed=u=>typeof u=="object"&&ut(i,u),t.Computed=l,(u=>{var m,d,E,b,y;function F(w){let $,v=null;try{v=oe(null),$=w()}finally{oe(v)}return $}u.untrack=F;function H(w){var $;if(!(0,t.isComputed)(w)&&!(0,t.isWatcher)(w))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(($=w[A].producerNode)==null?void 0:$.map(v=>v.wrapper))??[]}u.introspectSources=H;function et(w){var $;if(!(0,t.isComputed)(w)&&!(0,t.isState)(w))throw new TypeError("Called introspectSinks without a Signal argument");return(($=w[A].liveConsumerNode)==null?void 0:$.map(v=>v.wrapper))??[]}u.introspectSinks=et;function tt(w){if(!(0,t.isComputed)(w)&&!(0,t.isState)(w))throw new TypeError("Called hasSinks without a Signal argument");let $=w[A].liveConsumerNode;return $?$.length>0:!1}u.hasSinks=tt;function fr(w){if(!(0,t.isComputed)(w)&&!(0,t.isWatcher)(w))throw new TypeError("Called hasSources without a Computed or Watcher argument");let $=w[A].producerNode;return $?$.length>0:!1}u.hasSources=fr;class mr{constructor($){He(this,d),He(this,b),dt(this,m);let v=Object.create(vt);v.wrapper=this,v.consumerMarkedDirty=$,v.consumerIsAlwaysLive=!0,v.consumerAllowSignalWrites=!1,v.producerNode=[],this[A]=v}watch(...$){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Vt(this,b,y).call(this,$);let v=this[A];v.dirty=!1;let C=oe(v);for(let Te of $)Fe(Te[A]);oe(C)}unwatch(...$){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Vt(this,b,y).call(this,$);let v=this[A];se(v);for(let C=v.producerNode.length-1;C>=0;C--)if($.includes(v.producerNode[C].wrapper)){Ge(v.producerNode[C],v.producerIndexOfThis[C]);let Te=v.producerNode.length-1;if(v.producerNode[C]=v.producerNode[Te],v.producerIndexOfThis[C]=v.producerIndexOfThis[Te],v.producerNode.length--,v.producerIndexOfThis.length--,v.nextProducerIndex--,C<v.producerNode.length){let vr=v.producerIndexOfThis[C],Tt=v.producerNode[C];bt(Tt),Tt.liveConsumerIndexOfThis[vr]=C}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[A].producerNode.filter(v=>v.dirty).map(v=>v.wrapper)}}m=A,d=new WeakSet,E=function(){},b=new WeakSet,y=function(w){for(let $ of w)if(!(0,t.isComputed)($)&&!(0,t.isState)($))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=w=>ut(d,w),u.Watcher=mr;function gr(){var w;return(w=Mr())==null?void 0:w.wrapper}u.currentComputed=gr,u.watched=Symbol("watched"),u.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(_||(_={}));var xt=!1,tr=new _.subtle.Watcher(()=>{xt||(xt=!0,queueMicrotask(()=>{xt=!1;for(let t of tr.getPending())t.get();tr.watch()}))}),eo=Symbol("SignalWatcherBrand"),to=new FinalizationRegistry(t=>{t.unwatch(..._.subtle.introspectSources(t))}),rr=new WeakMap;function xe(t){return t[eo]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new _.State(0),this._$Si=!1}_$Sl(){var e,r;let o=[],s=[];this._$St.forEach((n,p)=>{(n?.beforeUpdate?o:s).push(p)});let i=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));o.forEach(n=>n.get()),(r=this._$Su)===null||r===void 0||r.get(),i.forEach(n=>n.get()),s.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new _.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new _.subtle.Watcher(function(){let r=rr.get(this);r!==void 0&&(r._$Si===!1&&(new Set(this.getPending()).has(r._$Su)?r.requestUpdate():r._$Sv()),this.watch())});rr.set(e,this),to.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([r])=>r))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(..._.subtle.introspectSources(this.h).filter(r=>{var o;let s=((o=this._$St.get(r))===null||o===void 0?void 0:o.manualDispose)!==!0;return s&&this._$St.delete(r),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,r){var o;this._$S_();let s=new _.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,r),(o=r?.beforeUpdate)!==null&&o!==void 0&&o?_.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>_.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var Ke={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ye=t=>(...e)=>({_$litDirective$:t,values:e}),ie=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,o){this._$Ct=e,this._$AM=r,this._$Ci=o}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var{I:us}=Kt;var or=t=>t.strings===void 0;var $e=(t,e)=>{let r=t._$AN;if(r===void 0)return!1;for(let o of r)o._$AO?.(e,!1),$e(o,e);return!0},Qe=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while(r?.size===0)},sr=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),so(e)}};function ro(t){this._$AN!==void 0?(Qe(this),this._$AM=t,sr(this)):this._$AM=t}function oo(t,e=!1,r=0){let o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let i=r;i<o.length;i++)$e(o[i],!1),Qe(o[i]);else o!=null&&($e(o,!1),Qe(o));else $e(this,t)}var so=t=>{t.type==Ke.CHILD&&(t._$AP??=oo,t._$AQ??=ro)},Ve=class extends ie{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,o){super._$AT(e,r,o),sr(this),this.isConnected=e._$AU}_$AO(e,r=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),r&&($e(this,e),Qe(this))}setValue(e){if(or(this._$Ct))this._$Ct._$AI(e,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};var yt=!1,$t=new _.subtle.Watcher(async()=>{yt||(yt=!0,queueMicrotask(()=>{yt=!1;for(let t of $t.getPending())t.get();$t.watch()}))}),Je=class extends Ve{_$S_(){var e,r;this._$Sm===void 0&&(this._$Sj=new _.Computed(()=>{var o;let s=(o=this._$SW)===null||o===void 0?void 0:o.get();return this.setValue(s),s}),this._$Sm=(r=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&r!==void 0?r:$t,this._$Sm.watch(this._$Sj),_.subtle.untrack(()=>{var o;return(o=this._$Sj)===null||o===void 0?void 0:o.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return _.subtle.untrack(()=>e.get())}update(e,[r]){var o,s;return(o=this._$Sk)!==null&&o!==void 0||(this._$Sk=(s=e.options)===null||s===void 0?void 0:s.host),r!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=r,this._$S_(),_.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},_t=ye(Je);var wt=t=>(e,...r)=>t(e,...r.map(o=>o instanceof _.State||o instanceof _.Computed?_t(o):o)),io=wt(c),no=wt(Bt);var Ns=_.State,Ps=_.Computed,N=(t,e)=>new _.State(t,e),ne=(t,e)=>new _.Computed(t,e);var ao=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function ir(t,e=""){for(let{pattern:r,name:o}of ao){let s=r.exec(t);if(s)return{name:o,path:s[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var D=N(ir(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{D.set(ir(window.location.pathname,window.location.search))});var Ws=f`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,P=f`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Hs=f`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,nr=f`
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
`,ae=f`
  .label {
    font-weight: bold;
  }
`,ar=f`
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
`,lr=f`
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
`,js=f`
  .hidden {
    display: none !important;
  }
`;var lo=new Set(["file","-file","path","-path","repo","-repo","tags","-tags","case","lit","max_matches"]);function Et(t){let e={},r="",o="",s="",i=t.trim(),n=/\[|\(|(?:^([a-zA-Z0-9\-_]+):|\\.)| /,p=!0;for(;i.length>0;){let u=n.exec(i);if(u===null){s+=i;break}s+=i.slice(0,u.index);let m=u[0];if(i=i.slice(u.index+m.length),p=p&&u.index===0,m===" ")o===""?s+=" ":(St(e,o,s),o="",s="");else if(m==="("||m==="["){let d=m==="("?")":"]",E=1,b=0,y=!1,F="";for(;b<i.length&&E>0;){let H=i[b];b++,y?y=!1:H==="\\"?y=!0:H===m?E++:H===d&&E--,F+=H}s+=m+F,i=i.slice(b)}else if(m.startsWith("\\"))s+=m;else{let d=u[1];o===""&&d&&lo.has(d)?(s.trim()!==""&&St(e,o,s),s="",o=d):s+=m}p=m===" "}St(e,o,s);let l=e[""]||[];return delete e[""],r=l.join(" ").trim(),{line:r,operators:e}}function St(t,e,r){t[e]||(t[e]=[]),t[e].push(r)}function cr(t,e={},r={}){let o=new URLSearchParams;t.trim()&&o.set("q",t.trim()),e.literal&&o.set("literal","true"),e.caseSensitive&&o.set("fold_case","false");for(let[s,i]of Object.entries(r))for(let n of i)o.append(s,n);return o}async function pr(t,e,r){let o="/api/search?"+t.toString(),s=await fetch(o,{signal:r});if(!s.ok){let i=await s.text();throw new Error(`search failed (${s.status}): ${i}`)}if(!s.body)throw new Error("response has no body");await co(s.body,i=>{switch(i.type){case"result":e.onResult?.(i);break;case"file":e.onFile?.(i);break;case"facets":e.onFacets?.(i);break;case"done":e.onDone?.(i);break}})}async function co(t,e){let r=t.getReader(),o=new TextDecoder,s="";try{for(;;){let{done:n,value:p}=await r.read();if(n)break;s+=o.decode(p,{stream:!0});let l;for(;(l=s.indexOf(`
`))!==-1;){let u=s.slice(0,l).trim();s=s.slice(l+1),u.length!==0&&e(JSON.parse(u))}}s+=o.decode();let i=s.trim();i.length>0&&e(JSON.parse(i))}finally{r.releaseLock()}}function Ze(t){let e=t.indexOf("/+/");if(e===-1)return{repo:t,version:"",filePath:""};let r=t.slice(0,e),o=t.slice(e+3),s=r.indexOf("/");return s===-1?{repo:r,version:"",filePath:o}:{repo:r.slice(0,s),version:r.slice(s+1),filePath:o}}var ce=ne(()=>D.get().params.get("q")??""),Ys=ne(()=>{let t=D.get().params;return{literal:t.get("literal")==="true",caseSensitive:t.get("fold_case")==="false"}}),dr=ne(()=>{let t=D.get().params.get("context");if(t!==null){let e=parseInt(t,10);if(!isNaN(e)&&e>=0)return e}return 3}),ei=ne(()=>Et(ce.get())),we=N([]),Ye=N([]),Se=N(null),Ee=N(null),Z=N(!1),le=N(null),At=N(!1),ur=ne(()=>{let t=Ye.get();return At.get()||t.length<=10?t:t.slice(0,10)}),kt=null;async function hr(){kt&&kt.abort();let t=new AbortController;kt=t;let e=ce.get();if(!e){we.set([]),Ye.set([]),Se.set(null),Ee.set(null),Z.set(!1),le.set(null),At.set(!1);return}let r=D.get(),o=new URLSearchParams(r.params),s=Et(e);At.set(s.line===""),Z.set(!0),le.set(null),we.set([]),Ye.set([]),Se.set(null),Ee.set(null);let i=[],n=[],p=null;try{await pr(o,{onResult(l){i.push(l)},onFile(l){n.push(l)},onFacets(l){p=l},onDone(l){we.set(i),Ye.set(n),Se.set(p),Ee.set(l),Z.set(!1)},onError(l){t.signal.aborted||(le.set(l.message),Z.set(!1))}},t.signal)}catch(l){t.signal.aborted||(le.set(l instanceof Error?l.message:String(l)),Z.set(!1))}}var Xe=null,_e="";function Ct(t,e={},r={}){Xe&&clearTimeout(Xe);let o=cr(t,e,r),s=t!==_e,i=t?`${t} \xB7 code search`:"code search";document.title=i;let n=o.toString(),p="/search"+(n?"?"+n:"");s&&_e!==""?(history.pushState(null,i,p),_e=t):(history.replaceState(null,i,p),_e===""&&(_e=t)),D.set({name:"search",params:o}),Xe=setTimeout(()=>{Xe=null,hr()},100)}{let t=ce.get();t&&(document.title=`${t} \xB7 code search`,hr())}var j=class extends g{constructor(){super(...arguments);this.value="";this.debounce=100;this.error="";this.timer=null}render(){return c`
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
          ${this.error?c`<span id="errortext">${this.error}</span>`:S}
        </div>
      </div>
    `}onInput(){this.timer&&clearTimeout(this.timer);let r=this.renderRoot.querySelector("#searchbox");this.timer=setTimeout(()=>{this.timer=null,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:r.value},bubbles:!0,composed:!0}))},this.debounce)}onKeydown(r){if(r.key==="Enter"){this.timer&&clearTimeout(this.timer),this.timer=null;let o=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0}))}}appendQuery(r){let o=this.renderRoot.querySelector("#searchbox");o&&(o.value+=r,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};j.styles=[lr,f`
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
    `],a([h()],j.prototype,"value",2),a([h({type:Number})],j.prototype,"debounce",2),a([h()],j.prototype,"error",2),j=a([x("cs-search-input")],j);var X=class extends g{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let r=this.options.caseSensitive?"false":"auto";return c`
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
    `}renderRepoOptions(){return this.repos.length?this.repos.map(r=>c`
      <optgroup label=${r.label}>
        ${r.repos.map(o=>{let s=o.split("/").pop()??o;return c`<option value=${o} data-tokens=${o}>${s}</option>`})}
      </optgroup>
    `):""}setCase(r){let o=r==="false";this.options={...this.options,caseSensitive:o},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};X.styles=[ar,ae,f`
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
    `],a([h({type:Object})],X.prototype,"options",2),a([h({type:Array})],X.prototype,"repos",2),X=a([x("cs-search-options")],X);var Ot=ye(class extends ie{constructor(t){if(super(t),t.type!==Ke.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let r=t.element.classList;for(let o of this.st)o in e||(r.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return U}});var B=class extends g{render(){return this.start!=null&&this.end!=null?c`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:c`${this.text}`}};B.styles=f`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,a([h()],B.prototype,"text",2),a([h({type:Number})],B.prototype,"start",2),a([h({type:Number})],B.prototype,"end",2),B=a([x("match-str")],B);var T=class extends g{render(){return c`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};T.styles=f`
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
    `,a([h()],T.prototype,"text",2),a([h()],T.prototype,"href",2),a([h({type:Number})],T.prototype,"start",2),a([h({type:Number})],T.prototype,"end",2),a([h()],T.prototype,"repo",2),a([h()],T.prototype,"version",2),T=a([x("filename-match")],T);var R=class extends g{render(){let e=this.start!=null&&this.end!=null;return c`<a class=${Ot({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Ot({matchline:e})}
                >${e?c`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};R.styles=f`
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
    `,a([h({type:Number})],R.prototype,"lineNo",2),a([h()],R.prototype,"text",2),a([h()],R.prototype,"href",2),a([h({type:Number})],R.prototype,"start",2),a([h({type:Number})],R.prototype,"end",2),R=a([x("match-line")],R);function po(t){let e=t.lastIndexOf("/");return e<0?".":t.slice(0,e)}function uo(t){let e=t.lastIndexOf("/");return e<0?t:t.slice(e+1)}var Y=class extends g{constructor(){super(...arguments);this.noContext=!1}render(){let{repo:r,version:o,filePath:s}=Ze(this.result.path),i=`/view/${this.result.path}`,n=this.splitGroups(this.result.lines),p=o.length>6?o.slice(0,6):o,l=po(s),u=uo(s);return c`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${i}>
              <span class="repo">${r}:</span><span class="version">${p}:</span>${l}/<span class="filename">${u}</span>
            </a>
          </span>
        </div>
        ${n.map(m=>c`
            <div class="match">
              <div class="contents">
                ${m.map(d=>{let E=d[0],b=d[1],y=d.length>2?d[2]:void 0,F=y!==void 0&&y.length>0,H=`${i}#L${E}`,et=F&&y?y[0][0]:void 0,tt=F&&y?y[0][1]:void 0;return c`
                    <match-line
                      .lineNo=${E}
                      text=${b}
                      href=${H}
                      .start=${et}
                      .end=${tt}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(r){let o=[],s=[];for(let i of r)i===null?s.length>0&&(o.push(s),s=[]):s.push(i);return s.length>0&&o.push(s),o}};Y.styles=[nr,P,f`
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
    `],a([h({type:Object})],Y.prototype,"result",2),a([h({type:Boolean,reflect:!0,attribute:"no-context"})],Y.prototype,"noContext",2),Y=a([x("cs-result-group")],Y);var q=class extends g{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return c`<div id="countarea">Searching...</div>`;let r=this.truncated?`${this.total}+`:`${this.total}`;return c`
      <div id="countarea">
        <span id="numresults">${r}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};q.styles=[ae,f`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],a([h({type:Number})],q.prototype,"total",2),a([h({type:Number})],q.prototype,"timeMs",2),a([h({type:Boolean})],q.prototype,"truncated",2),a([h({type:Boolean})],q.prototype,"loading",2),q=a([x("cs-result-stats")],q);var ee=class extends g{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){if(!this.facets)return S;let r=[{label:"Extension",key:"f.ext",buckets:this.facets.ext},{label:"Repository",key:"f.repo",buckets:this.facets.repo},{label:"Path",key:"f.path",buckets:this.facets.path}].filter(o=>o.buckets&&o.buckets.length>0);return r.length===0?S:c`
      <div class="panel">
        ${r.map(o=>this.renderSection(o.label,o.key,o.buckets))}
      </div>
    `}renderSection(r,o,s){let i=this.selected[o]??new Set,n=[...s].sort((p,l)=>l.c-p.c||p.v.localeCompare(l.v));return c`
      <div class="section">
        <span class="section-label">${r}</span>
        ${n.slice(0,10).map(p=>c`
          <button
            class=${i.has(p.v)?"pill active":"pill"}
            @click=${()=>this.toggle(o,p.v)}
          >${p.v} <span class="count">${p.c}</span></button>
        `)}
      </div>
    `}toggle(r,o){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:r,value:o},bubbles:!0,composed:!0}))}};ee.styles=f`
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

    .count {
      color: var(--color-foreground-muted);
      font-size: 10px;
    }

    .pill.active .count {
      color: inherit;
    }
  `,a([h({type:Object})],ee.prototype,"facets",2),a([h({type:Object})],ee.prototype,"selected",2),ee=a([x("cs-facet-panel")],ee);var ke=class extends g{render(){return c`
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
    `}};ke.styles=[P,f`
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
    `],ke=a([x("cs-search-help")],ke);var Ae=class extends xe(g){constructor(){super(...arguments);this.currentOptions={};this.activeFacets={}}render(){let r=ce.get(),o=we.get(),s=ur.get(),i=Ee.get(),n=Z.get(),p=le.get(),l=Se.get(),u=dr.get(),m=i||n;return c`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${d=>d.preventDefault()}
        >
          <cs-search-input
            .value=${r}
            .error=${p??""}
            @search-input=${this.onSearchInput}
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
        ${m?c`
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
                ${s.map(d=>{let{repo:E,version:b,filePath:y}=Ze(d.path);return c`
                    <filename-match
                      text=${y}
                      start=${d.match[0]}
                      end=${d.match[1]}
                      repo=${E}
                      version=${b.slice(0,6)}
                      href="/view/${d.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${o.map(d=>c`
                  <cs-result-group .result=${d} ?no-context=${u<=0}></cs-result-group>
                `)}
              </div>
            </div>
          </div>
        `:c`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(r){let{key:o,value:s}=r.detail,i=this.activeFacets[o]??new Set,n=new Set(i);n.has(s)?n.delete(s):n.add(s),this.activeFacets={...this.activeFacets,[o]:n},this.reSearch()}onSearchInput(r){Ct(r.detail.value,this.currentOptions,this.facetParams())}onOptionsChange(r){this.currentOptions=r.detail,this.reSearch()}reSearch(){let r=ce.get();r&&Ct(r,this.currentOptions,this.facetParams())}getRepos(){return window.__CS_INIT?.repos??[]}facetParams(){let r={};for(let[o,s]of Object.entries(this.activeFacets))s.size>0&&(r[o]=[...s]);return r}};Ae.styles=[P,ae,f`
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

    `],Ae=a([x("cs-search-view")],Ae);var pe=class extends g{constructor(){super(...arguments);this.path=""}render(){let r=this.path.indexOf("/+/");if(r===-1)return c`<span>${this.path}</span>`;let o=this.path.slice(0,r),i=this.path.slice(r+3).split("/").filter(n=>n.length>0);return c`
      <nav class="breadcrumbs">
        <a href="/view/${o}/+/">${o}</a>
        ${i.map((n,p)=>{let l=i.slice(0,p+1).join("/"),u=`/view/${o}/+/${l}${p<i.length-1?"/":""}`;return c`<span class="sep">/</span><a href=${u}>${n}</a>`})}
      </nav>
    `}};pe.styles=f`
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
  `,a([h()],pe.prototype,"path",2),pe=a([x("cs-breadcrumbs")],pe);var te=class extends g{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let r=[...this.entries].sort((o,s)=>{let i=o.endsWith("/"),n=s.endsWith("/");return i!==n?i?-1:1:o.localeCompare(s)});return c`
      <div class="listing">
        ${r.map(o=>{let s=o.endsWith("/"),i=this.basePath+o;return c`
            <a class=${s?"dir":"file"} href=${i}>${o}</a>
          `})}
      </div>
    `}};te.styles=f`
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
  `,a([h({type:Array})],te.prototype,"entries",2),a([h()],te.prototype,"basePath",2),te=a([x("cs-dir-listing")],te);var z=class extends g{constructor(){super(...arguments);this.content="";this.basePath="";this.selectedStart=-1;this.selectedEnd=-1;this.onHashChange=()=>this.parseHash()}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange)}parseHash(){let o=window.location.hash.match(/^#L(\d+)(?:-L?(\d+))?$/);o?(this.selectedStart=parseInt(o[1],10),this.selectedEnd=o[2]?parseInt(o[2],10):this.selectedStart):(this.selectedStart=-1,this.selectedEnd=-1)}render(){let r=this.content.split(`
`);return r.length>0&&r[r.length-1]===""&&r.pop(),c`
      <div class="viewer">
        ${r.map((o,s)=>{let i=s+1,n=i>=this.selectedStart&&i<=this.selectedEnd;return c`
            <div class="line ${n?"selected":""}">
              <a class="lno" href="#L${i}" @click=${p=>this.onLineClick(p,i)}>${i}</a>
              <span class="code">${o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(r,o){if(r.shiftKey&&this.selectedStart>0){r.preventDefault();let s=Math.min(this.selectedStart,o),i=Math.max(this.selectedStart,o);this.selectedStart=s,this.selectedEnd=i,window.location.hash=`#L${s}-L${i}`}else this.selectedStart=o,this.selectedEnd=o}};z.styles=f`
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
  `,a([h()],z.prototype,"content",2),a([h()],z.prototype,"basePath",2),a([O()],z.prototype,"selectedStart",2),a([O()],z.prototype,"selectedEnd",2),z=a([x("cs-code-viewer")],z);var L=class extends g{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.loading=!0;this.error=null}willUpdate(r){r.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null;let r=this.path.endsWith("/")||this.path.endsWith("/+/")||!this.path.includes("/+/"),o=`/raw/${this.path}${r&&!this.path.endsWith("/")?"/":""}`;try{let s=await fetch(o);if(!s.ok){this.error=`Not found (${s.status})`,this.loading=!1;return}(s.headers.get("Content-Type")??"").includes("application/json")?this.dirEntries=await s.json():this.content=await s.text()}catch(s){this.error=s instanceof Error?s.message:String(s)}this.loading=!1}render(){return c`
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
    `}};L.styles=f`
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
  `,a([h()],L.prototype,"path",2),a([O()],L.prototype,"content",2),a([O()],L.prototype,"dirEntries",2),a([O()],L.prototype,"loading",2),a([O()],L.prototype,"error",2),L=a([x("cs-file-view")],L);var Ce=class extends g{render(){return c`
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
    `}};Ce.styles=[P,f`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Ce=a([x("cs-about-view")],Ce);var W=class extends g{constructor(){super(...arguments);this._open=!1;this._search="";this._options=[];this._select=null;this._onOutsideClick=r=>{this._open&&(this.contains(r.target)||(this._open=!1))};this._onFocusOut=r=>{this._open&&!this.contains(r.relatedTarget)&&(this._open=!1)}}connectedCallback(){super.connectedCallback(),this._select=this.querySelector("select"),this._select&&this._readOptions(),document.addEventListener("click",this._onOutsideClick),this.addEventListener("focusout",this._onFocusOut)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick),this.removeEventListener("focusout",this._onFocusOut)}_readOptions(){let r=[];for(let o of this._select.children)if(o instanceof HTMLOptGroupElement)for(let s of o.querySelectorAll("option"))r.push({value:s.value,label:s.textContent?.trim()||s.value,group:o.label,selected:s.selected});else o instanceof HTMLOptionElement&&r.push({value:o.value,label:o.textContent?.trim()||o.value,group:"",selected:o.selected});this._options=r}get _buttonText(){let r=this._options.filter(o=>o.selected);return r.length===0?"(all repositories)":r.length<=4?r.map(o=>o.label).join(", "):`(${r.length} repositories)`}get _filteredGroups(){let r=this._search.toLowerCase(),o=new Map;for(let s of this._options)r&&!s.value.toLowerCase().includes(r)&&!s.label.toLowerCase().includes(r)||(o.has(s.group)||o.set(s.group,[]),o.get(s.group).push(s));return[...o.entries()].map(([s,i])=>({label:s,options:i}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(r){this._options=this._options.map(o=>o.value===r?{...o,selected:!o.selected}:o),this._syncToSelect()}_selectAll(){this._options=this._options.map(r=>({...r,selected:!0})),this._syncToSelect()}_deselectAll(){this._options=this._options.map(r=>({...r,selected:!1})),this._syncToSelect()}_toggleGroup(r){let s=this._options.filter(i=>i.group===r).every(i=>i.selected);this._options=this._options.map(i=>i.group===r?{...i,selected:!s}:i),this._syncToSelect()}_syncToSelect(){if(this._select){for(let r of this._select.options){let o=this._options.find(s=>s.value===r.value);o&&(r.selected=o.selected)}this._select.dispatchEvent(new Event("change",{bubbles:!0}))}}_onSearchInput(r){this._search=r.target.value}_onSearchKeydown(r){r.key==="Enter"&&(r.preventDefault(),this._search=""),r.key==="Escape"&&(this._open=!1)}render(){return c`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():S}
            <slot></slot>
        `}_renderDropdown(){let r=this._filteredGroups;return c`
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
        `}_renderGroup(r){return r.label?c`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(r.label)}>${r.label}</div>
                ${r.options.map(o=>this._renderOption(o))}
            </div>
        `:r.options.map(o=>this._renderOption(o))}_renderOption(r){return c`
            <label class="option ${r.selected?"selected":""}">
                <input type="checkbox" .checked=${r.selected} @change=${()=>this._toggleOption(r.value)} />
                ${r.label}
            </label>
        `}};W.styles=f`
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
    `,a([O()],W.prototype,"_open",2),a([O()],W.prototype,"_search",2),a([O()],W.prototype,"_options",2),W=a([x("repo-select")],W);var Oe=class extends xe(g){render(){let e=D.get();return c`
      <main>${this.renderView(e)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(e){switch(e.name){case"search":return c`<cs-search-view></cs-search-view>`;case"view":return c`<cs-file-view .path=${e.path??""}></cs-file-view>`;case"about":return c`<cs-about-view></cs-about-view>`;default:return c`<div class="placeholder">Not found</div>`}}};Oe.styles=[P,f`
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
    `],Oe=a([x("cs-app")],Oe);export{Oe as CsApp,W as RepoSelect};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
