'use client';

import React from 'react';
import { InvitationData } from '@/types/invitation';
import { TemplateClassicArch } from './TemplateClassicArch';
import { TemplateModernMinimalist } from './TemplateModernMinimalist';
import { TemplateRoyalFloral } from './TemplateRoyalFloral';
import { TemplateLuxuryNight } from './TemplateLuxuryNight';
import { TemplateHeritageTraditional } from './TemplateHeritageTraditional';

interface TemplateRendererProps {
  invitation: InvitationData;
  isHostView?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ invitation, isHostView = false }) => {
  switch (invitation.templateId) {
    case 'template-2':
      return <TemplateModernMinimalist invitation={invitation} isHostView={isHostView} />;
    case 'template-3':
      return <TemplateRoyalFloral invitation={invitation} isHostView={isHostView} />;
    case 'template-4':
      return <TemplateLuxuryNight invitation={invitation} isHostView={isHostView} />;
    case 'template-5':
      return <TemplateHeritageTraditional invitation={invitation} isHostView={isHostView} />;
    case 'template-1':
    default:
      return <TemplateClassicArch invitation={invitation} isHostView={isHostView} />;
  }
};
