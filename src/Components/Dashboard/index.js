import React, { Component } from 'react';
import {
    Container, Header,
    Left, Body,
    Right, Button,
    Icon, Title,
    Item, Input,
    Radio, Spinner
} from 'native-base';
import {
    Text, View,
    Modal, TouchableOpacity,
    StyleSheet, TextInput,
    FlatList, Dimensions,
    Image,

} from "react-native"
import firebase from "react-native-firebase"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from "react-redux";
import SearchInput, { createFilter } from 'react-native-search-filter';
import Ripple from 'react-native-material-ripple';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icons from "react-native-vector-icons/FontAwesome"



import { patienstAction, currentPatienstAction, clearStoreAction } from "../../store/action/action"


const KEYS_TO_FILTERS = ["age", "date", "disease", "fatherName", "gander", "medication", "name"];

const { width, height } = Dimensions.get("window")
const database = firebase.database().ref("/")
class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            isSearching: false,
            modalVisible: false,
            dilogeVisible: false,
            searchTerm: '',
            searchingValue: "",
            name: "",
            fatherName: "",
            age: "",
            date: "",
            disease: "",
            medication: "",
            gander: "",
            female: false,
            male: false,
            isLoader: true,
            isLogoutLoader: false
        }
    }
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }
    componentDidMount() {
        const currentUserId = this.props.currentUser.currentUser.id
        // console.log(currentUserId)
        database.child(`patients/${this.props.currentUser.currentUser.id}/`).on("value", (snap) => {
            const arr = []
            const obj = snap.val()
            for (key in obj) {
                arr.push({ ...obj[key], key })
            }
            this.props.patienstAction(arr)
            setTimeout(() => {
                this.setState({
                    isLoader: false
                })
            }, 1500)
        })
    }

    ganderSelect(type) {
        if (type === "Male") {
            this.setState({
                male: true,
                female: false,
                gander: type
            })
        }
        else {
            this.setState({
                male: false,
                female: true,
                gander: type
            })
        }
    }


    _onSubmit() {
        const {
            name,
            fatherName,
            age,
            date,
            disease,
            medication,
            gander,
        } = this.state
        const project = {
            name,
            fatherName,
            age,
            date,
            disease,
            medication,
            gander,
        }
        const currentUserId = this.props.currentUser.currentUser.id
        database.child(`patients/${currentUserId}/`).push(project)
        this.setState({ modalVisible: false })
    }

    patientView(data) {
        this.props.currentPatienstAction(data)
        this.props.navigation.navigate('Details')
    }
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

    logOut() {
        firebase.auth().signOut().then(() => {
            setTimeout(() => {
                this.setState({
                })
                this.props.navigation.navigate('SignInComponent')
            }, 1000)
        }).catch(() => {
            console.log("Fail")
        })
    }
    patientView



    render() {
        const {
            isSearching,
            modalVisible,
            searchingValue,
            dilogeVisible,
            name,
            fatherName,
            age,
            date,
            disease,
            medication,
            gander,
            female,
            male,
            isLoader,
            isLogoutLoader
        } = this.state;
        let patienst = this.props.patients.patienst
        const currentUser = this.props.currentUser.currentUser
        const filteredData = patienst.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (

            <Container>
                {(isSearching) ?
                    <Header style={styles.header} searchBar rounded>
                        <Item>
                            <Icon style={styles.iconStyle} name="ios-search" />
                            <Input
                                onChangeText={(term) => { this.searchUpdated(term) }}
                                style={styles.searchInput}
                                placeholderTextColor={"#399cbb"}
                                style={styles.iconStyle} placeholder="Search" />
                            <Button onPress={() => { this.setState({ isSearching: false }) }} transparent>
                                <Icon style={styles.iconStyle} name="close" />
                            </Button>
                        </Item>
                        <Button transparent>
                            <Text>Search</Text>
                        </Button>
                    </Header>
                    :
                    <Header style={styles.header} >
                        {/* <Left>
                            <Button transparent>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left> */}
                        <Body>
                            <Title>{currentUser.username}</Title>
                        </Body>
                        <Right>
                            <Button onPress={() => this.setState({ isSearching: true })} transparent>
                                <Icon name='search' />
                            </Button>
                            <Button onPress={() => this.setState({ modalVisible: true })} transparent>
                                <Icon name='add' />
                            </Button>

                            <Button transparent onPress={this.logOut.bind(this)} >
                                <Image style={{ height: 18, width: 18 }} resizeMode={"stretch"} source={require("../../assets/logout.png")} />
                            </Button>

                            {/* <Button onPress={this.showMenu} transparent>
                                <Menu
                                    ref={this.setMenuRef}
                                    button={<Icon name='more' />}>
                                    <MenuItem onPress={this.hideMenu}>Profile</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onPress={this.hideMenu}>Sign Out</MenuItem>
                                </Menu>
                            </Button> */}
                        </Right>
                    </Header>
                }
                {(isLoader) ?
                    <View style={styles.LoaderContainer} >
                        <Spinner width={1} color='#399cbb' />
                    </View>
                    :
                    <View style={styles.container} >
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                // Alert.alert('Modal has been closed.');
                            }}>
                            <View style={styles.modalContaier}>
                                <View style={{ backgroundColor: "#fff", justifyContent: "space-around", width: wp("90%"), alignItems: "center", height: hp("70%") }} >
                                    <View style={styles.modalContent} >
                                        <View style={[styles.inputRow]} >
                                            <View style={{ width: "48.5%", }} >
                                                {/* <Text style={{ fontSize: 16, fontWeight: "bold", color: "#399cbb" }}  >Patient name</Text> */}
                                                <TextInput
                                                    underlineColorAndroid={"transparent"}
                                                    placeholder="Patient name"
                                                    value={name}
                                                    onChangeText={(name) => { this.setState({ name }) }}
                                                    placeholderTextColor="#399cbb"
                                                    style={styles.TextInput} />
                                            </View>
                                            <View style={{ width: "48.5%", }} >
                                                {/* <Text style={{ fontSize: 16, fontWeight: "bold", color: "#399cbb" }}  >Patient name</Text> */}
                                                <TextInput
                                                    underlineColorAndroid={"transparent"}
                                                    placeholder="Father's name"
                                                    placeholderTextColor="#399cbb"
                                                    value={fatherName}
                                                    onChangeText={(fatherName) => { this.setState({ fatherName }) }}
                                                    style={styles.TextInput} />
                                            </View>
                                        </View>

                                        <View style={styles.inputRow} >
                                            <View style={styles.TextInputView} >
                                                {/* <Text style={{ fontSize: 16, fontWeight: "bold", color: "#399cbb" }}  >Patient name</Text> */}
                                                <TextInput
                                                    underlineColorAndroid={"transparent"}
                                                    placeholder="Age"
                                                    placeholderTextColor="#399cbb"
                                                    value={age}
                                                    onChangeText={(age) => { this.setState({ age }) }}
                                                    style={styles.TextInput} />
                                            </View>

                                        </View>

                                        <View style={styles.inputRow} >
                                            <View style={styles.TextInputView} >
                                                {/* <Text style={{ fontSize: 16, fontWeight: "bold", color: "#399cbb" }}  >Patient name</Text> */}
                                                <TextInput
                                                    underlineColorAndroid={"transparent"}
                                                    placeholder="Date"
                                                    value={date}
                                                    onChangeText={(date) => { this.setState({ date }) }}
                                                    placeholderTextColor="#399cbb"
                                                    style={styles.TextInput} />
                                            </View>

                                        </View>
                                        <View style={styles.inputRow} >
                                            <View style={styles.TextInputView} >
                                                {/* <Text style={{ fontSize: 16, fontWeight: "bold", color: "#399cbb" }}  >Patient name</Text> */}
                                                <TextInput
                                                    underlineColorAndroid={"transparent"}
                                                    placeholder="Disease"
                                                    value={disease}
                                                    onChangeText={(disease) => { this.setState({ disease }) }}
                                                    placeholderTextColor="#399cbb"
                                                    style={styles.TextInput} />
                                            </View>
                                        </View>

                                        <View style={styles.inputRow} >
                                            <View style={styles.TextInputView} >
                                                {/* <Text style={{ fontSize: 16, fontWeight: "bold", color: "#399cbb" }}  >Patient name</Text> */}
                                                <TextInput
                                                    underlineColorAndroid={"transparent"}
                                                    placeholder="medication"
                                                    placeholderTextColor="#399cbb"
                                                    value={medication}
                                                    onChangeText={(medication) => { this.setState({ medication }) }}
                                                    style={styles.TextInput} />
                                            </View>
                                        </View>
                                        <View style={styles.inputRow} >
                                            <View style={styles.TextInputView} >
                                                <Text style={styles.inputLable}  >Gander: </Text>
                                                <View style={styles.radioContainer} >
                                                    <TouchableOpacity
                                                        onPress={this.ganderSelect.bind(this, "Male")}
                                                        style={styles.radioView} >
                                                        <Text style={styles.ganderTyleStyle} >Male: </Text>
                                                        <Radio
                                                            onPress={this.ganderSelect.bind(this, "Male")}
                                                            selectedColor="#399cbb"
                                                            style={styles.radiobtn}
                                                            selected={male} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={this.ganderSelect.bind(this, "Female")}
                                                        style={[styles.radioView, {}]} >
                                                        <Text style={styles.ganderTyleStyle} onPress={this.ganderSelect.bind(this, "Female")} >Female: </Text>
                                                        <Radio
                                                            onPress={this.ganderSelect.bind(this, "Female")}
                                                            selectedColor="#399cbb"
                                                            style={styles.radiobtn}
                                                            selected={female} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.submitBtn}
                                        onPress={this._onSubmit.bind(this)}>
                                        <Text style={styles.submitText} >SUBMIT</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>

                        <View style={{ padding: 10, flex: 1, backgroundColor: "#f2f2f2" }} >
                            {console.log(filteredData.length, 0, filteredData)}
                            {(filteredData.length > 0) ?
                                <FlatList
                                    data={filteredData}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.flateListContainer} >
                                                <View style={styles.dateContainer} >
                                                    <Text style={styles.simpleText} >{item.date}</Text>
                                                </View>
                                                <View style={styles.nameContainer} >
                                                    <Text style={[styles.simpleText, { fontWeight: "500" }]} >{item.name}</Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                                                        <Text style={styles.simpleText} >{item.disease}</Text>
                                                        <Text style={styles.simpleText} >Age: {item.age}</Text>
                                                    </View>
                                                </View>
                                                <Ripple onPress={this.patientView.bind(this, item)} rippleCentered rippleColor='white'
                                                    style={styles.rippleContainer} >
                                                    <Text style={styles.simpleText} >View</Text>
                                                </Ripple>
                                            </View>
                                        )
                                    }}
                                />
                                :
                                <View style={{ flex: 1, backgroundColor: "#f2f2f2", justifyContent: "center", alignItems: "center" }} >
                                    <Icons name={"warning"} color="#399cbb" size={60} />
                                    <Text style={{ fontSize: 20, marginTop: 10, color: "#399cbb" }} >No Patient</Text>
                                </View>
                            }
                        </View>
                    </View>
                }
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f2f2",
        flex: 1
    },
    header: {
        backgroundColor: "#399cbb",
        elevation: 2,

        height: height / 12,
    },
    iconStyle: {
        color: "#399cbb"
    },
    modalContaier: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .5)"

    },
    modalContent: {
        // width: wp("100%"),
        // height: hp("70%"),
        backgroundColor: "#fff",
        elevation: 5,
        alignItems: "center",
        // justifyContent: "space-around"
    },
    inputRow1: {
        // width: "48.5%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        alignItems: "center"
    },

    inputRow: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        alignItems: "center"
    },

    TextInput: {
        height: hp("6%"),
        borderBottomColor: "#399cbb",
        borderBottomWidth: 2,
        color: "#399cbb",
        fontSize: 17,
        paddingLeft: 3,
    },
    TextInputView: {
        width: "100%",
    },
    inputLable: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#399cbb"
    },
    radioContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-around",
        width: "50%"
    },
    radioView: {
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: wp("10%"),
        marginTop: hp("1%")
    },
    ganderTyleStyle: {
        fontSize: 17,
        color: "#399cbb",
    },
    radiobtn: {
        marginLeft: 10
    },
    submitBtn: {
        height: hp("4%"),
        backgroundColor: "#399cbb",
        width: wp("30%"),
        justifyContent: "center",
        alignItems: "center",
    },
    submitText: {
        fontSize: 16,
        color: "#fff"
    },
    flateListContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        height: height / 11,
        backgroundColor: "#399cbb",
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 2,
        elevation: 2,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    dateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center", borderRightColor: "#fff",
        borderRightWidth: 1
    },
    simpleText: {
        color: "#fff",
        fontSize: 16,
    },
    nameContainer: {
        flex: 2,
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        borderRightColor: "#fff",
        borderRightWidth: 1
    },
    rippleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    LoaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }


})




const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        patients: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        patienstAction: (data) => {
            dispatch(patienstAction(data))
        },
        currentPatienstAction: (data) => {
            dispatch(currentPatienstAction(data))
        },
        clearStoreAction: (data) => {
            dispatch(clearStoreAction(data))
        },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(Dashboard)
