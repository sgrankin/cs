var pr=Object.defineProperty;var va=Object.getOwnPropertyDescriptor;var Pe=(r,t)=>()=>(r&&(t=r(r=0)),t);var ya=(r,t)=>{for(var e in t)pr(r,e,{get:t[e],enumerable:!0})};var d=(r,t,e,a)=>{for(var o=a>1?void 0:a?va(t,e):t,i=r.length-1,n;i>=0;i--)(n=r[i])&&(o=(a?n(t,e,o):n(o))||o);return a&&o&&pr(t,e,o),o};var zt,Yr=Pe(()=>{zt=class{constructor(t){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,t?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(t,e){let a=this._map.get(t)||0;this._map.set(t,e),this.totalSize+=e-a}get averageSize(){if(this._map.size>0){let t=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(t):t}return 0}getSize(t){return this._map.get(t)}clear(){this._map.clear(),this.totalSize=0}}});function tr(r){return r==="horizontal"?"width":"height"}var pe,Qr=Pe(()=>{pe=class{_getDefaultConfig(){return{direction:"vertical"}}constructor(t,e){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=t,Promise.resolve().then(()=>this.config=e||this._getDefaultConfig())}set config(t){Object.assign(this,Object.assign({},this._getDefaultConfig(),t))}get config(){return{direction:this.direction}}get items(){return this._items}set items(t){this._setItems(t)}_setItems(t){t!==this._items&&(this._items=t,this._scheduleReflow())}get direction(){return this._direction}set direction(t){t=t==="horizontal"?t:"vertical",t!==this._direction&&(this._direction=t,this._sizeDim=t==="horizontal"?"width":"height",this._secondarySizeDim=t==="horizontal"?"height":"width",this._positionDim=t==="horizontal"?"left":"top",this._secondaryPositionDim=t==="horizontal"?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(t){let{_viewDim1:e,_viewDim2:a}=this;Object.assign(this._viewportSize,t),a!==this._viewDim2?this._scheduleLayoutUpdate():e!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(t){Object.assign(this._latestCoords,t);let e=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(e-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(t=!1){(t||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(t){this._pin=t,this._triggerReflow()}get pin(){if(this._pin!==null){let{index:t,block:e}=this._pin;return{index:Math.max(0,Math.min(t,this.items.length-1)),block:e}}return null}_clampScrollPosition(t){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(t,this.totalScrollSize[tr(this.direction)]-this._viewDim1))}unpin(){this._pin!==null&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(this.pin!==null){let t=this._scrollPosition,{index:e,block:a}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:e,block:a||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=t-this._scrollPosition}}_calculateScrollIntoViewPosition(t){let{block:e}=t,a=Math.min(this.items.length,Math.max(0,t.index)),o=this._getItemPosition(a)[this._positionDim],i=o;if(e!=="start"){let n=this._getItemSize(a)[this._sizeDim];if(e==="center")i=o-.5*this._viewDim1+.5*n;else{let l=o-this._viewDim1+n;if(e==="end")i=l;else{let s=this._scrollPosition;i=Math.abs(s-o)<Math.abs(s-l)?o:l}}}return i+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(i)}getScrollIntoViewCoordinates(t){return{[this._positionDim]:this._calculateScrollIntoViewPosition(t)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let t=new Map;if(this._first!==-1&&this._last!==-1)for(let a=this._first;a<=this._last;a++)t.set(a,this._getItemPosition(a));let e={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:t};this._scrollError&&(e.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(e)}get _num(){return this._first===-1||this._last===-1?0:this._last-this._first+1}_checkThresholds(){if(this._viewDim1===0&&this._num>0||this._pin!==null)this._scheduleReflow();else{let t=Math.max(0,this._scrollPosition-this._overhang),e=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>t||this._physicalMax<e?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(t){if(this._first===-1||this._last===-1)return;let e=this._first;for(;e<this._last&&Math.round(this._getItemPosition(e)[this._positionDim]+this._getItemSize(e)[this._sizeDim])<=Math.round(this._scrollPosition);)e++;let a=this._last;for(;a>this._first&&Math.round(this._getItemPosition(a)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)a--;(e!==this._firstVisible||a!==this._lastVisible)&&(this._firstVisible=e,this._lastVisible=a,t&&t.emit&&this._sendVisibilityChangedMessage())}}});var Xr={};ya(Xr,{FlowLayout:()=>fe,flow:()=>ho});function Zr(r){return r==="horizontal"?"marginLeft":"marginTop"}function go(r){return r==="horizontal"?"marginRight":"marginBottom"}function po(r){return r==="horizontal"?"xOffset":"yOffset"}function fo(r,t){let e=[r,t].sort();return e[1]<=0?Math.min(...e):e[0]>=0?Math.max(...e):e[0]+e[1]}var ho,er,fe,ta=Pe(()=>{Yr();Qr();ho=r=>Object.assign({type:fe},r);er=class{constructor(){this._childSizeCache=new zt,this._marginSizeCache=new zt,this._metricsCache=new Map}update(t,e){let a=new Set;Object.keys(t).forEach(o=>{let i=Number(o);this._metricsCache.set(i,t[i]),this._childSizeCache.set(i,t[i][tr(e)]),a.add(i),a.add(i+1)});for(let o of a){let i=this._metricsCache.get(o)?.[Zr(e)]||0,n=this._metricsCache.get(o-1)?.[go(e)]||0;this._marginSizeCache.set(o,fo(i,n))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(t,e){return this._metricsCache.get(t)?.[Zr(e)]||0}getChildSize(t){return this._childSizeCache.getSize(t)}getMarginSize(t){return this._marginSizeCache.getSize(t)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}},fe=class extends pe{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new er,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(t){this._metricsCache.update(t,this.direction),this._scheduleReflow()}_getPhysicalItem(t){return this._newPhysicalItems.get(t)??this._physicalItems.get(t)}_getSize(t){return this._getPhysicalItem(t)&&this._metricsCache.getChildSize(t)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(t){let e=this._metricsCache;if(this._first===-1||this._last===-1)return e.averageMarginSize+t*(e.averageMarginSize+this._getAverageSize());if(t<this._first){let a=this._first-t;return this._getPhysicalItem(this._first).pos-(e.getMarginSize(this._first-1)||e.averageMarginSize)-(a*e.averageChildSize+(a-1)*e.averageMarginSize)}else{let a=t-this._last;return this._getPhysicalItem(this._last).pos+(e.getChildSize(this._last)||e.averageChildSize)+(e.getMarginSize(this._last)||e.averageMarginSize)+a*(e.averageChildSize+e.averageMarginSize)}}_getPosition(t){let e=this._getPhysicalItem(t),{averageMarginSize:a}=this._metricsCache;return t===0?this._metricsCache.getMarginSize(0)??a:e?e.pos:this._estimatePosition(t)}_calculateAnchor(t,e){return t<=0?0:e>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((t+e)/2/this._delta)))}_getAnchor(t,e){if(this._physicalItems.size===0)return this._calculateAnchor(t,e);if(this._first<0)return this._calculateAnchor(t,e);if(this._last<0)return this._calculateAnchor(t,e);let a=this._getPhysicalItem(this._first),o=this._getPhysicalItem(this._last),i=a.pos;if(o.pos+this._metricsCache.getChildSize(this._last)<t)return this._calculateAnchor(t,e);if(i>e)return this._calculateAnchor(t,e);let s=this._firstVisible-1,h=-1/0;for(;h<t;)h=this._getPhysicalItem(++s).pos+this._metricsCache.getChildSize(s);return s}_getActiveItems(){this._viewDim1===0||this.items.length===0?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let t=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=t,this._stable=!0}_getItems(){let t=this._newPhysicalItems;this._stable=!0;let e,a;if(this.pin!==null){let{index:h}=this.pin;this._anchorIdx=h,this._anchorPos=this._getPosition(h)}if(e=this._scrollPosition-this._overhang,a=this._scrollPosition+this._viewDim1+this._overhang,a<0||e>this._scrollSize){this._clearItems();return}(this._anchorIdx===null||this._anchorPos===null)&&(this._anchorIdx=this._getAnchor(e,a),this._anchorPos=this._getPosition(this._anchorIdx));let o=this._getSize(this._anchorIdx);o===void 0&&(this._stable=!1,o=this._getAverageSize());let i=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,n=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;this._anchorIdx===0&&(this._anchorPos=i),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-n-o);let l=0;for(this._anchorPos+o+n<e&&(l=e-(this._anchorPos+o+n)),this._anchorPos-i>a&&(l=a-(this._anchorPos-i)),l&&(this._scrollPosition-=l,e-=l,a-=l,this._scrollError+=l),t.set(this._anchorIdx,{pos:this._anchorPos,size:o}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-i,this._physicalMax=this._anchorPos+o+n;this._physicalMin>e&&this._first>0;){let h=this._getSize(--this._first);h===void 0&&(this._stable=!1,h=this._getAverageSize());let p=this._metricsCache.getMarginSize(this._first);p===void 0&&(this._stable=!1,p=this._metricsCache.averageMarginSize),this._physicalMin-=h;let c=this._physicalMin;if(t.set(this._first,{pos:c,size:h}),this._physicalMin-=p,this._stable===!1&&this._estimate===!1)break}for(;this._physicalMax<a&&this._last<this.items.length-1;){let h=this._getSize(++this._last);h===void 0&&(this._stable=!1,h=this._getAverageSize());let p=this._metricsCache.getMarginSize(this._last);p===void 0&&(this._stable=!1,p=this._metricsCache.averageMarginSize);let c=this._physicalMax;if(t.set(this._last,{pos:c,size:h}),this._physicalMax+=h+p,!this._stable&&!this._estimate)break}let s=this._calculateError();s&&(this._physicalMin-=s,this._physicalMax-=s,this._anchorPos-=s,this._scrollPosition-=s,t.forEach(h=>h.pos-=s),this._scrollError+=s),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=t)}_calculateError(){return this._first===0?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:t,_last:e}=this;super._reflow(),(this._first===-1&&this._last==-1||this._first===t&&this._last===e)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:t}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(t+this._getAverageSize())+t)}get _delta(){let{averageMarginSize:t}=this._metricsCache;return this._getAverageSize()+t}_getItemPosition(t){return{[this._positionDim]:this._getPosition(t),[this._secondaryPositionDim]:0,[po(this.direction)]:-(this._metricsCache.getLeadingMarginValue(t,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(t){return{[this._sizeDim]:this._getSize(t)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}});var Ft=globalThis,Gt=Ft.ShadowRoot&&(Ft.ShadyCSS===void 0||Ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ze=Symbol(),fr=new WeakMap,vt=class{constructor(t,e,a){if(this._$cssResult$=!0,a!==ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Gt&&t===void 0){let a=e!==void 0&&e.length===1;a&&(t=fr.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&fr.set(e,t))}return t}toString(){return this.cssText}},lt=r=>new vt(typeof r=="string"?r:r+"",void 0,ze),m=(r,...t)=>{let e=r.length===1?r[0]:t.reduce(((a,o,i)=>a+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[i+1]),r[0]);return new vt(e,r,ze)},ur=(r,t)=>{if(Gt)r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let a=document.createElement("style"),o=Ft.litNonce;o!==void 0&&a.setAttribute("nonce",o),a.textContent=e.cssText,r.appendChild(a)}},Me=Gt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let a of t.cssRules)e+=a.cssText;return lt(e)})(r):r;var{is:ka,defineProperty:_a,getOwnPropertyDescriptor:wa,getOwnPropertyNames:xa,getOwnPropertySymbols:Sa,getPrototypeOf:$a}=Object,Kt=globalThis,mr=Kt.trustedTypes,Ea=mr?mr.emptyScript:"",Ca=Kt.reactiveElementPolyfillSupport,yt=(r,t)=>r,kt={toAttribute(r,t){switch(t){case Boolean:r=r?Ea:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Jt=(r,t)=>!ka(r,t),br={attribute:!0,type:String,converter:kt,reflect:!1,useDefault:!1,hasChanged:Jt};Symbol.metadata??=Symbol("metadata"),Kt.litPropertyMetadata??=new WeakMap;var V=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=br){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let a=Symbol(),o=this.getPropertyDescriptor(t,a,e);o!==void 0&&_a(this.prototype,t,o)}}static getPropertyDescriptor(t,e,a){let{get:o,set:i}=wa(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){let l=o?.call(this);i?.call(this,n),this.requestUpdate(t,l,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??br}static _$Ei(){if(this.hasOwnProperty(yt("elementProperties")))return;let t=$a(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(yt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(yt("properties"))){let e=this.properties,a=[...xa(e),...Sa(e)];for(let o of a)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[a,o]of e)this.elementProperties.set(a,o)}this._$Eh=new Map;for(let[e,a]of this.elementProperties){let o=this._$Eu(e,a);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let a=new Set(t.flat(1/0).reverse());for(let o of a)e.unshift(Me(o))}else t!==void 0&&e.push(Me(t));return e}static _$Eu(t,e){let a=e.attribute;return a===!1?void 0:typeof a=="string"?a:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let a of e.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ur(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,a){this._$AK(t,a)}_$ET(t,e){let a=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,a);if(o!==void 0&&a.reflect===!0){let i=(a.converter?.toAttribute!==void 0?a.converter:kt).toAttribute(e,a.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){let a=this.constructor,o=a._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let i=a.getPropertyOptions(o),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:kt;this._$Em=o;let l=n.fromAttribute(e,i.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(t,e,a){if(t!==void 0){let o=this.constructor,i=this[t];if(a??=o.getPropertyOptions(t),!((a.hasChanged??Jt)(i,e)||a.useDefault&&a.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,a))))return;this.C(t,e,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:a,reflect:o,wrapped:i},n){a&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||a||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[o,i]of a){let{wrapped:n}=i,l=this[o];n!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,i,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((a=>a.hostUpdate?.())),this.update(e)):this._$EM()}catch(a){throw t=!1,this._$EM(),a}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[yt("elementProperties")]=new Map,V[yt("finalized")]=new Map,Ca?.({ReactiveElement:V}),(Kt.reactiveElementVersions??=[]).push("2.1.1");var Re=globalThis,Yt=Re.trustedTypes,vr=Yt?Yt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ie="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,Oe="?"+B,Aa=`<${Oe}>`,X=document,wt=()=>X.createComment(""),xt=r=>r===null||typeof r!="object"&&typeof r!="function",Ne=Array.isArray,Sr=r=>Ne(r)||typeof r?.[Symbol.iterator]=="function",Le=`[ 	
\f\r]`,_t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yr=/-->/g,kr=/>/g,Q=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_r=/'/g,wr=/"/g,$r=/^(?:script|style|textarea|title)$/i,Ue=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),g=Ue(1),Er=Ue(2),ai=Ue(3),P=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),xr=new WeakMap,Z=X.createTreeWalker(X,129);function Cr(r,t){if(!Ne(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return vr!==void 0?vr.createHTML(t):t}var Ar=(r,t)=>{let e=r.length-1,a=[],o,i=t===2?"<svg>":t===3?"<math>":"",n=_t;for(let l=0;l<e;l++){let s=r[l],h,p,c=-1,y=0;for(;y<s.length&&(n.lastIndex=y,p=n.exec(s),p!==null);)y=n.lastIndex,n===_t?p[1]==="!--"?n=yr:p[1]!==void 0?n=kr:p[2]!==void 0?($r.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=Q):p[3]!==void 0&&(n=Q):n===Q?p[0]===">"?(n=o??_t,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?Q:p[3]==='"'?wr:_r):n===wr||n===_r?n=Q:n===yr||n===kr?n=_t:(n=Q,o=void 0);let f=n===Q&&r[l+1].startsWith("/>")?" ":"";i+=n===_t?s+Aa:c>=0?(a.push(h),s.slice(0,c)+Ie+s.slice(c)+B+f):s+B+(c===-2?l:f)}return[Cr(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),a]},St=class r{constructor({strings:t,_$litType$:e},a){let o;this.parts=[];let i=0,n=0,l=t.length-1,s=this.parts,[h,p]=Ar(t,e);if(this.el=r.createElement(h,a),Z.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=Z.nextNode())!==null&&s.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let c of o.getAttributeNames())if(c.endsWith(Ie)){let y=p[n++],f=o.getAttribute(c).split(B),v=/([.?@])?(.*)/.exec(y);s.push({type:1,index:i,name:v[2],strings:f,ctor:v[1]==="."?Zt:v[1]==="?"?Xt:v[1]==="@"?te:et}),o.removeAttribute(c)}else c.startsWith(B)&&(s.push({type:6,index:i}),o.removeAttribute(c));if($r.test(o.tagName)){let c=o.textContent.split(B),y=c.length-1;if(y>0){o.textContent=Yt?Yt.emptyScript:"";for(let f=0;f<y;f++)o.append(c[f],wt()),Z.nextNode(),s.push({type:2,index:++i});o.append(c[y],wt())}}}else if(o.nodeType===8)if(o.data===Oe)s.push({type:2,index:i});else{let c=-1;for(;(c=o.data.indexOf(B,c+1))!==-1;)s.push({type:7,index:i}),c+=B.length-1}i++}}static createElement(t,e){let a=X.createElement("template");return a.innerHTML=t,a}};function tt(r,t,e=r,a){if(t===P)return t;let o=a!==void 0?e._$Co?.[a]:e._$Cl,i=xt(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(r),o._$AT(r,e,a)),a!==void 0?(e._$Co??=[])[a]=o:e._$Cl=o),o!==void 0&&(t=tt(r,o._$AS(r,t.values),o,a)),t}var Qt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:a}=this._$AD,o=(t?.creationScope??X).importNode(e,!0);Z.currentNode=o;let i=Z.nextNode(),n=0,l=0,s=a[0];for(;s!==void 0;){if(n===s.index){let h;s.type===2?h=new ct(i,i.nextSibling,this,t):s.type===1?h=new s.ctor(i,s.name,s.strings,this,t):s.type===6&&(h=new ee(i,this,t)),this._$AV.push(h),s=a[++l]}n!==s?.index&&(i=Z.nextNode(),n++)}return Z.currentNode=X,o}p(t){let e=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(t,a,e),e+=a.strings.length-2):a._$AI(t[e])),e++}},ct=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,a,o){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),xt(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==P&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Sr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==w&&xt(this._$AH)?this._$AA.nextSibling.data=t:this.T(X.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:a}=t,o=typeof a=="number"?this._$AC(t):(a.el===void 0&&(a.el=St.createElement(Cr(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(e);else{let i=new Qt(o,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=xr.get(t.strings);return e===void 0&&xr.set(t.strings,e=new St(t)),e}k(t){Ne(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,a,o=0;for(let i of t)o===e.length?e.push(a=new r(this.O(wt()),this.O(wt()),this,this.options)):a=e[o],a._$AI(i),o++;o<e.length&&(this._$AR(a&&a._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let a=t.nextSibling;t.remove(),t=a}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,a,o,i){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=w}_$AI(t,e=this,a,o){let i=this.strings,n=!1;if(i===void 0)t=tt(this,t,e,0),n=!xt(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{let l=t,s,h;for(t=i[0],s=0;s<i.length-1;s++)h=tt(this,l[a+s],e,s),h===P&&(h=this._$AH[s]),n||=!xt(h)||h!==this._$AH[s],h===w?t=w:t!==w&&(t+=(h??"")+i[s+1]),this._$AH[s]=h}n&&!o&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Zt=class extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}},Xt=class extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}},te=class extends et{constructor(t,e,a,o,i){super(t,e,a,o,i),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??w)===P)return;let a=this._$AH,o=t===w&&a!==w||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,i=t!==w&&(a===w||o);o&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ee=class{constructor(t,e,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}},Tr={M:Ie,P:B,A:Oe,C:1,L:Ar,R:Qt,D:Sr,V:tt,I:ct,H:et,N:Xt,U:te,B:Zt,F:ee},Ta=Re.litHtmlPolyfillSupport;Ta?.(St,ct),(Re.litHtmlVersions??=[]).push("3.3.1");var Pr=(r,t,e)=>{let a=e?.renderBefore??t,o=a._$litPart$;if(o===void 0){let i=e?.renderBefore??null;a._$litPart$=o=new ct(t.insertBefore(wt(),i),i,void 0,e??{})}return o._$AI(r),o};var De=globalThis,b=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};b._$litElement$=!0,b.finalized=!0,De.litElementHydrateSupport?.({LitElement:b});var Pa=De.litElementPolyfillSupport;Pa?.({LitElement:b});(De.litElementVersions??=[]).push("4.2.1");var _=r=>(t,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(r,t)})):customElements.define(r,t)};var za={attribute:!0,type:String,converter:kt,reflect:!1,hasChanged:Jt},Ma=(r=za,t,e)=>{let{kind:a,metadata:o}=e,i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),a==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(e.name,r),a==="accessor"){let{name:n}=e;return{set(l){let s=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,s,r)},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(a==="setter"){let{name:n}=e;return function(l){let s=this[n];t.call(this,l),this.requestUpdate(n,s,r)}}throw Error("Unsupported decorator location: "+a)};function u(r){return(t,e)=>typeof e=="object"?Ma(r,t,e):((a,o,i)=>{let n=o.hasOwnProperty(i);return o.constructor.createProperty(i,a),n?Object.getOwnPropertyDescriptor(o,i):void 0})(r,t,e)}function A(r){return u({...r,state:!0,attribute:!1})}var La=Object.defineProperty,Ra=(r,t,e)=>t in r?La(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,je=(r,t,e)=>(Ra(r,typeof t!="symbol"?t+"":t,e),e),Ia=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)},qe=(r,t)=>{if(Object(t)!==t)throw TypeError('Cannot use the "in" operator on this value');return r.has(t)},ae=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},zr=(r,t,e)=>(Ia(r,t,"access private method"),e);function Mr(r,t){return Object.is(r,t)}var E=null,$t=!1,oe=1,ie=Symbol("SIGNAL");function ht(r){let t=E;return E=r,t}function Oa(){return E}function Na(){return $t}var Fe={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function ne(r){if($t)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(E===null)return;E.consumerOnSignalRead(r);let t=E.nextProducerIndex++;if(dt(E),t<E.producerNode.length&&E.producerNode[t]!==r&&Ve(E)){let e=E.producerNode[t];se(e,E.producerIndexOfThis[t])}E.producerNode[t]!==r&&(E.producerNode[t]=r,E.producerIndexOfThis[t]=Ve(E)?Ir(r,E,t):0),E.producerLastReadVersion[t]=r.version}function Ua(){oe++}function Lr(r){if(!(!r.dirty&&r.lastCleanEpoch===oe)){if(!r.producerMustRecompute(r)&&!Wa(r)){r.dirty=!1,r.lastCleanEpoch=oe;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=oe}}function Rr(r){if(r.liveConsumerNode===void 0)return;let t=$t;$t=!0;try{for(let e of r.liveConsumerNode)e.dirty||ja(e)}finally{$t=t}}function Da(){return E?.consumerAllowSignalWrites!==!1}function ja(r){var t;r.dirty=!0,Rr(r),(t=r.consumerMarkedDirty)==null||t.call(r.wrapper??r)}function qa(r){return r&&(r.nextProducerIndex=0),ht(r)}function Ha(r,t){if(ht(t),!(!r||r.producerNode===void 0||r.producerIndexOfThis===void 0||r.producerLastReadVersion===void 0)){if(Ve(r))for(let e=r.nextProducerIndex;e<r.producerNode.length;e++)se(r.producerNode[e],r.producerIndexOfThis[e]);for(;r.producerNode.length>r.nextProducerIndex;)r.producerNode.pop(),r.producerLastReadVersion.pop(),r.producerIndexOfThis.pop()}}function Wa(r){dt(r);for(let t=0;t<r.producerNode.length;t++){let e=r.producerNode[t],a=r.producerLastReadVersion[t];if(a!==e.version||(Lr(e),a!==e.version))return!0}return!1}function Ir(r,t,e){var a;if(Ge(r),dt(r),r.liveConsumerNode.length===0){(a=r.watched)==null||a.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)r.producerIndexOfThis[o]=Ir(r.producerNode[o],r,o)}return r.liveConsumerIndexOfThis.push(e),r.liveConsumerNode.push(t)-1}function se(r,t){var e;if(Ge(r),dt(r),typeof ngDevMode<"u"&&ngDevMode&&t>=r.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${r.liveConsumerNode.length} consumers)`);if(r.liveConsumerNode.length===1){(e=r.unwatched)==null||e.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)se(r.producerNode[o],r.producerIndexOfThis[o])}let a=r.liveConsumerNode.length-1;if(r.liveConsumerNode[t]=r.liveConsumerNode[a],r.liveConsumerIndexOfThis[t]=r.liveConsumerIndexOfThis[a],r.liveConsumerNode.length--,r.liveConsumerIndexOfThis.length--,t<r.liveConsumerNode.length){let o=r.liveConsumerIndexOfThis[t],i=r.liveConsumerNode[t];dt(i),i.producerIndexOfThis[o]=t}}function Ve(r){var t;return r.consumerIsAlwaysLive||(((t=r?.liveConsumerNode)==null?void 0:t.length)??0)>0}function dt(r){r.producerNode??(r.producerNode=[]),r.producerIndexOfThis??(r.producerIndexOfThis=[]),r.producerLastReadVersion??(r.producerLastReadVersion=[])}function Ge(r){r.liveConsumerNode??(r.liveConsumerNode=[]),r.liveConsumerIndexOfThis??(r.liveConsumerIndexOfThis=[])}function Or(r){if(Lr(r),ne(r),r.value===Be)throw r.error;return r.value}function Va(r){let t=Object.create(Ba);t.computation=r;let e=()=>Or(t);return e[ie]=t,e}var He=Symbol("UNSET"),We=Symbol("COMPUTING"),Be=Symbol("ERRORED"),Ba={...Fe,value:He,dirty:!0,error:null,equal:Mr,producerMustRecompute(r){return r.value===He||r.value===We},producerRecomputeValue(r){if(r.value===We)throw new Error("Detected cycle in computations.");let t=r.value;r.value=We;let e=qa(r),a,o=!1;try{a=r.computation.call(r.wrapper),o=t!==He&&t!==Be&&r.equal.call(r.wrapper,t,a)}catch(i){a=Be,r.error=i}finally{Ha(r,e)}if(o){r.value=t;return}r.value=a,r.version++}};function Fa(){throw new Error}var Ga=Fa;function Ka(){Ga()}function Ja(r){let t=Object.create(Za);t.value=r;let e=()=>(ne(t),t.value);return e[ie]=t,e}function Ya(){return ne(this),this.value}function Qa(r,t){Da()||Ka(),r.equal.call(r.wrapper,r.value,t)||(r.value=t,Xa(r))}var Za={...Fe,equal:Mr,value:void 0};function Xa(r){r.version++,Ua(),Rr(r)}var T=Symbol("node"),S;(r=>{var t,e,a,o,i,n;class l{constructor(p,c={}){ae(this,e),je(this,t);let f=Ja(p)[ie];if(this[T]=f,f.wrapper=this,c){let v=c.equals;v&&(f.equal=v),f.watched=c[r.subtle.watched],f.unwatched=c[r.subtle.unwatched]}}get(){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Ya.call(this[T])}set(p){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Na())throw new Error("Writes to signals not permitted during Watcher callback");let c=this[T];Qa(c,p)}}t=T,e=new WeakSet,a=function(){},r.isState=h=>typeof h=="object"&&qe(e,h),r.State=l;class s{constructor(p,c){ae(this,i),je(this,o);let f=Va(p)[ie];if(f.consumerAllowSignalWrites=!0,this[T]=f,f.wrapper=this,c){let v=c.equals;v&&(f.equal=v),f.watched=c[r.subtle.watched],f.unwatched=c[r.subtle.unwatched]}}get(){if(!(0,r.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Or(this[T])}}o=T,i=new WeakSet,n=function(){},r.isComputed=h=>typeof h=="object"&&qe(i,h),r.Computed=s,(h=>{var p,c,y,f,v;function C($){let x,k=null;try{k=ht(null),x=$()}finally{ht(k)}return x}h.untrack=C;function D($){var x;if(!(0,r.isComputed)($)&&!(0,r.isWatcher)($))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((x=$[T].producerNode)==null?void 0:x.map(k=>k.wrapper))??[]}h.introspectSources=D;function L($){var x;if(!(0,r.isComputed)($)&&!(0,r.isState)($))throw new TypeError("Called introspectSinks without a Signal argument");return((x=$[T].liveConsumerNode)==null?void 0:x.map(k=>k.wrapper))??[]}h.introspectSinks=L;function Ae($){if(!(0,r.isComputed)($)&&!(0,r.isState)($))throw new TypeError("Called hasSinks without a Signal argument");let x=$[T].liveConsumerNode;return x?x.length>0:!1}h.hasSinks=Ae;function Te($){if(!(0,r.isComputed)($)&&!(0,r.isWatcher)($))throw new TypeError("Called hasSources without a Computed or Watcher argument");let x=$[T].producerNode;return x?x.length>0:!1}h.hasSources=Te;class ua{constructor(x){ae(this,c),ae(this,f),je(this,p);let k=Object.create(Fe);k.wrapper=this,k.consumerMarkedDirty=x,k.consumerIsAlwaysLive=!0,k.consumerAllowSignalWrites=!1,k.producerNode=[],this[T]=k}watch(...x){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");zr(this,f,v).call(this,x);let k=this[T];k.dirty=!1;let R=ht(k);for(let Bt of x)ne(Bt[T]);ht(R)}unwatch(...x){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");zr(this,f,v).call(this,x);let k=this[T];dt(k);for(let R=k.producerNode.length-1;R>=0;R--)if(x.includes(k.producerNode[R].wrapper)){se(k.producerNode[R],k.producerIndexOfThis[R]);let Bt=k.producerNode.length-1;if(k.producerNode[R]=k.producerNode[Bt],k.producerIndexOfThis[R]=k.producerIndexOfThis[Bt],k.producerNode.length--,k.producerIndexOfThis.length--,k.nextProducerIndex--,R<k.producerNode.length){let ba=k.producerIndexOfThis[R],gr=k.producerNode[R];Ge(gr),gr.liveConsumerIndexOfThis[ba]=R}}}getPending(){if(!(0,r.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[T].producerNode.filter(k=>k.dirty).map(k=>k.wrapper)}}p=T,c=new WeakSet,y=function(){},f=new WeakSet,v=function($){for(let x of $)if(!(0,r.isComputed)(x)&&!(0,r.isState)(x))throw new TypeError("Called watch/unwatch without a Computed or State argument")},r.isWatcher=$=>qe(c,$),h.Watcher=ua;function ma(){var $;return($=Oa())==null?void 0:$.wrapper}h.currentComputed=ma,h.watched=Symbol("watched"),h.unwatched=Symbol("unwatched")})(r.subtle||(r.subtle={}))})(S||(S={}));var Ke=!1,Nr=new S.subtle.Watcher(()=>{Ke||(Ke=!0,queueMicrotask(()=>{Ke=!1;for(let r of Nr.getPending())r.get();Nr.watch()}))}),to=Symbol("SignalWatcherBrand"),eo=new FinalizationRegistry(r=>{r.unwatch(...S.subtle.introspectSources(r))}),Ur=new WeakMap;function Et(r){return r[to]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),r):class extends r{constructor(){super(...arguments),this._$St=new Map,this._$So=new S.State(0),this._$Si=!1}_$Sl(){var t,e;let a=[],o=[];this._$St.forEach((n,l)=>{(n?.beforeUpdate?a:o).push(l)});let i=(t=this.h)===null||t===void 0?void 0:t.getPending().filter(n=>n!==this._$Su&&!this._$St.has(n));a.forEach(n=>n.get()),(e=this._$Su)===null||e===void 0||e.get(),i.forEach(n=>n.get()),o.forEach(n=>n.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new S.Computed(()=>{this._$So.get(),super.performUpdate()});let t=this.h=new S.subtle.Watcher(function(){let e=Ur.get(this);e!==void 0&&(e._$Si===!1&&(new Set(this.getPending()).has(e._$Su)?e.requestUpdate():e._$Sv()),this.watch())});Ur.set(t,this),eo.register(this,t),t.watch(this._$Su),t.watch(...Array.from(this._$St).map(([e])=>e))}_$Sp(){if(this.h===void 0)return;let t=!1;this.h.unwatch(...S.subtle.introspectSources(this.h).filter(e=>{var a;let o=((a=this._$St.get(e))===null||a===void 0?void 0:a.manualDispose)!==!0;return o&&this._$St.delete(e),t||(t=!o),o})),t||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(t,e){var a;this._$S_();let o=new S.Computed(()=>{t()});return this.h.watch(o),this._$St.set(o,e),(a=e?.beforeUpdate)!==null&&a!==void 0&&a?S.subtle.untrack(()=>o.get()):this.updateComplete.then(()=>S.subtle.untrack(()=>o.get())),()=>{this._$St.delete(o),this.h.unwatch(o),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var q={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},O=r=>(...t)=>({_$litDirective$:r,values:t}),j=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,a){this._$Ct=t,this._$AM=e,this._$Ci=a}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:ro}=Tr;var jr=r=>r.strings===void 0,Dr=()=>document.createComment(""),gt=(r,t,e)=>{let a=r._$AA.parentNode,o=t===void 0?r._$AB:t._$AA;if(e===void 0){let i=a.insertBefore(Dr(),o),n=a.insertBefore(Dr(),o);e=new ro(i,n,r,r.options)}else{let i=e._$AB.nextSibling,n=e._$AM,l=n!==r;if(l){let s;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(s=r._$AU)!==n._$AU&&e._$AP(s)}if(i!==o||l){let s=e._$AA;for(;s!==i;){let h=s.nextSibling;a.insertBefore(s,o),s=h}}}return e},K=(r,t,e=r)=>(r._$AI(t,e),r),ao={},qr=(r,t=ao)=>r._$AH=t,Hr=r=>r._$AH,le=r=>{r._$AR(),r._$AA.remove()};var Ct=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let a of e)a._$AO?.(t,!1),Ct(a,t);return!0},ce=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},Wr=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),no(t)}};function oo(r){this._$AN!==void 0?(ce(this),this._$AM=r,Wr(this)):this._$AM=r}function io(r,t=!1,e=0){let a=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(a))for(let i=e;i<a.length;i++)Ct(a[i],!1),ce(a[i]);else a!=null&&(Ct(a,!1),ce(a));else Ct(this,r)}var no=r=>{r.type==q.CHILD&&(r._$AP??=io,r._$AQ??=oo)},pt=class extends j{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,a){super._$AT(t,e,a),Wr(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Ct(this,t),ce(this))}setValue(t){if(jr(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var Je=!1,Ye=new S.subtle.Watcher(async()=>{Je||(Je=!0,queueMicrotask(()=>{Je=!1;for(let r of Ye.getPending())r.get();Ye.watch()}))}),he=class extends pt{_$S_(){var t,e;this._$Sm===void 0&&(this._$Sj=new S.Computed(()=>{var a;let o=(a=this._$SW)===null||a===void 0?void 0:a.get();return this.setValue(o),o}),this._$Sm=(e=(t=this._$Sk)===null||t===void 0?void 0:t.h)!==null&&e!==void 0?e:Ye,this._$Sm.watch(this._$Sj),S.subtle.untrack(()=>{var a;return(a=this._$Sj)===null||a===void 0?void 0:a.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(t){return S.subtle.untrack(()=>t.get())}update(t,[e]){var a,o;return(a=this._$Sk)!==null&&a!==void 0||(this._$Sk=(o=t.options)===null||o===void 0?void 0:o.host),e!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=e,this._$S_(),S.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},Qe=O(he);var Ze=r=>(t,...e)=>r(t,...e.map(a=>a instanceof S.State||a instanceof S.Computed?Qe(a):a)),so=Ze(g),lo=Ze(Er);var mn=S.State,bn=S.Computed,F=(r,t)=>new S.State(r,t),de=(r,t)=>new S.Computed(r,t);var co=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function Vr(r,t=""){for(let{pattern:e,name:a}of co){let o=e.exec(r);if(o)return{name:a,path:o[1],params:new URLSearchParams(t)}}return{name:"not-found",params:new URLSearchParams(t)}}var I=F(Vr(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{I.set(Vr(window.location.pathname,window.location.search))});var En=m`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,H=m`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Cn=m`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,Br=m`
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
`,ft=m`
  .label {
    font-weight: bold;
  }
`,Fr=m`
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
`,Gr=m`
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
`,An=m`
  .hidden {
    display: none !important;
  }
`;var Kr=(r,t,e)=>{let a=new Map;for(let o=t;o<=e;o++)a.set(r[o],o);return a},Jr=O(class extends j{constructor(r){if(super(r),r.type!==q.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,t,e){let a;e===void 0?e=t:t!==void 0&&(a=t);let o=[],i=[],n=0;for(let l of r)o[n]=a?a(l,n):n,i[n]=e(l,n),n++;return{values:i,keys:o}}render(r,t,e){return this.dt(r,t,e).values}update(r,[t,e,a]){let o=Hr(r),{values:i,keys:n}=this.dt(t,e,a);if(!Array.isArray(o))return this.ut=n,i;let l=this.ut??=[],s=[],h,p,c=0,y=o.length-1,f=0,v=i.length-1;for(;c<=y&&f<=v;)if(o[c]===null)c++;else if(o[y]===null)y--;else if(l[c]===n[f])s[f]=K(o[c],i[f]),c++,f++;else if(l[y]===n[v])s[v]=K(o[y],i[v]),y--,v--;else if(l[c]===n[v])s[v]=K(o[c],i[v]),gt(r,s[v+1],o[c]),c++,v--;else if(l[y]===n[f])s[f]=K(o[y],i[f]),gt(r,o[c],o[y]),y--,f++;else if(h===void 0&&(h=Kr(n,f,v),p=Kr(l,c,y)),h.has(l[c]))if(h.has(l[y])){let C=p.get(n[f]),D=C!==void 0?o[C]:null;if(D===null){let L=gt(r,o[c]);K(L,i[f]),s[f]=L}else s[f]=K(D,i[f]),gt(r,o[c],D),o[C]=null;f++}else le(o[y]),y--;else le(o[c]),c++;for(;f<=v;){let C=gt(r,s[v+1]);K(C,i[f]),s[f++]=C}for(;c<=y;){let C=o[c++];C!==null&&le(C)}return this.ut=n,qr(r,s),P}});var At=class r extends Event{constructor(t){super(r.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};At.eventName="rangeChanged";var Tt=class r extends Event{constructor(t){super(r.eventName,{bubbles:!1}),this.first=t.first,this.last=t.last}};Tt.eventName="visibilityChanged";var Pt=class r extends Event{constructor(){super(r.eventName,{bubbles:!1})}};Pt.eventName="unpinned";var Xe=class{constructor(t){this._element=null;let e=t??window;this._node=e,t&&(this._element=t)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}},ge=class extends Xe{constructor(t,e){super(e),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let a=this._node;this._originalScrollTo=a.scrollTo,this._originalScrollBy=a.scrollBy,this._originalScroll=a.scroll,this._attach(t)}get _destination(){return this.__destination}get scrolling(){return this._destination!==null}scrollTo(t,e){let a=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;this._scrollTo(a)}scrollBy(t,e){let a=typeof t=="number"&&typeof e=="number"?{left:t,top:e}:t;a.top!==void 0&&(a.top+=this.scrollTop),a.left!==void 0&&(a.left+=this.scrollLeft),this._scrollTo(a)}_nativeScrollTo(t){this._originalScrollTo.bind(this._element||window)(t)}_scrollTo(t,e=null,a=null){this._end!==null&&this._end(),t.behavior==="smooth"?(this._setDestination(t),this._retarget=e,this._end=a):this._resetScrollState(),this._nativeScrollTo(t)}_setDestination(t){let{top:e,left:a}=t;return e=e===void 0?void 0:Math.max(0,Math.min(e,this.maxScrollTop)),a=a===void 0?void 0:Math.max(0,Math.min(a,this.maxScrollLeft)),this._destination!==null&&a===this._destination.left&&e===this._destination.top?!1:(this.__destination={top:e,left:a,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(t){this._destination&&this._setDestination(t)&&this._nativeScrollTo(this._destination)}managedScrollTo(t,e,a){return this._scrollTo(t,e,a),this._updateManagedScrollTo}correctScrollError(t){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(t),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(this._destination!==null){let{scrollTop:t,scrollLeft:e}=this,{top:a,left:o}=this._destination;a=Math.min(a||0,this.maxScrollTop),o=Math.min(o||0,this.maxScrollLeft);let i=Math.abs(a-t),n=Math.abs(o-e);i<1&&n<1&&(this._end&&this._end(),this._resetScrollState())}}detach(t){return this._clients.delete(t),this._clients.size===0&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(t){this._clients.add(t),this._clients.size===1&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};var ea=typeof window<"u"?window.ResizeObserver:void 0;var oa=Symbol("virtualizerRef"),ue="virtualizer-sizer",ra,be=class{constructor(t){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!t)throw new Error("Virtualizer constructor requires a configuration object");if(t.hostElement)this._init(t);else throw new Error('Virtualizer configuration requires the "hostElement" property')}set items(t){Array.isArray(t)&&t!==this._items&&(this._itemsChanged=!0,this._items=t,this._schedule(this._updateLayout))}_init(t){this._isScroller=!!t.scroller,this._initHostElement(t);let e=t.layout||{};this._layoutInitialized=this._initLayout(e)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new ea(()=>this._hostElementSizeChanged()),this._childrenRO=new ea(this._childrenSizeChanged.bind(this))}_initHostElement(t){let e=this._hostElement=t.hostElement;this._applyVirtualizerStyles(),e[oa]=this}connected(){this._initObservers();let t=this._isScroller;this._clippingAncestors=bo(this._hostElement,t),this._scrollerController=new ge(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(t=>{t.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(t),this._hostElementRO.observe(t)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(t=>this._childrenRO.observe(t)),this._scrollEventListeners.forEach(t=>t.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(t=>t.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){let t=this._hostElement;if(!this._sizer){let e=t.querySelector(`[${ue}]`);e||(e=document.createElement("div"),e.setAttribute(ue,""),t.appendChild(e)),Object.assign(e.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),e.textContent="&nbsp;",e.setAttribute(ue,""),this._sizer=e}return this._sizer}async updateLayoutConfig(t){await this._layoutInitialized;let e=t.type||ra;if(typeof e=="function"&&this._layout instanceof e){let a={...t};return delete a.type,this._layout.config=a,!0}return!1}async _initLayout(t){let e,a;if(typeof t.type=="function"){a=t.type;let o={...t};delete o.type,e=o}else e=t;a===void 0&&(ra=a=(await Promise.resolve().then(()=>(ta(),Xr))).FlowLayout),this._layout=new a(o=>this._handleLayoutMessage(o),e),this._layout.measureChildren&&typeof this._layout.updateItemSizes=="function"&&(typeof this._layout.measureChildren=="function"&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){this._benchmarkStart===null&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(this._benchmarkStart!==null){let t=window.performance.now(),e=t-this._benchmarkStart,o=performance.getEntriesByName("uv-virtualizing","measure").filter(i=>i.startTime>=this._benchmarkStart&&i.startTime<t).reduce((i,n)=>i+n.duration,0);return this._benchmarkStart=null,{timeElapsed:e,virtualizationTime:o}}return null}_measureChildren(){let t={},e=this._children,a=this._measureChildOverride||this._measureChild;for(let o=0;o<e.length;o++){let i=e[o],n=this._first+o;(this._itemsChanged||this._toBeMeasured.has(i))&&(t[n]=a.call(this,i,this._items[n]))}this._childMeasurements=t,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(t){let{width:e,height:a}=t.getBoundingClientRect();return Object.assign({width:e,height:a},uo(t))}async _schedule(t){this._scheduled.has(t)||(this._scheduled.add(t),await Promise.resolve(),this._scheduled.delete(t),t.call(this))}async _updateDOM(t){this._scrollSize=t.scrollSize,this._adjustRange(t.range),this._childrenPos=t.childPositions,this._scrollError=t.scrollError||null;let{_rangeChanged:e,_itemsChanged:a}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(e||a)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(t=>this._childrenRO.observe(t)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),this._childMeasurements!==null&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(t){console.warn("Error measuring performance data: ",t)}window.performance.mark("uv-start")}this._scrollerController.correctingScrollError===!1&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(t){t.type==="scroll"?(t.currentTarget===window||this._clippingAncestors.includes(t.currentTarget))&&this._handleScrollEvent():console.warn("event not handled",t)}_handleLayoutMessage(t){t.type==="stateChanged"?this._updateDOM(t):t.type==="visibilityChanged"?(this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._notifyVisibility()):t.type==="unpinned"&&this._hostElement.dispatchEvent(new Pt)}get _children(){let t=[],e=this._hostElement.firstElementChild;for(;e;)e.hasAttribute(ue)||t.push(e),e=e.nextElementSibling;return t}_updateView(){let t=this._hostElement,e=this._scrollerController?.element,a=this._layout;if(t&&e&&a){let o,i,n,l,s=t.getBoundingClientRect();o=0,i=0,n=window.innerHeight,l=window.innerWidth;let h=this._clippingAncestors.map(L=>L.getBoundingClientRect());h.unshift(s);for(let L of h)o=Math.max(o,L.top),i=Math.max(i,L.left),n=Math.min(n,L.bottom),l=Math.min(l,L.right);let p=e.getBoundingClientRect(),c={left:s.left-p.left,top:s.top-p.top},y={width:e.scrollWidth,height:e.scrollHeight},f=o-s.top+t.scrollTop,v=i-s.left+t.scrollLeft,C=Math.max(0,n-o),D=Math.max(0,l-i);a.viewportSize={width:D,height:C},a.viewportScroll={top:f,left:v},a.totalScrollSize=y,a.offsetWithinScroller=c}}_sizeHostElement(t){let a=t&&t.width!==null?Math.min(82e5,t.width):0,o=t&&t.height!==null?Math.min(82e5,t.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${a}px, ${o}px)`;else{let i=this._hostElement.style;i.minWidth=a?`${a}px`:"100%",i.minHeight=o?`${o}px`:"100%"}}_positionChildren(t){t&&t.forEach(({top:e,left:a,width:o,height:i,xOffset:n,yOffset:l},s)=>{let h=this._children[s-this._first];h&&(h.style.position="absolute",h.style.boxSizing="border-box",h.style.transform=`translate(${a}px, ${e}px)`,o!==void 0&&(h.style.width=o+"px"),i!==void 0&&(h.style.height=i+"px"),h.style.left=n===void 0?null:n+"px",h.style.top=l===void 0?null:l+"px")})}async _adjustRange(t){let{_first:e,_last:a,_firstVisible:o,_lastVisible:i}=this;this._first=t.first,this._last=t.last,this._firstVisible=t.firstVisible,this._lastVisible=t.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==e||this._last!==a,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==o||this._lastVisible!==i}_correctScrollError(){if(this._scrollError){let{scrollTop:t,scrollLeft:e}=this._scrollerController,{top:a,left:o}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:t-a,left:e-o})}}element(t){return t===1/0&&(t=this._items.length-1),this._items?.[t]===void 0?void 0:{scrollIntoView:(e={})=>this._scrollElementIntoView({...e,index:t})}}_scrollElementIntoView(t){if(t.index>=this._first&&t.index<=this._last)this._children[t.index-this._first].scrollIntoView(t);else if(t.index=Math.min(t.index,this._items.length-1),t.behavior==="smooth"){let e=this._layout.getScrollIntoViewCoordinates(t),{behavior:a}=t;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(e,{behavior:a}),()=>this._layout.getScrollIntoViewCoordinates(t),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=t}else this._layout.pin=t}_checkScrollIntoViewTarget(t){let{index:e}=this._scrollIntoViewTarget||{};e&&t?.has(e)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new At({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new Tt({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((t,e)=>{this._layoutCompleteResolver=t,this._layoutCompleteRejecter=e})),this._layoutCompletePromise}_rejectLayoutCompletePromise(t){this._layoutCompleteRejecter!==null&&this._layoutCompleteRejecter(t),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&this._pendingLayoutComplete===null&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){this._layoutCompleteResolver!==null&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(t){if(this._layout?.measureChildren){for(let e of t)this._toBeMeasured.set(e.target,e.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function uo(r){let t=window.getComputedStyle(r);return{marginTop:me(t.marginTop),marginRight:me(t.marginRight),marginBottom:me(t.marginBottom),marginLeft:me(t.marginLeft)}}function me(r){let t=r?parseFloat(r):NaN;return Number.isNaN(t)?0:t}function aa(r){if(r.assignedSlot!==null)return r.assignedSlot;if(r.parentElement!==null)return r.parentElement;let t=r.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}function mo(r,t=!1){let e=[],a=t?r:aa(r);for(;a!==null;)e.push(a),a=aa(a);return e}function bo(r,t=!1){let e=!1;return mo(r,t).filter(a=>{if(e)return!1;let o=getComputedStyle(a);return e=o.position==="fixed",o.overflow!=="visible"})}var vo=r=>r,yo=(r,t)=>g`${t}: ${JSON.stringify(r,null,2)}`,rr=class extends pt{constructor(t){if(super(t),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,a)=>yo(e,a+this._first),this._keyFunction=(e,a)=>vo(e,a+this._first),this._items=[],t.type!==q.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(t){t&&this._setFunctions(t);let e=[];if(this._first>=0&&this._last>=this._first)for(let a=this._first;a<=this._last;a++)e.push(this._items[a]);return Jr(e,this._keyFunction,this._renderItem)}update(t,[e]){this._setFunctions(e);let a=this._items!==e.items;return this._items=e.items||[],this._virtualizer?this._updateVirtualizerConfig(t,e):this._initialize(t,e),a?P:this.render()}async _updateVirtualizerConfig(t,e){if(!await this._virtualizer.updateLayoutConfig(e.layout||{})){let o=t.parentNode;this._makeVirtualizer(o,e)}this._virtualizer.items=this._items}_setFunctions(t){let{renderItem:e,keyFunction:a}=t;e&&(this._renderItem=(o,i)=>e(o,i+this._first)),a&&(this._keyFunction=(o,i)=>a(o,i+this._first))}_makeVirtualizer(t,e){this._virtualizer&&this._virtualizer.disconnected();let{layout:a,scroller:o,items:i}=e;this._virtualizer=new be({hostElement:t,layout:a,scroller:o}),this._virtualizer.items=i,this._virtualizer.connected()}_initialize(t,e){let a=t.parentNode;a&&a.nodeType===1&&(a.addEventListener("rangeChanged",o=>{this._first=o.first,this._last=o.last,this.setValue(this.render())}),this._makeVirtualizer(a,e))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}},ia=O(rr);async function na(r,t,e){let a="/api/search?"+r.toString(),o=await fetch(a,{signal:e});if(!o.ok){let i=await o.text();throw new Error(`search failed (${o.status}): ${i}`)}if(!o.body)throw new Error("response has no body");await ko(o.body,i=>{switch(i.type){case"result":t.onResult?.(i);break;case"file":t.onFile?.(i);break;case"facets":t.onFacets?.(i);break;case"done":t.onDone?.(i);break}})}async function ko(r,t){let e=r.getReader(),a=new TextDecoder,o="";try{for(;;){let{done:n,value:l}=await e.read();if(n)break;o+=a.decode(l,{stream:!0});let s;for(;(s=o.indexOf(`
`))!==-1;){let h=o.slice(0,s).trim();o=o.slice(s+1),h.length!==0&&t(JSON.parse(h))}}o+=a.decode();let i=o.trim();i.length>0&&t(JSON.parse(i))}finally{e.releaseLock()}}function rt(r){let t=r.indexOf("/+/");if(t===-1)return{repo:r,version:"",filePath:""};let e=r.slice(0,t),a=r.slice(t+3),o=e.lastIndexOf("/");return o===-1?{repo:e,version:"",filePath:a}:{repo:e.slice(0,o),version:e.slice(o+1),filePath:a}}function sa(r,t={},e={}){let a=new URLSearchParams;if(r.trim()&&a.set("q",r.trim()),t.literal&&a.set("literal","true"),t.caseSensitive&&a.set("fold_case","false"),t.repos?.length)for(let o of t.repos)a.append("repo",o);for(let[o,i]of Object.entries(e))for(let n of i)a.append(o,n);return a}var ye=class{constructor(){this.lastCommittedUrl=""}commit(t,e={},a={}){let o=sa(t,e,a),i=t?`${t} \xB7 code search`:"code search",n=ve(o);if(!t)return this.lastCommittedUrl="",[{type:"replaceUrl",url:ve(new URLSearchParams),title:i},{type:"clearResults"}];let l=[];return n!==this.lastCommittedUrl&&this.lastCommittedUrl!==""?l.push({type:"pushUrl",url:n,title:i}):l.push({type:"replaceUrl",url:n,title:i}),l.push({type:"search",params:o}),this.lastCommittedUrl=n,l}popstate(t,e){this.lastCommittedUrl=ve(e);let a=t?`${t} \xB7 code search`:"code search",o=[{type:"replaceUrl",url:ve(e),title:a}];return t?o.push({type:"search",params:e}):o.push({type:"clearResults"}),o}};function ve(r){let t=r.toString();return"/search"+(t?"?"+t:"")}var ke=class{constructor(){this.results=[];this.files=[];this.dirty=!1;this.flushed=!1}start(){return this.results=[],this.files=[],this.dirty=!1,this.flushed=!1,{loading:!0,error:null,done:null}}onResult(t){this.results.push(t),this.dirty=!0}onFile(t){this.files.push(t),this.dirty=!0}flush(){if(!this.dirty)return null;this.dirty=!1;let t={results:[...this.results],files:[...this.files]};return this.flushed||(t.facets=null,this.flushed=!0),t}onFacets(t){return{facets:t}}onDone(t){return{results:this.results,files:this.files,done:t,loading:!1}}onError(t){return{error:t,loading:!1}}};var ut=de(()=>I.get().params.get("q")??""),ks=de(()=>{let r=I.get().params;return{literal:r.get("literal")==="true",caseSensitive:r.get("fold_case")==="false"}}),la=de(()=>{let r=I.get().params.get("context");if(r!==null){let t=parseInt(r,10);if(!isNaN(t)&&t>=0)return t}return 3}),Lt=F([]),Rt=F([]),It=F(null),Ot=F(null),Nt=F(!1),Ut=F(null),ar=null;async function _o(){ar&&ar.abort();let r=new AbortController;if(ar=r,!ut.get()){Lt.set([]),Rt.set([]),It.set(null),Ot.set(null),Nt.set(!1),Ut.set(null);return}let e=I.get(),a=new URLSearchParams(e.params),o=new ke;Mt(o.start());let i=setInterval(()=>{let n=o.flush();n&&Mt(n)},100);try{await na(a,{onResult(n){o.onResult(n)},onFile(n){o.onFile(n)},onFacets(n){Mt(o.onFacets(n))},onDone(n){clearInterval(i),Mt(o.onDone(n))}},r.signal)}catch(n){clearInterval(i),r.signal.aborted||Mt(o.onError(n instanceof Error?n.message:String(n)))}}function Mt(r){"results"in r&&Lt.set(r.results),"files"in r&&Rt.set(r.files),"facets"in r&&It.set(r.facets),"done"in r&&Ot.set(r.done),"loading"in r&&Nt.set(r.loading),"error"in r&&Ut.set(r.error)}var _e=new ye,at=null;function ca(r,t={},e={}){at&&clearTimeout(at),at=setTimeout(()=>{at=null,xe(_e.commit(r,t,e))},200)}function we(r,t={},e={}){at&&(clearTimeout(at),at=null),xe(_e.commit(r,t,e))}function wo(){let r=ut.get();r&&xe(_e.commit(r))}wo();window.addEventListener("popstate",()=>{let r=I.get(),t=r.params.get("q")??"";xe(_e.popstate(t,r.params))});function xe(r){for(let t of r)switch(t.type){case"pushUrl":history.pushState(null,t.title,t.url),document.title=t.title,I.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"replaceUrl":history.replaceState(null,t.title,t.url),document.title=t.title,I.set({name:"search",params:new URLSearchParams(new URL(t.url,location.origin).search)});break;case"search":_o();break;case"clearResults":Lt.set([]),Rt.set([]),It.set(null),Ot.set(null),Nt.set(!1),Ut.set(null);break}}var ot=class extends b{constructor(){super(...arguments);this.value="";this.error=""}render(){return g`
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
          ${this.error?g`<span id="errortext">${this.error}</span>`:w}
        </div>
      </div>
    `}onInput(){let e=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:e.value},bubbles:!0,composed:!0}))}onKeydown(e){if(e.key==="Enter"){let a=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-submit",{detail:{value:a.value},bubbles:!0,composed:!0}))}}appendQuery(e){let a=this.renderRoot.querySelector("#searchbox");a&&(a.value+=e,this.value=a.value,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:a.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};ot.styles=[Gr,m`
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
    `],d([u()],ot.prototype,"value",2),d([u()],ot.prototype,"error",2),ot=d([_("cs-search-input")],ot);var W=class extends b{constructor(){super(...arguments);this.groups=[];this._open=!1;this._search="";this._selected=new Set;this._onOutsideClick=e=>{this._open&&(e.composedPath().includes(this)||(this._open=!1))}}get _options(){return this.groups.flatMap(e=>e.repos.map(a=>({value:a,label:a.split("/").pop()??a,group:e.label,selected:this._selected.has(a)})))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick)}get selectedRepos(){return[...this._selected]}get _buttonText(){let e=this._selected.size;return e===0?"(all repositories)":e<=4?this._options.filter(o=>o.selected).map(o=>o.label).join(", "):`(${e} repositories)`}get _filteredGroups(){let e=this._search.toLowerCase(),a=new Map;for(let o of this._options)e&&!o.value.toLowerCase().includes(e)&&!o.label.toLowerCase().includes(e)||(a.has(o.group)||a.set(o.group,[]),a.get(o.group).push(o));return[...a.entries()].map(([o,i])=>({label:o,options:i}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(e){let a=new Set(this._selected);a.has(e)?a.delete(e):a.add(e),this._selected=a,this._fireChange()}_selectAll(){this._selected=new Set(this._options.map(e=>e.value)),this._fireChange()}_deselectAll(){this._selected=new Set,this._fireChange()}_toggleGroup(e){let a=this._options.filter(n=>n.group===e).map(n=>n.value),o=a.every(n=>this._selected.has(n)),i=new Set(this._selected);for(let n of a)o?i.delete(n):i.add(n);this._selected=i,this._fireChange()}_fireChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}_onSearchInput(e){this._search=e.target.value}_onSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this._search=""),e.key==="Escape"&&(this._open=!1)}render(){return g`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():w}
        `}_renderDropdown(){let e=this._filteredGroups;return g`
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
                <div class="options">${e.map(a=>this._renderGroup(a))}</div>
            </div>
        `}_renderGroup(e){return e.label?g`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(e.label)}>${e.label}</div>
                ${e.options.map(a=>this._renderOption(a))}
            </div>
        `:e.options.map(a=>this._renderOption(a))}_renderOption(e){return g`
            <label class="option ${e.selected?"selected":""}">
                <input type="checkbox" .checked=${e.selected} @change=${()=>this._toggleOption(e.value)} />
                ${e.label}
            </label>
        `}};W.styles=m`
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
    `,d([u({type:Array})],W.prototype,"groups",2),d([A()],W.prototype,"_open",2),d([A()],W.prototype,"_search",2),d([A()],W.prototype,"_selected",2),W=d([_("repo-select")],W);var it=class extends b{constructor(){super(...arguments);this.options={};this.repos=[]}render(){let e=this.options.caseSensitive?"false":"auto";return g`
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
    `}setCase(e){let a=e==="false";this.options={...this.options,caseSensitive:a},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}onRepoChange(){let a=this.renderRoot.querySelector("repo-select")?.selectedRepos??[];this.options={...this.options,repos:a.length>0?a:void 0},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};it.styles=[Fr,ft,m`
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
    `],d([u({type:Object})],it.prototype,"options",2),d([u({type:Array})],it.prototype,"repos",2),it=d([_("cs-search-options")],it);var xo="2.16.0",So=["ada","agda","asciidoc","asm","awk","bash","batch","c","c-sharp","caddy","capnp","cedar","cedarschema","clojure","cmake","cobol","commonlisp","cpp","css","d","dart","devicetree","diff","dockerfile","dot","elisp","elixir","elm","erlang","fish","fsharp","gleam","glsl","go","graphql","groovy","haskell","hcl","hlsl","html","idris","ini","java","javascript","jinja2","jq","json","julia","kotlin","lean","lua","markdown","matlab","meson","nginx","ninja","nix","objc","ocaml","perl","php","postscript","powershell","prolog","python","query","r","rego","rescript","ron","ruby","rust","scala","scheme","scss","solidity","sparql","sql","ssh-config","starlark","styx","svelte","swift","textproto","thrift","tlaplus","toml","tsx","typescript","typst","uiua","vb","verilog","vhdl","vim","vue","wit","x86asm","xml","yaml","yuri","zig","zsh"];function $o(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var cr={manual:!1,theme:"one-dark",selector:"pre code",cdn:"jsdelivr",version:xo,pluginsUrl:"",hostUrl:"",logger:console,resolveHostJs:({baseUrl:r,path:t})=>import(`${r}/${t}`),resolveHostWasm:({baseUrl:r,path:t})=>fetch(`${r}/${t}`),resolveJs:({baseUrl:r,path:t})=>import(`${r}/${t}`),resolveWasm:({baseUrl:r,path:t})=>fetch(`${r}/${t}`)},or=null,ir=null,Se={...cr},hr=new Map,nr=new Map,ha=new Set(So),Dt=null,sr=null;async function Eo(r){if(r.pluginsUrl)return sr||(sr=(async()=>{r.logger.debug(`[arborium] Loading local plugins manifest from: ${r.pluginsUrl}`);let t=await fetch(r.pluginsUrl);if(!t.ok)throw new Error(`Failed to load plugins.json: ${t.status}`);Dt=await t.json(),r.logger.debug(`[arborium] Loaded local manifest with ${Dt?.entries.length} entries`)})(),sr)}function Co(r,t){if(Dt){let i=Dt.entries.find(n=>n.language===r);if(i)return i.local_js.substring(0,i.local_js.lastIndexOf("/"))}let e=t.cdn,a=t.version,o;return e==="jsdelivr"?o="https://cdn.jsdelivr.net/npm":e==="unpkg"?o="https://unpkg.com":o=e,`${o}/@arborium/${r}@${a}`}async function Ao(r,t){let e=hr.get(r);if(e)return t.logger.debug(`[arborium] Grammar '${r}' found in cache`),e;let a=nr.get(r);if(a)return t.logger.debug(`[arborium] Grammar '${r}' already loading, waiting...`),a;let o=To(r,t);nr.set(r,o);try{return await o}finally{nr.delete(r)}}async function To(r,t){if(await Eo(t),!ha.has(r)&&!Dt?.entries.some(e=>e.language===r))return t.logger.debug(`[arborium] Grammar '${r}' not available`),null;try{let e=Co(r,t),a=t.resolveJs===cr.resolveJs?` from ${e}/grammar.js`:"";t.logger.debug(`[arborium] Loading grammar '${r}'${a}`);let o=await t.resolveJs({language:r,baseUrl:e,path:"grammar.js"}),i=await t.resolveWasm({language:r,baseUrl:e,path:"grammar_bg.wasm"});await o.default({module_or_path:i});let n=o.language_id();n!==r&&t.logger.warn(`[arborium] Language ID mismatch: expected '${r}', got '${n}'`);let l=o.injection_languages(),s={languageId:r,injectionLanguages:l,module:o,parseUtf8:h=>{let p=o.create_session();try{o.set_text(p,h);let c=o.parse(p);return{spans:c.spans||[],injections:c.injections||[]}}catch(c){return t.logger.error("[arborium] Parse error:",c),{spans:[],injections:[]}}finally{o.free_session(p)}},parseUtf16:h=>{let p=o.create_session();try{o.set_text(p,h);let c=o.parse_utf16(p);return{spans:c.spans||[],injections:c.injections||[]}}catch(c){return t.logger.error("[arborium] Parse error:",c),{spans:[],injections:[]}}finally{o.free_session(p)}}};return hr.set(r,s),t.logger.debug(`[arborium] Grammar '${r}' loaded successfully`),s}catch(e){return t.logger.error(`[arborium] Failed to load grammar '${r}':`,e),null}}var lr=new Map,Po=1;function zo(r){globalThis.arboriumHost={isLanguageAvailable(t){return ha.has(t)||hr.has(t)},async loadGrammar(t){let e=await Ao(t,r);if(!e)return 0;for(let[o,i]of lr)if(i===e)return o;let a=Po++;return lr.set(a,e),a},parse(t,e){let a=lr.get(t);return a?a.parseUtf8(e):{spans:[],injections:[]}}}}function Mo(r){if(r.hostUrl)return r.hostUrl;let t=r.cdn,e=r.version,a;t==="jsdelivr"?a="https://cdn.jsdelivr.net/npm":t==="unpkg"?a="https://unpkg.com":a=t;let o=e==="latest"?"":`@${e}`;return`${a}/@arborium/arborium${o}/dist`}async function Lo(r){return or||ir||(ir=(async()=>{zo(r);let t=Mo(r),e=r.resolveHostJs===cr.resolveHostJs?` from ${t}/arborium_host.js`:"";r.logger.debug(`[arborium] Loading host${e}`);try{let a=await r.resolveHostJs({baseUrl:t,path:"arborium_host.js"}),o=await r.resolveHostWasm({baseUrl:t,path:"arborium_host_bg.wasm"});return await a.default({module_or_path:o}),or={highlight:a.highlight,isLanguageAvailable:a.isLanguageAvailable},r.logger.debug("[arborium] Host loaded successfully"),or}catch(a){return r.logger.error("[arborium] Failed to load host:",a),null}})(),ir)}async function da(r,t,e){let a=Ro(e),o=await Lo(a);if(o)try{return o.highlight(r,t)}catch(i){a.logger.error("[arborium] Host highlight failed:",i)}return $o(t)}function Ro(r){return r?{...Se,...r}:{...Se}}function ga(r){Se={...Se,...r}}var pa={".go":"go",".py":"python",".rs":"rust",".ts":"typescript",".tsx":"tsx",".js":"javascript",".jsx":"jsx",".c":"c",".h":"c",".cc":"cpp",".cpp":"cpp",".hpp":"cpp",".java":"java",".rb":"ruby",".sh":"bash",".bash":"bash",".zsh":"bash",".fish":"fish",".clj":"clojure",".cljs":"clojure",".cljc":"clojure",".yaml":"yaml",".yml":"yaml",".json":"json",".toml":"toml",".md":"markdown",".html":"html",".css":"css",".scss":"scss",".sql":"sql",".lua":"lua",".zig":"zig",".swift":"swift",".kt":"kotlin",".scala":"scala",".r":"r",".el":"elisp",".ex":"elixir",".erl":"erlang",".hs":"haskell",".ml":"ocaml",".fs":"fsharp",".proto":"protobuf",".tf":"hcl",".dockerfile":"dockerfile",".makefile":"make",".xml":"xml",".svg":"xml"},fa={Makefile:"make",makefile:"make",GNUmakefile:"make",Dockerfile:"dockerfile","CMakeLists.txt":"cmake",".gitignore":"gitignore",".bashrc":"bash",".zshrc":"bash",".profile":"bash"};function Io(r){let t=r.split("/").pop()??"";if(fa[t])return fa[t];let e=t.lastIndexOf(".");if(e>=0){let a=t.slice(e).toLowerCase();if(pa[a])return pa[a]}return""}ga({logger:{debug:()=>{},warn:console.warn,error:console.error}});async function $e(r,t){let e=Io(r);if(!e)return null;try{return(await da(e,t)).split(`
`)}catch{return null}}var dr=O(class extends j{constructor(r){if(super(r),r.type!==q.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((t=>r[t])).join(" ")+" "}update(r,[t]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((a=>a!==""))));for(let a in t)t[a]&&!this.nt?.has(a)&&this.st.add(a);return this.render(t)}let e=r.element.classList;for(let a of this.st)a in t||(e.remove(a),this.st.delete(a));for(let a in t){let o=!!t[a];o===this.st.has(a)||this.nt?.has(a)||(o?(e.add(a),this.st.add(a)):(e.remove(a),this.st.delete(a)))}return P}});var jt=class extends j{constructor(t){if(super(t),this.it=w,t.type!==q.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this._t=void 0,this.it=t;if(t===P)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};jt.directiveName="unsafeHTML",jt.resultType=1;var Ee=O(jt);var Ce=`/* Arborium base CSS - handles light/dark switching */
/* Include this + one light theme + one dark theme */

/* Default: light mode */
a-at { color: var(--arb-at-light); font-weight: var(--arb-at-light-weight, normal); font-style: var(--arb-at-light-style, normal); text-decoration: var(--arb-at-light-decoration, none); }
a-co { color: var(--arb-co-light); font-weight: var(--arb-co-light-weight, normal); font-style: var(--arb-co-light-style, normal); text-decoration: var(--arb-co-light-decoration, none); }
a-cb { color: var(--arb-cb-light); font-weight: var(--arb-cb-light-weight, normal); font-style: var(--arb-cb-light-style, normal); text-decoration: var(--arb-cb-light-decoration, none); }
a-cr { color: var(--arb-cr-light); font-weight: var(--arb-cr-light-weight, normal); font-style: var(--arb-cr-light-style, normal); text-decoration: var(--arb-cr-light-decoration, none); }
a-fb { color: var(--arb-fb-light); font-weight: var(--arb-fb-light-weight, normal); font-style: var(--arb-fb-light-style, normal); text-decoration: var(--arb-fb-light-decoration, none); }
a-f { color: var(--arb-f-light); font-weight: var(--arb-f-light-weight, normal); font-style: var(--arb-f-light-style, normal); text-decoration: var(--arb-f-light-decoration, none); }
a-fm { color: var(--arb-fm-light); font-weight: var(--arb-fm-light-weight, normal); font-style: var(--arb-fm-light-style, normal); text-decoration: var(--arb-fm-light-decoration, none); }
a-k { color: var(--arb-k-light); font-weight: var(--arb-k-light-weight, normal); font-style: var(--arb-k-light-style, normal); text-decoration: var(--arb-k-light-decoration, none); }
a-kc { color: var(--arb-kc-light); font-weight: var(--arb-kc-light-weight, normal); font-style: var(--arb-kc-light-style, normal); text-decoration: var(--arb-kc-light-decoration, none); }
a-ko { color: var(--arb-ko-light); font-weight: var(--arb-ko-light-weight, normal); font-style: var(--arb-ko-light-style, normal); text-decoration: var(--arb-ko-light-decoration, none); }
a-kd { color: var(--arb-kd-light); font-weight: var(--arb-kd-light-weight, normal); font-style: var(--arb-kd-light-style, normal); text-decoration: var(--arb-kd-light-decoration, none); }
a-ke { color: var(--arb-ke-light); font-weight: var(--arb-ke-light-weight, normal); font-style: var(--arb-ke-light-style, normal); text-decoration: var(--arb-ke-light-decoration, none); }
a-kf { color: var(--arb-kf-light); font-weight: var(--arb-kf-light-weight, normal); font-style: var(--arb-kf-light-style, normal); text-decoration: var(--arb-kf-light-decoration, none); }
a-ki { color: var(--arb-ki-light); font-weight: var(--arb-ki-light-weight, normal); font-style: var(--arb-ki-light-style, normal); text-decoration: var(--arb-ki-light-decoration, none); }
a-kp { color: var(--arb-kp-light); font-weight: var(--arb-kp-light-weight, normal); font-style: var(--arb-kp-light-style, normal); text-decoration: var(--arb-kp-light-decoration, none); }
a-kr { color: var(--arb-kr-light); font-weight: var(--arb-kr-light-weight, normal); font-style: var(--arb-kr-light-style, normal); text-decoration: var(--arb-kr-light-decoration, none); }
a-kt { color: var(--arb-kt-light); font-weight: var(--arb-kt-light-weight, normal); font-style: var(--arb-kt-light-style, normal); text-decoration: var(--arb-kt-light-decoration, none); }
a-ky { color: var(--arb-ky-light); font-weight: var(--arb-ky-light-weight, normal); font-style: var(--arb-ky-light-style, normal); text-decoration: var(--arb-ky-light-decoration, none); }
a-o { color: var(--arb-o-light); font-weight: var(--arb-o-light-weight, normal); font-style: var(--arb-o-light-style, normal); text-decoration: var(--arb-o-light-decoration, none); }
a-pr { color: var(--arb-pr-light); font-weight: var(--arb-pr-light-weight, normal); font-style: var(--arb-pr-light-style, normal); text-decoration: var(--arb-pr-light-decoration, none); }
a-p { color: var(--arb-p-light); font-weight: var(--arb-p-light-weight, normal); font-style: var(--arb-p-light-style, normal); text-decoration: var(--arb-p-light-decoration, none); }
a-pb { color: var(--arb-pb-light); font-weight: var(--arb-pb-light-weight, normal); font-style: var(--arb-pb-light-style, normal); text-decoration: var(--arb-pb-light-decoration, none); }
a-pd { color: var(--arb-pd-light); font-weight: var(--arb-pd-light-weight, normal); font-style: var(--arb-pd-light-style, normal); text-decoration: var(--arb-pd-light-decoration, none); }
a-ps { color: var(--arb-ps-light); font-weight: var(--arb-ps-light-weight, normal); font-style: var(--arb-ps-light-style, normal); text-decoration: var(--arb-ps-light-decoration, none); }
a-s { color: var(--arb-s-light); font-weight: var(--arb-s-light-weight, normal); font-style: var(--arb-s-light-style, normal); text-decoration: var(--arb-s-light-decoration, none); }
a-ss { color: var(--arb-ss-light); font-weight: var(--arb-ss-light-weight, normal); font-style: var(--arb-ss-light-style, normal); text-decoration: var(--arb-ss-light-decoration, none); }
a-tg { color: var(--arb-tg-light); font-weight: var(--arb-tg-light-weight, normal); font-style: var(--arb-tg-light-style, normal); text-decoration: var(--arb-tg-light-decoration, none); }
a-td { color: var(--arb-td-light); font-weight: var(--arb-td-light-weight, normal); font-style: var(--arb-td-light-style, normal); text-decoration: var(--arb-td-light-decoration, none); }
a-te { color: var(--arb-te-light); font-weight: var(--arb-te-light-weight, normal); font-style: var(--arb-te-light-style, normal); text-decoration: var(--arb-te-light-decoration, none); }
a-t { color: var(--arb-t-light); font-weight: var(--arb-t-light-weight, normal); font-style: var(--arb-t-light-style, normal); text-decoration: var(--arb-t-light-decoration, none); }
a-tb { color: var(--arb-tb-light); font-weight: var(--arb-tb-light-weight, normal); font-style: var(--arb-tb-light-style, normal); text-decoration: var(--arb-tb-light-decoration, none); }
a-tq { color: var(--arb-tq-light); font-weight: var(--arb-tq-light-weight, normal); font-style: var(--arb-tq-light-style, normal); text-decoration: var(--arb-tq-light-decoration, none); }
a-v { color: var(--arb-v-light); font-weight: var(--arb-v-light-weight, normal); font-style: var(--arb-v-light-style, normal); text-decoration: var(--arb-v-light-decoration, none); }
a-vb { color: var(--arb-vb-light); font-weight: var(--arb-vb-light-weight, normal); font-style: var(--arb-vb-light-style, normal); text-decoration: var(--arb-vb-light-decoration, none); }
a-vp { color: var(--arb-vp-light); font-weight: var(--arb-vp-light-weight, normal); font-style: var(--arb-vp-light-style, normal); text-decoration: var(--arb-vp-light-decoration, none); }
a-c { color: var(--arb-c-light); font-weight: var(--arb-c-light-weight, normal); font-style: var(--arb-c-light-style, normal); text-decoration: var(--arb-c-light-decoration, none); }
a-cd { color: var(--arb-cd-light); font-weight: var(--arb-cd-light-weight, normal); font-style: var(--arb-cd-light-style, normal); text-decoration: var(--arb-cd-light-decoration, none); }
a-m { color: var(--arb-m-light); font-weight: var(--arb-m-light-weight, normal); font-style: var(--arb-m-light-style, normal); text-decoration: var(--arb-m-light-decoration, none); }
a-l { color: var(--arb-l-light); font-weight: var(--arb-l-light-weight, normal); font-style: var(--arb-l-light-style, normal); text-decoration: var(--arb-l-light-decoration, none); }
a-da { color: var(--arb-da-light); font-weight: var(--arb-da-light-weight, normal); font-style: var(--arb-da-light-style, normal); text-decoration: var(--arb-da-light-decoration, none); }
a-dd { color: var(--arb-dd-light); font-weight: var(--arb-dd-light-weight, normal); font-style: var(--arb-dd-light-style, normal); text-decoration: var(--arb-dd-light-decoration, none); }
a-n { color: var(--arb-n-light); font-weight: var(--arb-n-light-weight, normal); font-style: var(--arb-n-light-style, normal); text-decoration: var(--arb-n-light-decoration, none); }
a-tl { color: var(--arb-tl-light); font-weight: var(--arb-tl-light-weight, normal); font-style: var(--arb-tl-light-style, normal); text-decoration: var(--arb-tl-light-decoration, none); }
a-em { color: var(--arb-em-light); font-weight: var(--arb-em-light-weight, normal); font-style: var(--arb-em-light-style, normal); text-decoration: var(--arb-em-light-decoration, none); }
a-st { color: var(--arb-st-light); font-weight: var(--arb-st-light-weight, normal); font-style: var(--arb-st-light-style, normal); text-decoration: var(--arb-st-light-decoration, none); }
a-tu { color: var(--arb-tu-light); font-weight: var(--arb-tu-light-weight, normal); font-style: var(--arb-tu-light-style, normal); text-decoration: var(--arb-tu-light-decoration, none); }
a-tr { color: var(--arb-tr-light); font-weight: var(--arb-tr-light-weight, normal); font-style: var(--arb-tr-light-style, normal); text-decoration: var(--arb-tr-light-decoration, none); }
a-se { color: var(--arb-se-light); font-weight: var(--arb-se-light-weight, normal); font-style: var(--arb-se-light-style, normal); text-decoration: var(--arb-se-light-decoration, none); }
a-tt { color: var(--arb-tt-light); font-weight: var(--arb-tt-light-weight, normal); font-style: var(--arb-tt-light-style, normal); text-decoration: var(--arb-tt-light-decoration, none); }
a-tx { color: var(--arb-tx-light); font-weight: var(--arb-tx-light-weight, normal); font-style: var(--arb-tx-light-style, normal); text-decoration: var(--arb-tx-light-decoration, none); }
a-sp { color: var(--arb-sp-light); font-weight: var(--arb-sp-light-weight, normal); font-style: var(--arb-sp-light-style, normal); text-decoration: var(--arb-sp-light-decoration, none); }
a-eb { color: var(--arb-eb-light); font-weight: var(--arb-eb-light-weight, normal); font-style: var(--arb-eb-light-style, normal); text-decoration: var(--arb-eb-light-decoration, none); }
a-er { color: var(--arb-er-light); font-weight: var(--arb-er-light-weight, normal); font-style: var(--arb-er-light-style, normal); text-decoration: var(--arb-er-light-decoration, none); }
a-ns { color: var(--arb-ns-light); font-weight: var(--arb-ns-light-weight, normal); font-style: var(--arb-ns-light-style, normal); text-decoration: var(--arb-ns-light-decoration, none); }
a-in { color: var(--arb-in-light); font-weight: var(--arb-in-light-weight, normal); font-style: var(--arb-in-light-style, normal); text-decoration: var(--arb-in-light-decoration, none); }
a-sc { color: var(--arb-sc-light); font-weight: var(--arb-sc-light-weight, normal); font-style: var(--arb-sc-light-style, normal); text-decoration: var(--arb-sc-light-decoration, none); }
a-rp { color: var(--arb-rp-light); font-weight: var(--arb-rp-light-weight, normal); font-style: var(--arb-rp-light-style, normal); text-decoration: var(--arb-rp-light-decoration, none); }
a-cn { color: var(--arb-cn-light); font-weight: var(--arb-cn-light-weight, normal); font-style: var(--arb-cn-light-style, normal); text-decoration: var(--arb-cn-light-decoration, none); }
a-ex { color: var(--arb-ex-light); font-weight: var(--arb-ex-light-weight, normal); font-style: var(--arb-ex-light-style, normal); text-decoration: var(--arb-ex-light-decoration, none); }
a-pp { color: var(--arb-pp-light); font-weight: var(--arb-pp-light-weight, normal); font-style: var(--arb-pp-light-style, normal); text-decoration: var(--arb-pp-light-decoration, none); }
a-ch { color: var(--arb-ch-light); font-weight: var(--arb-ch-light-weight, normal); font-style: var(--arb-ch-light-style, normal); text-decoration: var(--arb-ch-light-decoration, none); }
a-cs { color: var(--arb-cs-light); font-weight: var(--arb-cs-light-weight, normal); font-style: var(--arb-cs-light-style, normal); text-decoration: var(--arb-cs-light-decoration, none); }
a-vm { color: var(--arb-vm-light); font-weight: var(--arb-vm-light-weight, normal); font-style: var(--arb-vm-light-style, normal); text-decoration: var(--arb-vm-light-decoration, none); }
a-fd { color: var(--arb-fd-light); font-weight: var(--arb-fd-light-weight, normal); font-style: var(--arb-fd-light-style, normal); text-decoration: var(--arb-fd-light-decoration, none); }
a-tf { color: var(--arb-tf-light); font-weight: var(--arb-tf-light-weight, normal); font-style: var(--arb-tf-light-style, normal); text-decoration: var(--arb-tf-light-decoration, none); }
a-fc { color: var(--arb-fc-light); font-weight: var(--arb-fc-light-weight, normal); font-style: var(--arb-fc-light-style, normal); text-decoration: var(--arb-fc-light-decoration, none); }
a-km { color: var(--arb-km-light); font-weight: var(--arb-km-light-weight, normal); font-style: var(--arb-km-light-style, normal); text-decoration: var(--arb-km-light-decoration, none); }
a-dr { color: var(--arb-dr-light); font-weight: var(--arb-dr-light-weight, normal); font-style: var(--arb-dr-light-style, normal); text-decoration: var(--arb-dr-light-decoration, none); }
a-rx { color: var(--arb-rx-light); font-weight: var(--arb-rx-light-weight, normal); font-style: var(--arb-rx-light-style, normal); text-decoration: var(--arb-rx-light-decoration, none); }

/* System preference: dark */
@media (prefers-color-scheme: dark) {
  a-at { color: var(--arb-at-dark); font-weight: var(--arb-at-dark-weight, normal); font-style: var(--arb-at-dark-style, normal); text-decoration: var(--arb-at-dark-decoration, none); }
  a-co { color: var(--arb-co-dark); font-weight: var(--arb-co-dark-weight, normal); font-style: var(--arb-co-dark-style, normal); text-decoration: var(--arb-co-dark-decoration, none); }
  a-cb { color: var(--arb-cb-dark); font-weight: var(--arb-cb-dark-weight, normal); font-style: var(--arb-cb-dark-style, normal); text-decoration: var(--arb-cb-dark-decoration, none); }
  a-cr { color: var(--arb-cr-dark); font-weight: var(--arb-cr-dark-weight, normal); font-style: var(--arb-cr-dark-style, normal); text-decoration: var(--arb-cr-dark-decoration, none); }
  a-fb { color: var(--arb-fb-dark); font-weight: var(--arb-fb-dark-weight, normal); font-style: var(--arb-fb-dark-style, normal); text-decoration: var(--arb-fb-dark-decoration, none); }
  a-f { color: var(--arb-f-dark); font-weight: var(--arb-f-dark-weight, normal); font-style: var(--arb-f-dark-style, normal); text-decoration: var(--arb-f-dark-decoration, none); }
  a-fm { color: var(--arb-fm-dark); font-weight: var(--arb-fm-dark-weight, normal); font-style: var(--arb-fm-dark-style, normal); text-decoration: var(--arb-fm-dark-decoration, none); }
  a-k { color: var(--arb-k-dark); font-weight: var(--arb-k-dark-weight, normal); font-style: var(--arb-k-dark-style, normal); text-decoration: var(--arb-k-dark-decoration, none); }
  a-kc { color: var(--arb-kc-dark); font-weight: var(--arb-kc-dark-weight, normal); font-style: var(--arb-kc-dark-style, normal); text-decoration: var(--arb-kc-dark-decoration, none); }
  a-ko { color: var(--arb-ko-dark); font-weight: var(--arb-ko-dark-weight, normal); font-style: var(--arb-ko-dark-style, normal); text-decoration: var(--arb-ko-dark-decoration, none); }
  a-kd { color: var(--arb-kd-dark); font-weight: var(--arb-kd-dark-weight, normal); font-style: var(--arb-kd-dark-style, normal); text-decoration: var(--arb-kd-dark-decoration, none); }
  a-ke { color: var(--arb-ke-dark); font-weight: var(--arb-ke-dark-weight, normal); font-style: var(--arb-ke-dark-style, normal); text-decoration: var(--arb-ke-dark-decoration, none); }
  a-kf { color: var(--arb-kf-dark); font-weight: var(--arb-kf-dark-weight, normal); font-style: var(--arb-kf-dark-style, normal); text-decoration: var(--arb-kf-dark-decoration, none); }
  a-ki { color: var(--arb-ki-dark); font-weight: var(--arb-ki-dark-weight, normal); font-style: var(--arb-ki-dark-style, normal); text-decoration: var(--arb-ki-dark-decoration, none); }
  a-kp { color: var(--arb-kp-dark); font-weight: var(--arb-kp-dark-weight, normal); font-style: var(--arb-kp-dark-style, normal); text-decoration: var(--arb-kp-dark-decoration, none); }
  a-kr { color: var(--arb-kr-dark); font-weight: var(--arb-kr-dark-weight, normal); font-style: var(--arb-kr-dark-style, normal); text-decoration: var(--arb-kr-dark-decoration, none); }
  a-kt { color: var(--arb-kt-dark); font-weight: var(--arb-kt-dark-weight, normal); font-style: var(--arb-kt-dark-style, normal); text-decoration: var(--arb-kt-dark-decoration, none); }
  a-ky { color: var(--arb-ky-dark); font-weight: var(--arb-ky-dark-weight, normal); font-style: var(--arb-ky-dark-style, normal); text-decoration: var(--arb-ky-dark-decoration, none); }
  a-o { color: var(--arb-o-dark); font-weight: var(--arb-o-dark-weight, normal); font-style: var(--arb-o-dark-style, normal); text-decoration: var(--arb-o-dark-decoration, none); }
  a-pr { color: var(--arb-pr-dark); font-weight: var(--arb-pr-dark-weight, normal); font-style: var(--arb-pr-dark-style, normal); text-decoration: var(--arb-pr-dark-decoration, none); }
  a-p { color: var(--arb-p-dark); font-weight: var(--arb-p-dark-weight, normal); font-style: var(--arb-p-dark-style, normal); text-decoration: var(--arb-p-dark-decoration, none); }
  a-pb { color: var(--arb-pb-dark); font-weight: var(--arb-pb-dark-weight, normal); font-style: var(--arb-pb-dark-style, normal); text-decoration: var(--arb-pb-dark-decoration, none); }
  a-pd { color: var(--arb-pd-dark); font-weight: var(--arb-pd-dark-weight, normal); font-style: var(--arb-pd-dark-style, normal); text-decoration: var(--arb-pd-dark-decoration, none); }
  a-ps { color: var(--arb-ps-dark); font-weight: var(--arb-ps-dark-weight, normal); font-style: var(--arb-ps-dark-style, normal); text-decoration: var(--arb-ps-dark-decoration, none); }
  a-s { color: var(--arb-s-dark); font-weight: var(--arb-s-dark-weight, normal); font-style: var(--arb-s-dark-style, normal); text-decoration: var(--arb-s-dark-decoration, none); }
  a-ss { color: var(--arb-ss-dark); font-weight: var(--arb-ss-dark-weight, normal); font-style: var(--arb-ss-dark-style, normal); text-decoration: var(--arb-ss-dark-decoration, none); }
  a-tg { color: var(--arb-tg-dark); font-weight: var(--arb-tg-dark-weight, normal); font-style: var(--arb-tg-dark-style, normal); text-decoration: var(--arb-tg-dark-decoration, none); }
  a-td { color: var(--arb-td-dark); font-weight: var(--arb-td-dark-weight, normal); font-style: var(--arb-td-dark-style, normal); text-decoration: var(--arb-td-dark-decoration, none); }
  a-te { color: var(--arb-te-dark); font-weight: var(--arb-te-dark-weight, normal); font-style: var(--arb-te-dark-style, normal); text-decoration: var(--arb-te-dark-decoration, none); }
  a-t { color: var(--arb-t-dark); font-weight: var(--arb-t-dark-weight, normal); font-style: var(--arb-t-dark-style, normal); text-decoration: var(--arb-t-dark-decoration, none); }
  a-tb { color: var(--arb-tb-dark); font-weight: var(--arb-tb-dark-weight, normal); font-style: var(--arb-tb-dark-style, normal); text-decoration: var(--arb-tb-dark-decoration, none); }
  a-tq { color: var(--arb-tq-dark); font-weight: var(--arb-tq-dark-weight, normal); font-style: var(--arb-tq-dark-style, normal); text-decoration: var(--arb-tq-dark-decoration, none); }
  a-v { color: var(--arb-v-dark); font-weight: var(--arb-v-dark-weight, normal); font-style: var(--arb-v-dark-style, normal); text-decoration: var(--arb-v-dark-decoration, none); }
  a-vb { color: var(--arb-vb-dark); font-weight: var(--arb-vb-dark-weight, normal); font-style: var(--arb-vb-dark-style, normal); text-decoration: var(--arb-vb-dark-decoration, none); }
  a-vp { color: var(--arb-vp-dark); font-weight: var(--arb-vp-dark-weight, normal); font-style: var(--arb-vp-dark-style, normal); text-decoration: var(--arb-vp-dark-decoration, none); }
  a-c { color: var(--arb-c-dark); font-weight: var(--arb-c-dark-weight, normal); font-style: var(--arb-c-dark-style, normal); text-decoration: var(--arb-c-dark-decoration, none); }
  a-cd { color: var(--arb-cd-dark); font-weight: var(--arb-cd-dark-weight, normal); font-style: var(--arb-cd-dark-style, normal); text-decoration: var(--arb-cd-dark-decoration, none); }
  a-m { color: var(--arb-m-dark); font-weight: var(--arb-m-dark-weight, normal); font-style: var(--arb-m-dark-style, normal); text-decoration: var(--arb-m-dark-decoration, none); }
  a-l { color: var(--arb-l-dark); font-weight: var(--arb-l-dark-weight, normal); font-style: var(--arb-l-dark-style, normal); text-decoration: var(--arb-l-dark-decoration, none); }
  a-da { color: var(--arb-da-dark); font-weight: var(--arb-da-dark-weight, normal); font-style: var(--arb-da-dark-style, normal); text-decoration: var(--arb-da-dark-decoration, none); }
  a-dd { color: var(--arb-dd-dark); font-weight: var(--arb-dd-dark-weight, normal); font-style: var(--arb-dd-dark-style, normal); text-decoration: var(--arb-dd-dark-decoration, none); }
  a-n { color: var(--arb-n-dark); font-weight: var(--arb-n-dark-weight, normal); font-style: var(--arb-n-dark-style, normal); text-decoration: var(--arb-n-dark-decoration, none); }
  a-tl { color: var(--arb-tl-dark); font-weight: var(--arb-tl-dark-weight, normal); font-style: var(--arb-tl-dark-style, normal); text-decoration: var(--arb-tl-dark-decoration, none); }
  a-em { color: var(--arb-em-dark); font-weight: var(--arb-em-dark-weight, normal); font-style: var(--arb-em-dark-style, normal); text-decoration: var(--arb-em-dark-decoration, none); }
  a-st { color: var(--arb-st-dark); font-weight: var(--arb-st-dark-weight, normal); font-style: var(--arb-st-dark-style, normal); text-decoration: var(--arb-st-dark-decoration, none); }
  a-tu { color: var(--arb-tu-dark); font-weight: var(--arb-tu-dark-weight, normal); font-style: var(--arb-tu-dark-style, normal); text-decoration: var(--arb-tu-dark-decoration, none); }
  a-tr { color: var(--arb-tr-dark); font-weight: var(--arb-tr-dark-weight, normal); font-style: var(--arb-tr-dark-style, normal); text-decoration: var(--arb-tr-dark-decoration, none); }
  a-se { color: var(--arb-se-dark); font-weight: var(--arb-se-dark-weight, normal); font-style: var(--arb-se-dark-style, normal); text-decoration: var(--arb-se-dark-decoration, none); }
  a-tt { color: var(--arb-tt-dark); font-weight: var(--arb-tt-dark-weight, normal); font-style: var(--arb-tt-dark-style, normal); text-decoration: var(--arb-tt-dark-decoration, none); }
  a-tx { color: var(--arb-tx-dark); font-weight: var(--arb-tx-dark-weight, normal); font-style: var(--arb-tx-dark-style, normal); text-decoration: var(--arb-tx-dark-decoration, none); }
  a-sp { color: var(--arb-sp-dark); font-weight: var(--arb-sp-dark-weight, normal); font-style: var(--arb-sp-dark-style, normal); text-decoration: var(--arb-sp-dark-decoration, none); }
  a-eb { color: var(--arb-eb-dark); font-weight: var(--arb-eb-dark-weight, normal); font-style: var(--arb-eb-dark-style, normal); text-decoration: var(--arb-eb-dark-decoration, none); }
  a-er { color: var(--arb-er-dark); font-weight: var(--arb-er-dark-weight, normal); font-style: var(--arb-er-dark-style, normal); text-decoration: var(--arb-er-dark-decoration, none); }
  a-ns { color: var(--arb-ns-dark); font-weight: var(--arb-ns-dark-weight, normal); font-style: var(--arb-ns-dark-style, normal); text-decoration: var(--arb-ns-dark-decoration, none); }
  a-in { color: var(--arb-in-dark); font-weight: var(--arb-in-dark-weight, normal); font-style: var(--arb-in-dark-style, normal); text-decoration: var(--arb-in-dark-decoration, none); }
  a-sc { color: var(--arb-sc-dark); font-weight: var(--arb-sc-dark-weight, normal); font-style: var(--arb-sc-dark-style, normal); text-decoration: var(--arb-sc-dark-decoration, none); }
  a-rp { color: var(--arb-rp-dark); font-weight: var(--arb-rp-dark-weight, normal); font-style: var(--arb-rp-dark-style, normal); text-decoration: var(--arb-rp-dark-decoration, none); }
  a-cn { color: var(--arb-cn-dark); font-weight: var(--arb-cn-dark-weight, normal); font-style: var(--arb-cn-dark-style, normal); text-decoration: var(--arb-cn-dark-decoration, none); }
  a-ex { color: var(--arb-ex-dark); font-weight: var(--arb-ex-dark-weight, normal); font-style: var(--arb-ex-dark-style, normal); text-decoration: var(--arb-ex-dark-decoration, none); }
  a-pp { color: var(--arb-pp-dark); font-weight: var(--arb-pp-dark-weight, normal); font-style: var(--arb-pp-dark-style, normal); text-decoration: var(--arb-pp-dark-decoration, none); }
  a-ch { color: var(--arb-ch-dark); font-weight: var(--arb-ch-dark-weight, normal); font-style: var(--arb-ch-dark-style, normal); text-decoration: var(--arb-ch-dark-decoration, none); }
  a-cs { color: var(--arb-cs-dark); font-weight: var(--arb-cs-dark-weight, normal); font-style: var(--arb-cs-dark-style, normal); text-decoration: var(--arb-cs-dark-decoration, none); }
  a-vm { color: var(--arb-vm-dark); font-weight: var(--arb-vm-dark-weight, normal); font-style: var(--arb-vm-dark-style, normal); text-decoration: var(--arb-vm-dark-decoration, none); }
  a-fd { color: var(--arb-fd-dark); font-weight: var(--arb-fd-dark-weight, normal); font-style: var(--arb-fd-dark-style, normal); text-decoration: var(--arb-fd-dark-decoration, none); }
  a-tf { color: var(--arb-tf-dark); font-weight: var(--arb-tf-dark-weight, normal); font-style: var(--arb-tf-dark-style, normal); text-decoration: var(--arb-tf-dark-decoration, none); }
  a-fc { color: var(--arb-fc-dark); font-weight: var(--arb-fc-dark-weight, normal); font-style: var(--arb-fc-dark-style, normal); text-decoration: var(--arb-fc-dark-decoration, none); }
  a-km { color: var(--arb-km-dark); font-weight: var(--arb-km-dark-weight, normal); font-style: var(--arb-km-dark-style, normal); text-decoration: var(--arb-km-dark-decoration, none); }
  a-dr { color: var(--arb-dr-dark); font-weight: var(--arb-dr-dark-weight, normal); font-style: var(--arb-dr-dark-style, normal); text-decoration: var(--arb-dr-dark-decoration, none); }
  a-rx { color: var(--arb-rx-dark); font-weight: var(--arb-rx-dark-weight, normal); font-style: var(--arb-rx-dark-style, normal); text-decoration: var(--arb-rx-dark-decoration, none); }
}

/* Explicit light mode */
:host[data-theme="light"] {
  a-at { color: var(--arb-at-light); font-weight: var(--arb-at-light-weight, normal); font-style: var(--arb-at-light-style, normal); text-decoration: var(--arb-at-light-decoration, none); }
  a-co { color: var(--arb-co-light); font-weight: var(--arb-co-light-weight, normal); font-style: var(--arb-co-light-style, normal); text-decoration: var(--arb-co-light-decoration, none); }
  a-cb { color: var(--arb-cb-light); font-weight: var(--arb-cb-light-weight, normal); font-style: var(--arb-cb-light-style, normal); text-decoration: var(--arb-cb-light-decoration, none); }
  a-cr { color: var(--arb-cr-light); font-weight: var(--arb-cr-light-weight, normal); font-style: var(--arb-cr-light-style, normal); text-decoration: var(--arb-cr-light-decoration, none); }
  a-fb { color: var(--arb-fb-light); font-weight: var(--arb-fb-light-weight, normal); font-style: var(--arb-fb-light-style, normal); text-decoration: var(--arb-fb-light-decoration, none); }
  a-f { color: var(--arb-f-light); font-weight: var(--arb-f-light-weight, normal); font-style: var(--arb-f-light-style, normal); text-decoration: var(--arb-f-light-decoration, none); }
  a-fm { color: var(--arb-fm-light); font-weight: var(--arb-fm-light-weight, normal); font-style: var(--arb-fm-light-style, normal); text-decoration: var(--arb-fm-light-decoration, none); }
  a-k { color: var(--arb-k-light); font-weight: var(--arb-k-light-weight, normal); font-style: var(--arb-k-light-style, normal); text-decoration: var(--arb-k-light-decoration, none); }
  a-kc { color: var(--arb-kc-light); font-weight: var(--arb-kc-light-weight, normal); font-style: var(--arb-kc-light-style, normal); text-decoration: var(--arb-kc-light-decoration, none); }
  a-ko { color: var(--arb-ko-light); font-weight: var(--arb-ko-light-weight, normal); font-style: var(--arb-ko-light-style, normal); text-decoration: var(--arb-ko-light-decoration, none); }
  a-kd { color: var(--arb-kd-light); font-weight: var(--arb-kd-light-weight, normal); font-style: var(--arb-kd-light-style, normal); text-decoration: var(--arb-kd-light-decoration, none); }
  a-ke { color: var(--arb-ke-light); font-weight: var(--arb-ke-light-weight, normal); font-style: var(--arb-ke-light-style, normal); text-decoration: var(--arb-ke-light-decoration, none); }
  a-kf { color: var(--arb-kf-light); font-weight: var(--arb-kf-light-weight, normal); font-style: var(--arb-kf-light-style, normal); text-decoration: var(--arb-kf-light-decoration, none); }
  a-ki { color: var(--arb-ki-light); font-weight: var(--arb-ki-light-weight, normal); font-style: var(--arb-ki-light-style, normal); text-decoration: var(--arb-ki-light-decoration, none); }
  a-kp { color: var(--arb-kp-light); font-weight: var(--arb-kp-light-weight, normal); font-style: var(--arb-kp-light-style, normal); text-decoration: var(--arb-kp-light-decoration, none); }
  a-kr { color: var(--arb-kr-light); font-weight: var(--arb-kr-light-weight, normal); font-style: var(--arb-kr-light-style, normal); text-decoration: var(--arb-kr-light-decoration, none); }
  a-kt { color: var(--arb-kt-light); font-weight: var(--arb-kt-light-weight, normal); font-style: var(--arb-kt-light-style, normal); text-decoration: var(--arb-kt-light-decoration, none); }
  a-ky { color: var(--arb-ky-light); font-weight: var(--arb-ky-light-weight, normal); font-style: var(--arb-ky-light-style, normal); text-decoration: var(--arb-ky-light-decoration, none); }
  a-o { color: var(--arb-o-light); font-weight: var(--arb-o-light-weight, normal); font-style: var(--arb-o-light-style, normal); text-decoration: var(--arb-o-light-decoration, none); }
  a-pr { color: var(--arb-pr-light); font-weight: var(--arb-pr-light-weight, normal); font-style: var(--arb-pr-light-style, normal); text-decoration: var(--arb-pr-light-decoration, none); }
  a-p { color: var(--arb-p-light); font-weight: var(--arb-p-light-weight, normal); font-style: var(--arb-p-light-style, normal); text-decoration: var(--arb-p-light-decoration, none); }
  a-pb { color: var(--arb-pb-light); font-weight: var(--arb-pb-light-weight, normal); font-style: var(--arb-pb-light-style, normal); text-decoration: var(--arb-pb-light-decoration, none); }
  a-pd { color: var(--arb-pd-light); font-weight: var(--arb-pd-light-weight, normal); font-style: var(--arb-pd-light-style, normal); text-decoration: var(--arb-pd-light-decoration, none); }
  a-ps { color: var(--arb-ps-light); font-weight: var(--arb-ps-light-weight, normal); font-style: var(--arb-ps-light-style, normal); text-decoration: var(--arb-ps-light-decoration, none); }
  a-s { color: var(--arb-s-light); font-weight: var(--arb-s-light-weight, normal); font-style: var(--arb-s-light-style, normal); text-decoration: var(--arb-s-light-decoration, none); }
  a-ss { color: var(--arb-ss-light); font-weight: var(--arb-ss-light-weight, normal); font-style: var(--arb-ss-light-style, normal); text-decoration: var(--arb-ss-light-decoration, none); }
  a-tg { color: var(--arb-tg-light); font-weight: var(--arb-tg-light-weight, normal); font-style: var(--arb-tg-light-style, normal); text-decoration: var(--arb-tg-light-decoration, none); }
  a-td { color: var(--arb-td-light); font-weight: var(--arb-td-light-weight, normal); font-style: var(--arb-td-light-style, normal); text-decoration: var(--arb-td-light-decoration, none); }
  a-te { color: var(--arb-te-light); font-weight: var(--arb-te-light-weight, normal); font-style: var(--arb-te-light-style, normal); text-decoration: var(--arb-te-light-decoration, none); }
  a-t { color: var(--arb-t-light); font-weight: var(--arb-t-light-weight, normal); font-style: var(--arb-t-light-style, normal); text-decoration: var(--arb-t-light-decoration, none); }
  a-tb { color: var(--arb-tb-light); font-weight: var(--arb-tb-light-weight, normal); font-style: var(--arb-tb-light-style, normal); text-decoration: var(--arb-tb-light-decoration, none); }
  a-tq { color: var(--arb-tq-light); font-weight: var(--arb-tq-light-weight, normal); font-style: var(--arb-tq-light-style, normal); text-decoration: var(--arb-tq-light-decoration, none); }
  a-v { color: var(--arb-v-light); font-weight: var(--arb-v-light-weight, normal); font-style: var(--arb-v-light-style, normal); text-decoration: var(--arb-v-light-decoration, none); }
  a-vb { color: var(--arb-vb-light); font-weight: var(--arb-vb-light-weight, normal); font-style: var(--arb-vb-light-style, normal); text-decoration: var(--arb-vb-light-decoration, none); }
  a-vp { color: var(--arb-vp-light); font-weight: var(--arb-vp-light-weight, normal); font-style: var(--arb-vp-light-style, normal); text-decoration: var(--arb-vp-light-decoration, none); }
  a-c { color: var(--arb-c-light); font-weight: var(--arb-c-light-weight, normal); font-style: var(--arb-c-light-style, normal); text-decoration: var(--arb-c-light-decoration, none); }
  a-cd { color: var(--arb-cd-light); font-weight: var(--arb-cd-light-weight, normal); font-style: var(--arb-cd-light-style, normal); text-decoration: var(--arb-cd-light-decoration, none); }
  a-m { color: var(--arb-m-light); font-weight: var(--arb-m-light-weight, normal); font-style: var(--arb-m-light-style, normal); text-decoration: var(--arb-m-light-decoration, none); }
  a-l { color: var(--arb-l-light); font-weight: var(--arb-l-light-weight, normal); font-style: var(--arb-l-light-style, normal); text-decoration: var(--arb-l-light-decoration, none); }
  a-da { color: var(--arb-da-light); font-weight: var(--arb-da-light-weight, normal); font-style: var(--arb-da-light-style, normal); text-decoration: var(--arb-da-light-decoration, none); }
  a-dd { color: var(--arb-dd-light); font-weight: var(--arb-dd-light-weight, normal); font-style: var(--arb-dd-light-style, normal); text-decoration: var(--arb-dd-light-decoration, none); }
  a-n { color: var(--arb-n-light); font-weight: var(--arb-n-light-weight, normal); font-style: var(--arb-n-light-style, normal); text-decoration: var(--arb-n-light-decoration, none); }
  a-tl { color: var(--arb-tl-light); font-weight: var(--arb-tl-light-weight, normal); font-style: var(--arb-tl-light-style, normal); text-decoration: var(--arb-tl-light-decoration, none); }
  a-em { color: var(--arb-em-light); font-weight: var(--arb-em-light-weight, normal); font-style: var(--arb-em-light-style, normal); text-decoration: var(--arb-em-light-decoration, none); }
  a-st { color: var(--arb-st-light); font-weight: var(--arb-st-light-weight, normal); font-style: var(--arb-st-light-style, normal); text-decoration: var(--arb-st-light-decoration, none); }
  a-tu { color: var(--arb-tu-light); font-weight: var(--arb-tu-light-weight, normal); font-style: var(--arb-tu-light-style, normal); text-decoration: var(--arb-tu-light-decoration, none); }
  a-tr { color: var(--arb-tr-light); font-weight: var(--arb-tr-light-weight, normal); font-style: var(--arb-tr-light-style, normal); text-decoration: var(--arb-tr-light-decoration, none); }
  a-se { color: var(--arb-se-light); font-weight: var(--arb-se-light-weight, normal); font-style: var(--arb-se-light-style, normal); text-decoration: var(--arb-se-light-decoration, none); }
  a-tt { color: var(--arb-tt-light); font-weight: var(--arb-tt-light-weight, normal); font-style: var(--arb-tt-light-style, normal); text-decoration: var(--arb-tt-light-decoration, none); }
  a-tx { color: var(--arb-tx-light); font-weight: var(--arb-tx-light-weight, normal); font-style: var(--arb-tx-light-style, normal); text-decoration: var(--arb-tx-light-decoration, none); }
  a-sp { color: var(--arb-sp-light); font-weight: var(--arb-sp-light-weight, normal); font-style: var(--arb-sp-light-style, normal); text-decoration: var(--arb-sp-light-decoration, none); }
  a-eb { color: var(--arb-eb-light); font-weight: var(--arb-eb-light-weight, normal); font-style: var(--arb-eb-light-style, normal); text-decoration: var(--arb-eb-light-decoration, none); }
  a-er { color: var(--arb-er-light); font-weight: var(--arb-er-light-weight, normal); font-style: var(--arb-er-light-style, normal); text-decoration: var(--arb-er-light-decoration, none); }
  a-ns { color: var(--arb-ns-light); font-weight: var(--arb-ns-light-weight, normal); font-style: var(--arb-ns-light-style, normal); text-decoration: var(--arb-ns-light-decoration, none); }
  a-in { color: var(--arb-in-light); font-weight: var(--arb-in-light-weight, normal); font-style: var(--arb-in-light-style, normal); text-decoration: var(--arb-in-light-decoration, none); }
  a-sc { color: var(--arb-sc-light); font-weight: var(--arb-sc-light-weight, normal); font-style: var(--arb-sc-light-style, normal); text-decoration: var(--arb-sc-light-decoration, none); }
  a-rp { color: var(--arb-rp-light); font-weight: var(--arb-rp-light-weight, normal); font-style: var(--arb-rp-light-style, normal); text-decoration: var(--arb-rp-light-decoration, none); }
  a-cn { color: var(--arb-cn-light); font-weight: var(--arb-cn-light-weight, normal); font-style: var(--arb-cn-light-style, normal); text-decoration: var(--arb-cn-light-decoration, none); }
  a-ex { color: var(--arb-ex-light); font-weight: var(--arb-ex-light-weight, normal); font-style: var(--arb-ex-light-style, normal); text-decoration: var(--arb-ex-light-decoration, none); }
  a-pp { color: var(--arb-pp-light); font-weight: var(--arb-pp-light-weight, normal); font-style: var(--arb-pp-light-style, normal); text-decoration: var(--arb-pp-light-decoration, none); }
  a-ch { color: var(--arb-ch-light); font-weight: var(--arb-ch-light-weight, normal); font-style: var(--arb-ch-light-style, normal); text-decoration: var(--arb-ch-light-decoration, none); }
  a-cs { color: var(--arb-cs-light); font-weight: var(--arb-cs-light-weight, normal); font-style: var(--arb-cs-light-style, normal); text-decoration: var(--arb-cs-light-decoration, none); }
  a-vm { color: var(--arb-vm-light); font-weight: var(--arb-vm-light-weight, normal); font-style: var(--arb-vm-light-style, normal); text-decoration: var(--arb-vm-light-decoration, none); }
  a-fd { color: var(--arb-fd-light); font-weight: var(--arb-fd-light-weight, normal); font-style: var(--arb-fd-light-style, normal); text-decoration: var(--arb-fd-light-decoration, none); }
  a-tf { color: var(--arb-tf-light); font-weight: var(--arb-tf-light-weight, normal); font-style: var(--arb-tf-light-style, normal); text-decoration: var(--arb-tf-light-decoration, none); }
  a-fc { color: var(--arb-fc-light); font-weight: var(--arb-fc-light-weight, normal); font-style: var(--arb-fc-light-style, normal); text-decoration: var(--arb-fc-light-decoration, none); }
  a-km { color: var(--arb-km-light); font-weight: var(--arb-km-light-weight, normal); font-style: var(--arb-km-light-style, normal); text-decoration: var(--arb-km-light-decoration, none); }
  a-dr { color: var(--arb-dr-light); font-weight: var(--arb-dr-light-weight, normal); font-style: var(--arb-dr-light-style, normal); text-decoration: var(--arb-dr-light-decoration, none); }
  a-rx { color: var(--arb-rx-light); font-weight: var(--arb-rx-light-weight, normal); font-style: var(--arb-rx-light-style, normal); text-decoration: var(--arb-rx-light-decoration, none); }
}

/* Explicit dark mode */
:host[data-theme="dark"] {
  a-at { color: var(--arb-at-dark); font-weight: var(--arb-at-dark-weight, normal); font-style: var(--arb-at-dark-style, normal); text-decoration: var(--arb-at-dark-decoration, none); }
  a-co { color: var(--arb-co-dark); font-weight: var(--arb-co-dark-weight, normal); font-style: var(--arb-co-dark-style, normal); text-decoration: var(--arb-co-dark-decoration, none); }
  a-cb { color: var(--arb-cb-dark); font-weight: var(--arb-cb-dark-weight, normal); font-style: var(--arb-cb-dark-style, normal); text-decoration: var(--arb-cb-dark-decoration, none); }
  a-cr { color: var(--arb-cr-dark); font-weight: var(--arb-cr-dark-weight, normal); font-style: var(--arb-cr-dark-style, normal); text-decoration: var(--arb-cr-dark-decoration, none); }
  a-fb { color: var(--arb-fb-dark); font-weight: var(--arb-fb-dark-weight, normal); font-style: var(--arb-fb-dark-style, normal); text-decoration: var(--arb-fb-dark-decoration, none); }
  a-f { color: var(--arb-f-dark); font-weight: var(--arb-f-dark-weight, normal); font-style: var(--arb-f-dark-style, normal); text-decoration: var(--arb-f-dark-decoration, none); }
  a-fm { color: var(--arb-fm-dark); font-weight: var(--arb-fm-dark-weight, normal); font-style: var(--arb-fm-dark-style, normal); text-decoration: var(--arb-fm-dark-decoration, none); }
  a-k { color: var(--arb-k-dark); font-weight: var(--arb-k-dark-weight, normal); font-style: var(--arb-k-dark-style, normal); text-decoration: var(--arb-k-dark-decoration, none); }
  a-kc { color: var(--arb-kc-dark); font-weight: var(--arb-kc-dark-weight, normal); font-style: var(--arb-kc-dark-style, normal); text-decoration: var(--arb-kc-dark-decoration, none); }
  a-ko { color: var(--arb-ko-dark); font-weight: var(--arb-ko-dark-weight, normal); font-style: var(--arb-ko-dark-style, normal); text-decoration: var(--arb-ko-dark-decoration, none); }
  a-kd { color: var(--arb-kd-dark); font-weight: var(--arb-kd-dark-weight, normal); font-style: var(--arb-kd-dark-style, normal); text-decoration: var(--arb-kd-dark-decoration, none); }
  a-ke { color: var(--arb-ke-dark); font-weight: var(--arb-ke-dark-weight, normal); font-style: var(--arb-ke-dark-style, normal); text-decoration: var(--arb-ke-dark-decoration, none); }
  a-kf { color: var(--arb-kf-dark); font-weight: var(--arb-kf-dark-weight, normal); font-style: var(--arb-kf-dark-style, normal); text-decoration: var(--arb-kf-dark-decoration, none); }
  a-ki { color: var(--arb-ki-dark); font-weight: var(--arb-ki-dark-weight, normal); font-style: var(--arb-ki-dark-style, normal); text-decoration: var(--arb-ki-dark-decoration, none); }
  a-kp { color: var(--arb-kp-dark); font-weight: var(--arb-kp-dark-weight, normal); font-style: var(--arb-kp-dark-style, normal); text-decoration: var(--arb-kp-dark-decoration, none); }
  a-kr { color: var(--arb-kr-dark); font-weight: var(--arb-kr-dark-weight, normal); font-style: var(--arb-kr-dark-style, normal); text-decoration: var(--arb-kr-dark-decoration, none); }
  a-kt { color: var(--arb-kt-dark); font-weight: var(--arb-kt-dark-weight, normal); font-style: var(--arb-kt-dark-style, normal); text-decoration: var(--arb-kt-dark-decoration, none); }
  a-ky { color: var(--arb-ky-dark); font-weight: var(--arb-ky-dark-weight, normal); font-style: var(--arb-ky-dark-style, normal); text-decoration: var(--arb-ky-dark-decoration, none); }
  a-o { color: var(--arb-o-dark); font-weight: var(--arb-o-dark-weight, normal); font-style: var(--arb-o-dark-style, normal); text-decoration: var(--arb-o-dark-decoration, none); }
  a-pr { color: var(--arb-pr-dark); font-weight: var(--arb-pr-dark-weight, normal); font-style: var(--arb-pr-dark-style, normal); text-decoration: var(--arb-pr-dark-decoration, none); }
  a-p { color: var(--arb-p-dark); font-weight: var(--arb-p-dark-weight, normal); font-style: var(--arb-p-dark-style, normal); text-decoration: var(--arb-p-dark-decoration, none); }
  a-pb { color: var(--arb-pb-dark); font-weight: var(--arb-pb-dark-weight, normal); font-style: var(--arb-pb-dark-style, normal); text-decoration: var(--arb-pb-dark-decoration, none); }
  a-pd { color: var(--arb-pd-dark); font-weight: var(--arb-pd-dark-weight, normal); font-style: var(--arb-pd-dark-style, normal); text-decoration: var(--arb-pd-dark-decoration, none); }
  a-ps { color: var(--arb-ps-dark); font-weight: var(--arb-ps-dark-weight, normal); font-style: var(--arb-ps-dark-style, normal); text-decoration: var(--arb-ps-dark-decoration, none); }
  a-s { color: var(--arb-s-dark); font-weight: var(--arb-s-dark-weight, normal); font-style: var(--arb-s-dark-style, normal); text-decoration: var(--arb-s-dark-decoration, none); }
  a-ss { color: var(--arb-ss-dark); font-weight: var(--arb-ss-dark-weight, normal); font-style: var(--arb-ss-dark-style, normal); text-decoration: var(--arb-ss-dark-decoration, none); }
  a-tg { color: var(--arb-tg-dark); font-weight: var(--arb-tg-dark-weight, normal); font-style: var(--arb-tg-dark-style, normal); text-decoration: var(--arb-tg-dark-decoration, none); }
  a-td { color: var(--arb-td-dark); font-weight: var(--arb-td-dark-weight, normal); font-style: var(--arb-td-dark-style, normal); text-decoration: var(--arb-td-dark-decoration, none); }
  a-te { color: var(--arb-te-dark); font-weight: var(--arb-te-dark-weight, normal); font-style: var(--arb-te-dark-style, normal); text-decoration: var(--arb-te-dark-decoration, none); }
  a-t { color: var(--arb-t-dark); font-weight: var(--arb-t-dark-weight, normal); font-style: var(--arb-t-dark-style, normal); text-decoration: var(--arb-t-dark-decoration, none); }
  a-tb { color: var(--arb-tb-dark); font-weight: var(--arb-tb-dark-weight, normal); font-style: var(--arb-tb-dark-style, normal); text-decoration: var(--arb-tb-dark-decoration, none); }
  a-tq { color: var(--arb-tq-dark); font-weight: var(--arb-tq-dark-weight, normal); font-style: var(--arb-tq-dark-style, normal); text-decoration: var(--arb-tq-dark-decoration, none); }
  a-v { color: var(--arb-v-dark); font-weight: var(--arb-v-dark-weight, normal); font-style: var(--arb-v-dark-style, normal); text-decoration: var(--arb-v-dark-decoration, none); }
  a-vb { color: var(--arb-vb-dark); font-weight: var(--arb-vb-dark-weight, normal); font-style: var(--arb-vb-dark-style, normal); text-decoration: var(--arb-vb-dark-decoration, none); }
  a-vp { color: var(--arb-vp-dark); font-weight: var(--arb-vp-dark-weight, normal); font-style: var(--arb-vp-dark-style, normal); text-decoration: var(--arb-vp-dark-decoration, none); }
  a-c { color: var(--arb-c-dark); font-weight: var(--arb-c-dark-weight, normal); font-style: var(--arb-c-dark-style, normal); text-decoration: var(--arb-c-dark-decoration, none); }
  a-cd { color: var(--arb-cd-dark); font-weight: var(--arb-cd-dark-weight, normal); font-style: var(--arb-cd-dark-style, normal); text-decoration: var(--arb-cd-dark-decoration, none); }
  a-m { color: var(--arb-m-dark); font-weight: var(--arb-m-dark-weight, normal); font-style: var(--arb-m-dark-style, normal); text-decoration: var(--arb-m-dark-decoration, none); }
  a-l { color: var(--arb-l-dark); font-weight: var(--arb-l-dark-weight, normal); font-style: var(--arb-l-dark-style, normal); text-decoration: var(--arb-l-dark-decoration, none); }
  a-da { color: var(--arb-da-dark); font-weight: var(--arb-da-dark-weight, normal); font-style: var(--arb-da-dark-style, normal); text-decoration: var(--arb-da-dark-decoration, none); }
  a-dd { color: var(--arb-dd-dark); font-weight: var(--arb-dd-dark-weight, normal); font-style: var(--arb-dd-dark-style, normal); text-decoration: var(--arb-dd-dark-decoration, none); }
  a-n { color: var(--arb-n-dark); font-weight: var(--arb-n-dark-weight, normal); font-style: var(--arb-n-dark-style, normal); text-decoration: var(--arb-n-dark-decoration, none); }
  a-tl { color: var(--arb-tl-dark); font-weight: var(--arb-tl-dark-weight, normal); font-style: var(--arb-tl-dark-style, normal); text-decoration: var(--arb-tl-dark-decoration, none); }
  a-em { color: var(--arb-em-dark); font-weight: var(--arb-em-dark-weight, normal); font-style: var(--arb-em-dark-style, normal); text-decoration: var(--arb-em-dark-decoration, none); }
  a-st { color: var(--arb-st-dark); font-weight: var(--arb-st-dark-weight, normal); font-style: var(--arb-st-dark-style, normal); text-decoration: var(--arb-st-dark-decoration, none); }
  a-tu { color: var(--arb-tu-dark); font-weight: var(--arb-tu-dark-weight, normal); font-style: var(--arb-tu-dark-style, normal); text-decoration: var(--arb-tu-dark-decoration, none); }
  a-tr { color: var(--arb-tr-dark); font-weight: var(--arb-tr-dark-weight, normal); font-style: var(--arb-tr-dark-style, normal); text-decoration: var(--arb-tr-dark-decoration, none); }
  a-se { color: var(--arb-se-dark); font-weight: var(--arb-se-dark-weight, normal); font-style: var(--arb-se-dark-style, normal); text-decoration: var(--arb-se-dark-decoration, none); }
  a-tt { color: var(--arb-tt-dark); font-weight: var(--arb-tt-dark-weight, normal); font-style: var(--arb-tt-dark-style, normal); text-decoration: var(--arb-tt-dark-decoration, none); }
  a-tx { color: var(--arb-tx-dark); font-weight: var(--arb-tx-dark-weight, normal); font-style: var(--arb-tx-dark-style, normal); text-decoration: var(--arb-tx-dark-decoration, none); }
  a-sp { color: var(--arb-sp-dark); font-weight: var(--arb-sp-dark-weight, normal); font-style: var(--arb-sp-dark-style, normal); text-decoration: var(--arb-sp-dark-decoration, none); }
  a-eb { color: var(--arb-eb-dark); font-weight: var(--arb-eb-dark-weight, normal); font-style: var(--arb-eb-dark-style, normal); text-decoration: var(--arb-eb-dark-decoration, none); }
  a-er { color: var(--arb-er-dark); font-weight: var(--arb-er-dark-weight, normal); font-style: var(--arb-er-dark-style, normal); text-decoration: var(--arb-er-dark-decoration, none); }
  a-ns { color: var(--arb-ns-dark); font-weight: var(--arb-ns-dark-weight, normal); font-style: var(--arb-ns-dark-style, normal); text-decoration: var(--arb-ns-dark-decoration, none); }
  a-in { color: var(--arb-in-dark); font-weight: var(--arb-in-dark-weight, normal); font-style: var(--arb-in-dark-style, normal); text-decoration: var(--arb-in-dark-decoration, none); }
  a-sc { color: var(--arb-sc-dark); font-weight: var(--arb-sc-dark-weight, normal); font-style: var(--arb-sc-dark-style, normal); text-decoration: var(--arb-sc-dark-decoration, none); }
  a-rp { color: var(--arb-rp-dark); font-weight: var(--arb-rp-dark-weight, normal); font-style: var(--arb-rp-dark-style, normal); text-decoration: var(--arb-rp-dark-decoration, none); }
  a-cn { color: var(--arb-cn-dark); font-weight: var(--arb-cn-dark-weight, normal); font-style: var(--arb-cn-dark-style, normal); text-decoration: var(--arb-cn-dark-decoration, none); }
  a-ex { color: var(--arb-ex-dark); font-weight: var(--arb-ex-dark-weight, normal); font-style: var(--arb-ex-dark-style, normal); text-decoration: var(--arb-ex-dark-decoration, none); }
  a-pp { color: var(--arb-pp-dark); font-weight: var(--arb-pp-dark-weight, normal); font-style: var(--arb-pp-dark-style, normal); text-decoration: var(--arb-pp-dark-decoration, none); }
  a-ch { color: var(--arb-ch-dark); font-weight: var(--arb-ch-dark-weight, normal); font-style: var(--arb-ch-dark-style, normal); text-decoration: var(--arb-ch-dark-decoration, none); }
  a-cs { color: var(--arb-cs-dark); font-weight: var(--arb-cs-dark-weight, normal); font-style: var(--arb-cs-dark-style, normal); text-decoration: var(--arb-cs-dark-decoration, none); }
  a-vm { color: var(--arb-vm-dark); font-weight: var(--arb-vm-dark-weight, normal); font-style: var(--arb-vm-dark-style, normal); text-decoration: var(--arb-vm-dark-decoration, none); }
  a-fd { color: var(--arb-fd-dark); font-weight: var(--arb-fd-dark-weight, normal); font-style: var(--arb-fd-dark-style, normal); text-decoration: var(--arb-fd-dark-decoration, none); }
  a-tf { color: var(--arb-tf-dark); font-weight: var(--arb-tf-dark-weight, normal); font-style: var(--arb-tf-dark-style, normal); text-decoration: var(--arb-tf-dark-decoration, none); }
  a-fc { color: var(--arb-fc-dark); font-weight: var(--arb-fc-dark-weight, normal); font-style: var(--arb-fc-dark-style, normal); text-decoration: var(--arb-fc-dark-decoration, none); }
  a-km { color: var(--arb-km-dark); font-weight: var(--arb-km-dark-weight, normal); font-style: var(--arb-km-dark-style, normal); text-decoration: var(--arb-km-dark-decoration, none); }
  a-dr { color: var(--arb-dr-dark); font-weight: var(--arb-dr-dark-weight, normal); font-style: var(--arb-dr-dark-style, normal); text-decoration: var(--arb-dr-dark-decoration, none); }
  a-rx { color: var(--arb-rx-dark); font-weight: var(--arb-rx-dark-weight, normal); font-style: var(--arb-rx-dark-style, normal); text-decoration: var(--arb-rx-dark-decoration, none); }
}
/* GitHub Light theme (light) - generated from TOML */
/* Source: https://github.com/primer/github-vscode-theme */
/* Defines --arb-*-light variables */

:host {
  --arb-bg-light: #ffffff;
  --arb-fg-light: #1f2328;
  --arb-at-light: #0550ae;
  --arb-co-light: #0550ae;
  --arb-cb-light: #0550ae;
  --arb-fb-light: #8250df;
  --arb-f-light: #8250df;
  --arb-fm-light: #8250df;
  --arb-k-light: #cf222e;
  --arb-kc-light: #cf222e;
  --arb-ko-light: #cf222e;
  --arb-kd-light: #cf222e;
  --arb-ke-light: #cf222e;
  --arb-kf-light: #cf222e;
  --arb-ki-light: #cf222e;
  --arb-kp-light: #cf222e;
  --arb-kr-light: #cf222e;
  --arb-kt-light: #cf222e;
  --arb-ky-light: #cf222e;
  --arb-o-light: #cf222e;
  --arb-pr-light: #0550ae;
  --arb-p-light: #1f2328;
  --arb-pb-light: #1f2328;
  --arb-pd-light: #1f2328;
  --arb-ps-light: #0550ae;
  --arb-s-light: #0a3069;
  --arb-ss-light: #cf222e;
  --arb-tg-light: #116329;
  --arb-td-light: #116329;
  --arb-te-light: #116329;
  --arb-t-light: #953800;
  --arb-tb-light: #953800;
  --arb-tq-light: #953800;
  --arb-v-light: #1f2328;
  --arb-vb-light: #953800;
  --arb-vp-light: #953800;
  --arb-c-light: #6e7781;
  --arb-cd-light: #6e7781;
  --arb-m-light: #0550ae;
  --arb-l-light: #8250df;
  --arb-n-light: #0550ae;
  --arb-tl-light: #1f2328;
  --arb-em-light-style: italic;
  --arb-st-light-weight: bold;
  --arb-tu-light: #0969da;
  --arb-tu-light-decoration: underline;
  --arb-tr-light: #8250df;
  --arb-se-light: #0550ae;
  --arb-tt-light: #8250df;
  --arb-tt-light-weight: bold;
  --arb-tx-light-decoration: line-through;
  --arb-sp-light: #1f2328;
  --arb-in-light: #cf222e;
  --arb-sc-light: #cf222e;
  --arb-rp-light: #cf222e;
  --arb-cn-light: #cf222e;
  --arb-ex-light: #cf222e;
  --arb-pp-light: #cf222e;
  --arb-ch-light: #0a3069;
  --arb-cs-light: #0a3069;
  --arb-vm-light: #1f2328;
  --arb-fd-light: #8250df;
  --arb-tf-light: #953800;
  --arb-fc-light: #8250df;
  --arb-km-light: #cf222e;
  --arb-dr-light: #cf222e;
  --arb-rx-light: #0a3069;
}
/* GitHub Dark theme (dark) - generated from TOML */
/* Source: https://github.com/primer/github-vscode-theme */
/* Defines --arb-*-dark variables */

:host {
  --arb-bg-dark: #0d1117;
  --arb-fg-dark: #e6edf3;
  --arb-at-dark: #79c0ff;
  --arb-co-dark: #79c0ff;
  --arb-cb-dark: #79c0ff;
  --arb-fb-dark: #d2a8ff;
  --arb-f-dark: #d2a8ff;
  --arb-fm-dark: #d2a8ff;
  --arb-k-dark: #ff7b72;
  --arb-kc-dark: #ff7b72;
  --arb-ko-dark: #ff7b72;
  --arb-kd-dark: #ff7b72;
  --arb-ke-dark: #ff7b72;
  --arb-kf-dark: #ff7b72;
  --arb-ki-dark: #ff7b72;
  --arb-kp-dark: #ff7b72;
  --arb-kr-dark: #ff7b72;
  --arb-kt-dark: #ff7b72;
  --arb-ky-dark: #ff7b72;
  --arb-o-dark: #ff7b72;
  --arb-pr-dark: #79c0ff;
  --arb-p-dark: #e6edf3;
  --arb-pb-dark: #e6edf3;
  --arb-pd-dark: #e6edf3;
  --arb-ps-dark: #79c0ff;
  --arb-s-dark: #a5d6ff;
  --arb-ss-dark: #ff7b72;
  --arb-tg-dark: #7ee787;
  --arb-td-dark: #7ee787;
  --arb-te-dark: #7ee787;
  --arb-t-dark: #ffa657;
  --arb-tb-dark: #ffa657;
  --arb-tq-dark: #ffa657;
  --arb-v-dark: #e6edf3;
  --arb-vb-dark: #ffa657;
  --arb-vp-dark: #ffa657;
  --arb-c-dark: #8b949e;
  --arb-cd-dark: #8b949e;
  --arb-m-dark: #79c0ff;
  --arb-l-dark: #d2a8ff;
  --arb-n-dark: #79c0ff;
  --arb-tl-dark: #e6edf3;
  --arb-em-dark-style: italic;
  --arb-st-dark-weight: bold;
  --arb-tu-dark: #58a6ff;
  --arb-tu-dark-decoration: underline;
  --arb-tr-dark: #d2a8ff;
  --arb-se-dark: #79c0ff;
  --arb-tt-dark: #d2a8ff;
  --arb-tt-dark-weight: bold;
  --arb-tx-dark-decoration: line-through;
  --arb-sp-dark: #e6edf3;
  --arb-in-dark: #ff7b72;
  --arb-sc-dark: #ff7b72;
  --arb-rp-dark: #ff7b72;
  --arb-cn-dark: #ff7b72;
  --arb-ex-dark: #ff7b72;
  --arb-pp-dark: #ff7b72;
  --arb-ch-dark: #a5d6ff;
  --arb-cs-dark: #a5d6ff;
  --arb-vm-dark: #e6edf3;
  --arb-fd-dark: #d2a8ff;
  --arb-tf-dark: #ffa657;
  --arb-fc-dark: #d2a8ff;
  --arb-km-dark: #ff7b72;
  --arb-dr-dark: #ff7b72;
  --arb-rx-dark: #a5d6ff;
}
`;var J=class extends b{render(){return this.start!=null&&this.end!=null?g`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:g`${this.text}`}};J.styles=m`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,d([u()],J.prototype,"text",2),d([u({type:Number})],J.prototype,"start",2),d([u({type:Number})],J.prototype,"end",2),J=d([_("match-str")],J);var N=class extends b{render(){return g`<div class="filename-match">
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
    `,d([u()],N.prototype,"text",2),d([u()],N.prototype,"href",2),d([u({type:Number})],N.prototype,"start",2),d([u({type:Number})],N.prototype,"end",2),d([u()],N.prototype,"repo",2),d([u()],N.prototype,"version",2),N=d([_("filename-match")],N);var U=class extends b{render(){let t=this.start!=null&&this.end!=null;return g`<a class=${dr({"lno-link":!0,matchlno:t})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${dr({matchline:t})}
                >${t?g`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.highlightedHTML?Ee(this.highlightedHTML):this.text}</span
            >`}};U.styles=[lt(Ce),m`
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
    `],d([u({type:Number})],U.prototype,"lineNo",2),d([u()],U.prototype,"text",2),d([u()],U.prototype,"href",2),d([u({type:Number})],U.prototype,"start",2),d([u({type:Number})],U.prototype,"end",2),d([u()],U.prototype,"highlightedHTML",2),U=d([_("match-line")],U);function No(r){let t=r.lastIndexOf("/");return t<0?".":r.slice(0,t)}function Uo(r){let t=r.lastIndexOf("/");return t<0?r:r.slice(t+1)}var Y=class extends b{constructor(){super(...arguments);this.noContext=!1;this.highlightedMap=new Map}willUpdate(e){if(e.has("result")&&this.result){this.highlightedMap=new Map;let a=[];for(let n of this.result.lines)n!==null&&a.push({lno:n[0],text:n[1]});if(a.length===0)return;let o=a.map(n=>n.text).join(`
`),{filePath:i}=rt(this.result.path);$e(i,o).then(n=>{if(!n)return;let l=new Map;for(let s=0;s<a.length&&s<n.length;s++)l.set(a[s].lno,n[s]);this.highlightedMap=l})}}render(){let{repo:e,version:a,filePath:o}=rt(this.result.path),i=`/view/${this.result.path}`,n=this.splitGroups(this.result.lines),l=a.length>6?a.slice(0,6):a,s=No(o),h=Uo(o);return g`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${i}>
              <span class="repo">${e}:</span><span class="version">${l}:</span>${s}/<span class="filename">${h}</span>
            </a>
          </span>
        </div>
        ${n.map(p=>g`
            <div class="match">
              <div class="contents">
                ${p.map(c=>{let y=c[0],f=c[1],v=c.length>2?c[2]:void 0,C=v!==void 0&&v.length>0,D=`${i}#L${y}`,L=this.highlightedMap.get(y);if(!C&&L)return g`
                      <match-line
                        class="context"
                        .lineNo=${y}
                        text=${f}
                        href=${D}
                        .highlightedHTML=${L}
                      ></match-line>
                    `;let Ae=C&&v?v[0][0]:void 0,Te=C&&v?v[0][1]:void 0;return g`
                    <match-line
                      class=${C?"match-hit":"context"}
                      .lineNo=${y}
                      text=${f}
                      href=${D}
                      .start=${Ae}
                      .end=${Te}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(e){let a=[],o=[];for(let i of e)i===null?o.length>0&&(a.push(o),o=[]):o.push(i);return o.length>0&&a.push(o),a}};Y.styles=[Br,H,m`
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
    `],d([u({type:Object})],Y.prototype,"result",2),d([u({type:Boolean,reflect:!0,attribute:"no-context"})],Y.prototype,"noContext",2),d([A()],Y.prototype,"highlightedMap",2),Y=d([_("cs-result-group")],Y);var G=class extends b{constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return g`<div id="countarea">Searching...</div>`;let e=this.truncated?`${this.total}+`:`${this.total}`;return g`
      <div id="countarea">
        <span id="numresults">${e}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};G.styles=[ft,m`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],d([u({type:Number})],G.prototype,"total",2),d([u({type:Number})],G.prototype,"timeMs",2),d([u({type:Boolean})],G.prototype,"truncated",2),d([u({type:Boolean})],G.prototype,"loading",2),G=d([_("cs-result-stats")],G);var nt=class extends b{constructor(){super(...arguments);this.facets=null;this.selected={}}render(){let e=this.facets&&(this.facets.ext?.length||this.facets.repo?.length||this.facets.path?.length),a=Object.values(this.selected).some(n=>n.size>0);if(!e&&!a)return w;let i=[{label:"Extension",key:"f.ext",buckets:this.facets?.ext??[]},{label:"Repository",key:"f.repo",buckets:this.facets?.repo??[]},{label:"Path",key:"f.path",buckets:this.facets?.path??[]}].filter(n=>n.buckets.length>0||(this.selected[n.key]?.size??0)>0);return i.length===0?w:g`
      <div class="panel">
        ${i.map(n=>this.renderSection(n.label,n.key,n.buckets))}
      </div>
    `}renderSection(e,a,o){let i=this.selected[a]??new Set,l=[...o].sort((p,c)=>c.c-p.c||p.v.localeCompare(c.v)).slice(0,10),s=new Set(l.map(p=>p.v)),h=[...i].filter(p=>!s.has(p));return g`
      <div class="section">
        <span class="section-label">${e}</span>
        ${h.map(p=>g`
          <button
            class="pill stale"
            @click=${()=>this.toggle(a,p)}
          >${p}</button>
        `)}
        ${l.map(p=>g`
          <button
            class=${i.has(p.v)?"pill active":"pill"}
            @click=${()=>this.toggle(a,p.v)}
          >${p.v} <span class="count">${p.c}</span></button>
        `)}
      </div>
    `}toggle(e,a){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:e,value:a},bubbles:!0,composed:!0}))}};nt.styles=m`
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
  `,d([u({type:Object})],nt.prototype,"facets",2),d([u({type:Object})],nt.prototype,"selected",2),nt=d([_("cs-facet-panel")],nt);var qt=class extends b{render(){return g`
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
    `}};qt.styles=[H,m`
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
    `],qt=d([_("cs-search-help")],qt);function Do(r,t,e){let a=r[t]??new Set,o;return t==="f.path"?o=a.has(e)?new Set:new Set([e]):(o=new Set(a),o.has(e)?o.delete(e):o.add(e)),{...r,[t]:o}}function jo(r){let t={};for(let[e,a]of Object.entries(r))a.size>0&&(t[e]=[...a]);return t}function qo(r){let t={};for(let e of["f.ext","f.repo","f.path"]){let a=r.getAll(e);a.length>0&&(t[e]=new Set(a))}return t}var Ht=class extends Et(b){constructor(){super(...arguments);this.currentOptions={}}get activeFacets(){return qo(I.get().params)}render(){let e=ut.get(),a=Lt.get(),o=Rt.get(),i=Ot.get(),n=Nt.get(),l=Ut.get(),s=It.get(),h=la.get(),p=i||n;return g`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${c=>c.preventDefault()}
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
        ${p?g`
          <div id="resultarea">
            <cs-result-stats
              .total=${i?.total??0}
              .timeMs=${i?.time_ms??0}
              .truncated=${i?.truncated??!1}
              .loading=${n}
            ></cs-result-stats>
            <cs-facet-panel
              .facets=${s}
              .selected=${this.activeFacets}
              @facet-toggle=${this.onFacetToggle}
            ></cs-facet-panel>
            <div
              id="results"
              tabindex="-1"
            >
              <div id="path-results">
                ${o.map(c=>{let{repo:y,version:f,filePath:v}=rt(c.path);return g`
                    <filename-match
                      text=${v}
                      start=${c.match[0]}
                      end=${c.match[1]}
                      repo=${y}
                      version=${f.slice(0,6)}
                      href="/view/${c.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${ia({items:a,renderItem:c=>g`
                    <cs-result-group .result=${c} ?no-context=${h<=0}></cs-result-group>
                  `})}
              </div>
            </div>
          </div>
        `:g`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(e){let a=Do(this.activeFacets,e.detail.key,e.detail.value),o=ut.get();o&&we(o,this.currentOptions,this.facetParamsFrom(a))}onSearchInput(e){ca(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onSearchSubmit(e){we(e.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onOptionsChange(e){this.currentOptions=e.detail,this.reSearch()}reSearch(){let e=ut.get();e&&we(e,this.currentOptions,this.facetParamsFrom(this.activeFacets))}getRepos(){return window.__CS_INIT?.repos??[]}facetParamsFrom(e){return jo(e)}};Ht.styles=[H,ft,m`
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

    `],Ht=d([_("cs-search-view")],Ht);var mt=class extends b{constructor(){super(...arguments);this.path=""}render(){let e=this.path.indexOf("/+/");if(e===-1)return g`<span>${this.path}</span>`;let a=this.path.slice(0,e),i=this.path.slice(e+3).split("/").filter(n=>n.length>0);return g`
      <nav class="breadcrumbs">
        <a href="/view/${a}/+/">${a}</a>
        ${i.map((n,l)=>{let s=i.slice(0,l+1).join("/"),h=`/view/${a}/+/${s}${l<i.length-1?"/":""}`;return g`<span class="sep">/</span><a href=${h}>${n}</a>`})}
      </nav>
    `}};mt.styles=m`
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
  `,d([u()],mt.prototype,"path",2),mt=d([_("cs-breadcrumbs")],mt);var st=class extends b{constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let e=[...this.entries].sort((a,o)=>{let i=a.endsWith("/"),n=o.endsWith("/");return i!==n?i?-1:1:a.localeCompare(o)});return g`
      <div class="listing">
        ${e.map(a=>{let o=a.endsWith("/"),i=this.basePath+a;return g`
            <a class=${o?"dir":"file"} href=${i}>${a}</a>
          `})}
      </div>
    `}};st.styles=m`
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
  `,d([u({type:Array})],st.prototype,"entries",2),d([u()],st.prototype,"basePath",2),st=d([_("cs-dir-listing")],st);var Ho={navigate(r){window.location.href=r}};function Wo(r,t,e){switch(r){case"Enter":return t?{type:"open-tab",url:`/search?q=${encodeURIComponent(t)}`}:{type:"close-help"};case"/":return{type:"navigate",url:`/search${t?"?q="+encodeURIComponent(t):""}`};case"?":return{type:"toggle-help"};case"Escape":return{type:"close-help"};case"v":return e?{type:"navigate",url:e}:{type:"close-help"};case"n":return t?{type:"find",text:t,backwards:!1}:{type:"close-help"};case"p":return t?{type:"find",text:t,backwards:!0}:{type:"close-help"}}return null}function Vo(r,t,e,a){return!t||e<=0?Math.floor(r/3):e<=r?.5*(r-e):a/2}function Bo(r,t){return r<0?"1":r===t?String(r):`${r}-L${t}`}function Fo(r,t,e){return r?r.replace("{lno}",Bo(t,e)):""}function Go(r){let t=r.match(/^#L(\d+)(?:-L?(\d+))?$/);if(!t)return[-1,-1];let e=parseInt(t[1],10),a=t[2]?parseInt(t[2],10):e;return[e,a]}var z=class extends b{constructor(){super(...arguments);this.content="";this.basePath="";this.filePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.hasSelection=!1;this.highlightedLines=null;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onSelectionChange=()=>{this.hasSelection=(window.getSelection()?.toString()||"").length>0};this.onKeyDown=e=>{e.target.matches("input,textarea")||e.altKey||e.ctrlKey||e.metaKey||this.processKey(e.key)&&e.preventDefault()}}willUpdate(e){(e.has("content")||e.has("filePath"))&&(this.highlightedLines=null,this.content&&this.filePath&&$e(this.filePath,this.content).then(a=>{a&&(this.highlightedLines=a)}))}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("selectionchange",this.onSelectionChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("selectionchange",this.onSelectionChange)}parseHash(){let[e,a]=Go(window.location.hash);this.selectedStart=e,this.selectedEnd=a}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let e=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!e)return;let a=this.selectedStart!==this.selectedEnd,o=0;if(a){let l=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(l){let s=e.getBoundingClientRect(),h=l.getBoundingClientRect();o=h.top+h.height-s.top}}let i=Vo(window.innerHeight,a,o,e.offsetHeight),n=e.getBoundingClientRect();window.scrollTo(0,n.top+window.scrollY-i)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){return Fo(this.externalUrl,this.selectedStart,this.selectedEnd)}getSelectedText(){return window.getSelection()?.toString()||""}processKey(e){let a=Wo(e,this.getSelectedText(),this.resolvedExternalUrl());if(!a)return!1;switch(a.type){case"navigate":Ho.navigate(a.url);break;case"open-tab":window.open(a.url);break;case"find":window.find(a.text,!1,a.backwards);break;case"toggle-help":this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0}));break;case"close-help":this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));break}return!0}render(){let e=this.content.split(`
`);e.length>0&&e[e.length-1]===""&&e.pop();let a=this.highlightedLines;return g`
      ${this.hasSelection?g`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      `:""}
      <div class="viewer">
        ${e.map((o,i)=>{let n=i+1,l=n>=this.selectedStart&&n<=this.selectedEnd;return g`
            <div class="line ${l?"selected":""}" id="L${n}">
              <a class="lno" href="#L${n}" @click=${s=>this.onLineClick(s,n)}>${n}</a>
              <span class="code">${a&&a[i]?Ee(a[i]):o}</span>
            </div>
          `})}
      </div>
    `}onLineClick(e,a){if(e.shiftKey&&this.selectedStart>0){e.preventDefault();let o=Math.min(this.selectedStart,a),i=Math.max(this.selectedStart,a);this.selectedStart=o,this.selectedEnd=i,history.replaceState(null,"",`#L${o}-L${i}`)}else this.selectedStart=a,this.selectedEnd=a}};z.styles=[lt(Ce),m`
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
  `],d([u()],z.prototype,"content",2),d([u()],z.prototype,"basePath",2),d([u()],z.prototype,"filePath",2),d([u()],z.prototype,"repo",2),d([u()],z.prototype,"version",2),d([u()],z.prototype,"externalUrl",2),d([A()],z.prototype,"selectedStart",2),d([A()],z.prototype,"selectedEnd",2),d([A()],z.prototype,"hasSelection",2),d([A()],z.prototype,"highlightedLines",2),z=d([_("cs-code-viewer")],z);var bt=class extends b{constructor(){super(...arguments);this.open=!1}render(){return this.open?g`
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
    `:g``}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}))}};bt.styles=m`
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
  `,d([u({type:Boolean,reflect:!0})],bt.prototype,"open",2),bt=d([_("cs-help-modal")],bt);function Ko(r){let t=r.indexOf("/+/");if(t>=0){let e=r.slice(0,t),a=r.slice(t+3),o=e.lastIndexOf("@");if(o>=0)return{repo:e.slice(0,o),version:e.slice(o+1),filePath:a}}return rt(r)}function Jo(r){return r.endsWith("/")||r.endsWith("/+/")||!r.includes("/+/")}function Yo(r,t){return`/raw/${r}${t&&!r.endsWith("/")?"/":""}`}function Qo(r,t,e){let a="github.com/";return r.startsWith(a)?`https://github.com/${r.slice(a.length)}/blob/${t}/${e}#L{lno}`:""}var M=class extends b{constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null;this.showHelp=!1}willUpdate(e){e.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let e=Jo(this.path),a=Yo(this.path,e);try{let o=await fetch(a);if(!o.ok){this.error=`Not found (${o.status})`,this.loading=!1;return}(o.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await o.json(),this.fetchReadme(a)):this.content=await o.text()}catch(o){this.error=o instanceof Error?o.message:String(o)}this.loading=!1}async fetchReadme(e){if(!this.dirEntries)return;let a=this.dirEntries.find(o=>M.README_RE.test(o));if(a)try{let o=e.endsWith("/")?e:e+"/",i=await fetch(o+a);i.ok&&(this.readmeContent=await i.text())}catch{}}render(){let e=Ko(this.path),a=e.repo,o=e.version,i=Qo(e.repo,e.version,e.filePath);return g`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading?g`<div class="status">Loading...</div>`:""}
        ${this.error?g`<div class="status error">${this.error}</div>`:""}

        ${this.dirEntries?g`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith("/")?"":"/"}"
          ></cs-dir-listing>
          ${this.readmeContent?g`
            <div class="readme">
              <pre>${this.readmeContent}</pre>
            </div>
          `:""}
        `:""}

        ${this.content!==null?g`
          <cs-code-viewer
            .content=${this.content}
            .filePath=${e.filePath}
            .repo=${a}
            .version=${o}
            .externalUrl=${i}
            @toggle-help=${()=>{this.showHelp=!this.showHelp}}
            @close-help=${()=>{this.showHelp=!1}}
          ></cs-code-viewer>
        `:""}
        <cs-help-modal ?open=${this.showHelp} @close-help=${()=>{this.showHelp=!1}}></cs-help-modal>
      </div>
    `}};M.README_RE=/^readme\.(md|markdown|mdown|mkdn|txt|rst|org|adoc|asc)$/i,M.styles=m`
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
  `,d([u()],M.prototype,"path",2),d([A()],M.prototype,"content",2),d([A()],M.prototype,"dirEntries",2),d([A()],M.prototype,"readmeContent",2),d([A()],M.prototype,"loading",2),d([A()],M.prototype,"error",2),d([A()],M.prototype,"showHelp",2),M=d([_("cs-file-view")],M);var Wt=class extends b{render(){return g`
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
    `}};Wt.styles=[H,m`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Wt=d([_("cs-about-view")],Wt);var Vt=class extends Et(b){render(){let t=I.get();return g`
      <main>${this.renderView(t)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(t){switch(t.name){case"search":return g`<cs-search-view></cs-search-view>`;case"view":return g`<cs-file-view .path=${t.path??""}></cs-file-view>`;case"about":return g`<cs-about-view></cs-about-view>`;default:return g`<div class="placeholder">Not found</div>`}}};Vt.styles=[H,m`
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
    `],Vt=d([_("cs-app")],Vt);export{Vt as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
