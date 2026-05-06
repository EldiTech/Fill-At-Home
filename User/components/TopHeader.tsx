import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  COLORS,
  HEADER_DIMENSIONS,
  HEADER_TYPOGRAPHY,
  NOTIFICATION_ICON_XML,
} from '../constants';

const LOGO = require('../../assets/Home Logo.png');

type TopHeaderProps = {
  subtitle: string;
  title?: string;
  onNotificationPress?: () => void;
};

export default function TopHeader({
  subtitle,
  title = 'Fill At Home',
  onNotificationPress,
}: TopHeaderProps) {
  return (
    <View style={styles.heroHeader}>
      <Image source={LOGO} style={styles.logoLeft} resizeMode="contain" />
      <View style={styles.heroTitleWrap}>
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroSubtitle}>{subtitle}</Text>
      </View>
      <Pressable style={styles.notificationButton} onPress={onNotificationPress}>
        <SvgXml xml={NOTIFICATION_ICON_XML} width={20} height={20} color={COLORS.ink} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  heroHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: HEADER_DIMENSIONS.gap,
    marginBottom: HEADER_DIMENSIONS.marginBottom,
  },
  logoLeft: {
    width: HEADER_DIMENSIONS.logoWidth,
    height: HEADER_DIMENSIONS.logoHeight,
  },
  heroTitleWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  heroTitle: {
    fontFamily: HEADER_TYPOGRAPHY.title.fontFamily,
    fontSize: HEADER_TYPOGRAPHY.title.fontSize,
    lineHeight: HEADER_TYPOGRAPHY.title.lineHeight,
    color: HEADER_TYPOGRAPHY.title.color,
    textTransform: HEADER_TYPOGRAPHY.title.textTransform,
  },
  heroSubtitle: {
    fontFamily: HEADER_TYPOGRAPHY.subtitle.fontFamily,
    fontSize: HEADER_TYPOGRAPHY.subtitle.fontSize,
    letterSpacing: HEADER_TYPOGRAPHY.subtitle.letterSpacing,
    color: HEADER_TYPOGRAPHY.subtitle.color,
    textTransform: HEADER_TYPOGRAPHY.subtitle.textTransform,
    marginTop: HEADER_TYPOGRAPHY.subtitle.marginTop,
  },
  notificationButton: {
    width: HEADER_DIMENSIONS.notificationSize,
    height: HEADER_DIMENSIONS.notificationSize,
    borderRadius: HEADER_DIMENSIONS.notificationBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.12)',
  },
});
