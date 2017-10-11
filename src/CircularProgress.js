import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { Surface, Shape, Path, Group } from '../../react-native/Libraries/ART/ReactNativeART';
import MetricsPath from 'art/metrics/path';

export default class CircularProgress extends React.Component {

  circlePath(cx, cy, r, startDegree, endDegree) {

    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1);
    return p;
  }

  extractFill(fill) {
    if (fill < 0.01) {
      return 0;
    } else if (fill > 100) {
      return 100;
    }

    return fill;
  }

  render() {
    const { size, width, tintColor, backgroundColor, style, strokeCap, rotation, cropDegree, children } = this.props;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (360 * 99.9 / 100) - cropDegree);

    const fill = this.extractFill(this.props.fill);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, ((360 * 99.9 / 100) - cropDegree) * fill / 100 );

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}>
          <Group rotation={rotation + cropDegree/2} originX={size/2} originY={size/2}>
            <Shape d={backgroundPath}
                   stroke={backgroundColor}
                   strokeWidth={width}
                   strokeCap={strokeCap}/>
            <Shape d={circlePath}
                   stroke={tintColor}
                   strokeWidth={width}
                   strokeCap={strokeCap}/>
          </Group>
        </Surface>
        {
          children && children(fill)
        }
      </View>
    )
  }
}

CircularProgress.propTypes = {
  style: PropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  strokeCap: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  cropDegree: PropTypes.number,
  children: PropTypes.func
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  cropDegree: 90,
  strokeCap: 'butt',
}
