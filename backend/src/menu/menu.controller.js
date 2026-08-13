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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let MenuController = (() => {
    let _classDecorators = [(0, common_1.Controller)('menu')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getAllItems_decorators;
    let _getItem_decorators;
    let _createItem_decorators;
    let _updateItem_decorators;
    let _deleteItem_decorators;
    var MenuController = _classThis = class {
        constructor(menuService) {
            this.menuService = (__runInitializers(this, _instanceExtraInitializers), menuService);
        }
        async getAllItems() {
            return this.menuService.getAllItems();
        }
        async getItem(id) {
            return this.menuService.getItem(id);
        }
        async createItem(createMenuItemDto) {
            return this.menuService.createItem(createMenuItemDto);
        }
        async updateItem(id, updateMenuItemDto) {
            return this.menuService.updateItem(id, updateMenuItemDto);
        }
        async deleteItem(id) {
            return this.menuService.deleteItem(id);
        }
    };
    __setFunctionName(_classThis, "MenuController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllItems_decorators = [(0, common_1.Get)()];
        _getItem_decorators = [(0, common_1.Get)(':id')];
        _createItem_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Post)()];
        _updateItem_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Put)(':id')];
        _deleteItem_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Delete)(':id')];
        __esDecorate(_classThis, null, _getAllItems_decorators, { kind: "method", name: "getAllItems", static: false, private: false, access: { has: obj => "getAllItems" in obj, get: obj => obj.getAllItems }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getItem_decorators, { kind: "method", name: "getItem", static: false, private: false, access: { has: obj => "getItem" in obj, get: obj => obj.getItem }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createItem_decorators, { kind: "method", name: "createItem", static: false, private: false, access: { has: obj => "createItem" in obj, get: obj => obj.createItem }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateItem_decorators, { kind: "method", name: "updateItem", static: false, private: false, access: { has: obj => "updateItem" in obj, get: obj => obj.updateItem }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteItem_decorators, { kind: "method", name: "deleteItem", static: false, private: false, access: { has: obj => "deleteItem" in obj, get: obj => obj.deleteItem }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MenuController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MenuController = _classThis;
})();
exports.MenuController = MenuController;
