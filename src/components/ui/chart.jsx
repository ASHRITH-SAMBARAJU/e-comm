import React, { createContext, useContext, useMemo, useId, forwardRef } from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = createContext(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.theme || cfg.color);

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
  const color = itemConfig.theme?.[theme] || itemConfig.color;
  return color ? `  --color-${key}: ${color};` : null;
}).join("\n")}
}`)
          .join("\n"),
      }}
    />
  );
};

const ChartTooltipContent = forwardRef(({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}, ref) => {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null;

    const [item] = payload;
    const key = `${labelKey || item.dataKey || item.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string"
      ? config[label]?.label || label
      : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) return null;

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;

  return (
    <div ref={ref} className={cn("grid min-w-[8rem] gap-1.5 rounded-lg bg-background p-2.5 text-xs", className)}>
      {tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((item, index) => (
          <div key={item.dataKey} className="flex items-center gap-2">
            <div className="text-muted-foreground">{item.name}</div>
            <span className="font-mono">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

function getPayloadConfigFromPayload(config, payload, key) {
  const payloadPayload = payload?.payload ?? {};
  const configLabelKey = payloadPayload[key] || key;
  return config[configLabelKey] || config[key];
}

export {
  ChartContainer,
  ChartTooltipContent,
  ChartStyle,
};
