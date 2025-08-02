import {
  Shield,
  Zap,
  Bell,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Smartphone,
  Mail,
  Slack
} from 'lucide-react';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { ThemeToggle } from './components/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-black dark:text-white">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 dark:bg-neutral-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PingPulse</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
              <ThemeToggle />
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-accent text-accent-foreground px-4 py-2 rounded hover:bg-blue-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <a href="/dashboard" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Dashboard
                </a>
              </SignedIn>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-blue-50 via-background to-green-50 dark:from-blue-950/20 dark:via-neutral-900 dark:to-green-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Never Miss a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500"> Downtime</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto dark:text-neutral-400">
              Monitor your websites, APIs, and services 24/7. Get instant alerts when something goes wrong
              and keep your business running smoothly with PingPulse&apos;s reliable uptime monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition-all transform hover:scale-105 flex items-center justify-center group">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <a href="/dashboard" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center justify-center group">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </SignedIn>
              <button className="border-2 border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:border-primary hover:text-primary transition-colors">
                View Demo
              </button>
            </div>
            <div className="mt-12">
              <div className="bg-card rounded-xl shadow-2xl p-8 max-w-4xl mx-auto border border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">99.9% Uptime</h3>
                    <p className="text-muted-foreground">Reliable monitoring you can trust</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">30s Checks</h3>
                    <p className="text-muted-foreground">Lightning-fast monitoring intervals</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">15 Locations</h3>
                    <p className="text-muted-foreground">Global monitoring network</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Stay Online
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto dark:text-neutral-400">
              Comprehensive monitoring tools designed to keep your business running 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow group dark:bg-neutral-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Website Monitoring</h3>
              <p className="text-muted-foreground mb-4">
                Monitor your websites from multiple global locations with customizable check intervals.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />HTTP/HTTPS monitoring</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />SSL certificate tracking</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Response time analysis</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow group dark:bg-neutral-800">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Alerts</h3>
              <p className="text-muted-foreground mb-4">
                Get notified immediately when something goes wrong via multiple channels.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center"><Mail className="w-4 h-4 text-blue-500 mr-2" />Email notifications</li>
                <li className="flex items-center"><Smartphone className="w-4 h-4 text-blue-500 mr-2" />SMS alerts</li>
                <li className="flex items-center"><Slack className="w-4 h-4 text-blue-500 mr-2" />Slack integration</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow group dark:bg-neutral-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Detailed Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive reports and insights to understand your website performance.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Uptime statistics</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Performance metrics</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Historical data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How PingPulse Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto dark:text-neutral-400">
              Simple setup, powerful monitoring, instant alerts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Add Your Websites</h3>
              <p className="text-muted-foreground">
                Simply enter your website URLs and configure monitoring settings in minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">We Monitor 24/7</h3>
              <p className="text-muted-foreground">
                Our global network checks your sites every 30 seconds from multiple locations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Instant Alerts</h3>
              <p className="text-muted-foreground">
                Receive immediate notifications when downtime is detected so you can act fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands of Businesses
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-lg text-muted-foreground">4.9/5 from 2,500+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted/50 p-6 rounded-xl dark:bg-neutral-800">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "PingPulse has been a game-changer for our e-commerce business. We&apos;ve prevented countless lost sales thanks to their instant alerts."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Sarah Miller</p>
                  <p className="text-sm text-muted-foreground">CTO, TechCorp</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-xl dark:bg-neutral-800">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The detailed analytics and reporting features help us maintain our SLA commitments to clients. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  DJ
                </div>
                <div className="ml-3">
                  <p className="font-semibold">David Johnson</p>
                  <p className="text-sm text-muted-foreground">DevOps Lead, StartupXYZ</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-xl dark:bg-neutral-800">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Easy setup, reliable monitoring, and excellent customer support. PingPulse gives us peace of mind."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  EC
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Emily Chen</p>
                  <p className="text-sm text-muted-foreground">IT Manager, GlobalCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-muted/50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto dark:text-neutral-400">
              Choose the plan that fits your monitoring needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border border-border dark:bg-neutral-800">
              <h3 className="text-xl font-semibold mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />5 monitors</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />1-minute checks</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Email alerts</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />30-day history</li>
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </SignUpButton>
            </div>

            <div className="bg-card p-8 rounded-xl border-2 border-primary relative dark:bg-neutral-800">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />25 monitors</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />30-second checks</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />SMS + Email alerts</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />90-day history</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Status pages</li>
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </SignUpButton>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border dark:bg-neutral-800">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Unlimited monitors</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />10-second checks</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />All alert channels</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Unlimited history</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Priority support</li>
              </ul>
              <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg hover:bg-secondary/80 transition-colors dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-900 dark:to-green-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 dark:text-white">
            Ready to Eliminate Downtime?
          </h2>
          <p className="text-xl text-blue-100 mb-8 dark:text-blue-200">
            Join thousands of businesses that trust PingPulse to keep their websites online.
            Start monitoring today - no credit card required.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition-colors transform hover:scale-105 inline-flex items-center group">
                Start Monitoring Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <a href="/dashboard" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 inline-flex items-center group">
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border py-16 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PingPulse</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Reliable uptime monitoring for businesses of all sizes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status Page</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground dark:text-neutral-400">
            <p>&copy; 2025 PingPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}