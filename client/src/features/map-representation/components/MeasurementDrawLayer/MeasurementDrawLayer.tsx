import { MapPolygonDraw } from "../../../../shared/components/map/MapPolygonDraw";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { DrawnEvent } from "../../../../shared/lib/events/DrawnEvent.ts";
import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";

export const MeasurementDrawLayer = () => {
  const { measurementsDrawLayerReference, mapEventBus } =
    useMapViewPageViewModel();

  const [showGlow, setShowGlow] = useState(false);

  const handleSomethingDrawn = (e: { features: object[] }) => {
    mapEventBus.dispatchEvent(new DrawnEvent(e));
  };

  const enableGlow = useCallback(() => {
    setShowGlow(true);
  }, []);

  const disableGlow = useCallback(() => {
    setShowGlow(false);
  }, []);

  useEffect(() => {
    mapEventBus.addEventListener("glow-off", disableGlow);
    mapEventBus.addEventListener("glow-on", enableGlow);
    return () => {
      mapEventBus.removeEventListener("glow-off", disableGlow);
      mapEventBus.removeEventListener("glow-on", enableGlow);
    };
  }, [mapEventBus]);

  return (
    <>
      <MapPolygonDraw
        drawRef={measurementsDrawLayerReference}
        onCreate={handleSomethingDrawn}
        displayControlsDefault={false}
        position="top-right"
        controls={{
          trash: true,
        }}
      />
      <Box
        sx={{
          transition: "all 0.3s ease-in-out",
          opacity: showGlow ? 1 : 0,
          height: "100%",
          width: "100%",
          zIndex: 999,
          position: "absolute",
          boxShadow: "inset 0 0 2rem lightgreen",
          pointerEvents: "none",
        }}
      />
    </>
  );
};
