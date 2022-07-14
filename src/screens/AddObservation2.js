import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight, ScrollView,  Platform, Alert } from 'react-native';
import TopHeader from '../views/Header';
import Colors from '../views/Colors';
import axios from 'axios';
import { _retrieveData, API } from '../views/constants';
import { ConfirmDialog } from "react-native-simple-dialogs";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import RadioButton from "react-native-radio-button";
// import {  Location, } from 'expo';
import Constants from "expo-constants";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Picker} from '@react-native-picker/picker';
import Loader from '../views/Loader';
import * as Font from 'expo-font';
import Toast from 'react-native-tiny-toast'

class AddObservation2 extends Component {

    state = {
        checked: [],
        dialogVisible: false,
        isLoading: false,
        observationList: [],
        siteList: [],
        questions: [],
        observation_site_id: "",
        disaster_type_id: "",
        villageId: "",
        uploadPhoto: [],
        isChecked: [],
        type: "",
        image: [],
        location: {},
        fontsLoaded: false,


    }

    openInfoDialog = show => {
        this.setState({ dialogVisible: show });
    };

    componentDidMount = async () => {

        await Font.loadAsync({

            'OPENSANS-BOLD': {
                uri: require('../../assets/fonts/OpenSans-Bold.ttf'),
                display: Font.FontDisplay.FALLBACK,
            },
            'OPENSANS-REGULAR': {
                uri: require('../../assets/fonts/OpenSans-Regular.ttf'),
                display: Font.FontDisplay.FALLBACK,
            },

        });
        this.setState({ fontsLoaded: true });

        this.setState({ isLoading: true })
        let res = await _retrieveData();
        this.setState({
            sessionId: parseInt(res[0][1]),
            drtId: parseInt(res[1][1]),
        })

        const disasterId = this.props.navigation.getParam("disasterId")
        const villageId = this.props.navigation.getParam("villageId")
        const response = await this._getObservationData(disasterId)
        const result = await this._getObservationSiteName(disasterId)
        // console.log("SITE",result);




        if (result.data.data) {
            this.state.siteList.unshift({ observation_site_name: 'SELECT OBSERVATION LIST' })
        }
        let checked = [];

        for (let i = 0; i < response.data.data.length; i++) {
            checked.push(false)
        }


        let isChecked = [];

        for (let i = 0; i < response.data.data.length; i++) {
            isChecked.push({
                checked: "",
                answer_id: "",
                rnr_comm_question_id: response.data.data[i].assessment_parameter_id
            });
        }



        this.setState({ observationList: response.data.data, type: response.data.disaster_type, isLoading: false, siteList: result.data.data, villageId, disaster_type_id: disasterId, checked, isChecked: isChecked })
        // console.log("SiteList",this.state.siteList);
          
        // if (Platform.OS === "android" && Constants.isDevice) {
         
            
        //      console.log("Loaction Error");

        // } else {
        //     this._getLocationAsync();
        // }

        // this._getLocationAsync();

    }
    // _getLocationAsync = async () => {
        
    //     let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    //     if (status !== 'granted') {
    //         console.log("Loaction Permission not granted");

    //     }   

    //     let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    //     this.setState({ location });
    //     console.log("Loaction", JSON.stringify(this.state.location));

    // };

    onBoxPress = (index, id) => { 
        
        let newChecked = this.state.checked;


        newChecked[index] = !this.state.checked[index];
        this.setState({ checked: newChecked })
        let questions = this.state.questions;



        questions = questions.filter((item) => {


            if (item.id !== id) {
                return true;
            }
        })



        if (this.state.checked[index]) {
            questions.push({ id: id })
        }


        this.setState({ questions: questions })





    }

    filePickerHandler = async () => {
        this.openInfoDialog(false);
        try {
            var result = await DocumentPicker.getDocumentAsync({});
        } catch (err) {
            alert("Something went wrong please try again later");
        }
        if (!result.cancelled) {
            const image = [...this.state.image];
            image.push(result);
            this.setState({ image });
            console.log("Submitted");

        } else if (!result) {
            alert("Something went wrong please try again later");
        }
    };

    imagePickHandler = async () => {
        this.openInfoDialog(false);
        try {
            var result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                base64: true,
                quality: 0.5
            });

