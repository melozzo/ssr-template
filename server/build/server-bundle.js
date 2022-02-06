/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.deleteSite = exports.updateSite = exports.fetchSites = exports.DELETED_SITE = exports.CREATED_SITE = exports.UPDATED_SITE = exports.SET_EVENTS = exports.DELETE_SITE = exports.SET_SITE = exports.SET_SITES = undefined;
exports.createSite = createSite;

var _axios = __webpack_require__(0);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(19);

var _moment2 = _interopRequireDefault(_moment);

var _albumActions = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SET_SITES = exports.SET_SITES = 'SET_SITES';
var SET_SITE = exports.SET_SITE = 'SET_SITE';
var DELETE_SITE = exports.DELETE_SITE = 'DELETE_SITE';
var SET_EVENTS = exports.SET_EVENTS = 'SET_EVENTS';
var UPDATED_SITE = exports.UPDATED_SITE = 'UPDATED_SITE';
var CREATED_SITE = exports.CREATED_SITE = 'SITE_CREATED';
var DELETED_SITE = exports.DELETED_SITE = 'DELETED_SITE';

console.log('env is local:', process.env.EXPO_LOCAL);

var baseURL = 'http://138.68.12.0:8080'; //'http://localhost:8080';      //
console.log('baseURL', baseURL);

var fetchSites = exports.fetchSites = function fetchSites(mapId) {
      if (!mapId) return;
      return function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
                  var response, data;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                              switch (_context.prev = _context.next) {
                                    case 0:
                                          _context.prev = 0;
                                          _context.next = 3;
                                          return fetch(baseURL + '/site/list/' + mapId, {
                                                method: 'GET',
                                                headers: { 'Content-Type': 'application/json' }
                                          });

                                    case 3:
                                          response = _context.sent;

                                          if (response.ok) {
                                                _context.next = 6;
                                                break;
                                          }

                                          throw new Error('fetching sites failed');

                                    case 6:
                                          _context.next = 8;
                                          return response.json();

                                    case 8:
                                          data = _context.sent;

                                          dispatch({ type: SET_SITES, sites: data });

                                          _context.next = 16;
                                          break;

                                    case 12:
                                          _context.prev = 12;
                                          _context.t0 = _context['catch'](0);

                                          // throw err;
                                          console.log('web service not available', _context.t0);
                                          alert('traveloggia cloud offline'); // todo make initial check

                                    case 16:
                                    case 'end':
                                          return _context.stop();
                              }
                        }
                  }, _callee, undefined, [[0, 12]]);
            }));

            return function (_x) {
                  return _ref.apply(this, arguments);
            };
      }();
};

function createSite(site) {
      var _this = this;

      return function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
                  var axiosConfig, createdSite;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                              switch (_context2.prev = _context2.next) {
                                    case 0:
                                          _context2.prev = 0;
                                          axiosConfig = {
                                                method: 'POST',
                                                url: baseURL + '/site/create',
                                                headers: { 'Content-Type': 'application/json' },
                                                data: {
                                                      MapID: site.MapID,
                                                      Longitude: site.Longitude,
                                                      Latitude: site.Latitude,
                                                      Name: site.Name,
                                                      Address: site.Address,
                                                      DateAdded: new Date(),
                                                      Links: site.Links
                                                }
                                          };
                                          _context2.next = 4;
                                          return (0, _axios2.default)(axiosConfig);

                                    case 4:
                                          createdSite = _context2.sent;

                                          dispatch({ type: CREATED_SITE, createdSite: createdSite.data });
                                          _context2.next = 11;
                                          break;

                                    case 8:
                                          _context2.prev = 8;
                                          _context2.t0 = _context2['catch'](0);

                                          console.log('error creating site', _context2.t0.message);

                                    case 11:
                                    case 'end':
                                          return _context2.stop();
                              }
                        }
                  }, _callee2, _this, [[0, 8]]);
            }));

            return function (_x2) {
                  return _ref2.apply(this, arguments);
            };
      }();
}

