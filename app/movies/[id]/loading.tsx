import { BackButton } from '@/components/common/navigation/BackButton';
import { ScrollReset } from '@/components/common/navigation/ScrollReset';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
    return (
        <>
            <ScrollReset />
            <div className="flex min-h-[calc(100dvh-5rem)] flex-col gap-10 pt-6 pb-12">
                <BackButton href="/" label="Back to Movies" className="w-fit" />

                <NeonGradientCard
                    className="rounded-3xl"
                    contentClassName="border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10"
                    neonColors={{
                        firstColor: 'var(--color-chart-1)',
                        secondColor: 'var(--color-card)',
                    }}
                >
                    <div className="flex flex-col gap-10">
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:items-start">
                            <div className="w-full max-w-xs justify-self-center lg:justify-self-start">
                                <Skeleton className="aspect-[2/3] w-full rounded-[24px]" />
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="space-y-3 text-center lg:text-left">
                                    <Skeleton className="mx-auto h-10 w-3/4 sm:h-12 lg:mx-0" />
                                    <Skeleton className="mx-auto h-5 w-1/2 sm:h-6 lg:mx-0" />
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <Skeleton className="h-5 w-12" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-4 rounded-full" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-4 rounded-full" />
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                                    {[1, 2, 3].map((i) => (
                                        <Skeleton key={i} className="h-8 w-20 rounded-full" />
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <Skeleton className="h-10 w-44" />
                                    <Skeleton className="h-10 w-28" />
                                </div>
                            </div>
                        </div>

                        <hr className="border-border/60" />

                        <div className="space-y-8">
                            <div>
                                <Skeleton className="mb-4 h-6 w-24" />
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-11/12" />
                                    <Skeleton className="h-4 w-4/5" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-5 w-28" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </NeonGradientCard>
            </div>
        </>
    );
};

export default Loading;
