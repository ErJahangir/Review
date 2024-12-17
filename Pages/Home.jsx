import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {RatingInput, Rating} from 'react-native-stock-star-rating';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [Review, setReview] = useState([]);
  const [ratings, setRating] = React.useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    size: '',
    fabric: '',
    image: '',
    rating: 0,
  });

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
        setFormData({...formData, image: image});
      }
    });
  };

  const handleSubmit = () => {
    Review.push({...formData, rating: ratings});
    // console.log({...formData, rating: ratings});
    setFormData({
      ...formData,
      description: '',
      fabric: '',
      image: '',
      rating: 0,
      size: '',
    });
    setRating(0);
    setShowModal(false);
  };
  // console.log(Review);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 24}}>
        Reviews & Feedback
      </Text>
      <View style={styles.heading}>
        <View style={styles.totalReview}>
          <Image
            source={require('../public/filledstar.png')}
            style={{height: 20, width: 20}}
          />
          <Text style={{fontWeight: '600', fontSize: 16, lineHeight: 24}}>
            4.9
          </Text>
          <Text style={{fontSize: 16}}>{Review.length} reviews</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.addbtn}>
          <Image
            source={require('../public/plussign.png')}
            style={{height: 15, width: 15}}
          />
          <Text>Add review</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Review}
        horizontal
        renderItem={({item, index}) => (
          <View key={index} style={styles.box}>
            <View style={styles.boxhead}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Image
                    source={require('../public/profile.png')}
                    style={{width: 55, height: 55}}
                  />
                  <View style={styles.profile}>
                    <Text style={{}}>Sammy</Text>
                    <Text>Seam Explorer </Text>
                  </View>
                </View>
                <Rating
                  stars={item.rating}
                  maxStars={5}
                  size={40}
                  color={'black'}
                />
              </View>

              {item.image && (
                <Image
                  source={{uri: item.image}}
                  style={styles.imageuplodaed}
                />
              )}
            </View>
            <View style={styles.itemsizediv}>
              <View style={styles.sizeIcon}>
                <Image source={require('../public/size.png')} />
                <Text>{item.size}</Text>
              </View>
              <View style={styles.sizeIcon}>
                <Image source={require('../public/book.png')} />
                <Text>{item.fabric}</Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 24,
                fontWeight: '700',
                textTransform: 'capitalize',
                marginBlock: 10,
              }}>
              {item.title}
            </Text>
            <Text>{item.description.slice(0, 200)}</Text>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        // transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.container1}>
          <View style={styles.heading1}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{padding: 10}}>
              <Image source={require('../public/backArrow.png')} />
            </TouchableOpacity>
            <Text style={{fontSize: 24, fontWeight: '900'}}>
              Write a review
            </Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{padding: 10}}>
              <Image source={require('../public/cancel.png')} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              marginBlock: 10,
              borderColor: '#939393',
            }}></View>
          <ScrollView>
            <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
              <View style={styles.inputDiv}>
                <Text style={styles.inputTitle}>
                  How would you rate your experience?
                </Text>
                <RatingInput
                  rating={ratings}
                  setRating={setRating}
                  size={50}
                  maxStars={5}
                  color={'black'}
                  bordered={false}
                />
              </View>
              <View style={styles.inputDiv}>
                <Text style={styles.inputTitle}>
                  Write a title for your review
                </Text>
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
                  onChangeText={text =>
                    setFormData({...formData, fabric: text})
                  }
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
                  alignItems: 'center',
                  gap: 10,
                }}>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text
                    style={{fontWeight: '900', fontSize: 20, color: '#fff'}}>
                    Post Review
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={styles.inputTitle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    width: Dimensions.get('window').width - 30,
    marginInline: 'auto',
    marginTop: 10,
  },
  heading: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBlock: 20,
    marginInline: 'auto',
  },
  totalReview: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  addbtn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  box: {
    width: Dimensions.get('window').width - 50,
    height: 300,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    marginInline: 5,
    elevation: 5,
  },
  boxhead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageuplodaed: {
    width: 95,
    height: 80,
    borderRadius: 5,
  },
  itemsizediv: {
    display: 'flex',
    flexDirection: 'row',
    gap: 50,
    marginBlock: 5,
  },
  sizeIcon: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  container1: {
    flex: 1,
    width: Dimensions.get('window').width - 30,
    marginInline: 'auto',
    marginTop: 15,
  },
  heading1: {
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
