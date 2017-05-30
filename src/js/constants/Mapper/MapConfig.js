import AppDefaults from '../AppDefaults';

class Config {

    constructor(rgb, alpha, alphaRange, strokeColor, outlineColor) {
        this.rgb = rgb;
        this.alpha = alpha;
        this.alphaRange = alphaRange;
        this.strokeColor = strokeColor;
        this.outlineColor = outlineColor;
        this.rgba = 'rgba(%rgb, %alpha)';
    }

    setRgb(newRgb) {
        this.rgb = newRgb;
    }

    setAlpha(newAlpha) {
        this.alpha = newAlpha;
    }

    setAlphaRange(newAlphaRange) {
        this.alphaRange = newAlphaRange;
    }

    setStrokeColor(newStrokeColor) {
        this.strokeColor = newStrokeColor;
    }

    setOutlineColor(newOutlineColor) {
        this.outlineColor = newOutlineColor;
    }

    fill(generize = false) {
        const rgbFormat = this.rgb.join(', ');
        const colorFormat = this.rgba.replace('%rgb', rgbFormat);
        return generize ? colorFormat : colorFormat.replace('%alpha', this.alpha);
    }

    stroke(generize = false) {
        const strokeFormat = this.strokeColor.join(', ');
        const colorFormat = this.rgba.replace('%strokeColor', strokeFormat);
        return generize ? colorFormat : colorFormat.replace('%alpha', this.alpha);
    }

    outline(generize = false) {
        const outlineFormat = this.outlineColor.join(', ');
        const colorFormat = this.rgba.replace('%outlineColor', outlineFormat);
        return generize ? colorFormat : colorFormat.replace('%alpha', this.alpha);
    }

}

export default new Config(AppDefaults.rgb, AppDefaults.alpha, AppDefaults.strokeColor, AppDefaults.outlineColor);
