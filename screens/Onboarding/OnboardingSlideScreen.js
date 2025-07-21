import { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { onboardingSlideData } from "../../data/onboardingSlideData";
import OnboardingSlideItem from "../../components/onboarding/OnboardingSlideItem";
import OnboardingNavigation from "../../components/onboarding/OnboardingNavigation";
import FloatingActionButton from "../../components/buttons/FloatingActionButton";
import TextButton from "../../components/buttons/TextButton";
import { StyleColors } from "../../constants/colors";

const { width } = Dimensions.get("window");

function OnboardingSlideScreen({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    if (currentSlide < onboardingSlideData.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({ x: nextSlide * width, animated: true });
    } else {
      navigation.navigate("Welcome");
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setCurrentSlide(prevSlide);
      scrollViewRef.current?.scrollTo({ x: prevSlide * width, animated: true });
    } else {
      return null;
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.slide}
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setCurrentSlide(slideIndex);
          }}
        >
          {onboardingSlideData.map((slide) => (
            <OnboardingSlideItem key={slide.id} slide={slide} />
          ))}
        </ScrollView>
        <OnboardingNavigation
          slides={onboardingSlideData}
          currentSlide={currentSlide}
        />
      </View>
      <View style={styles.buttons}>
        {currentSlide > 0 ? (
          <TextButton
            text="Back"
            color={StyleColors.onBackgroundVariant}
            onPress={handleBack}
            style={styles.backButton}
          />
        ) : (
          <TextButton />
        )}
        <FloatingActionButton
          icon="chevron-forward"
          iconColor={StyleColors.onPrimary}
          onPress={handleNext}
          size={50}
          backgroundColor={StyleColors.primary}
        />
      </View>
    </View>
  );
}

export default OnboardingSlideScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    flexGrow: 0,
  },
  buttons: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    fontFamily: "inter-regular",
    fontSize: 16,
    color: StyleColors.onBackgroundVariant,
  },
});
