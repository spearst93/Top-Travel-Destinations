import { useRegisterSW } from 'virtual:pwa-register/react';

const PWAUpdatePrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(registration) {
      console.log('SW Registered:', registration);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    }
  });

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  const handleDismiss = () => {
    setNeedRefresh(false);
  };

  if (!needRefresh) return null;

  return (
    <div className="PWAUpdatePrompt" role="alert" aria-live="polite">
      <div className="PWAUpdatePrompt-content">
        <p className="PWAUpdatePrompt-message">
          A new version is available!
        </p>
        <div className="PWAUpdatePrompt-actions">
          <button
            onClick={handleUpdate}
            className="PWAUpdatePrompt-update"
          >
            Update Now
          </button>
          <button
            onClick={handleDismiss}
            className="PWAUpdatePrompt-dismiss"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;
