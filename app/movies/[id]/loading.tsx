import { BackButton } from '@/components/common/navigation/BackButton';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
    return (
        <div className="flex min-h-[calc(100dvh-5rem)] flex-col gap-10 py-10">
            <div className="space-y-6">
                <div className="relative overflow-hidden rounded-3xl">
                    <Skeleton className="h-56 w-full rounded-3xl sm:h-72 md:h-80" />
                </div>

                <BackButton href="/" label="Back" className="w-fit" />
                <div>
                    <Skeleton className="mb-3 h-10 w-3/4 sm:h-12" />
                    <Skeleton className="h-5 w-1/2" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
                <div className="lg:self-start">
                    <Skeleton className="relative aspect-[2/3] w-full max-w-xs overflow-hidden rounded-3xl sm:max-w-sm md:max-w-md" />
                </div>

                <div className="lg:col-start-2">
                    <div className="mb-6 flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-5 w-8" />
                            <Skeleton className="h-4 w-20" />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-8 w-20 rounded-full" />
                            ))}
                        </div>
                    </div>

                    <hr className="border-border mb-8" />

                    <div className="mb-8">
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
                            <div key={i}>
                                <Skeleton className="mb-2 h-6 w-28" />
                                <Skeleton className="h-4 w-44" />
                            </div>
                        ))}
                    </div>

                    <hr className="border-border mt-8 mb-6" />

                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-36" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