var updateSite = exports.updateSite = function updateSite(site) {
      return function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
                  var url, data;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                              switch (_context3.prev = _context3.next) {
                                    case 0:
                                          try {
                                                url = baseURL + '/site/' + site.SiteID;
                                                data = {
                                                      MapID: site.MapID,
                                                      Longitude: site.Longitude,
                                                      Latitude: site.Latitude,
                                                      Name: site.Name,
                                                      Arrival: site.Arrival ? site.Arrival : null,
                                                      Departure: site.Departure ? site.Departure : null,
                                                      IsDeleted: site.IsDeleted,
                                                      Description: site.Description,
                                                      Address: site.Address,
                                                      Links: site.Links
                                                };

                                                console.log('sending data to api', data);
                                                _axios2.default.put(url, data).then(function (updatedSite) {
                                                      dispatch({ type: UPDATED_SITE, updatedSite: updatedSite.data });
                                                });
                                          } catch (error) {
                                                console.log('error updating site', JSON.stringify(error));
                                          }

                                    case 1:
                                    case 'end':
                                          return _context3.stop();
                              }
                        }
                  }, _callee3, undefined);
            }));

            return function (_x3) {
                  return _ref3.apply(this, arguments);
            };
      }();
};

var deleteSite = exports.deleteSite = function deleteSite(site) {
      console.log('in delete site', site.SiteID);
      return function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch) {
                  var response;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                              switch (_context4.prev = _context4.next) {
                                    case 0:
                                          _context4.next = 2;
                                          return fetch(baseURL + '/site/' + site.SiteID, {
                                                method: 'DELETE',
                                                headers: { 'Content-Type': 'application/json' }
                                          });

                                    case 2:
                                          response = _context4.sent;

                                          if (!response.ok) console.log('deleting site failed');

                                          dispatch({ type: DELETED_SITE, deletedSite: site });

                                    case 5:
                                    case 'end':
                                          return _context4.stop();
                              }
                        }
                  }, _callee4, undefined);
            }));

            return function (_x4) {
                  return _ref4.apply(this, arguments);
            };
      }();
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.updatePhoto = exports.deletePhoto = exports.createPhoto = exports.uploadPhoto = exports.fetchPhotos = exports.PHOTO_UPLOADED = exports.SET_PHOTO = exports.SET_PHOTOS = undefined;

var _axios = __webpack_require__(0);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//import { RNS3 } from 'react-native-upload-aws-s3';

var baseURL = 'http://138.68.12.0:8080'; //  'http://localhost:8080'; //

var SET_PHOTOS = exports.SET_PHOTOS = 'SET_PHOTOS';
var SET_PHOTO = exports.SET_PHOTO = 'SET_PHOTO';
var PHOTO_UPLOADED = exports.PHOTO_UPLOADED = 'PHOTO_UPLOADED';

var fetchPhotos = exports.fetchPhotos = function fetchPhotos(siteId) {
      if (!siteId) return;
      return function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
                  var response, data;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                              switch (_context.prev = _context.next) {
                                    case 0:
                                          _context.prev = 0;
                                          _context.next = 3;
                                          return fetch(baseURL + '/photo/list/' + siteId, {
                                                method: 'GET',
                                                headers: { 'Content-Type': 'application/json' }
                                          });

                                    case 3:
                                          response = _context.sent;

                                          if (!response.ok) {
                                                console.log('fetching photos failed for', siteId);
                                                // throw new Error(response);
                                          }
                                          _context.next = 7;
                                          return response.json();

                                    case 7:
                                          data = _context.sent;


                                          dispatch({ type: SET_PHOTOS, photos: data });
                                          _context.next = 14;
                                          break;

                                    case 11:
                                          _context.prev = 11;
                                          _context.t0 = _context['catch'](0);
                                          throw _context.t0;

                                    case 14:
                                    case 'end':
                                          return _context.stop();
                              }
                        }
                  }, _callee, undefined, [[0, 11]]);
            }));

            return function (_x) {
                  return _ref.apply(this, arguments);
            };
      }();
};

