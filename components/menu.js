import React from "react";
import styled from "styled-components/native";
import { Dimensions, Animated, TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";
import { connect } from "react-redux";

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
              <Icon.MaterialIcons name="close" size={60} color="#545454" />
            </CloseView>
          </TouchableOpacity>
          <Head>1 – tap to copy</Head>
          <Head>2 – paste anywhere</Head>
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
  justify-content: flex-start;
  align-items: flex-end;
  margin-left: 250px;
  margin-top: 55px;
  margin-bottom: 275px;
`;

const Container = styled.View`
  position: absolute;
  height: ${screenHeight};
  width: ${screenWidth};
  z-index: 100;
  box-shadow: -10px 5px 40px rgba(0, 0, 0, .80);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Content = styled.View`
  height: ${screenHeight};
  width: ${screenWidth};
  background: rgba(0, 0, 0, 1);
`;

const Head = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 500;
  width: 275px;
  margin-top: 10%;
  margin-left: 30px;
`;
