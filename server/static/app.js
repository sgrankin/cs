var br=Object.defineProperty;var xr=Object.getOwnPropertyDescriptor;var a=(r,e,t,o)=>{for(var s=o>1?void 0:o?xr(e,t):e,i=r.length-1,n;i>=0;i--)(n=r[i])&&(s=(o?n(e,t,s):n(s))||s);return o&&s&&br(e,t,s),s};var Re=globalThis,Ne=Re.ShadowRoot&&(Re.ShadyCSS===void 0||Re.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),Rt=new WeakMap,pe=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Ne&&e===void 0){let o=t!==void 0&&t.length===1;o&&(e=Rt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Rt.set(t,e))}return e}toString(){return this.cssText}},Nt=r=>new pe(typeof r=="string"?r:r+"",void 0,rt),f=(r,...e)=>{let t=r.length===1?r[0]:e.reduce(((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[i+1]),r[0]);return new pe(t,r,rt)},Pt=(r,e)=>{if(Ne)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(let t of e){let o=document.createElement("style"),s=Re.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=t.cssText,r.appendChild(o)}},ot=Ne?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let o of e.cssRules)t+=o.cssText;return Nt(t)})(r):r;var{is:yr,defineProperty:$r,getOwnPropertyDescriptor:wr,getOwnPropertyNames:_r,getOwnPropertySymbols:Sr,getPrototypeOf:Er}=Object,Pe=globalThis,Lt=Pe.trustedTypes,kr=Lt?Lt.emptyScript:"",Cr=Pe.reactiveElementPolyfillSupport,ue=(r,e)=>r,he={toAttribute(r,e){switch(e){case Boolean:r=r?kr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Le=(r,e)=>!yr(r,e),It={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:Le};Symbol.metadata??=Symbol("metadata"),Pe.litPropertyMetadata??=new WeakMap;var M=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=It){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,t);s!==void 0&&$r(this.prototype,e,s)}}static getPropertyDescriptor(e,t,o){let{get:s,set:i}=wr(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let d=s?.call(this);i?.call(this,n),this.requestUpdate(e,d,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??It}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;let e=Er(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){let t=this.properties,o=[..._r(t),...Sr(t)];for(let s of o)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[o,s]of t)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let s=this._$Eu(t,o);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)t.unshift(ot(s))}else e!==void 0&&t.push(ot(e));return t}static _$Eu(e,t){let o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:he).toAttribute(t,o.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:he;this._$Em=s;let d=n.fromAttribute(t,i.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){let s=this.constructor,i=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??Le)(i,t)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,d=this[s];n!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,i,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[ue("elementProperties")]=new Map,M[ue("finalized")]=new Map,Cr?.({ReactiveElement:M}),(Pe.reactiveElementVersions??=[]).push("2.1.1");var it=globalThis,Ie=it.trustedTypes,Mt=Ie?Ie.createPolicy("lit-html",{createHTML:r=>r}):void 0,nt="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,at="?"+U,Ar=`<${at}>`,Q=document,me=()=>Q.createComment(""),ge=r=>r===null||typeof r!="object"&&typeof r!="function",lt=Array.isArray,Ht=r=>lt(r)||typeof r?.[Symbol.iterator]=="function",st=`[ 	
\f\r]`,fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ut=/-->/g,Dt=/>/g,F=RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qt=/'/g,zt=/"/g,jt=/^(?:script|style|textarea|title)$/i,ct=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),c=ct(1),Bt=ct(2),yo=ct(3),D=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Wt=new WeakMap,G=Q.createTreeWalker(Q,129);function Kt(r,e){if(!lt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(e):e}var Ft=(r,e)=>{let t=r.length-1,o=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=fe;for(let d=0;d<t;d++){let l=r[d],u,m,p=-1,E=0;for(;E<l.length&&(n.lastIndex=E,m=n.exec(l),m!==null);)E=n.lastIndex,n===fe?m[1]==="!--"?n=Ut:m[1]!==void 0?n=Dt:m[2]!==void 0?(jt.test(m[2])&&(s=RegExp("</"+m[2],"g")),n=F):m[3]!==void 0&&(n=F):n===F?m[0]===">"?(n=s??fe,p=-1):m[1]===void 0?p=-2:(p=n.lastIndex-m[2].length,u=m[1],n=m[3]===void 0?F:m[3]==='"'?zt:qt):n===zt||n===qt?n=F:n===Ut||n===Dt?n=fe:(n=F,s=void 0);let b=n===F&&r[d+1].startsWith("/>")?" ":"";i+=n===fe?l+Ar:p>=0?(o.push(u),l.slice(0,p)+nt+l.slice(p)+U+b):l+U+(p===-2?d:b)}return[Kt(r,i+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ve=class r{constructor({strings:e,_$litType$:t},o){let s;this.parts=[];let i=0,n=0,d=e.length-1,l=this.parts,[u,m]=Ft(e,t);if(this.el=r.createElement(u,o),G.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=G.nextNode())!==null&&l.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(nt)){let E=m[n++],b=s.getAttribute(p).split(U),y=/([.?@])?(.*)/.exec(E);l.push({type:1,index:i,name:y[2],strings:b,ctor:y[1]==="."?Ue:y[1]==="?"?De:y[1]==="@"?qe:Z}),s.removeAttribute(p)}else p.startsWith(U)&&(l.push({type:6,index:i}),s.removeAttribute(p));if(jt.test(s.tagName)){let p=s.textContent.split(U),E=p.length-1;if(E>0){s.textContent=Ie?Ie.emptyScript:"";for(let b=0;b<E;b++)s.append(p[b],me()),G.nextNode(),l.push({type:2,index:++i});s.append(p[E],me())}}}else if(s.nodeType===8)if(s.data===at)l.push({type:2,index:i});else{let p=-1;for(;(p=s.data.indexOf(U,p+1))!==-1;)l.push({type:7,index:i}),p+=U.length-1}i++}}static createElement(e,t){let o=Q.createElement("template");return o.innerHTML=e,o}};function J(r,e,t=r,o){if(e===D)return e;let s=o!==void 0?t._$Co?.[o]:t._$Cl,i=ge(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(r),s._$AT(r,t,o)),o!==void 0?(t._$Co??=[])[o]=s:t._$Cl=s),s!==void 0&&(e=J(r,s._$AS(r,e.values),s,o)),e}var Me=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:o}=this._$AD,s=(e?.creationScope??Q).importNode(t,!0);G.currentNode=s;let i=G.nextNode(),n=0,d=0,l=o[0];for(;l!==void 0;){if(n===l.index){let u;l.type===2?u=new re(i,i.nextSibling,this,e):l.type===1?u=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(u=new ze(i,this,e)),this._$AV.push(u),l=o[++d]}n!==l?.index&&(i=G.nextNode(),n++)}return G.currentNode=Q,s}p(e){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},re=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,s){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),ge(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ht(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(Q.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ve.createElement(Kt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new Me(s,this),n=i.u(this.options);i.p(t),this.T(n),this._$AH=i}}_$AC(e){let t=Wt.get(e.strings);return t===void 0&&Wt.set(e.strings,t=new ve(e)),t}k(e){lt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,s=0;for(let i of e)s===t.length?t.push(o=new r(this.O(me()),this.O(me()),this,this.options)):o=t[s],o._$AI(i),s++;s<t.length&&(this._$AR(o&&o._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,s,i){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=S}_$AI(e,t=this,o,s){let i=this.strings,n=!1;if(i===void 0)e=J(this,e,t,0),n=!ge(e)||e!==this._$AH&&e!==D,n&&(this._$AH=e);else{let d=e,l,u;for(e=i[0],l=0;l<i.length-1;l++)u=J(this,d[o+l],t,l),u===D&&(u=this._$AH[l]),n||=!ge(u)||u!==this._$AH[l],u===S?e=S:e!==S&&(e+=(u??"")+i[l+1]),this._$AH[l]=u}n&&!s&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ue=class extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}},De=class extends Z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}},qe=class extends Z{constructor(e,t,o,s,i){super(e,t,o,s,i),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??S)===D)return;let o=this._$AH,s=e===S&&o!==S||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==S&&(o===S||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ze=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}},Gt={M:nt,P:U,A:at,C:1,L:Ft,R:Me,D:Ht,V:J,I:re,H:Z,N:De,U:qe,B:Ue,F:ze},Or=it.litHtmlPolyfillSupport;Or?.(ve,re),(it.litHtmlVersions??=[]).push("3.3.1");var Qt=(r,e,t)=>{let o=t?.renderBefore??e,s=o._$litPart$;if(s===void 0){let i=t?.renderBefore??null;o._$litPart$=s=new re(e.insertBefore(me(),i),i,void 0,t??{})}return s._$AI(r),s};var dt=globalThis,g=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Qt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};g._$litElement$=!0,g.finalized=!0,dt.litElementHydrateSupport?.({LitElement:g});var Tr=dt.litElementPolyfillSupport;Tr?.({LitElement:g});(dt.litElementVersions??=[]).push("4.2.1");var x=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};var Rr={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:Le},Nr=(r=Rr,e,t)=>{let{kind:o,metadata:s}=t,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(t.name,r),o==="accessor"){let{name:n}=t;return{set(d){let l=e.get.call(this);e.set.call(this,d),this.requestUpdate(n,l,r)},init(d){return d!==void 0&&this.C(n,void 0,r,d),d}}}if(o==="setter"){let{name:n}=t;return function(d){let l=this[n];e.call(this,d),this.requestUpdate(n,l,r)}}throw Error("Unsupported decorator location: "+o)};function h(r){return(e,t)=>typeof t=="object"?Nr(r,e,t):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(r,e,t)}function T(r){return h({...r,state:!0,attribute:!1})}var Pr=Object.defineProperty,Lr=(r,e,t)=>e in r?Pr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,pt=(r,e,t)=>(Lr(r,typeof e!="symbol"?e+"":e,t),t),Ir=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)},ut=(r,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return r.has(e)},He=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},Jt=(r,e,t)=>(Ir(r,e,"access private method"),t);function Zt(r,e){return Object.is(r,e)}var k=null,be=!1,je=1,Be=Symbol("SIGNAL");function oe(r){let e=k;return k=r,e}function Mr(){return k}function Ur(){return be}var vt={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Ke(r){if(be)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(k===null)return;k.consumerOnSignalRead(r);let e=k.nextProducerIndex++;if(se(k),e<k.producerNode.length&&k.producerNode[e]!==r&&mt(k)){let t=k.producerNode[e];Fe(t,k.producerIndexOfThis[e])}k.producerNode[e]!==r&&(k.producerNode[e]=r,k.producerIndexOfThis[e]=mt(k)?Vt(r,k,e):0),k.producerLastReadVersion[e]=r.version}function Dr(){je++}function Xt(r){if(!(!r.dirty&&r.lastCleanEpoch===je)){if(!r.producerMustRecompute(r)&&!jr(r)){r.dirty=!1,r.lastCleanEpoch=je;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=je}}function Yt(r){if(r.liveConsumerNode===void 0)return;let e=be;be=!0;try{for(let t of r.liveConsumerNode)t.dirty||zr(t)}finally{be=e}}function qr(){return k?.consumerAllowSignalWrites!==!1}function zr(r){var e;r.dirty=!0,Yt(r),(e=r.consumerMarkedDirty)==null||e.call(r.wrapper??r)}function Wr(r){return r&&(r.nextProducerIndex=0),oe(r)}function Hr(r,e){if(oe(e),!(!r||r.producerNode===void 0||r.producerIndexOfThis===void 0||r.producerLastReadVersion===void 0)){if(mt(r))for(let t=r.nextProducerIndex;t<r.producerNode.length;t++)Fe(r.producerNode[t],r.producerIndexOfThis[t]);for(;r.producerNode.length>r.nextProducerIndex;)r.producerNode.pop(),r.producerLastReadVersion.pop(),r.producerIndexOfThis.pop()}}function jr(r){se(r);for(let e=0;e<r.producerNode.length;e++){let t=r.producerNode[e],o=r.producerLastReadVersion[e];if(o!==t.version||(Xt(t),o!==t.version))return!0}return!1}function Vt(r,e,t){var o;if(bt(r),se(r),r.liveConsumerNode.length===0){(o=r.watched)==null||o.call(r.wrapper);for(let s=0;s<r.producerNode.length;s++)r.producerIndexOfThis[s]=Vt(r.producerNode[s],r,s)}return r.liveConsumerIndexOfThis.push(t),r.liveConsumerNode.push(e)-1}function Fe(r,e){var t;if(bt(r),se(r),typeof ngDevMode<"u"&&ngDevMode&&e>=r.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${r.liveConsumerNode.length} consumers)`);if(r.liveConsumerNode.length===1){(t=r.unwatched)==null||t.call(r.wrapper);for(let s=0;s<r.producerNode.length;s++)Fe(r.producerNode[s],r.producerIndexOfThis[s])}let o=r.liveConsumerNode.length-1;if(r.liveConsumerNode[e]=r.liveConsumerNode[o],r.liveConsumerIndexOfThis[e]=r.liveConsumerIndexOfThis[o],r.liveConsumerNode.length--,r.liveConsumerIndexOfThis.length--,e<r.liveConsumerNode.length){let s=r.liveConsumerIndexOfThis[e],i=r.liveConsumerNode[e];se(i),i.producerIndexOfThis[s]=e}}function mt(r){var e;return r.consumerIsAlwaysLive||(((e=r?.liveConsumerNode)==null?void 0:e.length)??0)>0}function se(r){r.producerNode??(r.producerNode=[]),r.producerIndexOfThis??(r.producerIndexOfThis=[]),r.producerLastReadVersion??(r.producerLastReadVersion=[])}function bt(r){r.liveConsumerNode??(r.liveConsumerNode=[]),r.liveConsumerIndexOfThis??(r.liveConsumerIndexOfThis=[])}function er(r){if(Xt(r),Ke(r),r.value===gt)throw r.error;return r.value}function Br(r){let e=Object.create(Kr);e.computation=r;let t=()=>er(e);return t[Be]=e,t}var ht=Symbol("UNSET"),ft=Symbol("COMPUTING"),gt=Symbol("ERRORED"),Kr={...vt,value:ht,dirty:!0,error:null,equal:Zt,producerMustRecompute(r){return r.value===ht||r.value===ft},producerRecomputeValue(r){if(r.value===ft)throw new Error("Detected cycle in computations.");let e=r.value;r.value=ft;let t=Wr(r),o,s=!1;try{o=r.computation.call(r.wrapper),s=e!==ht&&e!==gt&&r.equal.call(r.wrapper,e,o)}catch(i){o=gt,r.error=i}finally{Hr(r,t)}if(s){r.value=e;return}r.value=o,r.version++}};function Fr(){throw new Error}var Gr=Fr;function Qr(){Gr()}function Jr(r){let e=Object.create(Yr);e.value=r;let t=()=>(Ke(e),e.value);return t[Be]=e,t}function Zr(){return Ke(this),this.value}function Xr(r,e){qr()||Qr(),r.equal.call(r.wrapper,r.value,e)||(r.value=e,Vr(r))}var Yr={...vt,equal:Zt,value:void 0};function Vr(r){r.version++,Dr(),Yt(r)}var C=Symbol("node"),w;(r=>{var e,t,o,s,i,n;class d{constructor(m,p={}){He(this,t),pt(this,e);let b=Jr(m)[Be];if(this[C]=b,b.wrapper=this,p){let y=p.equals;y&&(b.equal=y),b.watched=p[r.subtle.watched],b.unwatched=p[r.subtle.unwatched]}}get(){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Zr.call(this[C])}set(m){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Ur())throw new Error("Writes to signals not permitted during Watcher callback");let p=this[C];Xr(p,m)}}e=C,t=new WeakSet,o=function(){},r.isState=u=>typeof u=="object"&&ut(t,u),r.State=d;class l{constructor(m,p){He(this,i),pt(this,s);let b=Br(m)[Be];if(b.consumerAllowSignalWrites=!0,this[C]=b,b.wrapper=this,p){let y=p.equals;y&&(b.equal=y),b.watched=p[r.subtle.watched],b.unwatched=p[r.subtle.unwatched]}}get(){if(!(0,r.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return er(this[C])}}s=C,i=new WeakSet,n=function(){},r.isComputed=u=>typeof u=="object"&&ut(i,u),r.Computed=l,(u=>{var m,p,E,b,y;function K(_){let $,v=null;try{v=oe(null),$=_()}finally{oe(v)}return $}u.untrack=K;function H(_){var $;if(!(0,r.isComputed)(_)&&!(0,r.isWatcher)(_))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(($=_[C].producerNode)==null?void 0:$.map(v=>v.wrapper))??[]}u.introspectSources=H;function et(_){var $;if(!(0,r.isComputed)(_)&&!(0,r.isState)(_))throw new TypeError("Called introspectSinks without a Signal argument");return(($=_[C].liveConsumerNode)==null?void 0:$.map(v=>v.wrapper))??[]}u.introspectSinks=et;function tt(_){if(!(0,r.isComputed)(_)&&!(0,r.isState)(_))throw new TypeError("Called hasSinks without a Signal argument");let $=_[C].liveConsumerNode;return $?$.length>0:!1}u.hasSinks=tt;function fr(_){if(!(0,r.isComputed)(_)&&!(0,r.isWatcher)(_))throw new TypeError("Called hasSources without a Computed or Watcher argument");let $=_[C].producerNode;return $?$.length>0:!1}u.hasSources=fr;class mr{constructor($){He(this,p),He(this,b),pt(this,m);let v=Object.create(vt);v.wrapper=this,v.consumerMarkedDirty=$,v.consumerIsAlwaysLive=!0,v.consumerAllowSignalWrites=!1,v.producerNode=[],this[C]=v}watch(...$){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Jt(this,b,y).call(this,$);let v=this[C];v.dirty=!1;let O=oe(v);for(let Te of $)Ke(Te[C]);oe(O)}unwatch(...$){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Jt(this,b,y).call(this,$);let v=this[C];se(v);for(let O=v.producerNode.length-1;O>=0;O--)if($.includes(v.producerNode[O].wrapper)){Fe(v.producerNode[O],v.producerIndexOfThis[O]);let Te=v.producerNode.length-1;if(v.producerNode[O]=v.producerNode[Te],v.producerIndexOfThis[O]=v.producerIndexOfThis[Te],v.producerNode.length--,v.producerIndexOfThis.length--,v.nextProducerIndex--,O<v.producerNode.length){let vr=v.producerIndexOfThis[O],Tt=v.producerNode[O];bt(Tt),Tt.liveConsumerIndexOfThis[vr]=O}}}getPending(){if(!(0,r.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[C].producerNode.filter(v=>v.dirty).map(v=>v.wrapper)}}m=C,p=new WeakSet,E=function(){},b=new WeakSet,y=function(_){for(let $ of _)if(!(0,r.isComputed)($)&&!(0,r.isState)($))throw new TypeError("Called watch/unwatch without a Computed or State argument")},r.isWatcher=_=>ut(p,_),u.Watcher=mr;function gr(){var _;return(_=Mr())==null?void 0:_.wrapper}u.currentComputed=gr,u.watched=Symbol("watched"),u.unwatched=Symbol("unwatched")})(r.subtle||(r.subtle={}))})(w||(w={}));var xt=!1,tr=new w.subtle.Watcher(()=>{xt||(xt=!0,queueMicrotask(()=>{xt=!1;for(let r of tr.getPending())r.get();tr.watch()}))}),eo=Symbol("SignalWatcherBrand"),to=new FinalizationRegistry(r=>{r.unwatch(...w.subtle.introspectSources(r))}),rr=new WeakMap;function xe(r){return r[eo]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),r):class extends r{constructor(){super(...arguments),this._$St=new Map,this._$So=new w.State(0),this._$Si=!1}_$Sl(){var e,t;let o=[],s=[];this._$St.forEach((n,d)=>{(n?.beforeUpdate?o:s).push(d)});let i=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));o.forEach(n=>n.get()),(t=this._$Su)===null||t===void 0||t.get(),i.forEach(n=>n.get()),s.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new w.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new w.subtle.Watcher(function(){let t=rr.get(this);t!==void 0&&(t._$Si===!1&&(new Set(this.getPending()).has(t._$Su)?t.requestUpdate():t._$Sv()),this.watch())});rr.set(e,this),to.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([t])=>t))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...w.subtle.introspectSources(this.h).filter(t=>{var o;let s=((o=this._$St.get(t))===null||o===void 0?void 0:o.manualDispose)!==!0;return s&&this._$St.delete(t),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,t){var o;this._$S_();let s=new w.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,t),(o=t?.beforeUpdate)!==null&&o!==void 0&&o?w.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>w.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var Ge={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ye=r=>(...e)=>({_$litDirective$:r,values:e}),ie=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:fs}=Gt;var or=r=>r.strings===void 0;var $e=(r,e)=>{let t=r._$AN;if(t===void 0)return!1;for(let o of t)o._$AO?.(e,!1),$e(o,e);return!0},Qe=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while(t?.size===0)},sr=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),so(e)}};function ro(r){this._$AN!==void 0?(Qe(this),this._$AM=r,sr(this)):this._$AM=r}function oo(r,e=!1,t=0){let o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let i=t;i<o.length;i++)$e(o[i],!1),Qe(o[i]);else o!=null&&($e(o,!1),Qe(o));else $e(this,r)}var so=r=>{r.type==Ge.CHILD&&(r._$AP??=oo,r._$AQ??=ro)},Je=class extends ie{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,o){super._$AT(e,t,o),sr(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&($e(this,e),Qe(this))}setValue(e){if(or(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};var yt=!1,$t=new w.subtle.Watcher(async()=>{yt||(yt=!0,queueMicrotask(()=>{yt=!1;for(let r of $t.getPending())r.get();$t.watch()}))}),Ze=class extends Je{_$S_(){var e,t;this._$Sm===void 0&&(this._$Sj=new w.Computed(()=>{var o;let s=(o=this._$SW)===null||o===void 0?void 0:o.get();return this.setValue(s),s}),this._$Sm=(t=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&t!==void 0?t:$t,this._$Sm.watch(this._$Sj),w.subtle.untrack(()=>{var o;return(o=this._$Sj)===null||o===void 0?void 0:o.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return w.subtle.untrack(()=>e.get())}update(e,[t]){var o,s;return(o=this._$Sk)!==null&&o!==void 0||(this._$Sk=(s=e.options)===null||s===void 0?void 0:s.host),t!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=t,this._$S_(),w.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},wt=ye(Ze);var _t=r=>(e,...t)=>r(e,...t.map(o=>o instanceof w.State||o instanceof w.Computed?wt(o):o)),io=_t(c),no=_t(Bt);var Ps=w.State,Ls=w.Computed,P=(r,e)=>new w.State(r,e),ne=(r,e)=>new w.Computed(r,e);var ao=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function ir(r,e=""){for(let{pattern:t,name:o}of ao){let s=t.exec(r);if(s)return{name:o,path:s[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var q=P(ir(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{q.set(ir(window.location.pathname,window.location.search))});var js=f`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,L=f`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Bs=f`
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
`,Ks=f`
  .hidden {
    display: none !important;
  }
`;var lo=new Set(["file","-file","path","-path","repo","-repo","tags","-tags","case","lit","max_matches"]);function Et(r){let e={},t="",o="",s="",i=r.trim(),n=/\[|\(|(?:^([a-zA-Z0-9\-_]+):|\\.)| /,d=!0;for(;i.length>0;){let u=n.exec(i);if(u===null){s+=i;break}s+=i.slice(0,u.index);let m=u[0];if(i=i.slice(u.index+m.length),d=d&&u.index===0,m===" ")o===""?s+=" ":(St(e,o,s),o="",s="");else if(m==="("||m==="["){let p=m==="("?")":"]",E=1,b=0,y=!1,K="";for(;b<i.length&&E>0;){let H=i[b];b++,y?y=!1:H==="\\"?y=!0:H===m?E++:H===p&&E--,K+=H}s+=m+K,i=i.slice(b)}else if(m.startsWith("\\"))s+=m;else{let p=u[1];o===""&&p&&lo.has(p)?(s.trim()!==""&&St(e,o,s),s="",o=p):s+=m}d=m===" "}St(e,o,s);let l=e[""]||[];return delete e[""],t=l.join(" ").trim(),{line:t,operators:e}}function St(r,e,t){r[e]||(r[e]=[]),r[e].push(t)}function cr(r,e={},t={}){let o=new URLSearchParams;r.trim()&&o.set("q",r.trim()),e.literal&&o.set("literal","true"),e.caseSensitive&&o.set("fold_case","false");for(let[s,i]of Object.entries(t))for(let n of i)o.append(s,n);return o}async function dr(r,e,t){let o="/api/search?"+r.toString(),s=await fetch(o,{signal:t});if(!s.ok){let i=await s.text();throw new Error(`search failed (${s.status}): ${i}`)}if(!s.body)throw new Error("response has no body");await co(s.body,i=>{switch(i.type){case"result":e.onResult?.(i);break;case"file":e.onFile?.(i);break;case"facets":e.onFacets?.(i);break;case"done":e.onDone?.(i);break}})}async function co(r,e){let t=r.getReader(),o=new TextDecoder,s="";try{for(;;){let{done:n,value:d}=await t.read();if(n)break;s+=o.decode(d,{stream:!0});let l;for(;(l=s.indexOf(`
`))!==-1;){let u=s.slice(0,l).trim();s=s.slice(l+1),u.length!==0&&e(JSON.parse(u))}}s+=o.decode();let i=s.trim();i.length>0&&e(JSON.parse(i))}finally{t.releaseLock()}}function Xe(r){let e=r.indexOf("/+/");if(e===-1)return{repo:r,version:"",filePath:""};let t=r.slice(0,e),o=r.slice(e+3),s=t.indexOf("/");return s===-1?{repo:t,version:"",filePath:o}:{repo:t.slice(0,s),version:t.slice(s+1),filePath:o}}var ce=ne(()=>q.get().params.get("q")??""),ti=ne(()=>{let r=q.get().params;return{literal:r.get("literal")==="true",caseSensitive:r.get("fold_case")==="false"}}),pr=ne(()=>{let r=q.get().params.get("context");if(r!==null){let e=parseInt(r,10);if(!isNaN(e)&&e>=0)return e}return 3}),ri=ne(()=>Et(ce.get())),_e=P([]),Ve=P([]),Se=P(null),Ee=P(null),X=P(!1),le=P(null),Ct=P(!1),ur=ne(()=>{let r=Ve.get();return Ct.get()||r.length<=10?r:r.slice(0,10)}),kt=null;async function hr(){kt&&kt.abort();let r=new AbortController;kt=r;let e=ce.get();if(!e){_e.set([]),Ve.set([]),Se.set(null),Ee.set(null),X.set(!1),le.set(null),Ct.set(!1);return}let t=q.get(),o=new URLSearchParams(t.params),s=Et(e);Ct.set(s.line===""),X.set(!0),le.set(null),_e.set([]),Ve.set([]),Se.set(null),Ee.set(null);let i=[],n=[],d=null;try{await dr(o,{onResult(l){i.push(l)},onFile(l){n.push(l)},onFacets(l){d=l},onDone(l){_e.set(i),Ve.set(n),Se.set(d),Ee.set(l),X.set(!1)},onError(l){r.signal.aborted||(le.set(l.message),X.set(!1))}},r.signal)}catch(l){r.signal.aborted||(le.set(l instanceof Error?l.message:String(l)),X.set(!1))}}var Ye=null,we="";function At(r,e={},t={}){Ye&&clearTimeout(Ye);let o=cr(r,e,t),s=r!==we,i=r?`${r} \xB7 code search`:"code search";document.title=i;let n=o.toString(),d="/search"+(n?"?"+n:"");s&&we!==""?(history.pushState(null,i,d),we=r):(history.replaceState(null,i,d),we===""&&(we=r)),q.set({name:"search",params:o}),Ye=setTimeout(()=>{Ye=null,hr()},100)}{let r=ce.get();r&&(document.title=`${r} \xB7 code search`,hr())}var j=class extends g{constructor(){super(...arguments);this.value="";this.debounce=100;this.error="";this.timer=null}render(){return c`
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
    `}onInput(){this.timer&&clearTimeout(this.timer);let t=this.renderRoot.querySelector("#searchbox");this.timer=setTimeout(()=>{this.timer=null,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:t.value},bubbles:!0,composed:!0}))},this.debounce)}onKeydown(t){if(t.key==="Enter"){this.timer&&clearTimeout(this.timer),this.timer=null;let o=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0}))}}appendQuery(t){let o=this.renderRoot.querySelector("#searchbox");o&&(o.value+=t,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};j.styles=[lr,f`
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
    `],a([h()],j.prototype,"value",2),a([h({type:Number})],j.prototype,"debounce",2),a([h()],j.prototype,"error",2),j=a([x("cs-search-input")],j);var Y=class extends g{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let t=this.options.caseSensitive?"false":"auto";return c`
      <div class="search-options">
        <div class="search-option">
          <span class="label">Case:</span>
          <input
            type="radio"
            name="fold_case"
            value="false"
            id="case-match"
            tabindex="3"
            .checked=${t==="false"}
            @change=${()=>this.setCase("false")}
          />
          <label for="case-match">match</label>
          <input
            type="radio"
            name="fold_case"
            value="auto"
            id="case-auto"
            tabindex="4"
            .checked=${t==="auto"}
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
            .checked=${t==="true"}
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
    `}renderRepoOptions(){return this.repos.length?this.repos.map(t=>c`
      <optgroup label=${t.label}>
        ${t.repos.map(o=>{let s=o.split("/").pop()??o;return c`<option value=${o} data-tokens=${o}>${s}</option>`})}
      </optgroup>
    `):""}setCase(t){let o=t==="false";this.options={...this.options,caseSensitive:o},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};Y.styles=[ar,ae,f`
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
    `],a([h({type:Object})],Y.prototype,"options",2),a([h({type:Array})],Y.prototype,"repos",2),Y=a([x("cs-search-options")],Y);var Ot=ye(class extends ie{constructor(r){if(super(r),r.type!==Ge.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((e=>r[e])).join(" ")+" "}update(r,[e]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let t=r.element.classList;for(let o of this.st)o in e||(t.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return D}});var B=class extends g{render(){return this.start!=null&&this.end!=null?c`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:c`${this.text}`}};B.styles=f`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,a([h()],B.prototype,"text",2),a([h({type:Number})],B.prototype,"start",2),a([h({type:Number})],B.prototype,"end",2),B=a([x("match-str")],B);var N=class extends g{render(){return c`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};N.styles=f`
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
    `,a([h()],N.prototype,"text",2),a([h()],N.prototype,"href",2),a([h({type:Number})],N.prototype,"start",2),a([h({type:Number})],N.prototype,"end",2),a([h()],N.prototype,"repo",2),a([h()],N.prototype,"version",2),N=a([x("filename-match")],N);var I=class extends g{render(){let e=this.start!=null&&this.end!=null;return c`<a class=${Ot({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Ot({matchline:e})}
                >${e?c`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};I.styles=f`
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
    `,a([h({type:Number})],I.prototype,"lineNo",2),a([h()],I.prototype,"text",2),a([h()],I.prototype,"href",2),a([h({type:Number})],I.prototype,"start",2),a([h({type:Number})],I.prototype,"end",2),I=a([x("match-line")],I);function po(r){let e=r.lastIndexOf("/");return e<0?".":r.slice(0,e)}function uo(r){let e=r.lastIndexOf("/");return e<0?r:r.slice(e+1)}var V=class extends g{constructor(){super(...arguments);this.noContext=!1}render(){let{repo:t,version:o,filePath:s}=Xe(this.result.path),i=`/view/${this.result.path}`,n=this.splitGroups(this.result.lines),d=o.length>6?o.slice(0,6):o,l=po(s),u=uo(s);return c`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${i}>
              <span class="repo">${t}:</span><span class="version">${d}:</span>${l}/<span class="filename">${u}</span>
            </a>
          </span>
        </div>
        ${n.map(m=>c`
            <div class="match">
              <div class="contents">
                ${m.map(p=>{let E=p[0],b=p[1],y=p.length>2?p[2]:void 0,K=y!==void 0&&y.length>0,H=`${i}#L${E}`,et=K&&y?y[0][0]:void 0,tt=K&&y?y[0][1]:void 0;return c`
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
    `}splitGroups(t){let o=[],s=[];for(let i of t)i===null?s.length>0&&(o.push(s),s=[]):s.push(i);return s.length>0&&o.push(s),o}};V.styles=[nr,L,f`
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
    `],a([h({type:Object})],V.prototype,"result",2),a([h({type:Boolean,reflect:!0,attribute:"no-context"})],V.prototype,"noContext",2),V=a([x("cs-result-group")],V);var z=class extends g{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return c`<div id="countarea">Searching...</div>`;let t=this.truncated?`${this.total}+`:`${this.total}`;return c`
      <div id="countarea">
        <span id="numresults">${t}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};z.styles=[ae,f`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],a([h({type:Number})],z.prototype,"total",2),a([h({type:Number})],z.prototype,"timeMs",2),a([h({type:Boolean})],z.prototype,"truncated",2),a([h({type:Boolean})],z.prototype,"loading",2),z=a([x("cs-result-stats")],z);var ee=class extends g{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){if(!this.facets)return S;let t=[{label:"Extension",key:"f.ext",buckets:this.facets.ext},{label:"Repository",key:"f.repo",buckets:this.facets.repo},{label:"Path",key:"f.path",buckets:this.facets.path}].filter(o=>o.buckets&&o.buckets.length>0);return t.length===0?S:c`
      <div class="panel">
        ${t.map(o=>this.renderSection(o.label,o.key,o.buckets))}
      </div>
    `}renderSection(t,o,s){let i=this.selected[o]??new Set,n=[...s].sort((d,l)=>l.c-d.c||d.v.localeCompare(l.v));return c`
      <div class="section">
        <span class="section-label">${t}</span>
        ${n.slice(0,10).map(d=>c`
          <button
            class=${i.has(d.v)?"pill active":"pill"}
            @click=${()=>this.toggle(o,d.v)}
          >${d.v} <span class="count">${d.c}</span></button>
        `)}
      </div>
    `}toggle(t,o){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:t,value:o},bubbles:!0,composed:!0}))}};ee.styles=f`
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
    `}};ke.styles=[L,f`
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
    `],ke=a([x("cs-search-help")],ke);var Ce=class extends xe(g){constructor(){super(...arguments);this.currentOptions={};this.activeFacets={}}render(){let t=ce.get(),o=_e.get(),s=ur.get(),i=Ee.get(),n=X.get(),d=le.get(),l=Se.get(),u=pr.get(),m=i||n;return c`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${p=>p.preventDefault()}
        >
          <cs-search-input
            .value=${t}
            .error=${d??""}
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
                ${s.map(p=>{let{repo:E,version:b,filePath:y}=Xe(p.path);return c`
                    <filename-match
                      text=${y}
                      start=${p.match[0]}
                      end=${p.match[1]}
                      repo=${E}
                      version=${b.slice(0,6)}
                      href="/view/${p.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${o.map(p=>c`
                  <cs-result-group .result=${p} ?no-context=${u<=0}></cs-result-group>
                `)}
              </div>
            </div>
          </div>
        `:c`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(t){let{key:o,value:s}=t.detail,i=this.activeFacets[o]??new Set,n=new Set(i);n.has(s)?n.delete(s):n.add(s),this.activeFacets={...this.activeFacets,[o]:n},this.reSearch()}onSearchInput(t){At(t.detail.value,this.currentOptions,this.facetParams())}onOptionsChange(t){this.currentOptions=t.detail,this.reSearch()}reSearch(){let t=ce.get();t&&At(t,this.currentOptions,this.facetParams())}getRepos(){return window.__CS_INIT?.repos??[]}facetParams(){let t={};for(let[o,s]of Object.entries(this.activeFacets))s.size>0&&(t[o]=[...s]);return t}};Ce.styles=[L,ae,f`
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

    `],Ce=a([x("cs-search-view")],Ce);var de=class extends g{constructor(){super(...arguments);this.path=""}render(){let t=this.path.indexOf("/+/");if(t===-1)return c`<span>${this.path}</span>`;let o=this.path.slice(0,t),i=this.path.slice(t+3).split("/").filter(n=>n.length>0);return c`
      <nav class="breadcrumbs">
        <a href="/view/${o}/+/">${o}</a>
        ${i.map((n,d)=>{let l=i.slice(0,d+1).join("/"),u=`/view/${o}/+/${l}${d<i.length-1?"/":""}`;return c`<span class="sep">/</span><a href=${u}>${n}</a>`})}
      </nav>
    `}};de.styles=f`
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
  `,a([h()],de.prototype,"path",2),de=a([x("cs-breadcrumbs")],de);var te=class extends g{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let t=[...this.entries].sort((o,s)=>{let i=o.endsWith("/"),n=s.endsWith("/");return i!==n?i?-1:1:o.localeCompare(s)});return c`
      <div class="listing">
        ${t.map(o=>{let s=o.endsWith("/"),i=this.basePath+o;return c`
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
  `,a([h({type:Array})],te.prototype,"entries",2),a([h()],te.prototype,"basePath",2),te=a([x("cs-dir-listing")],te);var R=class extends g{constructor(){super(...arguments);this.content="";this.basePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onKeyDown=t=>{t.target.matches("input,textarea")||t.altKey||t.ctrlKey||t.metaKey||this.processKey(t.key)&&t.preventDefault()}}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown)}parseHash(){let o=window.location.hash.match(/^#L(\d+)(?:-L?(\d+))?$/);o?(this.selectedStart=parseInt(o[1],10),this.selectedEnd=o[2]?parseInt(o[2],10):this.selectedStart):(this.selectedStart=-1,this.selectedEnd=-1)}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!t)return;let o=window.innerHeight,s=Math.floor(o/3);if(this.selectedStart!==this.selectedEnd){let n=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(n){let d=t.getBoundingClientRect(),l=n.getBoundingClientRect(),u=l.top+l.height-d.top;u<=o?s=.5*(o-u):s=t.offsetHeight/2}}let i=t.getBoundingClientRect();window.scrollTo(0,i.top+window.scrollY-s)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){let t=this.externalUrl;if(!t)return"";let o=this.lineNumberString();return t.replace("{lno}",o)}lineNumberString(){return this.selectedStart<0?"1":this.selectedStart===this.selectedEnd?String(this.selectedStart):`${this.selectedStart}-L${this.selectedEnd}`}getSelectedText(){return window.getSelection()?.toString()||""}processKey(t){switch(t){case"Enter":{let o=this.getSelectedText();return o&&window.open(`/search?q=${encodeURIComponent(o)}`),!0}case"/":{this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));let o=this.getSelectedText();return window.location.href=`/search${o?"?q="+encodeURIComponent(o):""}`,!0}case"?":return this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0})),!0;case"Escape":return this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0})),!0;case"v":{let o=this.resolvedExternalUrl();return o&&(window.location.href=o),!0}case"n":case"p":{let o=this.getSelectedText();return o&&window.find(o,!1,t==="p"),!0}}return!1}render(){let t=this.content.split(`
`);return t.length>0&&t[t.length-1]===""&&t.pop(),c`
      <div class="viewer">
        ${t.map((o,s)=>{let i=s+1,n=i>=this.selectedStart&&i<=this.selectedEnd;return c`
            <div class="line ${n?"selected":""}" id="L${i}">
              <a class="lno" href="#L${i}" @click=${d=>this.onLineClick(d,i)}>${i}</a>
              <span class="code">${o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(t,o){if(t.shiftKey&&this.selectedStart>0){t.preventDefault();let s=Math.min(this.selectedStart,o),i=Math.max(this.selectedStart,o);this.selectedStart=s,this.selectedEnd=i,history.replaceState(null,"",`#L${s}-L${i}`)}else this.selectedStart=o,this.selectedEnd=o}};R.styles=f`
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
  `,a([h()],R.prototype,"content",2),a([h()],R.prototype,"basePath",2),a([h()],R.prototype,"repo",2),a([h()],R.prototype,"version",2),a([h()],R.prototype,"externalUrl",2),a([T()],R.prototype,"selectedStart",2),a([T()],R.prototype,"selectedEnd",2),R=a([x("cs-code-viewer")],R);function ho(r){let e=r.indexOf("/+/");if(e===-1)return null;let t=r.slice(0,e),o=r.slice(e+3),s=t.lastIndexOf("@");return s===-1?null:{repo:t.slice(0,s),version:t.slice(s+1),filePath:o}}function fo(r,e,t){let o="github.com/";return r.startsWith(o)?`https://github.com/${r.slice(o.length)}/blob/${e}/${t}#L{lno}`:""}var A=class extends g{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null}willUpdate(t){t.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let t=this.path.endsWith("/")||this.path.endsWith("/+/")||!this.path.includes("/+/"),o=`/raw/${this.path}${t&&!this.path.endsWith("/")?"/":""}`;try{let s=await fetch(o);if(!s.ok){this.error=`Not found (${s.status})`,this.loading=!1;return}(s.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await s.json(),this.fetchReadme(o)):this.content=await s.text()}catch(s){this.error=s instanceof Error?s.message:String(s)}this.loading=!1}async fetchReadme(t){if(!this.dirEntries)return;let o=this.dirEntries.find(s=>A.README_RE.test(s));if(o)try{let s=t.endsWith("/")?t:t+"/",i=await fetch(s+o);i.ok&&(this.readmeContent=await i.text())}catch{}}render(){let t=ho(this.path),o=t?.repo??"",s=t?.version??"",i=t?fo(t.repo,t.version,t.filePath):"";return c`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading?c`<div class="status">Loading...</div>`:""}
        ${this.error?c`<div class="status error">${this.error}</div>`:""}

        ${this.dirEntries?c`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith("/")?"":"/"}"
          ></cs-dir-listing>
          ${this.readmeContent?c`
            <div class="readme">
              <pre>${this.readmeContent}</pre>
            </div>
          `:""}
        `:""}

        ${this.content!==null?c`
          <cs-code-viewer
            .content=${this.content}
            .repo=${o}
            .version=${s}
            .externalUrl=${i}
          ></cs-code-viewer>
        `:""}
      </div>
    `}};A.README_RE=/^readme\.(md|markdown|mdown|mkdn|txt|rst|org|adoc|asc)$/i,A.styles=f`
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
  `,a([h()],A.prototype,"path",2),a([T()],A.prototype,"content",2),a([T()],A.prototype,"dirEntries",2),a([T()],A.prototype,"readmeContent",2),a([T()],A.prototype,"loading",2),a([T()],A.prototype,"error",2),A=a([x("cs-file-view")],A);var Ae=class extends g{render(){return c`
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
    `}};Ae.styles=[L,f`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Ae=a([x("cs-about-view")],Ae);var W=class extends g{constructor(){super(...arguments);this._open=!1;this._search="";this._options=[];this._select=null;this._onOutsideClick=t=>{this._open&&(this.contains(t.target)||(this._open=!1))};this._onFocusOut=t=>{this._open&&!this.contains(t.relatedTarget)&&(this._open=!1)}}connectedCallback(){super.connectedCallback(),this._select=this.querySelector("select"),this._select&&this._readOptions(),document.addEventListener("click",this._onOutsideClick),this.addEventListener("focusout",this._onFocusOut)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick),this.removeEventListener("focusout",this._onFocusOut)}_readOptions(){let t=[];for(let o of this._select.children)if(o instanceof HTMLOptGroupElement)for(let s of o.querySelectorAll("option"))t.push({value:s.value,label:s.textContent?.trim()||s.value,group:o.label,selected:s.selected});else o instanceof HTMLOptionElement&&t.push({value:o.value,label:o.textContent?.trim()||o.value,group:"",selected:o.selected});this._options=t}get _buttonText(){let t=this._options.filter(o=>o.selected);return t.length===0?"(all repositories)":t.length<=4?t.map(o=>o.label).join(", "):`(${t.length} repositories)`}get _filteredGroups(){let t=this._search.toLowerCase(),o=new Map;for(let s of this._options)t&&!s.value.toLowerCase().includes(t)&&!s.label.toLowerCase().includes(t)||(o.has(s.group)||o.set(s.group,[]),o.get(s.group).push(s));return[...o.entries()].map(([s,i])=>({label:s,options:i}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(t){this._options=this._options.map(o=>o.value===t?{...o,selected:!o.selected}:o),this._syncToSelect()}_selectAll(){this._options=this._options.map(t=>({...t,selected:!0})),this._syncToSelect()}_deselectAll(){this._options=this._options.map(t=>({...t,selected:!1})),this._syncToSelect()}_toggleGroup(t){let s=this._options.filter(i=>i.group===t).every(i=>i.selected);this._options=this._options.map(i=>i.group===t?{...i,selected:!s}:i),this._syncToSelect()}_syncToSelect(){if(this._select){for(let t of this._select.options){let o=this._options.find(s=>s.value===t.value);o&&(t.selected=o.selected)}this._select.dispatchEvent(new Event("change",{bubbles:!0}))}}_onSearchInput(t){this._search=t.target.value}_onSearchKeydown(t){t.key==="Enter"&&(t.preventDefault(),this._search=""),t.key==="Escape"&&(this._open=!1)}render(){return c`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():S}
            <slot></slot>
        `}_renderDropdown(){let t=this._filteredGroups;return c`
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
                <div class="options">${t.map(o=>this._renderGroup(o))}</div>
            </div>
        `}_renderGroup(t){return t.label?c`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(t.label)}>${t.label}</div>
                ${t.options.map(o=>this._renderOption(o))}
            </div>
        `:t.options.map(o=>this._renderOption(o))}_renderOption(t){return c`
            <label class="option ${t.selected?"selected":""}">
                <input type="checkbox" .checked=${t.selected} @change=${()=>this._toggleOption(t.value)} />
                ${t.label}
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
    `,a([T()],W.prototype,"_open",2),a([T()],W.prototype,"_search",2),a([T()],W.prototype,"_options",2),W=a([x("repo-select")],W);var Oe=class extends xe(g){render(){let e=q.get();return c`
      <main>${this.renderView(e)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(e){switch(e.name){case"search":return c`<cs-search-view></cs-search-view>`;case"view":return c`<cs-file-view .path=${e.path??""}></cs-file-view>`;case"about":return c`<cs-about-view></cs-about-view>`;default:return c`<div class="placeholder">Not found</div>`}}};Oe.styles=[L,f`
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