var uploadPhoto = exports.uploadPhoto = function uploadPhoto(objPrefix, photo) {
      return function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
                  var imageUri, uriParts, fileType, file, options, response;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                              switch (_context2.prev = _context2.next) {
                                    case 0:
                                          imageUri = photo.DeviceStorageURL;
                                          uriParts = imageUri.split('.');
                                          fileType = uriParts[uriParts.length - 1];

                                          console.log("filetype", fileType);

                                          file = {
                                                uri: imageUri,
                                                name: photo.FileName,
                                                type: fileType
                                          };
                                          options = {
                                                keyPrefix: objPrefix,
                                                bucket: 'traveloggia-guests',
                                                region: 'us-west-2',
                                                accessKey: 'AKIAVBGO6MUINRVR2JEJ',
                                                secretKey: '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',
                                                successActionStatus: 201
                                          };


                                          try {
                                                // const response = await RNS3.put(file, options)
                                                response = { "status": 201 };

                                                if (response.status === 201) {
                                                      console.log("Success: ", response.body);
                                                      //set photo uploaded true; 
                                                } else {
                                                      console.log("Failed to upload image to S3: ", response);
                                                }
                                          } catch (error) {
                                                console.log(error);
                                          }

                                    case 7:
                                    case 'end':
                                          return _context2.stop();
                              }
                        }
                  }, _callee2, undefined);
            }));

            return function (_x2) {
                  return _ref2.apply(this, arguments);
            };
      }();
};

var createPhoto = exports.createPhoto = function createPhoto(photo) {
      console.log("entered create photo action", photo);
      return function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
                  var axiosConfig, createdPhoto;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                              switch (_context3.prev = _context3.next) {
                                    case 0:
                                          _context3.prev = 0;
                                          axiosConfig = {
                                                method: "POST",
                                                url: baseURL + '/photo/create',
                                                headers: { 'Content-Type': 'application/json' },
                                                data: {
                                                      DateTaken: photo.DateTaken,
                                                      SiteID: photo.SiteID,
                                                      FileName: photo.FileName,
                                                      StorageURL: photo.StorageURL,
                                                      DeviceStorageURL: photo.DeviceStorageURL
                                                }
                                          };
                                          _context3.next = 4;
                                          return (0, _axios2.default)(axiosConfig);

                                    case 4:
                                          createdPhoto = _context3.sent;


                                          dispatch(fetchPhotos(photo.SiteID));

                                          _context3.next = 11;
                                          break;

                                    case 8:
                                          _context3.prev = 8;
                                          _context3.t0 = _context3['catch'](0);

                                          console.log("error creating photo record", _context3.t0.message);

                                    case 11:
                                    case 'end':
                                          return _context3.stop();
                              }
                        }
                  }, _callee3, undefined, [[0, 8]]);
            }));

            return function (_x3) {
                  return _ref3.apply(this, arguments);
            };
      }();
};

var deletePhoto = exports.deletePhoto = function deletePhoto(photo) {
      console.log("deleting photo id", photo.PhotoID);
      return function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch) {
                  var axiosConfig, deletedPhoto;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                              switch (_context4.prev = _context4.next) {
                                    case 0:
                                          _context4.prev = 0;
                                          axiosConfig = {
                                                method: "DELETE",
                                                url: baseURL + '/photo/' + photo.PhotoID,
                                                headers: { 'Content-Type': 'application/json' }
                                          };
                                          _context4.next = 4;
                                          return (0, _axios2.default)(axiosConfig);

                                    case 4:
                                          deletedPhoto = _context4.sent;

                                          console.log('deleted photo');
                                          dispatch(fetchPhotos(photo.SiteID));

                                          _context4.next = 12;
                                          break;

                                    case 9:
                                          _context4.prev = 9;
                                          _context4.t0 = _context4['catch'](0);

                                          console.log("error deleting photo record", _context4.t0.message);

                                    case 12:
                                    case 'end':
                                          return _context4.stop();
                              }
                        }
                  }, _callee4, undefined, [[0, 9]]);
            }));

            return function (_x4) {
                  return _ref4.apply(this, arguments);
            };
      }();
};

