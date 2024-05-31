declare module "*.svg" {
  import * as React from "react";
  export default content = React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
}
