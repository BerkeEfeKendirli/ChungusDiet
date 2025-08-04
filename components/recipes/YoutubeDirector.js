import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import YoutubeSvg from "./../../assets/images/svg/youtube";
import { useTheme } from "../../context/ThemeContext";

function getYoutubeId(link) {
  const match = link.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function YoutubeDirector({ link }) {
  const videoId = link ? getYoutubeId(link) : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;
  const [thumbnailError, setThumbnailError] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    async function fetchYoutubeTitle() {
      if (!videoId) return;
      try {
        const apiKey = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
        );
        const data = await res.json();
        setVideoTitle(data.items?.[0]?.snippet?.title || "");
        setChannelName(data.items?.[0]?.snippet?.channelTitle || "");
      } catch (err) {
        setVideoTitle("");
        setChannelName("");
      }
    }
    fetchYoutubeTitle();
  }, [videoId]);

  const StyleColors = useTheme();
  const styles = getStyles(StyleColors);

  return (
    <View style={styles.button}>
      <View style={styles.descriptionContainer}>
        <Feather
          name="corner-left-down"
          size={12.67}
          color={StyleColors.onBackgroundVariant}
          style={{ paddingTop: 8 }}
        />
        <Text style={styles.description}> Watch the recipe video </Text>
        <Feather
          name="corner-right-down"
          size={12.67}
          color={StyleColors.onBackgroundVariant}
          style={{ paddingTop: 8 }}
        />
      </View>
      <Pressable
        style={({ pressed }) => [pressed && styles.pressed]}
        onPress={() => link && Linking.openURL(link)}
      >
        <View style={styles.youtubeContainer}>
          {thumbnailUrl && !thumbnailError ? (
            <>
              <Image
                source={{ uri: thumbnailUrl }}
                style={styles.thumbnail}
                resizeMode="cover"
                onError={() => setThumbnailError(true)}
              />
              <YoutubeSvg width={25} height={20} />
            </>
          ) : (
            <View style={[styles.thumbnail, styles.placeholder]}>
              <Text style={styles.placeholderText}>Not Available</Text>
            </View>
          )}
          <View style={styles.videoDetails}>
            <Text
              style={styles.videoTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {videoTitle}
            </Text>
            <Text style={styles.channelName}>{channelName}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default YoutubeDirector;

const getStyles = (StyleColors) =>
  StyleSheet.create({
    button: {
      gap: 4,
      width: "100%",
    },
    descriptionContainer: {
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    description: {
      fontFamily: "inter-regular",
      fontSize: 14,
      color: StyleColors.onBackgroundVariant,
    },
    youtubeContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    pressed: {
      opacity: 0.7,
      backgroundColor: StyleColors.outline,
      borderRadius: 6,
    },
    link: {
      fontFamily: "inter-regular",
      fontSize: 12,
      color: StyleColors.red,
    },
    thumbnail: {
      width: 80,
      height: 45,
      borderRadius: 6,
    },
    videoDetails: {
      flexDirection: "column",
      gap: 2,
    },
    videoTitle: {
      fontFamily: "inter-medium",
      fontSize: 16,
      color: StyleColors.onBackground,
      maxWidth: 220,
    },
    channelName: {
      fontFamily: "inter-regular",
      fontSize: 12,
      color: StyleColors.onBackgroundVariant,
      maxWidth: 200,
    },
    placeholder: {
      backgroundColor: StyleColors.surfaceVariant,
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      color: StyleColors.onSurfaceVariant,
      fontSize: 11,
    },
  });
