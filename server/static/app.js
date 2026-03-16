var wr=Object.defineProperty;var _r=Object.getOwnPropertyDescriptor;var a=(r,e,t,o)=>{for(var s=o>1?void 0:o?_r(e,t):e,n=r.length-1,i;n>=0;n--)(i=r[n])&&(s=(o?i(e,t,s):i(s))||s);return o&&s&&wr(e,t,s),s};var Le=globalThis,Ue=Le.ShadowRoot&&(Le.ShadyCSS===void 0||Le.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lt=Symbol(),Ut=new WeakMap,ve=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==lt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Ue&&e===void 0){let o=t!==void 0&&t.length===1;o&&(e=Ut.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Ut.set(t,e))}return e}toString(){return this.cssText}},It=r=>new ve(typeof r=="string"?r:r+"",void 0,lt),m=(r,...e)=>{let t=r.length===1?r[0]:e.reduce(((o,s,n)=>o+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1]),r[0]);return new ve(t,r,lt)},Mt=(r,e)=>{if(Ue)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(let t of e){let o=document.createElement("style"),s=Le.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=t.cssText,r.appendChild(o)}},ct=Ue?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let o of e.cssRules)t+=o.cssText;return It(t)})(r):r;var{is:Sr,defineProperty:Er,getOwnPropertyDescriptor:kr,getOwnPropertyNames:Cr,getOwnPropertySymbols:Ar,getPrototypeOf:Rr}=Object,Ie=globalThis,zt=Ie.trustedTypes,Or=zt?zt.emptyScript:"",Pr=Ie.reactiveElementPolyfillSupport,be=(r,e)=>r,xe={toAttribute(r,e){switch(e){case Boolean:r=r?Or:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Me=(r,e)=>!Sr(r,e),Dt={attribute:!0,type:String,converter:xe,reflect:!1,useDefault:!1,hasChanged:Me};Symbol.metadata??=Symbol("metadata"),Ie.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Dt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,t);s!==void 0&&Er(this.prototype,e,s)}}static getPropertyDescriptor(e,t,o){let{get:s,set:n}=kr(this.prototype,e)??{get(){return this[t]},set(i){this[t]=i}};return{get:s,set(i){let c=s?.call(this);n?.call(this,i),this.requestUpdate(e,c,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Dt}static _$Ei(){if(this.hasOwnProperty(be("elementProperties")))return;let e=Rr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(be("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(be("properties"))){let t=this.properties,o=[...Cr(t),...Ar(t)];for(let s of o)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[o,s]of t)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let s=this._$Eu(t,o);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)t.unshift(ct(s))}else e!==void 0&&t.push(ct(e));return t}static _$Eu(e,t){let o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let n=(o.converter?.toAttribute!==void 0?o.converter:xe).toAttribute(t,o.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let n=o.getPropertyOptions(s),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:xe;this._$Em=s;let c=i.fromAttribute(t,n.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){let s=this.constructor,n=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??Me)(n,t)||o.useDefault&&o.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:s,wrapped:n},i){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,i??t??this[e]),n!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,n]of o){let{wrapped:i}=n,c=this[s];i!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,n,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[be("elementProperties")]=new Map,z[be("finalized")]=new Map,Pr?.({ReactiveElement:z}),(Ie.reactiveElementVersions??=[]).push("2.1.1");var pt=globalThis,ze=pt.trustedTypes,qt=ze?ze.createPolicy("lit-html",{createHTML:r=>r}):void 0,ht="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,ut="?"+D,Tr=`<${ut}>`,Q=document,$e=()=>Q.createComment(""),we=r=>r===null||typeof r!="object"&&typeof r!="function",ft=Array.isArray,Ft=r=>ft(r)||typeof r?.[Symbol.iterator]=="function",dt=`[ 	
\f\r]`,ye=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wt=/-->/g,Ht=/>/g,F=RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),jt=/'/g,Bt=/"/g,Gt=/^(?:script|style|textarea|title)$/i,mt=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),d=mt(1),Qt=mt(2),Ro=mt(3),q=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Kt=new WeakMap,G=Q.createTreeWalker(Q,129);function Jt(r,e){if(!ft(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return qt!==void 0?qt.createHTML(e):e}var Zt=(r,e)=>{let t=r.length-1,o=[],s,n=e===2?"<svg>":e===3?"<math>":"",i=ye;for(let c=0;c<t;c++){let l=r[c],h,u,p=-1,E=0;for(;E<l.length&&(i.lastIndex=E,u=i.exec(l),u!==null);)E=i.lastIndex,i===ye?u[1]==="!--"?i=Wt:u[1]!==void 0?i=Ht:u[2]!==void 0?(Gt.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=F):u[3]!==void 0&&(i=F):i===F?u[0]===">"?(i=s??ye,p=-1):u[1]===void 0?p=-2:(p=i.lastIndex-u[2].length,h=u[1],i=u[3]===void 0?F:u[3]==='"'?Bt:jt):i===Bt||i===jt?i=F:i===Wt||i===Ht?i=ye:(i=F,s=void 0);let b=i===F&&r[c+1].startsWith("/>")?" ":"";n+=i===ye?l+Tr:p>=0?(o.push(h),l.slice(0,p)+ht+l.slice(p)+D+b):l+D+(p===-2?c:b)}return[Jt(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},_e=class r{constructor({strings:e,_$litType$:t},o){let s;this.parts=[];let n=0,i=0,c=e.length-1,l=this.parts,[h,u]=Zt(e,t);if(this.el=r.createElement(h,o),G.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=G.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(ht)){let E=u[i++],b=s.getAttribute(p).split(D),y=/([.?@])?(.*)/.exec(E);l.push({type:1,index:n,name:y[2],strings:b,ctor:y[1]==="."?qe:y[1]==="?"?We:y[1]==="@"?He:Z}),s.removeAttribute(p)}else p.startsWith(D)&&(l.push({type:6,index:n}),s.removeAttribute(p));if(Gt.test(s.tagName)){let p=s.textContent.split(D),E=p.length-1;if(E>0){s.textContent=ze?ze.emptyScript:"";for(let b=0;b<E;b++)s.append(p[b],$e()),G.nextNode(),l.push({type:2,index:++n});s.append(p[E],$e())}}}else if(s.nodeType===8)if(s.data===ut)l.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(D,p+1))!==-1;)l.push({type:7,index:n}),p+=D.length-1}n++}}static createElement(e,t){let o=Q.createElement("template");return o.innerHTML=e,o}};function J(r,e,t=r,o){if(e===q)return e;let s=o!==void 0?t._$Co?.[o]:t._$Cl,n=we(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,t,o)),o!==void 0?(t._$Co??=[])[o]=s:t._$Cl=s),s!==void 0&&(e=J(r,s._$AS(r,e.values),s,o)),e}var De=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:o}=this._$AD,s=(e?.creationScope??Q).importNode(t,!0);G.currentNode=s;let n=G.nextNode(),i=0,c=0,l=o[0];for(;l!==void 0;){if(i===l.index){let h;l.type===2?h=new se(n,n.nextSibling,this,e):l.type===1?h=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(h=new je(n,this,e)),this._$AV.push(h),l=o[++c]}i!==l?.index&&(n=G.nextNode(),i++)}return G.currentNode=Q,s}p(e){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},se=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,s){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),we(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==q&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ft(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&we(this._$AH)?this._$AA.nextSibling.data=e:this.T(Q.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=_e.createElement(Jt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(t);else{let n=new De(s,this),i=n.u(this.options);n.p(t),this.T(i),this._$AH=n}}_$AC(e){let t=Kt.get(e.strings);return t===void 0&&Kt.set(e.strings,t=new _e(e)),t}k(e){ft(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,s=0;for(let n of e)s===t.length?t.push(o=new r(this.O($e()),this.O($e()),this,this.options)):o=t[s],o._$AI(n),s++;s<t.length&&(this._$AR(o&&o._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,s,n){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=S}_$AI(e,t=this,o,s){let n=this.strings,i=!1;if(n===void 0)e=J(this,e,t,0),i=!we(e)||e!==this._$AH&&e!==q,i&&(this._$AH=e);else{let c=e,l,h;for(e=n[0],l=0;l<n.length-1;l++)h=J(this,c[o+l],t,l),h===q&&(h=this._$AH[l]),i||=!we(h)||h!==this._$AH[l],h===S?e=S:e!==S&&(e+=(h??"")+n[l+1]),this._$AH[l]=h}i&&!s&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},qe=class extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}},We=class extends Z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}},He=class extends Z{constructor(e,t,o,s,n){super(e,t,o,s,n),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??S)===q)return;let o=this._$AH,s=e===S&&o!==S||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==S&&(o===S||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},je=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}},Xt={M:ht,P:D,A:ut,C:1,L:Zt,R:De,D:Ft,V:J,I:se,H:Z,N:We,U:He,B:qe,F:je},Nr=pt.litHtmlPolyfillSupport;Nr?.(_e,se),(pt.litHtmlVersions??=[]).push("3.3.1");var Yt=(r,e,t)=>{let o=t?.renderBefore??e,s=o._$litPart$;if(s===void 0){let n=t?.renderBefore??null;o._$litPart$=s=new se(e.insertBefore($e(),n),n,void 0,t??{})}return s._$AI(r),s};var gt=globalThis,g=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Yt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};g._$litElement$=!0,g.finalized=!0,gt.litElementHydrateSupport?.({LitElement:g});var Lr=gt.litElementPolyfillSupport;Lr?.({LitElement:g});(gt.litElementVersions??=[]).push("4.2.1");var x=r=>(e,t)=>{t!==void 0?t.addInitializer((()=>{customElements.define(r,e)})):customElements.define(r,e)};var Ur={attribute:!0,type:String,converter:xe,reflect:!1,hasChanged:Me},Ir=(r=Ur,e,t)=>{let{kind:o,metadata:s}=t,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(t.name,r),o==="accessor"){let{name:i}=t;return{set(c){let l=e.get.call(this);e.set.call(this,c),this.requestUpdate(i,l,r)},init(c){return c!==void 0&&this.C(i,void 0,r,c),c}}}if(o==="setter"){let{name:i}=t;return function(c){let l=this[i];e.call(this,c),this.requestUpdate(i,l,r)}}throw Error("Unsupported decorator location: "+o)};function f(r){return(e,t)=>typeof t=="object"?Ir(r,e,t):((o,s,n)=>{let i=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),i?Object.getOwnPropertyDescriptor(s,n):void 0})(r,e,t)}function A(r){return f({...r,state:!0,attribute:!1})}var Mr=Object.defineProperty,zr=(r,e,t)=>e in r?Mr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,vt=(r,e,t)=>(zr(r,typeof e!="symbol"?e+"":e,t),t),Dr=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)},bt=(r,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return r.has(e)},Ke=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},Vt=(r,e,t)=>(Dr(r,e,"access private method"),t);function er(r,e){return Object.is(r,e)}var k=null,Se=!1,Fe=1,Ge=Symbol("SIGNAL");function ne(r){let e=k;return k=r,e}function qr(){return k}function Wr(){return Se}var _t={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Qe(r){if(Se)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(k===null)return;k.consumerOnSignalRead(r);let e=k.nextProducerIndex++;if(ie(k),e<k.producerNode.length&&k.producerNode[e]!==r&&$t(k)){let t=k.producerNode[e];Je(t,k.producerIndexOfThis[e])}k.producerNode[e]!==r&&(k.producerNode[e]=r,k.producerIndexOfThis[e]=$t(k)?or(r,k,e):0),k.producerLastReadVersion[e]=r.version}function Hr(){Fe++}function tr(r){if(!(!r.dirty&&r.lastCleanEpoch===Fe)){if(!r.producerMustRecompute(r)&&!Gr(r)){r.dirty=!1,r.lastCleanEpoch=Fe;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=Fe}}function rr(r){if(r.liveConsumerNode===void 0)return;let e=Se;Se=!0;try{for(let t of r.liveConsumerNode)t.dirty||Br(t)}finally{Se=e}}function jr(){return k?.consumerAllowSignalWrites!==!1}function Br(r){var e;r.dirty=!0,rr(r),(e=r.consumerMarkedDirty)==null||e.call(r.wrapper??r)}function Kr(r){return r&&(r.nextProducerIndex=0),ne(r)}function Fr(r,e){if(ne(e),!(!r||r.producerNode===void 0||r.producerIndexOfThis===void 0||r.producerLastReadVersion===void 0)){if($t(r))for(let t=r.nextProducerIndex;t<r.producerNode.length;t++)Je(r.producerNode[t],r.producerIndexOfThis[t]);for(;r.producerNode.length>r.nextProducerIndex;)r.producerNode.pop(),r.producerLastReadVersion.pop(),r.producerIndexOfThis.pop()}}function Gr(r){ie(r);for(let e=0;e<r.producerNode.length;e++){let t=r.producerNode[e],o=r.producerLastReadVersion[e];if(o!==t.version||(tr(t),o!==t.version))return!0}return!1}function or(r,e,t){var o;if(St(r),ie(r),r.liveConsumerNode.length===0){(o=r.watched)==null||o.call(r.wrapper);for(let s=0;s<r.producerNode.length;s++)r.producerIndexOfThis[s]=or(r.producerNode[s],r,s)}return r.liveConsumerIndexOfThis.push(t),r.liveConsumerNode.push(e)-1}function Je(r,e){var t;if(St(r),ie(r),typeof ngDevMode<"u"&&ngDevMode&&e>=r.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${r.liveConsumerNode.length} consumers)`);if(r.liveConsumerNode.length===1){(t=r.unwatched)==null||t.call(r.wrapper);for(let s=0;s<r.producerNode.length;s++)Je(r.producerNode[s],r.producerIndexOfThis[s])}let o=r.liveConsumerNode.length-1;if(r.liveConsumerNode[e]=r.liveConsumerNode[o],r.liveConsumerIndexOfThis[e]=r.liveConsumerIndexOfThis[o],r.liveConsumerNode.length--,r.liveConsumerIndexOfThis.length--,e<r.liveConsumerNode.length){let s=r.liveConsumerIndexOfThis[e],n=r.liveConsumerNode[e];ie(n),n.producerIndexOfThis[s]=e}}function $t(r){var e;return r.consumerIsAlwaysLive||(((e=r?.liveConsumerNode)==null?void 0:e.length)??0)>0}function ie(r){r.producerNode??(r.producerNode=[]),r.producerIndexOfThis??(r.producerIndexOfThis=[]),r.producerLastReadVersion??(r.producerLastReadVersion=[])}function St(r){r.liveConsumerNode??(r.liveConsumerNode=[]),r.liveConsumerIndexOfThis??(r.liveConsumerIndexOfThis=[])}function sr(r){if(tr(r),Qe(r),r.value===wt)throw r.error;return r.value}function Qr(r){let e=Object.create(Jr);e.computation=r;let t=()=>sr(e);return t[Ge]=e,t}var xt=Symbol("UNSET"),yt=Symbol("COMPUTING"),wt=Symbol("ERRORED"),Jr={..._t,value:xt,dirty:!0,error:null,equal:er,producerMustRecompute(r){return r.value===xt||r.value===yt},producerRecomputeValue(r){if(r.value===yt)throw new Error("Detected cycle in computations.");let e=r.value;r.value=yt;let t=Kr(r),o,s=!1;try{o=r.computation.call(r.wrapper),s=e!==xt&&e!==wt&&r.equal.call(r.wrapper,e,o)}catch(n){o=wt,r.error=n}finally{Fr(r,t)}if(s){r.value=e;return}r.value=o,r.version++}};function Zr(){throw new Error}var Xr=Zr;function Yr(){Xr()}function Vr(r){let e=Object.create(ro);e.value=r;let t=()=>(Qe(e),e.value);return t[Ge]=e,t}function eo(){return Qe(this),this.value}function to(r,e){jr()||Yr(),r.equal.call(r.wrapper,r.value,e)||(r.value=e,oo(r))}var ro={..._t,equal:er,value:void 0};function oo(r){r.version++,Hr(),rr(r)}var C=Symbol("node"),w;(r=>{var e,t,o,s,n,i;class c{constructor(u,p={}){Ke(this,t),vt(this,e);let b=Vr(u)[Ge];if(this[C]=b,b.wrapper=this,p){let y=p.equals;y&&(b.equal=y),b.watched=p[r.subtle.watched],b.unwatched=p[r.subtle.unwatched]}}get(){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return eo.call(this[C])}set(u){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Wr())throw new Error("Writes to signals not permitted during Watcher callback");let p=this[C];to(p,u)}}e=C,t=new WeakSet,o=function(){},r.isState=h=>typeof h=="object"&&bt(t,h),r.State=c;class l{constructor(u,p){Ke(this,n),vt(this,s);let b=Qr(u)[Ge];if(b.consumerAllowSignalWrites=!0,this[C]=b,b.wrapper=this,p){let y=p.equals;y&&(b.equal=y),b.watched=p[r.subtle.watched],b.unwatched=p[r.subtle.unwatched]}}get(){if(!(0,r.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return sr(this[C])}}s=C,n=new WeakSet,i=function(){},r.isComputed=h=>typeof h=="object"&&bt(n,h),r.Computed=l,(h=>{var u,p,E,b,y;function H(_){let $,v=null;try{v=ne(null),$=_()}finally{ne(v)}return $}h.untrack=H;function j(_){var $;if(!(0,r.isComputed)(_)&&!(0,r.isWatcher)(_))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return(($=_[C].producerNode)==null?void 0:$.map(v=>v.wrapper))??[]}h.introspectSources=j;function it(_){var $;if(!(0,r.isComputed)(_)&&!(0,r.isState)(_))throw new TypeError("Called introspectSinks without a Signal argument");return(($=_[C].liveConsumerNode)==null?void 0:$.map(v=>v.wrapper))??[]}h.introspectSinks=it;function at(_){if(!(0,r.isComputed)(_)&&!(0,r.isState)(_))throw new TypeError("Called hasSinks without a Signal argument");let $=_[C].liveConsumerNode;return $?$.length>0:!1}h.hasSinks=at;function br(_){if(!(0,r.isComputed)(_)&&!(0,r.isWatcher)(_))throw new TypeError("Called hasSources without a Computed or Watcher argument");let $=_[C].producerNode;return $?$.length>0:!1}h.hasSources=br;class xr{constructor($){Ke(this,p),Ke(this,b),vt(this,u);let v=Object.create(_t);v.wrapper=this,v.consumerMarkedDirty=$,v.consumerIsAlwaysLive=!0,v.consumerAllowSignalWrites=!1,v.producerNode=[],this[C]=v}watch(...$){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Vt(this,b,y).call(this,$);let v=this[C];v.dirty=!1;let P=ne(v);for(let Ne of $)Qe(Ne[C]);ne(P)}unwatch(...$){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Vt(this,b,y).call(this,$);let v=this[C];ie(v);for(let P=v.producerNode.length-1;P>=0;P--)if($.includes(v.producerNode[P].wrapper)){Je(v.producerNode[P],v.producerIndexOfThis[P]);let Ne=v.producerNode.length-1;if(v.producerNode[P]=v.producerNode[Ne],v.producerIndexOfThis[P]=v.producerIndexOfThis[Ne],v.producerNode.length--,v.producerIndexOfThis.length--,v.nextProducerIndex--,P<v.producerNode.length){let $r=v.producerIndexOfThis[P],Lt=v.producerNode[P];St(Lt),Lt.liveConsumerIndexOfThis[$r]=P}}}getPending(){if(!(0,r.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[C].producerNode.filter(v=>v.dirty).map(v=>v.wrapper)}}u=C,p=new WeakSet,E=function(){},b=new WeakSet,y=function(_){for(let $ of _)if(!(0,r.isComputed)($)&&!(0,r.isState)($))throw new TypeError("Called watch/unwatch without a Computed or State argument")},r.isWatcher=_=>bt(p,_),h.Watcher=xr;function yr(){var _;return(_=qr())==null?void 0:_.wrapper}h.currentComputed=yr,h.watched=Symbol("watched"),h.unwatched=Symbol("unwatched")})(r.subtle||(r.subtle={}))})(w||(w={}));var Et=!1,nr=new w.subtle.Watcher(()=>{Et||(Et=!0,queueMicrotask(()=>{Et=!1;for(let r of nr.getPending())r.get();nr.watch()}))}),so=Symbol("SignalWatcherBrand"),no=new FinalizationRegistry(r=>{r.unwatch(...w.subtle.introspectSources(r))}),ir=new WeakMap;function Ee(r){return r[so]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),r):class extends r{constructor(){super(...arguments),this._$St=new Map,this._$So=new w.State(0),this._$Si=!1}_$Sl(){var e,t;let o=[],s=[];this._$St.forEach((i,c)=>{(i?.beforeUpdate?o:s).push(c)});let n=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(i=>i!==this._$Su&&!this._$St.has(i));o.forEach(i=>i.get()),(t=this._$Su)===null||t===void 0||t.get(),n.forEach(i=>i.get()),s.forEach(i=>i.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new w.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new w.subtle.Watcher(function(){let t=ir.get(this);t!==void 0&&(t._$Si===!1&&(new Set(this.getPending()).has(t._$Su)?t.requestUpdate():t._$Sv()),this.watch())});ir.set(e,this),no.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([t])=>t))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...w.subtle.introspectSources(this.h).filter(t=>{var o;let s=((o=this._$St.get(t))===null||o===void 0?void 0:o.manualDispose)!==!0;return s&&this._$St.delete(t),e||(e=!s),s})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,t){var o;this._$S_();let s=new w.Computed(()=>{e()});return this.h.watch(s),this._$St.set(s,t),(o=t?.beforeUpdate)!==null&&o!==void 0&&o?w.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>w.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var Ze={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ke=r=>(...e)=>({_$litDirective$:r,values:e}),ae=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var{I:_s}=Xt;var ar=r=>r.strings===void 0;var Ce=(r,e)=>{let t=r._$AN;if(t===void 0)return!1;for(let o of t)o._$AO?.(e,!1),Ce(o,e);return!0},Xe=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while(t?.size===0)},lr=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),lo(e)}};function io(r){this._$AN!==void 0?(Xe(this),this._$AM=r,lr(this)):this._$AM=r}function ao(r,e=!1,t=0){let o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let n=t;n<o.length;n++)Ce(o[n],!1),Xe(o[n]);else o!=null&&(Ce(o,!1),Xe(o));else Ce(this,r)}var lo=r=>{r.type==Ze.CHILD&&(r._$AP??=ao,r._$AQ??=io)},Ye=class extends ae{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,o){super._$AT(e,t,o),lr(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Ce(this,e),Xe(this))}setValue(e){if(ar(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};var kt=!1,Ct=new w.subtle.Watcher(async()=>{kt||(kt=!0,queueMicrotask(()=>{kt=!1;for(let r of Ct.getPending())r.get();Ct.watch()}))}),Ve=class extends Ye{_$S_(){var e,t;this._$Sm===void 0&&(this._$Sj=new w.Computed(()=>{var o;let s=(o=this._$SW)===null||o===void 0?void 0:o.get();return this.setValue(s),s}),this._$Sm=(t=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&t!==void 0?t:Ct,this._$Sm.watch(this._$Sj),w.subtle.untrack(()=>{var o;return(o=this._$Sj)===null||o===void 0?void 0:o.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return w.subtle.untrack(()=>e.get())}update(e,[t]){var o,s;return(o=this._$Sk)!==null&&o!==void 0||(this._$Sk=(s=e.options)===null||s===void 0?void 0:s.host),t!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=t,this._$S_(),w.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},At=ke(Ve);var Rt=r=>(e,...t)=>r(e,...t.map(o=>o instanceof w.State||o instanceof w.Computed?At(o):o)),co=Rt(d),po=Rt(Qt);var Hs=w.State,js=w.Computed,L=(r,e)=>new w.State(r,e),le=(r,e)=>new w.Computed(r,e);var ho=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function cr(r,e=""){for(let{pattern:t,name:o}of ho){let s=t.exec(r);if(s)return{name:o,path:s[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var O=L(cr(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{O.set(cr(window.location.pathname,window.location.search))});var Ys=m`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,U=m`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Vs=m`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,dr=m`
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
`,ce=m`
  .label {
    font-weight: bold;
  }
`,pr=m`
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
`,hr=m`
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
`,en=m`
  .hidden {
    display: none !important;
  }
`;var uo=new Set(["file","-file","path","-path","repo","-repo","tags","-tags","case","lit","max_matches"]);function Pt(r){let e={},t="",o="",s="",n=r.trim(),i=/\[|\(|(?:^([a-zA-Z0-9\-_]+):|\\.)| /,c=!0;for(;n.length>0;){let h=i.exec(n);if(h===null){s+=n;break}s+=n.slice(0,h.index);let u=h[0];if(n=n.slice(h.index+u.length),c=c&&h.index===0,u===" ")o===""?s+=" ":(Ot(e,o,s),o="",s="");else if(u==="("||u==="["){let p=u==="("?")":"]",E=1,b=0,y=!1,H="";for(;b<n.length&&E>0;){let j=n[b];b++,y?y=!1:j==="\\"?y=!0:j===u?E++:j===p&&E--,H+=j}s+=u+H,n=n.slice(b)}else if(u.startsWith("\\"))s+=u;else{let p=h[1];o===""&&p&&uo.has(p)?(s.trim()!==""&&Ot(e,o,s),s="",o=p):s+=u}c=u===" "}Ot(e,o,s);let l=e[""]||[];return delete e[""],t=l.join(" ").trim(),{line:t,operators:e}}function Ot(r,e,t){r[e]||(r[e]=[]),r[e].push(t)}function ur(r,e={},t={}){let o=new URLSearchParams;if(r.trim()&&o.set("q",r.trim()),e.literal&&o.set("literal","true"),e.caseSensitive&&o.set("fold_case","false"),e.repos?.length)for(let s of e.repos)o.append("repo",s);for(let[s,n]of Object.entries(t))for(let i of n)o.append(s,i);return o}async function fr(r,e,t){let o="/api/search?"+r.toString(),s=await fetch(o,{signal:t});if(!s.ok){let n=await s.text();throw new Error(`search failed (${s.status}): ${n}`)}if(!s.body)throw new Error("response has no body");await fo(s.body,n=>{switch(n.type){case"result":e.onResult?.(n);break;case"file":e.onFile?.(n);break;case"facets":e.onFacets?.(n);break;case"done":e.onDone?.(n);break}})}async function fo(r,e){let t=r.getReader(),o=new TextDecoder,s="";try{for(;;){let{done:i,value:c}=await t.read();if(i)break;s+=o.decode(c,{stream:!0});let l;for(;(l=s.indexOf(`
`))!==-1;){let h=s.slice(0,l).trim();s=s.slice(l+1),h.length!==0&&e(JSON.parse(h))}}s+=o.decode();let n=s.trim();n.length>0&&e(JSON.parse(n))}finally{t.releaseLock()}}function de(r){let e=r.indexOf("/+/");if(e===-1)return{repo:r,version:"",filePath:""};let t=r.slice(0,e),o=r.slice(e+3),s=t.indexOf("/");return s===-1?{repo:t,version:"",filePath:o}:{repo:t.slice(0,s),version:t.slice(s+1),filePath:o}}var tt=class{constructor(){this.lastCommittedUrl=""}commit(e,t={},o={}){let s=ur(e,t,o),n=e?`${e} \xB7 code search`:"code search",i=et(s);if(!e)return this.lastCommittedUrl="",[{type:"replaceUrl",url:et(new URLSearchParams),title:n},{type:"clearResults"}];let c=[];return i!==this.lastCommittedUrl&&this.lastCommittedUrl!==""?c.push({type:"pushUrl",url:i,title:n}):c.push({type:"replaceUrl",url:i,title:n}),c.push({type:"search",params:s}),this.lastCommittedUrl=i,c}popstate(e,t){this.lastCommittedUrl=et(t);let o=e?`${e} \xB7 code search`:"code search",s=[{type:"replaceUrl",url:et(t),title:o}];return e?s.push({type:"search",params:t}):s.push({type:"clearResults"}),s}};function et(r){let e=r.toString();return"/search"+(e?"?"+e:"")}var fe=le(()=>O.get().params.get("q")??""),fn=le(()=>{let r=O.get().params;return{literal:r.get("literal")==="true",caseSensitive:r.get("fold_case")==="false"}}),mr=le(()=>{let r=O.get().params.get("context");if(r!==null){let e=parseInt(r,10);if(!isNaN(e)&&e>=0)return e}return 3}),mn=le(()=>Pt(fe.get())),pe=L([]),Ae=L([]),he=L(null),ue=L(null),B=L(!1),X=L(null),rt=L(!1),gr=le(()=>{let r=Ae.get();return rt.get()||r.length<=10?r:r.slice(0,10)}),Tt=null;async function mo(){Tt&&Tt.abort();let r=new AbortController;Tt=r;let e=fe.get();if(!e){pe.set([]),Ae.set([]),he.set(null),ue.set(null),B.set(!1),X.set(null),rt.set(!1);return}let t=O.get(),o=new URLSearchParams(t.params),s=Pt(e);rt.set(s.line===""),B.set(!0),X.set(null),pe.set([]),Ae.set([]),he.set(null),ue.set(null);let n=[],i=[],c=null;try{await fr(o,{onResult(l){n.push(l)},onFile(l){i.push(l)},onFacets(l){c=l},onDone(l){pe.set(n),Ae.set(i),he.set(c),ue.set(l),B.set(!1)},onError(l){r.signal.aborted||(X.set(l.message),B.set(!1))}},r.signal)}catch(l){r.signal.aborted||(X.set(l instanceof Error?l.message:String(l)),B.set(!1))}}var ot=new tt,Y=null;function vr(r,e={},t={}){Y&&clearTimeout(Y),Y=setTimeout(()=>{Y=null,nt(ot.commit(r,e,t))},200)}function st(r,e={},t={}){Y&&(clearTimeout(Y),Y=null),nt(ot.commit(r,e,t))}{let e=O.get().params.get("q")??"";e&&nt(ot.commit(e))}window.addEventListener("popstate",()=>{let r=O.get(),e=r.params.get("q")??"";nt(ot.popstate(e,r.params))});function nt(r){for(let e of r)switch(e.type){case"pushUrl":history.pushState(null,e.title,e.url),document.title=e.title,O.set({name:"search",params:new URLSearchParams(new URL(e.url,location.origin).search)});break;case"replaceUrl":history.replaceState(null,e.title,e.url),document.title=e.title,O.set({name:"search",params:new URLSearchParams(new URL(e.url,location.origin).search)});break;case"search":mo();break;case"clearResults":pe.set([]),Ae.set([]),he.set(null),ue.set(null),B.set(!1),X.set(null),rt.set(!1);break}}var V=class extends g{constructor(){super(...arguments);this.value="";this.error=""}render(){return d`
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
      </div>
    `}onInput(){let t=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:t.value},bubbles:!0,composed:!0}))}onKeydown(t){if(t.key==="Enter"){let o=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-submit",{detail:{value:o.value},bubbles:!0,composed:!0}))}}appendQuery(t){let o=this.renderRoot.querySelector("#searchbox");o&&(o.value+=t,this.value=o.value,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:o.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};V.styles=[hr,m`
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
    `],a([f()],V.prototype,"value",2),a([f()],V.prototype,"error",2),V=a([x("cs-search-input")],V);var I=class extends g{constructor(){super(...arguments);this.groups=[];this._open=!1;this._search="";this._selected=new Set;this._onOutsideClick=t=>{this._open&&(t.composedPath().includes(this)||(this._open=!1))}}get _options(){return this.groups.flatMap(t=>t.repos.map(o=>({value:o,label:o.split("/").pop()??o,group:t.label,selected:this._selected.has(o)})))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick)}get selectedRepos(){return[...this._selected]}get _buttonText(){let t=this._selected.size;return t===0?"(all repositories)":t<=4?this._options.filter(s=>s.selected).map(s=>s.label).join(", "):`(${t} repositories)`}get _filteredGroups(){let t=this._search.toLowerCase(),o=new Map;for(let s of this._options)t&&!s.value.toLowerCase().includes(t)&&!s.label.toLowerCase().includes(t)||(o.has(s.group)||o.set(s.group,[]),o.get(s.group).push(s));return[...o.entries()].map(([s,n])=>({label:s,options:n}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(t){let o=new Set(this._selected);o.has(t)?o.delete(t):o.add(t),this._selected=o,this._fireChange()}_selectAll(){this._selected=new Set(this._options.map(t=>t.value)),this._fireChange()}_deselectAll(){this._selected=new Set,this._fireChange()}_toggleGroup(t){let o=this._options.filter(i=>i.group===t).map(i=>i.value),s=o.every(i=>this._selected.has(i)),n=new Set(this._selected);for(let i of o)s?n.delete(i):n.add(i);this._selected=n,this._fireChange()}_fireChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}_onSearchInput(t){this._search=t.target.value}_onSearchKeydown(t){t.key==="Enter"&&(t.preventDefault(),this._search=""),t.key==="Escape"&&(this._open=!1)}render(){return d`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():S}
        `}_renderDropdown(){let t=this._filteredGroups;return d`
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
        `}_renderGroup(t){return t.label?d`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(t.label)}>${t.label}</div>
                ${t.options.map(o=>this._renderOption(o))}
            </div>
        `:t.options.map(o=>this._renderOption(o))}_renderOption(t){return d`
            <label class="option ${t.selected?"selected":""}">
                <input type="checkbox" .checked=${t.selected} @change=${()=>this._toggleOption(t.value)} />
                ${t.label}
            </label>
        `}};I.styles=m`
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
    `,a([f({type:Array})],I.prototype,"groups",2),a([A()],I.prototype,"_open",2),a([A()],I.prototype,"_search",2),a([A()],I.prototype,"_selected",2),I=a([x("repo-select")],I);var ee=class extends g{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let t=this.options.caseSensitive?"false":"auto";return d`
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
    `}setCase(t){let o=t==="false";this.options={...this.options,caseSensitive:o},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}onRepoChange(){let o=this.renderRoot.querySelector("repo-select")?.selectedRepos??[];this.options={...this.options,repos:o.length>0?o:void 0},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};ee.styles=[pr,ce,m`
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
    `],a([f({type:Object})],ee.prototype,"options",2),a([f({type:Array})],ee.prototype,"repos",2),ee=a([x("cs-search-options")],ee);var Nt=ke(class extends ae{constructor(r){if(super(r),r.type!==Ze.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((e=>r[e])).join(" ")+" "}update(r,[e]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let t=r.element.classList;for(let o of this.st)o in e||(t.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return q}});var K=class extends g{render(){return this.start!=null&&this.end!=null?d`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:d`${this.text}`}};K.styles=m`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,a([f()],K.prototype,"text",2),a([f({type:Number})],K.prototype,"start",2),a([f({type:Number})],K.prototype,"end",2),K=a([x("match-str")],K);var N=class extends g{render(){return d`<div class="filename-match">
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
    `,a([f()],N.prototype,"text",2),a([f()],N.prototype,"href",2),a([f({type:Number})],N.prototype,"start",2),a([f({type:Number})],N.prototype,"end",2),a([f()],N.prototype,"repo",2),a([f()],N.prototype,"version",2),N=a([x("filename-match")],N);var M=class extends g{render(){let e=this.start!=null&&this.end!=null;return d`<a class=${Nt({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Nt({matchline:e})}
                >${e?d`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};M.styles=m`
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
    `,a([f({type:Number})],M.prototype,"lineNo",2),a([f()],M.prototype,"text",2),a([f()],M.prototype,"href",2),a([f({type:Number})],M.prototype,"start",2),a([f({type:Number})],M.prototype,"end",2),M=a([x("match-line")],M);function go(r){let e=r.lastIndexOf("/");return e<0?".":r.slice(0,e)}function vo(r){let e=r.lastIndexOf("/");return e<0?r:r.slice(e+1)}var te=class extends g{constructor(){super(...arguments);this.noContext=!1}render(){let{repo:t,version:o,filePath:s}=de(this.result.path),n=`/view/${this.result.path}`,i=this.splitGroups(this.result.lines),c=o.length>6?o.slice(0,6):o,l=go(s),h=vo(s);return d`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${n}>
              <span class="repo">${t}:</span><span class="version">${c}:</span>${l}/<span class="filename">${h}</span>
            </a>
          </span>
        </div>
        ${i.map(u=>d`
            <div class="match">
              <div class="contents">
                ${u.map(p=>{let E=p[0],b=p[1],y=p.length>2?p[2]:void 0,H=y!==void 0&&y.length>0,j=`${n}#L${E}`,it=H&&y?y[0][0]:void 0,at=H&&y?y[0][1]:void 0;return d`
                    <match-line
                      class=${H?"match-hit":"context"}
                      .lineNo=${E}
                      text=${b}
                      href=${j}
                      .start=${it}
                      .end=${at}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(t){let o=[],s=[];for(let n of t)n===null?s.length>0&&(o.push(s),s=[]):s.push(n);return s.length>0&&o.push(s),o}};te.styles=[dr,U,m`
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
    `],a([f({type:Object})],te.prototype,"result",2),a([f({type:Boolean,reflect:!0,attribute:"no-context"})],te.prototype,"noContext",2),te=a([x("cs-result-group")],te);var W=class extends g{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return d`<div id="countarea">Searching...</div>`;let t=this.truncated?`${this.total}+`:`${this.total}`;return d`
      <div id="countarea">
        <span id="numresults">${t}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};W.styles=[ce,m`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],a([f({type:Number})],W.prototype,"total",2),a([f({type:Number})],W.prototype,"timeMs",2),a([f({type:Boolean})],W.prototype,"truncated",2),a([f({type:Boolean})],W.prototype,"loading",2),W=a([x("cs-result-stats")],W);var re=class extends g{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){let t=this.facets&&(this.facets.ext?.length||this.facets.repo?.length||this.facets.path?.length),o=Object.values(this.selected).some(i=>i.size>0);if(!t&&!o)return S;let n=[{label:"Extension",key:"f.ext",buckets:this.facets?.ext??[]},{label:"Repository",key:"f.repo",buckets:this.facets?.repo??[]},{label:"Path",key:"f.path",buckets:this.facets?.path??[]}].filter(i=>i.buckets.length>0||(this.selected[i.key]?.size??0)>0);return n.length===0?S:d`
      <div class="panel">
        ${n.map(i=>this.renderSection(i.label,i.key,i.buckets))}
      </div>
    `}renderSection(t,o,s){let n=this.selected[o]??new Set,c=[...s].sort((u,p)=>p.c-u.c||u.v.localeCompare(p.v)).slice(0,10),l=new Set(c.map(u=>u.v)),h=[...n].filter(u=>!l.has(u));return d`
      <div class="section">
        <span class="section-label">${t}</span>
        ${h.map(u=>d`
          <button
            class="pill stale"
            @click=${()=>this.toggle(o,u)}
          >${u}</button>
        `)}
        ${c.map(u=>d`
          <button
            class=${n.has(u.v)?"pill active":"pill"}
            @click=${()=>this.toggle(o,u.v)}
          >${u.v} <span class="count">${u.c}</span></button>
        `)}
      </div>
    `}toggle(t,o){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:t,value:o},bubbles:!0,composed:!0}))}};re.styles=m`
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
  `,a([f({type:Object})],re.prototype,"facets",2),a([f({type:Object})],re.prototype,"selected",2),re=a([x("cs-facet-panel")],re);var Re=class extends g{render(){return d`
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
    `}};Re.styles=[U,m`
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
    `],Re=a([x("cs-search-help")],Re);function bo(r){let e={};for(let t of["f.ext","f.repo","f.path"]){let o=r.getAll(t);o.length>0&&(e[t]=new Set(o))}return e}var Oe=class extends Ee(g){constructor(){super(...arguments);this.currentOptions={}}get activeFacets(){return bo(O.get().params)}render(){let t=fe.get(),o=pe.get(),s=gr.get(),n=ue.get(),i=B.get(),c=X.get(),l=he.get(),h=mr.get(),u=n||i;return d`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${p=>p.preventDefault()}
        >
          <cs-search-input
            .value=${t}
            .error=${c??""}
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
        ${u?d`
          <div id="resultarea">
            <cs-result-stats
              .total=${n?.total??0}
              .timeMs=${n?.time_ms??0}
              .truncated=${n?.truncated??!1}
              .loading=${i}
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
                ${s.map(p=>{let{repo:E,version:b,filePath:y}=de(p.path);return d`
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
                ${o.map(p=>d`
                  <cs-result-group .result=${p} ?no-context=${h<=0}></cs-result-group>
                `)}
              </div>
            </div>
          </div>
        `:d`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(t){let{key:o,value:s}=t.detail,n=this.activeFacets,i=n[o]??new Set,c;o==="f.path"?i.has(s)?c=new Set:c=new Set([s]):(c=new Set(i),c.has(s)?c.delete(s):c.add(s));let l={...n,[o]:c},h=fe.get();h&&st(h,this.currentOptions,this.facetParamsFrom(l))}onSearchInput(t){vr(t.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onSearchSubmit(t){st(t.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onOptionsChange(t){this.currentOptions=t.detail,this.reSearch()}reSearch(){let t=fe.get();t&&st(t,this.currentOptions,this.facetParamsFrom(this.activeFacets))}getRepos(){return window.__CS_INIT?.repos??[]}facetParamsFrom(t){let o={};for(let[s,n]of Object.entries(t))n.size>0&&(o[s]=[...n]);return o}};Oe.styles=[U,ce,m`
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

    `],Oe=a([x("cs-search-view")],Oe);var me=class extends g{constructor(){super(...arguments);this.path=""}render(){let t=this.path.indexOf("/+/");if(t===-1)return d`<span>${this.path}</span>`;let o=this.path.slice(0,t),n=this.path.slice(t+3).split("/").filter(i=>i.length>0);return d`
      <nav class="breadcrumbs">
        <a href="/view/${o}/+/">${o}</a>
        ${n.map((i,c)=>{let l=n.slice(0,c+1).join("/"),h=`/view/${o}/+/${l}${c<n.length-1?"/":""}`;return d`<span class="sep">/</span><a href=${h}>${i}</a>`})}
      </nav>
    `}};me.styles=m`
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
  `,a([f()],me.prototype,"path",2),me=a([x("cs-breadcrumbs")],me);var oe=class extends g{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let t=[...this.entries].sort((o,s)=>{let n=o.endsWith("/"),i=s.endsWith("/");return n!==i?n?-1:1:o.localeCompare(s)});return d`
      <div class="listing">
        ${t.map(o=>{let s=o.endsWith("/"),n=this.basePath+o;return d`
            <a class=${s?"dir":"file"} href=${n}>${o}</a>
          `})}
      </div>
    `}};oe.styles=m`
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
  `,a([f({type:Array})],oe.prototype,"entries",2),a([f()],oe.prototype,"basePath",2),oe=a([x("cs-dir-listing")],oe);function xo(r,e){return r<0?"1":r===e?String(r):`${r}-L${e}`}function yo(r,e,t){return r?r.replace("{lno}",xo(e,t)):""}function $o(r){let e=r.match(/^#L(\d+)(?:-L?(\d+))?$/);if(!e)return[-1,-1];let t=parseInt(e[1],10),o=e[2]?parseInt(e[2],10):t;return[t,o]}var T=class extends g{constructor(){super(...arguments);this.content="";this.basePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.hasSelection=!1;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onSelectionChange=()=>{this.hasSelection=(window.getSelection()?.toString()||"").length>0};this.onKeyDown=t=>{t.target.matches("input,textarea")||t.altKey||t.ctrlKey||t.metaKey||this.processKey(t.key)&&t.preventDefault()}}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("selectionchange",this.onSelectionChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("selectionchange",this.onSelectionChange)}parseHash(){let[t,o]=$o(window.location.hash);this.selectedStart=t,this.selectedEnd=o}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let t=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!t)return;let o=window.innerHeight,s=Math.floor(o/3);if(this.selectedStart!==this.selectedEnd){let i=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(i){let c=t.getBoundingClientRect(),l=i.getBoundingClientRect(),h=l.top+l.height-c.top;h<=o?s=.5*(o-h):s=t.offsetHeight/2}}let n=t.getBoundingClientRect();window.scrollTo(0,n.top+window.scrollY-s)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){return yo(this.externalUrl,this.selectedStart,this.selectedEnd)}getSelectedText(){return window.getSelection()?.toString()||""}processKey(t){switch(t){case"Enter":{let o=this.getSelectedText();return o&&window.open(`/search?q=${encodeURIComponent(o)}`),!0}case"/":{this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));let o=this.getSelectedText();return window.location.href=`/search${o?"?q="+encodeURIComponent(o):""}`,!0}case"?":return this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0})),!0;case"Escape":return this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0})),!0;case"v":{let o=this.resolvedExternalUrl();return o&&(window.location.href=o),!0}case"n":case"p":{let o=this.getSelectedText();return o&&window.find(o,!1,t==="p"),!0}}return!1}render(){let t=this.content.split(`
`);return t.length>0&&t[t.length-1]===""&&t.pop(),d`
      ${this.hasSelection?d`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      `:""}
      <div class="viewer">
        ${t.map((o,s)=>{let n=s+1,i=n>=this.selectedStart&&n<=this.selectedEnd;return d`
            <div class="line ${i?"selected":""}" id="L${n}">
              <a class="lno" href="#L${n}" @click=${c=>this.onLineClick(c,n)}>${n}</a>
              <span class="code">${o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(t,o){if(t.shiftKey&&this.selectedStart>0){t.preventDefault();let s=Math.min(this.selectedStart,o),n=Math.max(this.selectedStart,o);this.selectedStart=s,this.selectedEnd=n,history.replaceState(null,"",`#L${s}-L${n}`)}else this.selectedStart=o,this.selectedEnd=o}};T.styles=m`
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
  `,a([f()],T.prototype,"content",2),a([f()],T.prototype,"basePath",2),a([f()],T.prototype,"repo",2),a([f()],T.prototype,"version",2),a([f()],T.prototype,"externalUrl",2),a([A()],T.prototype,"selectedStart",2),a([A()],T.prototype,"selectedEnd",2),a([A()],T.prototype,"hasSelection",2),T=a([x("cs-code-viewer")],T);var ge=class extends g{constructor(){super(...arguments);this.open=!1}render(){return this.open?d`
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
    `:d``}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}))}};ge.styles=m`
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
  `,a([f({type:Boolean,reflect:!0})],ge.prototype,"open",2),ge=a([x("cs-help-modal")],ge);function wo(r){let e=r.indexOf("/+/");if(e>=0){let t=r.slice(0,e),o=r.slice(e+3),s=t.lastIndexOf("@");if(s>=0)return{repo:t.slice(0,s),version:t.slice(s+1),filePath:o}}return de(r)}function _o(r,e,t){let o="github.com/";return r.startsWith(o)?`https://github.com/${r.slice(o.length)}/blob/${e}/${t}#L{lno}`:""}var R=class extends g{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null;this.showHelp=!1}willUpdate(t){t.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let t=this.path.endsWith("/")||this.path.endsWith("/+/")||!this.path.includes("/+/"),o=`/raw/${this.path}${t&&!this.path.endsWith("/")?"/":""}`;try{let s=await fetch(o);if(!s.ok){this.error=`Not found (${s.status})`,this.loading=!1;return}(s.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await s.json(),this.fetchReadme(o)):this.content=await s.text()}catch(s){this.error=s instanceof Error?s.message:String(s)}this.loading=!1}async fetchReadme(t){if(!this.dirEntries)return;let o=this.dirEntries.find(s=>R.README_RE.test(s));if(o)try{let s=t.endsWith("/")?t:t+"/",n=await fetch(s+o);n.ok&&(this.readmeContent=await n.text())}catch{}}render(){let t=wo(this.path),o=t.repo,s=t.version,n=_o(t.repo,t.version,t.filePath);return d`
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
  `,a([f()],R.prototype,"path",2),a([A()],R.prototype,"content",2),a([A()],R.prototype,"dirEntries",2),a([A()],R.prototype,"readmeContent",2),a([A()],R.prototype,"loading",2),a([A()],R.prototype,"error",2),a([A()],R.prototype,"showHelp",2),R=a([x("cs-file-view")],R);var Pe=class extends g{render(){return d`
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
    `}};Pe.styles=[U,m`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Pe=a([x("cs-about-view")],Pe);var Te=class extends Ee(g){render(){let e=O.get();return d`
      <main>${this.renderView(e)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(e){switch(e.name){case"search":return d`<cs-search-view></cs-search-view>`;case"view":return d`<cs-file-view .path=${e.path??""}></cs-file-view>`;case"about":return d`<cs-about-view></cs-about-view>`;default:return d`<div class="placeholder">Not found</div>`}}};Te.styles=[U,m`
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
    `],Te=a([x("cs-app")],Te);export{Te as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
