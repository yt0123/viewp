import AppDefaults from '../AppDefaults';
import LogManager from '../Logger';

class Config {

    constructor(rgb, alphaRange, strokeColor, textScale, outlineColor) {
        this.rgb = rgb;
        this.alpha = (alphaRange[0] + alphaRange[1]) / 2.0;
        this.alphaRange = alphaRange;
        this.strokeColor = strokeColor;
        this.textScale = textScale;
        this.outlineColor = outlineColor;
        this.rgba = 'rgba(%rgb, %alpha)';
        this.logger = LogManager.getLogger('ty.edelweiss.viewp.Config');
    }

    setRgb(newRgb) {
        this.rgb = newRgb;
        this.logger.log('Map config data replace rgb to ' + newRgb.join(', '));
        return this;
    }

    setAlphaRange(newAlphaRange) {
        this.alpha = (newAlphaRange[0] + newAlphaRange[1]) / 2.0;
        this.alphaRange = newAlphaRange;
        this.logger.log('Map config data replace alpha range to ' + newAlphaRange.join(', '));
        return this;
    }

    setStrokeColor(newStrokeColor) {
        this.strokeColor = newStrokeColor;
        this.logger.log('Map config data replace storoke-color to ' + newStrokeColor.join(', '));
        return this;
    }

    setTextScale(newTextScale) {
        this.textScale = newTextScale;
        this.logger.log('Map config data replace text-scale to ' + newTextScale);
        return this;
    }

    setOutlineColor(newOutlineColor) {
        this.outlineColor = newOutlineColor;
        this.logger.log('Map config data replace outline-color to ' + newOutlineColor.join(', '));
        return this;
    }

    fill(newAlpha = null) {
        let colorFormat = this.rgb.concat([ this.alpha ]);
        if (newAlpha !== null) {
            colorFormat[colorFormat.length-1] = (this.alphaRange[1] * newAlpha) + this.alphaRange[0];
        }
        return colorFormat;
    }

    stroke() {
        return this.strokeColor.concat([ this.alpha ]);
    }

    text() {
        return this.rgb.concat([ 1.0 ]);
    }

    scale() {
        return this.textScale;
    }

    outline() {
        return this.outlineColor.concat([ 1.0 ]);
    }

}

export default new Config(AppDefaults.rgb, AppDefaults.alphaRange, AppDefaults.strokeColor, AppDefaults.textScale, AppDefaults.outlineColor);
