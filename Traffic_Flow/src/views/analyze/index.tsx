import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.scss";
// image
import greenLightImage from "../../assets/green-light.png";
import redLightImage from "../../assets/red-light.png";

interface AnalyzeData {
  traffic_jam: number;
  traffic_not_jam: number;
}

const AnalyzePage: React.FC = () => {
  const location = useLocation();
  //data from page"home"
  const searchParams = new URLSearchParams(location.search);
  const dataString = searchParams.get("data");
  const [data, setData] = useState<AnalyzeData | null>(null);

  useEffect(() => {
    if (dataString) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataString));
        setData(decodedData);
      } catch (error) {
        console.error("Failed to parse data:", error);
      }
    }
  }, [dataString]);

  const renderTrafficLight = () => {
    if (!data) return null;

    if (data.traffic_jam < 80) {
      return (
        <>
          <img
            src={greenLightImage}
            alt="Green Light"
            className={styles.img_size}
          />
          <div className={styles.content}>
            Based on the AI model’s assessment of the road conditions, there is
            traffic congestion, so it is necessary to extend the green light
            duration.
          </div>
        </>
      );
    } else if (data.traffic_not_jam < 80) {
      return (
        <>
          <img
            src={redLightImage}
            alt="Red Light"
            className={styles.img_size}
          />
          <div className={styles.content}>
            Based on the AI model’s assessment of the road conditions, there is
            no traffic congestion at the moment, so there is no need to extend
            the green light duration.
          </div>
        </>
      );
    } else {
      return <p>Traffic conditions are unclear</p>;
    }
  };

  return <div>{renderTrafficLight()}</div>;
};

export default AnalyzePage;
