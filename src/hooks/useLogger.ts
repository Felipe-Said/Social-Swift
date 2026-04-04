import { useEffect } from 'react';
import { useAuth } from '@/stores/auth';
import { logService } from '@/services/logService';

export const useLogger = () => {
  const { user } = useAuth();

  // Definir usuário atual no serviço de logs
  useEffect(() => {
    logService.setUser(user?.id || null);
  }, [user?.id]);

  return {
    // Métodos de log diretos
    logUserAction: logService.logUserAction.bind(logService),
    logSystemEvent: logService.logSystemEvent.bind(logService),
    logUserActivity: logService.logUserActivity.bind(logService),

    // Métodos específicos
    logLogin: logService.logLogin.bind(logService),
    logLogout: logService.logLogout.bind(logService),
    logRegister: logService.logRegister.bind(logService),
    logPostCreate: logService.logPostCreate.bind(logService),
    logPostLike: logService.logPostLike.bind(logService),
    logPostShare: logService.logPostShare.bind(logService),
    logPostComment: logService.logPostComment.bind(logService),
    logStoryView: logService.logStoryView.bind(logService),
    logStoryCreate: logService.logStoryCreate.bind(logService),
    logProfileUpdate: logService.logProfileUpdate.bind(logService),
    logFollowUser: logService.logFollowUser.bind(logService),
    logNavigation: logService.logNavigation.bind(logService),
    logSearch: logService.logSearch.bind(logService),
    logFileUpload: logService.logFileUpload.bind(logService),
    logSettingsChange: logService.logSettingsChange.bind(logService),
    logCryptoSwap: logService.logCryptoSwap.bind(logService),
    logCryptoTransfer: logService.logCryptoTransfer.bind(logService),
    logMarketplaceView: logService.logMarketplaceView.bind(logService),
    logMarketplacePurchase: logService.logMarketplacePurchase.bind(logService),
    logWeatherWidgetView: logService.logWeatherWidgetView.bind(logService),
    logError: logService.logError.bind(logService),

    // Controle do serviço
    disable: logService.disable.bind(logService),
    enable: logService.enable.bind(logService),
    enabled: logService.enabled
  };
};
