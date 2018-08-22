import React from 'react';
import {
  Animated,
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet
} from 'react-native';
import { deviceDimension } from './config/dimensions';
import PropTypes from 'prop-types';

export default class animatedPopup extends React.Component {
  animatedValue = new Animated.Value( deviceDimension.width );
  
  _onShow = () => this._fireAnimation(false);
  
  _onDismiss = close => () => this._fireAnimation(true, close);
  
  _fireAnimation = (closing, callback) => {
    Animated.timing(this.animatedValue, {
      toValue: (!closing ? 0 : deviceDimension.width),
      duration: 100
    }).start(() => { callback && callback() });
  };
  
  render() {
    const {
      animateFrom,
      visible,
      close,
      children
    } = this.props;
  
    const animatingStyle = {
      ['margin' + animateFrom]: this.animatedValue
    };
    
    return (
      <Modal
        transparent = {true}
        visible     = {visible}
        onShow      = {this._onShow}>
        
        <TouchableWithoutFeedback onPress={this._onDismiss(close)}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        
        <Animated.View
          pointerEvents='box-none'
          style={[
            styles.popupContainer,
            animatingStyle
          ]}>
          {children}
        </Animated.View>
        
      </Modal>        
    );
    
  }
}


const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.2
  },
  
  popupContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { height: 2 }
  }
});


animatedPopup.PropTypes = {
  animatedFrom: PropTypes.oneOf(['Left', 'Right'),
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

animatedPopup.defaultProps = {
  animatedFrom: 'Left'
};
