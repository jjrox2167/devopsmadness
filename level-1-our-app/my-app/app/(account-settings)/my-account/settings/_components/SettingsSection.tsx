// app/my-account/settings/_components/SettingsSection.tsx
import type { ReactNode } from "react";
import { ContentCard } from "./ContentCard";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function SettingsSection({ title, description, children, actions }: Props) {
  return (
    <ContentCard title={title} description={description} actions={actions}>
      {children}
    </ContentCard>
  );
}
