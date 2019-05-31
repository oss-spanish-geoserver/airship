import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-color-continuous-point.scss',
  tag: 'as-legend-color-continuous-point',
})
export class LegendColorCategoryPoint {
  @Prop() public label: string;
  @Prop() public color: string;
  @Prop() public strokeColor: string;
  @Prop() public strokeStyle: string;
  @Prop() public marker: string;
  @Prop() public width: number = 16;

  public render() {
    const classes = {
      'as-legend-color-continuous-point--point': !this.marker,
      'as-legend-color-continuous-point--symbol': true
    };

    return (
      <div class='as-legend-color-continuous-point--wrapper'>
        <div class='as-legend-color-continuous--figure--wrapper'>
          <div class={classes} style={this.getStyle()}></div>
        </div>
        <span class='as-legend-color-continuous--label'>{this.label}</span>
      </div>
    );
  }

  private getStyle() {
    return {
      backgroundColor: this.color,
      border: `1px ${this.strokeStyle || 'solid'} ${this.strokeColor}`,
      ...this.getWidth(),
      ...this.getMask()
    };
  }

  private getWidth() {
    if (!this.width) {
      return {};
    }

    return {
      height: `${this.width + 2}px`,
      width: `${this.width + 2}px`
    };
  }

  private getMask() {
    if (!this.marker) {
      return {};
    }

    return {
      '-webkit-mask-image': `url(${this.marker})`,
      '-webkit-mask-position': 'center',
      '-webkit-mask-repeat': 'no-repeat',
      '-webkit-mask-size': `${this.width}px`,
      'maskImage': `url(${this.marker})`,
      'maskPosition': 'center',
      'maskRepeat': 'no-repeat',
      'maskSize': `${this.width}px`
    };
  }
}
