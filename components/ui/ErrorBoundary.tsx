"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-12 bg-orisun-deep/50 border border-orisun-gold/20 rounded-sm text-center space-y-4 backdrop-blur-xl">
          <AlertTriangle className="text-orisun-crimson" size={48} />
          <h2 className="text-2xl font-fraunces text-orisun-ivory italic">Something went wrong</h2>
          <p className="text-sm font-dm-sans text-orisun-ivory/60 max-w-xs mx-auto">
            Our digital transmission encountered a minor glitch.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 px-6 py-3 bg-orisun-gold text-orisun-deep font-unbounded text-[10px] font-bold tracking-widest hover:scale-105 transition-transform"
          >
            <RefreshCcw size={14} />
            RETRY SIGNAL
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
