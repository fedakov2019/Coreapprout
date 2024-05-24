
import { ToggleTheme } from "@/features/theme/toggle-theme";
import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";

export function AppHeader() {

return (
    <Layout
      logo={<Logo />}
      actions={<ToggleTheme />}
    />
)
}