# react-native-animated-popup
AnimatedPopup Component can be used to open popup window of your choice with animation.

## Example
```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedPopup from './src/animatedPopup';
import LoginButton from './src/components/loginButton';
import LoginForm from './src/components/loginForm';

/**
 * Minimal example showing how to use AnimatedPopup Component.
 */
export default home extends React.Component {
  state = { visible: false };
  
  render() {  
    return (
      <View style={styles.container}>
        <LoginButton
          onPress = {() => { this.setState({ visible: true }) }}
          ...
        />
        <AnimatedPopup
          animateFrom = 'Right'
          visible     = {this.state.visible}
          close       = {() => { this.setState({ visible: false }) }}>

          <LoginForm
            ...
          />

        </AnimatedPopup>
      </View>
    );
  } 

}

...

```

## Use Case
