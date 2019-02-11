import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    Container, Header,
    Left, Body,
    Right, Button,
    Icon, Title,
    Item, Input,
    Radio, Content,
    Card, CardItem,
} from 'native-base';


import { connect } from "react-redux"


const { width, height } = Dimensions.get("window")

class Details extends Component {
    render() {
        console.log(this.props.currentPatienst.currentPatienst, "DETAILS")
        const currentUser = this.props.currentUser.currentUser

        const { name, age, fatherName, gander, disease, medication } = this.props.currentPatienst.currentPatienst
        return (
            <Container>
                <View style={styles.sameFlex} >
                    <Header style={styles.header} >
                        <Left>
                            <Button onPress={() => { this.props.navigation.navigate('Dashboard') }} transparent>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{currentUser.username}</Title>
                        </Body>
                        <Right>
                            {/* <Button onPress={() => this.setState({ isSearching: true })} transparent>
                                <Icon name='search' />
                            </Button>
                            <Button onPress={() => this.setState({ modalVisible: true })} transparent>
                                <Icon name='add' />
                            </Button>
                            <Button transparent>
                                <Icon name='more' />
                            </Button> */}
                        </Right>
                    </Header>
                    <View style={styles.whitBG} />
                    <ImageBackground resizeMode={"stretch"} source={require("../../../assets/scrubs-steth-iP5.jpg")}
                        style={styles.sameFlex} ><View style={styles.ImageBackground} /></ImageBackground>
                    <Card style={styles.Card} >
                        <View style={styles.DetailContainer} >
                            <Text style={styles.titles} >{name}  {gander == 'Male' ? "S/o" : "D/o"}  {fatherName}</Text>
                            <View style={styles.titlesContainer} >
                                <Text style={styles.titles} >Age</Text>
                                <Text style={styles.titlesText} >{age}</Text>
                            </View>

                            <View style={styles.titlesContainer} >
                                <Text style={styles.titles} >Gander</Text>
                                <Text style={styles.titlesText} >{gander}</Text>
                            </View>
                            <View style={styles.titlesContainer} >
                                <Text style={styles.titles} >Disease</Text>
                                <Text style={styles.titlesText} >{disease}</Text>
                            </View>
                            <View style={styles.titlesContainer} >
                                <Text style={styles.titles} >Medication</Text>
                                <Text style={styles.titlesText} >{medication}</Text>
                            </View>


                        </View>

                    </Card>

                    <View />
                </View>
            </Container>

        )
    }
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#399cbb",
        elevation: 2,
        height: height / 12,
    },
    whitBG: {
        height: hp("25%"),
        backgroundColor: "#399cbb"
    },
    sameFlex: {
        flex: 1
    },
    ImageBackground: {
        flex: 1,
        backgroundColor: "rgba(57, 156, 187, 0.8)"
    },
    Card: {
        position: "absolute",
        left: "4%",
        right: "4%",
        top: hp("15%"),
        height: hp("30%"),
        backgroundColor: "#fff",
        borderRadius: 2,
        padding: 15
    },
    DetailContainer: {
        flex: 1,
        justifyContent: "center"
    },
    titles: {
        fontSize: 18,
        fontWeight: "500",
        color: "#399cbb"
    },
    titlesContainer: {
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-between",
        marginTop: 20
    },
    titlesText: {
        fontSize: 15,
        color: "#399cbb"
    }
})


const mapStateToProp = (state) => {
    return ({
        currentPatienst: state.root,
        currentUser: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // currentUserAction: (data) => {
        //     dispatch(currentUserAction(data))
        // },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(Details)



