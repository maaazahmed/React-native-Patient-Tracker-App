import React, { Component } from 'react';
import Icon from "react-native-vector-icons/FontAwesome"
import firebase from "react-native-firebase"
import { connect } from "react-redux"
import { currentUserAction } from "../../store/action/action"
import Btn from 'react-native-micro-animated-button';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Alert,
    Image,
    Animated,
    Easing
} from 'react-native';



const database = firebase.database().ref("/")
const { width } = Dimensions.get("window")



class SignInComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            logPosition: new Animated.Value(0),
            opacity: new Animated.Value(0),
            logSize: new Animated.Value(0),
            errorAnim: new Animated.Value(0),
        }
    }



    animateion() {
        const { logPosition, opacity, logSize } = this.state
        const position = Animated.timing(logPosition, {
            toValue: 1,
            duration: 500
        })
        const _opacity = Animated.timing(opacity, {
            toValue: 1,
            duration: 1000
        })
        const _logSize = Animated.timing(logSize, {
            toValue: 1,
            duration: 500
        })
        Animated.parallel([position, _opacity, _logSize]).start()
    }

    signFaild() {
        const { errorAnim } = this.state;
        Animated.timing(errorAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.bounce
        }).start()
    }

    signSuccess() {
        const { errorAnim } = this.state;
        Animated.timing(errorAnim, {
            toValue: 0,
            duration: 200,
        }).start()
    }




    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                database.child(`Users/${user.uid}/`).once("value", (snapshoot) => {
                    let currentUser = snapshoot.val()
                    currentUser.id = snapshoot.key
                    this.props.currentUserAction(currentUser)
                    this.b1.success()
                    setTimeout(() => {
                        this.props.navigation.navigate("Dashboard")
                    }, 3000)
                    setTimeout(() => {
                        this.b1.reset()
                    }, 5000)
                })
            }
            else {
                setTimeout(() => {
                    this.animateion()
                }, 3000)
            }
        })
    }

    componentWillUnmount() {
        this.b1.reset()
    }

    signInHeandler() {
        const { email, password } = this.state
        var obj = {
            email,
            password,
        }
        if (email !== "" && password !== "") {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    database.child(`Users/${res.user._user.uid}/`).once("value", (snapshoot) => {
                        let currentUser = snapshoot.val()
                        currentUser.id = snapshoot.key
                        this.props.currentUserAction(currentUser)
                        this.b1.success()
                        this.signSuccess()
                        this.setState({
                            errorMessage: ""
                        })
                        setTimeout(() => {
                            this.props.navigation.navigate("Dashboard")
                        }, 1500)
                    })
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    this.setState({
                        errorMessage
                    })
                    this.signFaild()
                    this.b1.reset()
                })
        }
        else {
            this.setState({
                errorMessage: "Requaired  All Feilds"
            })
            this.signFaild()
            this.b1.reset()
        }
    }


    render() {
        const {
            email,
            password,
            logPosition,
            opacity,
            logSize,
            errorAnim,
            errorMessage
        } = this.state

        const logTop = logPosition.interpolate({
            inputRange: [0, 1],
            outputRange: ["40%", "10%"]
        })

        const _logSize = logSize.interpolate({
            inputRange: [0, 1],
            outputRange: [160, 100]
        })
        const _opacity = opacity.interpolate({
            inputRange: [0, 0.3, 0.6, 0.8, 1],
            outputRange: [0, 0.3, 0.6, 0.8, 1],
        })

        const eroor_opacity = errorAnim.interpolate({
            inputRange: [0, 0.3, 0.6, 0.8, 1],
            outputRange: [0, 0.3, 0.6, 0.8, 1],
        })

        return (
            <ImageBackground style={styles.ImageBackground}
                resizeMode={"stretch"} source={require("../../assets/scrubs-steth-iP5.jpg")} >

                <Animated.View
                    style={[{ top: logTop, height: _logSize, width: _logSize, }, styles.logContainer]} >
                    <Image style={styles.logStyle} source={require("../../assets/smart-patients-logo-200.png")} />
                </Animated.View>

                <View style={[styles.container]} >
                    <Animated.View style={{ opacity: _opacity, flex: 1 }} >
                        <View style={[styles.signUpbuttonView,]} >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SignUpComponent')}
                                activeOpacity={0.7}
                                style={[styles.signUpbutton]} >
                                <Text style={styles.signUpbuttonText} >Sign Up</Text>
                                < Icon name="angle-right" style={styles.signInbuttonIcon} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.headingContainer]} >
                            <Text style={[styles.headingText,]} >ACCESS PATIENS</Text>
                        </View>
                        <View style={styles.inputAndButtonContainer} >
                            <View style={styles.TextInputContainer} >
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
                                    style={styles.defaultStyle}
                                    onPress={this.signInHeandler.bind(this)}
                                    ref={ref => (this.b1 = ref)}
                                    successIcon="check"
                                />
                            </View>
                            {/* <ion-icon name="warning"></ion-icon> */}
                            <Animated.View style={[styles.errorContainer, { opacity: eroor_opacity }]} >
                                <Icon name="exclamation-triangle" color="#fff" size={20} />
                                <Text style={{
                                    color: "#fff", textAlign: "center",
                                    fontSize: 17
                                }} >{errorMessage}</Text>
                            </Animated.View>
                        </View>
                    </Animated.View>
                    {/* <View style={{
                        position: "absolute", left: 0, right: 0, bottom: 0, height: "5%",
                        backgroundColor: "rgba(255, 20, 2, 1)", 
                    }} >
                    </View> */}
                </View>
            </ImageBackground>


        );
    }
}
const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "rgba(57, 156, 187, 0.8)"
    },
    logContainer: {
        alignSelf: "center",
        position: "absolute",
        zIndex: 1,
    },
    logStyle: {
        height: "100%",
        width: "100%",
    },
    headingContainer: {
        height: hp("15%"),
        width: wp("100%"),
        justifyContent: "center",
        flexDirection: "row",
    },
    inputAndButtonContainer: {
        flex: 1,
        width: wp("100%"),
        alignItems: "center",
        justifyContent: "center"
    },
    FBandGOOGLEbuttonContainer: {
        height: hp("10%"),
        width: wp("100%"),
        justifyContent: "center"
    },
    headingText: {
        fontSize: wp("3%"),
        alignSelf: "flex-end",
        color: "#17355f"
    },
    TextInputContainer: {
        width: wp("70%")
    },
    lableContainer: {
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
    signUpbuttonView: {
        height: hp("10%"),
        alignItems: "center",
        alignSelf: "flex-end",
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
        fontWeight: "500",
    },
    signInbuttonIcon: {
        fontSize: 40,
        alignSelf: "center",

    },
    defaultStyle: {
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2,
        height: 55,
        justifyContent: 'center',
        marginVertical: 10,

    },
    errorContainer: {
        height: "5%",
        width: 350,
        marginTop: "7%",
        justifyContent: "center",
        alignItems: "center",
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


export default connect(mapStateToProp, mapDispatchToProp)(SignInComponent)