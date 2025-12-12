import { DollarSign } from 'lucide-react';
import type { ReactNode } from 'react';

import type {
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
} from '@/types/movie';
import { formatCurrency } from '@/utils/formatter';

type InfoCardProps = {
    title: string;
    content: string | undefined;
    icon?: ReactNode;
    visible?: boolean;
};

const InfoCard = ({ title, content, icon, visible = true }: InfoCardProps) => {
    if (!visible || !content) return null;

    return (
        <div className="border-border/60 bg-background/80 rounded-2xl border p-4 shadow-sm backdrop-blur-sm">
            <h3 className="heading-6 text-foreground mb-2 flex items-center gap-2">
                {icon}
                {title}
            </h3>
            <div className="text-body-sm text-muted-foreground">{content}</div>
        </div>
    );
};

type MovieInfoProps = {
    overview: string;
    productionCompanies: ProductionCompany[];
    productionCountries: ProductionCountry[];
    spokenLanguages: SpokenLanguage[];
    budget: number;
    revenue: number;
};

export const MovieInfo = ({
    overview,
    productionCompanies,
    productionCountries,
    spokenLanguages,
    budget,
    revenue,
}: MovieInfoProps) => {
    const companies = productionCompanies
        .map((company) => company.name)
        .join(', ');
    const countries = productionCountries
        .map((country) => country.name)
        .join(', ');
    const languages = spokenLanguages.map((lang) => lang.name).join(', ');

    return (
        <>
            <div className="mb-8">
                <h2 className="heading-3 text-foreground mb-4">Overview</h2>
                <p className="text-body text-muted-foreground">
                    {overview || 'No description available'}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoCard
                    title="Production"
                    content={companies}
                    visible={productionCompanies.length > 0}
                />

                <InfoCard
                    title="Countries"
                    content={countries}
                    visible={productionCountries.length > 0}
                />

                <InfoCard
                    title="Languages"
                    content={languages}
                    visible={spokenLanguages.length > 0}
                />

                <InfoCard
                    title="Budget"
                    content={budget > 0 ? formatCurrency(budget) : undefined}
                    icon={<DollarSign className="h-4 w-4" />}
                />

                <InfoCard
                    title="Revenue"
                    content={revenue > 0 ? formatCurrency(revenue) : undefined}
                    icon={<DollarSign className="h-4 w-4" />}
                />
            </div>
        </>
    );
};
