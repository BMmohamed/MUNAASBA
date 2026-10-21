'use client';

import React from 'react';
import { InvitationData } from '@/types/invitation';
import { TemplateClassicArch } from './TemplateClassicArch';
import { TemplateModernMinimalist } from './TemplateModernMinimalist';
import { TemplateRoyalFloral } from './TemplateRoyalFloral';
import { TemplateLuxuryNight } from './TemplateLuxuryNight';
import { TemplateHeritageTraditional } from './TemplateHeritageTraditional';

export const TemplateRenderer: React.FC<{ invitation: InvitationData }> = ({ invitation }) => {
  switch (invitation.templateId) {
    case 'template-2':
      return <TemplateModernMinimalist invitation={invitation} />;
    case 'template-3':
      return <TemplateRoyalFloral invitation={invitation} />;
    case 'template-4':
      return <TemplateLuxuryNight invitation={invitation} />;
    case 'template-5':
      return <TemplateHeritageTraditional invitation={invitation} />;
    case 'template-1':
    default:
      return <TemplateClassicArch invitation={invitation} />;
  }
};
