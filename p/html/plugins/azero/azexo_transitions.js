(function() {
    function mixin(dst, src) {
        var tobj = {};
        for (var x in src) {
            if ((typeof tobj[x] == "undefined") || (tobj[x] != src[x])) {
                dst[x] = src[x];
            }
        }
        if (document.all && !document.isOpera) {
            var p = src.toString;
            if (typeof p == "function" && p != dst.toString && p != tobj.toString &&
                    p != "\nfunction toString() {\n    [native code]\n}\n") {
                dst.toString = src.toString;
            }
        }
        return dst;
    }
    function get_max_zindex(element) {
        var max = 0;
        var computedStyle = getComputedStyle(element);
        var z = computedStyle.getPropertyValue('z-index');
        if (z != '' && z != null) {
            z = parseInt(z, 10);
            if (max < z)
                max = z;
        }
        for (var i = 0; i < element.children.length; i++) {
            var z = get_max_zindex(element.children[i]);
            if (max < z)
                max = z;
        }
        return max;
    }
    function get_inherited_property(element, property) {
        if (element == null) {
            var initial = {
                'background-color': 'white',
                'color': 'black'
            };
            if (property in initial)
                return initial[property];
            else
                return '';
        }
        
        var computedStyle = getComputedStyle(element);
        if (property != 'background-color') {
            return computedStyle.getPropertyValue(property);
        } else {
            var value = computedStyle.getPropertyValue(property);
            if(value == 'transparent')
                return get_inherited_property(element.parentElement, property);
            var match = /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(value);
            if(match) {
                if(parseInt(match[4], 10) == 255)
                    return value;
                else
                    return get_inherited_property(element.parentElement, property);
            } else {
                return value;
            }
        }
    }
    window.azexo_circles = function(element, circles) {
        function complete() {
            element.azexo_circles_completed++;
            if (element.azexo_circles_completed == circles.length) {
                element.removeChild(canvas);
                delete element.azexo_circles_completed;
            }
        }
        if(!('azexo_circles_completed' in element)) {
            var canvas = document.createElement("canvas");
            if(element.children.length > 0)
                element.insertBefore(canvas, element.children[0]);
            else
                element.appendChild(canvas);
            element.style['position'] = 'relative';
            canvas.style['position'] = 'absolute';
            canvas.style['left'] = '0';
            canvas.style['top'] = '0';
            canvas.style['height'] = '100%';
            canvas.style['width'] = '100%';
            canvas.style['z-index'] = get_max_zindex(element) + 1;
            canvas.setAttribute('height', element.clientHeight + 'px');
            canvas.setAttribute('width', element.clientWidth + 'px');
            var outer_radius = Math.sqrt(element.clientHeight * element.clientHeight / 4 + element.clientWidth * element.clientWidth / 4) + 1;
            var inner_radius = Math.min(element.clientHeight, element.clientWidth) / 2 + 1;

            var stage = new createjs.Stage(canvas);

            for (var i = 0; i < circles.length; i++) {
                var options = {
                    inside: false,
                    color: get_inherited_property(element, 'background-color'),
                    compositeOperation: 'source-over',
                    beforeDelay: 0,
                    afterDelay: 0,
                    duration: 1000,
                    ease: 'quintOut',
                    alpha: 1,
                    radius: outer_radius,
                    x: canvas.clientWidth / 2,
                    y: canvas.clientHeight / 2
                }
                var settings = options;
                settings = mixin(settings, circles[i]);
                if (settings['radius'] == 'inner') {
                    settings['radius'] = inner_radius;
                }
                if (settings['radius'] == 'outer') {
                    settings['radius'] = outer_radius;
                }
                if (settings['color'] == 'background-color') {
                    settings['color'] = get_inherited_property(element, 'background-color');
                }
                if (settings['color'] == 'color') {
                    settings['color'] = get_inherited_property(element, 'color');
                }
                if (settings['inside']) {
                    var circle = new createjs.Shape();
                    circle.graphics.beginFill(settings['color']);
                    circle.graphics.drawCircle(0, 0, parseInt(settings['radius'], 10));
                    circle.x = parseInt(settings['x'], 10);
                    circle.y = parseInt(settings['y'], 10);
                    circle.alpha = parseFloat(settings['alpha']);
                    circle.compositeOperation = settings['compositeOperation'];
                    stage.addChild(circle);
                    createjs.Tween.get(circle).to({visible: false}, 0).wait(parseInt(settings['beforeDelay'], 10)).to({visible: true}, 0).to({scaleX: 0, scaleY: 0}, parseInt(settings['duration'], 10), createjs.Ease[settings['ease']]).wait(parseInt(settings['afterDelay'], 10)).to({visible: false}, 0).call(complete);
                } else {
                    var circle = new createjs.Shape();
                    circle.graphics.beginFill(settings['color']);
                    circle.graphics.drawCircle(0, 0, 1);
                    circle.x = parseInt(settings['x'], 10);
                    circle.y = parseInt(settings['y'], 10);
                    circle.alpha = parseFloat(settings['alpha']);
                    circle.compositeOperation = settings['compositeOperation'];
                    stage.addChild(circle);
                    createjs.Tween.get(circle).wait(parseInt(settings['beforeDelay'], 10)).to({scaleX: parseInt(settings['radius'], 10), scaleY: parseInt(settings['radius'], 10)}, parseInt(settings['duration'], 10), createjs.Ease[settings['ease']]).wait(parseInt(settings['afterDelay'], 10)).to({visible: false}, 0).call(complete);
                }
            }
            element.azexo_circles_completed = 0;
            createjs.Ticker.addEventListener("tick", stage);
            return canvas;
        } else {
            return null;
        }
    }   
    window.azexo_planes = function(element, planes) {
        function complete() {
            element.azexo_planes_completed++;
            if (element.azexo_planes_completed == planes.length) {
                element.removeChild(canvas);
                delete element.azexo_planes_completed;
            }
        }
        if(!('azexo_planes_completed' in element)) {
            var canvas = document.createElement("canvas");
            if(element.children.length > 0)
                element.insertBefore(canvas, element.children[0]);
            else
                element.appendChild(canvas);
            element.style['position'] = 'relative';
            canvas.style['position'] = 'absolute';
            canvas.style['left'] = '0';
            canvas.style['top'] = '0';
            canvas.style['height'] = '100%';
            canvas.style['width'] = '100%';
            canvas.style['z-index'] = get_max_zindex(element) + 1;
            canvas.setAttribute('height', element.clientHeight + 'px');
            canvas.setAttribute('width', element.clientWidth + 'px');
            var max_side = Math.max(element.clientHeight, element.clientWidth)*2 + 1;

            var stage = new createjs.Stage(canvas);

            for (var i = 0; i < planes.length; i++) {
                var options = {
                    inside: true,
                    color: get_inherited_property(element, 'background-color'),
                    compositeOperation: 'source-over',
                    beforeDelay: 0,
                    afterDelay: 0,
                    duration: 1000,
                    ease: 'quintOut',
                    alpha: 1,
                    cover: 1,
                    position: 1,
                    rotate: 0
                };
                var settings = options;
                settings = mixin(settings, planes[i]);
                if (settings['color'] == 'background-color') {
                    settings['color'] = get_inherited_property(element, 'background-color');
                }
                if (settings['color'] == 'color') {
                    settings['color'] = get_inherited_property(element, 'color');
                }
                var angle, start_x, start_y, end_x, end_y;
                if (settings['inside']) {
                    angle = 90 - parseInt(settings['rotate'], 10);
                    var rad = angle*Math.PI/180;
                    angle += 180;
                    if((Math.sin(rad) >= 0) && (Math.cos(rad) > 0)) {                        
                        start_x=0;
                        start_y=element.clientHeight;
                        end_x=element.clientWidth;
                        end_y=0;
                    }
                    if((Math.sin(rad) > 0) && (Math.cos(rad) <= 0)) {
                        start_x=0;
                        start_y=0;
                        end_x=element.clientWidth;
                        end_y=element.clientHeight;
                    }
                    if((Math.sin(rad) < 0) && (Math.cos(rad) <= 0)) {
                        start_x=element.clientWidth;
                        start_y=0;
                        end_x=0;
                        end_y=element.clientHeight;
                    }
                    if((Math.sin(rad) <= 0) && (Math.cos(rad) > 0)) {                        
                        start_x=element.clientWidth;
                        start_y=element.clientHeight;
                        end_x=0;
                        end_y=0;                        
                    }
                } else {
                    angle = parseInt(settings['rotate'], 10);
                    var rad = angle*Math.PI/180;
                    angle = 90 - angle;
                    if((Math.sin(rad) >= 0) && (Math.cos(rad) > 0)) {
                        start_x=0;
                        start_y=element.clientHeight;
                        end_x=element.clientWidth;
                        end_y=0;
                    }
                    if((Math.sin(rad) > 0) && (Math.cos(rad) <= 0)) {
                        start_x=element.clientWidth;
                        start_y=element.clientHeight;
                        end_x=0;
                        end_y=0;                        
                    }
                    if((Math.sin(rad) < 0) && (Math.cos(rad) <= 0)) {
                        start_x=element.clientWidth;
                        start_y=0;
                        end_x=0;
                        end_y=element.clientHeight;
                    }
                    if((Math.sin(rad) <= 0) && (Math.cos(rad) > 0)) {                        
                        start_x=0;
                        start_y=0;
                        end_x=element.clientWidth;
                        end_y=element.clientHeight;
                    }
                }
                var plane = new createjs.Shape();
                plane.graphics.beginFill(settings['color']);
                plane.graphics.drawRect(0, 0, max_side, max_side);
                (new createjs.Matrix2D()).translate(start_x, start_y).rotate(angle).translate(-max_side/2, -max_side).decompose(plane);
                var end_mat = {};
                (new createjs.Matrix2D()).translate(end_x, end_y).rotate(angle).translate(-max_side/2, -max_side).decompose(end_mat);

                plane.alpha = parseFloat(settings['alpha']);
                plane.compositeOperation = settings['compositeOperation'];
                stage.addChild(plane);
                createjs.Tween.get(plane).to({visible: false}, 0).wait(parseInt(settings['beforeDelay'], 10)).to({visible: true}, 0).to({x: end_mat.x, y: end_mat.y}, parseInt(settings['duration'], 10), createjs.Ease[settings['ease']]).wait(parseInt(settings['afterDelay'], 10)).to({visible: false}, 0).call(complete);
            }
            element.azexo_planes_completed = 0;
            createjs.Ticker.addEventListener("tick", stage);
            return canvas;
        } else {
            return null;
        }
    }   
}());