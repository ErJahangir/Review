import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    size: '',
    fabric: '',
    image: '',
  });

  console.log(formData);

  const handleUploadImage = async () => {
    const option = {
      mediaType: 'image',
      quantity: 1,
    };
    launchImageLibrary(option, Response => {
      if (Response.didCancel) {
        console.log('canceled');
      } else if (Response.errorMessage) {
        console.log('something error');
      } else {
        const image = Response.assets[0]?.uri;
        // console.log('image output', image);
        setFormData({...formData, image: image});
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity>
          <Image source={require('../public/backArrow.png')} />
        </TouchableOpacity>
        <Text style={{fontSize: 24, fontWeight: '900'}}>Write a review</Text>
        <Image source={require('../public/plussign.png')} />
      </View>
      <View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          marginBlock: 10,
          borderColor: '##939393',
        }}></View>
      <ScrollView>
        <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <View style={styles.inputDiv}>
            <Text style={styles.inputTitle}>
              How would you rate your experience?
            </Text>
          </View>
          <View style={styles.inputDiv}>
            <Text style={styles.inputTitle}>Write a title for your review</Text>
            <TextInput
              placeholder="e.g., 'Loved the fit' or 'Not great for beginners"
              style={styles.Inputfield}
              name="title"
              onChangeText={text => setFormData({...formData, title: text})}
            />
          </View>
          <View style={styles.inputDiv}>
            <Text style={styles.inputTitle}>Tell us more</Text>
            <TextInput
              multiline
              onChangeText={text =>
                setFormData({...formData, description: text})
              }
              placeholder="Share your experience with this pattern (e.g., 'Loved the fit, but the instructions were unclear')."
              style={{
                minHeight: 110,
                borderWidth: 1,
                padding: 20,
                borderRadius: 12,
              }}
            />
          </View>
          <View style={styles.inputDiv}>
            <Text style={styles.inputTitle}>What size did you make? </Text>
            <TextInput
              placeholder="Enter the size you created from this pattern"
              style={styles.Inputfield}
              onChangeText={text => setFormData({...formData, size: text})}
            />
          </View>
          <View style={styles.inputDiv}>
            <Text style={styles.inputTitle}>Which fabric did you use </Text>
            <TextInput
              placeholder="Enter the fabric you used"
              style={styles.Inputfield}
              onChangeText={text => setFormData({...formData, fabric: text})}
            />
          </View>

          <TouchableOpacity
            style={{
              width: '100%',
              height: 100,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'dashed',
            }}
            onPress={handleUploadImage}>
            <Image source={require('../public/upload.png')} />
            <Text style={{textAlign: 'center'}}>Upload Image</Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              // backgroundColor: 'red',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={styles.inputTitle}>Post as Asyncronous</Text>
            {/* <Button title="Post Review" /> */}
            <TouchableOpacity style={styles.btn}>
              <Text style={{fontWeight: '900', fontSize: 20, color: '#fff'}}>
                Post Review
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.inputTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width - 30,
    marginInline: 'auto',
    marginTop: 15,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBlock: 10,
  },
  Inputfield: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    marginBlock: 10,
    borderColor: '##929292',
  },
  inputDiv: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  inputTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: '#434343',
  },
  btn: {
    height: 45,
    backgroundColor: '#979797',
    width: 200,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