var updatePhoto = exports.updatePhoto = function updatePhoto(caption, photo) {
      return function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch) {
                  var url, data;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                              switch (_context5.prev = _context5.next) {
                                    case 0:
                                          url = baseURL + '/photo/' + photo.PhotoID;

                                          console.log('update photo url', url);
                                          data = {
                                                SiteID: photo.SiteID,
                                                FileName: photo.FileName,
                                                dateTaken: photo.DateTaken,
                                                StorageURL: photo.StorageURL,
                                                DeviceStorageURL: photo.DeviceStorageURL,
                                                Caption: caption,
                                                IsDeleted: photo.IsDeleted,
                                                orientationID: photo.orientationID
                                          };

                                          _axios2.default.put(url, data).then(function (updatedPhoto) {
                                                console.log('caption updated', updatedPhoto);
                                                dispatch(fetchPhotos(photo.SiteID));
                                          }).catch(function (error) {
                                                console.log("error updating photo", error);
                                          });

                                    case 4:
                                    case 'end':
                                          return _context5.stop();
                              }
                        }
                  }, _callee5, undefined);
            }));

            return function (_x5) {
                  return _ref5.apply(this, arguments);
            };
      }();
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _renderer = __webpack_require__(9);

var _renderer2 = _interopRequireDefault(_renderer);

var _serverStore = __webpack_require__(14);

var _serverStore2 = _interopRequireDefault(_serverStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('frontend server bootstrap start'); // const express = require('express'); // commonjs syntax
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;
// to make this isomorphic - run same code on server and client
// change to es2015

var frontendServer = (0, _express2.default)();

frontendServer.use(_express2.default.static('app/dist'));

console.log('static dir is app/dist');

frontendServer.get('*', function (req, res) {
	var store = (0, _serverStore2.default)();
	var allHTML = (0, _renderer2.default)(req, store);
	res.send(allHTML);
});

frontendServer.listen(3000, function () {
	console.log('FRONTEND SERVER LISTENING ON PORT 3000');
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(10);

var _reactRouterDom = __webpack_require__(2);

var _routes = __webpack_require__(11);

var _routes2 = _interopRequireDefault(_routes);

var _reactRedux = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Renderer = function Renderer(req, serverStore) {

	var content = (0, _server.renderToString)(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: serverStore },
		_react2.default.createElement(
			_reactRouterDom.StaticRouter,
			{ location: req.path, context: {} },
			_react2.default.createElement(_routes2.default, null)
		)
	));
	// bundle contains everything thats not html
	return '\n                <html><head><body><div id="root">' + content + '</div>\n                <script src="app-bundle.js"></script>\n                </body></html>\n        ';
};

exports.default = Renderer;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _Home = __webpack_require__(12);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = function Routes() {

        return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default })
        );
};

exports.default = Routes;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// es2015 module syntax

var Home = function Home() {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			null,
			'Welcome to the sucky home component'
		),
		_react2.default.createElement(
			'button',
			{ onClick: function onClick() {
					return console.log('hi shorty');
				} },
			'press me '
		)
	);
};

exports.default = Home;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = __webpack_require__(3);

var _reduxThunk = __webpack_require__(15);

var _reducers = __webpack_require__(16);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServerStore = function ServerStore() {

	var store = (0, _redux.createStore)(_reducers2.default, {});
	return store;
};

exports.default = ServerStore;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = __webpack_require__(3);

var _mapReducer = __webpack_require__(17);

var _mapReducer2 = _interopRequireDefault(_mapReducer);

var _siteReducer = __webpack_require__(20);

var _siteReducer2 = _interopRequireDefault(_siteReducer);

var _authReducer = __webpack_require__(21);

var _authReducer2 = _interopRequireDefault(_authReducer);

var _albumReducer = __webpack_require__(23);

