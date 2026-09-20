import React from 'react';
export interface ClockWidgetProps {
    instanceId?: string;
    onClose?: () => void;
}
export declare const ClockWidget: React.FC<ClockWidgetProps>;
