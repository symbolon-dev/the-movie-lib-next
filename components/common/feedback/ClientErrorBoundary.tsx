'use client';

import { Component, type ReactNode } from 'react';

import { ErrorMessage } from './ErrorMessage';

type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};

type State = {
    hasError: boolean;
    error: Error | null;
};

export class ClientErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error) {
        console.error('ClientErrorBoundary caught error:', error);
    }

    render() {
        if (this.state.hasError && this.state.error) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <ErrorMessage
                    error={this.state.error}
                    onRetry={() => this.setState({ hasError: false, error: null })}
                />
            );
        }

        return this.props.children;
    }
}
