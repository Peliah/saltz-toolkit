import {
  SketchButton,
  SketchCard,
  SketchInput,
  SketchScreen,
  SketchText,
} from '@/components/sketch/index';
import { Spacing } from '@/constants/theme';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SketchScreen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}
        <SketchText variant="heading" size="4xl" style={styles.heading}>
          Saltz Toolkit
        </SketchText>
        <SketchText variant="body" size="lg" muted style={styles.sub}>
          Your hand-drawn design system is ready.
        </SketchText>

        {/* Buttons */}
        <SketchText variant="heading" size="xl" style={styles.sectionLabel}>
          Buttons
        </SketchText>
        <View style={styles.row}>
          <SketchButton label="Primary" onPress={() => {}} />
          <SketchButton
            label="Secondary"
            variant="secondary"
            onPress={() => {}}
          />
        </View>

        {/* Cards */}
        <SketchText variant="heading" size="xl" style={styles.sectionLabel}>
          Cards
        </SketchText>
        <SketchCard decoration="tape" rotate="ccw" style={styles.card}>
          <SketchText variant="heading" size="lg">
            Tape Card
          </SketchText>
          <SketchText variant="body" muted>
            Pinned to the wall with a strip of tape.
          </SketchText>
        </SketchCard>

        <SketchCard decoration="tack" variant="postit" rotate="cw" style={styles.card}>
          <SketchText variant="heading" size="lg">
            Post-it Note
          </SketchText>
          <SketchText variant="body" muted>
            Yellow sticky with a thumbtack on top.
          </SketchText>
        </SketchCard>

        {/* Input */}
        <SketchText variant="heading" size="xl" style={styles.sectionLabel}>
          Input
        </SketchText>
        <SketchInput
          label="Your name"
          placeholder="Write something..."
        />
      </ScrollView>
    </SketchScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing[6],
    paddingBottom: Spacing[20],
    gap: Spacing[4],
  },
  heading: {
    marginBottom: Spacing[1],
  },
  sub: {
    marginBottom: Spacing[4],
  },
  sectionLabel: {
    marginTop: Spacing[6],
    marginBottom: Spacing[2],
  },
  row: {
    flexDirection: 'row',
    gap: Spacing[4],
    flexWrap: 'wrap',
  },
  card: {
    marginVertical: Spacing[2],
  },
});
