import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { Keyboard } from '@capacitor/keyboard';
import { App } from '@capacitor/app';
import { Preferences } from '@capacitor/preferences';

export const useMobileFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [appState, setAppState] = useState<'active' | 'background'>('active');

  useEffect(() => {
    const initializeMobile = async () => {
      if (Capacitor.isNativePlatform()) {
        setIsNative(true);
        
        // Hide splash screen after app loads
        await SplashScreen.hide();
        
        // Set status bar style
        await StatusBar.setStyle({ style: StatusBarStyle.Light });
        await StatusBar.setBackgroundColor({ color: '#1d4ed8' });
        
        // Get device info
        const info = await Device.getInfo();
        setDeviceInfo(info);
        
        // Monitor network status
        const status = await Network.getStatus();
        setIsOnline(status.connected);
        
        Network.addListener('networkStatusChange', (status) => {
          setIsOnline(status.connected);
        });

        // Monitor keyboard events
        Keyboard.addListener('keyboardWillShow', (info) => {
          setKeyboardHeight(info.keyboardHeight);
          setIsKeyboardOpen(true);
        });

        Keyboard.addListener('keyboardWillHide', () => {
          setKeyboardHeight(0);
          setIsKeyboardOpen(false);
        });

        // Monitor app state changes
        App.addListener('appStateChange', ({ isActive }) => {
          setAppState(isActive ? 'active' : 'background');
        });

        // Handle back button
        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp();
          } else {
            window.history.back();
          }
        });
      }
    };

    initializeMobile();
  }, []);

  const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (isNative) {
      try {
        await Haptics.impact({ style });
      } catch (error) {
        console.log('Haptic feedback not available');
      }
    }
  };

  const setStatusBarColor = async (color: string, dark = false) => {
    if (isNative) {
      try {
        await StatusBar.setBackgroundColor({ color });
        await StatusBar.setStyle({ 
          style: dark ? StatusBarStyle.Dark : StatusBarStyle.Light 
        });
      } catch (error) {
        console.log('Status bar customization not available');
      }
    }
  };

  const hideKeyboard = async () => {
    if (isNative) {
      try {
        await Keyboard.hide();
      } catch (error) {
        console.log('Keyboard hide not available');
      }
    }
  };

  const storeData = async (key: string, value: string) => {
    if (isNative) {
      await Preferences.set({ key, value });
    } else {
      localStorage.setItem(key, value);
    }
  };

  const getData = async (key: string): Promise<string | null> => {
    if (isNative) {
      const { value } = await Preferences.get({ key });
      return value;
    } else {
      return localStorage.getItem(key);
    }
  };

  const shareContent = async (title: string, text: string, url?: string) => {
    if (isNative) {
      const { Share } = await import('@capacitor/share');
      await Share.share({
        title,
        text,
        url,
      });
    } else {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        // Fallback for web
        await navigator.clipboard.writeText(`${title}\n${text}\n${url || ''}`);
      }
    }
  };

  return {
    isNative,
    deviceInfo,
    isOnline,
    keyboardHeight,
    isKeyboardOpen,
    appState,
    triggerHaptic,
    setStatusBarColor,
    hideKeyboard,
    storeData,
    getData,
    shareContent
  };
};