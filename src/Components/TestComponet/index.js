// import React, { Component } from 'react';
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
// import SearchInput, { createFilter } from 'react-native-search-filter';

// const emails = [
//     {
//         age: "344",
//         data: "12/12/2019",
//         disease: "Khansi",
//         fatherName: "Sabir Ali",
//         gander: "Male",
//         key: "-LYCHK9bQ9xnAYkc71OB",
//         medication: "noma",
//         name: "Maaz Ahmed",
//     },
//     {
//         age: "34",
//         data: "12/12/2019",
//         disease: "Bukha",
//         fatherName: "Aalam Ali",
//         gander: "Male",
//         key: "-LYCHK9bQ9xnAYkc71OB",
//         medication: "noma",
//         name: "Aslam Khan",
//     }
// ]

// const KEYS_TO_FILTERS = ["age", "date", "disease", "fatherName", "gander" , "medication", "name"];
// export default class Testing extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             searchTerm: ''
//         }
//     }
//     searchUpdated(term) {
//         this.setState({ searchTerm: term })
//     }
//     render() {
//         const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
//         return (
//             <View style={styles.container}>
//                 <SearchInput
//                     onChangeText={(term) => { this.searchUpdated(term) }}
//                     style={styles.searchInput}
//                     placeholder="Type a message to search"
//                 />
//                 <ScrollView>
//                     {filteredEmails.map(email => {
//                         return (
//                             <TouchableOpacity onPress={() => alert(email.name)} key={email.id} style={styles.emailItem}>
//                                 <View>
//                                     <Text>{email.name}</Text>
//                                     <Text style={styles.emailSubject}>{email.subject}</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         )
//                     })}
//                 </ScrollView>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         justifyContent: 'flex-start'
//     },
//     emailItem: {
//         borderBottomWidth: 0.5,
//         borderColor: 'rgba(0,0,0,0.3)',
//         padding: 10
//     },
//     emailSubject: {
//         color: 'rgba(0,0,0,0.5)'
//     },
//     searchInput: {
//         padding: 10,
//         borderColor: '#CCC',
//         borderWidth: 1
//     }
// });








// import React, { Component } from 'react';
// import { AppRegistry, Text, ScrollView } from 'react-native';
// import Ripple from 'react-native-material-ripple';

// let styles = {
//   scroll: {
//     padding: 4,
//     paddingTop: 24,
//     backgroundColor: '#F0F0F4',
//   },

//   container: {
//     padding: 16,
//     backgroundColor: '#F5F5F5',
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     minHeight: 56,
//     margin: 4,
//     borderRadius: 2,
//     elevation: 2,
//     shadowRadius: 2,
//     shadowOpacity: 0.3,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//   },

//   a: {
//     backgroundColor: '#E64A19',
//   },

//   b: {
//     backgroundColor: '#EF6C00',
//   },

//   c: {
//     backgroundColor: '#673AB7',
//   },

//   d: {
//     backgroundColor: '#388E3C',
//   },

//   e: {
//     backgroundColor: '#0288D1',
//   },

//   f: {
//     backgroundColor: '#263238',
//   },

//   g: {
//     backgroundColor: '#5D4037',
//   },

//   z: {
//     elevation: 0,
//     shadowOpacity: 0,
//   },

//   text: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: 'rgba(255,255,255,.87)',
//   },

//   footnote: {
//     fontSize: 15,
//     fontWeight: '400',
//     color: 'rgba(0,0,0,.54)',
//   },
// };

// /*: Ripple border radius should match container border radius */
// Ripple.defaultProps.rippleContainerBorderRadius = styles.container.borderRadius;

//    export default  class Example extends Component {
//     render() {
//       return (
//         <ScrollView style={styles.scroll}>
//           <Ripple style={[styles.container, styles.a]}>
//             <Text style={styles.text}>default</Text>
//           </Ripple>

//           <Ripple style={[styles.container, styles.b]} rippleSize={176} rippleDuration={600}>
//             <Text style={styles.text}>rippleSize=176{'\n'}rippleDuration=600</Text>
//           </Ripple>

//           <Ripple style={[styles.container, styles.c]} rippleSize={244} rippleDuration={800}>
//             <Text style={styles.text}>rippleSize=244{'\n'}rippleDuration=800</Text>
//           </Ripple>

//           <Ripple style={[styles.container, styles.d]} rippleColor='white' rippleOpacity={0.54}>
//             <Text style={styles.text}>rippleColor=#FFFFFF{'\n'}rippleOpacity=0.54</Text>
//           </Ripple>

//           <Ripple style={[styles.container, styles.e]} rippleCentered rippleColor='white'>
//             <Text style={styles.text}>rippleColor=#FFFFFF{'\n'}rippleCentered=true</Text>
//           </Ripple>

//           <Ripple style={[styles.container, styles.f]} rippleColor='#D500F9' rippleOpacity={0.87} rippleDuration={1200}>
//             <Text style={styles.text}>rippleColor=#D500F9{'\n'}rippleOpacity=0.87{'\n'}rippleDuration=1200</Text>
//           </Ripple>

//           <Ripple style={[styles.container, styles.g]} rippleColor='#76FF03' rippleOpacity={0.87} rippleDuration={2400}>
//             <Text style={styles.text}>rippleColor=#76FF03{'\n'}rippleOpacity=0.87{'\n'}rippleDuration=2400</Text>
//           </Ripple>

//           <Ripple disabled style={[styles.container, styles.z]}>
//             <Text style={styles.footnote}>Tap on any card to see surface reaction</Text>
//           </Ripple>
//         </ScrollView>
//       );
//     }
//   }





import React from 'react';
 
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
 
class App extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
 
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
        </Menu>
          <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
      </View>
    );
  }
}
 
export default App;
