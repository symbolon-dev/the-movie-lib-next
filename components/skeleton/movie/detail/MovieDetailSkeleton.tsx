import BackButton from '@/components/common/navigation/BackButton';

const MovieDetailSkeleton = () => {
    return (
        <div className="min-h-screen animate-pulse bg-gradient-to-b from-black to-gray-900 px-4 py-10 md:px-8">
            <div className="container mx-auto">
                <BackButton href="/" label="Back to Movies" className="mb-6" />

                <div className="relative mb-10 h-[40vh] overflow-hidden rounded-xl bg-gray-800 md:h-[50vh]">
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                        <div className="mb-2 h-10 w-3/4 rounded bg-gray-700"></div>
                        <div className="mb-4 h-6 w-1/2 rounded bg-gray-700"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-700 shadow-xl"></div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="mb-6 flex flex-wrap items-center gap-6">
                            <div className="flex items-center">
                                <div className="h-16 w-16 rounded-full border-4 border-gray-700"></div>
                                <div className="ml-2 h-4 w-16 rounded bg-gray-700"></div>
                            </div>

                            <div className="h-5 w-24 rounded bg-gray-700"></div>
                            <div className="h-5 w-28 rounded bg-gray-700"></div>
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-8 w-20 rounded-full bg-gray-700"
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="mb-4 h-6 w-32 rounded bg-gray-700"></div>
                            <div className="mb-2 h-4 w-full rounded bg-gray-700"></div>
                            <div className="mb-2 h-4 w-full rounded bg-gray-700"></div>
                            <div className="mb-2 h-4 w-4/5 rounded bg-gray-700"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i}>
                                    <div className="mb-2 h-6 w-28 rounded bg-gray-700"></div>
                                    <div className="h-4 w-44 rounded bg-gray-700"></div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <div className="flex gap-3">
                                <div className="h-10 w-36 rounded bg-gray-700"></div>
                                <div className="h-10 w-24 rounded bg-gray-700"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailSkeleton;