            //adding images to state.uploadPhoto array [anshul]
            const uploadPhoto = [...this.state.uploadPhoto];
            uploadPhoto.push(`data:image/jpg;base64,${result.base64}`);
            this.setState({ uploadPhoto });
        } catch (err) {
            alert("Something went wrong please try again later");
        }
        if (!result.cancelled) {
            // this.setState({ image: result.uri });
        } else if (!result) {
            alert("Something went wrong please try again later");
        }
    };

    cameraHandler = async () => {
        this.openInfoDialog(false);
        try {
            var result = await ImagePicker.launchCameraAsync({
                aspect: [4, 3],
                base64: true
                , quality: 0.5
            });

            //adding images to state.uploadPhoto array [anshul]
            const uploadPhoto = [...this.state.uploadPhoto];
            uploadPhoto.push(`data:image/jpg;base64,${result.base64}`);
            this.setState({ uploadPhoto });

        } catch (err) {
            alert("Something went wrong please try again later");
        }
        if (!result.cancelled) {
            // this.setState({ image: result.uri });
        } else if (!result) {
            alert("Something went wrong please try again later");
        }
    };


    _getObservationData = async (disasterId) => {
        const { sessionId, drtId } = this.state;
        return new Promise(async (res, rej) => {
            try {
                const response = await axios.post(`${API}showObservationCheckList`, {
                    data: {
                        sessionId,
                        drtId,
                        disaster_type_id: disasterId,
                    }
                })
                res(response)
                console.log(response);
            } catch (err) {
                rej(err)
            }
        })
    }


    _getObservationSiteName = async (disasterId) => {
        const { sessionId, drtId } = this.state;
        const village_id = this.props.navigation.getParam('villageId')
        return new Promise(async (res, rej) => {
            try {
                const response = await axios.post(`${API}showHazardsQuestions`, {
                    data: {
                        sessionId,
                        drtId,
                        disaster_type_id: disasterId,
                        village_id
                    }
                })
                res(response)
            } catch (err) {
                rej(err)
            }
        })
    }

    onPressHandler = (id, i, answer_id) => {

        console.log(id, i, answer_id)

        checked = i;
        let setArray = this.state.isChecked.map((item) => {
            if (item.rnr_comm_question_id === id) {
                return { rnr_comm_question_id: id, checked, answer_id: answer_id }
            } else {
                return item;
            }
        })
        this.setState({ isChecked: setArray })
        console.log("ischecked", this.state.isChecked);
        
    };

    checkPressedStatus = (id, i) => {
        let x = this.state.isChecked.filter((item) => {
            if (item.rnr_comm_question_id === id) {
                return true;
            }
        })
        if (x[0].checked === i) {
            return true;
        } else {
            return false;
        }
    }


    onPressHandler = (id, i, answer_id) => {

       const checked = i;
        let setArray = this.state.isChecked.map((item) => {
            if (item.rnr_comm_question_id === id) {
                return { rnr_comm_question_id: id, checked, answer_id: answer_id }
            } else {
                return item;
            }
        })
        this.setState({ isChecked: setArray })



    };


    checkPressedStatus = (id, i) => {
        let x = this.state.isChecked.filter((item) => {
            if (item.rnr_comm_question_id === id) {
                return true;
            }
        })
        if (x[0].checked === i) {
            return true;
        } else {
            return false;
        }
    }

    renderData = () => {
        const { observationList } = this.state;
        let x = observationList.length > 0 ? observationList[0].question_type : "";
        
        // this.setState({type:x})
        if (x == 0) {
            return observationList.map((data, i) => { 
                return (
                    <View key={i} style={{ paddingLeft: 10 }}>
                        <Text style={styles.heading}>{data.paramerter}</Text>
                        <View style={{ flexDirection: "column" }}>
                            {data.options.map((mdata, i) => {

                                let x = this.checkPressedStatus(data.assesment_paramerter_id, i)

                                return (
                                    <TouchableHighlight underlayColor='#fff' key={i} onPress={() => this.onPressHandler(data.assesment_paramerter_id, i, mdata.id)}>
                                        <View style={styles.optionContainer} >
                                            <View style={{ paddingRight: 6 }}>
                                                <RadioButton
                                                    innerColor='#1A498B'
                                                    outerColor='#1A498B'
                                                    animation={"bounceIn"}
                                                    isSelected={x}
                                                    size={10}
                                                    onPress={() => this.onPressHandler(data.assesment_paramerter_id, i, mdata.id)}

                                                />
                                            </View>
                                            <View>
                                                <Text style={styles.innerText}>{mdata.option}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                );
                            })}
                        </View>
                    </View>
                )
            })

        }
        else if (x == 1) {
            return (
                <>
                <View>
                 <Text style={styles.rectTexts}>Physical observation checklist</Text>
                </View>
                {
                    this.state.observationList.map((data, index) =>{
                        return(
                            <TouchableHighlight key={index} underlayColor='#fff' onPress={() => this.onBoxPress(index, data.assessment_parameter_id)}>
                            <View style={styles.listContainer}>
                                <View style={this.state.checked[index] === true ? styles.checkedRectBox : styles.rectBox}></View>
                                <Text style={styles.rectText}>{data.paramerter}</Text>
                            </View>
                        </TouchableHighlight>
                        )
                    })
                }
             </>
            )

        }
    }

    formHandler = async () => {
        console.log("I am inside ADD OBSSERVSTIOBN")
        this.setState({ isLoading: true })
        console.log("ischecked", this.state.isChecked);
        const { disaster_type_id, observation_site_id, villageId, sessionId, drtId, uploadPhoto, image } = this.state;
        // const latitude = this.state.location.coords.latitude;
        // const longitude = this.state.location.coords.longitude;

        // var {questions} = this.state;
        const { observationList } = this.state;
        let x = observationList.length > 0 ? observationList[0].question_type : "";

        var questions = [];
        if (x == 1) {
            console.log("I am inside ADD OBSSERVSTIOBN CONDITION 1")

            questions = this.state.questions.map((item) => { 
                return { id: item.id }
            })

        }
        else if (x == 0) {
            console.log("I am inside ADD OBSSERVSTIOBN CONDITION 2")

            questions = this.state.isChecked.map((item) => {
                if (item.checked !== "") {
                    return { id: item.rnr_comm_question_id, answer_id: item.answer_id }
                }
            })
        }
        // console.log("ObservationIs",observation_site_id);

        //console.log("questionss",questions);

        const document = []
        uploadPhoto.forEach(element => {
            document.push({ image: element })
        });
        console.log("anshul", {
            sessionId,
            drtId,
            disaster_type_id,
            questions,
            observation_site_id,
            villageId,
            document, 
            // latitude, longitude
        });
        let total = 0;
        image.forEach((item) => {
            total += item.size;
        })


        if (total < 5242880) {
            try {
            console.log("I am inside ADD OBSSERVSTIOBN CONDITION 3")

                const response = await axios.post(`${API}saveGoRiskobservationquestion`, {
                    data: {
                        sessionId,
                        drtId,
                        disaster_type_id,
                        questions,
                        observation_site_id,
                        villageId,
                        document,
                        // latitude,
                        // longitude
                    }


                })
                console.log(response.data)

                if (response.data.code == 200) {
                    this.setState({ isLoading: false })
                    // alert(response.data.msg);
                    // Toast.showSuccess(response.data.msg)
                    Toast.showSuccess("Sucessfully Submitted")
                    this.props.navigation.pop()
                    return;
                }

                this.setState({ isLoading: false })
                alert("Something went wrong")
                console.log("message", response.data.msg);


            } catch (err) {
                console.log(err);

                alert("Something went wrong!")
                this.setState({ isLoading: false })
            }
        }
        else {
            alert("Documents Size is greater than 5 MB. Please upload file again!")
            this.setState({ image: [] });
            this.setState({ isLoading: false })
        }
        console.log("I am inside ADD OBSSERVSTIOBN LAST")

    }

    render() {

        if (this.state.fontsLoaded) {
            if (this.state.isLoading) {
                return (
                    <Loader />
                )
            }

            //console.log(this.state.isChecked,'noob deepak');
            return (
                <View>
                    <TopHeader text='ADD OBSERVATION' />
                    <ScrollView>

                        <View style={styles.container}>
                            <View style={styles.greenBox}>
                                <Text style={styles.headingText}>{`Add Observation for ${this.state.type}`}</Text>
                            </View>


                            {this.state.siteList ? <View style={styles.selector}>
                                <Picker
                                    selectedValue={this.state.observation_site_id}
                                    itemStyle={styles.pickerItem}
                                    style={{ height: 40, width: 270, marginLeft: 20, }}
                                    onValueChange={(itemValue) =>
                                        this.setState({ observation_site_id: itemValue })
                                    }>
                                    <Picker.Item key="0" label="Please Select Your Site" value="0" />
                                    {this.state.siteList && this.state.siteList.map((list, i) => {
                                        return (
                                            <Picker.Item key={i} label={list.location} value={list.id} />
                                        )
                                    })}
                                </Picker>
                            </View> : console.log("Data not found")}
                            <View>
                                {this.state.observationList && this.renderData()}
                            </View>
                            <ScrollView horizontal>
                                <View
                                    style={{
                                        marginTop: 10,
                                        paddingLeft: 20,
                                        display: "flex",
                                        flexDirection: "row"
                                    }}
                                >
                                    {this.state.uploadPhoto.length !== 0 ? this.state.uploadPhoto.map((item, index) => (
                                        <Image
                                            source={{ uri: item }}
                                            key={index}
                                            style={{ width: 70, height: 70, margin: 10 }} />
                                    )) : null}
                                </View>
                            </ScrollView>
                            <View>
                                {this.state.image.length !== 0 ? <Text style={{ fontSize: 16, fontWeight: "bold", padding: 10 }}>Documents Uploaded</Text> : null}
                            </View>
                            <View>
                                {this.state.image !== 0 ? this.state.image.map((item, index) => (
                                    <Text key={index} style={{ paddingLeft: 15, paddingTop: 5 }}>{index + 1}{item.name}</Text>
                                )) : null}
                            </View>

                            <View style={{ paddingBottom: 100 }}>
                                <TouchableHighlight style={styles.nextBox} onPress={() => this.openInfoDialog(true)}>
                                    <Text style={styles.nextText}>Upload Data/Photo</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.nextBox} onPress={this.formHandler}>
                                    <Text style={styles.nextText}>SUBMIT</Text>
                                </TouchableHighlight>

                            </View>
                        </View>
                    </ScrollView>
                    <ConfirmDialog
                        title="Select a Photo"
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.openInfoDialog(false)}
                        titleStyle={{
                            color: Colors.greenColor,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}
                        positiveButton={{
                            title: "Cancel",
                            titleStyle: { color: Colors.blackColor, fontSize: 14 },
                            onPress: () => this.openInfoDialog(false)
                        }}
                    >
                        <TouchableHighlight underlayColor="#fff" onPress={this.cameraHandler}>
                            <View style={styles.modalBox}>
                                <Text style={styles.modalText}>Take Photo</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            underlayColor="#fff"
                            onPress={this.imagePickHandler}
                        >
                            <View style={styles.modalBox}>
                                <Text style={styles.modalText}>Choose Photo from Library</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#fff"
                            onPress={this.filePickerHandler}
                        >
                            <View style={styles.modalBox}>
                                <Text style={styles.modalText}>Choose Document from Library</Text>
                            </View>
                        </TouchableHighlight>


                    </ConfirmDialog>
                </View>
            );
        } else {
            return (
                <Loader />
            )
        }
    }
}


