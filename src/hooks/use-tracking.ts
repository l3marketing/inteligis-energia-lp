import { useEffect, useMemo, useState } from "react";
import { collectTrackingSync, getGeoFromIP, type TrackingFields } from "@/lib/tracking";

export function useTrackingFields(): TrackingFields {
  const base = useMemo(() => collectTrackingSync(), []);
  const [fields, setFields] = useState<TrackingFields>(base);

  useEffect(() => {
    let mounted = true;
    getGeoFromIP().then((geo) => {
      if (mounted && Object.keys(geo).length > 0) {
        setFields((prev) => ({ ...prev, ...geo }));
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return fields;
}