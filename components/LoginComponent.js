import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Input, CheckBox, Button, Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { baseUrl } from "../shared/baseUrl";

class LoginTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      remember: false,
    };
  }

  static navigationOptions = {
    title: "Login",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="sign-in"
        type="font-awesome"
        iconStyle={{ color: tintColor }}
      />
    ),
  };

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }
  }

  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            icon={
              <Icon
                name="sign-in"
                type="font-awesome"
                color="#fff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{ backgroundColor: "#5637DD" }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Register")}
            title="Register"
            type="clear"
            icon={
              <Icon
                name="user-plus"
                type="font-awesome"
                color="blue"
                iconStyle={{ marginRight: 10 }}
              />
            }
            titleStyle={{ color: "blue" }}
          />
        </View>
      </View>
    );
  }
}

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      remember: false,
      imageUrl: baseUrl + "images/logo.png",
    };
  }

  static navigationOptions = {
    title: "Register",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="user-plus"
        type="font-awesome"
        iconStyle={{ color: tintColor }}
      />
    ),
  };

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      const capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        this.setState({ imageUrl: capturedImage.uri });
      }
    }
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require("./images/logo.png")}
              style={styles.image}
            />
            <Button title="Camera" onPress={this.getImageFromCamera} />
          </View>
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
            leftIconContainerStyle={styles.formIcon}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
            leftIconContainerStyle={styles.formIcon}
          />
          <Input
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            containerStyle={styles.formInput}
            leftIconContainerStyle={styles.formIcon}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
            leftIconContainerStyle={styles.formIcon}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-o" }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            containerStyle={styles.formInput}
            leftIconContainerStyle={styles.formIcon}
          />
          <CheckBox
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title="Register"
              icon={
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{ backgroundColor: "#5637DD" }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Login = createBottomTabNavigator(
  {
    Login: LoginTab,
    Register: RegisterTab,
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#5637DD",
      inactiveBackgroundColor: "#CEC8FF",
      activeTintColor: "#fff",
      inactiveTintColor: "#808080",
      labelStyle: { fontSize: 16 },
    },
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 10,
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    padding: 8,
  },
  formCheckbox: {
    margin: 8,
    backgroundColor: null,
  },
  formButton: {
    margin: 20,
    marginRight: 40,
    marginLeft: 40,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default Login;
