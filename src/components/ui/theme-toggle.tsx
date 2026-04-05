import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/stores/theme";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full bg-[hsl(var(--surface-solid)/0.42)] shadow-[inset_0_1px_0_hsl(var(--hairline))]"
      aria-label="Alternar tema"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4 text-text" />
        ) : (
          <Moon className="h-4 w-4 text-text" />
        )}
      </motion.div>
    </Button>
  );
}
