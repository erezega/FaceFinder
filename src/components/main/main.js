import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Slider, TextInput, Switch, TouchableOpacity, Linking } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default class Main extends Component {
  state = {
    multiSliderValue: [18, 50],
    types: [{label: 'Females', value: 'females'}, {label: 'Males', value: 'males'}, {label: 'All genders', value: ''}],
    value: 'females',
    valueIndex: 0,
    placeholderText: [{value: 'Choose location'}, {value: 'Choose Name'}],
    textInputText: [{value: ''}, {value: ''}, {value: ''}],
    switchIsOn: [{name: "ageSwitch", value: true}, {name: "locationSwitch", value: false}, {name: "nameSwitch", value: false}],
    displayMarker: 'none',
  };

  gender = this.state.value;
  minAge = this.state.multiSliderValue[0];
  maxAge = this.state.multiSliderValue[1];
  location = this.state.textInputText[1].value;
  name = this.state.textInputText[2].value;

  genderRadioBtnValuesChange = (value, index) => {
    this.setState({
      value:value,
      valueIndex:index
    });
  }

  ageSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
  }
  
  ageSwitchChange = (value) => {
    this.state.switchIsOn[0].value = value;
    if (value == false) {
      this.minAge = "";
      this.maxAge = "";
    }
    else {
      this.minAge = this.state.multiSliderValue[0];
      this.maxAge = this.state.multiSliderValue[1];
    }
    this.setState({
      // switchIsOn: value,
    });
  }

  locationSwitchChange = (value) => {
    this.state.switchIsOn[1].value = value;
    if (value == false) {
      this.state.textInputText[1].value = "";
    }
    this.setState({
      // switchIsOn: value,
    });
  }

  nameSwitchChange = (value) => {
    this.state.switchIsOn[2].value = value;
    if (value == false) {
      this.state.textInputText[2].value = "";
    }
    this.setState({
      // switchIsOn: value,
    });
  }

  locationValueChange = (text) => {
    this.state.textInputText[1].value = text;
    this.setState({
      // locationText: text,
    });
  }

  nameValueChange = (text) => {
    this.state.textInputText[2].value = text;
    this.setState({
      // locationText: text,
    });
  }

  updateParameters() {
    this.gender = this.state.value;
    this.minAge = this.state.multiSliderValue[0];
    this.maxAge = this.state.multiSliderValue[1];
    this.location = this.state.textInputText[1].value;
    this.name = this.state.textInputText[2].value;
  }

  createUrl() {
    url = "https://www.facebook.com/search";
    if (this.gender) {
      url = url + "/" + this.gender;
    }
    if (this.state.switchIsOn[0].value == true) {
    url = url + "/str/" + this.minAge + "/" + this.maxAge + "/users-age-2";
    }
    if (this.location) {
      url = url + "/str/" + this.location + "/pages-named/residents/present";
    }
    if (this.name) {
      if (this.name.indexOf(' ') >= 0) {
        firstName = this.name.split(' ').slice(0, -1).join(' ');
        lastName = this.name.split(' ').slice(-1).join(' ');
        url = "https://www.facebook.com/search/str/" + firstName + "+" + lastName + "/keywords_search";
      }
      else {
        url = url + "/str/" + this.name + "/users-named";
      }
    }
    url = url + "/intersect";

    return url;
  }
  
  submitBtnPressed = () => {
    this.updateParameters();
    // console.log("btn pressed");
    // console.log(this.gender);
    // console.log(this.minAge);
    // console.log(this.maxAge);
    // console.log(this.location);
    // console.log(this.name);
    url = this.createUrl();
    Linking.openURL(url);
  }

  textInputStyle = function(options) {
    displayValue = null;
    this.state.displayMarker = null;
    if (this.state.switchIsOn[options].value == false) {
      this.state.displayMarker = 'none';
      displayValue = 'none';
      this.state.textInputText[options].value = "";
    }
    return {
      display: displayValue,
      backgroundColor: '#fafafa',
      width: 310,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,  
    }
  }

    render() {
      return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.mainPage}>   
          <Text>{"\n"}</Text>
          <View style={styles.picker}>
            <Text style={styles.header}>Gender</Text>
            <RadioForm 
              style={{alignItems: 'flex-start', padding: 10}}
              radio_props={this.state.types}
              initial={this.state.valueIndex}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={'#2196f3'}
              animation={false}
              onPress = {this.genderRadioBtnValuesChange}
            />
            {/* <Text>{this.state.value} </Text> */}
            </View> 
            <Text>{"\n"}</Text>
              <View style={styles.picker}>
                <Text style={styles.header}>Age</Text>
                <Switch
                onValueChange={this.ageSwitchChange}
                style={{marginTop: -25}}
                value={this.state.switchIsOn[0].value} 
                />
                <View style={styles.slider}>
                  <Text style={{marginTop: -20}}>{this.state.multiSliderValue[0]}</Text>
                  <MultiSlider
                    values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                    sliderLength={150}
                    onValuesChange={this.ageSliderValuesChange}
                    min={18}
                    max={50}
                    step={1}
                    snapped 
                    />
                  <Text style={{marginTop: -20}}>{this.state.multiSliderValue[1]}</Text>
                </View>
                {/* <Text>{"\n"}</Text> */}
              </View>
              <Text>{"\n"}</Text>
              <View style={styles.picker}>
                <Text style={styles.header}>Location</Text>
                <Switch
                onValueChange={this.locationSwitchChange}
                style={{marginTop: -25}}
                value={this.state.switchIsOn[1].value} 
                />
                <TextInput 
                placeholder={this.state.placeholderText[0].value}
                onChangeText={this.locationValueChange}
                style = {this.textInputStyle(1)}
                />
                {/* <Text>{this.state.textInputText[0].value} </Text>
                <Text>{this.state.switchIsOn[0].value.toString()} </Text> */}
                <Text>{"\n"}</Text>
              </View>
              <Text>{"\n"}</Text>
              <View style={styles.picker}>
                <Text style={styles.header}>Name</Text>
                <Switch
                onValueChange={this.nameSwitchChange}
                style={{marginTop: -25}}
                value={this.state.switchIsOn[2].value} 
                />
                <TextInput 
                placeholder={this.state.placeholderText[1].value}
                onChangeText={this.nameValueChange}
                style = {this.textInputStyle(2)}
                />
                <Text style={{display: this.state.displayMarker, color: 'red'}}> *If you insert fullname (firstName + lastName) all other properties will not be considered in the search</Text>
                {/* <Text>{this.state.textInputText[1].value} </Text>
                <Text>{this.state.switchIsOn[1].value.toString()} </Text> */}
                <Text>{"\n"}</Text>
              </View>
              <Text>{"\n"}</Text>
              <TouchableOpacity style={styles.submitBtn} onPress={this.submitBtnPressed}>
                <Text style={{color: 'white', fontSize: 20}}>Find!</Text>
              </TouchableOpacity>
        </View>
        </ScrollView>
        );
    }
  }
  
  const styles = StyleSheet.create({
    mainPage: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fafafa',
    },
    picker: {
      width: 330,
      backgroundColor: '#eeeeee',
    },
    header: {
      fontSize: 20,
    },
    slider: {
      margin: 20,
      width: 280,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-around',
    },
    submitBtn: {
      backgroundColor: '#2196f3',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 50,
    }
  });