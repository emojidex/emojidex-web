(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/es6/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  if (typeof it != 'function') {\n    throw TypeError(String(it) + ' is not a function');\n  } return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/a-function.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar codePointAt = __webpack_require__(/*! ../internals/string-at */ \"./node_modules/core-js/internals/string-at.js\");\n\n// `AdvanceStringIndex` abstract operation\n// https://tc39.github.io/ecma262/#sec-advancestringindex\nmodule.exports = function (S, index, unicode) {\n  return index + (unicode ? codePointAt(S, index, true).length : 1);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/advance-string-index.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it, Constructor, name) {\n  if (!(it instanceof Constructor)) {\n    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');\n  } return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/an-instance.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nmodule.exports = function (it) {\n  if (!isObject(it)) {\n    throw TypeError(String(it) + ' is not an object');\n  } return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/an-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ \"./node_modules/core-js/internals/to-absolute-index.js\");\n\n// `Array.prototype.{ indexOf, includes }` methods implementation\n// false -> Array#indexOf\n// https://tc39.github.io/ecma262/#sec-array.prototype.indexof\n// true  -> Array#includes\n// https://tc39.github.io/ecma262/#sec-array.prototype.includes\nmodule.exports = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIndexedObject($this);\n    var length = toLength(O.length);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare\n      if (value != value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {\n      if (O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/bind-context.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/bind-context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var aFunction = __webpack_require__(/*! ../internals/a-function */ \"./node_modules/core-js/internals/a-function.js\");\n\n// optional / simple context binding\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n  switch (length) {\n    case 0: return function () {\n      return fn.call(that);\n    };\n    case 1: return function (a) {\n      return fn.call(that, a);\n    };\n    case 2: return function (a, b) {\n      return fn.call(that, a, b);\n    };\n    case 3: return function (a, b, c) {\n      return fn.call(that, a, b, c);\n    };\n  }\n  return function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/bind-context.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\n// call something on iterator step with safe closing on error\nmodule.exports = function (iterator, fn, value, ENTRIES) {\n  try {\n    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);\n  // 7.4.6 IteratorClose(iterator, completion)\n  } catch (error) {\n    var returnMethod = iterator['return'];\n    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));\n    throw error;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/call-with-safe-iteration-closing.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar SAFE_CLOSING = false;\n\ntry {\n  var called = 0;\n  var iteratorWithReturn = {\n    next: function () {\n      return { done: !!called++ };\n    },\n    'return': function () {\n      SAFE_CLOSING = true;\n    }\n  };\n  iteratorWithReturn[ITERATOR] = function () {\n    return this;\n  };\n  // eslint-disable-next-line no-throw-literal\n  Array.from(iteratorWithReturn, function () { throw 2; });\n} catch (error) { /* empty */ }\n\nmodule.exports = function (exec, SKIP_CLOSING) {\n  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;\n  var ITERATION_SUPPORT = false;\n  try {\n    var object = {};\n    object[ITERATOR] = function () {\n      return {\n        next: function () {\n          return { done: ITERATION_SUPPORT = true };\n        }\n      };\n    };\n    exec(object);\n  } catch (error) { /* empty */ }\n  return ITERATION_SUPPORT;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/check-correctness-of-iteration.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var toString = {}.toString;\n\nmodule.exports = function (it) {\n  return toString.call(it).slice(8, -1);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/classof-raw.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\n// ES3 wrong here\nvar CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (error) { /* empty */ }\n};\n\n// getting tag from ES6+ `Object.prototype.toString`\nmodule.exports = function (it) {\n  var O, tag, result;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag\n    // builtinTag case\n    : CORRECT_ARGUMENTS ? classofRaw(O)\n    // ES3 arguments fallback\n    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/classof.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar ownKeys = __webpack_require__(/*! ../internals/own-keys */ \"./node_modules/core-js/internals/own-keys.js\");\nvar getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\n\nmodule.exports = function (target, source) {\n  var keys = ownKeys(source);\n  var defineProperty = definePropertyModule.f;\n  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/copy-constructor-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/create-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\n// Thank's IE8 for his funny defineProperty\nmodule.exports = !fails(function () {\n  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar document = global.document;\n// typeof document.createElement is 'object' in old IE\nvar exist = isObject(document) && isObject(document.createElement);\n\nmodule.exports = function (it) {\n  return exist ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/document-create-element.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// IE8- don't enum bug keys\nmodule.exports = [\n  'constructor',\n  'hasOwnProperty',\n  'isPrototypeOf',\n  'propertyIsEnumerable',\n  'toLocaleString',\n  'toString',\n  'valueOf'\n];\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\").f;\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\nvar copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ \"./node_modules/core-js/internals/copy-constructor-properties.js\");\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js/internals/is-forced.js\");\n\n/*\n  options.target      - name of the target object\n  options.global      - target is the global object\n  options.stat        - export as static methods of target\n  options.proto       - export as prototype methods of target\n  options.real        - real prototype method for the `pure` version\n  options.forced      - export even if the native feature is available\n  options.bind        - bind methods to the target, required for the `pure` version\n  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version\n  options.unsafe      - use the simple assignment of property instead of delete + defineProperty\n  options.sham        - add a flag to not completely full polyfills\n  options.enumerable  - export as enumerable property\n  options.noTargetGet - prevent calling a getter on target\n*/\nmodule.exports = function (options, source) {\n  var TARGET = options.target;\n  var GLOBAL = options.global;\n  var STATIC = options.stat;\n  var FORCED, target, key, targetProperty, sourceProperty, descriptor;\n  if (GLOBAL) {\n    target = global;\n  } else if (STATIC) {\n    target = global[TARGET] || setGlobal(TARGET, {});\n  } else {\n    target = (global[TARGET] || {}).prototype;\n  }\n  if (target) for (key in source) {\n    sourceProperty = source[key];\n    if (options.noTargetGet) {\n      descriptor = getOwnPropertyDescriptor(target, key);\n      targetProperty = descriptor && descriptor.value;\n    } else targetProperty = target[key];\n    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);\n    // contained in target\n    if (!FORCED && targetProperty !== undefined) {\n      if (typeof sourceProperty === typeof targetProperty) continue;\n      copyConstructorProperties(sourceProperty, targetProperty);\n    }\n    // add a flag to not completely full polyfills\n    if (options.sham || (targetProperty && targetProperty.sham)) {\n      hide(sourceProperty, 'sham', true);\n    }\n    // extend global\n    redefine(target, key, sourceProperty, options);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/export.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (error) {\n    return true;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/fails.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ \"./node_modules/core-js/internals/regexp-exec.js\");\n\nvar SPECIES = wellKnownSymbol('species');\n\nvar REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {\n  // #replace needs built-in support for named groups.\n  // #match works fine because it just return the exec results, even if it has\n  // a \"grops\" property.\n  var re = /./;\n  re.exec = function () {\n    var result = [];\n    result.groups = { a: '7' };\n    return result;\n  };\n  return ''.replace(re, '$<a>') !== '7';\n});\n\n// Chrome 51 has a buggy \"split\" implementation when RegExp#exec !== nativeExec\n// Weex JS has frozen built-in prototypes, so use try / catch wrapper\nvar SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {\n  var re = /(?:)/;\n  var originalExec = re.exec;\n  re.exec = function () { return originalExec.apply(this, arguments); };\n  var result = 'ab'.split(re);\n  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';\n});\n\nmodule.exports = function (KEY, length, exec, sham) {\n  var SYMBOL = wellKnownSymbol(KEY);\n\n  var DELEGATES_TO_SYMBOL = !fails(function () {\n    // String methods call symbol-named RegEp methods\n    var O = {};\n    O[SYMBOL] = function () { return 7; };\n    return ''[KEY](O) != 7;\n  });\n\n  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {\n    // Symbol-named RegExp methods call .exec\n    var execCalled = false;\n    var re = /a/;\n    re.exec = function () { execCalled = true; return null; };\n\n    if (KEY === 'split') {\n      // RegExp[@@split] doesn't call the regex's exec method, but first creates\n      // a new one. We need to return the patched regex when creating the new one.\n      re.constructor = {};\n      re.constructor[SPECIES] = function () { return re; };\n    }\n\n    re[SYMBOL]('');\n    return !execCalled;\n  });\n\n  if (\n    !DELEGATES_TO_SYMBOL ||\n    !DELEGATES_TO_EXEC ||\n    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||\n    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)\n  ) {\n    var nativeRegExpMethod = /./[SYMBOL];\n    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {\n      if (regexp.exec === regexpExec) {\n        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {\n          // The native String method already delegates to @@method (this\n          // polyfilled function), leasing to infinite recursion.\n          // We avoid it by directly calling the native @@method method.\n          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };\n        }\n        return { done: true, value: nativeMethod.call(str, regexp, arg2) };\n      }\n      return { done: false };\n    });\n    var stringMethod = methods[0];\n    var regexMethod = methods[1];\n\n    redefine(String.prototype, KEY, stringMethod);\n    redefine(RegExp.prototype, SYMBOL, length == 2\n      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)\n      // 21.2.5.11 RegExp.prototype[@@split](string, limit)\n      ? function (string, arg) { return regexMethod.call(string, this, arg); }\n      // 21.2.5.6 RegExp.prototype[@@match](string)\n      // 21.2.5.9 RegExp.prototype[@@search](string)\n      : function (string) { return regexMethod.call(string, this); }\n    );\n    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/function-to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\n\nmodule.exports = shared('native-function-to-string', Function.toString);\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/function-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js/internals/path.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\nvar aFunction = function (variable) {\n  return typeof variable == 'function' ? variable : undefined;\n};\n\nmodule.exports = function (namespace, method) {\n  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])\n    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/get-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js/internals/classof.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\n\nmodule.exports = function (it) {\n  if (it != undefined) return it[ITERATOR]\n    || it['@@iterator']\n    || Iterators[classof(it)];\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var O = 'object';\nvar check = function (it) {\n  return it && it.Math == Math && it;\n};\n\n// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nmodule.exports =\n  // eslint-disable-next-line no-undef\n  check(typeof globalThis == O && globalThis) ||\n  check(typeof window == O && window) ||\n  check(typeof self == O && self) ||\n  check(typeof global == O && global) ||\n  // eslint-disable-next-line no-new-func\n  Function('return this')();\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/global.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\n\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/has.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/hidden-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/hide.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/hide.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\n\nmodule.exports = DESCRIPTORS ? function (object, key, value) {\n  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/hide.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/host-report-errors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/host-report-errors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\nmodule.exports = function (a, b) {\n  var console = global.console;\n  if (console && console.error) {\n    arguments.length === 1 ? console.error(a) : console.error(a, b);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/host-report-errors.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\nvar document = global.document;\n\nmodule.exports = document && document.documentElement;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/html.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar createElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\n\n// Thank's IE8 for his funny defineProperty\nmodule.exports = !DESCRIPTORS && !fails(function () {\n  return Object.defineProperty(createElement('div'), 'a', {\n    get: function () { return 7; }\n  }).a != 7;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for non-array-like ES3 and non-enumerable old V8 strings\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\n\nvar split = ''.split;\n\nmodule.exports = fails(function () {\n  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346\n  // eslint-disable-next-line no-prototype-builtins\n  return !Object('z').propertyIsEnumerable(0);\n}) ? function (it) {\n  return classof(it) == 'String' ? split.call(it, '') : Object(it);\n} : Object;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ \"./node_modules/core-js/internals/native-weak-map.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar objectHas = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nvar WeakMap = global.WeakMap;\nvar set, get, has;\n\nvar enforce = function (it) {\n  return has(it) ? get(it) : set(it, {});\n};\n\nvar getterFor = function (TYPE) {\n  return function (it) {\n    var state;\n    if (!isObject(it) || (state = get(it)).type !== TYPE) {\n      throw TypeError('Incompatible receiver, ' + TYPE + ' required');\n    } return state;\n  };\n};\n\nif (NATIVE_WEAK_MAP) {\n  var store = new WeakMap();\n  var wmget = store.get;\n  var wmhas = store.has;\n  var wmset = store.set;\n  set = function (it, metadata) {\n    wmset.call(store, it, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return wmget.call(store, it) || {};\n  };\n  has = function (it) {\n    return wmhas.call(store, it);\n  };\n} else {\n  var STATE = sharedKey('state');\n  hiddenKeys[STATE] = true;\n  set = function (it, metadata) {\n    hide(it, STATE, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return objectHas(it, STATE) ? it[STATE] : {};\n  };\n  has = function (it) {\n    return objectHas(it, STATE);\n  };\n}\n\nmodule.exports = {\n  set: set,\n  get: get,\n  has: has,\n  enforce: enforce,\n  getterFor: getterFor\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/internal-state.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar ArrayPrototype = Array.prototype;\n\n// check on default Array iterator\nmodule.exports = function (it) {\n  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-array-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nvar replacement = /#|\\.prototype\\./;\n\nvar isForced = function (feature, detection) {\n  var value = data[normalize(feature)];\n  return value == POLYFILL ? true\n    : value == NATIVE ? false\n    : typeof detection == 'function' ? fails(detection)\n    : !!detection;\n};\n\nvar normalize = isForced.normalize = function (string) {\n  return String(string).replace(replacement, '.').toLowerCase();\n};\n\nvar data = isForced.data = {};\nvar NATIVE = isForced.NATIVE = 'N';\nvar POLYFILL = isForced.POLYFILL = 'P';\n\nmodule.exports = isForced;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-forced.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = false;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-pure.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterate.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/iterate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ \"./node_modules/core-js/internals/is-array-iterator-method.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar bind = __webpack_require__(/*! ../internals/bind-context */ \"./node_modules/core-js/internals/bind-context.js\");\nvar getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ \"./node_modules/core-js/internals/get-iterator-method.js\");\nvar callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ \"./node_modules/core-js/internals/call-with-safe-iteration-closing.js\");\n\nvar BREAK = {};\n\nvar exports = module.exports = function (iterable, fn, that, ENTRIES, ITERATOR) {\n  var boundFunction = bind(fn, that, ENTRIES ? 2 : 1);\n  var iterator, iterFn, index, length, result, step;\n\n  if (ITERATOR) {\n    iterator = iterable;\n  } else {\n    iterFn = getIteratorMethod(iterable);\n    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');\n    // optimisation for array iterators\n    if (isArrayIteratorMethod(iterFn)) {\n      for (index = 0, length = toLength(iterable.length); length > index; index++) {\n        result = ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);\n        if (result === BREAK) return BREAK;\n      } return;\n    }\n    iterator = iterFn.call(iterable);\n  }\n\n  while (!(step = iterator.next()).done) {\n    if (callWithSafeIterationClosing(iterator, boundFunction, step.value, ENTRIES) === BREAK) return BREAK;\n  }\n};\n\nexports.BREAK = BREAK;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/iterate.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/iterators.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/microtask.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/microtask.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\").f;\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar macrotask = __webpack_require__(/*! ../internals/task */ \"./node_modules/core-js/internals/task.js\").set;\nvar userAgent = __webpack_require__(/*! ../internals/user-agent */ \"./node_modules/core-js/internals/user-agent.js\");\n\nvar MutationObserver = global.MutationObserver || global.WebKitMutationObserver;\nvar process = global.process;\nvar Promise = global.Promise;\nvar IS_NODE = classof(process) == 'process';\n// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`\nvar queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');\nvar queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;\n\nvar flush, head, last, notify, toggle, node, promise;\n\n// modern engines have queueMicrotask method\nif (!queueMicrotask) {\n  flush = function () {\n    var parent, fn;\n    if (IS_NODE && (parent = process.domain)) parent.exit();\n    while (head) {\n      fn = head.fn;\n      head = head.next;\n      try {\n        fn();\n      } catch (error) {\n        if (head) notify();\n        else last = undefined;\n        throw error;\n      }\n    } last = undefined;\n    if (parent) parent.enter();\n  };\n\n  // Node.js\n  if (IS_NODE) {\n    notify = function () {\n      process.nextTick(flush);\n    };\n  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339\n  } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {\n    toggle = true;\n    node = document.createTextNode('');\n    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new\n    notify = function () {\n      node.data = toggle = !toggle;\n    };\n  // environments with maybe non-completely correct, but existent Promise\n  } else if (Promise && Promise.resolve) {\n    // Promise.resolve without an argument throws an error in LG WebOS 2\n    promise = Promise.resolve(undefined);\n    notify = function () {\n      promise.then(flush);\n    };\n  // for other environments - macrotask based on:\n  // - setImmediate\n  // - MessageChannel\n  // - window.postMessag\n  // - onreadystatechange\n  // - setTimeout\n  } else {\n    notify = function () {\n      // strange IE + webpack dev server bug - use .call(global)\n      macrotask.call(global, flush);\n    };\n  }\n}\n\nmodule.exports = queueMicrotask || function (fn) {\n  var task = { fn: fn, next: undefined };\n  if (last) last.next = task;\n  if (!head) {\n    head = task;\n    notify();\n  } last = task;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/microtask.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = !!Object.getOwnPropertySymbols && !fails(function () {\n  // Chrome 38 Symbol has incorrect toString conversion\n  // eslint-disable-next-line no-undef\n  return !String(Symbol());\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/native-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ \"./node_modules/core-js/internals/function-to-string.js\");\n\nvar WeakMap = global.WeakMap;\n\nmodule.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/native-weak-map.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/new-promise-capability.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/new-promise-capability.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar aFunction = __webpack_require__(/*! ../internals/a-function */ \"./node_modules/core-js/internals/a-function.js\");\n\nvar PromiseCapability = function (C) {\n  var resolve, reject;\n  this.promise = new C(function ($$resolve, $$reject) {\n    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');\n    resolve = $$resolve;\n    reject = $$reject;\n  });\n  this.resolve = aFunction(resolve);\n  this.reject = aFunction(reject);\n};\n\n// 25.4.1.5 NewPromiseCapability(C)\nmodule.exports.f = function (C) {\n  return new PromiseCapability(C);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/new-promise-capability.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\n\nvar nativeDefineProperty = Object.defineProperty;\n\nexports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return nativeDefineProperty(O, P, Attributes);\n  } catch (error) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js/internals/object-property-is-enumerable.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\n\nvar nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\nexports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {\n  O = toIndexedObject(O);\n  P = toPrimitive(P, true);\n  if (IE8_DOM_DEFINE) try {\n    return nativeGetOwnPropertyDescriptor(O, P);\n  } catch (error) { /* empty */ }\n  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)\nvar internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\n\nvar hiddenKeys = enumBugKeys.concat('length', 'prototype');\n\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return internalObjectKeys(O, hiddenKeys);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-names.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = Object.getOwnPropertySymbols;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-symbols.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar arrayIncludes = __webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js/internals/array-includes.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nvar arrayIndexOf = arrayIncludes(false);\n\nmodule.exports = function (object, names) {\n  var O = toIndexedObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (has(O, key = names[i++])) {\n    ~arrayIndexOf(result, key) || result.push(key);\n  }\n  return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar nativePropertyIsEnumerable = {}.propertyIsEnumerable;\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// Nashorn ~ JDK8 bug\nvar NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);\n\nexports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {\n  var descriptor = getOwnPropertyDescriptor(this, V);\n  return !!descriptor && descriptor.enumerable;\n} : nativePropertyIsEnumerable;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-property-is-enumerable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js/internals/classof.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar test = {};\n\ntest[TO_STRING_TAG] = 'z';\n\n// `Object.prototype.toString` method implementation\n// https://tc39.github.io/ecma262/#sec-object.prototype.tostring\nmodule.exports = String(test) !== '[object z]' ? function toString() {\n  return '[object ' + classof(this) + ']';\n} : test.toString;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js/internals/object-get-own-property-names.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js/internals/object-get-own-property-symbols.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\nvar Reflect = global.Reflect;\n\n// all object keys, includes non-enumerable and symbols\nmodule.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {\n  var keys = getOwnPropertyNamesModule.f(anObject(it));\n  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/own-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/path.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/perform.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/perform.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return { error: false, value: exec() };\n  } catch (error) {\n    return { error: true, value: error };\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/perform.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/promise-resolve.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/promise-resolve.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js/internals/new-promise-capability.js\");\n\nmodule.exports = function (C, x) {\n  anObject(C);\n  if (isObject(x) && x.constructor === C) return x;\n  var promiseCapability = newPromiseCapability.f(C);\n  var resolve = promiseCapability.resolve;\n  resolve(x);\n  return promiseCapability.promise;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/promise-resolve.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\n\nmodule.exports = function (target, src, options) {\n  for (var key in src) redefine(target, key, src[key], options);\n  return target;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/redefine-all.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\nvar nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ \"./node_modules/core-js/internals/function-to-string.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\n\nvar getInternalState = InternalStateModule.get;\nvar enforceInternalState = InternalStateModule.enforce;\nvar TEMPLATE = String(nativeFunctionToString).split('toString');\n\nshared('inspectSource', function (it) {\n  return nativeFunctionToString.call(it);\n});\n\n(module.exports = function (O, key, value, options) {\n  var unsafe = options ? !!options.unsafe : false;\n  var simple = options ? !!options.enumerable : false;\n  var noTargetGet = options ? !!options.noTargetGet : false;\n  if (typeof value == 'function') {\n    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);\n    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');\n  }\n  if (O === global) {\n    if (simple) O[key] = value;\n    else setGlobal(key, value);\n    return;\n  } else if (!unsafe) {\n    delete O[key];\n  } else if (!noTargetGet && O[key]) {\n    simple = true;\n  }\n  if (simple) O[key] = value;\n  else hide(O, key, value);\n// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative\n})(Function.prototype, 'toString', function toString() {\n  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/redefine.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ./classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar regexpExec = __webpack_require__(/*! ./regexp-exec */ \"./node_modules/core-js/internals/regexp-exec.js\");\n\n// `RegExpExec` abstract operation\n// https://tc39.github.io/ecma262/#sec-regexpexec\nmodule.exports = function (R, S) {\n  var exec = R.exec;\n  if (typeof exec === 'function') {\n    var result = exec.call(R, S);\n    if (typeof result !== 'object') {\n      throw TypeError('RegExp exec method returned something other than an Object or null');\n    }\n    return result;\n  }\n\n  if (classof(R) !== 'RegExp') {\n    throw TypeError('RegExp#exec called on incompatible receiver');\n  }\n\n  return regexpExec.call(R, S);\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-exec-abstract.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar regexpFlags = __webpack_require__(/*! ./regexp-flags */ \"./node_modules/core-js/internals/regexp-flags.js\");\n\nvar nativeExec = RegExp.prototype.exec;\n// This always refers to the native implementation, because the\n// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,\n// which loads this file before patching the method.\nvar nativeReplace = String.prototype.replace;\n\nvar patchedExec = nativeExec;\n\nvar UPDATES_LAST_INDEX_WRONG = (function () {\n  var re1 = /a/;\n  var re2 = /b*/g;\n  nativeExec.call(re1, 'a');\n  nativeExec.call(re2, 'a');\n  return re1.lastIndex !== 0 || re2.lastIndex !== 0;\n})();\n\n// nonparticipating capturing group, copied from es5-shim's String#split patch.\nvar NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;\n\nvar PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;\n\nif (PATCH) {\n  patchedExec = function exec(str) {\n    var re = this;\n    var lastIndex, reCopy, match, i;\n\n    if (NPCG_INCLUDED) {\n      reCopy = new RegExp('^' + re.source + '$(?!\\\\s)', regexpFlags.call(re));\n    }\n    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;\n\n    match = nativeExec.call(re, str);\n\n    if (UPDATES_LAST_INDEX_WRONG && match) {\n      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;\n    }\n    if (NPCG_INCLUDED && match && match.length > 1) {\n      // Fix browsers whose `exec` methods don't consistently return `undefined`\n      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/\n      nativeReplace.call(match[0], reCopy, function () {\n        for (i = 1; i < arguments.length - 2; i++) {\n          if (arguments[i] === undefined) match[i] = undefined;\n        }\n      });\n    }\n\n    return match;\n  };\n}\n\nmodule.exports = patchedExec;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-exec.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\n// `RegExp.prototype.flags` getter implementation\n// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags\nmodule.exports = function () {\n  var that = anObject(this);\n  var result = '';\n  if (that.global) result += 'g';\n  if (that.ignoreCase) result += 'i';\n  if (that.multiline) result += 'm';\n  if (that.unicode) result += 'u';\n  if (that.sticky) result += 'y';\n  return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-flags.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// `RequireObjectCoercible` abstract operation\n// https://tc39.github.io/ecma262/#sec-requireobjectcoercible\nmodule.exports = function (it) {\n  if (it == undefined) throw TypeError(\"Can't call method on \" + it);\n  return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/require-object-coercible.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\n\nmodule.exports = function (key, value) {\n  try {\n    hide(global, key, value);\n  } catch (error) {\n    global[key] = value;\n  } return value;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/set-global.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-species.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/set-species.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\n\nvar SPECIES = wellKnownSymbol('species');\n\nmodule.exports = function (CONSTRUCTOR_NAME) {\n  var C = getBuiltIn(CONSTRUCTOR_NAME);\n  var defineProperty = definePropertyModule.f;\n  if (DESCRIPTORS && C && !C[SPECIES]) defineProperty(C, SPECIES, {\n    configurable: true,\n    get: function () { return this; }\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/set-species.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f;\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\n\nmodule.exports = function (it, TAG, STATIC) {\n  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {\n    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/set-to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\n\nvar keys = shared('keys');\n\nmodule.exports = function (key) {\n  return keys[key] || (keys[key] = uid(key));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\n\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || setGlobal(SHARED, {});\n\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: '3.1.3',\n  mode: IS_PURE ? 'pure' : 'global',\n  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/shared.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/sloppy-array-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/sloppy-array-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = function (METHOD_NAME, argument) {\n  var method = [][METHOD_NAME];\n  return !method || !fails(function () {\n    // eslint-disable-next-line no-useless-call,no-throw-literal\n    method.call(null, argument || function () { throw 1; }, 1);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/sloppy-array-method.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/species-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/species-constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar aFunction = __webpack_require__(/*! ../internals/a-function */ \"./node_modules/core-js/internals/a-function.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar SPECIES = wellKnownSymbol('species');\n\n// `SpeciesConstructor` abstract operation\n// https://tc39.github.io/ecma262/#sec-speciesconstructor\nmodule.exports = function (O, defaultConstructor) {\n  var C = anObject(O).constructor;\n  var S;\n  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/species-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/string-at.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/string-at.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\n// CONVERT_TO_STRING: true  -> String#at\n// CONVERT_TO_STRING: false -> String#codePointAt\nmodule.exports = function (that, pos, CONVERT_TO_STRING) {\n  var S = String(requireObjectCoercible(that));\n  var position = toInteger(pos);\n  var size = S.length;\n  var first, second;\n  if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;\n  first = S.charCodeAt(position);\n  return first < 0xD800 || first > 0xDBFF || position + 1 === size\n    || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF\n      ? CONVERT_TO_STRING ? S.charAt(position) : first\n      : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/string-at.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/task.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/task.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar bind = __webpack_require__(/*! ../internals/bind-context */ \"./node_modules/core-js/internals/bind-context.js\");\nvar html = __webpack_require__(/*! ../internals/html */ \"./node_modules/core-js/internals/html.js\");\nvar createElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\n\nvar location = global.location;\nvar set = global.setImmediate;\nvar clear = global.clearImmediate;\nvar process = global.process;\nvar MessageChannel = global.MessageChannel;\nvar Dispatch = global.Dispatch;\nvar counter = 0;\nvar queue = {};\nvar ONREADYSTATECHANGE = 'onreadystatechange';\nvar defer, channel, port;\n\nvar run = function (id) {\n  // eslint-disable-next-line no-prototype-builtins\n  if (queue.hasOwnProperty(id)) {\n    var fn = queue[id];\n    delete queue[id];\n    fn();\n  }\n};\n\nvar runner = function (id) {\n  return function () {\n    run(id);\n  };\n};\n\nvar listener = function (event) {\n  run(event.data);\n};\n\nvar post = function (id) {\n  // old engines have not location.origin\n  global.postMessage(id + '', location.protocol + '//' + location.host);\n};\n\n// Node.js 0.9+ & IE10+ has setImmediate, otherwise:\nif (!set || !clear) {\n  set = function setImmediate(fn) {\n    var args = [];\n    var i = 1;\n    while (arguments.length > i) args.push(arguments[i++]);\n    queue[++counter] = function () {\n      // eslint-disable-next-line no-new-func\n      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);\n    };\n    defer(counter);\n    return counter;\n  };\n  clear = function clearImmediate(id) {\n    delete queue[id];\n  };\n  // Node.js 0.8-\n  if (classof(process) == 'process') {\n    defer = function (id) {\n      process.nextTick(runner(id));\n    };\n  // Sphere (JS game engine) Dispatch API\n  } else if (Dispatch && Dispatch.now) {\n    defer = function (id) {\n      Dispatch.now(runner(id));\n    };\n  // Browsers with MessageChannel, includes WebWorkers\n  } else if (MessageChannel) {\n    channel = new MessageChannel();\n    port = channel.port2;\n    channel.port1.onmessage = listener;\n    defer = bind(port.postMessage, port, 1);\n  // Browsers with postMessage, skip WebWorkers\n  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'\n  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {\n    defer = post;\n    global.addEventListener('message', listener, false);\n  // IE8-\n  } else if (ONREADYSTATECHANGE in createElement('script')) {\n    defer = function (id) {\n      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {\n        html.removeChild(this);\n        run(id);\n      };\n    };\n  // Rest old browsers\n  } else {\n    defer = function (id) {\n      setTimeout(runner(id), 0);\n    };\n  }\n}\n\nmodule.exports = {\n  set: set,\n  clear: clear\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/task.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\n\nvar max = Math.max;\nvar min = Math.min;\n\n// Helper for a popular repeating case of the spec:\n// Let integer be ? ToInteger(index).\n// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).\nmodule.exports = function (index, length) {\n  var integer = toInteger(index);\n  return integer < 0 ? max(integer + length, 0) : min(integer, length);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// toObject with fallback for non-array-like ES3 strings\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js/internals/indexed-object.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\nmodule.exports = function (it) {\n  return IndexedObject(requireObjectCoercible(it));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var ceil = Math.ceil;\nvar floor = Math.floor;\n\n// `ToInteger` abstract operation\n// https://tc39.github.io/ecma262/#sec-tointeger\nmodule.exports = function (argument) {\n  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-integer.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\n\nvar min = Math.min;\n\n// `ToLength` abstract operation\n// https://tc39.github.io/ecma262/#sec-tolength\nmodule.exports = function (argument) {\n  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-length.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\n// `ToObject` abstract operation\n// https://tc39.github.io/ecma262/#sec-toobject\nmodule.exports = function (argument) {\n  return Object(requireObjectCoercible(argument));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\n// 7.1.1 ToPrimitive(input [, PreferredType])\n// instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var id = 0;\nvar postfix = Math.random();\n\nmodule.exports = function (key) {\n  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/uid.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/user-agent.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/user-agent.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\nvar navigator = global.navigator;\n\nmodule.exports = navigator && navigator.userAgent || '';\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/user-agent.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ \"./node_modules/core-js/internals/native-symbol.js\");\n\nvar Symbol = global.Symbol;\nvar store = shared('wks');\n\nmodule.exports = function (name) {\n  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]\n    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.index-of.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.index-of.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ \"./node_modules/core-js/internals/sloppy-array-method.js\");\nvar arrayIncludes = __webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js/internals/array-includes.js\");\n\nvar internalIndexOf = arrayIncludes(false);\nvar nativeIndexOf = [].indexOf;\n\nvar NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;\nvar SLOPPY_METHOD = sloppyArrayMethod('indexOf');\n\n// `Array.prototype.indexOf` method\n// https://tc39.github.io/ecma262/#sec-array.prototype.indexof\n$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {\n  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {\n    return NEGATIVE_ZERO\n      // convert -0 to +0\n      ? nativeIndexOf.apply(this, arguments) || 0\n      : internalIndexOf(this, searchElement, arguments[1]);\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.array.index-of.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.object.define-property.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.define-property.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar objectDefinePropertyModile = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\n\n// `Object.defineProperty` method\n// https://tc39.github.io/ecma262/#sec-object.defineproperty\n$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {\n  defineProperty: objectDefinePropertyModile.f\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.object.define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar toString = __webpack_require__(/*! ../internals/object-to-string */ \"./node_modules/core-js/internals/object-to-string.js\");\n\nvar ObjectPrototype = Object.prototype;\n\n// `Object.prototype.toString` method\n// https://tc39.github.io/ecma262/#sec-object.prototype.tostring\nif (toString !== ObjectPrototype.toString) {\n  redefine(ObjectPrototype, 'toString', toString, { unsafe: true });\n}\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.object.to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js/internals/path.js\");\nvar redefineAll = __webpack_require__(/*! ../internals/redefine-all */ \"./node_modules/core-js/internals/redefine-all.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar setSpecies = __webpack_require__(/*! ../internals/set-species */ \"./node_modules/core-js/internals/set-species.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar aFunction = __webpack_require__(/*! ../internals/a-function */ \"./node_modules/core-js/internals/a-function.js\");\nvar anInstance = __webpack_require__(/*! ../internals/an-instance */ \"./node_modules/core-js/internals/an-instance.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js/internals/iterate.js\");\nvar checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ \"./node_modules/core-js/internals/check-correctness-of-iteration.js\");\nvar speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ \"./node_modules/core-js/internals/species-constructor.js\");\nvar task = __webpack_require__(/*! ../internals/task */ \"./node_modules/core-js/internals/task.js\").set;\nvar microtask = __webpack_require__(/*! ../internals/microtask */ \"./node_modules/core-js/internals/microtask.js\");\nvar promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ \"./node_modules/core-js/internals/promise-resolve.js\");\nvar hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ \"./node_modules/core-js/internals/host-report-errors.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js/internals/perform.js\");\nvar userAgent = __webpack_require__(/*! ../internals/user-agent */ \"./node_modules/core-js/internals/user-agent.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js/internals/is-forced.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar SPECIES = wellKnownSymbol('species');\nvar PROMISE = 'Promise';\nvar getInternalState = InternalStateModule.get;\nvar setInternalState = InternalStateModule.set;\nvar getInternalPromiseState = InternalStateModule.getterFor(PROMISE);\nvar PromiseConstructor = global[PROMISE];\nvar TypeError = global.TypeError;\nvar document = global.document;\nvar process = global.process;\nvar $fetch = global.fetch;\nvar versions = process && process.versions;\nvar v8 = versions && versions.v8 || '';\nvar newPromiseCapability = newPromiseCapabilityModule.f;\nvar newGenericPromiseCapability = newPromiseCapability;\nvar IS_NODE = classof(process) == 'process';\nvar DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);\nvar UNHANDLED_REJECTION = 'unhandledrejection';\nvar REJECTION_HANDLED = 'rejectionhandled';\nvar PENDING = 0;\nvar FULFILLED = 1;\nvar REJECTED = 2;\nvar HANDLED = 1;\nvar UNHANDLED = 2;\nvar Internal, OwnPromiseCapability, PromiseWrapper;\n\nvar FORCED = isForced(PROMISE, function () {\n  // correct subclassing with @@species support\n  var promise = PromiseConstructor.resolve(1);\n  var empty = function () { /* empty */ };\n  var FakePromise = (promise.constructor = {})[SPECIES] = function (exec) {\n    exec(empty, empty);\n  };\n  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test\n  return !((IS_NODE || typeof PromiseRejectionEvent == 'function')\n    && (!IS_PURE || promise['finally'])\n    && promise.then(empty) instanceof FakePromise\n    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables\n    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565\n    // we can't detect it synchronously, so just check versions\n    && v8.indexOf('6.6') !== 0\n    && userAgent.indexOf('Chrome/66') === -1);\n});\n\nvar INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {\n  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });\n});\n\n// helpers\nvar isThenable = function (it) {\n  var then;\n  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;\n};\n\nvar notify = function (promise, state, isReject) {\n  if (state.notified) return;\n  state.notified = true;\n  var chain = state.reactions;\n  microtask(function () {\n    var value = state.value;\n    var ok = state.state == FULFILLED;\n    var i = 0;\n    var run = function (reaction) {\n      var handler = ok ? reaction.ok : reaction.fail;\n      var resolve = reaction.resolve;\n      var reject = reaction.reject;\n      var domain = reaction.domain;\n      var result, then, exited;\n      try {\n        if (handler) {\n          if (!ok) {\n            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);\n            state.rejection = HANDLED;\n          }\n          if (handler === true) result = value;\n          else {\n            if (domain) domain.enter();\n            result = handler(value); // may throw\n            if (domain) {\n              domain.exit();\n              exited = true;\n            }\n          }\n          if (result === reaction.promise) {\n            reject(TypeError('Promise-chain cycle'));\n          } else if (then = isThenable(result)) {\n            then.call(result, resolve, reject);\n          } else resolve(result);\n        } else reject(value);\n      } catch (error) {\n        if (domain && !exited) domain.exit();\n        reject(error);\n      }\n    };\n    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach\n    state.reactions = [];\n    state.notified = false;\n    if (isReject && !state.rejection) onUnhandled(promise, state);\n  });\n};\n\nvar dispatchEvent = function (name, promise, reason) {\n  var event, handler;\n  if (DISPATCH_EVENT) {\n    event = document.createEvent('Event');\n    event.promise = promise;\n    event.reason = reason;\n    event.initEvent(name, false, true);\n    global.dispatchEvent(event);\n  } else event = { promise: promise, reason: reason };\n  if (handler = global['on' + name]) handler(event);\n  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);\n};\n\nvar onUnhandled = function (promise, state) {\n  task.call(global, function () {\n    var value = state.value;\n    var IS_UNHANDLED = isUnhandled(state);\n    var result;\n    if (IS_UNHANDLED) {\n      result = perform(function () {\n        if (IS_NODE) {\n          process.emit('unhandledRejection', value, promise);\n        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);\n      });\n      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should\n      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;\n      if (result.error) throw result.value;\n    }\n  });\n};\n\nvar isUnhandled = function (state) {\n  return state.rejection !== HANDLED && !state.parent;\n};\n\nvar onHandleUnhandled = function (promise, state) {\n  task.call(global, function () {\n    if (IS_NODE) {\n      process.emit('rejectionHandled', promise);\n    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);\n  });\n};\n\nvar bind = function (fn, promise, state, unwrap) {\n  return function (value) {\n    fn(promise, state, value, unwrap);\n  };\n};\n\nvar internalReject = function (promise, state, value, unwrap) {\n  if (state.done) return;\n  state.done = true;\n  if (unwrap) state = unwrap;\n  state.value = value;\n  state.state = REJECTED;\n  notify(promise, state, true);\n};\n\nvar internalResolve = function (promise, state, value, unwrap) {\n  if (state.done) return;\n  state.done = true;\n  if (unwrap) state = unwrap;\n  try {\n    if (promise === value) throw TypeError(\"Promise can't be resolved itself\");\n    var then = isThenable(value);\n    if (then) {\n      microtask(function () {\n        var wrapper = { done: false };\n        try {\n          then.call(value,\n            bind(internalResolve, promise, wrapper, state),\n            bind(internalReject, promise, wrapper, state)\n          );\n        } catch (error) {\n          internalReject(promise, wrapper, error, state);\n        }\n      });\n    } else {\n      state.value = value;\n      state.state = FULFILLED;\n      notify(promise, state, false);\n    }\n  } catch (error) {\n    internalReject(promise, { done: false }, error, state);\n  }\n};\n\n// constructor polyfill\nif (FORCED) {\n  // 25.4.3.1 Promise(executor)\n  PromiseConstructor = function Promise(executor) {\n    anInstance(this, PromiseConstructor, PROMISE);\n    aFunction(executor);\n    Internal.call(this);\n    var state = getInternalState(this);\n    try {\n      executor(bind(internalResolve, this, state), bind(internalReject, this, state));\n    } catch (error) {\n      internalReject(this, state, error);\n    }\n  };\n  // eslint-disable-next-line no-unused-vars\n  Internal = function Promise(executor) {\n    setInternalState(this, {\n      type: PROMISE,\n      done: false,\n      notified: false,\n      parent: false,\n      reactions: [],\n      rejection: false,\n      state: PENDING,\n      value: undefined\n    });\n  };\n  Internal.prototype = redefineAll(PromiseConstructor.prototype, {\n    // `Promise.prototype.then` method\n    // https://tc39.github.io/ecma262/#sec-promise.prototype.then\n    then: function then(onFulfilled, onRejected) {\n      var state = getInternalPromiseState(this);\n      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));\n      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;\n      reaction.fail = typeof onRejected == 'function' && onRejected;\n      reaction.domain = IS_NODE ? process.domain : undefined;\n      state.parent = true;\n      state.reactions.push(reaction);\n      if (state.state != PENDING) notify(this, state, false);\n      return reaction.promise;\n    },\n    // `Promise.prototype.catch` method\n    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch\n    'catch': function (onRejected) {\n      return this.then(undefined, onRejected);\n    }\n  });\n  OwnPromiseCapability = function () {\n    var promise = new Internal();\n    var state = getInternalState(promise);\n    this.promise = promise;\n    this.resolve = bind(internalResolve, promise, state);\n    this.reject = bind(internalReject, promise, state);\n  };\n  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {\n    return C === PromiseConstructor || C === PromiseWrapper\n      ? new OwnPromiseCapability(C)\n      : newGenericPromiseCapability(C);\n  };\n\n  // wrap fetch result\n  if (!IS_PURE && typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {\n    // eslint-disable-next-line no-unused-vars\n    fetch: function fetch(input) {\n      return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));\n    }\n  });\n}\n\n$({ global: true, wrap: true, forced: FORCED }, {\n  Promise: PromiseConstructor\n});\n\nsetToStringTag(PromiseConstructor, PROMISE, false, true);\nsetSpecies(PROMISE);\n\nPromiseWrapper = path[PROMISE];\n\n// statics\n$({ target: PROMISE, stat: true, forced: FORCED }, {\n  // `Promise.reject` method\n  // https://tc39.github.io/ecma262/#sec-promise.reject\n  reject: function reject(r) {\n    var capability = newPromiseCapability(this);\n    capability.reject.call(undefined, r);\n    return capability.promise;\n  }\n});\n\n$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {\n  // `Promise.resolve` method\n  // https://tc39.github.io/ecma262/#sec-promise.resolve\n  resolve: function resolve(x) {\n    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);\n  }\n});\n\n$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {\n  // `Promise.all` method\n  // https://tc39.github.io/ecma262/#sec-promise.all\n  all: function all(iterable) {\n    var C = this;\n    var capability = newPromiseCapability(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var $promiseResolve = aFunction(C.resolve);\n      var values = [];\n      var counter = 0;\n      var remaining = 1;\n      iterate(iterable, function (promise) {\n        var index = counter++;\n        var alreadyCalled = false;\n        values.push(undefined);\n        remaining++;\n        $promiseResolve.call(C, promise).then(function (value) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[index] = value;\n          --remaining || resolve(values);\n        }, reject);\n      });\n      --remaining || resolve(values);\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  },\n  // `Promise.race` method\n  // https://tc39.github.io/ecma262/#sec-promise.race\n  race: function race(iterable) {\n    var C = this;\n    var capability = newPromiseCapability(C);\n    var reject = capability.reject;\n    var result = perform(function () {\n      var $promiseResolve = aFunction(C.resolve);\n      iterate(iterable, function (promise) {\n        $promiseResolve.call(C, promise).then(capability.resolve, reject);\n      });\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.promise.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.exec.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar exec = __webpack_require__(/*! ../internals/regexp-exec */ \"./node_modules/core-js/internals/regexp-exec.js\");\n\n$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {\n  exec: exec\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.regexp.exec.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.match.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.match.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ \"./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\nvar advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ \"./node_modules/core-js/internals/advance-string-index.js\");\nvar regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ \"./node_modules/core-js/internals/regexp-exec-abstract.js\");\n\n// @@match logic\nfixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {\n  return [\n    // `String.prototype.match` method\n    // https://tc39.github.io/ecma262/#sec-string.prototype.match\n    function match(regexp) {\n      var O = requireObjectCoercible(this);\n      var matcher = regexp == undefined ? undefined : regexp[MATCH];\n      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));\n    },\n    // `RegExp.prototype[@@match]` method\n    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match\n    function (regexp) {\n      var res = maybeCallNative(nativeMatch, regexp, this);\n      if (res.done) return res.value;\n\n      var rx = anObject(regexp);\n      var S = String(this);\n\n      if (!rx.global) return regExpExec(rx, S);\n\n      var fullUnicode = rx.unicode;\n      rx.lastIndex = 0;\n      var A = [];\n      var n = 0;\n      var result;\n      while ((result = regExpExec(rx, S)) !== null) {\n        var matchStr = String(result[0]);\n        A[n] = matchStr;\n        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);\n        n++;\n      }\n      return n === 0 ? null : A;\n    }\n  ];\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.string.match.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ \"./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\nvar advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ \"./node_modules/core-js/internals/advance-string-index.js\");\nvar regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ \"./node_modules/core-js/internals/regexp-exec-abstract.js\");\n\nvar max = Math.max;\nvar min = Math.min;\nvar floor = Math.floor;\nvar SUBSTITUTION_SYMBOLS = /\\$([$&'`]|\\d\\d?|<[^>]*>)/g;\nvar SUBSTITUTION_SYMBOLS_NO_NAMED = /\\$([$&'`]|\\d\\d?)/g;\n\nvar maybeToString = function (it) {\n  return it === undefined ? it : String(it);\n};\n\n// @@replace logic\nfixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {\n  return [\n    // `String.prototype.replace` method\n    // https://tc39.github.io/ecma262/#sec-string.prototype.replace\n    function replace(searchValue, replaceValue) {\n      var O = requireObjectCoercible(this);\n      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];\n      return replacer !== undefined\n        ? replacer.call(searchValue, O, replaceValue)\n        : nativeReplace.call(String(O), searchValue, replaceValue);\n    },\n    // `RegExp.prototype[@@replace]` method\n    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace\n    function (regexp, replaceValue) {\n      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);\n      if (res.done) return res.value;\n\n      var rx = anObject(regexp);\n      var S = String(this);\n\n      var functionalReplace = typeof replaceValue === 'function';\n      if (!functionalReplace) replaceValue = String(replaceValue);\n\n      var global = rx.global;\n      if (global) {\n        var fullUnicode = rx.unicode;\n        rx.lastIndex = 0;\n      }\n      var results = [];\n      while (true) {\n        var result = regExpExec(rx, S);\n        if (result === null) break;\n\n        results.push(result);\n        if (!global) break;\n\n        var matchStr = String(result[0]);\n        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);\n      }\n\n      var accumulatedResult = '';\n      var nextSourcePosition = 0;\n      for (var i = 0; i < results.length; i++) {\n        result = results[i];\n\n        var matched = String(result[0]);\n        var position = max(min(toInteger(result.index), S.length), 0);\n        var captures = [];\n        // NOTE: This is equivalent to\n        //   captures = result.slice(1).map(maybeToString)\n        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in\n        // the slice polyfill when slicing native arrays) \"doesn't work\" in safari 9 and\n        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.\n        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));\n        var namedCaptures = result.groups;\n        if (functionalReplace) {\n          var replacerArgs = [matched].concat(captures, position, S);\n          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);\n          var replacement = String(replaceValue.apply(undefined, replacerArgs));\n        } else {\n          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);\n        }\n        if (position >= nextSourcePosition) {\n          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;\n          nextSourcePosition = position + matched.length;\n        }\n      }\n      return accumulatedResult + S.slice(nextSourcePosition);\n    }\n  ];\n\n  // https://tc39.github.io/ecma262/#sec-getsubstitution\n  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {\n    var tailPos = position + matched.length;\n    var m = captures.length;\n    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;\n    if (namedCaptures !== undefined) {\n      namedCaptures = toObject(namedCaptures);\n      symbols = SUBSTITUTION_SYMBOLS;\n    }\n    return nativeReplace.call(replacement, symbols, function (match, ch) {\n      var capture;\n      switch (ch.charAt(0)) {\n        case '$': return '$';\n        case '&': return matched;\n        case '`': return str.slice(0, position);\n        case \"'\": return str.slice(tailPos);\n        case '<':\n          capture = namedCaptures[ch.slice(1, -1)];\n          break;\n        default: // \\d\\d?\n          var n = +ch;\n          if (n === 0) return match;\n          if (n > m) {\n            var f = floor(n / 10);\n            if (f === 0) return match;\n            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);\n            return match;\n          }\n          capture = captures[n - 1];\n      }\n      return capture === undefined ? '' : capture;\n    });\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.string.replace.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/node_modules/cross-storage/lib/client.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/emojidex-client/node_modules/cross-storage/lib/client.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval(";(function(root) {\n  /**\n   * Constructs a new cross storage client given the url to a hub. By default,\n   * an iframe is created within the document body that points to the url. It\n   * also accepts an options object, which may include a timeout, frameId, and\n   * promise. The timeout, in milliseconds, is applied to each request and\n   * defaults to 5000ms. The options object may also include a frameId,\n   * identifying an existing frame on which to install its listeners. If the\n   * promise key is supplied the constructor for a Promise, that Promise library\n   * will be used instead of the default window.Promise.\n   *\n   * @example\n   * var storage = new CrossStorageClient('https://store.example.com/hub.html');\n   *\n   * @example\n   * var storage = new CrossStorageClient('https://store.example.com/hub.html', {\n   *   timeout: 5000,\n   *   frameId: 'storageFrame'\n   * });\n   *\n   * @constructor\n   *\n   * @param {string} url    The url to a cross storage hub\n   * @param {object} [opts] An optional object containing additional options,\n   *                        including timeout, frameId, and promise\n   *\n   * @property {string}   _id        A UUID v4 id\n   * @property {function} _promise   The Promise object to use\n   * @property {string}   _frameId   The id of the iFrame pointing to the hub url\n   * @property {string}   _origin    The hub's origin\n   * @property {object}   _requests  Mapping of request ids to callbacks\n   * @property {bool}     _connected Whether or not it has connected\n   * @property {bool}     _closed    Whether or not the client has closed\n   * @property {int}      _count     Number of requests sent\n   * @property {function} _listener  The listener added to the window\n   * @property {Window}   _hub       The hub window\n   */\n  function CrossStorageClient(url, opts) {\n    opts = opts || {};\n\n    this._id        = CrossStorageClient._generateUUID();\n    this._promise   = opts.promise || Promise;\n    this._frameId   = opts.frameId || 'CrossStorageClient-' + this._id;\n    this._origin    = CrossStorageClient._getOrigin(url);\n    this._requests  = {};\n    this._connected = false;\n    this._closed    = false;\n    this._count     = 0;\n    this._timeout   = opts.timeout || 5000;\n    this._listener  = null;\n\n    this._installListener();\n\n    var frame;\n    if (opts.frameId) {\n      frame = document.getElementById(opts.frameId);\n    }\n\n    // If using a passed iframe, poll the hub for a ready message\n    // if (frame) {\n    //   this._poll();\n    // }\n\n    // Create the frame if not found or specified\n    if (frame) {\n      this._hub = frame.contentWindow;\n    } else {\n      this._createFrame(url)\n    }\n\n  }\n\n  /**\n   * The styles to be applied to the generated iFrame. Defines a set of properties\n   * that hide the element by positioning it outside of the visible area, and\n   * by modifying its display.\n   *\n   * @member {Object}\n   */\n  CrossStorageClient.frameStyle = {\n    display:  'none',\n    position: 'absolute',\n    top:      '-999px',\n    left:     '-999px'\n  };\n\n  /**\n   * Returns the origin of an url, with cross browser support. Accommodates\n   * the lack of location.origin in IE, as well as the discrepancies in the\n   * inclusion of the port when using the default port for a protocol, e.g.\n   * 443 over https. Defaults to the origin of window.location if passed a\n   * relative path.\n   *\n   * @param   {string} url The url to a cross storage hub\n   * @returns {string} The origin of the url\n   */\n  CrossStorageClient._getOrigin = function(url) {\n    var uri, protocol, origin;\n\n    uri = document.createElement('a');\n    uri.href = url;\n\n    if (!uri.host) {\n      uri = window.location;\n    }\n\n    if (!uri.protocol || uri.protocol === ':') {\n      protocol = window.location.protocol;\n    } else {\n      protocol = uri.protocol;\n    }\n\n    origin = protocol + '//' + uri.host;\n    origin = origin.replace(/:80$|:443$/, '');\n\n    return origin;\n  };\n\n  /**\n   * UUID v4 generation, taken from: http://stackoverflow.com/questions/\n   * 105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523\n   *\n   * @returns {string} A UUID v4 string\n   */\n  CrossStorageClient._generateUUID = function() {\n    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {\n      var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);\n\n      return v.toString(16);\n    });\n  };\n\n\n  CrossStorageClient.prototype.onReadyFrame = function() {\n    var client = this;\n    var targetOrigin = (client._origin === 'file://') ? '*' : client._origin;\n\n    var interval_poll = setInterval(function() {\n      if (client._connected){\n        return clearInterval(interval_poll);\n      }\n      if (!client._hub) {\n        return;\n      }\n\n      client._hub.postMessage('cross-storage:poll', targetOrigin);\n    }, 1000);\n\n    return new this._promise(function(resolve, reject) {\n      var timeout = setTimeout(function() {\n        reject(new Error('CrossStorageClient could not ready frame'));\n      }, client._timeout);\n\n      var interval_hub = setInterval(function() {\n        if (typeof client._hub !== \"undefined\" && client._hub !== null) {\n          clearTimeout(timeout);\n          clearInterval(interval_hub);\n          resolve();\n        }\n      }, 100);\n\n    });\n  };\n\n\n  /**\n   * Returns a promise that is fulfilled when a connection has been established\n   * with the cross storage hub. Its use is required to avoid sending any\n   * requests prior to initialization being complete.\n   *\n   * @returns {Promise} A promise that is resolved on connect\n   */\n  CrossStorageClient.prototype.onConnect = function() {\n    var client = this;\n\n    if (this._connected) {\n      return this._promise.resolve();\n    } else if (this._closed) {\n      return this._promise.reject(new Error('CrossStorageClient has closed'));\n    }\n\n    // Queue connect requests for client re-use\n    if (!this._requests.connect) {\n      this._requests.connect = [];\n    }\n\n    return new this._promise(function(resolve, reject) {\n      var timeout = setTimeout(function() {\n        reject(new Error('CrossStorageClient could not connect'));\n      }, client._timeout);\n\n      client._requests.connect.push(function(err) {\n        clearTimeout(timeout);\n        if (err) return reject(err);\n\n        resolve();\n      });\n    });\n  };\n\n  /**\n   * Sets a key to the specified value. Returns a promise that is fulfilled on\n   * success, or rejected if any errors setting the key occurred, or the request\n   * timed out.\n   *\n   * @param   {string}  key   The key to set\n   * @param   {*}       value The value to assign\n   * @returns {Promise} A promise that is settled on hub response or timeout\n   */\n  CrossStorageClient.prototype.set = function(key, value) {\n    return this._request('set', {\n      key:   key,\n      value: value\n    });\n  };\n\n  /**\n   * Accepts one or more keys for which to retrieve their values. Returns a\n   * promise that is settled on hub response or timeout. On success, it is\n   * fulfilled with the value of the key if only passed a single argument.\n   * Otherwise it's resolved with an array of values. On failure, it is rejected\n   * with the corresponding error message.\n   *\n   * @param   {...string} key The key to retrieve\n   * @returns {Promise}   A promise that is settled on hub response or timeout\n   */\n  CrossStorageClient.prototype.get = function(key) {\n    var args = Array.prototype.slice.call(arguments);\n\n    return this._request('get', {keys: args});\n  };\n\n  /**\n   * Accepts one or more keys for deletion. Returns a promise that is settled on\n   * hub response or timeout.\n   *\n   * @param   {...string} key The key to delete\n   * @returns {Promise}   A promise that is settled on hub response or timeout\n   */\n  CrossStorageClient.prototype.del = function() {\n    var args = Array.prototype.slice.call(arguments);\n\n    return this._request('del', {keys: args});\n  };\n\n  /**\n   * Returns a promise that, when resolved, indicates that all localStorage\n   * data has been cleared.\n   *\n   * @returns {Promise} A promise that is settled on hub response or timeout\n   */\n  CrossStorageClient.prototype.clear = function() {\n    return this._request('clear');\n  };\n\n  /**\n   * Returns a promise that, when resolved, passes an array of all keys\n   * currently in storage.\n   *\n   * @returns {Promise} A promise that is settled on hub response or timeout\n   */\n  CrossStorageClient.prototype.getKeys = function() {\n    return this._request('getKeys');\n  };\n\n  /**\n   * Deletes the iframe and sets the connected state to false. The client can\n   * no longer be used after being invoked.\n   */\n  CrossStorageClient.prototype.close = function() {\n    var frame = document.getElementById(this._frameId);\n    if (frame) {\n      frame.parentNode.removeChild(frame);\n    }\n\n    // Support IE8 with detachEvent\n    if (window.removeEventListener) {\n      window.removeEventListener('message', this._listener, false);\n    } else {\n      window.detachEvent('onmessage', this._listener);\n    }\n\n    this._connected = false;\n    this._closed = true;\n  };\n\n  /**\n   * Installs the necessary listener for the window message event. When a message\n   * is received, the client's _connected status is changed to true, and the\n   * onConnect promise is fulfilled. Given a response message, the callback\n   * corresponding to its request is invoked. If response.error holds a truthy\n   * value, the promise associated with the original request is rejected with\n   * the error. Otherwise the promise is fulfilled and passed response.result.\n   *\n   * @private\n   */\n  CrossStorageClient.prototype._installListener = function() {\n    var client = this;\n\n    this._listener = function(message) {\n      var i, origin, error, response;\n\n      // Ignore invalid messages or those after the client has closed\n      if (client._closed || !message.data || typeof message.data !== 'string') {\n        return;\n      }\n\n      // postMessage returns the string \"null\" as the origin for \"file://\"\n      origin = (message.origin === 'null') ? 'file://' : message.origin;\n\n      // Ignore messages not from the correct origin\n      if (origin !== client._origin) return;\n\n      // LocalStorage isn't available in the hub\n      if (message.data === 'cross-storage:unavailable') {\n        if (!client._closed) client.close();\n        if (!client._requests.connect) return;\n\n        error = new Error('Closing client. Could not access localStorage in hub.');\n        for (i = 0; i < client._requests.connect.length; i++) {\n          client._requests.connect[i](error);\n        }\n\n        return;\n      }\n\n      // Handle initial connection\n      if (message.data.indexOf('cross-storage:') !== -1 && !client._connected) {\n        client._connected = true;\n        if (!client._requests.connect) return;\n\n        for (i = 0; i < client._requests.connect.length; i++) {\n          client._requests.connect[i](error);\n        }\n        delete client._requests.connect;\n      }\n\n      if (message.data === 'cross-storage:ready') return;\n\n      // All other messages\n      try {\n        response = JSON.parse(message.data);\n      } catch(e) {\n        return;\n      }\n\n      if (!response.id) return;\n\n      if (client._requests[response.id]) {\n        client._requests[response.id](response.error, response.result);\n      }\n    };\n\n    // Support IE8 with attachEvent\n    if (window.addEventListener) {\n      window.addEventListener('message', this._listener, false);\n    } else {\n      window.attachEvent('onmessage', this._listener);\n    }\n  };\n\n  /**\n   * Invoked when a frame id was passed to the client, rather than allowing\n   * the client to create its own iframe. Polls the hub for a ready event to\n   * establish a connected state.\n   */\n  CrossStorageClient.prototype._poll = function() {\n    var client, interval, targetOrigin;\n\n    client = this;\n\n    // postMessage requires that the target origin be set to \"*\" for \"file://\"\n    targetOrigin = (client._origin === 'file://') ? '*' : client._origin;\n\n    interval = setInterval(function() {\n      if (client._connected) return clearInterval(interval);\n      if (!client._hub) return;\n\n      client._hub.postMessage('cross-storage:poll', targetOrigin);\n    }, 1000);\n  };\n\n  /**\n   * Creates a new iFrame containing the hub. Applies the necessary styles to\n   * hide the element from view, prior to adding it to the document body.\n   * Returns the created element.\n   *\n   * @private\n   *\n   * @param  {string}            url The url to the hub\n   * returns {HTMLIFrameElement} The iFrame element itself\n   */\n  CrossStorageClient.prototype._createFrame = function(url) {\n    var client = this;\n    var frame, key;\n\n    frame = window.document.createElement('iframe');\n    frame.id = this._frameId;\n\n    // Style the iframe\n    for (key in CrossStorageClient.frameStyle) {\n      if (CrossStorageClient.frameStyle.hasOwnProperty(key)) {\n        frame.style[key] = CrossStorageClient.frameStyle[key];\n      }\n    }\n    window.document.body.appendChild(frame);\n\n    frame.onload = function(){\n      client._hub = frame.contentWindow\n    }\n    frame.src = url;\n  };\n\n  /**\n   * Sends a message containing the given method and params to the hub. Stores\n   * a callback in the _requests object for later invocation on message, or\n   * deletion on timeout. Returns a promise that is settled in either instance.\n   *\n   * @private\n   *\n   * @param   {string}  method The method to invoke\n   * @param   {*}       params The arguments to pass\n   * @returns {Promise} A promise that is settled on hub response or timeout\n   */\n  CrossStorageClient.prototype._request = function(method, params) {\n    var req, client;\n\n    if (this._closed) {\n      return this._promise.reject(new Error('CrossStorageClient has closed'));\n    }\n\n    client = this;\n    client._count++;\n\n    req = {\n      id:     this._id + ':' + client._count,\n      method: 'cross-storage:' + method,\n      params: params\n    };\n\n    return new this._promise(function(resolve, reject) {\n      var timeout, originalToJSON, targetOrigin;\n\n      // Timeout if a response isn't received after 4s\n      timeout = setTimeout(function() {\n        if (!client._requests[req.id]) return;\n\n        delete client._requests[req.id];\n        reject(new Error('Timeout: could not perform ' + req.method));\n      }, client._timeout);\n\n      // Add request callback\n      client._requests[req.id] = function(err, result) {\n        clearTimeout(timeout);\n        delete client._requests[req.id];\n        if (err) return reject(new Error(err));\n        resolve(result);\n      };\n\n      // In case we have a broken Array.prototype.toJSON, e.g. because of\n      // old versions of prototype\n      if (Array.prototype.toJSON) {\n        originalToJSON = Array.prototype.toJSON;\n        Array.prototype.toJSON = null;\n      }\n\n      // postMessage requires that the target origin be set to \"*\" for \"file://\"\n      targetOrigin = (client._origin === 'file://') ? '*' : client._origin;\n\n      // Send serialized message\n      client._hub.postMessage(JSON.stringify(req), targetOrigin);\n\n      // Restore original toJSON\n      if (originalToJSON) {\n        Array.prototype.toJSON = originalToJSON;\n      }\n    });\n  };\n\n  /**\n   * Export for various environments.\n   */\n  if ( true && module.exports) {\n    module.exports = CrossStorageClient;\n  } else if (true) {\n    exports.CrossStorageClient = CrossStorageClient;\n  } else {}\n}(this));\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/node_modules/cross-storage/lib/client.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/node_modules/cross-storage/lib/hub.js":
/*!****************************************************************************!*\
  !*** ./node_modules/emojidex-client/node_modules/cross-storage/lib/hub.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval(";(function(root) {\n  var CrossStorageHub = {};\n\n  /**\n   * Accepts an array of objects with two keys: origin and allow. The value\n   * of origin is expected to be a RegExp, and allow, an array of strings.\n   * The cross storage hub is then initialized to accept requests from any of\n   * the matching origins, allowing access to the associated lists of methods.\n   * Methods may include any of: get, set, del, getKeys and clear. A 'ready'\n   * message is sent to the parent window once complete.\n   *\n   * @example\n   * // Subdomain can get, but only root domain can set and del\n   * CrossStorageHub.init([\n   *   {origin: /\\.example.com$/,        allow: ['get']},\n   *   {origin: /:(www\\.)?example.com$/, allow: ['get', 'set', 'del']}\n   * ]);\n   *\n   * @param {array} permissions An array of objects with origin and allow\n   */\n  CrossStorageHub.init = function(permissions) {\n    var available = true;\n\n    // Return if localStorage is unavailable, or third party\n    // access is disabled\n    try {\n      if (!window.localStorage) available = false;\n    } catch (e) {\n      available = false;\n    }\n\n    if (!available) {\n      try {\n        return window.parent.postMessage('cross-storage:unavailable', '*');\n      } catch (e) {\n        return;\n      }\n    }\n\n    CrossStorageHub._permissions = permissions || [];\n    CrossStorageHub._installListener();\n    window.parent.postMessage('cross-storage:ready', '*');\n  };\n\n  /**\n   * Installs the necessary listener for the window message event. Accommodates\n   * IE8 and up.\n   *\n   * @private\n   */\n  CrossStorageHub._installListener = function() {\n    var listener = CrossStorageHub._listener;\n    if (window.addEventListener) {\n      window.addEventListener('message', listener, false);\n    } else {\n      window.attachEvent('onmessage', listener);\n    }\n  };\n\n  /**\n   * The message handler for all requests posted to the window. It ignores any\n   * messages having an origin that does not match the originally supplied\n   * pattern. Given a JSON object with one of get, set, del or getKeys as the\n   * method, the function performs the requested action and returns its result.\n   *\n   * @param {MessageEvent} message A message to be processed\n   */\n  CrossStorageHub._listener = function(message) {\n    var origin, targetOrigin, request, method, error, result, response;\n\n    // postMessage returns the string \"null\" as the origin for \"file://\"\n    origin = (message.origin === 'null') ? 'file://' : message.origin;\n\n    // Handle polling for a ready message\n    if (message.data === 'cross-storage:poll') {\n      return window.parent.postMessage('cross-storage:ready', message.origin);\n    }\n\n    // Ignore the ready message when viewing the hub directly\n    if (message.data === 'cross-storage:ready') return;\n\n    // Check whether message.data is a valid json\n    try {\n      request = JSON.parse(message.data);\n    } catch (err) {\n      return;\n    }\n\n    // Check whether request.method is a string\n    if (!request || typeof request.method !== 'string') {\n      return;\n    }\n\n    method = request.method.split('cross-storage:')[1];\n\n    if (!method) {\n      return;\n    } else if (!CrossStorageHub._permitted(origin, method)) {\n      error = 'Invalid permissions for ' + method;\n    } else {\n      try {\n        result = CrossStorageHub['_' + method](request.params);\n      } catch (err) {\n        error = err.message;\n      }\n    }\n\n    response = JSON.stringify({\n      id: request.id,\n      error: error,\n      result: result\n    });\n\n    // postMessage requires that the target origin be set to \"*\" for \"file://\"\n    targetOrigin = (origin === 'file://') ? '*' : origin;\n\n    window.parent.postMessage(response, targetOrigin);\n  };\n\n  /**\n   * Returns a boolean indicating whether or not the requested method is\n   * permitted for the given origin. The argument passed to method is expected\n   * to be one of 'get', 'set', 'del' or 'getKeys'.\n   *\n   * @param   {string} origin The origin for which to determine permissions\n   * @param   {string} method Requested action\n   * @returns {bool}   Whether or not the request is permitted\n   */\n  CrossStorageHub._permitted = function(origin, method) {\n    var available, i, entry, match;\n\n    available = ['get', 'set', 'del', 'clear', 'getKeys'];\n    if (!CrossStorageHub._inArray(method, available)) {\n      return false;\n    }\n\n    for (i = 0; i < CrossStorageHub._permissions.length; i++) {\n      entry = CrossStorageHub._permissions[i];\n      if (!(entry.origin instanceof RegExp) || !(entry.allow instanceof Array)) {\n        continue;\n      }\n\n      match = entry.origin.test(origin);\n      if (match && CrossStorageHub._inArray(method, entry.allow)) {\n        return true;\n      }\n    }\n\n    return false;\n  };\n\n  /**\n   * Sets a key to the specified value.\n   *\n   * @param {object} params An object with key and value\n   */\n  CrossStorageHub._set = function(params) {\n    window.localStorage.setItem(params.key, params.value);\n  };\n\n  /**\n   * Accepts an object with an array of keys for which to retrieve their values.\n   * Returns a single value if only one key was supplied, otherwise it returns\n   * an array. Any keys not set result in a null element in the resulting array.\n   *\n   * @param   {object} params An object with an array of keys\n   * @returns {*|*[]}  Either a single value, or an array\n   */\n  CrossStorageHub._get = function(params) {\n    var storage, result, i, value;\n\n    storage = window.localStorage;\n    result = [];\n\n    for (i = 0; i < params.keys.length; i++) {\n      try {\n        value = storage.getItem(params.keys[i]);\n      } catch (e) {\n        value = null;\n      }\n\n      result.push(value);\n    }\n\n    return (result.length > 1) ? result : result[0];\n  };\n\n  /**\n   * Deletes all keys specified in the array found at params.keys.\n   *\n   * @param {object} params An object with an array of keys\n   */\n  CrossStorageHub._del = function(params) {\n    for (var i = 0; i < params.keys.length; i++) {\n      window.localStorage.removeItem(params.keys[i]);\n    }\n  };\n\n  /**\n   * Clears localStorage.\n   */\n  CrossStorageHub._clear = function() {\n    window.localStorage.clear();\n  };\n\n  /**\n   * Returns an array of all keys stored in localStorage.\n   *\n   * @returns {string[]} The array of keys\n   */\n  CrossStorageHub._getKeys = function(params) {\n    var i, length, keys;\n\n    keys = [];\n    length = window.localStorage.length;\n\n    for (i = 0; i < length; i++) {\n      keys.push(window.localStorage.key(i));\n    }\n\n    return keys;\n  };\n\n  /**\n   * Returns whether or not a value is present in the array. Consists of an\n   * alternative to extending the array prototype for indexOf, since it's\n   * unavailable for IE8.\n   *\n   * @param   {*}    value The value to find\n   * @parma   {[]*}  array The array in which to search\n   * @returns {bool} Whether or not the value was found\n   */\n  CrossStorageHub._inArray = function(value, array) {\n    for (var i = 0; i < array.length; i++) {\n      if (value === array[i]) return true;\n    }\n\n    return false;\n  };\n\n  /**\n   * A cross-browser version of Date.now compatible with IE8 that avoids\n   * modifying the Date object.\n   *\n   * @return {int} The current timestamp in milliseconds\n   */\n  CrossStorageHub._now = function() {\n    if (typeof Date.now === 'function') {\n      return Date.now();\n    }\n\n    return new Date().getTime();\n  };\n\n  /**\n   * Export for various environments.\n   */\n  if ( true && module.exports) {\n    module.exports = CrossStorageHub;\n  } else if (true) {\n    exports.CrossStorageHub = CrossStorageHub;\n  } else {}\n}(this));\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/node_modules/cross-storage/lib/hub.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/node_modules/cross-storage/lib/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/emojidex-client/node_modules/cross-storage/lib/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n  CrossStorageClient: __webpack_require__(/*! ./client.js */ \"./node_modules/emojidex-client/node_modules/cross-storage/lib/client.js\"),\n  CrossStorageHub:    __webpack_require__(/*! ./hub.js */ \"./node_modules/emojidex-client/node_modules/cross-storage/lib/hub.js\")\n};\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/node_modules/cross-storage/lib/index.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/client.js":
/*!********************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/client.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexClient; });\n/* harmony import */ var _components_categories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/categories */ \"./node_modules/emojidex-client/src/es6/components/categories.js\");\n/* harmony import */ var _components_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/data */ \"./node_modules/emojidex-client/src/es6/components/data.js\");\n/* harmony import */ var _components_emoji__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/emoji */ \"./node_modules/emojidex-client/src/es6/components/emoji.js\");\n/* harmony import */ var _components_indexes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/indexes */ \"./node_modules/emojidex-client/src/es6/components/indexes.js\");\n/* harmony import */ var _components_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/search */ \"./node_modules/emojidex-client/src/es6/components/search.js\");\n/* harmony import */ var _components_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/user */ \"./node_modules/emojidex-client/src/es6/components/user.js\");\n/* harmony import */ var _components_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/util */ \"./node_modules/emojidex-client/src/es6/components/util.js\");\n// emojidex client\n// * Provides search, index caching and combining and asset URI resolution\n//\n// =LICENSE=\n// Licensed under the emojidex Open License\n// https://www.emojidex.com/emojidex/emojidex_open_license\n//\n// Copyright 2013 the emojidex project / K.K. GenSouSha\n\n\n\n\n\n\n\n\n\nclass EmojidexClient {\n  constructor(options) {\n    this.env = {\n      api_ver: 1,\n      cdn_addr: 'cdn.emojidex.com',\n      s_cdn_addr: 'cdn.emojidex.com',\n      asset_addr: 'assets.emojidex.com',\n      s_asset_addr: ''\n    };\n\n    // sets global default value\n    this.defaults = {\n      locale: 'en',\n      api_url: 'https://www.emojidex.com/api/v1/',\n      cdn_url: 'https://cdn.emojidex.com/emoji/',\n      closed_net: false,\n      min_query_len: 4,\n      size_code: 'xhdpi',\n      detailed: false,\n      limit: 32,\n      onReady: arg => ({})\n    };\n\n    this.options = $.extend({}, this.defaults, options);\n\n    // set closed network flag (for OSS distrobutions, intranet/private neworks, or closed license)\n    // DO NOT set to true unless permitted by an emojidex License\n    this.closed_net = this.options.closed_net;\n\n    // set end points\n    this.api_url = this.options.api_url;\n    this.cdn_url = this.options.cdn_url;\n    this.size_code = this.options.size_code;\n\n    // common @options\n    this.detailed = this.options.detailed;\n    this.limit = this.options.limit;\n    this.locale = this.options.locale;\n\n    // new Emojidex modules\n    this.Data = new _components_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, this.options).then(data => {\n      this.Util = new _components_util__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this);\n      this.User = new _components_user__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this);\n      this.Indexes = new _components_indexes__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this);\n      this.Search = new _components_search__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this);\n      this.Emoji = new _components_emoji__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this);\n      return this.Categories = new _components_categories__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n    }).then(() => {\n      this.options.onReady(this);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/client.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/categories.js":
/*!***********************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/categories.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexCategories; });\nclass EmojidexCategories {\n  constructor(EC) {\n    this.EC = EC;\n    this._categories = this.EC.Data.categories();\n    this.local = this.EC.options.locale\n    return this.sync(null, this.locale).then(() => {\n      return this.EC.Categories = this;\n    });\n  }\n\n  _categoriesAPI(category_name, callback, opts, called_func) {\n    let param = {\n      page: 1,\n      limit: this.EC.limit,\n      detailed: this.EC.detailed\n    };\n    if (this.EC.User.auth_info.token !== null) {\n      $.extend(param, {auth_token: this.EC.User.auth_info.token});\n    }\n    $.extend(param, opts);\n\n    this.called_func = called_func;\n    this.called_data = {\n      category_name,\n      callback,\n      param\n    };\n\n    return $.ajax({\n      url: `${this.EC.api_url}emoji`,\n      dataType: 'json',\n      data: param,\n      success: response => {\n        this.meta = response.meta;\n        this.results = response.emoji;\n        this.cur_page = response.meta.page;\n        this.count = response.meta.count;\n        return this.EC.Emoji.combine(response.emoji).then(() => {\n          if (typeof callback === 'function') {\n            return callback(response.emoji, {\n              category_name,\n              callback,\n              param\n            })\n          }\n        });\n      }\n    });\n  }\n\n  getEmoji(category_name, callback, opts){\n    let param =\n      {category: category_name};\n    $.extend(param, opts);\n    return this._categoriesAPI(category_name, callback, param, this.getEmoji);\n  }\n\n  next() {\n    if (this.count === this.called_data.param.limit) { this.called_data.param.page++; }\n    return this.called_func(this.called_data.category_name, this.called_data.callback, this.called_data.param, {ajax: this.called_func});\n  }\n\n  prev() {\n    if (this.called_data.param.page > 1) { this.called_data.param.page--; }\n    return this.called_func(this.called_data.category_name, this.called_data.callback, this.called_data.param, {ajax: this.called_func});\n  }\n\n  // Gets the full list of caetgories available\n  sync(callback, locale) {\n    if (typeof locale === 'undefined' || locale === null) {\n      locale = this.locale;\n    }\n    if (typeof this._categories !== 'undefined' && typeof this._categories.length !== 'undefined' && this._categories.length != 0) {\n      if(this.locale === locale) {\n        return new Promise((resolve, reject) => {\n          if (typeof callback === 'function') { callback(this._categories); }\n          return resolve();\n        });\n      } else {\n        return this._get_category(callback, locale);\n      }\n    } else {\n      if (typeof locale === 'undefined' || locale === null) { ({ locale } = this.EC); }\n      return this._get_category(callback, locale);\n    }\n  }\n\n  _get_category(callback, locale) {\n    return $.ajax({\n      url: this.EC.api_url + 'categories',\n      dataType: 'json',\n      data: {\n        locale\n      }\n    }).then(response => {\n      this._categories = response.categories;\n      return this.EC.Data.categories(response.categories).then(() => {\n        if (typeof callback === 'function') { callback(this._categories); }\n      });\n    });\n  }\n\n  all(callback) {\n    if (this._categories != null) {\n      if (typeof callback === 'function') { callback(this._categories); }\n    } else {\n      return setTimeout((() => {\n        return this.all(callback);\n      }\n      ), 500);\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/categories.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/data.js":
/*!*****************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/data.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexData; });\n/* harmony import */ var _data_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/_storage */ \"./node_modules/emojidex-client/src/es6/components/data/_storage.js\");\n\n\nclass EmojidexData {\n  constructor(EC, options) {\n    this.EC = EC;\n    this.options = options;\n    this._def_auth_info = {\n      status: 'none',\n      user: '',\n      token: null,\n      r18: false,\n      premium: false,\n      premium_exp: null,\n      pro: false,\n      pro_exp: null\n    };\n\n    if (this.options.storageHubPath != null) {\n      this.storage = new _data_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.options.storageHubPath);\n    } else {\n      this.storage = new _data_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    }\n\n    return this.storage.hub.onReadyFrame().then( () => {\n      return this.storage.hub.onConnect();\n    }).then( () => {\n      return this.storage.hub.getKeys();\n    }).then(keys => {\n      if (keys.indexOf('emojidex') !== -1) {\n        return this.storage.update_cache('emojidex');\n      } else {\n        return this.storage.update('emojidex', {\n          moji_codes: {\n            moji_string: \"\",\n            moji_array: [],\n            moji_index: {}\n          },\n          emoji: this.EC.options.emoji || [],\n          history: this.EC.options.history || [],\n          favorites: this.EC.options.favorites || [],\n          categories: this.EC.options.categories || [],\n          auth_info: this.EC.options.auth_info || this._def_auth_info\n        });\n      }\n    }).then(data => {\n      if(this._needUpdate()) {\n        return this._initMojiCodes();\n      } else {\n        return this.storage.get('emojidex');\n      }\n    }).then(data => {\n      this.moji_codes = this.storage.get('emojidex.moji_codes');\n      return this.EC.Data = this;\n    });\n  }\n\n  _initMojiCodes(force = false) {\n    return this.storage.update('emojidex.moji_codes_updated', new Date().toString()).then(() => {\n      return $.ajax({\n        url: this.EC.api_url + 'moji_codes' + '?locale=' + this.EC.locale,\n        dataType: 'json'\n      })\n    }).then(response => {\n      return this.storage.update('emojidex.moji_codes', response);\n    })\n  }\n\n  _needUpdate() {\n    if(this.storage.isSet('emojidex.utfInfoUpdated')) {\n      current = new Date();\n      updated = new Date(this.storage.get('emojidex.utfInfoUpdated'));\n      // ２週間に一度更新する\n      if(current - updated >= 3600000 * 24 * 14) {\n        return true;\n      } else {\n        return false;\n      }\n    } else {\n      return true;\n    }\n  }\n\n  emoji(emoji_set) {\n    if (emoji_set != null) {\n      if (this.storage.hub_cache.emojidex.emoji != null &&\n          this.storage.hub_cache.emojidex.emoji.length > 0) {\n        let hub_emoji = this.storage.hub_cache.emojidex.emoji;\n        for (let i = 0; i < emoji_set.length; i++) {\n          let new_emoji = emoji_set[i];\n          for (let j = 0; j < hub_emoji.length; j++) {\n            let emoji = hub_emoji[j];\n            if (new_emoji.code === emoji.code) {\n              hub_emoji.splice(hub_emoji.indexOf(emoji), 1, new_emoji);\n              break;\n            } else if (emoji === hub_emoji[hub_emoji.length - 1]) {\n              hub_emoji.push(new_emoji);\n            }\n          }\n        }\n        return this.storage.update('emojidex', {emoji: hub_emoji});\n      } else {\n        return this.storage.update('emojidex', {emoji: emoji_set});\n      }\n    } else if (this.storage.hub_cache.emojidex.emoji != null) {\n      return this.storage.hub_cache.emojidex.emoji;\n    } else {\n      return undefined;\n    }\n  }\n\n  favorites(favorites_set) {\n    if (favorites_set != null) {\n      if (this.storage.hub_cache.emojidex.favorites != null &&\n          this.storage.hub_cache.emojidex.favorites.length > 0) {\n        let hub_emoji = this.storage.hub_cache.emojidex.favorites;\n        for (let i = 0; i < favorites_set.length; i++) {\n          let new_emoji = favorites_set[i];\n          for (let j = 0; j < hub_emoji.length; j++) {\n            let emoji = hub_emoji[j];\n            if (new_emoji.code === emoji.code) {\n              hub_emoji.splice(hub_emoji.indexOf(emoji), 1, new_emoji);\n              break;\n            } else if (emoji === hub_emoji[hub_emoji.length - 1]) {\n              hub_emoji.push(new_emoji);\n            }\n          }\n        }\n        return this.storage.update('emojidex', {favorites: hub_emoji});\n      } else {\n        return this.storage.update('emojidex', {favorites: favorites_set});\n      }\n    } else if (this.storage.hub_cache.emojidex.favorites != null) {\n      return new Promise(resolve => resolve(this.storage.hub_cache.emojidex.favorites));\n    } else {\n      return new Promise(resolve => resolve([]));\n    }\n  }\n\n  history(history_set) {\n    if (history_set != null) {\n      if (this.storage.hub_cache.emojidex.history != null &&\n          this.storage.hub_cache.emojidex.history.length > 0) {\n        let hub_emoji = this.storage.hub_cache.emojidex.history;\n        for (let i = 0; i < history_set.length; i++) {\n          let new_emoji = history_set[i];\n          for (let j = 0; j < hub_emoji.length; j++) {\n            let emoji = hub_emoji[j];\n            if (new_emoji.code === emoji.code) {\n              hub_emoji.splice(hub_emoji.indexOf(emoji), 1, new_emoji);\n              break;\n            } else if (emoji === hub_emoji[hub_emoji.length - 1]) {\n              hub_emoji.push(new_emoji);\n            }\n          }\n        }\n        return this.storage.update('emojidex', {history: hub_emoji});\n      } else {\n        return this.storage.update('emojidex', {history: history_set});\n      }\n    } else if (this.storage.hub_cache.emojidex.history != null) {\n      return new Promise(resolve => resolve(this.storage.hub_cache.emojidex.history));\n    } else {\n      return new Promise(resolve => resolve([]));\n    }\n  }\n\n  categories(categories_set) {\n    if (categories_set != null) { return this.storage.update('emojidex', {categories: categories_set}); }\n    return this.storage.hub_cache.emojidex.categories;\n  }\n\n  auth_info(auth_info_set) {\n    if (auth_info_set != null) {\n      this.EC.User.auth_info = auth_info_set;\n      return this.storage.update('emojidex', {auth_info: auth_info_set});\n    }\n    return this.storage.hub_cache.emojidex.auth_info;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/data.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/data/_storage.js":
/*!**************************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/data/_storage.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexDataStorage; });\n/* harmony import */ var cross_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cross-storage */ \"./node_modules/emojidex-client/node_modules/cross-storage/lib/index.js\");\n/* harmony import */ var cross_storage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cross_storage__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass EmojidexDataStorage {\n  constructor(hub_path = 'https://www.emojidex.com/hub/1.0.0') {\n    this.hub = new cross_storage__WEBPACK_IMPORTED_MODULE_0__[\"CrossStorageClient\"](hub_path,\n      {frameId: 'emojidex-client-storage-hub'});\n    this.hub_cache = {};\n  }\n\n  _get_chained_data(query, data_obj, wrap=true) {\n    query = this._get_parsed_query(query);\n    let chain_obj = function(data, key) {\n      if (query.array.length === 0) {\n        data[key] = data_obj;\n      } else {\n        data[key] = {};\n        chain_obj(data[key], query.array.shift());\n      }\n      return data;\n    };\n\n    let chained = chain_obj({}, query.array.shift());\n    return wrap ? chained : chained[query.first];\n  }\n\n  _get_hub_data(query) {\n    query = query.split('.');\n    return this.hub.onConnect().then(() => {\n      return this.hub.get(query.shift());\n    }\n    ).then(function(hub_data){\n      if (query.length) {\n        for (let i = 0; i < query.length; i++) {\n          let q = query[i];\n          hub_data = hub_data[q];\n        }\n      }\n      return hub_data;\n    });\n  }\n\n  _get_parsed_query(query) {\n    let parsed_query = query.split('.');\n    return query = {\n      code: query,\n      array: parsed_query,\n      first: parsed_query[0]\n    };\n  }\n\n  get(query) {\n    query = query instanceof Array ? query : query.split('.');\n    let cache = this.hub_cache;\n    if (query.length) {\n      for (let i = 0; i < query.length; i++) {\n        let q = query[i];\n        if (cache[q] === undefined ) {\n          return null;\n        }\n        cache = cache[q];\n      }\n    }\n    return cache;\n  }\n\n  set(query, data, update) {\n    let first_query = query.split('.')[0];\n    return this.hub.onConnect().then( () => {\n      if (update) {\n        let new_data = {};\n        new_data[first_query] = data;\n        return this.hub.set(first_query, JSON.stringify(new_data));\n      } else {\n        return this.hub.set(first_query, this._get_chained_data(query, data));\n      }\n    }\n    ).then(() => {\n      return this.update_cache(first_query);\n    }\n    );\n  }\n\n  update(query, data) {\n    let merged = $.extend(true, {}, this.get(query.split('.')[0]), this._get_chained_data(query, data, false));\n    return this.set(query, merged, true);\n  }\n\n  update_cache(key) {\n    return this.hub.onConnect().then( () => {\n      if (key) { return key; } else { return this.hub.getKeys(); }\n    }\n    ).then(keys => {\n      return this.hub.get(keys);\n    }\n    ).then(hub_data => {\n      let data = $.parseJSON(hub_data);\n      if (key) {\n        return this.hub_cache[key] = data[key];\n      } else {\n        return this.hub_cache = data;\n      }\n    }\n    );\n  }\n\n  _remove(query) {\n    query = this._get_parsed_query(query);\n    if (query.array.length === 1) {\n      return this.hub.del(query.code);\n    } else {\n      let scope;\n      let target = scope = this.get(query.array.shift());\n      let i = 0;\n      while (i < query.array.length - 1) {\n        scope = scope[query.array[i]];\n        i++;\n      }\n      delete scope[query.array[i]];\n      return this.update(query.first, target);\n    }\n  }\n\n  clear() {\n    return this.hub.onConnect().then(() => {\n      return this.hub.clear();\n    }\n    );\n  }\n\n  keys(query) {\n    if (query) {\n      let keys = [];\n      for (let key in this.get(query)) {\n        keys.push(key);\n      }\n      return keys;\n\n    } else {\n      return this.hub.onConnect().then(() => {\n        return this.hub.getKeys();\n      }\n      );\n    }\n  }\n\n  isEmpty(query) {\n    if (this.get(query)) { return false; } else { return true; }\n  }\n\n  isSet(query) {\n    if (this.get(query)) { return true; } else { return false; }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/data/_storage.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/emoji.js":
/*!******************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/emoji.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexEmoji; });\nclass EmojidexEmoji {\n  constructor(EC) {\n    this.combine = this.combine.bind(this);\n    this.EC = EC;\n    this._emoji_instance = [];\n  }\n\n  _emoji() {\n    if (this._emoji_instance != null) { return this._emoji_instance; }\n\n    if (this.checkUpdate()) {\n      this.EC.Data.storage.update('emojidex.seedUpdated', new Date().toString());\n      return this.seed();\n    } else {\n      return this._emoji_instance = this.EC.Data.storage.get('emojidex.emoji');\n    }\n  }\n\n  checkUpdate() {\n    if (this.EC.Data.storage.isSet('emojidex.seedUpdated')) {\n      let current = new Date();\n      let updated = new Date(this.EC.Data.storage.get('emojidex.seedUpdated'));\n      if (current - updated >= 3600000 * 48) {\n        return true;\n      } else {\n        return false;\n      }\n    } else {\n      return true;\n    }\n  }\n\n  // Gets the full list of caetgories available\n  seed(callback) {\n    return this.EC.Indexes.static(['utf_emoji', 'extended_emoji'], null, callback);\n  }\n\n  all() {\n    return this._emoji();\n  }\n\n  // internal collection search\n  search(term, callback) {\n    let results = (this._emoji().filter((moji) => moji.code.match(term)).map((moji) => moji));\n    if (typeof callback === 'function') { callback(results); }\n    return results;\n  }\n\n  // internal collection search (starting with)\n  starting(term, callback) {\n    let results = (this._emoji().filter((moji) => moji.code.match(`^${term}`)).map((moji) => moji));\n    if (typeof callback === 'function') { callback(results); }\n    return results;\n  }\n\n  // internal collection search (starting with)\n  ending(term, callback) {\n    let results = (this._emoji().filter((moji) => moji.code.match(term + '$')).map((moji) => moji));\n    if (typeof callback === 'function') { callback(results); }\n    return results;\n  }\n\n  // search for emoji with the given tags\n  tags(tags, opts) {\n    tags = this.EC.Util.breakout(tags);\n    let selection = (typeof opts !== 'undefined' && typeof opts.selection !== 'undefined') ? opts.selection : this._emoji();\n    let collect = [];\n    for (let i = 0; i < tags.length; i++) {\n      let tag = tags[i];\n      collect = collect.concat((selection.filter((moji) => $.inArray(tag, moji.tags) >= 0).map((moji) => moji)));\n    }\n    return collect;\n  }\n\n  // gets emoji in any of the given categories\n  categories(categories, opts) {\n    categories = this.EC.Util.breakout(categories);\n    let source = (typeof opts !== 'undefined' && typeof opts.selection !== 'undefined') ? opts.selection : this._emoji();\n    let collect = [];\n    for (let i = 0; i < categories.length; i++) {\n      let category = categories[i];\n      collect = collect.concat((source.filter((moji) => moji.category === category).map((moji) => moji)));\n    }\n    return collect;\n  }\n\n  // searches by term (regex OK), containing the tags given, in any of the given categories\n  advanced(searchs) {\n    return this.categories(\n      searchs.categories,\n      {selection: this.tags(searchs.tags, {selection: this.search(searchs.term)})}\n    );\n  }\n\n  // Concatenates and flattens the given emoji array into the @emoji array\n  combine(emoji) {\n    return this.EC.Data.emoji(emoji).then(hub_data => {\n      return this._emoji_instance = hub_data.emoji;\n    }\n    );\n  }\n\n  // Clears the emoji array and emoji in storage.\n  // DO NOT call this unless you have a really good reason!\n  flush() {\n    this._emoji_instance = [];\n    return this.EC.Data.storage._remove('emojidex.emoji');\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/emoji.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/indexes.js":
/*!********************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/indexes.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexIndexes; });\nclass EmojidexIndexes {\n  constructor(EC) {\n    this.EC = EC;\n    this.results = [];\n    this.cur_page = 1;\n    this.count = 0;\n  }\n\n  _indexesAPI(query, callback, opts, func) {\n    let param = {\n      page: 1,\n      limit: this.EC.limit,\n      detailed: this.EC.detailed\n    };\n    if (this.EC.User.auth_info.token !== null) {\n      $.extend(param, {auth_token: this.EC.User.auth_info.token});\n    }\n    $.extend(param, opts);\n\n    if (func != null) {\n      this.indexed_func = func;\n      this.indexed = {\n        query,\n        callback,\n        param\n      };\n    }\n\n    return $.ajax({\n      url: this.EC.api_url + query,\n      dataType: 'json',\n      data: param,\n      success: response => {\n        if (response.status != null) {\n          this.results = [];\n          this.cur_page = 0;\n          this.count = 0;\n          if (typeof callback === 'function') { callback([]); }\n        } else {\n          this.meta = response.meta;\n          this.results = response.emoji;\n          this.cur_page = response.meta.page;\n          this.count = response.meta.count;\n          return this.EC.Emoji.combine(response.emoji).then(data => {\n            if (typeof callback === 'function') { callback(response.emoji); }\n          });\n        }\n      },\n      error: response => {\n        this.results = [];\n        this.cur_page = 0;\n        this.count = 0;\n        if (typeof callback === 'function') { callback([]); }\n      }});\n  }\n\n  index(callback, opts) {\n    return this._indexesAPI('emoji', callback, opts, this.index);\n  }\n\n  newest(callback, opts) {\n    return this._indexesAPI('newest', callback, opts, this.newest);\n  }\n\n  popular(callback, opts) {\n    return this._indexesAPI('popular', callback, opts, this.popular);\n  }\n\n  user(username, callback, opts) {\n    return this._indexesAPI(`users/${username}/emoji`, callback, opts);\n  }\n\n  static(static_type, language, callback) {\n    let loaded_num = 0;\n    let loaded_emoji = [];\n\n    let loadStatic = url_string => {\n      return $.ajax({\n        url: url_string,\n        dataType: 'json',\n        success: response => {\n          loaded_emoji = loaded_emoji.concat(response);\n          if (++loaded_num === static_type.length) {\n            return this.EC.Emoji.combine(loaded_emoji).then(data => {\n              if (typeof callback === 'function') { callback(data); }\n            });\n          }\n        }\n      });\n    };\n\n    return static_type.map((type) =>\n      language ?\n        loadStatic(`${this.EC.api_url + type}?locale=${language}`)\n      :\n        loadStatic(`${this.EC.api_url + type}`));\n  }\n\n  select(code, callback, opts) {\n    return this.EC.Search.find(code, callback, opts);\n  }\n\n  next() {\n    if (this.count === this.indexed.param.limit) { this.indexed.param.page++; }\n    return this.indexed_func(this.indexed.callback, this.indexed.param, this.indexed_func);\n  }\n\n  prev() {\n    if (this.indexed.param.page > 1) { this.indexed.param.page--; }\n    return this.indexed_func(this.indexed.callback, this.indexed.param, this.indexed_func);\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/indexes.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/search.js":
/*!*******************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/search.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexSearch; });\nclass EmojidexSearch {\n  constructor(EC) {\n    this.EC = EC;\n    this.results = [];\n    this.cur_page = 1;\n    this.count = 0;\n  }\n\n  _searchAPI(search_data, callback, opts, call_func) {\n    let param = {\n      page: 1,\n      limit: this.EC.limit,\n      detailed: this.EC.detailed\n    };\n    if (this.EC.User.auth_info.token !== null) {\n      $.extend(param, {auth_token: this.EC.User.auth_info.token});\n    }\n    $.extend(param, opts);\n\n    // TODO -------\n    // @searched_func = unless @EC.closed_net then funx.ajax else call_func.storage\n    this.searched_func = call_func.ajax;\n    this.searched = {\n      data: search_data,\n      callback,\n      param\n    };\n\n    return $.ajax({\n      url: this.EC.api_url + 'search/emoji',\n      dataType: 'json',\n      data: param,\n      success: response => {\n        if (response.status != null) {\n          this.results = [];\n          this.cur_page = 0;\n          this.count = 0;\n          if (typeof callback === 'function')\n            callback([]);\n        } else {\n          this.meta = response.meta;\n          this.results = response.emoji;\n          this.cur_page = response.meta.page;\n          this.count = response.meta.count;\n          this.EC.Emoji.combine(response.emoji)\n          if (typeof callback === 'function')\n            callback(response.emoji);\n        }\n      },\n      error: response => {\n        this.results = [];\n        this.cur_page = 0;\n        this.count = 0;\n        if (typeof callback === 'function')\n          callback([]);\n      }\n    });\n  }\n\n  // Executes a general search (code_cont)\n  search(term, callback, opts) {\n    opts = $.extend({code_cont: this.EC.Util.escapeTerm(term)}, opts);\n    return this._searchAPI(term, callback, opts, {ajax: this.search, storage: this.EC.Emoji.search});\n  }\n\n  // Executes a search starting with the given term\n  starting(term, callback, opts) {\n    opts = $.extend({code_sw: this.EC.Util.escapeTerm(term)}, opts);\n    return this._searchAPI(term, callback, opts, {ajax: this.starting, storage: this.EC.Emoji.starting});\n  }\n\n  // Executes a search ending with the given term\n  ending(term, callback, opts) {\n    opts = $.extend({code_ew: this.EC.Util.escapeTerm(term)}, opts);\n    return this._searchAPI(term, callback, opts, {ajax: this.ending, storage: this.EC.Emoji.ending});\n  }\n\n  // Searches by tags\n  tags(tags, callback, opts) {\n    opts = $.extend({\"tags[]\": this.EC.Util.breakout(tags)}, opts);\n    return this._searchAPI(tags, callback, opts, {ajax: this.tags, storage: this.EC.Emoji.tags});\n  }\n\n  // Searches using an array of keys and an array of tags\n  advanced(search_details, callback, opts) {\n    let param = {\n      code_cont: this.EC.Util.escapeTerm(search_details.term),\n      \"tags[]\": this.EC.Util.breakout(search_details.tags),\n      \"categories[]\": this.EC.Util.breakout(search_details.categories)\n    };\n    $.extend(param, opts);\n    return this._searchAPI(search_details, callback, param, {ajax: this.advanced, storage: this.EC.Emoji.advanced});\n  }\n\n  // Not an actual search, just gets information on the given emoji\n  find(code, callback = null, opts) {\n    let emoji_cache = this.EC.Data.emoji();\n    code = this.EC.Util.deEscapeTerm(code);\n    for (let i = 0; i < emoji_cache.length; i++) {\n      let emoji = emoji_cache[i];\n      if (emoji.code === code) {\n        if (typeof callback === 'function')\n          callback(emoji);\n        return Promise.resolve(emoji);\n      }\n    }\n\n    let param =\n      {detailed: this.EC.detailed};\n    if (this.EC.User.auth_info.token !== null) {\n      $.extend(param, {auth_token: this.EC.User.auth_info.token});\n    }\n    $.extend(param, opts);\n\n    return $.ajax({\n      url: this.EC.api_url + `emoji/${this.EC.Util.makeURLSafe(code)}`,\n      dataType: 'json',\n      data: param,\n      success: response => {\n        this.EC.Emoji.combine([response]);\n        if (typeof callback === 'function')\n          callback(response);\n        return response;\n      },\n      error: response => {\n        if (typeof callback === 'function')\n          callback(response);\n        return response;\n      }\n    });\n  }\n\n  next() {\n    if (this.count === this.searched.param.limit) { this.searched.param.page++; }\n    return this.searched_func(this.searched.data, this.searched.callback, this.searched.param, {ajax: this.searched_func});\n  }\n\n  prev() {\n    if (this.searched.param.page > 1) { this.searched.param.page--; }\n    return this.searched_func(this.searched.data, this.searched.callback, this.searched.param, {ajax: this.searched_func});\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/search.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/user.js":
/*!*****************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/user.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexUser; });\n/* harmony import */ var _user_favorites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user/favorites */ \"./node_modules/emojidex-client/src/es6/components/user/favorites.js\");\n/* harmony import */ var _user_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user/history */ \"./node_modules/emojidex-client/src/es6/components/user/history.js\");\n/* harmony import */ var _user_follow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user/follow */ \"./node_modules/emojidex-client/src/es6/components/user/follow.js\");\n\n\n\n\nclass EmojidexUser {\n  constructor(EC) {\n    this.EC = EC;\n    this.auth_info = this.EC.Data._def_auth_info;\n    this.History = new _user_history__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.EC);\n    this.Favorites = new _user_favorites__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.EC);\n    this.Follow = new _user_follow__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.EC);\n  }\n    // @_auto_login()\n\n  // Checks for local saved login data, and if present sets the username and api_key\n  _autoLogin() {\n    if (typeof this.EC.Data.storage.hub_cache !== 'undefined' &&\n        typeof this.EC.Data.storage.hub_cache.emojidex !== 'undefined' &&\n        typeof this.EC.Data.storage.hub_cache.emojidex.auth_info !== 'undefined' &&\n        this.EC.Data.storage.hub_cache.emojidex.auth_info.status === 'verified') {\n      return this.syncUserData();\n    }\n  }\n\n  // login\n  // takes a hash with one of the following combinations:\n  // 1. {authtype: 'plain', username: 'username', password: '****'}\n  // 2. {authtype: 'token', username: 'username', auth_token: '****'}\n  // 3. {authtype: 'basic', user: 'username-or-email', password: '****'}\n  // 4. {authtype: 'session'} return auth_info in localstorage.\n  // * if no hash is given auto login is attempted\n  login(params) {\n    switch (params.authtype) {\n      case 'plain':\n        return this.plainAuth(params.username, params.password, params.callback);\n      case 'token':\n        return this.tokenAuth(params.username, params.auth_token, params.callback);\n      case 'basic':\n        return this.basicAuth(params.user, params.password, params.callback);\n      case 'session':\n        if (typeof this.EC.Data.storage.hub_cache !== 'undefined' &&\n            typeof this.EC.Data.storage.hub_cache.emojidex !== 'undefined' &&\n            typeof this.EC.Data.storage.hub_cache.emojidex.auth_info !== 'undefined' &&\n            this.EC.Data.storage.hub_cache.emojidex.auth_info.status === 'verified') {\n          return this.auth_info = this.EC.Data.storage.hub_cache.emojidex.auth_info;\n        }\n      default:\n        return this._autoLogin();\n    }\n  }\n\n  // logout:\n  // 'logs out' by clearing user data\n  logout() {\n    return this.EC.Data.auth_info(this.EC.Data._def_auth_info);\n  }\n\n  _authenticateAPI(options, callback) {\n    let ajax_obj = {\n      url: this.EC.api_url + 'users/authenticate',\n      dataType: 'json',\n      success: response => {\n        return this._setAuthFromResponse(response).then(() => {\n          if (typeof callback === 'function') { callback(this.auth_info); }\n        });\n      },\n      error: response => {\n        let status = JSON.parse(response.responseText);\n        this.auth_info = {\n          status: status.auth_status,\n          token: null,\n          user: ''\n        };\n        return this.EC.Data.auth_info(this.EC.Data.auth_info).then(() => {\n          if (typeof callback === 'function') {\n            callback({\n              auth_info: this.auth_info,\n              error_info: response\n            });\n          }\n        });\n      }\n    };\n\n    return $.ajax($.extend(ajax_obj, options));\n  }\n\n  // regular login with username/email and password\n  plainAuth(username, password, callback) {\n    return this._authenticateAPI({\n      data: {\n        username,\n        password,\n      }\n    },\n      callback);\n  }\n\n  tokenAuth(username, token, callback) {\n    return this._authenticateAPI({\n      data: {\n        username,\n        token,\n      }\n    },\n      callback);\n  }\n\n  // auth with HTTP basic auth\n  basicAuth(user, password, callback) {\n    return this._authenticateAPI({\n      data: {\n        user,\n        password,\n      }\n    },\n      callback);\n  }\n\n  // sets auth parameters from a successful auth request [login]\n  _setAuthFromResponse(response) {\n    return this.EC.Data.auth_info({\n      status: response.auth_status,\n      token: response.auth_token,\n      user: response.auth_user,\n      r18: response.r18,\n      premium: response.premium,\n      premium_exp: response.premium_exp,\n      pro: response.pro,\n      pro_exp: response.pro_exp\n    }).then(data=> {\n      this.syncUserData();\n      return data;\n    });\n  }\n\n  syncUserData() {\n    this.auth_info = this.EC.Data.storage.get('emojidex.auth_info');\n    this.Favorites.sync();\n    this.History.sync();\n    this.Follow.sync();\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/user.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/user/favorites.js":
/*!***************************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/user/favorites.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexUserFavorites; });\nclass EmojidexUserFavorites {\n  constructor(EC) {\n    this.EC = EC;\n    this._favorites = this.EC.Data.favorites();\n    this.cur_page = 1;\n    this.max_page = undefined;\n  }\n\n  _favoritesAPI(options) {\n    if (this.EC.User.auth_info.token != null) {\n      let ajax_obj = {\n        url: this.EC.api_url + 'users/favorites',\n        dataType: 'json'\n      };\n      return $.ajax($.extend(ajax_obj, options));\n    }\n  }\n\n  get(callback, page = 1) {\n    let options = {\n      data: {\n        page: page,\n        limit: this.EC.limit,\n        detailed: this.EC.detailed,\n        auth_token: this.EC.User.auth_info.token\n      }\n    };\n    return this._favoritesAPI(options).then((response) => {\n      this._favorites = response.emoji;\n      this.meta = response.meta;\n      this.cur_page = response.meta.page;\n      this.max_page = Math.ceil(response.total_count / this.EC.limit);\n\n      return this.EC.Data.favorites(this._favorites);\n    }).then(() => {\n      if (typeof callback === 'function') {\n        callback(this._favorites);\n      } else {\n        return this._favorites;\n      }\n    });\n  }\n\n  set(emoji_code) {\n    let options = {\n      type: 'POST',\n      data: {\n        auth_token: this.EC.User.auth_info.token,\n        emoji_code\n      },\n      success: response => {\n        this._favorites.push(response);\n        return this.EC.Data.favorites(this._favorites);\n      }\n    };\n    return this._favoritesAPI(options);\n  }\n\n  unset(emoji_code) {\n    let options = {\n      type: 'DELETE',\n      data: {\n        auth_token: this.EC.User.auth_info.token,\n        emoji_code\n      },\n      success: response => {\n        return this.sync();\n      }\n    };\n    return this._favoritesAPI(options);\n  }\n\n  sync() {\n    return this.get(); // persistant favorites currently require an account\n  }\n\n  all(callback) {\n    return this.EC.Data.favorites().then(data => {\n      if (typeof callback === 'function') {\n        callback(data);\n      } else {\n        return data;\n      }\n    });\n  }\n\n  next(callback) {\n    if (this.max_page === this.cur_page) return;\n    return this.get(callback, this.cur_page + 1);\n  }\n\n  prev(callback) {\n    if (this.cur_page === 1) return;\n    return this.get(callback, this.cur_page - 1);\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/user/favorites.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/user/follow.js":
/*!************************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/user/follow.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexUserFollow; });\nclass EmojidexUserFollow {\n  constructor(EC) {\n    this.EC = EC;\n    this.following = [];\n    this.followers = [];\n  }\n\n  _followAPI(options) {\n    if (this.EC.User.auth_info.token === null || this.EC.User.auth_info.token === undefined) return 'require auth token';\n\n    let ajax_obj = {\n      dataType: 'json',\n      data: {\n        auth_token: this.EC.User.auth_info.token\n      },\n      error: response => {\n        return response;\n      }\n    };\n    return $.ajax($.extend(true, ajax_obj, options));\n  }\n\n  getFollowing(callback) {\n    let options = {\n      url: this.EC.api_url + 'users/following',\n      success: response => {\n        this.following = response.following;\n        if (typeof callback === 'function') { callback(this.following); }\n      }\n    };\n    return this._followAPI(options);\n  }\n\n  addFollowing(username, callback) {\n    if (username === null || username === undefined) return 'require username';\n\n    let options = {\n      url: this.EC.api_url + 'users/following',\n      type: 'POST',\n      data: { username },\n      success: response => {\n        if (response.username !== undefined && response.username !== null) {\n          this.following.push(response.username);\n        }\n        if (typeof callback === 'function') { callback(this.following); }\n      }\n    };\n    return this._followAPI(options);\n  }\n\n  deleteFollowing(username, callback) {\n    if (username === null || username === undefined) return 'require username';\n\n    let options = {\n      url: this.EC.api_url + 'users/following',\n      type: 'DELETE',\n      data: { username },\n      success: response => {\n        if (response.username !== undefined && response.username !== null) {\n          this.following.splice(this.following.indexOf(response.username), 1);\n        }\n        if (typeof callback === 'function') { callback(this.following); }\n      }\n    };\n    return this._followAPI(options);\n  }\n\n  getFollowers(callback) {\n    if (!(this.EC.User.auth_info.pro || this.EC.User.auth_info.premium)) return 'Premium or Pro accounts only';\n\n    let options = {\n      url: this.EC.api_url + 'users/followers',\n      success: response => {\n        this.followers = response.followers;\n        if (typeof callback === 'function') { callback(this.followers); }\n      }\n    };\n    return this._followAPI(options);\n  }\n\n  sync() {\n    $.when(\n      this.getFollowing(), this.getFollowers()\n    ).done(() => {\n      return this;\n    })\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/user/follow.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/user/history.js":
/*!*************************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/user/history.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexUserHistory; });\nclass EmojidexUserHistory {\n  constructor(EC) {\n    this.EC = EC;\n    this._history = this.EC.Data.history();\n    this.cur_page = 1;\n    this.max_page = undefined;\n  }\n\n  _historyAPI(options) {\n    if (this.EC.User.auth_info.token != null) {\n      let ajax_obj = {\n        url: this.EC.api_url + 'users/history',\n        dataType: 'json'\n      };\n      return $.ajax($.extend(ajax_obj, options));\n    }\n  }\n\n  get(callback, page = 1) {\n    let options = {\n      data: {\n        page: page,\n        limit: this.EC.limit,\n        detailed: this.EC.detailed,\n        auth_token: this.EC.User.auth_info.token\n      },\n      url: this.EC.api_url + 'users/history/emoji'\n    };\n    return this._historyAPI(options).then((response) => {\n      this._history = response.emoji;\n      this.meta = response.meta;\n      this.cur_page = response.meta.page;\n      this.max_page = Math.ceil(response.total_count / this.EC.limit);\n\n      return this.EC.Data.history(this._history);\n    }).then(() => {\n      if (typeof callback === 'function') {\n        callback(this._history);\n      } else {\n        return this._history;\n      }\n    });\n  }\n\n  getHistoryInfoOnly(callback, page = 1) {\n    let options = {\n      data: {\n        page: page,\n        limit: this.EC.limit,\n        detailed: this.EC.detailed,\n        auth_token: this.EC.User.auth_info.token\n      }\n    };\n    return this._historyAPI(options).then((response) => {\n      this._history_info = response.history;\n      this.history_info_meta = response.meta;\n      this.history_info_cur_page = response.meta.page;\n      this.history_info_max_page = Math.ceil(response.total_count / this.EC.limit);\n\n      if (typeof callback === 'function') {\n        callback(this._history_info);\n      } else {\n        return this._history_info;\n      }\n    });\n  }\n\n  set(emoji_code) {\n    let options = {\n      type: 'POST',\n      data: {\n        auth_token: this.EC.User.auth_info.token,\n        emoji_code\n      },\n      success: response => {\n        for (let i = 0; i < this._history.length; i++) {\n          let entry = this._history[i];\n          if (entry.emoji_code === response.emoji_code) {\n            this._history[i] = response;\n            this.EC.Data.history(this._history);\n            return;\n          }\n        }\n        return response;\n      }\n    };\n    return this._historyAPI(options);\n  }\n\n  sync() {\n    return this.get();\n  }\n\n  all(callback) {\n    return this.EC.Data.history().then(data => {\n      if (typeof callback === 'function') {\n        callback(data);\n      } else {\n        return data;\n      }\n    });\n  }\n\n  next(callback) {\n    if (this.max_page === this.cur_page) return;\n    return this.get(callback, this.cur_page + 1);\n  }\n\n  prev(callback) {\n    if (this.cur_page === 1) return;\n    return this.get(callback, this.cur_page - 1);\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/user/history.js?");

/***/ }),

/***/ "./node_modules/emojidex-client/src/es6/components/util.js":
/*!*****************************************************************!*\
  !*** ./node_modules/emojidex-client/src/es6/components/util.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexUtil; });\nclass EmojidexUtil {\n  constructor(EC) {\n    // ↓ this process for processor of replace\n    self = this;\n\n    self.EC = EC;\n\n    self.acknowledgedUnicodePattern = self.EC.Data.moji_codes.moji_array.join('|');\n\n    self.a_pattern_base = `<a href=[\"|'][^'|^\"]*['|\"] emoji-code=[\"|'][^'|^\"]*['|\"]><img class=[\"|']emojidex-emoji['|\"] src=[\"|'][^'|^\"]*['|\"] (emoji-code=[\"|'][^'|^\"]*['|\"] emoji-moji=[\"|'][^'|^\"]*['|\"]|emoji-code=[\"|'][^'|^\"]*['|\"]) alt=[\"|'][^'|^\"]*['|\"]( \\/>|\\/>|>)<\\/a>`;\n    self.img_pattern_base = `<img class=[\"|']emojidex-emoji['|\"] src=[\"|'][^'|^\"]*['|\"] (emoji-code=[\"|'][^'|^\"]*['|\"] emoji-moji=[\"|'][^'|^\"]*['|\"]|emoji-code=[\"|'][^'|^\"]*['|\"]) alt=[\"|'][^'|^\"]*['|\"]( \\/>|\\/>|>)`;\n\n    self.a_pattern = RegExp(self.a_pattern_base, 'g');\n    self.img_pattern = RegExp(self.img_pattern_base, 'g');\n    self.wrapped_a_pattern = RegExp(`<span[^>]*>` + self.a_pattern_base + `</span>`, 'g');\n    self.wrapped_img_pattern = RegExp(`<span[^>]*>` + self.img_pattern_base + `</span>`, 'g');\n    self.garbage_tags = RegExp(`<span></span>`, 'g');\n    self.emoji_code_tag_attr_pattern = RegExp(`emoji-code=[\"|']([^'|^\"]*)['|\"]`, '');\n    self.emoji_moji_tag_attr_pattern = RegExp(`emoji-moji=[\"|']([^'|^\"]*)['|\"]`, '');\n    self.ignored_characters = '\\'\":;@&#~{}<>\\\\r\\\\n\\\\[\\\\]\\\\!\\\\$\\\\+\\\\?\\\\%\\\\*\\\\/\\\\\\\\';\n    self.short_code_pattern = RegExp(`:([^\\\\s${self.ignored_characters}][^${self.ignored_characters}]*[^${self.ignored_characters}]):|:([^${self.ignored_characters}]):`, 'g');\n    self.utf_pattern = RegExp(self.acknowledgedUnicodePattern);\n    self.utf_pattern_global = RegExp(self.utf_pattern, 'g');\n  }\n\n  // Escapes spaces to underscore\n  escapeTerm(term) {\n    return term.replace(/\\s/g, '_');\n  }\n\n  // De-Escapes underscores to spaces\n  deEscapeTerm(term) {\n    return term.replace(/_/g, ' ');\n  }\n\n  makeURLSafe(term) {\n    return self.escapeTerm(term).replace(/\\(/g, '%28').replace(/\\)/g, '%29');\n  }\n\n  // Adds colons around a code\n  encapsulateCode(code) {\n    return `:${self.unEncapsulateCode(code)}:`;\n  }\n\n  // Removes colons around a code\n  unEncapsulateCode(code) {\n    return code.replace(/\\:/g, '');\n  }\n\n  // Breakout into an array\n  breakout(items) {\n    if (items != null) {\n      if (items instanceof Array) {\n        return items;\n      } else {\n        return [items];\n      }\n    } else {\n      return [];\n    }\n  }\n\n  // Converts an emoji array to [{code: \"moji_code\", img_url: \"https://cdn...moji_code.png}] format\n  simplify(emoji = self.results, size_code = self.EC.size_code) {\n    for (let i = 0; i < emoji.length; i++) {\n      emoji[i].code = self.escapeTerm(emoji[i].code);\n      emoji[i].img_url = `${self.EC.cdn_url}/${size_code}/${self.escapeTerm(emoji[i].code)}.png`;\n    }\n\n    return emoji;\n  }\n\n  // Convert emoji characters[moji] and short codes in a text block to whatever\n  // format is retrurned by the method passed as the processor parameter.\n  // An emoji object is passed to the processor and formatted text should be returned.\n  // Default processor converts to HTML tags.\n  emojify(source, processor = self.emojiToHTML) {\n    return self.emojifyMoji(source, processor).then((processed) => {\n      return self.emojifyCodes(processed, processor);\n    }).then((processed) => {\n      return processed;\n    });\n  }\n\n  splitTextWithAcknowledgedEmoji(sourceText) {\n    let splittedSources = sourceText.match(RegExp(`[${self.acknowledgedUnicodePattern}]+|[^${self.acknowledgedUnicodePattern}]+`, 'gu'));\n    splittedSources = splittedSources.map((source) => {\n      if(/\\u200d/.test(source)) {\n        let sources = source.match(RegExp(`${self.acknowledgedUnicodePattern}|\\u200d`, 'gu'));\n        let emojis = [];\n        let zwjEmojis = [];\n        for (let i = 0; i < sources.length; i++) {\n          if (sources[i] !== '\\u{200d}' && sources[i + 1] !== '\\u{200d}' || sources[i + 1] === undefined) {\n            zwjEmojis.push(sources[i]);\n            emojis.push(zwjEmojis.join(''));\n            zwjEmojis = [];\n          } else {\n            zwjEmojis.push(sources[i]);\n          }\n        }\n        return emojis;\n      } else if(RegExp(`${self.acknowledgedUnicodePattern}`, 'gu').test(source)) {\n        return source.match(RegExp(`${self.acknowledgedUnicodePattern}`, 'gu'));\n      } else {\n        return source;\n      }\n    });\n    return [].concat.apply([], splittedSources);\n  }\n\n  // Convert UTF emoji using the specified processor\n  emojifyMoji(source, processor = self.emojiToHTML) {\n    let getMojicodes = (mojis) => {\n      return mojis.map((moji) => {\n        return self.EC.Data.moji_codes.moji_index[moji];\n      })\n    }\n    let getJwzReplacingPromises = (checkComponents, matchedMojiCodes, processor, combination = null) => {\n      let promises = [];\n      for(let i = 0; i < checkComponents.length; i++) {\n        if(checkComponents[i] || checkComponents.includes(false)) {\n          promises.push(new Promise((resolve, reject) => {\n            self.EC.Search.find(matchedMojiCodes.shift()).then((result) => {\n              if (result.hasOwnProperty('code')) {\n                processor === self.getZwjEmojiTag\n                  ? resolve(processor(result, combination.base, i))\n                  : resolve(processor(result));\n              }\n            })\n          }))\n        }\n      }\n      return promises\n    }\n\n    return new Promise((resolveEmojify, rejectEmojify) => {\n      let splittedSources = self.splitTextWithAcknowledgedEmoji(source);\n      let replacingSources = splittedSources.map((target) => {\n        return new Promise((resolveReplace, rejectReplace) => {\n          if(/\\u200d/.test(target)) {\n            // for used ZWJ emoji\n            let matchedMojis = target.match(self.utf_pattern_global);\n            let matchedMojiCodes = getMojicodes(matchedMojis)\n\n            self.EC.Search.find(self.EC.Data.moji_codes.moji_index[matchedMojis[0]]).then((result) => {\n              if(result.combinations.length) {\n                result.combinations.forEach((combination) => {\n                  // check for registered ZWJ emoji on emojidex.com\n                  let checkComponents = combination.components;\n                  let sortedMatchedMojiCodes = [];\n                  checkComponents = checkComponents.map((component, i) => {\n                    if(matchedMojiCodes.length) {\n                      for(let j = 0; j < matchedMojiCodes.length; j++) {\n                        if(component.includes(matchedMojiCodes[j])) {\n                          sortedMatchedMojiCodes.push({ emojiCode: matchedMojiCodes[j], layerNum: combination.component_layer_order[i] });\n                          matchedMojiCodes[j] = false\n                          return true\n                        } else if(j == matchedMojiCodes.length - 1) {\n                          return component[component.length - 1] == '' ? null : false\n                        }\n                      }\n                    }\n                  })\n\n                  let zwjReplacingPromises = null;\n                  let emojiCodes = sortedMatchedMojiCodes.sort((a, b) => { return a.layerNum < b.layerNum ? -1 : 1; }).map((o) => { return o.emojiCode; });\n                  if(checkComponents.includes(false)) {\n                    // for incorrect ZWJ emoji\n                    zwjReplacingPromises = getJwzReplacingPromises(checkComponents, emojiCodes, processor);\n                  } else {\n                    // for correct ZWJ emoji\n                    zwjReplacingPromises = getJwzReplacingPromises(checkComponents, emojiCodes, self.getZwjEmojiTag, combination);\n                  }\n                  Promise.all(zwjReplacingPromises).then((zwjReplacedStrings) => {\n                    if(checkComponents.includes(false)) {\n                      resolveReplace(zwjReplacedStrings.join(''));\n                    } else {\n                      self.EC.Search.find(combination.base).then((baseEmoji) => {\n                        resolveReplace(self.getZwjEmojiSpanTag(baseEmoji, zwjReplacedStrings.join('')));\n                      });\n                    }\n                  })\n                })\n              } else {\n                let replaceingUtfEmojiPromises = [];\n                matchedMojiCodes.forEach((code) => {\n                  replaceingUtfEmojiPromises.push(new Promise((resolve, reject) => {\n                    self.EC.Search.find(code).then((result) => {\n                      if (result.hasOwnProperty('code')) {\n                        resolve(processor(result));\n                      }\n                    })\n                  }))\n                })\n                Promise.all(replaceingUtfEmojiPromises).then((replacedUtfEmoji) => {\n                  resolveReplace(replacedUtfEmoji.join(''));\n                })\n              }\n            })\n          } else if(self.utf_pattern.test(target)) {\n            self.EC.Search.find(self.EC.Data.moji_codes.moji_index[target]).then((result) => {\n              if (result.hasOwnProperty('code')) {\n                resolveReplace(processor(result));\n              }\n            }).catch(() => {\n              resolveReplace(target);\n            })\n          } else {\n            resolveReplace(target);\n          }\n        })\n      })\n      Promise.all(replacingSources).then((replacedSources) => {\n        resolveEmojify(replacedSources.join(''));\n      })\n    });\n  }\n\n  // Convert emoji short codes using the specified processor\n  emojifyCodes(source, processor = self.emojiToHTML) {\n    return new Promise((resolve, reject) => {\n      let targets = source.match(self.short_code_pattern);\n      if (targets == null || targets.length == 0) { resolve(source); }\n\n      let count = targets.length;\n      let replacements = [];\n\n      for (let target of targets) {\n        let snip = `${target}`;\n        self.EC.Search.find(self.EC.Util.unEncapsulateCode(snip)).then((result) => {\n          if (result.hasOwnProperty('code')) {\n            replacements.push({pre: snip, post: processor(result)});\n          }\n          return source;\n        }).then((source) => {\n          count -= 1;\n        }).catch((response) => {\n          count -= 1;\n        }).then(() => {\n          if(count == 0) {\n            for (let replacement of replacements) {\n              source = source.replace(replacement.pre, replacement.post);\n            }\n            resolve(source);\n          }\n        });\n      }\n    });\n  }\n\n  // Shortcut to emojify with emojiToHTML as the processor\n  emojifyToHTML(source) {\n    return self.emojify(source, self.emojiToHTML);\n  }\n\n  // Shortcut to emojify with emojiToMD as the processor\n  emojifyToMD(source) {\n    return self.emojify(source, self.emojiToMD);\n  }\n\n  // Returns an HTML image/link tag for an emoji from an emoji object\n  emojiToHTML(emoji, size_code = self.EC.defaults.size_code) {\n    let img = `<img class=\"emojidex-emoji\" src=\"https://${self.EC.env.cdn_addr}/emoji/${size_code}/${self.escapeTerm(emoji.code)}.png\" emoji-code=\"${self.escapeTerm(emoji.code)}\"${(emoji.moji == null || emoji.moji == \"\")? \"\" : ' emoji-moji=\"' + emoji.moji + '\"'} alt=\"${self.deEscapeTerm(emoji.code)}\" />`;\n    if(emoji.link != null && emoji.link != '')\n      return `<a href=\"${emoji.link}\" emoji-code=\"${self.escapeTerm(emoji.code)}\">${img}</a>`;\n    return img;\n  }\n\n  // Returns an HTML image tag for an emoji from a ZWJ emoji object\n  getZwjEmojiTag(emoji, combinationBaseName, componentNumber, size_code = self.EC.defaults.size_code) {\n    return `<img class=\"emojidex-emoji\" src=\"https://${self.EC.env.cdn_addr}/emoji/${size_code}/${combinationBaseName}/${componentNumber}/${self.escapeTerm(emoji.code)}.png\" emoji-code=\"${self.escapeTerm(emoji.code)}\"${(emoji.moji == null || emoji.moji == \"\")? \"\" : ' emoji-moji=\"' + emoji.moji + '\"'} alt=\"${self.deEscapeTerm(emoji.code)}\" />`;\n  }\n\n  // Returns an HTML ZWJ emoji objects wrapped with span and base emoji link tag.\n  getZwjEmojiSpanTag(baseEmoji, zwjReplacedStrings) {\n    if(baseEmoji.link != null && baseEmoji.link != '')\n      return `<span class=\"zwj-emoji\"><a href=\"${baseEmoji.link}\" emoji-code=\"${self.escapeTerm(baseEmoji.code)}\">${zwjReplacedStrings}</a></span>`;\n    return `<span class=\"zwj-emoji\">${zwjReplacedStrings}</span>`;\n  }\n\n  // Returns a MarkDown image/link tag for an emoji from an emoji object\n  emojiToMD(emoji, size_code = self.EC.defaults.size_code) {\n    let img = `![${(emoji.moji == null || emoji.moji == '')? emoji.code : emoji.moji}](https://${self.EC.env.cdn_addr}/emoji/${size_code}/${self.escapeTerm(emoji.code)}.png \"${self.deEscapeTerm(emoji.code)}\")`;\n    if (emoji.link != null && emoji.link != '')\n      return `[${img} ](${emoji.link})`;\n    return img;\n  }\n\n  // Change emoji HTML tags into emoji codes and returns a string\n  // *This method takes a string and returns a string, such as the contents of\n  // a text box/content editable element, NOT a DOM object.\n  deEmojifyHTML(source, mojify = true) {\n    source = self._deEmojifyWrappedHTML(`${source}`, mojify);\n    source = self.deLinkHTML(source);\n    var targets = source.match(self.img_pattern);\n    if (targets == null)\n      return source;\n\n    for (let target of targets) {\n      if (mojify) {\n        let moji_code = target.match(self.emoji_moji_tag_attr_pattern);\n        if (moji_code != null && moji_code.length != 1) {\n          source = source.replace(target, moji_code[1]);\n          continue;\n        }\n      }\n      let emoji_code = target.match(self.emoji_code_tag_attr_pattern);\n      source = source.replace(target, self.encapsulateCode(emoji_code[1]));\n    }\n\n    return self._scrubGarbageTags(source);\n  }\n\n  _deEmojifyWrappedHTML(source, mojify = true) {\n    source = self.deLinkHTML(source);\n    var targets = source.match(self.wrapped_img_pattern);\n    if (targets == null)\n      return source;\n\n    for (let target of targets) {\n      if (mojify) {\n        let moji_code = target.match(self.emoji_moji_tag_attr_pattern);\n        if (moji_code != null && moji_code.length != 1) {\n          source = source.replace(target, moji_code[1]);\n          continue;\n        }\n      }\n      let emoji_code = target.match(self.emoji_code_tag_attr_pattern);\n      source = source.replace(target, self.encapsulateCode(emoji_code[1]));\n    }\n\n    return source;\n  }\n\n  // Scrubs junk left by at.js\n  _scrubGarbageTags(source) {\n    var targets = source.match(self.garbage_tags);\n    if (targets == null)\n      return source;\n\n    for (var i = 0; i < targets.length; i++) {\n      source = source.replace(targets[i], '');\n    }\n\n    return source;\n  }\n\n  // Remove links from wrapped emoji images in HTML\n  // *Only do self if you need to remove links for functionality.\n  deLinkHTML(source) {\n    source = self._deLinkWrappedHTML(`${source}`);\n    var targets = source.match(self.a_pattern);\n    if (targets == null)\n      return source;\n\n    for (var i = 0; i < targets.length; i++) {\n      source = source.replace(targets[i], targets[i].match(self.img_pattern)[0]);\n    }\n\n    return source;\n  }\n\n  _deLinkWrappedHTML(source) {\n    var targets = source.match(self.wrapped_a_pattern);\n    if (targets == null)\n      return source;\n\n    for (var i = 0; i < targets.length; i++) {\n      source = source.replace(targets[i], targets[i].match(self.img_pattern)[0]);\n    }\n\n    return source;\n  }\n\n  // Get's the 'this' context for this Util instance\n  // Generally should not be necessary, but with JS you never know...\n  getContext() {\n    return self;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/emojidex-client/src/es6/components/util.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/es6/emojidexReplace/components/observer.js":
/*!********************************************************!*\
  !*** ./src/es6/emojidexReplace/components/observer.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Observer; });\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ \"./node_modules/core-js/modules/es.object.define-property.js\");\n/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _replacer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./replacer */ \"./src/es6/emojidexReplace/components/replacer.js\");\n\n\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Observer =\n/*#__PURE__*/\nfunction () {\n  function Observer(plugin) {\n    _classCallCheck(this, Observer);\n\n    this.plugin = plugin;\n    this.dom_observer = undefined;\n    this.queues = [];\n    this.replacer = new _replacer__WEBPACK_IMPORTED_MODULE_4__[\"default\"](plugin);\n    this.flagReEntry = true;\n  }\n\n  _createClass(Observer, [{\n    key: \"doQueue\",\n    value: function doQueue() {\n      var _this = this;\n\n      return new Promise(function (resolve, reject) {\n        var body = $('body')[0];\n\n        if (_this.queues.indexOf(body) !== -1) {\n          _this.queues = [];\n\n          _this.replacer.loadEmoji($(body)).then(function () {\n            return resolve();\n          });\n        } else {\n          var queue_limit = 100;\n\n          var checkComplete = function checkComplete() {\n            if (_this.queues.length > 0 && queue_limit-- > 0) {\n              var queue = _this.queues.pop();\n\n              _this.replacer.loadEmoji(queue).then(function () {\n                checkComplete();\n              });\n            } else {\n              resolve();\n            }\n          };\n\n          checkComplete();\n        }\n      });\n    }\n  }, {\n    key: \"domObserve\",\n    value: function domObserve() {\n      var config = {\n        childList: true,\n        subtree: true,\n        characterData: true\n      };\n      return this.dom_observer.observe(this.plugin.element[0], config);\n    }\n  }, {\n    key: \"disconnect\",\n    value: function disconnect() {\n      this.dom_observer.disconnect();\n    }\n  }, {\n    key: \"reloadEmoji\",\n    value: function reloadEmoji() {\n      var _this2 = this;\n\n      this.replacer.loadEmoji().then(function () {\n        if (typeof _this2.plugin.options.onComplete === \"function\") {\n          _this2.plugin.options.onComplete(_this2.plugin.element);\n        }\n\n        _this2.dom_observer = new MutationObserver(function (mutations) {\n          if (_this2.flagReEntry) {\n            _this2.disconnect();\n\n            _this2.flagReEntry = false;\n\n            for (var i = 0; i < mutations.length; i++) {\n              var mutation = mutations[i];\n\n              if (mutation.type === 'childList') {\n                if (mutation.addedNodes) {\n                  for (var j = 0; j < mutation.addedNodes.length; j++) {\n                    var addedNode = mutation.addedNodes[j];\n\n                    if (_this2.queues.indexOf(addedNode) === -1) {\n                      _this2.queues.push(addedNode);\n                    }\n                  }\n                }\n              }\n            }\n\n            _this2.doQueue().then(function () {\n              _this2.flagReEntry = true;\n\n              _this2.domObserve();\n            });\n          }\n        });\n\n        _this2.domObserve();\n      });\n    }\n  }]);\n\n  return Observer;\n}();\n\n\n\n//# sourceURL=webpack:///./src/es6/emojidexReplace/components/observer.js?");

/***/ }),

/***/ "./src/es6/emojidexReplace/components/replacer.js":
/*!********************************************************!*\
  !*** ./src/es6/emojidexReplace/components/replacer.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Replacer; });\n/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ \"./node_modules/core-js/modules/es.object.define-property.js\");\n/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.promise */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.match */ \"./node_modules/core-js/modules/es.string.match.js\");\n/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Replacer =\n/*#__PURE__*/\nfunction () {\n  function Replacer(plugin) {\n    _classCallCheck(this, Replacer);\n\n    this.plugin = plugin;\n    this.targets = [];\n    this.wip_count = 0;\n  }\n\n  _createClass(Replacer, [{\n    key: \"loadEmoji\",\n    value: function loadEmoji(element) {\n      var _this = this;\n\n      if (element) {\n        this.setTargets(element);\n      } else if (typeof this.plugin.element !== null) {\n        this.setTargets(this.plugin.element[0]);\n      }\n\n      this.wip_count = this.targets.length;\n      return new Promise(function (resolve, reject) {\n        if (_this.wip_count === 0) {\n          resolve();\n        }\n\n        var _loop = function _loop() {\n          var target_node = _this.targets.pop();\n\n          _this.plugin.EC.Util.emojifyToHTML(target_node.data).then(function (new_text) {\n            $(target_node).replaceWith(new_text);\n\n            if (--_this.wip_count === 0) {\n              resolve();\n            }\n          });\n        };\n\n        while (_this.targets.length !== 0) {\n          _loop();\n        }\n      })[\"catch\"](function () {});\n    }\n  }, {\n    key: \"tagEscape\",\n    value: function tagEscape(string) {\n      return string.replace(/</g, '&lt;').replace(/>/g, '&gt;');\n    }\n  }, {\n    key: \"setTargets\",\n    value: function setTargets(node) {\n      var child;\n\n      if (node.nodeType === Node.TEXT_NODE) {\n        if (node.data.match(/\\S/)) {\n          this.targets.push(node);\n        }\n      } else if (!(node.parentNode && node.parentNode.isContentEditable)) {\n        child = node.firstChild;\n\n        while (child) {\n          switch (child.nodeType) {\n            case Node.ELEMENT_NODE:\n              // check if node an ignored type [black-listed] and if not that it is in the selector list [white-listed]\n              if ($(child).is(this.plugin.options.ignore) || !$(child).is(this.plugin.options.selector)) {\n                break;\n              }\n\n              if (this.plugin.options.ignoreContentEditable && child.isContentEditable) {\n                break;\n              }\n\n              this.setTargets(child);\n              break;\n\n            case Node.TEXT_NODE:\n              if (child.data.match(/\\S/)) {\n                child.data = this.tagEscape(child.data);\n                this.targets.push(child);\n              }\n\n              break;\n          }\n\n          child = child.nextSibling;\n        }\n      }\n    }\n  }]);\n\n  return Replacer;\n}();\n\n\n\n//# sourceURL=webpack:///./src/es6/emojidexReplace/components/replacer.js?");

