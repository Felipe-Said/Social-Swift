import { useTheme } from "@/stores/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label
      className="theme-switch shrink-0"
      style={{ ["--toggle-size" as string]: "8px" }}
      aria-label="Alternar tema"
    >
      <input
        type="checkbox"
        className="theme-switch__checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <div className="theme-switch__container">
        <div className="theme-switch__stars-container">
          <svg viewBox="0 0 144 55" fill="none">
            <path
              d="M135.831 3.00688L135.055 8.33896L132.499 8.75336L134.611 11.0503L133.903 13.9315L138.304 11.7019L143 13.9417L141.772 10.6741L144 8.3596L139.337 8.41583L138.304 3L135.831 3.00688Z"
              fill="currentColor"
            />
            <path
              d="M104.714 27.9934L104.296 30.8593L102.922 31.0818L104.057 32.3169L103.676 33.8664L106.04 32.6688L108.56 33.8718L107.901 32.1163L109.098 30.8707L106.594 30.9009L106.04 28L104.714 27.9934Z"
              fill="currentColor"
            />
            <path
              d="M69.8318 14.0069L69.0553 19.339L66.4995 19.7534L68.611 22.0503L67.9033 24.9315L72.3047 22.7019L77 24.9417L75.7723 21.6741L78 19.3596L73.3373 19.4158L72.3047 14L69.8318 14.0069Z"
              fill="currentColor"
            />
            <path
              d="M39.7142 24.9934L39.2963 27.8593L37.9222 28.0818L39.0569 29.3169L38.676 30.8664L41.0404 29.6688L43.5604 30.8718L42.9017 29.1163L44.0983 27.8707L41.5943 27.9009L41.0404 25L39.7142 24.9934Z"
              fill="currentColor"
            />
            <path
              d="M10.8318 13.0069L10.0553 18.339L7.49953 18.7534L9.61096 21.0503L8.90327 23.9315L13.3047 21.7019L18 23.9417L16.7723 20.6741L19 18.3596L14.3373 18.4158L13.3047 13L10.8318 13.0069Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="theme-switch__clouds" />
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className="theme-switch__moon">
              <div className="theme-switch__spot" />
              <div className="theme-switch__spot" />
              <div className="theme-switch__spot" />
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}
