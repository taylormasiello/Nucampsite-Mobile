import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";

class Contact extends Component {
  static navigationOptions = {
    title: "Contact Us",
  };

  render() {
    return (
      <ScrollView>
        <Card title="Contact Information" wrapperStyle={{ margin: 20 }}>
          <Text style={{ margin: 10 }}>
            {`1 Nucamp Way\nSeattle, WA 98001\nU.S.A.`}
          </Text>
          <Text style={{ margin: 10 }}>
            {`Phone: 1-206-555-1234\nEmail: campsites@nucamp.co`}
          </Text>
        </Card>
      </ScrollView>
    );
  }
}

export default Contact;
