import { ReactNode } from 'react';

type InfoSectionProps = {
    title: string;
    content: string | undefined;
    icon?: ReactNode;
    visible?: boolean;
};

const InfoSection = ({ title, content, icon, visible = true }: InfoSectionProps) => {
    if (!visible || !content) return undefined;

    return (
        <div className="border-border/60 bg-background/80 rounded-2xl border p-4 shadow-sm backdrop-blur-sm">
            <h3 className="text-foreground mb-2 flex items-center gap-2 text-base font-semibold sm:text-lg">
                {icon}
                {title}
            </h3>
            <div className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {content}
            </div>
        </div>
    );
};

export { InfoSection };
