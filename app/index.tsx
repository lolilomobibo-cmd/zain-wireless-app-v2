import React, { useState, createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

// Theme Context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme Provider Component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightColors = {
    background: ['#667eea', '#764ba2'],
    cardBg: '#ffffff',
    text: '#2d3436',
    textSecondary: '#636e72',
    buttonBg: ['#4A90E2', '#9B59B6'],
    shadow: '#000000',
  };

  const darkColors = {
    background: ['#0f0c29', '#302b63', '#24243e'],
    cardBg: '#1e1e2e',
    text: '#ffffff',
    textSecondary: '#b2bec3',
    buttonBg: ['#5f72bd', '#9b59b6'],
    shadow: '#000000',
  };

  const colors = isDarkMode ? darkColors : lightColors;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Main App Component
const App: React.FC = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const openLink = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, {
        toolbarColor: isDarkMode ? '#1e1e2e' : '#667eea',
        controlsColor: '#ffffff',
        showTitle: true,
      });
    } catch (error) {
      console.error('خطأ في فتح الرابط:', error);
    }
  };

  const buttons = [
    {
      title: 'تسجيل الدخول إلى الشبكة',
      subtitle: 'اضغط هنا للدخول',
      icon: 'log-in-outline',
      url: 'http://z.net/login',
      gradient: ['#667eea', '#764ba2'],
    },
    {
      title: 'الاستعلام والخروج',
      subtitle: 'الاستعلام على الرصيد وتسجيل الخروج',
      icon: 'card-outline',
      url: 'http://z.net/status',
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      title: 'إستراحة الشبكة',
      subtitle: 'ادخل إلى الإستراحة',
      icon: 'cafe-outline',
      url: 'http://z.ye',
      gradient: ['#4facfe', '#00f2fe'],
    },
    {
      title: 'البث المباشر',
      subtitle: 'شاهد المباريات مجاناً',
      icon: 'tv-outline',
      url: 'http://10.10.10.10:3333/',
      gradient: ['#43e97b', '#38f9d7'],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background[0]}
      />
      <LinearGradient colors={colors.background} style={styles.gradient}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Theme Toggle */}
          <View style={styles.header}>
            <View style={styles.themeToggle}>
              <Ionicons
                name="sunny-outline"
                size={22}
                color={isDarkMode ? '#b2bec3' : '#ffffff'}
              />
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#dfe6e9', true: '#636e72' }}
                thumbColor={isDarkMode ? '#9B59B6' : '#667eea'}
                style={styles.switch}
              />
              <Ionicons
                name="moon-outline"
                size={22}
                color={isDarkMode ? '#ffffff' : '#dfe6e9'}
              />
            </View>
          </View>

          {/* Logo/Title */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: colors.cardBg }]}>
              <Ionicons name="wifi" size={50} color="#667eea" />
            </View>
            <Text style={[styles.appTitle, { color: '#ffffff' }]}>شبكة زين اللاسلكية</Text>
          </View>

          {/* Welcome Card */}
          <View style={[styles.welcomeCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.welcomeHeader}>
              <Ionicons name="hand-left-outline" size={28} color="#667eea" />
              <Text style={[styles.welcomeTitle, { color: colors.text }]}>مرحباً بك</Text>
            </View>
            <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>
              أهلا وسهلا بك عزيزي المستخدم{' \n\n'}
              هذا البرنامج صمم من قبل إدارة شبكة زين اللاسلكية تحت إشراف{' '}
              <Text style={{ fontWeight: 'bold', color: colors.text }}>م/محمد الفضلي</Text>
              {' '}لتسهيل الخدمات.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => openLink(button.url)}
              >
                <LinearGradient
                  colors={button.gradient}
                  style={[
                    styles.button,
                    {
                      shadowColor: colors.shadow,
                    },
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.buttonIcon}>
                    <Ionicons name={button.icon as any} size={32} color="#ffffff" />
                  </View>
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitle}>{button.title}</Text>
                    <Text style={styles.buttonSubtitle}>{button.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.divider} />
            <View style={styles.footerContent}>
              <Ionicons name="code-slash-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                برمجة وتركيب:{' '}
                <Text style={{ fontWeight: 'bold', color: colors.text }}>م/لؤي الشرفي</Text>
              </Text>
            </View>
            <Text style={[styles.footerYear, { color: colors.textSecondary }]}>2025 ©</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

// Root Component with Theme Provider
export default function Index() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
  },
  switch: {
    marginHorizontal: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'right',
  },
  buttonsContainer: {
    gap: 16,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'right',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'right',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 16,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 15,
    marginLeft: 8,
    textAlign: 'center',
  },
  footerYear: {
    fontSize: 14,
    textAlign: 'center',
  },
});