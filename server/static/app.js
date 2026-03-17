var hi=Object.create;var Gt=Object.defineProperty;var Da=Object.getOwnPropertyDescriptor;var ui=Object.getOwnPropertyNames;var gi=Object.getPrototypeOf,pi=Object.prototype.hasOwnProperty;var Hr=(t,e)=>()=>(t&&(e=t(t=0)),e);var fi=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),bi=(t,e)=>{for(var r in e)Gt(t,r,{get:e[r],enumerable:!0})},mi=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ui(e))!pi.call(t,n)&&n!==r&&Gt(t,n,{get:()=>e[n],enumerable:!(a=Da(e,n))||a.enumerable});return t};var vi=(t,e,r)=>(r=t!=null?hi(gi(t)):{},mi(e||!t||!t.__esModule?Gt(r,"default",{value:t,enumerable:!0}):r,t));var b=(t,e,r,a)=>{for(var n=a>1?void 0:a?Da(e,r):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(n=(a?o(e,r,n):o(n))||n);return a&&n&&Gt(e,r,n),n};var kt,yn=Hr(()=>{kt=class{constructor(e){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,e?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(e,r){let a=this._map.get(e)||0;this._map.set(e,r),this.totalSize+=r-a}get averageSize(){if(this._map.size>0){let e=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(e):e}return 0}getSize(e){return this._map.get(e)}clear(){this._map.clear(),this.totalSize=0}}});function ua(t){return t==="horizontal"?"width":"height"}var ur,wn=Hr(()=>{ur=class{_getDefaultConfig(){return{direction:"vertical"}}constructor(e,r){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=e,Promise.resolve().then(()=>this.config=r||this._getDefaultConfig())}set config(e){Object.assign(this,Object.assign({},this._getDefaultConfig(),e))}get config(){return{direction:this.direction}}get items(){return this._items}set items(e){this._setItems(e)}_setItems(e){e!==this._items&&(this._items=e,this._scheduleReflow())}get direction(){return this._direction}set direction(e){e=e==="horizontal"?e:"vertical",e!==this._direction&&(this._direction=e,this._sizeDim=e==="horizontal"?"width":"height",this._secondarySizeDim=e==="horizontal"?"height":"width",this._positionDim=e==="horizontal"?"left":"top",this._secondaryPositionDim=e==="horizontal"?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(e){let{_viewDim1:r,_viewDim2:a}=this;Object.assign(this._viewportSize,e),a!==this._viewDim2?this._scheduleLayoutUpdate():r!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(e){Object.assign(this._latestCoords,e);let r=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(r-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(e=!1){(e||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(e){this._pin=e,this._triggerReflow()}get pin(){if(this._pin!==null){let{index:e,block:r}=this._pin;return{index:Math.max(0,Math.min(e,this.items.length-1)),block:r}}return null}_clampScrollPosition(e){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(e,this.totalScrollSize[ua(this.direction)]-this._viewDim1))}unpin(){this._pin!==null&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(this.pin!==null){let e=this._scrollPosition,{index:r,block:a}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:r,block:a||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=e-this._scrollPosition}}_calculateScrollIntoViewPosition(e){let{block:r}=e,a=Math.min(this.items.length,Math.max(0,e.index)),n=this._getItemPosition(a)[this._positionDim],i=n;if(r!=="start"){let o=this._getItemSize(a)[this._sizeDim];if(r==="center")i=n-.5*this._viewDim1+.5*o;else{let s=n-this._viewDim1+o;if(r==="end")i=s;else{let l=this._scrollPosition;i=Math.abs(l-n)<Math.abs(l-s)?n:s}}}return i+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(i)}getScrollIntoViewCoordinates(e){return{[this._positionDim]:this._calculateScrollIntoViewPosition(e)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){let e=new Map;if(this._first!==-1&&this._last!==-1)for(let a=this._first;a<=this._last;a++)e.set(a,this._getItemPosition(a));let r={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:e};this._scrollError&&(r.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(r)}get _num(){return this._first===-1||this._last===-1?0:this._last-this._first+1}_checkThresholds(){if(this._viewDim1===0&&this._num>0||this._pin!==null)this._scheduleReflow();else{let e=Math.max(0,this._scrollPosition-this._overhang),r=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>e||this._physicalMax<r?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(e){if(this._first===-1||this._last===-1)return;let r=this._first;for(;r<this._last&&Math.round(this._getItemPosition(r)[this._positionDim]+this._getItemSize(r)[this._sizeDim])<=Math.round(this._scrollPosition);)r++;let a=this._last;for(;a>this._first&&Math.round(this._getItemPosition(a)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)a--;(r!==this._firstVisible||a!==this._lastVisible)&&(this._firstVisible=r,this._lastVisible=a,e&&e.emit&&this._sendVisibilityChangedMessage())}}});var kn={};bi(kn,{FlowLayout:()=>gr,flow:()=>cs});function En(t){return t==="horizontal"?"marginLeft":"marginTop"}function ds(t){return t==="horizontal"?"marginRight":"marginBottom"}function hs(t){return t==="horizontal"?"xOffset":"yOffset"}function us(t,e){let r=[t,e].sort();return r[1]<=0?Math.min(...r):r[0]>=0?Math.max(...r):r[0]+r[1]}var cs,ga,gr,xn=Hr(()=>{yn();wn();cs=t=>Object.assign({type:gr},t);ga=class{constructor(){this._childSizeCache=new kt,this._marginSizeCache=new kt,this._metricsCache=new Map}update(e,r){let a=new Set;Object.keys(e).forEach(n=>{let i=Number(n);this._metricsCache.set(i,e[i]),this._childSizeCache.set(i,e[i][ua(r)]),a.add(i),a.add(i+1)});for(let n of a){let i=this._metricsCache.get(n)?.[En(r)]||0,o=this._metricsCache.get(n-1)?.[ds(r)]||0;this._marginSizeCache.set(n,us(i,o))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(e,r){return this._metricsCache.get(e)?.[En(r)]||0}getChildSize(e){return this._childSizeCache.getSize(e)}getMarginSize(e){return this._marginSizeCache.getSize(e)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}},gr=class extends ur{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new ga,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(e){this._metricsCache.update(e,this.direction),this._scheduleReflow()}_getPhysicalItem(e){return this._newPhysicalItems.get(e)??this._physicalItems.get(e)}_getSize(e){return this._getPhysicalItem(e)&&this._metricsCache.getChildSize(e)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(e){let r=this._metricsCache;if(this._first===-1||this._last===-1)return r.averageMarginSize+e*(r.averageMarginSize+this._getAverageSize());if(e<this._first){let a=this._first-e;return this._getPhysicalItem(this._first).pos-(r.getMarginSize(this._first-1)||r.averageMarginSize)-(a*r.averageChildSize+(a-1)*r.averageMarginSize)}else{let a=e-this._last;return this._getPhysicalItem(this._last).pos+(r.getChildSize(this._last)||r.averageChildSize)+(r.getMarginSize(this._last)||r.averageMarginSize)+a*(r.averageChildSize+r.averageMarginSize)}}_getPosition(e){let r=this._getPhysicalItem(e),{averageMarginSize:a}=this._metricsCache;return e===0?this._metricsCache.getMarginSize(0)??a:r?r.pos:this._estimatePosition(e)}_calculateAnchor(e,r){return e<=0?0:r>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((e+r)/2/this._delta)))}_getAnchor(e,r){if(this._physicalItems.size===0)return this._calculateAnchor(e,r);if(this._first<0)return this._calculateAnchor(e,r);if(this._last<0)return this._calculateAnchor(e,r);let a=this._getPhysicalItem(this._first),n=this._getPhysicalItem(this._last),i=a.pos;if(n.pos+this._metricsCache.getChildSize(this._last)<e)return this._calculateAnchor(e,r);if(i>r)return this._calculateAnchor(e,r);let l=this._firstVisible-1,c=-1/0;for(;c<e;)c=this._getPhysicalItem(++l).pos+this._metricsCache.getChildSize(l);return l}_getActiveItems(){this._viewDim1===0||this.items.length===0?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;let e=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e,this._stable=!0}_getItems(){let e=this._newPhysicalItems;this._stable=!0;let r,a;if(this.pin!==null){let{index:c}=this.pin;this._anchorIdx=c,this._anchorPos=this._getPosition(c)}if(r=this._scrollPosition-this._overhang,a=this._scrollPosition+this._viewDim1+this._overhang,a<0||r>this._scrollSize){this._clearItems();return}(this._anchorIdx===null||this._anchorPos===null)&&(this._anchorIdx=this._getAnchor(r,a),this._anchorPos=this._getPosition(this._anchorIdx));let n=this._getSize(this._anchorIdx);n===void 0&&(this._stable=!1,n=this._getAverageSize());let i=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,o=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;this._anchorIdx===0&&(this._anchorPos=i),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-o-n);let s=0;for(this._anchorPos+n+o<r&&(s=r-(this._anchorPos+n+o)),this._anchorPos-i>a&&(s=a-(this._anchorPos-i)),s&&(this._scrollPosition-=s,r-=s,a-=s,this._scrollError+=s),e.set(this._anchorIdx,{pos:this._anchorPos,size:n}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-i,this._physicalMax=this._anchorPos+n+o;this._physicalMin>r&&this._first>0;){let c=this._getSize(--this._first);c===void 0&&(this._stable=!1,c=this._getAverageSize());let d=this._metricsCache.getMarginSize(this._first);d===void 0&&(this._stable=!1,d=this._metricsCache.averageMarginSize),this._physicalMin-=c;let h=this._physicalMin;if(e.set(this._first,{pos:h,size:c}),this._physicalMin-=d,this._stable===!1&&this._estimate===!1)break}for(;this._physicalMax<a&&this._last<this.items.length-1;){let c=this._getSize(++this._last);c===void 0&&(this._stable=!1,c=this._getAverageSize());let d=this._metricsCache.getMarginSize(this._last);d===void 0&&(this._stable=!1,d=this._metricsCache.averageMarginSize);let h=this._physicalMax;if(e.set(this._last,{pos:h,size:c}),this._physicalMax+=c+d,!this._stable&&!this._estimate)break}let l=this._calculateError();l&&(this._physicalMin-=l,this._physicalMax-=l,this._anchorPos-=l,this._scrollPosition-=l,e.forEach(c=>c.pos-=l),this._scrollError+=l),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e)}_calculateError(){return this._first===0?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){let{_first:e,_last:r}=this;super._reflow(),(this._first===-1&&this._last==-1||this._first===e&&this._last===r)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){let{averageMarginSize:e}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(e+this._getAverageSize())+e)}get _delta(){let{averageMarginSize:e}=this._metricsCache;return this._getAverageSize()+e}_getItemPosition(e){return{[this._positionDim]:this._getPosition(e),[this._secondaryPositionDim]:0,[hs(this.direction)]:-(this._metricsCache.getLeadingMarginValue(e,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(e){return{[this._sizeDim]:this._getSize(e)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}});var Jn=fi((jh,Qn)=>{function Bn(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{let r=t[e],a=typeof r;(a==="object"||a==="function")&&!Object.isFrozen(r)&&Bn(r)}),t}var xr=class{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Fn(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Te(t,...e){let r=Object.create(null);for(let a in t)r[a]=t[a];return e.forEach(function(a){for(let n in a)r[n]=a[n]}),r}var Es="</span>",$n=t=>!!t.scope,ks=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){let r=t.split(".");return[`${e}${r.shift()}`,...r.map((a,n)=>`${a}${"_".repeat(n+1)}`)].join(" ")}return`${e}${t}`},ma=class{constructor(e,r){this.buffer="",this.classPrefix=r.classPrefix,e.walk(this)}addText(e){this.buffer+=Fn(e)}openNode(e){if(!$n(e))return;let r=ks(e.scope,{prefix:this.classPrefix});this.span(r)}closeNode(e){$n(e)&&(this.buffer+=Es)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}},Ln=(t={})=>{let e={children:[]};return Object.assign(e,t),e},va=class t{constructor(){this.rootNode=Ln(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let r=Ln({scope:e});this.add(r),this.stack.push(r)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,r){return typeof r=="string"?e.addText(r):r.children&&(e.openNode(r),r.children.forEach(a=>this._walk(e,a)),e.closeNode(r)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(r=>typeof r=="string")?e.children=[e.children.join("")]:e.children.forEach(r=>{t._collapse(r)}))}},_a=class extends va{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,r){let a=e.root;r&&(a.scope=`language:${r}`),this.add(a)}toHTML(){return new ma(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function Ot(t){return t?typeof t=="string"?t:t.source:null}function Hn(t){return He("(?=",t,")")}function xs(t){return He("(?:",t,")*")}function Ss(t){return He("(?:",t,")?")}function He(...t){return t.map(r=>Ot(r)).join("")}function Ns(t){let e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function wa(...t){return"("+(Ns(t).capture?"":"?:")+t.map(a=>Ot(a)).join("|")+")"}function qn(t){return new RegExp(t.toString()+"|").exec("").length-1}function As(t,e){let r=t&&t.exec(e);return r&&r.index===0}var Cs=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ea(t,{joinWith:e}){let r=0;return t.map(a=>{r+=1;let n=r,i=Ot(a),o="";for(;i.length>0;){let s=Cs.exec(i);if(!s){o+=i;break}o+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?o+="\\"+String(Number(s[1])+n):(o+=s[0],s[0]==="("&&r++)}return o}).map(a=>`(${a})`).join(e)}var Ts=/\b\B/,Gn="[a-zA-Z]\\w*",ka="[a-zA-Z_]\\w*",Kn="\\b\\d+(\\.\\d+)?",Wn="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",jn="\\b(0b[01]+)",Rs="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Os=(t={})=>{let e=/^#![ ]*\//;return t.binary&&(t.begin=He(e,/.*\b/,t.binary,/\b.*/)),Te({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(r,a)=>{r.index!==0&&a.ignoreMatch()}},t)},Mt={begin:"\\\\[\\s\\S]",relevance:0},Ms={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Mt]},Is={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Mt]},$s={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Nr=function(t,e,r={}){let a=Te({scope:"comment",begin:t,end:e,contains:[]},r);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=wa("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:He(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},Ls=Nr("//","$"),Ds=Nr("/\\*","\\*/"),Ps=Nr("#","$"),Us={scope:"number",begin:Kn,relevance:0},zs={scope:"number",begin:Wn,relevance:0},Bs={scope:"number",begin:jn,relevance:0},Fs={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Mt,{begin:/\[/,end:/\]/,relevance:0,contains:[Mt]}]},Hs={scope:"title",begin:Gn,relevance:0},qs={scope:"title",begin:ka,relevance:0},Gs={begin:"\\.\\s*"+ka,relevance:0},Ks=function(t){return Object.assign(t,{"on:begin":(e,r)=>{r.data._beginMatch=e[1]},"on:end":(e,r)=>{r.data._beginMatch!==e[1]&&r.ignoreMatch()}})},kr=Object.freeze({__proto__:null,APOS_STRING_MODE:Ms,BACKSLASH_ESCAPE:Mt,BINARY_NUMBER_MODE:Bs,BINARY_NUMBER_RE:jn,COMMENT:Nr,C_BLOCK_COMMENT_MODE:Ds,C_LINE_COMMENT_MODE:Ls,C_NUMBER_MODE:zs,C_NUMBER_RE:Wn,END_SAME_AS_BEGIN:Ks,HASH_COMMENT_MODE:Ps,IDENT_RE:Gn,MATCH_NOTHING_RE:Ts,METHOD_GUARD:Gs,NUMBER_MODE:Us,NUMBER_RE:Kn,PHRASAL_WORDS_MODE:$s,QUOTE_STRING_MODE:Is,REGEXP_MODE:Fs,RE_STARTERS_RE:Rs,SHEBANG:Os,TITLE_MODE:Hs,UNDERSCORE_IDENT_RE:ka,UNDERSCORE_TITLE_MODE:qs});function Ws(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function js(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function Vs(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=Ws,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function Zs(t,e){Array.isArray(t.illegal)&&(t.illegal=wa(...t.illegal))}function Ys(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function Xs(t,e){t.relevance===void 0&&(t.relevance=1)}var Qs=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");let r=Object.assign({},t);Object.keys(t).forEach(a=>{delete t[a]}),t.keywords=r.keywords,t.begin=He(r.beforeMatch,Hn(r.begin)),t.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},t.relevance=0,delete r.beforeMatch},Js=["of","and","for","in","not","or","if","then","parent","list","value"],el="keyword";function Vn(t,e,r=el){let a=Object.create(null);return typeof t=="string"?n(r,t.split(" ")):Array.isArray(t)?n(r,t):Object.keys(t).forEach(function(i){Object.assign(a,Vn(t[i],e,i))}),a;function n(i,o){e&&(o=o.map(s=>s.toLowerCase())),o.forEach(function(s){let l=s.split("|");a[l[0]]=[i,tl(l[0],l[1])]})}}function tl(t,e){return e?Number(e):rl(t)?0:1}function rl(t){return Js.includes(t.toLowerCase())}var Dn={},Fe=t=>{console.error(t)},Pn=(t,...e)=>{console.log(`WARN: ${t}`,...e)},at=(t,e)=>{Dn[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Dn[`${t}/${e}`]=!0)},Sr=new Error;function Zn(t,e,{key:r}){let a=0,n=t[r],i={},o={};for(let s=1;s<=e.length;s++)o[s+a]=n[s],i[s+a]=!0,a+=qn(e[s-1]);t[r]=o,t[r]._emit=i,t[r]._multi=!0}function al(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw Fe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Sr;if(typeof t.beginScope!="object"||t.beginScope===null)throw Fe("beginScope must be object"),Sr;Zn(t,t.begin,{key:"beginScope"}),t.begin=Ea(t.begin,{joinWith:""})}}function nl(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw Fe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Sr;if(typeof t.endScope!="object"||t.endScope===null)throw Fe("endScope must be object"),Sr;Zn(t,t.end,{key:"endScope"}),t.end=Ea(t.end,{joinWith:""})}}function ol(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function il(t){ol(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),al(t),nl(t)}function sl(t){function e(o,s){return new RegExp(Ot(o),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(s?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,s]),this.matchAt+=qn(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let s=this.regexes.map(l=>l[1]);this.matcherRe=e(Ea(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(s);if(!l)return null;let c=l.findIndex((h,g)=>g>0&&h!==void 0),d=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,d)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];let l=new r;return this.rules.slice(s).forEach(([c,d])=>l.addRule(c,d)),l.compile(),this.multiRegexes[s]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,l){this.rules.push([s,l]),l.type==="begin"&&this.count++}exec(s){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(s);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){let d=this.getMatcher(0);d.lastIndex=this.lastIndex+1,c=d.exec(s)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function n(o){let s=new a;return o.contains.forEach(l=>s.addRule(l.begin,{rule:l,type:"begin"})),o.terminatorEnd&&s.addRule(o.terminatorEnd,{type:"end"}),o.illegal&&s.addRule(o.illegal,{type:"illegal"}),s}function i(o,s){let l=o;if(o.isCompiled)return l;[js,Ys,il,Qs].forEach(d=>d(o,s)),t.compilerExtensions.forEach(d=>d(o,s)),o.__beforeBegin=null,[Vs,Zs,Xs].forEach(d=>d(o,s)),o.isCompiled=!0;let c=null;return typeof o.keywords=="object"&&o.keywords.$pattern&&(o.keywords=Object.assign({},o.keywords),c=o.keywords.$pattern,delete o.keywords.$pattern),c=c||/\w+/,o.keywords&&(o.keywords=Vn(o.keywords,t.case_insensitive)),l.keywordPatternRe=e(c,!0),s&&(o.begin||(o.begin=/\B|\b/),l.beginRe=e(l.begin),!o.end&&!o.endsWithParent&&(o.end=/\B|\b/),o.end&&(l.endRe=e(l.end)),l.terminatorEnd=Ot(l.end)||"",o.endsWithParent&&s.terminatorEnd&&(l.terminatorEnd+=(o.end?"|":"")+s.terminatorEnd)),o.illegal&&(l.illegalRe=e(o.illegal)),o.contains||(o.contains=[]),o.contains=[].concat(...o.contains.map(function(d){return ll(d==="self"?o:d)})),o.contains.forEach(function(d){i(d,l)}),o.starts&&i(o.starts,s),l.matcher=n(l),l}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=Te(t.classNameAliases||{}),i(t)}function Yn(t){return t?t.endsWithParent||Yn(t.starts):!1}function ll(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return Te(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Yn(t)?Te(t,{starts:t.starts?Te(t.starts):null}):Object.isFrozen(t)?Te(t):t}var cl="11.11.1",ya=class extends Error{constructor(e,r){super(e),this.name="HTMLInjectionError",this.html=r}},ba=Fn,Un=Te,zn=Symbol("nomatch"),dl=7,Xn=function(t){let e=Object.create(null),r=Object.create(null),a=[],n=!0,i="Could not find the language '{}', did you forget to load/include a language module?",o={disableAutodetect:!0,name:"Plain text",contains:[]},s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:_a};function l(p){return s.noHighlightRe.test(p)}function c(p){let k=p.className+" ";k+=p.parentNode?p.parentNode.className:"";let w=s.languageDetectRe.exec(k);if(w){let I=E(w[1]);return I||(Pn(i.replace("{}",w[1])),Pn("Falling back to no-highlight mode for this block.",p)),I?w[1]:"no-highlight"}return k.split(/\s+/).find(I=>l(I)||E(I))}function d(p,k,w){let I="",B="";typeof k=="object"?(I=p,w=k.ignoreIllegals,B=k.language):(at("10.7.0","highlight(lang, code, ...args) has been deprecated."),at("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),B=p,I=k),w===void 0&&(w=!0);let K={code:I,language:B};he("before:highlight",K);let V=K.result?K.result:h(K.language,K.code,w);return V.code=K.code,he("after:highlight",V),V}function h(p,k,w,I){let B=Object.create(null);function K(m,S){return m.keywords[S]}function V(){if(!C.keywords){Y.addText(W);return}let m=0;C.keywordPatternRe.lastIndex=0;let S=C.keywordPatternRe.exec(W),L="";for(;S;){L+=W.substring(m,S.index);let F=de.case_insensitive?S[0].toLowerCase():S[0],J=K(C,F);if(J){let[we,ci]=J;if(Y.addText(L),L="",B[F]=(B[F]||0)+1,B[F]<=dl&&(qt+=ci),we.startsWith("_"))L+=S[0];else{let di=de.classNameAliases[we]||we;se(S[0],di)}}else L+=S[0];m=C.keywordPatternRe.lastIndex,S=C.keywordPatternRe.exec(W)}L+=W.substring(m),Y.addText(L)}function ce(){if(W==="")return;let m=null;if(typeof C.subLanguage=="string"){if(!e[C.subLanguage]){Y.addText(W);return}m=h(C.subLanguage,W,!0,Ht[C.subLanguage]),Ht[C.subLanguage]=m._top}else m=u(W,C.subLanguage.length?C.subLanguage:null);C.relevance>0&&(qt+=m.relevance),Y.__addSublanguage(m._emitter,m.language)}function te(){C.subLanguage!=null?ce():V(),W=""}function se(m,S){m!==""&&(Y.startScope(S),Y.addText(m),Y.endScope())}function We(m,S){let L=1,F=S.length-1;for(;L<=F;){if(!m._emit[L]){L++;continue}let J=de.classNameAliases[m[L]]||m[L],we=S[L];J?se(we,J):(W=we,V(),W=""),L++}}function Bt(m,S){return m.scope&&typeof m.scope=="string"&&Y.openNode(de.classNameAliases[m.scope]||m.scope),m.beginScope&&(m.beginScope._wrap?(se(W,de.classNameAliases[m.beginScope._wrap]||m.beginScope._wrap),W=""):m.beginScope._multi&&(We(m.beginScope,S),W="")),C=Object.create(m,{parent:{value:C}}),C}function ct(m,S,L){let F=As(m.endRe,L);if(F){if(m["on:end"]){let J=new xr(m);m["on:end"](S,J),J.isMatchIgnored&&(F=!1)}if(F){for(;m.endsParent&&m.parent;)m=m.parent;return m}}if(m.endsWithParent)return ct(m.parent,S,L)}function Dr(m){return C.matcher.regexIndex===0?(W+=m[0],1):(Fr=!0,0)}function Pr(m){let S=m[0],L=m.rule,F=new xr(L),J=[L.__beforeBegin,L["on:begin"]];for(let we of J)if(we&&(we(m,F),F.isMatchIgnored))return Dr(S);return L.skip?W+=S:(L.excludeBegin&&(W+=S),te(),!L.returnBegin&&!L.excludeBegin&&(W=S)),Bt(L,m),L.returnBegin?0:S.length}function Ur(m){let S=m[0],L=k.substring(m.index),F=ct(C,m,L);if(!F)return zn;let J=C;C.endScope&&C.endScope._wrap?(te(),se(S,C.endScope._wrap)):C.endScope&&C.endScope._multi?(te(),We(C.endScope,m)):J.skip?W+=S:(J.returnEnd||J.excludeEnd||(W+=S),te(),J.excludeEnd&&(W=S));do C.scope&&Y.closeNode(),!C.skip&&!C.subLanguage&&(qt+=C.relevance),C=C.parent;while(C!==F.parent);return F.starts&&Bt(F.starts,m),J.returnEnd?0:S.length}function zr(){let m=[];for(let S=C;S!==de;S=S.parent)S.scope&&m.unshift(S.scope);m.forEach(S=>Y.openNode(S))}let je={};function Ft(m,S){let L=S&&S[0];if(W+=m,L==null)return te(),0;if(je.type==="begin"&&S.type==="end"&&je.index===S.index&&L===""){if(W+=k.slice(S.index,S.index+1),!n){let F=new Error(`0 width match regex (${p})`);throw F.languageName=p,F.badRule=je.rule,F}return 1}if(je=S,S.type==="begin")return Pr(S);if(S.type==="illegal"&&!w){let F=new Error('Illegal lexeme "'+L+'" for mode "'+(C.scope||"<unnamed>")+'"');throw F.mode=C,F}else if(S.type==="end"){let F=Ur(S);if(F!==zn)return F}if(S.type==="illegal"&&L==="")return W+=`
`,1;if(Br>1e5&&Br>S.index*3)throw new Error("potential infinite loop, way more iterations than matches");return W+=L,L.length}let de=E(p);if(!de)throw Fe(i.replace("{}",p)),new Error('Unknown language: "'+p+'"');let H=sl(de),Ae="",C=I||H,Ht={},Y=new s.__emitter(s);zr();let W="",qt=0,Me=0,Br=0,Fr=!1;try{if(de.__emitTokens)de.__emitTokens(k,Y);else{for(C.matcher.considerAll();;){Br++,Fr?Fr=!1:C.matcher.considerAll(),C.matcher.lastIndex=Me;let m=C.matcher.exec(k);if(!m)break;let S=k.substring(Me,m.index),L=Ft(S,m);Me=m.index+L}Ft(k.substring(Me))}return Y.finalize(),Ae=Y.toHTML(),{language:p,value:Ae,relevance:qt,illegal:!1,_emitter:Y,_top:C}}catch(m){if(m.message&&m.message.includes("Illegal"))return{language:p,value:ba(k),illegal:!0,relevance:0,_illegalBy:{message:m.message,index:Me,context:k.slice(Me-100,Me+100),mode:m.mode,resultSoFar:Ae},_emitter:Y};if(n)return{language:p,value:ba(k),illegal:!1,relevance:0,errorRaised:m,_emitter:Y,_top:C};throw m}}function g(p){let k={value:ba(p),illegal:!1,relevance:0,_top:o,_emitter:new s.__emitter(s)};return k._emitter.addText(p),k}function u(p,k){k=k||s.languages||Object.keys(e);let w=g(p),I=k.filter(E).filter(Q).map(te=>h(te,p,!1));I.unshift(w);let B=I.sort((te,se)=>{if(te.relevance!==se.relevance)return se.relevance-te.relevance;if(te.language&&se.language){if(E(te.language).supersetOf===se.language)return 1;if(E(se.language).supersetOf===te.language)return-1}return 0}),[K,V]=B,ce=K;return ce.secondBest=V,ce}function f(p,k,w){let I=k&&r[k]||w;p.classList.add("hljs"),p.classList.add(`language-${I}`)}function _(p){let k=null,w=c(p);if(l(w))return;if(he("before:highlightElement",{el:p,language:w}),p.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",p);return}if(p.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),s.throwUnescapedHTML))throw new ya("One of your code blocks includes unescaped HTML.",p.innerHTML);k=p;let I=k.textContent,B=w?d(I,{language:w,ignoreIllegals:!0}):u(I);p.innerHTML=B.value,p.dataset.highlighted="yes",f(p,w,B.language),p.result={language:B.language,re:B.relevance,relevance:B.relevance},B.secondBest&&(p.secondBest={language:B.secondBest.language,relevance:B.secondBest.relevance}),he("after:highlightElement",{el:p,result:B,text:I})}function y(p){s=Un(s,p)}let N=()=>{P(),at("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function M(){P(),at("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let D=!1;function P(){function p(){P()}if(document.readyState==="loading"){D||window.addEventListener("DOMContentLoaded",p,!1),D=!0;return}document.querySelectorAll(s.cssSelector).forEach(_)}function T(p,k){let w=null;try{w=k(t)}catch(I){if(Fe("Language definition for '{}' could not be registered.".replace("{}",p)),n)Fe(I);else throw I;w=o}w.name||(w.name=p),e[p]=w,w.rawDefinition=k.bind(null,t),w.aliases&&U(w.aliases,{languageName:p})}function x(p){delete e[p];for(let k of Object.keys(r))r[k]===p&&delete r[k]}function R(){return Object.keys(e)}function E(p){return p=(p||"").toLowerCase(),e[p]||e[r[p]]}function U(p,{languageName:k}){typeof p=="string"&&(p=[p]),p.forEach(w=>{r[w.toLowerCase()]=k})}function Q(p){let k=E(p);return k&&!k.disableAutodetect}function ye(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=k=>{p["before:highlightBlock"](Object.assign({block:k.el},k))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=k=>{p["after:highlightBlock"](Object.assign({block:k.el},k))})}function le(p){ye(p),a.push(p)}function Ne(p){let k=a.indexOf(p);k!==-1&&a.splice(k,1)}function he(p,k){let w=p;a.forEach(function(I){I[w]&&I[w](k)})}function Oe(p){return at("10.7.0","highlightBlock will be removed entirely in v12.0"),at("10.7.0","Please use highlightElement now."),_(p)}Object.assign(t,{highlight:d,highlightAuto:u,highlightAll:P,highlightElement:_,highlightBlock:Oe,configure:y,initHighlighting:N,initHighlightingOnLoad:M,registerLanguage:T,unregisterLanguage:x,listLanguages:R,getLanguage:E,registerAliases:U,autoDetection:Q,inherit:Un,addPlugin:le,removePlugin:Ne}),t.debugMode=function(){n=!1},t.safeMode=function(){n=!0},t.versionString=cl,t.regex={concat:He,lookahead:Hn,either:wa,optional:Ss,anyNumberOfTimes:xs};for(let p in kr)typeof kr[p]=="object"&&Bn(kr[p]);return Object.assign(t,kr),t},nt=Xn({});nt.newInstance=()=>Xn({});Qn.exports=nt;nt.HighlightJS=nt;nt.default=nt});var Kt=globalThis,Wt=Kt.ShadowRoot&&(Kt.ShadyCSS===void 0||Kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qr=Symbol(),Pa=new WeakMap,dt=class{constructor(e,r,a){if(this._$cssResult$=!0,a!==qr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(Wt&&e===void 0){let a=r!==void 0&&r.length===1;a&&(e=Pa.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Pa.set(r,e))}return e}toString(){return this.cssText}},Ve=t=>new dt(typeof t=="string"?t:t+"",void 0,qr),O=(t,...e)=>{let r=t.length===1?t[0]:e.reduce(((a,n,i)=>a+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1]),t[0]);return new dt(r,t,qr)},Ua=(t,e)=>{if(Wt)t.adoptedStyleSheets=e.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of e){let a=document.createElement("style"),n=Kt.litNonce;n!==void 0&&a.setAttribute("nonce",n),a.textContent=r.cssText,t.appendChild(a)}},Gr=Wt?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let a of e.cssRules)r+=a.cssText;return Ve(r)})(t):t;var{is:_i,defineProperty:yi,getOwnPropertyDescriptor:wi,getOwnPropertyNames:Ei,getOwnPropertySymbols:ki,getPrototypeOf:xi}=Object,jt=globalThis,za=jt.trustedTypes,Si=za?za.emptyScript:"",Ni=jt.reactiveElementPolyfillSupport,ht=(t,e)=>t,ut={toAttribute(t,e){switch(e){case Boolean:t=t?Si:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},Vt=(t,e)=>!_i(t,e),Ba={attribute:!0,type:String,converter:ut,reflect:!1,useDefault:!1,hasChanged:Vt};Symbol.metadata??=Symbol("metadata"),jt.litPropertyMetadata??=new WeakMap;var Ee=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Ba){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let a=Symbol(),n=this.getPropertyDescriptor(e,a,r);n!==void 0&&yi(this.prototype,e,n)}}static getPropertyDescriptor(e,r,a){let{get:n,set:i}=wi(this.prototype,e)??{get(){return this[r]},set(o){this[r]=o}};return{get:n,set(o){let s=n?.call(this);i?.call(this,o),this.requestUpdate(e,s,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ba}static _$Ei(){if(this.hasOwnProperty(ht("elementProperties")))return;let e=xi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ht("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ht("properties"))){let r=this.properties,a=[...Ei(r),...ki(r)];for(let n of a)this.createProperty(n,r[n])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[a,n]of r)this.elementProperties.set(a,n)}this._$Eh=new Map;for(let[r,a]of this.elementProperties){let n=this._$Eu(r,a);n!==void 0&&this._$Eh.set(n,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let n of a)r.unshift(Gr(n))}else e!==void 0&&r.push(Gr(e));return r}static _$Eu(e,r){let a=r.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let a of r.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ua(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,r,a){this._$AK(e,a)}_$ET(e,r){let a=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,a);if(n!==void 0&&a.reflect===!0){let i=(a.converter?.toAttribute!==void 0?a.converter:ut).toAttribute(r,a.type);this._$Em=e,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(e,r){let a=this.constructor,n=a._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let i=a.getPropertyOptions(n),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ut;this._$Em=n;let s=o.fromAttribute(r,i.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(e,r,a){if(e!==void 0){let n=this.constructor,i=this[e];if(a??=n.getPropertyOptions(e),!((a.hasChanged??Vt)(i,r)||a.useDefault&&a.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,a))))return;this.C(e,r,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:a,reflect:n,wrapped:i},o){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??r??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(r=void 0),this._$AL.set(e,r)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[n,i]of a){let{wrapped:o}=i,s=this[n];o!==!0||this._$AL.has(n)||s===void 0||this.C(n,void 0,i,s)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach((a=>a.hostUpdate?.())),this.update(r)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};Ee.elementStyles=[],Ee.shadowRootOptions={mode:"open"},Ee[ht("elementProperties")]=new Map,Ee[ht("finalized")]=new Map,Ni?.({ReactiveElement:Ee}),(jt.reactiveElementVersions??=[]).push("2.1.1");var Wr=globalThis,Zt=Wr.trustedTypes,Fa=Zt?Zt.createPolicy("lit-html",{createHTML:t=>t}):void 0,jr="$lit$",ke=`lit$${Math.random().toFixed(9).slice(2)}$`,Vr="?"+ke,Ai=`<${Vr}>`,Le=document,pt=()=>Le.createComment(""),ft=t=>t===null||typeof t!="object"&&typeof t!="function",Zr=Array.isArray,ja=t=>Zr(t)||typeof t?.[Symbol.iterator]=="function",Kr=`[ 	
\f\r]`,gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ha=/-->/g,qa=/>/g,Ie=RegExp(`>|${Kr}(?:([^\\s"'>=/]+)(${Kr}*=${Kr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ga=/'/g,Ka=/"/g,Va=/^(?:script|style|textarea|title)$/i,Yr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),v=Yr(1),Za=Yr(2),fc=Yr(3),re=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Wa=new WeakMap,$e=Le.createTreeWalker(Le,129);function Ya(t,e){if(!Zr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fa!==void 0?Fa.createHTML(e):e}var Xa=(t,e)=>{let r=t.length-1,a=[],n,i=e===2?"<svg>":e===3?"<math>":"",o=gt;for(let s=0;s<r;s++){let l=t[s],c,d,h=-1,g=0;for(;g<l.length&&(o.lastIndex=g,d=o.exec(l),d!==null);)g=o.lastIndex,o===gt?d[1]==="!--"?o=Ha:d[1]!==void 0?o=qa:d[2]!==void 0?(Va.test(d[2])&&(n=RegExp("</"+d[2],"g")),o=Ie):d[3]!==void 0&&(o=Ie):o===Ie?d[0]===">"?(o=n??gt,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,c=d[1],o=d[3]===void 0?Ie:d[3]==='"'?Ka:Ga):o===Ka||o===Ga?o=Ie:o===Ha||o===qa?o=gt:(o=Ie,n=void 0);let u=o===Ie&&t[s+1].startsWith("/>")?" ":"";i+=o===gt?l+Ai:h>=0?(a.push(c),l.slice(0,h)+jr+l.slice(h)+ke+u):l+ke+(h===-2?s:u)}return[Ya(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},bt=class t{constructor({strings:e,_$litType$:r},a){let n;this.parts=[];let i=0,o=0,s=e.length-1,l=this.parts,[c,d]=Xa(e,r);if(this.el=t.createElement(c,a),$e.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=$e.nextNode())!==null&&l.length<s;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(jr)){let g=d[o++],u=n.getAttribute(h).split(ke),f=/([.?@])?(.*)/.exec(g);l.push({type:1,index:i,name:f[2],strings:u,ctor:f[1]==="."?Xt:f[1]==="?"?Qt:f[1]==="@"?Jt:Pe}),n.removeAttribute(h)}else h.startsWith(ke)&&(l.push({type:6,index:i}),n.removeAttribute(h));if(Va.test(n.tagName)){let h=n.textContent.split(ke),g=h.length-1;if(g>0){n.textContent=Zt?Zt.emptyScript:"";for(let u=0;u<g;u++)n.append(h[u],pt()),$e.nextNode(),l.push({type:2,index:++i});n.append(h[g],pt())}}}else if(n.nodeType===8)if(n.data===Vr)l.push({type:2,index:i});else{let h=-1;for(;(h=n.data.indexOf(ke,h+1))!==-1;)l.push({type:7,index:i}),h+=ke.length-1}i++}}static createElement(e,r){let a=Le.createElement("template");return a.innerHTML=e,a}};function De(t,e,r=t,a){if(e===re)return e;let n=a!==void 0?r._$Co?.[a]:r._$Cl,i=ft(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,r,a)),a!==void 0?(r._$Co??=[])[a]=n:r._$Cl=n),n!==void 0&&(e=De(t,n._$AS(t,e.values),n,a)),e}var Yt=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:a}=this._$AD,n=(e?.creationScope??Le).importNode(r,!0);$e.currentNode=n;let i=$e.nextNode(),o=0,s=0,l=a[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Ze(i,i.nextSibling,this,e):l.type===1?c=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(c=new er(i,this,e)),this._$AV.push(c),l=a[++s]}o!==l?.index&&(i=$e.nextNode(),o++)}return $e.currentNode=Le,n}p(e){let r=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,r),r+=a.strings.length-2):a._$AI(e[r])),r++}},Ze=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,a,n){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=a,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=De(this,e,r),ft(e)?e===q||e==null||e===""?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==re&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ja(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&ft(this._$AH)?this._$AA.nextSibling.data=e:this.T(Le.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:a}=e,n=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=bt.createElement(Ya(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===n)this._$AH.p(r);else{let i=new Yt(n,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=Wa.get(e.strings);return r===void 0&&Wa.set(e.strings,r=new bt(e)),r}k(e){Zr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,a,n=0;for(let i of e)n===r.length?r.push(a=new t(this.O(pt()),this.O(pt()),this,this.options)):a=r[n],a._$AI(i),n++;n<r.length&&(this._$AR(a&&a._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let a=e.nextSibling;e.remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Pe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,a,n,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=i,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=q}_$AI(e,r=this,a,n){let i=this.strings,o=!1;if(i===void 0)e=De(this,e,r,0),o=!ft(e)||e!==this._$AH&&e!==re,o&&(this._$AH=e);else{let s=e,l,c;for(e=i[0],l=0;l<i.length-1;l++)c=De(this,s[a+l],r,l),c===re&&(c=this._$AH[l]),o||=!ft(c)||c!==this._$AH[l],c===q?e=q:e!==q&&(e+=(c??"")+i[l+1]),this._$AH[l]=c}o&&!n&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Xt=class extends Pe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}},Qt=class extends Pe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}},Jt=class extends Pe{constructor(e,r,a,n,i){super(e,r,a,n,i),this.type=5}_$AI(e,r=this){if((e=De(this,e,r,0)??q)===re)return;let a=this._$AH,n=e===q&&a!==q||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==q&&(a===q||n);n&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},er=class{constructor(e,r,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){De(this,e)}},Qa={M:jr,P:ke,A:Vr,C:1,L:Xa,R:Yt,D:ja,V:De,I:Ze,H:Pe,N:Qt,U:Jt,B:Xt,F:er},Ci=Wr.litHtmlPolyfillSupport;Ci?.(bt,Ze),(Wr.litHtmlVersions??=[]).push("3.3.1");var Ja=(t,e,r)=>{let a=r?.renderBefore??e,n=a._$litPart$;if(n===void 0){let i=r?.renderBefore??null;a._$litPart$=n=new Ze(e.insertBefore(pt(),i),i,void 0,r??{})}return n._$AI(t),n};var Xr=globalThis,$=class extends Ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ja(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return re}};$._$litElement$=!0,$.finalized=!0,Xr.litElementHydrateSupport?.({LitElement:$});var Ti=Xr.litElementPolyfillSupport;Ti?.({LitElement:$});(Xr.litElementVersions??=[]).push("4.2.1");var z=t=>(e,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var Ri={attribute:!0,type:String,converter:ut,reflect:!1,hasChanged:Vt},Oi=(t=Ri,e,r)=>{let{kind:a,metadata:n}=r,i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),a==="accessor"){let{name:o}=r;return{set(s){let l=e.get.call(this);e.set.call(this,s),this.requestUpdate(o,l,t)},init(s){return s!==void 0&&this.C(o,void 0,t,s),s}}}if(a==="setter"){let{name:o}=r;return function(s){let l=this[o];e.call(this,s),this.requestUpdate(o,l,t)}}throw Error("Unsupported decorator location: "+a)};function A(t){return(e,r)=>typeof r=="object"?Oi(t,e,r):((a,n,i)=>{let o=n.hasOwnProperty(i);return n.constructor.createProperty(i,a),o?Object.getOwnPropertyDescriptor(n,i):void 0})(t,e,r)}function ee(t){return A({...t,state:!0,attribute:!1})}var Mi=Object.defineProperty,Ii=(t,e,r)=>e in t?Mi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Qr=(t,e,r)=>(Ii(t,typeof e!="symbol"?e+"":e,r),r),$i=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)},Jr=(t,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return t.has(e)},rr=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r)},en=(t,e,r)=>($i(t,e,"access private method"),r);function tn(t,e){return Object.is(t,e)}var Z=null,mt=!1,ar=1,nr=Symbol("SIGNAL");function Ye(t){let e=Z;return Z=t,e}function Li(){return Z}function Di(){return mt}var na={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function or(t){if(mt)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(Z===null)return;Z.consumerOnSignalRead(t);let e=Z.nextProducerIndex++;if(Xe(Z),e<Z.producerNode.length&&Z.producerNode[e]!==t&&ra(Z)){let r=Z.producerNode[e];ir(r,Z.producerIndexOfThis[e])}Z.producerNode[e]!==t&&(Z.producerNode[e]=t,Z.producerIndexOfThis[e]=ra(Z)?nn(t,Z,e):0),Z.producerLastReadVersion[e]=t.version}function Pi(){ar++}function rn(t){if(!(!t.dirty&&t.lastCleanEpoch===ar)){if(!t.producerMustRecompute(t)&&!Hi(t)){t.dirty=!1,t.lastCleanEpoch=ar;return}t.producerRecomputeValue(t),t.dirty=!1,t.lastCleanEpoch=ar}}function an(t){if(t.liveConsumerNode===void 0)return;let e=mt;mt=!0;try{for(let r of t.liveConsumerNode)r.dirty||zi(r)}finally{mt=e}}function Ui(){return Z?.consumerAllowSignalWrites!==!1}function zi(t){var e;t.dirty=!0,an(t),(e=t.consumerMarkedDirty)==null||e.call(t.wrapper??t)}function Bi(t){return t&&(t.nextProducerIndex=0),Ye(t)}function Fi(t,e){if(Ye(e),!(!t||t.producerNode===void 0||t.producerIndexOfThis===void 0||t.producerLastReadVersion===void 0)){if(ra(t))for(let r=t.nextProducerIndex;r<t.producerNode.length;r++)ir(t.producerNode[r],t.producerIndexOfThis[r]);for(;t.producerNode.length>t.nextProducerIndex;)t.producerNode.pop(),t.producerLastReadVersion.pop(),t.producerIndexOfThis.pop()}}function Hi(t){Xe(t);for(let e=0;e<t.producerNode.length;e++){let r=t.producerNode[e],a=t.producerLastReadVersion[e];if(a!==r.version||(rn(r),a!==r.version))return!0}return!1}function nn(t,e,r){var a;if(oa(t),Xe(t),t.liveConsumerNode.length===0){(a=t.watched)==null||a.call(t.wrapper);for(let n=0;n<t.producerNode.length;n++)t.producerIndexOfThis[n]=nn(t.producerNode[n],t,n)}return t.liveConsumerIndexOfThis.push(r),t.liveConsumerNode.push(e)-1}function ir(t,e){var r;if(oa(t),Xe(t),typeof ngDevMode<"u"&&ngDevMode&&e>=t.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${t.liveConsumerNode.length} consumers)`);if(t.liveConsumerNode.length===1){(r=t.unwatched)==null||r.call(t.wrapper);for(let n=0;n<t.producerNode.length;n++)ir(t.producerNode[n],t.producerIndexOfThis[n])}let a=t.liveConsumerNode.length-1;if(t.liveConsumerNode[e]=t.liveConsumerNode[a],t.liveConsumerIndexOfThis[e]=t.liveConsumerIndexOfThis[a],t.liveConsumerNode.length--,t.liveConsumerIndexOfThis.length--,e<t.liveConsumerNode.length){let n=t.liveConsumerIndexOfThis[e],i=t.liveConsumerNode[e];Xe(i),i.producerIndexOfThis[n]=e}}function ra(t){var e;return t.consumerIsAlwaysLive||(((e=t?.liveConsumerNode)==null?void 0:e.length)??0)>0}function Xe(t){t.producerNode??(t.producerNode=[]),t.producerIndexOfThis??(t.producerIndexOfThis=[]),t.producerLastReadVersion??(t.producerLastReadVersion=[])}function oa(t){t.liveConsumerNode??(t.liveConsumerNode=[]),t.liveConsumerIndexOfThis??(t.liveConsumerIndexOfThis=[])}function on(t){if(rn(t),or(t),t.value===aa)throw t.error;return t.value}function qi(t){let e=Object.create(Gi);e.computation=t;let r=()=>on(e);return r[nr]=e,r}var ea=Symbol("UNSET"),ta=Symbol("COMPUTING"),aa=Symbol("ERRORED"),Gi={...na,value:ea,dirty:!0,error:null,equal:tn,producerMustRecompute(t){return t.value===ea||t.value===ta},producerRecomputeValue(t){if(t.value===ta)throw new Error("Detected cycle in computations.");let e=t.value;t.value=ta;let r=Bi(t),a,n=!1;try{a=t.computation.call(t.wrapper),n=e!==ea&&e!==aa&&t.equal.call(t.wrapper,e,a)}catch(i){a=aa,t.error=i}finally{Fi(t,r)}if(n){t.value=e;return}t.value=a,t.version++}};function Ki(){throw new Error}var Wi=Ki;function ji(){Wi()}function Vi(t){let e=Object.create(Xi);e.value=t;let r=()=>(or(e),e.value);return r[nr]=e,r}function Zi(){return or(this),this.value}function Yi(t,e){Ui()||ji(),t.equal.call(t.wrapper,t.value,e)||(t.value=e,Qi(t))}var Xi={...na,equal:tn,value:void 0};function Qi(t){t.version++,Pi(),an(t)}var X=Symbol("node"),j;(t=>{var e,r,a,n,i,o;class s{constructor(d,h={}){rr(this,r),Qr(this,e);let u=Vi(d)[nr];if(this[X]=u,u.wrapper=this,h){let f=h.equals;f&&(u.equal=f),u.watched=h[t.subtle.watched],u.unwatched=h[t.subtle.unwatched]}}get(){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Zi.call(this[X])}set(d){if(!(0,t.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Di())throw new Error("Writes to signals not permitted during Watcher callback");let h=this[X];Yi(h,d)}}e=X,r=new WeakSet,a=function(){},t.isState=c=>typeof c=="object"&&Jr(r,c),t.State=s;class l{constructor(d,h){rr(this,i),Qr(this,n);let u=qi(d)[nr];if(u.consumerAllowSignalWrites=!0,this[X]=u,u.wrapper=this,h){let f=h.equals;f&&(u.equal=f),u.watched=h[t.subtle.watched],u.unwatched=h[t.subtle.unwatched]}}get(){if(!(0,t.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return on(this[X])}}n=X,i=new WeakSet,o=function(){},t.isComputed=c=>typeof c=="object"&&Jr(i,c),t.Computed=l,(c=>{var d,h,g,u,f;function _(x){let R,E=null;try{E=Ye(null),R=x()}finally{Ye(E)}return R}c.untrack=_;function y(x){var R;if(!(0,t.isComputed)(x)&&!(0,t.isWatcher)(x))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((R=x[X].producerNode)==null?void 0:R.map(E=>E.wrapper))??[]}c.introspectSources=y;function N(x){var R;if(!(0,t.isComputed)(x)&&!(0,t.isState)(x))throw new TypeError("Called introspectSinks without a Signal argument");return((R=x[X].liveConsumerNode)==null?void 0:R.map(E=>E.wrapper))??[]}c.introspectSinks=N;function M(x){if(!(0,t.isComputed)(x)&&!(0,t.isState)(x))throw new TypeError("Called hasSinks without a Signal argument");let R=x[X].liveConsumerNode;return R?R.length>0:!1}c.hasSinks=M;function D(x){if(!(0,t.isComputed)(x)&&!(0,t.isWatcher)(x))throw new TypeError("Called hasSources without a Computed or Watcher argument");let R=x[X].producerNode;return R?R.length>0:!1}c.hasSources=D;class P{constructor(R){rr(this,h),rr(this,u),Qr(this,d);let E=Object.create(na);E.wrapper=this,E.consumerMarkedDirty=R,E.consumerIsAlwaysLive=!0,E.consumerAllowSignalWrites=!1,E.producerNode=[],this[X]=E}watch(...R){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");en(this,u,f).call(this,R);let E=this[X];E.dirty=!1;let U=Ye(E);for(let Q of R)or(Q[X]);Ye(U)}unwatch(...R){if(!(0,t.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");en(this,u,f).call(this,R);let E=this[X];Xe(E);for(let U=E.producerNode.length-1;U>=0;U--)if(R.includes(E.producerNode[U].wrapper)){ir(E.producerNode[U],E.producerIndexOfThis[U]);let Q=E.producerNode.length-1;if(E.producerNode[U]=E.producerNode[Q],E.producerIndexOfThis[U]=E.producerIndexOfThis[Q],E.producerNode.length--,E.producerIndexOfThis.length--,E.nextProducerIndex--,U<E.producerNode.length){let ye=E.producerIndexOfThis[U],le=E.producerNode[U];oa(le),le.liveConsumerIndexOfThis[ye]=U}}}getPending(){if(!(0,t.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[X].producerNode.filter(E=>E.dirty).map(E=>E.wrapper)}}d=X,h=new WeakSet,g=function(){},u=new WeakSet,f=function(x){for(let R of x)if(!(0,t.isComputed)(R)&&!(0,t.isState)(R))throw new TypeError("Called watch/unwatch without a Computed or State argument")},t.isWatcher=x=>Jr(h,x),c.Watcher=P;function T(){var x;return(x=Li())==null?void 0:x.wrapper}c.currentComputed=T,c.watched=Symbol("watched"),c.unwatched=Symbol("unwatched")})(t.subtle||(t.subtle={}))})(j||(j={}));var ia=!1,sn=new j.subtle.Watcher(()=>{ia||(ia=!0,queueMicrotask(()=>{ia=!1;for(let t of sn.getPending())t.get();sn.watch()}))}),Ji=Symbol("SignalWatcherBrand"),es=new FinalizationRegistry(t=>{t.unwatch(...j.subtle.introspectSources(t))}),ln=new WeakMap;function vt(t){return t[Ji]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),t):class extends t{constructor(){super(...arguments),this._$St=new Map,this._$So=new j.State(0),this._$Si=!1}_$Sl(){var e,r;let a=[],n=[];this._$St.forEach((o,s)=>{(o?.beforeUpdate?a:n).push(s)});let i=(e=this.h)===null||e===void 0?void 0:e.getPending().filter(o=>o!==this._$Su&&!this._$St.has(o));a.forEach(o=>o.get()),(r=this._$Su)===null||r===void 0||r.get(),i.forEach(o=>o.get()),n.forEach(o=>o.get())}_$Sv(){this.isUpdatePending||queueMicrotask(()=>{this.isUpdatePending||this._$Sl()})}_$S_(){if(this.h!==void 0)return;this._$Su=new j.Computed(()=>{this._$So.get(),super.performUpdate()});let e=this.h=new j.subtle.Watcher(function(){let r=ln.get(this);r!==void 0&&(r._$Si===!1&&(new Set(this.getPending()).has(r._$Su)?r.requestUpdate():r._$Sv()),this.watch())});ln.set(e,this),es.register(this,e),e.watch(this._$Su),e.watch(...Array.from(this._$St).map(([r])=>r))}_$Sp(){if(this.h===void 0)return;let e=!1;this.h.unwatch(...j.subtle.introspectSources(this.h).filter(r=>{var a;let n=((a=this._$St.get(r))===null||a===void 0?void 0:a.manualDispose)!==!0;return n&&this._$St.delete(r),e||(e=!n),n})),e||(this._$Su=void 0,this.h=void 0,this._$St.clear())}updateEffect(e,r){var a;this._$S_();let n=new j.Computed(()=>{e()});return this.h.watch(n),this._$St.set(n,r),(a=r?.beforeUpdate)!==null&&a!==void 0&&a?j.subtle.untrack(()=>n.get()):this.updateComplete.then(()=>j.subtle.untrack(()=>n.get())),()=>{this._$St.delete(n),this.h.unwatch(n),this.isConnected===!1&&this._$Sp()}}performUpdate(){this.isUpdatePending&&(this._$S_(),this._$Si=!0,this._$So.set(this._$So.get()+1),this._$Si=!1,this._$Sl())}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}}}var be={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ue=t=>(...e)=>({_$litDirective$:t,values:e}),fe=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,a){this._$Ct=e,this._$AM=r,this._$Ci=a}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var{I:ts}=Qa;var dn=t=>t.strings===void 0,cn=()=>document.createComment(""),Qe=(t,e,r)=>{let a=t._$AA.parentNode,n=e===void 0?t._$AB:e._$AA;if(r===void 0){let i=a.insertBefore(cn(),n),o=a.insertBefore(cn(),n);r=new ts(i,o,t,t.options)}else{let i=r._$AB.nextSibling,o=r._$AM,s=o!==t;if(s){let l;r._$AQ?.(t),r._$AM=t,r._$AP!==void 0&&(l=t._$AU)!==o._$AU&&r._$AP(l)}if(i!==n||s){let l=r._$AA;for(;l!==i;){let c=l.nextSibling;a.insertBefore(l,n),l=c}}}return r},Ce=(t,e,r=t)=>(t._$AI(e,r),t),rs={},hn=(t,e=rs)=>t._$AH=e,un=t=>t._$AH,sr=t=>{t._$AR(),t._$AA.remove()};var _t=(t,e)=>{let r=t._$AN;if(r===void 0)return!1;for(let a of r)a._$AO?.(e,!1),_t(a,e);return!0},lr=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while(r?.size===0)},gn=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),os(e)}};function as(t){this._$AN!==void 0?(lr(this),this._$AM=t,gn(this)):this._$AM=t}function ns(t,e=!1,r=0){let a=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(e)if(Array.isArray(a))for(let i=r;i<a.length;i++)_t(a[i],!1),lr(a[i]);else a!=null&&(_t(a,!1),lr(a));else _t(this,t)}var os=t=>{t.type==be.CHILD&&(t._$AP??=ns,t._$AQ??=as)},Je=class extends fe{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,a){super._$AT(e,r,a),gn(this),this.isConnected=e._$AU}_$AO(e,r=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),r&&(_t(this,e),lr(this))}setValue(e){if(dn(this._$Ct))this._$Ct._$AI(e,this);else{let r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}};var sa=!1,la=new j.subtle.Watcher(async()=>{sa||(sa=!0,queueMicrotask(()=>{sa=!1;for(let t of la.getPending())t.get();la.watch()}))}),cr=class extends Je{_$S_(){var e,r;this._$Sm===void 0&&(this._$Sj=new j.Computed(()=>{var a;let n=(a=this._$SW)===null||a===void 0?void 0:a.get();return this.setValue(n),n}),this._$Sm=(r=(e=this._$Sk)===null||e===void 0?void 0:e.h)!==null&&r!==void 0?r:la,this._$Sm.watch(this._$Sj),j.subtle.untrack(()=>{var a;return(a=this._$Sj)===null||a===void 0?void 0:a.get()}))}_$Sp(){this._$Sm!==void 0&&(this._$Sm.unwatch(this._$SW),this._$Sm=void 0)}render(e){return j.subtle.untrack(()=>e.get())}update(e,[r]){var a,n;return(a=this._$Sk)!==null&&a!==void 0||(this._$Sk=(n=e.options)===null||n===void 0?void 0:n.host),r!==this._$SW&&this._$SW!==void 0&&this._$Sp(),this._$SW=r,this._$S_(),j.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$S_()}},ca=ue(cr);var da=t=>(e,...r)=>t(e,...r.map(a=>a instanceof j.State||a instanceof j.Computed?ca(a):a)),is=da(v),ss=da(Za);var Ad=j.State,Cd=j.Computed,xe=(t,e)=>new j.State(t,e),dr=(t,e)=>new j.Computed(t,e);var ls=[{pattern:/^\/(search)?$/,name:"search"},{pattern:/^\/view\/(.+)/,name:"view"},{pattern:/^\/about$/,name:"about"}];function pn(t,e=""){for(let{pattern:r,name:a}of ls){let n=r.exec(t);if(n)return{name:a,path:n[1],params:new URLSearchParams(e)}}return{name:"not-found",params:new URLSearchParams(e)}}var ie=xe(pn(window.location.pathname,window.location.search));window.addEventListener("popstate",()=>{ie.set(pn(window.location.pathname,window.location.search))});var Pd=O`
  .matchstr {
    background: var(--color-background-matchstr);
    color: var(--color-foreground-matchstr);
    font-weight: bold;
  }
`,me=O`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
    color: var(--color-foreground-accent);
  }
`,Ud=O`
  :host {
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
  }
`,fn=O`
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
`,et=O`
  .label {
    font-weight: bold;
  }
`,bn=O`
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
`,mn=O`
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
`,zd=O`
  .hidden {
    display: none !important;
  }
`;var vn=(t,e,r)=>{let a=new Map;for(let n=e;n<=r;n++)a.set(t[n],n);return a},_n=ue(class extends fe{constructor(t){if(super(t),t.type!==be.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let a;r===void 0?r=e:e!==void 0&&(a=e);let n=[],i=[],o=0;for(let s of t)n[o]=a?a(s,o):o,i[o]=r(s,o),o++;return{values:i,keys:n}}render(t,e,r){return this.dt(t,e,r).values}update(t,[e,r,a]){let n=un(t),{values:i,keys:o}=this.dt(e,r,a);if(!Array.isArray(n))return this.ut=o,i;let s=this.ut??=[],l=[],c,d,h=0,g=n.length-1,u=0,f=i.length-1;for(;h<=g&&u<=f;)if(n[h]===null)h++;else if(n[g]===null)g--;else if(s[h]===o[u])l[u]=Ce(n[h],i[u]),h++,u++;else if(s[g]===o[f])l[f]=Ce(n[g],i[f]),g--,f--;else if(s[h]===o[f])l[f]=Ce(n[h],i[f]),Qe(t,l[f+1],n[h]),h++,f--;else if(s[g]===o[u])l[u]=Ce(n[g],i[u]),Qe(t,n[h],n[g]),g--,u++;else if(c===void 0&&(c=vn(o,u,f),d=vn(s,h,g)),c.has(s[h]))if(c.has(s[g])){let _=d.get(o[u]),y=_!==void 0?n[_]:null;if(y===null){let N=Qe(t,n[h]);Ce(N,i[u]),l[u]=N}else l[u]=Ce(y,i[u]),Qe(t,n[h],y),n[_]=null;u++}else sr(n[g]),g--;else sr(n[h]),h++;for(;u<=f;){let _=Qe(t,l[f+1]);Ce(_,i[u]),l[u++]=_}for(;h<=g;){let _=n[h++];_!==null&&sr(_)}return this.ut=o,hn(t,l),re}});var yt=class t extends Event{constructor(e){super(t.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};yt.eventName="rangeChanged";var wt=class t extends Event{constructor(e){super(t.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}};wt.eventName="visibilityChanged";var Et=class t extends Event{constructor(){super(t.eventName,{bubbles:!1})}};Et.eventName="unpinned";var ha=class{constructor(e){this._element=null;let r=e??window;this._node=r,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}},hr=class extends ha{constructor(e,r){super(r),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);let a=this._node;this._originalScrollTo=a.scrollTo,this._originalScrollBy=a.scrollBy,this._originalScroll=a.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return this._destination!==null}scrollTo(e,r){let a=typeof e=="number"&&typeof r=="number"?{left:e,top:r}:e;this._scrollTo(a)}scrollBy(e,r){let a=typeof e=="number"&&typeof r=="number"?{left:e,top:r}:e;a.top!==void 0&&(a.top+=this.scrollTop),a.left!==void 0&&(a.left+=this.scrollLeft),this._scrollTo(a)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,r=null,a=null){this._end!==null&&this._end(),e.behavior==="smooth"?(this._setDestination(e),this._retarget=r,this._end=a):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:r,left:a}=e;return r=r===void 0?void 0:Math.max(0,Math.min(r,this.maxScrollTop)),a=a===void 0?void 0:Math.max(0,Math.min(a,this.maxScrollLeft)),this._destination!==null&&a===this._destination.left&&r===this._destination.top?!1:(this.__destination={top:r,left:a,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,r,a){return this._scrollTo(e,r,a),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(this._destination!==null){let{scrollTop:e,scrollLeft:r}=this,{top:a,left:n}=this._destination;a=Math.min(a||0,this.maxScrollTop),n=Math.min(n||0,this.maxScrollLeft);let i=Math.abs(a-e),o=Math.abs(n-r);i<1&&o<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients.delete(e),this._clients.size===0&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.add(e),this._clients.size===1&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}};var Sn=typeof window<"u"?window.ResizeObserver:void 0;var Cn=Symbol("virtualizerRef"),pr="virtualizer-sizer",Nn,br=class{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!e)throw new Error("Virtualizer constructor requires a configuration object");if(e.hostElement)this._init(e);else throw new Error('Virtualizer configuration requires the "hostElement" property')}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e);let r=e.layout||{};this._layoutInitialized=this._initLayout(r)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new Sn(()=>this._hostElementSizeChanged()),this._childrenRO=new Sn(this._childrenSizeChanged.bind(this))}_initHostElement(e){let r=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),r[Cn]=this}connected(){this._initObservers();let e=this._isScroller;this._clippingAncestors=fs(this._hostElement,e),this._scrollerController=new hr(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(e=>this._childrenRO.observe(e)),this._scrollEventListeners.forEach(e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){let r=this._hostElement.style;r.display=r.display||"block",r.position=r.position||"relative",r.contain=r.contain||"size layout",this._isScroller&&(r.overflow=r.overflow||"auto",r.minHeight=r.minHeight||"150px")}_getSizer(){let e=this._hostElement;if(!this._sizer){let r=e.querySelector(`[${pr}]`);r||(r=document.createElement("div"),r.setAttribute(pr,""),e.appendChild(r)),Object.assign(r.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),r.textContent="&nbsp;",r.setAttribute(pr,""),this._sizer=r}return this._sizer}async updateLayoutConfig(e){await this._layoutInitialized;let r=e.type||Nn;if(typeof r=="function"&&this._layout instanceof r){let a={...e};return delete a.type,this._layout.config=a,!0}return!1}async _initLayout(e){let r,a;if(typeof e.type=="function"){a=e.type;let n={...e};delete n.type,r=n}else r=e;a===void 0&&(Nn=a=(await Promise.resolve().then(()=>(xn(),kn))).FlowLayout),this._layout=new a(n=>this._handleLayoutMessage(n),r),this._layout.measureChildren&&typeof this._layout.updateItemSizes=="function"&&(typeof this._layout.measureChildren=="function"&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){this._benchmarkStart===null&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(this._benchmarkStart!==null){let e=window.performance.now(),r=e-this._benchmarkStart,n=performance.getEntriesByName("uv-virtualizing","measure").filter(i=>i.startTime>=this._benchmarkStart&&i.startTime<e).reduce((i,o)=>i+o.duration,0);return this._benchmarkStart=null,{timeElapsed:r,virtualizationTime:n}}return null}_measureChildren(){let e={},r=this._children,a=this._measureChildOverride||this._measureChild;for(let n=0;n<r.length;n++){let i=r[n],o=this._first+n;(this._itemsChanged||this._toBeMeasured.has(i))&&(e[o]=a.call(this,i,this._items[o]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){let{width:r,height:a}=e.getBoundingClientRect();return Object.assign({width:r,height:a},gs(e))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(e){this._scrollSize=e.scrollSize,this._adjustRange(e.range),this._childrenPos=e.childPositions,this._scrollError=e.scrollError||null;let{_rangeChanged:r,_itemsChanged:a}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(r||a)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(e=>this._childrenRO.observe(e)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),this._childMeasurements!==null&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(e){console.warn("Error measuring performance data: ",e)}window.performance.mark("uv-start")}this._scrollerController.correctingScrollError===!1&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(e){e.type==="scroll"?(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent():console.warn("event not handled",e)}_handleLayoutMessage(e){e.type==="stateChanged"?this._updateDOM(e):e.type==="visibilityChanged"?(this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._notifyVisibility()):e.type==="unpinned"&&this._hostElement.dispatchEvent(new Et)}get _children(){let e=[],r=this._hostElement.firstElementChild;for(;r;)r.hasAttribute(pr)||e.push(r),r=r.nextElementSibling;return e}_updateView(){let e=this._hostElement,r=this._scrollerController?.element,a=this._layout;if(e&&r&&a){let n,i,o,s,l=e.getBoundingClientRect();n=0,i=0,o=window.innerHeight,s=window.innerWidth;let c=this._clippingAncestors.map(N=>N.getBoundingClientRect());c.unshift(l);for(let N of c)n=Math.max(n,N.top),i=Math.max(i,N.left),o=Math.min(o,N.bottom),s=Math.min(s,N.right);let d=r.getBoundingClientRect(),h={left:l.left-d.left,top:l.top-d.top},g={width:r.scrollWidth,height:r.scrollHeight},u=n-l.top+e.scrollTop,f=i-l.left+e.scrollLeft,_=Math.max(0,o-n),y=Math.max(0,s-i);a.viewportSize={width:y,height:_},a.viewportScroll={top:u,left:f},a.totalScrollSize=g,a.offsetWithinScroller=h}}_sizeHostElement(e){let a=e&&e.width!==null?Math.min(82e5,e.width):0,n=e&&e.height!==null?Math.min(82e5,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${a}px, ${n}px)`;else{let i=this._hostElement.style;i.minWidth=a?`${a}px`:"100%",i.minHeight=n?`${n}px`:"100%"}}_positionChildren(e){e&&e.forEach(({top:r,left:a,width:n,height:i,xOffset:o,yOffset:s},l)=>{let c=this._children[l-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${a}px, ${r}px)`,n!==void 0&&(c.style.width=n+"px"),i!==void 0&&(c.style.height=i+"px"),c.style.left=o===void 0?null:o+"px",c.style.top=s===void 0?null:s+"px")})}async _adjustRange(e){let{_first:r,_last:a,_firstVisible:n,_lastVisible:i}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==r||this._last!==a,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==n||this._lastVisible!==i}_correctScrollError(){if(this._scrollError){let{scrollTop:e,scrollLeft:r}=this._scrollerController,{top:a,left:n}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-a,left:r-n})}}element(e){return e===1/0&&(e=this._items.length-1),this._items?.[e]===void 0?void 0:{scrollIntoView:(r={})=>this._scrollElementIntoView({...r,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),e.behavior==="smooth"){let r=this._layout.getScrollIntoViewCoordinates(e),{behavior:a}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(r,{behavior:a}),()=>this._layout.getScrollIntoViewCoordinates(e),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){let{index:r}=this._scrollIntoViewTarget||{};r&&e?.has(r)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new yt({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new wt({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((e,r)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=r})),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){this._layoutCompleteRejecter!==null&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&this._pendingLayoutComplete===null&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){this._layoutCompleteResolver!==null&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout?.measureChildren){for(let r of e)this._toBeMeasured.set(r.target,r.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}};function gs(t){let e=window.getComputedStyle(t);return{marginTop:fr(e.marginTop),marginRight:fr(e.marginRight),marginBottom:fr(e.marginBottom),marginLeft:fr(e.marginLeft)}}function fr(t){let e=t?parseFloat(t):NaN;return Number.isNaN(e)?0:e}function An(t){if(t.assignedSlot!==null)return t.assignedSlot;if(t.parentElement!==null)return t.parentElement;let e=t.parentNode;return e&&e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host||null}function ps(t,e=!1){let r=[],a=e?t:An(t);for(;a!==null;)r.push(a),a=An(a);return r}function fs(t,e=!1){let r=!1;return ps(t,e).filter(a=>{if(r)return!1;let n=getComputedStyle(a);return r=n.position==="fixed",n.overflow!=="visible"})}var bs=t=>t,ms=(t,e)=>v`${e}: ${JSON.stringify(t,null,2)}`,pa=class extends Je{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(r,a)=>ms(r,a+this._first),this._keyFunction=(r,a)=>bs(r,a+this._first),this._items=[],e.type!==be.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);let r=[];if(this._first>=0&&this._last>=this._first)for(let a=this._first;a<=this._last;a++)r.push(this._items[a]);return _n(r,this._keyFunction,this._renderItem)}update(e,[r]){this._setFunctions(r);let a=this._items!==r.items;return this._items=r.items||[],this._virtualizer?this._updateVirtualizerConfig(e,r):this._initialize(e,r),a?re:this.render()}async _updateVirtualizerConfig(e,r){if(!await this._virtualizer.updateLayoutConfig(r.layout||{})){let n=e.parentNode;this._makeVirtualizer(n,r)}this._virtualizer.items=this._items}_setFunctions(e){let{renderItem:r,keyFunction:a}=e;r&&(this._renderItem=(n,i)=>r(n,i+this._first)),a&&(this._keyFunction=(n,i)=>a(n,i+this._first))}_makeVirtualizer(e,r){this._virtualizer&&this._virtualizer.disconnected();let{layout:a,scroller:n,items:i}=r;this._virtualizer=new br({hostElement:e,layout:a,scroller:n}),this._virtualizer.items=i,this._virtualizer.connected()}_initialize(e,r){let a=e.parentNode;a&&a.nodeType===1&&(a.addEventListener("rangeChanged",n=>{this._first=n.first,this._last=n.last,this.setValue(this.render())}),this._makeVirtualizer(a,r))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}},Tn=ue(pa);async function Rn(t,e,r){let a="/api/search?"+t.toString(),n=await fetch(a,{signal:r});if(!n.ok){let i=await n.text();throw new Error(`search failed (${n.status}): ${i}`)}if(!n.body)throw new Error("response has no body");await vs(n.body,i=>{switch(i.type){case"result":e.onResult?.(i);break;case"file":e.onFile?.(i);break;case"facets":e.onFacets?.(i);break;case"done":e.onDone?.(i);break}})}async function vs(t,e){let r=t.getReader(),a=new TextDecoder,n="";try{for(;;){let{done:o,value:s}=await r.read();if(o)break;n+=a.decode(s,{stream:!0});let l;for(;(l=n.indexOf(`
`))!==-1;){let c=n.slice(0,l).trim();n=n.slice(l+1),c.length!==0&&e(JSON.parse(c))}}n+=a.decode();let i=n.trim();i.length>0&&e(JSON.parse(i))}finally{r.releaseLock()}}function tt(t){let e=t.indexOf("/+/");if(e===-1)return{repo:t,version:"",filePath:""};let r=t.slice(0,e),a=t.slice(e+3),n=r.lastIndexOf("/");return n===-1?{repo:r,version:"",filePath:a}:{repo:r.slice(0,n),version:r.slice(n+1),filePath:a}}function On(t,e={},r={}){let a=new URLSearchParams;if(t.trim()&&a.set("q",t.trim()),e.literal&&a.set("literal","true"),e.caseSensitive&&a.set("fold_case","false"),e.repos?.length)for(let n of e.repos)a.append("repo",n);for(let[n,i]of Object.entries(r))for(let o of i)a.append(n,o);return a}var vr=class{constructor(){this.lastCommittedUrl=""}commit(e,r={},a={}){let n=On(e,r,a),i=e?`${e} \xB7 code search`:"code search",o=mr(n);if(!e)return this.lastCommittedUrl="",[{type:"replaceUrl",url:mr(new URLSearchParams),title:i},{type:"clearResults"}];let s=[];return o!==this.lastCommittedUrl&&this.lastCommittedUrl!==""?s.push({type:"pushUrl",url:o,title:i}):s.push({type:"replaceUrl",url:o,title:i}),s.push({type:"search",params:n}),this.lastCommittedUrl=o,s}popstate(e,r){this.lastCommittedUrl=mr(r);let a=e?`${e} \xB7 code search`:"code search",n=[{type:"replaceUrl",url:mr(r),title:a}];return e?n.push({type:"search",params:r}):n.push({type:"clearResults"}),n}};function mr(t){let e=t.toString();return"/search"+(e?"?"+e:"")}var _r=class{constructor(){this.results=[];this.files=[];this.dirty=!1;this.flushed=!1}start(){return this.results=[],this.files=[],this.dirty=!1,this.flushed=!1,{loading:!0,error:null,done:null}}onResult(e){this.results.push(e),this.dirty=!0}onFile(e){this.files.push(e),this.dirty=!0}flush(){if(!this.dirty)return null;this.dirty=!1;let e={results:[...this.results],files:[...this.files]};return this.flushed||(e.facets=null,this.flushed=!0),e}onFacets(e){return{facets:e}}onDone(e){return{results:this.results,files:this.files,done:e,loading:!1}}onError(e){return{error:e,loading:!1}}};var rt=dr(()=>ie.get().params.get("q")??""),_s=dr(()=>{let t=ie.get().params;return{literal:t.get("literal")==="true",caseSensitive:t.get("fold_case")==="false"}}),Mn=dr(()=>{let t=ie.get().params.get("context");if(t!==null){let e=parseInt(t,10);if(!isNaN(e)&&e>=0)return e}return 3}),St=xe([]),Nt=xe([]),At=xe(null),Ct=xe(null),Tt=xe(!1),Rt=xe(null),fa=null;async function ys(){fa&&fa.abort();let t=new AbortController;if(fa=t,!rt.get()){St.set([]),Nt.set([]),At.set(null),Ct.set(null),Tt.set(!1),Rt.set(null);return}let r=ie.get(),a=new URLSearchParams(r.params),n=new _r;xt(n.start());let i=setInterval(()=>{let o=n.flush();o&&xt(o)},100);try{await Rn(a,{onResult(o){n.onResult(o)},onFile(o){n.onFile(o)},onFacets(o){xt(n.onFacets(o))},onDone(o){clearInterval(i),xt(n.onDone(o))}},t.signal)}catch(o){clearInterval(i),t.signal.aborted||xt(n.onError(o instanceof Error?o.message:String(o)))}}function xt(t){"results"in t&&St.set(t.results),"files"in t&&Nt.set(t.files),"facets"in t&&At.set(t.facets),"done"in t&&Ct.set(t.done),"loading"in t&&Tt.set(t.loading),"error"in t&&Rt.set(t.error)}var yr=new vr,Ue=null;function In(t,e={},r={}){Ue&&clearTimeout(Ue),Ue=setTimeout(()=>{Ue=null,Er(yr.commit(t,e,r))},200)}function wr(t,e={},r={}){Ue&&(clearTimeout(Ue),Ue=null),Er(yr.commit(t,e,r))}function ws(){let t=rt.get();if(t){let e=_s.get(),r=ie.get(),a={};for(let n of["f.ext","f.repo","f.path"]){let i=r.params.getAll(n);i.length>0&&(a[n]=i)}Er(yr.commit(t,e,a))}}ws();window.addEventListener("popstate",()=>{let t=ie.get(),e=t.params.get("q")??"";Er(yr.popstate(e,t.params))});function Er(t){for(let e of t)switch(e.type){case"pushUrl":history.pushState(null,e.title,e.url),document.title=e.title,ie.set({name:"search",params:new URLSearchParams(new URL(e.url,location.origin).search)});break;case"replaceUrl":history.replaceState(null,e.title,e.url),document.title=e.title,ie.set({name:"search",params:new URLSearchParams(new URL(e.url,location.origin).search)});break;case"search":ys();break;case"clearResults":St.set([]),Nt.set([]),At.set(null),Ct.set(null),Tt.set(!1),Rt.set(null);break}}var ze=class extends ${constructor(){super(...arguments);this.value="";this.error=""}render(){return v`
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
          ${this.error?v`<span id="errortext">${this.error}</span>`:q}
        </div>
      </div>
    `}onInput(){let r=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-input",{detail:{value:r.value},bubbles:!0,composed:!0}))}onKeydown(r){if(r.key==="Enter"){let a=this.renderRoot.querySelector("#searchbox");this.dispatchEvent(new CustomEvent("search-submit",{detail:{value:a.value},bubbles:!0,composed:!0}))}}appendQuery(r){let a=this.renderRoot.querySelector("#searchbox");a&&(a.value+=r,this.value=a.value,this.dispatchEvent(new CustomEvent("search-input",{detail:{value:a.value},bubbles:!0,composed:!0})))}focus(){this.renderRoot.querySelector("#searchbox")?.focus()}};ze.styles=[mn,O`
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
    `],b([A()],ze.prototype,"value",2),b([A()],ze.prototype,"error",2),ze=b([z("cs-search-input")],ze);var ve=class extends ${constructor(){super(...arguments);this.groups=[];this._open=!1;this._search="";this._selected=new Set;this._onOutsideClick=r=>{this._open&&(r.composedPath().includes(this)||(this._open=!1))}}get _options(){return this.groups.flatMap(r=>r.repos.map(a=>({value:a,label:a.split("/").pop()??a,group:r.label,selected:this._selected.has(a)})))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick)}get selectedRepos(){return[...this._selected]}get _buttonText(){let r=this._selected.size;return r===0?"(all repositories)":r<=4?this._options.filter(n=>n.selected).map(n=>n.label).join(", "):`(${r} repositories)`}get _filteredGroups(){let r=this._search.toLowerCase(),a=new Map;for(let n of this._options)r&&!n.value.toLowerCase().includes(r)&&!n.label.toLowerCase().includes(r)||(a.has(n.group)||a.set(n.group,[]),a.get(n.group).push(n));return[...a.entries()].map(([n,i])=>({label:n,options:i}))}_toggleOpen(){this._open=!this._open,this._open&&this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()})}_toggleOption(r){let a=new Set(this._selected);a.has(r)?a.delete(r):a.add(r),this._selected=a,this._fireChange()}_selectAll(){this._selected=new Set(this._options.map(r=>r.value)),this._fireChange()}_deselectAll(){this._selected=new Set,this._fireChange()}_toggleGroup(r){let a=this._options.filter(o=>o.group===r).map(o=>o.value),n=a.every(o=>this._selected.has(o)),i=new Set(this._selected);for(let o of a)n?i.delete(o):i.add(o);this._selected=i,this._fireChange()}_fireChange(){this.dispatchEvent(new Event("change",{bubbles:!0}))}_onSearchInput(r){this._search=r.target.value}_onSearchKeydown(r){r.key==="Enter"&&(r.preventDefault(),this._search=""),r.key==="Escape"&&(this._open=!1)}render(){return v`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open?this._renderDropdown():q}
        `}_renderDropdown(){let r=this._filteredGroups;return v`
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
                <div class="options">${r.map(a=>this._renderGroup(a))}</div>
            </div>
        `}_renderGroup(r){return r.label?v`
            <div class="group">
                <div class="group-header" @click=${()=>this._toggleGroup(r.label)}>${r.label}</div>
                ${r.options.map(a=>this._renderOption(a))}
            </div>
        `:r.options.map(a=>this._renderOption(a))}_renderOption(r){return v`
            <label class="option ${r.selected?"selected":""}">
                <input type="checkbox" .checked=${r.selected} @change=${()=>this._toggleOption(r.value)} />
                ${r.label}
            </label>
        `}};ve.styles=O`
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
    `,b([A({type:Array})],ve.prototype,"groups",2),b([ee()],ve.prototype,"_open",2),b([ee()],ve.prototype,"_search",2),b([ee()],ve.prototype,"_selected",2),ve=b([z("repo-select")],ve);var Be=class extends ${constructor(){super(...arguments);this.options={};this.repos=[]}render(){let r=this.options.caseSensitive?"false":"auto";return v`
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
          <repo-select .groups=${this.repos} @change=${this.onRepoChange}></repo-select>
        </div>
      </div>
    `}setCase(r){let a=r==="false";this.options={...this.options,caseSensitive:a},this.fireChange()}toggleLiteral(){this.options={...this.options,literal:!this.options.literal},this.fireChange()}onRepoChange(){let a=this.renderRoot.querySelector("repo-select")?.selectedRepos??[];this.options={...this.options,repos:a.length>0?a:void 0},this.fireChange()}fireChange(){this.dispatchEvent(new CustomEvent("options-change",{detail:this.options,bubbles:!0,composed:!0}))}};Be.styles=[bn,et,O`
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
    `],b([A({type:Object})],Be.prototype,"options",2),b([A({type:Array})],Be.prototype,"repos",2),Be=b([z("cs-search-options")],Be);var eo=vi(Jn(),1);var xa=eo.default;function to(t){let i={keyword:["break","case","chan","const","continue","default","defer","else","fallthrough","for","func","go","goto","if","import","interface","map","package","range","return","select","struct","switch","type","var"],type:["bool","byte","complex64","complex128","error","float32","float64","int8","int16","int32","int64","string","uint8","uint16","uint32","uint64","int","uint","uintptr","rune"],literal:["true","false","iota","nil"],built_in:["append","cap","close","complex","copy","imag","len","make","new","panic","print","println","real","recover","delete"]};return{name:"Go",aliases:["golang"],keywords:i,illegal:"</",contains:[t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE,{className:"string",variants:[t.QUOTE_STRING_MODE,t.APOS_STRING_MODE,{begin:"`",end:"`"}]},{className:"number",variants:[{match:/-?\b0[xX]\.[a-fA-F0-9](_?[a-fA-F0-9])*[pP][+-]?\d(_?\d)*i?/,relevance:0},{match:/-?\b0[xX](_?[a-fA-F0-9])+((\.([a-fA-F0-9](_?[a-fA-F0-9])*)?)?[pP][+-]?\d(_?\d)*)?i?/,relevance:0},{match:/-?\b0[oO](_?[0-7])*i?/,relevance:0},{match:/-?\.\d(_?\d)*([eE][+-]?\d(_?\d)*)?i?/,relevance:0},{match:/-?\b\d(_?\d)*(\.(\d(_?\d)*)?)?([eE][+-]?\d(_?\d)*)?i?/,relevance:0}]},{begin:/:=/},{className:"function",beginKeywords:"func",end:"\\s*(\\{|$)",excludeEnd:!0,contains:[t.TITLE_MODE,{className:"params",begin:/\(/,end:/\)/,endsParent:!0,keywords:i,illegal:/["']/}]}]}}function ro(t){let e=t.regex,r=/[\p{XID_Start}_]\p{XID_Continue}*/u,a=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],s={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:a,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},l={className:"meta",begin:/^(>>>|\.\.\.) /},c={className:"subst",begin:/\{/,end:/\}/,keywords:s,illegal:/#/},d={begin:/\{\{/,relevance:0},h={className:"string",contains:[t.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[t.BACKSLASH_ESCAPE,l],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[t.BACKSLASH_ESCAPE,l],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[t.BACKSLASH_ESCAPE,l,d,c]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[t.BACKSLASH_ESCAPE,l,d,c]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[t.BACKSLASH_ESCAPE,d,c]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[t.BACKSLASH_ESCAPE,d,c]},t.APOS_STRING_MODE,t.QUOTE_STRING_MODE]},g="[0-9](_?[0-9])*",u=`(\\b(${g}))?\\.(${g})|\\b(${g})\\.`,f=`\\b|${a.join("|")}`,_={className:"number",relevance:0,variants:[{begin:`(\\b(${g})|(${u}))[eE][+-]?(${g})[jJ]?(?=${f})`},{begin:`(${u})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${f})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${f})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${f})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${f})`},{begin:`\\b(${g})[jJ](?=${f})`}]},y={className:"comment",begin:e.lookahead(/# type:/),end:/$/,keywords:s,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},N={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:["self",l,_,h,t.HASH_COMMENT_MODE]}]};return c.contains=[h,_,l],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:s,illegal:/(<\/|\?)|=>/,contains:[l,_,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},h,y,t.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,r],scope:{1:"keyword",3:"title.function"},contains:[N]},{variants:[{match:[/\bclass/,/\s+/,r,/\s*/,/\(\s*/,r,/\s*\)/]},{match:[/\bclass/,/\s+/,r]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[_,N,h]}]}}function ao(t){let e=t.regex,r=/(r#)?/,a=e.concat(r,t.UNDERSCORE_IDENT_RE),n=e.concat(r,t.IDENT_RE),i={className:"title.function.invoke",relevance:0,begin:e.concat(/\b/,/(?!let|for|while|if|else|match\b)/,n,e.lookahead(/\s*\(/))},o="([ui](8|16|32|64|128|size)|f(32|64))?",s=["abstract","as","async","await","become","box","break","const","continue","crate","do","dyn","else","enum","extern","false","final","fn","for","if","impl","in","let","loop","macro","match","mod","move","mut","override","priv","pub","ref","return","self","Self","static","struct","super","trait","true","try","type","typeof","union","unsafe","unsized","use","virtual","where","while","yield"],l=["true","false","Some","None","Ok","Err"],c=["drop ","Copy","Send","Sized","Sync","Drop","Fn","FnMut","FnOnce","ToOwned","Clone","Debug","PartialEq","PartialOrd","Eq","Ord","AsRef","AsMut","Into","From","Default","Iterator","Extend","IntoIterator","DoubleEndedIterator","ExactSizeIterator","SliceConcatExt","ToString","assert!","assert_eq!","bitflags!","bytes!","cfg!","col!","concat!","concat_idents!","debug_assert!","debug_assert_eq!","env!","eprintln!","panic!","file!","format!","format_args!","include_bytes!","include_str!","line!","local_data_key!","module_path!","option_env!","print!","println!","select!","stringify!","try!","unimplemented!","unreachable!","vec!","write!","writeln!","macro_rules!","assert_ne!","debug_assert_ne!"],d=["i8","i16","i32","i64","i128","isize","u8","u16","u32","u64","u128","usize","f32","f64","str","char","bool","Box","Option","Result","String","Vec"];return{name:"Rust",aliases:["rs"],keywords:{$pattern:t.IDENT_RE+"!?",type:d,keyword:s,literal:l,built_in:c},illegal:"</",contains:[t.C_LINE_COMMENT_MODE,t.COMMENT("/\\*","\\*/",{contains:["self"]}),t.inherit(t.QUOTE_STRING_MODE,{begin:/b?"/,illegal:null}),{className:"symbol",begin:/'[a-zA-Z_][a-zA-Z0-9_]*(?!')/},{scope:"string",variants:[{begin:/b?r(#*)"(.|\n)*?"\1(?!#)/},{begin:/b?'/,end:/'/,contains:[{scope:"char.escape",match:/\\('|\w|x\w{2}|u\w{4}|U\w{8})/}]}]},{className:"number",variants:[{begin:"\\b0b([01_]+)"+o},{begin:"\\b0o([0-7_]+)"+o},{begin:"\\b0x([A-Fa-f0-9_]+)"+o},{begin:"\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)"+o}],relevance:0},{begin:[/fn/,/\s+/,a],className:{1:"keyword",3:"title.function"}},{className:"meta",begin:"#!?\\[",end:"\\]",contains:[{className:"string",begin:/"/,end:/"/,contains:[t.BACKSLASH_ESCAPE]}]},{begin:[/let/,/\s+/,/(?:mut\s+)?/,a],className:{1:"keyword",3:"keyword",4:"variable"}},{begin:[/for/,/\s+/,a,/\s+/,/in/],className:{1:"keyword",3:"variable",5:"keyword"}},{begin:[/type/,/\s+/,a],className:{1:"keyword",3:"title.class"}},{begin:[/(?:trait|enum|struct|union|impl|for)/,/\s+/,a],className:{1:"keyword",3:"title.class"}},{begin:t.IDENT_RE+"::",keywords:{keyword:"Self",built_in:c,type:d}},{className:"punctuation",begin:"->"},i]}}var Ar="[A-Za-z$_][0-9A-Za-z$_]*",no=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],oo=["true","false","null","undefined","NaN","Infinity"],io=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],so=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],lo=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],co=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ho=[].concat(lo,io,so);function hl(t){let e=t.regex,r=(w,{after:I})=>{let B="</"+w[0].slice(1);return w.input.indexOf(B,I)!==-1},a=Ar,n={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(w,I)=>{let B=w[0].length+w.index,K=w.input[B];if(K==="<"||K===","){I.ignoreMatch();return}K===">"&&(r(w,{after:B})||I.ignoreMatch());let V,ce=w.input.substring(B);if(V=ce.match(/^\s*=/)){I.ignoreMatch();return}if((V=ce.match(/^\s+extends\s+/))&&V.index===0){I.ignoreMatch();return}}},s={$pattern:Ar,keyword:no,literal:oo,built_in:ho,"variable.language":co},l="[0-9](_?[0-9])*",c=`\\.(${l})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${d})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${d})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},g={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},u={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,g],subLanguage:"xml"}},f={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,g],subLanguage:"css"}},_={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,g],subLanguage:"graphql"}},y={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,g]},M={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},D=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,u,f,_,y,{match:/\$\d+/},h];g.contains=D.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(D)});let P=[].concat(M,g.contains),T=P.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:["self"].concat(P)}]),x={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T},R={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,e.concat(a,"(",e.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},E={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...io,...so]}},U={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},Q={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[x],illegal:/%/},ye={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function le(w){return e.concat("(?!",w.join("|"),")")}let Ne={match:e.concat(/\b/,le([...lo,"super","import"].map(w=>`${w}\\s*\\(`)),a,e.lookahead(/\s*\(/)),className:"title.function",relevance:0},he={begin:e.concat(/\./,e.lookahead(e.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},Oe={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},x]},p="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",k={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(p)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[x]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:E},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),U,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,u,f,_,y,M,{match:/\$\d+/},h,E,{scope:"attr",match:a+e.lookahead(":"),relevance:0},k,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[M,t.REGEXP_MODE,{className:"function",begin:p,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:i},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},Q,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[x,t.inherit(t.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},he,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[x]},Ne,ye,R,Oe,{match:/\$[(.]/}]}}function uo(t){let e=t.regex,r=hl(t),a=Ar,n=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],i={begin:[/namespace/,/\s+/,t.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},o={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:n},contains:[r.exports.CLASS_REFERENCE]},s={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},l=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],c={$pattern:Ar,keyword:no.concat(l),literal:oo,built_in:ho.concat(n),"variable.language":co},d={className:"meta",begin:"@"+a},h=(_,y,N)=>{let M=_.contains.findIndex(D=>D.label===y);if(M===-1)throw new Error("can not find mode to replace");_.contains.splice(M,1,N)};Object.assign(r.keywords,c),r.exports.PARAMS_CONTAINS.push(d);let g=r.contains.find(_=>_.scope==="attr"),u=Object.assign({},g,{match:e.concat(a,e.lookahead(/\s*\?:/))});r.exports.PARAMS_CONTAINS.push([r.exports.CLASS_REFERENCE,g,u]),r.contains=r.contains.concat([d,i,o,u]),h(r,"shebang",t.SHEBANG()),h(r,"use_strict",s);let f=r.contains.find(_=>_.label==="func.def");return f.relevance=0,Object.assign(r,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),r}var go="[A-Za-z$_][0-9A-Za-z$_]*",ul=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],gl=["true","false","null","undefined","NaN","Infinity"],po=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],fo=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],bo=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],pl=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],fl=[].concat(bo,po,fo);function mo(t){let e=t.regex,r=(w,{after:I})=>{let B="</"+w[0].slice(1);return w.input.indexOf(B,I)!==-1},a=go,n={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(w,I)=>{let B=w[0].length+w.index,K=w.input[B];if(K==="<"||K===","){I.ignoreMatch();return}K===">"&&(r(w,{after:B})||I.ignoreMatch());let V,ce=w.input.substring(B);if(V=ce.match(/^\s*=/)){I.ignoreMatch();return}if((V=ce.match(/^\s+extends\s+/))&&V.index===0){I.ignoreMatch();return}}},s={$pattern:go,keyword:ul,literal:gl,built_in:fl,"variable.language":pl},l="[0-9](_?[0-9])*",c=`\\.(${l})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${d})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${d})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},g={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},u={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,g],subLanguage:"xml"}},f={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,g],subLanguage:"css"}},_={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,g],subLanguage:"graphql"}},y={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,g]},M={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},D=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,u,f,_,y,{match:/\$\d+/},h];g.contains=D.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(D)});let P=[].concat(M,g.contains),T=P.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:["self"].concat(P)}]),x={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T},R={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,e.concat(a,"(",e.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},E={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...po,...fo]}},U={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},Q={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[x],illegal:/%/},ye={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function le(w){return e.concat("(?!",w.join("|"),")")}let Ne={match:e.concat(/\b/,le([...bo,"super","import"].map(w=>`${w}\\s*\\(`)),a,e.lookahead(/\s*\(/)),className:"title.function",relevance:0},he={begin:e.concat(/\./,e.lookahead(e.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},Oe={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},x]},p="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",k={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(p)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[x]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:E},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),U,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,u,f,_,y,M,{match:/\$\d+/},h,E,{scope:"attr",match:a+e.lookahead(":"),relevance:0},k,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[M,t.REGEXP_MODE,{className:"function",begin:p,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:n.begin,end:n.end},{match:i},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},Q,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[x,t.inherit(t.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},he,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[x]},Ne,ye,R,Oe,{match:/\$[(.]/}]}}function vo(t){let e=t.regex,r=t.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),a="decltype\\(auto\\)",n="[a-zA-Z_]\\w*::",o="("+a+"|"+e.optional(n)+"[a-zA-Z_]\\w*"+e.optional("<[^<>]+>")+")",s={className:"type",variants:[{begin:"\\b[a-z\\d_]*_t\\b"},{match:/\batomic_[a-z]{3,6}\b/}]},c={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[t.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'("+"\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)"+"|.)",end:"'",illegal:"."},t.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},d={className:"number",variants:[{match:/\b(0b[01']+)/},{match:/(-?)\b([\d']+(\.[\d']*)?|\.[\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)/},{match:/(-?)\b(0[xX][a-fA-F0-9]+(?:'[a-fA-F0-9]+)*(?:\.[a-fA-F0-9]*(?:'[a-fA-F0-9]*)*)?(?:[pP][-+]?[0-9]+)?(l|L)?(u|U)?)/},{match:/(-?)\b\d+(?:'\d+)*(?:\.\d*(?:'\d*)*)?(?:[eE][-+]?\d+)?/}],relevance:0},h={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef elifdef elifndef include"},contains:[{begin:/\\\n/,relevance:0},t.inherit(c,{className:"string"}),{className:"string",begin:/<.*?>/},r,t.C_BLOCK_COMMENT_MODE]},g={className:"title",begin:e.optional(n)+t.IDENT_RE,relevance:0},u=e.optional(n)+t.IDENT_RE+"\\s*\\(",y={keyword:["asm","auto","break","case","continue","default","do","else","enum","extern","for","fortran","goto","if","inline","register","restrict","return","sizeof","typeof","typeof_unqual","struct","switch","typedef","union","volatile","while","_Alignas","_Alignof","_Atomic","_Generic","_Noreturn","_Static_assert","_Thread_local","alignas","alignof","noreturn","static_assert","thread_local","_Pragma"],type:["float","double","signed","unsigned","int","short","long","char","void","_Bool","_BitInt","_Complex","_Imaginary","_Decimal32","_Decimal64","_Decimal96","_Decimal128","_Decimal64x","_Decimal128x","_Float16","_Float32","_Float64","_Float128","_Float32x","_Float64x","_Float128x","const","static","constexpr","complex","bool","imaginary"],literal:"true false NULL",built_in:"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"},N=[h,s,r,t.C_BLOCK_COMMENT_MODE,d,c],M={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:y,contains:N.concat([{begin:/\(/,end:/\)/,keywords:y,contains:N.concat(["self"]),relevance:0}]),relevance:0},D={begin:"("+o+"[\\*&\\s]+)+"+u,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:y,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:a,keywords:y,relevance:0},{begin:u,returnBegin:!0,contains:[t.inherit(g,{className:"title.function"})],relevance:0},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:y,relevance:0,contains:[r,t.C_BLOCK_COMMENT_MODE,c,d,s,{begin:/\(/,end:/\)/,keywords:y,relevance:0,contains:["self",r,t.C_BLOCK_COMMENT_MODE,c,d,s]}]},s,r,t.C_BLOCK_COMMENT_MODE,h]};return{name:"C",aliases:["h"],keywords:y,disableAutodetect:!0,illegal:"</",contains:[].concat(M,D,N,[h,{begin:t.IDENT_RE+"::",keywords:y},{className:"class",beginKeywords:"enum class struct union",end:/[{;:<>=]/,contains:[{beginKeywords:"final class struct"},t.TITLE_MODE]}]),exports:{preprocessor:h,strings:c,keywords:y}}}function _o(t){let e=t.regex,r=t.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),a="decltype\\(auto\\)",n="[a-zA-Z_]\\w*::",o="(?!struct)("+a+"|"+e.optional(n)+"[a-zA-Z_]\\w*"+e.optional("<[^<>]+>")+")",s={className:"type",begin:"\\b[a-z\\d_]*_t\\b"},c={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[t.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'("+"\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)"+"|.)",end:"'",illegal:"."},t.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},d={className:"number",variants:[{begin:"[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"},{begin:"[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"}],relevance:0},h={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},t.inherit(c,{className:"string"}),{className:"string",begin:/<.*?>/},r,t.C_BLOCK_COMMENT_MODE]},g={className:"title",begin:e.optional(n)+t.IDENT_RE,relevance:0},u=e.optional(n)+t.IDENT_RE+"\\s*\\(",f=["alignas","alignof","and","and_eq","asm","atomic_cancel","atomic_commit","atomic_noexcept","auto","bitand","bitor","break","case","catch","class","co_await","co_return","co_yield","compl","concept","const_cast|10","consteval","constexpr","constinit","continue","decltype","default","delete","do","dynamic_cast|10","else","enum","explicit","export","extern","false","final","for","friend","goto","if","import","inline","module","mutable","namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq","override","private","protected","public","reflexpr","register","reinterpret_cast|10","requires","return","sizeof","static_assert","static_cast|10","struct","switch","synchronized","template","this","thread_local","throw","transaction_safe","transaction_safe_dynamic","true","try","typedef","typeid","typename","union","using","virtual","volatile","while","xor","xor_eq"],_=["bool","char","char16_t","char32_t","char8_t","double","float","int","long","short","void","wchar_t","unsigned","signed","const","static"],y=["any","auto_ptr","barrier","binary_semaphore","bitset","complex","condition_variable","condition_variable_any","counting_semaphore","deque","false_type","flat_map","flat_set","future","imaginary","initializer_list","istringstream","jthread","latch","lock_guard","multimap","multiset","mutex","optional","ostringstream","packaged_task","pair","promise","priority_queue","queue","recursive_mutex","recursive_timed_mutex","scoped_lock","set","shared_future","shared_lock","shared_mutex","shared_timed_mutex","shared_ptr","stack","string_view","stringstream","timed_mutex","thread","true_type","tuple","unique_lock","unique_ptr","unordered_map","unordered_multimap","unordered_multiset","unordered_set","variant","vector","weak_ptr","wstring","wstring_view"],N=["abort","abs","acos","apply","as_const","asin","atan","atan2","calloc","ceil","cerr","cin","clog","cos","cosh","cout","declval","endl","exchange","exit","exp","fabs","floor","fmod","forward","fprintf","fputs","free","frexp","fscanf","future","invoke","isalnum","isalpha","iscntrl","isdigit","isgraph","islower","isprint","ispunct","isspace","isupper","isxdigit","labs","launder","ldexp","log","log10","make_pair","make_shared","make_shared_for_overwrite","make_tuple","make_unique","malloc","memchr","memcmp","memcpy","memset","modf","move","pow","printf","putchar","puts","realloc","scanf","sin","sinh","snprintf","sprintf","sqrt","sscanf","std","stderr","stdin","stdout","strcat","strchr","strcmp","strcpy","strcspn","strlen","strncat","strncmp","strncpy","strpbrk","strrchr","strspn","strstr","swap","tan","tanh","terminate","to_underlying","tolower","toupper","vfprintf","visit","vprintf","vsprintf"],P={type:_,keyword:f,literal:["NULL","false","nullopt","nullptr","true"],built_in:["_Pragma"],_type_hints:y},T={className:"function.dispatch",relevance:0,keywords:{_hint:N},begin:e.concat(/\b/,/(?!decltype)/,/(?!if)/,/(?!for)/,/(?!switch)/,/(?!while)/,t.IDENT_RE,e.lookahead(/(<[^<>]+>|)\s*\(/))},x=[T,h,s,r,t.C_BLOCK_COMMENT_MODE,d,c],R={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:P,contains:x.concat([{begin:/\(/,end:/\)/,keywords:P,contains:x.concat(["self"]),relevance:0}]),relevance:0},E={className:"function",begin:"("+o+"[\\*&\\s]+)+"+u,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:P,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:a,keywords:P,relevance:0},{begin:u,returnBegin:!0,contains:[g],relevance:0},{begin:/::/,relevance:0},{begin:/:/,endsWithParent:!0,contains:[c,d]},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:P,relevance:0,contains:[r,t.C_BLOCK_COMMENT_MODE,c,d,s,{begin:/\(/,end:/\)/,keywords:P,relevance:0,contains:["self",r,t.C_BLOCK_COMMENT_MODE,c,d,s]}]},s,r,t.C_BLOCK_COMMENT_MODE,h]};return{name:"C++",aliases:["cc","c++","h++","hpp","hh","hxx","cxx"],keywords:P,illegal:"</",classNameAliases:{"function.dispatch":"built_in"},contains:[].concat(R,E,T,x,[h,{begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",end:">",keywords:P,contains:["self",s]},{begin:t.IDENT_RE+"::",keywords:P},{match:[/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,/\s+/,/\w+/],className:{1:"keyword",3:"title.class"}}])}}var ot="[0-9](_*[0-9])*",Cr=`\\.(${ot})`,Tr="[0-9a-fA-F](_*[0-9a-fA-F])*",yo={className:"number",variants:[{begin:`(\\b(${ot})((${Cr})|\\.)?|(${Cr}))[eE][+-]?(${ot})[fFdD]?\\b`},{begin:`\\b(${ot})((${Cr})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${Cr})[fFdD]?\\b`},{begin:`\\b(${ot})[fFdD]\\b`},{begin:`\\b0[xX]((${Tr})\\.?|(${Tr})?\\.(${Tr}))[pP][+-]?(${ot})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${Tr})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};function wo(t,e,r){return r===-1?"":t.replace(e,a=>wo(t,e,r-1))}function Eo(t){let e=t.regex,r="[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*",a=r+wo("(?:<"+r+"~~~(?:\\s*,\\s*"+r+"~~~)*>)?",/~~~/g,2),l={keyword:["synchronized","abstract","private","var","static","if","const ","for","while","strictfp","finally","protected","import","native","final","void","enum","else","break","transient","catch","instanceof","volatile","case","assert","package","default","public","try","switch","continue","throws","protected","public","private","module","requires","exports","do","sealed","yield","permits","goto","when"],literal:["false","true","null"],type:["char","boolean","long","float","int","byte","short","double"],built_in:["super","this"]},c={className:"meta",begin:"@"+r,contains:[{begin:/\(/,end:/\)/,contains:["self"]}]},d={className:"params",begin:/\(/,end:/\)/,keywords:l,relevance:0,contains:[t.C_BLOCK_COMMENT_MODE],endsParent:!0};return{name:"Java",aliases:["jsp"],keywords:l,illegal:/<\/|#/,contains:[t.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),{begin:/import java\.[a-z]+\./,keywords:"import",relevance:2},t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE,{begin:/"""/,end:/"""/,className:"string",contains:[t.BACKSLASH_ESCAPE]},t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,{match:[/\b(?:class|interface|enum|extends|implements|new)/,/\s+/,r],className:{1:"keyword",3:"title.class"}},{match:/non-sealed/,scope:"keyword"},{begin:[e.concat(/(?!else)/,r),/\s+/,r,/\s+/,/=(?!=)/],className:{1:"type",3:"variable",5:"operator"}},{begin:[/record/,/\s+/,r],className:{1:"keyword",3:"title.class"},contains:[d,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},{beginKeywords:"new throw return else",relevance:0},{begin:["(?:"+a+"\\s+)",t.UNDERSCORE_IDENT_RE,/\s*(?=\()/],className:{2:"title.function"},keywords:l,contains:[{className:"params",begin:/\(/,end:/\)/,keywords:l,relevance:0,contains:[c,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,yo,t.C_BLOCK_COMMENT_MODE]},t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},yo,c]}}function ko(t){let e=t.regex,r="([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)",a=e.either(/\b([A-Z]+[a-z0-9]+)+/,/\b([A-Z]+[a-z0-9]+)+[A-Z]+/),n=e.concat(a,/(::\w+)*/),o={"variable.constant":["__FILE__","__LINE__","__ENCODING__"],"variable.language":["self","super"],keyword:["alias","and","begin","BEGIN","break","case","class","defined","do","else","elsif","end","END","ensure","for","if","in","module","next","not","or","redo","require","rescue","retry","return","then","undef","unless","until","when","while","yield",...["include","extend","prepend","public","private","protected","raise","throw"]],built_in:["proc","lambda","attr_accessor","attr_reader","attr_writer","define_method","private_constant","module_function"],literal:["true","false","nil"]},s={className:"doctag",begin:"@[A-Za-z]+"},l={begin:"#<",end:">"},c=[t.COMMENT("#","$",{contains:[s]}),t.COMMENT("^=begin","^=end",{contains:[s],relevance:10}),t.COMMENT("^__END__",t.MATCH_NOTHING_RE)],d={className:"subst",begin:/#\{/,end:/\}/,keywords:o},h={className:"string",contains:[t.BACKSLASH_ESCAPE,d],variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/`/,end:/`/},{begin:/%[qQwWx]?\(/,end:/\)/},{begin:/%[qQwWx]?\[/,end:/\]/},{begin:/%[qQwWx]?\{/,end:/\}/},{begin:/%[qQwWx]?</,end:/>/},{begin:/%[qQwWx]?\//,end:/\//},{begin:/%[qQwWx]?%/,end:/%/},{begin:/%[qQwWx]?-/,end:/-/},{begin:/%[qQwWx]?\|/,end:/\|/},{begin:/\B\?(\\\d{1,3})/},{begin:/\B\?(\\x[A-Fa-f0-9]{1,2})/},{begin:/\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/},{begin:/\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/},{begin:/\B\?\\(c|C-)[\x20-\x7e]/},{begin:/\B\?\\?\S/},{begin:e.concat(/<<[-~]?'?/,e.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),contains:[t.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,contains:[t.BACKSLASH_ESCAPE,d]})]}]},g="[1-9](_?[0-9])*|0",u="[0-9](_?[0-9])*",f={className:"number",relevance:0,variants:[{begin:`\\b(${g})(\\.(${u}))?([eE][+-]?(${u})|r)?i?\\b`},{begin:"\\b0[dD][0-9](_?[0-9])*r?i?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*r?i?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*r?i?\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"},{begin:"\\b0(_?[0-7])+r?i?\\b"}]},_={variants:[{match:/\(\)/},{className:"params",begin:/\(/,end:/(?=\))/,excludeBegin:!0,endsParent:!0,keywords:o}]},x=[h,{variants:[{match:[/class\s+/,n,/\s+<\s+/,n]},{match:[/\b(class|module)\s+/,n]}],scope:{2:"title.class",4:"title.class.inherited"},keywords:o},{match:[/(include|extend)\s+/,n],scope:{2:"title.class"},keywords:o},{relevance:0,match:[n,/\.new[. (]/],scope:{1:"title.class"}},{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},{relevance:0,match:a,scope:"title.class"},{match:[/def/,/\s+/,r],scope:{1:"keyword",3:"title.function"},contains:[_]},{begin:t.IDENT_RE+"::"},{className:"symbol",begin:t.UNDERSCORE_IDENT_RE+"(!|\\?)?:",relevance:0},{className:"symbol",begin:":(?!\\s)",contains:[h,{begin:r}],relevance:0},f,{className:"variable",begin:"(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"},{className:"params",begin:/\|(?!=)/,end:/\|/,excludeBegin:!0,excludeEnd:!0,relevance:0,keywords:o},{begin:"("+t.RE_STARTERS_RE+"|unless)\\s*",keywords:"unless",contains:[{className:"regexp",contains:[t.BACKSLASH_ESCAPE,d],illegal:/\n/,variants:[{begin:"/",end:"/[a-z]*"},{begin:/%r\{/,end:/\}[a-z]*/},{begin:"%r\\(",end:"\\)[a-z]*"},{begin:"%r!",end:"![a-z]*"},{begin:"%r\\[",end:"\\][a-z]*"}]}].concat(l,c),relevance:0}].concat(l,c);d.contains=x,_.contains=x;let Q=[{begin:/^\s*=>/,starts:{end:"$",contains:x}},{className:"meta.prompt",begin:"^("+"[>?]>"+"|"+"[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]"+"|"+"(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>"+")(?=[ ])",starts:{end:"$",keywords:o,contains:x}}];return c.unshift(l),{name:"Ruby",aliases:["rb","gemspec","podspec","thor","irb"],keywords:o,illegal:/\/\*/,contains:[t.SHEBANG({binary:"ruby"})].concat(Q).concat(c).concat(x)}}function xo(t){let e=t.regex,r={},a={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[r]}]};Object.assign(r,{className:"variable",variants:[{begin:e.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},a]});let n={className:"subst",begin:/\$\(/,end:/\)/,contains:[t.BACKSLASH_ESCAPE]},i=t.inherit(t.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),o={begin:/<<-?\s*(?=\w+)/,starts:{contains:[t.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},s={className:"string",begin:/"/,end:/"/,contains:[t.BACKSLASH_ESCAPE,r,n]};n.contains.push(s);let l={match:/\\"/},c={className:"string",begin:/'/,end:/'/},d={match:/\\'/},h={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},t.NUMBER_MODE,r]},g=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],u=t.SHEBANG({binary:`(${g.join("|")})`,relevance:10}),f={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[t.inherit(t.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},_=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],y=["true","false"],N={match:/(\/[a-z._-]+)+/},M=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],D=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],P=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],T=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:_,literal:y,built_in:[...M,...D,"set","shopt",...P,...T]},contains:[u,t.SHEBANG(),f,h,i,o,N,s,l,c,d,r]}}function So(t){let e="a-zA-Z_\\-!.?+*=<>&'",r="[#]?["+e+"]["+e+"0-9/;:$#]*",a="def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord",n={$pattern:r,built_in:a+" cond apply if-not if-let if not not= =|0 <|0 >|0 <=|0 >=|0 ==|0 +|0 /|0 *|0 -|0 rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy first rest cons cast coll last butlast sigs reify second ffirst fnext nfirst nnext meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"},i={begin:r,relevance:0},o={scope:"number",relevance:0,variants:[{match:/[-+]?0[xX][0-9a-fA-F]+N?/},{match:/[-+]?0[0-7]+N?/},{match:/[-+]?[1-9][0-9]?[rR][0-9a-zA-Z]+N?/},{match:/[-+]?[0-9]+\/[0-9]+N?/},{match:/[-+]?[0-9]+((\.[0-9]*([eE][+-]?[0-9]+)?M?)|([eE][+-]?[0-9]+M?|M))/},{match:/[-+]?([1-9][0-9]*|0)N?/}]},s={scope:"character",variants:[{match:/\\o[0-3]?[0-7]{1,2}/},{match:/\\u[0-9a-fA-F]{4}/},{match:/\\(newline|space|tab|formfeed|backspace|return)/},{match:/\\\S/,relevance:0}]},l={scope:"regex",begin:/#"/,end:/"/,contains:[t.BACKSLASH_ESCAPE]},c=t.inherit(t.QUOTE_STRING_MODE,{illegal:null}),d={scope:"punctuation",match:/,/,relevance:0},h=t.COMMENT(";","$",{relevance:0}),g={className:"literal",begin:/\b(true|false|nil)\b/},u={begin:"\\[|(#::?"+r+")?\\{",end:"[\\]\\}]",relevance:0},f={className:"symbol",begin:"[:]{1,2}"+r},_={begin:"\\(",end:"\\)"},y={endsWithParent:!0,relevance:0},N={keywords:n,className:"name",begin:r,relevance:0,starts:y},M=[d,_,s,l,c,h,f,u,o,g,i],D={beginKeywords:a,keywords:{$pattern:r,keyword:a},end:'(\\[|#|\\d|"|:|\\{|\\)|\\(|$)',contains:[{className:"title",begin:r,relevance:0,excludeEnd:!0,endsParent:!0}].concat(M)};return _.contains=[D,N,y],y.contains=M,u.contains=M,{name:"Clojure",aliases:["clj","edn"],illegal:/\S/,contains:[d,_,s,l,c,h,f,u,o,g]}}function No(t){let e="true false yes no null",r="[\\w#;/?:@&=+$,.~*'()[\\]]+",a={className:"attr",variants:[{begin:/[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/},{begin:/"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/},{begin:/'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/}]},n={className:"template-variable",variants:[{begin:/\{\{/,end:/\}\}/},{begin:/%\{/,end:/\}/}]},i={className:"string",relevance:0,begin:/'/,end:/'/,contains:[{match:/''/,scope:"char.escape",relevance:0}]},o={className:"string",relevance:0,variants:[{begin:/"/,end:/"/},{begin:/\S+/}],contains:[t.BACKSLASH_ESCAPE,n]},s=t.inherit(o,{variants:[{begin:/'/,end:/'/,contains:[{begin:/''/,relevance:0}]},{begin:/"/,end:/"/},{begin:/[^\s,{}[\]]+/}]}),g={className:"number",begin:"\\b"+"[0-9]{4}(-[0-9][0-9]){0,2}"+"([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?"+"(\\.[0-9]*)?"+"([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?"+"\\b"},u={end:",",endsWithParent:!0,excludeEnd:!0,keywords:e,relevance:0},f={begin:/\{/,end:/\}/,contains:[u],illegal:"\\n",relevance:0},_={begin:"\\[",end:"\\]",contains:[u],illegal:"\\n",relevance:0},y=[a,{className:"meta",begin:"^---\\s*$",relevance:10},{className:"string",begin:"[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"},{begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:"!\\w+!"+r},{className:"type",begin:"!<"+r+">"},{className:"type",begin:"!"+r},{className:"type",begin:"!!"+r},{className:"meta",begin:"&"+t.UNDERSCORE_IDENT_RE+"$"},{className:"meta",begin:"\\*"+t.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"-(?=[ ]|$)",relevance:0},t.HASH_COMMENT_MODE,{beginKeywords:e,keywords:{literal:e}},g,{className:"number",begin:t.C_NUMBER_RE+"\\b",relevance:0},f,_,i,o],N=[...y];return N.pop(),N.push(s),u.contains=N,{name:"YAML",case_insensitive:!0,aliases:["yml"],contains:y}}function Ao(t){let e={className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},r={match:/[{}[\],:]/,className:"punctuation",relevance:0},a=["true","false","null"],n={scope:"literal",beginKeywords:a.join(" ")};return{name:"JSON",aliases:["jsonc"],keywords:{literal:a},contains:[e,r,t.QUOTE_STRING_MODE,n,t.C_NUMBER_MODE,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}function Co(t){let e=t.regex,r=e.concat(/[\p{L}_]/u,e.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),a=/[\p{L}0-9._:-]+/u,n={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},i={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},o=t.inherit(i,{begin:/\(/,end:/\)/}),s=t.inherit(t.APOS_STRING_MODE,{className:"string"}),l=t.inherit(t.QUOTE_STRING_MODE,{className:"string"}),c={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:a,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[n]},{begin:/'/,end:/'/,contains:[n]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[i,l,s,o,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[i,o,l,s]}]}]},t.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},n,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[l]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[c],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[c],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:e.concat(/</,e.lookahead(e.concat(r,e.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:r,relevance:0,starts:c}]},{className:"tag",begin:e.concat(/<\//,e.lookahead(e.concat(r,/>/))),contains:[{className:"name",begin:r,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}var bl=t=>({IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:t.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:t.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z_][A-Za-z0-9_-]*/}}),ml=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","optgroup","option","p","picture","q","quote","samp","section","select","source","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video"],vl=["defs","g","marker","mask","pattern","svg","switch","symbol","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","linearGradient","radialGradient","stop","circle","ellipse","image","line","path","polygon","polyline","rect","text","use","textPath","tspan","foreignObject","clipPath"],_l=[...ml,...vl],yl=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"].sort().reverse(),wl=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"].sort().reverse(),El=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"].sort().reverse(),kl=["accent-color","align-content","align-items","align-self","alignment-baseline","all","anchor-name","animation","animation-composition","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-range","animation-range-end","animation-range-start","animation-timeline","animation-timing-function","appearance","aspect-ratio","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-end-end-radius","border-end-start-radius","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-start-end-radius","border-start-start-radius","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-align","box-decoration-break","box-direction","box-flex","box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","color-scheme","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","contain-intrinsic-block-size","contain-intrinsic-height","contain-intrinsic-inline-size","contain-intrinsic-size","contain-intrinsic-width","container","container-name","container-type","content","content-visibility","counter-increment","counter-reset","counter-set","cue","cue-after","cue-before","cursor","cx","cy","direction","display","dominant-baseline","empty-cells","enable-background","field-sizing","fill","fill-opacity","fill-rule","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flood-color","flood-opacity","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-palette","font-size","font-size-adjust","font-smooth","font-smoothing","font-stretch","font-style","font-synthesis","font-synthesis-position","font-synthesis-small-caps","font-synthesis-style","font-synthesis-weight","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-emoji","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","forced-color-adjust","gap","glyph-orientation-horizontal","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphenate-character","hyphenate-limit-chars","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","initial-letter","initial-letter-align","inline-size","inset","inset-area","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","kerning","left","letter-spacing","lighting-color","line-break","line-height","line-height-step","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","margin-trim","marker","marker-end","marker-mid","marker-start","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","masonry-auto-flow","math-depth","math-shift","math-style","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-anchor","overflow-block","overflow-clip-margin","overflow-inline","overflow-wrap","overflow-x","overflow-y","overlay","overscroll-behavior","overscroll-behavior-block","overscroll-behavior-inline","overscroll-behavior-x","overscroll-behavior-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","paint-order","pause","pause-after","pause-before","perspective","perspective-origin","place-content","place-items","place-self","pointer-events","position","position-anchor","position-visibility","print-color-adjust","quotes","r","resize","rest","rest-after","rest-before","right","rotate","row-gap","ruby-align","ruby-position","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scroll-timeline","scroll-timeline-axis","scroll-timeline-name","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","shape-rendering","speak","speak-as","src","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","table-layout","text-align","text-align-all","text-align-last","text-anchor","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-decoration-thickness","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-transform","text-underline-offset","text-underline-position","text-wrap","text-wrap-mode","text-wrap-style","timeline-scope","top","touch-action","transform","transform-box","transform-origin","transform-style","transition","transition-behavior","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-modify","user-select","vector-effect","vertical-align","view-timeline","view-timeline-axis","view-timeline-inset","view-timeline-name","view-transition-name","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","white-space-collapse","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","x","y","z-index","zoom"].sort().reverse();function To(t){let e=t.regex,r=bl(t),a={begin:/-(webkit|moz|ms|o)-(?=[a-z])/},n="and or not only",i=/@-?\w[\w]*(-\w+)*/,o="[a-zA-Z-][a-zA-Z0-9_-]*",s=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE];return{name:"CSS",case_insensitive:!0,illegal:/[=|'\$]/,keywords:{keyframePosition:"from to"},classNameAliases:{keyframePosition:"selector-tag"},contains:[r.BLOCK_COMMENT,a,r.CSS_NUMBER_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/,relevance:0},{className:"selector-class",begin:"\\."+o,relevance:0},r.ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",variants:[{begin:":("+wl.join("|")+")"},{begin:":(:)?("+El.join("|")+")"}]},r.CSS_VARIABLE,{className:"attribute",begin:"\\b("+kl.join("|")+")\\b"},{begin:/:/,end:/[;}{]/,contains:[r.BLOCK_COMMENT,r.HEXCOLOR,r.IMPORTANT,r.CSS_NUMBER_MODE,...s,{begin:/(url|data-uri)\(/,end:/\)/,relevance:0,keywords:{built_in:"url data-uri"},contains:[...s,{className:"string",begin:/[^)]/,endsWithParent:!0,excludeEnd:!0}]},r.FUNCTION_DISPATCH]},{begin:e.lookahead(/@/),end:"[{;]",relevance:0,illegal:/:/,contains:[{className:"keyword",begin:i},{begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:{$pattern:/[a-z-]+/,keyword:n,attribute:yl.join(" ")},contains:[{begin:/[a-z-]+(?=:)/,className:"attribute"},...s,r.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"\\b("+_l.join("|")+")\\b"}]}}function Ro(t){let e=t.regex,r=t.COMMENT("--","$"),a={scope:"string",variants:[{begin:/'/,end:/'/,contains:[{match:/''/}]}]},n={begin:/"/,end:/"/,contains:[{match:/""/}]},i=["true","false","unknown"],o=["double precision","large object","with timezone","without timezone"],s=["bigint","binary","blob","boolean","char","character","clob","date","dec","decfloat","decimal","float","int","integer","interval","nchar","nclob","national","numeric","real","row","smallint","time","timestamp","varchar","varying","varbinary"],l=["add","asc","collation","desc","final","first","last","view"],c=["abs","acos","all","allocate","alter","and","any","are","array","array_agg","array_max_cardinality","as","asensitive","asin","asymmetric","at","atan","atomic","authorization","avg","begin","begin_frame","begin_partition","between","bigint","binary","blob","boolean","both","by","call","called","cardinality","cascaded","case","cast","ceil","ceiling","char","char_length","character","character_length","check","classifier","clob","close","coalesce","collate","collect","column","commit","condition","connect","constraint","contains","convert","copy","corr","corresponding","cos","cosh","count","covar_pop","covar_samp","create","cross","cube","cume_dist","current","current_catalog","current_date","current_default_transform_group","current_path","current_role","current_row","current_schema","current_time","current_timestamp","current_path","current_role","current_transform_group_for_type","current_user","cursor","cycle","date","day","deallocate","dec","decimal","decfloat","declare","default","define","delete","dense_rank","deref","describe","deterministic","disconnect","distinct","double","drop","dynamic","each","element","else","empty","end","end_frame","end_partition","end-exec","equals","escape","every","except","exec","execute","exists","exp","external","extract","false","fetch","filter","first_value","float","floor","for","foreign","frame_row","free","from","full","function","fusion","get","global","grant","group","grouping","groups","having","hold","hour","identity","in","indicator","initial","inner","inout","insensitive","insert","int","integer","intersect","intersection","interval","into","is","join","json_array","json_arrayagg","json_exists","json_object","json_objectagg","json_query","json_table","json_table_primitive","json_value","lag","language","large","last_value","lateral","lead","leading","left","like","like_regex","listagg","ln","local","localtime","localtimestamp","log","log10","lower","match","match_number","match_recognize","matches","max","member","merge","method","min","minute","mod","modifies","module","month","multiset","national","natural","nchar","nclob","new","no","none","normalize","not","nth_value","ntile","null","nullif","numeric","octet_length","occurrences_regex","of","offset","old","omit","on","one","only","open","or","order","out","outer","over","overlaps","overlay","parameter","partition","pattern","per","percent","percent_rank","percentile_cont","percentile_disc","period","portion","position","position_regex","power","precedes","precision","prepare","primary","procedure","ptf","range","rank","reads","real","recursive","ref","references","referencing","regr_avgx","regr_avgy","regr_count","regr_intercept","regr_r2","regr_slope","regr_sxx","regr_sxy","regr_syy","release","result","return","returns","revoke","right","rollback","rollup","row","row_number","rows","running","savepoint","scope","scroll","search","second","seek","select","sensitive","session_user","set","show","similar","sin","sinh","skip","smallint","some","specific","specifictype","sql","sqlexception","sqlstate","sqlwarning","sqrt","start","static","stddev_pop","stddev_samp","submultiset","subset","substring","substring_regex","succeeds","sum","symmetric","system","system_time","system_user","table","tablesample","tan","tanh","then","time","timestamp","timezone_hour","timezone_minute","to","trailing","translate","translate_regex","translation","treat","trigger","trim","trim_array","true","truncate","uescape","union","unique","unknown","unnest","update","upper","user","using","value","values","value_of","var_pop","var_samp","varbinary","varchar","varying","versioning","when","whenever","where","width_bucket","window","with","within","without","year"],d=["abs","acos","array_agg","asin","atan","avg","cast","ceil","ceiling","coalesce","corr","cos","cosh","count","covar_pop","covar_samp","cume_dist","dense_rank","deref","element","exp","extract","first_value","floor","json_array","json_arrayagg","json_exists","json_object","json_objectagg","json_query","json_table","json_table_primitive","json_value","lag","last_value","lead","listagg","ln","log","log10","lower","max","min","mod","nth_value","ntile","nullif","percent_rank","percentile_cont","percentile_disc","position","position_regex","power","rank","regr_avgx","regr_avgy","regr_count","regr_intercept","regr_r2","regr_slope","regr_sxx","regr_sxy","regr_syy","row_number","sin","sinh","sqrt","stddev_pop","stddev_samp","substring","substring_regex","sum","tan","tanh","translate","translate_regex","treat","trim","trim_array","unnest","upper","value_of","var_pop","var_samp","width_bucket"],h=["current_catalog","current_date","current_default_transform_group","current_path","current_role","current_schema","current_transform_group_for_type","current_user","session_user","system_time","system_user","current_time","localtime","current_timestamp","localtimestamp"],g=["create table","insert into","primary key","foreign key","not null","alter table","add constraint","grouping sets","on overflow","character set","respect nulls","ignore nulls","nulls first","nulls last","depth first","breadth first"],u=d,f=[...c,...l].filter(T=>!d.includes(T)),_={scope:"variable",match:/@[a-z0-9][a-z0-9_]*/},y={scope:"operator",match:/[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,relevance:0},N={match:e.concat(/\b/,e.either(...u),/\s*\(/),relevance:0,keywords:{built_in:u}};function M(T){return e.concat(/\b/,e.either(...T.map(x=>x.replace(/\s+/,"\\s+"))),/\b/)}let D={scope:"keyword",match:M(g),relevance:0};function P(T,{exceptions:x,when:R}={}){let E=R;return x=x||[],T.map(U=>U.match(/\|\d+$/)||x.includes(U)?U:E(U)?`${U}|0`:U)}return{name:"SQL",case_insensitive:!0,illegal:/[{}]|<\//,keywords:{$pattern:/\b[\w\.]+/,keyword:P(f,{when:T=>T.length<3}),literal:i,type:s,built_in:h},contains:[{scope:"type",match:M(o)},D,N,_,a,n,t.C_NUMBER_MODE,t.C_BLOCK_COMMENT_MODE,r,y]}}function Oo(t){let e={className:"variable",variants:[{begin:"\\$\\("+t.UNDERSCORE_IDENT_RE+"\\)",contains:[t.BACKSLASH_ESCAPE]},{begin:/\$[@%<?\^\+\*]/}]},r={className:"string",begin:/"/,end:/"/,contains:[t.BACKSLASH_ESCAPE,e]},a={className:"variable",begin:/\$\([\w-]+\s/,end:/\)/,keywords:{built_in:"subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"},contains:[e,r]},n={begin:"^"+t.UNDERSCORE_IDENT_RE+"\\s*(?=[:+?]?=)"},i={className:"meta",begin:/^\.PHONY:/,end:/$/,keywords:{$pattern:/[\.\w]+/,keyword:".PHONY"}},o={className:"section",begin:/^[^\s]+:/,end:/$/,contains:[e]};return{name:"Makefile",aliases:["mk","mak","make"],keywords:{$pattern:/[\w-]+/,keyword:"define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"},contains:[t.HASH_COMMENT_MODE,e,r,a,n,i,o]}}function Mo(t){let e=t.regex,r={begin:/<\/?[A-Za-z_]/,end:">",subLanguage:"xml",relevance:0},a={begin:"^[-\\*]{3,}",end:"$"},n={className:"code",variants:[{begin:"(`{3,})[^`](.|\\n)*?\\1`*[ ]*"},{begin:"(~{3,})[^~](.|\\n)*?\\1~*[ ]*"},{begin:"```",end:"```+[ ]*$"},{begin:"~~~",end:"~~~+[ ]*$"},{begin:"`.+?`"},{begin:"(?=^( {4}|\\t))",contains:[{begin:"^( {4}|\\t)",end:"(\\n)$"}],relevance:0}]},i={className:"bullet",begin:"^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",end:"\\s+",excludeEnd:!0},o={begin:/^\[[^\n]+\]:/,returnBegin:!0,contains:[{className:"symbol",begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0},{className:"link",begin:/:\s*/,end:/$/,excludeBegin:!0}]},s=/[A-Za-z][A-Za-z0-9+.-]*/,l={variants:[{begin:/\[.+?\]\[.*?\]/,relevance:0},{begin:/\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,relevance:2},{begin:e.concat(/\[.+?\]\(/,s,/:\/\/.*?\)/),relevance:2},{begin:/\[.+?\]\([./?&#].*?\)/,relevance:1},{begin:/\[.*?\]\(.*?\)/,relevance:0}],returnBegin:!0,contains:[{match:/\[(?=\])/},{className:"string",relevance:0,begin:"\\[",end:"\\]",excludeBegin:!0,returnEnd:!0},{className:"link",relevance:0,begin:"\\]\\(",end:"\\)",excludeBegin:!0,excludeEnd:!0},{className:"symbol",relevance:0,begin:"\\]\\[",end:"\\]",excludeBegin:!0,excludeEnd:!0}]},c={className:"strong",contains:[],variants:[{begin:/_{2}(?!\s)/,end:/_{2}/},{begin:/\*{2}(?!\s)/,end:/\*{2}/}]},d={className:"emphasis",contains:[],variants:[{begin:/\*(?![*\s])/,end:/\*/},{begin:/_(?![_\s])/,end:/_/,relevance:0}]},h=t.inherit(c,{contains:[]}),g=t.inherit(d,{contains:[]});c.contains.push(g),d.contains.push(h);let u=[r,l];return[c,d,h,g].forEach(N=>{N.contains=N.contains.concat(u)}),u=u.concat(c,d),{name:"Markdown",aliases:["md","mkdown","mkd"],contains:[{className:"section",variants:[{begin:"^#{1,6}",end:"$",contains:u},{begin:"(?=^.+?\\n[=-]{2,}$)",contains:[{begin:"^[=-]*$"},{begin:"^",end:"\\n",contains:u}]}]},r,i,c,d,{className:"quote",begin:"^>\\s+",contains:u,end:"$"},n,a,l,o,{scope:"literal",match:/&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/}]}}function Io(t){let e=t.regex;return{name:"Diff",aliases:["patch"],contains:[{className:"meta",relevance:10,match:e.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,/^\*\*\* +\d+,\d+ +\*\*\*\*$/,/^--- +\d+,\d+ +----$/)},{className:"comment",variants:[{begin:e.either(/Index: /,/^index/,/={3,}/,/^-{3}/,/^\*{3} /,/^\+{3}/,/^diff --git/),end:/$/},{match:/^\*{15}$/}]},{className:"addition",begin:/^\+/,end:/$/},{className:"deletion",begin:/^-/,end:/$/},{className:"addition",begin:/^!/,end:/$/}]}}function $o(t){let e="\\[=*\\[",r="\\]=*\\]",a={begin:e,end:r,contains:["self"]},n=[t.COMMENT("--(?!"+e+")","$"),t.COMMENT("--"+e,r,{contains:[a],relevance:10})];return{name:"Lua",aliases:["pluto"],keywords:{$pattern:t.UNDERSCORE_IDENT_RE,literal:"true false nil",keyword:"and break do else elseif end for goto if in local not or repeat return then until while",built_in:"_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"},contains:n.concat([{className:"function",beginKeywords:"function",end:"\\)",contains:[t.inherit(t.TITLE_MODE,{begin:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),{className:"params",begin:"\\(",endsWithParent:!0,contains:n}].concat(n)},t.C_NUMBER_MODE,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,{className:"string",begin:e,end:r,contains:[a],relevance:5}])}}var it="[0-9](_*[0-9])*",Rr=`\\.(${it})`,Or="[0-9a-fA-F](_*[0-9a-fA-F])*",xl={className:"number",variants:[{begin:`(\\b(${it})((${Rr})|\\.)?|(${Rr}))[eE][+-]?(${it})[fFdD]?\\b`},{begin:`\\b(${it})((${Rr})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${Rr})[fFdD]?\\b`},{begin:`\\b(${it})[fFdD]\\b`},{begin:`\\b0[xX]((${Or})\\.?|(${Or})?\\.(${Or}))[pP][+-]?(${it})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${Or})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};function Lo(t){let e={keyword:"abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",built_in:"Byte Short Char Int Long Boolean Float Double Void Unit Nothing",literal:"true false null"},r={className:"keyword",begin:/\b(break|continue|return|this)\b/,starts:{contains:[{className:"symbol",begin:/@\w+/}]}},a={className:"symbol",begin:t.UNDERSCORE_IDENT_RE+"@"},n={className:"subst",begin:/\$\{/,end:/\}/,contains:[t.C_NUMBER_MODE]},i={className:"variable",begin:"\\$"+t.UNDERSCORE_IDENT_RE},o={className:"string",variants:[{begin:'"""',end:'"""(?=[^"])',contains:[i,n]},{begin:"'",end:"'",illegal:/\n/,contains:[t.BACKSLASH_ESCAPE]},{begin:'"',end:'"',illegal:/\n/,contains:[t.BACKSLASH_ESCAPE,i,n]}]};n.contains.push(o);let s={className:"meta",begin:"@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*"+t.UNDERSCORE_IDENT_RE+")?"},l={className:"meta",begin:"@"+t.UNDERSCORE_IDENT_RE,contains:[{begin:/\(/,end:/\)/,contains:[t.inherit(o,{className:"string"}),"self"]}]},c=xl,d=t.COMMENT("/\\*","\\*/",{contains:[t.C_BLOCK_COMMENT_MODE]}),h={variants:[{className:"type",begin:t.UNDERSCORE_IDENT_RE},{begin:/\(/,end:/\)/,contains:[]}]},g=h;return g.variants[1].contains=[h],h.variants[1].contains=[g],{name:"Kotlin",aliases:["kt","kts"],keywords:e,contains:[t.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"}]}),t.C_LINE_COMMENT_MODE,d,r,a,s,l,{className:"function",beginKeywords:"fun",end:"[(]|$",returnBegin:!0,excludeEnd:!0,keywords:e,relevance:5,contains:[{begin:t.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,relevance:0,contains:[t.UNDERSCORE_TITLE_MODE]},{className:"type",begin:/</,end:/>/,keywords:"reified",relevance:0},{className:"params",begin:/\(/,end:/\)/,endsParent:!0,keywords:e,relevance:0,contains:[{begin:/:/,end:/[=,\/]/,endsWithParent:!0,contains:[h,t.C_LINE_COMMENT_MODE,d],relevance:0},t.C_LINE_COMMENT_MODE,d,s,l,o,t.C_NUMBER_MODE]},d]},{begin:[/class|interface|trait/,/\s+/,t.UNDERSCORE_IDENT_RE],beginScope:{3:"title.class"},keywords:"class interface trait",end:/[:\{(]|$/,excludeEnd:!0,illegal:"extends implements",contains:[{beginKeywords:"public protected internal private constructor"},t.UNDERSCORE_TITLE_MODE,{className:"type",begin:/</,end:/>/,excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:/[,:]\s*/,end:/[<\(,){\s]|$/,excludeBegin:!0,returnEnd:!0},s,l]},o,{className:"meta",begin:"^#!/usr/bin/env",end:"$",illegal:`
`},c]}}function Do(t){let e=t.regex,r={className:"meta",begin:"@[A-Za-z]+"},a={className:"subst",variants:[{begin:"\\$[A-Za-z0-9_]+"},{begin:/\$\{/,end:/\}/}]},n={className:"string",variants:[{begin:'"""',end:'"""'},{begin:'"',end:'"',illegal:"\\n",contains:[t.BACKSLASH_ESCAPE]},{begin:'[a-z]+"',end:'"',illegal:"\\n",contains:[t.BACKSLASH_ESCAPE,a]},{className:"string",begin:'[a-z]+"""',end:'"""',contains:[a],relevance:10}]},i={className:"type",begin:"\\b[A-Z][A-Za-z0-9_]*",relevance:0},o={className:"title",begin:/[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,relevance:0},s={className:"class",beginKeywords:"class object trait type",end:/[:={\[\n;]/,excludeEnd:!0,contains:[t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE,{beginKeywords:"extends with",relevance:10},{begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0,relevance:0,contains:[i,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,relevance:0,contains:[i,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},o]},l={className:"function",beginKeywords:"def",end:e.lookahead(/[:={\[(\n;]/),contains:[o]},c={begin:[/^\s*/,"extension",/\s+(?=[[(])/],beginScope:{2:"keyword"}},d={begin:[/^\s*/,/end/,/\s+/,/(extension\b)?/],beginScope:{2:"keyword",4:"keyword"}},h=[{match:/\.inline\b/},{begin:/\binline(?=\s)/,keywords:"inline"}],g={begin:[/\(\s*/,/using/,/\s+(?!\))/],beginScope:{2:"keyword"}};return{name:"Scala",keywords:{literal:"true false null",keyword:"type yield lazy override def with val var sealed abstract private trait object if then forSome for while do throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit export enum given transparent"},contains:[{begin:["//>",/\s+/,/using/,/\s+/,/\S+/],beginScope:{1:"comment",3:"keyword",5:"type"},end:/$/,contains:[{className:"string",begin:/\S+/}]},t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE,n,i,l,s,t.C_NUMBER_MODE,c,d,...h,g,r]}}function Bo(t){return t?typeof t=="string"?t:t.source:null}function It(t){return G("(?=",t,")")}function G(...t){return t.map(r=>Bo(r)).join("")}function Sl(t){let e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function ae(...t){return"("+(Sl(t).capture?"":"?:")+t.map(a=>Bo(a)).join("|")+")"}var Aa=t=>G(/\b/,t,/\w$/.test(t)?/\b/:/\B/),Nl=["Protocol","Type"].map(Aa),Po=["init","self"].map(Aa),Al=["Any","Self"],Sa=["actor","any","associatedtype","async","await",/as\?/,/as!/,"as","borrowing","break","case","catch","class","consume","consuming","continue","convenience","copy","default","defer","deinit","didSet","distributed","do","dynamic","each","else","enum","extension","fallthrough",/fileprivate\(set\)/,"fileprivate","final","for","func","get","guard","if","import","indirect","infix",/init\?/,/init!/,"inout",/internal\(set\)/,"internal","in","is","isolated","nonisolated","lazy","let","macro","mutating","nonmutating",/open\(set\)/,"open","operator","optional","override","package","postfix","precedencegroup","prefix",/private\(set\)/,"private","protocol",/public\(set\)/,"public","repeat","required","rethrows","return","set","some","static","struct","subscript","super","switch","throws","throw",/try\?/,/try!/,"try","typealias",/unowned\(safe\)/,/unowned\(unsafe\)/,"unowned","var","weak","where","while","willSet"],Uo=["false","nil","true"],Cl=["assignment","associativity","higherThan","left","lowerThan","none","right"],Tl=["#colorLiteral","#column","#dsohandle","#else","#elseif","#endif","#error","#file","#fileID","#fileLiteral","#filePath","#function","#if","#imageLiteral","#keyPath","#line","#selector","#sourceLocation","#warning"],zo=["abs","all","any","assert","assertionFailure","debugPrint","dump","fatalError","getVaList","isKnownUniquelyReferenced","max","min","numericCast","pointwiseMax","pointwiseMin","precondition","preconditionFailure","print","readLine","repeatElement","sequence","stride","swap","swift_unboxFromSwiftValueWithType","transcode","type","unsafeBitCast","unsafeDowncast","withExtendedLifetime","withUnsafeMutablePointer","withUnsafePointer","withVaList","withoutActuallyEscaping","zip"],Fo=ae(/[/=\-+!*%<>&|^~?]/,/[\u00A1-\u00A7]/,/[\u00A9\u00AB]/,/[\u00AC\u00AE]/,/[\u00B0\u00B1]/,/[\u00B6\u00BB\u00BF\u00D7\u00F7]/,/[\u2016-\u2017]/,/[\u2020-\u2027]/,/[\u2030-\u203E]/,/[\u2041-\u2053]/,/[\u2055-\u205E]/,/[\u2190-\u23FF]/,/[\u2500-\u2775]/,/[\u2794-\u2BFF]/,/[\u2E00-\u2E7F]/,/[\u3001-\u3003]/,/[\u3008-\u3020]/,/[\u3030]/),Ho=ae(Fo,/[\u0300-\u036F]/,/[\u1DC0-\u1DFF]/,/[\u20D0-\u20FF]/,/[\uFE00-\uFE0F]/,/[\uFE20-\uFE2F]/),Na=G(Fo,Ho,"*"),qo=ae(/[a-zA-Z_]/,/[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,/[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,/[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,/[\u1E00-\u1FFF]/,/[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,/[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,/[\u2C00-\u2DFF\u2E80-\u2FFF]/,/[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,/[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,/[\uFE47-\uFEFE\uFF00-\uFFFD]/),Ir=ae(qo,/\d/,/[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/),_e=G(qo,Ir,"*"),Mr=G(/[A-Z]/,Ir,"*"),Rl=["attached","autoclosure",G(/convention\(/,ae("swift","block","c"),/\)/),"discardableResult","dynamicCallable","dynamicMemberLookup","escaping","freestanding","frozen","GKInspectable","IBAction","IBDesignable","IBInspectable","IBOutlet","IBSegueAction","inlinable","main","nonobjc","NSApplicationMain","NSCopying","NSManaged",G(/objc\(/,_e,/\)/),"objc","objcMembers","propertyWrapper","requires_stored_property_inits","resultBuilder","Sendable","testable","UIApplicationMain","unchecked","unknown","usableFromInline","warn_unqualified_access"],Ol=["iOS","iOSApplicationExtension","macOS","macOSApplicationExtension","macCatalyst","macCatalystApplicationExtension","watchOS","watchOSApplicationExtension","tvOS","tvOSApplicationExtension","swift"];function Go(t){let e={match:/\s+/,relevance:0},r=t.COMMENT("/\\*","\\*/",{contains:["self"]}),a=[t.C_LINE_COMMENT_MODE,r],n={match:[/\./,ae(...Nl,...Po)],className:{2:"keyword"}},i={match:G(/\./,ae(...Sa)),relevance:0},o=Sa.filter(H=>typeof H=="string").concat(["_|0"]),s=Sa.filter(H=>typeof H!="string").concat(Al).map(Aa),l={variants:[{className:"keyword",match:ae(...s,...Po)}]},c={$pattern:ae(/\b\w+/,/#\w+/),keyword:o.concat(Tl),literal:Uo},d=[n,i,l],h={match:G(/\./,ae(...zo)),relevance:0},g={className:"built_in",match:G(/\b/,ae(...zo),/(?=\()/)},u=[h,g],f={match:/->/,relevance:0},_={className:"operator",relevance:0,variants:[{match:Na},{match:`\\.(\\.|${Ho})+`}]},y=[f,_],N="([0-9]_*)+",M="([0-9a-fA-F]_*)+",D={className:"number",relevance:0,variants:[{match:`\\b(${N})(\\.(${N}))?([eE][+-]?(${N}))?\\b`},{match:`\\b0x(${M})(\\.(${M}))?([pP][+-]?(${N}))?\\b`},{match:/\b0o([0-7]_*)+\b/},{match:/\b0b([01]_*)+\b/}]},P=(H="")=>({className:"subst",variants:[{match:G(/\\/,H,/[0\\tnr"']/)},{match:G(/\\/,H,/u\{[0-9a-fA-F]{1,8}\}/)}]}),T=(H="")=>({className:"subst",match:G(/\\/,H,/[\t ]*(?:[\r\n]|\r\n)/)}),x=(H="")=>({className:"subst",label:"interpol",begin:G(/\\/,H,/\(/),end:/\)/}),R=(H="")=>({begin:G(H,/"""/),end:G(/"""/,H),contains:[P(H),T(H),x(H)]}),E=(H="")=>({begin:G(H,/"/),end:G(/"/,H),contains:[P(H),x(H)]}),U={className:"string",variants:[R(),R("#"),R("##"),R("###"),E(),E("#"),E("##"),E("###")]},Q=[t.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[t.BACKSLASH_ESCAPE]}],ye={begin:/\/[^\s](?=[^/\n]*\/)/,end:/\//,contains:Q},le=H=>{let Ae=G(H,/\//),C=G(/\//,H);return{begin:Ae,end:C,contains:[...Q,{scope:"comment",begin:`#(?!.*${C})`,end:/$/}]}},Ne={scope:"regexp",variants:[le("###"),le("##"),le("#"),ye]},he={match:G(/`/,_e,/`/)},Oe={className:"variable",match:/\$\d+/},p={className:"variable",match:`\\$${Ir}+`},k=[he,Oe,p],w={match:/(@|#(un)?)available/,scope:"keyword",starts:{contains:[{begin:/\(/,end:/\)/,keywords:Ol,contains:[...y,D,U]}]}},I={scope:"keyword",match:G(/@/,ae(...Rl),It(ae(/\(/,/\s+/)))},B={scope:"meta",match:G(/@/,_e)},K=[w,I,B],V={match:It(/\b[A-Z]/),relevance:0,contains:[{className:"type",match:G(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/,Ir,"+")},{className:"type",match:Mr,relevance:0},{match:/[?!]+/,relevance:0},{match:/\.\.\./,relevance:0},{match:G(/\s+&\s+/,It(Mr)),relevance:0}]},ce={begin:/</,end:/>/,keywords:c,contains:[...a,...d,...K,f,V]};V.contains.push(ce);let te={match:G(_e,/\s*:/),keywords:"_|0",relevance:0},se={begin:/\(/,end:/\)/,relevance:0,keywords:c,contains:["self",te,...a,Ne,...d,...u,...y,D,U,...k,...K,V]},We={begin:/</,end:/>/,keywords:"repeat each",contains:[...a,V]},Bt={begin:ae(It(G(_e,/\s*:/)),It(G(_e,/\s+/,_e,/\s*:/))),end:/:/,relevance:0,contains:[{className:"keyword",match:/\b_\b/},{className:"params",match:_e}]},ct={begin:/\(/,end:/\)/,keywords:c,contains:[Bt,...a,...d,...y,D,U,...K,V,se],endsParent:!0,illegal:/["']/},Dr={match:[/(func|macro)/,/\s+/,ae(he.match,_e,Na)],className:{1:"keyword",3:"title.function"},contains:[We,ct,e],illegal:[/\[/,/%/]},Pr={match:[/\b(?:subscript|init[?!]?)/,/\s*(?=[<(])/],className:{1:"keyword"},contains:[We,ct,e],illegal:/\[|%/},Ur={match:[/operator/,/\s+/,Na],className:{1:"keyword",3:"title"}},zr={begin:[/precedencegroup/,/\s+/,Mr],className:{1:"keyword",3:"title"},contains:[V],keywords:[...Cl,...Uo],end:/}/},je={match:[/class\b/,/\s+/,/func\b/,/\s+/,/\b[A-Za-z_][A-Za-z0-9_]*\b/],scope:{1:"keyword",3:"keyword",5:"title.function"}},Ft={match:[/class\b/,/\s+/,/var\b/],scope:{1:"keyword",3:"keyword"}},de={begin:[/(struct|protocol|class|extension|enum|actor)/,/\s+/,_e,/\s*/],beginScope:{1:"keyword",3:"title.class"},keywords:c,contains:[We,...d,{begin:/:/,end:/\{/,keywords:c,contains:[{scope:"title.class.inherited",match:Mr},...d],relevance:0}]};for(let H of U.variants){let Ae=H.contains.find(Ht=>Ht.label==="interpol");Ae.keywords=c;let C=[...d,...u,...y,D,U,...k];Ae.contains=[...C,{begin:/\(/,end:/\)/,contains:["self",...C]}]}return{name:"Swift",keywords:c,contains:[...a,Dr,Pr,je,Ft,de,Ur,zr,{beginKeywords:"import",end:/$/,contains:[...a],relevance:0},Ne,...d,...u,...y,D,U,...k,...K,V,se]}}function Ko(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}function Wo(t){let e="[ \\t\\f]*",r="[ \\t\\f]+",a=e+"[:=]"+e,n=r,i="("+a+"|"+n+")",o="([^\\\\:= \\t\\f\\n]|\\\\.)+",s={end:i,relevance:0,starts:{className:"string",end:/$/,relevance:0,contains:[{begin:"\\\\\\\\"},{begin:"\\\\\\n"}]}};return{name:".properties",disableAutodetect:!0,case_insensitive:!0,illegal:/\S/,contains:[t.COMMENT("^\\s*[!#]","$"),{returnBegin:!0,variants:[{begin:o+a},{begin:o+n}],contains:[{className:"attr",begin:o,endsParent:!0}],starts:s},{className:"attr",begin:o+e+"$"}]}}function jo(t){return{name:"Dockerfile",aliases:["docker"],case_insensitive:!0,keywords:["from","maintainer","expose","env","arg","user","onbuild","stopsignal"],contains:[t.HASH_COMMENT_MODE,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,t.NUMBER_MODE,{beginKeywords:"run cmd entrypoint volume add copy workdir label healthcheck shell",starts:{end:/[^\\]$/,subLanguage:"bash"}}],illegal:"</"}}function Vo(t){let e=["package","import","option","optional","required","repeated","group","oneof"],r=["double","float","int32","int64","uint32","uint64","sint32","sint64","fixed32","fixed64","sfixed32","sfixed64","bool","string","bytes"],a={match:[/(message|enum|service)\s+/,t.IDENT_RE],scope:{1:"keyword",2:"title.class"}};return{name:"Protocol Buffers",aliases:["proto"],keywords:{keyword:e,type:r,literal:["true","false"]},contains:[t.QUOTE_STRING_MODE,t.NUMBER_MODE,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE,a,{className:"function",beginKeywords:"rpc",end:/[{;]/,excludeEnd:!0,keywords:"rpc returns"},{begin:/^\s*[A-Z_]+(?=\s*=[^\n]+;$)/}]}}function Zo(t){let e="([0-9]_*)+",r="([0-9a-fA-F]_*)+",a="([01]_*)+",n="([0-7]_*)+",l="([!#$%&*+.\\/<=>?@\\\\^~-]|(?!([(),;\\[\\]`|{}]|[_:\"']))(\\p{S}|\\p{P}))",c={variants:[t.COMMENT("--+","$"),t.COMMENT(/\{-/,/-\}/,{contains:["self"]})]},d={className:"meta",begin:/\{-#/,end:/#-\}/},h={className:"meta",begin:"^#",end:"$"},g={className:"type",begin:"\\b[A-Z][\\w']*",relevance:0},u={begin:"\\(",end:"\\)",illegal:'"',contains:[d,h,{className:"type",begin:"\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"},t.inherit(t.TITLE_MODE,{begin:"[_a-z][\\w']*"}),c]},f={begin:/\{/,end:/\}/,contains:u.contains},_={className:"number",relevance:0,variants:[{match:`\\b(${e})(\\.(${e}))?([eE][+-]?(${e}))?\\b`},{match:`\\b0[xX]_*(${r})(\\.(${r}))?([pP][+-]?(${e}))?\\b`},{match:`\\b0[oO](${n})\\b`},{match:`\\b0[bB](${a})\\b`}]};return{name:"Haskell",aliases:["hs"],keywords:"let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",unicodeRegex:!0,contains:[{beginKeywords:"module",end:"where",keywords:"module where",contains:[u,c],illegal:"\\W\\.|;"},{begin:"\\bimport\\b",end:"$",keywords:"import qualified as hiding",contains:[u,c],illegal:"\\W\\.|;"},{className:"class",begin:"^(\\s*)?(class|instance)\\b",end:"where",keywords:"class family instance where",contains:[g,u,c]},{className:"class",begin:"\\b(data|(new)?type)\\b",end:"$",keywords:"data family type newtype deriving",contains:[d,g,u,f,c]},{beginKeywords:"default",end:"$",contains:[g,u,c]},{beginKeywords:"infix infixl infixr",end:"$",contains:[t.C_NUMBER_MODE,c]},{begin:"\\bforeign\\b",end:"$",keywords:"foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",contains:[g,t.QUOTE_STRING_MODE,c]},{className:"meta",begin:"#!\\/usr\\/bin\\/env runhaskell",end:"$"},d,h,{scope:"string",begin:/'(?=\\?.')/,end:/'/,contains:[{scope:"char.escape",match:/\\./}]},t.QUOTE_STRING_MODE,_,g,t.inherit(t.TITLE_MODE,{begin:"^[_a-z][\\w']*"}),{begin:`(?!-)${l}--+|--+(?!-)${l}`},c,{begin:"->|<-"}]}}function Yo(t){let e=t.regex,r="[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",a="[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",o={$pattern:r,keyword:["after","alias","and","case","catch","cond","defstruct","defguard","do","else","end","fn","for","if","import","in","not","or","quote","raise","receive","require","reraise","rescue","try","unless","unquote","unquote_splicing","use","when","with|0"],literal:["false","nil","true"]},s={className:"subst",begin:/#\{/,end:/\}/,keywords:o},l={className:"number",begin:"(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[0-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",relevance:0},d={match:/\\[\s\S]/,scope:"char.escape",relevance:0},h=`[/|([{<"']`,g=[{begin:/"/,end:/"/},{begin:/'/,end:/'/},{begin:/\//,end:/\//},{begin:/\|/,end:/\|/},{begin:/\(/,end:/\)/},{begin:/\[/,end:/\]/},{begin:/\{/,end:/\}/},{begin:/</,end:/>/}],u=T=>({scope:"char.escape",begin:e.concat(/\\/,T),relevance:0}),f={className:"string",begin:"~[a-z](?="+h+")",contains:g.map(T=>t.inherit(T,{contains:[u(T.end),d,s]}))},_={className:"string",begin:"~[A-Z](?="+h+")",contains:g.map(T=>t.inherit(T,{contains:[u(T.end)]}))},y={className:"regex",variants:[{begin:"~r(?="+h+")",contains:g.map(T=>t.inherit(T,{end:e.concat(T.end,/[uismxfU]{0,7}/),contains:[u(T.end),d,s]}))},{begin:"~R(?="+h+")",contains:g.map(T=>t.inherit(T,{end:e.concat(T.end,/[uismxfU]{0,7}/),contains:[u(T.end)]}))}]},N={className:"string",contains:[t.BACKSLASH_ESCAPE,s],variants:[{begin:/"""/,end:/"""/},{begin:/'''/,end:/'''/},{begin:/~S"""/,end:/"""/,contains:[]},{begin:/~S"/,end:/"/,contains:[]},{begin:/~S'''/,end:/'''/,contains:[]},{begin:/~S'/,end:/'/,contains:[]},{begin:/'/,end:/'/},{begin:/"/,end:/"/}]},M={className:"function",beginKeywords:"def defp defmacro defmacrop",end:/\B\b/,contains:[t.inherit(t.TITLE_MODE,{begin:r,endsParent:!0})]},D=t.inherit(M,{className:"class",beginKeywords:"defimpl defmodule defprotocol defrecord",end:/\bdo\b|$|;/}),P=[N,y,_,f,t.HASH_COMMENT_MODE,D,M,{begin:"::"},{className:"symbol",begin:":(?![\\s:])",contains:[N,{begin:a}],relevance:0},{className:"symbol",begin:r+":(?!:)",relevance:0},{className:"title.class",begin:/(\b[A-Z][a-zA-Z0-9_]+)/,relevance:0},l,{className:"variable",begin:"(\\$\\W)|((\\$|@@?)(\\w+))"}];return s.contains=P,{name:"Elixir",aliases:["ex","exs"],keywords:o,contains:P}}function Xo(t){let e="[a-z'][a-zA-Z0-9_']*",r="("+e+":"+e+"|"+e+")",a={keyword:"after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor maybe else",literal:"false true"},n=t.COMMENT("%","$"),i={className:"number",begin:"\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",relevance:0},o={begin:"fun\\s+"+e+"/\\d+"},s={begin:r+"\\(",end:"\\)",returnBegin:!0,relevance:0,contains:[{begin:r,relevance:0},{begin:"\\(",end:"\\)",endsWithParent:!0,returnEnd:!0,relevance:0}]},l={begin:/\{/,end:/\}/,relevance:0},c={begin:"\\b_([A-Z][A-Za-z0-9_]*)?",relevance:0},d={begin:"[A-Z][a-zA-Z0-9_]*",relevance:0},h={begin:"#"+t.UNDERSCORE_IDENT_RE,relevance:0,returnBegin:!0,contains:[{begin:"#"+t.UNDERSCORE_IDENT_RE,relevance:0},{begin:/\{/,end:/\}/,relevance:0}]},g={scope:"string",match:/\$(\\([^0-9]|[0-9]{1,3}|)|.)/},u={scope:"string",match:/"""("*)(?!")[\s\S]*?"""\1/},f={scope:"string",contains:[t.BACKSLASH_ESCAPE],variants:[{match:/~\w?"""("*)(?!")[\s\S]*?"""\1/},{begin:/~\w?\(/,end:/\)/},{begin:/~\w?\[/,end:/\]/},{begin:/~\w?{/,end:/}/},{begin:/~\w?</,end:/>/},{begin:/~\w?\//,end:/\//},{begin:/~\w?\|/,end:/\|/},{begin:/~\w?'/,end:/'/},{begin:/~\w?"/,end:/"/},{begin:/~\w?`/,end:/`/},{begin:/~\w?#/,end:/#/}]},_={beginKeywords:"fun receive if try case maybe",end:"end",keywords:a};_.contains=[n,o,t.inherit(t.APOS_STRING_MODE,{className:""}),_,s,f,u,t.QUOTE_STRING_MODE,i,l,c,d,h,g];let y=[n,o,_,s,f,u,t.QUOTE_STRING_MODE,i,l,c,d,h,g];s.contains[1].contains=y,l.contains=y,h.contains[1].contains=y;let N=["-module","-record","-undef","-export","-ifdef","-ifndef","-author","-copyright","-doc","-moduledoc","-vsn","-import","-include","-include_lib","-compile","-define","-else","-endif","-file","-behaviour","-behavior","-spec","-on_load","-nifs"],M={className:"params",begin:"\\(",end:"\\)",contains:y};return{name:"Erlang",aliases:["erl"],keywords:a,illegal:"(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",contains:[{className:"function",begin:"^"+e+"\\s*\\(",end:"->",returnBegin:!0,illegal:"\\(|#|//|/\\*|\\\\|:|;",contains:[M,t.inherit(t.TITLE_MODE,{begin:e})],starts:{end:";|\\.",keywords:a,contains:y}},n,{begin:"^-",end:"\\.",relevance:0,excludeEnd:!0,returnBegin:!0,keywords:{$pattern:"-"+t.IDENT_RE,keyword:N.map(D=>`${D}|1.5`).join(" ")},contains:[M,f,u,t.QUOTE_STRING_MODE]},i,f,u,t.QUOTE_STRING_MODE,h,c,d,l,g,{begin:/\.$/}]}}var Ml=[["go",to],["python",ro],["rust",ao],["typescript",uo],["javascript",mo],["c",vo],["cpp",_o],["java",Eo],["ruby",ko],["bash",xo],["clojure",So],["yaml",No],["json",Ao],["xml",Co],["css",To],["sql",Ro],["makefile",Oo],["markdown",Mo],["diff",Io],["lua",$o],["kotlin",Lo],["scala",Do],["swift",Go],["shell",Ko],["properties",Wo],["dockerfile",jo],["protobuf",Vo],["haskell",Zo],["elixir",Yo],["erlang",Xo]];for(let[t,e]of Ml)xa.registerLanguage(t,e);var Qo={".go":"go",".py":"python",".rs":"rust",".ts":"typescript",".tsx":"typescript",".js":"javascript",".jsx":"javascript",".c":"c",".h":"c",".cc":"cpp",".cpp":"cpp",".hpp":"cpp",".java":"java",".rb":"ruby",".sh":"bash",".bash":"bash",".zsh":"bash",".clj":"clojure",".cljs":"clojure",".cljc":"clojure",".yaml":"yaml",".yml":"yaml",".json":"json",".toml":"properties",".md":"markdown",".html":"xml",".xml":"xml",".svg":"xml",".css":"css",".scss":"css",".sql":"sql",".lua":"lua",".kt":"kotlin",".scala":"scala",".swift":"swift",".dockerfile":"dockerfile",".proto":"protobuf",".hs":"haskell",".ex":"elixir",".erl":"erlang",".mk":"makefile",".diff":"diff",".patch":"diff"},Jo={Makefile:"makefile",makefile:"makefile",GNUmakefile:"makefile",Dockerfile:"dockerfile",".bashrc":"bash",".zshrc":"bash",".profile":"bash"};function Il(t){let e=t.split("/").pop()??"";if(Jo[e])return Jo[e];let r=e.lastIndexOf(".");if(r>=0){let a=e.slice(r).toLowerCase();if(Qo[a])return Qo[a]}return""}function ei(t,e){let r=Il(t);if(!r)return null;try{return xa.highlight(e,{language:r,ignoreIllegals:!0}).value.split(`
`)}catch{return null}}var Ca=ue(class extends fe{constructor(t){if(super(t),t.type!==be.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((a=>a!==""))));for(let a in e)e[a]&&!this.nt?.has(a)&&this.st.add(a);return this.render(e)}let r=t.element.classList;for(let a of this.st)a in e||(r.remove(a),this.st.delete(a));for(let a in e){let n=!!e[a];n===this.st.has(a)||this.nt?.has(a)||(n?(r.add(a),this.st.add(a)):(r.remove(a),this.st.delete(a)))}return re}});var $t=class extends fe{constructor(e){if(super(e),this.it=q,e.type!==be.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===q||e==null)return this._t=void 0,this.it=e;if(e===re)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};$t.directiveName="unsafeHTML",$t.resultType=1;var $r=ue($t);var ti=`/* highlight.js GitHub light/dark theme for shadow DOM */

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
`;var Re=class extends ${render(){return this.start!=null&&this.end!=null?v`${this.text.substring(0,this.start)}<span class="matchstr"
                    >${this.text.substring(this.start,this.end)}</span
                >${this.text.substring(this.end)}`:v`${this.text}`}};Re.styles=O`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `,b([A()],Re.prototype,"text",2),b([A({type:Number})],Re.prototype,"start",2),b([A({type:Number})],Re.prototype,"end",2),Re=b([z("match-str")],Re);var ge=class extends ${render(){return v`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`}};ge.styles=O`
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
    `,b([A()],ge.prototype,"text",2),b([A()],ge.prototype,"href",2),b([A({type:Number})],ge.prototype,"start",2),b([A({type:Number})],ge.prototype,"end",2),b([A()],ge.prototype,"repo",2),b([A()],ge.prototype,"version",2),ge=b([z("filename-match")],ge);var pe=class extends ${render(){let e=this.start!=null&&this.end!=null;return v`<a class=${Ca({"lno-link":!0,matchlno:e})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${Ca({matchline:e})}
                >${e?v`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`:this.highlightedHTML?$r(this.highlightedHTML):this.text}</span
            >`}};pe.styles=[Ve(ti),O`
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
    `],b([A({type:Number})],pe.prototype,"lineNo",2),b([A()],pe.prototype,"text",2),b([A()],pe.prototype,"href",2),b([A({type:Number})],pe.prototype,"start",2),b([A({type:Number})],pe.prototype,"end",2),b([A()],pe.prototype,"highlightedHTML",2),pe=b([z("match-line")],pe);function Ll(t){let e=t.lastIndexOf("/");return e<0?".":t.slice(0,e)}function Dl(t){let e=t.lastIndexOf("/");return e<0?t:t.slice(e+1)}var qe=class extends ${constructor(){super(...arguments);this.noContext=!1}render(){let{repo:r,version:a,filePath:n}=tt(this.result.path),i=`/view/${this.result.path}`,o=this.splitGroups(this.result.lines),s=a.length>6?a.slice(0,6):a,l=Ll(n),c=Dl(n),d=this.result.lines.filter(f=>f!==null),h=d.map(f=>f[1]).join(`
`),g=ei(n,h),u=new Map;if(g)for(let f=0;f<d.length&&f<g.length;f++)u.set(d[f][0],g[f]);return v`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${i}>
              <span class="repo">${r}:</span><span class="version">${s}:</span>${l}/<span class="filename">${c}</span>
            </a>
          </span>
        </div>
        ${o.map(f=>v`
            <div class="match">
              <div class="contents">
                ${f.map(_=>{let y=_[0],N=_[1],M=_.length>2?_[2]:void 0,D=M!==void 0&&M.length>0,P=`${i}#L${y}`,T=u.get(y);if(!D&&T)return v`
                      <match-line
                        class="context"
                        .lineNo=${y}
                        href=${P}
                        text=${N}
                        .highlightedHTML=${T}
                      ></match-line>
                    `;let x=D&&M?M[0][0]:void 0,R=D&&M?M[0][1]:void 0;return v`
                    <match-line
                      class=${D?"match-hit":"context"}
                      .lineNo=${y}
                      text=${N}
                      href=${P}
                      .start=${x}
                      .end=${R}
                    ></match-line>
                  `})}
              </div>
            </div>
          `)}
      </div>
    `}splitGroups(r){let a=[],n=[];for(let i of r)i===null?n.length>0&&(a.push(n),n=[]):n.push(i);return n.length>0&&a.push(n),a}};qe.styles=[fn,me,O`
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
    `],b([A({type:Object})],qe.prototype,"result",2),b([A({type:Boolean,reflect:!0,attribute:"no-context"})],qe.prototype,"noContext",2),qe=b([z("cs-result-group")],qe);var Se=class extends ${constructor(){super(...arguments);this.total=0;this.timeMs=0;this.truncated=!1;this.loading=!1}render(){if(this.loading)return v`<div id="countarea">Searching...</div>`;let r=this.truncated?`${this.total}+`:`${this.total}`;return v`
      <div id="countarea">
        <span id="numresults">${r}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `}};Se.styles=[et,O`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `],b([A({type:Number})],Se.prototype,"total",2),b([A({type:Number})],Se.prototype,"timeMs",2),b([A({type:Boolean})],Se.prototype,"truncated",2),b([A({type:Boolean})],Se.prototype,"loading",2),Se=b([z("cs-result-stats")],Se);var Ge=class extends ${constructor(){super(...arguments);this.facets=null;this.selected={}}render(){let r=this.facets&&(this.facets.ext?.length||this.facets.repo?.length||this.facets.path?.length),a=Object.values(this.selected).some(o=>o.size>0);if(!r&&!a)return q;let i=[{label:"Extension",key:"f.ext",buckets:this.facets?.ext??[]},{label:"Repository",key:"f.repo",buckets:this.facets?.repo??[]},{label:"Path",key:"f.path",buckets:this.facets?.path??[]}].filter(o=>o.buckets.length>0||(this.selected[o.key]?.size??0)>0);return i.length===0?q:v`
      <div class="panel">
        ${i.map(o=>this.renderSection(o.label,o.key,o.buckets))}
      </div>
    `}renderSection(r,a,n){let i=this.selected[a]??new Set,s=[...n].sort((d,h)=>h.c-d.c||d.v.localeCompare(h.v)).slice(0,10),l=new Set(s.map(d=>d.v)),c=[...i].filter(d=>!l.has(d));return v`
      <div class="section">
        <span class="section-label">${r}</span>
        ${c.map(d=>v`
          <button
            class="pill stale"
            @click=${()=>this.toggle(a,d)}
          >${d}</button>
        `)}
        ${s.map(d=>v`
          <button
            class=${i.has(d.v)?"pill active":"pill"}
            @click=${()=>this.toggle(a,d.v)}
          >${d.v} <span class="count">${d.c}</span></button>
        `)}
      </div>
    `}toggle(r,a){this.dispatchEvent(new CustomEvent("facet-toggle",{detail:{key:r,value:a},bubbles:!0,composed:!0}))}};Ge.styles=O`
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
  `,b([A({type:Object})],Ge.prototype,"facets",2),b([A({type:Object})],Ge.prototype,"selected",2),Ge=b([z("cs-facet-panel")],Ge);var Lt=class extends ${render(){return v`
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
    `}};Lt.styles=[me,O`
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
    `],Lt=b([z("cs-search-help")],Lt);function Pl(t,e,r){let a=t[e]??new Set,n;return e==="f.path"?n=a.has(r)?new Set:new Set([r]):(n=new Set(a),n.has(r)?n.delete(r):n.add(r)),{...t,[e]:n}}function Ul(t){let e={};for(let[r,a]of Object.entries(t))a.size>0&&(e[r]=[...a]);return e}function zl(t){let e={};for(let r of["f.ext","f.repo","f.path"]){let a=t.getAll(r);a.length>0&&(e[r]=new Set(a))}return e}var Dt=class extends vt($){constructor(){super(...arguments);this.currentOptions={}}get activeFacets(){return zl(ie.get().params)}render(){let r=rt.get(),a=St.get(),n=Nt.get(),i=Ct.get(),o=Tt.get(),s=Rt.get(),l=At.get(),c=Mn.get(),d=i||o;return v`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${h=>h.preventDefault()}
        >
          <cs-search-input
            .value=${r}
            .error=${s??""}
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
        ${d?v`
          <div id="resultarea">
            <cs-result-stats
              .total=${i?.total??0}
              .timeMs=${i?.time_ms??0}
              .truncated=${i?.truncated??!1}
              .loading=${o}
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
                ${n.map(h=>{let{repo:g,version:u,filePath:f}=tt(h.path);return v`
                    <filename-match
                      text=${f}
                      start=${h.match[0]}
                      end=${h.match[1]}
                      repo=${g}
                      version=${u.slice(0,6)}
                      href="/view/${h.path}"
                    ></filename-match>
                  `})}
              </div>
              <div id="code-results">
                ${Tn({items:a,renderItem:h=>v`
                    <cs-result-group .result=${h} ?no-context=${c<=0}></cs-result-group>
                  `})}
              </div>
            </div>
          </div>
        `:v`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `}onFacetToggle(r){let a=Pl(this.activeFacets,r.detail.key,r.detail.value),n=rt.get();n&&wr(n,this.currentOptions,this.facetParamsFrom(a))}onSearchInput(r){In(r.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onSearchSubmit(r){wr(r.detail.value,this.currentOptions,this.facetParamsFrom(this.activeFacets))}onOptionsChange(r){this.currentOptions=r.detail,this.reSearch()}reSearch(){let r=rt.get();r&&wr(r,this.currentOptions,this.facetParamsFrom(this.activeFacets))}getRepos(){return window.__CS_INIT?.repos??[]}facetParamsFrom(r){return Ul(r)}};Dt.styles=[me,et,O`
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

    `],Dt=b([z("cs-search-view")],Dt);var st=class extends ${constructor(){super(...arguments);this.path=""}render(){let r=this.path.indexOf("/+/");if(r===-1)return v`<span>${this.path}</span>`;let a=this.path.slice(0,r),i=this.path.slice(r+3).split("/").filter(o=>o.length>0);return v`
      <nav class="breadcrumbs">
        <a href="/view/${a}/+/">${a}</a>
        ${i.map((o,s)=>{let l=i.slice(0,s+1).join("/"),c=`/view/${a}/+/${l}${s<i.length-1?"/":""}`;return v`<span class="sep">/</span><a href=${c}>${o}</a>`})}
      </nav>
    `}};st.styles=O`
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
  `,b([A()],st.prototype,"path",2),st=b([z("cs-breadcrumbs")],st);var Ke=class extends ${constructor(){super(...arguments);this.entries=[];this.basePath=""}render(){let r=[...this.entries].sort((a,n)=>{let i=a.endsWith("/"),o=n.endsWith("/");return i!==o?i?-1:1:a.localeCompare(n)});return v`
      <div class="listing">
        ${r.map(a=>{let n=a.endsWith("/"),i=this.basePath+a;return v`
            <a class=${n?"dir":"file"} href=${i}>${a}</a>
          `})}
      </div>
    `}};Ke.styles=O`
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
  `,b([A({type:Array})],Ke.prototype,"entries",2),b([A()],Ke.prototype,"basePath",2),Ke=b([z("cs-dir-listing")],Ke);var Bl="2.16.0",Fl=["ada","agda","asciidoc","asm","awk","bash","batch","c","c-sharp","caddy","capnp","cedar","cedarschema","clojure","cmake","cobol","commonlisp","cpp","css","d","dart","devicetree","diff","dockerfile","dot","elisp","elixir","elm","erlang","fish","fsharp","gleam","glsl","go","graphql","groovy","haskell","hcl","hlsl","html","idris","ini","java","javascript","jinja2","jq","json","julia","kotlin","lean","lua","markdown","matlab","meson","nginx","ninja","nix","objc","ocaml","perl","php","postscript","powershell","prolog","python","query","r","rego","rescript","ron","ruby","rust","scala","scheme","scss","solidity","sparql","sql","ssh-config","starlark","styx","svelte","swift","textproto","thrift","tlaplus","toml","tsx","typescript","typst","uiua","vb","verilog","vhdl","vim","vue","wit","x86asm","xml","yaml","yuri","zig","zsh"];function Hl(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var $a={manual:!1,theme:"one-dark",selector:"pre code",cdn:"jsdelivr",version:Bl,pluginsUrl:"",hostUrl:"",logger:console,resolveHostJs:({baseUrl:t,path:e})=>import(`${t}/${e}`),resolveHostWasm:({baseUrl:t,path:e})=>fetch(`${t}/${e}`),resolveJs:({baseUrl:t,path:e})=>import(`${t}/${e}`),resolveWasm:({baseUrl:t,path:e})=>fetch(`${t}/${e}`)},Ta=null,Ra=null,Lr={...$a},La=new Map,Oa=new Map,ri=new Set(Fl),Pt=null,Ma=null;async function ql(t){if(t.pluginsUrl)return Ma||(Ma=(async()=>{t.logger.debug(`[arborium] Loading local plugins manifest from: ${t.pluginsUrl}`);let e=await fetch(t.pluginsUrl);if(!e.ok)throw new Error(`Failed to load plugins.json: ${e.status}`);Pt=await e.json(),t.logger.debug(`[arborium] Loaded local manifest with ${Pt?.entries.length} entries`)})(),Ma)}function Gl(t,e){if(Pt){let i=Pt.entries.find(o=>o.language===t);if(i)return i.local_js.substring(0,i.local_js.lastIndexOf("/"))}let r=e.cdn,a=e.version,n;return r==="jsdelivr"?n="https://cdn.jsdelivr.net/npm":r==="unpkg"?n="https://unpkg.com":n=r,`${n}/@arborium/${t}@${a}`}async function Kl(t,e){let r=La.get(t);if(r)return e.logger.debug(`[arborium] Grammar '${t}' found in cache`),r;let a=Oa.get(t);if(a)return e.logger.debug(`[arborium] Grammar '${t}' already loading, waiting...`),a;let n=Wl(t,e);Oa.set(t,n);try{return await n}finally{Oa.delete(t)}}async function Wl(t,e){if(await ql(e),!ri.has(t)&&!Pt?.entries.some(r=>r.language===t))return e.logger.debug(`[arborium] Grammar '${t}' not available`),null;try{let r=Gl(t,e),a=e.resolveJs===$a.resolveJs?` from ${r}/grammar.js`:"";e.logger.debug(`[arborium] Loading grammar '${t}'${a}`);let n=await e.resolveJs({language:t,baseUrl:r,path:"grammar.js"}),i=await e.resolveWasm({language:t,baseUrl:r,path:"grammar_bg.wasm"});await n.default({module_or_path:i});let o=n.language_id();o!==t&&e.logger.warn(`[arborium] Language ID mismatch: expected '${t}', got '${o}'`);let s=n.injection_languages(),l={languageId:t,injectionLanguages:s,module:n,parseUtf8:c=>{let d=n.create_session();try{n.set_text(d,c);let h=n.parse(d);return{spans:h.spans||[],injections:h.injections||[]}}catch(h){return e.logger.error("[arborium] Parse error:",h),{spans:[],injections:[]}}finally{n.free_session(d)}},parseUtf16:c=>{let d=n.create_session();try{n.set_text(d,c);let h=n.parse_utf16(d);return{spans:h.spans||[],injections:h.injections||[]}}catch(h){return e.logger.error("[arborium] Parse error:",h),{spans:[],injections:[]}}finally{n.free_session(d)}}};return La.set(t,l),e.logger.debug(`[arborium] Grammar '${t}' loaded successfully`),l}catch(r){return e.logger.error(`[arborium] Failed to load grammar '${t}':`,r),null}}var Ia=new Map,jl=1;function Vl(t){globalThis.arboriumHost={isLanguageAvailable(e){return ri.has(e)||La.has(e)},async loadGrammar(e){let r=await Kl(e,t);if(!r)return 0;for(let[n,i]of Ia)if(i===r)return n;let a=jl++;return Ia.set(a,r),a},parse(e,r){let a=Ia.get(e);return a?a.parseUtf8(r):{spans:[],injections:[]}}}}function Zl(t){if(t.hostUrl)return t.hostUrl;let e=t.cdn,r=t.version,a;e==="jsdelivr"?a="https://cdn.jsdelivr.net/npm":e==="unpkg"?a="https://unpkg.com":a=e;let n=r==="latest"?"":`@${r}`;return`${a}/@arborium/arborium${n}/dist`}async function Yl(t){return Ta||Ra||(Ra=(async()=>{Vl(t);let e=Zl(t),r=t.resolveHostJs===$a.resolveHostJs?` from ${e}/arborium_host.js`:"";t.logger.debug(`[arborium] Loading host${r}`);try{let a=await t.resolveHostJs({baseUrl:e,path:"arborium_host.js"}),n=await t.resolveHostWasm({baseUrl:e,path:"arborium_host_bg.wasm"});return await a.default({module_or_path:n}),Ta={highlight:a.highlight,isLanguageAvailable:a.isLanguageAvailable},t.logger.debug("[arborium] Host loaded successfully"),Ta}catch(a){return t.logger.error("[arborium] Failed to load host:",a),null}})(),Ra)}async function ai(t,e,r){let a=Xl(r),n=await Yl(a);if(n)try{return n.highlight(t,e)}catch(i){a.logger.error("[arborium] Host highlight failed:",i)}return Hl(e)}function Xl(t){return t?{...Lr,...t}:{...Lr}}function ni(t){Lr={...Lr,...t}}var oi={".go":"go",".py":"python",".rs":"rust",".ts":"typescript",".tsx":"tsx",".js":"javascript",".jsx":"jsx",".c":"c",".h":"c",".cc":"cpp",".cpp":"cpp",".hpp":"cpp",".java":"java",".rb":"ruby",".sh":"bash",".bash":"bash",".zsh":"bash",".fish":"fish",".clj":"clojure",".cljs":"clojure",".cljc":"clojure",".yaml":"yaml",".yml":"yaml",".json":"json",".toml":"toml",".md":"markdown",".html":"html",".css":"css",".scss":"scss",".sql":"sql",".lua":"lua",".zig":"zig",".swift":"swift",".kt":"kotlin",".scala":"scala",".r":"r",".el":"elisp",".ex":"elixir",".erl":"erlang",".hs":"haskell",".ml":"ocaml",".fs":"fsharp",".proto":"protobuf",".tf":"hcl",".dockerfile":"dockerfile",".makefile":"make",".xml":"xml",".svg":"xml"},ii={Makefile:"make",makefile:"make",GNUmakefile:"make",Dockerfile:"dockerfile","CMakeLists.txt":"cmake",".gitignore":"gitignore",".bashrc":"bash",".zshrc":"bash",".profile":"bash"};function Ql(t){let e=t.split("/").pop()??"";if(ii[e])return ii[e];let r=e.lastIndexOf(".");if(r>=0){let a=e.slice(r).toLowerCase();if(oi[a])return oi[a]}return""}ni({logger:{debug:()=>{},warn:console.warn,error:console.error}});async function si(t,e){let r=Ql(t);if(!r)return null;try{return(await ai(r,e)).split(`
`)}catch{return null}}var li=`/* Arborium base CSS - handles light/dark switching */
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
`;var ec={navigate(t){window.location.href=t}};function tc(t,e,r){switch(t){case"Enter":return e?{type:"open-tab",url:`/search?q=${encodeURIComponent(e)}`}:{type:"close-help"};case"/":return{type:"navigate",url:`/search${e?"?q="+encodeURIComponent(e):""}`};case"?":return{type:"toggle-help"};case"Escape":return{type:"close-help"};case"v":return r?{type:"navigate",url:r}:{type:"close-help"};case"n":return e?{type:"find",text:e,backwards:!1}:{type:"close-help"};case"p":return e?{type:"find",text:e,backwards:!0}:{type:"close-help"}}return null}function rc(t,e,r,a){return!e||r<=0?Math.floor(t/3):r<=t?.5*(t-r):a/2}function ac(t,e){return t<0?"1":t===e?String(t):`${t}-L${e}`}function nc(t,e,r){return t?t.replace("{lno}",ac(e,r)):""}function oc(t){let e=t.match(/^#L(\d+)(?:-L?(\d+))?$/);if(!e)return[-1,-1];let r=parseInt(e[1],10),a=e[2]?parseInt(e[2],10):r;return[r,a]}var ne=class extends ${constructor(){super(...arguments);this.content="";this.basePath="";this.filePath="";this.repo="";this.version="";this.externalUrl="";this.selectedStart=-1;this.selectedEnd=-1;this.hasSelection=!1;this.highlightedLines=null;this.onHashChange=()=>{this.parseHash(),this.scrollToSelection()};this.onSelectionChange=()=>{this.hasSelection=(window.getSelection()?.toString()||"").length>0};this.onKeyDown=r=>{r.target.matches("input,textarea")||r.altKey||r.ctrlKey||r.metaKey||this.processKey(r.key)&&r.preventDefault()}}willUpdate(r){(r.has("content")||r.has("filePath"))&&(this.highlightedLines=null,this.content&&this.filePath&&si(this.filePath,this.content).then(a=>{a&&(this.highlightedLines=a)}))}connectedCallback(){super.connectedCallback(),this.parseHash(),window.addEventListener("hashchange",this.onHashChange),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("selectionchange",this.onSelectionChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this.onHashChange),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("selectionchange",this.onSelectionChange)}parseHash(){let[r,a]=oc(window.location.hash);this.selectedStart=r,this.selectedEnd=a}scrollToSelection(){this.selectedStart<0||this.updateComplete.then(()=>{let r=this.renderRoot.querySelector(`#L${this.selectedStart}`);if(!r)return;let a=this.selectedStart!==this.selectedEnd,n=0;if(a){let s=this.renderRoot.querySelector(`#L${this.selectedEnd}`);if(s){let l=r.getBoundingClientRect(),c=s.getBoundingClientRect();n=c.top+c.height-l.top}}let i=rc(window.innerHeight,a,n,r.offsetHeight),o=r.getBoundingClientRect();window.scrollTo(0,o.top+window.scrollY-i)})}firstUpdated(){this.scrollToSelection()}resolvedExternalUrl(){return nc(this.externalUrl,this.selectedStart,this.selectedEnd)}getSelectedText(){return window.getSelection()?.toString()||""}processKey(r){let a=tc(r,this.getSelectedText(),this.resolvedExternalUrl());if(!a)return!1;switch(a.type){case"navigate":ec.navigate(a.url);break;case"open-tab":window.open(a.url);break;case"find":window.find(a.text,!1,a.backwards);break;case"toggle-help":this.dispatchEvent(new CustomEvent("toggle-help",{bubbles:!0,composed:!0}));break;case"close-help":this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}));break}return!0}render(){let r=this.content.split(`
`);r.length>0&&r[r.length-1]===""&&r.pop();let a=this.highlightedLines;return v`
      ${this.hasSelection?v`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      `:""}
      <div class="viewer">
        ${r.map((n,i)=>{let o=i+1,s=o>=this.selectedStart&&o<=this.selectedEnd;return v`
            <div class="line ${s?"selected":""}" id="L${o}">
              <a class="lno" href="#L${o}" @click=${l=>this.onLineClick(l,o)}>${o}</a>
              <span class="code">${a&&a[i]?$r(a[i]):n}</span>
            </div>
          `})}
      </div>
    `}onLineClick(r,a){if(r.shiftKey&&this.selectedStart>0){r.preventDefault();let n=Math.min(this.selectedStart,a),i=Math.max(this.selectedStart,a);this.selectedStart=n,this.selectedEnd=i,history.replaceState(null,"",`#L${n}-L${i}`)}else this.selectedStart=a,this.selectedEnd=a}};ne.styles=[Ve(li),O`
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
  `],b([A()],ne.prototype,"content",2),b([A()],ne.prototype,"basePath",2),b([A()],ne.prototype,"filePath",2),b([A()],ne.prototype,"repo",2),b([A()],ne.prototype,"version",2),b([A()],ne.prototype,"externalUrl",2),b([ee()],ne.prototype,"selectedStart",2),b([ee()],ne.prototype,"selectedEnd",2),b([ee()],ne.prototype,"hasSelection",2),b([ee()],ne.prototype,"highlightedLines",2),ne=b([z("cs-code-viewer")],ne);var lt=class extends ${constructor(){super(...arguments);this.open=!1}render(){return this.open?v`
      <div class="overlay" @click=${this.close}>
        <div class="modal" @click=${r=>r.stopPropagation()}>
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
    `:v``}close(){this.open=!1,this.dispatchEvent(new CustomEvent("close-help",{bubbles:!0,composed:!0}))}};lt.styles=O`
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
  `,b([A({type:Boolean,reflect:!0})],lt.prototype,"open",2),lt=b([z("cs-help-modal")],lt);function ic(t){let e=t.indexOf("/+/");if(e>=0){let r=t.slice(0,e),a=t.slice(e+3),n=r.lastIndexOf("@");if(n>=0)return{repo:r.slice(0,n),version:r.slice(n+1),filePath:a}}return tt(t)}function sc(t){return t.endsWith("/")||t.endsWith("/+/")||!t.includes("/+/")}function lc(t,e){return`/raw/${t}${e&&!t.endsWith("/")?"/":""}`}function cc(t,e,r){let a="github.com/";return t.startsWith(a)?`https://github.com/${t.slice(a.length)}/blob/${e}/${r}#L{lno}`:""}var oe=class extends ${constructor(){super(...arguments);this.path="";this.content=null;this.dirEntries=null;this.readmeContent=null;this.loading=!0;this.error=null;this.showHelp=!1}willUpdate(r){r.has("path")&&this.fetchContent()}async fetchContent(){this.loading=!0,this.error=null,this.content=null,this.dirEntries=null,this.readmeContent=null;let r=sc(this.path),a=lc(this.path,r);try{let n=await fetch(a);if(!n.ok){this.error=`Not found (${n.status})`,this.loading=!1;return}(n.headers.get("Content-Type")??"").includes("application/json")?(this.dirEntries=await n.json(),this.fetchReadme(a)):this.content=await n.text()}catch(n){this.error=n instanceof Error?n.message:String(n)}this.loading=!1}async fetchReadme(r){if(!this.dirEntries)return;let a=this.dirEntries.find(n=>oe.README_RE.test(n));if(a)try{let n=r.endsWith("/")?r:r+"/",i=await fetch(n+a);i.ok&&(this.readmeContent=await i.text())}catch{}}render(){let r=ic(this.path),a=r.repo,n=r.version,i=cc(r.repo,r.version,r.filePath);return v`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading?v`<div class="status">Loading...</div>`:""}
        ${this.error?v`<div class="status error">${this.error}</div>`:""}

        ${this.dirEntries?v`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith("/")?"":"/"}"
          ></cs-dir-listing>
          ${this.readmeContent?v`
            <div class="readme">
              <pre>${this.readmeContent}</pre>
            </div>
          `:""}
        `:""}

        ${this.content!==null?v`
          <cs-code-viewer
            .content=${this.content}
            .filePath=${r.filePath}
            .repo=${a}
            .version=${n}
            .externalUrl=${i}
            @toggle-help=${()=>{this.showHelp=!this.showHelp}}
            @close-help=${()=>{this.showHelp=!1}}
          ></cs-code-viewer>
        `:""}
        <cs-help-modal ?open=${this.showHelp} @close-help=${()=>{this.showHelp=!1}}></cs-help-modal>
      </div>
    `}};oe.README_RE=/^readme\.(md|markdown|mdown|mkdn|txt|rst|org|adoc|asc)$/i,oe.styles=O`
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
  `,b([A()],oe.prototype,"path",2),b([ee()],oe.prototype,"content",2),b([ee()],oe.prototype,"dirEntries",2),b([ee()],oe.prototype,"readmeContent",2),b([ee()],oe.prototype,"loading",2),b([ee()],oe.prototype,"error",2),b([ee()],oe.prototype,"showHelp",2),oe=b([z("cs-file-view")],oe);var Ut=class extends ${render(){return v`
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
    `}};Ut.styles=[me,O`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `],Ut=b([z("cs-about-view")],Ut);var zt=class extends vt($){render(){let e=ie.get();return v`
      <main>${this.renderView(e)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `}renderView(e){switch(e.name){case"search":return v`<cs-search-view></cs-search-view>`;case"view":return v`<cs-file-view .path=${e.path??""}></cs-file-view>`;case"about":return v`<cs-about-view></cs-about-view>`;default:return v`<div class="placeholder">Not found</div>`}}};zt.styles=[me,O`
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
    `],zt=b([z("cs-app")],zt);export{zt as CsApp};
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