var _albumReducer2 = _interopRequireDefault(_albumReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reducers = function Reducers() {
	return (0, _redux.combineReducers)({ map: _mapReducer2.default, site: _siteReducer2.default, auth: _authReducer2.default, album: _albumReducer2.default });
};

exports.default = Reducers;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mapActions = __webpack_require__(18);

var _lodash = __webpack_require__(4);

var _lodash2 = _interopRequireDefault(_lodash);

var _siteActions = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
	mapList: [],
	selectedMap: null,
	emptyMap: false
};

function mapReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	var maps = _lodash2.default.cloneDeep(state.mapList);
	var idx = void 0;
	switch (action.type) {
		case _mapActions.SET_MAPS:
			return {
				mapList: action.maps,
				selectedMap: state.selectedMap,
				emptyMap: state.emptyMap
			};
		case _mapActions.SET_MAP:
			return {
				mapList: state.mapList,
				selectedMap: action.selectedMap,
				emptyMap: state.emptyMap
			};
		case _mapActions.CREATED_MAP:
			maps.unshift(action.createdMap);
			return {
				mapList: maps,
				selectedMap: action.createdMap,
				emptyMap: true
			};

		case _mapActions.UPDATED_MAP:
			var map = maps.find(function (m) {
				return m.MapID === action.updatedMap.MapID;
			});
			idx = maps.indexOf(map);
			maps[idx] = action.updatedMap;
			return {
				mapList: maps,
				selectedMap: action.updatedMap
			};

		case _mapActions.DELETED_MAP:
			var deleted = maps.find(function (m) {
				return m.MapID === action.deletedMap.MapID;
			});
			idx = maps.indexOf(deleted);
			maps.splice(idx, 1);
			return {
				mapList: maps,
				selectedMap: null
			};

		case _mapActions.IS_EMPTY_MAP:
			return {
				mapList: state.mapList,
				selectedMap: state.selectedMap,
				emptyMap: action.isEmpty
			};

		default:
			return state;
	}
}

exports.default = mapReducer;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.deleteMap = exports.updateMap = exports.createMap = exports.getLastMap = exports.fetchMaps = exports.IS_EMPTY_MAP = exports.CREATED_MAP = exports.UPDATED_MAP = exports.DELETED_MAP = exports.SET_MAP = exports.SET_MAPS = undefined;

var _axios = __webpack_require__(0);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SET_MAPS = exports.SET_MAPS = 'SET_MAPS';
var SET_MAP = exports.SET_MAP = 'SET_MAP';
var DELETED_MAP = exports.DELETED_MAP = 'DELETED_MAP';
var UPDATED_MAP = exports.UPDATED_MAP = 'UPDATED_MAP';
var CREATED_MAP = exports.CREATED_MAP = 'CREATED_MAP';
var IS_EMPTY_MAP = exports.IS_EMPTY_MAP = 'IS_EMPTY_MAP';

var baseURL = 'http://138.68.12.0:8080'; // 'http://localhost:8080'; //

var fetchMaps = exports.fetchMaps = function fetchMaps(memberId) {
      return function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
                  var response, data;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                              switch (_context.prev = _context.next) {
                                    case 0:
                                          _context.next = 2;
                                          return fetch(baseURL + '/map/list/' + memberId, {
                                                method: 'GET',
                                                headers: {
                                                      'Content-Type': 'application/json'
                                                }
                                          });

                                    case 2:
                                          response = _context.sent;
                                          _context.next = 5;
                                          return response.json();

                                    case 5:
                                          data = _context.sent;

                                          dispatch({ type: SET_MAPS, maps: data });

                                    case 7:
                                    case 'end':
                                          return _context.stop();
                              }
                        }
                  }, _callee, undefined);
            }));

            return function (_x) {
                  return _ref.apply(this, arguments);
            };
      }();
};

