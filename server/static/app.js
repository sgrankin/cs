var br=Object.defineProperty;var xr=Object.getOwnPropertyDescriptor;var a=(r,e,t,o)=>{for(var s=o>1?void 0:o?xr(e,t):e,n=r.length-1,i;n>=0;n--)(i=r[n])&&(s=(o?i(e,t,s):i(s))||s);return o&&s&&br(e,t,s),s};var Pe=globalThis,Ne=Pe.ShadowRoot&&(Pe.ShadyCSS===void 0||Pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),Pt=new WeakMap,me=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Ne&&e===void 0){let o=t!==void 0&&t.length===1;o&&(e=Pt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Pt.set(t,e))}return e}toString(){return this.cssText}},Nt=r=>new me(typeof r=="string"?r:r+"",void 0,at),m=(r,...e)=>{let t=r.length===1?r[0]:e.reduce(((o,s,n)=>o+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1]),r[0]);return new me(t,r,at)},Lt=(r,e)=>{if(Ne)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(let t of e){let o=document.createElement("style"),s=Pe.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=t.cssText,r.appendChild(o)}},lt=Ne?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let o of e.cssRules)t+=o.cssText;return Nt(t)})(r):r;var{is:yr,defineProperty:$r,getOwnPropertyDescriptor:wr,getOwnPropertyNames:_r,getOwnPropertySymbols:Sr,getPrototypeOf:Er}=Object,Le=globalThis,Ut=Le.trustedTypes,kr=Ut?Ut.emptyScript:"",Cr=Le.reactiveElementPolyfillSupport,ge=(r,e)=>r,ve={toAttribute(r,e){switch(e){case Boolean:r=r?kr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Ue=(r,e)=>!yr(r,e),It={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:Ue};Symbol.metadata??=Symbol("metadata"),Le.litPropertyMetadata??=new WeakMap;var M=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=It){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,t);s!==void 0&&$r(this.prototype,e,s)}}static getPropertyDescriptor(e,t,o){let{get:s,set:n}=wr(this.prototype,e)??{get(){return this[t]},set(i){this[t]=i}};return{get:s,set(i){let l=s?.call(this);n?.call(this,i),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??It}static _$Ei(){if(this.hasOwnProperty(ge("elementProperties")))return;let e=Er(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ge("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ge("properties"))){let t=this.properties,o=[..._r(t),...Sr(t)];for(let s of o)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[o,s]of t)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let s=this._$Eu(t,o);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)t.unshift(lt(s))}else e!==void 0&&t.push(lt(e));return t}static _$Eu(e,t){let o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let n=(o.converter?.toAttribute!==void 0?o.converter:ve).toAttribute(t,o.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let n=o.getPropertyOptions(s),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ve;this._$Em=s;let l=i.fromAttribute(t,n.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){let s=this.constructor,n=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??Ue)(n,t)||o.useDefault&&o.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:s,wrapped:n},i){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,i??t??this[e]),n!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,n]of o){let{wrapped:i}=n,l=this[s];i!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,n,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[ge("elementProperties")]=new Map,M[ge("finalized")]=new Map,Cr?.({ReactiveElement:M}),(Le.reactiveElementVersions??=[]).push("2.1.1");var dt=globalThis,Ie=dt.trustedTypes,Mt=Ie?Ie.createPolicy("lit-html",{createHTML:r=>r}):void 0,pt="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,ht="?"+D,Ar=`<${ht}>`,F=document,xe=()=>F.createComment(""),ye=r=>r===null||typeof r!="object"&&typeof r!="function",ut=Array.isArray,jt=r=>ut(r)||typeof r?.[Symbol.iterator]=="function",ct=`[ 	
\f\r]`,be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,zt=/>/g,B=RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qt=/'/g,Ht=/"/g,Bt=/^(?:script|style|textarea|title)$/i,ft=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),c=ft(1),Kt=ft(2),So=ft(3),z=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Wt=new WeakMap,K=F.createTreeWalker(F,129);function Ft(r,e){if(!ut(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(e):e}var Gt=(r,e)=>{let t=r.length-1,o=[],s,n=e===2?"<svg>":e===3?"<math>":"",i=be;for(let l=0;l<t;l++){let d=r[l],h,f,p=-1,k=0;for(;k<d.length&&(i.lastIndex=k,f=i.exec(d),f!==null);)k=i.lastIndex,i===be?f[1]==="!--"?i=Dt:f[1]!==void 0?i=zt:f[2]!==void 0?(Bt.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=B):f[3]!==void 0&&(i=B):i===B?f[0]===">"?(i=s??be,p=-1):f[1]===void 0?p=-2:(p=i.lastIndex-f[2].length,h=f[1],i=f[3]===void 0?B:f[3]==='"'?Ht:qt):i===Ht||i===qt?i=B:i===Dt||i===zt?i=be:(i=B,s=void 0);let x=i===B&&r[l+1].startsWith("/>")?" ":"";n+=i===be?d+Ar:p>=0?(o.push(h),d.slice(0,p)+pt+d.slice(p)+D+x):d+D+(p===-2?l:x)}return[Ft(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},$e=class r{constructor({strings:e,_$litType$:t},o){let s;this.parts=[];let n=0,i=0,l=e.length-1,d=this.parts,[h,f]=Gt(e,t);if(this.el=r.createElement(h,o),K.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=K.nextNode())!==null&&d.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(pt)){let k=f[i++],x=s.getAttribute(p).split(D),S=/([.?@])?(.*)/.exec(k);d.push({type:1,index:n,name:S[2],strings:x,ctor:S[1]==="."?De:S[1]==="?"?ze:S[1]==="@"?qe:J}),s.removeAttribute(p)}else p.startsWith(D)&&(d.push({type:6,index:n}),s.removeAttribute(p));if(Bt.test(s.tagName)){let p=s.textContent.split(D),k=p.length-1;if(k>0){s.textContent=Ie?Ie.emptyScript:"";for(let x=0;x<k;x++)s.append(p[x],xe()),K.nextNode(),d.push({type:2,index:++n});s.append(p[k],xe())}}}else if(s.nodeType===8)if(s.data===ht)d.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(D,p+1))!==-1;)d.push({type:7,index:n}),p+=D.length-1}n++}}static createElement(e,t){let o=F.createElement("template");return o.innerHTML=e,o}};function G(r,e,t=r,o){if(e===z)return e;let s=o!==void 0?t._$Co?.[o]:t._$Cl,n=ye(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,t,o)),o!==void 0?(t._$Co??=[])[o]=s:t._$Cl=s),s!==void 0&&(e=G(r,s._$AS(r,e.values),s,o)),e}var Me=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:o}=this._$AD,s=(e?.creationScope??F).importNode(t,!0);K.currentNode=s;let n=K.nextNode(),i=0,l=0,d=o[0];for(;d!==void 0;){if(i===d.index){let h;d.type===2?h=new re(n,n.nextSibling,this,e):d.type===1?h=new d.ctor(n,d.name,d.strings,this,e):d.type===6&&(h=new He(n,this,e)),this._$AV.push(h),d=o[++l]}i!==d?.index&&(n=K.nextNode(),i++)}return K.currentNode=F,s}p(e){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},re=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,s){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),ye(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==z&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):jt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&ye(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=$e.createElement(Ft(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(t);else{let n=new Me(s,this),i=n.u(this.options);n.p(t),this.T(i),this._$AH=n}}_$AC(e){let t=Wt.get(e.strings);return t===void 0&&Wt.set(e.strings,t=new $e(e)),t}k(e){ut(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,s=0;for(let n of e)s===t.length?t.push(o=new r(this.O(xe()),this.O(xe()),this,this.options)):o=t[s],o._$AI(n),s++;s<t.length&&(this._$AR(o&&o._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,s,n){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=_}_$AI(e,t=this,o,s){let n=this.strings,i=!1;if(n===void 0)e=G(this,e,t,0),i=!ye(e)||e!==this._$AH&&e!==z,i&&(this._$AH=e);else{let l=e,d,h;for(e=n[0],d=0;d<n.length-1;d++)h=G(this,l[o+d],t,d),h===z&&(h=this._$AH[d]),i||=!ye(h)||h!==this._$AH[d],h===_?e=_:e!==_&&(e+=(h??"")+n[d+1]),this._$AH[d]=h}i&&!s&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},De=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}},ze=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}},qe=class extends J{constructor(e,t,o,s,n){super(e,t,o,s,n),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??_)===z)return;let o=this._$AH,s=e===_&&o!==_||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==_&&(o===_||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},He=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}},Jt={M:pt,P:D,A:ht,C:1,L:Gt,R:Me,D:jt,V:G,I:re,H:J,N:ze,U:qe,B:De,F:He},Rr=dt.litHtmlPolyfillSupport;Rr?.($e,re),(dt.litHtmlVersions??=[]).push("3.3.1");var Qt=(r,e,t)=>{let o=t?.renderBefore??e,s=o._$litPart$;if(s===void 0){let n=t?.renderBefore??null;o._$litPart$=s=new re(e.insertBefore(xe(),n),n,void 0,t??{})}return s._$AI(r),s};var mt=globalThis,g=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Qt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};g._$litElement$=!0,g.finalized=!0,mt.litElementHydrateSupport?.({LitElement:g});var Tr=mt.litElementPolyfillSupport;Tr?.({LitElement:g});(mt.litElementVersions??=[]).push("4.2.1");var b=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};var Or={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:Ue},Pr=(r=Or,e,t)=>{let{kind:o,metadata:s}=t,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(t.name,r),o==="accessor"){let{name:i}=t;return{set(l){let d=e.get.call(this);e.set.call(this,l),this.requestUpdate(i,d,r)},init(l){return l!==void 0&&this.C(i,void 0,r,l),l}}}if(o==="setter"){let{name:i}=t;return function(l){let d=this[i];e.call(this,l),this.requestUpdate(i,d,r)}}throw Error("Unsupported decorator location: "+o)};function u(r){return(e,t)=>typeof t=="object"?Pr(r,e,t):((o,s,n)=>{let i=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),i?Object.getOwnPropertyDescriptor(s,n):void 0})(r,e,t)}function A(r){return u({...r,state:!0,attribute:!1})}var Nr=Object.defineProperty,Lr=(r,e,t)=>e in r?Nr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,gt=(r,e,t)=>(Lr(r,typeof e!="symbol"?e+"":e,t),t),Ur=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)},vt=(r,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return r.has(e)},je=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},Zt=(r,e,t)=>(Ur(r,e,"access private method"),t);function Xt(r,e){return Object.is(r,e)}var E=null,we=!1,Be=1,Ke=Symbol("SIGNAL");function oe(r){let e=E;return E=r,e}function Ir(){return E}function Mr(){return we}var wt={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Fe(r){if(we)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(E===null)return;E.consumerOnSignalRead(r);let e=E.nextProducerIndex++;if(se(E),e<E.producerNode.length&&E.producerNode[e]!==r&&yt(E)){let t=E.producerNode[e];Ge(t,E.producerIndexOfThis[e])}E.producerNode[e]!==r&&(E.producerNode[e]=r,E.producerIndexOfThis[e]=yt(E)?er(r,E,e):0),E.producerLastReadVersion[e]=r.version}function Dr(){Be++}function Yt(r){if(!(!r.dirty&&r.lastCleanEpoch===Be)){if(!r.producerMustRecompute(r)&&!jr(r)){r.dirty=!1,r.lastCleanEpoch=Be;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=Be}}function Vt(r){if(r.liveConsumerNode===void 0)return;let e=we;we=!0;try{for(let t of r.liveConsumerNode)t.dirty||qr(t)}finally{we=e}}function zr(){return E?.consumerAllowSignalWrites!==!1}function qr(r){var e;r.dirty=!0,Vt(r),(e=r.consumerMarkedDirty)==null||e.call(r.wrapper??r)}function Hr(r){return r&&(r.nextProducerIndex=0),oe(r)}function Wr(r,e){if(oe(e),!(!r||r.producerNode===void 0||r.producerIndexOfThis===void 0||r.producerLastReadVersion===void 0)){if(yt(r))for(let t=r.nextProducerIndex;t<r.producerNode.length;t++)Ge(r.producerNode[t],r.producerIndexOfThis[t]);for(;r.producerNode.length>r.nextProducerIndex;)r.producerNode.pop(),r.producerLastReadVersion.pop(),r.producerIndexOfThis.pop()}}function jr(r){se(r);for(let e=0;e<r.producerNode.length;e++){let t=r.producerNode[e],o=r.producerLastReadVersion[e];if(o!==t.version||(Yt(t),o!==t.version))return!0}return!1}function er(r,e,t){var o;if(_t(r),se(r),r.liveConsumerNode.length===0){(o=r.watched)==null||o.call(r.wrapper);for(let s=0;s<r.producerNode.length;s++)r.producerIndexOfThis[s]=er(r.producerNode[s],r,s)}return r.liveConsumerIndexOfThis.push(t),r.liveConsumerNode.push(e)-1}function Ge(r,e){var t;if(_t(r),se(r),typeof ngDevMode<"u"&&ngDevMode&&e>=r.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${r.liveConsumerNode.length} consumers)`);if(r.liveConsumerNode.length===1){(t=r.unwatched)==null||t.call(r.wrapper);for(let s=0;s<r.producerNode.length;s++)Ge(r.producerNode[s],r.producerIndexOfThis[s])}let o=r.liveConsumerNode.length-1;if(r.liveConsumerNode[e]=r.liveConsumerNode[o],r.liveConsumerIndexOfThis[e]=r.liveConsumerIndexOfThis[o],r.liveConsumerNode.length--,r.liveConsumerIndexOfThis.length--,e<r.liveConsumerNode.length){let s=r.liveConsumerIndexOfThis[e],n=r.liveConsumerNode[e];se(n),n.producerIndexOfThis[s]=e}}function yt(r){var e;return r.consumerIsAlwaysLive||(((e=r?.liveConsumerNode)==null?void 0:e.length)??0)>0}function se(r){r.producerNode??(r.producerNode=[]),r.producerIndexOfThis??(r.producerIndexOfThis=[]),r.producerLastReadVersion??(r.producerLastReadVersion=[])}function _t(r){r.liveConsumerNode??(r.liveConsumerNode=[]),r.liveConsumerIndexOfThis??(r.liveConsumerIndexOfThis=[])}function tr(r){if(Yt(r),Fe(r),r.value===$t)throw r.error;return r.value}function Br(r){let e=Object.create(Kr);e.computation=r;let t=()=>tr(e);return t[Ke]=e,t}var bt=Symbol("UNSET"),xt=Symbol("COMPUTING"),$t=Symbol("ERRORED"),Kr={...wt,value:bt,dirty:!0,error:null,equal:Xt,producerMustRecompute(r){return r.value===bt||r.value===xt},producerRecomputeValue(r){if(r.value===xt)throw new Error("Detected cycle in computations.");let e=r.value;r.value=xt;let t=Hr(r),o,s=!1;try{o=r.computation.call(r.wrapper),s=e!==bt&&e!==$t&&r.equal.call(r.wrapper,e,o)}catch(n){o=$t,r.error=n}finally{Wr(r,t)}if(s){r.value=e;return}r.value=o,r.version++}};function Fr(){throw new Error}var Gr=Fr;function Jr(){Gr()}function Qr(r){let e=Object.create(Yr);e.value=r;let t=()=>(Fe(e),e.value);return t[Ke]=e,t}function Zr(){return Fe(this),this.value}function Xr(r,e){zr()||Jr(),r.equal.call(r.wrapper,r.value,e)||(r.value=e,Vr(r))}var Yr={...wt,equal:Xt,value:void 0};function Vr(r){r.version++,Dr(),Vt(r)}var C=Symbol("node"),$;(r=>{var e,t,o,s,n,i;class l{constructor(f,p={}){je(this,t),gt(this,e);let x=Qr(f)[Ke];if(this[C]=x,x.wrapper=this,p){let S=p.equals;S&&(x.equal=S),x.watched=p[r.subtle.watched],x.unwatched=p[r.subtle.unwatched]}}get(){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Zr.call(this[C])}set(f){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Mr())throw new Error("Writes to signals not permitted during Watcher callback");let p=this[C];Xr(p,f)}}e=C,t=new WeakSet,o=function(){},r.isState=h=>typeof h=="object"&&vt(t,h),r.State=l;class d{constructor(f,p){je(this,n),gt(this,s);let x=Br(f)[Ke];if(x.consumerAllowSignalWrites=!0,this[C]=x,x.wrapper=this,p){let S=p.equals;S&&(x.equal=S),x.watched=p[r.subtle.watched],x.unwatched=p[r.subtle.unwatched]}}get(){if(!(0,r.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return tr(this[C])}}s=C,n=new WeakSet,i=function(){},r.isComputed=h=>typeof h=="object"&&vt(n,h),r.Computed=d,(h=>{var f,p,k,x,S;function fe(w){let y,v=null;try{v=oe(null),y=w()}finally{oe(v)}return y}h.untrack=fe;function st(w){var y;if(!(0,r.isComputed)(w)&&!(0,r.isWatcher)(w))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((y=w[C].producerNode)==null?void 0:y.map(v=>v.wrapper))??[]}h.introspectSources=st;function nt(w){var y;if(!(0,r.isComputed)(w)&&!(0,r.isState)(w))throw new TypeError("Called introspectSinks without a Signal argument");return((y=w[C].liveConsumerNode)==null?void 0:y.map(v=>v.wrapper))??[]}h.introspectSinks=nt;function it(w){if(!(0,r.isComputed)(w)&&!(0,r.isState)(w))throw new TypeError("Called hasSinks without a Signal argument");let y=w[C].liveConsumerNode;return y?y.length>0:!1}h.hasSinks=it;function fr(w){if(!(0,r.isComputed)(w)&&!(0,r.isWatcher)(w))throw new TypeError("Called hasSources without a Computed or Watcher argument");let y=w[C].producerNode;return y?y.length>0:!1}h.hasSources=fr;class mr{constructor(y){je(this,p),je(this,x),gt(this,f);let v=Object.create(wt);v.wrapper=this,v.consumerMarkedDirty=y,v.consumerIsAlwaysLive=!0,v.consumerAllowSignalWrites=!1,v.producerNode=[],this[C]=v}watch(...y){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Zt(this,x,S).call(this,y);let v=this[C];v.dirty=!1;let O=oe(v);for(let Oe of y)Fe(Oe[C]);oe(O)}unwatch(...y){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Zt(this,x,S).call(this,y);let v=this[C];se(v);for(let O=v.producerNode.length-1;O>=0;O--)if(y.includes(v.producerNode[O].wrapper)){Ge(v.producerNode[O],v.producerIndexOfThis[O]);let Oe=v.producerNode.length-1;if(v.producerNode[O]=v.producerNode[Oe],v.producerIndexOfThis[O]=v.producerIndexOfThis[Oe],v.producerNode.length--,v.producerIndexOfThis.length--,v.nextProducerIndex--,O<v.producerNode.length){let vr=v.producerIndexOfThis[O],Ot=v.producerNode[O];_t(Ot),Ot.liveConsumerIndexOfThis[vr]=O}}}getPending(){if(!(0,r.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[C].producerNode.filter(v=>v.dirty).map(v=>v.wrapper)}}f=C,p=new WeakSet,k=function(){},x=new WeakSet,S=function(w){for(let y of w)if(!(0,r.isComputed)(y)&&!(0,r.isState)(y))throw new TypeError("Called watch/unwatch without a Computed or State argument")},r.isWatcher=w=>vt(p,w),h.Watcher=mr;function gr(){var w;return(w=Ir())==null?void 0:w.wrapper}h.currentComputed=gr,h.watched=Symbol("watched"),h.unwatched=Symbol("unwatched")})(r.subtle||(r.subtle={}))})($||($={}));var St=!1,rr=new $.subtle.Watcher(()=>{St||(St=!0,queueMicrotask(()=>{St=!1;for(let r of rr.getPending())r.get();rr.watch()}))}),eo=Symbol("SignalWatcherBrand"),to=new FinalizationRegistry(r=>{r.unwatch(...$.subtle.introspectSources(r))}),or=new WeakMap;function _e(r){return r[eo]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),r):class extends r{constructor(){super(...arguments),this._$St=new Map,this._$So=new $.State(0),this._$Si=!1}_$Sl(){var e,t;let o=[],s=[];this._$St.forEach((i,l)=>{(i?.beforeUpdate?o:s).push(l)});let n=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(i=>i!==this._$Su&&!this._$St.has(i));o.forEach(i=>i.get()),(t=this._$Su)===null||t===void 0||t.get(),n.forEach(i=>i.get()),s.forEach(i=>i.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new $.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new $.subtle.Watcher(function(){let t=or.get(this);t!==void 0&&(t._$Si===!1&&(new Set(this.getPending()).has(t._$Su)?t.requestUpdate():t._$Sv()),this.watch())});or.set(e,this),to.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([t])=>t))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...$.subtle.introspectSources(this.h).filter(t=>{var o;let s=((o=this._$St.get(t))===null||o===void 0?void 0:o.manualDispose)!==!0;return s&&this._$St.delete(t),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,t){var o;this._$S_();let s=new $.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,t),(o=t?.beforeUpdate)!==null&&o!==void 0&&o?$.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>$.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var Je={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Se=r=>(...e)=>({_$litDirective$:r,values:e}),ne=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:bs}=Jt;var sr=r=>r.strings===void 0;var Ee=(r,e)=>{let t=r._$AN;if(t===void 0)return!1;for(let o of t)o._$AO?.(e,!1),Ee(o,e);return!0},Qe=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while(t?.size===0)},nr=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),so(e)}};function ro(r){this._$AN!==void 0?(Qe(this),this._$AM=r,nr(this)):this._$AM=r}function oo(r,e=!1,t=0){let o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let n=t;n<o.length;n++)Ee(o[n],!1),Qe(o[n]);else o!=null&&(Ee(o,!1),Qe(o));else Ee(this,r)}var so=r=>{r.type==Je.CHILD&&(r._$AP??=oo,r._$AQ??=ro)},Ze=class extends ne{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,o){super._$AT(e,t,o),nr(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Ee(this,e),Qe(this))}setValue(e){if(sr(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};var Et=!1,kt=new $.subtle.Watcher(async()=>{Et||(Et=!0,queueMicrotask(()=>{Et=!1;for(let r of kt.getPending())r.get();kt.watch()}))}),Xe=class extends Ze{_$S_(){var e,t;this._$Sm===void 0&&(this._$Sj=new $.Computed(()=>{var o;let s=(o=this._$SW)===null||o===void 0?void 0:o.get();return this.setValue(s),s}),this._$Sm=(t=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&t!==void 0?t:kt,this._$Sm.watch(this._$Sj),$.subtle.untrack(()=>{var o;return(o=this._$Sj)===null||o===void 0?void 0:o.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return $.subtle.untrack(()=>e.get())}update(e,[t]){var o,s;return(o=this._$Sk)!==null&&o!==void 0||(this._$Sk=(s=e.options)===null||s===void 0?void 0:s.host),t!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=t,this._$S_(),$.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},Ct=Se(Xe);var At=r=>(e,...t)=>r(e,...t.map(o=>o instanceof $.State||o instanceof $.Computed?Ct(o):o)),no=At(c),io=At(Kt);var Ms=$.State,Ds=$.Computed,q=(r,e)=>new $.State(r,e),Ye=(r,e)=>new $.Computed(r,e);var ao=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function ir(r,e=""){for(let{pattern:t,name:o}of ao){let s=t.exec(r);if(s)return{name:o,path:s[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var T=q(ir(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{T.set(ir(window.location.pathname,window.location.search))});var Gs=m`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,L=m`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Js=m`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,ar=m`
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
`,lr=m`
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
`,cr=m`
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
`,Qs=m`
  .hidden {
    display: none !important;
  }
`;async function dr(r,e,t){let o="/api/search?"+r.toString(),s=await fetch(o,{signal:t});if(!s.ok){let n=await s.text();throw new Error(`search failed (${s.status}): ${n}`)}if(!s.body)throw new Error("response has no body");await lo(s.body,n=>{switch(n.type){case"result":e.onResult?.(n);break;case"file":e.onFile?.(n);break;case"facets":e.onFacets?.(n);break;case"done":e.onDone?.(n);break}})}async function lo(r,e){let t=r.getReader(),o=new TextDecoder,s="";try{for(;;){let{done:i,value:l}=await t.read();if(i)break;s+=o.decode(l,{stream:!0});let d;for(;(d=s.indexOf(`
`))!==-1;){let h=s.slice(0,d).trim();s=s.slice(d+1),h.length!==0&&e(JSON.parse(h))}}s+=o.decode();let n=s.trim();n.length>0&&e(JSON.parse(n))}finally{t.releaseLock()}}function ae(r){let e=r.indexOf("/+/");if(e===-1)return{repo:r,version:"",filePath:""};let t=r.slice(0,e),o=r.slice(e+3),s=t.indexOf("/");return s===-1?{repo:t,version:"",filePath:o}:{repo:t.slice(0,s),version:t.slice(s+1),filePath:o}}function pr(r,e={},t={}){let o=new URLSearchParams;if(r.trim()&&o.set("q",r.trim()),e.literal&&o.set("literal","true"),e.caseSensitive&&o.set("fold_case","false"),e.repos?.length)for(let s of e.repos)o.append("repo",s);for(let[s,n]of Object.entries(t))for(let i of n)o.append(s,i);return o}var et=class{constructor(){this.lastCommittedUrl=""}commit(e,t={},o={}){let s=pr(e,t,o),n=e?`${e} \xB7 code search`:"code search",i=Ve(s);if(!e)return this.lastCommittedUrl="",[{type:"replaceUrl",url:Ve(new URLSearchParams),title:n},{type:"clearResults"}];let l=[];return i!==this.lastCommittedUrl&&this.lastCommittedUrl!==""?l.push({type:"pushUrl",url:i,title:n}):l.push({type:"replaceUrl",url:i,title:n}),l.push({type:"search",params:s}),this.lastCommittedUrl=i,l}popstate(e,t){this.lastCommittedUrl=Ve(t);let o=e?`${e} \xB7 code search`:"code search",s=[{type:"replaceUrl",url:Ve(t),title:o}];return e?s.push({type:"search",params:t}):s.push({type:"clearResults"}),s}};function Ve(r){let e=r.toString();return"/search"+(e?"?"+e:"")}var ke=Ye(()=>T.get().params.get("q")??""),ln=Ye(()=>{let r=T.get().params;return{literal:r.get("literal")==="true",caseSensitive:r.get("fold_case")==="false"}}),hr=Ye(()=>{let r=T.get().params.get("context");if(r!==null){let e=parseInt(r,10);if(!isNaN(e)&&e>=0)return e}return 3}),le=q([]),ce=q([]),de=q(null),pe=q(null),W=q(!1),Q=q(null),Rt=null;async function co(){Rt&&Rt.abort();let r=new AbortController;if(Rt=r,!ke.get()){le.set([]),ce.set([]),de.set(null),pe.set(null),W.set(!1),Q.set(null);return}let t=T.get(),o=new URLSearchParams(t.params);W.set(!0),Q.set(null),le.set([]),ce.set([]),de.set(null),pe.set(null);let s=[],n=[],i=null;try{await dr(o,{onResult(l){s.push(l)},onFile(l){n.push(l)},onFacets(l){i=l},onDone(l){le.set(s),ce.set(n),de.set(i),pe.set(l),W.set(!1)},onError(l){r.signal.aborted||(Q.set(l.message),W.set(!1))}},r.signal)}catch(l){r.signal.aborted||(Q.set(l instanceof Error?l.message:String(l)),W.set(!1))}}var tt=new et,Z=null;function ur(r,e={},t={}){Z&&clearTimeout(Z),Z=setTimeout(()=>{Z=null,ot(tt.commit(r,e,t))},200)}function rt(r,e={},t={}){Z&&(clearTimeout(Z),Z=null),ot(tt.commit(r,e,t))}{let e=T.get().params.get("q")??"";e&&ot(tt.commit(e))}window.addEventListener("popstate",()=>{let r=T.get(),e=r.params.get("q")??"";ot(tt.popstate(e,r.params))});function ot(r){for(let e of r)switch(e.type){case"pushUrl":history.pushState(null,e.title,e.url),document.title=e.title,T.set({name:"search",params:new URLSearchParams(new URL(e.url,location.origin).search)});break;case"replaceUrl":history.replaceState(null,e.title,e.url),document.title=e.title,T.set({name:"search",params:new URLSearchParams(new URL(e.url,location.origin).search)});break;case"search":co();break;case"clearResults":le.set([]),ce.set([]),de.set(null),pe.set(null),W.set(!1),Q.set(null);break}}var X=class extends g{constructor(){super(...arguments);this.value="";this.error=""}render(){return c`
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
          ${this.error?c`<span id="errortext">${this.error}</span>`:_}
        </div>
      </div>
    `}onInput(){let t=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:t.value},bubbles:!0,composed:!0}))}onKeydown(t){if(t.key==="Enter"){let o=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-submit",{detail:{value:o.value},bubbles:!0,composed:!0}))}}appendQuery(t){let o=this.renderRoot.querySelector("#searchbox");o&&(o.value+=t,this.value=o.value,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};X.styles=[cr,m`
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
    `],a([u()],X.prototype,"value",2),a([u()],X.prototype,"error",2),X=a([b("cs-search-input")],X);var U=class extends g{constructor(){super(...arguments);this.groups=[];this._open=!1;this._search="";this._selected=new Set;this._onOutsideClick=t=>{this._open&&(t.composedPath().includes(this)||(this._open=!1))}}get _options(){return this.groups.flatMap(t=>t.repos.map(o=>({value:o,label:o.split("/").pop()??o,group:t.label,selected:this._selected.has(o)})))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick)}get selectedRepos(){return[...this._selected]}get _buttonText(){let t=this._selected.size;return t===0?"(all repositories)":t<=4?this._options.filter(s=>s.selected).map(s=>s.label).join(", "):`(${t} repositories)`}get _filteredGroups(){let t=this._search.toLowerCase(),o=new Map;for(let s of this._options)t&&!s.value.toLowerCase().includes(t)&&!s.label.toLowerCase().includes(t)||(o.has(s.group)||o.set(s.group,[]),o.get(s.group).push(s));return[...o.entries()].map(([s,n])=>({label:s,options:n}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(t){let o=new Set(this._selected);o.has(t)?o.delete(t):o.add(t),this._selected=o,this._fireChange()}_selectAll(){this._selected=new Set(this._options.map(t=>t.value)),this._fireChange()}_deselectAll(){this._selected=new Set,this._fireChange()}_toggleGroup(t){let o=this._options.filter(i=>i.group===t).map(i=>i.value),s=o.every(i=>this._selected.has(i)),n=new Set(this._selected);for(let i of o)s?n.delete(i):n.add(i);this._selected=n,this._fireChange()}_fireChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}_onSearchInput(t){this._search=t.target.value}_onSearchKeydown(t){t.key==="Enter"&&(t.preventDefault(),this._search=""),t.key==="Escape"&&(this._open=!1)}render(){return c`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():_}
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
        `}};U.styles=m`
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
    `,a([u({type:Array})],U.prototype,"groups",2),a([A()],U.prototype,"_open",2),a([A()],U.prototype,"_search",2),a([A()],U.prototype,"_selected",2),U=a([b("repo-select")],U);var Y=class extends g{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let t=this.options.caseSensitive?"false":"auto";return c`
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
          <repo-select .groups=${this.repos} @change=${this.onRepoChange}></repo-select>
        </div>
      </div>
    `}setCase(t){let o=t==="false";this.options={...this.options,caseSensitive:o},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}onRepoChange(){let o=this.renderRoot.querySelector("repo-select")?.selectedRepos??[];this.options={...this.options,repos:o.length>0?o:void 0},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};Y.styles=[lr,ie,m`
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
    `],a([u({type:Object})],Y.prototype,"options",2),a([u({type:Array})],Y.prototype,"repos",2),Y=a([b("cs-search-options")],Y);var Tt=Se(class extends ne{constructor(r){if(super(r),r.type!==Je.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((e=>r[e])).join(" ")+" "}update(r,[e]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let t=r.element.classList;for(let o of this.st)o in e||(t.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return z}});var j=class extends g{render(){return this.start!=null&&this.end!=null?c`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:c`${this.text}`}};j.styles=m`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,a([u()],j.prototype,"text",2),a([u({type:Number})],j.prototype,"start",2),a([u({type:Number})],j.prototype,"end",2),j=a([b("match-str")],j);var N=class extends g{render(){return c`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};N.styles=m`
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
    `,a([u()],N.prototype,"text",2),a([u()],N.prototype,"href",2),a([u({type:Number})],N.prototype,"start",2),a([u({type:Number})],N.prototype,"end",2),a([u()],N.prototype,"repo",2),a([u()],N.prototype,"version",2),N=a([b("filename-match")],N);var I=class extends g{render(){let e=this.start!=null&&this.end!=null;return c`<a class=${Tt({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Tt({matchline:e})}
                >${e?c`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};I.styles=m`
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
    `,a([u({type:Number})],I.prototype,"lineNo",2),a([u()],I.prototype,"text",2),a([u()],I.prototype,"href",2),a([u({type:Number})],I.prototype,"start",2),a([u({type:Number})],I.prototype,"end",2),I=a([b("match-line")],I);function po(r){let e=r.lastIndexOf("/");return e<0?".":r.slice(0,e)}function ho(r){let e=r.lastIndexOf("/");return e<0?r:r.slice(e+1)}var V=class extends g{constructor(){super(...arguments);this.noContext=!1}render(){let{repo:t,version:o,filePath:s}=ae(this.result.path),n=`/view/${this.result.path}`,i=this.splitGroups(this.result.lines),l=o.length>6?o.slice(0,6):o,d=po(s),h=ho(s);return c`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${n}>
              <span class="repo">${t}:</span><span class="version">${l}:</span>${d}/<span class="filename">${h}</span>
            </a>
          </span>
        </div>
        ${i.map(f=>c`
            <div class="match">
              <div class="contents">
                ${f.map(p=>{let k=p[0],x=p[1],S=p.length>2?p[2]:void 0,fe=S!==void 0&&S.length>0,st=`${n}#L${k}`,nt=fe&&S?S[0][0]:void 0,it=fe&&S?S[0][1]:void 0;return c`
                    <match-line
                      class=${fe?"match-hit":"context"}
                      .lineNo=${k}
                      text=${x}
                      href=${st}
                      .start=${nt}
                      .end=${it}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(t){let o=[],s=[];for(let n of t)n===null?s.length>0&&(o.push(s),s=[]):s.push(n);return s.length>0&&o.push(s),o}};V.styles=[ar,L,m`
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
    `],a([u({type:Object})],V.prototype,"result",2),a([u({type:Boolean,reflect:!0,attribute:"no-context"})],V.prototype,"noContext",2),V=a([b("cs-result-group")],V);var H=class extends g{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return c`<div id="countarea">Searching...</div>`;let t=this.truncated?`${this.total}+`:`${this.total}`;return c`
      <div id="countarea">
        <span id="numresults">${t}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};H.styles=[ie,m`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],a([u({type:Number})],H.prototype,"total",2),a([u({type:Number})],H.prototype,"timeMs",2),a([u({type:Boolean})],H.prototype,"truncated",2),a([u({type:Boolean})],H.prototype,"loading",2),H=a([b("cs-result-stats")],H);var ee=class extends g{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){let t=this.facets&&(this.facets.ext?.length||this.facets.repo?.length||this.facets.path?.length),o=Object.values(this.selected).some(i=>i.size>0);if(!t&&!o)return _;let n=[{label:"Extension",key:"f.ext",buckets:this.facets?.ext??[]},{label:"Repository",key:"f.repo",buckets:this.facets?.repo??[]},{label:"Path",key:"f.path",buckets:this.facets?.path??[]}].filter(i=>i.buckets.length>0||(this.selected[i.key]?.size??0)>0);return n.length===0?_:c`
      <div class="panel">
        ${n.map(i=>this.renderSection(i.label,i.key,i.buckets))}
      </div>
    `}renderSection(t,o,s){let n=this.selected[o]??new Set,l=[...s].sort((f,p)=>p.c-f.c||f.v.localeCompare(p.v)).slice(0,10),d=new Set(l.map(f=>f.v)),h=[...n].filter(f=>!d.has(f));return c`
      <div class="section">
        <span class="section-label">${t}</span>
        ${h.map(f=>c`
          <button
            class="pill stale"
            @click=${()=>this.toggle(o,f)}
          >${f}</button>
        `)}
        ${l.map(f=>c`
          <button
            class=${n.has(f.v)?"pill active":"pill"}
            @click=${()=>this.toggle(o,f.v)}
          >${f.v} <span class="count">${f.c}</span></button>
        `)}
      </div>
    `}toggle(t,o){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:t,value:o},bubbles:!0,composed:!0}))}};ee.styles=m`
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
  `,a([u({type:Object})],ee.prototype,"facets",2),a([u({type:Object})],ee.prototype,"selected",2),ee=a([b("cs-facet-panel")],ee);var Ce=class extends g{render(){return c`
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
    `}};Ce.styles=[L,m`
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
    `],Ce=a([b("cs-search-help")],Ce);function uo(r){let e={};for(let t of["f.ext","f.repo","f.path"]){let o=r.getAll(t);o.length>0&&(e[t]=new Set(o))}return e}var Ae=class extends _e(g){constructor(){super(...arguments);this.currentOptions={}}get activeFacets(){return uo(T.get().params)}render(){let t=ke.get(),o=le.get(),s=ce.get(),n=pe.get(),i=W.get(),l=Q.get(),d=de.get(),h=hr.get(),f=n||i;return c`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${p=>p.preventDefault()}
        >
          <cs-search-input
            .value=${t}
            .error=${l??""}
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
        ${f?c`
          <div id="resultarea">
            <cs-result-stats
              .total=${n?.total??0}
              .timeMs=${n?.time_ms??0}
              .truncated=${n?.truncated??!1}
              .loading=${i}
            ></cs-result-stats>
            <cs-facet-panel
              .facets=${d}
              .selected=${this.activeFacets}
              @facet-toggle=${this.onFacetToggle}
            ></cs-facet-panel>
            <div
              id="results"
              tabindex="-1"
            >
              <div id="path-results">
                ${s.map(p=>{let{repo:k,version:x,filePath:S}=ae(p.path);return c`
                    <filename-match
                      text=${S}
                      start=${p.match[0]}
                      end=${p.match[1]}
                      repo=${k}
                      version=${x.slice(0,6)}
                      href="/view/${p.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${o.map(p=>c`
                  <cs-result-group .result=${p} ?no-context=${h<=0}></cs-result-group>
                `)}
              </div>
            </div>
          </div>
        `:c`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(t){let{key:o,value:s}=t.detail,n=this.activeFacets,i=n[o]??new Set,l;o==="f.path"?i.has(s)?l=new Set:l=new Set([s]):(l=new Set(i),l.has(s)?l.delete(s):l.add(s));let d={...n,[o]:l},h=ke.get();h&&rt(h,this.currentOptions,this.facetParamsFrom(d))}onSearchInput(t){ur(t.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onSearchSubmit(t){rt(t.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onOptionsChange(t){this.currentOptions=t.detail,this.reSearch()}reSearch(){let t=ke.get();t&&rt(t,this.currentOptions,this.facetParamsFrom(this.activeFacets))}getRepos(){return window.__CS_INIT?.repos??[]}facetParamsFrom(t){let o={};for(let[s,n]of Object.entries(t))n.size>0&&(o[s]=[...n]);return o}};Ae.styles=[L,ie,m`
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

    `],Ae=a([b("cs-search-view")],Ae);var he=class extends g{constructor(){super(...arguments);this.path=""}render(){let t=this.path.indexOf("/+/");if(t===-1)return c`<span>${this.path}</span>`;let o=this.path.slice(0,t),n=this.path.slice(t+3).split("/").filter(i=>i.length>0);return c`
      <nav class="breadcrumbs">
        <a href="/view/${o}/+/">${o}</a>
        ${n.map((i,l)=>{let d=n.slice(0,l+1).join("/"),h=`/view/${o}/+/${d}${l<n.length-1?"/":""}`;return c`<span class="sep">/</span><a href=${h}>${i}</a>`})}
      </nav>
    `}};he.styles=m`
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
  `,a([u()],he.prototype,"path",2),he=a([b("cs-breadcrumbs")],he);var te=class extends g{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let t=[...this.entries].sort((o,s)=>{let n=o.endsWith("/"),i=s.endsWith("/");return n!==i?n?-1:1:o.localeCompare(s)});return c`
      <div class="listing">
        ${t.map(o=>{let s=o.endsWith("/"),n=this.basePath+o;return c`
            <a class=${s?"dir":"file"} href=${n}>${o}</a>
          `})}
      </div>
    `}};te.styles=m`
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
  `,a([u({type:Array})],te.prototype,"entries",2),a([u()],te.prototype,"basePath",2),te=a([b("cs-dir-listing")],te);function fo(r,e){return r<0?"1":r===e?String(r):`${r}-L${e}`}function mo(r,e,t){return r?r.replace("{lno}",fo(e,t)):""}function go(r){let e=r.match(/^#L(\d+)(?:-L?(\d+))?$/);if(!e)return[-1,-1];let t=parseInt(e[1],10),o=e[2]?parseInt(e[2],10):t;return[t,o]}var P=class extends g{constructor(){super(...arguments);this.content="";this.basePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.hasSelection=!1;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onSelectionChange=()=>{this.hasSelection=(window.getSelection()?.toString()||"").length>0};this.onKeyDown=t=>{t.target.matches("input,textarea")||t.altKey||t.ctrlKey||t.metaKey||this.processKey(t.key)&&t.preventDefault()}}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("selectionchange",this.onSelectionChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("selectionchange",this.onSelectionChange)}parseHash(){let[t,o]=go(window.location.hash);this.selectedStart=t,this.selectedEnd=o}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!t)return;let o=window.innerHeight,s=Math.floor(o/3);if(this.selectedStart!==this.selectedEnd){let i=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(i){let l=t.getBoundingClientRect(),d=i.getBoundingClientRect(),h=d.top+d.height-l.top;h<=o?s=.5*(o-h):s=t.offsetHeight/2}}let n=t.getBoundingClientRect();window.scrollTo(0,n.top+window.scrollY-s)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){return mo(this.externalUrl,this.selectedStart,this.selectedEnd)}getSelectedText(){return window.getSelection()?.toString()||""}processKey(t){switch(t){case"Enter":{let o=this.getSelectedText();return o&&window.open(`/search?q=${encodeURIComponent(o)}`),!0}case"/":{this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));let o=this.getSelectedText();return window.location.href=`/search${o?"?q="+encodeURIComponent(o):""}`,!0}case"?":return this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0})),!0;case"Escape":return this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0})),!0;case"v":{let o=this.resolvedExternalUrl();return o&&(window.location.href=o),!0}case"n":case"p":{let o=this.getSelectedText();return o&&window.find(o,!1,t==="p"),!0}}return!1}render(){let t=this.content.split(`
`);return t.length>0&&t[t.length-1]===""&&t.pop(),c`
      ${this.hasSelection?c`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      `:""}
      <div class="viewer">
        ${t.map((o,s)=>{let n=s+1,i=n>=this.selectedStart&&n<=this.selectedEnd;return c`
            <div class="line ${i?"selected":""}" id="L${n}">
              <a class="lno" href="#L${n}" @click=${l=>this.onLineClick(l,n)}>${n}</a>
              <span class="code">${o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(t,o){if(t.shiftKey&&this.selectedStart>0){t.preventDefault();let s=Math.min(this.selectedStart,o),n=Math.max(this.selectedStart,o);this.selectedStart=s,this.selectedEnd=n,history.replaceState(null,"",`#L${s}-L${n}`)}else this.selectedStart=o,this.selectedEnd=o}};P.styles=m`
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
  `,a([u()],P.prototype,"content",2),a([u()],P.prototype,"basePath",2),a([u()],P.prototype,"repo",2),a([u()],P.prototype,"version",2),a([u()],P.prototype,"externalUrl",2),a([A()],P.prototype,"selectedStart",2),a([A()],P.prototype,"selectedEnd",2),a([A()],P.prototype,"hasSelection",2),P=a([b("cs-code-viewer")],P);var ue=class extends g{constructor(){super(...arguments);this.open=!1}render(){return this.open?c`
      <div class="overlay" @click=${this.close}>
        <div class="modal" @click=${t=>t.stopPropagation()}>
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
    `:c``}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}))}};ue.styles=m`
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
  `,a([u({type:Boolean,reflect:!0})],ue.prototype,"open",2),ue=a([b("cs-help-modal")],ue);function vo(r){let e=r.indexOf("/+/");if(e>=0){let t=r.slice(0,e),o=r.slice(e+3),s=t.lastIndexOf("@");if(s>=0)return{repo:t.slice(0,s),version:t.slice(s+1),filePath:o}}return ae(r)}function bo(r,e,t){let o="github.com/";return r.startsWith(o)?`https://github.com/${r.slice(o.length)}/blob/${e}/${t}#L{lno}`:""}var R=class extends g{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null;this.showHelp=!1}willUpdate(t){t.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let t=this.path.endsWith("/")||this.path.endsWith("/+/")||!this.path.includes("/+/"),o=`/raw/${this.path}${t&&!this.path.endsWith("/")?"/":""}`;try{let s=await fetch(o);if(!s.ok){this.error=`Not found (${s.status})`,this.loading=!1;return}(s.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await s.json(),this.fetchReadme(o)):this.content=await s.text()}catch(s){this.error=s instanceof Error?s.message:String(s)}this.loading=!1}async fetchReadme(t){if(!this.dirEntries)return;let o=this.dirEntries.find(s=>R.README_RE.test(s));if(o)try{let s=t.endsWith("/")?t:t+"/",n=await fetch(s+o);n.ok&&(this.readmeContent=await n.text())}catch{}}render(){let t=vo(this.path),o=t.repo,s=t.version,n=bo(t.repo,t.version,t.filePath);return c`
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
            .externalUrl=${n}
            @toggle-help=${()=>{this.showHelp=!this.showHelp}}
            @close-help=${()=>{this.showHelp=!1}}
          ></cs-code-viewer>
        `:""}
        <cs-help-modal ?open=${this.showHelp} @close-help=${()=>{this.showHelp=!1}}></cs-help-modal>
      </div>
    `}};R.README_RE=/^readme\.(md|markdown|mdown|mkdn|txt|rst|org|adoc|asc)$/i,R.styles=m`
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
  `,a([u()],R.prototype,"path",2),a([A()],R.prototype,"content",2),a([A()],R.prototype,"dirEntries",2),a([A()],R.prototype,"readmeContent",2),a([A()],R.prototype,"loading",2),a([A()],R.prototype,"error",2),a([A()],R.prototype,"showHelp",2),R=a([b("cs-file-view")],R);var Re=class extends g{render(){return c`
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
    `}};Re.styles=[L,m`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Re=a([b("cs-about-view")],Re);var Te=class extends _e(g){render(){let e=T.get();return c`
      <main>${this.renderView(e)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(e){switch(e.name){case"search":return c`<cs-search-view></cs-search-view>`;case"view":return c`<cs-file-view .path=${e.path??""}></cs-file-view>`;case"about":return c`<cs-about-view></cs-about-view>`;default:return c`<div class="placeholder">Not found</div>`}}};Te.styles=[L,m`
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
    `],Te=a([b("cs-app")],Te);export{Te as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
