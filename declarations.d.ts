declare module '*.png' {
  const source: number;
  export default source;
}

declare module '*.mp4' {
  const source: number;
  export default source;
}

declare module '*.svg' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}
