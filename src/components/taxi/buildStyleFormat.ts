export function buildStyle(
    id: string,
    data: string,
    color: string,
    width: number
  ): tt.AnyLayer {
    return {
      id: id,
      type: "line",
      source: {
        type: "geojson",
        data: data,
      },
      paint: {
        "line-color": color,
        "line-width": width,
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
    };
  }