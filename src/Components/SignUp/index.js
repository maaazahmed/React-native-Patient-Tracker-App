import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions, TouchableOpacity, Alert, ScrollView,
    Easing,
    AsyncStorage, ImageBackground, Animated
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/FontAwesome"
import firebase from "react-native-firebase"
import { connect } from "react-redux"
import { currentUserAction } from "../../store/action/action"
import Btn from 'react-native-micro-animated-button';
// npm install --save react-native-material-ripple



const database = firebase.database().ref("/")
const { width, height } = Dimensions.get("window")
class SignUpComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            username: "",
            errorMessage: "",
            isErroeIcon: true,
            errorAnim: new Animated.Value(0),

        }
    }


    signFaild() {
        const { errorAnim } = this.state;
        Animated.timing(errorAnim, {
            toValue: 1,
            duration: 300,
        }).start()
    }

    signSuccess() {
        const { errorAnim } = this.state;
        Animated.timing(errorAnim, {
            toValue: 0,
            duration: 300,
        }).start(() => {
            Animated.timing(errorAnim, {
                toValue: 1,
                duration: 300,
            }).start()
        })
    }


    signUpHeandler() {
        const { email, password, username } = this.state
        var obj = {
            email,
            password,
            username
        }
        // alert(email + " " + username + " " + password)
        if (email !== "" && password !== "" && username !== "") {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log(res.user._user.uid)
                    database.child(`Users/${res.user._user.uid}`).set(obj).then(() => {
                        obj.id = res.user._user.uid
                        console.log(obj, "OBJ")
                        // ====>>>> Redux 
                        this.props.currentUserAction(obj)
                        this.b1.success()
                        this.signSuccess()
                        this.setState({
                            errorMessage: "Sign up successful !",
                            isErroeIcon:false
                        })
                        setTimeout(() => {
                            this.props.navigation.navigate("Dashboard")
                        }, 1500)
                    })
                }).catch((error) => {
                    var errorMessage = error.message;
                    // Alert.alert(
                    //     "Error",
                    //     errorMessage,
                    //     [
                    //         { text: 'OK', onPress: () => this.b1.reset() },
                    //     ],
                    //     { cancelable: false },
                    // );
                    this.setState({
                        errorMessage
                    })
                    this.signFaild()
                    this.b1.reset()
                })
        }
        else {
            // alert("Requaired  All Feilds")
            // Alert.alert(
            //     'Requaired  All Feilds',
            //     'My Alert Msg',
            //     [
            //         { text: 'OK', onPress: () => this.b1.reset() },
            //     ],
            //     { cancelable: false },
            // );
            this.setState({
                errorMessage: "Requaired  All Feilds"
            })
            this.signFaild()
            this.b1.reset()
        }
    }


    render() {
        const defaultStyle = {
            alignItems: 'center',
            borderRadius: 100,
            borderWidth: 2,
            height: 55,
            justifyContent: 'center',
            marginVertical: 10,

        };
        const {
            email,
            password,
            username,
            errorAnim,
            errorMessage,
            isErroeIcon
        } = this.state
        const eroor_opacity = errorAnim.interpolate({
            inputRange: [0, 0.3, 0.6, 0.8, 1],
            outputRange: [0, 0.3, 0.6, 0.8, 1],
        })
        return (
            <ImageBackground style={{ flex: 1 }} resizeMode={"stretch"} source={require("../../assets/scrubs-steth-iP5.jpg")} >
                <View style={styles.container} >
                    <View style={[styles.signUpbuttonView, {}]} >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('SignInComponent')}
                            activeOpacity={0.7}
                            style={[styles.signUpbutton, {}]} >
                            < Icon name="angle-left" style={styles.signInbuttonIcon} color="#fff" />
                            {/* <View> */}
                            <Text style={styles.signUpbuttonText} >Login Up</Text>
                            {/* </View> */}
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.headingContainer, { justifyContent: "flex-end" }]} >
                        <Text style={styles.headingText} >Sign Up</Text>
                    </View>
                    <View style={styles.inputAndButtonContainer} >
                        <View style={styles.TextInputContainer} >
                            <View style={styles.lableContainer} >
                                <Text style={styles.lableText} >Username</Text>
                            </View>
                            <View style={[styles.lableContainer, styles.TextInputView]} >
                                <TextInput
                                    placeholderTextColor="#fff"
                                    placeholder="username"
                                    value={username}
                                    onChangeText={(username) => { this.setState({ username }) }}
                                    style={styles.TextInput} />
                            </View>
                        </View>

                        <View style={[styles.TextInputContainer, styles.inptSpasificStyle]} >
                            <View style={styles.lableContainer} >
                                <Text style={styles.lableText} >Email</Text>
                            </View>
                            <View style={[styles.lableContainer, styles.TextInputView]} >
                                <TextInput
                                    placeholderTextColor="#fff"
                                    placeholder="Your Email"
                                    value={email}
                                    onChangeText={(email) => { this.setState({ email }) }}
                                    style={styles.TextInput} />
                            </View>
                        </View>
                        <View style={[styles.TextInputContainer, styles.inptSpasificStyle]} >
                            <View style={styles.lableContainer} >
                                <Text style={styles.lableText} >Password</Text>
                            </View>
                            <View style={[styles.lableContainer, styles.TextInputView]} >
                                <TextInput
                                    placeholderTextColor="#fff"
                                    placeholder="Your Password"
                                    value={password}
                                    onChangeText={(password) => { this.setState({ password }) }}
                                    style={styles.TextInput} />
                            </View>
                        </View>
                        <View style={styles.signInbuttonView}  >
                            <Btn
                                foregroundColor={"#fff"}
                                label="SUBMIT"
                                backgroundColor={"transparent"}
                                iconSize={22}
                                maxWidth={350}
                                minWidth={55}
                                noFill={true}
                                labelStyle={{ fontSize: wp("3.5%") }}
                                style={defaultStyle}
                                onPress={this.signUpHeandler.bind(this)}
                                ref={ref => (this.b1 = ref)}
                                successIcon="check"
                            />
                        </View>
                        <Animated.View style={[styles.errorContainer, { opacity: eroor_opacity }]} >
                            <Icon name={isErroeIcon?"exclamation-triangle":"check"} color="#fff" size={20} />
                            <Text style={{
                                color: "#fff", textAlign: "center",
                                fontSize: 17
                            }} >{errorMessage}</Text>
                        </Animated.View>

                    </View>
                </View >
            </ImageBackground>


        );
    }
}
// 399cbb
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(57, 156, 187, 0.8)"
    },
    headingContainer: {
        height: hp("15%"),
        width: wp("100%"),
        // backgroundColor: "green"
    },
    inputAndButtonContainer: {
        // height: hp("50%"),
        flex: 1,
        width: wp("100%"),
        alignItems: "center",
        // backgroundColor: "red",
        justifyContent: "center"
    },
    FBandGOOGLEbuttonContainer: {
        height: hp("10%"),
        width: wp("100%"),
        // backgroundColor: "blue",
        justifyContent: "center"
    },
    // signUpbuttonContaier: {
    //     // flex: 1,
    //     height: hp("35%"),
    //     width: wp("100%"),
    //     // backgroundColor: "yellow",
    //     alignItems: "center",
    //     justifyContent: "flex-end",
    //     paddingBottom: hp("5%")
    // },
    errorContainer: {
        height: "5%",
        width: 350,
        marginTop: "7%",
        justifyContent: "center",
        alignItems: "center",
    },
    headingText: {
        color: "#fff",
        fontSize: wp("5%"),
        fontWeight: "500",
        alignSelf: "center"
    },
    TextInputContainer: {
        width: wp("70%")
    },
    lableContainer: {
        // paddingLeft: 5,
        width: wp("70%")
    },
    lableText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500"
    },
    inptSpasificStyle: {
        marginTop: wp("5%")
    },
    TextInputView: {
        marginTop: hp("0%")
    },
    TextInput: {
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        color: "#fff",
        fontSize: 17,
        paddingLeft: 0
    },
    signInbuttonView: {
        marginTop: hp("4%"),
        // backgroundColor:"red",
    },
    signInbutton: {
        height: hp("6%"),
        width: wp("70%"),
        backgroundColor: "#fff",
        borderRadius: width,
        justifyContent: "center"
    },
    signInbuttonText: {
        alignSelf: "center",
        fontSize: wp("4%"),
        color: "#399cbb"
    },
    FBandGOOGLEbuttonContent: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: wp("30%"), alignSelf: "center"
    },
    FBandGOOGLEbutton: {
        height: hp("5%"),
        width: hp("5%"),
        borderColor: "#fff",
        borderRadius: width,
        borderWidth: 1,
        justifyContent: "center",
    },
    FBandGOOGLEIcon: {
        alignSelf: "center",
        fontSize: 20
    },
    // NotmemberyetText: {
    //     fontSize: 17,
    //     color: "#fff"
    // },

    signUpbuttonView: {
        // marginTop: hp("10%"),
        // backgroundColor: "gray",
        height: hp("10%"),
        alignItems: "center",
        alignSelf: "flex-start",
        justifyContent: "center",
        padding: 5

    },
    signUpbutton: {
        height: hp("6%"),
        width: wp("25%"),
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    signUpbuttonText: {
        alignSelf: "center",
        fontSize: wp("4%"),
        color: "#fff",
        fontWeight: "bold",
    },
    signInbuttonIcon: {
        fontSize: 40,
        alignSelf: "center",

    }

});


const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        currentUserAction: (data) => {
            dispatch(currentUserAction(data))
        },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(SignUpComponent)

