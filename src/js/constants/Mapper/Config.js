import AppDefaults from '../AppDefaults';
import LogManager from '../Logger';

class Config {

    constructor(rgb, alphaRange, strokeColor, outlineColor) {
        this.rgb = rgb;
        this.alpha = (alphaRange[0] + alphaRange[1]) / 2.0;
        this.alphaRange = alphaRange;
        this.strokeColor = strokeColor;
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
        this.logger.log('Map config data replace storoke-color to ' + newAlpha.join(', '));
        return this;
    }

    setOutlineColor(newOutlineColor) {
        this.outlineColor = newOutlineColor;
        this.logger.log('Map config data replace outline-color to ' + newAlpha.join(', '));
        return this;
    }

    fill() {
        const rgbFormat = this.rgb.join(', ');
        const colorFormat = this.rgba.replace('%rgb', rgbFormat).replace('%alpha', this.alpha);
        return colorFormat;
    }

    stroke() {
        const strokeFormat = this.strokeColor.join(', ');
        const colorFormat = this.rgba.replace('%rgb', strokeFormat).replace('%alpha', this.alpha);
        return colorFormat;
    }

    outline() {
        const outlineFormat = this.outlineColor.join(', ');
        const colorFormat = this.rgba.replace('%rgb', outlineFormat).replace('%alpha', this.alpha);
        return colorFormat;
    }

}

export default new Config(AppDefaults.rgb, AppDefaults.alphaRange, AppDefaults.strokeColor, AppDefaults.outlineColor);
