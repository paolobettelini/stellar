(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q))b[q]=a[q]}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(r.__proto__&&r.__proto__.p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){a.prototype.__proto__=b.prototype
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++)inherit(b[s],a)}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazyOld(a,b,c,d){var s=a
a[b]=s
a[c]=function(){a[c]=function(){A.ut(b)}
var r
var q=d
try{if(a[b]===s){r=a[b]=q
r=a[b]=d()}else r=a[b]}finally{if(r===q)a[b]=null
a[c]=function(){return this[b]}}return r}}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s)a[b]=d()
a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s)A.F(b)
a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a){a.immutable$list=Array
a.fixed$length=Array
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s)convertToFastObject(a[s])}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.nk(b)
return new s(c,this)}:function(){if(s===null)s=A.nk(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.nk(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number")h+=x
return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,lazyOld:lazyOld,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var A={mK:function mK(){},
jf(a,b,c){if(b.h("Q<0>").b(a))return new A.eW(a,b.h("@<0>").Z(c).h("eW<1,2>"))
return new A.cD(a,b.h("@<0>").Z(c).h("cD<1,2>"))},
qE(a){return new A.el("Field '"+a+"' has been assigned during initialization.")},
mM(a){return new A.el("Field '"+a+"' has not been initialized.")},
mk(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
cl(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
mW(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
ok(a,b,c){return A.mW(A.cl(A.cl(c,a),b))},
fp(a,b,c){return a},
bf(a,b,c,d){A.bd(b,"start")
if(c!=null){A.bd(c,"end")
if(b>c)A.M(A.a0(b,0,c,"start",null))}return new A.aD(a,b,c,d.h("aD<0>"))},
ke(a,b,c,d){if(t.gt.b(a))return new A.dZ(a,b,c.h("@<0>").Z(d).h("dZ<1,2>"))
return new A.cN(a,b,c.h("@<0>").Z(d).h("cN<1,2>"))},
oh(a,b,c){var s="count"
if(t.gt.b(a)){A.iX(b,s,t.S)
A.bd(b,s)
return new A.d7(a,b,c.h("d7<0>"))}A.iX(b,s,t.S)
A.bd(b,s)
return new A.c_(a,b,c.h("c_<0>"))},
ah(){return new A.ck("No element")},
qz(){return new A.ck("Too few elements")},
oi(a,b,c){A.hP(a,0,J.N(a)-1,b,c)},
hP(a,b,c,d,e){if(c-b<=32)A.ra(a,b,c,d,e)
else A.r9(a,b,c,d,e)},
ra(a,b,c,d,e){var s,r,q,p,o,n
for(s=b+1,r=J.X(a);s<=c;++s){q=r.i(a,s)
p=s
while(!0){if(p>b){o=d.$2(r.i(a,p-1),q)
if(typeof o!=="number")return o.bw()
o=o>0}else o=!1
if(!o)break
n=p-1
r.v(a,p,r.i(a,n))
p=n}r.v(a,p,q)}},
r9(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j=B.d.aR(a5-a4+1,6),i=a4+j,h=a5-j,g=B.d.aR(a4+a5,2),f=g-j,e=g+j,d=J.X(a3),c=d.i(a3,i),b=d.i(a3,f),a=d.i(a3,g),a0=d.i(a3,e),a1=d.i(a3,h),a2=a6.$2(c,b)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=b
b=c
c=s}a2=a6.$2(a0,a1)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=a1
a1=a0
a0=s}a2=a6.$2(c,a)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=a
a=c
c=s}a2=a6.$2(b,a)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=a
a=b
b=s}a2=a6.$2(c,a0)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=a0
a0=c
c=s}a2=a6.$2(a,a0)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=a0
a0=a
a=s}a2=a6.$2(b,a1)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=a1
a1=b
b=s}a2=a6.$2(b,a)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=a
a=b
b=s}a2=a6.$2(a0,a1)
if(typeof a2!=="number")return a2.bw()
if(a2>0){s=a1
a1=a0
a0=s}d.v(a3,i,c)
d.v(a3,g,a)
d.v(a3,h,a1)
d.v(a3,f,d.i(a3,a4))
d.v(a3,e,d.i(a3,a5))
r=a4+1
q=a5-1
if(J.U(a6.$2(b,a0),0)){for(p=r;p<=q;++p){o=d.i(a3,p)
n=a6.$2(o,b)
if(n===0)continue
if(n<0){if(p!==r){d.v(a3,p,d.i(a3,r))
d.v(a3,r,o)}++r}else for(;!0;){n=a6.$2(d.i(a3,q),b)
if(n>0){--q
continue}else{m=q-1
if(n<0){d.v(a3,p,d.i(a3,r))
l=r+1
d.v(a3,r,d.i(a3,q))
d.v(a3,q,o)
q=m
r=l
break}else{d.v(a3,p,d.i(a3,q))
d.v(a3,q,o)
q=m
break}}}}k=!0}else{for(p=r;p<=q;++p){o=d.i(a3,p)
if(a6.$2(o,b)<0){if(p!==r){d.v(a3,p,d.i(a3,r))
d.v(a3,r,o)}++r}else if(a6.$2(o,a0)>0)for(;!0;)if(a6.$2(d.i(a3,q),a0)>0){--q
if(q<p)break
continue}else{m=q-1
if(a6.$2(d.i(a3,q),b)<0){d.v(a3,p,d.i(a3,r))
l=r+1
d.v(a3,r,d.i(a3,q))
d.v(a3,q,o)
r=l}else{d.v(a3,p,d.i(a3,q))
d.v(a3,q,o)}q=m
break}}k=!1}a2=r-1
d.v(a3,a4,d.i(a3,a2))
d.v(a3,a2,b)
a2=q+1
d.v(a3,a5,d.i(a3,a2))
d.v(a3,a2,a0)
A.hP(a3,a4,r-2,a6,a7)
A.hP(a3,q+2,a5,a6,a7)
if(k)return
if(r<i&&q>h){for(;J.U(a6.$2(d.i(a3,r),b),0);)++r
for(;J.U(a6.$2(d.i(a3,q),a0),0);)--q
for(p=r;p<=q;++p){o=d.i(a3,p)
if(a6.$2(o,b)===0){if(p!==r){d.v(a3,p,d.i(a3,r))
d.v(a3,r,o)}++r}else if(a6.$2(o,a0)===0)for(;!0;)if(a6.$2(d.i(a3,q),a0)===0){--q
if(q<p)break
continue}else{m=q-1
if(a6.$2(d.i(a3,q),b)<0){d.v(a3,p,d.i(a3,r))
l=r+1
d.v(a3,r,d.i(a3,q))
d.v(a3,q,o)
r=l}else{d.v(a3,p,d.i(a3,q))
d.v(a3,q,o)}q=m
break}}A.hP(a3,r,q,a6,a7)}else A.hP(a3,r,q,a6,a7)},
cq:function cq(){},
dS:function dS(a,b){this.a=a
this.$ti=b},
cD:function cD(a,b){this.a=a
this.$ti=b},
eW:function eW(a,b){this.a=a
this.$ti=b},
eT:function eT(){},
lm:function lm(a,b){this.a=a
this.b=b},
aU:function aU(a,b){this.a=a
this.$ti=b},
el:function el(a){this.a=a},
a9:function a9(a){this.a=a},
mu:function mu(){},
kK:function kK(){},
Q:function Q(){},
B:function B(){},
aD:function aD(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
O:function O(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cN:function cN(a,b,c){this.a=a
this.b=b
this.$ti=c},
dZ:function dZ(a,b,c){this.a=a
this.b=b
this.$ti=c},
cO:function cO(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
J:function J(a,b,c){this.a=a
this.b=b
this.$ti=c},
am:function am(a,b,c){this.a=a
this.b=b
this.$ti=c},
cW:function cW(a,b,c){this.a=a
this.b=b
this.$ti=c},
e3:function e3(a,b,c){this.a=a
this.b=b
this.$ti=c},
e4:function e4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
c_:function c_(a,b,c){this.a=a
this.b=b
this.$ti=c},
d7:function d7(a,b,c){this.a=a
this.b=b
this.$ti=c},
eE:function eE(a,b,c){this.a=a
this.b=b
this.$ti=c},
e0:function e0(a){this.$ti=a},
e1:function e1(a){this.$ti=a},
ar:function ar(a,b){this.a=a
this.$ti=b},
cX:function cX(a,b){this.a=a
this.$ti=b},
bm:function bm(){},
bE:function bE(){},
dv:function dv(){},
Y:function Y(a,b){this.a=a
this.$ti=b},
fg:function fg(){},
qs(a){if(typeof a=="number")return B.h.gX(a)
if(t.f5.b(a))return A.bR(a)
return A.ns(a)},
qt(a){return new A.jB(a)},
pH(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
uc(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
l(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bL(a)
return s},
bR(a){var s,r=$.o7
if(r==null)r=$.o7=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
o8(a,b){var s,r,q,p,o,n=null,m=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(m==null)return n
if(3>=m.length)return A.c(m,3)
s=m[3]
if(b==null){if(s!=null)return parseInt(a,10)
if(m[2]!=null)return parseInt(a,16)
return n}if(b<2||b>36)throw A.d(A.a0(b,2,36,"radix",n))
if(b===10&&s!=null)return parseInt(a,10)
if(b<10||s==null){r=b<=10?47+b:86+b
q=m[1]
for(p=q.length,o=0;o<p;++o)if((B.b.E(q,o)|32)>r)return n}return parseInt(a,b)},
qU(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.b.ez(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
kz(a){return A.qS(a)},
qS(a){var s,r,q,p
if(a instanceof A.K)return A.b2(A.aA(a),null)
s=J.bi(a)
if(s===B.b1||s===B.b3||t.cx.b(a)){r=B.a7(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.b2(A.aA(a),null)},
qT(){if(!!self.location)return self.location.href
return null},
o6(a){var s,r,q,p,o=a.length
if(o<=500)return String.fromCharCode.apply(null,a)
for(s="",r=0;r<o;r=q){q=r+500
p=q<o?q:o
s+=String.fromCharCode.apply(null,a.slice(r,p))}return s},
qV(a){var s,r,q,p=A.a([],t.t)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.e)(a),++r){q=a[r]
if(!A.m_(q))throw A.d(A.fo(q))
if(q<=65535)B.a.p(p,q)
else if(q<=1114111){B.a.p(p,55296+(B.d.cW(q-65536,10)&1023))
B.a.p(p,56320+(q&1023))}else throw A.d(A.fo(q))}return A.o6(p)},
o9(a){var s,r,q
for(s=a.length,r=0;r<s;++r){q=a[r]
if(!A.m_(q))throw A.d(A.fo(q))
if(q<0)throw A.d(A.fo(q))
if(q>65535)return A.qV(a)}return A.o6(a)},
qW(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
bc(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.d.cW(s,10)|55296)>>>0,s&1023|56320)}}throw A.d(A.a0(a,0,1114111,null,null))},
bj(a){throw A.d(A.fo(a))},
c(a,b){if(a==null)J.N(a)
throw A.d(A.cu(a,b))},
cu(a,b){var s,r="index"
if(!A.m_(b))return new A.bM(!0,b,r,null)
s=A.a_(J.N(a))
if(b<0||b>=s)return A.hf(b,a,r,null,s)
return A.kA(b,r)},
tX(a,b,c){if(a<0||a>c)return A.a0(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.a0(b,a,c,"end",null)
return new A.bM(!0,b,"end",null)},
fo(a){return new A.bM(!0,a,null,null)},
d(a){var s,r
if(a==null)a=new A.hr()
s=new Error()
s.dartException=a
r=A.uu
if("defineProperty" in Object){Object.defineProperty(s,"message",{get:r})
s.name=""}else s.toString=r
return s},
uu(){return J.bL(this.dartException)},
M(a){throw A.d(a)},
e(a){throw A.d(A.av(a))},
c2(a){var s,r,q,p,o,n
a=A.nu(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.a([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.kU(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
kV(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
op(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
mL(a,b){var s=b==null,r=s?null:b.method
return new A.hi(a,r,s?null:b.receiver)},
bw(a){var s
if(a==null)return new A.hs(a)
if(a instanceof A.e2){s=a.a
return A.cx(a,s==null?t.K.a(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.cx(a,a.dartException)
return A.tJ(a)},
cx(a,b){if(t.fz.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
tJ(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=null
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.d.cW(r,16)&8191)===10)switch(q){case 438:return A.cx(a,A.mL(A.l(s)+" (Error "+q+")",e))
case 445:case 5007:p=A.l(s)
return A.cx(a,new A.eu(p+" (Error "+q+")",e))}}if(a instanceof TypeError){o=$.pM()
n=$.pN()
m=$.pO()
l=$.pP()
k=$.pS()
j=$.pT()
i=$.pR()
$.pQ()
h=$.pV()
g=$.pU()
f=o.bp(s)
if(f!=null)return A.cx(a,A.mL(A.ay(s),f))
else{f=n.bp(s)
if(f!=null){f.method="call"
return A.cx(a,A.mL(A.ay(s),f))}else{f=m.bp(s)
if(f==null){f=l.bp(s)
if(f==null){f=k.bp(s)
if(f==null){f=j.bp(s)
if(f==null){f=i.bp(s)
if(f==null){f=l.bp(s)
if(f==null){f=h.bp(s)
if(f==null){f=g.bp(s)
p=f!=null}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0}else p=!0
if(p){A.ay(s)
return A.cx(a,new A.eu(s,f==null?e:f.method))}}}return A.cx(a,new A.i2(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.eG()
s=function(b){try{return String(b)}catch(d){}return null}(a)
return A.cx(a,new A.bM(!1,e,e,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.eG()
return a},
cv(a){var s
if(a instanceof A.e2)return a.b
if(a==null)return new A.f5(a)
s=a.$cachedTrace
if(s!=null)return s
return a.$cachedTrace=new A.f5(a)},
ns(a){if(a==null||typeof a!="object")return J.aL(a)
else return A.bR(a)},
pi(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.v(0,a[s],a[r])}return b},
ua(a,b,c,d,e,f){t.gY.a(a)
switch(A.a_(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.d(new A.it("Unsupported number of arguments for wrapped closure"))},
dG(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.ua)
a.$identity=s
return s},
ql(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.hU().constructor.prototype):Object.create(new A.d3(null,null).constructor.prototype)
s.$initialize=s.constructor
if(h)r=function static_tear_off(){this.$initialize()}
else r=function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.nQ(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.qh(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.nQ(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
qh(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.d("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.qd)}throw A.d("Error in functionType of tearoff")},
qi(a,b,c,d){var s=A.nO
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
nQ(a,b,c,d){var s,r
if(c)return A.qk(a,b,d)
s=b.length
r=A.qi(s,d,a,b)
return r},
qj(a,b,c,d){var s=A.nO,r=A.qe
switch(b?-1:a){case 0:throw A.d(new A.hI("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
qk(a,b,c){var s,r
if($.nM==null)$.nM=A.nL("interceptor")
if($.nN==null)$.nN=A.nL("receiver")
s=b.length
r=A.qj(s,c,a,b)
return r},
nk(a){return A.ql(a)},
qd(a,b){return A.lN(v.typeUniverse,A.aA(a.a),b)},
nO(a){return a.a},
qe(a){return a.b},
nL(a){var s,r,q,p=new A.d3("receiver","interceptor"),o=J.k6(Object.getOwnPropertyNames(p),t.iD)
for(s=o.length,r=0;r<s;++r){q=o[r]
if(p[q]===a)return q}throw A.d(A.a8("Field name "+a+" not found.",null))},
az(a){if(a==null)A.tK("boolean expression must not be null")
return a},
tK(a){throw A.d(new A.id(a))},
ut(a){throw A.d(new A.fY(a))},
u2(a){return v.getIsolateTag(a)},
o1(a,b,c){var s=new A.cL(a,b,c.h("cL<0>"))
s.c=a.e
return s},
vg(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ue(a){var s,r,q,p,o,n=A.ay($.pn.$1(a)),m=$.ma[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.mo[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.iJ($.pb.$2(a,n))
if(q!=null){m=$.ma[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.mo[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.mt(s)
$.ma[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.mo[n]=s
return s}if(p==="-"){o=A.mt(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.pz(a,s)
if(p==="*")throw A.d(A.i1(n))
if(v.leafTags[n]===true){o=A.mt(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.pz(a,s)},
pz(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.nr(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
mt(a){return J.nr(a,!1,null,!!a.$idd)},
ug(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.mt(s)
else return J.nr(s,c,null,null)},
u7(){if(!0===$.nn)return
$.nn=!0
A.u8()},
u8(){var s,r,q,p,o,n,m,l
$.ma=Object.create(null)
$.mo=Object.create(null)
A.u6()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.pB.$1(o)
if(n!=null){m=A.ug(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
u6(){var s,r,q,p,o,n,m=B.aS()
m=A.dF(B.aT,A.dF(B.aU,A.dF(B.a8,A.dF(B.a8,A.dF(B.aV,A.dF(B.aW,A.dF(B.aX(B.a7),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(s.constructor==Array)for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.pn=new A.ml(p)
$.pb=new A.mm(o)
$.pB=new A.mn(n)},
dF(a,b){return a(b)||b},
mJ(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=f?"g":"",n=function(g,h){try{return new RegExp(g,h)}catch(m){return m}}(a,s+r+q+p+o)
if(n instanceof RegExp)return n
throw A.d(A.aI("Illegal RegExp pattern ("+String(n)+")",a,null))},
cy(a,b,c){var s
if(typeof b=="string")return a.indexOf(b,c)>=0
else if(b instanceof A.cJ){s=B.b.ar(a,c)
return b.b.test(s)}else{s=J.mC(b,B.b.ar(a,c))
return!s.gah(s)}},
ph(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
nu(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bv(a,b,c){var s
if(typeof b=="string")return A.uq(a,b,c)
if(b instanceof A.cJ){s=b.giu()
s.lastIndex=0
return a.replace(s,A.ph(c))}return A.up(a,b,c)},
up(a,b,c){var s,r,q,p
for(s=J.mC(b,a),s=s.gH(s),r=0,q="";s.m();){p=s.gu()
q=q+a.substring(r,p.gS(p))+c
r=p.gV()}s=q+a.substring(r)
return s.charCodeAt(0)==0?s:s},
uq(a,b,c){var s,r,q,p
if(b===""){if(a==="")return c
s=a.length
r=""+c
for(q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}p=a.indexOf(b,0)
if(p<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.nu(b),"g"),A.ph(c))},
ur(a,b,c,d){var s=a.indexOf(b,d)
if(s<0)return a
return A.pG(a,s,s+b.length,c)},
pG(a,b,c,d){return a.substring(0,b)+d+a.substring(c)},
d6:function d6(){},
u:function u(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
eU:function eU(a,b){this.a=a
this.$ti=b},
ca:function ca(a,b){this.a=a
this.$ti=b},
jB:function jB(a){this.a=a},
eg:function eg(){},
cb:function cb(a,b){this.a=a
this.$ti=b},
kU:function kU(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eu:function eu(a,b){this.a=a
this.b=b},
hi:function hi(a,b,c){this.a=a
this.b=b
this.c=c},
i2:function i2(a){this.a=a},
hs:function hs(a){this.a=a},
e2:function e2(a,b){this.a=a
this.b=b},
f5:function f5(a){this.a=a
this.b=null},
aV:function aV(){},
fT:function fT(){},
fU:function fU(){},
hW:function hW(){},
hU:function hU(){},
d3:function d3(a,b){this.a=a
this.b=b},
hI:function hI(a){this.a=a},
id:function id(a){this.a=a},
bo:function bo(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
k8:function k8(a){this.a=a},
ka:function ka(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
aX:function aX(a,b){this.a=a
this.$ti=b},
cL:function cL(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
ml:function ml(a){this.a=a},
mm:function mm(a){this.a=a},
mn:function mn(a){this.a=a},
cJ:function cJ(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
dA:function dA(a){this.b=a},
ic:function ic(a,b,c){this.a=a
this.b=b
this.c=c},
dx:function dx(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
dt:function dt(a,b){this.a=a
this.c=b},
iB:function iB(a,b,c){this.a=a
this.b=b
this.c=c},
iC:function iC(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
b(a){return A.M(A.mM(a))},
F(a){return A.M(A.qE(a))},
rz(a){var s=new A.ln(a)
return s.b=s},
ln:function ln(a){this.a=a
this.b=null},
nd(a){return a},
qM(a){return new Int8Array(a)},
lU(a,b,c){if(a>>>0!==a||a>=c)throw A.d(A.cu(b,a))},
tb(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.d(A.tX(a,b,c))
return b},
ho:function ho(){},
di:function di(){},
es:function es(){},
hn:function hn(){},
et:function et(){},
cP:function cP(){},
f2:function f2(){},
f3:function f3(){},
od(a,b){var s=b.c
return s==null?b.c=A.n7(a,b.y,!0):s},
oc(a,b){var s=b.c
return s==null?b.c=A.fa(a,"bn",[b.y]):s},
oe(a){var s=a.x
if(s===6||s===7||s===8)return A.oe(a.y)
return s===11||s===12},
r1(a){return a.at},
aQ(a){return A.iG(v.typeUniverse,a,!1)},
u9(a,b){var s,r,q,p,o
if(a==null)return null
s=b.z
r=a.as
if(r==null)r=a.as=new Map()
q=b.at
p=r.get(q)
if(p!=null)return p
o=A.c6(v.typeUniverse,a.y,s,0)
r.set(q,o)
return o},
c6(a,b,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.x
switch(c){case 5:case 1:case 2:case 3:case 4:return b
case 6:s=b.y
r=A.c6(a,s,a0,a1)
if(r===s)return b
return A.oG(a,r,!0)
case 7:s=b.y
r=A.c6(a,s,a0,a1)
if(r===s)return b
return A.n7(a,r,!0)
case 8:s=b.y
r=A.c6(a,s,a0,a1)
if(r===s)return b
return A.oF(a,r,!0)
case 9:q=b.z
p=A.fn(a,q,a0,a1)
if(p===q)return b
return A.fa(a,b.y,p)
case 10:o=b.y
n=A.c6(a,o,a0,a1)
m=b.z
l=A.fn(a,m,a0,a1)
if(n===o&&l===m)return b
return A.n5(a,n,l)
case 11:k=b.y
j=A.c6(a,k,a0,a1)
i=b.z
h=A.tG(a,i,a0,a1)
if(j===k&&h===i)return b
return A.oE(a,j,h)
case 12:g=b.z
a1+=g.length
f=A.fn(a,g,a0,a1)
o=b.y
n=A.c6(a,o,a0,a1)
if(f===g&&n===o)return b
return A.n6(a,n,f,!0)
case 13:e=b.y
if(e<a1)return b
d=a0[e-a1]
if(d==null)return b
return d
default:throw A.d(A.j8("Attempted to substitute unexpected RTI kind "+c))}},
fn(a,b,c,d){var s,r,q,p,o=b.length,n=A.lQ(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.c6(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
tH(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.lQ(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.c6(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
tG(a,b,c,d){var s,r=b.a,q=A.fn(a,r,c,d),p=b.b,o=A.fn(a,p,c,d),n=b.c,m=A.tH(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.iv()
s.a=q
s.b=o
s.c=m
return s},
a(a,b){a[v.arrayRti]=b
return a},
nl(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.u4(s)
return a.$S()}return null},
pp(a,b){var s
if(A.oe(b))if(a instanceof A.aV){s=A.nl(a)
if(s!=null)return s}return A.aA(a)},
aA(a){var s
if(a instanceof A.K){s=a.$ti
return s!=null?s:A.ne(a)}if(Array.isArray(a))return A.v(a)
return A.ne(J.bi(a))},
v(a){var s=a[v.arrayRti],r=t.m
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
D(a){var s=a.$ti
return s!=null?s:A.ne(a)},
ne(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.tn(a,s)},
tn(a,b){var s=a instanceof A.aV?a.__proto__.__proto__.constructor:b,r=A.rV(v.typeUniverse,s.name)
b.$ccache=r
return r},
u4(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iG(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
dH(a){var s=a instanceof A.aV?A.nl(a):null
return A.nm(s==null?A.aA(a):s)},
nm(a){var s,r,q,p=a.w
if(p!=null)return p
s=a.at
r=s.replace(/\*/g,"")
if(r===s)return a.w=new A.f8(a)
q=A.iG(v.typeUniverse,r,!0)
p=q.w
return a.w=p==null?q.w=new A.f8(q):p},
uv(a){return A.nm(A.iG(v.typeUniverse,a,!1))},
tm(a){var s,r,q,p,o=this
if(o===t.K)return A.dD(o,a,A.tt)
if(!A.c7(o))if(!(o===t._))s=!1
else s=!0
else s=!0
if(s)return A.dD(o,a,A.tw)
s=o.x
r=s===6?o.y:o
if(r===t.S)q=A.m_
else if(r===t.W||r===t.p)q=A.ts
else if(r===t.N)q=A.tu
else q=r===t.k4?A.p0:null
if(q!=null)return A.dD(o,a,q)
if(r.x===9){p=r.y
if(r.z.every(A.ud)){o.r="$i"+p
if(p==="k")return A.dD(o,a,A.tr)
return A.dD(o,a,A.tv)}}else if(s===7)return A.dD(o,a,A.tk)
return A.dD(o,a,A.ti)},
dD(a,b,c){a.b=c
return a.b(b)},
tl(a){var s,r=this,q=A.th
if(!A.c7(r))if(!(r===t._))s=!1
else s=!0
else s=!0
if(s)q=A.t8
else if(r===t.K)q=A.t7
else{s=A.fr(r)
if(s)q=A.tj}r.a=q
return r.a(a)},
m0(a){var s,r=a.x
if(!A.c7(a))if(!(a===t._))if(!(a===t.eK))if(r!==7)s=r===8&&A.m0(a.y)||a===t.P||a===t.T
else s=!0
else s=!0
else s=!0
else s=!0
return s},
ti(a){var s=this
if(a==null)return A.m0(s)
return A.ao(v.typeUniverse,A.pp(a,s),null,s,null)},
tk(a){if(a==null)return!0
return this.y.b(a)},
tv(a){var s,r=this
if(a==null)return A.m0(r)
s=r.r
if(a instanceof A.K)return!!a[s]
return!!J.bi(a)[s]},
tr(a){var s,r=this
if(a==null)return A.m0(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.r
if(a instanceof A.K)return!!a[s]
return!!J.bi(a)[s]},
th(a){var s,r=this
if(a==null){s=A.fr(r)
if(s)return a}else if(r.b(a))return a
A.oZ(a,r)},
tj(a){var s=this
if(a==null)return a
else if(s.b(a))return a
A.oZ(a,s)},
oZ(a,b){throw A.d(A.oD(A.ox(a,A.pp(a,b),A.b2(b,null))))},
iM(a,b,c,d){var s=null
if(A.ao(v.typeUniverse,a,s,b,s))return a
throw A.d(A.oD("The type argument '"+A.b2(a,s)+"' is not a subtype of the type variable bound '"+A.b2(b,s)+"' of type variable '"+c+"' in '"+d+"'."))},
ox(a,b,c){var s=A.h2(a)
return s+": type '"+A.b2(b==null?A.aA(a):b,null)+"' is not a subtype of type '"+c+"'"},
oD(a){return new A.f9("TypeError: "+a)},
b1(a,b){return new A.f9("TypeError: "+A.ox(a,null,b))},
tt(a){return a!=null},
t7(a){if(a!=null)return a
throw A.d(A.b1(a,"Object"))},
tw(a){return!0},
t8(a){return a},
p0(a){return!0===a||!1===a},
iI(a){if(!0===a)return!0
if(!1===a)return!1
throw A.d(A.b1(a,"bool"))},
v6(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.d(A.b1(a,"bool"))},
v5(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.d(A.b1(a,"bool?"))},
aP(a){if(typeof a=="number")return a
throw A.d(A.b1(a,"double"))},
v7(a){if(typeof a=="number")return a
if(a==null)return a
throw A.d(A.b1(a,"double"))},
fk(a){if(typeof a=="number")return a
if(a==null)return a
throw A.d(A.b1(a,"double?"))},
m_(a){return typeof a=="number"&&Math.floor(a)===a},
a_(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.d(A.b1(a,"int"))},
v9(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.d(A.b1(a,"int"))},
v8(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.d(A.b1(a,"int?"))},
ts(a){return typeof a=="number"},
lR(a){if(typeof a=="number")return a
throw A.d(A.b1(a,"num"))},
vb(a){if(typeof a=="number")return a
if(a==null)return a
throw A.d(A.b1(a,"num"))},
va(a){if(typeof a=="number")return a
if(a==null)return a
throw A.d(A.b1(a,"num?"))},
tu(a){return typeof a=="string"},
ay(a){if(typeof a=="string")return a
throw A.d(A.b1(a,"String"))},
vc(a){if(typeof a=="string")return a
if(a==null)return a
throw A.d(A.b1(a,"String"))},
iJ(a){if(typeof a=="string")return a
if(a==null)return a
throw A.d(A.b1(a,"String?"))},
tD(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.b2(a[q],b)
return s},
p_(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=", "
if(a6!=null){s=a6.length
if(a5==null){a5=A.a([],t.s)
r=null}else r=a5.length
q=a5.length
for(p=s;p>0;--p)B.a.p(a5,"T"+(q+p))
for(o=t.iD,n=t._,m="<",l="",p=0;p<s;++p,l=a3){k=a5.length
j=k-1-p
if(!(j>=0))return A.c(a5,j)
m=B.b.L(m+l,a5[j])
i=a6[p]
h=i.x
if(!(h===2||h===3||h===4||h===5||i===o))if(!(i===n))k=!1
else k=!0
else k=!0
if(!k)m+=" extends "+A.b2(i,a5)}m+=">"}else{m=""
r=null}o=a4.y
g=a4.z
f=g.a
e=f.length
d=g.b
c=d.length
b=g.c
a=b.length
a0=A.b2(o,a5)
for(a1="",a2="",p=0;p<e;++p,a2=a3)a1+=a2+A.b2(f[p],a5)
if(c>0){a1+=a2+"["
for(a2="",p=0;p<c;++p,a2=a3)a1+=a2+A.b2(d[p],a5)
a1+="]"}if(a>0){a1+=a2+"{"
for(a2="",p=0;p<a;p+=3,a2=a3){a1+=a2
if(b[p+1])a1+="required "
a1+=A.b2(b[p+2],a5)+" "+b[p]}a1+="}"}if(r!=null){a5.toString
a5.length=r}return m+"("+a1+") => "+a0},
b2(a,b){var s,r,q,p,o,n,m,l=a.x
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=A.b2(a.y,b)
return s}if(l===7){r=a.y
s=A.b2(r,b)
q=r.x
return(q===11||q===12?"("+s+")":s)+"?"}if(l===8)return"FutureOr<"+A.b2(a.y,b)+">"
if(l===9){p=A.tI(a.y)
o=a.z
return o.length>0?p+("<"+A.tD(o,b)+">"):p}if(l===11)return A.p_(a,b,null)
if(l===12)return A.p_(a.y,b,a.z)
if(l===13){n=a.y
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.c(b,n)
return b[n]}return"?"},
tI(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
rW(a,b){var s=a.tR[b]
for(;typeof s=="string";)s=a.tR[s]
return s},
rV(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iG(a,b,!1)
else if(typeof m=="number"){s=m
r=A.fb(a,5,"#")
q=A.lQ(s)
for(p=0;p<s;++p)q[p]=r
o=A.fa(a,b,q)
n[b]=o
return o}else return m},
rT(a,b){return A.oU(a.tR,b)},
rS(a,b){return A.oU(a.eT,b)},
iG(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.oB(A.oz(a,null,b,c))
r.set(b,s)
return s},
lN(a,b,c){var s,r,q=b.Q
if(q==null)q=b.Q=new Map()
s=q.get(c)
if(s!=null)return s
r=A.oB(A.oz(a,b,c,!0))
q.set(c,r)
return r},
rU(a,b,c){var s,r,q,p=b.as
if(p==null)p=b.as=new Map()
s=c.at
r=p.get(s)
if(r!=null)return r
q=A.n5(a,b,c.x===10?c.z:[c])
p.set(s,q)
return q},
ct(a,b){b.a=A.tl
b.b=A.tm
return b},
fb(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.bA(null,null)
s.x=b
s.at=c
r=A.ct(a,s)
a.eC.set(c,r)
return r},
oG(a,b,c){var s,r=b.at+"*",q=a.eC.get(r)
if(q!=null)return q
s=A.rQ(a,b,r,c)
a.eC.set(r,s)
return s},
rQ(a,b,c,d){var s,r,q
if(d){s=b.x
if(!A.c7(b))r=b===t.P||b===t.T||s===7||s===6
else r=!0
if(r)return b}q=new A.bA(null,null)
q.x=6
q.y=b
q.at=c
return A.ct(a,q)},
n7(a,b,c){var s,r=b.at+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.rP(a,b,r,c)
a.eC.set(r,s)
return s},
rP(a,b,c,d){var s,r,q,p
if(d){s=b.x
if(!A.c7(b))if(!(b===t.P||b===t.T))if(s!==7)r=s===8&&A.fr(b.y)
else r=!0
else r=!0
else r=!0
if(r)return b
else if(s===1||b===t.eK)return t.P
else if(s===6){q=b.y
if(q.x===8&&A.fr(q.y))return q
else return A.od(a,b)}}p=new A.bA(null,null)
p.x=7
p.y=b
p.at=c
return A.ct(a,p)},
oF(a,b,c){var s,r=b.at+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.rN(a,b,r,c)
a.eC.set(r,s)
return s},
rN(a,b,c,d){var s,r,q
if(d){s=b.x
if(!A.c7(b))if(!(b===t._))r=!1
else r=!0
else r=!0
if(r||b===t.K)return b
else if(s===1)return A.fa(a,"bn",[b])
else if(b===t.P||b===t.T)return t.gK}q=new A.bA(null,null)
q.x=8
q.y=b
q.at=c
return A.ct(a,q)},
rR(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.bA(null,null)
s.x=13
s.y=b
s.at=q
r=A.ct(a,s)
a.eC.set(q,r)
return r},
iF(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].at
return s},
rM(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].at}return s},
fa(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.iF(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.bA(null,null)
r.x=9
r.y=b
r.z=c
if(c.length>0)r.c=c[0]
r.at=p
q=A.ct(a,r)
a.eC.set(p,q)
return q},
n5(a,b,c){var s,r,q,p,o,n
if(b.x===10){s=b.y
r=b.z.concat(c)}else{r=c
s=b}q=s.at+(";<"+A.iF(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.bA(null,null)
o.x=10
o.y=s
o.z=r
o.at=q
n=A.ct(a,o)
a.eC.set(q,n)
return n},
oE(a,b,c){var s,r,q,p,o,n=b.at,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.iF(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.iF(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.rM(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.bA(null,null)
p.x=11
p.y=b
p.z=c
p.at=r
o=A.ct(a,p)
a.eC.set(r,o)
return o},
n6(a,b,c,d){var s,r=b.at+("<"+A.iF(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.rO(a,b,c,r,d)
a.eC.set(r,s)
return s},
rO(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.lQ(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.x===1){r[p]=o;++q}}if(q>0){n=A.c6(a,b,r,0)
m=A.fn(a,c,r,0)
return A.n6(a,n,m,c!==m)}}l=new A.bA(null,null)
l.x=12
l.y=b
l.z=c
l.at=d
return A.ct(a,l)},
oz(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
oB(a){var s,r,q,p,o,n,m,l,k,j,i,h=a.r,g=a.s
for(s=h.length,r=0;r<s;){q=h.charCodeAt(r)
if(q>=48&&q<=57)r=A.rH(r+1,q,h,g)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36)r=A.oA(a,r,h,g,!1)
else if(q===46)r=A.oA(a,r,h,g,!0)
else{++r
switch(q){case 44:break
case 58:g.push(!1)
break
case 33:g.push(!0)
break
case 59:g.push(A.cr(a.u,a.e,g.pop()))
break
case 94:g.push(A.rR(a.u,g.pop()))
break
case 35:g.push(A.fb(a.u,5,"#"))
break
case 64:g.push(A.fb(a.u,2,"@"))
break
case 126:g.push(A.fb(a.u,3,"~"))
break
case 60:g.push(a.p)
a.p=g.length
break
case 62:p=a.u
o=g.splice(a.p)
A.n4(a.u,a.e,o)
a.p=g.pop()
n=g.pop()
if(typeof n=="string")g.push(A.fa(p,n,o))
else{m=A.cr(p,a.e,n)
switch(m.x){case 11:g.push(A.n6(p,m,o,a.n))
break
default:g.push(A.n5(p,m,o))
break}}break
case 38:A.rI(a,g)
break
case 42:p=a.u
g.push(A.oG(p,A.cr(p,a.e,g.pop()),a.n))
break
case 63:p=a.u
g.push(A.n7(p,A.cr(p,a.e,g.pop()),a.n))
break
case 47:p=a.u
g.push(A.oF(p,A.cr(p,a.e,g.pop()),a.n))
break
case 40:g.push(a.p)
a.p=g.length
break
case 41:p=a.u
l=new A.iv()
k=p.sEA
j=p.sEA
n=g.pop()
if(typeof n=="number")switch(n){case-1:k=g.pop()
break
case-2:j=g.pop()
break
default:g.push(n)
break}else g.push(n)
o=g.splice(a.p)
A.n4(a.u,a.e,o)
a.p=g.pop()
l.a=o
l.b=k
l.c=j
g.push(A.oE(p,A.cr(p,a.e,g.pop()),l))
break
case 91:g.push(a.p)
a.p=g.length
break
case 93:o=g.splice(a.p)
A.n4(a.u,a.e,o)
a.p=g.pop()
g.push(o)
g.push(-1)
break
case 123:g.push(a.p)
a.p=g.length
break
case 125:o=g.splice(a.p)
A.rK(a.u,a.e,o)
a.p=g.pop()
g.push(o)
g.push(-2)
break
default:throw"Bad character "+q}}}i=g.pop()
return A.cr(a.u,a.e,i)},
rH(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
oA(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.x===10)o=o.y
n=A.rW(s,o.y)[p]
if(n==null)A.M('No "'+p+'" in "'+A.r1(o)+'"')
d.push(A.lN(s,o,n))}else d.push(p)
return m},
rI(a,b){var s=b.pop()
if(0===s){b.push(A.fb(a.u,1,"0&"))
return}if(1===s){b.push(A.fb(a.u,4,"1&"))
return}throw A.d(A.j8("Unexpected extended operation "+A.l(s)))},
cr(a,b,c){if(typeof c=="string")return A.fa(a,c,a.sEA)
else if(typeof c=="number")return A.rJ(a,b,c)
else return c},
n4(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cr(a,b,c[s])},
rK(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cr(a,b,c[s])},
rJ(a,b,c){var s,r,q=b.x
if(q===10){if(c===0)return b.y
s=b.z
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.y
q=b.x}else if(c===0)return b
if(q!==9)throw A.d(A.j8("Indexed base must be an interface type"))
s=b.z
if(c<=s.length)return s[c-1]
throw A.d(A.j8("Bad index "+c+" for "+b.l(0)))},
ao(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(!A.c7(d))if(!(d===t._))s=!1
else s=!0
else s=!0
if(s)return!0
r=b.x
if(r===4)return!0
if(A.c7(b))return!1
if(b.x!==1)s=!1
else s=!0
if(s)return!0
q=r===13
if(q)if(A.ao(a,c[b.y],c,d,e))return!0
p=d.x
s=b===t.P||b===t.T
if(s){if(p===8)return A.ao(a,b,c,d.y,e)
return d===t.P||d===t.T||p===7||p===6}if(d===t.K){if(r===8)return A.ao(a,b.y,c,d,e)
if(r===6)return A.ao(a,b.y,c,d,e)
return r!==7}if(r===6)return A.ao(a,b.y,c,d,e)
if(p===6){s=A.od(a,d)
return A.ao(a,b,c,s,e)}if(r===8){if(!A.ao(a,b.y,c,d,e))return!1
return A.ao(a,A.oc(a,b),c,d,e)}if(r===7){s=A.ao(a,t.P,c,d,e)
return s&&A.ao(a,b.y,c,d,e)}if(p===8){if(A.ao(a,b,c,d.y,e))return!0
return A.ao(a,b,c,A.oc(a,d),e)}if(p===7){s=A.ao(a,b,c,t.P,e)
return s||A.ao(a,b,c,d.y,e)}if(q)return!1
s=r!==11
if((!s||r===12)&&d===t.gY)return!0
if(p===12){if(b===t.dY)return!0
if(r!==12)return!1
o=b.z
n=d.z
m=o.length
if(m!==n.length)return!1
c=c==null?o:o.concat(c)
e=e==null?n:n.concat(e)
for(l=0;l<m;++l){k=o[l]
j=n[l]
if(!A.ao(a,k,c,j,e)||!A.ao(a,j,e,k,c))return!1}return A.p1(a,b.y,c,d.y,e)}if(p===11){if(b===t.dY)return!0
if(s)return!1
return A.p1(a,b,c,d,e)}if(r===9){if(p!==9)return!1
return A.tq(a,b,c,d,e)}return!1},
p1(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.ao(a3,a4.y,a5,a6.y,a7))return!1
s=a4.z
r=a6.z
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.ao(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.ao(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.ao(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;!0;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.ao(a3,e[a+2],a7,g,a5))return!1
break}}for(;b<d;){if(f[b+1])return!1
b+=3}return!0},
tq(a,b,c,d,e){var s,r,q,p,o,n,m,l=b.y,k=d.y
for(;l!==k;){s=a.tR[l]
if(s==null)return!1
if(typeof s=="string"){l=s
continue}r=s[k]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.lN(a,b,r[o])
return A.oV(a,p,null,c,d.z,e)}n=b.z
m=d.z
return A.oV(a,n,null,c,m,e)},
oV(a,b,c,d,e,f){var s,r,q,p=b.length
for(s=0;s<p;++s){r=b[s]
q=e[s]
if(!A.ao(a,r,d,q,f))return!1}return!0},
fr(a){var s,r=a.x
if(!(a===t.P||a===t.T))if(!A.c7(a))if(r!==7)if(!(r===6&&A.fr(a.y)))s=r===8&&A.fr(a.y)
else s=!0
else s=!0
else s=!0
else s=!0
return s},
ud(a){var s
if(!A.c7(a))if(!(a===t._))s=!1
else s=!0
else s=!0
return s},
c7(a){var s=a.x
return s===2||s===3||s===4||s===5||a===t.iD},
oU(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
lQ(a){return a>0?new Array(a):v.typeUniverse.sEA},
bA:function bA(a,b){var _=this
_.a=a
_.b=b
_.w=_.r=_.c=null
_.x=0
_.at=_.as=_.Q=_.z=_.y=null},
iv:function iv(){this.c=this.b=this.a=null},
f8:function f8(a){this.a=a},
is:function is(){},
f9:function f9(a){this.a=a},
rv(){var s,r,q={}
if(self.scheduleImmediate!=null)return A.tL()
if(self.MutationObserver!=null&&self.document!=null){s=self.document.createElement("div")
r=self.document.createElement("span")
q.a=null
new self.MutationObserver(A.dG(new A.lj(q),1)).observe(s,{childList:true})
return new A.li(q,s,r)}else if(self.setImmediate!=null)return A.tM()
return A.tN()},
rw(a){self.scheduleImmediate(A.dG(new A.lk(t.M.a(a)),0))},
rx(a){self.setImmediate(A.dG(new A.ll(t.M.a(a)),0))},
ry(a){t.M.a(a)
A.rL(0,a)},
rL(a,b){var s=new A.lL()
s.m5(a,b)
return s},
bI(a){return new A.ie(new A.au($.aa,a.h("au<0>")),a.h("ie<0>"))},
bH(a,b){a.$2(0,null)
b.b=!0
return b.a},
an(a,b){A.t9(a,b)},
bG(a,b){b.fD(0,a)},
bF(a,b){b.jb(A.bw(a),A.cv(a))},
t9(a,b){var s,r,q=new A.lS(b),p=new A.lT(b)
if(a instanceof A.au)a.iI(q,p,t.z)
else{s=t.z
if(t.g7.b(a))a.hg(q,p,s)
else{r=new A.au($.aa,t.j_)
r.a=8
r.c=a
r.iI(q,p,s)}}},
bJ(a){var s=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(r){e=r
d=c}}}(a,1)
return $.aa.jY(new A.m4(s),t.q,t.S,t.z)},
rE(a){return new A.dz(a,1)},
n1(){return B.e8},
n2(a){return new A.dz(a,3)},
nh(a,b){return new A.f7(a,b.h("f7<0>"))},
j9(a,b){var s=A.fp(a,"error",t.K)
return new A.dO(s,b==null?A.qc(a):b)},
qc(a){var s
if(t.fz.b(a)){s=a.gdD()
if(s!=null)return s}return B.aZ},
lu(a,b){var s,r,q
for(s=t.j_;r=a.a,(r&4)!==0;)a=s.a(a.c)
if((r&24)!==0){q=b.dM()
b.f8(a)
A.dy(b,q)}else{q=t.f.a(b.c)
b.a=b.a&1|4
b.c=a
a.iz(q)}},
dy(a,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c={},b=c.a=a
for(s=t.u,r=t.f,q=t.g7;!0;){p={}
o=b.a
n=(o&16)===0
m=!n
if(a0==null){if(m&&(o&1)===0){l=s.a(b.c)
A.m1(l.a,l.b)}return}p.a=a0
k=a0.a
for(b=a0;k!=null;b=k,k=j){b.a=null
A.dy(c.a,b)
p.a=k
j=k.a}o=c.a
i=o.c
p.b=m
p.c=i
if(n){h=b.c
h=(h&1)!==0||(h&15)===8}else h=!0
if(h){g=b.b.b
if(m){o=o.b===g
o=!(o||o)}else o=!1
if(o){s.a(i)
A.m1(i.a,i.b)
return}f=$.aa
if(f!==g)$.aa=g
else f=null
b=b.c
if((b&15)===8)new A.lC(p,c,m).$0()
else if(n){if((b&1)!==0)new A.lB(p,i).$0()}else if((b&2)!==0)new A.lA(c,p).$0()
if(f!=null)$.aa=f
b=p.c
if(q.b(b)){o=p.a.$ti
o=o.h("bn<2>").b(b)||!o.z[1].b(b)}else o=!1
if(o){q.a(b)
e=p.a.b
if((b.a&24)!==0){d=r.a(e.c)
e.c=null
a0=e.dN(d)
e.a=b.a&30|e.a&1
e.c=b.c
c.a=b
continue}else A.lu(b,e)
return}}e=p.a.b
d=r.a(e.c)
e.c=null
a0=e.dN(d)
b=p.b
o=p.c
if(!b){e.$ti.c.a(o)
e.a=8
e.c=o}else{s.a(o)
e.a=e.a&1|16
e.c=o}c.a=e
b=e}},
tB(a,b){var s
if(t.ng.b(a))return b.jY(a,t.z,t.K,t.k)
s=t.mq
if(s.b(a))return s.a(a)
throw A.d(A.mD(a,"onError",u.w))},
tA(){var s,r
for(s=$.dE;s!=null;s=$.dE){$.fm=null
r=s.b
$.dE=r
if(r==null)$.fl=null
s.a.$0()}},
tF(){$.nf=!0
try{A.tA()}finally{$.fm=null
$.nf=!1
if($.dE!=null)$.ny().$1(A.pc())}},
p6(a){var s=new A.ig(a),r=$.fl
if(r==null){$.dE=$.fl=s
if(!$.nf)$.ny().$1(A.pc())}else $.fl=r.b=s},
tE(a){var s,r,q,p=$.dE
if(p==null){A.p6(a)
$.fm=$.fl
return}s=new A.ig(a)
r=$.fm
if(r==null){s.b=p
$.dE=$.fm=s}else{q=r.b
s.b=q
$.fm=r.b=s
if(q==null)$.fl=s}},
un(a){var s,r=null,q=$.aa
if(B.l===q){A.d_(r,r,B.l,a)
return}s=!1
if(s){A.d_(r,r,q,t.M.a(a))
return}A.d_(r,r,q,t.M.a(q.j3(a)))},
uL(a,b){A.fp(a,"stream",t.K)
return new A.iA(b.h("iA<0>"))},
m1(a,b){A.tE(new A.m2(a,b))},
p3(a,b,c,d,e){var s,r=$.aa
if(r===c)return d.$0()
$.aa=c
s=r
try{r=d.$0()
return r}finally{$.aa=s}},
p4(a,b,c,d,e,f,g){var s,r=$.aa
if(r===c)return d.$1(e)
$.aa=c
s=r
try{r=d.$1(e)
return r}finally{$.aa=s}},
tC(a,b,c,d,e,f,g,h,i){var s,r=$.aa
if(r===c)return d.$2(e,f)
$.aa=c
s=r
try{r=d.$2(e,f)
return r}finally{$.aa=s}},
d_(a,b,c,d){t.M.a(d)
if(B.l!==c)d=c.j3(d)
A.p6(d)},
lj:function lj(a){this.a=a},
li:function li(a,b,c){this.a=a
this.b=b
this.c=c},
lk:function lk(a){this.a=a},
ll:function ll(a){this.a=a},
lL:function lL(){},
lM:function lM(a,b){this.a=a
this.b=b},
ie:function ie(a,b){this.a=a
this.b=!1
this.$ti=b},
lS:function lS(a){this.a=a},
lT:function lT(a){this.a=a},
m4:function m4(a){this.a=a},
dz:function dz(a,b){this.a=a
this.b=b},
cs:function cs(a,b){var _=this
_.a=a
_.d=_.c=_.b=null
_.$ti=b},
f7:function f7(a,b){this.a=a
this.$ti=b},
dO:function dO(a,b){this.a=a
this.b=b},
ih:function ih(){},
f6:function f6(a,b){this.a=a
this.$ti=b},
cY:function cY(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
au:function au(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
lr:function lr(a,b){this.a=a
this.b=b},
lz:function lz(a,b){this.a=a
this.b=b},
lv:function lv(a){this.a=a},
lw:function lw(a){this.a=a},
lx:function lx(a,b,c){this.a=a
this.b=b
this.c=c},
lt:function lt(a,b){this.a=a
this.b=b},
ly:function ly(a,b){this.a=a
this.b=b},
ls:function ls(a,b,c){this.a=a
this.b=b
this.c=c},
lC:function lC(a,b,c){this.a=a
this.b=b
this.c=c},
lD:function lD(a){this.a=a},
lB:function lB(a,b){this.a=a
this.b=b},
lA:function lA(a,b){this.a=a
this.b=b},
ig:function ig(a){this.a=a
this.b=null},
eH:function eH(){},
kM:function kM(a,b){this.a=a
this.b=b},
kN:function kN(a,b){this.a=a
this.b=b},
eI:function eI(){},
hV:function hV(){},
iA:function iA(a){this.$ti=a},
ff:function ff(){},
m2:function m2(a,b){this.a=a
this.b=b},
iz:function iz(){},
lJ:function lJ(a,b){this.a=a
this.b=b},
lK:function lK(a,b,c){this.a=a
this.b=b
this.c=c},
ab(a,b,c,d){var s
if(b==null){if(a==null)return new A.bo(c.h("@<0>").Z(d).h("bo<1,2>"))
s=A.pe()}else{if(a==null)a=A.tQ()
s=A.pe()}return A.rF(s,a,b,c,d)},
z(a,b,c){return b.h("@<0>").Z(c).h("k9<1,2>").a(A.pi(a,new A.bo(b.h("@<0>").Z(c).h("bo<1,2>"))))},
bp(a,b){return new A.bo(a.h("@<0>").Z(b).h("bo<1,2>"))},
rF(a,b,c,d,e){var s=c!=null?c:new A.lG(d)
return new A.f_(a,b,s,d.h("@<0>").Z(e).h("f_<1,2>"))},
mO(a){return new A.c4(a.h("c4<0>"))},
o2(a){return new A.c4(a.h("c4<0>"))},
n3(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
rG(a,b,c){var s=new A.cZ(a,b,c.h("cZ<0>"))
s.c=a.e
return s},
tf(a,b){return J.U(a,b)},
tg(a){return J.aL(a)},
qy(a,b,c){var s,r
if(A.ng(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.a([],t.s)
B.a.p($.bh,a)
try{A.tx(a,s)}finally{if(0>=$.bh.length)return A.c($.bh,-1)
$.bh.pop()}r=A.kO(b,t.e7.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
k4(a,b,c){var s,r
if(A.ng(a))return b+"..."+c
s=new A.a5(b)
B.a.p($.bh,a)
try{r=s
r.a=A.kO(r.a,a,", ")}finally{if(0>=$.bh.length)return A.c($.bh,-1)
$.bh.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
ng(a){var s,r
for(s=$.bh.length,r=0;r<s;++r)if(a===$.bh[r])return!0
return!1},
tx(a,b){var s,r,q,p,o,n,m,l=a.gH(a),k=0,j=0
while(!0){if(!(k<80||j<3))break
if(!l.m())return
s=A.l(l.gu())
B.a.p(b,s)
k+=s.length+2;++j}if(!l.m()){if(j<=5)return
if(0>=b.length)return A.c(b,-1)
r=b.pop()
if(0>=b.length)return A.c(b,-1)
q=b.pop()}else{p=l.gu();++j
if(!l.m()){if(j<=4){B.a.p(b,A.l(p))
return}r=A.l(p)
if(0>=b.length)return A.c(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gu();++j
for(;l.m();p=o,o=n){n=l.gu();++j
if(j>100){while(!0){if(!(k>75&&j>3))break
if(0>=b.length)return A.c(b,-1)
k-=b.pop().length+2;--j}B.a.p(b,"...")
return}}q=A.l(p)
r=A.l(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
while(!0){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.c(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.p(b,m)
B.a.p(b,q)
B.a.p(b,r)},
hk(a,b,c){var s=A.ab(null,null,b,c)
a.bc(0,new A.kb(s,b,c))
return s},
mP(a,b){var s,r,q,p=A.mO(b)
for(s=J.I(a),r=s.$ti.c;s.m();){q=s.d
p.p(0,b.a(q==null?r.a(q):q))}return p},
qG(a,b){var s=t.bP
return J.nD(s.a(a),s.a(b))},
mR(a){var s,r={}
if(A.ng(a))return"{...}"
s=new A.a5("")
try{B.a.p($.bh,a)
s.a+="{"
r.a=!0
a.bc(0,new A.kc(r,s))
s.a+="}"}finally{if(0>=$.bh.length)return A.c($.bh,-1)
$.bh.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
mQ(a){return new A.en(A.bQ(A.qH(null),null,!1,a.h("0?")),a.h("en<0>"))},
qH(a){return 8},
f_:function f_(a,b,c,d){var _=this
_.w=a
_.x=b
_.y=c
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=d},
lG:function lG(a){this.a=a},
c4:function c4(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
iw:function iw(a){this.a=a
this.c=this.b=null},
cZ:function cZ(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
ei:function ei(){},
kb:function kb(a,b,c){this.a=a
this.b=b
this.c=c},
em:function em(){},
w:function w(){},
ep:function ep(){},
kc:function kc(a,b){this.a=a
this.b=b},
cM:function cM(){},
kd:function kd(a){this.a=a},
en:function en(a,b){var _=this
_.a=a
_.d=_.c=_.b=0
_.$ti=b},
f1:function f1(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=null
_.$ti=e},
b_:function b_(){},
eC:function eC(){},
dB:function dB(){},
iH:function iH(){},
fc:function fc(a,b){this.a=a
this.$ti=b},
f0:function f0(){},
f4:function f4(){},
fh:function fh(){},
fi:function fi(){},
rp(a,b,c,d){var s,r
if(b instanceof Uint8Array){s=b
d=s.length
if(d-c<15)return null
r=A.rq(a,s,c,d)
if(r!=null&&a)if(r.indexOf("\ufffd")>=0)return null
return r}return null},
rq(a,b,c,d){var s=a?$.pX():$.pW()
if(s==null)return null
if(0===c&&d===b.length)return A.os(s,b)
return A.os(s,b.subarray(c,A.aK(c,d,b.length)))},
os(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
nK(a,b,c,d,e,f){if(B.d.W(f,4)!==0)throw A.d(A.aI("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.d(A.aI("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.d(A.aI("Invalid base64 padding, more than two '=' characters",a,b))},
t6(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
t5(a,b,c){var s,r,q,p=c-b,o=new Uint8Array(p)
for(s=J.X(a),r=0;r<p;++r){q=s.i(a,b+r)
if((q&4294967040)>>>0!==0)q=255
if(!(r<p))return A.c(o,r)
o[r]=q}return o},
l0:function l0(){},
l_:function l_(){},
fJ:function fJ(){},
iE:function iE(){},
fK:function fK(a,b){this.a=a
this.b=b},
fM:function fM(){},
fN:function fN(){},
cE:function cE(){},
cF:function cF(){},
h1:function h1(){},
i6:function i6(){},
i7:function i7(a){this.a=a},
lP:function lP(a){this.a=a
this.b=16
this.c=0},
cw(a,b){var s=A.o8(a,b)
if(s!=null)return s
throw A.d(A.aI(a,null,null))},
bV(a){var s=A.qU(a)
if(s!=null)return s
throw A.d(A.aI("Invalid double",a,null))},
qp(a){if(a instanceof A.aV)return a.l(0)
return"Instance of '"+A.kz(a)+"'"},
qq(a,b){a=A.d(a)
if(a==null)a=t.K.a(a)
a.stack=b.l(0)
throw a
throw A.d("unreachable")},
bQ(a,b,c,d){var s,r=c?J.mI(a,d):J.nY(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
eo(a,b,c){var s,r=A.a([],c.h("y<0>"))
for(s=J.I(a);s.m();)B.a.p(r,c.a(s.gu()))
if(b)return r
return J.k6(r,c)},
h(a,b,c){var s
if(b)return A.o3(a,c)
s=J.k6(A.o3(a,c),c)
return s},
o3(a,b){var s,r
if(Array.isArray(a))return A.a(a.slice(0),b.h("y<0>"))
s=A.a([],b.h("y<0>"))
for(r=J.I(a);r.m();)B.a.p(s,r.gu())
return s},
o4(a,b){var s=A.eo(a,!1,b)
s.fixed$length=Array
s.immutable$list=Array
return s},
ae(a,b,c){var s,r
if(Array.isArray(a)){s=a
r=s.length
c=A.aK(b,c,r)
return A.o9(b>0||c<r?s.slice(b,c):s)}if(t.hD.b(a))return A.qW(a,b,A.aK(b,c,a.length))
return A.re(a,b,c)},
rd(a){return A.bc(a)},
re(a,b,c){var s,r,q,p,o=null
if(b<0)throw A.d(A.a0(b,0,J.N(a),o,o))
s=c==null
if(!s&&c<b)throw A.d(A.a0(c,b,J.N(a),o,o))
r=J.I(a)
for(q=0;q<b;++q)if(!r.m())throw A.d(A.a0(b,0,q,o,o))
p=[]
if(s)for(;r.m();)p.push(r.gu())
else for(q=b;q<c;++q){if(!r.m())throw A.d(A.a0(c,b,q,o,o))
p.push(r.gu())}return A.o9(p)},
ax(a){return new A.cJ(a,A.mJ(a,!1,!0,!1,!1,!1))},
kO(a,b,c){var s=J.I(b)
if(!s.m())return a
if(c.length===0){do a+=A.l(s.gu())
while(s.m())}else{a+=A.l(s.gu())
for(;s.m();)a=a+c+A.l(s.gu())}return a},
mZ(){var s=A.qT()
if(s!=null)return A.n_(s)
throw A.d(A.S("'Uri.base' is not supported"))},
h2(a){if(typeof a=="number"||A.p0(a)||a==null)return J.bL(a)
if(typeof a=="string")return JSON.stringify(a)
return A.qp(a)},
j8(a){return new A.dN(a)},
a8(a,b){return new A.bM(!1,null,b,a)},
mD(a,b,c){return new A.bM(!0,a,b,c)},
iX(a,b,c){return a},
aJ(a){var s=null
return new A.dp(s,s,!1,s,s,a)},
kA(a,b){return new A.dp(null,null,!0,a,b,"Value not in range")},
a0(a,b,c,d,e){return new A.dp(b,c,!0,a,d,"Invalid value")},
ob(a,b,c,d){if(a<b||a>c)throw A.d(A.a0(a,b,c,d,null))
return a},
aK(a,b,c){if(0>a||a>c)throw A.d(A.a0(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.d(A.a0(b,a,c,"end",null))
return b}return c},
bd(a,b){if(a<0)throw A.d(A.a0(a,0,null,b,null))
return a},
hf(a,b,c,d,e){var s=A.a_(e==null?J.N(b):e)
return new A.he(s,!0,a,c,"Index out of range")},
S(a){return new A.i3(a)},
i1(a){return new A.eQ(a)},
al(a){return new A.ck(a)},
av(a){return new A.fW(a)},
aI(a,b,c){return new A.e6(a,b,c)},
cQ(a,b,c,d){var s,r
if(B.n===c)return A.ok(J.aL(a),J.aL(b),$.mA())
if(B.n===d){s=J.aL(a)
b=J.aL(b)
c=J.aL(c)
return A.mW(A.cl(A.cl(A.cl($.mA(),s),b),c))}s=J.aL(a)
b=J.aL(b)
c=J.aL(c)
d=J.aL(d)
r=$.mA()
return A.mW(A.cl(A.cl(A.cl(A.cl(r,s),b),c),d))},
nt(a){A.uj(a)},
oW(a,b){return 65536+((a&1023)<<10)+(b&1023)},
n_(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){s=((B.b.E(a5,4)^58)*3|B.b.E(a5,0)^100|B.b.E(a5,1)^97|B.b.E(a5,2)^116|B.b.E(a5,3)^97)>>>0
if(s===0)return A.oq(a4<a4?B.b.B(a5,0,a4):a5,5,a3).gkf()
else if(s===32)return A.oq(B.b.B(a5,5,a4),0,a3).gkf()}r=A.bQ(8,0,!1,t.S)
B.a.v(r,0,0)
B.a.v(r,1,-1)
B.a.v(r,2,-1)
B.a.v(r,7,-1)
B.a.v(r,3,0)
B.a.v(r,4,0)
B.a.v(r,5,a4)
B.a.v(r,6,a4)
if(A.p5(a5,0,a4,0,r)>=14)B.a.v(r,7,a4)
q=r[1]
if(q>=0)if(A.p5(a5,0,q,20,r)===20)r[7]=q
p=r[2]+1
o=r[3]
n=r[4]
m=r[5]
l=r[6]
if(l<m)m=l
if(n<p)n=m
else if(n<=q)n=q+1
if(o<p)o=n
k=r[7]<0
if(k)if(p>q+3){j=a3
k=!1}else{i=o>0
if(i&&o+1===n){j=a3
k=!1}else{if(!B.b.a9(a5,"\\",n))if(p>0)h=B.b.a9(a5,"\\",p-1)||B.b.a9(a5,"\\",p-2)
else h=!1
else h=!0
if(h){j=a3
k=!1}else{if(!(m<a4&&m===n+2&&B.b.a9(a5,"..",n)))h=m>n+2&&B.b.a9(a5,"/..",m-3)
else h=!0
if(h){j=a3
k=!1}else{if(q===4)if(B.b.a9(a5,"file",0)){if(p<=0){if(!B.b.a9(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.b.B(a5,n,a4)
q-=0
i=s-0
m+=i
l+=i
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.b.ci(a5,n,m,"/");++a4
m=f}j="file"}else if(B.b.a9(a5,"http",0)){if(i&&o+3===n&&B.b.a9(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.b.ci(a5,o,n,"")
a4-=3
n=e}j="http"}else j=a3
else if(q===5&&B.b.a9(a5,"https",0)){if(i&&o+4===n&&B.b.a9(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.b.ci(a5,o,n,"")
a4-=3
n=e}j="https"}else j=a3
k=!0}}}}else j=a3
if(k){if(a4<a5.length){a5=B.b.B(a5,0,a4)
q-=0
p-=0
o-=0
n-=0
m-=0
l-=0}return new A.bu(a5,q,p,o,n,m,l,j)}if(j==null)if(q>0)j=A.t1(a5,0,q)
else{if(q===0)A.dC(a5,0,"Invalid empty scheme")
j=""}if(p>0){d=q+3
c=d<p?A.oP(a5,d,p-1):""
b=A.oM(a5,p,o,!1)
i=o+1
if(i<n){a=A.o8(B.b.B(a5,i,n),a3)
a0=A.n9(a==null?A.M(A.aI("Invalid port",a5,i)):a,j)}else a0=a3}else{a0=a3
b=a0
c=""}a1=A.oN(a5,n,m,a3,j,b!=null)
a2=m<l?A.oO(a5,m+1,l,a3):a3
return A.lO(j,c,b,a0,a1,a2,l<a4?A.oL(a5,l+1,a4):a3)},
ro(a){A.ay(a)
return A.nc(a,0,a.length,B.u,!1)},
rn(a,b,c){var s,r,q,p,o,n,m="IPv4 address should contain exactly 4 parts",l="each part must be in the range 0..255",k=new A.kX(a),j=new Uint8Array(4)
for(s=b,r=s,q=0;s<c;++s){p=B.b.J(a,s)
if(p!==46){if((p^48)>9)k.$2("invalid character",s)}else{if(q===3)k.$2(m,s)
o=A.cw(B.b.B(a,r,s),null)
if(o>255)k.$2(l,r)
n=q+1
if(!(q<4))return A.c(j,q)
j[q]=o
r=s+1
q=n}}if(q!==3)k.$2(m,c)
o=A.cw(B.b.B(a,r,c),null)
if(o>255)k.$2(l,r)
if(!(q<4))return A.c(j,q)
j[q]=o
return j},
or(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c=new A.kY(a),b=new A.kZ(c,a)
if(a.length<2)c.$2("address is too short",d)
s=A.a([],t.t)
for(r=a0,q=r,p=!1,o=!1;r<a1;++r){n=B.b.J(a,r)
if(n===58){if(r===a0){++r
if(B.b.J(a,r)!==58)c.$2("invalid start colon.",r)
q=r}if(r===q){if(p)c.$2("only one wildcard `::` is allowed",r)
B.a.p(s,-1)
p=!0}else B.a.p(s,b.$2(q,r))
q=r+1}else if(n===46)o=!0}if(s.length===0)c.$2("too few parts",d)
m=q===a1
l=B.a.gq(s)
if(m&&l!==-1)c.$2("expected a part after last `:`",a1)
if(!m)if(!o)B.a.p(s,b.$2(q,a1))
else{k=A.rn(a,q,a1)
B.a.p(s,(k[0]<<8|k[1])>>>0)
B.a.p(s,(k[2]<<8|k[3])>>>0)}if(p){if(s.length>7)c.$2("an address with a wildcard must have less than 7 parts",d)}else if(s.length!==8)c.$2("an address without a wildcard must contain exactly 8 parts",d)
j=new Uint8Array(16)
for(l=s.length,i=9-l,r=0,h=0;r<l;++r){g=s[r]
if(g===-1)for(f=0;f<i;++f){if(!(h>=0&&h<16))return A.c(j,h)
j[h]=0
e=h+1
if(!(e<16))return A.c(j,e)
j[e]=0
h+=2}else{e=B.d.cW(g,8)
if(!(h>=0&&h<16))return A.c(j,h)
j[h]=e
e=h+1
if(!(e<16))return A.c(j,e)
j[e]=g&255
h+=2}}return j},
lO(a,b,c,d,e,f,g){return new A.fd(a,b,c,d,e,f,g)},
oI(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
dC(a,b,c){throw A.d(A.aI(c,a,b))},
rY(a,b){var s,r,q,p,o
for(s=a.length,r=0;r<s;++r){q=a[r]
p=J.X(q)
o=p.gn(q)
if(0>o)A.M(A.a0(0,0,p.gn(q),null,null))
if(A.cy(q,"/",0)){s=A.S("Illegal path character "+A.l(q))
throw A.d(s)}}},
oH(a,b,c){var s,r,q,p,o
for(s=A.bf(a,c,null,A.v(a).c),r=s.$ti,s=new A.O(s,s.gn(s),r.h("O<B.E>")),r=r.h("B.E");s.m();){q=s.d
if(q==null)q=r.a(q)
p=A.ax('["*/:<>?\\\\|]')
o=q.length
if(A.cy(q,p,0)){s=A.S("Illegal character in path: "+q)
throw A.d(s)}}},
rZ(a,b){var s
if(!(65<=a&&a<=90))s=97<=a&&a<=122
else s=!0
if(s)return
s=A.S("Illegal drive letter "+A.rd(a))
throw A.d(s)},
n9(a,b){if(a!=null&&a===A.oI(b))return null
return a},
oM(a,b,c,d){var s,r,q,p,o,n
if(a==null)return null
if(b===c)return""
if(B.b.J(a,b)===91){s=c-1
if(B.b.J(a,s)!==93)A.dC(a,b,"Missing end `]` to match `[` in host")
r=b+1
q=A.t_(a,r,s)
if(q<s){p=q+1
o=A.oS(a,B.b.a9(a,"25",p)?q+3:p,s,"%25")}else o=""
A.or(a,r,q)
return B.b.B(a,b,q).toLowerCase()+o+"]"}for(n=b;n<c;++n)if(B.b.J(a,n)===58){q=B.b.aN(a,"%",b)
q=q>=b&&q<c?q:c
if(q<c){p=q+1
o=A.oS(a,B.b.a9(a,"25",p)?q+3:p,c,"%25")}else o=""
A.or(a,b,q)
return"["+B.b.B(a,b,q)+o+"]"}return A.t3(a,b,c)},
t_(a,b,c){var s=B.b.aN(a,"%",b)
return s>=b&&s<c?s:c},
oS(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i=d!==""?new A.a5(d):null
for(s=b,r=s,q=!0;s<c;){p=B.b.J(a,s)
if(p===37){o=A.na(a,s,!0)
n=o==null
if(n&&q){s+=3
continue}if(i==null)i=new A.a5("")
m=i.a+=B.b.B(a,r,s)
if(n)o=B.b.B(a,s,s+3)
else if(o==="%")A.dC(a,s,"ZoneID should not contain % anymore")
i.a=m+o
s+=3
r=s
q=!0}else{if(p<127){n=p>>>4
if(!(n<8))return A.c(B.I,n)
n=(B.I[n]&1<<(p&15))!==0}else n=!1
if(n){if(q&&65<=p&&90>=p){if(i==null)i=new A.a5("")
if(r<s){i.a+=B.b.B(a,r,s)
r=s}q=!1}++s}else{if((p&64512)===55296&&s+1<c){l=B.b.J(a,s+1)
if((l&64512)===56320){p=(p&1023)<<10|l&1023|65536
k=2}else k=1}else k=1
j=B.b.B(a,r,s)
if(i==null){i=new A.a5("")
n=i}else n=i
n.a+=j
n.a+=A.n8(p)
s+=k
r=s}}}if(i==null)return B.b.B(a,b,c)
if(r<c)i.a+=B.b.B(a,r,c)
n=i.a
return n.charCodeAt(0)==0?n:n},
t3(a,b,c){var s,r,q,p,o,n,m,l,k,j,i
for(s=b,r=s,q=null,p=!0;s<c;){o=B.b.J(a,s)
if(o===37){n=A.na(a,s,!0)
m=n==null
if(m&&p){s+=3
continue}if(q==null)q=new A.a5("")
l=B.b.B(a,r,s)
k=q.a+=!p?l.toLowerCase():l
if(m){n=B.b.B(a,s,s+3)
j=3}else if(n==="%"){n="%25"
j=1}else j=3
q.a=k+n
s+=j
r=s
p=!0}else{if(o<127){m=o>>>4
if(!(m<8))return A.c(B.ai,m)
m=(B.ai[m]&1<<(o&15))!==0}else m=!1
if(m){if(p&&65<=o&&90>=o){if(q==null)q=new A.a5("")
if(r<s){q.a+=B.b.B(a,r,s)
r=s}p=!1}++s}else{if(o<=93){m=o>>>4
if(!(m<8))return A.c(B.E,m)
m=(B.E[m]&1<<(o&15))!==0}else m=!1
if(m)A.dC(a,s,"Invalid character")
else{if((o&64512)===55296&&s+1<c){i=B.b.J(a,s+1)
if((i&64512)===56320){o=(o&1023)<<10|i&1023|65536
j=2}else j=1}else j=1
l=B.b.B(a,r,s)
if(!p)l=l.toLowerCase()
if(q==null){q=new A.a5("")
m=q}else m=q
m.a+=l
m.a+=A.n8(o)
s+=j
r=s}}}}if(q==null)return B.b.B(a,b,c)
if(r<c){l=B.b.B(a,r,c)
q.a+=!p?l.toLowerCase():l}m=q.a
return m.charCodeAt(0)==0?m:m},
t1(a,b,c){var s,r,q,p
if(b===c)return""
if(!A.oK(B.b.E(a,b)))A.dC(a,b,"Scheme not starting with alphabetic character")
for(s=b,r=!1;s<c;++s){q=B.b.E(a,s)
if(q<128){p=q>>>4
if(!(p<8))return A.c(B.H,p)
p=(B.H[p]&1<<(q&15))!==0}else p=!1
if(!p)A.dC(a,s,"Illegal scheme character")
if(65<=q&&q<=90)r=!0}a=B.b.B(a,b,c)
return A.rX(r?a.toLowerCase():a)},
rX(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
oP(a,b,c){if(a==null)return""
return A.fe(a,b,c,B.bn,!1,!1)},
oN(a,b,c,d,e,f){var s=e==="file",r=s||f,q=A.fe(a,b,c,B.aj,!0,!0)
if(q.length===0){if(s)return"/"}else if(r&&!B.b.a_(q,"/"))q="/"+q
return A.t2(q,e,f)},
t2(a,b,c){var s=b.length===0
if(s&&!c&&!B.b.a_(a,"/")&&!B.b.a_(a,"\\"))return A.nb(a,!s||c)
return A.c5(a)},
oO(a,b,c,d){if(a!=null)return A.fe(a,b,c,B.G,!0,!1)
return null},
oL(a,b,c){if(a==null)return null
return A.fe(a,b,c,B.G,!0,!1)},
na(a,b,c){var s,r,q,p,o,n=b+2
if(n>=a.length)return"%"
s=B.b.J(a,b+1)
r=B.b.J(a,n)
q=A.mk(s)
p=A.mk(r)
if(q<0||p<0)return"%"
o=q*16+p
if(o<127){n=B.d.cW(o,4)
if(!(n<8))return A.c(B.I,n)
n=(B.I[n]&1<<(o&15))!==0}else n=!1
if(n)return A.bc(c&&65<=o&&90>=o?(o|32)>>>0:o)
if(s>=97||r>=97)return B.b.B(a,b,b+3).toUpperCase()
return null},
n8(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
if(a<128){s=new Uint8Array(3)
s[0]=37
s[1]=B.b.E(k,a>>>4)
s[2]=B.b.E(k,a&15)}else{if(a>2047)if(a>65535){r=240
q=4}else{r=224
q=3}else{r=192
q=2}p=3*q
s=new Uint8Array(p)
for(o=0;--q,q>=0;r=128){n=B.d.mF(a,6*q)&63|r
if(!(o<p))return A.c(s,o)
s[o]=37
m=o+1
l=B.b.E(k,n>>>4)
if(!(m<p))return A.c(s,m)
s[m]=l
l=o+2
m=B.b.E(k,n&15)
if(!(l<p))return A.c(s,l)
s[l]=m
o+=3}}return A.ae(s,0,null)},
fe(a,b,c,d,e,f){var s=A.oR(a,b,c,d,e,f)
return s==null?B.b.B(a,b,c):s},
oR(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null
for(s=!e,r=b,q=r,p=i;r<c;){o=B.b.J(a,r)
if(o<127){n=o>>>4
if(!(n<8))return A.c(d,n)
n=(d[n]&1<<(o&15))!==0}else n=!1
if(n)++r
else{if(o===37){m=A.na(a,r,!1)
if(m==null){r+=3
continue}if("%"===m){m="%25"
l=1}else l=3}else if(o===92&&f){m="/"
l=1}else{if(s)if(o<=93){n=o>>>4
if(!(n<8))return A.c(B.E,n)
n=(B.E[n]&1<<(o&15))!==0}else n=!1
else n=!1
if(n){A.dC(a,r,"Invalid character")
l=i
m=l}else{if((o&64512)===55296){n=r+1
if(n<c){k=B.b.J(a,n)
if((k&64512)===56320){o=(o&1023)<<10|k&1023|65536
l=2}else l=1}else l=1}else l=1
m=A.n8(o)}}if(p==null){p=new A.a5("")
n=p}else n=p
j=n.a+=B.b.B(a,q,r)
n.a=j+A.l(m)
if(typeof l!=="number")return A.bj(l)
r+=l
q=r}}if(p==null)return i
if(q<c)p.a+=B.b.B(a,q,c)
s=p.a
return s.charCodeAt(0)==0?s:s},
oQ(a){if(B.b.a_(a,"."))return!0
return B.b.ak(a,"/.")!==-1},
c5(a){var s,r,q,p,o,n,m
if(!A.oQ(a))return a
s=A.a([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(J.U(n,"..")){m=s.length
if(m!==0){if(0>=m)return A.c(s,-1)
s.pop()
if(s.length===0)B.a.p(s,"")}p=!0}else if("."===n)p=!0
else{B.a.p(s,n)
p=!1}}if(p)B.a.p(s,"")
return B.a.aC(s,"/")},
nb(a,b){var s,r,q,p,o,n
if(!A.oQ(a))return!b?A.oJ(a):a
s=A.a([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n)if(s.length!==0&&B.a.gq(s)!==".."){if(0>=s.length)return A.c(s,-1)
s.pop()
p=!0}else{B.a.p(s,"..")
p=!1}else if("."===n)p=!0
else{B.a.p(s,n)
p=!1}}r=s.length
if(r!==0)if(r===1){if(0>=r)return A.c(s,0)
r=s[0].length===0}else r=!1
else r=!0
if(r)return"./"
if(p||B.a.gq(s)==="..")B.a.p(s,"")
if(!b){if(0>=s.length)return A.c(s,0)
B.a.v(s,0,A.oJ(s[0]))}return B.a.aC(s,"/")},
oJ(a){var s,r,q,p=a.length
if(p>=2&&A.oK(B.b.E(a,0)))for(s=1;s<p;++s){r=B.b.E(a,s)
if(r===58)return B.b.B(a,0,s)+"%3A"+B.b.ar(a,s+1)
if(r<=127){q=r>>>4
if(!(q<8))return A.c(B.H,q)
q=(B.H[q]&1<<(r&15))===0}else q=!0
if(q)break}return a},
t4(a,b){if(a.oS("package")&&a.c==null)return A.p7(b,0,b.length)
return-1},
oT(a){var s,r,q,p=a.gh9(),o=p.length
if(o>0&&J.N(p[0])===2&&J.nC(p[0],1)===58){if(0>=o)return A.c(p,0)
A.rZ(J.nC(p[0],0),!1)
A.oH(p,!1,1)
s=!0}else{A.oH(p,!1,0)
s=!1}r=a.geh()&&!s?""+"\\":""
if(a.gdd()){q=a.gbn(a)
if(q.length!==0)r=r+"\\"+q+"\\"}r=A.kO(r,p,"\\")
o=s&&o===1?r+"\\":r
return o.charCodeAt(0)==0?o:o},
t0(a,b){var s,r,q
for(s=0,r=0;r<2;++r){q=B.b.E(a,b+r)
if(48<=q&&q<=57)s=s*16+q-48
else{q|=32
if(97<=q&&q<=102)s=s*16+q-87
else throw A.d(A.a8("Invalid URL encoding",null))}}return s},
nc(a,b,c,d,e){var s,r,q,p,o=b
while(!0){if(!(o<c)){s=!0
break}r=B.b.E(a,o)
if(r<=127)if(r!==37)q=!1
else q=!0
else q=!0
if(q){s=!1
break}++o}if(s){if(B.u!==d)q=!1
else q=!0
if(q)return B.b.B(a,b,c)
else p=new A.a9(B.b.B(a,b,c))}else{p=A.a([],t.t)
for(q=a.length,o=b;o<c;++o){r=B.b.E(a,o)
if(r>127)throw A.d(A.a8("Illegal percent encoding in URI",null))
if(r===37){if(o+3>q)throw A.d(A.a8("Truncated URI",null))
B.a.p(p,A.t0(a,o+1))
o+=2}else B.a.p(p,r)}}return d.e0(0,p)},
oK(a){var s=a|32
return 97<=s&&s<=122},
oq(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.a([b-1],t.t)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=B.b.E(a,r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.d(A.aI(k,a,r))}}if(q<0&&r>b)throw A.d(A.aI(k,a,r))
for(;p!==44;){B.a.p(j,r);++r
for(o=-1;r<s;++r){p=B.b.E(a,r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.a.p(j,o)
else{n=B.a.gq(j)
if(p!==44||r!==n+7||!B.b.a9(a,"base64",n+1))throw A.d(A.aI("Expecting '='",a,r))
break}}B.a.p(j,r)
m=r+1
if((j.length&1)===1)a=B.aR.p6(a,m,s)
else{l=A.oR(a,m,s,B.G,!0,!1)
if(l!=null)a=B.b.ci(a,m,s,l)}return new A.kW(a,j,c)},
td(){var s,r,q,p,o,n,m="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",l=".",k=":",j="/",i="\\",h="?",g="#",f="/\\",e=A.a(new Array(22),t.bs)
for(s=0;s<22;++s)e[s]=new Uint8Array(96)
r=new A.lW(e)
q=new A.lX()
p=new A.lY()
o=t.hb.a(r.$2(0,225))
q.$3(o,m,1)
q.$3(o,l,14)
q.$3(o,k,34)
q.$3(o,j,3)
q.$3(o,i,227)
q.$3(o,h,172)
q.$3(o,g,205)
n=r.$2(14,225)
q.$3(n,m,1)
q.$3(n,l,15)
q.$3(n,k,34)
q.$3(n,f,234)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(15,225)
q.$3(n,m,1)
q.$3(n,"%",225)
q.$3(n,k,34)
q.$3(n,j,9)
q.$3(n,i,233)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(1,225)
q.$3(n,m,1)
q.$3(n,k,34)
q.$3(n,j,10)
q.$3(n,i,234)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(2,235)
q.$3(n,m,139)
q.$3(n,j,131)
q.$3(n,i,131)
q.$3(n,l,146)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(3,235)
q.$3(n,m,11)
q.$3(n,j,68)
q.$3(n,i,68)
q.$3(n,l,18)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(4,229)
q.$3(n,m,5)
p.$3(n,"AZ",229)
q.$3(n,k,102)
q.$3(n,"@",68)
q.$3(n,"[",232)
q.$3(n,j,138)
q.$3(n,i,138)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(5,229)
q.$3(n,m,5)
p.$3(n,"AZ",229)
q.$3(n,k,102)
q.$3(n,"@",68)
q.$3(n,j,138)
q.$3(n,i,138)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(6,231)
p.$3(n,"19",7)
q.$3(n,"@",68)
q.$3(n,j,138)
q.$3(n,i,138)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(7,231)
p.$3(n,"09",7)
q.$3(n,"@",68)
q.$3(n,j,138)
q.$3(n,i,138)
q.$3(n,h,172)
q.$3(n,g,205)
q.$3(r.$2(8,8),"]",5)
n=r.$2(9,235)
q.$3(n,m,11)
q.$3(n,l,16)
q.$3(n,f,234)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(16,235)
q.$3(n,m,11)
q.$3(n,l,17)
q.$3(n,f,234)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(17,235)
q.$3(n,m,11)
q.$3(n,j,9)
q.$3(n,i,233)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(10,235)
q.$3(n,m,11)
q.$3(n,l,18)
q.$3(n,f,234)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(18,235)
q.$3(n,m,11)
q.$3(n,l,19)
q.$3(n,f,234)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(19,235)
q.$3(n,m,11)
q.$3(n,f,234)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(11,235)
q.$3(n,m,11)
q.$3(n,j,10)
q.$3(n,f,234)
q.$3(n,h,172)
q.$3(n,g,205)
n=r.$2(12,236)
q.$3(n,m,12)
q.$3(n,h,12)
q.$3(n,g,205)
n=r.$2(13,237)
q.$3(n,m,13)
q.$3(n,h,13)
p.$3(r.$2(20,245),"az",21)
n=r.$2(21,245)
p.$3(n,"az",21)
p.$3(n,"09",21)
q.$3(n,"+-.",21)
return e},
p5(a,b,c,d,e){var s,r,q,p,o=$.pZ()
for(s=b;s<c;++s){if(!(d>=0&&d<o.length))return A.c(o,d)
r=o[d]
q=B.b.E(a,s)^96
p=r[q>95?31:q]
d=p&31
B.a.v(e,p>>>5,s)}return d},
oC(a){if(a.b===7&&B.b.a_(a.a,"package")&&a.c<=0)return A.p7(a.a,a.e,a.f)
return-1},
p7(a,b,c){var s,r,q
for(s=b,r=0;s<c;++s){q=B.b.J(a,s)
if(q===47)return r!==0?s:-1
if(q===37||q===58)return-1
r|=q^46}return-1},
ta(a,b,c){var s,r,q,p,o,n,m
for(s=a.length,r=0,q=0;q<s;++q){p=B.b.E(a,q)
o=B.b.E(b,c+q)
n=p^o
if(n!==0){if(n===32){m=o|n
if(97<=m&&m<=122){r=32
continue}}return-1}}return r},
lo:function lo(){},
a4:function a4(){},
dN:function dN(a){this.a=a},
cn:function cn(){},
hr:function hr(){},
bM:function bM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dp:function dp(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
he:function he(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
i3:function i3(a){this.a=a},
eQ:function eQ(a){this.a=a},
ck:function ck(a){this.a=a},
fW:function fW(a){this.a=a},
hw:function hw(){},
eG:function eG(){},
fY:function fY(a){this.a=a},
it:function it(a){this.a=a},
e6:function e6(a,b,c){this.a=a
this.b=b
this.c=c},
j:function j(){},
V:function V(){},
bq:function bq(a,b,c){this.a=a
this.b=b
this.$ti=c},
aq:function aq(){},
K:function K(){},
iD:function iD(){},
hH:function hH(a){this.a=a},
hG:function hG(a){var _=this
_.a=a
_.c=_.b=0
_.d=-1},
a5:function a5(a){this.a=a},
kX:function kX(a){this.a=a},
kY:function kY(a){this.a=a},
kZ:function kZ(a,b){this.a=a
this.b=b},
fd:function fd(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.y=_.x=_.w=$},
kW:function kW(a,b,c){this.a=a
this.b=b
this.c=c},
lW:function lW(a){this.a=a},
lX:function lX(){},
lY:function lY(){},
bu:function bu(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
ij:function ij(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.y=_.x=_.w=$},
qP(a){var s=new Path2D(a)
s.toString
return s},
lp(a,b,c,d,e){var s=A.p9(new A.lq(c),t.fq),r=s!=null
if(r&&!0){t.X.a(s)
if(r)J.q1(a,b,s,!1)}return new A.eY(a,b,s,!1,e.h("eY<0>"))},
p9(a,b){var s=$.aa
if(s===B.l)return a
return s.nv(a,b)},
x:function x(){},
fE:function fE(){},
fH:function fH(){},
cC:function cC(){},
dR:function dR(){},
bN:function bN(){},
jl:function jl(){},
dW:function dW(){},
r:function r(){},
t:function t(){},
aW:function aW(){},
h6:function h6(){},
bb:function bb(){},
b5:function b5(){},
hy:function hy(){},
hK:function hK(){},
bD:function bD(){},
dw:function dw(){},
lh:function lh(a){this.a=a},
eV:function eV(){},
mF:function mF(a,b){this.a=a
this.$ti=b},
eX:function eX(){},
ip:function ip(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
eY:function eY(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
lq:function lq(a){this.a=a},
px(a,b,c){A.iM(c,t.p,"T","min")
return Math.min(c.a(a),c.a(b))},
pw(a,b,c){A.iM(c,t.p,"T","max")
return Math.max(c.a(a),c.a(b))},
iy:function iy(){this.b=this.a=0},
cR:function cR(a,b,c){this.a=a
this.b=b
this.$ti=c},
ai:function ai(a,b){this.a=a
this.$ti=b},
k5:function k5(a){this.a=a},
eZ:function eZ(a,b){this.a=a
this.b=null
this.$ti=b},
oY(a,b){var s,r,q,p,o,n,m=null
for(s=a.length,r=!b,q=m,p=0;p<s;++p){switch(B.b.E(a,p)){case 34:o=r?'\\"':m
break
case 39:o=b?"\\'":m
break
default:o=m}n=o==null
if(!n&&q==null)q=new A.a5(B.b.B(a,0,p))
if(q!=null)q.a+=n?a[p]:o}if(q==null)s=a
else{s=q.a
s=s.charCodeAt(0)==0?s:s}return s},
mY(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=a.length,r=0;r<s;++r){q=a[r]
p=A.ay(q.i(0,"value"))
o=p.length
if(e===o){for(n=d,m=!0,l=0;l<o;++l,n=j){k=B.b.E(p,l)
j=n+1
i=B.b.J(c,n)
if(m)if(i!==k){h=i>=65&&i<=90&&i+32===k
m=h}else m=!0
else m=!1
if(!m)break}if(m)return A.a_(q.i(0,b))}}return-1},
rj(a){var s,r
if(a===24)return"%"
else for(s=0;s<26;++s){r=B.ac[s]
if(A.a_(r.i(0,"unit"))===a)return A.iJ(r.i(0,"value"))}return"<BAD UNIT>"},
om(a){switch(a){case 0:return"ERROR"
case 1:return"end of file"
case 2:return"("
case 3:return")"
case 4:return"["
case 5:return"]"
case 6:return"{"
case 7:return"}"
case 8:return"."
case 9:return";"
case 10:return"@"
case 11:return"#"
case 12:return"+"
case 13:return">"
case 14:return"~"
case 15:return"*"
case 16:return"|"
case 17:return":"
case 18:return"_"
case 19:return","
case 20:return" "
case 21:return"\t"
case 22:return"\n"
case 23:return"\r"
case 24:return"%"
case 25:return"'"
case 26:return'"'
case 27:return"/"
case 28:return"="
case 30:return"^"
case 31:return"$"
case 32:return"<"
case 33:return"!"
case 34:return"-"
case 35:return"\\"
default:throw A.d("Unknown TOKEN")}},
ol(a){switch(a){case 641:case 642:case 643:case 644:case 645:case 646:case 647:case 648:case 649:case 650:case 651:case 652:case 653:case 654:case 655:case 656:case 600:case 601:case 602:case 603:case 604:case 605:case 606:case 607:case 608:case 609:case 610:case 612:case 613:case 614:case 615:case 617:return!0
default:return!1}},
i0(a){var s
if(!(a>=97&&a<=122))s=a>=65&&a<=90||a===95||a>=160||a===92
else s=!0
return s},
lI:function lI(a){this.a=a
this.c=null
this.d=$},
bs:function bs(a,b){this.a=a
this.b=b},
ha:function ha(a,b,c){this.c=a
this.a=b
this.b=c},
kR:function kR(a,b,c,d,e,f,g,h,i){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.a=f
_.b=g
_.c=h
_.e=_.d=!1
_.f=i
_.r=0},
kS:function kS(){},
dh:function dh(a){this.b=a},
dg:function dg(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kg:function kg(a,b,c){this.a=a
this.b=b
this.c=c},
qR(a,b){return new A.ky(b)},
ky:function ky(a){this.w=a},
bY:function bY(a,b){this.b=a
this.a=b},
cp:function cp(a){this.a=a},
hY:function hY(a){this.a=a},
hp:function hp(a){this.a=a},
hL:function hL(a,b){this.b=a
this.a=b},
ch:function ch(a,b){this.b=a
this.a=b},
eD:function eD(a,b,c){this.b=a
this.c=b
this.a=c},
b0:function b0(){},
cG:function cG(a,b){this.b=a
this.a=b},
hm:function hm(a,b,c){this.d=a
this.b=b
this.a=c},
fL:function fL(a,b,c,d){var _=this
_.d=a
_.e=b
_.b=c
_.a=d},
h9:function h9(a,b){this.b=a
this.a=b},
fS:function fS(a,b){this.b=a
this.a=b},
dm:function dm(a,b){this.b=a
this.a=b},
dn:function dn(a,b,c){this.d=a
this.b=b
this.a=c},
ex:function ex(a,b,c){this.f=a
this.b=b
this.a=c},
hD:function hD(a,b,c){this.d=a
this.b=b
this.a=c},
ds:function ds(a,b){this.b=a
this.a=b},
hq:function hq(a,b,c){this.d=a
this.b=b
this.a=c},
hv:function hv(a){this.a=a},
hu:function hu(a){this.a=a},
aj:function aj(a,b,c){this.c=a
this.d=b
this.a=c},
ht:function ht(a,b,c){this.c=a
this.d=b
this.a=c},
bt:function bt(){},
hj:function hj(a,b,c,d){var _=this
_.f=a
_.c=b
_.d=c
_.a=d},
hA:function hA(a,b,c){this.c=a
this.d=b
this.a=c},
h0:function h0(a,b,c){this.c=a
this.d=b
this.a=c},
h3:function h3(a,b,c){this.c=a
this.d=b
this.a=c},
fF:function fF(a,b,c,d){var _=this
_.f=a
_.c=b
_.d=c
_.a=d},
hZ:function hZ(a,b,c,d){var _=this
_.f=a
_.c=b
_.d=c
_.a=d},
h8:function h8(a,b,c,d){var _=this
_.f=a
_.c=b
_.d=c
_.a=d},
h7:function h7(a,b,c){this.c=a
this.d=b
this.a=c},
hF:function hF(a,b,c,d){var _=this
_.f=a
_.c=b
_.d=c
_.a=d},
fR:function fR(a,b,c,d){var _=this
_.f=a
_.c=b
_.d=c
_.a=d},
hE:function hE(a,b,c,d){var _=this
_.f=a
_.c=b
_.d=c
_.a=d},
i9:function i9(a,b,c,d){var _=this
_.f=a
_.c=b
_.d=c
_.a=d},
T:function T(){},
ap:function ap(){},
ia:function ia(){},
nT(){return new A.dV(A.ab(null,null,t.K,t.N))},
nU(a,b,c){return new A.fZ(a,b,c,A.ab(null,null,t.K,t.N))},
mX(a){return new A.c1(a,A.ab(null,null,t.K,t.N))},
mE(a,b){return new A.W(b,a,A.ab(null,null,t.K,t.N))},
nR(a){return new A.fV(a,A.ab(null,null,t.K,t.N))},
aH:function aH(a,b,c){this.a=a
this.b=b
this.c=c},
ix:function ix(){},
lH:function lH(){},
io:function io(){},
ak:function ak(){},
dV:function dV(a){var _=this
_.a=null
_.b=a
_.d=_.c=$
_.e=null},
fZ:function fZ(a,b,c,d){var _=this
_.w=a
_.x=b
_.y=c
_.a=null
_.b=d
_.d=_.c=$
_.e=null},
c1:function c1(a,b){var _=this
_.w=a
_.a=null
_.b=b
_.d=_.c=$
_.e=null},
W:function W(a,b,c){var _=this
_.w=a
_.x=b
_.a=null
_.b=c
_.d=_.c=$
_.e=null},
fV:function fV(a,b){var _=this
_.w=a
_.a=null
_.b=b
_.d=_.c=$
_.e=null},
ad:function ad(a,b){this.b=a
this.a=b},
h5:function h5(a){this.a=a},
jr:function jr(){},
ik:function ik(){},
il:function il(){},
im:function im(){},
iq:function iq(){},
ir:function ir(){},
iu:function iu(){},
jZ:function jZ(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.f=!1
_.r="no quirks"
_.w=null
_.x=$
_.y=null
_.z=!0
_.ok=_.k4=_.k3=_.k2=_.k1=_.id=_.go=_.fy=_.fx=_.fr=_.dy=_.dx=_.db=_.cy=_.cx=_.CW=_.ch=_.ay=_.ax=_.at=_.as=_.Q=$},
a7:function a7(){},
kx:function kx(a){this.a=a},
kw:function kw(a){this.a=a},
bz:function bz(a,b){this.a=a
this.b=b},
fO:function fO(a,b){this.a=a
this.b=b},
dQ:function dQ(a,b){this.a=a
this.b=b},
hc:function hc(a,b){this.a=a
this.b=b},
fD:function fD(a,b){this.a=a
this.b=b},
d9:function d9(a,b){this.c=!1
this.a=a
this.b=b},
k2:function k2(a){this.a=a},
k1:function k1(a){this.a=a},
hX:function hX(a,b){this.a=a
this.b=b},
ef:function ef(a,b){this.a=a
this.b=b},
db:function db(a,b,c){var _=this
_.c=null
_.d=a
_.a=b
_.b=c},
k3:function k3(){},
ea:function ea(a,b){this.a=a
this.b=b},
eb:function eb(a,b){this.a=a
this.b=b},
cH:function cH(a,b){this.a=a
this.b=b},
ed:function ed(a,b){this.a=a
this.b=b},
da:function da(a,b){this.a=a
this.b=b},
ee:function ee(a,b){this.a=a
this.b=b},
hd:function hd(a,b){this.a=a
this.b=b},
hb:function hb(a,b){this.a=a
this.b=b},
fB:function fB(a,b){this.a=a
this.b=b},
ec:function ec(a,b){this.a=a
this.b=b},
fC:function fC(a,b){this.a=a
this.b=b},
fz:function fz(a,b){this.a=a
this.b=b},
fA:function fA(a,b){this.a=a
this.b=b},
aZ:function aZ(a,b,c){this.a=a
this.b=b
this.c=c},
qL(a){switch(a){case"http://www.w3.org/1999/xhtml":return"html"
case"http://www.w3.org/1998/Math/MathML":return"math"
case"http://www.w3.org/2000/svg":return"svg"
case"http://www.w3.org/1999/xlink":return"xlink"
case"http://www.w3.org/XML/1998/namespace":return"xml"
case"http://www.w3.org/2000/xmlns/":return"xmlns"
default:return null}},
a6(a){A.iJ(a)
if(a==null)return!1
return A.nq(B.b.E(a,0))},
nq(a){switch(a){case 9:case 10:case 12:case 13:case 32:return!0}return!1},
aS(a){var s,r
if(a==null)return!1
s=B.b.E(a,0)
if(!(s>=97&&s<=122))r=s>=65&&s<=90
else r=!0
return r},
ms(a){var s
if(a==null)return!1
s=B.b.E(a,0)
return s>=48&&s<58},
pt(a){if(a==null)return!1
switch(B.b.E(a,0)){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 65:case 66:case 67:case 68:case 69:case 70:case 97:case 98:case 99:case 100:case 101:case 102:return!0}return!1},
qb(a){A.a_(a)
return a>=65&&a<=90?a+97-65:a},
kB:function kB(){},
h_:function h_(a){this.a=a},
ii:function ii(){},
jp:function jp(a){this.a=a
this.b=-1},
jg:function jg(a){this.a=a},
tp(a){if(1<=a&&a<=8)return!0
if(14<=a&&a<=31)return!0
if(127<=a&&a<=159)return!0
if(55296<=a&&a<=57343)return!0
if(64976<=a&&a<=65007)return!0
switch(a){case 11:case 65534:case 65535:case 131070:case 131071:case 196606:case 196607:case 262142:case 262143:case 327678:case 327679:case 393214:case 393215:case 458750:case 458751:case 524286:case 524287:case 589822:case 589823:case 655358:case 655359:case 720894:case 720895:case 786430:case 786431:case 851966:case 851967:case 917502:case 917503:case 983038:case 983039:case 1048574:case 1048575:case 1114110:case 1114111:return!0}return!1},
tO(a){var s=A.ax("[\t-\r -/:-@[-`{-~]")
if(a==null)return null
return B.cL.i(0,A.bv(a,s,"").toLowerCase())},
te(a,b){switch(a){case"ascii":return new A.a9(B.aQ.e0(0,b))
case"utf-8":return new A.a9(B.u.e0(0,b))
default:throw A.d(A.a8("Encoding "+a+" not supported",null))}},
jY:function jY(a,b,c,d){var _=this
_.a=a
_.b=!0
_.d=b
_.f=_.e=null
_.r=c
_.w=null
_.x=d
_.y=0},
aY:function aY(){},
of(a){switch(a){case"before":case"after":case"first-line":case"first-letter":return!0
default:return!1}},
r5(a){var s,r
for(;a!=null;){s=a.b.i(0,"lang")
if(s!=null)return s
r=a.a
a=r instanceof A.W?r:null}return null},
eB:function eB(){this.a=null},
kI:function kI(){},
kJ:function kJ(){},
kH:function kH(){},
kG:function kG(a){this.a=a},
aN(a,b,c,d){return new A.cj(b==null?A.ab(null,null,t.K,t.N):b,c,a,d)},
b7:function b7(){},
c0:function c0(){},
cj:function cj(a,b,c,d){var _=this
_.e=a
_.r=!1
_.w=b
_.b=c
_.c=d
_.a=null},
L:function L(a,b){this.b=a
this.c=b
this.a=null},
be:function be(){},
m:function m(a,b,c){var _=this
_.e=a
_.b=b
_.c=c
_.a=null},
G:function G(a,b){this.b=a
this.c=b
this.a=null},
cT:function cT(a,b){this.b=a
this.c=b
this.a=null},
d5:function d5(a,b){this.b=a
this.c=b
this.a=null},
dU:function dU(a){var _=this
_.c=_.b=null
_.d=""
_.e=a
_.a=null},
eK:function eK(){this.a=null
this.b=$},
mc:function mc(){},
mb:function mb(){},
e9:function e9(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=null
_.r=e
_.w=null
_.x=$
_.y=f
_.z=$
_.at=_.as=_.Q=null
_.ax=g
_.ay=h},
k_:function k_(a){this.a=a},
k0:function k0(a){this.a=a},
tz(a,b){var s,r,q=a.a
if(q!==b.a)return!1
if(q===0)return!0
for(q=A.o1(a,a.r,A.D(a).c);q.m();){s=q.d
r=b.i(0,s)
if(r==null&&!b.aj(s))return!1
if(!J.U(a.i(0,s),r))return!1}return!0},
on(a,b,c,d){var s,r,q,p,o=a.gal(a)
if(d==null)if(!o.gah(o)&&o.gq(o) instanceof A.c1){s=t.oI.a(o.gq(o))
s.iY(0,b)
if(c!=null){r=c.a
q=s.e
s.e=r.f_(0,A.c9(q.a,q.b).b,A.c9(r,c.c).b)}}else{r=A.mX(b)
r.e=c
o.p(0,r)}else{p=o.ak(o,d)
if(p>0){r=p-1
q=o.a
if(!(r<q.length))return A.c(q,r)
r=q[r] instanceof A.c1}else r=!1
if(r){r=p-1
q=o.a
if(!(r>=0&&r<q.length))return A.c(q,r)
t.oI.a(q[r]).iY(0,b)}else{r=A.mX(b)
r.e=c
o.bF(0,p,r)}}},
fy:function fy(a){this.a=a},
kT:function kT(a,b,c){var _=this
_.a=a
_.b=$
_.c=b
_.d=c
_.f=_.e=null
_.r=!1},
nv(a,b,c,d){var s
if(c==null)c=a.length
if(c<b)c=b
s=a.length
return B.a.b8(a,b,c>s?s:c)},
ni(a){var s,r
for(s=a.length,r=0;r<s;++r)if(!A.nq(B.b.E(a,r)))return!1
return!0},
py(a,b){var s,r=a.length
if(r===b)return a
b-=r
for(s=0,r="";s<b;++s)r+="0"
r+=a
return r.charCodeAt(0)==0?r:r},
u_(a,b){var s={}
s.a=a
if(b==null)return a
b.bc(0,new A.mf(s))
return s.a},
o:function o(a,b,c){this.a=a
this.b=b
this.$ti=c},
mf:function mf(a){this.a=a},
og(a){var s=new A.hM(1,A.iP(),0,a)
s.f=s.b5()
return s},
e5(a){var s=new A.h4(1,A.iP(),0,a)
s.f=s.b5()
s.hW(a,0,A.iP(),1,null)
return s},
rk(a,b,c,d,e){var s=new A.eO(d,c,b,a)
s.f=s.b5()
s.hW(a,b,c,d,e)
return s},
aT:function aT(){},
fG:function fG(a,b,c,d,e){var _=this
_.x=a
_.z=_.y=$
_.a=b
_.b=c
_.c=d
_.f=$
_.r=e
_.w=$},
hN:function hN(){},
hM:function hM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.f=$
_.r=d
_.w=$},
h4:function h4(a,b,c,d){var _=this
_.y=_.x=$
_.as=null
_.a=a
_.b=b
_.c=c
_.f=$
_.r=d
_.w=$},
eO:function eO(a,b,c,d){var _=this
_.y=_.x=$
_.as=null
_.a=a
_.b=b
_.c=c
_.f=$
_.r=d
_.w=$},
eR:function eR(a,b,c,d,e,f){var _=this
_.x=a
_.a=b
_.b=c
_.c=d
_.f=$
_.r=e
_.w=$
_.$ti=f},
jb:function jb(a){var _=this
_.c=14.222222222222221
_.d=8
_.f=a
_.r=$},
jc:function jc(){},
jd:function jd(){},
dJ:function dJ(){},
fx:function fx(){},
iU:function iU(a){this.a=a},
iV:function iV(a){this.a=a},
iW:function iW(a){this.a=a},
fP:function fP(a,b,c,d,e,f,g,h){var _=this
_.d=a
_.e=b
_.f=0
_.r=c
_.w=!1
_.x=d
_.y=e
_.z=f
_.Q=g
_.as=h
_.b=_.a=$},
mT(a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a9.aX,a5=a9.ea,a6=A.h(a9.ju,!0,t.W),a7=a9.oq,a8=a9.fU
if(a8!=null){s=A.v(a8)
s=A.h(new A.J(a8,s.h("aw(1)").a(new A.ks()),s.h("J<1,aw>")),!0,t.F)
a8=s}else a8=a3
s=a9.da
if(s!=null){r=A.v(s)
r=A.h(new A.J(s,r.h("aw(1)").a(new A.kt()),r.h("J<1,aw>")),!0,t.F)
s=r}else s=a3
r=a9.a7
q=a9.ag
A.b6(a3,0,B.c,a3,0)
p=a9.fx
o=a9.fy
n=A.cm(a9.go)
m=a9.id
m=m==null?a3:A.aO(m)
l=a9.k1
l=l==null?a3:A.aO(l)
k=a9.ax
k=k==null?a3:J.q(k,new A.a1(),t.G)
if(k==null)k=A.a([],t.O)
j=t.G
k=A.h(k,!0,j)
i=a9.ay
i=i==null?a3:J.q(i,new A.a2(),j)
i=A.h(i==null?A.a([],t.O):i,!0,j)
h=a9.ch
h=h==null?a3:J.q(h,new A.a3(),j)
j=A.h(h==null?A.a([],t.O):h,!0,j)
h=a9.w
g=a9.x
f=a9.Q
e=a9.a
e===$&&A.b("color")
e=e.t()
d=a9.b
d===$&&A.b("name")
a9.c===$&&A.b("target")
c=A.a([],t.r)
b=a9.d
b===$&&A.b("submobjects")
a=b.length
a0=0
for(;a0<b.length;b.length===a||(0,A.e)(b),++a0)c.push(b[a0].t())
b=a9.f
b===$&&A.b("updatingSuspended")
a=A.a([],t.l)
a1=a9.r
a1===$&&A.b("points")
a1=J.I(a1)
for(;a1.m();){a2=a1.gu()
a.push(new A.f(a2.a,a2.b,a2.c))}return new A.dj(a9.d9,a4,a9.fT,a9.cb,a9.cc,a9.jt,a5,a6,!1,a9.on,a9.jv,a9.oo,a9.op,new A.f(a7.a,a7.b,a7.c),a9.or,a9.jw,a9.os,a9.ot,a9.ou,a9.ov,a8,s,a9.y2,a9.a6,r,q,p,new A.f(o.a,o.b,o.c),n,m,l,h,g,a9.y,a9.z,f,a9.as,a9.at,k,i,j,e,d,a3,c,b,a)},
nI(a,b,c,d,e,f,g,h){var s=null,r=new A.cB(b,a,c,f,e,d,h,g,4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
r.f2(s)
r.hT(a,b,c,d,e,f,g,h)
return r},
nJ(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a0.e5,d=A.dP(a0.e6),c=A.dP(a0.e7),b=A.dP(a0.e8),a=a0.ax
a=a==null?f:J.q(a,new A.a1(),t.G)
if(a==null)a=A.a([],t.O)
s=t.G
a=A.h(a,!0,s)
r=a0.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a0.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a0.w
p=a0.x
o=a0.Q
n=a0.a
n===$&&A.b("color")
n=n.t()
m=a0.b
m===$&&A.b("name")
a0.c===$&&A.b("target")
l=A.a([],t.r)
k=a0.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a0.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a0.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}e=new A.cB(new A.f(e.a,e.b,e.c),d,c,b,a0.to,a0.x1,a0.x2,a0.xr,q,p,a0.y,a0.z,o,a0.as,a0.at,a,r,s,n,m,f,l,k,j)
e.hU(a0)
return e},
qN(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=null,a1=B.B.bJ(B.O),a2=B.o.bJ(B.o),a3=B.a4.bJ(B.N),a4=t.b1,a5=A.a([],a4),a6=a7.fR
a6===$&&A.b("backgroundLines")
s=a6.length
r=0
for(;r<a6.length;a6.length===s||(0,A.e)(a6),++r)a5.push(a6[r].t())
a4=A.a([],a4)
a6=a7.fS
a6===$&&A.b("fadedLines")
s=a6.length
r=0
for(;r<a6.length;a6.length===s||(0,A.e)(a6),++r)a4.push(a6[r].t())
a6=a7.eb
a6=a6==null?a0:A.ot(a6)
s=A.ot(a7.fV)
q=a7.e5
p=A.dP(a7.e6)
o=A.dP(a7.e7)
n=A.dP(a7.e8)
m=a7.ax
m=m==null?a0:J.q(m,new A.a1(),t.G)
if(m==null)m=A.a([],t.O)
l=t.G
m=A.h(m,!0,l)
k=a7.ay
k=k==null?a0:J.q(k,new A.a2(),l)
k=A.h(k==null?A.a([],t.O):k,!0,l)
j=a7.ch
j=j==null?a0:J.q(j,new A.a3(),l)
l=A.h(j==null?A.a([],t.O):j,!0,l)
j=a7.w
i=a7.x
h=a7.Q
g=a7.a
g===$&&A.b("color")
g=g.t()
f=a7.b
f===$&&A.b("name")
a7.c===$&&A.b("target")
e=A.a([],t.r)
d=a7.d
d===$&&A.b("submobjects")
c=d.length
r=0
for(;r<d.length;d.length===c||(0,A.e)(d),++r)e.push(d[r].t())
d=a7.f
d===$&&A.b("updatingSuspended")
c=A.a([],t.l)
b=a7.r
b===$&&A.b("points")
b=J.I(b)
for(;b.m();){a=b.gu()
c.push(new A.f(a.a,a.b,a.c))}a1=new A.ev(a1,a2,a3,s,a6,a7.jx,a7.jy,a7.js,a5,a4,new A.f(q.a,q.b,q.c),p,o,n,a7.to,a7.x1,a7.x2,a7.xr,j,i,a7.y,a7.z,h,a7.as,a7.at,m,k,l,g,f,a0,e,d,c)
a1.hU(a7)
return a1},
d2(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0){return new A.aM(a,f,c,g,a0,e,q,p,h,n,d,m,j,k,l,i,s,r,b,o)},
dP(a){return new A.aM(a.a,a.b,a.c,a.d,a.e,a.f,a.r,a.w,a.x,a.y,a.z,a.Q,a.as,a.at,a.ax,a.ay,a.ch,a.CW,a.cx,a.cy)},
dj:function dj(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7){var _=this
_.d9=a
_.aX=b
_.fT=c
_.cb=d
_.cc=e
_.jt=f
_.ea=g
_.ju=h
_.q9=i
_.on=j
_.jv=k
_.oo=l
_.op=m
_.oq=n
_.or=o
_.jw=p
_.os=q
_.ot=r
_.ou=s
_.ov=a0
_.fU=a1
_.da=a2
_.y2=a3
_.a6=a4
_.a7=a5
_.ag=a6
_.fx=a7
_.fy=a8
_.go=a9
_.id=b0
_.k1=b1
_.w=b2
_.x=b3
_.y=b4
_.z=b5
_.Q=b6
_.as=b7
_.at=b8
_.ax=b9
_.ay=c0
_.ch=c1
_.a=c2
_.b=c3
_.c=c4
_.d=c5
_.e=$
_.f=c6
_.r=c7},
ks:function ks(){},
kt:function kt(){},
fX:function fX(){},
jk:function jk(a){this.a=a},
cB:function cB(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){var _=this
_.e5=a
_.e6=b
_.e7=c
_.e8=d
_.e9=_.bD=_.bb=$
_.to=e
_.x1=f
_.x2=g
_.xr=h
_.w=i
_.x=j
_.y=k
_.z=l
_.Q=m
_.as=n
_.at=o
_.ax=p
_.ay=q
_.ch=r
_.a=s
_.b=a0
_.c=a1
_.d=a2
_.e=$
_.f=a3
_.r=a4},
ja:function ja(){},
ev:function ev(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4){var _=this
_.da=a
_.ow=b
_.ox=c
_.fV=d
_.eb=e
_.jx=f
_.jy=g
_.js=h
_.fR=i
_.fS=j
_.e5=k
_.e6=l
_.e7=m
_.e8=n
_.e9=_.bD=_.bb=$
_.to=o
_.x1=p
_.x2=q
_.xr=r
_.w=s
_.x=a0
_.y=a1
_.z=a2
_.Q=a3
_.as=a4
_.at=a5
_.ax=a6
_.ay=a7
_.ch=a8
_.a=a9
_.b=b0
_.c=b1
_.d=b2
_.e=$
_.f=b3
_.r=b4},
aM:function aM(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0},
qO(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=A.h(a.k1,!0,t.W),d=a.ax
d=d==null?f:J.q(d,new A.a1(),t.G)
if(d==null)d=A.a([],t.O)
s=t.G
d=A.h(d,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.dk(a.fx,a.fy,a.go,a.id,e,a.k2,q,p,a.y,a.z,o,a.as,a.at,d,r,s,n,m,f,l,k,j)},
qr(a,b,c,d,e,f,g){var s=null,r=new A.e8(d,e,g,f,c,b,new A.jA(d),4,0,!1,0.01,!1,0.000001,4,s,s,s,a,$,s,$,$,$)
r.ae(a,s,s)
r.cm(B.k)
return r},
mH(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=A.h(a.k1,!0,t.W),d=a.ax
d=d==null?f:J.q(d,new A.a1(),t.G)
if(d==null)d=A.a([],t.O)
s=t.G
d=A.h(d,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.e8(a.a6,a.fx,a.fy,a.go,a.id,e,a.k2,q,p,a.y,a.z,o,a.as,a.at,d,r,s,n,m,f,l,k,j)},
dk:function dk(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2){var _=this
_.fx=a
_.fy=b
_.go=c
_.id=d
_.k1=e
_.k2=f
_.w=g
_.x=h
_.y=i
_.z=j
_.Q=k
_.as=l
_.at=m
_.ax=n
_.ay=o
_.ch=p
_.a=q
_.b=r
_.c=s
_.d=a0
_.e=$
_.f=a1
_.r=a2},
ku:function ku(a){this.a=a},
e8:function e8(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
_.a6=a
_.fx=b
_.fy=c
_.go=d
_.id=e
_.k1=f
_.k2=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.a=r
_.b=s
_.c=a0
_.d=a1
_.e=$
_.f=a2
_.r=a3},
jA:function jA(a){this.a=a},
b6(a,b,c,d,e){var s=t.O,r=A.a([c],s),q=d!=null?A.a([d],s):A.a([],s)
return new A.eM(r,q,e,a!=null?A.a([a],s):A.a([],s),b)},
cm(a){var s,r,q,p,o=a.a
if(o!=null){s=A.a([],t.O)
for(o=J.I(o);o.m();){r=o.gu()
s.push(new A.P(r.a,r.b,r.c,r.d))}o=s}else o=null
s=a.b
if(s!=null){r=A.a([],t.O)
for(s=J.I(s);s.m();){q=s.gu()
r.push(new A.P(q.a,q.b,q.c,q.d))}s=r}else s=null
r=a.d
if(r!=null){q=A.a([],t.O)
for(r=J.I(r);r.m();){p=r.gu()
q.push(new A.P(p.a,p.b,p.c,p.d))}r=q}else r=null
return new A.eM(o,s,a.c,r,a.e)},
ri(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null
A.b6(a1,0,B.c,a1,0)
s=a2.fx
r=a2.fy
q=A.cm(a2.go)
p=a2.id
p=p==null?a1:A.aO(p)
o=a2.k1
o=o==null?a1:A.aO(o)
n=a2.ax
n=n==null?a1:J.q(n,new A.a1(),t.G)
if(n==null)n=A.a([],t.O)
m=t.G
n=A.h(n,!0,m)
l=a2.ay
l=l==null?a1:J.q(l,new A.a2(),m)
l=A.h(l==null?A.a([],t.O):l,!0,m)
k=a2.ch
k=k==null?a1:J.q(k,new A.a3(),m)
m=A.h(k==null?A.a([],t.O):k,!0,m)
k=a2.w
j=a2.x
i=a2.gdX()
h=a2.Q
g=a2.a
g===$&&A.b("color")
g=g.t()
f=a2.b
f===$&&A.b("name")
a2.c===$&&A.b("target")
e=A.a([],t.r)
d=a2.d
d===$&&A.b("submobjects")
c=d.length
b=0
for(;b<d.length;d.length===c||(0,A.e)(d),++b)e.push(d[b].t())
d=a2.f
d===$&&A.b("updatingSuspended")
c=A.a([],t.l)
a=a2.r
a===$&&A.b("points")
a=J.I(a)
for(;a.m();){a0=a.gu()
c.push(new A.f(a0.a,a0.b,a0.c))}return new A.eN(s,new A.f(r.a,r.b,r.c),q,p,o,k,j,i,a2.z,h,a2.as,a2.at,n,l,m,g,f,a1,e,d,c)},
q8(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=null
A.b6(a1,0,B.c,a1,0)
s=a2.fx
r=a2.fy
q=A.cm(a2.go)
p=a2.id
p=p==null?a1:A.aO(p)
o=a2.k1
o=o==null?a1:A.aO(o)
n=a2.ax
n=n==null?a1:J.q(n,new A.a1(),t.G)
if(n==null)n=A.a([],t.O)
m=t.G
n=A.h(n,!0,m)
l=a2.ay
l=l==null?a1:J.q(l,new A.a2(),m)
l=A.h(l==null?A.a([],t.O):l,!0,m)
k=a2.ch
k=k==null?a1:J.q(k,new A.a3(),m)
m=A.h(k==null?A.a([],t.O):k,!0,m)
k=a2.w
j=a2.x
i=a2.gdX()
h=a2.Q
g=a2.a
g===$&&A.b("color")
g=g.t()
f=a2.b
f===$&&A.b("name")
a2.c===$&&A.b("target")
e=A.a([],t.r)
d=a2.d
d===$&&A.b("submobjects")
c=d.length
b=0
for(;b<d.length;d.length===c||(0,A.e)(d),++b)e.push(d[b].t())
d=a2.f
d===$&&A.b("updatingSuspended")
c=A.a([],t.l)
a=a2.r
a===$&&A.b("points")
a=J.I(a)
for(;a.m();){a0=a.gu()
c.push(new A.f(a0.a,a0.b,a0.c))}return new A.dL(a2.y2,a2.a6,a2.a7,a2.ag,a2.bl,s,new A.f(r.a,r.b,r.c),q,p,o,k,j,i,a2.z,h,a2.as,a2.at,n,l,m,g,f,a1,e,d,c)},
q9(a,b,c){var s=null,r=new A.cA(0,a,1,B.e,9,0.35,B.m,A.b6(s,0,B.c,s,0),s,s,4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
r.aV(B.c)
if(a===0)r.eT(A.a([B.z,B.j],t.l))
r.cH(c,b)
return r},
qa(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=null
A.b6(a0,0,B.c,a0,0)
s=a1.fx
r=a1.fy
q=A.cm(a1.go)
p=a1.id
p=p==null?a0:A.aO(p)
o=a1.k1
o=o==null?a0:A.aO(o)
n=a1.ax
n=n==null?a0:J.q(n,new A.a1(),t.G)
if(n==null)n=A.a([],t.O)
m=t.G
n=A.h(n,!0,m)
l=a1.ay
l=l==null?a0:J.q(l,new A.a2(),m)
l=A.h(l==null?A.a([],t.O):l,!0,m)
k=a1.ch
k=k==null?a0:J.q(k,new A.a3(),m)
m=A.h(k==null?A.a([],t.O):k,!0,m)
k=a1.w
j=a1.x
i=a1.Q
h=a1.a
h===$&&A.b("color")
h=h.t()
g=a1.b
g===$&&A.b("name")
a1.c===$&&A.b("target")
f=A.a([],t.r)
e=a1.d
e===$&&A.b("submobjects")
d=e.length
c=0
for(;c<e.length;e.length===d||(0,A.e)(e),++c)f.push(e[c].t())
e=a1.f
e===$&&A.b("updatingSuspended")
d=A.a([],t.l)
b=a1.r
b===$&&A.b("points")
b=J.I(b)
for(;b.m();){a=b.gu()
d.push(new A.f(a.a,a.b,a.c))}return new A.cA(a1.y2,a1.a6,a1.a7,a1.ag,a1.bl,s,new A.f(r.a,r.b,r.c),q,p,o,k,j,a1.y,a1.z,i,a1.as,a1.at,n,l,m,h,g,a0,f,e,d)},
nP(a,b,c){var s=null,r=new A.d4(0,6.283185307179586,c,a,9,0.35,B.m,A.b6(s,0,B.c,s,0),s,s,4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
r.aV(b)
return r},
qg(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=null
A.b6(a0,0,B.c,a0,0)
s=a1.fx
r=a1.fy
q=A.cm(a1.go)
p=a1.id
p=p==null?a0:A.aO(p)
o=a1.k1
o=o==null?a0:A.aO(o)
n=a1.ax
n=n==null?a0:J.q(n,new A.a1(),t.G)
if(n==null)n=A.a([],t.O)
m=t.G
n=A.h(n,!0,m)
l=a1.ay
l=l==null?a0:J.q(l,new A.a2(),m)
l=A.h(l==null?A.a([],t.O):l,!0,m)
k=a1.ch
k=k==null?a0:J.q(k,new A.a3(),m)
m=A.h(k==null?A.a([],t.O):k,!0,m)
k=a1.w
j=a1.x
i=a1.Q
h=a1.a
h===$&&A.b("color")
h=h.t()
g=a1.b
g===$&&A.b("name")
a1.c===$&&A.b("target")
f=A.a([],t.r)
e=a1.d
e===$&&A.b("submobjects")
d=e.length
c=0
for(;c<e.length;e.length===d||(0,A.e)(e),++c)f.push(e[c].t())
e=a1.f
e===$&&A.b("updatingSuspended")
d=A.a([],t.l)
b=a1.r
b===$&&A.b("points")
b=J.I(b)
for(;b.m();){a=b.gu()
d.push(new A.f(a.a,a.b,a.c))}return new A.d4(a1.y2,a1.a6,a1.a7,a1.ag,a1.bl,s,new A.f(r.a,r.b,r.c),q,p,o,k,j,!0,a1.z,i,a1.as,a1.at,n,l,m,h,g,a0,f,e,d)},
nV(a){var s=null,r=new A.dX(0,6.283185307179586,0.08,a,9,0.35,B.m,A.b6(s,0,B.c,s,0),s,s,4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
r.aV(B.c)
return r},
nW(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=null
A.b6(a0,0,B.c,a0,0)
s=a1.fx
r=a1.fy
q=A.cm(a1.go)
p=a1.id
p=p==null?a0:A.aO(p)
o=a1.k1
o=o==null?a0:A.aO(o)
n=a1.ax
n=n==null?a0:J.q(n,new A.a1(),t.G)
if(n==null)n=A.a([],t.O)
m=t.G
n=A.h(n,!0,m)
l=a1.ay
l=l==null?a0:J.q(l,new A.a2(),m)
l=A.h(l==null?A.a([],t.O):l,!0,m)
k=a1.ch
k=k==null?a0:J.q(k,new A.a3(),m)
m=A.h(k==null?A.a([],t.O):k,!0,m)
k=a1.w
j=a1.x
i=a1.Q
h=a1.a
h===$&&A.b("color")
h=h.t()
g=a1.b
g===$&&A.b("name")
a1.c===$&&A.b("target")
f=A.a([],t.r)
e=a1.d
e===$&&A.b("submobjects")
d=e.length
c=0
for(;c<e.length;e.length===d||(0,A.e)(e),++c)f.push(e[c].t())
e=a1.f
e===$&&A.b("updatingSuspended")
d=A.a([],t.l)
b=a1.r
b===$&&A.b("points")
b=J.I(b)
for(;b.m();){a=b.gu()
d.push(new A.f(a.a,a.b,a.c))}return new A.dX(a1.y2,a1.a6,a1.a7,a1.ag,a1.bl,s,new A.f(r.a,r.b,r.c),q,p,o,k,j,!0,a1.z,i,a1.as,a1.at,n,l,m,h,g,a0,f,e,d)},
qo(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=null
A.b6(a0,0,B.c,a0,0)
s=a1.fx
r=a1.fy
q=A.cm(a1.go)
p=a1.id
p=p==null?a0:A.aO(p)
o=a1.k1
o=o==null?a0:A.aO(o)
n=a1.ax
n=n==null?a0:J.q(n,new A.a1(),t.G)
if(n==null)n=A.a([],t.O)
m=t.G
n=A.h(n,!0,m)
l=a1.ay
l=l==null?a0:J.q(l,new A.a2(),m)
l=A.h(l==null?A.a([],t.O):l,!0,m)
k=a1.ch
k=k==null?a0:J.q(k,new A.a3(),m)
m=A.h(k==null?A.a([],t.O):k,!0,m)
k=a1.w
j=a1.x
i=a1.Q
h=a1.a
h===$&&A.b("color")
h=h.t()
g=a1.b
g===$&&A.b("name")
a1.c===$&&A.b("target")
f=A.a([],t.r)
e=a1.d
e===$&&A.b("submobjects")
d=e.length
c=0
for(;c<e.length;e.length===d||(0,A.e)(e),++c)f.push(e[c].t())
e=a1.f
e===$&&A.b("updatingSuspended")
d=A.a([],t.l)
b=a1.r
b===$&&A.b("points")
b=J.I(b)
for(;b.m();){a=b.gu()
d.push(new A.f(a.a,a.b,a.c))}return new A.e_(a1.y2,a1.a6,a1.a7,a1.ag,a1.bl,s,new A.f(r.a,r.b,r.c),q,p,o,k,j,!0,a1.z,i,a1.as,a1.at,n,l,m,h,g,a0,f,e,d)},
mN(a,b,c){var s=null,r=new A.aw(0,s,c,b,0.35,B.m,A.b6(s,0,B.c,s,0),s,s,4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
r.aV(a)
return r},
o0(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=null,a1=a3.a7,a2=a3.ag
A.b6(a0,0,B.c,a0,0)
s=a3.fx
r=a3.fy
q=A.cm(a3.go)
p=a3.id
p=p==null?a0:A.aO(p)
o=a3.k1
o=o==null?a0:A.aO(o)
n=a3.ax
n=n==null?a0:J.q(n,new A.a1(),t.G)
if(n==null)n=A.a([],t.O)
m=t.G
n=A.h(n,!0,m)
l=a3.ay
l=l==null?a0:J.q(l,new A.a2(),m)
l=A.h(l==null?A.a([],t.O):l,!0,m)
k=a3.ch
k=k==null?a0:J.q(k,new A.a3(),m)
m=A.h(k==null?A.a([],t.O):k,!0,m)
k=a3.w
j=a3.x
i=a3.Q
h=a3.a
h===$&&A.b("color")
h=h.t()
g=a3.b
g===$&&A.b("name")
a3.c===$&&A.b("target")
f=A.a([],t.r)
e=a3.d
e===$&&A.b("submobjects")
d=e.length
c=0
for(;c<e.length;e.length===d||(0,A.e)(e),++c)f.push(e[c].t())
e=a3.f
e===$&&A.b("updatingSuspended")
d=A.a([],t.l)
b=a3.r
b===$&&A.b("points")
b=J.I(b)
for(;b.m();){a=b.gu()
d.push(new A.f(a.a,a.b,a.c))}return new A.aw(a3.y2,a3.a6,a1,a2,s,new A.f(r.a,r.b,r.c),q,p,o,k,j,a3.y,a3.z,i,a3.as,a3.at,n,l,m,h,g,a0,f,e,d)},
qQ(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.gaF()
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.ew(q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
r_(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.gaF()
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.ey(q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
rl(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.gaF()
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.eP(q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
aO(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.cb
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.dM(q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
qY(a,b,c){var s=null,r=A.a([B.A,B.L,B.y,B.M],t.l),q=new A.dq(4,0,!1,0.01,!1,0.000001,4,s,s,s,a,$,s,$,$,$)
q.ae(a,s,s)
q.dE(r,a)
q.f1(a,b,c)
return q},
qZ(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.dq(q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
r0(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.ez(q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
eM:function eM(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
i_:function i_(a){this.b=a},
eN:function eN(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
_.fx=a
_.fy=b
_.go=c
_.id=d
_.k1=e
_.w=f
_.x=g
_.y=h
_.z=i
_.Q=j
_.as=k
_.at=l
_.ax=m
_.ay=n
_.ch=o
_.a=p
_.b=q
_.c=r
_.d=s
_.e=$
_.f=a0
_.r=a1},
dL:function dL(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6){var _=this
_.y2=a
_.a6=b
_.a7=c
_.ag=d
_.bl=e
_.fx=f
_.fy=g
_.go=h
_.id=i
_.k1=j
_.w=k
_.x=l
_.y=m
_.z=n
_.Q=o
_.as=p
_.at=q
_.ax=r
_.ay=s
_.ch=a0
_.a=a1
_.b=a2
_.c=a3
_.d=a4
_.e=$
_.f=a5
_.r=a6},
cA:function cA(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6){var _=this
_.y2=a
_.a6=b
_.a7=c
_.ag=d
_.bl=e
_.fx=f
_.fy=g
_.go=h
_.id=i
_.k1=j
_.w=k
_.x=l
_.y=m
_.z=n
_.Q=o
_.as=p
_.at=q
_.ax=r
_.ay=s
_.ch=a0
_.a=a1
_.b=a2
_.c=a3
_.d=a4
_.e=$
_.f=a5
_.r=a6},
d4:function d4(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6){var _=this
_.y2=a
_.a6=b
_.a7=c
_.ag=d
_.bl=e
_.fx=f
_.fy=g
_.go=h
_.id=i
_.k1=j
_.w=k
_.x=l
_.y=m
_.z=n
_.Q=o
_.as=p
_.at=q
_.ax=r
_.ay=s
_.ch=a0
_.a=a1
_.b=a2
_.c=a3
_.d=a4
_.e=$
_.f=a5
_.r=a6},
dX:function dX(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6){var _=this
_.y2=a
_.a6=b
_.a7=c
_.ag=d
_.bl=e
_.fx=f
_.fy=g
_.go=h
_.id=i
_.k1=j
_.w=k
_.x=l
_.y=m
_.z=n
_.Q=o
_.as=p
_.at=q
_.ax=r
_.ay=s
_.ch=a0
_.a=a1
_.b=a2
_.c=a3
_.d=a4
_.e=$
_.f=a5
_.r=a6},
e_:function e_(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6){var _=this
_.y2=a
_.a6=b
_.a7=c
_.ag=d
_.bl=e
_.fx=f
_.fy=g
_.go=h
_.id=i
_.k1=j
_.w=k
_.x=l
_.y=m
_.z=n
_.Q=o
_.as=p
_.at=q
_.ax=r
_.ay=s
_.ch=a0
_.a=a1
_.b=a2
_.c=a3
_.d=a4
_.e=$
_.f=a5
_.r=a6},
aw:function aw(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5){var _=this
_.y2=a
_.a6=b
_.a7=c
_.ag=d
_.fx=e
_.fy=f
_.go=g
_.id=h
_.k1=i
_.w=j
_.x=k
_.y=l
_.z=m
_.Q=n
_.as=o
_.at=p
_.ax=q
_.ay=r
_.ch=s
_.a=a0
_.b=a1
_.c=a2
_.d=a3
_.e=$
_.f=a4
_.r=a5},
ew:function ew(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
ey:function ey(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
eP:function eP(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
dM:function dM(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.cb=0
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
dq:function dq(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
ez:function ez(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
rg(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=A.nJ(a.om),d=a.ax
d=d==null?f:J.q(d,new A.a1(),t.G)
if(d==null)d=A.a([],t.O)
s=t.G
d=A.h(d,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.eJ(a.ol,e,q,p,a.y,a.z,o,a.as,a.at,d,r,s,n,m,f,l,k,j)},
eJ:function eJ(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
_.ol=a
_.om=b
_.w=c
_.x=d
_.y=e
_.z=f
_.Q=g
_.as=h
_.at=i
_.ax=j
_.ay=k
_.ch=l
_.a=m
_.b=n
_.c=o
_.d=p
_.e=$
_.f=q
_.r=r},
r2(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.id,d=a.gbm(a),c=a.go,b=a.ax
b=b==null?f:J.q(b,new A.a1(),t.G)
if(b==null)b=A.a([],t.O)
s=t.G
b=A.h(b,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.cg(!0,d,c,e,!0,A.bp(t.N,t.h),q,p,a.y,a.z,o,a.as,a.at,b,r,s,n,m,f,l,k,j)},
us(a){var s,r,q,p,o
a=A.bv(a,"\n",",")
a=A.bv(a,"-",",-")
a=A.bv(a,"e,-","e-")
s=A.a([],t.n)
for(r=B.b.co(a,A.ax("[ ,]")),q=r.length,p=0;p<r.length;r.length===q||(0,A.e)(r),++p){o=r[p]
if(J.N(o)!==0)s.push(A.bV(o))}return s},
po(a,b,c){var s,r,q,p,o,n,m,l,k=A.a([],c.h("y<k<0>>"))
for(s=A.E(B.d.b0(a.length,b),0,1),r=s.length,q=A.v(a),p=q.c,q=q.h("aD<1>"),o=0;o<s.length;s.length===r||(0,A.e)(s),++o){n=s[o]
if(typeof n!=="number")return n.A()
m=A.a_(n*b)
l=new A.aD(a,m,null,q)
l.c3(a,m,null,p)
k.push(l.pN(0,b).ap(0))}return k},
pI(a,b,c,d){var s=a*d-b*c<0?-1:1
return s*Math.acos(Math.min(1,Math.max((a*c+b*d)/(Math.sqrt(a*a+b*b)*Math.sqrt(c*c+d*d)),-1)))},
tY(d4,d5,d6,d7,d8,d9,e0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0=d4.a,d1=d4.b,d2=e0.a,d3=e0.b
if(d5===0||d6===0)return A.a([d4,e0,e0],t.l)
d7*=0.017453292519943295
d8=d8!==0?1:0
d9=d9!==0?1:0
s=Math.cos(d7)
r=Math.sin(d7)
q=(d0-d2)/2
p=(d1-d3)/2
o=q*s+p*r
n=-q*r+p*s
m=Math.abs(d5)
l=Math.abs(d6)
k=o*o
j=n*n
i=k/(m*m)+j/(l*l)
if(i>1){h=Math.sqrt(i)
m*=h
l*=h}g=[m,l]
m=g[0]
l=g[1]
f=m*m
e=l*l
j=f*j
k=e*k
d=Math.sqrt(Math.max((f*e-j-k)/(j+k),0))
k=(d8===d9?-1:1)*d
c=k*(m*n)/l
b=k*(-l*o)/m
q=(o-c)/m
p=(n-b)/l
a=A.pI(1,0,q,p)
a0=B.h.W(A.pI(q,p,(-o-c)/m,(-n-b)/l)/1,360)
if(d9===0&&a0>0)a0-=360
else if(d9===1&&a0<0)a0+=360
a1=[c*s-b*r+(d0+d2)/2,c*r+b*s+(d1+d3)/2,a,a0*0.017453292519943295]
a2=a1[0]
a3=a1[1]
a=a1[2]
a0=a1[3]
k=a0/0.017453292519943295
a4=B.h.fz(Math.abs(k/(B.h.W(k,90)===0?90:36)))
a5=a0/a4
s=Math.cos(d7)
r=Math.sin(d7)
a6=Math.sin(a5)*(Math.sqrt(4+3*Math.pow(Math.tan(a5/2),2))-1)/3
k=t.l
a7=A.a([],k)
for(j=A.E(a4,0,1),a8=j.length,a9=-d5,b0=a9*s,b1=d6*r,a9*=r,b2=d6*s,b3=a4-1,b4=d5*s,b5=d5*r,b6=d1,b7=d0,b8=a,b9=0;b9<j.length;j.length===a8||(0,A.e)(j),++b9,b6=c8,b7=c9,b8=c1){c0=j[b9]
c1=b8+a5
c2=Math.cos(b8)
c3=Math.sin(b8)
c4=Math.cos(c1)
c5=Math.sin(c1)
c6=a2+b4*c4-b1*c5
c7=a3+b5*c4+b2*c5
if(J.U(c0,b3)){c8=d3
c9=d2}else{c8=c7
c9=c6}B.a.M(a7,A.a([new A.f(b7+a6*(b0*c3-b1*c2),b6+a6*(a9*c3+b2*c2),0),new A.f(c9-a6*(b0*c5-b1*c4),c8-a6*(a9*c5+b2*c4),0),new A.f(c9,c8,0)],k))}return a7},
r3(a){var s=null,r=new A.dr(a,s,4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
return r},
r4(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.dr(a.fx,a.fy,q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
cg:function cg(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2){var _=this
_.fx=a
_.fy=b
_.go=c
_.id=d
_.k1=e
_.k2=f
_.w=g
_.x=h
_.y=i
_.z=j
_.Q=k
_.as=l
_.at=m
_.ax=n
_.ay=o
_.ch=p
_.a=q
_.b=r
_.c=s
_.d=a0
_.e=$
_.f=a1
_.r=a2},
kC:function kC(){},
dr:function dr(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
_.fx=a
_.fy=b
_.w=c
_.x=d
_.y=e
_.z=f
_.Q=g
_.as=h
_.at=i
_.ax=j
_.ay=k
_.ch=l
_.a=m
_.b=n
_.c=o
_.d=p
_.e=$
_.f=q
_.r=r},
kE:function kE(){},
kD:function kD(){},
eA:function eA(a,b,c){this.a=a
this.b=b
this.c=c},
rh(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.eL(a.fx,a.fy,q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
r6(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a1.a6,d=a1.a7,c=a1.id,b=a1.ag,a=a1.go,a0=a1.ax
a0=a0==null?f:J.q(a0,new A.a1(),t.G)
if(a0==null)a0=A.a([],t.O)
s=t.G
a0=A.h(a0,!0,s)
r=a1.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a1.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a1.w
p=a1.x
o=a1.Q
n=a1.a
n===$&&A.b("color")
n=n.t()
m=a1.b
m===$&&A.b("name")
a1.c===$&&A.b("target")
l=A.a([],t.r)
k=a1.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a1.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a1.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.bZ(e,d,!0,b,a,c,!0,A.bp(t.N,t.h),q,p,a1.y,a1.z,o,a1.as,a1.at,a0,r,s,n,m,f,l,k,j)},
r7(a){var s,r,q,p,o,n,m,l,k,j="(){}[]|.\\"
if(a==="\\over"||a==="\\overline"||a==="\\sqrt"||a==="\\sqrt{"||B.b.bk(a,"_")||B.b.bk(a,"^")||B.b.bk(a,"dot"))a+="{\\quad}"
if(a==="\\substack")a="\\quad"
if(a.length===0)a="\\quad"
if(B.b.a_(a,"\\\\"))a=A.bv(a,"\\\\","\\quad\\\\")
s=t.s
r=A.a([],s)
for(q=t.N,p=A.bK(A.a(a.split("\\left"),s),q),o=p.length,n=0;n<p.length;p.length===o||(0,A.e)(p),++n){m=p[n]
l=J.X(m)
if(l.gn(m)!==0){l=l.i(m,0)
l=A.cy(j,l,0)}else l=!1
if(l)r.push(m)}k=r.length
r=A.a([],s)
for(s=A.bK(A.a(a.split("\\right"),s),q),q=s.length,n=0;n<s.length;s.length===q||(0,A.e)(s),++n){m=s[n]
p=J.X(m)
if(p.gn(m)!==0){p=p.i(m,0)
p=A.cy(j,p,0)}else p=!1
if(p)r.push(m)}if(k!==r.length){a=A.bv(a,"\\left","\\big")
a=A.bv(a,"\\right","\\big")}return A.r8(a)},
r8(a){var s=a.split("{").length-1-(a.split("\\{").length-1)+(a.split("\\\\{").length-1),r=a.split("}").length-1-(a.split("\\}").length-1)+(a.split("\\\\}").length-1)
for(;r>s;){a="{"+a;++s}for(;s>r;){a+="}";++r}return a},
qI(a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=t.N,d=A.h(a4.fT,!0,e),c=A.h(a4.cc,!0,e),b=a4.a6,a=a4.a7,a0=a4.id,a1=a4.ag,a2=a4.go,a3=a4.ax
a3=a3==null?f:J.q(a3,new A.a1(),t.G)
if(a3==null)a3=A.a([],t.O)
s=t.G
a3=A.h(a3,!0,s)
r=a4.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a4.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a4.w
p=a4.x
o=a4.Q
n=a4.a
n===$&&A.b("color")
n=n.t()
m=a4.b
m===$&&A.b("name")
a4.c===$&&A.b("target")
l=A.a([],t.r)
k=a4.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a4.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a4.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.eq(a4.aX,d,a4.cb,c,b,a,!0,a1,a2,a0,!0,A.bp(e,t.h),q,p,a4.y,a4.z,o,a4.as,a4.at,a3,r,s,n,m,f,l,k,j)},
qJ(a,b,c){var s,r,q,p,o,n,m,l=A.oj(a,A.ax("{{(.*?)}}")),k=t.s,j=A.a([],k)
for(s=A.h(c.gbo(),!0,t.N),B.a.M(s,b),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q)j.push("("+A.nu(s[q])+")")
p=B.a.aC(j,"|")
o=A.a([],k)
if(p.length!==0){n=A.ax(p)
for(j=l.length,q=0;q<l.length;l.length===j||(0,A.e)(l),++q)B.a.M(o,A.oj(l[q],n))}else o=l
k=A.a([],k)
for(j=o.length,q=0;q<o.length;o.length===j||(0,A.e)(o),++q){m=o[q]
if(J.N(m)!==0)k.push(m)}return k},
eL:function eL(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
_.fx=a
_.fy=b
_.w=c
_.x=d
_.y=e
_.z=f
_.Q=g
_.as=h
_.at=i
_.ax=j
_.ay=k
_.ch=l
_.a=m
_.b=n
_.c=o
_.d=p
_.e=$
_.f=q
_.r=r},
bZ:function bZ(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4){var _=this
_.a6=a
_.a7=b
_.ag=null
_.fx=c
_.fy=d
_.go=e
_.id=f
_.k1=g
_.k2=h
_.w=i
_.x=j
_.y=k
_.z=l
_.Q=m
_.as=n
_.at=o
_.ax=p
_.ay=q
_.ch=r
_.a=s
_.b=a0
_.c=a1
_.d=a2
_.e=$
_.f=a3
_.r=a4},
eq:function eq(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8){var _=this
_.aX=a
_.fT=b
_.cb=c
_.cc=d
_.a6=e
_.a7=f
_.ag=null
_.fx=g
_.fy=h
_.go=i
_.id=j
_.k1=k
_.k2=l
_.w=m
_.x=n
_.y=o
_.z=p
_.Q=q
_.as=r
_.at=s
_.ax=a0
_.ay=a1
_.ch=a2
_.a=a3
_.b=a4
_.c=a5
_.d=a6
_.e=$
_.f=a7
_.r=a8},
kf:function kf(a,b){this.a=a
this.b=b},
qn(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=a.ay
g===$&&A.b("draggedListener")
s=a.ch
s===$&&A.b("pressedListener")
r=a.CW
r===$&&A.b("releasedListener")
q=a.cx
p=A.nW(a.w)
o=a.a
o===$&&A.b("color")
o=o.t()
n=a.b
n===$&&A.b("name")
a.c===$&&A.b("target")
m=A.a([],t.r)
l=a.d
l===$&&A.b("submobjects")
k=l.length
j=0
for(;j<l.length;l.length===k||(0,A.e)(l),++j)m.push(l[j].t())
l=a.f
l===$&&A.b("updatingSuspended")
k=A.a([],t.l)
i=a.r
i===$&&A.b("points")
i=J.I(i)
for(;i.m();){h=i.gu()
k.push(new A.f(h.a,h.b,h.c))}return new A.dY(g,s,r,q,p,o,n,null,m,l,k)},
hg:function hg(){},
dY:function dY(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.ay=a
_.ch=b
_.CW=c
_.cx=d
_.w=e
_.a=f
_.b=g
_.c=h
_.d=i
_.e=$
_.f=j
_.r=k},
jm:function jm(a){this.a=a},
jn:function jn(a){this.a=a},
jo:function jo(a){this.a=a},
qK(a){var s,r,q,p,o,n,m,l=a.a
l===$&&A.b("color")
l=l.t()
s=a.b
s===$&&A.b("name")
a.c===$&&A.b("target")
r=A.a([],t.r)
q=a.d
q===$&&A.b("submobjects")
p=q.length
o=0
for(;o<q.length;q.length===p||(0,A.e)(q),++o)r.push(q[o].t())
q=a.f
q===$&&A.b("updatingSuspended")
p=A.a([],t.l)
n=a.r
n===$&&A.b("points")
n=J.I(n)
for(;n.m();){m=n.gu()
p.push(new A.f(m.a,m.b,m.c))}return new A.H(l,s,null,r,q,p)},
qu(a){var s,r,q,p,o,n,m,l=a.a
l===$&&A.b("color")
l=l.t()
s=a.b
s===$&&A.b("name")
a.c===$&&A.b("target")
r=A.a([],t.r)
q=a.d
q===$&&A.b("submobjects")
p=q.length
o=0
for(;o<q.length;q.length===p||(0,A.e)(q),++o)r.push(q[o].t())
q=a.f
q===$&&A.b("updatingSuspended")
p=A.a([],t.l)
n=a.r
n===$&&A.b("points")
n=J.I(n)
for(;n.m();){m=n.gu()
p.push(new A.f(m.a,m.b,m.c))}return new A.d8(l,s,null,r,q,p)},
H:function H(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=$
_.f=e
_.r=f},
kp:function kp(a){this.a=a},
ko:function ko(a){this.a=a},
kn:function kn(a){this.a=a},
km:function km(a){this.a=a},
kq:function kq(a,b){this.a=a
this.b=b},
kh:function kh(a){this.a=a},
ki:function ki(a){this.a=a},
kk:function kk(){},
kj:function kj(){},
kl:function kl(a){this.a=a},
d8:function d8(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=$
_.f=e
_.r=f},
rs(a){var s=null,r=new A.R(4,0,!1,0.01,!1,0.000001,4,s,s,s,a,$,s,$,$,$)
r.ae(a,s,s)
return r},
rt(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=null,d=a.ax
d=d==null?e:J.q(d,new A.a1(),t.G)
if(d==null)d=A.a([],t.O)
s=t.G
d=A.h(d,!0,s)
r=a.ay
r=r==null?e:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?e:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.gaF()
p=a.x
o=a.gdX()
n=a.Q
m=a.a
m===$&&A.b("color")
m=m.t()
l=a.b
l===$&&A.b("name")
a.c===$&&A.b("target")
k=A.a([],t.r)
j=a.d
j===$&&A.b("submobjects")
i=j.length
h=0
for(;h<j.length;j.length===i||(0,A.e)(j),++h)k.push(j[h].t())
j=a.f
j===$&&A.b("updatingSuspended")
i=A.a([],t.l)
g=a.r
g===$&&A.b("points")
g=J.I(g)
for(;g.m();){f=g.gu()
i.push(new A.f(f.a,f.b,f.c))}return new A.R(q,p,o,a.z,n,a.as,a.at,d,r,s,m,l,e,k,j,i)},
ot(a){var s,r,q,p,o=a.a
if(o!=null){s=A.a([],t.O)
for(o=J.I(o);o.m();){r=o.gu()
s.push(new A.P(r.a,r.b,r.c,r.d))}o=s}else o=null
s=a.b
if(s!=null){r=A.a([],t.O)
for(s=J.I(s);s.m();){q=s.gu()
r.push(new A.P(q.a,q.b,q.c,q.d))}s=r}else s=null
r=a.d
if(r!=null){q=A.a([],t.O)
for(r=J.I(r);r.m();){p=r.gu()
q.push(new A.P(p.a,p.b,p.c,p.d))}r=q}else r=null
return new A.co(o,s,a.c,r,a.e)},
i8(a){var s=null,r=new A.c3(4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
r.f2(a)
return r},
rr(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.c3(q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
ou(a){var s=null,r=new A.eS(0.01,0.01,4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
r.saH(t.y.a(A.a([a],t.l)))
return r},
ru(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.eS(a.fx,a.fy,q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
qm(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null,e=a.ax
e=e==null?f:J.q(e,new A.a1(),t.G)
if(e==null)e=A.a([],t.O)
s=t.G
e=A.h(e,!0,s)
r=a.ay
r=r==null?f:J.q(r,new A.a2(),s)
r=A.h(r==null?A.a([],t.O):r,!0,s)
q=a.ch
q=q==null?f:J.q(q,new A.a3(),s)
s=A.h(q==null?A.a([],t.O):q,!0,s)
q=a.w
p=a.x
o=a.Q
n=a.a
n===$&&A.b("color")
n=n.t()
m=a.b
m===$&&A.b("name")
a.c===$&&A.b("target")
l=A.a([],t.r)
k=a.d
k===$&&A.b("submobjects")
j=k.length
i=0
for(;i<k.length;k.length===j||(0,A.e)(k),++i)l.push(k[i].t())
k=a.f
k===$&&A.b("updatingSuspended")
j=A.a([],t.l)
h=a.r
h===$&&A.b("points")
h=J.I(h)
for(;h.m();){g=h.gu()
j.push(new A.f(g.a,g.b,g.c))}return new A.dT(q,p,a.y,a.z,o,a.as,a.at,e,r,s,n,m,f,l,k,j)},
R:function R(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
a1:function a1(){},
a2:function a2(){},
a3:function a3(){},
lc:function lc(){},
ld:function ld(){},
l5:function l5(a){this.a=a},
l6:function l6(a,b){this.a=a
this.b=b},
l9:function l9(a,b){this.a=a
this.b=b},
l8:function l8(a,b){this.a=a
this.b=b},
l1:function l1(a,b){this.a=a
this.b=b},
l7:function l7(){},
l4:function l4(a){this.a=a},
l2:function l2(){},
l3:function l3(){},
lb:function lb(){},
la:function la(){},
co:function co(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
c3:function c3(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
eS:function eS(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var _=this
_.fx=a
_.fy=b
_.w=c
_.x=d
_.y=e
_.z=f
_.Q=g
_.as=h
_.at=i
_.ax=j
_.ay=k
_.ch=l
_.a=m
_.b=n
_.c=o
_.d=p
_.e=$
_.f=q
_.r=r},
dT:function dT(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.ay=i
_.ch=j
_.a=k
_.b=l
_.c=m
_.d=n
_.e=$
_.f=o
_.r=p},
dK:function dK(){},
qf(){return new A.fQ($.dI())},
fQ:function fQ(a){this.e=$
this.b=a
this.d=$},
je:function je(){},
hJ:function hJ(){},
kF:function kF(a){this.a=a},
E(a,b,c){var s,r=A.a([],t.t)
if(c>0)for(s=b;s<a;s+=c)B.a.p(r,s)
else for(s=b;s>a;s+=c)B.a.p(r,s)
return r},
d0(a,b){var s,r,q,p=J.X(a)
if(p.gah(a))return A.a([],b.h("y<C<i,0>>"))
s=A.a([],b.h("y<C<i,0>>"))
for(r=t.pc.Z(b).h("C<1,2>"),q=0;q<p.gn(a);++q)B.a.p(s,new A.C(q,p.i(a,q),r))
return s},
iQ(a,b){if(a.length===0)return b.a(0)
return B.a.aT(a,new A.my(b))},
fs(a,b,c){var s,r,q,p,o,n,m,l=A.a([],t.b)
for(s=A.E(a,0,1),r=s.length,q=a-1,p=t.n,o=0;o<s.length;s.length===r||(0,A.e)(s),++o){n=s[o]
if(typeof n!=="number")return n.aZ()
m=n/q
l.push(A.a([c*(1-m)+b*m],p))}return A.aB(null,l)},
iL(a,b,c){var s,r,q,p,o=A.E(B.h.fz((a-b)/c),0,1),n=A.a([],t.b)
for(s=o.length,r=t.n,q=0;q<o.length;o.length===s||(0,A.e)(o),++q){p=o[q]
if(typeof p!=="number")return p.A()
n.push(A.a([p*c+b],r))}return A.aB(null,n)},
d1(a,b,c){var s,r,q,p,o,n,m=J.X(a)
if(m.gah(a))return a
s=m.gn(a)
if(s>b)throw A.d("Trying to stretch an array to a length shorter than its own")
r=A.E(b,0,1)
q=A.v(r)
p=q.h("J<1,p>")
o=new A.J(r,q.h("p(1)").a(new A.mx(b,s)),p)
q=A.a([],c.h("y<0>"))
for(r=new A.O(o,o.gn(o),p.h("O<B.E>")),p=p.h("B.E");r.m();){n=r.d
q.push(m.i(a,B.h.br(n==null?p.a(n):n)))}return q},
uh(a,b,c,d){var s,r,q,p,o,n,m,l=Math.max(a.length,b.length),k=A.a([],c.h("y<0>"))
for(s=A.E(l,0,1),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q]
o=a.length
if(typeof p!=="number")return p.A()
n=B.h.b0(p*o,l)
if(!(n>=0&&n<o))return A.c(a,n)
k.push(a[n])}s=A.a([],d.h("y<0>"))
for(r=A.E(l,0,1),o=r.length,q=0;q<r.length;r.length===o||(0,A.e)(r),++q){p=r[q]
n=b.length
if(typeof p!=="number")return p.A()
m=B.h.b0(p*n,l)
if(!(m>=0&&m<n))return A.c(b,m)
s.push(b[m])}return new A.C(k,s,c.h("@<k<0>>").Z(d.h("k<0>")).h("C<1,2>"))},
bK(a,b){var s=A.de(a,new A.mz(b),b)
return A.h(s,!0,s.$ti.h("j.E"))},
nw(a,b){var s=A.h(a,!0,b)
if(0>=s.length)return A.c(s,-1)
s.pop()
return s},
pJ(a,b){var s,r,q,p=A.a([],b.h("y<0>")),o=A.o2(b)
for(s=A.v(a).h("Y<1>"),r=new A.Y(a,s),r=new A.O(r,r.gn(r),s.h("O<B.E>")),s=s.h("B.E");r.m();){q=r.d
if(q==null)q=s.a(q)
if(!o.F(0,q)){B.a.p(p,q)
o.p(0,q)}}s=b.h("Y<0>")
return A.h(new A.Y(p,s),!0,s.h("B.E"))},
pa(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=A.a([],c.h("y<k<0>>"))
for(s=A.E(a.length,0,1),r=s.length,q=c.h("y<0>"),p=0;p<s.length;s.length===r||(0,A.e)(s),++p){o=s[p]
n=A.a([],q)
for(m=A.E(b,0,1),l=m.length,k=0;k<m.length;m.length===l||(0,A.e)(m),++k){j=m[k]
if(typeof o!=="number")return o.L()
if(typeof j!=="number")return A.bj(j)
n.push(B.a.i(a,B.h.W(o+j,a.length)))}i.push(n)}return i},
my:function my(a){this.a=a},
mx:function mx(a,b){this.a=a
this.b=b},
mz:function mz(a){this.a=a},
np(a,b,c){var s,r,q=t.H
q=A.fq(A.aB(null,J.q(a,new A.mp(),q).ap(0)),A.aB(null,J.q(b,new A.mq(),q).ap(0)),c,t.A).a
q===$&&A.b("values")
s=A.v(q)
r=s.h("J<1,P>")
return A.h(new A.J(q,s.h("P(1)").a(new A.mr()),r),!0,r.h("B.E"))},
fq(a,b,c,d){return d.a(J.fu(J.bk(a,1-c),J.bk(b,c)))},
pq(a,b,c,d){return d.a(J.fu(J.bk(a,1-c),J.bk(b,c)))},
no(a,b,c){if(c>=1)return new A.C(b-1,1,t.d7)
if(c<=0)return new A.C(a,0,t.d7)
return new A.C(J.q6(A.fq(a,b,c,t.W)),B.h.W((b-a)*c,1),t.d7)},
nj(a){return new A.m6(a,a.length-1)},
mv(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(b===1){s=A.a([],t.l)
for(r=A.E(J.N(a.a),0,1),q=r.length,p=0;p<r.length;r.length===q||(0,A.e)(r),++p){if(a.gn(a)===0)A.M(A.ah())
s.push(a.i(0,a.gn(a)-1))}return s}s=t.l
r=A.a([],s)
for(q=a.a,o=J.X(q),n=A.E(o.gn(q),0,1),m=n.length,l=a.$ti,k=l.h("w.E"),l=l.h("aD<w.E>"),p=0;p<n.length;n.length===m||(0,A.e)(n),++p){j=A.a_(n[p])
i=new A.aD(a,j,null,l)
i.c3(a,j,null,k)
r.push(A.nj(i.ap(0)).$1(b))}h=(c-b)/(1-b)
s=A.a([],s)
for(q=A.E(o.gn(q),0,1),o=q.length,n=t.V,m=t.mN,p=0;p<q.length;q.length===o||(0,A.e)(q),++p){g=q[p]
if(typeof g!=="number")return g.L()
l=A.a_(g+1)
A.aK(0,l,r.length)
k=new A.aD(r,0,l,m)
k.c3(r,0,l,n)
s.push(A.nj(k.ap(0)).$1(h))}return s},
u3(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=a5.length-1
if(a4<1){s=t.l
return new A.C(A.a([B.e],s),A.a([B.e],s),t.dI)}s=2*a4
r=t.o
q=A.bl(0,new A.C(4,s,r))
p=new A.mj(a4,q)
p.$4$start$step(-1,0,1,2)
p.$4$start$step(1,0,2,2)
p.$4$start$step(2,1,0,2)
p.$4$start$step(1,1,1,2)
p.$5$end$start$step(-2,2,s-2,1,2)
p.$5$end$start$step(1,3,s-3,0,2)
q.aw(new A.C(2,-2,r),-1)
q.aw(new A.C(1,-1,r),2)
o=A.bl(0,new A.C(s,3,r))
n=t.V
m=A.bK(a5,n)
for(l=A.d0(A.E(s,1,2),t.S),k=l.length,j=0;j<l.length;l.length===k||(0,A.e)(l),++j){i=l[j]
for(h=A.E(3,0,1),g=h.length,f=i.b,e=i.a,d=0;d<h.length;h.length===g||(0,A.e)(h),++d){c=h[d]
o.aw(new A.C(f,c,r),2*B.a.i(m,e).c1(c))}}for(l=A.E(3,0,1),k=l.length,j=0;j<l.length;l.length===k||(0,A.e)(l),++j){c=l[j]
o.aw(new A.C(0,c,r),B.a.gac(a5).c1(c))}for(l=A.E(3,0,1),k=l.length,h=s-1,j=0;j<l.length;l.length===k||(0,A.e)(l),++j){c=l[j]
o.aw(new A.C(h,c,r),B.a.gq(a5).c1(c))}l=J.q0(B.a.gac(a5),B.a.gq(a5)).bd()
b=A.bl(0,new A.C(s,3,r))
if(l<=1e-12){a=A.tW(new A.C(2,1,r),q)
for(s=t.t,s=new A.ai(A.a([A.a([0,1,-2,-1],s),A.a([2,-1,1,-2],s)],t.fC),t.lb),s=s.gH(s);s.m();){a0=s.b
if(a0==null)a0=A.M(A.al("No element"))
l=a.b
l===$&&A.b("shape")
k=l.a
if(typeof k!=="number")return A.bj(k)
c=B.d.W(-1,k)
k=a0.length
if(0>=k)return A.c(a0,0)
h=a0[0]
l=l.b
if(typeof h!=="number")return h.W()
if(typeof l!=="number")return A.bj(l)
a1=B.h.W(h,l)
if(1>=k)return A.c(a0,1)
a.aw(new A.C(c,a1,r),a0[1])}s=t.n
r=A.a([],s)
l=a.b
l===$&&A.b("shape")
l=A.E(l.b,0,1)
k=l.length
j=0
for(;j<l.length;l.length===k||(0,A.e)(l),++j){a0=l[j]
h=J.bi(a0)
if(!h.U(a0,0)){g=a.b.b
if(typeof g!=="number")return g.I()
g=h.U(a0,g-1)
h=g}else h=!0
if(h)r.push(1)
else r.push(0)}r=A.a([r],t.b)
l=a.a
l===$&&A.b("values")
B.a.M(r,A.bK(l,t.H))
a.shX(t.jj.a(r))
r=o.a
r===$&&A.b("values")
if(0>=a5.length)return A.c(a5,0)
l=J.bk(a5[0],2)
B.a.sac(r,A.a([l.a,l.b,l.c],s))
B.a.sq(o.a,A.a([0,0,0],s))
for(s=A.E(3,0,1),r=s.length,j=0;j<s.length;s.length===r||(0,A.e)(s),++j)b.hB(s[j],a.eH().bI(o).ee())}else for(s=A.E(3,0,1),r=s.length,j=0;j<s.length;s.length===r||(0,A.e)(s),++j)b.hB(s[j],q.eH().bI(o).ee())
s=A.a([],t.l)
for(r=b.hu(),l=r.length,j=0;j<r.length;r.length===l||(0,A.e)(r),++j){a2=r[j]
k=a2.length
if(0>=k)return A.c(a2,0)
h=a2[0]
if(1>=k)return A.c(a2,1)
g=a2[1]
if(2>=k)return A.c(a2,2)
s.push(new A.f(h,g,a2[2]))}r=A.de(s,new A.mh(),n)
a3=A.h(r,!0,r.$ti.h("j.E"))
n=A.de(s,new A.mi(),n)
return new A.C(a3,A.h(n,!0,n.$ti.h("j.E")),t.dI)},
tW(a9,b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5="values",a6=a9.b,a7=t.o,a8=A.bl(0,new A.C(3,3,a7))
for(s=A.E(a9.a+a6+1,0,1),r=s.length,q=t.jj,p=t.n,o=t.b,n=0;n<s.length;s.length===r||(0,A.e)(s),++n){m=s[n]
l=a8.hu()
if(typeof m!=="number")return m.I()
k=A.a_(Math.max(0,m-a6))
j=A.v(l)
i=j.h("aD<1>")
h=new A.aD(l,k,null,i)
h.c3(l,k,null,j.c)
j=i.h("J<B.E,k<p>>")
g=A.aB(null,A.h(new A.J(h,i.h("k<p>(B.E)").a(new A.m9(a6,m)),j),!0,j.h("B.E")))
A.a_(m)
j=b0.a
j===$&&A.b(a5)
if(!(m>=0&&m<j.length))return A.c(j,m)
j=j[m]
i=Math.max(0,a6-m)
f=A.tZ(g,J.iT(j,i).ap(0))
j=A.a([],o)
l=a8.b
l===$&&A.b("shape")
l=A.E(l.a,0,1)
h=l.length
e=0
for(;e<l.length;l.length===h||(0,A.e)(l),++e){d=l[e]
c=A.a([],p)
for(b=A.E(a8.b.b,0,1),a=b.length,a0=0;a0<b.length;b.length===a||(0,A.e)(b),++a0){a1=b[a0]
if(typeof d!=="number")return d.cL()
if(d>=k){if(typeof a1!=="number")return a1.cL()
if(a1>=i){a2=d-k
a3=a1-i
a7.a(new A.C(a2,a3,a7))
a4=f.a
a4===$&&A.b(a5)
if(a2>>>0!==a2||a2>=a4.length)return A.c(a4,a2)
c.push(J.Z(a4[a2],a3))}else{a7.a(new A.C(d,a1,a7))
a2=a8.a
a2===$&&A.b(a5)
if(d>>>0!==d||d>=a2.length)return A.c(a2,d)
c.push(J.Z(a2[d],a1))}}else{a7.a(new A.C(d,a1,a7))
a2=a8.a
a2===$&&A.b(a5)
if(d>>>0!==d||d>=a2.length)return A.c(a2,d)
c.push(J.Z(a2[d],a1))}}j.push(c)}a8.shX(q.a(j))}return a8},
tZ(a,b){return a.bH(0,new A.md(b))},
mp:function mp(){},
mq:function mq(){},
mr:function mr(){},
m6:function m6(a,b){this.a=a
this.b=b},
m5:function m5(){},
mj:function mj(a,b){this.a=a
this.b=b},
mh:function mh(){},
mi:function mi(){},
m9:function m9(a,b){this.a=a
this.b=b},
md:function md(a){this.a=a},
tc(a){var s,r,q,p,o,n,m,l,k,j,i
if(B.b.a_(a,"#"))a=B.b.k0(a,"#","")
s=a.length
if(!B.a.F(A.a([3,4,6,8],t.t),s))throw A.d("Hex string #"+a+" not well formated")
if(s===3||s===4){s=t.s
r=A.a([],s)
for(q=a.split(""),p=q.length,o=0;o<p;++o){n=q[o]
B.a.M(r,A.a([n,n],s))}a=B.a.aC(r,"")}if(a.length===6)a+="ff"
m=new A.lV()
l=B.b.B(a,0,2)
k=B.b.B(a,2,4)
j=B.b.B(a,4,6)
i=B.b.B(a,6,8)
return new A.P(m.$1(l),m.$1(k),m.$1(j),m.$1(i))},
P:function P(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lV:function lV(){},
nS(a){return new A.as(Math.cos(a),Math.sin(a))},
as:function as(a,b){this.a=a
this.b=b},
mS(a){switch(a){case 0:break
case 1:break
case 2:break
default:break}return new A.kr(a)},
by:function by(a){this.b=a},
b8:function b8(){},
jq:function jq(){this.a=$},
b9:function b9(a,b,c){this.a=a
this.b=b
this.$ti=c},
hl:function hl(){},
er:function er(a,b,c){this.c=a
this.a=b
this.b=c},
ce:function ce(a,b,c){this.c=a
this.a=b
this.b=c},
cf:function cf(a,b,c){this.c=a
this.a=b
this.b=c},
cd:function cd(a,b,c){this.c=a
this.a=b
this.b=c},
kr:function kr(a){this.a=a},
oj(a,b){var s,r,q,p,o,n,m,l,k,j,i=B.b.co(a,b),h=b.c7(0,a),g=A.h(h,!0,A.D(h).h("j.E"))
h=i.length
s=g.length
r=A.a([],t.s)
for(h=A.E(h+s,0,1),s=h.length,q=t.N,p=0;p<h.length;h.length===s||(0,A.e)(h),++p){o=h[p]
if(typeof o!=="number")return o.W()
if(B.h.W(o,2)===0){n=B.h.aR(o,2)
if(!(n>=0&&n<i.length))return A.c(i,n)
B.a.p(r,i[n])}else{n=B.h.aR(o-1,2)
if(!(n>=0&&n<g.length))return A.c(g,n)
m=g[n]
l=m.hw(A.E(m.ghv()+1,1,1))
k=A.v(l)
j=k.h("am<1>")
j=A.jf(new A.am(l,k.h("A(1)").a(new A.kP()),j),j.h("j.E"),q)
B.a.M(r,A.h(j,!0,A.D(j).h("j.E")))}}return r},
kP:function kP(){},
pd(a,b,c){var s,r
if(c){if(!$.iK.aj(a)){s=t.S
$.iK.v(0,a,A.bp(s,s))}if(!$.iK.i(0,a).aj(b)){s=$.iK.i(0,a)
s.toString
s.v(0,b,A.pd(a,b,!1))}s=$.iK.i(0,a).i(0,b)
s.toString
return s}if(a<b)return 0
if(b===0)return 1
s=t.S
r=B.a.ef(A.E(b+1,1,1),1,new A.m7(),s)
return B.d.b0(B.a.ef(A.E(a-b,a,-1),1,new A.m8(),s),r)},
iO(a,b,c,d,e){return(a-b)/(c-b)*(e-d)+d},
m7:function m7(){},
m8:function m8(){},
aB(a,b){var s,r,q=new A.bx(b)
if(a==null){s=b.length
r=s!==0?J.N(B.a.gac(b)):0
a=new A.C(s,r,t.o)
s=a}else s=a
q.sm7(t.o.a(s))
return q},
bl(a,b){var s,r,q,p,o,n,m,l,k=b.b,j=A.a([],t.b)
for(s=A.E(b.a,0,1),r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.e)(s),++p){o=A.a([],q)
for(n=A.E(k,0,1),m=n.length,l=0;l<n.length;n.length===m||(0,A.e)(n),++l)o.push(a)
j.push(o)}return A.aB(b,j)},
iY(a){var s,r,q,p,o=A.a([],t.b)
for(s=J.aR(a),r=s.gH(a),q=t.n;r.m();){p=r.gu()
o.push(A.a([p.a,p.b,p.c],q))}return A.aB(new A.C(s.gn(a),3,t.o),o)},
fI(a){var s,r,q,p,o,n,m,l,k,j,i=A.a([],t.b)
for(s=A.E(a,0,1),r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.e)(s),++p){o=s[p]
n=A.a([],q)
for(m=A.E(a,0,1),l=m.length,k=J.bi(o),j=0;j<m.length;m.length===l||(0,A.e)(m),++j)if(k.U(o,m[j]))n.push(1)
else n.push(0)
i.push(n)}return A.aB(new A.C(a,a,t.o),i)},
um(a,b){var s=A.pE(a),r=A.uw(b)
return B.a.aT(A.a([r,s,r.eH()],t.fp),new A.mw())},
pE(a){var s=t.n
return A.aB(null,A.a([A.a([Math.cos(a),-Math.sin(a),0],s),A.a([Math.sin(a),Math.cos(a),0],s),A.a([0,0,1],s)],t.b))},
uw(a){var s,r,q,p,o,n
if(a.bd()===0)return A.fI(3)
s=a.aZ(0,Math.sqrt(a.bd()))
r=Math.acos(s.c)
if(s.a!==0||s.b!==0){q=s.kk(0)
p=q.aZ(0,Math.sqrt(q.bd()))
o=Math.acos(p.a)
if(p.b<0)o*=-1}else o=0
q=t.n
n=A.aB(null,A.a([A.a([Math.cos(r),0,Math.sin(r)],q),A.a([0,1,0],q),A.a([-Math.sin(r),0,Math.cos(r)],q)],t.b))
return A.pE(o).bI(n)},
uk(a,b){var s,r,q,p,o=a/2,n=b.aZ(0,Math.sqrt(b.bd())).A(0,Math.sin(o)),m=A.a([],t.b)
for(s=[n.a,n.b,n.c],r=s.length,q=t.n,p=0;p<r;++p)m.push(A.a([s[p]],q))
m.push(A.a([Math.cos(o)],q))
return A.aB(null,m)},
tR(a,b){var s,r,q,p,o,n,m=6.283185307179586/a,l=t.hR,k=A.a([],l)
for(s=A.E(a,0,1),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q]
if(typeof p!=="number")return A.bj(p)
o=m*p
k.push(new A.as(Math.cos(o),Math.sin(o)))}l=A.a([],l)
for(s=k.length,r=b.a,o=b.b,q=0;q<k.length;k.length===s||(0,A.e)(k),++q)l.push(k[q].A(0,new A.as(r,o)))
k=A.a([],t.l)
for(s=l.length,q=0;q<l.length;l.length===s||(0,A.e)(l),++q){n=l[q]
k.push(new A.f(n.a,n.b,0))}return k},
bx:function bx(a){this.a=a
this.b=$},
j3:function j3(a){this.a=a},
j6:function j6(a){this.a=a},
j5:function j5(a){this.a=a},
j4:function j4(a){this.a=a},
j2:function j2(a){this.a=a},
j1:function j1(a,b){this.a=a
this.b=b},
j0:function j0(a){this.a=a},
j7:function j7(a){this.a=a},
j_:function j_(){},
iZ:function iZ(a){this.a=a},
mw:function mw(){},
f:function f(a,b,c){this.a=a
this.b=b
this.c=c},
lf:function lf(a){this.a=a},
lg:function lg(){},
le:function le(){},
p2(a){if(t.jJ.b(a))return a
throw A.d(A.mD(a,"uri","Value must be a String or a Uri"))},
p8(a,b){var s,r,q,p,o,n,m,l
for(s=b.length,r=1;r<s;++r){if(b[r]==null||b[r-1]!=null)continue
for(;s>=1;s=q){q=s-1
if(b[q]!=null)break}p=new A.a5("")
o=""+(a+"(")
p.a=o
n=A.v(b)
m=n.h("aD<1>")
l=new A.aD(b,0,s,m)
l.c3(b,0,s,n.c)
m=o+new A.J(l,m.h("n(B.E)").a(new A.m3()),m.h("J<B.E,n>")).aC(0,", ")
p.a=m
p.a=m+("): part "+(r-1)+" was null, but part "+r+" was not.")
throw A.d(A.a8(p.l(0),null))}},
jh:function jh(a){this.a=a},
ji:function ji(){},
jj:function jj(){},
m3:function m3(){},
cI:function cI(){},
hx(a,b){var s,r,q,p,o,n=b.kA(a)
b.bZ(a)
if(n!=null)a=B.b.ar(a,n.length)
s=t.s
r=A.a([],s)
q=A.a([],s)
s=a.length
if(s!==0&&b.bG(B.b.E(a,0))){if(0>=s)return A.c(a,0)
B.a.p(q,a[0])
p=1}else{B.a.p(q,"")
p=0}for(o=p;o<s;++o)if(b.bG(B.b.E(a,o))){B.a.p(r,B.b.B(a,p,o))
B.a.p(q,a[o])
p=o+1}if(p<s){B.a.p(r,B.b.ar(a,p))
B.a.p(q,"")}return new A.kv(b,n,r,q)},
kv:function kv(a,b,c,d){var _=this
_.a=a
_.b=b
_.d=c
_.e=d},
o5(a){return new A.hz(a)},
hz:function hz(a){this.a=a},
rf(){var s,r,q,p,o,n,m,l,k=null
if(A.mZ().gaP()!=="file")return $.ft()
s=A.mZ()
if(!B.b.bk(s.gaO(s),"/"))return $.ft()
r=A.oP(k,0,0)
q=A.oM(k,0,0,!1)
p=A.oO(k,0,0,k)
o=A.oL(k,0,0)
n=A.n9(k,"")
if(q==null)s=r.length!==0||n!=null||!1
else s=!1
if(s)q=""
s=q==null
m=!s
l=A.oN("a/b",0,3,k,"",m)
if(s&&!B.b.a_(l,"/"))l=A.nb(l,m)
else l=A.c5(l)
if(A.lO("",r,s&&B.b.a_(l,"//")?"":q,n,l,p,o).hh()==="a\\b")return $.iR()
return $.pL()},
kQ:function kQ(){},
hC:function hC(a,b,c){this.d=a
this.e=b
this.f=c},
i5:function i5(a,b,c,d){var _=this
_.d=a
_.e=b
_.f=c
_.r=d},
ib:function ib(a,b,c,d){var _=this
_.d=a
_.e=b
_.f=c
_.r=d},
rb(a,b){var s=A.a([0],t.t)
s=new A.hQ(b,s,new Uint32Array(A.nd(J.fw(a))))
s.hV(a,b)
return s},
c9(a,b){if(b<0)A.M(A.aJ("Offset may not be negative, was "+b+"."))
else if(b>a.c.length)A.M(A.aJ("Offset "+b+u.D+a.gn(a)+"."))
return new A.b3(a,b)},
n0(a,b,c){if(c<b)A.M(A.a8("End "+c+" must come after start "+b+".",null))
else if(c>a.c.length)A.M(A.aJ("End "+c+u.D+a.gn(a)+"."))
else if(b<0)A.M(A.aJ("Start may not be negative, was "+b+"."))
return new A.at(a,b,c)},
hQ:function hQ(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
b3:function b3(a,b){this.a=a
this.b=b},
at:function at(a,b,c){this.a=a
this.b=b
this.c=c},
qv(a,b){var s=A.qw(A.a([A.rA(a,!0)],t.pg)),r=new A.jW(b).$0(),q=B.d.l(B.a.gq(s).b+1),p=A.qx(s)?0:3,o=A.v(s)
return new A.jC(s,r,null,1+Math.max(q.length,p),new A.J(s,o.h("i(1)").a(new A.jE()),o.h("J<1,i>")).aT(0,B.a5),!A.ub(new A.J(s,o.h("K?(1)").a(new A.jF()),o.h("J<1,K?>"))),new A.a5(""))},
qx(a){var s,r,q
for(s=0;s<a.length-1;){r=a[s];++s
q=a[s]
if(r.b+1!==q.b&&J.U(r.c,q.c))return!1}return!0},
qw(a){var s,r,q,p=A.u5(a,new A.jH(),t.C,t.K)
for(s=p.gkg(p),r=A.D(s),r=r.h("@<1>").Z(r.z[1]),s=new A.cO(J.I(s.a),s.b,r.h("cO<1,2>")),r=r.z[1];s.m();){q=s.a
if(q==null)q=r.a(q)
J.nG(q,new A.jI())}s=p.ge4(p)
r=A.D(s)
q=r.h("e3<j.E,bg>")
return A.h(new A.e3(s,r.h("j<bg>(j.E)").a(new A.jJ()),q),!0,q.h("j.E"))},
rA(a,b){var s=new A.lE(a).$0()
return new A.aE(s,!0,null)},
rC(a){var s,r,q,p,o,n,m=a.gY(a)
if(!B.b.F(m,"\r\n"))return a
s=a.gV()
r=s.gav(s)
for(s=m.length-1,q=0;q<s;++q)if(B.b.E(m,q)===13&&B.b.E(m,q+1)===10)--r
s=a.gS(a)
p=a.ga4()
o=a.gV().gad()
p=A.hR(r,a.gV().gam(),o,p)
o=A.bv(m,"\r\n","\n")
n=a.gaW()
return A.kL(s,p,o,A.bv(n,"\r\n","\n"))},
rD(a){var s,r,q,p,o,n,m
if(!B.b.bk(a.gaW(),"\n"))return a
if(B.b.bk(a.gY(a),"\n\n"))return a
s=B.b.B(a.gaW(),0,a.gaW().length-1)
r=a.gY(a)
q=a.gS(a)
p=a.gV()
if(B.b.bk(a.gY(a),"\n")){o=A.me(a.gaW(),a.gY(a),a.gS(a).gam())
o.toString
o=o+a.gS(a).gam()+a.gn(a)===a.gaW().length}else o=!1
if(o){r=B.b.B(a.gY(a),0,a.gY(a).length-1)
if(r.length===0)p=q
else{o=a.gV()
o=o.gav(o)
n=a.ga4()
m=a.gV().gad()
p=A.hR(o-1,A.oy(s),m-1,n)
o=a.gS(a)
o=o.gav(o)
n=a.gV()
q=o===n.gav(n)?p:a.gS(a)}}return A.kL(q,p,r,s)},
rB(a){var s,r,q,p,o
if(a.gV().gam()!==0)return a
if(a.gV().gad()===a.gS(a).gad())return a
s=B.b.B(a.gY(a),0,a.gY(a).length-1)
r=a.gS(a)
q=a.gV()
q=q.gav(q)
p=a.ga4()
o=a.gV().gad()
p=A.hR(q-1,s.length-B.b.h1(s,"\n")-1,o-1,p)
return A.kL(r,p,s,B.b.bk(a.gaW(),"\n")?B.b.B(a.gaW(),0,a.gaW().length-1):a.gaW())},
oy(a){var s=a.length
if(s===0)return 0
else if(B.b.J(a,s-1)===10)return s===1?0:s-B.b.el(a,"\n",s-2)-1
else return s-B.b.h1(a,"\n")-1},
jC:function jC(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
jW:function jW(a){this.a=a},
jE:function jE(){},
jD:function jD(){},
jF:function jF(){},
jH:function jH(){},
jI:function jI(){},
jJ:function jJ(){},
jG:function jG(a){this.a=a},
jX:function jX(){},
jK:function jK(a){this.a=a},
jR:function jR(a,b,c){this.a=a
this.b=b
this.c=c},
jS:function jS(a,b){this.a=a
this.b=b},
jT:function jT(a){this.a=a},
jU:function jU(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
jP:function jP(a,b){this.a=a
this.b=b},
jQ:function jQ(a,b){this.a=a
this.b=b},
jL:function jL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jM:function jM(a,b,c){this.a=a
this.b=b
this.c=c},
jN:function jN(a,b,c){this.a=a
this.b=b
this.c=c},
jO:function jO(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jV:function jV(a,b,c){this.a=a
this.b=b
this.c=c},
aE:function aE(a,b,c){this.a=a
this.b=b
this.c=c},
lE:function lE(a){this.a=a},
bg:function bg(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hR(a,b,c,d){if(a<0)A.M(A.aJ("Offset may not be negative, was "+a+"."))
else if(c<0)A.M(A.aJ("Line may not be negative, was "+c+"."))
else if(b<0)A.M(A.aJ("Column may not be negative, was "+b+"."))
return new A.bC(d,a,c,b)},
bC:function bC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hS:function hS(){},
hT:function hT(){},
eF:function eF(){},
kL(a,b,c,d){var s=new A.bS(d,a,b,c)
s.m3(a,b,c)
if(!B.b.F(d,c))A.M(A.a8('The context line "'+d+'" must contain "'+c+'".',null))
if(A.me(d,c,a.gam())==null)A.M(A.a8('The span text "'+c+'" must start at column '+(a.gam()+1)+' in a line within "'+d+'".',null))
return s},
bS:function bS(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
C:function C(a,b,c){this.a=a
this.b=b
this.$ti=c},
cU:function cU(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
du:function du(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.$ti=e},
uf(){var s,r,q,p,o,n="renderer",m=t.N
$.hO.v(0,"align*",A.bp(m,m))
$.hO.i(0,"align*").v(0,u.l,"<?xml version='1.0' encoding='UTF-8'?>\n<!-- This file was generated by dvisvgm 2.13.3 -->\n<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='114.24917pt' height='25.314645pt' viewBox='114.730983 -15.407233 114.24917 25.314645'>\n<defs>\n<path id='g2-25' d='M4.491158-2.803487C4.491158-3.005729 4.309838-3.005729 4.191283-3.005729H1.562142C1.276214-3.005729 1.080946-2.942964 .767123-2.650062C.585803-2.489664 .313823-2.113076 .313823-2.050311C.313823-1.966625 .404483-1.966625 .432379-1.966625C.509091-1.966625 .516065-1.980573 .557908-2.043337C.913574-2.531507 1.345953-2.531507 1.499377-2.531507H1.924782C1.708593-1.764384 1.332005-.941469 1.12279-.523039C1.080946-.432379 1.011208-.285928 .990286-.258032C.983313-.230137 .969365-.202242 .969365-.153425C.969365-.041843 1.053051 .069738 1.21345 .069738C1.492403 .069738 1.569116-.244085 1.736488-.871731L2.168867-2.531507H2.998755C2.894147-2.113076 2.740722-1.478456 2.740722-.927522C2.740722-.648568 2.775592-.460274 2.817435-.306849C2.929016 .041843 3.019676 .069738 3.131258 .069738C3.291656 .069738 3.459029-.076712 3.459029-.244085C3.459029-.299875 3.445081-.327771 3.403238-.397509C3.270735-.655542 3.145205-1.053051 3.145205-1.624907C3.145205-1.75741 3.145205-2.036364 3.242839-2.531507H4.11457C4.2401-2.531507 4.29589-2.531507 4.372603-2.587298C4.470237-2.657036 4.491158-2.768618 4.491158-2.803487Z'/>\n<path id='g2-102' d='M4.212204-4.414446C4.212204-4.735243 3.870486-4.909589 3.514819-4.909589C3.20797-4.909589 2.866252-4.735243 2.677958-4.38655C2.538481-4.128518 2.48269-3.814695 2.336239-3.005729H1.785305C1.645828-3.005729 1.555168-3.005729 1.555168-2.852304C1.555168-2.75467 1.645828-2.75467 1.771357-2.75467H2.287422L1.673724 .54396C1.638854 .697385 1.520299 1.227397 1.185554 1.227397C1.185554 1.227397 1.011208 1.227397 .878705 1.143711C1.164633 1.053051 1.185554 .801993 1.185554 .760149C1.185554 .606725 1.066999 .502117 .9066 .502117C.718306 .502117 .509091 .662516 .509091 .927522C.509091 1.241345 .836862 1.422665 1.185554 1.422665C1.63188 1.422665 1.93873 .962391 2.022416 .808966C2.273474 .341719 2.433873-.516065 2.447821-.599751L2.838356-2.75467H3.521793C3.66127-2.75467 3.75193-2.75467 3.75193-2.908095C3.75193-3.005729 3.66127-3.005729 3.535741-3.005729H2.887173C3.047572-3.891407 3.103362-4.212204 3.159153-4.414446C3.194022-4.56787 3.347447-4.714321 3.514819-4.714321C3.514819-4.714321 3.710087-4.714321 3.84259-4.630635C3.556663-4.539975 3.535741-4.288917 3.535741-4.247073C3.535741-4.093649 3.654296-3.989041 3.814695-3.989041C4.002989-3.989041 4.212204-4.14944 4.212204-4.414446Z'/>\n<path id='g2-105' d='M2.259527-4.358655C2.259527-4.470237 2.175841-4.623661 1.980573-4.623661C1.792279-4.623661 1.590037-4.442341 1.590037-4.2401C1.590037-4.121544 1.680697-3.975093 1.868991-3.975093C2.071233-3.975093 2.259527-4.170361 2.259527-4.358655ZM2.440847-.99726C2.440847-1.08792 2.350187-1.08792 2.329265-1.08792C2.231631-1.08792 2.224658-1.046077 2.196762-.969365C2.036364-.411457 1.729514-.125529 1.457534-.125529C1.318057-.125529 1.283188-.216189 1.283188-.369614C1.283188-.530012 1.332005-.662516 1.39477-.81594L1.617933-1.373848L1.959651-2.259527C1.980573-2.329265 2.001494-2.412951 2.001494-2.48269C2.001494-2.810461 1.72254-3.075467 1.338979-3.075467C.648568-3.075467 .327771-2.127024 .327771-2.008468C.327771-1.917808 .425405-1.917808 .446326-1.917808C.54396-1.917808 .550934-1.952677 .571856-2.02939C.753176-2.629141 1.060025-2.880199 1.318057-2.880199C1.429639-2.880199 1.492403-2.824408 1.492403-2.636115C1.492403-2.475716 1.45056-2.371108 1.276214-1.93873L.836862-.81594C.808966-.72528 .774097-.641594 .774097-.523039C.774097-.195268 1.053051 .069738 1.436613 .069738C2.133998 .069738 2.440847-.892653 2.440847-.99726Z'/>\n<path id='g2-116' d='M2.608219-.99726C2.608219-1.08792 2.517559-1.08792 2.496638-1.08792C2.412951-1.08792 2.405978-1.073973 2.350187-.955417C2.154919-.516065 1.799253-.125529 1.415691-.125529C1.26924-.125529 1.171606-.216189 1.171606-.467248C1.171606-.536986 1.199502-.683437 1.21345-.753176L1.715567-2.75467H2.426899C2.559402-2.75467 2.650062-2.75467 2.650062-2.908095C2.650062-3.005729 2.559402-3.005729 2.440847-3.005729H1.778331L2.036364-4.037858C2.043337-4.072727 2.057285-4.107597 2.057285-4.135492C2.057285-4.261021 1.959651-4.358655 1.820174-4.358655C1.645828-4.358655 1.54122-4.2401 1.492403-4.05878C1.443587-3.884433 1.534247-4.219178 1.227397-3.005729H.516065C.383562-3.005729 .292902-3.005729 .292902-2.852304C.292902-2.75467 .376588-2.75467 .502117-2.75467H1.164633L.753176-1.108842C.711333-.934496 .648568-.683437 .648568-.592777C.648568-.18132 .99726 .069738 1.39477 .069738C2.168867 .069738 2.608219-.9066 2.608219-.99726Z'/>\n<path id='g3-100' d='M4.961395-1.424658C4.961395-1.524284 4.871731-1.524284 4.841843-1.524284C4.742217-1.524284 4.732254-1.484433 4.702366-1.344956C4.533001-.697385 4.353674-.109589 3.945205-.109589C3.676214-.109589 3.646326-.368618 3.646326-.56787C3.646326-.806974 3.666252-.876712 3.706102-1.046077L5.140722-6.804483C5.140722-6.804483 5.140722-6.914072 5.011208-6.914072C4.861768-6.914072 3.915318-6.824408 3.745953-6.804483C3.666252-6.794521 3.606476-6.744707 3.606476-6.615193C3.606476-6.495641 3.696139-6.495641 3.845579-6.495641C4.323786-6.495641 4.343711-6.425903 4.343711-6.326276L4.313823-6.127024L3.716065-3.765878C3.536737-4.134496 3.247821-4.403487 2.799502-4.403487C1.633873-4.403487 .398506-2.938979 .398506-1.484433C.398506-.547945 .946451 .109589 1.723537 .109589C1.92279 .109589 2.420922 .069738 3.01868-.637609C3.098381-.219178 3.447073 .109589 3.92528 .109589C4.273973 .109589 4.503113-.119552 4.662516-.438356C4.83188-.797011 4.961395-1.424658 4.961395-1.424658ZM3.566625-3.138232L3.068493-1.185554C3.01868-1.006227 3.01868-.986301 2.86924-.816936C2.430884-.268991 2.022416-.109589 1.743462-.109589C1.24533-.109589 1.105853-.657534 1.105853-1.046077C1.105853-1.544209 1.424658-2.769614 1.653798-3.227895C1.96264-3.815691 2.410959-4.184309 2.809465-4.184309C3.457036-4.184309 3.596513-3.367372 3.596513-3.307597S3.576588-3.188045 3.566625-3.138232Z'/>\n<path id='g3-101' d='M4.283935-1.066002C4.283935-1.125778 4.224159-1.195517 4.164384-1.195517C4.11457-1.195517 4.094645-1.175592 4.034869-1.09589C3.247821-.109589 2.161893-.109589 2.042341-.109589C1.265255-.109589 1.175592-.946451 1.175592-1.265255C1.175592-1.384807 1.185554-1.693649 1.334994-2.30137H1.863014C2.15193-2.30137 2.889166-2.321295 3.387298-2.530511C4.084682-2.82939 4.134496-3.417186 4.134496-3.556663C4.134496-3.995019 3.755915-4.403487 3.068493-4.403487C1.96264-4.403487 .458281-3.437111 .458281-1.693649C.458281-.67746 1.046077 .109589 2.022416 .109589C3.447073 .109589 4.283935-.946451 4.283935-1.066002ZM3.805729-3.556663C3.805729-2.520548 2.211706-2.520548 1.803238-2.520548H1.39477C1.783313-4.034869 2.809465-4.184309 3.068493-4.184309C3.536737-4.184309 3.805729-3.895392 3.805729-3.556663Z'/>\n<path id='g3-102' d='M5.499377-6.336239C5.499377-6.794521 5.041096-7.023661 4.632628-7.023661C4.293898-7.023661 3.666252-6.844334 3.367372-5.858032C3.307597-5.648817 3.277709-5.549191 3.038605-4.293898H2.351183C2.161893-4.293898 2.052304-4.293898 2.052304-4.104608C2.052304-3.985056 2.141968-3.985056 2.331258-3.985056H2.988792L2.241594-.049813C2.062267 .916563 1.892902 1.823163 1.374844 1.823163C1.334994 1.823163 1.085928 1.823163 .896638 1.643836C1.354919 1.613948 1.444583 1.255293 1.444583 1.105853C1.444583 .876712 1.265255 .757161 1.075965 .757161C.816936 .757161 .52802 .976339 .52802 1.354919C.52802 1.803238 .966376 2.042341 1.374844 2.042341C1.92279 2.042341 2.321295 1.454545 2.500623 1.075965C2.819427 .448319 3.048568-.757161 3.058531-.826899L3.656289-3.985056H4.513076C4.712329-3.985056 4.811955-3.985056 4.811955-4.184309C4.811955-4.293898 4.712329-4.293898 4.542964-4.293898H3.716065C3.825654-4.871731 3.815691-4.851806 3.92528-5.429639C3.965131-5.638854 4.104608-6.346202 4.164384-6.465753C4.254047-6.655044 4.423412-6.804483 4.632628-6.804483C4.672478-6.804483 4.931507-6.804483 5.120797-6.625156C4.682441-6.585305 4.582814-6.236613 4.582814-6.087173C4.582814-5.858032 4.762142-5.738481 4.951432-5.738481C5.210461-5.738481 5.499377-5.957659 5.499377-6.336239Z'/>\n<path id='g3-103' d='M3.58655 .667497L4.692403-3.755915C4.702366-3.815691 4.722291-3.865504 4.722291-3.935243C4.722291-4.104608 4.60274-4.204234 4.433375-4.204234C4.333748-4.204234 4.064757-4.134496 4.024907-3.775841C3.845579-4.144458 3.496887-4.403487 3.098381-4.403487C1.96264-4.403487 .727273-3.008717 .727273-1.574097C.727273-.587796 1.334994 0 2.052304 0C2.6401 0 3.108344-.468244 3.20797-.577833L3.217933-.56787L2.889166 .747198C2.849315 .836862 2.510585 1.823163 1.454545 1.823163C1.265255 1.823163 .936488 1.8132 .657534 1.723537C.956413 1.633873 1.066002 1.374844 1.066002 1.205479C1.066002 1.046077 .956413 .856787 .687422 .856787C.468244 .856787 .14944 1.036115 .14944 1.43462C.14944 1.843088 .518057 2.042341 1.474471 2.042341C2.719801 2.042341 3.437111 1.265255 3.58655 .667497ZM3.875467-3.178082L3.39726-1.275218C3.337484-1.016189 3.108344-.767123 2.889166-.577833C2.67995-.398506 2.371108-.219178 2.082192-.219178C1.58406-.219178 1.43462-.737235 1.43462-1.135741C1.43462-1.613948 1.723537-2.789539 1.992528-3.297634C2.261519-3.785803 2.689913-4.184309 3.108344-4.184309C3.765878-4.184309 3.905355-3.377335 3.905355-3.327522S3.88543-3.217933 3.875467-3.178082Z'/>\n<path id='g3-116' d='M3.128269-1.424658C3.128269-1.524284 3.048568-1.524284 3.008717-1.524284C2.919054-1.524284 2.909091-1.494396 2.859278-1.384807C2.430884-.348692 1.902864-.109589 1.564134-.109589C1.354919-.109589 1.255293-.239103 1.255293-.56787C1.255293-.806974 1.275218-.876712 1.315068-1.046077L2.052304-3.985056H2.988792C3.188045-3.985056 3.287671-3.985056 3.287671-4.184309C3.287671-4.293898 3.188045-4.293898 3.008717-4.293898H2.132005C2.49066-5.708593 2.540473-5.907846 2.540473-5.967621C2.540473-6.136986 2.420922-6.236613 2.251557-6.236613C2.221669-6.236613 1.942715-6.22665 1.853051-5.877958L1.464508-4.293898H.52802C.328767-4.293898 .229141-4.293898 .229141-4.104608C.229141-3.985056 .308842-3.985056 .508095-3.985056H1.384807C.667497-1.155666 .627646-.986301 .627646-.806974C.627646-.268991 1.006227 .109589 1.544209 .109589C2.560399 .109589 3.128269-1.344956 3.128269-1.424658Z'/>\n<path id='g4-43' d='M5.620922-1.743462C5.620922-1.917808 5.460523-1.917808 5.362889-1.917808H3.228892V-4.05878C3.228892-4.14944 3.228892-4.316812 3.061519-4.316812C2.887173-4.316812 2.887173-4.156413 2.887173-4.05878V-1.917808H.746202C.655542-1.917808 .488169-1.917808 .488169-1.750436C.488169-1.57609 .648568-1.57609 .746202-1.57609H2.887173V.564882C2.887173 .655542 2.887173 .822914 3.054545 .822914C3.228892 .822914 3.228892 .662516 3.228892 .564882V-1.57609H5.362889C5.453549-1.57609 5.620922-1.57609 5.620922-1.743462Z'/>\n<path id='g4-50' d='M3.521793-1.26924H3.284682C3.263761-1.115816 3.194022-.704359 3.103362-.63462C3.047572-.592777 2.510585-.592777 2.412951-.592777H1.129763C1.862017-1.241345 2.106102-1.436613 2.524533-1.764384C3.040598-2.175841 3.521793-2.608219 3.521793-3.270735C3.521793-4.11457 2.782565-4.630635 1.889913-4.630635C1.025156-4.630635 .439352-4.02391 .439352-3.382316C.439352-3.02665 .739228-2.991781 .808966-2.991781C.976339-2.991781 1.17858-3.110336 1.17858-3.361395C1.17858-3.486924 1.129763-3.731009 .767123-3.731009C.983313-4.226152 1.457534-4.379577 1.785305-4.379577C2.48269-4.379577 2.84533-3.835616 2.84533-3.270735C2.84533-2.66401 2.412951-2.182814 2.189788-1.931756L.509091-.27198C.439352-.209215 .439352-.195268 .439352 0H3.312578L3.521793-1.26924Z'/>\n<path id='g5-40' d='M3.297634 2.391034C3.297634 2.361146 3.297634 2.34122 3.128269 2.171856C1.882939 .916563 1.564134-.966376 1.564134-2.49066C1.564134-4.224159 1.942715-5.957659 3.16812-7.202989C3.297634-7.32254 3.297634-7.342466 3.297634-7.372354C3.297634-7.442092 3.257783-7.47198 3.198007-7.47198C3.098381-7.47198 2.201743-6.794521 1.613948-5.529265C1.105853-4.433375 .986301-3.327522 .986301-2.49066C.986301-1.713574 1.09589-.508095 1.643836 .617684C2.241594 1.843088 3.098381 2.49066 3.198007 2.49066C3.257783 2.49066 3.297634 2.460772 3.297634 2.391034Z'/>\n<path id='g5-41' d='M2.879203-2.49066C2.879203-3.267746 2.769614-4.473225 2.221669-5.599004C1.62391-6.824408 .767123-7.47198 .667497-7.47198C.607721-7.47198 .56787-7.43213 .56787-7.372354C.56787-7.342466 .56787-7.32254 .757161-7.143213C1.733499-6.156912 2.30137-4.572852 2.30137-2.49066C2.30137-.787049 1.932752 .966376 .697385 2.221669C.56787 2.34122 .56787 2.361146 .56787 2.391034C.56787 2.450809 .607721 2.49066 .667497 2.49066C.767123 2.49066 1.663761 1.8132 2.251557 .547945C2.759651-.547945 2.879203-1.653798 2.879203-2.49066Z'/>\n<path id='g5-61' d='M7.183064-3.457036C7.183064-3.656289 6.993773-3.656289 6.854296-3.656289H.886675C.747198-3.656289 .557908-3.656289 .557908-3.457036S.747198-3.257783 .896638-3.257783H6.844334C6.993773-3.257783 7.183064-3.257783 7.183064-3.457036ZM7.183064-1.524284C7.183064-1.723537 6.993773-1.723537 6.844334-1.723537H.896638C.747198-1.723537 .557908-1.723537 .557908-1.524284S.747198-1.325031 .886675-1.325031H6.854296C6.993773-1.325031 7.183064-1.325031 7.183064-1.524284Z'/>\n<path id='g5-94' d='M4.004981-5.280199L2.49066-6.894147L.976339-5.280199L1.105853-5.140722L2.49066-6.216687L3.875467-5.140722L4.004981-5.280199Z'/>\n<path id='g0-90' d='M9.39477 .926526C9.39477 .388543 8.856787 0 8.308842 0C7.551681 0 6.993773 1.085928 6.445828 3.118306C6.41594 3.227895 5.061021 8.229141 3.965131 14.744707C3.706102 16.268991 3.417186 17.932752 3.088418 19.317559C2.909091 20.044832 2.450809 21.917808 1.643836 21.917808C1.285181 21.917808 1.036115 21.688667 1.036115 21.688667C1.354919 21.668742 1.524284 21.449564 1.524284 21.200498C1.524284 20.871731 1.275218 20.712329 1.046077 20.712329C.806974 20.712329 .557908 20.861768 .557908 21.210461C.557908 21.718555 1.05604 22.136986 1.663761 22.136986C3.178082 22.136986 3.745953 19.805729 4.4533 16.916563C5.220423 13.768369 5.867995 10.590286 6.405978 7.392279C6.774595 5.270237 7.143213 3.277709 7.481943 1.992528C7.601494 1.504359 7.940224 .219178 8.328767 .219178C8.637609 .219178 8.886675 .408468 8.926526 .448319C8.597758 .468244 8.428394 .687422 8.428394 .936488C8.428394 1.265255 8.67746 1.424658 8.9066 1.424658C9.145704 1.424658 9.39477 1.275218 9.39477 .926526Z'/>\n<path id='g1-0' d='M5.467497-1.743462C5.467497-1.917808 5.307098-1.917808 5.209465-1.917808H1.011208C.913574-1.917808 .753176-1.917808 .753176-1.743462C.753176-1.57609 .920548-1.57609 1.011208-1.57609H5.209465C5.300125-1.57609 5.467497-1.57609 5.467497-1.743462Z'/>\n<path id='g1-49' d='M7.392279-1.506351C7.392279-2.322291 6.792528-3.075467 5.927771-3.075467C4.930511-3.075467 4.309838-2.280448 4.02391-1.910834C3.682192-2.329265 3.068493-3.075467 2.036364-3.075467C1.157659-3.075467 .54396-2.336239 .54396-1.499377C.54396-.683437 1.143711 .069738 2.008468 .069738C3.005729 .069738 3.626401-.72528 3.912329-1.094894C4.254047-.676463 4.867746 .069738 5.899875 .069738C6.77858 .069738 7.392279-.669489 7.392279-1.506351ZM7.197011-1.506351C7.197011-.808966 6.625156-.313823 6.018431-.313823C5.362889-.313823 4.902615-.871731 4.254047-1.652802C4.679452-2.329265 5.300125-2.810461 5.983562-2.810461C6.701868-2.810461 7.197011-2.182814 7.197011-1.506351ZM3.682192-1.352927C3.256787-.676463 2.636115-.195268 1.952677-.195268C1.234371-.195268 .739228-.822914 .739228-1.499377C.739228-2.196762 1.311083-2.691905 1.917808-2.691905C2.57335-2.691905 3.033624-2.133998 3.682192-1.352927Z'/>\n</defs>\n<g id='page1'>\n<use x='115.071731' y='-.000046' xlink:href='#g5-94'/>\n<use x='114.730983' y='0' xlink:href='#g3-103'/>\n<use x='119.840287' y='0' xlink:href='#g5-40'/>\n<use x='123.714765' y='0' xlink:href='#g3-102'/>\n<use x='129.664713' y='0' xlink:href='#g5-41'/>\n<use x='136.306523' y='0' xlink:href='#g5-61'/>\n<use x='146.822793' y='-13.56037' xlink:href='#g0-90'/>\n<use x='156.785449' y='-11.097408' xlink:href='#g4-43'/>\n<use x='162.901519' y='-11.097408' xlink:href='#g1-49'/>\n<use x='152.35761' y='9.077182' xlink:href='#g1-0'/>\n<use x='158.58429' y='9.077182' xlink:href='#g1-49'/>\n<use x='173.002497' y='0' xlink:href='#g3-103'/>\n<use x='178.111805' y='0' xlink:href='#g5-40'/>\n<use x='181.986283' y='0' xlink:href='#g3-116'/>\n<use x='185.583918' y='0' xlink:href='#g5-41'/>\n<use x='189.458396' y='0' xlink:href='#g3-101'/>\n<use x='194.097268' y='-4.113496' xlink:href='#g1-0'/>\n<use x='200.323947' y='-4.113496' xlink:href='#g4-50'/>\n<use x='204.295048' y='-4.113496' xlink:href='#g2-25'/>\n<use x='209.204114' y='-4.113496' xlink:href='#g2-105'/>\n<use x='212.022841' y='-4.113496' xlink:href='#g2-102'/>\n<use x='216.689425' y='-4.113496' xlink:href='#g2-116'/>\n<use x='220.197086' y='0' xlink:href='#g3-100'/>\n<use x='225.382519' y='0' xlink:href='#g3-116'/>\n</g>\n</svg>")
m=document
s=m.getElementById("canvas-container")
s.toString
r=A.a([],t.dw)
q=A.mS(0)
m=m.createElement("canvas")
t.jQ.a(m)
p=new A.fP(m,s,r,B.e,B.e,q,B.e,B.e)
p.a=A.qf()
s.appendChild(m).toString
o=new A.e7()
o.m2()
o.w=p
m=o.f
m===$&&A.b("camera")
p.j4(m)
m=o.f
s=o.w
m.r=s
s.j4(m)
s=m.r
r=s.a
r===$&&A.b(n)
r.lF(s)
s=s.d.getContext("2d")
s.toString
r.e=s
s=m.c
r=m.d=s/1.7777777777777777
q=m.r.a
q===$&&A.b(n)
q=q.e
q===$&&A.b("ctx")
q.setTransform(1280/s,0,0,-720/r,640-0/s,360-0/r)
r=m.r.a
r===$&&A.b(n)
r.ex(m.f)
o.cK()},
e7:function e7(){var _=this
_.cx=_.CW=_.ch=_.ay=_.ax=_.at=_.as=_.Q=_.z=_.y=_.x=$
_.a=_.cy=0
_.w=_.f=_.d=$},
js:function js(a){this.a=a},
jz:function jz(a){this.a=a},
ju:function ju(a,b){this.a=a
this.b=b},
jv:function jv(a){this.a=a},
jw:function jw(){},
jt:function jt(a,b,c){this.a=a
this.b=b
this.c=c},
jy:function jy(a,b){this.a=a
this.b=b},
jx:function jx(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
uj(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
u5(a,b,c,d){var s,r,q,p,o,n=A.bp(d,c.h("k<0>"))
for(s=c.h("y<0>"),r=0;r<1;++r){q=a[r]
p=b.$1(q)
o=n.i(0,p)
if(o==null){o=A.a([],s)
n.v(0,p,o)
p=o}else p=o
J.mB(p,q)}return n},
nX(a,b){return A.qA(a,b,b)},
qA(a,b,c){return A.nh(function(){var s=a,r=b
var q=0,p=1,o,n,m
return function $async$nX(d,e){if(d===1){o=e
q=p}while(true)switch(q){case 0:n=s.length,m=0
case 2:if(!(m<s.length)){q=4
break}q=5
return A.rE(s[m])
case 5:case 3:s.length===n||(0,A.e)(s),++m
q=2
break
case 4:return A.n1()
case 1:return A.n2(o)}}},c)},
de(a,b,c){return A.qF(a,b,c,c)},
qF(a,b,c,d){return A.nh(function(){var s=a,r=b,q=c
var p=0,o=1,n,m,l,k
return function $async$de(e,f){if(e===1){n=f
p=o}while(true)switch(p){case 0:m=J.X(s),l=0
case 2:if(!(l<m.gn(s))){p=4
break}k=m.i(s,l)
p=A.az(r.$2(l,k))?5:6
break
case 5:p=7
return k
case 7:case 6:case 3:++l
p=2
break
case 4:return A.n1()
case 1:return A.n2(n)}}},d)},
uo(a,b,c){var s,r,q,p,o,n,m=t.y
m.a(a)
m.a(b)
s=A.fq(A.iY(a),A.iY(b),c,t.A)
m=A.a([],t.l)
r=s.a
r===$&&A.b("values")
q=r.length
p=0
for(;p<r.length;r.length===q||(0,A.e)(r),++p){o=r[p]
n=J.X(o)
m.push(new A.f(n.i(o,0),n.i(o,1),n.i(o,2)))}return m},
pu(a,b,c){A.aP(a)
A.fk(b)
A.fk(c)
return a},
pF(a,b,c){var s
A.aP(a)
A.fk(b)
A.fk(c)
if(b==null)b=10
s=1/(1+Math.exp(-(-b/2)))
return Math.min(1,Math.max((1/(1+Math.exp(-(b*(a-0.5))))-s)/(1-2*s),0))},
pg(){var s,r,q,p,o=null
try{o=A.mZ()}catch(s){if(t.mA.b(A.bw(s))){r=$.lZ
if(r!=null)return r
throw s}else throw s}if(J.U(o,$.oX)){r=$.lZ
r.toString
return r}$.oX=o
if($.nx()==$.ft())r=$.lZ=o.k7(".").l(0)
else{q=o.hh()
p=q.length-1
r=$.lZ=p===0?q:B.b.B(q,0,p)}return r},
pr(a){var s
if(!(a>=65&&a<=90))s=a>=97&&a<=122
else s=!0
return s},
ps(a,b){var s=a.length,r=b+2
if(s<r)return!1
if(!A.pr(B.b.J(a,b)))return!1
if(B.b.J(a,b+1)!==58)return!1
if(s===r)return!0
return B.b.J(a,r)===47},
ub(a){var s,r,q,p
if(a.gn(a)===0)return!0
s=a.gac(a)
for(r=A.bf(a,1,null,a.$ti.h("B.E")),q=r.$ti,r=new A.O(r,r.gn(r),q.h("O<B.E>")),q=q.h("B.E");r.m();){p=r.d
if(!J.U(p==null?q.a(p):p,s))return!1}return!0},
ul(a,b,c){var s=B.a.ak(a,null)
if(s<0)throw A.d(A.a8(A.l(a)+" contains no null elements.",null))
B.a.v(a,s,b)},
pD(a,b,c){var s=B.a.ak(a,b)
if(s<0)throw A.d(A.a8(A.l(a)+" contains no elements matching "+b.l(0)+".",null))
B.a.v(a,s,null)},
tV(a,b){var s,r,q,p
for(s=new A.a9(a),r=t.E,s=new A.O(s,s.gn(s),r.h("O<w.E>")),r=r.h("w.E"),q=0;s.m();){p=s.d
if((p==null?r.a(p):p)===b)++q}return q},
me(a,b,c){var s,r,q
if(b.length===0)for(s=0;!0;){r=B.b.aN(a,"\n",s)
if(r===-1)return a.length-s>=c?s:null
if(r-s>=c)return s
s=r+1}r=B.b.ak(a,b)
for(;r!==-1;){q=r===0?0:B.b.el(a,"\n",r-1)+1
if(c===r-q)return q
r=B.b.aN(a,b,r+1)}return null}},J={
nr(a,b,c,d){return{i:a,p:b,e:c,x:d}},
iN(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.nn==null){A.u7()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.d(A.i1("Return interceptor for "+A.l(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.lF
if(o==null)o=$.lF=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.ue(a)
if(p!=null)return p
if(typeof a=="function")return B.b2
s=Object.getPrototypeOf(a)
if(s==null)return B.aB
if(s===Object.prototype)return B.aB
if(typeof q=="function"){o=$.lF
if(o==null)o=$.lF=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.a3,enumerable:false,writable:true,configurable:true})
return B.a3}return B.a3},
nY(a,b){if(a<0||a>4294967295)throw A.d(A.a0(a,0,4294967295,"length",null))
return J.nZ(new Array(a),b)},
mI(a,b){if(a<0)throw A.d(A.a8("Length must be a non-negative integer: "+a,null))
return A.a(new Array(a),b.h("y<0>"))},
nZ(a,b){return J.k6(A.a(a,b.h("y<0>")),b)},
k6(a,b){a.fixed$length=Array
return a},
qB(a,b){var s=t.bP
return J.nD(s.a(a),s.a(b))},
o_(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
qC(a,b){var s,r
for(s=a.length;b<s;){r=B.b.E(a,b)
if(r!==32&&r!==13&&!J.o_(r))break;++b}return b},
qD(a,b){var s,r
for(;b>0;b=s){s=b-1
r=B.b.J(a,s)
if(r!==32&&r!==13&&!J.o_(r))break}return b},
bi(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dc.prototype
return J.ek.prototype}if(typeof a=="string")return J.bO.prototype
if(a==null)return J.ej.prototype
if(typeof a=="boolean")return J.hh.prototype
if(a.constructor==Array)return J.y.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof A.K)return a
return J.iN(a)},
u0(a){if(typeof a=="number")return J.cc.prototype
if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(a.constructor==Array)return J.y.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof A.K)return a
return J.iN(a)},
X(a){if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(a.constructor==Array)return J.y.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof A.K)return a
return J.iN(a)},
aR(a){if(a==null)return a
if(a.constructor==Array)return J.y.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof A.K)return a
return J.iN(a)},
pj(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dc.prototype
return J.ek.prototype}if(a==null)return a
if(!(a instanceof A.K))return J.bT.prototype
return a},
pk(a){if(typeof a=="number")return J.cc.prototype
if(a==null)return a
if(!(a instanceof A.K))return J.bT.prototype
return a},
pl(a){if(typeof a=="number")return J.cc.prototype
if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(!(a instanceof A.K))return J.bT.prototype
return a},
mg(a){if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(!(a instanceof A.K))return J.bT.prototype
return a},
pm(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof A.K)return a
return J.iN(a)},
u1(a){if(a==null)return a
if(!(a instanceof A.K))return J.bT.prototype
return a},
fu(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.u0(a).L(a,b)},
U(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bi(a).U(a,b)},
bk(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.pl(a).A(a,b)},
q0(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.pk(a).I(a,b)},
Z(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||A.uc(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.X(a).i(a,b)},
fv(a,b,c){return J.aR(a).v(a,b,c)},
q1(a,b,c,d){return J.pm(a).mh(a,b,c,d)},
q2(a,b,c,d){return J.pm(a).mC(a,b,c,d)},
mB(a,b){return J.aR(a).p(a,b)},
af(a,b){return J.aR(a).M(a,b)},
mC(a,b){return J.mg(a).c7(a,b)},
nC(a,b){return J.mg(a).J(a,b)},
nD(a,b){return J.pl(a).aA(a,b)},
iS(a,b){return J.aR(a).af(a,b)},
aF(a){return J.aR(a).gac(a)},
aL(a){return J.bi(a).gX(a)},
cz(a){return J.X(a).gah(a)},
c8(a){return J.X(a).gcD(a)},
I(a){return J.aR(a).gH(a)},
aG(a){return J.aR(a).gq(a)},
N(a){return J.X(a).gn(a)},
q3(a){return J.u1(a).gal(a)},
nE(a){if(typeof a==="number")return a>0?1:a<0?-1:a
return J.pj(a).geZ(a)},
nF(a,b,c){return J.aR(a).dw(a,b,c)},
q(a,b,c){return J.aR(a).em(a,b,c)},
q4(a,b,c){return J.mg(a).jL(a,b,c)},
q5(a,b){return J.X(a).sn(a,b)},
iT(a,b){return J.aR(a).b7(a,b)},
nG(a,b){return J.aR(a).cn(a,b)},
q6(a){return J.pk(a).br(a)},
fw(a){return J.aR(a).ap(a)},
bL(a){return J.bi(a).l(a)},
nH(a){return J.mg(a).ez(a)},
q7(a,b){return J.aR(a).eB(a,b)},
eh:function eh(){},
hh:function hh(){},
ej:function ej(){},
ba:function ba(){},
cK:function cK(){},
hB:function hB(){},
bT:function bT(){},
bP:function bP(){},
y:function y(a){this.$ti=a},
k7:function k7(a){this.$ti=a},
aC:function aC(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cc:function cc(){},
dc:function dc(){},
ek:function ek(){},
bO:function bO(){}},B={}
var w=[A,J,B]
var $={}
A.mK.prototype={}
J.eh.prototype={
U(a,b){return a===b},
gX(a){return A.bR(a)},
l(a){return"Instance of '"+A.kz(a)+"'"}}
J.hh.prototype={
l(a){return String(a)},
gX(a){return a?519018:218159},
$iA:1}
J.ej.prototype={
U(a,b){return null==b},
l(a){return"null"},
gX(a){return 0},
$iaq:1}
J.ba.prototype={}
J.cK.prototype={
gX(a){return 0},
l(a){return String(a)}}
J.hB.prototype={}
J.bT.prototype={}
J.bP.prototype={
l(a){var s=a[$.pK()]
if(s==null)return this.lO(a)
return"JavaScript function for "+J.bL(s)},
$ibX:1}
J.y.prototype={
p(a,b){A.v(a).c.a(b)
if(!!a.fixed$length)A.M(A.S("add"))
a.push(b)},
ew(a,b){if(!!a.fixed$length)A.M(A.S("removeAt"))
if(b<0||b>=a.length)throw A.d(A.kA(b,null))
return a.splice(b,1)[0]},
bF(a,b,c){A.v(a).c.a(c)
if(!!a.fixed$length)A.M(A.S("insert"))
if(b<0||b>a.length)throw A.d(A.kA(b,null))
a.splice(b,0,c)},
ei(a,b,c){var s,r
A.v(a).h("j<1>").a(c)
if(!!a.fixed$length)A.M(A.S("insertAll"))
A.ob(b,0,a.length,"index")
if(!t.gt.b(c))c=J.fw(c)
s=J.N(c)
a.length=a.length+s
r=b+s
this.dC(a,r,a.length,a,b)
this.lg(a,b,r,c)},
dm(a){if(!!a.fixed$length)A.M(A.S("removeLast"))
if(a.length===0)throw A.d(A.cu(a,-1))
return a.pop()},
a3(a,b){var s
if(!!a.fixed$length)A.M(A.S("remove"))
for(s=0;s<a.length;++s)if(J.U(a[s],b)){a.splice(s,1)
return!0}return!1},
fj(a,b,c){var s,r,q,p,o
A.v(a).h("A(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!A.az(b.$1(p)))s.push(p)
if(a.length!==r)throw A.d(A.av(a))}o=s.length
if(o===r)return
this.sn(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
eB(a,b){var s=A.v(a)
return new A.am(a,s.h("A(1)").a(b),s.h("am<1>"))},
M(a,b){var s
A.v(a).h("j<1>").a(b)
if(!!a.fixed$length)A.M(A.S("addAll"))
if(Array.isArray(b)){this.mg(a,b)
return}for(s=J.I(b);s.m();)a.push(s.gu())},
mg(a,b){var s,r
t.m.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.d(A.av(a))
for(r=0;r<s;++r)a.push(b[r])},
bV(a){if(!!a.fixed$length)A.M(A.S("clear"))
a.length=0},
bc(a,b){var s,r
A.v(a).h("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.d(A.av(a))}},
em(a,b,c){var s=A.v(a)
return new A.J(a,s.Z(c).h("1(2)").a(b),s.h("@<1>").Z(c).h("J<1,2>"))},
aC(a,b){var s,r=A.bQ(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.v(r,s,A.l(a[s]))
return r.join(b)},
aS(a){return this.aC(a,"")},
b7(a,b){return A.bf(a,b,null,A.v(a).c)},
aT(a,b){var s,r,q
A.v(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.d(A.ah())
if(0>=s)return A.c(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.d(A.av(a))}return r},
ef(a,b,c,d){var s,r,q
d.a(b)
A.v(a).Z(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.d(A.av(a))}return r},
af(a,b){if(!(b>=0&&b<a.length))return A.c(a,b)
return a[b]},
b8(a,b,c){if(b<0||b>a.length)throw A.d(A.a0(b,0,a.length,"start",null))
if(c<b||c>a.length)throw A.d(A.a0(c,b,a.length,"end",null))
if(b===c)return A.a([],A.v(a))
return A.a(a.slice(b,c),A.v(a))},
dw(a,b,c){A.aK(b,c,a.length)
return A.bf(a,b,c,A.v(a).c)},
gac(a){if(a.length>0)return a[0]
throw A.d(A.ah())},
gq(a){var s=a.length
if(s>0)return a[s-1]
throw A.d(A.ah())},
dC(a,b,c,d,e){var s,r,q,p,o
A.v(a).h("j<1>").a(d)
if(!!a.immutable$list)A.M(A.S("setRange"))
A.aK(b,c,a.length)
s=c-b
if(s===0)return
A.bd(e,"skipCount")
if(t.gs.b(d)){r=d
q=e}else{r=J.iT(d,e).bs(0,!1)
q=0}p=J.X(r)
if(q+s>p.gn(r))throw A.d(A.qz())
if(q<b)for(o=s-1;o>=0;--o)a[b+o]=p.i(r,q+o)
else for(o=0;o<s;++o)a[b+o]=p.i(r,q+o)},
lg(a,b,c,d){return this.dC(a,b,c,d,0)},
b2(a,b){var s,r
A.v(a).h("A(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(A.az(b.$1(a[r])))return!0
if(a.length!==s)throw A.d(A.av(a))}return!1},
cA(a,b){var s,r
A.v(a).h("A(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!A.az(b.$1(a[r])))return!1
if(a.length!==s)throw A.d(A.av(a))}return!0},
cn(a,b){var s,r=A.v(a)
r.h("i(1,1)?").a(b)
if(!!a.immutable$list)A.M(A.S("sort"))
s=b==null?J.to():b
A.oi(a,s,r.c)},
lp(a){return this.cn(a,null)},
aN(a,b,c){var s,r=a.length
if(c>=r)return-1
for(s=c;s<r;++s){if(!(s<a.length))return A.c(a,s)
if(J.U(a[s],b))return s}return-1},
ak(a,b){return this.aN(a,b,0)},
F(a,b){var s
for(s=0;s<a.length;++s)if(J.U(a[s],b))return!0
return!1},
gah(a){return a.length===0},
gcD(a){return a.length!==0},
l(a){return A.k4(a,"[","]")},
bs(a,b){var s=A.a(a.slice(0),A.v(a))
return s},
ap(a){return this.bs(a,!0)},
gH(a){return new J.aC(a,a.length,A.v(a).h("aC<1>"))},
gX(a){return A.bR(a)},
gn(a){return a.length},
sn(a,b){if(!!a.fixed$length)A.M(A.S("set length"))
if(b<0)throw A.d(A.a0(b,0,null,"newLength",null))
if(b>a.length)A.v(a).c.a(null)
a.length=b},
i(a,b){if(!(b>=0&&b<a.length))throw A.d(A.cu(a,b))
return a[b]},
v(a,b,c){A.v(a).c.a(c)
if(!!a.immutable$list)A.M(A.S("indexed set"))
if(!(b>=0&&b<a.length))throw A.d(A.cu(a,b))
a[b]=c},
jC(a,b){var s
A.v(a).h("A(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(A.az(b.$1(a[s])))return s
return-1},
sac(a,b){A.v(a).c.a(b)
if(a.length===0)throw A.d(A.ah())
this.v(a,0,b)},
sq(a,b){var s
A.v(a).c.a(b)
s=a.length
if(s===0)throw A.d(A.ah())
this.v(a,s-1,b)},
$iQ:1,
$ij:1,
$ik:1}
J.k7.prototype={}
J.aC.prototype={
gu(){var s=this.d
return s==null?this.$ti.c.a(s):s},
m(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.d(A.e(q))
s=r.c
if(s>=p){r.sia(null)
return!1}r.sia(q[s]);++r.c
return!0},
sia(a){this.d=this.$ti.h("1?").a(a)},
$iV:1}
J.cc.prototype={
aA(a,b){var s
A.lR(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gek(b)
if(this.gek(a)===s)return 0
if(this.gek(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gek(a){return a===0?1/a<0:a<0},
geZ(a){var s
if(a>0)s=1
else s=a<0?-1:a
return s},
br(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.d(A.S(""+a+".toInt()"))},
fz(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.d(A.S(""+a+".ceil()"))},
oC(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.d(A.S(""+a+".floor()"))},
hi(a,b){var s
if(b>20)throw A.d(A.a0(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gek(a))return"-"+s
return s},
pS(a,b){var s,r,q,p
if(b<2||b>36)throw A.d(A.a0(b,2,36,"radix",null))
s=a.toString(b)
if(B.b.J(s,s.length-1)!==41)return s
r=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(r==null)A.M(A.S("Unexpected toString result: "+s))
q=r.length
if(1>=q)return A.c(r,1)
s=r[1]
if(3>=q)return A.c(r,3)
p=+r[3]
q=r[2]
if(q!=null){s+=q
p-=q.length}return s+B.b.A("0",p)},
l(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gX(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
L(a,b){A.lR(b)
return a+b},
A(a,b){return a*b},
W(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
if(b<0)return s-b
else return s+b},
b0(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.iF(a,b)},
aR(a,b){return(a|0)===a?a/b|0:this.iF(a,b)},
iF(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.d(A.S("Result of truncating division is "+A.l(s)+": "+A.l(a)+" ~/ "+b))},
cW(a,b){var s
if(a>0)s=this.iD(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
mF(a,b){if(0>b)throw A.d(A.fo(b))
return this.iD(a,b)},
iD(a,b){return b>31?0:a>>>b},
$iag:1,
$ip:1,
$iac:1}
J.dc.prototype={
geZ(a){var s
if(a>0)s=1
else s=a<0?-1:a
return s},
$ii:1}
J.ek.prototype={}
J.bO.prototype={
J(a,b){if(b<0)throw A.d(A.cu(a,b))
if(b>=a.length)A.M(A.cu(a,b))
return a.charCodeAt(b)},
E(a,b){if(b>=a.length)throw A.d(A.cu(a,b))
return a.charCodeAt(b)},
fs(a,b,c){var s=b.length
if(c>s)throw A.d(A.a0(c,0,s,null,null))
return new A.iB(b,a,c)},
c7(a,b){return this.fs(a,b,0)},
jL(a,b,c){var s,r,q=null
if(c<0||c>b.length)throw A.d(A.a0(c,0,b.length,q,q))
s=a.length
if(c+s>b.length)return q
for(r=0;r<s;++r)if(this.J(b,c+r)!==this.E(a,r))return q
return new A.dt(c,a)},
L(a,b){return a+b},
bk(a,b){var s=b.length,r=a.length
if(s>r)return!1
return b===this.ar(a,r-s)},
k0(a,b,c){A.ob(0,0,a.length,"startIndex")
return A.ur(a,b,c,0)},
co(a,b){if(typeof b=="string")return A.a(a.split(b),t.s)
else if(b instanceof A.cJ&&b.git().exec("").length-2===0)return A.a(a.split(b.b),t.s)
else return this.mq(a,b)},
ci(a,b,c,d){var s=A.aK(b,c,a.length)
return A.pG(a,b,s,d)},
mq(a,b){var s,r,q,p,o,n,m=A.a([],t.s)
for(s=J.mC(b,a),s=s.gH(s),r=0,q=1;s.m();){p=s.gu()
o=p.gS(p)
n=p.gV()
q=n-o
if(q===0&&r===o)continue
B.a.p(m,this.B(a,r,o))
r=n}if(r<a.length||q>0)B.a.p(m,this.ar(a,r))
return m},
a9(a,b,c){var s
t.oc.a(b)
if(c<0||c>a.length)throw A.d(A.a0(c,0,a.length,null,null))
if(typeof b=="string"){s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)}return J.q4(b,a,c)!=null},
a_(a,b){return this.a9(a,b,0)},
B(a,b,c){return a.substring(b,A.aK(b,c,a.length))},
ar(a,b){return this.B(a,b,null)},
ez(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(this.E(p,0)===133){s=J.qC(p,1)
if(s===o)return""}else s=0
r=o-1
q=this.J(p,r)===133?J.qD(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
A(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.d(B.aY)
for(s=a,r="";!0;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
p7(a,b){var s=b-a.length
if(s<=0)return a
return a+this.A(" ",s)},
aN(a,b,c){var s
if(c<0||c>a.length)throw A.d(A.a0(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
ak(a,b){return this.aN(a,b,0)},
el(a,b,c){var s,r
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.d(A.a0(c,0,a.length,null,null))
s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)},
h1(a,b){return this.el(a,b,null)},
nT(a,b,c){var s=a.length
if(c>s)throw A.d(A.a0(c,0,s,null,null))
return A.cy(a,b,c)},
F(a,b){return this.nT(a,b,0)},
aA(a,b){var s
A.ay(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
l(a){return a},
gX(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gn(a){return a.length},
i(a,b){if(!(b>=0&&b<a.length))throw A.d(A.cu(a,b))
return a[b]},
$iag:1,
$idl:1,
$in:1}
A.cq.prototype={
gH(a){var s=A.D(this)
return new A.dS(J.I(this.gbi()),s.h("@<1>").Z(s.z[1]).h("dS<1,2>"))},
gn(a){return J.N(this.gbi())},
gah(a){return J.cz(this.gbi())},
gcD(a){return J.c8(this.gbi())},
b7(a,b){var s=A.D(this)
return A.jf(J.iT(this.gbi(),b),s.c,s.z[1])},
af(a,b){return A.D(this).z[1].a(J.iS(this.gbi(),b))},
gac(a){return A.D(this).z[1].a(J.aF(this.gbi()))},
gq(a){return A.D(this).z[1].a(J.aG(this.gbi()))},
l(a){return J.bL(this.gbi())}}
A.dS.prototype={
m(){return this.a.m()},
gu(){return this.$ti.z[1].a(this.a.gu())},
$iV:1}
A.cD.prototype={
gbi(){return this.a}}
A.eW.prototype={$iQ:1}
A.eT.prototype={
i(a,b){return this.$ti.z[1].a(J.Z(this.a,b))},
v(a,b,c){var s=this.$ti
J.fv(this.a,b,s.c.a(s.z[1].a(c)))},
sn(a,b){J.q5(this.a,b)},
p(a,b){var s=this.$ti
J.mB(this.a,s.c.a(s.z[1].a(b)))},
M(a,b){var s=this.$ti
J.af(this.a,A.jf(s.h("j<2>").a(b),s.z[1],s.c))},
cn(a,b){var s
this.$ti.h("i(2,2)?").a(b)
s=b==null?null:new A.lm(this,b)
J.nG(this.a,s)},
dw(a,b,c){var s=this.$ti
return A.jf(J.nF(this.a,b,c),s.c,s.z[1])},
$iQ:1,
$ik:1}
A.lm.prototype={
$2(a,b){var s=this.a.$ti,r=s.c
r.a(a)
r.a(b)
s=s.z[1]
return this.b.$2(s.a(a),s.a(b))},
$S(){return this.a.$ti.h("i(1,1)")}}
A.aU.prototype={
gbi(){return this.a}}
A.el.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.a9.prototype={
gn(a){return this.a.length},
i(a,b){return B.b.J(this.a,b)}}
A.mu.prototype={
$0(){var s=new A.au($.aa,t.av)
s.i4(null)
return s},
$S:75}
A.kK.prototype={}
A.Q.prototype={}
A.B.prototype={
gH(a){var s=this
return new A.O(s,s.gn(s),A.D(s).h("O<B.E>"))},
gah(a){return this.gn(this)===0},
gac(a){if(this.gn(this)===0)throw A.d(A.ah())
return this.af(0,0)},
gq(a){var s=this
if(s.gn(s)===0)throw A.d(A.ah())
return s.af(0,s.gn(s)-1)},
aC(a,b){var s,r,q,p=this,o=p.gn(p)
if(b.length!==0){if(o===0)return""
s=A.l(p.af(0,0))
if(o!==p.gn(p))throw A.d(A.av(p))
for(r=s,q=1;q<o;++q){r=r+b+A.l(p.af(0,q))
if(o!==p.gn(p))throw A.d(A.av(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.l(p.af(0,q))
if(o!==p.gn(p))throw A.d(A.av(p))}return r.charCodeAt(0)==0?r:r}},
aS(a){return this.aC(a,"")},
aT(a,b){var s,r,q,p=this
A.D(p).h("B.E(B.E,B.E)").a(b)
s=p.gn(p)
if(s===0)throw A.d(A.ah())
r=p.af(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.af(0,q))
if(s!==p.gn(p))throw A.d(A.av(p))}return r},
b7(a,b){return A.bf(this,b,null,A.D(this).h("B.E"))},
bs(a,b){return A.h(this,b,A.D(this).h("B.E"))},
ap(a){return this.bs(a,!0)}}
A.aD.prototype={
c3(a,b,c,d){var s,r=this.b
A.bd(r,"start")
s=this.c
if(s!=null){A.bd(s,"end")
if(r>s)throw A.d(A.a0(r,0,s,"start",null))}},
gmr(){var s=J.N(this.a),r=this.c
if(r==null||r>s)return s
return r},
gmK(){var s=J.N(this.a),r=this.b
if(r>s)return s
return r},
gn(a){var s,r=J.N(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
if(typeof s!=="number")return s.I()
return s-q},
af(a,b){var s=this,r=s.gmK()+b
if(b<0||r>=s.gmr())throw A.d(A.hf(b,s,"index",null,null))
return J.iS(s.a,r)},
b7(a,b){var s,r,q=this
A.bd(b,"count")
s=q.b+b
r=q.c
if(r!=null&&s>=r)return new A.e0(q.$ti.h("e0<1>"))
return A.bf(q.a,s,r,q.$ti.c)},
pN(a,b){var s,r,q,p=this
A.bd(b,"count")
s=p.c
r=p.b
q=r+b
if(s==null)return A.bf(p.a,r,q,p.$ti.c)
else{if(s<q)return p
return A.bf(p.a,r,q,p.$ti.c)}},
bs(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.X(n),l=m.gn(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.mI(0,n):J.nY(0,n)}r=A.bQ(s,m.af(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.v(r,q,m.af(n,o+q))
if(m.gn(n)<l)throw A.d(A.av(p))}return r},
ap(a){return this.bs(a,!0)}}
A.O.prototype={
gu(){var s=this.d
return s==null?this.$ti.c.a(s):s},
m(){var s,r=this,q=r.a,p=J.X(q),o=p.gn(q)
if(r.b!==o)throw A.d(A.av(q))
s=r.c
if(s>=o){r.sbR(null)
return!1}r.sbR(p.af(q,s));++r.c
return!0},
sbR(a){this.d=this.$ti.h("1?").a(a)},
$iV:1}
A.cN.prototype={
gH(a){var s=A.D(this)
return new A.cO(J.I(this.a),this.b,s.h("@<1>").Z(s.z[1]).h("cO<1,2>"))},
gn(a){return J.N(this.a)},
gah(a){return J.cz(this.a)},
gac(a){return this.b.$1(J.aF(this.a))},
gq(a){return this.b.$1(J.aG(this.a))},
af(a,b){return this.b.$1(J.iS(this.a,b))}}
A.dZ.prototype={$iQ:1}
A.cO.prototype={
m(){var s=this,r=s.b
if(r.m()){s.sbR(s.c.$1(r.gu()))
return!0}s.sbR(null)
return!1},
gu(){var s=this.a
return s==null?this.$ti.z[1].a(s):s},
sbR(a){this.a=this.$ti.h("2?").a(a)}}
A.J.prototype={
gn(a){return J.N(this.a)},
af(a,b){return this.b.$1(J.iS(this.a,b))}}
A.am.prototype={
gH(a){return new A.cW(J.I(this.a),this.b,this.$ti.h("cW<1>"))}}
A.cW.prototype={
m(){var s,r
for(s=this.a,r=this.b;s.m();)if(A.az(r.$1(s.gu())))return!0
return!1},
gu(){return this.a.gu()}}
A.e3.prototype={
gH(a){var s=this.$ti
return new A.e4(J.I(this.a),this.b,B.a6,s.h("@<1>").Z(s.z[1]).h("e4<1,2>"))}}
A.e4.prototype={
gu(){var s=this.d
return s==null?this.$ti.z[1].a(s):s},
m(){var s,r,q=this
if(q.c==null)return!1
for(s=q.a,r=q.b;!q.c.m();){q.sbR(null)
if(s.m()){q.sib(null)
q.sib(J.I(r.$1(s.gu())))}else return!1}q.sbR(q.c.gu())
return!0},
sib(a){this.c=this.$ti.h("V<2>?").a(a)},
sbR(a){this.d=this.$ti.h("2?").a(a)},
$iV:1}
A.c_.prototype={
b7(a,b){A.iX(b,"count",t.S)
A.bd(b,"count")
return new A.c_(this.a,this.b+b,A.D(this).h("c_<1>"))},
gH(a){return new A.eE(J.I(this.a),this.b,A.D(this).h("eE<1>"))}}
A.d7.prototype={
gn(a){var s=J.N(this.a)-this.b
if(s>=0)return s
return 0},
b7(a,b){A.iX(b,"count",t.S)
A.bd(b,"count")
return new A.d7(this.a,this.b+b,this.$ti)},
$iQ:1}
A.eE.prototype={
m(){var s,r
for(s=this.a,r=0;r<this.b;++r)s.m()
this.b=0
return s.m()},
gu(){return this.a.gu()}}
A.e0.prototype={
gH(a){return B.a6},
gah(a){return!0},
gn(a){return 0},
gac(a){throw A.d(A.ah())},
gq(a){throw A.d(A.ah())},
af(a,b){throw A.d(A.a0(b,0,0,"index",null))},
b7(a,b){A.bd(b,"count")
return this}}
A.e1.prototype={
m(){return!1},
gu(){throw A.d(A.ah())},
$iV:1}
A.ar.prototype={
gH(a){return new A.cX(J.I(this.a),this.$ti.h("cX<1>"))}}
A.cX.prototype={
m(){var s,r
for(s=this.a,r=this.$ti.c;s.m();)if(r.b(s.gu()))return!0
return!1},
gu(){return this.$ti.c.a(this.a.gu())},
$iV:1}
A.bm.prototype={
sn(a,b){throw A.d(A.S("Cannot change the length of a fixed-length list"))},
p(a,b){A.aA(a).h("bm.E").a(b)
throw A.d(A.S("Cannot add to a fixed-length list"))},
M(a,b){A.aA(a).h("j<bm.E>").a(b)
throw A.d(A.S("Cannot add to a fixed-length list"))}}
A.bE.prototype={
v(a,b,c){A.D(this).h("bE.E").a(c)
throw A.d(A.S("Cannot modify an unmodifiable list"))},
sn(a,b){throw A.d(A.S("Cannot change the length of an unmodifiable list"))},
p(a,b){A.D(this).h("bE.E").a(b)
throw A.d(A.S("Cannot add to an unmodifiable list"))},
M(a,b){A.D(this).h("j<bE.E>").a(b)
throw A.d(A.S("Cannot add to an unmodifiable list"))},
cn(a,b){A.D(this).h("i(bE.E,bE.E)?").a(b)
throw A.d(A.S("Cannot modify an unmodifiable list"))}}
A.dv.prototype={}
A.Y.prototype={
gn(a){return J.N(this.a)},
af(a,b){var s=this.a,r=J.X(s)
return r.af(s,r.gn(s)-1-b)}}
A.fg.prototype={}
A.d6.prototype={
l(a){return A.mR(this)},
ge4(a){return this.og(0,A.D(this).h("bq<1,2>"))},
og(a,b){var s=this
return A.nh(function(){var r=a
var q=0,p=1,o,n,m,l,k,j
return function $async$ge4(c,d){if(c===1){o=d
q=p}while(true)switch(q){case 0:n=s.gbo(),n=n.gH(n),m=A.D(s),l=m.z[1],m=m.h("@<1>").Z(l).h("bq<1,2>")
case 2:if(!n.m()){q=3
break}k=n.gu()
j=s.i(0,k)
q=4
return new A.bq(k,j==null?l.a(j):j,m)
case 4:q=2
break
case 3:return A.n1()
case 1:return A.n2(o)}}},b)},
$ib4:1}
A.u.prototype={
gn(a){return this.a},
aj(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
i(a,b){if(!this.aj(b))return null
return this.b[A.ay(b)]},
bc(a,b){var s,r,q,p,o,n=this.$ti
n.h("~(1,2)").a(b)
s=this.c
for(r=s.length,q=this.b,n=n.z[1],p=0;p<r;++p){o=A.ay(s[p])
b.$2(o,n.a(q[o]))}},
gbo(){return new A.eU(this,this.$ti.h("eU<1>"))}}
A.eU.prototype={
gH(a){var s=this.a.c
return new J.aC(s,s.length,A.v(s).h("aC<1>"))},
gn(a){return this.a.c.length}}
A.ca.prototype={
cV(){var s,r,q,p=this,o=p.$map
if(o==null){s=p.$ti
r=s.c
q=A.qt(r)
o=A.ab(A.ty(),q,r,s.z[1])
A.pi(p.a,o)
p.$map=o}return o},
aj(a){return this.cV().aj(a)},
i(a,b){return this.cV().i(0,b)},
bc(a,b){this.$ti.h("~(1,2)").a(b)
this.cV().bc(0,b)},
gbo(){var s=this.cV()
return new A.aX(s,A.D(s).h("aX<1>"))},
gn(a){return this.cV().a}}
A.jB.prototype={
$1(a){return this.a.b(a)},
$S:80}
A.eg.prototype={
U(a,b){if(b==null)return!1
return b instanceof A.eg&&this.a.U(0,b.a)&&A.dH(this)===A.dH(b)},
gX(a){return A.cQ(this.a,A.dH(this),B.n,B.n)},
l(a){var s=B.a.aC([A.nm(this.$ti.c)],", ")
return this.a.l(0)+" with "+("<"+s+">")}}
A.cb.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.z[0])},
$S(){return A.u9(A.nl(this.a),this.$ti)}}
A.kU.prototype={
bp(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.eu.prototype={
l(a){var s=this.b
if(s==null)return"NoSuchMethodError: "+this.a
return"NoSuchMethodError: method not found: '"+s+"' on null"}}
A.hi.prototype={
l(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.i2.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hs.prototype={
l(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"},
$ibW:1}
A.e2.prototype={}
A.f5.prototype={
l(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ici:1}
A.aV.prototype={
l(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.pH(r==null?"unknown":r)+"'"},
$ibX:1,
gq8(){return this},
$C:"$1",
$R:1,
$D:null}
A.fT.prototype={$C:"$0",$R:0}
A.fU.prototype={$C:"$2",$R:2}
A.hW.prototype={}
A.hU.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.pH(s)+"'"}}
A.d3.prototype={
U(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.d3))return!1
return this.$_target===b.$_target&&this.a===b.a},
gX(a){return(A.ns(this.a)^A.bR(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.kz(this.a)+"'")}}
A.hI.prototype={
l(a){return"RuntimeError: "+this.a}}
A.id.prototype={
l(a){return"Assertion failed: "+A.h2(this.a)}}
A.bo.prototype={
gn(a){return this.a},
gbo(){return new A.aX(this,A.D(this).h("aX<1>"))},
gkg(a){var s=A.D(this)
return A.ke(new A.aX(this,s.h("aX<1>")),new A.k8(this),s.c,s.z[1])},
aj(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.jF(a)},
jF(a){var s=this.d
if(s==null)return!1
return this.dg(s[this.df(a)],a)>=0},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.jG(b)},
jG(a){var s,r,q=this.d
if(q==null)return null
s=q[this.df(a)]
r=this.dg(s,a)
if(r<0)return null
return s[r].b},
v(a,b,c){var s,r,q=this,p=A.D(q)
p.c.a(b)
p.z[1].a(c)
if(typeof b=="string"){s=q.b
q.hZ(s==null?q.b=q.fh():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.hZ(r==null?q.c=q.fh():r,b,c)}else q.jI(b,c)},
jI(a,b){var s,r,q,p,o=this,n=A.D(o)
n.c.a(a)
n.z[1].a(b)
s=o.d
if(s==null)s=o.d=o.fh()
r=o.df(a)
q=s[r]
if(q==null)s[r]=[o.f4(a,b)]
else{p=o.dg(q,a)
if(p>=0)q[p].b=b
else q.push(o.f4(a,b))}},
er(a,b){var s,r,q=this,p=A.D(q)
p.c.a(a)
p.h("2()").a(b)
if(q.aj(a)){s=q.i(0,a)
return s==null?p.z[1].a(s):s}r=b.$0()
q.v(0,a,r)
return r},
a3(a,b){var s=this
if(typeof b=="string")return s.iC(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.iC(s.c,b)
else return s.jH(b)},
jH(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.df(a)
r=n[s]
q=o.dg(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.iK(p)
if(r.length===0)delete n[s]
return p.b},
bc(a,b){var s,r,q=this
A.D(q).h("~(1,2)").a(b)
s=q.e
r=q.r
for(;s!=null;){b.$2(s.a,s.b)
if(r!==q.r)throw A.d(A.av(q))
s=s.c}},
hZ(a,b,c){var s,r=A.D(this)
r.c.a(b)
r.z[1].a(c)
s=a[b]
if(s==null)a[b]=this.f4(b,c)
else s.b=c},
iC(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.iK(s)
delete a[b]
return s.b},
i0(){this.r=this.r+1&1073741823},
f4(a,b){var s=this,r=A.D(s),q=new A.ka(r.c.a(a),r.z[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.i0()
return q},
iK(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.i0()},
df(a){return J.aL(a)&0x3fffffff},
dg(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.U(a[r].a,b))return r
return-1},
l(a){return A.mR(this)},
fh(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ik9:1}
A.k8.prototype={
$1(a){var s=this.a,r=A.D(s)
s=s.i(0,r.c.a(a))
return s==null?r.z[1].a(s):s},
$S(){return A.D(this.a).h("2(1)")}}
A.ka.prototype={}
A.aX.prototype={
gn(a){return this.a.a},
gah(a){return this.a.a===0},
gH(a){var s=this.a,r=new A.cL(s,s.r,this.$ti.h("cL<1>"))
r.c=s.e
return r},
F(a,b){return this.a.aj(b)}}
A.cL.prototype={
gu(){return this.d},
m(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.d(A.av(q))
s=r.c
if(s==null){r.si_(null)
return!1}else{r.si_(s.a)
r.c=s.c
return!0}},
si_(a){this.d=this.$ti.h("1?").a(a)},
$iV:1}
A.ml.prototype={
$1(a){return this.a(a)},
$S:42}
A.mm.prototype={
$2(a,b){return this.a(a,b)},
$S:45}
A.mn.prototype={
$1(a){return this.a(A.ay(a))},
$S:53}
A.cJ.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
giu(){var s=this,r=s.c
if(r!=null)return r
r=s.b
return s.c=A.mJ(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,!0)},
git(){var s=this,r=s.d
if(r!=null)return r
r=s.b
return s.d=A.mJ(s.a+"|()",r.multiline,!r.ignoreCase,r.unicode,r.dotAll,!0)},
jz(a){var s=this.b.exec(a)
if(s==null)return null
return new A.dA(s)},
fs(a,b,c){var s=b.length
if(c>s)throw A.d(A.a0(c,0,s,null,null))
return new A.ic(this,b,c)},
c7(a,b){return this.fs(a,b,0)},
mu(a,b){var s,r=this.giu()
if(r==null)r=t.K.a(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.dA(s)},
mt(a,b){var s,r=this.git()
if(r==null)r=t.K.a(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
if(0>=s.length)return A.c(s,-1)
if(s.pop()!=null)return null
return new A.dA(s)},
jL(a,b,c){if(c<0||c>b.length)throw A.d(A.a0(c,0,b.length,null,null))
return this.mt(b,c)},
$idl:1}
A.dA.prototype={
gS(a){return this.b.index},
gV(){var s=this.b
return s.index+s[0].length},
ghv(){return this.b.length-1},
hw(a){var s,r,q,p,o
t.L.a(a)
s=A.a([],t.D)
for(r=a.length,q=this.b,p=0;p<a.length;a.length===r||(0,A.e)(a),++p){o=A.a_(a[p])
if(!(o>=0&&o<q.length))return A.c(q,o)
B.a.p(s,q[o])}return s},
$idf:1,
$icS:1}
A.ic.prototype={
gH(a){return new A.dx(this.a,this.b,this.c)}}
A.dx.prototype={
gu(){var s=this.d
return s==null?t.lu.a(s):s},
m(){var s,r,q,p,o,n=this,m=n.b
if(m==null)return!1
s=n.c
r=m.length
if(s<=r){q=n.a
p=q.mu(m,s)
if(p!=null){n.d=p
o=p.gV()
if(p.b.index===o){if(q.b.unicode){s=n.c
q=s+1
if(q<r){s=B.b.J(m,s)
if(s>=55296&&s<=56319){s=B.b.J(m,q)
s=s>=56320&&s<=57343}else s=!1}else s=!1}else s=!1
o=(s?o+1:o)+1}n.c=o
return!0}}n.b=n.d=null
return!1},
$iV:1}
A.dt.prototype={
gV(){return this.a+this.c.length},
ghv(){return 0},
hw(a){var s,r,q,p,o
t.L.a(a)
s=A.a([],t.s)
for(r=a.length,q=this.c,p=0;p<a.length;a.length===r||(0,A.e)(a),++p){o=A.a_(a[p])
if(o!==0)A.M(A.kA(o,null))
B.a.p(s,q)}return s},
$idf:1,
gS(a){return this.a}}
A.iB.prototype={
gH(a){return new A.iC(this.a,this.b,this.c)},
gac(a){var s=this.b,r=this.a.indexOf(s,this.c)
if(r>=0)return new A.dt(r,s)
throw A.d(A.ah())}}
A.iC.prototype={
m(){var s,r,q=this,p=q.c,o=q.b,n=o.length,m=q.a,l=m.length
if(p+n>l){q.d=null
return!1}s=m.indexOf(o,p)
if(s<0){q.c=l+1
q.d=null
return!1}r=s+n
q.d=new A.dt(s,o)
q.c=r===q.c?r+1:r
return!0},
gu(){var s=this.d
s.toString
return s},
$iV:1}
A.ln.prototype={
iB(){var s=this.b
if(s===this)throw A.d(A.mM(this.a))
return s}}
A.ho.prototype={}
A.di.prototype={
gn(a){return a.length},
$idd:1}
A.es.prototype={
v(a,b,c){A.a_(c)
A.lU(b,a,a.length)
a[b]=c},
$iQ:1,
$ij:1,
$ik:1}
A.hn.prototype={
i(a,b){A.lU(b,a,a.length)
return a[b]}}
A.et.prototype={
i(a,b){A.lU(b,a,a.length)
return a[b]},
b8(a,b,c){return new Uint32Array(a.subarray(b,A.tb(b,c,a.length)))},
$irm:1}
A.cP.prototype={
gn(a){return a.length},
i(a,b){A.lU(b,a,a.length)
return a[b]},
$icP:1,
$icV:1}
A.f2.prototype={}
A.f3.prototype={}
A.bA.prototype={
h(a){return A.lN(v.typeUniverse,this,a)},
Z(a){return A.rU(v.typeUniverse,this,a)}}
A.iv.prototype={}
A.f8.prototype={
l(a){return A.b2(this.a,null)},
$ioo:1}
A.is.prototype={
l(a){return this.a}}
A.f9.prototype={$icn:1}
A.lj.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:18}
A.li.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:58}
A.lk.prototype={
$0(){this.a.$0()},
$S:3}
A.ll.prototype={
$0(){this.a.$0()},
$S:3}
A.lL.prototype={
m5(a,b){if(self.setTimeout!=null)self.setTimeout(A.dG(new A.lM(this,b),0),a)
else throw A.d(A.S("`setTimeout()` not found."))}}
A.lM.prototype={
$0(){this.b.$0()},
$S:1}
A.ie.prototype={
fD(a,b){var s,r=this,q=r.$ti
q.h("1/?").a(b)
if(b==null)q.c.a(b)
if(!r.b)r.a.i4(b)
else{s=r.a
if(q.h("bn<1>").b(b))s.i7(b)
else s.f9(q.c.a(b))}},
jb(a,b){var s=this.a
if(this.b)s.cp(a,b)
else s.mi(a,b)}}
A.lS.prototype={
$1(a){return this.a.$2(0,a)},
$S:91}
A.lT.prototype={
$2(a,b){this.a.$2(1,new A.e2(a,t.k.a(b)))},
$S:92}
A.m4.prototype={
$2(a,b){this.a(A.a_(a),b)},
$S:37}
A.dz.prototype={
l(a){return"IterationMarker("+this.b+", "+A.l(this.a)+")"}}
A.cs.prototype={
gu(){var s,r=this.c
if(r==null){s=this.b
return s==null?this.$ti.c.a(s):s}return r.gu()},
m(){var s,r,q,p,o,n,m=this
for(s=m.$ti.h("V<1>");!0;){r=m.c
if(r!=null)if(r.m())return!0
else m.siv(null)
q=function(a,b,c){var l,k=b
while(true)try{return a(k,l)}catch(j){l=j
k=c}}(m.a,0,1)
if(q instanceof A.dz){p=q.b
if(p===2){o=m.d
if(o==null||o.length===0){m.si3(null)
return!1}if(0>=o.length)return A.c(o,-1)
m.a=o.pop()
continue}else{r=q.a
if(p===3)throw r
else{n=s.a(J.I(r))
if(n instanceof A.cs){r=m.d
if(r==null)r=m.d=[]
B.a.p(r,m.a)
m.a=n.a
continue}else{m.siv(n)
continue}}}}else{m.si3(q)
return!0}}return!1},
si3(a){this.b=this.$ti.h("1?").a(a)},
siv(a){this.c=this.$ti.h("V<1>?").a(a)},
$iV:1}
A.f7.prototype={
gH(a){return new A.cs(this.a(),this.$ti.h("cs<1>"))}}
A.dO.prototype={
l(a){return A.l(this.a)},
$ia4:1,
gdD(){return this.b}}
A.ih.prototype={
jb(a,b){var s
A.fp(a,"error",t.K)
s=this.a
if((s.a&30)!==0)throw A.d(A.al("Future already completed"))
s.cp(a,b)}}
A.f6.prototype={
fD(a,b){var s,r=this.$ti
r.h("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.d(A.al("Future already completed"))
s.i8(r.h("1/").a(b))}}
A.cY.prototype={
oZ(a){if((this.c&15)!==6)return!0
return this.b.b.hf(t.iW.a(this.d),a.a,t.k4,t.K)},
oF(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ng.b(q))p=l.pH(q,m,a.b,o,n,t.k)
else p=l.hf(t.mq.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.do.b(A.bw(s))){if((r.c&1)!==0)throw A.d(A.a8("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.d(A.a8("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.au.prototype={
hg(a,b,c){var s,r,q,p=this.$ti
p.Z(c).h("1/(2)").a(a)
s=$.aa
if(s===B.l){if(b!=null&&!t.ng.b(b)&&!t.mq.b(b))throw A.d(A.mD(b,"onError",u.w))}else{c.h("@<0/>").Z(p.c).h("1(2)").a(a)
if(b!=null)b=A.tB(b,s)}r=new A.au(s,c.h("au<0>"))
q=b==null?1:3
this.f5(new A.cY(r,q,a,b,p.h("@<1>").Z(c).h("cY<1,2>")))
return r},
pP(a,b){return this.hg(a,null,b)},
iI(a,b,c){var s,r=this.$ti
r.Z(c).h("1/(2)").a(a)
s=new A.au($.aa,c.h("au<0>"))
this.f5(new A.cY(s,3,a,b,r.h("@<1>").Z(c).h("cY<1,2>")))
return s},
mE(a){this.a=this.a&1|16
this.c=a},
f8(a){this.a=a.a&30|this.a&1
this.c=a.c},
f5(a){var s,r=this,q=r.a
if(q<=3){a.a=t.f.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.j_.a(r.c)
if((s.a&24)===0){s.f5(a)
return}r.f8(s)}A.d_(null,null,r.b,t.M.a(new A.lr(r,a)))}},
iz(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.f.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.j_.a(m.c)
if((n.a&24)===0){n.iz(a)
return}m.f8(n)}l.a=m.dN(a)
A.d_(null,null,m.b,t.M.a(new A.lz(l,m)))}},
dM(){var s=t.f.a(this.c)
this.c=null
return this.dN(s)},
dN(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
i6(a){var s,r,q,p=this
p.a^=2
try{a.hg(new A.lv(p),new A.lw(p),t.P)}catch(q){s=A.bw(q)
r=A.cv(q)
A.un(new A.lx(p,s,r))}},
i8(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("bn<1>").b(a))if(q.b(a))A.lu(a,r)
else r.i6(a)
else{s=r.dM()
q.c.a(a)
r.a=8
r.c=a
A.dy(r,s)}},
f9(a){var s,r=this
r.$ti.c.a(a)
s=r.dM()
r.a=8
r.c=a
A.dy(r,s)},
cp(a,b){var s
t.k.a(b)
s=this.dM()
this.mE(A.j9(a,b))
A.dy(this,s)},
i4(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("bn<1>").b(a)){this.i7(a)
return}this.mj(s.c.a(a))},
mj(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.d_(null,null,s.b,t.M.a(new A.lt(s,a)))},
i7(a){var s=this,r=s.$ti
r.h("bn<1>").a(a)
if(r.b(a)){if((a.a&16)!==0){s.a^=2
A.d_(null,null,s.b,t.M.a(new A.ly(s,a)))}else A.lu(a,s)
return}s.i6(a)},
mi(a,b){this.a^=2
A.d_(null,null,this.b,t.M.a(new A.ls(this,a,b)))},
$ibn:1}
A.lr.prototype={
$0(){A.dy(this.a,this.b)},
$S:1}
A.lz.prototype={
$0(){A.dy(this.b,this.a.a)},
$S:1}
A.lv.prototype={
$1(a){var s,r,q,p=this.a
p.a^=2
try{p.f9(p.$ti.c.a(a))}catch(q){s=A.bw(q)
r=A.cv(q)
p.cp(s,r)}},
$S:18}
A.lw.prototype={
$2(a,b){this.a.cp(t.K.a(a),t.k.a(b))},
$S:40}
A.lx.prototype={
$0(){this.a.cp(this.b,this.c)},
$S:1}
A.lt.prototype={
$0(){this.a.f9(this.b)},
$S:1}
A.ly.prototype={
$0(){A.lu(this.b,this.a)},
$S:1}
A.ls.prototype={
$0(){this.a.cp(this.b,this.c)},
$S:1}
A.lC.prototype={
$0(){var s,r,q,p,o,n,m=this,l=null
try{q=m.a.a
l=q.b.b.k9(t.mY.a(q.d),t.z)}catch(p){s=A.bw(p)
r=A.cv(p)
q=m.c&&t.u.a(m.b.a.c).a===s
o=m.a
if(q)o.c=t.u.a(m.b.a.c)
else o.c=A.j9(s,r)
o.b=!0
return}if(l instanceof A.au&&(l.a&24)!==0){if((l.a&16)!==0){q=m.a
q.c=t.u.a(l.c)
q.b=!0}return}if(t.g7.b(l)){n=m.b.a
q=m.a
q.c=l.pP(new A.lD(n),t.z)
q.b=!1}},
$S:1}
A.lD.prototype={
$1(a){return this.a},
$S:41}
A.lB.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.hf(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.bw(l)
r=A.cv(l)
q=this.a
q.c=A.j9(s,r)
q.b=!0}},
$S:1}
A.lA.prototype={
$0(){var s,r,q,p,o,n,m=this
try{s=t.u.a(m.a.a.c)
p=m.b
if(p.a.oZ(s)&&p.a.e!=null){p.c=p.a.oF(s)
p.b=!1}}catch(o){r=A.bw(o)
q=A.cv(o)
p=t.u.a(m.a.a.c)
n=m.b
if(p.a===r)n.c=p
else n.c=A.j9(r,q)
n.b=!0}},
$S:1}
A.ig.prototype={}
A.eH.prototype={
gn(a){var s,r,q=this,p={},o=new A.au($.aa,t.hy)
p.a=0
s=q.$ti
r=s.h("~(1)?").a(new A.kM(p,q))
t.jE.a(new A.kN(p,o))
A.lp(q.a,q.b,r,!1,s.c)
return o}}
A.kM.prototype={
$1(a){this.b.$ti.c.a(a);++this.a.a},
$S(){return this.b.$ti.h("~(1)")}}
A.kN.prototype={
$0(){this.b.i8(this.a.a)},
$S:1}
A.eI.prototype={}
A.hV.prototype={}
A.iA.prototype={}
A.ff.prototype={$iow:1}
A.m2.prototype={
$0(){var s=this.a,r=this.b
A.fp(s,"error",t.K)
A.fp(r,"stackTrace",t.k)
A.qq(s,r)},
$S:1}
A.iz.prototype={
pI(a){var s,r,q
t.M.a(a)
try{if(B.l===$.aa){a.$0()
return}A.p3(null,null,this,a,t.q)}catch(q){s=A.bw(q)
r=A.cv(q)
A.m1(t.K.a(s),t.k.a(r))}},
pJ(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.l===$.aa){a.$1(b)
return}A.p4(null,null,this,a,b,t.q,c)}catch(q){s=A.bw(q)
r=A.cv(q)
A.m1(t.K.a(s),t.k.a(r))}},
j3(a){return new A.lJ(this,t.M.a(a))},
nv(a,b){return new A.lK(this,b.h("~(0)").a(a),b)},
k9(a,b){b.h("0()").a(a)
if($.aa===B.l)return a.$0()
return A.p3(null,null,this,a,b)},
hf(a,b,c,d){c.h("@<0>").Z(d).h("1(2)").a(a)
d.a(b)
if($.aa===B.l)return a.$1(b)
return A.p4(null,null,this,a,b,c,d)},
pH(a,b,c,d,e,f){d.h("@<0>").Z(e).Z(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.aa===B.l)return a.$2(b,c)
return A.tC(null,null,this,a,b,c,d,e,f)},
jY(a,b,c,d){return b.h("@<0>").Z(c).Z(d).h("1(2,3)").a(a)}}
A.lJ.prototype={
$0(){return this.a.pI(this.b)},
$S:1}
A.lK.prototype={
$1(a){var s=this.c
return this.a.pJ(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.f_.prototype={
i(a,b){if(!A.az(this.y.$1(b)))return null
return this.lL(b)},
v(a,b,c){var s=this.$ti
this.lN(s.c.a(b),s.z[1].a(c))},
aj(a){if(!A.az(this.y.$1(a)))return!1
return this.lK(a)},
a3(a,b){if(!A.az(this.y.$1(b)))return null
return this.lM(b)},
df(a){return this.x.$1(this.$ti.c.a(a))&1073741823},
dg(a,b){var s,r,q,p
if(a==null)return-1
s=a.length
for(r=this.$ti.c,q=this.w,p=0;p<s;++p)if(A.az(q.$2(r.a(a[p].a),r.a(b))))return p
return-1}}
A.lG.prototype={
$1(a){return this.a.b(a)},
$S:35}
A.c4.prototype={
iw(){return new A.c4(A.D(this).h("c4<1>"))},
gH(a){var s=this,r=new A.cZ(s,s.r,A.D(s).h("cZ<1>"))
r.c=s.e
return r},
gn(a){return this.a},
gah(a){return this.a===0},
gcD(a){return this.a!==0},
F(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.nF.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.nF.a(r[b])!=null}else return this.mo(b)},
mo(a){var s=this.d
if(s==null)return!1
return this.ic(s[this.i9(a)],a)>=0},
gac(a){var s=this.e
if(s==null)throw A.d(A.al("No elements"))
return A.D(this).c.a(s.a)},
gq(a){var s=this.f
if(s==null)throw A.d(A.al("No elements"))
return A.D(this).c.a(s.a)},
p(a,b){var s,r,q=this
A.D(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.i1(s==null?q.b=A.n3():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.i1(r==null?q.c=A.n3():r,b)}else return q.dF(b)},
dF(a){var s,r,q,p=this
A.D(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.n3()
r=p.i9(a)
q=s[r]
if(q==null)s[r]=[p.fi(a)]
else{if(p.ic(q,a)>=0)return!1
q.push(p.fi(a))}return!0},
i1(a,b){A.D(this).c.a(b)
if(t.nF.a(a[b])!=null)return!1
a[b]=this.fi(b)
return!0},
my(){this.r=this.r+1&1073741823},
fi(a){var s,r=this,q=new A.iw(A.D(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.my()
return q},
i9(a){return J.aL(a)&1073741823},
ic(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.U(a[r].a,b))return r
return-1}}
A.iw.prototype={}
A.cZ.prototype={
gu(){var s=this.d
return s==null?this.$ti.c.a(s):s},
m(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.d(A.av(q))
else if(r==null){s.scU(null)
return!1}else{s.scU(s.$ti.h("1?").a(r.a))
s.c=r.b
return!0}},
scU(a){this.d=this.$ti.h("1?").a(a)},
$iV:1}
A.ei.prototype={}
A.kb.prototype={
$2(a,b){this.a.v(0,this.b.a(a),this.c.a(b))},
$S:21}
A.em.prototype={$iQ:1,$ij:1,$ik:1}
A.w.prototype={
gH(a){return new A.O(a,this.gn(a),A.aA(a).h("O<w.E>"))},
af(a,b){return this.i(a,b)},
gah(a){return this.gn(a)===0},
gcD(a){return!this.gah(a)},
gac(a){if(this.gn(a)===0)throw A.d(A.ah())
return this.i(a,0)},
gq(a){if(this.gn(a)===0)throw A.d(A.ah())
return this.i(a,this.gn(a)-1)},
F(a,b){var s,r=this.gn(a)
for(s=0;s<r;++s){if(J.U(this.i(a,s),b))return!0
if(r!==this.gn(a))throw A.d(A.av(a))}return!1},
cA(a,b){var s,r
A.aA(a).h("A(w.E)").a(b)
s=this.gn(a)
for(r=0;r<s;++r){if(!A.az(b.$1(this.i(a,r))))return!1
if(s!==this.gn(a))throw A.d(A.av(a))}return!0},
b2(a,b){var s,r
A.aA(a).h("A(w.E)").a(b)
s=this.gn(a)
for(r=0;r<s;++r){if(A.az(b.$1(this.i(a,r))))return!0
if(s!==this.gn(a))throw A.d(A.av(a))}return!1},
eB(a,b){var s=A.aA(a)
return new A.am(a,s.h("A(w.E)").a(b),s.h("am<w.E>"))},
em(a,b,c){var s=A.aA(a)
return new A.J(a,s.Z(c).h("1(w.E)").a(b),s.h("@<w.E>").Z(c).h("J<1,2>"))},
b7(a,b){return A.bf(a,b,null,A.aA(a).h("w.E"))},
bs(a,b){var s,r,q,p,o=this
if(o.gah(a)){s=J.mI(0,A.aA(a).h("w.E"))
return s}r=o.i(a,0)
q=A.bQ(o.gn(a),r,!0,A.aA(a).h("w.E"))
for(p=1;p<o.gn(a);++p)B.a.v(q,p,o.i(a,p))
return q},
ap(a){return this.bs(a,!0)},
p(a,b){var s
A.aA(a).h("w.E").a(b)
s=this.gn(a)
this.sn(a,s+1)
this.v(a,s,b)},
M(a,b){var s,r
A.aA(a).h("j<w.E>").a(b)
s=this.gn(a)
for(r=J.I(b);r.m();){this.p(a,r.gu());++s}},
bV(a){this.sn(a,0)},
dm(a){var s,r=this
if(r.gn(a)===0)throw A.d(A.ah())
s=r.i(a,r.gn(a)-1)
r.sn(a,r.gn(a)-1)
return s},
cn(a,b){var s,r=A.aA(a)
r.h("i(w.E,w.E)?").a(b)
s=b==null?A.tP():b
A.oi(a,s,r.h("w.E"))},
dw(a,b,c){A.aK(b,c,this.gn(a))
return A.bf(a,b,c,A.aA(a).h("w.E"))},
oy(a,b,c,d){var s
A.aA(a).h("w.E?").a(d)
A.aK(b,c,this.gn(a))
for(s=b;s<c;++s)this.v(a,s,d)},
aN(a,b,c){var s
for(s=c;s<this.gn(a);++s)if(J.U(this.i(a,s),b))return s
return-1},
ak(a,b){return this.aN(a,b,0)},
l(a){return A.k4(a,"[","]")}}
A.ep.prototype={}
A.kc.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=r.a+=A.l(a)
r.a=s+": "
r.a+=A.l(b)},
$S:47}
A.cM.prototype={
bc(a,b){var s,r,q,p=A.D(this)
p.h("~(1,2)").a(b)
for(s=this.gbo(),s=s.gH(s),p=p.z[1];s.m();){r=s.gu()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
ge4(a){var s=this.gbo(),r=A.D(this).h("bq<1,2>"),q=A.D(s)
return A.ke(s,q.Z(r).h("1(j.E)").a(new A.kd(this)),q.h("j.E"),r)},
aj(a){return this.gbo().F(0,a)},
gn(a){var s=this.gbo()
return s.gn(s)},
l(a){return A.mR(this)},
$ib4:1}
A.kd.prototype={
$1(a){var s=this.a,r=A.D(s)
r.c.a(a)
s=s.i(0,a)
if(s==null)s=r.z[1].a(s)
return new A.bq(a,s,r.h("@<1>").Z(r.z[1]).h("bq<1,2>"))},
$S(){return A.D(this.a).h("bq<1,2>(1)")}}
A.en.prototype={
gH(a){var s=this
return new A.f1(s,s.c,s.d,s.b,s.$ti.h("f1<1>"))},
gah(a){return this.b===this.c},
gn(a){return(this.c-this.b&this.a.length-1)>>>0},
gac(a){var s,r=this,q=r.b
if(q===r.c)throw A.d(A.ah())
s=r.a
if(!(q<s.length))return A.c(s,q)
q=s[q]
return q==null?r.$ti.c.a(q):q},
gq(a){var s,r=this,q=r.b,p=r.c
if(q===p)throw A.d(A.ah())
q=r.a
s=q.length
p=(p-1&s-1)>>>0
if(!(p>=0&&p<s))return A.c(q,p)
p=q[p]
return p==null?r.$ti.c.a(p):p},
af(a,b){var s,r,q,p=this,o=p.gn(p)
if(0>b||b>=o)A.M(A.hf(b,p,"index",null,o))
s=p.a
r=s.length
q=(p.b+b&r-1)>>>0
if(!(q>=0&&q<r))return A.c(s,q)
q=s[q]
return q==null?p.$ti.c.a(q):q},
bV(a){var s=this,r=s.b
if(r!==s.c){for(;r!==s.c;r=(r+1&s.a.length-1)>>>0)B.a.v(s.a,r,null)
s.b=s.c=0;++s.d}},
l(a){return A.k4(this,"{","}")},
jZ(){var s,r,q=this,p=q.b
if(p===q.c)throw A.d(A.ah());++q.d
s=q.a
if(!(p<s.length))return A.c(s,p)
r=s[p]
if(r==null)r=q.$ti.c.a(r)
B.a.v(s,p,null)
q.b=(q.b+1&q.a.length-1)>>>0
return r},
dF(a){var s,r,q,p,o=this,n=o.$ti
n.c.a(a)
B.a.v(o.a,o.c,a)
s=o.c
r=o.a.length
s=(s+1&r-1)>>>0
o.c=s
if(o.b===s){q=A.bQ(r*2,null,!1,n.h("1?"))
n=o.a
s=o.b
p=n.length-s
B.a.dC(q,0,p,n,s)
B.a.dC(q,p,p+o.b,o.a,0)
o.b=0
o.c=o.a.length
o.smM(q)}++o.d},
smM(a){this.a=this.$ti.h("k<1?>").a(a)},
$ioa:1}
A.f1.prototype={
gu(){var s=this.e
return s==null?this.$ti.c.a(s):s},
m(){var s,r,q=this,p=q.a
if(q.c!==p.d)A.M(A.av(p))
s=q.d
if(s===q.b){q.scU(null)
return!1}r=p.a
if(!(s<r.length))return A.c(r,s)
q.scU(r[s])
q.d=(q.d+1&p.a.length-1)>>>0
return!0},
scU(a){this.e=this.$ti.h("1?").a(a)},
$iV:1}
A.b_.prototype={
gah(a){return this.gn(this)===0},
gcD(a){return this.gn(this)!==0},
l(a){return A.k4(this,"{","}")},
aC(a,b){var s,r=this.gH(this)
if(!r.m())return""
if(b===""){s=""
do s+=A.l(r.gu())
while(r.m())}else{s=""+A.l(r.gu())
for(;r.m();)s=s+b+A.l(r.gu())}return s.charCodeAt(0)==0?s:s},
b7(a,b){return A.oh(this,b,A.D(this).h("b_.E"))},
gac(a){var s=this.gH(this)
if(!s.m())throw A.d(A.ah())
return s.gu()},
gq(a){var s,r=this.gH(this)
if(!r.m())throw A.d(A.ah())
do s=r.gu()
while(r.m())
return s},
af(a,b){var s,r,q,p="index"
A.fp(b,p,t.S)
A.bd(b,p)
for(s=this.gH(this),r=0;s.m();){q=s.gu()
if(b===r)return q;++r}throw A.d(A.hf(b,this,p,null,r))}}
A.eC.prototype={$iQ:1,$ij:1,$ibB:1}
A.dB.prototype={
oQ(a,b){var s,r,q=this.iw()
for(s=this.gH(this);s.m();){r=s.gu()
if(b.F(0,r))q.p(0,r)}return q},
$iQ:1,
$ij:1,
$ibB:1}
A.iH.prototype={}
A.fc.prototype={
iw(){return A.mO(this.$ti.c)},
gH(a){var s=this.a.gbo()
return s.gH(s)},
gn(a){var s=this.a
return s.gn(s)}}
A.f0.prototype={}
A.f4.prototype={}
A.fh.prototype={}
A.fi.prototype={}
A.l0.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:20}
A.l_.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:20}
A.fJ.prototype={
e0(a,b){var s
t.L.a(b)
s=B.aD.fG(b)
return s}}
A.iE.prototype={
fG(a){var s,r,q,p
t.L.a(a)
s=A.aK(0,null,a.gn(a))
for(r=0<s,q=~this.b>>>0;r;){p=a.i(0,0)
p.kl(0,q)
if(!this.a)throw A.d(A.aI("Invalid value in input: "+A.l(p),null,null))
return this.mp(a,0,s)}return A.ae(a,0,s)},
mp(a,b,c){var s,r,q
t.L.a(a)
for(s=~this.b>>>0,r=b,q="";r<c;++r){a.i(0,r).kl(0,s)
q+=A.bc(65533)}return q.charCodeAt(0)==0?q:q}}
A.fK.prototype={}
A.fM.prototype={
p6(a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="Invalid base64 encoding length "
a3=A.aK(a2,a3,a1.length)
s=$.pY()
for(r=s.length,q=a2,p=q,o=null,n=-1,m=-1,l=0;q<a3;q=k){k=q+1
j=B.b.E(a1,q)
if(j===37){i=k+2
if(i<=a3){h=A.mk(B.b.E(a1,k))
g=A.mk(B.b.E(a1,k+1))
f=h*16+g-(g&256)
if(f===37)f=-1
k=i}else f=-1}else f=j
if(0<=f&&f<=127){if(!(f>=0&&f<r))return A.c(s,f)
e=s[f]
if(e>=0){f=B.b.J("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e)
if(f===j)continue
j=f}else{if(e===-1){if(n<0){d=o==null?null:o.a.length
if(d==null)d=0
n=d+(q-p)
m=q}++l
if(j===61)continue}j=f}if(e!==-2){if(o==null){o=new A.a5("")
d=o}else d=o
c=d.a+=B.b.B(a1,p,q)
d.a=c+A.bc(j)
p=k
continue}}throw A.d(A.aI("Invalid base64 data",a1,q))}if(o!=null){r=o.a+=B.b.B(a1,p,a3)
d=r.length
if(n>=0)A.nK(a1,m,a3,n,l,d)
else{b=B.d.W(d-1,4)+1
if(b===1)throw A.d(A.aI(a0,a1,a3))
for(;b<4;){r+="="
o.a=r;++b}}r=o.a
return B.b.ci(a1,a2,a3,r.charCodeAt(0)==0?r:r)}a=a3-a2
if(n>=0)A.nK(a1,m,a3,n,l,a)
else{b=B.d.W(a,4)
if(b===1)throw A.d(A.aI(a0,a1,a3))
if(b>1)a1=B.b.ci(a1,a3,a3,b===2?"==":"=")}return a1}}
A.fN.prototype={}
A.cE.prototype={}
A.cF.prototype={}
A.h1.prototype={}
A.i6.prototype={
e0(a,b){t.L.a(b)
return B.e5.fG(b)}}
A.i7.prototype={
fG(a){var s,r
t.L.a(a)
s=this.a
r=A.rp(s,a,0,null)
if(r!=null)return r
return new A.lP(s).nV(a,0,null,!0)}}
A.lP.prototype={
nV(a,b,c,d){var s,r,q,p,o,n=this
t.L.a(a)
s=A.aK(b,c,J.N(a))
if(b===s)return""
r=A.t5(a,b,s)
q=n.fa(r,0,s-b,!0)
p=n.b
if((p&1)!==0){o=A.t6(p)
n.b=0
throw A.d(A.aI(o,a,b+n.c))}return q},
fa(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.d.aR(b+c,2)
r=q.fa(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.fa(a,s,c,d)}return q.nY(a,b,c,d)},
nY(a,b,c,d){var s,r,q,p,o,n,m,l,k=this,j=65533,i=k.b,h=k.c,g=new A.a5(""),f=b+1,e=a.length
if(!(b>=0&&b<e))return A.c(a,b)
s=a[b]
$label0$0:for(r=k.a;!0;){for(;!0;f=o){q=B.b.E("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",s)&31
h=i<=32?s&61694>>>q:(s&63|h<<6)>>>0
i=B.b.E(" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",i+q)
if(i===0){g.a+=A.bc(h)
if(f===c)break $label0$0
break}else if((i&1)!==0){if(r)switch(i){case 69:case 67:g.a+=A.bc(j)
break
case 65:g.a+=A.bc(j);--f
break
default:p=g.a+=A.bc(j)
g.a=p+A.bc(j)
break}else{k.b=i
k.c=f-1
return""}i=0}if(f===c)break $label0$0
o=f+1
if(!(f>=0&&f<e))return A.c(a,f)
s=a[f]}o=f+1
if(!(f>=0&&f<e))return A.c(a,f)
s=a[f]
if(s<128){while(!0){if(!(o<c)){n=c
break}m=o+1
if(!(o>=0&&o<e))return A.c(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-f<20)for(l=f;l<n;++l){if(!(l<e))return A.c(a,l)
g.a+=A.bc(a[l])}else g.a+=A.ae(a,f,n)
if(n===c)break $label0$0
f=o}else f=o}if(d&&i>32)if(r)g.a+=A.bc(j)
else{k.b=77
k.c=c
return""}k.b=i
k.c=h
e=g.a
return e.charCodeAt(0)==0?e:e}}
A.lo.prototype={}
A.a4.prototype={
gdD(){return A.cv(this.$thrownJsError)}}
A.dN.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.h2(s)
return"Assertion failed"}}
A.cn.prototype={}
A.hr.prototype={
l(a){return"Throw of null."}}
A.bM.prototype={
gfe(){return"Invalid argument"+(!this.a?"(s)":"")},
gfd(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.l(p),n=s.gfe()+q+o
if(!s.a)return n
return n+s.gfd()+": "+A.h2(s.b)}}
A.dp.prototype={
gfe(){return"RangeError"},
gfd(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.l(q):""
else if(q==null)s=": Not greater than or equal to "+A.l(r)
else if(q>r)s=": Not in inclusive range "+A.l(r)+".."+A.l(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.l(r)
return s}}
A.he.prototype={
gfe(){return"RangeError"},
gfd(){if(A.a_(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gn(a){return this.f}}
A.i3.prototype={
l(a){return"Unsupported operation: "+this.a}}
A.eQ.prototype={
l(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.ck.prototype={
l(a){return"Bad state: "+this.a}}
A.fW.prototype={
l(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.h2(s)+"."}}
A.hw.prototype={
l(a){return"Out of Memory"},
gdD(){return null},
$ia4:1}
A.eG.prototype={
l(a){return"Stack Overflow"},
gdD(){return null},
$ia4:1}
A.fY.prototype={
l(a){return"Reading static variable '"+this.a+"' during its initialization"}}
A.it.prototype={
l(a){return"Exception: "+this.a},
$ibW:1}
A.e6.prototype={
l(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.b.B(e,0,75)+"..."
return g+"\n"+e}for(r=1,q=0,p=!1,o=0;o<f;++o){n=B.b.E(e,o)
if(n===10){if(q!==o||!p)++r
q=o+1
p=!1}else if(n===13){++r
q=o+1
p=!0}}g=r>1?g+(" (at line "+r+", character "+(f-q+1)+")\n"):g+(" (at character "+(f+1)+")\n")
m=e.length
for(o=f;o<m;++o){n=B.b.J(e,o)
if(n===10||n===13){m=o
break}}if(m-q>78)if(f-q<75){l=q+75
k=q
j=""
i="..."}else{if(m-f<75){k=m-75
l=m
i=""}else{k=f-36
l=f+36
i="..."}j="..."}else{l=m
k=q
j=""
i=""}return g+j+B.b.B(e,k,l)+i+"\n"+B.b.A(" ",f-k+j.length)+"^\n"}else return f!=null?g+(" (at offset "+A.l(f)+")"):g},
$ibW:1}
A.j.prototype={
em(a,b,c){var s=A.D(this)
return A.ke(this,s.Z(c).h("1(j.E)").a(b),s.h("j.E"),c)},
eB(a,b){var s=A.D(this)
return new A.am(this,s.h("A(j.E)").a(b),s.h("am<j.E>"))},
cA(a,b){var s
A.D(this).h("A(j.E)").a(b)
for(s=this.gH(this);s.m();)if(!A.az(b.$1(s.gu())))return!1
return!0},
b2(a,b){var s
A.D(this).h("A(j.E)").a(b)
for(s=this.gH(this);s.m();)if(A.az(b.$1(s.gu())))return!0
return!1},
bs(a,b){return A.h(this,b,A.D(this).h("j.E"))},
ap(a){return this.bs(a,!0)},
gn(a){var s,r=this.gH(this)
for(s=0;r.m();)++s
return s},
gah(a){return!this.gH(this).m()},
gcD(a){return!this.gah(this)},
b7(a,b){return A.oh(this,b,A.D(this).h("j.E"))},
gac(a){var s=this.gH(this)
if(!s.m())throw A.d(A.ah())
return s.gu()},
gq(a){var s,r=this.gH(this)
if(!r.m())throw A.d(A.ah())
do s=r.gu()
while(r.m())
return s},
af(a,b){var s,r,q
A.bd(b,"index")
for(s=this.gH(this),r=0;s.m();){q=s.gu()
if(b===r)return q;++r}throw A.d(A.hf(b,this,"index",null,r))},
l(a){return A.qy(this,"(",")")}}
A.V.prototype={}
A.bq.prototype={
l(a){return"MapEntry("+A.l(this.a)+": "+A.l(this.b)+")"}}
A.aq.prototype={
gX(a){return A.K.prototype.gX.call(this,this)},
l(a){return"null"}}
A.K.prototype={$iK:1,
U(a,b){return this===b},
gX(a){return A.bR(this)},
l(a){return"Instance of '"+A.kz(this)+"'"},
toString(){return this.l(this)}}
A.iD.prototype={
l(a){return""},
$ici:1}
A.hH.prototype={
gH(a){return new A.hG(this.a)},
gq(a){var s,r,q=this.a,p=q.length
if(p===0)throw A.d(A.al("No elements."))
s=B.b.J(q,p-1)
if((s&64512)===56320&&p>1){r=B.b.J(q,p-2)
if((r&64512)===55296)return A.oW(r,s)}return s}}
A.hG.prototype={
gu(){return this.d},
m(){var s,r,q,p=this,o=p.b=p.c,n=p.a,m=n.length
if(o===m){p.d=-1
return!1}s=B.b.E(n,o)
r=o+1
if((s&64512)===55296&&r<m){q=B.b.E(n,r)
if((q&64512)===56320){p.c=r+1
p.d=A.oW(s,q)
return!0}}p.c=r
p.d=s
return!0},
$iV:1}
A.a5.prototype={
gn(a){return this.a.length},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$irc:1}
A.kX.prototype={
$2(a,b){throw A.d(A.aI("Illegal IPv4 address, "+a,this.a,b))},
$S:54}
A.kY.prototype={
$2(a,b){throw A.d(A.aI("Illegal IPv6 address, "+a,this.a,b))},
$S:55}
A.kZ.prototype={
$2(a,b){var s
if(b-a>4)this.a.$2("an IPv6 part can only contain a maximum of 4 hex digits",a)
s=A.cw(B.b.B(this.b,a,b),16)
if(s<0||s>65535)this.a.$2("each part must be in the range of `0x0..0xFFFF`",a)
return s},
$S:14}
A.fd.prototype={
giG(){var s,r,q,p,o=this,n=o.w
if(n===$){s=o.a
r=s.length!==0?""+s+":":""
q=o.c
p=q==null
if(!p||s==="file"){s=r+"//"
r=o.b
if(r.length!==0)s=s+r+"@"
if(!p)s+=q
r=o.d
if(r!=null)s=s+":"+A.l(r)}else s=r
s+=o.e
r=o.f
if(r!=null)s=s+"?"+r
r=o.r
if(r!=null)s=s+"#"+r
n!==$&&A.F("_text")
n=o.w=s.charCodeAt(0)==0?s:s}return n},
gh9(){var s,r,q=this,p=q.x
if(p===$){s=q.e
if(s.length!==0&&B.b.E(s,0)===47)s=B.b.ar(s,1)
r=s.length===0?B.r:A.o4(new A.J(A.a(s.split("/"),t.s),t.f6.a(A.tU()),t.iZ),t.N)
q.x!==$&&A.F("pathSegments")
q.smf(r)
p=r}return p},
gX(a){var s,r=this,q=r.y
if(q===$){s=B.b.gX(r.giG())
r.y!==$&&A.F("hashCode")
r.y=s
q=s}return q},
gdr(){return this.b},
gbn(a){var s=this.c
if(s==null)return""
if(B.b.a_(s,"["))return B.b.B(s,1,s.length-1)
return s},
gcG(a){var s=this.d
return s==null?A.oI(this.a):s},
gcg(){var s=this.f
return s==null?"":s},
geg(){var s=this.r
return s==null?"":s},
oS(a){var s=this.a
if(a.length!==s.length)return!1
return A.ta(a,s,0)>=0},
is(a,b){var s,r,q,p,o,n
for(s=0,r=0;B.b.a9(b,"../",r);){r+=3;++s}q=B.b.h1(a,"/")
while(!0){if(!(q>0&&s>0))break
p=B.b.el(a,"/",q-1)
if(p<0)break
o=q-p
n=o!==2
if(!n||o===3)if(B.b.J(a,p+1)===46)n=!n||B.b.J(a,p+2)===46
else n=!1
else n=!1
if(n)break;--s
q=p}return B.b.ci(a,q+1,null,B.b.ar(b,r-3*s))},
k7(a){return this.dn(A.n_(a))},
dn(a){var s,r,q,p,o,n,m,l,k,j,i=this,h=null
if(a.gaP().length!==0){s=a.gaP()
if(a.gdd()){r=a.gdr()
q=a.gbn(a)
p=a.gde()?a.gcG(a):h}else{p=h
q=p
r=""}o=A.c5(a.gaO(a))
n=a.gcB()?a.gcg():h}else{s=i.a
if(a.gdd()){r=a.gdr()
q=a.gbn(a)
p=A.n9(a.gde()?a.gcG(a):h,s)
o=A.c5(a.gaO(a))
n=a.gcB()?a.gcg():h}else{r=i.b
q=i.c
p=i.d
o=i.e
if(a.gaO(a)==="")n=a.gcB()?a.gcg():i.f
else{m=A.t4(i,o)
if(m>0){l=B.b.B(o,0,m)
o=a.geh()?l+A.c5(a.gaO(a)):l+A.c5(i.is(B.b.ar(o,l.length),a.gaO(a)))}else if(a.geh())o=A.c5(a.gaO(a))
else if(o.length===0)if(q==null)o=s.length===0?a.gaO(a):A.c5(a.gaO(a))
else o=A.c5("/"+a.gaO(a))
else{k=i.is(o,a.gaO(a))
j=s.length===0
if(!j||q!=null||B.b.a_(o,"/"))o=A.c5(k)
else o=A.nb(k,!j||q!=null)}n=a.gcB()?a.gcg():h}}}return A.lO(s,r,q,p,o,n,a.gfY()?a.geg():h)},
gdd(){return this.c!=null},
gde(){return this.d!=null},
gcB(){return this.f!=null},
gfY(){return this.r!=null},
geh(){return B.b.a_(this.e,"/")},
hh(){var s,r=this,q=r.a
if(q!==""&&q!=="file")throw A.d(A.S("Cannot extract a file path from a "+q+" URI"))
q=r.f
if((q==null?"":q)!=="")throw A.d(A.S(u.z))
q=r.r
if((q==null?"":q)!=="")throw A.d(A.S(u.U))
q=$.nz()
if(A.az(q))q=A.oT(r)
else{if(r.c!=null&&r.gbn(r)!=="")A.M(A.S(u.Q))
s=r.gh9()
A.rY(s,!1)
q=A.kO(B.b.a_(r.e,"/")?""+"/":"",s,"/")
q=q.charCodeAt(0)==0?q:q}return q},
l(a){return this.giG()},
U(a,b){var s,r,q=this
if(b==null)return!1
if(q===b)return!0
if(t.jJ.b(b))if(q.a===b.gaP())if(q.c!=null===b.gdd())if(q.b===b.gdr())if(q.gbn(q)===b.gbn(b))if(q.gcG(q)===b.gcG(b))if(q.e===b.gaO(b)){s=q.f
r=s==null
if(!r===b.gcB()){if(r)s=""
if(s===b.gcg()){s=q.r
r=s==null
if(!r===b.gfY()){if(r)s=""
s=s===b.geg()}else s=!1}else s=!1}else s=!1}else s=!1
else s=!1
else s=!1
else s=!1
else s=!1
else s=!1
else s=!1
return s},
smf(a){this.x=t.I.a(a)},
$ii4:1,
gaP(){return this.a},
gaO(a){return this.e}}
A.kW.prototype={
gkf(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.c(m,0)
s=o.a
m=m[0]+1
r=B.b.aN(s,"?",m)
q=s.length
if(r>=0){p=A.fe(s,r+1,q,B.G,!1,!1)
q=r}else p=n
m=o.c=new A.ij("data","",n,n,A.fe(s,m,q,B.aj,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.c(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.lW.prototype={
$2(a,b){var s=this.a
if(!(a<s.length))return A.c(s,a)
s=s[a]
B.cN.oy(s,0,96,b)
return s},
$S:57}
A.lX.prototype={
$3(a,b,c){var s,r,q
for(s=b.length,r=0;r<s;++r){q=B.b.E(b,r)^96
if(!(q<96))return A.c(a,q)
a[q]=c}},
$S:24}
A.lY.prototype={
$3(a,b,c){var s,r,q
for(s=B.b.E(b,0),r=B.b.E(b,1);s<=r;++s){q=(s^96)>>>0
if(!(q<96))return A.c(a,q)
a[q]=c}},
$S:24}
A.bu.prototype={
gdd(){return this.c>0},
gde(){return this.c>0&&this.d+1<this.e},
gcB(){return this.f<this.r},
gfY(){return this.r<this.a.length},
geh(){return B.b.a9(this.a,"/",this.e)},
gaP(){var s=this.w
return s==null?this.w=this.mn():s},
mn(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.b.a_(r.a,"http"))return"http"
if(q===5&&B.b.a_(r.a,"https"))return"https"
if(s&&B.b.a_(r.a,"file"))return"file"
if(q===7&&B.b.a_(r.a,"package"))return"package"
return B.b.B(r.a,0,q)},
gdr(){var s=this.c,r=this.b+3
return s>r?B.b.B(this.a,r,s-1):""},
gbn(a){var s=this.c
return s>0?B.b.B(this.a,s,this.d):""},
gcG(a){var s,r=this
if(r.gde())return A.cw(B.b.B(r.a,r.d+1,r.e),null)
s=r.b
if(s===4&&B.b.a_(r.a,"http"))return 80
if(s===5&&B.b.a_(r.a,"https"))return 443
return 0},
gaO(a){return B.b.B(this.a,this.e,this.f)},
gcg(){var s=this.f,r=this.r
return s<r?B.b.B(this.a,s+1,r):""},
geg(){var s=this.r,r=this.a
return s<r.length?B.b.ar(r,s+1):""},
gh9(){var s,r,q=this.e,p=this.f,o=this.a
if(B.b.a9(o,"/",q))++q
if(q===p)return B.r
s=A.a([],t.s)
for(r=q;r<p;++r)if(B.b.J(o,r)===47){B.a.p(s,B.b.B(o,q,r))
q=r+1}B.a.p(s,B.b.B(o,q,p))
return A.o4(s,t.N)},
il(a){var s=this.d+1
return s+a.length===this.e&&B.b.a9(this.a,a,s)},
py(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.bu(B.b.B(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
k7(a){return this.dn(A.n_(a))},
dn(a){if(a instanceof A.bu)return this.mG(this,a)
return this.iJ().dn(a)},
mG(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.b.a_(a.a,"file"))p=b.e!==b.f
else if(q&&B.b.a_(a.a,"http"))p=!b.il("80")
else p=!(r===5&&B.b.a_(a.a,"https"))||!b.il("443")
if(p){o=r+1
return new A.bu(B.b.B(a.a,0,o)+B.b.ar(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.iJ().dn(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.bu(B.b.B(a.a,0,r)+B.b.ar(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.bu(B.b.B(a.a,0,r)+B.b.ar(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.py()}s=b.a
if(B.b.a9(s,"/",n)){m=a.e
l=A.oC(this)
k=l>0?l:m
o=k-n
return new A.bu(B.b.B(a.a,0,k)+B.b.ar(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){for(;B.b.a9(s,"../",n);)n+=3
o=j-n+1
return new A.bu(B.b.B(a.a,0,j)+"/"+B.b.ar(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.oC(this)
if(l>=0)g=l
else for(g=j;B.b.a9(h,"../",g);)g+=3
f=0
while(!0){e=n+3
if(!(e<=c&&B.b.a9(s,"../",n)))break;++f
n=e}for(d="";i>g;){--i
if(B.b.J(h,i)===47){if(f===0){d="/"
break}--f
d="/"}}if(i===g&&a.b<=0&&!B.b.a9(h,"/",j)){n-=f*3
d=""}o=i-n+d.length
return new A.bu(B.b.B(h,0,i)+d+B.b.ar(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)},
hh(){var s,r,q=this,p=q.b
if(p>=0){s=!(p===4&&B.b.a_(q.a,"file"))
p=s}else p=!1
if(p)throw A.d(A.S("Cannot extract a file path from a "+q.gaP()+" URI"))
p=q.f
s=q.a
if(p<s.length){if(p<q.r)throw A.d(A.S(u.z))
throw A.d(A.S(u.U))}r=$.nz()
if(A.az(r))p=A.oT(q)
else{if(q.c<q.d)A.M(A.S(u.Q))
p=B.b.B(s,q.e,p)}return p},
gX(a){var s=this.x
return s==null?this.x=B.b.gX(this.a):s},
U(a,b){if(b==null)return!1
if(this===b)return!0
return t.jJ.b(b)&&this.a===b.l(0)},
iJ(){var s=this,r=null,q=s.gaP(),p=s.gdr(),o=s.c>0?s.gbn(s):r,n=s.gde()?s.gcG(s):r,m=s.a,l=s.f,k=B.b.B(m,s.e,l),j=s.r
l=l<j?s.gcg():r
return A.lO(q,p,o,n,k,l,j<m.length?s.geg():r)},
l(a){return this.a},
$ii4:1}
A.ij.prototype={}
A.x.prototype={}
A.fE.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.fH.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.cC.prototype={
sbm(a,b){a.height=b},
sq2(a,b){a.width=b},
$icC:1}
A.dR.prototype={
sfW(a,b){a.fillStyle=b},
shP(a,b){a.strokeStyle=b},
lE(a,b){return a.stroke(b)},
$idR:1}
A.bN.prototype={
gn(a){return a.length}}
A.jl.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.dW.prototype={
l(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return"Rectangle ("+A.l(p)+", "+A.l(s)+") "+A.l(r)+" x "+A.l(q)},
U(a,b){var s,r
if(b==null)return!1
if(t.mx.b(b)){s=a.left
s.toString
r=b.left
r.toString
if(s===r){s=a.top
s.toString
r=b.top
r.toString
if(s===r){s=a.width
s.toString
r=b.width
r.toString
if(s===r){s=a.height
s.toString
r=b.height
r.toString
r=s===r
s=r}else s=!1}else s=!1}else s=!1}else s=!1
return s},
gX(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.cQ(p,s,r,q)},
$imU:1}
A.r.prototype={
l(a){var s=a.localName
s.toString
return s},
$ir:1}
A.t.prototype={$it:1}
A.aW.prototype={
mh(a,b,c,d){return a.addEventListener(b,A.dG(t.X.a(c),1),!1)},
mC(a,b,c,d){return a.removeEventListener(b,A.dG(t.X.a(c),1),!1)},
$iaW:1}
A.h6.prototype={
gn(a){return a.length}}
A.bb.prototype={$ibb:1}
A.b5.prototype={
l(a){var s=a.nodeValue
return s==null?this.lJ(a):s}}
A.hy.prototype={$ihy:1}
A.hK.prototype={
gn(a){return a.length}}
A.bD.prototype={}
A.dw.prototype={
gne(a){var s=new A.au($.aa,t.iS),r=t.hv.a(new A.lh(new A.f6(s,t.fD)))
this.ms(a)
r=A.p9(r,t.p)
r.toString
this.mD(a,r)
return s},
mD(a,b){var s=a.requestAnimationFrame(A.dG(t.hv.a(b),1))
s.toString
return s},
ms(a){var s=!!(a.requestAnimationFrame&&a.cancelAnimationFrame)
s.toString
if(s)return;(function(b){var r=["ms","moz","webkit","o"]
for(var q=0;q<r.length&&!b.requestAnimationFrame;++q){b.requestAnimationFrame=b[r[q]+"RequestAnimationFrame"]
b.cancelAnimationFrame=b[r[q]+"CancelAnimationFrame"]||b[r[q]+"CancelRequestAnimationFrame"]}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)}}
A.lh.prototype={
$1(a){this.a.fD(0,A.lR(a))},
$S:64}
A.eV.prototype={
l(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return"Rectangle ("+A.l(p)+", "+A.l(s)+") "+A.l(r)+" x "+A.l(q)},
U(a,b){var s,r
if(b==null)return!1
if(t.mx.b(b)){s=a.left
s.toString
r=b.left
r.toString
if(s===r){s=a.top
s.toString
r=b.top
r.toString
if(s===r){s=a.width
s.toString
r=b.width
r.toString
if(s===r){s=a.height
s.toString
r=b.height
r.toString
r=s===r
s=r}else s=!1}else s=!1}else s=!1}else s=!1
return s},
gX(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.cQ(p,s,r,q)}}
A.mF.prototype={}
A.eX.prototype={}
A.ip.prototype={}
A.eY.prototype={
nz(){var s,r=this,q=r.b
if(q==null)return $.nB()
s=r.d
if(s!=null)J.q2(q,r.c,t.X.a(s),!1)
r.b=null
r.smA(null)
return $.nB()},
smA(a){this.d=t.X.a(a)}}
A.lq.prototype={
$1(a){return this.a.$1(t.fq.a(a))},
$S:66}
A.iy.prototype={
m4(a){var s,r,q,p,o,n,m,l=this,k=4294967296
do{s=a>>>0
a=B.d.aR(a-s,k)
r=a>>>0
a=B.d.aR(a-r,k)
q=(~s>>>0)+(s<<21>>>0)
p=q>>>0
r=(~r>>>0)+((r<<21|s>>>11)>>>0)+B.d.aR(q-p,k)>>>0
q=((p^(p>>>24|r<<8))>>>0)*265
s=q>>>0
r=((r^r>>>24)>>>0)*265+B.d.aR(q-s,k)>>>0
q=((s^(s>>>14|r<<18))>>>0)*21
s=q>>>0
r=((r^r>>>14)>>>0)*21+B.d.aR(q-s,k)>>>0
s=(s^(s>>>28|r<<4))>>>0
r=(r^r>>>28)>>>0
q=(s<<31>>>0)+s
p=q>>>0
o=B.d.aR(q-p,k)
q=l.a*1037
n=l.a=q>>>0
m=l.b*1037+B.d.aR(q-n,k)>>>0
l.b=m
n=(n^p)>>>0
l.a=n
o=(m^r+((r<<31|s>>>1)>>>0)+o>>>0)>>>0
l.b=o}while(a!==0)
if(o===0&&n===0)l.a=23063
l.dL()
l.dL()
l.dL()
l.dL()},
dL(){var s=this,r=s.a,q=4294901760*r,p=q>>>0,o=55905*r,n=o>>>0,m=n+p+s.b
r=m>>>0
s.a=r
s.b=B.d.aR(o-n+(q-p)+(m-r),4294967296)>>>0},
$iqX:1}
A.cR.prototype={
l(a){return"Point("+A.l(this.a)+", "+A.l(this.b)+")"},
U(a,b){if(b==null)return!1
return b instanceof A.cR&&this.a===b.a&&this.b===b.b},
gX(a){return A.ok(B.h.gX(this.a),B.h.gX(this.b),0)}}
A.ai.prototype={
gH(a){var s=this.$ti,r=J.q(this.a,new A.k5(this),s.h("V<1>"))
return new A.eZ(A.h(r,!1,r.$ti.h("B.E")),s.h("eZ<1>"))}}
A.k5.prototype={
$1(a){return J.I(this.a.$ti.h("j<1>").a(a))},
$S(){return this.a.$ti.h("V<1>(j<1>)")}}
A.eZ.prototype={
m(){var s,r,q,p=this,o=p.a
if(o.length===0)return!1
for(s=0;r=o.length,s<r;++s)if(!o[s].m()){p.sio(null)
return!1}if(r>4294967295)A.M(A.a0(r,0,4294967295,"length",null))
q=J.nZ(new Array(r),p.$ti.c)
for(s=0;s<r;++s){if(!(s<o.length))return A.c(o,s)
q[s]=o[s].gu()}p.sio(q)
return!0},
gu(){var s=this.b
return s==null?A.M(A.al("No element")):s},
sio(a){this.b=this.$ti.h("k<1>?").a(a)},
$iV:1}
A.lI.prototype={
bz(){var s=this,r=s.d
r===$&&A.b("_peekToken")
s.c=r
s.d=t.U.a(s.a.ao(!1))
return r},
ir(a,b){var s=this,r=s.d
r===$&&A.b("_peekToken")
if(r.a===a){s.c=r
s.d=t.U.a(s.a.ao(!1))
return!0}else return!1},
dK(a){return this.ir(a,!1)},
aQ(a){if(!this.ir(a,!1))this.fc(A.om(a))},
fc(a){var s,r=this.bz(),q=null
try{q="expected "+a+", but found "+A.l(r)}catch(s){q="parsing error expected "+a}this.cr(q,r.b)},
cr(a,b){$.fj.iB().oh(0,a,b)},
aa(a){var s=this.c
if(s==null||s.b.aA(0,a)<0)return a
return a.oj(0,this.c.b)},
pi(){var s,r,q=this,p=A.a([],t.b7),o=q.d
o===$&&A.b("_peekToken")
s=q.a
s.e=!0
do{r=q.jV()
if(r!=null)B.a.p(p,r)}while(q.dK(19))
s.e=!1
if(p.length!==0)return new A.hL(p,q.aa(o.b))
return null},
jV(){var s,r=A.a([],t.iM),q=this.d
q===$&&A.b("_peekToken")
for(;!0;){s=this.ln(r.length===0)
if(s!=null)B.a.p(r,s)
else break}if(r.length===0)return null
return new A.ch(r,this.aa(q.b))},
pf(){var s,r,q,p,o,n,m=this.jV()
if(m!=null)for(s=m.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q]
if(p.b!==513){o=$.fj.b
if(o==$.fj)A.M(A.mM($.fj.a))
n=new A.dg(B.J,"compound selector can not contain combinator",p.a,o.b.w)
B.a.p(o.c,n)
o.a.$1(n)}}return m},
ln(a){var s,r,q,p,o,n,m=this,l=m.d
l===$&&A.b("_peekToken")
switch(l.a){case 12:m.aQ(12)
s=515
r=!1
break
case 13:m.aQ(13)
s=516
r=!1
break
case 14:m.aQ(14)
s=517
r=!1
break
case 36:m.aQ(36)
s=513
r=!0
break
default:s=513
r=!1}if(s===513&&!a){q=m.c
if(q!=null){q=q.b
q=A.c9(q.a,q.c)
p=m.d.b
p=q.b!==A.c9(p.a,p.b).b
q=p}else q=!1
if(q)s=514}o=m.aa(l.b)
n=r?new A.cG(new A.hY(o),o):m.hH()
if(n==null)l=s===515||s===516||s===517
else l=!1
if(l)n=new A.cG(new A.bY("",o),o)
if(n!=null)return new A.eD(s,n,o)
return null},
hH(){var s,r,q,p=this,o=p.d
o===$&&A.b("_peekToken")
s=o.b
o=o.a
switch(o){case 15:r=new A.cp(p.aa(p.bz().b))
break
case 511:r=p.bE()
break
default:if(A.ol(o))r=p.bE()
else{if(o===9)return null
r=null}break}if(p.dK(16)){o=p.d
switch(o.a){case 15:q=new A.cp(p.aa(p.bz().b))
break
case 511:q=p.bE()
break
default:p.cr("expected element name or universal(*), but found "+o.l(0),p.d.b)
q=null
break}return new A.hm(r,new A.cG(q,q.a),p.aa(s))}else if(r!=null)return new A.cG(r,p.aa(s))
else return p.lo()},
i2(a){var s,r=this.c
if(r!=null&&r.a===a){r=r.b
r=A.c9(r.a,r.c)
s=this.d
s===$&&A.b("_peekToken")
s=s.b
return r.b!==A.c9(s.a,s.b).b}return!1},
lo(){var s,r=this,q=r.d
q===$&&A.b("_peekToken")
s=q.b
switch(q.a){case 11:r.aQ(11)
if(r.i2(11)){r.cr("Not a valid ID selector expected #id",r.aa(s))
return null}return new A.h9(r.bE(),r.aa(s))
case 8:r.aQ(8)
if(r.i2(8)){r.cr("Not a valid class selector expected .className",r.aa(s))
return null}return new A.fS(r.bE(),r.aa(s))
case 17:return r.pg(s)
case 4:return r.pe()
case 62:r.cr("name must start with a alpha character, but found a number",s)
r.bz()
break}return null},
pg(a){var s,r,q,p,o,n,m,l,k=this
k.aQ(17)
s=k.dK(17)
r=k.d
r===$&&A.b("_peekToken")
if(r.a===511)q=k.bE()
else return null
p=q.b.toLowerCase()
if(k.d.a===2){r=!s
if(r&&p==="not"){k.aQ(2)
o=k.hH()
k.aQ(3)
r=k.aa(a)
return new A.hq(o,new A.hp(r),r)}else{if(r)r=p==="host"||p==="host-context"||p==="global-context"||p==="-acx-global-context"
else r=!1
if(r){k.aQ(2)
n=k.pf()
if(n==null){k.fc("a selector argument")
return null}k.aQ(3)
return new A.ex(n,q,k.aa(a))}else{r=k.a
r.d=!0
k.aQ(2)
m=k.aa(a)
l=k.ph()
r.d=!1
if(l instanceof A.ds){k.aQ(3)
return s?new A.hD(!1,q,m):new A.ex(l,q,m)}else{k.fc("CSS expression")
return null}}}}r=!s
return!r||B.e1.a.aj(p)?new A.dn(r,q,k.aa(a)):new A.dm(q,k.aa(a))},
ph(){var s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=i.d
g===$&&A.b("_peekToken")
s=g.b
r=A.a([],t.oQ)
for(g=i.a,q=t.U,p=h,o=p,n=!0;n;){m=i.d
switch(m.a){case 12:s=m.b
i.c=m
i.d=q.a(g.ao(!1))
B.a.p(r,new A.hv(i.aa(s)))
o=m
break
case 34:s=m.b
i.c=m
i.d=q.a(g.ao(!1))
B.a.p(r,new A.hu(i.aa(s)))
o=m
break
case 60:i.c=m
i.d=q.a(g.ao(!1))
p=A.cw(m.gY(m),h)
o=m
break
case 62:i.c=m
i.d=q.a(g.ao(!1))
p=A.bV(m.gY(m))
o=m
break
case 25:p="'"+A.oY(i.hc(!1),!0)+"'"
return new A.aj(p,p,i.aa(s))
case 26:p='"'+A.oY(i.hc(!1),!1)+'"'
return new A.aj(p,p,i.aa(s))
case 511:p=i.bE()
break
default:n=!1}if(n&&p!=null){l=i.aa(s)
k=i.d.a
switch(k){case 600:j=new A.h0(p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 601:j=new A.h3(p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 602:case 603:case 604:case 605:case 606:case 607:j=new A.hj(k,p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 608:case 609:case 610:case 611:j=new A.fF(k,p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 612:case 613:j=new A.hZ(k,p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 614:case 615:j=new A.h8(k,p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 24:j=new A.hA(p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 617:j=new A.h7(p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 618:case 619:case 620:j=new A.hF(k,p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 621:j=new A.fR(k,p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 622:j=new A.hE(k,p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
case 623:case 624:case 625:case 626:j=new A.i9(k,p,o.gY(o),l)
i.c=i.d
i.d=q.a(g.ao(!1))
break
default:j=p instanceof A.bY?new A.aj(p,p.b,l):new A.ht(p,o.gY(o),l)}B.a.p(r,j)
p=h}}return new A.ds(r,i.aa(s))},
pe(){var s,r,q,p=this,o=p.d
o===$&&A.b("_peekToken")
if(p.dK(4)){s=p.bE()
r=p.d.a
switch(r){case 28:case 530:case 531:case 532:case 533:case 534:p.bz()
break
default:r=535}if(r!==535)q=p.d.a===511?p.bE():p.hc(!1)
else q=null
p.aQ(5)
return new A.fL(r,q,s,p.aa(o.b))}return null},
hc(a){var s,r,q,p,o,n,m=this,l=m.d
l===$&&A.b("_peekToken")
s=m.a
r=s.c
s.c=!1
switch(l.a){case 25:m.bz()
q=25
break
case 26:m.bz()
q=26
break
default:m.cr("unexpected string",m.aa(l.b))
q=-1
break}l=t.U
p=""
while(!0){o=m.d
n=o.a
if(!(n!==q&&n!==1))break
m.c=o
m.d=l.a(s.ao(!1))
p+=o.gY(o)}s.c=r
if(q!==3)m.bz()
return p.charCodeAt(0)==0?p:p},
bE(){var s=this.bz(),r=s.a
if(r!==511&&!A.ol(r)){$.fj.iB()
return new A.bY("",this.aa(s.b))}return new A.bY(s.gY(s),this.aa(s.b))}}
A.bs.prototype={
gY(a){var s=this.b
return A.ae(B.t.b8(s.a.c,s.b,s.c),0,null)},
l(a){var s=A.om(this.a),r=B.b.ez(this.gY(this))
if(s!==r){if(r.length>10)r=B.b.B(r,0,8)+"..."
return s+"("+r+")"}else return s}}
A.ha.prototype={
gY(a){return this.c}}
A.kR.prototype={
ao(a){var s,r,q,p,o,n,m,l,k=this
k.r=k.f
s=k.ct()
switch(s){case 10:case 13:case 32:case 9:return k.oB()
case 0:return k.N(1)
case 64:r=k.cu()
if(A.i0(r)||r===45){q=k.f
p=k.r
k.r=q
k.ct()
k.ec()
o=k.b
n=k.r
m=A.mY(B.br,"type",o,n,k.f-n)
if(m===-1){n=k.r
m=A.mY(B.bi,"type",o,n,k.f-n)}if(m!==-1)return k.N(m)
else{k.r=p
k.f=q}}return k.N(10)
case 46:l=k.r
if(k.p_())if(k.ed().a===60){k.r=l
return k.N(62)}else return k.N(65)
return k.N(8)
case 40:return k.N(2)
case 41:return k.N(3)
case 123:return k.N(6)
case 125:return k.N(7)
case 91:return k.N(4)
case 93:if(k.ab(93)&&k.ab(62))return k.cE()
return k.N(5)
case 35:return k.N(11)
case 43:if(k.ix(s))return k.ed()
return k.N(12)
case 45:if(k.d||!1)return k.N(34)
else if(k.ix(s))return k.ed()
else if(A.i0(s)||s===45)return k.ec()
return k.N(34)
case 62:return k.N(13)
case 126:if(k.ab(61))return k.N(530)
return k.N(14)
case 42:if(k.ab(61))return k.N(534)
return k.N(15)
case 38:return k.N(36)
case 124:if(k.ab(61))return k.N(531)
return k.N(16)
case 58:return k.N(17)
case 44:return k.N(19)
case 59:return k.N(9)
case 37:return k.N(24)
case 39:return k.N(25)
case 34:return k.N(26)
case 47:if(k.ab(42))return k.oA()
return k.N(27)
case 60:if(k.ab(33))if(k.ab(45)&&k.ab(45))return k.oz()
else{if(k.ab(91)){o=k.Q.a
o=k.ab(B.b.E(o,0))&&k.ab(B.b.E(o,1))&&k.ab(B.b.E(o,2))&&k.ab(B.b.E(o,3))&&k.ab(B.b.E(o,4))&&k.ab(91)}else o=!1
if(o)return k.cE()}return k.N(32)
case 61:return k.N(28)
case 94:if(k.ab(61))return k.N(532)
return k.N(30)
case 36:if(k.ab(61))return k.N(533)
return k.N(31)
case 33:return k.ec()
default:if(!k.e&&s===92)return k.N(35)
if(k.c)o=(s===k.w||s===k.x)&&k.cu()===k.y
else o=!1
if(o){k.ct()
k.r=k.f
return k.N(508)}else{o=s===118
if(o&&k.ab(97)&&k.ab(114)&&k.ab(45))return k.N(400)
else if(o&&k.ab(97)&&k.ab(114)&&k.cu()===45)return k.N(401)
else if(A.i0(s)||s===45)return k.ec()
else if(s>=48&&s<=57)return k.ed()}return k.N(65)}},
cE(){return this.ao(!1)},
ec(){var s,r,q,p,o,n,m,l,k,j=this,i=A.a([],t.t),h=j.f
j.f=j.r
r=j.b
s=r.length
while(!0){q=j.f
if(!(q<s)){s=q
break}p=B.b.J(r,q)
if(p===92&&j.c){o=j.f=q+1
j.o9(o+6)
q=j.f
if(q!==o){B.a.p(i,A.cw("0x"+B.b.B(r,o,q),null))
q=j.f
if(q===s){s=q
break}p=B.b.J(r,q)
if(q-o!==6)n=p===32||p===9||p===13||p===10
else n=!1
if(n)j.f=q+1}else{if(q===s){s=q
break}j.f=q+1
B.a.p(i,B.b.J(r,q))}}else{if(q>=h)if(j.d)if(!A.i0(p))n=p>=48&&p<=57
else n=!0
else{if(!A.i0(p))n=p>=48&&p<=57
else n=!0
n=n||p===45}else n=!0
if(n){B.a.p(i,p);++j.f}else{s=q
break}}}m=j.a.f_(0,j.r,s)
l=A.ae(i,0,null)
if(!j.d&&!j.e){s=j.r
k=A.mY(B.ac,"unit",r,s,j.f-s)}else k=-1
if(k===-1)k=B.b.B(r,j.r,j.f)==="!important"?505:-1
return new A.ha(l,k>=0?k:511,m)},
ed(){var s,r=this
r.jo()
if(r.cu()===46){r.ct()
s=r.cu()
if(s>=48&&s<=57){r.jo()
return r.N(62)}else --r.f}return r.N(60)},
p_(){var s=this.f,r=this.b
if(s<r.length){r=B.b.J(r,s)
r=r>=48&&r<=57}else r=!1
if(r){this.f=s+1
return!0}return!1},
o9(a){var s,r,q=this.b
a=Math.min(a,q.length)
for(;s=this.f,s<a;){r=B.b.J(q,s)
if(!(r>=48&&r<=57))if(!(r>=97&&r<=102))r=r>=65&&r<=70
else r=!0
else r=!0
if(r)this.f=s+1
else return}},
oz(){var s,r,q,p,o,n=this
for(;!0;){s=n.ct()
if(s===0){r=n.a
q=n.r
p=n.f
o=new A.at(r,q,p)
o.aG(r,q,p)
return new A.bs(67,o)}else if(s===45)if(n.ab(45))if(n.ab(62))if(n.c)return n.cE()
else{r=n.a
q=n.r
p=n.f
o=new A.at(r,q,p)
o.aG(r,q,p)
return new A.bs(504,o)}}},
oA(){var s,r,q,p,o,n=this
for(;!0;){s=n.ct()
if(s===0){r=n.a
q=n.r
p=n.f
o=new A.at(r,q,p)
o.aG(r,q,p)
return new A.bs(67,o)}else if(s===42)if(n.ab(47))if(n.c)return n.cE()
else{r=n.a
q=n.r
p=n.f
o=new A.at(r,q,p)
o.aG(r,q,p)
return new A.bs(64,o)}}}}
A.kS.prototype={
ct(){var s=this.f,r=this.b
if(s<r.length){this.f=s+1
return B.b.J(r,s)}else return 0},
iy(a){var s=this.f+a,r=this.b
if(s<r.length)return B.b.J(r,s)
else return 0},
cu(){return this.iy(0)},
ab(a){var s=this.f,r=this.b
if(s<r.length)if(B.b.J(r,s)===a){this.f=s+1
return!0}else return!1
else return!1},
ix(a){var s,r
if(a>=48&&a<=57)return!0
s=this.cu()
if(a===46)return s>=48&&s<=57
if(a===43||a===45){if(!(s>=48&&s<=57))if(s===46){r=this.iy(1)
r=r>=48&&r<=57}else r=!1
else r=!0
return r}return!1},
N(a){return new A.bs(a,this.a.f_(0,this.r,this.f))},
oB(){var s,r,q,p,o=this,n=--o.f
for(s=o.b,r=s.length;n<r;n=q){q=o.f=n+1
p=B.b.J(s,n)
if(!(p===32||p===9||p===13))if(p===10){if(!o.c){n=o.a
s=o.r
r=new A.at(n,s,q)
r.aG(n,s,q)
return new A.bs(63,r)}}else{n=o.f=q-1
if(o.c)return o.cE()
else{s=o.a
r=o.r
q=new A.at(s,r,n)
q.aG(s,r,n)
return new A.bs(63,q)}}}return o.N(1)},
jo(){var s,r,q,p
for(s=this.b,r=s.length;q=this.f,q<r;){p=B.b.J(s,q)
if(p>=48&&p<=57)this.f=q+1
else return}}}
A.dh.prototype={
l(a){return"MessageLevel."+this.b}}
A.dg.prototype={
l(a){var s=this,r=s.d&&B.ak.aj(s.a),q=r?B.ak.i(0,s.a):null,p=r?""+A.l(q):""
p=p+A.l(B.c6.i(0,s.a))+" "
if(r)p+="\x1b[0m"
p=p+"on "+s.c.jN(0,s.b,q)
return p.charCodeAt(0)==0?p:p}}
A.kg.prototype={
oh(a,b,c){var s=new A.dg(B.J,b,c,this.b.w)
B.a.p(this.c,s)
this.a.$1(s)}}
A.ky.prototype={}
A.bY.prototype={
R(a){return null},
l(a){var s=this.a
s=A.ae(B.t.b8(s.a.c,s.b,s.c),0,null)
return s},
gai(a){return this.b}}
A.cp.prototype={
R(a){return null},
gai(a){return"*"}}
A.hY.prototype={
R(a){return null},
gai(a){return"&"}}
A.hp.prototype={
R(a){return null},
gai(a){return"not"}}
A.hL.prototype={
R(a){return B.a.b2(this.b,a.gkh())}}
A.ch.prototype={
gn(a){return this.b.length},
R(a){return a.ki(this)}}
A.eD.prototype={
R(a){this.c.R(a)
return null},
l(a){var s=this.c.b
return s.gai(s)}}
A.b0.prototype={
gai(a){var s=this.b
return s.gai(s)},
R(a){return t.bF.a(this.b).R(a)}}
A.cG.prototype={
R(a){var s=this.b
return s instanceof A.cp||a.a.x===s.gai(s).toLowerCase()},
l(a){var s=this.b
return s.gai(s)}}
A.hm.prototype={
gjO(){var s=this.d
if(s instanceof A.cp)s="*"
else s=s==null?"":t.gx.a(s).b
return s},
R(a){return a.pY(this)},
l(a){var s=this.gjO(),r=t.g9.a(this.b).b
return s+"|"+r.gai(r)}}
A.fL.prototype={
oY(){switch(this.d){case 28:return"="
case 530:return"~="
case 531:return"|="
case 532:return"^="
case 533:return"$="
case 534:return"*="
case 535:return""}return null},
pW(){var s=this.e
if(s!=null)if(s instanceof A.bY)return s.l(0)
else return'"'+A.l(s)+'"'
else return""},
R(a){return a.pX(this)},
l(a){var s=this.b
return"["+s.gai(s)+A.l(this.oY())+this.pW()+"]"}}
A.h9.prototype={
R(a){var s=a.a.b.i(0,"id"),r=s==null?"":s,q=this.b
return r===q.gai(q)},
l(a){return"#"+A.l(this.b)}}
A.fS.prototype={
R(a){var s,r=a.a
r.toString
s=this.b
s=s.gai(s)
return new A.h_(r).eu().F(0,s)},
l(a){return"."+A.l(this.b)}}
A.dm.prototype={
R(a){return a.q_(this)},
l(a){var s=this.b
return":"+s.gai(s)}}
A.dn.prototype={
R(a){a.q1(this)
return!1},
l(a){var s=this.d?":":"::",r=this.b
return s+r.gai(r)}}
A.ex.prototype={
R(a){return a.pZ(this)}}
A.hD.prototype={
R(a){return a.q0(this)}}
A.ds.prototype={
R(a){a.mO(this.b)
return null}}
A.hq.prototype={
R(a){return!A.iI(this.d.R(a))}}
A.hv.prototype={
R(a){return null}}
A.hu.prototype={
R(a){return null}}
A.aj.prototype={
R(a){return null}}
A.ht.prototype={
R(a){return null}}
A.bt.prototype={
R(a){return null},
l(a){return this.d+A.l(A.rj(this.f))}}
A.hj.prototype={
R(a){return null}}
A.hA.prototype={
R(a){return null}}
A.h0.prototype={
R(a){return null}}
A.h3.prototype={
R(a){return null}}
A.fF.prototype={
R(a){return null}}
A.hZ.prototype={
R(a){return null}}
A.h8.prototype={
R(a){return null}}
A.h7.prototype={
R(a){return null}}
A.hF.prototype={
R(a){return null}}
A.fR.prototype={
R(a){return null}}
A.hE.prototype={
R(a){return null}}
A.i9.prototype={
R(a){return null}}
A.T.prototype={}
A.ap.prototype={}
A.ia.prototype={
mO(a){var s
t.fr.a(a)
for(s=0;s<a.length;++s)a[s].R(this)},
$iov:1}
A.aH.prototype={
l(a){var s=this.a,r=this.b
return s!=null?s+":"+r:r},
gX(a){return 37*(37*(J.aL(this.a)&2097151)+B.b.gX(this.b)&2097151)+B.b.gX(this.c)&1073741823},
aA(a,b){var s,r,q
if(!(b instanceof A.aH))return 1
s=this.a
if(s==null)s=""
r=b.a
q=B.b.aA(s,r==null?"":r)
if(q!==0)return q
q=B.b.aA(this.b,b.b)
if(q!==0)return q
return B.b.aA(this.c,b.c)},
U(a,b){if(b==null)return!1
return b instanceof A.aH&&this.a==b.a&&this.b===b.b&&this.c===b.c},
$iag:1}
A.ix.prototype={}
A.lH.prototype={}
A.io.prototype={}
A.ak.prototype={
gal(a){var s,r=this,q=r.c
if(q===$){s=A.a([],t.d)
r.c!==$&&A.F("nodes")
q=r.c=new A.ad(r,s)}return q},
gj6(a){var s,r=this,q=r.d
if(q===$){s=new A.h5(r.gal(r))
r.d!==$&&A.F("children")
r.smc(s)
q=s}return q},
ev(a){var s=this.a
if(s!=null)B.a.a3(s.gal(s).a,this)
return this},
oO(a,b,c){var s,r,q=this
if(c==null)q.gal(q).p(0,b)
else{s=q.gal(q)
r=q.gal(q)
s.bF(0,r.ak(r,c),b)}},
dG(a,b,c){var s,r,q,p,o,n,m,l
A.iM(c,t.J,"T","_clone")
c.a(a)
if(b)for(s=this.gal(this).a,r=A.v(s),s=new J.aC(s,s.length,r.h("aC<1>")),r=r.c,q=t.d;s.m();){p=s.d
p=(p==null?r.a(p):p).d5(0,!0)
o=a.c
if(o===$){n=A.a([],q)
a.c!==$&&A.F("nodes")
o=a.c=new A.ad(a,n)}n=p.a
if(n!=null){m=n.c
if(m===$){l=A.a([],q)
n.c!==$&&A.F("nodes")
m=n.c=new A.ad(n,l)}B.a.a3(m.a,p)}p.a=o.b
o.bQ(0,p)}return a},
sd2(a,b){this.b=t.oP.a(b)},
smc(a){this.d=t.jB.a(a)}}
A.dV.prototype={
l(a){return"#document"},
d5(a,b){return this.dG(A.nT(),!0,t.dA)}}
A.fZ.prototype={
l(a){var s,r=this,q=r.x,p=q==null
if(!p||r.y!=null){if(p)q=""
s=r.y
if(s==null)s=""
return"<!DOCTYPE "+A.l(r.w)+' "'+q+'" "'+s+'">'}else return"<!DOCTYPE "+A.l(r.w)+">"},
d5(a,b){return A.nU(this.w,this.x,this.y)}}
A.c1.prototype={
l(a){var s=J.bL(this.w)
this.w=s
return'"'+s+'"'},
d5(a,b){var s=J.bL(this.w)
this.w=s
return A.mX(s)},
iY(a,b){var s=this.w;(!(s instanceof A.a5)?this.w=new A.a5(A.l(s)):s).a+=b}}
A.W.prototype={
gep(a){var s,r,q,p,o=this.a
if(o==null)return null
s=o.gal(o)
for(r=s.ak(s,this)-1,o=s.a,q=o.length;r>=0;--r){if(!(r<q))return A.c(o,r)
p=o[r]
if(p instanceof A.W)return p}return null},
gjP(a){var s,r,q,p,o,n=this.a
if(n==null)return null
s=n.gal(n)
for(r=s.ak(s,this)+1,q=s.a,p=q.length;r<p;++r){if(!(r>=0))return A.c(q,r)
o=q[r]
if(o instanceof A.W)return o}return null},
l(a){var s=A.qL(this.w)
return"<"+(s==null?"":s+" ")+A.l(this.x)+">"},
d5(a,b){var s=this,r=A.mE(s.x,s.w)
r.sd2(0,A.hk(s.b,t.K,t.N))
return s.dG(r,b,t.h)}}
A.fV.prototype={
l(a){return"<!-- "+this.w+" -->"},
d5(a,b){return A.nR(this.w)}}
A.ad.prototype={
p(a,b){t.J.a(b)
b.ev(0)
b.a=this.b
this.bQ(0,b)},
M(a,b){var s,r,q,p,o,n,m,l,k=this.mv(t.hl.a(b))
for(s=A.v(k).h("Y<1>"),r=new A.Y(k,s),r=new A.O(r,r.gn(r),s.h("O<B.E>")),q=this.b,s=s.h("B.E"),p=t.d;r.m();){o=r.d
if(o==null)o=s.a(o)
n=o.a
if(n!=null){m=n.c
if(m===$){l=A.a([],p)
n.c!==$&&A.F("nodes")
m=n.c=new A.ad(n,l)}B.a.a3(m.a,o)}o.a=q}this.lR(0,k)},
bF(a,b,c){c.ev(0)
c.a=this.b
this.hQ(0,b,c)},
bV(a){var s,r,q
for(s=this.a,r=A.v(s),s=new J.aC(s,s.length,r.h("aC<1>")),r=r.c;s.m();){q=s.d;(q==null?r.a(q):q).a=null}this.lP(this)},
v(a,b,c){var s
t.J.a(c)
s=this.a
if(!(b>=0&&b<s.length))return A.c(s,b)
s[b].a=null
c.ev(0)
c.a=this.b
this.lQ(0,b,c)},
mv(a){var s,r
t.hl.a(a)
s=A.a([],t.d)
for(r=J.I(a);r.m();)B.a.p(s,r.gu())
return s}}
A.h5.prototype={
v(a,b,c){var s,r,q
t.h.a(c)
s=t.v
s=A.h(new A.ar(this.a,s),!1,s.h("j.E"))
if(!(b>=0&&b<s.length))return A.c(s,b)
s=s[b]
r=s.a
if(r==null)A.M(A.S("Node must have a parent to replace it."))
r=r.gal(r)
q=s.a
q=q.gal(q)
r.v(0,q.ak(q,s),c)},
sn(a,b){var s=t.v,r=A.h(new A.ar(this.a,s),!1,s.h("j.E")).length
if(b>=r)return
else if(b<0)throw A.d(A.a8("Invalid list length",null))
this.pz(0,b,r)},
p(a,b){this.a.p(0,t.h.a(b))},
M(a,b){var s,r,q,p,o,n,m
for(s=J.I(t.cj.a(b)),r=this.a,q=t.d;s.m();){p=s.gu()
o=p.a
if(o!=null){n=o.c
if(n===$){m=A.a([],q)
o.c!==$&&A.F("nodes")
n=o.c=new A.ad(o,m)}B.a.a3(n.a,p)}p.a=r.b
r.bQ(0,p)}},
cn(a,b){t.dU.a(b)
throw A.d(A.S("TODO(jacobr): should we impl?"))},
pz(a,b,c){var s=t.v
B.a.bc(B.a.b8(A.h(new A.ar(this.a,s),!1,s.h("j.E")),b,c),new A.jr())},
em(a,b,c){var s,r
c.h("0(W)").a(b)
s=t.v
s=A.h(new A.ar(this.a,s),!1,s.h("j.E"))
r=A.v(s)
return new A.J(s,r.Z(c).h("1(2)").a(b),r.h("@<1>").Z(c).h("J<1,2>"))},
eB(a,b){var s,r
t.cT.a(b)
s=t.v
s=A.h(new A.ar(this.a,s),!1,s.h("j.E"))
r=A.v(s)
return new A.am(s,r.h("A(1)").a(b),r.h("am<1>"))},
cA(a,b){var s
t.cT.a(b)
s=t.v
return B.a.cA(A.h(new A.ar(this.a,s),!1,s.h("j.E")),b)},
af(a,b){var s=t.v
s=A.h(new A.ar(this.a,s),!1,s.h("j.E"))
if(!(b>=0&&b<s.length))return A.c(s,b)
return s[b]},
gah(a){var s=t.v
return A.h(new A.ar(this.a,s),!1,s.h("j.E")).length===0},
gn(a){var s=t.v
return A.h(new A.ar(this.a,s),!1,s.h("j.E")).length},
i(a,b){var s=t.v
s=A.h(new A.ar(this.a,s),!1,s.h("j.E"))
if(!(b>=0&&b<s.length))return A.c(s,b)
return s[b]},
gH(a){var s=t.v
s=A.h(new A.ar(this.a,s),!1,s.h("j.E"))
return new J.aC(s,s.length,A.v(s).h("aC<1>"))},
dw(a,b,c){var s=t.v
s=A.h(new A.ar(this.a,s),!1,s.h("j.E"))
A.aK(b,c,s.length)
return A.bf(s,b,c,A.v(s).c)},
gac(a){var s=t.v
return B.a.gac(A.h(new A.ar(this.a,s),!1,s.h("j.E")))},
gq(a){var s=t.v
return B.a.gq(A.h(new A.ar(this.a,s),!1,s.h("j.E")))},
$iQ:1,
$ik:1}
A.jr.prototype={
$1(a){return t.h.a(a).ev(0)},
$S:71}
A.ik.prototype={}
A.il.prototype={}
A.im.prototype={}
A.iq.prototype={}
A.ir.prototype={}
A.iu.prototype={}
A.jZ.prototype={
gaD(){var s=this.x
return s===$?this.x=this.gik():s},
gik(){var s=this,r=s.Q
if(r===$){r!==$&&A.F("_initialPhase")
r=s.Q=new A.bz(s,s.d)}return r},
gi5(){var s=this,r=s.as
if(r===$){r!==$&&A.F("_beforeHtmlPhase")
r=s.as=new A.fO(s,s.d)}return r},
gmk(){var s=this,r=s.at
if(r===$){r!==$&&A.F("_beforeHeadPhase")
r=s.at=new A.dQ(s,s.d)}return r},
gc4(){var s=this,r=s.ax
if(r===$){r!==$&&A.F("_inHeadPhase")
r=s.ax=new A.hc(s,s.d)}return r},
ga5(){var s=this,r=s.ch
if(r===$){r!==$&&A.F("_inBodyPhase")
r=s.ch=new A.d9(s,s.d)}return r},
giH(){var s=this,r=s.CW
if(r===$){r!==$&&A.F("_textPhase")
r=s.CW=new A.hX(s,s.d)}return r},
gaI(){var s=this,r=s.cx
if(r===$){r!==$&&A.F("_inTablePhase")
r=s.cx=new A.ef(s,s.d)}return r},
gdI(){var s,r=this,q=r.cy
if(q===$){s=A.a([],t.ks)
r.cy!==$&&A.F("_inTableTextPhase")
q=r.cy=new A.db(s,r,r.d)}return q},
gig(){var s=this,r=s.db
if(r===$){r!==$&&A.F("_inCaptionPhase")
r=s.db=new A.ea(s,s.d)}return r},
gii(){var s=this,r=s.dx
if(r===$){r!==$&&A.F("_inColumnGroupPhase")
r=s.dx=new A.eb(s,s.d)}return r},
gfg(){var s=this,r=s.dy
if(r===$){r!==$&&A.F("_inTableBodyPhase")
r=s.dy=new A.cH(s,s.d)}return r},
gff(){var s=this,r=s.fr
if(r===$){r!==$&&A.F("_inRowPhase")
r=s.fr=new A.ed(s,s.d)}return r},
gih(){var s=this,r=s.fx
if(r===$){r!==$&&A.F("_inCellPhase")
r=s.fx=new A.da(s,s.d)}return r},
gc5(){var s=this,r=s.fy
if(r===$){r!==$&&A.F("_inSelectPhase")
r=s.fy=new A.ee(s,s.d)}return r},
gij(){var s=this,r=s.k2
if(r===$){r!==$&&A.F("_inFramesetPhase")
r=s.k2=new A.ec(s,s.d)}return r},
mB(){var s
this.bq(0)
for(;!0;)try{this.oV()
break}catch(s){if(A.bw(s) instanceof A.kB)this.bq(0)
else throw s}},
bq(a){var s=this
s.c.bq(0)
s.d.bq(0)
s.f=!1
B.a.bV(s.e)
s.r="no quirks"
s.x=s.gik()
s.z=!0},
jK(a){var s,r,q=a.x
if(q==="annotation-xml"&&a.w==="http://www.w3.org/1998/Math/MathML"){q=a.b.i(0,"encoding")
if(q==null)s=null
else{r=t.E
s=A.ae(new A.J(new A.a9(q),r.h("i(w.E)").a(A.bU()),r.h("J<w.E,i>")),0,null)}return s==="text/html"||s==="application/xhtml+xml"}else return B.a.F(B.bv,new A.o(a.w,q,t.iA))},
oK(a,b){var s,r=this.d,q=r.c
if(q.length===0)return!1
s=B.a.gq(q)
q=s.w
if(q==r.a)return!1
r=s.x
if(B.a.F(B.ae,new A.o(q,r,t.iA))){if(b===2){q=t.ny.a(a).b
q=q!=="mglyph"&&q!=="malignmark"}else q=!1
if(q)return!1
if(b===1||b===0)return!1}if(r==="annotation-xml"&&b===2&&t.ny.a(a).b==="svg")return!1
if(this.jK(s))if(b===2||b===1||b===0)return!1
return!0},
oV(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6="_initialPhase"
for(s=a5.c,r=a5.d,q=t.i,p=t.cw,o=t.ia,n=t.ny,m=t.lH,l=t.p1,k=a5.e,j=t.jK,i=s.a,h=t.z;s.m();){g=s.at
g.toString
for(f=g;f!=null;){e=f.gce(f)
if(e===6){j.a(f)
d=f.a
c=f.c
if(c==null){c=f.c=J.bL(f.b)
f.b=null}if(d==null){b=i.w
if(b==null)d=null
else{a=i.y
new A.b3(b,a).bh(b,a)
d=new A.at(b,a,a)
d.aG(b,a,a)}}B.a.p(k,new A.aZ(c,d,f.e))
f=null}else{a0=a5.x
if(a0===$){a0=a5.Q
if(a0===$){a1=new A.bz(a5,r)
a0!==$&&A.F(a6)
a5.Q=a1
a0=a1}a5.x=a0}if(a5.oK(g,e)){a0=a5.id
if(a0===$){a1=new A.hb(a5,r)
a0!==$&&A.F("_inForeignContentPhase")
a5.id=a1
a0=a1}a2=a0}else a2=a0
switch(e){case 1:f=a2.a2(l.a(f))
break
case 0:f=a2.aK(m.a(f))
break
case 2:f=a2.K(n.a(f))
break
case 3:f=a2.P(o.a(f))
break
case 4:f=a2.cf(p.a(f))
break
case 5:f=a2.jU(q.a(f))
break}}}if(g instanceof A.cj)if(g.c&&!g.r){d=g.a
g=A.z(["name",g.b],h,h)
if(d==null){c=i.w
if(c==null)d=null
else{b=i.y
new A.b3(c,b).bh(c,b)
d=new A.at(c,b,b)
d.aG(c,b,b)}}B.a.p(k,new A.aZ("non-void-element-with-trailing-solidus",d,g))}}a3=A.a([],t.gg)
for(a4=!0;a4;){a0=a5.x
if(a0===$){a0=a5.Q
if(a0===$){a1=new A.bz(a5,r)
a0!==$&&A.F(a6)
a5.Q=a1
a0=a1}a0=a5.x=a0}B.a.p(a3,a0)
a0=a5.x
if(a0===$){a0=a5.Q
if(a0===$){a1=new A.bz(a5,r)
a0!==$&&A.F(a6)
a5.Q=a1
a0=a1}a0=a5.x=a0}a4=a0.a8()}},
giq(){var s=this.c.a,r=s.w
if(r==null)s=null
else{s=A.c9(r,s.y)
r=s.b
r=A.n0(s.a,r,r)
s=r}return s},
G(a,b,c){var s=new A.aZ(b,a==null?this.giq():a,c)
B.a.p(this.e,s)},
a1(a,b){return this.G(a,b,B.al)},
iQ(a){var s=a.e.a3(0,"definitionurl")
if(s!=null)a.e.v(0,"definitionURL",s)},
iR(a){var s,r,q,p,o,n
for(s=a.e,r=A.D(s).h("aX<1>"),r=A.h(new A.aX(s,r),!1,r.h("j.E")),s=r.length,q=0;q<s;++q){p=A.ay(r[q])
o=B.c8.i(0,p)
if(o!=null){n=a.e
p=n.a3(0,p)
p.toString
n.v(0,o,p)}}},
fo(a){var s,r,q,p,o,n
for(s=a.e,r=A.D(s).h("aX<1>"),r=A.h(new A.aX(s,r),!1,r.h("j.E")),s=r.length,q=0;q<s;++q){p=A.ay(r[q])
o=B.c7.i(0,p)
if(o!=null){n=a.e
p=n.a3(0,p)
p.toString
n.v(0,o,p)}}},
k6(){var s,r,q,p,o,n,m,l,k,j=this,i="_inCellPhase",h="_inTableBodyPhase",g="_inBodyPhase"
for(s=j.d,r=s.c,q=A.v(r).h("Y<1>"),p=new A.Y(r,q),p=new A.O(p,p.gn(p),q.h("O<B.E>")),q=q.h("B.E"),o=s.a;p.m();){n=p.d
if(n==null)n=q.a(n)
m=n.x
if(0>=r.length)return A.c(r,0)
l=n===r[0]
if(l)m=j.w
switch(m){case"select":case"colgroup":case"head":case"html":break}if(!l&&n.w!=o)continue
switch(m){case"select":k=j.fy
if(k===$){k!==$&&A.F("_inSelectPhase")
k=j.fy=new A.ee(j,s)}j.x=k
return
case"td":k=j.fx
if(k===$){k!==$&&A.F(i)
k=j.fx=new A.da(j,s)}j.x=k
return
case"th":k=j.fx
if(k===$){k!==$&&A.F(i)
k=j.fx=new A.da(j,s)}j.x=k
return
case"tr":k=j.fr
if(k===$){k!==$&&A.F("_inRowPhase")
k=j.fr=new A.ed(j,s)}j.x=k
return
case"tbody":k=j.dy
if(k===$){k!==$&&A.F(h)
k=j.dy=new A.cH(j,s)}j.x=k
return
case"thead":k=j.dy
if(k===$){k!==$&&A.F(h)
k=j.dy=new A.cH(j,s)}j.x=k
return
case"tfoot":k=j.dy
if(k===$){k!==$&&A.F(h)
k=j.dy=new A.cH(j,s)}j.x=k
return
case"caption":k=j.db
if(k===$){k!==$&&A.F("_inCaptionPhase")
k=j.db=new A.ea(j,s)}j.x=k
return
case"colgroup":k=j.dx
if(k===$){k!==$&&A.F("_inColumnGroupPhase")
k=j.dx=new A.eb(j,s)}j.x=k
return
case"table":k=j.cx
if(k===$){k!==$&&A.F("_inTablePhase")
k=j.cx=new A.ef(j,s)}j.x=k
return
case"head":k=j.ch
if(k===$){k!==$&&A.F(g)
k=j.ch=new A.d9(j,s)}j.x=k
return
case"body":k=j.ch
if(k===$){k!==$&&A.F(g)
k=j.ch=new A.d9(j,s)}j.x=k
return
case"frameset":k=j.k2
if(k===$){k!==$&&A.F("_inFramesetPhase")
k=j.k2=new A.ec(j,s)}j.x=k
return
case"html":k=j.at
if(k===$){k!==$&&A.F("_beforeHeadPhase")
k=j.at=new A.dQ(j,s)}j.x=k
return}}j.x=j.ga5()},
dk(a,b){var s,r,q=this
q.d.O(a)
s=t.c
r=q.c
if(b==="RAWTEXT")r.sj(s.a(r.ges()))
else r.sj(s.a(r.gcI()))
q.y=q.gaD()
q.x=q.giH()}}
A.a7.prototype={
a8(){throw A.d(A.i1(null))},
cf(a){var s=this.b
s.cC(a,B.a.gq(s.c))
return null},
jU(a){this.a.a1(a.a,"unexpected-doctype")
return null},
a2(a){this.b.bY(a.gaB(a),a.a)
return null},
aK(a){this.b.bY(a.gaB(a),a.a)
return null},
K(a){throw A.d(A.i1(null))},
bg(a){var s,r=this.a
if(!r.f&&a.b==="html")r.a1(a.a,"non-html-root")
s=this.b.c
if(0>=s.length)return A.c(s,0)
s[0].e=a.a
a.e.bc(0,new A.kx(this))
r.f=!1
return null},
P(a){throw A.d(A.i1(null))},
cF(a){var s,r=a.b,q=this.b.c
if(0>=q.length)return A.c(q,-1)
s=q.pop()
for(;s.x!=r;){if(0>=q.length)return A.c(q,-1)
s=q.pop()}}}
A.kx.prototype={
$2(a,b){var s
t.K.a(a)
A.ay(b)
s=this.a.b.c
if(0>=s.length)return A.c(s,0)
s[0].b.er(a,new A.kw(b))},
$S:25}
A.kw.prototype={
$0(){return this.a},
$S:9}
A.bz.prototype={
aK(a){return null},
cf(a){var s=this.b,r=s.b
r===$&&A.b("document")
s.cC(a,r)
return null},
jU(a){var s,r,q,p,o,n=this,m=a.d,l=a.b
if(l==null)s=null
else{r=t.E
s=A.ae(new A.J(new A.a9(l),r.h("i(w.E)").a(A.bU()),r.h("J<w.E,i>")),0,null)}q=a.c
p=a.e
if(m==="html")if(s==null)l=q!=null&&q!=="about:legacy-compat"
else l=!0
else l=!0
if(l)n.a.a1(a.a,"unknown-doctype")
if(s==null)s=""
o=A.nU(a.d,a.b,a.c)
o.e=a.a
l=n.b.b
l===$&&A.b("document")
l.gal(l).p(0,o)
if(p)if(a.d==="html"){l=B.b.ghO(s)
if(!B.a.b2(B.bb,l))if(!B.a.F(B.bq,s))if(!(B.a.b2(B.ad,l)&&q==null))l=q!=null&&q.toLowerCase()==="http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"
else l=!0
else l=!0
else l=!0}else l=!0
else l=!0
if(l)n.a.r="quirks"
else{l=B.b.ghO(s)
if(!B.a.b2(B.bw,l))l=B.a.b2(B.ad,l)&&q!=null
else l=!0
if(l)n.a.r="limited quirks"}l=n.a
l.x=l.gi5()
return null},
bA(){var s=this.a
s.r="quirks"
s.x=s.gi5()},
a2(a){this.a.a1(a.a,"expected-doctype-but-got-chars")
this.bA()
return a},
K(a){var s=t.z
this.a.G(a.a,"expected-doctype-but-got-start-tag",A.z(["name",a.b],s,s))
this.bA()
return a},
P(a){var s=t.z
this.a.G(a.a,"expected-doctype-but-got-end-tag",A.z(["name",a.b],s,s))
this.bA()
return a},
a8(){var s=this.a
s.a1(s.giq(),"expected-doctype-but-got-eof")
this.bA()
return!0}}
A.fO.prototype={
ej(){var s=this.b,r=s.jg(0,A.aN("html",A.ab(null,null,t.K,t.N),null,!1))
B.a.p(s.c,r)
s=s.b
s===$&&A.b("document")
s.gal(s).p(0,r)
s=this.a
s.x=s.gmk()},
a8(){this.ej()
return!0},
cf(a){var s=this.b,r=s.b
r===$&&A.b("document")
s.cC(a,r)
return null},
aK(a){return null},
a2(a){this.ej()
return a},
K(a){if(a.b==="html")this.a.f=!0
this.ej()
return a},
P(a){var s,r=a.b
switch(r){case"head":case"body":case"html":case"br":this.ej()
return a
default:s=t.z
this.a.G(a.a,"unexpected-end-tag-before-html",A.z(["name",r],s,s))
return null}}}
A.dQ.prototype={
K(a){var s=null
switch(a.b){case"html":return this.a.ga5().K(a)
case"head":this.cR(a)
return s
default:this.cR(A.aN("head",A.ab(s,s,t.K,t.N),s,!1))
return a}},
P(a){var s,r=null,q=a.b
switch(q){case"head":case"body":case"html":case"br":this.cR(A.aN("head",A.ab(r,r,t.K,t.N),r,!1))
return a
default:s=t.z
this.a.G(a.a,"end-tag-after-implied-root",A.z(["name",q],s,s))
return r}},
a8(){this.cR(A.aN("head",A.ab(null,null,t.K,t.N),null,!1))
return!0},
aK(a){return null},
a2(a){this.cR(A.aN("head",A.ab(null,null,t.K,t.N),null,!1))
return a},
cR(a){var s=this.b
s.O(a)
s.soH(B.a.gq(s.c))
s=this.a
s.x=s.gc4()}}
A.hc.prototype={
K(a){var s,r,q,p,o,n=this,m=null
switch(a.b){case"html":return n.a.ga5().K(a)
case"title":n.a.dk(a,"RCDATA")
return m
case"noscript":case"noframes":case"style":n.a.dk(a,"RAWTEXT")
return m
case"script":n.b.O(a)
s=n.a
r=s.c
r.sj(t.c.a(r.gbO()))
s.y=s.gaD()
s.x=s.giH()
return m
case"base":case"basefont":case"bgsound":case"command":case"link":s=n.b
s.O(a)
s=s.c
if(0>=s.length)return A.c(s,-1)
s.pop()
a.r=!0
return m
case"meta":s=n.b
s.O(a)
s=s.c
if(0>=s.length)return A.c(s,-1)
s.pop()
a.r=!0
q=a.e
s=n.a.c.a
if(!s.b){p=q.i(0,"charset")
o=q.i(0,"content")
if(p!=null)s.j5(p)
else if(o!=null)s.j5(new A.jg(new A.jp(o)).p8())}return m
case"head":n.a.a1(a.a,"two-heads-are-not-better-than-one")
return m
default:n.d7(new A.L("head",!1))
return a}},
P(a){var s,r=a.b
switch(r){case"head":this.d7(a)
return null
case"br":case"html":case"body":this.d7(new A.L("head",!1))
return a
default:s=t.z
this.a.G(a.a,"unexpected-end-tag",A.z(["name",r],s,s))
return null}},
a8(){this.d7(new A.L("head",!1))
return!0},
a2(a){this.d7(new A.L("head",!1))
return a},
d7(a){var s,r=this.a,q=r.d,p=q.c
if(0>=p.length)return A.c(p,-1)
p.pop()
s=r.ay
if(s===$){s!==$&&A.F("_afterHeadPhase")
s=r.ay=new A.fD(r,q)}r.x=s}}
A.fD.prototype={
K(a){var s,r=this,q=null,p=a.b
switch(p){case"html":return r.a.ga5().K(a)
case"body":p=r.a
p.z=!1
r.b.O(a)
p.x=p.ga5()
return q
case"frameset":r.b.O(a)
p=r.a
p.x=p.gij()
return q
case"base":case"basefont":case"bgsound":case"link":case"meta":case"noframes":case"script":case"style":case"title":r.lt(a)
return q
case"head":s=t.z
r.a.G(a.a,"unexpected-start-tag",A.z(["name",p],s,s))
return q
default:r.bA()
return a}},
P(a){var s,r=a.b
switch(r){case"body":case"html":case"br":this.bA()
return a
default:s=t.z
this.a.G(a.a,"unexpected-end-tag",A.z(["name",r],s,s))
return null}},
a8(){this.bA()
return!0},
a2(a){this.bA()
return a},
lt(a){var s,r,q=this.a,p=t.z
q.G(a.a,"unexpected-start-tag-out-of-my-head",A.z(["name",a.b],p,p))
p=this.b
s=p.c
B.a.p(s,t.h.a(p.e))
q.gc4().K(a)
for(q=A.v(s).h("Y<1>"),p=new A.Y(s,q),p=new A.O(p,p.gn(p),q.h("O<B.E>")),q=q.h("B.E");p.m();){r=p.d
if(r==null)r=q.a(r)
if(r.x==="head"){B.a.a3(s,r)
break}}},
bA(){this.b.O(A.aN("body",A.ab(null,null,t.K,t.N),null,!1))
var s=this.a
s.x=s.ga5()
s.z=!0}}
A.d9.prototype={
K(a){var s,r,q,p,o,n,m=this,l=null,k="p",j="button",i="unexpected-start-tag",h="unexpected-start-tag-implies-end-tag",g="RAWTEXT",f=a.b
switch(f){case"html":return m.bg(a)
case"base":case"basefont":case"bgsound":case"command":case"link":case"meta":case"noframes":case"script":case"style":case"title":return m.a.gc4().K(a)
case"body":m.lq(a)
return l
case"frameset":m.ls(a)
return l
case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":m.hI(a)
return l
case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":f=m.b
if(f.a0(k,j))m.bC(new A.L(k,!1))
s=f.c
if(B.a.F(B.F,B.a.gq(s).x)){r=t.z
m.a.G(a.a,i,A.z(["name",a.b],r,r))
if(0>=s.length)return A.c(s,-1)
s.pop()}f.O(a)
return l
case"pre":case"listing":f=m.b
if(f.a0(k,j))m.bC(new A.L(k,!1))
f.O(a)
m.a.z=!1
m.c=!0
return l
case"form":f=m.b
if(f.f!=null){f=t.z
m.a.G(a.a,i,A.z(["name","form"],f,f))}else{if(f.a0(k,j))m.bC(new A.L(k,!1))
f.O(a)
f.sjA(B.a.gq(f.c))}return l
case"li":case"dd":case"dt":m.lw(a)
return l
case"plaintext":f=m.b
if(f.a0(k,j))m.bC(new A.L(k,!1))
f.O(a)
f=m.a.c
f.sj(t.c.a(f.gpb()))
return l
case"a":f=m.b
q=f.jp("a")
if(q!=null){s=t.z
m.a.G(a.a,h,A.z(["startName","a","endName","a"],s,s))
m.jr(new A.L("a",!1))
B.a.a3(f.c,q)
B.a.a3(f.d.a,q)}f.aE()
m.fn(a)
return l
case"b":case"big":case"code":case"em":case"font":case"i":case"s":case"small":case"strike":case"strong":case"tt":case"u":m.b.aE()
m.fn(a)
return l
case"nobr":f=m.b
f.aE()
if(f.b3("nobr")){s=t.z
m.a.G(a.a,h,A.z(["startName","nobr","endName","nobr"],s,s))
m.P(new A.L("nobr",!1))
f.aE()}m.fn(a)
return l
case"button":return m.lr(a)
case"applet":case"marquee":case"object":f=m.b
f.aE()
f.O(a)
f.d.p(0,l)
m.a.z=!1
return l
case"xmp":f=m.b
if(f.a0(k,j))m.bC(new A.L(k,!1))
f.aE()
f=m.a
f.z=!1
f.dk(a,g)
return l
case"table":f=m.a
if(f.r!=="quirks")if(m.b.a0(k,j))m.P(new A.L(k,!1))
m.b.O(a)
f.z=!1
f.x=f.gaI()
return l
case"area":case"br":case"embed":case"img":case"keygen":case"wbr":m.hN(a)
return l
case"param":case"source":case"track":f=m.b
f.O(a)
f=f.c
if(0>=f.length)return A.c(f,-1)
f.pop()
a.r=!0
return l
case"input":f=m.a
p=f.z
m.hN(a)
s=a.e.i(0,"type")
if(s==null)s=l
else{r=t.E
r=A.ae(new A.J(new A.a9(s),r.h("i(w.E)").a(A.bU()),r.h("J<w.E,i>")),0,l)
s=r}if(s==="hidden")f.z=p
return l
case"hr":f=m.b
if(f.a0(k,j))m.bC(new A.L(k,!1))
f.O(a)
f=f.c
if(0>=f.length)return A.c(f,-1)
f.pop()
a.r=!0
m.a.z=!1
return l
case"image":f=t.z
m.a.G(a.a,"unexpected-start-tag-treated-as",A.z(["originalName","image","newName","img"],f,f))
m.K(A.aN("img",a.e,l,a.c))
return l
case"isindex":m.lv(a)
return l
case"textarea":m.b.O(a)
f=m.a
s=f.c
s.sj(t.c.a(s.gcI()))
m.c=!0
f.z=!1
return l
case"iframe":f=m.a
f.z=!1
f.dk(a,g)
return l
case"noembed":case"noscript":m.a.dk(a,g)
return l
case"select":f=m.b
f.aE()
f.O(a)
f=m.a
f.z=!1
if(f.gaI()===f.gaD()||f.gig()===f.gaD()||f.gii()===f.gaD()||f.gfg()===f.gaD()||f.gff()===f.gaD()||f.gih()===f.gaD()){o=f.go
if(o===$){o!==$&&A.F("_inSelectInTablePhase")
o=f.go=new A.hd(f,f.d)}f.x=o}else f.x=f.gc5()
return l
case"rp":case"rt":f=m.b
if(f.b3("ruby")){f.ck()
n=B.a.gq(f.c)
if(n.x!=="ruby")m.a.a1(n.e,"undefined-error")}f.O(a)
return l
case"option":case"optgroup":f=m.b
if(B.a.gq(f.c).x==="option")m.a.gaD().P(new A.L("option",!1))
f.aE()
m.a.d.O(a)
return l
case"math":f=m.b
f.aE()
s=m.a
s.iQ(a)
s.fo(a)
a.w="http://www.w3.org/1998/Math/MathML"
f.O(a)
if(a.c){f=f.c
if(0>=f.length)return A.c(f,-1)
f.pop()
a.r=!0}return l
case"svg":f=m.b
f.aE()
s=m.a
s.iR(a)
s.fo(a)
a.w="http://www.w3.org/2000/svg"
f.O(a)
if(a.c){f=f.c
if(0>=f.length)return A.c(f,-1)
f.pop()
a.r=!0}return l
case"caption":case"col":case"colgroup":case"frame":case"head":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":s=t.z
m.a.G(a.a,"unexpected-start-tag-ignored",A.z(["name",f],s,s))
return l
default:f=m.b
f.aE()
f.O(a)
return l}},
P(a){var s,r,q,p,o,n=this,m=null,l="end-tag-too-early",k="unexpected-end-tag",j=a.b
switch(j){case"body":n.jq(a)
return m
case"html":return n.fM(a)
case"address":case"article":case"aside":case"blockquote":case"button":case"center":case"details":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"listing":case"menu":case"nav":case"ol":case"pre":case"section":case"summary":case"ul":if(j==="pre")n.c=!1
s=n.b
r=s.b3(j)
if(r)s.ck()
j=B.a.gq(s.c).x
s=a.b
if(j!=s){j=t.z
n.a.G(a.a,l,A.z(["name",s],j,j))}if(r)n.cF(a)
return m
case"form":j=n.b
q=j.f
j.f=null
if(q==null||!j.b3(q)){j=t.z
n.a.G(a.a,k,A.z(["name","form"],j,j))}else{j.ck()
j=j.c
if(!J.U(B.a.gq(j),q)){s=t.z
n.a.G(a.a,"end-tag-too-early-ignored",A.z(["name","form"],s,s))}B.a.a3(j,q)}return m
case"p":n.bC(a)
return m
case"dd":case"dt":case"li":p=j==="li"?"list":m
s=n.b
j=s.a0(j,p)
o=a.b
if(!j){j=t.z
n.a.G(a.a,k,A.z(["name",o],j,j))}else{s.c0(o)
j=B.a.gq(s.c).x
s=a.b
if(j!=s){j=t.z
n.a.G(a.a,l,A.z(["name",s],j,j))}n.cF(a)}return m
case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":n.ob(a)
return m
case"a":case"b":case"big":case"code":case"em":case"font":case"i":case"nobr":case"s":case"small":case"strike":case"strong":case"tt":case"u":n.jr(a)
return m
case"applet":case"marquee":case"object":s=n.b
if(s.b3(j))s.ck()
j=B.a.gq(s.c).x
o=a.b
if(j!=o){j=t.z
n.a.G(a.a,l,A.z(["name",o],j,j))}if(s.b3(a.b)){n.cF(a)
s.fA()}return m
case"br":j=t.z
n.a.G(a.a,"unexpected-end-tag-treated-as",A.z(["originalName","br","newName","br element"],j,j))
j=n.b
j.aE()
j.O(A.aN("br",A.ab(m,m,t.K,t.N),m,!1))
j=j.c
if(0>=j.length)return A.c(j,-1)
j.pop()
return m
default:n.od(a)
return m}},
oR(a,b){var s,r
if(a.x!=b.x||a.w!=b.w)return!1
else{s=a.b
if(s.a!==b.b.a)return!1
else for(s=A.o1(s,s.r,A.D(s).c);s.m();){r=s.d
if(!J.U(a.b.i(0,r),b.b.i(0,r)))return!1}}return!0},
fn(a){var s,r,q,p,o,n,m=this.b
m.O(a)
s=B.a.gq(m.c)
r=A.a([],t.hg)
for(m=m.d,q=A.D(m).h("Y<w.E>"),p=new A.Y(m,q),p=new A.O(p,p.gn(p),q.h("O<B.E>")),o=t.h,q=q.h("B.E");p.m();){n=p.d
if(n==null)n=q.a(n)
if(n==null)break
else{o.a(n)
if(this.oR(n,s))B.a.p(r,n)}}if(r.length===3)B.a.a3(m.a,B.a.gq(r))
m.p(0,s)},
a8(){var s,r,q,p
for(s=this.b.c,r=A.v(s).h("Y<1>"),s=new A.Y(s,r),s=new A.O(s,s.gn(s),r.h("O<B.E>")),r=r.h("B.E");s.m();){q=s.d
if(q==null)q=r.a(q)
switch(q.x){case"dd":case"dt":case"li":case"p":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":case"body":case"html":continue}s=this.a
p=q.e
if(p==null){r=s.c.a
q=r.w
if(q==null)p=null
else{r=r.y
new A.b3(q,r).bh(q,r)
p=new A.at(q,r,r)
p.aG(q,r,r)}}B.a.p(s.e,new A.aZ("expected-closing-tag-but-got-eof",p,B.al))
break}return!1},
a2(a){var s
if(a.gaB(a)==="\x00")return null
s=this.b
s.aE()
s.bY(a.gaB(a),a.a)
s=this.a
if(s.z&&!A.ni(a.gaB(a)))s.z=!1
return null},
aK(a){var s,r,q,p=this
if(p.c){s=a.gaB(a)
r=p.c=!1
if(B.b.a_(s,"\n")){q=B.a.gq(p.b.c)
if(B.a.F(B.bx,q.x)){r=q.gal(q)
r=r.gah(r)}if(r)s=B.b.ar(s,1)}if(s.length!==0){r=p.b
r.aE()
r.bY(s,a.a)}}else{r=p.b
r.aE()
r.bY(a.gaB(a),a.a)}return null},
lq(a){var s,r=this.a,q=t.z
r.G(a.a,"unexpected-start-tag",A.z(["name","body"],q,q))
q=this.b.c
s=q.length
if(s!==1){if(1>=s)return A.c(q,1)
q=q[1].x!=="body"}else q=!0
if(!q){r.z=!1
a.e.bc(0,new A.k2(this))}},
ls(a){var s,r,q,p=this.a,o=t.z
p.G(a.a,"unexpected-start-tag",A.z(["name","frameset"],o,o))
o=this.b
s=o.c
r=s.length
if(r!==1){if(1>=r)return A.c(s,1)
q=s[1].x!=="body"}else q=!0
if(!q)if(p.z){if(1>=r)return A.c(s,1)
r=s[1].a
if(r!=null){r=r.gal(r)
if(1>=s.length)return A.c(s,1)
B.a.a3(r.a,s[1])}for(;B.a.gq(s).x!=="html";){if(0>=s.length)return A.c(s,-1)
s.pop()}o.O(a)
p.x=p.gij()}},
hI(a){var s=this.b
if(s.a0("p","button"))this.bC(new A.L("p",!1))
s.O(a)},
lw(a){var s,r,q,p,o,n,m,l,k,j,i=this.a
i.z=!1
s=a.b
s.toString
s=B.cK.i(0,s)
s.toString
for(r=this.b,q=r.c,p=A.v(q).h("Y<1>"),q=new A.Y(q,p),q=new A.O(q,q.gn(q),p.h("O<B.E>")),o=t.h2,p=p.h("B.E");q.m();){n=q.d
if(n==null)n=p.a(n)
m=n.x
if(B.a.F(s,m)){l=i.x
if(l===$){l=i.Q
if(l===$){k=new A.bz(i,i.d)
l!==$&&A.F("_initialPhase")
i.Q=k
l=k}l=i.x=l}l.P(new A.L(m,!1))
break}j=n.w
if(B.a.F(B.Y,new A.o(j==null?"http://www.w3.org/1999/xhtml":j,m,o))&&!B.a.F(B.bh,m))break}if(r.a0("p","button"))i.gaD().P(new A.L("p",!1))
r.O(a)},
lr(a){var s=this.b,r=this.a
if(s.b3("button")){s=t.z
r.G(a.a,"unexpected-start-tag-implies-end-tag",A.z(["startName","button","endName","button"],s,s))
this.P(new A.L("button",!1))
return a}else{s.aE()
s.O(a)
r.z=!1}return null},
hN(a){var s=this.b
s.aE()
s.O(a)
s=s.c
if(0>=s.length)return A.c(s,-1)
s.pop()
a.r=!0
this.a.z=!1},
lv(a){var s,r,q,p,o,n=this,m=null,l="action",k=t.z
n.a.G(a.a,"deprecated-tag",A.z(["name","isindex"],k,k))
if(n.b.f!=null)return
k=t.K
s=t.N
r=A.ab(m,m,k,s)
q=a.e.i(0,l)
if(q!=null)r.v(0,l,q)
n.K(A.aN("form",r,m,!1))
n.K(A.aN("hr",A.ab(m,m,k,s),m,!1))
n.K(A.aN("label",A.ab(m,m,k,s),m,!1))
p=a.e.i(0,"prompt")
if(p==null)p="This is a searchable index. Enter search keywords: "
n.a2(new A.G(m,p))
o=A.hk(a.e,k,s)
o.a3(0,l)
o.a3(0,"prompt")
o.v(0,"name","isindex")
n.K(A.aN("input",o,m,a.c))
n.P(new A.L("label",!1))
n.K(A.aN("hr",A.ab(m,m,k,s),m,!1))
n.P(new A.L("form",!1))},
bC(a){var s=this,r="unexpected-end-tag",q=s.b
if(!q.a0("p","button")){s.hI(A.aN("p",A.ab(null,null,t.K,t.N),null,!1))
q=t.z
s.a.G(a.a,r,A.z(["name","p"],q,q))
s.bC(new A.L("p",!1))}else{q.c0("p")
if(B.a.gq(q.c).x!=="p"){q=t.z
s.a.G(a.a,r,A.z(["name","p"],q,q))}s.cF(a)}},
jq(a){var s,r,q,p,o,n,m=this,l=m.b
if(!l.b3("body")){m.a.a1(a.a,"undefined-error")
return}else{l=l.c
if(B.a.gq(l).x==="body")B.a.gq(l)
else for(l=A.nv(l,2,null,t.h),s=l.length,r=0;r<s;++r){q=l[r].x
switch(q){case"dd":case"dt":case"li":case"optgroup":case"option":case"p":case"rp":case"rt":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":case"body":case"html":continue}l=m.a
p=a.a
s=t.z
s=A.z(["gotName","body","expectedName",q],s,s)
if(p==null){q=l.c.a
o=q.w
if(o==null)p=null
else{q=q.y
new A.b3(o,q).bh(o,q)
p=new A.at(o,q,q)
p.aG(o,q,q)}}B.a.p(l.e,new A.aZ("expected-one-end-tag-but-got-another",p,s))
break}}l=m.a
n=l.k1
if(n===$){n!==$&&A.F("_afterBodyPhase")
n=l.k1=new A.fB(l,l.d)}l.x=n},
fM(a){if(this.b.b3("body")){this.jq(new A.L("body",!1))
return a}return null},
ob(a){var s,r,q,p,o,n,m
for(s=this.b,r=0;r<6;++r)if(s.b3(B.F[r])){q=s.c
p=B.a.gq(q).x
if(p!=null&&B.a.F(B.V,p)){if(0>=q.length)return A.c(q,-1)
q.pop()
s.c0(null)}break}q=s.c
o=B.a.gq(q).x
n=a.b
if(o!=n){o=t.z
this.a.G(a.a,"end-tag-too-early",A.z(["name",n],o,o))}for(r=0;r<6;++r)if(s.b3(B.F[r])){if(0>=q.length)return A.c(q,-1)
m=q.pop()
for(;!B.a.F(B.F,m.x);){if(0>=q.length)return A.c(q,-1)
m=q.pop()}break}},
jr(b8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=null,b7="nodes"
for(s=this.b,r=s.d,q=r.a,p=A.D(r).h("aY.E"),o=s.c,n=t.K,m=t.N,l=t.h,k=t.d,j=t.h2,i=this.a,h=t.z,g=i.c.a,i=i.e,f=0;f<8;){++f
e=s.jp(b8.b)
if(e!=null)d=B.a.F(o,e)&&!s.b3(e.x)
else d=!0
if(d){c=b8.a
s=A.z(["name",b8.b],h,h)
if(c==null){r=g.w
if(r==null)c=b6
else{q=g.y
new A.b3(r,q).bh(r,q)
c=new A.at(r,q,q)
c.aG(r,q,q)}}B.a.p(i,new A.aZ("adoption-agency-1.1",c,s))
return}else if(!B.a.F(o,e)){c=b8.a
s=A.z(["name",b8.b],h,h)
if(c==null){r=g.w
if(r==null)c=b6
else{p=g.y
new A.b3(r,p).bh(r,p)
c=new A.at(r,p,p)
c.aG(r,p,p)}}B.a.p(i,new A.aZ("adoption-agency-1.2",c,s))
B.a.a3(q,e)
return}d=B.a.gq(o)
if(e==null?d!=null:e!==d){c=b8.a
d=A.z(["name",b8.b],h,h)
if(c==null){b=g.w
if(b==null)c=b6
else{a=g.y
new A.b3(b,a).bh(b,a)
c=new A.at(b,a,a)
c.aG(b,a,a)}}B.a.p(i,new A.aZ("adoption-agency-1.3",c,d))}a0=B.a.ak(o,e)
d=A.nv(o,a0,b6,l)
b=d.length
a2=0
while(!0){if(!(a2<d.length)){a1=b6
break}a3=d[a2]
a4=a3.w
if(a4==null)a4="http://www.w3.org/1999/xhtml"
if(B.a.F(B.Y,new A.o(a4,a3.x,j))){a1=a3
break}d.length===b||(0,A.e)(d);++a2}if(a1==null){if(0>=o.length)return A.c(o,-1)
a3=o.pop()
for(;a3!==e;){if(0>=o.length)return A.c(o,-1)
a3=o.pop()}B.a.a3(q,a3)
return}d=a0-1
if(!(d>=0&&d<o.length))return A.c(o,d)
a5=o[d]
a6=r.ak(r,e)
a7=B.a.ak(o,a1)
for(a8=a1,a9=0;a9<3;){++a9;--a7
if(!(a7>=0&&a7<o.length))return A.c(o,a7)
b0=o[a7]
if(!r.F(r,b0)){B.a.a3(o,b0)
continue}if(b0===e)break
if(a8===a1)a6=r.ak(r,b0)+1
d=b0.x
b1=new A.W(b0.w,d,A.ab(b6,b6,n,m))
b1.sd2(0,A.hk(b0.b,n,m))
b2=b0.dG(b1,!1,l)
B.a.v(q,r.ak(r,b0),p.a(b2))
B.a.v(o,B.a.ak(o,b0),b2)
d=a8.a
if(d!=null){b3=d.c
if(b3===$){b=A.a([],k)
d.c!==$&&A.F(b7)
b3=d.c=new A.ad(d,b)}B.a.a3(b3.a,a8)}b3=b2.c
if(b3===$){d=A.a([],k)
b2.c!==$&&A.F(b7)
b3=b2.c=new A.ad(b2,d)}d=a8.a
if(d!=null){b4=d.c
if(b4===$){b=A.a([],k)
d.c!==$&&A.F(b7)
b4=d.c=new A.ad(d,b)}B.a.a3(b4.a,a8)}a8.a=b3.b
b3.bQ(0,a8)
a8=b2}d=a8.a
if(d!=null){b3=d.c
if(b3===$){b=A.a([],k)
d.c!==$&&A.F(b7)
b3=d.c=new A.ad(d,b)}B.a.a3(b3.a,a8)}if(B.a.F(B.W,a5.x)){b5=s.eM()
d=b5[0]
b=b5[1]
b3=d.c
if(b==null){if(b3===$){b=A.a([],k)
d.c!==$&&A.F(b7)
b3=d.c=new A.ad(d,b)}d=a8.a
if(d!=null){b4=d.c
if(b4===$){b=A.a([],k)
d.c!==$&&A.F(b7)
b4=d.c=new A.ad(d,b)}B.a.a3(b4.a,a8)}a8.a=b3.b
b3.bQ(0,a8)}else{if(b3===$){a=A.a([],k)
d.c!==$&&A.F(b7)
b1=d.c=new A.ad(d,a)
b4=b1
b3=b4}else b4=b3
if(b4===$){a=A.a([],k)
d.c!==$&&A.F(b7)
b4=d.c=new A.ad(d,a)}d=b4.ak(b4,b)
b=a8.a
if(b!=null){b4=b.c
if(b4===$){a=A.a([],k)
b.c!==$&&A.F(b7)
b4=b.c=new A.ad(b,a)}B.a.a3(b4.a,a8)}a8.a=b3.b
b3.hQ(0,d,a8)}}else{b3=a5.c
if(b3===$){d=A.a([],k)
a5.c!==$&&A.F(b7)
b3=a5.c=new A.ad(a5,d)}d=a8.a
if(d!=null){b4=d.c
if(b4===$){b=A.a([],k)
d.c!==$&&A.F(b7)
b4=d.c=new A.ad(d,b)}B.a.a3(b4.a,a8)}a8.a=b3.b
b3.bQ(0,a8)}d=e.x
b1=new A.W(e.w,d,A.ab(b6,b6,n,m))
b1.sd2(0,A.hk(e.b,n,m))
d=e.dG(b1,!1,l)
b3=d.c
if(b3===$){b=A.a([],k)
d.c!==$&&A.F(b7)
b3=d.c=new A.ad(d,b)}b4=a1.c
if(b4===$){b=A.a([],k)
a1.c!==$&&A.F(b7)
b4=a1.c=new A.ad(a1,b)}b3.M(0,b4)
b3=a1.c
if(b3===$){b=A.a([],k)
a1.c!==$&&A.F(b7)
b3=a1.c=new A.ad(a1,b)}b3.bV(0)
b3=a1.c
if(b3===$){b=A.a([],k)
a1.c!==$&&A.F(b7)
b3=a1.c=new A.ad(a1,b)}b=d.a
if(b!=null){b4=b.c
if(b4===$){a=A.a([],k)
b.c!==$&&A.F(b7)
b4=b.c=new A.ad(b,a)}B.a.a3(b4.a,d)}d.a=b3.b
b3.bQ(0,d)
B.a.a3(q,e)
B.a.bF(q,A.a_(Math.min(a6,q.length)),p.a(d))
B.a.a3(o,e)
B.a.bF(o,B.a.ak(o,a1)+1,d)}},
od(a){var s,r,q,p,o,n,m,l,k,j,i,h="unexpected-end-tag"
for(s=this.b,r=s.c,q=A.v(r).h("Y<1>"),p=new A.Y(r,q),p=new A.O(p,p.gn(p),q.h("O<B.E>")),o=t.h2,q=q.h("B.E");p.m();){n=p.d
if(n==null)n=q.a(n)
m=n.x
l=a.b
if(m==l){k=B.a.gq(r).x
if(k!=l&&B.a.F(B.V,k)){if(0>=r.length)return A.c(r,-1)
r.pop()
s.c0(l)}s=B.a.gq(r).x
q=a.b
if(s!=q){s=this.a
j=a.a
p=t.z
p=A.z(["name",q],p,p)
if(j==null){q=s.c.a
o=q.w
if(o==null)j=null
else{q=q.y
new A.b3(o,q).bh(o,q)
j=new A.at(o,q,q)
j.aG(o,q,q)}}B.a.p(s.e,new A.aZ(h,j,p))}while(!0){if(0>=r.length)return A.c(r,-1)
if(!!J.U(r.pop(),n))break}break}else{i=n.w
if(B.a.F(B.Y,new A.o(i==null?"http://www.w3.org/1999/xhtml":i,m,o))){s=this.a
j=a.a
r=t.z
r=A.z(["name",a.b],r,r)
if(j==null){q=s.c.a
p=q.w
if(p==null)j=null
else{q=q.y
new A.b3(p,q).bh(p,q)
j=new A.at(p,q,q)
j.aG(p,q,q)}}B.a.p(s.e,new A.aZ(h,j,r))
break}}}}}
A.k2.prototype={
$2(a,b){var s
t.K.a(a)
A.ay(b)
s=this.a.b.c
if(1>=s.length)return A.c(s,1)
s[1].b.er(a,new A.k1(b))},
$S:25}
A.k1.prototype={
$0(){return this.a},
$S:9}
A.hX.prototype={
K(a){throw A.d(A.al("Cannot process start stag in text phase"))},
P(a){var s,r,q=this
if(a.b==="script"){s=q.b.c
if(0>=s.length)return A.c(s,-1)
s.pop()
s=q.a
r=s.y
r.toString
s.x=r
return null}s=q.b.c
if(0>=s.length)return A.c(s,-1)
s.pop()
s=q.a
r=s.y
r.toString
s.x=r
return null},
a2(a){this.b.bY(a.gaB(a),a.a)
return null},
a8(){var s=this.b.c,r=B.a.gq(s),q=this.a,p=t.z
q.G(r.e,"expected-named-closing-tag-but-got-eof",A.z(["name",r.x],p,p))
if(0>=s.length)return A.c(s,-1)
s.pop()
s=q.y
s.toString
q.x=s
return!0}}
A.ef.prototype={
K(a){var s,r,q=this,p=null
switch(a.b){case"html":return q.bg(a)
case"caption":q.fC()
s=q.b
s.d.p(0,p)
s.O(a)
s=q.a
s.x=s.gig()
return p
case"colgroup":q.hJ(a)
return p
case"col":q.hJ(A.aN("colgroup",A.ab(p,p,t.K,t.N),p,!1))
return a
case"tbody":case"tfoot":case"thead":q.hL(a)
return p
case"td":case"th":case"tr":q.hL(A.aN("tbody",A.ab(p,p,t.K,t.N),p,!1))
return a
case"table":return q.lx(a)
case"style":case"script":return q.a.gc4().K(a)
case"input":s=a.e.i(0,"type")
if(s==null)s=p
else{r=t.E
r=A.ae(new A.J(new A.a9(s),r.h("i(w.E)").a(A.bU()),r.h("J<w.E,i>")),0,p)
s=r}if(s==="hidden"){q.a.a1(a.a,"unexpected-hidden-input-in-table")
s=q.b
s.O(a)
s=s.c
if(0>=s.length)return A.c(s,-1)
s.pop()}else q.hK(a)
return p
case"form":q.a.a1(a.a,"unexpected-form-in-table")
s=q.b
if(s.f==null){s.O(a)
r=s.c
s.sjA(B.a.gq(r))
if(0>=r.length)return A.c(r,-1)
r.pop()}return p
default:q.hK(a)
return p}},
P(a){var s,r,q=this,p=a.b
switch(p){case"table":q.bX(a)
return null
case"body":case"caption":case"col":case"colgroup":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":s=t.z
q.a.G(a.a,"unexpected-end-tag",A.z(["name",p],s,s))
return null
default:s=q.a
r=t.z
s.G(a.a,"unexpected-end-tag-implies-table-voodoo",A.z(["name",p],r,r))
r=q.b
r.r=!0
s.ga5().P(a)
r.r=!1
return null}},
fC(){var s=this.b.c
while(!0){if(!(B.a.gq(s).x!=="table"&&B.a.gq(s).x!=="html"))break
if(0>=s.length)return A.c(s,-1)
s.pop()}},
a8(){var s=B.a.gq(this.b.c)
if(s.x!=="html")this.a.a1(s.e,"eof-in-table")
return!1},
aK(a){var s=this.a,r=s.gaD()
s.x=s.gdI()
s.gdI().c=r
s.gaD().aK(a)
return null},
a2(a){var s=this.a,r=s.gaD()
s.x=s.gdI()
s.gdI().c=r
s.gaD().a2(a)
return null},
hJ(a){var s
this.fC()
this.b.O(a)
s=this.a
s.x=s.gii()},
hL(a){var s
this.fC()
this.b.O(a)
s=this.a
s.x=s.gfg()},
lx(a){var s=this.a,r=t.z
s.G(a.a,"unexpected-start-tag-implies-end-tag",A.z(["startName","table","endName","table"],r,r))
s.gaD().P(new A.L("table",!1))
return a},
hK(a){var s=this.a,r=t.z
s.G(a.a,u.M,A.z(["name",a.b],r,r))
r=this.b
r.r=!0
s.ga5().K(a)
r.r=!1},
bX(a){var s,r,q=this,p=q.b
if(p.a0("table","table")){p.ck()
p=p.c
s=B.a.gq(p).x
if(s!=="table"){r=t.z
q.a.G(a.a,"end-tag-too-early-named",A.z(["gotName","table","expectedName",s],r,r))}for(;B.a.gq(p).x!=="table";){if(0>=p.length)return A.c(p,-1)
p.pop()}if(0>=p.length)return A.c(p,-1)
p.pop()
q.a.k6()}else q.a.a1(a.a,"undefined-error")}}
A.db.prototype={
dc(){var s,r,q=this,p=q.d
if(p.length===0)return
s=A.v(p)
r=new A.J(p,s.h("n(1)").a(new A.k3()),s.h("J<1,n>")).aC(0,"")
if(!A.ni(r)){p=q.a.gaI()
s=p.b
s.r=!0
p.a.ga5().a2(new A.G(null,r))
s.r=!1}else if(r.length!==0)q.b.bY(r,null)
q.snF(A.a([],t.ks))},
cf(a){var s
this.dc()
s=this.c
s.toString
this.a.x=s
return a},
a8(){this.dc()
var s=this.c
s.toString
this.a.x=s
return!0},
a2(a){if(a.gaB(a)==="\x00")return null
B.a.p(this.d,a)
return null},
aK(a){B.a.p(this.d,a)
return null},
K(a){var s
this.dc()
s=this.c
s.toString
this.a.x=s
return a},
P(a){var s
this.dc()
s=this.c
s.toString
this.a.x=s
return a},
snF(a){this.d=t.oX.a(a)}}
A.k3.prototype={
$1(a){t.g.a(a)
return a.gaB(a)},
$S:85}
A.ea.prototype={
K(a){switch(a.b){case"html":return this.bg(a)
case"caption":case"col":case"colgroup":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return this.ly(a)
default:return this.a.ga5().K(a)}},
P(a){var s,r=this,q=a.b
switch(q){case"caption":r.oa(a)
return null
case"table":return r.bX(a)
case"body":case"col":case"colgroup":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":s=t.z
r.a.G(a.a,"unexpected-end-tag",A.z(["name",q],s,s))
return null
default:return r.a.ga5().P(a)}},
a8(){this.a.ga5().a8()
return!1},
a2(a){return this.a.ga5().a2(a)},
ly(a){var s,r=this.a
r.a1(a.a,"undefined-error")
s=this.b.a0("caption","table")
r.gaD().P(new A.L("caption",!1))
if(s)return a
return null},
oa(a){var s,r,q=this,p=q.b
if(p.a0("caption","table")){p.ck()
s=p.c
if(B.a.gq(s).x!=="caption"){r=t.z
q.a.G(a.a,"expected-one-end-tag-but-got-another",A.z(["gotName","caption","expectedName",B.a.gq(s).x],r,r))}for(;B.a.gq(s).x!=="caption";){if(0>=s.length)return A.c(s,-1)
s.pop()}if(0>=s.length)return A.c(s,-1)
s.pop()
p.fA()
p=q.a
p.x=p.gaI()}else q.a.a1(a.a,"undefined-error")},
bX(a){var s,r=this.a
r.a1(a.a,"undefined-error")
s=this.b.a0("caption","table")
r.gaD().P(new A.L("caption",!1))
if(s)return a
return null}}
A.eb.prototype={
K(a){var s,r=this
switch(a.b){case"html":return r.bg(a)
case"col":s=r.b
s.O(a)
s=s.c
if(0>=s.length)return A.c(s,-1)
s.pop()
return null
default:s=B.a.gq(r.b.c).x
r.d6(new A.L("colgroup",!1))
return s==="html"?null:a}},
P(a){var s,r=this
switch(a.b){case"colgroup":r.d6(a)
return null
case"col":s=t.z
r.a.G(a.a,"no-end-tag",A.z(["name","col"],s,s))
return null
default:s=B.a.gq(r.b.c).x
r.d6(new A.L("colgroup",!1))
return s==="html"?null:a}},
a8(){if(B.a.gq(this.b.c).x==="html")return!1
else{this.d6(new A.L("colgroup",!1))
return!0}},
a2(a){var s=B.a.gq(this.b.c).x
this.d6(new A.L("colgroup",!1))
return s==="html"?null:a},
d6(a){var s=this.b.c,r=this.a
if(B.a.gq(s).x==="html")r.a1(a.a,"undefined-error")
else{if(0>=s.length)return A.c(s,-1)
s.pop()
r.x=r.gaI()}}}
A.cH.prototype={
K(a){var s,r=this,q=null,p=a.b
switch(p){case"html":return r.bg(a)
case"tr":r.hM(a)
return q
case"td":case"th":s=t.z
r.a.G(a.a,"unexpected-cell-in-table-body",A.z(["name",p],s,s))
r.hM(A.aN("tr",A.ab(q,q,t.K,t.N),q,!1))
return a
case"caption":case"col":case"colgroup":case"tbody":case"tfoot":case"thead":return r.bX(a)
default:return r.a.gaI().K(a)}},
P(a){var s,r=this,q=a.b
switch(q){case"tbody":case"tfoot":case"thead":r.e2(a)
return null
case"table":return r.bX(a)
case"body":case"caption":case"col":case"colgroup":case"html":case"td":case"th":case"tr":s=t.z
r.a.G(a.a,"unexpected-end-tag-in-table-body",A.z(["name",q],s,s))
return null
default:return r.a.gaI().P(a)}},
fB(){for(var s=this.b.c;!B.a.F(B.bA,B.a.gq(s).x);){if(0>=s.length)return A.c(s,-1)
s.pop()}B.a.gq(s).toString},
a8(){this.a.gaI().a8()
return!1},
aK(a){return this.a.gaI().aK(a)},
a2(a){return this.a.gaI().a2(a)},
hM(a){var s
this.fB()
this.b.O(a)
s=this.a
s.x=s.gff()},
e2(a){var s=this.b,r=this.a
if(s.a0(a.b,"table")){this.fB()
s=s.c
if(0>=s.length)return A.c(s,-1)
s.pop()
r.x=r.gaI()}else{s=t.z
r.G(a.a,"unexpected-end-tag-in-table-body",A.z(["name",a.b],s,s))}},
bX(a){var s=this,r="table",q=s.b
if(q.a0("tbody",r)||q.a0("thead",r)||q.a0("tfoot",r)){s.fB()
s.e2(new A.L(B.a.gq(q.c).x,!1))
return a}else s.a.a1(a.a,"undefined-error")
return null}}
A.ed.prototype={
K(a){var s,r,q=this
switch(a.b){case"html":return q.bg(a)
case"td":case"th":q.j7()
s=q.b
s.O(a)
r=q.a
r.x=r.gih()
s.d.p(0,null)
return null
case"caption":case"col":case"colgroup":case"tbody":case"tfoot":case"thead":case"tr":s=q.b.a0("tr","table")
q.e3(new A.L("tr",!1))
return!s?null:a
default:return q.a.gaI().K(a)}},
P(a){var s,r=this,q=a.b
switch(q){case"tr":r.e3(a)
return null
case"table":q=r.b.a0("tr","table")
r.e3(new A.L("tr",!1))
return!q?null:a
case"tbody":case"tfoot":case"thead":return r.e2(a)
case"body":case"caption":case"col":case"colgroup":case"html":case"td":case"th":s=t.z
r.a.G(a.a,"unexpected-end-tag-in-table-row",A.z(["name",q],s,s))
return null
default:return r.a.gaI().P(a)}},
j7(){var s,r,q,p,o,n,m,l,k
for(s=this.b.c,r=this.a,q=t.z,p=r.c.a;!0;){o=B.a.gq(s)
n=o.x
if(n==="tr"||n==="html")break
m=o.e
n=A.z(["name",B.a.gq(s).x],q,q)
if(m==null){l=p.w
if(l==null)m=null
else{k=p.y
new A.b3(l,k).bh(l,k)
m=new A.at(l,k,k)
m.aG(l,k,k)}}B.a.p(r.e,new A.aZ("unexpected-implied-end-tag-in-table-row",m,n))
if(0>=s.length)return A.c(s,-1)
s.pop()}},
a8(){this.a.gaI().a8()
return!1},
aK(a){return this.a.gaI().aK(a)},
a2(a){return this.a.gaI().a2(a)},
e3(a){var s=this.b,r=this.a
if(s.a0("tr","table")){this.j7()
s=s.c
if(0>=s.length)return A.c(s,-1)
s.pop()
r.x=r.gfg()}else r.a1(a.a,"undefined-error")},
e2(a){if(this.b.a0(a.b,"table")){this.e3(new A.L("tr",!1))
return a}else{this.a.a1(a.a,"undefined-error")
return null}}}
A.da.prototype={
K(a){switch(a.b){case"html":return this.bg(a)
case"caption":case"col":case"colgroup":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return this.lz(a)
default:return this.a.ga5().K(a)}},
P(a){var s,r=this,q=a.b
switch(q){case"td":case"th":r.fO(a)
return null
case"body":case"caption":case"col":case"colgroup":case"html":s=t.z
r.a.G(a.a,"unexpected-end-tag",A.z(["name",q],s,s))
return null
case"table":case"tbody":case"tfoot":case"thead":case"tr":return r.oc(a)
default:return r.a.ga5().P(a)}},
j8(){var s=this.b
if(s.a0("td","table"))this.fO(new A.L("td",!1))
else if(s.a0("th","table"))this.fO(new A.L("th",!1))},
a8(){this.a.ga5().a8()
return!1},
a2(a){return this.a.ga5().a2(a)},
lz(a){var s=this.b
if(s.a0("td","table")||s.a0("th","table")){this.j8()
return a}else{this.a.a1(a.a,"undefined-error")
return null}},
fO(a){var s,r=this,q=r.b,p=q.a0(a.b,"table"),o=a.b
if(p){q.c0(o)
p=q.c
o=B.a.gq(p).x
s=a.b
if(o!=s){p=t.z
r.a.G(a.a,"unexpected-cell-end-tag",A.z(["name",s],p,p))
r.cF(a)}else{if(0>=p.length)return A.c(p,-1)
p.pop()}q.fA()
q=r.a
q.x=q.gff()}else{q=t.z
r.a.G(a.a,"unexpected-end-tag",A.z(["name",o],q,q))}},
oc(a){if(this.b.a0(a.b,"table")){this.j8()
return a}else this.a.a1(a.a,"undefined-error")
return null}}
A.ee.prototype={
K(a){var s,r=this,q=null,p=a.b
switch(p){case"html":return r.bg(a)
case"option":p=r.b
s=p.c
if(B.a.gq(s).x==="option"){if(0>=s.length)return A.c(s,-1)
s.pop()}p.O(a)
return q
case"optgroup":p=r.b
s=p.c
if(B.a.gq(s).x==="option"){if(0>=s.length)return A.c(s,-1)
s.pop()}if(B.a.gq(s).x==="optgroup"){if(0>=s.length)return A.c(s,-1)
s.pop()}p.O(a)
return q
case"select":r.a.a1(a.a,"unexpected-select-in-select")
r.fN(new A.L("select",!1))
return q
case"input":case"keygen":case"textarea":return r.lu(a)
case"script":return r.a.gc4().K(a)
default:s=t.z
r.a.G(a.a,"unexpected-start-tag-in-select",A.z(["name",p],s,s))
return q}},
P(a){var s,r,q=this,p=null,o="unexpected-end-tag-in-select",n=a.b
switch(n){case"option":n=q.b.c
if(B.a.gq(n).x==="option"){if(0>=n.length)return A.c(n,-1)
n.pop()}else{n=t.z
q.a.G(a.a,o,A.z(["name","option"],n,n))}return p
case"optgroup":n=q.b.c
if(B.a.gq(n).x==="option"){s=n.length
r=s-2
if(!(r>=0))return A.c(n,r)
r=n[r].x==="optgroup"
s=r}else s=!1
if(s){if(0>=n.length)return A.c(n,-1)
n.pop()}if(B.a.gq(n).x==="optgroup"){if(0>=n.length)return A.c(n,-1)
n.pop()}else{n=t.z
q.a.G(a.a,o,A.z(["name","optgroup"],n,n))}return p
case"select":q.fN(a)
return p
default:s=t.z
q.a.G(a.a,o,A.z(["name",n],s,s))
return p}},
a8(){var s=B.a.gq(this.b.c)
if(s.x!=="html")this.a.a1(s.e,"eof-in-select")
return!1},
a2(a){if(a.gaB(a)==="\x00")return null
this.b.bY(a.gaB(a),a.a)
return null},
lu(a){var s="select"
this.a.a1(a.a,"unexpected-input-in-select")
if(this.b.a0(s,s)){this.fN(new A.L(s,!1))
return a}return null},
fN(a){var s=this.a
if(this.b.a0("select","select")){this.cF(a)
s.k6()}else s.a1(a.a,"undefined-error")}}
A.hd.prototype={
K(a){var s,r,q=a.b
switch(q){case"caption":case"table":case"tbody":case"tfoot":case"thead":case"tr":case"td":case"th":s=this.a
r=t.z
s.G(a.a,u.a,A.z(["name",q],r,r))
s.gc5().P(new A.L("select",!1))
return a
default:return this.a.gc5().K(a)}},
P(a){switch(a.b){case"caption":case"table":case"tbody":case"tfoot":case"thead":case"tr":case"td":case"th":return this.bX(a)
default:return this.a.gc5().P(a)}},
a8(){this.a.gc5().a8()
return!1},
a2(a){return this.a.gc5().a2(a)},
bX(a){var s=this.a,r=t.z
s.G(a.a,u.r,A.z(["name",a.b],r,r))
if(this.b.a0(a.b,"table")){s.gc5().P(new A.L("select",!1))
return a}return null}}
A.hb.prototype={
a2(a){var s
if(a.gaB(a)==="\x00"){a.c="\ufffd"
a.b=null}else{s=this.a
if(s.z&&!A.ni(a.gaB(a)))s.z=!1}return this.lV(a)},
K(a){var s,r,q,p,o,n=this,m=n.b,l=m.c,k=B.a.gq(l)
if(!B.a.F(B.b8,a.b))if(a.b==="font")s=a.e.aj("color")||a.e.aj("face")||a.e.aj("size")
else s=!1
else s=!0
if(s){s=n.a
r=t.z
s.G(a.a,u.G,A.z(["name",a.b],r,r))
m=m.a
r=t.h
q=t.iA
while(!0){if(B.a.gq(l).w!=m)if(!s.jK(B.a.gq(l))){p=r.a(B.a.gq(l))
p=!B.a.F(B.ae,new A.o(p.w,p.x,q))}else p=!1
else p=!1
if(!p)break
if(0>=l.length)return A.c(l,-1)
l.pop()}return a}else{s=k.w
if(s==="http://www.w3.org/1998/Math/MathML")n.a.iQ(a)
else if(s==="http://www.w3.org/2000/svg"){o=B.bF.i(0,a.b)
if(o!=null)a.b=o
n.a.iR(a)}n.a.fo(a)
a.w=s
m.O(a)
if(a.c){if(0>=l.length)return A.c(l,-1)
l.pop()
a.r=!0}return null}},
P(a){var s,r,q,p,o,n,m=this,l=null,k="_initialPhase",j=m.b,i=j.c,h=i.length-1,g=B.a.gq(i),f=g.x
if(f==null)f=l
else{s=t.E
s=A.ae(new A.J(new A.a9(f),s.h("i(w.E)").a(A.bU()),s.h("J<w.E,i>")),0,l)
f=s}s=a.b
if(f!=s){f=t.z
m.a.G(a.a,"unexpected-end-tag",A.z(["name",s],f,f))}j=j.a
f=t.E
s=f.h("i(w.E)")
f=f.h("J<w.E,i>")
while(!0){if(!!0){r=l
break}c$0:{q=g.x
q=q==null?l:A.ae(new A.J(new A.a9(q),s.a(A.bU()),f),0,l)
if(q==a.b){j=m.a
p=j.x
if(p===$){p=j.Q
if(p===$){o=new A.bz(j,j.d)
p!==$&&A.F(k)
j.Q=o
p=o}p=j.x=p}n=j.cy
if(n===$){f=A.a([],t.ks)
j.cy!==$&&A.F("_inTableTextPhase")
n=j.cy=new A.db(f,j,j.d)}if(p===n){p=j.x
if(p===$){p=j.Q
if(p===$){o=new A.bz(j,j.d)
p!==$&&A.F(k)
j.Q=o
p=o}p=j.x=p}t.aB.a(p)
p.dc()
f=p.c
f.toString
j.x=f}while(!0){if(0>=i.length)return A.c(i,-1)
if(!!J.U(i.pop(),g))break}r=l
break}--h
if(!(h>=0&&h<i.length))return A.c(i,h)
g=i[h]
if(g.w!=j)break c$0
else{j=m.a
p=j.x
if(p===$){p=j.Q
if(p===$){o=new A.bz(j,j.d)
p!==$&&A.F(k)
j.Q=o
p=o}p=j.x=p}r=p.P(a)
break}}}return r}}
A.fB.prototype={
K(a){var s,r,q=a.b
if(q==="html")return this.a.ga5().K(a)
s=this.a
r=t.z
s.G(a.a,"unexpected-start-tag-after-body",A.z(["name",q],r,r))
s.x=s.ga5()
return a},
P(a){var s,r,q=a.b
if(q==="html"){this.fM(a)
return null}s=this.a
r=t.z
s.G(a.a,"unexpected-end-tag-after-body",A.z(["name",q],r,r))
s.x=s.ga5()
return a},
a8(){return!1},
cf(a){var s=this.b,r=s.c
if(0>=r.length)return A.c(r,0)
s.cC(a,r[0])
return null},
a2(a){var s=this.a
s.a1(a.a,"unexpected-char-after-body")
s.x=s.ga5()
return a},
fM(a){var s,r,q,p
for(s=this.b.c,r=A.v(s).h("Y<1>"),s=new A.Y(s,r),s=new A.O(s,s.gn(s),r.h("O<B.E>")),r=r.h("B.E");s.m();){q=s.d
if((q==null?r.a(q):q).x==="html")break}s=this.a
p=s.k4
if(p===$){p!==$&&A.F("_afterAfterBodyPhase")
p=s.k4=new A.fz(s,s.d)}s.x=p}}
A.ec.prototype={
K(a){var s,r=this,q=a.b
switch(q){case"html":return r.bg(a)
case"frameset":r.b.O(a)
return null
case"frame":q=r.b
q.O(a)
q=q.c
if(0>=q.length)return A.c(q,-1)
q.pop()
return null
case"noframes":return r.a.ga5().K(a)
default:s=t.z
r.a.G(a.a,"unexpected-start-tag-in-frameset",A.z(["name",q],s,s))
return null}},
P(a){var s,r,q=this,p=a.b
switch(p){case"frameset":p=q.b.c
if(B.a.gq(p).x==="html")q.a.a1(a.a,u.q)
else{if(0>=p.length)return A.c(p,-1)
p.pop()}p=B.a.gq(p).x
if(p!=="frameset"){p=q.a
s=p.k3
if(s===$){s!==$&&A.F("_afterFramesetPhase")
s=p.k3=new A.fC(p,p.d)}p.x=s}return null
default:r=t.z
q.a.G(a.a,"unexpected-end-tag-in-frameset",A.z(["name",p],r,r))
return null}},
a8(){var s=B.a.gq(this.b.c)
if(s.x!=="html")this.a.a1(s.e,"eof-in-frameset")
return!1},
a2(a){this.a.a1(a.a,"unexpected-char-in-frameset")
return null}}
A.fC.prototype={
K(a){var s,r=a.b
switch(r){case"html":return this.bg(a)
case"noframes":return this.a.gc4().K(a)
default:s=t.z
this.a.G(a.a,"unexpected-start-tag-after-frameset",A.z(["name",r],s,s))
return null}},
P(a){var s,r,q=a.b,p=this.a
switch(q){case"html":s=p.ok
if(s===$){s!==$&&A.F("_afterAfterFramesetPhase")
s=p.ok=new A.fA(p,p.d)}p.x=s
return null
default:r=t.z
p.G(a.a,"unexpected-end-tag-after-frameset",A.z(["name",q],r,r))
return null}},
a8(){return!1},
a2(a){this.a.a1(a.a,"unexpected-char-after-frameset")
return null}}
A.fz.prototype={
K(a){var s,r,q=a.b
if(q==="html")return this.a.ga5().K(a)
s=this.a
r=t.z
s.G(a.a,"expected-eof-but-got-start-tag",A.z(["name",q],r,r))
s.x=s.ga5()
return a},
a8(){return!1},
cf(a){var s=this.b,r=s.b
r===$&&A.b("document")
s.cC(a,r)
return null},
aK(a){return this.a.ga5().aK(a)},
a2(a){var s=this.a
s.a1(a.a,"expected-eof-but-got-char")
s.x=s.ga5()
return a},
P(a){var s=this.a,r=t.z
s.G(a.a,"expected-eof-but-got-end-tag",A.z(["name",a.b],r,r))
s.x=s.ga5()
return a}}
A.fA.prototype={
K(a){var s,r=a.b,q=this.a
switch(r){case"html":return q.ga5().K(a)
case"noframes":return q.gc4().K(a)
default:s=t.z
q.G(a.a,"expected-eof-but-got-start-tag",A.z(["name",r],s,s))
return null}},
a8(){return!1},
cf(a){var s=this.b,r=s.b
r===$&&A.b("document")
s.cC(a,r)
return null},
aK(a){return this.a.ga5().aK(a)},
a2(a){this.a.a1(a.a,"expected-eof-but-got-char")
return null},
P(a){var s=t.z
this.a.G(a.a,"expected-eof-but-got-end-tag",A.z(["name",a.b],s,s))
return null}}
A.aZ.prototype={
l(a){var s,r,q=this.b
q.toString
s=B.bE.i(0,this.a)
s.toString
r=q.jN(0,A.u_(s,this.c),null)
return q.a.a==null?"ParserError on "+r:"On "+r},
$ibW:1}
A.kB.prototype={}
A.h_.prototype={
eu(){var s,r,q,p,o=A.mO(t.N),n=this.a.b.i(0,"class")
for(s=(n==null?"":n).split(" "),r=s.length,q=0;q<r;++q){p=J.nH(s[q])
if(p.length!==0)o.p(0,p)}return o}}
A.ii.prototype={
l(a){return this.eu().aC(0," ")},
gH(a){var s=this.eu()
return A.rG(s,s.r,A.D(s).c)},
gn(a){return this.eu().a}}
A.jp.prototype={
sau(a){if(this.b>=this.a.length)throw A.d(A.al("No more elements"))
this.b=a},
gau(){var s=this.b
if(s>=this.a.length)throw A.d(A.al("No more elements"))
if(s>=0)return s
else return 0},
mH(a){var s,r,q,p,o=this
t.pi.a(a)
if(a==null)a=A.pf()
s=o.gau()
for(r=o.a,q=r.length;s<q;){if(!(s>=0))return A.c(r,s)
p=r[s]
if(!A.az(a.$1(p))){o.b=s
return p}++s}o.b=s
return null},
iE(){return this.mH(null)},
mI(a){var s,r,q,p
t.gS.a(a)
s=this.gau()
for(r=this.a,q=r.length;s<q;){if(!(s>=0))return A.c(r,s)
p=r[s]
if(A.az(a.$1(p))){this.b=s
return p}++s}return null},
ip(a){var s=B.b.aN(this.a,a,this.gau())
if(s>=0){this.b=s+a.length-1
return!0}else throw A.d(A.al("No more elements"))},
fk(a,b){if(b==null)b=this.a.length
if(b<0)b+=this.a.length
return B.b.B(this.a,a,b)},
mJ(a){return this.fk(a,null)}}
A.jg.prototype={
p8(){var s,r,q,p,o,n,m,l
try{p=this.a
p.ip("charset")
p.sau(p.gau()+1)
p.iE()
o=p.a
n=p.gau()
m=o.length
if(!(n>=0&&n<m))return A.c(o,n)
if(o[n]!=="=")return null
p.sau(p.gau()+1)
p.iE()
n=p.gau()
if(!(n>=0&&n<m))return A.c(o,n)
if(o[n]!=='"'){n=p.gau()
if(!(n>=0&&n<m))return A.c(o,n)
n=o[n]==="'"}else n=!0
if(n){n=p.gau()
if(!(n>=0&&n<m))return A.c(o,n)
s=o[n]
p.sau(p.gau()+1)
r=p.gau()
p.ip(s)
p=p.fk(r,p.gau())
return p}else{q=p.gau()
try{p.mI(A.pf())
o=p.fk(q,p.gau())
return o}catch(l){if(A.bw(l) instanceof A.ck){p=p.mJ(q)
return p}else throw l}}}catch(l){if(A.bw(l) instanceof A.ck)return null
else throw l}}}
A.jY.prototype={
bq(a){var s,r,q,p,o,n,m,l,k,j,i=this
i.soi(A.mQ(t.N))
s=i.y=0
i.smm(A.a([],t.t))
r=i.f
if(r==null){q=i.a
q.toString
p=i.e
p.toString
r=A.te(q,p)
i.siA(r)}for(q=r.a,p=q.length,o=t.L,n=!1,m=!1;s<p;++s){l=B.b.E(q,s)
if(n){if(l===10){n=!1
continue}n=!1}o.a(r)
k=s+1
j=k<r.gn(r)&&(r.i(0,s)&64512)===55296&&(r.i(0,k)&64512)===56320
if(!j&&!m)if(A.tp(l)){k=i.r
k.dF(k.$ti.c.a("invalid-codepoint"))
if(55296<=l&&l<=57343)l=65533}if(l===13){n=!0
l=10}B.a.p(i.x,l)
m=j}i.w=A.rb(i.x,i.d)},
j5(a){var s=A.al("cannot change encoding when parsing a String.")
throw A.d(s)},
C(){var s,r,q=this,p=q.y,o=q.x
if(p>=o.length)return null
p=q.im(o,p)
o=q.x
s=q.y
r=s+1
if(p){q.y=r
p=o.length
if(!(s>=0&&s<p))return A.c(o,s)
s=o[s]
q.y=r+1
if(!(r>=0&&r<p))return A.c(o,r)
r=A.ae(A.a([s,o[r]],t.t),0,null)
p=r}else{q.y=r
if(!(s>=0&&s<o.length))return A.c(o,s)
p=A.bc(o[s])}return p},
pa(){var s,r,q=this,p=q.y,o=q.x
if(p>=o.length)return null
p=q.im(o,p)
o=q.x
s=q.y
r=o.length
if(p){if(!(s>=0&&s<r))return A.c(o,s)
p=o[s];++s
if(!(s<r))return A.c(o,s)
s=A.ae(A.a([p,o[s]],t.t),0,null)
p=s}else{if(!(s>=0&&s<r))return A.c(o,s)
p=A.bc(o[s])}return p},
im(a,b){var s,r
t.L.a(a)
s=b+1
r=J.X(a)
return s<r.gn(a)&&(A.a_(r.i(a,b))&64512)===55296&&(A.a_(r.i(a,s))&64512)===56320},
c9(a,b){var s,r,q=this,p=q.y,o=a.length
while(!0){s=q.pa()
if(s!=null)r=A.cy(a,s,0)===b
else r=!1
if(!r)break
q.y=q.y+s.length}return A.ae(B.a.b8(q.x,p,q.y),0,null)},
ba(a){return this.c9(a,!1)},
T(a){if(a!=null)this.y=this.y-a.length},
siA(a){this.f=t.f8.a(a)},
soi(a){this.r=t.f_.a(a)},
smm(a){this.x=t.L.a(a)}}
A.aY.prototype={
gn(a){return this.a.length},
gH(a){var s=this.a
return new J.aC(s,s.length,A.v(s).h("aC<1>"))},
i(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.c(s,b)
return s[b]},
v(a,b,c){B.a.v(this.a,b,A.D(this).h("aY.E").a(c))},
sn(a,b){B.a.sn(this.a,b)},
p(a,b){B.a.p(this.a,A.D(this).h("aY.E").a(b))},
bF(a,b,c){return B.a.bF(this.a,b,A.D(this).h("aY.E").a(c))},
M(a,b){B.a.M(this.a,A.D(this).h("j<aY.E>").a(b))}}
A.eB.prototype={
jX(a,b,c,d){var s,r,q,p,o,n
t.jB.a(d)
for(s=b.gal(b),s=s.gH(s),r=new A.cX(s,t.pl),q=c.b,p=this.gkh(),o=t.h;r.m();){n=o.a(s.gu())
this.a=n
if(B.a.b2(q,p))B.a.p(d,n)
this.jX(0,n,c,d)}},
ki(a){var s,r,q,p,o,n,m,l,k,j,i=this
t.dT.a(a)
s=i.a
for(r=a.b,q=A.v(r).h("Y<1>"),r=new A.Y(r,q),r=new A.O(r,r.gn(r),q.h("O<B.E>")),q=q.h("B.E"),p=!0,o=null;r.m();){n=r.d
if(n==null)n=q.a(n)
if(o==null)p=A.iI(n.c.R(i))
else if(o===514){m=n.c
do{l=i.a.a
k=l instanceof A.W?l:null
i.a=k}while(k!=null&&!A.iI(m.R(i)))
if(i.a==null)p=!1}else if(o===517){m=n.c
do{k=i.a
k=k.gep(k)
i.a=k}while(k!=null&&!A.iI(m.R(i)))
if(i.a==null)p=!1}if(!p)break
j=n.b
switch(j){case 515:n=i.a
i.a=n.gep(n)
break
case 516:l=i.a.a
i.a=l instanceof A.W?l:null
break
case 514:case 517:o=j
break
case 513:break
default:throw A.d(i.iL(a))}if(i.a==null){p=!1
break}}i.a=s
return p},
cX(a){return new A.eQ("'"+a.l(0)+"' selector of type "+A.dH(a).l(0)+" is not implemented")},
iL(a){return new A.e6("'"+a.l(0)+"' is not a valid selector",null,null)},
q_(a){var s=this,r=a.b
switch(r.gai(r)){case"root":r=s.a
return r.x==="html"&&r.a==null
case"empty":r=s.a
r=r.gal(r)
return r.b2(r,new A.kI())
case"blank":r=s.a
r=r.gal(r)
return r.b2(r,new A.kJ())
case"first-child":r=s.a
return r.gep(r)==null
case"last-child":r=s.a
return r.gjP(r)==null
case"only-child":r=s.a
if(r.gep(r)==null){r=s.a
r=r.gjP(r)==null}else r=!1
return r
case"link":return s.a.b.i(0,"href")!=null
case"visited":return!1}if(A.of(r.gai(r)))return!1
throw A.d(s.cX(a))},
q1(a){var s=a.b
if(A.of(s.gai(s)))return!1
throw A.d(this.cX(a))},
q0(a){return A.M(this.cX(a))},
pZ(a){var s,r,q,p,o,n,m=this,l=a.b
switch(l.gai(l)){case"nth-child":s=t.b9.a(a.f).b
l=s.length
if(l===1){if(0>=l)return A.c(s,0)
r=s[0] instanceof A.aj}else r=!1
if(r){if(0>=l)return A.c(s,0)
q=t.mH.a(s[0])
p=m.a.a
if(p!=null){l=A.lR(q.c)
if(l>0){r=p.gal(p)
l=r.ak(r,m.a)===l}else l=!1}else l=!1
return l}break
case"lang":l=t.b9.a(a.f)
l=l.a
l.toString
o=A.ae(B.t.b8(l.a.c,l.b,l.c),0,null)
n=A.r5(m.a)
return n!=null&&B.b.a_(n,o)}throw A.d(m.cX(a))},
pY(a){if(!A.iI(t.g9.a(a.b).R(this)))return!1
if(a.d instanceof A.cp)return!0
if(a.gjO()==="")return this.a.w==null
throw A.d(this.cX(a))},
pX(a){var s,r,q=a.b,p=this.a.b.i(0,q.gai(q).toLowerCase())
if(p==null)return!1
q=a.d
if(q===535)return!0
s=A.l(a.e)
switch(q){case 28:return p===s
case 530:return B.a.b2(A.a(p.split(" "),t.s),new A.kG(s))
case 531:if(B.b.a_(p,s)){q=p.length
r=s.length
if(q!==r){if(!(r<q))return A.c(p,r)
q=p[r]==="-"}else q=!0}else q=!1
return q
case 532:return B.b.a_(p,s)
case 533:return B.b.bk(p,s)
case 534:return B.b.F(p,s)
default:throw A.d(this.iL(a))}}}
A.kI.prototype={
$1(a){var s
t.J.a(a)
if(!(a instanceof A.W))if(a instanceof A.c1){s=J.bL(a.w)
a.w=s
s=s.length!==0}else s=!1
else s=!0
return!s},
$S:28}
A.kJ.prototype={
$1(a){var s
t.J.a(a)
if(!(a instanceof A.W))if(a instanceof A.c1){s=J.bL(a.w)
a.w=s
s=new A.hH(s).b2(0,new A.kH())}else s=!1
else s=!0
return!s},
$S:28}
A.kH.prototype={
$1(a){return!A.nq(A.a_(a))},
$S:17}
A.kG.prototype={
$1(a){A.ay(a)
return a.length!==0&&a===this.a},
$S:8}
A.b7.prototype={}
A.c0.prototype={}
A.cj.prototype={
gce(a){return 2},
saB(a,b){this.e=t.oP.a(b)}}
A.L.prototype={
gce(a){return 3}}
A.be.prototype={
gaB(a){var s=this,r=s.c
if(r==null){r=s.c=J.bL(s.b)
s.b=null}return r}}
A.m.prototype={
gce(a){return 6}}
A.G.prototype={
gce(a){return 1}}
A.cT.prototype={
gce(a){return 0}}
A.d5.prototype={
gce(a){return 4}}
A.dU.prototype={
gce(a){return 5}}
A.eK.prototype={}
A.mc.prototype={
$0(){var s,r,q=A.bp(t.N,t.I)
for(s=B.Z.gbo(),s=s.gH(s);s.m();){r=s.gu()
if(0>=r.length)return A.c(r,0)
J.mB(q.er(r[0],new A.mb()),r)}return q},
$S:94}
A.mb.prototype={
$0(){return A.a([],t.s)},
$S:36}
A.e9.prototype={
glA(a){var s=this.x
s===$&&A.b("state")
return s},
gu(){var s=this.at
s.toString
return s},
dJ(a){var s=this.Q
s.toString
B.a.gq(s).b=this.ay.l(0)},
cs(a){},
c6(a){this.dJ(a)},
bS(a){var s,r=this
A.ay(a)
if(r.Q==null)r.sf7(0,A.a([],t.kG))
s=r.ax
s.a=""
s.a=a
r.ay.a=""
s=r.Q
s.toString
B.a.p(s,new A.eK())},
m(){var s,r=this,q=r.a,p=r.r
while(!0){s=q.r
if(!(s.b===s.c&&p.b===p.c))break
if(!A.az(r.lB(0))){r.at=null
return!1}}if(!s.gah(s)){q=q.r.jZ()
r.at=new A.m(null,null,q)}else r.smN(p.jZ())
return!0},
bq(a){var s=this
s.z=0
s.r.bV(0)
s.w=null
s.y.a=""
s.sf7(0,null)
s.sf6(null)
s.sj(t.c.a(s.gD()))},
k(a){var s=this.r
s.dF(s.$ti.c.a(a))},
nS(a){var s,r,q,p,o,n,m,l,k=this,j=null,i="illegal-codepoint-for-numeric-entity"
if(a){s=A.tT()
r=16}else{s=A.tS()
r=10}q=A.a([],t.D)
p=k.a
o=p.C()
while(!0){if(!(A.az(s.$1(o))&&o!=null))break
B.a.p(q,o)
o=p.C()}n=A.cw(B.a.aS(q),r)
m=B.bG.i(0,n)
if(m!=null){l=t.z
l=A.z(["charAsInt",n],l,l)
k.k(new A.m(l,j,i))}else if(55296<=n&&n<=57343||n>1114111){l=t.z
l=A.z(["charAsInt",n],l,l)
k.k(new A.m(l,j,i))
m="\ufffd"}else{if(!(1<=n&&n<=8))if(!(14<=n&&n<=31))if(!(127<=n&&n<=159))l=64976<=n&&n<=65007||B.a.F(B.bd,n)
else l=!0
else l=!0
else l=!0
if(l){l=t.z
l=A.z(["charAsInt",n],l,l)
k.k(new A.m(l,j,i))}m=A.ae(A.a([n],t.t),0,j)}if(o!==";"){k.k(new A.m(j,j,"numeric-entity-without-semicolon"))
p.T(o)}return m},
dY(a,b){var s,r,q,p,o,n,m,l,k,j=this,i=null,h=j.a,g=A.a([h.C()],t.D)
if(0>=g.length)return A.c(g,0)
if(!A.a6(g[0])){if(0>=g.length)return A.c(g,0)
s=g[0]
s=s==="<"||s==="&"||s==null||a===s}else s=!0
if(s){if(0>=g.length)return A.c(g,0)
h.T(g[0])
r="&"}else{if(0>=g.length)return A.c(g,0)
s=g[0]
if(s==="#"){B.a.p(g,h.C())
if(B.a.gq(g)==="x"||B.a.gq(g)==="X"){B.a.p(g,h.C())
q=!0}else q=!1
if(!(q&&A.pt(B.a.gq(g))))s=!q&&A.ms(B.a.gq(g))
else s=!0
if(s){h.T(B.a.gq(g))
r=j.nS(q)}else{j.k(new A.m(i,i,"expected-numeric-entity"))
if(0>=g.length)return A.c(g,-1)
h.T(g.pop())
r="&"+B.a.aS(g)}}else{p=$.q_()
s.toString
o=p.i(0,s)
if(o==null)o=B.r
for(;B.a.gq(g)!=null;){s=J.q7(o,new A.k_(B.a.aS(g)))
o=A.h(s,!1,s.$ti.h("j.E"))
if(o.length===0)break
B.a.p(g,h.C())}m=g.length-1
while(!0){if(!(m>1)){n=i
break}l=B.a.aS(B.a.b8(g,0,m))
if(B.Z.aj(l)){n=l
break}--m}if(n!=null){s=n.length
p=s-1
if(!(p>=0))return A.c(n,p)
s=n[p]!==";"
if(s)j.k(new A.m(i,i,"named-entity-without-semicolon"))
if(s)if(b){if(!(m>=0&&m<g.length))return A.c(g,m)
s=g[m]
if(!(A.aS(s)||A.ms(s))){if(!(m<g.length))return A.c(g,m)
s=g[m]==="="}else s=!0}else s=!1
else s=!1
if(s){if(0>=g.length)return A.c(g,-1)
h.T(g.pop())
r="&"+B.a.aS(g)}else{r=B.Z.i(0,n)
if(0>=g.length)return A.c(g,-1)
h.T(g.pop())
r=A.l(r)+B.a.aS(A.nv(g,m,i,t.jv))}}else{j.k(new A.m(i,i,"expected-named-entity"))
if(0>=g.length)return A.c(g,-1)
h.T(g.pop())
r="&"+B.a.aS(g)}}}if(b)j.ay.a+=r
else{if(A.a6(r))k=new A.cT(i,r)
else k=new A.G(i,r)
j.k(k)}},
jd(){return this.dY(null,!1)},
b4(){var s,r,q,p,o,n,m,l=this,k=null,j=l.w
j.toString
if(j instanceof A.c0){s=j.b
if(s==null)s=k
else{r=t.E
r=A.ae(new A.J(new A.a9(s),r.h("i(w.E)").a(A.bU()),r.h("J<w.E,i>")),0,k)
s=r}j.b=s
if(j instanceof A.L){if(l.Q!=null)l.k(new A.m(k,k,"attributes-in-end-tag"))
if(j.c)l.k(new A.m(k,k,"this-closing-flag-on-end-tag"))
q=j}else if(j instanceof A.cj){j.saB(0,A.ab(k,k,t.K,t.N))
s=l.Q
if(s!=null)for(r=s.length,p=0;p<s.length;s.length===r||(0,A.e)(s),++p){o=s[p]
n=j.e
m=o.a
m.toString
n.er(m,new A.k0(o))}q=j}else q=j
l.sf7(0,k)
l.sf6(k)}else q=j
l.k(q)
l.sj(t.c.a(l.gD()))},
nX(){var s,r=this,q=null,p=r.a,o=p.C()
if(o==="&")r.sj(t.c.a(r.goe()))
else if(o==="<")r.sj(t.c.a(r.gpL()))
else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
r.k(new A.G(q,"\x00"))}else if(o==null)return!1
else if(A.a6(o)){p=p.c9(" \n\r\t\f",!0)
r.k(new A.cT(q,o+p))}else{s=p.ba("&<\x00")
r.k(new A.G(q,o+s))}return!0},
of(){this.jd()
this.sj(t.c.a(this.gD()))
return!0},
pw(){var s,r=this,q=null,p=r.a,o=p.C()
if(o==="&")r.sj(t.c.a(r.gnD()))
else if(o==="<")r.sj(t.c.a(r.gpu()))
else if(o==null)return!1
else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
r.k(new A.G(q,"\ufffd"))}else if(A.a6(o)){p=p.c9(" \n\r\t\f",!0)
r.k(new A.cT(q,o+p))}else{s=p.ba("&<")
r.k(new A.G(q,o+s))}return!0},
nE(){this.jd()
this.sj(t.c.a(this.gcI()))
return!0},
pp(){var s,r=this,q=null,p=r.a,o=p.C()
if(o==="<")r.sj(t.c.a(r.gpn()))
else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
r.k(new A.G(q,"\ufffd"))}else if(o==null)return!1
else{s=p.ba("<\x00")
r.k(new A.G(q,o+s))}return!0},
l6(){var s,r=this,q=null,p=r.a,o=p.C()
if(o==="<")r.sj(t.c.a(r.gl4()))
else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
r.k(new A.G(q,"\ufffd"))}else if(o==null)return!1
else{s=p.ba("<\x00")
r.k(new A.G(q,o+s))}return!0},
pc(){var s=this,r=null,q=s.a,p=q.C()
if(p==null)return!1
else if(p==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.k(new A.G(r,"\ufffd"))}else{q=q.ba("\x00")
s.k(new A.G(r,p+q))}return!0},
pM(){var s=this,r=null,q=s.a,p=q.C()
if(p==="!")s.sj(t.c.a(s.goW()))
else if(p==="/")s.sj(t.c.a(s.gnG()))
else if(A.aS(p)){s.w=A.aN(p,r,r,!1)
s.sj(t.c.a(s.gka()))}else if(p===">"){s.k(new A.m(r,r,"expected-tag-name-but-got-right-bracket"))
s.k(new A.G(r,"<>"))
s.sj(t.c.a(s.gD()))}else if(p==="?"){s.k(new A.m(r,r,"expected-tag-name-but-got-question-mark"))
q.T(p)
s.sj(t.c.a(s.gfw()))}else{s.k(new A.m(r,r,"expected-tag-name"))
s.k(new A.G(r,"<"))
q.T(p)
s.sj(t.c.a(s.gD()))}return!0},
nH(){var s,r=this,q=null,p=r.a,o=p.C()
if(A.aS(o)){r.w=new A.L(o,!1)
r.sj(t.c.a(r.gka()))}else if(o===">"){r.k(new A.m(q,q,u.g))
r.sj(t.c.a(r.gD()))}else if(o==null){r.k(new A.m(q,q,"expected-closing-tag-but-got-eof"))
r.k(new A.G(q,"</"))
r.sj(t.c.a(r.gD()))}else{s=t.z
s=A.z(["data",o],s,s)
r.k(new A.m(s,q,"expected-closing-tag-but-got-char"))
p.T(o)
r.sj(t.c.a(r.gfw()))}return!0},
pK(){var s,r=this,q=null,p=r.a.C()
if(A.a6(p))r.sj(t.c.a(r.gbB()))
else if(p===">")r.b4()
else if(p==null){r.k(new A.m(q,q,"eof-in-tag-name"))
r.sj(t.c.a(r.gD()))}else if(p==="/")r.sj(t.c.a(r.gbx()))
else if(p==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
s=t.fn.a(r.w)
s.b=A.l(s.b)+"\ufffd"}else{s=t.fn.a(r.w)
s.b=A.l(s.b)+p}return!0},
pv(){var s=this,r=s.a,q=r.C()
if(q==="/"){s.y.a=""
s.sj(t.c.a(s.gps()))}else{s.k(new A.G(null,"<"))
r.T(q)
s.sj(t.c.a(s.gcI()))}return!0},
pt(){var s=this,r=s.a,q=r.C()
if(A.aS(q)){s.y.a+=A.l(q)
s.sj(t.c.a(s.gpq()))}else{s.k(new A.G(null,"</"))
r.T(q)
s.sj(t.c.a(s.gcI()))}return!0},
dO(){var s=this.w
return s instanceof A.c0&&s.b.toLowerCase()===this.y.l(0).toLowerCase()},
pr(){var s,r=this,q=r.dO(),p=r.a,o=p.C()
if(A.a6(o)&&q){r.w=new A.L(r.y.l(0),!1)
r.sj(t.c.a(r.gbB()))}else if(o==="/"&&q){r.w=new A.L(r.y.l(0),!1)
r.sj(t.c.a(r.gbx()))}else if(o===">"&&q){r.w=new A.L(r.y.l(0),!1)
r.b4()
r.sj(t.c.a(r.gD()))}else{s=r.y
if(A.aS(o))s.a+=A.l(o)
else{s=s.l(0)
r.k(new A.G(null,"</"+s))
p.T(o)
r.sj(t.c.a(r.gcI()))}}return!0},
po(){var s=this,r=s.a,q=r.C()
if(q==="/"){s.y.a=""
s.sj(t.c.a(s.gpl()))}else{s.k(new A.G(null,"<"))
r.T(q)
s.sj(t.c.a(s.ges()))}return!0},
pm(){var s=this,r=s.a,q=r.C()
if(A.aS(q)){s.y.a+=A.l(q)
s.sj(t.c.a(s.gpj()))}else{s.k(new A.G(null,"</"))
r.T(q)
s.sj(t.c.a(s.ges()))}return!0},
pk(){var s,r=this,q=r.dO(),p=r.a,o=p.C()
if(A.a6(o)&&q){r.w=new A.L(r.y.l(0),!1)
r.sj(t.c.a(r.gbB()))}else if(o==="/"&&q){r.w=new A.L(r.y.l(0),!1)
r.sj(t.c.a(r.gbx()))}else if(o===">"&&q){r.w=new A.L(r.y.l(0),!1)
r.b4()
r.sj(t.c.a(r.gD()))}else{s=r.y
if(A.aS(o))s.a+=A.l(o)
else{s=s.l(0)
r.k(new A.G(null,"</"+s))
p.T(o)
r.sj(t.c.a(r.ges()))}}return!0},
l5(){var s=this,r=s.a,q=r.C()
if(q==="/"){s.y.a=""
s.sj(t.c.a(s.gkQ()))}else if(q==="!"){s.k(new A.G(null,"<!"))
s.sj(t.c.a(s.gkU()))}else{s.k(new A.G(null,"<"))
r.T(q)
s.sj(t.c.a(s.gbO()))}return!0},
kR(){var s=this,r=s.a,q=r.C()
if(A.aS(q)){s.y.a+=A.l(q)
s.sj(t.c.a(s.gkO()))}else{s.k(new A.G(null,"</"))
r.T(q)
s.sj(t.c.a(s.gbO()))}return!0},
kP(){var s,r=this,q=r.dO(),p=r.a,o=p.C()
if(A.a6(o)&&q){r.w=new A.L(r.y.l(0),!1)
r.sj(t.c.a(r.gbB()))}else if(o==="/"&&q){r.w=new A.L(r.y.l(0),!1)
r.sj(t.c.a(r.gbx()))}else if(o===">"&&q){r.w=new A.L(r.y.l(0),!1)
r.b4()
r.sj(t.c.a(r.gD()))}else{s=r.y
if(A.aS(o))s.a+=A.l(o)
else{s=s.l(0)
r.k(new A.G(null,"</"+s))
p.T(o)
r.sj(t.c.a(r.gbO()))}}return!0},
kV(){var s=this,r=s.a,q=r.C()
if(q==="-"){s.k(new A.G(null,"-"))
s.sj(t.c.a(s.gkS()))}else{r.T(q)
s.sj(t.c.a(s.gbO()))}return!0},
kT(){var s=this,r=s.a,q=r.C()
if(q==="-"){s.k(new A.G(null,"-"))
s.sj(t.c.a(s.ghA()))}else{r.T(q)
s.sj(t.c.a(s.gbO()))}return!0},
l3(){var s,r=this,q=null,p=r.a,o=p.C()
if(o==="-"){r.k(new A.G(q,"-"))
r.sj(t.c.a(r.gkX()))}else if(o==="<")r.sj(t.c.a(r.geP()))
else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
r.k(new A.G(q,"\ufffd"))}else if(o==null)r.sj(t.c.a(r.gD()))
else{s=p.ba("<-\x00")
r.k(new A.G(q,o+s))}return!0},
kY(){var s=this,r=null,q=s.a.C()
if(q==="-"){s.k(new A.G(r,"-"))
s.sj(t.c.a(s.ghA()))}else if(q==="<")s.sj(t.c.a(s.geP()))
else if(q==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.k(new A.G(r,"\ufffd"))
s.sj(t.c.a(s.gbf()))}else if(q==null)s.sj(t.c.a(s.gD()))
else{s.k(new A.G(r,q))
s.sj(t.c.a(s.gbf()))}return!0},
kW(){var s=this,r=null,q=s.a.C()
if(q==="-")s.k(new A.G(r,"-"))
else if(q==="<")s.sj(t.c.a(s.geP()))
else if(q===">"){s.k(new A.G(r,">"))
s.sj(t.c.a(s.gbO()))}else if(q==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.k(new A.G(r,"\ufffd"))
s.sj(t.c.a(s.gbf()))}else if(q==null)s.sj(t.c.a(s.gD()))
else{s.k(new A.G(r,q))
s.sj(t.c.a(s.gbf()))}return!0},
l2(){var s,r=this,q=r.a,p=q.C()
if(p==="/"){r.y.a=""
r.sj(t.c.a(r.gl0()))}else if(A.aS(p)){q=A.l(p)
r.k(new A.G(null,"<"+q))
s=r.y
s.a=""
s.a=q
r.sj(t.c.a(r.gkG()))}else{r.k(new A.G(null,"<"))
q.T(p)
r.sj(t.c.a(r.gbf()))}return!0},
l1(){var s=this,r=s.a,q=r.C()
if(A.aS(q)){r=s.y
r.a=""
r.a=A.l(q)
s.sj(t.c.a(s.gkZ()))}else{s.k(new A.G(null,"</"))
r.T(q)
s.sj(t.c.a(s.gbf()))}return!0},
l_(){var s,r=this,q=r.dO(),p=r.a,o=p.C()
if(A.a6(o)&&q){r.w=new A.L(r.y.l(0),!1)
r.sj(t.c.a(r.gbB()))}else if(o==="/"&&q){r.w=new A.L(r.y.l(0),!1)
r.sj(t.c.a(r.gbx()))}else if(o===">"&&q){r.w=new A.L(r.y.l(0),!1)
r.b4()
r.sj(t.c.a(r.gD()))}else{s=r.y
if(A.aS(o))s.a+=A.l(o)
else{s=s.l(0)
r.k(new A.G(null,"</"+s))
p.T(o)
r.sj(t.c.a(r.gbf()))}}return!0},
kH(){var s=this,r=s.a,q=r.C()
if(A.a6(q)||q==="/"||q===">"){s.k(new A.G(q==null?new A.a5(""):null,q))
r=t.c
if(s.y.l(0).toLowerCase()==="script")s.sj(r.a(s.gbN()))
else s.sj(r.a(s.gbf()))}else if(A.aS(q)){s.k(new A.G(q==null?new A.a5(""):null,q))
s.y.a+=A.l(q)}else{r.T(q)
s.sj(t.c.a(s.gbf()))}return!0},
kN(){var s=this,r=null,q=s.a.C()
if(q==="-"){s.k(new A.G(r,"-"))
s.sj(t.c.a(s.gkK()))}else if(q==="<"){s.k(new A.G(r,"<"))
s.sj(t.c.a(s.geO()))}else if(q==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.k(new A.G(r,"\ufffd"))}else if(q==null){s.k(new A.m(r,r,"eof-in-script-in-script"))
s.sj(t.c.a(s.gD()))}else s.k(new A.G(r,q))
return!0},
kL(){var s=this,r=null,q=s.a.C()
if(q==="-"){s.k(new A.G(r,"-"))
s.sj(t.c.a(s.gkI()))}else if(q==="<"){s.k(new A.G(r,"<"))
s.sj(t.c.a(s.geO()))}else if(q==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.k(new A.G(r,"\ufffd"))
s.sj(t.c.a(s.gbN()))}else if(q==null){s.k(new A.m(r,r,"eof-in-script-in-script"))
s.sj(t.c.a(s.gD()))}else{s.k(new A.G(r,q))
s.sj(t.c.a(s.gbN()))}return!0},
kJ(){var s=this,r=null,q=s.a.C()
if(q==="-")s.k(new A.G(r,"-"))
else if(q==="<"){s.k(new A.G(r,"<"))
s.sj(t.c.a(s.geO()))}else if(q===">"){s.k(new A.G(r,">"))
s.sj(t.c.a(s.gbO()))}else if(q==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.k(new A.G(r,"\ufffd"))
s.sj(t.c.a(s.gbN()))}else if(q==null){s.k(new A.m(r,r,"eof-in-script-in-script"))
s.sj(t.c.a(s.gD()))}else{s.k(new A.G(r,q))
s.sj(t.c.a(s.gbN()))}return!0},
kM(){var s=this,r=s.a,q=r.C()
if(q==="/"){s.k(new A.G(null,"/"))
s.y.a=""
s.sj(t.c.a(s.gkE()))}else{r.T(q)
s.sj(t.c.a(s.gbN()))}return!0},
kF(){var s=this,r=s.a,q=r.C()
if(A.a6(q)||q==="/"||q===">"){s.k(new A.G(q==null?new A.a5(""):null,q))
r=t.c
if(s.y.l(0).toLowerCase()==="script")s.sj(r.a(s.gbf()))
else s.sj(r.a(s.gbN()))}else if(A.aS(q)){s.k(new A.G(q==null?new A.a5(""):null,q))
s.y.a+=A.l(q)}else{r.T(q)
s.sj(t.c.a(s.gbN()))}return!0},
nn(){var s=this,r=null,q=s.a,p=q.C()
if(A.a6(p))q.c9(" \n\r\t\f",!0)
else{q=p==null
if(!q&&A.aS(p)){s.bS(p)
s.sj(t.c.a(s.gbU()))}else if(p===">")s.b4()
else if(p==="/")s.sj(t.c.a(s.gbx()))
else if(q){s.k(new A.m(r,r,"expected-attribute-name-but-got-eof"))
s.sj(t.c.a(s.gD()))}else if(B.b.F("'\"=<",p)){s.k(new A.m(r,r,"invalid-character-in-attribute-name"))
s.bS(p)
s.sj(t.c.a(s.gbU()))}else if(p==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.bS("\ufffd")
s.sj(t.c.a(s.gbU()))}else{s.bS(p)
s.sj(t.c.a(s.gbU()))}}return!0},
ng(){var s,r,q,p,o=this,n=null,m=o.a,l=m.C()
if(l==="="){o.sj(t.c.a(o.gj1()))
s=!0
r=!1}else if(A.aS(l)){q=o.ax
q.a+=A.l(l)
q.a+=m.c9("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",!0)
s=!1
r=!1}else if(l===">"){s=!0
r=!0}else{if(A.a6(l)){o.sj(t.c.a(o.gn2()))
s=!0}else if(l==="/"){o.sj(t.c.a(o.gbx()))
s=!0}else if(l==="\x00"){o.k(new A.m(n,n,"invalid-codepoint"))
o.ax.a+="\ufffd"
s=!1}else if(l==null){o.k(new A.m(n,n,"eof-in-attribute-name"))
o.sj(t.c.a(o.gD()))
s=!0}else{if(B.b.F("'\"<",l)){o.k(new A.m(n,n,"invalid-character-in-attribute-name"))
o.ax.a+=l}else o.ax.a+=l
s=!1}r=!1}if(s){o.dJ(-1)
m=o.ax.a
q=t.E
p=A.ae(new A.J(new A.a9(m.charCodeAt(0)==0?m:m),q.h("i(w.E)").a(A.bU()),q.h("J<w.E,i>")),0,n)
m=o.Q
m.toString
B.a.gq(m).a=p
if(o.as==null)o.sf6(A.o2(t.N))
if(o.as.F(0,p))o.k(new A.m(n,n,"duplicate-attribute"))
o.as.p(0,p)
if(r)o.b4()}return!0},
n3(){var s=this,r=null,q=s.a,p=q.C()
if(A.a6(p))q.c9(" \n\r\t\f",!0)
else if(p==="=")s.sj(t.c.a(s.gj1()))
else if(p===">")s.b4()
else{q=p==null
if(!q&&A.aS(p)){s.bS(p)
s.sj(t.c.a(s.gbU()))}else if(p==="/")s.sj(t.c.a(s.gbx()))
else if(p==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.bS("\ufffd")
s.sj(t.c.a(s.gbU()))}else if(q){s.k(new A.m(r,r,"expected-end-of-tag-but-got-eof"))
s.sj(t.c.a(s.gD()))}else if(B.b.F("'\"<",p)){s.k(new A.m(r,r,"invalid-character-after-attribute-name"))
s.bS(p)
s.sj(t.c.a(s.gbU()))}else{s.bS(p)
s.sj(t.c.a(s.gbU()))}}return!0},
no(){var s=this,r=null,q=s.a,p=q.C()
if(A.a6(p))q.c9(" \n\r\t\f",!0)
else if(p==='"'){s.cs(0)
s.sj(t.c.a(s.gnh()))}else if(p==="&"){s.sj(t.c.a(s.gdW()))
q.T(p)
s.cs(0)}else if(p==="'"){s.cs(0)
s.sj(t.c.a(s.gnj()))}else if(p===">"){s.k(new A.m(r,r,u.A))
s.b4()}else if(p==="\x00"){s.k(new A.m(r,r,"invalid-codepoint"))
s.cs(-1)
s.ay.a+="\ufffd"
s.sj(t.c.a(s.gdW()))}else if(p==null){s.k(new A.m(r,r,"expected-attribute-value-but-got-eof"))
s.sj(t.c.a(s.gD()))}else if(B.b.F("=<`",p)){s.k(new A.m(r,r,"equals-in-unquoted-attribute-value"))
s.cs(-1)
s.ay.a+=p
s.sj(t.c.a(s.gdW()))}else{s.cs(-1)
s.ay.a+=p
s.sj(t.c.a(s.gdW()))}return!0},
ni(){var s,r=this,q=null,p=r.a,o=p.C()
if(o==='"'){r.c6(-1)
r.dJ(0)
r.sj(t.c.a(r.giS()))}else if(o==="&")r.dY('"',!0)
else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
r.ay.a+="\ufffd"}else if(o==null){r.k(new A.m(q,q,"eof-in-attribute-value-double-quote"))
r.c6(-1)
r.sj(t.c.a(r.gD()))}else{s=r.ay
s.a+=o
s.a+=p.ba('"&')}return!0},
nk(){var s,r=this,q=null,p=r.a,o=p.C()
if(o==="'"){r.c6(-1)
r.dJ(0)
r.sj(t.c.a(r.giS()))}else if(o==="&")r.dY("'",!0)
else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
r.ay.a+="\ufffd"}else if(o==null){r.k(new A.m(q,q,"eof-in-attribute-value-single-quote"))
r.c6(-1)
r.sj(t.c.a(r.gD()))}else{s=r.ay
s.a+=o
s.a+=p.ba("'&")}return!0},
nl(){var s,r=this,q=null,p=r.a,o=p.C()
if(A.a6(o)){r.c6(-1)
r.sj(t.c.a(r.gbB()))}else if(o==="&")r.dY(">",!0)
else if(o===">"){r.c6(-1)
r.b4()}else if(o==null){r.k(new A.m(q,q,"eof-in-attribute-value-no-quotes"))
r.c6(-1)
r.sj(t.c.a(r.gD()))}else if(B.b.F("\"'=<`",o)){r.k(new A.m(q,q,u.V))
r.ay.a+=o}else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
r.ay.a+="\ufffd"}else{s=r.ay
s.a+=o
s.a+=p.ba("&>\"'=<` \n\r\t\f")}return!0},
n4(){var s=this,r=null,q=s.a,p=q.C()
if(A.a6(p))s.sj(t.c.a(s.gbB()))
else if(p===">")s.b4()
else if(p==="/")s.sj(t.c.a(s.gbx()))
else if(p==null){s.k(new A.m(r,r,"unexpected-EOF-after-attribute-value"))
q.T(p)
s.sj(t.c.a(s.gD()))}else{s.k(new A.m(r,r,u.H))
q.T(p)
s.sj(t.c.a(s.gbB()))}return!0},
l7(){var s=this,r=null,q=s.a,p=q.C()
if(p===">"){t.fn.a(s.w).c=!0
s.b4()}else if(p==null){s.k(new A.m(r,r,"unexpected-EOF-after-solidus-in-tag"))
q.T(p)
s.sj(t.c.a(s.gD()))}else{s.k(new A.m(r,r,u.B))
q.T(p)
s.sj(t.c.a(s.gbB()))}return!0},
nw(){var s=this,r=s.a,q=r.ba(">")
q=A.bv(q,"\x00","\ufffd")
s.k(new A.d5(null,q))
r.C()
s.sj(t.c.a(s.gD()))
return!0},
oX(){var s,r,q,p,o,n=this,m=null,l=n.a,k=A.a([l.C()],t.D)
if(B.a.gq(k)==="-"){B.a.p(k,l.C())
if(B.a.gq(k)==="-"){n.w=new A.d5(new A.a5(""),m)
n.sj(t.c.a(n.gnP()))
return!0}}else if(B.a.gq(k)==="d"||B.a.gq(k)==="D"){r=0
while(!0){if(!(r<6)){s=!0
break}q=B.bo[r]
p=l.C()
B.a.p(k,p)
if(p!=null)o=!A.cy(q,p,0)
else o=!0
if(o){s=!1
break}++r}if(s){n.w=new A.dU(!0)
n.sj(t.c.a(n.go3()))
return!0}}else{if(B.a.gq(k)==="["){o=n.f
if(o!=null){o=o.d.c
o=o.length!==0&&B.a.gq(o).w!=n.f.d.a}else o=!1}else o=!1
if(o){r=0
while(!0){if(!(r<6)){s=!0
break}q=B.by[r]
B.a.p(k,l.C())
if(B.a.gq(k)!==q){s=!1
break}++r}if(s){n.sj(t.c.a(n.gnA()))
return!0}}}n.k(new A.m(m,m,"expected-dashes-or-doctype"))
for(;o=k.length,o!==0;){if(0>=o)return A.c(k,-1)
o=k.pop()
if(o!=null)l.y=l.y-o.length}n.sj(t.c.a(n.gfw()))
return!0},
nQ(){var s,r=this,q=null,p=r.a.C()
if(p==="-")r.sj(t.c.a(r.gnN()))
else if(p==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
t.g.a(r.w).b.a+="\ufffd"}else if(p===">"){r.k(new A.m(q,q,"incorrect-comment"))
s=r.w
s.toString
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==null){r.k(new A.m(q,q,"eof-in-comment"))
s=r.w
s.toString
r.k(s)
r.sj(t.c.a(r.gD()))}else{t.g.a(r.w).b.a+=p
r.sj(t.c.a(r.gbW()))}return!0},
nO(){var s,r,q=this,p=null,o=q.a.C()
if(o==="-")q.sj(t.c.a(q.gja()))
else if(o==="\x00"){q.k(new A.m(p,p,"invalid-codepoint"))
t.g.a(q.w).b.a+="-\ufffd"}else if(o===">"){q.k(new A.m(p,p,"incorrect-comment"))
s=q.w
s.toString
q.k(s)
q.sj(t.c.a(q.gD()))}else if(o==null){q.k(new A.m(p,p,"eof-in-comment"))
s=q.w
s.toString
q.k(s)
q.sj(t.c.a(q.gD()))}else{s=t.g.a(q.w).b
r=s.a+="-"
s.a=r+o
q.sj(t.c.a(q.gbW()))}return!0},
nR(){var s,r=this,q=null,p=r.a,o=p.C()
if(o==="-")r.sj(t.c.a(r.gj9()))
else if(o==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
t.g.a(r.w).b.a+="\ufffd"}else if(o==null){r.k(new A.m(q,q,"eof-in-comment"))
p=r.w
p.toString
r.k(p)
r.sj(t.c.a(r.gD()))}else{s=t.g.a(r.w)
s.b.a+=o
p=p.ba("-\x00")
s.b.a+=p}return!0},
nL(){var s,r,q=this,p=null,o=q.a.C()
if(o==="-")q.sj(t.c.a(q.gja()))
else if(o==="\x00"){q.k(new A.m(p,p,"invalid-codepoint"))
t.g.a(q.w).b.a+="-\ufffd"
q.sj(t.c.a(q.gbW()))}else if(o==null){q.k(new A.m(p,p,"eof-in-comment-end-dash"))
s=q.w
s.toString
q.k(s)
q.sj(t.c.a(q.gD()))}else{s=t.g.a(q.w).b
r=s.a+="-"
s.a=r+o
q.sj(t.c.a(q.gbW()))}return!0},
nM(){var s,r,q=this,p=null,o=q.a.C()
if(o===">"){s=q.w
s.toString
q.k(s)
q.sj(t.c.a(q.gD()))}else if(o==="\x00"){q.k(new A.m(p,p,"invalid-codepoint"))
t.g.a(q.w).b.a+="--\ufffd"
q.sj(t.c.a(q.gbW()))}else if(o==="!"){q.k(new A.m(p,p,u.d))
q.sj(t.c.a(q.gnJ()))}else if(o==="-"){q.k(new A.m(p,p,u.K))
s=t.g.a(q.w)
o.toString
s.b.a+=o}else if(o==null){q.k(new A.m(p,p,"eof-in-comment-double-dash"))
s=q.w
s.toString
q.k(s)
q.sj(t.c.a(q.gD()))}else{q.k(new A.m(p,p,"unexpected-char-in-comment"))
s=t.g.a(q.w).b
r=s.a+="--"
s.a=r+o
q.sj(t.c.a(q.gbW()))}return!0},
nK(){var s,r,q=this,p=null,o=q.a.C()
if(o===">"){s=q.w
s.toString
q.k(s)
q.sj(t.c.a(q.gD()))}else if(o==="-"){t.g.a(q.w).b.a+="--!"
q.sj(t.c.a(q.gj9()))}else if(o==="\x00"){q.k(new A.m(p,p,"invalid-codepoint"))
t.g.a(q.w).b.a+="--!\ufffd"
q.sj(t.c.a(q.gbW()))}else if(o==null){q.k(new A.m(p,p,"eof-in-comment-end-bang-state"))
s=q.w
s.toString
q.k(s)
q.sj(t.c.a(q.gD()))}else{s=t.g.a(q.w).b
r=s.a+="--!"
s.a=r+o
q.sj(t.c.a(q.gbW()))}return!0},
o4(){var s=this,r=null,q=s.a,p=q.C()
if(A.a6(p))s.sj(t.c.a(s.gj2()))
else if(p==null){s.k(new A.m(r,r,"expected-doctype-name-but-got-eof"))
q=t.i.a(s.w)
q.e=!1
s.k(q)
s.sj(t.c.a(s.gD()))}else{s.k(new A.m(r,r,"need-space-after-doctype"))
q.T(p)
s.sj(t.c.a(s.gj2()))}return!0},
np(){var s,r=this,q=null,p=r.a.C()
if(A.a6(p))return!0
else if(p===">"){r.k(new A.m(q,q,u.f))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
t.i.a(r.w).d="\ufffd"
r.sj(t.c.a(r.gfJ()))}else if(p==null){r.k(new A.m(q,q,"expected-doctype-name-but-got-eof"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{t.i.a(r.w).d=p
r.sj(t.c.a(r.gfJ()))}return!0},
nZ(){var s,r,q,p=this,o=null,n=p.a.C()
if(A.a6(n)){s=t.i.a(p.w)
r=s.d
if(r==null)r=o
else{q=t.E
q=A.ae(new A.J(new A.a9(r),q.h("i(w.E)").a(A.bU()),q.h("J<w.E,i>")),0,o)
r=q}s.d=r
p.sj(t.c.a(p.gn5()))}else if(n===">"){s=t.i.a(p.w)
r=s.d
if(r==null)r=o
else{q=t.E
q=A.ae(new A.J(new A.a9(r),q.h("i(w.E)").a(A.bU()),q.h("J<w.E,i>")),0,o)
r=q}s.d=r
r=p.w
r.toString
p.k(r)
p.sj(t.c.a(p.gD()))}else if(n==="\x00"){p.k(new A.m(o,o,"invalid-codepoint"))
s=t.i.a(p.w)
s.d=A.l(s.d)+"\ufffd"
p.sj(t.c.a(p.gfJ()))}else if(n==null){p.k(new A.m(o,o,"eof-in-doctype-name"))
s=t.i.a(p.w)
s.e=!1
r=s.d
if(r==null)r=o
else{q=t.E
q=A.ae(new A.J(new A.a9(r),q.h("i(w.E)").a(A.bU()),q.h("J<w.E,i>")),0,o)
r=q}s.d=r
r=p.w
r.toString
p.k(r)
p.sj(t.c.a(p.gD()))}else{s=t.i.a(p.w)
s.d=A.l(s.d)+n}return!0},
n6(){var s,r,q,p,o=this,n=null,m=o.a,l=m.C()
if(A.a6(l))return!0
else if(l===">"){m=o.w
m.toString
o.k(m)
o.sj(t.c.a(o.gD()))}else if(l==null){t.i.a(o.w).e=!1
m.T(l)
o.k(new A.m(n,n,"eof-in-doctype"))
m=o.w
m.toString
o.k(m)
o.sj(t.c.a(o.gD()))}else{if(l==="p"||l==="P"){r=0
while(!0){if(!(r<5)){s=!0
break}q=B.bc[r]
l=m.C()
if(l!=null)p=!A.cy(q,l,0)
else p=!0
if(p){s=!1
break}++r}if(s){o.sj(t.c.a(o.gn8()))
return!0}}else if(l==="s"||l==="S"){r=0
while(!0){if(!(r<5)){s=!0
break}q=B.bs[r]
l=m.C()
if(l!=null)p=!A.cy(q,l,0)
else p=!0
if(p){s=!1
break}++r}if(s){o.sj(t.c.a(o.gnb()))
return!0}}m.T(l)
m=t.z
m=A.z(["data",l],m,m)
o.k(new A.m(m,n,u.S))
t.i.a(o.w).e=!1
o.sj(t.c.a(o.gcz()))}return!0},
n9(){var s=this,r=null,q=s.a,p=q.C()
if(A.a6(p))s.sj(t.c.a(s.gft()))
else if(p==="'"||p==='"'){s.k(new A.m(r,r,"unexpected-char-in-doctype"))
q.T(p)
s.sj(t.c.a(s.gft()))}else if(p==null){s.k(new A.m(r,r,"eof-in-doctype"))
q=t.i.a(s.w)
q.e=!1
s.k(q)
s.sj(t.c.a(s.gD()))}else{q.T(p)
s.sj(t.c.a(s.gft()))}return!0},
nq(){var s,r=this,q=null,p=r.a.C()
if(A.a6(p))return!0
else if(p==='"'){t.i.a(r.w).b=""
r.sj(t.c.a(r.go_()))}else if(p==="'"){t.i.a(r.w).b=""
r.sj(t.c.a(r.go1()))}else if(p===">"){r.k(new A.m(q,q,"unexpected-end-of-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{r.k(new A.m(q,q,"unexpected-char-in-doctype"))
t.i.a(r.w).e=!1
r.sj(t.c.a(r.gcz()))}return!0},
o0(){var s,r=this,q=null,p=r.a.C()
if(p==='"')r.sj(t.c.a(r.giT()))
else if(p==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
s=t.i.a(r.w)
s.b=A.l(s.b)+"\ufffd"}else if(p===">"){r.k(new A.m(q,q,"unexpected-end-of-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{s=t.i.a(r.w)
s.b=A.l(s.b)+p}return!0},
o2(){var s,r=this,q=null,p=r.a.C()
if(p==="'")r.sj(t.c.a(r.giT()))
else if(p==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
s=t.i.a(r.w)
s.b=A.l(s.b)+"\ufffd"}else if(p===">"){r.k(new A.m(q,q,"unexpected-end-of-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{s=t.i.a(r.w)
s.b=A.l(s.b)+p}return!0},
n7(){var s,r=this,q=null,p="unexpected-char-in-doctype",o=r.a.C()
if(A.a6(o))r.sj(t.c.a(r.gns()))
else if(o===">"){s=r.w
s.toString
r.k(s)
r.sj(t.c.a(r.gD()))}else if(o==='"'){r.k(new A.m(q,q,p))
t.i.a(r.w).c=""
r.sj(t.c.a(r.gfK()))}else if(o==="'"){r.k(new A.m(q,q,p))
t.i.a(r.w).c=""
r.sj(t.c.a(r.gfL()))}else if(o==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{r.k(new A.m(q,q,p))
t.i.a(r.w).e=!1
r.sj(t.c.a(r.gcz()))}return!0},
nt(){var s,r=this,q=null,p=r.a.C()
if(A.a6(p))return!0
else if(p===">"){s=r.w
s.toString
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==='"'){t.i.a(r.w).c=""
r.sj(t.c.a(r.gfK()))}else if(p==="'"){t.i.a(r.w).c=""
r.sj(t.c.a(r.gfL()))}else if(p==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{r.k(new A.m(q,q,"unexpected-char-in-doctype"))
t.i.a(r.w).e=!1
r.sj(t.c.a(r.gcz()))}return!0},
nc(){var s=this,r=null,q=s.a,p=q.C()
if(A.a6(p))s.sj(t.c.a(s.gfu()))
else if(p==="'"||p==='"'){s.k(new A.m(r,r,"unexpected-char-in-doctype"))
q.T(p)
s.sj(t.c.a(s.gfu()))}else if(p==null){s.k(new A.m(r,r,"eof-in-doctype"))
q=t.i.a(s.w)
q.e=!1
s.k(q)
s.sj(t.c.a(s.gD()))}else{q.T(p)
s.sj(t.c.a(s.gfu()))}return!0},
nr(){var s,r=this,q=null,p="unexpected-char-in-doctype",o=r.a.C()
if(A.a6(o))return!0
else if(o==='"'){t.i.a(r.w).c=""
r.sj(t.c.a(r.gfK()))}else if(o==="'"){t.i.a(r.w).c=""
r.sj(t.c.a(r.gfL()))}else if(o===">"){r.k(new A.m(q,q,p))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else if(o==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{r.k(new A.m(q,q,p))
t.i.a(r.w).e=!1
r.sj(t.c.a(r.gcz()))}return!0},
o5(){var s,r=this,q=null,p=r.a.C()
if(p==='"')r.sj(t.c.a(r.giU()))
else if(p==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
s=t.i.a(r.w)
s.c=A.l(s.c)+"\ufffd"}else if(p===">"){r.k(new A.m(q,q,"unexpected-end-of-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{s=t.i.a(r.w)
s.c=A.l(s.c)+p}return!0},
o6(){var s,r=this,q=null,p=r.a.C()
if(p==="'")r.sj(t.c.a(r.giU()))
else if(p==="\x00"){r.k(new A.m(q,q,"invalid-codepoint"))
s=t.i.a(r.w)
s.c=A.l(s.c)+"\ufffd"}else if(p===">"){r.k(new A.m(q,q,"unexpected-end-of-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{s=t.i.a(r.w)
s.c=A.l(s.c)+p}return!0},
na(){var s,r=this,q=null,p=r.a.C()
if(A.a6(p))return!0
else if(p===">"){s=r.w
s.toString
r.k(s)
r.sj(t.c.a(r.gD()))}else if(p==null){r.k(new A.m(q,q,"eof-in-doctype"))
s=t.i.a(r.w)
s.e=!1
r.k(s)
r.sj(t.c.a(r.gD()))}else{r.k(new A.m(q,q,"unexpected-char-in-doctype"))
r.sj(t.c.a(r.gcz()))}return!0},
nx(){var s=this,r=s.a,q=r.C()
if(q===">"){r=s.w
r.toString
s.k(r)
s.sj(t.c.a(s.gD()))}else if(q==null){r.T(q)
r=s.w
r.toString
s.k(r)
s.sj(t.c.a(s.gD()))}return!0},
nB(){var s,r,q,p=this,o=A.a([],t.s)
for(s=p.a,r=0;!0;){q=s.C()
if(q==null)break
if(q==="\x00"){p.k(new A.m(null,null,"invalid-codepoint"))
q="\ufffd"}B.a.p(o,q)
if(q==="]"&&r<2)++r
else{if(q===">"&&r===2){if(0>=o.length)return A.c(o,-1)
o.pop()
if(0>=o.length)return A.c(o,-1)
o.pop()
if(0>=o.length)return A.c(o,-1)
o.pop()
break}r=0}}if(o.length!==0){s=B.a.aS(o)
p.k(new A.G(null,s))}p.sj(t.c.a(p.gD()))
return!0},
sj(a){this.x=t.c.a(a)},
sf7(a,b){this.Q=t.jq.a(b)},
sf6(a){this.as=t.oA.a(a)},
smN(a){this.at=t.nU.a(a)},
$iV:1,
lB(a){return this.glA(this).$0()}}
A.k_.prototype={
$1(a){return B.b.a_(A.ay(a),this.a)},
$S:8}
A.k0.prototype={
$0(){var s=this.a.b
s===$&&A.b("value")
return s},
$S:9}
A.fy.prototype={
p(a,b){var s,r,q,p,o,n,m,l,k,j=this,i="http://www.w3.org/1999/xhtml"
t.mV.a(b)
if(b!=null)for(s=A.D(j).h("Y<w.E>"),r=new A.Y(j,s),r=new A.O(r,r.gn(r),s.h("O<B.E>")),q=b.x,p=b.w,s=s.h("B.E"),o=0;r.m();){n=r.d
if(n==null)n=s.a(n)
if(n==null)break
m=n.w
if(m==null)m=i
l=n.x
k=p==null?i:p
if(k===m&&q==l&&A.tz(n.b,b.b))++o
if(o===3){B.a.a3(j.a,n)
break}}j.bQ(0,b)}}
A.kT.prototype={
bq(a){var s=this
B.a.bV(s.c)
s.d.sn(0,0)
s.f=s.e=null
s.r=!1
s.b=A.nT()},
a0(a,b){var s,r,q,p,o,n,m,l,k,j,i,h="We should never reach this point",g="http://www.w3.org/1999/xhtml",f=a instanceof A.ak
if(b!=null)switch(b){case"button":s=B.U
r=B.b7
q=!1
break
case"list":s=B.U
r=B.be
q=!1
break
case"table":s=B.bD
r=B.X
q=!1
break
case"select":s=B.bz
r=B.X
q=!0
break
default:throw A.d(A.al(h))}else{s=B.U
r=B.X
q=!1}for(p=this.c,o=A.v(p).h("Y<1>"),p=new A.Y(p,o),p=new A.O(p,p.gn(p),o.h("O<B.E>")),n=t.h2,m=!f,o=o.h("B.E");p.m();){l=p.d
if(l==null)l=o.a(l)
if(m){k=l.x
k=k==null?a==null:k===a}else k=!1
if(!k)k=f&&l===a
else k=!0
if(k)return!0
else{j=l.w
k=j==null
i=k?g:j
l=l.x
if(!B.a.F(s,new A.o(i,l,n)))l=B.a.F(r,new A.o(k?g:j,l,n))
else l=!0
if(q!==l)return!1}}throw A.d(A.al(h))},
b3(a){return this.a0(a,null)},
aE(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=h.d
if(g.gn(g)===0)return
s=g.a
r=s.length
q=r-1
if(!(q>=0))return A.c(s,q)
p=s[q]
if(p==null||B.a.F(h.c,p))return
r=h.c
while(!0){if(!(p!=null&&!B.a.F(r,p)))break
if(q===0){q=-1
break}--q
if(!(q>=0&&q<s.length))return A.c(s,q)
p=s[q]}for(r=A.D(g).h("aY.E"),o=t.K,n=t.N;!0;){++q
if(!(q>=0&&q<s.length))return A.c(s,q)
p=s[q]
m=p.x
l=p.w
k=A.hk(p.b,o,n)
j=new A.cj(k,l,m,!1)
j.a=p.e
i=h.O(j)
B.a.v(s,q,r.a(i))
if(g.gn(g)===0)A.M(A.ah())
if(i===g.i(0,g.gn(g)-1))break}},
fA(){var s=this.d,r=s.dm(s)
while(!0){if(!(!s.gah(s)&&r!=null))break
r=s.dm(s)}},
jp(a){var s,r,q
for(s=this.d,r=A.D(s).h("Y<w.E>"),s=new A.Y(s,r),s=new A.O(s,s.gn(s),r.h("O<B.E>")),r=r.h("B.E");s.m();){q=s.d
if(q==null)q=r.a(q)
if(q==null)break
else if(q.x==a)return q}return null},
cC(a,b){var s=b.gal(b),r=A.nR(a.gaB(a))
r.e=a.a
s.p(0,r)},
jg(a,b){var s,r=b.b,q=b.w
if(q==null)q=this.a
this.b===$&&A.b("document")
s=A.mE(r,q===""?null:q)
s.sd2(0,b.e)
s.e=b.a
return s},
O(a){if(this.r)return this.oP(a)
return this.jE(a)},
jE(a){var s,r,q=a.b,p=a.w
if(p==null)p=this.a
this.b===$&&A.b("document")
s=A.mE(q,p===""?null:p)
s.sd2(0,a.e)
s.e=a.a
r=this.c
J.q3(B.a.gq(r)).p(0,s)
B.a.p(r,s)
return s},
oP(a){var s,r,q=this,p=q.jg(0,a),o=q.c
if(!B.a.F(B.W,B.a.gq(o).x))return q.jE(a)
else{s=q.eM()
r=s[1]
if(r==null){r=s[0]
r.gal(r).p(0,p)}else s[0].oO(0,p,r)
B.a.p(o,p)}return p},
bY(a,b){var s,r=this.c,q=B.a.gq(r)
if(this.r)r=!B.a.F(B.W,B.a.gq(r).x)
else r=!0
if(r)A.on(q,a,b,null)
else{s=this.eM()
r=s[0]
r.toString
A.on(r,a,b,t.mV.a(s[1]))}},
eM(){var s,r,q,p,o=this.c,n=A.v(o).h("Y<1>"),m=new A.Y(o,n)
m=new A.O(m,m.gn(m),n.h("O<B.E>"))
n=n.h("B.E")
while(!0){if(!m.m()){s=null
break}r=m.d
s=r==null?n.a(r):r
if(s.x==="table")break}if(s!=null){q=s.a
if(q!=null)p=s
else{n=B.a.ak(o,s)-1
if(!(n>=0&&n<o.length))return A.c(o,n)
q=o[n]
p=null}}else{if(0>=o.length)return A.c(o,0)
q=o[0]
p=null}return A.a([q,p],t.hg)},
c0(a){var s=this.c,r=B.a.gq(s).x
if(r!=a&&B.a.F(B.V,r)){if(0>=s.length)return A.c(s,-1)
s.pop()
this.c0(a)}},
ck(){return this.c0(null)},
soH(a){this.e=t.e1.a(a)},
sjA(a){this.f=t.mV.a(a)}}
A.o.prototype={
gX(a){return 37*J.aL(this.a)+J.aL(this.b)},
U(a,b){if(b==null)return!1
return b instanceof A.o&&b.a==this.a&&b.b==this.b}}
A.mf.prototype={
$2(a,b){var s,r,q,p,o,n,m,l,k,j=new A.a5(""),i="%("+A.l(a)+")"
for(s=this.a,r=i.length,q=J.bi(b),p=0,o="";n=s.a,m=B.b.aN(n,i,p),m>=0;){j.a=o+B.b.B(n,p,m)
m+=r
l=m
while(!0){o=s.a
if(!(l<o.length))return A.c(o,l)
if(!A.ms(o[l]))break;++l}if(l>m){k=A.cw(B.b.B(s.a,m,l),null)
m=l}else k=0
o=s.a
if(!(m<o.length))return A.c(o,m)
o=o[m]
switch(o){case"s":o=j.a+=A.l(b)
break
case"d":o=j.a+=A.py(q.l(b),k)
break
case"x":o=j.a+=A.py(B.d.pS(A.a_(b),16),k)
break
default:throw A.d(A.S("formatStr does not support format character "+o))}p=m+1}r=j.a=o+B.b.B(n,p,n.length)
s.a=r.charCodeAt(0)==0?r:r},
$S:21}
A.aT.prototype={
l(a){var s=this.b5(),r=this.r.b
r===$&&A.b("name")
return s+"("+r+", runTime: "+A.l(this.a)+"s)"},
b5(){var s=this.hS(0),r=A.ax("^Instance of '(.*?)'$").jz(s).b
if(1>=r.length)return A.c(r,1)
r=r[1]
r.toString
return r},
d3(){this.w=this.fH()
this.dh(0)},
fX(){this.dh(1)},
d4(a){},
fH(){return this.r.t()},
ds(){var s=this.w
s===$&&A.b("startingMobject")
return A.a([this.r,s],t.r)},
hm(){var s,r,q,p=A.a([],t.Z)
for(s=this.ds(),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q)p.push(s[q].du())
s=t.Y
return A.h(new A.ai(p,s),!0,s.h("j.E"))},
cj(a){var s,r,q
for(s=this.km(),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q)s[q].hj(a)},
km(){var s,r,q,p,o=A.a([],t.r)
for(s=this.ds(),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q]
o.push(p)}return o},
dh(a){a=Math.min(1,Math.max(a,0))
this.jJ(this.b.$1(a))},
jJ(a){var s,r,q,p,o,n=this.hm()
for(s=A.E(n.length,0,1),r=s.length,q=this.c,p=0;p<s.length;s.length===r||(0,A.e)(s),++p){o=s[p]
this.h0(B.a.i(n,o),Math.min(1,Math.max(a*((n.length-1)*q+1)-A.a_(o)*q,0)))}},
h0(a,b){t.a.a(a)}}
A.fG.prototype={
giX(){var s=this.y
s===$&&A.b("animationsTiming")
return s},
lZ(a,b,c,d,e){var s,r,q=A.a([],t.r)
for(s=this.x,r=0;r<2;++r)q.push(s[r].r)
this.r.aJ(t.a.a(A.pJ(q,t.j)))
this.oN()},
ds(){var s=t.ek.a(this.r).d
s===$&&A.b("submobjects")
return s},
d3(){var s,r
for(s=this.x,r=0;r<2;++r)s[r].d3()},
fX(){var s,r
for(s=this.x,r=0;r<2;++r)s[r].fX()},
d4(a){var s,r
for(s=this.x,r=0;r<2;++r)s[r].d4(a)},
cj(a){var s,r
for(s=this.x,r=0;r<2;++r)s[r].cj(a)},
oN(){var s,r,q,p,o=this
o.sm6(t.dq.a(o.ko()))
s=A.a([],t.n)
for(r=o.giX(),q=r.length,p=0;p<r.length;r.length===q||(0,A.e)(r),++p)s.push(r[p].c)
s=A.aP(B.a.ef(s,0,B.C,t.W))
o.z=s
if(o.a===0)o.a=s},
ko(){var s,r,q,p,o,n,m,l,k=A.a([],t.bB)
for(s=this.x,r=t.oM,q=this.c,p=1-q,o=0,n=0;n<2;++n){m=s[n]
l=o+m.a
B.a.p(k,new A.cU(m,o,l,r))
o=o*p+l*q}return k},
dh(a){var s,r,q,p,o,n,m,l=this.z
l===$&&A.b("maxEndTime")
s=a*l
for(l=this.giX(),r=l.length,q=0;q<l.length;l.length===r||(0,A.e)(l),++q){p=l[q]
o=p.b
n=p.c-o
m=n!==0?Math.min(1,Math.max((s-o)/n,0)):0
p.a.dh(m)}},
sm6(a){this.y=t.dq.a(a)}}
A.hN.prototype={
h0(a,b){var s,r
t.a.a(a)
s=J.X(a)
r=[0,b]
s.i(a,0).dl(s.i(a,1),r[0],r[1])}}
A.hM.prototype={}
A.h4.prototype={
ji(){return this.r},
fH(){var s=this.lI()
s.fQ(1)
if(s instanceof A.R){s.cm(B.k)
s.hD(B.k,0)}return s}}
A.eO.prototype={
hW(a,b,c,d,e){if(e!=null)this.x=e
this.oM()},
oM(){if(this.as!=null)return
this.sp9(A.pA())},
d3(){var s=this,r=s.ji()
s.x=r
r=r.t()
s.y=r
s.r.fp(r)
s.lG()},
ji(){var s=this.x
s===$&&A.b("targetMobject")
return s},
d4(a){this.lH(a)},
ds(){var s,r,q=this,p=q.w
p===$&&A.b("startingMobject")
s=q.x
s===$&&A.b("targetMobject")
r=q.y
r===$&&A.b("targetCopy")
return A.a([q.r,p,s,r],t.r)},
hm(){var s,r,q=A.a([],t.Z),p=this.w
p===$&&A.b("startingMobject")
s=this.y
s===$&&A.b("targetCopy")
s=[this.r,p,s]
r=0
for(;r<3;++r)q.push(s[r].du())
p=t.Y
return A.h(new A.ai(q,p),!0,p.h("j.E"))},
h0(a,b){var s,r,q,p,o,n
t.a.a(a)
s=J.X(a)
r=s.i(a,0)
q=s.i(a,1)
s=s.i(a,2)
p=this.as
o=t.j
o.a(q)
o.a(s)
t.lX.a(p)
n=p==null?A.pA():p
p=q.r
p===$&&A.b("points")
o=s.r
o===$&&A.b("points")
r.saH(t.y.a(n.$3(p,o,b)))
r.h_(q,s,b)},
sp9(a){this.as=t.lX.a(a)}}
A.eR.prototype={
jJ(a){var s=this.$ti.c.a(this.r)
this.x.$2(s,a)}}
A.jb.prototype={
fP(a){var s,r,q,p
t.a.a(a)
s=new A.jc()
r=A.a([],t.r)
for(q=a.length,p=0;p<a.length;a.length===q||(0,A.e)(a),++p)B.a.M(r,s.$1(a[p]))
return A.pJ(r,t.j)},
hd(a){var s,r,q,p,o="renderer"
for(s=this.fP(t.a.a(a)),r=A.v(s).h("Y<1>"),s=new A.Y(s,r),s=new A.O(s,s.gn(s),r.h("O<B.E>")),r=r.h("B.E");s.m();){q=s.d
if(q==null)q=r.a(q)
p=this.r
if(q instanceof A.R){p===$&&A.b("display")
p=p.a
p===$&&A.b(o)
p.pB(q)}else{p===$&&A.b("display")
p.a===$&&A.b(o)}}},
kb(a,b){t.y.a(b)
return!B.a.cA(b,new A.jd())?A.a([B.e],t.l):b}}
A.jc.prototype={
$1(a){return a.bM()},
$S:38}
A.jd.prototype={
$1(a){t.V.a(a)
return isFinite(a.a)&&isFinite(a.b)&&isFinite(a.c)},
$S:39}
A.dJ.prototype={
j4(a){var s
this.b=a
s=this.d
B.a9.sq2(s,1280)
B.a9.sbm(s,720)},
dV(a){return a},
eG(a,b){var s,r,q=this.b
q===$&&A.b("camera")
s=q.c
r=A.iO(a,0,1280,-s/2,s/2)
q=q.d
return new A.f(r,A.iO(b,720,0,-q/2,q/2),0).L(0,B.e)}}
A.fx.prototype={
dj(){var s=0,r=A.bI(t.W),q,p=this,o,n,m
var $async$dj=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:m=window
m.toString
s=3
return A.an(B.e7.gne(m),$async$dj)
case 3:o=b
m=p.f
if(m===0){p.f=o
m=o}n=o-m
p.f=m+n
q=n/1000
s=1
break
case 1:return A.bG(q,r)}})
return A.bH($async$dj,r)},
eJ(a){var s,r,q,p
t.n8.a(a)
s=this.d.getBoundingClientRect()
r=s.left
r.toString
q=s.right
q.toString
this.b===$&&A.b("camera")
p=A.iO(a.a,r,q,0,1280)
q=s.top
q.toString
r=s.bottom
r.toString
return new A.f(p,A.iO(a.b,q,r,0,720),0)},
fv(){var s=this,r=s.d,q=t.eX,p=q.h("~(1)?"),o=p.a(new A.iU(s))
t.jE.a(null)
q=q.c
B.a.M(s.r,A.a([A.lp(r,"mousemove",o,!1,q),A.lp(r,"mousedown",p.a(new A.iV(s)),!1,q),A.lp(r,"mouseup",p.a(new A.iW(s)),!1,q)],t.dw))},
pT(){var s,r,q
for(s=this.r,r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q)s[q].nz()}}
A.iU.prototype={
$1(a){var s,r,q,p
t.gD.a(a)
s=this.a
r=s.Q
s.as=new A.f(r.a,r.b,r.c)
r=a.pageX
r.toString
q=a.pageY
q.toString
p=s.eJ(new A.cR(r,q,t.n8))
q=s.eG(p.a,p.b)
s.Q=q
q.I(0,s.as)
q=s.Q
$.dI().e1(new A.er(q,B.D,"MouseMovedEvent"))
if(s.w){r=s.y=s.Q
s.x.I(0,r)
$.dI().e1(new A.cd(r,B.x,"MouseDraggedEvent"))}},
$S:13}
A.iV.prototype={
$1(a){var s,r,q,p,o
t.gD.a(a)
s=this.a
r=s.Q
s.as=new A.f(r.a,r.b,r.c)
r=a.pageX
r.toString
q=a.pageY
q.toString
p=s.eJ(new A.cR(r,q,t.n8))
s.Q=s.eG(p.a,p.b)
q=a.button
q.toString
s.z=A.mS(q)
q=s.Q
$.dI().e1(new A.ce(q,B.v,"MousePressedEvent"))
s.w=!0
q=s.Q
r=q.a
o=q.b
q=q.c
s.x=new A.f(r,o,q)
s.y=new A.f(r,o,q)},
$S:13}
A.iW.prototype={
$1(a){var s,r,q,p
t.gD.a(a)
s=this.a
r=s.Q
s.as=new A.f(r.a,r.b,r.c)
r=a.pageX
r.toString
q=a.pageY
q.toString
p=s.eJ(new A.cR(r,q,t.n8))
s.Q=s.eG(p.a,p.b)
q=a.button
q.toString
s.z=A.mS(q)
q=s.Q
$.dI().e1(new A.cf(q,B.w,"MouseReleasedEvent"))
s.w=!1},
$S:13}
A.fP.prototype={}
A.dj.prototype={
t(){return A.mT(this)},
n0(){var s,r,q,p=this,o=t.b1,n=A.a([],o),m=p.jw?-1:1,l=p.ea
l.toString
s=p.jt
s=A.iL(p.aX+m*s/2,l,s).aL(0)
l=s.length
r=p.cc
q=0
for(;q<s.length;s.length===l||(0,A.e)(s),++q)n.push(p.ht(s[q],r))
p.spQ(n)
o=A.a([],o)
for(n=p.ju,l=n.length,r*=p.jv,q=0;q<n.length;n.length===l||(0,A.e)(n),++q)o.push(p.ht(n[q],r))
p.snu(o)
o=p.fU
o.toString
o=A.h(o,!0,t.j)
n=p.da
n.toString
B.a.M(o,n)
p.aJ(t.a.a(o))},
ht(a,b){var s,r=this,q=B.p.A(0,b),p=A.mN(B.c,B.K.A(0,b),q)
p.he(0,r.b_().I(0,r.b6()).d1())
p.c_(r.h7(a))
p.aV(r.eE())
p.cm(J.Z(r.bu(),0))
q=J.aF(r.bv(!1))
s=r.w
p.hD(q,s)
return p},
h7(a){var s=this,r=A.iO(a,s.d9,s.aX,0,1)
return A.fq(s.b6(),s.b_(),r,t.V)},
jS(a){var s,r=this,q=r.b6(),p=r.b_(),o=p.I(0,q),n=o.aZ(0,Math.sqrt(o.bd()))
o=n.jn(a.I(0,q))
s=n.jn(p.I(0,q))
return A.fq(r.d9,r.aX,o/s,t.W)},
spQ(a){this.fU=t.gv.a(a)},
snu(a){this.da=t.gv.a(a)}}
A.ks.prototype={
$1(a){return t.F.a(a).t()},
$S:19}
A.kt.prototype={
$1(a){return t.F.a(a).t()},
$S:19}
A.fX.prototype={
hq(a,b){var s
t.f3.a(a)
s=A.qr(B.c,B.bk,1e-8,a,b,this.x1,this.to)
s.c8(new A.jk(this))
return s}}
A.jk.prototype={
$1(a){return this.a.e_(a)},
$S:4}
A.cB.prototype={
hT(a,b,c,d,e,f,g,h){var s,r=this
r.bb=r.jf(e,d,r.e7.bJ(r.gjl()))
s=r.jf(h,g,r.e8.bJ(r.gjm()))
r.bD=s
s.ey(0,-1.5707963267948966,B.e,B.m)
r.e9=A.i8(A.a([r.bb,r.bD],t.hJ))
r.aJ(t.a.a(A.a([r.bb,r.bD],t.r)))
r.az(r.e5)},
jf(b8,b9,c0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5=null,b6=B.a.aT(A.a([c0,this.e6,this.gjk()],t.iX),new A.ja()),b7=b6.a
if(b7==null)b7=B.R
s=b6.e
if(s==null)s=1
r=b6.f
r=r!==!1
q=b6.r
if(q==null)q=0.1
p=b6.w
if(p==null)p=1
o=b6.x
n=b6.y
if(n==null)n=A.a([0],t.n)
m=b6.z
l=b6.Q
k=b6.as
if(k==null)k=2
j=b6.at
if(j==null)j=0
i=b6.ax
if(i==null)i=0.75
h=b6.d
if(h==null)h=B.p
g=b6.ay
if(g==null)g=0.25
f=b6.b
f=f!==!1
e=b6.ch
if(e==null)e=0.25
d=b6.CW
if(d==null)d=0.25
c=b6.cx
b=b6.c
a=A.b6(b5,0,B.c,b5,0)
b=new A.dj(b8,b9,s,r,q,p,o,n,m===!0,l,k,j,i,h,g,f,c,b!==!1,e,d,b5,b5,0,b5,B.j,B.z,0.35,B.m,a,b5,b5,4,0,!1,0.01,!1,0.000001,4,b5,b5,b5,B.c,$,b5,$,$,$)
b.ae(B.c,b5,b5)
b.aV(b7)
d=Math.max(e,d)
b.fx=d
if(f)b.aX=b.aX+d/2
b.a7=B.j.A(0,s).A(0,b8)
b7=B.j.A(0,s).A(0,b.aX)
b.ag=b7
b.cH(b.a7,b7)
b.az(b.h7(j).A(0,-1))
if(b.ea==null)b.ea=p*B.h.fz(b8/p)
if(f){a0=b.fx
a1=b.eE()
a2=A.cm(a)
b7=a2.a
b7=b7==null?b5:J.cz(b7)
if(b7!==!1)a2=a2.q3(a1.t())
b7=a2.b
b7=b7==null?b5:J.cz(b7)
if(b7!==!1)a2=a2.q4(a1.t())
a3=A.uk(3.141592653589793,B.m).aL(0)
b7=a3.length
if(0>=b7)return A.c(a3,0)
a4=a3[0]
if(1>=b7)return A.c(a3,1)
a5=a3[1]
if(2>=b7)return A.c(a3,2)
a6=a3[2]
if(3>=b7)return A.c(a3,3)
a7=a3[3]
b7=a5*0
s=a6*0
a8=a7+b7-s
q=a7*0
p=a4*0
a9=q+a6-p
b0=q+p-a5
p=-a4
b1=p-b7-s
s=-a6
b7=-a5
p=A.tR(3,new A.f(a8*a7+b1*p+a9*s-b0*b7,a9*a7+b1*b7+b0*p-a8*s,b0*a7+b1*s+a8*b7-a9*p))
b2=new A.dM(4,0,!1,0.01,!1,0.000001,4,b5,b5,b5,B.c,$,b5,$,$,$)
b2.ae(B.c,b5,b5)
b2.dE(p,B.c)
b2.he(0,3.141592653589793)
b2.eY(a0,!0)
b2.dB(a0,!0)
b2.jM(b)
b2.eX(a2)
b3=b.b_()
b7=b.r
b7===$&&A.b("points")
s=J.X(b7)
b4=s.i(b7,s.gn(b7)-2)
b7=b4.I(0,b3).d1()
s=b2.r
s===$&&A.b("points")
b2.he(0,-b7-J.aF(s).I(0,b2.eo(0.5)).d1()-3.141592653589793)
b2.az(b3.I(0,J.aF(b2.r)))
b.pC(b2,B.e3)
b.k1=b2
b.aJ(t.a.a(A.a([b2],t.r)))}if(r)b.n0()
b7=b6.cy
b.eV(b7==null?4:b7)
return b},
e_(a){var s,r,q,p,o,n,m,l,k="getStart",j=this.bb
j===$&&A.b("xAxis")
s=j.h7(0)
r=new A.f(s.a,s.b,s.c)
j=A.a([a.a,a.b,a.c],t.n)
q=this.e9
q===$&&A.b("axes")
q=q.d
q===$&&A.b("submobjects")
q=new A.ai(A.a([j,q],t.bo),t.c2)
q=q.gH(q)
j=t.f7
for(;q.m();){p=q.b
if(p==null)p=A.M(A.al("No element"))
if(1>=p.length)return A.c(p,1)
o=j.a(p[1])
n=o.d9
m=(A.aP(p[0])-n)/(o.aX-n)+0
n=o.id
if(n!=null){n.an(k)
n=n.r
n===$&&A.b("points")
n=J.aF(n)}else n=o.cT()
l=o.k1
if(l!=null){l.an(k)
l=l.r
l===$&&A.b("points")
l=J.aF(l)}else l=o.cS()
r=r.L(0,n.A(0,1-m).L(0,l.A(0,m)).I(0,s))}return r},
hb(a){var s,r=this.bb
r===$&&A.b("xAxis")
s=r.jS(a)
r=this.bD
r===$&&A.b("yAxis")
return new A.f(s,r.jS(a),0)},
hU(a){var s=this,r=a.bb
r===$&&A.b("xAxis")
s.bb=A.mT(r)
r=a.bD
r===$&&A.b("yAxis")
r=A.mT(r)
s.bD=r
s.e9=A.i8(A.a([s.bb,r],t.hJ))},
t(){return A.nJ(this)},
gjk(){return B.O},
gjl(){return B.o},
gjm(){return B.N}}
A.ja.prototype={
$2(a,b){var s=t.fy
return s.a(a).bJ(s.a(b))},
$S:43}
A.ev.prototype={
t(){return A.qN(this)},
oL(){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(h.eb==null){s=h.fV
r=t.O
q=A.a([],r)
p=A.a([],r)
o=s.b
r=J.I(o==null?A.a([],r):o)
for(;r.m();){o=r.gu()
n=o.d
p.push(new A.P(o.a,o.b,o.c,n*0.5))}h.eb=new A.co(q,p,s.c*0.5,s.d,s.e*0.5)}s=h.bb
s===$&&A.b("xAxis")
r=h.bD
r===$&&A.b("yAxis")
q=h.js
m=h.hr(s,r,h.jx,q)
l=h.hr(h.bD,h.bb,h.jy,q)
q=t.F
r=A.h(m[0],!0,q)
B.a.M(r,l[0])
q=A.h(m[1],!0,q)
B.a.M(q,l[1])
k=[r,q]
q=t.g4
h.smd(q.a(k[0]))
h.sme(q.a(k[1]))
q=h.fR
q===$&&A.b("backgroundLines")
j=A.i8(q)
j.eX(h.fV)
q=h.fS
q===$&&A.b("fadedLines")
i=A.i8(q)
q=h.eb
q.toString
i.eX(q)
h.n1(A.a([j,i],t.r))},
hr(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f="getStart",e=a.b6(),d=A.mN(B.c,a.b_(),e),c=1+a2,b=1/c*a1
e=t.b1
s=A.a([],e)
r=A.a([],e)
e=a0.d9
q=[A.iL(a0.aX,0,b).aL(0),A.iL(e,0,-b).aL(0)]
for(p=t.W,o=0;o<2;++o)for(n=A.d0(q[o],p),m=n.length,l=0;l<n.length;n.length===m||(0,A.e)(n),++l){k=n[l]
j=A.o0(d)
i=(k.b-e)/(a0.aX-e)+0
h=a0.id
if(h!=null){h.an(f)
h=h.r
h===$&&A.b("points")
h=J.aF(h)}else h=a0.cT()
g=a0.k1
if(g!=null){g.an(f)
g=g.r
g===$&&A.b("points")
g=J.aF(g)}else g=a0.cS()
j.az(h.A(0,1-i).L(0,g.A(0,i)))
if(B.d.W(k.a,c)===0)B.a.p(s,j)
else B.a.p(r,j)}return A.a([s,r],t.km)},
smd(a){this.fR=t.g4.a(a)},
sme(a){this.fS=t.g4.a(a)},
gjk(){return this.da},
gjl(){return this.ow},
gjm(){return this.ox}}
A.aM.prototype={
bJ(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=b.a
if(a==null)a=a0.a
s=b.e
if(s==null)s=a0.e
r=b.f
if(r==null)r=a0.f
q=b.r
if(q==null)q=a0.r
p=b.w
if(p==null)p=a0.w
o=b.y
if(o==null)o=a0.y
n=b.z
if(n==null)n=a0.z
m=b.Q
if(m==null)m=a0.Q
l=b.as
if(l==null)l=a0.as
k=b.at
if(k==null)k=a0.at
j=b.ax
if(j==null)j=a0.ax
i=b.d
if(i==null)i=a0.d
h=b.ay
if(h==null)h=a0.ay
g=b.b
if(g==null)g=a0.b
f=b.ch
if(f==null)f=a0.ch
e=b.CW
if(e==null)e=a0.CW
d=b.c
if(d==null)d=a0.c
c=b.cy
if(c==null)c=a0.cy
return A.d2(a,a0.cx,d,n,r,g,i,a0.x,h,l,k,j,m,o,c,p,q,e,f,s)}}
A.dk.prototype={
kB(a){var s=this.fx
if(s>0)return s
return Math.pow(10,(a===0?0:B.h.oC(Math.min(0,Math.log(Math.abs(a))/2.302585092994046)))-2)},
bL(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=d.k1,b=A.v(c)
b=A.h(new A.am(c,b.h("A(1)").a(new A.ku(d)),b.h("am<1>")),!0,t.W)
c=t.n
s=A.a([d.fy,d.go],c)
for(r=b.length,q=d.id,p=0;p<r;++p){o=b[p]
if(typeof o!=="number")return o.I()
B.a.M(s,A.a([o-q,o+q],c))}B.a.lp(s)
for(c=A.E(s.length/2|0,0,1),b=c.length,r=t.l,q=t.y,n=t.V,p=0;p<c.length;c.length===b||(0,A.e)(c),++p){m=c[p]
if(typeof m!=="number")return m.L()
l=B.a.i(s,m+0)
k=B.a.i(s,m+1)
j=A.iL(k,l,d.kB(l)).aL(0)
if(!J.U(B.a.gq(j),k))B.a.p(j,k)
i=A.a([],r)
for(h=j.length,g=0;g<j.length;j.length===h||(0,A.e)(j),++g){f=A.aP(j[g])
i.push(d.k2.$1(f))}h=A.a([],r)
for(f=i.length,g=0;g<i.length;i.length===f||(0,A.e)(i),++g){e=i[g]
l=e.a
if(!(isNaN(l)||isNaN(e.b)||isNaN(e.c))&&isFinite(l)&&isFinite(e.b)&&isFinite(e.c))h.push(e)}if(h.length!==0){i=q.a(A.a([B.a.gac(h)],r))
f=d.r
f===$&&A.b("points")
J.af(f,i)
d.n_(A.bK(h,n))}}},
t(){return A.qO(this)}}
A.ku.prototype={
$1(a){var s
A.aP(a)
s=this.a
return a>=s.fy&&a<=s.go},
$S:44}
A.e8.prototype={
t(){return A.mH(this)}}
A.jA.prototype={
$1(a){A.aP(a)
return new A.f(a,this.a.$1(a),0)},
$S:34}
A.eM.prototype={
kj(a,b){var s,r
if(a==null)s=null
else s=a
if(s==null)s=B.k
if(b==null)r=null
else r=b
if(r==null)r=B.k
return A.b6(B.k,this.e,s,r,this.c)},
q3(a){return this.kj(a,null)},
q4(a){return this.kj(null,a)}}
A.i_.prototype={
l(a){return"TipSide."+this.b}}
A.eN.prototype={
t(){return A.ri(this)},
pC(a,b){var s=this
if(Math.sqrt(s.b6().I(0,s.b_()).bd())===0)return
if(b===B.e2)s.cH(a.eo(0.5),s.b_())
else s.cH(s.b6(),a.eo(0.5))},
c2(a,b){this.eW(a,!1)
this.eS(B.k,!1)
this.lY(a,!0)},
aV(a){return this.c2(a,!0)},
b_(){var s=this.k1
if(s!=null){s.an("getStart")
s=s.r
s===$&&A.b("points")
s=J.aF(s)}else s=this.cS()
return s},
b6(){var s=this.id
if(s!=null){s.an("getStart")
s=s.r
s===$&&A.b("points")
s=J.aF(s)}else s=this.cT()
return s}}
A.dL.prototype={
t(){return A.q8(this)},
bL(){var s=this
s.lf()
s.hz(s.a7,B.e)
s.az(s.ag)},
lf(){var s,r,q,p,o,n,m,l,k,j=this,i=t.l,h=A.a([],i)
for(s=j.y2,r=j.a6,q=j.bl,s=A.fs(q,r+s,s).aL(0),p=s.length,o=0;o<s.length;s.length===p||(0,A.e)(s),++o){n=s[o]
h.push(B.j.A(0,Math.cos(n)).L(0,B.K.A(0,Math.sin(n))))}s=A.a([],i)
for(p=h.length,o=0;o<h.length;h.length===p||(0,A.e)(h),++o){n=h[o]
s.push(new A.f(-n.b,n.a,n.c))}p=A.a([],i)
for(m=A.E(h.length-1,0,1),l=m.length,q=r/(q-1)/3,o=0;o<m.length;m.length===l||(0,A.e)(m),++o){k=m[o]
p.push(B.a.i(h,k).L(0,B.a.i(s,k).A(0,q)))}i=A.a([],i)
for(r=A.E(h.length,1,1),m=r.length,o=0;o<r.length;r.length===m||(0,A.e)(r),++o){k=r[o]
i.push(B.a.i(h,k).I(0,B.a.i(s,k).A(0,q)))}s=t.V
j.eQ(A.nw(h,s),p,i,A.bK(h,s))}}
A.cA.prototype={
t(){return A.qa(this)}}
A.d4.prototype={
t(){return A.qg(this)},
gdX(){return!0}}
A.dX.prototype={
t(){return A.nW(this)}}
A.e_.prototype={
t(){return A.qo(this)}}
A.aw.prototype={
t(){return A.o0(this)},
bL(){var s=this
s.eT(A.a([s.a7,s.ag],t.l))
s.mX()},
mX(){var s,r,q=this,p=q.y2
if(p===0)return
s=Math.sqrt(q.b6().I(0,q.b_()).bd())
if(s<2*p)return
r=p/s
q.dl(q,r,1-r)},
cH(a,b){var s=this
if(s.b6().U(0,s.b_())){s.a7=a
s.ag=b
s.bL()}return s.lU(a,b)}}
A.ew.prototype={
dE(a,b){var s=A.h(a,!0,t.V)
s.push(B.a.gac(a))
this.eT(s)},
t(){return A.qQ(this)},
pG(b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1="points",b2="getStart",b3=b0.dH(0),b4=t.nC,b5=A.a([],b4)
for(s=t.V,r=A.pa(b3,3,s),q=r.length,p=J.pj(b6),o=0;o<r.length;r.length===q||(0,A.e)(r),++o){n=r[o]
m=n.length
if(0>=m)return A.c(n,0)
l=n[0]
if(1>=m)return A.c(n,1)
k=n[1]
if(2>=m)return A.c(n,2)
j=n[2]
i=k.I(0,l)
h=j.I(0,k)
m=i.a
g=i.b
f=i.c
e=m*m+g*g+f*f
d=i.aZ(0,Math.sqrt(e))
c=h.a
b=h.b
a=h.c
a0=c*c+b*b+a*a
a1=h.aZ(0,Math.sqrt(a0))
a2=Math.acos((m*c+g*b+f*a)/(Math.sqrt(a0)*Math.sqrt(e)))*p.geZ(b6)
a3=b6*Math.tan(a2/2)/2
a4=J.nE(i.nW(h).c)
e=k.I(0,d.A(0,a3))
B.a.p(b5,A.q9(a4*a2,k.L(0,a1.A(0,a3)),e))}r=t.l
q=t.y
b0.saH(q.a(A.a([],r)))
b4=A.a([B.a.gq(b5)],b4)
p=t.aY
B.a.M(b4,A.nw(b5,p))
for(b4=A.pa(b4,2,p),p=b4.length,o=0;o<b4.length;b4.length===p||(0,A.e)(b4),++o){a5=b4[o]
m=a5.length
if(0>=m)return A.c(a5,0)
a6=a5[0]
if(1>=m)return A.c(a5,1)
a7=a5[1]
m=a6.r
m===$&&A.b(b1)
m=q.a(A.h(m,!0,s))
g=b0.r
g===$&&A.b(b1)
J.af(g,m)
m=a6.k1
if(m!=null){m.an(b2)
m=m.r
m===$&&A.b(b1)
m=J.aF(m)}else m=a6.cS()
g=a7.id
if(g!=null){g.an(b2)
g=g.r
g===$&&A.b(b1)
g=J.aF(g)}else g=a7.cT()
a8=A.mN(B.c,g,m)
m=a8.id
if(m!=null){m.an(b2)
m=m.r
m===$&&A.b(b1)
m=J.aF(m)}else m=a8.cT()
g=a8.k1
if(g!=null){g.an(b2)
g=g.r
g===$&&A.b(b1)
g=J.aF(g)}else g=a8.cS()
g=m.I(0,g)
m=g.a
f=g.b
g=g.c
g=B.h.br(Math.sqrt(m*m+f*f+g*g)/a6.kp()*B.d.b0(J.N(a6.r),a6.at))
m=a8.r
m===$&&A.b(b1)
a9=B.d.W(J.N(m),a8.at)===1?J.aG(a8.r):null
a8.saH(q.a(a8.fZ(g,A.h(a8.r,!0,s))))
if(a9!=null){m=q.a(A.a([a9],r))
J.af(a8.r,m)}m=q.a(A.h(a8.r,!0,s))
J.af(b0.r,m)}}}
A.ey.prototype={
t(){return A.r_(this)}}
A.eP.prototype={
t(){return A.rl(this)}}
A.dM.prototype={
t(){return A.aO(this)},
saF(a){this.cb=A.aP(a)},
gaF(){return this.cb}}
A.dq.prototype={
f1(a,b,c){this.eY(c,!0)
this.dB(b,!0)},
t(){return A.qZ(this)}}
A.ez.prototype={
t(){return A.r0(this)}}
A.eJ.prototype={
t(){return A.rg(this)}}
A.cg.prototype={
t(){return A.r2(this)},
bL(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=null
if($.mV.aj(e.id)){s=$.mV.i(0,e.id).t()
r=s.d
r===$&&A.b("submobjects")
e.sb9(t.a.a(r))
e.sbm(0,s.gbm(s))
e.go=s.go
e.fx=e.k1=!0
return}r=e.id
q=A.a([],t.bD)
p=t.il
o=A.a([],p)
n=A.a([],t.lB)
o=new A.kT("http://www.w3.org/1999/xhtml",o,new A.fy(n))
o.bq(0)
n=A.mQ(t.N)
m=A.a([],t.t)
m=new A.jY(A.tO(d),d,n,m)
m.siA(new A.a9(r))
m.a="utf-8"
m.b=!0
m.bq(0)
r=new A.e9(m,!0,!0,!1,A.mQ(t.nU),new A.a5(""),new A.a5(""),new A.a5(""))
r.bq(0)
l=new A.jZ(!1,r,o,q)
r.f=l
l.mB()
o=o.b
o===$&&A.b("document")
k=A.a([],p)
r=t.kU
j=A.a([],r)
i=A.qR("memory",!1)
q=t.m3.a(B.a.gmY(j))
r=A.a([],r)
$.fj.b=new A.kg(q,i,r)
r=new A.a9("svg")
q=A.a([0],t.t)
h=new A.hQ(d,q,new Uint32Array(A.nd(r.ap(r))))
h.hV(r,d)
r=new A.kR(85,117,43,63,new A.a9("CDATA"),h,"svg",!0,0)
q=new A.lI(r)
q.d=t.U.a(r.cE())
r.e=!0
g=q.pi()
if(g==null||j.length!==0)A.M(A.aI("'svg' is not a valid selector: "+A.l(j),d,d))
new A.eB().jX(0,o,g,k)
r=k.length
q=t.a
f=0
for(;f<k.length;k.length===r||(0,A.e)(k),++f)e.aJ(q.a(e.eI(k[f],new A.eA(B.aa,d,d))))
$.mV.v(0,e.id,e.t())},
eI(a,b){var s,r,q,p,o,n,m,l,k,j=this,i=null,h=t.hJ,g=A.a([],h),f=a.x,e=f==null?i:f.toLowerCase(),d=b.bK(j.bt(a))
if(e==="defs")j.pU(a)
else if(e!=="style")if(B.a.F(A.a(["g","svg","symbol"],t.s),e)){h=A.a([],h)
for(f=t.v,f=A.h(new A.ar(a.gj6(a).a,f),!1,f.h("j.E")),s=A.v(f),f=new J.aC(f,f.length,s.h("aC<1>")),s=s.c;f.m();){r=f.d
B.a.M(h,j.eI(r==null?s.a(r):r,d))}B.a.M(g,h)}else if(e==="path"){q=a.b.i(0,"d")
if(q!=null&&q.length!==0)B.a.p(g,j.en(q,d,a))}else if(e==="use")B.a.M(g,j.pV(a,d))
else if(e==="rect"){p=j.aM(a.b.i(0,"rx"))
h=a.b
if(p===0){h=j.aM(h.i(0,"width"))
o=A.qY(B.c,j.aM(a.b.i(0,"height")),h)}else{h=j.aM(h.i(0,"width"))
f=j.aM(a.b.i(0,"height"))
s=A.a([B.A,B.L,B.y,B.M],t.l)
o=new A.ez(4,0,!1,0.01,!1,0.000001,4,i,i,i,B.c,$,i,$,$,$)
o.ae(B.c,i,i)
o.dE(s,B.c)
o.f1(B.c,f,h)
o.pG(p)}o.az(o.aq(B.e).I(0,o.aq(B.A)))
B.a.p(g,j.bT(d.bK(j.bt(a)),o))}else if(e==="ellipse"){n=j.aM(a.b.i(0,"cx"))
m=j.aM(a.b.i(0,"cy"))
l=j.aM(a.b.i(0,"rx"))
k=j.aM(a.b.i(0,"ry"))
o=new A.e_(0,6.283185307179586,1,B.e,9,0.35,B.m,A.b6(i,0,B.c,i,0),i,i,4,0,!1,0.01,!1,0.000001,4,i,i,i,B.c,$,i,$,$,$)
o.ae(B.c,i,i)
o.aV(B.c)
o.eY(l*2,!0)
o.dB(k*2,!0)
o.az(B.j.A(0,n).L(0,B.p.A(0,m)))
B.a.p(g,j.bT(d.bK(j.bt(a)),o))}else if(e==="circle"){n=j.aM(a.b.i(0,"cx"))
m=j.aM(a.b.i(0,"cy"))
o=A.nP(B.e,B.c,j.aM(a.b.i(0,"r")))
o.az(B.j.A(0,n).L(0,B.p.A(0,m)))
B.a.p(g,j.bT(d.bK(j.bt(a)),o))}else if(e==="polygon"||e==="polyline")B.a.p(g,j.pd(a,d))
else A.nt("Unknown SVG element "+A.l(e))
j.oG(a,A.i8(g))
return g},
en(a,b,c){var s=A.r3(a)
if(c!=null)return this.bT(b.bK(this.bt(c)),s)
else return this.bT(b,s)},
jR(a,b){return this.en(a,b,null)},
pV(a,b){var s,r,q,p=a.b,o=A.D(p).h("aX<1>"),n=A.h(new A.aX(p,o),!0,o.h("j.E"))
o=p.gkg(p)
s=A.h(o,!0,A.D(o).h("j.E"))
r=B.a.jC(n,new A.kC())
if(r>=0){if(!(r<s.length))return A.c(s,r)
q=s[r]}else q=null
o=q==null?null:A.a(q.split("#"),t.s)
if(o==null)o=[]
q=B.a.aC(A.bK(o,t.z),"")
o=this.k2
if(!o.aj(q))A.nt("SVG ref "+q+" not recognized")
o=o.i(0,q)
o.toString
return this.eI(o,b.bK(this.bt(a)))},
aM(a){var s,r,q,p,o,n
if(a===""||a==null||a==="none")a="0.0"
s=A.h(B.ag,!0,t.N)
s.push("+")
s.push("-")
s.push(".")
s.push("e")
s.push("E")
r=A.a([],t.s)
for(q=a.split(""),p=q.length,o=0;o<p;++o){n=q[o]
if(B.a.F(s,n))r.push(n)}return A.bV(B.a.aS(r))},
pd(a,b){var s,r,q,p,o=this,n=a.b.i(0,"points")
n.toString
for(s=n,r=0;r<10;++r){q=B.ag[r]
s=A.bv(s," "+q," L"+q)}b=b.bK(o.bt(a))
p=o.jR("M"+s,b)
return o.bT(b.bK(o.bt(a)),p)},
je(a){var s,r,q,p,o,n
if(a===""||a==="none")return B.k
if(a==null)return null
s=A.a([3,4,6,8],t.t)
if(a==="currentcolor"){r=this.a
r===$&&A.b("color")
return r}else if(B.b.a_(a,"rgba")){r=A.a(a.split(""),t.s)
q=a.length-1
A.aK(5,q,r.length)
p=A.bf(r,5,q,t.N).aS(0).split(",")
q=p.length
if(0>=q)return A.c(p,0)
r=A.bV(p[0])
if(1>=q)return A.c(p,1)
o=A.bV(p[1])
if(2>=q)return A.c(p,2)
n=A.bV(p[2])
if(3>=q)return A.c(p,3)
return new A.P(r,o,n,A.bV(p[3]))}else if(B.b.a_(a,"rgb")){r=A.a(a.split(""),t.s)
q=a.length-1
A.aK(4,q,r.length)
p=A.bf(r,4,q,t.N).aS(0).split(",")
q=p.length
if(0>=q)return A.c(p,0)
r=A.bV(p[0])
if(1>=q)return A.c(p,1)
o=A.bV(p[1])
if(2>=q)return A.c(p,2)
return new A.P(r,o,A.bV(p[2]),1)}else if(B.b.a_(a,"#")||B.a.F(s,a.length))return A.tc(a)
else{A.nt("unimplented type of color: "+a)
return null}},
bT(a,b){b.lk(a.a,a.b,a.c)
return b},
bt(a){var s,r,q=a.b.i(0,"fill"),p=q==null?null:q.toLowerCase()
q=a.b.i(0,"stroke")
s=q==null?null:q.toLowerCase()
r=a.b.i(0,"stroke-width")
return new A.eA(this.je(p),this.je(s),this.aM(r))},
oG(a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(a2.b.i(0,"x")!=null&&a2.b.i(0,"y")!=null){s=this.aM(a2.b.i(0,"x"))
r=this.aM(a2.b.i(0,"y"))
a3.az(B.j.A(0,s).L(0,B.p.A(0,r)))}q=a2.b.i(0,"transform")
if(q==null)q=""
p=["matrix","translate","scale","rotate","skewX","skewY"]
o=A.a([],t.s)
for(n=0;n<6;++n)o.push(p[n]+"[^)]*\\)")
m=A.ax(B.a.aC(o,"|")).c7(0,q)
l=A.ax("[-+]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][-+]?\\d+)?")
for(o=new A.dx(m.a,m.b,m.c),k=t.lu,j=t.n,i=t.b,h=t.o;o.m();){g=o.d
f=(g==null?k.a(g):g).b
if(0>=f.length)return A.c(f,0)
e=f[0].split("(")
f=e.length
if(0>=f)return A.c(e,0)
d=J.nH(e[0])
c=A.a([],j)
if(1>=f)return A.c(e,1)
f=l.c7(0,e[1])
f=new A.dx(f.a,f.b,f.c)
for(;f.m();){s=f.d
b=(s==null?k.a(s):s).b
if(0>=b.length)return A.c(b,0)
b=b[0]
b.toString
c.push(A.bV(b))}switch(d){case"matrix":a=A.aB(null,A.a([c],i)).pD(3,2)
h.a(new A.C(2,0,h))
f=a.a
f===$&&A.b("values")
if(2>=f.length)return A.c(f,2)
f=J.Z(f[2],0)
h.a(new A.C(2,1,h))
c=a.a
if(2>=c.length)return A.c(c,2)
c=J.Z(c[2],1)
a0=A.fI(3)
h.a(new A.C(0,0,h))
b=a.a
if(!(0<b.length))return A.c(b,0)
b=J.Z(b[0],0)
a0.aw(h.a(new A.C(0,0,h)),b)
h.a(new A.C(0,1,h))
b=a.a
if(!(0<b.length))return A.c(b,0)
b=J.Z(b[0],1)
a0.aw(h.a(new A.C(0,1,h)),b)
h.a(new A.C(1,0,h))
b=a.a
if(!(1<b.length))return A.c(b,1)
b=J.Z(b[1],0)
a0.aw(h.a(new A.C(1,0,h)),b)
h.a(new A.C(1,1,h))
b=a.a
if(!(1<b.length))return A.c(b,1)
b=J.Z(b[1],1)
a0.aw(h.a(new A.C(1,1,h)),b)
b=h.a(new A.C(1,0,h))
a1=a0.a
a1===$&&A.b("values")
if(!(1<a1.length))return A.c(a1,1)
a0.aw(b,J.Z(a1[1],0)*-1)
a1=h.a(new A.C(1,1,h))
b=a0.a
if(!(1<b.length))return A.c(b,1)
a0.aw(a1,J.Z(b[1],1)*-1)
b=h.a(new A.C(1,2,h))
a1=a0.a
if(!(1<a1.length))return A.c(a1,1)
a0.aw(b,J.Z(a1[1],2)*-1)
a1=h.a(new A.C(0,1,h))
b=a0.a
if(!(0<b.length))return A.c(b,0)
a0.aw(a1,J.Z(b[0],1)*-1)
b=h.a(new A.C(1,1,h))
a1=a0.a
if(!(1<a1.length))return A.c(a1,1)
a0.aw(b,J.Z(a1[1],1)*-1)
a1=h.a(new A.C(2,1,h))
b=a0.a
if(2>=b.length)return A.c(b,2)
a0.aw(a1,J.Z(b[2],1)*-1)
a3.nf(a0)
a3.az(B.j.A(0,f).L(0,B.p.A(0,c)))
break
case"scale":f=c.length
if(f===1){if(0>=f)return A.c(c,0)
f=c[0]
a3.hx(0,new A.f(f,f,1),B.e)}else if(f===2){if(0>=f)return A.c(c,0)
b=c[0]
if(1>=f)return A.c(c,1)
a3.hx(0,new A.f(b,c[1],1),B.e)}break
case"translate":f=c.length
if(0>=f)return A.c(c,0)
s=c[0]
if(f===2){if(1>=f)return A.c(c,1)
r=c[1]}else r=0
a3.az(B.j.A(0,s).L(0,B.p.A(0,r)))
break}}},
hl(a){var s,r,q=t.il,p=A.a([],q)
if(a.b.aj("id"))return A.a([a],q)
for(q=t.v,q=A.h(new A.ar(a.gj6(a).a,q),!1,q.h("j.E")),s=A.v(q),q=new J.aC(q,q.length,s.h("aC<1>")),s=s.c;q.m();){r=q.d
B.a.M(p,this.hl(r==null?s.a(r):r))}return p},
pU(a){var s,r,q,p,o,n
for(s=this.hl(a),r=s.length,q=this.k2,p=0;p<s.length;s.length===r||(0,A.e)(s),++p){o=s[p]
n=o.b.i(0,"id")
n.toString
q.v(0,n,o)}},
h4(){var s,r=this
r.az(r.aq(B.e).A(0,B.aC).A(0,-1))
if(r.gbm(r)!=null){s=r.gbm(r)
s.toString
r.le(s)}},
sbm(a,b){this.fy=A.fk(b)},
snU(a,b){this.id=A.ay(b)},
gbm(a){return this.fy}}
A.kC.prototype={
$1(a){var s
t.K.a(a)
s=J.bi(a)
return B.b.F(s.l(a),"href")&&B.b.F(s.l(a),"xlink")},
$S:46}
A.dr.prototype={
t(){return A.r4(this)},
ky(){var s=A.a(["M","L","H","V","C","S","Q","T","A","Z"],t.s),r=A.h(s,!0,t.N)
B.a.M(r,new A.J(s,t.gL.a(new A.kE()),t.gQ))
return r},
bL(){var s,r,q,p,o,n,m,l=this,k=A.ax("["+B.a.aS(l.ky())+"]"),j=l.fx,i=k.c7(0,j),h=t.N,g=A.D(i)
g=A.ke(i,g.h("n(j.E)").a(new A.kD()),g.h("j.E"),h)
s=A.h(g,!0,A.D(g).h("j.E"))
r=A.bK(B.b.co(j,k),h)
for(j=A.E(s.length,0,1),i=j.length,q=null,p=0;p<j.length;j.length===i||(0,A.e)(j),++p,q=n){o=j[p]
n=B.a.i(s,o)
m=B.a.i(r,o)
l.oE(n,m,q==null?"":q)}l.ey(0,3.141592653589793,B.e,B.j)},
oE(a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a="addCubicBezierCurveTo",a0=a2.toUpperCase(),a1=b.r
a1===$&&A.b("points")
s=J.c8(a1)?J.aG(b.r):new A.f(0,0,0)
r=b.lD(a0,a3,a2!==a2.toUpperCase(),s)
switch(a0){case"M":if(0>=r.length)return A.c(r,0)
a1=t.V
q=t.y.a(A.a([a1.a(r[0])],t.l))
J.af(b.r,q)
for(a1=A.bK(r,a1),q=a1.length,p=0;p<a1.length;a1.length===q||(0,A.e)(a1),++p)b.cZ(a1[p])
return
case"H":case"V":case"L":for(a1=r.length,p=0;p<r.length;r.length===a1||(0,A.e)(r),++p)b.cZ(r[p])
return
case"C":for(a1=A.E(r.length,0,3),q=a1.length,o=t.l,n=t.y,m=b.at,l=t.V,p=0;p<a1.length;a1.length===q||(0,A.e)(a1),++p){k=a1[p]
if(typeof k!=="number")return k.L()
j=B.a.i(r,k+0)
i=B.a.i(r,k+1)
h=B.a.i(r,k+2)
l.a(j)
l.a(i)
l.a(h)
b.an(a)
if(B.d.W(J.N(b.r),m)===1){j=n.a(A.a([j,i,h],o))
J.af(b.r,j)}else{j=n.a(A.a([J.aG(b.r),j,i,h],o))
J.af(b.r,j)}}return
case"S":if(B.a.F(A.a(["C","S"],t.s),a4.toUpperCase())){a1=b.r
q=J.X(a1)
g=q.i(a1,q.gn(a1)-2)}else g=s
for(a1=A.E(r.length,0,2),q=a1.length,o=t.l,n=t.y,m=b.at,l=t.V,p=0;p<a1.length;a1.length===q||(0,A.e)(a1),++p){k=a1[p]
f=s.A(0,2).I(0,g)
j=B.a.i(r,k)
if(typeof k!=="number")return k.L()
i=k+1
h=B.a.i(r,i)
l.a(j)
l.a(h)
b.an(a)
if(B.d.W(J.N(b.r),m)===1){j=n.a(A.a([f,j,h],o))
J.af(b.r,j)}else{j=n.a(A.a([J.aG(b.r),f,j,h],o))
J.af(b.r,j)}s=B.a.i(r,i)
g=B.a.i(r,k)}return
case"Q":for(a1=A.E(r.length,0,2),q=a1.length,o=t.l,n=t.y,m=b.at,l=t.V,p=0;p<a1.length;a1.length===q||(0,A.e)(a1),++p){k=a1[p]
j=B.a.i(r,k)
if(typeof k!=="number")return k.L()
i=B.a.i(r,k+1)
l.a(j)
l.a(i)
h=j.A(0,0.6666666666666666).L(0,J.aG(b.r).A(0,0.3333333333333333))
j=j.A(0,0.6666666666666666).L(0,i.A(0,0.3333333333333333))
b.an(a)
if(B.d.W(J.N(b.r),m)===1){j=n.a(A.a([h,j,i],o))
J.af(b.r,j)}else{j=n.a(A.a([J.aG(b.r),h,j,i],o))
J.af(b.r,j)}}return
case"T":if(B.a.F(A.a(["Q","T"],t.s),a4.toUpperCase())){a1=b.r
q=J.X(a1)
e=J.bk(q.i(a1,q.gn(a1)-2),1.5).I(0,J.bk(J.aG(b.r),0.5))}else e=s
for(a1=r.length,q=t.l,o=t.y,n=b.at,m=t.V,p=0;p<r.length;r.length===a1||(0,A.e)(r),++p,e=c,s=d){d=r[p]
c=s.A(0,2).I(0,e)
m.a(d)
l=c.A(0,0.6666666666666666).L(0,J.aG(b.r).A(0,0.3333333333333333))
j=c.A(0,0.6666666666666666).L(0,d.A(0,0.3333333333333333))
b.an(a)
if(B.d.W(J.N(b.r),n)===1){l=o.a(A.a([l,j,d],q))
J.af(b.r,l)}else{l=o.a(A.a([J.aG(b.r),l,j,d],q))
J.af(b.r,l)}}return
case"A":for(a1=A.E(r.length,0,3),q=a1.length,o=t.l,n=t.y,m=b.at,l=t.V,p=0;p<a1.length;a1.length===q||(0,A.e)(a1),++p){k=a1[p]
j=B.a.i(r,k)
if(typeof k!=="number")return k.L()
i=B.a.i(r,k+1)
h=B.a.i(r,k+2)
l.a(j)
l.a(i)
l.a(h)
b.an(a)
if(B.d.W(J.N(b.r),m)===1){j=n.a(A.a([j,i,h],o))
J.af(b.r,j)}else{j=n.a(A.a([J.aG(b.r),j,i,h],o))
J.af(b.r,j)}}return
case"Z":if(!b.jc(J.aF(b.r),J.aG(b.r))){a1=B.a.gq(b.dz(A.h(b.r,!0,t.V)))
if(0>=a1.length)return A.c(a1,0)
b.cZ(a1[0])}return}},
lD(a,a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=A.us(a0),c=t.l,b=A.a([],c)
if(a==="A"){for(c=A.po(d,2,t.W),s=c.length,r=null,q=0;q<c.length;c.length===s||(0,A.e)(c),++q){p=c[q]
if(r!=null)a2=r
if(a1){if(5>=p.length)return A.c(p,5)
o=p[5]
if(typeof o!=="number")return o.L()
B.a.v(p,5,o+a2.a)
if(6>=p.length)return A.c(p,6)
o=p[6]
if(typeof o!=="number")return o.L()
B.a.v(p,6,o+a2.b)}o=p.length
if(5>=o)return A.c(p,5)
n=p[5]
if(a2.a===n){if(6>=o)return A.c(p,6)
m=a2.b===p[6]}else m=!1
if(m)continue
m=p[0]
l=p[1]
k=p[2]
j=p[3]
i=p[4]
if(6>=o)return A.c(p,6)
B.a.M(b,A.tY(a2,m,l,k,j,i,new A.f(n,p[6],0)))
n=p.length
if(5>=n)return A.c(p,5)
i=p[5]
if(6>=n)return A.c(p,6)
r=new A.f(i,p[6],0)}return b}else if(a==="H")if(a1){c=A.a([],c)
for(s=d.length,q=0;q<d.length;d.length===s||(0,A.e)(d),++q)c.push(new A.f(d[q],0,0))
b=c
a1=!0}else{c=A.a([],c)
for(s=d.length,o=a2.b,q=0;q<d.length;d.length===s||(0,A.e)(d),++q)c.push(new A.f(d[q],o,0))
b=c
a1=!1}else if(a==="V")if(a1){c=A.a([],c)
for(s=d.length,q=0;q<d.length;d.length===s||(0,A.e)(d),++q)c.push(new A.f(0,d[q],0))
b=c
a1=!0}else{c=A.a([],c)
for(s=d.length,o=a2.a,q=0;q<d.length;d.length===s||(0,A.e)(d),++q)c.push(new A.f(o,d[q],0))
b=c
a1=!1}else{c=A.a([],c)
for(s=A.po(d,2,t.W),o=s.length,q=0;q<s.length;s.length===o||(0,A.e)(s),++q){h=s[q]
n=h.length
if(0>=n)return A.c(h,0)
m=h[0]
if(1>=n)return A.c(h,1)
c.push(new A.f(m,h[1],0))}b=c}if(!a1)return b
if(a==="Q"||a==="S")g=2
else g=a==="C"?3:1
for(c=A.E(b.length,0,1),s=c.length,f=a2,q=0;q<c.length;c.length===s||(0,A.e)(c),++q){e=c[q]
B.a.v(b,e,B.a.i(b,e).L(0,f))
if(typeof e!=="number")return e.L()
if(B.h.W(e+1,g)===0)f=B.a.i(b,e)}return b}}
A.kE.prototype={
$1(a){return A.ay(a).toLowerCase()},
$S:22}
A.kD.prototype={
$1(a){var s=t.lu.a(a).b
if(0>=s.length)return A.c(s,0)
s=s[0]
s.toString
return s},
$S:48}
A.eA.prototype={
bK(a){var s,r,q=a.a
if(q==null)q=this.a
s=a.b
if(s==null)s=this.b
r=a.c
return new A.eA(q,s,r==null?this.c:r)},
l(a){return"fill: "+A.l(this.a)+", stroke: "+A.l(this.b)+" "+A.l(this.c)+"pt"}}
A.eL.prototype={
t(){return A.rh(this)}}
A.bZ.prototype={
t(){return A.r6(this)},
jh(){var s=this,r=s.a6
B.b.ez(r)
s.a6=A.r7(r)
if(!$.hO.aj(s.a7)||!$.hO.i(0,s.a7).aj(s.a6))throw A.d(s.a6+" need to be preloaded")
r=$.hO.i(0,s.a7).i(0,s.a6)
r.toString
s.snU(0,r)
s.saH(t.y.a(A.a([],t.l)))
s.sb9(t.a.a(A.a([],t.r)))
s.bL()
s.h4()
r=s.a
r===$&&A.b("color")
s.aV(r)
s.dA(0.035)},
l(a){return this.b5()+"("+this.a6+")"},
en(a,b,c){var s=null,r=new A.eL(a,s,4,0,!1,0.01,!1,0.000001,4,s,s,s,B.c,$,s,$,$,$)
r.ae(B.c,s,s)
if(c!=null)return this.bT(b.bK(this.bt(c)),r)
else return this.bT(b,r)},
jR(a,b){return this.en(a,b,null)},
sbm(a,b){this.ag=A.fk(b)},
gbm(a){return this.ag}}
A.eq.prototype={
t(){return A.qI(this)},
ny(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1="submobjects",a2=A.a([],t.nn)
for(s=a.cc,r=s.length,q=t.a,p=a.aX,o=t.s,n=t.N,m=t.h,l=t.r,k=t.j,j=0,i=0;i<s.length;s.length===r||(0,A.e)(s),++i,j=e){h=new A.bZ(s[i],a.a7,!0,2,a0,"",!0,A.bp(n,m),4,0,!1,0.01,!1,0.000001,4,a0,a0,a0,B.c,$,a0,$,$,$)
h.ae(B.c,a0,a0)
g=h.r
g===$&&A.b("points")
if(J.c8(g))h.h4()
h.a=B.c
h.jh()
g=h.d
g===$&&A.b(a1)
f=g.length
e=j+f+B.a.aC(A.a(p.split(" "),o),"").length
if(f===0){h.sb9(q.a(A.a([A.ou(B.e)],l)))
g=a.d
g===$&&A.b(a1)
d=g.length
c=Math.min(j,d-1)
if(c>>>0!==c||c>=d)return A.c(g,c)
g=k.a(g[c])
h.c_(g.aq(B.j))}else{g=a.d
g===$&&A.b(a1)
A.aK(j,e,g.length)
d=A.v(g)
b=new A.aD(g,j,e,d.h("aD<1>"))
b.c3(g,j,e,d.c)
h.sb9(q.a(b.ap(0)))}B.a.p(a2,h)}a.sb9(q.a(a2))},
kx(a,b,c){var s,r,q,p=new A.kf(!0,!0),o=A.a([],t.nn),n=this.d
n===$&&A.b("submobjects")
s=n.length
r=0
for(;r<n.length;n.length===s||(0,A.e)(n),++r){q=n[r]
if(q instanceof A.bZ&&A.az(p.$2(a,q.a6)))o.push(q)}return o},
lb(a,b,c,d){var s,r,q,p=this.kx(a,!0,!0)
for(s=p.length,r=0;r<p.length;p.length===s||(0,A.e)(p),++r){q=p[r]
q.eS(b,!0)
q.eW(b,!0)
q.hR(b,!0)}},
lc(a){var s,r
t.fg.a(a)
for(s=a.ge4(a),s=new A.cs(s.a(),s.$ti.h("cs<1>"));s.m();){r=s.gu()
this.lb(r.a,r.b,!0,!0)}},
spO(a){this.cc=t.I.a(a)}}
A.kf.prototype={
$2(a,b){var s
if(!this.a){a=a.toLowerCase()
b=b.toLowerCase()}s=B.b.F(b,a)
return s},
$S:49}
A.hg.prototype={
m1(a){this.aJ(t.a.a(A.a([this.w],t.r)))
this.fv()},
fm(a,b,c,d){var s,r
A.iM(d,t.e,"IEvent","addEventListener")
s=new A.b9(d.h("A(0)").a(c),b,d.h("b9<0>"))
r=$.dI()
t.d3.a(s)
r=r.gca().i(0,b)
r.toString
B.a.p(r,s)
return s}}
A.dY.prototype={
fv(){var s=this
s.sm8(t.gG.a(s.fm(0,B.x,new A.jm(s),t.gn)))
s.sm9(t.m4.a(s.fm(0,B.v,new A.jn(s),t.oJ)))
s.sma(t.mc.a(s.fm(0,B.w,new A.jo(s),t.nB)))},
t(){return A.qn(this)},
sm8(a){this.ay=t.gG.a(a)},
sm9(a){this.ch=t.m4.a(a)},
sma(a){this.CW=t.mc.a(a)}}
A.jm.prototype={
$1(a){var s
t.gn.a(a)
s=this.a
if(s.cx){s.w.c_(a.c)
return!0}return!1},
$S:50}
A.jn.prototype={
$1(a){var s,r=this.a,q=r.w,p=t.oJ.a(a).c,o=p.a
if(o>=q.aq(B.z).a-0.1)if(o<=q.aq(B.j).a+0.1){o=p.b
o=o>=q.aq(B.p).b-0.1&&o<=q.aq(B.K).b+0.1
s=o}else s=!1
else s=!1
if(s){r.cx=!0
q.c_(p)
return!0}return!1},
$S:51}
A.jo.prototype={
$1(a){t.nB.a(a)
return this.a.cx=!1},
$S:52}
A.H.prototype={
gke(){var s=this.e
if(s===$){s=A.a([],t.po)
this.sf3(s)}return s},
ae(a,b,c){var s=this,r=s.b5()
s.b=r
s.sb9(t.a.a(A.a([],t.r)))
s.f=!1
s.saH(t.y.a(A.a([],t.l)))
s.jD()
s.bL()},
l(a){return this.b5()},
b5(){var s=this.hS(0),r=A.ax("^Instance of '(.*?)'$").jz(s).b
if(1>=r.length)return A.c(r,1)
r=r[1]
r.toString
return r},
jD(){},
bL(){},
aJ(a){var s,r,q,p,o,n=t.a
n.a(a)
if(B.a.F(a,this))throw A.d("Mobject can't contain itself")
s=A.h(a,!0,t.j)
r=this.d
r===$&&A.b("submobjects")
q=r.length
p=0
for(;p<r.length;r.length===q||(0,A.e)(r),++p){o=r[p]
if(!B.a.F(a,o))s.push(o)}this.sb9(n.a(s))},
n1(a){var s,r,q,p,o,n=t.a
n.a(a)
if(B.a.F(a,this))throw A.d("Mobject can't contain itself")
s=A.a([],t.r)
r=this.d
r===$&&A.b("submobjects")
q=r.length
p=0
for(;p<r.length;r.length===q||(0,A.e)(r),++p){o=r[p]
if(!B.a.F(a,o))s.push(o)}B.a.M(s,a)
this.sb9(n.a(s))},
cv(a,b,c){var s,r,q,p,o,n,m,l
t.ew.a(c)
if(b==null)b=this.aq(a)
for(s=this.du(),r=s.length,q=t.y,p=t.l,o=0;o<s.length;s.length===r||(0,A.e)(s),++o){n=s[o]
m=A.a([],p)
l=n.r
l===$&&A.b("points")
l=J.I(l)
for(;l.m();)m.push(J.fu(c.$1(l.gu().I(0,b)),b))
n.saH(q.a(m))}},
iZ(a){return this.cv(B.e,null,a)},
t(){return A.qK(this)},
kd(a,b){var s,r,q=this,p=q.f
p===$&&A.b("updatingSuspended")
if(p)return
for(p=q.gke(),s=p.length,r=0;r<p.length;p.length===s||(0,A.e)(p),++r)p[r].$2(q,a)
p=q.d
p===$&&A.b("submobjects")
s=p.length
r=0
for(;r<p.length;p.length===s||(0,A.e)(p),++r)p[r].kd(a,!0)},
hj(a){return this.kd(a,!0)},
dU(a){t.k5.a(a)
B.a.p(this.gke(),a)
this.hj(0)},
pA(a){var s,r,q=this
t.k5.a(a)
s=t.po
while(!0){r=q.e
if(r===$){r=A.a([],s)
q.sf3(r)}if(!B.a.F(r,a))break
r=q.e
if(r===$){r=A.a([],s)
q.sf3(r)}B.a.a3(r,a)}},
az(a){return this.iZ(new A.kp(a))},
hx(a,b,c){return this.cv(B.e,c,new A.ko(b))},
eN(a,b,c){return this.cv(b,c,new A.kn(a))},
dA(a){return this.eN(a,B.e,null)},
hz(a,b){return this.eN(a,B.e,b)},
ey(a,b,c,d){this.cv(B.e,c,new A.km(A.um(b,d).gkc()))},
pF(a,b,c){return this.ey(a,b,c,B.m)},
he(a,b){return this.ey(a,b,null,B.m)},
lC(a,b,c,d){return this.cv(c,d,new A.kq(b,a))},
nf(a){var s={},r=A.fI(3)
s.a=r
s.a=r.bH(0,new A.kh(a))
this.iZ(new A.ki(s))},
fq(a,b){this.az(a.hG(0).A(0,new A.f(7.111111111111111,4,0)).I(0,this.aq(a)).I(0,a.A(0,b)).A(0,a.hG(0).mV(0)))},
k5(a,b,c,d,e){var s,r=this.h2(b)
if(r===0)return
s=a/r
if(e)this.lC(s,b,c,d)
else this.eN(s,c,d)},
eY(a,b){this.k5(a,0,B.e,null,b)},
dB(a,b){this.k5(a,1,B.e,null,b)},
le(a){return this.dB(a,!1)},
c_(a){this.az(a.I(0,this.aq(B.e)).A(0,new A.f(1,1,1)))},
p5(a,b){this.c_(a.aq(b==null?B.e:b))},
p0(a){return this.p5(a,null)},
cH(a,b){var s,r=this,q=r.b6(),p=r.b_(),o=p.I(0,q)
if(q.U(0,p))throw A.d("Cannot position endpoints of a closed loop")
s=b.I(0,a)
r.hz(Math.sqrt(s.bd())/Math.sqrt(o.bd()),q)
r.pF(0,s.d1()-o.d1(),q)
r.az(a.I(0,q))},
c2(a,b){var s,r,q=this.d
q===$&&A.b("submobjects")
s=q.length
r=0
for(;r<q.length;q.length===s||(0,A.e)(q),++r)q[r].c2(a,!0)
this.a=a},
d8(a,b){var s,r,q=this.d
q===$&&A.b("submobjects")
s=q.length
r=0
for(;r<q.length;q.length===s||(0,A.e)(q),++r)q[r].d8(a,!0)},
fQ(a){return this.d8(a,!0)},
bM(){var s,r,q,p=A.a([this],t.r),o=this.d
o===$&&A.b("submobjects")
s=o.length
r=0
for(;r<o.length;o.length===s||(0,A.e)(o),++r)B.a.M(p,o[r].bM())
q=A.mP(p,t.j)
return A.h(q,!0,A.D(q).h("b_.E"))},
du(){var s=this.bM(),r=A.v(s),q=r.h("am<1>")
return A.h(new A.am(s,r.h("A(1)").a(new A.kk()),q),!0,q.h("j.E"))},
eD(){var s,r,q,p,o=A.a([],t.l)
for(s=this.du(),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q].r
p===$&&A.b("points")
B.a.M(o,p)}return o},
eK(){return this.eD()},
dt(a,b,c){var s,r,q
t.fA.a(c)
if(c==null)c=this.eK()
s=A.a([],t.n)
for(r=c.length,q=0;q<c.length;c.length===r||(0,A.e)(c),++q)s.push(c[q].c1(a))
if(b<0)return B.a.aT(s,B.P)
else if(b===0)return(B.a.aT(s,B.P)+B.a.aT(s,B.C))/2
else return B.a.aT(s,B.C)},
ks(a,b){return this.dt(a,b,null)},
aq(a){var s=this,r=s.eK()
if(r.length===0)return B.e
return new A.f(s.dt(0,B.h.br(a.a),r),s.dt(1,B.h.br(a.b),r),s.dt(2,B.h.br(a.c),r))},
kq(){var s=B.a.aT(this.eD(),new A.kj()),r=this.r
r===$&&A.b("points")
return s.aZ(0,J.N(r))},
h2(a){var s,r,q,p=this.eD()
if(p.length===0)return 1
s=A.v(p)
r=new A.J(p,s.h("p(1)").a(new A.kl(a)),s.h("J<1,p>"))
q=r.aT(0,B.P)
return r.aT(0,B.C)-q},
eF(a,b){return this.ks(a,B.h.br(B.e.c1(a)))},
b6(){this.an("getStart")
var s=this.r
s===$&&A.b("points")
return J.aF(s)},
b_(){this.an("getEnd")
var s=this.r
s===$&&A.b("points")
return J.aG(s)},
gn(a){var s=A.a([],t.r),r=this.r
r===$&&A.b("points")
if(J.c8(r))s.push(this)
r=this.d
r===$&&A.b("submobjects")
B.a.M(s,r)
return s.length},
f0(a){var s=A.a([],t.r),r=this.r
r===$&&A.b("points")
if(J.c8(r))s.push(this)
r=this.d
r===$&&A.b("submobjects")
B.a.M(s,r)
return s},
fp(a){var s,r,q,p,o,n=this,m="points",l="submobjects",k=n.r
k===$&&A.b(m)
if(J.cz(k)){k=a.r
k===$&&A.b(m)
k=J.c8(k)}else k=!1
if(k)a.jW()
k=a.r
k===$&&A.b(m)
if(J.cz(k)&&J.c8(n.r))n.jW()
s=n.f0(0).length
r=a.f0(0).length
n.iP(Math.max(0,r-s))
a.iP(Math.max(0,s-r))
n.iV(a)
k=n.d
k===$&&A.b(l)
q=a.d
q===$&&A.b(l)
q=new A.ai(A.a([k,q],t.Z),t.Y)
q=q.gH(q)
for(;q.m();){p=q.b
if(p==null)p=A.M(A.al("No element"))
k=p.length
if(0>=k)return A.c(p,0)
o=p[0]
if(1>=k)return A.c(p,1)
o.fp(p[1])}},
hs(){throw A.d("getPointMobject not implemented for "+A.l(this.gkw())+"()")},
iV(a){var s,r,q=this.r
q===$&&A.b("points")
s=J.N(q)
q=a.r
q===$&&A.b("points")
r=J.N(q)
if(s<r)this.iW(a)
else if(s>r)a.iW(this)},
iW(a){throw A.d("Not implemented")},
jW(){var s=this.t(),r=t.r,q=t.a
s.sb9(q.a(A.a([],r)))
this.saH(t.y.a(A.a([],t.l)))
this.aJ(q.a(A.a([s],r)))},
iP(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this
if(a2===0)return
s=a1.f0(0).length
if(s===0){r=A.a([],t.r)
for(q=A.E(a2,0,1),p=q.length,o=0;o<q.length;q.length===p||(0,A.e)(q),++o)r.push(a1.hs())
a1.sb9(t.a.a(r))}n=s+a2
r=t.t
q=A.a([],r)
for(p=A.E(n,0,1),m=p.length,o=0;o<p.length;p.length===m||(0,A.e)(p),++o){l=p[o]
if(typeof l!=="number")return l.A()
q.push(B.h.b0(l*s,n))}p=A.a([],r)
for(m=A.E(s,0,1),k=m.length,j=t.S,o=0;o<m.length;m.length===k||(0,A.e)(m),++o){i=m[o]
h=A.a([],r)
for(g=q.length,f=J.bi(i),e=0;e<q.length;q.length===g||(0,A.e)(q),++e)if(f.U(i,q[e]))h.push(1)
else h.push(0)
p.push(A.iQ(h,j))}d=A.a([],t.r)
r=a1.d
r===$&&A.b("submobjects")
p=new A.ai(A.a([r,p],t.bo),t.c2)
p=p.gH(p)
r=t.j
for(;p.m();){c=p.b
if(c==null)c=A.M(A.al("No element"))
q=c.length
if(0>=q)return A.c(c,0)
b=r.a(c[0])
if(1>=q)return A.c(c,1)
a=A.a_(c[1])
B.a.p(d,b)
for(q=A.E(a,1,1),m=q.length,o=0;o<q.length;q.length===m||(0,A.e)(q),++o){a0=b.t()
a0.fQ(1)
B.a.p(d,a0)}}a1.sb9(t.a.a(d))},
h_(a,b,c){},
dl(a,b,c){},
j0(a){var s,r,q,p,o,n,m
this.fp(a)
for(s=new A.ai(A.a([this.bM(),a.bM()],t.Z),t.Y),s=s.gH(s),r=t.V,q=t.y;s.m();){p=s.b
if(p==null)p=A.M(A.al("No element"))
o=p.length
if(0>=o)return A.c(p,0)
n=p[0]
if(1>=o)return A.c(p,1)
m=p[1]
o=m.r
o===$&&A.b("points")
n.saH(q.a(A.h(o,!0,r)))
n.h_(n,m,1)}},
an(a){var s=this.r
s===$&&A.b("points")
if(J.c8(s))return
throw A.d("Cannot call Mobject."+a+" , the mobject doesn't have any points")},
sb9(a){this.d=t.a.a(a)},
sf3(a){this.e=t.le.a(a)},
saH(a){this.r=t.y.a(a)}}
A.kp.prototype={
$1(a){return a.L(0,this.a)},
$S:4}
A.ko.prototype={
$1(a){return a.A(0,this.a)},
$S:4}
A.kn.prototype={
$1(a){return a.A(0,this.a)},
$S:4}
A.km.prototype={
$1(a){return a.bI(this.a)},
$S:4}
A.kq.prototype={
$1(a){var s=this.a
return a.q5(s,a.c1(s)*this.b)},
$S:4}
A.kh.prototype={
$2(a,b){var s,r,q,p
t.o.a(b)
s=b.a
r=this.a
q=r.b
q===$&&A.b("shape")
p=q.a
if(typeof s!=="number")return s.cL()
if(typeof p!=="number")return A.bj(p)
if(s<p){s=b.b
q=q.b
if(typeof s!=="number")return s.cL()
if(typeof q!=="number")return A.bj(q)
q=s>=q
s=q}else s=!0
return s?a:r.be(b)},
$S:2}
A.ki.prototype={
$1(a){return a.bI(this.a.a)},
$S:4}
A.kk.prototype={
$1(a){var s=t.j.a(a).r
s===$&&A.b("points")
return J.N(s)>0},
$S:15}
A.kj.prototype={
$2(a,b){var s=t.V
return s.a(a).L(0,s.a(b))},
$S:23}
A.kl.prototype={
$1(a){return t.V.a(a).c1(this.a)},
$S:29}
A.d8.prototype={
t(){return A.qu(this)}}
A.R.prototype={
t(){return A.rt(this)},
jD(){var s=this,r=s.ax
if(r==null){r=s.a
r===$&&A.b("color")
r=A.a([r],t.O)}s.ld(r)
r=s.ay
if(r==null){r=s.a
r===$&&A.b("color")
r=A.a([r],t.O)}s.li(r,s.gaF())
s.la(s.ch,s.x)},
cP(a,b,c){var s,r,q,p,o,n=this
t.x.a(b)
s=t.O
r=A.a([],s)
if(b!=null)B.a.M(r,b)
if(a!=null)r.push(a)
if(c)for(q=n.cO(),p=q.length,o=0;o<q.length;q.length===p||(0,A.e)(q),++o)q[o].hC(r,!1)
if(r.length!==0){if(n.ax==null)n.scd(r)
q=n.ax
q.toString
q=J.N(q)
p=r.length
if(q<p){q=n.ax
q.toString
n.scd(A.d1(q,p,t.G))}else{q=n.ax
q.toString
if(p<J.N(q)){q=n.ax
q.toString
n.scd(A.d1(r,J.N(q),t.G))}}s=A.a([],s)
q=n.ax
q.toString
q=A.E(J.N(q),0,1)
p=q.length
o=0
for(;o<q.length;q.length===p||(0,A.e)(q),++o)s.push(B.a.i(r,q[o]))
n.scd(s)}},
cm(a){return this.cP(a,null,!0)},
eS(a,b){return this.cP(a,null,b)},
hC(a,b){return this.cP(null,a,b)},
ld(a){return this.cP(null,a,!0)},
by(a,b,c,d,e){var s,r,q,p,o,n=this
t.x.a(c)
s=t.O
r=A.a([],s)
if(c!=null)B.a.M(r,c)
if(b!=null)r.push(b)
if(d)for(q=n.cO(),p=q.length,o=0;o<q.length;q.length===p||(0,A.e)(q),++o)q[o].lj(a,r,!1,e)
if(r.length!==0)if(a){if(n.ch==null)n.scw(r)
q=n.ch
q.toString
q=J.N(q)
p=r.length
if(q<p){q=n.ch
q.toString
n.scw(A.d1(q,p,t.G))}else{q=n.ch
q.toString
if(p<J.N(q)){q=n.ch
q.toString
n.scw(A.d1(r,J.N(q),t.G))}}s=A.a([],s)
q=n.ay
q.toString
q=A.E(J.N(q),0,1)
p=q.length
o=0
for(;o<q.length;q.length===p||(0,A.e)(q),++o)s.push(B.a.i(r,q[o]))
n.sbP(s)}else{if(n.ay==null)n.sbP(r)
q=n.ay
q.toString
q=J.N(q)
p=r.length
if(q<p){q=n.ay
q.toString
n.sbP(A.d1(q,p,t.G))}else{q=n.ay
q.toString
if(p<J.N(q)){q=n.ay
q.toString
n.sbP(A.d1(r,J.N(q),t.G))}}s=A.a([],s)
q=n.ay
q.toString
q=A.E(J.N(q),0,1)
p=q.length
o=0
for(;o<q.length;q.length===p||(0,A.e)(q),++o)s.push(B.a.i(r,q[o]))
n.sbP(s)}if(e!=null)if(a)n.x=e
else n.saF(e)},
eU(a){return this.by(!1,a,null,!0,null)},
eW(a,b){return this.by(!1,a,null,b,null)},
lj(a,b,c,d){return this.by(a,null,b,c,d)},
lh(a,b){return this.by(!1,null,a,b,null)},
hD(a,b){return this.by(!1,a,null,!0,b)},
li(a,b){return this.by(!1,null,a,!0,b)},
eV(a){return this.by(!1,null,null,!0,a)},
eR(a,b,c,d){return this.by(!0,a,t.x.a(b),c,d)},
l9(a,b){return this.eR(null,a,b,null)},
la(a,b){return this.eR(null,a,!0,b)},
hF(a,b){return this.ll(a.d,a.e,b,a.a,a.b,a.c)},
eX(a){return this.hF(a,!0)},
hE(a,b,c,d,e,f,g,h){var s=t.x
s.a(e)
s.a(g)
s.a(a)
this.cP(d,e,c)
this.by(!1,f,g,c,h)
this.eR(null,a,c,b)},
ll(a,b,c,d,e,f){return this.hE(a,b,c,null,d,null,e,f)},
lk(a,b,c){return this.hE(null,null,!0,a,null,b,null,c)},
eE(){var s=J.Z(this.bu(),0)
return s},
c2(a,b){this.eS(a,!0)
this.eW(a,!0)
this.hR(a,!0)},
aV(a){return this.c2(a,!0)},
h3(a,b){var s,r,q="submobjects",p="removeWhere",o=a.bu(),n=a.cN(),m=a.gaF(),l=a.bv(!0),k=a.x
this.hF(new A.co(o,n,m,l,k),!1)
if(b){o=this.d
o===$&&A.b(q)
n=a.d
n===$&&A.b(q)
if(o.length===0)return
else if(n.length===0)s=A.a([a],t.r)
else s=n
n=A.v(o).h("A(1)").a(new A.lc())
if(!!o.fixed$length)A.M(A.S(p))
B.a.fj(o,n,!0)
n=A.v(s).h("A(1)").a(new A.ld())
if(!!s.fixed$length)A.M(A.S(p))
B.a.fj(s,n,!0)
for(n=t.j,n=A.uh(o,s,n,n),n=A.eo([n.a,n.b],!1,t.z),n=new A.ai(new A.aU(n,A.v(n).h("aU<1,k<R>>")),t.pn),n=n.gH(n);n.m();){r=n.b
if(r==null)r=A.M(A.al("No element"))
o=r.length
if(0>=o)return A.c(r,0)
m=r[0]
if(1>=o)return A.c(r,1)
m.h3(r[1],!0)}}},
jM(a){return this.h3(a,!0)},
d8(a,b){var s,r,q,p=this,o=1-a,n=t.O,m=A.a([],n)
for(s=J.I(p.bu());s.m();){r=s.gu()
q=r.d
m.push(new A.P(r.a,r.b,r.c,q*o))}p.hC(m,!0)
m=A.a([],n)
for(s=J.I(p.cN());s.m();){r=s.gu()
q=r.d
m.push(new A.P(r.a,r.b,r.c,q*o))}p.lh(m,!0)
n=A.a([],n)
for(m=J.I(p.bv(!0));m.m();){s=m.gu()
r=s.d
n.push(new A.P(s.a,s.b,s.c,r*o))}p.l9(n,!0)
p.lT(a,!0)},
fQ(a){return this.d8(a,!0)},
bu(){var s=this.ax
return s==null?A.a([B.k],t.O):s},
bv(a){var s=a?this.ch:this.ay
return s==null||J.cz(s)?A.a([B.k],t.O):s},
cN(){return this.bv(!1)},
kv(){var s,r,q,p,o,n=this.aq(B.e),m=A.a([],t.b)
for(s=[B.j,B.K,B.m],r=t.n,q=0;q<3;++q){p=this.aq(s[q]).I(0,n)
m.push(A.a([p.a,p.b,p.c],r))}o=B.j.bI(A.aB(null,m).gkc())
return new A.C(n.I(0,o),n.L(0,o),t.iu)},
eQ(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.y
g.a(a)
g.a(b)
g.a(c)
g.a(d)
s=h.at
r=a.length
q=A.a([],t.l)
for(r=A.E(s*r,0,1),p=r.length,o=0;o<r.length;r.length===p||(0,A.e)(r),++o)q.push(B.e)
h.saH(g.a(q))
n=A.a([a,b,c,d],t.Q)
for(g=A.E(s,0,1),r=g.length,q=t.S,o=0;o<g.length;g.length===r||(0,A.e)(g),++o){m=g[o]
l=B.a.i(n,m)
p=h.r
p===$&&A.b("points")
for(p=A.d0(A.E(J.N(p),m,s),q),k=p.length,j=0;j<p.length;p.length===k||(0,A.e)(p),++j){i=p[j]
J.fv(h.r,i.b,l[B.d.W(i.a,l.length)])}}},
mZ(a,b,c){var s,r,q,p=this
p.an("addCubicBezierCurveTo")
s=p.r
s===$&&A.b("points")
r=t.l
q=t.y
if(B.d.W(J.N(s),p.at)===1){s=q.a(A.a([a,b,c],r))
J.af(p.r,s)}else{s=q.a(A.a([J.aG(p.r),a,b,c],r))
J.af(p.r,s)}},
cZ(a){var s,r,q,p,o,n,m=[]
for(s=A.fs(this.at,1,0).ee(),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q]
o=this.r
o===$&&A.b("points")
m.push(J.aG(o).A(0,1-p).L(0,a.A(0,p)))}s=m.length
if(1>=s)return A.c(m,1)
r=t.V
o=r.a(m[1])
if(2>=s)return A.c(m,2)
n=r.a(m[2])
if(3>=s)return A.c(m,3)
return this.mZ(o,n,r.a(m[3]))},
n_(a){var s,r
t.y.a(a)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.e)(a),++r)this.cZ(a[r])},
eT(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
t.y.a(a)
s=A.fs(this.at,1,0).aL(0)
r=t.V
q=A.iY(A.bK(a,r))
p=A.iY(A.nw(a,r))
r=A.a([],t.fp)
for(o=s.length,n=0;n<s.length;s.length===o||(0,A.e)(s),++n){m=s[n]
r.push(p.A(0,1-m).L(0,q.A(0,m)))}o=A.a([],t.Q)
for(l=r.length,k=t.l,n=0;n<r.length;r.length===l||(0,A.e)(r),++n){j=r[n]
i=A.a([],k)
h=j.a
h===$&&A.b("values")
g=h.length
f=0
for(;f<h.length;h.length===g||(0,A.e)(h),++f){e=h[f]
d=J.X(e)
i.push(new A.f(d.i(e,0),d.i(e,1),d.i(e,2)))}o.push(i)}r=o.length
if(0>=r)return A.c(o,0)
l=o[0]
if(1>=r)return A.c(o,1)
k=o[1]
if(2>=r)return A.c(o,2)
i=o[2]
if(3>=r)return A.c(o,3)
this.eQ(l,k,i,o[3])},
nC(b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8="No element",a9=this.at
for(s=this.cO(),r=s.length,q=t.y,p=t.V,o=t.l,n=t.Q,m=t.b5,l=b0==="smooth",k=0;k<s.length;s.length===r||(0,A.e)(s),++k){j=s[k]
i=j.r
i===$&&A.b("points")
h=j.dz(A.h(i,!0,p))
j.saH(q.a(A.a([],o)))
for(i=h.length,g=0;g<h.length;h.length===i||(0,A.e)(h),++g){f=h[g]
e=A.h(A.de(f,new A.l5(a9),p),!0,p)
e.push(B.a.gq(f))
if(l){d=A.u3(e)
c=d.a
b=d.b}else{a=A.h(e,!0,p)
if(0>=a.length)return A.c(a,-1)
a.pop()
a0=A.bK(e,p)
e=A.a([],o)
for(a1=new A.ai(A.a([a,a0],n),m),a1=a1.gH(a1);a1.m();){a2=a1.b
if(a2==null)a2=A.M(A.al(a8))
a3=a2.length
if(0>=a3)return A.c(a2,0)
a4=a2[0]
if(1>=a3)return A.c(a2,1)
a3=a2[1]
e.push(p.a(J.fu(J.bk(a4,0.6666666666666667),J.bk(a3,0.3333333333333333))))}a1=A.a([],o)
for(a=new A.ai(A.a([a,a0],n),m),a=a.gH(a);a.m();){a2=a.b
if(a2==null)a2=A.M(A.al(a8))
a3=a2.length
if(0>=a3)return A.c(a2,0)
a4=a2[0]
if(1>=a3)return A.c(a2,1)
a3=a2[1]
a1.push(p.a(J.fu(J.bk(a4,0.33333333333333337),J.bk(a3,0.6666666666666666))))}b=a1
c=e}e=A.a([],o)
for(a=A.d0(f,p),a1=a.length,a3=J.X(b),a5=0;a5<a.length;a.length===a1||(0,A.e)(a),++a5){a6=a[a5]
a4=a6.a
if(typeof a4!=="number")return a4.W()
a7=B.d.W(a4,a9)
if(a7===1){if(!(a4>=0&&a4<c.length))return A.c(c,a4)
e.push(c[a4])}else if(a7===2)e.push(a3.i(b,a4))
else e.push(a6.b)}q.a(e)
a=this.r
a===$&&A.b("points")
J.af(a,e)}}},
c8(a){var s,r=this
t.ew.a(a)
s=r.z
r.hy(s)
r.lS(B.e,B.e,a)
r.hy(1/s)
if(r.Q)r.nC("smooth")},
hy(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=null
for(s=this.cO(),r=s.length,q=t.l,p=t.n,o=t.b,n=this.at,m=0;m<s.length;s.length===r||(0,A.e)(s),++m){l=s[m]
k=l.r
k===$&&A.b("points")
if(J.N(k)<n)continue
j=l.kn()
k=A.a([],o)
if(0>=j.length)return A.c(j,0)
i=j[0]
h=i.length
g=0
for(;g<i.length;i.length===h||(0,A.e)(i),++g){f=i[g]
k.push(A.a([f.a,f.b,f.c],p))}e=A.aB(a4,k)
k=A.a([],o)
if(1>=j.length)return A.c(j,1)
i=j[1]
h=i.length
g=0
for(;g<i.length;i.length===h||(0,A.e)(i),++g){f=i[g]
k.push(A.a([f.a,f.b,f.c],p))}d=A.aB(a4,k)
k=A.a([],o)
if(2>=j.length)return A.c(j,2)
i=j[2]
h=i.length
g=0
for(;g<i.length;i.length===h||(0,A.e)(i),++g){f=i[g]
k.push(A.a([f.a,f.b,f.c],p))}c=A.aB(a4,k)
k=A.a([],o)
if(3>=j.length)return A.c(j,3)
i=j[3]
h=i.length
g=0
for(;g<i.length;i.length===h||(0,A.e)(i),++g){f=i[g]
k.push(A.a([f.a,f.b,f.c],p))}b=A.aB(a4,k)
a=d.I(0,e)
a0=c.I(0,b)
k=A.a([],q)
i=a.b
i===$&&A.b("shape")
i=e.L(0,A.bl(a5,i).A(0,a)).a
i===$&&A.b("values")
h=i.length
g=0
for(;g<i.length;i.length===h||(0,A.e)(i),++g){a1=i[g]
a2=J.X(a1)
k.push(new A.f(a2.i(a1,0),a2.i(a1,1),a2.i(a1,2)))}i=A.a([],q)
h=a0.b
h===$&&A.b("shape")
h=b.L(0,A.bl(a5,h).A(0,a0)).a
h===$&&A.b("values")
a2=h.length
g=0
for(;g<h.length;h.length===a2||(0,A.e)(h),++g){a1=h[g]
a3=J.X(a1)
i.push(new A.f(a3.i(a1,0),a3.i(a1,1),a3.i(a1,2)))}h=j.length
if(0>=h)return A.c(j,0)
a2=j[0]
if(3>=h)return A.c(j,3)
l.eQ(a2,k,i,j[3])}},
fE(a,b){var s=this.as,r=b.a
if(Math.abs(a.a-r)>s+0.00001*Math.abs(r))return!1
r=b.b
if(Math.abs(a.b-r)>s+0.00001*Math.abs(r))return!1
return!0},
jc(a,b){var s
if(!this.fE(a,b))return!1
s=b.c
if(Math.abs(a.c-s)>this.as+0.00001*Math.abs(s))return!1
return!0},
eC(a){var s,r,q,p,o,n,m,l={}
l.a=a
t.y.a(a)
l.a=a
s=A.de(a,new A.l6(l,B.d.W(J.N(a),this.at)),t.V)
l.a=A.h(s,!0,s.$ti.h("j.E"))
s=A.a([],t.ez)
for(r=A.E(J.N(l.a),0,4),q=r.length,p=t.cn,o=0;o<r.length;r.length===q||(0,A.e)(r),++o){n=r[o]
m=l.a
if(typeof n!=="number")return n.L()
s.push(new A.du(J.Z(m,n+0),J.Z(l.a,n+1),J.Z(l.a,n+2),J.Z(l.a,n+3),p))}return s},
ie(a,b){var s,r,q,p,o,n,m,l,k
t.y.a(a)
t.gw.a(b)
s=this.at
r=A.E(a.length,s,s)
q=A.v(r)
q=A.h(new A.am(r,q.h("A(1)").a(b),q.h("am<1>")),!0,t.S)
q.push(a.length)
r=A.a([0],t.t)
B.a.M(r,q)
p=A.a([],t.Q)
for(r=new A.ai(A.a([r,q],t.fC),t.lb),r=r.gH(r),q=A.v(a),o=q.c,q=q.h("aD<1>");r.m();){n=r.b
if(n==null)n=A.M(A.al("No element"))
if(1>=n.length)return A.c(n,1)
m=n[1]
l=n[0]
if(typeof m!=="number")return m.I()
if(typeof l!=="number")return A.bj(l)
if(m-l>=s){A.a_(l)
A.a_(m)
A.aK(l,m,a.length)
k=new A.aD(a,l,m,q)
k.c3(a,l,m,o)
p.push(k.ap(0))}}return p},
dz(a){t.y.a(a)
return this.ie(a,new A.l9(this,a))},
kC(a){t.y.a(a)
return this.ie(a,new A.l8(this,a))},
eo(a){var s,r,q,p=this.r
p===$&&A.b("points")
s=this.at
r=A.no(0,B.d.b0(J.N(p),s),a)
q=r.a
return A.nj(J.nF(this.r,s*q,s*(q+1)).ap(0)).$1(r.b)},
kn(){var s,r,q,p=A.a([],t.Q)
for(s=A.E(this.at,0,1),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q)p.push(this.dH(s[q]))
return p},
dH(a){var s=this.r
s===$&&A.b("points")
s=A.de(s,new A.l1(this,a),t.V)
return A.h(s,!0,s.$ti.h("j.E"))},
hn(){var s=this,r=s.r
r===$&&A.b("points")
if(J.N(r)===1)return s.r
r=t.b5
r=A.nX(A.h(new A.ai(A.a([s.dH(0),s.dH(s.at-1)],t.Q),r),!0,r.h("j.E")),t.V)
return A.h(r,!0,r.$ti.h("j.E"))},
eK(){var s,r,q,p=A.a([],t.l)
for(s=this.cO(),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q)B.a.M(p,s[q].hn())
return p},
kp(){var s,r,q,p,o,n,m=this.r
m===$&&A.b("points")
s=4*B.d.b0(J.N(m),this.at)+1
m=t.l
r=A.a([],m)
for(q=A.fs(s,1,0).aL(0),p=q.length,o=0;o<q.length;q.length===p||(0,A.e)(q),++o)r.push(this.eo(q[o]))
m=A.a([],m)
for(q=A.E(s-1,0,1),p=q.length,o=0;o<q.length;q.length===p||(0,A.e)(q),++o){n=q[o]
if(typeof n!=="number")return n.L()
m.push(B.a.i(r,n+1).I(0,B.a.i(r,n)))}r=t.aQ
return A.iQ(A.h(new A.J(m,t.eL.a(new A.l7()),r),!0,r.h("B.E")),t.W)},
iV(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1="points"
t.bX.a(a2)
a0.nd(a2)
s=a0.r
s===$&&A.b(a1)
s=J.N(s)
r=a2.r
r===$&&A.b(a1)
if(s===J.N(r))return
for(s=[a0,a2],r=t.l,q=t.y,p=0;p<2;++p){o=s[p]
n=o.r
n===$&&A.b(a1)
if(J.cz(n)){n=q.a(A.a([o.aq(B.e)],r))
J.af(o.r,n)}if(B.d.W(J.N(o.r),o.at)===1)o.cZ(J.aG(o.r))}s=t.V
m=a0.dz(A.h(a0.r,!0,s))
l=a2.dz(A.h(a2.r,!0,s))
k=Math.max(m.length,l.length)
j=A.a([],r)
i=A.a([],r)
h=a0.at
g=new A.l4(h)
for(s=A.E(k,0,1),r=s.length,p=0;p<s.length;s.length===r||(0,A.e)(s),++p){f=s[p]
e=g.$2(m,f)
d=g.$2(l,f)
n=J.X(d)
c=J.X(e)
b=Math.max(0,B.d.b0(n.gn(d)-c.gn(e),h))
a=Math.max(0,B.d.b0(c.gn(e)-n.gn(d),h))
e=a0.fZ(b,e)
d=a0.fZ(a,d)
B.a.M(j,e)
B.a.M(i,d)}a0.saH(q.a(j))
a2.saH(q.a(i))},
fZ(a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6="No element"
t.y.a(a8)
if(a8.length===1){s=A.a([],t.l)
for(r=A.E(this.at*a7,0,1),q=r.length,p=0;p<r.length;r.length===q||(0,A.e)(r),++p)B.a.M(s,a8)
return s}o=this.eC(a8)
n=o.length
m=n+a7
s=t.t
r=A.a([],s)
for(q=A.E(m,0,1),l=q.length,p=0;p<q.length;q.length===l||(0,A.e)(q),++p){k=q[p]
if(typeof k!=="number")return k.A()
r.push(B.h.b0(k*n,m))}q=A.a([],s)
for(l=A.E(n,0,1),j=l.length,i=t.S,p=0;p<l.length;l.length===j||(0,A.e)(l),++p){k=l[p]
h=A.a([],s)
for(g=r.length,f=J.bi(k),e=0;e<r.length;r.length===g||(0,A.e)(r),++e)h.push(f.U(k,r[e])?1:0)
q.push(A.iQ(h,i))}d=A.a([],t.l)
for(s=new A.ai(A.a([o,q],t.bo),t.c2),s=s.gH(s),r=t.W,q=t.b,l=t.lx,j=t.z,i=t.cn;s.m();){c=s.b
if(c==null)c=A.M(A.al(a6))
h=c.length
if(0>=h)return A.c(c,0)
b=i.a(c[0])
if(1>=h)return A.c(c,1)
a=A.fs(A.a_(c[1])+1,1,0).aL(0)
for(h=new A.ai(A.a([a,A.bK(a,r)],q),l),h=h.gH(h),g=b.a,f=b.b,a0=b.c,a1=b.d;h.m();){a2=h.b
if(a2==null)a2=A.M(A.al(a6))
a3=A.eo([g,f,a0,a1],!1,j)
a4=a2.length
if(0>=a4)return A.c(a2,0)
a5=a2[0]
if(1>=a4)return A.c(a2,1)
B.a.M(d,A.mv(new A.aU(a3,A.v(a3).h("aU<1,f>")),a5,a2[1]))}}return d},
nd(a){var s,r,q,p,o,n,m,l,k=new A.l2(),j=new A.l3()
for(s=["fillColors","strokeColors","backgroundStrokeColors"],r=t.G,q=0;q<3;++q){p=s[q]
o=k.$2(p,this)
n=k.$2(p,a)
m=J.X(o)
l=J.X(n)
if(m.gn(o)>l.gn(n))j.$3(p,a,A.d1(n,m.gn(o),r))
else if(l.gn(n)>m.gn(o))j.$3(p,this,A.d1(o,l.gn(n),r))}},
hs(){var s=this.aq(B.e),r=A.ou(s)
r.jM(this)
return r},
h_(a,b,c){var s,r=this,q=t.bX
q.a(a)
q.a(b)
r.scd(A.np(a.bu(),b.bu(),c))
r.sbP(A.np(a.cN(),b.cN(),c))
r.scw(A.np(a.bv(!0),b.bv(!0),c))
q=t.W
r.saF(A.pq(a.gaF(),b.gaF(),c,q))
r.snm(A.pq(a.x,b.x,c,q))
s=new A.lb()
if(c===1){q=b.ax
r.scd(q!=null?s.$1(q):null)
q=b.ay
r.sbP(q!=null?s.$1(q):null)
q=b.ch
r.scw(q!=null?s.$1(q):null)
r.saF(b.gaF())
r.x=b.x}},
dl(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e="points"
t.bX.a(a)
if(b<=0&&c>=1){s=a.r
s===$&&A.b(e)
f.saH(t.y.a(A.h(s,!0,t.V)))
return}s=a.r
s===$&&A.b(e)
r=t.y
q=a.eC(r.a(A.h(s,!0,t.V)))
p=q.length
o=A.no(0,p,b)
n=A.no(0,p,c)
m=o.a
l=o.b
k=n.a
j=n.b
f.saH(r.a(A.a([],t.l)))
if(p===0)return
s=q.length
if(m===k){if(m>>>0!==m||m>=s)return A.c(q,m)
s=J.fw(q[m])
s=r.a(A.mv(new A.aU(s,A.v(s).h("aU<1,f>")),l,j))
r=f.r
r===$&&A.b(e)
J.af(r,s)}else{if(m>>>0!==m||m>=s)return A.c(q,m)
s=J.fw(q[m])
s=r.a(A.mv(new A.aU(s,A.v(s).h("aU<1,f>")),l,1))
i=f.r
i===$&&A.b(e)
J.af(i,s)
for(s=m+1,A.aK(s,k,q.length),s=A.bf(q,s,k,A.v(q).c),i=s.$ti,s=new A.O(s,s.gn(s),i.h("O<B.E>")),h=t.z,i=i.h("B.E");s.m();){g=s.d
if(g==null)g=i.a(g)
g=A.eo([g.a,g.b,g.c,g.d],!1,h)
g=r.a(new A.aU(g,A.v(g).h("aU<1,f>")))
J.af(f.r,g)}if(k>>>0!==k||k>=q.length)return A.c(q,k)
s=J.fw(q[k])
s=r.a(A.mv(new A.aU(s,A.v(s).h("aU<1,f>")),0,j))
J.af(f.r,s)}},
cO(){var s,r,q,p,o=A.a([],t.hJ)
for(s=this.bM(),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q]
if(p instanceof A.R)o.push(p)}return o},
saF(a){this.w=A.aP(a)},
snm(a){this.x=A.aP(a)},
scd(a){this.ax=t.x.a(a)},
sbP(a){this.ay=t.x.a(a)},
scw(a){this.ch=t.x.a(a)},
gaF(){return this.w},
gdX(){return this.y}}
A.a1.prototype={
$1(a){return t.G.a(a).t()},
$S:10}
A.a2.prototype={
$1(a){return t.G.a(a).t()},
$S:10}
A.a3.prototype={
$1(a){return t.G.a(a).t()},
$S:10}
A.lc.prototype={
$1(a){return!(t.j.a(a) instanceof A.R)},
$S:15}
A.ld.prototype={
$1(a){return!(t.j.a(a) instanceof A.R)},
$S:15}
A.l5.prototype={
$2(a,b){t.V.a(b)
return B.d.W(a,this.a)===0},
$S:6}
A.l6.prototype={
$2(a,b){t.V.a(b)
return a<J.N(this.a.a)-this.b},
$S:6}
A.l9.prototype={
$1(a){var s,r,q
A.a_(a)
s=this.b
r=a-1
q=s.length
if(!(r>=0&&r<q))return A.c(s,r)
r=s[r]
if(!(a>=0&&a<q))return A.c(s,a)
return!this.a.jc(r,s[a])},
$S:17}
A.l8.prototype={
$1(a){var s,r,q
A.a_(a)
s=this.b
r=a-1
q=s.length
if(!(r>=0&&r<q))return A.c(s,r)
r=s[r]
if(!(a>=0&&a<q))return A.c(s,a)
return!this.a.fE(r,s[a])},
$S:17}
A.l1.prototype={
$2(a,b){t.V.a(b)
return B.d.W(a,this.a.at)===this.b},
$S:6}
A.l7.prototype={
$1(a){return Math.sqrt(t.V.a(a).bd())},
$S:29}
A.l4.prototype={
$2(a,b){var s,r,q,p
t.ls.a(a)
s=a.length
if(b>=s){s=A.a([],t.l)
for(r=A.E(this.a,0,1),q=r.length,p=0;p<r.length;r.length===q||(0,A.e)(r),++p)s.push(B.a.gq(B.a.gq(a)))
return s}if(!(b>=0))return A.c(a,b)
return a[b]},
$S:59}
A.l2.prototype={
$2(a,b){switch(a){case"fillColors":return b.bu()
case"strokeColors":return b.cN()
case"backgroundStrokeColors":return b.bv(!1)
default:throw A.d(u.v+a)}},
$S:60}
A.l3.prototype={
$3(a,b,c){t.ev.a(c)
switch(a){case"fillColors":b.scd(c)
break
case"strokeColors":b.sbP(c)
break
case"backgroundStrokeColors":b.scw(c)
break
default:throw A.d(u.v+a)}},
$S:61}
A.lb.prototype={
$1(a){var s=t.G
return A.h(J.q(t.ev.a(a),new A.la(),s),!0,s)},
$S:62}
A.la.prototype={
$1(a){return t.G.a(a).t()},
$S:10}
A.co.prototype={}
A.c3.prototype={
f2(a){var s=a==null?A.a([],t.r):a
this.aJ(t.a.a(s))},
t(){return A.rr(this)}}
A.eS.prototype={
t(){return A.ru(this)}}
A.dT.prototype={
m_(a,b,c,d){var s,r,q,p,o,n,m,l
if(c>0){s=1/c
r=s*d
q=A.fs(c+1,1,0).aZ(0,1).I(0,s).L(0,r).aL(0)
p=A.a([],t.r)
for(o=q.length,n=0;n<q.length;q.length===o||(0,A.e)(q),++n){m=q[n]
if(typeof m!=="number")return m.L()
l=a.t()
l.dl(a,m,m+r)
p.push(l)}this.aJ(t.a.a(p))}this.h3(a,!1)},
t(){return A.qm(this)}}
A.dK.prototype={
lm(a){this.d=a}}
A.fQ.prototype={
ex(a){var s,r,q=this.d
q===$&&A.b("display")
s=q.b
s===$&&A.b("camera")
r=q.dV(a)
q=this.e
q===$&&A.b("ctx")
B.q.sfW(q,r.dq())
q=s.c
s=s.d
this.e.fillRect(0-q/2,0-s/2,q,s)},
pB(a){var s,r,q,p,o,n,m,l,k=this,j=a.r
j===$&&A.b("points")
j=t.y.a(A.h(j,!0,t.V))
s=k.d
s===$&&A.b("display")
s=s.b
s===$&&A.b("camera")
r=s.kb(a,j)
if(r.length===0)return
q=a.kC(r)
for(j=q.length,p="",o=0;o<q.length;q.length===j||(0,A.e)(q),++o)p+=k.kD(a,q[o])
n=A.qP(p)
k.j_(n,a,!0)
m=a.bu()
if(J.N(m)>1){j=k.e
j===$&&A.b("ctx")
B.q.sfW(j,k.jj(a,m))}else{l=k.d.dV(J.Z(a.bu(),0))
j=k.e
j===$&&A.b("ctx")
B.q.sfW(j,l.dq())}j=k.e
j===$&&A.b("ctx")
j.fill(n)
k.j_(n,a,!1)},
kD(a,b){var s,r,q,p,o,n,m,l,k,j
t.y.a(b)
s=a.eC(b)
r=J.aR(b)
q=r.gac(b)
p="M "+A.l(q.a)+" "+A.l(q.b)
o=a.fE(r.gac(b),r.gq(b))
for(r=s.length,n=0;n<r;++n){m=s[n]
l=m.b
k=m.c
j=m.d
p+=" C "+A.l(l.a)+" "+A.l(l.b)+" "+A.l(k.a)+" "+A.l(k.b)+" "+A.l(j.a)+" "+A.l(j.b)}return o?p+" Z":p},
jj(a,b){var s,r,q,p,o,n,m,l,k,j,i
t.ev.a(b)
s=a.kv()
r=t.y.a(A.a([s.a,s.b],t.l))
q=this.d
q===$&&A.b("display")
q=q.b
q===$&&A.b("camera")
p=q.kb(a,r)
r=this.e
r===$&&A.b("ctx")
q=p.length
if(0>=q)return A.c(p,0)
o=p[0]
n=o.a
o=o.b
if(1>=q)return A.c(p,1)
q=p[1]
q=r.createLinearGradient(n,o,q.a,q.b)
q.toString
o=J.X(b)
m=1/(o.gn(b)-1)
l=A.iL(m+1,0,m).aL(0)
for(r=A.E(o.gn(b),0,1),n=r.length,k=0;k<r.length;r.length===n||(0,A.e)(r),++k){j=r[k]
i=this.d.dV(o.i(b,j))
q.addColorStop(B.a.i(l,j),i.dq())}return q},
j_(a,b,c){var s,r,q,p,o,n=this,m=c?b.x:b.gaF()
if(m===0)return
s=b.bv(c)
r=n.d
r===$&&A.b("display")
r=r.b
r===$&&A.b("camera")
r=r.c
q=n.e
q===$&&A.b("ctx")
q.lineWidth=m*0.01*(r/14.222222222222221)
r=J.aR(s)
p=r.cA(s,new A.je())
if(r.gah(s)||p)return
if(r.gn(s)>1)B.q.shP(n.e,n.jj(b,s))
else{o=n.d.dV(J.aF(b.bv(c)))
B.q.shP(n.e,o.dq())}B.q.lE(n.e,a)}}
A.je.prototype={
$1(a){return t.G.a(a).d===0},
$S:63}
A.hJ.prototype={
m2(){this.f=new A.jb(B.aa)
new A.iy().m4(0)
this.shY(t.a.a(A.a([],t.r)))},
cK(){var s=0,r=A.bI(t.z),q=1,p,o=this,n,m,l,k
var $async$cK=A.bJ(function(a,b){if(a===1){p=b
s=q}while(true)switch(s){case 0:l=o.w
l===$&&A.b("display")
l.fv()
s=2
return A.an(null,$async$cK)
case 2:q=4
s=7
return A.an(o.bj(),$async$cK)
case 7:q=1
s=6
break
case 4:q=3
k=p
throw k
s=6
break
case 3:s=1
break
case 6:l=o.f
l===$&&A.b("camera")
m=l.r
m===$&&A.b("display")
m=m.a
m===$&&A.b("renderer")
m.ex(l.f)
l=o.f
m=o.d
m===$&&A.b("mobjects")
l.hd(m)
s=8
return A.an(null,$async$cK)
case 8:o.w.pT()
return A.bG(null,r)
case 1:return A.bF(p,r)}})
return A.bH($async$cK,r)},
cj(a){var s,r,q=this.d
q===$&&A.b("mobjects")
s=q.length
r=0
for(;r<q.length;q.length===s||(0,A.e)(q),++r)q[r].hj(a)},
aJ(a){var s
t.a.a(a)
this.pE(a)
s=this.d
s===$&&A.b("mobjects")
B.a.ei(s,0,a)},
k8(a,b){var s,r,q=this,p=t.a
p.a(b)
s=A.h(b,!0,t.j)
r=q.f
r===$&&A.b("camera")
B.a.M(s,r.fP(b))
r=q.d
r===$&&A.b("mobjects")
q.shY(p.a(q.kz(r,s)))},
pE(a){return this.k8(!0,a)},
kz(a,b){var s,r=t.a
r.a(a)
r.a(b)
s=A.a([],t.r)
new A.kF(s).$2(a,A.mP(b,A.v(b).c))
return s},
eq(a){var s=0,r=A.bI(t.z),q=this,p,o,n,m
var $async$eq=A.bJ(function(b,c){if(b===1)return A.bF(c,r)
while(true)switch(s){case 0:p=0
case 2:if(!(p<a.a)){s=3
break}o=q.w
o===$&&A.b("display")
s=4
return A.an(o.dj(),$async$eq)
case 4:n=c
p+=n
o=a.a
a.cj(n)
a.dh(p/o)
q.cj(n)
o=q.f
o===$&&A.b("camera")
m=o.r
m===$&&A.b("display")
m=m.a
m===$&&A.b("renderer")
m.ex(o.f)
o=q.f
m=q.d
m===$&&A.b("mobjects")
o.hd(m)
q.a+=n
s=2
break
case 3:return A.bG(null,r)}})
return A.bH($async$eq,r)},
aY(a,b){var s=0,r=A.bI(t.z),q=this,p,o,n,m
var $async$aY=A.bJ(function(c,d){if(c===1)return A.bF(d,r)
while(true)switch(s){case 0:m=q.f
m===$&&A.b("camera")
p=q.d
p===$&&A.b("mobjects")
o=m.fP(p)
b.d3()
n=b.r
if(!B.a.F(o,n)){q.aJ(t.a.a(A.a([n],t.r)))
B.a.M(o,n.bM())}s=2
return A.an(q.eq(b),$async$aY)
case 2:b.fX()
b.d4(q)
q.cj(0)
return A.bG(null,r)}})
return A.bH($async$aY,r)},
eA(){var s=0,r=A.bI(t.z),q=this,p,o,n,m
var $async$eA=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:p=0
case 2:if(!(p<1)){s=3
break}o=q.w
o===$&&A.b("display")
s=4
return A.an(o.dj(),$async$eA)
case 4:n=b
p+=n
q.cj(n)
o=q.f
o===$&&A.b("camera")
m=o.r
m===$&&A.b("display")
m=m.a
m===$&&A.b("renderer")
m.ex(o.f)
o=q.f
m=q.d
m===$&&A.b("mobjects")
o.hd(m)
q.a+=n
s=2
break
case 3:return A.bG(null,r)}})
return A.bH($async$eA,r)},
dZ(){var s=0,r=A.bI(t.z),q=this
var $async$dZ=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:case 2:if(!!0){s=3
break}s=4
return A.an(q.eA(),$async$dZ)
case 4:s=2
break
case 3:return A.bG(null,r)}})
return A.bH($async$dZ,r)},
shY(a){this.d=t.a.a(a)}}
A.kF.prototype={
$2(a,b){var s,r,q,p,o,n
t.a.a(a)
t.ns.a(b)
for(s=a.length,r=this.a,q=0;q<a.length;a.length===s||(0,A.e)(a),++q){p=a[q]
if(b.F(0,p))continue
o=p.bM()
n=b.oQ(0,A.mP(o,A.v(o).c))
if(n.a!==0){o=p.d
o===$&&A.b("submobjects")
this.$2(o,n)}else B.a.p(r,p)}},
$S:97}
A.my.prototype={
$2(a,b){var s=this.a
return s.a(s.a(a)+s.a(b))},
$S(){return this.a.h("0(0,0)")}}
A.mx.prototype={
$1(a){return A.a_(a)/this.a*this.b},
$S:65}
A.mz.prototype={
$2(a,b){this.a.a(b)
return a!==0},
$S(){return this.a.h("A(i,0)")}}
A.mp.prototype={
$1(a){return t.G.a(a).ap(0)},
$S:27}
A.mq.prototype={
$1(a){return t.G.a(a).ap(0)},
$S:27}
A.mr.prototype={
$1(a){var s
t.H.a(a)
s=J.X(a)
return new A.P(s.i(a,0),s.i(a,1),s.i(a,2),s.i(a,3))},
$S:67}
A.m6.prototype={
$1(a){var s,r,q,p,o,n,m,l=A.a([],t.l)
for(s=A.d0(this.a,t.V),r=s.length,q=1-a,p=this.b,o=0;o<s.length;s.length===r||(0,A.e)(s),++o){n=s[o]
m=n.a
if(typeof m!=="number")return A.bj(m)
l.push(J.bk(n.b,Math.pow(q,p-m)*Math.pow(a,m)*A.pd(p,m,!0)))}return B.a.aT(l,new A.m5())},
$S:34}
A.m5.prototype={
$2(a,b){var s=t.V
return s.a(a).L(0,s.a(b))},
$S:23}
A.mj.prototype={
$5$end$start$step(a,b,c,d,e){var s,r,q,p,o
for(s=A.E(c==null?2*this.a:c,d,e),r=s.length,q=this.b,p=t.o,o=0;o<s.length;s.length===r||(0,A.e)(s),++o)q.aw(new A.C(b,s[o],p),a)},
$2(a,b){return this.$5$end$start$step(a,b,null,0,1)},
$4$start$step(a,b,c,d){return this.$5$end$start$step(a,b,null,c,d)},
$S:68}
A.mh.prototype={
$2(a,b){t.V.a(b)
return B.d.W(a,2)===0},
$S:6}
A.mi.prototype={
$2(a,b){t.V.a(b)
return B.d.W(a,2)===1},
$S:6}
A.m9.prototype={
$1(a){return J.iT(t.H.a(a),Math.max(this.a-this.b,0)).ap(0)},
$S:69}
A.md.prototype={
$2(a,b){var s
t.o.a(b)
s=b.a
return J.U(s,b.b)?B.a.i(this.a,s):a},
$S:2}
A.P.prototype={
t(){var s=this
return new A.P(s.a,s.b,s.c,s.d)},
ap(a){var s=this,r=A.a([s.a,s.b,s.c],t.n)
r.push(s.d)
return r},
dq(){var s=this
return"rgba("+B.h.br(s.a*255)+", "+B.h.br(s.b*255)+", "+B.h.br(s.c*255)+", "+A.l(s.d)+")"},
l(a){return this.dq()}}
A.lV.prototype={
$1(a){return A.cw(a,16)/255},
$S:70}
A.as.prototype={
U(a,b){var s,r=this
if(b==null)return!1
if(!(b instanceof A.as&&r.a===b.a&&r.b===b.b))s=typeof b=="number"&&r.a===b&&r.b===0
else s=!0
return s},
A(a,b){var s=this.a,r=b.a,q=this.b,p=b.b
return new A.as(s*r-q*p,s*p+q*r)}}
A.by.prototype={
l(a){return"EventType."+this.b}}
A.b8.prototype={}
A.jq.prototype={
gca(){var s=this.a
s===$&&A.b("eventListeners")
return s},
m0(){var s,r,q=A.bp(t.cY,t.oR)
for(s=t.fO,r=0;r<6;++r)q.v(0,B.bp[r],A.a([],s))
this.smb(t.fY.a(q))},
cq(a,b,c){var s,r,q
A.iM(c,t.e,"IEvent","_dispatchOnListnersList")
c.a(a)
s=A.h(c.h("k<b9<0>>").a(b),!0,c.h("b9<0>"))
r=!1
while(!0){if(!(!r&&s.length!==0))break
q=B.a.gq(s)
B.a.a3(s,q)
q.$ti.c.a(a)
r=q.a.$1(a)}},
e1(a){var s,r=this
switch(a.a){case B.D:t.m6.a(a)
s=r.gca().i(0,B.D)
s.toString
r.cq(a,s,t.e)
break
case B.v:t.oJ.a(a)
s=r.gca().i(0,B.v)
s.toString
r.cq(a,s,t.e)
break
case B.w:t.nB.a(a)
s=r.gca().i(0,B.w)
s.toString
r.cq(a,s,t.e)
break
case B.x:t.gn.a(a)
s=r.gca().i(0,B.x)
s.toString
r.cq(a,s,t.e)
break
case B.S:t.lY.a(a)
s=r.gca().i(0,B.S)
s.toString
r.cq(a,s,t.e)
break
case B.T:t.am.a(a)
s=r.gca().i(0,B.T)
s.toString
r.cq(a,s,t.e)
break}},
smb(a){this.a=t.fY.a(a)}}
A.b9.prototype={}
A.hl.prototype={}
A.er.prototype={}
A.ce.prototype={}
A.cf.prototype={}
A.cd.prototype={}
A.kr.prototype={}
A.kP.prototype={
$1(a){return A.iJ(a)!=null},
$S:11}
A.m7.prototype={
$2(a,b){return A.a_(a)*A.a_(b)},
$S:14}
A.m8.prototype={
$2(a,b){return A.a_(a)*A.a_(b)},
$S:14}
A.bx.prototype={
L(a,b){var s,r
if(typeof b=="number"){s=this.b
s===$&&A.b("shape")
r=A.bl(b,s)}else{t.A.a(b)
r=b}return this.bH(0,new A.j3(r))},
I(a,b){var s,r
if(typeof b=="number"){s=this.b
s===$&&A.b("shape")
r=A.bl(b,s)}else{t.A.a(b)
r=b}return this.bH(0,new A.j6(r))},
A(a,b){var s,r
if(typeof b=="number"){s=this.b
s===$&&A.b("shape")
r=A.bl(b,s)}else{t.A.a(b)
r=b}return this.bH(0,new A.j5(r))},
aZ(a,b){var s,r=this.b
r===$&&A.b("shape")
s=A.bl(b,r)
return this.bH(0,new A.j4(s))},
bH(a,b){var s,r,q
t.iJ.a(b)
s=this.a
s===$&&A.b("values")
s=A.d0(s,t.H)
r=A.v(s)
q=r.h("J<1,k<p>>")
q=A.h(new A.J(s,r.h("k<p>(1)").a(new A.j2(b)),q),!0,q.h("B.E"))
r=this.b
r===$&&A.b("shape")
return A.aB(r,q)},
be(a){var s,r
t.o.a(a)
s=a.a
r=this.a
r===$&&A.b("values")
if(s>>>0!==s||s>=r.length)return A.c(r,s)
return J.Z(r[s],a.b)},
aw(a,b){var s,r,q,p,o
t.o.a(a)
s=a.a
r=this.b
r===$&&A.b("shape")
q=r.a
if(typeof s!=="number")return s.W()
if(typeof q!=="number")return A.bj(q)
p=B.d.W(s,q)
q=a.b
r=r.b
if(typeof q!=="number")return q.W()
if(typeof r!=="number")return A.bj(r)
o=B.h.W(q,r)
r=this.a
r===$&&A.b("values")
if(!(p>=0&&p<r.length))return A.c(r,p)
J.fv(r[p],o,b)},
mL(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e=f.b
e===$&&A.b("shape")
s=e.a
if(typeof s!=="number")return s.I()
e=e.b
if(typeof e!=="number")return e.I()
r=A.a([],t.b)
for(q=A.E(f.b.a,0,1),p=q.length,o=t.n,n=0;n<q.length;q.length===p||(0,A.e)(q),++n){m=q[n]
if(!J.U(m,a)){l=A.a([],o)
for(k=A.E(f.b.a,0,1),j=k.length,i=0;i<k.length;k.length===j||(0,A.e)(k),++i){h=k[i]
if(!J.U(h,b)){g=f.a
g===$&&A.b("values")
l.push(J.Z(B.a.i(g,m),h))}}r.push(l)}}return A.aB(new A.C(s-1,e-1,t.o),r)},
ho(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.b
h===$&&A.b("shape")
if(J.U(h.a,2)){h=i.a
h===$&&A.b("values")
if(0>=h.length)return A.c(h,0)
s=J.Z(h[0],0)
h=i.a
if(0>=h.length)return A.c(h,0)
r=J.Z(h[0],1)
h=i.a
if(1>=h.length)return A.c(h,1)
q=J.Z(h[1],0)
h=i.a
if(1>=h.length)return A.c(h,1)
return s*J.Z(h[1],1)-r*q}h=i.b
p=h.a
if(typeof p!=="number")return p.I()
h=h.b
if(typeof h!=="number")return h.I()
o=new A.C(p-1,h-1,t.o)
h=A.a([],t.n)
for(p=A.E(i.b.a,0,1),n=p.length,m=0;m<p.length;p.length===n||(0,A.e)(p),++m){l=p[m]
if(typeof l!=="number")return l.W()
k=B.h.W(l,2)===0?1:-1
j=i.a
j===$&&A.b("values")
if(0>=j.length)return A.c(j,0)
h.push(k*A.bl(J.Z(j[0],l),o).A(0,i.mL(0,l)).ho())}return A.iQ(h,t.W)},
eH(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8="values"
if(this.ho()===0)throw A.d("This matrix is not inversible")
s=this.b
s===$&&A.b("shape")
r=s.a
q=s.b
p=this.t()
o=A.fI(r)
for(s=A.E(q,0,1),n=s.length,m=r-1,l=q-1,k=t.o,j=0;j<s.length;s.length===n||(0,A.e)(s),++j){i=s[j]
for(h=i,g=-1,f=-1;h!==r;++h){k.a(new A.C(h,i,k))
e=p.a
e===$&&A.b(a8)
if(!(h>=0&&h<e.length))return A.c(e,h)
d=J.Z(e[h],i)
if(d>f){f=d
g=h}}e=p.a
e===$&&A.b(a8)
c=e.length
if(!(g>=0&&g<c))return A.c(e,g)
b=e[g]
if(i>>>0!==i||i>=c)return A.c(e,i)
e[g]=e[i]
B.a.v(e,i,b)
e=o.a
e===$&&A.b(a8)
c=e.length
if(!(g<c))return A.c(e,g)
a=e[g]
if(i>>>0!==i||i>=c)return A.c(e,i)
e[g]=e[i]
B.a.v(e,i,a)
e=J.X(b)
a0=e.i(b,i)
for(a1=i;a1<q;++a1){c=e.i(b,a1)
if(typeof c!=="number")return c.aZ()
e.v(b,a1,c/a0)}for(c=J.X(a),a1=l;a1>=0;--a1){a2=c.i(a,a1)
if(typeof a2!=="number")return a2.aZ()
c.v(a,a1,a2/a0)}for(a1=i+1,g=m;g>=0;--g)if(g!==i){a2=p.a
if(!(g<a2.length))return A.c(a2,g)
a3=a2[g]
a2=o.a
if(!(g<a2.length))return A.c(a2,g)
a4=a2[g]
a2=J.X(a3)
a0=a2.i(a3,i)
for(a5=a1;a5!==q;++a5){a6=a2.i(a3,a5)
a7=e.i(b,a5)
if(typeof a7!=="number")return a7.A()
if(typeof a6!=="number")return a6.I()
a2.v(a3,a5,a6-a7*a0)}for(a2=J.X(a4),a5=l;a5>0;--a5){a6=a2.i(a4,a5)
a7=c.i(a,a5)
if(typeof a7!=="number")return a7.A()
if(typeof a6!=="number")return a6.I()
a2.v(a4,a5,a6-a7*a0);--a5
a7=a2.i(a4,a5)
a6=c.i(a,a5)
if(typeof a6!=="number")return a6.A()
if(typeof a7!=="number")return a7.I()
a2.v(a4,a5,a7-a6*a0)}if(a5===0){a6=a2.i(a4,0)
a7=c.i(a,0)
if(typeof a7!=="number")return a7.A()
if(typeof a6!=="number")return a6.I()
a2.v(a4,0,a6-a7*a0)}}}return o},
aL(a){var s,r,q=this.a
q===$&&A.b("values")
s=A.v(q)
r=s.h("J<1,p>")
return A.h(new A.J(q,s.h("p(1)").a(new A.j0(a)),r),!0,r.h("B.E"))},
hB(a,b){var s,r,q,p,o
t.H.a(b)
s=this.b
s===$&&A.b("shape")
s=A.E(s.a,0,1)
r=s.length
q=0
for(;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q]
o=this.a
o===$&&A.b("values")
J.fv(B.a.i(o,p),a,B.a.i(b,p))}},
gkc(){return this.bH(0,new A.j7(this))},
hu(){var s,r,q,p=A.a([],t.b),o=this.a
o===$&&A.b("values")
s=o.length
r=t.W
q=0
for(;q<o.length;o.length===s||(0,A.e)(o),++q)p.push(A.eo(o[q],!0,r))
return p},
bI(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="values",a2=this.b
a2===$&&A.b("shape")
s=a2.a
r=a2.b
a2=a3.b
a2===$&&A.b("shape")
q=a2.b
p=A.bl(0,new A.C(s,q,t.o))
for(a2=A.E(s,0,1),o=a2.length,n=0;n<a2.length;a2.length===o||(0,A.e)(a2),++n){m=a2[n]
for(l=A.E(q,0,1),k=l.length,j=0;j<l.length;l.length===k||(0,A.e)(l),++j){i=l[j]
for(h=A.E(r,0,1),g=h.length,f=0;f<h.length;h.length===g||(0,A.e)(h),++f){e=h[f]
d=p.a
d===$&&A.b(a1)
d=B.a.i(d,m)
c=J.X(d)
b=c.i(d,i)
a=this.a
a===$&&A.b(a1)
a=J.Z(B.a.i(a,m),e)
a0=a3.a
a0===$&&A.b(a1)
a0=J.Z(B.a.i(a0,e),i)
if(typeof a!=="number")return a.A()
if(typeof a0!=="number")return A.bj(a0)
if(typeof b!=="number")return b.L()
c.v(d,i,b+a*a0)}}}return p},
t(){return this.c8(new A.j_())},
c8(a){return this.bH(0,new A.iZ(t.f3.a(a)))},
ee(){var s,r,q,p=A.a([],t.n),o=this.a
o===$&&A.b("values")
s=o.length
r=0
for(;r<o.length;o.length===s||(0,A.e)(o),++r)for(q=J.I(o[r]);q.m();)p.push(q.gu())
return p},
l(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=c.b
b===$&&A.b("shape")
b=A.l(b.a)
s=A.l(c.b.b)
r=A.a([],t.t)
q=c.a
q===$&&A.b("values")
p=q.length
o=0
for(;o<q.length;q.length===p||(0,A.e)(q),++o)for(n=J.I(q[o]);n.m();)r.push(B.h.hi(n.gu(),6).length)
m=B.a.ef(r,6,B.a5,t.S)
for(r=c.a,q=r.length,p=m+4,n=t.s,l="",o=0;o<r.length;r.length===q||(0,A.e)(r),++o){l+="      "
for(k=J.I(r[o]);k.m();){j=k.gu()
i=j<0?"-":" "
j=Math.abs(j)
h=B.h.hi(j,6)
g=A.a([],n)
for(h=A.E(p-h.length,0,1),f=h.length,e=0;e<h.length;h.length===f||(0,A.e)(h),++e)g.push(" ")
d=B.a.aS(g)
l=l+i+B.h.hi(j,6)+d}l+="\n"}return b+"x"+s+" matrix\n"+l},
pD(a,b){var s,r,q,p,o,n,m,l,k=this.ee(),j=A.bl(0,new A.C(a,b,t.o))
for(s=A.d0(k,t.W),r=s.length,q=0;q<s.length;s.length===r||(0,A.e)(s),++q){p=s[q]
o=p.a
n=B.d.W(o,a)
m=B.d.b0(o,a)
l=j.a
l===$&&A.b("values")
if(!(n<l.length))return A.c(l,n)
J.fv(l[n],m,p.b)}return j},
shX(a){this.a=t.jj.a(a)},
sm7(a){this.b=t.o.a(a)}}
A.j3.prototype={
$2(a,b){return a+this.a.be(t.o.a(b))},
$S:2}
A.j6.prototype={
$2(a,b){return a-this.a.be(t.o.a(b))},
$S:2}
A.j5.prototype={
$2(a,b){return a*this.a.be(t.o.a(b))},
$S:2}
A.j4.prototype={
$2(a,b){return a/this.a.be(t.o.a(b))},
$S:2}
A.j2.prototype={
$1(a){var s,r,q
t.kk.a(a)
s=A.d0(a.b,t.W)
r=A.v(s)
q=r.h("J<1,p>")
return A.h(new A.J(s,r.h("p(1)").a(new A.j1(this.a,a)),q),!0,q.h("B.E"))},
$S:72}
A.j1.prototype={
$1(a){t.d7.a(a)
return this.a.$2(a.b,new A.C(this.b.a,a.a,t.o))},
$S:73}
A.j0.prototype={
$1(a){return J.Z(t.H.a(a),this.a)},
$S:74}
A.j7.prototype={
$2(a,b){var s=t.o
s.a(b)
return this.a.be(new A.C(b.b,b.a,s))},
$S:2}
A.j_.prototype={
$1(a){return a},
$S:7}
A.iZ.prototype={
$2(a,b){t.o.a(b)
return this.a.$1(a)},
$S:2}
A.mw.prototype={
$2(a,b){var s=t.A
return s.a(a).bI(s.a(b))},
$S:76}
A.f.prototype={
U(a,b){if(b==null)return!1
return b instanceof A.f&&this.a===b.a&&this.b===b.b&&this.c===b.c},
L(a,b){var s=this
if(typeof b=="number")return new A.f(s.a+b,s.b+b,s.c+b)
else if(b instanceof A.f)return new A.f(s.a+b.a,s.b+b.b,s.c+b.c)
else throw A.d("Vector3 only support addition by num or Vector3")},
I(a,b){return new A.f(this.a-b.a,this.b-b.b,this.c-b.c)},
A(a,b){var s=this
if(typeof b=="number")return new A.f(s.a*b,s.b*b,s.c*b)
else if(b instanceof A.f)return new A.f(s.a*b.a,s.b*b.b,s.c*b.c)
else throw A.d("Vector3 only support multiplication by num or Vector3")},
aZ(a,b){return new A.f(this.a/b,this.b/b,this.c/b)},
bd(){var s=this.a,r=this.b,q=this.c
return s*s+r*r+q*q},
c1(a){switch(a){case 0:return this.a
case 1:return this.b
case 2:return this.c
default:throw A.d("No component at index "+a+" on a vector3")}},
pR(){var s=t.n
s=A.aB(null,A.a([A.a([this.a],s),A.a([this.b],s),A.a([this.c],s)],t.b))
return s},
hk(a,b,c){var s=a==null?this.a:a,r=b==null?this.b:b
return new A.f(s,r,c==null?this.c:c)},
q6(a){return this.hk(a,null,null)},
q7(a){return this.hk(null,a,null)},
kk(a){return this.hk(null,null,a)},
q5(a,b){if(a===0)return this.q6(b)
else if(a===1)return this.q7(b)
else if(a===2)return this.kk(b)
else throw A.d("Cannot index a vector3 with index="+a)},
bI(a){var s=A.fI(3).bH(0,new A.lf(a)).bI(this.pR()),r=t.o
return new A.f(s.be(new A.C(0,0,r)),s.be(new A.C(1,0,r)),s.be(new A.C(2,0,r)))},
jn(a){return this.a*a.a+this.b*a.b+this.c*a.c},
nW(a){var s=this.b,r=a.c,q=this.c,p=a.b,o=a.a,n=this.a
return new A.f(s*r-q*p,q*o-n*r,n*p-s*o)},
c8(a){t.f3.a(a)
return new A.f(a.$1(this.a),a.$1(this.b),a.$1(this.c))},
hG(a){return this.c8(new A.lg())},
mV(a){return this.c8(new A.le())},
d1(){var s=this.a
if(s===0&&this.b===0)return 0
return Math.atan2(this.b,s)},
l(a){return"vec3("+A.l(this.a)+", "+A.l(this.b)+", "+A.l(this.c)+")"}}
A.lf.prototype={
$2(a,b){var s,r,q,p
t.o.a(b)
s=b.a
r=this.a
q=r.b
q===$&&A.b("shape")
p=q.a
if(typeof s!=="number")return s.cL()
if(typeof p!=="number")return A.bj(p)
if(s<p){s=b.b
q=q.b
if(typeof s!=="number")return s.cL()
if(typeof q!=="number")return A.bj(q)
q=s>=q
s=q}else s=!0
return s?a:r.be(b)},
$S:2}
A.lg.prototype={
$1(a){return J.nE(a)},
$S:7}
A.le.prototype={
$1(a){return Math.abs(a)},
$S:7}
A.jh.prototype={
mW(a,b){var s,r,q=t.D
A.p8("absolute",A.a([b,null,null,null,null,null,null,null,null,null,null,null,null,null,null],q))
s=this.a
s=s.aU(b)>0&&!s.bZ(b)
if(s)return b
s=A.pg()
r=A.a([s,b,null,null,null,null,null,null,null,null,null,null,null,null,null,null],q)
A.p8("join",r)
return this.oT(new A.ar(r,t.na))},
oT(a){var s,r,q,p,o,n,m,l,k,j
t.bq.a(a)
for(s=a.$ti,r=s.h("A(j.E)").a(new A.ji()),q=a.gH(a),s=new A.cW(q,r,s.h("cW<j.E>")),r=this.a,p=!1,o=!1,n="";s.m();){m=q.gu()
if(r.bZ(m)&&o){l=A.hx(m,r)
k=n.charCodeAt(0)==0?n:n
n=B.b.B(k,0,r.cJ(k,!0))
l.b=n
if(r.di(n))B.a.v(l.e,0,r.gcl())
n=""+l.l(0)}else if(r.aU(m)>0){o=!r.bZ(m)
n=""+m}else{j=m.length
if(j!==0){if(0>=j)return A.c(m,0)
j=r.fF(m[0])}else j=!1
if(!j)if(p)n+=r.gcl()
n+=m}p=r.di(m)}return n.charCodeAt(0)==0?n:n},
co(a,b){var s=A.hx(b,this.a),r=s.d,q=A.v(r),p=q.h("am<1>")
s.sjQ(A.h(new A.am(r,q.h("A(1)").a(new A.jj()),p),!0,p.h("j.E")))
r=s.b
if(r!=null)B.a.bF(s.d,0,r)
return s.d},
h6(a){var s
if(!this.mz(a))return a
s=A.hx(a,this.a)
s.h5()
return s.l(0)},
mz(a){var s,r,q,p,o,n,m,l,k=this.a,j=k.aU(a)
if(j!==0){if(k===$.iR())for(s=0;s<j;++s)if(B.b.E(a,s)===47)return!0
r=j
q=47}else{r=0
q=null}for(p=new A.a9(a).a,o=p.length,s=r,n=null;s<o;++s,n=q,q=m){m=B.b.J(p,s)
if(k.bG(m)){if(k===$.iR()&&m===47)return!0
if(q!=null&&k.bG(q))return!0
if(q===46)l=n==null||n===46||k.bG(n)
else l=!1
if(l)return!0}}if(q==null)return!0
if(k.bG(q))return!0
if(q===46)k=n==null||k.bG(n)||n===46
else k=!1
if(k)return!0
return!1},
px(a){var s,r,q,p,o,n,m=this,l='Unable to find a path to "',k=m.a,j=k.aU(a)
if(j<=0)return m.h6(a)
s=A.pg()
if(k.aU(s)<=0&&k.aU(a)>0)return m.h6(a)
if(k.aU(a)<=0||k.bZ(a))a=m.mW(0,a)
if(k.aU(a)<=0&&k.aU(s)>0)throw A.d(A.o5(l+a+'" from "'+s+'".'))
r=A.hx(s,k)
r.h5()
q=A.hx(a,k)
q.h5()
j=r.d
p=j.length
if(p!==0){if(0>=p)return A.c(j,0)
j=J.U(j[0],".")}else j=!1
if(j)return q.l(0)
j=r.b
p=q.b
if(j!=p)j=j==null||p==null||!k.ha(j,p)
else j=!1
if(j)return q.l(0)
while(!0){j=r.d
p=j.length
if(p!==0){o=q.d
n=o.length
if(n!==0){if(0>=p)return A.c(j,0)
j=j[0]
if(0>=n)return A.c(o,0)
o=k.ha(j,o[0])
j=o}else j=!1}else j=!1
if(!j)break
B.a.ew(r.d,0)
B.a.ew(r.e,1)
B.a.ew(q.d,0)
B.a.ew(q.e,1)}j=r.d
p=j.length
if(p!==0){if(0>=p)return A.c(j,0)
j=J.U(j[0],"..")}else j=!1
if(j)throw A.d(A.o5(l+a+'" from "'+s+'".'))
j=t.N
B.a.ei(q.d,0,A.bQ(r.d.length,"..",!1,j))
B.a.v(q.e,0,"")
B.a.ei(q.e,1,A.bQ(r.d.length,k.gcl(),!1,j))
k=q.d
j=k.length
if(j===0)return"."
if(j>1&&J.U(B.a.gq(k),".")){B.a.dm(q.d)
k=q.e
if(0>=k.length)return A.c(k,-1)
k.pop()
if(0>=k.length)return A.c(k,-1)
k.pop()
B.a.p(k,"")}q.b=""
q.k_()
return q.l(0)},
jT(a){var s,r,q=this,p=A.p2(a)
if(p.gaP()==="file"&&q.a===$.ft())return p.l(0)
else if(p.gaP()!=="file"&&p.gaP()!==""&&q.a!==$.ft())return p.l(0)
s=q.h6(q.a.h8(A.p2(p)))
r=q.px(s)
return q.co(0,r).length>q.co(0,s).length?s:r}}
A.ji.prototype={
$1(a){return A.ay(a)!==""},
$S:8}
A.jj.prototype={
$1(a){return A.ay(a).length!==0},
$S:8}
A.m3.prototype={
$1(a){A.iJ(a)
return a==null?"null":'"'+a+'"'},
$S:77}
A.cI.prototype={
kA(a){var s,r=this.aU(a)
if(r>0)return B.b.B(a,0,r)
if(this.bZ(a)){if(0>=a.length)return A.c(a,0)
s=a[0]}else s=null
return s},
ha(a,b){return a===b}}
A.kv.prototype={
k_(){var s,r,q=this
while(!0){s=q.d
if(!(s.length!==0&&J.U(B.a.gq(s),"")))break
B.a.dm(q.d)
s=q.e
if(0>=s.length)return A.c(s,-1)
s.pop()}s=q.e
r=s.length
if(r!==0)B.a.v(s,r-1,"")},
h5(){var s,r,q,p,o,n,m=this,l=A.a([],t.s)
for(s=m.d,r=s.length,q=0,p=0;p<s.length;s.length===r||(0,A.e)(s),++p){o=s[p]
n=J.bi(o)
if(!(n.U(o,".")||n.U(o,"")))if(n.U(o,"..")){n=l.length
if(n!==0){if(0>=n)return A.c(l,-1)
l.pop()}else ++q}else B.a.p(l,o)}if(m.b==null)B.a.ei(l,0,A.bQ(q,"..",!1,t.N))
if(l.length===0&&m.b==null)B.a.p(l,".")
m.sjQ(l)
s=m.a
m.sl8(A.bQ(l.length+1,s.gcl(),!0,t.N))
r=m.b
if(r==null||l.length===0||!s.di(r))B.a.v(m.e,0,"")
r=m.b
if(r!=null&&s===$.iR()){r.toString
m.b=A.bv(r,"/","\\")}m.k_()},
l(a){var s,r,q,p=this,o=p.b
o=o!=null?""+o:""
for(s=0;s<p.d.length;++s,o=q){r=p.e
if(!(s<r.length))return A.c(r,s)
r=A.l(r[s])
q=p.d
if(!(s<q.length))return A.c(q,s)
q=o+r+A.l(q[s])}o+=A.l(B.a.gq(p.e))
return o.charCodeAt(0)==0?o:o},
sjQ(a){this.d=t.I.a(a)},
sl8(a){this.e=t.I.a(a)}}
A.hz.prototype={
l(a){return"PathException: "+this.a},
$ibW:1}
A.kQ.prototype={
l(a){return this.gai(this)}}
A.hC.prototype={
fF(a){return B.b.F(a,"/")},
bG(a){return a===47},
di(a){var s=a.length
return s!==0&&B.b.J(a,s-1)!==47},
cJ(a,b){if(a.length!==0&&B.b.E(a,0)===47)return 1
return 0},
aU(a){return this.cJ(a,!1)},
bZ(a){return!1},
h8(a){var s
if(a.gaP()===""||a.gaP()==="file"){s=a.gaO(a)
return A.nc(s,0,s.length,B.u,!1)}throw A.d(A.a8("Uri "+a.l(0)+" must have scheme 'file:'.",null))},
gai(){return"posix"},
gcl(){return"/"}}
A.i5.prototype={
fF(a){return B.b.F(a,"/")},
bG(a){return a===47},
di(a){var s=a.length
if(s===0)return!1
if(B.b.J(a,s-1)!==47)return!0
return B.b.bk(a,"://")&&this.aU(a)===s},
cJ(a,b){var s,r,q,p,o=a.length
if(o===0)return 0
if(B.b.E(a,0)===47)return 1
for(s=0;s<o;++s){r=B.b.E(a,s)
if(r===47)return 0
if(r===58){if(s===0)return 0
q=B.b.aN(a,"/",B.b.a9(a,"//",s+1)?s+3:s)
if(q<=0)return o
if(!b||o<q+3)return q
if(!B.b.a_(a,"file://"))return q
if(!A.ps(a,q+1))return q
p=q+3
return o===p?p:q+4}}return 0},
aU(a){return this.cJ(a,!1)},
bZ(a){return a.length!==0&&B.b.E(a,0)===47},
h8(a){return a.l(0)},
gai(){return"url"},
gcl(){return"/"}}
A.ib.prototype={
fF(a){return B.b.F(a,"/")},
bG(a){return a===47||a===92},
di(a){var s=a.length
if(s===0)return!1
s=B.b.J(a,s-1)
return!(s===47||s===92)},
cJ(a,b){var s,r,q=a.length
if(q===0)return 0
s=B.b.E(a,0)
if(s===47)return 1
if(s===92){if(q<2||B.b.E(a,1)!==92)return 1
r=B.b.aN(a,"\\",2)
if(r>0){r=B.b.aN(a,"\\",r+1)
if(r>0)return r}return q}if(q<3)return 0
if(!A.pr(s))return 0
if(B.b.E(a,1)!==58)return 0
q=B.b.E(a,2)
if(!(q===47||q===92))return 0
return 3},
aU(a){return this.cJ(a,!1)},
bZ(a){return this.aU(a)===1},
h8(a){var s,r
if(a.gaP()!==""&&a.gaP()!=="file")throw A.d(A.a8("Uri "+a.l(0)+" must have scheme 'file:'.",null))
s=a.gaO(a)
if(a.gbn(a)===""){if(s.length>=3&&B.b.a_(s,"/")&&A.ps(s,1))s=B.b.k0(s,"/","")}else s="\\\\"+a.gbn(a)+s
r=A.bv(s,"/","\\")
return A.nc(r,0,r.length,B.u,!1)},
nI(a,b){var s
if(a===b)return!0
if(a===47)return b===92
if(a===92)return b===47
if((a^b)!==32)return!1
s=a|32
return s>=97&&s<=122},
ha(a,b){var s,r
if(a===b)return!0
s=a.length
if(s!==b.length)return!1
for(r=0;r<s;++r)if(!this.nI(B.b.E(a,r),B.b.E(b,r)))return!1
return!0},
gai(){return"windows"},
gcl(){return"\\"}}
A.hQ.prototype={
gn(a){return this.c.length},
goU(){return this.b.length},
hV(a,b){var s,r,q,p,o,n,m
for(s=this.c,r=s.length,q=this.b,p=0;p<r;++p){o=s[p]
if(o===13){n=p+1
if(n<r){if(!(n<r))return A.c(s,n)
m=s[n]!==10}else m=!0
if(m)o=10}if(o===10)B.a.p(q,p+1)}},
f_(a,b,c){return A.n0(this,b,c)},
cM(a){var s,r=this
if(a<0)throw A.d(A.aJ("Offset may not be negative, was "+a+"."))
else if(a>r.c.length)throw A.d(A.aJ("Offset "+a+u.D+r.gn(r)+"."))
s=r.b
if(a<B.a.gac(s))return-1
if(a>=B.a.gq(s))return s.length-1
if(r.mw(a)){s=r.d
s.toString
return s}return r.d=r.ml(a)-1},
mw(a){var s,r,q,p=this.d
if(p==null)return!1
s=this.b
r=s.length
if(p>>>0!==p||p>=r)return A.c(s,p)
if(a<s[p])return!1
if(!(p>=r-1)){q=p+1
if(!(q<r))return A.c(s,q)
q=a<s[q]}else q=!0
if(q)return!0
if(!(p>=r-2)){q=p+2
if(!(q<r))return A.c(s,q)
q=a<s[q]
s=q}else s=!0
if(s){this.d=p+1
return!0}return!1},
ml(a){var s,r,q=this.b,p=q.length,o=p-1
for(s=0;s<o;){r=s+B.d.aR(o-s,2)
if(!(r>=0&&r<p))return A.c(q,r)
if(q[r]>a)o=r
else s=r+1}return o},
aL(a){var s,r,q,p=this
if(a<0)throw A.d(A.aJ("Offset may not be negative, was "+a+"."))
else if(a>p.c.length)throw A.d(A.aJ("Offset "+a+" must be not be greater than the number of characters in the file, "+p.gn(p)+"."))
s=p.cM(a)
r=p.b
if(!(s>=0&&s<r.length))return A.c(r,s)
q=r[s]
if(q>a)throw A.d(A.aJ("Line "+s+" comes after offset "+a+"."))
return a-q},
dv(a){var s,r,q,p
if(a<0)throw A.d(A.aJ("Line may not be negative, was "+a+"."))
else{s=this.b
r=s.length
if(a>=r)throw A.d(A.aJ("Line "+a+" must be less than the number of lines in the file, "+this.goU()+"."))}q=s[a]
if(q<=this.c.length){p=a+1
s=p<r&&q>=s[p]}else s=!0
if(s)throw A.d(A.aJ("Line "+a+" doesn't have 0 columns."))
return q}}
A.b3.prototype={
ga4(){return this.a.a},
gad(){return this.a.cM(this.b)},
gam(){return this.a.aL(this.b)},
bh(a,b){var s,r=this.b
if(r<0)throw A.d(A.aJ("Offset may not be negative, was "+r+"."))
else{s=this.a
if(r>s.c.length)throw A.d(A.aJ("Offset "+r+u.D+s.gn(s)+"."))}},
gav(a){return this.b}}
A.at.prototype={
ga4(){return this.a.a},
gn(a){return this.c-this.b},
gS(a){return A.c9(this.a,this.b)},
gV(){return A.c9(this.a,this.c)},
gY(a){return A.ae(B.t.b8(this.a.c,this.b,this.c),0,null)},
gaW(){var s=this,r=s.a,q=s.c,p=r.cM(q)
if(r.aL(q)===0&&p!==0){if(q-s.b===0)return p===r.b.length-1?"":A.ae(B.t.b8(r.c,r.dv(p),r.dv(p+1)),0,null)}else q=p===r.b.length-1?r.c.length:r.dv(p+1)
return A.ae(B.t.b8(r.c,r.dv(r.cM(s.b)),q),0,null)},
aG(a,b,c){var s,r=this.c,q=this.b
if(r<q)throw A.d(A.a8("End "+r+" must come after start "+q+".",null))
else{s=this.a
if(r>s.c.length)throw A.d(A.aJ("End "+r+u.D+s.gn(s)+"."))
else if(q<0)throw A.d(A.aJ("Start may not be negative, was "+q+"."))}},
aA(a,b){var s
t.hs.a(b)
if(!(b instanceof A.at))return this.lX(0,b)
s=B.d.aA(this.b,b.b)
return s===0?B.d.aA(this.c,b.c):s},
U(a,b){var s=this
if(b==null)return!1
if(!t.lS.b(b))return s.lW(0,b)
return s.b===b.b&&s.c===b.c&&J.U(s.a.a,b.a.a)},
gX(a){return A.cQ(this.b,this.c,this.a.a,B.n)},
oj(a,b){var s,r=this,q=r.a
if(!J.U(q.a,b.a.a))throw A.d(A.a8('Source URLs "'+A.l(r.ga4())+'" and  "'+A.l(b.ga4())+"\" don't match.",null))
s=Math.min(r.b,b.b)
return A.n0(q,s,Math.max(r.c,b.c))},
$imG:1,
$ibS:1}
A.jC.prototype={
oI(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1=a.a
a.iN(B.a.gac(a1).c)
s=a.e
r=A.bQ(s,a0,!1,t.dd)
for(q=a.r,s=s!==0,p=a.b,o=0;o<a1.length;++o){n=a1[o]
if(o>0){m=a1[o-1]
l=m.c
k=n.c
if(!J.U(l,k)){a.dQ("\u2575")
q.a+="\n"
a.iN(k)}else if(m.b+1!==n.b){a.mU("...")
q.a+="\n"}}for(l=n.d,k=A.v(l).h("Y<1>"),j=new A.Y(l,k),j=new A.O(j,j.gn(j),k.h("O<B.E>")),k=k.h("B.E"),i=n.b,h=n.a;j.m();){g=j.d
if(g==null)g=k.a(g)
f=g.a
if(f.gS(f).gad()!==f.gV().gad()&&f.gS(f).gad()===i&&a.mx(B.b.B(h,0,f.gS(f).gam()))){e=B.a.ak(r,a0)
if(e<0)A.M(A.a8(A.l(r)+" contains no null elements.",a0))
B.a.v(r,e,g)}}a.mT(i)
q.a+=" "
a.mS(n,r)
if(s)q.a+=" "
d=B.a.jC(l,new A.jX())
if(d===-1)c=a0
else{if(!(d>=0&&d<l.length))return A.c(l,d)
c=l[d]}k=c!=null
if(k){j=c.a
g=j.gS(j).gad()===i?j.gS(j).gam():0
a.mQ(h,g,j.gV().gad()===i?j.gV().gam():h.length,p)}else a.dS(h)
q.a+="\n"
if(k)a.mR(n,c,r)
for(k=l.length,b=0;b<k;++b){l[b].toString
continue}}a.dQ("\u2575")
a1=q.a
return a1.charCodeAt(0)==0?a1:a1},
iN(a){var s=this
if(!s.f||!t.jJ.b(a))s.dQ("\u2577")
else{s.dQ("\u250c")
s.b1(new A.jK(s),"\x1b[34m",t.q)
s.r.a+=" "+$.nA().jT(a)}s.r.a+="\n"},
dP(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d={}
t.eU.a(b)
d.a=!1
d.b=null
s=c==null
if(s)r=null
else r=e.b
for(q=b.length,p=t.P,o=e.b,s=!s,n=e.r,m=t.q,l=!1,k=0;k<q;++k){j=b[k]
i=j==null
if(i)h=null
else{g=j.a
h=g.gS(g).gad()}f=i?null:j.a.gV().gad()
if(s&&j===c){e.b1(new A.jR(e,h,a),r,p)
l=!0}else if(l)e.b1(new A.jS(e,j),r,p)
else if(i)if(d.a)e.b1(new A.jT(e),d.b,m)
else n.a+=" "
else e.b1(new A.jU(d,e,c,h,a,j,f),o,p)}},
mS(a,b){return this.dP(a,b,null)},
mQ(a,b,c,d){var s=this
s.dS(B.b.B(a,0,b))
s.b1(new A.jL(s,a,b,c),d,t.q)
s.dS(B.b.B(a,c,a.length))},
mR(a,b,c){var s,r,q,p,o=this
t.eU.a(c)
s=o.b
r=b.a
if(r.gS(r).gad()===r.gV().gad()){o.fl()
r=o.r
r.a+=" "
o.dP(a,c,b)
if(c.length!==0)r.a+=" "
o.iO(b,c,o.b1(new A.jM(o,a,b),s,t.S))}else{q=a.b
if(r.gS(r).gad()===q){if(B.a.F(c,b))return
A.ul(c,b,t.C)
o.fl()
r=o.r
r.a+=" "
o.dP(a,c,b)
o.b1(new A.jN(o,a,b),s,t.q)
r.a+="\n"}else if(r.gV().gad()===q){p=r.gV().gam()===a.a.length
if(p&&!0){A.pD(c,b,t.C)
return}o.fl()
o.r.a+=" "
o.dP(a,c,b)
o.iO(b,c,o.b1(new A.jO(o,p,a,b),s,t.S))
A.pD(c,b,t.C)}}},
iM(a,b,c){var s=c?0:1,r=this.r
s=r.a+=B.b.A("\u2500",1+b+this.fb(B.b.B(a.a,0,b+s))*3)
r.a=s+"^"},
mP(a,b){return this.iM(a,b,!0)},
iO(a,b,c){t.eU.a(b)
this.r.a+="\n"
return},
dS(a){var s,r,q,p
for(s=new A.a9(a),r=t.E,s=new A.O(s,s.gn(s),r.h("O<w.E>")),q=this.r,r=r.h("w.E");s.m();){p=s.d
if(p==null)p=r.a(p)
if(p===9)q.a+=B.b.A(" ",4)
else q.a+=A.bc(p)}},
dR(a,b,c){var s={}
s.a=c
if(b!=null)s.a=B.d.l(b+1)
this.b1(new A.jV(s,this,a),"\x1b[34m",t.P)},
dQ(a){return this.dR(a,null,null)},
mU(a){return this.dR(null,null,a)},
mT(a){return this.dR(null,a,null)},
fl(){return this.dR(null,null,null)},
fb(a){var s,r,q,p
for(s=new A.a9(a),r=t.E,s=new A.O(s,s.gn(s),r.h("O<w.E>")),r=r.h("w.E"),q=0;s.m();){p=s.d
if((p==null?r.a(p):p)===9)++q}return q},
mx(a){var s,r,q
for(s=new A.a9(a),r=t.E,s=new A.O(s,s.gn(s),r.h("O<w.E>")),r=r.h("w.E");s.m();){q=s.d
if(q==null)q=r.a(q)
if(q!==32&&q!==9)return!1}return!0},
b1(a,b,c){var s,r
c.h("0()").a(a)
s=this.b!=null
if(s&&b!=null)this.r.a+=b
r=a.$0()
if(s&&b!=null)this.r.a+="\x1b[0m"
return r}}
A.jW.prototype={
$0(){return this.a},
$S:78}
A.jE.prototype={
$1(a){var s=t.nR.a(a).d,r=A.v(s)
r=new A.am(s,r.h("A(1)").a(new A.jD()),r.h("am<1>"))
return r.gn(r)},
$S:79}
A.jD.prototype={
$1(a){var s=t.C.a(a).a
return s.gS(s).gad()!==s.gV().gad()},
$S:12}
A.jF.prototype={
$1(a){return t.nR.a(a).c},
$S:81}
A.jH.prototype={
$1(a){var s=t.C.a(a).a.ga4()
return s==null?new A.K():s},
$S:82}
A.jI.prototype={
$2(a,b){var s=t.C
return s.a(a).a.aA(0,s.a(b).a)},
$S:83}
A.jJ.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
t.lO.a(a)
s=a.a
r=a.b
q=A.a([],t.dg)
for(p=J.aR(r),o=p.gH(r),n=t.pg;o.m();){m=o.gu().a
l=m.gaW()
k=A.me(l,m.gY(m),m.gS(m).gam())
k.toString
k=B.b.c7("\n",B.b.B(l,0,k))
j=k.gn(k)
i=m.gS(m).gad()-j
for(m=l.split("\n"),k=m.length,h=0;h<k;++h){g=m[h]
if(q.length===0||i>B.a.gq(q).b)B.a.p(q,new A.bg(g,i,s,A.a([],n)));++i}}f=A.a([],n)
for(o=q.length,n=t.aP,e=0,h=0;h<q.length;q.length===o||(0,A.e)(q),++h){g=q[h]
m=n.a(new A.jG(g))
if(!!f.fixed$length)A.M(A.S("removeWhere"))
B.a.fj(f,m,!0)
d=f.length
for(m=p.b7(r,e),m=m.gH(m);m.m();){k=m.gu()
c=k.a
if(c.gS(c).gad()>g.b)break
B.a.p(f,k)}e+=f.length-d
B.a.M(g.d,f)}return q},
$S:84}
A.jG.prototype={
$1(a){return t.C.a(a).a.gV().gad()<this.a.b},
$S:12}
A.jX.prototype={
$1(a){t.C.a(a)
return!0},
$S:12}
A.jK.prototype={
$0(){this.a.r.a+=B.b.A("\u2500",2)+">"
return null},
$S:1}
A.jR.prototype={
$0(){var s=this.b===this.c.b?"\u250c":"\u2514"
this.a.r.a+=s},
$S:3}
A.jS.prototype={
$0(){var s=this.b==null?"\u2500":"\u253c"
this.a.r.a+=s},
$S:3}
A.jT.prototype={
$0(){this.a.r.a+="\u2500"
return null},
$S:1}
A.jU.prototype={
$0(){var s,r,q=this,p=q.a,o=p.a?"\u253c":"\u2502"
if(q.c!=null)q.b.r.a+=o
else{s=q.e
r=s.b
if(q.d===r){s=q.b
s.b1(new A.jP(p,s),p.b,t.P)
p.a=!0
if(p.b==null)p.b=s.b}else{s=q.r===r&&q.f.a.gV().gam()===s.a.length
r=q.b
if(s)r.r.a+="\u2514"
else r.b1(new A.jQ(r,o),p.b,t.P)}}},
$S:3}
A.jP.prototype={
$0(){var s=this.a.a?"\u252c":"\u250c"
this.b.r.a+=s},
$S:3}
A.jQ.prototype={
$0(){this.a.r.a+=this.b},
$S:3}
A.jL.prototype={
$0(){var s=this
return s.a.dS(B.b.B(s.b,s.c,s.d))},
$S:1}
A.jM.prototype={
$0(){var s,r,q=this.a,p=q.r,o=p.a,n=this.c.a,m=n.gS(n).gam(),l=n.gV().gam()
n=this.b.a
s=q.fb(B.b.B(n,0,m))
r=q.fb(B.b.B(n,m,l))
m+=s*3
p.a+=B.b.A(" ",m)
p=p.a+=B.b.A("^",Math.max(l+(s+r)*3-m,1))
return p.length-o.length},
$S:30}
A.jN.prototype={
$0(){var s=this.c.a
return this.a.mP(this.b,s.gS(s).gam())},
$S:1}
A.jO.prototype={
$0(){var s=this,r=s.a,q=r.r,p=q.a
if(s.b)q.a+=B.b.A("\u2500",3)
else r.iM(s.c,Math.max(s.d.a.gV().gam()-1,0),!1)
return q.a.length-p.length},
$S:30}
A.jV.prototype={
$0(){var s=this.b,r=s.r,q=this.a.a
if(q==null)q=""
s=r.a+=B.b.p7(q,s.d)
q=this.c
r.a=s+(q==null?"\u2502":q)},
$S:3}
A.aE.prototype={
l(a){var s=this.a
s=""+"primary "+(""+s.gS(s).gad()+":"+s.gS(s).gam()+"-"+s.gV().gad()+":"+s.gV().gam())
return s.charCodeAt(0)==0?s:s}}
A.lE.prototype={
$0(){var s,r,q,p,o=this.a
if(!(t.ol.b(o)&&A.me(o.gaW(),o.gY(o),o.gS(o).gam())!=null)){s=o.gS(o)
s=A.hR(s.gav(s),0,0,o.ga4())
r=o.gV()
r=r.gav(r)
q=o.ga4()
p=A.tV(o.gY(o),10)
o=A.kL(s,A.hR(r,A.oy(o.gY(o)),p,q),o.gY(o),o.gY(o))}return A.rB(A.rD(A.rC(o)))},
$S:86}
A.bg.prototype={
l(a){return""+this.b+': "'+this.a+'" ('+B.a.aC(this.d,", ")+")"}}
A.bC.prototype={
fI(a){var s=this.a
if(!J.U(s,a.ga4()))throw A.d(A.a8('Source URLs "'+A.l(s)+'" and "'+A.l(a.ga4())+"\" don't match.",null))
return Math.abs(this.b-a.gav(a))},
aA(a,b){var s
t.hq.a(b)
s=this.a
if(!J.U(s,b.ga4()))throw A.d(A.a8('Source URLs "'+A.l(s)+'" and "'+A.l(b.ga4())+"\" don't match.",null))
return this.b-b.gav(b)},
U(a,b){if(b==null)return!1
return t.hq.b(b)&&J.U(this.a,b.ga4())&&this.b===b.gav(b)},
gX(a){var s=this.a
s=s==null?null:s.gX(s)
if(s==null)s=0
return s+this.b},
l(a){var s=this,r=A.dH(s).l(0),q=s.a
return"<"+r+": "+s.b+" "+(A.l(q==null?"unknown source":q)+":"+(s.c+1)+":"+(s.d+1))+">"},
$iag:1,
ga4(){return this.a},
gav(a){return this.b},
gad(){return this.c},
gam(){return this.d}}
A.hS.prototype={
fI(a){if(!J.U(this.a.a,a.ga4()))throw A.d(A.a8('Source URLs "'+A.l(this.ga4())+'" and "'+A.l(a.ga4())+"\" don't match.",null))
return Math.abs(this.b-a.gav(a))},
aA(a,b){t.hq.a(b)
if(!J.U(this.a.a,b.ga4()))throw A.d(A.a8('Source URLs "'+A.l(this.ga4())+'" and "'+A.l(b.ga4())+"\" don't match.",null))
return this.b-b.gav(b)},
U(a,b){if(b==null)return!1
return t.hq.b(b)&&J.U(this.a.a,b.ga4())&&this.b===b.gav(b)},
gX(a){var s=this.a.a
s=s==null?null:s.gX(s)
if(s==null)s=0
return s+this.b},
l(a){var s=A.dH(this).l(0),r=this.b,q=this.a,p=q.a
return"<"+s+": "+r+" "+(A.l(p==null?"unknown source":p)+":"+(q.cM(r)+1)+":"+(q.aL(r)+1))+">"},
$iag:1,
$ibC:1}
A.hT.prototype={
m3(a,b,c){var s,r=this.b,q=this.a
if(!J.U(r.ga4(),q.ga4()))throw A.d(A.a8('Source URLs "'+A.l(q.ga4())+'" and  "'+A.l(r.ga4())+"\" don't match.",null))
else if(r.gav(r)<q.gav(q))throw A.d(A.a8("End "+r.l(0)+" must come after start "+q.l(0)+".",null))
else{s=this.c
if(s.length!==q.fI(r))throw A.d(A.a8('Text "'+s+'" must be '+q.fI(r)+" characters long.",null))}},
gS(a){return this.a},
gV(){return this.b},
gY(a){return this.c}}
A.eF.prototype={
ga4(){return this.gS(this).ga4()},
gn(a){var s,r=this.gV()
r=r.gav(r)
s=this.gS(this)
return r-s.gav(s)},
aA(a,b){var s
t.hs.a(b)
s=this.gS(this).aA(0,b.gS(b))
return s===0?this.gV().aA(0,b.gV()):s},
jN(a,b,c){var s,r,q=this,p=""+("line "+(q.gS(q).gad()+1)+", column "+(q.gS(q).gam()+1))
if(q.ga4()!=null){s=q.ga4()
s=p+(" of "+$.nA().jT(s))
p=s}p+=": "+b
r=q.oJ(c)
if(r.length!==0)p=p+"\n"+r
return p.charCodeAt(0)==0?p:p},
oJ(a){var s=this
if(!t.ol.b(s)&&s.gn(s)===0)return""
return A.qv(s,a).oI()},
U(a,b){if(b==null)return!1
return t.hs.b(b)&&this.gS(this).U(0,b.gS(b))&&this.gV().U(0,b.gV())},
gX(a){return A.cQ(this.gS(this),this.gV(),B.n,B.n)},
l(a){var s=this
return"<"+A.dH(s).l(0)+": from "+s.gS(s).l(0)+" to "+s.gV().l(0)+' "'+s.gY(s)+'">'},
$iag:1,
$ibr:1}
A.bS.prototype={
gaW(){return this.d}}
A.C.prototype={
l(a){return"["+A.l(this.a)+", "+A.l(this.b)+"]"},
U(a,b){if(b==null)return!1
return b instanceof A.C&&J.U(b.a,this.a)&&J.U(b.b,this.b)},
gX(a){return A.cQ(J.aL(this.a),J.aL(this.b),B.n,B.n)}}
A.cU.prototype={
l(a){return"["+this.a.l(0)+", "+A.l(this.b)+", "+A.l(this.c)+"]"},
U(a,b){if(b==null)return!1
return b instanceof A.cU&&b.a===this.a&&b.b===this.b&&b.c===this.c},
gX(a){return A.cQ(A.bR(this.a),B.h.gX(this.b),B.h.gX(this.c),B.n)}}
A.du.prototype={
ap(a){var s=this
return A.eo([s.a,s.b,s.c,s.d],!1,t.z)},
l(a){var s=this
return"["+s.a.l(0)+", "+s.b.l(0)+", "+s.c.l(0)+", "+s.d.l(0)+"]"},
U(a,b){var s=this
if(b==null)return!1
return b instanceof A.du&&b.a.U(0,s.a)&&b.b.U(0,s.b)&&b.c.U(0,s.c)&&b.d.U(0,s.d)},
gX(a){var s=this
return A.cQ(A.bR(s.a),A.bR(s.b),A.bR(s.c),A.bR(s.d))}}
A.e7.prototype={
bj(){var s=0,r=A.bI(t.z),q=this,p,o,n,m,l,k
var $async$bj=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:k=q.f
k===$&&A.b("camera")
k.f=new A.P(0.0862745098,0.09803921568,0.13725490196,1)
s=2
return A.an(q.d0(),$async$bj)
case 2:q.cy=5
s=3
return A.an(q.d_(),$async$bj)
case 3:k=A.nI(A.d2(B.Q,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null),B.e,A.d2(null,null,null,null,null,null,null,null,null,null,null,null,A.E(6,1,1),null,null,null,null,null,null,1),5,0,A.d2(null,null,null,null,null,null,B.z,null,null,null,null,null,null,null,null,0.5,null,null,null,1.4),1,-1)
k.aV(B.Q)
q.y=k
p=q.z
p===$&&A.b("circlePlane")
k.az(p.aq(B.e.L(0,B.j)).I(0,k.aq(B.e.I(0,B.j))).L(0,B.j.A(0,0.5)).A(0,B.aC))
k=q.y
p=k.h2(0)
o=k.h2(1)
n=A.a([B.A,B.L,B.y,B.M],t.l)
m=new A.eJ(0.25,k,4,0,!1,0.01,!1,0.000001,4,null,null,null,B.c,$,null,$,$,$)
m.ae(B.c,null,null)
m.dE(n,B.c)
m.f1(B.c,o+0.5,p+0.5)
m.p0(k)
m.eU(B.c)
m.cm(B.k)
m.eU(B.Q)
q.as=m
m=t.cG.a(A.a([A.e5(q.y),A.e5(q.as)],t.lq))
k=new A.d8(B.c,$,null,$,$,$)
k.ae(B.c,null,null)
p=t.a
k.aJ(p.a(B.bj))
k=new A.fG(m,0,A.pC(),0,k)
k.f=k.b5()
k.lZ(m,null,0,A.pC(),0)
s=4
return A.an(q.aY(0,k),$async$bj)
case 4:k=q.ch
k===$&&A.b("wave")
q.ay=q.kt(k)
s=5
return A.an(q.cY(),$async$bj)
case 5:s=6
return A.an(q.cQ(),$async$bj)
case 6:s=7
return A.an(q.dT(),$async$bj)
case 7:k=q.ax
k===$&&A.b("fourierDot")
k.pA(q.gjB())
k=q.ax
l=new A.dY($,$,$,!1,k,B.c,$,null,$,$,$)
l.ae(B.c,null,null)
l.m1(k)
l.dU(q.go7())
q.aJ(p.a(A.a([l],t.r)))
s=8
return A.an(q.dZ(),$async$bj)
case 8:return A.bG(null,r)}})
return A.bH($async$bj,r)},
dT(){var s=0,r=A.bI(t.z),q=this,p,o
var $async$dT=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:o=new A.eq(" ",B.r,B.a_,A.a([],t.s),"","align*",!0,2,null,"",!0,A.bp(t.N,t.h),4,0,!1,0.01,!1,0.000001,4,null,null,null,B.c,$,null,$,$,$)
o.ae(B.c,null,null)
p=o.r
p===$&&A.b("points")
if(J.c8(p))o.h4()
o.a=B.c
o.a7="align*"
o.spO(A.qJ(u.l,B.r,B.a_))
o.a6=B.a.aC(o.cc," ")
o.jh()
o.ny()
o.lc(B.a_)
o.fq(B.L,0.5)
o.dA(1.2)
s=2
return A.an(q.aY(0,A.og(o)),$async$dT)
case 2:return A.bG(null,r)}})
return A.bH($async$dT,r)},
cY(){var s=0,r=A.bI(t.z),q=this,p,o
var $async$cY=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:o=A.rs(B.c)
o.cm(B.k)
p=q.ay
p===$&&A.b("fourierGraph")
p.an("getEnd")
p=p.r
p===$&&A.b("points")
o.saH(t.y.a(A.a([J.aG(p)],t.l)))
q.cx=o
o=A.nV(B.e)
o.aV(B.ab)
q.at=o
o=q.ay
o.an("getEnd")
o=o.r
o===$&&A.b("points")
o=A.nV(J.aG(o))
o.aV(B.ab)
q.ax=o
q.at.dU(new A.js(q))
s=2
return A.an(q.aY(0,A.e5(q.at)),$async$cY)
case 2:s=3
return A.an(q.aY(0,A.e5(q.ax)),$async$cY)
case 3:q.ax.dU(q.gjB())
return A.bG(null,r)}})
return A.bH($async$cY,r)},
oD(a,b){var s
t.j.a(a)
A.aP(b)
s=this.cx
s===$&&A.b("partialFourierGraph")
s.an("getStart")
s=s.r
s===$&&A.b("points")
a.c_(J.aF(s))
return a},
cQ(){var s=0,r=A.bI(t.z),q=this,p,o,n
var $async$cQ=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:n=q.ax
n===$&&A.b("fourierDot")
p=q.cx
p===$&&A.b("partialFourierGraph")
o=t.r
q.aJ(A.a([n,p],o))
q.cx.dU(new A.jz(q))
p=q.ch
p===$&&A.b("wave")
n=q.CW
n===$&&A.b("polarized")
s=2
return A.an(q.aY(0,q.hp(p,n,5,2,12)),$async$cQ)
case 2:s=3
return A.an(q.aY(0,q.hp(q.ch,q.CW,2,0,10)),$async$cQ)
case 3:n=t.a
q.k8(!0,n.a(A.a([q.cx],o)))
p=q.ay
p===$&&A.b("fourierGraph")
q.aJ(n.a(A.a([p],o)))
return A.bG(null,r)}})
return A.bH($async$cQ,r)},
d0(){var s=0,r=A.bI(t.z),q=this,p,o
var $async$d0=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:p=t.n
o=A.d2(null,null,null,null,null,null,null,null,null,null,null,null,null,A.a([0,1,2,3,4],p),null,0.25,null,null,null,2)
p=A.d2(null,null,null,null,null,null,null,null,null,null,null,null,null,A.a([],p),null,null,null,null,null,0.5)
p=A.nI(A.d2(null,null,null,null,null,!0,null,null,null,null,null,null,null,null,null,null,null,null,null,null),B.e,o,4.4,0,p,2.5,-1)
p.aV(B.R)
p.fq(B.A,0.5)
q.x=p
q.ch=q.kr()
s=2
return A.an(q.aY(0,A.e5(q.x)),$async$d0)
case 2:s=3
return A.an(q.aY(0,A.og(q.ch)),$async$d0)
case 3:return A.bG(null,r)}})
return A.bH($async$d0,r)},
d_(){var s=0,r=A.bI(t.z),q=this,p,o,n,m
var $async$d_=A.bJ(function(a,b){if(a===1)return A.bF(b,r)
while(true)switch(s){case 0:m=new A.ev(B.B.bJ(B.O),B.o.bJ(B.o),B.a4.bJ(B.N),B.e6,null,1,1,1,$,$,B.e,B.B,B.o,B.o,-2.1,2.1,-2.1,2.1,4,0,!1,0.01,!1,0.000001,4,null,null,null,B.c,$,null,$,$,$)
m.ae(B.c,null,null)
m.f2(null)
m.hT(B.B,B.e,B.o,2.1,-2.1,B.o,2.1,-2.1)
m.Q=!0
m.oL()
m.eV(1)
m.dA(0.8)
m.fq(B.M,0.5)
q.z=m
m=A.nP(B.e,B.c,1)
p=m.eE()
o=new A.dT(4,0,!1,0.01,!1,0.000001,4,null,null,null,p,$,null,$,$,$)
o.ae(p,null,null)
o.m_(m,p,50,0.5)
o.eV(2)
o.dA(0.8)
o.az(q.z.e_(B.e))
q.Q=o
q.z.aJ(A.a([o],t.r))
o=q.ch
o===$&&A.b("wave")
n=q.eL(o,q.cy)
q.CW=A.mH(q.ch)
s=2
return A.an(q.aY(0,A.e5(q.z)),$async$d_)
case 2:s=3
return A.an(q.aY(0,A.rk(q.CW,0,A.iP(),1,n)),$async$d_)
case 3:return A.bG(null,r)}})
return A.bH($async$d_,r)},
o8(a,b){var s,r,q,p,o=this
t.j.a(a)
A.aP(b)
s=o.y
s===$&&A.b("frequencyAxes")
r=o.ax
r===$&&A.b("fourierDot")
q=Math.min(5,Math.max(s.hb(new A.f(r.eF(0,null),r.eF(1,null),r.eF(2,null))).a,0))
r=o.ay
r===$&&A.b("fourierGraph")
r=r.a6.$1(q)
p=o.y.e_(new A.f(q,r,0))
o.ax.c_(p)
o.cy=q
r=o.CW
r===$&&A.b("polarized")
s=o.ch
s===$&&A.b("wave")
r.j0(o.eL(s,q))
return a},
kt(a){var s=this.y
s===$&&A.b("frequencyAxes")
return s.hq(new A.ju(this,a),0.016666666666666666)},
ku(a,b){var s,r=b.hn(),q=new A.jv(this),p=A.a([],t.hR)
for(s=J.I(r);s.m();)p.push(q.$2(s.gu(),a))
s=p.length
return J.bk(B.a.aT(p,new A.jw()),new A.as(1/s,0))},
kr(){var s=t.f3.a(new A.jt(1,0.9,B.b6)),r=this.x
r===$&&A.b("timeAxes")
s=r.hq(s,0.016666666666666666)
s.eU(B.b_)
s.cm(B.k)
return s},
eL(a,b){var s=A.mH(a)
s.c8(new A.jy(this,b))
return s},
hp(a,b,c,d,e){var s=new A.eR(new A.jx(this,c,d,a),e,A.iP(),0,b,t.oL)
s.f=s.b5()
return s}}
A.js.prototype={
$2(a,b){var s
t.j.a(a)
A.aP(b)
s=this.a.CW
s===$&&A.b("polarized")
a.c_(s.kq())
return a},
$S:5}
A.jz.prototype={
$2(a,b){var s,r
t.j.a(a)
A.aP(b)
s=this.a
r=s.ay
r===$&&A.b("fourierGraph")
a.dl(r,s.cy/5,1)
return a},
$S:5}
A.ju.prototype={
$1(a){return this.a.ku(A.aP(a),this.b).a},
$S:7}
A.jv.prototype={
$2(a,b){var s,r=this.a.x
r===$&&A.b("timeAxes")
s=r.hb(a)
return A.nS(-6.283185307179586*b*s.a).A(0,new A.as(s.b,0))},
$S:88}
A.jw.prototype={
$2(a,b){var s=t.ck
s.a(a)
s.a(b)
return new A.as(a.a+b.a,a.b+b.b)},
$S:89}
A.jt.prototype={
$1(a){var s,r,q,p
A.aP(a)
s=A.a([],t.g2)
for(r=this.c,q=6.283185307179586*a,p=0;p<1;++p)s.push(Math.cos(q*r[p]))
return this.a+this.b*A.iQ(s,t.p)},
$S:7}
A.jy.prototype={
$1(a){var s,r,q=this.a,p=q.x
p===$&&A.b("timeAxes")
s=p.hb(a)
r=A.nS(-6.283185307179586*this.b*s.a).A(0,new A.as(s.b,0))
q=q.z
q===$&&A.b("circlePlane")
return q.e_(new A.f(r.a,r.b,0))},
$S:4}
A.jx.prototype={
$2(a,b){var s=this,r=s.a,q=A.aP(A.fq(s.b,s.c,b,t.z))
r.cy=q
a.j0(r.eL(s.d,q))
return a},
$S:5};(function aliases(){var s=J.eh.prototype
s.lJ=s.l
s=J.cK.prototype
s.lO=s.l
s=A.bo.prototype
s.lK=s.jF
s.lL=s.jG
s.lN=s.jI
s.lM=s.jH
s=A.w.prototype
s.lP=s.bV
s=A.K.prototype
s.hS=s.l
s=A.a7.prototype
s.lV=s.a2
s=A.aY.prototype
s.lQ=s.v
s.bQ=s.p
s.hQ=s.bF
s.lR=s.M
s=A.aT.prototype
s.lG=s.d3
s.lH=s.d4
s.lI=s.fH
s=A.H.prototype
s.lS=s.cv
s.lU=s.cH
s.hR=s.c2
s.lT=s.d8
s.cT=s.b6
s.cS=s.b_
s=A.R.prototype
s.lY=s.c2
s=A.dK.prototype
s.lF=s.lm
s=A.eF.prototype
s.lX=s.aA
s.lW=s.U})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._instance_1i,q=hunkHelpers.installInstanceTearOff,p=hunkHelpers._static_1,o=hunkHelpers._static_0,n=hunkHelpers.installStaticTearOff,m=hunkHelpers._instance_1u,l=hunkHelpers._instance_0u,k=hunkHelpers._instance_2u
s(J,"to","qB",32)
r(J.y.prototype,"gmY","p",90)
q(J.bO.prototype,"ghO",1,1,null,["$2","$1"],["a9","a_"],56,0,0)
p(A,"ty","qs",33)
p(A,"tL","rw",16)
p(A,"tM","rx",16)
p(A,"tN","ry",16)
o(A,"pc","tF",1)
s(A,"pe","tf",93)
p(A,"tQ","tg",33)
s(A,"tP","qG",32)
p(A,"tU","ro",22)
n(A,"ui",2,null,["$1$2","$2"],["px",function(a,b){return A.px(a,b,t.p)}],31,0)
n(A,"pv",2,null,["$1$2","$2"],["pw",function(a,b){return A.pw(a,b,t.p)}],31,0)
p(A,"pf","a6",11)
p(A,"tS","ms",11)
p(A,"tT","pt",11)
p(A,"bU","qb",95)
m(A.eB.prototype,"gkh","ki",87)
var j
l(j=A.e9.prototype,"gD","nX",0)
l(j,"goe","of",0)
l(j,"gcI","pw",0)
l(j,"gnD","nE",0)
l(j,"ges","pp",0)
l(j,"gbO","l6",0)
l(j,"gpb","pc",0)
l(j,"gpL","pM",0)
l(j,"gnG","nH",0)
l(j,"gka","pK",0)
l(j,"gpu","pv",0)
l(j,"gps","pt",0)
l(j,"gpq","pr",0)
l(j,"gpn","po",0)
l(j,"gpl","pm",0)
l(j,"gpj","pk",0)
l(j,"gl4","l5",0)
l(j,"gkQ","kR",0)
l(j,"gkO","kP",0)
l(j,"gkU","kV",0)
l(j,"gkS","kT",0)
l(j,"gbf","l3",0)
l(j,"gkX","kY",0)
l(j,"ghA","kW",0)
l(j,"geP","l2",0)
l(j,"gl0","l1",0)
l(j,"gkZ","l_",0)
l(j,"gkG","kH",0)
l(j,"gbN","kN",0)
l(j,"gkK","kL",0)
l(j,"gkI","kJ",0)
l(j,"geO","kM",0)
l(j,"gkE","kF",0)
l(j,"gbB","nn",0)
l(j,"gbU","ng",0)
l(j,"gn2","n3",0)
l(j,"gj1","no",0)
l(j,"gnh","ni",0)
l(j,"gnj","nk",0)
l(j,"gdW","nl",0)
l(j,"giS","n4",0)
l(j,"gbx","l7",0)
l(j,"gfw","nw",0)
l(j,"goW","oX",0)
l(j,"gnP","nQ",0)
l(j,"gnN","nO",0)
l(j,"gbW","nR",0)
l(j,"gj9","nL",0)
l(j,"gja","nM",0)
l(j,"gnJ","nK",0)
l(j,"go3","o4",0)
l(j,"gj2","np",0)
l(j,"gfJ","nZ",0)
l(j,"gn5","n6",0)
l(j,"gn8","n9",0)
l(j,"gft","nq",0)
l(j,"go_","o0",0)
l(j,"go1","o2",0)
l(j,"giT","n7",0)
l(j,"gns","nt",0)
l(j,"gnb","nc",0)
l(j,"gfu","nr",0)
l(j,"gfK","o5",0)
l(j,"gfL","o6",0)
l(j,"giU","na",0)
l(j,"gcz","nx",0)
l(j,"gnA","nB",0)
l(A.H.prototype,"gkw","b5",9)
k(j=A.e7.prototype,"gjB","oD",5)
k(j,"go7","o8",5)
n(A,"pA",3,null,["$3"],["uo"],96,0)
n(A,"pC",1,null,["$3$inflection$pauseRatio","$1"],["pu",function(a){return A.pu(a,null,null)}],26,0)
n(A,"iP",1,null,["$3$inflection$pauseRatio","$1"],["pF",function(a){return A.pF(a,null,null)}],26,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.K,null)
q(A.K,[A.mK,J.eh,J.aC,A.j,A.dS,A.aV,A.a4,A.f0,A.kK,A.O,A.V,A.e4,A.e1,A.cX,A.bm,A.bE,A.d6,A.kU,A.hs,A.e2,A.f5,A.cM,A.ka,A.cL,A.cJ,A.dA,A.dx,A.dt,A.iC,A.ln,A.bA,A.iv,A.f8,A.lL,A.ie,A.dz,A.cs,A.dO,A.ih,A.cY,A.au,A.ig,A.eH,A.eI,A.hV,A.iA,A.ff,A.fh,A.iw,A.cZ,A.w,A.f1,A.b_,A.f4,A.iH,A.cE,A.lP,A.lo,A.hw,A.eG,A.it,A.e6,A.bq,A.aq,A.iD,A.hG,A.a5,A.fd,A.kW,A.bu,A.mF,A.iy,A.cR,A.eZ,A.lI,A.bs,A.kS,A.dg,A.kg,A.ky,A.T,A.ia,A.aH,A.ix,A.lH,A.io,A.ak,A.jZ,A.a7,A.aZ,A.kB,A.jp,A.jg,A.jY,A.b7,A.eK,A.e9,A.kT,A.o,A.aT,A.jb,A.dJ,A.H,A.aM,A.co,A.eA,A.dK,A.hJ,A.P,A.as,A.b8,A.jq,A.b9,A.kr,A.bx,A.f,A.jh,A.kQ,A.kv,A.hz,A.hQ,A.hS,A.eF,A.jC,A.aE,A.bg,A.bC,A.C,A.cU,A.du])
q(J.eh,[J.hh,J.ej,J.ba,J.y,J.cc,J.bO,A.ho])
q(J.ba,[J.cK,A.aW,A.dR,A.jl,A.dW,A.t,A.hy])
q(J.cK,[J.hB,J.bT,J.bP])
r(J.k7,J.y)
q(J.cc,[J.dc,J.ek])
q(A.j,[A.cq,A.Q,A.cN,A.am,A.e3,A.c_,A.ar,A.eU,A.ei,A.iB,A.hH])
q(A.cq,[A.cD,A.fg])
r(A.eW,A.cD)
r(A.eT,A.fg)
q(A.aV,[A.fU,A.fT,A.jB,A.eg,A.hW,A.k8,A.ml,A.mn,A.lj,A.li,A.lS,A.lv,A.lD,A.kM,A.lK,A.lG,A.kd,A.lX,A.lY,A.lh,A.lq,A.k5,A.jr,A.k3,A.kI,A.kJ,A.kH,A.kG,A.k_,A.jc,A.jd,A.iU,A.iV,A.iW,A.ks,A.kt,A.jk,A.ku,A.jA,A.kC,A.kE,A.kD,A.jm,A.jn,A.jo,A.kp,A.ko,A.kn,A.km,A.kq,A.ki,A.kk,A.kl,A.a1,A.a2,A.a3,A.lc,A.ld,A.l9,A.l8,A.l7,A.l3,A.lb,A.la,A.je,A.mx,A.mp,A.mq,A.mr,A.m6,A.mj,A.m9,A.lV,A.kP,A.j2,A.j1,A.j0,A.j_,A.lg,A.le,A.ji,A.jj,A.m3,A.jE,A.jD,A.jF,A.jH,A.jJ,A.jG,A.jX,A.ju,A.jt,A.jy])
q(A.fU,[A.lm,A.mm,A.lT,A.m4,A.lw,A.kb,A.kc,A.kX,A.kY,A.kZ,A.lW,A.kx,A.k2,A.mf,A.ja,A.kf,A.kh,A.kj,A.l5,A.l6,A.l1,A.l4,A.l2,A.kF,A.my,A.mz,A.m5,A.mh,A.mi,A.md,A.m7,A.m8,A.j3,A.j6,A.j5,A.j4,A.j7,A.iZ,A.mw,A.lf,A.jI,A.js,A.jz,A.jv,A.jw,A.jx])
r(A.aU,A.eT)
q(A.a4,[A.el,A.cn,A.hi,A.i2,A.hI,A.dN,A.is,A.hr,A.bM,A.i3,A.eQ,A.ck,A.fW,A.fY])
r(A.em,A.f0)
q(A.em,[A.dv,A.aY])
r(A.a9,A.dv)
q(A.fT,[A.mu,A.lk,A.ll,A.lM,A.lr,A.lz,A.lx,A.lt,A.ly,A.ls,A.lC,A.lB,A.lA,A.kN,A.m2,A.lJ,A.l0,A.l_,A.kw,A.k1,A.mc,A.mb,A.k0,A.jW,A.jK,A.jR,A.jS,A.jT,A.jU,A.jP,A.jQ,A.jL,A.jM,A.jN,A.jO,A.jV,A.lE])
q(A.Q,[A.B,A.e0,A.aX])
q(A.B,[A.aD,A.J,A.Y,A.en])
r(A.dZ,A.cN)
q(A.V,[A.cO,A.cW,A.eE])
r(A.d7,A.c_)
q(A.d6,[A.u,A.ca])
r(A.cb,A.eg)
r(A.eu,A.cn)
q(A.hW,[A.hU,A.d3])
r(A.id,A.dN)
r(A.ep,A.cM)
r(A.bo,A.ep)
q(A.ei,[A.ic,A.f7,A.ai,A.iu])
r(A.di,A.ho)
r(A.f2,A.di)
r(A.f3,A.f2)
r(A.es,A.f3)
q(A.es,[A.hn,A.et,A.cP])
r(A.f9,A.is)
r(A.f6,A.ih)
r(A.iz,A.ff)
r(A.f_,A.bo)
r(A.dB,A.fh)
q(A.dB,[A.c4,A.fi])
r(A.eC,A.f4)
r(A.fc,A.fi)
q(A.cE,[A.h1,A.fM])
q(A.h1,[A.fJ,A.i6])
r(A.cF,A.hV)
q(A.cF,[A.iE,A.fN,A.i7])
r(A.fK,A.iE)
q(A.bM,[A.dp,A.he])
r(A.ij,A.fd)
q(A.aW,[A.b5,A.dw])
q(A.b5,[A.r,A.bN])
r(A.x,A.r)
q(A.x,[A.fE,A.fH,A.cC,A.h6,A.hK])
r(A.bD,A.t)
r(A.bb,A.bD)
r(A.eV,A.dW)
r(A.eX,A.eH)
r(A.ip,A.eX)
r(A.eY,A.eI)
r(A.ha,A.bs)
r(A.kR,A.kS)
q(A.lo,[A.dh,A.i_,A.by])
q(A.T,[A.bY,A.cp,A.hY,A.hp,A.hL,A.ch,A.eD,A.b0,A.ds,A.ap])
q(A.b0,[A.cG,A.hm,A.fL,A.h9,A.fS,A.dm,A.dn,A.hq])
r(A.ex,A.dm)
r(A.hD,A.dn)
q(A.ap,[A.hv,A.hu,A.aj])
q(A.aj,[A.ht,A.bt,A.hA,A.h0,A.h3,A.h7])
q(A.bt,[A.hj,A.fF,A.hZ,A.h8,A.hF,A.fR,A.hE,A.i9])
q(A.ak,[A.ik,A.fZ,A.c1,A.iq,A.fV])
r(A.il,A.ik)
r(A.im,A.il)
r(A.dV,A.im)
r(A.ir,A.iq)
r(A.W,A.ir)
q(A.aY,[A.ad,A.fy])
r(A.h5,A.iu)
q(A.a7,[A.bz,A.fO,A.dQ,A.hc,A.fD,A.d9,A.hX,A.ef,A.db,A.ea,A.eb,A.cH,A.ed,A.da,A.ee,A.hd,A.hb,A.fB,A.ec,A.fC,A.fz,A.fA])
r(A.ii,A.eC)
r(A.h_,A.ii)
r(A.eB,A.ia)
q(A.b7,[A.c0,A.be,A.dU])
q(A.c0,[A.cj,A.L])
q(A.be,[A.m,A.G,A.cT,A.d5])
q(A.aT,[A.fG,A.hN,A.eO,A.eR])
r(A.hM,A.hN)
r(A.h4,A.eO)
r(A.fx,A.dJ)
r(A.fP,A.fx)
q(A.H,[A.R,A.hg,A.d8])
q(A.R,[A.eN,A.c3,A.dk,A.ew,A.cg,A.dr,A.eS,A.dT])
q(A.eN,[A.aw,A.dL])
r(A.dj,A.aw)
r(A.fX,A.c3)
r(A.cB,A.fX)
r(A.ev,A.cB)
r(A.e8,A.dk)
r(A.eM,A.co)
q(A.dL,[A.cA,A.d4])
q(A.d4,[A.dX,A.e_])
q(A.ew,[A.ey,A.dq])
r(A.eP,A.ey)
r(A.dM,A.eP)
q(A.dq,[A.ez,A.eJ])
r(A.eL,A.dr)
r(A.bZ,A.cg)
r(A.eq,A.bZ)
r(A.dY,A.hg)
r(A.fQ,A.dK)
r(A.hl,A.b8)
q(A.hl,[A.er,A.ce,A.cf,A.cd])
r(A.cI,A.kQ)
q(A.cI,[A.hC,A.i5,A.ib])
r(A.b3,A.hS)
q(A.eF,[A.at,A.hT])
r(A.bS,A.hT)
r(A.e7,A.hJ)
s(A.dv,A.bE)
s(A.fg,A.w)
s(A.f2,A.w)
s(A.f3,A.bm)
s(A.f0,A.w)
s(A.f4,A.b_)
s(A.fh,A.b_)
s(A.fi,A.iH)
s(A.ik,A.ix)
s(A.il,A.lH)
s(A.im,A.io)
s(A.iq,A.ix)
s(A.ir,A.io)
s(A.iu,A.w)})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{i:"int",p:"double",ac:"num",n:"String",A:"bool",aq:"Null",k:"List"},mangledNames:{},types:["A()","~()","p(p,C<i,i>)","aq()","f(f)","H(H,p)","A(i,f)","p(p)","A(n)","n()","P(P)","A(n?)","A(aE)","~(bb)","i(i,i)","A(H)","~(~())","A(i)","aq(@)","aw(aw)","@()","~(@,@)","n(n)","f(f,f)","~(cV,n,i)","~(K,n)","p(p{inflection:p?,pauseRatio:p?})","k<p>(P)","A(ak)","p(f)","i()","0^(0^,0^)<ac>","i(@,@)","i(K?)","f(p)","A(@)","k<n>()","~(i,@)","k<H>(H)","A(f)","aq(K,ci)","au<@>(@)","@(@)","aM(aM,aM)","A(p)","@(@,n)","A(K)","~(K?,K?)","n(cS)","A(n,n)","A(cd)","A(ce)","A(cf)","@(n)","~(n,i)","~(n,i?)","A(dl[i])","cV(@,@)","aq(~())","k<f>(k<k<f>>,@)","k<P>(n,R)","~(n,R,k<P>)","k<P>(k<P>)","A(P)","~(ac)","p(i)","~(t)","P(k<p>)","~(p,i{end:i?,start:i,step:i})","k<p>(k<p>)","p(n)","~(W)","k<p>(C<i,k<p>>)","p(C<i,p>)","p(k<p>)","bn<aq>()","bx(bx,bx)","n(n?)","n?()","i(bg)","A(K?)","K(bg)","K(aE)","i(aE,aE)","k<bg>(bq<K,k<aE>>)","n(be)","bS()","A(ch)","as(f,p)","as(as,as)","~(K?)","~(@)","aq(@,ci)","A(K?,K?)","b4<n,k<n>>()","i(i)","k<f>(k<f>,k<f>,p)","~(k<H>,bB<H>)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.rT(v.typeUniverse,JSON.parse('{"hB":"cK","bT":"cK","bP":"cK","ux":"t","uE":"t","uI":"r","uy":"x","uJ":"x","uF":"b5","uC":"b5","uK":"bb","uA":"bD","uz":"bN","uQ":"bN","hh":{"A":[]},"ej":{"aq":[]},"y":{"k":["1"],"Q":["1"],"j":["1"]},"k7":{"y":["1"],"k":["1"],"Q":["1"],"j":["1"]},"aC":{"V":["1"]},"cc":{"p":[],"ac":[],"ag":["ac"]},"dc":{"p":[],"i":[],"ac":[],"ag":["ac"]},"ek":{"p":[],"ac":[],"ag":["ac"]},"bO":{"n":[],"ag":["n"],"dl":[]},"cq":{"j":["2"]},"dS":{"V":["2"]},"cD":{"cq":["1","2"],"j":["2"],"j.E":"2"},"eW":{"cD":["1","2"],"cq":["1","2"],"Q":["2"],"j":["2"],"j.E":"2"},"eT":{"w":["2"],"k":["2"],"cq":["1","2"],"Q":["2"],"j":["2"]},"aU":{"eT":["1","2"],"w":["2"],"k":["2"],"cq":["1","2"],"Q":["2"],"j":["2"],"w.E":"2","j.E":"2"},"el":{"a4":[]},"a9":{"w":["i"],"bE":["i"],"k":["i"],"Q":["i"],"j":["i"],"w.E":"i","bE.E":"i"},"Q":{"j":["1"]},"B":{"Q":["1"],"j":["1"]},"aD":{"B":["1"],"Q":["1"],"j":["1"],"B.E":"1","j.E":"1"},"O":{"V":["1"]},"cN":{"j":["2"],"j.E":"2"},"dZ":{"cN":["1","2"],"Q":["2"],"j":["2"],"j.E":"2"},"cO":{"V":["2"]},"J":{"B":["2"],"Q":["2"],"j":["2"],"B.E":"2","j.E":"2"},"am":{"j":["1"],"j.E":"1"},"cW":{"V":["1"]},"e3":{"j":["2"],"j.E":"2"},"e4":{"V":["2"]},"c_":{"j":["1"],"j.E":"1"},"d7":{"c_":["1"],"Q":["1"],"j":["1"],"j.E":"1"},"eE":{"V":["1"]},"e0":{"Q":["1"],"j":["1"],"j.E":"1"},"e1":{"V":["1"]},"ar":{"j":["1"],"j.E":"1"},"cX":{"V":["1"]},"dv":{"w":["1"],"bE":["1"],"k":["1"],"Q":["1"],"j":["1"]},"Y":{"B":["1"],"Q":["1"],"j":["1"],"B.E":"1","j.E":"1"},"d6":{"b4":["1","2"]},"u":{"d6":["1","2"],"b4":["1","2"]},"eU":{"j":["1"],"j.E":"1"},"ca":{"d6":["1","2"],"b4":["1","2"]},"eg":{"aV":[],"bX":[]},"cb":{"aV":[],"bX":[]},"eu":{"cn":[],"a4":[]},"hi":{"a4":[]},"i2":{"a4":[]},"hs":{"bW":[]},"f5":{"ci":[]},"aV":{"bX":[]},"fT":{"aV":[],"bX":[]},"fU":{"aV":[],"bX":[]},"hW":{"aV":[],"bX":[]},"hU":{"aV":[],"bX":[]},"d3":{"aV":[],"bX":[]},"hI":{"a4":[]},"id":{"a4":[]},"bo":{"cM":["1","2"],"k9":["1","2"],"b4":["1","2"]},"aX":{"Q":["1"],"j":["1"],"j.E":"1"},"cL":{"V":["1"]},"cJ":{"dl":[]},"dA":{"cS":[],"df":[]},"ic":{"j":["cS"],"j.E":"cS"},"dx":{"V":["cS"]},"dt":{"df":[]},"iB":{"j":["df"],"j.E":"df"},"iC":{"V":["df"]},"di":{"dd":["1"]},"es":{"w":["i"],"dd":["i"],"k":["i"],"Q":["i"],"j":["i"],"bm":["i"]},"hn":{"w":["i"],"dd":["i"],"k":["i"],"Q":["i"],"j":["i"],"bm":["i"],"w.E":"i","bm.E":"i"},"et":{"w":["i"],"rm":[],"dd":["i"],"k":["i"],"Q":["i"],"j":["i"],"bm":["i"],"w.E":"i","bm.E":"i"},"cP":{"w":["i"],"cV":[],"dd":["i"],"k":["i"],"Q":["i"],"j":["i"],"bm":["i"],"w.E":"i","bm.E":"i"},"f8":{"oo":[]},"is":{"a4":[]},"f9":{"cn":[],"a4":[]},"au":{"bn":["1"]},"cs":{"V":["1"]},"f7":{"j":["1"],"j.E":"1"},"dO":{"a4":[]},"f6":{"ih":["1"]},"ff":{"ow":[]},"iz":{"ff":[],"ow":[]},"f_":{"bo":["1","2"],"cM":["1","2"],"k9":["1","2"],"b4":["1","2"]},"c4":{"dB":["1"],"b_":["1"],"bB":["1"],"Q":["1"],"j":["1"],"b_.E":"1"},"cZ":{"V":["1"]},"ei":{"j":["1"]},"em":{"w":["1"],"k":["1"],"Q":["1"],"j":["1"]},"ep":{"cM":["1","2"],"b4":["1","2"]},"cM":{"b4":["1","2"]},"en":{"B":["1"],"oa":["1"],"Q":["1"],"j":["1"],"B.E":"1","j.E":"1"},"f1":{"V":["1"]},"eC":{"b_":["1"],"bB":["1"],"Q":["1"],"j":["1"]},"dB":{"b_":["1"],"bB":["1"],"Q":["1"],"j":["1"]},"fc":{"dB":["1"],"b_":["1"],"iH":["1"],"bB":["1"],"Q":["1"],"j":["1"],"b_.E":"1"},"fJ":{"cE":["n","k<i>"]},"iE":{"cF":["k<i>","n"]},"fK":{"cF":["k<i>","n"]},"fM":{"cE":["k<i>","n"]},"fN":{"cF":["k<i>","n"]},"h1":{"cE":["n","k<i>"]},"i6":{"cE":["n","k<i>"]},"i7":{"cF":["k<i>","n"]},"p":{"ac":[],"ag":["ac"]},"i":{"ac":[],"ag":["ac"]},"k":{"Q":["1"],"j":["1"]},"ac":{"ag":["ac"]},"cS":{"df":[]},"bB":{"Q":["1"],"j":["1"]},"n":{"ag":["n"],"dl":[]},"dN":{"a4":[]},"cn":{"a4":[]},"hr":{"a4":[]},"bM":{"a4":[]},"dp":{"a4":[]},"he":{"a4":[]},"i3":{"a4":[]},"eQ":{"a4":[]},"ck":{"a4":[]},"fW":{"a4":[]},"hw":{"a4":[]},"eG":{"a4":[]},"fY":{"a4":[]},"it":{"bW":[]},"e6":{"bW":[]},"iD":{"ci":[]},"hH":{"j":["i"],"j.E":"i"},"hG":{"V":["i"]},"a5":{"rc":[]},"fd":{"i4":[]},"bu":{"i4":[]},"ij":{"i4":[]},"bb":{"t":[]},"x":{"r":[],"aW":[]},"fE":{"r":[],"aW":[]},"fH":{"r":[],"aW":[]},"cC":{"r":[],"aW":[]},"bN":{"aW":[]},"dW":{"mU":["ac"]},"r":{"aW":[]},"h6":{"r":[],"aW":[]},"b5":{"aW":[]},"hK":{"r":[],"aW":[]},"bD":{"t":[]},"dw":{"aW":[]},"eV":{"mU":["ac"]},"eX":{"eH":["1"]},"ip":{"eX":["1"],"eH":["1"]},"eY":{"eI":["1"]},"iy":{"qX":[]},"ai":{"j":["k<1>"],"j.E":"k<1>"},"eZ":{"V":["k<1>"]},"ha":{"bs":[]},"ch":{"T":[]},"eD":{"T":[]},"ap":{"T":[]},"bY":{"T":[]},"cp":{"T":[]},"hY":{"T":[]},"hp":{"T":[]},"hL":{"T":[]},"b0":{"T":[]},"cG":{"b0":[],"T":[]},"hm":{"b0":[],"T":[]},"fL":{"b0":[],"T":[]},"h9":{"b0":[],"T":[]},"fS":{"b0":[],"T":[]},"dm":{"b0":[],"T":[]},"dn":{"b0":[],"T":[]},"ex":{"dm":[],"b0":[],"T":[]},"hD":{"dn":[],"b0":[],"T":[]},"ds":{"T":[]},"hq":{"b0":[],"T":[]},"hv":{"ap":[],"T":[]},"hu":{"ap":[],"T":[]},"aj":{"ap":[],"T":[]},"ht":{"aj":[],"ap":[],"T":[]},"bt":{"aj":[],"ap":[],"T":[]},"hj":{"bt":[],"aj":[],"ap":[],"T":[]},"hA":{"aj":[],"ap":[],"T":[]},"h0":{"aj":[],"ap":[],"T":[]},"h3":{"aj":[],"ap":[],"T":[]},"fF":{"bt":[],"aj":[],"ap":[],"T":[]},"hZ":{"bt":[],"aj":[],"ap":[],"T":[]},"h8":{"bt":[],"aj":[],"ap":[],"T":[]},"h7":{"aj":[],"ap":[],"T":[]},"hF":{"bt":[],"aj":[],"ap":[],"T":[]},"fR":{"bt":[],"aj":[],"ap":[],"T":[]},"hE":{"bt":[],"aj":[],"ap":[],"T":[]},"i9":{"bt":[],"aj":[],"ap":[],"T":[]},"ia":{"ov":[]},"aH":{"ag":["K"]},"dV":{"ak":[]},"W":{"ak":[]},"fZ":{"ak":[]},"c1":{"ak":[]},"fV":{"ak":[]},"ad":{"aY":["ak"],"w":["ak"],"k":["ak"],"Q":["ak"],"j":["ak"],"w.E":"ak","aY.E":"ak"},"h5":{"w":["W"],"k":["W"],"Q":["W"],"j":["W"],"w.E":"W","j.E":"W"},"aZ":{"bW":[]},"bz":{"a7":[]},"fO":{"a7":[]},"dQ":{"a7":[]},"hc":{"a7":[]},"fD":{"a7":[]},"d9":{"a7":[]},"hX":{"a7":[]},"ef":{"a7":[]},"db":{"a7":[]},"ea":{"a7":[]},"eb":{"a7":[]},"cH":{"a7":[]},"ed":{"a7":[]},"da":{"a7":[]},"ee":{"a7":[]},"hd":{"a7":[]},"hb":{"a7":[]},"fB":{"a7":[]},"ec":{"a7":[]},"fC":{"a7":[]},"fz":{"a7":[]},"fA":{"a7":[]},"h_":{"b_":["n"],"bB":["n"],"Q":["n"],"j":["n"],"b_.E":"n"},"ii":{"b_":["n"],"bB":["n"],"Q":["n"],"j":["n"]},"aY":{"w":["1"],"k":["1"],"Q":["1"],"j":["1"]},"eB":{"ov":[]},"be":{"b7":[]},"c0":{"b7":[]},"cj":{"c0":[],"b7":[]},"L":{"c0":[],"b7":[]},"m":{"be":[],"b7":[]},"G":{"be":[],"b7":[]},"cT":{"be":[],"b7":[]},"d5":{"be":[],"b7":[]},"dU":{"b7":[]},"e9":{"V":["b7"]},"fy":{"aY":["W?"],"w":["W?"],"k":["W?"],"Q":["W?"],"j":["W?"],"w.E":"W?","aY.E":"W?"},"fG":{"aT":[]},"hN":{"aT":[]},"hM":{"aT":[]},"h4":{"aT":[]},"eO":{"aT":[]},"eR":{"aT":[]},"fx":{"dJ":[]},"fP":{"dJ":[]},"dj":{"aw":[],"R":[],"H":[]},"fX":{"c3":[],"R":[],"H":[]},"cB":{"c3":[],"R":[],"H":[]},"ev":{"cB":[],"c3":[],"R":[],"H":[]},"dk":{"R":[],"H":[]},"e8":{"dk":[],"R":[],"H":[]},"cA":{"R":[],"H":[]},"aw":{"R":[],"H":[]},"eM":{"co":[]},"eN":{"R":[],"H":[]},"dL":{"R":[],"H":[]},"d4":{"R":[],"H":[]},"dX":{"R":[],"H":[]},"e_":{"R":[],"H":[]},"ew":{"R":[],"H":[]},"ey":{"R":[],"H":[]},"eP":{"R":[],"H":[]},"dM":{"R":[],"H":[]},"dq":{"R":[],"H":[]},"ez":{"R":[],"H":[]},"eJ":{"R":[],"H":[]},"cg":{"R":[],"H":[]},"dr":{"R":[],"H":[]},"bZ":{"cg":[],"R":[],"H":[]},"eL":{"R":[],"H":[]},"eq":{"bZ":[],"cg":[],"R":[],"H":[]},"hg":{"H":[]},"dY":{"H":[]},"d8":{"H":[]},"R":{"H":[]},"c3":{"R":[],"H":[]},"eS":{"R":[],"H":[]},"dT":{"R":[],"H":[]},"fQ":{"dK":[]},"ce":{"b8":[]},"cf":{"b8":[]},"cd":{"b8":[]},"hl":{"b8":[]},"er":{"b8":[]},"hz":{"bW":[]},"hC":{"cI":[]},"i5":{"cI":[]},"ib":{"cI":[]},"mG":{"bS":[],"br":[],"ag":["br"]},"b3":{"bC":[],"ag":["bC"]},"at":{"mG":[],"bS":[],"br":[],"ag":["br"]},"bC":{"ag":["bC"]},"hS":{"bC":[],"ag":["bC"]},"br":{"ag":["br"]},"hT":{"br":[],"ag":["br"]},"eF":{"br":[],"ag":["br"]},"bS":{"br":[],"ag":["br"]},"e7":{"hJ":[]},"cV":{"k":["i"],"Q":["i"],"j":["i"]}}'))
A.rS(v.typeUniverse,JSON.parse('{"dv":1,"fg":2,"di":1,"hV":2,"ei":1,"em":1,"ep":2,"eC":1,"f0":1,"f4":1,"fh":1,"fi":1}'))
var u={D:" must not be greater than the number of characters in the file, ",U:"Cannot extract a file path from a URI with a fragment component",z:"Cannot extract a file path from a URI with a query component",Q:"Cannot extract a non-Windows file path from a file URI with an authority",w:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",v:"No color list in VMobject with attribute name ",l:"\\hat{g}(f) = \\int^{+\\infty}_{-\\infty} g(t) e^{-2 \\pi ift} dt",A:"expected-attribute-value-but-got-right-bracket",g:"expected-closing-tag-but-got-right-bracket",f:"expected-doctype-name-but-got-right-bracket",S:"expected-space-or-right-bracket-in-doctype",d:"unexpected-bang-after-double-dash-in-comment",H:"unexpected-character-after-attribute-value",B:"unexpected-character-after-soldius-in-tag",V:"unexpected-character-in-unquoted-attribute-value",K:"unexpected-dash-after-double-dash-in-comment",q:"unexpected-frameset-in-frameset-innerhtml",G:"unexpected-html-element-in-foreign-content",M:"unexpected-start-tag-implies-table-voodoo",r:"unexpected-table-element-end-tag-in-select-in-table",a:"unexpected-table-element-start-tag-in-select-in-table"}
var t=(function rtii(){var s=A.aQ
return{pc:s("@<i>"),aY:s("cA"),A:s("bx"),u:s("dO"),fy:s("aM"),jQ:s("cC"),p1:s("G"),E:s("a9"),G:s("P"),cw:s("d5"),bP:s("ag<@>"),ck:s("as"),B:s("u<n,n>"),R:s("u<n,@>"),i:s("dU"),dA:s("dV"),gt:s("Q<@>"),h:s("W"),ia:s("L"),fz:s("a4"),fq:s("t"),d3:s("b9<b8>"),gG:s("b9<cd>"),m4:s("b9<ce>"),mc:s("b9<cf>"),cY:s("by"),e:s("b8"),mA:s("bW"),lS:s("mG"),gY:s("bX"),g7:s("bn<@>"),ha:s("ca<dh,n>"),ek:s("d8"),gx:s("bY"),aB:s("db"),id:s("cb<p>"),Y:s("ai<H>"),c2:s("ai<K>"),pn:s("ai<R>"),b5:s("ai<f>"),lx:s("ai<p>"),lb:s("ai<i>"),cj:s("j<W>"),hl:s("j<ak>"),bq:s("j<n>"),e7:s("j<@>"),lq:s("y<aT>"),nC:s("y<cA>"),fp:s("y<bx>"),iX:s("y<aM>"),O:s("y<P>"),hR:s("y<as>"),il:s("y<W>"),fO:s("y<b9<b8>>"),oQ:s("y<ap>"),b1:s("y<aw>"),km:s("y<k<aw>>"),Z:s("y<k<H>>"),bo:s("y<k<K>>"),Q:s("y<k<f>>"),b:s("y<k<p>>"),fC:s("y<k<i>>"),bV:s("y<b4<n,@>>"),kU:s("y<dg>"),r:s("y<H>"),d:s("y<ak>"),a8:s("y<o<n,n>>"),eH:s("y<o<@,@>>"),bD:s("y<aZ>"),gg:s("y<a7>"),b7:s("y<ch>"),iM:s("y<eD>"),nn:s("y<bZ>"),dw:s("y<eI<@>>"),s:s("y<n>"),ks:s("y<be>"),kG:s("y<eK>"),bB:s("y<cU<aT,p,p>>"),ez:s("y<du<f,f,f,f>>"),bs:s("y<cV>"),hJ:s("y<R>"),l:s("y<f>"),pg:s("y<aE>"),dg:s("y<bg>"),n:s("y<p>"),m:s("y<@>"),t:s("y<i>"),lB:s("y<W?>"),hg:s("y<ak?>"),D:s("y<n?>"),g2:s("y<ac>"),po:s("y<H(H,p)>"),T:s("ej"),dY:s("bP"),dX:s("dd<@>"),lY:s("uG"),am:s("uH"),F:s("aw"),oP:s("k9<K,n>"),cG:s("k<aT>"),ev:s("k<P>"),jB:s("k<W>"),oR:s("k<b9<b8>>"),g4:s("k<aw>"),ls:s("k<k<f>>"),jj:s("k<k<p>>"),a:s("k<H>"),I:s("k<n>"),oX:s("k<be>"),fr:s("k<T>"),dq:s("k<cU<aT,p,p>>"),y:s("k<f>"),H:s("k<p>"),gs:s("k<@>"),L:s("k<i>"),eU:s("k<aE?>"),le:s("k<H(H,p)>"),mH:s("aj"),lO:s("bq<K,k<aE>>"),fg:s("b4<n,P>"),fY:s("b4<by,k<b9<b8>>>"),gQ:s("J<n,n>"),iZ:s("J<n,@>"),aQ:s("J<f,p>"),j:s("H"),k5:s("H(H,p)"),gn:s("cd"),gD:s("bb"),m6:s("er"),oJ:s("ce"),nB:s("cf"),hD:s("cP"),J:s("ak"),P:s("aq"),f7:s("dj"),K:s("K"),w:s("o<n,n>"),nz:s("o<@,@>"),h2:s("o<n,n?>"),iA:s("o<n?,n?>"),jK:s("m"),oc:s("dl"),n8:s("cR<ac>"),f_:s("oa<n>"),mx:s("mU<ac>"),lu:s("cS"),dT:s("ch"),b9:s("ds"),ns:s("bB<H>"),hq:s("bC"),hs:s("br"),ol:s("bS"),lH:s("cT"),k:s("ci"),ny:s("cj"),N:s("n"),g:s("be"),gL:s("n(n)"),mN:s("aD<f>"),fn:s("c0"),oI:s("c1"),U:s("bs"),bF:s("T"),iu:s("C<f,f>"),d7:s("C<i,p>"),o:s("C<i,i>"),dI:s("C<k<f>,k<f>>"),kk:s("C<i,k<p>>"),oM:s("cU<aT,p,p>"),cn:s("du<f,f,f,f>"),f5:s("oo"),do:s("cn"),hb:s("cV"),cx:s("bT"),oL:s("eR<H>"),jJ:s("i4"),bX:s("R"),V:s("f"),ew:s("f(f)"),v:s("ar<W>"),na:s("ar<n>"),pl:s("cX<W>"),eX:s("ip<bb>"),av:s("au<aq>"),j_:s("au<@>"),hy:s("au<i>"),iS:s("au<ac>"),C:s("aE"),nR:s("bg"),fD:s("f6<ac>"),k4:s("A"),c:s("A()"),cT:s("A(W)"),iW:s("A(K)"),gS:s("A(n)"),aP:s("A(aE)"),gw:s("A(i)"),W:s("p"),iJ:s("p(p,C<i,i>)"),eL:s("p(f)"),f3:s("p(p)"),z:s("@"),mY:s("@()"),mq:s("@(K)"),ng:s("@(K,ci)"),f6:s("@(n)"),S:s("i"),eK:s("0&*"),_:s("K*"),mV:s("W?"),gK:s("bn<aq>?"),x:s("k<P>?"),gv:s("k<aw>?"),jq:s("k<eK>?"),fA:s("k<f>?"),lX:s("k<f>(k<f>,k<f>,p)?"),f8:s("k<i>?"),e1:s("ak?"),iD:s("K?"),oA:s("bB<n>?"),g9:s("b0?"),jv:s("n?"),nU:s("b7?"),f:s("cY<@,@>?"),dd:s("aE?"),nF:s("iw?"),pi:s("A(n)?"),X:s("@(t)?"),dU:s("i(W,W)?"),jE:s("~()?"),p:s("ac"),q:s("~"),M:s("~()"),m3:s("~(dg)"),hv:s("~(ac)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a9=A.cC.prototype
B.q=A.dR.prototype
B.b1=J.eh.prototype
B.a=J.y.prototype
B.d=J.dc.prototype
B.h=J.cc.prototype
B.b=J.bO.prototype
B.b2=J.bP.prototype
B.b3=J.ba.prototype
B.t=A.et.prototype
B.cN=A.cP.prototype
B.aB=J.hB.prototype
B.a3=J.bT.prototype
B.e7=A.dw.prototype
B.aD=new A.fK(!1,127)
B.z=new A.f(-1,0,0)
B.N=new A.aM(null,null,null,B.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
B.c=new A.P(1,1,1,1)
B.y=new A.f(1,-1,0)
B.B=new A.aM(B.c,!1,null,B.y,null,!1,null,null,null,null,null,null,null,null,0.5,0.1,null,null,null,2)
B.R=new A.P(0.73333,0.73333,0.73333,1)
B.p=new A.f(0,-1,0)
B.b4=A.a(s([0]),t.n)
B.O=new A.aM(B.R,!0,!1,B.p,1,!0,0.1,1,null,B.b4,!1,null,2,0,0.75,0.25,0.25,0.25,null,4)
B.o=new A.aM(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
B.a4=new A.aM(null,null,null,B.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
B.C=new A.cb(A.pv(),t.id)
B.a5=new A.cb(A.pv(),A.aQ("cb<i>"))
B.P=new A.cb(A.ui(),t.id)
B.aQ=new A.fJ()
B.e9=new A.fN()
B.aR=new A.fM()
B.a6=new A.e1(A.aQ("e1<0&>"))
B.a7=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.aS=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.aX=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.aT=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.aU=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.aW=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.aV=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.a8=function(hooks) { return hooks; }

B.aY=new A.hw()
B.n=new A.kK()
B.u=new A.i6()
B.l=new A.iz()
B.aZ=new A.iD()
B.k=new A.P(0,0,0,0)
B.aa=new A.P(0,0,0,1)
B.b_=new A.P(1,1,0,1)
B.ab=new A.P(0.98824,0.38431,0.33333,1)
B.Q=new A.P(0.36078,0.81569,0.70196,1)
B.D=new A.by("mouseMovedEvent")
B.v=new A.by("mousePressedEvent")
B.w=new A.by("mouseReleasedEvent")
B.x=new A.by("mouseDraggedEvent")
B.S=new A.by("keyPressedEvent")
B.T=new A.by("keyReleasedEvent")
B.b6=A.a(s([2]),t.n)
B.E=A.a(s([0,0,32776,33792,1,10240,0,0]),t.t)
B.ar=new A.o("http://www.w3.org/1999/xhtml","applet",t.w)
B.at=new A.o("http://www.w3.org/1999/xhtml","caption",t.w)
B.a2=new A.o("http://www.w3.org/1999/xhtml","html",t.w)
B.aw=new A.o("http://www.w3.org/1999/xhtml","marquee",t.w)
B.aA=new A.o("http://www.w3.org/1999/xhtml","object",t.w)
B.a0=new A.o("http://www.w3.org/1999/xhtml","table",t.w)
B.av=new A.o("http://www.w3.org/1999/xhtml","td",t.w)
B.ap=new A.o("http://www.w3.org/1999/xhtml","th",t.w)
B.ax=new A.o("http://www.w3.org/1998/Math/MathML","mi",t.w)
B.as=new A.o("http://www.w3.org/1998/Math/MathML","mo",t.w)
B.az=new A.o("http://www.w3.org/1998/Math/MathML","mn",t.w)
B.au=new A.o("http://www.w3.org/1998/Math/MathML","ms",t.w)
B.aq=new A.o("http://www.w3.org/1998/Math/MathML","mtext",t.w)
B.du=new A.o("http://www.w3.org/1998/Math/MathML","annotation-xml",t.w)
B.a1=new A.o("http://www.w3.org/2000/svg","foreignObject",t.w)
B.ay=new A.o("http://www.w3.org/2000/svg","desc",t.w)
B.ao=new A.o("http://www.w3.org/2000/svg","title",t.w)
B.U=A.a(s([B.ar,B.at,B.a2,B.aw,B.aA,B.a0,B.av,B.ap,B.ax,B.as,B.az,B.au,B.aq,B.du,B.a1,B.ay,B.ao]),t.m)
B.dH=new A.o("http://www.w3.org/1999/xhtml","button",t.nz)
B.b7=A.a(s([B.dH]),t.eH)
B.b8=A.a(s(["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","menu","meta","nobr","ol","p","pre","ruby","s","small","span","strike","strong","sub","sup","table","tt","u","ul","var"]),t.s)
B.F=A.a(s(["h1","h2","h3","h4","h5","h6"]),t.s)
B.V=A.a(s(["dd","dt","li","option","optgroup","p","rp","rt"]),t.s)
B.G=A.a(s([0,0,65490,45055,65535,34815,65534,18431]),t.t)
B.bb=A.a(s(["+//silmaril//dtd html pro v0r11 19970101//","-//advasoft ltd//dtd html 3.0 aswedit + extensions//","-//as//dtd html 3.0 aswedit + extensions//","-//ietf//dtd html 2.0 level 1//","-//ietf//dtd html 2.0 level 2//","-//ietf//dtd html 2.0 strict level 1//","-//ietf//dtd html 2.0 strict level 2//","-//ietf//dtd html 2.0 strict//","-//ietf//dtd html 2.0//","-//ietf//dtd html 2.1e//","-//ietf//dtd html 3.0//","-//ietf//dtd html 3.2 final//","-//ietf//dtd html 3.2//","-//ietf//dtd html 3//","-//ietf//dtd html level 0//","-//ietf//dtd html level 1//","-//ietf//dtd html level 2//","-//ietf//dtd html level 3//","-//ietf//dtd html strict level 0//","-//ietf//dtd html strict level 1//","-//ietf//dtd html strict level 2//","-//ietf//dtd html strict level 3//","-//ietf//dtd html strict//","-//ietf//dtd html//","-//metrius//dtd metrius presentational//","-//microsoft//dtd internet explorer 2.0 html strict//","-//microsoft//dtd internet explorer 2.0 html//","-//microsoft//dtd internet explorer 2.0 tables//","-//microsoft//dtd internet explorer 3.0 html strict//","-//microsoft//dtd internet explorer 3.0 html//","-//microsoft//dtd internet explorer 3.0 tables//","-//netscape comm. corp.//dtd html//","-//netscape comm. corp.//dtd strict html//","-//o'reilly and associates//dtd html 2.0//","-//o'reilly and associates//dtd html extended 1.0//","-//o'reilly and associates//dtd html extended relaxed 1.0//","-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//","-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//","-//spyglass//dtd html 2.0 extended//","-//sq//dtd html 2.0 hotmetal + extensions//","-//sun microsystems corp.//dtd hotjava html//","-//sun microsystems corp.//dtd hotjava strict html//","-//w3c//dtd html 3 1995-03-24//","-//w3c//dtd html 3.2 draft//","-//w3c//dtd html 3.2 final//","-//w3c//dtd html 3.2//","-//w3c//dtd html 3.2s draft//","-//w3c//dtd html 4.0 frameset//","-//w3c//dtd html 4.0 transitional//","-//w3c//dtd html experimental 19960712//","-//w3c//dtd html experimental 970421//","-//w3c//dtd w3 html//","-//w3o//dtd w3 html 3.0//","-//webtechs//dtd mozilla html 2.0//","-//webtechs//dtd mozilla html//"]),t.s)
B.H=A.a(s([0,0,26624,1023,65534,2047,65534,2047]),t.t)
B.bc=A.a(s(["uU","bB","lL","iI","cC"]),t.s)
B.bd=A.a(s([11,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111]),t.t)
B.W=A.a(s(["table","tbody","tfoot","thead","tr"]),t.s)
B.cO=new A.o("http://www.w3.org/1999/xhtml","ol",t.nz)
B.dh=new A.o("http://www.w3.org/1999/xhtml","ul",t.nz)
B.be=A.a(s([B.cO,B.dh]),t.eH)
B.i=A.a(s(["unit","value"]),t.s)
B.bI=new A.u(2,{unit:600,value:"em"},B.i,t.R)
B.bZ=new A.u(2,{unit:601,value:"ex"},B.i,t.R)
B.c2=new A.u(2,{unit:602,value:"px"},B.i,t.R)
B.bU=new A.u(2,{unit:603,value:"cm"},B.i,t.R)
B.bX=new A.u(2,{unit:604,value:"mm"},B.i,t.R)
B.bS=new A.u(2,{unit:605,value:"in"},B.i,t.R)
B.bH=new A.u(2,{unit:606,value:"pt"},B.i,t.R)
B.c5=new A.u(2,{unit:607,value:"pc"},B.i,t.R)
B.bR=new A.u(2,{unit:608,value:"deg"},B.i,t.R)
B.c1=new A.u(2,{unit:609,value:"rad"},B.i,t.R)
B.bL=new A.u(2,{unit:610,value:"grad"},B.i,t.R)
B.c_=new A.u(2,{unit:611,value:"turn"},B.i,t.R)
B.bM=new A.u(2,{unit:612,value:"ms"},B.i,t.R)
B.bY=new A.u(2,{unit:613,value:"s"},B.i,t.R)
B.bO=new A.u(2,{unit:614,value:"hz"},B.i,t.R)
B.c3=new A.u(2,{unit:615,value:"khz"},B.i,t.R)
B.bQ=new A.u(2,{unit:617,value:"fr"},B.i,t.R)
B.bK=new A.u(2,{unit:618,value:"dpi"},B.i,t.R)
B.bN=new A.u(2,{unit:619,value:"dpcm"},B.i,t.R)
B.bT=new A.u(2,{unit:620,value:"dppx"},B.i,t.R)
B.bJ=new A.u(2,{unit:621,value:"ch"},B.i,t.R)
B.bW=new A.u(2,{unit:622,value:"rem"},B.i,t.R)
B.c0=new A.u(2,{unit:623,value:"vw"},B.i,t.R)
B.bV=new A.u(2,{unit:624,value:"vh"},B.i,t.R)
B.c4=new A.u(2,{unit:625,value:"vmin"},B.i,t.R)
B.bP=new A.u(2,{unit:626,value:"vmax"},B.i,t.R)
B.ac=A.a(s([B.bI,B.bZ,B.c2,B.bU,B.bX,B.bS,B.bH,B.c5,B.bR,B.c1,B.bL,B.c_,B.bM,B.bY,B.bO,B.c3,B.bQ,B.bK,B.bN,B.bT,B.bJ,B.bW,B.c0,B.bV,B.c4,B.bP]),t.bV)
B.ad=A.a(s(["-//w3c//dtd html 4.01 frameset//","-//w3c//dtd html 4.01 transitional//"]),t.s)
B.bh=A.a(s(["address","div","p"]),t.s)
B.ae=A.a(s([B.ax,B.as,B.az,B.au,B.aq]),t.a8)
B.f=A.a(s(["type","value"]),t.s)
B.ct=new A.u(2,{type:670,value:"top-left-corner"},B.f,t.R)
B.cn=new A.u(2,{type:671,value:"top-left"},B.f,t.R)
B.cB=new A.u(2,{type:672,value:"top-center"},B.f,t.R)
B.cC=new A.u(2,{type:673,value:"top-right"},B.f,t.R)
B.c9=new A.u(2,{type:674,value:"top-right-corner"},B.f,t.R)
B.cg=new A.u(2,{type:675,value:"bottom-left-corner"},B.f,t.R)
B.cr=new A.u(2,{type:676,value:"bottom-left"},B.f,t.R)
B.cA=new A.u(2,{type:677,value:"bottom-center"},B.f,t.R)
B.cb=new A.u(2,{type:678,value:"bottom-right"},B.f,t.R)
B.ci=new A.u(2,{type:679,value:"bottom-right-corner"},B.f,t.R)
B.cz=new A.u(2,{type:680,value:"left-top"},B.f,t.R)
B.ck=new A.u(2,{type:681,value:"left-middle"},B.f,t.R)
B.ch=new A.u(2,{type:682,value:"right-bottom"},B.f,t.R)
B.cd=new A.u(2,{type:683,value:"right-top"},B.f,t.R)
B.cv=new A.u(2,{type:684,value:"right-middle"},B.f,t.R)
B.cw=new A.u(2,{type:685,value:"right-bottom"},B.f,t.R)
B.bi=A.a(s([B.ct,B.cn,B.cB,B.cC,B.c9,B.cg,B.cr,B.cA,B.cb,B.ci,B.cz,B.ck,B.ch,B.cd,B.cv,B.cw]),t.bV)
B.ag=A.a(s(["0","1","2","3","4","5","6","7","8","9"]),t.s)
B.bj=A.a(s([]),t.r)
B.X=A.a(s([]),t.eH)
B.r=A.a(s([]),t.s)
B.bk=A.a(s([]),t.n)
B.bn=A.a(s([0,0,32722,12287,65534,34815,65534,18431]),t.t)
B.bo=A.a(s(["oO","cC","tT","yY","pP","eE"]),t.s)
B.bp=A.a(s([B.D,B.v,B.w,B.x,B.S,B.T]),A.aQ("y<by>"))
B.bq=A.a(s(["-//w3o//dtd w3 html strict 3.0//en//","-/w3c/dtd html 4.0 transitional/en","html"]),t.s)
B.cH=new A.u(2,{type:641,value:"import"},B.f,t.R)
B.cq=new A.u(2,{type:642,value:"media"},B.f,t.R)
B.co=new A.u(2,{type:643,value:"page"},B.f,t.R)
B.cF=new A.u(2,{type:644,value:"charset"},B.f,t.R)
B.cu=new A.u(2,{type:645,value:"stylet"},B.f,t.R)
B.cc=new A.u(2,{type:646,value:"keyframes"},B.f,t.R)
B.cx=new A.u(2,{type:647,value:"-webkit-keyframes"},B.f,t.R)
B.cG=new A.u(2,{type:648,value:"-moz-keyframes"},B.f,t.R)
B.cs=new A.u(2,{type:649,value:"-ms-keyframes"},B.f,t.R)
B.cj=new A.u(2,{type:650,value:"-o-keyframes"},B.f,t.R)
B.cJ=new A.u(2,{type:651,value:"font-face"},B.f,t.R)
B.cm=new A.u(2,{type:652,value:"namespace"},B.f,t.R)
B.cp=new A.u(2,{type:653,value:"host"},B.f,t.R)
B.ca=new A.u(2,{type:654,value:"mixin"},B.f,t.R)
B.cy=new A.u(2,{type:655,value:"include"},B.f,t.R)
B.cE=new A.u(2,{type:656,value:"content"},B.f,t.R)
B.cf=new A.u(2,{type:657,value:"extend"},B.f,t.R)
B.cD=new A.u(2,{type:658,value:"-moz-document"},B.f,t.R)
B.ce=new A.u(2,{type:659,value:"supports"},B.f,t.R)
B.cl=new A.u(2,{type:660,value:"viewport"},B.f,t.R)
B.cI=new A.u(2,{type:661,value:"-ms-viewport"},B.f,t.R)
B.br=A.a(s([B.cH,B.cq,B.co,B.cF,B.cu,B.cc,B.cx,B.cG,B.cs,B.cj,B.cJ,B.cm,B.cp,B.ca,B.cy,B.cE,B.cf,B.cD,B.ce,B.cl,B.cI]),t.bV)
B.bs=A.a(s(["yY","sS","tT","eE","mM"]),t.s)
B.d4=new A.o("http://www.w3.org/1998/Math/MathML","annotaion-xml",t.w)
B.bv=A.a(s([B.d4,B.a1,B.ay,B.ao]),t.a8)
B.I=A.a(s([0,0,24576,1023,65534,34815,65534,18431]),t.t)
B.bw=A.a(s(["-//w3c//dtd xhtml 1.0 frameset//","-//w3c//dtd xhtml 1.0 transitional//"]),t.s)
B.bx=A.a(s(["pre","listing","textarea"]),t.s)
B.ai=A.a(s([0,0,32754,11263,65534,34815,65534,18431]),t.t)
B.aj=A.a(s([0,0,65490,12287,65535,34815,65534,18431]),t.t)
B.by=A.a(s(["C","D","A","T","A","["]),t.s)
B.cS=new A.o("http://www.w3.org/1999/xhtml","optgroup",t.w)
B.dY=new A.o("http://www.w3.org/1999/xhtml","option",t.w)
B.bz=A.a(s([B.cS,B.dY]),t.m)
B.bA=A.a(s(["tbody","tfoot","thead","html"]),t.s)
B.bD=A.a(s([B.a2,B.a0]),t.m)
B.dM=new A.o("http://www.w3.org/1999/xhtml","address",t.w)
B.cU=new A.o("http://www.w3.org/1999/xhtml","area",t.w)
B.e0=new A.o("http://www.w3.org/1999/xhtml","article",t.w)
B.dk=new A.o("http://www.w3.org/1999/xhtml","aside",t.w)
B.ds=new A.o("http://www.w3.org/1999/xhtml","base",t.w)
B.da=new A.o("http://www.w3.org/1999/xhtml","basefont",t.w)
B.dc=new A.o("http://www.w3.org/1999/xhtml","bgsound",t.w)
B.dE=new A.o("http://www.w3.org/1999/xhtml","blockquote",t.w)
B.d9=new A.o("http://www.w3.org/1999/xhtml","body",t.w)
B.dj=new A.o("http://www.w3.org/1999/xhtml","br",t.w)
B.dI=new A.o("http://www.w3.org/1999/xhtml","button",t.w)
B.dK=new A.o("http://www.w3.org/1999/xhtml","center",t.w)
B.cX=new A.o("http://www.w3.org/1999/xhtml","col",t.w)
B.dP=new A.o("http://www.w3.org/1999/xhtml","colgroup",t.w)
B.dm=new A.o("http://www.w3.org/1999/xhtml","command",t.w)
B.dU=new A.o("http://www.w3.org/1999/xhtml","dd",t.w)
B.dv=new A.o("http://www.w3.org/1999/xhtml","details",t.w)
B.d5=new A.o("http://www.w3.org/1999/xhtml","dir",t.w)
B.d3=new A.o("http://www.w3.org/1999/xhtml","div",t.w)
B.dS=new A.o("http://www.w3.org/1999/xhtml","dl",t.w)
B.dn=new A.o("http://www.w3.org/1999/xhtml","dt",t.w)
B.cW=new A.o("http://www.w3.org/1999/xhtml","embed",t.w)
B.cR=new A.o("http://www.w3.org/1999/xhtml","fieldset",t.w)
B.dC=new A.o("http://www.w3.org/1999/xhtml","figure",t.w)
B.dT=new A.o("http://www.w3.org/1999/xhtml","footer",t.w)
B.d7=new A.o("http://www.w3.org/1999/xhtml","form",t.w)
B.dp=new A.o("http://www.w3.org/1999/xhtml","frame",t.w)
B.cT=new A.o("http://www.w3.org/1999/xhtml","frameset",t.w)
B.d_=new A.o("http://www.w3.org/1999/xhtml","h1",t.w)
B.e_=new A.o("http://www.w3.org/1999/xhtml","h2",t.w)
B.cV=new A.o("http://www.w3.org/1999/xhtml","h3",t.w)
B.dw=new A.o("http://www.w3.org/1999/xhtml","h4",t.w)
B.dX=new A.o("http://www.w3.org/1999/xhtml","h5",t.w)
B.dB=new A.o("http://www.w3.org/1999/xhtml","h6",t.w)
B.dd=new A.o("http://www.w3.org/1999/xhtml","head",t.w)
B.dZ=new A.o("http://www.w3.org/1999/xhtml","header",t.w)
B.dl=new A.o("http://www.w3.org/1999/xhtml","hr",t.w)
B.dN=new A.o("http://www.w3.org/1999/xhtml","iframe",t.w)
B.dD=new A.o("http://www.w3.org/1999/xhtml","image",t.w)
B.dq=new A.o("http://www.w3.org/1999/xhtml","img",t.w)
B.dy=new A.o("http://www.w3.org/1999/xhtml","input",t.w)
B.dL=new A.o("http://www.w3.org/1999/xhtml","isindex",t.w)
B.dg=new A.o("http://www.w3.org/1999/xhtml","li",t.w)
B.df=new A.o("http://www.w3.org/1999/xhtml","link",t.w)
B.dJ=new A.o("http://www.w3.org/1999/xhtml","listing",t.w)
B.d0=new A.o("http://www.w3.org/1999/xhtml","men",t.w)
B.dF=new A.o("http://www.w3.org/1999/xhtml","meta",t.w)
B.de=new A.o("http://www.w3.org/1999/xhtml","nav",t.w)
B.dV=new A.o("http://www.w3.org/1999/xhtml","noembed",t.w)
B.dt=new A.o("http://www.w3.org/1999/xhtml","noframes",t.w)
B.dr=new A.o("http://www.w3.org/1999/xhtml","noscript",t.w)
B.cP=new A.o("http://www.w3.org/1999/xhtml","ol",t.w)
B.dO=new A.o("http://www.w3.org/1999/xhtml","p",t.w)
B.cY=new A.o("http://www.w3.org/1999/xhtml","param",t.w)
B.dz=new A.o("http://www.w3.org/1999/xhtml","plaintext",t.w)
B.cQ=new A.o("http://www.w3.org/1999/xhtml","pre",t.w)
B.dx=new A.o("http://www.w3.org/1999/xhtml","script",t.w)
B.db=new A.o("http://www.w3.org/1999/xhtml","section",t.w)
B.d6=new A.o("http://www.w3.org/1999/xhtml","select",t.w)
B.d1=new A.o("http://www.w3.org/1999/xhtml","style",t.w)
B.dQ=new A.o("http://www.w3.org/1999/xhtml","tbody",t.w)
B.d2=new A.o("http://www.w3.org/1999/xhtml","textarea",t.w)
B.dG=new A.o("http://www.w3.org/1999/xhtml","tfoot",t.w)
B.d8=new A.o("http://www.w3.org/1999/xhtml","thead",t.w)
B.dA=new A.o("http://www.w3.org/1999/xhtml","title",t.w)
B.cZ=new A.o("http://www.w3.org/1999/xhtml","tr",t.w)
B.di=new A.o("http://www.w3.org/1999/xhtml","ul",t.w)
B.dW=new A.o("http://www.w3.org/1999/xhtml","wbr",t.w)
B.dR=new A.o("http://www.w3.org/1999/xhtml","xmp",t.w)
B.Y=A.a(s([B.dM,B.ar,B.cU,B.e0,B.dk,B.ds,B.da,B.dc,B.dE,B.d9,B.dj,B.dI,B.at,B.dK,B.cX,B.dP,B.dm,B.dU,B.dv,B.d5,B.d3,B.dS,B.dn,B.cW,B.cR,B.dC,B.dT,B.d7,B.dp,B.cT,B.d_,B.e_,B.cV,B.dw,B.dX,B.dB,B.dd,B.dZ,B.dl,B.a2,B.dN,B.dD,B.dq,B.dy,B.dL,B.dg,B.df,B.dJ,B.aw,B.d0,B.dF,B.de,B.dV,B.dt,B.dr,B.aA,B.cP,B.dO,B.cY,B.dz,B.cQ,B.dx,B.db,B.d6,B.d1,B.a0,B.dQ,B.av,B.d2,B.dG,B.ap,B.d8,B.dA,B.cZ,B.di,B.dW,B.dR,B.a1]),t.a8)
B.b5=A.a(s(["AElig","AElig;","AMP","AMP;","Aacute","Aacute;","Abreve;","Acirc","Acirc;","Acy;","Afr;","Agrave","Agrave;","Alpha;","Amacr;","And;","Aogon;","Aopf;","ApplyFunction;","Aring","Aring;","Ascr;","Assign;","Atilde","Atilde;","Auml","Auml;","Backslash;","Barv;","Barwed;","Bcy;","Because;","Bernoullis;","Beta;","Bfr;","Bopf;","Breve;","Bscr;","Bumpeq;","CHcy;","COPY","COPY;","Cacute;","Cap;","CapitalDifferentialD;","Cayleys;","Ccaron;","Ccedil","Ccedil;","Ccirc;","Cconint;","Cdot;","Cedilla;","CenterDot;","Cfr;","Chi;","CircleDot;","CircleMinus;","CirclePlus;","CircleTimes;","ClockwiseContourIntegral;","CloseCurlyDoubleQuote;","CloseCurlyQuote;","Colon;","Colone;","Congruent;","Conint;","ContourIntegral;","Copf;","Coproduct;","CounterClockwiseContourIntegral;","Cross;","Cscr;","Cup;","CupCap;","DD;","DDotrahd;","DJcy;","DScy;","DZcy;","Dagger;","Darr;","Dashv;","Dcaron;","Dcy;","Del;","Delta;","Dfr;","DiacriticalAcute;","DiacriticalDot;","DiacriticalDoubleAcute;","DiacriticalGrave;","DiacriticalTilde;","Diamond;","DifferentialD;","Dopf;","Dot;","DotDot;","DotEqual;","DoubleContourIntegral;","DoubleDot;","DoubleDownArrow;","DoubleLeftArrow;","DoubleLeftRightArrow;","DoubleLeftTee;","DoubleLongLeftArrow;","DoubleLongLeftRightArrow;","DoubleLongRightArrow;","DoubleRightArrow;","DoubleRightTee;","DoubleUpArrow;","DoubleUpDownArrow;","DoubleVerticalBar;","DownArrow;","DownArrowBar;","DownArrowUpArrow;","DownBreve;","DownLeftRightVector;","DownLeftTeeVector;","DownLeftVector;","DownLeftVectorBar;","DownRightTeeVector;","DownRightVector;","DownRightVectorBar;","DownTee;","DownTeeArrow;","Downarrow;","Dscr;","Dstrok;","ENG;","ETH","ETH;","Eacute","Eacute;","Ecaron;","Ecirc","Ecirc;","Ecy;","Edot;","Efr;","Egrave","Egrave;","Element;","Emacr;","EmptySmallSquare;","EmptyVerySmallSquare;","Eogon;","Eopf;","Epsilon;","Equal;","EqualTilde;","Equilibrium;","Escr;","Esim;","Eta;","Euml","Euml;","Exists;","ExponentialE;","Fcy;","Ffr;","FilledSmallSquare;","FilledVerySmallSquare;","Fopf;","ForAll;","Fouriertrf;","Fscr;","GJcy;","GT","GT;","Gamma;","Gammad;","Gbreve;","Gcedil;","Gcirc;","Gcy;","Gdot;","Gfr;","Gg;","Gopf;","GreaterEqual;","GreaterEqualLess;","GreaterFullEqual;","GreaterGreater;","GreaterLess;","GreaterSlantEqual;","GreaterTilde;","Gscr;","Gt;","HARDcy;","Hacek;","Hat;","Hcirc;","Hfr;","HilbertSpace;","Hopf;","HorizontalLine;","Hscr;","Hstrok;","HumpDownHump;","HumpEqual;","IEcy;","IJlig;","IOcy;","Iacute","Iacute;","Icirc","Icirc;","Icy;","Idot;","Ifr;","Igrave","Igrave;","Im;","Imacr;","ImaginaryI;","Implies;","Int;","Integral;","Intersection;","InvisibleComma;","InvisibleTimes;","Iogon;","Iopf;","Iota;","Iscr;","Itilde;","Iukcy;","Iuml","Iuml;","Jcirc;","Jcy;","Jfr;","Jopf;","Jscr;","Jsercy;","Jukcy;","KHcy;","KJcy;","Kappa;","Kcedil;","Kcy;","Kfr;","Kopf;","Kscr;","LJcy;","LT","LT;","Lacute;","Lambda;","Lang;","Laplacetrf;","Larr;","Lcaron;","Lcedil;","Lcy;","LeftAngleBracket;","LeftArrow;","LeftArrowBar;","LeftArrowRightArrow;","LeftCeiling;","LeftDoubleBracket;","LeftDownTeeVector;","LeftDownVector;","LeftDownVectorBar;","LeftFloor;","LeftRightArrow;","LeftRightVector;","LeftTee;","LeftTeeArrow;","LeftTeeVector;","LeftTriangle;","LeftTriangleBar;","LeftTriangleEqual;","LeftUpDownVector;","LeftUpTeeVector;","LeftUpVector;","LeftUpVectorBar;","LeftVector;","LeftVectorBar;","Leftarrow;","Leftrightarrow;","LessEqualGreater;","LessFullEqual;","LessGreater;","LessLess;","LessSlantEqual;","LessTilde;","Lfr;","Ll;","Lleftarrow;","Lmidot;","LongLeftArrow;","LongLeftRightArrow;","LongRightArrow;","Longleftarrow;","Longleftrightarrow;","Longrightarrow;","Lopf;","LowerLeftArrow;","LowerRightArrow;","Lscr;","Lsh;","Lstrok;","Lt;","Map;","Mcy;","MediumSpace;","Mellintrf;","Mfr;","MinusPlus;","Mopf;","Mscr;","Mu;","NJcy;","Nacute;","Ncaron;","Ncedil;","Ncy;","NegativeMediumSpace;","NegativeThickSpace;","NegativeThinSpace;","NegativeVeryThinSpace;","NestedGreaterGreater;","NestedLessLess;","NewLine;","Nfr;","NoBreak;","NonBreakingSpace;","Nopf;","Not;","NotCongruent;","NotCupCap;","NotDoubleVerticalBar;","NotElement;","NotEqual;","NotEqualTilde;","NotExists;","NotGreater;","NotGreaterEqual;","NotGreaterFullEqual;","NotGreaterGreater;","NotGreaterLess;","NotGreaterSlantEqual;","NotGreaterTilde;","NotHumpDownHump;","NotHumpEqual;","NotLeftTriangle;","NotLeftTriangleBar;","NotLeftTriangleEqual;","NotLess;","NotLessEqual;","NotLessGreater;","NotLessLess;","NotLessSlantEqual;","NotLessTilde;","NotNestedGreaterGreater;","NotNestedLessLess;","NotPrecedes;","NotPrecedesEqual;","NotPrecedesSlantEqual;","NotReverseElement;","NotRightTriangle;","NotRightTriangleBar;","NotRightTriangleEqual;","NotSquareSubset;","NotSquareSubsetEqual;","NotSquareSuperset;","NotSquareSupersetEqual;","NotSubset;","NotSubsetEqual;","NotSucceeds;","NotSucceedsEqual;","NotSucceedsSlantEqual;","NotSucceedsTilde;","NotSuperset;","NotSupersetEqual;","NotTilde;","NotTildeEqual;","NotTildeFullEqual;","NotTildeTilde;","NotVerticalBar;","Nscr;","Ntilde","Ntilde;","Nu;","OElig;","Oacute","Oacute;","Ocirc","Ocirc;","Ocy;","Odblac;","Ofr;","Ograve","Ograve;","Omacr;","Omega;","Omicron;","Oopf;","OpenCurlyDoubleQuote;","OpenCurlyQuote;","Or;","Oscr;","Oslash","Oslash;","Otilde","Otilde;","Otimes;","Ouml","Ouml;","OverBar;","OverBrace;","OverBracket;","OverParenthesis;","PartialD;","Pcy;","Pfr;","Phi;","Pi;","PlusMinus;","Poincareplane;","Popf;","Pr;","Precedes;","PrecedesEqual;","PrecedesSlantEqual;","PrecedesTilde;","Prime;","Product;","Proportion;","Proportional;","Pscr;","Psi;","QUOT","QUOT;","Qfr;","Qopf;","Qscr;","RBarr;","REG","REG;","Racute;","Rang;","Rarr;","Rarrtl;","Rcaron;","Rcedil;","Rcy;","Re;","ReverseElement;","ReverseEquilibrium;","ReverseUpEquilibrium;","Rfr;","Rho;","RightAngleBracket;","RightArrow;","RightArrowBar;","RightArrowLeftArrow;","RightCeiling;","RightDoubleBracket;","RightDownTeeVector;","RightDownVector;","RightDownVectorBar;","RightFloor;","RightTee;","RightTeeArrow;","RightTeeVector;","RightTriangle;","RightTriangleBar;","RightTriangleEqual;","RightUpDownVector;","RightUpTeeVector;","RightUpVector;","RightUpVectorBar;","RightVector;","RightVectorBar;","Rightarrow;","Ropf;","RoundImplies;","Rrightarrow;","Rscr;","Rsh;","RuleDelayed;","SHCHcy;","SHcy;","SOFTcy;","Sacute;","Sc;","Scaron;","Scedil;","Scirc;","Scy;","Sfr;","ShortDownArrow;","ShortLeftArrow;","ShortRightArrow;","ShortUpArrow;","Sigma;","SmallCircle;","Sopf;","Sqrt;","Square;","SquareIntersection;","SquareSubset;","SquareSubsetEqual;","SquareSuperset;","SquareSupersetEqual;","SquareUnion;","Sscr;","Star;","Sub;","Subset;","SubsetEqual;","Succeeds;","SucceedsEqual;","SucceedsSlantEqual;","SucceedsTilde;","SuchThat;","Sum;","Sup;","Superset;","SupersetEqual;","Supset;","THORN","THORN;","TRADE;","TSHcy;","TScy;","Tab;","Tau;","Tcaron;","Tcedil;","Tcy;","Tfr;","Therefore;","Theta;","ThickSpace;","ThinSpace;","Tilde;","TildeEqual;","TildeFullEqual;","TildeTilde;","Topf;","TripleDot;","Tscr;","Tstrok;","Uacute","Uacute;","Uarr;","Uarrocir;","Ubrcy;","Ubreve;","Ucirc","Ucirc;","Ucy;","Udblac;","Ufr;","Ugrave","Ugrave;","Umacr;","UnderBar;","UnderBrace;","UnderBracket;","UnderParenthesis;","Union;","UnionPlus;","Uogon;","Uopf;","UpArrow;","UpArrowBar;","UpArrowDownArrow;","UpDownArrow;","UpEquilibrium;","UpTee;","UpTeeArrow;","Uparrow;","Updownarrow;","UpperLeftArrow;","UpperRightArrow;","Upsi;","Upsilon;","Uring;","Uscr;","Utilde;","Uuml","Uuml;","VDash;","Vbar;","Vcy;","Vdash;","Vdashl;","Vee;","Verbar;","Vert;","VerticalBar;","VerticalLine;","VerticalSeparator;","VerticalTilde;","VeryThinSpace;","Vfr;","Vopf;","Vscr;","Vvdash;","Wcirc;","Wedge;","Wfr;","Wopf;","Wscr;","Xfr;","Xi;","Xopf;","Xscr;","YAcy;","YIcy;","YUcy;","Yacute","Yacute;","Ycirc;","Ycy;","Yfr;","Yopf;","Yscr;","Yuml;","ZHcy;","Zacute;","Zcaron;","Zcy;","Zdot;","ZeroWidthSpace;","Zeta;","Zfr;","Zopf;","Zscr;","aacute","aacute;","abreve;","ac;","acE;","acd;","acirc","acirc;","acute","acute;","acy;","aelig","aelig;","af;","afr;","agrave","agrave;","alefsym;","aleph;","alpha;","amacr;","amalg;","amp","amp;","and;","andand;","andd;","andslope;","andv;","ang;","ange;","angle;","angmsd;","angmsdaa;","angmsdab;","angmsdac;","angmsdad;","angmsdae;","angmsdaf;","angmsdag;","angmsdah;","angrt;","angrtvb;","angrtvbd;","angsph;","angst;","angzarr;","aogon;","aopf;","ap;","apE;","apacir;","ape;","apid;","apos;","approx;","approxeq;","aring","aring;","ascr;","ast;","asymp;","asympeq;","atilde","atilde;","auml","auml;","awconint;","awint;","bNot;","backcong;","backepsilon;","backprime;","backsim;","backsimeq;","barvee;","barwed;","barwedge;","bbrk;","bbrktbrk;","bcong;","bcy;","bdquo;","becaus;","because;","bemptyv;","bepsi;","bernou;","beta;","beth;","between;","bfr;","bigcap;","bigcirc;","bigcup;","bigodot;","bigoplus;","bigotimes;","bigsqcup;","bigstar;","bigtriangledown;","bigtriangleup;","biguplus;","bigvee;","bigwedge;","bkarow;","blacklozenge;","blacksquare;","blacktriangle;","blacktriangledown;","blacktriangleleft;","blacktriangleright;","blank;","blk12;","blk14;","blk34;","block;","bne;","bnequiv;","bnot;","bopf;","bot;","bottom;","bowtie;","boxDL;","boxDR;","boxDl;","boxDr;","boxH;","boxHD;","boxHU;","boxHd;","boxHu;","boxUL;","boxUR;","boxUl;","boxUr;","boxV;","boxVH;","boxVL;","boxVR;","boxVh;","boxVl;","boxVr;","boxbox;","boxdL;","boxdR;","boxdl;","boxdr;","boxh;","boxhD;","boxhU;","boxhd;","boxhu;","boxminus;","boxplus;","boxtimes;","boxuL;","boxuR;","boxul;","boxur;","boxv;","boxvH;","boxvL;","boxvR;","boxvh;","boxvl;","boxvr;","bprime;","breve;","brvbar","brvbar;","bscr;","bsemi;","bsim;","bsime;","bsol;","bsolb;","bsolhsub;","bull;","bullet;","bump;","bumpE;","bumpe;","bumpeq;","cacute;","cap;","capand;","capbrcup;","capcap;","capcup;","capdot;","caps;","caret;","caron;","ccaps;","ccaron;","ccedil","ccedil;","ccirc;","ccups;","ccupssm;","cdot;","cedil","cedil;","cemptyv;","cent","cent;","centerdot;","cfr;","chcy;","check;","checkmark;","chi;","cir;","cirE;","circ;","circeq;","circlearrowleft;","circlearrowright;","circledR;","circledS;","circledast;","circledcirc;","circleddash;","cire;","cirfnint;","cirmid;","cirscir;","clubs;","clubsuit;","colon;","colone;","coloneq;","comma;","commat;","comp;","compfn;","complement;","complexes;","cong;","congdot;","conint;","copf;","coprod;","copy","copy;","copysr;","crarr;","cross;","cscr;","csub;","csube;","csup;","csupe;","ctdot;","cudarrl;","cudarrr;","cuepr;","cuesc;","cularr;","cularrp;","cup;","cupbrcap;","cupcap;","cupcup;","cupdot;","cupor;","cups;","curarr;","curarrm;","curlyeqprec;","curlyeqsucc;","curlyvee;","curlywedge;","curren","curren;","curvearrowleft;","curvearrowright;","cuvee;","cuwed;","cwconint;","cwint;","cylcty;","dArr;","dHar;","dagger;","daleth;","darr;","dash;","dashv;","dbkarow;","dblac;","dcaron;","dcy;","dd;","ddagger;","ddarr;","ddotseq;","deg","deg;","delta;","demptyv;","dfisht;","dfr;","dharl;","dharr;","diam;","diamond;","diamondsuit;","diams;","die;","digamma;","disin;","div;","divide","divide;","divideontimes;","divonx;","djcy;","dlcorn;","dlcrop;","dollar;","dopf;","dot;","doteq;","doteqdot;","dotminus;","dotplus;","dotsquare;","doublebarwedge;","downarrow;","downdownarrows;","downharpoonleft;","downharpoonright;","drbkarow;","drcorn;","drcrop;","dscr;","dscy;","dsol;","dstrok;","dtdot;","dtri;","dtrif;","duarr;","duhar;","dwangle;","dzcy;","dzigrarr;","eDDot;","eDot;","eacute","eacute;","easter;","ecaron;","ecir;","ecirc","ecirc;","ecolon;","ecy;","edot;","ee;","efDot;","efr;","eg;","egrave","egrave;","egs;","egsdot;","el;","elinters;","ell;","els;","elsdot;","emacr;","empty;","emptyset;","emptyv;","emsp13;","emsp14;","emsp;","eng;","ensp;","eogon;","eopf;","epar;","eparsl;","eplus;","epsi;","epsilon;","epsiv;","eqcirc;","eqcolon;","eqsim;","eqslantgtr;","eqslantless;","equals;","equest;","equiv;","equivDD;","eqvparsl;","erDot;","erarr;","escr;","esdot;","esim;","eta;","eth","eth;","euml","euml;","euro;","excl;","exist;","expectation;","exponentiale;","fallingdotseq;","fcy;","female;","ffilig;","fflig;","ffllig;","ffr;","filig;","fjlig;","flat;","fllig;","fltns;","fnof;","fopf;","forall;","fork;","forkv;","fpartint;","frac12","frac12;","frac13;","frac14","frac14;","frac15;","frac16;","frac18;","frac23;","frac25;","frac34","frac34;","frac35;","frac38;","frac45;","frac56;","frac58;","frac78;","frasl;","frown;","fscr;","gE;","gEl;","gacute;","gamma;","gammad;","gap;","gbreve;","gcirc;","gcy;","gdot;","ge;","gel;","geq;","geqq;","geqslant;","ges;","gescc;","gesdot;","gesdoto;","gesdotol;","gesl;","gesles;","gfr;","gg;","ggg;","gimel;","gjcy;","gl;","glE;","gla;","glj;","gnE;","gnap;","gnapprox;","gne;","gneq;","gneqq;","gnsim;","gopf;","grave;","gscr;","gsim;","gsime;","gsiml;","gt","gt;","gtcc;","gtcir;","gtdot;","gtlPar;","gtquest;","gtrapprox;","gtrarr;","gtrdot;","gtreqless;","gtreqqless;","gtrless;","gtrsim;","gvertneqq;","gvnE;","hArr;","hairsp;","half;","hamilt;","hardcy;","harr;","harrcir;","harrw;","hbar;","hcirc;","hearts;","heartsuit;","hellip;","hercon;","hfr;","hksearow;","hkswarow;","hoarr;","homtht;","hookleftarrow;","hookrightarrow;","hopf;","horbar;","hscr;","hslash;","hstrok;","hybull;","hyphen;","iacute","iacute;","ic;","icirc","icirc;","icy;","iecy;","iexcl","iexcl;","iff;","ifr;","igrave","igrave;","ii;","iiiint;","iiint;","iinfin;","iiota;","ijlig;","imacr;","image;","imagline;","imagpart;","imath;","imof;","imped;","in;","incare;","infin;","infintie;","inodot;","int;","intcal;","integers;","intercal;","intlarhk;","intprod;","iocy;","iogon;","iopf;","iota;","iprod;","iquest","iquest;","iscr;","isin;","isinE;","isindot;","isins;","isinsv;","isinv;","it;","itilde;","iukcy;","iuml","iuml;","jcirc;","jcy;","jfr;","jmath;","jopf;","jscr;","jsercy;","jukcy;","kappa;","kappav;","kcedil;","kcy;","kfr;","kgreen;","khcy;","kjcy;","kopf;","kscr;","lAarr;","lArr;","lAtail;","lBarr;","lE;","lEg;","lHar;","lacute;","laemptyv;","lagran;","lambda;","lang;","langd;","langle;","lap;","laquo","laquo;","larr;","larrb;","larrbfs;","larrfs;","larrhk;","larrlp;","larrpl;","larrsim;","larrtl;","lat;","latail;","late;","lates;","lbarr;","lbbrk;","lbrace;","lbrack;","lbrke;","lbrksld;","lbrkslu;","lcaron;","lcedil;","lceil;","lcub;","lcy;","ldca;","ldquo;","ldquor;","ldrdhar;","ldrushar;","ldsh;","le;","leftarrow;","leftarrowtail;","leftharpoondown;","leftharpoonup;","leftleftarrows;","leftrightarrow;","leftrightarrows;","leftrightharpoons;","leftrightsquigarrow;","leftthreetimes;","leg;","leq;","leqq;","leqslant;","les;","lescc;","lesdot;","lesdoto;","lesdotor;","lesg;","lesges;","lessapprox;","lessdot;","lesseqgtr;","lesseqqgtr;","lessgtr;","lesssim;","lfisht;","lfloor;","lfr;","lg;","lgE;","lhard;","lharu;","lharul;","lhblk;","ljcy;","ll;","llarr;","llcorner;","llhard;","lltri;","lmidot;","lmoust;","lmoustache;","lnE;","lnap;","lnapprox;","lne;","lneq;","lneqq;","lnsim;","loang;","loarr;","lobrk;","longleftarrow;","longleftrightarrow;","longmapsto;","longrightarrow;","looparrowleft;","looparrowright;","lopar;","lopf;","loplus;","lotimes;","lowast;","lowbar;","loz;","lozenge;","lozf;","lpar;","lparlt;","lrarr;","lrcorner;","lrhar;","lrhard;","lrm;","lrtri;","lsaquo;","lscr;","lsh;","lsim;","lsime;","lsimg;","lsqb;","lsquo;","lsquor;","lstrok;","lt","lt;","ltcc;","ltcir;","ltdot;","lthree;","ltimes;","ltlarr;","ltquest;","ltrPar;","ltri;","ltrie;","ltrif;","lurdshar;","luruhar;","lvertneqq;","lvnE;","mDDot;","macr","macr;","male;","malt;","maltese;","map;","mapsto;","mapstodown;","mapstoleft;","mapstoup;","marker;","mcomma;","mcy;","mdash;","measuredangle;","mfr;","mho;","micro","micro;","mid;","midast;","midcir;","middot","middot;","minus;","minusb;","minusd;","minusdu;","mlcp;","mldr;","mnplus;","models;","mopf;","mp;","mscr;","mstpos;","mu;","multimap;","mumap;","nGg;","nGt;","nGtv;","nLeftarrow;","nLeftrightarrow;","nLl;","nLt;","nLtv;","nRightarrow;","nVDash;","nVdash;","nabla;","nacute;","nang;","nap;","napE;","napid;","napos;","napprox;","natur;","natural;","naturals;","nbsp","nbsp;","nbump;","nbumpe;","ncap;","ncaron;","ncedil;","ncong;","ncongdot;","ncup;","ncy;","ndash;","ne;","neArr;","nearhk;","nearr;","nearrow;","nedot;","nequiv;","nesear;","nesim;","nexist;","nexists;","nfr;","ngE;","nge;","ngeq;","ngeqq;","ngeqslant;","nges;","ngsim;","ngt;","ngtr;","nhArr;","nharr;","nhpar;","ni;","nis;","nisd;","niv;","njcy;","nlArr;","nlE;","nlarr;","nldr;","nle;","nleftarrow;","nleftrightarrow;","nleq;","nleqq;","nleqslant;","nles;","nless;","nlsim;","nlt;","nltri;","nltrie;","nmid;","nopf;","not","not;","notin;","notinE;","notindot;","notinva;","notinvb;","notinvc;","notni;","notniva;","notnivb;","notnivc;","npar;","nparallel;","nparsl;","npart;","npolint;","npr;","nprcue;","npre;","nprec;","npreceq;","nrArr;","nrarr;","nrarrc;","nrarrw;","nrightarrow;","nrtri;","nrtrie;","nsc;","nsccue;","nsce;","nscr;","nshortmid;","nshortparallel;","nsim;","nsime;","nsimeq;","nsmid;","nspar;","nsqsube;","nsqsupe;","nsub;","nsubE;","nsube;","nsubset;","nsubseteq;","nsubseteqq;","nsucc;","nsucceq;","nsup;","nsupE;","nsupe;","nsupset;","nsupseteq;","nsupseteqq;","ntgl;","ntilde","ntilde;","ntlg;","ntriangleleft;","ntrianglelefteq;","ntriangleright;","ntrianglerighteq;","nu;","num;","numero;","numsp;","nvDash;","nvHarr;","nvap;","nvdash;","nvge;","nvgt;","nvinfin;","nvlArr;","nvle;","nvlt;","nvltrie;","nvrArr;","nvrtrie;","nvsim;","nwArr;","nwarhk;","nwarr;","nwarrow;","nwnear;","oS;","oacute","oacute;","oast;","ocir;","ocirc","ocirc;","ocy;","odash;","odblac;","odiv;","odot;","odsold;","oelig;","ofcir;","ofr;","ogon;","ograve","ograve;","ogt;","ohbar;","ohm;","oint;","olarr;","olcir;","olcross;","oline;","olt;","omacr;","omega;","omicron;","omid;","ominus;","oopf;","opar;","operp;","oplus;","or;","orarr;","ord;","order;","orderof;","ordf","ordf;","ordm","ordm;","origof;","oror;","orslope;","orv;","oscr;","oslash","oslash;","osol;","otilde","otilde;","otimes;","otimesas;","ouml","ouml;","ovbar;","par;","para","para;","parallel;","parsim;","parsl;","part;","pcy;","percnt;","period;","permil;","perp;","pertenk;","pfr;","phi;","phiv;","phmmat;","phone;","pi;","pitchfork;","piv;","planck;","planckh;","plankv;","plus;","plusacir;","plusb;","pluscir;","plusdo;","plusdu;","pluse;","plusmn","plusmn;","plussim;","plustwo;","pm;","pointint;","popf;","pound","pound;","pr;","prE;","prap;","prcue;","pre;","prec;","precapprox;","preccurlyeq;","preceq;","precnapprox;","precneqq;","precnsim;","precsim;","prime;","primes;","prnE;","prnap;","prnsim;","prod;","profalar;","profline;","profsurf;","prop;","propto;","prsim;","prurel;","pscr;","psi;","puncsp;","qfr;","qint;","qopf;","qprime;","qscr;","quaternions;","quatint;","quest;","questeq;","quot","quot;","rAarr;","rArr;","rAtail;","rBarr;","rHar;","race;","racute;","radic;","raemptyv;","rang;","rangd;","range;","rangle;","raquo","raquo;","rarr;","rarrap;","rarrb;","rarrbfs;","rarrc;","rarrfs;","rarrhk;","rarrlp;","rarrpl;","rarrsim;","rarrtl;","rarrw;","ratail;","ratio;","rationals;","rbarr;","rbbrk;","rbrace;","rbrack;","rbrke;","rbrksld;","rbrkslu;","rcaron;","rcedil;","rceil;","rcub;","rcy;","rdca;","rdldhar;","rdquo;","rdquor;","rdsh;","real;","realine;","realpart;","reals;","rect;","reg","reg;","rfisht;","rfloor;","rfr;","rhard;","rharu;","rharul;","rho;","rhov;","rightarrow;","rightarrowtail;","rightharpoondown;","rightharpoonup;","rightleftarrows;","rightleftharpoons;","rightrightarrows;","rightsquigarrow;","rightthreetimes;","ring;","risingdotseq;","rlarr;","rlhar;","rlm;","rmoust;","rmoustache;","rnmid;","roang;","roarr;","robrk;","ropar;","ropf;","roplus;","rotimes;","rpar;","rpargt;","rppolint;","rrarr;","rsaquo;","rscr;","rsh;","rsqb;","rsquo;","rsquor;","rthree;","rtimes;","rtri;","rtrie;","rtrif;","rtriltri;","ruluhar;","rx;","sacute;","sbquo;","sc;","scE;","scap;","scaron;","sccue;","sce;","scedil;","scirc;","scnE;","scnap;","scnsim;","scpolint;","scsim;","scy;","sdot;","sdotb;","sdote;","seArr;","searhk;","searr;","searrow;","sect","sect;","semi;","seswar;","setminus;","setmn;","sext;","sfr;","sfrown;","sharp;","shchcy;","shcy;","shortmid;","shortparallel;","shy","shy;","sigma;","sigmaf;","sigmav;","sim;","simdot;","sime;","simeq;","simg;","simgE;","siml;","simlE;","simne;","simplus;","simrarr;","slarr;","smallsetminus;","smashp;","smeparsl;","smid;","smile;","smt;","smte;","smtes;","softcy;","sol;","solb;","solbar;","sopf;","spades;","spadesuit;","spar;","sqcap;","sqcaps;","sqcup;","sqcups;","sqsub;","sqsube;","sqsubset;","sqsubseteq;","sqsup;","sqsupe;","sqsupset;","sqsupseteq;","squ;","square;","squarf;","squf;","srarr;","sscr;","ssetmn;","ssmile;","sstarf;","star;","starf;","straightepsilon;","straightphi;","strns;","sub;","subE;","subdot;","sube;","subedot;","submult;","subnE;","subne;","subplus;","subrarr;","subset;","subseteq;","subseteqq;","subsetneq;","subsetneqq;","subsim;","subsub;","subsup;","succ;","succapprox;","succcurlyeq;","succeq;","succnapprox;","succneqq;","succnsim;","succsim;","sum;","sung;","sup1","sup1;","sup2","sup2;","sup3","sup3;","sup;","supE;","supdot;","supdsub;","supe;","supedot;","suphsol;","suphsub;","suplarr;","supmult;","supnE;","supne;","supplus;","supset;","supseteq;","supseteqq;","supsetneq;","supsetneqq;","supsim;","supsub;","supsup;","swArr;","swarhk;","swarr;","swarrow;","swnwar;","szlig","szlig;","target;","tau;","tbrk;","tcaron;","tcedil;","tcy;","tdot;","telrec;","tfr;","there4;","therefore;","theta;","thetasym;","thetav;","thickapprox;","thicksim;","thinsp;","thkap;","thksim;","thorn","thorn;","tilde;","times","times;","timesb;","timesbar;","timesd;","tint;","toea;","top;","topbot;","topcir;","topf;","topfork;","tosa;","tprime;","trade;","triangle;","triangledown;","triangleleft;","trianglelefteq;","triangleq;","triangleright;","trianglerighteq;","tridot;","trie;","triminus;","triplus;","trisb;","tritime;","trpezium;","tscr;","tscy;","tshcy;","tstrok;","twixt;","twoheadleftarrow;","twoheadrightarrow;","uArr;","uHar;","uacute","uacute;","uarr;","ubrcy;","ubreve;","ucirc","ucirc;","ucy;","udarr;","udblac;","udhar;","ufisht;","ufr;","ugrave","ugrave;","uharl;","uharr;","uhblk;","ulcorn;","ulcorner;","ulcrop;","ultri;","umacr;","uml","uml;","uogon;","uopf;","uparrow;","updownarrow;","upharpoonleft;","upharpoonright;","uplus;","upsi;","upsih;","upsilon;","upuparrows;","urcorn;","urcorner;","urcrop;","uring;","urtri;","uscr;","utdot;","utilde;","utri;","utrif;","uuarr;","uuml","uuml;","uwangle;","vArr;","vBar;","vBarv;","vDash;","vangrt;","varepsilon;","varkappa;","varnothing;","varphi;","varpi;","varpropto;","varr;","varrho;","varsigma;","varsubsetneq;","varsubsetneqq;","varsupsetneq;","varsupsetneqq;","vartheta;","vartriangleleft;","vartriangleright;","vcy;","vdash;","vee;","veebar;","veeeq;","vellip;","verbar;","vert;","vfr;","vltri;","vnsub;","vnsup;","vopf;","vprop;","vrtri;","vscr;","vsubnE;","vsubne;","vsupnE;","vsupne;","vzigzag;","wcirc;","wedbar;","wedge;","wedgeq;","weierp;","wfr;","wopf;","wp;","wr;","wreath;","wscr;","xcap;","xcirc;","xcup;","xdtri;","xfr;","xhArr;","xharr;","xi;","xlArr;","xlarr;","xmap;","xnis;","xodot;","xopf;","xoplus;","xotime;","xrArr;","xrarr;","xscr;","xsqcup;","xuplus;","xutri;","xvee;","xwedge;","yacute","yacute;","yacy;","ycirc;","ycy;","yen","yen;","yfr;","yicy;","yopf;","yscr;","yucy;","yuml","yuml;","zacute;","zcaron;","zcy;","zdot;","zeetrf;","zeta;","zfr;","zhcy;","zigrarr;","zopf;","zscr;","zwj;","zwnj;"]),t.s)
B.Z=new A.u(2231,{AElig:"\xc6","AElig;":"\xc6",AMP:"&","AMP;":"&",Aacute:"\xc1","Aacute;":"\xc1","Abreve;":"\u0102",Acirc:"\xc2","Acirc;":"\xc2","Acy;":"\u0410","Afr;":"\ud835\udd04",Agrave:"\xc0","Agrave;":"\xc0","Alpha;":"\u0391","Amacr;":"\u0100","And;":"\u2a53","Aogon;":"\u0104","Aopf;":"\ud835\udd38","ApplyFunction;":"\u2061",Aring:"\xc5","Aring;":"\xc5","Ascr;":"\ud835\udc9c","Assign;":"\u2254",Atilde:"\xc3","Atilde;":"\xc3",Auml:"\xc4","Auml;":"\xc4","Backslash;":"\u2216","Barv;":"\u2ae7","Barwed;":"\u2306","Bcy;":"\u0411","Because;":"\u2235","Bernoullis;":"\u212c","Beta;":"\u0392","Bfr;":"\ud835\udd05","Bopf;":"\ud835\udd39","Breve;":"\u02d8","Bscr;":"\u212c","Bumpeq;":"\u224e","CHcy;":"\u0427",COPY:"\xa9","COPY;":"\xa9","Cacute;":"\u0106","Cap;":"\u22d2","CapitalDifferentialD;":"\u2145","Cayleys;":"\u212d","Ccaron;":"\u010c",Ccedil:"\xc7","Ccedil;":"\xc7","Ccirc;":"\u0108","Cconint;":"\u2230","Cdot;":"\u010a","Cedilla;":"\xb8","CenterDot;":"\xb7","Cfr;":"\u212d","Chi;":"\u03a7","CircleDot;":"\u2299","CircleMinus;":"\u2296","CirclePlus;":"\u2295","CircleTimes;":"\u2297","ClockwiseContourIntegral;":"\u2232","CloseCurlyDoubleQuote;":"\u201d","CloseCurlyQuote;":"\u2019","Colon;":"\u2237","Colone;":"\u2a74","Congruent;":"\u2261","Conint;":"\u222f","ContourIntegral;":"\u222e","Copf;":"\u2102","Coproduct;":"\u2210","CounterClockwiseContourIntegral;":"\u2233","Cross;":"\u2a2f","Cscr;":"\ud835\udc9e","Cup;":"\u22d3","CupCap;":"\u224d","DD;":"\u2145","DDotrahd;":"\u2911","DJcy;":"\u0402","DScy;":"\u0405","DZcy;":"\u040f","Dagger;":"\u2021","Darr;":"\u21a1","Dashv;":"\u2ae4","Dcaron;":"\u010e","Dcy;":"\u0414","Del;":"\u2207","Delta;":"\u0394","Dfr;":"\ud835\udd07","DiacriticalAcute;":"\xb4","DiacriticalDot;":"\u02d9","DiacriticalDoubleAcute;":"\u02dd","DiacriticalGrave;":"`","DiacriticalTilde;":"\u02dc","Diamond;":"\u22c4","DifferentialD;":"\u2146","Dopf;":"\ud835\udd3b","Dot;":"\xa8","DotDot;":"\u20dc","DotEqual;":"\u2250","DoubleContourIntegral;":"\u222f","DoubleDot;":"\xa8","DoubleDownArrow;":"\u21d3","DoubleLeftArrow;":"\u21d0","DoubleLeftRightArrow;":"\u21d4","DoubleLeftTee;":"\u2ae4","DoubleLongLeftArrow;":"\u27f8","DoubleLongLeftRightArrow;":"\u27fa","DoubleLongRightArrow;":"\u27f9","DoubleRightArrow;":"\u21d2","DoubleRightTee;":"\u22a8","DoubleUpArrow;":"\u21d1","DoubleUpDownArrow;":"\u21d5","DoubleVerticalBar;":"\u2225","DownArrow;":"\u2193","DownArrowBar;":"\u2913","DownArrowUpArrow;":"\u21f5","DownBreve;":"\u0311","DownLeftRightVector;":"\u2950","DownLeftTeeVector;":"\u295e","DownLeftVector;":"\u21bd","DownLeftVectorBar;":"\u2956","DownRightTeeVector;":"\u295f","DownRightVector;":"\u21c1","DownRightVectorBar;":"\u2957","DownTee;":"\u22a4","DownTeeArrow;":"\u21a7","Downarrow;":"\u21d3","Dscr;":"\ud835\udc9f","Dstrok;":"\u0110","ENG;":"\u014a",ETH:"\xd0","ETH;":"\xd0",Eacute:"\xc9","Eacute;":"\xc9","Ecaron;":"\u011a",Ecirc:"\xca","Ecirc;":"\xca","Ecy;":"\u042d","Edot;":"\u0116","Efr;":"\ud835\udd08",Egrave:"\xc8","Egrave;":"\xc8","Element;":"\u2208","Emacr;":"\u0112","EmptySmallSquare;":"\u25fb","EmptyVerySmallSquare;":"\u25ab","Eogon;":"\u0118","Eopf;":"\ud835\udd3c","Epsilon;":"\u0395","Equal;":"\u2a75","EqualTilde;":"\u2242","Equilibrium;":"\u21cc","Escr;":"\u2130","Esim;":"\u2a73","Eta;":"\u0397",Euml:"\xcb","Euml;":"\xcb","Exists;":"\u2203","ExponentialE;":"\u2147","Fcy;":"\u0424","Ffr;":"\ud835\udd09","FilledSmallSquare;":"\u25fc","FilledVerySmallSquare;":"\u25aa","Fopf;":"\ud835\udd3d","ForAll;":"\u2200","Fouriertrf;":"\u2131","Fscr;":"\u2131","GJcy;":"\u0403",GT:">","GT;":">","Gamma;":"\u0393","Gammad;":"\u03dc","Gbreve;":"\u011e","Gcedil;":"\u0122","Gcirc;":"\u011c","Gcy;":"\u0413","Gdot;":"\u0120","Gfr;":"\ud835\udd0a","Gg;":"\u22d9","Gopf;":"\ud835\udd3e","GreaterEqual;":"\u2265","GreaterEqualLess;":"\u22db","GreaterFullEqual;":"\u2267","GreaterGreater;":"\u2aa2","GreaterLess;":"\u2277","GreaterSlantEqual;":"\u2a7e","GreaterTilde;":"\u2273","Gscr;":"\ud835\udca2","Gt;":"\u226b","HARDcy;":"\u042a","Hacek;":"\u02c7","Hat;":"^","Hcirc;":"\u0124","Hfr;":"\u210c","HilbertSpace;":"\u210b","Hopf;":"\u210d","HorizontalLine;":"\u2500","Hscr;":"\u210b","Hstrok;":"\u0126","HumpDownHump;":"\u224e","HumpEqual;":"\u224f","IEcy;":"\u0415","IJlig;":"\u0132","IOcy;":"\u0401",Iacute:"\xcd","Iacute;":"\xcd",Icirc:"\xce","Icirc;":"\xce","Icy;":"\u0418","Idot;":"\u0130","Ifr;":"\u2111",Igrave:"\xcc","Igrave;":"\xcc","Im;":"\u2111","Imacr;":"\u012a","ImaginaryI;":"\u2148","Implies;":"\u21d2","Int;":"\u222c","Integral;":"\u222b","Intersection;":"\u22c2","InvisibleComma;":"\u2063","InvisibleTimes;":"\u2062","Iogon;":"\u012e","Iopf;":"\ud835\udd40","Iota;":"\u0399","Iscr;":"\u2110","Itilde;":"\u0128","Iukcy;":"\u0406",Iuml:"\xcf","Iuml;":"\xcf","Jcirc;":"\u0134","Jcy;":"\u0419","Jfr;":"\ud835\udd0d","Jopf;":"\ud835\udd41","Jscr;":"\ud835\udca5","Jsercy;":"\u0408","Jukcy;":"\u0404","KHcy;":"\u0425","KJcy;":"\u040c","Kappa;":"\u039a","Kcedil;":"\u0136","Kcy;":"\u041a","Kfr;":"\ud835\udd0e","Kopf;":"\ud835\udd42","Kscr;":"\ud835\udca6","LJcy;":"\u0409",LT:"<","LT;":"<","Lacute;":"\u0139","Lambda;":"\u039b","Lang;":"\u27ea","Laplacetrf;":"\u2112","Larr;":"\u219e","Lcaron;":"\u013d","Lcedil;":"\u013b","Lcy;":"\u041b","LeftAngleBracket;":"\u27e8","LeftArrow;":"\u2190","LeftArrowBar;":"\u21e4","LeftArrowRightArrow;":"\u21c6","LeftCeiling;":"\u2308","LeftDoubleBracket;":"\u27e6","LeftDownTeeVector;":"\u2961","LeftDownVector;":"\u21c3","LeftDownVectorBar;":"\u2959","LeftFloor;":"\u230a","LeftRightArrow;":"\u2194","LeftRightVector;":"\u294e","LeftTee;":"\u22a3","LeftTeeArrow;":"\u21a4","LeftTeeVector;":"\u295a","LeftTriangle;":"\u22b2","LeftTriangleBar;":"\u29cf","LeftTriangleEqual;":"\u22b4","LeftUpDownVector;":"\u2951","LeftUpTeeVector;":"\u2960","LeftUpVector;":"\u21bf","LeftUpVectorBar;":"\u2958","LeftVector;":"\u21bc","LeftVectorBar;":"\u2952","Leftarrow;":"\u21d0","Leftrightarrow;":"\u21d4","LessEqualGreater;":"\u22da","LessFullEqual;":"\u2266","LessGreater;":"\u2276","LessLess;":"\u2aa1","LessSlantEqual;":"\u2a7d","LessTilde;":"\u2272","Lfr;":"\ud835\udd0f","Ll;":"\u22d8","Lleftarrow;":"\u21da","Lmidot;":"\u013f","LongLeftArrow;":"\u27f5","LongLeftRightArrow;":"\u27f7","LongRightArrow;":"\u27f6","Longleftarrow;":"\u27f8","Longleftrightarrow;":"\u27fa","Longrightarrow;":"\u27f9","Lopf;":"\ud835\udd43","LowerLeftArrow;":"\u2199","LowerRightArrow;":"\u2198","Lscr;":"\u2112","Lsh;":"\u21b0","Lstrok;":"\u0141","Lt;":"\u226a","Map;":"\u2905","Mcy;":"\u041c","MediumSpace;":"\u205f","Mellintrf;":"\u2133","Mfr;":"\ud835\udd10","MinusPlus;":"\u2213","Mopf;":"\ud835\udd44","Mscr;":"\u2133","Mu;":"\u039c","NJcy;":"\u040a","Nacute;":"\u0143","Ncaron;":"\u0147","Ncedil;":"\u0145","Ncy;":"\u041d","NegativeMediumSpace;":"\u200b","NegativeThickSpace;":"\u200b","NegativeThinSpace;":"\u200b","NegativeVeryThinSpace;":"\u200b","NestedGreaterGreater;":"\u226b","NestedLessLess;":"\u226a","NewLine;":"\n","Nfr;":"\ud835\udd11","NoBreak;":"\u2060","NonBreakingSpace;":"\xa0","Nopf;":"\u2115","Not;":"\u2aec","NotCongruent;":"\u2262","NotCupCap;":"\u226d","NotDoubleVerticalBar;":"\u2226","NotElement;":"\u2209","NotEqual;":"\u2260","NotEqualTilde;":"\u2242\u0338","NotExists;":"\u2204","NotGreater;":"\u226f","NotGreaterEqual;":"\u2271","NotGreaterFullEqual;":"\u2267\u0338","NotGreaterGreater;":"\u226b\u0338","NotGreaterLess;":"\u2279","NotGreaterSlantEqual;":"\u2a7e\u0338","NotGreaterTilde;":"\u2275","NotHumpDownHump;":"\u224e\u0338","NotHumpEqual;":"\u224f\u0338","NotLeftTriangle;":"\u22ea","NotLeftTriangleBar;":"\u29cf\u0338","NotLeftTriangleEqual;":"\u22ec","NotLess;":"\u226e","NotLessEqual;":"\u2270","NotLessGreater;":"\u2278","NotLessLess;":"\u226a\u0338","NotLessSlantEqual;":"\u2a7d\u0338","NotLessTilde;":"\u2274","NotNestedGreaterGreater;":"\u2aa2\u0338","NotNestedLessLess;":"\u2aa1\u0338","NotPrecedes;":"\u2280","NotPrecedesEqual;":"\u2aaf\u0338","NotPrecedesSlantEqual;":"\u22e0","NotReverseElement;":"\u220c","NotRightTriangle;":"\u22eb","NotRightTriangleBar;":"\u29d0\u0338","NotRightTriangleEqual;":"\u22ed","NotSquareSubset;":"\u228f\u0338","NotSquareSubsetEqual;":"\u22e2","NotSquareSuperset;":"\u2290\u0338","NotSquareSupersetEqual;":"\u22e3","NotSubset;":"\u2282\u20d2","NotSubsetEqual;":"\u2288","NotSucceeds;":"\u2281","NotSucceedsEqual;":"\u2ab0\u0338","NotSucceedsSlantEqual;":"\u22e1","NotSucceedsTilde;":"\u227f\u0338","NotSuperset;":"\u2283\u20d2","NotSupersetEqual;":"\u2289","NotTilde;":"\u2241","NotTildeEqual;":"\u2244","NotTildeFullEqual;":"\u2247","NotTildeTilde;":"\u2249","NotVerticalBar;":"\u2224","Nscr;":"\ud835\udca9",Ntilde:"\xd1","Ntilde;":"\xd1","Nu;":"\u039d","OElig;":"\u0152",Oacute:"\xd3","Oacute;":"\xd3",Ocirc:"\xd4","Ocirc;":"\xd4","Ocy;":"\u041e","Odblac;":"\u0150","Ofr;":"\ud835\udd12",Ograve:"\xd2","Ograve;":"\xd2","Omacr;":"\u014c","Omega;":"\u03a9","Omicron;":"\u039f","Oopf;":"\ud835\udd46","OpenCurlyDoubleQuote;":"\u201c","OpenCurlyQuote;":"\u2018","Or;":"\u2a54","Oscr;":"\ud835\udcaa",Oslash:"\xd8","Oslash;":"\xd8",Otilde:"\xd5","Otilde;":"\xd5","Otimes;":"\u2a37",Ouml:"\xd6","Ouml;":"\xd6","OverBar;":"\u203e","OverBrace;":"\u23de","OverBracket;":"\u23b4","OverParenthesis;":"\u23dc","PartialD;":"\u2202","Pcy;":"\u041f","Pfr;":"\ud835\udd13","Phi;":"\u03a6","Pi;":"\u03a0","PlusMinus;":"\xb1","Poincareplane;":"\u210c","Popf;":"\u2119","Pr;":"\u2abb","Precedes;":"\u227a","PrecedesEqual;":"\u2aaf","PrecedesSlantEqual;":"\u227c","PrecedesTilde;":"\u227e","Prime;":"\u2033","Product;":"\u220f","Proportion;":"\u2237","Proportional;":"\u221d","Pscr;":"\ud835\udcab","Psi;":"\u03a8",QUOT:'"',"QUOT;":'"',"Qfr;":"\ud835\udd14","Qopf;":"\u211a","Qscr;":"\ud835\udcac","RBarr;":"\u2910",REG:"\xae","REG;":"\xae","Racute;":"\u0154","Rang;":"\u27eb","Rarr;":"\u21a0","Rarrtl;":"\u2916","Rcaron;":"\u0158","Rcedil;":"\u0156","Rcy;":"\u0420","Re;":"\u211c","ReverseElement;":"\u220b","ReverseEquilibrium;":"\u21cb","ReverseUpEquilibrium;":"\u296f","Rfr;":"\u211c","Rho;":"\u03a1","RightAngleBracket;":"\u27e9","RightArrow;":"\u2192","RightArrowBar;":"\u21e5","RightArrowLeftArrow;":"\u21c4","RightCeiling;":"\u2309","RightDoubleBracket;":"\u27e7","RightDownTeeVector;":"\u295d","RightDownVector;":"\u21c2","RightDownVectorBar;":"\u2955","RightFloor;":"\u230b","RightTee;":"\u22a2","RightTeeArrow;":"\u21a6","RightTeeVector;":"\u295b","RightTriangle;":"\u22b3","RightTriangleBar;":"\u29d0","RightTriangleEqual;":"\u22b5","RightUpDownVector;":"\u294f","RightUpTeeVector;":"\u295c","RightUpVector;":"\u21be","RightUpVectorBar;":"\u2954","RightVector;":"\u21c0","RightVectorBar;":"\u2953","Rightarrow;":"\u21d2","Ropf;":"\u211d","RoundImplies;":"\u2970","Rrightarrow;":"\u21db","Rscr;":"\u211b","Rsh;":"\u21b1","RuleDelayed;":"\u29f4","SHCHcy;":"\u0429","SHcy;":"\u0428","SOFTcy;":"\u042c","Sacute;":"\u015a","Sc;":"\u2abc","Scaron;":"\u0160","Scedil;":"\u015e","Scirc;":"\u015c","Scy;":"\u0421","Sfr;":"\ud835\udd16","ShortDownArrow;":"\u2193","ShortLeftArrow;":"\u2190","ShortRightArrow;":"\u2192","ShortUpArrow;":"\u2191","Sigma;":"\u03a3","SmallCircle;":"\u2218","Sopf;":"\ud835\udd4a","Sqrt;":"\u221a","Square;":"\u25a1","SquareIntersection;":"\u2293","SquareSubset;":"\u228f","SquareSubsetEqual;":"\u2291","SquareSuperset;":"\u2290","SquareSupersetEqual;":"\u2292","SquareUnion;":"\u2294","Sscr;":"\ud835\udcae","Star;":"\u22c6","Sub;":"\u22d0","Subset;":"\u22d0","SubsetEqual;":"\u2286","Succeeds;":"\u227b","SucceedsEqual;":"\u2ab0","SucceedsSlantEqual;":"\u227d","SucceedsTilde;":"\u227f","SuchThat;":"\u220b","Sum;":"\u2211","Sup;":"\u22d1","Superset;":"\u2283","SupersetEqual;":"\u2287","Supset;":"\u22d1",THORN:"\xde","THORN;":"\xde","TRADE;":"\u2122","TSHcy;":"\u040b","TScy;":"\u0426","Tab;":"\t","Tau;":"\u03a4","Tcaron;":"\u0164","Tcedil;":"\u0162","Tcy;":"\u0422","Tfr;":"\ud835\udd17","Therefore;":"\u2234","Theta;":"\u0398","ThickSpace;":"\u205f\u200a","ThinSpace;":"\u2009","Tilde;":"\u223c","TildeEqual;":"\u2243","TildeFullEqual;":"\u2245","TildeTilde;":"\u2248","Topf;":"\ud835\udd4b","TripleDot;":"\u20db","Tscr;":"\ud835\udcaf","Tstrok;":"\u0166",Uacute:"\xda","Uacute;":"\xda","Uarr;":"\u219f","Uarrocir;":"\u2949","Ubrcy;":"\u040e","Ubreve;":"\u016c",Ucirc:"\xdb","Ucirc;":"\xdb","Ucy;":"\u0423","Udblac;":"\u0170","Ufr;":"\ud835\udd18",Ugrave:"\xd9","Ugrave;":"\xd9","Umacr;":"\u016a","UnderBar;":"_","UnderBrace;":"\u23df","UnderBracket;":"\u23b5","UnderParenthesis;":"\u23dd","Union;":"\u22c3","UnionPlus;":"\u228e","Uogon;":"\u0172","Uopf;":"\ud835\udd4c","UpArrow;":"\u2191","UpArrowBar;":"\u2912","UpArrowDownArrow;":"\u21c5","UpDownArrow;":"\u2195","UpEquilibrium;":"\u296e","UpTee;":"\u22a5","UpTeeArrow;":"\u21a5","Uparrow;":"\u21d1","Updownarrow;":"\u21d5","UpperLeftArrow;":"\u2196","UpperRightArrow;":"\u2197","Upsi;":"\u03d2","Upsilon;":"\u03a5","Uring;":"\u016e","Uscr;":"\ud835\udcb0","Utilde;":"\u0168",Uuml:"\xdc","Uuml;":"\xdc","VDash;":"\u22ab","Vbar;":"\u2aeb","Vcy;":"\u0412","Vdash;":"\u22a9","Vdashl;":"\u2ae6","Vee;":"\u22c1","Verbar;":"\u2016","Vert;":"\u2016","VerticalBar;":"\u2223","VerticalLine;":"|","VerticalSeparator;":"\u2758","VerticalTilde;":"\u2240","VeryThinSpace;":"\u200a","Vfr;":"\ud835\udd19","Vopf;":"\ud835\udd4d","Vscr;":"\ud835\udcb1","Vvdash;":"\u22aa","Wcirc;":"\u0174","Wedge;":"\u22c0","Wfr;":"\ud835\udd1a","Wopf;":"\ud835\udd4e","Wscr;":"\ud835\udcb2","Xfr;":"\ud835\udd1b","Xi;":"\u039e","Xopf;":"\ud835\udd4f","Xscr;":"\ud835\udcb3","YAcy;":"\u042f","YIcy;":"\u0407","YUcy;":"\u042e",Yacute:"\xdd","Yacute;":"\xdd","Ycirc;":"\u0176","Ycy;":"\u042b","Yfr;":"\ud835\udd1c","Yopf;":"\ud835\udd50","Yscr;":"\ud835\udcb4","Yuml;":"\u0178","ZHcy;":"\u0416","Zacute;":"\u0179","Zcaron;":"\u017d","Zcy;":"\u0417","Zdot;":"\u017b","ZeroWidthSpace;":"\u200b","Zeta;":"\u0396","Zfr;":"\u2128","Zopf;":"\u2124","Zscr;":"\ud835\udcb5",aacute:"\xe1","aacute;":"\xe1","abreve;":"\u0103","ac;":"\u223e","acE;":"\u223e\u0333","acd;":"\u223f",acirc:"\xe2","acirc;":"\xe2",acute:"\xb4","acute;":"\xb4","acy;":"\u0430",aelig:"\xe6","aelig;":"\xe6","af;":"\u2061","afr;":"\ud835\udd1e",agrave:"\xe0","agrave;":"\xe0","alefsym;":"\u2135","aleph;":"\u2135","alpha;":"\u03b1","amacr;":"\u0101","amalg;":"\u2a3f",amp:"&","amp;":"&","and;":"\u2227","andand;":"\u2a55","andd;":"\u2a5c","andslope;":"\u2a58","andv;":"\u2a5a","ang;":"\u2220","ange;":"\u29a4","angle;":"\u2220","angmsd;":"\u2221","angmsdaa;":"\u29a8","angmsdab;":"\u29a9","angmsdac;":"\u29aa","angmsdad;":"\u29ab","angmsdae;":"\u29ac","angmsdaf;":"\u29ad","angmsdag;":"\u29ae","angmsdah;":"\u29af","angrt;":"\u221f","angrtvb;":"\u22be","angrtvbd;":"\u299d","angsph;":"\u2222","angst;":"\xc5","angzarr;":"\u237c","aogon;":"\u0105","aopf;":"\ud835\udd52","ap;":"\u2248","apE;":"\u2a70","apacir;":"\u2a6f","ape;":"\u224a","apid;":"\u224b","apos;":"'","approx;":"\u2248","approxeq;":"\u224a",aring:"\xe5","aring;":"\xe5","ascr;":"\ud835\udcb6","ast;":"*","asymp;":"\u2248","asympeq;":"\u224d",atilde:"\xe3","atilde;":"\xe3",auml:"\xe4","auml;":"\xe4","awconint;":"\u2233","awint;":"\u2a11","bNot;":"\u2aed","backcong;":"\u224c","backepsilon;":"\u03f6","backprime;":"\u2035","backsim;":"\u223d","backsimeq;":"\u22cd","barvee;":"\u22bd","barwed;":"\u2305","barwedge;":"\u2305","bbrk;":"\u23b5","bbrktbrk;":"\u23b6","bcong;":"\u224c","bcy;":"\u0431","bdquo;":"\u201e","becaus;":"\u2235","because;":"\u2235","bemptyv;":"\u29b0","bepsi;":"\u03f6","bernou;":"\u212c","beta;":"\u03b2","beth;":"\u2136","between;":"\u226c","bfr;":"\ud835\udd1f","bigcap;":"\u22c2","bigcirc;":"\u25ef","bigcup;":"\u22c3","bigodot;":"\u2a00","bigoplus;":"\u2a01","bigotimes;":"\u2a02","bigsqcup;":"\u2a06","bigstar;":"\u2605","bigtriangledown;":"\u25bd","bigtriangleup;":"\u25b3","biguplus;":"\u2a04","bigvee;":"\u22c1","bigwedge;":"\u22c0","bkarow;":"\u290d","blacklozenge;":"\u29eb","blacksquare;":"\u25aa","blacktriangle;":"\u25b4","blacktriangledown;":"\u25be","blacktriangleleft;":"\u25c2","blacktriangleright;":"\u25b8","blank;":"\u2423","blk12;":"\u2592","blk14;":"\u2591","blk34;":"\u2593","block;":"\u2588","bne;":"=\u20e5","bnequiv;":"\u2261\u20e5","bnot;":"\u2310","bopf;":"\ud835\udd53","bot;":"\u22a5","bottom;":"\u22a5","bowtie;":"\u22c8","boxDL;":"\u2557","boxDR;":"\u2554","boxDl;":"\u2556","boxDr;":"\u2553","boxH;":"\u2550","boxHD;":"\u2566","boxHU;":"\u2569","boxHd;":"\u2564","boxHu;":"\u2567","boxUL;":"\u255d","boxUR;":"\u255a","boxUl;":"\u255c","boxUr;":"\u2559","boxV;":"\u2551","boxVH;":"\u256c","boxVL;":"\u2563","boxVR;":"\u2560","boxVh;":"\u256b","boxVl;":"\u2562","boxVr;":"\u255f","boxbox;":"\u29c9","boxdL;":"\u2555","boxdR;":"\u2552","boxdl;":"\u2510","boxdr;":"\u250c","boxh;":"\u2500","boxhD;":"\u2565","boxhU;":"\u2568","boxhd;":"\u252c","boxhu;":"\u2534","boxminus;":"\u229f","boxplus;":"\u229e","boxtimes;":"\u22a0","boxuL;":"\u255b","boxuR;":"\u2558","boxul;":"\u2518","boxur;":"\u2514","boxv;":"\u2502","boxvH;":"\u256a","boxvL;":"\u2561","boxvR;":"\u255e","boxvh;":"\u253c","boxvl;":"\u2524","boxvr;":"\u251c","bprime;":"\u2035","breve;":"\u02d8",brvbar:"\xa6","brvbar;":"\xa6","bscr;":"\ud835\udcb7","bsemi;":"\u204f","bsim;":"\u223d","bsime;":"\u22cd","bsol;":"\\","bsolb;":"\u29c5","bsolhsub;":"\u27c8","bull;":"\u2022","bullet;":"\u2022","bump;":"\u224e","bumpE;":"\u2aae","bumpe;":"\u224f","bumpeq;":"\u224f","cacute;":"\u0107","cap;":"\u2229","capand;":"\u2a44","capbrcup;":"\u2a49","capcap;":"\u2a4b","capcup;":"\u2a47","capdot;":"\u2a40","caps;":"\u2229\ufe00","caret;":"\u2041","caron;":"\u02c7","ccaps;":"\u2a4d","ccaron;":"\u010d",ccedil:"\xe7","ccedil;":"\xe7","ccirc;":"\u0109","ccups;":"\u2a4c","ccupssm;":"\u2a50","cdot;":"\u010b",cedil:"\xb8","cedil;":"\xb8","cemptyv;":"\u29b2",cent:"\xa2","cent;":"\xa2","centerdot;":"\xb7","cfr;":"\ud835\udd20","chcy;":"\u0447","check;":"\u2713","checkmark;":"\u2713","chi;":"\u03c7","cir;":"\u25cb","cirE;":"\u29c3","circ;":"\u02c6","circeq;":"\u2257","circlearrowleft;":"\u21ba","circlearrowright;":"\u21bb","circledR;":"\xae","circledS;":"\u24c8","circledast;":"\u229b","circledcirc;":"\u229a","circleddash;":"\u229d","cire;":"\u2257","cirfnint;":"\u2a10","cirmid;":"\u2aef","cirscir;":"\u29c2","clubs;":"\u2663","clubsuit;":"\u2663","colon;":":","colone;":"\u2254","coloneq;":"\u2254","comma;":",","commat;":"@","comp;":"\u2201","compfn;":"\u2218","complement;":"\u2201","complexes;":"\u2102","cong;":"\u2245","congdot;":"\u2a6d","conint;":"\u222e","copf;":"\ud835\udd54","coprod;":"\u2210",copy:"\xa9","copy;":"\xa9","copysr;":"\u2117","crarr;":"\u21b5","cross;":"\u2717","cscr;":"\ud835\udcb8","csub;":"\u2acf","csube;":"\u2ad1","csup;":"\u2ad0","csupe;":"\u2ad2","ctdot;":"\u22ef","cudarrl;":"\u2938","cudarrr;":"\u2935","cuepr;":"\u22de","cuesc;":"\u22df","cularr;":"\u21b6","cularrp;":"\u293d","cup;":"\u222a","cupbrcap;":"\u2a48","cupcap;":"\u2a46","cupcup;":"\u2a4a","cupdot;":"\u228d","cupor;":"\u2a45","cups;":"\u222a\ufe00","curarr;":"\u21b7","curarrm;":"\u293c","curlyeqprec;":"\u22de","curlyeqsucc;":"\u22df","curlyvee;":"\u22ce","curlywedge;":"\u22cf",curren:"\xa4","curren;":"\xa4","curvearrowleft;":"\u21b6","curvearrowright;":"\u21b7","cuvee;":"\u22ce","cuwed;":"\u22cf","cwconint;":"\u2232","cwint;":"\u2231","cylcty;":"\u232d","dArr;":"\u21d3","dHar;":"\u2965","dagger;":"\u2020","daleth;":"\u2138","darr;":"\u2193","dash;":"\u2010","dashv;":"\u22a3","dbkarow;":"\u290f","dblac;":"\u02dd","dcaron;":"\u010f","dcy;":"\u0434","dd;":"\u2146","ddagger;":"\u2021","ddarr;":"\u21ca","ddotseq;":"\u2a77",deg:"\xb0","deg;":"\xb0","delta;":"\u03b4","demptyv;":"\u29b1","dfisht;":"\u297f","dfr;":"\ud835\udd21","dharl;":"\u21c3","dharr;":"\u21c2","diam;":"\u22c4","diamond;":"\u22c4","diamondsuit;":"\u2666","diams;":"\u2666","die;":"\xa8","digamma;":"\u03dd","disin;":"\u22f2","div;":"\xf7",divide:"\xf7","divide;":"\xf7","divideontimes;":"\u22c7","divonx;":"\u22c7","djcy;":"\u0452","dlcorn;":"\u231e","dlcrop;":"\u230d","dollar;":"$","dopf;":"\ud835\udd55","dot;":"\u02d9","doteq;":"\u2250","doteqdot;":"\u2251","dotminus;":"\u2238","dotplus;":"\u2214","dotsquare;":"\u22a1","doublebarwedge;":"\u2306","downarrow;":"\u2193","downdownarrows;":"\u21ca","downharpoonleft;":"\u21c3","downharpoonright;":"\u21c2","drbkarow;":"\u2910","drcorn;":"\u231f","drcrop;":"\u230c","dscr;":"\ud835\udcb9","dscy;":"\u0455","dsol;":"\u29f6","dstrok;":"\u0111","dtdot;":"\u22f1","dtri;":"\u25bf","dtrif;":"\u25be","duarr;":"\u21f5","duhar;":"\u296f","dwangle;":"\u29a6","dzcy;":"\u045f","dzigrarr;":"\u27ff","eDDot;":"\u2a77","eDot;":"\u2251",eacute:"\xe9","eacute;":"\xe9","easter;":"\u2a6e","ecaron;":"\u011b","ecir;":"\u2256",ecirc:"\xea","ecirc;":"\xea","ecolon;":"\u2255","ecy;":"\u044d","edot;":"\u0117","ee;":"\u2147","efDot;":"\u2252","efr;":"\ud835\udd22","eg;":"\u2a9a",egrave:"\xe8","egrave;":"\xe8","egs;":"\u2a96","egsdot;":"\u2a98","el;":"\u2a99","elinters;":"\u23e7","ell;":"\u2113","els;":"\u2a95","elsdot;":"\u2a97","emacr;":"\u0113","empty;":"\u2205","emptyset;":"\u2205","emptyv;":"\u2205","emsp13;":"\u2004","emsp14;":"\u2005","emsp;":"\u2003","eng;":"\u014b","ensp;":"\u2002","eogon;":"\u0119","eopf;":"\ud835\udd56","epar;":"\u22d5","eparsl;":"\u29e3","eplus;":"\u2a71","epsi;":"\u03b5","epsilon;":"\u03b5","epsiv;":"\u03f5","eqcirc;":"\u2256","eqcolon;":"\u2255","eqsim;":"\u2242","eqslantgtr;":"\u2a96","eqslantless;":"\u2a95","equals;":"=","equest;":"\u225f","equiv;":"\u2261","equivDD;":"\u2a78","eqvparsl;":"\u29e5","erDot;":"\u2253","erarr;":"\u2971","escr;":"\u212f","esdot;":"\u2250","esim;":"\u2242","eta;":"\u03b7",eth:"\xf0","eth;":"\xf0",euml:"\xeb","euml;":"\xeb","euro;":"\u20ac","excl;":"!","exist;":"\u2203","expectation;":"\u2130","exponentiale;":"\u2147","fallingdotseq;":"\u2252","fcy;":"\u0444","female;":"\u2640","ffilig;":"\ufb03","fflig;":"\ufb00","ffllig;":"\ufb04","ffr;":"\ud835\udd23","filig;":"\ufb01","fjlig;":"fj","flat;":"\u266d","fllig;":"\ufb02","fltns;":"\u25b1","fnof;":"\u0192","fopf;":"\ud835\udd57","forall;":"\u2200","fork;":"\u22d4","forkv;":"\u2ad9","fpartint;":"\u2a0d",frac12:"\xbd","frac12;":"\xbd","frac13;":"\u2153",frac14:"\xbc","frac14;":"\xbc","frac15;":"\u2155","frac16;":"\u2159","frac18;":"\u215b","frac23;":"\u2154","frac25;":"\u2156",frac34:"\xbe","frac34;":"\xbe","frac35;":"\u2157","frac38;":"\u215c","frac45;":"\u2158","frac56;":"\u215a","frac58;":"\u215d","frac78;":"\u215e","frasl;":"\u2044","frown;":"\u2322","fscr;":"\ud835\udcbb","gE;":"\u2267","gEl;":"\u2a8c","gacute;":"\u01f5","gamma;":"\u03b3","gammad;":"\u03dd","gap;":"\u2a86","gbreve;":"\u011f","gcirc;":"\u011d","gcy;":"\u0433","gdot;":"\u0121","ge;":"\u2265","gel;":"\u22db","geq;":"\u2265","geqq;":"\u2267","geqslant;":"\u2a7e","ges;":"\u2a7e","gescc;":"\u2aa9","gesdot;":"\u2a80","gesdoto;":"\u2a82","gesdotol;":"\u2a84","gesl;":"\u22db\ufe00","gesles;":"\u2a94","gfr;":"\ud835\udd24","gg;":"\u226b","ggg;":"\u22d9","gimel;":"\u2137","gjcy;":"\u0453","gl;":"\u2277","glE;":"\u2a92","gla;":"\u2aa5","glj;":"\u2aa4","gnE;":"\u2269","gnap;":"\u2a8a","gnapprox;":"\u2a8a","gne;":"\u2a88","gneq;":"\u2a88","gneqq;":"\u2269","gnsim;":"\u22e7","gopf;":"\ud835\udd58","grave;":"`","gscr;":"\u210a","gsim;":"\u2273","gsime;":"\u2a8e","gsiml;":"\u2a90",gt:">","gt;":">","gtcc;":"\u2aa7","gtcir;":"\u2a7a","gtdot;":"\u22d7","gtlPar;":"\u2995","gtquest;":"\u2a7c","gtrapprox;":"\u2a86","gtrarr;":"\u2978","gtrdot;":"\u22d7","gtreqless;":"\u22db","gtreqqless;":"\u2a8c","gtrless;":"\u2277","gtrsim;":"\u2273","gvertneqq;":"\u2269\ufe00","gvnE;":"\u2269\ufe00","hArr;":"\u21d4","hairsp;":"\u200a","half;":"\xbd","hamilt;":"\u210b","hardcy;":"\u044a","harr;":"\u2194","harrcir;":"\u2948","harrw;":"\u21ad","hbar;":"\u210f","hcirc;":"\u0125","hearts;":"\u2665","heartsuit;":"\u2665","hellip;":"\u2026","hercon;":"\u22b9","hfr;":"\ud835\udd25","hksearow;":"\u2925","hkswarow;":"\u2926","hoarr;":"\u21ff","homtht;":"\u223b","hookleftarrow;":"\u21a9","hookrightarrow;":"\u21aa","hopf;":"\ud835\udd59","horbar;":"\u2015","hscr;":"\ud835\udcbd","hslash;":"\u210f","hstrok;":"\u0127","hybull;":"\u2043","hyphen;":"\u2010",iacute:"\xed","iacute;":"\xed","ic;":"\u2063",icirc:"\xee","icirc;":"\xee","icy;":"\u0438","iecy;":"\u0435",iexcl:"\xa1","iexcl;":"\xa1","iff;":"\u21d4","ifr;":"\ud835\udd26",igrave:"\xec","igrave;":"\xec","ii;":"\u2148","iiiint;":"\u2a0c","iiint;":"\u222d","iinfin;":"\u29dc","iiota;":"\u2129","ijlig;":"\u0133","imacr;":"\u012b","image;":"\u2111","imagline;":"\u2110","imagpart;":"\u2111","imath;":"\u0131","imof;":"\u22b7","imped;":"\u01b5","in;":"\u2208","incare;":"\u2105","infin;":"\u221e","infintie;":"\u29dd","inodot;":"\u0131","int;":"\u222b","intcal;":"\u22ba","integers;":"\u2124","intercal;":"\u22ba","intlarhk;":"\u2a17","intprod;":"\u2a3c","iocy;":"\u0451","iogon;":"\u012f","iopf;":"\ud835\udd5a","iota;":"\u03b9","iprod;":"\u2a3c",iquest:"\xbf","iquest;":"\xbf","iscr;":"\ud835\udcbe","isin;":"\u2208","isinE;":"\u22f9","isindot;":"\u22f5","isins;":"\u22f4","isinsv;":"\u22f3","isinv;":"\u2208","it;":"\u2062","itilde;":"\u0129","iukcy;":"\u0456",iuml:"\xef","iuml;":"\xef","jcirc;":"\u0135","jcy;":"\u0439","jfr;":"\ud835\udd27","jmath;":"\u0237","jopf;":"\ud835\udd5b","jscr;":"\ud835\udcbf","jsercy;":"\u0458","jukcy;":"\u0454","kappa;":"\u03ba","kappav;":"\u03f0","kcedil;":"\u0137","kcy;":"\u043a","kfr;":"\ud835\udd28","kgreen;":"\u0138","khcy;":"\u0445","kjcy;":"\u045c","kopf;":"\ud835\udd5c","kscr;":"\ud835\udcc0","lAarr;":"\u21da","lArr;":"\u21d0","lAtail;":"\u291b","lBarr;":"\u290e","lE;":"\u2266","lEg;":"\u2a8b","lHar;":"\u2962","lacute;":"\u013a","laemptyv;":"\u29b4","lagran;":"\u2112","lambda;":"\u03bb","lang;":"\u27e8","langd;":"\u2991","langle;":"\u27e8","lap;":"\u2a85",laquo:"\xab","laquo;":"\xab","larr;":"\u2190","larrb;":"\u21e4","larrbfs;":"\u291f","larrfs;":"\u291d","larrhk;":"\u21a9","larrlp;":"\u21ab","larrpl;":"\u2939","larrsim;":"\u2973","larrtl;":"\u21a2","lat;":"\u2aab","latail;":"\u2919","late;":"\u2aad","lates;":"\u2aad\ufe00","lbarr;":"\u290c","lbbrk;":"\u2772","lbrace;":"{","lbrack;":"[","lbrke;":"\u298b","lbrksld;":"\u298f","lbrkslu;":"\u298d","lcaron;":"\u013e","lcedil;":"\u013c","lceil;":"\u2308","lcub;":"{","lcy;":"\u043b","ldca;":"\u2936","ldquo;":"\u201c","ldquor;":"\u201e","ldrdhar;":"\u2967","ldrushar;":"\u294b","ldsh;":"\u21b2","le;":"\u2264","leftarrow;":"\u2190","leftarrowtail;":"\u21a2","leftharpoondown;":"\u21bd","leftharpoonup;":"\u21bc","leftleftarrows;":"\u21c7","leftrightarrow;":"\u2194","leftrightarrows;":"\u21c6","leftrightharpoons;":"\u21cb","leftrightsquigarrow;":"\u21ad","leftthreetimes;":"\u22cb","leg;":"\u22da","leq;":"\u2264","leqq;":"\u2266","leqslant;":"\u2a7d","les;":"\u2a7d","lescc;":"\u2aa8","lesdot;":"\u2a7f","lesdoto;":"\u2a81","lesdotor;":"\u2a83","lesg;":"\u22da\ufe00","lesges;":"\u2a93","lessapprox;":"\u2a85","lessdot;":"\u22d6","lesseqgtr;":"\u22da","lesseqqgtr;":"\u2a8b","lessgtr;":"\u2276","lesssim;":"\u2272","lfisht;":"\u297c","lfloor;":"\u230a","lfr;":"\ud835\udd29","lg;":"\u2276","lgE;":"\u2a91","lhard;":"\u21bd","lharu;":"\u21bc","lharul;":"\u296a","lhblk;":"\u2584","ljcy;":"\u0459","ll;":"\u226a","llarr;":"\u21c7","llcorner;":"\u231e","llhard;":"\u296b","lltri;":"\u25fa","lmidot;":"\u0140","lmoust;":"\u23b0","lmoustache;":"\u23b0","lnE;":"\u2268","lnap;":"\u2a89","lnapprox;":"\u2a89","lne;":"\u2a87","lneq;":"\u2a87","lneqq;":"\u2268","lnsim;":"\u22e6","loang;":"\u27ec","loarr;":"\u21fd","lobrk;":"\u27e6","longleftarrow;":"\u27f5","longleftrightarrow;":"\u27f7","longmapsto;":"\u27fc","longrightarrow;":"\u27f6","looparrowleft;":"\u21ab","looparrowright;":"\u21ac","lopar;":"\u2985","lopf;":"\ud835\udd5d","loplus;":"\u2a2d","lotimes;":"\u2a34","lowast;":"\u2217","lowbar;":"_","loz;":"\u25ca","lozenge;":"\u25ca","lozf;":"\u29eb","lpar;":"(","lparlt;":"\u2993","lrarr;":"\u21c6","lrcorner;":"\u231f","lrhar;":"\u21cb","lrhard;":"\u296d","lrm;":"\u200e","lrtri;":"\u22bf","lsaquo;":"\u2039","lscr;":"\ud835\udcc1","lsh;":"\u21b0","lsim;":"\u2272","lsime;":"\u2a8d","lsimg;":"\u2a8f","lsqb;":"[","lsquo;":"\u2018","lsquor;":"\u201a","lstrok;":"\u0142",lt:"<","lt;":"<","ltcc;":"\u2aa6","ltcir;":"\u2a79","ltdot;":"\u22d6","lthree;":"\u22cb","ltimes;":"\u22c9","ltlarr;":"\u2976","ltquest;":"\u2a7b","ltrPar;":"\u2996","ltri;":"\u25c3","ltrie;":"\u22b4","ltrif;":"\u25c2","lurdshar;":"\u294a","luruhar;":"\u2966","lvertneqq;":"\u2268\ufe00","lvnE;":"\u2268\ufe00","mDDot;":"\u223a",macr:"\xaf","macr;":"\xaf","male;":"\u2642","malt;":"\u2720","maltese;":"\u2720","map;":"\u21a6","mapsto;":"\u21a6","mapstodown;":"\u21a7","mapstoleft;":"\u21a4","mapstoup;":"\u21a5","marker;":"\u25ae","mcomma;":"\u2a29","mcy;":"\u043c","mdash;":"\u2014","measuredangle;":"\u2221","mfr;":"\ud835\udd2a","mho;":"\u2127",micro:"\xb5","micro;":"\xb5","mid;":"\u2223","midast;":"*","midcir;":"\u2af0",middot:"\xb7","middot;":"\xb7","minus;":"\u2212","minusb;":"\u229f","minusd;":"\u2238","minusdu;":"\u2a2a","mlcp;":"\u2adb","mldr;":"\u2026","mnplus;":"\u2213","models;":"\u22a7","mopf;":"\ud835\udd5e","mp;":"\u2213","mscr;":"\ud835\udcc2","mstpos;":"\u223e","mu;":"\u03bc","multimap;":"\u22b8","mumap;":"\u22b8","nGg;":"\u22d9\u0338","nGt;":"\u226b\u20d2","nGtv;":"\u226b\u0338","nLeftarrow;":"\u21cd","nLeftrightarrow;":"\u21ce","nLl;":"\u22d8\u0338","nLt;":"\u226a\u20d2","nLtv;":"\u226a\u0338","nRightarrow;":"\u21cf","nVDash;":"\u22af","nVdash;":"\u22ae","nabla;":"\u2207","nacute;":"\u0144","nang;":"\u2220\u20d2","nap;":"\u2249","napE;":"\u2a70\u0338","napid;":"\u224b\u0338","napos;":"\u0149","napprox;":"\u2249","natur;":"\u266e","natural;":"\u266e","naturals;":"\u2115",nbsp:"\xa0","nbsp;":"\xa0","nbump;":"\u224e\u0338","nbumpe;":"\u224f\u0338","ncap;":"\u2a43","ncaron;":"\u0148","ncedil;":"\u0146","ncong;":"\u2247","ncongdot;":"\u2a6d\u0338","ncup;":"\u2a42","ncy;":"\u043d","ndash;":"\u2013","ne;":"\u2260","neArr;":"\u21d7","nearhk;":"\u2924","nearr;":"\u2197","nearrow;":"\u2197","nedot;":"\u2250\u0338","nequiv;":"\u2262","nesear;":"\u2928","nesim;":"\u2242\u0338","nexist;":"\u2204","nexists;":"\u2204","nfr;":"\ud835\udd2b","ngE;":"\u2267\u0338","nge;":"\u2271","ngeq;":"\u2271","ngeqq;":"\u2267\u0338","ngeqslant;":"\u2a7e\u0338","nges;":"\u2a7e\u0338","ngsim;":"\u2275","ngt;":"\u226f","ngtr;":"\u226f","nhArr;":"\u21ce","nharr;":"\u21ae","nhpar;":"\u2af2","ni;":"\u220b","nis;":"\u22fc","nisd;":"\u22fa","niv;":"\u220b","njcy;":"\u045a","nlArr;":"\u21cd","nlE;":"\u2266\u0338","nlarr;":"\u219a","nldr;":"\u2025","nle;":"\u2270","nleftarrow;":"\u219a","nleftrightarrow;":"\u21ae","nleq;":"\u2270","nleqq;":"\u2266\u0338","nleqslant;":"\u2a7d\u0338","nles;":"\u2a7d\u0338","nless;":"\u226e","nlsim;":"\u2274","nlt;":"\u226e","nltri;":"\u22ea","nltrie;":"\u22ec","nmid;":"\u2224","nopf;":"\ud835\udd5f",not:"\xac","not;":"\xac","notin;":"\u2209","notinE;":"\u22f9\u0338","notindot;":"\u22f5\u0338","notinva;":"\u2209","notinvb;":"\u22f7","notinvc;":"\u22f6","notni;":"\u220c","notniva;":"\u220c","notnivb;":"\u22fe","notnivc;":"\u22fd","npar;":"\u2226","nparallel;":"\u2226","nparsl;":"\u2afd\u20e5","npart;":"\u2202\u0338","npolint;":"\u2a14","npr;":"\u2280","nprcue;":"\u22e0","npre;":"\u2aaf\u0338","nprec;":"\u2280","npreceq;":"\u2aaf\u0338","nrArr;":"\u21cf","nrarr;":"\u219b","nrarrc;":"\u2933\u0338","nrarrw;":"\u219d\u0338","nrightarrow;":"\u219b","nrtri;":"\u22eb","nrtrie;":"\u22ed","nsc;":"\u2281","nsccue;":"\u22e1","nsce;":"\u2ab0\u0338","nscr;":"\ud835\udcc3","nshortmid;":"\u2224","nshortparallel;":"\u2226","nsim;":"\u2241","nsime;":"\u2244","nsimeq;":"\u2244","nsmid;":"\u2224","nspar;":"\u2226","nsqsube;":"\u22e2","nsqsupe;":"\u22e3","nsub;":"\u2284","nsubE;":"\u2ac5\u0338","nsube;":"\u2288","nsubset;":"\u2282\u20d2","nsubseteq;":"\u2288","nsubseteqq;":"\u2ac5\u0338","nsucc;":"\u2281","nsucceq;":"\u2ab0\u0338","nsup;":"\u2285","nsupE;":"\u2ac6\u0338","nsupe;":"\u2289","nsupset;":"\u2283\u20d2","nsupseteq;":"\u2289","nsupseteqq;":"\u2ac6\u0338","ntgl;":"\u2279",ntilde:"\xf1","ntilde;":"\xf1","ntlg;":"\u2278","ntriangleleft;":"\u22ea","ntrianglelefteq;":"\u22ec","ntriangleright;":"\u22eb","ntrianglerighteq;":"\u22ed","nu;":"\u03bd","num;":"#","numero;":"\u2116","numsp;":"\u2007","nvDash;":"\u22ad","nvHarr;":"\u2904","nvap;":"\u224d\u20d2","nvdash;":"\u22ac","nvge;":"\u2265\u20d2","nvgt;":">\u20d2","nvinfin;":"\u29de","nvlArr;":"\u2902","nvle;":"\u2264\u20d2","nvlt;":"<\u20d2","nvltrie;":"\u22b4\u20d2","nvrArr;":"\u2903","nvrtrie;":"\u22b5\u20d2","nvsim;":"\u223c\u20d2","nwArr;":"\u21d6","nwarhk;":"\u2923","nwarr;":"\u2196","nwarrow;":"\u2196","nwnear;":"\u2927","oS;":"\u24c8",oacute:"\xf3","oacute;":"\xf3","oast;":"\u229b","ocir;":"\u229a",ocirc:"\xf4","ocirc;":"\xf4","ocy;":"\u043e","odash;":"\u229d","odblac;":"\u0151","odiv;":"\u2a38","odot;":"\u2299","odsold;":"\u29bc","oelig;":"\u0153","ofcir;":"\u29bf","ofr;":"\ud835\udd2c","ogon;":"\u02db",ograve:"\xf2","ograve;":"\xf2","ogt;":"\u29c1","ohbar;":"\u29b5","ohm;":"\u03a9","oint;":"\u222e","olarr;":"\u21ba","olcir;":"\u29be","olcross;":"\u29bb","oline;":"\u203e","olt;":"\u29c0","omacr;":"\u014d","omega;":"\u03c9","omicron;":"\u03bf","omid;":"\u29b6","ominus;":"\u2296","oopf;":"\ud835\udd60","opar;":"\u29b7","operp;":"\u29b9","oplus;":"\u2295","or;":"\u2228","orarr;":"\u21bb","ord;":"\u2a5d","order;":"\u2134","orderof;":"\u2134",ordf:"\xaa","ordf;":"\xaa",ordm:"\xba","ordm;":"\xba","origof;":"\u22b6","oror;":"\u2a56","orslope;":"\u2a57","orv;":"\u2a5b","oscr;":"\u2134",oslash:"\xf8","oslash;":"\xf8","osol;":"\u2298",otilde:"\xf5","otilde;":"\xf5","otimes;":"\u2297","otimesas;":"\u2a36",ouml:"\xf6","ouml;":"\xf6","ovbar;":"\u233d","par;":"\u2225",para:"\xb6","para;":"\xb6","parallel;":"\u2225","parsim;":"\u2af3","parsl;":"\u2afd","part;":"\u2202","pcy;":"\u043f","percnt;":"%","period;":".","permil;":"\u2030","perp;":"\u22a5","pertenk;":"\u2031","pfr;":"\ud835\udd2d","phi;":"\u03c6","phiv;":"\u03d5","phmmat;":"\u2133","phone;":"\u260e","pi;":"\u03c0","pitchfork;":"\u22d4","piv;":"\u03d6","planck;":"\u210f","planckh;":"\u210e","plankv;":"\u210f","plus;":"+","plusacir;":"\u2a23","plusb;":"\u229e","pluscir;":"\u2a22","plusdo;":"\u2214","plusdu;":"\u2a25","pluse;":"\u2a72",plusmn:"\xb1","plusmn;":"\xb1","plussim;":"\u2a26","plustwo;":"\u2a27","pm;":"\xb1","pointint;":"\u2a15","popf;":"\ud835\udd61",pound:"\xa3","pound;":"\xa3","pr;":"\u227a","prE;":"\u2ab3","prap;":"\u2ab7","prcue;":"\u227c","pre;":"\u2aaf","prec;":"\u227a","precapprox;":"\u2ab7","preccurlyeq;":"\u227c","preceq;":"\u2aaf","precnapprox;":"\u2ab9","precneqq;":"\u2ab5","precnsim;":"\u22e8","precsim;":"\u227e","prime;":"\u2032","primes;":"\u2119","prnE;":"\u2ab5","prnap;":"\u2ab9","prnsim;":"\u22e8","prod;":"\u220f","profalar;":"\u232e","profline;":"\u2312","profsurf;":"\u2313","prop;":"\u221d","propto;":"\u221d","prsim;":"\u227e","prurel;":"\u22b0","pscr;":"\ud835\udcc5","psi;":"\u03c8","puncsp;":"\u2008","qfr;":"\ud835\udd2e","qint;":"\u2a0c","qopf;":"\ud835\udd62","qprime;":"\u2057","qscr;":"\ud835\udcc6","quaternions;":"\u210d","quatint;":"\u2a16","quest;":"?","questeq;":"\u225f",quot:'"',"quot;":'"',"rAarr;":"\u21db","rArr;":"\u21d2","rAtail;":"\u291c","rBarr;":"\u290f","rHar;":"\u2964","race;":"\u223d\u0331","racute;":"\u0155","radic;":"\u221a","raemptyv;":"\u29b3","rang;":"\u27e9","rangd;":"\u2992","range;":"\u29a5","rangle;":"\u27e9",raquo:"\xbb","raquo;":"\xbb","rarr;":"\u2192","rarrap;":"\u2975","rarrb;":"\u21e5","rarrbfs;":"\u2920","rarrc;":"\u2933","rarrfs;":"\u291e","rarrhk;":"\u21aa","rarrlp;":"\u21ac","rarrpl;":"\u2945","rarrsim;":"\u2974","rarrtl;":"\u21a3","rarrw;":"\u219d","ratail;":"\u291a","ratio;":"\u2236","rationals;":"\u211a","rbarr;":"\u290d","rbbrk;":"\u2773","rbrace;":"}","rbrack;":"]","rbrke;":"\u298c","rbrksld;":"\u298e","rbrkslu;":"\u2990","rcaron;":"\u0159","rcedil;":"\u0157","rceil;":"\u2309","rcub;":"}","rcy;":"\u0440","rdca;":"\u2937","rdldhar;":"\u2969","rdquo;":"\u201d","rdquor;":"\u201d","rdsh;":"\u21b3","real;":"\u211c","realine;":"\u211b","realpart;":"\u211c","reals;":"\u211d","rect;":"\u25ad",reg:"\xae","reg;":"\xae","rfisht;":"\u297d","rfloor;":"\u230b","rfr;":"\ud835\udd2f","rhard;":"\u21c1","rharu;":"\u21c0","rharul;":"\u296c","rho;":"\u03c1","rhov;":"\u03f1","rightarrow;":"\u2192","rightarrowtail;":"\u21a3","rightharpoondown;":"\u21c1","rightharpoonup;":"\u21c0","rightleftarrows;":"\u21c4","rightleftharpoons;":"\u21cc","rightrightarrows;":"\u21c9","rightsquigarrow;":"\u219d","rightthreetimes;":"\u22cc","ring;":"\u02da","risingdotseq;":"\u2253","rlarr;":"\u21c4","rlhar;":"\u21cc","rlm;":"\u200f","rmoust;":"\u23b1","rmoustache;":"\u23b1","rnmid;":"\u2aee","roang;":"\u27ed","roarr;":"\u21fe","robrk;":"\u27e7","ropar;":"\u2986","ropf;":"\ud835\udd63","roplus;":"\u2a2e","rotimes;":"\u2a35","rpar;":")","rpargt;":"\u2994","rppolint;":"\u2a12","rrarr;":"\u21c9","rsaquo;":"\u203a","rscr;":"\ud835\udcc7","rsh;":"\u21b1","rsqb;":"]","rsquo;":"\u2019","rsquor;":"\u2019","rthree;":"\u22cc","rtimes;":"\u22ca","rtri;":"\u25b9","rtrie;":"\u22b5","rtrif;":"\u25b8","rtriltri;":"\u29ce","ruluhar;":"\u2968","rx;":"\u211e","sacute;":"\u015b","sbquo;":"\u201a","sc;":"\u227b","scE;":"\u2ab4","scap;":"\u2ab8","scaron;":"\u0161","sccue;":"\u227d","sce;":"\u2ab0","scedil;":"\u015f","scirc;":"\u015d","scnE;":"\u2ab6","scnap;":"\u2aba","scnsim;":"\u22e9","scpolint;":"\u2a13","scsim;":"\u227f","scy;":"\u0441","sdot;":"\u22c5","sdotb;":"\u22a1","sdote;":"\u2a66","seArr;":"\u21d8","searhk;":"\u2925","searr;":"\u2198","searrow;":"\u2198",sect:"\xa7","sect;":"\xa7","semi;":";","seswar;":"\u2929","setminus;":"\u2216","setmn;":"\u2216","sext;":"\u2736","sfr;":"\ud835\udd30","sfrown;":"\u2322","sharp;":"\u266f","shchcy;":"\u0449","shcy;":"\u0448","shortmid;":"\u2223","shortparallel;":"\u2225",shy:"\xad","shy;":"\xad","sigma;":"\u03c3","sigmaf;":"\u03c2","sigmav;":"\u03c2","sim;":"\u223c","simdot;":"\u2a6a","sime;":"\u2243","simeq;":"\u2243","simg;":"\u2a9e","simgE;":"\u2aa0","siml;":"\u2a9d","simlE;":"\u2a9f","simne;":"\u2246","simplus;":"\u2a24","simrarr;":"\u2972","slarr;":"\u2190","smallsetminus;":"\u2216","smashp;":"\u2a33","smeparsl;":"\u29e4","smid;":"\u2223","smile;":"\u2323","smt;":"\u2aaa","smte;":"\u2aac","smtes;":"\u2aac\ufe00","softcy;":"\u044c","sol;":"/","solb;":"\u29c4","solbar;":"\u233f","sopf;":"\ud835\udd64","spades;":"\u2660","spadesuit;":"\u2660","spar;":"\u2225","sqcap;":"\u2293","sqcaps;":"\u2293\ufe00","sqcup;":"\u2294","sqcups;":"\u2294\ufe00","sqsub;":"\u228f","sqsube;":"\u2291","sqsubset;":"\u228f","sqsubseteq;":"\u2291","sqsup;":"\u2290","sqsupe;":"\u2292","sqsupset;":"\u2290","sqsupseteq;":"\u2292","squ;":"\u25a1","square;":"\u25a1","squarf;":"\u25aa","squf;":"\u25aa","srarr;":"\u2192","sscr;":"\ud835\udcc8","ssetmn;":"\u2216","ssmile;":"\u2323","sstarf;":"\u22c6","star;":"\u2606","starf;":"\u2605","straightepsilon;":"\u03f5","straightphi;":"\u03d5","strns;":"\xaf","sub;":"\u2282","subE;":"\u2ac5","subdot;":"\u2abd","sube;":"\u2286","subedot;":"\u2ac3","submult;":"\u2ac1","subnE;":"\u2acb","subne;":"\u228a","subplus;":"\u2abf","subrarr;":"\u2979","subset;":"\u2282","subseteq;":"\u2286","subseteqq;":"\u2ac5","subsetneq;":"\u228a","subsetneqq;":"\u2acb","subsim;":"\u2ac7","subsub;":"\u2ad5","subsup;":"\u2ad3","succ;":"\u227b","succapprox;":"\u2ab8","succcurlyeq;":"\u227d","succeq;":"\u2ab0","succnapprox;":"\u2aba","succneqq;":"\u2ab6","succnsim;":"\u22e9","succsim;":"\u227f","sum;":"\u2211","sung;":"\u266a",sup1:"\xb9","sup1;":"\xb9",sup2:"\xb2","sup2;":"\xb2",sup3:"\xb3","sup3;":"\xb3","sup;":"\u2283","supE;":"\u2ac6","supdot;":"\u2abe","supdsub;":"\u2ad8","supe;":"\u2287","supedot;":"\u2ac4","suphsol;":"\u27c9","suphsub;":"\u2ad7","suplarr;":"\u297b","supmult;":"\u2ac2","supnE;":"\u2acc","supne;":"\u228b","supplus;":"\u2ac0","supset;":"\u2283","supseteq;":"\u2287","supseteqq;":"\u2ac6","supsetneq;":"\u228b","supsetneqq;":"\u2acc","supsim;":"\u2ac8","supsub;":"\u2ad4","supsup;":"\u2ad6","swArr;":"\u21d9","swarhk;":"\u2926","swarr;":"\u2199","swarrow;":"\u2199","swnwar;":"\u292a",szlig:"\xdf","szlig;":"\xdf","target;":"\u2316","tau;":"\u03c4","tbrk;":"\u23b4","tcaron;":"\u0165","tcedil;":"\u0163","tcy;":"\u0442","tdot;":"\u20db","telrec;":"\u2315","tfr;":"\ud835\udd31","there4;":"\u2234","therefore;":"\u2234","theta;":"\u03b8","thetasym;":"\u03d1","thetav;":"\u03d1","thickapprox;":"\u2248","thicksim;":"\u223c","thinsp;":"\u2009","thkap;":"\u2248","thksim;":"\u223c",thorn:"\xfe","thorn;":"\xfe","tilde;":"\u02dc",times:"\xd7","times;":"\xd7","timesb;":"\u22a0","timesbar;":"\u2a31","timesd;":"\u2a30","tint;":"\u222d","toea;":"\u2928","top;":"\u22a4","topbot;":"\u2336","topcir;":"\u2af1","topf;":"\ud835\udd65","topfork;":"\u2ada","tosa;":"\u2929","tprime;":"\u2034","trade;":"\u2122","triangle;":"\u25b5","triangledown;":"\u25bf","triangleleft;":"\u25c3","trianglelefteq;":"\u22b4","triangleq;":"\u225c","triangleright;":"\u25b9","trianglerighteq;":"\u22b5","tridot;":"\u25ec","trie;":"\u225c","triminus;":"\u2a3a","triplus;":"\u2a39","trisb;":"\u29cd","tritime;":"\u2a3b","trpezium;":"\u23e2","tscr;":"\ud835\udcc9","tscy;":"\u0446","tshcy;":"\u045b","tstrok;":"\u0167","twixt;":"\u226c","twoheadleftarrow;":"\u219e","twoheadrightarrow;":"\u21a0","uArr;":"\u21d1","uHar;":"\u2963",uacute:"\xfa","uacute;":"\xfa","uarr;":"\u2191","ubrcy;":"\u045e","ubreve;":"\u016d",ucirc:"\xfb","ucirc;":"\xfb","ucy;":"\u0443","udarr;":"\u21c5","udblac;":"\u0171","udhar;":"\u296e","ufisht;":"\u297e","ufr;":"\ud835\udd32",ugrave:"\xf9","ugrave;":"\xf9","uharl;":"\u21bf","uharr;":"\u21be","uhblk;":"\u2580","ulcorn;":"\u231c","ulcorner;":"\u231c","ulcrop;":"\u230f","ultri;":"\u25f8","umacr;":"\u016b",uml:"\xa8","uml;":"\xa8","uogon;":"\u0173","uopf;":"\ud835\udd66","uparrow;":"\u2191","updownarrow;":"\u2195","upharpoonleft;":"\u21bf","upharpoonright;":"\u21be","uplus;":"\u228e","upsi;":"\u03c5","upsih;":"\u03d2","upsilon;":"\u03c5","upuparrows;":"\u21c8","urcorn;":"\u231d","urcorner;":"\u231d","urcrop;":"\u230e","uring;":"\u016f","urtri;":"\u25f9","uscr;":"\ud835\udcca","utdot;":"\u22f0","utilde;":"\u0169","utri;":"\u25b5","utrif;":"\u25b4","uuarr;":"\u21c8",uuml:"\xfc","uuml;":"\xfc","uwangle;":"\u29a7","vArr;":"\u21d5","vBar;":"\u2ae8","vBarv;":"\u2ae9","vDash;":"\u22a8","vangrt;":"\u299c","varepsilon;":"\u03f5","varkappa;":"\u03f0","varnothing;":"\u2205","varphi;":"\u03d5","varpi;":"\u03d6","varpropto;":"\u221d","varr;":"\u2195","varrho;":"\u03f1","varsigma;":"\u03c2","varsubsetneq;":"\u228a\ufe00","varsubsetneqq;":"\u2acb\ufe00","varsupsetneq;":"\u228b\ufe00","varsupsetneqq;":"\u2acc\ufe00","vartheta;":"\u03d1","vartriangleleft;":"\u22b2","vartriangleright;":"\u22b3","vcy;":"\u0432","vdash;":"\u22a2","vee;":"\u2228","veebar;":"\u22bb","veeeq;":"\u225a","vellip;":"\u22ee","verbar;":"|","vert;":"|","vfr;":"\ud835\udd33","vltri;":"\u22b2","vnsub;":"\u2282\u20d2","vnsup;":"\u2283\u20d2","vopf;":"\ud835\udd67","vprop;":"\u221d","vrtri;":"\u22b3","vscr;":"\ud835\udccb","vsubnE;":"\u2acb\ufe00","vsubne;":"\u228a\ufe00","vsupnE;":"\u2acc\ufe00","vsupne;":"\u228b\ufe00","vzigzag;":"\u299a","wcirc;":"\u0175","wedbar;":"\u2a5f","wedge;":"\u2227","wedgeq;":"\u2259","weierp;":"\u2118","wfr;":"\ud835\udd34","wopf;":"\ud835\udd68","wp;":"\u2118","wr;":"\u2240","wreath;":"\u2240","wscr;":"\ud835\udccc","xcap;":"\u22c2","xcirc;":"\u25ef","xcup;":"\u22c3","xdtri;":"\u25bd","xfr;":"\ud835\udd35","xhArr;":"\u27fa","xharr;":"\u27f7","xi;":"\u03be","xlArr;":"\u27f8","xlarr;":"\u27f5","xmap;":"\u27fc","xnis;":"\u22fb","xodot;":"\u2a00","xopf;":"\ud835\udd69","xoplus;":"\u2a01","xotime;":"\u2a02","xrArr;":"\u27f9","xrarr;":"\u27f6","xscr;":"\ud835\udccd","xsqcup;":"\u2a06","xuplus;":"\u2a04","xutri;":"\u25b3","xvee;":"\u22c1","xwedge;":"\u22c0",yacute:"\xfd","yacute;":"\xfd","yacy;":"\u044f","ycirc;":"\u0177","ycy;":"\u044b",yen:"\xa5","yen;":"\xa5","yfr;":"\ud835\udd36","yicy;":"\u0457","yopf;":"\ud835\udd6a","yscr;":"\ud835\udcce","yucy;":"\u044e",yuml:"\xff","yuml;":"\xff","zacute;":"\u017a","zcaron;":"\u017e","zcy;":"\u0437","zdot;":"\u017c","zeetrf;":"\u2128","zeta;":"\u03b6","zfr;":"\ud835\udd37","zhcy;":"\u0436","zigrarr;":"\u21dd","zopf;":"\ud835\udd6b","zscr;":"\ud835\udccf","zwj;":"\u200d","zwnj;":"\u200c"},B.b5,t.B)
B.b9=A.a(s(["null-character","invalid-codepoint","incorrectly-placed-solidus","incorrect-cr-newline-entity","illegal-windows-1252-entity","cant-convert-numeric-entity","illegal-codepoint-for-numeric-entity","numeric-entity-without-semicolon","expected-numeric-entity-but-got-eof","expected-numeric-entity","named-entity-without-semicolon","expected-named-entity","attributes-in-end-tag","self-closing-flag-on-end-tag","expected-tag-name-but-got-right-bracket","expected-tag-name-but-got-question-mark","expected-tag-name",u.g,"expected-closing-tag-but-got-eof","expected-closing-tag-but-got-char","eof-in-tag-name","expected-attribute-name-but-got-eof","eof-in-attribute-name","invalid-character-in-attribute-name","duplicate-attribute","expected-end-of-tag-name-but-got-eof","expected-attribute-value-but-got-eof",u.A,"equals-in-unquoted-attribute-value",u.V,"invalid-character-after-attribute-name",u.H,"eof-in-attribute-value-double-quote","eof-in-attribute-value-single-quote","eof-in-attribute-value-no-quotes","unexpected-EOF-after-solidus-in-tag",u.B,"expected-dashes-or-doctype",u.d,"unexpected-space-after-double-dash-in-comment","incorrect-comment","eof-in-comment","eof-in-comment-end-dash",u.K,"eof-in-comment-double-dash","eof-in-comment-end-space-state","eof-in-comment-end-bang-state","unexpected-char-in-comment","need-space-after-doctype",u.f,"expected-doctype-name-but-got-eof","eof-in-doctype-name","eof-in-doctype",u.S,"unexpected-end-of-doctype","unexpected-char-in-doctype","eof-in-innerhtml","unexpected-doctype","non-html-root","expected-doctype-but-got-eof","unknown-doctype","expected-doctype-but-got-chars","expected-doctype-but-got-start-tag","expected-doctype-but-got-end-tag","end-tag-after-implied-root","expected-named-closing-tag-but-got-eof","two-heads-are-not-better-than-one","unexpected-end-tag","unexpected-start-tag-out-of-my-head","unexpected-start-tag","missing-end-tag","missing-end-tags","unexpected-start-tag-implies-end-tag","unexpected-start-tag-treated-as","deprecated-tag","unexpected-start-tag-ignored","expected-one-end-tag-but-got-another","end-tag-too-early","end-tag-too-early-named","end-tag-too-early-ignored","adoption-agency-1.1","adoption-agency-1.2","adoption-agency-1.3","unexpected-end-tag-treated-as","no-end-tag","unexpected-implied-end-tag-in-table","unexpected-implied-end-tag-in-table-body","unexpected-char-implies-table-voodoo","unexpected-hidden-input-in-table","unexpected-form-in-table",u.M,"unexpected-end-tag-implies-table-voodoo","unexpected-cell-in-table-body","unexpected-cell-end-tag","unexpected-end-tag-in-table-body","unexpected-implied-end-tag-in-table-row","unexpected-end-tag-in-table-row","unexpected-select-in-select","unexpected-input-in-select","unexpected-start-tag-in-select","unexpected-end-tag-in-select",u.a,u.r,"unexpected-char-after-body","unexpected-start-tag-after-body","unexpected-end-tag-after-body","unexpected-char-in-frameset","unexpected-start-tag-in-frameset",u.q,"unexpected-end-tag-in-frameset","unexpected-char-after-frameset","unexpected-start-tag-after-frameset","unexpected-end-tag-after-frameset","unexpected-end-tag-after-body-innerhtml","expected-eof-but-got-char","expected-eof-but-got-start-tag","expected-eof-but-got-end-tag","eof-in-table","eof-in-select","eof-in-frameset","eof-in-script-in-script","eof-in-foreign-lands","non-void-element-with-trailing-solidus",u.G,"unexpected-end-tag-before-html","undefined-error"]),t.s)
B.bE=new A.u(126,{"null-character":"Null character in input stream, replaced with U+FFFD.","invalid-codepoint":"Invalid codepoint in stream.","incorrectly-placed-solidus":"Solidus (/) incorrectly placed in tag.","incorrect-cr-newline-entity":"Incorrect CR newline entity, replaced with LF.","illegal-windows-1252-entity":"Entity used with illegal number (windows-1252 reference).","cant-convert-numeric-entity":"Numeric entity couldn't be converted to character (codepoint U+%(charAsInt)08x).","illegal-codepoint-for-numeric-entity":"Numeric entity represents an illegal codepoint: U+%(charAsInt)08x.","numeric-entity-without-semicolon":"Numeric entity didn't end with ';'.","expected-numeric-entity-but-got-eof":"Numeric entity expected. Got end of file instead.","expected-numeric-entity":"Numeric entity expected but none found.","named-entity-without-semicolon":"Named entity didn't end with ';'.","expected-named-entity":"Named entity expected. Got none.","attributes-in-end-tag":"End tag contains unexpected attributes.","self-closing-flag-on-end-tag":"End tag contains unexpected self-closing flag.","expected-tag-name-but-got-right-bracket":"Expected tag name. Got '>' instead.","expected-tag-name-but-got-question-mark":"Expected tag name. Got '?' instead. (HTML doesn't support processing instructions.)","expected-tag-name":"Expected tag name. Got something else instead","expected-closing-tag-but-got-right-bracket":"Expected closing tag. Got '>' instead. Ignoring '</>'.","expected-closing-tag-but-got-eof":"Expected closing tag. Unexpected end of file.","expected-closing-tag-but-got-char":"Expected closing tag. Unexpected character '%(data)s' found.","eof-in-tag-name":"Unexpected end of file in the tag name.","expected-attribute-name-but-got-eof":"Unexpected end of file. Expected attribute name instead.","eof-in-attribute-name":"Unexpected end of file in attribute name.","invalid-character-in-attribute-name":"Invalid character in attribute name","duplicate-attribute":"Dropped duplicate attribute on tag.","expected-end-of-tag-name-but-got-eof":"Unexpected end of file. Expected = or end of tag.","expected-attribute-value-but-got-eof":"Unexpected end of file. Expected attribute value.","expected-attribute-value-but-got-right-bracket":"Expected attribute value. Got '>' instead.","equals-in-unquoted-attribute-value":"Unexpected = in unquoted attribute","unexpected-character-in-unquoted-attribute-value":"Unexpected character in unquoted attribute","invalid-character-after-attribute-name":"Unexpected character after attribute name.","unexpected-character-after-attribute-value":"Unexpected character after attribute value.","eof-in-attribute-value-double-quote":'Unexpected end of file in attribute value (".',"eof-in-attribute-value-single-quote":"Unexpected end of file in attribute value (').","eof-in-attribute-value-no-quotes":"Unexpected end of file in attribute value.","unexpected-EOF-after-solidus-in-tag":"Unexpected end of file in tag. Expected >","unexpected-character-after-soldius-in-tag":"Unexpected character after / in tag. Expected >","expected-dashes-or-doctype":"Expected '--' or 'DOCTYPE'. Not found.","unexpected-bang-after-double-dash-in-comment":"Unexpected ! after -- in comment","unexpected-space-after-double-dash-in-comment":"Unexpected space after -- in comment","incorrect-comment":"Incorrect comment.","eof-in-comment":"Unexpected end of file in comment.","eof-in-comment-end-dash":"Unexpected end of file in comment (-)","unexpected-dash-after-double-dash-in-comment":"Unexpected '-' after '--' found in comment.","eof-in-comment-double-dash":"Unexpected end of file in comment (--).","eof-in-comment-end-space-state":"Unexpected end of file in comment.","eof-in-comment-end-bang-state":"Unexpected end of file in comment.","unexpected-char-in-comment":"Unexpected character in comment found.","need-space-after-doctype":"No space after literal string 'DOCTYPE'.","expected-doctype-name-but-got-right-bracket":"Unexpected > character. Expected DOCTYPE name.","expected-doctype-name-but-got-eof":"Unexpected end of file. Expected DOCTYPE name.","eof-in-doctype-name":"Unexpected end of file in DOCTYPE name.","eof-in-doctype":"Unexpected end of file in DOCTYPE.","expected-space-or-right-bracket-in-doctype":"Expected space or '>'. Got '%(data)s'","unexpected-end-of-doctype":"Unexpected end of DOCTYPE.","unexpected-char-in-doctype":"Unexpected character in DOCTYPE.","eof-in-innerhtml":"XXX innerHTML EOF","unexpected-doctype":"Unexpected DOCTYPE. Ignored.","non-html-root":"html needs to be the first start tag.","expected-doctype-but-got-eof":"Unexpected End of file. Expected DOCTYPE.","unknown-doctype":"Erroneous DOCTYPE.","expected-doctype-but-got-chars":"Unexpected non-space characters. Expected DOCTYPE.","expected-doctype-but-got-start-tag":"Unexpected start tag (%(name)s). Expected DOCTYPE.","expected-doctype-but-got-end-tag":"Unexpected end tag (%(name)s). Expected DOCTYPE.","end-tag-after-implied-root":"Unexpected end tag (%(name)s) after the (implied) root element.","expected-named-closing-tag-but-got-eof":"Unexpected end of file. Expected end tag (%(name)s).","two-heads-are-not-better-than-one":"Unexpected start tag head in existing head. Ignored.","unexpected-end-tag":"Unexpected end tag (%(name)s). Ignored.","unexpected-start-tag-out-of-my-head":"Unexpected start tag (%(name)s) that can be in head. Moved.","unexpected-start-tag":"Unexpected start tag (%(name)s).","missing-end-tag":"Missing end tag (%(name)s).","missing-end-tags":"Missing end tags (%(name)s).","unexpected-start-tag-implies-end-tag":"Unexpected start tag (%(startName)s) implies end tag (%(endName)s).","unexpected-start-tag-treated-as":"Unexpected start tag (%(originalName)s). Treated as %(newName)s.","deprecated-tag":"Unexpected start tag %(name)s. Don't use it!","unexpected-start-tag-ignored":"Unexpected start tag %(name)s. Ignored.","expected-one-end-tag-but-got-another":"Unexpected end tag (%(gotName)s). Missing end tag (%(expectedName)s).","end-tag-too-early":"End tag (%(name)s) seen too early. Expected other end tag.","end-tag-too-early-named":"Unexpected end tag (%(gotName)s). Expected end tag (%(expectedName)s).","end-tag-too-early-ignored":"End tag (%(name)s) seen too early. Ignored.","adoption-agency-1.1":"End tag (%(name)s) violates step 1, paragraph 1 of the adoption agency algorithm.","adoption-agency-1.2":"End tag (%(name)s) violates step 1, paragraph 2 of the adoption agency algorithm.","adoption-agency-1.3":"End tag (%(name)s) violates step 1, paragraph 3 of the adoption agency algorithm.","unexpected-end-tag-treated-as":"Unexpected end tag (%(originalName)s). Treated as %(newName)s.","no-end-tag":"This element (%(name)s) has no end tag.","unexpected-implied-end-tag-in-table":"Unexpected implied end tag (%(name)s) in the table phase.","unexpected-implied-end-tag-in-table-body":"Unexpected implied end tag (%(name)s) in the table body phase.","unexpected-char-implies-table-voodoo":"Unexpected non-space characters in table context caused voodoo mode.","unexpected-hidden-input-in-table":"Unexpected input with type hidden in table context.","unexpected-form-in-table":"Unexpected form in table context.","unexpected-start-tag-implies-table-voodoo":"Unexpected start tag (%(name)s) in table context caused voodoo mode.","unexpected-end-tag-implies-table-voodoo":"Unexpected end tag (%(name)s) in table context caused voodoo mode.","unexpected-cell-in-table-body":"Unexpected table cell start tag (%(name)s) in the table body phase.","unexpected-cell-end-tag":"Got table cell end tag (%(name)s) while required end tags are missing.","unexpected-end-tag-in-table-body":"Unexpected end tag (%(name)s) in the table body phase. Ignored.","unexpected-implied-end-tag-in-table-row":"Unexpected implied end tag (%(name)s) in the table row phase.","unexpected-end-tag-in-table-row":"Unexpected end tag (%(name)s) in the table row phase. Ignored.","unexpected-select-in-select":"Unexpected select start tag in the select phase treated as select end tag.","unexpected-input-in-select":"Unexpected input start tag in the select phase.","unexpected-start-tag-in-select":"Unexpected start tag token (%(name)s in the select phase. Ignored.","unexpected-end-tag-in-select":"Unexpected end tag (%(name)s) in the select phase. Ignored.","unexpected-table-element-start-tag-in-select-in-table":"Unexpected table element start tag (%(name)s) in the select in table phase.","unexpected-table-element-end-tag-in-select-in-table":"Unexpected table element end tag (%(name)s) in the select in table phase.","unexpected-char-after-body":"Unexpected non-space characters in the after body phase.","unexpected-start-tag-after-body":"Unexpected start tag token (%(name)s) in the after body phase.","unexpected-end-tag-after-body":"Unexpected end tag token (%(name)s) in the after body phase.","unexpected-char-in-frameset":"Unepxected characters in the frameset phase. Characters ignored.","unexpected-start-tag-in-frameset":"Unexpected start tag token (%(name)s) in the frameset phase. Ignored.","unexpected-frameset-in-frameset-innerhtml":"Unexpected end tag token (frameset) in the frameset phase (innerHTML).","unexpected-end-tag-in-frameset":"Unexpected end tag token (%(name)s) in the frameset phase. Ignored.","unexpected-char-after-frameset":"Unexpected non-space characters in the after frameset phase. Ignored.","unexpected-start-tag-after-frameset":"Unexpected start tag (%(name)s) in the after frameset phase. Ignored.","unexpected-end-tag-after-frameset":"Unexpected end tag (%(name)s) in the after frameset phase. Ignored.","unexpected-end-tag-after-body-innerhtml":"Unexpected end tag after body(innerHtml)","expected-eof-but-got-char":"Unexpected non-space characters. Expected end of file.","expected-eof-but-got-start-tag":"Unexpected start tag (%(name)s). Expected end of file.","expected-eof-but-got-end-tag":"Unexpected end tag (%(name)s). Expected end of file.","eof-in-table":"Unexpected end of file. Expected table content.","eof-in-select":"Unexpected end of file. Expected select content.","eof-in-frameset":"Unexpected end of file. Expected frameset content.","eof-in-script-in-script":"Unexpected end of file. Expected script content.","eof-in-foreign-lands":"Unexpected end of file. Expected foreign content","non-void-element-with-trailing-solidus":"Trailing solidus not allowed on element %(name)s","unexpected-html-element-in-foreign-content":"Element %(name)s not allowed in a non-html context","unexpected-end-tag-before-html":"Unexpected end tag (%(name)s) before html.","undefined-error":"Undefined error (this sucks and should be fixed)"},B.b9,t.B)
B.ba=A.a(s(["altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","clippath","feblend","fecolormatrix","fecomponenttransfer","fecomposite","feconvolvematrix","fediffuselighting","fedisplacementmap","fedistantlight","feflood","fefunca","fefuncb","fefuncg","fefuncr","fegaussianblur","feimage","femerge","femergenode","femorphology","feoffset","fepointlight","fespecularlighting","fespotlight","fetile","feturbulence","foreignobject","glyphref","lineargradient","radialgradient","textpath"]),t.s)
B.bF=new A.u(36,{altglyph:"altGlyph",altglyphdef:"altGlyphDef",altglyphitem:"altGlyphItem",animatecolor:"animateColor",animatemotion:"animateMotion",animatetransform:"animateTransform",clippath:"clipPath",feblend:"feBlend",fecolormatrix:"feColorMatrix",fecomponenttransfer:"feComponentTransfer",fecomposite:"feComposite",feconvolvematrix:"feConvolveMatrix",fediffuselighting:"feDiffuseLighting",fedisplacementmap:"feDisplacementMap",fedistantlight:"feDistantLight",feflood:"feFlood",fefunca:"feFuncA",fefuncb:"feFuncB",fefuncg:"feFuncG",fefuncr:"feFuncR",fegaussianblur:"feGaussianBlur",feimage:"feImage",femerge:"feMerge",femergenode:"feMergeNode",femorphology:"feMorphology",feoffset:"feOffset",fepointlight:"fePointLight",fespecularlighting:"feSpecularLighting",fespotlight:"feSpotLight",fetile:"feTile",feturbulence:"feTurbulence",foreignobject:"foreignObject",glyphref:"glyphRef",lineargradient:"linearGradient",radialgradient:"radialGradient",textpath:"textPath"},B.ba,t.B)
B.bG=new A.ca([0,"\ufffd",13,"\r",128,"\u20ac",129,"\x81",130,"\u201a",131,"\u0192",132,"\u201e",133,"\u2026",134,"\u2020",135,"\u2021",136,"\u02c6",137,"\u2030",138,"\u0160",139,"\u2039",140,"\u0152",141,"\x8d",142,"\u017d",143,"\x8f",144,"\x90",145,"\u2018",146,"\u2019",147,"\u201c",148,"\u201d",149,"\u2022",150,"\u2013",151,"\u2014",152,"\u02dc",153,"\u2122",154,"\u0161",155,"\u203a",156,"\u0153",157,"\x9d",158,"\u017e",159,"\u0178"],A.aQ("ca<i,n>"))
B.J=new A.dh("severe")
B.an=new A.dh("warning")
B.am=new A.dh("info")
B.ak=new A.ca([B.J,"\x1b[31m",B.an,"\x1b[35m",B.am,"\x1b[32m"],t.ha)
B.c6=new A.ca([B.J,"error",B.an,"warning",B.am,"info"],t.ha)
B.bf=A.a(s(["xlink:actuate","xlink:arcrole","xlink:href","xlink:role","xlink:show","xlink:title","xlink:type","xml:base","xml:lang","xml:space","xmlns","xmlns:xlink"]),t.s)
B.aG=new A.aH("xlink","actuate","http://www.w3.org/1999/xlink")
B.aJ=new A.aH("xlink","arcrole","http://www.w3.org/1999/xlink")
B.aK=new A.aH("xlink","href","http://www.w3.org/1999/xlink")
B.aI=new A.aH("xlink","role","http://www.w3.org/1999/xlink")
B.aH=new A.aH("xlink","show","http://www.w3.org/1999/xlink")
B.aP=new A.aH("xlink","title","http://www.w3.org/1999/xlink")
B.aO=new A.aH("xlink","type","http://www.w3.org/1999/xlink")
B.aN=new A.aH("xml","base","http://www.w3.org/XML/1998/namespace")
B.aL=new A.aH("xml","lang","http://www.w3.org/XML/1998/namespace")
B.aE=new A.aH("xml","space","http://www.w3.org/XML/1998/namespace")
B.aM=new A.aH(null,"xmlns","http://www.w3.org/2000/xmlns/")
B.aF=new A.aH("xmlns","xlink","http://www.w3.org/2000/xmlns/")
B.c7=new A.u(12,{"xlink:actuate":B.aG,"xlink:arcrole":B.aJ,"xlink:href":B.aK,"xlink:role":B.aI,"xlink:show":B.aH,"xlink:title":B.aP,"xlink:type":B.aO,"xml:base":B.aN,"xml:lang":B.aL,"xml:space":B.aE,xmlns:B.aM,"xmlns:xlink":B.aF},B.bf,A.aQ("u<n,aH>"))
B.a_=new A.u(0,{},B.r,A.aQ("u<n,P>"))
B.bl=A.a(s([]),t.m)
B.al=new A.u(0,{},B.bl,A.aQ("u<@,@>"))
B.bm=A.a(s(["attributename","attributetype","basefrequency","baseprofile","calcmode","clippathunits","contentscripttype","contentstyletype","diffuseconstant","edgemode","externalresourcesrequired","filterres","filterunits","glyphref","gradienttransform","gradientunits","kernelmatrix","kernelunitlength","keypoints","keysplines","keytimes","lengthadjust","limitingconeangle","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","numoctaves","pathlength","patterncontentunits","patterntransform","patternunits","pointsatx","pointsaty","pointsatz","preservealpha","preserveaspectratio","primitiveunits","refx","refy","repeatcount","repeatdur","requiredextensions","requiredfeatures","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","surfacescale","systemlanguage","tablevalues","targetx","targety","textlength","viewbox","viewtarget","xchannelselector","ychannelselector","zoomandpan"]),t.s)
B.c8=new A.u(62,{attributename:"attributeName",attributetype:"attributeType",basefrequency:"baseFrequency",baseprofile:"baseProfile",calcmode:"calcMode",clippathunits:"clipPathUnits",contentscripttype:"contentScriptType",contentstyletype:"contentStyleType",diffuseconstant:"diffuseConstant",edgemode:"edgeMode",externalresourcesrequired:"externalResourcesRequired",filterres:"filterRes",filterunits:"filterUnits",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",limitingconeangle:"limitingConeAngle",markerheight:"markerHeight",markerunits:"markerUnits",markerwidth:"markerWidth",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",numoctaves:"numOctaves",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",refx:"refX",refy:"refY",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",specularconstant:"specularConstant",specularexponent:"specularExponent",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stitchtiles:"stitchTiles",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textlength:"textLength",viewbox:"viewBox",viewtarget:"viewTarget",xchannelselector:"xChannelSelector",ychannelselector:"yChannelSelector",zoomandpan:"zoomAndPan"},B.bm,t.B)
B.bu=A.a(s(["li","dt","dd"]),t.s)
B.bt=A.a(s(["li"]),t.s)
B.af=A.a(s(["dt","dd"]),t.s)
B.cK=new A.u(3,{li:B.bt,dt:B.af,dd:B.af},B.bu,A.aQ("u<n,k<n>>"))
B.bB=A.a(s(["437","850","852","855","857","860","861","862","863","865","866","869","ansix341968","ansix341986","arabic","ascii","asmo708","big5","big5hkscs","chinese","cp037","cp1026","cp154","cp367","cp424","cp437","cp500","cp775","cp819","cp850","cp852","cp855","cp857","cp860","cp861","cp862","cp863","cp864","cp865","cp866","cp869","cp936","cpgr","cpis","csascii","csbig5","cseuckr","cseucpkdfmtjapanese","csgb2312","cshproman8","csibm037","csibm1026","csibm424","csibm500","csibm855","csibm857","csibm860","csibm861","csibm863","csibm864","csibm865","csibm866","csibm869","csiso2022jp","csiso2022jp2","csiso2022kr","csiso58gb231280","csisolatin1","csisolatin2","csisolatin3","csisolatin4","csisolatin5","csisolatin6","csisolatinarabic","csisolatincyrillic","csisolatingreek","csisolatinhebrew","cskoi8r","csksc56011987","cspc775baltic","cspc850multilingual","cspc862latinhebrew","cspc8codepage437","cspcp852","csptcp154","csshiftjis","csunicode11utf7","cyrillic","cyrillicasian","ebcdiccpbe","ebcdiccpca","ebcdiccpch","ebcdiccphe","ebcdiccpnl","ebcdiccpus","ebcdiccpwt","ecma114","ecma118","elot928","eucjp","euckr","extendedunixcodepackedformatforjapanese","gb18030","gb2312","gb231280","gbk","greek","greek8","hebrew","hproman8","hzgb2312","ibm037","ibm1026","ibm367","ibm424","ibm437","ibm500","ibm775","ibm819","ibm850","ibm852","ibm855","ibm857","ibm860","ibm861","ibm862","ibm863","ibm864","ibm865","ibm866","ibm869","iso2022jp","iso2022jp2","iso2022kr","iso646irv1991","iso646us","iso88591","iso885910","iso8859101992","iso885911987","iso885913","iso885914","iso8859141998","iso885915","iso885916","iso8859162001","iso88592","iso885921987","iso88593","iso885931988","iso88594","iso885941988","iso88595","iso885951988","iso88596","iso885961987","iso88597","iso885971987","iso88598","iso885981988","iso88599","iso885991989","isoceltic","isoir100","isoir101","isoir109","isoir110","isoir126","isoir127","isoir138","isoir144","isoir148","isoir149","isoir157","isoir199","isoir226","isoir58","isoir6","koi8r","koi8u","korean","ksc5601","ksc56011987","ksc56011989","l1","l10","l2","l3","l4","l5","l6","l8","latin1","latin10","latin2","latin3","latin4","latin5","latin6","latin8","latin9","ms936","mskanji","pt154","ptcp154","r8","roman8","shiftjis","tis620","unicode11utf7","us","usascii","utf16","utf16be","utf16le","utf8","windows1250","windows1251","windows1252","windows1253","windows1254","windows1255","windows1256","windows1257","windows1258","windows936","x-x-big5"]),t.s)
B.cL=new A.u(227,{"437":"cp437","850":"cp850","852":"cp852","855":"cp855","857":"cp857","860":"cp860","861":"cp861","862":"cp862","863":"cp863","865":"cp865","866":"cp866","869":"cp869",ansix341968:"ascii",ansix341986:"ascii",arabic:"iso8859-6",ascii:"ascii",asmo708:"iso8859-6",big5:"big5",big5hkscs:"big5hkscs",chinese:"gbk",cp037:"cp037",cp1026:"cp1026",cp154:"ptcp154",cp367:"ascii",cp424:"cp424",cp437:"cp437",cp500:"cp500",cp775:"cp775",cp819:"windows-1252",cp850:"cp850",cp852:"cp852",cp855:"cp855",cp857:"cp857",cp860:"cp860",cp861:"cp861",cp862:"cp862",cp863:"cp863",cp864:"cp864",cp865:"cp865",cp866:"cp866",cp869:"cp869",cp936:"gbk",cpgr:"cp869",cpis:"cp861",csascii:"ascii",csbig5:"big5",cseuckr:"cp949",cseucpkdfmtjapanese:"euc_jp",csgb2312:"gbk",cshproman8:"hp-roman8",csibm037:"cp037",csibm1026:"cp1026",csibm424:"cp424",csibm500:"cp500",csibm855:"cp855",csibm857:"cp857",csibm860:"cp860",csibm861:"cp861",csibm863:"cp863",csibm864:"cp864",csibm865:"cp865",csibm866:"cp866",csibm869:"cp869",csiso2022jp:"iso2022_jp",csiso2022jp2:"iso2022_jp_2",csiso2022kr:"iso2022_kr",csiso58gb231280:"gbk",csisolatin1:"windows-1252",csisolatin2:"iso8859-2",csisolatin3:"iso8859-3",csisolatin4:"iso8859-4",csisolatin5:"windows-1254",csisolatin6:"iso8859-10",csisolatinarabic:"iso8859-6",csisolatincyrillic:"iso8859-5",csisolatingreek:"iso8859-7",csisolatinhebrew:"iso8859-8",cskoi8r:"koi8-r",csksc56011987:"cp949",cspc775baltic:"cp775",cspc850multilingual:"cp850",cspc862latinhebrew:"cp862",cspc8codepage437:"cp437",cspcp852:"cp852",csptcp154:"ptcp154",csshiftjis:"shift_jis",csunicode11utf7:"utf-7",cyrillic:"iso8859-5",cyrillicasian:"ptcp154",ebcdiccpbe:"cp500",ebcdiccpca:"cp037",ebcdiccpch:"cp500",ebcdiccphe:"cp424",ebcdiccpnl:"cp037",ebcdiccpus:"cp037",ebcdiccpwt:"cp037",ecma114:"iso8859-6",ecma118:"iso8859-7",elot928:"iso8859-7",eucjp:"euc_jp",euckr:"cp949",extendedunixcodepackedformatforjapanese:"euc_jp",gb18030:"gb18030",gb2312:"gbk",gb231280:"gbk",gbk:"gbk",greek:"iso8859-7",greek8:"iso8859-7",hebrew:"iso8859-8",hproman8:"hp-roman8",hzgb2312:"hz",ibm037:"cp037",ibm1026:"cp1026",ibm367:"ascii",ibm424:"cp424",ibm437:"cp437",ibm500:"cp500",ibm775:"cp775",ibm819:"windows-1252",ibm850:"cp850",ibm852:"cp852",ibm855:"cp855",ibm857:"cp857",ibm860:"cp860",ibm861:"cp861",ibm862:"cp862",ibm863:"cp863",ibm864:"cp864",ibm865:"cp865",ibm866:"cp866",ibm869:"cp869",iso2022jp:"iso2022_jp",iso2022jp2:"iso2022_jp_2",iso2022kr:"iso2022_kr",iso646irv1991:"ascii",iso646us:"ascii",iso88591:"windows-1252",iso885910:"iso8859-10",iso8859101992:"iso8859-10",iso885911987:"windows-1252",iso885913:"iso8859-13",iso885914:"iso8859-14",iso8859141998:"iso8859-14",iso885915:"iso8859-15",iso885916:"iso8859-16",iso8859162001:"iso8859-16",iso88592:"iso8859-2",iso885921987:"iso8859-2",iso88593:"iso8859-3",iso885931988:"iso8859-3",iso88594:"iso8859-4",iso885941988:"iso8859-4",iso88595:"iso8859-5",iso885951988:"iso8859-5",iso88596:"iso8859-6",iso885961987:"iso8859-6",iso88597:"iso8859-7",iso885971987:"iso8859-7",iso88598:"iso8859-8",iso885981988:"iso8859-8",iso88599:"windows-1254",iso885991989:"windows-1254",isoceltic:"iso8859-14",isoir100:"windows-1252",isoir101:"iso8859-2",isoir109:"iso8859-3",isoir110:"iso8859-4",isoir126:"iso8859-7",isoir127:"iso8859-6",isoir138:"iso8859-8",isoir144:"iso8859-5",isoir148:"windows-1254",isoir149:"cp949",isoir157:"iso8859-10",isoir199:"iso8859-14",isoir226:"iso8859-16",isoir58:"gbk",isoir6:"ascii",koi8r:"koi8-r",koi8u:"koi8-u",korean:"cp949",ksc5601:"cp949",ksc56011987:"cp949",ksc56011989:"cp949",l1:"windows-1252",l10:"iso8859-16",l2:"iso8859-2",l3:"iso8859-3",l4:"iso8859-4",l5:"windows-1254",l6:"iso8859-10",l8:"iso8859-14",latin1:"windows-1252",latin10:"iso8859-16",latin2:"iso8859-2",latin3:"iso8859-3",latin4:"iso8859-4",latin5:"windows-1254",latin6:"iso8859-10",latin8:"iso8859-14",latin9:"iso8859-15",ms936:"gbk",mskanji:"shift_jis",pt154:"ptcp154",ptcp154:"ptcp154",r8:"hp-roman8",roman8:"hp-roman8",shiftjis:"shift_jis",tis620:"cp874",unicode11utf7:"utf-7",us:"ascii",usascii:"ascii",utf16:"utf-16",utf16be:"utf-16-be",utf16le:"utf-16-le",utf8:"utf-8",windows1250:"cp1250",windows1251:"cp1251",windows1252:"cp1252",windows1253:"cp1253",windows1254:"cp1254",windows1255:"cp1255",windows1256:"cp1256",windows1257:"cp1257",windows1258:"cp1258",windows936:"gbk","x-x-big5":"big5"},B.bB,t.B)
B.bC=A.a(s(["after","before","first-letter","first-line"]),t.s)
B.cM=new A.u(4,{after:null,before:null,"first-letter":null,"first-line":null},B.bC,A.aQ("u<n,aq>"))
B.e1=new A.fc(B.cM,A.aQ("fc<n>"))
B.e2=new A.i_("Start")
B.e3=new A.i_("End")
B.e4=A.uv("K")
B.e5=new A.i7(!1)
B.ah=A.a(s([]),t.O)
B.b0=new A.P(0.16078,0.67059,0.79216,1)
B.bg=A.a(s([B.b0]),t.O)
B.e6=new A.co(B.ah,B.bg,1,B.ah,0)
B.e=new A.f(0,0,0)
B.m=new A.f(0,0,1)
B.K=new A.f(0,1,0)
B.j=new A.f(1,0,0)
B.L=new A.f(1,1,0)
B.aC=new A.f(1,1,1)
B.A=new A.f(-1,1,0)
B.M=new A.f(-1,-1,0)
B.e8=new A.dz(null,2)})();(function staticFields(){$.lF=null
$.o7=null
$.nN=null
$.nM=null
$.pn=null
$.pb=null
$.pB=null
$.ma=null
$.mo=null
$.nn=null
$.dE=null
$.fl=null
$.fm=null
$.nf=!1
$.aa=B.l
$.bh=A.a([],A.aQ("y<K>"))
$.fj=A.rz("messages")
$.mV=A.bp(t.N,A.aQ("cg"))
$.hO=A.bp(t.N,A.aQ("b4<n,n>"))
$.iK=A.bp(t.S,A.aQ("b4<i,i>"))
$.oX=null
$.lZ=null})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"uB","pK",()=>A.u2("_$dart_dartClosure"))
s($,"vi","nB",()=>B.l.k9(new A.mu(),A.aQ("bn<aq>")))
s($,"uR","pM",()=>A.c2(A.kV({
toString:function(){return"$receiver$"}})))
s($,"uS","pN",()=>A.c2(A.kV({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"uT","pO",()=>A.c2(A.kV(null)))
s($,"uU","pP",()=>A.c2(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"uX","pS",()=>A.c2(A.kV(void 0)))
s($,"uY","pT",()=>A.c2(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"uW","pR",()=>A.c2(A.op(null)))
s($,"uV","pQ",()=>A.c2(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"v_","pV",()=>A.c2(A.op(void 0)))
s($,"uZ","pU",()=>A.c2(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"v2","ny",()=>A.rv())
s($,"v0","pW",()=>new A.l0().$0())
s($,"v1","pX",()=>new A.l_().$0())
s($,"v3","pY",()=>A.qM(A.nd(A.a([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.t))))
s($,"v4","nz",()=>typeof process!="undefined"&&Object.prototype.toString.call(process)=="[object process]"&&process.platform=="win32")
s($,"vd","mA",()=>A.ns(B.e4))
s($,"ve","pZ",()=>A.td())
r($,"vh","q_",()=>new A.mc().$0())
r($,"uD","dI",()=>{var q=new A.jq()
q.m0()
return q})
s($,"vf","nA",()=>new A.jh(A.aQ("cI").a($.nx())))
s($,"uN","pL",()=>new A.hC(A.ax("/"),A.ax("[^/]$"),A.ax("^/")))
s($,"uP","iR",()=>new A.ib(A.ax("[/\\\\]"),A.ax("[^/\\\\]$"),A.ax("^(\\\\\\\\[^\\\\]+\\\\[^\\\\/]+|[a-zA-Z]:[/\\\\])"),A.ax("^[/\\\\](?![/\\\\])")))
s($,"uO","ft",()=>new A.i5(A.ax("/"),A.ax("(^[a-zA-Z][-+.a-zA-Z\\d]*://|[^/])$"),A.ax("[a-zA-Z][-+.a-zA-Z\\d]*://[^/]*"),A.ax("^/")))
s($,"uM","nx",()=>A.rf())})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({CanvasGradient:J.ba,DOMError:J.ba,MediaError:J.ba,Navigator:J.ba,NavigatorConcurrentHardware:J.ba,NavigatorUserMediaError:J.ba,OverconstrainedError:J.ba,PositionError:J.ba,GeolocationPositionError:J.ba,ArrayBufferView:A.ho,Int8Array:A.hn,Uint32Array:A.et,Uint8Array:A.cP,HTMLAudioElement:A.x,HTMLBRElement:A.x,HTMLBaseElement:A.x,HTMLBodyElement:A.x,HTMLButtonElement:A.x,HTMLContentElement:A.x,HTMLDListElement:A.x,HTMLDataElement:A.x,HTMLDataListElement:A.x,HTMLDetailsElement:A.x,HTMLDialogElement:A.x,HTMLDivElement:A.x,HTMLEmbedElement:A.x,HTMLFieldSetElement:A.x,HTMLHRElement:A.x,HTMLHeadElement:A.x,HTMLHeadingElement:A.x,HTMLHtmlElement:A.x,HTMLIFrameElement:A.x,HTMLImageElement:A.x,HTMLInputElement:A.x,HTMLLIElement:A.x,HTMLLabelElement:A.x,HTMLLegendElement:A.x,HTMLLinkElement:A.x,HTMLMapElement:A.x,HTMLMediaElement:A.x,HTMLMenuElement:A.x,HTMLMetaElement:A.x,HTMLMeterElement:A.x,HTMLModElement:A.x,HTMLOListElement:A.x,HTMLObjectElement:A.x,HTMLOptGroupElement:A.x,HTMLOptionElement:A.x,HTMLOutputElement:A.x,HTMLParagraphElement:A.x,HTMLParamElement:A.x,HTMLPictureElement:A.x,HTMLPreElement:A.x,HTMLProgressElement:A.x,HTMLQuoteElement:A.x,HTMLScriptElement:A.x,HTMLShadowElement:A.x,HTMLSlotElement:A.x,HTMLSourceElement:A.x,HTMLSpanElement:A.x,HTMLStyleElement:A.x,HTMLTableCaptionElement:A.x,HTMLTableCellElement:A.x,HTMLTableDataCellElement:A.x,HTMLTableHeaderCellElement:A.x,HTMLTableColElement:A.x,HTMLTableElement:A.x,HTMLTableRowElement:A.x,HTMLTableSectionElement:A.x,HTMLTemplateElement:A.x,HTMLTextAreaElement:A.x,HTMLTimeElement:A.x,HTMLTitleElement:A.x,HTMLTrackElement:A.x,HTMLUListElement:A.x,HTMLUnknownElement:A.x,HTMLVideoElement:A.x,HTMLDirectoryElement:A.x,HTMLFontElement:A.x,HTMLFrameElement:A.x,HTMLFrameSetElement:A.x,HTMLMarqueeElement:A.x,HTMLElement:A.x,HTMLAnchorElement:A.fE,HTMLAreaElement:A.fH,HTMLCanvasElement:A.cC,CanvasRenderingContext2D:A.dR,CDATASection:A.bN,CharacterData:A.bN,Comment:A.bN,ProcessingInstruction:A.bN,Text:A.bN,DOMException:A.jl,DOMRectReadOnly:A.dW,MathMLElement:A.r,SVGAElement:A.r,SVGAnimateElement:A.r,SVGAnimateMotionElement:A.r,SVGAnimateTransformElement:A.r,SVGAnimationElement:A.r,SVGCircleElement:A.r,SVGClipPathElement:A.r,SVGDefsElement:A.r,SVGDescElement:A.r,SVGDiscardElement:A.r,SVGEllipseElement:A.r,SVGFEBlendElement:A.r,SVGFEColorMatrixElement:A.r,SVGFEComponentTransferElement:A.r,SVGFECompositeElement:A.r,SVGFEConvolveMatrixElement:A.r,SVGFEDiffuseLightingElement:A.r,SVGFEDisplacementMapElement:A.r,SVGFEDistantLightElement:A.r,SVGFEFloodElement:A.r,SVGFEFuncAElement:A.r,SVGFEFuncBElement:A.r,SVGFEFuncGElement:A.r,SVGFEFuncRElement:A.r,SVGFEGaussianBlurElement:A.r,SVGFEImageElement:A.r,SVGFEMergeElement:A.r,SVGFEMergeNodeElement:A.r,SVGFEMorphologyElement:A.r,SVGFEOffsetElement:A.r,SVGFEPointLightElement:A.r,SVGFESpecularLightingElement:A.r,SVGFESpotLightElement:A.r,SVGFETileElement:A.r,SVGFETurbulenceElement:A.r,SVGFilterElement:A.r,SVGForeignObjectElement:A.r,SVGGElement:A.r,SVGGeometryElement:A.r,SVGGraphicsElement:A.r,SVGImageElement:A.r,SVGLineElement:A.r,SVGLinearGradientElement:A.r,SVGMarkerElement:A.r,SVGMaskElement:A.r,SVGMetadataElement:A.r,SVGPathElement:A.r,SVGPatternElement:A.r,SVGPolygonElement:A.r,SVGPolylineElement:A.r,SVGRadialGradientElement:A.r,SVGRectElement:A.r,SVGScriptElement:A.r,SVGSetElement:A.r,SVGStopElement:A.r,SVGStyleElement:A.r,SVGElement:A.r,SVGSVGElement:A.r,SVGSwitchElement:A.r,SVGSymbolElement:A.r,SVGTSpanElement:A.r,SVGTextContentElement:A.r,SVGTextElement:A.r,SVGTextPathElement:A.r,SVGTextPositioningElement:A.r,SVGTitleElement:A.r,SVGUseElement:A.r,SVGViewElement:A.r,SVGGradientElement:A.r,SVGComponentTransferFunctionElement:A.r,SVGFEDropShadowElement:A.r,SVGMPathElement:A.r,Element:A.r,AbortPaymentEvent:A.t,AnimationEvent:A.t,AnimationPlaybackEvent:A.t,ApplicationCacheErrorEvent:A.t,BackgroundFetchClickEvent:A.t,BackgroundFetchEvent:A.t,BackgroundFetchFailEvent:A.t,BackgroundFetchedEvent:A.t,BeforeInstallPromptEvent:A.t,BeforeUnloadEvent:A.t,BlobEvent:A.t,CanMakePaymentEvent:A.t,ClipboardEvent:A.t,CloseEvent:A.t,CustomEvent:A.t,DeviceMotionEvent:A.t,DeviceOrientationEvent:A.t,ErrorEvent:A.t,ExtendableEvent:A.t,ExtendableMessageEvent:A.t,FetchEvent:A.t,FontFaceSetLoadEvent:A.t,ForeignFetchEvent:A.t,GamepadEvent:A.t,HashChangeEvent:A.t,InstallEvent:A.t,MediaEncryptedEvent:A.t,MediaKeyMessageEvent:A.t,MediaQueryListEvent:A.t,MediaStreamEvent:A.t,MediaStreamTrackEvent:A.t,MessageEvent:A.t,MIDIConnectionEvent:A.t,MIDIMessageEvent:A.t,MutationEvent:A.t,NotificationEvent:A.t,PageTransitionEvent:A.t,PaymentRequestEvent:A.t,PaymentRequestUpdateEvent:A.t,PopStateEvent:A.t,PresentationConnectionAvailableEvent:A.t,PresentationConnectionCloseEvent:A.t,ProgressEvent:A.t,PromiseRejectionEvent:A.t,PushEvent:A.t,RTCDataChannelEvent:A.t,RTCDTMFToneChangeEvent:A.t,RTCPeerConnectionIceEvent:A.t,RTCTrackEvent:A.t,SecurityPolicyViolationEvent:A.t,SensorErrorEvent:A.t,SpeechRecognitionError:A.t,SpeechRecognitionEvent:A.t,SpeechSynthesisEvent:A.t,StorageEvent:A.t,SyncEvent:A.t,TrackEvent:A.t,TransitionEvent:A.t,WebKitTransitionEvent:A.t,VRDeviceEvent:A.t,VRDisplayEvent:A.t,VRSessionEvent:A.t,MojoInterfaceRequestEvent:A.t,ResourceProgressEvent:A.t,USBConnectionEvent:A.t,IDBVersionChangeEvent:A.t,AudioProcessingEvent:A.t,OfflineAudioCompletionEvent:A.t,WebGLContextEvent:A.t,Event:A.t,InputEvent:A.t,SubmitEvent:A.t,EventTarget:A.aW,HTMLFormElement:A.h6,MouseEvent:A.bb,DragEvent:A.bb,PointerEvent:A.bb,WheelEvent:A.bb,Document:A.b5,DocumentFragment:A.b5,HTMLDocument:A.b5,ShadowRoot:A.b5,XMLDocument:A.b5,Attr:A.b5,DocumentType:A.b5,Node:A.b5,Path2D:A.hy,HTMLSelectElement:A.hK,CompositionEvent:A.bD,FocusEvent:A.bD,KeyboardEvent:A.bD,TextEvent:A.bD,TouchEvent:A.bD,UIEvent:A.bD,Window:A.dw,DOMWindow:A.dw,ClientRect:A.eV,DOMRect:A.eV})
hunkHelpers.setOrUpdateLeafTags({CanvasGradient:true,DOMError:true,MediaError:true,Navigator:true,NavigatorConcurrentHardware:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,ArrayBufferView:false,Int8Array:true,Uint32Array:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLImageElement:true,HTMLInputElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLCanvasElement:true,CanvasRenderingContext2D:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,DOMException:true,DOMRectReadOnly:false,MathMLElement:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGScriptElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,ProgressEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,ResourceProgressEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventTarget:false,HTMLFormElement:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,Document:true,DocumentFragment:true,HTMLDocument:true,ShadowRoot:true,XMLDocument:true,Attr:true,DocumentType:true,Node:false,Path2D:true,HTMLSelectElement:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,Window:true,DOMWindow:true,ClientRect:true,DOMRect:true})
A.di.$nativeSuperclassTag="ArrayBufferView"
A.f2.$nativeSuperclassTag="ArrayBufferView"
A.f3.$nativeSuperclassTag="ArrayBufferView"
A.es.$nativeSuperclassTag="ArrayBufferView"})()
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q)s[q].removeEventListener("load",onLoad,false)
a(b.target)}for(var r=0;r<s.length;++r)s[r].addEventListener("load",onLoad,false)})(function(a){v.currentScript=a
var s=A.uf
if(typeof dartMainRunner==="function")dartMainRunner(s,[])
else s([])})})()
//# sourceMappingURL=example.dart.js.map
