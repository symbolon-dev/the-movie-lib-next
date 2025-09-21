import { DollarSign } from 'lucide-react';
import { ProductionCompany, ProductionCountry, SpokenLanguage } from '@/types/movie';
import { formatCurrency } from '@/utils/formatter';
import { InfoSection } from './InfoSection';

type MovieInfoProps = {
    overview: string;
    productionCompanies: ProductionCompany[];
    productionCountries: ProductionCountry[];
    spokenLanguages: SpokenLanguage[];
    budget: number;
    revenue: number;
};

const MovieInfo = ({
    overview,
    productionCompanies,
    productionCountries,
    spokenLanguages,
    budget,
    revenue,
}: MovieInfoProps) => {
    const companies = productionCompanies.map((company) => company.name).join(', ');
    const countries = productionCountries.map((country) => country.name).join(', ');
    const languages = spokenLanguages.map((lang) => lang.name).join(', ');

    return (
        <>
            <div className="mb-8">
                <h2 className="text-foreground mb-4 text-xl font-bold">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                    {overview || 'No description available'}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoSection
                    title="Production"
                    content={companies}
                    visible={productionCompanies.length > 0}
                />

                <InfoSection
                    title="Countries"
                    content={countries}
                    visible={productionCountries.length > 0}
                />

                <InfoSection
                    title="Languages"
                    content={languages}
                    visible={spokenLanguages.length > 0}
                />

                <InfoSection
                    title="Budget"
                    content={budget > 0 ? formatCurrency(budget) : undefined}
                    icon={<DollarSign className="h-4 w-4" />}
                />

                <InfoSection
                    title="Revenue"
                    content={revenue > 0 ? formatCurrency(revenue) : undefined}
                    icon={<DollarSign className="h-4 w-4" />}
                />
            </div>
        </>
    );
};

export { MovieInfo };
