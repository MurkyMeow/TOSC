!function(e){var t={};function s(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(o,r,function(t){return e[t]}.bind(null,r));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t,s){},function(e,t,s){"use strict";s.r(t);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const o="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,a=new RegExp(`${i}|${n}`);class l{constructor(e,t){this.parts=[],this.element=t;const s=[],o=[],r=document.createTreeWalker(t.content,133,null,!1);let n=0,l=-1,h=0;const{strings:u,values:{length:m}}=e;for(;h<m;){const e=r.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let o=0;for(let e=0;e<s;e++)c(t[e].name,"$lit$")&&o++;for(;o-- >0;){const t=u[h],s=p.exec(t)[2],o=s.toLowerCase()+"$lit$",r=e.getAttribute(o);e.removeAttribute(o);const i=r.split(a);this.parts.push({type:"attribute",index:l,name:s,strings:i}),h+=i.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const o=e.parentNode,r=t.split(a),i=r.length-1;for(let t=0;t<i;t++){let s,i=r[t];if(""===i)s=d();else{const e=p.exec(i);null!==e&&c(e[2],"$lit$")&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(i)}o.insertBefore(s,e),this.parts.push({type:"node",index:++l})}""===r[i]?(o.insertBefore(d(),e),s.push(e)):e.data=r[i],h+=i}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&l!==n||(l++,t.insertBefore(d(),e)),n=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(s.push(e),l--),h++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),h++}}else r.currentNode=o.pop()}for(const e of s)e.parentNode.removeChild(e)}}const c=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},h=e=>-1!==e.index,d=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:s},parts:o}=e,r=document.createTreeWalker(s,133,null,!1);let i=g(o),n=o[i],a=-1,l=0;const c=[];let h=null;for(;r.nextNode();){a++;const e=r.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==n&&n.index===a;)n.index=null!==h?-1:n.index-l,i=g(o,i),n=o[i]}c.forEach(e=>e.parentNode.removeChild(e))}const m=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},g=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(h(t))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const f=new WeakMap,v=e=>"function"==typeof e&&f.has(e),b={},w={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],s=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let i,n=0,a=0,l=r.nextNode();for(;n<s.length;)if(i=s[n],h(i)){for(;a<i.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),r.currentNode=l.content),null===(l=r.nextNode())&&(r.currentNode=t.pop(),l=r.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,i.name,i.strings,this.options));n++}else this.__parts.push(void 0),n++;return o&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const x=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),_=` ${i} `;class S{constructor(e,t,s,o){this.strings=e,this.values=t,this.type=s,this.processor=o}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let o=0;o<e;o++){const e=this.strings[o],r=e.lastIndexOf("\x3c!--");s=(r>-1||s)&&-1===e.indexOf("--\x3e",r+1);const a=p.exec(e);t+=null===a?e+(s?_:n):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==x&&(t=x.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const k=e=>null===e||!("object"==typeof e||"function"==typeof e),E=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class P{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new B(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!E(e))return e}let o="";for(let r=0;r<t;r++){o+=e[r];const t=s[r];if(void 0!==t){const e=t.value;if(k(e)||!E(e))o+="string"==typeof e?e:String(e);else for(const t of e)o+="string"==typeof t?t:String(t)}}return o+=e[t],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class B{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===b||k(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=b,e(this)}this.value!==b&&this.committer.commit()}}class C{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}const e=this.__pendingValue;e!==b&&(k(e)?e!==this.value&&this.__commitText(e):e instanceof S?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):E(e)?this.__commitIterable(e):e===w?(this.value=w,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const s=new y(t,e.processor,this.options),o=s._clone();s.update(e.values),this.__commitNode(o),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,o=0;for(const r of e)s=t[o],void 0===s&&(s=new C(this.options),t.push(s),0===o?s.appendIntoPart(this):s.insertAfterPart(t[o-1])),s.setValue(r),s.commit(),o++;o<t.length&&(t.length=o,this.clear(s&&s.endNode))}clear(e=this.startNode){r(this.startNode.parentNode,e.nextSibling,this.endNode)}}class ${constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}if(this.__pendingValue===b)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=b}}class N extends P{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends B{}let z=!1;(()=>{try{const e={get capture(){return z=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=b,e(this)}if(this.__pendingValue===b)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),o=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=R(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=b}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const R=e=>e&&(z?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function O(e){let t=V.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},V.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const o=e.strings.join(i);return s=t.keyString.get(o),void 0===s&&(s=new l(e,e.getTemplateElement()),t.keyString.set(o,s)),t.stringsArray.set(e.strings,s),s}const V=new Map,M=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const L=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,s,o){const r=t[0];if("."===r){return new N(e,t.slice(1),s).parts}if("@"===r)return[new A(e,t.slice(1),o.eventContext)];if("?"===r)return[new $(e,t.slice(1),s)];return new P(e,t,s).parts}handleTextExpression(e){return new C(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const U=(e,...t)=>new S(e,t,"html",L),I=(e,t)=>`${e}--${t}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const q=e=>t=>{const s=I(t.type,e);let o=V.get(s);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},V.set(s,o));let r=o.stringsArray.get(t.strings);if(void 0!==r)return r;const n=t.strings.join(i);if(r=o.keyString.get(n),void 0===r){const s=t.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(s,e),r=new l(t,s),o.keyString.set(n,r)}return o.stringsArray.set(t.strings,r),r},G=["html","svg"],H=new Set,F=(e,t,s)=>{H.add(e);const o=s?s.element:document.createElement("template"),r=t.querySelectorAll("style"),{length:i}=r;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(o,e);const n=document.createElement("style");for(let e=0;e<i;e++){const t=r[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{G.forEach(t=>{const s=V.get(I(t,e));void 0!==s&&s.keyString.forEach(e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{s.add(e)}),u(e,s)})})})(e);const a=o.content;s?function(e,t,s=null){const{element:{content:o},parts:r}=e;if(null==s)return void o.appendChild(t);const i=document.createTreeWalker(o,133,null,!1);let n=g(r),a=0,l=-1;for(;i.nextNode();){l++;for(i.currentNode===s&&(a=m(t),s.parentNode.insertBefore(t,s));-1!==n&&r[n].index===l;){if(a>0){for(;-1!==n;)r[n].index+=a,n=g(r,n);return}n=g(r,n)}}}(s,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(o,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){a.insertBefore(n,a.firstChild);const e=new Set;e.add(n),u(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const D={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},W=(e,t)=>t!==e&&(t==t||e==e),J={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:W};class Y extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,s)=>{const o=this._attributeNameForProperty(s,t);void 0!==o&&(this._attributeToPropertyMap.set(o,s),e.push(o))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=J){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,s,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdateInternal(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||J}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=W){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,o=t.converter||D,r="function"==typeof o?o:o.fromAttribute;return r?r(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,o=t.converter;return(o&&o.toAttribute||D.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=J){const o=this.constructor,r=o._attributeNameForProperty(e,s);if(void 0!==r){const e=o._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,o=s._attributeToPropertyMap.get(e);if(void 0!==o){const e=s.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let o=!0;if(void 0!==e){const r=this.constructor;s=s||r.getPropertyOptions(e),r._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Y.finalized=!0;const K=Element.prototype;K.msMatchesSelector||K.webkitMatchesSelector;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class Z{constructor(e,t){if(t!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ee=(e,...t)=>{const s=t.reduce((t,s,o)=>t+(e=>{if(e instanceof Z)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[o+1],e[0]);return new Z(s,X)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const te={};class se extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e),s),s=t(e,new Set),o=[];s.forEach(e=>o.unshift(e)),this._styles=o}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!Q){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new Z(String(t),X)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==te&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return te}}se.finalized=!0,se.render=(e,t,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const o=s.scopeName,i=M.has(t),n=j&&11===t.nodeType&&!!t.host,a=n&&!H.has(o),l=a?document.createDocumentFragment():t;if(((e,t,s)=>{let o=M.get(t);void 0===o&&(r(t,t.firstChild),M.set(t,o=new C(Object.assign({templateFactory:O},s))),o.appendInto(t)),o.setValue(e),o.commit()})(e,l,Object.assign({templateFactory:q(o)},s)),a){const e=M.get(l);M.delete(l);const s=e.value instanceof y?e.value.template:void 0;F(o,l,s),r(t,t.firstChild),t.appendChild(l),M.set(t,e)}!i&&n&&window.ShadyCSS.styleElement(t.host)};const oe={R:"red",B:"blue",G:"green",r:"red",b:"blue",g:"green"};class re{constructor(e){this.T={letter:"T",color:"blue",extra:!1},this.O={letter:"O",color:"blue",extra:!1},this.S={letter:"S",color:"blue",extra:!1},this.C={letter:"C",color:"blue",extra:!1};let t=0;this.T.color=oe[e[t++]],"+"===e[t]&&(this.T.extra=!0,t++),this.O.color=oe[e[t++]],"+"===e[t]&&(this.O.extra=!0,t++),this.S.color=oe[e[t++]],"+"===e[t]&&(this.S.extra=!0,t++),this.C.color=oe[e[t++]],"+"===e[t]&&(this.C.extra=!0,t++)}map(e){return[this.T,this.O,this.S,this.C].map(e)}}const ie=[{name:"Example 0 really long name with short pro",pronoun:"xey",tosc:new re("RG+B+B+")},{name:"Example 1 long name",pronoun:"sie",tosc:new re("RGBB")},{name:"Example 2",pronoun:"he",tosc:new re("RR+GG")},{name:"Example 3 really long name with long pro",pronoun:"they/them/themselves",tosc:new re("G+G+GG+")},{name:"Example 4",pronoun:"",tosc:new re("RBGR+")},{name:"Example 5 long name",pronoun:"they/them/themselves",tosc:new re("G+RGG+")},{name:"Example 6",pronoun:"",tosc:new re("R+G+G+G+")},{name:"Example 7",pronoun:"xey",tosc:new re("B+R+G+G")},{name:"Example 8",pronoun:"ze/hir",tosc:new re("B+RGG")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")},{name:"Example 9",pronoun:"she",tosc:new re("RBB+B")}];customElements.define("tosc-inline",class extends se{static get styles(){return ee`
            :host {
                --border-width: 2px;
                --font-size: inherit;
                --font-ratio: 1.2;
                --gap-width: 10px;

                --red: #b02323;
                --blue: #5523f0;
                --green: #23b033;

                display: flex;
                align-items: center;
                height: 100%;
                /*width: 100%;*/
            }

            .letter {
                --calc-size: calc(var(--font-size) * var(--font-ratio));

                font-size: var(--font-size);
                border: var(--border-width) solid transparent;
                border-radius: 50%;
                text-align: center;
                width: var(--calc-size);
                height: var(--calc-size);
                line-height: calc(var(--calc-size) + var(--border-width));
            }

            .letter:not(:last-child) {
                margin-right: var(--gap-width);
            }

            .letter.red[extra] {
                border-color: var(--red);
            }
            .letter.blue[extra] {
                border-color: var(--blue);
            }
            .letter.green[extra] {
                border-color: var(--green);
            }

            .red {
                color: var(--red);
            }
            .blue {
                color: var(--blue);
            }
            .green {
                color: var(--green);
            }
        `}static get properties(){return{}}firstUpdated(){void 0===this.tosc&&(this.tosc=new re("BBBB"))}render(){return U`
            ${this.tosc.map(e=>U`
                <span class="letter ${e.color}" ?extra=${e.extra}>
                    ${e.letter}
                </span>
            `)}
        `}});customElements.define("tosc-person",class extends se{static get styles(){return ee`
            :host {
                display: grid;
                grid-template-columns: 10vw 1fr auto;
                grid-gap: 20px;
                align-items: center;
            }

            #name {
                font-size: inherit;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                display: flex;
                height: 100%;
            }

            #name::after {
                content: " ";
                position: sticky;
                right: -.5vw;
                top: 0px;
                height: 100%;
                min-width: 2.5vw;
                background: linear-gradient(90deg, #dddddd50 0%, #ddd);
                display: block;
            }

            #name::-webkit-scrollbar {
                display: none;
            }

            #pronoun {
                font-size: 3vw;
                overflow-x: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #888;
            }

            #name, #pronoun {
                grid-column: 2;
            }

            #tosc, #avatar {
                grid-row: 1 / 3;
            }

            #tosc {
                margin-left: 10px;
                grid-column: 3;
                --font-ratio: 1.1;
            }
        `}static get properties(){return{me:{type:Object}}}constructor(){super(),this.me={name:"Unnamed",pronoun:"",tosc:new re("BBBB")},this.avatar="https://www.flaticon.com/svg/vstatic/svg/747/747402.svg?token=exp=1620310651~hmac=a9b02cfce78c075668c201880608aadb"}render(){return U`
            <img id="avatar" src=${this.avatar}>
            <span id="name">${this.me.name}</span>
            <span id="pronoun" ?hidden=${""===this.me.pronoun}>
                (${this.me.pronoun})
            </span>
            <tosc-inline id="tosc" .tosc=${this.me.tosc}></tosc-inline>
        `}});customElements.define("push-button",class extends se{static get styles(){return ee`
            :host {
                --bg-color-active: #aaa;
                --fg-color-active: #000;
                --bg-color: #eee;
                --fg-color: #000;
                width: 100%;
                height: 100%;

                border-radius: inherit;
                background-color: var(--bg-color);
                color: var(--fg-color);
                outline: none;

                display: flex;
                justify-content: center;
                align-items: center;

                user-select: none;
            }

            :host(:focus-visible),
            :host(:hover) {
                background-color: var(--bg-color-active);
                color: var(--fg-color-active);
            }

            :host(:active) {
                filter: brightness(1.2);
            }
        `}static get properties(){return{}}constructor(){super(),this.tabIndex="0"}render(){return U`
            <slot></slot>
        `}});customElements.define("tosc-list",class extends se{static get styles(){return ee`
            :host {
                display: grid;
                grid-template-rows: fit-content(100px) auto 200px;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                gap: 20px;
            }

            #me, #others {
                padding: 0 30px;
            }

            #others {
                overflow-y: auto;
                width: 100%;
                box-sizing: border-box;
                position: relative;
            }

            #others .person:not(:last-child) {
                margin-bottom: 1.5vh;
                padding-bottom: 1.5vh;
                border-bottom: 2px solid #00000020;
            }

            #others::after {
                content: " ";
                position: sticky;
                bottom: -.5vh;
                left: 0px;
                min-height: 4vh;
                width: 100%;
                background: linear-gradient(#0000 0%, #ddd);
                display: block;
            }

            #others::-webkit-scrollbar {
                display: none;
            }

            #me {
                display: grid;
                grid-template-columns: minmax(45%, 1fr) 1fr auto;
                grid-gap: 10px;
                align-items: center;
            }

            .tosc {
                grid-column: 3;
                --font-ratio: 1.1;
            }

            #me {
                border-radius: inherit;
                background: #00000025;
                height: fit-content;
                padding-top: 5px;
                padding-bottom: 5px;
            }

            #me .pronoun {
                grid-column: 1;
                color: #4c4c4c
            }

            #me .pronoun:not([hidden]) + .tosc {
                grid-row: 1 / 3;
            }

            #button {
                width: 40%;
                height: 50%;
                place-self: center;
            }
        `}static get properties(){return{list:{type:Array},me:{type:Object}}}render(){return U`
            <div id="me">
                <span class="name">${this.me.name}</span>
                <span class="pronoun" ?hidden=${""===this.me.pronoun}>
                    (${this.me.pronoun})
                </span>
                <tosc-inline class="tosc" .tosc=${this.me.tosc}></tosc-inline>
            </div>
            <div id="others">
                ${this.list.map(e=>U`
                    <tosc-person .me=${e} class='person'></tosc-person>
                `)}
            </div>

            <push-button id="button" @click=${this.switch}>Edit</push-button>
        `}switch(){const e=new CustomEvent("switch",{bubbles:!0,composed:!0});this.dispatchEvent(e)}});const ne={T:{red:["Do not touch me.","Hands off! ! do not want to be touched, and that is really important"],blue:["Ask me if I want contact","I want hugs, but not from everyone. Don't hesitate to ask!"],green:["Free hugs","Please hug me!"]},O:{red:["Don't ask me personal questions","Personal questions hurt me. Mind your own business!"],blue:["Ask me if I am ready for personal questions before asking them.","I want to talk about personal things, but not with everyone - ask first."],green:["I am ready for personal questions","Please ask me personal questions!"]},S:{red:["Do not talk to me about anything","Do not speak at me. I am not going to talk to anyone, and that is important to me."],blue:["Ask me if I am ready to chat.","I want to chat, but not with everyone - ask first."],green:["Ready to chat","Plese talk to me!"]},C:{red:["Don't criticize me, I will ask for input myself when I will need it.","Keep your opinion to yourself! I am hut when others judge me, and that is important."],blue:["Before providing feedback, ask me if I am ready for it.","I want to receive feedback, but not from everone - ask first."],green:["I am always ready for your input, be it criticism or praise.","Following Crocker's rules"]}};customElements.define("tosc-button",class extends se{static get styles(){return ee`
      .wrap {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .cover {
        width: 100%;
        height: 100%;
        background-color: #555;
        border-radius: 5px;
        transition: 0.1s;
      }

      .cover.active {
        background-color: #76bc59;
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
      }
    `}static get properties(){return{state:{type:Boolean}}}constructor(){super(),this.state=!1}render(){return U`
      <div class="wrap">
        <div class="cover ${this.state?"active":"inactive"}"></div>
        <input type="checkbox" @click=${this.toggle} ?checked=${this.state} />
      </div>
    `}toggle(e){this.state=e.target.checked;const t=new CustomEvent("toggle",{detail:{state:this.state,letter:this.letter},bubbles:!0,composed:!0});this.dispatchEvent(t)}});customElements.define("tosc-scroll",class extends se{static get styles(){return ee`
            :host {
                --red: #b02323;
                --blue: #5523f0;
                --green: #23b033;
                --holder-bg-color: #ccc;

                --font-size: inherit;

                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                padding: 10px 0;
            }

            :host::before {
                content: '';
                --holder-width: calc(2.35 * var(--font-size));
                --holder-height: calc(1.35 * var(--font-size));

                position: absolute;
                left: calc(50% - var(--holder-width) / 2);
                top: calc(50% - var(--holder-height) / 2);

                width: var(--holder-width);
                height: var(--holder-height);

                background-color: var(--holder-bg-color);
                border-radius: 5px;
                box-sizing: border-box;
            }

            #scroll {
                height: 100%;
                width: 100%;

                overflow-y: scroll;
                scrollbar-width: none;
            }

            #scroll::-webkit-scrollbar {
                display: none;
            }

            #scroll.extra .pick::before {
                content: '';
                width: calc(1.2 * var(--font-size));
                height: calc(1.2 * var(--font-size));
                border: 5px solid transparent;
                position: absolute;
                border-radius: 100%;
                top: calc(50% - 1.2 * var(--font-size) / 2);
                left: calc(50% - 1.2 * var(--font-size) / 2);
                box-sizing: border-box;
            }

            #scroll.extra .pick#red::before {
                border-color: var(--red);
            }

            #scroll.extra .pick#blue::before {
                border-color: var(--blue);
            }

            #scroll.extra .pick#green::before {
                border-color: var(--green);
            }

            .pick.void {
                height: calc((100% - var(--font-size)) / 2);
            }

            .pick {
                user-select: none;
                position: relative;
                font-size: var(--font-size);
                height: var(--font-size);

                display: flex;
                justify-content: center;
                align-items: center;
            }

            .pick#red {
                color: var(--red);
            }

            .pick#blue {
                color: var(--blue);
                margin: var(--font-size) 0;
            }

            .pick#green {
                color: var(--green);
            }
        `}static get properties(){return{letter:{type:String},active:{type:String},extra:{type:Boolean}}}constructor(){super(),this.cur=0,this.scrolling=this.scrolling.bind(this),this.active="blue",this.letter="?",this.extra=!1}firstUpdated(){this.scroll=this.shadowRoot.querySelector("#scroll"),this.scroll.addEventListener("scroll",this.scrolling),this.addEventListener("mousedown",e=>{const t=e.pageY,s=this.cur,o=()=>{n(),setTimeout(()=>this.block=!1,100)},r=()=>{n(),this.block=!1},i=e=>{e.preventDefault();const o=e.pageY-t;if(Math.abs(o)<10)return;this.block=!0;const r=s-o;this.updateScroll(r),this.updateValue(),this.stabilize()};this.addEventListener("mousemove",i),this.addEventListener("mouseup",o),this.addEventListener("mouseleave",r);const n=()=>{this.removeEventListener("mousemove",i),this.removeEventListener("mouseup",o),this.removeEventListener("mouseleave",r)}}),this.letterSize=parseInt(getComputedStyle(this).getPropertyValue("--font-size"),10),this.bottom=this.scroll.offsetHeight/2,this.cur=this.letterPos(this.active),this.updateScroll(this.cur)}render(){return U`
            <div id="scroll" class=${this.extra?"extra":""}>
                <div class="pick void"></div>
                <div class="pick" id="red" @click=${this.chooseMe}>${this.letter}</div>
                <div class="pick" id="blue" @click=${this.chooseMe}>${this.letter}</div>
                <div class="pick" id="green" @click=${this.chooseMe}>${this.letter}</div>
                <div class="pick void"></div>
            </div>
        `}letterPos(e){switch(e){case"red":return 0;case"blue":return 2*this.letterSize;case"green":return this.bottom;default:throw new Error("Unknown color: "+e)}}chooseMe(e){if(this.block)return;const t=e.currentTarget.id;this.updateScroll(this.letterPos(t)),this.updateValue()}updateValue(){const e=["red","blue","green"][this.getLetterId(this.cur)];if(e===this.active)return;this.active=e;const t=new CustomEvent("update",{detail:{extra:this.extra,color:this.active,letter:this.letter},bubbles:!0,composed:!0});this.dispatchEvent(t)}getLetterId(e){const{letterSize:t}=this;return e<.5*t?0:e<3*t?1:2}updateScroll(e){this.cur=e,this.scroll.scrollTo(0,this.cur)}scrolling(){this.cur=this.scroll.scrollTop,this.updateValue(),this.stabilize()}stabilize(){clearTimeout(this.stabletm),this.stabletm=setTimeout(()=>{const e=this.getLetterId(this.cur),t=this.letterPos(["red","blue","green"][e]);this.updateScroll(t),this.updateValue()},600)}});const ae=["all","another","any","anybody","anyone","anything","as","aught","both","each","each other","either","enough","everybody","everyone","everything","few","he","her","hers","herself","him","himself","his","I","idem","it","its","itself","many","me","mine","most","my","myself","naught","neither","no one","nobody","none","nothing","nought","one","one another","other","others","ought","our","ours","ourself","ourselves","several","she","some","somebody","someone","something","somewhat","such","suchlike","that","thee","their","theirs","theirself","theirselves","them","themself","themselves","there","these","they","thine","this","those","thou","thy","thyself","us","we","what","whatever","whatnot","whatsoever","whence","where","whereby","wherefrom","wherein","whereinto","whereof","whereon","wherever","wheresoever","whereto","whereunto","wherewith","wherewithal","whether","which","whichever","whichsoever","who","whoever","whom","whomever","whomso","whomsoever","whose","whosever","whosesoever","whoso","whosoever","ye","yon","yonder","you","your","yours","yourself","yourselves"];customElements.define("tosc-drop",class extends se{static get styles(){return ee`
            :host {
                position: relative;
                display: block;
                width: 100%;
            }

            #choosen {
                background-color: #ccc;
                border-radius: 5px;
                padding: 2px 10px;
                font-size: inherit;
                display: inline-block;
                margin-left: 5px;

                cursor: pointer;
                user-select: none;
                transition: background-color .2s;
            }

            :host(.active) #choosen {
                background-color: #eee;
            }

            #drop-down {
                opacity: 0;
                z-index: -999;

                position: absolute;
                top: 120%;
                left: 0;
                width: 100%;

                padding: 10px;
                border-radius: 5px;

                display: flex;
                flex-direction: column;
                height: 600px;
                overflow-y: auto;

                gap: 10px;
                box-sizing: border-box;
                transition: opacity 0.4s;
                box-shadow: 0 15px 5px 5px #00000020;

                background-color: #ddd;
            }

            :host(.active) #drop-down {
                opacity: 1;
                z-index: 2;
            }

            .pronoun {
                padding: 6px 15px;
                border-radius: 5px;
                background-color: #eee;

                user-select: none;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                min-height: 80px;
                box-sizing: border-box;
            }

        `}static get properties(){return{choosen:{type:String},active:{type:Boolean}}}constructor(){super(),this.active=!0,this.toggle()}firstUpdated(){this.dropdown=this.shadowRoot.querySelector("#drop-down"),this.dropdown.addEventListener("blur",()=>this.active=!1)}render(){return U`
            <div id="choosen" @click=${this.toggle}>
                ${""===this.choosen?"pronun":this.choosen}
            </div>
            <div id="drop-down">
                ${ae.map(e=>U`
                    <span class="pronoun" name=${e} @click=${this.changePr}>${e}</span>
                `)}
            </div>
        `}toggle(){this.active=!this.active,this.active?this.classList.add("active"):this.classList.remove("active")}changePr(e){this.choosen=e.target.getAttribute("name"),this.active=!1,this.classList.remove("active");const t=new CustomEvent("change",{detail:{pronoun:this.choosen},bubbles:!0,composed:!0});this.dispatchEvent(t)}});customElements.define("tosc-create",class extends se{static get styles(){return ee`
            :host {
                display: grid;
                height: 100%;
                width: 100%;
                grid-template-rows: 300px 15vh auto 200px;

                padding: 0 10px;
                box-sizing: border-box;
            }

            .name {
                background: transparent;
                border: none;
                border-bottom: 5px solid silver;
                color: #222;
                display: block;

                font-size: inherit;
                width: calc(100% - 20px);
                margin: 20px 10px;

                outline: none;
            }

            .name:focus-visible {
                border-color: pink;
            }

            .pronoun {
                background: #eee;
                color: #222;
                padding: 3px;
                border-radius: 5px;
                display: inline-block;
                margin-bottom: 20px;
            }

            .hint {
                text-align: center;
                font-size: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
            }

            .controls {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                place-content: center;
            }

            .scrolls,
            .extra {
                display: flex;
                width: 100%;
                justify-content: space-around;
            }

            .scrolls {
                /*background-color: rgba(0, 0, 0, 0.37);*/
                margin-bottom: 20px;
                --font-size: 50px;
            }

            tosc-scroll {
                --font-size: 80px;
            }

            tosc-button {
                margin-top: 3vh;
                width: 15vw;
                height: 3vh;
            }

            #button {
                width: 40%;
                height: 50%;
                place-self: center;
            }

        `}static get properties(){return{hint:{type:String},me:{type:Object}}}render(){return U`
            <div class="personal">
                <input class="name" spellcheck="false"
                    value=${this.me.name}
                    @change=${this.changeName}
                    @keyup=${this.blurName}
                >
                <tosc-drop
                    .choosen=${this.me.pronoun}
                    @change=${this.changePr}
                ></tosc-drop>
            </div>

            <div class="hint">${this.hint}</div>

            <div class="controls">
                <div class="scrolls">
                    ${this.me.tosc.map(e=>U`
                        <tosc-scroll
                            .active=${e.color}
                            .extra=${e.extra}
                            .letter=${e.letter}
                            @update=${this.showHint}
                        ></tosc-scroll>
                    `)}
                </div>
                <div class="extra">
                    ${this.me.tosc.map(e=>U`
                        <tosc-button
                            .letter=${e.letter}
                            .state=${e.extra}
                            @toggle=${this.toggleExtra}
                        ></tosc-button>
                    `)}
                </div>
            </div>

            <push-button id="button" @click=${this.switch}>Go back</push-button>
        `}blurName(e){13===e.keyCode&&e.target.blur()}changePr(e){this.me.pronoun=e.detail.pronoun}changeName(e){this.me.name=e.currentTarget.value}updateHint(e,t,s){this.hint=ne[e][t][0|s]}showHint(e){const t=e.detail;this.me.tosc[t.letter].color=t.color,this.updateHint(t.letter,t.color,t.extra)}toggleExtra(e){const t=e.detail.letter,s=this.me.tosc[t].color;this.me.tosc[t].extra=e.detail.state,this.updateHint(t,s,e.detail.state),this.requestUpdate()}switch(){const e=new CustomEvent("button",{bubbles:!0,composed:!0});this.dispatchEvent(e)}});customElements.define("tosc-list-landscape",class extends se{static get styles(){return ee`
            :host {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
            }

            #title {
                display: block;
                width: 100%;
                background: #00000025;
                text-align: center;
                padding: 8px;
                box-sizing: border-box;

                margin-bottom: 20px;
            }

            #people {
                display: flex;
                flex-wrap: wrap;
                gap: 30px;
                justify-content: center;
                align-items: center;
                padding: 10px;

                overflow-y: auto;
                height: 100%;
            }

            .person {
                display: grid;
                background-color: #eee;
                border-radius: 10px;
                padding: 10px;

                grid-template-columns: 100px auto;
                gap: 10px 15px;

                width: 400px;
            }

            .avatar {
                grid-row: 1;
                grid-column: 1;

                width: 100px;
                height: 100px;
                background-color: #bdf0ff;
                padding: 5px;
                box-sizing: border-box;
                border-radius: 50%;
            }

            .wrap {
                grid-row: 1;
                grid-column: 2;

                height: 100%;
                width: 100%;

                overflow: hidden;
                text-overflow: ellipsis;
            }

            .name {
                white-space: nowrap;
                width: 100%;
            }

            .pronoun {
                color: #666;
                font-size: 20px;
                overflow-x: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                margin-top: 10px;
                display: block;
            }

            .tosc {
                grid-row: 2;
                grid-column: 1 / 3;

                width: 100%;
                justify-content: space-around;
                --font-size: 40px;
            }
        `}static get properties(){return{people:{type:Array}}}constructor(){super(),this.people=[],this.avatar="https://www.flaticon.com/svg/vstatic/svg/747/747402.svg?token=exp=1620310651~hmac=a9b02cfce78c075668c201880608aadb"}render(){return U`
            <slot id="title"></slot>
            <div id="people">
                ${this.people.map(e=>U`
                    <div class='person'>
                        <img class='avatar' src=${this.avatar}>
                        <div class='wrap'>
                            <span class='name'>${e.name}</span>
                            <span class='pronoun'>${e.pronoun}</span>
                        </div>
                        <tosc-inline class='tosc' .tosc=${e.tosc}></tosc-inline>
                    </div>
                `)}
            </div>
        `}});customElements.define("tosc-app",class extends se{static get styles(){return ee`
            :host {
                display: block;
                margin: auto;
                /*background-color: #444569;*/
                /*background-color: #1e1e2e;*/
                background-color: #ddd;
                color: #222;
                border-radius: 10px;
                font-family: sans;

                height: 100%;
                width: 100%;
            }

            :host > * {
                --font-size: 20pt;
                font-size: var(--font-size);
            }

            @media (hover: none) and (pointer: coarse) { /*mobile*/
                :host > * {
                    --font-size: 50px;
                    font-size: var(--font-size);
                }
            }

        `}static get properties(){return{showList:{type:Boolean}}}constructor(){super(),this.me={name:"Guest32432989",pronoun:"",tosc:new re("BBBB")},this.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this.showList=!1}render(){return this.isMobile?this.showList?this.renderList():this.renderCreate():this.renderLandscapeLayout()}renderLandscapeLayout(){return U`
            <tosc-list-landscape
                .people=${ie}
            >Today at SOMEPLACE</tosc-list-landscape>
        `}renderList(){return U`
            <tosc-list .me=${this.me} .list=${ie}
                @switch=${this.changeScreen}
            ></tosc-list>
        `}renderCreate(){return U`
            <tosc-create .me=${this.me}
                @button=${this.changeScreen}
                @update=${this.updateMe}
            ></tosc-create>
        `}changeScreen(){this.showList=!this.showList}});s(0)}]);