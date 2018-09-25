import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList } from "react-native";

// Hack: To detect that it is at the end.
const LastElementHash = { hash: "XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT" };

// Just a place holder element
const DefaultRenderEndComponent = () => {
  return (
    <View style={{ paddingVertical: 15 }}>
      <Text style={{ textAlign: "center" }}>End of list</Text>
    </View>
  );
};

class FlatListWithEnd extends React.Component {
  render() {
    // Clone the array
    const data = this.props.data.slice(0);
    data.push(LastElementHash);

    /**
     * A new renderItem function to replace the default
     * Basically, we check if the item is the last element we manually pushed in earlier
     * If so, we render the EndComponent
     *
     * @param {any}        {item} Same as from FlatList
     * @returns {Function} A function which returns a React Component.
     */
    const renderItem = ({ item, index }) => {
      if (item.hash === LastElementHash.hash) {
        return this.props.renderEndComponent();
      }
      return this.props.renderItem({ item, index });
    };
    const mutatedProps = {
      data,
      renderItem
    };

    return <FlatList {...mutatedProps} />;
  }
}

FlatListWithEnd.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  renderItem: PropTypes.func.isRequired,
  renderEndComponent: PropTypes.func
};

FlatListWithEnd.defaultProps = {
  renderEndComponent: DefaultRenderEndComponent
};

export default FlatListWithEnd;