var getLastMap = exports.getLastMap = function getLastMap(memberId) {
      console.log('inside last map');
      return function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
                  var response, data;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                              switch (_context2.prev = _context2.next) {
                                    case 0:
                                          _context2.prev = 0;
                                          _context2.next = 3;
                                          return fetch(baseURL + '/map/list/46996');

                                    case 3:
                                          response = _context2.sent;

                                          console.log('got response');
                                          _context2.next = 7;
                                          return response.json();

                                    case 7:
                                          data = _context2.sent;

                                          console.log('returning map', data);
                                          dispatch({
                                                type: SET_MAP,
                                                selectedMap: data
                                          });
                                          _context2.next = 15;
                                          break;

                                    case 12:
                                          _context2.prev = 12;
                                          _context2.t0 = _context2['catch'](0);

                                          console.log("error");

                                    case 15:
                                    case 'end':
                                          return _context2.stop();
                              }
                        }
                  }, _callee2, undefined, [[0, 12]]);
            }));

            return function (_x2) {
                  return _ref2.apply(this, arguments);
            };
      }();
};

var createMap = exports.createMap = function createMap(memberId, mapName) {
      return function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
                  var axiosConfig, createdMap;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                              switch (_context3.prev = _context3.next) {
                                    case 0:
                                          _context3.prev = 0;
                                          axiosConfig = {
                                                method: "POST",
                                                url: baseURL + '/map/create',
                                                headers: { 'Content-Type': 'application/json' },
                                                data: {
                                                      MemberID: memberId,
                                                      MapName: mapName
                                                }
                                          };
                                          _context3.next = 4;
                                          return (0, _axios2.default)(axiosConfig);

                                    case 4:
                                          createdMap = _context3.sent;

                                          dispatch({ type: CREATED_MAP, createdMap: createdMap.data });

                                          _context3.next = 11;
                                          break;

                                    case 8:
                                          _context3.prev = 8;
                                          _context3.t0 = _context3['catch'](0);

                                          console.log("error creating map", _context3.t0);

                                    case 11:
                                    case 'end':
                                          return _context3.stop();
                              }
                        }
                  }, _callee3, undefined, [[0, 8]]);
            }));

            return function (_x3) {
                  return _ref3.apply(this, arguments);
            };
      }();
};

var updateMap = exports.updateMap = function updateMap(map) {
      map.LastRevision = new Date();
      return function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch) {
                  var axiosConfig, mel;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                              switch (_context4.prev = _context4.next) {
                                    case 0:
                                          _context4.prev = 0;
                                          axiosConfig = {
                                                method: "PUT",
                                                url: baseURL + '/map/' + map.MapID,
                                                headers: { 'Content-Type': 'application/json' },
                                                data: map
                                                // I dont understand why the updated map is not returned but
                                                // its findOneAndUpdate that doesnt work, and I have worked around elsewhere
                                          };
                                          _context4.next = 4;
                                          return (0, _axios2.default)(axiosConfig);

                                    case 4:
                                          mel = _context4.sent;

                                          console.log("returned from update map", mel.data);
                                          dispatch({ type: UPDATED_MAP, updatedMap: map });

                                          _context4.next = 12;
                                          break;

                                    case 9:
                                          _context4.prev = 9;
                                          _context4.t0 = _context4['catch'](0);

                                          console.log('error updating map', _context4.t0.message);

                                    case 12:
                                    case 'end':
                                          return _context4.stop();
                              }
                        }
                  }, _callee4, undefined, [[0, 9]]);
            }));

            return function (_x4) {
                  return _ref4.apply(this, arguments);
            };
      }();
};

var deleteMap = exports.deleteMap = function deleteMap(map) {
      return function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch) {
                  var axiosConfig;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                              switch (_context5.prev = _context5.next) {
                                    case 0:
                                          _context5.prev = 0;
                                          axiosConfig = {
                                                method: "DELETE",
                                                url: baseURL + '/map/' + map.MapID,
                                                headers: { 'Content-Type': 'application/json' }

                                          };
                                          _context5.next = 4;
                                          return (0, _axios2.default)(axiosConfig);

                                    case 4:
                                          dispatch({ type: DELETED_MAP, deletedMap: map });

                                          _context5.next = 10;
                                          break;

                                    case 7:
                                          _context5.prev = 7;
                                          _context5.t0 = _context5['catch'](0);

                                          console.log('error deleting map', _context5.t0.message);

                                    case 10:
                                    case 'end':
                                          return _context5.stop();
                              }
                        }
                  }, _callee5, undefined, [[0, 7]]);
            }));

            return function (_x5) {
                  return _ref5.apply(this, arguments);
            };
      }();
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _siteActions = __webpack_require__(5);

