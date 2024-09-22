// import React from 'react';
// import { View, Text, Image, TouchableOpacity} from 'react-native';
// import { useNavigation } from '@react-navigation/native'; 
// import styles from './AboutUsSection.module';
// import { routes } from '../../../routes';
// const AboutUsSection = () => {
//   const navigation = useNavigation(); 

//   return (
//     <View style={styles.aboutSection}>
//       <View style={styles.spad}>
//         <View style={styles.row}>
//           <View style={styles.col}>
//             <View style={styles.aboutText}>
//               <View style={styles.sectionTitle}>
//                 <Text style={styles.sectionTitleSpan}>About Us</Text>
//                 <Text style={styles.sectionTitleH2}>Reserve-Mate</Text>
//               </View>
//               <Text style={styles.fpara}>
//                 Our site is a leading online accommodation site. We’re passionate
//                 about travel. Every day, we inspire and reach millions of visitors.
//               </Text>
//               <Text style={styles.spara}>
//                 So when it comes to booking the perfect hotel, vacation rental,
//                 resort, apartment, we’ve got you covered.
//               </Text>
//               <TouchableOpacity
//                 style={styles.aboutBtn}
//                 onPress={() => navigation.navigate(routes.aboutUs)}
//               >
//                 <Text style={styles.aboutBtnText}>Read More</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.col}>
//             <View style={styles.aboutPic}>
//               <View style={styles.imageRow}>
//                 <View style={styles.imageCol}>
//                   <Image source={require('../../../images/about-1.jpg')} style={styles.image} />
//                 </View>
//                 <View style={styles.imageCol}>
//                   <Image source={require('../../../images/about-2.jpg')} style={styles.image} />
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default AboutUsSection;


import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './AboutUsSection.module';
import { routes } from '../../../routes';

const AboutUsSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.aboutSection}>
      <View style={styles.spad}>
        <View style={styles.column}>
          <View style={styles.aboutText}>
            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleSpan}>About Us</Text>
              <Text style={styles.sectionTitleH2}>Reserve-Mate</Text>
            </View>
            <Text style={[styles.fpara, styles.aboutTextP]}>
              Our site is a leading online accommodation site. We’re passionate
              about travel. Every day, we inspire and reach millions of visitors.
            </Text>
            <Text style={[styles.spara, styles.aboutTextP]}>
              So when it comes to booking the perfect hotel, vacation rental,
              resort, apartment, we’ve got you covered.
            </Text>
            <TouchableOpacity
              style={styles.aboutBtn}
              onPress={() => navigation.navigate(routes.aboutUs)}
            >
              <Text style={styles.aboutBtnText}>Read More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.aboutPic}>
            <View style={styles.imageRow}>
              <View style={styles.imageCol}>
                <Image source={require('../../../images/about-1.jpg')} style={styles.image} />
              </View>
              <View style={styles.imageCol}>
                <Image source={require('../../../images/about-2.jpg')} style={styles.image} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AboutUsSection;
