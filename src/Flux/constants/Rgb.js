var Rgb = (function() {
               var Rgb = function(rgb) {
                   if (rgb) {
                       var result = /^rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)$/i.exec(rgb);
                       this.r = Number(result[1]);
                       this.g = Number(result[2]);
                       this.b = Number(result[3]);
                   } else {
                       this.r = 255;
                       this.g = 255;
                       this.b = 255;
                   }
               };
               return Rgb;
           })();
Rgb.prototype.setR = function(num) {
    if (Math.round(num) === num) {
        if (num >= 0 && num <= 255) {
            this.r = num;
        } else if (num >= 0) {
            this.r = 255;
        } else {
            this.r = 0;
        }
    }
};
Rgb.prototype.setG = function(num) {
    if (Math.round(num) === num) {
        if (num >= 0 && num <= 255) {
            this.g = num;
        } else if (num >= 0) {
            this.g = 255;
        } else {
            this.g = 0;
        }
    }
};
Rgb.prototype.setB = function(num) {
    if (Math.round(num) === num) {
        if (num >= 0 && num <= 255) {
            this.b = num;
        } else if (num >= 0) {
            this.b = 255;
        } else {
            this.b = 0;
        }
    }
};
Rgb.prototype.setRgb = function(numR, numG, numB) {
    this.setR(numR);
    this.setG(numG);
    this.setB(numB);
};
Rgb.prototype.getRgb = function() {
    return [ this.r, this.g, this.b ];
};
Rgb.prototype.setHsl = function(numH, numS, numL) {
    var max,min;
    var rgb = { r: 0, g: 0, b: 0 };
    if (numH == 360) { numH = 0; }
    if (numL <= 49) {
        max = 2.55 * (numL + numL * (numS / 100));
        min = 2.55 * (numL - numL * (numS / 100));
    } else {
        max = 2.55 * (numL + (100 - numL) * (numS / 100));
        min = 2.55 * (numL - (100 - numL) * (numS / 100));
    }
    if (numH < 60) {
        rgb.r = max;
        rgb.g = min + (max - min) * (numH / 60) ;
        rgb.b = min;
    } else if (numH >= 60 &&  numH < 120) {
        rgb.r = min + (max - min) * ((120 - numH) / 60);
        rgb.g = max ;
        rgb.b = min;
    } else if (numH >= 120 &&  numH < 180) {
        rgb.r = min;
        rgb.g = max ;
        rgb.b = min + (max - min) * ((numH - 120) / 60);
    } else if (numH >= 180 &&  numH < 240) {
        rgb.r = min;
        rgb.g = min + (max - min) * ((240 - numH) / 60);
        rgb.b = max;
    } else if (numH >= 240 &&  numH < 300) {
        rgb.r = min + (max - min) * ((numH - 240) / 60);
        rgb.g = min;
        rgb.b = max;
    } else if (numH >= 300 &&  numH < 360) {
        rgb.r = max;
        rgb.g = min;
        rgb.b = min + (max - min) * ((360 - numH) / 60);
    }

    this.setRgb(Math.round(rgb.r), Math.round(rgb.g), Math.round(rgb.b));
};
Rgb.prototype.toString = function() {
    return 'rgb(' + String(this.r) + ' ,' + String(this.g) + ' ,' + String(this.b) + ')';
};

module.exports = Rgb;
