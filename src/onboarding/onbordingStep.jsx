import { useTranslation } from "react-i18next";
import { TourProvider } from "@reactour/tour";
import { disableBody, enableBody, styles } from "./onbordingStyl";
import { useLocation } from "react-router-dom"; 

const TourSteps = ({ children, onComplete }) => {
  const { t } = useTranslation();
  const location = useLocation(); 

  const onboardingCompleted = localStorage.getItem("onboardingCompleted");
  const isTrackerPage = location.pathname === "/tracker";

  const steps = [
    {
      content: (
        <div style={{ textAlign: "center" }}>
          <h2>{t("greatingH")}</h2>
          <p>{t("greatingP")}</p>
        </div>
      ),
      position: "center",
    },
    {
      selector: ".first-step",
      content: t("first-step"),
    },
    {
      selector: ".second-step",
      content: t("second-step"),
    },
    {
      selector: ".third-step",
      content: t("third-step"),
    },
    {
      selector: ".four-step",
      content: t("fourth-step"),
    },
    {
      selector: ".five-step",
      content: t("fifth-step"),
    },
    {
      selector: ".six-step",
      content: t("sixth-step"),
    },
    {
      content: (
        <div style={{ textAlign: "center" }}>
          <h2>{t("endingH")}</h2>
        </div>
      ),
      position: "center",
    },
  ];

  const handleTourClose = () => {
    localStorage.setItem("onboardingCompleted", "true");
    if (onComplete) onComplete(); // Проверка на существование onComplete
    enableBody();
  };

  return (
    <TourProvider
      steps={steps}
      afterOpen={() => {
        console.log("Tour opened");
        disableBody();
      }}
      beforeClose={handleTourClose}
      styles={styles}
      badgeContent={({ totalSteps, currentStep }) =>
        `${currentStep + 1}/${totalSteps}`
      }
      defaultOpen={onboardingCompleted !== "true" && isTrackerPage}
    >
      {children}
    </TourProvider>
  );
};

export default TourSteps;
