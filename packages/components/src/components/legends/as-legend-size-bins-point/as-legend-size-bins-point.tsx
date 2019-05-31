import { Component, Prop } from '@stencil/core';

const MARGIN_OFFSET = 2;

@Component({
  shadow: false,
  styleUrl: './as-legend-size-bins-point.scss',
  tag: 'as-legend-size-bins-point',
})
export class LegendSizeBinsPoint {
  @Prop() public data: LegendData[];
  @Prop() public scale: number = 1;

  private maxSize: number;

  public render() {
    if (!this.data) {
      return null;
    }

    this.maxSize = this.data.slice().sort(
      (first, second) => second.width - first.width
    )[0].width;

    return <div class='as-legend-size-bins-point'>
      {this.data.map((data) => this.renderStep(data))}
    </div>;
  }

  private renderStep(data: LegendData) {
    const size = `${Math.round(data.width)}px`;
    const strokeStyle = `1px ${data.strokeStyle || 'solid'} ${data.strokeColor}`;

    const style: any = {
      backgroundColor: data.color,
      border: strokeStyle,
      height: size,
      width: size,
    };

    const wrapperStyle: any = { };
    wrapperStyle.height = `${this.maxSize + MARGIN_OFFSET}px`;

    return (
      <div class='as-legend-size-bins-point--step'>
        <div style={wrapperStyle} class='as-legend-size-bins-point--circle-wrapper'>
          <div class='as-legend-size-bins-point--circle' style={style}></div>
        </div>
        <span class='as-legend-size-bins-point--label'>{data.label}</span>
      </div>
    );
  }
}
