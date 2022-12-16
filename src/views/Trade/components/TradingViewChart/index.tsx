import { Box } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import Datafeed, { usePairSupportedChart } from "./Datafeed";

type TradingViewChartProps = {
  widgetProps?:
    | {
        locale: string;
        debug: boolean;
        fullscreen: boolean;
        interval: string;
        theme: string;
        allow_symbol_change: boolean;
        timezone: string;
        autosize: boolean;
        overrides: any;
      }
    | any;
  pairSymbol: string;
};

const initialWidgetProps: TradingViewChartProps["widgetProps"] = {
  locale: getLocalLanguage(),
  debug: false,
  fullscreen: false,
  interval: "60",
  theme: "dark",
  allow_symbol_change: true,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  autosize: true,
  overrides: {
    "paneProperties.background": "#000a0d",
    "paneProperties.vertGridProperties.color": "rgba(0, 0, 0, 0.06)",
    "paneProperties.horzGridProperties.color": "rgba(0, 0, 0, 0.06)",
    "paneProperties.crossHairProperties.color": "#758696",
    "scalesProperties.lineColor": "rgba(0, 0, 0, 0.12)",
    "scalesProperties.textColor": "rgba(178, 181, 190, 1)",
  },
  toolbar_bg: "black",
  loading_screen: {
    backgroundColor: "transparent",
  },
};

function getLocalLanguage() {
  return navigator.language.split("-")[0] || "en";
}

const TradingViewChart = ({ widgetProps, pairSymbol }: TradingViewChartProps) => {
  // const [isReady, setIsReady] = useState(false);
  const supportedPairSymbol = usePairSupportedChart(pairSymbol);

  const datafeed = useRef(Datafeed);
  const widgetOptions = useMemo(
    () => ({
      container_id: "chart_container",
      datafeed: datafeed.current,
      library_path: "/scripts/charting_library/",
      disabled_features: [
        "header_undo_redo",
        "header_symbol_search",
        "header_fullscreen_button",
        "header_compare",
        "header_saveload",
        "drawing_templates",
      ],
      enabled_features: [
        "study_templates",
        "create_volume_indicator_by_default",
        "save_chart_properties_to_local_storage",
        "use_localstorage_for_settings",
      ],
      ...initialWidgetProps,
      ...widgetProps,
    }),
    [widgetProps]
  );

  const tradingViewWidget = useRef<any>(null);
  const chartObject = useRef<any>(null);

  const chartReady = useCallback(() => {
    if (!tradingViewWidget.current) return;
    tradingViewWidget.current.onChartReady(() => {
      chartObject.current = tradingViewWidget.current.activeChart();
      tradingViewWidget.current.applyOverrides(widgetOptions.overrides);
    });
  }, [widgetOptions.overrides]);

  useEffect(() => {
    if (supportedPairSymbol) {
      if (tradingViewWidget.current) tradingViewWidget.current.remove();
      tradingViewWidget.current = (window as any).tvWidget = new (window as any).TradingView.widget({
        ...widgetOptions,
        symbol: supportedPairSymbol,
      });

      chartReady();
    }
  }, [chartReady, supportedPairSymbol, widgetOptions]);

  return (
    <>
      {supportedPairSymbol && (
        <Box
          sx={{
            width: "100%",
            height: "595px",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #242D35",
          }}
          id="chart_container"
        ></Box>
      )}
    </>
  );
};

export default memo(TradingViewChart);
