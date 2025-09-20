import { ReactNode } from 'react';

type InfoSectionProps = {
    title: string;
    content: string | undefined;
    icon?: ReactNode;
    visible?: boolean;
};

export const InfoSection = ({ title, content, icon, visible = true }: InfoSectionProps) => {
    if (!visible || !content) return undefined;

    return (
        <div className="info-section">
            <h3 className="text-foreground mb-2 flex items-center gap-2 text-lg font-semibold">
                {icon}
                {title}
            </h3>
            <div className="text-muted-foreground">{content}</div>
        </div>
    );
};
