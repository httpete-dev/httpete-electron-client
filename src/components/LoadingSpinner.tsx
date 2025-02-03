const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Largest circle - spins clockwise */}
                <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin" />

                {/* Medium circle - spins counter-clockwise */}
                <div className="absolute w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-[spin_1s_linear_infinite_reverse]" />

                {/* Smallest circle - spins clockwise */}
                <div className="absolute w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />

                {/* Loading text */}
                <span className="absolute text-white mt-40 text-xl">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;