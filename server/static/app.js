var Xe=Object.defineProperty;var ti=Object.getOwnPropertyDescriptor;var we=(r,t)=>()=>(r&&(t=r(r=0)),t);var ei=(r,t)=>{for(var e in t)Xe(r,e,{get:t[e],enumerable:!0})};var d=(r,t,e,i)=>{for(var s=i>1?void 0:i?ti(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Xe(t,e,s),s};var Pt,Or=we(()=>{Pt=class{constructor(t){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,t?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(t,e){let i=this._map.get(t)||0;this._map.set(t,e),this.totalSize+=e-i}get averageSize(){if(this._map.size>0){let t=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(t):t}return 0}getSize(t){return this._map.get(t)}clear(){this._map.clear(),this.totalSize=0}}});function Fe(r){return r==="horizontal"?"width":"height"}var he,Nr=we(()=>{he=class{_getDefaultConfig(){return{direction:"vertical"}}constructor(t,e){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=t,Promise.resolve().then(()=>this.config=e||this._getDefaultConfig())}set config(t){Object.assign(this,Object.assign({},this._getDefaultConfig(),t))}get config(){return{direction:this.direction}}get items(){return this._items}set items(t){this._setItems(t)}_setItems(t){t!==this._items&&(this._items=t,this._scheduleReflow())}get direction(){return this._direction}set direction(t){t=t==="horizontal"?t:"vertical",t!==this._direction&&(this._direction=t,this._sizeDim=t==="horizontal"?"width":"height",this._secondarySizeDim=t==="horizontal"?"height":"width",this._positionDim=t==="horizontal"?"left":"top",this._secondaryPositionDim=t==="horizontal"?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(t){let{_viewDim1:e,_viewDim2:i}=this;Object.assign(this._viewportSize,t),i!==this._viewDim2?this._scheduleLayoutUpdate():e!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(t){Object.assign(this._latestCoords,t);let e=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(e-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(t=!1){(t||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(t){this._pin=t,this._triggerReflow()}get pin(){if(this._pin!==null){let{index:t,block:e}=this._pin;return{index:Math.max(0,Math.min(t,this.items.length-1)),block:e}}return null}_clampScrollPosition(t){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(t,this.totalScrollSize[Fe(this.direction)]-this._viewDim1))}unpin(){this._pin!==null&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(this.pin!==null){let t=this._scrollPosition,{index:e,block:i}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:e,block:i||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=t-this._scrollPosition}}_calculateScrollIntoViewPosition(t){let{block:e}=t,i=Math.min(this.items.length,Math.max(0,t.index)),s=this._getItemPosition(i)[this._positionDim],o=s;if(e!=="start"){let n=this._getItemSize(i)[this._sizeDim];if(e==="center")o=s-.5*this._viewDim1+.5*n;else{let l=s-this._viewDim1+n;if(e==="end")o=l;else{let a=this._scrollPosition;o=Math.abs(a-s)<Math.abs(a-l)?s:l}}}return o+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(o)}getScrollIntoViewCoordinates(t){return{[this._positionDim]:this._calculateScrollIntoViewPosition(t)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let t=new Map;if(this._first!==-1&&this._last!==-1)for(let i=this._first;i<=this._last;i++)t.set(i,this._getItemPosition(i));let e={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:t};this._scrollError&&(e.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(e)}get _num(){return this._first===-1||this._last===-1?0:this._last-this._first+1}_checkThresholds(){if(this._viewDim1===0&&this._num>0||this._pin!==null)this._scheduleReflow();else{let t=Math.max(0,this._scrollPosition-this._overhang),e=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>t||this._physicalMax<e?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(t){if(this._first===-1||this._last===-1)return;let e=this._first;for(;e<this._last&&Math.round(this._getItemPosition(e)[this._positionDim]+this._getItemSize(e)[this._sizeDim])<=Math.round(this._scrollPosition);)e++;let i=this._last;for(;i>this._first&&Math.round(this._getItemPosition(i)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)i--;(e!==this._firstVisible||i!==this._lastVisible)&&(this._firstVisible=e,this._lastVisible=i,t&&t.emit&&this._sendVisibilityChangedMessage())}}});var Ur={};ei(Ur,{FlowLayout:()=>de,flow:()=>Fi});function Dr(r){return r==="horizontal"?"marginLeft":"marginTop"}function Ki(r){return r==="horizontal"?"marginRight":"marginBottom"}function Gi(r){return r==="horizontal"?"xOffset":"yOffset"}function Ji(r,t){let e=[r,t].sort();return e[1]<=0?Math.min(...e):e[0]>=0?Math.max(...e):e[0]+e[1]}var Fi,Ke,de,Hr=we(()=>{Or();Nr();Fi=r=>Object.assign({type:de},r);Ke=class{constructor(){this._childSizeCache=new Pt,this._marginSizeCache=new Pt,this._metricsCache=new Map}update(t,e){let i=new Set;Object.keys(t).forEach(s=>{let o=Number(s);this._metricsCache.set(o,t[o]),this._childSizeCache.set(o,t[o][Fe(e)]),i.add(o),i.add(o+1)});for(let s of i){let o=this._metricsCache.get(s)?.[Dr(e)]||0,n=this._metricsCache.get(s-1)?.[Ki(e)]||0;this._marginSizeCache.set(s,Ji(o,n))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(t,e){return this._metricsCache.get(t)?.[Dr(e)]||0}getChildSize(t){return this._childSizeCache.getSize(t)}getMarginSize(t){return this._marginSizeCache.getSize(t)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}},de=class extends he{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new Ke,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(t){this._metricsCache.update(t,this.direction),this._scheduleReflow()}_getPhysicalItem(t){return this._newPhysicalItems.get(t)??this._physicalItems.get(t)}_getSize(t){return this._getPhysicalItem(t)&&this._metricsCache.getChildSize(t)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(t){let e=this._metricsCache;if(this._first===-1||this._last===-1)return e.averageMarginSize+t*(e.averageMarginSize+this._getAverageSize());if(t<this._first){let i=this._first-t;return this._getPhysicalItem(this._first).pos-(e.getMarginSize(this._first-1)||e.averageMarginSize)-(i*e.averageChildSize+(i-1)*e.averageMarginSize)}else{let i=t-this._last;return this._getPhysicalItem(this._last).pos+(e.getChildSize(this._last)||e.averageChildSize)+(e.getMarginSize(this._last)||e.averageMarginSize)+i*(e.averageChildSize+e.averageMarginSize)}}_getPosition(t){let e=this._getPhysicalItem(t),{averageMarginSize:i}=this._metricsCache;return t===0?this._metricsCache.getMarginSize(0)??i:e?e.pos:this._estimatePosition(t)}_calculateAnchor(t,e){return t<=0?0:e>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((t+e)/2/this._delta)))}_getAnchor(t,e){if(this._physicalItems.size===0)return this._calculateAnchor(t,e);if(this._first<0)return this._calculateAnchor(t,e);if(this._last<0)return this._calculateAnchor(t,e);let i=this._getPhysicalItem(this._first),s=this._getPhysicalItem(this._last),o=i.pos;if(s.pos+this._metricsCache.getChildSize(this._last)<t)return this._calculateAnchor(t,e);if(o>e)return this._calculateAnchor(t,e);let a=this._firstVisible-1,c=-1/0;for(;c<t;)c=this._getPhysicalItem(++a).pos+this._metricsCache.getChildSize(a);return a}_getActiveItems(){this._viewDim1===0||this.items.length===0?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let t=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=t,this._stable=!0}_getItems(){let t=this._newPhysicalItems;this._stable=!0;let e,i;if(this.pin!==null){let{index:c}=this.pin;this._anchorIdx=c,this._anchorPos=this._getPosition(c)}if(e=this._scrollPosition-this._overhang,i=this._scrollPosition+this._viewDim1+this._overhang,i<0||e>this._scrollSize){this._clearItems();return}(this._anchorIdx===null||this._anchorPos===null)&&(this._anchorIdx=this._getAnchor(e,i),this._anchorPos=this._getPosition(this._anchorIdx));let s=this._getSize(this._anchorIdx);s===void 0&&(this._stable=!1,s=this._getAverageSize());let o=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,n=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;this._anchorIdx===0&&(this._anchorPos=o),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-n-s);let l=0;for(this._anchorPos+s+n<e&&(l=e-(this._anchorPos+s+n)),this._anchorPos-o>i&&(l=i-(this._anchorPos-o)),l&&(this._scrollPosition-=l,e-=l,i-=l,this._scrollError+=l),t.set(this._anchorIdx,{pos:this._anchorPos,size:s}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-o,this._physicalMax=this._anchorPos+s+n;this._physicalMin>e&&this._first>0;){let c=this._getSize(--this._first);c===void 0&&(this._stable=!1,c=this._getAverageSize());let u=this._metricsCache.getMarginSize(this._first);u===void 0&&(this._stable=!1,u=this._metricsCache.averageMarginSize),this._physicalMin-=c;let h=this._physicalMin;if(t.set(this._first,{pos:h,size:c}),this._physicalMin-=u,this._stable===!1&&this._estimate===!1)break}for(;this._physicalMax<i&&this._last<this.items.length-1;){let c=this._getSize(++this._last);c===void 0&&(this._stable=!1,c=this._getAverageSize());let u=this._metricsCache.getMarginSize(this._last);u===void 0&&(this._stable=!1,u=this._metricsCache.averageMarginSize);let h=this._physicalMax;if(t.set(this._last,{pos:h,size:c}),this._physicalMax+=c+u,!this._stable&&!this._estimate)break}let a=this._calculateError();a&&(this._physicalMin-=a,this._physicalMax-=a,this._anchorPos-=a,this._scrollPosition-=a,t.forEach(c=>c.pos-=a),this._scrollError+=a),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=t)}_calculateError(){return this._first===0?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:t,_last:e}=this;super._reflow(),(this._first===-1&&this._last==-1||this._first===t&&this._last===e)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:t}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(t+this._getAverageSize())+t)}get _delta(){let{averageMarginSize:t}=this._metricsCache;return this._getAverageSize()+t}_getItemPosition(t){return{[this._positionDim]:this._getPosition(t),[this._secondaryPositionDim]:0,[Gi(this.direction)]:-(this._metricsCache.getLeadingMarginValue(t,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(t){return{[this._sizeDim]:this._getSize(t)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}});var qt=globalThis,jt=qt.ShadowRoot&&(qt.ShadyCSS===void 0||qt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Se=Symbol(),Ye=new WeakMap,_t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(jt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Ye.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ye.set(e,t))}return t}toString(){return this.cssText}},tr=r=>new _t(typeof r=="string"?r:r+"",void 0,Se),g=(r,...t)=>{let e=r.length===1?r[0]:t.reduce(((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1]),r[0]);return new _t(e,r,Se)},er=(r,t)=>{if(jt)r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let i=document.createElement("style"),s=qt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},$e=jt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return tr(e)})(r):r;var{is:ri,defineProperty:ii,getOwnPropertyDescriptor:si,getOwnPropertyNames:oi,getOwnPropertySymbols:ni,getPrototypeOf:ai}=Object,Bt=globalThis,rr=Bt.trustedTypes,li=rr?rr.emptyScript:"",ci=Bt.reactiveElementPolyfillSupport,vt=(r,t)=>r,bt={toAttribute(r,t){switch(t){case Boolean:r=r?li:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ft=(r,t)=>!ri(r,t),ir={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:Ft};Symbol.metadata??=Symbol("metadata"),Bt.litPropertyMetadata??=new WeakMap;var W=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ir){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&ii(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:o}=si(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let l=s?.call(this);o?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ir}static _$Ei(){if(this.hasOwnProperty(vt("elementProperties")))return;let t=ai(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(vt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(vt("properties"))){let e=this.properties,i=[...oi(e),...ni(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift($e(s))}else t!==void 0&&e.push($e(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return er(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:bt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:bt;this._$Em=s;let l=n.fromAttribute(e,o.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){let s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??Ft)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:n}=o,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[vt("elementProperties")]=new Map,W[vt("finalized")]=new Map,ci?.({ReactiveElement:W}),(Bt.reactiveElementVersions??=[]).push("2.1.1");var Ce=globalThis,Kt=Ce.trustedTypes,sr=Kt?Kt.createPolicy("lit-html",{createHTML:r=>r}):void 0,ke="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+V,hi=`<${Ae}>`,X=document,yt=()=>X.createComment(""),wt=r=>r===null||typeof r!="object"&&typeof r!="function",ze=Array.isArray,hr=r=>ze(r)||typeof r?.[Symbol.iterator]=="function",Ee=`[ 	
\f\r]`,xt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,or=/-->/g,nr=/>/g,Q=RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ar=/'/g,lr=/"/g,dr=/^(?:script|style|textarea|title)$/i,Pe=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=Pe(1),pr=Pe(2),gs=Pe(3),I=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),cr=new WeakMap,Z=X.createTreeWalker(X,129);function ur(r,t){if(!ze(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return sr!==void 0?sr.createHTML(t):t}var fr=(r,t)=>{let e=r.length-1,i=[],s,o=t===2?"<svg>":t===3?"<math>":"",n=xt;for(let l=0;l<e;l++){let a=r[l],c,u,h=-1,x=0;for(;x<a.length&&(n.lastIndex=x,u=n.exec(a),u!==null);)x=n.lastIndex,n===xt?u[1]==="!--"?n=or:u[1]!==void 0?n=nr:u[2]!==void 0?(dr.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=Q):u[3]!==void 0&&(n=Q):n===Q?u[0]===">"?(n=s??xt,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,c=u[1],n=u[3]===void 0?Q:u[3]==='"'?lr:ar):n===lr||n===ar?n=Q:n===or||n===nr?n=xt:(n=Q,s=void 0);let f=n===Q&&r[l+1].startsWith("/>")?" ":"";o+=n===xt?a+hi:h>=0?(i.push(c),a.slice(0,h)+ke+a.slice(h)+V+f):a+V+(h===-2?l:f)}return[ur(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},St=class r{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[c,u]=fr(t,e);if(this.el=r.createElement(c,i),Z.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=Z.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(ke)){let x=u[n++],f=s.getAttribute(h).split(V),v=/([.?@])?(.*)/.exec(x);a.push({type:1,index:o,name:v[2],strings:f,ctor:v[1]==="."?Jt:v[1]==="?"?Qt:v[1]==="@"?Zt:tt}),s.removeAttribute(h)}else h.startsWith(V)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(dr.test(s.tagName)){let h=s.textContent.split(V),x=h.length-1;if(x>0){s.textContent=Kt?Kt.emptyScript:"";for(let f=0;f<x;f++)s.append(h[f],yt()),Z.nextNode(),a.push({type:2,index:++o});s.append(h[x],yt())}}}else if(s.nodeType===8)if(s.data===Ae)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(V,h+1))!==-1;)a.push({type:7,index:o}),h+=V.length-1}o++}}static createElement(t,e){let i=X.createElement("template");return i.innerHTML=t,i}};function Y(r,t,e=r,i){if(t===I)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,o=wt(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=Y(r,s._$AS(r,t.values),s,i)),t}var Gt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??X).importNode(e,!0);Z.currentNode=s;let o=Z.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new at(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new Xt(o,this,t)),this._$AV.push(c),a=i[++l]}n!==a?.index&&(o=Z.nextNode(),n++)}return Z.currentNode=X,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},at=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),wt(t)?t===E||t==null||t===""?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):hr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==E&&wt(this._$AH)?this._$AA.nextSibling.data=t:this.T(X.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=St.createElement(ur(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new Gt(s,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=cr.get(t.strings);return e===void 0&&cr.set(t.strings,e=new St(t)),e}k(t){ze(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let o of t)s===e.length?e.push(i=new r(this.O(yt()),this.O(yt()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},tt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=E}_$AI(t,e=this,i,s){let o=this.strings,n=!1;if(o===void 0)t=Y(this,t,e,0),n=!wt(t)||t!==this._$AH&&t!==I,n&&(this._$AH=t);else{let l=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=Y(this,l[i+a],e,a),c===I&&(c=this._$AH[a]),n||=!wt(c)||c!==this._$AH[a],c===E?t=E:t!==E&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!s&&this.j(t)}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Jt=class extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===E?void 0:t}},Qt=class extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E)}},Zt=class extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??E)===I)return;let i=this._$AH,s=t===E&&i!==E||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==E&&(i===E||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Xt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}},mr={M:ke,P:V,A:Ae,C:1,L:fr,R:Gt,D:hr,V:Y,I:at,H:tt,N:Qt,U:Zt,B:Jt,F:Xt},di=Ce.litHtmlPolyfillSupport;di?.(St,at),(Ce.litHtmlVersions??=[]).push("3.3.1");var gr=(r,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let o=e?.renderBefore??null;i._$litPart$=s=new at(t.insertBefore(yt(),o),o,void 0,e??{})}return s._$AI(r),s};var Me=globalThis,_=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};_._$litElement$=!0,_.finalized=!0,Me.litElementHydrateSupport?.({LitElement:_});var pi=Me.litElementPolyfillSupport;pi?.({LitElement:_});(Me.litElementVersions??=[]).push("4.2.1");var y=r=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(r,t)})):customElements.define(r,t)};var ui={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:Ft},fi=(r=ui,t,e)=>{let{kind:i,metadata:s}=e,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),i==="accessor"){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,r)},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(i==="setter"){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+i)};function m(r){return(t,e)=>typeof e=="object"?fi(r,t,e):((i,s,o)=>{let n=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(r,t,e)}function z(r){return m({...r,state:!0,attribute:!1})}var mi=Object.defineProperty,gi=(r,t,e)=>t in r?mi(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,Re=(r,t,e)=>(gi(r,typeof t!="symbol"?t+"":t,e),e),_i=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)},Te=(r,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return r.has(t)},te=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},_r=(r,t,e)=>(_i(r,t,"access private method"),e);function vr(r,t){return Object.is(r,t)}var C=null,$t=!1,ee=1,re=Symbol("SIGNAL");function lt(r){let t=C;return C=r,t}function vi(){return C}function bi(){return $t}var De={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ie(r){if($t)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(C===null)return;C.consumerOnSignalRead(r);let t=C.nextProducerIndex++;if(ct(C),t<C.producerNode.length&&C.producerNode[t]!==r&&Oe(C)){let e=C.producerNode[t];se(e,C.producerIndexOfThis[t])}C.producerNode[t]!==r&&(C.producerNode[t]=r,C.producerIndexOfThis[t]=Oe(C)?yr(r,C,t):0),C.producerLastReadVersion[t]=r.version}function xi(){ee++}function br(r){if(!(!r.dirty&&r.lastCleanEpoch===ee)){if(!r.producerMustRecompute(r)&&!Ei(r)){r.dirty=!1,r.lastCleanEpoch=ee;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=ee}}function xr(r){if(r.liveConsumerNode===void 0)return;let t=$t;$t=!0;try{for(let e of r.liveConsumerNode)e.dirty||wi(e)}finally{$t=t}}function yi(){return C?.consumerAllowSignalWrites!==!1}function wi(r){var t;r.dirty=!0,xr(r),(t=r.consumerMarkedDirty)==null||t.call(r.wrapper??r)}function Si(r){return r&&(r.nextProducerIndex=0),lt(r)}function $i(r,t){if(lt(t),!(!r||r.producerNode===void 0||r.producerIndexOfThis===void 0||r.producerLastReadVersion===void 0)){if(Oe(r))for(let e=r.nextProducerIndex;e<r.producerNode.length;e++)se(r.producerNode[e],r.producerIndexOfThis[e]);for(;r.producerNode.length>r.nextProducerIndex;)r.producerNode.pop(),r.producerLastReadVersion.pop(),r.producerIndexOfThis.pop()}}function Ei(r){ct(r);for(let t=0;t<r.producerNode.length;t++){let e=r.producerNode[t],i=r.producerLastReadVersion[t];if(i!==e.version||(br(e),i!==e.version))return!0}return!1}function yr(r,t,e){var i;if(Ue(r),ct(r),r.liveConsumerNode.length===0){(i=r.watched)==null||i.call(r.wrapper);for(let s=0;s<r.producerNode.length;s++)r.producerIndexOfThis[s]=yr(r.producerNode[s],r,s)}return r.liveConsumerIndexOfThis.push(e),r.liveConsumerNode.push(t)-1}function se(r,t){var e;if(Ue(r),ct(r),typeof ngDevMode<"u"&&ngDevMode&&t>=r.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${r.liveConsumerNode.length} consumers)`);if(r.liveConsumerNode.length===1){(e=r.unwatched)==null||e.call(r.wrapper);for(let s=0;s<r.producerNode.length;s++)se(r.producerNode[s],r.producerIndexOfThis[s])}let i=r.liveConsumerNode.length-1;if(r.liveConsumerNode[t]=r.liveConsumerNode[i],r.liveConsumerIndexOfThis[t]=r.liveConsumerIndexOfThis[i],r.liveConsumerNode.length--,r.liveConsumerIndexOfThis.length--,t<r.liveConsumerNode.length){let s=r.liveConsumerIndexOfThis[t],o=r.liveConsumerNode[t];ct(o),o.producerIndexOfThis[s]=t}}function Oe(r){var t;return r.consumerIsAlwaysLive||(((t=r?.liveConsumerNode)==null?void 0:t.length)??0)>0}function ct(r){r.producerNode??(r.producerNode=[]),r.producerIndexOfThis??(r.producerIndexOfThis=[]),r.producerLastReadVersion??(r.producerLastReadVersion=[])}function Ue(r){r.liveConsumerNode??(r.liveConsumerNode=[]),r.liveConsumerIndexOfThis??(r.liveConsumerIndexOfThis=[])}function wr(r){if(br(r),ie(r),r.value===Ne)throw r.error;return r.value}function Ci(r){let t=Object.create(ki);t.computation=r;let e=()=>wr(t);return e[re]=t,e}var Ie=Symbol("UNSET"),Le=Symbol("COMPUTING"),Ne=Symbol("ERRORED"),ki={...De,value:Ie,dirty:!0,error:null,equal:vr,producerMustRecompute(r){return r.value===Ie||r.value===Le},producerRecomputeValue(r){if(r.value===Le)throw new Error("Detected cycle in computations.");let t=r.value;r.value=Le;let e=Si(r),i,s=!1;try{i=r.computation.call(r.wrapper),s=t!==Ie&&t!==Ne&&r.equal.call(r.wrapper,t,i)}catch(o){i=Ne,r.error=o}finally{$i(r,e)}if(s){r.value=t;return}r.value=i,r.version++}};function Ai(){throw new Error}var zi=Ai;function Pi(){zi()}function Mi(r){let t=Object.create(Ii);t.value=r;let e=()=>(ie(t),t.value);return e[re]=t,e}function Ri(){return ie(this),this.value}function Ti(r,t){yi()||Pi(),r.equal.call(r.wrapper,r.value,t)||(r.value=t,Li(r))}var Ii={...De,equal:vr,value:void 0};function Li(r){r.version++,xi(),xr(r)}var A=Symbol("node"),S;(r=>{var t,e,i,s,o,n;class l{constructor(u,h={}){te(this,e),Re(this,t);let f=Mi(u)[re];if(this[A]=f,f.wrapper=this,h){let v=h.equals;v&&(f.equal=v),f.watched=h[r.subtle.watched],f.unwatched=h[r.subtle.unwatched]}}get(){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Ri.call(this[A])}set(u){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(bi())throw new Error("Writes to signals not permitted during Watcher callback");let h=this[A];Ti(h,u)}}t=A,e=new WeakSet,i=function(){},r.isState=c=>typeof c=="object"&&Te(e,c),r.State=l;class a{constructor(u,h){te(this,o),Re(this,s);let f=Ci(u)[re];if(f.consumerAllowSignalWrites=!0,this[A]=f,f.wrapper=this,h){let v=h.equals;v&&(f.equal=v),f.watched=h[r.subtle.watched],f.unwatched=h[r.subtle.unwatched]}}get(){if(!(0,r.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return wr(this[A])}}s=A,o=new WeakSet,n=function(){},r.isComputed=c=>typeof c=="object"&&Te(o,c),r.Computed=a,(c=>{var u,h,x,f,v;function k($){let w,b=null;try{b=lt(null),w=$()}finally{lt(b)}return w}c.untrack=k;function H($){var w;if(!(0,r.isComputed)($)&&!(0,r.isWatcher)($))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((w=$[A].producerNode)==null?void 0:w.map(b=>b.wrapper))??[]}c.introspectSources=H;function R($){var w;if(!(0,r.isComputed)($)&&!(0,r.isState)($))throw new TypeError("Called introspectSinks without a Signal argument");return((w=$[A].liveConsumerNode)==null?void 0:w.map(b=>b.wrapper))??[]}c.introspectSinks=R;function ye($){if(!(0,r.isComputed)($)&&!(0,r.isState)($))throw new TypeError("Called hasSinks without a Signal argument");let w=$[A].liveConsumerNode;return w?w.length>0:!1}c.hasSinks=ye;function Qr($){if(!(0,r.isComputed)($)&&!(0,r.isWatcher)($))throw new TypeError("Called hasSources without a Computed or Watcher argument");let w=$[A].producerNode;return w?w.length>0:!1}c.hasSources=Qr;class Zr{constructor(w){te(this,h),te(this,f),Re(this,u);let b=Object.create(De);b.wrapper=this,b.consumerMarkedDirty=w,b.consumerIsAlwaysLive=!0,b.consumerAllowSignalWrites=!1,b.producerNode=[],this[A]=b}watch(...w){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");_r(this,f,v).call(this,w);let b=this[A];b.dirty=!1;let T=lt(b);for(let Vt of w)ie(Vt[A]);lt(T)}unwatch(...w){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");_r(this,f,v).call(this,w);let b=this[A];ct(b);for(let T=b.producerNode.length-1;T>=0;T--)if(w.includes(b.producerNode[T].wrapper)){se(b.producerNode[T],b.producerIndexOfThis[T]);let Vt=b.producerNode.length-1;if(b.producerNode[T]=b.producerNode[Vt],b.producerIndexOfThis[T]=b.producerIndexOfThis[Vt],b.producerNode.length--,b.producerIndexOfThis.length--,b.nextProducerIndex--,T<b.producerNode.length){let Yr=b.producerIndexOfThis[T],Ze=b.producerNode[T];Ue(Ze),Ze.liveConsumerIndexOfThis[Yr]=T}}}getPending(){if(!(0,r.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[A].producerNode.filter(b=>b.dirty).map(b=>b.wrapper)}}u=A,h=new WeakSet,x=function(){},f=new WeakSet,v=function($){for(let w of $)if(!(0,r.isComputed)(w)&&!(0,r.isState)(w))throw new TypeError("Called watch/unwatch without a Computed or State argument")},r.isWatcher=$=>Te(h,$),c.Watcher=Zr;function Xr(){var $;return($=vi())==null?void 0:$.wrapper}c.currentComputed=Xr,c.watched=Symbol("watched"),c.unwatched=Symbol("unwatched")})(r.subtle||(r.subtle={}))})(S||(S={}));var He=!1,Sr=new S.subtle.Watcher(()=>{He||(He=!0,queueMicrotask(()=>{He=!1;for(let r of Sr.getPending())r.get();Sr.watch()}))}),Oi=Symbol("SignalWatcherBrand"),Ni=new FinalizationRegistry(r=>{r.unwatch(...S.subtle.introspectSources(r))}),$r=new WeakMap;function Et(r){return r[Oi]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),r):class extends r{constructor(){super(...arguments),this._$St=new Map,this._$So=new S.State(0),this._$Si=!1}_$Sl(){var t,e;let i=[],s=[];this._$St.forEach((n,l)=>{(n?.beforeUpdate?i:s).push(l)});let o=(t=this.h)===null||t===void 0?void 0:t.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));i.forEach(n=>n.get()),(e=this._$Su)===null||e===void 0||e.get(),o.forEach(n=>n.get()),s.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new S.Computed(()=>{this._$So.get(),super.performUpdate()});let t=this.h=new S.subtle.Watcher(function(){let e=$r.get(this);e!==void 0&&(e._$Si===!1&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});$r.set(t,this),Ni.register(this,t),t.watch(this._$Su),t.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(this.h===void 0)return;let t=!1;this.h.unwatch(...S.subtle.introspectSources(this.h).filter(e=>{var i;let s=((i=this._$St.get(e))===null||i===void 0?void 0:i.manualDispose)!==!0;return s&&this._$St.delete(e),t||(t=!s),s})),t||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(t,e){var i;this._$S_();let s=new S.Computed(()=>{t()});return this.h.watch(s),this._$St.set(s,e),(i=e?.beforeUpdate)!==null&&i!==void 0&&i?S.subtle.untrack(()=>s.get()):this.updateComplete.then(()=>S.subtle.untrack(()=>s.get())),()=>{this._$St.delete(s),this.h.unwatch(s),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var K={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},q=r=>(...t)=>({_$litDirective$:r,values:t}),F=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Di}=mr;var Cr=r=>r.strings===void 0,Er=()=>document.createComment(""),ht=(r,t,e)=>{let i=r._$AA.parentNode,s=t===void 0?r._$AB:t._$AA;if(e===void 0){let o=i.insertBefore(Er(),s),n=i.insertBefore(Er(),s);e=new Di(o,n,r,r.options)}else{let o=e._$AB.nextSibling,n=e._$AM,l=n!==r;if(l){let a;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(a=r._$AU)!==n._$AU&&e._$AP(a)}if(o!==s||l){let a=e._$AA;for(;a!==o;){let c=a.nextSibling;i.insertBefore(a,s),a=c}}}return e},G=(r,t,e=r)=>(r._$AI(t,e),r),Ui={},kr=(r,t=Ui)=>r._$AH=t,Ar=r=>r._$AH,oe=r=>{r._$AR(),r._$AA.remove()};var Ct=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),Ct(i,t);return!0},ne=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},zr=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),Vi(t)}};function Hi(r){this._$AN!==void 0?(ne(this),this._$AM=r,zr(this)):this._$AM=r}function Wi(r,t=!1,e=0){let i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=e;o<i.length;o++)Ct(i[o],!1),ne(i[o]);else i!=null&&(Ct(i,!1),ne(i));else Ct(this,r)}var Vi=r=>{r.type==K.CHILD&&(r._$AP??=Wi,r._$AQ??=Hi)},dt=class extends F{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),zr(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Ct(this,t),ne(this))}setValue(t){if(Cr(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var We=!1,Ve=new S.subtle.Watcher(async()=>{We||(We=!0,queueMicrotask(()=>{We=!1;for(let r of Ve.getPending())r.get();Ve.watch()}))}),ae=class extends dt{_$S_(){var t,e;this._$Sm===void 0&&(this._$Sj=new S.Computed(()=>{var i;let s=(i=this._$SW)===null||i===void 0?void 0:i.get();return this.setValue(s),s}),this._$Sm=(e=(t=this._$Sk)===null||t===void 0?void 0:t.h)!==null&&e!==void 0?e:Ve,this._$Sm.watch(this._$Sj),S.subtle.untrack(()=>{var i;return(i=this._$Sj)===null||i===void 0?void 0:i.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return S.subtle.untrack(()=>t.get())}update(t,[e]){var i,s;return(i=this._$Sk)!==null&&i!==void 0||(this._$Sk=(s=t.options)===null||s===void 0?void 0:s.host),e!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=e,this._$S_(),S.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},qe=q(ae);var je=r=>(t,...e)=>r(t,...e.map(i=>i instanceof S.State||i instanceof S.Computed?qe(i):i)),qi=je(p),ji=je(pr);var zo=S.State,Po=S.Computed,j=(r,t)=>new S.State(r,t),le=(r,t)=>new S.Computed(r,t);var Bi=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function Pr(r,t=""){for(let{pattern:e,name:i}of Bi){let s=e.exec(r);if(s)return{name:i,path:s[1],params:new URLSearchParams(t)}}return{name:"not-found",params:new URLSearchParams(t)}}var M=j(Pr(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{M.set(Pr(window.location.pathname,window.location.search))});var Uo=g`
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
`,Ho=g`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,Mr=g`
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
`,pt=g`
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
`,Tr=g`
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
`,Wo=g`
  .hidden {
    display: none !important;
  }
`;var Ir=(r,t,e)=>{let i=new Map;for(let s=t;s<=e;s++)i.set(r[s],s);return i},Lr=q(class extends F{constructor(r){if(super(r),r.type!==K.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let s=[],o=[],n=0;for(let l of r)s[n]=i?i(l,n):n,o[n]=e(l,n),n++;return{values:o,keys:s}}render(r,t,e){return this.dt(r,t,e).values}update(r,[t,e,i]){let s=Ar(r),{values:o,keys:n}=this.dt(t,e,i);if(!Array.isArray(s))return this.ut=n,o;let l=this.ut??=[],a=[],c,u,h=0,x=s.length-1,f=0,v=o.length-1;for(;h<=x&&f<=v;)if(s[h]===null)h++;else if(s[x]===null)x--;else if(l[h]===n[f])a[f]=G(s[h],o[f]),h++,f++;else if(l[x]===n[v])a[v]=G(s[x],o[v]),x--,v--;else if(l[h]===n[v])a[v]=G(s[h],o[v]),ht(r,a[v+1],s[h]),h++,v--;else if(l[x]===n[f])a[f]=G(s[x],o[f]),ht(r,s[h],s[x]),x--,f++;else if(c===void 0&&(c=Ir(n,f,v),u=Ir(l,h,x)),c.has(l[h]))if(c.has(l[x])){let k=u.get(n[f]),H=k!==void 0?s[k]:null;if(H===null){let R=ht(r,s[h]);G(R,o[f]),a[f]=R}else a[f]=G(H,o[f]),ht(r,s[h],H),s[k]=null;f++}else oe(s[x]),x--;else oe(s[h]),h++;for(;f<=v;){let k=ht(r,a[v+1]);G(k,o[f]),a[f++]=k}for(;h<=x;){let k=s[h++];k!==null&&oe(k)}return this.ut=n,kr(r,a),I}});var kt=class r extends Event{constructor(t){super(r.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};kt.eventName="rangeChanged";var At=class r extends Event{constructor(t){super(r.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};At.eventName="visibilityChanged";var zt=class r extends Event{constructor(){super(r.eventName,{bubbles:!1})}};zt.eventName="unpinned";var Be=class{constructor(t){this._element=null;let e=t??window;this._node=e,t&&(this._element=t)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}},ce=class extends Be{constructor(t,e){super(e),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let i=this._node;this._originalScrollTo=i.scrollTo,this._originalScrollBy=i.scrollBy,this._originalScroll=i.scroll,this._attach(t)}get _destination(){return this.__destination}get scrolling(){return this._destination!==null}scrollTo(t,e){let i=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;this._scrollTo(i)}scrollBy(t,e){let i=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;i.top!==void 0&&(i.top+=this.scrollTop),i.left!==void 0&&(i.left+=this.scrollLeft),this._scrollTo(i)}_nativeScrollTo(t){this._originalScrollTo.bind(this._element||window)(t)}_scrollTo(t,e=null,i=null){this._end!==null&&this._end(),t.behavior==="smooth"?(this._setDestination(t),this._retarget=e,this._end=i):this._resetScrollState(),this._nativeScrollTo(t)}_setDestination(t){let{top:e,left:i}=t;return e=e===void 0?void 0:Math.max(0,Math.min(e,this.maxScrollTop)),i=i===void 0?void 0:Math.max(0,Math.min(i,this.maxScrollLeft)),this._destination!==null&&i===this._destination.left&&e===this._destination.top?!1:(this.__destination={top:e,left:i,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(t){this._destination&&this._setDestination(t)&&this._nativeScrollTo(this._destination)}managedScrollTo(t,e,i){return this._scrollTo(t,e,i),this._updateManagedScrollTo}correctScrollError(t){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(t),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(this._destination!==null){let{scrollTop:t,scrollLeft:e}=this,{top:i,left:s}=this._destination;i=Math.min(i||0,this.maxScrollTop),s=Math.min(s||0,this.maxScrollLeft);let o=Math.abs(i-t),n=Math.abs(s-e);o<1&&n<1&&(this._end&&this._end(),this._resetScrollState())}}detach(t){return this._clients.delete(t),this._clients.size===0&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(t){this._clients.add(t),this._clients.size===1&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};var Wr=typeof window<"u"?window.ResizeObserver:void 0;var jr=Symbol("virtualizerRef"),pe="virtualizer-sizer",Vr,fe=class{constructor(t){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!t)throw new Error("Virtualizer constructor requires a configuration object");if(t.hostElement)this._init(t);else throw new Error('Virtualizer configuration requires the "hostElement" property')}set items(t){Array.isArray(t)&&t!==this._items&&(this._itemsChanged=!0,this._items=t,this._schedule(this._updateLayout))}_init(t){this._isScroller=!!t.scroller,this._initHostElement(t);let e=t.layout||{};this._layoutInitialized=this._initLayout(e)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new Wr(()=>this._hostElementSizeChanged()),this._childrenRO=new Wr(this._childrenSizeChanged.bind(this))}_initHostElement(t){let e=this._hostElement=t.hostElement;this._applyVirtualizerStyles(),e[jr]=this}connected(){this._initObservers();let t=this._isScroller;this._clippingAncestors=Xi(this._hostElement,t),this._scrollerController=new ce(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(t=>{t.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(t),this._hostElementRO.observe(t)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(t=>this._childrenRO.observe(t)),this._scrollEventListeners.forEach(t=>t.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(t=>t.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let t=this._hostElement;if(!this._sizer){let e=t.querySelector(`[${pe}]`);e||(e=document.createElement("div"),e.setAttribute(pe,""),t.appendChild(e)),Object.assign(e.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),e.textContent="&nbsp;",e.setAttribute(pe,""),this._sizer=e}return this._sizer}async updateLayoutConfig(t){await this._layoutInitialized;let e=t.type||Vr;if(typeof e=="function"&&this._layout instanceof e){let i={...t};return delete i.type,this._layout.config=i,!0}return!1}async _initLayout(t){let e,i;if(typeof t.type=="function"){i=t.type;let s={...t};delete s.type,e=s}else e=t;i===void 0&&(Vr=i=(await Promise.resolve().then(()=>(Hr(),Ur))).FlowLayout),this._layout=new i(s=>this._handleLayoutMessage(s),e),this._layout.measureChildren&&typeof this._layout.updateItemSizes=="function"&&(typeof this._layout.measureChildren=="function"&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){this._benchmarkStart===null&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(this._benchmarkStart!==null){let t=window.performance.now(),e=t-this._benchmarkStart,s=performance.getEntriesByName("uv-virtualizing","measure").filter(o=>o.startTime>=this._benchmarkStart&&o.startTime<t).reduce((o,n)=>o+n.duration,0);return this._benchmarkStart=null,{timeElapsed:e,virtualizationTime:s}}return null}_measureChildren(){let t={},e=this._children,i=this._measureChildOverride||this._measureChild;for(let s=0;s<e.length;s++){let o=e[s],n=this._first+s;(this._itemsChanged||this._toBeMeasured.has(o))&&(t[n]=i.call(this,o,this._items[n]))}this._childMeasurements=t,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(t){let{width:e,height:i}=t.getBoundingClientRect();return Object.assign({width:e,height:i},Qi(t))}async _schedule(t){this._scheduled.has(t)||(this._scheduled.add(t),await Promise.resolve(),this._scheduled.delete(t),t.call(this))}async _updateDOM(t){this._scrollSize=t.scrollSize,this._adjustRange(t.range),this._childrenPos=t.childPositions,this._scrollError=t.scrollError||null;let{_rangeChanged:e,_itemsChanged:i}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(e||i)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(t=>this._childrenRO.observe(t)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),this._childMeasurements!==null&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(t){console.warn("Error measuring performance data: ",t)}window.performance.mark("uv-start")}this._scrollerController.correctingScrollError===!1&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(t){t.type==="scroll"?(t.currentTarget===window||this._clippingAncestors.includes(t.currentTarget))&&this._handleScrollEvent():console.warn("event not handled",t)}_handleLayoutMessage(t){t.type==="stateChanged"?this._updateDOM(t):t.type==="visibilityChanged"?(this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._notifyVisibility()):t.type==="unpinned"&&this._hostElement.dispatchEvent(new zt)}get _children(){let t=[],e=this._hostElement.firstElementChild;for(;e;)e.hasAttribute(pe)||t.push(e),e=e.nextElementSibling;return t}_updateView(){let t=this._hostElement,e=this._scrollerController?.element,i=this._layout;if(t&&e&&i){let s,o,n,l,a=t.getBoundingClientRect();s=0,o=0,n=window.innerHeight,l=window.innerWidth;let c=this._clippingAncestors.map(R=>R.getBoundingClientRect());c.unshift(a);for(let R of c)s=Math.max(s,R.top),o=Math.max(o,R.left),n=Math.min(n,R.bottom),l=Math.min(l,R.right);let u=e.getBoundingClientRect(),h={left:a.left-u.left,top:a.top-u.top},x={width:e.scrollWidth,height:e.scrollHeight},f=s-a.top+t.scrollTop,v=o-a.left+t.scrollLeft,k=Math.max(0,n-s),H=Math.max(0,l-o);i.viewportSize={width:H,height:k},i.viewportScroll={top:f,left:v},i.totalScrollSize=x,i.offsetWithinScroller=h}}_sizeHostElement(t){let i=t&&t.width!==null?Math.min(82e5,t.width):0,s=t&&t.height!==null?Math.min(82e5,t.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${i}px, ${s}px)`;else{let o=this._hostElement.style;o.minWidth=i?`${i}px`:"100%",o.minHeight=s?`${s}px`:"100%"}}_positionChildren(t){t&&t.forEach(({top:e,left:i,width:s,height:o,xOffset:n,yOffset:l},a)=>{let c=this._children[a-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${i}px, ${e}px)`,s!==void 0&&(c.style.width=s+"px"),o!==void 0&&(c.style.height=o+"px"),c.style.left=n===void 0?null:n+"px",c.style.top=l===void 0?null:l+"px")})}async _adjustRange(t){let{_first:e,_last:i,_firstVisible:s,_lastVisible:o}=this;this._first=t.first,this._last=t.last,this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==e||this._last!==i,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==s||this._lastVisible!==o}_correctScrollError(){if(this._scrollError){let{scrollTop:t,scrollLeft:e}=this._scrollerController,{top:i,left:s}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:t-i,left:e-s})}}element(t){return t===1/0&&(t=this._items.length-1),this._items?.[t]===void 0?void 0:{scrollIntoView:(e={})=>this._scrollElementIntoView({...e,index:t})}}_scrollElementIntoView(t){if(t.index>=this._first&&t.index<=this._last)this._children[t.index-this._first].scrollIntoView(t);else if(t.index=Math.min(t.index,this._items.length-1),t.behavior==="smooth"){let e=this._layout.getScrollIntoViewCoordinates(t),{behavior:i}=t;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(e,{behavior:i}),()=>this._layout.getScrollIntoViewCoordinates(t),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=t}else this._layout.pin=t}_checkScrollIntoViewTarget(t){let{index:e}=this._scrollIntoViewTarget||{};e&&t?.has(e)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new kt({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new At({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((t,e)=>{this._layoutCompleteResolver=t,this._layoutCompleteRejecter=e})),this._layoutCompletePromise}_rejectLayoutCompletePromise(t){this._layoutCompleteRejecter!==null&&this._layoutCompleteRejecter(t),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&this._pendingLayoutComplete===null&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){this._layoutCompleteResolver!==null&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(t){if(this._layout?.measureChildren){for(let e of t)this._toBeMeasured.set(e.target,e.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function Qi(r){let t=window.getComputedStyle(r);return{marginTop:ue(t.marginTop),marginRight:ue(t.marginRight),marginBottom:ue(t.marginBottom),marginLeft:ue(t.marginLeft)}}function ue(r){let t=r?parseFloat(r):NaN;return Number.isNaN(t)?0:t}function qr(r){if(r.assignedSlot!==null)return r.assignedSlot;if(r.parentElement!==null)return r.parentElement;let t=r.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}function Zi(r,t=!1){let e=[],i=t?r:qr(r);for(;i!==null;)e.push(i),i=qr(i);return e}function Xi(r,t=!1){let e=!1;return Zi(r,t).filter(i=>{if(e)return!1;let s=getComputedStyle(i);return e=s.position==="fixed",s.overflow!=="visible"})}var Yi=r=>r,ts=(r,t)=>p`${t}: ${JSON.stringify(r,null,2)}`,Ge=class extends dt{constructor(t){if(super(t),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,i)=>ts(e,i+this._first),this._keyFunction=(e,i)=>Yi(e,i+this._first),this._items=[],t.type!==K.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(t){t&&this._setFunctions(t);let e=[];if(this._first>=0&&this._last>=this._first)for(let i=this._first;i<=this._last;i++)e.push(this._items[i]);return Lr(e,this._keyFunction,this._renderItem)}update(t,[e]){this._setFunctions(e);let i=this._items!==e.items;return this._items=e.items||[],this._virtualizer?this._updateVirtualizerConfig(t,e):this._initialize(t,e),i?I:this.render()}async _updateVirtualizerConfig(t,e){if(!await this._virtualizer.updateLayoutConfig(e.layout||{})){let s=t.parentNode;this._makeVirtualizer(s,e)}this._virtualizer.items=this._items}_setFunctions(t){let{renderItem:e,keyFunction:i}=t;e&&(this._renderItem=(s,o)=>e(s,o+this._first)),i&&(this._keyFunction=(s,o)=>i(s,o+this._first))}_makeVirtualizer(t,e){this._virtualizer&&this._virtualizer.disconnected();let{layout:i,scroller:s,items:o}=e;this._virtualizer=new fe({hostElement:t,layout:i,scroller:s}),this._virtualizer.items=o,this._virtualizer.connected()}_initialize(t,e){let i=t.parentNode;i&&i.nodeType===1&&(i.addEventListener("rangeChanged",s=>{this._first=s.first,this._last=s.last,this.setValue(this.render())}),this._makeVirtualizer(i,e))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}},Br=q(Ge);async function Fr(r,t,e){let i="/api/search?"+r.toString(),s=await fetch(i,{signal:e});if(!s.ok){let o=await s.text();throw new Error(`search failed (${s.status}): ${o}`)}if(!s.body)throw new Error("response has no body");await es(s.body,o=>{switch(o.type){case"result":t.onResult?.(o);break;case"file":t.onFile?.(o);break;case"facets":t.onFacets?.(o);break;case"done":t.onDone?.(o);break}})}async function es(r,t){let e=r.getReader(),i=new TextDecoder,s="";try{for(;;){let{done:n,value:l}=await e.read();if(n)break;s+=i.decode(l,{stream:!0});let a;for(;(a=s.indexOf(`
`))!==-1;){let c=s.slice(0,a).trim();s=s.slice(a+1),c.length!==0&&t(JSON.parse(c))}}s+=i.decode();let o=s.trim();o.length>0&&t(JSON.parse(o))}finally{e.releaseLock()}}function ut(r){let t=r.indexOf("/+/");if(t===-1)return{repo:r,version:"",filePath:""};let e=r.slice(0,t),i=r.slice(t+3),s=e.indexOf("/");return s===-1?{repo:e,version:"",filePath:i}:{repo:e.slice(0,s),version:e.slice(s+1),filePath:i}}function Kr(r,t={},e={}){let i=new URLSearchParams;if(r.trim()&&i.set("q",r.trim()),t.literal&&i.set("literal","true"),t.caseSensitive&&i.set("fold_case","false"),t.repos?.length)for(let s of t.repos)i.append("repo",s);for(let[s,o]of Object.entries(e))for(let n of o)i.append(s,n);return i}var ge=class{constructor(){this.lastCommittedUrl=""}commit(t,e={},i={}){let s=Kr(t,e,i),o=t?`${t} \xB7 code search`:"code search",n=me(s);if(!t)return this.lastCommittedUrl="",[{type:"replaceUrl",url:me(new URLSearchParams),title:o},{type:"clearResults"}];let l=[];return n!==this.lastCommittedUrl&&this.lastCommittedUrl!==""?l.push({type:"pushUrl",url:n,title:o}):l.push({type:"replaceUrl",url:n,title:o}),l.push({type:"search",params:s}),this.lastCommittedUrl=n,l}popstate(t,e){this.lastCommittedUrl=me(e);let i=t?`${t} \xB7 code search`:"code search",s=[{type:"replaceUrl",url:me(e),title:i}];return t?s.push({type:"search",params:e}):s.push({type:"clearResults"}),s}};function me(r){let t=r.toString();return"/search"+(t?"?"+t:"")}var _e=class{constructor(){this.results=[];this.files=[];this.dirty=!1;this.flushed=!1}start(){return this.results=[],this.files=[],this.dirty=!1,this.flushed=!1,{loading:!0,error:null,done:null}}onResult(t){this.results.push(t),this.dirty=!0}onFile(t){this.files.push(t),this.dirty=!0}flush(){if(!this.dirty)return null;this.dirty=!1;let t={results:[...this.results],files:[...this.files]};return this.flushed||(t.facets=null,this.flushed=!0),t}onFacets(t){return{facets:t}}onDone(t){return{results:this.results,files:this.files,done:t,loading:!1}}onError(t){return{error:t,loading:!1}}};var Mt=le(()=>M.get().params.get("q")??""),In=le(()=>{let r=M.get().params;return{literal:r.get("literal")==="true",caseSensitive:r.get("fold_case")==="false"}}),Gr=le(()=>{let r=M.get().params.get("context");if(r!==null){let t=parseInt(r,10);if(!isNaN(t)&&t>=0)return t}return 3}),Rt=j([]),Tt=j([]),It=j(null),Lt=j(null),Ot=j(!1),Nt=j(null),Je=null;async function rs(){Je&&Je.abort();let r=new AbortController;if(Je=r,!Mt.get()){Rt.set([]),Tt.set([]),It.set(null),Lt.set(null),Ot.set(!1),Nt.set(null);return}let e=M.get(),i=new URLSearchParams(e.params),s=new _e;ft(s.start());let o=setInterval(()=>{let n=s.flush();n&&ft(n)},100);try{await Fr(i,{onResult(n){s.onResult(n)},onFile(n){s.onFile(n)},onFacets(n){ft(s.onFacets(n))},onDone(n){clearInterval(o),ft(s.onDone(n))},onError(n){clearInterval(o),r.signal.aborted||ft(s.onError(n.message))}},r.signal)}catch(n){clearInterval(o),r.signal.aborted||ft(s.onError(n instanceof Error?n.message:String(n)))}}function ft(r){"results"in r&&Rt.set(r.results),"files"in r&&Tt.set(r.files),"facets"in r&&It.set(r.facets),"done"in r&&Lt.set(r.done),"loading"in r&&Ot.set(r.loading),"error"in r&&Nt.set(r.error)}var ve=new ge,et=null;function Jr(r,t={},e={}){et&&clearTimeout(et),et=setTimeout(()=>{et=null,xe(ve.commit(r,t,e))},200)}function be(r,t={},e={}){et&&(clearTimeout(et),et=null),xe(ve.commit(r,t,e))}{let t=M.get().params.get("q")??"";t&&xe(ve.commit(t))}window.addEventListener("popstate",()=>{let r=M.get(),t=r.params.get("q")??"";xe(ve.popstate(t,r.params))});function xe(r){for(let t of r)switch(t.type){case"pushUrl":history.pushState(null,t.title,t.url),document.title=t.title,M.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"replaceUrl":history.replaceState(null,t.title,t.url),document.title=t.title,M.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"search":rs();break;case"clearResults":Rt.set([]),Tt.set([]),It.set(null),Lt.set(null),Ot.set(!1),Nt.set(null);break}}var rt=class extends _{constructor(){super(...arguments);this.value="";this.error=""}render(){return p`
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
          ${this.error?p`<span id="errortext">${this.error}</span>`:E}
        </div>
      </div>
    `}onInput(){let e=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:e.value},bubbles:!0,composed:!0}))}onKeydown(e){if(e.key==="Enter"){let i=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-submit",{detail:{value:i.value},bubbles:!0,composed:!0}))}}appendQuery(e){let i=this.renderRoot.querySelector("#searchbox");i&&(i.value+=e,this.value=i.value,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:i.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};rt.styles=[Tr,g`
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
    `],d([m()],rt.prototype,"value",2),d([m()],rt.prototype,"error",2),rt=d([y("cs-search-input")],rt);var D=class extends _{constructor(){super(...arguments);this.groups=[];this._open=!1;this._search="";this._selected=new Set;this._onOutsideClick=e=>{this._open&&(e.composedPath().includes(this)||(this._open=!1))}}get _options(){return this.groups.flatMap(e=>e.repos.map(i=>({value:i,label:i.split("/").pop()??i,group:e.label,selected:this._selected.has(i)})))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick)}get selectedRepos(){return[...this._selected]}get _buttonText(){let e=this._selected.size;return e===0?"(all repositories)":e<=4?this._options.filter(s=>s.selected).map(s=>s.label).join(", "):`(${e} repositories)`}get _filteredGroups(){let e=this._search.toLowerCase(),i=new Map;for(let s of this._options)e&&!s.value.toLowerCase().includes(e)&&!s.label.toLowerCase().includes(e)||(i.has(s.group)||i.set(s.group,[]),i.get(s.group).push(s));return[...i.entries()].map(([s,o])=>({label:s,options:o}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(e){let i=new Set(this._selected);i.has(e)?i.delete(e):i.add(e),this._selected=i,this._fireChange()}_selectAll(){this._selected=new Set(this._options.map(e=>e.value)),this._fireChange()}_deselectAll(){this._selected=new Set,this._fireChange()}_toggleGroup(e){let i=this._options.filter(n=>n.group===e).map(n=>n.value),s=i.every(n=>this._selected.has(n)),o=new Set(this._selected);for(let n of i)s?o.delete(n):o.add(n);this._selected=o,this._fireChange()}_fireChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}_onSearchInput(e){this._search=e.target.value}_onSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this._search=""),e.key==="Escape"&&(this._open=!1)}render(){return p`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():E}
        `}_renderDropdown(){let e=this._filteredGroups;return p`
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
                <div class="options">${e.map(i=>this._renderGroup(i))}</div>
            </div>
        `}_renderGroup(e){return e.label?p`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(e.label)}>${e.label}</div>
                ${e.options.map(i=>this._renderOption(i))}
            </div>
        `:e.options.map(i=>this._renderOption(i))}_renderOption(e){return p`
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
    `,d([m({type:Array})],D.prototype,"groups",2),d([z()],D.prototype,"_open",2),d([z()],D.prototype,"_search",2),d([z()],D.prototype,"_selected",2),D=d([y("repo-select")],D);var it=class extends _{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let e=this.options.caseSensitive?"false":"auto";return p`
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
    `}setCase(e){let i=e==="false";this.options={...this.options,caseSensitive:i},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}onRepoChange(){let i=this.renderRoot.querySelector("repo-select")?.selectedRepos??[];this.options={...this.options,repos:i.length>0?i:void 0},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};it.styles=[Rr,pt,g`
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
    `],d([m({type:Object})],it.prototype,"options",2),d([m({type:Array})],it.prototype,"repos",2),it=d([y("cs-search-options")],it);var Qe=q(class extends F{constructor(r){if(super(r),r.type!==K.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((t=>r[t])).join(" ")+" "}update(r,[t]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((i=>i!==""))));for(let i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let e=r.element.classList;for(let i of this.st)i in t||(e.remove(i),this.st.delete(i));for(let i in t){let s=!!t[i];s===this.st.has(i)||this.nt?.has(i)||(s?(e.add(i),this.st.add(i)):(e.remove(i),this.st.delete(i)))}return I}});var J=class extends _{render(){return this.start!=null&&this.end!=null?p`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:p`${this.text}`}};J.styles=g`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,d([m()],J.prototype,"text",2),d([m({type:Number})],J.prototype,"start",2),d([m({type:Number})],J.prototype,"end",2),J=d([y("match-str")],J);var O=class extends _{render(){return p`<div class="filename-match">
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
    `,d([m()],O.prototype,"text",2),d([m()],O.prototype,"href",2),d([m({type:Number})],O.prototype,"start",2),d([m({type:Number})],O.prototype,"end",2),d([m()],O.prototype,"repo",2),d([m()],O.prototype,"version",2),O=d([y("filename-match")],O);var U=class extends _{render(){let t=this.start!=null&&this.end!=null;return p`<a class=${Qe({"lno-link":!0,matchlno:t})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Qe({matchline:t})}
                >${t?p`<match-str
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
    `,d([m({type:Number})],U.prototype,"lineNo",2),d([m()],U.prototype,"text",2),d([m()],U.prototype,"href",2),d([m({type:Number})],U.prototype,"start",2),d([m({type:Number})],U.prototype,"end",2),U=d([y("match-line")],U);function is(r){let t=r.lastIndexOf("/");return t<0?".":r.slice(0,t)}function ss(r){let t=r.lastIndexOf("/");return t<0?r:r.slice(t+1)}var st=class extends _{constructor(){super(...arguments);this.noContext=!1}render(){let{repo:e,version:i,filePath:s}=ut(this.result.path),o=`/view/${this.result.path}`,n=this.splitGroups(this.result.lines),l=i.length>6?i.slice(0,6):i,a=is(s),c=ss(s);return p`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${o}>
              <span class="repo">${e}:</span><span class="version">${l}:</span>${a}/<span class="filename">${c}</span>
            </a>
          </span>
        </div>
        ${n.map(u=>p`
            <div class="match">
              <div class="contents">
                ${u.map(h=>{let x=h[0],f=h[1],v=h.length>2?h[2]:void 0,k=v!==void 0&&v.length>0,H=`${o}#L${x}`,R=k&&v?v[0][0]:void 0,ye=k&&v?v[0][1]:void 0;return p`
                    <match-line
                      class=${k?"match-hit":"context"}
                      .lineNo=${x}
                      text=${f}
                      href=${H}
                      .start=${R}
                      .end=${ye}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(e){let i=[],s=[];for(let o of e)o===null?s.length>0&&(i.push(s),s=[]):s.push(o);return s.length>0&&i.push(s),i}};st.styles=[Mr,N,g`
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
    `],d([m({type:Object})],st.prototype,"result",2),d([m({type:Boolean,reflect:!0,attribute:"no-context"})],st.prototype,"noContext",2),st=d([y("cs-result-group")],st);var B=class extends _{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return p`<div id="countarea">Searching...</div>`;let e=this.truncated?`${this.total}+`:`${this.total}`;return p`
      <div id="countarea">
        <span id="numresults">${e}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};B.styles=[pt,g`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],d([m({type:Number})],B.prototype,"total",2),d([m({type:Number})],B.prototype,"timeMs",2),d([m({type:Boolean})],B.prototype,"truncated",2),d([m({type:Boolean})],B.prototype,"loading",2),B=d([y("cs-result-stats")],B);var ot=class extends _{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){let e=this.facets&&(this.facets.ext?.length||this.facets.repo?.length||this.facets.path?.length),i=Object.values(this.selected).some(n=>n.size>0);if(!e&&!i)return E;let o=[{label:"Extension",key:"f.ext",buckets:this.facets?.ext??[]},{label:"Repository",key:"f.repo",buckets:this.facets?.repo??[]},{label:"Path",key:"f.path",buckets:this.facets?.path??[]}].filter(n=>n.buckets.length>0||(this.selected[n.key]?.size??0)>0);return o.length===0?E:p`
      <div class="panel">
        ${o.map(n=>this.renderSection(n.label,n.key,n.buckets))}
      </div>
    `}renderSection(e,i,s){let o=this.selected[i]??new Set,l=[...s].sort((u,h)=>h.c-u.c||u.v.localeCompare(h.v)).slice(0,10),a=new Set(l.map(u=>u.v)),c=[...o].filter(u=>!a.has(u));return p`
      <div class="section">
        <span class="section-label">${e}</span>
        ${c.map(u=>p`
          <button
            class="pill stale"
            @click=${()=>this.toggle(i,u)}
          >${u}</button>
        `)}
        ${l.map(u=>p`
          <button
            class=${o.has(u.v)?"pill active":"pill"}
            @click=${()=>this.toggle(i,u.v)}
          >${u.v} <span class="count">${u.c}</span></button>
        `)}
      </div>
    `}toggle(e,i){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:e,value:i},bubbles:!0,composed:!0}))}};ot.styles=g`
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
  `,d([m({type:Object})],ot.prototype,"facets",2),d([m({type:Object})],ot.prototype,"selected",2),ot=d([y("cs-facet-panel")],ot);var Dt=class extends _{render(){return p`
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
    `],Dt=d([y("cs-search-help")],Dt);function os(r){let t={};for(let e of["f.ext","f.repo","f.path"]){let i=r.getAll(e);i.length>0&&(t[e]=new Set(i))}return t}var Ut=class extends Et(_){constructor(){super(...arguments);this.currentOptions={}}get activeFacets(){return os(M.get().params)}render(){let e=Mt.get(),i=Rt.get(),s=Tt.get(),o=Lt.get(),n=Ot.get(),l=Nt.get(),a=It.get(),c=Gr.get(),u=o||n;return p`
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
        ${u?p`
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
                ${s.map(h=>{let{repo:x,version:f,filePath:v}=ut(h.path);return p`
                    <filename-match
                      text=${v}
                      start=${h.match[0]}
                      end=${h.match[1]}
                      repo=${x}
                      version=${f.slice(0,6)}
                      href="/view/${h.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${Br({items:i,renderItem:h=>p`
                    <cs-result-group .result=${h} ?no-context=${c<=0}></cs-result-group>
                  `})}
              </div>
            </div>
          </div>
        `:p`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(e){let{key:i,value:s}=e.detail,o=this.activeFacets,n=o[i]??new Set,l;i==="f.path"?n.has(s)?l=new Set:l=new Set([s]):(l=new Set(n),l.has(s)?l.delete(s):l.add(s));let a={...o,[i]:l},c=Mt.get();c&&be(c,this.currentOptions,this.facetParamsFrom(a))}onSearchInput(e){Jr(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onSearchSubmit(e){be(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onOptionsChange(e){this.currentOptions=e.detail,this.reSearch()}reSearch(){let e=Mt.get();e&&be(e,this.currentOptions,this.facetParamsFrom(this.activeFacets))}getRepos(){return window.__CS_INIT?.repos??[]}facetParamsFrom(e){let i={};for(let[s,o]of Object.entries(e))o.size>0&&(i[s]=[...o]);return i}};Ut.styles=[N,pt,g`
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

    `],Ut=d([y("cs-search-view")],Ut);var mt=class extends _{constructor(){super(...arguments);this.path=""}render(){let e=this.path.indexOf("/+/");if(e===-1)return p`<span>${this.path}</span>`;let i=this.path.slice(0,e),o=this.path.slice(e+3).split("/").filter(n=>n.length>0);return p`
      <nav class="breadcrumbs">
        <a href="/view/${i}/+/">${i}</a>
        ${o.map((n,l)=>{let a=o.slice(0,l+1).join("/"),c=`/view/${i}/+/${a}${l<o.length-1?"/":""}`;return p`<span class="sep">/</span><a href=${c}>${n}</a>`})}
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
  `,d([m()],mt.prototype,"path",2),mt=d([y("cs-breadcrumbs")],mt);var nt=class extends _{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let e=[...this.entries].sort((i,s)=>{let o=i.endsWith("/"),n=s.endsWith("/");return o!==n?o?-1:1:i.localeCompare(s)});return p`
      <div class="listing">
        ${e.map(i=>{let s=i.endsWith("/"),o=this.basePath+i;return p`
            <a class=${s?"dir":"file"} href=${o}>${i}</a>
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
  `,d([m({type:Array})],nt.prototype,"entries",2),d([m()],nt.prototype,"basePath",2),nt=d([y("cs-dir-listing")],nt);function ns(r,t){return r<0?"1":r===t?String(r):`${r}-L${t}`}function as(r,t,e){return r?r.replace("{lno}",ns(t,e)):""}function ls(r){let t=r.match(/^#L(\d+)(?:-L?(\d+))?$/);if(!t)return[-1,-1];let e=parseInt(t[1],10),i=t[2]?parseInt(t[2],10):e;return[e,i]}var L=class extends _{constructor(){super(...arguments);this.content="";this.basePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.hasSelection=!1;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onSelectionChange=()=>{this.hasSelection=(window.getSelection()?.toString()||"").length>0};this.onKeyDown=e=>{e.target.matches("input,textarea")||e.altKey||e.ctrlKey||e.metaKey||this.processKey(e.key)&&e.preventDefault()}}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("selectionchange",this.onSelectionChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("selectionchange",this.onSelectionChange)}parseHash(){let[e,i]=ls(window.location.hash);this.selectedStart=e,this.selectedEnd=i}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!e)return;let i=window.innerHeight,s=Math.floor(i/3);if(this.selectedStart!==this.selectedEnd){let n=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(n){let l=e.getBoundingClientRect(),a=n.getBoundingClientRect(),c=a.top+a.height-l.top;c<=i?s=.5*(i-c):s=e.offsetHeight/2}}let o=e.getBoundingClientRect();window.scrollTo(0,o.top+window.scrollY-s)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){return as(this.externalUrl,this.selectedStart,this.selectedEnd)}getSelectedText(){return window.getSelection()?.toString()||""}processKey(e){switch(e){case"Enter":{let i=this.getSelectedText();return i&&window.open(`/search?q=${encodeURIComponent(i)}`),!0}case"/":{this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));let i=this.getSelectedText();return window.location.href=`/search${i?"?q="+encodeURIComponent(i):""}`,!0}case"?":return this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0})),!0;case"Escape":return this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0})),!0;case"v":{let i=this.resolvedExternalUrl();return i&&(window.location.href=i),!0}case"n":case"p":{let i=this.getSelectedText();return i&&window.find(i,!1,e==="p"),!0}}return!1}render(){let e=this.content.split(`
`);return e.length>0&&e[e.length-1]===""&&e.pop(),p`
      ${this.hasSelection?p`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      `:""}
      <div class="viewer">
        ${e.map((i,s)=>{let o=s+1,n=o>=this.selectedStart&&o<=this.selectedEnd;return p`
            <div class="line ${n?"selected":""}" id="L${o}">
              <a class="lno" href="#L${o}" @click=${l=>this.onLineClick(l,o)}>${o}</a>
              <span class="code">${i}</span>
            </div>
          `})}
      </div>
    `}onLineClick(e,i){if(e.shiftKey&&this.selectedStart>0){e.preventDefault();let s=Math.min(this.selectedStart,i),o=Math.max(this.selectedStart,i);this.selectedStart=s,this.selectedEnd=o,history.replaceState(null,"",`#L${s}-L${o}`)}else this.selectedStart=i,this.selectedEnd=i}};L.styles=g`
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
  `,d([m()],L.prototype,"content",2),d([m()],L.prototype,"basePath",2),d([m()],L.prototype,"repo",2),d([m()],L.prototype,"version",2),d([m()],L.prototype,"externalUrl",2),d([z()],L.prototype,"selectedStart",2),d([z()],L.prototype,"selectedEnd",2),d([z()],L.prototype,"hasSelection",2),L=d([y("cs-code-viewer")],L);var gt=class extends _{constructor(){super(...arguments);this.open=!1}render(){return this.open?p`
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
    `:p``}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}))}};gt.styles=g`
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
  `,d([m({type:Boolean,reflect:!0})],gt.prototype,"open",2),gt=d([y("cs-help-modal")],gt);function cs(r){let t=r.indexOf("/+/");if(t>=0){let e=r.slice(0,t),i=r.slice(t+3),s=e.lastIndexOf("@");if(s>=0)return{repo:e.slice(0,s),version:e.slice(s+1),filePath:i}}return ut(r)}function hs(r,t,e){let i="github.com/";return r.startsWith(i)?`https://github.com/${r.slice(i.length)}/blob/${t}/${e}#L{lno}`:""}var P=class extends _{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null;this.showHelp=!1}willUpdate(e){e.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let e=this.path.endsWith("/")||this.path.endsWith("/+/")||!this.path.includes("/+/"),i=`/raw/${this.path}${e&&!this.path.endsWith("/")?"/":""}`;try{let s=await fetch(i);if(!s.ok){this.error=`Not found (${s.status})`,this.loading=!1;return}(s.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await s.json(),this.fetchReadme(i)):this.content=await s.text()}catch(s){this.error=s instanceof Error?s.message:String(s)}this.loading=!1}async fetchReadme(e){if(!this.dirEntries)return;let i=this.dirEntries.find(s=>P.README_RE.test(s));if(i)try{let s=e.endsWith("/")?e:e+"/",o=await fetch(s+i);o.ok&&(this.readmeContent=await o.text())}catch{}}render(){let e=cs(this.path),i=e.repo,s=e.version,o=hs(e.repo,e.version,e.filePath);return p`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading?p`<div class="status">Loading...</div>`:""}
        ${this.error?p`<div class="status error">${this.error}</div>`:""}

        ${this.dirEntries?p`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith("/")?"":"/"}"
          ></cs-dir-listing>
          ${this.readmeContent?p`
            <div class="readme">
              <pre>${this.readmeContent}</pre>
            </div>
          `:""}
        `:""}

        ${this.content!==null?p`
          <cs-code-viewer
            .content=${this.content}
            .repo=${i}
            .version=${s}
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
  `,d([m()],P.prototype,"path",2),d([z()],P.prototype,"content",2),d([z()],P.prototype,"dirEntries",2),d([z()],P.prototype,"readmeContent",2),d([z()],P.prototype,"loading",2),d([z()],P.prototype,"error",2),d([z()],P.prototype,"showHelp",2),P=d([y("cs-file-view")],P);var Ht=class extends _{render(){return p`
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
    `}};Ht.styles=[N,g`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Ht=d([y("cs-about-view")],Ht);var Wt=class extends Et(_){render(){let t=M.get();return p`
      <main>${this.renderView(t)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(t){switch(t.name){case"search":return p`<cs-search-view></cs-search-view>`;case"view":return p`<cs-file-view .path=${t.path??""}></cs-file-view>`;case"about":return p`<cs-about-view></cs-about-view>`;default:return p`<div class="placeholder">Not found</div>`}}};Wt.styles=[N,g`
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
    `],Wt=d([y("cs-app")],Wt);export{Wt as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