var SiteActions = _interopRequireWildcard(_siteActions);

var _lodash = __webpack_require__(4);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
	siteList: [],
	selectedSite: null
};

function siteReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	var sites = _lodash2.default.cloneDeep(state.siteList);
	var idx = void 0;
	switch (action.type) {
		case SiteActions.SET_SITES:
			return {
				siteList: action.sites,
				seletedSite: state.selectedSite
			};

		case SiteActions.SET_SITE:
			return {
				siteList: state.siteList,
				selectedSite: action.selectedSite
			};

		case SiteActions.CREATED_SITE:
			sites.push(action.createdSite);
			return {
				siteList: sites,
				selectedSite: action.createdSite
			};

		case SiteActions.UPDATED_SITE:
			var site = sites.find(function (s) {
				return s.SiteID === action.updatedSite.SiteID;
			});
			idx = sites.indexOf(site);
			sites[idx] = action.updatedSite;
			return {
				siteList: sites,
				selectedSite: action.updatedSite
			};

		case SiteActions.DELETED_SITE:
			idx = sites.indexOf(action.deletedSite);
			sites.splice(idx, 1);
			return {
				siteList: sites,
				selectedSite: null
			};

		default:
			return state;

	}
}

exports.default = siteReducer;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});

var _authActions = __webpack_require__(22);

var AuthActions = _interopRequireWildcard(_authActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
      authenticatedMember: null,
      readOnly: false,
      justLoggedIn: false
};

function memberReducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments[1];


      switch (action.type) {
            case AuthActions.SET_AUTHENTICATED:
                  return {
                        authenticatedMember: action.member,
                        readOnly: state.readOnly,
                        justLoggedIn: state.loggedIn
                  };
            case AuthActions.SET_READ_ONLY:
                  return {
                        authenticatedMember: state.authenticatedMember,
                        readOnly: action.value,
                        justLoggedIn: state.loggedIn
                  };
            case AuthActions.LOGIN_SUCCESS:
                  return {
                        authenticatedMember: state.authenticatedMember,
                        readOnly: state.readOnly,
                        justLoggedIn: true

                  };
            case AuthActions.LOG_OUT:
                  return {
                        authenticatedMember: state.authenticatedMember,
                        readOnly: state.readOnly,
                        justLoggedIn: false
                  };
            default:
                  return state;

      }
}

exports.default = memberReducer;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.createAccount = exports.login = exports.checkSavedCredentials = exports.LOG_OUT = exports.LOGIN_SUCCESS = exports.SET_READ_ONLY = exports.CREATE_ACCOUNT = exports.SET_AUTHENTICATED = exports.LOGIN = undefined;

var _axios = __webpack_require__(0);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LOGIN = exports.LOGIN = 'LOGIN';
var SET_AUTHENTICATED = exports.SET_AUTHENTICATED = 'SET_AUTHENTICATED';
var CREATE_ACCOUNT = exports.CREATE_ACCOUNT = 'CREATE_ACCOUNT';
var SET_READ_ONLY = exports.SET_READ_ONLY = "SET_READ_ONLY";
var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var LOG_OUT = exports.LOG_OUT = 'LOG_OUT';

//  let memberId=46996;// email white@album pwd snow
var baseURL = 'http://138.68.12.0:8080'; //'http://localhost:8080';   /


