import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { SwipeRow } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  deleteFavorite: (campsiteId) => deleteFavorite(campsiteId),
};

class Favorites extends Component {
  static navigationOptions = {
    title: "My Favorites",
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderFavoriteItem = ({ item }) => {
      return (
        <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
          <View style={styles.deleteView}>
            <TouchableOpacity
              style={styles.deleteTouchable}
              onPress={() => this.props.deleteFavorite(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ListItem
              title={item.name}
              subtitle={item.description}
              leftAvatar={{ source: { uri: baseUrl + item.image } }}
              onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}
            />
          </View>
        </SwipeRow>
      );
    };

    if (this.props.campsites.isLoading) {
      return <Loading />;
    }
    if (this.props.campsites.errMess) {
      return (
        <View>
          <Text>{this.props.campsites.errMess}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.campsites.campsites.filter((campsite) =>
          this.props.favorites.includes(campsite.id)
        )}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  deleteView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  deleteTouchable: {
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
    width: 100,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
