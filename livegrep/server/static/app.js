(()=>{var Kc=Object.create;var bi=Object.defineProperty;var Xc=Object.getOwnPropertyDescriptor;var Jc=Object.getOwnPropertyNames;var Gc=Object.getPrototypeOf,Yc=Object.prototype.hasOwnProperty;var P=(e,n)=>()=>(e&&(n=e(e=0)),n);var Kt=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),wi=(e,n)=>{for(var a in n)bi(e,a,{get:n[a],
enumerable:!0})},Pl=(e,n,a,f)=>{if(n&&typeof n=="object"||typeof n=="function")for(let u of Jc(n))!Yc.
call(e,u)&&u!==a&&bi(e,u,{get:()=>n[u],enumerable:!(f=Xc(n,u))||f.enumerable});return e};var $e=(e,n,a)=>(a=e!=null?Kc(Gc(e)):{},Pl(n||!e||!e.__esModule?bi(a,"default",{value:e,enumerable:!0}):
a,e)),Zc=e=>Pl(bi({},"__esModule",{value:!0}),e);var er=Kt((Rl,Ti)=>{(function(e,n){"use strict";typeof Ti=="object"&&typeof Ti.exports=="object"?Ti.
exports=e.document?n(e,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with\
 a document");return n(a)}:n(e)})(typeof window<"u"?window:Rl,function(e,n){"use strict";var a=[],f=Object.
getPrototypeOf,u=a.slice,o=a.flat?function(t){return a.flat.call(t)}:function(t){return a.concat.apply(
[],t)},d=a.push,y=a.indexOf,b={},_=b.toString,R=b.hasOwnProperty,$=R.toString,X=$.call(Object),W={},
v=function(r){return typeof r=="function"&&typeof r.nodeType!="number"&&typeof r.item!="function"},D=function(r){
return r!=null&&r===r.window},T=e.document,F={type:!0,src:!0,nonce:!0,noModule:!0};function z(t,r,s){
s=s||T;var l,c,h=s.createElement("script");if(h.text=t,r)for(l in F)c=r[l]||r.getAttribute&&r.getAttribute(
l),c&&h.setAttribute(l,c);s.head.appendChild(h).parentNode.removeChild(h)}function Q(t){return t==null?
t+"":typeof t=="object"||typeof t=="function"?b[_.call(t)]||"object":typeof t}var nt="3.7.1",ut=/HTML$/i,
i=function(t,r){return new i.fn.init(t,r)};i.fn=i.prototype={jquery:nt,constructor:i,length:0,toArray:function(){
return u.call(this)},get:function(t){return t==null?u.call(this):t<0?this[t+this.length]:this[t]},pushStack:function(t){
var r=i.merge(this.constructor(),t);return r.prevObject=this,r},each:function(t){return i.each(this,
t)},map:function(t){return this.pushStack(i.map(this,function(r,s){return t.call(r,s,r)}))},slice:function(){
return this.pushStack(u.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){
return this.eq(-1)},even:function(){return this.pushStack(i.grep(this,function(t,r){return(r+1)%2}))},
odd:function(){return this.pushStack(i.grep(this,function(t,r){return r%2}))},eq:function(t){var r=this.
length,s=+t+(t<0?r:0);return this.pushStack(s>=0&&s<r?[this[s]]:[])},end:function(){return this.prevObject||
this.constructor()},push:d,sort:a.sort,splice:a.splice},i.extend=i.fn.extend=function(){var t,r,s,l,
c,h,g=arguments[0]||{},A=1,S=arguments.length,k=!1;for(typeof g=="boolean"&&(k=g,g=arguments[A]||{},
A++),typeof g!="object"&&!v(g)&&(g={}),A===S&&(g=this,A--);A<S;A++)if((t=arguments[A])!=null)for(r in t)
l=t[r],!(r==="__proto__"||g===l)&&(k&&l&&(i.isPlainObject(l)||(c=Array.isArray(l)))?(s=g[r],c&&!Array.
isArray(s)?h=[]:!c&&!i.isPlainObject(s)?h={}:h=s,c=!1,g[r]=i.extend(k,h,l)):l!==void 0&&(g[r]=l));return g},
i.extend({expando:"jQuery"+(nt+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(
t)},noop:function(){},isPlainObject:function(t){var r,s;return!t||_.call(t)!=="[object Object]"?!1:(r=
f(t),r?(s=R.call(r,"constructor")&&r.constructor,typeof s=="function"&&$.call(s)===X):!0)},isEmptyObject:function(t){
var r;for(r in t)return!1;return!0},globalEval:function(t,r,s){z(t,{nonce:r&&r.nonce},s)},each:function(t,r){
var s,l=0;if(tt(t))for(s=t.length;l<s&&r.call(t[l],l,t[l])!==!1;l++);else for(l in t)if(r.call(t[l],
l,t[l])===!1)break;return t},text:function(t){var r,s="",l=0,c=t.nodeType;if(!c)for(;r=t[l++];)s+=i.
text(r);return c===1||c===11?t.textContent:c===9?t.documentElement.textContent:c===3||c===4?t.nodeValue:
s},makeArray:function(t,r){var s=r||[];return t!=null&&(tt(Object(t))?i.merge(s,typeof t=="string"?[
t]:t):d.call(s,t)),s},inArray:function(t,r,s){return r==null?-1:y.call(r,t,s)},isXMLDoc:function(t){
var r=t&&t.namespaceURI,s=t&&(t.ownerDocument||t).documentElement;return!ut.test(r||s&&s.nodeName||"\
HTML")},merge:function(t,r){for(var s=+r.length,l=0,c=t.length;l<s;l++)t[c++]=r[l];return t.length=c,
t},grep:function(t,r,s){for(var l,c=[],h=0,g=t.length,A=!s;h<g;h++)l=!r(t[h],h),l!==A&&c.push(t[h]);
return c},map:function(t,r,s){var l,c,h=0,g=[];if(tt(t))for(l=t.length;h<l;h++)c=r(t[h],h,s),c!=null&&
g.push(c);else for(h in t)c=r(t[h],h,s),c!=null&&g.push(c);return o(g)},guid:1,support:W}),typeof Symbol==
"function"&&(i.fn[Symbol.iterator]=a[Symbol.iterator]),i.each("Boolean Number String Function Array \
Date RegExp Object Error Symbol".split(" "),function(t,r){b["[object "+r+"]"]=r.toLowerCase()});function tt(t){
var r=!!t&&"length"in t&&t.length,s=Q(t);return v(t)||D(t)?!1:s==="array"||r===0||typeof r=="number"&&
r>0&&r-1 in t}function et(t,r){return t.nodeName&&t.nodeName.toLowerCase()===r.toLowerCase()}var at=a.
pop,Tt=a.sort,wt=a.splice,mt="[\\x20\\t\\r\\n\\f]",lt=new RegExp("^"+mt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+
mt+"+$","g");i.contains=function(t,r){var s=r&&r.parentNode;return t===s||!!(s&&s.nodeType===1&&(t.contains?
t.contains(s):t.compareDocumentPosition&&t.compareDocumentPosition(s)&16))};var it=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
function pt(t,r){return r?t==="\0"?"\uFFFD":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+
" ":"\\"+t}i.escapeSelector=function(t){return(t+"").replace(it,pt)};var ft=T,m=d;(function(){var t,
r,s,l,c,h=m,g,A,S,k,B,V=i.expando,H=0,J=0,yt=mi(),kt=mi(),Ct=mi(),ne=mi(),Yt=function(w,N){return w===
N&&(c=!0),0},je="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop\
|multiple|open|readonly|required|scoped",Ve="(?:\\\\[\\da-fA-F]{1,6}"+mt+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x\
7f])+",Nt="\\["+mt+"*("+Ve+")(?:"+mt+"*([*^$|!~]?=)"+mt+`*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"\
|(`+Ve+"))|)"+mt+"*\\]",Sr=":("+Ve+`)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\
\\]]|`+Nt+")*)|.*)\\)|)",It=new RegExp(mt+"+","g"),Qt=new RegExp("^"+mt+"*,"+mt+"*"),_n=new RegExp("\
^"+mt+"*([>+~]|"+mt+")"+mt+"*"),Qs=new RegExp(mt+"|>"),Qe=new RegExp(Sr),Nn=new RegExp("^"+Ve+"$"),Ke={
ID:new RegExp("^#("+Ve+")"),CLASS:new RegExp("^\\.("+Ve+")"),TAG:new RegExp("^("+Ve+"|[*])"),ATTR:new RegExp(
"^"+Nt),PSEUDO:new RegExp("^"+Sr),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)\
(?:\\("+mt+"*(even|odd|(([+-]|)(\\d*)n|)"+mt+"*(?:([+-]|)"+mt+"*(\\d+)|))"+mt+"*\\)|)","i"),bool:new RegExp(
"^(?:"+je+")$","i"),needsContext:new RegExp("^"+mt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+
mt+"*((?:-\\d)?\\d*)"+mt+"*\\)|)(?=[^-]|$)","i")},ur=/^(?:input|select|textarea|button)$/i,fr=/^h\d$/i,
Re=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Ks=/[+~]/,Ze=new RegExp("\\\\[\\da-fA-F]{1,6}"+mt+"?|\\\\([^\\r\\n\
\\f])","g"),tr=function(w,N){var L="0x"+w.slice(1)-65536;return N||(L<0?String.fromCharCode(L+65536):
String.fromCharCode(L>>10|55296,L&1023|56320))},Bc=function(){cr()},zc=yi(function(w){return w.disabled===
!0&&et(w,"fieldset")},{dir:"parentNode",next:"legend"});function Wc(){try{return g.activeElement}catch{}}
try{h.apply(a=u.call(ft.childNodes),ft.childNodes),a[ft.childNodes.length].nodeType}catch{h={apply:function(N,L){
m.apply(N,u.call(L))},call:function(N){m.apply(N,u.call(arguments,1))}}}function Pt(w,N,L,M){var j,Z,
st,dt,ot,St,vt,xt=N&&N.ownerDocument,Et=N?N.nodeType:9;if(L=L||[],typeof w!="string"||!w||Et!==1&&Et!==
9&&Et!==11)return L;if(!M&&(cr(N),N=N||g,S)){if(Et!==11&&(ot=Re.exec(w)))if(j=ot[1]){if(Et===9)if(st=
N.getElementById(j)){if(st.id===j)return h.call(L,st),L}else return L;else if(xt&&(st=xt.getElementById(
j))&&Pt.contains(N,st)&&st.id===j)return h.call(L,st),L}else{if(ot[2])return h.apply(L,N.getElementsByTagName(
w)),L;if((j=ot[3])&&N.getElementsByClassName)return h.apply(L,N.getElementsByClassName(j)),L}if(!ne[w+
" "]&&(!k||!k.test(w))){if(vt=w,xt=N,Et===1&&(Qs.test(w)||_n.test(w))){for(xt=Ks.test(w)&&Xs(N.parentNode)||
N,(xt!=N||!W.scope)&&((dt=N.getAttribute("id"))?dt=i.escapeSelector(dt):N.setAttribute("id",dt=V)),St=
kn(w),Z=St.length;Z--;)St[Z]=(dt?"#"+dt:":scope")+" "+vi(St[Z]);vt=St.join(",")}try{return h.apply(L,
xt.querySelectorAll(vt)),L}catch{ne(w,!0)}finally{dt===V&&N.removeAttribute("id")}}}return Dl(w.replace(
lt,"$1"),N,L,M)}function mi(){var w=[];function N(L,M){return w.push(L+" ")>r.cacheLength&&delete N[w.
shift()],N[L+" "]=M}return N}function Fe(w){return w[V]=!0,w}function Qr(w){var N=g.createElement("f\
ieldset");try{return!!w(N)}catch{return!1}finally{N.parentNode&&N.parentNode.removeChild(N),N=null}}
function Uc(w){return function(N){return et(N,"input")&&N.type===w}}function jc(w){return function(N){
return(et(N,"input")||et(N,"button"))&&N.type===w}}function Il(w){return function(N){return"form"in N?
N.parentNode&&N.disabled===!1?"label"in N?"label"in N.parentNode?N.parentNode.disabled===w:N.disabled===
w:N.isDisabled===w||N.isDisabled!==!w&&zc(N)===w:N.disabled===w:"label"in N?N.disabled===w:!1}}function Er(w){
return Fe(function(N){return N=+N,Fe(function(L,M){for(var j,Z=w([],L.length,N),st=Z.length;st--;)L[j=
Z[st]]&&(L[j]=!(M[j]=L[j]))})})}function Xs(w){return w&&typeof w.getElementsByTagName<"u"&&w}function cr(w){
var N,L=w?w.ownerDocument||w:ft;return L==g||L.nodeType!==9||!L.documentElement||(g=L,A=g.documentElement,
S=!i.isXMLDoc(g),B=A.matches||A.webkitMatchesSelector||A.msMatchesSelector,A.msMatchesSelector&&ft!=
g&&(N=g.defaultView)&&N.top!==N&&N.addEventListener("unload",Bc),W.getById=Qr(function(M){return A.appendChild(
M).id=i.expando,!g.getElementsByName||!g.getElementsByName(i.expando).length}),W.disconnectedMatch=Qr(
function(M){return B.call(M,"*")}),W.scope=Qr(function(){return g.querySelectorAll(":scope")}),W.cssHas=
Qr(function(){try{return g.querySelector(":has(*,:jqfake)"),!1}catch{return!0}}),W.getById?(r.filter.
ID=function(M){var j=M.replace(Ze,tr);return function(Z){return Z.getAttribute("id")===j}},r.find.ID=
function(M,j){if(typeof j.getElementById<"u"&&S){var Z=j.getElementById(M);return Z?[Z]:[]}}):(r.filter.
ID=function(M){var j=M.replace(Ze,tr);return function(Z){var st=typeof Z.getAttributeNode<"u"&&Z.getAttributeNode(
"id");return st&&st.value===j}},r.find.ID=function(M,j){if(typeof j.getElementById<"u"&&S){var Z,st,
dt,ot=j.getElementById(M);if(ot){if(Z=ot.getAttributeNode("id"),Z&&Z.value===M)return[ot];for(dt=j.getElementsByName(
M),st=0;ot=dt[st++];)if(Z=ot.getAttributeNode("id"),Z&&Z.value===M)return[ot]}return[]}}),r.find.TAG=
function(M,j){return typeof j.getElementsByTagName<"u"?j.getElementsByTagName(M):j.querySelectorAll(
M)},r.find.CLASS=function(M,j){if(typeof j.getElementsByClassName<"u"&&S)return j.getElementsByClassName(
M)},k=[],Qr(function(M){var j;A.appendChild(M).innerHTML="<a id='"+V+"' href='' disabled='disabled'>\
</a><select id='"+V+"-\r\\' disabled='disabled'><option selected=''></option></select>",M.querySelectorAll(
"[selected]").length||k.push("\\["+mt+"*(?:value|"+je+")"),M.querySelectorAll("[id~="+V+"-]").length||
k.push("~="),M.querySelectorAll("a#"+V+"+*").length||k.push(".#.+[+~]"),M.querySelectorAll(":checked").
length||k.push(":checked"),j=g.createElement("input"),j.setAttribute("type","hidden"),M.appendChild(
j).setAttribute("name","D"),A.appendChild(M).disabled=!0,M.querySelectorAll(":disabled").length!==2&&
k.push(":enabled",":disabled"),j=g.createElement("input"),j.setAttribute("name",""),M.appendChild(j),
M.querySelectorAll("[name='']").length||k.push("\\["+mt+"*name"+mt+"*="+mt+`*(?:''|"")`)}),W.cssHas||
k.push(":has"),k=k.length&&new RegExp(k.join("|")),Yt=function(M,j){if(M===j)return c=!0,0;var Z=!M.
compareDocumentPosition-!j.compareDocumentPosition;return Z||(Z=(M.ownerDocument||M)==(j.ownerDocument||
j)?M.compareDocumentPosition(j):1,Z&1||!W.sortDetached&&j.compareDocumentPosition(M)===Z?M===g||M.ownerDocument==
ft&&Pt.contains(ft,M)?-1:j===g||j.ownerDocument==ft&&Pt.contains(ft,j)?1:l?y.call(l,M)-y.call(l,j):0:
Z&4?-1:1)}),g}Pt.matches=function(w,N){return Pt(w,null,null,N)},Pt.matchesSelector=function(w,N){if(cr(
w),S&&!ne[N+" "]&&(!k||!k.test(N)))try{var L=B.call(w,N);if(L||W.disconnectedMatch||w.document&&w.document.
nodeType!==11)return L}catch{ne(N,!0)}return Pt(N,g,null,[w]).length>0},Pt.contains=function(w,N){return(w.
ownerDocument||w)!=g&&cr(w),i.contains(w,N)},Pt.attr=function(w,N){(w.ownerDocument||w)!=g&&cr(w);var L=r.
attrHandle[N.toLowerCase()],M=L&&R.call(r.attrHandle,N.toLowerCase())?L(w,N,!S):void 0;return M!==void 0?
M:w.getAttribute(N)},Pt.error=function(w){throw new Error("Syntax error, unrecognized expression: "+
w)},i.uniqueSort=function(w){var N,L=[],M=0,j=0;if(c=!W.sortStable,l=!W.sortStable&&u.call(w,0),Tt.call(
w,Yt),c){for(;N=w[j++];)N===w[j]&&(M=L.push(j));for(;M--;)wt.call(w,L[M],1)}return l=null,w},i.fn.uniqueSort=
function(){return this.pushStack(i.uniqueSort(u.apply(this)))},r=i.expr={cacheLength:50,createPseudo:Fe,
match:Ke,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{
dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(w){return w[1]=
w[1].replace(Ze,tr),w[3]=(w[3]||w[4]||w[5]||"").replace(Ze,tr),w[2]==="~="&&(w[3]=" "+w[3]+" "),w.slice(
0,4)},CHILD:function(w){return w[1]=w[1].toLowerCase(),w[1].slice(0,3)==="nth"?(w[3]||Pt.error(w[0]),
w[4]=+(w[4]?w[5]+(w[6]||1):2*(w[3]==="even"||w[3]==="odd")),w[5]=+(w[7]+w[8]||w[3]==="odd")):w[3]&&Pt.
error(w[0]),w},PSEUDO:function(w){var N,L=!w[6]&&w[2];return Ke.CHILD.test(w[0])?null:(w[3]?w[2]=w[4]||
w[5]||"":L&&Qe.test(L)&&(N=kn(L,!0))&&(N=L.indexOf(")",L.length-N)-L.length)&&(w[0]=w[0].slice(0,N),
w[2]=L.slice(0,N)),w.slice(0,3))}},filter:{TAG:function(w){var N=w.replace(Ze,tr).toLowerCase();return w===
"*"?function(){return!0}:function(L){return et(L,N)}},CLASS:function(w){var N=yt[w+" "];return N||(N=
new RegExp("(^|"+mt+")"+w+"("+mt+"|$)"))&&yt(w,function(L){return N.test(typeof L.className=="string"&&
L.className||typeof L.getAttribute<"u"&&L.getAttribute("class")||"")})},ATTR:function(w,N,L){return function(M){
var j=Pt.attr(M,w);return j==null?N==="!=":N?(j+="",N==="="?j===L:N==="!="?j!==L:N==="^="?L&&j.indexOf(
L)===0:N==="*="?L&&j.indexOf(L)>-1:N==="$="?L&&j.slice(-L.length)===L:N==="~="?(" "+j.replace(It," ")+
" ").indexOf(L)>-1:N==="|="?j===L||j.slice(0,L.length+1)===L+"-":!1):!0}},CHILD:function(w,N,L,M,j){
var Z=w.slice(0,3)!=="nth",st=w.slice(-4)!=="last",dt=N==="of-type";return M===1&&j===0?function(ot){
return!!ot.parentNode}:function(ot,St,vt){var xt,Et,gt,Mt,be,le=Z!==st?"nextSibling":"previousSiblin\
g",Le=ot.parentNode,Xe=dt&&ot.nodeName.toLowerCase(),Kr=!vt&&!dt,he=!1;if(Le){if(Z){for(;le;){for(gt=
ot;gt=gt[le];)if(dt?et(gt,Xe):gt.nodeType===1)return!1;be=le=w==="only"&&!be&&"nextSibling"}return!0}
if(be=[st?Le.firstChild:Le.lastChild],st&&Kr){for(Et=Le[V]||(Le[V]={}),xt=Et[w]||[],Mt=xt[0]===H&&xt[1],
he=Mt&&xt[2],gt=Mt&&Le.childNodes[Mt];gt=++Mt&&gt&&gt[le]||(he=Mt=0)||be.pop();)if(gt.nodeType===1&&
++he&&gt===ot){Et[w]=[H,Mt,he];break}}else if(Kr&&(Et=ot[V]||(ot[V]={}),xt=Et[w]||[],Mt=xt[0]===H&&xt[1],
he=Mt),he===!1)for(;(gt=++Mt&&gt&&gt[le]||(he=Mt=0)||be.pop())&&!((dt?et(gt,Xe):gt.nodeType===1)&&++he&&
(Kr&&(Et=gt[V]||(gt[V]={}),Et[w]=[H,he]),gt===ot)););return he-=j,he===M||he%M===0&&he/M>=0}}},PSEUDO:function(w,N){
var L,M=r.pseudos[w]||r.setFilters[w.toLowerCase()]||Pt.error("unsupported pseudo: "+w);return M[V]?
M(N):M.length>1?(L=[w,w,"",N],r.setFilters.hasOwnProperty(w.toLowerCase())?Fe(function(j,Z){for(var st,
dt=M(j,N),ot=dt.length;ot--;)st=y.call(j,dt[ot]),j[st]=!(Z[st]=dt[ot])}):function(j){return M(j,0,L)}):
M}},pseudos:{not:Fe(function(w){var N=[],L=[],M=Zs(w.replace(lt,"$1"));return M[V]?Fe(function(j,Z,st,dt){
for(var ot,St=M(j,null,dt,[]),vt=j.length;vt--;)(ot=St[vt])&&(j[vt]=!(Z[vt]=ot))}):function(j,Z,st){
return N[0]=j,M(N,null,st,L),N[0]=null,!L.pop()}}),has:Fe(function(w){return function(N){return Pt(w,
N).length>0}}),contains:Fe(function(w){return w=w.replace(Ze,tr),function(N){return(N.textContent||i.
text(N)).indexOf(w)>-1}}),lang:Fe(function(w){return Nn.test(w||"")||Pt.error("unsupported lang: "+w),
w=w.replace(Ze,tr).toLowerCase(),function(N){var L;do if(L=S?N.lang:N.getAttribute("xml:lang")||N.getAttribute(
"lang"))return L=L.toLowerCase(),L===w||L.indexOf(w+"-")===0;while((N=N.parentNode)&&N.nodeType===1);
return!1}}),target:function(w){var N=e.location&&e.location.hash;return N&&N.slice(1)===w.id},root:function(w){
return w===A},focus:function(w){return w===Wc()&&g.hasFocus()&&!!(w.type||w.href||~w.tabIndex)},enabled:Il(
!1),disabled:Il(!0),checked:function(w){return et(w,"input")&&!!w.checked||et(w,"option")&&!!w.selected},
selected:function(w){return w.parentNode&&w.parentNode.selectedIndex,w.selected===!0},empty:function(w){
for(w=w.firstChild;w;w=w.nextSibling)if(w.nodeType<6)return!1;return!0},parent:function(w){return!r.
pseudos.empty(w)},header:function(w){return fr.test(w.nodeName)},input:function(w){return ur.test(w.
nodeName)},button:function(w){return et(w,"input")&&w.type==="button"||et(w,"button")},text:function(w){
var N;return et(w,"input")&&w.type==="text"&&((N=w.getAttribute("type"))==null||N.toLowerCase()==="t\
ext")},first:Er(function(){return[0]}),last:Er(function(w,N){return[N-1]}),eq:Er(function(w,N,L){return[
L<0?L+N:L]}),even:Er(function(w,N){for(var L=0;L<N;L+=2)w.push(L);return w}),odd:Er(function(w,N){for(var L=1;L<
N;L+=2)w.push(L);return w}),lt:Er(function(w,N,L){var M;for(L<0?M=L+N:L>N?M=N:M=L;--M>=0;)w.push(M);
return w}),gt:Er(function(w,N,L){for(var M=L<0?L+N:L;++M<N;)w.push(M);return w})}},r.pseudos.nth=r.pseudos.
eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=Uc(t);for(t in{submit:!0,
reset:!0})r.pseudos[t]=jc(t);function Ol(){}Ol.prototype=r.filters=r.pseudos,r.setFilters=new Ol;function kn(w,N){
var L,M,j,Z,st,dt,ot,St=kt[w+" "];if(St)return N?0:St.slice(0);for(st=w,dt=[],ot=r.preFilter;st;){(!L||
(M=Qt.exec(st)))&&(M&&(st=st.slice(M[0].length)||st),dt.push(j=[])),L=!1,(M=_n.exec(st))&&(L=M.shift(),
j.push({value:L,type:M[0].replace(lt," ")}),st=st.slice(L.length));for(Z in r.filter)(M=Ke[Z].exec(st))&&
(!ot[Z]||(M=ot[Z](M)))&&(L=M.shift(),j.push({value:L,type:Z,matches:M}),st=st.slice(L.length));if(!L)
break}return N?st.length:st?Pt.error(w):kt(w,dt).slice(0)}function vi(w){for(var N=0,L=w.length,M="";N<
L;N++)M+=w[N].value;return M}function yi(w,N,L){var M=N.dir,j=N.next,Z=j||M,st=L&&Z==="parentNode",dt=J++;
return N.first?function(ot,St,vt){for(;ot=ot[M];)if(ot.nodeType===1||st)return w(ot,St,vt);return!1}:
function(ot,St,vt){var xt,Et,gt=[H,dt];if(vt){for(;ot=ot[M];)if((ot.nodeType===1||st)&&w(ot,St,vt))return!0}else
for(;ot=ot[M];)if(ot.nodeType===1||st)if(Et=ot[V]||(ot[V]={}),j&&et(ot,j))ot=ot[M]||ot;else{if((xt=Et[Z])&&
xt[0]===H&&xt[1]===dt)return gt[2]=xt[2];if(Et[Z]=gt,gt[2]=w(ot,St,vt))return!0}return!1}}function Js(w){
return w.length>1?function(N,L,M){for(var j=w.length;j--;)if(!w[j](N,L,M))return!1;return!0}:w[0]}function Vc(w,N,L){
for(var M=0,j=N.length;M<j;M++)Pt(w,N[M],L);return L}function xi(w,N,L,M,j){for(var Z,st=[],dt=0,ot=w.
length,St=N!=null;dt<ot;dt++)(Z=w[dt])&&(!L||L(Z,M,j))&&(st.push(Z),St&&N.push(dt));return st}function Gs(w,N,L,M,j,Z){
return M&&!M[V]&&(M=Gs(M)),j&&!j[V]&&(j=Gs(j,Z)),Fe(function(st,dt,ot,St){var vt,xt,Et,gt,Mt=[],be=[],
le=dt.length,Le=st||Vc(N||"*",ot.nodeType?[ot]:ot,[]),Xe=w&&(st||!N)?xi(Le,Mt,w,ot,St):Le;if(L?(gt=j||
(st?w:le||M)?[]:dt,L(Xe,gt,ot,St)):gt=Xe,M)for(vt=xi(gt,be),M(vt,[],ot,St),xt=vt.length;xt--;)(Et=vt[xt])&&
(gt[be[xt]]=!(Xe[be[xt]]=Et));if(st){if(j||w){if(j){for(vt=[],xt=gt.length;xt--;)(Et=gt[xt])&&vt.push(
Xe[xt]=Et);j(null,gt=[],vt,St)}for(xt=gt.length;xt--;)(Et=gt[xt])&&(vt=j?y.call(st,Et):Mt[xt])>-1&&(st[vt]=
!(dt[vt]=Et))}}else gt=xi(gt===dt?gt.splice(le,gt.length):gt),j?j(null,dt,gt,St):h.apply(dt,gt)})}function Ys(w){
for(var N,L,M,j=w.length,Z=r.relative[w[0].type],st=Z||r.relative[" "],dt=Z?1:0,ot=yi(function(xt){return xt===
N},st,!0),St=yi(function(xt){return y.call(N,xt)>-1},st,!0),vt=[function(xt,Et,gt){var Mt=!Z&&(gt||Et!=
s)||((N=Et).nodeType?ot(xt,Et,gt):St(xt,Et,gt));return N=null,Mt}];dt<j;dt++)if(L=r.relative[w[dt].type])
vt=[yi(Js(vt),L)];else{if(L=r.filter[w[dt].type].apply(null,w[dt].matches),L[V]){for(M=++dt;M<j&&!r.
relative[w[M].type];M++);return Gs(dt>1&&Js(vt),dt>1&&vi(w.slice(0,dt-1).concat({value:w[dt-2].type===
" "?"*":""})).replace(lt,"$1"),L,dt<M&&Ys(w.slice(dt,M)),M<j&&Ys(w=w.slice(M)),M<j&&vi(w))}vt.push(L)}
return Js(vt)}function Qc(w,N){var L=N.length>0,M=w.length>0,j=function(Z,st,dt,ot,St){var vt,xt,Et,
gt=0,Mt="0",be=Z&&[],le=[],Le=s,Xe=Z||M&&r.find.TAG("*",St),Kr=H+=Le==null?1:Math.random()||.1,he=Xe.
length;for(St&&(s=st==g||st||St);Mt!==he&&(vt=Xe[Mt])!=null;Mt++){if(M&&vt){for(xt=0,!st&&vt.ownerDocument!=
g&&(cr(vt),dt=!S);Et=w[xt++];)if(Et(vt,st||g,dt)){h.call(ot,vt);break}St&&(H=Kr)}L&&((vt=!Et&&vt)&&gt--,
Z&&be.push(vt))}if(gt+=Mt,L&&Mt!==gt){for(xt=0;Et=N[xt++];)Et(be,le,st,dt);if(Z){if(gt>0)for(;Mt--;)
be[Mt]||le[Mt]||(le[Mt]=at.call(ot));le=xi(le)}h.apply(ot,le),St&&!Z&&le.length>0&&gt+N.length>1&&i.
uniqueSort(ot)}return St&&(H=Kr,s=Le),be};return L?Fe(j):j}function Zs(w,N){var L,M=[],j=[],Z=Ct[w+"\
 "];if(!Z){for(N||(N=kn(w)),L=N.length;L--;)Z=Ys(N[L]),Z[V]?M.push(Z):j.push(Z);Z=Ct(w,Qc(j,M)),Z.selector=
w}return Z}function Dl(w,N,L,M){var j,Z,st,dt,ot,St=typeof w=="function"&&w,vt=!M&&kn(w=St.selector||
w);if(L=L||[],vt.length===1){if(Z=vt[0]=vt[0].slice(0),Z.length>2&&(st=Z[0]).type==="ID"&&N.nodeType===
9&&S&&r.relative[Z[1].type]){if(N=(r.find.ID(st.matches[0].replace(Ze,tr),N)||[])[0],N)St&&(N=N.parentNode);else
return L;w=w.slice(Z.shift().value.length)}for(j=Ke.needsContext.test(w)?0:Z.length;j--&&(st=Z[j],!r.
relative[dt=st.type]);)if((ot=r.find[dt])&&(M=ot(st.matches[0].replace(Ze,tr),Ks.test(Z[0].type)&&Xs(
N.parentNode)||N))){if(Z.splice(j,1),w=M.length&&vi(Z),!w)return h.apply(L,M),L;break}}return(St||Zs(
w,vt))(M,N,!S,L,!N||Ks.test(w)&&Xs(N.parentNode)||N),L}W.sortStable=V.split("").sort(Yt).join("")===
V,cr(),W.sortDetached=Qr(function(w){return w.compareDocumentPosition(g.createElement("fieldset"))&1}),
i.find=Pt,i.expr[":"]=i.expr.pseudos,i.unique=i.uniqueSort,Pt.compile=Zs,Pt.select=Dl,Pt.setDocument=
cr,Pt.tokenize=kn,Pt.escape=i.escapeSelector,Pt.getText=i.text,Pt.isXML=i.isXMLDoc,Pt.selectors=i.expr,
Pt.support=i.support,Pt.uniqueSort=i.uniqueSort})();var C=function(t,r,s){for(var l=[],c=s!==void 0;(t=
t[r])&&t.nodeType!==9;)if(t.nodeType===1){if(c&&i(t).is(s))break;l.push(t)}return l},I=function(t,r){
for(var s=[];t;t=t.nextSibling)t.nodeType===1&&t!==r&&s.push(t);return s},q=i.expr.match.needsContext,
G=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function Y(t,r,s){return v(r)?i.
grep(t,function(l,c){return!!r.call(l,c,l)!==s}):r.nodeType?i.grep(t,function(l){return l===r!==s}):
typeof r!="string"?i.grep(t,function(l){return y.call(r,l)>-1!==s}):i.filter(r,t,s)}i.filter=function(t,r,s){
var l=r[0];return s&&(t=":not("+t+")"),r.length===1&&l.nodeType===1?i.find.matchesSelector(l,t)?[l]:
[]:i.find.matches(t,i.grep(r,function(c){return c.nodeType===1}))},i.fn.extend({find:function(t){var r,
s,l=this.length,c=this;if(typeof t!="string")return this.pushStack(i(t).filter(function(){for(r=0;r<
l;r++)if(i.contains(c[r],this))return!0}));for(s=this.pushStack([]),r=0;r<l;r++)i.find(t,c[r],s);return l>
1?i.uniqueSort(s):s},filter:function(t){return this.pushStack(Y(this,t||[],!1))},not:function(t){return this.
pushStack(Y(this,t||[],!0))},is:function(t){return!!Y(this,typeof t=="string"&&q.test(t)?i(t):t||[],
!1).length}});var ct,$t=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,ce=i.fn.init=function(t,r,s){var l,c;if(!t)
return this;if(s=s||ct,typeof t=="string")if(t[0]==="<"&&t[t.length-1]===">"&&t.length>=3?l=[null,t,
null]:l=$t.exec(t),l&&(l[1]||!r))if(l[1]){if(r=r instanceof i?r[0]:r,i.merge(this,i.parseHTML(l[1],r&&
r.nodeType?r.ownerDocument||r:T,!0)),G.test(l[1])&&i.isPlainObject(r))for(l in r)v(this[l])?this[l](
r[l]):this.attr(l,r[l]);return this}else return c=T.getElementById(l[2]),c&&(this[0]=c,this.length=1),
this;else return!r||r.jquery?(r||s).find(t):this.constructor(r).find(t);else{if(t.nodeType)return this[0]=
t,this.length=1,this;if(v(t))return s.ready!==void 0?s.ready(t):t(i)}return i.makeArray(t,this)};ce.
prototype=i.fn,ct=i(T);var Vt=/^(?:parents|prev(?:Until|All))/,Zt={children:!0,contents:!0,next:!0,prev:!0};
i.fn.extend({has:function(t){var r=i(t,this),s=r.length;return this.filter(function(){for(var l=0;l<
s;l++)if(i.contains(this,r[l]))return!0})},closest:function(t,r){var s,l=0,c=this.length,h=[],g=typeof t!=
"string"&&i(t);if(!q.test(t)){for(;l<c;l++)for(s=this[l];s&&s!==r;s=s.parentNode)if(s.nodeType<11&&(g?
g.index(s)>-1:s.nodeType===1&&i.find.matchesSelector(s,t))){h.push(s);break}}return this.pushStack(h.
length>1?i.uniqueSort(h):h)},index:function(t){return t?typeof t=="string"?y.call(i(t),this[0]):y.call(
this,t.jquery?t[0]:t):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,r){
return this.pushStack(i.uniqueSort(i.merge(this.get(),i(t,r))))},addBack:function(t){return this.add(
t==null?this.prevObject:this.prevObject.filter(t))}});function _e(t,r){for(;(t=t[r])&&t.nodeType!==1;)
;return t}i.each({parent:function(t){var r=t.parentNode;return r&&r.nodeType!==11?r:null},parents:function(t){
return C(t,"parentNode")},parentsUntil:function(t,r,s){return C(t,"parentNode",s)},next:function(t){
return _e(t,"nextSibling")},prev:function(t){return _e(t,"previousSibling")},nextAll:function(t){return C(
t,"nextSibling")},prevAll:function(t){return C(t,"previousSibling")},nextUntil:function(t,r,s){return C(
t,"nextSibling",s)},prevUntil:function(t,r,s){return C(t,"previousSibling",s)},siblings:function(t){
return I((t.parentNode||{}).firstChild,t)},children:function(t){return I(t.firstChild)},contents:function(t){
return t.contentDocument!=null&&f(t.contentDocument)?t.contentDocument:(et(t,"template")&&(t=t.content||
t),i.merge([],t.childNodes))}},function(t,r){i.fn[t]=function(s,l){var c=i.map(this,r,s);return t.slice(
-5)!=="Until"&&(l=s),l&&typeof l=="string"&&(c=i.filter(l,c)),this.length>1&&(Zt[t]||i.uniqueSort(c),
Vt.test(t)&&c.reverse()),this.pushStack(c)}});var ve=/[^\x20\t\r\n\f]+/g;function ar(t){var r={};return i.
each(t.match(ve)||[],function(s,l){r[l]=!0}),r}i.Callbacks=function(t){t=typeof t=="string"?ar(t):i.
extend({},t);var r,s,l,c,h=[],g=[],A=-1,S=function(){for(c=c||t.once,l=r=!0;g.length;A=-1)for(s=g.shift();++A<
h.length;)h[A].apply(s[0],s[1])===!1&&t.stopOnFalse&&(A=h.length,s=!1);t.memory||(s=!1),r=!1,c&&(s?h=
[]:h="")},k={add:function(){return h&&(s&&!r&&(A=h.length-1,g.push(s)),function B(V){i.each(V,function(H,J){
v(J)?(!t.unique||!k.has(J))&&h.push(J):J&&J.length&&Q(J)!=="string"&&B(J)})}(arguments),s&&!r&&S()),
this},remove:function(){return i.each(arguments,function(B,V){for(var H;(H=i.inArray(V,h,H))>-1;)h.splice(
H,1),H<=A&&A--}),this},has:function(B){return B?i.inArray(B,h)>-1:h.length>0},empty:function(){return h&&
(h=[]),this},disable:function(){return c=g=[],h=s="",this},disabled:function(){return!h},lock:function(){
return c=g=[],!s&&!r&&(h=s=""),this},locked:function(){return!!c},fireWith:function(B,V){return c||(V=
V||[],V=[B,V.slice?V.slice():V],g.push(V),r||S()),this},fire:function(){return k.fireWith(this,arguments),
this},fired:function(){return!!l}};return k};function qe(t){return t}function ae(t){throw t}function p(t,r,s,l){
var c;try{t&&v(c=t.promise)?c.call(t).done(r).fail(s):t&&v(c=t.then)?c.call(t,r,s):r.apply(void 0,[t].
slice(l))}catch(h){s.apply(void 0,[h])}}i.extend({Deferred:function(t){var r=[["notify","progress",i.
Callbacks("memory"),i.Callbacks("memory"),2],["resolve","done",i.Callbacks("once memory"),i.Callbacks(
"once memory"),0,"resolved"],["reject","fail",i.Callbacks("once memory"),i.Callbacks("once memory"),
1,"rejected"]],s="pending",l={state:function(){return s},always:function(){return c.done(arguments).
fail(arguments),this},catch:function(h){return l.then(null,h)},pipe:function(){var h=arguments;return i.
Deferred(function(g){i.each(r,function(A,S){var k=v(h[S[4]])&&h[S[4]];c[S[1]](function(){var B=k&&k.
apply(this,arguments);B&&v(B.promise)?B.promise().progress(g.notify).done(g.resolve).fail(g.reject):
g[S[0]+"With"](this,k?[B]:arguments)})}),h=null}).promise()},then:function(h,g,A){var S=0;function k(B,V,H,J){
return function(){var yt=this,kt=arguments,Ct=function(){var Yt,je;if(!(B<S)){if(Yt=H.apply(yt,kt),Yt===
V.promise())throw new TypeError("Thenable self-resolution");je=Yt&&(typeof Yt=="object"||typeof Yt==
"function")&&Yt.then,v(je)?J?je.call(Yt,k(S,V,qe,J),k(S,V,ae,J)):(S++,je.call(Yt,k(S,V,qe,J),k(S,V,ae,
J),k(S,V,qe,V.notifyWith))):(H!==qe&&(yt=void 0,kt=[Yt]),(J||V.resolveWith)(yt,kt))}},ne=J?Ct:function(){
try{Ct()}catch(Yt){i.Deferred.exceptionHook&&i.Deferred.exceptionHook(Yt,ne.error),B+1>=S&&(H!==ae&&
(yt=void 0,kt=[Yt]),V.rejectWith(yt,kt))}};B?ne():(i.Deferred.getErrorHook?ne.error=i.Deferred.getErrorHook():
i.Deferred.getStackHook&&(ne.error=i.Deferred.getStackHook()),e.setTimeout(ne))}}return i.Deferred(function(B){
r[0][3].add(k(0,B,v(A)?A:qe,B.notifyWith)),r[1][3].add(k(0,B,v(h)?h:qe)),r[2][3].add(k(0,B,v(g)?g:ae))}).
promise()},promise:function(h){return h!=null?i.extend(h,l):l}},c={};return i.each(r,function(h,g){var A=g[2],
S=g[5];l[g[1]]=A.add,S&&A.add(function(){s=S},r[3-h][2].disable,r[3-h][3].disable,r[0][2].lock,r[0][3].
lock),A.add(g[3].fire),c[g[0]]=function(){return c[g[0]+"With"](this===c?void 0:this,arguments),this},
c[g[0]+"With"]=A.fireWith}),l.promise(c),t&&t.call(c,c),c},when:function(t){var r=arguments.length,s=r,
l=Array(s),c=u.call(arguments),h=i.Deferred(),g=function(A){return function(S){l[A]=this,c[A]=arguments.
length>1?u.call(arguments):S,--r||h.resolveWith(l,c)}};if(r<=1&&(p(t,h.done(g(s)).resolve,h.reject,!r),
h.state()==="pending"||v(c[s]&&c[s].then)))return h.then();for(;s--;)p(c[s],g(s),h.reject);return h.
promise()}});var x=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;i.Deferred.exceptionHook=
function(t,r){e.console&&e.console.warn&&t&&x.test(t.name)&&e.console.warn("jQuery.Deferred exceptio\
n: "+t.message,t.stack,r)},i.readyException=function(t){e.setTimeout(function(){throw t})};var E=i.Deferred();
i.fn.ready=function(t){return E.then(t).catch(function(r){i.readyException(r)}),this},i.extend({isReady:!1,
readyWait:1,ready:function(t){(t===!0?--i.readyWait:i.isReady)||(i.isReady=!0,!(t!==!0&&--i.readyWait>
0)&&E.resolveWith(T,[i]))}}),i.ready.then=E.then;function O(){T.removeEventListener("DOMContentLoade\
d",O),e.removeEventListener("load",O),i.ready()}T.readyState==="complete"||T.readyState!=="loading"&&
!T.documentElement.doScroll?e.setTimeout(i.ready):(T.addEventListener("DOMContentLoaded",O),e.addEventListener(
"load",O));var U=function(t,r,s,l,c,h,g){var A=0,S=t.length,k=s==null;if(Q(s)==="object"){c=!0;for(A in s)
U(t,r,A,s[A],!0,h,g)}else if(l!==void 0&&(c=!0,v(l)||(g=!0),k&&(g?(r.call(t,l),r=null):(k=r,r=function(B,V,H){
return k.call(i(B),H)})),r))for(;A<S;A++)r(t[A],s,g?l:l.call(t[A],A,r(t[A],s)));return c?t:k?r.call(
t):S?r(t[0],s):h},K=/^-ms-/,ht=/-([a-z])/g;function _t(t,r){return r.toUpperCase()}function Dt(t){return t.
replace(K,"ms-").replace(ht,_t)}var Gt=function(t){return t.nodeType===1||t.nodeType===9||!+t.nodeType};
function Xt(){this.expando=i.expando+Xt.uid++}Xt.uid=1,Xt.prototype={cache:function(t){var r=t[this.
expando];return r||(r={},Gt(t)&&(t.nodeType?t[this.expando]=r:Object.defineProperty(t,this.expando,{
value:r,configurable:!0}))),r},set:function(t,r,s){var l,c=this.cache(t);if(typeof r=="string")c[Dt(
r)]=s;else for(l in r)c[Dt(l)]=r[l];return c},get:function(t,r){return r===void 0?this.cache(t):t[this.
expando]&&t[this.expando][Dt(r)]},access:function(t,r,s){return r===void 0||r&&typeof r=="string"&&s===
void 0?this.get(t,r):(this.set(t,r,s),s!==void 0?s:r)},remove:function(t,r){var s,l=t[this.expando];
if(l!==void 0){if(r!==void 0)for(Array.isArray(r)?r=r.map(Dt):(r=Dt(r),r=r in l?[r]:r.match(ve)||[]),
s=r.length;s--;)delete l[r[s]];(r===void 0||i.isEmptyObject(l))&&(t.nodeType?t[this.expando]=void 0:
delete t[this.expando])}},hasData:function(t){var r=t[this.expando];return r!==void 0&&!i.isEmptyObject(
r)}};var rt=new Xt,zt=new Xt,Ue=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Os=/[A-Z]/g;function Jt(t){return t===
"true"?!0:t==="false"?!1:t==="null"?null:t===+t+""?+t:Ue.test(t)?JSON.parse(t):t}function te(t,r,s){
var l;if(s===void 0&&t.nodeType===1)if(l="data-"+r.replace(Os,"-$&").toLowerCase(),s=t.getAttribute(
l),typeof s=="string"){try{s=Jt(s)}catch{}zt.set(t,r,s)}else s=void 0;return s}i.extend({hasData:function(t){
return zt.hasData(t)||rt.hasData(t)},data:function(t,r,s){return zt.access(t,r,s)},removeData:function(t,r){
zt.remove(t,r)},_data:function(t,r,s){return rt.access(t,r,s)},_removeData:function(t,r){rt.remove(t,
r)}}),i.fn.extend({data:function(t,r){var s,l,c,h=this[0],g=h&&h.attributes;if(t===void 0){if(this.length&&
(c=zt.get(h),h.nodeType===1&&!rt.get(h,"hasDataAttrs"))){for(s=g.length;s--;)g[s]&&(l=g[s].name,l.indexOf(
"data-")===0&&(l=Dt(l.slice(5)),te(h,l,c[l])));rt.set(h,"hasDataAttrs",!0)}return c}return typeof t==
"object"?this.each(function(){zt.set(this,t)}):U(this,function(A){var S;if(h&&A===void 0)return S=zt.
get(h,t),S!==void 0||(S=te(h,t),S!==void 0)?S:void 0;this.each(function(){zt.set(this,t,A)})},null,r,
arguments.length>1,null,!0)},removeData:function(t){return this.each(function(){zt.remove(this,t)})}}),
i.extend({queue:function(t,r,s){var l;if(t)return r=(r||"fx")+"queue",l=rt.get(t,r),s&&(!l||Array.isArray(
s)?l=rt.access(t,r,i.makeArray(s)):l.push(s)),l||[]},dequeue:function(t,r){r=r||"fx";var s=i.queue(t,
r),l=s.length,c=s.shift(),h=i._queueHooks(t,r),g=function(){i.dequeue(t,r)};c==="inprogress"&&(c=s.shift(),
l--),c&&(r==="fx"&&s.unshift("inprogress"),delete h.stop,c.call(t,g,h)),!l&&h&&h.empty.fire()},_queueHooks:function(t,r){
var s=r+"queueHooks";return rt.get(t,s)||rt.access(t,s,{empty:i.Callbacks("once memory").add(function(){
rt.remove(t,[r+"queue",s])})})}}),i.fn.extend({queue:function(t,r){var s=2;return typeof t!="string"&&
(r=t,t="fx",s--),arguments.length<s?i.queue(this[0],t):r===void 0?this:this.each(function(){var l=i.
queue(this,t,r);i._queueHooks(this,t),t==="fx"&&l[0]!=="inprogress"&&i.dequeue(this,t)})},dequeue:function(t){
return this.each(function(){i.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},
promise:function(t,r){var s,l=1,c=i.Deferred(),h=this,g=this.length,A=function(){--l||c.resolveWith(
h,[h])};for(typeof t!="string"&&(r=t,t=void 0),t=t||"fx";g--;)s=rt.get(h[g],t+"queueHooks"),s&&s.empty&&
(l++,s.empty.add(A));return A(),c.promise(r)}});var Ne=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
Ge=new RegExp("^(?:([+-])=|)("+Ne+")([a-z%]*)$","i"),De=["Top","Right","Bottom","Left"],Ye=T.documentElement,
lr=function(t){return i.contains(t.ownerDocument,t)},Ds={composed:!0};Ye.getRootNode&&(lr=function(t){
return i.contains(t.ownerDocument,t)||t.getRootNode(Ds)===t.ownerDocument});var ci=function(t,r){return t=
r||t,t.style.display==="none"||t.style.display===""&&lr(t)&&i.css(t,"display")==="none"};function el(t,r,s,l){
var c,h,g=20,A=l?function(){return l.cur()}:function(){return i.css(t,r,"")},S=A(),k=s&&s[3]||(i.cssNumber[r]?
"":"px"),B=t.nodeType&&(i.cssNumber[r]||k!=="px"&&+S)&&Ge.exec(i.css(t,r));if(B&&B[3]!==k){for(S=S/2,
k=k||B[3],B=+S||1;g--;)i.style(t,r,B+k),(1-h)*(1-(h=A()/S||.5))<=0&&(g=0),B=B/h;B=B*2,i.style(t,r,B+
k),s=s||[]}return s&&(B=+B||+S||0,c=s[1]?B+(s[1]+1)*s[2]:+s[2],l&&(l.unit=k,l.start=B,l.end=c)),c}var rl={};
function oc(t){var r,s=t.ownerDocument,l=t.nodeName,c=rl[l];return c||(r=s.body.appendChild(s.createElement(
l)),c=i.css(r,"display"),r.parentNode.removeChild(r),c==="none"&&(c="block"),rl[l]=c,c)}function zr(t,r){
for(var s,l,c=[],h=0,g=t.length;h<g;h++)l=t[h],l.style&&(s=l.style.display,r?(s==="none"&&(c[h]=rt.get(
l,"display")||null,c[h]||(l.style.display="")),l.style.display===""&&ci(l)&&(c[h]=oc(l))):s!=="none"&&
(c[h]="none",rt.set(l,"display",s)));for(h=0;h<g;h++)c[h]!=null&&(t[h].style.display=c[h]);return t}
i.fn.extend({show:function(){return zr(this,!0)},hide:function(){return zr(this)},toggle:function(t){
return typeof t=="boolean"?t?this.show():this.hide():this.each(function(){ci(this)?i(this).show():i(
this).hide()})}});var Tn=/^(?:checkbox|radio)$/i,nl=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,il=/^$|^module$|\/(?:java|ecma)script/i;
(function(){var t=T.createDocumentFragment(),r=t.appendChild(T.createElement("div")),s=T.createElement(
"input");s.setAttribute("type","radio"),s.setAttribute("checked","checked"),s.setAttribute("name","t"),
r.appendChild(s),W.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,r.innerHTML="<textarea\
>x</textarea>",W.noCloneChecked=!!r.cloneNode(!0).lastChild.defaultValue,r.innerHTML="<option></opti\
on>",W.option=!!r.lastChild})();var Pe={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","<\
/colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></t\
body></table>"],_default:[0,"",""]};Pe.tbody=Pe.tfoot=Pe.colgroup=Pe.caption=Pe.thead,Pe.th=Pe.td,W.
option||(Pe.optgroup=Pe.option=[1,"<select multiple='multiple'>","</select>"]);function ye(t,r){var s;
return typeof t.getElementsByTagName<"u"?s=t.getElementsByTagName(r||"*"):typeof t.querySelectorAll<
"u"?s=t.querySelectorAll(r||"*"):s=[],r===void 0||r&&et(t,r)?i.merge([t],s):s}function Ps(t,r){for(var s=0,
l=t.length;s<l;s++)rt.set(t[s],"globalEval",!r||rt.get(r[s],"globalEval"))}var ac=/<|&#?\w+;/;function sl(t,r,s,l,c){
for(var h,g,A,S,k,B,V=r.createDocumentFragment(),H=[],J=0,yt=t.length;J<yt;J++)if(h=t[J],h||h===0)if(Q(
h)==="object")i.merge(H,h.nodeType?[h]:h);else if(!ac.test(h))H.push(r.createTextNode(h));else{for(g=
g||V.appendChild(r.createElement("div")),A=(nl.exec(h)||["",""])[1].toLowerCase(),S=Pe[A]||Pe._default,
g.innerHTML=S[1]+i.htmlPrefilter(h)+S[2],B=S[0];B--;)g=g.lastChild;i.merge(H,g.childNodes),g=V.firstChild,
g.textContent=""}for(V.textContent="",J=0;h=H[J++];){if(l&&i.inArray(h,l)>-1){c&&c.push(h);continue}
if(k=lr(h),g=ye(V.appendChild(h),"script"),k&&Ps(g),s)for(B=0;h=g[B++];)il.test(h.type||"")&&s.push(
h)}return V}var ol=/^([^.]*)(?:\.(.+)|)/;function Wr(){return!0}function Ur(){return!1}function Rs(t,r,s,l,c,h){
var g,A;if(typeof r=="object"){typeof s!="string"&&(l=l||s,s=void 0);for(A in r)Rs(t,A,s,l,r[A],h);return t}
if(l==null&&c==null?(c=s,l=s=void 0):c==null&&(typeof s=="string"?(c=l,l=void 0):(c=l,l=s,s=void 0)),
c===!1)c=Ur;else if(!c)return t;return h===1&&(g=c,c=function(S){return i().off(S),g.apply(this,arguments)},
c.guid=g.guid||(g.guid=i.guid++)),t.each(function(){i.event.add(this,r,c,l,s)})}i.event={global:{},add:function(t,r,s,l,c){
var h,g,A,S,k,B,V,H,J,yt,kt,Ct=rt.get(t);if(Gt(t))for(s.handler&&(h=s,s=h.handler,c=h.selector),c&&i.
find.matchesSelector(Ye,c),s.guid||(s.guid=i.guid++),(S=Ct.events)||(S=Ct.events=Object.create(null)),
(g=Ct.handle)||(g=Ct.handle=function(ne){return typeof i<"u"&&i.event.triggered!==ne.type?i.event.dispatch.
apply(t,arguments):void 0}),r=(r||"").match(ve)||[""],k=r.length;k--;)A=ol.exec(r[k])||[],J=kt=A[1],
yt=(A[2]||"").split(".").sort(),J&&(V=i.event.special[J]||{},J=(c?V.delegateType:V.bindType)||J,V=i.
event.special[J]||{},B=i.extend({type:J,origType:kt,data:l,handler:s,guid:s.guid,selector:c,needsContext:c&&
i.expr.match.needsContext.test(c),namespace:yt.join(".")},h),(H=S[J])||(H=S[J]=[],H.delegateCount=0,
(!V.setup||V.setup.call(t,l,yt,g)===!1)&&t.addEventListener&&t.addEventListener(J,g)),V.add&&(V.add.
call(t,B),B.handler.guid||(B.handler.guid=s.guid)),c?H.splice(H.delegateCount++,0,B):H.push(B),i.event.
global[J]=!0)},remove:function(t,r,s,l,c){var h,g,A,S,k,B,V,H,J,yt,kt,Ct=rt.hasData(t)&&rt.get(t);if(!(!Ct||
!(S=Ct.events))){for(r=(r||"").match(ve)||[""],k=r.length;k--;){if(A=ol.exec(r[k])||[],J=kt=A[1],yt=
(A[2]||"").split(".").sort(),!J){for(J in S)i.event.remove(t,J+r[k],s,l,!0);continue}for(V=i.event.special[J]||
{},J=(l?V.delegateType:V.bindType)||J,H=S[J]||[],A=A[2]&&new RegExp("(^|\\.)"+yt.join("\\.(?:.*\\.|)")+
"(\\.|$)"),g=h=H.length;h--;)B=H[h],(c||kt===B.origType)&&(!s||s.guid===B.guid)&&(!A||A.test(B.namespace))&&
(!l||l===B.selector||l==="**"&&B.selector)&&(H.splice(h,1),B.selector&&H.delegateCount--,V.remove&&V.
remove.call(t,B));g&&!H.length&&((!V.teardown||V.teardown.call(t,yt,Ct.handle)===!1)&&i.removeEvent(
t,J,Ct.handle),delete S[J])}i.isEmptyObject(S)&&rt.remove(t,"handle events")}},dispatch:function(t){
var r,s,l,c,h,g,A=new Array(arguments.length),S=i.event.fix(t),k=(rt.get(this,"events")||Object.create(
null))[S.type]||[],B=i.event.special[S.type]||{};for(A[0]=S,r=1;r<arguments.length;r++)A[r]=arguments[r];
if(S.delegateTarget=this,!(B.preDispatch&&B.preDispatch.call(this,S)===!1)){for(g=i.event.handlers.call(
this,S,k),r=0;(c=g[r++])&&!S.isPropagationStopped();)for(S.currentTarget=c.elem,s=0;(h=c.handlers[s++])&&
!S.isImmediatePropagationStopped();)(!S.rnamespace||h.namespace===!1||S.rnamespace.test(h.namespace))&&
(S.handleObj=h,S.data=h.data,l=((i.event.special[h.origType]||{}).handle||h.handler).apply(c.elem,A),
l!==void 0&&(S.result=l)===!1&&(S.preventDefault(),S.stopPropagation()));return B.postDispatch&&B.postDispatch.
call(this,S),S.result}},handlers:function(t,r){var s,l,c,h,g,A=[],S=r.delegateCount,k=t.target;if(S&&
k.nodeType&&!(t.type==="click"&&t.button>=1)){for(;k!==this;k=k.parentNode||this)if(k.nodeType===1&&
!(t.type==="click"&&k.disabled===!0)){for(h=[],g={},s=0;s<S;s++)l=r[s],c=l.selector+" ",g[c]===void 0&&
(g[c]=l.needsContext?i(c,this).index(k)>-1:i.find(c,this,null,[k]).length),g[c]&&h.push(l);h.length&&
A.push({elem:k,handlers:h})}}return k=this,S<r.length&&A.push({elem:k,handlers:r.slice(S)}),A},addProp:function(t,r){
Object.defineProperty(i.Event.prototype,t,{enumerable:!0,configurable:!0,get:v(r)?function(){if(this.
originalEvent)return r(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},
set:function(s){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:s})}})},
fix:function(t){return t[i.expando]?t:new i.Event(t)},special:{load:{noBubble:!0},click:{setup:function(t){
var r=this||t;return Tn.test(r.type)&&r.click&&et(r,"input")&&hi(r,"click",!0),!1},trigger:function(t){
var r=this||t;return Tn.test(r.type)&&r.click&&et(r,"input")&&hi(r,"click"),!0},_default:function(t){
var r=t.target;return Tn.test(r.type)&&r.click&&et(r,"input")&&rt.get(r,"click")||et(r,"a")}},beforeunload:{
postDispatch:function(t){t.result!==void 0&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}}};
function hi(t,r,s){if(!s){rt.get(t,r)===void 0&&i.event.add(t,r,Wr);return}rt.set(t,r,!1),i.event.add(
t,r,{namespace:!1,handler:function(l){var c,h=rt.get(this,r);if(l.isTrigger&1&&this[r]){if(h)(i.event.
special[r]||{}).delegateType&&l.stopPropagation();else if(h=u.call(arguments),rt.set(this,r,h),this[r](),
c=rt.get(this,r),rt.set(this,r,!1),h!==c)return l.stopImmediatePropagation(),l.preventDefault(),c}else
h&&(rt.set(this,r,i.event.trigger(h[0],h.slice(1),this)),l.stopPropagation(),l.isImmediatePropagationStopped=
Wr)}})}i.removeEvent=function(t,r,s){t.removeEventListener&&t.removeEventListener(r,s)},i.Event=function(t,r){
if(!(this instanceof i.Event))return new i.Event(t,r);t&&t.type?(this.originalEvent=t,this.type=t.type,
this.isDefaultPrevented=t.defaultPrevented||t.defaultPrevented===void 0&&t.returnValue===!1?Wr:Ur,this.
target=t.target&&t.target.nodeType===3?t.target.parentNode:t.target,this.currentTarget=t.currentTarget,
this.relatedTarget=t.relatedTarget):this.type=t,r&&i.extend(this,r),this.timeStamp=t&&t.timeStamp||Date.
now(),this[i.expando]=!0},i.Event.prototype={constructor:i.Event,isDefaultPrevented:Ur,isPropagationStopped:Ur,
isImmediatePropagationStopped:Ur,isSimulated:!1,preventDefault:function(){var t=this.originalEvent;this.
isDefaultPrevented=Wr,t&&!this.isSimulated&&t.preventDefault()},stopPropagation:function(){var t=this.
originalEvent;this.isPropagationStopped=Wr,t&&!this.isSimulated&&t.stopPropagation()},stopImmediatePropagation:function(){
var t=this.originalEvent;this.isImmediatePropagationStopped=Wr,t&&!this.isSimulated&&t.stopImmediatePropagation(),
this.stopPropagation()}},i.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,
eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,
button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,
screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},i.event.addProp),i.each({focus:"focusi\
n",blur:"focusout"},function(t,r){function s(l){if(T.documentMode){var c=rt.get(this,"handle"),h=i.event.
fix(l);h.type=l.type==="focusin"?"focus":"blur",h.isSimulated=!0,c(l),h.target===h.currentTarget&&c(
h)}else i.event.simulate(r,l.target,i.event.fix(l))}i.event.special[t]={setup:function(){var l;if(hi(
this,t,!0),T.documentMode)l=rt.get(this,r),l||this.addEventListener(r,s),rt.set(this,r,(l||0)+1);else
return!1},trigger:function(){return hi(this,t),!0},teardown:function(){var l;if(T.documentMode)l=rt.
get(this,r)-1,l?rt.set(this,r,l):(this.removeEventListener(r,s),rt.remove(this,r));else return!1},_default:function(l){
return rt.get(l.target,t)},delegateType:r},i.event.special[r]={setup:function(){var l=this.ownerDocument||
this.document||this,c=T.documentMode?this:l,h=rt.get(c,r);h||(T.documentMode?this.addEventListener(r,
s):l.addEventListener(t,s,!0)),rt.set(c,r,(h||0)+1)},teardown:function(){var l=this.ownerDocument||this.
document||this,c=T.documentMode?this:l,h=rt.get(c,r)-1;h?rt.set(c,r,h):(T.documentMode?this.removeEventListener(
r,s):l.removeEventListener(t,s,!0),rt.remove(c,r))}}}),i.each({mouseenter:"mouseover",mouseleave:"mo\
useout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,r){i.event.special[t]={delegateType:r,
bindType:r,handle:function(s){var l,c=this,h=s.relatedTarget,g=s.handleObj;return(!h||h!==c&&!i.contains(
c,h))&&(s.type=g.origType,l=g.handler.apply(this,arguments),s.type=r),l}}}),i.fn.extend({on:function(t,r,s,l){
return Rs(this,t,r,s,l)},one:function(t,r,s,l){return Rs(this,t,r,s,l,1)},off:function(t,r,s){var l,
c;if(t&&t.preventDefault&&t.handleObj)return l=t.handleObj,i(t.delegateTarget).off(l.namespace?l.origType+
"."+l.namespace:l.origType,l.selector,l.handler),this;if(typeof t=="object"){for(c in t)this.off(c,r,
t[c]);return this}return(r===!1||typeof r=="function")&&(s=r,r=void 0),s===!1&&(s=Ur),this.each(function(){
i.event.remove(this,t,s,r)})}});var lc=/<script|<style|<link/i,uc=/checked\s*(?:[^=]|=\s*.checked.)/i,
fc=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function al(t,r){return et(t,"table")&&et(r.nodeType!==11?r:r.firstChild,
"tr")&&i(t).children("tbody")[0]||t}function cc(t){return t.type=(t.getAttribute("type")!==null)+"/"+
t.type,t}function hc(t){return(t.type||"").slice(0,5)==="true/"?t.type=t.type.slice(5):t.removeAttribute(
"type"),t}function ll(t,r){var s,l,c,h,g,A,S;if(r.nodeType===1){if(rt.hasData(t)&&(h=rt.get(t),S=h.events,
S)){rt.remove(r,"handle events");for(c in S)for(s=0,l=S[c].length;s<l;s++)i.event.add(r,c,S[c][s])}zt.
hasData(t)&&(g=zt.access(t),A=i.extend({},g),zt.set(r,A))}}function dc(t,r){var s=r.nodeName.toLowerCase();
s==="input"&&Tn.test(t.type)?r.checked=t.checked:(s==="input"||s==="textarea")&&(r.defaultValue=t.defaultValue)}
function jr(t,r,s,l){r=o(r);var c,h,g,A,S,k,B=0,V=t.length,H=V-1,J=r[0],yt=v(J);if(yt||V>1&&typeof J==
"string"&&!W.checkClone&&uc.test(J))return t.each(function(kt){var Ct=t.eq(kt);yt&&(r[0]=J.call(this,
kt,Ct.html())),jr(Ct,r,s,l)});if(V&&(c=sl(r,t[0].ownerDocument,!1,t,l),h=c.firstChild,c.childNodes.length===
1&&(c=h),h||l)){for(g=i.map(ye(c,"script"),cc),A=g.length;B<V;B++)S=c,B!==H&&(S=i.clone(S,!0,!0),A&&
i.merge(g,ye(S,"script"))),s.call(t[B],S,B);if(A)for(k=g[g.length-1].ownerDocument,i.map(g,hc),B=0;B<
A;B++)S=g[B],il.test(S.type||"")&&!rt.access(S,"globalEval")&&i.contains(k,S)&&(S.src&&(S.type||"").
toLowerCase()!=="module"?i._evalUrl&&!S.noModule&&i._evalUrl(S.src,{nonce:S.nonce||S.getAttribute("n\
once")},k):z(S.textContent.replace(fc,""),S,k))}return t}function ul(t,r,s){for(var l,c=r?i.filter(r,
t):t,h=0;(l=c[h])!=null;h++)!s&&l.nodeType===1&&i.cleanData(ye(l)),l.parentNode&&(s&&lr(l)&&Ps(ye(l,
"script")),l.parentNode.removeChild(l));return t}i.extend({htmlPrefilter:function(t){return t},clone:function(t,r,s){
var l,c,h,g,A=t.cloneNode(!0),S=lr(t);if(!W.noCloneChecked&&(t.nodeType===1||t.nodeType===11)&&!i.isXMLDoc(
t))for(g=ye(A),h=ye(t),l=0,c=h.length;l<c;l++)dc(h[l],g[l]);if(r)if(s)for(h=h||ye(t),g=g||ye(A),l=0,
c=h.length;l<c;l++)ll(h[l],g[l]);else ll(t,A);return g=ye(A,"script"),g.length>0&&Ps(g,!S&&ye(t,"scr\
ipt")),A},cleanData:function(t){for(var r,s,l,c=i.event.special,h=0;(s=t[h])!==void 0;h++)if(Gt(s)){
if(r=s[rt.expando]){if(r.events)for(l in r.events)c[l]?i.event.remove(s,l):i.removeEvent(s,l,r.handle);
s[rt.expando]=void 0}s[zt.expando]&&(s[zt.expando]=void 0)}}}),i.fn.extend({detach:function(t){return ul(
this,t,!0)},remove:function(t){return ul(this,t)},text:function(t){return U(this,function(r){return r===
void 0?i.text(this):this.empty().each(function(){(this.nodeType===1||this.nodeType===11||this.nodeType===
9)&&(this.textContent=r)})},null,t,arguments.length)},append:function(){return jr(this,arguments,function(t){
if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var r=al(this,t);r.appendChild(t)}})},prepend:function(){
return jr(this,arguments,function(t){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var r=al(
this,t);r.insertBefore(t,r.firstChild)}})},before:function(){return jr(this,arguments,function(t){this.
parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return jr(this,arguments,function(t){
this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},empty:function(){for(var t,r=0;(t=
this[r])!=null;r++)t.nodeType===1&&(i.cleanData(ye(t,!1)),t.textContent="");return this},clone:function(t,r){
return t=t??!1,r=r??t,this.map(function(){return i.clone(this,t,r)})},html:function(t){return U(this,
function(r){var s=this[0]||{},l=0,c=this.length;if(r===void 0&&s.nodeType===1)return s.innerHTML;if(typeof r==
"string"&&!lc.test(r)&&!Pe[(nl.exec(r)||["",""])[1].toLowerCase()]){r=i.htmlPrefilter(r);try{for(;l<
c;l++)s=this[l]||{},s.nodeType===1&&(i.cleanData(ye(s,!1)),s.innerHTML=r);s=0}catch{}}s&&this.empty().
append(r)},null,t,arguments.length)},replaceWith:function(){var t=[];return jr(this,arguments,function(r){
var s=this.parentNode;i.inArray(this,t)<0&&(i.cleanData(ye(this)),s&&s.replaceChild(r,this))},t)}}),
i.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"\
replaceWith"},function(t,r){i.fn[t]=function(s){for(var l,c=[],h=i(s),g=h.length-1,A=0;A<=g;A++)l=A===
g?this:this.clone(!0),i(h[A])[r](l),d.apply(c,l.get());return this.pushStack(c)}});var Ls=new RegExp(
"^("+Ne+")(?!px)[a-z%]+$","i"),$s=/^--/,di=function(t){var r=t.ownerDocument.defaultView;return(!r||
!r.opener)&&(r=e),r.getComputedStyle(t)},fl=function(t,r,s){var l,c,h={};for(c in r)h[c]=t.style[c],
t.style[c]=r[c];l=s.call(t);for(c in r)t.style[c]=h[c];return l},pc=new RegExp(De.join("|"),"i");(function(){
function t(){if(k){S.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;paddin\
g:0;border:0",k.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll\
;margin:auto;border:1px;padding:1px;width:60%;top:1%",Ye.appendChild(S).appendChild(k);var B=e.getComputedStyle(
k);s=B.top!=="1%",A=r(B.marginLeft)===12,k.style.right="60%",h=r(B.right)===36,l=r(B.width)===36,k.style.
position="absolute",c=r(k.offsetWidth/3)===12,Ye.removeChild(S),k=null}}function r(B){return Math.round(
parseFloat(B))}var s,l,c,h,g,A,S=T.createElement("div"),k=T.createElement("div");k.style&&(k.style.backgroundClip=
"content-box",k.cloneNode(!0).style.backgroundClip="",W.clearCloneStyle=k.style.backgroundClip==="co\
ntent-box",i.extend(W,{boxSizingReliable:function(){return t(),l},pixelBoxStyles:function(){return t(),
h},pixelPosition:function(){return t(),s},reliableMarginLeft:function(){return t(),A},scrollboxSize:function(){
return t(),c},reliableTrDimensions:function(){var B,V,H,J;return g==null&&(B=T.createElement("table"),
V=T.createElement("tr"),H=T.createElement("div"),B.style.cssText="position:absolute;left:-11111px;bo\
rder-collapse:separate",V.style.cssText="box-sizing:content-box;border:1px solid",V.style.height="1p\
x",H.style.height="9px",H.style.display="block",Ye.appendChild(B).appendChild(V).appendChild(H),J=e.
getComputedStyle(V),g=parseInt(J.height,10)+parseInt(J.borderTopWidth,10)+parseInt(J.borderBottomWidth,
10)===V.offsetHeight,Ye.removeChild(B)),g}}))})();function Cn(t,r,s){var l,c,h,g,A=$s.test(r),S=t.style;
return s=s||di(t),s&&(g=s.getPropertyValue(r)||s[r],A&&g&&(g=g.replace(lt,"$1")||void 0),g===""&&!lr(
t)&&(g=i.style(t,r)),!W.pixelBoxStyles()&&Ls.test(g)&&pc.test(r)&&(l=S.width,c=S.minWidth,h=S.maxWidth,
S.minWidth=S.maxWidth=S.width=g,g=s.width,S.width=l,S.minWidth=c,S.maxWidth=h)),g!==void 0?g+"":g}function cl(t,r){
return{get:function(){if(t()){delete this.get;return}return(this.get=r).apply(this,arguments)}}}var hl=[
"Webkit","Moz","ms"],dl=T.createElement("div").style,pl={};function gc(t){for(var r=t[0].toUpperCase()+
t.slice(1),s=hl.length;s--;)if(t=hl[s]+r,t in dl)return t}function Hs(t){var r=i.cssProps[t]||pl[t];
return r||(t in dl?t:pl[t]=gc(t)||t)}var mc=/^(none|table(?!-c[ea]).+)/,vc={position:"absolute",visibility:"\
hidden",display:"block"},gl={letterSpacing:"0",fontWeight:"400"};function ml(t,r,s){var l=Ge.exec(r);
return l?Math.max(0,l[2]-(s||0))+(l[3]||"px"):r}function qs(t,r,s,l,c,h){var g=r==="width"?1:0,A=0,S=0,
k=0;if(s===(l?"border":"content"))return 0;for(;g<4;g+=2)s==="margin"&&(k+=i.css(t,s+De[g],!0,c)),l?
(s==="content"&&(S-=i.css(t,"padding"+De[g],!0,c)),s!=="margin"&&(S-=i.css(t,"border"+De[g]+"Width",
!0,c))):(S+=i.css(t,"padding"+De[g],!0,c),s!=="padding"?S+=i.css(t,"border"+De[g]+"Width",!0,c):A+=i.
css(t,"border"+De[g]+"Width",!0,c));return!l&&h>=0&&(S+=Math.max(0,Math.ceil(t["offset"+r[0].toUpperCase()+
r.slice(1)]-h-S-A-.5))||0),S+k}function vl(t,r,s){var l=di(t),c=!W.boxSizingReliable()||s,h=c&&i.css(
t,"boxSizing",!1,l)==="border-box",g=h,A=Cn(t,r,l),S="offset"+r[0].toUpperCase()+r.slice(1);if(Ls.test(
A)){if(!s)return A;A="auto"}return(!W.boxSizingReliable()&&h||!W.reliableTrDimensions()&&et(t,"tr")||
A==="auto"||!parseFloat(A)&&i.css(t,"display",!1,l)==="inline")&&t.getClientRects().length&&(h=i.css(
t,"boxSizing",!1,l)==="border-box",g=S in t,g&&(A=t[S])),A=parseFloat(A)||0,A+qs(t,r,s||(h?"border":
"content"),g,l,A)+"px"}i.extend({cssHooks:{opacity:{get:function(t,r){if(r){var s=Cn(t,"opacity");return s===
""?"1":s}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,
flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,
gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,
zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},
cssProps:{},style:function(t,r,s,l){if(!(!t||t.nodeType===3||t.nodeType===8||!t.style)){var c,h,g,A=Dt(
r),S=$s.test(r),k=t.style;if(S||(r=Hs(A)),g=i.cssHooks[r]||i.cssHooks[A],s!==void 0){if(h=typeof s,h===
"string"&&(c=Ge.exec(s))&&c[1]&&(s=el(t,r,c),h="number"),s==null||s!==s)return;h==="number"&&!S&&(s+=
c&&c[3]||(i.cssNumber[A]?"":"px")),!W.clearCloneStyle&&s===""&&r.indexOf("background")===0&&(k[r]="i\
nherit"),(!g||!("set"in g)||(s=g.set(t,s,l))!==void 0)&&(S?k.setProperty(r,s):k[r]=s)}else return g&&
"get"in g&&(c=g.get(t,!1,l))!==void 0?c:k[r]}},css:function(t,r,s,l){var c,h,g,A=Dt(r),S=$s.test(r);
return S||(r=Hs(A)),g=i.cssHooks[r]||i.cssHooks[A],g&&"get"in g&&(c=g.get(t,!0,s)),c===void 0&&(c=Cn(
t,r,l)),c==="normal"&&r in gl&&(c=gl[r]),s===""||s?(h=parseFloat(c),s===!0||isFinite(h)?h||0:c):c}}),
i.each(["height","width"],function(t,r){i.cssHooks[r]={get:function(s,l,c){if(l)return mc.test(i.css(
s,"display"))&&(!s.getClientRects().length||!s.getBoundingClientRect().width)?fl(s,vc,function(){return vl(
s,r,c)}):vl(s,r,c)},set:function(s,l,c){var h,g=di(s),A=!W.scrollboxSize()&&g.position==="absolute",
S=A||c,k=S&&i.css(s,"boxSizing",!1,g)==="border-box",B=c?qs(s,r,c,k,g):0;return k&&A&&(B-=Math.ceil(
s["offset"+r[0].toUpperCase()+r.slice(1)]-parseFloat(g[r])-qs(s,r,"border",!1,g)-.5)),B&&(h=Ge.exec(
l))&&(h[3]||"px")!=="px"&&(s.style[r]=l,l=i.css(s,r)),ml(s,l,B)}}}),i.cssHooks.marginLeft=cl(W.reliableMarginLeft,
function(t,r){if(r)return(parseFloat(Cn(t,"marginLeft"))||t.getBoundingClientRect().left-fl(t,{marginLeft:0},
function(){return t.getBoundingClientRect().left}))+"px"}),i.each({margin:"",padding:"",border:"Widt\
h"},function(t,r){i.cssHooks[t+r]={expand:function(s){for(var l=0,c={},h=typeof s=="string"?s.split(
" "):[s];l<4;l++)c[t+De[l]+r]=h[l]||h[l-2]||h[0];return c}},t!=="margin"&&(i.cssHooks[t+r].set=ml)}),
i.fn.extend({css:function(t,r){return U(this,function(s,l,c){var h,g,A={},S=0;if(Array.isArray(l)){for(h=
di(s),g=l.length;S<g;S++)A[l[S]]=i.css(s,l[S],!1,h);return A}return c!==void 0?i.style(s,l,c):i.css(
s,l)},t,r,arguments.length>1)}});function xe(t,r,s,l,c){return new xe.prototype.init(t,r,s,l,c)}i.Tween=
xe,xe.prototype={constructor:xe,init:function(t,r,s,l,c,h){this.elem=t,this.prop=s,this.easing=c||i.
easing._default,this.options=r,this.start=this.now=this.cur(),this.end=l,this.unit=h||(i.cssNumber[s]?
"":"px")},cur:function(){var t=xe.propHooks[this.prop];return t&&t.get?t.get(this):xe.propHooks._default.
get(this)},run:function(t){var r,s=xe.propHooks[this.prop];return this.options.duration?this.pos=r=i.
easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):this.pos=r=t,this.now=(this.
end-this.start)*r+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),s&&s.
set?s.set(this):xe.propHooks._default.set(this),this}},xe.prototype.init.prototype=xe.prototype,xe.propHooks=
{_default:{get:function(t){var r;return t.elem.nodeType!==1||t.elem[t.prop]!=null&&t.elem.style[t.prop]==
null?t.elem[t.prop]:(r=i.css(t.elem,t.prop,""),!r||r==="auto"?0:r)},set:function(t){i.fx.step[t.prop]?
i.fx.step[t.prop](t):t.elem.nodeType===1&&(i.cssHooks[t.prop]||t.elem.style[Hs(t.prop)]!=null)?i.style(
t.elem,t.prop,t.now+t.unit):t.elem[t.prop]=t.now}}},xe.propHooks.scrollTop=xe.propHooks.scrollLeft={
set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},i.easing={linear:function(t){
return t},swing:function(t){return .5-Math.cos(t*Math.PI)/2},_default:"swing"},i.fx=xe.prototype.init,
i.fx.step={};var Vr,pi,yc=/^(?:toggle|show|hide)$/,xc=/queueHooks$/;function Ms(){pi&&(T.hidden===!1&&
e.requestAnimationFrame?e.requestAnimationFrame(Ms):e.setTimeout(Ms,i.fx.interval),i.fx.tick())}function yl(){
return e.setTimeout(function(){Vr=void 0}),Vr=Date.now()}function gi(t,r){var s,l=0,c={height:t};for(r=
r?1:0;l<4;l+=2-r)s=De[l],c["margin"+s]=c["padding"+s]=t;return r&&(c.opacity=c.width=t),c}function xl(t,r,s){
for(var l,c=(Me.tweeners[r]||[]).concat(Me.tweeners["*"]),h=0,g=c.length;h<g;h++)if(l=c[h].call(s,r,
t))return l}function bc(t,r,s){var l,c,h,g,A,S,k,B,V="width"in r||"height"in r,H=this,J={},yt=t.style,
kt=t.nodeType&&ci(t),Ct=rt.get(t,"fxshow");s.queue||(g=i._queueHooks(t,"fx"),g.unqueued==null&&(g.unqueued=
0,A=g.empty.fire,g.empty.fire=function(){g.unqueued||A()}),g.unqueued++,H.always(function(){H.always(
function(){g.unqueued--,i.queue(t,"fx").length||g.empty.fire()})}));for(l in r)if(c=r[l],yc.test(c)){
if(delete r[l],h=h||c==="toggle",c===(kt?"hide":"show"))if(c==="show"&&Ct&&Ct[l]!==void 0)kt=!0;else
continue;J[l]=Ct&&Ct[l]||i.style(t,l)}if(S=!i.isEmptyObject(r),!(!S&&i.isEmptyObject(J))){V&&t.nodeType===
1&&(s.overflow=[yt.overflow,yt.overflowX,yt.overflowY],k=Ct&&Ct.display,k==null&&(k=rt.get(t,"displa\
y")),B=i.css(t,"display"),B==="none"&&(k?B=k:(zr([t],!0),k=t.style.display||k,B=i.css(t,"display"),zr(
[t]))),(B==="inline"||B==="inline-block"&&k!=null)&&i.css(t,"float")==="none"&&(S||(H.done(function(){
yt.display=k}),k==null&&(B=yt.display,k=B==="none"?"":B)),yt.display="inline-block")),s.overflow&&(yt.
overflow="hidden",H.always(function(){yt.overflow=s.overflow[0],yt.overflowX=s.overflow[1],yt.overflowY=
s.overflow[2]})),S=!1;for(l in J)S||(Ct?"hidden"in Ct&&(kt=Ct.hidden):Ct=rt.access(t,"fxshow",{display:k}),
h&&(Ct.hidden=!kt),kt&&zr([t],!0),H.done(function(){kt||zr([t]),rt.remove(t,"fxshow");for(l in J)i.style(
t,l,J[l])})),S=xl(kt?Ct[l]:0,l,H),l in Ct||(Ct[l]=S.start,kt&&(S.end=S.start,S.start=0))}}function wc(t,r){
var s,l,c,h,g;for(s in t)if(l=Dt(s),c=r[l],h=t[s],Array.isArray(h)&&(c=h[1],h=t[s]=h[0]),s!==l&&(t[l]=
h,delete t[s]),g=i.cssHooks[l],g&&"expand"in g){h=g.expand(h),delete t[l];for(s in h)s in t||(t[s]=h[s],
r[s]=c)}else r[l]=c}function Me(t,r,s){var l,c,h=0,g=Me.prefilters.length,A=i.Deferred().always(function(){
delete S.elem}),S=function(){if(c)return!1;for(var V=Vr||yl(),H=Math.max(0,k.startTime+k.duration-V),
J=H/k.duration||0,yt=1-J,kt=0,Ct=k.tweens.length;kt<Ct;kt++)k.tweens[kt].run(yt);return A.notifyWith(
t,[k,yt,H]),yt<1&&Ct?H:(Ct||A.notifyWith(t,[k,1,0]),A.resolveWith(t,[k]),!1)},k=A.promise({elem:t,props:i.
extend({},r),opts:i.extend(!0,{specialEasing:{},easing:i.easing._default},s),originalProperties:r,originalOptions:s,
startTime:Vr||yl(),duration:s.duration,tweens:[],createTween:function(V,H){var J=i.Tween(t,k.opts,V,
H,k.opts.specialEasing[V]||k.opts.easing);return k.tweens.push(J),J},stop:function(V){var H=0,J=V?k.
tweens.length:0;if(c)return this;for(c=!0;H<J;H++)k.tweens[H].run(1);return V?(A.notifyWith(t,[k,1,0]),
A.resolveWith(t,[k,V])):A.rejectWith(t,[k,V]),this}}),B=k.props;for(wc(B,k.opts.specialEasing);h<g;h++)
if(l=Me.prefilters[h].call(k,t,B,k.opts),l)return v(l.stop)&&(i._queueHooks(k.elem,k.opts.queue).stop=
l.stop.bind(l)),l;return i.map(B,xl,k),v(k.opts.start)&&k.opts.start.call(t,k),k.progress(k.opts.progress).
done(k.opts.done,k.opts.complete).fail(k.opts.fail).always(k.opts.always),i.fx.timer(i.extend(S,{elem:t,
anim:k,queue:k.opts.queue})),k}i.Animation=i.extend(Me,{tweeners:{"*":[function(t,r){var s=this.createTween(
t,r);return el(s.elem,t,Ge.exec(r),s),s}]},tweener:function(t,r){v(t)?(r=t,t=["*"]):t=t.match(ve);for(var s,
l=0,c=t.length;l<c;l++)s=t[l],Me.tweeners[s]=Me.tweeners[s]||[],Me.tweeners[s].unshift(r)},prefilters:[
bc],prefilter:function(t,r){r?Me.prefilters.unshift(t):Me.prefilters.push(t)}}),i.speed=function(t,r,s){
var l=t&&typeof t=="object"?i.extend({},t):{complete:s||!s&&r||v(t)&&t,duration:t,easing:s&&r||r&&!v(
r)&&r};return i.fx.off?l.duration=0:typeof l.duration!="number"&&(l.duration in i.fx.speeds?l.duration=
i.fx.speeds[l.duration]:l.duration=i.fx.speeds._default),(l.queue==null||l.queue===!0)&&(l.queue="fx"),
l.old=l.complete,l.complete=function(){v(l.old)&&l.old.call(this),l.queue&&i.dequeue(this,l.queue)},
l},i.fn.extend({fadeTo:function(t,r,s,l){return this.filter(ci).css("opacity",0).show().end().animate(
{opacity:r},t,s,l)},animate:function(t,r,s,l){var c=i.isEmptyObject(t),h=i.speed(r,s,l),g=function(){
var A=Me(this,i.extend({},t),h);(c||rt.get(this,"finish"))&&A.stop(!0)};return g.finish=g,c||h.queue===
!1?this.each(g):this.queue(h.queue,g)},stop:function(t,r,s){var l=function(c){var h=c.stop;delete c.
stop,h(s)};return typeof t!="string"&&(s=r,r=t,t=void 0),r&&this.queue(t||"fx",[]),this.each(function(){
var c=!0,h=t!=null&&t+"queueHooks",g=i.timers,A=rt.get(this);if(h)A[h]&&A[h].stop&&l(A[h]);else for(h in A)
A[h]&&A[h].stop&&xc.test(h)&&l(A[h]);for(h=g.length;h--;)g[h].elem===this&&(t==null||g[h].queue===t)&&
(g[h].anim.stop(s),c=!1,g.splice(h,1));(c||!s)&&i.dequeue(this,t)})},finish:function(t){return t!==!1&&
(t=t||"fx"),this.each(function(){var r,s=rt.get(this),l=s[t+"queue"],c=s[t+"queueHooks"],h=i.timers,
g=l?l.length:0;for(s.finish=!0,i.queue(this,t,[]),c&&c.stop&&c.stop.call(this,!0),r=h.length;r--;)h[r].
elem===this&&h[r].queue===t&&(h[r].anim.stop(!0),h.splice(r,1));for(r=0;r<g;r++)l[r]&&l[r].finish&&l[r].
finish.call(this);delete s.finish})}}),i.each(["toggle","show","hide"],function(t,r){var s=i.fn[r];i.
fn[r]=function(l,c,h){return l==null||typeof l=="boolean"?s.apply(this,arguments):this.animate(gi(r,
!0),l,c,h)}}),i.each({slideDown:gi("show"),slideUp:gi("hide"),slideToggle:gi("toggle"),fadeIn:{opacity:"\
show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,r){i.fn[t]=function(s,l,c){
return this.animate(r,s,l,c)}}),i.timers=[],i.fx.tick=function(){var t,r=0,s=i.timers;for(Vr=Date.now();r<
s.length;r++)t=s[r],!t()&&s[r]===t&&s.splice(r--,1);s.length||i.fx.stop(),Vr=void 0},i.fx.timer=function(t){
i.timers.push(t),i.fx.start()},i.fx.interval=13,i.fx.start=function(){pi||(pi=!0,Ms())},i.fx.stop=function(){
pi=null},i.fx.speeds={slow:600,fast:200,_default:400},i.fn.delay=function(t,r){return t=i.fx&&i.fx.speeds[t]||
t,r=r||"fx",this.queue(r,function(s,l){var c=e.setTimeout(s,t);l.stop=function(){e.clearTimeout(c)}})},
function(){var t=T.createElement("input"),r=T.createElement("select"),s=r.appendChild(T.createElement(
"option"));t.type="checkbox",W.checkOn=t.value!=="",W.optSelected=s.selected,t=T.createElement("inpu\
t"),t.value="t",t.type="radio",W.radioValue=t.value==="t"}();var bl,Sn=i.expr.attrHandle;i.fn.extend(
{attr:function(t,r){return U(this,i.attr,t,r,arguments.length>1)},removeAttr:function(t){return this.
each(function(){i.removeAttr(this,t)})}}),i.extend({attr:function(t,r,s){var l,c,h=t.nodeType;if(!(h===
3||h===8||h===2)){if(typeof t.getAttribute>"u")return i.prop(t,r,s);if((h!==1||!i.isXMLDoc(t))&&(c=i.
attrHooks[r.toLowerCase()]||(i.expr.match.bool.test(r)?bl:void 0)),s!==void 0){if(s===null){i.removeAttr(
t,r);return}return c&&"set"in c&&(l=c.set(t,s,r))!==void 0?l:(t.setAttribute(r,s+""),s)}return c&&"g\
et"in c&&(l=c.get(t,r))!==null?l:(l=i.find.attr(t,r),l??void 0)}},attrHooks:{type:{set:function(t,r){
if(!W.radioValue&&r==="radio"&&et(t,"input")){var s=t.value;return t.setAttribute("type",r),s&&(t.value=
s),r}}}},removeAttr:function(t,r){var s,l=0,c=r&&r.match(ve);if(c&&t.nodeType===1)for(;s=c[l++];)t.removeAttribute(
s)}}),bl={set:function(t,r,s){return r===!1?i.removeAttr(t,s):t.setAttribute(s,s),s}},i.each(i.expr.
match.bool.source.match(/\w+/g),function(t,r){var s=Sn[r]||i.find.attr;Sn[r]=function(l,c,h){var g,A,
S=c.toLowerCase();return h||(A=Sn[S],Sn[S]=g,g=s(l,c,h)!=null?S:null,Sn[S]=A),g}});var Tc=/^(?:input|select|textarea|button)$/i,
Cc=/^(?:a|area)$/i;i.fn.extend({prop:function(t,r){return U(this,i.prop,t,r,arguments.length>1)},removeProp:function(t){
return this.each(function(){delete this[i.propFix[t]||t]})}}),i.extend({prop:function(t,r,s){var l,c,
h=t.nodeType;if(!(h===3||h===8||h===2))return(h!==1||!i.isXMLDoc(t))&&(r=i.propFix[r]||r,c=i.propHooks[r]),
s!==void 0?c&&"set"in c&&(l=c.set(t,s,r))!==void 0?l:t[r]=s:c&&"get"in c&&(l=c.get(t,r))!==null?l:t[r]},
propHooks:{tabIndex:{get:function(t){var r=i.find.attr(t,"tabindex");return r?parseInt(r,10):Tc.test(
t.nodeName)||Cc.test(t.nodeName)&&t.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),W.optSelected||
(i.propHooks.selected={get:function(t){var r=t.parentNode;return r&&r.parentNode&&r.parentNode.selectedIndex,
null},set:function(t){var r=t.parentNode;r&&(r.selectedIndex,r.parentNode&&r.parentNode.selectedIndex)}}),
i.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","\
frameBorder","contentEditable"],function(){i.propFix[this.toLowerCase()]=this});function Tr(t){var r=t.
match(ve)||[];return r.join(" ")}function Cr(t){return t.getAttribute&&t.getAttribute("class")||""}function Fs(t){
return Array.isArray(t)?t:typeof t=="string"?t.match(ve)||[]:[]}i.fn.extend({addClass:function(t){var r,
s,l,c,h,g;return v(t)?this.each(function(A){i(this).addClass(t.call(this,A,Cr(this)))}):(r=Fs(t),r.length?
this.each(function(){if(l=Cr(this),s=this.nodeType===1&&" "+Tr(l)+" ",s){for(h=0;h<r.length;h++)c=r[h],
s.indexOf(" "+c+" ")<0&&(s+=c+" ");g=Tr(s),l!==g&&this.setAttribute("class",g)}}):this)},removeClass:function(t){
var r,s,l,c,h,g;return v(t)?this.each(function(A){i(this).removeClass(t.call(this,A,Cr(this)))}):arguments.
length?(r=Fs(t),r.length?this.each(function(){if(l=Cr(this),s=this.nodeType===1&&" "+Tr(l)+" ",s){for(h=
0;h<r.length;h++)for(c=r[h];s.indexOf(" "+c+" ")>-1;)s=s.replace(" "+c+" "," ");g=Tr(s),l!==g&&this.
setAttribute("class",g)}}):this):this.attr("class","")},toggleClass:function(t,r){var s,l,c,h,g=typeof t,
A=g==="string"||Array.isArray(t);return v(t)?this.each(function(S){i(this).toggleClass(t.call(this,S,
Cr(this),r),r)}):typeof r=="boolean"&&A?r?this.addClass(t):this.removeClass(t):(s=Fs(t),this.each(function(){
if(A)for(h=i(this),c=0;c<s.length;c++)l=s[c],h.hasClass(l)?h.removeClass(l):h.addClass(l);else(t===void 0||
g==="boolean")&&(l=Cr(this),l&&rt.set(this,"__className__",l),this.setAttribute&&this.setAttribute("\
class",l||t===!1?"":rt.get(this,"__className__")||""))}))},hasClass:function(t){var r,s,l=0;for(r=" "+
t+" ";s=this[l++];)if(s.nodeType===1&&(" "+Tr(Cr(s))+" ").indexOf(r)>-1)return!0;return!1}});var Sc=/\r/g;
i.fn.extend({val:function(t){var r,s,l,c=this[0];return arguments.length?(l=v(t),this.each(function(h){
var g;this.nodeType===1&&(l?g=t.call(this,h,i(this).val()):g=t,g==null?g="":typeof g=="number"?g+="":
Array.isArray(g)&&(g=i.map(g,function(A){return A==null?"":A+""})),r=i.valHooks[this.type]||i.valHooks[this.
nodeName.toLowerCase()],(!r||!("set"in r)||r.set(this,g,"value")===void 0)&&(this.value=g))})):c?(r=
i.valHooks[c.type]||i.valHooks[c.nodeName.toLowerCase()],r&&"get"in r&&(s=r.get(c,"value"))!==void 0?
s:(s=c.value,typeof s=="string"?s.replace(Sc,""):s??"")):void 0}}),i.extend({valHooks:{option:{get:function(t){
var r=i.find.attr(t,"value");return r??Tr(i.text(t))}},select:{get:function(t){var r,s,l,c=t.options,
h=t.selectedIndex,g=t.type==="select-one",A=g?null:[],S=g?h+1:c.length;for(h<0?l=S:l=g?h:0;l<S;l++)if(s=
c[l],(s.selected||l===h)&&!s.disabled&&(!s.parentNode.disabled||!et(s.parentNode,"optgroup"))){if(r=
i(s).val(),g)return r;A.push(r)}return A},set:function(t,r){for(var s,l,c=t.options,h=i.makeArray(r),
g=c.length;g--;)l=c[g],(l.selected=i.inArray(i.valHooks.option.get(l),h)>-1)&&(s=!0);return s||(t.selectedIndex=
-1),h}}}}),i.each(["radio","checkbox"],function(){i.valHooks[this]={set:function(t,r){if(Array.isArray(
r))return t.checked=i.inArray(i(t).val(),r)>-1}},W.checkOn||(i.valHooks[this].get=function(t){return t.
getAttribute("value")===null?"on":t.value})});var En=e.location,wl={guid:Date.now()},Bs=/\?/;i.parseXML=
function(t){var r,s;if(!t||typeof t!="string")return null;try{r=new e.DOMParser().parseFromString(t,
"text/xml")}catch{}return s=r&&r.getElementsByTagName("parsererror")[0],(!r||s)&&i.error("Invalid XM\
L: "+(s?i.map(s.childNodes,function(l){return l.textContent}).join(`
`):t)),r};var Tl=/^(?:focusinfocus|focusoutblur)$/,Cl=function(t){t.stopPropagation()};i.extend(i.event,
{trigger:function(t,r,s,l){var c,h,g,A,S,k,B,V,H=[s||T],J=R.call(t,"type")?t.type:t,yt=R.call(t,"nam\
espace")?t.namespace.split("."):[];if(h=V=g=s=s||T,!(s.nodeType===3||s.nodeType===8)&&!Tl.test(J+i.event.
triggered)&&(J.indexOf(".")>-1&&(yt=J.split("."),J=yt.shift(),yt.sort()),S=J.indexOf(":")<0&&"on"+J,
t=t[i.expando]?t:new i.Event(J,typeof t=="object"&&t),t.isTrigger=l?2:3,t.namespace=yt.join("."),t.rnamespace=
t.namespace?new RegExp("(^|\\.)"+yt.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||
(t.target=s),r=r==null?[t]:i.makeArray(r,[t]),B=i.event.special[J]||{},!(!l&&B.trigger&&B.trigger.apply(
s,r)===!1))){if(!l&&!B.noBubble&&!D(s)){for(A=B.delegateType||J,Tl.test(A+J)||(h=h.parentNode);h;h=h.
parentNode)H.push(h),g=h;g===(s.ownerDocument||T)&&H.push(g.defaultView||g.parentWindow||e)}for(c=0;(h=
H[c++])&&!t.isPropagationStopped();)V=h,t.type=c>1?A:B.bindType||J,k=(rt.get(h,"events")||Object.create(
null))[t.type]&&rt.get(h,"handle"),k&&k.apply(h,r),k=S&&h[S],k&&k.apply&&Gt(h)&&(t.result=k.apply(h,
r),t.result===!1&&t.preventDefault());return t.type=J,!l&&!t.isDefaultPrevented()&&(!B._default||B._default.
apply(H.pop(),r)===!1)&&Gt(s)&&S&&v(s[J])&&!D(s)&&(g=s[S],g&&(s[S]=null),i.event.triggered=J,t.isPropagationStopped()&&
V.addEventListener(J,Cl),s[J](),t.isPropagationStopped()&&V.removeEventListener(J,Cl),i.event.triggered=
void 0,g&&(s[S]=g)),t.result}},simulate:function(t,r,s){var l=i.extend(new i.Event,s,{type:t,isSimulated:!0});
i.event.trigger(l,null,r)}}),i.fn.extend({trigger:function(t,r){return this.each(function(){i.event.
trigger(t,r,this)})},triggerHandler:function(t,r){var s=this[0];if(s)return i.event.trigger(t,r,s,!0)}});
var Ec=/\[\]$/,Sl=/\r?\n/g,Ac=/^(?:submit|button|image|reset|file)$/i,_c=/^(?:input|select|textarea|keygen)/i;
function zs(t,r,s,l){var c;if(Array.isArray(r))i.each(r,function(h,g){s||Ec.test(t)?l(t,g):zs(t+"["+
(typeof g=="object"&&g!=null?h:"")+"]",g,s,l)});else if(!s&&Q(r)==="object")for(c in r)zs(t+"["+c+"]",
r[c],s,l);else l(t,r)}i.param=function(t,r){var s,l=[],c=function(h,g){var A=v(g)?g():g;l[l.length]=
encodeURIComponent(h)+"="+encodeURIComponent(A??"")};if(t==null)return"";if(Array.isArray(t)||t.jquery&&
!i.isPlainObject(t))i.each(t,function(){c(this.name,this.value)});else for(s in t)zs(s,t[s],r,c);return l.
join("&")},i.fn.extend({serialize:function(){return i.param(this.serializeArray())},serializeArray:function(){
return this.map(function(){var t=i.prop(this,"elements");return t?i.makeArray(t):this}).filter(function(){
var t=this.type;return this.name&&!i(this).is(":disabled")&&_c.test(this.nodeName)&&!Ac.test(t)&&(this.
checked||!Tn.test(t))}).map(function(t,r){var s=i(this).val();return s==null?null:Array.isArray(s)?i.
map(s,function(l){return{name:r.name,value:l.replace(Sl,`\r
`)}}):{name:r.name,value:s.replace(Sl,`\r
`)}}).get()}});var Nc=/%20/g,kc=/#.*$/,Ic=/([?&])_=[^&]*/,Oc=/^(.*?):[ \t]*([^\r\n]*)$/mg,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
Pc=/^(?:GET|HEAD)$/,Rc=/^\/\//,El={},Ws={},Al="*/".concat("*"),Us=T.createElement("a");Us.href=En.href;
function _l(t){return function(r,s){typeof r!="string"&&(s=r,r="*");var l,c=0,h=r.toLowerCase().match(
ve)||[];if(v(s))for(;l=h[c++];)l[0]==="+"?(l=l.slice(1)||"*",(t[l]=t[l]||[]).unshift(s)):(t[l]=t[l]||
[]).push(s)}}function Nl(t,r,s,l){var c={},h=t===Ws;function g(A){var S;return c[A]=!0,i.each(t[A]||
[],function(k,B){var V=B(r,s,l);if(typeof V=="string"&&!h&&!c[V])return r.dataTypes.unshift(V),g(V),
!1;if(h)return!(S=V)}),S}return g(r.dataTypes[0])||!c["*"]&&g("*")}function js(t,r){var s,l,c=i.ajaxSettings.
flatOptions||{};for(s in r)r[s]!==void 0&&((c[s]?t:l||(l={}))[s]=r[s]);return l&&i.extend(!0,t,l),t}
function Lc(t,r,s){for(var l,c,h,g,A=t.contents,S=t.dataTypes;S[0]==="*";)S.shift(),l===void 0&&(l=t.
mimeType||r.getResponseHeader("Content-Type"));if(l){for(c in A)if(A[c]&&A[c].test(l)){S.unshift(c);
break}}if(S[0]in s)h=S[0];else{for(c in s){if(!S[0]||t.converters[c+" "+S[0]]){h=c;break}g||(g=c)}h=
h||g}if(h)return h!==S[0]&&S.unshift(h),s[h]}function $c(t,r,s,l){var c,h,g,A,S,k={},B=t.dataTypes.slice();
if(B[1])for(g in t.converters)k[g.toLowerCase()]=t.converters[g];for(h=B.shift();h;)if(t.responseFields[h]&&
(s[t.responseFields[h]]=r),!S&&l&&t.dataFilter&&(r=t.dataFilter(r,t.dataType)),S=h,h=B.shift(),h){if(h===
"*")h=S;else if(S!=="*"&&S!==h){if(g=k[S+" "+h]||k["* "+h],!g){for(c in k)if(A=c.split(" "),A[1]===h&&
(g=k[S+" "+A[0]]||k["* "+A[0]],g)){g===!0?g=k[c]:k[c]!==!0&&(h=A[0],B.unshift(A[1]));break}}if(g!==!0)
if(g&&t.throws)r=g(r);else try{r=g(r)}catch(V){return{state:"parsererror",error:g?V:"No conversion f\
rom "+S+" to "+h}}}}return{state:"success",data:r}}i.extend({active:0,lastModified:{},etag:{},ajaxSettings:{
url:En.href,type:"GET",isLocal:Dc.test(En.protocol),global:!0,processData:!0,async:!0,contentType:"a\
pplication/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Al,text:"text/plain",html:"text/html",
xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,
json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{
"* text":String,"text html":!0,"text json":JSON.parse,"text xml":i.parseXML},flatOptions:{url:!0,context:!0}},
ajaxSetup:function(t,r){return r?js(js(t,i.ajaxSettings),r):js(i.ajaxSettings,t)},ajaxPrefilter:_l(El),
ajaxTransport:_l(Ws),ajax:function(t,r){typeof t=="object"&&(r=t,t=void 0),r=r||{};var s,l,c,h,g,A,S,
k,B,V,H=i.ajaxSetup({},r),J=H.context||H,yt=H.context&&(J.nodeType||J.jquery)?i(J):i.event,kt=i.Deferred(),
Ct=i.Callbacks("once memory"),ne=H.statusCode||{},Yt={},je={},Ve="canceled",Nt={readyState:0,getResponseHeader:function(It){
var Qt;if(S){if(!h)for(h={};Qt=Oc.exec(c);)h[Qt[1].toLowerCase()+" "]=(h[Qt[1].toLowerCase()+" "]||[]).
concat(Qt[2]);Qt=h[It.toLowerCase()+" "]}return Qt==null?null:Qt.join(", ")},getAllResponseHeaders:function(){
return S?c:null},setRequestHeader:function(It,Qt){return S==null&&(It=je[It.toLowerCase()]=je[It.toLowerCase()]||
It,Yt[It]=Qt),this},overrideMimeType:function(It){return S==null&&(H.mimeType=It),this},statusCode:function(It){
var Qt;if(It)if(S)Nt.always(It[Nt.status]);else for(Qt in It)ne[Qt]=[ne[Qt],It[Qt]];return this},abort:function(It){
var Qt=It||Ve;return s&&s.abort(Qt),Sr(0,Qt),this}};if(kt.promise(Nt),H.url=((t||H.url||En.href)+"").
replace(Rc,En.protocol+"//"),H.type=r.method||r.type||H.method||H.type,H.dataTypes=(H.dataType||"*").
toLowerCase().match(ve)||[""],H.crossDomain==null){A=T.createElement("a");try{A.href=H.url,A.href=A.
href,H.crossDomain=Us.protocol+"//"+Us.host!=A.protocol+"//"+A.host}catch{H.crossDomain=!0}}if(H.data&&
H.processData&&typeof H.data!="string"&&(H.data=i.param(H.data,H.traditional)),Nl(El,H,r,Nt),S)return Nt;
k=i.event&&H.global,k&&i.active++===0&&i.event.trigger("ajaxStart"),H.type=H.type.toUpperCase(),H.hasContent=
!Pc.test(H.type),l=H.url.replace(kc,""),H.hasContent?H.data&&H.processData&&(H.contentType||"").indexOf(
"application/x-www-form-urlencoded")===0&&(H.data=H.data.replace(Nc,"+")):(V=H.url.slice(l.length),H.
data&&(H.processData||typeof H.data=="string")&&(l+=(Bs.test(l)?"&":"?")+H.data,delete H.data),H.cache===
!1&&(l=l.replace(Ic,"$1"),V=(Bs.test(l)?"&":"?")+"_="+wl.guid+++V),H.url=l+V),H.ifModified&&(i.lastModified[l]&&
Nt.setRequestHeader("If-Modified-Since",i.lastModified[l]),i.etag[l]&&Nt.setRequestHeader("If-None-M\
atch",i.etag[l])),(H.data&&H.hasContent&&H.contentType!==!1||r.contentType)&&Nt.setRequestHeader("Co\
ntent-Type",H.contentType),Nt.setRequestHeader("Accept",H.dataTypes[0]&&H.accepts[H.dataTypes[0]]?H.
accepts[H.dataTypes[0]]+(H.dataTypes[0]!=="*"?", "+Al+"; q=0.01":""):H.accepts["*"]);for(B in H.headers)
Nt.setRequestHeader(B,H.headers[B]);if(H.beforeSend&&(H.beforeSend.call(J,Nt,H)===!1||S))return Nt.abort();
if(Ve="abort",Ct.add(H.complete),Nt.done(H.success),Nt.fail(H.error),s=Nl(Ws,H,r,Nt),!s)Sr(-1,"No Tr\
ansport");else{if(Nt.readyState=1,k&&yt.trigger("ajaxSend",[Nt,H]),S)return Nt;H.async&&H.timeout>0&&
(g=e.setTimeout(function(){Nt.abort("timeout")},H.timeout));try{S=!1,s.send(Yt,Sr)}catch(It){if(S)throw It;
Sr(-1,It)}}function Sr(It,Qt,_n,Qs){var Qe,Nn,Ke,ur,fr,Re=Qt;S||(S=!0,g&&e.clearTimeout(g),s=void 0,
c=Qs||"",Nt.readyState=It>0?4:0,Qe=It>=200&&It<300||It===304,_n&&(ur=Lc(H,Nt,_n)),!Qe&&i.inArray("sc\
ript",H.dataTypes)>-1&&i.inArray("json",H.dataTypes)<0&&(H.converters["text script"]=function(){}),ur=
$c(H,ur,Nt,Qe),Qe?(H.ifModified&&(fr=Nt.getResponseHeader("Last-Modified"),fr&&(i.lastModified[l]=fr),
fr=Nt.getResponseHeader("etag"),fr&&(i.etag[l]=fr)),It===204||H.type==="HEAD"?Re="nocontent":It===304?
Re="notmodified":(Re=ur.state,Nn=ur.data,Ke=ur.error,Qe=!Ke)):(Ke=Re,(It||!Re)&&(Re="error",It<0&&(It=
0))),Nt.status=It,Nt.statusText=(Qt||Re)+"",Qe?kt.resolveWith(J,[Nn,Re,Nt]):kt.rejectWith(J,[Nt,Re,Ke]),
Nt.statusCode(ne),ne=void 0,k&&yt.trigger(Qe?"ajaxSuccess":"ajaxError",[Nt,H,Qe?Nn:Ke]),Ct.fireWith(
J,[Nt,Re]),k&&(yt.trigger("ajaxComplete",[Nt,H]),--i.active||i.event.trigger("ajaxStop")))}return Nt},
getJSON:function(t,r,s){return i.get(t,r,s,"json")},getScript:function(t,r){return i.get(t,void 0,r,
"script")}}),i.each(["get","post"],function(t,r){i[r]=function(s,l,c,h){return v(l)&&(h=h||c,c=l,l=void 0),
i.ajax(i.extend({url:s,type:r,dataType:h,data:l,success:c},i.isPlainObject(s)&&s))}}),i.ajaxPrefilter(
function(t){var r;for(r in t.headers)r.toLowerCase()==="content-type"&&(t.contentType=t.headers[r]||
"")}),i._evalUrl=function(t,r,s){return i.ajax({url:t,type:"GET",dataType:"script",cache:!0,async:!1,
global:!1,converters:{"text script":function(){}},dataFilter:function(l){i.globalEval(l,r,s)}})},i.fn.
extend({wrapAll:function(t){var r;return this[0]&&(v(t)&&(t=t.call(this[0])),r=i(t,this[0].ownerDocument).
eq(0).clone(!0),this[0].parentNode&&r.insertBefore(this[0]),r.map(function(){for(var s=this;s.firstElementChild;)
s=s.firstElementChild;return s}).append(this)),this},wrapInner:function(t){return v(t)?this.each(function(r){
i(this).wrapInner(t.call(this,r))}):this.each(function(){var r=i(this),s=r.contents();s.length?s.wrapAll(
t):r.append(t)})},wrap:function(t){var r=v(t);return this.each(function(s){i(this).wrapAll(r?t.call(
this,s):t)})},unwrap:function(t){return this.parent(t).not("body").each(function(){i(this).replaceWith(
this.childNodes)}),this}}),i.expr.pseudos.hidden=function(t){return!i.expr.pseudos.visible(t)},i.expr.
pseudos.visible=function(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)},i.ajaxSettings.
xhr=function(){try{return new e.XMLHttpRequest}catch{}};var Hc={0:200,1223:204},An=i.ajaxSettings.xhr();
W.cors=!!An&&"withCredentials"in An,W.ajax=An=!!An,i.ajaxTransport(function(t){var r,s;if(W.cors||An&&
!t.crossDomain)return{send:function(l,c){var h,g=t.xhr();if(g.open(t.type,t.url,t.async,t.username,t.
password),t.xhrFields)for(h in t.xhrFields)g[h]=t.xhrFields[h];t.mimeType&&g.overrideMimeType&&g.overrideMimeType(
t.mimeType),!t.crossDomain&&!l["X-Requested-With"]&&(l["X-Requested-With"]="XMLHttpRequest");for(h in l)
g.setRequestHeader(h,l[h]);r=function(A){return function(){r&&(r=s=g.onload=g.onerror=g.onabort=g.ontimeout=
g.onreadystatechange=null,A==="abort"?g.abort():A==="error"?typeof g.status!="number"?c(0,"error"):c(
g.status,g.statusText):c(Hc[g.status]||g.status,g.statusText,(g.responseType||"text")!=="text"||typeof g.
responseText!="string"?{binary:g.response}:{text:g.responseText},g.getAllResponseHeaders()))}},g.onload=
r(),s=g.onerror=g.ontimeout=r("error"),g.onabort!==void 0?g.onabort=s:g.onreadystatechange=function(){
g.readyState===4&&e.setTimeout(function(){r&&s()})},r=r("abort");try{g.send(t.hasContent&&t.data||null)}catch(A){
if(r)throw A}},abort:function(){r&&r()}}}),i.ajaxPrefilter(function(t){t.crossDomain&&(t.contents.script=
!1)}),i.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript,\
 application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(t){
return i.globalEval(t),t}}}),i.ajaxPrefilter("script",function(t){t.cache===void 0&&(t.cache=!1),t.crossDomain&&
(t.type="GET")}),i.ajaxTransport("script",function(t){if(t.crossDomain||t.scriptAttrs){var r,s;return{
send:function(l,c){r=i("<script>").attr(t.scriptAttrs||{}).prop({charset:t.scriptCharset,src:t.url}).
on("load error",s=function(h){r.remove(),s=null,h&&c(h.type==="error"?404:200,h.type)}),T.head.appendChild(
r[0])},abort:function(){s&&s()}}}});var kl=[],Vs=/(=)\?(?=&|$)|\?\?/;i.ajaxSetup({jsonp:"callback",jsonpCallback:function(){
var t=kl.pop()||i.expando+"_"+wl.guid++;return this[t]=!0,t}}),i.ajaxPrefilter("json jsonp",function(t,r,s){
var l,c,h,g=t.jsonp!==!1&&(Vs.test(t.url)?"url":typeof t.data=="string"&&(t.contentType||"").indexOf(
"application/x-www-form-urlencoded")===0&&Vs.test(t.data)&&"data");if(g||t.dataTypes[0]==="jsonp")return l=
t.jsonpCallback=v(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,g?t[g]=t[g].replace(Vs,"$1"+l):
t.jsonp!==!1&&(t.url+=(Bs.test(t.url)?"&":"?")+t.jsonp+"="+l),t.converters["script json"]=function(){
return h||i.error(l+" was not called"),h[0]},t.dataTypes[0]="json",c=e[l],e[l]=function(){h=arguments},
s.always(function(){c===void 0?i(e).removeProp(l):e[l]=c,t[l]&&(t.jsonpCallback=r.jsonpCallback,kl.push(
l)),h&&v(c)&&c(h[0]),h=c=void 0}),"script"}),W.createHTMLDocument=function(){var t=T.implementation.
createHTMLDocument("").body;return t.innerHTML="<form></form><form></form>",t.childNodes.length===2}(),
i.parseHTML=function(t,r,s){if(typeof t!="string")return[];typeof r=="boolean"&&(s=r,r=!1);var l,c,h;
return r||(W.createHTMLDocument?(r=T.implementation.createHTMLDocument(""),l=r.createElement("base"),
l.href=T.location.href,r.head.appendChild(l)):r=T),c=G.exec(t),h=!s&&[],c?[r.createElement(c[1])]:(c=
sl([t],r,h),h&&h.length&&i(h).remove(),i.merge([],c.childNodes))},i.fn.load=function(t,r,s){var l,c,
h,g=this,A=t.indexOf(" ");return A>-1&&(l=Tr(t.slice(A)),t=t.slice(0,A)),v(r)?(s=r,r=void 0):r&&typeof r==
"object"&&(c="POST"),g.length>0&&i.ajax({url:t,type:c||"GET",dataType:"html",data:r}).done(function(S){
h=arguments,g.html(l?i("<div>").append(i.parseHTML(S)).find(l):S)}).always(s&&function(S,k){g.each(function(){
s.apply(this,h||[S.responseText,k,S])})}),this},i.expr.pseudos.animated=function(t){return i.grep(i.
timers,function(r){return t===r.elem}).length},i.offset={setOffset:function(t,r,s){var l,c,h,g,A,S,k,
B=i.css(t,"position"),V=i(t),H={};B==="static"&&(t.style.position="relative"),A=V.offset(),h=i.css(t,
"top"),S=i.css(t,"left"),k=(B==="absolute"||B==="fixed")&&(h+S).indexOf("auto")>-1,k?(l=V.position(),
g=l.top,c=l.left):(g=parseFloat(h)||0,c=parseFloat(S)||0),v(r)&&(r=r.call(t,s,i.extend({},A))),r.top!=
null&&(H.top=r.top-A.top+g),r.left!=null&&(H.left=r.left-A.left+c),"using"in r?r.using.call(t,H):V.css(
H)}},i.fn.extend({offset:function(t){if(arguments.length)return t===void 0?this:this.each(function(c){
i.offset.setOffset(this,t,c)});var r,s,l=this[0];if(l)return l.getClientRects().length?(r=l.getBoundingClientRect(),
s=l.ownerDocument.defaultView,{top:r.top+s.pageYOffset,left:r.left+s.pageXOffset}):{top:0,left:0}},position:function(){
if(this[0]){var t,r,s,l=this[0],c={top:0,left:0};if(i.css(l,"position")==="fixed")r=l.getBoundingClientRect();else{
for(r=this.offset(),s=l.ownerDocument,t=l.offsetParent||s.documentElement;t&&(t===s.body||t===s.documentElement)&&
i.css(t,"position")==="static";)t=t.parentNode;t&&t!==l&&t.nodeType===1&&(c=i(t).offset(),c.top+=i.css(
t,"borderTopWidth",!0),c.left+=i.css(t,"borderLeftWidth",!0))}return{top:r.top-c.top-i.css(l,"margin\
Top",!0),left:r.left-c.left-i.css(l,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){
for(var t=this.offsetParent;t&&i.css(t,"position")==="static";)t=t.offsetParent;return t||Ye})}}),i.
each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,r){var s=r==="pageYOffset";i.fn[t]=
function(l){return U(this,function(c,h,g){var A;if(D(c)?A=c:c.nodeType===9&&(A=c.defaultView),g===void 0)
return A?A[r]:c[h];A?A.scrollTo(s?A.pageXOffset:g,s?g:A.pageYOffset):c[h]=g},t,l,arguments.length)}}),
i.each(["top","left"],function(t,r){i.cssHooks[r]=cl(W.pixelPosition,function(s,l){if(l)return l=Cn(
s,r),Ls.test(l)?i(s).position()[r]+"px":l})}),i.each({Height:"height",Width:"width"},function(t,r){i.
each({padding:"inner"+t,content:r,"":"outer"+t},function(s,l){i.fn[l]=function(c,h){var g=arguments.
length&&(s||typeof c!="boolean"),A=s||(c===!0||h===!0?"margin":"border");return U(this,function(S,k,B){
var V;return D(S)?l.indexOf("outer")===0?S["inner"+t]:S.document.documentElement["client"+t]:S.nodeType===
9?(V=S.documentElement,Math.max(S.body["scroll"+t],V["scroll"+t],S.body["offset"+t],V["offset"+t],V["\
client"+t])):B===void 0?i.css(S,k,A):i.style(S,k,B,A)},r,g?c:void 0,g)}})}),i.each(["ajaxStart","aja\
xStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,r){i.fn[r]=function(s){return this.
on(r,s)}}),i.fn.extend({bind:function(t,r,s){return this.on(t,null,r,s)},unbind:function(t,r){return this.
off(t,null,r)},delegate:function(t,r,s,l){return this.on(r,t,s,l)},undelegate:function(t,r,s){return arguments.
length===1?this.off(t,"**"):this.off(r,t||"**",s)},hover:function(t,r){return this.on("mouseenter",t).
on("mouseleave",r||t)}}),i.each("blur focus focusin focusout resize scroll click dblclick mousedown \
mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress key\
up contextmenu".split(" "),function(t,r){i.fn[r]=function(s,l){return arguments.length>0?this.on(r,null,
s,l):this.trigger(r)}});var qc=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;i.proxy=function(t,r){
var s,l,c;if(typeof r=="string"&&(s=t[r],r=t,t=s),!!v(t))return l=u.call(arguments,2),c=function(){return t.
apply(r||this,l.concat(u.call(arguments)))},c.guid=t.guid=t.guid||i.guid++,c},i.holdReady=function(t){
t?i.readyWait++:i.ready(!0)},i.isArray=Array.isArray,i.parseJSON=JSON.parse,i.nodeName=et,i.isFunction=
v,i.isWindow=D,i.camelCase=Dt,i.type=Q,i.now=Date.now,i.isNumeric=function(t){var r=i.type(t);return(r===
"number"||r==="string")&&!isNaN(t-parseFloat(t))},i.trim=function(t){return t==null?"":(t+"").replace(
qc,"$1")},typeof define=="function"&&define.amd&&define("jquery",[],function(){return i});var Mc=e.jQuery,
Fc=e.$;return i.noConflict=function(t){return e.$===i&&(e.$=Fc),t&&e.jQuery===i&&(e.jQuery=Mc),i},typeof n>
"u"&&(e.jQuery=e.$=i),i})});var $l=Kt(()=>{+function(e){"use strict";function n(){var a=document.createElement("bootstrap"),f={WebkitTransition:"\
webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"\
transitionend"};for(var u in f)if(a.style[u]!==void 0)return{end:f[u]};return!1}e.fn.emulateTransitionEnd=
function(a){var f=!1,u=this;e(this).one("bsTransitionEnd",function(){f=!0});var o=function(){f||e(u).
trigger(e.support.transition.end)};return setTimeout(o,a),this},e(function(){e.support.transition=n(),
e.support.transition&&(e.event.special.bsTransitionEnd={bindType:e.support.transition.end,delegateType:e.
support.transition.end,handle:function(a){if(e(a.target).is(this))return a.handleObj.handler.apply(this,
arguments)}})})}(jQuery)});var Hl=Kt(()=>{+function(e){"use strict";var n='[data-dismiss="alert"]',a=function(o){e(o).on("click",
n,this.close)};a.VERSION="3.3.7",a.TRANSITION_DURATION=150,a.prototype.close=function(o){var d=e(this),
y=d.attr("data-target");y||(y=d.attr("href"),y=y&&y.replace(/.*(?=#[^\s]*$)/,""));var b=e(y==="#"?[]:
y);if(o&&o.preventDefault(),b.length||(b=d.closest(".alert")),b.trigger(o=e.Event("close.bs.alert")),
o.isDefaultPrevented())return;b.removeClass("in");function _(){b.detach().trigger("closed.bs.alert").
remove()}e.support.transition&&b.hasClass("fade")?b.one("bsTransitionEnd",_).emulateTransitionEnd(a.
TRANSITION_DURATION):_()};function f(o){return this.each(function(){var d=e(this),y=d.data("bs.alert");
y||d.data("bs.alert",y=new a(this)),typeof o=="string"&&y[o].call(d)})}var u=e.fn.alert;e.fn.alert=f,
e.fn.alert.Constructor=a,e.fn.alert.noConflict=function(){return e.fn.alert=u,this},e(document).on("\
click.bs.alert.data-api",n,a.prototype.close)}(jQuery)});var ql=Kt(()=>{+function(e){"use strict";var n=function(u,o){this.$element=e(u),this.options=e.extend(
{},n.DEFAULTS,o),this.isLoading=!1};n.VERSION="3.3.7",n.DEFAULTS={loadingText:"loading..."},n.prototype.
setState=function(u){var o="disabled",d=this.$element,y=d.is("input")?"val":"html",b=d.data();u+="Te\
xt",b.resetText==null&&d.data("resetText",d[y]()),setTimeout(e.proxy(function(){d[y](b[u]==null?this.
options[u]:b[u]),u=="loadingText"?(this.isLoading=!0,d.addClass(o).attr(o,o).prop(o,!0)):this.isLoading&&
(this.isLoading=!1,d.removeClass(o).removeAttr(o).prop(o,!1))},this),0)},n.prototype.toggle=function(){
var u=!0,o=this.$element.closest('[data-toggle="buttons"]');if(o.length){var d=this.$element.find("i\
nput");d.prop("type")=="radio"?(d.prop("checked")&&(u=!1),o.find(".active").removeClass("active"),this.
$element.addClass("active")):d.prop("type")=="checkbox"&&(d.prop("checked")!==this.$element.hasClass(
"active")&&(u=!1),this.$element.toggleClass("active")),d.prop("checked",this.$element.hasClass("acti\
ve")),u&&d.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),
this.$element.toggleClass("active")};function a(u){return this.each(function(){var o=e(this),d=o.data(
"bs.button"),y=typeof u=="object"&&u;d||o.data("bs.button",d=new n(this,y)),u=="toggle"?d.toggle():u&&
d.setState(u)})}var f=e.fn.button;e.fn.button=a,e.fn.button.Constructor=n,e.fn.button.noConflict=function(){
return e.fn.button=f,this},e(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(u){
var o=e(u.target).closest(".btn");a.call(o,"toggle"),e(u.target).is('input[type="radio"], input[type\
="checkbox"]')||(u.preventDefault(),o.is("input,button")?o.trigger("focus"):o.find("input:visible,bu\
tton:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[d\
ata-toggle^="button"]',function(u){e(u.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(
u.type))})}(jQuery)});var Ml=Kt(()=>{+function(e){"use strict";var n=function(o,d){this.$element=e(o),this.$indicators=this.
$element.find(".carousel-indicators"),this.options=d,this.paused=null,this.sliding=null,this.interval=
null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",
e.proxy(this.keydown,this)),this.options.pause=="hover"&&!("ontouchstart"in document.documentElement)&&
this.$element.on("mouseenter.bs.carousel",e.proxy(this.pause,this)).on("mouseleave.bs.carousel",e.proxy(
this.cycle,this))};n.VERSION="3.3.7",n.TRANSITION_DURATION=600,n.DEFAULTS={interval:5e3,pause:"hover",
wrap:!0,keyboard:!0},n.prototype.keydown=function(o){if(!/input|textarea/i.test(o.target.tagName)){switch(o.
which){case 37:this.prev();break;case 39:this.next();break;default:return}o.preventDefault()}},n.prototype.
cycle=function(o){return o||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.
interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},
n.prototype.getItemIndex=function(o){return this.$items=o.parent().children(".item"),this.$items.index(
o||this.$active)},n.prototype.getItemForDirection=function(o,d){var y=this.getItemIndex(d),b=o=="pre\
v"&&y===0||o=="next"&&y==this.$items.length-1;if(b&&!this.options.wrap)return d;var _=o=="prev"?-1:1,
R=(y+_)%this.$items.length;return this.$items.eq(R)},n.prototype.to=function(o){var d=this,y=this.getItemIndex(
this.$active=this.$element.find(".item.active"));if(!(o>this.$items.length-1||o<0))return this.sliding?
this.$element.one("slid.bs.carousel",function(){d.to(o)}):y==o?this.pause().cycle():this.slide(o>y?"\
next":"prev",this.$items.eq(o))},n.prototype.pause=function(o){return o||(this.paused=!0),this.$element.
find(".next, .prev").length&&e.support.transition&&(this.$element.trigger(e.support.transition.end),
this.cycle(!0)),this.interval=clearInterval(this.interval),this},n.prototype.next=function(){if(!this.
sliding)return this.slide("next")},n.prototype.prev=function(){if(!this.sliding)return this.slide("p\
rev")},n.prototype.slide=function(o,d){var y=this.$element.find(".item.active"),b=d||this.getItemForDirection(
o,y),_=this.interval,R=o=="next"?"left":"right",$=this;if(b.hasClass("active"))return this.sliding=!1;
var X=b[0],W=e.Event("slide.bs.carousel",{relatedTarget:X,direction:R});if(this.$element.trigger(W),
!W.isDefaultPrevented()){if(this.sliding=!0,_&&this.pause(),this.$indicators.length){this.$indicators.
find(".active").removeClass("active");var v=e(this.$indicators.children()[this.getItemIndex(b)]);v&&
v.addClass("active")}var D=e.Event("slid.bs.carousel",{relatedTarget:X,direction:R});return e.support.
transition&&this.$element.hasClass("slide")?(b.addClass(o),b[0].offsetWidth,y.addClass(R),b.addClass(
R),y.one("bsTransitionEnd",function(){b.removeClass([o,R].join(" ")).addClass("active"),y.removeClass(
["active",R].join(" ")),$.sliding=!1,setTimeout(function(){$.$element.trigger(D)},0)}).emulateTransitionEnd(
n.TRANSITION_DURATION)):(y.removeClass("active"),b.addClass("active"),this.sliding=!1,this.$element.
trigger(D)),_&&this.cycle(),this}};function a(o){return this.each(function(){var d=e(this),y=d.data(
"bs.carousel"),b=e.extend({},n.DEFAULTS,d.data(),typeof o=="object"&&o),_=typeof o=="string"?o:b.slide;
y||d.data("bs.carousel",y=new n(this,b)),typeof o=="number"?y.to(o):_?y[_]():b.interval&&y.pause().cycle()})}
var f=e.fn.carousel;e.fn.carousel=a,e.fn.carousel.Constructor=n,e.fn.carousel.noConflict=function(){
return e.fn.carousel=f,this};var u=function(o){var d,y=e(this),b=e(y.attr("data-target")||(d=y.attr(
"href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(b.hasClass("carousel")){var _=e.extend({},b.data(),y.data()),
R=y.attr("data-slide-to");R&&(_.interval=!1),a.call(b,_),R&&b.data("bs.carousel").to(R),o.preventDefault()}};
e(document).on("click.bs.carousel.data-api","[data-slide]",u).on("click.bs.carousel.data-api","[data\
-slide-to]",u),e(window).on("load",function(){e('[data-ride="carousel"]').each(function(){var o=e(this);
a.call(o,o.data())})})}(jQuery)});var Fl=Kt(()=>{+function(e){"use strict";var n=function(o,d){this.$element=e(o),this.options=e.extend(
{},n.DEFAULTS,d),this.$trigger=e('[data-toggle="collapse"][href="#'+o.id+'"],[data-toggle="collapse"\
][data-target="#'+o.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():
this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};n.VERSION=
"3.3.7",n.TRANSITION_DURATION=350,n.DEFAULTS={toggle:!0},n.prototype.dimension=function(){var o=this.
$element.hasClass("width");return o?"width":"height"},n.prototype.show=function(){if(!(this.transitioning||
this.$element.hasClass("in"))){var o,d=this.$parent&&this.$parent.children(".panel").children(".in, \
.collapsing");if(!(d&&d.length&&(o=d.data("bs.collapse"),o&&o.transitioning))){var y=e.Event("show.b\
s.collapse");if(this.$element.trigger(y),!y.isDefaultPrevented()){d&&d.length&&(f.call(d,"hide"),o||
d.data("bs.collapse",null));var b=this.dimension();this.$element.removeClass("collapse").addClass("c\
ollapsing")[b](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expande\
d",!0),this.transitioning=1;var _=function(){this.$element.removeClass("collapsing").addClass("colla\
pse in")[b](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)
return _.call(this);var R=e.camelCase(["scroll",b].join("-"));this.$element.one("bsTransitionEnd",e.
proxy(_,this)).emulateTransitionEnd(n.TRANSITION_DURATION)[b](this.$element[0][R])}}}},n.prototype.hide=
function(){if(!(this.transitioning||!this.$element.hasClass("in"))){var o=e.Event("hide.bs.collapse");
if(this.$element.trigger(o),!o.isDefaultPrevented()){var d=this.dimension();this.$element[d](this.$element[d]())[0].
offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),
this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var y=function(){this.
transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.coll\
apse")};if(!e.support.transition)return y.call(this);this.$element[d](0).one("bsTransitionEnd",e.proxy(
y,this)).emulateTransitionEnd(n.TRANSITION_DURATION)}}},n.prototype.toggle=function(){this[this.$element.
hasClass("in")?"hide":"show"]()},n.prototype.getParent=function(){return e(this.options.parent).find(
'[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(e.proxy(function(o,d){var y=e(
d);this.addAriaAndCollapsedClass(a(y),y)},this)).end()},n.prototype.addAriaAndCollapsedClass=function(o,d){
var y=o.hasClass("in");o.attr("aria-expanded",y),d.toggleClass("collapsed",!y).attr("aria-expanded",
y)};function a(o){var d,y=o.attr("data-target")||(d=o.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"");
return e(y)}function f(o){return this.each(function(){var d=e(this),y=d.data("bs.collapse"),b=e.extend(
{},n.DEFAULTS,d.data(),typeof o=="object"&&o);!y&&b.toggle&&/show|hide/.test(o)&&(b.toggle=!1),y||d.
data("bs.collapse",y=new n(this,b)),typeof o=="string"&&y[o]()})}var u=e.fn.collapse;e.fn.collapse=f,
e.fn.collapse.Constructor=n,e.fn.collapse.noConflict=function(){return e.fn.collapse=u,this},e(document).
on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(o){var d=e(this);d.attr("data-ta\
rget")||o.preventDefault();var y=a(d),b=y.data("bs.collapse"),_=b?"toggle":d.data();f.call(y,_)})}(jQuery)});var Bl=Kt(()=>{+function(e){"use strict";var n=".dropdown-backdrop",a='[data-toggle="dropdown"]',f=function(b){
e(b).on("click.bs.dropdown",this.toggle)};f.VERSION="3.3.7";function u(b){var _=b.attr("data-target");
_||(_=b.attr("href"),_=_&&/#[A-Za-z]/.test(_)&&_.replace(/.*(?=#[^\s]*$)/,""));var R=_&&e(_);return R&&
R.length?R:b.parent()}function o(b){b&&b.which===3||(e(n).remove(),e(a).each(function(){var _=e(this),
R=u(_),$={relatedTarget:this};R.hasClass("open")&&(b&&b.type=="click"&&/input|textarea/i.test(b.target.
tagName)&&e.contains(R[0],b.target)||(R.trigger(b=e.Event("hide.bs.dropdown",$)),!b.isDefaultPrevented()&&
(_.attr("aria-expanded","false"),R.removeClass("open").trigger(e.Event("hidden.bs.dropdown",$)))))}))}
f.prototype.toggle=function(b){var _=e(this);if(!_.is(".disabled, :disabled")){var R=u(_),$=R.hasClass(
"open");if(o(),!$){"ontouchstart"in document.documentElement&&!R.closest(".navbar-nav").length&&e(document.
createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click",o);var X={relatedTarget:this};
if(R.trigger(b=e.Event("show.bs.dropdown",X)),b.isDefaultPrevented())return;_.trigger("focus").attr(
"aria-expanded","true"),R.toggleClass("open").trigger(e.Event("shown.bs.dropdown",X))}return!1}},f.prototype.
keydown=function(b){if(!(!/(38|40|27|32)/.test(b.which)||/input|textarea/i.test(b.target.tagName))){
var _=e(this);if(b.preventDefault(),b.stopPropagation(),!_.is(".disabled, :disabled")){var R=u(_),$=R.
hasClass("open");if(!$&&b.which!=27||$&&b.which==27)return b.which==27&&R.find(a).trigger("focus"),_.
trigger("click");var X=" li:not(.disabled):visible a",W=R.find(".dropdown-menu"+X);if(W.length){var v=W.
index(b.target);b.which==38&&v>0&&v--,b.which==40&&v<W.length-1&&v++,~v||(v=0),W.eq(v).trigger("focu\
s")}}}};function d(b){return this.each(function(){var _=e(this),R=_.data("bs.dropdown");R||_.data("b\
s.dropdown",R=new f(this)),typeof b=="string"&&R[b].call(_)})}var y=e.fn.dropdown;e.fn.dropdown=d,e.
fn.dropdown.Constructor=f,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=y,this},e(document).
on("click.bs.dropdown.data-api",o).on("click.bs.dropdown.data-api",".dropdown form",function(b){b.stopPropagation()}).
on("click.bs.dropdown.data-api",a,f.prototype.toggle).on("keydown.bs.dropdown.data-api",a,f.prototype.
keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",f.prototype.keydown)}(jQuery)});var zl=Kt(()=>{+function(e){"use strict";var n=function(u,o){this.options=o,this.$body=e(document.body),
this.$element=e(u),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=
null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&
this.$element.find(".modal-content").load(this.options.remote,e.proxy(function(){this.$element.trigger(
"loaded.bs.modal")},this))};n.VERSION="3.3.7",n.TRANSITION_DURATION=300,n.BACKDROP_TRANSITION_DURATION=
150,n.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},n.prototype.toggle=function(u){return this.isShown?
this.hide():this.show(u)},n.prototype.show=function(u){var o=this,d=e.Event("show.bs.modal",{relatedTarget:u});
this.$element.trigger(d),!(this.isShown||d.isDefaultPrevented())&&(this.isShown=!0,this.checkScrollbar(),
this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("\
click.dismiss.bs.modal",'[data-dismiss="modal"]',e.proxy(this.hide,this)),this.$dialog.on("mousedown\
.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(y){e(y.target).is(o.
$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var y=e.support.transition&&o.$element.
hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(
0),o.adjustDialog(),y&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var b=e.
Event("shown.bs.modal",{relatedTarget:u});y?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger(
"focus").trigger(b)}).emulateTransitionEnd(n.TRANSITION_DURATION):o.$element.trigger("focus").trigger(
b)}))},n.prototype.hide=function(u){u&&u.preventDefault(),u=e.Event("hide.bs.modal"),this.$element.trigger(
u),!(!this.isShown||u.isDefaultPrevented())&&(this.isShown=!1,this.escape(),this.resize(),e(document).
off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.d\
ismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),e.support.transition&&this.$element.
hasClass("fade")?this.$element.one("bsTransitionEnd",e.proxy(this.hideModal,this)).emulateTransitionEnd(
n.TRANSITION_DURATION):this.hideModal())},n.prototype.enforceFocus=function(){e(document).off("focus\
in.bs.modal").on("focusin.bs.modal",e.proxy(function(u){document!==u.target&&this.$element[0]!==u.target&&
!this.$element.has(u.target).length&&this.$element.trigger("focus")},this))},n.prototype.escape=function(){
this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",e.proxy(function(u){
u.which==27&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},n.prototype.
resize=function(){this.isShown?e(window).on("resize.bs.modal",e.proxy(this.handleUpdate,this)):e(window).
off("resize.bs.modal")},n.prototype.hideModal=function(){var u=this;this.$element.hide(),this.backdrop(
function(){u.$body.removeClass("modal-open"),u.resetAdjustments(),u.resetScrollbar(),u.$element.trigger(
"hidden.bs.modal")})},n.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),
this.$backdrop=null},n.prototype.backdrop=function(u){var o=this,d=this.$element.hasClass("fade")?"f\
ade":"";if(this.isShown&&this.options.backdrop){var y=e.support.transition&&d;if(this.$backdrop=e(document.
createElement("div")).addClass("modal-backdrop "+d).appendTo(this.$body),this.$element.on("click.dis\
miss.bs.modal",e.proxy(function(_){if(this.ignoreBackdropClick){this.ignoreBackdropClick=!1;return}_.
target===_.currentTarget&&(this.options.backdrop=="static"?this.$element[0].focus():this.hide())},this)),
y&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!u)return;y?this.$backdrop.one("bsTra\
nsitionEnd",u).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):u()}else if(!this.isShown&&this.
$backdrop){this.$backdrop.removeClass("in");var b=function(){o.removeBackdrop(),u&&u()};e.support.transition&&
this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):
b()}else u&&u()},n.prototype.handleUpdate=function(){this.adjustDialog()},n.prototype.adjustDialog=function(){
var u=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.
bodyIsOverflowing&&u?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!u?this.scrollbarWidth:
""})},n.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},n.
prototype.checkScrollbar=function(){var u=window.innerWidth;if(!u){var o=document.documentElement.getBoundingClientRect();
u=o.right-Math.abs(o.left)}this.bodyIsOverflowing=document.body.clientWidth<u,this.scrollbarWidth=this.
measureScrollbar()},n.prototype.setScrollbar=function(){var u=parseInt(this.$body.css("padding-right")||
0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css(
"padding-right",u+this.scrollbarWidth)},n.prototype.resetScrollbar=function(){this.$body.css("paddin\
g-right",this.originalBodyPad)},n.prototype.measureScrollbar=function(){var u=document.createElement(
"div");u.className="modal-scrollbar-measure",this.$body.append(u);var o=u.offsetWidth-u.clientWidth;
return this.$body[0].removeChild(u),o};function a(u,o){return this.each(function(){var d=e(this),y=d.
data("bs.modal"),b=e.extend({},n.DEFAULTS,d.data(),typeof u=="object"&&u);y||d.data("bs.modal",y=new n(
this,b)),typeof u=="string"?y[u](o):b.show&&y.show(o)})}var f=e.fn.modal;e.fn.modal=a,e.fn.modal.Constructor=
n,e.fn.modal.noConflict=function(){return e.fn.modal=f,this},e(document).on("click.bs.modal.data-api",
'[data-toggle="modal"]',function(u){var o=e(this),d=o.attr("href"),y=e(o.attr("data-target")||d&&d.replace(
/.*(?=#[^\s]+$)/,"")),b=y.data("bs.modal")?"toggle":e.extend({remote:!/#/.test(d)&&d},y.data(),o.data());
o.is("a")&&u.preventDefault(),y.one("show.bs.modal",function(_){_.isDefaultPrevented()||y.one("hidde\
n.bs.modal",function(){o.is(":visible")&&o.trigger("focus")})}),a.call(y,b,this)})}(jQuery)});var Wl=Kt(()=>{+function(e){"use strict";var n=function(u,o){this.type=null,this.options=null,this.enabled=
null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",
u,o)};n.VERSION="3.3.7",n.TRANSITION_DURATION=150,n.DEFAULTS={animation:!0,placement:"top",selector:!1,
template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-i\
nner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"\
body",padding:0}},n.prototype.init=function(u,o,d){if(this.enabled=!0,this.type=u,this.$element=e(o),
this.options=this.getOptions(d),this.$viewport=this.options.viewport&&e(e.isFunction(this.options.viewport)?
this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),
this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.
selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the\
 window.document object!");for(var y=this.options.trigger.split(" "),b=y.length;b--;){var _=y[b];if(_==
"click")this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if(_!=
"manual"){var R=_=="hover"?"mouseenter":"focusin",$=_=="hover"?"mouseleave":"focusout";this.$element.
on(R+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on($+"."+this.type,
this.options.selector,e.proxy(this.leave,this))}}this.options.selector?this._options=e.extend({},this.
options,{trigger:"manual",selector:""}):this.fixTitle()},n.prototype.getDefaults=function(){return n.
DEFAULTS},n.prototype.getOptions=function(u){return u=e.extend({},this.getDefaults(),this.$element.data(),
u),u.delay&&typeof u.delay=="number"&&(u.delay={show:u.delay,hide:u.delay}),u},n.prototype.getDelegateOptions=
function(){var u={},o=this.getDefaults();return this._options&&e.each(this._options,function(d,y){o[d]!=
y&&(u[d]=y)}),u},n.prototype.enter=function(u){var o=u instanceof this.constructor?u:e(u.currentTarget).
data("bs."+this.type);if(o||(o=new this.constructor(u.currentTarget,this.getDelegateOptions()),e(u.currentTarget).
data("bs."+this.type,o)),u instanceof e.Event&&(o.inState[u.type=="focusin"?"focus":"hover"]=!0),o.tip().
hasClass("in")||o.hoverState=="in"){o.hoverState="in";return}if(clearTimeout(o.timeout),o.hoverState=
"in",!o.options.delay||!o.options.delay.show)return o.show();o.timeout=setTimeout(function(){o.hoverState==
"in"&&o.show()},o.options.delay.show)},n.prototype.isInStateTrue=function(){for(var u in this.inState)
if(this.inState[u])return!0;return!1},n.prototype.leave=function(u){var o=u instanceof this.constructor?
u:e(u.currentTarget).data("bs."+this.type);if(o||(o=new this.constructor(u.currentTarget,this.getDelegateOptions()),
e(u.currentTarget).data("bs."+this.type,o)),u instanceof e.Event&&(o.inState[u.type=="focusout"?"foc\
us":"hover"]=!1),!o.isInStateTrue()){if(clearTimeout(o.timeout),o.hoverState="out",!o.options.delay||
!o.options.delay.hide)return o.hide();o.timeout=setTimeout(function(){o.hoverState=="out"&&o.hide()},
o.options.delay.hide)}},n.prototype.show=function(){var u=e.Event("show.bs."+this.type);if(this.hasContent()&&
this.enabled){this.$element.trigger(u);var o=e.contains(this.$element[0].ownerDocument.documentElement,
this.$element[0]);if(u.isDefaultPrevented()||!o)return;var d=this,y=this.tip(),b=this.getUID(this.type);
this.setContent(),y.attr("id",b),this.$element.attr("aria-describedby",b),this.options.animation&&y.
addClass("fade");var _=typeof this.options.placement=="function"?this.options.placement.call(this,y[0],
this.$element[0]):this.options.placement,R=/\s?auto?\s?/i,$=R.test(_);$&&(_=_.replace(R,"")||"top"),
y.detach().css({top:0,left:0,display:"block"}).addClass(_).data("bs."+this.type,this),this.options.container?
y.appendTo(this.options.container):y.insertAfter(this.$element),this.$element.trigger("inserted.bs."+
this.type);var X=this.getPosition(),W=y[0].offsetWidth,v=y[0].offsetHeight;if($){var D=_,T=this.getPosition(
this.$viewport);_=_=="bottom"&&X.bottom+v>T.bottom?"top":_=="top"&&X.top-v<T.top?"bottom":_=="right"&&
X.right+W>T.width?"left":_=="left"&&X.left-W<T.left?"right":_,y.removeClass(D).addClass(_)}var F=this.
getCalculatedOffset(_,X,W,v);this.applyPlacement(F,_);var z=function(){var Q=d.hoverState;d.$element.
trigger("shown.bs."+d.type),d.hoverState=null,Q=="out"&&d.leave(d)};e.support.transition&&this.$tip.
hasClass("fade")?y.one("bsTransitionEnd",z).emulateTransitionEnd(n.TRANSITION_DURATION):z()}},n.prototype.
applyPlacement=function(u,o){var d=this.tip(),y=d[0].offsetWidth,b=d[0].offsetHeight,_=parseInt(d.css(
"margin-top"),10),R=parseInt(d.css("margin-left"),10);isNaN(_)&&(_=0),isNaN(R)&&(R=0),u.top+=_,u.left+=
R,e.offset.setOffset(d[0],e.extend({using:function(F){d.css({top:Math.round(F.top),left:Math.round(F.
left)})}},u),0),d.addClass("in");var $=d[0].offsetWidth,X=d[0].offsetHeight;o=="top"&&X!=b&&(u.top=u.
top+b-X);var W=this.getViewportAdjustedDelta(o,u,$,X);W.left?u.left+=W.left:u.top+=W.top;var v=/top|bottom/.
test(o),D=v?W.left*2-y+$:W.top*2-b+X,T=v?"offsetWidth":"offsetHeight";d.offset(u),this.replaceArrow(
D,d[0][T],v)},n.prototype.replaceArrow=function(u,o,d){this.arrow().css(d?"left":"top",50*(1-u/o)+"%").
css(d?"top":"left","")},n.prototype.setContent=function(){var u=this.tip(),o=this.getTitle();u.find(
".tooltip-inner")[this.options.html?"html":"text"](o),u.removeClass("fade in top bottom left right")},
n.prototype.hide=function(u){var o=this,d=e(this.$tip),y=e.Event("hide.bs."+this.type);function b(){
o.hoverState!="in"&&d.detach(),o.$element&&o.$element.removeAttr("aria-describedby").trigger("hidden\
.bs."+o.type),u&&u()}if(this.$element.trigger(y),!y.isDefaultPrevented())return d.removeClass("in"),
e.support.transition&&d.hasClass("fade")?d.one("bsTransitionEnd",b).emulateTransitionEnd(n.TRANSITION_DURATION):
b(),this.hoverState=null,this},n.prototype.fixTitle=function(){var u=this.$element;(u.attr("title")||
typeof u.attr("data-original-title")!="string")&&u.attr("data-original-title",u.attr("title")||"").attr(
"title","")},n.prototype.hasContent=function(){return this.getTitle()},n.prototype.getPosition=function(u){
u=u||this.$element;var o=u[0],d=o.tagName=="BODY",y=o.getBoundingClientRect();y.width==null&&(y=e.extend(
{},y,{width:y.right-y.left,height:y.bottom-y.top}));var b=window.SVGElement&&o instanceof window.SVGElement,
_=d?{top:0,left:0}:b?null:u.offset(),R={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:
u.scrollTop()},$=d?{width:e(window).width(),height:e(window).height()}:null;return e.extend({},y,R,$,
_)},n.prototype.getCalculatedOffset=function(u,o,d,y){return u=="bottom"?{top:o.top+o.height,left:o.
left+o.width/2-d/2}:u=="top"?{top:o.top-y,left:o.left+o.width/2-d/2}:u=="left"?{top:o.top+o.height/2-
y/2,left:o.left-d}:{top:o.top+o.height/2-y/2,left:o.left+o.width}},n.prototype.getViewportAdjustedDelta=
function(u,o,d,y){var b={top:0,left:0};if(!this.$viewport)return b;var _=this.options.viewport&&this.
options.viewport.padding||0,R=this.getPosition(this.$viewport);if(/right|left/.test(u)){var $=o.top-
_-R.scroll,X=o.top+_-R.scroll+y;$<R.top?b.top=R.top-$:X>R.top+R.height&&(b.top=R.top+R.height-X)}else{
var W=o.left-_,v=o.left+_+d;W<R.left?b.left=R.left-W:v>R.right&&(b.left=R.left+R.width-v)}return b},
n.prototype.getTitle=function(){var u,o=this.$element,d=this.options;return u=o.attr("data-original-\
title")||(typeof d.title=="function"?d.title.call(o[0]):d.title),u},n.prototype.getUID=function(u){do
u+=~~(Math.random()*1e6);while(document.getElementById(u));return u},n.prototype.tip=function(){if(!this.
$tip&&(this.$tip=e(this.options.template),this.$tip.length!=1))throw new Error(this.type+" `template\
` option must consist of exactly 1 top-level element!");return this.$tip},n.prototype.arrow=function(){
return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},n.prototype.enable=function(){this.
enabled=!0},n.prototype.disable=function(){this.enabled=!1},n.prototype.toggleEnabled=function(){this.
enabled=!this.enabled},n.prototype.toggle=function(u){var o=this;u&&(o=e(u.currentTarget).data("bs."+
this.type),o||(o=new this.constructor(u.currentTarget,this.getDelegateOptions()),e(u.currentTarget).
data("bs."+this.type,o))),u?(o.inState.click=!o.inState.click,o.isInStateTrue()?o.enter(o):o.leave(o)):
o.tip().hasClass("in")?o.leave(o):o.enter(o)},n.prototype.destroy=function(){var u=this;clearTimeout(
this.timeout),this.hide(function(){u.$element.off("."+u.type).removeData("bs."+u.type),u.$tip&&u.$tip.
detach(),u.$tip=null,u.$arrow=null,u.$viewport=null,u.$element=null})};function a(u){return this.each(
function(){var o=e(this),d=o.data("bs.tooltip"),y=typeof u=="object"&&u;!d&&/destroy|hide/.test(u)||
(d||o.data("bs.tooltip",d=new n(this,y)),typeof u=="string"&&d[u]())})}var f=e.fn.tooltip;e.fn.tooltip=
a,e.fn.tooltip.Constructor=n,e.fn.tooltip.noConflict=function(){return e.fn.tooltip=f,this}}(jQuery)});var Ul=Kt(()=>{+function(e){"use strict";var n=function(u,o){this.init("popover",u,o)};if(!e.fn.tooltip)
throw new Error("Popover requires tooltip.js");n.VERSION="3.3.7",n.DEFAULTS=e.extend({},e.fn.tooltip.
Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" ro\
le="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></\
div></div>'}),n.prototype=e.extend({},e.fn.tooltip.Constructor.prototype),n.prototype.constructor=n,
n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.setContent=function(){var u=this.tip(),
o=this.getTitle(),d=this.getContent();u.find(".popover-title")[this.options.html?"html":"text"](o),u.
find(".popover-content").children().detach().end()[this.options.html?typeof d=="string"?"html":"appe\
nd":"text"](d),u.removeClass("fade top bottom left right in"),u.find(".popover-title").html()||u.find(
".popover-title").hide()},n.prototype.hasContent=function(){return this.getTitle()||this.getContent()},
n.prototype.getContent=function(){var u=this.$element,o=this.options;return u.attr("data-content")||
(typeof o.content=="function"?o.content.call(u[0]):o.content)},n.prototype.arrow=function(){return this.
$arrow=this.$arrow||this.tip().find(".arrow")};function a(u){return this.each(function(){var o=e(this),
d=o.data("bs.popover"),y=typeof u=="object"&&u;!d&&/destroy|hide/.test(u)||(d||o.data("bs.popover",d=
new n(this,y)),typeof u=="string"&&d[u]())})}var f=e.fn.popover;e.fn.popover=a,e.fn.popover.Constructor=
n,e.fn.popover.noConflict=function(){return e.fn.popover=f,this}}(jQuery)});var jl=Kt(()=>{+function(e){"use strict";function n(u,o){this.$body=e(document.body),this.$scrollElement=
e(u).is(document.body)?e(window):e(u),this.options=e.extend({},n.DEFAULTS,o),this.selector=(this.options.
target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=
0,this.$scrollElement.on("scroll.bs.scrollspy",e.proxy(this.process,this)),this.refresh(),this.process()}
n.VERSION="3.3.7",n.DEFAULTS={offset:10},n.prototype.getScrollHeight=function(){return this.$scrollElement[0].
scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},n.prototype.
refresh=function(){var u=this,o="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.
getScrollHeight(),e.isWindow(this.$scrollElement[0])||(o="position",d=this.$scrollElement.scrollTop()),
this.$body.find(this.selector).map(function(){var y=e(this),b=y.data("target")||y.attr("href"),_=/^#./.
test(b)&&e(b);return _&&_.length&&_.is(":visible")&&[[_[o]().top+d,b]]||null}).sort(function(y,b){return y[0]-
b[0]}).each(function(){u.offsets.push(this[0]),u.targets.push(this[1])})},n.prototype.process=function(){
var u=this.$scrollElement.scrollTop()+this.options.offset,o=this.getScrollHeight(),d=this.options.offset+
o-this.$scrollElement.height(),y=this.offsets,b=this.targets,_=this.activeTarget,R;if(this.scrollHeight!=
o&&this.refresh(),u>=d)return _!=(R=b[b.length-1])&&this.activate(R);if(_&&u<y[0])return this.activeTarget=
null,this.clear();for(R=y.length;R--;)_!=b[R]&&u>=y[R]&&(y[R+1]===void 0||u<y[R+1])&&this.activate(b[R])},
n.prototype.activate=function(u){this.activeTarget=u,this.clear();var o=this.selector+'[data-target=\
"'+u+'"],'+this.selector+'[href="'+u+'"]',d=e(o).parents("li").addClass("active");d.parent(".dropdow\
n-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},
n.prototype.clear=function(){e(this.selector).parentsUntil(this.options.target,".active").removeClass(
"active")};function a(u){return this.each(function(){var o=e(this),d=o.data("bs.scrollspy"),y=typeof u==
"object"&&u;d||o.data("bs.scrollspy",d=new n(this,y)),typeof u=="string"&&d[u]()})}var f=e.fn.scrollspy;
e.fn.scrollspy=a,e.fn.scrollspy.Constructor=n,e.fn.scrollspy.noConflict=function(){return e.fn.scrollspy=
f,this},e(window).on("load.bs.scrollspy.data-api",function(){e('[data-spy="scroll"]').each(function(){
var u=e(this);a.call(u,u.data())})})}(jQuery)});var Vl=Kt(()=>{+function(e){"use strict";var n=function(o){this.element=e(o)};n.VERSION="3.3.7",n.TRANSITION_DURATION=
150,n.prototype.show=function(){var o=this.element,d=o.closest("ul:not(.dropdown-menu)"),y=o.data("t\
arget");if(y||(y=o.attr("href"),y=y&&y.replace(/.*(?=#[^\s]*$)/,"")),!o.parent("li").hasClass("activ\
e")){var b=d.find(".active:last a"),_=e.Event("hide.bs.tab",{relatedTarget:o[0]}),R=e.Event("show.bs\
.tab",{relatedTarget:b[0]});if(b.trigger(_),o.trigger(R),!(R.isDefaultPrevented()||_.isDefaultPrevented())){
var $=e(y);this.activate(o.closest("li"),d),this.activate($,$.parent(),function(){b.trigger({type:"h\
idden.bs.tab",relatedTarget:o[0]}),o.trigger({type:"shown.bs.tab",relatedTarget:b[0]})})}}},n.prototype.
activate=function(o,d,y){var b=d.find("> .active"),_=y&&e.support.transition&&(b.length&&b.hasClass(
"fade")||!!d.find("> .fade").length);function R(){b.removeClass("active").find("> .dropdown-menu > .\
active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),o.addClass(
"active").find('[data-toggle="tab"]').attr("aria-expanded",!0),_?(o[0].offsetWidth,o.addClass("in")):
o.removeClass("fade"),o.parent(".dropdown-menu").length&&o.closest("li.dropdown").addClass("active").
end().find('[data-toggle="tab"]').attr("aria-expanded",!0),y&&y()}b.length&&_?b.one("bsTransitionEnd",
R).emulateTransitionEnd(n.TRANSITION_DURATION):R(),b.removeClass("in")};function a(o){return this.each(
function(){var d=e(this),y=d.data("bs.tab");y||d.data("bs.tab",y=new n(this)),typeof o=="string"&&y[o]()})}
var f=e.fn.tab;e.fn.tab=a,e.fn.tab.Constructor=n,e.fn.tab.noConflict=function(){return e.fn.tab=f,this};
var u=function(o){o.preventDefault(),a.call(e(this),"show")};e(document).on("click.bs.tab.data-api",
'[data-toggle="tab"]',u).on("click.bs.tab.data-api",'[data-toggle="pill"]',u)}(jQuery)});var Ql=Kt(()=>{+function(e){"use strict";var n=function(u,o){this.options=e.extend({},n.DEFAULTS,o),
this.$target=e(this.options.target).on("scroll.bs.affix.data-api",e.proxy(this.checkPosition,this)).
on("click.bs.affix.data-api",e.proxy(this.checkPositionWithEventLoop,this)),this.$element=e(u),this.
affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};n.VERSION="3.3.7",n.RESET=
"affix affix-top affix-bottom",n.DEFAULTS={offset:0,target:window},n.prototype.getState=function(u,o,d,y){
var b=this.$target.scrollTop(),_=this.$element.offset(),R=this.$target.height();if(d!=null&&this.affixed==
"top")return b<d?"top":!1;if(this.affixed=="bottom")return d!=null?b+this.unpin<=_.top?!1:"bottom":b+
R<=u-y?!1:"bottom";var $=this.affixed==null,X=$?b:_.top,W=$?R:o;return d!=null&&b<=d?"top":y!=null&&
X+W>=u-y?"bottom":!1},n.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;
this.$element.removeClass(n.RESET).addClass("affix");var u=this.$target.scrollTop(),o=this.$element.
offset();return this.pinnedOffset=o.top-u},n.prototype.checkPositionWithEventLoop=function(){setTimeout(
e.proxy(this.checkPosition,this),1)},n.prototype.checkPosition=function(){if(this.$element.is(":visi\
ble")){var u=this.$element.height(),o=this.options.offset,d=o.top,y=o.bottom,b=Math.max(e(document).
height(),e(document.body).height());typeof o!="object"&&(y=d=o),typeof d=="function"&&(d=o.top(this.
$element)),typeof y=="function"&&(y=o.bottom(this.$element));var _=this.getState(b,u,d,y);if(this.affixed!=
_){this.unpin!=null&&this.$element.css("top","");var R="affix"+(_?"-"+_:""),$=e.Event(R+".bs.affix");
if(this.$element.trigger($),$.isDefaultPrevented())return;this.affixed=_,this.unpin=_=="bottom"?this.
getPinnedOffset():null,this.$element.removeClass(n.RESET).addClass(R).trigger(R.replace("affix","aff\
ixed")+".bs.affix")}_=="bottom"&&this.$element.offset({top:b-u-y})}};function a(u){return this.each(
function(){var o=e(this),d=o.data("bs.affix"),y=typeof u=="object"&&u;d||o.data("bs.affix",d=new n(this,
y)),typeof u=="string"&&d[u]()})}var f=e.fn.affix;e.fn.affix=a,e.fn.affix.Constructor=n,e.fn.affix.noConflict=
function(){return e.fn.affix=f,this},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){
var u=e(this),o=u.data();o.offset=o.offset||{},o.offsetBottom!=null&&(o.offset.bottom=o.offsetBottom),
o.offsetTop!=null&&(o.offset.top=o.offsetTop),a.call(u,o)})})}(jQuery)});var Xl=Kt((Kl,Ci)=>{(function(e,n){typeof define=="function"&&define.amd?define(["jquery"],function(a){
return n(a)}):typeof Ci=="object"&&Ci.exports?Ci.exports=n(er()):n(e.jQuery)})(Kl,function(e){(function(n){
"use strict";String.prototype.includes||function(){"use strict";var v={}.toString,D=function(){try{var z={},
Q=Object.defineProperty,nt=Q(z,z,z)&&Q}catch{}return nt}(),T="".indexOf,F=function(z){if(this==null)
throw new TypeError;var Q=String(this);if(z&&v.call(z)=="[object RegExp]")throw new TypeError;var nt=Q.
length,ut=String(z),i=ut.length,tt=arguments.length>1?arguments[1]:void 0,et=tt?Number(tt):0;et!=et&&
(et=0);var at=Math.min(Math.max(et,0),nt);return i+at>nt?!1:T.call(Q,ut,et)!=-1};D?D(String.prototype,
"includes",{value:F,configurable:!0,writable:!0}):String.prototype.includes=F}(),String.prototype.startsWith||
function(){"use strict";var v=function(){try{var F={},z=Object.defineProperty,Q=z(F,F,F)&&z}catch{}return Q}(),
D={}.toString,T=function(F){if(this==null)throw new TypeError;var z=String(this);if(F&&D.call(F)=="[\
object RegExp]")throw new TypeError;var Q=z.length,nt=String(F),ut=nt.length,i=arguments.length>1?arguments[1]:
void 0,tt=i?Number(i):0;tt!=tt&&(tt=0);var et=Math.min(Math.max(tt,0),Q);if(ut+et>Q)return!1;for(var at=-1;++at<
ut;)if(z.charCodeAt(et+at)!=nt.charCodeAt(at))return!1;return!0};v?v(String.prototype,"startsWith",{
value:T,configurable:!0,writable:!0}):String.prototype.startsWith=T}(),Object.keys||(Object.keys=function(v,D,T){
T=[];for(D in v)T.hasOwnProperty.call(v,D)&&T.push(D);return T});var a={useDefault:!1,_set:n.valHooks.
select.set};n.valHooks.select.set=function(v,D){return D&&!a.useDefault&&n(v).data("selected",!0),a.
_set.apply(this,arguments)};var f=null,u=function(){try{return new Event("change"),!0}catch{return!1}}();
n.fn.triggerNative=function(v){var D=this[0],T;D.dispatchEvent?(u?T=new Event(v,{bubbles:!0}):(T=document.
createEvent("Event"),T.initEvent(v,!0,!1)),D.dispatchEvent(T)):D.fireEvent?(T=document.createEventObject(),
T.eventType=v,D.fireEvent("on"+v,T)):this.trigger(v)},n.expr.pseudos.icontains=function(v,D,T){var F=n(
v).find("a"),z=(F.data("tokens")||F.text()).toString().toUpperCase();return z.includes(T[3].toUpperCase())},
n.expr.pseudos.ibegins=function(v,D,T){var F=n(v).find("a"),z=(F.data("tokens")||F.text()).toString().
toUpperCase();return z.startsWith(T[3].toUpperCase())},n.expr.pseudos.aicontains=function(v,D,T){var F=n(
v).find("a"),z=(F.data("tokens")||F.data("normalizedText")||F.text()).toString().toUpperCase();return z.
includes(T[3].toUpperCase())},n.expr.pseudos.aibegins=function(v,D,T){var F=n(v).find("a"),z=(F.data(
"tokens")||F.data("normalizedText")||F.text()).toString().toUpperCase();return z.startsWith(T[3].toUpperCase())};
function o(v){var D=[{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},
{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,
ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,
ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}];return n.each(D,function(){v=v?v.replace(this.re,
this.ch):""}),v}var d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},y={
"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x60;":"`"},b=function(v){var D=function(Q){
return v[Q]},T="(?:"+Object.keys(v).join("|")+")",F=RegExp(T),z=RegExp(T,"g");return function(Q){return Q=
Q==null?"":""+Q,F.test(Q)?Q.replace(z,D):Q}},_=b(d),R=b(y),$=function(v,D){a.useDefault||(n.valHooks.
select.set=a._set,a.useDefault=!0),this.$element=n(v),this.$newElement=null,this.$button=null,this.$menu=
null,this.$lis=null,this.options=D,this.options.title===null&&(this.options.title=this.$element.attr(
"title"));var T=this.options.windowPadding;typeof T=="number"&&(this.options.windowPadding=[T,T,T,T]),
this.val=$.prototype.val,this.render=$.prototype.render,this.refresh=$.prototype.refresh,this.setStyle=
$.prototype.setStyle,this.selectAll=$.prototype.selectAll,this.deselectAll=$.prototype.deselectAll,this.
destroy=$.prototype.destroy,this.remove=$.prototype.remove,this.show=$.prototype.show,this.hide=$.prototype.
hide,this.init()};$.VERSION="1.12.4",$.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"\
No results matched {0}",countSelectedText:function(v,D){return v==1?"{0} item selected":"{0} items s\
elected"},maxOptionsText:function(v,D){return[v==1?"Limit reached ({n} item max)":"Limit reached ({n\
} items max)",D==1?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)"]},selectAllText:"\
Select All",deselectAllText:"Deselect All",doneButton:!1,doneButtonText:"Close",multipleSeparator:",\
 ",styleBase:"btn",style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,
hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,liveSearchPlaceholder:null,
liveSearchNormalize:!1,liveSearchStyle:"contains",actionsBox:!1,iconBase:"glyphicon",tickIcon:"glyph\
icon-ok",showTick:!1,template:{caret:'<span class="caret"></span>'},maxOptions:!1,mobile:!1,selectOnTab:!1,
dropdownAlignRight:!1,windowPadding:0},$.prototype={constructor:$,init:function(){var v=this,D=this.
$element.attr("id");this.$element.addClass("bs-select-hidden"),this.liObj={},this.multiple=this.$element.
prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.
$element.after(this.$newElement).appendTo(this.$newElement),this.$button=this.$newElement.children("\
button"),this.$menu=this.$newElement.children(".dropdown-menu"),this.$menuInner=this.$menu.children(
".inner"),this.$searchbox=this.$menu.find("input"),this.$element.removeClass("bs-select-hidden"),this.
options.dropdownAlignRight===!0&&this.$menu.addClass("dropdown-menu-right"),typeof D<"u"&&(this.$button.
attr("data-id",D),n('label[for="'+D+'"]').click(function(T){T.preventDefault(),v.$button.focus()})),
this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),
this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",
this),this.$newElement.data("this",this),this.options.mobile&&this.mobile(),this.$newElement.on({"hi\
de.bs.dropdown":function(T){v.$menuInner.attr("aria-expanded",!1),v.$element.trigger("hide.bs.select",
T)},"hidden.bs.dropdown":function(T){v.$element.trigger("hidden.bs.select",T)},"show.bs.dropdown":function(T){
v.$menuInner.attr("aria-expanded",!0),v.$element.trigger("show.bs.select",T)},"shown.bs.dropdown":function(T){
v.$element.trigger("shown.bs.select",T)}}),v.$element[0].hasAttribute("required")&&this.$element.on(
"invalid",function(){v.$button.addClass("bs-invalid"),v.$element.on({"focus.bs.select":function(){v.
$button.focus(),v.$element.off("focus.bs.select")},"shown.bs.select":function(){v.$element.val(v.$element.
val()).off("shown.bs.select")},"rendered.bs.select":function(){this.validity.valid&&v.$button.removeClass(
"bs-invalid"),v.$element.off("rendered.bs.select")}}),v.$button.on("blur.bs.select",function(){v.$element.
focus().blur(),v.$button.off("blur.bs.select")})}),setTimeout(function(){v.$element.trigger("loaded.\
bs.select")})},createDropdown:function(){var v=this.multiple||this.options.showTick?" show-tick":"",
D=this.$element.parent().hasClass("input-group")?" input-group-btn":"",T=this.autofocus?" autofocus":
"",F=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden\
="true">&times;</button>'+this.options.header+"</div>":"",z=this.options.liveSearch?'<div class="bs-\
searchbox"><input type="text" class="form-control" autocomplete="off"'+(this.options.liveSearchPlaceholder===
null?"":' placeholder="'+_(this.options.liveSearchPlaceholder)+'"')+' role="textbox" aria-label="Sea\
rch"></div>':"",Q=this.multiple&&this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn\
-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-defaul\
t">'+this.options.selectAllText+'</button><button type="button" class="actions-btn bs-deselect-all b\
tn btn-default">'+this.options.deselectAllText+"</button></div></div>":"",nt=this.multiple&&this.options.
doneButton?'<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class=\
"btn btn-sm btn-default">'+this.options.doneButtonText+"</button></div></div>":"",ut='<div class="bt\
n-group bootstrap-select'+v+D+'"><button type="button" class="'+this.options.styleBase+' dropdown-to\
ggle" data-toggle="dropdown"'+T+' role="button"><span class="filter-option pull-left"></span>&nbsp;<\
span class="bs-caret">'+this.options.template.caret+'</span></button><div class="dropdown-menu open"\
 role="combobox">'+F+z+Q+'<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>'+
nt+"</div></div>";return n(ut)},createView:function(){var v=this.createDropdown(),D=this.createLi();
return v.find("ul")[0].innerHTML=D,v},reloadLi:function(){var v=this.createLi();this.$menuInner[0].innerHTML=
v},createLi:function(){var v=this,D=[],T=0,F=document.createElement("option"),z=-1,Q=function(et,at,Tt,wt){
return"<li"+(typeof Tt<"u"&&Tt!==""?' class="'+Tt+'"':"")+(typeof at<"u"&&at!==null?' data-original-\
index="'+at+'"':"")+(typeof wt<"u"&&wt!==null?'data-optgroup="'+wt+'"':"")+">"+et+"</li>"},nt=function(et,at,Tt,wt){
return'<a tabindex="0"'+(typeof at<"u"?' class="'+at+'"':"")+(Tt?' style="'+Tt+'"':"")+(v.options.liveSearchNormalize?
' data-normalized-text="'+o(_(n(et).html()))+'"':"")+(typeof wt<"u"||wt!==null?' data-tokens="'+wt+'\
"':"")+' role="option">'+et+'<span class="'+v.options.iconBase+" "+v.options.tickIcon+' check-mark">\
</span></a>'};if(this.options.title&&!this.multiple&&(z--,!this.$element.find(".bs-title-option").length)){
var ut=this.$element[0];F.className="bs-title-option",F.innerHTML=this.options.title,F.value="",ut.insertBefore(
F,ut.firstChild);var i=n(ut.options[ut.selectedIndex]);i.attr("selected")===void 0&&this.$element.data(
"selected")===void 0&&(F.selected=!0)}var tt=this.$element.find("option");return tt.each(function(et){
var at=n(this);if(z++,!at.hasClass("bs-title-option")){var Tt=this.className||"",wt=_(this.style.cssText),
mt=at.data("content")?at.data("content"):at.html(),lt=at.data("tokens")?at.data("tokens"):null,it=typeof at.
data("subtext")<"u"?'<small class="text-muted">'+at.data("subtext")+"</small>":"",pt=typeof at.data(
"icon")<"u"?'<span class="'+v.options.iconBase+" "+at.data("icon")+'"></span> ':"",ft=at.parent(),m=ft[0].
tagName==="OPTGROUP",C=m&&ft[0].disabled,I=this.disabled||C,q;if(pt!==""&&I&&(pt="<span>"+pt+"</span\
>"),v.options.hideDisabled&&(I&&!m||C)){q=at.data("prevHiddenIndex"),at.next().data("prevHiddenIndex",
q!==void 0?q:et),z--;return}if(at.data("content")||(mt=pt+'<span class="text">'+mt+it+"</span>"),m&&
at.data("divider")!==!0){if(v.options.hideDisabled&&I){if(ft.data("allOptionsDisabled")===void 0){var G=ft.
children();ft.data("allOptionsDisabled",G.filter(":disabled").length===G.length)}if(ft.data("allOpti\
onsDisabled")){z--;return}}var Y=" "+ft[0].className||"";if(at.index()===0){T+=1;var ct=ft[0].label,
$t=typeof ft.data("subtext")<"u"?'<small class="text-muted">'+ft.data("subtext")+"</small>":"",ce=ft.
data("icon")?'<span class="'+v.options.iconBase+" "+ft.data("icon")+'"></span> ':"";ct=ce+'<span cla\
ss="text">'+_(ct)+$t+"</span>",et!==0&&D.length>0&&(z++,D.push(Q("",null,"divider",T+"div"))),z++,D.
push(Q(ct,null,"dropdown-header"+Y,T))}if(v.options.hideDisabled&&I){z--;return}D.push(Q(nt(mt,"opt "+
Tt+Y,wt,lt),et,"",T))}else if(at.data("divider")===!0)D.push(Q("",et,"divider"));else if(at.data("hi\
dden")===!0)q=at.data("prevHiddenIndex"),at.next().data("prevHiddenIndex",q!==void 0?q:et),D.push(Q(
nt(mt,Tt,wt,lt),et,"hidden is-hidden"));else{var Vt=this.previousElementSibling&&this.previousElementSibling.
tagName==="OPTGROUP";if(!Vt&&v.options.hideDisabled&&(q=at.data("prevHiddenIndex"),q!==void 0)){var Zt=tt.
eq(q)[0].previousElementSibling;Zt&&Zt.tagName==="OPTGROUP"&&!Zt.disabled&&(Vt=!0)}Vt&&(z++,D.push(Q(
"",null,"divider",T+"div"))),D.push(Q(nt(mt,Tt,wt,lt),et))}v.liObj[et]=z}}),!this.multiple&&this.$element.
find("option:selected").length===0&&!this.options.title&&this.$element.find("option").eq(0).prop("se\
lected",!0).attr("selected","selected"),D.join("")},findLis:function(){return this.$lis==null&&(this.
$lis=this.$menu.find("li")),this.$lis},render:function(v){var D=this,T,F=this.$element.find("option");
v!==!1&&F.each(function(tt){var et=D.findLis().eq(D.liObj[tt]);D.setDisabled(tt,this.disabled||this.
parentNode.tagName==="OPTGROUP"&&this.parentNode.disabled,et),D.setSelected(tt,this.selected,et)}),this.
togglePlaceholder(),this.tabIndex();var z=F.map(function(){if(this.selected){if(D.options.hideDisabled&&
(this.disabled||this.parentNode.tagName==="OPTGROUP"&&this.parentNode.disabled))return;var tt=n(this),
et=tt.data("icon")&&D.options.showIcon?'<i class="'+D.options.iconBase+" "+tt.data("icon")+'"></i> ':
"",at;return D.options.showSubtext&&tt.data("subtext")&&!D.multiple?at=' <small class="text-muted">'+
tt.data("subtext")+"</small>":at="",typeof tt.attr("title")<"u"?tt.attr("title"):tt.data("content")&&
D.options.showContent?tt.data("content").toString():et+tt.html()+at}}).toArray(),Q=this.multiple?z.join(
this.options.multipleSeparator):z[0];if(this.multiple&&this.options.selectedTextFormat.indexOf("coun\
t")>-1){var nt=this.options.selectedTextFormat.split(">");if(nt.length>1&&z.length>nt[1]||nt.length==
1&&z.length>=2){T=this.options.hideDisabled?", [disabled]":"";var ut=F.not('[data-divider="true"], [\
data-hidden="true"]'+T).length,i=typeof this.options.countSelectedText=="function"?this.options.countSelectedText(
z.length,ut):this.options.countSelectedText;Q=i.replace("{0}",z.length.toString()).replace("{1}",ut.
toString())}}this.options.title==null&&(this.options.title=this.$element.attr("title")),this.options.
selectedTextFormat=="static"&&(Q=this.options.title),Q||(Q=typeof this.options.title<"u"?this.options.
title:this.options.noneSelectedText),this.$button.attr("title",R(n.trim(Q.replace(/<[^>]*>?/g,"")))),
this.$button.children(".filter-option").html(Q),this.$element.trigger("rendered.bs.select")},setStyle:function(v,D){
this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,
""));var T=v||this.options.style;D=="add"?this.$button.addClass(T):D=="remove"?this.$button.removeClass(
T):(this.$button.removeClass(this.options.style),this.$button.addClass(T))},liHeight:function(v){if(!(!v&&
(this.options.size===!1||this.sizeInfo))){var D=document.createElement("div"),T=document.createElement(
"div"),F=document.createElement("ul"),z=document.createElement("li"),Q=document.createElement("li"),
nt=document.createElement("a"),ut=document.createElement("span"),i=this.options.header&&this.$menu.find(
".popover-title").length>0?this.$menu.find(".popover-title")[0].cloneNode(!0):null,tt=this.options.liveSearch?
document.createElement("div"):null,et=this.options.actionsBox&&this.multiple&&this.$menu.find(".bs-a\
ctionsbox").length>0?this.$menu.find(".bs-actionsbox")[0].cloneNode(!0):null,at=this.options.doneButton&&
this.multiple&&this.$menu.find(".bs-donebutton").length>0?this.$menu.find(".bs-donebutton")[0].cloneNode(
!0):null;if(ut.className="text",D.className=this.$menu[0].parentNode.className+" open",T.className="\
dropdown-menu open",F.className="dropdown-menu inner",z.className="divider",ut.appendChild(document.
createTextNode("Inner text")),nt.appendChild(ut),Q.appendChild(nt),F.appendChild(Q),F.appendChild(z),
i&&T.appendChild(i),tt){var Tt=document.createElement("input");tt.className="bs-searchbox",Tt.className=
"form-control",tt.appendChild(Tt),T.appendChild(tt)}et&&T.appendChild(et),T.appendChild(F),at&&T.appendChild(
at),D.appendChild(T),document.body.appendChild(D);var wt=nt.offsetHeight,mt=i?i.offsetHeight:0,lt=tt?
tt.offsetHeight:0,it=et?et.offsetHeight:0,pt=at?at.offsetHeight:0,ft=n(z).outerHeight(!0),m=typeof getComputedStyle==
"function"?getComputedStyle(T):!1,C=m?null:n(T),I={vert:parseInt(m?m.paddingTop:C.css("paddingTop"))+
parseInt(m?m.paddingBottom:C.css("paddingBottom"))+parseInt(m?m.borderTopWidth:C.css("borderTopWidth"))+
parseInt(m?m.borderBottomWidth:C.css("borderBottomWidth")),horiz:parseInt(m?m.paddingLeft:C.css("pad\
dingLeft"))+parseInt(m?m.paddingRight:C.css("paddingRight"))+parseInt(m?m.borderLeftWidth:C.css("bor\
derLeftWidth"))+parseInt(m?m.borderRightWidth:C.css("borderRightWidth"))},q={vert:I.vert+parseInt(m?
m.marginTop:C.css("marginTop"))+parseInt(m?m.marginBottom:C.css("marginBottom"))+2,horiz:I.horiz+parseInt(
m?m.marginLeft:C.css("marginLeft"))+parseInt(m?m.marginRight:C.css("marginRight"))+2};document.body.
removeChild(D),this.sizeInfo={liHeight:wt,headerHeight:mt,searchHeight:lt,actionsHeight:it,doneButtonHeight:pt,
dividerHeight:ft,menuPadding:I,menuExtras:q}}},setSize:function(){if(this.findLis(),this.liHeight(),
this.options.header&&this.$menu.css("padding-top",0),this.options.size!==!1){var v=this,D=this.$menu,
T=this.$menuInner,F=n(window),z=this.$newElement[0].offsetHeight,Q=this.$newElement[0].offsetWidth,nt=this.
sizeInfo.liHeight,ut=this.sizeInfo.headerHeight,i=this.sizeInfo.searchHeight,tt=this.sizeInfo.actionsHeight,
et=this.sizeInfo.doneButtonHeight,at=this.sizeInfo.dividerHeight,Tt=this.sizeInfo.menuPadding,wt=this.
sizeInfo.menuExtras,mt=this.options.hideDisabled?".disabled":"",lt,it,pt,ft,m,C,I,q,G=function(){var ce=v.
$newElement.offset(),Vt=n(v.options.container),Zt;v.options.container&&!Vt.is("body")?(Zt=Vt.offset(),
Zt.top+=parseInt(Vt.css("borderTopWidth")),Zt.left+=parseInt(Vt.css("borderLeftWidth"))):Zt={top:0,left:0};
var _e=v.options.windowPadding;m=ce.top-Zt.top-F.scrollTop(),C=F.height()-m-z-Zt.top-_e[2],I=ce.left-
Zt.left-F.scrollLeft(),q=F.width()-I-Q-Zt.left-_e[1],m-=_e[0],I-=_e[3]};if(G(),this.options.size==="\
auto"){var Y=function(){var ce,Vt=function(ar,qe){return function(ae){return qe?ae.classList?ae.classList.
contains(ar):n(ae).hasClass(ar):!(ae.classList?ae.classList.contains(ar):n(ae).hasClass(ar))}},Zt=v.
$menuInner[0].getElementsByTagName("li"),_e=Array.prototype.filter?Array.prototype.filter.call(Zt,Vt(
"hidden",!1)):v.$lis.not(".hidden"),ve=Array.prototype.filter?Array.prototype.filter.call(_e,Vt("dro\
pdown-header",!0)):_e.filter(".dropdown-header");G(),lt=C-wt.vert,it=q-wt.horiz,v.options.container?
(D.data("height")||D.data("height",D.height()),pt=D.data("height"),D.data("width")||D.data("width",D.
width()),ft=D.data("width")):(pt=D.height(),ft=D.width()),v.options.dropupAuto&&v.$newElement.toggleClass(
"dropup",m>C&&lt-wt.vert<pt),v.$newElement.hasClass("dropup")&&(lt=m-wt.vert),v.options.dropdownAlignRight===
"auto"&&D.toggleClass("dropdown-menu-right",I>q&&it-wt.horiz<ft-Q),_e.length+ve.length>3?ce=nt*3+wt.
vert-2:ce=0,D.css({"max-height":lt+"px",overflow:"hidden","min-height":ce+ut+i+tt+et+"px"}),T.css({"\
max-height":lt-ut-i-tt-et-Tt.vert+"px","overflow-y":"auto","min-height":Math.max(ce-Tt.vert,0)+"px"})};
Y(),this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.get\
Size",Y),F.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize",Y)}else if(this.options.
size&&this.options.size!="auto"&&this.$lis.not(mt).length>this.options.size){var ct=this.$lis.not(".\
divider").not(mt).children().slice(0,this.options.size).last().parent().index(),$t=this.$lis.slice(0,
ct+1).filter(".divider").length;lt=nt*this.options.size+$t*at+Tt.vert,v.options.container?(D.data("h\
eight")||D.data("height",D.height()),pt=D.data("height")):pt=D.height(),v.options.dropupAuto&&this.$newElement.
toggleClass("dropup",m>C&&lt-wt.vert<pt),D.css({"max-height":lt+ut+i+tt+et+"px",overflow:"hidden","m\
in-height":""}),T.css({"max-height":lt-Tt.vert+"px","overflow-y":"auto","min-height":""})}}},setWidth:function(){
if(this.options.width==="auto"){this.$menu.css("min-width","0");var v=this.$menu.parent().clone().appendTo(
"body"),D=this.options.container?this.$newElement.clone().appendTo("body"):v,T=v.children(".dropdown\
-menu").outerWidth(),F=D.css("width","auto").children("button").outerWidth();v.remove(),D.remove(),this.
$newElement.css("width",Math.max(T,F)+"px")}else this.options.width==="fit"?(this.$menu.css("min-wid\
th",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("\
min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.
$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&this.options.width!=="fit"&&this.
$newElement.removeClass("fit-width")},selectPosition:function(){this.$bsContainer=n('<div class="bs-\
container" />');var v=this,D=n(this.options.container),T,F,z,Q=function(nt){v.$bsContainer.addClass(
nt.attr("class").replace(/form-control|fit-width/gi,"")).toggleClass("dropup",nt.hasClass("dropup")),
T=nt.offset(),D.is("body")?F={top:0,left:0}:(F=D.offset(),F.top+=parseInt(D.css("borderTopWidth"))-D.
scrollTop(),F.left+=parseInt(D.css("borderLeftWidth"))-D.scrollLeft()),z=nt.hasClass("dropup")?0:nt[0].
offsetHeight,v.$bsContainer.css({top:T.top-F.top+z,left:T.left-F.left,width:nt[0].offsetWidth})};this.
$button.on("click",function(){var nt=n(this);v.isDisabled()||(Q(v.$newElement),v.$bsContainer.appendTo(
v.options.container).toggleClass("open",!nt.hasClass("open")).append(v.$menu))}),n(window).on("resiz\
e scroll",function(){Q(v.$newElement)}),this.$element.on("hide.bs.select",function(){v.$menu.data("h\
eight",v.$menu.height()),v.$bsContainer.detach()})},setSelected:function(v,D,T){T||(this.togglePlaceholder(),
T=this.findLis().eq(this.liObj[v])),T.toggleClass("selected",D).find("a").attr("aria-selected",D)},setDisabled:function(v,D,T){
T||(T=this.findLis().eq(this.liObj[v])),D?T.addClass("disabled").children("a").attr("href","#").attr(
"tabindex",-1).attr("aria-disabled",!0):T.removeClass("disabled").children("a").removeAttr("href").attr(
"tabindex",0).attr("aria-disabled",!1)},isDisabled:function(){return this.$element[0].disabled},checkDisabled:function(){
var v=this;this.isDisabled()?(this.$newElement.addClass("disabled"),this.$button.addClass("disabled").
attr("tabindex",-1).attr("aria-disabled",!0)):(this.$button.hasClass("disabled")&&(this.$newElement.
removeClass("disabled"),this.$button.removeClass("disabled").attr("aria-disabled",!1)),this.$button.
attr("tabindex")==-1&&!this.$element.data("tabindex")&&this.$button.removeAttr("tabindex")),this.$button.
click(function(){return!v.isDisabled()})},togglePlaceholder:function(){var v=this.$element.val();this.
$button.toggleClass("bs-placeholder",v===null||v===""||v.constructor===Array&&v.length===0)},tabIndex:function(){
this.$element.data("tabindex")!==this.$element.attr("tabindex")&&this.$element.attr("tabindex")!==-98&&
this.$element.attr("tabindex")!=="-98"&&(this.$element.data("tabindex",this.$element.attr("tabindex")),
this.$button.attr("tabindex",this.$element.data("tabindex"))),this.$element.attr("tabindex",-98)},clickListener:function(){
var v=this,D=n(document);D.data("spaceSelect",!1),this.$button.on("keyup",function(T){/(32)/.test(T.
keyCode.toString(10))&&D.data("spaceSelect")&&(T.preventDefault(),D.data("spaceSelect",!1))}),this.$button.
on("click",function(){v.setSize()}),this.$element.on("shown.bs.select",function(){if(!v.options.liveSearch&&
!v.multiple)v.$menuInner.find(".selected a").focus();else if(!v.multiple){var T=v.liObj[v.$element[0].
selectedIndex];if(typeof T!="number"||v.options.size===!1)return;var F=v.$lis.eq(T)[0].offsetTop-v.$menuInner[0].
offsetTop;F=F-v.$menuInner[0].offsetHeight/2+v.sizeInfo.liHeight/2,v.$menuInner[0].scrollTop=F}}),this.
$menuInner.on("click","li a",function(T){var F=n(this),z=F.parent().data("originalIndex"),Q=v.$element.
val(),nt=v.$element.prop("selectedIndex"),ut=!0;if(v.multiple&&v.options.maxOptions!==1&&T.stopPropagation(),
T.preventDefault(),!v.isDisabled()&&!F.parent().hasClass("disabled")){var i=v.$element.find("option"),
tt=i.eq(z),et=tt.prop("selected"),at=tt.parent("optgroup"),Tt=v.options.maxOptions,wt=at.data("maxOp\
tions")||!1;if(!v.multiple)i.prop("selected",!1),tt.prop("selected",!0),v.$menuInner.find(".selected").
removeClass("selected").find("a").attr("aria-selected",!1),v.setSelected(z,!0);else if(tt.prop("sele\
cted",!et),v.setSelected(z,!et),F.blur(),Tt!==!1||wt!==!1){var mt=Tt<i.filter(":selected").length,lt=wt<
at.find("option:selected").length;if(Tt&&mt||wt&&lt)if(Tt&&Tt==1)i.prop("selected",!1),tt.prop("sele\
cted",!0),v.$menuInner.find(".selected").removeClass("selected"),v.setSelected(z,!0);else if(wt&&wt==
1){at.find("option:selected").prop("selected",!1),tt.prop("selected",!0);var it=F.parent().data("opt\
group");v.$menuInner.find('[data-optgroup="'+it+'"]').removeClass("selected"),v.setSelected(z,!0)}else{
var pt=typeof v.options.maxOptionsText=="string"?[v.options.maxOptionsText,v.options.maxOptionsText]:
v.options.maxOptionsText,ft=typeof pt=="function"?pt(Tt,wt):pt,m=ft[0].replace("{n}",Tt),C=ft[1].replace(
"{n}",wt),I=n('<div class="notify"></div>');ft[2]&&(m=m.replace("{var}",ft[2][Tt>1?0:1]),C=C.replace(
"{var}",ft[2][wt>1?0:1])),tt.prop("selected",!1),v.$menu.append(I),Tt&&mt&&(I.append(n("<div>"+m+"</\
div>")),ut=!1,v.$element.trigger("maxReached.bs.select")),wt&&lt&&(I.append(n("<div>"+C+"</div>")),ut=
!1,v.$element.trigger("maxReachedGrp.bs.select")),setTimeout(function(){v.setSelected(z,!1)},10),I.delay(
750).fadeOut(300,function(){n(this).remove()})}}!v.multiple||v.multiple&&v.options.maxOptions===1?v.
$button.focus():v.options.liveSearch&&v.$searchbox.focus(),ut&&(Q!=v.$element.val()&&v.multiple||nt!=
v.$element.prop("selectedIndex")&&!v.multiple)&&(f=[z,tt.prop("selected"),et],v.$element.triggerNative(
"change"))}}),this.$menu.on("click","li.disabled a, .popover-title, .popover-title :not(.close)",function(T){
T.currentTarget==this&&(T.preventDefault(),T.stopPropagation(),v.options.liveSearch&&!n(T.target).hasClass(
"close")?v.$searchbox.focus():v.$button.focus())}),this.$menuInner.on("click",".divider, .dropdown-h\
eader",function(T){T.preventDefault(),T.stopPropagation(),v.options.liveSearch?v.$searchbox.focus():
v.$button.focus()}),this.$menu.on("click",".popover-title .close",function(){v.$button.click()}),this.
$searchbox.on("click",function(T){T.stopPropagation()}),this.$menu.on("click",".actions-btn",function(T){
v.options.liveSearch?v.$searchbox.focus():v.$button.focus(),T.preventDefault(),T.stopPropagation(),n(
this).hasClass("bs-select-all")?v.selectAll():v.deselectAll()}),this.$element.change(function(){v.render(
!1),v.$element.trigger("changed.bs.select",f),f=null})},liveSearchListener:function(){var v=this,D=n(
'<li class="no-results"></li>');this.$button.on("click.dropdown.data-api",function(){v.$menuInner.find(
".active").removeClass("active"),v.$searchbox.val()&&(v.$searchbox.val(""),v.$lis.not(".is-hidden").
removeClass("hidden"),D.parent().length&&D.remove()),v.multiple||v.$menuInner.find(".selected").addClass(
"active"),setTimeout(function(){v.$searchbox.focus()},10)}),this.$searchbox.on("click.dropdown.data-\
api focus.dropdown.data-api touchend.dropdown.data-api",function(T){T.stopPropagation()}),this.$searchbox.
on("input propertychange",function(){if(v.$lis.not(".is-hidden").removeClass("hidden"),v.$lis.filter(
".active").removeClass("active"),D.remove(),v.$searchbox.val()){var T=v.$lis.not(".is-hidden, .divid\
er, .dropdown-header"),F;if(v.options.liveSearchNormalize?F=T.not(":a"+v._searchStyle()+'("'+o(v.$searchbox.
val())+'")'):F=T.not(":"+v._searchStyle()+'("'+v.$searchbox.val()+'")'),F.length===T.length)D.html(v.
options.noneResultsText.replace("{0}",'"'+_(v.$searchbox.val())+'"')),v.$menuInner.append(D),v.$lis.
addClass("hidden");else{F.addClass("hidden");var z=v.$lis.not(".hidden"),Q;z.each(function(nt){var ut=n(
this);ut.hasClass("divider")?Q===void 0?ut.addClass("hidden"):(Q&&Q.addClass("hidden"),Q=ut):ut.hasClass(
"dropdown-header")&&z.eq(nt+1).data("optgroup")!==ut.data("optgroup")?ut.addClass("hidden"):Q=null}),
Q&&Q.addClass("hidden"),T.not(".hidden").first().addClass("active"),v.$menuInner.scrollTop(0)}}})},_searchStyle:function(){
var v={begins:"ibegins",startsWith:"ibegins"};return v[this.options.liveSearchStyle]||"icontains"},val:function(v){
return typeof v<"u"?(this.$element.val(v),this.render(),this.$element):this.$element.val()},changeAll:function(v){
if(this.multiple){typeof v>"u"&&(v=!0),this.findLis();var D=this.$element.find("option"),T=this.$lis.
not(".divider, .dropdown-header, .disabled, .hidden"),F=T.length,z=[];if(v){if(T.filter(".selected").
length===T.length)return}else if(T.filter(".selected").length===0)return;T.toggleClass("selected",v);
for(var Q=0;Q<F;Q++){var nt=T[Q].getAttribute("data-original-index");z[z.length]=D.eq(nt)[0]}n(z).prop(
"selected",v),this.render(!1),this.togglePlaceholder(),this.$element.triggerNative("change")}},selectAll:function(){
return this.changeAll(!0)},deselectAll:function(){return this.changeAll(!1)},toggle:function(v){v=v||
window.event,v&&v.stopPropagation(),this.$button.trigger("click")},keydown:function(v){var D=n(this),
T=D.is("input")?D.parent().parent():D.parent(),F,z=T.data("this"),Q,nt,ut,i=":not(.disabled, .hidden\
, .dropdown-header, .divider)",tt={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"\
8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",
77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"\
0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};if(ut=z.$newElement.hasClass(
"open"),!ut&&(v.keyCode>=48&&v.keyCode<=57||v.keyCode>=96&&v.keyCode<=105||v.keyCode>=65&&v.keyCode<=
90)){z.options.container?z.$button.trigger("click"):(z.setSize(),z.$menu.parent().addClass("open"),ut=
!0),z.$searchbox.focus();return}if(z.options.liveSearch&&/(^9$|27)/.test(v.keyCode.toString(10))&&ut&&
(v.preventDefault(),v.stopPropagation(),z.$menuInner.click(),z.$button.focus()),/(38|40)/.test(v.keyCode.
toString(10))){if(F=z.$lis.filter(i),!F.length)return;z.options.liveSearch?Q=F.index(F.filter(".acti\
ve")):Q=F.index(F.find("a").filter(":focus").parent()),nt=z.$menuInner.data("prevIndex"),v.keyCode==
38?((z.options.liveSearch||Q==nt)&&Q!=-1&&Q--,Q<0&&(Q+=F.length)):v.keyCode==40&&((z.options.liveSearch||
Q==nt)&&Q++,Q=Q%F.length),z.$menuInner.data("prevIndex",Q),z.options.liveSearch?(v.preventDefault(),
D.hasClass("dropdown-toggle")||(F.removeClass("active").eq(Q).addClass("active").children("a").focus(),
D.focus())):F.eq(Q).children("a").focus()}else if(!D.is("input")){var et=[],at,Tt;F=z.$lis.filter(i),
F.each(function(mt){n.trim(n(this).children("a").text().toLowerCase()).substring(0,1)==tt[v.keyCode]&&
et.push(mt)}),at=n(document).data("keycount"),at++,n(document).data("keycount",at),Tt=n.trim(n(":foc\
us").text().toLowerCase()).substring(0,1),Tt!=tt[v.keyCode]?(at=1,n(document).data("keycount",at)):at>=
et.length&&(n(document).data("keycount",0),at>et.length&&(at=1)),F.eq(et[at-1]).children("a").focus()}
if((/(13|32)/.test(v.keyCode.toString(10))||/(^9$)/.test(v.keyCode.toString(10))&&z.options.selectOnTab)&&
ut){if(/(32)/.test(v.keyCode.toString(10))||v.preventDefault(),z.options.liveSearch)/(32)/.test(v.keyCode.
toString(10))||(z.$menuInner.find(".active a").click(),D.focus());else{var wt=n(":focus");wt.click(),
wt.focus(),v.preventDefault(),n(document).data("spaceSelect",!0)}n(document).data("keycount",0)}(/(^9$|27)/.
test(v.keyCode.toString(10))&&ut&&(z.multiple||z.options.liveSearch)||/(27)/.test(v.keyCode.toString(
10))&&!ut)&&(z.$menu.parent().removeClass("open"),z.options.container&&z.$newElement.removeClass("op\
en"),z.$button.focus())},mobile:function(){this.$element.addClass("mobile-device")},refresh:function(){
this.$lis=null,this.liObj={},this.reloadLi(),this.render(),this.checkDisabled(),this.liHeight(!0),this.
setStyle(),this.setWidth(),this.$lis&&this.$searchbox.trigger("propertychange"),this.$element.trigger(
"refreshed.bs.select")},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},
remove:function(){this.$newElement.remove(),this.$element.remove()},destroy:function(){this.$newElement.
before(this.$element).remove(),this.$bsContainer?this.$bsContainer.remove():this.$menu.remove(),this.
$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")}};
function X(v){var D=arguments,T=v;[].shift.apply(D);var F,z=this.each(function(){var Q=n(this);if(Q.
is("select")){var nt=Q.data("selectpicker"),ut=typeof T=="object"&&T;if(nt){if(ut)for(var tt in ut)ut.
hasOwnProperty(tt)&&(nt.options[tt]=ut[tt])}else{var i=n.extend({},$.DEFAULTS,n.fn.selectpicker.defaults||
{},Q.data(),ut);i.template=n.extend({},$.DEFAULTS.template,n.fn.selectpicker.defaults?n.fn.selectpicker.
defaults.template:{},Q.data().template,ut.template),Q.data("selectpicker",nt=new $(this,i))}typeof T==
"string"&&(nt[T]instanceof Function?F=nt[T].apply(nt,D):F=nt.options[T])}});return typeof F<"u"?F:z}
var W=n.fn.selectpicker;n.fn.selectpicker=X,n.fn.selectpicker.Constructor=$,n.fn.selectpicker.noConflict=
function(){return n.fn.selectpicker=W,this},n(document).data("keycount",0).on("keydown.bs.select",'.\
bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input',$.
prototype.keydown).on("focusin.modal",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [\
role="listbox"], .bs-searchbox input',function(v){v.stopPropagation()}),n(window).on("load.bs.select\
.data-api",function(){n(".selectpicker").each(function(){var v=n(this);X.call(v,v.data())})})})(e)})});var Zl=Kt((rd,Yl)=>{Yl.exports=function(n){var a=String.prototype.split,f=/()??/.exec("")[1]===n,u;return u=
function(o,$,y){if(Object.prototype.toString.call($)!=="[object RegExp]")return a.call(o,$,y);var b=[],
_=($.ignoreCase?"i":"")+($.multiline?"m":"")+($.extended?"x":"")+($.sticky?"y":""),R=0,$=new RegExp(
$.source,_+"g"),X,W,v,D;for(o+="",f||(X=new RegExp("^"+$.source+"$(?!\\s)",_)),y=y===n?-1>>>0:y>>>0;(W=
$.exec(o))&&(v=W.index+W[0].length,!(v>R&&(b.push(o.slice(R,W.index)),!f&&W.length>1&&W[0].replace(X,
function(){for(var T=1;T<arguments.length-2;T++)arguments[T]===n&&(W[T]=n)}),W.length>1&&W.index<o.length&&
Array.prototype.push.apply(b,W.slice(1)),D=W[0].length,R=v,b.length>=y)));)$.lastIndex===W.index&&$.
lastIndex++;return R===o.length?(D||!$.test(""))&&b.push(""):b.push(o.slice(R)),b.length>y?b.slice(0,
y):b},u}()});var eu=Kt((nd,tu)=>{var ih=[].indexOf;tu.exports=function(e,n){if(ih)return e.indexOf(n);for(var a=0;a<
e.length;++a)if(e[a]===n)return a;return-1}});var nu=Kt((id,ru)=>{var ro=eu();ru.exports=sh;function sh(e){var n=e.classList;if(n)return n;var a={
add:f,remove:u,contains:o,toggle:d,toString:y,length:0,item:b};return a;function f($){var X=_();ro(X,
$)>-1||(X.push($),R(X))}function u($){var X=_(),W=ro(X,$);W!==-1&&(X.splice(W,1),R(X))}function o($){
return ro(_(),$)>-1}function d($){return o($)?(u($),!1):(f($),!0)}function y(){return e.className}function b($){
var X=_();return X[$]||null}function _(){var $=e.className;return oh($.split(" "),ah)}function R($){
var X=$.length;e.className=$.join(" "),a.length=X;for(var W=0;W<$.length;W++)a[W]=$[W];delete $[X]}}
function oh(e,n){for(var a=[],f=0;f<e.length;f++)n(e[f])&&a.push(e[f]);return a}function ah(e){return!!e}});var iu=Kt(()=>{});var uu=Kt((ad,lu)=>{var lh=Zl(),uh=nu(),ou=typeof window>"u"?iu():window,In=ou.document,fh=ou.Text;function au(){
var e=[];function n(){var a=[].slice.call(arguments),f=null;function u(o){var d;function y($){var X=lh(
$,/([\.#]?[^\s#.]+)/);/^\.|#/.test(X[1])&&(f=In.createElement("div")),su(X,function(W){var v=W.substring(
1,W.length);W&&(f?W[0]==="."?uh(f).add(v):W[0]==="#"&&f.setAttribute("id",v):f=In.createElement(W))})}
if(o!=null){if(typeof o=="string")f?f.appendChild(d=In.createTextNode(o)):y(o);else if(typeof o=="nu\
mber"||typeof o=="boolean"||o instanceof Date||o instanceof RegExp)f.appendChild(d=In.createTextNode(
o.toString()));else if(hh(o))su(o,u);else if(no(o))f.appendChild(d=o);else if(o instanceof fh)f.appendChild(
d=o);else if(typeof o=="object")for(var b in o)if(typeof o[b]=="function")/^on\w+/.test(b)?function($,X){
f.addEventListener?(f.addEventListener($.substring(2),X[$],!1),e.push(function(){f.removeEventListener(
$.substring(2),X[$],!1)})):(f.attachEvent($,X[$]),e.push(function(){f.detachEvent($,X[$])}))}(b,o):(f[b]=
o[b](),e.push(o[b](function($){f[b]=$})));else if(b==="style")if(typeof o[b]=="string")f.style.cssText=
o[b];else for(var _ in o[b])(function($,X){if(typeof X=="function")f.style.setProperty($,X()),e.push(
X(function(v){f.style.setProperty($,v)}));else var W=o[b][$].match(/(.*)\W+!important\W*$/);W?f.style.
setProperty($,W[1],"important"):f.style.setProperty($,o[b][$])})(_,o[b][_]);else if(b==="attrs")for(var R in o[b])
f.setAttribute(R,o[b][R]);else b.substr(0,5)==="data-"?f.setAttribute(b,o[b]):f[b]=o[b];else if(typeof o==
"function"){var R=o();f.appendChild(d=no(R)?R:In.createTextNode(R)),e.push(o(function(X){no(X)&&d.parentElement?
(d.parentElement.replaceChild(X,d),d=X):d.textContent=X}))}}return d}for(;a.length;)u(a.shift());return f}
return n.cleanup=function(){for(var a=0;a<e.length;a++)e[a]();e.length=0},n}var ch=lu.exports=au();ch.
context=au;function no(e){return e&&e.nodeName&&e.nodeType}function su(e,n){if(e.forEach)return e.forEach(
n);for(var a=0;a<e.length;a++)n(e[a],a)}function hh(e){return Object.prototype.toString.call(e)=="[o\
bject Array]"}});var On,io,Dn,Ei,so,fu,Je,rr,cu,oo,hu,du,ao,lo,uo,pu,gu,Ai,fo,mu,Wt=P(()=>{On="1.13.6",io=typeof self==
"object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global||Function(
"return this")()||{},Dn=Array.prototype,Ei=Object.prototype,so=typeof Symbol<"u"?Symbol.prototype:null,
fu=Dn.push,Je=Dn.slice,rr=Ei.toString,cu=Ei.hasOwnProperty,oo=typeof ArrayBuffer<"u",hu=typeof DataView<
"u",du=Array.isArray,ao=Object.keys,lo=Object.create,uo=oo&&ArrayBuffer.isView,pu=isNaN,gu=isFinite,
Ai=!{toString:null}.propertyIsEnumerable("toString"),fo=["valueOf","isPrototypeOf","toString","prope\
rtyIsEnumerable","hasOwnProperty","toLocaleString"],mu=Math.pow(2,53)-1});function Rt(e,n){return n=n==null?e.length-1:+n,function(){for(var a=Math.max(arguments.length-n,0),
f=Array(a),u=0;u<a;u++)f[u]=arguments[u+n];switch(n){case 0:return e.call(this,f);case 1:return e.call(
this,arguments[0],f);case 2:return e.call(this,arguments[0],arguments[1],f)}var o=Array(n+1);for(u=0;u<
n;u++)o[u]=arguments[u];return o[n]=f,e.apply(this,o)}}var we=P(()=>{});function ue(e){var n=typeof e;return n==="function"||n==="object"&&!!e}var hr=P(()=>{});function _i(e){return e===null}var vu=P(()=>{});function Xr(e){return e===void 0}var co=P(()=>{});function Jr(e){return e===!0||e===!1||rr.call(e)==="[object Boolean]"}var ho=P(()=>{Wt()});function Ni(e){return!!(e&&e.nodeType===1)}var yu=P(()=>{});function Ot(e){var n="[object "+e+"]";return function(a){return rr.call(a)===n}}var ie=P(()=>{Wt()});var Ar,ki=P(()=>{ie();Ar=Ot("String")});var Pn,po=P(()=>{ie();Pn=Ot("Number")});var go,xu=P(()=>{ie();go=Ot("Date")});var mo,bu=P(()=>{ie();mo=Ot("RegExp")});var vo,wu=P(()=>{ie();vo=Ot("Error")});var Rn,yo=P(()=>{ie();Rn=Ot("Symbol")});var Ln,xo=P(()=>{ie();Ln=Ot("ArrayBuffer")});var Tu,dh,Ht,ke=P(()=>{ie();Wt();Tu=Ot("Function"),dh=io.document&&io.document.childNodes;typeof/./!=
"function"&&typeof Int8Array!="object"&&typeof dh!="function"&&(Tu=function(e){return typeof e=="fun\
ction"||!1});Ht=Tu});var bo,Cu=P(()=>{ie();bo=Ot("Object")});var Ii,Gr,Yr=P(()=>{Wt();Cu();Ii=hu&&bo(new DataView(new ArrayBuffer(8))),Gr=typeof Map<"u"&&bo(new Map)});function gh(e){return e!=null&&Ht(e.getInt8)&&Ln(e.buffer)}var ph,dr,Oi=P(()=>{ie();ke();xo();Yr();ph=
Ot("DataView");dr=Ii?gh:ph});var de,pr=P(()=>{Wt();ie();de=du||Ot("Array")});function se(e,n){return e!=null&&cu.call(e,n)}var nr=P(()=>{Wt()});var wo,_r,Di=P(()=>{ie();nr();wo=Ot("Arguments");(function(){wo(arguments)||(wo=function(e){return se(
e,"callee")})})();_r=wo});function Pi(e){return!Rn(e)&&gu(e)&&!isNaN(parseFloat(e))}var Su=P(()=>{Wt();yo()});function Zr(e){return Pn(e)&&pu(e)}var To=P(()=>{Wt();po()});function tn(e){return function(){return e}}var Co=P(()=>{});function $n(e){return function(n){var a=e(n);return typeof a=="number"&&a>=0&&a<=mu}}var So=P(()=>{Wt()});function Hn(e){return function(n){return n?.[e]}}var Eo=P(()=>{});var Nr,Ri=P(()=>{Eo();Nr=Hn("byteLength")});var Eu,Au=P(()=>{So();Ri();Eu=$n(Nr)});function vh(e){return uo?uo(e)&&!dr(e):Eu(e)&&mh.test(rr.call(e))}var mh,qn,Ao=P(()=>{Wt();Oi();Co();
Au();mh=/\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;qn=oo?vh:tn(!1)});var Ft,Ie=P(()=>{Eo();Ft=Hn("length")});function yh(e){for(var n={},a=e.length,f=0;f<a;++f)n[e[f]]=!0;return{contains:function(u){return n[u]===
!0},push:function(u){return n[u]=!0,e.push(u)}}}function Mn(e,n){n=yh(n);var a=fo.length,f=e.constructor,
u=Ht(f)&&f.prototype||Ei,o="constructor";for(se(e,o)&&!n.contains(o)&&n.push(o);a--;)o=fo[a],o in e&&
e[o]!==u[o]&&!n.contains(o)&&n.push(o)}var _o=P(()=>{Wt();ke();nr()});function At(e){if(!ue(e))return[];if(ao)return ao(e);var n=[];for(var a in e)se(e,a)&&n.push(a);return Ai&&
Mn(e,n),n}var ee=P(()=>{hr();Wt();nr();_o()});function Li(e){if(e==null)return!0;var n=Ft(e);return typeof n=="number"&&(de(e)||Ar(e)||_r(e))?n===
0:Ft(At(e))===0}var _u=P(()=>{Ie();pr();ki();Di();ee()});function en(e,n){var a=At(n),f=a.length;if(e==null)return!f;for(var u=Object(e),o=0;o<f;o++){var d=a[o];
if(n[d]!==u[d]||!(d in u))return!1}return!0}var No=P(()=>{ee()});function bt(e){if(e instanceof bt)return e;if(!(this instanceof bt))return new bt(e);this._wrapped=e}
var Te=P(()=>{Wt();bt.VERSION=On;bt.prototype.value=function(){return this._wrapped};bt.prototype.valueOf=
bt.prototype.toJSON=bt.prototype.value;bt.prototype.toString=function(){return String(this._wrapped)}});function $i(e){return new Uint8Array(e.buffer||e,e.byteOffset||0,Nr(e))}var Nu=P(()=>{Ri()});function ko(e,n,a,f){if(e===n)return e!==0||1/e===1/n;if(e==null||n==null)return!1;if(e!==e)return n!==
n;var u=typeof e;return u!=="function"&&u!=="object"&&typeof n!="object"?!1:Iu(e,n,a,f)}function Iu(e,n,a,f){
e instanceof bt&&(e=e._wrapped),n instanceof bt&&(n=n._wrapped);var u=rr.call(e);if(u!==rr.call(n))return!1;
if(Ii&&u=="[object Object]"&&dr(e)){if(!dr(n))return!1;u=ku}switch(u){case"[object RegExp]":case"[ob\
ject String]":return""+e==""+n;case"[object Number]":return+e!=+e?+n!=+n:+e==0?1/+e===1/n:+e==+n;case"\
[object Date]":case"[object Boolean]":return+e==+n;case"[object Symbol]":return so.valueOf.call(e)===
so.valueOf.call(n);case"[object ArrayBuffer]":case ku:return Iu($i(e),$i(n),a,f)}var o=u==="[object \
Array]";if(!o&&qn(e)){var d=Nr(e);if(d!==Nr(n))return!1;if(e.buffer===n.buffer&&e.byteOffset===n.byteOffset)
return!0;o=!0}if(!o){if(typeof e!="object"||typeof n!="object")return!1;var y=e.constructor,b=n.constructor;
if(y!==b&&!(Ht(y)&&y instanceof y&&Ht(b)&&b instanceof b)&&"constructor"in e&&"constructor"in n)return!1}
a=a||[],f=f||[];for(var _=a.length;_--;)if(a[_]===e)return f[_]===n;if(a.push(e),f.push(n),o){if(_=e.
length,_!==n.length)return!1;for(;_--;)if(!ko(e[_],n[_],a,f))return!1}else{var R=At(e),$;if(_=R.length,
At(n).length!==_)return!1;for(;_--;)if($=R[_],!(se(n,$)&&ko(e[$],n[$],a,f)))return!1}return a.pop(),
f.pop(),!0}function Hi(e,n){return ko(e,n)}var ku,Ou=P(()=>{Te();Wt();Ri();Ao();ke();Yr();Oi();ee();
nr();Nu();ku="[object DataView]"});function He(e){if(!ue(e))return[];var n=[];for(var a in e)n.push(a);return Ai&&Mn(e,n),n}var rn=P(()=>{
hr();Wt();_o()});function nn(e){var n=Ft(e);return function(a){if(a==null)return!1;var f=He(a);if(Ft(f))return!1;for(var u=0;u<
n;u++)if(!Ht(a[e[u]]))return!1;return e!==Do||!Ht(a[Io])}}var Io,Du,Oo,Pu,Ru,Do,Lu,qi=P(()=>{Ie();ke();
rn();Io="forEach",Du="has",Oo=["clear","delete"],Pu=["get",Du,"set"],Ru=Oo.concat(Io,Pu),Do=Oo.concat(
Pu),Lu=["add"].concat(Oo,Io,Du)});var Po,$u=P(()=>{ie();Yr();qi();Po=Gr?nn(Ru):Ot("Map")});var Ro,Hu=P(()=>{ie();Yr();qi();Ro=Gr?nn(Do):Ot("WeakMap")});var Lo,qu=P(()=>{ie();Yr();qi();Lo=Gr?nn(Lu):Ot("Set")});var $o,Mu=P(()=>{ie();$o=Ot("WeakSet")});function Ce(e){for(var n=At(e),a=n.length,f=Array(a),u=0;u<a;u++)f[u]=e[n[u]];return f}var kr=P(()=>{
ee()});function Mi(e){for(var n=At(e),a=n.length,f=Array(a),u=0;u<a;u++)f[u]=[n[u],e[n[u]]];return f}var Fu=P(
()=>{ee()});function sn(e){for(var n={},a=At(e),f=0,u=a.length;f<u;f++)n[e[a[f]]]=a[f];return n}var Ho=P(()=>{ee()});function Ir(e){var n=[];for(var a in e)Ht(e[a])&&n.push(a);return n.sort()}var qo=P(()=>{ke()});function Or(e,n){return function(a){var f=arguments.length;if(n&&(a=Object(a)),f<2||a==null)return a;
for(var u=1;u<f;u++)for(var o=arguments[u],d=e(o),y=d.length,b=0;b<y;b++){var _=d[b];(!n||a[_]===void 0)&&
(a[_]=o[_])}return a}}var Fi=P(()=>{});var Fn,Mo=P(()=>{Fi();rn();Fn=Or(He)});var gr,Bi=P(()=>{Fi();ee();gr=Or(At)});var Bn,Fo=P(()=>{Fi();rn();Bn=Or(He,!0)});function xh(){return function(){}}function zn(e){if(!ue(e))return{};if(lo)return lo(e);var n=xh();n.
prototype=e;var a=new n;return n.prototype=null,a}var Bo=P(()=>{hr();Wt()});function zi(e,n){var a=zn(e);return n&&gr(a,n),a}var Bu=P(()=>{Bo();Bi()});function Wi(e){return ue(e)?de(e)?e.slice():Fn({},e):e}var zu=P(()=>{hr();pr();Mo()});function Ui(e,n){return n(e),e}var Wu=P(()=>{});function Wn(e){return de(e)?e:[e]}var zo=P(()=>{Te();pr();bt.toPath=Wn});function Be(e){return bt.toPath(e)}var on=P(()=>{Te();zo()});function Dr(e,n){for(var a=n.length,f=0;f<a;f++){if(e==null)return;e=e[n[f]]}return a?e:void 0}var ji=P(
()=>{});function an(e,n,a){var f=Dr(e,Be(n));return Xr(f)?a:f}var Wo=P(()=>{on();ji();co()});function Vi(e,n){n=Be(n);for(var a=n.length,f=0;f<a;f++){var u=n[f];if(!se(e,u))return!1;e=e[u]}return!!a}
var Uu=P(()=>{nr();on()});function mr(e){return e}var Qi=P(()=>{});function ze(e){return e=gr({},e),function(n){return en(n,e)}}var Un=P(()=>{Bi();No()});function vr(e){return e=Be(e),function(n){return Dr(n,e)}}var Ki=P(()=>{ji();on()});function We(e,n,a){if(n===void 0)return e;switch(a??3){case 1:return function(f){return e.call(n,f)};case 3:
return function(f,u,o){return e.call(n,f,u,o)};case 4:return function(f,u,o,d){return e.call(n,f,u,o,
d)}}return function(){return e.apply(n,arguments)}}var ln=P(()=>{});function jn(e,n,a){return e==null?mr:Ht(e)?We(e,n,a):ue(e)&&!de(e)?ze(e):vr(e)}var Uo=P(()=>{Qi();ke();
hr();pr();Un();Ki();ln()});function Pr(e,n){return jn(e,n,1/0)}var jo=P(()=>{Te();Uo();bt.iteratee=Pr});function Lt(e,n,a){return bt.iteratee!==Pr?bt.iteratee(e,n):jn(e,n,a)}var pe=P(()=>{Te();Uo();jo()});function Xi(e,n,a){n=Lt(n,a);for(var f=At(e),u=f.length,o={},d=0;d<u;d++){var y=f[d];o[y]=n(e[y],y,e)}
return o}var ju=P(()=>{pe();ee()});function un(){}var Vo=P(()=>{});function Ji(e){return e==null?un:function(n){return an(e,n)}}var Vu=P(()=>{Vo();Wo()});function Gi(e,n,a){var f=Array(Math.max(0,e));n=We(n,a,1);for(var u=0;u<e;u++)f[u]=n(u);return f}var Qu=P(
()=>{ln()});function Rr(e,n){return n==null&&(n=e,e=0),e+Math.floor(Math.random()*(n-e+1))}var Qo=P(()=>{});var ir,Yi=P(()=>{ir=Date.now||function(){return new Date().getTime()}});function Vn(e){var n=function(o){return e[o]},a="(?:"+At(e).join("|")+")",f=RegExp(a),u=RegExp(a,"g");
return function(o){return o=o==null?"":""+o,f.test(o)?o.replace(u,n):o}}var Ko=P(()=>{ee()});var Zi,Xo=P(()=>{Zi={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"}});var Jo,Ku=P(()=>{Ko();Xo();Jo=Vn(Zi)});var Xu,Ju=P(()=>{Ho();Xo();Xu=sn(Zi)});var Go,Gu=P(()=>{Ko();Ju();Go=Vn(Xu)});var Yo,Zo=P(()=>{Te();Yo=bt.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g}});function Th(e){return"\\"+bh[e]}function ts(e,n,a){!n&&a&&(n=a),n=Bn({},n,bt.templateSettings);var f=RegExp(
[(n.escape||ta).source,(n.interpolate||ta).source,(n.evaluate||ta).source].join("|")+"|$","g"),u=0,o="\
__p+='";e.replace(f,function(_,R,$,X,W){return o+=e.slice(u,W).replace(wh,Th),u=W+_.length,R?o+=`'+
((__t=(`+R+`))==null?'':_.escape(__t))+
'`:$?o+=`'+
((__t=(`+$+`))==null?'':__t)+
'`:X&&(o+=`';
`+X+`
__p+='`),_}),o+=`';
`;var d=n.variable;if(d){if(!Ch.test(d))throw new Error("variable is not a bare identifier: "+d)}else
o=`with(obj||{}){
`+o+`}
`,d="obj";o=`var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\

`+o+`return __p;
`;var y;try{y=new Function(d,"_",o)}catch(_){throw _.source=o,_}var b=function(_){return y.call(this,
_,bt)};return b.source="function("+d+`){
`+o+"}",b}var ta,bh,wh,Ch,Yu=P(()=>{Fo();Te();Zo();ta=/(.)^/,bh={"'":"'","\\":"\\","\r":"r","\n":"n",
"\u2028":"u2028","\u2029":"u2029"},wh=/\\|'|\r|\n|\u2028|\u2029/g;Ch=/^\s*(\w|\$)+\s*$/});function es(e,n,a){n=Be(n);var f=n.length;if(!f)return Ht(a)?a.call(e):a;for(var u=0;u<f;u++){var o=e?.[n[u]];
o===void 0&&(o=a,u=f),e=Ht(o)?o.call(e):o}return e}var Zu=P(()=>{ke();on()});function rs(e){var n=++Sh+"";return e?e+n:n}var Sh,tf=P(()=>{Sh=0});function ns(e){var n=bt(e);return n._chain=!0,n}var ef=P(()=>{Te()});function Qn(e,n,a,f,u){if(!(f instanceof n))return e.apply(a,u);var o=zn(e.prototype),d=e.apply(o,u);
return ue(d)?d:o}var ea=P(()=>{Bo();hr()});var ra,sr,Kn=P(()=>{we();ea();Te();ra=Rt(function(e,n){var a=ra.placeholder,f=function(){for(var u=0,
o=n.length,d=Array(o),y=0;y<o;y++)d[y]=n[y]===a?arguments[u++]:n[y];for(;u<arguments.length;)d.push(
arguments[u++]);return Qn(e,f,this,this,d)};return f});ra.placeholder=bt;sr=ra});var Xn,na=P(()=>{we();ke();ea();Xn=Rt(function(e,n,a){if(!Ht(e))throw new TypeError("Bind must be ca\
lled on a function");var f=Rt(function(u){return Qn(e,f,n,this,a.concat(u))});return f})});var Bt,Se=P(()=>{So();Ie();Bt=$n(Ft)});function Ee(e,n,a,f){if(f=f||[],!n&&n!==0)n=1/0;else if(n<=0)return f.concat(e);for(var u=f.length,o=0,
d=Ft(e);o<d;o++){var y=e[o];if(Bt(y)&&(de(y)||_r(y)))if(n>1)Ee(y,n-1,a,f),u=f.length;else for(var b=0,
_=y.length;b<_;)f[u++]=y[b++];else a||(f[u++]=y)}return f}var Lr=P(()=>{Ie();Se();pr();Di()});var ia,rf=P(()=>{we();Lr();na();ia=Rt(function(e,n){n=Ee(n,!1,!1);var a=n.length;if(a<1)throw new Error(
"bindAll must be passed function names");for(;a--;){var f=n[a];e[f]=Xn(e[f],e)}return e})});function is(e,n){var a=function(f){var u=a.cache,o=""+(n?n.apply(this,arguments):f);return se(u,o)||
(u[o]=e.apply(this,arguments)),u[o]};return a.cache={},a}var nf=P(()=>{nr()});var Jn,sa=P(()=>{we();Jn=Rt(function(e,n,a){return setTimeout(function(){return e.apply(null,a)},n)})});var oa,sf=P(()=>{Kn();sa();Te();oa=sr(Jn,bt,1)});function ss(e,n,a){var f,u,o,d,y=0;a||(a={});var b=function(){y=a.leading===!1?0:ir(),f=null,d=e.apply(
u,o),f||(u=o=null)},_=function(){var R=ir();!y&&a.leading===!1&&(y=R);var $=n-(R-y);return u=this,o=
arguments,$<=0||$>n?(f&&(clearTimeout(f),f=null),y=R,d=e.apply(u,o),f||(u=o=null)):!f&&a.trailing!==
!1&&(f=setTimeout(b,$)),d};return _.cancel=function(){clearTimeout(f),y=0,f=u=o=null},_}var of=P(()=>{
Yi()});function os(e,n,a){var f,u,o,d,y,b=function(){var R=ir()-u;n>R?f=setTimeout(b,n-R):(f=null,a||(d=e.apply(
y,o)),f||(o=y=null))},_=Rt(function(R){return y=this,o=R,u=ir(),f||(f=setTimeout(b,n),a&&(d=e.apply(
y,o))),d});return _.cancel=function(){clearTimeout(f),f=o=y=null},_}var af=P(()=>{we();Yi()});function as(e,n){return sr(n,e)}var lf=P(()=>{Kn()});function yr(e){return function(){return!e.apply(this,arguments)}}var ls=P(()=>{});function us(){var e=arguments,n=e.length-1;return function(){for(var a=n,f=e[n].apply(this,arguments);a--;)
f=e[a].call(this,f);return f}}var uf=P(()=>{});function fs(e,n){return function(){if(--e<1)return n.apply(this,arguments)}}var ff=P(()=>{});function fn(e,n){var a;return function(){return--e>0&&(a=n.apply(this,arguments)),e<=1&&(n=null),a}}
var aa=P(()=>{});var la,cf=P(()=>{Kn();aa();la=sr(fn,2)});function cn(e,n,a){n=Lt(n,a);for(var f=At(e),u,o=0,d=f.length;o<d;o++)if(u=f[o],n(e[u],u,e))return u}
var ua=P(()=>{pe();ee()});function Gn(e){return function(n,a,f){a=Lt(a,f);for(var u=Ft(n),o=e>0?0:u-1;o>=0&&o<u;o+=e)if(a(n[o],
o,n))return o;return-1}}var fa=P(()=>{pe();Ie()});var $r,cs=P(()=>{fa();$r=Gn(1)});var Yn,ca=P(()=>{fa();Yn=Gn(-1)});function hn(e,n,a,f){a=Lt(a,f,1);for(var u=a(n),o=0,d=Ft(e);o<d;){var y=Math.floor((o+d)/2);a(e[y])<
u?o=y+1:d=y}return o}var ha=P(()=>{pe();Ie()});function Zn(e,n,a){return function(f,u,o){var d=0,y=Ft(f);if(typeof o=="number")e>0?d=o>=0?o:Math.max(
o+y,d):y=o>=0?Math.min(o+1,y):o+y+1;else if(a&&o&&y)return o=a(f,u),f[o]===u?o:-1;if(u!==u)return o=
n(Je.call(f,d,y),Zr),o>=0?o+d:-1;for(o=e>0?d:y-1;o>=0&&o<y;o+=e)if(f[o]===u)return o;return-1}}var da=P(
()=>{Ie();Wt();To()});var ti,pa=P(()=>{ha();cs();da();ti=Zn(1,$r,hn)});var ga,hf=P(()=>{ca();da();ga=Zn(-1,Yn)});function Hr(e,n,a){var f=Bt(e)?$r:cn,u=f(e,n,a);if(u!==void 0&&u!==-1)return e[u]}var ma=P(()=>{Se();
cs();ua()});function hs(e,n){return Hr(e,ze(n))}var df=P(()=>{ma();Un()});function re(e,n,a){n=We(n,a);var f,u;if(Bt(e))for(f=0,u=e.length;f<u;f++)n(e[f],f,e);else{var o=At(e);
for(f=0,u=o.length;f<u;f++)n(e[o[f]],o[f],e)}return e}var xr=P(()=>{ln();Se();ee()});function ge(e,n,a){n=Lt(n,a);for(var f=!Bt(e)&&At(e),u=(f||e).length,o=Array(u),d=0;d<u;d++){var y=f?
f[d]:d;o[d]=n(e[y],y,e)}return o}var qr=P(()=>{pe();Se();ee()});function ei(e){var n=function(a,f,u,o){var d=!Bt(a)&&At(a),y=(d||a).length,b=e>0?0:y-1;for(o||(u=a[d?
d[b]:b],b+=e);b>=0&&b<y;b+=e){var _=d?d[b]:b;u=f(u,a[_],_,a)}return u};return function(a,f,u,o){var d=arguments.
length>=3;return n(a,We(f,o,4),u,d)}}var va=P(()=>{Se();ee();ln()});var ri,pf=P(()=>{va();ri=ei(1)});var ds,gf=P(()=>{va();ds=ei(-1)});function Oe(e,n,a){var f=[];return n=Lt(n,a),re(e,function(u,o,d){n(u,o,d)&&f.push(u)}),f}var dn=P(()=>{
pe();xr()});function ps(e,n,a){return Oe(e,yr(Lt(n)),a)}var mf=P(()=>{dn();ls();pe()});function ni(e,n,a){n=Lt(n,a);for(var f=!Bt(e)&&At(e),u=(f||e).length,o=0;o<u;o++){var d=f?f[o]:o;if(!n(
e[d],d,e))return!1}return!0}var vf=P(()=>{pe();Se();ee()});function ii(e,n,a){n=Lt(n,a);for(var f=!Bt(e)&&At(e),u=(f||e).length,o=0;o<u;o++){var d=f?f[o]:o;if(n(
e[d],d,e))return!0}return!1}var yf=P(()=>{pe();Se();ee()});function fe(e,n,a,f){return Bt(e)||(e=Ce(e)),(typeof a!="number"||f)&&(a=0),ti(e,n,a)>=0}var pn=P(()=>{
Se();kr();pa()});var ya,xf=P(()=>{we();ke();qr();ji();on();ya=Rt(function(e,n,a){var f,u;return Ht(n)?u=n:(n=Be(n),f=
n.slice(0,-1),n=n[n.length-1]),ge(e,function(o){var d=u;if(!d){if(f&&f.length&&(o=Dr(o,f)),o==null)return;
d=o[n]}return d==null?d:d.apply(o,a)})})});function br(e,n){return ge(e,vr(n))}var gs=P(()=>{qr();Ki()});function ms(e,n){return Oe(e,ze(n))}var bf=P(()=>{dn();Un()});function gn(e,n,a){var f=-1/0,u=-1/0,o,d;if(n==null||typeof n=="number"&&typeof e[0]!="object"&&e!=null){
e=Bt(e)?e:Ce(e);for(var y=0,b=e.length;y<b;y++)o=e[y],o!=null&&o>f&&(f=o)}else n=Lt(n,a),re(e,function(_,R,$){
d=n(_,R,$),(d>u||d===-1/0&&f===-1/0)&&(f=_,u=d)});return f}var xa=P(()=>{Se();kr();pe();xr()});function vs(e,n,a){var f=1/0,u=1/0,o,d;if(n==null||typeof n=="number"&&typeof e[0]!="object"&&e!=null){
e=Bt(e)?e:Ce(e);for(var y=0,b=e.length;y<b;y++)o=e[y],o!=null&&o<f&&(f=o)}else n=Lt(n,a),re(e,function(_,R,$){
d=n(_,R,$),(d<u||d===1/0&&f===1/0)&&(f=_,u=d)});return f}var wf=P(()=>{Se();kr();pe();xr()});function mn(e){return e?de(e)?Je.call(e):Ar(e)?e.match(Eh):Bt(e)?ge(e,mr):Ce(e):[]}var Eh,ba=P(()=>{
pr();Wt();ki();Se();qr();Qi();kr();Eh=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g});function vn(e,n,a){if(n==null||a)return Bt(e)||(e=Ce(e)),e[Rr(e.length-1)];var f=mn(e),u=Ft(f);n=Math.
max(Math.min(n,u),0);for(var o=u-1,d=0;d<n;d++){var y=Rr(d,o),b=f[d];f[d]=f[y],f[y]=b}return f.slice(
0,n)}var wa=P(()=>{Se();kr();Ie();Qo();ba()});function ys(e){return vn(e,1/0)}var Tf=P(()=>{wa()});function xs(e,n,a){var f=0;return n=Lt(n,a),br(ge(e,function(u,o,d){return{value:u,index:f++,criteria:n(
u,o,d)}}).sort(function(u,o){var d=u.criteria,y=o.criteria;if(d!==y){if(d>y||d===void 0)return 1;if(d<
y||y===void 0)return-1}return u.index-o.index}),"value")}var Cf=P(()=>{pe();gs();qr()});function or(e,n){return function(a,f,u){var o=n?[[],[]]:{};return f=Lt(f,u),re(a,function(d,y){var b=f(
d,y,a);e(o,d,b)}),o}}var si=P(()=>{pe();xr()});var Ta,Sf=P(()=>{si();nr();Ta=or(function(e,n,a){se(e,a)?e[a].push(n):e[a]=[n]})});var Ca,Ef=P(()=>{si();Ca=or(function(e,n,a){e[a]=n})});var Sa,Af=P(()=>{si();nr();Sa=or(function(e,n,a){se(e,a)?e[a]++:e[a]=1})});var Ea,_f=P(()=>{si();Ea=or(function(e,n,a){e[a?0:1].push(n)},!0)});function bs(e){return e==null?0:Bt(e)?e.length:At(e).length}var Nf=P(()=>{Se();ee()});function Aa(e,n,a){return n in a}var kf=P(()=>{});var oi,_a=P(()=>{we();ke();ln();rn();kf();Lr();oi=Rt(function(e,n){var a={},f=n[0];if(e==null)return a;
Ht(f)?(n.length>1&&(f=We(f,n[1])),n=He(e)):(f=Aa,n=Ee(n,!1,!1),e=Object(e));for(var u=0,o=n.length;u<
o;u++){var d=n[u],y=e[d];f(y,d,e)&&(a[d]=y)}return a})});var Na,If=P(()=>{we();ke();ls();qr();Lr();pn();_a();Na=Rt(function(e,n){var a=n[0],f;return Ht(a)?(a=
yr(a),n.length>1&&(f=n[1])):(n=ge(Ee(n,!1,!1),String),a=function(u,o){return!fe(n,o)}),oi(e,a,f)})});function yn(e,n,a){return Je.call(e,0,Math.max(0,e.length-(n==null||a?1:n)))}var ka=P(()=>{Wt()});function xn(e,n,a){return e==null||e.length<1?n==null||a?void 0:[]:n==null||a?e[0]:yn(e,e.length-n)}
var Of=P(()=>{ka()});function wr(e,n,a){return Je.call(e,n==null||a?1:n)}var Ia=P(()=>{Wt()});function ws(e,n,a){return e==null||e.length<1?n==null||a?void 0:[]:n==null||a?e[e.length-1]:wr(e,Math.
max(0,e.length-n))}var Df=P(()=>{Ia()});function Ts(e){return Oe(e,Boolean)}var Pf=P(()=>{dn()});function Cs(e,n){return Ee(e,n,!1)}var Rf=P(()=>{Lr()});var ai,Oa=P(()=>{we();Lr();dn();pn();ai=Rt(function(e,n){return n=Ee(n,!0,!0),Oe(e,function(a){return!fe(
n,a)})})});var Da,Lf=P(()=>{we();Oa();Da=Rt(function(e,n){return ai(e,n)})});function Mr(e,n,a,f){Jr(n)||(f=a,a=n,n=!1),a!=null&&(a=Lt(a,f));for(var u=[],o=[],d=0,y=Ft(e);d<y;d++){
var b=e[d],_=a?a(b,d,e):b;n&&!a?((!d||o!==_)&&u.push(b),o=_):a?fe(o,_)||(o.push(_),u.push(b)):fe(u,b)||
u.push(b)}return u}var Pa=P(()=>{ho();pe();Ie();pn()});var Ra,$f=P(()=>{we();Pa();Lr();Ra=Rt(function(e){return Mr(Ee(e,!0,!0))})});function Ss(e){for(var n=[],a=arguments.length,f=0,u=Ft(e);f<u;f++){var o=e[f];if(!fe(n,o)){var d;for(d=
1;d<a&&fe(arguments[d],o);d++);d===a&&n.push(o)}}return n}var Hf=P(()=>{Ie();pn()});function Fr(e){for(var n=e&&gn(e,Ft).length||0,a=Array(n),f=0;f<n;f++)a[f]=br(e,f);return a}var La=P(
()=>{xa();Ie();gs()});var $a,qf=P(()=>{we();La();$a=Rt(Fr)});function Es(e,n){for(var a={},f=0,u=Ft(e);f<u;f++)n?a[e[f]]=n[f]:a[e[f][0]]=e[f][1];return a}var Mf=P(
()=>{Ie()});function As(e,n,a){n==null&&(n=e||0,e=0),a||(a=n<e?-1:1);for(var f=Math.max(Math.ceil((n-e)/a),0),u=Array(
f),o=0;o<f;o++,e+=a)u[o]=e;return u}var Ff=P(()=>{});function _s(e,n){if(n==null||n<1)return[];for(var a=[],f=0,u=e.length;f<u;)a.push(Je.call(e,f,f+=n));
return a}var Bf=P(()=>{Wt()});function bn(e,n){return e._chain?bt(n).chain():n}var Ha=P(()=>{Te()});function wn(e){return re(Ir(e),function(n){var a=bt[n]=e[n];bt.prototype[n]=function(){var f=[this._wrapped];
return fu.apply(f,arguments),bn(this,a.apply(bt,f))}}),bt}var zf=P(()=>{Te();xr();qo();Wt();Ha()});var Wf,Uf=P(()=>{Te();xr();Wt();Ha();re(["pop","push","reverse","shift","sort","splice","unshift"],function(e){
var n=Dn[e];bt.prototype[e]=function(){var a=this._wrapped;return a!=null&&(n.apply(a,arguments),(e===
"shift"||e==="splice")&&a.length===0&&delete a[0]),bn(this,a)}});re(["concat","join","slice"],function(e){
var n=Dn[e];bt.prototype[e]=function(){var a=this._wrapped;return a!=null&&(a=n.apply(a,arguments)),
bn(this,a)}});Wf=bt});var qa={};wi(qa,{VERSION:()=>On,after:()=>fs,all:()=>ni,allKeys:()=>He,any:()=>ii,assign:()=>gr,before:()=>fn,
bind:()=>Xn,bindAll:()=>ia,chain:()=>ns,chunk:()=>_s,clone:()=>Wi,collect:()=>ge,compact:()=>Ts,compose:()=>us,
constant:()=>tn,contains:()=>fe,countBy:()=>Sa,create:()=>zi,debounce:()=>os,default:()=>Wf,defaults:()=>Bn,
defer:()=>oa,delay:()=>Jn,detect:()=>Hr,difference:()=>ai,drop:()=>wr,each:()=>re,escape:()=>Jo,every:()=>ni,
extend:()=>Fn,extendOwn:()=>gr,filter:()=>Oe,find:()=>Hr,findIndex:()=>$r,findKey:()=>cn,findLastIndex:()=>Yn,
findWhere:()=>hs,first:()=>xn,flatten:()=>Cs,foldl:()=>ri,foldr:()=>ds,forEach:()=>re,functions:()=>Ir,
get:()=>an,groupBy:()=>Ta,has:()=>Vi,head:()=>xn,identity:()=>mr,include:()=>fe,includes:()=>fe,indexBy:()=>Ca,
indexOf:()=>ti,initial:()=>yn,inject:()=>ri,intersection:()=>Ss,invert:()=>sn,invoke:()=>ya,isArguments:()=>_r,
isArray:()=>de,isArrayBuffer:()=>Ln,isBoolean:()=>Jr,isDataView:()=>dr,isDate:()=>go,isElement:()=>Ni,
isEmpty:()=>Li,isEqual:()=>Hi,isError:()=>vo,isFinite:()=>Pi,isFunction:()=>Ht,isMap:()=>Po,isMatch:()=>en,
isNaN:()=>Zr,isNull:()=>_i,isNumber:()=>Pn,isObject:()=>ue,isRegExp:()=>mo,isSet:()=>Lo,isString:()=>Ar,
isSymbol:()=>Rn,isTypedArray:()=>qn,isUndefined:()=>Xr,isWeakMap:()=>Ro,isWeakSet:()=>$o,iteratee:()=>Pr,
keys:()=>At,last:()=>ws,lastIndexOf:()=>ga,map:()=>ge,mapObject:()=>Xi,matcher:()=>ze,matches:()=>ze,
max:()=>gn,memoize:()=>is,methods:()=>Ir,min:()=>vs,mixin:()=>wn,negate:()=>yr,noop:()=>un,now:()=>ir,
object:()=>Es,omit:()=>Na,once:()=>la,pairs:()=>Mi,partial:()=>sr,partition:()=>Ea,pick:()=>oi,pluck:()=>br,
property:()=>vr,propertyOf:()=>Ji,random:()=>Rr,range:()=>As,reduce:()=>ri,reduceRight:()=>ds,reject:()=>ps,
rest:()=>wr,restArguments:()=>Rt,result:()=>es,sample:()=>vn,select:()=>Oe,shuffle:()=>ys,size:()=>bs,
some:()=>ii,sortBy:()=>xs,sortedIndex:()=>hn,tail:()=>wr,take:()=>xn,tap:()=>Ui,template:()=>ts,templateSettings:()=>Yo,
throttle:()=>ss,times:()=>Gi,toArray:()=>mn,toPath:()=>Wn,transpose:()=>Fr,unescape:()=>Go,union:()=>Ra,
uniq:()=>Mr,unique:()=>Mr,uniqueId:()=>rs,unzip:()=>Fr,values:()=>Ce,where:()=>ms,without:()=>Da,wrap:()=>as,
zip:()=>$a});var Ns=P(()=>{Wt();we();hr();vu();co();ho();yu();ki();po();xu();bu();wu();yo();xo();Oi();
pr();ke();Di();Su();To();Ao();_u();No();Ou();$u();Hu();qu();Mu();ee();rn();kr();Fu();Ho();qo();Mo();
Bi();Fo();Bu();zu();Wu();Wo();Uu();ju();Qi();Co();Vo();zo();Ki();Vu();Un();Qu();Qo();Yi();Ku();Gu();
Zo();Yu();Zu();tf();ef();jo();Kn();na();rf();nf();sa();sf();of();af();lf();ls();uf();ff();aa();cf();
ua();cs();ca();ha();pa();hf();ma();df();xr();qr();pf();gf();dn();mf();vf();yf();pn();xf();gs();bf();
xa();wf();Tf();wa();Cf();Sf();Ef();Af();_f();ba();Nf();_a();If();Of();ka();Df();Ia();Pf();Rf();Lf();
Pa();$f();Hf();Oa();La();qf();Mf();Ff();Bf();zf();Uf()});var Ma,jf,Vf=P(()=>{Ns();Ns();Ma=wn(qa);Ma._=Ma;jf=Ma});var Qf={};wi(Qf,{VERSION:()=>On,after:()=>fs,all:()=>ni,allKeys:()=>He,any:()=>ii,assign:()=>gr,before:()=>fn,
bind:()=>Xn,bindAll:()=>ia,chain:()=>ns,chunk:()=>_s,clone:()=>Wi,collect:()=>ge,compact:()=>Ts,compose:()=>us,
constant:()=>tn,contains:()=>fe,countBy:()=>Sa,create:()=>zi,debounce:()=>os,default:()=>jf,defaults:()=>Bn,
defer:()=>oa,delay:()=>Jn,detect:()=>Hr,difference:()=>ai,drop:()=>wr,each:()=>re,escape:()=>Jo,every:()=>ni,
extend:()=>Fn,extendOwn:()=>gr,filter:()=>Oe,find:()=>Hr,findIndex:()=>$r,findKey:()=>cn,findLastIndex:()=>Yn,
findWhere:()=>hs,first:()=>xn,flatten:()=>Cs,foldl:()=>ri,foldr:()=>ds,forEach:()=>re,functions:()=>Ir,
get:()=>an,groupBy:()=>Ta,has:()=>Vi,head:()=>xn,identity:()=>mr,include:()=>fe,includes:()=>fe,indexBy:()=>Ca,
indexOf:()=>ti,initial:()=>yn,inject:()=>ri,intersection:()=>Ss,invert:()=>sn,invoke:()=>ya,isArguments:()=>_r,
isArray:()=>de,isArrayBuffer:()=>Ln,isBoolean:()=>Jr,isDataView:()=>dr,isDate:()=>go,isElement:()=>Ni,
isEmpty:()=>Li,isEqual:()=>Hi,isError:()=>vo,isFinite:()=>Pi,isFunction:()=>Ht,isMap:()=>Po,isMatch:()=>en,
isNaN:()=>Zr,isNull:()=>_i,isNumber:()=>Pn,isObject:()=>ue,isRegExp:()=>mo,isSet:()=>Lo,isString:()=>Ar,
isSymbol:()=>Rn,isTypedArray:()=>qn,isUndefined:()=>Xr,isWeakMap:()=>Ro,isWeakSet:()=>$o,iteratee:()=>Pr,
keys:()=>At,last:()=>ws,lastIndexOf:()=>ga,map:()=>ge,mapObject:()=>Xi,matcher:()=>ze,matches:()=>ze,
max:()=>gn,memoize:()=>is,methods:()=>Ir,min:()=>vs,mixin:()=>wn,negate:()=>yr,noop:()=>un,now:()=>ir,
object:()=>Es,omit:()=>Na,once:()=>la,pairs:()=>Mi,partial:()=>sr,partition:()=>Ea,pick:()=>oi,pluck:()=>br,
property:()=>vr,propertyOf:()=>Ji,random:()=>Rr,range:()=>As,reduce:()=>ri,reduceRight:()=>ds,reject:()=>ps,
rest:()=>wr,restArguments:()=>Rt,result:()=>es,sample:()=>vn,select:()=>Oe,shuffle:()=>ys,size:()=>bs,
some:()=>ii,sortBy:()=>xs,sortedIndex:()=>hn,tail:()=>wr,take:()=>xn,tap:()=>Ui,template:()=>ts,templateSettings:()=>Yo,
throttle:()=>ss,times:()=>Gi,toArray:()=>mn,toPath:()=>Wn,transpose:()=>Fr,unescape:()=>Go,union:()=>Ra,
uniq:()=>Mr,unique:()=>Mr,uniqueId:()=>rs,unzip:()=>Fr,values:()=>Ce,where:()=>ms,without:()=>Da,wrap:()=>as,
zip:()=>$a});var Kf=P(()=>{Vf();Ns()});var Xf=Kt(Fa=>{(function(e){var n=typeof self=="object"&&self.self===self&&self||typeof global=="obj\
ect"&&global.global===global&&global;if(typeof define=="function"&&define.amd)define(["underscore","\
jquery","exports"],function(u,o,d){n.Backbone=e(n,d,u,o)});else if(typeof Fa<"u"){var a=(Kf(),Zc(Qf)),
f;try{f=er()}catch{}e(n,Fa,a,f)}else n.Backbone=e(n,{},n._,n.jQuery||n.Zepto||n.ender||n.$)})(function(e,n,a,f){
var u=e.Backbone,o=Array.prototype.slice;n.VERSION="1.5.0",n.$=f,n.noConflict=function(){return e.Backbone=
u,this},n.emulateHTTP=!1,n.emulateJSON=!1;var d=n.Events={},y=/\s+/,b,_=function(p,x,E,O,U){var K=0,
ht;if(E&&typeof E=="object")for(O!==void 0&&("context"in U)&&U.context===void 0&&(U.context=O),ht=a.
keys(E);K<ht.length;K++)x=_(p,x,ht[K],E[ht[K]],U);else if(E&&y.test(E))for(ht=E.split(y);K<ht.length;K++)
x=p(x,ht[K],O,U);else x=p(x,E,O,U);return x};d.on=function(p,x,E){if(this._events=_(R,this._events||
{},p,x,{context:E,ctx:this,listening:b}),b){var O=this._listeners||(this._listeners={});O[b.id]=b,b.
interop=!1}return this},d.listenTo=function(p,x,E){if(!p)return this;var O=p._listenId||(p._listenId=
a.uniqueId("l")),U=this._listeningTo||(this._listeningTo={}),K=b=U[O];K||(this._listenId||(this._listenId=
a.uniqueId("l")),K=b=U[O]=new T(this,p));var ht=$(p,x,E,this);if(b=void 0,ht)throw ht;return K.interop&&
K.on(x,E),this};var R=function(p,x,E,O){if(E){var U=p[x]||(p[x]=[]),K=O.context,ht=O.ctx,_t=O.listening;
_t&&_t.count++,U.push({callback:E,context:K,ctx:K||ht,listening:_t})}return p},$=function(p,x,E,O){try{
p.on(x,E,O)}catch(U){return U}};d.off=function(p,x,E){return this._events?(this._events=_(X,this._events,
p,x,{context:E,listeners:this._listeners}),this):this},d.stopListening=function(p,x,E){var O=this._listeningTo;
if(!O)return this;for(var U=p?[p._listenId]:a.keys(O),K=0;K<U.length;K++){var ht=O[U[K]];if(!ht)break;
ht.obj.off(x,E,this),ht.interop&&ht.off(x,E)}return a.isEmpty(O)&&(this._listeningTo=void 0),this};var X=function(p,x,E,O){
if(p){var U=O.context,K=O.listeners,ht=0,_t;if(!x&&!U&&!E){for(_t=a.keys(K);ht<_t.length;ht++)K[_t[ht]].
cleanup();return}for(_t=x?[x]:a.keys(p);ht<_t.length;ht++){x=_t[ht];var Dt=p[x];if(!Dt)break;for(var Gt=[],
Xt=0;Xt<Dt.length;Xt++){var rt=Dt[Xt];if(E&&E!==rt.callback&&E!==rt.callback._callback||U&&U!==rt.context)
Gt.push(rt);else{var zt=rt.listening;zt&&zt.off(x,E)}}Gt.length?p[x]=Gt:delete p[x]}return p}};d.once=
function(p,x,E){var O=_(W,{},p,x,this.off.bind(this));return typeof p=="string"&&E==null&&(x=void 0),
this.on(O,x,E)},d.listenToOnce=function(p,x,E){var O=_(W,{},x,E,this.stopListening.bind(this,p));return this.
listenTo(p,O)};var W=function(p,x,E,O){if(E){var U=p[x]=a.once(function(){O(x,U),E.apply(this,arguments)});
U._callback=E}return p};d.trigger=function(p){if(!this._events)return this;for(var x=Math.max(0,arguments.
length-1),E=Array(x),O=0;O<x;O++)E[O]=arguments[O+1];return _(v,this._events,p,void 0,E),this};var v=function(p,x,E,O){
if(p){var U=p[x],K=p.all;U&&K&&(K=K.slice()),U&&D(U,O),K&&D(K,[x].concat(O))}return p},D=function(p,x){
var E,O=-1,U=p.length,K=x[0],ht=x[1],_t=x[2];switch(x.length){case 0:for(;++O<U;)(E=p[O]).callback.call(
E.ctx);return;case 1:for(;++O<U;)(E=p[O]).callback.call(E.ctx,K);return;case 2:for(;++O<U;)(E=p[O]).
callback.call(E.ctx,K,ht);return;case 3:for(;++O<U;)(E=p[O]).callback.call(E.ctx,K,ht,_t);return;default:
for(;++O<U;)(E=p[O]).callback.apply(E.ctx,x);return}},T=function(p,x){this.id=p._listenId,this.listener=
p,this.obj=x,this.interop=!0,this.count=0,this._events=void 0};T.prototype.on=d.on,T.prototype.off=function(p,x){
var E;this.interop?(this._events=_(X,this._events,p,x,{context:void 0,listeners:void 0}),E=!this._events):
(this.count--,E=this.count===0),E&&this.cleanup()},T.prototype.cleanup=function(){delete this.listener.
_listeningTo[this.obj._listenId],this.interop||delete this.obj._listeners[this.id]},d.bind=d.on,d.unbind=
d.off,a.extend(n,d);var F=n.Model=function(p,x){var E=p||{};x||(x={}),this.preinitialize.apply(this,
arguments),this.cid=a.uniqueId(this.cidPrefix),this.attributes={},x.collection&&(this.collection=x.collection),
x.parse&&(E=this.parse(E,x)||{});var O=a.result(this,"defaults");E=a.defaults(a.extend({},O,E),O),this.
set(E,x),this.changed={},this.initialize.apply(this,arguments)};a.extend(F.prototype,d,{changed:null,
validationError:null,idAttribute:"id",cidPrefix:"c",preinitialize:function(){},initialize:function(){},
toJSON:function(p){return a.clone(this.attributes)},sync:function(){return n.sync.apply(this,arguments)},
get:function(p){return this.attributes[p]},escape:function(p){return a.escape(this.get(p))},has:function(p){
return this.get(p)!=null},matches:function(p){return!!a.iteratee(p,this)(this.attributes)},set:function(p,x,E){
if(p==null)return this;var O;if(typeof p=="object"?(O=p,E=x):(O={})[p]=x,E||(E={}),!this._validate(O,
E))return!1;var U=E.unset,K=E.silent,ht=[],_t=this._changing;this._changing=!0,_t||(this._previousAttributes=
a.clone(this.attributes),this.changed={});var Dt=this.attributes,Gt=this.changed,Xt=this._previousAttributes;
for(var rt in O)x=O[rt],a.isEqual(Dt[rt],x)||ht.push(rt),a.isEqual(Xt[rt],x)?delete Gt[rt]:Gt[rt]=x,
U?delete Dt[rt]:Dt[rt]=x;if(this.idAttribute in O){var zt=this.id;this.id=this.get(this.idAttribute),
this.trigger("changeId",this,zt,E)}if(!K){ht.length&&(this._pending=E);for(var Ue=0;Ue<ht.length;Ue++)
this.trigger("change:"+ht[Ue],this,Dt[ht[Ue]],E)}if(_t)return this;if(!K)for(;this._pending;)E=this.
_pending,this._pending=!1,this.trigger("change",this,E);return this._pending=!1,this._changing=!1,this},
unset:function(p,x){return this.set(p,void 0,a.extend({},x,{unset:!0}))},clear:function(p){var x={};
for(var E in this.attributes)x[E]=void 0;return this.set(x,a.extend({},p,{unset:!0}))},hasChanged:function(p){
return p==null?!a.isEmpty(this.changed):a.has(this.changed,p)},changedAttributes:function(p){if(!p)return this.
hasChanged()?a.clone(this.changed):!1;var x=this._changing?this._previousAttributes:this.attributes,
E={},O;for(var U in p){var K=p[U];a.isEqual(x[U],K)||(E[U]=K,O=!0)}return O?E:!1},previous:function(p){
return p==null||!this._previousAttributes?null:this._previousAttributes[p]},previousAttributes:function(){
return a.clone(this._previousAttributes)},fetch:function(p){p=a.extend({parse:!0},p);var x=this,E=p.
success;return p.success=function(O){var U=p.parse?x.parse(O,p):O;if(!x.set(U,p))return!1;E&&E.call(
p.context,x,O,p),x.trigger("sync",x,O,p)},ae(this,p),this.sync("read",this,p)},save:function(p,x,E){
var O;p==null||typeof p=="object"?(O=p,E=x):(O={})[p]=x,E=a.extend({validate:!0,parse:!0},E);var U=E.
wait;if(O&&!U){if(!this.set(O,E))return!1}else if(!this._validate(O,E))return!1;var K=this,ht=E.success,
_t=this.attributes;E.success=function(Xt){K.attributes=_t;var rt=E.parse?K.parse(Xt,E):Xt;if(U&&(rt=
a.extend({},O,rt)),rt&&!K.set(rt,E))return!1;ht&&ht.call(E.context,K,Xt,E),K.trigger("sync",K,Xt,E)},
ae(this,E),O&&U&&(this.attributes=a.extend({},_t,O));var Dt=this.isNew()?"create":E.patch?"patch":"u\
pdate";Dt==="patch"&&!E.attrs&&(E.attrs=O);var Gt=this.sync(Dt,this,E);return this.attributes=_t,Gt},
destroy:function(p){p=p?a.clone(p):{};var x=this,E=p.success,O=p.wait,U=function(){x.stopListening(),
x.trigger("destroy",x,x.collection,p)};p.success=function(ht){O&&U(),E&&E.call(p.context,x,ht,p),x.isNew()||
x.trigger("sync",x,ht,p)};var K=!1;return this.isNew()?a.defer(p.success):(ae(this,p),K=this.sync("d\
elete",this,p)),O||U(),K},url:function(){var p=a.result(this,"urlRoot")||a.result(this.collection,"u\
rl")||qe();if(this.isNew())return p;var x=this.get(this.idAttribute);return p.replace(/[^\/]$/,"$&/")+
encodeURIComponent(x)},parse:function(p,x){return p},clone:function(){return new this.constructor(this.
attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(p){return this._validate(
{},a.extend({},p,{validate:!0}))},_validate:function(p,x){if(!x.validate||!this.validate)return!0;p=
a.extend({},this.attributes,p);var E=this.validationError=this.validate(p,x)||null;return E?(this.trigger(
"invalid",this,E,a.extend(x,{validationError:E})),!1):!0}});var z=n.Collection=function(p,x){x||(x={}),
this.preinitialize.apply(this,arguments),x.model&&(this.model=x.model),x.comparator!==void 0&&(this.
comparator=x.comparator),this._reset(),this.initialize.apply(this,arguments),p&&this.reset(p,a.extend(
{silent:!0},x))},Q={add:!0,remove:!0,merge:!0},nt={add:!0,remove:!1},ut=function(p,x,E){E=Math.min(Math.
max(E,0),p.length);var O=Array(p.length-E),U=x.length,K;for(K=0;K<O.length;K++)O[K]=p[K+E];for(K=0;K<
U;K++)p[K+E]=x[K];for(K=0;K<O.length;K++)p[K+U+E]=O[K]};a.extend(z.prototype,d,{model:F,preinitialize:function(){},
initialize:function(){},toJSON:function(p){return this.map(function(x){return x.toJSON(p)})},sync:function(){
return n.sync.apply(this,arguments)},add:function(p,x){return this.set(p,a.extend({merge:!1},x,nt))},
remove:function(p,x){x=a.extend({},x);var E=!a.isArray(p);p=E?[p]:p.slice();var O=this._removeModels(
p,x);return!x.silent&&O.length&&(x.changes={added:[],merged:[],removed:O},this.trigger("update",this,
x)),E?O[0]:O},set:function(p,x){if(p!=null){x=a.extend({},Q,x),x.parse&&!this._isModel(p)&&(p=this.parse(
p,x)||[]);var E=!a.isArray(p);p=E?[p]:p.slice();var O=x.at;O!=null&&(O=+O),O>this.length&&(O=this.length),
O<0&&(O+=this.length+1);var U=[],K=[],ht=[],_t=[],Dt={},Gt=x.add,Xt=x.merge,rt=x.remove,zt=!1,Ue=this.
comparator&&O==null&&x.sort!==!1,Os=a.isString(this.comparator)?this.comparator:null,Jt,te;for(te=0;te<
p.length;te++){Jt=p[te];var Ne=this.get(Jt);if(Ne){if(Xt&&Jt!==Ne){var Ge=this._isModel(Jt)?Jt.attributes:
Jt;x.parse&&(Ge=Ne.parse(Ge,x)),Ne.set(Ge,x),ht.push(Ne),Ue&&!zt&&(zt=Ne.hasChanged(Os))}Dt[Ne.cid]||
(Dt[Ne.cid]=!0,U.push(Ne)),p[te]=Ne}else Gt&&(Jt=p[te]=this._prepareModel(Jt,x),Jt&&(K.push(Jt),this.
_addReference(Jt,x),Dt[Jt.cid]=!0,U.push(Jt)))}if(rt){for(te=0;te<this.length;te++)Jt=this.models[te],
Dt[Jt.cid]||_t.push(Jt);_t.length&&this._removeModels(_t,x)}var De=!1,Ye=!Ue&&Gt&&rt;if(U.length&&Ye?
(De=this.length!==U.length||a.some(this.models,function(lr,Ds){return lr!==U[Ds]}),this.models.length=
0,ut(this.models,U,0),this.length=this.models.length):K.length&&(Ue&&(zt=!0),ut(this.models,K,O??this.
length),this.length=this.models.length),zt&&this.sort({silent:!0}),!x.silent){for(te=0;te<K.length;te++)
O!=null&&(x.index=O+te),Jt=K[te],Jt.trigger("add",Jt,this,x);(zt||De)&&this.trigger("sort",this,x),(K.
length||_t.length||ht.length)&&(x.changes={added:K,removed:_t,merged:ht},this.trigger("update",this,
x))}return E?p[0]:p}},reset:function(p,x){x=x?a.clone(x):{};for(var E=0;E<this.models.length;E++)this.
_removeReference(this.models[E],x);return x.previousModels=this.models,this._reset(),p=this.add(p,a.
extend({silent:!0},x)),x.silent||this.trigger("reset",this,x),p},push:function(p,x){return this.add(
p,a.extend({at:this.length},x))},pop:function(p){var x=this.at(this.length-1);return this.remove(x,p)},
unshift:function(p,x){return this.add(p,a.extend({at:0},x))},shift:function(p){var x=this.at(0);return this.
remove(x,p)},slice:function(){return o.apply(this.models,arguments)},get:function(p){if(p!=null)return this.
_byId[p]||this._byId[this.modelId(this._isModel(p)?p.attributes:p,p.idAttribute)]||p.cid&&this._byId[p.
cid]},has:function(p){return this.get(p)!=null},at:function(p){return p<0&&(p+=this.length),this.models[p]},
where:function(p,x){return this[x?"find":"filter"](p)},findWhere:function(p){return this.where(p,!0)},
sort:function(p){var x=this.comparator;if(!x)throw new Error("Cannot sort a set without a comparator");
p||(p={});var E=x.length;return a.isFunction(x)&&(x=x.bind(this)),E===1||a.isString(x)?this.models=this.
sortBy(x):this.models.sort(x),p.silent||this.trigger("sort",this,p),this},pluck:function(p){return this.
map(p+"")},fetch:function(p){p=a.extend({parse:!0},p);var x=p.success,E=this;return p.success=function(O){
var U=p.reset?"reset":"set";E[U](O,p),x&&x.call(p.context,E,O,p),E.trigger("sync",E,O,p)},ae(this,p),
this.sync("read",this,p)},create:function(p,x){x=x?a.clone(x):{};var E=x.wait;if(p=this._prepareModel(
p,x),!p)return!1;E||this.add(p,x);var O=this,U=x.success;return x.success=function(K,ht,_t){E&&(K.off(
"error",this._forwardPristineError,this),O.add(K,_t)),U&&U.call(_t.context,K,ht,_t)},E&&p.once("erro\
r",this._forwardPristineError,this),p.save(null,x),p},parse:function(p,x){return p},clone:function(){
return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(p,x){
return p[x||this.model.prototype.idAttribute||"id"]},values:function(){return new tt(this,et)},keys:function(){
return new tt(this,at)},entries:function(){return new tt(this,Tt)},_reset:function(){this.length=0,this.
models=[],this._byId={}},_prepareModel:function(p,x){if(this._isModel(p))return p.collection||(p.collection=
this),p;x=x?a.clone(x):{},x.collection=this;var E;return this.model.prototype?E=new this.model(p,x):
E=this.model(p,x),E.validationError?(this.trigger("invalid",this,E.validationError,x),!1):E},_removeModels:function(p,x){
for(var E=[],O=0;O<p.length;O++){var U=this.get(p[O]);if(U){var K=this.indexOf(U);this.models.splice(
K,1),this.length--,delete this._byId[U.cid];var ht=this.modelId(U.attributes,U.idAttribute);ht!=null&&
delete this._byId[ht],x.silent||(x.index=K,U.trigger("remove",U,this,x)),E.push(U),this._removeReference(
U,x)}}return p.length>0&&!x.silent&&delete x.index,E},_isModel:function(p){return p instanceof F},_addReference:function(p,x){
this._byId[p.cid]=p;var E=this.modelId(p.attributes,p.idAttribute);E!=null&&(this._byId[E]=p),p.on("\
all",this._onModelEvent,this)},_removeReference:function(p,x){delete this._byId[p.cid];var E=this.modelId(
p.attributes,p.idAttribute);E!=null&&delete this._byId[E],this===p.collection&&delete p.collection,p.
off("all",this._onModelEvent,this)},_onModelEvent:function(p,x,E,O){if(x){if((p==="add"||p==="remove")&&
E!==this)return;if(p==="destroy"&&this.remove(x,O),p==="changeId"){var U=this.modelId(x.previousAttributes(),
x.idAttribute),K=this.modelId(x.attributes,x.idAttribute);U!=null&&delete this._byId[U],K!=null&&(this.
_byId[K]=x)}}this.trigger.apply(this,arguments)},_forwardPristineError:function(p,x,E){this.has(p)||
this._onModelEvent("error",p,x,E)}});var i=typeof Symbol=="function"&&Symbol.iterator;i&&(z.prototype[i]=
z.prototype.values);var tt=function(p,x){this._collection=p,this._kind=x,this._index=0},et=1,at=2,Tt=3;
i&&(tt.prototype[i]=function(){return this}),tt.prototype.next=function(){if(this._collection){if(this.
_index<this._collection.length){var p=this._collection.at(this._index);this._index++;var x;if(this._kind===
et)x=p;else{var E=this._collection.modelId(p.attributes,p.idAttribute);this._kind===at?x=E:x=[E,p]}return{
value:x,done:!1}}this._collection=void 0}return{value:void 0,done:!0}};var wt=n.View=function(p){this.
cid=a.uniqueId("view"),this.preinitialize.apply(this,arguments),a.extend(this,a.pick(p,lt)),this._ensureElement(),
this.initialize.apply(this,arguments)},mt=/^(\S+)\s*(.*)$/,lt=["model","collection","el","id","attri\
butes","className","tagName","events"];a.extend(wt.prototype,d,{tagName:"div",$:function(p){return this.
$el.find(p)},preinitialize:function(){},initialize:function(){},render:function(){return this},remove:function(){
return this._removeElement(),this.stopListening(),this},_removeElement:function(){this.$el.remove()},
setElement:function(p){return this.undelegateEvents(),this._setElement(p),this.delegateEvents(),this},
_setElement:function(p){this.$el=p instanceof n.$?p:n.$(p),this.el=this.$el[0]},delegateEvents:function(p){
if(p||(p=a.result(this,"events")),!p)return this;this.undelegateEvents();for(var x in p){var E=p[x];
if(a.isFunction(E)||(E=this[E]),!!E){var O=x.match(mt);this.delegate(O[1],O[2],E.bind(this))}}return this},
delegate:function(p,x,E){return this.$el.on(p+".delegateEvents"+this.cid,x,E),this},undelegateEvents:function(){
return this.$el&&this.$el.off(".delegateEvents"+this.cid),this},undelegate:function(p,x,E){return this.
$el.off(p+".delegateEvents"+this.cid,x,E),this},_createElement:function(p){return document.createElement(
p)},_ensureElement:function(){if(this.el)this.setElement(a.result(this,"el"));else{var p=a.extend({},
a.result(this,"attributes"));this.id&&(p.id=a.result(this,"id")),this.className&&(p.class=a.result(this,
"className")),this.setElement(this._createElement(a.result(this,"tagName"))),this._setAttributes(p)}},
_setAttributes:function(p){this.$el.attr(p)}});var it=function(p,x,E,O){switch(x){case 1:return function(){
return p[E](this[O])};case 2:return function(U){return p[E](this[O],U)};case 3:return function(U,K){
return p[E](this[O],ft(U,this),K)};case 4:return function(U,K,ht){return p[E](this[O],ft(U,this),K,ht)};default:
return function(){var U=o.call(arguments);return U.unshift(this[O]),p[E].apply(p,U)}}},pt=function(p,x,E,O){
a.each(E,function(U,K){x[K]&&(p.prototype[K]=it(x,U,K,O))})},ft=function(p,x){return a.isFunction(p)?
p:a.isObject(p)&&!x._isModel(p)?m(p):a.isString(p)?function(E){return E.get(p)}:p},m=function(p){var x=a.
matches(p);return function(E){return x(E.attributes)}},C={forEach:3,each:3,map:3,collect:3,reduce:0,
foldl:0,inject:0,reduceRight:0,foldr:0,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,
any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,
rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,
sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3,findIndex:3,findLastIndex:3},I={keys:1,values:1,
pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};a.each([[z,C,"models"],[F,I,"attributes"]],function(p){
var x=p[0],E=p[1],O=p[2];x.mixin=function(U){var K=a.reduce(a.functions(U),function(ht,_t){return ht[_t]=
0,ht},{});pt(x,U,K,O)},pt(x,a,E,O)}),n.sync=function(p,x,E){var O=q[p];a.defaults(E||(E={}),{emulateHTTP:n.
emulateHTTP,emulateJSON:n.emulateJSON});var U={type:O,dataType:"json"};if(E.url||(U.url=a.result(x,"\
url")||qe()),E.data==null&&x&&(p==="create"||p==="update"||p==="patch")&&(U.contentType="application\
/json",U.data=JSON.stringify(E.attrs||x.toJSON(E))),E.emulateJSON&&(U.contentType="application/x-www\
-form-urlencoded",U.data=U.data?{model:U.data}:{}),E.emulateHTTP&&(O==="PUT"||O==="DELETE"||O==="PAT\
CH")){U.type="POST",E.emulateJSON&&(U.data._method=O);var K=E.beforeSend;E.beforeSend=function(Dt){if(Dt.
setRequestHeader("X-HTTP-Method-Override",O),K)return K.apply(this,arguments)}}U.type!=="GET"&&!E.emulateJSON&&
(U.processData=!1);var ht=E.error;E.error=function(Dt,Gt,Xt){E.textStatus=Gt,E.errorThrown=Xt,ht&&ht.
call(E.context,Dt,Gt,Xt)};var _t=E.xhr=n.ajax(a.extend(U,E));return x.trigger("request",x,_t,E),_t};
var q={create:"POST",update:"PUT",patch:"PATCH",delete:"DELETE",read:"GET"};n.ajax=function(){return n.
$.ajax.apply(n.$,arguments)};var G=n.Router=function(p){p||(p={}),this.preinitialize.apply(this,arguments),
p.routes&&(this.routes=p.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},Y=/\((.*?)\)/g,
ct=/(\(\?)?:\w+/g,$t=/\*\w+/g,ce=/[\-{}\[\]+?.,\\\^$|#\s]/g;a.extend(G.prototype,d,{preinitialize:function(){},
initialize:function(){},route:function(p,x,E){a.isRegExp(p)||(p=this._routeToRegExp(p)),a.isFunction(
x)&&(E=x,x=""),E||(E=this[x]);var O=this;return n.history.route(p,function(U){var K=O._extractParameters(
p,U);O.execute(E,K,x)!==!1&&(O.trigger.apply(O,["route:"+x].concat(K)),O.trigger("route",x,K),n.history.
trigger("route",O,x,K))}),this},execute:function(p,x,E){p&&p.apply(this,x)},navigate:function(p,x){return n.
history.navigate(p,x),this},_bindRoutes:function(){if(this.routes){this.routes=a.result(this,"routes");
for(var p,x=a.keys(this.routes);(p=x.pop())!=null;)this.route(p,this.routes[p])}},_routeToRegExp:function(p){
return p=p.replace(ce,"\\$&").replace(Y,"(?:$1)?").replace(ct,function(x,E){return E?x:"([^/?]+)"}).
replace($t,"([^?]*?)"),new RegExp("^"+p+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(p,x){var E=p.
exec(x).slice(1);return a.map(E,function(O,U){return U===E.length-1?O||null:O?decodeURIComponent(O):
null})}});var Vt=n.History=function(){this.handlers=[],this.checkUrl=this.checkUrl.bind(this),typeof window<
"u"&&(this.location=window.location,this.history=window.history)},Zt=/^[#\/]|\s+$/g,_e=/^\/+|\/+$/g,
ve=/#.*$/;Vt.started=!1,a.extend(Vt.prototype,d,{interval:50,atRoot:function(){var p=this.location.pathname.
replace(/[^\/]$/,"$&/");return p===this.root&&!this.getSearch()},matchRoot:function(){var p=this.decodeFragment(
this.location.pathname),x=p.slice(0,this.root.length-1)+"/";return x===this.root},decodeFragment:function(p){
return decodeURI(p.replace(/%25/g,"%2525"))},getSearch:function(){var p=this.location.href.replace(/#.*/,
"").match(/\?.+/);return p?p[0]:""},getHash:function(p){var x=(p||this).location.href.match(/#(.*)$/);
return x?x[1]:""},getPath:function(){var p=this.decodeFragment(this.location.pathname+this.getSearch()).
slice(this.root.length-1);return p.charAt(0)==="/"?p.slice(1):p},getFragment:function(p){return p==null&&
(this._usePushState||!this._wantsHashChange?p=this.getPath():p=this.getHash()),p.replace(Zt,"")},start:function(p){
if(Vt.started)throw new Error("Backbone.history has already been started");if(Vt.started=!0,this.options=
a.extend({root:"/"},this.options,p),this.root=this.options.root,this._trailingSlash=this.options.trailingSlash,
this._wantsHashChange=this.options.hashChange!==!1,this._hasHashChange="onhashchange"in window&&(document.
documentMode===void 0||document.documentMode>7),this._useHashChange=this._wantsHashChange&&this._hasHashChange,
this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.history&&this.history.pushState),
this._usePushState=this._wantsPushState&&this._hasPushState,this.fragment=this.getFragment(),this.root=
("/"+this.root+"/").replace(_e,"/"),this._wantsHashChange&&this._wantsPushState)if(!this._hasPushState&&
!this.atRoot()){var x=this.root.slice(0,-1)||"/";return this.location.replace(x+"#"+this.getPath()),
!0}else this._hasPushState&&this.atRoot()&&this.navigate(this.getHash(),{replace:!0});if(!this._hasHashChange&&
this._wantsHashChange&&!this._usePushState){this.iframe=document.createElement("iframe"),this.iframe.
src="javascript:0",this.iframe.style.display="none",this.iframe.tabIndex=-1;var E=document.body,O=E.
insertBefore(this.iframe,E.firstChild).contentWindow;O.document.open(),O.document.close(),O.location.
hash="#"+this.fragment}var U=window.addEventListener||function(K,ht){return attachEvent("on"+K,ht)};
if(this._usePushState?U("popstate",this.checkUrl,!1):this._useHashChange&&!this.iframe?U("hashchange",
this.checkUrl,!1):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),
!this.options.silent)return this.loadUrl()},stop:function(){var p=window.removeEventListener||function(x,E){
return detachEvent("on"+x,E)};this._usePushState?p("popstate",this.checkUrl,!1):this._useHashChange&&
!this.iframe&&p("hashchange",this.checkUrl,!1),this.iframe&&(document.body.removeChild(this.iframe),
this.iframe=null),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),Vt.started=!1},route:function(p,x){
this.handlers.unshift({route:p,callback:x})},checkUrl:function(p){var x=this.getFragment();if(x===this.
fragment&&this.iframe&&(x=this.getHash(this.iframe.contentWindow)),x===this.fragment)return!1;this.iframe&&
this.navigate(x),this.loadUrl()},loadUrl:function(p){return this.matchRoot()?(p=this.fragment=this.getFragment(
p),a.some(this.handlers,function(x){if(x.route.test(p))return x.callback(p),!0})):!1},navigate:function(p,x){
if(!Vt.started)return!1;(!x||x===!0)&&(x={trigger:!!x}),p=this.getFragment(p||"");var E=this.root;!this.
_trailingSlash&&(p===""||p.charAt(0)==="?")&&(E=E.slice(0,-1)||"/");var O=E+p;p=p.replace(ve,"");var U=this.
decodeFragment(p);if(this.fragment!==U){if(this.fragment=U,this._usePushState)this.history[x.replace?
"replaceState":"pushState"]({},document.title,O);else if(this._wantsHashChange){if(this._updateHash(
this.location,p,x.replace),this.iframe&&p!==this.getHash(this.iframe.contentWindow)){var K=this.iframe.
contentWindow;x.replace||(K.document.open(),K.document.close()),this._updateHash(K.location,p,x.replace)}}else
return this.location.assign(O);if(x.trigger)return this.loadUrl(p)}},_updateHash:function(p,x,E){if(E){
var O=p.href.replace(/(javascript:|#).*$/,"");p.replace(O+"#"+x)}else p.hash="#"+x}}),n.history=new Vt;
var ar=function(p,x){var E=this,O;return p&&a.has(p,"constructor")?O=p.constructor:O=function(){return E.
apply(this,arguments)},a.extend(O,E,x),O.prototype=a.create(E.prototype,p),O.prototype.constructor=O,
O.__super__=E.prototype,O};F.extend=z.extend=G.extend=wt.extend=Vt.extend=ar;var qe=function(){throw new Error(
'A "url" property or function must be specified')},ae=function(p,x){var E=x.error;x.error=function(O){
E&&E.call(x.context,p,O,x),p.trigger("error",p,O,x)}};return n})});var Yf=Kt((Jf,Gf)=>{(function(e){var n=!1;if(typeof define=="function"&&define.amd&&(define(e),n=!0),
typeof Jf=="object"&&(Gf.exports=e(),n=!0),!n){var a=window.Cookies,f=window.Cookies=e();f.noConflict=
function(){return window.Cookies=a,f}}})(function(){function e(){for(var a=0,f={};a<arguments.length;a++){
var u=arguments[a];for(var o in u)f[o]=u[o]}return f}function n(a){function f(u,o,d){var y;if(!(typeof document>
"u")){if(arguments.length>1){if(d=e({path:"/"},f.defaults,d),typeof d.expires=="number"){var b=new Date;
b.setMilliseconds(b.getMilliseconds()+d.expires*864e5),d.expires=b}d.expires=d.expires?d.expires.toUTCString():
"";try{y=JSON.stringify(o),/^[\{\[]/.test(y)&&(o=y)}catch{}a.write?o=a.write(o,u):o=encodeURIComponent(
String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),u=
encodeURIComponent(String(u)),u=u.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),u=u.replace(
/[\(\)]/g,escape);var _="";for(var R in d)d[R]&&(_+="; "+R,d[R]!==!0&&(_+="="+d[R]));return document.
cookie=u+"="+o+_}u||(y={});for(var $=document.cookie?document.cookie.split("; "):[],X=/(%[0-9A-Z]{2})+/g,
W=0;W<$.length;W++){var v=$[W].split("="),D=v.slice(1).join("=");D.charAt(0)==='"'&&(D=D.slice(1,-1));
try{var T=v[0].replace(X,decodeURIComponent);if(D=a.read?a.read(D,T):a(D,T)||D.replace(X,decodeURIComponent),
this.json)try{D=JSON.parse(D)}catch{}if(u===T){y=D;break}u||(y[T]=D)}catch{}}return y}}return f.set=
f,f.get=function(u){return f.call(f,u)},f.getJSON=function(){return f.apply({json:!0},[].slice.call(
arguments))},f.defaults={},f.remove=function(u,o){f(u,"",e(o,{expires:-1}))},f.withConverter=n,f}return n(
function(){})})});var Ba=Kt((li,ks)=>{(function(){var e=this,n=e._,a={},f=Array.prototype,u=Object.prototype,o=Function.
prototype,d=f.slice,y=f.unshift,b=u.toString,_=u.hasOwnProperty,R=f.forEach,$=f.map,X=f.reduce,W=f.reduceRight,
v=f.filter,D=f.every,T=f.some,F=f.indexOf,z=f.lastIndexOf,Q=Array.isArray,nt=Object.keys,ut=o.bind,i=function(m){
return new it(m)};typeof li<"u"?(typeof ks<"u"&&ks.exports&&(li=ks.exports=i),li._=i):e._=i,i.VERSION=
"1.3.1";var tt=i.each=i.forEach=function(m,C,I){if(m!=null){if(R&&m.forEach===R)m.forEach(C,I);else if(m.
length===+m.length){for(var q=0,G=m.length;q<G;q++)if(q in m&&C.call(I,m[q],q,m)===a)return}else for(var Y in m)
if(i.has(m,Y)&&C.call(I,m[Y],Y,m)===a)return}};i.map=i.collect=function(m,C,I){var q=[];return m==null?
q:$&&m.map===$?m.map(C,I):(tt(m,function(G,Y,ct){q[q.length]=C.call(I,G,Y,ct)}),m.length===+m.length&&
(q.length=m.length),q)},i.reduce=i.foldl=i.inject=function(m,C,I,q){var G=arguments.length>2;if(m==null&&
(m=[]),X&&m.reduce===X)return q&&(C=i.bind(C,q)),G?m.reduce(C,I):m.reduce(C);if(tt(m,function(Y,ct,$t){
G?I=C.call(q,I,Y,ct,$t):(I=Y,G=!0)}),!G)throw new TypeError("Reduce of empty array with no initial v\
alue");return I},i.reduceRight=i.foldr=function(m,C,I,q){var G=arguments.length>2;if(m==null&&(m=[]),
W&&m.reduceRight===W)return q&&(C=i.bind(C,q)),G?m.reduceRight(C,I):m.reduceRight(C);var Y=i.toArray(
m).reverse();return q&&!G&&(C=i.bind(C,q)),G?i.reduce(Y,C,I,q):i.reduce(Y,C)},i.find=i.detect=function(m,C,I){
var q;return et(m,function(G,Y,ct){if(C.call(I,G,Y,ct))return q=G,!0}),q},i.filter=i.select=function(m,C,I){
var q=[];return m==null?q:v&&m.filter===v?m.filter(C,I):(tt(m,function(G,Y,ct){C.call(I,G,Y,ct)&&(q[q.
length]=G)}),q)},i.reject=function(m,C,I){var q=[];return m==null||tt(m,function(G,Y,ct){C.call(I,G,
Y,ct)||(q[q.length]=G)}),q},i.every=i.all=function(m,C,I){var q=!0;return m==null?q:D&&m.every===D?m.
every(C,I):(tt(m,function(G,Y,ct){if(!(q=q&&C.call(I,G,Y,ct)))return a}),q)};var et=i.some=i.any=function(m,C,I){
C||(C=i.identity);var q=!1;return m==null?q:T&&m.some===T?m.some(C,I):(tt(m,function(G,Y,ct){if(q||(q=
C.call(I,G,Y,ct)))return a}),!!q)};i.include=i.contains=function(m,C){var I=!1;return m==null?I:F&&m.
indexOf===F?m.indexOf(C)!=-1:(I=et(m,function(q){return q===C}),I)},i.invoke=function(m,C){var I=d.call(
arguments,2);return i.map(m,function(q){return(i.isFunction(C)?C||q:q[C]).apply(q,I)})},i.pluck=function(m,C){
return i.map(m,function(I){return I[C]})},i.max=function(m,C,I){if(!C&&i.isArray(m))return Math.max.
apply(Math,m);if(!C&&i.isEmpty(m))return-1/0;var q={computed:-1/0};return tt(m,function(G,Y,ct){var $t=C?
C.call(I,G,Y,ct):G;$t>=q.computed&&(q={value:G,computed:$t})}),q.value},i.min=function(m,C,I){if(!C&&
i.isArray(m))return Math.min.apply(Math,m);if(!C&&i.isEmpty(m))return 1/0;var q={computed:1/0};return tt(
m,function(G,Y,ct){var $t=C?C.call(I,G,Y,ct):G;$t<q.computed&&(q={value:G,computed:$t})}),q.value},i.
shuffle=function(m){var C=[],I;return tt(m,function(q,G,Y){G==0?C[0]=q:(I=Math.floor(Math.random()*(G+
1)),C[G]=C[I],C[I]=q)}),C},i.sortBy=function(m,C,I){return i.pluck(i.map(m,function(q,G,Y){return{value:q,
criteria:C.call(I,q,G,Y)}}).sort(function(q,G){var Y=q.criteria,ct=G.criteria;return Y<ct?-1:Y>ct?1:
0}),"value")},i.groupBy=function(m,C){var I={},q=i.isFunction(C)?C:function(G){return G[C]};return tt(
m,function(G,Y){var ct=q(G,Y);(I[ct]||(I[ct]=[])).push(G)}),I},i.sortedIndex=function(m,C,I){I||(I=i.
identity);for(var q=0,G=m.length;q<G;){var Y=q+G>>1;I(m[Y])<I(C)?q=Y+1:G=Y}return q},i.toArray=function(m){
return m?m.toArray?m.toArray():i.isArray(m)||i.isArguments(m)?d.call(m):i.values(m):[]},i.size=function(m){
return i.toArray(m).length},i.first=i.head=function(m,C,I){return C!=null&&!I?d.call(m,0,C):m[0]},i.
initial=function(m,C,I){return d.call(m,0,m.length-(C==null||I?1:C))},i.last=function(m,C,I){return C!=
null&&!I?d.call(m,Math.max(m.length-C,0)):m[m.length-1]},i.rest=i.tail=function(m,C,I){return d.call(
m,C==null||I?1:C)},i.compact=function(m){return i.filter(m,function(C){return!!C})},i.flatten=function(m,C){
return i.reduce(m,function(I,q){return i.isArray(q)?I.concat(C?q:i.flatten(q)):(I[I.length]=q,I)},[])},
i.without=function(m){return i.difference(m,d.call(arguments,1))},i.uniq=i.unique=function(m,C,I){var q=I?
i.map(m,I):m,G=[];return i.reduce(q,function(Y,ct,$t){return($t==0||(C===!0?i.last(Y)!=ct:!i.include(
Y,ct)))&&(Y[Y.length]=ct,G[G.length]=m[$t]),Y},[]),G},i.union=function(){return i.uniq(i.flatten(arguments,
!0))},i.intersection=i.intersect=function(m){var C=d.call(arguments,1);return i.filter(i.uniq(m),function(I){
return i.every(C,function(q){return i.indexOf(q,I)>=0})})},i.difference=function(m){var C=i.flatten(
d.call(arguments,1));return i.filter(m,function(I){return!i.include(C,I)})},i.zip=function(){for(var m=d.
call(arguments),C=i.max(i.pluck(m,"length")),I=new Array(C),q=0;q<C;q++)I[q]=i.pluck(m,""+q);return I},
i.indexOf=function(m,C,I){if(m==null)return-1;var q,G;if(I)return q=i.sortedIndex(m,C),m[q]===C?q:-1;
if(F&&m.indexOf===F)return m.indexOf(C);for(q=0,G=m.length;q<G;q++)if(q in m&&m[q]===C)return q;return-1},
i.lastIndexOf=function(m,C){if(m==null)return-1;if(z&&m.lastIndexOf===z)return m.lastIndexOf(C);for(var I=m.
length;I--;)if(I in m&&m[I]===C)return I;return-1},i.range=function(m,C,I){arguments.length<=1&&(C=m||
0,m=0),I=arguments[2]||1;for(var q=Math.max(Math.ceil((C-m)/I),0),G=0,Y=new Array(q);G<q;)Y[G++]=m,m+=
I;return Y};var at=function(){};i.bind=function(C,I){var q,G;if(C.bind===ut&&ut)return ut.apply(C,d.
call(arguments,1));if(!i.isFunction(C))throw new TypeError;return G=d.call(arguments,2),q=function(){
if(!(this instanceof q))return C.apply(I,G.concat(d.call(arguments)));at.prototype=C.prototype;var Y=new at,
ct=C.apply(Y,G.concat(d.call(arguments)));return Object(ct)===ct?ct:Y}},i.bindAll=function(m){var C=d.
call(arguments,1);return C.length==0&&(C=i.functions(m)),tt(C,function(I){m[I]=i.bind(m[I],m)}),m},i.
memoize=function(m,C){var I={};return C||(C=i.identity),function(){var q=C.apply(this,arguments);return i.
has(I,q)?I[q]:I[q]=m.apply(this,arguments)}},i.delay=function(m,C){var I=d.call(arguments,2);return setTimeout(
function(){return m.apply(m,I)},C)},i.defer=function(m){return i.delay.apply(i,[m,1].concat(d.call(arguments,
1)))},i.throttle=function(m,C){var I,q,G,Y,ct,$t=i.debounce(function(){ct=Y=!1},C);return function(){
I=this,q=arguments;var ce=function(){G=null,ct&&m.apply(I,q),$t()};G||(G=setTimeout(ce,C)),Y?ct=!0:m.
apply(I,q),$t(),Y=!0}},i.debounce=function(m,C){var I;return function(){var q=this,G=arguments,Y=function(){
I=null,m.apply(q,G)};clearTimeout(I),I=setTimeout(Y,C)}},i.once=function(m){var C=!1,I;return function(){
return C?I:(C=!0,I=m.apply(this,arguments))}},i.wrap=function(m,C){return function(){var I=[m].concat(
d.call(arguments,0));return C.apply(this,I)}},i.compose=function(){var m=arguments;return function(){
for(var C=arguments,I=m.length-1;I>=0;I--)C=[m[I].apply(this,C)];return C[0]}},i.after=function(m,C){
return m<=0?C():function(){if(--m<1)return C.apply(this,arguments)}},i.keys=nt||function(m){if(m!==Object(
m))throw new TypeError("Invalid object");var C=[];for(var I in m)i.has(m,I)&&(C[C.length]=I);return C},
i.values=function(m){return i.map(m,i.identity)},i.functions=i.methods=function(m){var C=[];for(var I in m)
i.isFunction(m[I])&&C.push(I);return C.sort()},i.extend=function(m){return tt(d.call(arguments,1),function(C){
for(var I in C)m[I]=C[I]}),m},i.defaults=function(m){return tt(d.call(arguments,1),function(C){for(var I in C)
m[I]==null&&(m[I]=C[I])}),m},i.clone=function(m){return i.isObject(m)?i.isArray(m)?m.slice():i.extend(
{},m):m},i.tap=function(m,C){return C(m),m};function Tt(m,C,I){if(m===C)return m!==0||1/m==1/C;if(m==
null||C==null)return m===C;if(m._chain&&(m=m._wrapped),C._chain&&(C=C._wrapped),m.isEqual&&i.isFunction(
m.isEqual))return m.isEqual(C);if(C.isEqual&&i.isFunction(C.isEqual))return C.isEqual(m);var q=b.call(
m);if(q!=b.call(C))return!1;switch(q){case"[object String]":return m==String(C);case"[object Number]":
return m!=+m?C!=+C:m==0?1/m==1/C:m==+C;case"[object Date]":case"[object Boolean]":return+m==+C;case"\
[object RegExp]":return m.source==C.source&&m.global==C.global&&m.multiline==C.multiline&&m.ignoreCase==
C.ignoreCase}if(typeof m!="object"||typeof C!="object")return!1;for(var G=I.length;G--;)if(I[G]==m)return!0;
I.push(m);var Y=0,ct=!0;if(q=="[object Array]"){if(Y=m.length,ct=Y==C.length,ct)for(;Y--&&(ct=Y in m==
Y in C&&Tt(m[Y],C[Y],I)););}else{if("constructor"in m!="constructor"in C||m.constructor!=C.constructor)
return!1;for(var $t in m)if(i.has(m,$t)&&(Y++,!(ct=i.has(C,$t)&&Tt(m[$t],C[$t],I))))break;if(ct){for($t in C)
if(i.has(C,$t)&&!Y--)break;ct=!Y}}return I.pop(),ct}i.isEqual=function(m,C){return Tt(m,C,[])},i.isEmpty=
function(m){if(i.isArray(m)||i.isString(m))return m.length===0;for(var C in m)if(i.has(m,C))return!1;
return!0},i.isElement=function(m){return!!(m&&m.nodeType==1)},i.isArray=Q||function(m){return b.call(
m)=="[object Array]"},i.isObject=function(m){return m===Object(m)},i.isArguments=function(m){return b.
call(m)=="[object Arguments]"},i.isArguments(arguments)||(i.isArguments=function(m){return!!(m&&i.has(
m,"callee"))}),i.isFunction=function(m){return b.call(m)=="[object Function]"},i.isString=function(m){
return b.call(m)=="[object String]"},i.isNumber=function(m){return b.call(m)=="[object Number]"},i.isNaN=
function(m){return m!==m},i.isBoolean=function(m){return m===!0||m===!1||b.call(m)=="[object Boolean\
]"},i.isDate=function(m){return b.call(m)=="[object Date]"},i.isRegExp=function(m){return b.call(m)==
"[object RegExp]"},i.isNull=function(m){return m===null},i.isUndefined=function(m){return m===void 0},
i.has=function(m,C){return _.call(m,C)},i.noConflict=function(){return e._=n,this},i.identity=function(m){
return m},i.times=function(m,C,I){for(var q=0;q<m;q++)C.call(I,q)},i.escape=function(m){return(""+m).
replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,
"&#x27;").replace(/\//g,"&#x2F;")},i.mixin=function(m){tt(i.functions(m),function(C){ft(C,i[C]=m[C])})};
var wt=0;i.uniqueId=function(m){var C=wt++;return m?m+C:C},i.templateSettings={evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var mt=/.^/,lt=function(m){return m.replace(
/\\\\/g,"\\").replace(/\\'/g,"'")};i.template=function(m,C){var I=i.templateSettings,q="var __p=[],p\
rint=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+m.replace(/\\/g,"\\\\").replace(
/'/g,"\\'").replace(I.escape||mt,function(Y,ct){return"',_.escape("+lt(ct)+"),'"}).replace(I.interpolate||
mt,function(Y,ct){return"',"+lt(ct)+",'"}).replace(I.evaluate||mt,function(Y,ct){return"');"+lt(ct).
replace(/[\r\n\t]/g," ")+";__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+
"');}return __p.join('');",G=new Function("obj","_",q);return C?G(C,i):function(Y){return G.call(this,
Y,i)}},i.chain=function(m){return i(m).chain()};var it=function(m){this._wrapped=m};i.prototype=it.prototype;
var pt=function(m,C){return C?i(m).chain():m},ft=function(m,C){it.prototype[m]=function(){var I=d.call(
arguments);return y.call(I,this._wrapped),pt(C.apply(i,I),this._chain)}};i.mixin(i),tt(["pop","push",
"reverse","shift","sort","splice","unshift"],function(m){var C=f[m];it.prototype[m]=function(){var I=this.
_wrapped;C.apply(I,arguments);var q=I.length;return(m=="shift"||m=="splice")&&q===0&&delete I[0],pt(
I,this._chain)}}),tt(["concat","join","slice"],function(m){var C=f[m];it.prototype[m]=function(){return pt(
C.apply(this._wrapped,arguments),this._chain)}}),it.prototype.chain=function(){return this._chain=!0,
this},it.prototype.value=function(){return this._wrapped}}).call(li)});var Ll=$e(er());globalThis.jQuery=Ll.default;var sc=$e(er());$l();Hl();ql();Ml();Fl();Bl();zl();Wl();Ul();jl();Vl();Ql();var gC=$e(Xl());var eo={};wi(eo,{init:()=>nh});var Ut=$e(er()),to={ESCAPE:27,ENTER:13,SLASH_OR_QUESTION_MARK:191};function Si(){
return window.getSelection?window.getSelection().toString():null}function th(e,n){var a=(0,Ut.default)(
window),f=a.height(),u=Math.floor(a.height()/3),o=n.find("#L"+e.start);if(o.length){if(e.start!=e.end){
var d=n.find("#L"+e.end),y=d.offset().top+d.height()-o.offset().top;y<=f?u=.5*(f-y):u=o.height()/2}a.
scrollTop(o.offset().top-u)}}function Jl(e){history.replaceState?history.replaceState(null,null,e):location.
hash=e}function Gl(e){var n=e.match(/#L(\d+)(?:-L?(\d+))?/);if(n&&n.length===3){var a=parseInt(n[1],
10),f=parseInt(n[2],10);return(isNaN(f)||f<a)&&(f=a),{start:a,end:f}}return null}function eh(e,n){for(var a=[],
f=e.start;f<=e.end;f++)a.push("#L"+f);n.find(a.join(",")).addClass("highlighted")}function rh(e){var n=Gl(
document.location.hash);if(n){var a=parseInt(e.attr("id").replace("L",""),10);a<n.start?(n.end=n.start,
n.start=a):n.end=a,Jl("#L"+n.start+"-"+n.end)}}function nh(e){var n=(0,Ut.default)(".file-content"),
a=n.find(".line-numbers"),f=(0,Ut.default)(".help-screen");function u(T,F,z){var Q;F!==void 0?Q="/se\
arch?q="+encodeURIComponent(F)+"&repo="+encodeURIComponent(e.repo_info.name):Q="/search",z===!0?window.
open(Q):window.location.href=Q}function o(){f.removeClass("hidden").children().on("click",function(T){
return T.stopImmediatePropagation(),!0}),(0,Ut.default)(document).on("click",d)}function d(){return f.
addClass("hidden").children().off("click"),(0,Ut.default)(document).off("click",d),!0}function y(T){
T===void 0&&(T=!0),a.find(".highlighted").removeClass("highlighted");var F=Gl(document.location.hash);
F&&(eh(F,a),T&&th(F,n)),(0,Ut.default)("#external-link").attr("href",_(F)),R(F,(0,Ut.default)("#perm\
alink, #back-to-head"))}function b(T){return T==null?1:T.start==T.end?T.start:T.start+"-"+T.end}function _(T){
var F=b(T),z=e.repo_info.name,Q=e.file_path;let nt=e.repo_info.metadata.url_pattern;if(!nt){console.
error("The index file you provided does not provide repositories[x].metadata.url_pattern. External l\
inks to file sources will not work. See the README for more information on file viewing.");return}return nt.
indexOf("/{path}")!==-1&&(Q=Q.replace(/^\/+/,"")),nt=nt.replace("{lno}",F),nt=nt.replace("{version}",
e.commit),nt=nt.replace("{name}",z),nt=nt.replace("{path}",Q),nt}function R(T,F){F.each(function(){var z=(0,Ut.default)(
this),Q=z.attr("href").split("#")[0];T!==null&&(Q+="#L"+b(T)),z.attr("href",Q)})}function $(T){if(T.
which===to.ENTER){var F=Si();F&&u(T,F,!0)}else if(T.which===to.SLASH_OR_QUESTION_MARK)T.preventDefault(),
T.shiftKey?o():(d(),u(T,Si()));else if(T.which===to.ESCAPE)f.hasClass("hidden")||(T.preventDefault(),
d()),(0,Ut.default)("#query").blur();else if(String.fromCharCode(T.which)=="V")(0,Ut.default)("#exte\
rnal-link").focus(),window.location=(0,Ut.default)("#external-link").attr("href");else if(String.fromCharCode(
T.which)=="Y"){var z=(0,Ut.default)("#permalink"),Q=z.length>0;Q&&(z.focus(),window.location=z.attr(
"href"))}else if(String.fromCharCode(T.which)=="N"||String.fromCharCode(T.which)=="P"){var nt=String.
fromCharCode(T.which)==="P",F=Si();F&&window.find(F,!1,nt)}return!0}function X(T){var F={search:u,help:o};
for(var z in F)T.on("click auxclick",'[data-action-name="'+z+'"]',function(Q){return function(nt){nt.
preventDefault(),nt.stopImmediatePropagation(),Q.call(this,nt)}}(F[z]))}var W=function(){(0,Ut.default)(
".without-selection").hide(),(0,Ut.default)(".with-selection").show()},v=function(){(0,Ut.default)("\
.without-selection").show(),(0,Ut.default)(".with-selection").hide()};function D(){y(),a.on("click",
"a",function(T){T.preventDefault(),T.shiftKey?rh((0,Ut.default)(T.target),a):Jl((0,Ut.default)(T.target).
attr("href")),y(!1)}),(0,Ut.default)(window).on("hashchange",function(T){T.preventDefault(),y()}),(0,Ut.default)(
document).on("keydown",function(T){(0,Ut.default)(T.target).is("input,textarea")||T.altKey||T.ctrlKey||
T.metaKey||$(T)}),(0,Ut.default)(document).mouseup(function(){var T=Si();T?W(T):v()}),X((0,Ut.default)(
".header .header-actions"))}setTimeout(function(){a.css({display:"block"}),D()},1)}var tl={};wi(tl,{init:()=>kh});var me=$e(er()),qt=$e(uu()),Ae=$e(Xf()),fi=$e(Yf()),Br=$e(Ba());var Zf=$e(er()),ui;(d=>{let e,n,a;function f(y){y!==void 0&&(e=y),e.on_connect&&setTimeout(e.on_connect,
0)}d.connect=f;function u(y){n=y,a==null&&o()}d.new_search=u;function o(){if(n){a=n,n=null;var y=a,b="\
/api/v1/search/";"backend"in y&&(b=b+y.backend);var _={q:y.q,fold_case:y.fold_case,regex:y.regex,repo:y.
repo},R=Zf.default.ajax({method:"POST",url:b,data:_,dataType:"json"}),$=new Date;R.done(function(X){
var W=new Date-$;X.results.forEach(function(v){e.match(y.id,v)}),X.file_results.forEach(function(v){
e.file_match(y.id,v)}),e.search_done(y.id,W,X.search_type,X.info.why)}),R.fail(function(X){if(window.
_err=X,X.status>=400&&X.status<500){var W=JSON.parse(X.responseText);e.error(y.id,W.error.message)}else{
var v="Cannot connect to server";X.status&&(v="Bad response "+X.status+" from server"),e.error(y.id,
v),console.log("server error",X.status,X.responseText)}}),R.always(function(){a=null,setTimeout(o,0)})}}})(
ui||(ui={}));var jt=$e(er()),tc=$e(Ba());function ec(){(0,jt.default)("#repos").selectpicker({actionsBox:!0,selectedTextFormat:"\
count > 4",countSelectedText:"({0} repositories)",noneSelectedText:"(all repositories)",liveSearch:!0,
width:"20em"}),(0,jt.default)("#repos").on("refreshed.bs.select",function(){var e=(0,jt.default)(this).
parent().find(".dropdown-header");e.css("cursor","pointer"),e.on("click",function(n){n.stopPropagation();
var a=(0,jt.default)('#repos optgroup[label="'+(0,jt.default)(this).text()+'"]'),f=!a.children("opti\
on:not(:selected)").length;a.children().prop("selected",!f),(0,jt.default)("#repos").selectpicker("r\
efresh").trigger("change")})}),(0,jt.default)(window).on("keyup",".bootstrap-select .bs-searchbox in\
put",function(e){var n=e.keyCode?e.keyCode:e.which;n=="13"&&((0,jt.default)(this).val(""),(0,jt.default)(
"#repos").selectpicker("refresh"))}),(0,jt.default)(window).keyup(function(e){var n=e.keyCode?e.keyCode:
e.which;n==9&&(0,jt.default)(".bootstrap-select button:focus").length&&((0,jt.default)("#repos").selectpicker(
"toggle"),(0,jt.default)(".bootstrap-select .bs-searchbox input").focus())})}function rc(e){var n=[];
if((0,jt.default)("#repos").find("option").each(function(){n.push((0,jt.default)(this).attr("value"))}),
!(0,tc.isEqual)(n,e)){(0,jt.default)("#repos").empty(),e.sort();var a=new Map;a.set("/",(0,jt.default)(
"#repos"));for(var f=0;f<e.length;f++){var u=e[f].split("/"),o=u.slice(0,u.length-1).join("/")+"/",d=u[u.
length-1];if(!a.has(o)){var y=(0,jt.default)("<optgroup>").attr("label",o);(0,jt.default)("#repos").
append(y),a.set(o,y)}a.get(o).append((0,jt.default)("<option>").attr("value",o+d).text(d))}a.clear(),
(0,jt.default)("#repos").selectpicker("refresh")}}function Is(e){(0,jt.default)("#repos").selectpicker(
"val",e)}var za=0,Ah={SLASH_OR_QUESTION_MARK:191};function _h(){return window.getSelection?window.getSelection().
toString():null}function Za(e){var n=/^refs\/(tags|branches)\/(.*)/.exec(e);return n?n[2]:(n=/^([0-9a-f]{8})[0-9a-f]+$/.
exec(e),n||(n=/^origin\/(.*)/.exec(e),n)?n[1]:e)}function nc(e,n,a,f){a=a.replace(/^\/+/,"");var u="\
/view/"+e+":"+n+":"+a;return f!==void 0&&(u+="#L"+f),u}function Nh(e,n,a,f,u){return u===void 0&&(u=
1),e.indexOf("/{path}")!==-1&&(f=f.replace(/^\/+/,"")),e=e.replace(/{lno}/g,u),e=e.replace(/{version}/g,
Za(a)),e=e.replace(/{name}/g,n),e=e.replace(/{basename}/g,n.split("/")[1]),e=e.replace(/{path}/g,f),
e}function ic(e,n,a,f,u){e=e.filter(function(b){return!b.whitelist_pattern||b.whitelist_pattern.test(
n+":"+a+":"+f)});var o=e.map(function(b){return(0,qt.default)("a",{className:"file-action-link",href:Nh(
b.url_template,n,a,f,u),target:b.target},b.label)});let d=[];for(var y=0;y<o.length;y++)y>0&&d.push(
(0,qt.default)("span",{className:"file-action-link-separator"},"\\u00B7")),d.push(o[y]);return d}var Wa=class extends Ae.View{constructor(n){
super({...n,tagName:"div"})}initialize(){this.model.on("change",this.render,this)}render(){var n=this.
_render();return this.setElement(n),this}_renderLno(n,a){var f=n.toString()+(a?":":"-"),u=["lno-link"];
return a&&u.push("matchlno"),(0,qt.default)("a",{className:u.join(" "),href:this.model.url(n)},(0,qt.default)(
"span",{className:"lno","aria-label":f},f))}_render(){var n,a=[],f=[],u=this.model.get("lno"),o=this.
model.get("context_before"),d=this.model.get("clip_before"),y=this.model.get("context_after"),b=this.
model.get("clip_after"),_=Math.max(0,o.length-(d||0));for(n=0;n<_;n++)a.unshift(this._renderLno(u-n-
1,!1),(0,qt.default)("span",null," ",this.model.get("context_before")[n]," "),(0,qt.default)("span",
null));var R=Math.max(0,y.length-(b||0));for(n=0;n<R;n++)f.push(this._renderLno(u+n+1,!1),(0,qt.default)(
"span",null," ",this.model.get("context_after")[n]," "),(0,qt.default)("span",null));var $=this.model.
get("line"),X=this.model.get("bounds"),W=[$.substring(0,X[0]),$.substring(X[0],X[1]),$.substring(X[1])],
v=["match"];d!==void 0&&v.push("clip-before"),b!==void 0&&v.push("clip-after");var D=ic(oe.linkConfigs.
filter(function(T){return T.url_template.includes("{lno}")}),this.model.get("tree"),this.model.get("\
version"),this.model.get("path"),u);return(0,qt.default)("div",{className:v.join(" ")},(0,qt.default)(
"div",{className:"contents"},a,this._renderLno(u,!0),(0,qt.default)("span",{className:"matchline"},W[0],
(0,qt.default)("span",{className:"matchstr"},W[1]),W[2]),(0,qt.default)("span",{className:"matchlink\
s"},D),f))}},Ua=class extends Ae.Model{path_info(){var n=this.get("tree"),a=this.get("version"),f=this.
get("path");return{id:n+":"+a+":"+f,tree:n,version:a,path:f}}url(n){return n===void 0&&(n=this.get("\
lno")),nc(this.get("tree"),this.get("version"),this.get("path"),n)}},ja=class extends Ae.Model{initialize(n){
this.id=n.id,this.path_info=n,this.matches=[]}add_match(n){this.matches.push(n)}process_context_overlaps(){
if(!(!this.matches||this.matches.length<2)){this.matches.sort(function($,X){return $.get("lno")-X.get(
"lno")});for(var n=1,a=this.matches.length;n<a;n++){var f=this.matches[n-1],u=this.matches[n],o=f.get(
"lno")+f.get("context_after").length,d=u.get("lno")-u.get("context_before").length,y=o-d+1;if(y>=0){
var b=parseInt(Math.ceil((f.get("lno")+u.get("lno"))/2),10);b<d?b=d:o+1<b&&(b=o+1);var _=o-(b-1),R=b-
d;f.set("clip_after",_),u.set("clip_before",R)}else f.unset("clip_after"),u.unset("clip_before")}}}},
Va=class extends Ae.Collection{add_match(n){var a=n.path_info(),f=this.get(a.id);f||(f=new ja(a),this.
add(f)),f.add_match(n)}num_matches(){return this.reduce(function(n,a){return n+a.matches.length},0)}},
Qa=class extends Ae.Model{path_info(){var n=this.get("tree"),a=this.get("version"),f=this.get("path");
return{id:n+":"+a+":"+f,tree:n,version:a,path:f,bounds:this.get("bounds")}}url(){return nc(this.get(
"tree"),this.get("version"),this.get("path"))}},Ka=class extends Ae.View{constructor(n){super({...n,
tagName:"div"})}render(){var n=this.model.path_info(),a=[n.path.substring(0,n.bounds[0]),n.path.substring(
n.bounds[0],n.bounds[1]),n.path.substring(n.bounds[1])],f=this.$el;return f.empty(),f.addClass("file\
name-match"),f.append((0,qt.default)("a",{className:"label header result-path",href:this.model.url()},
(0,qt.default)("span",{className:"repo"},n.tree,":"),(0,qt.default)("span",{className:"version"},Za(
n.version),":"),a[0],(0,qt.default)("span",{className:"matchstr"},a[1]),a[2])),this}},Xa=class extends Ae.Model{defaults(){
return{context:!0,displaying:null,error:null,search_type:"",time:null,why:null}}initialize(){this.search_map=
{},this.search_results=new Va,this.file_search_results=new Ae.Collection,this.search_id=0,this.on("c\
hange:displaying",this.new_search,this)}new_search(){this.set({error:null,time:null,why:null}),this.
search_results.reset(),this.file_search_results.reset();for(var n in this.search_map)parseInt(n)<this.
get("displaying")&&delete this.search_map[n]}next_id(){return++this.search_id}dispatch(n){var a=this.
search_map[this.get("displaying")];if(a&&a.q===n.q&&a.fold_case===n.fold_case&&a.regex===n.regex&&a.
backend===n.backend&&(0,Br.isEqual)(a.repo,n.repo))return!1;var f=this.next_id();return n.id=f,this.
search_map[f]={q:n.q,fold_case:n.fold_case,regex:n.regex,backend:n.backend,repo:n.repo},n.q.length?!0:
(this.set("displaying",f),!1)}url(){var n={},a=this.search_map[this.get("displaying")];if(!a)return"\
/search";var f="/search";a.q!==""&&(n.q=a.q,n.fold_case=a.fold_case,n.regex=a.regex,n.context=this.get(
"context"),n.repo=a.repo),a.backend?f+="/"+a.backend:oe.input_backend&&(f+="/"+oe.input_backend.val());
var u=me.default.param(n);return f+(u?"?"+u:"")}title(){var n=this.search_map[this.get("displaying")];
return!n||!n.q?"code search":n.q+" \u22C5 search"}handle_error(n,a){n===this.search_id&&(this.set("d\
isplaying",n),this.set("error",a))}handle_match(n,a){if(n<this.get("displaying"))return!1;this.set("\
displaying",n);var f=(0,Br.clone)(a);f.backend=this.search_map[n].backend,this.search_results.add_match(
new Ua(f))}handle_file_match(n,a){if(n<this.get("displaying"))return!1;this.set("displaying",n);var f=(0,Br.clone)(
a);f.backend=this.search_map[n].backend,this.file_search_results.add(new Qa(f))}handle_done(n,a,f,u){
if(n<this.get("displaying"))return!1;this.set("displaying",n),this.set({time:a,search_type:f,why:u}),
this.search_results.trigger("search-complete")}},Ja=class extends Ae.View{constructor(n){super({...n,
tagName:"div"})}render_header(n,a,f){var u,o,d=f.lastIndexOf("/");d!==-1?(u=f.substring(d+1,f.length),
o=f.substring(0,d+1)):(u=f,o="");var y=this.model.matches[0];return(0,qt.default)("div",{className:"\
header"},(0,qt.default)("span",{className:"header-path"},(0,qt.default)("a",{className:"result-path",
href:y.url()},(0,qt.default)("span",{className:"repo"},n,":"),(0,qt.default)("span",{className:"vers\
ion"},Za(a),":"),o,(0,qt.default)("span",{className:"filename"},u)),(0,qt.default)("div",{className:"\
header-links"},ic(oe.linkConfigs,n,a,f,y.get("lno")))))}render(){var n=this.model.matches,a=this.$el;
return a.empty(),a.append(this.render_header(this.model.path_info.tree,this.model.path_info.version,
this.model.path_info.path)),n.forEach(function(f){a.append(new Wa({model:f}).render().el)}),a.addClass(
"file-group"),this}},Ga=class extends Ae.View{constructor(n){super({...n,tagName:"div",events:{"clic\
k .file-extension":"_limitExtension",keydown:"_handleKey"}})}initialize(){this.setElement((0,me.default)(
"#results")),this.model.search_results.on("search-complete",this.render,this),this.model.search_results.
on("rerender",this.render,this)}render(){this.$el.empty();var n={},a=function(b){var _=/[^\/](\.[a-z.]{1,6})$/i,
R=b.match(_);if(R){var $=R[1];n[$]=n[$]?n[$]+1:1}},f=0;let u=[];this.model.file_search_results.each(
function(b){if(this.model.get("search_type")=="filename_only"||f<10){var _=new Ka({model:b});u.push(
_.render().el)}a(b.attributes.path),f+=1},this),this.$el.append((0,qt.default)("div",{className:"pat\
h-results"},u)),this.model.search_results.each(function(b){b.process_context_overlaps();var _=new Ja(
{model:b});this.$el.append(_.render().el),a(b.path_info.path)},this);var o=this.model.search_id,d=this.
model.search_map[o].q,y=/\bfile:/.test(d);return y||this._render_extension_buttons(n),this}_render_extension_buttons(n){
var a=[];for(var f in n)a.push([n[f],f]);if(a.length<2)return;a.sort(function(_,R){return R[0]-_[0]});
for(var u=[],o=Math.min(a.length,5),d=0;d<o;d++)u.push(a[d][1]);u.sort();var y="Narrow to:";let b=[];
for(var d=0;d<u.length;d++)b.push((0,qt.default)("button",{className:"file-extension"},u[d]));this.$el.
prepend((0,qt.default)("div",{className:"file-extensions"},y,b))}_limitExtension(n){var a=n.target.textContent,
f=oe.input.val();oe.input_regex.is(":checked")?f="file:\\"+a+"$ "+f:f="file:"+a+" "+f,oe.input.val(f),
oe.newsearch()}_handleKey(n){if(!(n.altKey||n.ctrlKey||n.metaKey||n.shiftKey)){var a=n.which;if(a===
Ah.SLASH_OR_QUESTION_MARK){var f=_h();if(!f)return;n.preventDefault(),oe.input_regex.is(":checked")&&
(f=f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),za=0,oe.input.val(f),oe.newsearch()}}}},Ya=class extends Ae.View{initialize(){
this.setElement((0,me.default)("#resultarea")),this.matches_view=new Ga({model:this.model}),this.results=
this.$("#numresults"),this.errorbox=(0,me.default)("#regex-error"),this.time=this.$("#searchtime"),this.
last_url=null,this.last_title=null,this.model.on("all",this.render,this),this.model.search_results.on(
"all",this.render,this)}render(){if(this.model.get("displaying")!==null){this.model.get("error")?(this.
errorbox.find("#errortext").text(this.model.get("error")),this.errorbox.show()):this.errorbox.hide();
var n=this.model.url();if(this.last_url!==n){if(history.pushState){var a=window.location.pathname+window.
location.search;if(a!==n){var f=Date.now(),u=2e3;this.last_url===null?history.replaceState(null,"",n):
f-za>u?history.pushState(null,"",n):history.replaceState(null,"",n),za=f}}this.last_url=n}var o=this.
model.title();if(this.last_title!==o&&(document.title=o,this.last_title=o),this.model.search_map[this.
model.get("displaying")].q===""||this.model.get("error"))return this.$el.hide(),(0,me.default)("#hel\
parea").show(),this;if((0,me.default)("#results").toggleClass("no-context",!this.model.get("context")),
this.$el.show(),(0,me.default)("#helparea").hide(),this.model.get("time")){this.$("#searchtimebox").
show();var d=this.model.get("time");this.time.text(d+" \xB5s")}else this.$("#searchtimebox").hide();
var y;return this.model.get("search_type")=="filename_only"?y=""+this.model.file_search_results.length:
y=""+this.model.search_results.num_matches(),this.model.get("why")!=="NONE"&&(y=y+"+"),this.results.
text(y),this}}},oe;(lt=>{lt.repo_urls={};let f=new Xa,u,b,_,R,$;function X(){lt.input||(u=new Ya({model:f}),
lt.input=(0,me.default)("#searchbox"),b=(0,me.default)("#repos"),lt.input_backend=(0,me.default)("#b\
ackend"),lt.input_backend.length==0&&(lt.input_backend=null),_=(0,me.default)("input[name=fold_case]"),
lt.input_regex=(0,me.default)("input[name=regex]"),R=(0,me.default)("input[name=context]"),_.filter(
":checked").length==0&&_.filter("[value=auto]").attr("checked",!0),ec(),ut(),v(),lt.input.keydown(i),
lt.input.bind("paste",i),lt.input.focus(),lt.input_backend&&lt.input_backend.change(nt),_.change(i),
lt.input_regex.change(i),b.change(i),R.change(W),lt.input_regex.change(function(){F("regex",lt.input_regex.
prop("checked"))}),b.change(function(){F("repos",b.val())}),R.change(function(){F("context",R.prop("\
checked"))}),W(),ui.connect(lt),(0,me.default)(".query-hint code").click(function(it){var pt=it.target.
textContent,ft=lt.input.val();!ft.includes(pt)&&(pt.indexOf("-")==0&&!ft.includes(pt.substring(1))||
pt.indexOf("-")!=0&&!ft.includes("-"+pt.substring))&&(ft=ft+" "+pt),lt.input.val(ft),lt.input.focus()}),
window.onpopstate=function(it){var pt=z();D(pt),tt()})}lt.onload=X;function W(){f.set("context",R.prop(
"checked"))}lt.toggle_context=W;function v(){var it=z(),pt=!1;for(var ft in it){pt=!0;break}pt?D(it):
T(),setTimeout(i,0)}lt.init_query=v;function D(it){var pt=[];it.q&&pt.push(it.q[0]),it.file&&pt.push(
"file:"+it.file[0]),lt.input.val(pt.join(" ")),it.fold_case&&_.filter("[value="+it.fold_case[0]+"]").
attr("checked",!0),it.regex&&lt.input_regex.prop("checked",it.regex[0]==="true"),it.context&&R.prop(
"checked",it.context[0]==="true");var ft=null;it.backend&&(ft=it.backend);var m;if((m=new RegExp("/s\
earch/([^/]+)/?").exec(window.location.pathname))&&(ft=m[1]),ft&&lt.input_backend){var C=lt.input_backend.
val();lt.input_backend.val(ft),lt.input_backend.val()===null&&lt.input_backend.val(C)}var I=[];it.repo&&
(I=I.concat(it.repo)),it["repo[]"]&&(I=I.concat(it["repo[]"])),Is(I)}lt.init_query_from_parms=D;function T(){
var it=(0,fi.getJSON)("prefs");it||(it={}),it.regex!==void 0&&lt.input_regex.prop("checked",it.regex),
it.repos!==void 0?Is(it.repos):lt.defaultSearchRepos!==void 0&&Is(lt.defaultSearchRepos),it.context!==
void 0&&R.prop("checked",it.context)}lt.init_controls_from_prefs=T;function F(it,pt){var ft=(0,fi.getJSON)(
"prefs");ft||(ft={}),ft[it]=pt,(0,fi.set)("prefs",ft,{expires:36500})}lt.set_pref=F;function z(){for(var it={},
pt,ft=/\+/g,m=/([^&=]+)=?([^&]*)/g,C=function(q){return decodeURIComponent(q.replace(ft," "))},I=window.
location.search.substring(1);pt=m.exec(I);)it[C(pt[1])]?it[C(pt[1])].push(C(pt[2])):it[C(pt[1])]=[C(
pt[2])];return it}lt.parse_query_params=z;function Q(){tt()}lt.on_connect=Q;function nt(){lt.input_backend&&
(ut(),i())}lt.select_backend=nt;function ut(){if(lt.input_backend){var it=lt.input_backend.val();rc(
(0,Br.keys)(lt.repo_urls[it]))}}lt.update_repo_options=ut;function i(){et(),$=setTimeout(tt,125)}lt.
keypress=i;function tt(){et();var it={q:lt.input.val(),fold_case:_.filter(":checked").val(),regex:lt.
input_regex.is(":checked"),repo:b.val()};lt.input_backend&&(it.backend=lt.input_backend.val()),f.dispatch(
it)&&ui.new_search(it)}lt.newsearch=tt;function et(){$&&(clearTimeout($),$=null)}lt.clear_timer=et;function at(it,pt){
f.handle_error(it,pt)}lt.error=at;function Tt(it,pt){f.handle_match(it,pt)}lt.match=Tt;function wt(it,pt){
f.handle_file_match(it,pt)}lt.file_match=wt;function mt(it,pt,ft,m){f.handle_done(it,pt,ft,m)}lt.search_done=
mt})(oe||(oe={}));function kh(e){oe.repo_urls=e.repo_urls,oe.defaultSearchRepos=e.default_search_repos,
oe.linkConfigs=(e.link_configs||[]).map(function(n){return n.whitelist_pattern&&(n.whitelist_pattern=
new RegExp(n.whitelist_pattern)),n}),oe.onload()}var Ih={codesearch:tl,fileview:eo};(0,sc.default)(function(){window.page&&Ih[window.page].init(window.
scriptData)});})();
/*! For license information please see app.js.LEGAL.txt */
//# sourceMappingURL=app.js.map