var checkSavedCredentials = exports.checkSavedCredentials = function checkSavedCredentials() {
      return function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
                  var foundEmail, foundPwd;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                              switch (_context.prev = _context.next) {
                                    case 0:
                                          try {
                                                foundEmail = null; //await AsyncStorage.getItem("@traveloggia.email");

                                                foundPwd = null; //await AsyncStorage.getItem("@traveloggia.pwd");

                                                if (foundEmail !== null && foundPwd !== null) dispatch(login(foundEmail, foundPwd));
                                          } catch (error) {
                                                console.log(error.message);
                                          }

                                    case 1:
                                    case 'end':
                                          return _context.stop();
                              }
                        }
                  }, _callee, undefined);
            }));

            return function (_x) {
                  return _ref.apply(this, arguments);
            };
      }();
};

var login = exports.login = function login(_ref2) {
      var email = _ref2.email,
          password = _ref2.password;

      //  console.log('auth action login entered', email, password)
      return function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
                  var axiosConfig, foundMember, mel;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                              switch (_context2.prev = _context2.next) {
                                    case 0:
                                          _context2.prev = 0;
                                          axiosConfig = {
                                                method: 'POST',
                                                url: baseURL + '/member/login',
                                                headers: { 'Content-Type': 'application/json' },
                                                data: { Email: email, Password: password }
                                          };
                                          _context2.next = 4;
                                          return (0, _axios2.default)(axiosConfig);

                                    case 4:
                                          foundMember = _context2.sent;
                                          mel = foundMember.data;
                                          //console.log('member returned', mel)

                                          dispatch({ type: SET_AUTHENTICATED, member: mel });

                                          dispatch({ type: SET_READ_ONLY, value: false });

                                          _context2.next = 13;
                                          break;

                                    case 10:
                                          _context2.prev = 10;
                                          _context2.t0 = _context2['catch'](0);

                                          alert('error logging in ', _context2.t0);

                                    case 13:
                                    case 'end':
                                          return _context2.stop();
                              }
                        }
                  }, _callee2, undefined, [[0, 10]]);
            }));

            return function (_x2) {
                  return _ref3.apply(this, arguments);
            };
      }();
};

var createAccount = exports.createAccount = function createAccount(creds) {
      console.log('create account action');
      return function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
                  var axiosConfig, created;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                              switch (_context3.prev = _context3.next) {
                                    case 0:
                                          _context3.prev = 0;
                                          axiosConfig = {
                                                method: 'POST',
                                                url: baseURL + '/member/create',
                                                headers: { 'Content-Type': 'application/json' },
                                                data: { Email: creds.email, Password: creds.password }
                                          };
                                          _context3.next = 4;
                                          return (0, _axios2.default)(axiosConfig);

                                    case 4:
                                          created = _context3.sent;

                                          console.log('returning authenticated member');
                                          dispatch({ type: SET_AUTHENTICATED, member: created.data });
                                          dispatch({ type: SET_READ_ONLY, value: false });
                                          dispatch({ type: LOGIN_SUCCESS });
                                          _context3.next = 14;
                                          break;

                                    case 11:
                                          _context3.prev = 11;
                                          _context3.t0 = _context3['catch'](0);

                                          console.log('error createing member', _context3.t0);

                                    case 14:
                                    case 'end':
                                          return _context3.stop();
                              }
                        }
                  }, _callee3, undefined, [[0, 11]]);
            }));

            return function (_x3) {
                  return _ref4.apply(this, arguments);
            };
      }();
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});

var _albumActions = __webpack_require__(6);

var initialState = {
      photoList: [],
      selectedPhoto: null,
      uploadState: null,
      needsReload: false // used by add and delete even update
};

function albumReducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments[1];


      switch (action.type) {
            case _albumActions.SET_PHOTOS:
                  return {
                        photoList: action.photos,
                        selectedPhoto: state.selectedPhoto
                  };
            case _albumActions.SET_PHOTO:
                  return {
                        photoList: state.photoList,
                        selectedPhoto: action.selectedPhoto
                  };
            case _albumActions.PHOTO_UPLOADED:
                  return {
                        photoList: state.photoList,
                        selectedPhoto: action.selectedPhoto,
                        uploadState: "uploaded"
                  };
            default:
                  return state;
      }
}
exports.default = albumReducer;

/***/ })
/******/ ]);