import { ErrorMessage } from '@/components/shared/error-message';

const NotFound = () => {
    return (
        <ErrorMessage
            error="The requested movie could not be found"
            fullPage={true}
            title="Movie not found"
            actionText="Back to Home"
            actionLink="/"
        />
    );
};

export default NotFound;
