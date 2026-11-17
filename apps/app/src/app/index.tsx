import { isPassingScore } from '@obuchalka/core';
import { Text, View } from 'react-native';

import { ru } from '@/i18n/ru';

// Проверка связки: пакет из packages/core импортируется в приложение как исходник.
const DEFAULT_PASS_SCORE = 70;
const linked = isPassingScore(DEFAULT_PASS_SCORE, DEFAULT_PASS_SCORE);

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-white px-6 dark:bg-neutral-950">
      <Text className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
        {ru.app.name}
      </Text>
      <Text className="text-center text-base text-neutral-600 dark:text-neutral-300">
        {ru.app.tagline}
      </Text>
      <Text className="text-center text-sm text-neutral-500">{ru.home.placeholder}</Text>
      {linked ? (
        <Text className="text-xs text-neutral-400">
          {ru.home.passScoreHint(DEFAULT_PASS_SCORE)}
        </Text>
      ) : null}
    </View>
  );
}
