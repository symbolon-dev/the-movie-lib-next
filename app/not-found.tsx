import { ErrorMessage } from '@/components/shared/error-message';

function NotFound() {
    return (
        <ErrorMessage
            error="The requested page does not exist or has been moved."
            fullPage
            title="Page not found"
            actionText="Back to Home"
            actionLink="/"
        />
    );
}

export default NotFound;
