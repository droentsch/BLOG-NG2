"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HelloWorldComponent = (function () {
    function HelloWorldComponent() {
        this.user = "World";
    }
    return HelloWorldComponent;
}());
HelloWorldComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        template: "\n      <h3>Hello {{ user }}!</h3>\n      <img src='../img/smiley.jpg'>\n    ",
        styles: ["\n      h3 {\n          display:inline-block;\n          margin-top:15em;\n      }\n    "],
    }),
    __metadata("design:paramtypes", [])
], HelloWorldComponent);
exports.HelloWorldComponent = HelloWorldComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGVsbG93b3JsZC9oZWxsby13b3JsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNkQ7QUFnQjdELElBQWEsbUJBQW1CO0lBRTVCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFMWSxtQkFBbUI7SUFiL0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsK0VBR1Q7UUFDRCxNQUFNLEVBQUUsQ0FBQywwRkFLUixDQUFDO0tBQ0wsQ0FBQzs7R0FDVyxtQkFBbUIsQ0FLL0I7QUFMWSxrREFBbUIiLCJmaWxlIjoic3JjL2FwcC9oZWxsb3dvcmxkL2hlbGxvLXdvcmxkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJ2hlbGxvLXdvcmxkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnaGVsbG8td29ybGQuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkQ29tcG9uZW50ICB7XG4gICAgcHVibGljIHVzZXI6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51c2VyID0gXCJXb3JsZFwiO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii4ifQ==