/***/ }),

/***/ "./src/es6/emojidexReplace/index.js":
/*!******************************************!*\
  !*** ./src/es6/emojidexReplace/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EmojidexReplace; });\n/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ \"./node_modules/core-js/modules/es.object.define-property.js\");\n/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var emojidex_client_src_es6_client_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emojidex-client/src/es6/client.js */ \"./node_modules/emojidex-client/src/es6/client.js\");\n/* harmony import */ var _components_replacer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/replacer */ \"./src/es6/emojidexReplace/components/replacer.js\");\n/* harmony import */ var _components_observer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/observer */ \"./src/es6/emojidexReplace/components/observer.js\");\n\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*\n* emojidexReplace\n*\n* =LICENSE=\n* Licensed under the emojidex Open License\n\n* Copyright 2013 the emojidex project / K.K. GenSouSha\n*/\n\n\n\nvar pluginName = 'emojidexReplace';\nvar defaults = {\n  onComplete: undefined,\n  useLoadingImg: true,\n  autoUpdate: true,\n  selector: '*',\n  ignore: 'script, noscript, canvas, img, style, iframe, input, textarea, pre, code',\n  ignoreContentEditable: true\n};\n\nvar EmojidexReplace =\n/*#__PURE__*/\nfunction () {\n  function EmojidexReplace(element, options) {\n    var _this = this;\n\n    _classCallCheck(this, EmojidexReplace);\n\n    this.element = element;\n\n    if (!window.emojidexReplacerOnce) {\n      window.emojidexReplacerOnce = true;\n      this.element = $(this.element);\n      this.options = $.extend({}, defaults, options);\n      this._defaults = defaults;\n      this._name = pluginName;\n      this.EC = new emojidex_client_src_es6_client_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n        onReady: function onReady(EC) {\n          _this.EC.User.login('session');\n\n          _this.replace();\n        }\n      });\n    }\n  }\n\n  _createClass(EmojidexReplace, [{\n    key: \"replace\",\n    value: function replace() {\n      var _this2 = this;\n\n      if (this.options.autoUpdate) {\n        this.replacer = new _components_observer__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this).reloadEmoji();\n      } else {\n        this.replacer = new _components_replacer__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this).loadEmoji().then(function () {\n          if (typeof _this2.options.onComplete === \"function\") {\n            _this2.options.onComplete();\n          }\n        });\n      }\n    }\n  }]);\n\n  return EmojidexReplace;\n}();\n\n\n\n//# sourceURL=webpack:///./src/es6/emojidexReplace/index.js?");

/***/ }),

/***/ "./src/es6/index.js":
/*!**************************!*\
  !*** ./src/es6/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _emojidexReplace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emojidexReplace */ \"./src/es6/emojidexReplace/index.js\");\n\nvar pluginName = 'emojidexReplace';\n\n$.fn[pluginName] = function (options) {\n  return this.each(function () {\n    if (!$.data(this, \"plugin_\".concat(pluginName))) {\n      return $.data(this, \"plugin_\".concat(pluginName), new _emojidexReplace__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this, options));\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/es6/index.js?");

/***/ })

/******/ });
});