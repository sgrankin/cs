var Ye=Object.defineProperty;var tr=Object.getOwnPropertyDescriptor;var Se=(s,t)=>()=>(s&&(t=s(s=0)),t);var er=(s,t)=>{for(var e in t)Ye(s,e,{get:t[e],enumerable:!0})};var d=(s,t,e,r)=>{for(var i=r>1?void 0:r?tr(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Ye(t,e,i),i};var Pt,Os=Se(()=>{Pt=class{constructor(t){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,t?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(t,e){let r=this._map.get(t)||0;this._map.set(t,e),this.totalSize+=e-r}get averageSize(){if(this._map.size>0){let t=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(t):t}return 0}getSize(t){return this._map.get(t)}clear(){this._map.clear(),this.totalSize=0}}});function Fe(s){return s==="horizontal"?"width":"height"}var he,Ns=Se(()=>{he=class{_getDefaultConfig(){return{direction:"vertical"}}constructor(t,e){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=t,Promise.resolve().then(()=>this.config=e||this._getDefaultConfig())}set config(t){Object.assign(this,Object.assign({},this._getDefaultConfig(),t))}get config(){return{direction:this.direction}}get items(){return this._items}set items(t){this._setItems(t)}_setItems(t){t!==this._items&&(this._items=t,this._scheduleReflow())}get direction(){return this._direction}set direction(t){t=t==="horizontal"?t:"vertical",t!==this._direction&&(this._direction=t,this._sizeDim=t==="horizontal"?"width":"height",this._secondarySizeDim=t==="horizontal"?"height":"width",this._positionDim=t==="horizontal"?"left":"top",this._secondaryPositionDim=t==="horizontal"?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(t){let{_viewDim1:e,_viewDim2:r}=this;Object.assign(this._viewportSize,t),r!==this._viewDim2?this._scheduleLayoutUpdate():e!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(t){Object.assign(this._latestCoords,t);let e=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(e-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(t=!1){(t||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(t){this._pin=t,this._triggerReflow()}get pin(){if(this._pin!==null){let{index:t,block:e}=this._pin;return{index:Math.max(0,Math.min(t,this.items.length-1)),block:e}}return null}_clampScrollPosition(t){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(t,this.totalScrollSize[Fe(this.direction)]-this._viewDim1))}unpin(){this._pin!==null&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(this.pin!==null){let t=this._scrollPosition,{index:e,block:r}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:e,block:r||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=t-this._scrollPosition}}_calculateScrollIntoViewPosition(t){let{block:e}=t,r=Math.min(this.items.length,Math.max(0,t.index)),i=this._getItemPosition(r)[this._positionDim],o=i;if(e!=="start"){let n=this._getItemSize(r)[this._sizeDim];if(e==="center")o=i-.5*this._viewDim1+.5*n;else{let l=i-this._viewDim1+n;if(e==="end")o=l;else{let a=this._scrollPosition;o=Math.abs(a-i)<Math.abs(a-l)?i:l}}}return o+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(o)}getScrollIntoViewCoordinates(t){return{[this._positionDim]:this._calculateScrollIntoViewPosition(t)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let t=new Map;if(this._first!==-1&&this._last!==-1)for(let r=this._first;r<=this._last;r++)t.set(r,this._getItemPosition(r));let e={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:t};this._scrollError&&(e.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(e)}get _num(){return this._first===-1||this._last===-1?0:this._last-this._first+1}_checkThresholds(){if(this._viewDim1===0&&this._num>0||this._pin!==null)this._scheduleReflow();else{let t=Math.max(0,this._scrollPosition-this._overhang),e=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>t||this._physicalMax<e?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(t){if(this._first===-1||this._last===-1)return;let e=this._first;for(;e<this._last&&Math.round(this._getItemPosition(e)[this._positionDim]+this._getItemSize(e)[this._sizeDim])<=Math.round(this._scrollPosition);)e++;let r=this._last;for(;r>this._first&&Math.round(this._getItemPosition(r)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)r--;(e!==this._firstVisible||r!==this._lastVisible)&&(this._firstVisible=e,this._lastVisible=r,t&&t.emit&&this._sendVisibilityChangedMessage())}}});var Us={};er(Us,{FlowLayout:()=>de,flow:()=>Fr});function Ds(s){return s==="horizontal"?"marginLeft":"marginTop"}function Kr(s){return s==="horizontal"?"marginRight":"marginBottom"}function Gr(s){return s==="horizontal"?"xOffset":"yOffset"}function Jr(s,t){let e=[s,t].sort();return e[1]<=0?Math.min(...e):e[0]>=0?Math.max(...e):e[0]+e[1]}var Fr,Ke,de,Ws=Se(()=>{Os();Ns();Fr=s=>Object.assign({type:de},s);Ke=class{constructor(){this._childSizeCache=new Pt,this._marginSizeCache=new Pt,this._metricsCache=new Map}update(t,e){let r=new Set;Object.keys(t).forEach(i=>{let o=Number(i);this._metricsCache.set(o,t[o]),this._childSizeCache.set(o,t[o][Fe(e)]),r.add(o),r.add(o+1)});for(let i of r){let o=this._metricsCache.get(i)?.[Ds(e)]||0,n=this._metricsCache.get(i-1)?.[Kr(e)]||0;this._marginSizeCache.set(i,Jr(o,n))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(t,e){return this._metricsCache.get(t)?.[Ds(e)]||0}getChildSize(t){return this._childSizeCache.getSize(t)}getMarginSize(t){return this._marginSizeCache.getSize(t)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}},de=class extends he{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new Ke,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(t){this._metricsCache.update(t,this.direction),this._scheduleReflow()}_getPhysicalItem(t){return this._newPhysicalItems.get(t)??this._physicalItems.get(t)}_getSize(t){return this._getPhysicalItem(t)&&this._metricsCache.getChildSize(t)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(t){let e=this._metricsCache;if(this._first===-1||this._last===-1)return e.averageMarginSize+t*(e.averageMarginSize+this._getAverageSize());if(t<this._first){let r=this._first-t;return this._getPhysicalItem(this._first).pos-(e.getMarginSize(this._first-1)||e.averageMarginSize)-(r*e.averageChildSize+(r-1)*e.averageMarginSize)}else{let r=t-this._last;return this._getPhysicalItem(this._last).pos+(e.getChildSize(this._last)||e.averageChildSize)+(e.getMarginSize(this._last)||e.averageMarginSize)+r*(e.averageChildSize+e.averageMarginSize)}}_getPosition(t){let e=this._getPhysicalItem(t),{averageMarginSize:r}=this._metricsCache;return t===0?this._metricsCache.getMarginSize(0)??r:e?e.pos:this._estimatePosition(t)}_calculateAnchor(t,e){return t<=0?0:e>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((t+e)/2/this._delta)))}_getAnchor(t,e){if(this._physicalItems.size===0)return this._calculateAnchor(t,e);if(this._first<0)return this._calculateAnchor(t,e);if(this._last<0)return this._calculateAnchor(t,e);let r=this._getPhysicalItem(this._first),i=this._getPhysicalItem(this._last),o=r.pos;if(i.pos+this._metricsCache.getChildSize(this._last)<t)return this._calculateAnchor(t,e);if(o>e)return this._calculateAnchor(t,e);let a=this._firstVisible-1,c=-1/0;for(;c<t;)c=this._getPhysicalItem(++a).pos+this._metricsCache.getChildSize(a);return a}_getActiveItems(){this._viewDim1===0||this.items.length===0?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let t=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=t,this._stable=!0}_getItems(){let t=this._newPhysicalItems;this._stable=!0;let e,r;if(this.pin!==null){let{index:c}=this.pin;this._anchorIdx=c,this._anchorPos=this._getPosition(c)}if(e=this._scrollPosition-this._overhang,r=this._scrollPosition+this._viewDim1+this._overhang,r<0||e>this._scrollSize){this._clearItems();return}(this._anchorIdx===null||this._anchorPos===null)&&(this._anchorIdx=this._getAnchor(e,r),this._anchorPos=this._getPosition(this._anchorIdx));let i=this._getSize(this._anchorIdx);i===void 0&&(this._stable=!1,i=this._getAverageSize());let o=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,n=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;this._anchorIdx===0&&(this._anchorPos=o),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-n-i);let l=0;for(this._anchorPos+i+n<e&&(l=e-(this._anchorPos+i+n)),this._anchorPos-o>r&&(l=r-(this._anchorPos-o)),l&&(this._scrollPosition-=l,e-=l,r-=l,this._scrollError+=l),t.set(this._anchorIdx,{pos:this._anchorPos,size:i}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-o,this._physicalMax=this._anchorPos+i+n;this._physicalMin>e&&this._first>0;){let c=this._getSize(--this._first);c===void 0&&(this._stable=!1,c=this._getAverageSize());let p=this._metricsCache.getMarginSize(this._first);p===void 0&&(this._stable=!1,p=this._metricsCache.averageMarginSize),this._physicalMin-=c;let h=this._physicalMin;if(t.set(this._first,{pos:h,size:c}),this._physicalMin-=p,this._stable===!1&&this._estimate===!1)break}for(;this._physicalMax<r&&this._last<this.items.length-1;){let c=this._getSize(++this._last);c===void 0&&(this._stable=!1,c=this._getAverageSize());let p=this._metricsCache.getMarginSize(this._last);p===void 0&&(this._stable=!1,p=this._metricsCache.averageMarginSize);let h=this._physicalMax;if(t.set(this._last,{pos:h,size:c}),this._physicalMax+=c+p,!this._stable&&!this._estimate)break}let a=this._calculateError();a&&(this._physicalMin-=a,this._physicalMax-=a,this._anchorPos-=a,this._scrollPosition-=a,t.forEach(c=>c.pos-=a),this._scrollError+=a),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=t)}_calculateError(){return this._first===0?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:t,_last:e}=this;super._reflow(),(this._first===-1&&this._last==-1||this._first===t&&this._last===e)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:t}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(t+this._getAverageSize())+t)}get _delta(){let{averageMarginSize:t}=this._metricsCache;return this._getAverageSize()+t}_getItemPosition(t){return{[this._positionDim]:this._getPosition(t),[this._secondaryPositionDim]:0,[Gr(this.direction)]:-(this._metricsCache.getLeadingMarginValue(t,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(t){return{[this._sizeDim]:this._getSize(t)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}});var qt=globalThis,jt=qt.ShadowRoot&&(qt.ShadyCSS===void 0||qt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),Xe=new WeakMap,_t=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(jt&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=Xe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Xe.set(e,t))}return t}toString(){return this.cssText}},ts=s=>new _t(typeof s=="string"?s:s+"",void 0,we),g=(s,...t)=>{let e=s.length===1?s[0]:t.reduce(((r,i,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[o+1]),s[0]);return new _t(e,s,we)},es=(s,t)=>{if(jt)s.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let r=document.createElement("style"),i=qt.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,s.appendChild(r)}},$e=jt?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return ts(e)})(s):s;var{is:sr,defineProperty:rr,getOwnPropertyDescriptor:ir,getOwnPropertyNames:or,getOwnPropertySymbols:nr,getPrototypeOf:ar}=Object,Bt=globalThis,ss=Bt.trustedTypes,lr=ss?ss.emptyScript:"",cr=Bt.reactiveElementPolyfillSupport,vt=(s,t)=>s,bt={toAttribute(s,t){switch(t){case Boolean:s=s?lr:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Ft=(s,t)=>!sr(s,t),rs={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:Ft};Symbol.metadata??=Symbol("metadata"),Bt.litPropertyMetadata??=new WeakMap;var V=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=rs){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&rr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){let{get:i,set:o}=ir(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let l=i?.call(this);o?.call(this,n),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??rs}static _$Ei(){if(this.hasOwnProperty(vt("elementProperties")))return;let t=ar(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(vt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(vt("properties"))){let e=this.properties,r=[...or(e),...nr(e)];for(let i of r)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let i of r)e.unshift($e(i))}else t!==void 0&&e.push($e(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return es(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:bt).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=r.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:bt;this._$Em=i;let l=n.fromAttribute(e,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){let i=this.constructor,o=this[t];if(r??=i.getPropertyOptions(t),!((r.hasChanged??Ft)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:o},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,o]of r){let{wrapped:n}=o,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[vt("elementProperties")]=new Map,V[vt("finalized")]=new Map,cr?.({ReactiveElement:V}),(Bt.reactiveElementVersions??=[]).push("2.1.1");var Ce=globalThis,Kt=Ce.trustedTypes,is=Kt?Kt.createPolicy("lit-html",{createHTML:s=>s}):void 0,ke="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+H,hr=`<${Ae}>`,Y=document,xt=()=>Y.createComment(""),St=s=>s===null||typeof s!="object"&&typeof s!="function",ze=Array.isArray,hs=s=>ze(s)||typeof s?.[Symbol.iterator]=="function",Ee=`[ 	
\f\r]`,yt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,os=/-->/g,ns=/>/g,Q=RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),as=/'/g,ls=/"/g,ds=/^(?:script|style|textarea|title)$/i,Pe=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),u=Pe(1),us=Pe(2),$i=Pe(3),I=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),cs=new WeakMap,Z=Y.createTreeWalker(Y,129);function ps(s,t){if(!ze(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return is!==void 0?is.createHTML(t):t}var fs=(s,t)=>{let e=s.length-1,r=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=yt;for(let l=0;l<e;l++){let a=s[l],c,p,h=-1,y=0;for(;y<a.length&&(n.lastIndex=y,p=n.exec(a),p!==null);)y=n.lastIndex,n===yt?p[1]==="!--"?n=os:p[1]!==void 0?n=ns:p[2]!==void 0?(ds.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=Q):p[3]!==void 0&&(n=Q):n===Q?p[0]===">"?(n=i??yt,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?Q:p[3]==='"'?ls:as):n===ls||n===as?n=Q:n===os||n===ns?n=yt:(n=Q,i=void 0);let f=n===Q&&s[l+1].startsWith("/>")?" ":"";o+=n===yt?a+hr:h>=0?(r.push(c),a.slice(0,h)+ke+a.slice(h)+H+f):a+H+(h===-2?l:f)}return[ps(s,o+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},wt=class s{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[c,p]=fs(t,e);if(this.el=s.createElement(c,r),Z.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=Z.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(ke)){let y=p[n++],f=i.getAttribute(h).split(H),v=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:v[2],strings:f,ctor:v[1]==="."?Jt:v[1]==="?"?Qt:v[1]==="@"?Zt:tt}),i.removeAttribute(h)}else h.startsWith(H)&&(a.push({type:6,index:o}),i.removeAttribute(h));if(ds.test(i.tagName)){let h=i.textContent.split(H),y=h.length-1;if(y>0){i.textContent=Kt?Kt.emptyScript:"";for(let f=0;f<y;f++)i.append(h[f],xt()),Z.nextNode(),a.push({type:2,index:++o});i.append(h[y],xt())}}}else if(i.nodeType===8)if(i.data===Ae)a.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(H,h+1))!==-1;)a.push({type:7,index:o}),h+=H.length-1}o++}}static createElement(t,e){let r=Y.createElement("template");return r.innerHTML=t,r}};function X(s,t,e=s,r){if(t===I)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl,o=St(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(s),i._$AT(s,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=X(s,i._$AS(s,t.values),i,r)),t}var Gt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??Y).importNode(e,!0);Z.currentNode=i;let o=Z.nextNode(),n=0,l=0,a=r[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new at(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new Yt(o,this,t)),this._$AV.push(c),a=r[++l]}n!==a?.index&&(o=Z.nextNode(),n++)}return Z.currentNode=Y,i}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},at=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),St(t)?t===E||t==null||t===""?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):hs(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==E&&St(this._$AH)?this._$AA.nextSibling.data=t:this.T(Y.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=wt.createElement(ps(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new Gt(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=cs.get(t.strings);return e===void 0&&cs.set(t.strings,e=new wt(t)),e}k(t){ze(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let o of t)i===e.length?e.push(r=new s(this.O(xt()),this.O(xt()),this,this.options)):r=e[i],r._$AI(o),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},tt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,o){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=E}_$AI(t,e=this,r,i){let o=this.strings,n=!1;if(o===void 0)t=X(this,t,e,0),n=!St(t)||t!==this._$AH&&t!==I,n&&(this._$AH=t);else{let l=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=X(this,l[r+a],e,a),c===I&&(c=this._$AH[a]),n||=!St(c)||c!==this._$AH[a],c===E?t=E:t!==E&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!i&&this.j(t)}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Jt=class extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===E?void 0:t}},Qt=class extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E)}},Zt=class extends tt{constructor(t,e,r,i,o){super(t,e,r,i,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??E)===I)return;let r=this._$AH,i=t===E&&r!==E||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==E&&(r===E||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Yt=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}},ms={M:ke,P:H,A:Ae,C:1,L:fs,R:Gt,D:hs,V:X,I:at,H:tt,N:Qt,U:Zt,B:Jt,F:Yt},dr=Ce.litHtmlPolyfillSupport;dr?.(wt,at),(Ce.litHtmlVersions??=[]).push("3.3.1");var gs=(s,t,e)=>{let r=e?.renderBefore??t,i=r._$litPart$;if(i===void 0){let o=e?.renderBefore??null;r._$litPart$=i=new at(t.insertBefore(xt(),o),o,void 0,e??{})}return i._$AI(s),i};var Re=globalThis,_=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gs(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};_._$litElement$=!0,_.finalized=!0,Re.litElementHydrateSupport?.({LitElement:_});var ur=Re.litElementPolyfillSupport;ur?.({LitElement:_});(Re.litElementVersions??=[]).push("4.2.1");var x=s=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(s,t)})):customElements.define(s,t)};var pr={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:Ft},fr=(s=pr,t,e)=>{let{kind:r,metadata:i}=e,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(e.name,s),r==="accessor"){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,s)},init(l){return l!==void 0&&this.C(n,void 0,s,l),l}}}if(r==="setter"){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,s)}}throw Error("Unsupported decorator location: "+r)};function m(s){return(t,e)=>typeof e=="object"?fr(s,t,e):((r,i,o)=>{let n=i.hasOwnProperty(o);return i.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(i,o):void 0})(s,t,e)}function z(s){return m({...s,state:!0,attribute:!1})}var mr=Object.defineProperty,gr=(s,t,e)=>t in s?mr(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,Me=(s,t,e)=>(gr(s,typeof t!="symbol"?t+"":t,e),e),_r=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)},Ie=(s,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return s.has(t)},te=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},_s=(s,t,e)=>(_r(s,t,"access private method"),e);function vs(s,t){return Object.is(s,t)}var C=null,$t=!1,ee=1,se=Symbol("SIGNAL");function lt(s){let t=C;return C=s,t}function vr(){return C}function br(){return $t}var De={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function re(s){if($t)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(C===null)return;C.consumerOnSignalRead(s);let t=C.nextProducerIndex++;if(ct(C),t<C.producerNode.length&&C.producerNode[t]!==s&&Oe(C)){let e=C.producerNode[t];ie(e,C.producerIndexOfThis[t])}C.producerNode[t]!==s&&(C.producerNode[t]=s,C.producerIndexOfThis[t]=Oe(C)?xs(s,C,t):0),C.producerLastReadVersion[t]=s.version}function yr(){ee++}function bs(s){if(!(!s.dirty&&s.lastCleanEpoch===ee)){if(!s.producerMustRecompute(s)&&!Er(s)){s.dirty=!1,s.lastCleanEpoch=ee;return}s.producerRecomputeValue(s),s.dirty=!1,s.lastCleanEpoch=ee}}function ys(s){if(s.liveConsumerNode===void 0)return;let t=$t;$t=!0;try{for(let e of s.liveConsumerNode)e.dirty||Sr(e)}finally{$t=t}}function xr(){return C?.consumerAllowSignalWrites!==!1}function Sr(s){var t;s.dirty=!0,ys(s),(t=s.consumerMarkedDirty)==null||t.call(s.wrapper??s)}function wr(s){return s&&(s.nextProducerIndex=0),lt(s)}function $r(s,t){if(lt(t),!(!s||s.producerNode===void 0||s.producerIndexOfThis===void 0||s.producerLastReadVersion===void 0)){if(Oe(s))for(let e=s.nextProducerIndex;e<s.producerNode.length;e++)ie(s.producerNode[e],s.producerIndexOfThis[e]);for(;s.producerNode.length>s.nextProducerIndex;)s.producerNode.pop(),s.producerLastReadVersion.pop(),s.producerIndexOfThis.pop()}}function Er(s){ct(s);for(let t=0;t<s.producerNode.length;t++){let e=s.producerNode[t],r=s.producerLastReadVersion[t];if(r!==e.version||(bs(e),r!==e.version))return!0}return!1}function xs(s,t,e){var r;if(Ue(s),ct(s),s.liveConsumerNode.length===0){(r=s.watched)==null||r.call(s.wrapper);for(let i=0;i<s.producerNode.length;i++)s.producerIndexOfThis[i]=xs(s.producerNode[i],s,i)}return s.liveConsumerIndexOfThis.push(e),s.liveConsumerNode.push(t)-1}function ie(s,t){var e;if(Ue(s),ct(s),typeof ngDevMode<"u"&&ngDevMode&&t>=s.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${s.liveConsumerNode.length} consumers)`);if(s.liveConsumerNode.length===1){(e=s.unwatched)==null||e.call(s.wrapper);for(let i=0;i<s.producerNode.length;i++)ie(s.producerNode[i],s.producerIndexOfThis[i])}let r=s.liveConsumerNode.length-1;if(s.liveConsumerNode[t]=s.liveConsumerNode[r],s.liveConsumerIndexOfThis[t]=s.liveConsumerIndexOfThis[r],s.liveConsumerNode.length--,s.liveConsumerIndexOfThis.length--,t<s.liveConsumerNode.length){let i=s.liveConsumerIndexOfThis[t],o=s.liveConsumerNode[t];ct(o),o.producerIndexOfThis[i]=t}}function Oe(s){var t;return s.consumerIsAlwaysLive||(((t=s?.liveConsumerNode)==null?void 0:t.length)??0)>0}function ct(s){s.producerNode??(s.producerNode=[]),s.producerIndexOfThis??(s.producerIndexOfThis=[]),s.producerLastReadVersion??(s.producerLastReadVersion=[])}function Ue(s){s.liveConsumerNode??(s.liveConsumerNode=[]),s.liveConsumerIndexOfThis??(s.liveConsumerIndexOfThis=[])}function Ss(s){if(bs(s),re(s),s.value===Ne)throw s.error;return s.value}function Cr(s){let t=Object.create(kr);t.computation=s;let e=()=>Ss(t);return e[se]=t,e}var Te=Symbol("UNSET"),Le=Symbol("COMPUTING"),Ne=Symbol("ERRORED"),kr={...De,value:Te,dirty:!0,error:null,equal:vs,producerMustRecompute(s){return s.value===Te||s.value===Le},producerRecomputeValue(s){if(s.value===Le)throw new Error("Detected cycle in computations.");let t=s.value;s.value=Le;let e=wr(s),r,i=!1;try{r=s.computation.call(s.wrapper),i=t!==Te&&t!==Ne&&s.equal.call(s.wrapper,t,r)}catch(o){r=Ne,s.error=o}finally{$r(s,e)}if(i){s.value=t;return}s.value=r,s.version++}};function Ar(){throw new Error}var zr=Ar;function Pr(){zr()}function Rr(s){let t=Object.create(Tr);t.value=s;let e=()=>(re(t),t.value);return e[se]=t,e}function Mr(){return re(this),this.value}function Ir(s,t){xr()||Pr(),s.equal.call(s.wrapper,s.value,t)||(s.value=t,Lr(s))}var Tr={...De,equal:vs,value:void 0};function Lr(s){s.version++,yr(),ys(s)}var A=Symbol("node"),w;(s=>{var t,e,r,i,o,n;class l{constructor(p,h={}){te(this,e),Me(this,t);let f=Rr(p)[se];if(this[A]=f,f.wrapper=this,h){let v=h.equals;v&&(f.equal=v),f.watched=h[s.subtle.watched],f.unwatched=h[s.subtle.unwatched]}}get(){if(!(0,s.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Mr.call(this[A])}set(p){if(!(0,s.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(br())throw new Error("Writes to signals not permitted during Watcher callback");let h=this[A];Ir(h,p)}}t=A,e=new WeakSet,r=function(){},s.isState=c=>typeof c=="object"&&Ie(e,c),s.State=l;class a{constructor(p,h){te(this,o),Me(this,i);let f=Cr(p)[se];if(f.consumerAllowSignalWrites=!0,this[A]=f,f.wrapper=this,h){let v=h.equals;v&&(f.equal=v),f.watched=h[s.subtle.watched],f.unwatched=h[s.subtle.unwatched]}}get(){if(!(0,s.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Ss(this[A])}}i=A,o=new WeakSet,n=function(){},s.isComputed=c=>typeof c=="object"&&Ie(o,c),s.Computed=a,(c=>{var p,h,y,f,v;function k($){let S,b=null;try{b=lt(null),S=$()}finally{lt(b)}return S}c.untrack=k;function W($){var S;if(!(0,s.isComputed)($)&&!(0,s.isWatcher)($))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((S=$[A].producerNode)==null?void 0:S.map(b=>b.wrapper))??[]}c.introspectSources=W;function R($){var S;if(!(0,s.isComputed)($)&&!(0,s.isState)($))throw new TypeError("Called introspectSinks without a Signal argument");return((S=$[A].liveConsumerNode)==null?void 0:S.map(b=>b.wrapper))??[]}c.introspectSinks=R;function xe($){if(!(0,s.isComputed)($)&&!(0,s.isState)($))throw new TypeError("Called hasSinks without a Signal argument");let S=$[A].liveConsumerNode;return S?S.length>0:!1}c.hasSinks=xe;function Qs($){if(!(0,s.isComputed)($)&&!(0,s.isWatcher)($))throw new TypeError("Called hasSources without a Computed or Watcher argument");let S=$[A].producerNode;return S?S.length>0:!1}c.hasSources=Qs;class Zs{constructor(S){te(this,h),te(this,f),Me(this,p);let b=Object.create(De);b.wrapper=this,b.consumerMarkedDirty=S,b.consumerIsAlwaysLive=!0,b.consumerAllowSignalWrites=!1,b.producerNode=[],this[A]=b}watch(...S){if(!(0,s.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");_s(this,f,v).call(this,S);let b=this[A];b.dirty=!1;let M=lt(b);for(let Ht of S)re(Ht[A]);lt(M)}unwatch(...S){if(!(0,s.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");_s(this,f,v).call(this,S);let b=this[A];ct(b);for(let M=b.producerNode.length-1;M>=0;M--)if(S.includes(b.producerNode[M].wrapper)){ie(b.producerNode[M],b.producerIndexOfThis[M]);let Ht=b.producerNode.length-1;if(b.producerNode[M]=b.producerNode[Ht],b.producerIndexOfThis[M]=b.producerIndexOfThis[Ht],b.producerNode.length--,b.producerIndexOfThis.length--,b.nextProducerIndex--,M<b.producerNode.length){let Xs=b.producerIndexOfThis[M],Ze=b.producerNode[M];Ue(Ze),Ze.liveConsumerIndexOfThis[Xs]=M}}}getPending(){if(!(0,s.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[A].producerNode.filter(b=>b.dirty).map(b=>b.wrapper)}}p=A,h=new WeakSet,y=function(){},f=new WeakSet,v=function($){for(let S of $)if(!(0,s.isComputed)(S)&&!(0,s.isState)(S))throw new TypeError("Called watch/unwatch without a Computed or State argument")},s.isWatcher=$=>Ie(h,$),c.Watcher=Zs;function Ys(){var $;return($=vr())==null?void 0:$.wrapper}c.currentComputed=Ys,c.watched=Symbol("watched"),c.unwatched=Symbol("unwatched")})(s.subtle||(s.subtle={}))})(w||(w={}));var We=!1,ws=new w.subtle.Watcher(()=>{We||(We=!0,queueMicrotask(()=>{We=!1;for(let s of ws.getPending())s.get();ws.watch()}))}),Or=Symbol("SignalWatcherBrand"),Nr=new FinalizationRegistry(s=>{s.unwatch(...w.subtle.introspectSources(s))}),$s=new WeakMap;function Et(s){return s[Or]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),s):class extends s{constructor(){super(...arguments),this._$St=new Map,this._$So=new w.State(0),this._$Si=!1}_$Sl(){var t,e;let r=[],i=[];this._$St.forEach((n,l)=>{(n?.beforeUpdate?r:i).push(l)});let o=(t=this.h)===null||t===void 0?void 0:t.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));r.forEach(n=>n.get()),(e=this._$Su)===null||e===void 0||e.get(),o.forEach(n=>n.get()),i.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new w.Computed(()=>{this._$So.get(),super.performUpdate()});let t=this.h=new w.subtle.Watcher(function(){let e=$s.get(this);e!==void 0&&(e._$Si===!1&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});$s.set(t,this),Nr.register(this,t),t.watch(this._$Su),t.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(this.h===void 0)return;let t=!1;this.h.unwatch(...w.subtle.introspectSources(this.h).filter(e=>{var r;let i=((r=this._$St.get(e))===null||r===void 0?void 0:r.manualDispose)!==!0;return i&&this._$St.delete(e),t||(t=!i),i})),t||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(t,e){var r;this._$S_();let i=new w.Computed(()=>{t()});return this.h.watch(i),this._$St.set(i,e),(r=e?.beforeUpdate)!==null&&r!==void 0&&r?w.subtle.untrack(()=>i.get()):this.updateComplete.then(()=>w.subtle.untrack(()=>i.get())),()=>{this._$St.delete(i),this.h.unwatch(i),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var K={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},q=s=>(...t)=>({_$litDirective$:s,values:t}),F=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Dr}=ms;var Cs=s=>s.strings===void 0,Es=()=>document.createComment(""),ht=(s,t,e)=>{let r=s._$AA.parentNode,i=t===void 0?s._$AB:t._$AA;if(e===void 0){let o=r.insertBefore(Es(),i),n=r.insertBefore(Es(),i);e=new Dr(o,n,s,s.options)}else{let o=e._$AB.nextSibling,n=e._$AM,l=n!==s;if(l){let a;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(a=s._$AU)!==n._$AU&&e._$AP(a)}if(o!==i||l){let a=e._$AA;for(;a!==o;){let c=a.nextSibling;r.insertBefore(a,i),a=c}}}return e},G=(s,t,e=s)=>(s._$AI(t,e),s),Ur={},ks=(s,t=Ur)=>s._$AH=t,As=s=>s._$AH,oe=s=>{s._$AR(),s._$AA.remove()};var Ct=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let r of e)r._$AO?.(t,!1),Ct(r,t);return!0},ne=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},zs=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),Hr(t)}};function Wr(s){this._$AN!==void 0?(ne(this),this._$AM=s,zs(this)):this._$AM=s}function Vr(s,t=!1,e=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(r))for(let o=e;o<r.length;o++)Ct(r[o],!1),ne(r[o]);else r!=null&&(Ct(r,!1),ne(r));else Ct(this,s)}var Hr=s=>{s.type==K.CHILD&&(s._$AP??=Vr,s._$AQ??=Wr)},dt=class extends F{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,r){super._$AT(t,e,r),zs(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Ct(this,t),ne(this))}setValue(t){if(Cs(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var Ve=!1,He=new w.subtle.Watcher(async()=>{Ve||(Ve=!0,queueMicrotask(()=>{Ve=!1;for(let s of He.getPending())s.get();He.watch()}))}),ae=class extends dt{_$S_(){var t,e;this._$Sm===void 0&&(this._$Sj=new w.Computed(()=>{var r;let i=(r=this._$SW)===null||r===void 0?void 0:r.get();return this.setValue(i),i}),this._$Sm=(e=(t=this._$Sk)===null||t===void 0?void 0:t.h)!==null&&e!==void 0?e:He,this._$Sm.watch(this._$Sj),w.subtle.untrack(()=>{var r;return(r=this._$Sj)===null||r===void 0?void 0:r.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return w.subtle.untrack(()=>t.get())}update(t,[e]){var r,i;return(r=this._$Sk)!==null&&r!==void 0||(this._$Sk=(i=t.options)===null||i===void 0?void 0:i.host),e!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=e,this._$S_(),w.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},qe=q(ae);var je=s=>(t,...e)=>s(t,...e.map(r=>r instanceof w.State||r instanceof w.Computed?qe(r):r)),qr=je(u),jr=je(us);var No=w.State,Do=w.Computed,j=(s,t)=>new w.State(s,t),le=(s,t)=>new w.Computed(s,t);var Br=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function Ps(s,t=""){for(let{pattern:e,name:r}of Br){let i=e.exec(s);if(i)return{name:r,path:i[1],params:new URLSearchParams(t)}}return{name:"not-found",params:new URLSearchParams(t)}}var T=j(Ps(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{T.set(Ps(window.location.pathname,window.location.search))});var Ko=g`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,N=g`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Go=g`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,Rs=g`
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
`,ut=g`
  .label {
    font-weight: bold;
  }
`,Ms=g`
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
`,Is=g`
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
`,Jo=g`
  .hidden {
    display: none !important;
  }
`;var Ts=(s,t,e)=>{let r=new Map;for(let i=t;i<=e;i++)r.set(s[i],i);return r},Ls=q(class extends F{constructor(s){if(super(s),s.type!==K.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,t,e){let r;e===void 0?e=t:t!==void 0&&(r=t);let i=[],o=[],n=0;for(let l of s)i[n]=r?r(l,n):n,o[n]=e(l,n),n++;return{values:o,keys:i}}render(s,t,e){return this.dt(s,t,e).values}update(s,[t,e,r]){let i=As(s),{values:o,keys:n}=this.dt(t,e,r);if(!Array.isArray(i))return this.ut=n,o;let l=this.ut??=[],a=[],c,p,h=0,y=i.length-1,f=0,v=o.length-1;for(;h<=y&&f<=v;)if(i[h]===null)h++;else if(i[y]===null)y--;else if(l[h]===n[f])a[f]=G(i[h],o[f]),h++,f++;else if(l[y]===n[v])a[v]=G(i[y],o[v]),y--,v--;else if(l[h]===n[v])a[v]=G(i[h],o[v]),ht(s,a[v+1],i[h]),h++,v--;else if(l[y]===n[f])a[f]=G(i[y],o[f]),ht(s,i[h],i[y]),y--,f++;else if(c===void 0&&(c=Ts(n,f,v),p=Ts(l,h,y)),c.has(l[h]))if(c.has(l[y])){let k=p.get(n[f]),W=k!==void 0?i[k]:null;if(W===null){let R=ht(s,i[h]);G(R,o[f]),a[f]=R}else a[f]=G(W,o[f]),ht(s,i[h],W),i[k]=null;f++}else oe(i[y]),y--;else oe(i[h]),h++;for(;f<=v;){let k=ht(s,a[v+1]);G(k,o[f]),a[f++]=k}for(;h<=y;){let k=i[h++];k!==null&&oe(k)}return this.ut=n,ks(s,a),I}});var kt=class s extends Event{constructor(t){super(s.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};kt.eventName="rangeChanged";var At=class s extends Event{constructor(t){super(s.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};At.eventName="visibilityChanged";var zt=class s extends Event{constructor(){super(s.eventName,{bubbles:!1})}};zt.eventName="unpinned";var Be=class{constructor(t){this._element=null;let e=t??window;this._node=e,t&&(this._element=t)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}},ce=class extends Be{constructor(t,e){super(e),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let r=this._node;this._originalScrollTo=r.scrollTo,this._originalScrollBy=r.scrollBy,this._originalScroll=r.scroll,this._attach(t)}get _destination(){return this.__destination}get scrolling(){return this._destination!==null}scrollTo(t,e){let r=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;this._scrollTo(r)}scrollBy(t,e){let r=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;r.top!==void 0&&(r.top+=this.scrollTop),r.left!==void 0&&(r.left+=this.scrollLeft),this._scrollTo(r)}_nativeScrollTo(t){this._originalScrollTo.bind(this._element||window)(t)}_scrollTo(t,e=null,r=null){this._end!==null&&this._end(),t.behavior==="smooth"?(this._setDestination(t),this._retarget=e,this._end=r):this._resetScrollState(),this._nativeScrollTo(t)}_setDestination(t){let{top:e,left:r}=t;return e=e===void 0?void 0:Math.max(0,Math.min(e,this.maxScrollTop)),r=r===void 0?void 0:Math.max(0,Math.min(r,this.maxScrollLeft)),this._destination!==null&&r===this._destination.left&&e===this._destination.top?!1:(this.__destination={top:e,left:r,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(t){this._destination&&this._setDestination(t)&&this._nativeScrollTo(this._destination)}managedScrollTo(t,e,r){return this._scrollTo(t,e,r),this._updateManagedScrollTo}correctScrollError(t){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(t),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(this._destination!==null){let{scrollTop:t,scrollLeft:e}=this,{top:r,left:i}=this._destination;r=Math.min(r||0,this.maxScrollTop),i=Math.min(i||0,this.maxScrollLeft);let o=Math.abs(r-t),n=Math.abs(i-e);o<1&&n<1&&(this._end&&this._end(),this._resetScrollState())}}detach(t){return this._clients.delete(t),this._clients.size===0&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(t){this._clients.add(t),this._clients.size===1&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};var Vs=typeof window<"u"?window.ResizeObserver:void 0;var js=Symbol("virtualizerRef"),ue="virtualizer-sizer",Hs,fe=class{constructor(t){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!t)throw new Error("Virtualizer constructor requires a configuration object");if(t.hostElement)this._init(t);else throw new Error('Virtualizer configuration requires the "hostElement" property')}set items(t){Array.isArray(t)&&t!==this._items&&(this._itemsChanged=!0,this._items=t,this._schedule(this._updateLayout))}_init(t){this._isScroller=!!t.scroller,this._initHostElement(t);let e=t.layout||{};this._layoutInitialized=this._initLayout(e)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new Vs(()=>this._hostElementSizeChanged()),this._childrenRO=new Vs(this._childrenSizeChanged.bind(this))}_initHostElement(t){let e=this._hostElement=t.hostElement;this._applyVirtualizerStyles(),e[js]=this}connected(){this._initObservers();let t=this._isScroller;this._clippingAncestors=Yr(this._hostElement,t),this._scrollerController=new ce(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(t=>{t.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(t),this._hostElementRO.observe(t)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(t=>this._childrenRO.observe(t)),this._scrollEventListeners.forEach(t=>t.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(t=>t.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let t=this._hostElement;if(!this._sizer){let e=t.querySelector(`[${ue}]`);e||(e=document.createElement("div"),e.setAttribute(ue,""),t.appendChild(e)),Object.assign(e.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),e.textContent="&nbsp;",e.setAttribute(ue,""),this._sizer=e}return this._sizer}async updateLayoutConfig(t){await this._layoutInitialized;let e=t.type||Hs;if(typeof e=="function"&&this._layout instanceof e){let r={...t};return delete r.type,this._layout.config=r,!0}return!1}async _initLayout(t){let e,r;if(typeof t.type=="function"){r=t.type;let i={...t};delete i.type,e=i}else e=t;r===void 0&&(Hs=r=(await Promise.resolve().then(()=>(Ws(),Us))).FlowLayout),this._layout=new r(i=>this._handleLayoutMessage(i),e),this._layout.measureChildren&&typeof this._layout.updateItemSizes=="function"&&(typeof this._layout.measureChildren=="function"&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){this._benchmarkStart===null&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(this._benchmarkStart!==null){let t=window.performance.now(),e=t-this._benchmarkStart,i=performance.getEntriesByName("uv-virtualizing","measure").filter(o=>o.startTime>=this._benchmarkStart&&o.startTime<t).reduce((o,n)=>o+n.duration,0);return this._benchmarkStart=null,{timeElapsed:e,virtualizationTime:i}}return null}_measureChildren(){let t={},e=this._children,r=this._measureChildOverride||this._measureChild;for(let i=0;i<e.length;i++){let o=e[i],n=this._first+i;(this._itemsChanged||this._toBeMeasured.has(o))&&(t[n]=r.call(this,o,this._items[n]))}this._childMeasurements=t,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(t){let{width:e,height:r}=t.getBoundingClientRect();return Object.assign({width:e,height:r},Qr(t))}async _schedule(t){this._scheduled.has(t)||(this._scheduled.add(t),await Promise.resolve(),this._scheduled.delete(t),t.call(this))}async _updateDOM(t){this._scrollSize=t.scrollSize,this._adjustRange(t.range),this._childrenPos=t.childPositions,this._scrollError=t.scrollError||null;let{_rangeChanged:e,_itemsChanged:r}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(e||r)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(t=>this._childrenRO.observe(t)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),this._childMeasurements!==null&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(t){console.warn("Error measuring performance data: ",t)}window.performance.mark("uv-start")}this._scrollerController.correctingScrollError===!1&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(t){t.type==="scroll"?(t.currentTarget===window||this._clippingAncestors.includes(t.currentTarget))&&this._handleScrollEvent():console.warn("event not handled",t)}_handleLayoutMessage(t){t.type==="stateChanged"?this._updateDOM(t):t.type==="visibilityChanged"?(this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._notifyVisibility()):t.type==="unpinned"&&this._hostElement.dispatchEvent(new zt)}get _children(){let t=[],e=this._hostElement.firstElementChild;for(;e;)e.hasAttribute(ue)||t.push(e),e=e.nextElementSibling;return t}_updateView(){let t=this._hostElement,e=this._scrollerController?.element,r=this._layout;if(t&&e&&r){let i,o,n,l,a=t.getBoundingClientRect();i=0,o=0,n=window.innerHeight,l=window.innerWidth;let c=this._clippingAncestors.map(R=>R.getBoundingClientRect());c.unshift(a);for(let R of c)i=Math.max(i,R.top),o=Math.max(o,R.left),n=Math.min(n,R.bottom),l=Math.min(l,R.right);let p=e.getBoundingClientRect(),h={left:a.left-p.left,top:a.top-p.top},y={width:e.scrollWidth,height:e.scrollHeight},f=i-a.top+t.scrollTop,v=o-a.left+t.scrollLeft,k=Math.max(0,n-i),W=Math.max(0,l-o);r.viewportSize={width:W,height:k},r.viewportScroll={top:f,left:v},r.totalScrollSize=y,r.offsetWithinScroller=h}}_sizeHostElement(t){let r=t&&t.width!==null?Math.min(82e5,t.width):0,i=t&&t.height!==null?Math.min(82e5,t.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${r}px, ${i}px)`;else{let o=this._hostElement.style;o.minWidth=r?`${r}px`:"100%",o.minHeight=i?`${i}px`:"100%"}}_positionChildren(t){t&&t.forEach(({top:e,left:r,width:i,height:o,xOffset:n,yOffset:l},a)=>{let c=this._children[a-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${r}px, ${e}px)`,i!==void 0&&(c.style.width=i+"px"),o!==void 0&&(c.style.height=o+"px"),c.style.left=n===void 0?null:n+"px",c.style.top=l===void 0?null:l+"px")})}async _adjustRange(t){let{_first:e,_last:r,_firstVisible:i,_lastVisible:o}=this;this._first=t.first,this._last=t.last,this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==e||this._last!==r,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==i||this._lastVisible!==o}_correctScrollError(){if(this._scrollError){let{scrollTop:t,scrollLeft:e}=this._scrollerController,{top:r,left:i}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:t-r,left:e-i})}}element(t){return t===1/0&&(t=this._items.length-1),this._items?.[t]===void 0?void 0:{scrollIntoView:(e={})=>this._scrollElementIntoView({...e,index:t})}}_scrollElementIntoView(t){if(t.index>=this._first&&t.index<=this._last)this._children[t.index-this._first].scrollIntoView(t);else if(t.index=Math.min(t.index,this._items.length-1),t.behavior==="smooth"){let e=this._layout.getScrollIntoViewCoordinates(t),{behavior:r}=t;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(e,{behavior:r}),()=>this._layout.getScrollIntoViewCoordinates(t),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=t}else this._layout.pin=t}_checkScrollIntoViewTarget(t){let{index:e}=this._scrollIntoViewTarget||{};e&&t?.has(e)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new kt({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new At({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((t,e)=>{this._layoutCompleteResolver=t,this._layoutCompleteRejecter=e})),this._layoutCompletePromise}_rejectLayoutCompletePromise(t){this._layoutCompleteRejecter!==null&&this._layoutCompleteRejecter(t),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&this._pendingLayoutComplete===null&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){this._layoutCompleteResolver!==null&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(t){if(this._layout?.measureChildren){for(let e of t)this._toBeMeasured.set(e.target,e.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function Qr(s){let t=window.getComputedStyle(s);return{marginTop:pe(t.marginTop),marginRight:pe(t.marginRight),marginBottom:pe(t.marginBottom),marginLeft:pe(t.marginLeft)}}function pe(s){let t=s?parseFloat(s):NaN;return Number.isNaN(t)?0:t}function qs(s){if(s.assignedSlot!==null)return s.assignedSlot;if(s.parentElement!==null)return s.parentElement;let t=s.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}function Zr(s,t=!1){let e=[],r=t?s:qs(s);for(;r!==null;)e.push(r),r=qs(r);return e}function Yr(s,t=!1){let e=!1;return Zr(s,t).filter(r=>{if(e)return!1;let i=getComputedStyle(r);return e=i.position==="fixed",i.overflow!=="visible"})}var Xr=s=>s,ti=(s,t)=>u`${t}: ${JSON.stringify(s,null,2)}`,Ge=class extends dt{constructor(t){if(super(t),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,r)=>ti(e,r+this._first),this._keyFunction=(e,r)=>Xr(e,r+this._first),this._items=[],t.type!==K.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(t){t&&this._setFunctions(t);let e=[];if(this._first>=0&&this._last>=this._first)for(let r=this._first;r<=this._last;r++)e.push(this._items[r]);return Ls(e,this._keyFunction,this._renderItem)}update(t,[e]){this._setFunctions(e);let r=this._items!==e.items;return this._items=e.items||[],this._virtualizer?this._updateVirtualizerConfig(t,e):this._initialize(t,e),r?I:this.render()}async _updateVirtualizerConfig(t,e){if(!await this._virtualizer.updateLayoutConfig(e.layout||{})){let i=t.parentNode;this._makeVirtualizer(i,e)}this._virtualizer.items=this._items}_setFunctions(t){let{renderItem:e,keyFunction:r}=t;e&&(this._renderItem=(i,o)=>e(i,o+this._first)),r&&(this._keyFunction=(i,o)=>r(i,o+this._first))}_makeVirtualizer(t,e){this._virtualizer&&this._virtualizer.disconnected();let{layout:r,scroller:i,items:o}=e;this._virtualizer=new fe({hostElement:t,layout:r,scroller:i}),this._virtualizer.items=o,this._virtualizer.connected()}_initialize(t,e){let r=t.parentNode;r&&r.nodeType===1&&(r.addEventListener("rangeChanged",i=>{this._first=i.first,this._last=i.last,this.setValue(this.render())}),this._makeVirtualizer(r,e))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}},Bs=q(Ge);async function Fs(s,t,e){let r="/api/search?"+s.toString(),i=await fetch(r,{signal:e});if(!i.ok){let o=await i.text();throw new Error(`search failed (${i.status}): ${o}`)}if(!i.body)throw new Error("response has no body");await ei(i.body,o=>{switch(o.type){case"result":t.onResult?.(o);break;case"file":t.onFile?.(o);break;case"facets":t.onFacets?.(o);break;case"done":t.onDone?.(o);break}})}async function ei(s,t){let e=s.getReader(),r=new TextDecoder,i="";try{for(;;){let{done:n,value:l}=await e.read();if(n)break;i+=r.decode(l,{stream:!0});let a;for(;(a=i.indexOf(`
`))!==-1;){let c=i.slice(0,a).trim();i=i.slice(a+1),c.length!==0&&t(JSON.parse(c))}}i+=r.decode();let o=i.trim();o.length>0&&t(JSON.parse(o))}finally{e.releaseLock()}}function pt(s){let t=s.indexOf("/+/");if(t===-1)return{repo:s,version:"",filePath:""};let e=s.slice(0,t),r=s.slice(t+3),i=e.lastIndexOf("/");return i===-1?{repo:e,version:"",filePath:r}:{repo:e.slice(0,i),version:e.slice(i+1),filePath:r}}function Ks(s,t={},e={}){let r=new URLSearchParams;if(s.trim()&&r.set("q",s.trim()),t.literal&&r.set("literal","true"),t.caseSensitive&&r.set("fold_case","false"),t.repos?.length)for(let i of t.repos)r.append("repo",i);for(let[i,o]of Object.entries(e))for(let n of o)r.append(i,n);return r}var ge=class{constructor(){this.lastCommittedUrl=""}commit(t,e={},r={}){let i=Ks(t,e,r),o=t?`${t} \xB7 code search`:"code search",n=me(i);if(!t)return this.lastCommittedUrl="",[{type:"replaceUrl",url:me(new URLSearchParams),title:o},{type:"clearResults"}];let l=[];return n!==this.lastCommittedUrl&&this.lastCommittedUrl!==""?l.push({type:"pushUrl",url:n,title:o}):l.push({type:"replaceUrl",url:n,title:o}),l.push({type:"search",params:i}),this.lastCommittedUrl=n,l}popstate(t,e){this.lastCommittedUrl=me(e);let r=t?`${t} \xB7 code search`:"code search",i=[{type:"replaceUrl",url:me(e),title:r}];return t?i.push({type:"search",params:e}):i.push({type:"clearResults"}),i}};function me(s){let t=s.toString();return"/search"+(t?"?"+t:"")}var _e=class{constructor(){this.results=[];this.files=[];this.dirty=!1;this.flushed=!1}start(){return this.results=[],this.files=[],this.dirty=!1,this.flushed=!1,{loading:!0,error:null,done:null}}onResult(t){this.results.push(t),this.dirty=!0}onFile(t){this.files.push(t),this.dirty=!0}flush(){if(!this.dirty)return null;this.dirty=!1;let t={results:[...this.results],files:[...this.files]};return this.flushed||(t.facets=null,this.flushed=!0),t}onFacets(t){return{facets:t}}onDone(t){return{results:this.results,files:this.files,done:t,loading:!1}}onError(t){return{error:t,loading:!1}}};var ft=le(()=>T.get().params.get("q")??""),Hn=le(()=>{let s=T.get().params;return{literal:s.get("literal")==="true",caseSensitive:s.get("fold_case")==="false"}}),Gs=le(()=>{let s=T.get().params.get("context");if(s!==null){let t=parseInt(s,10);if(!isNaN(t)&&t>=0)return t}return 3}),Mt=j([]),It=j([]),Tt=j(null),Lt=j(null),Ot=j(!1),Nt=j(null),Je=null;async function si(){Je&&Je.abort();let s=new AbortController;if(Je=s,!ft.get()){Mt.set([]),It.set([]),Tt.set(null),Lt.set(null),Ot.set(!1),Nt.set(null);return}let e=T.get(),r=new URLSearchParams(e.params),i=new _e;Rt(i.start());let o=setInterval(()=>{let n=i.flush();n&&Rt(n)},100);try{await Fs(r,{onResult(n){i.onResult(n)},onFile(n){i.onFile(n)},onFacets(n){Rt(i.onFacets(n))},onDone(n){clearInterval(o),Rt(i.onDone(n))}},s.signal)}catch(n){clearInterval(o),s.signal.aborted||Rt(i.onError(n instanceof Error?n.message:String(n)))}}function Rt(s){"results"in s&&Mt.set(s.results),"files"in s&&It.set(s.files),"facets"in s&&Tt.set(s.facets),"done"in s&&Lt.set(s.done),"loading"in s&&Ot.set(s.loading),"error"in s&&Nt.set(s.error)}var ve=new ge,et=null;function Js(s,t={},e={}){et&&clearTimeout(et),et=setTimeout(()=>{et=null,ye(ve.commit(s,t,e))},200)}function be(s,t={},e={}){et&&(clearTimeout(et),et=null),ye(ve.commit(s,t,e))}function ri(){let s=ft.get();s&&ye(ve.commit(s))}ri();window.addEventListener("popstate",()=>{let s=T.get(),t=s.params.get("q")??"";ye(ve.popstate(t,s.params))});function ye(s){for(let t of s)switch(t.type){case"pushUrl":history.pushState(null,t.title,t.url),document.title=t.title,T.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"replaceUrl":history.replaceState(null,t.title,t.url),document.title=t.title,T.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"search":si();break;case"clearResults":Mt.set([]),It.set([]),Tt.set(null),Lt.set(null),Ot.set(!1),Nt.set(null);break}}var st=class extends _{constructor(){super(...arguments);this.value="";this.error=""}render(){return u`
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
          ${this.error?u`<span id="errortext">${this.error}</span>`:E}
        </div>
      </div>
    `}onInput(){let e=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:e.value},bubbles:!0,composed:!0}))}onKeydown(e){if(e.key==="Enter"){let r=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-submit",{detail:{value:r.value},bubbles:!0,composed:!0}))}}appendQuery(e){let r=this.renderRoot.querySelector("#searchbox");r&&(r.value+=e,this.value=r.value,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:r.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};st.styles=[Is,g`
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
    `],d([m()],st.prototype,"value",2),d([m()],st.prototype,"error",2),st=d([x("cs-search-input")],st);var D=class extends _{constructor(){super(...arguments);this.groups=[];this._open=!1;this._search="";this._selected=new Set;this._onOutsideClick=e=>{this._open&&(e.composedPath().includes(this)||(this._open=!1))}}get _options(){return this.groups.flatMap(e=>e.repos.map(r=>({value:r,label:r.split("/").pop()??r,group:e.label,selected:this._selected.has(r)})))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick)}get selectedRepos(){return[...this._selected]}get _buttonText(){let e=this._selected.size;return e===0?"(all repositories)":e<=4?this._options.filter(i=>i.selected).map(i=>i.label).join(", "):`(${e} repositories)`}get _filteredGroups(){let e=this._search.toLowerCase(),r=new Map;for(let i of this._options)e&&!i.value.toLowerCase().includes(e)&&!i.label.toLowerCase().includes(e)||(r.has(i.group)||r.set(i.group,[]),r.get(i.group).push(i));return[...r.entries()].map(([i,o])=>({label:i,options:o}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(e){let r=new Set(this._selected);r.has(e)?r.delete(e):r.add(e),this._selected=r,this._fireChange()}_selectAll(){this._selected=new Set(this._options.map(e=>e.value)),this._fireChange()}_deselectAll(){this._selected=new Set,this._fireChange()}_toggleGroup(e){let r=this._options.filter(n=>n.group===e).map(n=>n.value),i=r.every(n=>this._selected.has(n)),o=new Set(this._selected);for(let n of r)i?o.delete(n):o.add(n);this._selected=o,this._fireChange()}_fireChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}_onSearchInput(e){this._search=e.target.value}_onSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this._search=""),e.key==="Escape"&&(this._open=!1)}render(){return u`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():E}
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
                <div class="options">${e.map(r=>this._renderGroup(r))}</div>
            </div>
        `}_renderGroup(e){return e.label?u`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(e.label)}>${e.label}</div>
                ${e.options.map(r=>this._renderOption(r))}
            </div>
        `:e.options.map(r=>this._renderOption(r))}_renderOption(e){return u`
            <label class="option ${e.selected?"selected":""}">
                <input type="checkbox" .checked=${e.selected} @change=${()=>this._toggleOption(e.value)} />
                ${e.label}
            </label>
        `}};D.styles=g`
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
    `,d([m({type:Array})],D.prototype,"groups",2),d([z()],D.prototype,"_open",2),d([z()],D.prototype,"_search",2),d([z()],D.prototype,"_selected",2),D=d([x("repo-select")],D);var rt=class extends _{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let e=this.options.caseSensitive?"false":"auto";return u`
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
    `}setCase(e){let r=e==="false";this.options={...this.options,caseSensitive:r},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}onRepoChange(){let r=this.renderRoot.querySelector("repo-select")?.selectedRepos??[];this.options={...this.options,repos:r.length>0?r:void 0},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};rt.styles=[Ms,ut,g`
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
    `],d([m({type:Object})],rt.prototype,"options",2),d([m({type:Array})],rt.prototype,"repos",2),rt=d([x("cs-search-options")],rt);var Qe=q(class extends F{constructor(s){if(super(s),s.type!==K.ATTRIBUTE||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter((t=>s[t])).join(" ")+" "}update(s,[t]){if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let e=s.element.classList;for(let r of this.st)r in t||(e.remove(r),this.st.delete(r));for(let r in t){let i=!!t[r];i===this.st.has(r)||this.nt?.has(r)||(i?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)))}return I}});var J=class extends _{render(){return this.start!=null&&this.end!=null?u`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:u`${this.text}`}};J.styles=g`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,d([m()],J.prototype,"text",2),d([m({type:Number})],J.prototype,"start",2),d([m({type:Number})],J.prototype,"end",2),J=d([x("match-str")],J);var O=class extends _{render(){return u`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};O.styles=g`
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
    `,d([m()],O.prototype,"text",2),d([m()],O.prototype,"href",2),d([m({type:Number})],O.prototype,"start",2),d([m({type:Number})],O.prototype,"end",2),d([m()],O.prototype,"repo",2),d([m()],O.prototype,"version",2),O=d([x("filename-match")],O);var U=class extends _{render(){let t=this.start!=null&&this.end!=null;return u`<a class=${Qe({"lno-link":!0,matchlno:t})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Qe({matchline:t})}
                >${t?u`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.text}</span
            >`}};U.styles=g`
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
    `,d([m({type:Number})],U.prototype,"lineNo",2),d([m()],U.prototype,"text",2),d([m()],U.prototype,"href",2),d([m({type:Number})],U.prototype,"start",2),d([m({type:Number})],U.prototype,"end",2),U=d([x("match-line")],U);function ii(s){let t=s.lastIndexOf("/");return t<0?".":s.slice(0,t)}function oi(s){let t=s.lastIndexOf("/");return t<0?s:s.slice(t+1)}var it=class extends _{constructor(){super(...arguments);this.noContext=!1}render(){let{repo:e,version:r,filePath:i}=pt(this.result.path),o=`/view/${this.result.path}`,n=this.splitGroups(this.result.lines),l=r.length>6?r.slice(0,6):r,a=ii(i),c=oi(i);return u`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${o}>
              <span class="repo">${e}:</span><span class="version">${l}:</span>${a}/<span class="filename">${c}</span>
            </a>
          </span>
        </div>
        ${n.map(p=>u`
            <div class="match">
              <div class="contents">
                ${p.map(h=>{let y=h[0],f=h[1],v=h.length>2?h[2]:void 0,k=v!==void 0&&v.length>0,W=`${o}#L${y}`,R=k&&v?v[0][0]:void 0,xe=k&&v?v[0][1]:void 0;return u`
                    <match-line
                      class=${k?"match-hit":"context"}
                      .lineNo=${y}
                      text=${f}
                      href=${W}
                      .start=${R}
                      .end=${xe}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(e){let r=[],i=[];for(let o of e)o===null?i.length>0&&(r.push(i),i=[]):i.push(o);return i.length>0&&r.push(i),r}};it.styles=[Rs,N,g`
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
    `],d([m({type:Object})],it.prototype,"result",2),d([m({type:Boolean,reflect:!0,attribute:"no-context"})],it.prototype,"noContext",2),it=d([x("cs-result-group")],it);var B=class extends _{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return u`<div id="countarea">Searching...</div>`;let e=this.truncated?`${this.total}+`:`${this.total}`;return u`
      <div id="countarea">
        <span id="numresults">${e}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};B.styles=[ut,g`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],d([m({type:Number})],B.prototype,"total",2),d([m({type:Number})],B.prototype,"timeMs",2),d([m({type:Boolean})],B.prototype,"truncated",2),d([m({type:Boolean})],B.prototype,"loading",2),B=d([x("cs-result-stats")],B);var ot=class extends _{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){let e=this.facets&&(this.facets.ext?.length||this.facets.repo?.length||this.facets.path?.length),r=Object.values(this.selected).some(n=>n.size>0);if(!e&&!r)return E;let o=[{label:"Extension",key:"f.ext",buckets:this.facets?.ext??[]},{label:"Repository",key:"f.repo",buckets:this.facets?.repo??[]},{label:"Path",key:"f.path",buckets:this.facets?.path??[]}].filter(n=>n.buckets.length>0||(this.selected[n.key]?.size??0)>0);return o.length===0?E:u`
      <div class="panel">
        ${o.map(n=>this.renderSection(n.label,n.key,n.buckets))}
      </div>
    `}renderSection(e,r,i){let o=this.selected[r]??new Set,l=[...i].sort((p,h)=>h.c-p.c||p.v.localeCompare(h.v)).slice(0,10),a=new Set(l.map(p=>p.v)),c=[...o].filter(p=>!a.has(p));return u`
      <div class="section">
        <span class="section-label">${e}</span>
        ${c.map(p=>u`
          <button
            class="pill stale"
            @click=${()=>this.toggle(r,p)}
          >${p}</button>
        `)}
        ${l.map(p=>u`
          <button
            class=${o.has(p.v)?"pill active":"pill"}
            @click=${()=>this.toggle(r,p.v)}
          >${p.v} <span class="count">${p.c}</span></button>
        `)}
      </div>
    `}toggle(e,r){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:e,value:r},bubbles:!0,composed:!0}))}};ot.styles=g`
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
  `,d([m({type:Object})],ot.prototype,"facets",2),d([m({type:Object})],ot.prototype,"selected",2),ot=d([x("cs-facet-panel")],ot);var Dt=class extends _{render(){return u`
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
    `}};Dt.styles=[N,g`
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
    `],Dt=d([x("cs-search-help")],Dt);function ni(s,t,e){let r=s[t]??new Set,i;return t==="f.path"?i=r.has(e)?new Set:new Set([e]):(i=new Set(r),i.has(e)?i.delete(e):i.add(e)),{...s,[t]:i}}function ai(s){let t={};for(let[e,r]of Object.entries(s))r.size>0&&(t[e]=[...r]);return t}function li(s){let t={};for(let e of["f.ext","f.repo","f.path"]){let r=s.getAll(e);r.length>0&&(t[e]=new Set(r))}return t}var Ut=class extends Et(_){constructor(){super(...arguments);this.currentOptions={}}get activeFacets(){return li(T.get().params)}render(){let e=ft.get(),r=Mt.get(),i=It.get(),o=Lt.get(),n=Ot.get(),l=Nt.get(),a=Tt.get(),c=Gs.get(),p=o||n;return u`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${h=>h.preventDefault()}
        >
          <cs-search-input
            .value=${e}
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
        ${p?u`
          <div id="resultarea">
            <cs-result-stats
              .total=${o?.total??0}
              .timeMs=${o?.time_ms??0}
              .truncated=${o?.truncated??!1}
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
                ${i.map(h=>{let{repo:y,version:f,filePath:v}=pt(h.path);return u`
                    <filename-match
                      text=${v}
                      start=${h.match[0]}
                      end=${h.match[1]}
                      repo=${y}
                      version=${f.slice(0,6)}
                      href="/view/${h.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${Bs({items:r,renderItem:h=>u`
                    <cs-result-group .result=${h} ?no-context=${c<=0}></cs-result-group>
                  `})}
              </div>
            </div>
          </div>
        `:u`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(e){let r=ni(this.activeFacets,e.detail.key,e.detail.value),i=ft.get();i&&be(i,this.currentOptions,this.facetParamsFrom(r))}onSearchInput(e){Js(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onSearchSubmit(e){be(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onOptionsChange(e){this.currentOptions=e.detail,this.reSearch()}reSearch(){let e=ft.get();e&&be(e,this.currentOptions,this.facetParamsFrom(this.activeFacets))}getRepos(){return window.__CS_INIT?.repos??[]}facetParamsFrom(e){return ai(e)}};Ut.styles=[N,ut,g`
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

    `],Ut=d([x("cs-search-view")],Ut);var mt=class extends _{constructor(){super(...arguments);this.path=""}render(){let e=this.path.indexOf("/+/");if(e===-1)return u`<span>${this.path}</span>`;let r=this.path.slice(0,e),o=this.path.slice(e+3).split("/").filter(n=>n.length>0);return u`
      <nav class="breadcrumbs">
        <a href="/view/${r}/+/">${r}</a>
        ${o.map((n,l)=>{let a=o.slice(0,l+1).join("/"),c=`/view/${r}/+/${a}${l<o.length-1?"/":""}`;return u`<span class="sep">/</span><a href=${c}>${n}</a>`})}
      </nav>
    `}};mt.styles=g`
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
  `,d([m()],mt.prototype,"path",2),mt=d([x("cs-breadcrumbs")],mt);var nt=class extends _{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let e=[...this.entries].sort((r,i)=>{let o=r.endsWith("/"),n=i.endsWith("/");return o!==n?o?-1:1:r.localeCompare(i)});return u`
      <div class="listing">
        ${e.map(r=>{let i=r.endsWith("/"),o=this.basePath+r;return u`
            <a class=${i?"dir":"file"} href=${o}>${r}</a>
          `})}
      </div>
    `}};nt.styles=g`
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
  `,d([m({type:Array})],nt.prototype,"entries",2),d([m()],nt.prototype,"basePath",2),nt=d([x("cs-dir-listing")],nt);var ci={navigate(s){window.location.href=s}};function hi(s,t,e){switch(s){case"Enter":return t?{type:"open-tab",url:`/search?q=${encodeURIComponent(t)}`}:{type:"close-help"};case"/":return{type:"navigate",url:`/search${t?"?q="+encodeURIComponent(t):""}`};case"?":return{type:"toggle-help"};case"Escape":return{type:"close-help"};case"v":return e?{type:"navigate",url:e}:{type:"close-help"};case"n":return t?{type:"find",text:t,backwards:!1}:{type:"close-help"};case"p":return t?{type:"find",text:t,backwards:!0}:{type:"close-help"}}return null}function di(s,t,e,r){return!t||e<=0?Math.floor(s/3):e<=s?.5*(s-e):r/2}function ui(s,t){return s<0?"1":s===t?String(s):`${s}-L${t}`}function pi(s,t,e){return s?s.replace("{lno}",ui(t,e)):""}function fi(s){let t=s.match(/^#L(\d+)(?:-L?(\d+))?$/);if(!t)return[-1,-1];let e=parseInt(t[1],10),r=t[2]?parseInt(t[2],10):e;return[e,r]}var L=class extends _{constructor(){super(...arguments);this.content="";this.basePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.hasSelection=!1;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onSelectionChange=()=>{this.hasSelection=(window.getSelection()?.toString()||"").length>0};this.onKeyDown=e=>{e.target.matches("input,textarea")||e.altKey||e.ctrlKey||e.metaKey||this.processKey(e.key)&&e.preventDefault()}}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("selectionchange",this.onSelectionChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("selectionchange",this.onSelectionChange)}parseHash(){let[e,r]=fi(window.location.hash);this.selectedStart=e,this.selectedEnd=r}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!e)return;let r=this.selectedStart!==this.selectedEnd,i=0;if(r){let l=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(l){let a=e.getBoundingClientRect(),c=l.getBoundingClientRect();i=c.top+c.height-a.top}}let o=di(window.innerHeight,r,i,e.offsetHeight),n=e.getBoundingClientRect();window.scrollTo(0,n.top+window.scrollY-o)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){return pi(this.externalUrl,this.selectedStart,this.selectedEnd)}getSelectedText(){return window.getSelection()?.toString()||""}processKey(e){let r=hi(e,this.getSelectedText(),this.resolvedExternalUrl());if(!r)return!1;switch(r.type){case"navigate":ci.navigate(r.url);break;case"open-tab":window.open(r.url);break;case"find":window.find(r.text,!1,r.backwards);break;case"toggle-help":this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0}));break;case"close-help":this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));break}return!0}render(){let e=this.content.split(`
`);return e.length>0&&e[e.length-1]===""&&e.pop(),u`
      ${this.hasSelection?u`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      `:""}
      <div class="viewer">
        ${e.map((r,i)=>{let o=i+1,n=o>=this.selectedStart&&o<=this.selectedEnd;return u`
            <div class="line ${n?"selected":""}" id="L${o}">
              <a class="lno" href="#L${o}" @click=${l=>this.onLineClick(l,o)}>${o}</a>
              <span class="code">${r}</span>
            </div>
          `})}
      </div>
    `}onLineClick(e,r){if(e.shiftKey&&this.selectedStart>0){e.preventDefault();let i=Math.min(this.selectedStart,r),o=Math.max(this.selectedStart,r);this.selectedStart=i,this.selectedEnd=o,history.replaceState(null,"",`#L${i}-L${o}`)}else this.selectedStart=r,this.selectedEnd=r}};L.styles=g`
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
  `,d([m()],L.prototype,"content",2),d([m()],L.prototype,"basePath",2),d([m()],L.prototype,"repo",2),d([m()],L.prototype,"version",2),d([m()],L.prototype,"externalUrl",2),d([z()],L.prototype,"selectedStart",2),d([z()],L.prototype,"selectedEnd",2),d([z()],L.prototype,"hasSelection",2),L=d([x("cs-code-viewer")],L);var gt=class extends _{constructor(){super(...arguments);this.open=!1}render(){return this.open?u`
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
    `:u``}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}))}};gt.styles=g`
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
  `,d([m({type:Boolean,reflect:!0})],gt.prototype,"open",2),gt=d([x("cs-help-modal")],gt);function mi(s){let t=s.indexOf("/+/");if(t>=0){let e=s.slice(0,t),r=s.slice(t+3),i=e.lastIndexOf("@");if(i>=0)return{repo:e.slice(0,i),version:e.slice(i+1),filePath:r}}return pt(s)}function gi(s){return s.endsWith("/")||s.endsWith("/+/")||!s.includes("/+/")}function _i(s,t){return`/raw/${s}${t&&!s.endsWith("/")?"/":""}`}function vi(s,t,e){let r="github.com/";return s.startsWith(r)?`https://github.com/${s.slice(r.length)}/blob/${t}/${e}#L{lno}`:""}var P=class extends _{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null;this.showHelp=!1}willUpdate(e){e.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let e=gi(this.path),r=_i(this.path,e);try{let i=await fetch(r);if(!i.ok){this.error=`Not found (${i.status})`,this.loading=!1;return}(i.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await i.json(),this.fetchReadme(r)):this.content=await i.text()}catch(i){this.error=i instanceof Error?i.message:String(i)}this.loading=!1}async fetchReadme(e){if(!this.dirEntries)return;let r=this.dirEntries.find(i=>P.README_RE.test(i));if(r)try{let i=e.endsWith("/")?e:e+"/",o=await fetch(i+r);o.ok&&(this.readmeContent=await o.text())}catch{}}render(){let e=mi(this.path),r=e.repo,i=e.version,o=vi(e.repo,e.version,e.filePath);return u`
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
            .repo=${r}
            .version=${i}
            .externalUrl=${o}
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
  `,d([m()],P.prototype,"path",2),d([z()],P.prototype,"content",2),d([z()],P.prototype,"dirEntries",2),d([z()],P.prototype,"readmeContent",2),d([z()],P.prototype,"loading",2),d([z()],P.prototype,"error",2),d([z()],P.prototype,"showHelp",2),P=d([x("cs-file-view")],P);var Wt=class extends _{render(){return u`
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
    `}};Wt.styles=[N,g`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Wt=d([x("cs-about-view")],Wt);var Vt=class extends Et(_){render(){let t=T.get();return u`
      <main>${this.renderView(t)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(t){switch(t.name){case"search":return u`<cs-search-view></cs-search-view>`;case"view":return u`<cs-file-view .path=${t.path??""}></cs-file-view>`;case"about":return u`<cs-about-view></cs-about-view>`;default:return u`<div class="placeholder">Not found</div>`}}};Vt.styles=[N,g`
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
    `],Vt=d([x("cs-app")],Vt);export{Vt as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
