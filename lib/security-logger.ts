/**
 * SECURITY LOGGER
 * 
 * This utility provides structured logging for security-related events.
 * Logs are formatted to be easily ingested by SIEM/SOC tools (like ELK, Splunk, or Sentinel).
 */

type SecurityEventType = 
  | 'PROMPT_INJECTION_ATTEMPT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'PAYMENT_VERIFICATION_FAILURE'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED_ACCESS';

type Severity = 'INFO' | 'WARNING' | 'CRITICAL';

interface SecurityEvent {
  timestamp: string;
  sourceIp: string;
  eventType: SecurityEventType;
  severity: Severity;
  endpoint: string;
  metadata?: Record<string, any>;
}

export const securityLogger = {
  log: (event: Omit<SecurityEvent, 'timestamp'>) => {
    const fullEvent: SecurityEvent = {
      timestamp: new Date().toISOString(),
      ...event,
    };

    // In production, this would be sent to a dedicated logging service (Winston, Axiom, Upstash)
    // For this portfolio, we use structured console logs that a SIEM agent can scrape.
    const logString = `[SECURITY_EVENT] ${JSON.stringify(fullEvent)}`;
    
    if (fullEvent.severity === 'CRITICAL') {
      console.error(logString);
    } else if (fullEvent.severity === 'WARNING') {
      console.warn(logString);
    } else {
      console.info(logString);
    }
  }
};
