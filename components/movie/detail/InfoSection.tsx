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
        <div className="info-section">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-200">
                {icon}
                {title}
            </h3>
            <div className="text-gray-400">{content}</div>
        </div>
    );
};

export default InfoSection;
