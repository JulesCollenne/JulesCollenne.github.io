declare module "react-plotly.js" {
  import * as React from "react";

  interface PlotParams {
    data: any[];
    layout?: any;
    config?: any;
    style?: React.CSSProperties;
    onClick?: (event: any) => void;
    onHover?: (event: any) => void;
    onUnhover?: (event: any) => void;
    ref?: React.Ref<any>;
  }

  export default class Plot extends React.Component<PlotParams> {}
}

