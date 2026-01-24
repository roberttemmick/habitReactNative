import * as configcat from 'configcat-js';
import { useEffect, useState } from "react";

const sdkKey = 'configcat-sdk-1/1FreCH3G3UeMDm-WxIJrNg/WX-3Zaafg0GQROevMmEk_g';

export const getFeatureFlag = async (ffKey: string) => {
  const configCatClient = configcat.getClient(
    sdkKey,
    configcat.PollingMode.AutoPoll,
  );

  return configCatClient.getValueAsync(ffKey, false);
};

export function useFeatureFlag(ffKey: string): boolean {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchFlag = async () => {
      try {
        const value = await getFeatureFlag(ffKey);
        if (isMounted) {
          setEnabled(value);
        }
      } catch (e) {
        console.log('Feature flag fetch failed:', e);
        if (isMounted) {
          setEnabled(false);
        }
      }
    };

    fetchFlag();

    return () => {
      isMounted = false;
    };
  }, [ffKey]);

  return enabled;
}