const styles = StyleSheet.create({
    greenBox: {
        backgroundColor: Colors.greenColor,
        display: 'flex',
        height: 60,
        justifyContent: 'center',
        marginBottom: 20,
        width: "100%"
    },

    selector: {
        width: 280,
        height: 41,
        borderWidth: 2,
        borderColor: '#707070',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headingText: {
        color: Colors.whiteColor,
        paddingLeft: 23,
        fontSize: 18,
        fontFamily: "OPENSANS-BOLD"
    },
    listContainer: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 30,
        // justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginRight: 10

    },
    modalBox: {
        height: 40,
        justifyContent: "center",
        display: "flex"

    },
    modalText: {
        color: Colors.blackColor
    },
    rectText: {
        color: '#272727',
        paddingLeft: 20,
        fontFamily: "OPENSANS-REGULAR",
        fontSize: 15,
    },
    rectTexts: {
        color: '#1A498B',
        paddingLeft: 30,
        fontFamily: "OPENSANS-REGULAR",
        fontSize: 18,
        fontWeight:'bold'
    },
    rectBox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: Colors.greenColor,
    },
    checkedRectBox: {
        width: 18,
        height: 18,
        backgroundColor: Colors.greenColor
    },
    nextBox: {
        width: 180,
        height: 40,
        backgroundColor: Colors.greenColor,
        marginLeft: 100,
        marginTop: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 5,
    },
    nextText: {
        color: Colors.whiteColor,
        fontFamily: "OPENSANS-BOLD",
        fontSize: 14
    },
    heading: {
        fontFamily: "OPENSANS-BOLD",
        paddingTop: 10,
        fontSize: 16,
        color: "#1A498B"
    },

    innerText: {
        fontSize: 15,
        color: "black",
        fontFamily: "OPENSANS-REGULAR"

    },

    optionContainer: {
        flexDirection: "row",
        padding: 5,
        alignItems: "center"
    },


});


export default AddObservation2;