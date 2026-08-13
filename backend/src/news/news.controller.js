"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let NewsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('news')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getActiveSources_decorators;
    let _getAllSources_decorators;
    let _getSourceById_decorators;
    let _createSource_decorators;
    let _updateSource_decorators;
    let _deleteSource_decorators;
    let _getAllNews_decorators;
    let _getNewsBySourceId_decorators;
    var NewsController = _classThis = class {
        constructor(newsService) {
            this.newsService = (__runInitializers(this, _instanceExtraInitializers), newsService);
        }
        async getActiveSources() {
            return this.newsService.getActiveSources();
        }
        async getAllSources() {
            return this.newsService.getAllSources();
        }
        async getSourceById(id) {
            return this.newsService.getSourceById(id);
        }
        async createSource(createNewsSourceDto) {
            return this.newsService.createSource(createNewsSourceDto);
        }
        async updateSource(id, updateNewsSourceDto) {
            return this.newsService.updateSource(id, updateNewsSourceDto);
        }
        async deleteSource(id) {
            return this.newsService.deleteSource(id);
        }
        async getAllNews(limit) {
            return this.newsService.getAllNews(limit ? parseInt(limit) : 50);
        }
        async getNewsBySourceId(sourceId, limit) {
            return this.newsService.getNewsBySourceId(sourceId, limit ? parseInt(limit) : 20);
        }
    };
    __setFunctionName(_classThis, "NewsController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getActiveSources_decorators = [(0, common_1.Get)('sources/active')];
        _getAllSources_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Get)('sources')];
        _getSourceById_decorators = [(0, common_1.Get)('sources/:id')];
        _createSource_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Post)('sources')];
        _updateSource_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Put)('sources/:id')];
        _deleteSource_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Delete)('sources/:id')];
        _getAllNews_decorators = [(0, common_1.Get)()];
        _getNewsBySourceId_decorators = [(0, common_1.Get)('source/:sourceId')];
        __esDecorate(_classThis, null, _getActiveSources_decorators, { kind: "method", name: "getActiveSources", static: false, private: false, access: { has: obj => "getActiveSources" in obj, get: obj => obj.getActiveSources }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllSources_decorators, { kind: "method", name: "getAllSources", static: false, private: false, access: { has: obj => "getAllSources" in obj, get: obj => obj.getAllSources }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSourceById_decorators, { kind: "method", name: "getSourceById", static: false, private: false, access: { has: obj => "getSourceById" in obj, get: obj => obj.getSourceById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createSource_decorators, { kind: "method", name: "createSource", static: false, private: false, access: { has: obj => "createSource" in obj, get: obj => obj.createSource }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateSource_decorators, { kind: "method", name: "updateSource", static: false, private: false, access: { has: obj => "updateSource" in obj, get: obj => obj.updateSource }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteSource_decorators, { kind: "method", name: "deleteSource", static: false, private: false, access: { has: obj => "deleteSource" in obj, get: obj => obj.deleteSource }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllNews_decorators, { kind: "method", name: "getAllNews", static: false, private: false, access: { has: obj => "getAllNews" in obj, get: obj => obj.getAllNews }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getNewsBySourceId_decorators, { kind: "method", name: "getNewsBySourceId", static: false, private: false, access: { has: obj => "getNewsBySourceId" in obj, get: obj => obj.getNewsBySourceId }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NewsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NewsController = _classThis;
})();
exports.NewsController = NewsController;
