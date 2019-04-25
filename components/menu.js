import React from "react";
import styled from "styled-components";
import { Dimensions, Animated, TouchableOpacity } from "react-native";
import { Icon } from "expo";
import { connect } from "react-redux";
import SvgUri from "react-native-svg-uri";

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU"
      })
  };
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class Menu extends React.Component {
  state = {
    left: new Animated.Value(screenHeight)
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.left, {
        toValue: screenWidth - 320
      }).start();
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.left, {
        toValue: screenWidth + 500
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ left: this.state.left }}>
        <Content>
          <TouchableOpacity onPress={this.props.closeMenu}>
            <CloseView>
              <Icon.Ionicons name="ios-close" size={80} color="#545454" />
            </CloseView>
          </TouchableOpacity>
          <Head>1 – tap to copy</Head>
          <Head>2 – paste anywhere</Head>
          <SvgUri
            style={{ marginLeft: 33, marginTop: 85 }}
            source={require("../assets/asciimoji_mark.svg")}
          />
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const CloseView = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-top: 65px;
  margin-bottom: 275px;
`;

const Container = styled.View`
  position: absolute;
  height: ${screenHeight};
  width: ${screenWidth};
  z-index: 100;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Content = styled.View`
  height: ${screenHeight};
  background: rgba(0, 0, 0, 0.95);
`;

const Head = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 275px;
  margin-top: 60px;
  margin-left: 35px;
`;
